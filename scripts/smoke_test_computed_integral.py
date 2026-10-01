"""Offline tests for exact questions bound to normalized integral demos."""
from __future__ import annotations

from copy import deepcopy
from fractions import Fraction as F
import json
from pathlib import Path
import re
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from core.boards.integral_practice import attach_integral_practice, build_integral_practice, rational_polynomial
from core.boards.knowledge_scene import _build_structured_manifest
from core.boards.knowledge_scene_fixtures import choose_offline_fixture
from core.boards.knowledge_scene_spec import normalize_scene_spec


def demo(expression="x^2", domain=None, sample="midpoint", n=8):
    return {"id": "test-integral", "kind": "riemann_sum", "data": {
        "mode": "area_under_curve", "expression": expression,
        "domain": [0, 2] if domain is None else domain, "n_initial": n,
        "n_min": 2, "n_max": 64, "sample": sample, "range": [-10, 10],
    }}


class ComputedIntegralTests(unittest.TestCase):
    def test_decimal_and_fraction_literals_stay_exact(self):
        self.assertEqual(rational_polynomial("0.1 + x/3"), [F(1, 10), F(1, 3)])
        self.assertEqual(rational_polynomial("(x-1)^2 / 3"), [F(1, 3), F(-2, 3), F(1, 3)])
        self.assertEqual(rational_polynomial("1e-2*x"), [F(0), F(1, 100)])

    def test_independent_polynomial_oracles(self):
        # These value/primitive functions are handwritten separately from the
        # parser, coefficient integration, and question generator under test.
        functions = [
            ("x^2", lambda x: x*x, lambda x: x**3/3),
            ("2*x", lambda x: 2*x, lambda x: x*x),
            ("-x^2", lambda x: -x*x, lambda x: -x**3/3),
            ("x^3-x", lambda x: x**3-x, lambda x: x**4/4-x*x/2),
            ("x/3", lambda x: x/3, lambda x: x*x/6),
            ("(x-1)^2+0.1", lambda x: (x-1)**2+F(1,10), lambda x: (x-1)**3/3+x/10),
            ("3", lambda x: F(3), lambda x: 3*x),
            ("x^4", lambda x: x**4, lambda x: x**5/5),
        ]
        for expression, function, primitive in functions:
            for domain in ([0, 2], [-1, 1], [-2, 0], [0.1, 0.9]):
                for sample, ratio in (("left", F(0)), ("midpoint", F(1,2)), ("right", F(1))):
                    with self.subTest(expression=expression, domain=domain, sample=sample):
                        item = demo(expression, domain, sample)
                        practice = build_integral_practice(item)
                        self.assertIsNotNone(practice)
                        a, b = (F(str(v)) for v in domain)
                        dx = (b-a)/8
                        total = sum(function(a+(i+ratio)*dx)*dx for i in range(8))
                        integral = primitive(b)-primitive(a)
                        expected = "greater" if total > integral else "less" if total < integral else "equal"
                        self.assertEqual(practice["prediction"]["answerId"], expected)
                        upper = (a+b)/2
                        dx = (upper-a)/4
                        transfer_total = sum(function(a+(i+ratio)*dx)*dx for i in range(4))
                        transfer_integral = primitive(upper)-primitive(a)
                        pairs = []
                        for option in practice["transfer"]["options"]:
                            match = re.fullmatch(r"S₄ = (.+)，I = (.+)", option["label"])
                            pair = F(match[1]), F(match[2])
                            pairs.append(pair)
                            self.assertEqual(pair == (transfer_total, transfer_integral), option["id"] == "right")
                        self.assertEqual(len(pairs), 4)
                        self.assertEqual(len(set(pairs)), 4)

    def test_signed_area_is_not_absolute_area(self):
        practice = build_integral_practice(demo("-x^2", sample="right"))
        self.assertEqual(practice["prediction"]["answerId"], "less")
        self.assertIn("按负值相加", practice["prediction"]["prompt"])
        correct = next(o for o in practice["transfer"]["options"] if o["id"] == "right")
        self.assertEqual(correct["label"], "S₄ = -15/32，I = -1/3")

    def test_equal_is_possible_for_midpoint_linear_functions(self):
        practice = build_integral_practice(demo("2*x", sample="midpoint"))
        self.assertEqual(practice["prediction"]["answerId"], "equal")
        options = practice["transfer"]["options"]
        self.assertEqual(len(set(o["label"] for o in options)), 4)
        self.assertEqual(next(o["label"] for o in options if o["id"] == "right"), "S₄ = 1，I = 1")

    def test_binding_changes_with_every_problem_parameter(self):
        original = demo()
        first = build_integral_practice(original)
        self.assertEqual(first, build_integral_practice(deepcopy(original)))
        for key, value in (("expression", "2*x"), ("domain", [-1,1]), ("sample", "left"), ("n_initial", 4)):
            changed = deepcopy(original)
            changed["data"][key] = value
            practice = build_integral_practice(changed)
            self.assertNotEqual(first["id"], practice["id"])
            self.assertEqual(practice["source"][key], value)

    def test_expression_limits_and_injections_decline(self):
        for expression in ("sin(x)", "1/x", "(x*x-1)/(x-1)", "abs(x)", "sqrt(x)", "x^5", "x^-1", "x^0.5", "x**999999", "True", "__import__('os').system('never')", "1e999", "0^0", "0", "x-x", "x+"*90+"1", "x"*161):
            with self.subTest(expression=expression):
                self.assertIsNone(build_integral_practice(demo(expression)))

    def test_invalid_domains_and_counts_decline(self):
        for domain in (None, [], [0], [0,0], [2,1], [True,2], [0,float("inf")], [float("nan"),1], [0,10**1000], [0,21], [0,0.0001], [0,3.141592653589793]):
            candidate = demo()
            candidate["data"]["domain"] = domain
            self.assertIsNone(build_integral_practice(candidate))
        for n in (True, 1, 129, 8.5, "8"):
            self.assertIsNone(build_integral_practice(demo(n=n)))
        for sample in ("random", None, [], {}):
            self.assertIsNone(build_integral_practice(demo(sample=sample)))

    def test_no_mutation_on_unsupported_demo(self):
        item = demo("sin(x)", [0, 3.141592653589793])
        before = deepcopy(item)
        self.assertIsNone(build_integral_practice(item))
        self.assertEqual(item, before)

    def test_forged_practice_removed_and_prediction_recomputed(self):
        valid, unsupported = demo(), demo("sin(x)")
        valid["practice"] = {"generator": "axiom-rational-integral-v1", "answer": "999"}
        valid["prediction"] = {"answer_id": "invented"}
        unsupported["practice"] = deepcopy(valid["practice"])
        spec = {"demonstrations": [valid, unsupported]}
        self.assertEqual(attach_integral_practice(spec), 1)
        self.assertNotIn("prediction", valid)
        self.assertNotIn("practice", unsupported)
        self.assertEqual(valid["practice"]["prediction"]["answerId"], "less")

    def test_manifest_pipeline_discards_authored_metadata(self):
        fixture = choose_offline_fixture("riemann-sum-fixture")
        fixture["demonstrations"][0]["practice"] = {"generator": "axiom-rational-integral-v1", "answer": "999"}
        normalized = normalize_scene_spec(fixture, "riemann-sum-fixture")
        self.assertNotIn("practice", normalized["demonstrations"][0])
        manifest = _build_structured_manifest(fixture, goal="用黎曼和理解曲线下面积", provider="demo")
        practice = manifest["content"]["demonstrations"][0]["practice"]
        self.assertEqual(practice["prediction"]["answerId"], "less")
        self.assertEqual(practice["source"]["expression"], "x^2")
        self.assertEqual(manifest["generation"]["quality_status"], "approved")
        json.dumps(manifest, allow_nan=False)

    def test_practice_is_built_after_automatic_riemann_repair(self):
        fixture = choose_offline_fixture("riemann-sum-fixture")
        original = fixture["demonstrations"][0]
        original["kind"] = "function_plot"
        original["data"] = {"domain": [0,2], "range": [0,4.4], "series": [{"expression": "x^2", "label": "x²"}]}
        manifest = _build_structured_manifest(fixture, goal="用黎曼和理解曲线下面积", provider="demo")
        repaired = next(d for d in manifest["content"]["demonstrations"] if d["kind"] == "riemann_sum")
        self.assertEqual(repaired["practice"]["source"]["expression"], "x^2")
        self.assertEqual(repaired["practice"]["source"]["n_initial"], repaired["data"]["n_initial"])

    def test_unsupported_function_keeps_original_scene(self):
        fixture = choose_offline_fixture("riemann-sum-fixture")
        fixture["demonstrations"][0]["data"]["expression"] = "sin(x)"
        fixture["demonstrations"][0]["data"]["range"] = [-1.2,1.2]
        manifest = _build_structured_manifest(fixture, goal="用黎曼和理解曲线下面积", provider="demo")
        item = manifest["content"]["demonstrations"][0]
        self.assertEqual(item["data"]["expression"], "sin(x)")
        self.assertNotIn("practice", item)


if __name__ == "__main__":
    unittest.main(verbosity=2)
