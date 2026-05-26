# 020 — Lifeline 面板增强（拖拽排序 + 实体 badge + 统计）【废案】

> **已废弃**，由 [020a](./020a-lifeline-spatial-index.md) 替代。缩小范围：020a 聚焦"空间索引"定位，去掉拖拽/编辑/删除，把这些留给 020b。
>
> 原描述：LifelinePanel 目前仅支持基本的 CRUD 和 entity 列表展开，缺少三个关键体验：同级排序（有 `order_index` 字段但面板不能拖拽调整）、3D 球面上 R1/R2 节点缺乏实体数量提示、面板统计只有总数没有种类细分。本轮补齐。

## 1. 范围

纯前端（2 个修改 + 1 个新建小组件）。无后端、无新 API、无新依赖。

**核心目标**：
- LifelinePanel 支持 HTML5 拖拽排序（同级 lifeline），自动更新 `order_index` 并刷新布局
- R1/R2 3D 节点显示实体数量 badge（CSS2D label）
- LifelinePanel 展开后显示按种类（task/memory/decision/item）细分的实体数量
- LifelinePanel 顶部加统计摘要行

## 2. 产品边界

- 不做跨级拖拽（不支持把 R2 lifeline 拖到 R1 层级——那等于改 `parent_id`，属于不同操作）
- 不做 R0 root 节点的 badge
- 不做批量选中 entity 后移动（选择多 entity → 统一挂载到另一 lifeline）——留到后续
- 不做拖拽动画（CSS transition 足够）
- 不做面板内的 entity 种类筛选（只是显示计数，不筛选）
- R1/R2 badge 只显示直接挂载的 entity 数量（不含子 lifeline 的递归汇总）

## 3. 拖拽排序

### 3.1 交互

LifelinePanel 树中同级 lifeline 之间支持拖拽重排：

```
┌─ Lifeline ──────────────────────────┐
│  [::] 健康 (5)                      │  ← 拖拽手柄
│    ▶ 心肺 (3)                       │
│    ▶ 饮食 (2)                       │
│    ▶ 睡眠 (1)                       │
│  [::] Rust 学习 (8)                 │  ← 可拖到"健康"上方
│  [::] Axiom 开发 (12)               │
```

- 每行左侧显示拖拽手柄 `⠿`（或 `⋮⋮`），仅在 hover 时出现
- 拖拽只在同级（相同 parent_id）之间生效
- 拖拽时显示插入线（蓝色横线，`var(--accent)`），指示目标位置
- 松开后：
  1. 乐观更新本地 lifeline 数组的 `order_index`
  2. 调用 `store.updateLifeline(id, { order_index: newIndex })` 更新后端
  3. store.reload() 触发 3D 布局重算（因为后端 `ORDER BY order_index` 后 R1 角度会变）

### 3.2 实现方式

**不引入拖拽库**。使用原生 HTML5 Drag and Drop API：

- `draggable="true"` 加在 `.tree-row` 上
- `@dragstart` → 设置 `dataTransfer` 存 lifeline id + parent_id
- `@dragover` → `e.preventDefault()` + 计算插入位置（根据鼠标 Y 相对于同级行）
- `@dragleave` → 清除插入线
- `@drop` → 读取拖拽源 id，计算新的 order_index，调用 API

插入位置计算：
```
同级 lifelines 列表（已排序），对每个 item 的 DOM rect：
- 鼠标 Y < item 中点 → 插入到 item 之前
- 鼠标 Y >= item 中点 → 插入到 item 之后
```

order_index 重排策略：
- 把目标位置的 lifeline 及之后的都后移 1
- 把拖拽源插入目标位置
- 或者更简单：直接把拖拽源的 order_index 设为目标位置的（目标位置原来的及其后的都 +1）

简化方案（推荐）：使用浮点数插入：
- 插到两个 lifeline 之间时，`new_order = (prev.order_index + next.order_index) / 2`
- 插到最前面时，`new_order = first.order_index - 1`
- 插到最后面时，`new_order = last.order_index + 1`
- 不需要批量更新其他行，一次 API 调用即可

在 LifelinePanel 中维护 `dragOverIndex` ref（-1 表示无拖拽悬停），模板中用 `v-if` 显示插入线。

