# 014 — Atlas 关联编辑（手动创建/编辑/删除关联 + 证据管理）

> 013 让 Atlas 的 entity 可编辑了，但关联仍然只能看不能改。关联生成（005d）全自动产出 pending 关联，用户只能 accept/reject，无法手动创建新关联、修改关联属性、或删除错误的关联。本轮补上关联的手动编辑能力。

## 1. 范围

前端改动（3 个新组件 + CosmosView + store + API）。后端关联 CRUD 端点需新增（如果 005d 只有 generate + review，没有通用的 CRUD）。

**核心目标**：
- 在 relation_reveal 模式下右键 entity → "关联到…" → 点击目标 entity → 弹出关联编辑弹窗
- 关联编辑弹窗：选 relation_type、调 confidence、加 evidence excerpt
- NodeDetailCard 中每条关联右侧加编辑/删除小按钮
- 已有关联可编辑属性和 evidence
- 删除关联需确认

## 2. 产品边界

- 不做批量关联（一次只连一个 pair）
- 不做"从 entity A 拖到 entity B"的拖拽连线（用点击选目标替代，避免与 3D 旋转冲突）
- 不做关联的 undo/redo
- 不修改 005d 的自动生成逻辑
- 新建关联默认 `status='accepted'`（人工创建的不需要再审核）
- evidence 只做简单文本列表，不做富文本/文件上传

## 3. 右键"关联到…"流程

### 3.1 触发

仅在 `relation_reveal` 模式下，右键 R3 entity 节点时，菜单中多一项：

```
┌─────────────────────┐
│  编辑标题…          │
│  移动到 lifeline ▸  │
│  关联到…            │  ← 新增
│  ───────────────    │
│  删除               │
└─────────────────────┘
```

### 3.2 交互流程

1. 用户右键 entity A → 点击"关联到…"
2. 进入**选择模式**：光标变为 crosshair，所有 R3 entity 节点高亮（pulse 效果或 scale 微增）
3. 用户左键点击 entity B → 弹出关联编辑弹窗（AssociationEditDialog）
4. 如果点击空白区域或 Esc → 退出选择模式，不创建关联
5. 如果点击 entity A 自身 → 不创建（不允许自关联）

### 3.3 选择模式实现

在 CosmosView 中增加一个 `selectingTarget` ref：

```typescript
const selectingTarget = ref<{ fromId: string; fromTitle: string } | null>(null)
```

当 `selectingTarget` 非 null 时：
- canvas 光标变为 crosshair
- 左键点击 handler 中，优先检查是否在选目标模式
- 点击 R3 entity → 弹出 AssociationEditDialog
- 点击空白/Esc → 取消选择模式

### 3.4 视觉反馈

选择模式下，所有 R3 entity 节点 scale 微增至 1.15 并变 accent 色（临时，和 hover 高亮区分开）。退出选择模式后恢复。

## 4. 关联编辑弹窗（AssociationEditDialog）

### 4.1 新建关联

```
┌──────────────────────────────────┐
│  新建关联                        │
│                                  │
│  从  「给 Cosmos 3D 引擎加…」    │
│  到  「选择 Three.js 做 3D …」   │
│                                  │
│  关系类型  [下拉选择]            │
│    co_occurrence / causal /      │
│    tension / derived_from / manual│
│                                  │
│  信心度    [滑块 0.3 — 1.0]      │
│            ●━━━━━━━━○ 0.85       │
│                                  │
│  证据                              │
│  ┌──────────────────────────┐    │
│  │ 类型: [text]             │    │
│  │ 摘要: [____________]     │    │
│  │ [+ 添加证据]             │    │
│  └──────────────────────────┘    │
│                                  │
│          [取消]    [创建关联]     │
└──────────────────────────────────┘
```

### 4.2 编辑已有 association

NodeDetailCard 中每条关联右侧加一个小编辑按钮（铅笔图标）。点击后弹出同一个 AssociationEditDialog，预填现有数据：

- 编辑模式：title 变为"编辑关联"，按钮变为"[保存修改]"
- relation_type / confidence / evidence 预填当前值
- 额外显示 `status` 标签（accepted/pending/rejected）
- 底部多一个红色"删除关联"按钮（需二次确认）

### 4.3 组件接口

新建 `frontend/src/components/cosmos/AssociationEditDialog.vue`：

```typescript
// Props
interface Props {
  fromId: string
  fromTitle: string
  toId: string
  toTitle: string
  // 编辑模式（已有 association）
  existing?: {
    id: string
    relation_type: string
    confidence: number
    status: string
    evidence: { type: string; excerpt: string; weight: number }[]
  }
}

// Emits
defineEmits<{
  (e: 'cancel'): void
  (e: 'create', data: CreateAssociationPayload): void
  (e: 'update', data: UpdateAssociationPayload): void
  (e: 'delete', assocId: string): void
}>()
```

### 4.4 样式

- 居中弹窗，`z-index: 120`
- 宽度 380px，最大高度 80vh
- 关系类型用下拉选择（`<select>`），选项用中文标签
- 信心度用 range input + 数字显示
- evidence 区域可动态添加/删除条目（最多 5 条）
- 删除按钮仅编辑模式显示，红色

## 5. API 端点

### 5.1 需要新增的后端端点

如果后端还没有通用的关联 CRUD（005d 只有 generate + review），需要新增：

```
POST   /cosmos/associations          — 创建关联
PUT    /cosmos/associations/<id>     — 更新关联
DELETE /cosmos/associations/<id>     — 删除关联
```

