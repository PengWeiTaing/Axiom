"""Axiom receiver — main entry point."""
from __future__ import annotations

# Backward compatibility: re-export everything from _common
from core._common import *  # noqa: F401, F403, E402

import logging
import sys
from datetime import datetime, timezone

from core._common import (  # noqa: E402
    app, logger, AXIOM_ROOT, INBOX_PATH, ARCHIVE_PATH, DB_PATH, LOG_PATH,
    init_app_storage, get_db_connection,
    ok_response, error_response,
    AUTOMATION_JOBS,
)

# Route registration — each module defines `register_routes(app)`
from core.routes.core import register_routes as register_core  # noqa: E402
from core.routes.tasks import register_routes as register_tasks  # noqa: E402
from core.routes.memories import register_routes as register_memories  # noqa: E402
from core.routes.decisions import register_routes as register_decisions  # noqa: E402
from core.routes.ai import register_routes as register_ai  # noqa: E402
from core.routes.governance import register_routes as register_governance  # noqa: E402

register_core(app)
register_tasks(app)
register_memories(app)
register_decisions(app)
register_ai(app)
register_governance(app)


# ===== 请求日志中间件 =====

# Simple in-memory rate limiter (60 req/min per IP)
_rate_limits: dict[str, list[float]] = {}
_rate_limit = 120
_rate_window = 60  # seconds


@app.before_request
def check_rate_limit():
    import time as _time
    ip = request.remote_addr or "unknown"
    if ip in ("127.0.0.1", "localhost", "::1"):
        return None
    now = _time.time()
    window_start = now - _rate_window

    if ip not in _rate_limits:
        _rate_limits[ip] = []

    _rate_limits[ip] = [t for t in _rate_limits[ip] if t > window_start]
    if len(_rate_limits[ip]) >= _rate_limit:
        logger.warning("rate limit exceeded for %s", ip)
        return error_response(429, "rate_limited", "请求过于频繁，请稍后再试。")
    _rate_limits[ip].append(now)


@app.before_request
def handle_cors_preflight():
    if request.method == "OPTIONS":
        resp = app.make_default_options_response()
        resp.headers["Access-Control-Allow-Origin"] = "*"
        resp.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        resp.headers["Access-Control-Allow-Headers"] = "Content-Type, X-Axiom-Key"
        return resp


@app.before_request
def log_request_start():
    import time as _time
    import uuid as _uuid
    request._start_time = _time.time()
    request._req_id = str(_uuid.uuid4())[:8]


@app.after_request
def compress_response(response):
    import gzip
    accept = request.headers.get("Accept-Encoding", "")
    if "gzip" not in accept:
        return response
    if response.content_length and response.content_length < 500:
        return response
    if "text/event-stream" in response.content_type:
        return response
    response.data = gzip.compress(response.data)
    response.headers["Content-Encoding"] = "gzip"
    response.headers["Content-Length"] = str(len(response.data))
    return response


@app.after_request
def add_security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    # Cache static assets (24h), disable caching for API responses
    if request.path.startswith("/static/"):
        response.headers["Cache-Control"] = "public, max-age=86400, immutable"
    elif request.path != "/health":
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, X-Axiom-Key"
    return response


@app.after_request
def log_request_end(response):
    import time as _time
    duration_ms = int((_time.time() - getattr(request, "_start_time", _time.time())) * 1000)
    with _metrics_lock:
        _metrics["requests"] += 1
        if response.status_code >= 400:
            _metrics["errors"] += 1
        if duration_ms > 500:
            _metrics["slow"] += 1
    req_id = getattr(request, "_req_id", "--------")
    if duration_ms > 500:
        logger.warning("[%s] SLOW %s %s -> %s (%dms)", req_id, request.method, request.path, response.status_code, duration_ms)
    else:
        logger.info("[%s] %s %s -> %s (%dms)", req_id, request.method, request.path, response.status_code, duration_ms)
    return response


# ===== 错误处理 =====

