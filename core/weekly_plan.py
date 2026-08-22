"""Lightweight weekly commitments that reference existing tasks."""
from __future__ import annotations

import sqlite3
from datetime import date, datetime, timedelta, timezone
from typing import Any

from core.context_commitments import confirmed_goal_from_task_row
from core.task_decomposition import read_subtask_summaries


WEEKLY_PLAN_SCHEMA_VERSION = "planning.week.v2"
WEEKLY_REVIEW_SCHEMA_VERSION = "planning.week.review.v1"
MAX_WEEKLY_COMMITMENTS = 5
MAX_WEEKLY_REFLECTION_CHARS = 1000
WEEKLY_DECOMPOSITION_FIT_LABELS = {
    "right": "粒度合适",
    "too_coarse": "步骤偏大",
    "too_fine": "步骤偏碎",
}


class WeeklyPlanTaskNotFoundError(LookupError):
    pass


class WeeklyPlanSelectionNotFoundError(LookupError):
    pass


class WeeklyPlanTaskUnavailableError(ValueError):
    pass


class WeeklyPlanFullError(ValueError):
    pass


class WeeklyPlanCompletedSelectionError(ValueError):
    pass


class WeeklyReviewInputError(ValueError):
    pass


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


def parse_week_anchor(value: Any, *, default: date | None = None) -> date:
    if value is None or str(value).strip() == "":
        return default or date.today()
    if isinstance(value, date):
        return value
    try:
        return date.fromisoformat(str(value).strip())
    except ValueError as exc:
        raise ValueError("date 必须是 YYYY-MM-DD") from exc


def week_bounds(anchor: date) -> tuple[date, date]:
    start = anchor - timedelta(days=anchor.weekday())
    return start, start + timedelta(days=6)


def selected_week_task_ids(conn: sqlite3.Connection, anchor: date) -> set[int]:
    week_start, _ = week_bounds(anchor)
    rows = conn.execute(
        """
        SELECT task_id
        FROM weekly_plan_items
        WHERE week_start = ?
          AND removed_at IS NULL
          AND task_id IS NOT NULL
        """,
        (week_start.isoformat(),),
    ).fetchall()
    return {int(row["task_id"]) for row in rows}


def context_week_task_ids(conn: sqlite3.Connection, anchor: date) -> set[int]:
    """Return selected tasks plus their executable children for current-context ranking."""
    selected = selected_week_task_ids(conn, anchor)
    if not selected:
        return set()
    placeholders = ",".join("?" for _ in selected)
    rows = conn.execute(
        f"""
        SELECT child_task_id
        FROM task_decomposition_links
        WHERE parent_task_id IN ({placeholders})
        """,
        sorted(selected),
    ).fetchall()
    return selected | {int(row["child_task_id"]) for row in rows}


def _selection_task(row: sqlite3.Row) -> dict[str, Any] | None:
    if row["task_id"] is None:
        return None
    goal = confirmed_goal_from_task_row(row)
    return {
        "id": int(row["task_id"]),
        "title": row["task_title"],
        "detail": row["task_detail"],
        "status": row["task_status"],
        "priority": row["task_priority"],
        "memory_id": row["task_memory_id"],
        "due_date": row["task_due_date"],
        "estimated_minutes": row["task_estimated_minutes"],
        "completed_at": row["task_completed_at"],
        "created_at": row["task_created_at"],
        "updated_at": row["task_updated_at"],
        "lifeline_id": row["task_lifeline_id"] or (goal["lifeline_id"] if goal else None),
        "lifeline_name": row["lifeline_name"] or (goal["lifeline_name"] if goal else None),
        "goal": goal,
    }


def _review_recommendation(
    *,
    selected_count: int,
    decomposed_commitments: int,
    step_summary: dict[str, int],
    feedback_summary: dict[str, int],
    saved_fit: str | None,
) -> str:
    if selected_count == 0:
        return "这周没有明确承诺，暂时没有足够依据判断拆解粒度。"
    if decomposed_commitments == 0:
        return "这周还没有行动拆解证据；下次遇到难以启动的大行动时，再比较拆解前后的变化。"
    if saved_fit == "too_coarse":
        return "已记住步骤偏大；下次 AI 候选会优先降低单步启动成本。"
    if saved_fit == "too_fine":
        return "已记住步骤偏碎；下次 AI 候选会减少步骤数量和切换。"
    if saved_fit == "right":
        return "已记住当前粒度合适；下次 AI 候选会沿用相近节奏。"
    if feedback_summary.get("too_heavy", 0) > feedback_summary.get("right", 0):
        return "完成反馈里“有点重”更多，建议下周把步骤再缩小一些。"
    handled = step_summary["done"] + step_summary["cancelled"]
    if step_summary["total"] and handled / step_summary["total"] >= 0.7:
        return "大部分步骤已经得到处理，这周的拆解基本帮助了行动启动。"
    return "仍有较多步骤未处理，复盘时重点判断是步骤偏大，还是本周承诺过多。"


