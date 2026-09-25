"""Generate safe, cross-subject knowledge-scene manifests through Coze.

Coze authors a renderer-neutral JSON scene.  Axiom validates every field and
renders it with checked-in React primitives; model-generated HTML, JavaScript,
SVG paths and layout code are never executed.
"""
from __future__ import annotations

import copy
import json
import math
import os
import re
import urllib.error
import urllib.request
import uuid
from datetime import datetime, timezone
from typing import Any, Callable

from core.boards.knowledge_scene_fixtures import choose_offline_fixture
from core.boards.knowledge_scene_quality import (
    QUALITY_GATE_VERSION,
    audit_scene_quality,
    faraday_content_matches_problem,
    field_experiment_matches_problem,
    force_diagram_matches_problem,
    newton_content_matches_problem,
    parse_explicit_faraday_problem,
    parse_explicit_newton_problem,
    parse_explicit_relations,
    parse_simple_integral_source,
    quality_failure_message,
    scene_content_text,
    simple_expression_plot_range,
)
from core.boards.knowledge_scene_spec import (
    ALLOWED_DEMONSTRATION_KINDS,
    SceneValidationError,
    normalize_animation_patch,
    normalize_scene_spec,
    scene_writer_contract_summary,
)


COZE_API_BASE = os.environ.get("COZE_API_BASE", "https://api.coze.cn").rstrip("/")
COZE_API_TOKEN = os.environ.get("COZE_API_TOKEN", "").strip()
COZE_WORKFLOW_ID = os.environ.get("COZE_WORKFLOW_ID", "").strip()
COZE_TIMEOUT_SECONDS = max(5, int(os.environ.get("COZE_TIMEOUT_SECONDS", "300")))

LEGACY_TEMPLATE_ID = "calculus_area_v1"
LAGRANGE_MULTIPLIER_TEMPLATE_ID = "lagrange_multiplier_v1"
STRUCTURED_TEMPLATE_ID = "structured_scene_v2"
LEGACY_CALCULUS_TEMPLATE: dict[str, Any] = {
    "title": "用定积分表示平面区域的面积",
    "topic": "定积分 · 平面区域面积",
    "subject": "高等数学",
    "renderer": {
        "kind": "static_html",
        "src": "/static/board/knowledge-scenes/calculus-area.html",
    },
    "learning_path": [
        {"id": "see", "label": "先看区域"},
        {"id": "slice", "label": "把区域切成窄条"},
        {"id": "sum", "label": "从有限和走向极限"},
        {"id": "integrate", "label": "写成定积分"},
        {"id": "transfer", "label": "迁移到两曲线之间"},
    ],
    "capabilities": [
        "连续文字主线",
        "函数与几何联动",
        "黎曼和动态演示",
        "公式逐步推导",
        "明暗背景翻转",
    ],
}
LAGRANGE_MULTIPLIER_TEMPLATE: dict[str, Any] = {
    "title": "拉格朗日乘数法：为什么梯度平行",
    "topic": "约束优化 · 梯度平行",
    "subject": "高等数学",
    "renderer": {
        "kind": "static_html",
        "src": "/static/board/knowledge-scenes/lagrange-multiplier.html",
    },
    "learning_path": [
        {"id": "constraint", "label": "先看约束允许怎样移动"},
        {"id": "tangent", "label": "可行方向落在切线上"},
        {"id": "level-set", "label": "把目标函数看成等高线"},
        {"id": "parallel", "label": "极值处两个梯度平行"},
        {"id": "equation", "label": "写成乘数方程"},
        {"id": "solve", "label": "联立求出候选点"},
    ],
    "capabilities": [
        "连续文字主线",
        "约束曲线与等高线联动",
        "切向量和梯度同步演示",
        "公式语义变形",
        "明暗背景翻转",
    ],
}


class CozeWorkflowError(RuntimeError):
    """Raised when Coze cannot return a usable workflow result."""


class SceneGenerationUnavailableError(RuntimeError):
    """Raised when an arbitrary topic needs Coze but remote use is unavailable."""


class UnsupportedKnowledgeGoalError(SceneGenerationUnavailableError):
    """Backward-compatible alias kept for callers of the former single gate."""


_EXPLICIT_INTEGRAL_NOTATION_RE = re.compile(r"(?:∫|\\int\b)", re.IGNORECASE)
_EXPLICIT_NUMERIC_BOUNDS_RE = re.compile(
    r"(?:从|在)\s*[-+]?\s*(?:\d+(?:\.\d+)?|π|pi|\\pi)\s*"
    r"(?:到|至)\s*[-+]?\s*(?:\d+(?:\.\d+)?|π|pi|\\pi)",
    re.IGNORECASE,
)
_EXPLICIT_INTERVAL_RE = re.compile(
    r"(?:积分|区间).{0,12}[\[(（]\s*[-+]?\s*(?:\d+(?:\.\d+)?|π|pi|\\pi)"
    r"\s*[,，]\s*[-+]?\s*(?:\d+(?:\.\d+)?|π|pi|\\pi)\s*[\])）]",
    re.IGNORECASE,
)
_EXPLICIT_NON_TEMPLATE_FUNCTION_RE = re.compile(
    r"(?:sin|cos|tan|exp|log|ln|sqrt)\s*(?:\(|x)|e\s*\^\s*x|x\s*\^\s*(?:[3-9]|\d{2,})",
    re.IGNORECASE,
)
_CUSTOM_PROBLEM_RE = re.compile(
    r"(?:\d(?:\.\d+)?\s*(?:kg|g|n|m/s|m²|m2|s|hz|v|a|mol|pa|℃|°c)\b|"
    r"(?:已知|给定|计算|求出|求解|例题|数值为)|[=<>≤≥]|∫|\\int)",
    re.IGNORECASE,
)


def _has_explicit_integral_problem(goal: str) -> bool:
    """Keep custom integrands/bounds out of the fixed x-versus-x² page."""
    text = goal.casefold()
    if _EXPLICIT_INTEGRAL_NOTATION_RE.search(text):
        return True
    integral_context = any(
        signal in text
        for signal in ("积分", "黎曼和", "riemann", "area under")
    )
    if not integral_context:
        return False
    return bool(
        _EXPLICIT_NUMERIC_BOUNDS_RE.search(text)
        or _EXPLICIT_INTERVAL_RE.search(text)
        or _EXPLICIT_NON_TEMPLATE_FUNCTION_RE.search(text)
    )


def _looks_like_custom_problem(goal: str) -> bool:
    """Return whether a generic offline lesson could overwrite user data."""
    return bool(_CUSTOM_PROBLEM_RE.search(goal))


def supports_calculus_area_goal(goal: str, source_text: str = "") -> bool:
    """Return whether the checked-in *single-variable area* lesson fits.

    The premium page explains Riemann rectangles and the area between two
    curves.  It must not silently replace a supplied exercise, an integration
    technique lesson, or a different kind of integral merely because the word
    ``积分`` appears in the request.
    """
    if source_text.strip():
        return False
    if _has_explicit_integral_problem(goal):
        return False

    text = goal.casefold()
    excluded_signals = (
        "不定积分", "原函数", "indefinite integral", "antiderivative",
        "分部积分", "integration by parts",
        "换元积分", "换元法", "u-substitution", "substitution method",
        "路径积分", "曲线积分", "线积分", "环路积分", "围道积分",
        "path integral", "line integral", "contour integral",
        "复积分", "复变积分", "complex integral",
        "二重积分", "三重积分", "多重积分", "重积分", "曲面积分",
        "surface integral", "volume integral",
        "勒贝格", "lebesgue", "达布", "darboux", "可积性",
    )
    if any(signal in text for signal in excluded_signals):
        return False

    direct_signals = (
        "黎曼和", "黎曼积分", "riemann sum", "riemann integral",
        "定积分的几何", "定积分几何", "geometric meaning of the definite integral",
        "曲线下面积", "曲线下的面积", "area under the curve",
        "平面区域面积", "平面区域的面积",
    )
    if any(signal in text for signal in direct_signals):
        return True

    area_signals = ("面积", "area")
    definite_signals = ("定积分", "definite integral")
    curve_signals = (
        "曲线围成", "两条曲线", "两曲线", "上减下", "右减左", "窄条", "小矩形",
    )
    return (
        any(signal in text for signal in area_signals)
        and (
            any(signal in text for signal in definite_signals)
            or any(signal in text for signal in curve_signals)
        )
    )


