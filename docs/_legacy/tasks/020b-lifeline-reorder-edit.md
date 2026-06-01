# 020b — Lifeline 拖拽排序 + 编辑/删除完善

> 020a 把 LifelinePanel 定位为空间索引，面板 → 3D 联动已稳定。本轮补齐同级排序（`order_index` 字段已有，只是面板不能拖拽调整）和 lifeline 编辑/删除的交互打磨。纯前端。

## 1. 范围

| 文件 | 改动 | 估算 |
|---|---|---|
| `LifelinePanel.vue` | HTML5 拖拽排序 + 双击编辑 + 行内编辑/删除按钮 | +120 行 |
| `ContextMenu.vue` | R1/R2 3D 节点右键增加编辑/删除 | +25 行 |
| `CosmosView.vue` | ContextMenu 新增事件的 handler | +30 行 |

**总计约 175 行**。

## 2. 产品边界

- **做**：同级拖拽排序（HTML5 DnD）、双击 lifeline 名称编辑、面板行内编辑/删除按钮、3D R1/R2 右键编辑/删除
- **不做**：跨级拖拽（改 `parent_id`）、批量 entity 操作、批量更新 order_index、拖拽动画库
- `order_index` 更新复用现有 `store.updateLifeline(id, { order_index })` API，不加新端点
- 不修改 `layout.ts`（`ORDER BY order_index` 后端已做，reload 后自动生效）

## 3. 拖拽排序

### 3.1 交互

```
┌─ Lifeline ──────────────────────────────┐
│  7 lifeline · 42 entity                 │
│  T:12 M:18 D:8 I:4                      │
│  ─────────────────────────────────────  │
│  ⠿ ▼ Rust 学习 T:3 M:2 D:1 I:0 (6)     │  ← hover 显示拖拽手柄
│  ⠿ ▶ Axiom 开发 T:5 M:1 D:2 I:0 (8)    │
│  ⠿ ▶ 健康 T:2 M:1 D:0 I:1 (4)          │
│  ─── 拖到这里 ───                        │  ← 拖拽时显示插入线
|  ⠿ ▶ 财务 T:0 M:3 D:0 I:0 (3)          │
```

- **拖拽手柄** `⠿`：每行左侧，默认 `opacity: 0`，hover 行时显示（`opacity: 0.4`），拖拽时 `opacity: 1`
- **拖拽范围**：仅同级 lifeline（相同 `parent_id`），不同级之间不触发 drop
- **插入线**：拖拽经过同级行时，根据鼠标位置画一条 accent 色横线（2px 高，`var(--accent)`）
- **释放**：计算新 `order_index` → 调用 `store.updateLifeline(id, { order_index })` → 自动 `reload()` → 3D 布局重算

### 3.2 order_index 计算

使用浮点数插入，避免批量更新：

```
插到 A 和 B 之间 → new_order = (A.order_index + B.order_index) / 2
插到最前面      → new_order = first.order_index - 1
插到最后面      → new_order = last.order_index + 1
```

一次 API 调用即可，不需要批量更新其他行的 order_index。

### 3.3 实现

使用原生 HTML5 Drag and Drop API（不引入 sortablejs）：

- `.tree-row` 加 `draggable="true"`
- `@dragstart`：存 `{ lifelineId, parentId }` 到 `dataTransfer`，设 `dragOverParent = parentId`
- `@dragover`（在 panel 容器上）：`e.preventDefault()`，计算 `dragOverIndex`（鼠标 Y vs 同级行 DOM rect 中点）
- `@dragleave`：清 `dragOverIndex = -1`
- `@drop`：读拖拽源，计算新 order_index，调用 API
- 插入线用 `v-if="dragOverIndex === i"` 渲染在行与行之间

拖拽状态用 refs 管理：
```typescript
const dragItem = ref<{ id: string; parentId: string } | null>(null)
const dragOverIndex = ref(-1)
```

`@dragend` 时清理状态。

### 3.4 代码量

约 +80 行。

## 4. 双击编辑 lifeline 名称

### 4.1 交互

当前编辑 lifeline 名称需要点击 `...` 按钮 → 展开编辑表单 → 在 input 中修改 → 保存。流程偏长。

新增：**双击 lifeline 名称** → 直接进入编辑模式（名称变为 input）。

```
  ⠿ ▼ Rust 学习 T:3 M:2 ...      双击前
  ⠿ ▼ [Rust 学习________] 保存 取消  双击后（input 替换名称文本）
```

### 4.2 实现

- `.name` 上绑 `@dblclick="startEdit(node.lifeline)"`，同时阻止单击冒泡（否则会触发 focus-lifeline）
- 实际上：双击时不应触发单击。使用 `dblclick` 事件 + 在 `clickLifeline` 中判断。简化方案：`@dblclick.stop` 绑定 startEdit，clickLifeline 不变（双击时浏览器会先触发两次 click，但 Vue 的 dblclick 独立处理）

或者：双击 → `startEdit`，单击 → `clickLifeline`（聚焦 lifeline）。两者不冲突：双击编辑名称时自然也会聚焦该 lifeline（startEdit 不改变 3D 状态）。

关键：`.name` 的 `@click` 保留，新增 `@dblclick`。双击时先触发一次 click（Region Zoom），然后触发 dblclick（编辑名称），这是可接受的行为。

### 4.3 代码量

约 +5 行。

## 5. 面板行内编辑/删除按钮

### 5.1 问题

