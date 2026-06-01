"""Learning Board v0.1 — 事件回写适配器。

将 widget_events 的回写请求连接到 Axiom 现有 task/memory/lifeline 表。
"""
from __future__ import annotations

import json
import sqlite3
from datetime import datetime, timezone
from typing import Any

from core._common import logger
from core.boards.mastery import compute_evidence_score, compute_mastery_delta, now_iso
from core.boards.review import build_review_item


def process_widget_event(
    conn: sqlite3.Connection,
    event: dict[str, Any],
) -> dict[str, Any]:
    """处理单个 widget 事件，执行 mastery/review/task/memory 回写。

    返回：{mastery_delta, review_actions, task_actions, memory_actions}
    """
    widget_id = event.get("widget_id", "")
    event_type = event.get("event_type", "")
    payload = event.get("event_payload_json", "{}")

    if isinstance(payload, str):
        try:
            payload = json.loads(payload)
        except (json.JSONDecodeError, TypeError):
            payload = {}

    result: dict[str, Any] = {
        "accepted": True,
        "mastery_delta": None,
        "review_actions": [],
        "task_actions": [],
        "memory_actions": [],
    }

    widget = _load_widget(conn, widget_id)
    if widget is None:
        result["accepted"] = False
        return result

    concept_refs = _extract_concept_refs(payload, widget)
    user_id = event.get("user_id", "default")

    for concept_key in concept_refs:
        evidence = compute_evidence_score(event_type, payload)
        if evidence is None:
            continue

        old = _load_mastery(conn, user_id, concept_key)
        delta = compute_mastery_delta(old["score"], evidence)

        _upsert_mastery(conn, user_id, concept_key, delta["new_score"], payload)
        result["mastery_delta"] = {
            "concept_key": concept_key,
            **delta,
        }

        correct = payload.get("correct", True)
        review = build_review_item(
            user_id, concept_key,
            board_id=widget.get("board_id"),
            score=delta["new_score"],
            reason_override=None if correct else "wrong_answer",
        )
        _upsert_review_item(conn, review)
        result["review_actions"].append({
            "action": "schedule",
            "concept_key": concept_key,
            "scheduled_for": review["scheduled_for"],
            "reason": review["reason"],
        })

        # 仅在高置信度已掌握时写回 memory
        if delta["new_score"] >= 0.82 and evidence >= 0.70:
            memory_action = _writeback_memory(conn, user_id, concept_key, evidence)
            if memory_action:
                result["memory_actions"].append(memory_action)

        # 复习/低 mastery 时创建 task
        if delta["new_score"] < 0.55:
            task_action = _writeback_task(conn, user_id, concept_key, delta["new_score"])
            if task_action:
                result["task_actions"].append(task_action)

    return result


def _load_widget(conn: sqlite3.Connection, widget_id: str) -> dict[str, Any] | None:
    row = conn.execute(
        "SELECT id, board_id, type, spec_json FROM widgets WHERE id = ?",
        (widget_id,),
    ).fetchone()
    if row is None:
        return None
    return {
        "id": row["id"],
        "board_id": row["board_id"],
        "type": row["type"],
        "spec_json": row["spec_json"],
    }


def _extract_concept_refs(payload: dict[str, Any], widget: dict[str, Any]) -> list[str]:
    """从事件 payload 和 widget spec 中提取概念引用。"""
    refs = set()

    direct_refs = payload.get("concept_refs", [])
    if isinstance(direct_refs, list):
        refs.update(str(r) for r in direct_refs if r)

    question_refs = payload.get("question_concept_refs", [])
    if isinstance(question_refs, list):
        refs.update(str(r) for r in question_refs if r)

    if not refs:
        try:
            spec = json.loads(widget.get("spec_json", "{}"))
        except (json.JSONDecodeError, TypeError):
            spec = {}
        inp = spec.get("input", {})
        if isinstance(inp, dict):
            items = inp.get("items", [])
            for item in items:
                item_refs = item.get("concept_refs", [])
                if isinstance(item_refs, list):
                    refs.update(str(r) for r in item_refs if r)

    if not refs:
        refs.add(f"widget:{widget.get('id', 'unknown')}")

    return list(refs)


