# 022 — NodeDetailCard 关联摘要

> NodeDetailCard 当前只展示 entity 自身详情（标题、字段、快速操作）。用户必须按 R 进入 `relation_reveal` 才能看到该 entity 有哪些关联——这一步切换打断了浏览流。本轮在卡片中追加"关联摘要"区块：不离开 `node_focus` 即可看到关联概览。

## 1. 范围

| 文件 | 改动 | 估算 |
|---|---|---|
| `NodeDetailCard.vue` | 添加关联摘要区块 + 关联行模板 + 样式 | +100 行 |
| `CosmosView.vue` | 传递 `onNavigateEntity` 回调 | +10 行 |

**总计约 110 行**。纯前端，无新 API。

## 2. 产品边界

- **做**：NodeDetailCard 底部显示该 entity 的关联列表摘要（最多 5 条）、关联种类分布、从卡片直接跳转到关联 entity
- **不做**：从摘要中编辑/删除关联（仍然通过 AssociationEditDialog）、分页/滚动加载全部关联、全屏关联列表、关联时间线
- 关联数据来自 `store.data.associations`，不额外请求 API
- 点击关联 entity → 3D 跳转到该 entity（`node_focus`），触发卡片刷新

## 3. 关联摘要区块

### 3.1 位置

在 NodeDetailCard 详情区域下方、操作按钮上方（或在卡片底部），显示为可折叠区块：

```
┌─ NodeDetailCard ───────────────────┐
│  [T] 给 Cosmos 3D 引擎加粒子效果   │
│  task:42                      [⎘]  │
│  ─────────────────────────────────  │
│  标题: 给 Cosmos 3D 引擎加粒子效果  │
│  优先级: high                       │
│  状态: todo                         │
│  ─────────────────────────────────  │
│  关联 (3)                    [R]    │  ← 新增：关联摘要
│  ┌────────────────────────────────┐ │
│  │ 衍生 85% → T 选择 Three.js     │ │  ← 关联行，箭头表示方向
│  │ 因果 72% → D 前端技术选型      │ │
│  │ 共现 50% → M 3D 渲染性能       │ │
│  │ ... 查看全部 (共 5 条)          │ │  ← 超过 5 条时显示
│  └────────────────────────────────┘ │
│  ─────────────────────────────────  │
│  [✓ 标记完成] [复制 Markdown]       │
└────────────────────────────────────┘
```

### 3.2 关联行内容

每条关联显示：

```
[关系类型] [信心度] → [目标 entity kind badge] [目标 entity 标题]
```

- 关系类型：共现/因果/张力/衍生/人工（使用现有 `relLabel` 或等效函数）
- 信心度：百分比（如 `85%`）
- 箭头 `→`：表示从当前 entity 指向目标（`from === entity.id`），或 `←`（`to === entity.id`）
- 目标 entity：kind badge（T/M/D/I 小方块）+ 标题（截断到 25 字符）
- 关联 status 为 `rejected` 的不显示
- 关联 status 为 `pending` 的显示为半透明

### 3.3 点击行为

点击关联行 → 跳转到目标 entity：

```typescript
function navigateToEntity(targetId: string) {
  const ent = store.data?.entities.find(e => e.id === targetId)
  if (!ent) return
  store.transition({ kind: 'node_focus', entity_kind: ent.kind, entity_id: targetId })
}
```

跳转后 NodeDetailCard 自动刷新（`entity.value.id` 变化触发 `watch`）。

### 3.4 关联种类分布

在"关联 (N)"标题右侧显示种类分布小标签：

```
关联 (3)  共现:1 因果:1 衍生:1
```

位置在标题右侧，与 R 按钮一起。字体 `var(--fs-1)`，颜色 `var(--text-4)`。

### 3.5 "查看关联"按钮 R

在"关联 (N)"右侧放一个 R 按钮（设计为 `[R]` 小圆角按钮），点击等于按键盘 R——进入 `relation_reveal`。

```typescript
function enterRelation() {
  emit('enter-relation')
}
```

