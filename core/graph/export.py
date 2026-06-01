"""Atlas v1 graph payload export."""
from __future__ import annotations

import hashlib
import json
import sqlite3
from typing import Any

from core.graph.filter import filter_graph_edges
from core.graph.layout import apply_stable_layout
from core.graph.materialize import materialize_graph
from core.graph.schema import SCHEMA_VERSION, now_iso


def build_atlas_graph_payload(conn: sqlite3.Connection, *, max_nodes: int = 300) -> dict[str, Any]:
    materialized = materialize_graph(conn)
    nodes = apply_stable_layout(materialized["nodes"], materialized["edges"])
    if len(nodes) > max_nodes:
        nodes = _trim_nodes(nodes, max_nodes)

    visible_ids = {node["id"] for node in nodes}
    candidate_edges = [
        edge
        for edge in materialized["edges"]
        if edge["source"] in visible_ids and edge["target"] in visible_ids
    ]
    edges, hidden_by_filter = filter_graph_edges(nodes, candidate_edges)
    hidden_edges = materialized["hidden_semantic_edges"] + hidden_by_filter

    payload = {
        "schema_version": SCHEMA_VERSION,
        "mode": "global",
        "nodes": nodes,
        "edges": edges,
        "view": {
            "max_nodes": max_nodes,
            "node_count": len(nodes),
            "edge_count": len(edges),
            "hidden_nodes": materialized["hidden_nodes"],
            "hidden_edges": hidden_edges,
            "layout": "semantic_shell_sector_v2",
            "unclassified_count": materialized.get("unclassified_count", 0),
            "unclassified_ratio": materialized.get("unclassified_ratio", 0),
            "hidden_unclassified_items": materialized.get("hidden_unclassified_items", 0),
            "generated_at": now_iso(),
        },
    }
    payload["view"]["graph_hash"] = graph_hash(payload)
    return payload


def build_local_atlas_payload(
    conn: sqlite3.Connection,
    *,
    center: str,
    depth: int = 1,
    max_nodes: int = 40,
) -> dict[str, Any]:
    global_payload = build_atlas_graph_payload(conn, max_nodes=500)
    nodes_by_id = {node["id"]: node for node in global_payload["nodes"]}
    if center not in nodes_by_id:
        return {
            "schema_version": SCHEMA_VERSION,
            "mode": "local",
            "nodes": [],
            "edges": [],
            "view": {
                "center": center,
                "depth": depth,
                "max_nodes": max_nodes,
                "hidden_nodes": 0,
                "hidden_edges": 0,
                "generated_at": now_iso(),
            },
        }

    selected = {center}
    frontier = {center}
    all_edges = global_payload["edges"]
    for _ in range(max(1, depth)):
        next_frontier = set()
        for edge in all_edges:
            if edge["source"] in frontier:
                next_frontier.add(edge["target"])
            if edge["target"] in frontier:
                next_frontier.add(edge["source"])
        selected.update(next_frontier)
        frontier = next_frontier

    ordered_ids = sorted(selected, key=lambda node_id: (0 if node_id == center else 1, nodes_by_id[node_id]["layer"], -nodes_by_id[node_id]["weight"]))
    if len(ordered_ids) > max_nodes:
        ordered_ids = ordered_ids[:max_nodes]
    selected = set(ordered_ids)
    nodes = [nodes_by_id[node_id] for node_id in ordered_ids]
    edges = [
        edge
        for edge in all_edges
        if edge["source"] in selected and edge["target"] in selected
    ][:80]
    return {
        "schema_version": SCHEMA_VERSION,
        "mode": "local",
        "nodes": nodes,
        "edges": edges,
        "view": {
            "center": center,
            "depth": depth,
            "max_nodes": max_nodes,
            "hidden_nodes": max(0, len(selected) - len(nodes)),
            "hidden_edges": max(0, len([e for e in all_edges if e["source"] in selected or e["target"] in selected]) - len(edges)),
            "generated_at": now_iso(),
        },
    }


