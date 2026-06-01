"""Lifeline CRUD + Entity 挂载端点."""
import re

from flask import request

from core._common import error_response, get_db_connection, ok_response, require_key
from core.routes.cosmos import PREFIX_TO_TABLE, entity_id

LIFELINE_ID_RE = re.compile(r'^[a-zA-Z0-9_-]+$')
VALID_KINDS = {"item", "task", "memory", "decision"}


def _get_lifeline(conn, raw_id: str):
    """返回 lifeline 行或 None."""
    return conn.execute("SELECT id, name, parent_id, order_index FROM lifelines WHERE id = ?", (raw_id,)).fetchone()


def _lifeline_output(row) -> dict:
    return {
        "id": entity_id("lifeline", row["id"]),
        "name": row["name"],
        "parent_id": entity_id("lifeline", row["parent_id"]) if row["parent_id"] else "ROOT",
        "order_index": row["order_index"],
    }


def register_routes(app):

    # === 创建 lifeline ===
    @app.route("/lifelines", methods=["POST"])
    def lifelines_create():
        auth_error = require_key()
        if auth_error:
            return auth_error

        body = request.get_json(silent=True) or {}
        raw_id = str(body.get("id", "")).strip()
        name = str(body.get("name", "")).strip()
        parent_id_raw = body.get("parent_id")
        order_index = int(body.get("order_index", 0) or 0)

        # 校验 id
        if not raw_id or not LIFELINE_ID_RE.match(raw_id):
            return error_response(400, "invalid_id", "id 只能包含字母、数字、下划线和连字符，不能为空")
        if len(raw_id) > 40:
            return error_response(400, "invalid_id", "id 不能超过 40 个字符")

        # 校验 name
        if not name or len(name) > 40:
            return error_response(400, "invalid_name", "name 不能为空且不能超过 40 个字符")

        # 规范化 parent_id
        if parent_id_raw is None or str(parent_id_raw).strip() == "ROOT" or str(parent_id_raw).strip() == "":
            parent_id_db = None
        else:
            parent_id_db = str(parent_id_raw).strip()

        conn = get_db_connection()
        try:
            # 检查重复 id
            existing = conn.execute("SELECT 1 FROM lifelines WHERE id = ?", (raw_id,)).fetchone()
            if existing:
                return error_response(400, "duplicate_id", f"lifeline id '{raw_id}' 已存在")

            # 检查 parent_id 存在性
            if parent_id_db is not None:
                parent_row = _get_lifeline(conn, parent_id_db)
                if not parent_row:
                    return error_response(400, "parent_not_found", f"父 lifeline '{parent_id_db}' 不存在")

            conn.execute(
                "INSERT INTO lifelines (id, name, parent_id, order_index) VALUES (?, ?, ?, ?)",
                (raw_id, name, parent_id_db, order_index),
            )
            conn.commit()

            row = _get_lifeline(conn, raw_id)
        finally:
            conn.close()

        return ok_response({"lifeline": _lifeline_output(row)})

    # === 编辑 lifeline ===
    @app.route("/lifelines/<path:raw_id>", methods=["PUT"])
    def lifelines_update(raw_id: str):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            row = _get_lifeline(conn, raw_id)
            if not row:
                return error_response(404, "lifeline_not_found", f"lifeline '{raw_id}' 不存在")

            body = request.get_json(silent=True) or {}

            new_name = body.get("name")
            if new_name is not None:
                new_name = str(new_name).strip()
                if not new_name or len(new_name) > 40:
                    return error_response(400, "invalid_name", "name 不能为空且不能超过 40 个字符")

            new_parent_id = body.get("parent_id")
            if new_parent_id is not None:
                raw_parent = str(new_parent_id).strip()
                if raw_parent in ("ROOT", ""):
                    new_parent_id_db = None
                else:
                    new_parent_id_db = raw_parent
                    if new_parent_id_db == raw_id:
                        return error_response(400, "invalid_parent", "不能将 lifeline 设为自身的父节点")
                    if not _get_lifeline(conn, new_parent_id_db):
                        return error_response(400, "parent_not_found", f"父 lifeline '{new_parent_id_db}' 不存在")

                conn.execute("UPDATE lifelines SET parent_id = ? WHERE id = ?", (new_parent_id_db, raw_id))

            if new_name is not None:
                conn.execute("UPDATE lifelines SET name = ? WHERE id = ?", (new_name, raw_id))

            new_order = body.get("order_index")
            if new_order is not None:
                conn.execute("UPDATE lifelines SET order_index = ? WHERE id = ?", (int(new_order), raw_id))

            conn.commit()
            row = _get_lifeline(conn, raw_id)
        finally:
            conn.close()

        return ok_response({"lifeline": _lifeline_output(row)})

    # === 删除 lifeline ===
    @app.route("/lifelines/<path:raw_id>", methods=["DELETE"])
    def lifelines_delete(raw_id: str):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            row = _get_lifeline(conn, raw_id)
            if not row:
                return error_response(404, "lifeline_not_found", f"lifeline '{raw_id}' 不存在")

            # 1. 卸载所有挂载到此 lifeline 的 entity
            unmounted = 0
            for table in ["items", "tasks", "memories", "decisions"]:
                result = conn.execute(
                    f"UPDATE {table} SET lifeline_id = NULL WHERE lifeline_id = ?", (raw_id,)
                )
                unmounted += result.rowcount

            # 2. 子 lifeline 提升到根级
            reparented = conn.execute(
                "UPDATE lifelines SET parent_id = NULL WHERE parent_id = ?", (raw_id,)
            ).rowcount

            # 3. 删除自身
            conn.execute("DELETE FROM lifelines WHERE id = ?", (raw_id,))
            conn.commit()
        finally:
            conn.close()

        return ok_response({
            "message": f"已删除 lifeline:{raw_id}",
            "unmounted_entities": unmounted,
            "reparented_children": reparented,
        })

    # === 挂载/卸载 entity ===
    @app.route("/cosmos/entities/<kind>/<int:entity_raw_id>/lifeline", methods=["PUT"])
    def cosmos_entity_lifeline(kind: str, entity_raw_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error

        if kind not in VALID_KINDS:
            return error_response(400, "invalid_kind", f"kind 必须是 item/task/memory/decision，收到: {kind}")

        table = PREFIX_TO_TABLE[kind]

        body = request.get_json(silent=True) or {}
        lifeline_id_raw = body.get("lifeline_id")

        conn = get_db_connection()
        try:
            # 校验 entity 存在
            entity_row = conn.execute(f"SELECT * FROM {table} WHERE id = ?", (entity_raw_id,)).fetchone()
            if not entity_row:
                return error_response(404, "entity_not_found", f"{kind}:{entity_raw_id} 不存在")

            # 校验 lifeline 存在（非 null 时）
            if lifeline_id_raw is not None:
                lifeline_id_str = str(lifeline_id_raw).strip()
                if not lifeline_id_str:
                    lifeline_id_raw = None
                else:
                    ll_row = _get_lifeline(conn, lifeline_id_str)
                    if not ll_row:
                        return error_response(400, "lifeline_not_found", f"lifeline '{lifeline_id_str}' 不存在")
                    lifeline_id_raw = lifeline_id_str

            conn.execute(
                f"UPDATE {table} SET lifeline_id = ? WHERE id = ?",
                (lifeline_id_raw, entity_raw_id),
            )
            conn.commit()

            # 读取更新后的 entity
            updated = conn.execute(f"SELECT * FROM {table} WHERE id = ?", (entity_raw_id,)).fetchone()
            title = (
                updated["title"] if "title" in updated.keys()
                else updated["content"] if "content" in updated.keys()
                else ""
            )
        finally:
            conn.close()

        return ok_response({
            "entity": {
                "id": entity_id(kind, entity_raw_id),
                "kind": kind,
                "title": (title or "")[:80],
                "lifeline_id": entity_id("lifeline", lifeline_id_raw) if lifeline_id_raw else None,
            },
        })
