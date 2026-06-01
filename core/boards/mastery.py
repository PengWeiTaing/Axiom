"""Learning Board v0.1 — 概念掌握度加权证据模型。

v0.1 采用简单加权移动平均，不做 IRT/BKT 等复杂模型。
"""
from __future__ import annotations

import json
from datetime import datetime, timedelta, timezone
from typing import Any


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


# 证据权重配置
EVIDENCE_WEIGHTS = {
    "correctness": 0.40,
    "first_try": 0.20,
    "hint_used": -0.15,
    "latency_penalty": 0.10,
    "confidence": 0.15,
    "explanation_quality": 0.00,  # v0.1 未启用
}


def compute_evidence_score(event_type: str, payload: dict[str, Any]) -> float | None:
    """从 widget 事件计算单条证据分数。返回 None 表示该事件不影响 mastery。"""
    if event_type != "answer_submitted":
        return None

    score = 0.0
    total_weight = 0.0

    correct = payload.get("correct")
    if isinstance(correct, bool):
        score += (1.0 if correct else 0.0) * EVIDENCE_WEIGHTS["correctness"]
        total_weight += EVIDENCE_WEIGHTS["correctness"]

    attempt = payload.get("attempt_index", 0)
    if isinstance(attempt, (int, float)):
        first_try_bonus = 1.0 if attempt <= 1 else max(0.0, 1.0 - (attempt - 1) * 0.3)
        score += first_try_bonus * EVIDENCE_WEIGHTS["first_try"]
        total_weight += EVIDENCE_WEIGHTS["first_try"]

    hint_used = payload.get("hint_used", False)
    if hint_used:
        score += EVIDENCE_WEIGHTS["hint_used"]
    total_weight += abs(EVIDENCE_WEIGHTS["hint_used"])

    latency_ms = payload.get("latency_ms")
    if isinstance(latency_ms, (int, float)):
        if latency_ms < 5000:
            latency_bonus = 1.0
        elif latency_ms < 30000:
            latency_bonus = 0.6
        else:
            latency_bonus = 0.2
        score += latency_bonus * EVIDENCE_WEIGHTS["latency_penalty"]
        total_weight += EVIDENCE_WEIGHTS["latency_penalty"]

    confidence = payload.get("confidence")
    if isinstance(confidence, (int, float)) and 0 <= confidence <= 1:
        score += confidence * EVIDENCE_WEIGHTS["confidence"]
        total_weight += EVIDENCE_WEIGHTS["confidence"]

    if total_weight == 0:
        return None
    return max(0.0, min(1.0, score / total_weight))


# mastery 移动平均衰减因子
MASTERY_SMOOTHING = 0.3


def compute_mastery_delta(
    old_score: float,
    evidence_score: float,
) -> dict[str, Any]:
    """计算掌握度更新。"""
    new_score = round(old_score * (1 - MASTERY_SMOOTHING) + evidence_score * MASTERY_SMOOTHING, 4)
    return {
        "old_score": round(old_score, 4),
        "new_score": new_score,
        "delta": round(new_score - old_score, 4),
    }


def mastery_bucket(score: float) -> str:
    """掌握度分桶。"""
    if score < 0.35:
        return "weak"
    if score < 0.65:
        return "developing"
    if score < 0.85:
        return "proficient"
    return "mastered"
