"""Outcome evidence and feedback for actions completed from Axiom's current context."""
from __future__ import annotations

import json
from typing import Any

from core.audit import write_audit_log
from core.context_engine import (
    CONTEXT_FIT_FEEDBACK,
    MAX_CONTEXT_ACTIONS,
    build_now_context,
)
from core.database import get_db_connection
from core.items import utc_now
from core.task_decomposition import has_open_subtasks


class ContextTaskNotFoundError(LookupError):
    pass


class ContextActionUnavailableError(RuntimeError):
    pass


class ContextOutcomeNotFoundError(LookupError):
    pass


def _outcome_payload(row) -> dict[str, Any]:
    feedback_labels = {
        "right": "正合适",
        "too_heavy": "比预期费力",
        "wrong_time": "时机不对",
    }
    return {
        "id": int(row["id"]),
        "task_id": row["task_id"],
        "task_title": row["task_title"],
        "outcome": row["outcome"],
        "fit_feedback": row["fit_feedback"],
        "fit_feedback_label": feedback_labels.get(row["fit_feedback"]),
        "schema_version": row["schema_version"],
        "reason_code": row["reason_code"],
        "reason_label": row["reason_label"],
        "lifeline_id": row["lifeline_id"],
        "estimated_minutes": row["estimated_minutes"],
        "created_at": row["created_at"],
        "feedback_at": row["feedback_at"],
    }


def complete_current_action(task_id: int) -> dict[str, Any]:
    context = build_now_context(limit=MAX_CONTEXT_ACTIONS)
    actions = ([context["focus"]] if context["focus"] else []) + context["alternatives"]
    action = next(
        (entry for entry in actions if int(entry["task"]["id"]) == int(task_id)),
        None,
    )
    if action is None:
        conn = get_db_connection()
        try:
            row = conn.execute("SELECT status FROM tasks WHERE id = ?", (task_id,)).fetchone()
        finally:
            conn.close()
        if row is None:
            raise ContextTaskNotFoundError("任务不存在")
        raise ContextActionUnavailableError("任务已不在当前推荐上下文中，请刷新后再试")

    rank = actions.index(action) + 1
    snapshot = {
        "schema_version": context["schema_version"],
        "generated_at": context["generated_at"],
        "date": context["date"],
        "rank": rank,
        "score": action["score"],
        "reason": action["reason"],
        "cues": action["cues"],
        "factors": action["factors"],
        "signals": context["signals"],
        "learning": context["learning"],
    }
    current_time = utc_now().isoformat(timespec="seconds")

    conn = get_db_connection()
    try:
        row = conn.execute(
            """
            SELECT id, title, status, lifeline_id, estimated_minutes
            FROM tasks
            WHERE id = ?
            """,
            (task_id,),
        ).fetchone()
        if row is None:
            raise ContextTaskNotFoundError("任务不存在")
        if row["status"] != "todo":
            raise ContextActionUnavailableError("任务状态已经变化，请刷新后再试")
        if has_open_subtasks(conn, task_id):
            raise ContextActionUnavailableError("这个行动还有未完成步骤，请先推进具体步骤")

        conn.execute(
            """
            UPDATE tasks
            SET status = 'done', completed_at = ?, updated_at = ?
            WHERE id = ? AND status = 'todo'
            """,
            (current_time, current_time, task_id),
        )
        cursor = conn.execute(
            """
            INSERT INTO context_action_outcomes (
                task_id, task_title, outcome, schema_version,
                reason_code, reason_label, score, lifeline_id,
                estimated_minutes, snapshot_json, created_at
            ) VALUES (?, ?, 'completed', ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                task_id,
                row["title"],
                context["schema_version"],
                action["reason"]["code"],
                action["reason"]["label"],
                int(action["score"]),
                action["task"]["lifeline_id"],
                row["estimated_minutes"],
                json.dumps(snapshot, ensure_ascii=False, separators=(",", ":")),
                current_time,
            ),
        )
        outcome_id = int(cursor.lastrowid)
        conn.commit()
        outcome_row = conn.execute(
            "SELECT * FROM context_action_outcomes WHERE id = ?",
            (outcome_id,),
        ).fetchone()
    finally:
        conn.close()

    write_audit_log(
        "context_action_completed",
        "task",
        task_id,
        f"outcome_id={outcome_id} rank={rank} reason={action['reason']['code']}",
    )
    return _outcome_payload(outcome_row)


def record_context_feedback(outcome_id: int, fit_feedback: str) -> dict[str, Any]:
    if fit_feedback not in CONTEXT_FIT_FEEDBACK:
        raise ValueError(f"fit_feedback 不支持: {fit_feedback}")

    feedback_at = utc_now().isoformat(timespec="seconds")
    conn = get_db_connection()
    try:
        row = conn.execute(
            "SELECT id FROM context_action_outcomes WHERE id = ?",
            (outcome_id,),
        ).fetchone()
        if row is None:
            raise ContextOutcomeNotFoundError("行动结果不存在")
        conn.execute(
            """
            UPDATE context_action_outcomes
            SET fit_feedback = ?, feedback_at = ?
            WHERE id = ?
            """,
            (fit_feedback, feedback_at, outcome_id),
        )
        conn.commit()
        outcome_row = conn.execute(
            "SELECT * FROM context_action_outcomes WHERE id = ?",
            (outcome_id,),
        ).fetchone()
    finally:
        conn.close()

    write_audit_log(
        "context_feedback",
        "context_outcome",
        outcome_id,
        fit_feedback,
    )
    return _outcome_payload(outcome_row)


def context_feedback_effect(outcome: dict[str, Any]) -> str:
    feedback = outcome["fit_feedback"]
    if feedback == "right":
        return "已记住这个节奏合适，近期会轻度延续相近上下文。"
    if feedback == "too_heavy":
        if outcome["estimated_minutes"] is None:
            return "已记住这一步负担偏重；没有时长依据时，系统不会猜测具体阈值。"
        return "接下来会优先更轻的行动，这条影响会在 7 天内自然减弱。"
    if feedback == "wrong_time":
        if outcome["lifeline_id"] is None:
            return "已记住这次时机不合适；没有生活线依据时，系统不会推断其他任务。"
        return "今天会暂时降低同一生活线的权重，这条影响会自然减弱。"
    return "反馈已记录。"