_RIEMANN_HARD_EXCLUSIONS = (
    "路径积分", "曲线积分", "线积分", "环路积分", "围道积分",
    "path integral", "line integral", "contour integral",
    "复积分", "复变积分", "complex integral",
    "二重积分", "三重积分", "多重积分", "重积分", "曲面积分",
    "surface integral", "volume integral",
    "不定积分", "indefinite integral",
)
_RIEMANN_TECHNIQUE_EXCLUSIONS = (
    "分部积分", "integration by parts",
    "换元积分", "换元法", "u-substitution", "substitution method",
    "勒贝格", "lebesgue", "达布", "darboux", "可积性",
)
_RIEMANN_DIRECT_SIGNALS = (
    "黎曼和", "黎曼积分", "riemann sum", "riemann integral",
    "定积分", "definite integral",
    "曲线下面积", "曲线下的面积", "area under the curve",
    "平面区域面积", "平面区域的面积",
)
_RIEMANN_VISUAL_SIGNALS = (
    "分割", "细分", "窄条", "小矩形", "矩形和", "逼近面积", "面积逼近",
    "partition", "rectangle", "approximate the area", "area approximation",
)
_RIEMANN_SAFE_EXPRESSION_NAMES = frozenset({
    "x", "sin", "cos", "tan", "sqrt", "abs", "exp", "log", "pi", "e",
})


def _scene_intent_text(spec: dict[str, Any]) -> str:
    """Return bounded plan-level intent, excluding incidental prose mentions."""
    values = [
        spec.get("title", ""),
        spec.get("topic", ""),
        spec.get("learning_goal", ""),
    ]
    for section in spec.get("sections", []):
        values.append(section.get("heading", ""))
    return "\n".join(str(value) for value in values if value).casefold()[:24000]


def _requires_riemann_sum_demo(
    spec: dict[str, Any],
    *,
    goal: str,
    source_text: str,
) -> bool:
    """Detect lessons whose claimed geometry requires partitions, not a curve.

    Goal/source exclusions have priority.  Model metadata and section headings
    are also considered so a broad goal such as “积分” is still repaired when
    the generated lesson calls itself “黎曼积分的几何直观”.
    """
    requested_text = f"{goal}\n{source_text}".casefold()
    if any(signal in requested_text for signal in _RIEMANN_HARD_EXCLUSIONS):
        return False
    if any(signal in requested_text for signal in _RIEMANN_TECHNIQUE_EXCLUSIONS):
        return False

    scene_text = _scene_intent_text(spec)
    intent_header = "\n".join((
        requested_text,
        str(spec.get("title", "")),
        str(spec.get("topic", "")),
    )).casefold()
    if any(signal in intent_header for signal in _RIEMANN_HARD_EXCLUSIONS):
        return False
    if any(signal in intent_header for signal in _RIEMANN_TECHNIQUE_EXCLUSIONS):
        return False

    combined = f"{requested_text}\n{scene_text}"
    if any(signal in combined for signal in _RIEMANN_DIRECT_SIGNALS):
        return True
    return (
        any(signal in combined for signal in ("面积", "area"))
        and any(signal in combined for signal in _RIEMANN_VISUAL_SIGNALS)
    )


def _riemann_anchor_section(spec: dict[str, Any]) -> str | None:
    markers = (
        "黎曼", "分割", "细分", "窄条", "小矩形", "逼近", "定积分", "面积",
        "riemann", "partition", "rectangle", "definite integral", "area",
    )
    best_section: dict[str, Any] | None = None
    best_score = 0
    for section in spec["sections"]:
        section_text = "\n".join((
            str(section.get("heading", "")),
            *(str(block.get("title", "")) for block in section.get("blocks", [])),
            *(str(block.get("text", "")) for block in section.get("blocks", [])),
        )).casefold()
        score = sum(section_text.count(marker) for marker in markers)
        if score > best_score:
            best_section = section
            best_score = score
    return best_section["id"] if best_section is not None else None


def _safe_curve_for_riemann(
    spec: dict[str, Any],
    anchor_section_id: str,
) -> tuple[int, str, list[float], list[float]] | None:
    """Reuse only a safe curve attached to the same integral section."""
    anchored_plots = [
        (index, demonstration)
        for index, demonstration in enumerate(spec["demonstrations"])
        if demonstration["kind"] == "function_plot"
        and demonstration["anchor_section_id"] == anchor_section_id
    ]
    if len(anchored_plots) != 1:
        return None
    index, demonstration = anchored_plots[0]
    data = demonstration["data"]
    if len(data["series"]) != 1:
        # area_under_curve has one baseline (the x-axis).  Choosing one curve
        # from a multi-curve plot would silently change an area-between-curves
        # lesson into a different problem.
        return None
    expression = data["series"][0]["expression"]
    names = set(re.findall(r"[A-Za-z_][A-Za-z0-9_]*", expression))
    if not names.issubset(_RIEMANN_SAFE_EXPRESSION_NAMES):
        return None
    domain = list(data["domain"])
    plot_range = list(data["range"])
    plot_range = [min(0.0, plot_range[0]), max(0.0, plot_range[1])]
    if plot_range[0] == plot_range[1]:
        plot_range[1] = 1.0
    return index, expression, domain, plot_range


def _section_supports_exact_integral(
    spec: dict[str, Any],
    anchor_section_id: str,
    expression: str,
    lower: float,
    upper: float,
) -> bool:
    """Require the model prose to name the same integrand and interval."""
    section = next(
        (item for item in spec["sections"] if item["id"] == anchor_section_id),
        None,
    )
    if section is None:
        return False
    text = json.dumps(section, ensure_ascii=False).casefold()
    compact = re.sub(r"\s+", "", text).replace("\\left", "").replace("\\right", "")

    function_aliases = {
        "sin": ("sin", "正弦"),
        "cos": ("cos", "余弦"),
        "tan": ("tan", "正切"),
        "exp": ("exp", "指数"),
        "log": ("log", "ln", "对数"),
        "ln": ("ln", "log", "对数"),
        "sqrt": ("sqrt", "根号", "平方根"),
    }
    used_functions = [name for name in function_aliases if name in expression]
    if used_functions:
        if not all(
            any(alias in text for alias in function_aliases[name])
            for name in used_functions
        ):
            return False
    else:
        expression_marker = expression.replace("**", "^").replace(" ", "")
        superscript_marker = expression_marker.replace("^2", "²").replace("^3", "³")
        if expression_marker not in compact and superscript_marker not in compact:
            return False

    def bound_markers(value: float) -> tuple[str, ...]:
        if math.isclose(value, math.pi, rel_tol=0.0, abs_tol=1e-9):
            return ("π", "\\pi")
        if math.isclose(value, -math.pi, rel_tol=0.0, abs_tol=1e-9):
            return ("-π", "-\\pi")
        return (format(value, ".12g"),)

    return (
        any(marker in compact for marker in bound_markers(lower))
        and any(marker in compact for marker in bound_markers(upper))
    )


def _append_automatic_riemann_sum(
    spec: dict[str, Any],
    *,
    goal: str,
    source_text: str,
) -> bool:
    """Enforce one real area/partition demo for a claimed Riemann lesson."""
    demonstrations = spec["demonstrations"]
    if not _requires_riemann_sum_demo(
        spec,
        goal=goal,
        source_text=source_text,
    ):
        return False

    request_text = f"{goal}\n{source_text}"
    exact_integral = (
        parse_simple_integral_source(request_text)
        if _has_explicit_integral_problem(request_text)
        else None
    )
    existing_riemann = [
        demo for demo in demonstrations if demo["kind"] == "riemann_sum"
    ]
    if exact_integral is None and existing_riemann:
        return False

    anchor = _riemann_anchor_section(spec)
    if anchor is None:
        return False

    matching_curve_index: int | None = None
    explicit_repair = exact_integral is not None
    if explicit_repair:
        expression, lower, upper = exact_integral
        if not _section_supports_exact_integral(
            spec,
            anchor,
            expression,
            lower,
            upper,
        ):
            # A matching-looking primitive is insufficient when the prose does
            # not teach the same integrand and bounds.  Remove it so the final
            # quality gate rejects the scene instead of approving a split-brain
            # lesson.
            if existing_riemann:
                demonstrations[:] = [
                    demo for demo in demonstrations if demo["kind"] != "riemann_sum"
                ]
                return True
            return False
        plot_range = simple_expression_plot_range(expression, lower, upper)
        if plot_range is None:
            return False
        domain = [lower, upper]
    elif _has_explicit_integral_problem(request_text):
        # Only the exact, renderer-safe single-variable syntax can be repaired
        # from the learner's request.  More complex integrals remain fail-closed.
        return False
    else:
        anchored_function_plots = [
            demo for demo in demonstrations
            if demo["kind"] == "function_plot"
            and demo["anchor_section_id"] == anchor
        ]
        matching_curve = _safe_curve_for_riemann(spec, anchor)
        if anchored_function_plots and matching_curve is None:
            return False
        if matching_curve is None:
            # Knowledge parameters are not layout defaults.  Inventing x² or
            # [0,1] can contradict a concrete example already present in prose.
            return False
        matching_curve_index, expression, domain, plot_range = matching_curve
    demo_ids = {demo["id"] for demo in demonstrations}
    base_id = f"auto-riemann-{anchor}"[:44].rstrip("-") or "auto-riemann"
    demo_id = base_id
    suffix = 2
    while demo_id in demo_ids:
        demo_id = f"{base_id}-{suffix}"
        suffix += 1

    automatic_demo = {
        "id": demo_id,
        "kind": "riemann_sum",
        "title": "窄条怎样逼近曲线下面积",
        "anchor_section_id": anchor,
        "side": _preferred_demo_side(demonstrations, anchor),
        "data": {
            "mode": "area_under_curve",
            "expression": expression,
            "domain": domain,
            "range": plot_range,
            "n_initial": 8,
            "n_min": 2,
            "n_max": 64,
            "sample": "midpoint",
            "duration_ms": 10000,
        },
    }

    if explicit_repair:
        # The deterministic primitive already renders the requested curve.
        # Replace every model-authored Riemann/plot variant so a wrong x²,
        # interval, or sampling configuration cannot remain beside the exact
        # sin(x), [0,π] reconstruction.
        previous_visuals = [
            demo for demo in demonstrations
            if demo["kind"] in {"function_plot", "riemann_sum"}
        ]
        if previous_visuals:
            automatic_demo["side"] = previous_visuals[0]["side"]
        demonstrations[:] = [
            demo for demo in demonstrations
            if demo["kind"] not in {"function_plot", "riemann_sum"}
        ]

    if matching_curve_index is not None:
        # riemann_sum already draws the curve; replacing the plain plot avoids
        # showing the same representation twice.
        automatic_demo["side"] = demonstrations[matching_curve_index]["side"]
        demonstrations[matching_curve_index] = automatic_demo
        return True

    if len(demonstrations) < 6:
        demonstrations.append(automatic_demo)
        return True

    replacement_priority = (
        "process", "timeline", "concept_map", "probability_bars",
    )
    replace_index = next(
        (
            index
            for kind in replacement_priority
            for index, demo in enumerate(demonstrations)
            if demo["kind"] == kind
        ),
        None,
    )
    if replace_index is None:
        return False
    automatic_demo["side"] = demonstrations[replace_index]["side"]
    demonstrations[replace_index] = automatic_demo
    return True


