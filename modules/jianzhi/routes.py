"""减脂模块路由 — Blueprint 注册在 /m/jianzhi。"""

import json
from datetime import date, datetime, timezone

from flask import Blueprint, request

bp = Blueprint("jianzhi", __name__, url_prefix="/m/jianzhi",
               static_folder="static", static_url_path="/static")

from core.receiver import (  # noqa: E402
    require_key, get_db_connection, ok_response, error_response,
    parse_positive_int, local_date_now,
)
from modules.jianzhi.models import (  # noqa: E402
    JIANZHI_ENTRY_TYPES, insert_entry, row_to_entry,
    query_entries, query_weight_trend, query_stats, ensure_indexes,
)


DEFAULT_PAGE_SIZE = 10
MAX_PAGE_SIZE = 50


def _ensure_indexes():
    conn = get_db_connection()
    try:
        ensure_indexes(conn)
        conn.commit()
    finally:
        conn.close()


@bp.route("/stats", methods=["GET"])
def jianzhi_stats():
    auth_error = require_key()
    if auth_error:
        return auth_error
    conn = get_db_connection()
    try:
        _ensure_indexes()
        return ok_response(query_stats(conn))
    finally:
        conn.close()


@bp.route("/entries", methods=["GET", "POST"])
def entries():
    auth_error = require_key()
    if auth_error:
        return auth_error

    conn = get_db_connection()
    try:
        if request.method == "POST":
            body = request.get_json(silent=True) or {}
            entry_type = str(body.get("entry_type", "")).strip()
            entry_data = body.get("entry_data", {})
            recorded_at = str(body.get("recorded_at", "")).strip()
            source = str(body.get("source", "web_app")).strip()

            if entry_type not in JIANZHI_ENTRY_TYPES:
                return error_response(400, "invalid_entry_type", f"entry_type 不支持: {entry_type}")
            if not recorded_at:
                recorded_at = local_date_now().isoformat()
            if not isinstance(entry_data, dict):
                return error_response(400, "invalid_entry_data", "entry_data 必须是 JSON 对象")

            eid = insert_entry(conn, entry_type, entry_data, recorded_at, source)
            conn.commit()
            row = conn.execute("SELECT * FROM module_jianzhi_entries WHERE id = ?", (eid,)).fetchone()
            return ok_response({"entry": row_to_entry(row)}, 201)

        entry_type = request.args.get("entry_type", "").strip() or None
        date_from = request.args.get("date_from", "").strip() or None
        date_to = request.args.get("date_to", "").strip() or None
        page = parse_positive_int(request.args.get("page"), "page", 1)
        page_size = parse_positive_int(request.args.get("page_size"), "page_size", DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE)

        count_conds = []
        count_params = []
        if entry_type:
            count_conds.append("entry_type = ?")
            count_params.append(entry_type)
        count_where = ("WHERE " + " AND ".join(count_conds)) if count_conds else ""
        count_row = conn.execute(
            f"SELECT COUNT(*) FROM module_jianzhi_entries {count_where}", count_params
        ).fetchone()
        total = count_row[0]
        total_pages = max(1, (total + page_size - 1) // page_size)
        offset = (page - 1) * page_size
        rows = query_entries(conn, entry_type or None, date_from, date_to, page_size, offset)

        return ok_response({
            "page": page, "page_size": page_size, "total": total, "total_pages": total_pages,
            "entries": [row_to_entry(r) for r in rows],
        })
    except ValueError as exc:
        return error_response(400, "invalid_filter", str(exc))
    finally:
        conn.close()


@bp.route("/entries/<int:entry_id>", methods=["GET", "PUT", "DELETE"])
def entry_detail(entry_id: int):
    auth_error = require_key()
    if auth_error:
        return auth_error

    conn = get_db_connection()
    try:
        row = conn.execute("SELECT * FROM module_jianzhi_entries WHERE id = ?", (entry_id,)).fetchone()
        if row is None:
            return error_response(404, "not_found", "记录不存在")

        if request.method == "GET":
            return ok_response({"entry": row_to_entry(row)})

        if request.method == "DELETE":
            conn.execute("DELETE FROM module_jianzhi_entries WHERE id = ?", (entry_id,))
            conn.commit()
            return ok_response({"deleted": entry_id})

        body = request.get_json(silent=True) or {}
        entry_data = body.get("entry_data", json.loads(row["entry_data"]))
        recorded_at = str(body.get("recorded_at", row["recorded_at"])).strip()

        if not isinstance(entry_data, dict):
            return error_response(400, "invalid_entry_data", "entry_data 必须是 JSON 对象")

        conn.execute(
            "UPDATE module_jianzhi_entries SET entry_data = ?, recorded_at = ? WHERE id = ?",
            (json.dumps(entry_data, ensure_ascii=False), recorded_at, entry_id),
        )
        conn.commit()
        row = conn.execute("SELECT * FROM module_jianzhi_entries WHERE id = ?", (entry_id,)).fetchone()
        return ok_response({"entry": row_to_entry(row)})
    finally:
        conn.close()


@bp.route("/weight-trend", methods=["GET"])
def weight_trend():
    auth_error = require_key()
    if auth_error:
        return auth_error
    days = parse_positive_int(request.args.get("days"), "days", 30)
    conn = get_db_connection()
    try:
        rows = query_weight_trend(conn, days)
        return ok_response({
            "days": days,
            "points": [
                {"id": r["id"], "recorded_at": r["recorded_at"],
                 "weight_kg": json.loads(r["entry_data"]).get("weight_kg")}
                for r in rows
            ],
        })
    finally:
        conn.close()