def _load_mastery(conn: sqlite3.Connection, user_id: str, concept_key: str) -> dict[str, Any]:
    row = conn.execute(
        "SELECT score, evidence_count, recent_correct_rate, hint_rate, avg_latency_ms "
        "FROM mastery WHERE user_id = ? AND concept_key = ?",
        (user_id, concept_key),
    ).fetchone()
    if row is None:
        return {
            "score": 0.0,
            "evidence_count": 0,
            "recent_correct_rate": 0.0,
            "hint_rate": 0.0,
            "avg_latency_ms": None,
        }
    return dict(row)


def _upsert_mastery(
    conn: sqlite3.Connection,
    user_id: str,
    concept_key: str,
    new_score: float,
    payload: dict[str, Any],
) -> None:
    old = _load_mastery(conn, user_id, concept_key)
    evidence_count = old["evidence_count"] + 1
    correct = payload.get("correct", True)
    old_correct_total = old["recent_correct_rate"] * old["evidence_count"] if old["evidence_count"] > 0 else 0
    recent_correct_rate = (old_correct_total + (1 if correct else 0)) / evidence_count if evidence_count > 0 else 0
    hint_rate = (old["hint_rate"] * old["evidence_count"] + (1 if payload.get("hint_used") else 0)) / evidence_count if evidence_count > 0 else 0
    latency_ms = payload.get("latency_ms")
    avg_latency_ms = old.get("avg_latency_ms")
    if isinstance(latency_ms, (int, float)) and isinstance(avg_latency_ms, (int, float)):
        avg_latency_ms = (avg_latency_ms * old["evidence_count"] + latency_ms) / evidence_count
    elif isinstance(latency_ms, (int, float)):
        avg_latency_ms = latency_ms

    now = now_iso()
    conn.execute(
        """
        INSERT INTO mastery (user_id, concept_key, score, evidence_count,
            recent_correct_rate, hint_rate, avg_latency_ms,
            last_reviewed_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT (user_id, concept_key) DO UPDATE SET
            score = excluded.score,
            evidence_count = excluded.evidence_count,
            recent_correct_rate = excluded.recent_correct_rate,
            hint_rate = excluded.hint_rate,
            avg_latency_ms = excluded.avg_latency_ms,
            last_reviewed_at = excluded.last_reviewed_at,
            updated_at = excluded.updated_at
        """,
        (user_id, concept_key, new_score, evidence_count,
         recent_correct_rate, hint_rate, avg_latency_ms,
         now, now),
    )


def _upsert_review_item(conn: sqlite3.Connection, item: dict[str, Any]) -> None:
    conn.execute(
        """
        INSERT OR REPLACE INTO review_queue
            (id, user_id, concept_key, board_id, priority, reason,
             scheduled_for, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            item["id"], item["user_id"], item["concept_key"],
            item.get("board_id"), item["priority"], item["reason"],
            item["scheduled_for"], item["status"],
            item["created_at"], item["updated_at"],
        ),
    )


def _writeback_memory(
    conn: sqlite3.Connection, user_id: str, concept_key: str, evidence: float
) -> dict[str, Any] | None:
    """概念已掌握时写回记忆层。"""
    try:
        content = f"[自动] 已掌握概念: {concept_key} (mastery evidence={evidence:.2f})"
        now = now_iso()
        cursor = conn.execute(
            """INSERT INTO memories (category, content, detail, status, source_text, created_at, updated_at)
               VALUES (?, ?, ?, ?, ?, ?, ?)""",
            ("fact", content, f"概念 {concept_key} 掌握度达标，自动记录。",
             "confirmed", content[:200], now, now),
        )
        mem_id = cursor.lastrowid
        if mem_id:
            return {"action": "memory_created", "memory_id": mem_id, "concept_key": concept_key}
    except Exception:
        logger.exception("failed to writeback memory for %s", concept_key)
    return None


def _writeback_task(
    conn: sqlite3.Connection, user_id: str, concept_key: str, score: float
) -> dict[str, Any] | None:
    """低 mastery 时创建复习任务。"""
    try:
        title = f"[学习] 复习概念: {concept_key}"
        detail = f"当前掌握度 {score:.2f}，建议针对性复习。"
        from datetime import timedelta
        due = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat(timespec="seconds")
        now = now_iso()
        cursor = conn.execute(
            """INSERT INTO tasks (title, detail, status, priority, due_date, created_at, updated_at)
               VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (title, detail, "todo", "medium", due, now, now),
        )
        task_id = cursor.lastrowid
        if task_id:
            return {"action": "task_created", "task_id": task_id, "concept_key": concept_key}
    except Exception:
        logger.exception("failed to writeback task for %s", concept_key)
    return None
