from __future__ import annotations

import hmac
import html
import json
import logging
import mimetypes
import os
import re
import sqlite3
import subprocess
import sys
import zipfile
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import quote
from uuid import uuid4
from xml.etree import ElementTree as ET

from flask import Flask, jsonify, render_template, request, send_file
from werkzeug.exceptions import HTTPException

try:
    from pypdf import PdfReader
except ImportError:  # pragma: no cover - deployment should install requirements.txt
    PdfReader = None

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False


# ===== 基础配置 =====
# 默认保持 VPS 目录结构；环境变量用于本地测试或后续部署覆盖。
AXIOM_ROOT = Path(os.environ.get("AXIOM_ROOT", "/opt/axiom")).resolve()
PROJECT_ROOT = Path(__file__).resolve().parents[1]
INBOX_PATH = Path(os.environ.get("AXIOM_INBOX_PATH", AXIOM_ROOT / "data" / "inbox")).resolve()
ARCHIVE_PATH = Path(os.environ.get("AXIOM_ARCHIVE_PATH", AXIOM_ROOT / "data" / "archive")).resolve()
DB_PATH = Path(os.environ.get("AXIOM_DB_PATH", AXIOM_ROOT / "db" / "axiom.db")).resolve()
SECRET_KEY = os.environ.get("AXIOM_SECRET_KEY", os.environ.get("AXIOM_KEY", "axiom123"))
LOG_PATH = os.environ.get("AXIOM_LOG_PATH", "")
MAX_UPLOAD_BYTES = int(os.environ.get("AXIOM_MAX_UPLOAD_BYTES", str(20 * 1024 * 1024)))
LOCAL_UTC_OFFSET = os.environ.get("AXIOM_LOCAL_UTC_OFFSET", "+08:00")
AUTOMATION_TIMEOUT_SECONDS = int(os.environ.get("AXIOM_AUTOMATION_TIMEOUT_SECONDS", "90"))
AUTOMATION_LOCK_PATH = AXIOM_ROOT / "runtime" / "automation_run.lock"
app.config["MAX_CONTENT_LENGTH"] = MAX_UPLOAD_BYTES

DEFAULT_PAGE = 1
DEFAULT_PAGE_SIZE = 10
MAX_PAGE_SIZE = 50

DEFAULT_SOURCE = "ios_shortcut"
ITEM_TYPE_TEXT = "text"
ITEM_TYPE_IMAGE = "image"
ITEM_TYPE_DOCUMENT = "document"
ITEM_TYPE_AUDIO = "audio"
ITEM_TEXT_SOURCES = {"content", "derived_text", "transcript_text", "original_name", "empty"}
ITEM_PROCESSING_STATES = {"ready", "pending"}
ITEM_PROCESSING_OVERRIDES = {"ready"}
ITEM_TEXT_SOURCE_LABELS = {
    "content": "内容说明",
    "derived_text": "文档正文",
    "transcript_text": "音频转写",
    "original_name": "仅文件名",
    "empty": "无可读文本",
}
ITEM_PROCESSING_LABELS = {
    "ready": "已就绪",
    "pending": "待处理",
}
ITEM_PROCESSING_OVERRIDE_LABELS = {
    "ready": "手动完成",
}
ITEM_TYPES = {ITEM_TYPE_TEXT, ITEM_TYPE_IMAGE, ITEM_TYPE_DOCUMENT, ITEM_TYPE_AUDIO}
STORAGE_AREAS = {"inbox": INBOX_PATH, "archive": ARCHIVE_PATH}
MEMORY_CATEGORIES = {"fact", "preference", "goal", "relationship", "event"}
MEMORY_STATUSES = {"candidate", "confirmed", "archived"}
MEMORY_CATEGORY_LABELS = {
    "fact": "事实",
    "preference": "偏好",
    "goal": "目标",
    "relationship": "人际关系",
    "event": "事件",
}
MEMORY_STATUS_LABELS = {
    "candidate": "待确认",
    "confirmed": "已确认",
    "archived": "已归档",
}
TASK_STATUSES = {"todo", "done", "cancelled"}
TASK_PRIORITIES = {"high", "medium", "low"}
TASK_STATUS_LABELS = {
    "todo": "待办",
    "done": "已完成",
    "cancelled": "已取消",
}
TASK_PRIORITY_LABELS = {
    "high": "高",
    "medium": "中",
    "low": "低",
}
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic", ".heif"}
DOCUMENT_EXTENSIONS = {".pdf", ".doc", ".docx"}
AUDIO_EXTENSIONS = {".aac", ".caf", ".flac", ".m4a", ".mp3", ".ogg", ".wav", ".webm"}
TRANSCRIPT_EXTENSIONS = {".md", ".srt", ".txt", ".vtt"}
TRANSCRIPT_TEXT_ENCODINGS = ("utf-8-sig", "utf-16", "utf-16-le", "utf-16-be", "gb18030")
DOCUMENT_MIME_TYPES = {
    "application/msword",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
UPLOAD_TYPE_LABELS = {
    ITEM_TYPE_TEXT: "文本",
    ITEM_TYPE_IMAGE: "图片",
    ITEM_TYPE_DOCUMENT: "文档",
    ITEM_TYPE_AUDIO: "音频",
}
MIME_TYPE_EXTENSION_MAP = {
    "application/msword": ".doc",
    "application/pdf": ".pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
    "audio/aac": ".aac",
    "audio/flac": ".flac",
    "audio/mp4": ".m4a",
    "audio/mpeg": ".mp3",
    "audio/ogg": ".ogg",
    "audio/webm": ".webm",
    "audio/wav": ".wav",
    "audio/x-m4a": ".m4a",
    "audio/x-wav": ".wav",
    "image/gif": ".gif",
    "image/heic": ".heic",
    "image/heif": ".heif",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}
TRANSCRIPT_TIMESTAMP_PATTERN = re.compile(
    r"^\s*(?:\d{1,2}:)?\d{1,2}:\d{2}(?:[.,]\d{1,3})?\s*-->\s*"
    r"(?:\d{1,2}:)?\d{1,2}:\d{2}(?:[.,]\d{1,3})?(?:\s+.*)?$"
)
TRANSCRIPT_TAG_PATTERN = re.compile(r"</?[^>]+>")
ITEM_BASE_SELECT_FIELDS = """
    id,
    type,
    content,
    file_path,
    source,
    created_at,
    original_name,
    mime_type,
    size_bytes,
    processing_override
"""
ITEM_TEXT_SOURCE_SQL = """
    CASE
        WHEN type = 'document' AND COALESCE(TRIM(derived_text), '') != '' THEN 'derived_text'
        WHEN type = 'audio' AND COALESCE(TRIM(transcript_text), '') != '' THEN 'transcript_text'
        WHEN COALESCE(TRIM(content), '') != '' THEN 'content'
        WHEN COALESCE(TRIM(derived_text), '') != '' THEN 'derived_text'
        WHEN COALESCE(TRIM(transcript_text), '') != '' THEN 'transcript_text'
        WHEN COALESCE(TRIM(original_name), '') != '' THEN 'original_name'
        ELSE 'empty'
    END
"""
ITEM_PROCESSING_STATE_SQL = """
    CASE
        WHEN processing_override = 'ready' THEN 'ready'
        WHEN type = 'document' THEN
            CASE
                WHEN COALESCE(TRIM(derived_text), '') != '' THEN 'ready'
                ELSE 'pending'
            END
        WHEN type = 'audio' THEN
            CASE
                WHEN COALESCE(TRIM(transcript_text), '') != '' THEN 'ready'
                ELSE 'pending'
            END
        WHEN type = 'image' THEN
            CASE
                WHEN COALESCE(TRIM(content), '') != '' AND COALESCE(TRIM(content), '') != COALESCE(TRIM(original_name), '') THEN 'ready'
                ELSE 'pending'
            END
        ELSE
            CASE
                WHEN COALESCE(TRIM(content), '') != '' THEN 'ready'
                ELSE 'pending'
            END
    END
"""
ITEM_LIST_SELECT_FIELDS = f"""
    {ITEM_BASE_SELECT_FIELDS},
    CASE
        WHEN COALESCE(TRIM(derived_text), '') != '' THEN SUBSTR(derived_text, 1, 600)
        ELSE NULL
    END AS derived_text_preview,
    CASE
        WHEN COALESCE(TRIM(transcript_text), '') != '' THEN SUBSTR(transcript_text, 1, 600)
        ELSE NULL
    END AS transcript_text_preview
"""
ITEM_DETAIL_SELECT_FIELDS = f"""
    {ITEM_LIST_SELECT_FIELDS},
    derived_text,
    transcript_text
"""
REVIEWS_PATH = Path(os.environ.get("AXIOM_REVIEWS_PATH", AXIOM_ROOT / "data" / "reviews")).resolve()
ARTIFACT_GROUPS = {
    "review",
    "inbox",
    "inbox-actions",
    "inbox-action-history",
    "audio-transcripts",
    "image-descriptions",
}
ARTIFACT_WINDOWS = {"daily", "weekly"}
ARTIFACT_MODES = {"dry-run", "apply"}
AUTOMATION_RUN_STATUSES = {"running", "success", "skipped", "failed", "timeout"}
DOCX_NAMESPACE = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
AUTOMATION_AUDIO_TRANSCRIBE_TIMEOUT_SECONDS = int(
    os.environ.get("AXIOM_AUDIO_TRANSCRIBE_TIMEOUT_SECONDS", "300")
)
AUTOMATION_IMAGE_DESCRIBE_TIMEOUT_SECONDS = int(
    os.environ.get("AXIOM_IMAGE_DESCRIBE_TIMEOUT_SECONDS", "300")
)
AUTOMATION_JOBS = {
    "review_day": {
        "label": "生成今日日回顾",
        "description": "按本地日期生成 1 天窗口的 review 快照。",
        "script_name": "save_review_snapshot.py",
        "artifact_group": "review",
        "artifact_window": "daily",
        "artifact_mode": None,
        "build_args": lambda run_date: ["--window", "day", "--date", run_date, "--force"],
        "manual_enabled": True,
    },
    "review_week": {
        "label": "生成本周回顾",
        "description": "按锚点日期回看最近 7 天，生成 weekly review。",
        "script_name": "save_review_snapshot.py",
        "artifact_group": "review",
        "artifact_window": "weekly",
        "artifact_mode": None,
        "build_args": lambda run_date: ["--window", "week", "--date", run_date, "--force"],
        "manual_enabled": True,
    },
    "inbox_report": {
        "label": "生成 Inbox 报告",
        "description": "基于当前 inbox 规则生成处理建议，不改动真实数据。",
        "script_name": "save_inbox_processing_snapshot.py",
        "artifact_group": "inbox",
        "artifact_window": None,
        "artifact_mode": None,
        "build_args": lambda run_date: ["--date", run_date, "--force"],
        "manual_enabled": True,
    },
    "inbox_action_dry_run": {
        "label": "生成 Inbox 动作预演",
        "description": "运行安全 dry-run，只生成 action snapshot，不执行真实归档。",
        "script_name": "save_inbox_action_snapshot.py",
        "artifact_group": "inbox-actions",
        "artifact_window": None,
        "artifact_mode": "dry-run",
        "build_args": lambda run_date: ["--date", run_date],
        "manual_enabled": True,
    },
    "inbox_action_history_day": {
        "label": "生成 Inbox 动作历史日报",
        "description": "基于已有 action snapshot 生成当日动作历史汇总。",
        "script_name": "save_inbox_action_history_snapshot.py",
        "artifact_group": "inbox-action-history",
        "artifact_window": "daily",
        "artifact_mode": None,
        "build_args": lambda run_date: ["--window", "day", "--date", run_date, "--details", "--force"],
        "manual_enabled": False,
    },
    "inbox_action_history_week": {
        "label": "生成 Inbox 动作历史周报",
        "description": "基于已有 action snapshot 生成最近 7 天动作历史汇总。",
        "script_name": "save_inbox_action_history_snapshot.py",
        "artifact_group": "inbox-action-history",
        "artifact_window": "weekly",
        "artifact_mode": None,
        "build_args": lambda run_date: ["--window", "week", "--date", run_date, "--details", "--force"],
        "manual_enabled": False,
    },
    "audio_transcribe_day": {
        "label": "生成音频自动转写",
        "description": "为当日新入库的 audio item 补全 OpenAI 转写文本，并生成一份可回看的转写报告。",
        "script_name": "transcribe_audio_items.py",
        "artifact_group": "audio-transcripts",
        "artifact_window": None,
        "artifact_mode": None,
        "build_args": lambda run_date: ["--date", run_date],
        "manual_enabled": True,
        "requires_openai": True,
        "mock_template_env": "AXIOM_AUDIO_TRANSCRIBE_MOCK_TEMPLATE",
        "openai_ready_note": "当前环境已配置 OpenAI key，可以执行真实音频自动转写。",
        "missing_key_note": "当前环境未配置 AXIOM_OPENAI_API_KEY 或 OPENAI_API_KEY，暂时不能执行真实音频自动转写。",
        "timeout_seconds": AUTOMATION_AUDIO_TRANSCRIBE_TIMEOUT_SECONDS,
    },
    "image_describe_day": {
        "label": "生成图片自动描述",
        "description": "为当日新入库的 image item 补全 OpenAI 图片描述，并生成一份可回看的描述报告。",
        "script_name": "describe_image_items.py",
        "artifact_group": "image-descriptions",
        "artifact_window": None,
        "artifact_mode": None,
        "build_args": lambda run_date: ["--date", run_date],
        "manual_enabled": True,
        "requires_openai": True,
        "mock_template_env": "AXIOM_IMAGE_DESCRIBE_MOCK_TEMPLATE",
        "openai_ready_note": "当前环境已配置 OpenAI key，可以执行真实图片自动描述。",
        "missing_key_note": "当前环境未配置 AXIOM_OPENAI_API_KEY 或 OPENAI_API_KEY，暂时不能执行真实图片自动描述。",
        "timeout_seconds": AUTOMATION_IMAGE_DESCRIBE_TIMEOUT_SECONDS,
    },
}


def configure_logging() -> None:
    log_level = os.environ.get("AXIOM_LOG_LEVEL", "INFO").upper()
    log_format = "%(asctime)s %(levelname)s [%(name)s] %(message)s"
    handlers: list[logging.Handler] = [logging.StreamHandler()]

    if LOG_PATH:
        log_path = Path(LOG_PATH).expanduser().resolve()
        log_path.parent.mkdir(parents=True, exist_ok=True)
        handlers.append(logging.FileHandler(log_path, encoding="utf-8"))

    logging.basicConfig(level=log_level, format=log_format, handlers=handlers)


configure_logging()
logger = logging.getLogger("axiom.receiver")


# ===== 响应工具 =====
def ok_response(payload: dict | None = None, status: int = 200):
    body = {"ok": True}
    if payload:
        body.update(payload)
    return jsonify(body), status


def error_response(status: int, code: str, message: str):
    return jsonify({"ok": False, "error": {"code": code, "message": message}}), status


# ===== 存储与数据库 =====
def ensure_storage_dirs() -> None:
    """服务接收请求前，先确保本地存储目录存在。"""
    INBOX_PATH.mkdir(parents=True, exist_ok=True)
    ARCHIVE_PATH.mkdir(parents=True, exist_ok=True)
    REVIEWS_PATH.mkdir(parents=True, exist_ok=True)
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)


