# 016 — Atlas 视觉增强：节点类型着色 + 关联筛选 + 图例

> 013-015 解决了"能编辑"，但没有解决"能看懂"。目前所有 R3 entity 节点都是同一种灰色（`--text-3`），task/memory/decision/item 只能用几何形状区分——但形状太小，在缩放和低分辨率下几乎无法辨认。relation_reveal 模式下所有关联线全量展示，没有筛选手段。本轮让 3D 场景一眼可读，并让关联探索可控。

## 1. 范围

前端改动（scene.ts + CosmosView + 新小组件）。不涉及后端。

**核心目标**：
- R3 entity 节点按 kind 着色，task/memory/decision/item 各有独立颜色
- relation_reveal 模式下显示关联筛选条，可按类型/信心度/状态过滤关联线
- 新增小型图例，说明形状+颜色含义
- 筛选后关联线实时显示/隐藏，不影响节点布局

## 2. 产品边界

- 不改 R0/R1/R2 节点的颜色（它们保持 accent/text-2）
- 不做节点大小动态变化（保持现有几何尺寸）
- 不做筛选条件的 URL 持久化
- 不做"保存筛选方案"
- 不引入 tokens.css 中没有的新颜色（用现有 token 做 kind 映射）
- 筛选仅作用于关联线的可见性，不改变 layout/focus 计算

## 3. 节点类型着色

### 3.1 Kind → 颜色映射

使用项目中已有的 token 色，按 kind 分配：

| Kind | Token | 效果 |
|---|---|---|
| task | `--accent-dim` (accent 的 18% 透明版) 或不透明 accent | 青绿色 — 行动项 |
| memory | `--text-2` | 亮灰 — 知识/记忆 |
| decision | `--warm` | 琥珀色 — 决策/判断 |
| item | `--text-3` | 中灰 — 原始输入 |

**R1/R2/R0 保持不变**：
- R0：`--accent`（已存在）
- R1：`--accent`（已存在）
- R2：`--text-2`（已存在）

### 3.2 实现位置

`frontend/src/cosmos/scene.ts` 中 `initScene` 函数的 R3 分支（当前第 78-84 行）。

当前代码：
```typescript
} else {
  if (n.kind === 'task') geom = new THREE.BoxGeometry(0.022, 0.022, 0.022)
  else if (n.kind === 'decision') geom = new THREE.OctahedronGeometry(0.022)
  else if (n.kind === 'memory') geom = new THREE.SphereGeometry(0.02, 8, 8)
  else if (n.kind === 'item') geom = new THREE.TetrahedronGeometry(0.02)
  else geom = new THREE.SphereGeometry(0.015, 8, 8)
  mat = new THREE.MeshBasicMaterial({ color: cssVar('--text-3'), transparent: true, opacity: alpha })
}
```

改为根据 kind 设置颜色：
```typescript
} else {
  // geometry per kind
  if (n.kind === 'task') geom = new THREE.BoxGeometry(0.022, 0.022, 0.022)
  else if (n.kind === 'decision') geom = new THREE.OctahedronGeometry(0.022)
  else if (n.kind === 'memory') geom = new THREE.SphereGeometry(0.02, 8, 8)
  else if (n.kind === 'item') geom = new THREE.TetrahedronGeometry(0.02)
  else geom = new THREE.SphereGeometry(0.015, 8, 8)
  
  // color per kind
  const kindColorMap: Record<string, string> = {
    task: '--accent',
    memory: '--text-2',
    decision: '--warm',
    item: '--text-3',
  }
  const kindColor = kindColorMap[n.kind] || '--text-3'
  mat = new THREE.MeshBasicMaterial({ color: cssVar(kindColor), transparent: true, opacity: alpha })
  
  // 存储 kindColor 到 userData，供后续 opacity 调整使用
  mesh.userData.kindColor = kindColor
}
```

### 3.3 Hover 行为调整

当 hover R3 节点时，颜色应变为 `--accent-bright`（保持现有 hover 行为），但恢复时应回到 kind 颜色而非统一灰色。

检查 `scene.ts` 中 `applyHover` / `resetHover` 逻辑，确保 reset 恢复到 `mesh.userData.kindColor` 对应的颜色。

目前 `resetHover` 恢复 `_origColor` hex 值，这个逻辑无需修改（hover 前存的是 kind 色，恢复自然也是 kind 色）。但需确认 node_focus/relation_reveal 状态下 `ghostExcept` 函数对节点的 opacity 调整不影响颜色。

