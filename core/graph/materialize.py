"""Materialize Atlas v1 nodes and edges from existing Axiom tables."""
from __future__ import annotations

import json
import sqlite3
from datetime import datetime, timezone
from typing import Any

from core.graph.clusters import build_type_clusters, representative_members
from core.graph.schema import ROOT_ID, make_edge, make_node, prefixed_id


UNCATEGORIZED_LIFELINE_ID = "lifeline:uncategorized"


def materialize_graph(conn: sqlite3.Connection) -> dict[str, Any]:
    lifelines = _load_lifelines(conn)
    entities = _load_entities(conn)

    unclassified_entities = [
        entity for entity in entities if entity["lifeline_id"] == UNCATEGORIZED_LIFELINE_ID
    ]
    has_uncategorized = bool(unclassified_entities)
    if has_uncategorized and UNCATEGORIZED_LIFELINE_ID not in lifelines:
        lifelines[UNCATEGORIZED_LIFELINE_ID] = {
            "id": UNCATEGORIZED_LIFELINE_ID,
            "type": "lifeline",
            "label": "未归类",
            "summary": "尚未挂载到具体 lifeline 的 backlog / fallback bucket。",
            "order_index": 9999,
            "parent_id": ROOT_ID,
            "weight": 0.16,
            "fallback_bucket": True,
        }

    nodes: list[dict[str, Any]] = [
        make_node(
            node_id=ROOT_ID,
            node_type="root",
            label="Axiom",
            summary="个人外脑认知地图根节点。",
            layer=0,
            weight=1.0,
            visible_label=True,
        )
    ]
    edges: list[dict[str, Any]] = []

    lifeline_names = {lid: lf["label"] for lid, lf in lifelines.items()}
    for lifeline in sorted(lifelines.values(), key=lambda lf: (lf.get("order_index", 0), lf["id"])):
        fallback_bucket = bool(lifeline.get("fallback_bucket") or lifeline["id"] == UNCATEGORIZED_LIFELINE_ID)
        nodes.append(
            make_node(
                node_id=lifeline["id"],
                node_type="lifeline",
                label=lifeline["label"],
                summary=lifeline.get("summary", ""),
                layer=1,
                weight=lifeline.get("weight", 0.16 if fallback_bucket else 0.45),
                visible_label=True,
                meta={
                    "order_index": lifeline.get("order_index", 0),
                    "parent_id": lifeline.get("parent_id"),
                    "fallback_bucket": fallback_bucket,
                },
            )
        )
        edges.append(
            make_edge(
                edge_id=f"struct:{ROOT_ID}->{lifeline['id']}",
                source=ROOT_ID,
                target=lifeline["id"],
                edge_class="structural",
                relation_type="contains",
                strength=0.45 if fallback_bucket else 1.0,
                confidence=1.0,
                visible_by_default=not fallback_bucket,
                layer_delta=1,
            )
        )

    clusters, entity_to_cluster, members_by_cluster = build_type_clusters(lifeline_names, entities)
    nodes.extend(clusters)

    for cluster in clusters:
        fallback_bucket = bool(cluster.get("meta", {}).get("fallback_bucket"))
        edges.append(
            make_edge(
                edge_id=f"struct:{cluster['lifeline_id']}->{cluster['id']}",
                source=cluster["lifeline_id"],
                target=cluster["id"],
                edge_class="structural",
                relation_type="contains",
                strength=0.45 if fallback_bucket else 1.0,
                confidence=1.0,
                visible_by_default=not fallback_bucket,
                layer_delta=1,
            )
        )

    included_entity_ids: set[str] = set()
    for cluster in clusters:
        cid = cluster["id"]
        for entity in representative_members(members_by_cluster.get(cid, [])):
            included_entity_ids.add(entity["id"])
            layer = 4 if entity["type"] == "item" else 3
            nodes.append(
                make_node(
                    node_id=entity["id"],
                    node_type=entity["type"],
                    label=entity["label"],
                    summary=entity.get("summary", ""),
                    layer=layer,
                    lifeline_id=entity["lifeline_id"],
                    cluster_id=cid,
                    weight=entity.get("weight", 0.0),
                    status=entity.get("status"),
                    created_at=entity.get("created_at"),
                    updated_at=entity.get("updated_at"),
                    visible_label=entity["type"] != "item" and entity.get("weight", 0.0) >= 0.72,
                    raw_id=str(entity.get("raw_id")),
                    meta=entity.get("meta", {}),
                )
            )
            fallback_bucket = entity["lifeline_id"] == UNCATEGORIZED_LIFELINE_ID
            edges.append(
                make_edge(
                    edge_id=f"struct:{cid}->{entity['id']}",
                    source=cid,
                    target=entity["id"],
                    edge_class="structural",
                    relation_type="contains",
                    strength=0.45 if fallback_bucket else 0.85,
                    confidence=1.0,
                    visible_by_default=not fallback_bucket,
                    layer_delta=max(1, layer - 2),
                )
            )

    semantic_edges, hidden_semantic_edges = _load_semantic_edges(
        conn,
        visible_node_ids={node["id"] for node in nodes},
        node_layers={node["id"]: node["layer"] for node in nodes},
    )
    edges.extend(semantic_edges)

    return {
        "nodes": nodes,
        "edges": edges,
        "clusters": clusters,
        "hidden_nodes": max(0, len(entities) - len(included_entity_ids)),
        "hidden_semantic_edges": hidden_semantic_edges,
        "entity_to_cluster": entity_to_cluster,
        "unclassified_count": len(unclassified_entities),
        "unclassified_ratio": round(len(unclassified_entities) / max(len(entities), 1), 4),
        "hidden_unclassified_items": sum(
            1 for entity in unclassified_entities if entity["id"] not in included_entity_ids
        ),
    }