def ensure_items_table_columns(conn: sqlite3.Connection) -> None:
    existing_columns = {
        row[1]
        for row in conn.execute("PRAGMA table_info(items)").fetchall()
    }
    required_columns = {
        "original_name": "TEXT",
        "mime_type": "TEXT",
        "size_bytes": "INTEGER",
        "derived_text": "TEXT",
        "transcript_text": "TEXT",
        "processing_override": "TEXT",
    }
    for column_name, column_type in required_columns.items():
        if column_name in existing_columns:
            continue
        conn.execute(f"ALTER TABLE items ADD COLUMN {column_name} {column_type}")


def init_db(db_path: Path = DB_PATH) -> None:
    """创建 v0.1 阶段最小表结构。"""
    db_path.parent.mkdir(parents=True, exist_ok=True)

    conn = sqlite3.connect(str(db_path))
    try:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL,
                content TEXT,
                file_path TEXT,
                source TEXT,
                created_at TEXT NOT NULL,
                original_name TEXT,
                mime_type TEXT,
                size_bytes INTEGER,
                derived_text TEXT,
                transcript_text TEXT,
                processing_override TEXT
            )
            """
        )
        ensure_items_table_columns(conn)
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at)"
        )
        conn.execute("CREATE INDEX IF NOT EXISTS idx_items_type ON items(type)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_items_source ON items(source)")
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS automation_runs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                job_id TEXT NOT NULL,
                run_date TEXT NOT NULL,
                status TEXT NOT NULL,
                return_code INTEGER,
                message TEXT,
                artifact_path TEXT,
                stdout_tail TEXT,
                stderr_tail TEXT,
                started_at TEXT NOT NULL,
                finished_at TEXT,
                duration_ms INTEGER
            )
            """
        )
        conn.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_automation_runs_started_at
            ON automation_runs(started_at)
            """
        )
        conn.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_automation_runs_job_id
            ON automation_runs(job_id)
            """
        )
        conn.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_automation_runs_status
            ON automation_runs(status)
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS memories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                category TEXT NOT NULL DEFAULT 'fact',
                content TEXT NOT NULL,
                detail TEXT,
                status TEXT NOT NULL DEFAULT 'candidate',
                source_item_id INTEGER REFERENCES items(id) ON DELETE SET NULL,
                source_text TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_memories_category ON memories(category)"
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_memories_status ON memories(status)"
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_memories_created_at ON memories(created_at)"
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                detail TEXT,
                status TEXT NOT NULL DEFAULT 'todo',
                priority TEXT NOT NULL DEFAULT 'medium',
                memory_id INTEGER REFERENCES memories(id) ON DELETE SET NULL,
                due_date TEXT,
                completed_at TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)"
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority)"
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date)"
        )
        conn.commit()
    finally:
        conn.close()


def init_app_storage() -> None:
    ensure_storage_dirs()
    init_db()


def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(str(DB_PATH), timeout=30)
    conn.row_factory = sqlite3.Row
    return conn


# ===== 请求工具 =====
def get_request_field(name: str, default: str = "") -> str:
    """按 JSON、form、query string 的顺序读取字段。"""
    if request.is_json:
        data = request.get_json(silent=True) or {}
        value = data.get(name)
        if value is not None:
            return str(value)

    value = request.values.get(name)
    if value is not None:
        return str(value)

    return default


def get_request_body_data() -> dict:
    """读取本次请求的 body，供更新类 POST 接口使用。"""
    if request.is_json:
        data = request.get_json(silent=True)
        if data is None:
            raise ValueError("JSON body 无效")
        if not isinstance(data, dict):
            raise ValueError("JSON body 必须是对象")
        return data
    return request.form.to_dict(flat=True)


def read_optional_body_field(body: dict, name: str) -> tuple[bool, str]:
    if name not in body:
        return False, ""
    value = body.get(name)
    if value is None:
        return True, ""
    return True, str(value)


def normalize_processing_override(value: str | None) -> str | None:
    text = str(value or "").strip().lower()
    if not text:
        return None
    if text not in ITEM_PROCESSING_OVERRIDES:
        allowed = "、".join(sorted(ITEM_PROCESSING_OVERRIDES))
        raise ValueError(f"processing_override 只能是空值或 {allowed}")
    return text


def normalize_item_id_list(raw_ids) -> list[int]:
    if not isinstance(raw_ids, list):
        raise ValueError("ids 蹇呴』鏄暟缁?")
    if not raw_ids:
        raise ValueError("ids 涓嶈兘涓虹┖")

    normalized_ids: list[int] = []
    seen_ids: set[int] = set()
    for index, raw_item_id in enumerate(raw_ids):
        item_id = parse_positive_int(raw_item_id, f"ids[{index}]", 1)
        if item_id in seen_ids:
            continue
        seen_ids.add(item_id)
        normalized_ids.append(item_id)

    if len(normalized_ids) > 20:
        raise ValueError("涓€娆℃渶澶氬彧鑳芥壒閲忓鐞?20 鏉¤褰?")

    return normalized_ids


def get_request_key() -> str:
    return get_request_field("key") or request.headers.get("X-Axiom-Key", "")


def check_key(key: str) -> bool:
    """使用固定时间比较校验共享 key。"""
    if not SECRET_KEY:
        logger.warning("AXIOM_SECRET_KEY is empty")
        return False
    return hmac.compare_digest(str(key), SECRET_KEY)


def require_key():
    if check_key(get_request_key()):
        return None
    return error_response(403, "unauthorized", "key 无效")


def parse_positive_int(
    value: str | None,
    field_name: str,
    default: int,
    max_value: int | None = None,
) -> int:
    if value is None or value == "":
        number = default
    else:
        try:
            number = int(value)
        except ValueError as exc:
            raise ValueError(f"{field_name} 必须是整数") from exc

    if number <= 0:
        raise ValueError(f"{field_name} 必须大于 0")

    if max_value is not None and number > max_value:
        return max_value

    return number


def read_pagination(default_page_size: int = DEFAULT_PAGE_SIZE) -> tuple[int, int]:
    page = parse_positive_int(
        request.args.get("page"),
        "page",
        DEFAULT_PAGE,
    )

    # 兼容 /recent?limit=10，同时把 page_size 作为标准分页参数。
    page_size_value = request.args.get("page_size")
    if page_size_value is None:
        page_size_value = request.args.get("limit")

    page_size = parse_positive_int(
        page_size_value,
        "page_size",
        default_page_size,
        MAX_PAGE_SIZE,
    )

    return page, page_size


def read_item_type_filter() -> str | None:
    item_type = request.args.get("type", "").strip().lower()
    if not item_type:
        return None
    if item_type not in ITEM_TYPES:
        allowed = "、".join(sorted(ITEM_TYPES))
        raise ValueError(f"type 只能是 {allowed}")
    return item_type


def read_storage_filter() -> str | None:
    storage = request.args.get("storage", "").strip().lower()
    if not storage:
        return None
    if storage not in STORAGE_AREAS:
        allowed = "、".join(sorted(STORAGE_AREAS))
        raise ValueError(f"storage 只能是 {allowed}")
    return storage


def read_source_filter() -> str | None:
    source = request.args.get("source", "").strip()
    return source or None


def read_processing_state_filter() -> str | None:
    processing_state = request.args.get("processing_state", "").strip().lower()
    if not processing_state:
        return None
    if processing_state not in ITEM_PROCESSING_STATES:
        allowed = "、".join(sorted(ITEM_PROCESSING_STATES))
        raise ValueError(f"processing_state 只能是 {allowed}")
    return processing_state


def read_processing_override_filter() -> str | None:
    processing_override = request.args.get("processing_override", "").strip().lower()
    if not processing_override:
        return None
    if processing_override not in ITEM_PROCESSING_OVERRIDES:
        allowed = "、".join(sorted(ITEM_PROCESSING_OVERRIDES))
        raise ValueError(f"processing_override 只能是 {allowed}")
    return processing_override


def parse_date_filter(value: str, field_name: str) -> date:
    text = value.strip()
    if not text:
        raise ValueError(f"{field_name} 不能为空")
    try:
        return date.fromisoformat(text)
    except ValueError as exc:
        raise ValueError(f"{field_name} 必须是 YYYY-MM-DD") from exc


def parse_utc_offset_value(offset_text: str) -> timezone:
    text = offset_text.strip()
    if len(text) != 6 or text[0] not in {"+", "-"} or text[3] != ":":
        raise ValueError("utc offset 必须是 ±HH:MM")

    try:
        hours = int(text[1:3])
        minutes = int(text[4:6])
    except ValueError as exc:
        raise ValueError("utc offset 必须是 ±HH:MM") from exc

    if hours > 23 or minutes > 59:
        raise ValueError("utc offset 超出范围")

    delta = timedelta(hours=hours, minutes=minutes)
    if text[0] == "-":
        delta = -delta
    return timezone(delta)


def resolve_run_date_value(
    run_date: str | None,
    *,
    days_offset: int = 0,
    utc_offset_text: str = LOCAL_UTC_OFFSET,
) -> str:
    if run_date:
        anchor_date = parse_date_filter(run_date, "date")
    else:
        local_tz = parse_utc_offset_value(utc_offset_text)
        anchor_date = datetime.now(local_tz).date()
    return (anchor_date + timedelta(days=days_offset)).isoformat()


def current_local_date_iso() -> str:
    return resolve_run_date_value(None)


def parse_datetime_filter(
    value: str,
    field_name: str,
    *,
    end_of_day: bool = False,
) -> str:
    text = value.strip()
    if not text:
        raise ValueError(f"{field_name} 不能为空")

    try:
        if len(text) == 10:
            dt = datetime.fromisoformat(text)
            if end_of_day:
                dt = dt.replace(hour=23, minute=59, second=59, microsecond=999999)
            else:
                dt = dt.replace(hour=0, minute=0, second=0, microsecond=0)
        else:
            dt = datetime.fromisoformat(text.replace("Z", "+00:00"))
    except ValueError as exc:
        raise ValueError(f"{field_name} 必须是 ISO 时间或 YYYY-MM-DD") from exc

    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)

    return dt.astimezone(timezone.utc).isoformat()


def read_created_range() -> tuple[str | None, str | None]:
    created_from_value = request.args.get("created_from", "").strip()
    created_to_value = request.args.get("created_to", "").strip()

    created_from = None
    if created_from_value:
        created_from = parse_datetime_filter(created_from_value, "created_from")

    created_to = None
    if created_to_value:
        created_to = parse_datetime_filter(
            created_to_value,
            "created_to",
            end_of_day=(len(created_to_value) == 10),
        )

    if created_from and created_to and created_from > created_to:
        raise ValueError("created_from 不能晚于 created_to")

    return created_from, created_to


def read_artifact_group_filter() -> str | None:
    group = request.args.get("group", "").strip().lower()
    if not group:
        return None
    if group not in ARTIFACT_GROUPS:
        allowed = "、".join(sorted(ARTIFACT_GROUPS))
        raise ValueError(f"group 只能是 {allowed}")
    return group


def read_artifact_window_filter() -> str | None:
    window = request.args.get("window", "").strip().lower()
    if not window:
        return None
    if window not in ARTIFACT_WINDOWS:
        allowed = "、".join(sorted(ARTIFACT_WINDOWS))
        raise ValueError(f"window 只能是 {allowed}")
    return window


def read_artifact_mode_filter() -> str | None:
    mode = request.args.get("mode", "").strip().lower()
    if not mode:
        return None
    if mode not in ARTIFACT_MODES:
        allowed = "、".join(sorted(ARTIFACT_MODES))
        raise ValueError(f"mode 只能是 {allowed}")
    return mode


def read_artifact_date_range() -> tuple[date | None, date | None]:
    date_from_value = request.args.get("date_from", "").strip()
    date_to_value = request.args.get("date_to", "").strip()

    date_from = parse_date_filter(date_from_value, "date_from") if date_from_value else None
    date_to = parse_date_filter(date_to_value, "date_to") if date_to_value else None

    if date_from and date_to and date_from > date_to:
        raise ValueError("date_from 不能晚于 date_to")

    return date_from, date_to


def read_preview_chars(default: int = 240) -> int:
    return parse_positive_int(
        request.args.get("preview_chars"),
        "preview_chars",
        default,
        1000,
    )


def read_recent_limit(default: int = 10) -> int:
    return parse_positive_int(
        request.args.get("recent_limit"),
        "recent_limit",
        default,
        MAX_PAGE_SIZE,
    )


def read_group_limit(default: int = 3) -> int:
    return parse_positive_int(
        request.args.get("group_limit"),
        "group_limit",
        default,
        10,
    )


def read_optional_run_date(body: dict) -> str:
    run_date = str(body.get("date") or "").strip()
    return resolve_run_date_value(run_date or None)


def read_automation_job_filter() -> str | None:
    job_id = request.args.get("job", "").strip()
    return job_id or None


def read_automation_status_filter() -> str | None:
    status = request.args.get("status", "").strip().lower()
    if not status:
        return None
    if status not in AUTOMATION_RUN_STATUSES:
        allowed = "、".join(sorted(AUTOMATION_RUN_STATUSES))
        raise ValueError(f"status 只能是 {allowed}")
    return status


def build_item_filter_conditions(
    item_type: str | None,
    storage: str | None,
    source: str | None,
    created_from: str | None,
    created_to: str | None,
    processing_state: str | None = None,
    processing_override: str | None = None,
) -> tuple[list[str], list[str]]:
    conditions: list[str] = []
    params: list[str] = []

    if item_type:
        conditions.append("type = ?")
        params.append(item_type)

    if storage:
        storage_path = str(STORAGE_AREAS[storage])
        conditions.append("(file_path = ? OR file_path LIKE ?)")
        params.extend([storage_path, f"{storage_path}{os.sep}%"])

    if source:
        conditions.append("source = ?")
        params.append(source)

    if created_from:
        conditions.append("created_at >= ?")
        params.append(created_from)

    if created_to:
        conditions.append("created_at <= ?")
        params.append(created_to)

    if processing_state:
        conditions.append(f"({ITEM_PROCESSING_STATE_SQL}) = ?")
        params.append(processing_state)

    if processing_override:
        conditions.append("processing_override = ?")
        params.append(processing_override)

    return conditions, params


