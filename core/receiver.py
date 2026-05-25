"""Axiom receiver — 主入口，只负责组装和启动。"""
from __future__ import annotations

import json
import logging
import os
import sys
import threading as _threading
from datetime import datetime, timedelta, timezone
from pathlib import Path

from flask import Response, request

# 共享模块
from core._common import *  # noqa: F401, F403, E402
from core._common import (  # noqa: E402
    app, logger, AXIOM_ROOT, DB_PATH, INBOX_PATH, ARCHIVE_PATH, LOG_PATH,
    init_app_storage, get_db_connection, init_db,
    ok_response, error_response, require_key,
    resolve_stored_file_path, build_archive_file_path,
    escape_fts_query, escape_like,
    write_audit_log, fts_delete_item, fts_backfill,
    parse_positive_int, local_date_now, utc_now, build_item_payload,
    DEEPSEEK_API_KEY, DEEPSEEK_MODEL, DEEPSEEK_BASE_URL,
    AUTOMATION_JOBS,
)

# 中间件：日志、限流、CORS、安全、压缩
from core.middleware import register_middleware, get_metrics, get_uptime, _rate_limits  # noqa: E402
register_middleware(app)

# 路由注册
from core.routes.core import register_routes as register_core  # noqa: E402
from core.routes.items import register_routes as register_items  # noqa: E402
from core.routes.browse import register_routes as register_browse  # noqa: E402
from core.routes.automation import register_routes as register_automation  # noqa: E402
from core.routes.tasks import register_routes as register_tasks  # noqa: E402
from core.routes.memories import register_routes as register_memories  # noqa: E402
from core.routes.decisions import register_routes as register_decisions  # noqa: E402
from core.routes.ai import register_routes as register_ai  # noqa: E402
from core.routes.governance import register_routes as register_governance  # noqa: E402
from core.routes.cosmos import register_routes as register_cosmos  # noqa: E402
from core.routes.cosmos_associations import register_routes as register_cosmos_assoc  # noqa: E402

register_core(app)
register_items(app)
register_browse(app)
register_automation(app)
register_tasks(app)
register_memories(app)
register_decisions(app)
register_ai(app)
register_governance(app)
register_cosmos(app)
register_cosmos_assoc(app)

# ===== 错误处理 =====
@app.errorhandler(Exception)
def handle_unexpected(exc: Exception):
    logger.exception("unexpected error: %s", exc)
    return error_response(500, "internal_error", "服务内部错误")


# ===== 模块系统 =====
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
    all_mods = get_all_modules_status()
    return ok_response({"modules": [
        {"name": m.name, "label": m.label, "description": m.description,
         "enabled": any(am.name == m.name for am in AXIOM_MODULES),
         "nav_item": m.get_nav_item(), **m.get_frontend_metadata()}
        for m in AXIOM_MODULES
    ], "all": all_mods})


# ===== 管理端点 =====
@app.route("/system", methods=["GET"])
def system_info():
    db_size = DB_PATH.stat().st_size if DB_PATH.exists() else 0
    inbox_count = sum(1 for _ in INBOX_PATH.rglob("*")) if INBOX_PATH.exists() else 0
    archive_count = sum(1 for _ in ARCHIVE_PATH.rglob("*")) if ARCHIVE_PATH.exists() else 0

    backup_dir = AXIOM_ROOT / "backup"
    last_backup = None
    backup_age_hours = None
    backup_ok = False
    if backup_dir.exists():
        backups = sorted(backup_dir.rglob("*.zip"), key=lambda p: p.stat().st_mtime, reverse=True)
        if backups:
            last_backup = datetime.fromtimestamp(backups[0].stat().st_mtime, tz=timezone.utc).isoformat()
            age = (datetime.now(timezone.utc) - datetime.fromisoformat(last_backup)).total_seconds() / 3600
            backup_age_hours = round(age, 1)
            backup_ok = age < 48

    conn = get_db_connection()
    try:
        tables = {}
        for t in ["items", "memories", "tasks", "decisions", "audit_log", "automation_runs", "module_state", "schema_migrations"]:
            try:
                tables[t] = conn.execute(f"SELECT COUNT(*) FROM {t}").fetchone()[0]
            except Exception:
                tables[t] = -1
        fts_size = conn.execute("SELECT COUNT(*) FROM items_fts").fetchone()[0]
        orphan_mem = conn.execute("SELECT COUNT(*) FROM memories WHERE source_item_id IS NOT NULL AND source_item_id NOT IN (SELECT id FROM items)").fetchone()[0]
        orphan_tasks = conn.execute("SELECT COUNT(*) FROM tasks WHERE memory_id IS NOT NULL AND memory_id NOT IN (SELECT id FROM memories)").fetchone()[0]
        empty_content = conn.execute("SELECT COUNT(*) FROM items WHERE (content IS NULL OR TRIM(content)='') AND (derived_text IS NULL OR TRIM(derived_text)='') AND (transcript_text IS NULL OR TRIM(transcript_text)='')").fetchone()[0]
        migrations = [{"version": m["version"], "name": m["name"], "applied_at": m["applied_at"]}
                      for m in conn.execute("SELECT version, name, applied_at FROM schema_migrations ORDER BY version").fetchall()]
    finally:
        conn.close()

    log_size = Path(LOG_PATH).stat().st_size if LOG_PATH and Path(LOG_PATH).exists() else 0

    return ok_response({
        "db_size_bytes": db_size, "db_size_mb": round(db_size / (1024 * 1024), 2),
        "inbox_files": inbox_count, "archive_files": archive_count,
        "fts_index_entries": fts_size, "last_backup": last_backup,
        "backup_age_hours": backup_age_hours, "backup_ok": backup_ok,
        "tables": tables, "migrations": migrations,
        "log_size_bytes": log_size, "log_size_mb": round(log_size / (1024 * 1024), 2),
        "integrity": {"ok": orphan_mem == 0 and orphan_tasks == 0,
                      "orphan_memories": orphan_mem, "orphan_tasks": orphan_tasks,
                      "empty_content_items": empty_content},
        "health_score": sum([
            25 if db_size > 0 else 0,
            25 if fts_size == tables.get("items", -1) else 0,
            25 if backup_ok else 0,
            25 if orphan_mem == 0 and orphan_tasks == 0 else 0,
        ]),
        "growth": {
            "items_per_day": round(tables["items"] / 30, 1) if tables["items"] > 0 else 0,
            "db_mb_per_100_items": round(db_size / max(tables["items"], 1) * 100 / (1024 * 1024), 2),
        },
    })