def _load_lifelines(conn: sqlite3.Connection) -> dict[str, dict[str, Any]]:
    result: dict[str, dict[str, Any]] = {}
    rows = conn.execute(
        "SELECT id, name, parent_id, order_index, created_at, updated_at FROM lifelines ORDER BY order_index, id"
    ).fetchall()
    for row in rows:
        node_id = prefixed_id("lifeline", row["id"])
        result[node_id] = {
            "id": node_id,
            "type": "lifeline",
            "label": row["name"],
            "summary": "稳定主线 / 人生领域。",
            "order_index": row["order_index"] or 0,
            "parent_id": prefixed_id("lifeline", row["parent_id"]) if row["parent_id"] else ROOT_ID,
            "weight": 0.55,
            "created_at": row["created_at"],
            "updated_at": row["updated_at"],
        }
    return result


def _load_entities(conn: sqlite3.Connection) -> list[dict[str, Any]]:
    entities: list[dict[str, Any]] = []
    for row in conn.execute(
        """
        SELECT id, type, content, original_name, derived_text, transcript_text,
               source, created_at, lifeline_id, processing_override
        FROM items ORDER BY id DESC
        """
    ).fetchall():
        text = _first_text(row["content"], row["derived_text"], row["transcript_text"], row["original_name"])
        entities.append(
            _entity(
                kind="item",
                raw_id=row["id"],
                label=_truncate(text or f"item:{row['id']}"),
                summary=_truncate(text, 180),
                lifeline_raw=row["lifeline_id"],
                created_at=row["created_at"],
                status=row["processing_override"],
                weight=_item_weight(row),
                meta={"source": row["source"], "item_type": row["type"]},
            )
        )

    for row in conn.execute(
        """
        SELECT id, title, detail, status, priority, due_date, completed_at,
               created_at, updated_at, lifeline_id
        FROM tasks ORDER BY id DESC
        """
    ).fetchall():
        entities.append(
            _entity(
                kind="task",
                raw_id=row["id"],
                label=_truncate(row["title"] or f"task:{row['id']}"),
                summary=_truncate(row["detail"], 180),
                lifeline_raw=row["lifeline_id"],
                created_at=row["created_at"],
                updated_at=row["updated_at"],
                status=row["status"],
                weight=_task_weight(row),
                meta={"priority": row["priority"], "due_date": row["due_date"], "completed_at": row["completed_at"]},
            )
        )

    for row in conn.execute(
        """
        SELECT id, category, content, detail, status, source_item_id,
               created_at, updated_at, lifeline_id
        FROM memories ORDER BY id DESC
        """
    ).fetchall():
        entities.append(
            _entity(
                kind="memory",
                raw_id=row["id"],
                label=_truncate(row["content"] or f"memory:{row['id']}"),
                summary=_truncate(row["detail"] or row["content"], 180),
                lifeline_raw=row["lifeline_id"],
                created_at=row["created_at"],
                updated_at=row["updated_at"],
                status=row["status"],
                weight=_memory_weight(row),
                meta={"category": row["category"], "source_item_id": row["source_item_id"]},
            )
        )

    for row in conn.execute(
        """
        SELECT id, title, context, decision, reasoning, expected_outcome,
               actual_outcome, status, created_at, updated_at, lifeline_id
        FROM decisions ORDER BY id DESC
        """
    ).fetchall():
        summary = _first_text(row["decision"], row["reasoning"], row["context"], row["expected_outcome"])
        entities.append(
            _entity(
                kind="decision",
                raw_id=row["id"],
                label=_truncate(row["title"] or row["decision"] or f"decision:{row['id']}"),
                summary=_truncate(summary, 180),
                lifeline_raw=row["lifeline_id"],
                created_at=row["created_at"],
                updated_at=row["updated_at"],
                status=row["status"],
                weight=_decision_weight(row),
                meta={"actual_outcome": row["actual_outcome"]},
            )
        )
    return entities


