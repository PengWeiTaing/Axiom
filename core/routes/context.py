"""Current-context API routes."""
from flask import request

from core._common import (
    error_response,
    get_db_connection,
    local_date_now,
    ok_response,
    parse_positive_int,
    require_key,
    utc_now,
    write_audit_log,
)
from core.context_engine import MAX_CONTEXT_ACTIONS, build_now_context
from core.context_nudges import ContextNudgeNotFoundError, dismiss_context_nudge
from core.context_outcomes import (
    ContextActionUnavailableError,
    ContextOutcomeNotFoundError,
    ContextTaskNotFoundError,
    complete_current_action,
    context_feedback_effect,
    record_context_feedback,
)


def register_routes(app):
    @app.route("/api/context/now", methods=["GET"])
    def context_now():
        auth_error = require_key()
        if auth_error:
            return auth_error

        try:
            limit = parse_positive_int(
                request.args.get("limit"),
                "limit",
                5,
                MAX_CONTEXT_ACTIONS,
            )
        except ValueError as exc:
            return error_response(400, "invalid_context_param", str(exc))

        return ok_response(build_now_context(limit=limit))

    @app.route("/api/context/nudges/<nudge_id>/dismiss", methods=["POST"])
    def dismiss_nudge(nudge_id: str):
        auth_error = require_key()
        if auth_error:
            return auth_error

        today = local_date_now()
        now = utc_now()
        conn = get_db_connection()
        try:
            nudge = dismiss_context_nudge(
                conn,
                nudge_id,
                today=today,
                now=now,
            )
            conn.commit()
        except ContextNudgeNotFoundError as exc:
            return error_response(404, "context_nudge_not_found", str(exc))
        finally:
            conn.close()

        write_audit_log(
            "context_nudge_dismissed",
            "task" if nudge["target"]["kind"] == "task" else "planning_week",
            nudge["target"].get("id"),
            f"nudge_id={nudge_id} type={nudge['type']}",
        )
        return ok_response({
            "dismissed": nudge_id,
            "now_context": build_now_context(limit=5),
        })

    @app.route("/api/context/actions/<int:task_id>/complete", methods=["POST"])
    def complete_context_action(task_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error

        try:
            outcome = complete_current_action(task_id)
        except ContextTaskNotFoundError as exc:
            return error_response(404, "context_task_not_found", str(exc))
        except ContextActionUnavailableError as exc:
            return error_response(409, "context_action_unavailable", str(exc))

        return ok_response({
            "outcome": outcome,
            "now_context": build_now_context(limit=5),
        })

    @app.route("/api/context/outcomes/<int:outcome_id>/feedback", methods=["POST"])
    def submit_context_feedback(outcome_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error

        body = request.get_json(silent=True) or {}
        fit_feedback = str(body.get("fit_feedback", "")).strip()
        try:
            outcome = record_context_feedback(outcome_id, fit_feedback)
        except ValueError as exc:
            return error_response(400, "invalid_context_feedback", str(exc))
        except ContextOutcomeNotFoundError as exc:
            return error_response(404, "context_outcome_not_found", str(exc))

        return ok_response({
            "outcome": outcome,
            "effect": context_feedback_effect(outcome),
            "now_context": build_now_context(limit=5),
        })