def write_graph_snapshot(conn: sqlite3.Connection, payload: dict[str, Any]) -> dict[str, int]:
    conn.execute("DELETE FROM graph_nodes")
    conn.execute("DELETE FROM graph_edges")
    conn.execute("DELETE FROM graph_clusters")
    conn.execute("DELETE FROM graph_layout_cache")

    for node in payload["nodes"]:
        conn.execute(
            """
            INSERT INTO graph_nodes (
                id, entity_type, entity_id, title, summary, layer, semantic_level,
                lifeline_id, cluster_id, module_id, weight, centrality, status,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                node["id"],
                node["type"],
                str(node.get("raw_id") or node["id"]),
                node["label"],
                node.get("summary", ""),
                node["layer"],
                node.get("semantic_level"),
                node.get("lifeline_id"),
                node.get("cluster_id"),
                node.get("module_id"),
                node.get("weight", 0),
                node.get("centrality", 0),
                node.get("status"),
                node.get("created_at"),
                node.get("updated_at"),
            ),
        )
        if node["type"] == "cluster":
            meta = node.get("meta") or {}
            conn.execute(
                """
                INSERT INTO graph_clusters (
                    id, label, summary, lifeline_id, module_id, item_count,
                    entity_count, weight, generated_by, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    node["id"],
                    node["label"],
                    node.get("summary", ""),
                    node.get("lifeline_id"),
                    node.get("module_id"),
                    int(meta.get("item_count") or 0),
                    int(meta.get("entity_count") or 0),
                    node.get("weight", 0),
                    meta.get("cluster_kind", "topic_cluster_v1"),
                    node.get("created_at"),
                    node.get("updated_at"),
                ),
            )

    now = now_iso()
    for edge in payload["edges"]:
        conn.execute(
            """
            INSERT INTO graph_edges (
                source_id, target_id, edge_class, relation_type, strength,
                confidence, layer_delta, evidence, generated_by,
                visible_by_default, last_seen_at, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                edge["source"],
                edge["target"],
                edge["edge_class"],
                edge["relation_type"],
                edge["strength"],
                edge["confidence"],
                edge.get("layer_delta", 0),
                edge.get("evidence", ""),
                edge.get("generated_by"),
                1 if edge.get("visible_by_default") else 0,
                now,
                now,
                now,
            ),
        )

    layout_json = json.dumps(
        {node["id"]: node.get("layout", {}) for node in payload["nodes"]},
        ensure_ascii=False,
        sort_keys=True,
    )
    conn.execute(
        """
        INSERT INTO graph_layout_cache (
            view_id, dimension, center_node_id, graph_hash, layout_json, generated_at
        ) VALUES (?, ?, ?, ?, ?, ?)
        """,
        ("global", "2d", None, payload["view"]["graph_hash"], layout_json, now),
    )
    conn.commit()
    return {"nodes": len(payload["nodes"]), "edges": len(payload["edges"])}


def graph_hash(payload: dict[str, Any]) -> str:
    compact = json.dumps(
        {
            "nodes": [(n["id"], n["type"], n.get("weight")) for n in payload.get("nodes", [])],
            "edges": [(e["source"], e["target"], e["relation_type"], e.get("strength")) for e in payload.get("edges", [])],
        },
        sort_keys=True,
        ensure_ascii=False,
    )
    return hashlib.sha256(compact.encode("utf-8")).hexdigest()[:16]


def _trim_nodes(nodes: list[dict[str, Any]], max_nodes: int) -> list[dict[str, Any]]:
    required = [node for node in nodes if node["layer"] <= 2]
    optional = [node for node in nodes if node["layer"] > 2]
    optional.sort(key=lambda node: (-node.get("weight", 0), node["layer"], node["id"]))
    return required + optional[: max(0, max_nodes - len(required))]
