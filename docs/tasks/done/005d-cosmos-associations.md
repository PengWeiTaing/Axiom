# 005d — Cosmos 关联自动生成（规则初筛 + LLM 终判）

> 一句话：让 Atlas 的 associations 不再只是空表。规则引擎扫出候选 entity 对，LLM 判定关系类型，写入 associations 表。

## 1. 范围

新建 1 个 POST endpoint + 1 个 CLI 脚本（供 automation_jobs）+ 1 个 smoke test + 1 个 AUTOMATION_JOBS 条目。**不做**前端 UI、不做 association 编辑/删除、不做增量调度。

## 2. 产品边界

- 关联生成只覆盖**已挂载 lifeline 的 entity**（`WHERE lifeline_id IS NOT NULL`）。未挂载的条目不参与关联分析。
- 生成结果全部 `status='pending'`，由人工在后续版本确认/拒绝。
- **不覆盖已有 association**：如果 entity 对已经有一条 association（双向检查），跳过不再生成。

## 3. 架构决策

两阶段流水线：

```
四表 entity 聚合 → [规则初筛] → 候选对列表 → [LLM 分类] → INSERT associations
```

**阶段 1 — 规则初筛**（纯 Python，零 API 成本）：
- 按 lifeline 分组，组内生成所有 entity 对
- 计算候选分数：lifeline 共用 + 时间邻接 + 关键词重叠
- 过滤 ≤ 阈值、排序、截断 top K

**阶段 2 — LLM 分类**（DeepSeek API，复用 `DEEPSEEK_API_KEY` / `DEEPSEEK_MODEL` / `DEEPSEEK_BASE_URL`）：
- 候选对分批（每批 20 对）
- LLM 对每对判定：`relation_type` + `confidence` + `evidence` excerpt
- 只保留 relation_type ≠ `none` 的结果写入 associations

## 4. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `core/routes/cosmos_associations.py` | **新建** 阶段 1 候选生成 + 阶段 2 LLM 调用 + POST endpoint | ~200 行 |
| `scripts/generate_cosmos_associations.py` | **新建** CLI 薄壳，供 automation_jobs 调用 | ~30 行 |
| `core/receiver.py` | import + `register_cosmos_associations(app)` | +2 行 |
| `core/_common.py` | `AUTOMATION_JOBS` 加一条 `cosmos_assoc_generate` | +13 行 |
| `scripts/smoke_test_cosmos_assoc.py` | **新建** 冒烟测试 | ~100 行 |

## 5. 阶段 1 — 规则初筛

### 5.1 文本提取

每个 entity 提取 `display_text` 和 `created_at`，写一个通用函数：

```python
def extract_entity_text(row: dict, kind: str) -> str:
    """从四种 entity 行提取搜索文本。"""
    if kind == "item":
        return (row.get("content") or "") + " " + (row.get("original_name") or "")
    elif kind == "task":
        return (row.get("title") or "") + " " + (row.get("detail") or "")
    elif kind == "memory":
        return row.get("content") or ""
    elif kind == "decision":
        return (row.get("title") or "") + " " + (row.get("context") or "") + " " + (row.get("decision") or "")
    return ""
```

entity 聚合用与 `/cosmos` 相同的四表 UNION 模式。生成的 `kind` 用单数（item/task/memory/decision），复用 `core/routes/cosmos.py` 里的 `PREFIX_TO_TABLE`。

### 5.2 关键词重叠分（bigrams，不依赖 jieba）

```python
def bigrams(text: str) -> set[str]:
    """提取 2-gram 集合。中文走字符二元组，ASCII 词走空格分词后二元组。"""
    # 把连续 ASCII 视为一个 token，非 ASCII 字符逐字处理
    tokens: list[str] = []
    buf = ""
    for ch in text:
        if ch.isascii() and ch.isalpha():
            buf += ch.lower()
        else:
            if buf:
                tokens.append(buf)
                buf = ""
            if not ch.isspace():
                tokens.append(ch)
    if buf:
        tokens.append(buf)
    # 生成 bigrams
    result: set[str] = set()
    for i in range(len(tokens) - 1):
        result.add(tokens[i] + "\x00" + tokens[i + 1])
    return result


def bigram_similarity(text_a: str, text_b: str) -> float:
    a = bigrams(text_a)
    b = bigrams(text_b)
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)
```

### 5.3 候选分数公式

```python
def candidate_score(entity_a, entity_b, text_a, text_b):
    score = 0.3  # 同 lifeline 基分（只有同组才进候选）

    # 时间邻接
    try:
        t_a = datetime.fromisoformat(entity_a["created_at"])
        t_b = datetime.fromisoformat(entity_b["created_at"])
        delta_hours = abs((t_a - t_b).total_seconds()) / 3600
        if delta_hours <= 24:
            score += 0.3
        elif delta_hours <= 168:  # 7 天
            score += 0.15
    except (ValueError, TypeError):
        pass

    # 关键词重叠
    sim = bigram_similarity(text_a, text_b)
    score += sim * 0.4

    return score
```

