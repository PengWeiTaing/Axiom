"""Minimal public gateway for the Fire Cup knowledge-board generator.

This process deliberately does not import ``core.receiver``: the competition
frontend needs only a health probe and one generation endpoint, not Axiom's
personal-data APIs.  Coze credentials stay in the server process environment.

Run behind a TLS reverse proxy with one Gunicorn worker.  The checked-in
systemd unit uses threaded requests so identical requests can join the same
in-flight generation while the coordinator keeps remote generation at one.
"""
from __future__ import annotations

import copy
import hashlib
import json
import logging
import os
import secrets
import sqlite3
import threading
import time
import tempfile
from collections import OrderedDict
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Callable
from urllib.parse import urlsplit

from flask import Flask, Response, jsonify, request
from werkzeug.exceptions import RequestEntityTooLarge

from core.boards.knowledge_scene_quality import QUALITY_GATE_VERSION
from core.boards.knowledge_scene_spec import SCENE_SCHEMA_VERSION


logger = logging.getLogger("axiom.firecup_gateway")

GENERATE_PATH = "/api/learning/knowledge-scenes/generate"
JOBS_PATH = "/api/learning/knowledge-scenes/jobs"
MAX_GOAL_CHARS = 240
MAX_SOURCE_CHARS = 12_000
ALLOWED_CORS_HEADERS = frozenset({"content-type"})
JOB_RUNNING_RETRY_AFTER_MS = 2_000
JOB_QUEUED_RETRY_AFTER_MS = 5_000
# Bump this whenever deterministic enrichment/repair changes the learner-visible
# scene without changing the quality audit contract itself.  Keeping it in the
# request namespace prevents a recently approved result from masking a newly
# deployed repair during its TTL.
SCENE_PIPELINE_REVISION = "physics-canonical-v2"
_WORKFLOW_CACHE_ID = os.environ.get("COZE_WORKFLOW_ID", "unconfigured").strip() or "unconfigured"
_WORKFLOW_CACHE_REVISION = (
    os.environ.get("FIRECUP_WORKFLOW_REVISION", "unspecified").strip()
    or "unspecified"
)
CACHE_NAMESPACE = (
    f"scene-{SCENE_SCHEMA_VERSION}-quality-{QUALITY_GATE_VERSION}"
    f"-pipeline-{SCENE_PIPELINE_REVISION}"
    f"-workflow-{_WORKFLOW_CACHE_ID}-revision-{_WORKFLOW_CACHE_REVISION}"
)


def _default_job_db_path() -> str:
    configured = os.environ.get("FIRECUP_JOB_DB_PATH", "").strip()
    if configured:
        return configured
    if os.name == "nt":
        return str(Path(tempfile.gettempdir()) / "axiom-firecup-jobs.sqlite3")
    return "/var/lib/axiom/firecup-jobs.sqlite3"


def _bounded_env_int(
    name: str,
    default: int,
    *,
    minimum: int,
    maximum: int,
) -> int:
    raw = os.environ.get(name, "").strip()
    if not raw:
        return default
    try:
        value = int(raw)
    except ValueError as exc:
        raise RuntimeError(f"{name} must be an integer") from exc
    if not minimum <= value <= maximum:
        raise RuntimeError(f"{name} must be between {minimum} and {maximum}")
    return value


def _parse_allowed_origins(raw: str) -> frozenset[str]:
    """Parse exact serialized origins; wildcards and URL paths are rejected."""
    origins: set[str] = set()
    for item in raw.split(","):
        origin = item.strip()
        if not origin:
            continue
        parsed = urlsplit(origin)
        if (
            origin == "*"
            or parsed.scheme not in {"http", "https"}
            or not parsed.hostname
            or parsed.username is not None
            or parsed.password is not None
            or parsed.path
            or parsed.query
            or parsed.fragment
        ):
            raise RuntimeError(
                "FIRECUP_ALLOWED_ORIGINS must contain comma-separated exact "
                "http(s) origins without paths or wildcards"
            )
        origins.add(origin)
    return frozenset(origins)