def read_week_review(
    conn: sqlite3.Connection,
    anchor: date,
    selected: list[dict[str, Any]],
    plan_summary: dict[str, int],
) -> dict[str, Any]:
    week_start, week_end = week_bounds(anchor)
    selected_task_ids = {
        int(item["task_id"])
        for item in selected
        if item["task_id"] is not None
    }
    child_task_ids: set[int] = set()
    if selected_task_ids:
        placeholders = ",".join("?" for _ in selected_task_ids)
        child_task_ids = {
            int(row["child_task_id"])
            for row in conn.execute(
                f"""
                SELECT child_task_id
                FROM task_decomposition_links
                WHERE parent_task_id IN ({placeholders})
                """,
                sorted(selected_task_ids),
            ).fetchall()
        }

    step_summary = {"total": 0, "todo": 0, "done": 0, "cancelled": 0}
    decomposed_commitments = 0
    resolved_commitments = 0
    for item in selected:
        progress = item.get("subtask_progress")
        if progress and int(progress.get("total", 0)) > 0:
            decomposed_commitments += 1
            for key in step_summary:
                step_summary[key] += int(progress.get(key, 0))
            if int(progress.get("todo", 0)) == 0:
                resolved_commitments += 1
            continue
        task = item.get("task")
        if task is None:
            continue
        step_summary["total"] += 1
        status = str(task.get("status", "todo"))
        if status in step_summary:
            step_summary[status] += 1
        if status in {"done", "cancelled"}:
            resolved_commitments += 1

    evidence_task_ids = selected_task_ids | child_task_ids
    feedback_summary = {"right": 0, "too_heavy": 0, "wrong_time": 0}
    completed_outcomes = 0
    if evidence_task_ids:
        placeholders = ",".join("?" for _ in evidence_task_ids)
        rows = conn.execute(
            f"""
            SELECT fit_feedback
            FROM context_action_outcomes
            WHERE task_id IN ({placeholders})
              AND created_at >= ?
              AND created_at < ?
            """,
            [
                *sorted(evidence_task_ids),
                f"{week_start.isoformat()}T00:00:00",
                f"{(week_end + timedelta(days=1)).isoformat()}T00:00:00",
            ],
        ).fetchall()
        completed_outcomes = len(rows)
        for row in rows:
            feedback = row["fit_feedback"]
            if feedback in feedback_summary:
                feedback_summary[str(feedback)] += 1

    saved_row = conn.execute(
        "SELECT * FROM weekly_reviews WHERE week_start = ?",
        (week_start.isoformat(),),
    ).fetchone()
    saved_feedback = None
    saved_fit = None
    if saved_row is not None:
        saved_fit = str(saved_row["decomposition_fit"])
        saved_feedback = {
            "decomposition_fit": saved_fit,
            "decomposition_fit_label": WEEKLY_DECOMPOSITION_FIT_LABELS[saved_fit],
            "reflection": saved_row["reflection"],
            "reviewed_at": saved_row["reviewed_at"],
        }

    rated_outcomes = sum(feedback_summary.values())
    evidence_level = (
        "high"
        if decomposed_commitments > 0 and step_summary["total"] >= 3 and rated_outcomes > 0
        else "medium"
        if decomposed_commitments > 0 and step_summary["total"] >= 2
        else "low"
    )
    return {
        "schema_version": WEEKLY_REVIEW_SCHEMA_VERSION,
        "state": "saved" if saved_feedback else "ready" if selected else "empty",
        "review_window_open": anchor.weekday() >= 4,
        "evidence_level": evidence_level,
        "commitments": {
            "selected": int(plan_summary["selected"]),
            "resolved": resolved_commitments,
            "completed": int(plan_summary["completed"]),
            "open": int(plan_summary["open"]),
            "removed": int(plan_summary["removed"]),
            "decomposed": decomposed_commitments,
        },
        "steps": step_summary,
        "outcomes": {
            "completed": completed_outcomes,
            "rated": rated_outcomes,
            "feedback": feedback_summary,
        },
        "recommendation": _review_recommendation(
            selected_count=int(plan_summary["selected"]),
            decomposed_commitments=decomposed_commitments,
            step_summary=step_summary,
            feedback_summary=feedback_summary,
            saved_fit=saved_fit,
        ),
        "saved_feedback": saved_feedback,
    }


