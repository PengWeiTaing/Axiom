# 006 — smoke test：item → memory 升级流端到端

> 一句话目标：在 `smoke_test_receiver.py` 里加一段端到端用例，验证 B-001 / B-003 接口和 FK ON DELETE SET NULL 行为。

## 1. 背景 / Why

B-001 / B-002 / B-003 都加了新接口或字段，但 `scripts/smoke_test_receiver.py` 还不覆盖：
- 升级是否真的写入 `source_item_id`
- 详情接口是否真的返回 `source_item` / `derived_memories`
- item 删除后 `source_item_id` 是否被置空

VPS smoke 不通过 → 部署脚本会失败回滚。这是质量门。

> **依赖**：B-001 / B-003。B-002 单独验收（带 AI key 才能测），本任务**不**覆盖 suggest。

## 2. 要改 / 新建的文件

| 文件 | 改动 | 大致行数 |
|---|---|---|
| `scripts/smoke_test_receiver.py` | 在既有 main() 流程里插入一段 promote 测试块 | +60 |

**不要新建 `smoke_test_promote.py` 文件**——所有 receiver 相关 smoke 集中在 `smoke_test_receiver.py` 里。

## 3. 测试契约

### 3.1 插入位置

在 `main()` 函数里，第一段 `item_detail` 断言（约 `smoke_test_receiver.py:210` 附近）**之后**、下一段既有逻辑**之前**，插入新块。

DeepSeek 定位锚点：搜 `"item detail"` 的 `assert_status` 调用，紧跟它的 `assert item_detail["item"]["content"] == first_text` 后插入。

### 3.2 测试块伪代码

```python
# ============ B-001/B-003 verification: item -> memory promotion ============
first_item_id = first["item"]["id"]

# 3.2.1 promote with default content derivation
promote_default = assert_status(
    client.post(
        f"/item/{first_item_id}/promote-to-memory",
        headers={"X-Axiom-Key": "test-key"},
        json={"category": "fact"},
    ),
    201,
    "promote default",
)
mem_default = promote_default["memory"]
assert mem_default["category"] == "fact"
assert mem_default["status"] == "candidate"
assert mem_default["source_item_id"] == first_item_id
assert mem_default["source_text"] and first_text.startswith(mem_default["source_text"][:20])
assert mem_default["content"]  # derived

# 3.2.2 promote with explicit content
promote_explicit = assert_status(
    client.post(
        f"/item/{first_item_id}/promote-to-memory",
        headers={"X-Axiom-Key": "test-key"},
        json={"category": "goal", "content": "Explicit goal text", "detail": "with detail"},
    ),
    201,
    "promote explicit",
)
mem_explicit = promote_explicit["memory"]
assert mem_explicit["content"] == "Explicit goal text"
assert mem_explicit["detail"] == "with detail"
assert mem_explicit["source_item_id"] == first_item_id

# 3.2.3 invalid category
bad_cat = assert_status(
    client.post(
        f"/item/{first_item_id}/promote-to-memory",
        headers={"X-Axiom-Key": "test-key"},
        json={"category": "nonsense"},
    ),
    400,
    "promote bad category",
)
assert bad_cat["error"]["code"] == "invalid_category"

# 3.2.4 not found
not_found = assert_status(
    client.post(
        "/item/999999/promote-to-memory",
        headers={"X-Axiom-Key": "test-key"},
        json={"category": "fact"},
    ),
    404,
    "promote not found",
)
assert not_found["error"]["code"] == "item_not_found"

# 3.2.5 B-003: memory detail has source_item
mem_detail = assert_status(
    client.get(
        f"/memories/{mem_default['id']}",
        headers={"X-Axiom-Key": "test-key"},
    ),
    200,
    "memory detail source_item",
)
src = mem_detail["memory"]["source_item"]
assert src is not None
assert src["id"] == first_item_id
assert src["type"] == "text"
assert "type_label" in src
assert isinstance(src["snippet"], str)
assert "created_at" in src

# 3.2.6 B-003: memory without source has source_item == null
plain_mem = assert_status(
    client.post(
        "/memories",
        headers={"X-Axiom-Key": "test-key"},
        json={"category": "fact", "content": "no source memory"},
    ),
    201,
    "plain memory create",
)
plain_detail = assert_status(
    client.get(
        f"/memories/{plain_mem['memory']['id']}",
        headers={"X-Axiom-Key": "test-key"},
    ),
    200,
    "plain memory detail",
)
assert plain_detail["memory"]["source_item_id"] is None
assert plain_detail["memory"]["source_item"] is None

# 3.2.7 B-003: item detail has derived_memories
item_with_derived = assert_status(
    client.get(
        f"/item/{first_item_id}",
        headers={"X-Axiom-Key": "test-key"},
    ),
    200,
    "item detail derived_memories",
)
derived = item_with_derived["item"]["derived_memories"]
assert isinstance(derived, list)
assert len(derived) >= 2  # mem_default + mem_explicit
derived_ids = {m["id"] for m in derived}
assert mem_default["id"] in derived_ids
assert mem_explicit["id"] in derived_ids
for m in derived:
    assert {"id", "category", "category_label", "content", "status", "status_label", "created_at"} <= set(m.keys())

# 3.2.8 FK SET NULL: 用 throwaway item 验证，不动 first_item_id
# 既有 main() 后续步骤会继续用 first_item_id 做断言，绝不能在这里删它。
# 新建一条专用 item，promote → delete → 验证 source_item_id 自动置 null。
throwaway = assert_status(
    client.get(
        "/add",
        query_string={"key": "test-key", "text": "throwaway for FK test"},
    ),
    200,
    "throwaway add",
)
throw_id = throwaway["item"]["id"]
throw_mem_resp = assert_status(
    client.post(
        f"/item/{throw_id}/promote-to-memory",
        headers={"X-Axiom-Key": "test-key"},
        json={"category": "fact"},
    ),
    201,
    "throwaway promote",
)
throw_mem_id = throw_mem_resp["memory"]["id"]
assert_status(
    client.delete(
        f"/item/{throw_id}",
        headers={"X-Axiom-Key": "test-key"},
    ),
    200,
    "throwaway delete",
)
after = assert_status(
    client.get(
        f"/memories/{throw_mem_id}",
        headers={"X-Axiom-Key": "test-key"},
    ),
    200,
    "throwaway memory after delete",
)
assert after["memory"]["source_item_id"] is None
assert after["memory"]["source_item"] is None
# ============ end B-001/B-003 verification ============
```

