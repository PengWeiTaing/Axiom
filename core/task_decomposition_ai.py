"""Reversible DeepSeek suggestions for one-level task decomposition."""
from __future__ import annotations

import json
import sqlite3
from datetime import datetime, timezone
from typing import Any

from core.config import (
    DEEPSEEK_API_KEY,
    DEEPSEEK_BASE_URL,
    DEEPSEEK_REASONING_MODEL,
)
from core.task_decomposition import (
    MAX_TASK_STEPS,
    TaskDecompositionLimitError,
    TaskDecompositionTaskNotFoundError,
    TaskDecompositionUnavailableError,
    normalize_task_steps,
    read_parent_task,
    read_subtask_rows,
)


TASK_DECOMPOSITION_SUGGESTION_SCHEMA_VERSION = "task.decomposition.suggestion.v1"


class TaskDecompositionAIUnavailableError(RuntimeError):
    pass


class TaskDecompositionAIResponseError(RuntimeError):
    pass


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


def _latest_weekly_review(conn: sqlite3.Connection) -> dict[str, Any] | None:
    row = conn.execute(
        """
        SELECT week_start, decomposition_fit, reflection, reviewed_at
        FROM weekly_reviews
        ORDER BY week_start DESC
        LIMIT 1
        """
    ).fetchone()
    return dict(row) if row is not None else None


def build_task_decomposition_context(
    conn: sqlite3.Connection,
    task_id: int,
) -> dict[str, Any]:
    task = conn.execute(
        """
        SELECT
            t.id, t.title, t.detail, t.status, t.priority,
            t.due_date, t.estimated_minutes, t.lifeline_id,
            l.name AS lifeline_name,
            m.id AS goal_id, m.content AS goal_title,
            m.category AS goal_category, m.status AS goal_status,
            gc.success_criteria, gc.target_date AS goal_target_date,
            gc.state AS goal_state
        FROM tasks t
        LEFT JOIN lifelines l ON l.id = t.lifeline_id
        LEFT JOIN memories m ON m.id = t.memory_id
        LEFT JOIN goal_commitments gc ON gc.memory_id = m.id
        WHERE t.id = ?
        """,
        (task_id,),
    ).fetchone()
    if task is None:
        raise TaskDecompositionTaskNotFoundError("行动不存在")
    if task["status"] != "todo":
        raise TaskDecompositionUnavailableError("只有尚未完成的行动可以生成拆解候选")
    if read_parent_task(conn, task_id) is not None:
        raise TaskDecompositionUnavailableError("步骤不能继续嵌套拆解")

    existing_rows = read_subtask_rows(conn, task_id)
    remaining = MAX_TASK_STEPS - len(existing_rows)
    if remaining <= 0:
        raise TaskDecompositionLimitError("这个行动已经达到五个步骤的上限")

    review = _latest_weekly_review(conn)
    feedback_rows = conn.execute(
        """
        SELECT fit_feedback, COUNT(*) AS count
        FROM context_action_outcomes
        WHERE fit_feedback IS NOT NULL
        GROUP BY fit_feedback
        """
    ).fetchall()
    outcome_feedback = {
        str(row["fit_feedback"]): int(row["count"])
        for row in feedback_rows
    }

    goal = None
    if task["goal_category"] == "goal" and task["goal_status"] == "confirmed":
        goal = {
            "id": task["goal_id"],
            "title": task["goal_title"],
            "success_criteria": task["success_criteria"],
            "target_date": task["goal_target_date"],
            "state": task["goal_state"] or "active",
        }

    basis: list[str] = []
    if task["detail"]:
        basis.append("行动详情")
    if task["due_date"]:
        basis.append("明确期限")
    if task["lifeline_name"]:
        basis.append(f"项目脉络「{task['lifeline_name']}」")
    if goal:
        basis.append(f"承诺「{goal['title']}」")
        if goal["success_criteria"]:
            basis.append("承诺完成定义")
    if review:
        basis.append("最近一次周复盘")

    richness = len(basis)
    confidence = "high" if richness >= 4 else "medium" if richness >= 2 else "low"
    return {
        "task": {
            "id": int(task["id"]),
            "title": task["title"],
            "detail": task["detail"],
            "priority": task["priority"],
            "due_date": task["due_date"],
            "estimated_minutes": task["estimated_minutes"],
            "lifeline_name": task["lifeline_name"],
        },
        "goal": goal,
        "existing_steps": [
            {
                "title": row["title"],
                "estimated_minutes": row["estimated_minutes"],
                "status": row["status"],
            }
            for row in existing_rows
        ],
        "capacity_remaining": remaining,
        "weekly_review": review,
        "outcome_feedback": outcome_feedback,
        "basis": basis or ["行动标题"],
        "confidence": confidence,
    }


