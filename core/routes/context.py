"""Current-context API routes."""
from flask import request

from core._common import error_response, ok_response, parse_positive_int, require_key
from core.context_engine import MAX_CONTEXT_ACTIONS, build_now_context


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