### 3.4 CSS2D 标签颜色

R3 实体标签（CSS2D 文字）可以考虑也按 kind 微调颜色（可选，实现者自行判断是否简洁）。至少不要与节点颜色冲突。

## 4. 关联筛选条

### 4.1 显示时机

仅在 `store.state.kind === 'relation_reveal'` 时显示。其他状态下隐藏。

### 4.2 位置

固定在画布底部（或顶部 HUD 下方），不遮挡 3D 场景主体。

推荐位置：底部居中，与 tooltip 类似但位于更下方。

```
┌──────────────────────────────────────────────────┐
│  [共现] [因果] [张力] [衍生]  │  信心度 ≥ [0.3]  │  状态 [全部 ▾]  │
└──────────────────────────────────────────────────┘
```

### 4.3 筛选控件

**类型筛选**（toggle chips）：
- 每个 relation_type 一个 chip，默认全部选中
- 点击 chip 切换该类型的可见性
- 选中：accent 色边框 + accent-dim 背景
- 未选中：text-5 色边框 + 透明背景
- 至少保留一个类型可见（最后一个选中的不可取消）

**信心度阈值**（range slider + 数值显示）：
- 范围 0.0 — 1.0，步长 0.05
- 默认 0.0（显示全部）
- 只显示 confidence ≥ 阈值的关联线
- 样式：短滑块 + 右侧数字标签

**状态筛选**（dropdown / select）：
- 选项：全部 / 已确认 / 待定
- 默认"全部"
- 筛选 rejected 的关联本就不显示（NodeDetailCard 里已过滤），此处保持一致

### 4.4 筛选逻辑

在 `CosmosView` 的 `animate()` 循环中（或在筛选条件变更时），根据当前筛选状态更新 `assocLines` 中每条线的 `.visible` 属性：

```typescript
function applyAssocFilter(lines: typeof assocLines, filter: AssocFilter) {
  for (const al of lines) {
    const typeMatch = filter.types.length === 0 || filter.types.includes(al.data.relation_type)
    const confMatch = al.data.confidence >= filter.minConfidence
    const statusMatch = filter.status === 'all' || al.data.status === filter.status
    al.line.visible = typeMatch && confMatch && statusMatch
    if (al.arrow) al.arrow.visible = al.line.visible
  }
}
```

筛选条件变更时不需要重建关联线，只改 `.visible`。

### 4.5 筛选状态管理

在 `CosmosView` 中用本地 `reactive` 管理（不需要放到 store，不跨组件共享）：

```typescript
const assocFilter = reactive({
  types: ['co_occurrence', 'causal', 'tension', 'derived_from'] as string[],
  minConfidence: 0.0,
  status: 'all' as 'all' | 'accepted' | 'pending',
})
```

用 `watch` 监听筛选条件变化，调用 `applyAssocFilter`。

## 5. 图例

### 5.1 位置

固定在画布左下角，半透明，不遮挡场景。

```
┌──────────────────┐
│ ◻ task    ● mem  │
│ ◆ decision ▲ item│
│                  │
│ 共现 ─ 默认      │
│ 因果 ─ 青色      │
│ 张力 ─ 灰        │
│ 衍生 ─ 浅灰      │
└──────────────────┘
```

### 5.2 显示时机

- `global_overview` / `region_zoom`：只显示 entity 几何形状 + 颜色含义
- `relation_reveal`：额外显示关联线颜色含义
- 5 秒后自动淡出（opacity 降到 0.3），hover 恢复全不透明

### 5.3 实现

新建 `frontend/src/components/cosmos/LegendBar.vue`：
- 小型固定定位组件
- props: `visible: boolean`, `showAssocLegend: boolean`
- 使用 tokens.css 变量
- 极简样式，无交互

## 6. 子任务

### 6.1 scene.ts 节点着色

改动 `initScene` 的 R3 分支：根据 `n.kind` 选择颜色。

### 6.2 关联筛选

在 `CosmosView.vue` 中：
- 新增 `assocFilter` reactive 状态
- 新增 `applyAssocFilter` 函数
- 在 `animate()` 中或通过 `watch` 应用筛选
- 新增筛选条模板（inline 在 CosmosView template 中，不另建组件）

筛选条使用 tokens.css 变量，放在 `.cosmos-view` 内部、canvas 上方。

### 6.3 LegendBar

新建 `frontend/src/components/cosmos/LegendBar.vue`：
- 显示节点形状+颜色说明
- 在 relation_reveal 时额外显示关联线颜色说明
- 自动淡出 + hover 恢复

