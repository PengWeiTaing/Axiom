"""Task routes."""
from core._common import *

def register_routes(app):
    # ===== 任务路由 =====

    TASK_SELECT_FIELDS = """
        id, title, detail, status, priority,
        memory_id, due_date, estimated_minutes, completed_at, created_at, updated_at
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
        }


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

                now = utc_now().isoformat(timespec="seconds")
                cursor = conn.execute(
                    "INSERT INTO tasks (title, detail, status, priority, memory_id, due_date, estimated_minutes, created_at, updated_at) VALUES (?, ?, 'todo', ?, ?, ?, ?, ?, ?)",
                    (title, detail, priority, memory_id, due_date, estimated_minutes, now, now),
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
                return ok_response({"task": row_to_task(row)})

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
            return ok_response({"task": row_to_task(row)})
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
            now = utc_now().isoformat(timespec="seconds")
            completed_at = now if status == "done" else None
            conn.execute(
                "UPDATE tasks SET status = ?, completed_at = ?, updated_at = ? WHERE id = ?",
                (status, completed_at, now, task_id),
            )
            conn.commit()
            write_audit_log(f"task_{status}", "task", task_id)
            row = conn.execute(f"SELECT {TASK_SELECT_FIELDS} FROM tasks WHERE id = ?", (task_id,)).fetchone()
            return None, row
        finally:
            conn.close()


    @app.route("/tasks/<int:task_id>/done", methods=["POST"])
    def task_done(task_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error
        err, row = _set_task_status(task_id, "done")
        if err:
            return err
        return ok_response({"task": row_to_task(row)})


    @app.route("/tasks/<int:task_id>/todo", methods=["POST"])
    def task_todo(task_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error
        err, row = _set_task_status(task_id, "todo")
        if err:
            return err
        return ok_response({"task": row_to_task(row)})


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
            return ok_response({"task": row_to_task(row)})
        finally:
            conn.close()


    @app.route("/tasks/<int:task_id>/cancel", methods=["POST"])
    def task_cancel(task_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error
        err, row = _set_task_status(task_id, "cancelled")
        if err:
            return err
        return ok_response({"task": row_to_task(row)})


