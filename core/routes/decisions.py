"""Decision routes."""
from core._common import *

def register_routes(app):
    # ===== 决策路由 =====

    DECISION_SELECT_FIELDS = """
        id, title, context, decision, reasoning,
        expected_outcome, actual_outcome, status, created_at, updated_at
    """

    DECISION_STATUS_LABELS = {"pending": "待回顾", "reviewed": "已回顾"}


    def row_to_decision(row: sqlite3.Row) -> dict:
        return {
            "id": row["id"],
            "title": row["title"],
            "context": row["context"],
            "decision": row["decision"],
            "reasoning": row["reasoning"],
            "expected_outcome": row["expected_outcome"],
            "actual_outcome": row["actual_outcome"],
            "status": row["status"],
            "status_label": DECISION_STATUS_LABELS.get(row["status"], row["status"]),
            "created_at": row["created_at"],
            "updated_at": row["updated_at"],
        }


    @app.route("/decisions", methods=["GET", "POST"])
    def decisions():
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            if request.method == "POST":
                body = request.get_json(silent=True) or {}
                title = str(body.get("title", "")).strip()
                context = str(body.get("context", "")).strip() or None
                decision = str(body.get("decision", "")).strip()
                reasoning = str(body.get("reasoning", "")).strip() or None
                expected_outcome = str(body.get("expected_outcome", "")).strip() or None

                if not title:
                    return error_response(400, "missing_title", "title 不能为空")
                if not decision:
                    return error_response(400, "missing_decision", "decision 不能为空")

                now = utc_now().isoformat(timespec="seconds")
                cursor = conn.execute(
                    "INSERT INTO decisions (title, context, decision, reasoning, expected_outcome, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 'pending', ?, ?)",
                    (title, context, decision, reasoning, expected_outcome, now, now),
                )
                conn.commit()
                did = cursor.lastrowid
                write_audit_log("decision_create", "decision", did)
                row = conn.execute(f"SELECT {DECISION_SELECT_FIELDS} FROM decisions WHERE id = ?", (did,)).fetchone()
                return ok_response({"decision": row_to_decision(row)}, 201)

            status = request.args.get("status", "").strip() or None
            page = parse_positive_int(request.args.get("page"), "page", 1)
            page_size = parse_positive_int(request.args.get("page_size"), "page_size", DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE)

            where = "WHERE status = ?" if status else ""
            params = [status] if status else []
            total = conn.execute(f"SELECT COUNT(*) FROM decisions {where}", params).fetchone()[0]
            total_pages = max(1, (total + page_size - 1) // page_size)
            offset = (page - 1) * page_size

            rows = conn.execute(
                f"SELECT {DECISION_SELECT_FIELDS} FROM decisions {where} ORDER BY created_at DESC LIMIT ? OFFSET ?",
                params + [page_size, offset],
            ).fetchall()

            return ok_response({
                "page": page, "page_size": page_size, "total": total, "total_pages": total_pages,
                "decisions": [row_to_decision(r) for r in rows],
            })
        finally:
            conn.close()


    @app.route("/decisions/<int:decision_id>", methods=["GET", "PUT", "DELETE"])
    def decision_detail(decision_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            row = conn.execute(f"SELECT {DECISION_SELECT_FIELDS} FROM decisions WHERE id = ?", (decision_id,)).fetchone()
            if row is None:
                return error_response(404, "not_found", "决策不存在")

            if request.method == "GET":
                return ok_response({"decision": row_to_decision(row)})

            if request.method == "DELETE":
                conn.execute("DELETE FROM decisions WHERE id = ?", (decision_id,))
                conn.commit()
                write_audit_log("decision_delete", "decision", decision_id)
                return ok_response({"deleted": decision_id})

            body = request.get_json(silent=True) or {}
            title = str(body.get("title", row["title"])).strip()
            context = str(body.get("context", row["context"] or "")).strip() or None
            decision = str(body.get("decision", row["decision"])).strip()
            reasoning = str(body.get("reasoning", row["reasoning"] or "")).strip() or None
            expected_outcome = str(body.get("expected_outcome", row["expected_outcome"] or "")).strip() or None
            actual_outcome = str(body.get("actual_outcome", row["actual_outcome"] or "")).strip() or None

            if not title or not decision:
                return error_response(400, "missing_field", "title 和 decision 不能为空")

            status = "reviewed" if actual_outcome else row["status"]
            now = utc_now().isoformat(timespec="seconds")
            conn.execute(
                "UPDATE decisions SET title=?, context=?, decision=?, reasoning=?, expected_outcome=?, actual_outcome=?, status=?, updated_at=? WHERE id=?",
                (title, context, decision, reasoning, expected_outcome, actual_outcome, status, now, decision_id),
            )
            conn.commit()
            write_audit_log("decision_update", "decision", decision_id)
            row = conn.execute(f"SELECT {DECISION_SELECT_FIELDS} FROM decisions WHERE id = ?", (decision_id,)).fetchone()
            return ok_response({"decision": row_to_decision(row)})
        finally:
            conn.close()


    @app.route("/decisions/<int:decision_id>/review", methods=["POST"])
    def review_decision(decision_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            row = conn.execute("SELECT id FROM decisions WHERE id = ?", (decision_id,)).fetchone()
            if row is None:
                return error_response(404, "not_found", "决策不存在")

            body = request.get_json(silent=True) or {}
            actual_outcome = str(body.get("actual_outcome", "")).strip()
            if not actual_outcome:
                return error_response(400, "missing_outcome", "actual_outcome 不能为空")

            now = utc_now().isoformat(timespec="seconds")
            conn.execute(
                "UPDATE decisions SET actual_outcome = ?, status = 'reviewed', updated_at = ? WHERE id = ?",
                (actual_outcome, now, decision_id),
            )
            conn.commit()
            write_audit_log("decision_review", "decision", decision_id)
            row = conn.execute(f"SELECT {DECISION_SELECT_FIELDS} FROM decisions WHERE id = ?", (decision_id,)).fetchone()
            return ok_response({"decision": row_to_decision(row)})
        finally:
            conn.close()


