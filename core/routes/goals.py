"""Commitment metadata and review routes for confirmed goals."""
from __future__ import annotations

from flask import request

from core.audit import write_audit_log
from core.database import get_db_connection
from core.goals import (
    GoalHierarchyError,
    GoalNotConfirmedError,
    GoalNotFoundError,
    review_goal_profile,
    update_goal_profile,
)
from core.http_utils import error_response, ok_response, require_key


def register_routes(app):
    @app.route("/api/goals/<int:memory_id>/commitment", methods=["PUT"])
    def update_goal_commitment(memory_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error

        body = request.get_json(silent=True)
        if not isinstance(body, dict):
            return error_response(400, "invalid_goal_commitment", "JSON body 必须是对象")

        conn = get_db_connection()
        try:
            profile = update_goal_profile(conn, memory_id, body)
            conn.commit()
        except GoalNotFoundError as exc:
            return error_response(404, "goal_not_found", str(exc))
        except GoalNotConfirmedError as exc:
            return error_response(409, "goal_not_confirmed", str(exc))
        except (GoalHierarchyError, ValueError) as exc:
            return error_response(400, "invalid_goal_commitment", str(exc))
        finally:
            conn.close()

        write_audit_log("goal_commitment_update", "memory", memory_id)
        return ok_response({"goal_profile": profile})

    @app.route("/api/goals/<int:memory_id>/review", methods=["POST"])
    def review_goal_commitment(memory_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            profile = review_goal_profile(conn, memory_id)
            conn.commit()
        except GoalNotFoundError as exc:
            return error_response(404, "goal_not_found", str(exc))
        except GoalNotConfirmedError as exc:
            return error_response(409, "goal_not_reviewable", str(exc))
        finally:
            conn.close()

        write_audit_log("goal_commitment_review", "memory", memory_id)
        return ok_response({"goal_profile": profile})