def _relation_label_key(value: Any) -> str:
    return re.sub(r"[^a-z0-9\u3400-\u9fff]+", "", str(value).casefold())


def _append_automatic_explicit_relation_map(
    spec: dict[str, Any],
    *,
    goal: str,
) -> bool:
    """Rebuild only unambiguous arrow relations written by the learner.

    This is intentionally narrower than natural-language relation extraction.
    The request supplies the endpoints/direction/optional weight; model prose
    must still contain the same objects before Axiom will replace a diagram.
    """
    relations = parse_explicit_relations(goal)
    if not relations:
        return False

    labels: list[str] = []
    for source, target, _ in relations:
        for label in (source, target):
            if _relation_label_key(label) not in {
                _relation_label_key(existing) for existing in labels
            }:
                labels.append(label)

    best_section: dict[str, Any] | None = None
    best_score = 0
    for section in spec["sections"]:
        text = json.dumps(section, ensure_ascii=False).casefold()
        score = sum(_relation_label_key(label) in _relation_label_key(text) for label in labels)
        if score > best_score:
            best_section = section
            best_score = score
    if best_section is None or best_score < min(2, len(labels)):
        return False
    anchor = best_section["id"]

    demonstrations = spec["demonstrations"]

    def relation_mentions(demo: dict[str, Any]) -> int:
        if demo["kind"] not in {"concept_map", "process"}:
            return 0
        compact = _relation_label_key(json.dumps(demo.get("data") or {}, ensure_ascii=False))
        return sum(_relation_label_key(label) in compact for label in labels)

    relevant = [demo for demo in demonstrations if relation_mentions(demo) >= 2]
    replaced_side = relevant[0]["side"] if relevant else ""
    if relevant:
        relevant_ids = {id(demo) for demo in relevant}
        demonstrations[:] = [demo for demo in demonstrations if id(demo) not in relevant_ids]
    elif len(demonstrations) >= 6:
        replace_index = next(
            (
                index for index, demo in enumerate(demonstrations)
                if demo["kind"] in {"concept_map", "process"}
            ),
            None,
        )
        if replace_index is None:
            return False
        replaced_side = demonstrations[replace_index]["side"]
        demonstrations.pop(replace_index)

    node_id_by_key = {
        _relation_label_key(label): f"relation-node-{index}"
        for index, label in enumerate(labels, start=1)
    }
    nodes = [
        {"id": node_id_by_key[_relation_label_key(label)], "label": label}
        for label in labels
    ]
    edges = []
    for source, target, weight in relations:
        edge = {
            "from": node_id_by_key[_relation_label_key(source)],
            "to": node_id_by_key[_relation_label_key(target)],
        }
        if weight is not None:
            edge["label"] = format(weight, ".12g")
        edges.append(edge)

    demo_ids = {demo["id"] for demo in demonstrations}
    base_id = f"auto-relations-{anchor}"[:44].rstrip("-") or "auto-relations"
    demo_id = base_id
    suffix = 2
    while demo_id in demo_ids:
        demo_id = f"{base_id}-{suffix}"
        suffix += 1
    demonstrations.append({
        "id": demo_id,
        "kind": "concept_map",
        "title": "题目给定的方向与关系",
        "anchor_section_id": anchor,
        "side": replaced_side or _preferred_demo_side(demonstrations, anchor),
        "semantic_ids": [],
        "data": {"nodes": nodes, "edges": edges},
    })
    return True


def _physics_number(value: Any) -> str:
    return format(float(value), ".12g")


def _physics_claim_text(value: Any) -> str:
    """Flatten one normalized block/summary without treating layout as content."""
    values: list[str] = []

    def visit(item: Any) -> None:
        if isinstance(item, str):
            values.append(item)
        elif isinstance(item, dict):
            for child in item.values():
                visit(child)
        elif isinstance(item, list):
            for child in item:
                visit(child)

    visit(value)
    text = "\n".join(values)
    text = text.replace("−", "-").replace("–", "-").replace("—", "-")
    text = text.replace("\\,", "").replace("\\;", "")
    for _ in range(2):
        text = re.sub(r"\\(?:mathrm|text)\s*\{([^{}]*)\}", r"\1", text)
    return text.replace("{", "").replace("}", "").replace("\\", "")


def _is_newton_quantitative_claim(value: Any) -> bool:
    """Identify numerical Newton work that an exact P01 rebuild must replace."""
    text = _physics_claim_text(value)
    folded = re.sub(r"\s+", "", text).casefold()
    markers = (
        "质量", "拉力", "摩擦力", "合力", "净力", "加速度",
        "向右", "向左", "f_net", "fmathrmnet", "fnet", "f_x",
        "fx=", "f=", "sumf", "σf", "a=", "a_x", "ax=",
    )
    has_marker = any(marker in folded for marker in markers)
    has_physical_value = re.search(
        r"(?:\d+(?:\.\d+)?|\.\d+)\s*"
        r"(?:kg|千克|公斤|n\b|牛顿|m\s*/\s*s\s*(?:²|\^?\s*2)|米每二次方秒)",
        text,
        flags=re.IGNORECASE,
    ) is not None
    equation_numbers = re.findall(r"(?<![A-Za-z])(?:\d+(?:\.\d+)?|\.\d+)", text)
    has_numeric_equation = "=" in text and bool(equation_numbers)
    force_equation = (
        "=" in text
        and re.search(r"(?:\d+(?:\.\d+)?|\.\d+)\s*(?:n\b|牛顿)", text, re.IGNORECASE)
        is not None
    )
    return force_equation or (has_marker and (has_physical_value or has_numeric_equation))


def _exact_newton_derivation_steps(expected: dict[str, Any]) -> list[dict[str, str]]:
    mass = _physics_number(expected["mass_kg"])
    right_force = _physics_number(expected["right_force_n"])
    left_force = _physics_number(expected["left_force_n"])
    net_force = _physics_number(expected["net_force_n"])
    acceleration = _physics_number(expected["acceleration_m_s2"])
    return [
        {
            "latex": (
                f"F_{{\\rightarrow}}=+{right_force}\\,\\mathrm{{N}},\\quad"
                f"F_{{\\leftarrow}}=-{left_force}\\,\\mathrm{{N}}"
            ),
            "note": "取向右为正，把两条水平力写成带符号的量",
        },
        {
            "latex": (
                f"F_{{\\mathrm{{net}}}}={right_force}\\,\\mathrm{{N}}"
                f"-{left_force}\\,\\mathrm{{N}}={net_force}\\,\\mathrm{{N}}"
            ),
            "note": "合力为正，因此方向向右",
        },
        {
            "latex": "a=\\frac{F_{\\mathrm{net}}}{m}",
            "note": "由牛顿第二定律解出加速度",
        },
        {
            "latex": (
                f"a=\\frac{{{net_force}\\,\\mathrm{{N}}}}{{{mass}\\,\\mathrm{{kg}}}}"
                f"={acceleration}\\,\\mathrm{{m/s^2}}"
            ),
            "note": "加速度为正，因此方向向右",
        },
    ]