阈值 **≥ 0.5** 进入候选。每个 lifeline 最多取前 **30** 对（按分数降序）。

### 5.4 去重

进入候选生成前，把已有 associations 加载到一个 set：

```python
existing = set()
for r in conn.execute("SELECT from_kind, from_id, to_kind, to_id FROM associations").fetchall():
    existing.add((r["from_kind"], str(r["from_id"]), r["to_kind"], str(r["to_id"])))
    existing.add((r["to_kind"], str(r["to_id"]), r["from_kind"], str(r["from_id"])))
```

候选对 `(kind_a, id_a, kind_b, id_b)` 在 existing 里的跳过。

## 6. 阶段 2 — LLM 分类

### 6.1 批次构建

候选对列表按分数降序，每 20 对一批。每批构造一个 user message：

```
## Entity Pair 1
A: [task] 晨跑 5km (created: 2026-05-20)
B: [memory] 夜间容易饿 (created: 2026-05-18)

## Entity Pair 2
...
```

system prompt：

```
你是个人知识图谱的关联分类器。对每对 entity，判断关系类型：
- co_occurrence: 同主题/同场景/同时间段
- causal: A 导致/触发了 B（或反过来）
- tension: 矛盾、竞争、冲突
- derived_from: B 从 A 衍生（任务从记忆中产生、决策基于某条笔记等）
- none: 无明显关联

只返回 JSON，格式：
[{"pair_index": 1, "relation_type": "...", "confidence": 0.75, "evidence": "..."}, ...]
confidence 范围 0-1。evidence 是 1 句简短摘录（≤40 字），说明判断依据。
如果 relation_type 是 none，confidence 设 0，evidence 留空字符串。
不要返回任何非 JSON 文本。
```

### 6.2 API 调用

复用 `core/routes/ai.py` 的模式：

```python
import openai
client = openai.OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)
resp = client.chat.completions.create(
    model=DEEPSEEK_MODEL,
    messages=[
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": batch_prompt},
    ],
    max_tokens=2000,
    temperature=0.3,
)
raw = resp.choices[0].message.content.strip()
# 去掉可能的 markdown code fence
if raw.startswith("```"):
    raw = raw.split("\n", 1)[-1].rsplit("\n```", 1)[0]
results = json.loads(raw)
```

API 调用失败时**不重试**（LLM 不可用本质上是配置问题），返回已有结果 + error 字段说明哪批失败了。

### 6.3 写入

对 LLM 返回中 `relation_type != "none"` 的结果：

```python
import uuid
conn.execute(
    "INSERT INTO associations (id, from_kind, from_id, to_kind, to_id, relation_type, confidence, status, evidence, created_at) "
    "VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)",
    (
        str(uuid.uuid4())[:8],
        kind_a, str(id_a), kind_b, str(id_b),
        rel_type, confidence,
        json.dumps([{"type": "llm_judgment", "excerpt": evidence, "weight": confidence}]),
        datetime.now().isoformat(),
    ),
)
```

**注意**：`from_id` / `to_id` 列存实体原始 ID（数字转字符串），**不是**带前缀的 `task:42`。前缀拼接是 `/cosmos` endpoint 输出层的职责（见 005c 的 entity_id 协议）。association 的 `from_kind` + `from_id` 组合已唯一定位实体。

## 7. POST /cosmos/associations/generate 契约

**请求**：`POST /cosmos/associations/generate` + `X-Axiom-Key`

可选 query 参数：

| 参数 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `lifeline_id` | string | 无（全量） | 只处理指定 lifeline（raw ID，如 `L1`） |
| `max_candidates` | int | 50 | 送入 LLM 的最大候选对数量 |
| `dry_run` | bool | false | `true` 时跳过 LLM，只返回候选对列表 |

**返回**：成功 200

```json
{
  "ok": true,
  "dry_run": false,
  "candidates_found": 45,
  "batches_sent": 3,
  "associations_generated": 18,
  "skipped_existing": 5,
  "associations": [
    {
      "id": "a1b2c3d4",
      "from": "task:3",
      "to": "memory:7",
      "relation_type": "causal",
      "confidence": 0.82,
      "status": "pending",
      "evidence": [{"type": "llm_judgment", "excerpt": "任务目标与记忆内容高度相关", "weight": 0.82}]
    }
  ]
}
```

`associations` 数组里的 `from`/`to` 走 `entity_id()` 前缀协议（跟 `/cosmos` 输出一致）。

**错误**：仅 403（无 key）、503（未配置 AI key 时调用非 dry_run）。规则阶段无需 AI key。

### 7.1 dry_run 模式

跳过 LLM 阶段，返回候选对详情（含分数），供调试规则用：

```json
{
  "ok": true,
  "dry_run": true,
  "candidates_found": 45,
  "candidates": [
    {
      "entity_a": {"id": "task:3", "kind": "task", "title": "晨跑 5km"},
      "entity_b": {"id": "memory:7", "kind": "memory", "title": "夜间容易饿"},
      "score": 0.72,
      "score_breakdown": {"lifeline": 0.3, "temporal": 0.3, "keyword": 0.12}
    }
  ]
}
```

## 8. CLI 脚本（automation_jobs 薄壳）

`scripts/generate_cosmos_associations.py` 只做三件事：import Flask app + 调核心函数 + 打印 JSON 结果到 stdout。

```python
"""CLI wrapper — 供 automation_jobs 调用."""
import sys, os, json
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from core._common import app, init_app_storage
from core.routes.cosmos_associations import generate_associations

