"""Small, bounded helpers for checking explicit claims, not general NLP.

Keep unknown expressions unknown. These helpers must not execute model text or
borrow evidence across unrelated blocks. They are also used by the benchmark.
"""
from __future__ import annotations

import ast
import math
import re


NUMBER = r"[-+−]?(?:\d+(?:\.\d+)?|\.\d+)(?:[eE][-+]?\d+)?"
_CLAUSE_START = re.compile(r"[。；;！？!?\n]")
_DISAVOWED_PREFIX = re.compile(
    r"(?:误以为|误认为|错误地认为|错误认为|错误说法|错误结论|误区|假说|归谬|反证假设|"
    r"不能说|不能认为|不要认为|并非|不是|并不|不等于|不为|不应|不成立|错误示例)"
)
_DISAVOWED_SUFFIX = re.compile(
    r"^\s*[”’\"'）)]?\s*[,，：:]?\s*"
    r"(?:(?:这个|这种|该|此)?(?:说法|结论|判断|观点|表述|答案|结果))?"
    r"\s*(?:是|为|并)?\s*(?:错误|不对|不正确|不成立|不成立的|不准确)"
)


def is_affirmed_claim(text: str, start: int, end: int) -> bool:
    """Conservatively exclude explicit misconception/negation/question contexts.

    Used only after a narrow claim pattern matches. This is not a general
    natural-language truth detector. Adjacent-sentence rejection is limited to
    an explicit 'this conclusion is wrong' reference in the same text block.
    """
    boundaries = list(_CLAUSE_START.finditer(text[:start]))
    beginning = boundaries[-1].end() if boundaries else 0
    prefix = text[beginning:start]
    # A contrast can introduce a fresh assertion after a quoted misconception.
    prefix = re.split(r"但是|但|然而|而是|实际上|事实上|正确(?:的)?(?:结论|答案)?(?:是|为)", prefix)[-1]
    if _DISAVOWED_PREFIX.search(prefix) or re.search(r"(?:不|未|无|否认)\s*$", prefix):
        return False
    suffix = text[end:]
    if re.match(r"\s*[吗么呢]?\s*[？?]", suffix):
        return False
    if re.match(r"\s*[。；;]?\s*(?:请)?(?:判断正误|判断是否正确)", suffix):
        return False
    if _DISAVOWED_SUFFIX.search(suffix):
        return False
    if re.match(r"^\s*[。；;]\s*(?:这个|这种|该|此)(?:说法|结论|判断|观点|表述|答案|结果)", suffix):
        if _DISAVOWED_SUFFIX.search(re.sub(r"^\s*[。；;]\s*", "", suffix)):
            return False
    return True


def scalar_value(text: str) -> float | None:
    """A finite decimal or decimal fraction; never evaluate arbitrary code."""
    compact = re.sub(r"\s+", "", text).replace("−", "-")
    if len(compact) > 64 or not re.fullmatch(rf"{NUMBER}(?:/{NUMBER})?", compact):
        return None
    try:
        numerator, *denominator = compact.split("/")
        value = float(numerator)
        if denominator:
            value /= float(denominator[0])
        return value if math.isfinite(value) else None
    except (ValueError, ZeroDivisionError, OverflowError):
        return None


def polynomial_coefficients(expression: str) -> list[float] | None:
    """Parse a degree <= 12 polynomial using a bounded AST, without eval.

    Functions, variable denominators, variable/negative powers and excessive
    inputs are unsupported. This deliberately avoids numerical differentiation
    at cusps, singularities, or arbitrarily small finite-difference steps.
    """
    source = re.sub(r"\s+", "", expression).replace("²", "^2").replace("³", "^3").replace("−", "-")
    if len(source) > 256:
        return None
    try:
        tree = ast.parse(source.replace("^", "**"), mode="eval")
        if sum(1 for _ in ast.walk(tree)) > 96:
            return None

        def bounded(values: list[float]) -> list[float]:
            if len(values) > 13 or any(not math.isfinite(v) or abs(v) > 1e100 for v in values):
                raise ValueError("polynomial exceeds safe bounds")
            while len(values) > 1 and values[-1] == 0:
                values.pop()
            return values

        def multiply(left: list[float], right: list[float]) -> list[float]:
            if len(left) + len(right) - 1 > 13:
                raise ValueError("degree exceeds safe bounds")
            values = [0.0] * (len(left) + len(right) - 1)
            for i, a in enumerate(left):
                for j, b in enumerate(right):
                    values[i + j] += a * b
            return bounded(values)

        def parse(node: ast.AST) -> list[float]:
            if isinstance(node, ast.Expression):
                return parse(node.body)
            if isinstance(node, ast.Constant) and type(node.value) in (int, float):
                return bounded([float(node.value)])
            if isinstance(node, ast.Name) and node.id == "x":
                return [0.0, 1.0]
            if isinstance(node, ast.UnaryOp) and isinstance(node.op, (ast.UAdd, ast.USub)):
                sign = -1 if isinstance(node.op, ast.USub) else 1
                return [sign * v for v in parse(node.operand)]
            if not isinstance(node, ast.BinOp):
                raise ValueError("not a polynomial")
            left, right = parse(node.left), parse(node.right)
            if isinstance(node.op, (ast.Add, ast.Sub)):
                sign = -1 if isinstance(node.op, ast.Sub) else 1
                result = [0.0] * max(len(left), len(right))
                for i, value in enumerate(left):
                    result[i] += value
                for i, value in enumerate(right):
                    result[i] += sign * value
                return bounded(result)
            if isinstance(node.op, ast.Mult):
                return multiply(left, right)
            if isinstance(node.op, ast.Div) and len(right) == 1 and right[0] != 0:
                return bounded([value / right[0] for value in left])
            if isinstance(node.op, ast.Pow) and len(right) == 1 and 0 <= right[0] <= 12 and right[0].is_integer():
                result = [1.0]
                for _ in range(int(right[0])):
                    result = multiply(result, left)
                return result
            raise ValueError("unsupported polynomial operation")

        return parse(tree)
    except (ValueError, TypeError, SyntaxError, OverflowError, RecursionError):
        return None


def polynomial_derivative(expression: str, x0: float) -> float | None:
    coefficients = polynomial_coefficients(expression)
    if coefficients is None or not math.isfinite(x0) or abs(x0) > 1e6:
        return None
    try:
        value = sum(i * coefficient * x0 ** (i - 1) for i, coefficient in enumerate(coefficients) if i)
        return value if math.isfinite(value) else None
    except OverflowError:
        return None
