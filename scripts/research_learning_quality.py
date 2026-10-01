"""Offline counterexamples for the learning-board research audit.

This is a diagnostic probe, not a population estimate or a passing regression
suite. It calls existing pure validators/scorers, never a model, API, or database.
Use --output to save the observations; without it the report goes to stdout.
"""
from __future__ import annotations

import argparse
from copy import deepcopy
from datetime import datetime, timezone
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from core.boards.knowledge_scene_fixtures import choose_offline_fixture
from core.boards.knowledge_scene_quality import audit_scene_quality
from core.boards.knowledge_scene_spec import normalize_scene_spec
from core.boards.mastery import (
    compute_evidence_score,
    compute_mastery_delta,
    mastery_bucket,
)
from benchmark_knowledge_scene import (
    evaluate_correctness_item,
    load_catalog,
    normalize_text,
    text_scopes,
)


def fixture(selector: str, goal: str) -> dict:
    candidate = choose_offline_fixture(selector)
    if candidate is None:
        raise ValueError(f"No fixture: {selector}")
    candidate["learning_goal"] = goal
    return candidate


def scene_probe(probe_id: str, candidate: dict, goal: str, *, expected: str,
                mutation: str = "none") -> dict:
    # Strict structural validation is performed before the semantic quality gate.
    normalized = normalize_scene_spec(candidate, goal, drop_invalid_demonstrations=False)
    quality = audit_scene_quality(normalized, goal=goal)
    return {
        "id": probe_id,
        "goal": goal,
        "mutation": mutation,
        "expected_behavior": expected,
        "schema_accepted": True,
        "quality_passed": quality["passed"],
        "quality_score": quality["score"],
        "fatal_codes": [issue["code"] for issue in quality["fatal_issues"]],
        "warning_codes": [issue["code"] for issue in quality["warnings"]],
        "quality_version": quality["version"],
    }


def run_probes() -> dict:
    newton_goal = "解释牛顿第二定律"
    newton = fixture(newton_goal, newton_goal)
    contradiction = deepcopy(newton)
    false_claim = "根据牛顿第二定律，在合外力保持不变时，质量越大，加速度也越大。"
    contradiction["sections"][-1]["blocks"].append({
        "kind": "paragraph", "text": false_claim,
    })

    derivative_goal = "观察导数和圆周角"
    derivative = fixture("极限显微镜与圆周角约束几何", derivative_goal)
    wrong_prediction = deepcopy(derivative)
    prediction = next(
        demo["prediction"] for demo in wrong_prediction["demonstrations"]
        if demo["kind"] == "limit_microscope"
    )
    assert prediction["answer_id"] == "toward-two"
    prediction["answer_id"] = "toward-zero"

    scenes = [
        scene_probe("newton_control", newton, newton_goal, expected="accept"),
        scene_probe(
            "frontend_default_contract_suffix", newton,
            newton_goal + "；重点：核心对象之间的变化、因果或约束；方式：先看直观关系，再连接关键文字或公式；学完：能用自己的话解释核心关系",
            expected="do_not_confuse_presentation_instructions_with_topic",
            mutation="Mirrors the current buildLearningContract default suffix for this input; the scene is unchanged.",
        ),
        scene_probe(
            "contradictory_physics_claim", contradiction, newton_goal,
            expected="reject_or_flag_subject_contradiction", mutation=false_claim,
        ),
        scene_probe(
            "everyday_paraphrase", newton,
            "同样用力推小车，为什么装满货后更难提速",
            expected="recognize_relevant_mechanism_or_explain_context_gap",
            mutation="Only the request wording changes; scene remains the Newton fixture.",
        ),
        scene_probe("prediction_control", derivative, derivative_goal, expected="accept"),
        scene_probe(
            "wrong_derivative_prediction", wrong_prediction, derivative_goal,
            expected="reject_or_flag_prediction_answer_mismatch",
            mutation="x^2 derivative at x0=1: answer_id toward-two -> toward-zero; explanation remains 2+h -> 2.",
        ),
    ]

    payloads = {
        "wrong_fast_confident": {
            "correct": False, "attempt_index": 1, "hint_used": False,
            "latency_ms": 1000, "confidence": 1.0,
        },
        "wrong_fast_uncertain": {
            "correct": False, "attempt_index": 1, "hint_used": False,
            "latency_ms": 1000, "confidence": 0.0,
        },
        "correct_slow_third_try_with_hint": {
            "correct": True, "attempt_index": 3, "hint_used": True,
            "latency_ms": 45000, "confidence": 0.0,
        },
        "correct_first_try": {
            "correct": True, "attempt_index": 1, "hint_used": False,
            "latency_ms": 10000, "confidence": 0.5,
        },
    }
    mastery = []
    for probe_id, payload in payloads.items():
        evidence = compute_evidence_score("answer_submitted", payload)
        assert evidence is not None
        mastery.append({
            "id": probe_id, "payload": payload,
            "evidence_score": round(evidence, 6),
            "update_from_zero": compute_mastery_delta(0, evidence),
        })
    wrong_evidence = compute_evidence_score("answer_submitted", payloads["wrong_fast_confident"])
    trajectory = []
    score = 0.0
    for index in range(1, 11):
        score = compute_mastery_delta(score, wrong_evidence)["new_score"]
        trajectory.append({"independent_question": index, "score": score, "bucket": mastery_bucket(score)})

    catalog = load_catalog()
    integral_case = next(case for case in catalog["cases"] if case["id"] == "M02")
    integral_item = next(item for item in integral_case["correctness"] if item["id"] == "integral-value")
    oracle = []
    for probe_id, statement, expected in (
        ("oracle_control", "定积分的积分值为 2。", True),
        ("oracle_wrong_value_control", "定积分的积分值为 5。", False),
        ("oracle_disavowed_answer", "有人误以为积分值为 2，这个结论是错误的；本题正确的积分值为 5。", False),
    ):
        accepted, _ = evaluate_correctness_item(integral_item, normalize_text(statement), text_scopes(statement))
        oracle.append({
            "id": probe_id, "statement": statement,
            "expected_accepted": expected, "actual_accepted": accepted,
            "scope": "M02 integral-value item only, not the full benchmark",
        })

    controls_passed = all(
        probe["quality_passed"] for probe in scenes if probe["id"].endswith("_control")
    ) and all(
        probe["actual_accepted"] == probe["expected_accepted"]
        for probe in oracle if probe["id"].endswith("_control")
    )
    return {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "mode": "offline_diagnostic_counterexamples",
        "network_requests": 0,
        "probe_modifies_production_files": False,
        "controls_passed": controls_passed,
        "interpretation": "Hand-picked counterexamples reveal possible gaps; they do not estimate live error rates or learning effects. Exit 0 only validates controls.",
        "scene_probes": scenes,
        "mastery_probes": mastery,
        "wrong_first_attempts_on_ten_independent_questions": trajectory,
        "review_caveat": "writeback.py still schedules an explicit wrong answer for next-day review; this probe does not claim that safety path is absent.",
        "oracle_probes": oracle,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    report = run_probes()
    rendered = json.dumps(report, ensure_ascii=False, indent=2)
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(rendered + "\n", encoding="utf-8")
        print(f"REPORT: {args.output}")
    else:
        print(rendered)
    return 0 if report["controls_passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