def _entity(
    *,
    kind: str,
    raw_id: int | str,
    label: str,
    summary: str,
    lifeline_raw: str | None,
    created_at: str | None,
    updated_at: str | None = None,
    status: str | None = None,
    weight: float = 0.0,
    meta: dict[str, Any] | None = None,
) -> dict[str, Any]:
    return {
        "id": prefixed_id(kind, raw_id),
        "type": kind,
        "raw_id": raw_id,
        "label": label,
        "summary": summary or "",
        "lifeline_id": prefixed_id("lifeline", lifeline_raw) if lifeline_raw else UNCATEGORIZED_LIFELINE_ID,
        "created_at": created_at,
        "updated_at": updated_at,
        "status": status,
        "weight": max(0.0, min(1.0, weight)),
        "meta": meta or {},
    }


def _load_semantic_edges(
    conn: sqlite3.Connection,
    *,
    visible_node_ids: set[str],
    node_layers: dict[str, int],
) -> tuple[list[dict[str, Any]], int]:
    rows = conn.execute(
        """
        SELECT id, from_kind, from_id, to_kind, to_id, relation_type,
               confidence, status, evidence, created_at
        FROM associations
        WHERE status != 'rejected'
        ORDER BY confidence DESC, created_at DESC
        """
    ).fetchall()
    edges: list[dict[str, Any]] = []
    hidden = 0
    for row in rows:
        source = prefixed_id(row["from_kind"], row["from_id"])
        target = prefixed_id(row["to_kind"], row["to_id"])
        if source not in visible_node_ids or target not in visible_node_ids:
            hidden += 1
            continue
        confidence = float(row["confidence"] or 0.0)
        layer_delta = abs((node_layers.get(source) or 4) - (node_layers.get(target) or 4))
        evidence = _evidence_text(row["evidence"]) or "由现有 associations 表映射，暂无详细证据。"
        edges.append(
            make_edge(
                edge_id=f"assoc:{row['id']}",
                source=source,
                target=target,
                edge_class="semantic",
                relation_type=row["relation_type"] or "co_occurrence",
                strength=confidence,
                confidence=confidence,
                evidence=evidence,
                generated_by="associations",
                visible_by_default=confidence >= 0.65,
                layer_delta=layer_delta,
            )
        )
    return edges, hidden


def _first_text(*values: Any) -> str:
    for value in values:
        if value is not None and str(value).strip():
            return str(value).strip()
    return ""


def _truncate(value: Any, max_chars: int = 72) -> str:
    text = str(value or "").strip().replace("\n", " ")
    if len(text) <= max_chars:
        return text
    return text[: max_chars - 3].rstrip() + "..."


def _recency_score(created_at: str | None) -> float:
    if not created_at:
        return 0.0
    try:
        dt = datetime.fromisoformat(str(created_at).replace("Z", "+00:00"))
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        days = max(0.0, (datetime.now(timezone.utc) - dt.astimezone(timezone.utc)).total_seconds() / 86400)
        if days <= 7:
            return 0.28
        if days <= 30:
            return 0.18
        if days <= 90:
            return 0.10
    except (TypeError, ValueError):
        return 0.0
    return 0.0


def _item_weight(row: sqlite3.Row) -> float:
    text_ready = any(str(row[key] or "").strip() for key in ("content", "derived_text", "transcript_text"))
    base = 0.32 if text_ready else 0.20
    if row["processing_override"] == "ready":
        base += 0.12
    return min(1.0, base + _recency_score(row["created_at"]))


def _task_weight(row: sqlite3.Row) -> float:
    base = 0.58
    if row["status"] == "todo":
        base += 0.15
    elif row["status"] == "done":
        base -= 0.12
    if row["priority"] == "high":
        base += 0.15
    elif row["priority"] == "low":
        base -= 0.06
    return min(1.0, base + _recency_score(row["created_at"]))


def _memory_weight(row: sqlite3.Row) -> float:
    base = 0.55
    if row["status"] == "confirmed":
        base += 0.14
    elif row["status"] == "candidate":
        base -= 0.06
    if row["category"] == "goal":
        base += 0.12
    return min(1.0, base + _recency_score(row["created_at"]))


def _decision_weight(row: sqlite3.Row) -> float:
    base = 0.68
    if row["status"] == "pending":
        base += 0.10
    return min(1.0, base + _recency_score(row["created_at"]))


def _evidence_text(raw: str | None) -> str:
    if not raw:
        return ""
    try:
        parsed = json.loads(raw)
    except (json.JSONDecodeError, TypeError):
        return str(raw)[:160]
    if isinstance(parsed, list):
        for item in parsed:
            if isinstance(item, dict):
                excerpt = item.get("excerpt") or item.get("text") or item.get("evidence")
                if excerpt:
                    return str(excerpt)[:160]
    if isinstance(parsed, dict):
        return str(parsed.get("excerpt") or parsed.get("text") or parsed)[:160]
    return str(parsed)[:160]
