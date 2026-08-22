"""Goal commitment profiles, lifecycle rules, and hierarchy validation."""
from __future__ import annotations

from datetime import date, datetime, timedelta, timezone
from typing import Any


GOAL_STATES = {"active", "paused", "achieved", "released"}
GOAL_STATE_LABELS = {
    "active": "推进中",
    "paused": "已暂停",
    "achieved": "已达成",
    "released": "已放下",
}
DEFAULT_REVIEW_CADENCE_DAYS = 14
MIN_REVIEW_CADENCE_DAYS = 1
MAX_REVIEW_CADENCE_DAYS = 365


class GoalNotFoundError(LookupError):
    pass


class GoalNotConfirmedError(ValueError):
    pass


class GoalHierarchyError(ValueError):
    pass


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


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


def _normalize_optional_text(value: Any, field: str, limit: int) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    if not text:
        return None
    if len(text) > limit:
        raise ValueError(f"{field} 最多 {limit} 个字符")
    return text


def _normalize_target_date(value: Any) -> str | None:
    text = _normalize_optional_text(value, "target_date", 10)
    if text is None:
        return None
    try:
        return date.fromisoformat(text).isoformat()
    except ValueError as exc:
        raise ValueError("target_date 必须是 YYYY-MM-DD") from exc


def _normalize_cadence(value: Any) -> int:
    try:
        cadence = int(value)
    except (TypeError, ValueError) as exc:
        raise ValueError("review_cadence_days 必须是整数") from exc
    if not MIN_REVIEW_CADENCE_DAYS <= cadence <= MAX_REVIEW_CADENCE_DAYS:
        raise ValueError(
            f"review_cadence_days 必须在 {MIN_REVIEW_CADENCE_DAYS}-{MAX_REVIEW_CADENCE_DAYS} 之间"
        )
    return cadence


def _read_goal_memory(conn, memory_id: int):
    row = conn.execute(
        """
        SELECT id, category, status, content, created_at, updated_at
        FROM memories
        WHERE id = ?
        """,
        (memory_id,),
    ).fetchone()
    if row is None:
        raise GoalNotFoundError("目标不存在")
    if row["category"] != "goal":
        raise GoalNotConfirmedError("该记忆不是目标")
    return row


def _require_confirmed_goal(conn, memory_id: int):
    row = _read_goal_memory(conn, memory_id)
    if row["status"] != "confirmed":
        raise GoalNotConfirmedError("只有已确认目标才能成为当前承诺")
    return row


def _validate_parent(conn, memory_id: int, parent_goal_id: int | None) -> None:
    if parent_goal_id is None:
        return
    if parent_goal_id == memory_id:
        raise GoalHierarchyError("目标不能把自己设为父目标")

    parent = conn.execute(
        "SELECT id, category, status FROM memories WHERE id = ?",
        (parent_goal_id,),
    ).fetchone()
    if parent is None or parent["category"] != "goal" or parent["status"] != "confirmed":
        raise GoalHierarchyError("父目标必须是另一个已确认目标")

    visited = {memory_id}
    current: int | None = parent_goal_id
    while current is not None:
        if current in visited:
            raise GoalHierarchyError("目标层级不能形成循环")
        visited.add(current)
        row = conn.execute(
            "SELECT parent_goal_id FROM goal_commitments WHERE memory_id = ?",
            (current,),
        ).fetchone()
        current = int(row["parent_goal_id"]) if row and row["parent_goal_id"] is not None else None


def _profile_payload(goal, profile, parent) -> dict[str, Any]:
    cadence = int(profile["review_cadence_days"] or DEFAULT_REVIEW_CADENCE_DAYS)
    last_reviewed_at = profile["last_reviewed_at"] or goal["updated_at"]
    reviewed = _parse_datetime(last_reviewed_at)
    next_review = reviewed + timedelta(days=cadence) if reviewed else None
    state = profile["state"] or "active"
    now = _utc_now()
    return {
        "memory_id": int(goal["id"]),
        "state": state,
        "state_label": GOAL_STATE_LABELS.get(state, state),
        "success_criteria": profile["success_criteria"],
        "target_date": profile["target_date"],
        "review_cadence_days": cadence,
        "last_reviewed_at": last_reviewed_at,
        "next_review_at": next_review.isoformat(timespec="seconds") if next_review else None,
        "review_due": bool(next_review and next_review <= now and state in {"active", "paused"}),
        "completed_at": profile["completed_at"],
        "parent_goal": (
            {"id": int(parent["id"]), "title": parent["content"]}
            if parent is not None
            else None
        ),
        "created_at": profile["created_at"] or goal["created_at"],
        "updated_at": profile["updated_at"] or goal["updated_at"],
    }