### 3.3 代码量

约 +80 行（drag 事件处理 + 模板中的 draggable 属性 + 插入线样式）。

## 4. 3D 节点实体数量 Badge

### 4.1 显示内容

R1 和 R2 的 lifeline 节点（layer 1 和 2）在 3D 球面上显示一个小型 CSS2D badge，标注该 lifeline 直接挂载的 entity 数量。

```
    健康
    (5)    ← CSS2D badge，小号灰色，在 lifeline 名称下方
```

### 4.2 实现

修改 `scene.ts` 中的节点创建逻辑（或新建一个 `badgeLabels` 模块）：

- 对于 layer 1 和 2 的节点，额外创建一个 CSS2DObject
- 内容为 `<span style="font-size:9px;color:var(--text-4)">(5)</span>`
- 位置在节点 label 下方偏移 -0.06（Y 轴负方向）
- 使用 CSS2DRenderer 渲染（已有，不需要新 renderer）

如果 scene.ts 的 label 创建逻辑已经比较复杂，可以抽取一个 `createNodeLabels(node, entityCount)` 辅助函数。

### 4.3 计数来源

在 CosmosView 中（或 scene 构建时），预先计算 `Map<lifelineId, number>`：

```typescript
const entityCountByLifeline = new Map<string, number>()
for (const e of data.entities) {
  entityCountByLifeline.set(e.lifeline_id, (entityCountByLifeline.get(e.lifeline_id) || 0) + 1)
}
```

### 4.4 代码量

约 +40 行（计数 + CSS2DObject 创建）。

## 5. 实体种类细分

### 5.1 LifelinePanel 中的种类 Badge

当前展开 lifeline 后只显示总 entity 数量（`entityCount(lifelineId)`）。改进：显示按种类的细分。

```
┌─ Lifeline ──────────────────────────┐
│  ▼ Rust 学习  T:3 M:2 D:1 I:0 (6)  │  ← 种类细分 badge
│    T  所有权与借用的深层理解          │
│    T  Trait 系统的实际应用           │
│    M  Rust 内存管理笔记             │
│    ...                              │
```

实现：
- 在 `LifelinePanel.vue` 中添加 `entityCountsByKind(lifelineId)` 函数
- 返回 `{ task: number, memory: number, decision: number, item: number }`
- 在行模板中渲染为小 badge 组

样式：
- T: `var(--accent)` 色
- M: `var(--text-2)` 色
- D: `var(--warm)` 色
- I: `var(--text-3)` 色
- 总计数保留在括号中

### 5.2 代码量

约 +30 行（计数函数 + 模板 + 样式）。

## 6. 面板统计摘要

### 6.1 顶部统计行

在 LifelinePanel 头部下方加一行统计摘要：

```
┌─ Lifeline ──────────────────────────┐
│  7 lifeline · 42 entity    [+ 新建] │
│  ─────────────────────────────────  │
│  ▼ 健康  T:2 M:1 D:0 I:1 (4)       │
│  ...                                │
```

两行统计：
1. 总 lifeline 数（不含 ROOT）+ 总 entity 数
2. 全局种类细分

使用 computed：
```typescript
const stats = computed(() => {
  if (!store.data) return { lifelines: 0, entities: 0, byKind: { task: 0, memory: 0, decision: 0, item: 0 } }
  const byKind = { task: 0, memory: 0, decision: 0, item: 0 }
  for (const e of store.data.entities) {
    byKind[e.kind]++
  }
  return {
    lifelines: store.data.lifelines.length,
    entities: store.data.entities.length,
    byKind,
  }
})
```

### 6.2 代码量

约 +25 行（computed + 模板）。

## 7. 联动：拖拽排序 → 3D 布局刷新

### 7.1 问题

当前 `layout.ts` 中 R1 lifeline 的布局按 `data.lifelines` 数组顺序排列：

```typescript
const r1Lifelines = data.lifelines.filter(l => l.parent_id === data.root.id)
r1Lifelines.forEach((l, i) => {
  const phi = (i / r1Count) * Math.PI * 2  // 按数组索引分配角度
})
```

后端 `/cosmos` 返回的 lifelines 已按 `ORDER BY order_index, id` 排序（见 `cosmos.py:41`），所以拖拽更新 `order_index` 后调用 `store.reload()` 会自动改变 3D 球面上的角度扇区。