def save_week_review(
    conn: sqlite3.Connection,
    anchor: date,
    decomposition_fit: Any,
    reflection: Any = None,
    *,
    now: datetime | None = None,
) -> str:
    fit = str(decomposition_fit or "").strip()
    if fit not in WEEKLY_DECOMPOSITION_FIT_LABELS:
        raise WeeklyReviewInputError("decomposition_fit 必须是 right、too_coarse 或 too_fine")
    note = str(reflection or "").strip() or None
    if note and len(note) > MAX_WEEKLY_REFLECTION_CHARS:
        raise WeeklyReviewInputError(
            f"reflection 不能超过 {MAX_WEEKLY_REFLECTION_CHARS} 字"
        )
    week_start, _ = week_bounds(anchor)
    timestamp = (now or _utc_now()).isoformat(timespec="seconds")
    conn.execute(
        """
        INSERT INTO weekly_reviews (
            week_start, decomposition_fit, reflection,
            reviewed_at, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(week_start) DO UPDATE SET
            decomposition_fit = excluded.decomposition_fit,
            reflection = excluded.reflection,
            reviewed_at = excluded.reviewed_at,
            updated_at = excluded.updated_at
        """,
        (week_start.isoformat(), fit, note, timestamp, timestamp, timestamp),
    )
    return week_start.isoformat()


def read_week_plan(conn: sqlite3.Connection, anchor: date) -> dict[str, Any]:
    week_start, week_end = week_bounds(anchor)
    rows = conn.execute(
        """
        SELECT
            w.id AS selection_id,
            w.week_start,
            w.task_id AS selected_task_id,
            w.task_title AS selected_task_title,
            w.position,
            w.selected_at,
            w.removed_at,
            w.removal_reason,
            w.updated_at AS selection_updated_at,
            t.id AS task_id,
            t.title AS task_title,
            t.detail AS task_detail,
            t.status AS task_status,
            t.priority AS task_priority,
            t.memory_id AS task_memory_id,
            t.due_date AS task_due_date,
            t.estimated_minutes AS task_estimated_minutes,
            t.completed_at AS task_completed_at,
            t.created_at AS task_created_at,
            t.updated_at AS task_updated_at,
            t.lifeline_id AS task_lifeline_id,
            l.name AS lifeline_name,
            gm.id AS goal_id,
            gm.category AS goal_category,
            gm.status AS goal_status,
            gm.content AS goal_title,
            gm.lifeline_id AS goal_lifeline_id,
            gl.name AS goal_lifeline_name,
            COALESCE(gc.state, 'active') AS goal_state,
            gc.target_date AS goal_target_date
        FROM weekly_plan_items w
        LEFT JOIN tasks t ON t.id = w.task_id
        LEFT JOIN lifelines l ON l.id = t.lifeline_id
        LEFT JOIN memories gm ON gm.id = t.memory_id
        LEFT JOIN goal_commitments gc ON gc.memory_id = gm.id
        LEFT JOIN lifelines gl ON gl.id = gm.lifeline_id
        WHERE w.week_start = ?
          AND w.removed_at IS NULL
        ORDER BY w.position ASC, w.selected_at ASC, w.id ASC
        """,
        (week_start.isoformat(),),
    ).fetchall()

    selected_parent_ids = {
        int(row["selected_task_id"])
        for row in rows
        if row["selected_task_id"] is not None
    }
    decomposition_summaries = read_subtask_summaries(conn, selected_parent_ids)

    selected = []
    completed = 0
    open_count = 0
    unavailable = 0
    for row in rows:
        task = _selection_task(row)
        if task is None or task["status"] == "cancelled":
            state = "unavailable"
            unavailable += 1
        elif task["status"] == "done":
            state = "completed"
            completed += 1
        else:
            state = "open"
            open_count += 1
        selected.append(
            {
                "id": int(row["selection_id"]),
                "task_id": row["selected_task_id"],
                "title": task["title"] if task else row["selected_task_title"],
                "position": int(row["position"]),
                "selected_at": row["selected_at"],
                "state": state,
                "task": task,
                "subtask_progress": (
                    decomposition_summaries.get(int(row["selected_task_id"]))
                    if row["selected_task_id"] is not None
                    else None
                ),
            }
        )

    removed_count = int(
        conn.execute(
            """
            SELECT COUNT(*)
            FROM weekly_plan_items
            WHERE week_start = ? AND removed_at IS NOT NULL
            """,
            (week_start.isoformat(),),
        ).fetchone()[0]
    )
    selected_count = len(selected)
    summary = {
        "selected": selected_count,
        "open": open_count,
        "completed": completed,
        "unavailable": unavailable,
        "removed": removed_count,
        "capacity": MAX_WEEKLY_COMMITMENTS,
        "capacity_remaining": max(0, MAX_WEEKLY_COMMITMENTS - selected_count),
    }
    return {
        "schema_version": WEEKLY_PLAN_SCHEMA_VERSION,
        "week_start": week_start.isoformat(),
        "week_end": week_end.isoformat(),
        "status": (
            "empty"
            if selected_count == 0
            else "complete"
            if open_count == 0 and unavailable == 0
            else "active"
        ),
        "summary": summary,
        "selected": selected,
        "review": read_week_review(conn, anchor, selected, summary),
    }