**POST /cosmos/associations**：
```json
{
  "from": "task:7",
  "to": "decision:10",
  "relation_type": "causal",
  "confidence": 0.85,
  "status": "accepted",
  "evidence": [
    {"type": "manual", "excerpt": "这两个 entity 都和渲染引擎相关", "weight": 0.9}
  ]
}
```

**PUT /cosmos/associations/<id>**：
```json
{
  "relation_type": "manual",
  "confidence": 0.9,
  "evidence": [...]
}
```
所有字段选填，只更新传入的字段。

**DELETE /cosmos/associations/<id>**：软删除或硬删除（建议硬删除，associations 是派生数据）。

### 5.2 前端 API 封装

```typescript
export const createAssociation = (data: {
  from: string; to: string; relation_type: string; confidence: number;
  status?: string; evidence?: { type: string; excerpt: string; weight: number }[]
}) => apiRequest('/cosmos/associations', { method: 'POST', json: data })

export const updateAssociation = (id: string, data: {
  relation_type?: string; confidence?: number; evidence?: { type: string; excerpt: string; weight: number }[]
}) => apiRequest(`/cosmos/associations/${encodeURIComponent(id)}`, { method: 'PUT', json: data })

export const deleteAssociation = (id: string) =>
  apiRequest(`/cosmos/associations/${encodeURIComponent(id)}`, { method: 'DELETE' })
```

如果后端没有这些端点，需要先在后端新增（`core/routes/cosmos_associations.py`），然后再加前端 API 封装。

## 6. NodeDetailCard 关联行增强

### 6.1 编辑/删除按钮

每条关联行右侧加小按钮：

```
[共现] 选择 Three.js 做 3D …  88%  [✎] [✕]
```

- ✎（编辑）：点击弹出 AssociationEditDialog（编辑模式）
- ✕（删除）：点击弹出 ConfirmDialog 确认后删除

按钮只在 hover 关联行时显示（`:hover` CSS 控制），避免视觉噪音。

### 6.2 关联行 hover

已有`.assoc-row:hover`样式，在其中加 `button.assoc-action { display: inline-flex }`，默认 `display: none`。

## 7. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `frontend/src/components/cosmos/AssociationEditDialog.vue` | **新建**：关联编辑弹窗 | +220 行 |
| `frontend/src/api/endpoints.ts` | 新增 createAssociation / updateAssociation / deleteAssociation | +30 行 |
| `frontend/src/stores/cosmos.ts` | 新增关联 CRUD actions + selectingTarget 状态 | +50 行 |
| `frontend/src/views/CosmosView.vue` | 选择模式交互 + AssociationEditDialog 集成 | +60 行 |
| `frontend/src/components/cosmos/ContextMenu.vue` | R3 entity 菜单加"关联到…"项 | +5 行 |
| `frontend/src/components/cosmos/NodeDetailCard.vue` | 关联行加编辑/删除按钮 | +40 行 |
| `core/routes/cosmos_associations.py` | 新增 POST/PUT/DELETE 端点（**如果后端还没有**） | +80 行 |

**总计约 485 行**，其中后端 80 行、前端 405 行。

## 8. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 后端端点
# - POST /cosmos/associations 创建关联
# - PUT /cosmos/associations/<id> 更新关联
# - DELETE /cosmos/associations/<id> 删除关联

# 3. 人肉验证 — 新建关联
# - Atlas → R1 lifeline → R3 entity → R 进入 relation_reveal
# - 右键 entity → "关联到…"
# - 光标变为 crosshair，R3 节点高亮
# - 点击另一个 entity → 弹出 AssociationEditDialog
# - 选 relation_type / 调 confidence / 加 evidence → 创建
# - 新关联线出现在 3D 场景中
# - NodeDetailCard 中关联列表新增一条
# - 按 Esc 或点击空白 → 退出选择模式

# 4. 人肉验证 — 编辑关联
# - NodeDetailCard 中 hover 关联行 → 编辑/删除按钮出现
# - 点击编辑 → 弹出 AssociationEditDialog（预填数据）
# - 修改 relation_type → 保存
# - 3D 场景中关联线颜色可能变化（取决于 type）
# - 修改 confidence → 保存 → 线宽变化

# 5. 人肉验证 — 删除关联
# - NodeDetailCard 中点击删除按钮
# - 确认弹窗 → 确认
# - 关联线从场景中移除
# - NodeDetailCard 关联列表更新

# 6. 不破坏
# - 现有关联线点击 → 证据面板正常
# - 关联线 hover 高亮正常
# - accept/reject pending 关联正常
# - R 键进入/退出 relation_reveal 正常
# - 搜索正常
# - entity 编辑（013）正常
```

## 9. 禁止事项

- 不做拖拽连线（drag to connect）
- 不做批量关联
- 不做关联可视化编辑（在 3D 中拖动关联线端点）
- 不做 evidence 的富文本编辑
- 不做自关联（from === to）
- 不做重复关联检测（同一对 entity 允许多条不同类型的关联）

## 10. 提交风格

```
add: 014 — Atlas 关联编辑（手动创建/编辑/删除 + 证据管理）

- 新增 AssociationEditDialog：关联创建/编辑弹窗，支持类型/信心度/证据编辑
- relation_reveal 下右键 entity → "关联到…" → 点击目标 → 创建关联
- NodeDetailCard 关联行 hover 显示编辑/删除按钮
- API 层新增 createAssociation / updateAssociation / deleteAssociation
- 后端新增 POST/PUT/DELETE /cosmos/associations 端点
```