### 6.4 筛选后空状态

当筛选条件过严导致所有关联线隐藏时，显示提示文字"当前筛选条件下无可见关联"。

## 7. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `frontend/src/cosmos/scene.ts` | R3 节点按 kind 着色 + userData 存储 kindColor | +20 行 |
| `frontend/src/views/CosmosView.vue` | assocFilter 状态 + 筛选逻辑 + 筛选条模板 + 空状态提示 | +120 行 |
| `frontend/src/components/cosmos/LegendBar.vue` | **新建**：形状+颜色图例 | +120 行 |

**总计约 260 行**。偏小。考虑追加以下增强。

## 8. 追加：标签层级缩进 + 节点 halo

### 8.1 R3 标签微调

当前 CSS2D 标签只显示 entity 标题。在 association 筛选条旁边显示当前可见关联数："显示 3/5 条关联"。

### 8.2 节点选中态 halo

当 entity 处于 `node_focus` 状态时，该 entity 的 3D 节点增加微弱外发光环（一个半透明的 ring/torus），强化"当前聚焦节点"的视觉提示。

现在 `node_focus` 是靠相机靠近来体现的，但如果有多个相邻节点，用户可能分不清哪个是焦点。加 halo 解决这个问题。

实现：在 `CosmosView` 的 `enterRelation()` 和 `onStateChange()` 中，给 focus 节点添加/移除一个小光环 mesh。

```typescript
// scene.ts 新增导出
export function addHalo(scene: THREE.Scene, node: LayoutNode, color: string) { ... }
export function removeHalo(scene: THREE.Scene) { ... }
```

### 8.3 追加行数

| 改动 | 行数 |
|---|---|
| 节点 halo | +60 行 |
| 可见关联计数 | +10 行 |

追加后**总计约 330 行**。仍然偏小，但聚焦、紧凑。

## 9. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 节点着色
# - Atlas 启动 → global_overview → R1/R2 节点颜色不变
# - 放大到 R3 可见 → task 节点是青绿色、memory 是亮灰、decision 是琥珀色、item 是中灰
# - Hover R3 节点 → 变为 accent-bright → 离开 → 恢复 kind 颜色
# - node_focus → ghost 的节点保持 kind 色但透明度降低

# 3. 人肉验证 — 关联筛选
# - node_focus → R 进入 relation_reveal
# - 底部出现筛选条：类型 chips + 信心度滑块 + 状态下拉
# - 点击"共现" chip → 所有 co_occurrence 关联线消失
# - 再次点击 → 恢复
# - 拖动信心度滑块 → 低信心度关联线消失
# - 状态选"已确认" → pending 关联线消失
# - 所有线隐藏时 → 显示"当前筛选条件下无可见关联"

# 4. 人肉验证 — 图例
# - 左下角出现图例
# - 显示节点形状+颜色+关联线颜色说明
# - 5 秒后淡出 → hover 恢复
# - 切换到 relation_reveal → 图例增加关联线颜色说明

# 5. 人肉验证 — 节点 halo
# - node_focus → 聚焦的 entity 节点周围有微弱光环
# - 切换到另一个 entity → 光环移到新节点
# - 返回 region_zoom → 光环消失

# 6. 不破坏
# - 左键点击导航正常
# - 右键菜单正常
# - 搜索正常
# - entity/association 编辑正常（013/014/015）
# - 相机缩放/旋转正常
# - OrbitControls 正常
# - LOD 层级可见性正常
```

## 10. 禁止事项

- 不在 tokens.css 中新增颜色变量（只用现有 token）
- 不修改 R0/R1/R2 节点颜色
- 不做粒子特效或 bloom 后处理
- 不改变节点几何形状（shape 保持不变）
- 筛选不影响 node_focus/region_zoom 状态下的节点布局
- 不修改后端
- 不新增 npm 依赖（Three.js 已安装）

## 11. 提交风格

```
add: 016 — Atlas 视觉增强（节点类型着色 + 关联筛选 + 图例 + 聚焦 halo）

- R3 entity 节点按 kind 着色：task=accent、memory=text-2、decision=warm、item=text-3
- relation_reveal 模式新增关联筛选条（类型 toggle + 信心度阈值 + 状态筛选）
- 新增 LegendBar 组件：形状+颜色图例，5s 后淡出
- 聚焦节点新增微弱光环（halo ring），强化当前焦点提示
```
