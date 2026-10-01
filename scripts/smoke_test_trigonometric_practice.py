"""Offline exact-area tests, with independent numerical oracles and provenance checks."""
from __future__ import annotations

from copy import deepcopy
from itertools import combinations
import math
from pathlib import Path
import re
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from core.boards.integral_practice import attach_integral_practice
from core.boards.trigonometric_practice import build_trigonometric_practice, exact_trig_areas, half_pi_units, pi_label
from core.boards.knowledge_scene import CozeWorkflowError, _build_structured_manifest
from core.boards.knowledge_scene_quality import explicit_integral_claims_match, parse_simple_integral_source, parse_simple_integral_source_details
from core.boards.knowledge_scene_fixtures import choose_offline_fixture
from core.boards.knowledge_scene_spec import normalize_scene_spec


def request(expression="sin(x)", a=0, b=4):
    return f"计算定积分 ∫_{{{pi_label(a)}}}^{{{pi_label(b)}}} {expression} dx，并用黎曼和解释积分与几何面积的区别"


def demo(expression="sin(x)", a=0, b=4):
    parsed = parse_simple_integral_source(request(expression, a, b))
    return {"id": "trig-area", "kind": "riemann_sum", "data": {
        "mode": "area_under_curve", "expression": parsed[0], "domain": list(parsed[1:]),
        "range": [-1.2,1.2], "n_initial": 8, "n_min": 2, "n_max": 64, "sample": "midpoint",
    }}


def candidate(expression="sin(x)", a=0, b=4):
    goal = request(expression, a, b)
    spec = choose_offline_fixture("riemann-sum-fixture")
    spec["learning_goal"] = goal
    spec["title"] = "积分会抵消，面积要相加"
    spec["topic"] = "三角函数的定积分与几何面积"
    spec["sections"][0]["blocks"][0]["text"] = (
        f"本题研究 f(x)={expression} 在 [{pi_label(a)}, {pi_label(b)}] 上的有向面积。把这段区间等分为 n 份，每块矩形的宽度是区间长度除以 n，高度由取样点的函数值决定。"
    )
    spec["sections"][1]["blocks"].insert(0, {"kind": "paragraph", "text": (
        f"要计算的是 ∫_{{{pi_label(a)}}}^{{{pi_label(b)}}} {expression} dx。用中点取样的黎曼和逼近这个积分，横轴下方的贡献必须保留负号；如果问几何面积，则应把上下两部分都按正面积相加。"
    )})
    current = spec["demonstrations"][0]
    current["data"] = demo(expression, a, b)["data"]
    current["semantic_ids"] = []
    return spec


def manifest(expression="sin(x)", a=0, b=4):
    return _build_structured_manifest(candidate(expression, a, b), goal=request(expression, a, b), provider="demo")


def numeric_areas(expression, a, b):
    function = math.sin if "sin" in expression else math.cos
    sign = -1 if expression.startswith("-") else 1
    left, right = a*math.pi/2, b*math.pi/2
    n = 4096
    dx = (right-left)/n
    integral, area = 0.0, 0.0
    for i in range(n+1):
        value = sign*function(left+i*dx)
        weight = 1 if i in (0,n) else 4 if i%2 else 2
        integral += weight*value
        area += weight*abs(value)
    return integral*dx/3, area*dx/3