def add_week_task(
    conn: sqlite3.Connection,
    task_id: int,
    anchor: date,
    *,
    now: datetime | None = None,
) -> int:
    task = conn.execute(
        """
        SELECT
            t.id, t.title, t.status,
            gm.category AS goal_category,
            gm.status AS goal_status,
            COALESCE(gc.state, 'active') AS goal_state
        FROM tasks t
        LEFT JOIN memories gm ON gm.id = t.memory_id
        LEFT JOIN goal_commitments gc ON gc.memory_id = gm.id
        WHERE t.id = ?
        """,
        (task_id,),
    ).fetchone()
    if task is None:
        raise WeeklyPlanTaskNotFoundError("行动不存在")
    if task["status"] != "todo":
        raise WeeklyPlanTaskUnavailableError("只有尚未完成的行动可以加入本周")
    if (
        task["goal_category"] == "goal"
        and task["goal_status"] == "confirmed"
        and task["goal_state"] != "active"
    ):
        raise WeeklyPlanTaskUnavailableError("这项行动所属承诺当前未在推进")

    week_start, _ = week_bounds(anchor)
    existing = conn.execute(
        """
        SELECT id, removed_at
        FROM weekly_plan_items
        WHERE week_start = ? AND task_id = ?
        """,
        (week_start.isoformat(), task_id),
    ).fetchone()
    if existing is not None and existing["removed_at"] is None:
        return int(existing["id"])

    active_count = int(
        conn.execute(
            """
            SELECT COUNT(*)
            FROM weekly_plan_items
            WHERE week_start = ? AND removed_at IS NULL
            """,
            (week_start.isoformat(),),
        ).fetchone()[0]
    )
    if active_count >= MAX_WEEKLY_COMMITMENTS:
        raise WeeklyPlanFullError(f"本周最多承诺 {MAX_WEEKLY_COMMITMENTS} 项行动")

    position = int(
        conn.execute(
            """
            SELECT COALESCE(MAX(position), 0) + 1
            FROM weekly_plan_items
            WHERE week_start = ? AND removed_at IS NULL
            """,
            (week_start.isoformat(),),
        ).fetchone()[0]
    )
    timestamp = (now or _utc_now()).isoformat(timespec="seconds")
    if existing is not None:
        conn.execute(
            """
            UPDATE weekly_plan_items
            SET task_title = ?, position = ?, selected_at = ?,
                removed_at = NULL, removal_reason = NULL, updated_at = ?
            WHERE id = ?
            """,
            (task["title"], position, timestamp, timestamp, existing["id"]),
        )
        return int(existing["id"])

    cursor = conn.execute(
        """
        INSERT INTO weekly_plan_items (
            week_start, task_id, task_title, position,
            selected_at, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            week_start.isoformat(),
            task_id,
            task["title"],
            position,
            timestamp,
            timestamp,
            timestamp,
        ),
    )
    return int(cursor.lastrowid)


def remove_week_task(
    conn: sqlite3.Connection,
    task_id: int,
    anchor: date,
    *,
    now: datetime | None = None,
) -> int:
    week_start, _ = week_bounds(anchor)
    selection = conn.execute(
        """
        SELECT id
        FROM weekly_plan_items
        WHERE week_start = ?
          AND task_id = ?
          AND removed_at IS NULL
        """,
        (week_start.isoformat(), task_id),
    ).fetchone()
    if selection is None:
        raise WeeklyPlanSelectionNotFoundError("这项行动不在本周承诺中")
    return remove_week_selection(conn, int(selection["id"]), anchor, now=now)


def remove_week_selection(
    conn: sqlite3.Connection,
    selection_id: int,
    anchor: date,
    *,
    now: datetime | None = None,
) -> int:
    week_start, _ = week_bounds(anchor)
    selection = conn.execute(
        """
        SELECT w.id, t.status
        FROM weekly_plan_items w
        LEFT JOIN tasks t ON t.id = w.task_id
        WHERE w.id = ?
          AND w.week_start = ?
          AND w.removed_at IS NULL
        """,
        (selection_id, week_start.isoformat()),
    ).fetchone()
    if selection is None:
        raise WeeklyPlanSelectionNotFoundError("这项行动不在本周承诺中")
    if selection["status"] == "done":
        raise WeeklyPlanCompletedSelectionError("已完成的本周承诺会保留到周末复盘")

    timestamp = (now or _utc_now()).isoformat(timespec="seconds")
    conn.execute(
        """
        UPDATE weekly_plan_items
        SET removed_at = ?, removal_reason = 'user_removed', updated_at = ?
        WHERE id = ?
        """,
        (timestamp, timestamp, selection["id"]),
    )
    return int(selection["id"])
