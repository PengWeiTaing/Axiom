"""Learning Board v0.1 — 复习队列调度。

采用 mastery 分桶 + 固定区间调度，不依赖复杂节律模型。
"""
from __future__ import annotations

import uuid
from datetime import datetime, timedelta, timezone
from typing import Any

from core.boards.mastery import mastery_bucket, now_iso


def schedule_next_review(score: float) -> tuple[str, str]:
    """根据 mastery score 安排下次复习时间。

    返回 (scheduled_for_iso, reason)。
    """
    bucket = mastery_bucket(score)
    now = datetime.now(timezone.utc)

    if bucket == "weak":
        delta = timedelta(days=1)
        reason = "low_mastery"
    elif bucket == "developing":
        delta = timedelta(days=3)
        reason = "due_review"
    elif bucket == "proficient":
        delta = timedelta(days=7)
        reason = "due_review"
    else:
        delta = timedelta(days=14)
        reason = "due_review"

    scheduled = now + delta
    return scheduled.isoformat(timespec="seconds"), reason


def schedule_after_wrong_answer() -> tuple[str, str]:
    """答错后的复习排程。"""
    now = datetime.now(timezone.utc)
    scheduled = now + timedelta(days=1)
    return scheduled.isoformat(timespec="seconds"), "wrong_answer"


def build_review_item(
    user_id: str,
    concept_key: str,
    board_id: str | None,
    score: float,
    reason_override: str | None = None,
) -> dict[str, Any]:
    """生成一条复习队列记录。"""
    if reason_override:
        scheduled_for, reason = schedule_after_wrong_answer()
    else:
        scheduled_for, reason = schedule_next_review(score)

    return {
        "id": f"rq_{uuid.uuid4().hex[:12]}",
        "user_id": user_id,
        "concept_key": concept_key,
        "board_id": board_id,
        "priority": _review_priority(score),
        "reason": reason,
        "scheduled_for": scheduled_for,
        "status": "todo",
        "created_at": now_iso(),
        "updated_at": now_iso(),
    }


def _review_priority(score: float) -> int:
    if score < 0.35:
        return 90
    if score < 0.50:
        return 75
    if score < 0.65:
        return 60
    if score < 0.80:
        return 40
    return 20


def due_review_items(
    rows: list[dict[str, Any]],
    *,
    now: str | None = None,
) -> list[dict[str, Any]]:
    """筛选已到期或今天应复习的条目。"""
    ref = now or now_iso()
    return [
        row for row in rows
        if row.get("scheduled_for", "") <= ref and row.get("status") == "todo"
    ]