@dataclass(frozen=True)
class GatewaySettings:
    allowed_origins: frozenset[str] = field(default_factory=frozenset)
    cache_ttl_seconds: int = 900
    cache_max_entries: int = 64
    inflight_wait_seconds: int = 330
    max_request_bytes: int = 65_536
    job_ttl_seconds: int = 1_800
    job_max_entries: int = 128
    job_queue_max_entries: int = 8
    job_db_path: str = field(default_factory=_default_job_db_path)

    @classmethod
    def from_env(cls) -> "GatewaySettings":
        return cls(
            allowed_origins=_parse_allowed_origins(
                os.environ.get("FIRECUP_ALLOWED_ORIGINS", "")
            ),
            cache_ttl_seconds=_bounded_env_int(
                "FIRECUP_CACHE_TTL_SECONDS", 900, minimum=1, maximum=86_400
            ),
            cache_max_entries=_bounded_env_int(
                "FIRECUP_CACHE_MAX_ENTRIES", 64, minimum=1, maximum=1_000
            ),
            inflight_wait_seconds=_bounded_env_int(
                "FIRECUP_INFLIGHT_WAIT_SECONDS", 330, minimum=5, maximum=900
            ),
            max_request_bytes=_bounded_env_int(
                "FIRECUP_MAX_REQUEST_BYTES",
                65_536,
                minimum=16_384,
                maximum=1_048_576,
            ),
            job_ttl_seconds=_bounded_env_int(
                "FIRECUP_JOB_TTL_SECONDS", 1_800, minimum=60, maximum=86_400
            ),
            job_max_entries=_bounded_env_int(
                "FIRECUP_JOB_MAX_ENTRIES", 128, minimum=8, maximum=10_000
            ),
            job_queue_max_entries=_bounded_env_int(
                "FIRECUP_JOB_QUEUE_MAX_ENTRIES", 8, minimum=1, maximum=128
            ),
            job_db_path=_default_job_db_path(),
        )


class GatewayBusyError(RuntimeError):
    """Another non-identical generation is already using the only slot."""


class InflightWaitTimeoutError(RuntimeError):
    """An identical in-flight generation did not finish in the wait budget."""


class GenerationUnavailableError(RuntimeError):
    """The configured upstream cannot produce a scene right now."""


class JobQueueFullError(RuntimeError):
    """The bounded asynchronous generation queue has no free slot."""


class JobNotFoundError(LookupError):
    """A job id was never present (or was evicted under the hard cap)."""


class JobExpiredError(LookupError):
    """A known terminal job is past its result retention window."""


@dataclass
class _CacheRecord:
    expires_at: float
    scene: dict[str, Any]


@dataclass
class _Flight:
    event: threading.Event = field(default_factory=threading.Event)
    scene: dict[str, Any] | None = None
    error: Exception | None = None


class GenerationCoordinator:
    """Serialize remote work and coalesce identical requests in this process."""

    def __init__(
        self,
        *,
        cache_ttl_seconds: int,
        cache_max_entries: int,
        inflight_wait_seconds: int,
        cache_namespace: str = CACHE_NAMESPACE,
    ) -> None:
        self._cache_ttl_seconds = cache_ttl_seconds
        self._cache_max_entries = cache_max_entries
        self._inflight_wait_seconds = inflight_wait_seconds
        self._cache_namespace = cache_namespace
        self._lock = threading.Lock()
        self._generation_slot = threading.BoundedSemaphore(value=1)
        self._cache: OrderedDict[str, _CacheRecord] = OrderedDict()
        self._inflight: dict[str, _Flight] = {}

    def request_key(self, goal: str, source_text: str) -> str:
        payload = json.dumps(
            {
                "namespace": self._cache_namespace,
                "goal": goal,
                "source_text": source_text,
            },
            ensure_ascii=False,
            sort_keys=True,
            separators=(",", ":"),
        ).encode("utf-8")
        return hashlib.sha256(payload).hexdigest()

    def _prune_cache(self, now: float) -> None:
        expired = [
            key for key, record in self._cache.items() if record.expires_at <= now
        ]
        for key in expired:
            self._cache.pop(key, None)

    def generate(
        self,
        goal: str,
        source_text: str,
        producer: Callable[[], dict[str, Any]],
    ) -> tuple[dict[str, Any], str]:
        key = self.request_key(goal, source_text)
        now = time.monotonic()

        with self._lock:
            self._prune_cache(now)
            cached = self._cache.get(key)
            if cached is not None:
                self._cache.move_to_end(key)
                return copy.deepcopy(cached.scene), "hit"

            flight = self._inflight.get(key)
            if flight is None:
                flight = _Flight()
                self._inflight[key] = flight
                is_owner = True
            else:
                is_owner = False

        if not is_owner:
            if not flight.event.wait(timeout=self._inflight_wait_seconds):
                raise InflightWaitTimeoutError(
                    "相同白板请求仍在生成，请稍后重试"
                )
            if flight.error is not None:
                raise flight.error
            if flight.scene is None:
                raise RuntimeError("in-flight generation finished without a result")
            return copy.deepcopy(flight.scene), "shared"

        slot_acquired = self._generation_slot.acquire(blocking=False)
        if not slot_acquired:
            error = GatewayBusyError("另一张白板正在生成，请稍后重试")
            with self._lock:
                flight.error = error
                self._inflight.pop(key, None)
                flight.event.set()
            raise error

        try:
            scene = producer()
            if not isinstance(scene, dict):
                raise RuntimeError("knowledge scene generator returned a non-object")
            stored_scene = copy.deepcopy(scene)
            quality_status = str(
                (stored_scene.get("generation") or {}).get("quality_status") or ""
            )
            with self._lock:
                if quality_status == "approved":
                    self._cache[key] = _CacheRecord(
                        expires_at=time.monotonic() + self._cache_ttl_seconds,
                        scene=stored_scene,
                    )
                    self._cache.move_to_end(key)
                    while len(self._cache) > self._cache_max_entries:
                        self._cache.popitem(last=False)
                flight.scene = stored_scene
            return copy.deepcopy(stored_scene), "miss"
        except Exception as exc:
            with self._lock:
                flight.error = exc
            raise
        finally:
            self._generation_slot.release()
            with self._lock:
                self._inflight.pop(key, None)
                flight.event.set()


