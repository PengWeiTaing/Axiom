"""One-level task decomposition with durable parent context."""
from __future__ import annotations

import sqlite3
from datetime import datetime, timezone
from typing import Any


TASK_DECOMPOSITION_SCHEMA_VERSION = "task.decomposition.v1"
MAX_TASK_STEPS = 5
MIN_STEP_MINUTES = 5
MAX_STEP_MINUTES = 480


class TaskDecompositionTaskNotFoundError(LookupError):
    pass


class TaskDecompositionUnavailableError(ValueError):
    pass


class TaskDecompositionLimitError(ValueError):
    pass


class TaskDecompositionInputError(ValueError):
    pass


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


def _normalize_steps(steps: Any) -> list[dict[str, Any]]:
    if not isinstance(steps, list) or not steps:
        raise TaskDecompositionInputError("steps 必须是非空数组")
    if len(steps) > MAX_TASK_STEPS:
        raise TaskDecompositionLimitError(f"一次最多添加 {MAX_TASK_STEPS} 个步骤")

    normalized: list[dict[str, Any]] = []
    seen_titles: set[str] = set()
    for index, raw in enumerate(steps, start=1):
        if isinstance(raw, str):
            raw = {"title": raw}
        if not isinstance(raw, dict):
            raise TaskDecompositionInputError(f"第 {index} 个步骤必须是对象")

        title = str(raw.get("title", "")).strip()
        if not title:
            raise TaskDecompositionInputError(f"第 {index} 个步骤缺少标题")
        if len(title) > 160:
            raise TaskDecompositionInputError(f"第 {index} 个步骤标题不能超过 160 字")
        title_key = title.casefold()
        if title_key in seen_titles:
            raise TaskDecompositionInputError("步骤标题不能重复")
        seen_titles.add(title_key)

        raw_minutes = raw.get("estimated_minutes", 15)
        try:
            minutes = int(raw_minutes)
        except (TypeError, ValueError) as exc:
            raise TaskDecompositionInputError(f"第 {index} 个步骤预计分钟必须是整数") from exc
        if minutes < MIN_STEP_MINUTES or minutes > MAX_STEP_MINUTES:
            raise TaskDecompositionInputError(
                f"第 {index} 个步骤预计分钟必须在 {MIN_STEP_MINUTES}-{MAX_STEP_MINUTES} 之间"
            )
        normalized.append({"title": title, "estimated_minutes": minutes})
    return normalized


def read_parent_tasks(
    conn: sqlite3.Connection,
    child_task_ids: set[int] | list[int],
) -> dict[int, dict[str, Any]]:
    child_ids = sorted({int(task_id) for task_id in child_task_ids})
    if not child_ids:
        return {}
    placeholders = ",".join("?" for _ in child_ids)
    rows = conn.execute(
        f"""
        SELECT
            d.child_task_id,
            d.parent_task_id,
            d.parent_task_title,
            d.position,
            d.source,
            d.created_at,
            p.title AS current_parent_title,
            p.status AS parent_status
        FROM task_decomposition_links d
        LEFT JOIN tasks p ON p.id = d.parent_task_id
        WHERE d.child_task_id IN ({placeholders})
        """,
        child_ids,
    ).fetchall()
    return {
        int(row["child_task_id"]): {
            "id": row["parent_task_id"],
            "title": row["current_parent_title"] or row["parent_task_title"],
            "status": row["parent_status"],
            "available": row["parent_task_id"] is not None,
            "position": int(row["position"]),
            "source": row["source"],
            "linked_at": row["created_at"],
        }
        for row in rows
    }


def read_parent_task(conn: sqlite3.Connection, child_task_id: int) -> dict[str, Any] | None:
    return read_parent_tasks(conn, [child_task_id]).get(int(child_task_id))


def read_subtask_rows(conn: sqlite3.Connection, parent_task_id: int) -> list[sqlite3.Row]:
    return conn.execute(
        """
        SELECT
            t.id, t.title, t.detail, t.status, t.priority,
            t.memory_id, t.due_date, t.estimated_minutes,
            t.completed_at, t.created_at, t.updated_at, t.lifeline_id,
            d.position AS decomposition_position
        FROM task_decomposition_links d
        JOIN tasks t ON t.id = d.child_task_id
        WHERE d.parent_task_id = ?
        ORDER BY d.position ASC, d.child_task_id ASC
        """,
        (parent_task_id,),
    ).fetchall()


def subtask_progress(rows: list[sqlite3.Row]) -> dict[str, int]:
    progress = {"total": len(rows), "todo": 0, "done": 0, "cancelled": 0}
    for row in rows:
        status = str(row["status"])
        if status in progress:
            progress[status] += 1
    return progress


