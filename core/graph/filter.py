"""Atlas v1 default graph filtering rules."""
from __future__ import annotations

from collections import defaultdict
from typing import Any


MAX_SEMANTIC_PER_NODE = 8


def filter_graph_edges(
    nodes: list[dict[str, Any]],
    edges: list[dict[str, Any]],
) -> tuple[list[dict[str, Any]], int]:
    node_layers = {node["id"]: int(node.get("layer", 4)) for node in nodes}
    structural = [edge for edge in edges if edge.get("edge_class") == "structural"]
    semantic = [edge for edge in edges if edge.get("edge_class") == "semantic"]

    visible_semantic: list[dict[str, Any]] = []
    hidden = 0
    degree_counts: dict[str, int] = defaultdict(int)

    semantic.sort(key=lambda edge: (-float(edge.get("strength") or 0.0), -float(edge.get("confidence") or 0.0)))
    for edge in semantic:
        source = edge["source"]
        target = edge["target"]
        layer_delta = abs(node_layers.get(source, 4) - node_layers.get(target, 4))
        edge["layer_delta"] = layer_delta
        if not _passes_threshold(edge, layer_delta):
            hidden += 1
            continue
        if degree_counts[source] >= MAX_SEMANTIC_PER_NODE or degree_counts[target] >= MAX_SEMANTIC_PER_NODE:
            hidden += 1
            continue
        edge["visible_by_default"] = True
        visible_semantic.append(edge)
        degree_counts[source] += 1
        degree_counts[target] += 1

    return structural + visible_semantic, hidden


def _passes_threshold(edge: dict[str, Any], layer_delta: int) -> bool:
    strength = float(edge.get("strength") or 0.0)
    confidence = float(edge.get("confidence") or 0.0)
    if confidence < 0.45:
        return False
    if not edge.get("evidence"):
        return False
    relation_type = edge.get("relation_type")
    if layer_delta == 0:
        return strength >= 0.65
    if layer_delta == 1:
        return strength >= 0.82
    if relation_type in {"causal", "tension", "contradicts"}:
        return strength >= 0.88
    return False

