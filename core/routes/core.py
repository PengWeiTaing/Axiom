"""App shell routes: /app, /sw.js, /health."""
from core._common import *
from flask import render_template_string

def register_routes(app):
        @app.route("/app", methods=["GET"], strict_slashes=False)
        def app_shell():
            return render_template("app.html")
    
    
        @app.route("/sw.js", methods=["GET"])
        def service_worker():
            static_root = Path(app.static_folder or "").resolve()
            return send_file(static_root / "sw.js", mimetype="application/javascript")
    
    
        @app.route("/tools/bookmarklet", methods=["GET"])
        def bookmarklet_page():
            return render_template_string('''<!doctype html><html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Axiom 书签</title>
<style>body{font-family:system-ui;max-width:600px;margin:40px auto;padding:20px;background:#060b14;color:#ddd}
h1{color:#00d4aa}code{background:rgba(255,255,255,.1);padding:2px 6px;border-radius:4px}
.bm{display:inline-block;padding:14px 28px;background:#00d4aa;color:#060b14;border-radius:8px;text-decoration:none;font-weight:bold;margin:16px 0;cursor:grab}
input{padding:10px;width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#ddd;border-radius:6px}
</style></head><body><h1>📥 Axiom 书签工具</h1>
<p>一键保存当前网页。拖按钮到收藏栏即可。</p>
<label>Key:</label><input id="k" placeholder="axiomnb" value="axiomnb" oninput="up()">
<p>拖到收藏栏 → <a id="b" class="bm" href="#">📥 保存到 Axiom</a></p>
<p style="color:#888;font-size:.85rem">浏览任意网页时点一下书签，自动保存标题+链接。选中文字会优先保存选中内容。</p>
<script>function up(){var k=document.getElementById("k").value.trim()||"axiomnb";
document.getElementById("b").href="javascript:"+encodeURIComponent(
"(function(){var t=document.title,s=window.getSelection().toString().trim(),u=location.href,b='"+k+"';var d=s||t+'\\n'+u;var x=new XMLHttpRequest();x.open('POST','https://pengweitai.me/fetch?key='+b,true);x.setRequestHeader('Content-Type','application/json');x.send(JSON.stringify({url:u}));x.onload=function(){if(x.status<400){alert('已保存: '+t)}else{alert('失败')}}})();"
)}up()</script></body></html>''')


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
    
    
