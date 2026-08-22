"""Task routes."""
import sqlite3
from datetime import date

from flask import request

from core import task_decomposition_ai
from core import task_decomposition_learning
from core._common import (
    DEFAULT_PAGE_SIZE,
    MAX_PAGE_SIZE,
    TASK_PRIORITIES,
    TASK_PRIORITY_LABELS,
    TASK_STATUSES,
    TASK_STATUS_LABELS,
    error_response,
    get_db_connection,
    local_date_now,
    ok_response,
    parse_positive_int,
    require_key,
    utc_now,
    write_audit_log,
)
from core.task_decomposition import (
    MAX_TASK_STEPS,
    TASK_DECOMPOSITION_SCHEMA_VERSION,
    TaskDecompositionInputError,
    TaskDecompositionLimitError,
    TaskDecompositionTaskNotFoundError,
    TaskDecompositionUnavailableError,
    create_task_steps,
    has_open_subtasks,
    read_parent_task,
    read_subtask_rows,
    subtask_progress,
    normalize_task_steps,
)
from core.task_decomposition_ai import (
    TaskDecompositionAIResponseError,
    TaskDecompositionAIUnavailableError,
)
from core.task_decomposition_learning import (
    TaskSuggestionNotFoundError,
    TaskSuggestionUnavailableError,
)

