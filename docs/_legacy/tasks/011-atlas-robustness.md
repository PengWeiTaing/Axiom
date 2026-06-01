# 011 — Atlas 鲁棒性打磨（控制台清洁 + 加载态 + 点击精度）

> 经过 005-010 七个迭代，Atlas 核心功能已经成立。但积累了几个纸屑问题：
> - 控制台每次加载 13 条 `THREE.Color: Alpha component of rgba(...) will be ignored` 警告
> - 数据加载中/失败时 Atlas 一片黑，用户不知道发生了什么
> - R3 小节点（边长 0.022）鼠标很难精准点到
> - 键盘快捷键（R/Esc/滚轮/拖拽）完全不可发现
>
> 本轮不堆新功能，只做工程卫生和交互精度。

## 1. 范围

只改前端。不动后端。

## 2. P2 修复：cssVar 剥离 alpha 通道

### 问题

`tokens.css` 中多个颜色变量定义为 rgba 格式：

```css
--text-2:  rgba(255, 255, 255, 0.60);
--text-3:  rgba(255, 255, 255, 0.38);
--text-4:  rgba(255, 255, 255, 0.18);
--text-5:  rgba(255, 255, 255, 0.08);
--line-1:  rgba(255, 255, 255, 0.08);
--line-2:  rgba(255, 255, 255, 0.08);
--accent-dim: rgba(110, 231, 208, 0.18);
```

`cssVar()` 返回完整的 `rgba(r, g, b, a)` 字符串。`new THREE.Color('rgba(...)')` 忽略 alpha 通道并打印警告。

### 修复

在 `cssVar()` 中，如果返回值以 `rgba(` 开头，剥离 alpha 通道转为 `rgb(r, g, b)` 或 `#rrggbb` 格式：

```typescript
export function cssVar(name: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  if (!v) return '#6ee7d0'
  // THREE.Color 不接受 rgba alpha 通道，剥离之
  const m = v.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (m) {
    return '#' + [m[1], m[2], m[3]].map(x => parseInt(x).toString(16).padStart(2, '0')).join('')
  }
  return v
}
```

注意：只剥离 alpha 通道，颜色本身不丢失。透明度由各处的 `material.opacity` 独立控制，不受影响。

**影响范围**：所有通过 `cssVar()` 获取颜色的 Three.js 材质（LineMaterial、MeshBasicMaterial、场景中的节点/线/环）。

## 3. Atlas 加载态 / 错误态 / 空态

### 3.1 加载态

`store.loading` 为 true 时，CosmosView 渲染一个居中的加载指示器，替代空白 canvas：

```
┌──────────────────────────────┐
│                              │
│         ◌                    │  ← CSS 动画旋转环
│      加载 Atlas…             │
│                              │
└──────────────────────────────┘
```

实现：在 CosmosView 模板中，`v-if="store.loading"` 显示加载 UI，隐藏 canvas。

### 3.2 错误态

`store.error` 非 null 时（API 失败且 mock fallback 也失败），显示错误信息 + 重试按钮：

```
┌──────────────────────────────┐
│                              │
│         ⚠                    │
│    Cosmos 数据加载失败        │
│   API 和 mock 均不可用        │
│                              │
│       [重试]                 │  ← 调用 store.reload()
│                              │
└──────────────────────────────┘
```

### 3.3 空态

`store.data` 加载成功但 `lifelines.length === 0` 时，显示引导提示：

```
┌──────────────────────────────┐
│                              │
│       暂无 lifeline          │
│   在左侧面板中创建第一条       │
│   lifeline 来开始构建知识星球  │
│                              │
└──────────────────────────────┘
```

### 3.4 样式

- 加载环颜色：`--accent`，直径 32px，`border` 动画旋转
- 错误/空态文字颜色：`--text-3`，居中
- 三种状态都使用 `position: absolute; inset: 0;` 覆盖在 CosmosView 容器上
- canvas 在这些状态下仍然挂载（`v-show` 而非 `v-if`），避免反复 init/dispose

## 4. R3 节点点击精度

### 问题

R3 节点使用极小几何体（BoxGeometry 0.022、TetrahedronGeometry 0.02 等），在屏幕上只有几个像素。鼠标必须精确命中才能触发点击。

### 修复：双 mesh 方案

在 `scene.ts` 的 `initScene()` 中，为每个 R3 节点额外创建一个不可见的"碰撞球"（hit sphere），只加入 `pickables` 数组，不加到场景渲染：

