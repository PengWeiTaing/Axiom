# 017 — Atlas 导航增强：Mini-map + 相机复位 + 导航提示

> 013-016 解决了编辑和可读性，但空间导航仍然靠"摸索"——用户放大到 R3 后容易迷失方位，不知道自己在哪个 lifeline 下、整体结构在哪。本轮加 minimap 和导航辅助，让 3D 空间可驾驭。

## 1. 范围

前端改动（1 个新组件 + CosmosView + scene 辅助）。不涉及后端。

**核心目标**：
- 右下角 2D minimap：显示球面树俯视图（R1/R2 lifeline + 当前聚焦区域）
- minimap 上标记当前相机视口范围
- 点击 minimap → 相机飞向对应区域
- Home 按钮：一键回到 global_overview（覆盖所有状态）
- 当前 lifeline 路径面包屑增强（显示完整层级路径）

## 2. 产品边界

- minimap 不做为独立可交互的 3D 视图（只是 2D 投影）
- minimap 不显示 R3 entity 细节（太小，只显示聚类点或密度热区）
- 不做 minimap 的拖拽/缩放（点击跳转就够了）
- 不做键盘快捷键的自定义（现有键位不变）
- 不引入新的 npm 依赖（用 Three.js + Canvas 2D API 或纯 CSS/HTML）

## 3. Mini-map 设计

### 3.1 视觉规格

```
┌──────────────────────┐
│ ·  ·  ·              │  ← R1 lifeline 位置（accent 色圆点）
│   ·  ┌─────┐         │  ← 相机视口指示器（accent 色矩形框）
│  ·  ·│     │·        │
│      │     │  ·      │
│   ·  └─────┘ ·       │
│ ·        ·  ·        │
│              ·       │
└──────────────────────┘
   180 × 180 px
```

- 位置：右下角，距底部 `--s-8`，距右侧 `--s-4`
- 大小：180 × 180 px
- 背景：`--surface-1` + `--r-2` 圆角 + 半透明（opacity 0.85）
- R1 节点：accent 色圆点，直径 6px
- R2 节点：text-3 色圆点，直径 4px
- 相机视口指示器：accent 色矩形框（线宽 1px），表示当前相机看向的区域
- 当前聚焦的 R1 lifeline：高亮圆环标记

### 3.2 坐标映射

Mini-map 是**俯视图**（top-down projection），XZ 平面映射到 minimap 的 XY。

映射公式（3D → minimap 2D）：

```typescript
function projectToMinimap(pos: THREE.Vector3, mapSize: number, worldRadius: number): { x: number; y: number } {
  // 俯视：使用 x 和 z 坐标（Three.js Y 轴朝上）
  const scale = mapSize / (worldRadius * 2.4)  // 留 20% 边距
  const cx = mapSize / 2
  const cy = mapSize / 2
  return {
    x: cx + pos.x * scale,
    y: cy - pos.z * scale,  // Three.js 的 z 轴在 minimap 中朝下
  }
}
```

### 3.3 相机视口指示器

计算当前相机在 XZ 平面的投影区域：

```typescript
function computeViewportRect(camera: THREE.PerspectiveCamera, mapSize: number, worldRadius: number) {
  // 相机在 XZ 平面上的投影位置
  const camXZ = new THREE.Vector2(camera.position.x, camera.position.z)
  // 相机看向目标的 XZ 投影
  const lookTarget = new THREE.Vector3(0, 0, 0) // 或 controls.target
  const lookXZ = new THREE.Vector2(lookTarget.x, lookTarget.z)
  // 视口大小与距离成正比
  const dist = camera.position.length()
  const viewSize = dist * 0.4  // 粗略的视锥体宽度
  // ... 返回矩形坐标
}
```

简化方案：用相机位置 + 固定大小的框来表示视口，框的大小随相机 distance 变化。

### 3.4 点击跳转

点击 minimap → 逆映射到 3D 世界坐标 → tween 相机到对应位置。

```typescript
function minimapToWorld(mx: number, my: number, mapSize: number, worldRadius: number): THREE.Vector3 {
  const scale = mapSize / (worldRadius * 2.4)
  const cx = mapSize / 2
  const cy = mapSize / 2
  const wx = (mx - cx) / scale
  const wz = -(my - cy) / scale  // 逆映射
  // 相机位置从世界原点向外推到合适距离
  const dir = new THREE.Vector3(wx, 0.3, wz).normalize()
  return dir.multiplyScalar(4.5)  // 中距离视角
}
```

### 3.5 实现方式

**方案 A**：纯 `<canvas>` 元素，用 Canvas 2D API 绘制。每次 `animate()` 时重绘。
**方案 B**：HTML/CSS 绝对定位元素（圆点用 div），更新位置用 CSS transform。

推荐**方案 A**（canvas）—— 性能更好，绘制更灵活。

新建 `frontend/src/components/cosmos/Minimap.vue`：

```typescript
// Props
interface Props {
  layoutNodes: LayoutNode[]
  camera: THREE.PerspectiveCamera
  controls: any  // OrbitControls
  worldRadius: number
}

// Emits
defineEmits<{
  (e: 'jump', position: THREE.Vector3, target: THREE.Vector3): void
}>()
```

