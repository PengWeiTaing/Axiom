"""Automation job execution and run-history helpers."""
from __future__ import annotations

import json
import logging
import os
import sqlite3
import subprocess
import sys
from datetime import datetime, timedelta, timezone

from core.artifacts import (
    artifact_sort_key,
    build_artifact_summary_from_path,
    build_artifact_summary_payload,
    list_review_artifacts,
)
from core.config import (
    AUTOMATION_JOBS,
    AUTOMATION_LOCK_PATH,
    AUTOMATION_TIMEOUT_SECONDS,
    AXIOM_ROOT,
    LOCAL_UTC_OFFSET,
    PROJECT_ROOT,
)
from core.database import get_db_connection

logger = logging.getLogger("axiom.receiver")


def _join_conditions(conditions: list[str], prefix: str) -> str:
    if not conditions:
        return ""
    return f"{prefix} " + " AND ".join(conditions)


def _parse_utc_offset_value(offset_text: str) -> timezone:
    text = str(offset_text or "").strip()
    if not text:
        return timezone.utc
    sign = -1 if text.startswith("-") else 1
    normalized = text[1:] if text[0] in {"+", "-"} else text
    hours_text, _, minutes_text = normalized.partition(":")
    hours = int(hours_text or "0")
    minutes = int(minutes_text or "0")
    return timezone(sign * timedelta(hours=hours, minutes=minutes))


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def current_local_date_iso() -> str:
    return datetime.now(_parse_utc_offset_value(LOCAL_UTC_OFFSET)).date().isoformat()


def encode_tail_lines(lines: list[str]) -> str:
    return json.dumps(lines, ensure_ascii=False)


def decode_tail_lines(value: str | None) -> list[str]:
    if not value:
        return []
    try:
        parsed = json.loads(value)
    except json.JSONDecodeError:
        return []
    if not isinstance(parsed, list):
        return []
    return [str(item) for item in parsed if str(item).strip()]


def create_automation_run(job_id: str, run_date: str, started_at: str) -> int:
    conn = get_db_connection()
    try:
        cursor = conn.execute(
            """
            INSERT INTO automation_runs (
                job_id,
                run_date,
                status,
                started_at
            )
            VALUES (?, ?, ?, ?)
            """,
            (job_id, run_date, "running", started_at),
        )
        conn.commit()
        return int(cursor.lastrowid)
    finally:
        conn.close()


def finalize_automation_run(
    run_id: int,
    *,
    status: str,
    return_code: int | None,
    message: str,
    artifact_path: str | None,
    stdout_tail: list[str],
    stderr_tail: list[str],
    finished_at: str,
    duration_ms: int,
) -> None:
    conn = get_db_connection()
    try:
        conn.execute(
            """
            UPDATE automation_runs
            SET
                status = ?,
                return_code = ?,
                message = ?,
                artifact_path = ?,
                stdout_tail = ?,
                stderr_tail = ?,
                finished_at = ?,
                duration_ms = ?
            WHERE id = ?
            """,
            (
                status,
                return_code,
                message,
                artifact_path,
                encode_tail_lines(stdout_tail),
                encode_tail_lines(stderr_tail),
                finished_at,
                duration_ms,
                run_id,
            ),
        )
        conn.commit()
    finally:
        conn.close()


def row_to_automation_run(row: sqlite3.Row, preview_chars: int = 240) -> dict:
    job = AUTOMATION_JOBS.get(row["job_id"])
    stdout_tail = decode_tail_lines(row["stdout_tail"])
    stderr_tail = decode_tail_lines(row["stderr_tail"])
    return {
        "id": row["id"],
        "job_id": row["job_id"],
        "job_label": job["label"] if job else row["job_id"],
        "manual_enabled": job.get("manual_enabled", False) if job else False,
        "run_date": row["run_date"],
        "status": row["status"],
        "return_code": row["return_code"],
        "message": row["message"] or "",
        "started_at": row["started_at"],
        "finished_at": row["finished_at"],
        "duration_ms": row["duration_ms"],
        "stdout_tail": stdout_tail,
        "stderr_tail": stderr_tail,
        "artifact": build_artifact_summary_from_path(row["artifact_path"], preview_chars),
    }