@app.errorhandler(Exception)
def handle_unexpected_exception(exc: Exception):
    logger.exception("unexpected error: %s", exc)
    return error_response(500, "internal_error", "服务内部错误")


# ===== 模块加载 =====
AXIOM_MODULES: list = []


def init_modules(app):
    global AXIOM_MODULES, AUTOMATION_JOBS
    if AXIOM_MODULES:
        return
    from modules.registry import discover_modules, get_module_dir
    from modules.prompt_loader import PromptLoader

    prompt_loader = PromptLoader()

    for mod in discover_modules():
        AXIOM_MODULES.append(mod)

        for table_name, create_sql in mod.get_db_tables().items():
            conn = get_db_connection()
            try:
                conn.execute(create_sql)
                conn.commit()
            finally:
                conn.close()

        bp = mod.get_blueprint()
        if bp:
            app.register_blueprint(bp)

        jobs = mod.get_automation_jobs()
        if jobs:
            AUTOMATION_JOBS.update(jobs)

        mod_dir = get_module_dir(mod.name)
        if mod_dir:
            prompt_loader.register_module(mod_dir)

        logger.info("Module loaded: %s (%s)", mod.name, mod.label)

    app.config["AXIOM_PROMPT_LOADER"] = prompt_loader


@app.route("/modules", methods=["GET"])
def list_modules():
    from modules.registry import get_all_modules_status
    all_modules = get_all_modules_status()
    return ok_response({
        "modules": [
            {
                "name": m.name,
                "label": m.label,
                "description": m.description,
                "enabled": any(am.name == m.name for am in AXIOM_MODULES),
                "nav_item": m.get_nav_item(),
                **m.get_frontend_metadata(),
            }
            for m in AXIOM_MODULES
        ],
        "all": all_modules,
    })


@app.route("/admin/modules", methods=["GET"])
def admin_modules():
    auth_error = require_key()
    if auth_error:
        return auth_error
    from modules.registry import get_all_modules_status
    return ok_response({"modules": get_all_modules_status()})


@app.route("/admin/modules/<module_name>/enable", methods=["POST"])
def admin_enable_module(module_name: str):
    auth_error = require_key()
    if auth_error:
        return auth_error
    from modules.registry import set_module_enabled
    if set_module_enabled(module_name, True):
        return ok_response({"message": f"模块 {module_name} 已启用，重启后生效。"})
    return error_response(404, "not_found", "模块不存在")


@app.route("/admin/rebuild-fts", methods=["POST"])
def admin_rebuild_fts():
    auth_error = require_key()
    if auth_error:
        return auth_error
    conn = get_db_connection()
    try:
        conn.execute("DELETE FROM items_fts")
        rows = conn.execute("SELECT id, content, original_name, derived_text, transcript_text FROM items").fetchall()
        for r in rows:
            conn.execute(
                "INSERT INTO items_fts(rowid, content, original_name, derived_text, transcript_text) VALUES (?, ?, ?, ?, ?)",
                (r["id"], cjk_tokenize(r["content"]), cjk_tokenize(r["original_name"]),
                 cjk_tokenize(r["derived_text"]), cjk_tokenize(r["transcript_text"])),
            )
        conn.commit()
    finally:
        conn.close()
    write_audit_log("fts_rebuild", "system")
    return ok_response({"message": "FTS5 index rebuilt"})


@app.route("/admin/vacuum", methods=["POST"])
def admin_vacuum():
    auth_error = require_key()
    if auth_error:
        return auth_error
    import time as _time
    before = DB_PATH.stat().st_size if DB_PATH.exists() else 0
    conn = get_db_connection()
    try:
        conn.execute("PRAGMA optimize")
        conn.execute("VACUUM")
        conn.commit()
    finally:
        conn.close()
    after = DB_PATH.stat().st_size
    saved = before - after
    write_audit_log("db_vacuum", "system")
    return ok_response({
        "before_bytes": before,
        "after_bytes": after,
        "saved_bytes": saved,
        "saved_mb": round(saved / (1024 * 1024), 2),
    })