CosmosView 已有 `enterRelation()` 函数，emit 到此即可。

### 3.6 折叠

如果 entity 有 0 条关联，整个关联区块不显示（不显示"关联 (0)"）。

关联区块默认展开。可点击标题"关联 (N)"折叠/展开。

## 4. 实现

### 4.1 NodeDetailCard

新增 computed：

```typescript
const entityAssociations = computed<Array<{
  assoc: CosmosAssociation
  isFrom: boolean
  target: CosmosEntity
}>>(() => {
  if (!entity.value || !store.data) return []
  const eid = entity.value.id
  const results: Array<{ assoc: CosmosAssociation; isFrom: boolean; target: CosmosEntity }> = []
  for (const a of store.data.associations) {
    if (a.status === 'rejected') continue
    const isFrom = a.from === eid
    const isTo = a.to === eid
    if (!isFrom && !isTo) continue
    const targetId = isFrom ? a.to : a.from
    const target = store.data.entities.find(e => e.id === targetId)
    if (target) results.push({ assoc: a, isFrom, target })
  }
  return results
})

const topAssociations = computed(() => entityAssociations.value.slice(0, 5))
```

关联种类分布：

```typescript
const assocTypeCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const { assoc } of entityAssociations.value) {
    counts[assoc.relation_type] = (counts[assoc.relation_type] || 0) + 1
  }
  return counts
})
```

### 4.2 CosmosView

给 NodeDetailCard 增加一个 `navigate-entity` emit handler：

```typescript
function onNodeDetailNavigate(entityId: string) {
  // 等价于 onPanelFocusEntity
  const ent = store.data?.entities.find(e => e.id === entityId)
  if (!ent) return
  store.transition({ kind: 'node_focus', entity_kind: ent.kind, entity_id: entityId })
}
```

NodeDetailCard 已有 `edit-assoc`、`delete-assoc` emit。新增 `navigate-entity` 和 `enter-relation`。

### 4.3 代码量

约 +110 行。

## 5. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 关联列表
# - 聚焦有 3 条关联的 entity
# - NodeDetailCard 底部出现"关联 (3)"区块
# - 列出 3 条关联行：关系类型 + 信心度 + 箭头 + 目标 entity
# - 种类分布标签显示正确

# 3. 人肉验证 — 方向箭头
# - from 当前 entity → 显示 →
# - to 当前 entity → 显示 ←

# 4. 人肉验证 — 点击跳转
# - 点击关联行的目标 entity
# - 3D 相机飞向目标 entity
# - NodeDetailCard 刷新为目标 entity 的详情 + 关联

# 5. 人肉验证 — R 按钮
# - 点击 [R] 按钮
# - 进入 relation_reveal 模式
# - 与键盘 R 键行为一致

# 6. 人肉验证 — 边界
# - 0 条关联的 entity → 不显示关联区块
# - 超过 5 条关联 → 只显示前 5 条 + "查看全部"提示
# - pending 关联 → 半透明显示
# - rejected 关联 → 不显示

# 7. 人肉验证 — 折叠
# - 点击"关联 (N)"标题 → 列表折叠
# - 再次点击 → 展开

# 8. 人肉验证 — 不破坏
# - NodeDetailCard 原有功能正常（标题编辑、字段编辑、复制）
# - relation_reveal 原有功能正常
# - R 快捷键正常
```

## 6. 禁止事项

- 不在 tokens.css 新增颜色
- 不新增后端 API
- 不修改关联 CRUD 逻辑（编辑/删除仍通过 AssociationEditDialog）
- 关联行不做 hover 显示完整标题（保持截断 + ellipsis）
- 不为关联摘要新增 props（数据直接从 store 读）

## 7. 提交风格

```
add: 022 — NodeDetailCard 关联摘要

- 卡片底部显示该 entity 的关联列表（最多 5 条，含类型/信心度/目标）
- 关联行可点击跳转到目标 entity 的 node_focus
- 关联种类分布标签 + R 按钮进入 relation_reveal
- 方向箭头区分 from/to
```