def read_goal_profile(conn, memory_id: int) -> dict[str, Any] | None:
    """Return a persisted profile or a backward-compatible active default."""
    try:
        goal = _read_goal_memory(conn, memory_id)
    except (GoalNotFoundError, GoalNotConfirmedError):
        return None

    profile = conn.execute(
        """
        SELECT
            memory_id, parent_goal_id, success_criteria, target_date,
            review_cadence_days, last_reviewed_at, state, completed_at,
            created_at, updated_at
        FROM goal_commitments
        WHERE memory_id = ?
        """,
        (memory_id,),
    ).fetchone()
    if profile is None:
        profile = {
            "memory_id": memory_id,
            "parent_goal_id": None,
            "success_criteria": None,
            "target_date": None,
            "review_cadence_days": DEFAULT_REVIEW_CADENCE_DAYS,
            "last_reviewed_at": goal["updated_at"],
            "state": "active",
            "completed_at": None,
            "created_at": goal["created_at"],
            "updated_at": goal["updated_at"],
        }
    parent = None
    parent_goal_id = profile["parent_goal_id"]
    if parent_goal_id is not None:
        parent = conn.execute(
            "SELECT id, content FROM memories WHERE id = ?",
            (parent_goal_id,),
        ).fetchone()
    return _profile_payload(goal, profile, parent)


def ensure_goal_profile(
    conn,
    memory_id: int,
    *,
    now: datetime | None = None,
) -> dict[str, Any]:
    goal = _require_confirmed_goal(conn, memory_id)
    timestamp = (now or _utc_now()).isoformat(timespec="seconds")
    conn.execute(
        """
        INSERT OR IGNORE INTO goal_commitments (
            memory_id, review_cadence_days, last_reviewed_at,
            state, created_at, updated_at
        ) VALUES (?, ?, ?, 'active', ?, ?)
        """,
        (
            memory_id,
            DEFAULT_REVIEW_CADENCE_DAYS,
            goal["updated_at"] or timestamp,
            timestamp,
            timestamp,
        ),
    )
    profile = read_goal_profile(conn, memory_id)
    if profile is None:
        raise GoalNotFoundError("目标不存在")
    return profile


def update_goal_profile(
    conn,
    memory_id: int,
    payload: dict[str, Any],
    *,
    now: datetime | None = None,
) -> dict[str, Any]:
    _require_confirmed_goal(conn, memory_id)
    current = ensure_goal_profile(conn, memory_id, now=now)
    timestamp = (now or _utc_now()).isoformat(timespec="seconds")

    success_criteria = (
        _normalize_optional_text(payload.get("success_criteria"), "success_criteria", 2000)
        if "success_criteria" in payload
        else current["success_criteria"]
    )
    target_date = (
        _normalize_target_date(payload.get("target_date"))
        if "target_date" in payload
        else current["target_date"]
    )
    cadence = (
        _normalize_cadence(payload.get("review_cadence_days"))
        if "review_cadence_days" in payload
        else current["review_cadence_days"]
    )

    state = str(payload.get("state", current["state"])).strip().lower()
    if state not in GOAL_STATES:
        raise ValueError(f"state 不支持: {state}")

    if "parent_goal_id" in payload:
        raw_parent = payload.get("parent_goal_id")
        if raw_parent in (None, ""):
            parent_goal_id = None
        else:
            try:
                parent_goal_id = int(raw_parent)
            except (TypeError, ValueError) as exc:
                raise GoalHierarchyError("parent_goal_id 必须是目标 ID") from exc
    else:
        parent_goal_id = current["parent_goal"]["id"] if current["parent_goal"] else None
    _validate_parent(conn, memory_id, parent_goal_id)

    state_changed = state != current["state"]
    last_reviewed_at = timestamp if state_changed else current["last_reviewed_at"]
    completed_at = current["completed_at"]
    if state in {"achieved", "released"}:
        completed_at = completed_at or timestamp
    else:
        completed_at = None

    conn.execute(
        """
        INSERT INTO goal_commitments (
            memory_id, parent_goal_id, success_criteria, target_date,
            review_cadence_days, last_reviewed_at, state, completed_at,
            created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(memory_id) DO UPDATE SET
            parent_goal_id = excluded.parent_goal_id,
            success_criteria = excluded.success_criteria,
            target_date = excluded.target_date,
            review_cadence_days = excluded.review_cadence_days,
            last_reviewed_at = excluded.last_reviewed_at,
            state = excluded.state,
            completed_at = excluded.completed_at,
            updated_at = excluded.updated_at
        """,
        (
            memory_id,
            parent_goal_id,
            success_criteria,
            target_date,
            cadence,
            last_reviewed_at,
            state,
            completed_at,
            current["created_at"] or timestamp,
            timestamp,
        ),
    )
    conn.execute(
        "UPDATE memories SET updated_at = ? WHERE id = ?",
        (timestamp, memory_id),
    )
    profile = read_goal_profile(conn, memory_id)
    if profile is None:
        raise GoalNotFoundError("目标不存在")
    return profile


def review_goal_profile(
    conn,
    memory_id: int,
    *,
    now: datetime | None = None,
) -> dict[str, Any]:
    _require_confirmed_goal(conn, memory_id)
    current = ensure_goal_profile(conn, memory_id, now=now)
    if current["state"] not in {"active", "paused"}:
        raise GoalNotConfirmedError("已经结束的目标不需要继续复盘")
    timestamp = (now or _utc_now()).isoformat(timespec="seconds")
    conn.execute(
        """
        UPDATE goal_commitments
        SET last_reviewed_at = ?, updated_at = ?
        WHERE memory_id = ?
        """,
        (timestamp, timestamp, memory_id),
    )
    conn.execute(
        "UPDATE memories SET updated_at = ? WHERE id = ?",
        (timestamp, memory_id),
    )
    profile = read_goal_profile(conn, memory_id)
    if profile is None:
        raise GoalNotFoundError("目标不存在")
    return profile
