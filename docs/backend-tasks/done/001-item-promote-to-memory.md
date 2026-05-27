# 001 — POST /items/<id>/promote-to-memory

> 一句话目标：让任意一条 item 能被显式"升级"为一条 candidate memory，并建立 `memories.source_item_id` 反向链。

## 1. 背景 / Why

`memories` 表早就有 `source_item_id INTEGER REFERENCES items(id) ON DELETE SET NULL` 字段（见 `core/_common.py` 建表 SQL），但目前**没有任何端点会写入这个字段**——前端只能"凭空"新建 memory，丢掉了来源 item 的可追溯性。

这是打通对象关系链 `item → memory → task → decision → lifeline → association` 第一段的最关键端点。后续 B-003 / B-004 / B-005 都依赖本端点。

## 2. 要改 / 新建的文件

| 文件 | 改动 | 大致行数 |
|---|---|---|
| `core/routes/items.py` | 新增端点 `promote_item_to_memory(item_id)`，注册在 `register_routes(app)` 内部 | +50 |

**不要新建文件，不要动 `_common.py`、不要动 memories.py**。

## 3. 接口契约

### 端点

```
POST /item/<int:item_id>/promote-to-memory
```

> 路径风格沿用既有 `/item/<id>` / `/item/<id>/update`（单数 `item`，**不是** `items`）。

### 请求

`Content-Type: application/json`，body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `category` | str | 是 | 必须 ∈ `MEMORY_CATEGORIES`（fact / preference / goal / relationship / event）。非法值返回 400。 |
| `content` | str | 否 | 记忆正文。若省略或为空字符串，按"缺省策略"自动派生（见下）。 |
| `detail` | str | 否 | 备注，trim 后空字符串视为 null。 |

#### content 缺省派生策略

DeepSeek 注意：只在请求里没有传 `content`（或 trim 后为空）时才走派生，否则直接用请求里的 `content`。

派生时按优先级取第一个非空、trim 后非空的字段：

1. `item.content`
2. `item.derived_text`
3. `item.transcript_text`
4. `item.original_name`

取到后截取前 200 个字符（按 Python 字符串 slice，不需要按 byte），作为 `content`。
如果四个字段都为空 → 返回 400 `missing_content`。

#### source_text 派生

不论 `content` 是请求传入还是派生而来，**`source_text` 都固定写入派生候选里第一个非空字段的前 200 字符**——它代表"这条 memory 来自 item 的哪段文本"。如果四个字段都为空，`source_text=null`。

### 响应（成功）

```
201 Created
```

`ok_response({"memory": memory_dict}, 201)` 实际返回扁平形式：

```json
{
  "ok": true,
  "memory": {
    "id": 17,
    "category": "fact",
    "category_label": "事实",
    "content": "...",
    "detail": null,
    "status": "candidate",
    "status_label": "待确认",
    "source_item_id": 42,
    "source_text": "...",
    "created_at": "2026-05-27T08:30:00+00:00",
    "updated_at": "2026-05-27T08:30:00+00:00",
    "linked_tasks": [],
    "task_progress": null
  }
}
```

memory 对象结构**完全复用** `core/routes/memories.py` 里 `row_to_memory(row)` 的输出——不要自己拼字段。

### 错误码

| HTTP | code | 触发条件 |
|---|---|---|
| 400 | `invalid_category` | category 不在 `MEMORY_CATEGORIES` |
| 400 | `missing_content` | 既没传 content 又派生不出来（四字段全空） |
| 404 | `item_not_found` | item 不存在 |
| 401 | （由 `require_key()` 处理） | key 错误 / 缺失 |

### 副作用

- 向 `memories` 表插入一行：
  - `category = 请求传入的 category`
  - `content = 请求传入或派生得到的 content`
  - `detail = 请求传入的 detail（trim 后空字符串 → null）`
  - `status = 'candidate'`
  - `source_item_id = path 里的 item_id`
  - `source_text = 派生候选第一个非空字段前 200 字`
  - `created_at = updated_at = utc_now().isoformat(timespec="seconds")`
- 写审计日志：`write_audit_log("memory_promote_from_item", "memory", memory_id)`
- **不要**额外动 items 表
- **不要**触发 AI 调用

## 4. 实现骨架（参考，不是强制）