### 3.3 关键说明

1. **header vs query key**：既有 smoke 偶尔用 `query_string={"key": "test-key"}`，本块统一用 `headers={"X-Axiom-Key": "test-key"}`，跟现代前端调用方式一致。**例外**：`GET /add` 既有 smoke 用 query string，本块 3.2.8 的 throwaway add 沿用 query 风格，跟 main() 第 199 行附近一致；不要把它改成 header 形式。
2. **不要删 first_item_id**：3.2.8 用专用 throwaway item 跑 FK SET NULL，**严禁**在本测试块里删 first_item_id。既有 main() 后续步骤会继续依赖 first_item_id（比如 update / archive / restore），破坏它会让下游断言成片失败。
3. **first_item_id 在本块还活着**：3.2.7 的断言 `len(derived) >= 2` 在 throwaway 流程之后也仍然成立，因为 throwaway 的 memory 派生自 throw_id 而不是 first_item_id。
4. **错误响应 schema**：`assert_status` 返回的是 body dict。`bad_cat["error"]["code"]` 假设了 `error_response` 输出形如 `{"ok": false, "error": {"code": ..., "message": ...}}`。如果 smoke 报错说 `body` 里没有 `error` 键，DeepSeek **不要改测试**，去看 `error_response` 实际格式（在 `_common.py` 里）然后用真实键名。**不要改 `error_response`**。

## 4. 验收清单

- [ ] `python -m compileall -q scripts` 通过
- [ ] `python scripts/smoke_test_receiver.py` 跑通（包括既有所有断言 + 新增 promote 块）
- [ ] 没有遗留 `# TODO` / `print()` 调试语句
- [ ] 不破坏既有 smoke：跑 `python scripts/smoke_test_inbox_processing.py` 和 `python scripts/smoke_test_web_app.py` 也要通过

## 5. 禁止事项

- 不要新建 smoke 文件
- 不要把测试块塞到 main() 之外的函数里（保持 main() 内顺序执行的风格）
- 不要 mock 任何后端逻辑
- 不要在测试里调 AI / DeepSeek
- 不要修改 `assert_status` 的签名
- 不要给测试加 `try/except`（让它直接 raise，stack trace 是诊断信息）
