"""HTTP response, auth, request parsing, and filter helpers."""
from __future__ import annotations

import hmac
import logging
import re
from datetime import date, datetime, timedelta, timezone

from flask import jsonify, request

from core.config import (
    ARTIFACT_GROUPS,
    ARTIFACT_MODES,
    ARTIFACT_WINDOWS,
    AUTOMATION_RUN_STATUSES,
    DEFAULT_PAGE,
    DEFAULT_PAGE_SIZE,
    ITEM_PROCESSING_OVERRIDES,
    ITEM_PROCESSING_STATES,
    ITEM_TYPES,
    LOCAL_UTC_OFFSET,
    MAX_PAGE_SIZE,
    SECRET_KEY,
    STORAGE_AREAS,
)

logger = logging.getLogger("axiom.receiver")


def ok_response(payload: dict | None = None, status: int = 200):
    body = {"ok": True}
    if payload:
        body.update(payload)
    return jsonify(body), status


def error_response(status: int, code: str, message: str):
    return jsonify({"ok": False, "error": {"code": code, "message": message}}), status


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
        raise ValueError("ids 必须是数组")
    if not raw_ids:
        raise ValueError("ids 不能为空")

    normalized_ids: list[int] = []
    seen_ids: set[int] = set()
    for index, raw_item_id in enumerate(raw_ids):
        item_id = parse_positive_int(raw_item_id, f"ids[{index}]", 1)
        if item_id in seen_ids:
            continue
        seen_ids.add(item_id)
        normalized_ids.append(item_id)

    if len(normalized_ids) > 20:
        raise ValueError("一次最多只能批量处理 20 条记录")

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
