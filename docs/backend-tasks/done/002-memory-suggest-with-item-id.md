# 002 — /memories/suggest 升级：返回 source_item_id

> 一句话目标：让 LLM 出的 memory 建议清单**带上 source item id**，前端能一键"采纳建议"并保留来源链。

## 1. 背景 / Why

`POST /memories/suggest`（`core/routes/memories.py:245`）当前把最近 7 天的 items 喂给 LLM，让它输出 `category|content` 行。问题是：

- LLM 拿到的上下文是 items 列表，但响应里**丢失了"这条建议来自哪条 item"**。
- 前端只能拿到 `[{category, content}]`，无法自动把 `source_item_id` 写进 memories 表，导致即使采纳建议也是"凭空"的 memory。

本任务让 LLM 显式输出 item_id，后端解析并校验，最终响应里每条建议都带 `source_item_id`（可能为 null）。

## 2. 要改 / 新建的文件

| 文件 | 改动 | 大致行数 |
|---|---|---|
| `core/routes/memories.py` | 修改 `suggest_memories()` 的 prompt 与解析逻辑 | ~+15/-5 |

## 3. 接口契约

### 端点

```
POST /memories/suggest
```

（路径不变。）

### 响应（成功）

> 项目里 `ok_response(payload)` 把 payload 扁平展开到 `{"ok": true, ...payload}`。所以传 `{"suggestions": [...]}` 后实际响应是：

```json
{
  "ok": true,
  "suggestions": [
    {
      "category": "fact",
      "content": "用户偏好早上 6 点跑步",
      "source_item_id": 42
    },
    {
      "category": "preference",
      "content": "讨厌带肉桂的咖啡",
      "source_item_id": null
    }
  ]
}
```

- `source_item_id` 是 `int | null`，类型必须明确。
- 当 LLM 输出格式不合规、解析失败、或 id 不在本次喂入的 items 范围内 → `source_item_id = null`。
- 当 LLM 输出 `NONE` → `suggestions = []`（保持现状）。
- 当无 AI key → `503 ai_unavailable`（保持现状）。

### Prompt 调整

把现有 prompt 改为：

```
你是一个个人知识助手。请从以下用户记录中提取可以作为长期记忆的信息。
每条建议一行，格式为：item_id|category|content
- item_id 是上下文行最前面 [id=N] 里的 N，必须照抄；如果一条建议综合多条记录无法归到单一来源，写 0。
- category 可选：fact（事实）、preference（偏好）、goal（目标）、relationship（人际关系）、event（事件）
- content 是记忆正文，简短直接，不要带格式符。
只提取稳定、值得长期保留的信息，不要提取临时或琐碎的内容。
最多提取 5 条。如果没有值得长期记忆的内容，输出 NONE。
```

上下文行格式：

```
- [id=42] [text] 用户今天又凌晨四点睡了
- [id=43] [image] dinner.jpg
```

> 注意：原来是 `- [{type}] {text}`，现在前面**多了一段 `[id=N]`**。`type` 段保持原样。

### 解析逻辑

每行按 `|` 分割成最多 3 段：

1. 第 0 段 trim 后 → `int`，失败或值 = 0 或不在本次喂入的 id 集合里 → `source_item_id = None`
2. 第 1 段 → category，必须 ∈ `MEMORY_CATEGORIES`，否则跳过整条
3. 第 2 段 → content，trim 后非空，否则跳过整条

为了向后兼容，**如果一行只有 `|` 分成 2 段**（说明 LLM 没按新格式输出），按旧逻辑解析（category|content），`source_item_id = None`。

### 副作用

- **不写库**：本端点只是建议，不动 memories 表。
- 不写审计日志。

## 4. 验收清单

- [ ] `python -m compileall -q core` 通过
- [ ] 无 AI key 时调用 `POST /memories/suggest` → 503 `ai_unavailable`（保持现状）
- [ ] 配 AI key 时调用 → 响应字段含 `source_item_id`，类型为 int 或 null
- [ ] 手工伪造 LLM 输出测解析：
  - `1|fact|abc` → `{source_item_id: 1, category: fact, content: abc}`（前提 id=1 在本次喂入列表）
  - `999|fact|abc` （999 不在喂入列表）→ `{source_item_id: null, category: fact, content: abc}`
  - `0|fact|abc` → `{source_item_id: null, category: fact, content: abc}`
  - `fact|abc`（旧格式）→ `{source_item_id: null, category: fact, content: abc}`
  - `bad|xxx|yyy`（category 非法）→ 整条丢弃
  - `NONE` → suggestions = []
- [ ] `python scripts/smoke_test_receiver.py` 通过

## 5. 禁止事项

- 不要在本端点里"顺手"写库（这是建议接口，不能产生副作用）
- 不要改 `MEMORY_CATEGORIES` / `MEMORY_STATUSES` 常量
- 不要改其他 memory 端点
- 不要把 prompt 文本提取成模块顶层常量（保持局部）
- 不要为这条接口加分页 / 缓存 / 重试
