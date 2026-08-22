"""Smoke test for parent-aware task decomposition and current-context handoff."""
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
    with tempfile.TemporaryDirectory(prefix="axiom_task_decomposition_") as temp_dir:
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
        from core.routes.lifelines import register_routes as register_lifelines  # noqa: WPS433
        from core.routes.planning import register_routes as register_planning  # noqa: WPS433
        from core.routes.tasks import register_routes as register_tasks  # noqa: WPS433

        app.config["TESTING"] = True
        init_app_storage()
        register_context(app)
        register_governance(app)
        register_lifelines(app)
        register_planning(app)
        register_tasks(app)

        now = utc_now().isoformat(timespec="seconds")
        due_date = (local_date_now() + timedelta(days=2)).isoformat()
        conn = get_db_connection()
        try:
            conn.execute(
                "INSERT INTO lifelines (id, name, parent_id, order_index) VALUES (?, ?, NULL, 1)",
                ("product", "产品主线"),
            )
            goal_cursor = conn.execute(
                """
                INSERT INTO memories (
                    category, content, status, created_at, updated_at, lifeline_id
                ) VALUES ('goal', ?, 'confirmed', ?, ?, 'product')
                """,
                ("完成产品核心收敛", now, now),
            )
            goal_id = int(goal_cursor.lastrowid)
            conn.execute(
                """
                INSERT INTO goal_commitments (
                    memory_id, review_cadence_days, state, created_at, updated_at
                ) VALUES (?, 14, 'active', ?, ?)
                """,
                (goal_id, now, now),
            )
            conn.commit()
        finally:
            conn.close()

        headers = {"X-Axiom-Key": "test-key"}
        with app.test_client() as client:
            created = client.post(
                "/tasks",
                headers=headers,
                json={
                    "title": "完成行动拆解闭环",
                    "detail": "需要后端、前端和验证形成一个整体",
                    "priority": "high",
                    "due_date": due_date,
                    "estimated_minutes": 120,
                    "memory_id": goal_id,
                },
            )
            check("create parent task", created.status_code == 201, str(created.status_code))
            parent_id = int(created.get_json()["task"]["id"])

            selected = client.post(
                f"/api/planning/week/tasks/{parent_id}",
                headers=headers,
            )
            check("select parent for week", selected.status_code == 200, str(selected.status_code))

            invalid = client.post(
                f"/tasks/{parent_id}/breakdown",
                headers=headers,
                json={"steps": []},
            )
            check("empty decomposition rejected", invalid.status_code == 400, str(invalid.status_code))

            breakdown = client.post(
                f"/tasks/{parent_id}/breakdown",
                headers=headers,
                json={
                    "steps": [
                        {"title": "整理任务数据关系", "estimated_minutes": 20},
                        {"title": "接入此刻排序", "estimated_minutes": 25},
                        {"title": "验证移动端交互", "estimated_minutes": 15},
                    ]
                },
            )
            check("decomposition created", breakdown.status_code == 201, str(breakdown.status_code))
            breakdown_payload = breakdown.get_json()
            check(
                "decomposition schema",
                breakdown_payload["schema_version"] == "task.decomposition.v1",
                str(breakdown_payload),
            )
            child_ids = [int(value) for value in breakdown_payload["created_task_ids"]]
            check("three child tasks", len(child_ids) == 3, str(child_ids))

            parent = client.get(f"/tasks/{parent_id}", headers=headers).get_json()["task"]
            check("parent progress", parent["subtask_progress"]["todo"] == 3, str(parent))
            check("parent capacity", parent["decomposition_capacity_remaining"] == 2, str(parent))
            check(
                "children inherit context",
                all(
                    child["memory_id"] == goal_id
                    and child["lifeline_id"] == "product"
                    and child["priority"] == "high"
                    and child["due_date"] == due_date
                    for child in parent["subtasks"]
                ),
                str(parent["subtasks"]),
            )

            nested = client.post(
                f"/tasks/{child_ids[0]}/breakdown",
                headers=headers,
                json={"steps": [{"title": "不应继续嵌套", "estimated_minutes": 10}]},
            )
            check("nested decomposition rejected", nested.status_code == 409, str(nested.status_code))

            blocked_parent = client.post(f"/tasks/{parent_id}/done", headers=headers)
            check("open children block parent completion", blocked_parent.status_code == 409, str(blocked_parent.status_code))

            context = client.get("/api/context/now?limit=8", headers=headers).get_json()
            context_actions = ([context["focus"]] if context["focus"] else []) + context["alternatives"]
            context_ids = {int(action["task"]["id"]) for action in context_actions}
            check("parent yields to children", parent_id not in context_ids, str(context_ids))
            check("children enter context", set(child_ids).issubset(context_ids), str(context_ids))
            child_action = next(action for action in context_actions if int(action["task"]["id"]) in child_ids)
            check(
                "child keeps parent source",
                child_action["task"]["parent_task"]["id"] == parent_id,
                str(child_action),
            )
            check(
                "weekly intent reaches children",
                any(factor["key"] == "weekly_commitment" for factor in child_action["factors"]),
                str(child_action["factors"]),
            )

            week = client.get("/api/planning/week", headers=headers).get_json()
            selected_parent = next(item for item in week["selected"] if item["task_id"] == parent_id)
            check(
                "week exposes step progress",
                selected_parent["subtask_progress"] == {
                    "total": 3,
                    "todo": 3,
                    "done": 0,
                    "cancelled": 0,
                },
                str(selected_parent),
            )
            candidate_ids = {int(action["task"]["id"]) for action in week["candidates"]}
            check("covered children are not duplicate weekly candidates", not candidate_ids.intersection(child_ids), str(candidate_ids))

            project_context = client.get(
                "/api/lifelines/product/context",
                headers=headers,
            ).get_json()
            project_parent = next(task for task in project_context["tasks"] if task["id"] == parent_id)
            project_child = next(task for task in project_context["tasks"] if task["id"] == child_ids[0])
            check("project counts executable steps", project_context["summary"]["open_actions"] == 3, str(project_context["summary"]))
            check("project exposes parent progress", project_parent["subtask_progress"]["total"] == 3, str(project_parent))
            check("project exposes child source", project_child["parent_task"]["id"] == parent_id, str(project_child))
            check("goal progress avoids parent double count", project_context["goals"][0]["progress"]["total"] == 3, str(project_context["goals"][0]))

            completed_child_id = int(child_action["task"]["id"])
            completed = client.post(
                f"/api/context/actions/{completed_child_id}/complete",
                headers=headers,
            )
            check("complete child from current context", completed.status_code == 200, str(completed.status_code))
            check("child completion records outcome", completed.get_json()["outcome"]["task_id"] == completed_child_id)

            parent_after_one = client.get(f"/tasks/{parent_id}", headers=headers).get_json()["task"]
            check("parent progress updates", parent_after_one["subtask_progress"]["done"] == 1, str(parent_after_one))

            for child_id in child_ids:
                if child_id == completed_child_id:
                    continue
                response = client.post(f"/tasks/{child_id}/cancel", headers=headers)
                check("remaining child cancellable", response.status_code == 200, str(response.status_code))

            parent_done = client.post(f"/tasks/{parent_id}/done", headers=headers)
            check("parent completes after steps handled", parent_done.status_code == 200, str(parent_done.status_code))

            export_response = client.post("/export", headers=headers)
            check("decomposition export", export_response.status_code == 200, str(export_response.status_code))
            with zipfile.ZipFile(io.BytesIO(export_response.data), "r") as archive:
                link_name = next(
                    name for name in archive.namelist()
                    if name.endswith("/task_decomposition_links.json")
                )
                links = json.loads(archive.read(link_name).decode("utf-8"))
                check("all links exported", len(links) == 3, str(links))

            deleted = client.delete(f"/tasks/{parent_id}", headers=headers)
            check("delete parent", deleted.status_code == 200, str(deleted.status_code))
            orphan_child = client.get(f"/tasks/{completed_child_id}", headers=headers).get_json()["task"]
            check(
                "child keeps deleted parent snapshot",
                orphan_child["parent_task"]["available"] is False
                and orphan_child["parent_task"]["title"] == "完成行动拆解闭环",
                str(orphan_child["parent_task"]),
            )

        print("task decomposition smoke test passed")


if __name__ == "__main__":
    main()