def read_subtask_summaries(
    conn: sqlite3.Connection,
    parent_task_ids: set[int] | list[int],
) -> dict[int, dict[str, int]]:
    parent_ids = sorted({int(task_id) for task_id in parent_task_ids})
    if not parent_ids:
        return {}
    placeholders = ",".join("?" for _ in parent_ids)
    rows = conn.execute(
        f"""
        SELECT
            d.parent_task_id,
            COUNT(*) AS total,
            SUM(CASE WHEN t.status = 'todo' THEN 1 ELSE 0 END) AS todo,
            SUM(CASE WHEN t.status = 'done' THEN 1 ELSE 0 END) AS done,
            SUM(CASE WHEN t.status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled
        FROM task_decomposition_links d
        JOIN tasks t ON t.id = d.child_task_id
        WHERE d.parent_task_id IN ({placeholders})
        GROUP BY d.parent_task_id
        """,
        parent_ids,
    ).fetchall()
    return {
        int(row["parent_task_id"]): {
            "total": int(row["total"] or 0),
            "todo": int(row["todo"] or 0),
            "done": int(row["done"] or 0),
            "cancelled": int(row["cancelled"] or 0),
        }
        for row in rows
    }


def has_open_subtasks(conn: sqlite3.Connection, parent_task_id: int) -> bool:
    row = conn.execute(
        """
        SELECT 1
        FROM task_decomposition_links d
        JOIN tasks t ON t.id = d.child_task_id
        WHERE d.parent_task_id = ? AND t.status = 'todo'
        LIMIT 1
        """,
        (parent_task_id,),
    ).fetchone()
    return row is not None


def create_task_steps(
    conn: sqlite3.Connection,
    parent_task_id: int,
    steps: Any,
    *,
    now: datetime | None = None,
) -> list[int]:
    normalized = _normalize_steps(steps)
    parent = conn.execute(
        """
        SELECT
            id, title, status, priority, memory_id,
            due_date, lifeline_id
        FROM tasks
        WHERE id = ?
        """,
        (parent_task_id,),
    ).fetchone()
    if parent is None:
        raise TaskDecompositionTaskNotFoundError("行动不存在")
    if parent["status"] != "todo":
        raise TaskDecompositionUnavailableError("只有尚未完成的行动可以拆解")

    parent_link = conn.execute(
        "SELECT 1 FROM task_decomposition_links WHERE child_task_id = ?",
        (parent_task_id,),
    ).fetchone()
    if parent_link is not None:
        raise TaskDecompositionUnavailableError("步骤不能继续嵌套拆解；请回到它的上层行动调整")

    existing_rows = read_subtask_rows(conn, parent_task_id)
    if len(existing_rows) + len(normalized) > MAX_TASK_STEPS:
        remaining = max(0, MAX_TASK_STEPS - len(existing_rows))
        raise TaskDecompositionLimitError(f"一个行动最多保留 {MAX_TASK_STEPS} 个步骤，当前还可添加 {remaining} 个")

    existing_titles = {str(row["title"]).strip().casefold() for row in existing_rows}
    if any(step["title"].casefold() in existing_titles for step in normalized):
        raise TaskDecompositionInputError("步骤不能与已有步骤重名")

    timestamp = (now or _utc_now()).isoformat(timespec="seconds")
    first_position = max(
        [int(row["decomposition_position"]) for row in existing_rows],
        default=0,
    ) + 1
    created_ids: list[int] = []
    for offset, step in enumerate(normalized):
        cursor = conn.execute(
            """
            INSERT INTO tasks (
                title, detail, status, priority, memory_id,
                due_date, estimated_minutes, completed_at,
                created_at, updated_at, lifeline_id
            ) VALUES (?, NULL, 'todo', ?, ?, ?, ?, NULL, ?, ?, ?)
            """,
            (
                step["title"],
                parent["priority"],
                parent["memory_id"],
                parent["due_date"],
                step["estimated_minutes"],
                timestamp,
                timestamp,
                parent["lifeline_id"],
            ),
        )
        child_id = int(cursor.lastrowid)
        conn.execute(
            """
            INSERT INTO task_decomposition_links (
                child_task_id, parent_task_id, parent_task_title,
                position, source, created_at, updated_at
            ) VALUES (?, ?, ?, ?, 'manual_breakdown', ?, ?)
            """,
            (
                child_id,
                parent_task_id,
                parent["title"],
                first_position + offset,
                timestamp,
                timestamp,
            ),
        )
        created_ids.append(child_id)
    return created_ids