_JOB_PROGRESS_MESSAGES = {
    "queued": "已加入生成队列",
    "waiting_for_slot": "正在等待生成资源",
    "generating": "正在生成并校验白板",
    "completed": "白板已生成",
    "failed": "白板生成失败",
}


def _job_error_for_exception(exc: Exception) -> dict[str, Any]:
    if isinstance(exc, GatewayBusyError):
        return {
            "code": "generation_busy",
            "message": str(exc),
            "retryable": True,
        }
    if isinstance(exc, InflightWaitTimeoutError):
        return {
            "code": "generation_wait_timeout",
            "message": str(exc),
            "retryable": True,
        }
    if isinstance(exc, GenerationUnavailableError):
        return {
            "code": "knowledge_scene_unavailable",
            "message": str(exc),
            "retryable": True,
        }
    logger.exception("asynchronous fire-cup generation failed", exc_info=exc)
    return {
        "code": "generation_failed",
        "message": "白板生成失败，请稍后重试",
        "retryable": True,
    }


class GenerationJobStore:
    """SQLite-backed, single-worker queue for long-running generations.

    SQLite makes terminal state and restart failures observable after a service
    restart.  Exactly one dispatcher thread is created per app process; the
    production service must continue to run one Gunicorn worker as documented.
    """

    _TERMINAL_STATUSES = frozenset({"succeeded", "failed"})

    def __init__(
        self,
        *,
        db_path: str,
        ttl_seconds: int,
        max_entries: int,
        queue_max_entries: int,
        busy_wait_seconds: int,
        coordinator: GenerationCoordinator,
        scene_generator: Callable[[str, str], dict[str, Any]],
    ) -> None:
        if db_path != ":memory:" and not db_path.startswith("file:"):
            db_path = str(Path(db_path).expanduser().resolve())
        self._db_path = db_path
        self._ttl_seconds = ttl_seconds
        self._max_entries = max_entries
        self._queue_max_entries = queue_max_entries
        self._busy_wait_seconds = busy_wait_seconds
        self._coordinator = coordinator
        self._scene_generator = scene_generator
        self._condition = threading.Condition(threading.RLock())
        self._worker: threading.Thread | None = None
        self._closed = False

        if queue_max_entries > max_entries:
            raise RuntimeError("job queue limit cannot exceed the job store limit")

        if db_path != ":memory:" and not db_path.startswith("file:"):
            Path(db_path).parent.mkdir(parents=True, exist_ok=True)
        self._connection = sqlite3.connect(
            db_path,
            check_same_thread=False,
            isolation_level=None,
            timeout=5,
            uri=db_path.startswith("file:"),
        )
        self._connection.row_factory = sqlite3.Row
        self._connection.execute("PRAGMA busy_timeout = 5000")
        # A single dispatcher owns this connection, so a rollback journal is
        # sufficient and avoids leaving a long-lived sidecar with source data.
        self._connection.execute("PRAGMA journal_mode = DELETE")
        self._connection.execute("PRAGMA synchronous = FULL")
        if os.name != "nt" and db_path != ":memory:" and not db_path.startswith(
            "file:"
        ):
            os.chmod(db_path, 0o600)
        self._initialize_database()

    def _initialize_database(self) -> None:
        now = time.time()
        restart_error = json.dumps(
            {
                "code": "worker_restarted",
                "message": "生成服务在任务执行期间重启，请重新提交",
                "retryable": True,
            },
            ensure_ascii=False,
            separators=(",", ":"),
        )
        revised_error = json.dumps(
            {
                "code": "pipeline_revised",
                "message": "生成流程已更新，请重新提交",
                "retryable": True,
            },
            ensure_ascii=False,
            separators=(",", ":"),
        )
        with self._condition:
            self._connection.executescript(
                """
                CREATE TABLE IF NOT EXISTS jobs (
                    id TEXT PRIMARY KEY,
                    request_key TEXT NOT NULL,
                    goal TEXT NOT NULL,
                    source_text TEXT NOT NULL,
                    status TEXT NOT NULL CHECK (
                        status IN ('queued', 'running', 'succeeded', 'failed')
                    ),
                    progress TEXT NOT NULL,
                    error TEXT,
                    scene_json TEXT,
                    cache_status TEXT,
                    created_at REAL NOT NULL,
                    updated_at REAL NOT NULL,
                    expires_at REAL NOT NULL
                );
                CREATE INDEX IF NOT EXISTS jobs_request_key_idx
                    ON jobs(request_key, updated_at DESC);
                CREATE INDEX IF NOT EXISTS jobs_queue_idx
                    ON jobs(status, created_at ASC);
                CREATE UNIQUE INDEX IF NOT EXISTS jobs_one_active_request_idx
                    ON jobs(request_key)
                    WHERE status IN ('queued', 'running');
                """
            )
            self._connection.execute(
                """
                UPDATE jobs
                   SET status = 'failed', progress = 'failed', error = ?,
                       scene_json = NULL, cache_status = NULL,
                       goal = '', source_text = '',
                       updated_at = ?, expires_at = ?
                 WHERE status = 'running'
                """,
                (restart_error, now, now + self._ttl_seconds),
            )
            queued_rows = self._connection.execute(
                """
                SELECT id, request_key, goal, source_text
                  FROM jobs WHERE status = 'queued'
                """
            ).fetchall()
            for row in queued_rows:
                current_key = self._coordinator.request_key(
                    str(row["goal"]), str(row["source_text"])
                )
                if current_key == row["request_key"]:
                    continue
                self._connection.execute(
                    """
                    UPDATE jobs
                       SET status = 'failed', progress = 'failed', error = ?,
                           scene_json = NULL, cache_status = NULL,
                           goal = '', source_text = '',
                           updated_at = ?, expires_at = ?
                     WHERE id = ? AND status = 'queued'
                    """,
                    (revised_error, now, now + self._ttl_seconds, row["id"]),
                )
            queued = self._connection.execute(
                "SELECT 1 FROM jobs WHERE status = 'queued' LIMIT 1"
            ).fetchone()
            if queued is not None:
                self._ensure_worker_locked()

    def close(self) -> None:
        """Stop an idle dispatcher and close SQLite (primarily for tests)."""
        with self._condition:
            self._closed = True
            self._condition.notify_all()
            worker = self._worker
        if worker is not None:
            worker.join(timeout=2)
        if worker is None or not worker.is_alive():
            with self._condition:
                self._connection.close()

    def _ensure_worker_locked(self) -> None:
        if self._closed:
            raise RuntimeError("generation job store is closed")
        if self._worker is not None and self._worker.is_alive():
            return
        self._worker = threading.Thread(
            target=self._worker_loop,
            name="firecup-generation-worker",
            daemon=True,
        )
        self._worker.start()

    def _row_to_snapshot(self, row: sqlite3.Row) -> dict[str, Any]:
        status = str(row["status"])
        snapshot: dict[str, Any] = {
            "job_id": str(row["id"]),
            "status": status,
            "progress": {
                "stage": str(row["progress"]),
                "message": _JOB_PROGRESS_MESSAGES.get(
                    str(row["progress"]), "正在处理"
                ),
            },
            "created_at": float(row["created_at"]),
            "updated_at": float(row["updated_at"]),
        }
        if status == "succeeded":
            if not row["scene_json"]:
                raise RuntimeError("succeeded generation job has no scene payload")
            snapshot["scene"] = json.loads(str(row["scene_json"]))
            snapshot["request"] = {"cache": row["cache_status"] or "miss"}
        elif status == "failed":
            snapshot["error"] = json.loads(str(row["error"]))
        else:
            snapshot["retry_after_ms"] = (
                JOB_QUEUED_RETRY_AFTER_MS
                if row["progress"] in {"queued", "waiting_for_slot"}
                else JOB_RUNNING_RETRY_AFTER_MS
            )
        return snapshot

    def _prune_for_capacity_locked(self, now: float) -> None:
        # Keep an expired result for one additional TTL so GET can distinguish
        # a known expired id (410) from an id that never existed (404).
        self._connection.execute(
            """
            DELETE FROM jobs
             WHERE status IN ('succeeded', 'failed') AND expires_at <= ?
            """,
            (now - self._ttl_seconds,),
        )

    def submit(self, goal: str, source_text: str) -> tuple[dict[str, Any], str]:
        request_key = self._coordinator.request_key(goal, source_text)
        now = time.time()
        with self._condition:
            self._prune_for_capacity_locked(now)
            existing = self._connection.execute(
                """
                SELECT * FROM jobs
                 WHERE request_key = ? AND (
                       status IN ('queued', 'running')
                       OR (status = 'succeeded' AND expires_at > ?)
                 )
                 ORDER BY CASE status
                     WHEN 'running' THEN 0 WHEN 'queued' THEN 1 ELSE 2 END,
                     updated_at DESC
                 LIMIT 1
                """,
                (request_key, now),
            ).fetchone()
            if existing is not None:
                reuse = (
                    "completed" if existing["status"] == "succeeded" else "inflight"
                )
                return self._row_to_snapshot(existing), reuse

            active_count = int(
                self._connection.execute(
                    """
                    SELECT COUNT(*) FROM jobs
                     WHERE status IN ('queued', 'running')
                    """
                ).fetchone()[0]
            )
            if active_count >= self._queue_max_entries:
                raise JobQueueFullError("白板生成队列已满，请稍后重试")

            total_count = int(
                self._connection.execute("SELECT COUNT(*) FROM jobs").fetchone()[0]
            )
            while total_count >= self._max_entries:
                evicted = self._connection.execute(
                    """
                    DELETE FROM jobs WHERE id = (
                        SELECT id FROM jobs
                         WHERE status IN ('succeeded', 'failed')
                           AND expires_at <= ?
                         ORDER BY updated_at ASC LIMIT 1
                    )
                    """,
                    (now,),
                ).rowcount
                if not evicted:
                    raise JobQueueFullError("白板任务存储已满，请稍后重试")
                total_count -= 1

            job_id = secrets.token_urlsafe(24)
            self._connection.execute(
                """
                INSERT INTO jobs (
                    id, request_key, goal, source_text, status, progress,
                    error, scene_json, cache_status,
                    created_at, updated_at, expires_at
                ) VALUES (?, ?, ?, ?, 'queued', 'queued', NULL, NULL, NULL, ?, ?, ?)
                """,
                (
                    job_id,
                    request_key,
                    goal,
                    source_text,
                    now,
                    now,
                    now + self._ttl_seconds,
                ),
            )
            row = self._connection.execute(
                "SELECT * FROM jobs WHERE id = ?", (job_id,)
            ).fetchone()
            self._ensure_worker_locked()
            self._condition.notify_all()
            return self._row_to_snapshot(row), "new"

    def get(self, job_id: str) -> dict[str, Any]:
        now = time.time()
        with self._condition:
            row = self._connection.execute(
                "SELECT * FROM jobs WHERE id = ?", (job_id,)
            ).fetchone()
            if row is None:
                raise JobNotFoundError(job_id)
            if (
                row["status"] in self._TERMINAL_STATUSES
                and float(row["expires_at"]) <= now
            ):
                raise JobExpiredError(job_id)
            return self._row_to_snapshot(row)

    def _claim_next_job_locked(self) -> sqlite3.Row | None:
        row = self._connection.execute(
            """
            SELECT * FROM jobs WHERE status = 'queued'
             ORDER BY created_at ASC LIMIT 1
            """
        ).fetchone()
        if row is None:
            return None
        now = time.time()
        claimed = self._connection.execute(
            """
            UPDATE jobs SET status = 'running', progress = 'generating',
                            updated_at = ?, expires_at = ?
             WHERE id = ? AND status = 'queued'
            """,
            (now, now + self._ttl_seconds, row["id"]),
        ).rowcount
        if not claimed:
            return None
        return self._connection.execute(
            "SELECT * FROM jobs WHERE id = ?", (row["id"],)
        ).fetchone()

    def _worker_loop(self) -> None:
        while True:
            row: sqlite3.Row | None = None
            try:
                with self._condition:
                    if self._closed:
                        return
                    row = self._claim_next_job_locked()
                    if row is None:
                        self._condition.wait(timeout=30)
                        if self._closed:
                            return
                        row = self._claim_next_job_locked()
                        if row is None:
                            self._worker = None
                            return
                self._run_job(row)
            except Exception:
                logger.exception("generation dispatcher iteration failed")
                if row is not None:
                    self._best_effort_fail_job(str(row["id"]))
                time.sleep(0.5)

    def _best_effort_fail_job(self, job_id: str) -> None:
        error_json = json.dumps(
            {
                "code": "job_state_error",
                "message": "生成任务状态保存失败，请重新提交",
                "retryable": True,
            },
            ensure_ascii=False,
            separators=(",", ":"),
        )
        now = time.time()
        try:
            with self._condition:
                self._connection.execute(
                    """
                    UPDATE jobs
                       SET status = 'failed', progress = 'failed', error = ?,
                           scene_json = NULL, cache_status = NULL,
                           goal = '', source_text = '',
                           updated_at = ?, expires_at = ?
                     WHERE id = ? AND status = 'running'
                    """,
                    (error_json, now, now + self._ttl_seconds, job_id),
                )
        except Exception:
            logger.exception("could not persist dispatcher failure state")

    def _run_job(self, row: sqlite3.Row) -> None:
        job_id = str(row["id"])
        goal = str(row["goal"])
        source_text = str(row["source_text"])
        deadline = time.monotonic() + self._busy_wait_seconds
        try:
            while True:
                try:
                    scene, cache_status = self._coordinator.generate(
                        goal,
                        source_text,
                        lambda: self._scene_generator(goal, source_text),
                    )
                    quality_status = str(
                        (scene.get("generation") or {}).get("quality_status") or ""
                    )
                    if quality_status != "approved":
                        raise GenerationUnavailableError(
                            "生成结果未通过质量门，请重新提交"
                        )
                    break
                except GatewayBusyError:
                    if time.monotonic() >= deadline:
                        raise
                    now = time.time()
                    with self._condition:
                        self._connection.execute(
                            """
                            UPDATE jobs SET progress = 'waiting_for_slot',
                                            updated_at = ?, expires_at = ?
                             WHERE id = ? AND status = 'running'
                            """,
                            (now, now + self._ttl_seconds, job_id),
                        )
                    time.sleep(0.25)
                    now = time.time()
                    with self._condition:
                        self._connection.execute(
                            """
                            UPDATE jobs SET progress = 'generating',
                                            updated_at = ?, expires_at = ?
                             WHERE id = ? AND status = 'running'
                            """,
                            (now, now + self._ttl_seconds, job_id),
                        )

            now = time.time()
            scene_json = json.dumps(
                scene, ensure_ascii=False, separators=(",", ":")
            )
            with self._condition:
                self._connection.execute(
                    """
                    UPDATE jobs
                       SET status = 'succeeded', progress = 'completed',
                           scene_json = ?, error = NULL, cache_status = ?,
                           goal = '', source_text = '',
                           updated_at = ?, expires_at = ?
                     WHERE id = ? AND status = 'running'
                    """,
                    (
                        scene_json,
                        cache_status,
                        now,
                        now + self._ttl_seconds,
                        job_id,
                    ),
                )
        except Exception as exc:
            now = time.time()
            error_json = json.dumps(
                _job_error_for_exception(exc),
                ensure_ascii=False,
                separators=(",", ":"),
            )
            with self._condition:
                self._connection.execute(
                    """
                    UPDATE jobs
                       SET status = 'failed', progress = 'failed', error = ?,
                           scene_json = NULL, cache_status = NULL,
                           goal = '', source_text = '',
                           updated_at = ?, expires_at = ?
                     WHERE id = ? AND status = 'running'
                    """,
                    (error_json, now, now + self._ttl_seconds, job_id),
                )


