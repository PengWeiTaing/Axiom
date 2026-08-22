"""Read-only project/lifeline context assembled from Axiom's existing objects."""
from __future__ import annotations

from collections import defaultdict
from typing import Any, Iterable

from core.goals import read_goal_profile


def entity_id(kind: str, row_id: int | str) -> str:
    return f"{kind}:{row_id}"


def normalize_lifeline_id(value: str | None) -> str:
    """Accept both database ids and graph ids such as ``lifeline:work``."""
    normalized = str(value or "").strip()
    if normalized.startswith("lifeline:"):
        return normalized.split(":", 1)[1]
    return normalized


def _blank_counts() -> dict[str, int]:
    return {
        "entities": 0,
        "materials": 0,
        "memories": 0,
        "tasks": 0,
        "open_actions": 0,
        "decisions": 0,
        "active_goals": 0,
    }


def _merge_counts(target: dict[str, int], source: dict[str, int]) -> None:
    for key in target:
        target[key] += int(source.get(key) or 0)


def _latest(*values: str | None) -> str | None:
    present = [str(value) for value in values if value]
    return max(present) if present else None


def _load_lifeline_rows(conn) -> list[dict[str, Any]]:
    return [
        dict(row)
        for row in conn.execute(
            """
            SELECT id, name, parent_id, order_index, created_at, updated_at
            FROM lifelines
            ORDER BY order_index, id
            """
        ).fetchall()
    ]


