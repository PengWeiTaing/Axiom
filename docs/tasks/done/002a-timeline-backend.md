# 002a — 后端：统一时间流端点 `GET /timeline`

> 一句话目标：新增一个端点，把 items / tasks / memories / decisions 的**创建事件**和**状态变更事件**合流，按时间倒序分页返回，让前端能渲染真正的"用户做过的所有事"流。

## 1. 背景 / Why

当前前端 Timeline 只调 `/recent`，只能看到 items。但用户在 Axiom 里做的事远不止"丢东西进来"——
完成一个任务、确认一条记忆、回顾一次决策，**都是有价值的事件，应该出现在时间流里**。

经调研后端实际状态：
- `tasks` 有 `completed_at`，但切回 todo 会清空 → 取消/重开事件**丢失**
- `memories` / `decisions` 状态变更**只刷 `updated_at`**，历史状态不保留
- `items` archive/restore **不留任何时间戳**

但 `audit_log` 表完整记录了所有变更事件（`task_done` / `memory_confirm` / `decision_review` / `item_archive` 等），且已建 `idx_audit_log_created_at` 索引。

所以 `/timeline` 必须采用**双源 UNION**：
- 创建事件 → 主表 `created_at`
- 状态变更事件 → `audit_log` JOIN 主表取 title

## 2. 要改 / 新建的文件

| 文件 | 改动 | 大致行数 |
|---|---|---|
| `core/routes/browse.py` | 在 `register_routes(app)` 里新增 `/timeline` 路由 | +90 |
| `scripts/smoke_test_receiver.py` | 加 timeline 端点的测试用例 | +60 |

**不要**新建其他文件。**不要**改 `_common.py` 的 schema / build_item_payload / 任何已有函数。

## 3. 端点契约（这是给前端的合约，必须严格按这个签名实现）

### 请求

```
GET /timeline
  ?page=1          (optional, default 1)
  &page_size=30    (optional, default 30, max 50)
  &kinds=item,task,memory,decision   (optional CSV，过滤；缺省=全部)
```

`kinds` 过滤：合法值 `item` / `task` / `memory` / `decision`；非法值返回 400 `invalid_kinds`。

### 成功响应

```jsonc
{
  "ok": true,
  "page": 1,
  "page_size": 30,
  "total": 187,
  "total_pages": 7,
  "entries": [
    {
      "kind": "task",
      "id": 42,
      "event": "completed",
      "occurred_at": "2026-05-23T09:30:00+00:00",
      "title": "交周报",
      "summary": "交周报",
      "meta": {
        "status": "done",
        "priority": "high",
        "due_date": "2026-05-23",
        "completed_at": "2026-05-23T09:30:00+00:00"
      }
    },
    {
      "kind": "memory",
      "id": 11,
      "event": "created",
      "occurred_at": "2026-05-23T09:15:12+00:00",
      "title": "年底前减到 65kg",
      "summary": "年底前减到 65kg",
      "meta": {
        "category": "goal",
        "status": "confirmed"
      }
    }
    // ...
  ]
}
```

### entries 字段定义（**严格按这个，不要发明字段**）

| 字段 | 类型 | 来源 / 规则 |
|---|---|---|
| `kind` | `"item"` / `"task"` / `"memory"` / `"decision"` | 实体类型 |
| `id` | int | 主键 id |
| `event` | 字符串枚举（见下） | 该 entry 是哪种事件 |
| `occurred_at` | ISO8601 | 该事件发生的时间（关键字段——前端按此排序） |
| `title` | string | 实体的"叫法"，见下表 |
| `summary` | string | 同 `title`（先简化）；前端可截断显示 |
| `meta` | object | kind 特定字段，见下表；**字段缺失就不放**（不要 null 占位） |

### event 枚举（仅这些，其他不要发明）

| kind | event 集合 | occurred_at 取自 |
|---|---|---|
| `item` | `created`, `archived`, `restored`, `deleted` | created 取 `items.created_at`；其余取 `audit_log.created_at` |
| `task` | `created`, `completed`, `cancelled`, `restored` | created 取 `tasks.created_at`；其余取 `audit_log.created_at` |
| `memory` | `created`, `confirmed`, `archived` | created 取 `memories.created_at`；其余取 `audit_log.created_at` |
| `decision` | `created`, `reviewed` | created 取 `decisions.created_at`；reviewed 取 `audit_log.created_at` |

