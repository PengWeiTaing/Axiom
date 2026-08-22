"""Evidence-backed, dismissible friction cues for the current-context view."""
from __future__ import annotations

import hashlib
import sqlite3
from datetime import date, datetime, timezone
from typing import Any

from core.weekly_plan import week_bounds


MAX_CONTEXT_NUDGES = 2
NUDGE_MIN_AGE_DAYS = 2


class ContextNudgeNotFoundError(LookupError):
    pass


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


def _compact(value: str, limit: int = 32) -> str:
    text = " ".join(str(value or "").split())
    return text if len(text) <= limit else f"{text[:limit - 1]}…"


def _nudge_id(nudge_type: str, target: str, week_start: str) -> str:
    raw = f"{nudge_type}:{target}:{week_start}".encode("utf-8")
    return hashlib.sha256(raw).hexdigest()[:24]


def _payload(
    *,
    nudge_type: str,
    target_key: str,
    week_start: str,
    title: str,
    detail: str,
    evidence: list[str],
    target: dict[str, Any],
    priority: int,
) -> dict[str, Any]:
    return {
        "id": _nudge_id(nudge_type, target_key, week_start),
        "type": nudge_type,
        "title": title,
        "detail": detail,
        "evidence": evidence,
        "target": target,
        "priority": priority,
        "dismiss_label": "本周忽略",
    }


def _weekly_rows(conn: sqlite3.Connection, anchor: date) -> list[sqlite3.Row]:
    week_start, _ = week_bounds(anchor)
    return conn.execute(
        """
        SELECT
            w.task_id, w.task_title, w.selected_at,
            t.status, t.estimated_minutes, t.created_at, t.updated_at,
            COUNT(td.child_task_id) AS step_total,
            SUM(CASE WHEN child.status = 'todo' THEN 1 ELSE 0 END) AS step_todo,
            SUM(CASE WHEN child.status = 'done' THEN 1 ELSE 0 END) AS step_done,
            SUM(CASE WHEN child.status = 'cancelled' THEN 1 ELSE 0 END) AS step_cancelled,
            MIN(td.created_at) AS decomposition_created_at,
            MAX(child.updated_at) AS child_updated_at
        FROM weekly_plan_items w
        LEFT JOIN tasks t ON t.id = w.task_id
        LEFT JOIN task_decomposition_links td ON td.parent_task_id = w.task_id
        LEFT JOIN tasks child ON child.id = td.child_task_id
        WHERE w.week_start = ? AND w.removed_at IS NULL
        GROUP BY
            w.id, w.task_id, w.task_title, w.selected_at,
            t.status, t.estimated_minutes, t.created_at, t.updated_at
        ORDER BY w.position, w.id
        """,
        (week_start.isoformat(),),
    ).fetchall()


