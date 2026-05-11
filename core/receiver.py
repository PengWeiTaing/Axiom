"""Axiom receiver — main entry point."""
from __future__ import annotations

# Backward compatibility: re-export everything from _common
from core._common import *  # noqa: F401, F403, E402

import logging

from core._common import (  # noqa: E402
    app, logger,
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
    return ok_response({
        "modules": [
            {
                "name": m.name,
                "label": m.label,
                "description": m.description,
                "nav_item": m.get_nav_item(),
                **m.get_frontend_metadata(),
            }
            for m in AXIOM_MODULES
        ]
    })


init_app_storage()
init_modules(app)

if __name__ == "__main__":
    import os
    host = os.environ.get("AXIOM_HOST", "0.0.0.0")
    port = int(os.environ.get("AXIOM_PORT", "5000"))
    app.run(host=host, port=port)
