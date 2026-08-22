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
        from core.routes.goals import register_routes as register_goals  # noqa: WPS433
        from core.routes.governance import register_routes as register_governance  # noqa: WPS433
        from core.routes.tasks import register_routes as register_tasks  # noqa: WPS433

        app.config["TESTING"] = True
        init_app_storage()
        register_routes(app)
        register_goals(app)
        register_governance(app)
        register_tasks(app)

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
            goal_cursor = conn.execute(
                """
                INSERT INTO memories (
                    category, content, detail, status, created_at, updated_at, lifeline_id
                ) VALUES ('goal', ?, ?, 'confirmed', ?, ?, 'axiom-dev')
                """,
                ("把 Axiom 推进为可长期使用的个人外脑", "保持产品主线收敛", recent, recent),
            )
            active_goal_id = int(goal_cursor.lastrowid)
            gap_cursor = conn.execute(
                """
                INSERT INTO memories (
                    category, content, detail, status, created_at, updated_at, lifeline_id
                ) VALUES ('goal', ?, ?, 'confirmed', ?, ?, 'axiom-dev')
                """,
                ("完成下一阶段研究整理", "需要补一个可以开始的动作", recent, recent),
            )
            gap_goal_id = int(gap_cursor.lastrowid)
            conn.execute(
                """
                INSERT INTO memories (
                    category, content, status, created_at, updated_at, lifeline_id
                ) VALUES ('goal', ?, 'candidate', ?, ?, 'axiom-dev')
                """,
                ("尚未确认的候选方向", recent, recent),
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
                    None,
                    active_goal_id,
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
                    None,
                ),
            ]
            conn.executemany(
                """
                INSERT INTO tasks (
                    title, detail, status, priority, due_date, estimated_minutes,
                    created_at, updated_at, lifeline_id, memory_id
                ) VALUES (?, ?, 'todo', ?, ?, ?, ?, ?, ?, ?)
                """,
                tasks,
            )
            conn.commit()
        finally:
            conn.close()

        with app.test_client() as client:
            goal_update_no_key = client.put(
                f"/api/goals/{active_goal_id}/commitment",
                json={"success_criteria": "形成可持续使用的核心闭环"},
            )
            check("goal update requires key", goal_update_no_key.status_code == 403)

            active_profile = client.put(
                f"/api/goals/{active_goal_id}/commitment",
                headers={"X-Axiom-Key": "test-key"},
                json={
                    "success_criteria": "核心闭环连续稳定运行",
                    "target_date": (today + timedelta(days=5)).isoformat(),
                    "review_cadence_days": 7,
                },
            )
            check("goal profile update", active_profile.status_code == 200, str(active_profile.status_code))
            active_profile_payload = active_profile.get_json()["goal_profile"]
            check(
                "goal profile fields",
                active_profile_payload["state"] == "active"
                and active_profile_payload["target_date"] == (today + timedelta(days=5)).isoformat()
                and active_profile_payload["review_cadence_days"] == 7,
                str(active_profile_payload),
            )

            gap_profile = client.put(
                f"/api/goals/{gap_goal_id}/commitment",
                headers={"X-Axiom-Key": "test-key"},
                json={"parent_goal_id": active_goal_id},
            )
            check("goal parent update", gap_profile.status_code == 200, str(gap_profile.status_code))
            check(
                "goal parent returned",
                gap_profile.get_json()["goal_profile"]["parent_goal"]["id"] == active_goal_id,
                str(gap_profile.get_json()),
            )
            cycle = client.put(
                f"/api/goals/{active_goal_id}/commitment",
                headers={"X-Axiom-Key": "test-key"},
                json={"parent_goal_id": gap_goal_id},
            )
            check("goal hierarchy rejects cycle", cycle.status_code == 400, str(cycle.status_code))

            response = client.get("/api/context/now")
            check("403 without key", response.status_code == 403, str(response.status_code))

            response = client.get(
                "/api/context/now?limit=3",
                headers={"X-Axiom-Key": "test-key"},
            )
            check("context 200", response.status_code == 200, str(response.status_code))
            payload = response.get_json()
            check("schema", payload["schema_version"] == "context.now.v6", str(payload))
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
                {"urgency", "importance", "startability", "momentum", "commitment"}
                <= factor_keys,
                str(payload["focus"]["factors"]),
            )
            check(
                "focus carries confirmed goal",
                payload["focus"]["task"]["goal"]["id"] == active_goal_id,
                str(payload["focus"]["task"]),
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
                    "weekly_committed_tasks": 0,
                },
                str(payload["signals"]),
            )
            check(
                "learning starts empty",
                payload["learning"]
                == {"recent_outcomes": 0, "explicit_feedback": 0, "window_days": 7},
                str(payload["learning"]),
            )
            check(
                "confirmed commitment summary",
                payload["commitments"]["confirmed_goals"] == 2
                and payload["commitments"]["with_open_actions"] == 1
                and payload["commitments"]["without_open_actions"] == 1
                and payload["commitments"]["linked_open_actions"] == 1
                and payload["commitments"]["unlinked_open_actions"] == 3,
                str(payload["commitments"]),
            )
            check(
                "commitment gap is explicit",
                [entry["id"] for entry in payload["commitments"]["gaps"]] == [gap_goal_id],
                str(payload["commitments"]["gaps"]),
            )
            check(
                "commitment attention is prioritized",
                payload["commitments"]["attention"][0]["id"] == gap_goal_id
                and payload["commitments"]["attention"][0]["attention_code"] == "missing_action"
                and payload["commitments"]["attention_total"] == 2,
                str(payload["commitments"]["attention"]),
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
            check(
                "completion keeps inherited goal lifeline",
                outcome["lifeline_id"] == "axiom-dev",
                str(outcome),
            )
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
            check("snapshot schema", snapshot["schema_version"] == "context.now.v6", str(snapshot))
            check("snapshot reason", snapshot["reason"]["code"] == "due_today", str(snapshot))
            check(
                "completion creates commitment gap",
                completed_payload["now_context"]["commitments"]["without_open_actions"] == 2,
                str(completed_payload["now_context"]["commitments"]),
            )

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
                goal_profile_name = next(
                    name for name in archive.namelist() if name.endswith("goal_commitments.json")
                )
                exported_goal_profiles = json.loads(
                    archive.read(goal_profile_name).decode("utf-8")
                )
            check("feedback exported", len(exported_outcomes) == 1, str(exported_outcomes))
            check(
                "export keeps feedback",
                exported_outcomes[0]["fit_feedback"] == "too_heavy",
                str(exported_outcomes[0]),
            )
            check(
                "goal profiles exported",
                {entry["memory_id"] for entry in exported_goal_profiles}
                == {active_goal_id, gap_goal_id},
                str(exported_goal_profiles),
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

            conn = get_db_connection()
            try:
                conn.execute("UPDATE tasks SET status = 'cancelled' WHERE status = 'todo'")
                conn.executemany(
                    """
                    INSERT INTO tasks (
                        title, status, priority, estimated_minutes, memory_id,
                        created_at, updated_at, lifeline_id
                    ) VALUES (?, 'todo', 'medium', 30, ?, ?, ?, ?)
                    """,
                    [
                        ("推进已确认目标", gap_goal_id, recent, recent, "axiom-dev"),
                        ("普通同级任务", None, recent, recent, None),
                    ],
                )
                conn.commit()
            finally:
                conn.close()

            committed = client.get(
                "/api/context/now?limit=3",
                headers={"X-Axiom-Key": "test-key"},
            ).get_json()
            check(
                "confirmed goal contribution wins peer comparison",
                committed["focus"]["task"]["title"] == "推进已确认目标",
                str(committed["focus"]),
            )
            check(
                "goal contribution is primary reason",
                committed["focus"]["reason"]["code"] == "goal_progress",
                str(committed["focus"]["reason"]),
            )

            paused = client.put(
                f"/api/goals/{gap_goal_id}/commitment",
                headers={"X-Axiom-Key": "test-key"},
                json={"state": "paused"},
            )
            check("goal can pause", paused.status_code == 200, str(paused.status_code))
            paused_context = client.get(
                "/api/context/now?limit=3",
                headers={"X-Axiom-Key": "test-key"},
            ).get_json()
            check(
                "paused goal actions leave current context",
                paused_context["focus"]["task"]["title"] == "普通同级任务"
                and paused_context["commitments"]["paused_goals"] == 1,
                str(paused_context),
            )
            resumed = client.put(
                f"/api/goals/{gap_goal_id}/commitment",
                headers={"X-Axiom-Key": "test-key"},
                json={"state": "active"},
            )
            check("goal can resume", resumed.status_code == 200, str(resumed.status_code))
            reviewed = client.post(
                f"/api/goals/{gap_goal_id}/review",
                headers={"X-Axiom-Key": "test-key"},
            )
            check("goal review", reviewed.status_code == 200, str(reviewed.status_code))

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

            invalid_goal_task = client.post(
                "/tasks",
                headers={"X-Axiom-Key": "test-key"},
                json={"title": "无效目标行动", "memory_id": 999999},
            )
            check(
                "task rejects missing linked memory",
                invalid_goal_task.status_code == 400,
                str(invalid_goal_task.status_code),
            )
            inherited_task = client.post(
                "/tasks",
                headers={"X-Axiom-Key": "test-key"},
                json={
                    "title": "为研究目标补一个下一步",
                    "memory_id": gap_goal_id,
                    "estimated_minutes": 25,
                },
            )
            check("goal action created", inherited_task.status_code == 201, str(inherited_task.status_code))
            inherited_payload = inherited_task.get_json()["task"]
            check(
                "goal action inherits context",
                inherited_payload["memory_id"] == gap_goal_id
                and inherited_payload["lifeline_id"] == "axiom-dev",
                str(inherited_payload),
            )
            inherited_context = client.get(
                "/api/context/now",
                headers={"X-Axiom-Key": "test-key"},
            ).get_json()
            check(
                "created goal action enters current context",
                inherited_context["focus"]["task"]["goal"]["id"] == gap_goal_id,
                str(inherited_context["focus"]),
            )

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
