"""Smoke test for the lightweight weekly commitment flow."""
from __future__ import annotations

import io
import json
import os
import sys
import tempfile
import zipfile
from datetime import timedelta
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))


def check(name: str, ok: bool, detail: str = "") -> None:
    if not ok:
        raise AssertionError(f"{name}: {detail}")


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="axiom_weekly_plan_") as temp_dir:
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
        from core.routes.context import register_routes as register_context  # noqa: WPS433
        from core.routes.governance import register_routes as register_governance  # noqa: WPS433
        from core.routes.planning import register_routes as register_planning  # noqa: WPS433
        from core.routes.tasks import register_routes as register_tasks  # noqa: WPS433

        app.config["TESTING"] = True
        init_app_storage()
        register_context(app)
        register_governance(app)
        register_planning(app)
        register_tasks(app)

        today = local_date_now()
        now = utc_now().isoformat(timespec="seconds")
        conn = get_db_connection()
        try:
            conn.execute(
                "INSERT INTO lifelines (id, name, parent_id, order_index) VALUES (?, ?, ?, ?)",
                ("core", "核心产品", None, 1),
            )
            goal_cursor = conn.execute(
                """
                INSERT INTO memories (
                    category, content, status, created_at, updated_at, lifeline_id
                ) VALUES ('goal', ?, 'confirmed', ?, ?, 'core')
                """,
                ("暂停中的方向", now, now),
            )
            paused_goal_id = int(goal_cursor.lastrowid)
            conn.execute(
                """
                INSERT INTO goal_commitments (
                    memory_id, review_cadence_days, state, created_at, updated_at
                ) VALUES (?, 14, 'paused', ?, ?)
                """,
                (paused_goal_id, now, now),
            )
            tasks = [
                ("明确列入本周的行动", "medium", 30, None, None),
                ("可选行动二", "medium", 45, None, None),
                ("可选行动三", "low", 20, None, None),
                ("可选行动四", "low", 25, None, None),
                ("可选行动五", "medium", 60, None, None),
                ("超过本周容量的行动", "high", 10, None, None),
                ("已经完成的行动", "high", 10, None, "done"),
                ("暂停承诺下的行动", "high", 10, paused_goal_id, None),
            ]
            task_ids = []
            for title, priority, minutes, memory_id, forced_status in tasks:
                status = forced_status or "todo"
                cursor = conn.execute(
                    """
                    INSERT INTO tasks (
                        title, status, priority, memory_id, estimated_minutes,
                        completed_at, created_at, updated_at, lifeline_id
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'core')
                    """,
                    (
                        title,
                        status,
                        priority,
                        memory_id,
                        minutes,
                        now if status == "done" else None,
                        now,
                        now,
                    ),
                )
                task_ids.append(int(cursor.lastrowid))
            conn.commit()
        finally:
            conn.close()

        headers = {"X-Axiom-Key": "test-key"}
        with app.test_client() as client:
            no_key = client.get("/api/planning/week")
            check("weekly plan requires key", no_key.status_code == 403, str(no_key.status_code))

            invalid_date = client.get("/api/planning/week?date=not-a-date", headers=headers)
            check("weekly plan validates date", invalid_date.status_code == 400, str(invalid_date.status_code))

            empty_response = client.get("/api/planning/week", headers=headers)
            check("empty week response", empty_response.status_code == 200, str(empty_response.status_code))
            empty = empty_response.get_json()
            expected_start = (today - timedelta(days=today.weekday())).isoformat()
            check("week starts monday", empty["week_start"] == expected_start, str(empty))
            check("weekly schema", empty["schema_version"] == "planning.week.v2", str(empty))
            check("empty review", empty["review"]["state"] == "empty", str(empty["review"]))
            check("weekly capacity", empty["summary"]["capacity"] == 5, str(empty["summary"]))
            check("weekly candidates", len(empty["candidates"]) >= 5, str(empty["candidates"]))

            missing = client.post("/api/planning/week/tasks/999999", headers=headers)
            check("missing task rejected", missing.status_code == 404, str(missing.status_code))

            done = client.post(f"/api/planning/week/tasks/{task_ids[6]}", headers=headers)
            check("completed task rejected", done.status_code == 409, str(done.status_code))

            paused = client.post(f"/api/planning/week/tasks/{task_ids[7]}", headers=headers)
            check("paused commitment task rejected", paused.status_code == 409, str(paused.status_code))

            first = client.post(f"/api/planning/week/tasks/{task_ids[0]}", headers=headers)
            check("add first weekly task", first.status_code == 200, str(first.status_code))
            first_payload = first.get_json()
            check("one selected", first_payload["week_plan"]["summary"]["selected"] == 1, str(first_payload))
            focus = first_payload["now_context"]["focus"]
            check("weekly choice reaches current context", focus["task"]["id"] == task_ids[0], str(focus))
            check("weekly reason", focus["reason"]["code"] == "weekly_commitment", str(focus))
            check(
                "weekly factor",
                any(factor["key"] == "weekly_commitment" for factor in focus["factors"]),
                str(focus["factors"]),
            )

            duplicate = client.post(f"/api/planning/week/tasks/{task_ids[0]}", headers=headers)
            check("duplicate add is idempotent", duplicate.status_code == 200, str(duplicate.status_code))
            check("duplicate does not copy task", duplicate.get_json()["week_plan"]["summary"]["selected"] == 1)

            for task_id in task_ids[1:5]:
                response = client.post(f"/api/planning/week/tasks/{task_id}", headers=headers)
                check("fill weekly capacity", response.status_code == 200, str(response.status_code))

            full = client.post(f"/api/planning/week/tasks/{task_ids[5]}", headers=headers)
            check("weekly capacity enforced", full.status_code == 409, str(full.status_code))
            check(
                "weekly full code",
                full.get_json()["error"]["code"] == "weekly_plan_full",
                str(full.get_json()),
            )

            conn = get_db_connection()
            try:
                conn.execute(
                    "UPDATE tasks SET status = 'done', completed_at = ?, updated_at = ? WHERE id = ?",
                    (now, now, task_ids[0]),
                )
                conn.commit()
            finally:
                conn.close()

            completed_plan = client.get("/api/planning/week", headers=headers).get_json()
            check("completion remains in week", completed_plan["summary"]["completed"] == 1, str(completed_plan))
            completed_selection_id = next(
                item["id"] for item in completed_plan["selected"] if item["task_id"] == task_ids[0]
            )
            remove_done = client.delete(
                f"/api/planning/week/selections/{completed_selection_id}",
                headers=headers,
            )
            check("completed commitment retained", remove_done.status_code == 409, str(remove_done.status_code))

            removable_selection_id = next(
                item["id"] for item in completed_plan["selected"] if item["task_id"] == task_ids[4]
            )
            removed = client.delete(
                f"/api/planning/week/selections/{removable_selection_id}",
                headers=headers,
            )
            check("open commitment removable", removed.status_code == 200, str(removed.status_code))
            removed_plan = removed.get_json()["week_plan"]
            check("removal frees capacity", removed_plan["summary"]["capacity_remaining"] == 1, str(removed_plan))
            check("removal retained for review", removed_plan["summary"]["removed"] == 1, str(removed_plan))

            conn = get_db_connection()
            try:
                conn.execute("DELETE FROM tasks WHERE id = ?", (task_ids[3],))
                conn.commit()
            finally:
                conn.close()
            unavailable_plan = client.get("/api/planning/week", headers=headers).get_json()
            unavailable_item = next(
                item for item in unavailable_plan["selected"] if item["title"] == "可选行动四"
            )
            check(
                "deleted task keeps weekly snapshot",
                unavailable_item["task"] is None and unavailable_item["state"] == "unavailable",
                str(unavailable_item),
            )
            remove_unavailable = client.delete(
                f"/api/planning/week/selections/{unavailable_item['id']}",
                headers=headers,
            )
            check(
                "deleted task selection removable",
                remove_unavailable.status_code == 200,
                str(remove_unavailable.status_code),
            )

            export_response = client.post("/export", headers=headers)
            check("weekly export", export_response.status_code == 200, str(export_response.status_code))
            with zipfile.ZipFile(io.BytesIO(export_response.data), "r") as archive:
                weekly_name = next(
                    name for name in archive.namelist() if name.endswith("/weekly_plan_items.json")
                )
                weekly_rows = json.loads(archive.read(weekly_name).decode("utf-8"))
                check("weekly history exported", len(weekly_rows) == 5, str(weekly_rows))

        print("weekly plan smoke test passed")


if __name__ == "__main__":
    main()