def list_lifeline_summaries(conn) -> list[dict[str, Any]]:
    """Return hierarchy-aware summaries without loading Atlas associations."""
    rows = _load_lifeline_rows(conn)
    if not rows:
        return []

    by_id = {str(row["id"]): row for row in rows}
    children: dict[str | None, list[str]] = defaultdict(list)
    for row in rows:
        parent_id = str(row["parent_id"]) if row["parent_id"] else None
        children[parent_id].append(str(row["id"]))

    direct = {raw_id: _blank_counts() for raw_id in by_id}
    latest_by_id: dict[str, str | None] = {raw_id: None for raw_id in by_id}

    for row in conn.execute(
        """
        SELECT lifeline_id, COUNT(*) AS total, MAX(created_at) AS latest
        FROM items
        WHERE lifeline_id IS NOT NULL
        GROUP BY lifeline_id
        """
    ).fetchall():
        raw_id = str(row["lifeline_id"])
        if raw_id not in direct:
            continue
        direct[raw_id]["materials"] = int(row["total"] or 0)
        latest_by_id[raw_id] = _latest(latest_by_id[raw_id], row["latest"])

    for row in conn.execute(
        """
        SELECT
            t.lifeline_id,
            COUNT(*) AS total,
            SUM(
                CASE
                    WHEN t.status = 'todo'
                     AND (
                        m.id IS NULL
                        OR m.category != 'goal'
                        OR m.status != 'confirmed'
                        OR COALESCE(gc.state, 'active') = 'active'
                     )
                    THEN 1 ELSE 0
                END
            ) AS open_actions,
            MAX(COALESCE(t.updated_at, t.created_at)) AS latest
        FROM tasks AS t
        LEFT JOIN memories AS m ON m.id = t.memory_id
        LEFT JOIN goal_commitments AS gc ON gc.memory_id = m.id
        WHERE t.lifeline_id IS NOT NULL
        GROUP BY t.lifeline_id
        """
    ).fetchall():
        raw_id = str(row["lifeline_id"])
        if raw_id not in direct:
            continue
        direct[raw_id]["tasks"] = int(row["total"] or 0)
        direct[raw_id]["open_actions"] = int(row["open_actions"] or 0)
        latest_by_id[raw_id] = _latest(latest_by_id[raw_id], row["latest"])

    for row in conn.execute(
        """
        SELECT
            m.lifeline_id,
            COUNT(*) AS total,
            SUM(
                CASE
                    WHEN m.category = 'goal'
                     AND m.status = 'confirmed'
                     AND COALESCE(gc.state, 'active') = 'active'
                    THEN 1 ELSE 0
                END
            ) AS active_goals,
            MAX(COALESCE(m.updated_at, m.created_at)) AS latest
        FROM memories AS m
        LEFT JOIN goal_commitments AS gc ON gc.memory_id = m.id
        WHERE m.lifeline_id IS NOT NULL
        GROUP BY m.lifeline_id
        """
    ).fetchall():
        raw_id = str(row["lifeline_id"])
        if raw_id not in direct:
            continue
        direct[raw_id]["memories"] = int(row["total"] or 0)
        direct[raw_id]["active_goals"] = int(row["active_goals"] or 0)
        latest_by_id[raw_id] = _latest(latest_by_id[raw_id], row["latest"])

    for row in conn.execute(
        """
        SELECT
            lifeline_id,
            COUNT(*) AS total,
            MAX(COALESCE(updated_at, created_at)) AS latest
        FROM decisions
        WHERE lifeline_id IS NOT NULL
        GROUP BY lifeline_id
        """
    ).fetchall():
        raw_id = str(row["lifeline_id"])
        if raw_id not in direct:
            continue
        direct[raw_id]["decisions"] = int(row["total"] or 0)
        latest_by_id[raw_id] = _latest(latest_by_id[raw_id], row["latest"])

    for counts in direct.values():
        counts["entities"] = (
            counts["materials"]
            + counts["memories"]
            + counts["tasks"]
            + counts["decisions"]
        )

    rollups: dict[str, tuple[dict[str, int], str | None]] = {}

    def rollup(raw_id: str, visiting: set[str] | None = None) -> tuple[dict[str, int], str | None]:
        if raw_id in rollups:
            return rollups[raw_id]
        visiting = set(visiting or ())
        if raw_id in visiting:
            return direct[raw_id].copy(), latest_by_id[raw_id]
        visiting.add(raw_id)
        counts = direct[raw_id].copy()
        latest = latest_by_id[raw_id]
        for child_id in children.get(raw_id, []):
            child_counts, child_latest = rollup(child_id, visiting)
            _merge_counts(counts, child_counts)
            latest = _latest(latest, child_latest)
        rollups[raw_id] = (counts, latest)
        return rollups[raw_id]

    def depth_for(raw_id: str) -> int:
        depth = 0
        current = by_id[raw_id].get("parent_id")
        visited = {raw_id}
        while current and str(current) in by_id and str(current) not in visited:
            current_id = str(current)
            visited.add(current_id)
            depth += 1
            current = by_id[current_id].get("parent_id")
        return depth

    output_by_id: dict[str, dict[str, Any]] = {}
    for row in rows:
        raw_id = str(row["id"])
        counts, last_activity_at = rollup(raw_id)
        output_by_id[raw_id] = {
            "id": entity_id("lifeline", raw_id),
            "raw_id": raw_id,
            "name": row["name"],
            "parent_id": (
                entity_id("lifeline", row["parent_id"])
                if row["parent_id"]
                else None
            ),
            "order_index": int(row["order_index"] or 0),
            "depth": depth_for(raw_id),
            "has_children": bool(children.get(raw_id)),
            "direct_counts": direct[raw_id],
            "counts": counts,
            "last_activity_at": last_activity_at,
        }

    ordered: list[dict[str, Any]] = []
    ordered_ids: set[str] = set()

    def append_branch(branch_id: str) -> None:
        if branch_id in ordered_ids or branch_id not in output_by_id:
            return
        ordered_ids.add(branch_id)
        ordered.append(output_by_id[branch_id])
        for child_id in children.get(branch_id, []):
            append_branch(child_id)

    for root_id in children.get(None, []):
        append_branch(root_id)
    for row in rows:
        append_branch(str(row["id"]))
    return ordered


def _where_in(column: str, values: Iterable[str]) -> tuple[str, list[str]]:
    params = [str(value) for value in values]
    placeholders = ", ".join("?" for _ in params)
    return f"{column} IN ({placeholders})", params


def _lifeline_ref(raw_id: str | None, names: dict[str, str]) -> tuple[str | None, str | None]:
    if not raw_id:
        return None, None
    normalized = str(raw_id)
    return entity_id("lifeline", normalized), names.get(normalized)


def _activity_entry(
    *,
    kind: str,
    object_id: int,
    title: str,
    summary: str | None,
    status: str | None,
    timestamp: str,
    lifeline_id: str | None,
    lifeline_name: str | None,
) -> dict[str, Any]:
    return {
        "kind": kind,
        "id": object_id,
        "title": title,
        "summary": summary,
        "status": status,
        "timestamp": timestamp,
        "lifeline_id": lifeline_id,
        "lifeline_name": lifeline_name,
    }


