# 013 — Atlas 实体编辑（右键菜单 + 内联编辑 + 快速创建）

> Atlas 目前是"只读"的——可以看节点、看关联、看证据，但不能改任何东西。要编辑 entity 标题、把 entity 移到另一个 lifeline、或者删除 entity，都必须回到 Capture 模式的 LifelinePanel 操作。本轮让 Atlas 变成可编辑的，同时不影响 3D 视角控制。

## 1. 范围

前端改动（store + CosmosView + NodeDetailCard + 新右键菜单组件）。后端 API 已就绪（PATCH entity、DELETE entity、POST entity 等端点已在 005e 中实现）。

**核心目标**：
- 右键 3D 节点 → 上下文菜单（编辑 / 移动 lifeline / 删除）
- NodeDetailCard 标题可双击内联编辑
- 右键 lifeline → "新建 entity" 快速入口
- 所有编辑操作即时反馈（optimistic update + 必要时 reload）

## 2. 产品边界

- 不做多选/批量操作
- 不做 undo/redo
- 不做拖拽移动（右键菜单 + 下拉选择 lifeline 替代）
- 不做关联创建/编辑（那是另一轮的事）
- 编辑操作需要后端 API 成功才算完成（失败回滚）

## 3. 右键上下文菜单

### 3.1 触发

- 右键点击 3D 节点（R1/R2/R3 都可以）
- 弹出上下文菜单，定位在鼠标位置
- 如果右键点击空白区域：不弹出菜单（保持现有旋转行为）

### 3.2 菜单内容

根据节点层级显示不同菜单项：

**R3 entity 节点**：
```
┌─────────────────────┐
│  编辑标题…          │
│  移动到 lifeline ▸  │  ← 子菜单：列出所有 lifeline
│  ───────────────    │
│  删除               │  ← 红色/危险色
└─────────────────────┘
```

**R1/R2 lifeline 节点**：
```
┌─────────────────────┐
│  新建 entity ▸      │  ← 子菜单：task / memory / decision / item
│  编辑名称…          │
└─────────────────────┘
```

### 3.3 菜单组件

新建 `frontend/src/components/cosmos/ContextMenu.vue`：

- 绝对定位，使用 `position: fixed`
- 点击菜单外部 → 关闭
- 按 Esc → 关闭
- 点击菜单项 → 执行操作 + 关闭
- 子菜单（"移动到 lifeline"、"新建 entity"）：hover 展开右侧子面板
- 删除项用红色文字

### 3.4 位置计算

菜单应显示在鼠标点击位置，但防止溢出屏幕：

```typescript
function menuPosition(e: MouseEvent, menuW: number, menuH: number) {
  let x = e.clientX
  let y = e.clientY
  if (x + menuW > window.innerWidth) x = window.innerWidth - menuW - 4
  if (y + menuH > window.innerHeight) y = window.innerHeight - menuH - 4
  return { x, y }
}
```

### 3.5 实现思路

在 `CosmosView` 的 canvas click handler 中检测右键：
```typescript
canvasRef.value.addEventListener('contextmenu', (e: MouseEvent) => {
  e.preventDefault()
  // raycast 检测节点
  // 如果命中 → 设置 contextMenu { x, y, nodeId, nodeKind, nodeLayer, nodeTitle }
  // 如果未命中 → 不弹菜单
})
```

## 4. NodeDetailCard 内联编辑

### 4.1 标题双击编辑

- 双击 entity 标题文字 → 切换为 `<input>` 输入框
- Enter 或失焦 → 保存（调 PATCH API）
- Esc → 取消编辑，恢复原标题

```typescript
async function saveTitle(newTitle: string) {
  if (!entity.value || newTitle.trim() === entity.value.title) return
  const parts = entity.value.id.split(':')
  const kind = parts[0]
  const rawId = parseInt(parts.slice(1).join(':'), 10)
  try {
    await updateEntity(kind, rawId, { title: newTitle.trim() })
    await store.reload()
  } catch {
    // 失败回滚：reload 恢复数据
    await store.reload()
  }
}
```

### 4.2 关联的 API

`frontend/src/api/endpoints.ts` 需要新增（如果还不存在）：

```typescript
export const updateEntity = (kind: string, id: number, data: { title?: string; lifeline_id?: string }) =>
  apiRequest(`/${kind}/${id}`, { method: 'PATCH', body: data })

export const deleteEntity = (kind: string, id: number) =>
  apiRequest(`/${kind}/${id}`, { method: 'DELETE' })

export const createEntity = (kind: string, data: { title: string; lifeline_id: string; meta?: any }) =>
  apiRequest(`/${kind}`, { method: 'POST', body: data })
```

实现者需要确认后端是否已有这些端点，如没有则需要补充。如果后端端点已存在但路径不同，以实际后端路径为准。

## 5. 移动 Entity 到另一个 Lifeline

右键菜单中点击"移动到 lifeline" → 子菜单列出所有 lifeline（R1 + R2），点击目标 lifeline → 调 API 更新 `lifeline_id` → reload。

