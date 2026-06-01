"""Learning Board v0.1 — AI 四段生成流水线。

planner → widget_builder → layout_planner → validator
"""
from __future__ import annotations

import hashlib
import json
import sqlite3
import uuid
from typing import Any

from core._common import (
    DEEPSEEK_API_KEY, DEEPSEEK_MODEL, DEEPSEEK_BASE_URL,
    get_db_connection, logger,
)
from core.boards.mastery import now_iso
from core.boards.widget_spec import (
    ALLOWED_WIDGET_TYPES, validate_board_widgets,
)

GENERATION_TEMPLATE_VERSION = "learning_board.v0.1.0"

PLANNER_SYSTEM = """你是 Axiom Learning Board 课程规划器。
你只能输出合法 JSON。禁止输出 HTML、Markdown、脚本、iframe、URL embed、解释性文本。

输入包含用户学习目标、现有 Axiom 记忆/任务/决策/主线数据、以及允许的 widget 类型列表。

输出一个课程规划 JSON：
{
  "concept_graph": {
    "nodes": [{"id": string, "label": string, "detail": string, "prerequisites": [string]}],
    "clusters": [{"id": string, "label": string, "concept_ids": [string]}]
  },
  "widget_plan": [{"cluster_id": string, "widget_type": string, "title": string, "rationale": string}],
  "review_hints": [{"concept_id": string, "reason": string, "priority": int}]
}

Hard rules:
- additionalProperties=false
- 概念节点数不超过 12 个
- widget_plan 不超过 8 个
- widget_type 只能从允许列表中选择
"""

BUILDER_SYSTEM = """你是 Axiom Learning Board widget builder。
根据课程规划生成具体的 widget spec。你只能输出合法 JSON。

输出格式：
{
  "widgets": [
    {
      "id": string,
      "type": "concept_map" | "function_visualizer" | "quiz_card" | "example_card",
      "spec_version": "1.0.0",
      "title": string,
      "input": { ... },
      "state": {},
      "security": "pure_client",
      "writeback": ["mastery", "review"],
      "provenance": {"generation_id": string, "source_refs": [string], "template_version": "1.0.0"},
      "ui": {"size_family": "M"}
    }
  ]
}

Hard rules:
- 每个 widget 必须带 spec_version="1.0.0"
- function_visualizer 只能使用安全表达式 DSL: + - * / ^ sin cos tan sqrt abs exp log x 和用户参数
- quiz_card 必须给出 concept_refs 和 deterministic scoring
- example_card 必须包含 steps 和 common_errors
- concept_map 必须给出 prerequisites 或 relation labels
- 禁止输出 HTML、script、iframe URL、任意外链
- 禁止使用 additionalProperties
"""

LAYOUT_SYSTEM = """你是 Axiom Learning Board 布局规划器。
根据 widget 列表生成白板几何布局。你只能输出合法 JSON。

输出格式：
{
  "nodes": [
    {
      "widget_id": string,
      "x": number,
      "y": number,
      "w": number,
      "h": number,
      "size_family": "S" | "M" | "L" | "XL"
    }
  ]
}

Hard rules:
- 大尺寸 widget (concept_map, function_visualizer) 放左侧/上侧
- 小尺寸 widget (quiz_card, example_card) 排右侧/下侧
- 间距至少 24px
- 总画布控制在 1400x1000 内
- 优先桌面端布局
"""


def _build_input_snapshot(goal: str, source_refs: list[dict], max_widgets: int) -> str:
    payload = json.dumps(
        {"goal": goal, "source_refs": source_refs, "max_widgets": max_widgets},
        ensure_ascii=False, sort_keys=True,
    )
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()[:16]


def _call_llm(system: str, user_prompt: str, temperature: float = 0.1) -> str:
    import openai
    if not DEEPSEEK_API_KEY:
        raise RuntimeError("AXIOM_OPENAI_API_KEY 或 DEEPSEEK_API_KEY 未配置")

    client = openai.OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)
    resp = client.chat.completions.create(
        model=DEEPSEEK_MODEL,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user_prompt},
        ],
        temperature=temperature,
        response_format={"type": "json_object"},
    )
    return resp.choices[0].message.content or "{}"


def _parse_json(raw: str, label: str) -> dict[str, Any]:
    try:
        return json.loads(raw)
    except json.JSONDecodeError as exc:
        logger.exception("failed to parse %s output", label)
        raise RuntimeError(f"{label} 返回了非 JSON 内容: {exc}") from exc


def _gather_context(source_refs: list[dict[str, str]]) -> dict[str, Any]:
    """从 Axiom 现有对象中收集生成上下文。"""
    ctx: dict[str, Any] = {
        "memories": [],
        "tasks": [],
        "decisions": [],
        "lifelines": [],
    }

    conn = get_db_connection()
    try:
        for ref in source_refs:
            kind = ref.get("kind", "")
            rid = ref.get("id", "")
            if kind == "memory" and rid:
                row = conn.execute(
                    "SELECT id, category, content, detail, status FROM memories WHERE id = ?", (rid,)
                ).fetchone()
                if row:
                    ctx["memories"].append(dict(row))
            elif kind == "task" and rid:
                row = conn.execute(
                    "SELECT id, title, detail, status, priority, due_date FROM tasks WHERE id = ?", (rid,)
                ).fetchone()
                if row:
                    ctx["tasks"].append(dict(row))
            elif kind == "decision" and rid:
                row = conn.execute(
                    "SELECT id, title, decision, reasoning, status FROM decisions WHERE id = ?", (rid,)
                ).fetchone()
                if row:
                    ctx["decisions"].append(dict(row))
            elif kind == "lifeline" and rid:
                row = conn.execute(
                    "SELECT id, name FROM lifelines WHERE id = ?", (rid,)
                ).fetchone()
                if row:
                    ctx["lifelines"].append(dict(row))
    finally:
        conn.close()
    return ctx


