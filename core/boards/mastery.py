"""Learning Board v0.1 — 概念掌握度保守证据模型。

v0.1 采用简单加权移动平均，不做 IRT/BKT 等复杂模型。
"""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Any


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


# These are product heuristics, not calibrated probabilities of mastery.
# Confidence and elapsed time remain useful diagnostics, but are not knowledge
# evidence. In particular they must never reward a confident, fast wrong answer.
ASSISTED_CORRECT_EVIDENCE = 0.5


def compute_evidence_score(event_type: str, payload: dict[str, Any]) -> float | None:
    """从作答结果与辅助情况计算证据；未知/未作答返回 None。"""
    if event_type != "answer_submitted":
        return None

    correct = payload.get("correct")
    if not isinstance(correct, bool):
        # Missing/unknown correctness (including a skipped question) is not a
        # graded attempt. Do not infer correctness from engagement metadata.
        return None
    if not correct:
        return 0.0

    attempt = payload.get("attempt_index")
    hint_used = payload.get("hint_used")
    # Unknown assistance metadata cannot establish an independent first answer.
    independent = (
        type(attempt) is int and attempt == 1 and hint_used is False
        and not payload.get("answer_revealed", False)
    )
    return 1.0 if independent else ASSISTED_CORRECT_EVIDENCE


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
