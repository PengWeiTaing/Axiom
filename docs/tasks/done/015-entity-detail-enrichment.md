# 015 — Entity Detail 富化（完整内容展示 + 字段编辑 + Lifeline 编辑修复）

> 013 让 entity 标题可编辑，014 让关联可编辑。但 Atlas 中的 NodeDetailCard 仍然只显示标题 + 关联列表——用户看不到 entity 的实际内容（task 的 detail、memory 的 content、decision 的决策文本等）。要看完整内容必须回到 Capture 模式。本轮让 Atlas 内的 entity 卡片变成真正的内容查看和编辑入口，同时修复 013 遗留的 `window.prompt` 问题。

## 1. 范围

前端改动（NodeDetailCard 大改 + API 增强 + CosmosView + 小型 lifeline 编辑弹窗）。后端已有 GET /tasks/:id、GET /memories/:id、GET /decisions/:id、GET /item/:id 端点，无需新增后端路由。

**核心目标**：
- NodeDetailCard 在 entity 聚焦时自动加载完整 entity 数据
- 根据 entity kind 展示不同字段（task: detail/priority/status, memory: content/detail/category, decision: decision/reasoning/context, item: content/source）
- 每个字段可内联编辑（点击进入编辑、Enter 保存、Esc 取消）
- 常用快捷操作（task 标记完成、memory 确认等）
- 修复 ContextMenu "编辑名称…" 使用 `window.prompt` 的问题，改用小型弹窗

## 2. 产品边界

- 不做 entity 的创建（013 已有）
- 不做关联的编辑（014 已有）
- 不做文件/图片预览（item 的 file 类型待后续处理）
- 不做富文本编辑（纯文本 textarea）
- 字段编辑即时保存，失败回滚
- 已加载的 detail 数据缓存在 store 中，不重复请求

## 3. API：Entity Detail 获取

### 3.1 需要新增的前端 API 封装

后端已有 RESTful GET 端点，前端直接封装：

```typescript
// endpoints.ts 新增
export const getTask = (id: number) =>
  apiRequest<{ task: Task }>(`/tasks/${id}`)

export const getMemory = (id: number) =>
  apiRequest<{ memory: Memory; linked_tasks: Task[]; task_progress: { total: number; done: number; todo: number } }>(`/memories/${id}`)

export const getDecision = (id: number) =>
  apiRequest<{ decision: Decision }>(`/decisions/${id}`)

export const getItem = (id: number) =>
  apiRequest<{ item: Item & { derived_text_preview?: string; storage?: string; file_url?: string } }>(`/item/${id}`)
```

注意：`getMemory` 和 `getItem` 已经有现成的导出（endpoints.ts:107 和 :139），只需确认是否可直接复用。

### 3.2 数据缓存

在 cosmos store 中新增 `entityDetailCache`：

```typescript
const entityDetailCache = ref<Map<string, Record<string, unknown>>>(new Map())
```

- key = entity ID (如 `"task:42"`)
- value = 后端返回的完整 entity 对象
- 在 store.reload() 时清空缓存
- 在 entity 被删除时清除对应缓存条目

## 4. NodeDetailCard 改造

### 4.1 布局重构

现有卡片仅显示标题 + lifeline 路径 + 关联列表。改造后：

```
┌──────────────────────────────┐
│ [T] 给 Cosmos 3D 引擎加…  ✎  │  ← 标题行（保留现有双击编辑）
│ 健康 / 心肺                   │  ← lifeline 路径（保留）
│                              │
│ ─────── 详情 ─────────────── │
│                              │
│ 标题                         │
│ ┌────────────────────────┐  │
│ │ 给 Cosmos 3D 引擎加    │  │  ← 可内联编辑
│ │ 粒子效果和过渡动画     │  │
│ └────────────────────────┘  │
│                              │
│ 描述                         │
│ ┌────────────────────────┐  │
│ │ Three.js 粒子系统 +    │  │  ← task.detail
│ │ GSAP 动画库…           │  │
│ └────────────────────────┘  │
│                              │
│ 优先级    [medium ▾]         │  ← task.priority 下拉
│ 状态      [todo ▾]           │  ← task.status 下拉
│ 创建时间  2026-05-20         │
│                              │
│ ─────── 操作 ─────────────── │
│ [标记完成]  [关联到…]        │
│                              │
│ ─────── 关联 (3) ─────────── │  ← 保留现有关联列表
│ [共现] 选择 Three.js…  88%  │
│ ...                          │
└──────────────────────────────┘
```

