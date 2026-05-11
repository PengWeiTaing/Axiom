"""Governance routes: export, audit-log, modules."""
from core._common import *

def register_routes(app):
    # ===== 治理路由 =====

    @app.route("/item/<int:item_id>", methods=["DELETE"])
    def delete_item(item_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            row = conn.execute(
                f"SELECT id, type, file_path FROM items WHERE id = ?",
                (item_id,),
            ).fetchone()
            if row is None:
                return error_response(404, "not_found", "条目不存在")

            conn.execute("UPDATE memories SET source_item_id = NULL WHERE source_item_id = ?", (item_id,))
            conn.execute("DELETE FROM items WHERE id = ?", (item_id,))
            conn.commit()

            if row["file_path"]:
                file_path = resolve_stored_file_path(row["file_path"])
                if file_path and file_path.exists():
                    cleanup_file(file_path)

            write_audit_log("item_delete", "item", item_id)
            fts_delete_item(item_id)
            logger.info("deleted item id=%s type=%s", item_id, row["type"])
            return ok_response({"deleted": item_id})
        finally:
            conn.close()


    @app.route("/export", methods=["POST"])
    def export_data():
        auth_error = require_key()
        if auth_error:
            return auth_error

        import tempfile
        import zipfile
        from io import BytesIO

        conn = get_db_connection()
        conn.row_factory = sqlite3.Row
        try:
            items_rows = conn.execute("SELECT * FROM items ORDER BY id").fetchall()
            memories_rows = conn.execute("SELECT * FROM memories ORDER BY id").fetchall()
            tasks_rows = conn.execute("SELECT * FROM tasks ORDER BY id").fetchall()
        finally:
            conn.close()

        timestamp = local_date_now().isoformat()
        export_name = f"axiom_export_{timestamp}"

        items_json = json.dumps([dict(r) for r in items_rows], ensure_ascii=False, indent=2)
        memories_json = json.dumps([dict(r) for r in memories_rows], ensure_ascii=False, indent=2)
        tasks_json = json.dumps([dict(r) for r in tasks_rows], ensure_ascii=False, indent=2)

        file_count = 0
        for r in items_rows:
            if r["file_path"]:
                fp = resolve_stored_file_path(r["file_path"])
                if fp and fp.exists():
                    file_count += 1

        manifest = (
            f"Axiom Data Export\n"
            f"exported_at: {utc_now().isoformat(timespec='seconds')}\n"
            f"items: {len(items_rows)}\n"
            f"memories: {len(memories_rows)}\n"
            f"tasks: {len(tasks_rows)}\n"
            f"files: {file_count}\n"
        )

        buf = BytesIO()
        with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
            zf.writestr(f"{export_name}/manifest.txt", manifest)
            zf.writestr(f"{export_name}/items.json", items_json)
            zf.writestr(f"{export_name}/memories.json", memories_json)
            zf.writestr(f"{export_name}/tasks.json", tasks_json)
            for r in items_rows:
                if r["file_path"]:
                    fp = resolve_stored_file_path(r["file_path"])
                    if fp and fp.exists():
                        arcname = f"{export_name}/files/{fp.relative_to(AXIOM_ROOT)}"
                        zf.write(fp, arcname)

        buf.seek(0)
        write_audit_log("export", "system")
        logger.info("exported %d items, %d memories, %d tasks", len(items_rows), len(memories_rows), len(tasks_rows))
        return send_file(
            buf,
            mimetype="application/zip",
            as_attachment=True,
            download_name=f"{export_name}.zip",
        )


    @app.route("/audit-log", methods=["GET"])
    def audit_log():
        auth_error = require_key()
        if auth_error:
            return auth_error

        action = request.args.get("action", "").strip() or None
        target_type = request.args.get("target_type", "").strip() or None
        page = parse_positive_int(request.args.get("page"), "page", 1)
        page_size = parse_positive_int(request.args.get("page_size"), "page_size", DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE)

        conn = get_db_connection()
        try:
            conditions = []
            params = []
            if action:
                conditions.append("action = ?")
                params.append(action)
            if target_type:
                conditions.append("target_type = ?")
                params.append(target_type)
            where = ("WHERE " + " AND ".join(conditions)) if conditions else ""
            total = conn.execute(f"SELECT COUNT(*) FROM audit_log {where}", params).fetchone()[0]
            total_pages = max(1, (total + page_size - 1) // page_size)
            offset = (page - 1) * page_size
            rows = conn.execute(
                f"SELECT * FROM audit_log {where} ORDER BY created_at DESC LIMIT ? OFFSET ?",
                params + [page_size, offset],
            ).fetchall()

            return ok_response({
                "page": page,
                "page_size": page_size,
                "total": total,
                "total_pages": total_pages,
                "entries": [{
                    "id": r["id"],
                    "action": r["action"],
                    "target_type": r["target_type"],
                    "target_id": r["target_id"],
                    "detail": r["detail"],
                    "created_at": r["created_at"],
                } for r in rows],
            })
        finally:
            conn.close()