def _exact_newton_blocks(expected: dict[str, Any]) -> list[dict[str, Any]]:
    mass = _physics_number(expected["mass_kg"])
    right_force = _physics_number(expected["right_force_n"])
    left_force = _physics_number(expected["left_force_n"])
    net_force = _physics_number(expected["net_force_n"])
    acceleration = _physics_number(expected["acceleration_m_s2"])
    return [
        {
            "kind": "example",
            "prompt": (
                f"质量 {mass} kg 的物体只受水平方向向右 {right_force} N 拉力和"
                f"向左 {left_force} N 摩擦力。"
            ),
            "steps": [],
            "result": (
                f"合力为 {net_force} N，方向向右；"
                f"加速度为 {acceleration} m/s²，方向向右。"
            ),
        },
        {
            "kind": "derivation",
            "title": "由两条水平力得到加速度",
            "steps": _exact_newton_derivation_steps(expected),
        },
    ]


def _repair_exact_newton_content(spec: dict[str, Any], expected: dict[str, Any]) -> bool:
    """Replace only numerical P01 work while preserving conceptual prose."""
    anchor = _physics_anchor_section(
        spec,
        markers=("拉力", "摩擦力", "合力", "加速度"),
    ) or spec["sections"][-1]["id"]
    removed_semantic_ids: set[str] = set()
    changed = False

    for section in spec["sections"]:
        kept_blocks: list[dict[str, Any]] = []
        for block in section["blocks"]:
            if _is_newton_quantitative_claim(block):
                removed_semantic_ids.update(block.get("semantic_ids") or [])
                changed = True
            else:
                kept_blocks.append(block)
        if not kept_blocks:
            kept_blocks.append({
                "kind": "paragraph",
                "text": "先按选定的正方向合成水平力，再用 a=F_net/m 求加速度。",
            })
        section["blocks"] = kept_blocks

    anchor_section = next(
        section for section in spec["sections"] if section["id"] == anchor
    )
    while len(anchor_section["blocks"]) > 6:
        displaced = anchor_section["blocks"].pop()
        removed_semantic_ids.update(displaced.get("semantic_ids") or [])
    anchor_section["blocks"].extend(_exact_newton_blocks(expected))

    if removed_semantic_ids:
        original_count = len(spec["demonstrations"])
        spec["demonstrations"] = [
            demo for demo in spec["demonstrations"]
            if not removed_semantic_ids.intersection(demo.get("semantic_ids") or [])
        ]
        changed = len(spec["demonstrations"]) != original_count or changed
    return True


def _repair_exact_newton_summary(spec: dict[str, Any], expected: dict[str, Any]) -> bool:
    exact_summary = (
        f"本题合力为 {_physics_number(expected['net_force_n'])} N，方向向右；"
        f"加速度为 {_physics_number(expected['acceleration_m_s2'])} m/s²，方向向右。"
    )
    kept = [
        item for item in spec["summary"]
        if not _is_newton_quantitative_claim(item)
    ]
    rebuilt = kept[:5]
    rebuilt.append(exact_summary)
    if len(rebuilt) < 2:
        rebuilt.insert(0, "先按方向合成全部受力，再把合力代入牛顿第二定律。")
    changed = rebuilt != spec["summary"]
    spec["summary"] = rebuilt
    return changed


def _is_faraday_rebuild_claim(value: Any) -> bool:
    """Identify P02 conditions/results that the exact rebuild must own."""
    text = _physics_claim_text(value)
    folded = re.sub(r"\s+", "", text).casefold()
    markers = (
        "线圈", "匝", "面积", "磁场", "磁通", "电动势", "法拉第",
        "楞次", "epsilon", "varepsilon", "mathcale", "ε", "δb", "δφ",
        "deltab", "deltaphi",
    )
    has_marker = any(marker in folded for marker in markers)
    has_physical_value = re.search(
        r"(?:\d+(?:\.\d+)?|\.\d+)\s*"
        r"(?:匝|m\s*(?:²|\^\s*2)|平方米|t\b|特斯拉|s\b|秒|v\b|伏特|wb\b|韦伯)",
        text,
        flags=re.IGNORECASE,
    ) is not None
    has_numeric_equation = "=" in text and re.search(r"\d", text) is not None
    directional_current = re.search(
        r"(?:感应)?电流[^。；\n]{0,28}(?:顺时针|逆时针)|"
        r"(?:顺时针|逆时针)[^。；\n]{0,28}(?:感应)?电流",
        text,
    ) is not None
    field_direction = re.search(
        r"磁场[^。；\n]{0,28}(?:纸面向外|纸面向内|出纸面|入纸面)|"
        r"(?:纸面向外|纸面向内|出纸面|入纸面)[^。；\n]{0,28}磁场",
        text,
    ) is not None
    return directional_current or field_direction or (
        has_marker and (has_physical_value or has_numeric_equation)
    )


def _request_states_faraday_answer(text: str) -> bool:
    """Keep supplied P02 answers model-reviewed instead of overwriting them."""
    normalized = _physics_claim_text(text)
    if re.search(
        r"[-+]?(?:\d+(?:\.\d+)?|\.\d+)\s*(?:V\b|伏特)",
        normalized,
        flags=re.IGNORECASE,
    ):
        return True
    for statement in re.split(r"[。；;\n]+", normalized):
        if not re.search(r"顺时针|逆时针", statement):
            continue
        if re.search(r"(?:答案|结论|求得|算得|计算得|可得|故|所以|因此)", statement):
            return True
        if re.search(r"(?:感应)?电流", statement) and not re.search(
            r"(?:求|判断|问|哪|是否|还是|或)",
            statement,
        ):
            return True
    return False


def _exact_faraday_derivation_steps(expected: dict[str, Any]) -> list[dict[str, str]]:
    turns = _physics_number(expected["turns"])
    area = _physics_number(expected["area_m2"])
    field_start = _physics_number(expected["field_start_t"])
    field_end = _physics_number(expected["field_end_t"])
    duration = _physics_number(expected["change_duration_s"])
    delta_field = _physics_number(
        float(expected["field_end_t"]) - float(expected["field_start_t"])
    )
    delta_flux = _physics_number(
        float(expected["area_m2"])
        * (float(expected["field_end_t"]) - float(expected["field_start_t"]))
    )
    emf = _physics_number(expected["emf_v"])
    return [
        {
            "latex": (
                f"\\Delta B=B_2-B_1={field_end}\\,\\mathrm{{T}}"
                f"-{field_start}\\,\\mathrm{{T}}={delta_field}\\,\\mathrm{{T}}"
            ),
            "note": "垂直纸面向外的磁场均匀增强",
        },
        {
            "latex": (
                f"\\Delta\\Phi=A\\Delta B={area}\\,\\mathrm{{m^2}}"
                f"\\times {delta_field}\\,\\mathrm{{T}}={delta_flux}\\,\\mathrm{{Wb}}"
            ),
            "note": f"单匝磁通量增加 {delta_flux} Wb",
        },
        {
            "latex": "\\mathcal{E}=-N\\frac{\\Delta\\Phi}{\\Delta t}",
            "note": "法拉第定律的负号编码楞次定律",
        },
        {
            "latex": (
                f"\\mathcal{{E}}=-{turns}\\times"
                f"\\frac{{{delta_flux}\\,\\mathrm{{Wb}}}}{{{duration}\\,\\mathrm{{s}}}}"
                f"={emf}\\,\\mathrm{{V}}"
            ),
            "note": "代入匝数、磁通变化和时间",
        },
        {
            "latex": (
                f"\\mathcal{{E}}={emf}\\,\\mathrm{{V}}<0"
                r"\quad\Rightarrow\quad I_{\mathrm{ind}}:\ \text{顺时针}"
            ),
            "note": "逆时针为正；顺时针电流产生向内磁场，阻碍向外磁通量增加",
        },
    ]


def _exact_faraday_source_note(source_text: str) -> str:
    """Preserve only two trusted P02 assumptions from supplied material.

    The deterministic rebuild must not erase learner-provided grounding, but it
    must also never copy arbitrary source text into the lesson.  These two
    facts are narrowly useful for the signed-current conclusion and can be
    emitted as fixed canonical prose after a positive, non-directive match.
    """
    facts: list[str] = []
    for statement in re.split(r"[。；;\n]+", _physics_claim_text(source_text)):
        compact = re.sub(r"\s+", "", statement)
        if not compact or re.search(r"不要|不应|禁止|忽略|并非|不是|不为|非正", compact):
            continue
        if re.search(r"(?:线圈)?电阻(?:值)?为正", compact):
            facts.append("线圈电阻为正")
        if re.search(r"磁场正方向(?:取|规定)?为(?:垂直纸面)?(?:向外|出纸面)", compact):
            facts.append("磁场正方向为出纸面")
    if not facts:
        return ""
    return "题面补充：" + "；".join(dict.fromkeys(facts)) + "。"


