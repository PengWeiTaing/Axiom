"""Axiom shared constants, utilities, and helpers.

架构说明:
  1. 基础配置:       core/config.py
  2. 数据库与 FTS:   core/database.py
  3. 搜索查询工具:   core/search.py
  4. URL 抓取:       core/fetch.py
  5. 自动化产物:     core/artifacts.py
  6. 自动化执行:     core/automation_core.py
  7. 文本抽取:       core/text_extract.py
  8. 审计/清理:      core/audit.py
  9. 向量搜索:       core/vector_search.py
 10. Items:          core/items.py
 11. 系统状态:       core/system_state.py
 12. HTTP 工具:      core/http_utils.py
 13. 本文件暂保留:   Flask app、日志初始化和兼容导出
"""
from __future__ import annotations

import json
import logging
import os
import re
import sqlite3
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from uuid import uuid4

from flask import Flask, Response, jsonify, render_template, request, send_file
from werkzeug.exceptions import HTTPException

from core.artifacts import (
    artifact_matches_filters,
    artifact_sort_key,
    build_artifact_counts,
    build_artifact_file_url,
    build_artifact_latest_summary,
    build_artifact_payload,
    build_artifact_summary_from_path,
    build_artifact_summary_payload,
    extract_markdown_preview,
    list_review_artifacts,
    resolve_review_artifact_path,
    select_latest_artifact,
)
from core.automation_core import (
    acquire_automation_lock,
    build_automation_command,
    build_automation_job_payload,
    build_automation_job_runtime_payload,
    complete_skipped_automation_run,
    create_automation_run,
    decode_tail_lines,
    derive_automation_message,
    encode_tail_lines,
    execute_logged_automation_job,
    fetch_automation_run_rows,
    finalize_automation_run,
    get_automation_run_by_id,
    iter_automation_job_items,
    release_automation_lock,
    row_to_automation_run,
    run_automation_job,
    select_latest_artifact_for_job,
    tail_output_lines,
)
from core.config import (
    app,
    ARCHIVE_PATH,
    ARTIFACT_GROUPS,
    ARTIFACT_MODES,
    ARTIFACT_WINDOWS,
    AUDIO_EXTENSIONS,
    AUTOMATION_AUDIO_TRANSCRIBE_TIMEOUT_SECONDS,
    AUTOMATION_IMAGE_DESCRIBE_TIMEOUT_SECONDS,
    AUTOMATION_JOBS,
    AUTOMATION_LOCK_PATH,
    AUTOMATION_RUN_STATUSES,
    AUTOMATION_TIMEOUT_SECONDS,
    AXIOM_ROOT,
    DB_PATH,
    DEEPSEEK_API_KEY,
    DEEPSEEK_BASE_URL,
    DEEPSEEK_MODEL,
    DEFAULT_PAGE,
    DEFAULT_PAGE_SIZE,
    DEFAULT_SOURCE,
    DOCX_NAMESPACE,
    DOCUMENT_EXTENSIONS,
    DOCUMENT_MIME_TYPES,
    IMAGE_EXTENSIONS,
    INBOX_PATH,
    ITEM_BASE_SELECT_FIELDS,
    ITEM_DETAIL_SELECT_FIELDS,
    ITEM_JOIN_SELECT_FIELDS,
    ITEM_LIST_SELECT_FIELDS,
    ITEM_PROCESSING_LABELS,
    ITEM_PROCESSING_OVERRIDE_LABELS,
    ITEM_PROCESSING_OVERRIDES,
    ITEM_PROCESSING_STATE_SQL,
    ITEM_PROCESSING_STATES,
    ITEM_TEXT_SOURCE_LABELS,
    ITEM_TEXT_SOURCE_SQL,
    ITEM_TEXT_SOURCES,
    ITEM_TYPE_AUDIO,
    ITEM_TYPE_DOCUMENT,
    ITEM_TYPE_IMAGE,
    ITEM_TYPE_TEXT,
    ITEM_TYPES,
    LOCAL_UTC_OFFSET,
    LOG_FORMAT,
    LOG_PATH,
    MAX_PAGE_SIZE,
    MAX_UPLOAD_BYTES,
    MEMORY_CATEGORIES,
    MEMORY_CATEGORY_LABELS,
    MEMORY_STATUSES,
    MEMORY_STATUS_LABELS,
    MIME_TYPE_EXTENSION_MAP,
    PROJECT_ROOT,
    REVIEWS_PATH,
    SECRET_KEY,
    STORAGE_AREAS,
    SUGGESTIONS_CACHE,
    TASK_PRIORITIES,
    TASK_PRIORITY_LABELS,
    TASK_STATUSES,
    TASK_STATUS_LABELS,
    TRANSCRIPT_EXTENSIONS,
    TRANSCRIPT_TAG_PATTERN,
    TRANSCRIPT_TEXT_ENCODINGS,
    TRANSCRIPT_TIMESTAMP_PATTERN,
    UPLOAD_TYPE_LABELS,
)
from core.database import (
    cjk_tokenize,
    ensure_decisions_lifeline_id,
    ensure_items_lifeline_id,
    ensure_items_table_columns,
    ensure_items_table_columns_v2,
    ensure_memories_lifeline_id,
    ensure_storage_dirs,
    ensure_tasks_lifeline_id,
    ensure_tasks_table_columns,
    fts_backfill,
    fts_delete_item,
    fts_sync_item,
    get_db_connection,
    has_cjk,
    init_app_storage,
    init_db,
)
from core.http_utils import (
    check_key,
    current_local_date_iso,
    error_response,
    get_request_body_data,
    get_request_field,
    get_request_key,
    normalize_item_id_list,
    normalize_processing_override,
    ok_response,
    parse_date_filter,
    parse_datetime_filter,
    parse_positive_int,
    parse_utc_offset_value,
    read_artifact_date_range,
    read_artifact_group_filter,
    read_artifact_mode_filter,
    read_artifact_window_filter,
    read_automation_job_filter,
    read_automation_status_filter,
    read_created_range,
    read_group_limit,
    read_item_type_filter,
    read_optional_body_field,
    read_optional_run_date,
    read_pagination,
    read_preview_chars,
    read_processing_override_filter,
    read_processing_state_filter,
    read_recent_limit,
    read_source_filter,
    read_storage_filter,
    require_key,
    resolve_run_date_value,
)
from core.search import escape_fts_query, escape_like
from core.audit import cleanup_file, write_audit_log
from core.items import (
    build_archive_file_path,
    build_binary_file_path,
    build_download_name,
    build_file_url,
    build_inbox_file_path,
    build_item_filter_conditions,
    build_item_payload,
    build_restore_file_path,
    build_text_file_path,
    build_unique_file_path,
    build_upload_error_message,
    compute_file_sha256,
    describe_primary_text_source,
    describe_processing_note,
    describe_processing_state,
    detect_upload_item_type,
    format_allowed_extensions,
    get_file_extension,
    get_item_by_id,
    get_item_primary_text,
    get_items_by_ids,
    get_storage_area,
    get_type_label,
    insert_item,
    insert_text_item,
    is_path_under,
    join_conditions,
    local_date_now,
    normalize_mime_type,
    normalize_original_name,
    parse_uploaded_file,
    read_upload_content,
    row_to_item,
    strip_item_text,
    update_item_content_source_text_fields,
    update_item_file_path,
    update_items_processing_override,
    utc_now,
    write_binary_file_atomic,
    write_text_file_atomic,
)
from core.system_state import (
    build_overview_payload,
    build_overview_text,
    build_processing_backlog_payload,
    build_stats_payload,
    compute_streak,
    count_storage_areas,
    ensure_migration,
    fetch_next_pending_item_row,
    fetch_pending_item_rows,
    fetch_recent_item_rows,
    get_preference,
    get_processing_backlog_description,
    get_processing_backlog_title,
    learn_user_patterns,
    resolve_stored_file_path,
    rows_to_count_map,
    set_preference,
    summarize_text,
)
from core.text_extract import (
    build_audio_transcript_sidecar_candidates,
    decode_text_file_bytes,
    extract_audio_transcript_text_from_bytes,
    extract_audio_transcript_text_from_file,
    extract_audio_transcript_text_from_upload,
    extract_document_text,
    extract_docx_text,
    extract_pdf_text,
    normalize_audio_transcript_text,
    normalize_extracted_text,
)
from core.vector_search import (
    EMBEDDING_API_KEY,
    EMBEDDING_API_URL,
    EMBEDDING_MODEL,
    delete_embedding,
    generate_embedding,
    rebuild_all_vectors,
    store_embedding,
    vector_search,
)

class JsonFormatter(logging.Formatter):
    def format(self, record):
        import json as _json
        return _json.dumps({
            "time": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }, ensure_ascii=False)


def configure_logging() -> None:
    log_level = os.environ.get("AXIOM_LOG_LEVEL", "INFO").upper()
    handlers: list[logging.Handler] = [logging.StreamHandler()]

    if LOG_PATH:
        log_path = Path(LOG_PATH).expanduser().resolve()
        log_path.parent.mkdir(parents=True, exist_ok=True)
        handlers.append(logging.FileHandler(log_path, encoding="utf-8"))

    if LOG_FORMAT == "json":
        formatter = JsonFormatter()
        for h in handlers:
            h.setFormatter(formatter)
        logging.basicConfig(level=log_level, handlers=handlers)
    else:
        log_format = "%(asctime)s %(levelname)s [%(name)s] %(message)s"
        logging.basicConfig(level=log_level, format=log_format, handlers=handlers)


configure_logging()
logger = logging.getLogger("axiom.receiver")


# ===== URL 内容抓取 =====
from core.fetch import fetch_url_content