def _default_scene_generator(goal: str, source_text: str) -> dict[str, Any]:
    # Import lazily so the service reads COZE_* from the server environment and
    # so merely importing the WSGI app never initializes the full Axiom server.
    from core.boards.knowledge_scene import (
        SceneGenerationUnavailableError,
        generate_knowledge_scene,
    )

    try:
        return generate_knowledge_scene(
            goal,
            source_text=source_text,
            allow_remote=True,
        )
    except SceneGenerationUnavailableError as exc:
        raise GenerationUnavailableError(str(exc)) from exc


def _error_response(status: int, code: str, message: str):
    return jsonify({"ok": False, "error": {"code": code, "message": message}}), status


def _read_generation_input(settings: GatewaySettings) -> tuple[str, str] | Response:
    if not request.is_json:
        return _error_response(
            415, "json_required", "请求必须使用 application/json"
        )
    body = request.get_json(silent=True)
    if not isinstance(body, dict):
        return _error_response(400, "invalid_json", "JSON body 必须是对象")

    raw_goal = body.get("goal")
    raw_source = body.get("source_text", "")
    if not isinstance(raw_goal, str):
        return _error_response(400, "invalid_goal", "goal 必须是字符串")
    if raw_source is None:
        raw_source = ""
    if not isinstance(raw_source, str):
        return _error_response(
            400, "invalid_source_text", "source_text 必须是字符串"
        )
    if len(raw_goal) > MAX_GOAL_CHARS:
        return _error_response(
            400, "goal_too_long", f"goal 最多 {MAX_GOAL_CHARS} 个字符"
        )
    if len(raw_source) > MAX_SOURCE_CHARS:
        return _error_response(
            400,
            "source_too_long",
            f"source_text 最多 {MAX_SOURCE_CHARS} 个字符",
        )

    goal = raw_goal.strip()
    source_text = raw_source.strip()
    if not goal:
        return _error_response(400, "missing_goal", "goal 不能为空")
    return goal, source_text