@app.route("/admin/modules/<module_name>/disable", methods=["POST"])
def admin_disable_module(module_name: str):
    auth_error = require_key()
    if auth_error:
        return auth_error
    from modules.registry import set_module_enabled
    if set_module_enabled(module_name, False):
        return ok_response({"message": f"模块 {module_name} 已禁用，重启后生效。"})
    return error_response(404, "not_found", "模块不存在")


@app.route("/system", methods=["GET"])
def system_info():
    import os as _os
    import time as _time
    db_size = DB_PATH.stat().st_size if DB_PATH.exists() else 0
    inbox_count = sum(1 for _ in INBOX_PATH.rglob("*")) if INBOX_PATH.exists() else 0
    archive_count = sum(1 for _ in ARCHIVE_PATH.rglob("*")) if ARCHIVE_PATH.exists() else 0

    backup_dir = AXIOM_ROOT / "backup"
    last_backup = None
    if backup_dir.exists():
        backups = sorted(backup_dir.rglob("*.zip"), key=lambda p: p.stat().st_mtime, reverse=True)
        if backups:
            last_backup = datetime.fromtimestamp(backups[0].stat().st_mtime, tz=timezone.utc).isoformat()

    backup_age_hours = None
    backup_ok = False
    if last_backup:
        age = (datetime.now(timezone.utc) - datetime.fromisoformat(last_backup)).total_seconds() / 3600
        backup_age_hours = round(age, 1)
        backup_ok = age < 48

    conn = get_db_connection()
    try:
        tables = {}
        for table in ["items", "memories", "tasks", "decisions", "audit_log", "automation_runs", "module_state", "schema_migrations"]:
            try:
                tables[table] = conn.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
            except sqlite3.Error:
                tables[table] = 0
        fts_size = conn.execute("SELECT COUNT(*) FROM items_fts").fetchone()[0]

        # Data integrity checks
        orphan_memories = conn.execute(
            "SELECT COUNT(*) FROM memories WHERE source_item_id IS NOT NULL AND source_item_id NOT IN (SELECT id FROM items)"
        ).fetchone()[0]
        orphan_tasks = conn.execute(
            "SELECT COUNT(*) FROM tasks WHERE memory_id IS NOT NULL AND memory_id NOT IN (SELECT id FROM memories)"
        ).fetchone()[0]
        empty_content = conn.execute(
            "SELECT COUNT(*) FROM items WHERE (content IS NULL OR TRIM(content)='') AND (derived_text IS NULL OR TRIM(derived_text)='') AND (transcript_text IS NULL OR TRIM(transcript_text)='')"
        ).fetchone()[0]
        integrity_ok = orphan_memories == 0 and orphan_tasks == 0
    finally:
        conn.close()

    return ok_response({
        "db_size_bytes": db_size,
        "db_size_mb": round(db_size / (1024 * 1024), 2),
        "inbox_files": inbox_count,
        "archive_files": archive_count,
        "fts_index_entries": fts_size,
        "last_backup": last_backup,
        "backup_age_hours": backup_age_hours,
        "backup_ok": backup_ok,
        "tables": tables,
        "migrations": [
            {"version": m["version"], "name": m["name"], "applied_at": m["applied_at"]}
            for m in conn.execute("SELECT version, name, applied_at FROM schema_migrations ORDER BY version").fetchall()
        ],
        "log_size_bytes": Path(LOG_PATH).stat().st_size if LOG_PATH and Path(LOG_PATH).exists() else 0,
        "log_size_mb": round((Path(LOG_PATH).stat().st_size if LOG_PATH and Path(LOG_PATH).exists() else 0) / (1024 * 1024), 2),
        "integrity": {
            "ok": integrity_ok,
            "orphan_memories": orphan_memories,
            "orphan_tasks": orphan_tasks,
            "empty_content_items": empty_content,
        },
    })