def join_conditions(conditions: list[str], prefix: str) -> str:
    if not conditions:
        return ""
    return f"{prefix} " + " AND ".join(conditions)


def normalize_mime_type(value: str | None) -> str:
    return str(value or "").split(";", 1)[0].strip().lower()


def get_file_extension(filename: str | Path | None) -> str:
    if filename is None:
        return ""
    return Path(str(filename)).suffix.lower()


def format_allowed_extensions(extensions: set[str]) -> str:
    return ", ".join(sorted(extensions))


def build_upload_error_message() -> str:
    groups = [
        f"图片: {format_allowed_extensions(IMAGE_EXTENSIONS)}",
        f"文档: {format_allowed_extensions(DOCUMENT_EXTENSIONS)}",
        f"音频: {format_allowed_extensions(AUDIO_EXTENSIONS)}",
    ]
    return "只支持以下文件类型: " + "；".join(groups)


def detect_upload_item_type(extension: str, mime_type: str) -> str | None:
    if extension in IMAGE_EXTENSIONS or mime_type.startswith("image/"):
        return ITEM_TYPE_IMAGE
    if extension in DOCUMENT_EXTENSIONS or mime_type in DOCUMENT_MIME_TYPES:
        return ITEM_TYPE_DOCUMENT
    if extension in AUDIO_EXTENSIONS or mime_type.startswith("audio/"):
        return ITEM_TYPE_AUDIO
    return None


def normalize_original_name(filename: str, item_type: str, mime_type: str) -> str:
    raw_name = str(filename or "").strip().replace("\\", "/")
    normalized_name = Path(raw_name).name.strip()
    fallback_extension = MIME_TYPE_EXTENSION_MAP.get(mime_type, "")

    if not normalized_name:
        normalized_name = item_type

    if not get_file_extension(normalized_name) and fallback_extension:
        normalized_name = f"{normalized_name}{fallback_extension}"

    return normalized_name


def build_binary_file_path(now: datetime, original_name: str) -> Path:
    extension = get_file_extension(original_name) or ".bin"
    return build_inbox_file_path(now, extension)


def build_download_name(
    original_name: str | None,
    file_path: str | Path | None,
    item_id: int,
) -> str:
    if original_name:
        return original_name
    if file_path:
        return Path(str(file_path)).name
    return f"item-{item_id}"


def get_type_label(item_type: str) -> str:
    return UPLOAD_TYPE_LABELS.get(item_type, item_type)


def build_file_url(item_id: int) -> str:
    return f"/file/{item_id}"


def build_artifact_file_url(relative_path: Path) -> str:
    relative_text = quote(relative_path.as_posix(), safe="/")
    return f"/artifacts/file/{relative_text}"


def get_storage_area(file_path: str | Path | None) -> str | None:
    if not file_path:
        return None

    path = Path(file_path).expanduser()
    if not path.is_absolute():
        path = AXIOM_ROOT / path
    path = path.resolve()

    if is_path_under(path, INBOX_PATH):
        return "inbox"
    if is_path_under(path, ARCHIVE_PATH):
        return "archive"
    if is_path_under(path, AXIOM_ROOT):
        return "root"
    return "external"


def strip_item_text(value: str | None) -> str:
    if value is None:
        return ""
    return str(value).strip()


def describe_primary_text_source(
    item_type: str,
    content: str | None,
    original_name: str | None,
    derived_text: str | None,
    transcript_text: str | None,
) -> str:
    normalized_content = strip_item_text(content)
    normalized_original_name = strip_item_text(original_name)
    normalized_derived_text = strip_item_text(derived_text)
    normalized_transcript_text = strip_item_text(transcript_text)

    if item_type == ITEM_TYPE_DOCUMENT and normalized_derived_text:
        return "derived_text"
    if item_type == ITEM_TYPE_AUDIO and normalized_transcript_text:
        return "transcript_text"
    if normalized_content:
        return "content"
    if normalized_derived_text:
        return "derived_text"
    if normalized_transcript_text:
        return "transcript_text"
    if normalized_original_name:
        return "original_name"
    return "empty"


def get_item_primary_text(item: dict | None) -> str:
    if not item:
        return ""

    item_type = str(item.get("type") or "")
    content = strip_item_text(item.get("content"))
    original_name = strip_item_text(item.get("original_name"))
    derived_text = strip_item_text(item.get("derived_text_preview") or item.get("derived_text"))
    transcript_text = strip_item_text(
        item.get("transcript_text_preview") or item.get("transcript_text")
    )
    text_source = describe_primary_text_source(
        item_type,
        content,
        original_name,
        derived_text,
        transcript_text,
    )

    if text_source == "derived_text":
        return derived_text
    if text_source == "transcript_text":
        return transcript_text
    if text_source == "content":
        return content
    if text_source == "original_name":
        return original_name
    return ""


def describe_processing_state(
    item_type: str,
    content: str | None,
    original_name: str | None,
    derived_text: str | None,
    transcript_text: str | None,
    processing_override: str | None = None,
) -> str:
    if processing_override == "ready":
        return "ready"

    normalized_content = strip_item_text(content)
    normalized_original_name = strip_item_text(original_name)
    normalized_derived_text = strip_item_text(derived_text)
    normalized_transcript_text = strip_item_text(transcript_text)

    if item_type == ITEM_TYPE_DOCUMENT:
        return "ready" if normalized_derived_text else "pending"
    if item_type == ITEM_TYPE_AUDIO:
        return "ready" if normalized_transcript_text else "pending"
    if item_type == ITEM_TYPE_IMAGE:
        return "ready" if normalized_content and normalized_content != normalized_original_name else "pending"
    return "ready" if normalized_content else "pending"


def describe_processing_note(
    item_type: str,
    processing_state: str,
    processing_override: str | None = None,
) -> str:
    if processing_override == "ready":
        return "已手动标记完成"
    if item_type == ITEM_TYPE_DOCUMENT:
        return "正文已就绪" if processing_state == "ready" else "待补正文"
    if item_type == ITEM_TYPE_AUDIO:
        return "转写已就绪" if processing_state == "ready" else "待补转写"
    if item_type == ITEM_TYPE_IMAGE:
        return "说明已就绪" if processing_state == "ready" else "待补说明"
    if item_type == ITEM_TYPE_TEXT:
        return "文本已就绪"
    return "内容已就绪" if processing_state == "ready" else "待补内容"


def build_item_payload(
    item_id: int,
    item_type: str,
    content: str | None,
    file_path: str | Path | None,
    source: str | None,
    created_at: str,
    original_name: str | None = None,
    mime_type: str | None = None,
    size_bytes: int | None = None,
    derived_text_preview: str | None = None,
    derived_text: str | None = None,
    transcript_text_preview: str | None = None,
    transcript_text: str | None = None,
    processing_override: str | None = None,
) -> dict:
    extension = get_file_extension(original_name or file_path)
    normalized_preview = normalize_extracted_text(derived_text_preview)
    normalized_derived_text = normalize_extracted_text(derived_text)
    normalized_transcript_preview = normalize_extracted_text(transcript_text_preview)
    normalized_transcript_text = normalize_extracted_text(transcript_text)
    text_source = describe_primary_text_source(
        item_type,
        content,
        original_name,
        normalized_derived_text,
        normalized_transcript_text,
    )
    processing_state = describe_processing_state(
        item_type,
        content,
        original_name,
        normalized_derived_text,
        normalized_transcript_text,
        processing_override,
    )
    item = {
        "id": item_id,
        "type": item_type,
        "type_label": get_type_label(item_type),
        "content": content,
        "file_path": str(file_path) if file_path else None,
        "file_url": build_file_url(item_id) if file_path else None,
        "download_name": build_download_name(original_name, file_path, item_id) if file_path else None,
        "storage": get_storage_area(file_path),
        "source": source,
        "created_at": created_at,
        "original_name": original_name,
        "mime_type": mime_type,
        "size_bytes": size_bytes,
        "extension": extension.lstrip(".") if extension else None,
        "derived_text_available": bool(normalized_preview or normalized_derived_text),
        "derived_text_preview": normalized_preview or normalized_derived_text,
        "transcript_text_available": bool(normalized_transcript_preview or normalized_transcript_text),
        "transcript_text_preview": normalized_transcript_preview or normalized_transcript_text,
        "text_source": text_source,
        "text_source_label": ITEM_TEXT_SOURCE_LABELS[text_source],
        "processing_state": processing_state,
        "processing_label": ITEM_PROCESSING_LABELS[processing_state],
        "processing_note": describe_processing_note(item_type, processing_state, processing_override),
        "processing_override": processing_override,
        "processing_override_label": ITEM_PROCESSING_OVERRIDE_LABELS.get(processing_override),
        "processing_is_overridden": bool(processing_override),
    }
    if derived_text is not None:
        item["derived_text"] = normalized_derived_text
    if transcript_text is not None:
        item["transcript_text"] = normalized_transcript_text
    return item


def row_to_item(row: sqlite3.Row, include_score: bool = False) -> dict:
    row_keys = set(row.keys())
    item = build_item_payload(
        row["id"],
        row["type"],
        row["content"],
        row["file_path"],
        row["source"],
        row["created_at"],
        row["original_name"] if "original_name" in row.keys() else None,
        row["mime_type"] if "mime_type" in row.keys() else None,
        row["size_bytes"] if "size_bytes" in row.keys() else None,
        row["derived_text_preview"] if "derived_text_preview" in row_keys else None,
        row["derived_text"] if "derived_text" in row_keys else None,
        row["transcript_text_preview"] if "transcript_text_preview" in row_keys else None,
        row["transcript_text"] if "transcript_text" in row_keys else None,
        row["processing_override"] if "processing_override" in row_keys else None,
    )
    if include_score and "score" in row.keys():
        item["score"] = row["score"]
    return item


def escape_like(value: str) -> str:
    return value.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")


def is_path_under(path: Path, parent: Path) -> bool:
    try:
        path.resolve().relative_to(parent.resolve())
    except ValueError:
        return False
    return True


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def local_date_now() -> date:
    offset_str = os.environ.get("AXIOM_LOCAL_UTC_OFFSET", "+08:00")
    tz = timezone(timedelta(hours=int(offset_str[0:3]), minutes=int(offset_str[4:6])))
    return datetime.now(tz).date()


def isoformat_timestamp(timestamp: float) -> str:
    return datetime.fromtimestamp(timestamp, tz=timezone.utc).isoformat(timespec="seconds")


def build_inbox_file_path(now: datetime, extension: str) -> Path:
    timestamp = now.strftime("%Y%m%d_%H%M%S_%f")
    return INBOX_PATH / f"{timestamp}_{uuid4().hex[:8]}{extension}"


def build_unique_file_path(target_dir: Path, filename: str) -> Path:
    target_dir.mkdir(parents=True, exist_ok=True)
    candidate = target_dir / filename
    source_path = Path(filename)
    counter = 1

    while candidate.exists():
        candidate = target_dir / f"{source_path.stem}_{counter}{source_path.suffix}"
        counter += 1

    return candidate


def build_text_file_path(now: datetime) -> Path:
    return build_inbox_file_path(now, ".txt")


def read_upload_content(original_name: str, item_type: str) -> str:
    for field_name in ("content", "caption", "title", "description"):
        value = get_request_field(field_name).strip()
        if value:
            return value
    return original_name or item_type


def parse_uploaded_file(uploaded_file) -> dict:
    raw_name = uploaded_file.filename.strip()
    mime_type = normalize_mime_type(
        getattr(uploaded_file, "mimetype", None)
        or getattr(uploaded_file, "content_type", None)
    )
    extension = get_file_extension(raw_name)
    item_type = detect_upload_item_type(extension, mime_type)
    if item_type is None:
        raise ValueError(build_upload_error_message())

    original_name = normalize_original_name(raw_name, item_type, mime_type)
    normalized_extension = get_file_extension(original_name)
    if item_type == ITEM_TYPE_IMAGE and normalized_extension not in IMAGE_EXTENSIONS:
        raise ValueError(build_upload_error_message())
    if item_type == ITEM_TYPE_DOCUMENT and normalized_extension not in DOCUMENT_EXTENSIONS:
        raise ValueError(build_upload_error_message())
    if item_type == ITEM_TYPE_AUDIO and normalized_extension not in AUDIO_EXTENSIONS:
        raise ValueError(build_upload_error_message())

    if not mime_type:
        mime_type = mimetypes.guess_type(original_name)[0] or ""

    return {
        "item_type": item_type,
        "original_name": original_name,
        "mime_type": mime_type or None,
    }


def normalize_extracted_text(text: str | None) -> str | None:
    if not text:
        return None

    paragraphs = [part.strip() for part in str(text).replace("\r", "\n").split("\n") if part.strip()]
    if not paragraphs:
        return None
    return "\n\n".join(paragraphs)


def decode_text_file_bytes(raw_bytes: bytes) -> str:
    for encoding in TRANSCRIPT_TEXT_ENCODINGS:
        try:
            return raw_bytes.decode(encoding)
        except UnicodeDecodeError:
            continue
    raise ValueError("暂不支持当前 transcript_file 编码，请改成 UTF-8、UTF-16 或常见文本编码后重试")


def normalize_audio_transcript_text(
    text: str | None,
    extension: str | None = None,
) -> str | None:
    if not text:
        return None

    normalized_extension = (extension or "").strip().lower()
    plain_text = str(text).replace("\r\n", "\n").replace("\r", "\n")
    if normalized_extension not in {".srt", ".vtt"}:
        return normalize_extracted_text(plain_text)

    cleaned_lines: list[str] = []
    skip_note_block = False
    for raw_line in plain_text.split("\n"):
        stripped_line = raw_line.strip()

        if skip_note_block:
            if not stripped_line:
                skip_note_block = False
            continue

        if not stripped_line:
            cleaned_lines.append("")
            continue
        if normalized_extension == ".vtt" and stripped_line.upper() == "WEBVTT":
            continue
        if normalized_extension == ".vtt" and stripped_line.startswith("NOTE"):
            skip_note_block = True
            continue
        if stripped_line.isdigit():
            continue
        if TRANSCRIPT_TIMESTAMP_PATTERN.match(stripped_line):
            continue

        cleaned_text = html.unescape(TRANSCRIPT_TAG_PATTERN.sub("", stripped_line)).strip()
        if cleaned_text:
            cleaned_lines.append(cleaned_text)

    return normalize_extracted_text("\n".join(cleaned_lines))


def extract_audio_transcript_text_from_bytes(
    raw_bytes: bytes,
    original_name: str | None = None,
) -> str | None:
    if not raw_bytes:
        return None

    text = decode_text_file_bytes(raw_bytes)
    extension = get_file_extension(original_name)
    return normalize_audio_transcript_text(text, extension)


