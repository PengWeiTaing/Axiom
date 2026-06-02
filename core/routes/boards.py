"""Learning Board v0.1 — Flask blueprint routes, registered at /api/learning/*."""
from __future__ import annotations

import json
import uuid

from flask import request

from core._common import (
    error_response,
    get_db_connection,
    ok_response,
    parse_positive_int,
    require_key,
    write_audit_log,
)
from core.boards.mastery import mastery_bucket, now_iso

USER_ID = "default"


def register_routes(app):

    # ---- Board CRUD ----

    @app.route("/api/learning/boards/generate", methods=["POST"])
    def learning_generate_board():
        auth_error = require_key()
        if auth_error:
            return auth_error

        body = request.get_json(silent=True) or {}
        goal = (body.get("goal") or "").strip()
        if not goal:
            return error_response(400, "missing_goal", "goal 不能为空")

        source_refs = body.get("source_refs") or []
        allowed_types = body.get("allowed_widget_types") or None
        max_widgets = parse_positive_int(body.get("max_widgets"), "max_widgets", 6, 12)

        from core.boards.generator import generate_board

        try:
            result = generate_board(
                goal,
                source_refs=source_refs,
                allowed_widget_types=allowed_types,
                max_widgets=max_widgets,
            )
        except RuntimeError as exc:
            return error_response(500, "generation_failed", str(exc))

        board = result["board"]
        widgets = result["widgets"]
        nodes = result["nodes"]
        gen = result["generation"]

        conn = get_db_connection()
        try:
            from core.boards.schema import ensure_board_tables
            ensure_board_tables(conn)

            conn.execute(
                """INSERT INTO boards (id, user_id, title, source_type, source_ref_id,
                   status, board_version, generation_id, created_at, updated_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (board["id"], USER_ID, board["title"], board["source_type"],
                 board.get("source_ref_id"), board["status"], board["board_version"],
                 board["generation_id"], now_iso(), now_iso()),
            )

            for ref in source_refs:
                if isinstance(ref, dict) and ref.get("kind") and ref.get("id"):
                    conn.execute(
                        """INSERT OR IGNORE INTO board_refs
                           (board_id, ref_kind, ref_id, ref_role, created_at)
                           VALUES (?, ?, ?, ?, ?)""",
                        (board["id"], ref["kind"], str(ref["id"]),
                         ref.get("role", "source"), now_iso()),
                    )

            for widget in widgets:
                conn.execute(
                    """INSERT INTO widgets (id, board_id, type, title, spec_version,
                       spec_json, source_refs_json, locked_by_user, pinned_by_user,
                       generation_id, created_at, updated_at)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (widget["id"], board["id"], widget["type"], widget["title"],
                     widget.get("spec_version", "1.0.0"),
                     json.dumps(widget, ensure_ascii=False),
                     json.dumps(source_refs, ensure_ascii=False) if source_refs else None,
                     0, 0, widget.get("provenance", {}).get("generation_id"),
                     now_iso(), now_iso()),
                )

            for node in nodes:
                conn.execute(
                    """INSERT OR REPLACE INTO board_nodes (board_id, widget_id, user_id,
                       x, y, w, h, z_index, size_family, collapsed, hidden, updated_at)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (board["id"], node["widget_id"], USER_ID,
                     node.get("x", 48), node.get("y", 48),
                     node.get("w", 520), node.get("h", 320),
                     node.get("z_index", 0),
                     node.get("size_family", "M"),
                     node.get("collapsed", 0), node.get("hidden", 0),
                     now_iso()),
                )

            conn.execute(
                """INSERT INTO board_generations (id, board_id, prompt_template_version,
                   model_id, seed, temperature, input_snapshot_hash, raw_output,
                   normalized_output, validator_report_json, created_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (gen["id"], gen["board_id"], gen["prompt_template_version"],
                 gen["model_id"], gen["seed"], gen["temperature"],
                 gen["input_snapshot_hash"], gen["raw_output"],
                 gen["normalized_output"], gen["validator_report_json"], now_iso()),
            )

            conn.commit()
            write_audit_log("board_generated", "board", None,
                            f"board_id={board['id']} goal={goal[:80]}")
        finally:
            conn.close()

        return ok_response({
            "board_id": board["id"],
            "generation_id": gen["id"],
            "board": board,
            "widgets": widgets,
            "nodes": nodes,
        })

    @app.route("/api/learning/boards", methods=["POST"])
    def learning_create_board():
        """手动创建 board（不入 AI 生成流水线）。"""
        auth_error = require_key()
        if auth_error:
            return auth_error

        body = request.get_json(silent=True) or {}
        title = (body.get("title") or "").strip()
        if not title:
            return error_response(400, "missing_title", "title 不能为空")
        source_type = body.get("source_type", "manual")
        if source_type not in ("goal", "memory", "task", "decision", "lifeline", "cosmos", "manual"):
            source_type = "manual"

        board_id = f"board_{uuid.uuid4().hex[:12]}"
        widgets = body.get("widgets") or []
        nodes = body.get("nodes") or []

        from core.boards.widget_spec import validate_board_widgets
        issues = validate_board_widgets(widgets)
        if issues:
            return error_response(400, "invalid_widgets", json.dumps(issues, ensure_ascii=False))

        conn = get_db_connection()
        try:
            from core.boards.schema import ensure_board_tables
            ensure_board_tables(conn)

            conn.execute(
                """INSERT INTO boards (id, user_id, title, source_type, source_ref_id,
                   status, board_version, generation_id, created_at, updated_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (board_id, USER_ID, title, source_type,
                 body.get("source_ref_id"), "ready", 1, None, now_iso(), now_iso()),
            )

            for widget in widgets:
                wid = widget.get("id") or f"widget_{uuid.uuid4().hex[:8]}"
                conn.execute(
                    """INSERT INTO widgets (id, board_id, type, title, spec_version,
                       spec_json, source_refs_json, locked_by_user, pinned_by_user,
                       generation_id, created_at, updated_at)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (wid, board_id, widget["type"], widget.get("title", widget["type"]),
                     widget.get("spec_version", "1.0.0"),
                     json.dumps(widget, ensure_ascii=False),
                     json.dumps(widget.get("source_refs", []), ensure_ascii=False),
                     0, 0, None, now_iso(), now_iso()),
                )

            for node in nodes:
                conn.execute(
                    """INSERT OR REPLACE INTO board_nodes (board_id, widget_id, user_id,
                       x, y, w, h, z_index, size_family, collapsed, hidden, updated_at)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (board_id, node["widget_id"], USER_ID,
                     node.get("x", 48), node.get("y", 48),
                     node.get("w", 520), node.get("h", 320),
                     node.get("z_index", 0),
                     node.get("size_family", "M"),
                     node.get("collapsed", 0), node.get("hidden", 0),
                     now_iso()),
                )

            conn.commit()
            write_audit_log("board_created", "board", None, f"board_id={board_id} title={title[:80]}")
        finally:
            conn.close()

        return ok_response({"board_id": board_id, "widget_count": len(widgets), "node_count": len(nodes)}, 201)

    @app.route("/api/learning/boards", methods=["GET"])
    def learning_list_boards():
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            from core.boards.schema import ensure_board_tables
            ensure_board_tables(conn)
            rows = conn.execute(
                """SELECT b.id, b.title, b.source_type, b.status, b.created_at,
                   (SELECT COUNT(*) FROM widgets w WHERE w.board_id = b.id) AS widget_count
                   FROM boards b
                   WHERE b.user_id = ?
                   ORDER BY b.created_at DESC""",
                (USER_ID,),
            ).fetchall()
        finally:
            conn.close()

        boards = [
            {
                "id": r["id"], "title": r["title"],
                "source_type": r["source_type"], "status": r["status"],
                "created_at": r["created_at"], "widget_count": r["widget_count"],
            }
            for r in rows
        ]
        return ok_response({"boards": boards})

    @app.route("/api/learning/boards/<board_id>", methods=["GET"])
    def learning_get_board(board_id: str):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            from core.boards.schema import ensure_board_tables
            ensure_board_tables(conn)

            board_row = conn.execute(
                "SELECT * FROM boards WHERE id = ? AND user_id = ?",
                (board_id, USER_ID),
            ).fetchone()
            if board_row is None:
                return error_response(404, "board_not_found", f"board 不存在: {board_id}")

            widget_rows = conn.execute(
                "SELECT * FROM widgets WHERE board_id = ? ORDER BY created_at",
                (board_id,),
            ).fetchall()

            node_rows = conn.execute(
                "SELECT * FROM board_nodes WHERE board_id = ? AND user_id = ?",
                (board_id, USER_ID),
            ).fetchall()

            mastery_rows = conn.execute(
                """SELECT concept_key, score, evidence_count, recent_correct_rate,
                   hint_rate, avg_latency_ms, last_reviewed_at
                   FROM mastery WHERE user_id = ?""",
                (USER_ID,),
            ).fetchall()
        finally:
            conn.close()

        board = dict(board_row)
        widgets = []
        for w in widget_rows:
            wd = dict(w)
            wd.pop("spec_json", None)
            wd.pop("source_refs_json", None)
            widgets.append(wd)

        nodes = [dict(n) for n in node_rows]

        mastery_summary = {
            "total_concepts": len(mastery_rows),
            "by_bucket": {"weak": 0, "developing": 0, "proficient": 0, "mastered": 0},
            "concepts": [],
        }
        for m in mastery_rows:
            md = dict(m)
            bucket = mastery_bucket(md["score"])
            mastery_summary["by_bucket"][bucket] += 1
            mastery_summary["concepts"].append(dict(md))

        return ok_response({
            "board": board,
            "widgets": widgets,
            "nodes": nodes,
            "mastery_summary": mastery_summary,
        })

    @app.route("/api/learning/boards/<board_id>/layout", methods=["PATCH"])
    def learning_update_layout(board_id: str):
        auth_error = require_key()
        if auth_error:
            return auth_error

        body = request.get_json(silent=True) or {}
        updates = body.get("updates")
        if not updates or not isinstance(updates, list):
            return error_response(400, "missing_updates", "updates 必须是非空数组")

        conn = get_db_connection()
        try:
            from core.boards.schema import ensure_board_tables
            ensure_board_tables(conn)

            for upd in updates:
                widget_id = upd.get("widget_id")
                if not widget_id:
                    continue
                conn.execute(
                    """UPDATE board_nodes
                       SET x = COALESCE(?, x), y = COALESCE(?, y),
                           w = COALESCE(?, w), h = COALESCE(?, h),
                           size_family = COALESCE(?, size_family),
                           collapsed = COALESCE(?, collapsed),
                           hidden = COALESCE(?, hidden),
                           updated_at = ?
                       WHERE board_id = ? AND widget_id = ? AND user_id = ?""",
                    (upd.get("x"), upd.get("y"), upd.get("w"), upd.get("h"),
                     upd.get("size_family"), upd.get("collapsed"),
                     upd.get("hidden"), now_iso(),
                     board_id, widget_id, USER_ID),
                )

            conn.commit()
            write_audit_log("board_layout_updated", "board", None,
                            f"board_id={board_id} updates={len(updates)}")
        finally:
            conn.close()

        return ok_response({"updated_at": now_iso()})

    @app.route("/api/learning/boards/<board_id>", methods=["DELETE"])
    def learning_delete_board(board_id: str):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            from core.boards.schema import ensure_board_tables
            ensure_board_tables(conn)

            existing = conn.execute(
                "SELECT id FROM boards WHERE id = ? AND user_id = ?",
                (board_id, USER_ID),
            ).fetchone()
            if existing is None:
                return error_response(404, "board_not_found", f"board 不存在: {board_id}")

            conn.execute("DELETE FROM boards WHERE id = ?", (board_id,))
            conn.commit()
            write_audit_log("board_deleted", "board", None, f"board_id={board_id}")
        finally:
            conn.close()

        return ok_response({"deleted": board_id})

    # ---- Widget event + regenerate ----

    @app.route("/api/learning/widgets/<widget_id>/event", methods=["POST"])
    def learning_widget_event(widget_id: str):
        auth_error = require_key()
        if auth_error:
            return auth_error

        body = request.get_json(silent=True) or {}
        event_type = (body.get("event_type") or "").strip()
        if not event_type:
            return error_response(400, "missing_event_type", "event_type 不能为空")

        idempotency_key = body.get("idempotency_key")
        payload = body.get("payload", {})

        conn = get_db_connection()
        try:
            from core.boards.schema import ensure_board_tables
            ensure_board_tables(conn)

            widget_row = conn.execute(
                "SELECT board_id FROM widgets WHERE id = ?", (widget_id,)
            ).fetchone()
            if widget_row is None:
                return error_response(404, "widget_not_found", f"widget 不存在: {widget_id}")

            board_id = widget_row["board_id"]

            if idempotency_key:
                dup = conn.execute(
                    "SELECT id FROM widget_events WHERE idempotency_key = ?",
                    (idempotency_key,),
                ).fetchone()
                if dup:
                    return ok_response({"accepted": True, "idempotent": True,
                                        "mastery_delta": None, "review_actions": [],
                                        "task_actions": [], "memory_actions": []})

            event_id = f"evt_{uuid.uuid4().hex[:12]}"
            conn.execute(
                """INSERT INTO widget_events (id, user_id, board_id, widget_id,
                   event_type, event_payload_json, client_ts, server_ts, idempotency_key)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (event_id, USER_ID, board_id, widget_id, event_type,
                 json.dumps(payload, ensure_ascii=False),
                 body.get("client_ts"), now_iso(), idempotency_key),
            )

            from core.boards.writeback import process_widget_event
            event_record = {
                "widget_id": widget_id,
                "event_type": event_type,
                "event_payload_json": payload,
                "user_id": USER_ID,
            }
            result = process_widget_event(conn, event_record)

            conn.commit()
        finally:
            conn.close()

        return ok_response(result)

    @app.route("/api/learning/widgets/<widget_id>/regenerate", methods=["POST"])
    def learning_regenerate_widget(widget_id: str):
        auth_error = require_key()
        if auth_error:
            return auth_error

        body = request.get_json(silent=True) or {}
        reason = body.get("reason", "")
        preserve_layout = body.get("preserve_layout", False)

        conn = get_db_connection()
        try:
            from core.boards.schema import ensure_board_tables
            ensure_board_tables(conn)
            existing = conn.execute(
                "SELECT id FROM widgets WHERE id = ?", (widget_id,)
            ).fetchone()
            if existing is None:
                return error_response(404, "widget_not_found", f"widget 不存在: {widget_id}")
        finally:
            conn.close()

        write_audit_log("widget_regenerate_requested", "widget", None,
                        f"widget_id={widget_id} reason={reason}")

        return ok_response({"widget_id": widget_id, "message": "not yet implemented"})

    # ---- Review queue ----

    @app.route("/api/learning/reviews/queue", methods=["GET"])
    def learning_review_queue():
        auth_error = require_key()
        if auth_error:
            return auth_error

        due_before = request.args.get("due_before", "").strip()

        conn = get_db_connection()
        try:
            from core.boards.schema import ensure_board_tables
            ensure_board_tables(conn)

            conditions = ["user_id = ?", "status = 'todo'"]
            params: list = [USER_ID]

            if due_before:
                conditions.append("scheduled_for <= ?")
                params.append(due_before)

            where = " AND ".join(conditions)
            rows = conn.execute(
                f"""SELECT * FROM review_queue
                   WHERE {where}
                   ORDER BY priority DESC, scheduled_for ASC""",
                params,
            ).fetchall()
        finally:
            conn.close()

        items = [dict(r) for r in rows]
        return ok_response({"items": items})

    # ---- Board search ----

    @app.route("/api/learning/boards/<board_id>/search", methods=["GET"])
    def learning_board_search(board_id: str):
        auth_error = require_key()
        if auth_error:
            return auth_error

        q = request.args.get("q", "").strip()
        if not q:
            return error_response(400, "missing_query", "q 不能为空")

        conn = get_db_connection()
        try:
            from core.boards.schema import ensure_board_tables
            ensure_board_tables(conn)

            safe_q = q.replace('"', '""')
            rows = conn.execute(
                """SELECT id AS widget_id, title, board_id,
                   substr(title, 1, 120) AS snippet
                   FROM widgets
                   WHERE board_id = ? AND (title LIKE ? OR spec_json LIKE ?)
                   LIMIT 20""",
                (board_id, f"%{safe_q}%", f"%{safe_q}%"),
            ).fetchall()
        finally:
            conn.close()

        hits = [
            {
                "widget_id": r["widget_id"],
                "title": r["title"],
                "snippet": r["snippet"],
                "highlight": r["snippet"],
            }
            for r in rows
        ]
        return ok_response({"hits": hits})
