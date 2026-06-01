"""Search query helpers."""
from __future__ import annotations

import re

from core.database import cjk_tokenize


def escape_like(value: str) -> str:
    return value.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")


def escape_fts_query(query: str) -> str:
    """构建 FTS5 查询字符串，对 CJK 做字符级分词。"""
    tokenized = cjk_tokenize(query) or ""
    cleaned = re.sub(
        r"[^\w\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u3040-\u30FF]+",
        " ",
        tokenized,
    )
    terms = cleaned.split()
    if not terms:
        return '""'
    return " AND ".join(f'"{term}"' for term in terms)