def _exact_faraday_blocks(
    expected: dict[str, Any],
    *,
    source_text: str = "",
) -> list[dict[str, Any]]:
    turns = _physics_number(expected["turns"])
    area = _physics_number(expected["area_m2"])
    field_start = _physics_number(expected["field_start_t"])
    field_end = _physics_number(expected["field_end_t"])
    duration = _physics_number(expected["change_duration_s"])
    delta_flux = _physics_number(
        float(expected["area_m2"])
        * (float(expected["field_end_t"]) - float(expected["field_start_t"]))
    )
    emf = _physics_number(expected["emf_v"])
    source_note = _exact_faraday_source_note(source_text)
    return [
        {
            "kind": "example",
            "prompt": (
                f"{turns} 匝、面积为 {area} m² 的线圈中，垂直纸面向外的磁场"
                f"在 {duration} s 内从 {field_start} T 均匀增至 {field_end} T。"
                f"{source_note}以逆时针电动势为正。"
            ),
            "steps": [],
            "result": (
                f"单匝磁通量增加 {delta_flux} Wb。感应电动势为 {emf} V，"
                "在逆时针为正的约定下，负号表示感应电流沿顺时针方向。"
                "向外磁通量增加时，顺时针电流产生向内磁场，阻碍磁通量增加。"
            ),
        },
        {
            "kind": "derivation",
            "title": "由磁场变化得到电动势与电流方向",
            "steps": _exact_faraday_derivation_steps(expected),
        },
    ]


def _repair_exact_faraday_content(
    spec: dict[str, Any],
    expected: dict[str, Any],
    *,
    source_text: str = "",
) -> bool:
    """Replace only P02-specific claims while keeping conceptual explanations."""
    anchor = _physics_anchor_section(
        spec,
        markers=("磁场", "磁通", "电动势", "顺时针", "楞次"),
    ) or spec["sections"][-1]["id"]
    removed_semantic_ids: set[str] = set()

    for section in spec["sections"]:
        kept_blocks: list[dict[str, Any]] = []
        for block in section["blocks"]:
            if _is_faraday_rebuild_claim(block):
                removed_semantic_ids.update(block.get("semantic_ids") or [])
            else:
                kept_blocks.append(block)
        if not kept_blocks:
            kept_blocks.append({
                "kind": "paragraph",
                "text": "先确定磁通量怎样变化，再用法拉第定律求电动势，并用楞次定律判断方向。",
            })
        section["blocks"] = kept_blocks

    anchor_section = next(
        section for section in spec["sections"] if section["id"] == anchor
    )
    while len(anchor_section["blocks"]) > 6:
        displaced = anchor_section["blocks"].pop()
        removed_semantic_ids.update(displaced.get("semantic_ids") or [])
    anchor_section["blocks"].extend(
        _exact_faraday_blocks(expected, source_text=source_text)
    )

    if removed_semantic_ids:
        spec["demonstrations"] = [
            demo for demo in spec["demonstrations"]
            if not removed_semantic_ids.intersection(demo.get("semantic_ids") or [])
        ]
    return True


def _repair_exact_faraday_summary(spec: dict[str, Any], expected: dict[str, Any]) -> bool:
    delta_flux = _physics_number(
        float(expected["area_m2"])
        * (float(expected["field_end_t"]) - float(expected["field_start_t"]))
    )
    exact_summary = (
        f"本题单匝磁通量增加 {delta_flux} Wb，感应电动势为 "
        f"{_physics_number(expected['emf_v'])} V；逆时针为正，因此感应电流沿顺时针方向。"
    )
    kept = [
        item for item in spec["summary"]
        if not _is_faraday_rebuild_claim(item)
    ]
    rebuilt = kept[:5]
    rebuilt.append(exact_summary)
    if len(rebuilt) < 2:
        rebuilt.insert(0, "感应电流产生的磁场总会阻碍原磁通量的变化。")
    changed = rebuilt != spec["summary"]
    spec["summary"] = rebuilt
    return changed


def _physics_anchor_section(
    spec: dict[str, Any],
    *,
    markers: tuple[str, ...],
) -> str | None:
    best_section: dict[str, Any] | None = None
    best_score = 0
    for section in spec["sections"]:
        text = json.dumps(section, ensure_ascii=False).casefold()
        score = sum(marker.casefold() in text for marker in markers)
        if score > best_score:
            best_section = section
            best_score = score
    return best_section["id"] if best_section is not None and best_score >= 2 else None


def _install_exact_physics_demo(
    spec: dict[str, Any],
    *,
    kind: str,
    anchor: str,
    title: str,
    data: dict[str, Any],
) -> bool:
    demonstrations = spec["demonstrations"]
    existing = [demo for demo in demonstrations if demo["kind"] == kind]
    replaced_side = existing[0]["side"] if existing else ""
    if existing:
        existing_ids = {id(demo) for demo in existing}
        demonstrations[:] = [demo for demo in demonstrations if id(demo) not in existing_ids]
    elif len(demonstrations) >= 6:
        replace_index = next(
            (
                index for index, demo in enumerate(demonstrations)
                if demo["kind"] in {
                    "function_plot", "concept_map", "process", "timeline",
                    "probability_bars", "geometry",
                }
            ),
            len(demonstrations) - 1,
        )
        replaced_side = demonstrations[replace_index]["side"]
        demonstrations.pop(replace_index)

    demo_ids = {demo["id"] for demo in demonstrations}
    base_id = f"auto-physics-{anchor}"[:44].rstrip("-") or "auto-physics"
    demo_id = base_id
    suffix = 2
    while demo_id in demo_ids:
        demo_id = f"{base_id}-{suffix}"
        suffix += 1
    demonstrations.append({
        "id": demo_id,
        "kind": kind,
        "title": title,
        "anchor_section_id": anchor,
        "side": replaced_side or _preferred_demo_side(demonstrations, anchor),
        "semantic_ids": [],
        "data": data,
    })
    return True


def _install_exact_companion_morph(
    spec: dict[str, Any],
    *,
    anchor: str,
    title: str,
    steps: list[dict[str, str]],
    related_claim: Callable[[Any], bool],
) -> bool:
    """Install one exact derivation companion without deleting unrelated morphs."""
    demonstrations = spec["demonstrations"]
    related_morphs = [
        demo for demo in demonstrations
        if demo["kind"] == "equation_morph" and related_claim(demo.get("data") or {})
    ]
    replaced_side = related_morphs[0]["side"] if related_morphs else ""
    if related_morphs:
        related_ids = {id(demo) for demo in related_morphs}
        demonstrations[:] = [
            demo for demo in demonstrations if id(demo) not in related_ids
        ]

    if len(demonstrations) >= 6:
        replacement_priority = (
            "function_plot", "concept_map", "process", "timeline",
            "probability_bars", "geometry", "linked_lab", "riemann_sum",
            "constraint_geometry", "constrained_extremum_2d", "limit_microscope",
        )
        replace_index = next(
            (
                index
                for kind in replacement_priority
                for index, demo in enumerate(demonstrations)
                if demo["kind"] == kind
            ),
            next(
                (
                    index for index, demo in enumerate(demonstrations)
                    if demo["kind"] not in {
                        "equation_morph", "force_diagram", "field_experiment",
                    }
                ),
                None,
            ),
        )
        if replace_index is None:
            return False
        replaced_side = demonstrations[replace_index]["side"]
        demonstrations.pop(replace_index)

    demo_ids = {demo["id"] for demo in demonstrations}
    base_id = f"auto-companion-{anchor}"[:44].rstrip("-") or "auto-companion"
    demo_id = base_id
    suffix = 2
    while demo_id in demo_ids:
        demo_id = f"{base_id}-{suffix}"
        suffix += 1
    demonstrations.append({
        "id": demo_id,
        "kind": "equation_morph",
        "title": title,
        "anchor_section_id": anchor,
        "side": replaced_side or _preferred_demo_side(demonstrations, anchor),
        "semantic_ids": [],
        "data": {"steps": copy.deepcopy(steps)},
    })
    return True