### 4.2 各 Kind 的字段映射

**task**：
| 字段 | 来源 | 编辑方式 |
|---|---|---|
| 标题 | `task.title` | 内联 text input |
| 描述 | `task.detail` | textarea |
| 优先级 | `task.priority` | select (high/medium/low) |
| 状态 | `task.status` | select (todo/done/cancelled) |
| 截止日期 | `task.due_date` | 只读显示 |
| 预估时间 | `task.estimated_minutes` | 只读显示 |
| 创建时间 | `task.created_at` | 只读显示 |

**快捷操作**：标记完成/标记待办（调 `/tasks/:id/done` 或 `/tasks/:id/todo`）

**memory**：
| 字段 | 来源 | 编辑方式 |
|---|---|---|
| 内容 | `memory.content` | textarea |
| 详情 | `memory.detail` | textarea |
| 分类 | `memory.category` | select (fact/preference/goal/relationship/event) |
| 状态 | `memory.status` | select (candidate/confirmed/archived) |
| 创建时间 | `memory.created_at` | 只读显示 |

**快捷操作**：确认/归档（调 `/memories/:id/confirm` 或 `/memories/:id/archive`）

**decision**：
| 字段 | 来源 | 编辑方式 |
|---|---|---|
| 标题 | `decision.title` | 内联 text input |
| 决策 | `decision.decision` | textarea |
| 背景 | `decision.context` | textarea |
| 推理 | `decision.reasoning` | textarea |
| 预期结果 | `decision.expected_outcome` | textarea |
| 状态 | `decision.status` | select (pending/reviewed) |
| 创建时间 | `decision.created_at` | 只读显示 |

**item**：
| 字段 | 来源 | 编辑方式 |
|---|---|---|
| 内容 | `item.content` | textarea |
| 来源 | `item.source` | 只读显示 |
| 类型 | `item.type` | 只读显示 |
| 创建时间 | `item.created_at` | 只读显示 |

### 4.3 内联编辑行为

每个可编辑字段的交互模式：

1. **显示态**：文本正常显示，右侧有小型编辑图标（✎），hover 时出现
2. **编辑态**：点击编辑图标或双击文本区域 → 切换为 input/textarea/select
3. **保存**：Enter（单行 input）或 Ctrl+Enter（textarea）→ 调 PUT/POST API 保存 → 恢复显示态
4. **取消**：Esc → 恢复显示态，丢弃修改
5. **保存失败**：显示短暂错误提示，保留编辑态让用户重试

通用的字段编辑函数：

```typescript
async function saveField(fieldName: string, value: string) {
  if (!entity.value) return
  const parts = entity.value.id.split(':')
  const kind = parts[0]
  const rawId = parseInt(parts.slice(1).join(':'), 10)
  try {
    await updateEntityField(kind, rawId, { [fieldName]: value })
    // refresh detail cache
    await loadEntityDetail()
  } catch {
    // show error state
  }
}
```

### 4.4 详情加载时机

- `watch(() => entity.value, ...)` — entity 变化时自动加载
- 先从 cache 取，miss 时调 API
- 加载中显示骨架屏或 spinner
- 加载失败显示错误 + 重试按钮

### 4.5 样式约束

- 卡片宽度从 280px 扩到 320px（容纳更多内容）
- 最大高度 70vh，内容超出可滚动
- 字段区域用 `--surface-2` 背景 + `--r-1` 圆角
- 编辑态字段用 accent 色边框
- 颜色/间距/字号遵循 tokens.css

## 5. Lifeline 编辑修复

### 5.1 问题

`CosmosView.vue:440-451` 中 `onContextEditLifelineName` 使用 `window.prompt`，这是一个浏览器原生弹窗，样式不可控，且在部分环境（iframe、PWA）中不可用。

### 5.2 方案

在 CosmosView 中新增一个小型内联编辑弹窗（复用 createDialog 的模式），或用 `<dialog>` 元素：

