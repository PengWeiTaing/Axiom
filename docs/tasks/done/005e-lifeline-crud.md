# 005e — Lifeline CRUD + Entity 挂载

> 一句话：让用户能自己建 lifeline、管理 lifeline 树、把 entity 归类到 lifeline。Atlas 从只读 demo 变成可用的知识图谱。

## 1. 范围

后端 4 个端点 + 前端 1 个面板组件 + 1 个 smoke test。**不做** lifeline 拖拽排序、不做批量挂载、不做关联手动编辑（留给 005f）。

## 2. 产品边界

- lifeline 的 `id` 由用户指定（如 `L6`、`rust`），不自动生成。id 建议用英文/拼音短名，前端做简单校验（非空、无空格）。
- 删除 lifeline 时：挂载的 entity 全部卸载（`lifeline_id = NULL`），子 lifeline 提升到根级（`parent_id = NULL`）。**不做**级联删除。
- 同一个 entity 只能挂到一个 lifeline（已有的 `lifeline_id` 单一列已保证这一点）。
- entity 挂载/卸载不改变 entity 本身的其他字段。

## 3. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `core/routes/lifelines.py` | **新建** 4 个端点 | ~150 行 |
| `core/receiver.py` | import + register | +2 行 |
| `frontend/src/components/LifelinePanel.vue` | **新建** 左侧管理面板 | ~200 行 |
| `frontend/src/views/CosmosView.vue` | 集成 LifelinePanel | +5 行 |
| `frontend/src/stores/cosmos.ts` | 加 `reload()` + CRUD actions | +40 行 |
| `frontend/src/api/endpoints.ts` | 加 lifeline API 函数 | +20 行 |
| `scripts/smoke_test_lifelines.py` | **新建** 冒烟测试 | ~100 行 |

## 4. 后端端点

### 4.1 POST /lifelines — 新建

```
POST /lifelines
X-Axiom-Key: xxx
Content-Type: application/json

{ "id": "rust", "name": "Rust 学习", "parent_id": "ROOT", "order_index": 2 }
```

- `id`（必填）：用户指定的 lifeline ID 字符串。只能包含字母、数字、下划线、连字符，不允许空格和特殊字符。
- `name`（必填）：显示名称，1-40 字符。
- `parent_id`（选填，默认 `null`）：父 lifeline ID（raw 值，如 `L1`）或 `"ROOT"` 表示根级。传 `"ROOT"` 等价于 `null`，入库存 `null`。
- `order_index`（选填，默认 0）。

**校验**：
- id 已存在 → `400 ("duplicate_id")`
- name 为空/空白 → `400 ("invalid_name")`
- parent_id 不是 `"ROOT"`、不是 `null`，且不在 lifelines 表中 → `400 ("parent_not_found")`

**返回 200**：
```json
{
  "ok": true,
  "lifeline": {
    "id": "lifeline:rust",
    "name": "Rust 学习",
    "parent_id": "ROOT",
    "order_index": 2
  }
}
```

注意返回的 `id` 走 entity_id 前缀协议（`lifeline:rust`），`parent_id` 为 `null` 的输出 `"ROOT"`。

### 4.2 PUT /lifelines/<id> — 编辑

```
PUT /lifelines/rust
X-Axiom-Key: xxx

{ "name": "Rust 深入", "order_index": 3 }
```

- body 所有字段选填，只更新提供的字段。
- `parent_id` 校验规则同 POST（不允许设为自身 = 循环引用检测的简化版：不允许 `parent_id == id`）。

**返回 200**：
```json
{
  "ok": true,
  "lifeline": { "id": "lifeline:rust", "name": "Rust 深入", "parent_id": "ROOT", "order_index": 3 }
}
```

lifeline 不存在 → `404 ("lifeline_not_found")`。

### 4.3 DELETE /lifelines/<id> — 删除

```
DELETE /lifelines/rust
X-Axiom-Key: xxx
```

**副作用**：
1. 所有挂载到该 lifeline 的 entity（四表）的 `lifeline_id` 设为 `NULL`
2. 所有 `parent_id` 指向该 lifeline 的子 lifeline 的 `parent_id` 设为 `NULL`

**返回 200**：
```json
{
  "ok": true,
  "message": "已删除 lifeline:rust",
  "unmounted_entities": 5,
  "reparented_children": 2
}
```

lifeline 不存在 → `404`。

