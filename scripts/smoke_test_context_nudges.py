"""Smoke test for evidence-backed, dismissible current-context nudges."""
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
    with tempfile.TemporaryDirectory(prefix="axiom_context_nudges_") as temp_dir:
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
        from core.context_nudges import build_context_nudges  # noqa: WPS433
        from core.routes.context import register_routes as register_context  # noqa: WPS433
        from core.weekly_plan import week_bounds  # noqa: WPS433

        app.config["TESTING"] = True
        init_app_storage()
        register_context(app)

        today = local_date_now()
        now = utc_now()
        week_start, _ = week_bounds(today)
        old = (now - timedelta(days=8)).isoformat(timespec="seconds")

        conn = get_db_connection()
        try:
            parent_cursor = conn.execute(
                """
                INSERT INTO tasks (
                    title, status, priority, estimated_minutes, created_at, updated_at
                ) VALUES (?, 'todo', 'high', 120, ?, ?)
                """,
                ("完成真实使用校准", old, old),
            )
            parent_id = int(parent_cursor.lastrowid)
            for position, title in enumerate(["核对使用证据", "调整下一次建议"], start=1):
                child_cursor = conn.execute(
                    """
                    INSERT INTO tasks (
                        title, status, priority, estimated_minutes, created_at, updated_at
                    ) VALUES (?, 'todo', 'high', 20, ?, ?)
                    """,
                    (title, old, old),
                )
                child_id = int(child_cursor.lastrowid)
                conn.execute(
                    """
                    INSERT INTO task_decomposition_links (
                        child_task_id, parent_task_id, parent_task_title,
                        position, source, created_at, updated_at
                    ) VALUES (?, ?, ?, ?, 'ai_suggestion_confirmed', ?, ?)
                    """,
                    (child_id, parent_id, "完成真实使用校准", position, old, old),
                )

            large_cursor = conn.execute(
                """
                INSERT INTO tasks (
                    title, status, priority, estimated_minutes, created_at, updated_at
                ) VALUES (?, 'todo', 'medium', 90, ?, ?)
                """,
                ("整理研究报告结论", old, old),
            )
            large_id = int(large_cursor.lastrowid)
            for position, (task_id, title) in enumerate(
                [(parent_id, "完成真实使用校准"), (large_id, "整理研究报告结论")],
                start=1,
            ):
                conn.execute(
                    """
                    INSERT INTO weekly_plan_items (
                        week_start, task_id, task_title, position,
                        selected_at, created_at, updated_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                    (week_start.isoformat(), task_id, title, position, old, old, old),
                )
            conn.commit()

            nudges = build_context_nudges(conn, today=today, now=now)
        finally:
            conn.close()

        check("nudges capped", len(nudges) == 2, str(nudges))
        check("stuck steps detected", nudges[0]["type"] == "stuck_steps", str(nudges))
        check("long action detected", {item["type"] for item in nudges} == {"stuck_steps", "long_unstarted"}, str(nudges))
        check("nudges expose evidence", all(item["evidence"] for item in nudges), str(nudges))
        check("nudges only point to existing context", all(item["target"]["kind"] == "task" for item in nudges), str(nudges))

        headers = {"X-Axiom-Key": "test-key"}
        with app.test_client() as client:
            payload = client.get("/api/context/now", headers=headers).get_json()
            check("context schema upgraded", payload["schema_version"] == "context.now.v7", str(payload))
            check("context exposes capped nudges", len(payload["nudges"]) == 2, str(payload["nudges"]))
            first_id = payload["nudges"][0]["id"]
            dismissed = client.post(
                f"/api/context/nudges/{first_id}/dismiss",
                headers=headers,
            )
            check("nudge dismissal accepted", dismissed.status_code == 200, str(dismissed.status_code))
            next_context = dismissed.get_json()["now_context"]
            check("dismissed nudge hidden", first_id not in {item["id"] for item in next_context["nudges"]}, str(next_context["nudges"]))
            replacement = next(
                item
                for item in next_context["nudges"]
                if item["type"] == "weekly_stalled"
            )
            dismissed_replacement = client.post(
                f"/api/context/nudges/{replacement['id']}/dismiss",
                headers=headers,
            )
            check(
                "replacement nudge dismissal accepted",
                dismissed_replacement.status_code == 200,
                str(dismissed_replacement.status_code),
            )
            after_replacement = dismissed_replacement.get_json()["now_context"]
            check(
                "replacement nudge hidden",
                replacement["id"] not in {item["id"] for item in after_replacement["nudges"]},
                str(after_replacement["nudges"]),
            )

        conn = get_db_connection()
        try:
            dismissal = conn.execute(
                "SELECT * FROM context_nudge_dismissals WHERE nudge_id = ?",
                (first_id,),
            ).fetchone()
            check("dismissal metadata recorded", dismissal is not None, first_id)
            columns = {row[1] for row in conn.execute("PRAGMA table_info(context_nudge_dismissals)")}
            check("nudge body is not duplicated", not {"title", "detail", "evidence_json"}.intersection(columns), str(columns))
            task_states = {
                int(row["id"]): row["status"]
                for row in conn.execute(
                    "SELECT id, status FROM tasks WHERE id IN (?, ?)",
                    (parent_id, large_id),
                ).fetchall()
            }
            check("nudge never mutates tasks", task_states == {parent_id: "todo", large_id: "todo"}, str(task_states))
        finally:
            conn.close()

        print("context nudges smoke test passed")


if __name__ == "__main__":
    main()
