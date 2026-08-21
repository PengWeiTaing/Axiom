"""Deterministic, explainable ranking for Axiom's current-context view."""
from __future__ import annotations

from datetime import date, datetime, timedelta, timezone
from typing import Any

from core.context_commitments import (
    COMMITMENT_FACTOR_POINTS,
    compact_goal_title,
    confirmed_goal_from_task_row,
    read_commitments,
)
from core.database import get_db_connection
from core.items import local_date_now, utc_now


CONTEXT_SCHEMA_VERSION = "context.now.v3"
MAX_CONTEXT_ACTIONS = 8
FEEDBACK_WINDOW_DAYS = 7
CONTEXT_FIT_FEEDBACK = {"right", "too_heavy", "wrong_time"}


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


def _age_days(value: str | None, now: datetime) -> int | None:
    parsed = _parse_datetime(value)
    if parsed is None:
        return None
    return max(0, int((now - parsed).total_seconds() // 86400))


def _factor(key: str, label: str, points: int) -> dict[str, Any]:
    return {"key": key, "label": label, "points": points}


def _read_lifeline_activity(conn, now: datetime) -> dict[str, int]:
    threshold = (now - timedelta(days=14)).isoformat(timespec="seconds")
    rows = conn.execute(
        """
        SELECT lifeline_id, COUNT(*) AS activity_count
        FROM (
            SELECT lifeline_id, created_at AS activity_at FROM items
            UNION ALL
            SELECT lifeline_id, updated_at AS activity_at FROM tasks
            UNION ALL
            SELECT lifeline_id, updated_at AS activity_at FROM memories
            UNION ALL
            SELECT lifeline_id, updated_at AS activity_at FROM decisions
        )
        WHERE lifeline_id IS NOT NULL
          AND datetime(activity_at) >= datetime(?)
        GROUP BY lifeline_id
        """,
        (threshold,),
    ).fetchall()
    return {str(row["lifeline_id"]): int(row["activity_count"]) for row in rows}


def _read_recent_outcomes(conn, now: datetime) -> list[Any]:
    threshold = (now - timedelta(days=FEEDBACK_WINDOW_DAYS)).isoformat(timespec="seconds")
    return conn.execute(
        """
        SELECT
            id, task_id, outcome, fit_feedback, lifeline_id,
            estimated_minutes, created_at, feedback_at
        FROM context_action_outcomes
        WHERE datetime(created_at) >= datetime(?)
        ORDER BY created_at DESC
        LIMIT 32
        """,
        (threshold,),
    ).fetchall()


def _task_payload(row) -> dict[str, Any]:
    goal = confirmed_goal_from_task_row(row)
    return {
        "id": row["id"],
        "title": row["title"],
        "detail": row["detail"],
        "status": row["status"],
        "priority": row["priority"],
        "memory_id": row["memory_id"],
        "due_date": row["due_date"],
        "estimated_minutes": row["estimated_minutes"],
        "completed_at": row["completed_at"],
        "created_at": row["created_at"],
        "updated_at": row["updated_at"],
        "lifeline_id": row["lifeline_id"] or (goal["lifeline_id"] if goal else None),
        "lifeline_name": row["lifeline_name"] or (goal["lifeline_name"] if goal else None),
        "goal": goal,
    }


def _due_factor(due: date | None, today: date) -> tuple[dict[str, Any] | None, int | None]:
    if due is None:
        return None, None

    delta = (due - today).days
    if delta < 0:
        overdue_days = abs(delta)
        points = 54 + min(overdue_days, 14) * 2
        return _factor("urgency", f"已经逾期 {overdue_days} 天", points), delta
    if delta == 0:
        return _factor("urgency", "今天到期", 46), delta
    if delta == 1:
        return _factor("urgency", "明天到期", 32), delta
    if delta <= 3:
        return _factor("urgency", f"{delta} 天后到期", 22), delta
    if delta <= 7:
        return _factor("urgency", f"{delta} 天后到期", 12), delta
    return None, delta


def _startability_factor(minutes: int | None) -> dict[str, Any] | None:
    if minutes is None:
        return _factor("startability", "尚未估时", 2)
    if minutes <= 15:
        return _factor("startability", f"{minutes} 分钟可完成", 12)
    if minutes <= 30:
        return _factor("startability", f"预计 {minutes} 分钟", 9)
    if minutes <= 60:
        return _factor("startability", f"预计 {minutes} 分钟", 5)
    if minutes <= 90:
        return _factor("startability", f"预计 {minutes} 分钟", 2)
    return None


def _feedback_adjustment(
    task: dict[str, Any],
    outcomes: list[Any],
    now: datetime,
) -> tuple[dict[str, Any] | None, dict[str, str] | None]:
    points = 0.0
    lighter_signal = 0.0
    confirmed_signal = 0.0
    task_minutes = task["estimated_minutes"]
    task_lifeline = task["lifeline_id"]

    for outcome in outcomes:
        feedback = outcome["fit_feedback"]
        feedback_at = _parse_datetime(outcome["feedback_at"])
        if feedback not in CONTEXT_FIT_FEEDBACK or feedback_at is None:
            continue

        age_hours = max(0.0, (now - feedback_at).total_seconds() / 3600)
        if age_hours > FEEDBACK_WINDOW_DAYS * 24:
            continue
        recency = 1.0 if age_hours <= 24 else 0.6 if age_hours <= 72 else 0.3
        outcome_minutes = outcome["estimated_minutes"]
        same_lifeline = bool(
            task_lifeline
            and outcome["lifeline_id"]
            and str(task_lifeline) == str(outcome["lifeline_id"])
        )

        if feedback == "right":
            contribution = 0.0
            if same_lifeline:
                contribution += 4 * recency
            if (
                task_minutes is not None
                and outcome_minutes is not None
                and abs(int(task_minutes) - int(outcome_minutes)) <= 15
            ):
                contribution += 2 * recency
            points += contribution
            confirmed_signal += contribution
            continue

        if feedback == "too_heavy" and task_minutes is not None and outcome_minutes is not None:
            lighter_threshold = max(15, round(int(outcome_minutes) * 0.6))
            if int(task_minutes) <= lighter_threshold:
                contribution = 7 * recency
                points += contribution
                lighter_signal += contribution
            elif int(task_minutes) >= int(outcome_minutes):
                points -= 6 * recency
            continue

        if feedback == "wrong_time" and age_hours <= 24 and same_lifeline:
            points -= 10 * recency

    rounded_points = max(-12, min(8, round(points)))
    if rounded_points == 0:
        return None, None

    if rounded_points > 0 and lighter_signal >= confirmed_signal:
        label = "按反馈换成更轻的一步"
        reason = {
            "code": "feedback",
            "label": label,
            "detail": "你刚反馈上一项负担偏重，因此先给出一个更轻、容易重新启动的选择。",
        }
    elif rounded_points > 0:
        label = "延续已确认合适的节奏"
        reason = {
            "code": "feedback",
            "label": label,
            "detail": "相近时长或生活线刚被你确认合适，系统只做轻度延续。",
        }
    else:
        label = "近期反馈降低了当前适配度"
        reason = None

    factor = _factor("feedback", label, rounded_points)
    return factor, reason


def _primary_reason(
    due_factor: dict[str, Any] | None,
    due_delta: int | None,
    feedback_reason: dict[str, str] | None,
    goal: dict[str, Any] | None,
    priority: str,
    minutes: int | None,
    activity_count: int,
    lifeline_name: str | None,
) -> dict[str, str]:
    if due_factor and due_delta is not None and due_delta < 0:
        return {
            "code": "overdue",
            "label": due_factor["label"],
            "detail": "它已经持续占用注意力；现在应完成、改期或明确取消。",
        }
    if due_delta == 0:
        return {
            "code": "due_today",
            "label": "今天到期",
            "detail": "今天有明确时间边界，优先给它一个可完成的推进。",
        }
    if due_factor and due_delta is not None and due_delta <= 3:
        return {
            "code": "due_soon",
            "label": due_factor["label"],
            "detail": "时间窗口正在收窄，现在推进能避免临期堆积。",
        }
    if feedback_reason:
        return feedback_reason
    if goal:
        short_title = compact_goal_title(goal["title"])
        return {
            "code": "goal_progress",
            "label": f"推进「{short_title}」",
            "detail": "这一步明确关联到你已确认的目标，因此它不只是待办，也在推进一项承诺。",
        }
    if priority == "high":
        return {
            "code": "high_priority",
            "label": "高优先级",
            "detail": "它被明确标记为重要，当前没有更强的时间约束盖过它。",
        }
    if minutes is not None and minutes <= 15:
        return {
            "code": "quick_start",
            "label": "现在就能启动",
            "detail": "启动成本较低，适合作为此刻清晰、可完成的下一步。",
        }
    if activity_count > 0 and lifeline_name:
        return {
            "code": "active_context",
            "label": f"延续「{lifeline_name}」的动量",
            "detail": "相关生活线近期持续有输入，现在继续能减少重新进入上下文的成本。",
        }
    return {
        "code": "available",
        "label": "当前可推进",
        "detail": "它没有紧迫期限，系统按重要性和可启动性把它放到当前候选中。",
    }


def _rank_task(
    row,
    today: date,
    now: datetime,
    activity: dict[str, int],
    outcomes: list[Any],
) -> dict[str, Any]:
    task = _task_payload(row)
    factors: list[dict[str, Any]] = []

    due = _parse_date(task["due_date"])
    due_factor, due_delta = _due_factor(due, today)
    if due_factor:
        factors.append(due_factor)

    priority_points = {"high": 28, "medium": 15, "low": 5}.get(task["priority"], 5)
    priority_label = {"high": "高优先级", "medium": "中优先级", "low": "低优先级"}.get(
        task["priority"], "已设优先级"
    )
    factors.append(_factor("importance", priority_label, priority_points))

    startability = _startability_factor(task["estimated_minutes"])
    if startability:
        factors.append(startability)

    lifeline_id = task["lifeline_id"]
    activity_count = activity.get(str(lifeline_id), 0) if lifeline_id else 0
    updated_age = _age_days(task["updated_at"], now)
    momentum_points = min(activity_count, 7)
    if updated_age is not None:
        if updated_age <= 1:
            momentum_points += 4
        elif updated_age <= 3:
            momentum_points += 2
        elif updated_age <= 7:
            momentum_points += 1
    if momentum_points:
        momentum_label = (
            f"「{task['lifeline_name']}」近期活跃"
            if task["lifeline_name"] and activity_count
            else "近期被推进"
        )
        factors.append(_factor("momentum", momentum_label, min(momentum_points, 10)))

    created_age = _age_days(task["created_at"], now)
    if created_age is not None and created_age >= 14:
        stale_points = 4 if created_age >= 30 else 2
        factors.append(_factor("staleness", f"已搁置 {created_age} 天", stale_points))

    feedback_factor, feedback_reason = _feedback_adjustment(task, outcomes, now)
    if feedback_factor:
        factors.append(feedback_factor)

    if task["goal"]:
        factors.append(
            _factor(
                "commitment",
                f"推进「{compact_goal_title(task['goal']['title'])}」",
                COMMITMENT_FACTOR_POINTS,
            )
        )

    reason = _primary_reason(
        due_factor,
        due_delta,
        feedback_reason,
        task["goal"],
        task["priority"],
        task["estimated_minutes"],
        activity_count,
        task["lifeline_name"],
    )
    cues = [reason["label"]]
    for factor in factors:
        if (
            factor["label"] not in cues
            and factor["key"] != "importance"
            and int(factor["points"]) > 0
        ):
            cues.append(factor["label"])
        if len(cues) >= 4:
            break
    if task["priority"] == "high" and "高优先级" not in cues:
        cues.insert(1, "高优先级")
    cues = cues[:4]

    return {
        "task": task,
        "score": sum(int(factor["points"]) for factor in factors),
        "reason": reason,
        "cues": cues,
        "factors": factors,
    }


def _sort_key(action: dict[str, Any]) -> tuple[Any, ...]:
    task = action["task"]
    due = _parse_date(task["due_date"])
    updated = _parse_datetime(task["updated_at"])
    return (
        -int(action["score"]),
        due.toordinal() if due else date.max.toordinal(),
        -(updated.timestamp() if updated else 0),
        int(task["id"]),
    )


def build_now_context(
    limit: int = 5,
    *,
    today: date | None = None,
    now: datetime | None = None,
) -> dict[str, Any]:
    """Build the current action context without inventing missing user state."""
    action_limit = max(1, min(int(limit), MAX_CONTEXT_ACTIONS))
    current_date = today or local_date_now()
    current_time = now or utc_now()
    if current_time.tzinfo is None:
        current_time = current_time.replace(tzinfo=timezone.utc)

    conn = get_db_connection()
    try:
        activity = _read_lifeline_activity(conn, current_time)
        outcomes = _read_recent_outcomes(conn, current_time)
        commitments = read_commitments(conn)
        rows = conn.execute(
            """
            SELECT
                t.id, t.title, t.detail, t.status, t.priority,
                t.memory_id, t.due_date, t.estimated_minutes,
                t.completed_at, t.created_at, t.updated_at,
                t.lifeline_id, l.name AS lifeline_name,
                gm.id AS goal_id, gm.category AS goal_category,
                gm.status AS goal_status, gm.content AS goal_title,
                gm.lifeline_id AS goal_lifeline_id,
                gl.name AS goal_lifeline_name
            FROM tasks t
            LEFT JOIN lifelines l ON l.id = t.lifeline_id
            LEFT JOIN memories gm ON gm.id = t.memory_id
            LEFT JOIN lifelines gl ON gl.id = gm.lifeline_id
            WHERE t.status = 'todo'
            """
        ).fetchall()
    finally:
        conn.close()

    ranked = [
        _rank_task(row, current_date, current_time, activity, outcomes)
        for row in rows
    ]
    ranked.sort(key=_sort_key)
    visible = ranked[:action_limit]
    commitments["linked_open_actions"] = sum(
        1 for action in ranked if action["task"]["goal"] is not None
    )
    commitments["unlinked_open_actions"] = len(ranked) - commitments["linked_open_actions"]

    overdue = 0
    due_today = 0
    undated = 0
    for action in ranked:
        due = _parse_date(action["task"]["due_date"])
        if due is None:
            undated += 1
        elif due < current_date:
            overdue += 1
        elif due == current_date:
            due_today += 1

    return {
        "schema_version": CONTEXT_SCHEMA_VERSION,
        "generated_at": current_time.isoformat(timespec="seconds"),
        "date": current_date.isoformat(),
        "mode": "focus" if visible else "empty",
        "focus": visible[0] if visible else None,
        "alternatives": visible[1:],
        "signals": {
            "open_tasks": len(ranked),
            "overdue_tasks": overdue,
            "due_today_tasks": due_today,
            "undated_tasks": undated,
        },
        "learning": {
            "recent_outcomes": len(outcomes),
            "explicit_feedback": sum(
                1 for outcome in outcomes if outcome["fit_feedback"] in CONTEXT_FIT_FEEDBACK
            ),
            "window_days": FEEDBACK_WINDOW_DAYS,
        },
        "commitments": commitments,
    }
