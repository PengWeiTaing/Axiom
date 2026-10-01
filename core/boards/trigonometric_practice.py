"""Exact signed/geometric areas for +/- sin(x), +/- cos(x) on written half-pi bounds.

No floating-point proximity is used to identify pi or decide an answer. The
request must explicitly name its bounds; floats are only checked against the
renderer parameters. Unknown expressions and ambiguous requests stay unknown.
"""
from __future__ import annotations

import hashlib
import json
import re
from fractions import Fraction
from typing import Any

from .knowledge_scene_quality import parse_simple_integral_source_details

GENERATOR = "axiom-trig-signed-area-v1"


def half_pi_units(raw: str) -> int | None:
    """Return k for an explicitly written k*pi/2, with |k| <= 16."""
    if not isinstance(raw, str) or len(raw) > 32:
        return None
    token = raw.strip().replace("\\pi", "pi").replace("π", "pi").replace("−", "-")
    if token.startswith(("*", "+*", "-*")):
        return None
    if re.fullmatch(r"[+-]?0(?:\.0+)?", token):
        return 0
    match = re.fullmatch(r"([+-]?(?:\d+(?:\.\d+)?)?)\*?pi(?:/([1-9]\d{0,2}))?", token)
    if not match:
        return None
    coefficient = match[1]
    if coefficient in ("", "+", "-"):
        coefficient += "1"
    try:
        units = 2 * Fraction(coefficient) / int(match[2] or 1)
    except (ValueError, ArithmeticError):
        return None
    return int(units) if units.denominator == 1 and abs(units) <= 16 else None


def pi_label(units: int) -> str:
    if units == 0:
        return "0"
    sign = "−" if units < 0 else ""
    numerator = abs(units) if units % 2 else abs(units) // 2
    return f"{sign}{numerator if numerator != 1 else ''}π{'/2' if units % 2 else ''}"


def exact_trig_areas(function: str, sign: int, lower: int, upper: int) -> tuple[int, int, int, int]:
    """Integral, geometric area, positive area, magnitude of negative area.

    At multiples of pi/2 the antiderivative values are 0 or +/-1. Splitting at
    every such point includes all zero crossings, so each piece has one sign.
    """
    if function not in {"sin", "cos"} or sign not in {-1, 1} or not -16 <= lower < upper <= 16:
        raise ValueError("outside exact trig table")
    values = (1, 0, -1, 0) if function == "sin" else (0, 1, 0, -1)
    factor = -sign if function == "sin" else sign
    pieces = [factor * (values[(k+1) % 4] - values[k % 4]) for k in range(lower, upper)]
    positive = sum(max(0, piece) for piece in pieces)
    negative = sum(max(0, -piece) for piece in pieces)
    return positive - negative, positive + negative, positive, negative


def _question(identity: str, prompt: str, values: tuple[int, int, int, int], solution: list[str]) -> dict[str, Any]:
    integral, area, positive, negative = values
    candidates = [
        ("right", integral, area, "这组结果正确。定积分按正负相加，几何面积把上下两部分都按正面积相加。"),
        ("absolute", area, area, "这个选项把积分也按几何面积来算了。横轴下方对积分的贡献应为负值，不能全部取正。"),
        ("cancel-area", integral, abs(integral), "积分发生抵消，不代表曲线与横轴之间没有面积。计算几何面积时，两边的面积需要相加。"),
        ("sign", -integral, area, "这个积分值变了号。请检查原函数在上限的值减下限的值，以及横轴下方的负贡献。"),
        ("signed-area", integral, integral, "这里把带符号的积分当成了面积。几何面积不能为负，跨过横轴时还要分段。"),
        ("double", 2*integral, 2*area, "这个结果把两项都重复算了一遍。请按题目区间核对，避免重复计算同一段。"),
    ]
    candidates.extend((f"check-{i}", integral+i, area+i, "这组数值与区间不符。请按横轴上下分段，再核对原函数的端点差。") for i in range(1, 5))
    options, seen = [], set()
    for answer, i, a, feedback in candidates:
        if (i, a) in seen:
            continue
        seen.add((i, a))
        options.append({"id": answer, "label": f"I = {i}，A = {a}", "feedback": feedback})
        if len(options) == 4:
            break
    offset = int(hashlib.sha256(identity.encode()).hexdigest()[:2], 16) % len(options)
    options = options[offset:] + options[:offset]
    return {"id": identity, "prompt": prompt, "options": options, "answerId": "right",
            "hint": "I 是定积分，A 是几何面积。横轴上方对 I 为正，下方为负；算 A 时上下两部分都取正，再相加。",
            "solution": solution}