```typescript
// R3 节点：额外创建不可见碰撞球
if (n.layer === 3) {
  const hitGeom = new THREE.SphereGeometry(0.04, 8, 8)  // 约 2x 视觉尺寸
  const hitMat = new THREE.MeshBasicMaterial({ visible: false })
  const hitMesh = new THREE.Mesh(hitGeom, hitMat)
  hitMesh.position.copy(n.position)
  hitMesh.userData = mesh.userData  // 共享 userData（id/layer/kind 等）
  pickables.push(hitMesh)
  // 不加入 meshes 数组，不参与 opacity/ghost 调整
  // 不加入 scene（或加入但 material.visible=false 确保不渲染）
}
```

关键约束：
- 碰撞球 **不加入 `scene`**（或 `material.visible = false`），因此完全不渲染
- 碰撞球 **不需要同步位置**（它和对应的可视 mesh 位置相同，固定在 homePosition）
- 碰撞球 **不参与 ghost/fade/opacity 调整**（不在 `sceneObjs.nodes` 中）
- 碰撞球的 `userData` 复制自对应 mesh，点击时 `obj.userData.id` 返回正确的 entity ID

**影响范围**：仅 R3 节点（layer === 3），R1/R2 节点几何体已足够大（0.05/0.03），不需要碰撞球。

## 5. 键盘快捷键提示

### 实现

在 CosmosView 的 HUD 区域底部（canvas 下方或右下角）添加一个半透明提示条：

```
R 显示关联   Esc 返回   滚轮缩放   拖拽旋转   Ctrl+K 搜索
```

- 仅在 **global_overview** 状态下显示（用户最需要引导的时刻）
- 进入 region_zoom / node_focus 后自动隐藏（用户已经知道怎么操作）
- 3 秒后自动淡出（`opacity` transition 到 0），鼠标移入 HUD 区域重新显示
- 样式：`font-size: var(--fs-1)`，`color: var(--text-4)`，背景 `var(--surface-1)` 半透明

### 实现位置

在 CosmosView 模板中添加一个 `div.shortcuts-hint`，用 `v-if="store.state.kind === 'global_overview'"` 控制显隐。自动淡出逻辑用一个 `ref<boolean>` + `setTimeout` 实现。

## 6. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `frontend/src/cosmos/scene.ts` | `cssVar()` rgba 剥离 + R3 碰撞球 | +20 行 |
| `frontend/src/views/CosmosView.vue` | 加载/错误/空态 UI + 快捷键提示 + 模板控制 | +60 行 |

## 7. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 控制台清洁
# - 打开 Atlas，F12 控制台不应再有 "THREE.Color: Alpha component" 警告
# - 之前的 13 条警告全部消失

# 3. 加载态
# - 清除浏览器缓存/ localStorage
# - 打开 Atlas → 应看到加载指示器（短暂出现后切换到 3D 场景）
# - 或通过 Chrome DevTools 限速（Slow 3G）观察加载态

# 4. 错误态
# - 停止后端（taskkill /F /IM python.exe）
# - 临时改名 mock/cosmos.json → mock/cosmos2.json
# - 打开 Atlas → 应看到错误信息 + 重试按钮
# - 恢复 mock 文件 → 点击重试 → 应成功加载

# 5. 空态
# - 用空的 cosmos 数据（lifelines: [], entities: [], associations: []）
# - 应显示 "暂无 lifeline" 引导文案

# 6. R3 点击精度
# - 在 region_zoom 中，尝试点击小 R3 节点
# - 节点周围 ~2 倍半径范围的点击应命中
# - 不误触：两个相邻 R3 节点不应同时响应（碰撞球不应重叠到相邻节点）

# 7. 快捷键提示
# - global_overview 下看到快捷键提示条
# - 3 秒后自动淡出
# - 鼠标移到 HUD 区域重新出现
# - 进入 region_zoom 后消失
# - 回到 global_overview 重新出现

# 8. 不破坏现有功能
# - 搜索功能正常
# - hover 高亮正常（碰撞球不应被 hover 高亮影响）
# - 状态机转换正常
# - NodeDetailCard 正常
```

## 8. 禁止事项

- 不做动画框架/loading spinner 库依赖
- 碰撞球不改变节点外观
- 快捷键提示不做键盘图/图标 — 纯文字即可
- 不修改 `tokens.css` 中的颜色定义（只在读取时剥离 alpha）
- 不做 R1/R2 的碰撞球
- 不做重试次数限制/指数退避

## 9. 提交风格

```
fix: 011 — Atlas 鲁棒性打磨（cssVar rgba 修复 + 加载态 + 点击精度 + 快捷键提示）

- cssVar() 剥离 rgba alpha 通道，消除 13 条 THREE.Color 控制台警告
- CosmosView 增加加载态（旋转环）、错误态（信息+重试）、空态（引导文案）
- R3 节点增加不可见碰撞球（0.04 半径），点击精度提升约 2x
- global_overview 下显示快捷键提示条，3 秒自动淡出
```
