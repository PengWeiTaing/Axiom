"""Cosmos routes — Atlas 球形树数据源."""
from core._common import *

PREFIX_TO_TABLE = {
    "item": "items",
    "task": "tasks",
    "memory": "memories",
    "decision": "decisions",
    "lifeline": "lifelines",
}

TABLE_TO_PREFIX = {v: k for k, v in PREFIX_TO_TABLE.items()}


def entity_id(kind: str, row_id: int | str) -> str:
    """拼接前缀 ID，如 task:42、lifeline:L1.1。"""
    return f"{kind}:{row_id}"


def _truncate(text: str | None, max_chars: int = 80) -> str:
    if not text:
        return ""
    text = str(text).strip()
    if len(text) <= max_chars:
        return text
    return text[: max_chars - 3].rstrip() + "..."


def register_routes(app):

    @app.route("/cosmos", methods=["GET"])
    def get_cosmos():
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            # lifelines
            lifeline_rows = conn.execute(
                "SELECT id, name, parent_id, order_index FROM lifelines ORDER BY order_index, id"
            ).fetchall()
            lifelines = [
                {
                    "id": entity_id("lifeline", r["id"]),
                    "name": r["name"],
                    "parent_id": entity_id("lifeline", r["parent_id"]) if r["parent_id"] else "ROOT",
                    "order_index": r["order_index"],
                }
                for r in lifeline_rows
            ]

            # entities: 聚合四表，只取有 lifeline_id 的
            entities: list[dict] = []

            for r in conn.execute(
                "SELECT id, content, original_name, lifeline_id FROM items WHERE lifeline_id IS NOT NULL ORDER BY id"
            ).fetchall():
                entities.append({
                    "id": entity_id("item", r["id"]),
                    "kind": "item",
                    "title": _truncate(r["content"] or r["original_name"] or ""),
                    "lifeline_id": entity_id("lifeline", r["lifeline_id"]),
                })

            for r in conn.execute(
                "SELECT id, title, priority, status, lifeline_id FROM tasks WHERE lifeline_id IS NOT NULL ORDER BY id"
            ).fetchall():
                entities.append({
                    "id": entity_id("task", r["id"]),
                    "kind": "task",
                    "title": _truncate(r["title"] or ""),
                    "lifeline_id": entity_id("lifeline", r["lifeline_id"]),
                    "meta": {"priority": r["priority"], "status": r["status"]},
                })

            for r in conn.execute(
                "SELECT id, content, lifeline_id FROM memories WHERE lifeline_id IS NOT NULL ORDER BY id"
            ).fetchall():
                entities.append({
                    "id": entity_id("memory", r["id"]),
                    "kind": "memory",
                    "title": _truncate(r["content"] or ""),
                    "lifeline_id": entity_id("lifeline", r["lifeline_id"]),
                })

            for r in conn.execute(
                "SELECT id, title, lifeline_id FROM decisions WHERE lifeline_id IS NOT NULL ORDER BY id"
            ).fetchall():
                entities.append({
                    "id": entity_id("decision", r["id"]),
                    "kind": "decision",
                    "title": _truncate(r["title"] or ""),
                    "lifeline_id": entity_id("lifeline", r["lifeline_id"]),
                })

            # associations
            assoc_rows = conn.execute(
                "SELECT id, from_kind, from_id, to_kind, to_id, relation_type, confidence, status, evidence FROM associations ORDER BY id"
            ).fetchall()
            associations = []
            for r in assoc_rows:
                evidence = []
                if r["evidence"]:
                    try:
                        evidence = json.loads(r["evidence"])
                    except (json.JSONDecodeError, TypeError):
                        evidence = []
                associations.append({
                    "id": r["id"],
                    "from": entity_id(r["from_kind"], r["from_id"]),
                    "to": entity_id(r["to_kind"], r["to_id"]),
                    "relation_type": r["relation_type"],
                    "confidence": r["confidence"],
                    "status": r["status"],
                    "evidence": evidence,
                })

            return ok_response({
                "schema_version": "0.1",
                "root": {"id": "ROOT", "name": "我"},
                "lifelines": lifelines,
                "entities": entities,
                "associations": associations,
            })
        finally:
            conn.close()