def build_context_nudges(
    conn: sqlite3.Connection,
    *,
    today: date,
    now: datetime,
    include_dismissed: bool = False,
) -> list[dict[str, Any]]:
    if now.tzinfo is None:
        now = now.replace(tzinfo=timezone.utc)
    week_start, _ = week_bounds(today)
    week_key = week_start.isoformat()
    rows = _weekly_rows(conn, today)
    candidates: list[dict[str, Any]] = []

    for row in rows:
        if row["task_id"] is None or row["status"] != "todo":
            continue
        task_id = int(row["task_id"])
        task_title = _compact(row["task_title"] or f"行动 #{task_id}")
        selected_age = _age_days(row["selected_at"], now)
        step_total = int(row["step_total"] or 0)
        step_todo = int(row["step_todo"] or 0)

        if step_total >= 2 and step_todo == step_total:
            stalled_age = _age_days(row["child_updated_at"], now)
            decomposition_age = _age_days(row["decomposition_created_at"], now)
            if (
                selected_age is not None
                and selected_age >= NUDGE_MIN_AGE_DAYS
                and stalled_age is not None
                and stalled_age >= NUDGE_MIN_AGE_DAYS
                and decomposition_age is not None
                and decomposition_age >= NUDGE_MIN_AGE_DAYS
            ):
                candidates.append(
                    _payload(
                        nudge_type="stuck_steps",
                        target_key=str(task_id),
                        week_start=week_key,
                        title=f"「{task_title}」拆开后还没有启动",
                        detail=f"{step_total} 个步骤仍全部未处理，已经停留 {stalled_age} 天。",
                        evidence=["本周已承诺", f"{step_total} 个步骤全部未处理", f"连续 {stalled_age} 天没有变化"],
                        target={"kind": "task", "id": task_id},
                        priority=100 + min(stalled_age, 14),
                    )
                )
            continue

        if step_total == 0:
            task_age = _age_days(row["created_at"], now)
            unchanged_age = _age_days(row["updated_at"], now)
            estimated = int(row["estimated_minutes"] or 0)
            if (
                selected_age is not None
                and selected_age >= NUDGE_MIN_AGE_DAYS
                and unchanged_age is not None
                and unchanged_age >= NUDGE_MIN_AGE_DAYS
                and ((task_age is not None and task_age >= 7) or estimated >= 60)
            ):
                evidence = ["本周已承诺", f"连续 {unchanged_age} 天没有变化"]
                if estimated >= 60:
                    evidence.append(f"预计 {estimated} 分钟")
                elif task_age is not None:
                    evidence.append(f"已存在 {task_age} 天")
                candidates.append(
                    _payload(
                        nudge_type="long_unstarted",
                        target_key=str(task_id),
                        week_start=week_key,
                        title=f"「{task_title}」还没有找到起点",
                        detail="这项本周承诺持续没有变化，可以先检查它是否需要拆小、改期或放下。",
                        evidence=evidence,
                        target={"kind": "task", "id": task_id},
                        priority=80 + min(unchanged_age, 14),
                    )
                )

    if today.weekday() >= 4 and len(rows) >= 2:
        resolved = 0
        for row in rows:
            step_total = int(row["step_total"] or 0)
            step_todo = int(row["step_todo"] or 0)
            if row["status"] in {"done", "cancelled"} or (step_total > 0 and step_todo == 0):
                resolved += 1
        if resolved == 0:
            candidates.append(
                _payload(
                    nudge_type="weekly_stalled",
                    target_key="weekly-review",
                    week_start=week_key,
                    title="本周承诺还没有一项收口",
                    detail="本周已经进入后半段，先判断是承诺过多、步骤太大，还是时机需要调整。",
                    evidence=[f"本周选择 {len(rows)} 项", "当前收口 0 项", "已进入周复盘窗口"],
                    target={"kind": "weekly_review"},
                    priority=70,
                )
            )

    candidates.sort(key=lambda item: (-int(item["priority"]), item["id"]))
    if not include_dismissed and candidates:
        dismissed = {
            str(row["nudge_id"])
            for row in conn.execute(
                "SELECT nudge_id FROM context_nudge_dismissals WHERE week_start = ?",
                (week_key,),
            ).fetchall()
        }
        candidates = [item for item in candidates if item["id"] not in dismissed]
    visible = candidates if include_dismissed else candidates[:MAX_CONTEXT_NUDGES]
    for item in visible:
        item.pop("priority", None)
    return visible


def dismiss_context_nudge(
    conn: sqlite3.Connection,
    nudge_id: str,
    *,
    today: date,
    now: datetime,
) -> dict[str, Any]:
    visible = build_context_nudges(
        conn,
        today=today,
        now=now,
        include_dismissed=True,
    )
    nudge = next((item for item in visible if item["id"] == nudge_id), None)
    if nudge is None:
        raise ContextNudgeNotFoundError("这条提示已不存在")
    week_start, _ = week_bounds(today)
    target = nudge["target"]
    task_id = target.get("id") if target.get("kind") == "task" else None
    timestamp = now.isoformat(timespec="seconds")
    conn.execute(
        """
        INSERT INTO context_nudge_dismissals (
            nudge_id, nudge_type, task_id, week_start, dismissed_at
        ) VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(nudge_id) DO UPDATE SET dismissed_at = excluded.dismissed_at
        """,
        (nudge_id, nudge["type"], task_id, week_start.isoformat(), timestamp),
    )
    return nudge