def extract_audio_transcript_text_from_file(
    file_path: Path,
    original_name: str | None = None,
) -> str | None:
    extension = get_file_extension(original_name or file_path)
    if extension not in TRANSCRIPT_EXTENSIONS:
        return None
    return extract_audio_transcript_text_from_bytes(file_path.read_bytes(), original_name or file_path.name)


def extract_audio_transcript_text_from_upload(uploaded_file) -> str | None:
    raw_name = uploaded_file.filename.strip()
    extension = get_file_extension(raw_name)
    if extension not in TRANSCRIPT_EXTENSIONS:
        supported = ", ".join(sorted(TRANSCRIPT_EXTENSIONS))
        raise ValueError(f"transcript_file 只支持 {supported}")

    raw_bytes = uploaded_file.read()
    if not raw_bytes:
        raise ValueError("transcript_file 不能为空")

    try:
        return extract_audio_transcript_text_from_bytes(raw_bytes, raw_name)
    finally:
        try:
            uploaded_file.stream.seek(0)
        except (AttributeError, OSError):
            pass


def build_audio_transcript_sidecar_candidates(
    file_path: Path,
    original_name: str | None = None,
    transcript_dir: Path | None = None,
) -> list[Path]:
    candidate_dirs: list[Path] = [file_path.parent]
    if transcript_dir is not None:
        resolved_dir = transcript_dir.expanduser().resolve()
        if resolved_dir not in candidate_dirs:
            candidate_dirs.append(resolved_dir)

    candidate_names: list[str] = []
    stem = Path(original_name).stem if original_name else file_path.stem
    full_name = Path(original_name).name if original_name else file_path.name
    for extension in sorted(TRANSCRIPT_EXTENSIONS):
        candidate_names.append(f"{stem}{extension}")
        candidate_names.append(f"{full_name}{extension}")

    deduped_names: list[str] = []
    for name in candidate_names:
        if name not in deduped_names:
            deduped_names.append(name)

    candidates: list[Path] = []
    for directory in candidate_dirs:
        for name in deduped_names:
            candidates.append((directory / name).resolve())
    return candidates


def extract_docx_text(file_path: Path) -> str | None:
    with zipfile.ZipFile(file_path) as archive:
        with archive.open("word/document.xml") as document_xml:
            root = ET.parse(document_xml).getroot()

    paragraphs: list[str] = []
    for paragraph in root.findall(".//w:p", DOCX_NAMESPACE):
        parts = [
            node.text
            for node in paragraph.findall(".//w:t", DOCX_NAMESPACE)
            if node.text
        ]
        text = "".join(parts).strip()
        if text:
            paragraphs.append(text)

    if paragraphs:
        return normalize_extracted_text("\n\n".join(paragraphs))

    parts = [
        node.text
        for node in root.findall(".//w:t", DOCX_NAMESPACE)
        if node.text
    ]
    return normalize_extracted_text("\n".join(parts))


def extract_pdf_text(file_path: Path) -> str | None:
    if PdfReader is None:
        logger.warning("pypdf is not installed, skip pdf text extraction: file=%s", file_path.name)
        return None

    reader = PdfReader(str(file_path))
    page_texts = [page.extract_text() or "" for page in reader.pages]
    return normalize_extracted_text("\n\n".join(page_texts))


def extract_document_text(file_path: Path, original_name: str | None) -> str | None:
    extension = get_file_extension(original_name or file_path)
    if extension == ".docx":
        try:
            return extract_docx_text(file_path)
        except (KeyError, OSError, ET.ParseError, zipfile.BadZipFile):
            logger.warning("failed to extract docx text: file=%s", file_path.name, exc_info=True)
            return None

    try:
        if extension == ".pdf":
            return extract_pdf_text(file_path)
    except Exception:
        logger.warning("failed to extract pdf text: file=%s", file_path.name, exc_info=True)
        return None

    return None


def build_archive_file_path(now: datetime, file_path: Path) -> Path:
    archive_dir = ARCHIVE_PATH / now.strftime("%Y%m")
    return build_unique_file_path(archive_dir, file_path.name)


def build_restore_file_path(file_path: Path) -> Path:
    return build_unique_file_path(INBOX_PATH, file_path.name)


def write_text_file_atomic(file_path: Path, text: str) -> None:
    """先写临时文件，再替换成正式文件，避免留下半截 txt。"""
    tmp_path = file_path.with_name(f"{file_path.name}.{uuid4().hex}.tmp")
    try:
        with tmp_path.open("w", encoding="utf-8", newline="\n") as file:
            file.write(text)
            file.flush()
            os.fsync(file.fileno())
        os.replace(tmp_path, file_path)
    except Exception:
        tmp_path.unlink(missing_ok=True)
        raise


def write_binary_file_atomic(file_path: Path, uploaded_file) -> None:
    """图片先写入临时文件，再替换为正式文件。"""
    tmp_path = file_path.with_name(f"{file_path.name}.{uuid4().hex}.tmp")
    try:
        with tmp_path.open("wb") as file:
            uploaded_file.save(file)
            file.flush()
            os.fsync(file.fileno())
        if tmp_path.stat().st_size == 0:
            raise ValueError("uploaded file is empty")
        os.replace(tmp_path, file_path)
    except Exception:
        tmp_path.unlink(missing_ok=True)
        raise