当前编辑和删除都藏在 `...` 按钮后面，需要两次点击才可见。改为 hover 时直接显示编辑和删除图标。

### 5.2 方案

```
  ⠿ ▼ Rust 学习 T:3 M:2 D:1 I:0 (6)  ✎  ✕
                        ↑ hover 时显示 ↑
```

- 编辑按钮 `✎`：点击 → `startEdit(node.lifeline)`，等价于双击名称
- 删除按钮 `✕`：点击 → `deletingId = node.lifeline.id`（显示确认行，保持现有确认逻辑）
- 两个按钮用现有的 `.btn-icon` 样式，hover 时出现（opacity 动画或 `v-show` + CSS）

替代现有的 `...` 按钮（移除 `...` 按钮以及 `editingId !== node.lifeline.id` 的条件渲染）。

### 5.3 删除确认

保持现有的确认删除逻辑（`deletingId` ref），删除确认行不变：

```
  确定删除「Rust 学习」？挂载的 6 个 entity 将被卸载。
  [确认删除] [取消]
```

### 5.4 代码量

约 +30 行（替换 `...` 按钮逻辑，加 hover 样式）。

## 6. 3D R1/R2 右键编辑/删除

### 6.1 问题

当前 3D 球面上右键 R1/R2 lifeline 节点时，ContextMenu 的内容不够完整。`layer === 1 || layer === 2` 时应有编辑名称和删除选项。

### 6.2 ContextMenu 改动

在 `region_zoom` 或 `node_focus` 状态下，右键 layer 1 或 2 的节点时，菜单增加：

```
┌─────────────────────┐
│  编辑名称…          │  ← 已有（部分情况）
│  删除 lifeline      │  ← 新增
└─────────────────────┘
```

- `编辑名称`：已有（`onContextEditTitle`），确认 layer 1/2 时能走到正确的分支
- `删除`：新增 emit `delete-lifeline`（参数 `{ lifelineId: string, lifelineName: string }`）

### 6.3 CosmosView 改动

接收 `delete-lifeline` 事件 → 弹出确认 → 调用 `store.deleteLifeline(id)` → 回到 `global_overview`。

实现确认：可以用 `window.confirm`（简单克制），也可以用一个轻量的内联确认 dialog。建议直接在 handler 中用 `window.confirm` 保持简洁：

```typescript
async function onContextDeleteLifeline(lifelineId: string) {
  if (!window.confirm('确定删除此 lifeline？挂载的 entity 将被卸载。')) return
  await store.deleteLifeline(lifelineId)
  store.transition({ kind: 'global_overview' })
}
```

如果 `window.confirm` 太丑，可以在 CosmosView 中加一个简单的确认浮层（类似 NodeDetailCard 的编辑模式），但 `window.confirm` 对于管理操作是可接受的。

### 6.4 代码量

约 +30 行（ContextMenu +10，CosmosView +20）。

## 7. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 拖拽排序
# - 打开 Atlas → LifelinePanel
# - hover lifeline 行 → 左侧出现拖拽手柄 ⠿
# - 拖拽 "Rust 学习" 到 "健康" 上方 → 插入线出现
# - 松开 → 列表重排
# - 3D 球面 R1 扇区位置变化
# - 刷新页面 → 排序保持

# 3. 人肉验证 — 拖拽边界
# - R2 子 lifeline 只能在同父级下拖拽
# - 拖到不同父级的区域 → 不显示插入线，drop 无效
# - 拖到面板外 → 松开，取消，列表不变

# 4. 人肉验证 — 双击编辑
# - 双击 lifeline 名称 → 名称变为 input
# - 修改后 Enter → 保存，名称更新
# - Esc → 取消编辑
# - 3D label 同步更新（reload 后）

# 5. 人肉验证 — 行内按钮
# - hover lifeline 行 → 出现 ✎ ✕ 按钮
# - 点击 ✎ → 进入编辑（等价于双击名称）
# - 点击 ✕ → 出现删除确认行
# - 确认删除 → lifeline 消失，3D 更新
# - 取消 → 确认行消失

# 6. 人肉验证 — 3D 右键编辑/删除
# - region_zoom 状态 → 右键 R2 lifeline 节点
# - 菜单出现"编辑名称""删除 lifeline"
# - 编辑名称 → 弹出编辑框 → 保存 → 3D label 更新
# - 删除 → confirm → lifeline 消失，回到 global_overview

# 7. 人肉验证 — 不破坏
# - 点击 lifeline 名称（非双击）→ Region Zoom + ghost 正常（020a 功能）
# - entity 点击跳转 3D 正常（020a 功能）
# - 种类细分显示正常
# - 统计摘要正常
# - 新建 lifeline 正常
# - 路径查找正常
```

## 8. 禁止事项

- 不引入拖拽库（sortablejs 等）
- 不修改后端、数据库
- 不修改 `layout.ts`
- 不在 tokens.css 新增颜色
- 不做跨级拖拽
- 不做批量 order_index 更新
- 拖拽手柄用 Unicode 字符 `⠿`（U+283F），不用 emoji
- 删除确认优先用 `window.confirm`，不新建 dialog 组件

## 9. 提交风格

```
add: 020b — Lifeline 拖拽排序 + 编辑/删除完善

- LifelinePanel: HTML5 同级拖拽排序，浮点 order_index 写入后端
- LifelinePanel: 双击名称编辑 + hover 显示编辑/删除按钮
- ContextMenu: R1/R2 3D 节点右键增加编辑名称/删除
- CosmosView: 处理 delete-lifeline 事件
```