def read_lifeline_context(conn, requested_id: str) -> dict[str, Any] | None:
    """Assemble one line and all descendants into a coherent read-only context."""
    raw_id = normalize_lifeline_id(requested_id)
    rows = _load_lifeline_rows(conn)
    by_id = {str(row["id"]): row for row in rows}
    if not raw_id or raw_id not in by_id:
        return None

    names = {line_id: str(row["name"]) for line_id, row in by_id.items()}
    children_by_parent: dict[str, list[str]] = defaultdict(list)
    for row in rows:
        if row["parent_id"]:
            children_by_parent[str(row["parent_id"])].append(str(row["id"]))

    scope_ids: list[str] = []
    queue = [raw_id]
    visited: set[str] = set()
    while queue:
        current = queue.pop(0)
        if current in visited:
            continue
        visited.add(current)
        scope_ids.append(current)
        queue.extend(children_by_parent.get(current, []))

    ancestors: list[dict[str, str]] = []
    current_parent = by_id[raw_id].get("parent_id")
    ancestor_seen = {raw_id}
    while current_parent and str(current_parent) in by_id and str(current_parent) not in ancestor_seen:
        parent_id = str(current_parent)
        ancestor_seen.add(parent_id)
        ancestors.append({"id": entity_id("lifeline", parent_id), "name": names[parent_id]})
        current_parent = by_id[parent_id].get("parent_id")
    ancestors.reverse()

    scope_clause, scope_params = _where_in("lifeline_id", scope_ids)

    goal_rows = conn.execute(
        f"""
        SELECT id, content, detail, status, created_at, updated_at, lifeline_id
        FROM memories
        WHERE category = 'goal' AND status = 'confirmed' AND {scope_clause}
        ORDER BY updated_at DESC, id DESC
        """,
        scope_params,
    ).fetchall()
    goal_ids = [int(row["id"]) for row in goal_rows]

    task_scope_clause, task_scope_params = _where_in("t.lifeline_id", scope_ids)
    if goal_ids:
        goal_placeholders = ", ".join("?" for _ in goal_ids)
        task_rows = conn.execute(
            f"""
            SELECT
                t.id, t.title, t.detail, t.status, t.priority, t.memory_id,
                t.due_date, t.estimated_minutes, t.completed_at,
                t.created_at, t.updated_at, t.lifeline_id,
                m.content AS goal_title,
                CASE
                    WHEN m.category = 'goal' AND m.status = 'confirmed'
                    THEN COALESCE(gc.state, 'active')
                    ELSE NULL
                END AS goal_state
            FROM tasks AS t
            LEFT JOIN memories AS m ON m.id = t.memory_id
            LEFT JOIN goal_commitments AS gc ON gc.memory_id = m.id
            WHERE {task_scope_clause} OR t.memory_id IN ({goal_placeholders})
            ORDER BY
                CASE t.status WHEN 'todo' THEN 0 WHEN 'done' THEN 1 ELSE 2 END,
                CASE WHEN t.due_date IS NULL THEN 1 ELSE 0 END,
                t.due_date,
                t.updated_at DESC,
                t.id DESC
            """,
            [*task_scope_params, *goal_ids],
        ).fetchall()
    else:
        task_rows = conn.execute(
            f"""
            SELECT
                t.id, t.title, t.detail, t.status, t.priority, t.memory_id,
                t.due_date, t.estimated_minutes, t.completed_at,
                t.created_at, t.updated_at, t.lifeline_id,
                m.content AS goal_title,
                CASE
                    WHEN m.category = 'goal' AND m.status = 'confirmed'
                    THEN COALESCE(gc.state, 'active')
                    ELSE NULL
                END AS goal_state
            FROM tasks AS t
            LEFT JOIN memories AS m ON m.id = t.memory_id
            LEFT JOIN goal_commitments AS gc ON gc.memory_id = m.id
            WHERE {task_scope_clause}
            ORDER BY
                CASE t.status WHEN 'todo' THEN 0 WHEN 'done' THEN 1 ELSE 2 END,
                CASE WHEN t.due_date IS NULL THEN 1 ELSE 0 END,
                t.due_date,
                t.updated_at DESC,
                t.id DESC
            """,
            task_scope_params,
        ).fetchall()

    progress_by_goal: dict[int, dict[str, int]] = {
        goal_id: {"total": 0, "open": 0, "done": 0, "cancelled": 0}
        for goal_id in goal_ids
    }
    tasks = []
    for row in task_rows:
        task_lifeline_id, task_lifeline_name = _lifeline_ref(row["lifeline_id"], names)
        task = {
            "id": int(row["id"]),
            "title": row["title"],
            "detail": row["detail"],
            "status": row["status"],
            "priority": row["priority"],
            "memory_id": int(row["memory_id"]) if row["memory_id"] is not None else None,
            "goal_title": row["goal_title"],
            "goal_state": row["goal_state"],
            "due_date": row["due_date"],
            "estimated_minutes": row["estimated_minutes"],
            "completed_at": row["completed_at"],
            "created_at": row["created_at"],
            "updated_at": row["updated_at"],
            "lifeline_id": task_lifeline_id,
            "lifeline_name": task_lifeline_name,
        }
        tasks.append(task)
        memory_id = task["memory_id"]
        if memory_id in progress_by_goal:
            progress = progress_by_goal[memory_id]
            progress["total"] += 1
            if task["status"] == "todo":
                progress["open"] += 1
            elif task["status"] == "done":
                progress["done"] += 1
            else:
                progress["cancelled"] += 1

    goals = []
    for row in goal_rows:
        goal_lifeline_id, goal_lifeline_name = _lifeline_ref(row["lifeline_id"], names)
        goal_id = int(row["id"])
        goals.append(
            {
                "id": goal_id,
                "title": row["content"],
                "detail": row["detail"],
                "status": row["status"],
                "created_at": row["created_at"],
                "updated_at": row["updated_at"],
                "lifeline_id": goal_lifeline_id,
                "lifeline_name": goal_lifeline_name,
                "profile": read_goal_profile(conn, goal_id),
                "progress": progress_by_goal[goal_id],
            }
        )
    goals.sort(
        key=lambda goal: (
            {"active": 0, "paused": 1, "achieved": 2, "released": 3}.get(
                str((goal["profile"] or {}).get("state")), 4
            ),
            str(goal["profile"].get("target_date") or "9999-12-31") if goal["profile"] else "9999-12-31",
            str(goal["title"]),
        )
    )

    item_rows = conn.execute(
        f"""
        SELECT
            id, type, content, original_name, derived_text, transcript_text,
            source, created_at, lifeline_id
        FROM items
        WHERE {scope_clause}
        ORDER BY created_at DESC, id DESC
        LIMIT 100
        """,
        scope_params,
    ).fetchall()
    materials = []
    for row in item_rows:
        item_lifeline_id, item_lifeline_name = _lifeline_ref(row["lifeline_id"], names)
        readable = row["content"] or row["derived_text"] or row["transcript_text"] or ""
        title = row["original_name"] or readable or f"记录 #{row['id']}"
        materials.append(
            {
                "id": int(row["id"]),
                "type": row["type"],
                "title": str(title).strip()[:160],
                "summary": str(readable).strip()[:240] or None,
                "source": row["source"],
                "created_at": row["created_at"],
                "lifeline_id": item_lifeline_id,
                "lifeline_name": item_lifeline_name,
            }
        )

    memory_rows = conn.execute(
        f"""
        SELECT id, category, content, detail, status, created_at, updated_at, lifeline_id
        FROM memories
        WHERE NOT (category = 'goal' AND status = 'confirmed') AND {scope_clause}
        ORDER BY updated_at DESC, id DESC
        LIMIT 100
        """,
        scope_params,
    ).fetchall()
    memories = []
    for row in memory_rows:
        memory_lifeline_id, memory_lifeline_name = _lifeline_ref(row["lifeline_id"], names)
        memories.append(
            {
                "id": int(row["id"]),
                "category": row["category"],
                "title": row["content"],
                "detail": row["detail"],
                "status": row["status"],
                "created_at": row["created_at"],
                "updated_at": row["updated_at"],
                "lifeline_id": memory_lifeline_id,
                "lifeline_name": memory_lifeline_name,
            }
        )

    decision_rows = conn.execute(
        f"""
        SELECT
            id, title, context, decision, reasoning, expected_outcome,
            actual_outcome, status, created_at, updated_at, lifeline_id
        FROM decisions
        WHERE {scope_clause}
        ORDER BY updated_at DESC, id DESC
        LIMIT 100
        """,
        scope_params,
    ).fetchall()
    decisions = []
    for row in decision_rows:
        decision_lifeline_id, decision_lifeline_name = _lifeline_ref(row["lifeline_id"], names)
        decisions.append(
            {
                "id": int(row["id"]),
                "title": row["title"],
                "context": row["context"],
                "decision": row["decision"],
                "reasoning": row["reasoning"],
                "expected_outcome": row["expected_outcome"],
                "actual_outcome": row["actual_outcome"],
                "status": row["status"],
                "created_at": row["created_at"],
                "updated_at": row["updated_at"],
                "lifeline_id": decision_lifeline_id,
                "lifeline_name": decision_lifeline_name,
            }
        )

    activity: list[dict[str, Any]] = []
    for task in tasks:
        activity.append(
            _activity_entry(
                kind="task",
                object_id=task["id"],
                title=task["title"],
                summary=task["detail"],
                status=task["status"],
                timestamp=task["completed_at"] or task["updated_at"] or task["created_at"],
                lifeline_id=task["lifeline_id"],
                lifeline_name=task["lifeline_name"],
            )
        )
    for goal in goals:
        activity.append(
            _activity_entry(
                kind="memory",
                object_id=goal["id"],
                title=goal["title"],
                summary=goal["detail"],
                status=(goal["profile"] or {}).get("state"),
                timestamp=goal["updated_at"] or goal["created_at"],
                lifeline_id=goal["lifeline_id"],
                lifeline_name=goal["lifeline_name"],
            )
        )
    for memory in memories:
        activity.append(
            _activity_entry(
                kind="memory",
                object_id=memory["id"],
                title=memory["title"],
                summary=memory["detail"],
                status=memory["status"],
                timestamp=memory["updated_at"] or memory["created_at"],
                lifeline_id=memory["lifeline_id"],
                lifeline_name=memory["lifeline_name"],
            )
        )
    for decision in decisions:
        activity.append(
            _activity_entry(
                kind="decision",
                object_id=decision["id"],
                title=decision["title"],
                summary=decision["decision"],
                status=decision["status"],
                timestamp=decision["updated_at"] or decision["created_at"],
                lifeline_id=decision["lifeline_id"],
                lifeline_name=decision["lifeline_name"],
            )
        )
    for material in materials:
        activity.append(
            _activity_entry(
                kind="item",
                object_id=material["id"],
                title=material["title"],
                summary=material["summary"],
                status=None,
                timestamp=material["created_at"],
                lifeline_id=material["lifeline_id"],
                lifeline_name=material["lifeline_name"],
            )
        )
    activity.sort(key=lambda entry: str(entry["timestamp"]), reverse=True)

    summaries = {entry["raw_id"]: entry for entry in list_lifeline_summaries(conn)}
    selected_summary = summaries[raw_id]
    child_summaries = [
        summaries[child_id]
        for child_id in children_by_parent.get(raw_id, [])
        if child_id in summaries
    ]

    goal_states = [str((goal["profile"] or {}).get("state") or "active") for goal in goals]
    open_actions = sum(
        1
        for task in tasks
        if task["status"] == "todo" and task["goal_state"] in (None, "active")
    )
    held_actions = sum(
        1
        for task in tasks
        if task["status"] == "todo" and task["goal_state"] not in (None, "active")
    )
    completed_actions = sum(1 for task in tasks if task["status"] == "done")
    return {
        "schema_version": "lifeline.context.v1",
        "lifeline": {
            **selected_summary,
            "ancestors": ancestors,
            "children": child_summaries,
        },
        "scope": {
            "lifeline_ids": [entity_id("lifeline", scope_id) for scope_id in scope_ids],
            "descendant_count": max(0, len(scope_ids) - 1),
        },
        "summary": {
            "active_goals": goal_states.count("active"),
            "paused_goals": goal_states.count("paused"),
            "completed_goals": goal_states.count("achieved") + goal_states.count("released"),
            "open_actions": open_actions,
            "held_actions": held_actions,
            "completed_actions": completed_actions,
            "materials": selected_summary["counts"]["materials"],
            "memories": len(memories),
            "decisions": selected_summary["counts"]["decisions"],
            "last_activity_at": selected_summary["last_activity_at"],
        },
        "goals": goals,
        "tasks": tasks[:100],
        "materials": materials,
        "memories": memories,
        "decisions": decisions,
        "activity": activity[:40],
    }