class TrigPracticeTests(unittest.TestCase):
    def test_written_pi_bound_syntax(self):
        for token, expected in {"0":0, "0.0":0, "π":2, "2*pi":4, r"\pi/2":1, "−π/2":-1, "-3π/2":-3, "1.5pi":3, "8pi":16}.items():
            self.assertEqual(half_pi_units(token), expected, token)
        for token in ("3.14", str(math.pi), "pi/4", "9pi", "pi/0", "*pi", "+*pi", "pi/999999", "float('inf')", "0.00001", None):
            self.assertIsNone(half_pi_units(token), token)

    def test_source_details_preserve_notation(self):
        self.assertEqual(parse_simple_integral_source_details("∫_0^{2π} sin(x) dx"), ("sin(x)",0.0,2*math.pi,"0","2π"))
        self.assertEqual(parse_simple_integral_source("∫_{−π/2}^{π/2} cos(x) dx"), ("cos(x)",-math.pi/2,math.pi/2))
        self.assertIsNone(parse_simple_integral_source("∫_0^inf sin(x) dx"))

    def test_independent_144_integral_and_area_oracles(self):
        labels = {pi_label(k):k for k in range(-16,17)}
        for expression in ("sin(x)", "-sin(x)", "cos(x)", "-cos(x)"):
            for a,b in combinations(range(-4,5),2):
                with self.subTest(expression=expression, a=a, b=b):
                    lesson = build_trigonometric_practice(demo(expression,a,b), request_text=request(expression,a,b))
                    self.assertIsNotNone(lesson)
                    for question, interval in ((lesson["prediction"], (a,b)), (lesson["transfer"], None)):
                        if interval is None:
                            match = re.search(r"区间改为 \[(.+), (.+)\]", question["prompt"])
                            interval = labels[match[1]], labels[match[2]]
                        integral, area = numeric_areas(expression, *interval)
                        count = 0
                        seen = set()
                        for option in question["options"]:
                            match = re.fullmatch(r"I = (-?\d+)，A = (-?\d+)", option["label"])
                            pair = int(match[1]), int(match[2])
                            matches = abs(pair[0]-integral)<1e-6 and abs(pair[1]-area)<1e-6
                            self.assertEqual(matches, option["id"] == "right")
                            count += matches
                            seen.add(pair)
                        self.assertEqual(count,1)
                        self.assertEqual(len(seen),4)

    def test_cancellation_is_not_zero_area(self):
        self.assertEqual(exact_trig_areas("sin",1,0,4), (0,4,2,2))
        lesson = build_trigonometric_practice(demo(), request_text=request())
        self.assertEqual(next(o["label"] for o in lesson["prediction"]["options"] if o["id"]=="right"), "I = 0，A = 4")
        self.assertIn("抵消", next(o["feedback"] for o in lesson["prediction"]["options"] if o["id"]=="cancel-area"))

    def test_no_symbolic_proof_from_rounded_or_exact_float(self):
        for bound in ("3.14", str(math.pi), "3.1415926535897931"):
            raw = f"∫_0^{bound} sin(x) dx"
            item = demo("sin(x)",0,2)
            item["data"]["domain"][1] = float(bound)
            self.assertIsNone(build_trigonometric_practice(item, request_text=raw))
        self.assertIsNone(build_trigonometric_practice(demo(), request_text="解释积分与面积"))

    def test_single_interval_and_exact_renderer_binding_required(self):
        self.assertIsNone(build_trigonometric_practice(demo(), request_text=request()+"；"+request()))
        for key, value in (("expression","cos(x)"), ("domain",[0,math.nextafter(2*math.pi,math.inf)]), ("n_initial",True), ("sample","random")):
            item = demo()
            item["data"][key] = value
            self.assertIsNone(build_trigonometric_practice(item, request_text=request()))
        self.assertIsNone(build_trigonometric_practice(demo(), request_text="∫_0^{π/4} sin(x) dx"))

    def test_unsupported_expressions_do_not_become_sine(self):
        for expression in ("sin(2*x)","sin(x)+1","2*sin(x)","sin(x+pi)","tan(x)","1/x"):
            self.assertIsNone(build_trigonometric_practice(demo(), request_text=f"∫_0^{{2π}} {expression} dx"))

    def test_half_pi_edge_transfer_stays_on_the_exact_grid(self):
        for a,b in ((0,1),(15,16),(-16,-15)):
            lesson = build_trigonometric_practice(demo("cos(x)",a,b), request_text=request("cos(x)",a,b))
            self.assertIsNotNone(lesson)
            self.assertNotIn("/4",lesson["transfer"]["prompt"])

    def test_model_proof_is_ignored(self):
        item = demo()
        item["practice"]={"generator":"axiom-trig-signed-area-v1","answer":"wrong"}
        item["data"]["domain_labels"]=["0","2π"]
        spec={"demonstrations":[item]}
        self.assertEqual(attach_integral_practice(spec),0)
        self.assertNotIn("practice",item)
        self.assertEqual(attach_integral_practice(spec,request_text=request()),1)
        self.assertNotIn("answer",item["practice"])

    def test_pipeline_repair_preserves_request_notations(self):
        for expression,a,b in (("sin(x)",0,4),("cos(x)",-1,1),("-sin(x)",0,2)):
            board=manifest(expression,a,b)
            item=next(d for d in board["content"]["demonstrations"] if d["kind"]=="riemann_sum")
            self.assertEqual(item["practice"]["source"]["domain_labels"],[pi_label(a),pi_label(b)])
            self.assertEqual(item["practice"]["source"]["bound_origin"],"explicit_request")
            self.assertEqual(item["data"]["expression"],expression)
            self.assertEqual(board["generation"]["quality_status"],"approved")

    def test_explicit_prose_cannot_be_repaired_into_a_different_problem(self):
        for written, wanted in (
            (("sin(x)",0,4), ("sin(x)",0,2)),
            (("-sin(x)",0,2), ("sin(x)",0,2)),
            (("cos(x)",-1,1), ("cos(x)",1,3)),
        ):
            with self.subTest(written=written, wanted=wanted):
                with self.assertRaises(CozeWorkflowError):
                    _build_structured_manifest(candidate(*written), goal=request(*wanted), provider="demo")
        same = "∫_0^{2π} sin(x) dx"
        self.assertTrue(explicit_integral_claims_match(same+"；"+same, "sin(x)",0,2*math.pi))
        self.assertFalse(explicit_integral_claims_match(same+"；∫_0^π sin(x) dx", "sin(x)",0,2*math.pi))
        self.assertIsNone(explicit_integral_claims_match("一般公式 ∫_a^b f(x) dx", "sin(x)",0,2*math.pi))


if __name__ == "__main__":
    unittest.main(verbosity=2)