注：删除事件（`deleted` / `item_delete` audit action）**也要返回**——用户希望看到"我删过这条"。title 用 `audit_log.detail` 里保留的快照，或者实体已不存在时回退 `(已删除 #id)`。如果 detail 没有快照，先按 `(已删除 #id)` 处理，不强求重建。

### title 来源表

| kind | title 字段来源 |
|---|---|
| `item` | `items.content`（截前 80 字符） |
| `task` | `tasks.title` |
| `memory` | `memories.content`（截前 80 字符） |
| `decision` | `decisions.title` |

### meta 字段表（按 kind 列出，**只放这些字段**）

| kind | meta 字段 |
|---|---|
| `item` | `type` (text/image/document/audio), `source`, `storage` |
| `task` | `status`, `priority`, `due_date`, `completed_at` (若有) |
| `memory` | `category`, `status` |
| `decision` | `status` |

### 错误响应

- `page` / `page_size` 非正数 → 400 `invalid_pagination`
- `kinds` 含非法值 → 400 `invalid_kinds`
- DB 故障 → 500 `database_read_failed`

## 4. SQL 大致结构（**只是给你参考结构，具体实现你写**）

两段 SELECT 通过 `UNION ALL` 拼起来，再外层 `ORDER BY occurred_at DESC LIMIT ? OFFSET ?`：

```sql
-- 1) 创建事件（从主表）
SELECT 'item' AS kind, id, 'created' AS event, created_at AS occurred_at,
       SUBSTR(COALESCE(content, ''), 1, 80) AS title, ...
FROM items
UNION ALL
SELECT 'task' AS kind, id, 'created' AS event, created_at AS occurred_at,
       title, ...
FROM tasks
-- ... memories / decisions 同理

UNION ALL

-- 2) 状态变更事件（从 audit_log）
SELECT 'task' AS kind, target_id AS id,
       CASE action
         WHEN 'task_done' THEN 'completed'
         WHEN 'task_cancelled' THEN 'cancelled'
         WHEN 'task_todo' THEN 'restored'
       END AS event,
       a.created_at AS occurred_at,
       t.title, ...
FROM audit_log a
LEFT JOIN tasks t ON t.id = a.target_id
WHERE a.action IN ('task_done', 'task_cancelled', 'task_todo')
-- ... memory_confirm / memory_archive / decision_review / item_archive / item_restore / item_delete 同理
```

注意：
- COUNT(*) 和 SELECT 都要跑（governance.py 是双查询模式，照搬）
- `kinds` 过滤体现在两段 SELECT 的 `WHERE` 子句和 UNION 分支裁剪
- meta 字段用一次额外 SELECT 拼上去 OK；不要在 SQL 里 JSON 序列化，python 层组装更清楚

## 5. 验收清单

- [ ] `cd E:/Axiom && python -m compileall -q core` 通过
- [ ] `python scripts/smoke_test_receiver.py` 通过（含新加测试）
- [ ] 手动 curl：
  ```bash
  curl -H "X-Axiom-Key: axiom123" "http://127.0.0.1:5000/timeline?page=1&page_size=10"
  # 返回 entries 含多种 kind
  curl -H "X-Axiom-Key: axiom123" "http://127.0.0.1:5000/timeline?kinds=task,memory"
  # 只返回 task 和 memory
  curl -H "X-Axiom-Key: axiom123" "http://127.0.0.1:5000/timeline?kinds=invalid"
  # 返回 400 invalid_kinds
  ```
- [ ] 测试至少覆盖：
  1. 空库返回 entries=[]
  2. 创建一个 task → 出现 kind=task event=created
  3. 完成该 task → 同时出现 kind=task event=completed（**两条都在**，不是覆盖）
  4. kinds 过滤生效
  5. 分页正常（total / total_pages 数值对）

## 6. 禁止事项

- 不要改任何已有路由的行为
- 不要修改 `_common.py` 的 schema / build_item_payload
- 不要给 `items` 表加 `updated_at` 列（这是后续大改动，单独议）
- 不要在 `audit_log` 表加新字段
- 不要为了"简化"丢掉删除事件（用户要看到自己删过什么）
- 不要在 SQL 里硬编码 `LIMIT 100` 或类似魔数——用 `page_size`
- 不要把 4 张表查 4 次再 Python 合流——必须用 SQL UNION ALL（性能 + 排序正确性）

## 7. 提交风格

```
add: GET /timeline 统一事件流端点

- 双源 UNION ALL：主表 created 事件 + audit_log 状态变更事件
- 4 类实体（item/task/memory/decision）合流分页
- kinds 过滤、严格 entries 契约
- smoke_test_receiver 新增 5 个用例
```