### 4.4 PUT /cosmos/entities/<kind>/<id>/lifeline — 挂载/卸载

```
PUT /cosmos/entities/task/42/lifeline
X-Axiom-Key: xxx

{ "lifeline_id": "rust" }
```

- `kind`：`item` | `task` | `memory` | `decision`
- `id`：entity 的原始整数 ID
- `lifeline_id`：目标 lifeline 的 raw ID（如 `"rust"`），传 `null` 卸载

**校验**：
- kind 不在四种之内 → `400 ("invalid_kind")`
- entity 在对应表中不存在 → `404 ("entity_not_found")`
- lifeline_id 不是 `null` 且不在 lifelines 表中 → `400 ("lifeline_not_found")`

**返回 200**：
```json
{
  "ok": true,
  "entity": {
    "id": "task:42",
    "kind": "task",
    "title": "完成 Rust trait 章节练习",
    "lifeline_id": "lifeline:rust"
  }
}
```

卸载时 `lifeline_id` 为 `null`。

### 4.5 通用约束

- 所有端点走 `require_key()` → 403。
- 用 `get_db_connection()` + `try/finally: conn.close()` 模式。
- 返回的 ID 字段走 `entity_id()` 前缀协议（复用 `core/routes/cosmos.py` 的函数）。
- lifeline id 的输入校验正则：`re.match(r'^[a-zA-Z0-9_-]+$', id_str)`。

## 5. 前端 LifelinePanel

### 5.1 位置与外观

- CosmosView 左上角，Breadcrumb 下方，固定宽度 **260px**，最大高度 70vh，超出滚动。
- 背景 `var(--surface-1)`，圆角 `var(--r-2)`，内边距 `var(--s-3)`。
- 使用 `<script setup lang="ts">`。

### 5.2 功能

**Lifeline 树列表**：
- 按层级缩进显示（根级 → 子级），每行 24px 高
- 每行显示：名称 + 挂载 entity 数量 badge
- 点击 lifeline 行 → 触发 `store.transition({ kind: 'region_zoom', lifeline_id })`，Atlas 相机飞过去
- 当前 zoom 状态的 lifeline 高亮（文字色 `var(--text-1)`，其余 `var(--text-3)`）

**新建 lifeline**：
- 顶部 "+ 新建 lifeline" 按钮
- 点击后展开 inline 表单：id 输入框 + name 输入框 + parent 下拉（默认 "ROOT (根级)"）+ 保存/取消按钮
- 保存成功后调 `store.reload()` 刷新数据

**编辑 lifeline**：
- 每行右侧有一个小编辑按钮（笔图标或 "…" 菜单）
- 点击后该行变为 inline 编辑：name 输入框预填当前值，回车保存，esc 取消

**删除 lifeline**：
- 编辑模式或右键菜单中提供"删除"按钮
- 点击后弹确认："确定删除 lifeline 'XXX'？挂载的 N 个 entity 将被卸载。"
- 确认后调 API，成功后 `store.reload()`

**查看/管理挂载的 entity**：
- 点击 lifeline 行左侧的展开箭头（▶/▼）
- 展开后显示挂载的 entity 列表（从 `store.data.entities` 按 `lifeline_id` 过滤）
- 每条 entity 显示：kind 图标/标签 + title（截断 30 字符）
- 每条 entity 右侧有 "×" 按钮，点击卸载
- 列表底部有 "＋ 关联 entity" 按钮 → 点击打开搜索小弹窗

**搜索挂载 entity（小弹窗）**：
- 输入框 + 搜索结果列表（最多 5 条）
- 调用 `searchAll(query, 5)`（已有端点）
- 每条结果显示 kind + title，点击即挂载到当前 lifeline
- 已挂载到**任何** lifeline 的 entity 在结果中标记为 "已归类到 XXX"（不可重复挂载）
- 挂载成功后关闭弹窗，`store.reload()`

### 5.3 视觉约束

- 只用 `tokens.css` 变量（颜色、圆角、间距、字号、动效）
- 不引入新色值或硬编码颜色
- 图标用文本字符（+、×、▶、▼、…），不引入 icon 库
- loading 状态用 `var(--text-3)` + 文字 "加载中…"，不引入 spinner 库

## 6. Store 改动

在 `frontend/src/stores/cosmos.ts` 加：