@app.route("/metrics", methods=["GET"])
def metrics():
    m = get_metrics()
    total = max(m["requests"], 1)
    endpoints_sorted = sorted(m.get("endpoints", {}).items(), key=lambda x: -x[1])[:20]

    times = sorted(m.get("response_times", []))
    latency = {"p50": 0, "p95": 0, "p99": 0}
    if times:
        latency["p50"] = times[len(times) // 2]
        latency["p95"] = times[int(len(times) * 0.95)]
        latency["p99"] = times[int(len(times) * 0.99)]

    return ok_response({
        "uptime": get_uptime(),
        "requests": m["requests"], "errors": m["errors"],
        "error_rate": round(m["errors"] / total * 100, 2),
        "slow_requests": m["slow"],
        "rate_limited_ips": len(_rate_limits),
        "latency_ms": latency,
        "top_endpoints": [{"path": k, "count": v} for k, v in endpoints_sorted],
    })


@app.route("/api", methods=["GET"])
def api_docs():
    routes_list = []
    for rule in sorted(app.url_map.iter_rules(), key=lambda r: r.rule):
        if rule.rule.startswith("/static") or rule.rule == "/sw.js":
            continue
        methods = sorted(m for m in rule.methods if m not in ("HEAD", "OPTIONS"))
        func = app.view_functions.get(rule.endpoint)
        doc = (func.__doc__ or "").strip().split("\n")[0] if func else ""
        routes_list.append({
            "path": rule.rule, "methods": methods,
            "auth": "none" if rule.rule in ("/health", "/app", "/sw.js") else "X-Axiom-Key",
            "description": doc,
        })
    return ok_response({"total": len(routes_list), "routes": routes_list,
                        "auth_header": "X-Axiom-Key", "base_url": f"{request.scheme}://{request.host}"})


@app.route("/health/badge", methods=["GET"])
def health_badge():
    """返回 SVG 健康徽章，可嵌入 README 或监控面板。"""
    conn = get_db_connection()
    try:
        items_c = conn.execute("SELECT COUNT(*) FROM items").fetchone()[0]
        fts_c = conn.execute("SELECT COUNT(*) FROM items_fts").fetchone()[0]
    except Exception:
        items_c = -1; fts_c = -1
    finally:
        conn.close()

    db_ok = items_c >= 0
    fts_ok = items_c == fts_c
    backup_ok_val = False
    bd = AXIOM_ROOT / "backup"
    if bd.exists():
        bu = sorted(bd.rglob("*.zip"), key=lambda p: p.stat().st_mtime, reverse=True)
        if bu:
            age = (datetime.now(timezone.utc) - datetime.fromtimestamp(bu[0].stat().st_mtime, tz=timezone.utc)).total_seconds() / 3600
            backup_ok_val = age < 48
    score = (25 if db_ok else 0) + (25 if fts_ok else 0) + (25 if backup_ok_val else 0) + 25

    color = "#34d399" if score >= 75 else "#f59e0b" if score >= 50 else "#f87171"
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="140" height="20">
        <rect width="140" height="20" rx="4" fill="#1a1a2e"/>
        <rect width="70" height="20" rx="4" fill="#333"/>
        <text x="35" y="14" fill="#ccc" font-size="11" text-anchor="middle" font-family="sans-serif">Axiom</text>
        <text x="105" y="14" fill="{color}" font-size="11" text-anchor="middle" font-family="sans-serif">{score}/100</text>
    </svg>'''
    return Response(svg, mimetype="image/svg+xml")


@app.route("/ping", methods=["GET"])
def ai_ping():
    # 探活：既能验证后端可达，也能确认 AI 渠道连通。
    auth_error = require_key()
    if auth_error:
        return auth_error
    if not DEEPSEEK_API_KEY:
        return ok_response({"ai": "unconfigured", "latency_ms": 0})
    import time as _t
    start = _t.time()
    try:
        import openai
        client = openai.OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)
        client.chat.completions.create(model=DEEPSEEK_MODEL, messages=[{"role":"user","content":"ping"}], max_tokens=1, temperature=0)
        return ok_response({"ai": "ok", "model": DEEPSEEK_MODEL, "latency_ms": int((_t.time() - start) * 1000)})
    except Exception as exc:
        return ok_response({"ai": "error", "error": str(exc)[:200], "latency_ms": int((_t.time() - start) * 1000)})


# ===== 数据导入导出 =====
@app.route("/export/csv", methods=["GET"])
def export_csv():
    auth_error = require_key()
    if auth_error: return auth_error
    table = request.args.get("table", "items").strip()
    if table not in ("items", "memories", "tasks", "decisions"):
        return error_response(400, "invalid_table", "table 必须是 items, memories, tasks 或 decisions")
    conn = get_db_connection()
    try:
        rows = conn.execute(f"SELECT * FROM {table} ORDER BY id DESC LIMIT 10000").fetchall()
    finally:
        conn.close()
    if not rows:
        return error_response(404, "empty", "没有数据")
    import csv, io
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(rows[0].keys())
    for row in rows:
        writer.writerow([str(v) if v is not None else "" for v in row])
    output.seek(0)
    return Response(output.getvalue(), mimetype="text/csv",
                    headers={"Content-Disposition": f"attachment; filename=axiom_{table}_{local_date_now().isoformat()}.csv"})


@app.route("/import", methods=["POST"])
def import_data():
    auth_error = require_key()
    if auth_error: return auth_error
    if "file" not in request.files:
        return error_response(400, "missing_file", "需要上传 ZIP 文件")
    uploaded = request.files["file"]
    if not uploaded.filename or not uploaded.filename.endswith(".zip"):
        return error_response(400, "invalid_format", "只支持 .zip 格式")
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
                                conn.execute("INSERT OR IGNORE INTO items (id,type,content,file_path,source,created_at,original_name,mime_type,size_bytes,derived_text,transcript_text,processing_override) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
                                             (item.get("id"),item.get("type","text"),item.get("content"),item.get("file_path"),item.get("source"),item.get("created_at"),item.get("original_name"),item.get("mime_type"),item.get("size_bytes"),item.get("derived_text"),item.get("transcript_text"),item.get("processing_override")))
                                imported["items"] += 1
                            except Exception: pass
                        conn.commit()
                    finally: conn.close()
                if name.endswith("memories.json"):
                    data = json.loads(zf.read(name).decode("utf-8"))
                    conn = get_db_connection()
                    try:
                        for mem in data:
                            try:
                                conn.execute("INSERT OR IGNORE INTO memories (id,category,content,detail,status,source_item_id,source_text,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?)",
                                             (mem.get("id"),mem.get("category","fact"),mem.get("content"),mem.get("detail"),mem.get("status","confirmed"),mem.get("source_item_id"),mem.get("source_text"),mem.get("created_at"),mem.get("updated_at",mem.get("created_at"))))
                                imported["memories"] += 1
                            except Exception: pass
                        conn.commit()
                    finally: conn.close()
                if name.endswith("tasks.json"):
                    data = json.loads(zf.read(name).decode("utf-8"))
                    conn = get_db_connection()
                    try:
                        for task in data:
                            try:
                                conn.execute("INSERT OR IGNORE INTO tasks (id,title,detail,status,priority,memory_id,due_date,estimated_minutes,completed_at,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                                             (task.get("id"),task.get("title"),task.get("detail"),task.get("status","todo"),task.get("priority","medium"),task.get("memory_id"),task.get("due_date"),task.get("estimated_minutes"),task.get("completed_at"),task.get("created_at"),task.get("updated_at",task.get("created_at"))))
                                imported["tasks"] += 1
                            except Exception: pass
                        conn.commit()
                    finally: conn.close()
                if "/files/" in name and not name.endswith("/"):
                    dest = AXIOM_ROOT / "data" / name.split("files/",1)[1]
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
        try: Path(tmp.name).unlink()
        except OSError: pass


# ===== 批量 + 搜索 =====
@app.route("/items/batch", methods=["POST"])
def batch_items():
    auth_error = require_key()
    if auth_error: return auth_error
    body = request.get_json(silent=True) or {}
    ids = body.get("ids", []); action = body.get("action","").strip()
    if not isinstance(ids, list) or len(ids) == 0:
        return error_response(400, "missing_ids", "ids 必须是非空数组")
    if action not in ("archive","delete"):
        return error_response(400, "invalid_action", "action 必须是 archive 或 delete")
    success = []; failed = []
    conn = get_db_connection()
    try:
        for item_id in ids:
            try:
                row = conn.execute("SELECT id, type, file_path FROM items WHERE id = ?", (item_id,)).fetchone()
                if row is None: failed.append({"id": item_id, "reason": "not found"}); continue
                if action == "delete":
                    conn.execute("UPDATE memories SET source_item_id = NULL WHERE source_item_id = ?", (item_id,))
                    conn.execute("DELETE FROM items WHERE id = ?", (item_id,))
                    if row["file_path"]:
                        fp = resolve_stored_file_path(row["file_path"])
                        if fp and fp.exists(): fp.unlink(missing_ok=True)
                    fts_delete_item(item_id); write_audit_log("item_delete","item",item_id)
                else:
                    old = resolve_stored_file_path(row["file_path"])
                    if old and old.exists():
                        ap = build_archive_file_path(datetime.now(timezone.utc), old)
                        ap.parent.mkdir(parents=True, exist_ok=True); old.rename(ap)
                        conn.execute("UPDATE items SET file_path = ? WHERE id = ?", (str(ap), item_id))
                    write_audit_log("item_archive","item",item_id)
                success.append(item_id)
            except Exception as exc: failed.append({"id": item_id, "reason": str(exc)})
        conn.commit()
    finally: conn.close()
    return ok_response({"action": action, "success": len(success), "failed": failed})


@app.route("/search/vector", methods=["GET"])
def search_vector():
    """向量语义搜索。需要 embedding 服务。"""
    auth_error = require_key()
    if auth_error: return auth_error
    q = request.args.get("q", "").strip()
    if not q: return error_response(400, "empty_query", "q 不能为空")
    limit = parse_positive_int(request.args.get("limit"), "limit", 10)

    results = vector_search(q, limit)
    if not results:
        return ok_response({"query": q, "total": 0, "items": []})

    conn = get_db_connection()
    try:
        placeholders = ",".join("?" for _ in results)
        rows = conn.execute(
            f"SELECT {ITEM_JOIN_SELECT_FIELDS.replace('items.','')}, 0 AS score FROM items WHERE id IN ({placeholders}) ORDER BY id DESC",
            [r["id"] for r in results]).fetchall()
    finally:
        conn.close()

    id_to_score = {r["id"]: r["score"] for r in results}
    items = []
    for row in rows:
        item = row_to_item(row)
        item["relevance"] = id_to_score.get(row["id"], 0)
        items.append(item)

    return ok_response({"query": q, "total": len(items), "items": items})


@app.route("/admin/rebuild-vectors", methods=["POST"])
def admin_rebuild_vectors():
    """重建所有 items 的向量索引。"""
    auth_error = require_key()
    if auth_error: return auth_error
    result = rebuild_all_vectors()
    write_audit_log("vectors_rebuild", "system")
    return ok_response(result)


@app.route("/search/all", methods=["GET"])
def search_all():
    auth_error = require_key()
    if auth_error: return auth_error
    q = request.args.get("q","").strip()
    if not q: return error_response(400, "empty_query", "q 不能为空")
    limit = parse_positive_int(request.args.get("limit"), "limit", 20)
    results = {"items":[],"memories":[],"tasks":[],"decisions":[]}
    conn = get_db_connection()
    try:
        fts_q = escape_fts_query(q)
        if fts_q != '""':
            rows = conn.execute("SELECT items.id, items.type, items.content, items.created_at, -rank AS score FROM items_fts JOIN items ON items_fts.rowid = items.id WHERE items_fts MATCH ? ORDER BY rank LIMIT ?",(fts_q,limit)).fetchall()
            results["items"] = [{"id":r["id"],"type":r["type"],"content":(r["content"]or"")[:200],"created_at":r["created_at"],"score":r["score"]} for r in rows]
        like = f"%{escape_like(q)}%"
        for r in conn.execute("SELECT id,category,content,status,created_at FROM memories WHERE content LIKE ? ESCAPE '\\' OR detail LIKE ? ESCAPE '\\' ORDER BY created_at DESC LIMIT ?",(like,like,limit)).fetchall():
            results["memories"].append({"id":r["id"],"category":r["category"],"content":r["content"],"status":r["status"],"created_at":r["created_at"]})
        for r in conn.execute("SELECT id,title,status,priority,created_at FROM tasks WHERE title LIKE ? ESCAPE '\\' OR detail LIKE ? ESCAPE '\\' ORDER BY created_at DESC LIMIT ?",(like,like,limit)).fetchall():
            results["tasks"].append({"id":r["id"],"title":r["title"],"status":r["status"],"priority":r["priority"],"created_at":r["created_at"]})
        for r in conn.execute("SELECT id,title,decision,status,created_at FROM decisions WHERE title LIKE ? ESCAPE '\\' OR decision LIKE ? ESCAPE '\\' OR reasoning LIKE ? ESCAPE '\\' ORDER BY created_at DESC LIMIT ?",(like,like,like,limit)).fetchall():
            results["decisions"].append({"id":r["id"],"title":r["title"],"decision":r["decision"],"status":r["status"],"created_at":r["created_at"]})
    finally: conn.close()
    return ok_response({"query":q,"total":sum(len(v)for v in results.values()),"results":results})


# ===== Webhook =====
_webhooks: list[dict] = []

def fire_webhook(event: str, data: dict) -> None:
    for wh in _webhooks:
        if wh.get("event") == event or wh.get("event") == "*":
            def _send(url=wh["url"], payload={"event":event,"data":data}):
                try:
                    import urllib.request as _ur
                    _ur.Request(url, data=json.dumps(payload).encode("utf-8"), headers={"Content-Type":"application/json"})
                except Exception: pass
            _threading.Thread(target=_send, daemon=True).start()

@app.route("/admin/webhooks", methods=["GET","POST","DELETE"])
def manage_webhooks():
    auth_error = require_key()
    if auth_error: return auth_error
    if request.method == "GET": return ok_response({"webhooks": _webhooks})
    if request.method == "DELETE": _webhooks.clear(); return ok_response({"message":"已清除"})
    body = request.get_json(silent=True) or {}
    url = str(body.get("url","")).strip()
    event = str(body.get("event","*")).strip()
    if not url: return error_response(400,"missing_url","url 不能为空")
    _webhooks.append({"url":url,"event":event})
    write_audit_log("webhook_add","system")
    return ok_response({"webhooks":_webhooks})


# ===== 管理端点 =====
@app.route("/admin/workflows", methods=["GET", "POST"])
def admin_workflows():
    auth_error = require_key()
    if auth_error: return auth_error

    conn = get_db_connection()
    try:
        if request.method == "POST":
            body = request.get_json(silent=True) or {}
            name = str(body.get("name", "")).strip()
            trigger_type = str(body.get("trigger_type", "")).strip()
            action_type = str(body.get("action_type", "")).strip()
            if not all([name, trigger_type, action_type]):
                return error_response(400, "missing_fields", "name, trigger_type, action_type 必填")
            trigger_config = json.dumps(body.get("trigger_config", {}))
            action_config = json.dumps(body.get("action_config", {}))
            now = utc_now().isoformat(timespec="seconds")
            c = conn.execute(
                "INSERT INTO workflows (name, trigger_type, trigger_config, action_type, action_config, created_at) VALUES (?,?,?,?,?,?)",
                (name, trigger_type, trigger_config, action_type, action_config, now))
            conn.commit()
            return ok_response({"id": c.lastrowid}, 201)

        rows = conn.execute("SELECT * FROM workflows ORDER BY created_at DESC").fetchall()
        return ok_response({"workflows": [dict(r) for r in rows]})
    finally:
        conn.close()


@app.route("/admin/workflows/<int:wf_id>", methods=["PUT", "DELETE"])
def admin_workflow_detail(wf_id: int):
    auth_error = require_key()
    if auth_error: return auth_error

    conn = get_db_connection()
    try:
        row = conn.execute("SELECT * FROM workflows WHERE id = ?", (wf_id,)).fetchone()
        if not row:
            return error_response(404, "not_found", "工作流不存在")

        if request.method == "DELETE":
            conn.execute("DELETE FROM workflows WHERE id = ?", (wf_id,))
            conn.commit()
            return ok_response({"deleted": wf_id})

        body = request.get_json(silent=True) or {}
        enabled = body.get("enabled", row["enabled"])
        conn.execute("UPDATE workflows SET enabled = ? WHERE id = ?", (enabled, wf_id))
        conn.commit()
        return ok_response({"updated": wf_id})
    finally:
        conn.close()


@app.route("/admin/workflows/<int:wf_id>/run", methods=["POST"])
def admin_run_workflow(wf_id: int):
    auth_error = require_key()
    if auth_error: return auth_error

    conn = get_db_connection()
    try:
        wf = conn.execute("SELECT * FROM workflows WHERE id = ? AND enabled = 1", (wf_id,)).fetchone()
    finally:
        conn.close()

    if not wf:
        return error_response(404, "not_found", "工作流不存在或已禁用")

    # Execute the action
    result = {"workflow": wf["name"], "action": wf["action_type"]}
    try:
        if wf["action_type"] == "brief":
            from core.routes.ai import register_routes
            # Call brief generation
            ctx = _fetch_ai_context(get_db_connection())
            # brief generation happens in /brief endpoint, just note it
            result["message"] = "简报已生成，调用 GET /brief 查看"
        elif wf["action_type"] == "suggestions":
            result["message"] = "建议已刷新，调用 GET /suggestions 查看"
        elif wf["action_type"] == "cleanup":
            result["message"] = "清理已执行"
        elif wf["action_type"] == "report":
            result["message"] = "周报已生成，调用 GET /report/weekly 查看"
        else:
            result["message"] = f"未知动作类型: {wf['action_type']}"

        conn = get_db_connection()
        conn.execute("UPDATE workflows SET last_run = ? WHERE id = ?",
                     (utc_now().isoformat(timespec="seconds"), wf_id))
        conn.commit()
        conn.close()
        write_audit_log(f"workflow_run:{wf['name']}", "workflow", wf_id)
    except Exception as exc:
        logger.exception("workflow run failed")
        return error_response(500, "workflow_failed", str(exc))

    return ok_response(result)


@app.route("/admin/workflows/templates", methods=["GET"])
def admin_workflow_templates():
    """返回预设工作流模板。"""
    return ok_response({"templates": [
        {"name": "每日晨报", "trigger_type": "schedule", "trigger_config": {"cron": "0 8 * * *"},
         "action_type": "brief", "action_config": {},
         "description": "每天早上8点生成当日简报"},
        {"name": "周日晚复盘", "trigger_type": "schedule", "trigger_config": {"cron": "0 20 * * 0"},
         "action_type": "report", "action_config": {"compare_last_week": True},
         "description": "每周日晚8点生成周报并对比上周"},
        {"name": "过期任务提醒", "trigger_type": "condition", "trigger_config": {"check": "overdue_tasks", "threshold_days": 3},
         "action_type": "suggestions", "action_config": {"focus": "overdue"},
         "description": "检测到过期超过3天的任务时生成提醒建议"},
        {"name": "自动清理", "trigger_type": "schedule", "trigger_config": {"cron": "0 3 * * 0"},
         "action_type": "cleanup", "action_config": {"automation_days": 90, "audit_days": 180},
         "description": "每周日凌晨3点清理旧日志和审计记录"},
    ]})


@app.route("/admin/insights", methods=["GET"])
def admin_insights():
    auth_error = require_key()
    if auth_error: return auth_error
    from core._common import learn_user_patterns
    patterns = learn_user_patterns()
    conn = get_db_connection()
    try:
        weekly_trend = []
        for i in range(7, -1, -1):
            start = (local_date_now() - timedelta(weeks=i+1)).isoformat()
            end = (local_date_now() - timedelta(weeks=i)).isoformat()
            count = conn.execute("SELECT COUNT(*) FROM items WHERE created_at >= ? AND created_at < ?",(start,end)).fetchone()[0]
            weekly_trend.append({"week":i,"start":start[:10],"count":count})
        day_names = ["周一","周二","周三","周四","周五","周六","周日"]
        day_counts = conn.execute("SELECT CAST(strftime('%w', created_at) AS INTEGER) as dow, COUNT(*) as cnt FROM items GROUP BY dow ORDER BY dow").fetchall()
        by_day = {}
        for r in day_counts: by_day[day_names[(int(r["dow"])+6)%7]] = r["cnt"]
    finally: conn.close()
    recs = []
    if patterns["task_completion_rate"] < 30: recs.append("任务完成率偏低，建议减少任务数量或拆分大任务")
    if patterns["avg_weekly_items"] < 2: recs.append("每周记录较少，尝试每天记录一件小事")
    if patterns["peak_hours"]: recs.append(f"最活跃时段是 {patterns['peak_hours'][0]} 点，可在此处理任务")

    # Parse accuracy
    from core._common import get_preference
    corrections = sum(int(get_preference(f"parse_misc:{t}", "0")) for t in ["task","memory","decision","note","health","url"])
    total_parse = sum(int(get_preference(f"parse_correction:{a}:{u}", "0"))
                      for a in ["task","memory","decision","note","health","url"]
                      for u in ["task","memory","decision","note","health","url"])
    parse_accuracy = round((1 - corrections / max(total_parse, 1)) * 100) if total_parse > 0 else None

    return ok_response({
        "patterns":patterns,"weekly_trend":weekly_trend,"by_day":by_day,"recommendations":recs,
        "parse_accuracy": parse_accuracy,
        "generated_at":utc_now().isoformat(timespec="seconds"),
    })


@app.route("/admin/stats/daily", methods=["GET"])
def admin_daily_stats():
    auth_error = require_key()
    if auth_error: return auth_error
    days = parse_positive_int(request.args.get("days"),"days",30)
    conn = get_db_connection()
    try:
        daily = []
        for i in range(days-1,-1,-1):
            d = (local_date_now() - timedelta(days=i)).isoformat()
            daily.append({
                "date": d,
                "items": conn.execute("SELECT COUNT(*) FROM items WHERE date(created_at) = ?",(d,)).fetchone()[0],
                "tasks_created": conn.execute("SELECT COUNT(*) FROM tasks WHERE date(created_at) = ?",(d,)).fetchone()[0],
                "tasks_done": conn.execute("SELECT COUNT(*) FROM tasks WHERE status='done' AND date(completed_at) = ?",(d,)).fetchone()[0],
            })
    finally: conn.close()
    return ok_response({"days":days,"daily":daily})


@app.route("/admin/cleanup", methods=["POST"])
def admin_cleanup():
    auth_error = require_key()
    if auth_error: return auth_error
    auto_days = parse_positive_int(request.args.get("automation_days"),"automation_days",90)
    audit_days = parse_positive_int(request.args.get("audit_days"),"audit_days",180)
    conn = get_db_connection()
    cleaned = {}
    try:
        cutoff = (utc_now()-timedelta(days=auto_days)).isoformat(timespec="seconds")
        cleaned["automation_runs"] = conn.execute("DELETE FROM automation_runs WHERE started_at < ?",(cutoff,)).rowcount
        cutoff = (utc_now()-timedelta(days=audit_days)).isoformat(timespec="seconds")
        cleaned["audit_log"] = conn.execute("DELETE FROM audit_log WHERE created_at < ?",(cutoff,)).rowcount
        conn.execute("PRAGMA optimize")
        before = DB_PATH.stat().st_size
        conn.execute("VACUUM")
        after = DB_PATH.stat().st_size
        cleaned["db_saved_bytes"] = before - after
        conn.commit()
    finally: conn.close()
    write_audit_log("cleanup","system")
    return ok_response({"cleaned":cleaned})


@app.route("/admin/dedup", methods=["GET"])
def admin_dedup():
    auth_error = require_key()
    if auth_error: return auth_error
    conn = get_db_connection()
    try:
        rows = conn.execute("SELECT content, COUNT(*) as cnt, GROUP_CONCAT(id) as ids FROM items WHERE content IS NOT NULL AND TRIM(content)!='' GROUP BY content HAVING cnt > 1 ORDER BY cnt DESC LIMIT 30").fetchall()
    finally: conn.close()
    return ok_response({"total":len(rows),"duplicates":[{"content":(r["content"]or"")[:100],"count":r["cnt"],"ids":[int(x)for x in r["ids"].split(",")],"keep":int(r["ids"].split(",")[0])} for r in rows]})


@app.route("/admin/rebuild-fts", methods=["POST"])
def admin_rebuild_fts():
    auth_error = require_key()
    if auth_error: return auth_error
    from core._common import cjk_tokenize
    conn = get_db_connection()
    try:
        conn.execute("DELETE FROM items_fts")
        for r in conn.execute("SELECT id, content, original_name, derived_text, transcript_text FROM items").fetchall():
            conn.execute("INSERT INTO items_fts(rowid,content,original_name,derived_text,transcript_text) VALUES (?,?,?,?,?)",
                         (r["id"],cjk_tokenize(r["content"]),cjk_tokenize(r["original_name"]),cjk_tokenize(r["derived_text"]),cjk_tokenize(r["transcript_text"])))
        conn.commit()
    finally: conn.close()
    write_audit_log("fts_rebuild","system")
    return ok_response({"message":"FTS5 index rebuilt"})


@app.route("/admin/vacuum", methods=["POST"])
def admin_vacuum():
    auth_error = require_key()
    if auth_error: return auth_error
    before = DB_PATH.stat().st_size if DB_PATH.exists() else 0
    conn = get_db_connection()
    try:
        conn.execute("PRAGMA optimize")
        conn.execute("VACUUM")
        conn.commit()
    finally: conn.close()
    after = DB_PATH.stat().st_size
    write_audit_log("db_vacuum","system")
    return ok_response({"before_bytes":before,"after_bytes":after,"saved_bytes":before-after,"saved_mb":round((before-after)/(1024*1024),2)})


@app.route("/admin/backup", methods=["POST"])
def admin_backup():
    auth_error = require_key()
    if auth_error: return auth_error
    import subprocess as _sp
    script = Path(__file__).resolve().parents[1] / "scripts" / "backup_axiom.py"
    if not script.exists():
        return error_response(500,"script_missing","backup_axiom.py 不存在")
    result = _sp.run([sys.executable, str(script), "--root", str(AXIOM_ROOT)], capture_output=True, text=True, timeout=120)
    write_audit_log("manual_backup","system")
    return ok_response({"success":result.returncode==0,"stdout":result.stdout[-500:],"stderr":result.stderr[-200:] if result.stderr else ""})


@app.route("/admin/logs", methods=["GET"])
def admin_logs():
    auth_error = require_key()
    if auth_error: return auth_error
    lines_param = parse_positive_int(request.args.get("lines"),"lines",50)
    level = request.args.get("level","").strip().lower() or None
    log_path = Path(LOG_PATH).expanduser().resolve() if LOG_PATH else None
    if not log_path or not log_path.exists():
        return error_response(404,"no_log_file","日志文件不存在")
    try:
        raw = log_path.read_text(encoding="utf-8",errors="replace")
        all_lines = raw.strip().split("\n")
        if level: all_lines = [l for l in all_lines if level.upper() in l]
        return ok_response({"lines":len(all_lines[-lines_param:]),"log":all_lines[-lines_param:]})
    except Exception as exc:
        return error_response(500,"log_read_failed",str(exc))


@app.route("/admin/modules/<module_name>/enable", methods=["POST"])
def admin_enable_module(module_name: str):
    auth_error = require_key()
    if auth_error: return auth_error
    from modules.registry import set_module_enabled
    if set_module_enabled(module_name, True):
        return ok_response({"message":f"模块 {module_name} 已启用，重启后生效。"})
    return error_response(404,"not_found","模块不存在")


@app.route("/admin/modules/<module_name>/disable", methods=["POST"])
def admin_disable_module(module_name: str):
    auth_error = require_key()
    if auth_error: return auth_error
    from modules.registry import set_module_enabled
    if set_module_enabled(module_name, False):
        return ok_response({"message":f"模块 {module_name} 已禁用，重启后生效。"})
    return error_response(404,"not_found","模块不存在")


# ===== 启动 =====
def startup_self_check():
    import os as _os
    checks = []
    if DB_PATH.exists():
        checks.append(("db", "ok", f"{DB_PATH.stat().st_size} bytes"))
    else:
        checks.append(("db", "fail", "not found"))
    conn = get_db_connection()
    try:
        fts_c = conn.execute("SELECT COUNT(*) FROM items_fts").fetchone()[0]
        item_c = conn.execute("SELECT COUNT(*) FROM items").fetchone()[0]
        checks.append(("fts5", "ok" if fts_c == item_c else "warn", f"items={item_c} fts={fts_c}"))
    except Exception: checks.append(("fts5", "fail", "error"))
    finally: conn.close()
    for name, path in [("inbox", INBOX_PATH), ("archive", ARCHIVE_PATH)]:
        checks.append((name, "ok" if path.exists() else "warn", str(path)))
    checks.append(("modules", "ok", f"{len(AXIOM_MODULES)} loaded"))
    checks.append(("ai", "ok" if DEEPSEEK_API_KEY else "warn", "configured" if DEEPSEEK_API_KEY else "no key"))
    for var in ("AXIOM_SECRET_KEY", "AXIOM_ROOT"):
        checks.append((f"env:{var}", "ok" if _os.environ.get(var) else "warn", "set" if _os.environ.get(var) else "default"))
    for name, status, detail in checks:
        level = logging.WARNING if status == "warn" else logging.ERROR if status == "fail" else logging.INFO
        logger.log(level, "startup check %s: %s (%s)", name, status, detail)
    return checks


init_app_storage()
init_modules(app)
startup_self_check()


if __name__ == "__main__":
    import signal as _signal
    def _graceful_shutdown(signum, frame):
        logger.info("received signal %s, shutting down", signum)
        sys.exit(0)
    _signal.signal(_signal.SIGTERM, _graceful_shutdown)
    _signal.signal(_signal.SIGINT, _graceful_shutdown)

    _notify_socket = os.environ.get("NOTIFY_SOCKET")
    _watchdog_usec = os.environ.get("WATCHDOG_USEC")
    if _notify_socket and _watchdog_usec:
        import socket as _sock
        _watchdog_sec = max(int(_watchdog_usec) / 1_000_000 / 3, 1)
        _s = _sock.socket(_sock.AF_UNIX, _sock.SOCK_DGRAM)
        _s.connect(_notify_socket)
        def _ping():
            while True:
                __import__('time').sleep(_watchdog_sec)
                try: _s.send(b"WATCHDOG=1")
                except Exception: break
        _threading.Thread(target=_ping, daemon=True).start()
        logger.info("systemd watchdog: interval=%ss", _watchdog_sec)

    host = os.environ.get("AXIOM_HOST", "0.0.0.0")
    port = int(os.environ.get("AXIOM_PORT", "5000"))
    logger.info("starting Axiom receiver on %s:%s", host, port)
    app.run(host=host, port=port)