**无需改动 `layout.ts`**。只需要确保拖拽保存后调用 `reload()`（store.createLifeline / updateLifeline 已内置 reload，没问题）。

### 7.2 R2 同级排序

当前 `layout.ts:36-43` R2 布局用的是 `siblings.findIndex`，依赖后端返回的数组顺序。后端 `/cosmos` 查询所有 lifeline 时 `ORDER BY order_index`，所以 R2 同级 lifeline 的 findIndex 结果自然按 order_index 排序。同样无需改 layout.ts。

### 7.3 验证

拖拽排序后 → 3D 球面上对应扇区的位置变化 → 确认符合预期。

## 8. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `frontend/src/components/LifelinePanel.vue` | 拖拽排序 + 种类细分 + 统计摘要 | +150 行 |
| `frontend/src/cosmos/scene.ts` | R1/R2 CSS2D badge | +40 行 |
| `frontend/src/views/CosmosView.vue` | 传递给 scene 的 entityCountByLifeline Map | +15 行 |

**总计约 205 行**。偏小，追加以下内容。

## 9. 追加：右键 R1/R2 3D 节点 → 快捷编辑

### 9.1 问题

当前右键 R1/R2 lifeline 节点（3D 球面）只能编辑名称（region_zoom 状态下）。对于无法进入 region_zoom 的 R2 节点（R2 不触发 region_zoom，只有 R1 可以），用户无法编辑或删除。

### 9.2 方案

在 `node_focus` 状态下（聚焦 R1 或 R2 lifeline），3D 右键菜单增加：
- **编辑名称**（已有，保留）
- **删除 lifeline**（新增：确认后调用 `store.deleteLifeline`，返回 global_overview）
- **展开/折叠面板中的此项**（不做——与 3D 交互不一致）

实际上，当前 R2 的 node_focus 状态下右键菜单可能没有内容。检查 ContextMenu 中 `layer === 2` 的分支，补充编辑/删除。

### 9.3 实现

修改 ContextMenu.vue：
- `layer === 1 || layer === 2` 且 `state.kind === 'region_zoom' || state.kind === 'node_focus'` 时，菜单项：编辑名称、删除
- 删除需二次确认（类似 LifelinePanel 中的确认逻辑，但用菜单内的确认子菜单）

简化方案：删除走 `window.confirm`（临时，后续可优化）或者 emit 一个事件让 CosmosView 处理 toast 确认。

实际更好：ContextMenu emit `delete-lifeline` → CosmosView 显示一个简单的确认 dialog → 确认后删除。

### 9.4 代码量

约 +30 行（ContextMenu +5，CosmosView 删除确认逻辑 +25）。

追加后**总计约 235 行**。仍然偏小，再追加。

## 10. 追加：LifelinePanel 空状态引导

### 10.1 问题

当前空状态只有一行文字"暂无 lifeline"。首次进入 Atlas 的用户不知道 lifeline 是什么、怎么创建。

### 10.2 方案

改进空状态：

```
┌─ Lifeline ──────────────────────────┐
│                                     │
│     🌐                              │
│  暂无 Lifeline                      │
│                                     │
│  Lifeline 是实体分类的主线，        │
│  例如"健康""学习""工作"。           │
│  创建后实体将分布在 3D 球面上。     │
│                                     │
│  [+ 创建第一个 Lifeline]            │
│                                     │
└─────────────────────────────────────┘
```

- 使用现有 token 颜色（不用 emoji 也可以，用大号 `--text-4` 的图标字符如 `◇`）
- 点击按钮等价于点击"+ 新建"按钮

### 10.3 代码量

约 +20 行（模板替换）。

追加后**总计约 255 行**。仍然偏轻，再追加一个实用功能。

## 11. 追加：Entity 快速跳转（面板 → 3D）

### 11.1 问题

当前 LifelinePanel 展开 entity 列表后，点击 entity 行没有任何反应。用户期望点击后 3D 相机飞向该 entity。

### 11.2 方案

LifelinePanel 中的 entity 行点击时 emit 一个新事件 `focus-entity`（参数 entityId），CosmosView 收到后：
1. 相机飞向 entity 节点（使用 `cameraFlyTo` 或直接设置 controls.target + 更新 state）
2. transition 到 node_focus 状态

