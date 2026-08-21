"""Smoke test for the explainable current-context API."""
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
        from core.routes.governance import register_routes as register_governance  # noqa: WPS433

        app.config["TESTING"] = True
        init_app_storage()
        register_routes(app)
        register_governance(app)

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
            check("schema", payload["schema_version"] == "context.now.v2", str(payload))
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
            check(
                "learning starts empty",
                payload["learning"]
                == {"recent_outcomes": 0, "explicit_feedback": 0, "window_days": 7},
                str(payload["learning"]),
            )

            focus_task_id = payload["focus"]["task"]["id"]
            no_key_complete = client.post(f"/api/context/actions/{focus_task_id}/complete")
            check("complete requires key", no_key_complete.status_code == 403, str(no_key_complete.status_code))

            completed = client.post(
                f"/api/context/actions/{focus_task_id}/complete",
                headers={"X-Axiom-Key": "test-key"},
            )
            check("context completion", completed.status_code == 200, str(completed.status_code))
            completed_payload = completed.get_json()
            outcome = completed_payload["outcome"]
            check("completion outcome", outcome["outcome"] == "completed", str(outcome))
            check("completion task", outcome["task_id"] == focus_task_id, str(outcome))
            check("feedback initially empty", outcome["fit_feedback"] is None, str(outcome))
            check(
                "completion reranks",
                completed_payload["now_context"]["focus"]["task"]["id"] != focus_task_id,
                str(completed_payload["now_context"]),
            )

            conn = get_db_connection()
            try:
                task_row = conn.execute(
                    "SELECT status FROM tasks WHERE id = ?",
                    (focus_task_id,),
                ).fetchone()
                outcome_row = conn.execute(
                    "SELECT snapshot_json FROM context_action_outcomes WHERE id = ?",
                    (outcome["id"],),
                ).fetchone()
            finally:
                conn.close()
            check("task completed", task_row["status"] == "done", str(dict(task_row)))
            snapshot = json.loads(outcome_row["snapshot_json"])
            check("snapshot schema", snapshot["schema_version"] == "context.now.v2", str(snapshot))
            check("snapshot reason", snapshot["reason"]["code"] == "due_today", str(snapshot))

            invalid_feedback = client.post(
                f"/api/context/outcomes/{outcome['id']}/feedback",
                headers={"X-Axiom-Key": "test-key"},
                json={"fit_feedback": "unknown"},
            )
            check("invalid feedback", invalid_feedback.status_code == 400, str(invalid_feedback.status_code))
            missing_feedback = client.post(
                "/api/context/outcomes/999999/feedback",
                headers={"X-Axiom-Key": "test-key"},
                json={"fit_feedback": "right"},
            )
            check("missing outcome", missing_feedback.status_code == 404, str(missing_feedback.status_code))

            feedback = client.post(
                f"/api/context/outcomes/{outcome['id']}/feedback",
                headers={"X-Axiom-Key": "test-key"},
                json={"fit_feedback": "too_heavy"},
            )
            check("feedback accepted", feedback.status_code == 200, str(feedback.status_code))
            feedback_payload = feedback.get_json()
            check(
                "feedback stored",
                feedback_payload["outcome"]["fit_feedback"] == "too_heavy",
                str(feedback_payload["outcome"]),
            )
            check("feedback explains effect", "7 天" in feedback_payload["effect"], feedback_payload["effect"])

            exported = client.post(
                "/export",
                headers={"X-Axiom-Key": "test-key"},
            )
            check("context export", exported.status_code == 200, str(exported.status_code))
            with zipfile.ZipFile(io.BytesIO(exported.data), "r") as archive:
                outcome_name = next(
                    name
                    for name in archive.namelist()
                    if name.endswith("context_action_outcomes.json")
                )
                exported_outcomes = json.loads(archive.read(outcome_name).decode("utf-8"))
            check("feedback exported", len(exported_outcomes) == 1, str(exported_outcomes))
            check(
                "export keeps feedback",
                exported_outcomes[0]["fit_feedback"] == "too_heavy",
                str(exported_outcomes[0]),
            )

            conn = get_db_connection()
            try:
                conn.execute("UPDATE tasks SET status = 'cancelled' WHERE status = 'todo'")
                conn.executemany(
                    """
                    INSERT INTO tasks (
                        title, status, priority, estimated_minutes, created_at, updated_at
                    ) VALUES (?, 'todo', ?, ?, ?, ?)
                    """,
                    [
                        ("下一步较重", "high", 60, recent, recent),
                        ("下一步较轻", "medium", 10, recent, recent),
                    ],
                )
                conn.commit()
            finally:
                conn.close()

            learned = client.get(
                "/api/context/now?limit=3",
                headers={"X-Axiom-Key": "test-key"},
            ).get_json()
            check(
                "heavy feedback prefers lighter action",
                learned["focus"]["task"]["title"] == "下一步较轻",
                str(learned["focus"]),
            )
            check("feedback reason", learned["focus"]["reason"]["code"] == "feedback", str(learned["focus"]))
            feedback_factors = [
                factor for factor in learned["focus"]["factors"] if factor["key"] == "feedback"
            ]
            check(
                "positive feedback factor",
                bool(feedback_factors) and feedback_factors[0]["points"] > 0,
                str(learned["focus"]["factors"]),
            )
            check(
                "learning signal",
                learned["learning"]["recent_outcomes"] == 1
                and learned["learning"]["explicit_feedback"] == 1,
                str(learned["learning"]),
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
