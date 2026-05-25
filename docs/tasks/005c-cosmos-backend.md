# 005c — Cosmos 后端：lifelines / associations 表 + GET /cosmos

> 一句话：把 `frontend/public/mock/cosmos.json` 的静态契约变成真后端，让 Atlas 模式从 mock 切到真数据。前端代码改动最少（只换数据源 URL），新增的负担集中在后端。

## 1. 范围

新建表 + 1 个 GET endpoint + 1 个 smoke test + 前端切数据源。**不做** UI 改动、不做语义计算（associations 暂时人工种子），不做权限分级。

## 2. Atlas v0.1 产品边界（**先读再做**）

> Atlas v0.1 **不是**全量知识库浏览器。Atlas **只显示被明确挂载到 lifeline 的内容**。
> 未挂载的条目继续留在 Capture / 搜索 / 近况里，**不进入 Atlas**。
>
> 这不是 bug，是产品边界。**禁止**做 "Uncategorized" / "未分类" fallback bucket —— Atlas 一旦掺杂未挂载噪声就退化成垃圾场，违背"低摩擦 > 完整分类"的核心定位。

## 3. 数据模型决策

**契约就是 `frontend/public/mock/cosmos.json`**（前端已用作 mock 数据源）— endpoint 返回的 JSON 跟它结构 1:1，schema_version 保持 `"0.1"`。

| 实体 | 来源 | 备注 |
|---|---|---|
| `root` | 写死返回 `{ id: "ROOT", name: "我" }` | v0.1 不入库 |
| `lifelines` | 新表 `lifelines` | 手动种子，无数据返回 `[]` |
| `entities` | **聚合现有 `items` + `tasks` + `memories` + `decisions`** | 给这 4 个表 ALTER ADD `lifeline_id TEXT` 列 |
| `associations` | 新表 `associations` | 手动种子，无数据返回 `[]` |

不新建 entities 表 — Axiom 已经有 items/tasks/memories/decisions 四张表，重复存会偏离单一事实源。

## 4. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `core/_common.py` | `init_db()` 加 2 个 `CREATE TABLE IF NOT EXISTS`；加 4 个 `ensure_*_lifeline_id(conn)` 列扩展函数并调用 | +60 行 |
| `core/routes/cosmos.py` | **新建** GET /cosmos 端点 | ~120 行 |
| `core/receiver.py` | import + `register_cosmos(app)` | +2 行 |
| `scripts/smoke_test_cosmos.py` | **新建** 冒烟测试 | ~80 行 |
| `frontend/src/stores/cosmos.ts` | 把 `fetch('/mock/cosmos.json')` 改成走 `apiRequest('/cosmos')` | ~5 行 |
| `frontend/src/api/endpoints.ts` | 加 `getCosmos()` + 对应类型 | +10 行 |
| `frontend/src/api/types.ts` | 加 `CosmosResponse` 类型（reuse `frontend/src/cosmos/types.ts` 的现有定义） | +5 行 |
| `frontend/vite.config.ts` | proxy 加 `cosmos` 前缀 | +1 行（加进 word-boundary 正则） |

**不要碰**：`frontend/public/mock/cosmos.json`（保留作为离线 fallback / 文档）、任何前端 Cosmos UI 代码、tokens.css。

## 5. 表结构

### 5.1 lifelines
```sql
CREATE TABLE IF NOT EXISTS lifelines (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id TEXT,                   -- NULL = 根下；不强制 FK
  order_index INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_lifelines_parent ON lifelines(parent_id);
```