组件内部用 `requestAnimationFrame` 或通过 `watch` 更新绘制。

## 4. Home 按钮

### 4.1 设计

在 Breadcrumb 旁边加一个小 Home 按钮（图标：⌂ 或 home）：

```
[⌂] 全局 > 健康 > ...
```

### 4.2 行为

点击 → 无条件 transition 到 `global_overview`（无论在哪个状态）。

```typescript
function goHome() {
  store.transition({ kind: 'global_overview' })
}
```

- 清除关联筛选状态
- 相机自动飞回默认位置（现有 onStateChange 已处理）
- 按钮在 `global_overview` 状态下禁用或隐藏

### 4.3 实现

直接在 `CosmosView.vue` 的 Breadcrumb 模板附近加一个按钮，不需要新建组件。

## 5. 面包屑增强

### 5.1 当前状态

Breadcrumb 组件已存在（`frontend/src/components/cosmos/Breadcrumb.vue`），显示当前状态层级。本轮做小改进：

- `node_focus` 时：显示完整路径 `全局 > [R1名称] > [R2名称] > [entity标题]`
- `region_zoom` 时：显示 `全局 > [R1名称]`，如果聚焦的是 R2 则在 R1 下展开
- 每个层级可点击（全局/中间 lifeline 可点击跳转）

### 5.2 实现

如果 Breadcrumb 已实现这些功能，只需验证和微调。如果未实现，需要增强。

## 6. 自适应导航提示

### 6.1 当前状态

快捷键提示在 `global_overview` 3 秒后淡出（011 实现）。用户可能忘了可用的操作。

### 6.2 改进

- 在每个状态下显示**不同的**快捷键提示：
  - `global_overview`：点击 R1 进入 lifeline | 滚轮缩放 | 拖拽旋转
  - `region_zoom`：点击 R2/R3 聚焦 entity | 滚轮缩放 | Esc 返回全局
  - `node_focus`：R 查看关联 | Esc 返回 lifeline
  - `relation_reveal`：Esc 返回焦点 | 点击关联线查看证据
- 提示在状态切换时重新显示 3 秒后再淡出
- 按 `?` 键显示完整快捷键面板（可选，如果行数够）

### 6.3 实现

在 `CosmosView.vue` 中 `watch(() => store.state.kind, ...)` 时重置 hint 计时器。

## 7. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `frontend/src/components/cosmos/Minimap.vue` | **新建**：2D 俯视 minimap + canvas 绘制 | +200 行 |
| `frontend/src/views/CosmosView.vue` | 集成 minimap + Home 按钮 + 导航提示增强 | +80 行 |
| `frontend/src/components/cosmos/Breadcrumb.vue` | 路径增强（完整层级 + 可点击跳转） | +60 行 |
| `frontend/src/cosmos/scene.ts` | 导出 `worldRadius` 常量供 minimap 使用 | +5 行 |

**总计约 345 行**。

## 8. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — Minimap
# - Atlas 启动 → 右下角出现 minimap
# - minimap 显示 R1 节点（accent 色圆点）+ R2 节点（text-3 色圆点）
# - 有矩形框表示当前相机视口
# - 相机旋转/缩放 → minimap 上视口框位置/大小跟随变化
# - 点击 minimap 上某个区域 → 相机飞向对应位置
# - 切换到 region_zoom → 当前聚焦的 R1 节点有高亮标记

# 3. 人肉验证 — Home 按钮
# - 在 region_zoom / node_focus / relation_reveal 下
# - Breadcrumb 旁边出现 Home 按钮
# - 点击 → 回到 global_overview
# - global_overview 下 Home 按钮隐藏

# 4. 人肉验证 — 面包屑
# - region_zoom → 面包屑显示 "全局 > [R1名称]"
# - node_focus → 面包屑显示 "全局 > [R1名称] > [R2名称] > [entity标题]"
#   - 如果没有 R2 则 "全局 > [R1名称] > [entity标题]"
# - 点击面包屑中的 "全局" → 回到 global_overview
# - 点击 R1/R2 名称 → 回到对应 region_zoom

# 5. 人肉验证 — 导航提示
# - 状态切换时，底部快捷键提示重新出现
# - 不同状态显示不同提示文字
# - 3 秒后淡出

# 6. 不破坏
# - 所有现有交互正常（点击/右键/关联线/搜索）
# - 3D 渲染性能不下降（minimap 绘制开销极小）
# - minimap 不拦截 3D canvas 的鼠标事件
```

## 9. 禁止事项

- 不在 minimap 上做拖拽/缩放（会与主 canvas 冲突）
- 不修改 layout.ts 的布局算法
- 不改变现有键盘快捷键映射
- 不引入新 npm 依赖
- minimap 样式用 tokens.css 变量
- minimap 的 pointer-events 只在自己区域内生效

## 10. 提交风格

```
add: 017 — Atlas 导航增强（minimap + Home 按钮 + 面包屑增强 + 自适应导航提示）
```