```
┌──────────────────────────┐
│ 编辑 lifeline 名称       │
│                          │
│ ┌──────────────────────┐ │
│ │ 健康                  │ │
│ └──────────────────────┘ │
│                          │
│        [取消]  [保存]    │
└──────────────────────────┘
```

- 触发：ContextMenu → "编辑名称…" → emit `edit-lifeline-name`
- 状态管理：`CosmosView` 本地 ref `lifelineEditDialog`
- 保存：调 `store.updateLifeline(id, { name })` → reload
- Esc / 点击遮罩 / 取消按钮 → 关闭

### 5.3 实现

在 CosmosView 的 `<template>` 中新增（参考已有的 createDialog 模式）：

```html
<div v-if="lifelineEditDialog" class="create-overlay" @pointerdown="lifelineEditDialog = null">
  <div class="create-dialog" @pointerdown.stop>
    <div class="create-title">编辑 lifeline 名称</div>
    <input
      ref="lifelineEditInputEl"
      v-model="lifelineEditName"
      class="create-input"
      @keydown="onLifelineEditKeydown"
    />
    <div class="create-actions">
      <button class="confirm-btn cancel-btn" @click="lifelineEditDialog = null">取消</button>
      <button class="confirm-btn primary-btn" :disabled="!lifelineEditName.trim()" @click="onLifelineEditSave">保存</button>
    </div>
  </div>
</div>
```

## 6. Entity 快捷操作

### 6.1 Task 标记完成/重开

- 按钮文案随当前状态变化：
  - `status === 'todo'` → 显示 "[标记完成]"，调 `/tasks/:id/done`
  - `status === 'done'` → 显示 "[重开任务]"，调 `/tasks/:id/todo`
  - `status === 'cancelled'` → 不显示操作按钮

### 6.2 Memory 确认/归档

- `status === 'candidate'` → 显示 "[确认]"，调 `/memories/:id/confirm`
- `status === 'confirmed'` → 显示 "[归档]"，调 `/memories/:id/archive`

### 6.3 快捷操作 API 封装

这些端点前端可能尚未封装，需要在 endpoints.ts 新增：

```typescript
export const markTaskDone = (id: number) => apiRequest(`/tasks/${id}/done`, { method: 'POST' })
export const markTaskTodo = (id: number) => apiRequest(`/tasks/${id}/todo`, { method: 'POST' })
export const confirmMemory = (id: number) => apiRequest(`/memories/${id}/confirm`, { method: 'POST' })
export const archiveMemory = (id: number) => apiRequest(`/memories/${id}/archive`, { method: 'POST' })
```

## 7. 更新 entity field 的 API

现有的 `updateEntity` (endpoints.ts:183) 只处理 title/content 映射。本轮需要支持更新更多字段（detail, decision, context, reasoning, priority, status, category 等）。

需要在 `updateEntity` 函数中扩展支持的字段，或新增一个更通用的 `updateEntityField`：

```typescript
export const updateEntityField = (kind: string, id: number, data: Record<string, string>) => {
  if (kind === 'item') {
    return apiRequest(`/item/${id}/update`, { method: 'POST', json: data })
  }
  return apiRequest(`/${KIND_PLURAL[kind]}/${id}`, { method: 'PUT', json: data })
}
```

## 8. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `frontend/src/components/cosmos/NodeDetailCard.vue` | **大改**：详情加载 + 字段展示 + 内联编辑 + 快捷操作 | +300 行 |
| `frontend/src/api/endpoints.ts` | 新增 getTask/getMemory/getDecision/getItem 导出 + quick actions + updateEntityField | +50 行 |
| `frontend/src/stores/cosmos.ts` | 新增 entityDetailCache + 缓存管理 | +30 行 |
| `frontend/src/views/CosmosView.vue` | 替换 window.prompt → lifeline 编辑弹窗 | +50 行 |
| `frontend/src/components/cosmos/ContextMenu.vue` | 无需改动（已有 edit-lifeline-name emit） | 0 行 |

**总计约 430 行**。

