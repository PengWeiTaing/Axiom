"""Axiom receiver — main entry point."""
from __future__ import annotations

# Backward compatibility: re-export everything from _common
from core._common import *  # noqa: F401, F403, E402

import logging
from datetime import datetime, timezone

from core._common import (  # noqa: E402
    app, logger, AXIOM_ROOT, INBOX_PATH, ARCHIVE_PATH, DB_PATH,
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
        for table in ["items", "memories", "tasks", "decisions", "audit_log", "automation_runs", "module_state"]:
            try:
                tables[table] = conn.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
            except sqlite3.Error:
                tables[table] = 0
        fts_size = conn.execute("SELECT COUNT(*) FROM items_fts").fetchone()[0]
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
    })


init_app_storage()
init_modules(app)

if __name__ == "__main__":
    import os
    host = os.environ.get("AXIOM_HOST", "0.0.0.0")
    port = int(os.environ.get("AXIOM_PORT", "5000"))
    app.run(host=host, port=port)
