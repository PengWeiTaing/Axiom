"""Confirmed goals and their executable commitment state."""
from __future__ import annotations

from typing import Any


COMMITMENT_FACTOR_POINTS = 10
MAX_COMMITMENT_GAPS = 4


def confirmed_goal_from_task_row(row) -> dict[str, Any] | None:
    if row["goal_category"] != "goal" or row["goal_status"] != "confirmed":
        return None
    return {
        "id": int(row["goal_id"]),
        "title": row["goal_title"],
        "lifeline_id": row["goal_lifeline_id"],
        "lifeline_name": row["goal_lifeline_name"],
    }


def compact_goal_title(value: str, limit: int = 28) -> str:
    title = " ".join(str(value).split())
    if len(title) <= limit:
        return title
    return f"{title[: limit - 1]}…"


def read_commitments(conn) -> dict[str, Any]:
    rows = conn.execute(
        """
        SELECT
            m.id, m.content, m.detail, m.lifeline_id,
            l.name AS lifeline_name, m.updated_at,
            COUNT(t.id) AS total_actions,
            SUM(CASE WHEN t.status = 'todo' THEN 1 ELSE 0 END) AS open_actions,
            SUM(CASE WHEN t.status = 'done' THEN 1 ELSE 0 END) AS completed_actions
        FROM memories m
        LEFT JOIN tasks t ON t.memory_id = m.id
        LEFT JOIN lifelines l ON l.id = m.lifeline_id
        WHERE m.category = 'goal' AND m.status = 'confirmed'
        GROUP BY
            m.id, m.content, m.detail, m.lifeline_id,
            l.name, m.updated_at
        ORDER BY datetime(m.updated_at) DESC, m.id DESC
        """
    ).fetchall()

    goals = [
        {
            "id": int(row["id"]),
            "title": row["content"],
            "detail": row["detail"],
            "lifeline_id": row["lifeline_id"],
            "lifeline_name": row["lifeline_name"],
            "total_actions": int(row["total_actions"] or 0),
            "open_actions": int(row["open_actions"] or 0),
            "completed_actions": int(row["completed_actions"] or 0),
        }
        for row in rows
    ]
    gaps = [goal for goal in goals if goal["open_actions"] == 0]
    return {
        "confirmed_goals": len(goals),
        "with_open_actions": len(goals) - len(gaps),
        "without_open_actions": len(gaps),
        "gaps": gaps[:MAX_COMMITMENT_GAPS],
    }
