"""Weekly planning routes embedded in Axiom's current-context flow."""
from __future__ import annotations

from flask import request

from core.audit import write_audit_log
from core.context_engine import MAX_CONTEXT_ACTIONS, build_now_context
from core.database import get_db_connection
from core.http_utils import error_response, ok_response, require_key
from core.items import local_date_now
from core.weekly_plan import (
    WeeklyPlanCompletedSelectionError,
    WeeklyPlanFullError,
    WeeklyPlanSelectionNotFoundError,
    WeeklyPlanTaskNotFoundError,
    WeeklyPlanTaskUnavailableError,
    add_week_task,
    context_week_task_ids,
    parse_week_anchor,
    read_week_plan,
    remove_week_selection,
    remove_week_task,
)


def _request_anchor(body: dict | None = None):
    value = request.args.get("date")
    if value is None and body:
        value = body.get("date")
    return parse_week_anchor(value, default=local_date_now())


def _build_week_payload(anchor):
    conn = get_db_connection()
    try:
        plan = read_week_plan(conn, anchor)
        covered_task_ids = context_week_task_ids(conn, anchor)
    finally:
        conn.close()

    now_context = build_now_context(limit=MAX_CONTEXT_ACTIONS, today=anchor)
    actions = ([now_context["focus"]] if now_context["focus"] else []) + now_context["alternatives"]
    plan["candidates"] = (
        []
        if plan["summary"]["capacity_remaining"] == 0
        else [
            action
            for action in actions
            if int(action["task"]["id"]) not in covered_task_ids
        ]
    )
    return plan, now_context


def register_routes(app):
    @app.route("/api/planning/week", methods=["GET"])
    def current_week_plan():
        auth_error = require_key()
        if auth_error:
            return auth_error

        try:
            anchor = _request_anchor()
        except ValueError as exc:
            return error_response(400, "invalid_week_date", str(exc))

        plan, _ = _build_week_payload(anchor)
        return ok_response(plan)

    @app.route("/api/planning/week/tasks/<int:task_id>", methods=["POST", "DELETE"])
    def mutate_week_plan(task_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error

        body = request.get_json(silent=True)
        if body is not None and not isinstance(body, dict):
            return error_response(400, "invalid_week_plan", "JSON body 必须是对象")
        try:
            anchor = _request_anchor(body)
        except ValueError as exc:
            return error_response(400, "invalid_week_date", str(exc))

        conn = get_db_connection()
        try:
            if request.method == "POST":
                selection_id = add_week_task(conn, task_id, anchor)
                audit_action = "weekly_plan_add"
            else:
                selection_id = remove_week_task(conn, task_id, anchor)
                audit_action = "weekly_plan_remove"
            conn.commit()
        except WeeklyPlanTaskNotFoundError as exc:
            return error_response(404, "weekly_task_not_found", str(exc))
        except WeeklyPlanSelectionNotFoundError as exc:
            return error_response(404, "weekly_selection_not_found", str(exc))
        except WeeklyPlanFullError as exc:
            return error_response(409, "weekly_plan_full", str(exc))
        except WeeklyPlanTaskUnavailableError as exc:
            return error_response(409, "weekly_task_unavailable", str(exc))
        except WeeklyPlanCompletedSelectionError as exc:
            return error_response(409, "weekly_selection_completed", str(exc))
        finally:
            conn.close()

        write_audit_log(audit_action, "weekly_plan_item", selection_id)
        plan, now_context = _build_week_payload(anchor)
        return ok_response({"week_plan": plan, "now_context": now_context})

    @app.route("/api/planning/week/selections/<int:selection_id>", methods=["DELETE"])
    def remove_week_plan_selection(selection_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error

        body = request.get_json(silent=True)
        if body is not None and not isinstance(body, dict):
            return error_response(400, "invalid_week_plan", "JSON body 必须是对象")
        try:
            anchor = _request_anchor(body)
        except ValueError as exc:
            return error_response(400, "invalid_week_date", str(exc))

        conn = get_db_connection()
        try:
            removed_id = remove_week_selection(conn, selection_id, anchor)
            conn.commit()
        except WeeklyPlanSelectionNotFoundError as exc:
            return error_response(404, "weekly_selection_not_found", str(exc))
        except WeeklyPlanCompletedSelectionError as exc:
            return error_response(409, "weekly_selection_completed", str(exc))
        finally:
            conn.close()

        write_audit_log("weekly_plan_remove", "weekly_plan_item", removed_id)
        plan, now_context = _build_week_payload(anchor)
        return ok_response({"week_plan": plan, "now_context": now_context})
