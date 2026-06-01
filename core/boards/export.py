"""Learning Board v0.1 — JSON Canvas 导入导出。"""
from __future__ import annotations

import json
import uuid
from typing import Any

from core.boards.mastery import now_iso


JSON_CANVAS_VERSION = "https://jsoncanvas.org/spec/1.0/"


def export_json_canvas(
    board: dict[str, Any],
    widgets: list[dict[str, Any]],
    nodes: list[dict[str, Any]],
) -> dict[str, Any]:
    """将 Axiom board 导出为 JSON Canvas 格式。"""
    canvas_nodes: list[dict[str, Any]] = []
    canvas_edges: list[dict[str, Any]] = []

    node_by_widget = {n["widget_id"]: n for n in nodes}
    widget_by_id = {w["id"]: w for w in widgets}

    for widget_id, node in node_by_widget.items():
        widget = widget_by_id.get(widget_id)
        canvas_node: dict[str, Any] = {
            "id": widget_id,
            "type": "text",
            "x": node.get("x", 0),
            "y": node.get("y", 0),
            "width": node.get("w", 400),
            "height": node.get("h", 300),
        }
        if widget:
            canvas_node["type"] = "text"
            canvas_node["text"] = json.dumps(widget, ensure_ascii=False)
        canvas_nodes.append(canvas_node)

    return {
        "schemaVersion": "1.0",
        "nodes": canvas_nodes,
        "edges": canvas_edges,
        "metadata": {
            "axiom_board_id": board.get("id", ""),
            "axiom_board_title": board.get("title", ""),
            "exported_at": now_iso(),
        },
    }


def import_json_canvas(canvas: dict[str, Any]) -> tuple[dict[str, Any], list[dict[str, Any]], list[dict[str, Any]]]:
    """从 JSON Canvas 导入，返回 (board, widgets, nodes)。"""
    canvas_nodes = canvas.get("nodes", []) if isinstance(canvas, dict) else []
    board_id = f"board_{uuid.uuid4().hex[:12]}"

    board = {
        "id": board_id,
        "title": canvas.get("metadata", {}).get("axiom_board_title", "Imported Canvas"),
        "source_type": "manual",
        "source_ref_id": None,
        "status": "draft",
        "board_version": 1,
        "generation_id": None,
        "created_at": now_iso(),
        "updated_at": now_iso(),
    }

    widgets: list[dict[str, Any]] = []
    nodes: list[dict[str, Any]] = []

    for cn in canvas_nodes:
        text = cn.get("text", "")
        widget_id = cn.get("id", f"widget_{uuid.uuid4().hex[:8]}")
        try:
            spec = json.loads(text) if isinstance(text, str) else text
            if not isinstance(spec, dict):
                spec = {"type": "example_card", "title": str(text)[:80], "input": {}}
        except (json.JSONDecodeError, TypeError):
            spec = {"type": "example_card", "title": str(text)[:80], "input": {}}

        spec["id"] = widget_id
        widgets.append(spec)
        nodes.append({
            "board_id": board_id,
            "widget_id": widget_id,
            "user_id": "default",
            "x": cn.get("x", 0),
            "y": cn.get("y", 0),
            "w": cn.get("width", 400),
            "h": cn.get("height", 300),
            "z_index": 0,
            "size_family": "M",
            "collapsed": 0,
            "hidden": 0,
            "updated_at": now_iso(),
        })

    return board, widgets, nodes
