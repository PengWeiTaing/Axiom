# 002a-fix — Timeline 后端补测试 + storage Windows 路径修

> 一句话目标：002a 的两处遗漏：(1) 任务单要求的 smoke test 用例没写；(2) item 的 `meta.storage` 用 `LIKE '%/archive/%'` 判断，在 Windows 上永远命中 inbox。

## 1. 背景 / Why

Opus 已经 review 002a：核心功能可用（双源 UNION / kinds 过滤 / 双事件都对），但有两处偏离任务单。

### 遗漏 1：测试用例没写

002a 原任务单 §5 明确要求：

> `python scripts/smoke_test_receiver.py` 通过（含**新加测试**）
>
> 测试至少覆盖：1) 空库返回 entries=[] 2) 创建一个 task → 出现 kind=task event=created 3) 完成该 task → 同时出现 kind=task event=completed（两条都在，不是覆盖）4) kinds 过滤生效 5) 分页正常（total / total_pages 数值对）

但实际 commit `52ce0e1` 的 stat 显示 `scripts/smoke_test_receiver.py` **没被改**。commit message 写"smoke_test_receiver 通过"是误导——意思是"现存测试没破"，不是"我加了新测试"。

### 遗漏 2：storage 字段 Windows 路径 bug

`core/routes/browse.py` 的 timeline 创建事件 SQL：

```sql
CASE WHEN file_path LIKE '%/archive/%' THEN 'archive' ELSE 'inbox' END
```

Windows 上 `file_path` 是 `E:\Axiom\data\archive\xxx`，用 `\` 不是 `/`，LIKE 永远不匹配，**所有归档项的 meta.storage 都被报告成 'inbox'**。这是 001a 已经踩过同一种 Windows 路径 bug 的重犯。

`storage` 字段是给前端区分 inbox/archive 用的，错了之后前端无法正确显示归档项。

## 2. 要改 / 新建的文件

| 文件 | 改动 | 大致行数 |
|---|---|---|
| `core/routes/browse.py` | 修 storage 字段 SQL 表达式（仅 item 那段 union） | -1 / +1 |
| `scripts/smoke_test_receiver.py` | 加 5 个 timeline 测试用例 | +60 |

不要改其他文件。**不要**改 timeline 端点的其他行为。

## 3. storage 字段 SQL 修法

把 timeline 端点里**仅 item 创建事件那段**的 storage 表达式从：

```sql
CASE WHEN file_path LIKE '%/archive/%' THEN 'archive' ELSE 'inbox' END
```

改成（同时匹配 `/` 和 `\`，跨平台）：

```sql
CASE
  WHEN file_path LIKE '%' || ? || '%' THEN 'archive'
  WHEN file_path IS NULL THEN 'inbox'
  ELSE 'inbox'
END
```

参数 `?` 在 Python 端传 `os.sep + 'archive' + os.sep`（Windows 是 `\archive\`，Unix 是 `/archive/`）。

或者**更省事的写法**——用 `INSTR` + 同时检查两种分隔符：

```sql
CASE
  WHEN INSTR(file_path, '/archive/') > 0 OR INSTR(file_path, '\archive\') > 0 THEN 'archive'
  WHEN file_path IS NULL THEN 'inbox'
  ELSE 'inbox'
END
```

任选其一。**注意 `\` 在 SQL 字符串里要写成 `'\archive\'`，Python 字符串字面量里要写成 `r'\archive\'` 或 `'\\archive\\'`**——别再踩一次。

## 4. smoke test 用例

参考 `scripts/smoke_test_receiver.py` 现有风格（`app.test_client()` + `assert_status` + 线性 main()）。在已有 timeline 相关测试旁/后面追加，**不要新建测试文件**。

5 个用例最低要求：

```python
# === GET /timeline 用例 ===

# 1. 空库返回 entries=[]
#    新建一个 TemporaryDirectory + Flask app 子作用域，避免污染其他测试
#    body = assert_status(client.get("/timeline", query_string={"key": KEY}), 200, "timeline empty")
#    assert body["entries"] == []
#    assert body["total"] == 0

# 2. 创建 task → entries 含 kind=task event=created
#    POST /tasks {"title": "smoke task"}
#    body = client.get("/timeline?key=...&kinds=task")
#    matched = [e for e in body["entries"] if e["kind"]=="task" and e["event"]=="created"]
#    assert len(matched) == 1
#    assert matched[0]["title"] == "smoke task"

# 3. 完成该 task → 同时出现 kind=task event=completed（两条都在）
#    POST /tasks/<id>/done
#    body = client.get("/timeline?key=...&kinds=task")
#    events = sorted([e["event"] for e in body["entries"] if e["kind"]=="task" and e["id"]==task_id])
#    assert events == ["completed", "created"]

# 4. kinds 过滤生效
#    body = client.get("/timeline?key=...&kinds=memory")
#    assert all(e["kind"] == "memory" for e in body["entries"])
#    # 非法 kinds 返回 400
#    resp = client.get("/timeline?key=...&kinds=invalid")
#    assert resp.status_code == 400

# 5. 分页正常
#    （连续创建 5 个 items 后）
#    body = client.get("/timeline?key=...&page_size=2&page=1")
#    assert body["page_size"] == 2 and len(body["entries"]) == 2
#    assert body["total"] >= 5
#    assert body["total_pages"] == (body["total"] + 1) // 2
```

测试用例**可以共享一个 `app.test_client()` 实例**，按顺序累积数据；也可以独立。怎么舒服怎么写，关键是**用例顺序不能让后续测试假设错的状态**。

## 5. 验收清单

- [ ] `python -m compileall -q core` 通过
- [ ] `python scripts/smoke_test_receiver.py` 通过（含**新加的 5 个 timeline 用例**）
- [ ] 手动 curl 验：归档一个 item 后 timeline 该 item 的 `meta.storage` 是 `"archive"`（不是 `"inbox"`）

  ```bash
  # 假设 item id=1 存在
  curl -X POST -H "X-Axiom-Key: axiom123" http://127.0.0.1:5000/archive/1
  curl -H "X-Axiom-Key: axiom123" "http://127.0.0.1:5000/timeline?kinds=item" | grep storage
  # 期望看到 "storage":"archive"
  ```

## 6. 禁止事项

- 不要改 timeline 端点其他逻辑（kinds 过滤 / audit_log JOIN / 分页 / 排序）
- 不要重写整个 SQL 拼接框架——只动 item 那段 storage 表达式
- 不要在 smoke_test 里引入新的测试框架（pytest 等）——延续现有 assert 风格
- 不要把 `os.sep` 字符串拼到 SQL 字面量里——要么用参数化（推荐），要么用 INSTR 同时匹配两种分隔符

## 7. 提交风格

```
fix: 002a 补丁 — timeline 测试 + storage Windows 路径

- smoke_test_receiver 新增 5 个 /timeline 用例
- item 的 meta.storage 用跨平台路径匹配，不再硬编码 '/'
```
