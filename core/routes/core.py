"""App shell routes: /app, /sw.js, /health."""
from core._common import *

def register_routes(app):
        @app.route("/app", methods=["GET"], strict_slashes=False)
        def app_shell():
            return render_template("app.html")
    
    
        @app.route("/sw.js", methods=["GET"])
        def service_worker():
            static_root = Path(app.static_folder or "").resolve()
            return send_file(static_root / "sw.js", mimetype="application/javascript")
    
    
        @app.route("/health", methods=["GET"])
        def health_check():
            db_ok = True
            item_count = 0
            fts_count = 0
            conn = None
            try:
                conn = get_db_connection()
                conn.execute("SELECT 1")
                item_count = conn.execute("SELECT COUNT(*) FROM items").fetchone()[0]
                fts_count = conn.execute("SELECT COUNT(*) FROM items_fts").fetchone()[0]
            except sqlite3.Error:
                logger.exception("health check failed")
                db_ok = False
            finally:
                if conn is not None:
                    conn.close()
    
            backup_age = None
            backup_dir = AXIOM_ROOT / "backup"
            if backup_dir.exists():
                backups = sorted(backup_dir.rglob("*.zip"), key=lambda p: p.stat().st_mtime, reverse=True)
                if backups:
                    age = (utc_now() - datetime.fromtimestamp(backups[0].stat().st_mtime, tz=timezone.utc)).total_seconds() / 3600
                    backup_age = round(age, 1)
    
            payload = {
                "service": "axiom-receiver",
                "db": "ok" if db_ok else "error",
                "inbox": "ok" if INBOX_PATH.exists() else "missing",
                "items": item_count,
                "fts_index": fts_count,
                "fts_ok": item_count == fts_count,
                "backup_age_hours": backup_age,
            }
            if not db_ok:
                return error_response(500, "database_error", "数据库不可用")
            return ok_response(payload)
    
    
