"""Smoke test for the explainable current-context API."""
from __future__ import annotations

import os
import sys
import tempfile
from datetime import timedelta
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))


def check(name: str, ok: bool, detail: str = "") -> None:
    if not ok:
        raise AssertionError(f"{name}: {detail}")


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="axiom_context_") as temp_dir:
        os.environ["AXIOM_ROOT"] = temp_dir
        os.environ["AXIOM_SECRET_KEY"] = "test-key"
        os.environ["AXIOM_LOG_PATH"] = ""

        from core._common import (  # noqa: WPS433
            app,
            get_db_connection,
            init_app_storage,
            local_date_now,
            utc_now,
        )
        from core.routes.context import register_routes  # noqa: WPS433

        app.config["TESTING"] = True
        init_app_storage()
        register_routes(app)

        today = local_date_now()
        now = utc_now()
        recent = now.isoformat(timespec="seconds")
        old = (now - timedelta(days=35)).isoformat(timespec="seconds")

        conn = get_db_connection()
        try:
            conn.execute(
                "INSERT INTO lifelines (id, name, parent_id, order_index) VALUES (?, ?, ?, ?)",
                ("axiom-dev", "Axiom 开发", None, 1),
            )
            for index in range(3):
                conn.execute(
                    """
                    INSERT INTO items (type, content, source, created_at, lifeline_id)
                    VALUES ('text', ?, 'smoke', ?, 'axiom-dev')
                    """,
                    (f"近期上下文 {index}", recent),
                )
            tasks = [
                (
                    "今天必须推进的关键任务",
                    "给出一个可交付结果",
                    "high",
                    today.isoformat(),
                    20,
                    recent,
                    recent,
                    "axiom-dev",
                ),
                (
                    "已经逾期但价值较低的任务",
                    None,
                    "low",
                    (today - timedelta(days=2)).isoformat(),
                    15,
                    recent,
                    recent,
                    None,
                ),
                (
                    "随时可以启动的小任务",
                    None,
                    "high",
                    None,
                    10,
                    recent,
                    recent,
                    None,
                ),
                (
                    "长期未处理的低优先级任务",
                    None,
                    "low",
                    None,
                    120,
                    old,
                    old,
                    None,
                ),
            ]
            conn.executemany(
                """
                INSERT INTO tasks (
                    title, detail, status, priority, due_date, estimated_minutes,
                    created_at, updated_at, lifeline_id
                ) VALUES (?, ?, 'todo', ?, ?, ?, ?, ?, ?)
                """,
                tasks,
            )
            conn.commit()
        finally:
            conn.close()

        with app.test_client() as client:
            response = client.get("/api/context/now")
            check("403 without key", response.status_code == 403, str(response.status_code))

            response = client.get(
                "/api/context/now?limit=3",
                headers={"X-Axiom-Key": "test-key"},
            )
            check("context 200", response.status_code == 200, str(response.status_code))
            payload = response.get_json()
            check("schema", payload["schema_version"] == "context.now.v1", str(payload))
            check("focus mode", payload["mode"] == "focus", str(payload))
            check(
                "important due-today focus",
                payload["focus"]["task"]["title"] == "今天必须推进的关键任务",
                str(payload["focus"]),
            )
            check("due reason", payload["focus"]["reason"]["code"] == "due_today", str(payload["focus"]))
            factor_keys = {factor["key"] for factor in payload["focus"]["factors"]}
            check(
                "explainable factors",
                {"urgency", "importance", "startability", "momentum"} <= factor_keys,
                str(payload["focus"]["factors"]),
            )
            check("alternatives limited", len(payload["alternatives"]) == 2, str(payload["alternatives"]))
            check(
                "signals",
                payload["signals"]
                == {
                    "open_tasks": 4,
                    "overdue_tasks": 1,
                    "due_today_tasks": 1,
                    "undated_tasks": 2,
                },
                str(payload["signals"]),
            )

            bad_limit = client.get(
                "/api/context/now?limit=0",
                headers={"X-Axiom-Key": "test-key"},
            )
            check("invalid limit", bad_limit.status_code == 400, str(bad_limit.status_code))

            conn = get_db_connection()
            try:
                conn.execute("DELETE FROM tasks")
                conn.commit()
            finally:
                conn.close()

            empty = client.get(
                "/api/context/now",
                headers={"X-Axiom-Key": "test-key"},
            ).get_json()
            check("empty mode", empty["mode"] == "empty", str(empty))
            check("empty focus", empty["focus"] is None, str(empty))

        print("all checks passed")


if __name__ == "__main__":
    main()
