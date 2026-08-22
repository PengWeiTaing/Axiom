"""Outcome-only learning for reversible task decomposition suggestions."""
from __future__ import annotations

import hashlib
import json
import sqlite3
import uuid
from datetime import datetime, timedelta, timezone
from typing import Any


AI_SUGGESTION_WINDOW_DAYS = 30
AI_SUGGESTION_OPEN_HOURS = 24
AI_SUGGESTION_STATUSES = {"open", "confirmed", "discarded", "expired"}


class TaskSuggestionNotFoundError(LookupError):
    pass


class TaskSuggestionUnavailableError(ValueError):
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


def suggestion_fingerprint(steps: list[dict[str, Any]]) -> str:
    canonical = [
        {
            "title": str(step.get("title", "")).strip(),
            "estimated_minutes": int(step.get("estimated_minutes") or 0),
        }
        for step in steps
    ]
    raw = json.dumps(canonical, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def register_task_suggestion(
    conn: sqlite3.Connection,
    task_id: int,
    suggestion: dict[str, Any],
    *,
    now: datetime | None = None,
) -> str:
    task = conn.execute("SELECT title FROM tasks WHERE id = ?", (task_id,)).fetchone()
    if task is None:
        raise TaskSuggestionNotFoundError("行动不存在")

    timestamp = (now or _utc_now()).isoformat(timespec="seconds")
    conn.execute(
        """
        UPDATE task_ai_suggestion_events
        SET status = 'expired', resolved_at = ?
        WHERE task_id = ? AND status = 'open'
        """,
        (timestamp, task_id),
    )
    suggestion_id = uuid.uuid4().hex
    steps = list(suggestion.get("steps") or [])
    conn.execute(
        """
        INSERT INTO task_ai_suggestion_events (
            suggestion_id, task_id, task_title, model, confidence,
            suggested_step_count, suggested_total_minutes,
            candidate_fingerprint, status, modified, created_at, resolved_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'open', NULL, ?, NULL)
        """,
        (
            suggestion_id,
            task_id,
            task["title"],
            str(suggestion.get("model") or "unknown"),
            str(suggestion.get("confidence") or "low"),
            len(steps),
            sum(int(step.get("estimated_minutes") or 0) for step in steps),
            suggestion_fingerprint(steps),
            timestamp,
        ),
    )
    return suggestion_id


def resolve_task_suggestion(
    conn: sqlite3.Connection,
    task_id: int,
    suggestion_id: str,
    status: str,
    *,
    confirmed_steps: list[dict[str, Any]] | None = None,
    now: datetime | None = None,
) -> dict[str, Any]:
    if status not in {"confirmed", "discarded"}:
        raise ValueError("候选结果必须是 confirmed 或 discarded")
    row = conn.execute(
        """
        SELECT suggestion_id, task_id, status, candidate_fingerprint
        FROM task_ai_suggestion_events
        WHERE suggestion_id = ?
        """,
        (suggestion_id,),
    ).fetchone()
    if row is None or row["task_id"] != task_id:
        raise TaskSuggestionNotFoundError("AI 拆解候选不存在")
    if row["status"] != "open":
        raise TaskSuggestionUnavailableError("AI 拆解候选已经处理过")

    modified = None
    if status == "confirmed":
        if confirmed_steps is None:
            raise ValueError("确认候选时必须提供最终步骤")
        modified = int(suggestion_fingerprint(confirmed_steps) != row["candidate_fingerprint"])
    timestamp = (now or _utc_now()).isoformat(timespec="seconds")
    conn.execute(
        """
        UPDATE task_ai_suggestion_events
        SET status = ?, modified = ?, resolved_at = ?
        WHERE suggestion_id = ?
        """,
        (status, modified, timestamp, suggestion_id),
    )
    return {
        "suggestion_id": suggestion_id,
        "status": status,
        "modified": bool(modified) if modified is not None else None,
        "resolved_at": timestamp,
    }


def read_task_suggestion_learning(
    conn: sqlite3.Connection,
    *,
    now: datetime | None = None,
    window_days: int = AI_SUGGESTION_WINDOW_DAYS,
) -> dict[str, Any]:
    current_time = now or _utc_now()
    threshold = (current_time - timedelta(days=window_days)).isoformat(timespec="seconds")
    expiry_threshold = current_time - timedelta(hours=AI_SUGGESTION_OPEN_HOURS)
    rows = conn.execute(
        """
        SELECT status, modified, created_at
        FROM task_ai_suggestion_events
        WHERE datetime(created_at) >= datetime(?)
        ORDER BY created_at DESC
        """,
        (threshold,),
    ).fetchall()

    counts = {"open": 0, "confirmed": 0, "modified": 0, "discarded": 0, "expired": 0}
    for row in rows:
        status = str(row["status"])
        if status == "open":
            created_at = _parse_datetime(row["created_at"])
            status = "expired" if created_at and created_at < expiry_threshold else "open"
        if status in counts:
            counts[status] += 1
        if status == "confirmed" and bool(row["modified"]):
            counts["modified"] += 1

    resolved = counts["confirmed"] + counts["discarded"] + counts["expired"]
    return {
        "window_days": window_days,
        "generated": len(rows),
        "open": counts["open"],
        "confirmed": counts["confirmed"],
        "modified": counts["modified"],
        "discarded": counts["discarded"],
        "expired": counts["expired"],
        "resolved": resolved,
    }


def task_suggestion_learning_guidance(learning: dict[str, Any]) -> str:
    resolved = int(learning.get("resolved") or 0)
    if resolved < 3:
        return "历史候选结果还不足，不要从少量样本推断用户偏好。"
    discarded = int(learning.get("discarded") or 0) + int(learning.get("expired") or 0)
    confirmed = int(learning.get("confirmed") or 0)
    modified = int(learning.get("modified") or 0)
    if discarded / resolved >= 0.5:
        return "近期候选较常被放弃；减少假设，优先给出更少、更贴近原行动措辞的步骤。"
    if confirmed and modified / confirmed >= 0.5:
        return "近期确认候选常被编辑；保持步骤克制、具体，并避免擅自补充未提供的执行条件。"
    if confirmed / resolved >= 0.7:
        return "近期候选大多被直接确认；维持相近的步骤数量和具体程度。"
    return "近期结果没有形成稳定偏好；继续使用保守、可编辑的候选。"
