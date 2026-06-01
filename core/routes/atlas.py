"""Atlas v1 API routes."""
from __future__ import annotations

from flask import request

from core._common import (
    error_response,
    get_db_connection,
    ok_response,
    parse_positive_int,
    require_key,
)
from core.graph.export import build_atlas_graph_payload, build_local_atlas_payload, write_graph_snapshot
from core.routes.frontend_shell import serve_vite_app


def register_routes(app):
    @app.route("/atlas", methods=["GET"], strict_slashes=False)
    def atlas_shell():
        return serve_vite_app(app)

    @app.route("/api/atlas/graph", methods=["GET"])
    def atlas_graph():
        auth_error = require_key()
        if auth_error:
            return auth_error

        max_nodes = parse_positive_int(request.args.get("max_nodes"), "max_nodes", 300, 1000)
        conn = get_db_connection()
        try:
            payload = build_atlas_graph_payload(conn, max_nodes=max_nodes)
            return ok_response(payload)
        finally:
            conn.close()

    @app.route("/api/atlas/local", methods=["GET"])
    def atlas_local():
        auth_error = require_key()
        if auth_error:
            return auth_error

        center = request.args.get("center", "").strip()
        if not center:
            return error_response(400, "missing_center", "center 不能为空")
        depth = parse_positive_int(request.args.get("depth"), "depth", 1, 3)
        max_nodes = parse_positive_int(request.args.get("max_nodes"), "max_nodes", 40, 120)
        conn = get_db_connection()
        try:
            payload = build_local_atlas_payload(conn, center=center, depth=depth, max_nodes=max_nodes)
            return ok_response(payload)
        finally:
            conn.close()

    @app.route("/api/atlas/node/<path:node_id>", methods=["GET"])
    def atlas_node(node_id: str):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            payload = build_atlas_graph_payload(conn, max_nodes=1000)
            for node in payload["nodes"]:
                if node["id"] == node_id:
                    return ok_response({"node": node})
            return error_response(404, "node_not_found", f"节点不存在: {node_id}")
        finally:
            conn.close()

    @app.route("/api/atlas/rebuild", methods=["POST"])
    def atlas_rebuild():
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            payload = build_atlas_graph_payload(conn, max_nodes=1000)
            result = write_graph_snapshot(conn, payload)
            return ok_response({"rebuilt": result, "view": payload["view"]})
        finally:
            conn.close()

    return
