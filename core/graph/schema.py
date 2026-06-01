"""Atlas v1 node and edge schema helpers."""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Any


SCHEMA_VERSION = "atlas.v1"
ROOT_ID = "root:axiom"

NODE_LAYER = {
    "root": 0,
    "lifeline": 1,
    "domain": 1,
    "module": 2,
    "cluster": 2,
    "memory": 3,
    "task": 3,
    "decision": 3,
    "item": 4,
}

NODE_LEVEL = {
    0: "root",
    1: "skeleton",
    2: "cluster",
    3: "entity",
    4: "leaf",
}

EDGE_COLOR_FROM = "rgba(180,106,99,0.42)"
EDGE_COLOR_TO = "rgba(95,127,166,0.32)"

RELATION_STYLES = {
    "contains": "solid",
    "same_topic": "solid",
    "co_occurrence": "solid",
    "causal": "directed",
    "derived_from": "arrow",
    "supports": "solid",
    "contradicts": "dashed",
    "tension": "dashed",
    "prerequisite": "dotted",
    "next_action": "arrow",
    "manual": "solid",
}


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def prefixed_id(kind: str, raw_id: int | str) -> str:
    return f"{kind}:{raw_id}"


def make_node(
    *,
    node_id: str,
    node_type: str,
    label: str,
    summary: str = "",
    layer: int | None = None,
    lifeline_id: str | None = None,
    cluster_id: str | None = None,
    module_id: str | None = None,
    weight: float = 0.0,
    centrality: float = 0.0,
    status: str | None = None,
    created_at: str | None = None,
    updated_at: str | None = None,
    visible_label: bool | None = None,
    size: float | None = None,
    raw_id: str | None = None,
    meta: dict[str, Any] | None = None,
) -> dict[str, Any]:
    resolved_layer = NODE_LAYER.get(node_type, 4) if layer is None else layer
    node_size = size if size is not None else _default_node_size(node_type, weight)
    label_visible = (
        resolved_layer <= 2 or weight >= 0.82
        if visible_label is None
        else visible_label
    )
    node = {
        "id": node_id,
        "type": node_type,
        "label": label or node_id,
        "summary": summary or "",
        "layer": resolved_layer,
        "semantic_level": NODE_LEVEL.get(resolved_layer, "leaf"),
        "lifeline_id": lifeline_id,
        "cluster_id": cluster_id,
        "module_id": module_id,
        "weight": round(float(weight or 0.0), 4),
        "centrality": round(float(centrality or 0.0), 4),
        "status": status,
        "created_at": created_at,
        "updated_at": updated_at,
        "visible_label": label_visible,
        "size": round(float(node_size), 3),
        "raw_id": raw_id,
        "layout": {"x": 0.0, "y": 0.0, "z": 0.0},
        "meta": meta or {},
    }
    return node


def make_edge(
    *,
    edge_id: str,
    source: str,
    target: str,
    edge_class: str,
    relation_type: str,
    strength: float,
    confidence: float,
    evidence: str = "",
    generated_by: str = "rule",
    visible_by_default: bool = False,
    layer_delta: int = 0,
) -> dict[str, Any]:
    strength_f = max(0.0, min(1.0, float(strength or 0.0)))
    confidence_f = max(0.0, min(1.0, float(confidence or 0.0)))
    if edge_class == "structural":
        width = 0.65 + 0.25 * strength_f
        opacity = 0.16 + 0.08 * strength_f
        color_from = "rgba(255,255,255,0.15)"
        color_to = "rgba(255,255,255,0.08)"
    else:
        width = 0.75 + 1.45 * strength_f
        opacity = 0.20 + 0.42 * strength_f
        color_from = EDGE_COLOR_FROM
        color_to = EDGE_COLOR_TO
    return {
        "id": edge_id,
        "source": source,
        "target": target,
        "edge_class": edge_class,
        "relation_type": relation_type,
        "strength": round(strength_f, 4),
        "confidence": round(confidence_f, 4),
        "layer_delta": abs(int(layer_delta or 0)),
        "evidence": evidence or "",
        "generated_by": generated_by,
        "visible_by_default": bool(visible_by_default),
        "distance": _edge_distance(abs(int(layer_delta or 0)), strength_f),
        "width": round(width, 3),
        "opacity": round(opacity, 3),
        "color_from": color_from,
        "color_to": color_to,
        "line_style": RELATION_STYLES.get(relation_type, "solid"),
    }


def _default_node_size(node_type: str, weight: float) -> float:
    base = {
        "root": 18.0,
        "lifeline": 13.0,
        "domain": 12.0,
        "module": 11.5,
        "cluster": 10.5,
        "task": 6.8,
        "memory": 6.4,
        "decision": 7.2,
        "item": 4.5,
    }.get(node_type, 4.0)
    return base + max(0.0, min(1.0, weight)) * 4.0


def _edge_distance(layer_delta: int, strength: float) -> float:
    if layer_delta <= 0:
        base = 80.0
    elif layer_delta == 1:
        base = 120.0
    else:
        base = 180.0
    return round(base * (1.2 - max(0.0, min(1.0, strength))), 2)