实现：
- LifelinePanel 新增 emit：`(e: 'focus-entity', entityId: string): void`
- entity 行 `@click="emit('focus-entity', ent.id)"`
- CosmosView 中处理 `focus-entity` → 找到 entity 节点位置 → 过渡到 node_focus

当前 LifelinePanel 已有 `focus-lifeline` emit（点击 lifeline 名称行）。`focus-entity` 是自然的扩展。

### 11.3 代码量

约 +30 行（LifelinePanel +10 emit/template，CosmosView +20 handler）。

追加后**总计约 285 行**。合适，停止追加。

## 12. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 拖拽排序
# - 打开 Atlas → LifelinePanel 显示 lifeline 列表
# - hover 某行 → 出现拖拽手柄 ⠿
# - 拖拽 "Rust 学习" 到 "健康" 上方 → 松开
# - 列表重新排列 → "Rust 学习" 在 "健康" 上面
# - 3D 球面刷新 → R1 各 lifeline 角度扇区重排
# - 刷新页面 → 排序保持（order_index 已持久化）

# 3. 人肉验证 — 拖拽边界
# - 拖到不同层级的 lifeline 之间 → 不触发 drop（非同 parent_id）
# - 拖到面板外部 → 取消，列表不变

# 4. 人肉验证 — 3D Badge
# - 球面 R1 节点旁边显示 entity 数量，如 "(5)"
# - R2 节点旁边同样显示
# - R0 root 节点不应有 badge
# - 在面板中创建/卸载 entity → badge 数字更新

# 5. 人肉验证 — 种类细分
# - 展开某个 lifeline → 名称行右侧显示 "T:2 M:1 D:0 I:1 (4)"
# - 种类颜色与 3D node 颜色一致：T=accent, M=text-2, D=warm, I=text-3

# 6. 人肉验证 — 统计摘要
# - 面板顶部显示 "N lifeline · M entity"
# - 数字随 CRUD 实时更新

# 7. 人肉验证 — R1/R2 右键编辑
# - 在 3D 球面上右键 R1/R2 lifeline 节点
# - 菜单中出现"编辑名称"和"删除"选项
# - 编辑名称 → 弹出编辑框 → 保存 → 3D label 更新
# - 删除 → 确认 → lifeline 消失，entity 被卸载

# 8. 人肉验证 — 空状态引导
# - 删除所有 lifeline → 面板显示引导信息
# - 点击"创建第一个 Lifeline"→ 新建表单展开

# 9. 人肉验证 — Entity 快速跳转
# - 展开 lifeline → 点击某个 entity 行
# - 3D 相机飞向该 entity → 进入 node_focus 状态
# - NodeDetailCard 出现，显示该 entity 详情

# 10. 人肉验证 — 不破坏
# - 现有 lifeline CRUD（新建/编辑/删除）正常
# - 现有 entity 搜索 + 挂载正常
# - entity 卸载按钮（×）正常
# - Ctrl+K 搜索正常
# - 右键菜单其他功能正常
# - 路径查找正常
```

## 13. 禁止事项

- 不引入拖拽库（sortablejs 等）——原生 HTML5 Drag API 足够
- 不修改后端
- 不修改 `layout.ts`（除非发现 bug）
- 不在 tokens.css 新增颜色
- 不做递归 entity 统计（子 lifeline 的 entity 不算入父级 badge）
- 拖拽手柄不用 emoji（用 CSS 画的 `⠿` 或 `⋮⋮` 字符）
- 批量 entity 操作不做（选中多 entity 统一移动）——那是 021 的内容
- 不做跨级拖拽

## 14. 提交风格

```
add: 020 — Lifeline 面板增强（拖拽排序 + badge + 统计 + 快速跳转）

- LifelinePanel: HTML5 拖拽排序（同级），浮点 order_index 写入后端
- scene: R1/R2 3D 节点 CSS2D entity 数量 badge
- LifelinePanel: 实体种类细分（T/M/D/I）+ 顶部统计摘要
- ContextMenu: R1/R2 右键增加编辑名称/删除
- LifelinePanel: 空状态引导 + entity 行点击跳转 3D
```
