"""Cosmos 数据导入 — POST /cosmos/import"""
from core._common import *

TABLE_MAP = {'task': 'tasks', 'memory': 'memories', 'decision': 'decisions', 'item': 'items'}


def _create_entity(conn, kind: str, title: str) -> int | None:
    table = TABLE_MAP.get(kind)
    if not table:
        return None
    if kind == 'memory':
        cur = conn.execute(f"INSERT INTO {table} (category, content) VALUES (?, ?)", ('fact', title))
    elif kind == 'decision':
        cur = conn.execute(f"INSERT INTO {table} (title, decision) VALUES (?, ?)", (title, title))
    elif kind == 'task':
        cur = conn.execute(f"INSERT INTO {table} (title) VALUES (?)", (title,))
    else:
        cur = conn.execute(f"INSERT INTO {table} (content, source, type) VALUES (?, ?, ?)", (title, 'import', 'text'))
    return cur.lastrowid


def _mount_entity(conn, kind: str, raw_id: int, lifeline_id: str):
    table = TABLE_MAP.get(kind)
    if not table:
        return
    conn.execute(f"UPDATE {table} SET lifeline_id = ? WHERE id = ?", (lifeline_id, raw_id))


def _create_association(conn, from_kind: str, from_raw: str, to_kind: str, to_raw: str,
                        relation_type: str, confidence: float, status: str, evidence: list):
    assoc_id = str(uuid4())[:8]
    evidence_json = json.dumps(evidence, ensure_ascii=False) if evidence else '[]'
    conn.execute(
        "INSERT INTO associations (id, from_kind, from_id, to_kind, to_id, relation_type, confidence, status, evidence, created_at) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (assoc_id, from_kind, from_raw, to_kind, to_raw, relation_type, confidence, status, evidence_json,
         datetime.now(timezone.utc).isoformat()),
    )


def register_routes(app):

    @app.route('/cosmos/import', methods=['POST'])
    def cosmos_import():
        auth_error = require_key()
        if auth_error:
            return auth_error

        body = request.get_json(silent=True)
        if not body:
            return error_response(400, 'bad_request', '请求体不能为空')

        if 'entities' not in body or 'associations' not in body:
            return error_response(400, 'bad_request', '缺少 entities 或 associations 字段')

        conn = get_db_connection()
        lifeline_result = {'created': 0, 'updated': 0}
        entity_result = {'created': 0}
        assoc_result = {'created': 0, 'skipped': 0}
        id_map: dict[str, str] = {}

        try:
            for ll in body.get('lifelines', []):
                ll_id = str(ll.get('id', '')).strip()
                ll_name = str(ll.get('name', '')).strip()
                if not ll_id or not ll_name:
                    continue
                parent_id = ll.get('parent_id') or None
                if parent_id == 'ROOT':
                    parent_id = None
                existing = conn.execute("SELECT id FROM lifelines WHERE id = ?", (ll_id,)).fetchone()
                if existing:
                    conn.execute("UPDATE lifelines SET name = ?, parent_id = ? WHERE id = ?", (ll_name, parent_id, ll_id))
                    lifeline_result['updated'] += 1
                else:
                    conn.execute("INSERT INTO lifelines (id, name, parent_id, order_index) VALUES (?, ?, ?, ?)",
                                 (ll_id, ll_name, parent_id, 0))
                    lifeline_result['created'] += 1

            for ent in body.get('entities', []):
                old_id = str(ent.get('id', '')).strip()
                kind = str(ent.get('kind', '')).strip()
                title = str(ent.get('title', '')).strip()
                lifeline_id = ent.get('lifeline_id') or None
                if lifeline_id == 'ROOT':
                    lifeline_id = None

                if not old_id or not kind or not title:
                    continue
                if kind not in ('task', 'memory', 'decision', 'item'):
                    continue

                new_id = _create_entity(conn, kind, title)
                if new_id:
                    id_map[old_id] = f"{kind}:{new_id}"
                    entity_result['created'] += 1
                    if lifeline_id:
                        _mount_entity(conn, kind, new_id, lifeline_id)

            for assoc in body.get('associations', []):
                old_from = str(assoc.get('from', '')).strip()
                old_to = str(assoc.get('to', '')).strip()
                new_from = id_map.get(old_from)
                new_to = id_map.get(old_to)
                if not new_from or not new_to:
                    assoc_result['skipped'] += 1
                    continue

                from_kind, from_raw = new_from.split(':', 1)
                to_kind, to_raw = new_to.split(':', 1)
                relation_type = str(assoc.get('relation_type', 'manual'))
                confidence = float(assoc.get('confidence', 0.5))
                status = str(assoc.get('status', 'accepted'))
                evidence = assoc.get('evidence', [])
                if not isinstance(evidence, list):
                    evidence = []
                _create_association(conn, from_kind, from_raw, to_kind, to_raw, relation_type, confidence, status, evidence)
                assoc_result['created'] += 1

            conn.commit()

            return ok_response({
                'imported': {
                    'lifelines': lifeline_result,
                    'entities': entity_result,
                    'associations': assoc_result,
                }
            })
        except Exception as e:
            conn.rollback()
            logger.exception("cosmos import failed")
            return error_response(500, 'import_failed', str(e))
        finally:
            conn.close()

    return