def startup_self_check():
    """启动自检：验证 DB、FTS5、目录、模块。"""
    import os as _os
    checks = []
    warnings = []

    # 1. DB
    if DB_PATH.exists():
        checks.append(("db", "ok", f"{DB_PATH.stat().st_size} bytes"))
    else:
        checks.append(("db", "fail", "axiom.db not found"))

    # 2. FTS5
    conn = get_db_connection()
    try:
        fts_count = conn.execute("SELECT COUNT(*) FROM items_fts").fetchone()[0]
        item_count = conn.execute("SELECT COUNT(*) FROM items").fetchone()[0]
        if fts_count == item_count:
            checks.append(("fts5", "ok", f"{fts_count} entries"))
        else:
            warnings.append(f"fts5 mismatch: items={item_count} fts={fts_count}")
            checks.append(("fts5", "warn", f"items={item_count} fts={fts_count}"))
    except sqlite3.Error:
        checks.append(("fts5", "fail", "table missing"))
    finally:
        conn.close()

    # 3. Directories
    for name, path in [("inbox", INBOX_PATH), ("archive", ARCHIVE_PATH)]:
        if path.exists():
            checks.append((name, "ok", str(path)))
        else:
            warnings.append(f"{name} directory missing: {path}")

    # 4. Modules
    checks.append(("modules", "ok", f"{len(AXIOM_MODULES)} loaded"))

    # 5. AI
    if DEEPSEEK_API_KEY:
        checks.append(("ai", "ok", "DeepSeek configured"))
    else:
        checks.append(("ai", "warn", "no API key"))
        warnings.append("AXIOM_DEEPSEEK_API_KEY not set, AI features unavailable")

    # 6. Environment
    for var, label in [("AXIOM_SECRET_KEY", "secret key"), ("AXIOM_ROOT", "root path")]:
        if _os.environ.get(var):
            checks.append((f"env:{var}", "ok", "set"))
        else:
            checks.append((f"env:{var}", "warn", f"using default, set {var} in .env"))
    if not _os.environ.get("AXIOM_HOST"):
        checks.append(("env:AXIOM_HOST", "ok", "using 0.0.0.0 (default)"))

    for name, status, detail in checks:
        level = logging.WARNING if status == "warn" else logging.ERROR if status == "fail" else logging.INFO
        logger.log(level, "startup check %s: %s (%s)", name, status, detail)

    for w in warnings:
        logger.warning("startup warning: %s", w)

    return checks, warnings


# ===== 运行时指标 =====
import threading as _threading
_start_time = datetime.now(timezone.utc)
_metrics_lock = _threading.Lock()
_metrics = {"requests": 0, "errors": 0, "slow": 0}


@app.route("/api", methods=["GET"])
def api_docs():
    """返回所有 API 端点的文档。"""
    routes = []
    for rule in sorted(app.url_map.iter_rules(), key=lambda r: r.rule):
        if rule.rule.startswith("/static") or rule.rule == "/sw.js":
            continue
        methods = sorted(m for m in rule.methods if m not in ("HEAD", "OPTIONS"))
        func = app.view_functions.get(rule.endpoint)
        doc = (func.__doc__ or "").strip().split("\n")[0] if func else ""
        routes.append({
            "path": rule.rule,
            "methods": methods,
            "auth": "none" if rule.rule in ("/health", "/app", "/sw.js") else "X-Axiom-Key",
            "description": doc,
        })

    return ok_response({
        "total": len(routes),
        "routes": routes,
        "auth_header": "X-Axiom-Key",
        "base_url": f"{request.scheme}://{request.host}",
    })