def _review_guidance(review: dict[str, Any] | None) -> str:
    if not review:
        return "没有周复盘依据时，优先给出 2 到 4 个、每个约 15 到 30 分钟的步骤。"
    fit = review.get("decomposition_fit")
    if fit == "too_coarse":
        return "用户最近认为步骤偏大；这次优先拆得更容易启动，每步尽量不超过 25 分钟。"
    if fit == "too_fine":
        return "用户最近认为步骤偏碎；这次减少切换，优先给出 2 到 3 个较完整步骤。"
    return "用户最近认为拆解粒度合适；沿用相近的步骤数量和启动成本。"


def _build_prompt(context: dict[str, Any]) -> str:
    prompt_context = {
        "task": context["task"],
        "goal": context["goal"],
        "existing_steps": context["existing_steps"],
        "capacity_remaining": context["capacity_remaining"],
        "recent_weekly_review": context["weekly_review"],
        "recent_action_feedback_counts": context["outcome_feedback"],
    }
    return (
        "请为下面的 Axiom 行动生成一层、可直接开始的执行步骤候选。\n"
        "这些内容只是候选，用户确认前不会创建任务。\n"
        f"最多生成 {context['capacity_remaining']} 步，不要重复已有步骤，不要创建子树。\n"
        "每一步标题必须是明确动作，避免‘继续处理’‘推进一下’等空泛表达。\n"
        f"粒度约束：{_review_guidance(context['weekly_review'])}\n"
        "只返回 JSON 对象："
        '{"rationale":"不超过120字","steps":[{"title":"动作","estimated_minutes":15}]}。\n'
        f"上下文：{json.dumps(prompt_context, ensure_ascii=False, separators=(',', ':'))}"
    )


def _parse_suggestion(content: str, context: dict[str, Any]) -> dict[str, Any]:
    text = str(content or "").strip()
    if text.startswith("```"):
        lines = text.splitlines()
        text = "\n".join(lines[1:-1]).strip() if len(lines) >= 3 else text
    try:
        payload = json.loads(text)
    except json.JSONDecodeError as exc:
        raise TaskDecompositionAIResponseError("DeepSeek 没有返回可读取的步骤候选") from exc
    if not isinstance(payload, dict):
        raise TaskDecompositionAIResponseError("DeepSeek 返回的候选格式不正确")

    raw_steps = payload.get("steps")
    if not isinstance(raw_steps, list):
        raise TaskDecompositionAIResponseError("DeepSeek 返回的候选缺少 steps")
    raw_steps = raw_steps[: int(context["capacity_remaining"])]
    existing_titles = {
        str(step["title"]).strip().casefold()
        for step in context["existing_steps"]
    }
    raw_steps = [
        step for step in raw_steps
        if isinstance(step, (dict, str))
        and str(step if isinstance(step, str) else step.get("title", "")).strip().casefold()
        not in existing_titles
    ]
    if not raw_steps:
        raise TaskDecompositionAIResponseError("DeepSeek 没有给出新的可用步骤")
    try:
        steps = normalize_task_steps(raw_steps)
    except (ValueError, TypeError) as exc:
        raise TaskDecompositionAIResponseError(str(exc)) from exc

    rationale = str(payload.get("rationale", "")).strip()
    if not rationale:
        rationale = "根据当前行动、承诺脉络和最近复盘生成。"
    return {
        "schema_version": TASK_DECOMPOSITION_SUGGESTION_SCHEMA_VERSION,
        "model": DEEPSEEK_REASONING_MODEL,
        "thinking_mode": "enabled",
        "generated_at": _utc_now().isoformat(timespec="seconds"),
        "scope": "仅用于当前行动的一层拆解，确认后才创建步骤",
        "confidence": context["confidence"],
        "basis": context["basis"],
        "rationale": rationale[:320],
        "steps": steps,
    }


def generate_task_decomposition_suggestion(
    conn: sqlite3.Connection,
    task_id: int,
    *,
    client: Any | None = None,
) -> dict[str, Any]:
    if client is None and not DEEPSEEK_API_KEY:
        raise TaskDecompositionAIUnavailableError("未配置 DeepSeek API key")
    context = build_task_decomposition_context(conn, task_id)

    try:
        if client is None:
            import openai

            client = openai.OpenAI(
                api_key=DEEPSEEK_API_KEY,
                base_url=DEEPSEEK_BASE_URL,
            )
        response = client.chat.completions.create(
            model=DEEPSEEK_REASONING_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "你负责把较大的个人行动转成少量可执行步骤，并严格服从 JSON 输出约束。",
                },
                {"role": "user", "content": _build_prompt(context)},
            ],
            response_format={"type": "json_object"},
            max_tokens=1400,
            reasoning_effort="high",
            extra_body={"thinking": {"type": "enabled"}},
        )
        content = response.choices[0].message.content
    except TaskDecompositionAIResponseError:
        raise
    except Exception as exc:
        raise TaskDecompositionAIResponseError(f"DeepSeek 候选生成失败: {exc}") from exc
    return _parse_suggestion(content, context)
