"""Deterministic, bounded practice for a normalized Riemann demonstration.

This is an optional enrichment, not a general symbolic algebra system. Model
text cannot supply answers or executable code. Unsupported inputs return None
and leave the original demonstration intact. Results never write mastery.
"""
from __future__ import annotations

import ast
import hashlib
import json
import math
import re
from fractions import Fraction
from typing import Any


GENERATOR = "axiom-rational-integral-v1"
_SAMPLES = {"left": (Fraction(0), "左端点"), "midpoint": (Fraction(1, 2), "中点"), "right": (Fraction(1), "右端点")}


def rational_polynomial(expression: str) -> list[Fraction] | None:
    """Parse degree <= 4 polynomials, including rational constant division."""
    if not isinstance(expression, str) or len(expression) > 160:
        return None
    source = expression.replace("^", "**").replace("−", "-")
    try:
        tree = ast.parse(source.strip(), mode="eval")
        source = source.strip()
        if sum(1 for _ in ast.walk(tree)) > 64:
            return None

        def bound(values: list[Fraction]) -> list[Fraction]:
            if len(values) > 5 or any(abs(v) > 10**6 or abs(v.numerator) > 10**8 or v.denominator > 10**8 for v in values):
                raise ValueError("polynomial exceeds arithmetic budget")
            while len(values) > 1 and values[-1] == 0:
                values.pop()
            return values

        def multiply(left: list[Fraction], right: list[Fraction]) -> list[Fraction]:
            if len(left) + len(right) - 1 > 5:
                raise ValueError("degree exceeds four")
            result = [Fraction(0)] * (len(left) + len(right) - 1)
            for i, a in enumerate(left):
                for j, b in enumerate(right):
                    result[i + j] += a * b
            return bound(result)

        def parse(node: ast.AST) -> list[Fraction]:
            if isinstance(node, ast.Expression):
                return parse(node.body)
            if isinstance(node, ast.Constant) and type(node.value) in (int, float):
                token = ast.get_source_segment(source, node) or ""
                if len(token) > 24 or not re.fullmatch(r"(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d{1,2})?", token):
                    raise ValueError("unsupported numeric literal")
                return bound([Fraction(token)])
            if isinstance(node, ast.Name) and node.id == "x":
                return [Fraction(0), Fraction(1)]
            if isinstance(node, ast.UnaryOp) and isinstance(node.op, (ast.UAdd, ast.USub)):
                return [value * (-1 if isinstance(node.op, ast.USub) else 1) for value in parse(node.operand)]
            if not isinstance(node, ast.BinOp):
                raise ValueError("not a polynomial")
            left, right = parse(node.left), parse(node.right)
            if isinstance(node.op, (ast.Add, ast.Sub)):
                result = [Fraction(0)] * max(len(left), len(right))
                for i, value in enumerate(left):
                    result[i] += value
                for i, value in enumerate(right):
                    result[i] += value * (-1 if isinstance(node.op, ast.Sub) else 1)
                return bound(result)
            if isinstance(node.op, ast.Mult):
                return multiply(left, right)
            if isinstance(node.op, ast.Div) and len(right) == 1 and right[0] != 0:
                return bound([value / right[0] for value in left])
            if isinstance(node.op, ast.Pow) and len(right) == 1 and right[0].denominator == 1 and 0 <= right[0] <= 4:
                if right[0] == 0 and left == [Fraction(0)]:
                    raise ValueError("undefined zero power")
                result = [Fraction(1)]
                for _ in range(int(right[0])):
                    result = multiply(result, left)
                return result
            raise ValueError("unsupported polynomial operation")

        return parse(tree)
    except (ValueError, TypeError, SyntaxError, ArithmeticError, RecursionError):
        return None


def _format(value: Fraction) -> str:
    text = str(value)
    if len(text) > 36:
        raise ValueError("exact answer too long for this practice")
    return text


def _at(coefficients: list[Fraction], x: Fraction) -> Fraction:
    result = Fraction(0)
    for coefficient in reversed(coefficients):
        result = result * x + coefficient
    return result