def _repair_explicit_physics_demonstrations(
    spec: dict[str, Any],
    *,
    goal: str,
    source_text: str,
) -> bool:
    """Repair exact physics contracts from uniquely supplied learner inputs."""
    request_text = f"{goal}\n{source_text}"
    changed = False

    newton = parse_explicit_newton_problem(request_text)
    newton_anchor: str | None = None
    if newton is not None:
        # For this fully determined P01 slice, make the learner-facing
        # calculation canonical even when the model happened to get it right.
        # This also removes a correct-looking answer that coexists with a
        # contradictory numerical block elsewhere in the scene.
        changed = _repair_exact_newton_content(spec, newton) or changed
        changed = _repair_exact_newton_summary(spec, newton) or changed
        content_text = scene_content_text(spec)
        newton_anchor = _physics_anchor_section(
            spec,
            markers=("拉力", "摩擦力", "合力", "加速度"),
        )
    if newton is not None and newton_content_matches_problem(content_text, newton):
        force_diagrams = [
            demo for demo in spec["demonstrations"] if demo["kind"] == "force_diagram"
        ]
        already_exact = (
            len(force_diagrams) == 1
            and force_diagram_matches_problem(force_diagrams[0], newton)
        )
        if not already_exact:
            if newton_anchor is not None:
                changed = _install_exact_physics_demo(
                    spec,
                    kind="force_diagram",
                    anchor=newton_anchor,
                    title="两力的方向、大小与合力",
                    data={
                        "body_label": f"{_physics_number(newton['mass_kg'])} kg",
                        "vectors": [
                            {
                                "label": f"{_physics_number(newton['right_force_n'])} N 拉力",
                                "angle": 0.0,
                                "magnitude": float(newton["right_force_n"]),
                            },
                            {
                                "label": f"{_physics_number(newton['left_force_n'])} N 摩擦力",
                                "angle": 180.0,
                                "magnitude": float(newton["left_force_n"]),
                            },
                        ],
                    },
                ) or changed
        if newton_anchor is not None:
            changed = _install_exact_companion_morph(
                spec,
                anchor=newton_anchor,
                title="由两条水平力得到加速度",
                steps=_exact_newton_derivation_steps(newton),
                related_claim=_is_newton_quantitative_claim,
            ) or changed

    content_text = scene_content_text(spec)
    faraday = parse_explicit_faraday_problem(request_text)
    faraday_repairable = (
        faraday is not None and not _request_states_faraday_answer(request_text)
    )
    faraday_anchor: str | None = None
    if faraday_repairable:
        assert faraday is not None
        changed = _repair_exact_faraday_content(
            spec,
            faraday,
            source_text=source_text,
        ) or changed
        changed = _repair_exact_faraday_summary(spec, faraday) or changed
        content_text = scene_content_text(spec)
        faraday_anchor = _physics_anchor_section(
            spec,
            markers=("磁场", "磁通", "电动势", "顺时针", "楞次"),
        )
    if (
        faraday_repairable
        and faraday is not None
        and faraday_content_matches_problem(content_text, faraday)
    ):
        field_demos = [
            demo for demo in spec["demonstrations"] if demo["kind"] == "field_experiment"
        ]
        already_exact = (
            len(field_demos) == 1
            and field_experiment_matches_problem(field_demos[0], faraday)
        )
        if not already_exact:
            if faraday_anchor is not None:
                changed = _install_exact_physics_demo(
                    spec,
                    kind="field_experiment",
                    anchor=faraday_anchor,
                    title="磁场增加时的感应电动势与方向",
                    data={
                        "mode": "faraday_loop",
                        "turns": int(faraday["turns"]),
                        "area": float(faraday["area_m2"]),
                        "orientation_deg": float(faraday["orientation_deg"]),
                        "field_start": float(faraday["field_start_t"]),
                        "field_end": float(faraday["field_end_t"]),
                        "change_duration_s": float(faraday["change_duration_s"]),
                        "duration_ms": 9000,
                    },
                ) or changed
        if faraday_anchor is not None:
            changed = _install_exact_companion_morph(
                spec,
                anchor=faraday_anchor,
                title="由磁场变化得到电动势与电流方向",
                steps=_exact_faraday_derivation_steps(faraday),
                related_claim=_is_faraday_rebuild_claim,
            ) or changed
    return changed


def supports_lagrange_multiplier_goal(goal: str, source_text: str = "") -> bool:
    """Return whether the fixed premium Lagrange scene answers the request.

    The premium page teaches the geometric principle through one canonical
    unit-circle example.  Supplied notes and explicitly different problems must
    continue to the universal workflow instead of being silently replaced.
    """
    if source_text.strip():
        return False

    text = goal.casefold()
    excluded_signals = (
        "拉格朗日插值",
        "lagrange interpolation",
        "拉格朗日力学",
        "lagrangian mechanics",
        "欧拉—拉格朗日",
        "euler-lagrange",
        "kkt",
        "不等式约束",
        "多个约束",
        "多重约束",
        "椭圆",
        "椭球",
        "球面",
        "双曲线",
        "抛物面",
        "三维",
    )
    if any(signal in text for signal in excluded_signals):
        return False

    direct_signals = (
        "拉格朗日乘数法",
        "拉格朗日乘子法",
        "lagrange multiplier",
    )
    explanation_signals = (
        "为什么",
        "原理",
        "几何",
        "梯度平行",
        "等高线",
        "相切",
        "单位圆",
        "x+2y",
        "x + 2y",
        "why",
        "geometric",
        "geometry",
        "unit circle",
    )
    if (
        any(signal in text for signal in direct_signals)
        and any(signal in text for signal in explanation_signals)
    ):
        return True

    constraint_signals = ("约束优化", "条件极值", "约束极值", "约束条件")
    geometric_signals = ("梯度平行", "等高线", "相切", "梯度")
    return (
        any(signal in text for signal in constraint_signals)
        and any(signal in text for signal in geometric_signals)
    )


_SIMPLE_HARMONIC_FAMILY_SIGNALS = (
    "简谐运动", "谐振子", "simple harmonic",
)


def _is_simple_harmonic_motion_family(goal: str) -> bool:
    text = goal.casefold()
    return any(signal in text for signal in _SIMPLE_HARMONIC_FAMILY_SIGNALS)


def _allows_shm_presentation_directive(source_text: str) -> bool:
    """Allow only presentation constraints already satisfied by the fixture."""
    raw = source_text.strip()
    if not raw:
        return True
    text = raw.casefold()
    if any(marker in raw for marker in ("=", "∫", "\\", "→", "⇒")):
        return False
    if re.search(r"\d", raw):
        return False
    if any(signal in text for signal in (
        "周期", "频率", "能量", "相空间", "振幅", "初始条件", "实验", "测得",
        "量子", "受力", "弹簧", "period", "frequency", "energy", "phase space",
        "amplitude", "initial condition", "experiment", "quantum", "force",
    )):
        return False
    allowed_signals = (
        "普通代数", "代数整理", "单列", "推导步骤", "排版", "格式", "风格",
        "动画", "演示", "文字", "正文", "不要重复", "只讲速度和加速度的相位",
    )
    return any(signal in text for signal in allowed_signals)


def supports_simple_harmonic_motion_goal(goal: str, source_text: str = "") -> bool:
    """Select the reviewed x→v→a phase lesson only for that exact action."""
    if not _allows_shm_presentation_directive(source_text):
        return False
    text = goal.casefold()
    if not _is_simple_harmonic_motion_family(text):
        return False
    if any(signal in text for signal in (
        "阻尼", "受迫", "驱动", "耦合", "非线性", "混沌", "能量", "相空间",
        "周期", "频率", "量子", "多维", "初始条件", "受力", "弹簧振子",
        "最大速度", "最大加速度", "已知", "给定", "计算", "求出", "求解",
        "damped", "forced", "driven", "coupled", "nonlinear", "chaos",
        "energy", "phase space", "period", "frequency", "quantum", "initial",
        "maximum velocity", "maximum acceleration", "calculate", "solve",
    )):
        return False

    displacement = any(signal in text for signal in (
        "位移", "x(t)", "displacement",
    ))
    velocity = any(signal in text for signal in (
        "速度", "v(t)", "velocity",
    ))
    acceleration = any(signal in text for signal in (
        "加速度", "a(t)", "acceleration",
    ))
    phase = any(signal in text for signal in ("相位", "phase"))
    derivative = any(signal in text for signal in (
        "求导", "连续推导", "导数", "derivative", "differentiate",
    ))
    return (
        (velocity and acceleration)
        or (phase and sum((displacement, velocity, acceleration)) >= 2)
        or (displacement and acceleration)
        or ("x(t)" in text and derivative and (velocity or acceleration))
    )


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def _bounded_text(value: Any, fallback: str, limit: int) -> str:
    text = str(value or "").strip()
    return text[:limit] if text else fallback


def _decode_json_value(value: Any) -> Any:
    """Decode JSON strings commonly returned by Coze end nodes."""
    current = value
    for _ in range(3):
        if not isinstance(current, str):
            break
        text = current.strip()
        if text.startswith("```json") and text.endswith("```"):
            text = text[7:-3].strip()
        elif text.startswith("```") and text.endswith("```"):
            text = text[3:-3].strip()
        if not text:
            return {}
        try:
            current = json.loads(text)
        except json.JSONDecodeError:
            break
    return current


def _extract_scene_candidate(payload: Any) -> dict[str, Any]:
    value = _decode_json_value(payload)
    wrapper_keys = (
        "scene_spec",
        "reviewed_scene_json",
        "draft_scene_json",
        "scene_json",
        "scene",
        "output",
        "result",
    )
    for _ in range(6):
        if not isinstance(value, dict):
            raise CozeWorkflowError("扣子工作流没有返回 JSON 对象")
        nested_value = None
        for key in wrapper_keys:
            if key not in value:
                continue
            nested = _decode_json_value(value[key])
            if isinstance(nested, dict):
                nested_value = nested
                break
        if nested_value is None:
            break
        value = nested_value
    return value