def fetch_automation_run_rows(
    *,
    page: int,
    page_size: int,
    job_id: str | None,
    status: str | None,
) -> tuple[int, list[sqlite3.Row]]:
    conditions: list[str] = []
    params: list[str] = []
    if job_id:
        conditions.append("job_id = ?")
        params.append(job_id)
    if status:
        conditions.append("status = ?")
        params.append(status)

    where_clause = _join_conditions(conditions, "WHERE")
    offset = (page - 1) * page_size

    conn = get_db_connection()
    try:
        total = conn.execute(
            f"SELECT COUNT(*) AS total FROM automation_runs {where_clause}",
            params,
        ).fetchone()["total"]
        rows = conn.execute(
            f"""
            SELECT
                id,
                job_id,
                run_date,
                status,
                return_code,
                message,
                artifact_path,
                stdout_tail,
                stderr_tail,
                started_at,
                finished_at,
                duration_ms
            FROM automation_runs
            {where_clause}
            ORDER BY id DESC
            LIMIT ? OFFSET ?
            """,
            (*params, page_size, offset),
        ).fetchall()
    finally:
        conn.close()

    return total, rows


def get_automation_run_by_id(run_id: int) -> sqlite3.Row | None:
    conn = get_db_connection()
    try:
        return conn.execute(
            """
            SELECT
                id,
                job_id,
                run_date,
                status,
                return_code,
                message,
                artifact_path,
                stdout_tail,
                stderr_tail,
                started_at,
                finished_at,
                duration_ms
            FROM automation_runs
            WHERE id = ?
            """,
            (run_id,),
        ).fetchone()
    finally:
        conn.close()


def iter_automation_job_items(*, manual_only: bool = False):
    for job_id, job in AUTOMATION_JOBS.items():
        if manual_only and not job.get("manual_enabled", True):
            continue
        yield job_id, job


def build_automation_job_runtime_payload(job: dict) -> dict:
    if not job.get("requires_openai"):
        return {
            "ready": True,
            "runtime_mode": "local",
            "availability_note": "当前环境已就绪。",
        }

    mock_template_env = str(job.get("mock_template_env", "")).strip()
    if mock_template_env and os.environ.get(mock_template_env, "").strip():
        return {
            "ready": True,
            "runtime_mode": "mock",
            "availability_note": "当前环境已配置 mock 模板，这次运行不会调用 OpenAI。",
        }

    if os.environ.get("AXIOM_OPENAI_API_KEY") or os.environ.get("OPENAI_API_KEY"):
        return {
            "ready": True,
            "runtime_mode": "openai",
            "availability_note": job.get(
                "openai_ready_note",
                "当前环境已配置 OpenAI key，可以执行真实 AI 自动化。",
            ),
        }

    return {
        "ready": False,
        "runtime_mode": "missing_key",
        "availability_note": job.get(
            "missing_key_note",
            "当前环境未配置 AXIOM_OPENAI_API_KEY 或 OPENAI_API_KEY，暂时不能执行真实 AI 自动化。",
        ),
    }


def build_automation_job_payload(job_id: str, job: dict) -> dict:
    payload = {
        "id": job_id,
        "label": job["label"],
        "description": job["description"],
        "artifact_group": job["artifact_group"],
        "artifact_window": job["artifact_window"],
        "artifact_mode": job["artifact_mode"],
        "manual_enabled": job.get("manual_enabled", True),
        "destructive": False,
        "default_date": current_local_date_iso(),
    }
    payload.update(build_automation_job_runtime_payload(job))
    return payload


def build_automation_command(job_id: str, run_date: str) -> list[str]:
    job = AUTOMATION_JOBS[job_id]
    command = [
        sys.executable,
        str(PROJECT_ROOT / "scripts" / job["script_name"]),
        "--root",
        str(AXIOM_ROOT),
        "--utc-offset",
        LOCAL_UTC_OFFSET,
    ]
    command.extend(job["build_args"](run_date))
    return command


def tail_output_lines(value: str, max_lines: int = 12) -> list[str]:
    return [line for line in value.splitlines() if line.strip()][-max_lines:]


def select_latest_artifact_for_job(job_id: str, run_date: str, preview_chars: int) -> dict | None:
    job = AUTOMATION_JOBS[job_id]
    matches = [
        artifact
        for artifact in list_review_artifacts()
        if artifact["group"] == job["artifact_group"]
        and artifact.get("window") == job["artifact_window"]
        and artifact.get("mode") == job["artifact_mode"]
        and artifact.get("report_date") == run_date
    ]
    if not matches:
        return None
    latest = max(matches, key=artifact_sort_key)
    return build_artifact_summary_payload(latest, preview_chars)