@app.route("/metrics", methods=["GET"])
def metrics():
    uptime = (datetime.now(timezone.utc) - _start_time).total_seconds()
    hours = int(uptime // 3600)
    minutes = int((uptime % 3600) // 60)
    with _metrics_lock:
        m = dict(_metrics)
    total = max(m["requests"], 1)
    return ok_response({
        "uptime": f"{hours}h {minutes}m",
        "requests": m["requests"],
        "errors": m["errors"],
        "error_rate": round(m["errors"] / total * 100, 2),
        "slow_requests": m["slow"],
        "rate_limited_ips": len(_rate_limits),
    })


init_app_storage()
init_modules(app)
startup_self_check()

@app.route("/search/all", methods=["GET"])
def search_all():
    """跨 items、memories、tasks 的统一搜索。"""
    auth_error = require_key()
    if auth_error:
        return auth_error

    q = request.args.get("q", "").strip()
    if not q:
        return error_response(400, "empty_query", "q 不能为空")

    limit = parse_positive_int(request.args.get("limit"), "limit", 20)
    results = {"items": [], "memories": [], "tasks": [], "decisions": []}

    conn = get_db_connection()
    try:
        # 1. Items via FTS5
        fts_q = escape_fts_query(q)
        if fts_q != '""':
            item_rows = conn.execute(
                "SELECT items.id, items.type, items.content, items.created_at, -rank AS score FROM items_fts JOIN items ON items_fts.rowid = items.id WHERE items_fts MATCH ? ORDER BY rank LIMIT ?",
                (fts_q, limit),
            ).fetchall()
            results["items"] = [{"id": r["id"], "type": r["type"], "content": (r["content"] or "")[:200], "created_at": r["created_at"], "score": r["score"]} for r in item_rows]

        # 2. Memories
        like = f"%{escape_like(q)}%"
        mem_rows = conn.execute(
            "SELECT id, category, content, status, created_at FROM memories WHERE content LIKE ? ESCAPE '\\' OR detail LIKE ? ESCAPE '\\' ORDER BY created_at DESC LIMIT ?",
            (like, like, limit),
        ).fetchall()
        results["memories"] = [{"id": r["id"], "category": r["category"], "content": r["content"], "status": r["status"], "created_at": r["created_at"]} for r in mem_rows]

        # 3. Tasks
        task_rows = conn.execute(
            "SELECT id, title, status, priority, created_at FROM tasks WHERE title LIKE ? ESCAPE '\\' OR detail LIKE ? ESCAPE '\\' ORDER BY created_at DESC LIMIT ?",
            (like, like, limit),
        ).fetchall()
        results["tasks"] = [{"id": r["id"], "title": r["title"], "status": r["status"], "priority": r["priority"], "created_at": r["created_at"]} for r in task_rows]

        # 4. Decisions
        dec_rows = conn.execute(
            "SELECT id, title, decision, status, created_at FROM decisions WHERE title LIKE ? ESCAPE '\\' OR decision LIKE ? ESCAPE '\\' OR reasoning LIKE ? ESCAPE '\\' ORDER BY created_at DESC LIMIT ?",
            (like, like, like, limit),
        ).fetchall()
        results["decisions"] = [{"id": r["id"], "title": r["title"], "decision": r["decision"], "status": r["status"], "created_at": r["created_at"]} for r in dec_rows]
    finally:
        conn.close()

    total = sum(len(v) for v in results.values())
    return ok_response({"query": q, "total": total, "results": results})


@app.route("/items/batch", methods=["POST"])
def batch_items():
    """批量操作：归档或删除多条 items。"""
    auth_error = require_key()
    if auth_error:
        return auth_error

    body = request.get_json(silent=True) or {}
    ids = body.get("ids", [])
    action = body.get("action", "").strip()

    if not isinstance(ids, list) or len(ids) == 0:
        return error_response(400, "missing_ids", "ids 必须是非空数组")
    if action not in ("archive", "delete"):
        return error_response(400, "invalid_action", "action 必须是 archive 或 delete")

    success = []
    failed = []
    conn = get_db_connection()
    try:
        for item_id in ids:
            try:
                row = conn.execute("SELECT id, type, file_path FROM items WHERE id = ?", (item_id,)).fetchone()
                if row is None:
                    failed.append({"id": item_id, "reason": "not found"})
                    continue

                if action == "delete":
                    conn.execute("UPDATE memories SET source_item_id = NULL WHERE source_item_id = ?", (item_id,))
                    conn.execute("DELETE FROM items WHERE id = ?", (item_id,))
                    if row["file_path"]:
                        fp = resolve_stored_file_path(row["file_path"])
                        if fp and fp.exists():
                            fp.unlink(missing_ok=True)
                    fts_delete_item(item_id)
                    write_audit_log("item_delete", "item", item_id)
                    success.append(item_id)
                else:  # archive
                    old_path = resolve_stored_file_path(row["file_path"])
                    if old_path and old_path.exists():
                        archive_path = build_archive_file_path(datetime.now(timezone.utc), old_path)
                        archive_path.parent.mkdir(parents=True, exist_ok=True)
                        old_path.rename(archive_path)
                        conn.execute("UPDATE items SET file_path = ? WHERE id = ?", (str(archive_path), item_id))
                    write_audit_log("item_archive", "item", item_id)
                    success.append(item_id)
            except Exception as exc:
                failed.append({"id": item_id, "reason": str(exc)})
        conn.commit()
    finally:
        conn.close()

    return ok_response({"action": action, "success": len(success), "failed": failed})


@app.route("/import", methods=["POST"])
def import_data():
    auth_error = require_key()
    if auth_error:
        return auth_error

    if "file" not in request.files:
        return error_response(400, "missing_file", "需要上传 ZIP 文件（field name: file）")

    uploaded = request.files["file"]
    if not uploaded.filename or not uploaded.filename.endswith(".zip"):
        return error_response(400, "invalid_format", "只支持 .zip 格式的 Axiom 导出文件")

    import tempfile, zipfile
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".zip")
    try:
        uploaded.save(tmp.name)
        imported = {"items": 0, "memories": 0, "tasks": 0, "decisions": 0, "files": 0}

        with zipfile.ZipFile(tmp.name, "r") as zf:
            for name in zf.namelist():
                if name.endswith("items.json"):
                    data = json.loads(zf.read(name).decode("utf-8"))
                    conn = get_db_connection()
                    try:
                        for item in data:
                            try:
                                conn.execute(
                                    "INSERT OR IGNORE INTO items (id, type, content, file_path, source, created_at, original_name, mime_type, size_bytes, derived_text, transcript_text, processing_override) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
                                    (item.get("id"), item.get("type", "text"), item.get("content"), item.get("file_path"), item.get("source"), item.get("created_at"), item.get("original_name"), item.get("mime_type"), item.get("size_bytes"), item.get("derived_text"), item.get("transcript_text"), item.get("processing_override")),
                                )
                                imported["items"] += 1
                            except sqlite3.IntegrityError:
                                pass
                        conn.commit()
                    finally:
                        conn.close()

                if name.endswith("memories.json"):
                    data = json.loads(zf.read(name).decode("utf-8"))
                    conn = get_db_connection()
                    try:
                        for mem in data:
                            try:
                                conn.execute(
                                    "INSERT OR IGNORE INTO memories (id, category, content, detail, status, source_item_id, source_text, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?)",
                                    (mem.get("id"), mem.get("category","fact"), mem.get("content"), mem.get("detail"), mem.get("status","confirmed"), mem.get("source_item_id"), mem.get("source_text"), mem.get("created_at"), mem.get("updated_at", mem.get("created_at"))),
                                )
                                imported["memories"] += 1
                            except sqlite3.IntegrityError:
                                pass
                        conn.commit()
                    finally:
                        conn.close()

                if name.endswith("tasks.json"):
                    data = json.loads(zf.read(name).decode("utf-8"))
                    conn = get_db_connection()
                    try:
                        for task in data:
                            try:
                                conn.execute(
                                    "INSERT OR IGNORE INTO tasks (id, title, detail, status, priority, memory_id, due_date, estimated_minutes, completed_at, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                                    (task.get("id"), task.get("title"), task.get("detail"), task.get("status","todo"), task.get("priority","medium"), task.get("memory_id"), task.get("due_date"), task.get("estimated_minutes"), task.get("completed_at"), task.get("created_at"), task.get("updated_at", task.get("created_at"))),
                                )
                                imported["tasks"] += 1
                            except sqlite3.IntegrityError:
                                pass
                        conn.commit()
                    finally:
                        conn.close()

                if "/files/" in name and not name.endswith("/"):
                    dest = AXIOM_ROOT / "data" / name.split("files/", 1)[1]
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    if not dest.exists():
                        dest.write_bytes(zf.read(name))
                        imported["files"] += 1

        fts_backfill(get_db_connection())
        write_audit_log("data_import", "system")
        return ok_response({"imported": imported})
    except Exception as exc:
        return error_response(500, "import_failed", str(exc))
    finally:
        try:
            Path(tmp.name).unlink()
        except OSError:
            pass


# ===== Webhook 系统 =====
import threading as _threading
_webhooks: list[dict] = []


def fire_webhook(event: str, data: dict) -> None:
    """异步触发 webhook。"""
    for wh in _webhooks:
        if wh.get("event") == event or wh.get("event") == "*":
            def _send(url=wh["url"], payload={"event": event, "data": data}):
                try:
                    import urllib.request as _ur
                    req = _ur.Request(url, data=_json.dumps(payload).encode("utf-8"),
                                       headers={"Content-Type": "application/json"})
                    _ur.urlopen(req, timeout=10)
                except Exception:
                    pass
            _threading.Thread(target=_send, daemon=True).start()


@app.route("/admin/webhooks", methods=["GET", "POST", "DELETE"])
def manage_webhooks():
    auth_error = require_key()
    if auth_error:
        return auth_error

    if request.method == "GET":
        return ok_response({"webhooks": _webhooks})

    if request.method == "DELETE":
        _webhooks.clear()
        return ok_response({"message": "所有 webhook 已清除"})

    body = request.get_json(silent=True) or {}
    url = str(body.get("url", "")).strip()
    event = str(body.get("event", "*")).strip()
    if not url:
        return error_response(400, "missing_url", "url 不能为空")
    _webhooks.append({"url": url, "event": event})
    write_audit_log("webhook_add", "system")
    return ok_response({"webhooks": _webhooks})


if __name__ == "__main__":
    import signal as _signal

    def _graceful_shutdown(signum, frame):
        logger.info("received signal %s, shutting down gracefully", signum)
        sys.exit(0)

    _signal.signal(_signal.SIGTERM, _graceful_shutdown)
    _signal.signal(_signal.SIGINT, _graceful_shutdown)

    # Systemd watchdog: periodically ping via NOTIFY_SOCKET if available
    _notify_socket = os.environ.get("NOTIFY_SOCKET")
    _watchdog_usec = os.environ.get("WATCHDOG_USEC")
    if _notify_socket and _watchdog_usec:
        import socket as _socket
        import time as _time2
        _watchdog_sec = max(int(_watchdog_usec) / 1_000_000 / 3, 1)
        _sock = _socket.socket(_socket.AF_UNIX, _socket.SOCK_DGRAM)
        _sock.connect(_notify_socket)

        def _watchdog_ping():
            while True:
                _time2.sleep(_watchdog_sec)
                try:
                    _sock.send(b"WATCHDOG=1")
                except Exception:
                    break
        import threading as _threading
        _threading.Thread(target=_watchdog_ping, daemon=True).start()
        logger.info("systemd watchdog: interval=%ss", _watchdog_sec)

    import os as _os
    host = _os.environ.get("AXIOM_HOST", "0.0.0.0")
    port = int(_os.environ.get("AXIOM_PORT", "5000"))
    logger.info("starting Axiom receiver on %s:%s", host, port)
    app.run(host=host, port=port)