def _extract_workflow_outputs(payload: Any) -> tuple[dict[str, Any], Any]:
    """Preserve sibling End outputs before legacy scene unwrapping.

    Older workflows expose only ``output``.  Newer workflows expose the same
    scene output plus an independent ``animation_patch`` string.  Searching for
    the named pair first is essential: ``_extract_scene_candidate`` deliberately
    descends into ``output`` and would otherwise discard the sibling patch.
    """
    value = _decode_json_value(payload)

    def find_named_outputs(current: Any, depth: int = 0) -> tuple[Any, Any] | None:
        if depth >= 6:
            return None
        decoded = _decode_json_value(current)
        if not isinstance(decoded, dict):
            return None
        if "animation_patch" in decoded:
            for scene_key in (
                "output",
                "scene_spec",
                "reviewed_scene_json",
                "draft_scene_json",
                "scene_json",
                "scene",
            ):
                if scene_key in decoded:
                    return decoded[scene_key], decoded["animation_patch"]
            raise CozeWorkflowError("扣子结束节点返回了 animation_patch，但缺少正文 output")
        for wrapper_key in ("data", "result"):
            if wrapper_key not in decoded:
                continue
            found = find_named_outputs(decoded[wrapper_key], depth + 1)
            if found is not None:
                return found
        return None

    named = find_named_outputs(value)
    if named is None:
        return _extract_scene_candidate(value), None

    scene_payload, patch_payload = named
    decoded_patch = _decode_json_value(patch_payload)
    if decoded_patch in (None, ""):
        decoded_patch = None
    return _extract_scene_candidate(scene_payload), decoded_patch


