"""Stable 3D shell layout hints for Atlas v1."""
from __future__ import annotations

import math
from typing import Any

from core.graph.schema import ROOT_ID


PREFERRED_ANGLES = {
    "阅读": 220,
    "Rust 学习": 315,
    "Axiom 开发": 5,
    "财务": 175,
    "财务整理": 176,
    "创作": 110,
    "创作输出": 112,
    "健康": 52,
    "健康管理": 54,
    "社交": 150,
    "未归类": 248,
}


def apply_stable_layout(
    nodes: list[dict[str, Any]],
    edges: list[dict[str, Any]] | None = None,
) -> list[dict[str, Any]]:
    by_id = {node["id"]: node for node in nodes}
    semantic_strength = _semantic_strength_by_node(edges or [])

    root = by_id.get(ROOT_ID)
    if root:
        root["layout"] = _point(0.0, 0.0, 0.0, fixed=True, shell_radius=0.0)

    lifelines = [node for node in nodes if node["type"] == "lifeline"]
    lifelines.sort(key=lambda node: (node.get("meta", {}).get("order_index", 0), node["label"], node["id"]))
    angle_by_lifeline: dict[str, float] = {}
    lifeline_position: dict[str, dict[str, float | bool]] = {}

    used_preferred = set()
    fallback_angles = _even_angles(len(lifelines))
    fallback_index = 0
    for index, lifeline in enumerate(lifelines):
        label = lifeline["label"]
        fallback_bucket = _is_fallback(lifeline)
        if label in PREFERRED_ANGLES and PREFERRED_ANGLES[label] not in used_preferred:
            deg = PREFERRED_ANGLES[label]
            used_preferred.add(deg)
        else:
            deg = fallback_angles[fallback_index]
            fallback_index += 1
        angle = math.radians(deg)
        angle_by_lifeline[lifeline["id"]] = angle
        relevance = max(float(lifeline.get("weight") or 0.0), semantic_strength.get(lifeline["id"], 0.0))
        radius = 94 - relevance * 18
        if fallback_bucket:
            radius = 188
        height = -48 if fallback_bucket else math.sin(angle * 1.7 + index * 0.35) * 34
        layout = _shell_point(radius, angle, height, fixed=True)
        layout["sector_angle"] = round(deg, 3)
        layout["shell_radius"] = round(radius, 3)
        lifeline["layout"] = layout
        lifeline_position[lifeline["id"]] = layout

    clusters_by_lifeline: dict[str, list[dict[str, Any]]] = {}
    for node in nodes:
        if node["type"] == "cluster" and node.get("lifeline_id"):
            clusters_by_lifeline.setdefault(node["lifeline_id"], []).append(node)

    cluster_angles: dict[str, float] = {}
    for lifeline_id, clusters in clusters_by_lifeline.items():
        clusters.sort(key=lambda node: (-node.get("weight", 0), node["label"], node["id"]))
        base = angle_by_lifeline.get(lifeline_id, 0.0)
        fallback_bucket = any(_is_fallback(cluster) for cluster in clusters)
        spread = min(math.radians(54), math.radians(18 + len(clusters) * 9))
        for idx, cluster in enumerate(clusters):
            offset = 0.0 if len(clusters) <= 1 else (idx / (len(clusters) - 1) - 0.5) * spread
            angle = base + offset
            cluster_angles[cluster["id"]] = angle
            strength = max(float(cluster.get("weight") or 0.0), semantic_strength.get(cluster["id"], 0.0))
            radius = 168 + idx * 3.5 - strength * 34
            if _is_fallback(cluster) or fallback_bucket:
                radius += 40
            lifeline_height = float(lifeline_position.get(lifeline_id, {}).get("z", 0.0) or 0.0)
            height = lifeline_height * 0.45 + math.sin(angle * 1.35 + idx * 0.9) * 44
            cluster["layout"] = _shell_point(radius, angle, height, fixed=True)
            cluster["layout"]["sector_angle"] = round(math.degrees(angle), 3)
            cluster["layout"]["shell_radius"] = round(radius, 3)

    entities_by_cluster: dict[str, list[dict[str, Any]]] = {}
    for node in nodes:
        if node["type"] in {"task", "memory", "decision", "item"} and node.get("cluster_id"):
            entities_by_cluster.setdefault(node["cluster_id"], []).append(node)

    for cluster_id, entities in entities_by_cluster.items():
        center = by_id.get(cluster_id, {}).get("layout", {"x": 0.0, "y": 0.0, "z": 0.0})
        base = cluster_angles.get(cluster_id, 0.0)
        entities.sort(key=lambda node: (-node.get("weight", 0), node["label"], node["id"]))
        for idx, entity in enumerate(entities):
            strength = max(float(entity.get("weight") or 0.0), semantic_strength.get(entity["id"], 0.0))
            ring = 12 + (1.0 - strength) * 24 + (idx // 5) * 7
            angle = base + math.radians(-26 + (idx % 5) * 13)
            local_phi = math.radians(-28 + ((idx * 47) % 56))
            cluster_z = float(center.get("z", 0.0) or 0.0)
            entity["layout"] = _point(
                float(center["x"]) + math.cos(angle) * ring * math.cos(local_phi),
                float(center["y"]) + math.sin(angle) * ring * math.cos(local_phi),
                cluster_z + math.sin(local_phi) * ring * 0.82,
                fixed=False,
                shell_radius=round(_distance3(
                    float(center["x"]),
                    float(center["y"]),
                    cluster_z,
                    ROOT_ID,
                    entity,
                ), 3),
            )

    return nodes


def _semantic_strength_by_node(edges: list[dict[str, Any]]) -> dict[str, float]:
    strength: dict[str, float] = {}
    for edge in edges:
        if edge.get("edge_class") != "semantic":
            continue
        value = float(edge.get("strength") or edge.get("confidence") or 0.0)
        strength[edge["source"]] = max(strength.get(edge["source"], 0.0), value)
        strength[edge["target"]] = max(strength.get(edge["target"], 0.0), value)
    return strength


def _even_angles(count: int) -> list[float]:
    if count <= 0:
        return []
    start = -10
    return [start + idx * (360 / count) for idx in range(count)]


def _shell_point(radius: float, angle: float, height: float, *, fixed: bool) -> dict[str, float | bool]:
    horizontal_radius = math.sqrt(max(0.0, radius * radius - height * height * 0.38))
    return _point(
        math.cos(angle) * horizontal_radius,
        math.sin(angle) * horizontal_radius,
        height,
        fixed=fixed,
        shell_radius=radius,
    )


def _point(
    x: float,
    y: float,
    z: float,
    *,
    fixed: bool,
    shell_radius: float,
) -> dict[str, float | bool]:
    return {
        "x": round(x, 2),
        "y": round(y, 2),
        "z": round(z, 2),
        "fixed": fixed,
        "shell_radius": round(shell_radius, 3),
    }


def _distance3(x: float, y: float, z: float, _root_id: str, _entity: dict[str, Any]) -> float:
    return math.sqrt(x * x + y * y + z * z)


def _is_fallback(node: dict[str, Any]) -> bool:
    meta = node.get("meta") or {}
    return bool(meta.get("fallback_bucket") or node.get("id") == "lifeline:uncategorized")
