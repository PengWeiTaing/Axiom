"""Lightweight weekly commitments that reference existing tasks."""
from __future__ import annotations

import sqlite3
from datetime import date, datetime, timedelta, timezone
from typing import Any

from core.context_commitments import confirmed_goal_from_task_row
from core.task_decomposition import read_subtask_summaries


WEEKLY_PLAN_SCHEMA_VERSION = "planning.week.v1"
MAX_WEEKLY_COMMITMENTS = 5


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
        "summary": {
            "selected": selected_count,
            "open": open_count,
            "completed": completed,
            "unavailable": unavailable,
            "removed": removed_count,
            "capacity": MAX_WEEKLY_COMMITMENTS,
            "capacity_remaining": max(0, MAX_WEEKLY_COMMITMENTS - selected_count),
        },
        "selected": selected,
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