```python
@app.route("/item/<int:item_id>/promote-to-memory", methods=["POST"])
def promote_item_to_memory(item_id: int):
    auth_error = require_key()
    if auth_error:
        return auth_error

    row = get_item_by_id(item_id)
    if row is None:
        return error_response(404, "item_not_found", "item 不存在")

    body = request.get_json(silent=True) or {}
    category = str(body.get("category", "")).strip()
    if category not in MEMORY_CATEGORIES:
        return error_response(400, "invalid_category", f"category 不支持: {category}")

    detail = str(body.get("detail", "")).strip() or None
    raw_content = str(body.get("content", "")).strip()

    # 派生候选
    candidates = [
        row["content"],
        row["derived_text"] if "derived_text" in row.keys() else None,
        row["transcript_text"] if "transcript_text" in row.keys() else None,
        row["original_name"] if "original_name" in row.keys() else None,
    ]
    first_non_empty = next((c.strip() for c in candidates if c and c.strip()), None)
    source_text = first_non_empty[:200] if first_non_empty else None

    content = raw_content if raw_content else (source_text or "")
    if not content:
        return error_response(400, "missing_content", "无法派生 content，请显式传入")

    now = utc_now().isoformat(timespec="seconds")
    conn = get_db_connection()
    try:
        cursor = conn.execute(
            "INSERT INTO memories (category, content, detail, status, source_item_id, source_text, created_at, updated_at) "
            "VALUES (?, ?, ?, 'candidate', ?, ?, ?, ?)",
            (category, content, detail, item_id, source_text, now, now),
        )
        conn.commit()
        memory_id = cursor.lastrowid
        write_audit_log("memory_promote_from_item", "memory", memory_id)
        # 复用 memories.py 的 row_to_memory ——它在 register_routes 内部定义
        # 这里改为直接构造响应，跟 memories.py 里 row_to_memory 字段保持一致
        new_row = conn.execute(
            "SELECT id, category, content, detail, status, source_item_id, source_text, created_at, updated_at "
            "FROM memories WHERE id = ?",
            (memory_id,),
        ).fetchone()
    finally:
        conn.close()

    memory = {
        "id": new_row["id"],
        "category": new_row["category"],
        "category_label": MEMORY_CATEGORY_LABELS.get(new_row["category"], new_row["category"]),
        "content": new_row["content"],
        "detail": new_row["detail"],
        "status": new_row["status"],
        "status_label": MEMORY_STATUS_LABELS.get(new_row["status"], new_row["status"]),
        "source_item_id": new_row["source_item_id"],
        "source_text": new_row["source_text"],
        "created_at": new_row["created_at"],
        "updated_at": new_row["updated_at"],
        "linked_tasks": [],
        "task_progress": None,
    }
    return ok_response({"memory": memory}, 201)
```

> 注意 `row_to_memory` 定义在 `core/routes/memories.py` 的 `register_routes` 闭包内部，items.py 拿不到。**复制等价字段拼装即可**，不要把 `row_to_memory` 提到模块顶层（那是后续重构的事，不在本任务范围）。

## 5. 验收清单

- [ ] `python -m compileall -q core` 通过
- [ ] 启动 receiver，手动 curl：
  - `POST /add` 先建一条 text item，记下 id（设为 `$ITEM_ID`）
  - `POST /item/$ITEM_ID/promote-to-memory` body `{"category":"fact"}`，返回 201，memory.source_item_id == $ITEM_ID
  - `POST /item/$ITEM_ID/promote-to-memory` body `{"category":"goal","content":"显式正文"}`，memory.content == "显式正文"，memory.source_text 仍是原 item 文本前 200 字
  - `POST /item/999999/promote-to-memory` → 404 `item_not_found`
  - `POST /item/$ITEM_ID/promote-to-memory` body `{"category":"x"}` → 400 `invalid_category`
- [ ] `GET /memories` 能看到新建的 memory，status=candidate
- [ ] `GET /audit-log` 能看到 `memory_promote_from_item`
- [ ] `python scripts/smoke_test_receiver.py` 通过（不应破坏既有用例）
- [ ] B-006 任务单会补 smoke test 用例，本任务**不需要**改 smoke 脚本

## 6. 禁止事项

- 不要改 `core/_common.py`
- 不要改 `core/routes/memories.py`
- 不要新建表 / 加字段
- 不要在端点里调用 AI / DeepSeek
- 不要复制 item 文件到新位置（memory 不持有文件，只通过 source_item_id 指回去）
- 不要把 `row_to_memory` 提到模块顶层
- 不要在响应里加 `source_item` 嵌套对象（那是 B-003 的事，本任务只返 `source_item_id`）
