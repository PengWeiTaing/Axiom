"""Confirmed goals and their executable commitment state."""
from __future__ import annotations

from datetime import date, datetime, timedelta, timezone
from typing import Any

from core.goals import DEFAULT_REVIEW_CADENCE_DAYS, GOAL_STATE_LABELS


COMMITMENT_FACTOR_POINTS = 10
MAX_COMMITMENT_GAPS = 4
MAX_COMMITMENT_ATTENTION = 6


def _parse_date(value: str | None) -> date | None:
    if not value:
        return None
    try:
        return date.fromisoformat(str(value)[:10])
    except ValueError:
        return None


def _parse_datetime(value: str | None) -> datetime | None:
    if not value:
        return None
    try:
        parsed = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except ValueError:
        return None
    if parsed.tzinfo is None:
        return parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def confirmed_goal_from_task_row(row) -> dict[str, Any] | None:
    state = row["goal_state"] or "active"
    if (
        row["goal_category"] != "goal"
        or row["goal_status"] != "confirmed"
        or state != "active"
    ):
        return None
    return {
        "id": int(row["goal_id"]),
        "title": row["goal_title"],
        "lifeline_id": row["goal_lifeline_id"],
        "lifeline_name": row["goal_lifeline_name"],
        "state": state,
        "target_date": row["goal_target_date"],
    }


def compact_goal_title(value: str, limit: int = 28) -> str:
    title = " ".join(str(value).split())
    if len(title) <= limit:
        return title
    return f"{title[: limit - 1]}…"


def _attention_for_goal(
    goal: dict[str, Any],
    today: date,
    now: datetime,
) -> tuple[int, dict[str, Any]] | None:
    if goal["state"] != "active":
        return None

    issue: dict[str, Any] | None = None
    priority = 99
    if goal["open_actions"] == 0:
        priority = 0
        issue = {
            "attention_code": "missing_action",
            "attention_label": "还没有可执行的下一步",
            "attention_detail": "承诺仍在推进，但当前没有可以直接开始的行动。",
            "attention_action": "add_action",
        }
    else:
        target = _parse_date(goal["target_date"])
        if target is not None:
            delta = (target - today).days
            if delta < 0:
                priority = 1
                issue = {
                    "attention_code": "target_overdue",
                    "attention_label": f"目标时间已过 {abs(delta)} 天",
                    "attention_detail": "需要重新安排时间、调整承诺，或明确结束它。",
                    "attention_action": "edit_commitment",
                }
            elif delta <= 7:
                priority = 2
                label = "目标今天到期" if delta == 0 else f"目标还有 {delta} 天"
                issue = {
                    "attention_code": "target_due",
                    "attention_label": label,
                    "attention_detail": "时间边界正在靠近，请确认当前行动足以支撑完成。",
                    "attention_action": "edit_commitment",
                }

    if issue is None and not goal["success_criteria"]:
        priority = 3
        issue = {
            "attention_code": "missing_success_criteria",
            "attention_label": "还没写清怎样算完成",
            "attention_detail": "补一句可判断的完成标准，避免目标长期保持模糊。",
            "attention_action": "edit_commitment",
        }

    if issue is None:
        reviewed = _parse_datetime(goal["last_reviewed_at"])
        cadence = int(goal["review_cadence_days"] or DEFAULT_REVIEW_CADENCE_DAYS)
        if reviewed is not None and reviewed + timedelta(days=cadence) <= now:
            priority = 4
            issue = {
                "attention_code": "review_due",
                "attention_label": "该重新确认是否继续推进",
                "attention_detail": "这项承诺已经超过复盘周期，需要重新确认方向和投入。",
                "attention_action": "review",
            }

    if issue is None:
        return None
    return priority, {**goal, **issue}


