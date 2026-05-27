# 003 — memory 详情挂 source_item，item 详情挂 derived_memories

> 一句话目标：把 `item ↔ memory` 的反向链在两边详情接口里都显式暴露出来。

## 1. 背景 / Why

B-001 让 `memories.source_item_id` 有了写入路径，但读出来还是一个孤立 id：

- `GET /memories/<id>` 只返 `source_item_id`，前端要拿到 item 的标题 / 类型 / 时间还得再请求一次。
- `GET /item/<id>` 完全不知道这条 item 曾被升级为哪些 memory，导致 item 详情页不能展示"派生记忆"列表。

本任务把两边详情接口都补成"自包含"——拿到详情就能直接渲染反向链。

## 2. 要改 / 新建的文件

| 文件 | 改动 | 大致行数 |
|---|---|---|
| `core/routes/memories.py` | 修改 `memory_detail(memory_id)` 的 GET 分支：加 `source_item` 字段 | +20 |
| `core/routes/items.py` | 修改 `get_item(item_id)`：加 `derived_memories` 字段 | +15 |

## 3. 接口契约

### 3.1 `GET /memories/<int:memory_id>`

#### 响应（成功）

原响应字段保持不变，**新增 `source_item`**。`ok_response({"memory": memory_dict})` 实际返回的扁平形式：

```json
{
  "ok": true,
  "memory": {
    "id": 17,
    "category": "fact",
    ...原有字段...,
    "source_item_id": 42,
    "source_item": {
      "id": 42,
      "type": "text",
      "type_label": "文本",
      "snippet": "用户今天又凌晨四点睡了...",
      "created_at": "2026-05-26T20:11:00+00:00"
    },
    "linked_tasks": [...],
    "task_progress": {...}
  }
}
```

#### `source_item` 的规则

- 当 `memory.source_item_id` 为 null → `source_item = null`
- 当 `source_item_id` 不为 null **且** items 表查得到这条记录 → 返回上述 4 字段对象
- 当 `source_item_id` 不为 null **但** items 表查不到（item 被删后 FK ON DELETE SET NULL 应该已经把 source_item_id 也清掉，但防御性兜底）→ 仍返回 `source_item = null`，**不要 500**

#### snippet 派生

按以下优先级取第一个非空字段，trim 后截取前 120 字：

1. `items.content`
2. `items.original_name`
3. `items.derived_text`
4. `items.transcript_text`

四个都空 → `snippet = ""`（不是 null，保持字符串类型稳定）。

#### 查询

只用**一条** SQL：

```sql
SELECT id, type, content, original_name, derived_text, transcript_text, created_at
FROM items WHERE id = ?
```

不要去查 `file_path`、`size_bytes` 等无关字段——保持 payload 小。

### 3.2 `GET /item/<int:item_id>`

#### 响应（成功）

原响应字段保持不变（包括 `storage`、`file_url` 等），**新增 `derived_memories`**。`ok_response({"item": item_dict})` 实际返回扁平形式：

```json
{
  "ok": true,
  "item": {
    "id": 42,
    "type": "text",
    ...原有字段...,
    "derived_memories": [
      {
        "id": 17,
        "category": "fact",
        "category_label": "事实",
        "content": "用户偏好早上 6 点跑步",
        "status": "candidate",
        "status_label": "待确认",
        "created_at": "2026-05-27T08:30:00+00:00"
      }
    ]
  }
}
```

#### `derived_memories` 规则

- 永远是数组（哪怕为空）；不要返回 null
- 按 `created_at DESC` 排序
- **最多返回 10 条**（item 可能被反复升级，避免 payload 爆炸）
- 字段固定为 7 个：`id, category, category_label, content, status, status_label, created_at`，**不**含 detail / source_text / linked_tasks / task_progress（这些只在 memory 详情里展示）

#### 查询

```sql
SELECT id, category, content, status, created_at
FROM memories WHERE source_item_id = ?
ORDER BY created_at DESC LIMIT 10
```

label 字段用 `MEMORY_CATEGORY_LABELS` / `MEMORY_STATUS_LABELS` 在 Python 端补。

### 3.3 错误码

无新错误码。404 / 401 沿用各自原有逻辑。

### 3.4 副作用

- 无写操作
- 无审计日志变化
- 无 AI 调用

## 4. 验收清单

- [ ] `python -m compileall -q core` 通过
- [ ] 手测：
  1. 跑 B-001 准备好 item=$ITEM_ID，memory=$MEM_ID（source_item_id 指向 $ITEM_ID）
  2. `GET /memories/$MEM_ID` → 含 `source_item: { id: $ITEM_ID, type, type_label, snippet, created_at }`
  3. `GET /item/$ITEM_ID` → 含 `derived_memories: [{ id: $MEM_ID, ... }]`
  4. 新建一条无来源 memory（直接 `POST /memories`）→ `GET /memories/<id>` → `source_item: null`
  5. 把 $ITEM_ID 删掉（`DELETE /item/$ITEM_ID`），再 `GET /memories/$MEM_ID` → `source_item_id: null`（FK SET NULL）且 `source_item: null`
- [ ] 既有 `GET /memories/<id>` 调用方不破：响应里原有字段（id/category/content/.../linked_tasks/task_progress）都还在
- [ ] 既有 `GET /item/<id>` 调用方不破：响应里 file_url / storage / processing_state 等字段都还在
- [ ] `python scripts/smoke_test_receiver.py` 通过

## 5. 禁止事项

- 不要改 `build_item_payload`（那是 `_common.py`，跨任务，本任务只在 `items.py` 路由里加字段）
- 不要给 memories 加 N+1 查询（每个 memory 详情只能多发 1 条 SQL，不许循环查）
- 不要把 `derived_memories` 加进 `/recent` 列表响应（列表响应只展示 item 本身，避免每行多查一次）
- 不要新建索引（如果 `memories(source_item_id)` 查询慢，是 B-006 评估的事，本任务不动 schema）
- 不要把 source_item 改成嵌进 `linked_tasks` 同级以外的位置——必须是 memory 对象顶层字段