### 5.2 associations
```sql
CREATE TABLE IF NOT EXISTS associations (
  id TEXT PRIMARY KEY,
  from_kind TEXT NOT NULL,          -- 'task'|'memory'|'decision'|'item'|'lifeline'
  from_id TEXT NOT NULL,
  to_kind TEXT NOT NULL,
  to_id TEXT NOT NULL,
  relation_type TEXT NOT NULL,      -- 'co_occurrence'|'causal'|'tension'|'derived_from'
  confidence REAL NOT NULL DEFAULT 0.5,
  status TEXT NOT NULL DEFAULT 'pending',  -- 'pending'|'accepted'|'rejected'
  evidence TEXT,                    -- JSON: [{type, excerpt, weight}]
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_assoc_from ON associations(from_id);
CREATE INDEX IF NOT EXISTS idx_assoc_to ON associations(to_id);
```

### 5.3 给现有四表加 lifeline_id（含索引 + 容错）

按 Axiom 模式（参见 `ensure_items_table_columns`）写 4 个 idempotent 函数。**三条强制要求**：

1. **加索引**：每张表的 `lifeline_id` 列都要建 BTREE 索引（无索引 → /cosmos 聚合查询会随主线增长劣化）。
2. **跳过不存在的表**：用 `sqlite_master` 检测表是否存在，不存在就静默跳过，**不要抛**。
3. **idempotent**：连跑两次结果一致，不重复 ALTER，不报 `duplicate column`。

模板：

```python
def ensure_items_lifeline_id(conn):
    # 表不存在则跳过（init 顺序无依赖性）
    exists = conn.execute(
        "SELECT 1 FROM sqlite_master WHERE type='table' AND name='items'"
    ).fetchone()
    if not exists:
        return
    cols = {row[1] for row in conn.execute("PRAGMA table_info(items)")}
    if "lifeline_id" not in cols:
        conn.execute("ALTER TABLE items ADD COLUMN lifeline_id TEXT")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_items_lifeline_id ON items(lifeline_id)")
```

同样写 `tasks` / `memories` / `decisions`。在 `init_db()` 最后顺序调用四个。索引名固定：
`idx_items_lifeline_id` / `idx_tasks_lifeline_id` / `idx_memories_lifeline_id` / `idx_decisions_lifeline_id`

## 6. GET /cosmos 契约

**请求**：`GET /cosmos` + `X-Axiom-Key`，无参数。

**返回**：成功 200，body 是 `ok_response({...})`，payload 字段对齐 mock：

```json
{
  "ok": true,
  "schema_version": "0.1",
  "root": { "id": "ROOT", "name": "我" },
  "lifelines": [ { "id": "L1", "name": "...", "parent_id": "ROOT", "order_index": 1 } ],
  "entities": [
    { "id": "T1", "kind": "task", "title": "...", "lifeline_id": "L1.1", "meta": { ... } },
    { "id": "M1", "kind": "memory", "title": "...", "lifeline_id": "L1.2" }
  ],
  "associations": [
    { "id": "A1", "from": "T1", "to": "M1", "relation_type": "co_occurrence",
      "confidence": 0.82, "status": "accepted",
      "evidence": [{ "type": "shared_keyword", "excerpt": "...", "weight": 0.6 }] }
  ]
}
```

**关键实现细节**：

- entities 聚合：4 个 UNION 查询（items/tasks/memories/decisions），都 `WHERE lifeline_id IS NOT NULL`。**没标 lifeline_id 的条目不出现在 Atlas**（参见第 2 节产品边界 —— 禁止做 "Uncategorized" fallback）。
- title 字段：tasks 用 `description`，memories 用 `content`，decisions 用 `title`，items 用 `display_name` (or fallback)。截断到 80 字符。
- entity.meta：tasks 包 `{priority, status}`，其它可省略 meta 字段（或 `{}`）。
- evidence 列从 TEXT 反序列化成 JSON 数组；NULL → `[]`。

### 6.1 ID 前缀协议（**正式契约**）

entity / association 端点的所有 ID 一律用前缀字符串，**不要发散**。

| 前缀 | 来源表 | 例 |
|---|---|---|
| `item:<id>` | `items` | `item:42` |
| `task:<id>` | `tasks` | `task:7` |
| `memory:<id>` | `memories` | `memory:13` |
| `decision:<id>` | `decisions` | `decision:3` |
| `lifeline:<id>` | `lifelines` | `lifeline:L1.1`（lifeline id 本身已是字符串） |