def _integral(coefficients: list[Fraction], a: Fraction, b: Fraction) -> Fraction:
    return sum((c * (b**(i + 1) - a**(i + 1)) / (i + 1) for i, c in enumerate(coefficients)), Fraction(0))


def _sum(coefficients: list[Fraction], a: Fraction, b: Fraction, n: int, sample: str) -> tuple[Fraction, list[Fraction]]:
    dx = (b - a) / n
    points = [a + (i + _SAMPLES[sample][0]) * dx for i in range(n)]
    return sum((_at(coefficients, x) * dx for x in points), Fraction(0)), points


def _antiderivative(coefficients: list[Fraction]) -> str:
    terms = [f"({_format(c / (i + 1))})·x^{i + 1}" for i, c in enumerate(coefficients) if c]
    return " + ".join(terms) or "0"


def build_integral_practice(demo: dict[str, Any]) -> dict[str, Any] | None:
    """Bind questions to the *actual* normalized expression/domain/sample/n."""
    if demo.get("kind") != "riemann_sum":
        return None
    data = demo.get("data")
    if not isinstance(data, dict) or data.get("mode") != "area_under_curve":
        return None
    expression = data.get("expression")
    coefficients = rational_polynomial(expression)
    if coefficients is None or coefficients == [Fraction(0)]:
        return None
    domain, n, sample = data.get("domain"), data.get("n_initial"), data.get("sample")
    if not isinstance(domain, list) or len(domain) != 2 or type(n) is not int or not 2 <= n <= 128 or not isinstance(sample, str) or sample not in _SAMPLES:
        return None
    if any(type(v) not in (int, float) or abs(v) > 20 or not math.isfinite(v) for v in domain):
        return None
    try:
        a, b = [Fraction(str(v)) for v in domain]
        if a >= b or b - a < Fraction(1, 100) or any(v.denominator > 10000 for v in (a, b)):
            return None
        total, _ = _sum(coefficients, a, b, n, sample)
        integral = _integral(coefficients, a, b)
        comparison = "greater" if total > integral else "less" if total < integral else "equal"
        comparison_word = {"greater": "大于", "less": "小于", "equal": "等于"}[comparison]
        source = {"expression": expression, "domain": domain, "sample": sample, "n_initial": n}
        identity = hashlib.sha256(json.dumps(source, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode()).hexdigest()[:20]
        prefix = f"integral-{identity}"
        condition = f"f(x) = {expression}，区间 [{_format(a)}, {_format(b)}]，等分 {n} 段，取{_SAMPLES[sample][1]}"
        exact_result = f"预测题按 {n} 段、{_SAMPLES[sample][1]}计算，S = {_format(total)}，I = {_format(integral)}，所以矩形和{comparison_word}定积分。"
        antiderivative = _antiderivative(coefficients)
        prediction = {
            "id": prefix + "-predict",
            "prompt": condition + "。你认为有向矩形和 S 与定积分 I 的关系是什么？横轴下方的部分按负值相加。",
            "options": [
                {"id": answer_id, "label": label,
                 "feedback": ("判断正确。" if answer_id == comparison else "这次判断不符。有限个矩形既可能多算，也可能少算，还可能恰好相等；要代入当前条件核对。") + exact_result}
                for answer_id, label in [("greater", "S > I"), ("less", "S < I"), ("equal", "S = I")]
            ],
            "answerId": comparison,
            "hint": "比较的是带正负号的数值。取样方式、函数形状和区间都会影响有限矩形和。",
            "solution": [
                f"每段宽度 Δx = ({_format(b)} − ({_format(a)}))/{n} = {_format((b - a) / n)}。",
                f"按{_SAMPLES[sample][1]}取样，S = Σ f(xᵢ*)·Δx = {_format(total)}。",
                f"一个原函数是 F(x) = {antiderivative}。",
                f"I = F({_format(b)}) − F({_format(a)}) = {_format(integral)}。",
            ],
        }

        # A new interval, explicitly stated; never silently replace the function.
        upper = (a + b) / 2
        transfer_sum, points = _sum(coefficients, a, upper, 4, sample)
        transfer_integral = _integral(coefficients, a, upper)
        dx = (upper - a) / 4
        candidates = [
            ("right", transfer_sum, transfer_integral, "两个量都算对了：有向矩形和与定积分需要分别计算。"),
            ("width", transfer_sum / dx, transfer_integral, "这组数值相当于只加了高度。检查是否忘了乘每段宽度；矩形的贡献是 f(xᵢ*)·Δx。"),
            ("integral-as-sum", transfer_integral, transfer_integral, "这个选项把定积分也当成了有限矩形和。请代入题目指定的 4 个取样点核对。"),
            ("sum-as-integral", transfer_sum, transfer_sum, "这个选项把有限矩形和也当成了定积分。请用原函数的端点差单独计算 I。"),
            ("old-domain", transfer_sum, integral, "这个积分值沿用了原区间。本题已经把右端点改成了原区间的中点，请重新代入上下限。"),
            ("sign", -transfer_sum, -transfer_integral, "这组数值把两个结果都变号了。请检查函数值的正负，以及原函数是上限值减下限值。"),
        ]
        for index in range(1, 5):
            candidates.append((f"check-{index}", transfer_sum + index, transfer_integral - index, "这组数值与当前条件不符。可以分别写出宽度、取样点与原函数端点差，检查计算。"))
        selected: list[dict[str, str]] = []
        seen: set[tuple[Fraction, Fraction]] = set()
        for answer_id, sum_value, integral_value, feedback in candidates:
            pair = (sum_value, integral_value)
            if pair in seen:
                continue
            seen.add(pair)
            selected.append({"id": answer_id, "label": f"S₄ = {_format(sum_value)}，I = {_format(integral_value)}", "feedback": feedback})
            if len(selected) == 4:
                break
        # Stable but not always the first option; options remain stable on reload.
        shift = int(identity[:2], 16) % len(selected)
        selected = selected[shift:] + selected[:shift]
        transfer = {
            "id": prefix + "-transfer", "answerId": "right",
            "prompt": f"保持 f(x) = {expression}，把区间改为 [{_format(a)}, {_format(upper)}]，等分 4 段，仍取{_SAMPLES[sample][1]}。有向矩形和 S₄ 与定积分 I 分别是多少？",
            "options": selected,
            "hint": "区间变了，宽度和取样点要重算。S₄ 是 4 个函数值乘宽度的和；I 是原函数在新上、下限的差。不要把负值一律取正。",
            "solution": [
                f"新区间每段宽度 Δx = ({_format(upper)} − ({_format(a)}))/4 = {_format(dx)}。",
                "取样点依次为：" + "、".join(_format(x) for x in points) + "。",
                "函数值依次为：" + "、".join(_format(_at(coefficients, x)) for x in points) + "。",
                f"S₄ = 各函数值之和 × {_format(dx)} = {_format(transfer_sum)}。",
                f"F(x) = {antiderivative}，I = F({_format(upper)}) − F({_format(a)}) = {_format(transfer_integral)}。",
            ],
        }
        return {"version": "1.0", "generator": GENERATOR, "id": prefix, "source": source,
                "prediction": prediction, "transfer": transfer, "conclusion": exact_result,
                "scope_note": "答案按当前条件用分数运算生成；这是一道局部练习，不是掌握度评估。"}
    except (ValueError, TypeError, ArithmeticError):
        return None


def attach_integral_practice(spec: dict[str, Any], *, request_text: str = "") -> int:
    from .trigonometric_practice import build_trigonometric_practice

    count = 0
    for demo in spec.get("demonstrations", []):
        # Never retain a model-authored marker claiming that a question is verified.
        demo.pop("practice", None)
        practice = build_integral_practice(demo)
        if practice is None:
            practice = build_trigonometric_practice(demo, request_text=request_text)
        if practice is not None:
            demo["practice"] = practice
            demo.pop("prediction", None)
            count += 1
    return count