子菜单结构：
```
移动到 lifeline ▸  ┌──────────────────┐
                   │ 健康             │ ← R1
                   │   心肺           │ ← R2 缩进
                   │   饮食           │
                   │ Rust 学习        │ ← R1
                   │   所有权         │
                   │   Trait 系统     │
                   │ Axiom 开发       │
                   │ ...              │
                   └──────────────────┘
```

当前 entity 所在的 lifeline 标记为 ✓ 或灰色（不可重复选择）。

## 6. 快速创建 Entity

右键 lifeline 节点 → "新建 entity" → 子菜单选 kind → 弹出小型输入框：

```
┌─────────────────────────┐
│ 新建 task               │
│                         │
│ [_____________________] │ ← 标题输入框
│                         │
│       [取消]  [创建]    │
└─────────────────────────┘
```

- 默认 kind 为 `task`
- 输入框自动聚焦
- Enter → 创建
- Esc → 取消
- 创建成功后 `store.reload()`，新 entity 出现在 3D 场景中

## 7. 删除 Entity

右键 entity → "删除" → 弹出确认：

```
┌──────────────────────────┐
│ 确定删除「每天跑步 30 分钟」？  │
│ 此操作不可撤销。          │
│                          │
│       [取消]  [删除]     │
└──────────────────────────┘
```

- "删除"按钮为红色/危险色
- 确认后调 DELETE API → reload
- 不要用 `window.confirm` ——用自定义确认弹窗

## 8. 确认弹窗组件

新建 `frontend/src/components/cosmos/ConfirmDialog.vue`：

- 小型居中弹窗，覆盖在 3D 场景上
- props: `title` (string), `message` (string), `confirmLabel` (string), `danger` (boolean)
- emits: `confirm`, `cancel`
- 背景半透明遮罩
- Esc → cancel

## 9. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `frontend/src/components/cosmos/ContextMenu.vue` | **新建**：右键菜单 + 子菜单 | +200 行 |
| `frontend/src/components/cosmos/ConfirmDialog.vue` | **新建**：确认弹窗 | +80 行 |
| `frontend/src/components/cosmos/NodeDetailCard.vue` | 标题双击编辑 + 内联 input | +60 行 |
| `frontend/src/api/endpoints.ts` | 新增 updateEntity / deleteEntity / createEntity | +30 行 |
| `frontend/src/views/CosmosView.vue` | contextmenu handler + 菜单状态管理 + 集成 | +80 行 |
| `frontend/src/stores/cosmos.ts` | 可能需要加 contextMenu 状态（或全在 CosmosView 本地管理） | +10 行 |

**总计约 460 行**，比 009-012 的单任务规模大 2-3 倍。

## 10. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 右键菜单
# - 右键 R3 entity → 弹出菜单（编辑/移动/删除）
# - 右键 R1/R2 lifeline → 弹出菜单（新建 entity/编辑名称）
# - 右键空白区域 → 不弹菜单
# - 点击菜单外部 → 关闭
# - Esc → 关闭

# 3. 人肉验证 — 标题编辑
# - 双击 NodeDetailCard 中的 entity 标题
# - 输入新标题 → Enter → 标题更新
# - 双击 → 输入 → Esc → 不保存，恢复原标题

# 4. 人肉验证 — 移动 lifeline
# - 右键 entity → 移动到 lifeline → 在子菜单中选目标 lifeline
# - entity 移到新 lifeline → 3D 场景中节点位置变化
# - NodeDetailCard 中 lifeline 路径更新

# 5. 人肉验证 — 新建 entity
# - 右键 R1/R2 lifeline → 新建 entity → 选 kind → 输入标题 → 创建
# - 新 entity 出现在 3D 场景中
# - LifelinePanel 中对应 lifeline 的 entity count +1

# 6. 人肉验证 — 删除 entity
# - 右键 R3 entity → 删除 → 确认弹窗出现
# - 点击删除 → entity 从场景中移除
# - 点击取消 → entity 保留

# 7. 不破坏
# - 左键点击行为不变（导航/状态切换）
# - 搜索不变
# - 关联线点击不变
# - hover 高亮不变
# - 关联线 hover 高亮不变
```

## 11. 禁止事项

- 不做拖拽（drag & drop）
- 不做批量选择/批量操作
- 不做关联创建/编辑
- 不修改后端 API（如果 PATCH/DELETE 端点不存在则需要补充，但不改现有端点逻辑）
- 不在 global_overview 状态下弹出菜单（仅 region_zoom / node_focus / relation_reveal）
- 不破坏现有左键点击交互

## 12. 提交风格

```
add: 013 — Atlas 实体编辑（右键菜单 + 内联编辑 + 快速创建/移动/删除）

- 新增 ContextMenu 组件：右键 3D 节点弹出菜单，支持子菜单展开
- 新增 ConfirmDialog 组件：操作确认弹窗
- NodeDetailCard 标题双击内联编辑，Enter 保存 / Esc 取消
- 右键 R3 entity → 编辑标题 / 移动到 lifeline / 删除
- 右键 R1/R2 lifeline → 新建 entity（task/memory/decision/item）/ 编辑名称
- API 层新增 updateEntity / deleteEntity / createEntity
```