## 9. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 后端端点确认（curl 测试，不改后端代码）
# - GET /tasks/<id> 返回 task 对象含 detail/priority/status 等
# - GET /memories/<id> 返回 memory 对象含 content/detail/category 等
# - GET /decisions/<id> 返回 decision 对象含 decision/reasoning/context 等
# - GET /item/<id> 返回 item 对象含 content/source 等
# - PUT /tasks/<id> 可更新任意字段
# - PUT /memories/<id> 可更新任意字段
# - PUT /decisions/<id> 可更新任意字段
# - POST /item/<id>/update 可更新 content

# 3. 人肉验证 — Entity 详情展示
# - Atlas → 点击 R3 entity → NodeDetailCard 出现
# - 卡片中展示 entity 完整字段（根据 kind 不同）
# - task: 标题 + 描述 + 优先级 + 状态
# - memory: 内容 + 详情 + 分类 + 状态
# - decision: 标题 + 决策 + 背景 + 推理
# - item: 内容 + 来源 + 类型

# 4. 人肉验证 — 字段内联编辑
# - hover 字段 → 编辑图标出现
# - 点击编辑图标 → 切换为 input/textarea/select
# - Enter 保存 → 字段更新 + 恢复显示态
# - Esc 取消 → 恢复显示态，不保存
# - API 失败 → 显示错误 + 保留编辑态

# 5. 人肉验证 — 快捷操作
# - task (todo) → "[标记完成]" 按钮可见 → 点击 → task 状态变为 done
# - task (done) → "[重开任务]" 按钮可见 → 点击 → task 状态变为 todo
# - memory (candidate) → "[确认]" 按钮可见 → 点击 → status 变 confirmed
# - memory (confirmed) → "[归档]" 按钮可见 → 点击 → status 变 archived

# 6. 人肉验证 — Lifeline 编辑修复
# - 右键 R1/R2 lifeline 节点 → "编辑名称…"
# - 弹出小型自定义弹窗（非 window.prompt）
# - 修改名称 → 保存 → 3D 标签更新
# - Esc / 点击外部 → 关闭

# 7. 不破坏
# - entity 标题双击编辑正常（013）
# - 关联展示/编辑/删除正常（014）
# - 右键菜单正常
# - 搜索正常
# - 状态机切换正常
# - node_focus ↔ relation_reveal 切换正常
```

## 10. 禁止事项

- 不修改后端代码（端点已就绪）
- 不改变 NodeDetailCard 的固定定位方式（保持 `position: fixed; right: ...`）
- 不引入新的 npm 依赖
- 不修改 tokens.css 或 base.css
- 不在卡片中展示关联的 evidence 详情（009 已做，在关联线 hover 时展示）
- 不做文件预览/图片显示
- 不做 AI 生成的内容摘要

## 11. 关键参考

### 现有 entity 更新逻辑（endpoints.ts:183-192）
```typescript
export const updateEntity = (kind: string, id: number, data: { title?: string }) => {
  const body: Record<string, string> = {}
  if (data.title !== undefined) {
    body[kind === 'memory' || kind === 'item' ? 'content' : 'title'] = data.title
  }
  if (kind === 'item') {
    return apiRequest(`/item/${id}/update`, { method: 'POST', json: body })
  }
  return apiRequest(`/${KIND_PLURAL[kind]}/${id}`, { method: 'PUT', json: body })
}
```

本轮需要扩展此函数以支持更多字段，或新建 `updateEntityField` 处理通用字段更新。

### 后端 PUT 端点（已就绪）
- `PUT /tasks/<id>` — body: `{ title, detail, priority, status, ... }`
- `PUT /memories/<id>` — body: `{ content, detail, category, status, ... }`
- `PUT /decisions/<id>` — body: `{ title, decision, context, reasoning, status, ... }`
- `POST /item/<id>/update` — body: `{ content, ... }`

## 12. 提交风格

```
add: 015 — Entity Detail 富化（完整内容展示 + 字段编辑 + 快捷操作）

- NodeDetailCard 自动加载完整 entity 数据，按 kind 展示不同字段
- 所有字段支持内联编辑（点击编辑图标 → 修改 → Enter 保存 / Esc 取消）
- 快捷操作：task 标记完成/重开、memory 确认/归档
- 修复 lifeline 编辑名称从 window.prompt 改为自定义弹窗
- API 层新增 getTask/getMemory/getDecision/getItem + 快捷操作端点
```
