# 030 — 撤销上一步操作（Undo）

> 目前在 Atlas 中删除 entity、删除关联、reject 关联等操作没有撤销能力。一旦误操作，只能手动重建或刷新页面（丢失所有未保存状态）。本轮加入简单的单步撤销：Ctrl+Z 撤销最近一次可逆操作，覆盖最常见的"误删"场景。

## 1. 范围

| 文件 | 改动 | 估算 |
|---|---|---|
| `stores/cosmos.ts` | undo 栈 + `pushUndo` / `undoLast` + 监听关键操作 | +55 行 |
| `CosmosView.vue` | Ctrl+Z 快捷键 + toast 提示 | +15 行 |

**总计约 70 行**。纯前端，乐观撤销 + API 同步。

## 2. 产品边界

- **做**：撤销最近一次：删除 entity、删除 association、删除 lifeline、reject/accept 关联、修改 entity 标题。Ctrl+Z 触发。撤销后显示 toast "已撤销 [操作名]"
- **不做**：多步撤销（undo 历史）、重做（Redo）、撤销 create 操作（新建 entity/lifeline/association 不进入 undo 栈）、撤销 mount 操作、跨会话持久化 undo 栈
- 只保留最近 1 步。新操作覆盖旧 undo 记录

## 3. Undo 模型

### 3.1 UndoEntry

```typescript
interface UndoEntry {
  action: string  // 用户可读的操作名，如 "删除 entity"
  redo: () => Promise<void>  // 重放操作（恢复数据）
}
```

### 3.2 纳入 Undo 的操作

| 操作 | action 名 | redo 逻辑 |
|---|---|---|
| `deleteEntityById` | 删除 entity | 调用 create API + mountEntity |
| `deleteAssoc` | 删除关联 | 调用 createAssociation |
| `deleteLifeline` | 删除 lifeline | 调用 createLifeline |
| `reviewAssociation(id, 'rejected')` | 拒绝关联 | 调用 reviewAssociation(id, 'accepted') 或恢复到之前状态 |
| `reviewAssociation(id, 'accepted')` | 确认关联 | 恢复到之前状态（pending/accepted/rejected） |
| `updateEntityTitle` | 修改标题 | 调用 updateEntityTitle 恢复原标题 |

### 3.3 不纳入的操作

- `createEntity` / `createAssoc` / `createLifeline` — 新建不撤销（可通过删除实现）
- `mountEntity` — 挂载不撤销
- `updateAssoc`（编辑关联属性）— 暂不覆盖

## 4. 实现

### 4.1 Store 改动

```typescript
const undoEntry = ref<UndoEntry | null>(null)

function pushUndo(entry: UndoEntry) {
  undoEntry.value = entry
}

async function undoLast() {
  if (!undoEntry.value) return false
  try {
    await undoEntry.value.redo()
    const actionName = undoEntry.value.action
    undoEntry.value = null
    emit('undo_done', actionName)
    return true
  } catch {
    await reload()
    undoEntry.value = null
    return false
  }
}

const canUndo = computed(() => undoEntry.value !== null)
```

### 4.2 各操作接入

在 store 的每个可逆操作中，先保存快照，再执行操作：

**deleteEntityById**:
```typescript
async function deleteEntityById(kind: string, id: number) {
  // 保存 undo 快照
  const ent = data.value?.entities.find(e => e.id === `${kind}:${id}`)
  if (ent) {
    const snapshot = { kind, id, title: ent.title, lifeline_id: ent.lifeline_id }
    pushUndo({
      action: `删除 entity "${ent.title.slice(0, 20)}"`,
      redo: async () => {
        // 重新创建 entity + mount
        const { createEntity } = await import('@/api/endpoints')
        // ... 根据 kind 调用对应 API，然后 mountEntity
        await reload()
      }
    })
  }
  // 执行原有删除逻辑
  // ...
}
```

**deleteAssoc**:
```typescript
async function deleteAssoc(id: string) {
  const assoc = data.value?.associations.find(a => a.id === id)
  if (assoc) {
    pushUndo({
      action: `删除关联`,
      redo: async () => {
        await createAssoc({ from: assoc.from, to: assoc.to, relation_type: assoc.relation_type, confidence: assoc.confidence, evidence: assoc.evidence })
      }
    })
  }
  // ...
}
```

**reviewAssociation**:
```typescript
async function reviewAssociation(assocId: string, status: 'accepted' | 'rejected') {
  const old = data.value?.associations.find(a => a.id === assocId)
  const oldStatus = old?.status
  if (oldStatus && oldStatus !== status) {
    pushUndo({
      action: status === 'accepted' ? '确认关联' : '拒绝关联',
      redo: async () => { await reviewAssociation(assocId, oldStatus) }
    })
  }
  // 乐观更新 + API...
}
```

**updateEntityTitle**:
```typescript
async function updateEntityTitle(kind: string, id: number, title: string) {
  const oldTitle = data.value?.entities.find(e => e.id === `${kind}:${id}`)?.title
  if (oldTitle && oldTitle !== title) {
    pushUndo({
      action: '修改标题',
      redo: async () => { await updateEntityTitle(kind, id, oldTitle) }
    })
  }
  // ...
}
```

### 4.3 CosmosView 快捷键

```typescript
// 在 onKey 中
if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
  e.preventDefault()
  const ok = await store.undoLast()
  if (ok) showUndoToast()
  return
}
```

### 4.4 Toast 提示

复用现有 `copiedToast` 模式或新增 `undoToast`：

```html
<div v-if="undoToast" class="undo-toast">已撤销</div>
```

3 秒后自动消失。或直接复用 `copiedToast` 的消息逻辑。

### 4.5 代码量

约 +70 行（store +55, CosmosView +15）。

## 5. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 删除 entity 撤销
# - 在 NodeDetailCard 删除一个 entity
# - entity 从 3D 场景消失
# - 按 Ctrl+Z → entity 恢复
# - Toast 显示 "已撤销"
# - 3D 节点重新出现

# 3. 人肉验证 — 删除关联撤销
# - 在关联编辑中删除一条关联
# - 按 Ctrl+Z → 关联恢复

# 4. 人肉验证 — accept/reject 撤销
# - 在 PendingReviewPanel accept 一条关联
# - 按 Ctrl+Z → 关联状态恢复为 pending
# - 同理 reject 也可撤销

# 5. 人肉验证 — 修改标题撤销
# - 修改 entity 标题
# - 按 Ctrl+Z → 标题恢复

# 6. 人肉验证 — 边界
# - 没有操作可撤销时按 Ctrl+Z → 无反应
# - 连续两次操作：第一次可撤销，第二次覆盖
# - 新建 entity 后按 Ctrl+Z → 无反应（新建不进栈）

# 7. 人肉验证 — 不破坏
# - 正常操作不受影响
# - undo 失败时 reload 数据（兜底）
# - 其他快捷键正常（Ctrl+N, Ctrl+E, Alt+←→ 等）
```

## 6. 禁止事项

- 不做多步撤销（只保留最近 1 步）
- 不做 Redo
- 不做跨会话持久化
- 不在 tokens.css 新增颜色
- 不修改后端
- 不引入新 npm 依赖

## 7. 提交风格

```
add: 030 — 撤销上一步操作（Ctrl+Z）

- store: undoEntry 栈 + pushUndo/undoLast，覆盖删除/修改/review
- CosmosView: Ctrl+Z 快捷键 + undo toast
```