def register_routes(app):
    # ===== 任务路由 =====

    TASK_SELECT_FIELDS = """
        id, title, detail, status, priority,
        memory_id, due_date, estimated_minutes, completed_at,
        created_at, updated_at, lifeline_id
    """


    def row_to_task(row: sqlite3.Row) -> dict:
        return {
            "id": row["id"],
            "title": row["title"],
            "detail": row["detail"],
            "status": row["status"],
            "status_label": TASK_STATUS_LABELS.get(row["status"], row["status"]),
            "priority": row["priority"],
            "priority_label": TASK_PRIORITY_LABELS.get(row["priority"], row["priority"]),
            "memory_id": row["memory_id"],
            "due_date": row["due_date"],
            "estimated_minutes": row["estimated_minutes"],
            "completed_at": row["completed_at"],
            "created_at": row["created_at"],
            "updated_at": row["updated_at"],
            "lifeline_id": row["lifeline_id"],
        }


    def task_detail_payload(conn: sqlite3.Connection, row: sqlite3.Row) -> dict:
        payload = row_to_task(row)
        parent_task = read_parent_task(conn, int(row["id"]))
        child_rows = read_subtask_rows(conn, int(row["id"]))
        progress = subtask_progress(child_rows)
        payload.update(
            {
                "decomposition_schema_version": TASK_DECOMPOSITION_SCHEMA_VERSION,
                "parent_task": parent_task,
                "subtasks": [row_to_task(child) for child in child_rows],
                "subtask_progress": progress,
                "decomposition_capacity_remaining": max(0, MAX_TASK_STEPS - progress["total"]),
            }
        )
        return payload


    def read_task_filter_args() -> dict:
        status = request.args.get("status", "").strip()
        priority = request.args.get("priority", "").strip()
        due_date = request.args.get("due_date", "").strip()
        page = parse_positive_int(request.args.get("page"), "page", 1)
        page_size = parse_positive_int(request.args.get("page_size"), "page_size", DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE)
        return {"status": status, "priority": priority, "due_date": due_date, "page": page, "page_size": page_size}


    def build_task_filter_conditions(status: str, priority: str, due_date: str) -> tuple[list[str], list]:
        conditions: list[str] = []
        params: list = []
        if status:
            if status not in TASK_STATUSES:
                raise ValueError(f"status 不支持: {status}")
            conditions.append("status = ?")
            params.append(status)
        if priority:
            if priority not in TASK_PRIORITIES:
                raise ValueError(f"priority 不支持: {priority}")
            conditions.append("priority = ?")
            params.append(priority)
        if due_date:
            conditions.append("due_date = ?")
            params.append(due_date)
        return conditions, params


    @app.route("/tasks/today", methods=["GET"])
    def tasks_today():
        auth_error = require_key()
        if auth_error:
            return auth_error

        today_str = local_date_now().isoformat()
        conn = get_db_connection()
        try:
            today_rows = conn.execute(
                f"""
                SELECT {TASK_SELECT_FIELDS} FROM tasks
                WHERE (due_date = ? OR (status = 'todo' AND due_date IS NULL))
                ORDER BY
                    CASE priority WHEN 'high' THEN 0 WHEN 'medium' THEN 1 WHEN 'low' THEN 2 END,
                    created_at DESC
                """,
                (today_str,),
            ).fetchall()

            overdue_rows = conn.execute(
                f"""
                SELECT {TASK_SELECT_FIELDS} FROM tasks
                WHERE status = 'todo' AND due_date IS NOT NULL AND due_date < ?
                ORDER BY due_date ASC
                LIMIT 20
                """,
                (today_str,),
            ).fetchall()
        finally:
            conn.close()

        overdue_with_age = []
        for r in overdue_rows:
            task = row_to_task(r)
            if r["due_date"]:
                due = date.fromisoformat(r["due_date"])
                task["overdue_days"] = (date.fromisoformat(today_str) - due).days
            overdue_with_age.append(task)

        return ok_response({
            "date": today_str,
            "today": [row_to_task(r) for r in today_rows],
            "overdue": overdue_with_age,
        })


    @app.route("/tasks", methods=["GET", "POST"])
    def tasks():
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            if request.method == "POST":
                body = request.get_json(silent=True) or {}
                title = str(body.get("title", "")).strip()
                detail = str(body.get("detail", "")).strip() or None
                priority = str(body.get("priority", "medium")).strip()
                estimated_minutes = body.get("estimated_minutes")
                if estimated_minutes is not None:
                    estimated_minutes = int(estimated_minutes)
                due_date = str(body.get("due_date", "")).strip() or None
                memory_id = body.get("memory_id")

                if not title:
                    return error_response(400, "missing_title", "title 不能为空")
                if priority not in TASK_PRIORITIES:
                    return error_response(400, "invalid_priority", f"priority 不支持: {priority}")

                inherited_lifeline_id = None
                if memory_id is not None:
                    try:
                        memory_id = int(memory_id)
                    except (TypeError, ValueError):
                        return error_response(400, "invalid_memory_id", "memory_id 必须是整数")
                    memory_row = conn.execute(
                        "SELECT id, lifeline_id FROM memories WHERE id = ?",
                        (memory_id,),
                    ).fetchone()
                    if memory_row is None:
                        return error_response(400, "invalid_memory_id", "关联记忆不存在")
                    inherited_lifeline_id = memory_row["lifeline_id"]

                now = utc_now().isoformat(timespec="seconds")
                cursor = conn.execute(
                    "INSERT INTO tasks (title, detail, status, priority, memory_id, due_date, estimated_minutes, created_at, updated_at, lifeline_id) VALUES (?, ?, 'todo', ?, ?, ?, ?, ?, ?, ?)",
                    (
                        title,
                        detail,
                        priority,
                        memory_id,
                        due_date,
                        estimated_minutes,
                        now,
                        now,
                        inherited_lifeline_id,
                    ),
                )
                conn.commit()
                task_id = cursor.lastrowid
                write_audit_log("task_create", "task", task_id)
                row = conn.execute(f"SELECT {TASK_SELECT_FIELDS} FROM tasks WHERE id = ?", (task_id,)).fetchone()
                return ok_response({"task": row_to_task(row)}, 201)

            filters = read_task_filter_args()
            conditions, params = build_task_filter_conditions(filters["status"], filters["priority"], filters["due_date"])
            where_clause = ("WHERE " + " AND ".join(conditions)) if conditions else ""
            count_row = conn.execute(f"SELECT COUNT(*) FROM tasks {where_clause}", params).fetchone()
            total = count_row[0]
            total_pages = max(1, (total + filters["page_size"] - 1) // filters["page_size"])
            offset = (filters["page"] - 1) * filters["page_size"]
            rows = conn.execute(
                f"SELECT {TASK_SELECT_FIELDS} FROM tasks {where_clause} ORDER BY created_at DESC LIMIT ? OFFSET ?",
                params + [filters["page_size"], offset],
            ).fetchall()

            return ok_response({
                "page": filters["page"],
                "page_size": filters["page_size"],
                "total": total,
                "total_pages": total_pages,
                "tasks": [row_to_task(r) for r in rows],
            })
        except ValueError as exc:
            return error_response(400, "invalid_filter", str(exc))
        finally:
            conn.close()


    @app.route("/tasks/<int:task_id>", methods=["GET", "PUT", "DELETE"])
    def task_detail(task_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            row = conn.execute(f"SELECT {TASK_SELECT_FIELDS} FROM tasks WHERE id = ?", (task_id,)).fetchone()
            if row is None:
                return error_response(404, "not_found", "任务不存在")

            if request.method == "GET":
                return ok_response({"task": task_detail_payload(conn, row)})

            if request.method == "DELETE":
                conn.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
                conn.commit()
                write_audit_log("task_delete", "task", task_id)
                return ok_response({"deleted": task_id})

            body = request.get_json(silent=True) or {}
            title = str(body.get("title", row["title"])).strip()
            detail = str(body.get("detail", row["detail"] or "")).strip() or None
            priority = str(body.get("priority", row["priority"])).strip()
            status = str(body.get("status", row["status"])).strip()

            if not title:
                return error_response(400, "missing_title", "title 不能为空")
            if priority not in TASK_PRIORITIES:
                return error_response(400, "invalid_priority", f"priority 不支持: {priority}")
            if status not in TASK_STATUSES:
                return error_response(400, "invalid_status", f"status 不支持: {status}")
            if status in {"done", "cancelled"} and has_open_subtasks(conn, task_id):
                return error_response(
                    409,
                    "task_has_open_steps",
                    "这个行动还有未完成步骤，请先完成或取消这些步骤",
                )

            completed_at = row["completed_at"]
            if status == "done" and row["status"] != "done":
                completed_at = utc_now().isoformat(timespec="seconds")
            elif status != "done":
                completed_at = None

            now = utc_now().isoformat(timespec="seconds")
            conn.execute(
                "UPDATE tasks SET title = ?, detail = ?, status = ?, priority = ?, completed_at = ?, updated_at = ? WHERE id = ?",
                (title, detail, status, priority, completed_at, now, task_id),
            )
            conn.commit()
            write_audit_log("task_update", "task", task_id)
            row = conn.execute(f"SELECT {TASK_SELECT_FIELDS} FROM tasks WHERE id = ?", (task_id,)).fetchone()
            return ok_response({"task": task_detail_payload(conn, row)})
        except ValueError as exc:
            return error_response(400, "invalid_input", str(exc))
        finally:
            conn.close()


    def _set_task_status(task_id: int, status: str) -> tuple:
        conn = get_db_connection()
        try:
            row = conn.execute("SELECT id, status FROM tasks WHERE id = ?", (task_id,)).fetchone()
            if row is None:
                return error_response(404, "not_found", "任务不存在"), None
            if status in {"done", "cancelled"} and has_open_subtasks(conn, task_id):
                return error_response(
                    409,
                    "task_has_open_steps",
                    "这个行动还有未完成步骤，请先完成或取消这些步骤",
                ), None
            now = utc_now().isoformat(timespec="seconds")
            completed_at = now if status == "done" else None
            conn.execute(
                "UPDATE tasks SET status = ?, completed_at = ?, updated_at = ? WHERE id = ?",
                (status, completed_at, now, task_id),
            )
            conn.commit()
            write_audit_log(f"task_{status}", "task", task_id)
            row = conn.execute(f"SELECT {TASK_SELECT_FIELDS} FROM tasks WHERE id = ?", (task_id,)).fetchone()
            return None, task_detail_payload(conn, row)
        finally:
            conn.close()


    @app.route("/tasks/<int:task_id>/done", methods=["POST"])
    def task_done(task_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error
        err, task = _set_task_status(task_id, "done")
        if err:
            return err
        return ok_response({"task": task})


    @app.route("/tasks/<int:task_id>/todo", methods=["POST"])
    def task_todo(task_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error
        err, task = _set_task_status(task_id, "todo")
        if err:
            return err
        return ok_response({"task": task})


    @app.route("/tasks/<int:task_id>/reschedule", methods=["POST"])
    def task_reschedule(task_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            row = conn.execute("SELECT id, status FROM tasks WHERE id = ?", (task_id,)).fetchone()
            if row is None:
                return error_response(404, "not_found", "任务不存在")

            body = request.get_json(silent=True) or {}
            new_date = str(body.get("due_date", "")).strip()
            if not new_date:
                new_date = local_date_now().isoformat()

            now = utc_now().isoformat(timespec="seconds")
            conn.execute(
                "UPDATE tasks SET due_date = ?, updated_at = ? WHERE id = ?",
                (new_date, now, task_id),
            )
            conn.commit()
            write_audit_log("task_reschedule", "task", task_id)
            row = conn.execute(f"SELECT {TASK_SELECT_FIELDS} FROM tasks WHERE id = ?", (task_id,)).fetchone()
            return ok_response({"task": task_detail_payload(conn, row)})
        finally:
            conn.close()


    @app.route("/tasks/<int:task_id>/breakdown/suggestion", methods=["POST"])
    def task_breakdown_suggestion(task_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            suggestion = task_decomposition_ai.generate_task_decomposition_suggestion(
                conn,
                task_id,
            )
            suggestion["suggestion_id"] = task_decomposition_learning.register_task_suggestion(
                conn,
                task_id,
                suggestion,
            )
            conn.commit()
        except TaskDecompositionTaskNotFoundError as exc:
            return error_response(404, "task_not_found", str(exc))
        except TaskDecompositionLimitError as exc:
            return error_response(409, "task_step_limit", str(exc))
        except TaskDecompositionUnavailableError as exc:
            return error_response(409, "task_breakdown_unavailable", str(exc))
        except TaskDecompositionAIUnavailableError as exc:
            return error_response(503, "ai_unavailable", str(exc))
        except TaskDecompositionAIResponseError as exc:
            return error_response(502, "ai_suggestion_failed", str(exc))
        finally:
            conn.close()

        write_audit_log(
            "task_breakdown_suggested",
            "task",
            task_id,
            f"model={suggestion['model']} confidence={suggestion['confidence']}",
        )
        return ok_response(suggestion)


    @app.route("/tasks/<int:task_id>/breakdown", methods=["POST"])
    def task_breakdown(task_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error
        body = request.get_json(silent=True)
        if not isinstance(body, dict):
            return error_response(400, "invalid_breakdown", "JSON body 必须是对象")

        conn = get_db_connection()
        try:
            source = str(body.get("source", "manual_breakdown")).strip()
            suggestion_id = str(body.get("suggestion_id", "")).strip() or None
            normalized_steps = None
            if source == "ai_suggestion_confirmed":
                if not suggestion_id:
                    raise TaskDecompositionInputError("确认 AI 候选时必须提供 suggestion_id")
                normalized_steps = normalize_task_steps(body.get("steps"))
            created_ids = create_task_steps(
                conn,
                task_id,
                body.get("steps"),
                source=source,
            )
            suggestion_result = None
            if source == "ai_suggestion_confirmed" and suggestion_id and normalized_steps:
                suggestion_result = task_decomposition_learning.resolve_task_suggestion(
                    conn,
                    task_id,
                    suggestion_id,
                    "confirmed",
                    confirmed_steps=normalized_steps,
                )
            conn.commit()
            row = conn.execute(
                f"SELECT {TASK_SELECT_FIELDS} FROM tasks WHERE id = ?",
                (task_id,),
            ).fetchone()
            task = task_detail_payload(conn, row)
        except TaskDecompositionTaskNotFoundError as exc:
            return error_response(404, "task_not_found", str(exc))
        except TaskDecompositionLimitError as exc:
            return error_response(409, "task_step_limit", str(exc))
        except TaskDecompositionUnavailableError as exc:
            return error_response(409, "task_breakdown_unavailable", str(exc))
        except TaskDecompositionInputError as exc:
            return error_response(400, "invalid_breakdown", str(exc))
        except TaskSuggestionNotFoundError as exc:
            return error_response(404, "task_suggestion_not_found", str(exc))
        except TaskSuggestionUnavailableError as exc:
            return error_response(409, "task_suggestion_unavailable", str(exc))
        finally:
            conn.close()

        write_audit_log(
            "task_breakdown",
            "task",
            task_id,
            f"created_steps={len(created_ids)} child_ids={','.join(str(value) for value in created_ids)}",
        )
        return ok_response(
            {
                "schema_version": TASK_DECOMPOSITION_SCHEMA_VERSION,
                "task": task,
                "created_task_ids": created_ids,
                "source": source,
                "suggestion_result": suggestion_result,
            },
            201,
        )


    @app.route(
        "/tasks/<int:task_id>/breakdown/suggestions/<suggestion_id>/discard",
        methods=["POST"],
    )
    def discard_task_breakdown_suggestion(task_id: int, suggestion_id: str):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            result = task_decomposition_learning.resolve_task_suggestion(
                conn,
                task_id,
                suggestion_id,
                "discarded",
            )
            conn.commit()
        except TaskSuggestionNotFoundError as exc:
            return error_response(404, "task_suggestion_not_found", str(exc))
        except TaskSuggestionUnavailableError as exc:
            return error_response(409, "task_suggestion_unavailable", str(exc))
        finally:
            conn.close()

        write_audit_log(
            "task_breakdown_suggestion_discarded",
            "task",
            task_id,
            f"suggestion_id={suggestion_id}",
        )
        return ok_response({"suggestion_result": result})


    @app.route("/tasks/<int:task_id>/cancel", methods=["POST"])
    def task_cancel(task_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error
        err, task = _set_task_status(task_id, "cancelled")
        if err:
            return err
        return ok_response({"task": task})