**规则**（写一个 helper 复用，不要散落在每个 query 里）：

- 前缀**单数**（`item` 不是 `items`），表名**复数**（`items`）—— 用一个映射常量定义反查：
  ```python
  PREFIX_TO_TABLE = {"item": "items", "task": "tasks", "memory": "memories", "decision": "decisions", "lifeline": "lifelines"}
  ```
- 解析：`task:42` → `("tasks", "42")`；`lifeline:L1.1` → `("lifelines", "L1.1")`
- 拼接：endpoint 输出时 entity.id、association.from、association.to **全部**走这个协议
- 不允许出现 `items:42` / `tasks/7` / 纯数字 ID 等变体
- 这套协议也是未来 005d / 前端跳转 / FloatChat 引用实体的统一格式，**不要为了 v0.1 mock 兼容就破坏它**

注意：前端目前 mock 用的是 `T1` / `M1` 这种简写，**不要照搬**。前端 cosmos store 把 entity.id 当不透明字符串用，切到真后端后改成前缀格式即可，layout / scene 代码不需要解析 ID 内容。

**错误**：仅 403（无 key，Axiom 统一 auth 错误码）。无 500 路径 — 数据库为空时返回空数组，不报错。

## 7. 验收（DeepSeek 自己跑完贴输出）

提交前必须本地跑通：

```bash
# 1. 重启 backend 让 init_db 跑 ALTER
python -m core.receiver

# 2. curl 验证（贴输出到 PR 描述）
curl -H "X-Axiom-Key: $AXIOM_SECRET_KEY" http://127.0.0.1:5000/cosmos | python -m json.tool | head -20

# 3. 冒烟测试
python scripts/smoke_test_cosmos.py
# 期望输出: "✅ all checks passed (N tests)"

# 4. 前端 build
cd frontend && npm run build
```

**smoke test 必须覆盖**：
- 无 key → 401
- 空库 → 200 + `lifelines=[]`、`entities=[]`、`associations=[]`、root + schema_version 正确
- 种子 1 个 lifeline + 1 个 task（带 lifeline_id）+ 1 个 association → 三个数组都有 1 条且字段齐
- 没标 lifeline_id 的 task **不** 出现在 entities

## 8. 禁止事项

- 不删除 mock/cosmos.json（保留作为契约文档 + 离线 fallback）
- 不改前端 Cosmos 渲染逻辑（layout / scene / camera）— 只换数据源
- 不引入新依赖（包括 ORM、JSON Schema 校验库）
- 不在本任务里做 association 自动生成（这是 005d 范畴）
- 不动 schema_migrations 表（保留作未来用）
- 不在 endpoint 里做权限分级（v0.1 信任 X-Axiom-Key 单租户）
- **不要**做 "Uncategorized" / "未分类" / "其他" fallback 主线把未挂载条目兜进去 —— 见第 2 节产品边界
- **不要**发散 ID 前缀协议（不允许 `items:42` / `task/42` / 纯 `42` 之类的变体）
- ALTER TABLE 时**不要**在 SQL 里写 DEFAULT NULL 之外的默认值（SQLite ALTER 限制）

## 9. 提交风格

```
add: 005c — Cosmos 后端 (lifelines/associations 表 + /cosmos endpoint)

- 新表 lifelines / associations
- items/tasks/memories/decisions 加 lifeline_id 列（idempotent ALTER）
- GET /cosmos: 聚合四表 + 两新表，契约对齐 mock/cosmos.json
- 前端 cosmos store 切到 /cosmos，mock 保留作 fallback
- smoke test 覆盖 401 / 空库 / 种子数据 / 未标记 entity 不泄露
```

PR 描述里贴：build 输出末尾、curl 返回前 20 行、smoke test 通过行。