def _solution(function: str, sign: int, lower: int, upper: int) -> list[str]:
    integral, area, positive, negative = exact_trig_areas(function, sign, lower, upper)
    primitive = ("−cos(x)" if sign == 1 else "cos(x)") if function == "sin" else ("sin(x)" if sign == 1 else "−sin(x)")
    return [
        f"本题的一个原函数是 F(x) = {primitive}。",
        f"定积分 I = F({pi_label(upper)}) − F({pi_label(lower)}) = {integral}。",
        f"在 [{pi_label(lower)}, {pi_label(upper)}] 内按 π/2 的整数倍分段，所有过零点都包含在分割点里。",
        f"横轴上方面积为 {positive}，下方面积为 {negative}；因此 I = {positive} − {negative} = {integral}。",
        f"几何面积 A = {positive} + {negative} = {area}。",
    ]


def build_trigonometric_practice(demo: dict[str, Any], *, request_text: str) -> dict[str, Any] | None:
    if demo.get("kind") != "riemann_sum" or not isinstance(demo.get("data"), dict):
        return None
    data = demo["data"]
    if data.get("mode") != "area_under_curve":
        return None
    parsed = parse_simple_integral_source_details(request_text, require_single=True)
    if parsed is None:
        return None
    expression, a, b, raw_lower, raw_upper = parsed
    match = re.fullmatch(r"([+-]?)(sin|cos)\(x\)", expression)
    if not match:
        return None
    sign, function = (-1 if match[1] == "-" else 1), match[2]
    lower, upper = half_pi_units(raw_lower), half_pi_units(raw_upper)
    domain = data.get("domain")
    if lower is None or upper is None or not lower < upper or upper-lower > 16:
        return None
    if not isinstance(domain, list) or len(domain) != 2 or any(type(v) not in (int, float) for v in domain) or domain != [a, b]:
        return None
    # Exact string binding after the same normalization used by the renderer.
    if expression != data.get("expression") or data.get("sample") not in ("left", "midpoint", "right"):
        return None
    n = data.get("n_initial")
    if type(n) is not int or not 2 <= n <= 128:
        return None
    source = {"expression": expression, "domain": domain, "sample": data["sample"], "n_initial": n,
              "domain_labels": [pi_label(lower), pi_label(upper)], "bound_origin": "explicit_request"}
    digest = hashlib.sha256(json.dumps(source, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode()).hexdigest()[:20]
    identity = "trig-integral-" + digest
    values = exact_trig_areas(function, sign, lower, upper)
    integral, area, positive, negative = values
    prompt = f"f(x) = {expression}，区间 [{pi_label(lower)}, {pi_label(upper)}]。定积分 I 与曲线和横轴之间的几何面积 A，哪一组正确？"
    prediction = _question(identity+"-predict", prompt, values, _solution(function, sign, lower, upper))
    conclusion = f"原区间上方面积 {positive}，下方面积 {negative}：I = {integral}，A = {area}。"
    for option in prediction["options"]:
        option["feedback"] += conclusion
    # Keep new endpoints on the exact grid; do not round a quarter-pi to a half-pi.
    next_lower, next_upper = lower, lower + (upper-lower)//2
    if next_upper == next_lower:
        if upper < 16:
            next_upper = upper+1
        else:
            next_lower, next_upper = lower-1, upper
    transfer = _question(identity+"-transfer",
        f"保持 f(x) = {expression}，把区间改为 [{pi_label(next_lower)}, {pi_label(next_upper)}]。新的定积分 I 和几何面积 A 分别是多少？",
        exact_trig_areas(function, sign, next_lower, next_upper),
        _solution(function, sign, next_lower, next_upper))
    return {"version": "1.0", "generator": GENERATOR, "id": identity, "source": source,
            "prediction": prediction, "transfer": transfer, "conclusion": conclusion,
            "scope_note": "答案按明确写出的 π 区间，用原函数和分段面积核验；这是一道局部练习，不是掌握度评估。"}