def generate_board(
    goal: str,
    *,
    source_refs: list[dict[str, str]] | None = None,
    allowed_widget_types: list[str] | None = None,
    max_widgets: int = 6,
    model_id: str = "",
    temperature: float = 0.1,
    seed: int | None = None,
) -> dict[str, Any]:
    """四段式生成：planner → builder → layout → validator。"""
    if not DEEPSEEK_API_KEY:
        raise RuntimeError("AI key 未配置，无法生成白板")

    source_refs = source_refs or []
    allowed = allowed_widget_types or list(ALLOWED_WIDGET_TYPES)
    allowed = [t for t in allowed if t in ALLOWED_WIDGET_TYPES]
    if not allowed:
        allowed = list(ALLOWED_WIDGET_TYPES)

    effective_model = model_id or DEEPSEEK_MODEL
    snapshot = _build_input_snapshot(goal, source_refs, max_widgets)
    context = _gather_context(source_refs)

    # ---- Step 1: Planner ----
    planner_prompt = json.dumps({
        "step": "plan",
        "goal": goal,
        "context": context,
        "allowed_widget_types": allowed,
        "max_widgets": max_widgets,
    }, ensure_ascii=False)

    planner_raw = _call_llm(PLANNER_SYSTEM, planner_prompt, temperature)
    planner_output = _parse_json(planner_raw, "planner")

    # ---- Step 2: Widget Builder ----
    builder_prompt = json.dumps({
        "step": "build",
        "goal": goal,
        "plan": planner_output,
        "allowed_widget_types": allowed,
        "max_widgets": max_widgets,
    }, ensure_ascii=False)

    builder_raw = _call_llm(BUILDER_SYSTEM, builder_prompt, temperature)
    builder_output = _parse_json(builder_raw, "builder")
    widgets = builder_output.get("widgets", [])

    # ---- Step 3: Layout Planner ----
    layout_prompt = json.dumps({
        "step": "layout",
        "widgets": [{"id": w.get("id"), "type": w.get("type"), "title": w.get("title")}
                     for w in widgets],
    }, ensure_ascii=False)

    layout_raw = _call_llm(LAYOUT_SYSTEM, layout_prompt, temperature)
    layout_output = _parse_json(layout_raw, "layout")
    layout_nodes = layout_output.get("nodes", [])

    # ---- Step 4: Validator ----
    validation_issues = validate_board_widgets(widgets)

    gen_id = f"gen_{uuid.uuid4().hex[:12]}"
    board_id = f"board_{uuid.uuid4().hex[:12]}"

    # 补全 widget ID
    for i, widget in enumerate(widgets):
        if not widget.get("id"):
            widget["id"] = f"widget_{board_id}_{i}"
        widget["provenance"] = widget.get("provenance", {})
        widget["provenance"]["generation_id"] = gen_id

    board = {
        "id": board_id,
        "title": planner_output.get("title", goal[:80]),
        "source_type": source_refs[0]["kind"] if source_refs else "manual",
        "source_ref_id": source_refs[0]["id"] if source_refs else None,
        "status": "ready",
        "board_version": 1,
        "generation_id": gen_id,
    }

    # 处理布局
    nodes = []
    node_widget_ids = {n.get("widget_id", "") for n in layout_nodes}
    for widget in widgets:
        wid = widget["id"]
        if wid not in node_widget_ids:
            nodes.append({
                "widget_id": wid,
                "x": 48,
                "y": 48 + len(nodes) * 340,
                "w": 520,
                "h": 320,
                "size_family": widget.get("ui", {}).get("size_family", "M"),
            })
        else:
            for ln in layout_nodes:
                if ln.get("widget_id") == wid:
                    nodes.append(ln)
                    break

    # 生成记录
    validator_report = {
        "valid": len(validation_issues) == 0,
        "issues": validation_issues,
    }

    generation_record = {
        "id": gen_id,
        "board_id": board_id,
        "prompt_template_version": GENERATION_TEMPLATE_VERSION,
        "model_id": effective_model,
        "seed": seed,
        "temperature": temperature,
        "input_snapshot_hash": snapshot,
        "raw_output": json.dumps({
            "planner": planner_output,
            "builder": builder_output,
            "layout": layout_output,
        }, ensure_ascii=False),
        "normalized_output": json.dumps({
            "board": board,
            "widgets": widgets,
            "nodes": nodes,
        }, ensure_ascii=False),
        "validator_report_json": json.dumps(validator_report, ensure_ascii=False),
    }

    return {
        "board": board,
        "widgets": widgets,
        "nodes": nodes,
        "generation": generation_record,
        "validation": validator_report,
    }
