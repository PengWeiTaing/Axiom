# 005a — Cosmos 原型两处致命 bug 修

> 一句话目标：005 整体框架对（mock 数据加载 / 状态机 / 摄像机 tween / OrbitControls / dispose 都没坏），但**两处渲染 bug 让球完全不像球**。截图证明：父子连线全断成虚线、所有层节点远视角下全显示。

## 1. 背景 / 现象

Opus 用 Playwright 跑了 005 真实视觉（`screenshots/07-cosmos-global-fixed.png`），看到：

- 节点散乱在画面下半，**看不出球壳层级**
- 父子连线全是断断续续的"虚线"（其实是渲染断裂）
- 远视角下能看到所有层（应该只看到根 + 主线）

调查两个文件后定位：

### Bug 1 — 父子连线用错 Three.js 类型

`frontend/src/cosmos/scene.ts:92`：

```ts
const line = new THREE.LineSegments(lineGeom, lineMat)
```

`THREE.LineSegments` 渲染模式是 `GL_LINES`——**每两个点画一段独立线段**。代码 line 82-89 用 SLERP 生成了 9 个点（8 段），但 `LineSegments` 把它解读成 `[p0,p1]+[p2,p3]+[p4,p5]+[p6,p7]` 4 段独立短线，**段与段之间断开**——看起来像虚线。

应该用 `THREE.Line`（`GL_LINE_STRIP` 连续画过所有点）。

**Opus 自己有责任**：原任务单 §4.3 写"`THREE.LineSegments` 球面弧段"误导了 DeepSeek。

### Bug 2 — LOD 逻辑写反

`frontend/src/views/CosmosView.vue:121-125`：

```ts
const shouldShow = layer <= 0 || dist < 3.5
  || (layer <= 1 && dist >= 3.5)
  || (layer <= 2 && dist < 3.5 && dist >= 2.0)
  || (layer <= 3 && dist < 2.0)
```

第一项 `layer <= 0 || dist < 3.5` —— 只要 `dist < 3.5`（缩近一点）就让**所有层都 show**。这跟"远视角只看 R₀+R₁"契约相反。

正确的距离档位（任务单 §6）：

| 距离 | 显示层 |
|---|---|
| dist > 3.5 | layer ≤ 1（R₀ + R₁ 主线） |
| 2.0 ≤ dist ≤ 3.5 | layer ≤ 2（加 R₂ 项目） |
| dist < 2.0 | layer ≤ 3（加 R₃ 叶子） |

## 2. 要改的文件

| 文件 | 改动 | 行数 |
|---|---|---|
| `frontend/src/cosmos/scene.ts` | `LineSegments` → `Line`（父子线、关联线两处） | ~4 |
| `frontend/src/views/CosmosView.vue` | LOD 逻辑重写 | ~10 |

**不要**改其他文件，不要"顺手"调摄像机角度/节点尺寸/颜色等。如果发现别的问题在 commit message 加 `OBSERVED: ...` 报告，等 Opus 决定。

## 3. 具体改法

### 3.1 父子连线（scene.ts）

替换 `scene.ts:92` 这一行：

```ts
// 改前
const line = new THREE.LineSegments(lineGeom, lineMat)

// 改后
const line = new THREE.Line(lineGeom, lineMat)
```

同时把 `SceneObjects.lines` 字段类型（scene.ts:19）从 `THREE.LineSegments[]` 改成 `THREE.Line[]`，把 `AssociationLine.line`（line 117）也改成 `THREE.Line`。

**关联线**（`createAssociationLines` line 152）也要改：

```ts
// 改前
const line = new THREE.LineSegments(lineGeom, mat)

// 改后
const line = new THREE.Line(lineGeom, mat)
```

关联线只有 2 个端点（直线 from→to），`LineSegments` 渲染恰好对（一段独立线段），但**类型统一**用 `THREE.Line` 即可——`Line` 也能正确渲染两点直线。

### 3.2 LOD 逻辑（CosmosView.vue）

替换 `CosmosView.vue:117-126` 整块：

