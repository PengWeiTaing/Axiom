"""Axiom app object, paths, constants, and automation job definitions."""
from __future__ import annotations

import os
import re
from pathlib import Path

from flask import Flask

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False

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
        WHEN items.processing_override = 'ready' THEN 'ready'
        WHEN items.type = 'document' THEN
            CASE
                WHEN COALESCE(TRIM(items.derived_text), '') != '' THEN 'ready'
                ELSE 'pending'
            END
        WHEN items.type = 'audio' THEN
            CASE
                WHEN COALESCE(TRIM(items.transcript_text), '') != '' THEN 'ready'
                ELSE 'pending'
            END
        WHEN items.type = 'image' THEN
            CASE
                WHEN COALESCE(TRIM(items.content), '') != '' AND COALESCE(TRIM(items.content), '') != COALESCE(TRIM(items.original_name), '') THEN 'ready'
                ELSE 'pending'
            END
        ELSE
            CASE
                WHEN COALESCE(TRIM(items.content), '') != '' THEN 'ready'
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
ITEM_JOIN_SELECT_FIELDS = f"""
    items.id,
    items.type,
    items.content,
    items.file_path,
    items.source,
    items.created_at,
    items.original_name,
    items.mime_type,
    items.size_bytes,
    items.processing_override,
    CASE
        WHEN COALESCE(TRIM(items.derived_text), '') != '' THEN SUBSTR(items.derived_text, 1, 600)
        ELSE NULL
    END AS derived_text_preview,
    CASE
        WHEN COALESCE(TRIM(items.transcript_text), '') != '' THEN SUBSTR(items.transcript_text, 1, 600)
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
    "cosmos",
    "system-status",
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
DEEPSEEK_API_KEY = os.environ.get("AXIOM_DEEPSEEK_API_KEY", "")
DEEPSEEK_MODEL = os.environ.get("AXIOM_DEEPSEEK_MODEL", "deepseek-chat")
DEEPSEEK_BASE_URL = os.environ.get("AXIOM_DEEPSEEK_BASE_URL", "https://api.deepseek.com")
SUGGESTIONS_CACHE: dict = {"text": "", "generated_at": "", "ttl_seconds": 300}
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
    "cosmos_assoc_generate": {
        "label": "生成 Cosmos 关联",
        "description": "扫描已挂载 lifeline 的 entity，规则初筛 + LLM 判定关联类型，写入 associations 表。",
        "script_name": "generate_cosmos_associations.py",
        "artifact_group": "cosmos",
        "artifact_window": None,
        "artifact_mode": None,
        "build_args": lambda run_date: [],
        "manual_enabled": True,
        "requires_openai": False,
        "timeout_seconds": 180,
    },
    "system_status_day": {
        "label": "生成系统状态快照",
        "description": "汇总 /health、/system、/stats、/metrics、一致性检查和 backlog，生成每日运行状态报告。",
        "script_name": "build_system_status.py",
        "artifact_group": "system-status",
        "artifact_window": None,
        "artifact_mode": None,
        "build_args": lambda run_date: ["--date", run_date, "--force"],
        "manual_enabled": True,
        "requires_openai": False,
        "timeout_seconds": 60,
    },
}

LOG_FORMAT = os.environ.get("AXIOM_LOG_FORMAT", "text")