init_app_storage()
result = generate_associations(max_candidates=100)
print(json.dumps(result, ensure_ascii=False, indent=2))
```

核心逻辑封装在 `cosmos_associations.py` 的 `generate_associations(lifeline_id=None, max_candidates=50, dry_run=False)` 函数里，endpoint 和 CLI 脚本都调它。

## 9. AUTOMATION_JOBS 条目

在 `core/_common.py` 的 `AUTOMATION_JOBS` dict 末尾加：

```python
"cosmos_assoc_generate": {
    "label": "生成 Cosmos 关联",
    "description": "扫描已挂载 lifeline 的 entity，规则初筛 + LLM 判定关联类型，写入 associations 表。",
    "script_name": "generate_cosmos_associations.py",
    "artifact_group": "cosmos",
    "artifact_window": None,
    "artifact_mode": None,
    "build_args": lambda run_date: [],
    "manual_enabled": True,
    "requires_openai": False,
    "timeout_seconds": 180,
},
```

## 10. 验收

```bash
# 1. 重启 backend
python -m core.receiver

# 2. dry_run 验证规则引擎（无需 AI key）
curl -X POST -H "X-Axiom-Key: $AXIOM_SECRET_KEY" \
  "http://127.0.0.1:5000/cosmos/associations/generate?dry_run=true" \
  | python -m json.tool | head -30

# 3. 真实生成（需要 AI key）
curl -X POST -H "X-Axiom-Key: $AXIOM_SECRET_KEY" \
  "http://127.0.0.1:5000/cosmos/associations/generate?max_candidates=10" \
  | python -m json.tool

# 4. 验证生成的关联出现在 /cosmos
curl -H "X-Axiom-Key: $AXIOM_SECRET_KEY" http://127.0.0.1:5000/cosmos \
  | python -m json.tool | grep associations -A 20

# 5. 冒烟测试
python scripts/smoke_test_cosmos_assoc.py
# 期望: "all checks passed (N tests)"

# 6. 前端 build
cd frontend && npm run build
```

**smoke test 必须覆盖**：
- 无 key → 403
- dry_run → 200 + 返回候选对列表（不调 LLM）
- 种子 lifeline + 2 entity → 候选对生成正确（score_breakdown 三个分量都有）
- 已有 association 的去重 → `skipped_existing` = 1
- 没标 lifeline_id 的 entity 不出现在候选对中
- 未配置 AI key 时非 dry_run → 503

## 11. 禁止事项

- 不引入 jieba 或任何新依赖（bigram 用纯 Python）
- 不改 `/cosmos` 的返回结构
- 不改前端 Cosmos 渲染（layout/scene/camera）
- 不在本任务做 association 的手动编辑/删除
- 不重试失败的 LLM 调用（fail-fast）
- 不把 `from_id`/`to_id` 存成带前缀格式（前缀是 `/cosmos` 输出层的职责）
- entity 文本提取不要查 4 次 `PRAGMA table_info`——复用已知列名
- 候选生成不要跨 lifeline（v0.1 只做组内关联）

## 12. 提交风格

```
add: 005d — Cosmos 关联自动生成（规则初筛 + LLM 分类）

- 规则引擎：同 lifeline 分组 + 时间邻接 + bigram 关键词重叠打分
- LLM 批量分类：DeepSeek API 判定 co_occurrence/causal/tension/derived_from
- POST /cosmos/associations/generate + dry_run 调试模式
- CLI 薄壳 + AUTOMATION_JOBS 条目
- smoke test 覆盖 403/dry_run/去重/503
```

PR 描述里贴：build 输出末尾、curl 返回、smoke test 通过行。