def acquire_automation_lock(job_id: str, run_date: str) -> bool:
    AUTOMATION_LOCK_PATH.parent.mkdir(parents=True, exist_ok=True)
    flags = os.O_CREAT | os.O_EXCL | os.O_WRONLY
    try:
        fd = os.open(str(AUTOMATION_LOCK_PATH), flags)
    except FileExistsError:
        return False

    with os.fdopen(fd, "w", encoding="utf-8") as file:
        file.write(
            "\n".join(
                [
                    f"job={job_id}",
                    f"date={run_date}",
                    f"pid={os.getpid()}",
                    f"started_at={utc_now().isoformat(timespec='seconds')}",
                ]
            )
            + "\n"
        )
    return True


def release_automation_lock() -> None:
    AUTOMATION_LOCK_PATH.unlink(missing_ok=True)


def derive_automation_message(
    status: str,
    stdout_tail: list[str],
    stderr_tail: list[str],
) -> str:
    if status == "success":
        return "completed"
    if status == "skipped":
        return "skipped"
    if stderr_tail:
        return stderr_tail[-1]
    if stdout_tail:
        return stdout_tail[-1]
    if status == "timeout":
        return "自动化任务执行超时"
    return "自动化任务执行失败"


def run_automation_job(job_id: str, run_date: str) -> subprocess.CompletedProcess[str]:
    command = build_automation_command(job_id, run_date)
    timeout_seconds = AUTOMATION_JOBS[job_id].get("timeout_seconds", AUTOMATION_TIMEOUT_SECONDS)
    return subprocess.run(
        command,
        cwd=str(PROJECT_ROOT),
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        timeout=timeout_seconds,
        check=False,
    )


def complete_skipped_automation_run(
    run_id: int,
    *,
    message: str,
    started_at_dt: datetime,
) -> None:
    finished_at_dt = utc_now()
    finished_at = finished_at_dt.isoformat(timespec="seconds")
    duration_ms = max(0, int((finished_at_dt - started_at_dt).total_seconds() * 1000))
    finalize_automation_run(
        run_id,
        status="skipped",
        return_code=0,
        message=message,
        artifact_path=None,
        stdout_tail=[message],
        stderr_tail=[],
        finished_at=finished_at,
        duration_ms=duration_ms,
    )


