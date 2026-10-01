"""Offline regressions for learning evidence and the 1.8 consistency checks."""
from __future__ import annotations

from copy import deepcopy
from itertools import product
from pathlib import Path
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from core.boards.knowledge_claims import polynomial_derivative, scalar_value
from core.boards.knowledge_scene_fixtures import choose_offline_fixture
from core.boards.knowledge_scene_quality import (
    audit_derivative_prediction, audit_scene_quality, newton_trend_contradictions,
)
from core.boards.knowledge_scene_spec import normalize_scene_spec
from core.boards.knowledge_scene import CozeWorkflowError, _build_structured_manifest
from core.boards.mastery import compute_evidence_score, compute_mastery_delta, mastery_bucket
from benchmark_knowledge_scene import evaluate_correctness_item, load_catalog, normalize_text, text_scopes


class LearningIntegrityTests(unittest.TestCase):
    def test_wrong_answers_never_gain_evidence(self):
        for confidence, latency, attempt, hint in product((0, 0.5, 1), (1, 5000, 60000), (1, 2, 9), (False, True)):
            payload = dict(correct=False, confidence=confidence, latency_ms=latency, attempt_index=attempt, hint_used=hint)
            score = compute_evidence_score("answer_submitted", payload)
            self.assertEqual(score, 0)
            for old in (0, 0.2, 0.8, 1):
                self.assertLessEqual(compute_mastery_delta(old, score)["new_score"], old)

    def test_time_and_confidence_do_not_measure_knowledge(self):
        for confidence, latency in product((None, 0, 0.5, 1), (None, 1, 1000000)):
            self.assertEqual(compute_evidence_score("answer_submitted", {
                "correct": True, "attempt_index": 1, "hint_used": False,
                "confidence": confidence, "latency_ms": latency,
            }), 1)

    def test_unknown_and_non_answer_events_are_not_evidence(self):
        for correct in (None, 0, 1, "true", "false"):
            self.assertIsNone(compute_evidence_score("answer_submitted", {"correct": correct}))
        for event in ("skipped", "hint_opened", "answer_changed"):
            self.assertIsNone(compute_evidence_score(event, {"correct": True}))

    def test_assisted_answers_cannot_accumulate_mastery(self):
        for payload in (
            {"correct": True},
            {"correct": True, "attempt_index": 2, "hint_used": False},
            {"correct": True, "attempt_index": 1, "hint_used": True},
            {"correct": True, "attempt_index": 1, "hint_used": False, "answer_revealed": True},
            {"correct": True, "attempt_index": True, "hint_used": False},
            {"correct": True, "attempt_index": 0, "hint_used": False},
        ):
            evidence = compute_evidence_score("answer_submitted", payload)
            self.assertEqual(evidence, 0.5)
            old = 0
            for _ in range(50):
                old = compute_mastery_delta(old, evidence)["new_score"]
            self.assertNotIn(mastery_bucket(old), ("proficient", "mastered"))

    def test_newton_reversals_and_misconception_context(self):
        bad = "合外力保持不变时，质量越大，加速度也越大"
        for text in (bad, "假设" + bad + "。", "根据牛顿第二定律，" + bad + "。", "合力恒定，加速度与质量成正比。", "质量不变，合力越大，加速度越小。"):
            self.assertTrue(newton_trend_contradictions(text), text)
        for text in (
            "合外力保持不变时，质量越大，加速度越小。",
            "合力随质量增大，质量越大，加速度越大。",
            "误区：" + bad + "。",
            "有人误以为" + bad + "，实际上加速度变小。",
            "不能说" + bad + "。",
            bad + "，这个结论是错误的。",
            bad + "。这个说法不对。",
            bad + "吗？", bad + "。请判断正误。",
            "在合力固定时，质量越大，加速度的负分量也越大。",
        ):
            self.assertFalse(newton_trend_contradictions(text), text)

    def test_newton_gate_rejects_the_research_counterexample(self):
        goal = "解释牛顿第二定律"
        spec = choose_offline_fixture(goal)
        self.assertTrue(audit_scene_quality(normalize_scene_spec(spec, goal), goal=goal)["passed"])
        spec["sections"][-1]["blocks"].append({"kind": "paragraph", "text": "合外力保持不变时，质量越大，加速度也越大。"})
        report = audit_scene_quality(normalize_scene_spec(spec, goal), goal=goal)
        self.assertFalse(report["passed"])
        self.assertIn("newton_trend_contradiction", {issue["code"] for issue in report["fatal_issues"]})

    def test_bounded_polynomial_computation(self):
        for expression, x0, expected in (
            ("x²", 1, 2), ("3*x^3-2*x+1", -2, 34),
            ("(x+1)^2/2", 3, 4), ("x-x", 7, 0), ("7", 0, 0),
        ):
            self.assertAlmostEqual(polynomial_derivative(expression, x0), expected)
        for expression in ("abs(x)", "1/x", "x^-1", "x^10000000", "x^x", "True", "sin(x)", "x.__class__", "1e999", "x" * 300):
            self.assertIsNone(polynomial_derivative(expression, 0), expression)
        self.assertIsNone(polynomial_derivative("x", float("nan")))
        self.assertEqual(scalar_value("-2/4"), -0.5)
        for value in ("1/0", "float('nan')", "2%", "2x", "1e999"):
            self.assertIsNone(scalar_value(value))

    def _prediction_demo(self, expression="x^2", x0=1, answer=2):
        return {
            "kind": "limit_microscope", "data": {"mode": "derivative", "expression": expression, "x0": x0},
            "prediction": {
                "prompt": f"当 h 接近 0 时，{expression} 在 x₀={x0} 处的割线斜率趋近多少？",
                "options": [{"id": "a", "label": f"趋近 {answer}"}, {"id": "b", "label": "趋近 -99"}],
                "answer_id": "a",
            },
        }

    def test_prediction_uses_computed_value_not_model_explanation(self):
        for expression, x0, answer in (("x^2", 1, 2), ("x^3", 2, 12), ("(x+1)^2/2", 3, 4), ("7", 1, 0)):
            demo = self._prediction_demo(expression, x0, answer)
            self.assertEqual(audit_derivative_prediction(demo), "verified")
            demo["prediction"]["options"][0]["label"] = "趋近 -99"
            demo["prediction"]["explanation"] = "所以答案为 -99。"
            self.assertEqual(audit_derivative_prediction(demo), "prediction_answer_mismatch")

    def test_prediction_boundaries_and_unverified_cases(self):
        demo = self._prediction_demo()
        demo["data"]["x0"] = 2
        self.assertEqual(audit_derivative_prediction(demo), "prediction_problem_mismatch")
        demo = self._prediction_demo()
        demo["data"]["expression"] = "x^3"
        self.assertEqual(audit_derivative_prediction(demo), "prediction_problem_mismatch")
        demo = self._prediction_demo()
        demo["prediction"]["options"][1]["label"] = "等于 2"
        self.assertEqual(audit_derivative_prediction(demo), "prediction_answer_ambiguous")
        for expression in ("abs(x)", "1/x", "sin(x)"):
            self.assertIsNone(audit_derivative_prediction(self._prediction_demo(expression, 0, 0)))
        demo = self._prediction_demo()
        demo["prediction"]["prompt"] = "先估计整段区间的平均斜率。"
        self.assertIsNone(audit_derivative_prediction(demo))
        demo = self._prediction_demo("0.3*x", 1, 0.3)
        demo["data"]["expression"] = "(0.1+0.2)*x"
        self.assertEqual(audit_derivative_prediction(demo), "verified")

    def test_prediction_gate_keeps_valid_control(self):
        goal = "观察导数和圆周角"
        candidate = choose_offline_fixture("极限显微镜与圆周角约束几何")
        spec = normalize_scene_spec(candidate, goal)
        self.assertTrue(audit_scene_quality(spec, goal=goal)["passed"])
        wrong = deepcopy(spec)
        wrong["demonstrations"][0]["prediction"]["answer_id"] = "toward-zero"
        report = audit_scene_quality(wrong, goal=goal)
        self.assertFalse(report["passed"])
        self.assertIn("prediction_answer_mismatch", {issue["code"] for issue in report["fatal_issues"]})

    def test_manifest_checks_and_unverified_notice_survive_pipeline(self):
        goal = "观察导数和圆周角"
        candidate = choose_offline_fixture("极限显微镜与圆周角约束几何")
        manifest = _build_structured_manifest(candidate, goal=goal, provider="coze")
        self.assertEqual(manifest["generation"]["quality_version"], "1.8")
        self.assertIn("尚未经过通用答案核验", manifest["generation"]["fallback_reason"])
        self.assertIn("prediction_not_independently_verified", {
            warning["code"] for warning in manifest["generation"]["quality_warnings"]
        })
        candidate["demonstrations"][0]["prediction"]["answer_id"] = "toward-zero"
        with self.assertRaises(CozeWorkflowError):
            _build_structured_manifest(candidate, goal=goal, provider="coze")
        newton = choose_offline_fixture("解释牛顿第二定律")
        newton["sections"][-1]["blocks"].append({"kind": "paragraph", "text": "合外力保持不变时，质量越大，加速度也越大。"})
        with self.assertRaises(CozeWorkflowError):
            _build_structured_manifest(newton, goal="解释牛顿第二定律", provider="coze")

    def test_oracle_does_not_borrow_a_disavowed_answer(self):
        case = next(case for case in load_catalog()["cases"] if case["id"] == "M02")
        item = next(item for item in case["correctness"] if item["id"] == "integral-value")
        for text, expected in (
            ("有人误以为积分值为 2，这个结论是错误的；本题正确的积分值为 5。", False),
            ("积分值为 2，但积分值为 5。", False),
            ("积分值为 2。这个结论是错误的。", False),
            ("不是积分值为 5，而是积分值为 2。", True),
            ("积分值为 2/3。", False), ("积分值为 2e3。", False),
            ("积分值为 2x。", False), ("积分值为 2？", False),
            ("积分值为 2+3。", False), ("积分值 为 2。", True),
            ("矩形和的结果为 1.9，积分值为 2。", True),
            ("近似积分值为 1.9，定积分等于 2。", True),
            ("积分值为 2 * 3。", False),
            ("重要极限lim_{t→0} t/sint = 1；∫0^π sinx dx = -cosx|0^π = 2。", True),
            ("∫0^π sin(x)dx的右端点黎曼和可表示为S_n = (π/n)Σ_{i=1}^n sin(iπ/n)；积分值为 2。", True),
        ):
            passed, details = evaluate_correctness_item(item, normalize_text(text), text_scopes(text))
            self.assertEqual(passed, expected, (text, details))


if __name__ == "__main__":
    unittest.main(verbosity=2)
