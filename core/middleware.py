"""Axiom middleware: rate limiting, logging, security, CORS, compression."""
from __future__ import annotations

import gzip as _gzip
import time as _time
import uuid as _uuid
import logging
import threading as _threading
from datetime import datetime, timezone

from flask import request

logger = logging.getLogger("axiom.receiver")

# Rate limiter
_rate_limits: dict[str, list[float]] = {}
_rate_limit = 120
_rate_window = 60

# Request metrics
_start_time = datetime.now(timezone.utc)
_metrics_lock = _threading.Lock()
_metrics = {"requests": 0, "errors": 0, "slow": 0, "endpoints": {}}


def get_metrics() -> dict:
    with _metrics_lock:
        return dict(_metrics)


def get_uptime() -> str:
    uptime = (datetime.now(timezone.utc) - _start_time).total_seconds()
    return f"{int(uptime // 3600)}h {int((uptime % 3600) // 60)}m"


def register_middleware(app):
    """注册所有中间件到 Flask app。"""

    @app.before_request
    def check_rate_limit():
        import time as _t
        ip = request.remote_addr or "unknown"
        if ip in ("127.0.0.1", "localhost", "::1"):
            return None
        now = _t.time()
        window_start = now - _rate_window
        if ip not in _rate_limits:
            _rate_limits[ip] = []
        _rate_limits[ip] = [t for t in _rate_limits[ip] if t > window_start]
        if len(_rate_limits[ip]) >= _rate_limit:
            logger.warning("rate limit exceeded for %s", ip)
            from core._common import error_response
            return error_response(429, "rate_limited", "请求过于频繁，请稍后再试。")
        _rate_limits[ip].append(now)

    @app.before_request
    def handle_cors_preflight():
        if request.method == "OPTIONS":
            resp = app.make_default_options_response()
            resp.headers["Access-Control-Allow-Origin"] = "*"
            resp.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
            resp.headers["Access-Control-Allow-Headers"] = "Content-Type, X-Axiom-Key"
            return resp

    @app.before_request
    def log_request_start():
        request._start_time = _time.time()
        request._req_id = str(_uuid.uuid4())[:8]

    @app.after_request
    def compress_response(response):
        accept = request.headers.get("Accept-Encoding", "")
        if "gzip" not in accept:
            return response
        if response.content_length and response.content_length < 500:
            return response
        if "text/event-stream" in response.content_type:
            return response
        response.data = _gzip.compress(response.data)
        response.headers["Content-Encoding"] = "gzip"
        response.headers["Content-Length"] = str(len(response.data))
        return response

    @app.after_request
    def add_security_headers(response):
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        if request.path.startswith("/static/"):
            response.headers["Cache-Control"] = "public, max-age=86400, immutable"
        elif request.path != "/health":
            response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        return response

    @app.after_request
    def add_cors_headers(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, X-Axiom-Key"
        return response

    @app.after_request
    def log_request_end(response):
        duration_ms = int((_time.time() - getattr(request, "_start_time", _time.time())) * 1000)
        with _metrics_lock:
            _metrics["requests"] += 1
            ep = _metrics["endpoints"]
            key = f"{request.method} {request.path}"
            ep[key] = ep.get(key, 0) + 1
            if response.status_code >= 400:
                _metrics["errors"] += 1
            if duration_ms > 500:
                _metrics["slow"] += 1
        req_id = getattr(request, "_req_id", "--------")
        if duration_ms > 500:
            logger.warning("[%s] SLOW %s %s -> %s (%dms)", req_id, request.method, request.path,
                           response.status_code, duration_ms)
        else:
            logger.info("[%s] %s %s -> %s (%dms)", req_id, request.method, request.path,
                        response.status_code, duration_ms)
        return response