```ts
// 改前
const dist = sceneObjs.camera.position.length()
sceneObjs.nodes.forEach(m => {
  const layer = m.userData.layer as number
  const shouldShow = layer <= 0 || dist < 3.5
    || (layer <= 1 && dist >= 3.5)
    || (layer <= 2 && dist < 3.5 && dist >= 2.0)
    || (layer <= 3 && dist < 2.0)
  m.visible = shouldShow || store.state.kind === 'node_focus' || store.state.kind === 'relation_reveal'
})

// 改后
const dist = sceneObjs.camera.position.length()
// 距离档位：远 → 只看根 + 主线；中 → 加项目；近 → 加叶子
const maxLayer = dist > 3.5 ? 1 : dist >= 2.0 ? 2 : 3
const inFocusState = store.state.kind === 'node_focus' || store.state.kind === 'relation_reveal'
sceneObjs.nodes.forEach(m => {
  const layer = m.userData.layer as number
  // Focus / Relation Reveal 状态强制显示所有层，由 fadeNodes 控制透明度
  m.visible = inFocusState || layer <= maxLayer
})
```

### 3.3 父子连线也要按 LOD 隐藏

注意当前代码**只对节点 mesh 做 LOD**，不对线 `sceneObjs.lines` 做 LOD——远视角下线还在画。但因为远视角节点 R₂ R₃ 被隐藏后，连线两端断节点也是隐形的，**线变成"指向虚空"**很丑。

LOD 块末尾加一段：

```ts
sceneObjs.lines.forEach(l => {
  // 连线两端任一端的层 > maxLayer 就隐藏，除非在 focus 状态
  const fromLayer = (l.userData?.fromLayer ?? 3) as number
  const toLayer = (l.userData?.toLayer ?? 3) as number
  const maxEndLayer = Math.max(fromLayer, toLayer)
  l.visible = inFocusState || maxEndLayer <= maxLayer
})
```

这要求在 `scene.ts` 创建父子线时（line 92 附近）给 line 加 userData 标层：

```ts
const line = new THREE.Line(lineGeom, lineMat)
line.userData = { fromLayer: parent.layer, toLayer: n.layer }   // ← 新加这行
scene.add(line)
```

## 4. 验收清单

- [ ] `cd frontend && npm run build` 通过
- [ ] 打开 `http://127.0.0.1:5173/` → 点 Atlas
- [ ] **远视角（默认进入）**：只看到根（一个稍大点）+ 5 个主线节点均匀分布在球面圆环上，**没有**项目和叶子，**没有**密密麻麻的虚线
- [ ] **父子连线是连续实线**（不是断裂虚线）alpha 较淡（0.4）
- [ ] **滚轮缩近**：先出现二级节点（项目），再缩近出现叶子节点（task/memory/decision/item）
- [ ] **点击主线节点**：摄像机推近，进入 Region Zoom 状态
- [ ] **点击叶子节点**：进入 Node Focus，节点居中
- [ ] **按 R**：关联线渐入（实线 accepted + 虚线 pending），其他无关节点褪到极淡
- [ ] **Esc**：单步退回
- [ ] **退出 Atlas 后再进**：内存稳定（DevTools Memory 看，不持续增长）

## 5. 禁止事项

- 不要"顺手"改摄像机位置 / 节点尺寸 / 颜色 / FOV
- 不要重写 `layout.ts`（布局算法本身对）
- 不要把 `THREE.LineSegments` 全局替换 — 关联线段如果你用 `LineSegments` 渲染单段也是对的，但**统一用 `THREE.Line`** 更整洁
- 不要在 dev 环境用 `console.log` 留调试代码
- 发现别的视觉小问题（如 R₁ 节点全在赤道平面让球看起来扁），在 commit message 加 `OBSERVED:` 报告，**不要**自作主张调整

## 6. 提交风格

```
fix: 005a — Cosmos 渲染两处致命 bug

- 父子连线 LineSegments → Line（GL_LINES 切碎了 strip，看起来像虚线断裂）
- LOD 逻辑反了：dist<3.5 不该让所有层都 show；改成距离档位（>3.5 只 R₀+R₁，2.0~3.5 加 R₂，<2.0 加 R₃）
- 顺带：连线也按 LOD 隐藏，避免"指向虚空"
```