def execute_logged_automation_job(
    job_id: str,
    run_date: str,
    *,
    skip_when_unavailable: bool = False,
) -> tuple[dict, int]:
    job = AUTOMATION_JOBS[job_id]
    job_payload = build_automation_job_payload(job_id, job)

    if not acquire_automation_lock(job_id, run_date):
        return (
            {
                "ok": False,
                "error": {
                    "code": "automation_busy",
                    "message": "当前已有自动化任务在运行，请稍后重试",
                },
                "job": job_payload,
                "date": run_date,
            },
            409,
        )

    started_at_dt = utc_now()
    started_at = started_at_dt.isoformat(timespec="seconds")
    try:
        run_id = create_automation_run(job_id, run_date, started_at)
    except sqlite3.Error:
        release_automation_lock()
        logger.exception("failed to create automation run record: job=%s date=%s", job_id, run_date)
        return (
            {
                "ok": False,
                "error": {
                    "code": "database_write_failed",
                    "message": "数据库写入失败",
                },
                "job": job_payload,
                "date": run_date,
            },
            500,
        )

    if not job_payload["ready"]:
        if not skip_when_unavailable:
            finalize_automation_run(
                run_id,
                status="failed",
                return_code=None,
                message=job_payload["availability_note"],
                artifact_path=None,
                stdout_tail=[],
                stderr_tail=[job_payload["availability_note"]],
                finished_at=utc_now().isoformat(timespec="seconds"),
                duration_ms=max(0, int((utc_now() - started_at_dt).total_seconds() * 1000)),
            )
            release_automation_lock()
            run_row = get_automation_run_by_id(run_id)
            return (
                {
                    "ok": False,
                    "error": {
                        "code": "automation_job_unavailable",
                        "message": job_payload["availability_note"],
                    },
                    "job": job_payload,
                    "date": run_date,
                    "run": row_to_automation_run(run_row) if run_row else None,
                },
                400,
            )

        complete_skipped_automation_run(
            run_id,
            message=job_payload["availability_note"],
            started_at_dt=started_at_dt,
        )
        release_automation_lock()
        run_row = get_automation_run_by_id(run_id)
        return (
            {
                "ok": True,
                "message": "skipped",
                "job": job_payload,
                "date": run_date,
                "run": row_to_automation_run(run_row) if run_row else None,
            },
            200,
        )

    try:
        result = run_automation_job(job_id, run_date)
    except subprocess.TimeoutExpired as exc:
        finished_at_dt = utc_now()
        finished_at = finished_at_dt.isoformat(timespec="seconds")
        duration_ms = max(0, int((finished_at_dt - started_at_dt).total_seconds() * 1000))
        stdout_tail = tail_output_lines(exc.stdout or "")
        stderr_tail = tail_output_lines(exc.stderr or "")
        message = derive_automation_message("timeout", stdout_tail, stderr_tail)
        finalize_automation_run(
            run_id,
            status="timeout",
            return_code=None,
            message=message,
            artifact_path=None,
            stdout_tail=stdout_tail,
            stderr_tail=stderr_tail,
            finished_at=finished_at,
            duration_ms=duration_ms,
        )
        logger.exception("automation job timed out: job=%s date=%s", job_id, run_date)
        run_row = get_automation_run_by_id(run_id)
        return (
            {
                "ok": False,
                "error": {
                    "code": "automation_timeout",
                    "message": "自动化任务执行超时",
                },
                "job": job_payload,
                "date": run_date,
                "stdout_tail": stdout_tail,
                "stderr_tail": stderr_tail,
                "run": row_to_automation_run(run_row) if run_row else None,
            },
            504,
        )
    except Exception as exc:
        finished_at_dt = utc_now()
        finished_at = finished_at_dt.isoformat(timespec="seconds")
        duration_ms = max(0, int((finished_at_dt - started_at_dt).total_seconds() * 1000))
        message = str(exc).strip() or "自动化任务执行失败"
        finalize_automation_run(
            run_id,
            status="failed",
            return_code=None,
            message=message,
            artifact_path=None,
            stdout_tail=[],
            stderr_tail=[message],
            finished_at=finished_at,
            duration_ms=duration_ms,
        )
        logger.exception("automation job crashed: job=%s date=%s", job_id, run_date)
        run_row = get_automation_run_by_id(run_id)
        return (
            {
                "ok": False,
                "error": {
                    "code": "automation_failed",
                    "message": message,
                },
                "job": job_payload,
                "date": run_date,
                "stdout_tail": [],
                "stderr_tail": [message],
                "run": row_to_automation_run(run_row) if run_row else None,
            },
            500,
        )
    finally:
        release_automation_lock()

    stdout_tail = tail_output_lines(result.stdout)
    stderr_tail = tail_output_lines(result.stderr)
    artifact = select_latest_artifact_for_job(job_id, run_date, preview_chars=240)
    artifact_path = artifact["relative_path"] if artifact else None
    status = "success" if result.returncode == 0 else "failed"
    message = derive_automation_message(status, stdout_tail, stderr_tail)
    finished_at_dt = utc_now()
    finished_at = finished_at_dt.isoformat(timespec="seconds")
    duration_ms = max(0, int((finished_at_dt - started_at_dt).total_seconds() * 1000))
    finalize_automation_run(
        run_id,
        status=status,
        return_code=result.returncode,
        message=message,
        artifact_path=artifact_path,
        stdout_tail=stdout_tail,
        stderr_tail=stderr_tail,
        finished_at=finished_at,
        duration_ms=duration_ms,
    )
    run_row = get_automation_run_by_id(run_id)

    if result.returncode != 0:
        logger.warning(
            "automation job failed: job=%s date=%s code=%s stderr=%s",
            job_id,
            run_date,
            result.returncode,
            "\n".join(stderr_tail),
        )
        return (
            {
                "ok": False,
                "error": {
                    "code": "automation_failed",
                    "message": message,
                },
                "job": job_payload,
                "date": run_date,
                "return_code": result.returncode,
                "stdout_tail": stdout_tail,
                "stderr_tail": stderr_tail,
                "run": row_to_automation_run(run_row) if run_row else None,
            },
            500,
        )

    logger.info("automation job completed: job=%s date=%s", job_id, run_date)
    return (
        {
            "ok": True,
            "message": "completed",
            "job": job_payload,
            "date": run_date,
            "return_code": result.returncode,
            "stdout_tail": stdout_tail,
            "stderr_tail": stderr_tail,
            "artifact": artifact,
            "run": row_to_automation_run(run_row) if run_row else None,
        },
        200,
    )