def read_commitments(
    conn,
    *,
    today: date | None = None,
    now: datetime | None = None,
) -> dict[str, Any]:
    current_date = today or date.today()
    current_time = now or datetime.now(timezone.utc)
    if current_time.tzinfo is None:
        current_time = current_time.replace(tzinfo=timezone.utc)

    rows = conn.execute(
        """
        SELECT
            m.id, m.content, m.detail, m.lifeline_id,
            l.name AS lifeline_name, m.created_at, m.updated_at,
            COALESCE(gc.state, 'active') AS commitment_state,
            gc.success_criteria, gc.target_date,
            COALESCE(gc.review_cadence_days, ?) AS review_cadence_days,
            COALESCE(gc.last_reviewed_at, m.updated_at) AS last_reviewed_at,
            gc.completed_at, gc.parent_goal_id,
            parent.content AS parent_goal_title,
            COUNT(t.id) AS total_actions,
            SUM(CASE WHEN t.status = 'todo' THEN 1 ELSE 0 END) AS open_actions,
            SUM(CASE WHEN t.status = 'done' THEN 1 ELSE 0 END) AS completed_actions
        FROM memories m
        LEFT JOIN goal_commitments gc ON gc.memory_id = m.id
        LEFT JOIN memories parent ON parent.id = gc.parent_goal_id
        LEFT JOIN tasks t ON t.memory_id = m.id
        LEFT JOIN lifelines l ON l.id = m.lifeline_id
        WHERE m.category = 'goal' AND m.status = 'confirmed'
        GROUP BY
            m.id, m.content, m.detail, m.lifeline_id,
            l.name, m.created_at, m.updated_at,
            gc.state, gc.success_criteria, gc.target_date,
            gc.review_cadence_days, gc.last_reviewed_at,
            gc.completed_at, gc.parent_goal_id, parent.content
        ORDER BY datetime(m.updated_at) DESC, m.id DESC
        """,
        (DEFAULT_REVIEW_CADENCE_DAYS,),
    ).fetchall()

    goals = [
        {
            "id": int(row["id"]),
            "title": row["content"],
            "detail": row["detail"],
            "lifeline_id": row["lifeline_id"],
            "lifeline_name": row["lifeline_name"],
            "state": row["commitment_state"],
            "state_label": GOAL_STATE_LABELS.get(
                row["commitment_state"], row["commitment_state"]
            ),
            "success_criteria": row["success_criteria"],
            "target_date": row["target_date"],
            "review_cadence_days": int(row["review_cadence_days"]),
            "last_reviewed_at": row["last_reviewed_at"],
            "completed_at": row["completed_at"],
            "parent_goal": (
                {
                    "id": int(row["parent_goal_id"]),
                    "title": row["parent_goal_title"],
                }
                if row["parent_goal_id"] is not None
                else None
            ),
            "total_actions": int(row["total_actions"] or 0),
            "open_actions": int(row["open_actions"] or 0),
            "completed_actions": int(row["completed_actions"] or 0),
        }
        for row in rows
    ]
    active_goals = [goal for goal in goals if goal["state"] == "active"]
    gaps = [goal for goal in active_goals if goal["open_actions"] == 0]
    attention_with_priority = [
        attention
        for goal in active_goals
        if (attention := _attention_for_goal(goal, current_date, current_time)) is not None
    ]
    attention_with_priority.sort(key=lambda entry: (entry[0], -int(entry[1]["id"])))
    attention = [entry[1] for entry in attention_with_priority]

    return {
        "confirmed_goals": len(goals),
        "active_goals": len(active_goals),
        "paused_goals": sum(1 for goal in goals if goal["state"] == "paused"),
        "completed_goals": sum(
            1 for goal in goals if goal["state"] in {"achieved", "released"}
        ),
        "with_open_actions": len(active_goals) - len(gaps),
        "without_open_actions": len(gaps),
        "attention_total": len(attention),
        "attention": attention[:MAX_COMMITMENT_ATTENTION],
        "gaps": gaps[:MAX_COMMITMENT_GAPS],
    }