def _call_coze(goal: str, source_text: str) -> tuple[dict[str, Any], Any]:
    if not COZE_API_TOKEN or not COZE_WORKFLOW_ID:
        raise CozeWorkflowError("扣子通用知识场景工作流尚未配置")

    parameters = {
        "goal": goal,
        "source_text": source_text,
        "scene_contract_json": json.dumps(
            scene_writer_contract_summary(goal, source_text),
            ensure_ascii=False,
        ),
        "quality_mode": "balanced",
    }
    request_body = json.dumps(
        {"workflow_id": COZE_WORKFLOW_ID, "parameters": parameters},
        ensure_ascii=False,
    ).encode("utf-8")
    request = urllib.request.Request(
        f"{COZE_API_BASE}/v1/workflow/run",
        data=request_body,
        method="POST",
        headers={
            "Authorization": f"Bearer {COZE_API_TOKEN}",
            "Content-Type": "application/json",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=COZE_TIMEOUT_SECONDS) as response:
            raw_body = response.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")[:300]
        raise CozeWorkflowError(f"扣子请求失败（HTTP {exc.code}）：{detail}") from exc
    except (urllib.error.URLError, TimeoutError) as exc:
        raise CozeWorkflowError(f"无法连接扣子工作流：{exc}") from exc

    try:
        response_body = json.loads(raw_body)
    except json.JSONDecodeError as exc:
        raise CozeWorkflowError("扣子返回了无法解析的响应") from exc

    code = response_body.get("code", 0)
    if code not in (0, "0", None):
        message = response_body.get("msg") or response_body.get("message") or "未知错误"
        raise CozeWorkflowError(f"扣子工作流执行失败（{code}）：{message}")
    return _extract_workflow_outputs(response_body.get("data", response_body))


def _generation(
    provider: str,
    fallback_reason: str = "",
    *,
    quality_report: dict[str, Any] | None = None,
) -> dict[str, Any]:
    report = quality_report or {
        "passed": True,
        "score": 100,
        "version": QUALITY_GATE_VERSION,
    }
    return {
        "provider": provider,
        "workflow_id": COZE_WORKFLOW_ID if provider == "coze" else "",
        "generated_at": _now_iso(),
        "fallback_reason": fallback_reason[:360],
        "quality_status": "approved" if report.get("passed") else "rejected",
        "quality_score": int(report.get("score", 0)),
        "quality_version": str(report.get("version") or QUALITY_GATE_VERSION),
    }


def _build_static_manifest(
    goal: str,
    *,
    fallback_reason: str,
    template_id: str = LEGACY_TEMPLATE_ID,
    template: dict[str, Any] | None = None,
) -> dict[str, Any]:
    if template is None:
        template = LEGACY_CALCULUS_TEMPLATE
    return {
        "schema_version": "2.0",
        "scene_id": f"scene_{uuid.uuid4().hex[:12]}",
        "template_id": template_id,
        "title": template["title"],
        "topic": template["topic"],
        "subject": template["subject"],
        "learning_goal": goal,
        "renderer": template["renderer"],
        "learning_path": template["learning_path"],
        "capabilities": template["capabilities"],
        "generation": _generation("demo", fallback_reason),
    }


def _build_lagrange_multiplier_manifest(goal: str, *, reason: str) -> dict[str, Any]:
    return _build_static_manifest(
        goal,
        fallback_reason=reason,
        template_id=LAGRANGE_MULTIPLIER_TEMPLATE_ID,
        template=LAGRANGE_MULTIPLIER_TEMPLATE,
    )


def _structured_capabilities(spec: dict[str, Any]) -> list[str]:
    labels = {
        "constrained_extremum_2d": "二维约束极值联动演示",
        "constraint_geometry": "约束拖动与几何不变量",
        "equation_morph": "公式关键步演示",
        "field_experiment": "场与测量联动实验",
        "function_plot": "函数与数据图像",
        "geometry": "几何关系演示",
        "limit_microscope": "极限与误差显微镜",
        "linked_lab": "共享参数多表征实验",
        "force_diagram": "受力与向量图",
        "concept_map": "概念关系图",
        "timeline": "时间线",
        "probability_bars": "概率分布演示",
        "process": "过程与因果链",
        "riemann_sum": "黎曼窄条与面积逼近",
    }
    kinds = {demo["kind"] for demo in spec["demonstrations"]}
    return ["连续文字主线", "确定性安全渲染", *[
        labels[kind] for kind in ALLOWED_DEMONSTRATION_KINDS if kind in kinds
    ]]


def _preferred_demo_side(
    demonstrations: list[dict[str, Any]],
    anchor_section_id: str,
) -> str:
    local_counts = {
        side: sum(
            demo["anchor_section_id"] == anchor_section_id and demo["side"] == side
            for demo in demonstrations
        )
        for side in ("left", "right")
    }
    global_counts = {
        side: sum(demo["side"] == side for demo in demonstrations)
        for side in ("left", "right")
    }
    if local_counts["left"] != local_counts["right"]:
        return min(local_counts, key=local_counts.get)
    if global_counts["left"] != global_counts["right"]:
        return min(global_counts, key=global_counts.get)
    return "right"


def _append_animation_patch_morph(
    spec: dict[str, Any],
    animation: dict[str, Any],
) -> bool:
    demonstrations = spec["demonstrations"]
    if any(demo["kind"] == "equation_morph" for demo in demonstrations):
        return False
    if len(demonstrations) >= 6:
        raise SceneValidationError("animation_patch 无法加入：演示预算已满")

    anchor = animation["anchor_section_id"]
    demo_ids = {demo["id"] for demo in demonstrations}
    base_id = f"patch-morph-{anchor}"[:44].rstrip("-") or "patch-morph"
    demo_id = base_id
    suffix = 2
    while demo_id in demo_ids:
        demo_id = f"{base_id}-{suffix}"
        suffix += 1

    demonstrations.append({
        "id": demo_id,
        "kind": "equation_morph",
        "title": animation["title"],
        "anchor_section_id": anchor,
        "side": _preferred_demo_side(demonstrations, anchor),
        "data": {"steps": copy.deepcopy(animation["steps"])},
    })
    return True


def _append_automatic_derivation_morph(spec: dict[str, Any]) -> None:
    """Promote one substantial text derivation to a deterministic side demo.

    A derivation remains fully readable in the text spine.  This enrichment
    only supplies the missing visual track when the writer returned no
    equation animation of its own.  Two-step algebra is left alone so ordinary
    rearrangement does not become decorative motion.
    """
    demonstrations = spec["demonstrations"]
    if len(demonstrations) >= 6:
        return
    if any(demo["kind"] == "equation_morph" for demo in demonstrations):
        return

    basic_step_markers = (
        "移项", "分配律", "展开", "通分", "约分", "同项相消",
        "合并同类项", "代入数值", "普通化简", "整理计算",
    )

    demo_ids = {demo["id"] for demo in demonstrations}
    for section in spec["sections"]:
        for block in section["blocks"]:
            if block["kind"] != "derivation" or len(block["steps"]) < 3:
                continue
            if len({step["latex"].strip() for step in block["steps"]}) < 3:
                continue
            notes = [step.get("note", "").strip() for step in block["steps"]]
            described_notes = [note for note in notes if note]
            if described_notes and all(
                any(marker in note for marker in basic_step_markers)
                for note in described_notes
            ):
                continue
            if any(
                demo["kind"] == "equation_morph"
                and demo["anchor_section_id"] == section["id"]
                for demo in demonstrations
            ):
                continue

            base_id = f"auto-morph-{section['id']}"[:44].rstrip("-")
            demo_id = base_id
            suffix = 2
            while demo_id in demo_ids:
                demo_id = f"{base_id}-{suffix}"
                suffix += 1

            side = _preferred_demo_side(demonstrations, section["id"])

            title = block.get("title") or section["heading"]
            demonstrations.append({
                "id": demo_id,
                "kind": "equation_morph",
                # The derivation title already describes the knowledge action.
                # Repeating a renderer label such as “连续推导” makes the side
                # note read like product chrome instead of part of the lesson.
                "title": title[:100],
                "anchor_section_id": section["id"],
                "side": side,
                "data": {"steps": copy.deepcopy(block["steps"])},
            })
            return


def _build_structured_manifest(
    candidate: dict[str, Any],
    *,
    goal: str,
    provider: str,
    source_text: str = "",
    fallback_reason: str = "",
    animation_patch: Any = None,
) -> dict[str, Any]:
    try:
        spec = normalize_scene_spec(
            candidate,
            goal,
            drop_invalid_demonstrations=provider == "coze",
            drop_invalid_semantics=provider == "coze",
        )
    except SceneValidationError as exc:
        raise CozeWorkflowError(f"知识场景未通过 Axiom 校验：{exc}") from exc

    validation_warnings = spec.get("_validation_warnings") or []
    if animation_patch is not None:
        try:
            normalized_animation = normalize_animation_patch(spec, animation_patch)
            if normalized_animation is not None:
                _append_animation_patch_morph(spec, normalized_animation)
        except SceneValidationError as exc:
            validation_warnings.append(
                f"公式动画补丁的语义 parts 未通过校验：{exc}；已忽略补丁"
            )
    spec["_validation_warnings"] = validation_warnings

    generation_note = fallback_reason
    if validation_warnings:
        semantic_warning_count = sum(
            "语义 parts" in warning for warning in validation_warnings
        )
        semantic_id_warning_count = sum(
            "已忽略该内容块的 semantic_ids" in warning
            for warning in validation_warnings
        )
        demonstration_warning_count = (
            len(validation_warnings)
            - semantic_warning_count
            - semantic_id_warning_count
        )
        safe_notes = []
        if demonstration_warning_count:
            safe_notes.append(
                f"已安全忽略 {demonstration_warning_count} 个无法渲染的演示；正文与其余演示正常。"
            )
        if semantic_warning_count:
            safe_notes.append(
                f"已安全降级 {semantic_warning_count} 组无效公式语义映射；公式内容与基础动画正常。"
            )
        if semantic_id_warning_count:
            safe_notes.append(
                f"已安全忽略 {semantic_id_warning_count} 组无效 semantic_ids；知识正文正常。"
            )
        safe_note = "；".join(safe_notes)
        generation_note = f"{generation_note}；{safe_note}" if generation_note else safe_note

    # A curve alone does not demonstrate an integral.  Give partition/area
    # intent a deterministic renderer primitive before spending the remaining
    # visual budget on an optional algebra morph.
    _append_automatic_riemann_sum(
        spec,
        goal=goal,
        source_text=source_text,
    )
    _repair_explicit_physics_demonstrations(
        spec,
        goal=goal,
        source_text=source_text,
    )
    _append_automatic_explicit_relation_map(spec, goal=goal)
    _append_automatic_derivation_morph(spec)

    quality_report = audit_scene_quality(
        spec,
        goal=goal,
        source_text=source_text,
    )
    if not quality_report["passed"]:
        raise CozeWorkflowError(
            "知识场景未通过 Axiom 教学质量门："
            f"{quality_failure_message(quality_report)}"
        )

    return {
        "schema_version": "2.0",
        "scene_id": f"scene_{uuid.uuid4().hex[:12]}",
        "template_id": STRUCTURED_TEMPLATE_ID,
        "title": spec["title"],
        "topic": spec["topic"],
        "subject": spec["subject"],
        "learning_goal": spec["learning_goal"],
        "renderer": {"kind": "structured_scene"},
        "learning_path": [
            {"id": section["id"], "label": section["heading"]}
            for section in spec["sections"]
        ],
        "capabilities": _structured_capabilities(spec),
        "content": {
            "sections": spec["sections"],
            "demonstrations": spec["demonstrations"],
            "summary": spec["summary"],
        },
        "generation": _generation(
            provider,
            generation_note,
            quality_report=quality_report,
        ),
    }


def _offline_manifest(goal: str, source_text: str, reason: str) -> dict[str, Any] | None:
    if supports_lagrange_multiplier_goal(goal, source_text):
        return _build_lagrange_multiplier_manifest(goal, reason=reason)
    if supports_calculus_area_goal(goal, source_text):
        return _build_static_manifest(goal, fallback_reason=reason)
    if supports_simple_harmonic_motion_goal(goal, source_text):
        fixture = choose_offline_fixture("解释简谐运动")
        if fixture is not None:
            try:
                return _build_structured_manifest(
                    fixture,
                    goal=goal,
                    provider="demo",
                    source_text=source_text,
                    fallback_reason=reason,
                )
            except CozeWorkflowError:
                return None
    if _is_simple_harmonic_motion_family(goal):
        # The checked-in SHO scene only covers the x→v→a phase chain.  Other
        # oscillator questions must fail closed instead of being replaced by
        # that lesson through the broad fixture keyword router below.
        return None
    if source_text.strip() or _looks_like_custom_problem(goal):
        # A generic checked-in lesson must never replace the learner's supplied
        # exercise, numbers, conditions or source material after an upstream
        # failure.  The frontend keeps the previous board and shows the error.
        return None
    fixture = choose_offline_fixture(goal)
    if fixture is None:
        return None
    try:
        return _build_structured_manifest(
            fixture,
            goal=goal,
            provider="demo",
            source_text=source_text,
            fallback_reason=reason,
        )
    except CozeWorkflowError:
        # A broad offline keyword is only a candidate.  If the deterministic
        # audit says it does not answer the goal, fail closed and let the API
        # return the normal unavailable response instead of a server error.
        return None


def generate_knowledge_scene(
    goal: str,
    *,
    source_text: str = "",
    allow_remote: bool = True,
) -> dict[str, Any]:
    """Return a validated scene for any subject when the v2 workflow is available.

    A few explicit fixtures keep the renderer demonstrable offline.  An
    unrelated fixture is never substituted for an arbitrary request.
    """
    normalized_goal = _bounded_text(goal, "建立一条清晰的学习路径", 240)
    normalized_source = _bounded_text(source_text, "", 12000)

    # Checked-in premium scenes are deterministic, immediate and do not spend
    # workflow points.  Select them before Coze so authenticated requests do not
    # regress to the lower-fidelity universal renderer.
    if supports_lagrange_multiplier_goal(normalized_goal, normalized_source):
        return _build_lagrange_multiplier_manifest(
            normalized_goal,
            reason="已命中拉格朗日乘数法精品场景，未调用扣子工作流",
        )

    if supports_calculus_area_goal(normalized_goal, normalized_source):
        return _build_static_manifest(
            normalized_goal,
            fallback_reason=(
                "已命中黎曼和与定积分面积精品场景，未调用扣子工作流"
                if allow_remote
                else "当前请求未获准消耗扣子积分，显示匹配的黎曼和与定积分面积精品场景"
            ),
        )

    if supports_simple_harmonic_motion_goal(normalized_goal, normalized_source):
        fixture = choose_offline_fixture("解释简谐运动")
        if fixture is not None:
            return _build_structured_manifest(
                fixture,
                goal=normalized_goal,
                provider="demo",
                source_text=normalized_source,
                fallback_reason=(
                    "已命中简谐运动 x→v→a 精品场景，未调用扣子工作流"
                    if allow_remote
                    else "当前请求未获准消耗扣子积分，显示简谐运动精品场景"
                ),
            )

    if allow_remote and COZE_API_TOKEN and COZE_WORKFLOW_ID:
        try:
            workflow_result = _call_coze(normalized_goal, normalized_source)
            if isinstance(workflow_result, tuple):
                candidate, animation_patch = workflow_result
            else:
                # Keep compatibility with tests and integrations that mock the
                # pre-patch single-output helper directly.
                candidate, animation_patch = workflow_result, None
            return _build_structured_manifest(
                candidate,
                goal=normalized_goal,
                provider="coze",
                source_text=normalized_source,
                animation_patch=animation_patch,
            )
        except CozeWorkflowError as exc:
            fallback = _offline_manifest(
                normalized_goal,
                normalized_source,
                f"通用工作流调用失败，已使用匹配的离线样例：{exc}",
            )
            if fallback is not None:
                return fallback
            raise SceneGenerationUnavailableError(str(exc)) from exc

    reason = (
        "通用扣子工作流尚未配置，当前显示匹配的离线样例"
        if allow_remote
        else "当前请求未获准消耗扣子积分，显示匹配的离线样例"
    )
    fallback = _offline_manifest(normalized_goal, normalized_source, reason)
    if fallback is not None:
        return fallback

    raise SceneGenerationUnavailableError(
        "通用白板渲染器已经支持跨学科内容，但当前服务没有调用扣子 v2 工作流。"
        "配置工作流令牌后即可按这个学习目标实时生成；离线状态不会用不相关模板冒充成功。"
    )