def insert_item(
    item_type: str,
    content: str,
    file_path: Path,
    source: str,
    created_at: str,
    original_name: str | None = None,
    mime_type: str | None = None,
    size_bytes: int | None = None,
    derived_text: str | None = None,
    transcript_text: str | None = None,
    processing_override: str | None = None,
) -> int:
    conn = get_db_connection()
    try:
        cursor = conn.execute(
            """
            INSERT INTO items (
                type,
                content,
                file_path,
                source,
                created_at,
                original_name,
                mime_type,
                size_bytes,
                derived_text,
                transcript_text,
                processing_override
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                item_type,
                content,
                str(file_path),
                source,
                created_at,
                original_name,
                mime_type,
                size_bytes,
                derived_text,
                transcript_text,
                processing_override,
            ),
        )
        conn.commit()
        return int(cursor.lastrowid)
    finally:
        conn.close()


def insert_text_item(text: str, file_path: Path, source: str, created_at: str) -> int:
    return insert_item(ITEM_TYPE_TEXT, text, file_path, source, created_at)


def get_item_by_id(item_id: int) -> sqlite3.Row | None:
    conn = get_db_connection()
    try:
        return conn.execute(
            f"""
            SELECT {ITEM_DETAIL_SELECT_FIELDS}
            FROM items
            WHERE id = ?
            """,
            (item_id,),
        ).fetchone()
    finally:
        conn.close()


def get_items_by_ids(item_ids: list[int]) -> list[sqlite3.Row]:
    if not item_ids:
        return []

    placeholders = ", ".join("?" for _ in item_ids)
    conn = get_db_connection()
    try:
        rows = conn.execute(
            f"""
            SELECT {ITEM_DETAIL_SELECT_FIELDS}
            FROM items
            WHERE id IN ({placeholders})
            """,
            item_ids,
        ).fetchall()
    finally:
        conn.close()

    rows_by_id = {int(row["id"]): row for row in rows}
    return [rows_by_id[item_id] for item_id in item_ids if item_id in rows_by_id]


def update_item_file_path(item_id: int, file_path: Path) -> None:
    conn = get_db_connection()
    try:
        conn.execute(
            """
            UPDATE items
            SET file_path = ?
            WHERE id = ?
            """,
            (str(file_path), item_id),
        )
        conn.commit()
    finally:
        conn.close()


def update_item_content_source_text_fields(
    item_id: int,
    content: str | None,
    source: str | None,
    derived_text: str | None,
    transcript_text: str | None,
    processing_override: str | None,
) -> None:
    conn = get_db_connection()
    try:
        conn.execute(
            """
            UPDATE items
            SET content = ?, source = ?, derived_text = ?, transcript_text = ?, processing_override = ?
            WHERE id = ?
            """,
            (content, source, derived_text, transcript_text, processing_override, item_id),
        )
        conn.commit()
    finally:
        conn.close()


def update_items_processing_override(item_ids: list[int], processing_override: str | None) -> None:
    if not item_ids:
        return

    placeholders = ", ".join("?" for _ in item_ids)
    conn = get_db_connection()
    try:
        conn.execute(
            f"""
            UPDATE items
            SET processing_override = ?
            WHERE id IN ({placeholders})
            """,
            (processing_override, *item_ids),
        )
        conn.commit()
    finally:
        conn.close()


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


def build_artifact_summary_from_path(
    artifact_path_value: str | None,
    preview_chars: int,
) -> dict | None:
    if not artifact_path_value:
        return None

    try:
        file_path = resolve_review_artifact_path(artifact_path_value)
    except ValueError:
        return None

    if not file_path.is_file():
        return {
            "relative_path": artifact_path_value,
            "file_url": build_artifact_file_url(Path(artifact_path_value)),
            "missing": True,
        }

    artifact = build_artifact_payload(file_path)
    if artifact is None:
        return {
            "relative_path": artifact_path_value,
            "file_url": build_artifact_file_url(Path(artifact_path_value)),
        }
    return build_artifact_summary_payload(artifact, preview_chars)


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

    where_clause = join_conditions(conditions, "WHERE")
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


def rows_to_count_map(rows: list[sqlite3.Row], key_name: str) -> dict:
    return {row[key_name] or "unknown": row["count"] for row in rows}


def count_storage_areas(rows: list[sqlite3.Row]) -> dict:
    counts: dict[str, int] = {}
    for row in rows:
        storage = get_storage_area(row["file_path"]) or "unknown"
        counts[storage] = counts.get(storage, 0) + 1
    return counts


def build_stats_payload() -> dict:
    conn = get_db_connection()
    try:
        summary = conn.execute(
            """
            SELECT
                COUNT(*) AS total,
                MIN(created_at) AS first_created_at,
                MAX(created_at) AS latest_created_at
            FROM items
            """
        ).fetchone()
        type_rows = conn.execute(
            """
            SELECT type, COUNT(*) AS count
            FROM items
            GROUP BY type
            ORDER BY type
            """
        ).fetchall()
        source_rows = conn.execute(
            """
            SELECT source, COUNT(*) AS count
            FROM items
            GROUP BY source
            ORDER BY source
            """
        ).fetchall()
        text_source_rows = conn.execute(
            f"""
            SELECT {ITEM_TEXT_SOURCE_SQL} AS text_source, COUNT(*) AS count
            FROM items
            GROUP BY text_source
            ORDER BY text_source
            """
        ).fetchall()
        processing_rows = conn.execute(
            f"""
            SELECT {ITEM_PROCESSING_STATE_SQL} AS processing_state, COUNT(*) AS count
            FROM items
            GROUP BY processing_state
            ORDER BY processing_state
            """
        ).fetchall()
        processing_override_rows = conn.execute(
            """
            SELECT processing_override, COUNT(*) AS count
            FROM items
            WHERE processing_override IS NOT NULL AND processing_override != ''
            GROUP BY processing_override
            ORDER BY processing_override
            """
        ).fetchall()
        storage_rows = conn.execute(
            """
            SELECT file_path
            FROM items
            WHERE file_path IS NOT NULL AND file_path != ''
            """
        ).fetchall()
        memory_total = conn.execute("SELECT COUNT(*) FROM memories").fetchone()[0]
        memory_candidate = conn.execute(
            "SELECT COUNT(*) FROM memories WHERE status = 'candidate'"
        ).fetchone()[0]
        memory_confirmed = conn.execute(
            "SELECT COUNT(*) FROM memories WHERE status = 'confirmed'"
        ).fetchone()[0]
        memory_category_rows = conn.execute(
            """
            SELECT category, COUNT(*) AS count
            FROM memories
            WHERE status = 'confirmed'
            GROUP BY category
            ORDER BY category
            """
        ).fetchall()
        task_total = conn.execute("SELECT COUNT(*) FROM tasks").fetchone()[0]
        task_todo = conn.execute(
            "SELECT COUNT(*) FROM tasks WHERE status = 'todo'"
        ).fetchone()[0]
        task_done = conn.execute(
            "SELECT COUNT(*) FROM tasks WHERE status = 'done'"
        ).fetchone()[0]
    finally:
        conn.close()

    return {
        "total": summary["total"],
        "first_created_at": summary["first_created_at"],
        "latest_created_at": summary["latest_created_at"],
        "by_type": rows_to_count_map(type_rows, "type"),
        "by_source": rows_to_count_map(source_rows, "source"),
        "by_text_source": rows_to_count_map(text_source_rows, "text_source"),
        "by_processing_state": rows_to_count_map(processing_rows, "processing_state"),
        "by_processing_override": rows_to_count_map(processing_override_rows, "processing_override"),
        "by_storage": count_storage_areas(storage_rows),
        "memory_total": memory_total,
        "memory_candidate": memory_candidate,
        "memory_confirmed": memory_confirmed,
        "memory_by_category": rows_to_count_map(memory_category_rows, "category"),
        "task_total": task_total,
        "task_todo": task_todo,
        "task_done": task_done,
    }


def fetch_recent_item_rows(limit: int) -> list[sqlite3.Row]:
    conn = get_db_connection()
    try:
        return conn.execute(
            f"""
            SELECT {ITEM_LIST_SELECT_FIELDS}
            FROM items
            ORDER BY id DESC
            LIMIT ?
            """,
            (limit,),
        ).fetchall()
    finally:
        conn.close()


def fetch_pending_item_rows(item_type: str, limit: int) -> list[sqlite3.Row]:
    conditions, params = build_item_filter_conditions(
        item_type,
        None,
        None,
        None,
        None,
        "pending",
    )
    where_clause = join_conditions(conditions, "WHERE")

    conn = get_db_connection()
    try:
        return conn.execute(
            f"""
            SELECT {ITEM_LIST_SELECT_FIELDS}
            FROM items
            {where_clause}
            ORDER BY id DESC
            LIMIT ?
            """,
            (*params, limit),
        ).fetchall()
    finally:
        conn.close()


def fetch_next_pending_item_row(
    item_type: str | None = None,
    exclude_item_id: int | None = None,
) -> sqlite3.Row | None:
    conditions, params = build_item_filter_conditions(
        item_type,
        None,
        None,
        None,
        None,
        "pending",
    )
    if exclude_item_id is not None:
        conditions.append("id <> ?")
        params.append(exclude_item_id)
    where_clause = join_conditions(conditions, "WHERE")

    conn = get_db_connection()
    try:
        return conn.execute(
            f"""
            SELECT {ITEM_LIST_SELECT_FIELDS}
            FROM items
            {where_clause}
            ORDER BY id DESC
            LIMIT 1
            """,
            params,
        ).fetchone()
    finally:
        conn.close()


def get_processing_backlog_title(item_type: str) -> str:
    if item_type == ITEM_TYPE_DOCUMENT:
        return "文档待补正文"
    if item_type == ITEM_TYPE_AUDIO:
        return "音频待补转写"
    if item_type == ITEM_TYPE_IMAGE:
        return "图片待补说明"
    return "文本待补内容"


def get_processing_backlog_description(item_type: str) -> str:
    if item_type == ITEM_TYPE_DOCUMENT:
        return "优先补 PDF / Word 正文，后续搜索、回顾和导出都会直接消费正文。"
    if item_type == ITEM_TYPE_AUDIO:
        return "优先补音频转写，后续搜索、回顾和自动化会直接消费转写文本。"
    if item_type == ITEM_TYPE_IMAGE:
        return "优先补图片说明，后续搜索、回顾和描述自动化会直接读取说明文本。"
    return "补齐文本内容，避免记录只剩空壳索引。"


def build_processing_backlog_payload(group_limit: int = 3) -> dict:
    ordered_types = [
        ITEM_TYPE_DOCUMENT,
        ITEM_TYPE_AUDIO,
        ITEM_TYPE_IMAGE,
        ITEM_TYPE_TEXT,
    ]

    conn = get_db_connection()
    try:
        type_rows = conn.execute(
            f"""
            SELECT type, COUNT(*) AS count
            FROM items
            WHERE ({ITEM_PROCESSING_STATE_SQL}) = 'pending'
            GROUP BY type
            ORDER BY CASE type
                WHEN 'document' THEN 0
                WHEN 'audio' THEN 1
                WHEN 'image' THEN 2
                WHEN 'text' THEN 3
                ELSE 4
            END
            """
        ).fetchall()
    finally:
        conn.close()

    counts_by_type = rows_to_count_map(type_rows, "type")
    next_overall_row = fetch_next_pending_item_row()
    groups = []

    for item_type in ordered_types:
        count = counts_by_type.get(item_type, 0)
        if count <= 0:
            continue

        rows = fetch_pending_item_rows(item_type, group_limit)
        next_item_row = rows[0] if rows else fetch_next_pending_item_row(item_type)
        groups.append(
            {
                "type": item_type,
                "type_label": get_type_label(item_type),
                "title": get_processing_backlog_title(item_type),
                "description": get_processing_backlog_description(item_type),
                "processing_note": describe_processing_note(item_type, "pending"),
                "count": count,
                "items": [row_to_item(row) for row in rows],
                "next_item": row_to_item(next_item_row) if next_item_row else None,
                "filters": {
                    "type": item_type,
                    "processing_state": "pending",
                },
            }
        )

    total_pending = sum(counts_by_type.values())
    return {
        "generated_at": utc_now().isoformat(timespec="seconds"),
        "total": total_pending,
        "group_limit": group_limit,
        "by_type": counts_by_type,
        "next_overall": row_to_item(next_overall_row) if next_overall_row else None,
        "groups": groups,
    }


def summarize_text(value: str | None, max_chars: int) -> str:
    if not value:
        return ""

    text = " ".join(part.strip() for part in str(value).splitlines() if part.strip())
    if len(text) <= max_chars:
        return text
    return text[: max_chars - 3].rstrip() + "..."


def build_overview_payload(recent_limit: int, preview_chars: int) -> dict:
    recent_rows = fetch_recent_item_rows(recent_limit)
    artifacts = list_review_artifacts()
    latest_overall = max(artifacts, key=artifact_sort_key) if artifacts else None
    backlog_limit = max(1, min(recent_limit, 3))

    return {
        "service": "axiom-receiver",
        "generated_at": utc_now().isoformat(timespec="seconds"),
        "recent": {
            "limit": recent_limit,
            "items": [row_to_item(row) for row in recent_rows],
        },
        "stats": build_stats_payload(),
        "processing_backlog": build_processing_backlog_payload(backlog_limit),
        "artifacts": {
            "preview_chars": preview_chars,
            "total": len(artifacts),
            "counts": build_artifact_counts(artifacts),
            "latest_overall": build_artifact_summary_payload(latest_overall, preview_chars),
            "latest": build_artifact_latest_summary(artifacts, preview_chars),
        },
    }


def build_overview_text(payload: dict, preview_chars: int) -> str:
    stats = payload["stats"]
    recent = payload["recent"]
    backlog = payload["processing_backlog"]
    artifacts = payload["artifacts"]
    latest = artifacts["latest"]
    lines = [
        "Axiom 总览",
        f"生成时间: {payload['generated_at']}",
        "",
        "数据统计",
        f"- 总条目: {stats['total']}",
        f"- 文本: {stats['by_type'].get('text', 0)}",
        f"- 图片: {stats['by_type'].get('image', 0)}",
        f"- 文档: {stats['by_type'].get('document', 0)}",
        f"- 音频: {stats['by_type'].get('audio', 0)}",
        f"- 已就绪: {stats['by_processing_state'].get('ready', 0)}",
        f"- 待处理: {stats['by_processing_state'].get('pending', 0)}",
        f"- inbox: {stats['by_storage'].get('inbox', 0)}",
        f"- archive: {stats['by_storage'].get('archive', 0)}",
        f"- 记忆: {stats.get('memory_confirmed', 0)} 已确认",
        f"- 待确认记忆: {stats.get('memory_candidate', 0)}",
        f"- 任务: {stats.get('task_todo', 0)} 待办 / {stats.get('task_done', 0)} 已完成",
        "",
        "最近记录",
    ]

    if recent["items"]:
        for index, item in enumerate(recent["items"], start=1):
            content = summarize_text(item.get("content"), preview_chars) or "(无内容)"
            lines.append(
                f"{index}. [{item['type']}] {content} | {item['created_at']} | {item.get('source') or 'unknown'}"
            )
    else:
        lines.append("- 暂无记录")

    lines.extend(["", "处理积压"])
    if backlog["total"] <= 0:
        lines.append("- 当前没有待补正文 / 转写 / 描述项")
    else:
        lines.append(f"- 总待处理: {backlog['total']}")
        for group in backlog["groups"]:
            latest_item = group["items"][0] if group["items"] else None
            item_preview = summarize_text(
                get_item_primary_text(latest_item) if latest_item else "",
                preview_chars,
            ) or (latest_item.get("original_name") if latest_item else "")
            suffix = ""
            if latest_item:
                suffix = f" | 最近: {item_preview or '(无内容)'}"
            lines.append(f"- {group['title']}: {group['count']}{suffix}")

    lines.extend(["", "自动化产物", f"- 总数: {artifacts['total']}"])

    latest_overall = artifacts.get("latest_overall")
    if latest_overall:
        overall_preview = summarize_text(latest_overall.get("preview"), preview_chars) or "(无预览)"
        lines.append(
            f"- 最新产物: {latest_overall['group']} {latest_overall.get('window') or latest_overall.get('mode') or ''} {latest_overall.get('report_date') or ''} {overall_preview}".strip()
        )

    artifact_sections = [
        ("Review 日报", latest["review"]["daily"]),
        ("Review 周报", latest["review"]["weekly"]),
        ("Inbox 报告", latest["inbox"]),
        ("Inbox 动作预演", latest["inbox-actions"]["dry-run"]),
        ("Inbox 动作执行", latest["inbox-actions"]["apply"]),
        ("动作历史日报", latest["inbox-action-history"]["daily"]),
        ("动作历史周报", latest["inbox-action-history"]["weekly"]),
        ("音频转写报告", latest["audio-transcripts"]),
        ("图片描述报告", latest["image-descriptions"]),
    ]
    for label, artifact in artifact_sections:
        if artifact is None:
            continue
        preview = summarize_text(artifact.get("preview"), preview_chars) or "(无预览)"
        report_date = artifact.get("report_date") or artifact.get("generated_name") or ""
        lines.append(f"- {label}: {report_date} {preview}".rstrip())

    return "\n".join(lines) + "\n"


def resolve_stored_file_path(file_path_value: str | None) -> Path | None:
    if not file_path_value:
        return None

    file_path = Path(file_path_value).expanduser()
    if not file_path.is_absolute():
        file_path = AXIOM_ROOT / file_path
    return file_path.resolve()


def resolve_review_artifact_path(artifact_path_value: str) -> Path:
    artifact_path = (AXIOM_ROOT / artifact_path_value).resolve()
    if not is_path_under(artifact_path, REVIEWS_PATH):
        raise ValueError("artifact 路径不允许访问")
    return artifact_path


def build_artifact_payload(file_path: Path) -> dict | None:
    try:
        relative_path = file_path.resolve().relative_to(AXIOM_ROOT)
    except ValueError:
        return None

    parts = relative_path.parts
    if len(parts) < 5 or parts[:2] != ("data", "reviews") or file_path.suffix.lower() != ".md":
        return None

    stat_result = file_path.stat()
    payload = {
        "name": file_path.name,
        "relative_path": relative_path.as_posix(),
        "file_url": build_artifact_file_url(relative_path),
        "size_bytes": stat_result.st_size,
        "modified_at": isoformat_timestamp(stat_result.st_mtime),
    }

    group_dir = parts[2]
    if group_dir in ARTIFACT_WINDOWS and len(parts) == 5:
        payload.update(
            {
                "group": "review",
                "window": group_dir,
                "mode": None,
                "report_date": Path(parts[4]).stem,
            }
        )
        return payload

    if group_dir == "inbox" and len(parts) == 5:
        payload.update(
            {
                "group": "inbox",
                "window": None,
                "mode": None,
                "report_date": Path(parts[4]).stem,
            }
        )
        return payload

    if group_dir == "inbox-actions" and len(parts) == 7:
        mode = parts[3]
        if mode not in ARTIFACT_MODES:
            return None
        payload.update(
            {
                "group": "inbox-actions",
                "window": None,
                "mode": mode,
                "report_date": parts[5],
                "generated_name": Path(parts[6]).stem,
            }
        )
        return payload

    if group_dir == "inbox-action-history" and len(parts) == 6:
        window = parts[3]
        if window not in ARTIFACT_WINDOWS:
            return None
        payload.update(
            {
                "group": "inbox-action-history",
                "window": window,
                "mode": None,
                "report_date": Path(parts[5]).stem,
            }
        )
        return payload

    if group_dir == "audio-transcripts" and len(parts) == 5:
        payload.update(
            {
                "group": "audio-transcripts",
                "window": None,
                "mode": None,
                "report_date": Path(parts[4]).stem,
            }
        )
        return payload

    if group_dir == "image-descriptions" and len(parts) == 5:
        payload.update(
            {
                "group": "image-descriptions",
                "window": None,
                "mode": None,
                "report_date": Path(parts[4]).stem,
            }
        )
        return payload

    return None


def list_review_artifacts() -> list[dict]:
    if not REVIEWS_PATH.exists():
        return []

    artifacts: list[dict] = []
    for file_path in REVIEWS_PATH.rglob("*.md"):
        if not file_path.is_file():
            continue
        payload = build_artifact_payload(file_path)
        if payload is not None:
            artifacts.append(payload)
    return artifacts


def artifact_sort_key(artifact: dict) -> tuple[str, str]:
    return artifact["modified_at"], artifact["relative_path"]


def artifact_matches_filters(
    artifact: dict,
    *,
    group: str | None,
    window: str | None,
    mode: str | None,
    date_from: date | None,
    date_to: date | None,
) -> bool:
    if group and artifact["group"] != group:
        return False
    if window and artifact.get("window") != window:
        return False
    if mode and artifact.get("mode") != mode:
        return False

    report_date_text = artifact.get("report_date")
    if date_from or date_to:
        if not report_date_text:
            return False
        try:
            report_date = date.fromisoformat(report_date_text)
        except ValueError:
            return False
        if date_from and report_date < date_from:
            return False
        if date_to and report_date > date_to:
            return False

    return True


def select_latest_artifact(
    artifacts: list[dict],
    *,
    group: str,
    window: str | None = None,
    mode: str | None = None,
) -> dict | None:
    matches = [
        artifact
        for artifact in artifacts
        if artifact["group"] == group
        and (window is None or artifact.get("window") == window)
        and (mode is None or artifact.get("mode") == mode)
    ]
    if not matches:
        return None
    return max(matches, key=artifact_sort_key)


def extract_markdown_preview(file_path: Path, max_chars: int) -> str:
    text = file_path.read_text(encoding="utf-8")
    preview_lines: list[str] = []
    skip_metadata = True

    for raw_line in text.splitlines():
        stripped = raw_line.strip()
        if not stripped:
            continue
        if stripped.startswith("# "):
            continue
        if skip_metadata and stripped.startswith("- ") and ":" in stripped:
            continue

        cleaned = stripped.lstrip("#").strip()
        if cleaned:
            preview_lines.append(cleaned)
            skip_metadata = False

        preview = " ".join(preview_lines).strip()
        if len(preview) >= max_chars:
            break

    preview = " ".join(preview_lines).strip()
    if len(preview) > max_chars:
        return preview[: max_chars - 3].rstrip() + "..."
    return preview


def build_artifact_summary_payload(artifact: dict | None, preview_chars: int) -> dict | None:
    if artifact is None:
        return None

    payload = dict(artifact)
    try:
        file_path = resolve_review_artifact_path(artifact["relative_path"])
        if file_path.is_file():
            payload["preview"] = extract_markdown_preview(file_path, preview_chars)
        else:
            payload["preview"] = ""
    except (OSError, UnicodeError, ValueError):
        payload["preview"] = ""

    return payload


def build_artifact_counts(artifacts: list[dict]) -> dict:
    counts = {
        "review": {"daily": 0, "weekly": 0},
        "inbox": 0,
        "inbox-actions": {"dry-run": 0, "apply": 0},
        "inbox-action-history": {"daily": 0, "weekly": 0},
        "audio-transcripts": 0,
        "image-descriptions": 0,
    }

    for artifact in artifacts:
        group = artifact["group"]
        if group == "review":
            counts["review"][artifact["window"]] += 1
        elif group == "inbox":
            counts["inbox"] += 1
        elif group == "inbox-actions":
            counts["inbox-actions"][artifact["mode"]] += 1
        elif group == "inbox-action-history":
            counts["inbox-action-history"][artifact["window"]] += 1
        elif group == "audio-transcripts":
            counts["audio-transcripts"] += 1
        elif group == "image-descriptions":
            counts["image-descriptions"] += 1

    return counts


def build_artifact_latest_summary(artifacts: list[dict], preview_chars: int) -> dict:
    return {
        "review": {
            "daily": build_artifact_summary_payload(
                select_latest_artifact(artifacts, group="review", window="daily"),
                preview_chars,
            ),
            "weekly": build_artifact_summary_payload(
                select_latest_artifact(artifacts, group="review", window="weekly"),
                preview_chars,
            ),
        },
        "inbox": build_artifact_summary_payload(
            select_latest_artifact(artifacts, group="inbox"),
            preview_chars,
        ),
        "inbox-actions": {
            "dry-run": build_artifact_summary_payload(
                select_latest_artifact(artifacts, group="inbox-actions", mode="dry-run"),
                preview_chars,
            ),
            "apply": build_artifact_summary_payload(
                select_latest_artifact(artifacts, group="inbox-actions", mode="apply"),
                preview_chars,
            ),
        },
        "inbox-action-history": {
            "daily": build_artifact_summary_payload(
                select_latest_artifact(artifacts, group="inbox-action-history", window="daily"),
                preview_chars,
            ),
            "weekly": build_artifact_summary_payload(
                select_latest_artifact(artifacts, group="inbox-action-history", window="weekly"),
                preview_chars,
            ),
        },
        "audio-transcripts": build_artifact_summary_payload(
            select_latest_artifact(artifacts, group="audio-transcripts"),
            preview_chars,
        ),
        "image-descriptions": build_artifact_summary_payload(
            select_latest_artifact(artifacts, group="image-descriptions"),
            preview_chars,
        ),
    }


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


def cleanup_file(file_path: Path) -> None:
    try:
        file_path.unlink(missing_ok=True)
    except OSError:
        logger.exception("failed to clean up file after database error: %s", file_path)


# ===== 路由 =====
@app.route("/app", methods=["GET"], strict_slashes=False)
def app_shell():
    return render_template("app.html")


@app.route("/sw.js", methods=["GET"])
def service_worker():
    static_root = Path(app.static_folder or "").resolve()
    return send_file(static_root / "sw.js", mimetype="application/javascript")


@app.route("/health", methods=["GET"])
def health_check():
    conn = None
    try:
        conn = get_db_connection()
        conn.execute("SELECT 1")
    except sqlite3.Error:
        logger.exception("health check failed")
        return error_response(500, "database_error", "数据库不可用")
    finally:
        if conn is not None:
            conn.close()

    return ok_response(
        {
            "service": "axiom-receiver",
            "db": "ok",
            "inbox": "ok" if INBOX_PATH.exists() else "missing",
        }
    )


@app.route("/stats", methods=["GET"])
def stats():
    auth_error = require_key()
    if auth_error:
        return auth_error

    return ok_response(build_stats_payload())


@app.route("/overview", methods=["GET"])
def overview():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        recent_limit = read_recent_limit()
        preview_chars = read_preview_chars()
    except ValueError as exc:
        return error_response(400, "invalid_overview_param", str(exc))

    return ok_response(build_overview_payload(recent_limit, preview_chars))


@app.route("/overview/text", methods=["GET"])
def overview_text():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        recent_limit = read_recent_limit()
        preview_chars = read_preview_chars()
    except ValueError as exc:
        return error_response(400, "invalid_overview_param", str(exc))

    payload = build_overview_payload(recent_limit, preview_chars)
    body = build_overview_text(payload, preview_chars)
    return app.response_class(body, mimetype="text/plain")


@app.route("/processing/backlog", methods=["GET"])
def processing_backlog():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        group_limit = read_group_limit()
    except ValueError as exc:
        return error_response(400, "invalid_processing_backlog_param", str(exc))

    return ok_response(build_processing_backlog_payload(group_limit))


@app.route("/processing/next", methods=["GET"])
def processing_next_item():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        item_type = read_item_type_filter()
        exclude_id_value = request.args.get("exclude_id")
        exclude_item_id = None
        if exclude_id_value not in {None, ""}:
            exclude_item_id = parse_positive_int(
                exclude_id_value,
                "exclude_id",
                1,
            )
    except ValueError as exc:
        return error_response(400, "invalid_processing_next_param", str(exc))

    row = fetch_next_pending_item_row(item_type, exclude_item_id)
    return ok_response(
        {
            "type": item_type,
            "processing_state": "pending",
            "exclude_id": exclude_item_id,
            "item": row_to_item(row) if row else None,
        }
    )


@app.route("/processing/mark-ready", methods=["POST"])
def processing_mark_ready():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        body = get_request_body_data()
    except ValueError as exc:
        return error_response(400, "invalid_request_body", str(exc))

    try:
        item_ids = normalize_item_id_list(body.get("ids"))
    except ValueError as exc:
        return error_response(400, "invalid_processing_ids", str(exc))

    rows = get_items_by_ids(item_ids)
    found_ids = {int(row["id"]) for row in rows}
    missing_ids = [item_id for item_id in item_ids if item_id not in found_ids]
    if missing_ids:
        missing_text = ", ".join(str(item_id) for item_id in missing_ids)
        return error_response(404, "item_not_found", f"浠ヤ笅 item 涓嶅瓨鍦? {missing_text}")

    update_items_processing_override(item_ids, "ready")
    updated_rows = get_items_by_ids(item_ids)

    counts_by_type: dict[str, int] = {}
    for row in updated_rows:
        item_type = str(row["type"])
        counts_by_type[item_type] = counts_by_type.get(item_type, 0) + 1

    return ok_response(
        {
            "message": "marked_ready",
            "processing_override": "ready",
            "count": len(updated_rows),
            "ids": item_ids,
            "by_type": counts_by_type,
            "items": [row_to_item(row) for row in updated_rows],
        }
    )


@app.route("/processing/mark-pending", methods=["POST"])
def processing_mark_pending():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        body = get_request_body_data()
    except ValueError as exc:
        return error_response(400, "invalid_request_body", str(exc))

    try:
        item_ids = normalize_item_id_list(body.get("ids"))
    except ValueError as exc:
        return error_response(400, "invalid_processing_ids", str(exc))

    rows = get_items_by_ids(item_ids)
    found_ids = {int(row["id"]) for row in rows}
    missing_ids = [item_id for item_id in item_ids if item_id not in found_ids]
    if missing_ids:
        missing_text = ", ".join(str(item_id) for item_id in missing_ids)
        return error_response(404, "item_not_found", f"找不到这些 item id: {missing_text}")

    update_items_processing_override(item_ids, None)
    updated_rows = get_items_by_ids(item_ids)

    counts_by_type: dict[str, int] = {}
    for row in updated_rows:
        item_type = str(row["type"])
        counts_by_type[item_type] = counts_by_type.get(item_type, 0) + 1

    return ok_response(
        {
            "message": "marked_pending",
            "processing_override": None,
            "count": len(updated_rows),
            "ids": item_ids,
            "by_type": counts_by_type,
            "items": [row_to_item(row) for row in updated_rows],
        }
    )


@app.route("/add", methods=["GET", "POST"])
def add_note():
    auth_error = require_key()
    if auth_error:
        return auth_error

    text = get_request_field("text")
    if not text.strip():
        return error_response(400, "empty_text", "text 不能为空")

    source = get_request_field("source", DEFAULT_SOURCE).strip() or DEFAULT_SOURCE
    now = utc_now()
    created_at = now.isoformat(timespec="seconds")
    file_path = build_text_file_path(now)

    try:
        write_text_file_atomic(file_path, text)
    except OSError:
        logger.exception("failed to write inbox file")
        return error_response(500, "file_write_failed", "文件写入失败")

    try:
        item_id = insert_text_item(text, file_path, source, created_at)
    except sqlite3.Error:
        cleanup_file(file_path)
        logger.exception("failed to insert item into database")
        return error_response(500, "database_write_failed", "数据库写入失败")

    logger.info("saved text item id=%s file=%s", item_id, file_path.name)
    return ok_response(
        {
            "message": f"saved: {file_path.name}",
            "item": build_item_payload(
                item_id,
                ITEM_TYPE_TEXT,
                text,
                file_path,
                source,
                created_at,
            ),
        }
    )


@app.route("/upload", methods=["POST"])
def upload_file():
    auth_error = require_key()
    if auth_error:
        return auth_error

    transcript_file = request.files.get("transcript_file")
    uploaded_file = (
        request.files.get("file")
        or request.files.get("image")
        or request.files.get("document")
        or request.files.get("audio")
    )
    if uploaded_file is None or not uploaded_file.filename:
        return error_response(400, "empty_file", "file 不能为空")

    try:
        upload_info = parse_uploaded_file(uploaded_file)
    except ValueError as exc:
        return error_response(400, "invalid_file_type", str(exc))

    source = get_request_field("source", DEFAULT_SOURCE).strip() or DEFAULT_SOURCE
    item_type = upload_info["item_type"]
    original_name = upload_info["original_name"]
    mime_type = upload_info["mime_type"]
    content = read_upload_content(original_name, item_type)
    derived_text = None
    transcript_text = None
    if item_type == ITEM_TYPE_AUDIO:
        transcript_text = normalize_audio_transcript_text(
            get_request_field(
                "transcript_text",
                get_request_field("transcript", ""),
            ).strip()
        )
        if transcript_text is None and transcript_file is not None and transcript_file.filename:
            try:
                transcript_text = extract_audio_transcript_text_from_upload(transcript_file)
            except ValueError as exc:
                return error_response(400, "invalid_transcript_file", str(exc))

    now = utc_now()
    created_at = now.isoformat(timespec="seconds")
    file_path = build_binary_file_path(now, original_name)

    try:
        write_binary_file_atomic(file_path, uploaded_file)
    except ValueError:
        return error_response(400, "empty_file", "file 不能为空")
    except OSError:
        logger.exception("failed to write uploaded file")
        return error_response(500, "file_write_failed", "文件写入失败")

    size_bytes = file_path.stat().st_size
    if item_type == ITEM_TYPE_DOCUMENT:
        derived_text = extract_document_text(file_path, original_name)

    try:
        item_id = insert_item(
            item_type,
            content,
            file_path,
            source,
            created_at,
            original_name=original_name,
            mime_type=mime_type,
            size_bytes=size_bytes,
            derived_text=derived_text,
            transcript_text=transcript_text,
        )
    except sqlite3.Error:
        cleanup_file(file_path)
        logger.exception("failed to insert uploaded item into database")
        return error_response(500, "database_write_failed", "数据库写入失败")

    type_label = get_type_label(item_type)
    logger.info("saved %s item id=%s file=%s", item_type, item_id, file_path.name)
    return ok_response(
        {
            "message": f"saved: {file_path.name}",
            "item": build_item_payload(
                item_id,
                item_type,
                content,
                file_path,
                source,
                created_at,
                original_name,
                mime_type,
                size_bytes,
                derived_text=derived_text,
                transcript_text=transcript_text,
            ),
            "type_label": type_label,
        }
    )


@app.route("/item/<int:item_id>", methods=["GET"])
def get_item(item_id: int):
    auth_error = require_key()
    if auth_error:
        return auth_error

    row = get_item_by_id(item_id)
    if row is None:
        return error_response(404, "item_not_found", "item 不存在")

    return ok_response({"item": row_to_item(row)})


@app.route("/automation/jobs", methods=["GET"])
def list_automation_jobs():
    auth_error = require_key()
    if auth_error:
        return auth_error

    jobs = [build_automation_job_payload(job_id, job) for job_id, job in iter_automation_job_items(manual_only=True)]
    history_jobs = [build_automation_job_payload(job_id, job) for job_id, job in iter_automation_job_items()]
    return ok_response({"jobs": jobs, "history_jobs": history_jobs})


@app.route("/automation/runs", methods=["GET"])
def list_automation_runs():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        page, page_size = read_pagination(default_page_size=8)
        job_id = read_automation_job_filter()
        status = read_automation_status_filter()
    except ValueError as exc:
        return error_response(400, "invalid_automation_filter", str(exc))

    total, rows = fetch_automation_run_rows(
        page=page,
        page_size=page_size,
        job_id=job_id,
        status=status,
    )
    total_pages = (total + page_size - 1) // page_size
    return ok_response(
        {
            "job": job_id,
            "status": status,
            "page": page,
            "page_size": page_size,
            "total": total,
            "total_pages": total_pages,
            "items": [row_to_automation_run(row) for row in rows],
        }
    )


@app.route("/automation/run", methods=["POST"])
def run_automation():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        body = get_request_body_data()
    except ValueError as exc:
        return error_response(400, "invalid_request_body", str(exc))

    job_id = str(body.get("job") or "").strip()
    if not job_id:
        return error_response(400, "missing_job", "job 不能为空")
    if job_id not in AUTOMATION_JOBS:
        return error_response(400, "invalid_job", "job 不存在")
    job = AUTOMATION_JOBS[job_id]
    if not job.get("manual_enabled", True):
        return error_response(400, "manual_job_disabled", "job 不支持手动触发")
    job_payload = build_automation_job_payload(job_id, job)
    if not job_payload["ready"]:
        return error_response(400, "automation_job_unavailable", job_payload["availability_note"])

    try:
        run_date = read_optional_run_date(body)
    except ValueError as exc:
        return error_response(400, "invalid_run_date", str(exc))
    payload, status = execute_logged_automation_job(job_id, run_date)
    return jsonify(payload), status


@app.route("/item/<int:item_id>/update", methods=["POST"])
def update_item(item_id: int):
    auth_error = require_key()
    if auth_error:
        return auth_error

    row = get_item_by_id(item_id)
    if row is None:
        return error_response(404, "item_not_found", "item 不存在")

    try:
        body = get_request_body_data()
    except ValueError as exc:
        return error_response(400, "invalid_request_body", str(exc))

    content_provided, raw_content = read_optional_body_field(body, "content")
    source_provided, raw_source = read_optional_body_field(body, "source")
    derived_provided, raw_derived_text = read_optional_body_field(body, "derived_text")
    transcript_provided, raw_transcript_text = read_optional_body_field(body, "transcript_text")
    processing_override_provided, raw_processing_override = read_optional_body_field(body, "processing_override")

    if derived_provided and row["type"] != ITEM_TYPE_DOCUMENT:
        return error_response(400, "invalid_derived_text_target", "derived_text 目前只支持 document item")
    if transcript_provided and row["type"] != ITEM_TYPE_AUDIO:
        return error_response(400, "invalid_transcript_target", "transcript_text 目前只支持 audio item")

    if (
        not content_provided
        and not source_provided
        and not derived_provided
        and not transcript_provided
        and not processing_override_provided
    ):
        return error_response(
            400,
            "missing_update_fields",
            "至少要提供 content、source、derived_text、transcript_text 或 processing_override",
        )

    next_content = row["content"]
    if content_provided:
        if row["type"] == ITEM_TYPE_TEXT:
            if not raw_content.strip():
                return error_response(400, "empty_text", "text 不能为空")
            next_content = raw_content
        else:
            next_content = raw_content.strip()

    next_source = row["source"]
    if source_provided:
        cleaned_source = raw_source.strip()
        if not cleaned_source:
            return error_response(400, "empty_source", "source 不能为空")
        next_source = cleaned_source

    next_derived_text = row["derived_text"] if "derived_text" in row.keys() else None
    if derived_provided:
        next_derived_text = normalize_extracted_text(raw_derived_text)

    next_transcript_text = row["transcript_text"] if "transcript_text" in row.keys() else None
    if transcript_provided:
        next_transcript_text = normalize_extracted_text(raw_transcript_text)

    next_processing_override = row["processing_override"] if "processing_override" in row.keys() else None
    if processing_override_provided:
        try:
            next_processing_override = normalize_processing_override(raw_processing_override)
        except ValueError as exc:
            return error_response(400, "invalid_processing_override", str(exc))

    updated_fields: list[str] = []
    if next_content != row["content"]:
        updated_fields.append("content")
    if next_source != row["source"]:
        updated_fields.append("source")
    if next_derived_text != row["derived_text"]:
        updated_fields.append("derived_text")
    if next_transcript_text != row["transcript_text"]:
        updated_fields.append("transcript_text")
    if next_processing_override != row["processing_override"]:
        updated_fields.append("processing_override")

    if not updated_fields:
        return ok_response(
            {
                "message": "unchanged",
                "updated_fields": [],
                "item": row_to_item(row),
            }
        )

    file_path: Path | None = None
    rollback_content = row["content"] or ""
    content_written = False

    if row["type"] == ITEM_TYPE_TEXT and "content" in updated_fields:
        file_path = resolve_stored_file_path(row["file_path"])
        if file_path is None:
            return error_response(404, "file_not_found", "文本文件不存在")
        if not is_path_under(file_path, AXIOM_ROOT):
            logger.warning("blocked update outside root: item_id=%s path=%s", item_id, file_path)
            return error_response(403, "forbidden_file_path", "文件路径不允许访问")
        if not file_path.is_file():
            return error_response(404, "file_not_found", "文本文件不存在")

        try:
            write_text_file_atomic(file_path, next_content or "")
            content_written = True
        except OSError:
            logger.exception("failed to rewrite text file: item_id=%s", item_id)
            return error_response(500, "file_write_failed", "文本文件更新失败")

    try:
        update_item_content_source_text_fields(
            item_id,
            next_content,
            next_source,
            next_derived_text,
            next_transcript_text,
            next_processing_override,
        )
    except sqlite3.Error:
        if content_written and file_path is not None:
            try:
                write_text_file_atomic(file_path, rollback_content)
            except OSError:
                logger.exception("failed to rollback text file after db error: item_id=%s", item_id)
        logger.exception("failed to update item in database: item_id=%s", item_id)
        return error_response(500, "database_write_failed", "数据库写入失败")

    updated_row = get_item_by_id(item_id)
    logger.info("updated item id=%s fields=%s", item_id, ",".join(updated_fields))
    return ok_response(
        {
            "message": "updated",
            "updated_fields": updated_fields,
            "item": row_to_item(updated_row),
        }
    )


@app.route("/file/<int:item_id>", methods=["GET"])
def get_item_file(item_id: int):
    auth_error = require_key()
    if auth_error:
        return auth_error

    row = get_item_by_id(item_id)
    if row is None:
        return error_response(404, "item_not_found", "item 不存在")

    file_path = resolve_stored_file_path(row["file_path"])
    if file_path is None:
        return error_response(404, "file_not_found", "文件不存在")

    if not is_path_under(file_path, AXIOM_ROOT):
        logger.warning("blocked file access outside root: item_id=%s path=%s", item_id, file_path)
        return error_response(403, "forbidden_file_path", "文件路径不允许访问")

    if not file_path.is_file():
        return error_response(404, "file_not_found", "文件不存在")

    download_name = build_download_name(
        row["original_name"] if "original_name" in row.keys() else None,
        file_path,
        row["id"],
    )
    return send_file(file_path, download_name=download_name)


@app.route("/artifacts", methods=["GET"])
def list_artifacts():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        page, page_size = read_pagination()
        group = read_artifact_group_filter()
        window = read_artifact_window_filter()
        mode = read_artifact_mode_filter()
        date_from, date_to = read_artifact_date_range()
    except ValueError as exc:
        return error_response(400, "invalid_artifact_filter", str(exc))

    sort = request.args.get("sort", "newest").strip().lower()
    if sort not in {"newest", "oldest"}:
        return error_response(400, "invalid_sort", "sort 只能是 newest 或 oldest")

    artifacts = [
        artifact
        for artifact in list_review_artifacts()
        if artifact_matches_filters(
            artifact,
            group=group,
            window=window,
            mode=mode,
            date_from=date_from,
            date_to=date_to,
        )
    ]

    artifacts.sort(
        key=lambda artifact: (artifact["modified_at"], artifact["relative_path"]),
        reverse=(sort == "newest"),
    )

    total = len(artifacts)
    offset = (page - 1) * page_size
    page_items = artifacts[offset : offset + page_size]
    total_pages = (total + page_size - 1) // page_size

    return ok_response(
        {
            "group": group,
            "window": window,
            "mode": mode,
            "date_from": date_from.isoformat() if date_from else None,
            "date_to": date_to.isoformat() if date_to else None,
            "sort": sort,
            "page": page,
            "page_size": page_size,
            "total": total,
            "total_pages": total_pages,
            "items": page_items,
        }
    )


@app.route("/artifacts/summary", methods=["GET"])
def artifact_summary():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        group = read_artifact_group_filter()
        window = read_artifact_window_filter()
        mode = read_artifact_mode_filter()
        date_from, date_to = read_artifact_date_range()
        preview_chars = read_preview_chars()
    except ValueError as exc:
        return error_response(400, "invalid_artifact_filter", str(exc))

    artifacts = [
        artifact
        for artifact in list_review_artifacts()
        if artifact_matches_filters(
            artifact,
            group=group,
            window=window,
            mode=mode,
            date_from=date_from,
            date_to=date_to,
        )
    ]

    latest_overall = max(artifacts, key=artifact_sort_key) if artifacts else None

    return ok_response(
        {
            "group": group,
            "window": window,
            "mode": mode,
            "date_from": date_from.isoformat() if date_from else None,
            "date_to": date_to.isoformat() if date_to else None,
            "preview_chars": preview_chars,
            "total": len(artifacts),
            "counts": build_artifact_counts(artifacts),
            "latest_overall": build_artifact_summary_payload(latest_overall, preview_chars),
            "latest": build_artifact_latest_summary(artifacts, preview_chars),
        }
    )


@app.route("/artifacts/file/<path:artifact_path>", methods=["GET"])
def get_artifact_file(artifact_path: str):
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        file_path = resolve_review_artifact_path(artifact_path)
    except ValueError:
        logger.warning("blocked artifact access outside reviews: path=%s", artifact_path)
        return error_response(403, "forbidden_artifact_path", "artifact 路径不允许访问")

    if not file_path.is_file():
        return error_response(404, "artifact_not_found", "artifact 不存在")

    if file_path.suffix.lower() != ".md":
        return error_response(400, "invalid_artifact_type", "当前只支持读取 markdown artifact")

    return send_file(file_path, download_name=file_path.name, mimetype="text/markdown")


@app.route("/archive/<int:item_id>", methods=["POST"])
def archive_item(item_id: int):
    auth_error = require_key()
    if auth_error:
        return auth_error

    row = get_item_by_id(item_id)
    if row is None:
        return error_response(404, "item_not_found", "item 不存在")

    file_path = resolve_stored_file_path(row["file_path"])
    if file_path is None:
        return error_response(404, "file_not_found", "文件不存在")

    if not is_path_under(file_path, AXIOM_ROOT):
        logger.warning("blocked archive outside root: item_id=%s path=%s", item_id, file_path)
        return error_response(403, "forbidden_file_path", "文件路径不允许访问")

    if is_path_under(file_path, ARCHIVE_PATH):
        return ok_response({"message": "already archived", "item": row_to_item(row)})

    if not file_path.is_file():
        return error_response(404, "file_not_found", "文件不存在")

    archive_path = build_archive_file_path(utc_now(), file_path)
    try:
        os.replace(file_path, archive_path)
        update_item_file_path(item_id, archive_path)
    except OSError:
        logger.exception("failed to archive item: item_id=%s", item_id)
        return error_response(500, "archive_failed", "归档失败")

    updated_row = get_item_by_id(item_id)
    logger.info("archived item id=%s file=%s", item_id, archive_path.name)
    return ok_response({"message": "archived", "item": row_to_item(updated_row)})


@app.route("/restore/<int:item_id>", methods=["POST"])
def restore_item(item_id: int):
    auth_error = require_key()
    if auth_error:
        return auth_error

    row = get_item_by_id(item_id)
    if row is None:
        return error_response(404, "item_not_found", "item 不存在")

    file_path = resolve_stored_file_path(row["file_path"])
    if file_path is None:
        return error_response(404, "file_not_found", "文件不存在")

    if not is_path_under(file_path, AXIOM_ROOT):
        logger.warning("blocked restore outside root: item_id=%s path=%s", item_id, file_path)
        return error_response(403, "forbidden_file_path", "文件路径不允许访问")

    if is_path_under(file_path, INBOX_PATH):
        return ok_response({"message": "already restored", "item": row_to_item(row)})

    if not is_path_under(file_path, ARCHIVE_PATH):
        return error_response(400, "invalid_storage", "当前文件不在 archive 中")

    if not file_path.is_file():
        return error_response(404, "file_not_found", "文件不存在")

    restore_path = build_restore_file_path(file_path)
    try:
        os.replace(file_path, restore_path)
        update_item_file_path(item_id, restore_path)
    except OSError:
        logger.exception("failed to restore item: item_id=%s", item_id)
        return error_response(500, "restore_failed", "恢复失败")

    updated_row = get_item_by_id(item_id)
    logger.info("restored item id=%s file=%s", item_id, restore_path.name)
    return ok_response({"message": "restored", "item": row_to_item(updated_row)})


@app.route("/recent", methods=["GET"])
def recent_items():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        page, page_size = read_pagination()
    except ValueError as exc:
        return error_response(400, "invalid_pagination", str(exc))

    sort = request.args.get("sort", "newest").strip().lower()
    if sort not in {"newest", "oldest"}:
        return error_response(400, "invalid_sort", "sort 只能是 newest 或 oldest")

    try:
        item_type = read_item_type_filter()
    except ValueError as exc:
        return error_response(400, "invalid_type", str(exc))

    try:
        storage = read_storage_filter()
    except ValueError as exc:
        return error_response(400, "invalid_storage", str(exc))

    try:
        created_from, created_to = read_created_range()
    except ValueError as exc:
        return error_response(400, "invalid_created_range", str(exc))

    try:
        processing_state = read_processing_state_filter()
    except ValueError as exc:
        return error_response(400, "invalid_processing_state", str(exc))

    try:
        processing_override = read_processing_override_filter()
    except ValueError as exc:
        return error_response(400, "invalid_processing_override_filter", str(exc))

    source = read_source_filter()
    filter_conditions, filter_params = build_item_filter_conditions(
        item_type,
        storage,
        source,
        created_from,
        created_to,
        processing_state,
        processing_override,
    )
    where_clause = join_conditions(filter_conditions, "WHERE")

    order_clause = "id DESC" if sort == "newest" else "id ASC"
    offset = (page - 1) * page_size

    conn = get_db_connection()
    try:
        total = conn.execute(
            f"SELECT COUNT(*) AS total FROM items {where_clause}",
            filter_params,
        ).fetchone()["total"]
        rows = conn.execute(
            f"""
            SELECT {ITEM_LIST_SELECT_FIELDS}
            FROM items
            {where_clause}
            ORDER BY {order_clause}
            LIMIT ? OFFSET ?
            """,
            (*filter_params, page_size, offset),
        ).fetchall()
    finally:
        conn.close()

    total_pages = (total + page_size - 1) // page_size
    return ok_response(
        {
            "sort": sort,
            "type": item_type,
            "storage": storage,
            "source": source,
            "created_from": created_from,
            "created_to": created_to,
            "processing_state": processing_state,
            "processing_override": processing_override,
            "page": page,
            "page_size": page_size,
            "total": total,
            "total_pages": total_pages,
            "items": [row_to_item(row) for row in rows],
        }
    )


@app.route("/search", methods=["GET"])
def search_items():
    auth_error = require_key()
    if auth_error:
        return auth_error

    query = request.args.get("q", "").strip()
    if not query:
        return error_response(400, "empty_query", "q 不能为空")

    try:
        page, page_size = read_pagination()
    except ValueError as exc:
        return error_response(400, "invalid_pagination", str(exc))

    sort = request.args.get("sort", "relevance").strip().lower()
    if sort not in {"relevance", "newest", "oldest"}:
        return error_response(400, "invalid_sort", "sort 只能是 relevance、newest 或 oldest")

    try:
        item_type = read_item_type_filter()
    except ValueError as exc:
        return error_response(400, "invalid_type", str(exc))

    try:
        storage = read_storage_filter()
    except ValueError as exc:
        return error_response(400, "invalid_storage", str(exc))

    try:
        created_from, created_to = read_created_range()
    except ValueError as exc:
        return error_response(400, "invalid_created_range", str(exc))

    try:
        processing_state = read_processing_state_filter()
    except ValueError as exc:
        return error_response(400, "invalid_processing_state", str(exc))

    try:
        processing_override = read_processing_override_filter()
    except ValueError as exc:
        return error_response(400, "invalid_processing_override_filter", str(exc))

    source = read_source_filter()
    escaped_query = escape_like(query)
    exact_match = query
    prefix_match = f"{escaped_query}%"
    fuzzy_match = f"%{escaped_query}%"
    offset = (page - 1) * page_size

    if sort == "newest":
        order_clause = "id DESC"
    elif sort == "oldest":
        order_clause = "id ASC"
    else:
        order_clause = "score DESC, id DESC"

    filter_conditions, filter_params = build_item_filter_conditions(
        item_type,
        storage,
        source,
        created_from,
        created_to,
        processing_state,
        processing_override,
    )
    filter_clause = join_conditions(filter_conditions, "AND")

    conn = get_db_connection()
    try:
        total = conn.execute(
            f"""
            SELECT COUNT(*) AS total
            FROM items
            WHERE (
                COALESCE(content, '') LIKE ? ESCAPE '\\'
                OR COALESCE(original_name, '') LIKE ? ESCAPE '\\'
                OR COALESCE(derived_text, '') LIKE ? ESCAPE '\\'
                OR COALESCE(transcript_text, '') LIKE ? ESCAPE '\\'
            )
            {filter_clause}
            """,
            (fuzzy_match, fuzzy_match, fuzzy_match, fuzzy_match, *filter_params),
        ).fetchone()["total"]

        if sort == "relevance":
            rows = conn.execute(
                f"""
                SELECT
                    {ITEM_LIST_SELECT_FIELDS},
                    (
                        CASE
                            WHEN COALESCE(content, '') = ? THEN 100
                            WHEN COALESCE(content, '') LIKE ? ESCAPE '\\' THEN 60
                            WHEN COALESCE(content, '') LIKE ? ESCAPE '\\' THEN 30
                            ELSE 0
                        END
                        +
                        CASE
                            WHEN COALESCE(original_name, '') = ? THEN 90
                            WHEN COALESCE(original_name, '') LIKE ? ESCAPE '\\' THEN 50
                            WHEN COALESCE(original_name, '') LIKE ? ESCAPE '\\' THEN 25
                            ELSE 0
                        END
                        +
                        CASE
                            WHEN COALESCE(derived_text, '') = ? THEN 70
                            WHEN COALESCE(derived_text, '') LIKE ? ESCAPE '\\' THEN 35
                            WHEN COALESCE(derived_text, '') LIKE ? ESCAPE '\\' THEN 15
                            ELSE 0
                        END
                        +
                        CASE
                            WHEN COALESCE(transcript_text, '') = ? THEN 75
                            WHEN COALESCE(transcript_text, '') LIKE ? ESCAPE '\\' THEN 38
                            WHEN COALESCE(transcript_text, '') LIKE ? ESCAPE '\\' THEN 18
                            ELSE 0
                        END
                        +
                        CASE
                            WHEN LENGTH(COALESCE(content, original_name, transcript_text, derived_text, '')) <= 20 THEN 8
                            WHEN LENGTH(COALESCE(content, original_name, transcript_text, derived_text, '')) <= 50 THEN 4
                            ELSE 0
                        END
                    ) AS score
                FROM items
                WHERE (
                    COALESCE(content, '') LIKE ? ESCAPE '\\'
                    OR COALESCE(original_name, '') LIKE ? ESCAPE '\\'
                    OR COALESCE(derived_text, '') LIKE ? ESCAPE '\\'
                    OR COALESCE(transcript_text, '') LIKE ? ESCAPE '\\'
                )
                {filter_clause}
                ORDER BY {order_clause}
                LIMIT ? OFFSET ?
                """,
                (
                    exact_match,
                    prefix_match,
                    fuzzy_match,
                    exact_match,
                    prefix_match,
                    fuzzy_match,
                    exact_match,
                    prefix_match,
                    fuzzy_match,
                    exact_match,
                    prefix_match,
                    fuzzy_match,
                    fuzzy_match,
                    fuzzy_match,
                    fuzzy_match,
                    fuzzy_match,
                    *filter_params,
                    page_size,
                    offset,
                ),
            ).fetchall()
        else:
            rows = conn.execute(
                f"""
                SELECT {ITEM_LIST_SELECT_FIELDS}
                FROM items
                WHERE (
                    COALESCE(content, '') LIKE ? ESCAPE '\\'
                    OR COALESCE(original_name, '') LIKE ? ESCAPE '\\'
                    OR COALESCE(derived_text, '') LIKE ? ESCAPE '\\'
                    OR COALESCE(transcript_text, '') LIKE ? ESCAPE '\\'
                )
                {filter_clause}
                ORDER BY {order_clause}
                LIMIT ? OFFSET ?
                """,
                (fuzzy_match, fuzzy_match, fuzzy_match, fuzzy_match, *filter_params, page_size, offset),
            ).fetchall()
    finally:
        conn.close()

    total_pages = (total + page_size - 1) // page_size
    return ok_response(
        {
            "query": query,
            "sort": sort,
            "type": item_type,
            "storage": storage,
            "source": source,
            "created_from": created_from,
            "created_to": created_to,
            "processing_state": processing_state,
            "processing_override": processing_override,
            "page": page,
            "page_size": page_size,
            "total": total,
            "total_pages": total_pages,
            "items": [row_to_item(row, include_score=(sort == "relevance")) for row in rows],
        }
    )


# ===== 任务路由 =====

TASK_SELECT_FIELDS = """
    id, title, detail, status, priority,
    memory_id, due_date, completed_at, created_at, updated_at
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

    return ok_response({
        "date": today_str,
        "today": [row_to_task(r) for r in today_rows],
        "overdue": [row_to_task(r) for r in overdue_rows],
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
            due_date = str(body.get("due_date", "")).strip() or None
            memory_id = body.get("memory_id")

            if not title:
                return error_response(400, "missing_title", "title 不能为空")
            if priority not in TASK_PRIORITIES:
                return error_response(400, "invalid_priority", f"priority 不支持: {priority}")

            now = utc_now().isoformat(timespec="seconds")
            cursor = conn.execute(
                "INSERT INTO tasks (title, detail, status, priority, memory_id, due_date, created_at, updated_at) VALUES (?, ?, 'todo', ?, ?, ?, ?, ?)",
                (title, detail, priority, memory_id, due_date, now, now),
            )
            conn.commit()
            task_id = cursor.lastrowid
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


@app.route("/tasks/<int:task_id>/cancel", methods=["POST"])
def task_cancel(task_id: int):
    auth_error = require_key()
    if auth_error:
        return auth_error
    err, row = _set_task_status(task_id, "cancelled")
    if err:
        return err
    return ok_response({"task": row_to_task(row)})


# ===== 记忆路由 =====


def row_to_memory(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "category": row["category"],
        "category_label": MEMORY_CATEGORY_LABELS.get(row["category"], row["category"]),
        "content": row["content"],
        "detail": row["detail"],
        "status": row["status"],
        "status_label": MEMORY_STATUS_LABELS.get(row["status"], row["status"]),
        "source_item_id": row["source_item_id"],
        "source_text": row["source_text"],
        "created_at": row["created_at"],
        "updated_at": row["updated_at"],
    }


def read_memory_filter_args() -> dict:
    category = request.args.get("category", "").strip()
    status = request.args.get("status", "").strip()
    page = parse_positive_int(request.args.get("page"), "page", 1)
    page_size = parse_positive_int(request.args.get("page_size"), "page_size", DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE)
    return {"category": category, "status": status, "page": page, "page_size": page_size}


def build_memory_filter_conditions(category: str, status: str) -> tuple[list[str], list]:
    conditions: list[str] = []
    params: list = []
    if category:
        if category not in MEMORY_CATEGORIES:
            raise ValueError(f"category 不支持: {category}")
        conditions.append("category = ?")
        params.append(category)
    if status:
        if status not in MEMORY_STATUSES:
            raise ValueError(f"status 不支持: {status}")
        conditions.append("status = ?")
        params.append(status)
    return conditions, params


@app.route("/memories/stats", methods=["GET"])
def memory_stats():
    auth_error = require_key()
    if auth_error:
        return auth_error

    conn = get_db_connection()
    try:
        total = conn.execute("SELECT COUNT(*) FROM memories").fetchone()[0]
        category_rows = conn.execute(
            "SELECT category, status, COUNT(*) AS count FROM memories GROUP BY category, status ORDER BY category, status"
        ).fetchall()
    finally:
        conn.close()

    by_category: dict[str, dict] = {}
    for row in category_rows:
        entry = by_category.setdefault(row["category"], {"total": 0, "confirmed": 0, "candidate": 0, "archived": 0})
        entry[row["status"]] = row["count"]
        entry["total"] += row["count"]

    return ok_response({
        "total": total,
        "by_category": {
            cat: {
                "label": MEMORY_CATEGORY_LABELS.get(cat, cat),
                **counts,
            }
            for cat, counts in by_category.items()
        },
    })


@app.route("/memories", methods=["GET", "POST"])
def memories():
    auth_error = require_key()
    if auth_error:
        return auth_error

    conn = get_db_connection()
    try:
        if request.method == "POST":
            body = request.get_json(silent=True) or {}
            category = str(body.get("category", "fact")).strip()
            content = str(body.get("content", "")).strip()
            detail = str(body.get("detail", "")).strip() or None
            source_item_id = body.get("source_item_id")
            source_text = str(body.get("source_text", "")).strip() or None

            if category not in MEMORY_CATEGORIES:
                return error_response(400, "invalid_category", f"category 不支持: {category}")
            if not content:
                return error_response(400, "missing_content", "content 不能为空")

            now = utc_now().isoformat(timespec="seconds")
            cursor = conn.execute(
                "INSERT INTO memories (category, content, detail, status, source_item_id, source_text, created_at, updated_at) VALUES (?, ?, ?, 'candidate', ?, ?, ?, ?)",
                (category, content, detail, source_item_id, source_text, now, now),
            )
            conn.commit()
            memory_id = cursor.lastrowid
            row = conn.execute(f"SELECT {MEMORY_SELECT_FIELDS} FROM memories WHERE id = ?", (memory_id,)).fetchone()
            return ok_response({"memory": row_to_memory(row)}, 201)

        filters = read_memory_filter_args()
        conditions, params = build_memory_filter_conditions(filters["category"], filters["status"])
        where_clause = ("WHERE " + " AND ".join(conditions)) if conditions else ""
        count_row = conn.execute(f"SELECT COUNT(*) FROM memories {where_clause}", params).fetchone()
        total = count_row[0]
        total_pages = max(1, (total + filters["page_size"] - 1) // filters["page_size"])
        offset = (filters["page"] - 1) * filters["page_size"]
        rows = conn.execute(
            f"SELECT {MEMORY_SELECT_FIELDS} FROM memories {where_clause} ORDER BY created_at DESC LIMIT ? OFFSET ?",
            params + [filters["page_size"], offset],
        ).fetchall()

        return ok_response({
            "page": filters["page"],
            "page_size": filters["page_size"],
            "total": total,
            "total_pages": total_pages,
            "memories": [row_to_memory(row) for row in rows],
        })
    except ValueError as exc:
        return error_response(400, "invalid_filter", str(exc))
    finally:
        conn.close()


@app.route("/memories/<int:memory_id>", methods=["GET", "PUT", "DELETE"])
def memory_detail(memory_id: int):
    auth_error = require_key()
    if auth_error:
        return auth_error

    conn = get_db_connection()
    try:
        row = conn.execute(f"SELECT {MEMORY_SELECT_FIELDS} FROM memories WHERE id = ?", (memory_id,)).fetchone()
        if row is None:
            return error_response(404, "not_found", "记忆不存在")

        if request.method == "GET":
            return ok_response({"memory": row_to_memory(row)})

        if request.method == "DELETE":
            conn.execute("DELETE FROM memories WHERE id = ?", (memory_id,))
            conn.commit()
            return ok_response({"deleted": memory_id})

        body = request.get_json(silent=True) or {}
        category = str(body.get("category", row["category"])).strip()
        content = str(body.get("content", row["content"])).strip()
        detail = str(body.get("detail", row["detail"] or "")).strip() or None
        status = str(body.get("status", row["status"])).strip()

        if category not in MEMORY_CATEGORIES:
            return error_response(400, "invalid_category", f"category 不支持: {category}")
        if not content:
            return error_response(400, "missing_content", "content 不能为空")
        if status not in MEMORY_STATUSES:
            return error_response(400, "invalid_status", f"status 不支持: {status}")

        now = utc_now().isoformat(timespec="seconds")
        conn.execute(
            "UPDATE memories SET category = ?, content = ?, detail = ?, status = ?, updated_at = ? WHERE id = ?",
            (category, content, detail, status, now, memory_id),
        )
        conn.commit()
        row = conn.execute(f"SELECT {MEMORY_SELECT_FIELDS} FROM memories WHERE id = ?", (memory_id,)).fetchone()
        return ok_response({"memory": row_to_memory(row)})
    except ValueError as exc:
        return error_response(400, "invalid_input", str(exc))
    finally:
        conn.close()


@app.route("/memories/<int:memory_id>/confirm", methods=["POST"])
def confirm_memory(memory_id: int):
    auth_error = require_key()
    if auth_error:
        return auth_error

    conn = get_db_connection()
    try:
        row = conn.execute("SELECT id FROM memories WHERE id = ?", (memory_id,)).fetchone()
        if row is None:
            return error_response(404, "not_found", "记忆不存在")
        now = utc_now().isoformat(timespec="seconds")
        conn.execute("UPDATE memories SET status = 'confirmed', updated_at = ? WHERE id = ?", (now, memory_id))
        conn.commit()
        row = conn.execute(f"SELECT {MEMORY_SELECT_FIELDS} FROM memories WHERE id = ?", (memory_id,)).fetchone()
        return ok_response({"memory": row_to_memory(row)})
    finally:
        conn.close()


@app.route("/memories/<int:memory_id>/archive", methods=["POST"])
def archive_memory(memory_id: int):
    auth_error = require_key()
    if auth_error:
        return auth_error

    conn = get_db_connection()
    try:
        row = conn.execute("SELECT id FROM memories WHERE id = ?", (memory_id,)).fetchone()
        if row is None:
            return error_response(404, "not_found", "记忆不存在")
        now = utc_now().isoformat(timespec="seconds")
        conn.execute("UPDATE memories SET status = 'archived', updated_at = ? WHERE id = ?", (now, memory_id))
        conn.commit()
        row = conn.execute(f"SELECT {MEMORY_SELECT_FIELDS} FROM memories WHERE id = ?", (memory_id,)).fetchone()
        return ok_response({"memory": row_to_memory(row)})
    finally:
        conn.close()


# ===== 错误处理 =====
@app.errorhandler(HTTPException)
def handle_http_exception(exc: HTTPException):
    code = exc.code or 500
    return error_response(code, exc.name.lower().replace(" ", "_"), exc.description)


@app.errorhandler(Exception)
def handle_unexpected_exception(exc: Exception):
    logger.exception("unexpected error: %s", exc)
    return error_response(500, "internal_error", "服务内部错误")


init_app_storage()

# ===== 模块加载 =====
AXIOM_MODULES: list = []


def init_modules(app):
    global AXIOM_MODULES, AUTOMATION_JOBS
    from modules.registry import discover_modules, get_module_dir
    from modules.prompt_loader import PromptLoader

    prompt_loader = PromptLoader()

    for mod in discover_modules():
        AXIOM_MODULES.append(mod)

        for table_name, create_sql in mod.get_db_tables().items():
            conn = get_db_connection()
            try:
                conn.execute(create_sql)
                conn.commit()
            finally:
                conn.close()

        bp = mod.get_blueprint()
        if bp:
            app.register_blueprint(bp)

        jobs = mod.get_automation_jobs()
        if jobs:
            AUTOMATION_JOBS.update(jobs)

        mod_dir = get_module_dir(mod.name)
        if mod_dir:
            prompt_loader.register_module(mod_dir)

        logger.info("Module loaded: %s (%s)", mod.name, mod.label)

    app.config["AXIOM_PROMPT_LOADER"] = prompt_loader


@app.route("/modules", methods=["GET"])
def list_modules():
    return ok_response({
        "modules": [
            {
                "name": m.name,
                "label": m.label,
                "description": m.description,
                "nav_item": m.get_nav_item(),
                **m.get_frontend_metadata(),
            }
            for m in AXIOM_MODULES
        ]
    })


if __name__ == "__main__":
    host = os.environ.get("AXIOM_HOST", "0.0.0.0")
    port = int(os.environ.get("AXIOM_PORT", "5000"))
    app.run(host=host, port=port)