def create_app(
    *,
    settings: GatewaySettings | None = None,
    scene_generator: Callable[[str, str], dict[str, Any]] | None = None,
    coordinator: GenerationCoordinator | None = None,
) -> Flask:
    settings = settings or GatewaySettings.from_env()
    scene_generator = scene_generator or _default_scene_generator
    coordinator = coordinator or GenerationCoordinator(
        cache_ttl_seconds=settings.cache_ttl_seconds,
        cache_max_entries=settings.cache_max_entries,
        inflight_wait_seconds=settings.inflight_wait_seconds,
    )
    job_store = GenerationJobStore(
        db_path=settings.job_db_path,
        ttl_seconds=settings.job_ttl_seconds,
        max_entries=settings.job_max_entries,
        queue_max_entries=settings.job_queue_max_entries,
        busy_wait_seconds=settings.inflight_wait_seconds,
        coordinator=coordinator,
        scene_generator=scene_generator,
    )

    app = Flask(__name__, static_folder=None)
    app.config["MAX_CONTENT_LENGTH"] = settings.max_request_bytes
    app.extensions["firecup_generation_jobs"] = job_store

    def is_generation_path(path: str) -> bool:
        return path == GENERATE_PATH or path == JOBS_PATH or path.startswith(
            f"{JOBS_PATH}/"
        )

    def cors_method_for_path(path: str) -> str:
        if path == "/health" or path.startswith(f"{JOBS_PATH}/"):
            return "GET"
        return "POST"

    @app.before_request
    def enforce_exact_cors_origin():
        origin = request.headers.get("Origin", "")
        requires_registered_origin = request.method == "POST" and request.path in {
            GENERATE_PATH,
            JOBS_PATH,
        }
        if requires_registered_origin and not origin:
            return _error_response(
                403, "origin_required", "生成请求必须来自已登记的比赛页面"
            )
        if origin and origin not in settings.allowed_origins:
            return _error_response(
                403, "cors_origin_denied", "请求来源不在允许列表中"
            )

        if request.method != "OPTIONS":
            return None
        requested_method = request.headers.get(
            "Access-Control-Request-Method", ""
        ).upper()
        expected_method = cors_method_for_path(request.path)
        requested_headers = {
            item.strip().lower()
            for item in request.headers.get(
                "Access-Control-Request-Headers", ""
            ).split(",")
            if item.strip()
        }
        if requested_method != expected_method or not requested_headers.issubset(
            ALLOWED_CORS_HEADERS
        ):
            return _error_response(
                403, "cors_preflight_denied", "跨域预检方法或请求头不受支持"
            )
        return None

    @app.after_request
    def add_exact_cors_headers(response: Response):
        origin = request.headers.get("Origin", "")
        if origin and origin in settings.allowed_origins:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Methods"] = (
                f"{cors_method_for_path(request.path)}, OPTIONS"
            )
            response.headers["Access-Control-Allow-Headers"] = "Content-Type"
            response.headers["Access-Control-Max-Age"] = "600"
            response.headers.add("Vary", "Origin")
            response.headers.add("Vary", "Access-Control-Request-Method")
            response.headers.add("Vary", "Access-Control-Request-Headers")
        response.headers["Cache-Control"] = "no-store"
        return response

    @app.errorhandler(RequestEntityTooLarge)
    def request_too_large(_exc: RequestEntityTooLarge):
        return _error_response(
            413,
            "request_too_large",
            f"请求体最多 {settings.max_request_bytes} 字节",
        )

    @app.get("/health")
    def health():
        workflow_configured = bool(
            os.environ.get("COZE_API_TOKEN", "").strip()
            and os.environ.get("COZE_WORKFLOW_ID", "").strip()
        )
        return jsonify(
            {
                "ok": True,
                "service": "axiom-firecup-gateway",
                "status": "ready" if workflow_configured else "degraded",
                "workflow_configured": workflow_configured,
                "max_concurrent_generations": 1,
                "limits": {
                    "goal_chars": MAX_GOAL_CHARS,
                    "source_text_chars": MAX_SOURCE_CHARS,
                    "async_queue_entries": settings.job_queue_max_entries,
                },
            }
        )

    @app.route(
        JOBS_PATH,
        methods=["POST", "OPTIONS"],
        provide_automatic_options=False,
    )
    def create_generation_job():
        if request.method == "OPTIONS":
            return "", 204

        parsed = _read_generation_input(settings)
        if isinstance(parsed, Response) or (
            isinstance(parsed, tuple)
            and parsed
            and isinstance(parsed[0], Response)
        ):
            return parsed
        goal, source_text = parsed

        try:
            snapshot, reuse = job_store.submit(goal, source_text)
        except JobQueueFullError as exc:
            response, status = _error_response(429, "job_queue_full", str(exc))
            response.headers["Retry-After"] = "5"
            return response, status
        except Exception:
            logger.exception("failed to create asynchronous generation job")
            return _error_response(
                500, "job_creation_failed", "无法创建生成任务，请稍后重试"
            )

        job_id = snapshot["job_id"]
        response = jsonify(
            {
                "ok": True,
                **snapshot,
                "status_url": f"{JOBS_PATH}/{job_id}",
                "request": {**snapshot.get("request", {}), "reuse": reuse},
                "retry_after_ms": snapshot.get(
                    "retry_after_ms", JOB_RUNNING_RETRY_AFTER_MS
                ),
            }
        )
        response.status_code = 202
        response.headers["Retry-After"] = str(
            max(1, (response.get_json()["retry_after_ms"] + 999) // 1_000)
        )
        return response

    @app.route(
        f"{JOBS_PATH}/<job_id>",
        methods=["GET", "OPTIONS"],
        provide_automatic_options=False,
    )
    def get_generation_job(job_id: str):
        if request.method == "OPTIONS":
            return "", 204
        try:
            snapshot = job_store.get(job_id)
        except JobExpiredError:
            return _error_response(
                410, "job_expired", "生成任务结果已过期，请重新提交"
            )
        except JobNotFoundError:
            return _error_response(404, "job_not_found", "未找到生成任务")
        except Exception:
            logger.exception("failed to read asynchronous generation job")
            return _error_response(
                500, "job_read_failed", "无法读取生成任务，请稍后重试"
            )

        response = jsonify({"ok": True, **snapshot})
        if snapshot["status"] in {"queued", "running"}:
            response.headers["Retry-After"] = str(
                max(1, (snapshot["retry_after_ms"] + 999) // 1_000)
            )
        return response

    @app.route(
        GENERATE_PATH,
        methods=["POST", "OPTIONS"],
        provide_automatic_options=False,
    )
    def generate_scene():
        if request.method == "OPTIONS":
            return "", 204

        parsed = _read_generation_input(settings)
        if isinstance(parsed, Response) or (
            isinstance(parsed, tuple)
            and parsed
            and isinstance(parsed[0], Response)
        ):
            return parsed
        goal, source_text = parsed

        try:
            scene, cache_status = coordinator.generate(
                goal,
                source_text,
                lambda: scene_generator(goal, source_text),
            )
        except GatewayBusyError as exc:
            response, status = _error_response(429, "generation_busy", str(exc))
            response.headers["Retry-After"] = "5"
            return response, status
        except InflightWaitTimeoutError as exc:
            return _error_response(504, "generation_wait_timeout", str(exc))
        except GenerationUnavailableError as exc:
            return _error_response(503, "knowledge_scene_unavailable", str(exc))
        except Exception:
            logger.exception("fire-cup knowledge scene generation failed")
            return _error_response(
                500, "generation_failed", "白板生成失败，请稍后重试"
            )

        response = jsonify(
            {
                "ok": True,
                "scene": scene,
                "request": {"cache": cache_status},
            }
        )
        response.headers["X-Axiom-Cache"] = cache_status.upper()
        return response

    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        host=os.environ.get("FIRECUP_GATEWAY_HOST", "127.0.0.1"),
        port=_bounded_env_int(
            "FIRECUP_GATEWAY_PORT", 5010, minimum=1, maximum=65_535
        ),
        threaded=True,
    )