```typescript
// 强制刷新（清缓存 + 重新 fetch）
async function reload() {
  data.value = null
  error.value = null
  await load()
}

// lifeline CRUD（调 API + 自动 reload）
async function createLifeline(params: { id: string; name: string; parent_id?: string; order_index?: number }) {
  const { createLifeline: apiCreate } = await import('@/api/endpoints')
  await apiCreate(params)
  await reload()
}

async function updateLifeline(id: string, params: { name?: string; parent_id?: string; order_index?: number }) {
  const { updateLifeline: apiUpdate } = await import('@/api/endpoints')
  await apiUpdate(id, params)
  await reload()
}

async function deleteLifeline(id: string) {
  const { deleteLifeline: apiDelete } = await import('@/api/endpoints')
  await apiDelete(id)
  await reload()
}

async function mountEntity(kind: string, entityId: number, lifelineId: string | null) {
  const { mountEntity: apiMount } = await import('@/api/endpoints')
  await apiMount(kind, entityId, lifelineId)
  await reload()
}
```

注：store 用动态 import 导入 API 函数（避免循环依赖）。

## 7. API 函数

在 `frontend/src/api/endpoints.ts` 末尾加：

```typescript
export const createLifeline = (data: { id: string; name: string; parent_id?: string; order_index?: number }) =>
  apiRequest<{ lifeline: import('@/cosmos/types').CosmosLifeline }>('/lifelines', { method: 'POST', json: data });

export const updateLifeline = (id: string, data: { name?: string; parent_id?: string; order_index?: number }) =>
  apiRequest<{ lifeline: import('@/cosmos/types').CosmosLifeline }>(`/lifelines/${encodeURIComponent(id)}`, { method: 'PUT', json: data });

export const deleteLifeline = (id: string) =>
  apiRequest<{ message: string; unmounted_entities: number; reparented_children: number }>(`/lifelines/${encodeURIComponent(id)}`, { method: 'DELETE' });

export const mountEntity = (kind: string, id: number, lifeline_id: string | null) =>
  apiRequest<{ entity: import('@/cosmos/types').CosmosEntity }>(`/cosmos/entities/${kind}/${id}/lifeline`, { method: 'PUT', json: { lifeline_id } });
```

## 8. 验收

```bash
# 1. 重启 backend
python -m core.receiver

# 2. 冒烟测试
python scripts/smoke_test_lifelines.py
# 期望: "all checks passed (N tests)"

# 3. curl 验证 CRUD
# 创建
curl -X POST -H "X-Axiom-Key: $AXIOM_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{"id":"test","name":"测试","parent_id":"ROOT"}' \
  http://127.0.0.1:5000/lifelines

# 编辑
curl -X PUT -H "X-Axiom-Key: $AXIOM_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name":"测试改名"}' \
  http://127.0.0.1:5000/lifelines/test

# 挂载 entity（先用 dry_run 看有哪些 entity）
curl -X PUT -H "X-Axiom-Key: $AXIOM_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{"lifeline_id":"test"}' \
  http://127.0.0.1:5000/cosmos/entities/task/1/lifeline

# 删除
curl -X DELETE -H "X-Axiom-Key: $AXIOM_SECRET_KEY" \
  http://127.0.0.1:5000/lifelines/test

# 4. 前端 build
cd frontend && npm run build
```

**smoke test 必须覆盖**：
- 无 key → 403
- 创建 lifeline → 200 + 返回带前缀 ID
- 创建重复 id → 400
- 创建空 name → 400
- 创建无效 parent_id → 400
- 更新 lifeline → 200 + 字段变更
- 更新不存在的 lifeline → 404
- 挂载 entity → 200 + lifeline_id 正确
- 挂载到不存在的 lifeline → 400
- 挂载不存在的 entity → 404
- 卸载 entity（`lifeline_id: null`）→ 200 + lifeline_id 为 null
- 删除 lifeline → 200 + 副作用（entity 卸载、子 lifeline 提升）
- 无效 kind → 400

## 9. 提交风格

```
add: 005e — Lifeline CRUD + Entity 挂载

- POST/PUT/DELETE /lifelines 端点
- PUT /cosmos/entities/<kind>/<id>/lifeline 挂载/卸载
- LifelinePanel 左侧管理面板（树列表 + 增删改 + entity 关联）
- cosmos store 加 reload + CRUD actions
- smoke test 覆盖 CRUD / 校验 / 副作用
```

PR 描述里贴：build 输出末尾、smoke test 通过行、curl 验证截屏。
