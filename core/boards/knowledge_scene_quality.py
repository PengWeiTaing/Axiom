"""Deterministic teaching-quality checks for generated knowledge scenes.

The schema validator proves that a scene is safe to render.  This module adds
the separate question that matters to learners: does the scene answer the
requested topic, contain enough substance, and use an appropriate visual when
the request explicitly depends on one?

The checks are intentionally conservative.  They never try to prove an
arbitrary scientific statement correct; instead they reject a small set of
high-confidence failure modes before a model result can be cached as success.
"""
from __future__ import annotations

import ast
import math
import re
from typing import Any


QUALITY_GATE_VERSION = "1.7"

_PLACEHOLDER_RE = re.compile(
    r"(?:\bTODO\b|\bTBD\b|lorem ipsum|待补充|内容略|此处省略|示意内容|"
    r"占位文本|稍后完善|xxx+)",
    re.IGNORECASE,
)
_LATIN_WORD_RE = re.compile(r"[A-Za-z][A-Za-z0-9_-]{2,}")
_CJK_RUN_RE = re.compile(r"[\u3400-\u9fff]{2,}")
_SPACE_PUNCT_RE = re.compile(r"[\s\W_]+", re.UNICODE)
_NUMBER_RE = re.compile(
    r"(?<![A-Za-z0-9_.])[-+]?(?:\d+(?:\.\d+)?|\.\d+)(?:%|％)?"
    r"(?![0-9_.])"
)

_GENERIC_LATIN_TERMS = frozenset({
    "and", "the", "with", "from", "into", "using", "use", "show",
    "explain", "compare", "derive", "why", "how", "example", "concept",
    "learning", "knowledge", "visual", "visualize", "demonstrate",
})
_GENERIC_CJK_FRAGMENTS = frozenset({
    "解释", "说明", "比较", "分析", "理解", "掌握", "学习", "知识",
    "如何", "为什么", "给出", "展示", "演示", "动画", "可视化", "例子",
    "示例", "概念", "原理", "方法", "过程", "关系", "内容", "问题",
    "以及", "并用", "通过", "建立", "直观", "完整", "核心",
})

_SOURCE_DIRECTIVE_FRAGMENTS = (
    "不要", "请勿", "禁止", "避免", "必须", "要求", "尽量", "无需",
    "只需", "只保留", "控制在", "普通代数", "代数整理", "单列",
    "推导步骤", "排版", "格式", "风格",
)
_SOURCE_FACT_SIGNALS = (
    "定义", "定律", "公式", "已知", "其中", "等于", "数据", "实验",
    "测得", "结论", "theorem", "definition", "given", "equals",
)

_VISUAL_REQUEST_SIGNALS = (
    "动画", "演示", "可视化", "几何直观", "动态", "拖动", "轨迹",
    "波形", "频谱", "相位", "振动", "简谐", "向量场", "场分布", "力图", "实验", "逼近",
    "有向图", "流程图", "因果链", "调用结构", "信息传递路线",
    "随时间", "随参数", "如何变化", "how it changes", "visualize",
    "animation", "waveform", "spectrum", "trajectory", "experiment",
    "directed graph", "flow chart", "causal chain", "call graph", "pathway",
)
_DERIVATION_REQUEST_SIGNALS = (
    "推导", "证明", "求导过程", "公式推导", "derive", "derivation",
    "prove", "proof",
)
_PARAMETER_REQUEST_SIGNALS = (
    "拖动", "拖点", "滑杆", "调节参数", "随参数", "随时间", "同步变化",
    "scrub", "slider", "drag", "as the parameter", "over time",
)
_RIEMANN_REQUEST_SIGNALS = (
    "黎曼和", "黎曼积分", "riemann sum", "riemann integral", "矩形逼近",
)
_NON_RIEMANN_INTEGRAL_SIGNALS = (
    "不定积分", "原函数", "分部积分", "换元积分", "路径积分", "曲线积分",
    "线积分", "复积分", "围道积分", "二重积分", "三重积分", "曲面积分",
    "indefinite integral", "integration by parts", "substitution", "path integral",
    "line integral", "complex integral", "multiple integral", "surface integral",
)

_RELATION_INTENT_SIGNALS = (
    "有向图", "路线", "流程图", "因果链", "调用结构", "中心法则",
    "directed graph", "pathway", "flow chart", "causal chain", "call graph",
)
_RELATION_SOURCE_TOKEN = r"[A-Za-z][A-Za-z0-9_+.-]{0,23}"
_RELATION_TARGET_TOKEN = rf"(?:{_RELATION_SOURCE_TOKEN}|[\u3400-\u9fff]{{1,12}})"
_EXPLICIT_RELATION_RE = re.compile(
    rf"(?<![A-Za-z0-9_+.-])(?=({_RELATION_SOURCE_TOKEN})\s*(?:→|⇒|->)\s*"
    rf"({_RELATION_TARGET_TOKEN})(?:\s*=\s*([-+]?\d+(?:\.\d+)?))?)",
    re.IGNORECASE,
)
_RELATION_LABEL_SUFFIXES = (
    "信息传递路线", "表达路线", "调用结构", "流程图", "因果链",
    "路线", "主线", "路径", "过程", "步骤", "方向",
)

_PHYSICS_UNSIGNED_NUMBER = r"(?:\d+(?:\.\d+)?|\.\d+)"
_PHYSICS_SIGNED_NUMBER = rf"[-+]?{_PHYSICS_UNSIGNED_NUMBER}"
_PHYSICS_NUMBER_ATOL = 1e-8
_NEWTON_REQUEST_SIGNALS = (
    "受力图", "合力", "加速度", "水平",
)
_FARADAY_REQUEST_SIGNALS = (
    "线圈", "磁场", "电动势", "方向", "均匀", "垂直", "纸面",
)

_DYNAMIC_FAMILIES: tuple[tuple[str, tuple[str, ...], frozenset[str]], ...] = (
    (
        "integral",
        ("黎曼", "曲线下面积", "矩形逼近", "riemann", "area under"),
        frozenset({"riemann_sum"}),
    ),
    (
        "limit_or_derivative",
        ("极限", "导数", "切线", "割线", "limit", "derivative", "tangent"),
        frozenset({"limit_microscope", "function_plot", "equation_morph", "linked_lab"}),
    ),
    (
        "motion_or_wave",
        ("运动", "振动", "波形", "频谱", "相位", "motion", "wave", "spectrum", "phase"),
        frozenset({"linked_lab", "function_plot", "force_diagram", "field_experiment"}),
    ),
    (
        "field_or_force",
        ("电场", "磁场", "电磁感应", "受力", "合力", "field", "force"),
        frozenset({"field_experiment", "force_diagram", "linked_lab"}),
    ),
    (
        "constraint_or_geometry",
        ("约束", "轨迹", "几何", "圆周角", "constraint", "locus", "geometry"),
        frozenset({"constraint_geometry", "constrained_extremum_2d", "geometry", "linked_lab"}),
    ),
    (
        "probability",
        ("概率分布", "后验", "抽样", "频率分布", "probability", "posterior", "sampling"),
        frozenset({"probability_bars", "linked_lab", "concept_map"}),
    ),
)


def _issue(code: str, message: str) -> dict[str, str]:
    return {"code": code, "message": message}


def _visible_block_text(block: dict[str, Any]) -> str:
    kind = block.get("kind")
    values: list[str] = []
    if kind == "paragraph":
        values.append(str(block.get("text", "")))
    elif kind == "definition":
        values.extend((str(block.get("term", "")), str(block.get("text", "")), str(block.get("latex", ""))))
    elif kind == "formula":
        values.extend((str(block.get("latex", "")), str(block.get("caption", ""))))
    elif kind == "derivation":
        values.append(str(block.get("title", "")))
        for step in block.get("steps", []):
            values.extend((str(step.get("latex", "")), str(step.get("note", ""))))
    elif kind == "example":
        values.append(str(block.get("prompt", "")))
        for step in block.get("steps", []):
            values.extend((str(step.get("text", "")), str(step.get("latex", ""))))
        values.append(str(block.get("result", "")))
    elif kind == "list":
        values.extend(str(item) for item in block.get("items", []))
    elif kind == "comparison":
        values.extend(str(item) for item in block.get("columns", []))
        for row in block.get("rows", []):
            values.extend(str(item) for item in row)
    return "\n".join(value for value in values if value).strip()


def _content_blocks(spec: dict[str, Any]) -> list[str]:
    return [
        text
        for section in spec.get("sections", [])
        for block in section.get("blocks", [])
        if (text := _visible_block_text(block))
    ]


def scene_content_text(spec: dict[str, Any]) -> str:
    """Expose the exact learner-visible text projection used by quality gates."""
    # Keep a visible block boundary.  Physics result checks may join an
    # immediately following formula line inside one block, but must never
    # borrow a sign or direction from the next paragraph/card.
    return "\n\n".join(_content_blocks(spec))


def _normalized_duplicate_key(text: str) -> str:
    return _SPACE_PUNCT_RE.sub("", text).casefold()


def _goal_terms(goal: str) -> tuple[set[str], set[str]]:
    folded = goal.casefold()
    for fragment in sorted(_GENERIC_CJK_FRAGMENTS, key=len, reverse=True):
        folded = folded.replace(fragment, "")
    latin = {
        word
        for word in _LATIN_WORD_RE.findall(folded)
        if word not in _GENERIC_LATIN_TERMS
    }
    cjk: set[str] = set()
    for run in _CJK_RUN_RE.findall(folded):
        for size in (4, 3, 2):
            if len(run) < size:
                continue
            for index in range(len(run) - size + 1):
                term = run[index:index + size]
                if any(fragment in term or term in fragment for fragment in _GENERIC_CJK_FRAGMENTS):
                    continue
                cjk.add(term)
    return latin, cjk


def _topic_coverage(goal: str, blocks: list[str]) -> tuple[float, int, int]:
    latin, cjk = _goal_terms(goal)
    terms = latin | cjk
    if not terms:
        return 1.0, len(blocks), 0
    matched: set[str] = set()
    hit_blocks = 0
    for block in blocks:
        folded = block.casefold()
        block_matches = {term for term in terms if term in folded}
        if block_matches:
            hit_blocks += 1
            matched.update(block_matches)
    return len(matched) / len(terms), hit_blocks, len(terms)


def _distinctive_topic_anchor(goal: str, blocks: list[str]) -> tuple[int, int]:
    """Count topic anchors that are longer than generic two-character words."""
    latin, cjk = _goal_terms(goal)
    anchors = {term for term in latin if len(term) >= 4}
    anchors.update(term for term in cjk if len(term) >= 3)
    if not anchors:
        return 0, 0
    folded_blocks = [block.casefold() for block in blocks]
    matched = sum(any(anchor in block for block in folded_blocks) for anchor in anchors)
    return len(anchors), matched


def _numeric_anchors(text: str) -> set[float]:
    anchors: set[float] = set()
    for match in _NUMBER_RE.finditer(text):
        raw = match.group(0).replace("％", "%")
        percent = raw.endswith("%")
        if percent:
            raw = raw[:-1]
        try:
            value = float(raw)
        except ValueError:
            continue
        if percent:
            value /= 100.0
        if math.isfinite(value):
            anchors.add(round(value, 12))
    return anchors


def _physics_text(value: Any) -> str:
    """Flatten the small amount of LaTeX used around physical quantities."""
    text = str(value or "")
    text = text.replace("−", "-").replace("–", "-").replace("—", "-")
    text = text.replace("\\,", "").replace("\\;", "").replace("\\cdot", "·")
    for _ in range(2):
        text = re.sub(r"\\(?:mathrm|text)\s*\{([^{}]*)\}", r"\1", text)
    text = re.sub(r"\\(?:mathrm|text)\b", "", text)
    return text.replace("{", "").replace("}", "").replace("\\", "")


def _same_physics_number(actual: Any, expected: float, *, atol: float = _PHYSICS_NUMBER_ATOL) -> bool:
    try:
        number = float(actual)
    except (TypeError, ValueError):
        return False
    return math.isfinite(number) and math.isclose(number, expected, rel_tol=1e-7, abs_tol=atol)


def _unique_physics_values(pattern: str, text: str, *, group: int = 1) -> list[float]:
    values: list[float] = []
    for match in re.finditer(pattern, text, flags=re.IGNORECASE):
        try:
            value = float(match.group(group))
        except (TypeError, ValueError):
            continue
        if not math.isfinite(value):
            continue
        if not any(_same_physics_number(value, existing) for existing in values):
            values.append(value)
    return values


def _directed_named_force_values(
    text: str,
    *,
    direction: str,
    noun: str,
) -> list[float]:
    """Read one input force from a clause, never a derived resultant."""
    values: list[float] = []
    clauses = re.split(r"[，,。；;、\n]|(?:和|及)(?=向[左右])", text)
    for clause in clauses:
        if direction not in clause or noun not in clause:
            continue
        if "合力" in clause or "净力" in clause:
            continue
        for value in _unique_physics_values(
            rf"({_PHYSICS_UNSIGNED_NUMBER})\s*(?:N|牛顿)",
            clause,
        ):
            if value > 0 and not any(_same_physics_number(value, existing) for existing in values):
                values.append(value)
    return values


def _all_input_directed_forces(text: str) -> list[tuple[str, float]]:
    forces: list[tuple[str, float]] = []
    clauses = re.split(r"[，,。；;、\n]|(?:和|及)(?=向[左右])", text)
    for clause in clauses:
        if "力" not in clause or "合力" in clause or "净力" in clause:
            continue
        direction = "向右" if "向右" in clause else "向左" if "向左" in clause else ""
        if not direction:
            continue
        for value in _unique_physics_values(
            rf"({_PHYSICS_UNSIGNED_NUMBER})\s*(?:N|牛顿)",
            clause,
        ):
            pair = (direction, value)
            if pair not in forces:
                forces.append(pair)
    return forces


def _has_only_expected_newton_force_clauses(
    text: str,
    *,
    right_force: float,
    left_force: float,
) -> bool:
    """Reject any explicit third force, including one reusing the same value."""
    found_right = False
    found_left = False
    clauses = re.split(r"[，,。；;、\n]|(?:和|及)(?=向[左右])", text)
    for clause in clauses:
        if "力" not in clause or "合力" in clause or "净力" in clause:
            continue
        direction = "向右" if "向右" in clause else "向左" if "向左" in clause else ""
        values = _unique_physics_values(
            rf"({_PHYSICS_UNSIGNED_NUMBER})\s*(?:N|牛顿)",
            clause,
        )
        if not direction or not values:
            continue
        if (
            direction == "向右"
            and "拉力" in clause
            and len(values) == 1
            and _same_physics_number(values[0], right_force)
            and not any(noun in clause for noun in ("推力", "摩擦力", "支持力", "重力"))
        ):
            found_right = True
            continue
        if (
            direction == "向左"
            and "摩擦力" in clause
            and len(values) == 1
            and _same_physics_number(values[0], left_force)
            and not any(noun in clause for noun in ("推力", "拉力", "支持力", "重力"))
        ):
            found_left = True
            continue
        return False
    return found_right and found_left


def _parse_newton_conditions(text: str, *, require_request_intent: bool) -> dict[str, Any] | None:
    normalized = _physics_text(text)
    if require_request_intent:
        if not all(signal in normalized for signal in _NEWTON_REQUEST_SIGNALS):
            return None
        if not any(signal in normalized for signal in ("只受", "仅受")):
            return None

    masses = _unique_physics_values(
        rf"质量(?:为|是|=|大小为)?\s*({_PHYSICS_UNSIGNED_NUMBER})\s*(?:kg|千克|公斤)",
        normalized,
    )
    right_forces = _directed_named_force_values(
        normalized,
        direction="向右",
        noun="拉力",
    )
    left_forces = _directed_named_force_values(
        normalized,
        direction="向左",
        noun="摩擦力",
    )
    if len(masses) != 1 or len(right_forces) != 1 or len(left_forces) != 1:
        return None

    mass = masses[0]
    right_force = right_forces[0]
    left_force = left_forces[0]
    all_input_forces = _all_input_directed_forces(normalized)
    if len(all_input_forces) != 2 or {
        (direction, round(value, 12)) for direction, value in all_input_forces
    } != {
        ("向右", round(right_force, 12)),
        ("向左", round(left_force, 12)),
    }:
        return None
    if not _has_only_expected_newton_force_clauses(
        normalized,
        right_force=right_force,
        left_force=left_force,
    ):
        return None
    # force_diagram uses a literal shared scale capped at 10.  Staying inside
    # that contract lets the repair preserve the exact user-authored numbers.
    if not (0 < mass <= 1000 and 0.05 <= right_force <= 10 and 0.05 <= left_force <= 10):
        return None
    if right_force <= left_force:
        # The first production slice deliberately covers P01's unambiguous
        # rightward resultant.  Equal/reversed cases remain model-reviewed.
        return None
    net_force = right_force - left_force
    return {
        "kind": "newton_horizontal_two_force",
        "mass_kg": mass,
        "right_force_n": right_force,
        "left_force_n": left_force,
        "net_force_n": net_force,
        "net_direction": "向右",
        "acceleration_m_s2": net_force / mass,
    }


def parse_explicit_newton_problem(text: str) -> dict[str, Any] | None:
    """Parse only the fully stated two-force P01 shape that Axiom can prove."""
    return _parse_newton_conditions(text, require_request_intent=True)


def _parse_faraday_conditions(text: str, *, require_request_intent: bool) -> dict[str, Any] | None:
    normalized = _physics_text(text)
    if require_request_intent and not all(
        signal in normalized for signal in _FARADAY_REQUEST_SIGNALS
    ):
        return None
    if "线圈" not in normalized or "磁场" not in normalized:
        return None
    if not re.search(r"(?:以|规定)[^。；\n]{0,24}逆时针[^。；\n]{0,12}(?:为|取|是)\s*正", normalized):
        return None
    if not re.search(r"垂直(?:于)?纸面向外", normalized):
        return None

    turns = _unique_physics_values(
        rf"({_PHYSICS_UNSIGNED_NUMBER})\s*匝",
        normalized,
    )
    areas = _unique_physics_values(
        rf"面积(?:为|是|=)?\s*({_PHYSICS_UNSIGNED_NUMBER})\s*(?:m\s*(?:²|\^\s*2)|平方米)",
        normalized,
    )
    durations = _unique_physics_values(
        rf"(?:在|历时)\s*({_PHYSICS_UNSIGNED_NUMBER})\s*(?:s|秒)\s*(?:内)?",
        normalized,
    )
    raw_field_matches = list(re.finditer(
        rf"(?:磁场|B)[^。；\n]{{0,56}}?从\s*({_PHYSICS_UNSIGNED_NUMBER})\s*(?:T|特斯拉)"
        rf"[^。；\n]{{0,24}}?(增至|增加到|增大到|升至)\s*"
        rf"({_PHYSICS_UNSIGNED_NUMBER})\s*(?:T|特斯拉)",
        normalized,
        flags=re.IGNORECASE,
    ))
    field_transitions: list[tuple[float, float]] = []
    for match in raw_field_matches:
        transition = (float(match.group(1)), float(match.group(3)))
        if not any(
            _same_physics_number(transition[0], existing[0])
            and _same_physics_number(transition[1], existing[1])
            for existing in field_transitions
        ):
            field_transitions.append(transition)
    if len(turns) != 1 or len(areas) != 1 or len(durations) != 1 or len(field_transitions) != 1:
        return None

    turns_value = turns[0]
    area = areas[0]
    duration = durations[0]
    field_start, field_end = field_transitions[0]
    if (
        not turns_value.is_integer()
        or not 1 <= turns_value <= 10000
        or not 1e-8 <= area <= 1000
        or not 0.001 <= duration <= 1000
        or not 0 <= field_start < field_end <= 100
    ):
        return None
    emf = -turns_value * area * (field_end - field_start) / duration
    if not math.isfinite(emf) or emf >= -1e-12:
        return None
    return {
        "kind": "faraday_outward_increasing_field",
        "turns": int(turns_value),
        "area_m2": area,
        "orientation_deg": 0.0,
        "field_start_t": field_start,
        "field_end_t": field_end,
        "change_duration_s": duration,
        "emf_v": emf,
        "emf_direction": "顺时针",
    }


def parse_explicit_faraday_problem(text: str) -> dict[str, Any] | None:
    """Parse only perpendicular outward, uniformly increasing P02 problems."""
    return _parse_faraday_conditions(text, require_request_intent=True)


def _problems_match(
    actual: dict[str, Any] | None,
    expected: dict[str, Any],
    numeric_fields: tuple[str, ...],
) -> bool:
    if actual is None or actual.get("kind") != expected.get("kind"):
        return False
    return all(
        _same_physics_number(actual.get(field), float(expected[field]))
        for field in numeric_fields
    )


def _has_quantity_with_unit(text: str, expected: float, unit_pattern: str) -> bool:
    normalized = _physics_text(text)
    return any(
        _same_physics_number(value, expected, atol=1e-7)
        for value in _unique_physics_values(
            rf"({_PHYSICS_SIGNED_NUMBER})\s*(?:{unit_pattern})",
            normalized,
        )
    )


def _has_labeled_quantity(
    text: str,
    *,
    label_pattern: str,
    expected: float,
    unit_pattern: str,
    direction: str,
) -> bool:
    normalized = _physics_text(text)
    for block in re.split(r"\n\s*\n", normalized):
        statements = [
            statement.strip()
            for statement in re.split(r"[。；;\n]+", block)
            if statement.strip()
        ]
        for index, statement in enumerate(statements):
            if re.search(label_pattern, statement, flags=re.IGNORECASE) is None:
                continue
            # One immediately following formula/result line inside the same
            # learner-visible block is allowed.  Never cross a block boundary.
            window = statement
            if index + 1 < len(statements) and re.match(
                r"^(?:方向|故|所以|因此|由此|[A-Za-zε][^=。；]{0,24}=)",
                statements[index + 1],
                flags=re.IGNORECASE,
            ):
                window = f"{window}\n{statements[index + 1]}"
            if _direction_is_affirmed(window, direction) and _has_quantity_with_unit(
                window,
                expected,
                unit_pattern,
            ):
                return True
    return False


def _direction_is_affirmed(text: str, direction: str) -> bool:
    if direction not in text:
        return False
    if re.search(rf"(?:不是|并非|非|不应为|错误地?为)\s*{re.escape(direction)}", text):
        return False
    return True


def newton_content_matches_problem(text: str, expected: dict[str, Any]) -> bool:
    actual = _parse_newton_conditions(text, require_request_intent=False)
    if not _problems_match(
        actual,
        expected,
        ("mass_kg", "right_force_n", "left_force_n"),
    ):
        return False
    return (
        _has_labeled_quantity(
            text,
            label_pattern=r"(?:合力|净力)",
            expected=float(expected["net_force_n"]),
            unit_pattern=r"(?:N|牛顿)",
            direction=str(expected["net_direction"]),
        )
        and _has_labeled_quantity(
            text,
            label_pattern=r"(?:加速度|a\s*=)",
            expected=float(expected["acceleration_m_s2"]),
            unit_pattern=(
                r"(?:m\s*/\s*s\s*(?:²|\^?\s*2)|"
                r"m\s*·\s*s\s*(?:⁻²|\^\s*-?\s*2)|米每二次方秒)"
            ),
            direction=str(expected["net_direction"]),
        )
    )


def faraday_content_matches_problem(text: str, expected: dict[str, Any]) -> bool:
    actual = _parse_faraday_conditions(text, require_request_intent=False)
    if not _problems_match(
        actual,
        expected,
        ("turns", "area_m2", "field_start_t", "field_end_t", "change_duration_s"),
    ):
        return False
    normalized = _physics_text(text)
    lenz_grounded = (
        "磁通" in normalized
        and any(signal in normalized for signal in ("增大", "增加", "增强"))
        and any(signal in normalized for signal in ("反抗", "阻碍", "抵抗"))
        and re.search(
            r"(?:不|并非|不是)\s*(?:反抗|阻碍|抵抗)[^。；\n]{0,10}磁通",
            normalized,
        ) is None
    )
    return (
        _has_labeled_quantity(
            text,
            label_pattern=r"(?:电动势|mathcal\s*e|ε)",
            expected=float(expected["emf_v"]),
            unit_pattern=r"(?:V|伏特)",
            direction=str(expected["emf_direction"]),
        )
        and lenz_grounded
    )


def _angle_matches(actual: Any, expected: float, *, tolerance_deg: float = 1.0) -> bool:
    try:
        angle = float(actual) % 360.0
    except (TypeError, ValueError):
        return False
    distance = abs((angle - expected + 180.0) % 360.0 - 180.0)
    return distance <= tolerance_deg


def _label_has_physical_value(label: Any, expected: float, unit_pattern: str) -> bool:
    return _has_quantity_with_unit(str(label or ""), expected, unit_pattern)


def force_diagram_matches_problem(demo: dict[str, Any], expected: dict[str, Any]) -> bool:
    if demo.get("kind") != "force_diagram":
        return False
    data = demo.get("data") or {}
    if not _label_has_physical_value(data.get("body_label"), float(expected["mass_kg"]), r"(?:kg|千克|公斤)"):
        return False
    raw_vectors = data.get("vectors") or []
    if (
        not isinstance(raw_vectors, list)
        or len(raw_vectors) != 2
        or not all(isinstance(item, dict) for item in raw_vectors)
    ):
        return False
    vectors = raw_vectors
    right = [
        vector for vector in vectors
        if _angle_matches(vector.get("angle"), 0.0)
        and _label_has_physical_value(vector.get("label"), float(expected["right_force_n"]), r"(?:N|牛顿)")
        and "拉力" in str(vector.get("label") or "")
    ]
    left = [
        vector for vector in vectors
        if _angle_matches(vector.get("angle"), 180.0)
        and _label_has_physical_value(vector.get("label"), float(expected["left_force_n"]), r"(?:N|牛顿)")
        and "摩擦力" in str(vector.get("label") or "")
    ]
    if len(right) != 1 or len(left) != 1:
        return False
    try:
        right_scale = float(right[0]["magnitude"]) / float(expected["right_force_n"])
        left_scale = float(left[0]["magnitude"]) / float(expected["left_force_n"])
    except (KeyError, TypeError, ValueError, ZeroDivisionError):
        return False
    return (
        right_scale > 0
        and left_scale > 0
        and math.isclose(right_scale, left_scale, rel_tol=0.02, abs_tol=1e-9)
    )


def field_experiment_matches_problem(demo: dict[str, Any], expected: dict[str, Any]) -> bool:
    if demo.get("kind") != "field_experiment":
        return False
    data = demo.get("data") or {}
    if data.get("mode") != "faraday_loop":
        return False
    if not all(
        _same_physics_number(data.get(field), float(expected[expected_field]), atol=1e-7)
        for field, expected_field in (
            ("turns", "turns"),
            ("area", "area_m2"),
            ("field_start", "field_start_t"),
            ("field_end", "field_end_t"),
            ("change_duration_s", "change_duration_s"),
        )
    ):
        return False
    if not _angle_matches(data.get("orientation_deg"), float(expected["orientation_deg"])):
        return False
    derived_emf = (
        -float(data["turns"])
        * float(data["area"])
        * math.cos(math.radians(float(data["orientation_deg"])))
        * (float(data["field_end"]) - float(data["field_start"]))
        / float(data["change_duration_s"])
    )
    if not _same_physics_number(derived_emf, float(expected["emf_v"]), atol=1e-7):
        return False
    prediction = demo.get("prediction")
    if isinstance(prediction, dict):
        answer_id = str(prediction.get("answer_id") or "")
        answer = next(
            (
                option for option in prediction.get("options") or []
                if isinstance(option, dict) and str(option.get("id") or "") == answer_id
            ),
            None,
        )
        answer_label = _normalized_duplicate_key(str(answer.get("label") or "")) if answer else ""
        expected_label = _normalized_duplicate_key(str(expected["emf_direction"]))
        if (
            answer is None
            or not answer_label.startswith(expected_label)
            or "逆时针" in answer_label
            or not _direction_is_affirmed(str(answer.get("label") or ""), str(expected["emf_direction"]))
        ):
            return False
    return True


def _clean_relation_label(raw: str) -> str:
    label = raw.strip().strip("，。；;、,:：()（）[]【】")
    for suffix in _RELATION_LABEL_SUFFIXES:
        if label.endswith(suffix) and len(label) > len(suffix):
            label = label[:-len(suffix)]
            break
    return label.strip()


def parse_explicit_relations(goal: str) -> tuple[tuple[str, str, float | None], ...]:
    """Parse only high-confidence arrow relations requested as a map/pathway.

    The left endpoint is intentionally restricted to an ASCII identifier.  It
    covers scientific symbols and graph vertices while avoiding guesses about
    where a free-form Chinese clause ends.  Overlapping lookahead preserves
    chains such as ``DNA→RNA→蛋白质``.
    """
    folded = goal.casefold()
    if not any(signal in folded for signal in _RELATION_INTENT_SIGNALS):
        return ()
    relations: list[tuple[str, str, float | None]] = []
    seen: set[tuple[str, str, float | None]] = set()
    for match in _EXPLICIT_RELATION_RE.finditer(goal):
        source = _clean_relation_label(match.group(1))
        target = _clean_relation_label(match.group(2))
        if not source or not target or source.casefold() == target.casefold():
            continue
        weight = float(match.group(3)) if match.group(3) is not None else None
        key = (source.casefold(), target.casefold(), weight)
        if key in seen:
            continue
        seen.add(key)
        relations.append((source, target, weight))
    return tuple(relations)


def _relation_label_key(value: Any) -> str:
    return re.sub(r"[^a-z0-9\u3400-\u9fff]+", "", str(value).casefold())


def _relation_label_matches(expected: str, *candidates: Any) -> bool:
    expected_key = _relation_label_key(expected)
    if not expected_key:
        return False
    for candidate in candidates:
        candidate_key = _relation_label_key(candidate)
        if not candidate_key:
            continue
        if expected_key == candidate_key:
            return True
        if len(expected_key) >= 2 and (
            expected_key in candidate_key or candidate_key in expected_key
        ):
            return True
    return False


def _edge_weight_matches(label: Any, expected: float | None) -> bool:
    if expected is None:
        return True
    return any(
        math.isclose(value, expected, rel_tol=0.0, abs_tol=1e-9)
        for value in _numeric_anchors(str(label))
    )


def _concept_map_relations(
    demo: dict[str, Any],
) -> list[tuple[tuple[Any, Any], tuple[Any, Any], Any]]:
    if demo.get("kind") != "concept_map":
        return []
    data = demo.get("data") or {}
    nodes = {
        str(node.get("id", "")): (node.get("id", ""), node.get("label", ""))
        for node in data.get("nodes", [])
    }
    return [
        (nodes.get(str(edge.get("from", "")), ("", "")),
         nodes.get(str(edge.get("to", "")), ("", "")),
         edge.get("label", ""))
        for edge in data.get("edges", [])
    ]


def _concept_map_matches_relations(
    demo: dict[str, Any],
    expected: tuple[tuple[str, str, float | None], ...],
    *,
    strict: bool,
) -> bool:
    actual = _concept_map_relations(demo)
    if not actual:
        return False

    def matches(
        relation: tuple[str, str, float | None],
        edge: tuple[tuple[Any, Any], tuple[Any, Any], Any],
    ) -> bool:
        source, target, weight = relation
        actual_source, actual_target, actual_label = edge
        return (
            _relation_label_matches(source, *actual_source)
            and _relation_label_matches(target, *actual_target)
            and _edge_weight_matches(actual_label, weight)
        )

    if not all(any(matches(relation, edge) for edge in actual) for relation in expected):
        return False
    if not strict:
        return True

    expected_nodes = {item for relation in expected for item in relation[:2]}
    for edge in actual:
        actual_source, actual_target, _ = edge
        source_is_expected = any(
            _relation_label_matches(node, *actual_source) for node in expected_nodes
        )
        target_is_expected = any(
            _relation_label_matches(node, *actual_target) for node in expected_nodes
        )
        if source_is_expected and target_is_expected and not any(
            matches(relation, edge) for relation in expected
        ):
            return False
    return True


def _process_matches_relations(
    demo: dict[str, Any],
    expected: tuple[tuple[str, str, float | None], ...],
) -> bool:
    if demo.get("kind") != "process" or any(weight is not None for _, _, weight in expected):
        return False
    steps = [
        "\n".join((str(step.get("label", "")), str(step.get("detail", ""))))
        for step in (demo.get("data") or {}).get("steps", [])
    ]
    if not steps:
        return False
    for source, target, _ in expected:
        source_indexes = [
            index for index, text in enumerate(steps)
            if _relation_label_matches(source, text)
        ]
        target_indexes = [
            index for index, text in enumerate(steps)
            if _relation_label_matches(target, text)
        ]
        ordered = any(source_index < target_index for source_index in source_indexes for target_index in target_indexes)
        same_step_arrow = any(
            source_index == target_index
            and re.search(
                rf"{re.escape(source)}\s*(?:→|⇒|->)\s*{re.escape(target)}",
                steps[source_index],
                re.IGNORECASE,
            )
            for source_index in source_indexes
            for target_index in target_indexes
        )
        if not (ordered or same_step_arrow):
            return False
    return True


def demonstrations_match_explicit_relations(
    demonstrations: list[dict[str, Any]],
    expected: tuple[tuple[str, str, float | None], ...],
    *,
    strict: bool,
) -> bool:
    return any(
        _concept_map_matches_relations(demo, expected, strict=strict)
        or (not strict and _process_matches_relations(demo, expected))
        for demo in demonstrations
    )


def _shared_source_anchors(source_text: str, blocks: list[str]) -> tuple[int, int]:
    """Conservatively detect whether supplied material left any trace in prose."""
    latin, cjk = _goal_terms(source_text[:6000])
    anchors = {term for term in latin if len(term) >= 5}
    anchors.update(term for term in cjk if len(term) >= 4)
    if not anchors:
        return 0, 0
    folded_content = "\n".join(blocks).casefold()
    return len(anchors), sum(anchor in folded_content for anchor in anchors)


def source_requires_grounding(source_text: str) -> bool:
    """Separate short presentation instructions from supplied subject matter.

    A sentence such as ``不要把普通代数整理单列成推导步骤`` constrains the
    presentation but is not a fact that should be repeated in the lesson.  A
    directive that still contains a named law, formula, definition or a
    substantial topic phrase remains groundable.
    """
    raw = source_text.strip()
    if not raw:
        return False
    folded = raw.casefold()
    has_directive = any(fragment in folded for fragment in _SOURCE_DIRECTIVE_FRAGMENTS)
    if not has_directive:
        return True
    if any(signal in folded for signal in _SOURCE_FACT_SIGNALS):
        return True
    if any(marker in raw for marker in ("=", "∫", "\\", "→", "⇒")):
        return True
    material = folded
    for fragment in _SOURCE_DIRECTIVE_FRAGMENTS:
        material = material.replace(fragment, "")
    normalized = _SPACE_PUNCT_RE.sub("", material)
    normalized = re.sub(r"\d+(?:\.\d+)?", "", normalized)
    return len(normalized) >= 8


_INTEGRAL_RE = re.compile(
    r"(?:∫|\\int)\s*_\s*\{?([^}\^\s]+)\}?\s*\^\s*\{?([^}\s]+)\}?"
    r"\s*(.+?)\s*d\s*x\b",
    re.IGNORECASE,
)
_INTEGRAL_SUBSCRIPT_RE = re.compile(r"∫([₀₁₂₃₄₅₆₇₈₉₊₋]+)")
_INTEGRAL_SUBSCRIPT_TRANSLATION = str.maketrans(
    "₀₁₂₃₄₅₆₇₈₉₊₋",
    "0123456789+-",
)
_SAFE_EXPRESSION_FUNCTIONS = {
    "sin": math.sin,
    "cos": math.cos,
    "tan": math.tan,
    "sqrt": math.sqrt,
    "exp": math.exp,
    "log": math.log,
    "ln": math.log,
}
_SAFE_EXPRESSION_NAMES = {"x", "pi", "e", *_SAFE_EXPRESSION_FUNCTIONS}


def _bound_value(raw: str) -> float | None:
    token = raw.strip().replace("\\pi", "pi").replace("π", "pi")
    token = token.replace("{", "").replace("}", "").replace(" ", "")
    if token in {"pi", "+pi"}:
        return math.pi
    if token == "-pi":
        return -math.pi
    match = re.fullmatch(r"([+-]?\d+(?:\.\d+)?)?\*?pi(?:/([1-9]\d*))?", token)
    if match:
        coefficient = float(match.group(1)) if match.group(1) not in (None, "", "+", "-") else (-1.0 if match.group(1) == "-" else 1.0)
        divisor = float(match.group(2) or 1)
        return coefficient * math.pi / divisor
    try:
        return float(token)
    except ValueError:
        return None


def _normalized_simple_expression(raw: str) -> tuple[str, ast.Expression] | None:
    expression = raw.strip().casefold()
    replacements = {
        "\\sin": "sin", "\\cos": "cos", "\\tan": "tan",
        "\\sqrt": "sqrt", "\\exp": "exp", "\\log": "log",
        "\\pi": "pi", "π": "pi", "²": "^2", "³": "^3",
        "·": "*", "\\cdot": "*", "\\left": "", "\\right": "",
        "{": "(", "}": ")", " ": "",
    }
    for source, target in replacements.items():
        expression = expression.replace(source, target)
    if any(symbol in expression for symbol in ("\\", "{", "}")):
        return None
    expression = expression.replace("^", "**")
    if not re.fullmatch(r"[\dA-Za-z_+\-*/().,]+", expression):
        return None
    try:
        tree = ast.parse(expression, mode="eval")
    except SyntaxError:
        return None
    allowed_nodes = (
        ast.Expression, ast.Constant, ast.Name, ast.Load, ast.Call,
        ast.BinOp, ast.UnaryOp, ast.Add, ast.Sub, ast.Mult, ast.Div,
        ast.Pow, ast.UAdd, ast.USub,
    )
    for node in ast.walk(tree):
        if not isinstance(node, allowed_nodes):
            return None
        if isinstance(node, ast.Constant) and not isinstance(node.value, (int, float)):
            return None
        if isinstance(node, ast.Name) and node.id not in _SAFE_EXPRESSION_NAMES:
            return None
        if isinstance(node, ast.Call):
            if (
                not isinstance(node.func, ast.Name)
                or node.func.id not in _SAFE_EXPRESSION_FUNCTIONS
                or len(node.args) != 1
                or node.keywords
            ):
                return None
    return expression.replace("**", "^"), tree


def _expression_fingerprint(raw: str) -> str | None:
    normalized = _normalized_simple_expression(raw)
    if normalized is None:
        return None
    return ast.dump(normalized[1], annotate_fields=False, include_attributes=False)


def _normalize_integral_notation(value: str) -> str:
    return _INTEGRAL_SUBSCRIPT_RE.sub(
        lambda match: "∫_" + match.group(1).translate(_INTEGRAL_SUBSCRIPT_TRANSLATION),
        value,
    )


def parse_simple_integral_source(goal: str) -> tuple[str, float, float] | None:
    """Return a renderer-safe expression and bounds for an explicit integral."""
    match = _INTEGRAL_RE.search(_normalize_integral_notation(goal))
    if not match:
        return None
    lower = _bound_value(match.group(1))
    upper = _bound_value(match.group(2))
    normalized = _normalized_simple_expression(match.group(3))
    if lower is None or upper is None or normalized is None or lower >= upper:
        return None
    return normalized[0], lower, upper


def parse_simple_integral(goal: str) -> tuple[str, float, float] | None:
    """Parse only the simple single-variable integral form we can verify."""
    parsed = parse_simple_integral_source(goal)
    if parsed is None:
        return None
    expression_source, lower, upper = parsed
    expression = _expression_fingerprint(expression_source)
    if expression is None:
        return None
    return expression, lower, upper


def _evaluate_simple_expression_node(node: ast.AST, x: float) -> float:
    if isinstance(node, ast.Expression):
        return _evaluate_simple_expression_node(node.body, x)
    if isinstance(node, ast.Constant):
        return float(node.value)
    if isinstance(node, ast.Name):
        if node.id == "x":
            return x
        if node.id == "pi":
            return math.pi
        if node.id == "e":
            return math.e
        raise ValueError("unsupported expression name")
    if isinstance(node, ast.UnaryOp):
        value = _evaluate_simple_expression_node(node.operand, x)
        return value if isinstance(node.op, ast.UAdd) else -value
    if isinstance(node, ast.BinOp):
        left = _evaluate_simple_expression_node(node.left, x)
        right = _evaluate_simple_expression_node(node.right, x)
        if isinstance(node.op, ast.Add):
            return left + right
        if isinstance(node.op, ast.Sub):
            return left - right
        if isinstance(node.op, ast.Mult):
            return left * right
        if isinstance(node.op, ast.Div):
            return left / right
        if isinstance(node.op, ast.Pow):
            return left ** right
        raise ValueError("unsupported expression operator")
    if isinstance(node, ast.Call) and isinstance(node.func, ast.Name):
        argument = _evaluate_simple_expression_node(node.args[0], x)
        return float(_SAFE_EXPRESSION_FUNCTIONS[node.func.id](argument))
    raise ValueError("unsupported expression node")


def simple_expression_plot_range(
    expression: str,
    lower: float,
    upper: float,
) -> list[float] | None:
    """Sample a validated scalar expression and derive a non-clipping y range."""
    normalized = _normalized_simple_expression(expression)
    if normalized is None:
        return None
    values: list[float] = []
    for index in range(129):
        x = lower + (upper - lower) * index / 128
        try:
            value = _evaluate_simple_expression_node(normalized[1], x)
        except (ArithmeticError, ValueError, OverflowError):
            return None
        if not math.isfinite(value):
            return None
        values.append(value)
    low = min(0.0, min(values))
    high = max(0.0, max(values))
    span = high - low
    padding = max(0.15, span * 0.12)
    return [low - padding, high + padding]


def _demo_matches_integral(demo: dict[str, Any], expected: tuple[str, float, float]) -> bool:
    if demo.get("kind") != "riemann_sum":
        return False
    expression, lower, upper = expected
    data = demo.get("data") or {}
    actual_expression = _expression_fingerprint(str(data.get("expression", "")))
    domain = data.get("domain") or []
    return (
        actual_expression == expression
        and len(domain) == 2
        and math.isclose(float(domain[0]), lower, rel_tol=0.0, abs_tol=1e-6)
        and math.isclose(float(domain[1]), upper, rel_tol=0.0, abs_tol=1e-6)
    )


def audit_scene_quality(
    spec: dict[str, Any],
    *,
    goal: str,
    source_text: str = "",
) -> dict[str, Any]:
    """Return a deterministic report; ``fatal_issues`` means do not cache."""
    fatal: list[dict[str, str]] = []
    warnings: list[dict[str, str]] = []
    blocks = _content_blocks(spec)
    demonstrations = list(spec.get("demonstrations") or [])
    demo_kinds = {str(demo.get("kind", "")) for demo in demonstrations}
    compact_chars = sum(len(_normalized_duplicate_key(block)) for block in blocks)
    substantive_blocks = sum(len(_normalized_duplicate_key(block)) >= 24 for block in blocks)

    if compact_chars < 220 or substantive_blocks < 3:
        fatal.append(_issue(
            "content_too_shallow",
            "正文不足以形成可独立阅读的学习路径",
        ))
    elif compact_chars < 420:
        warnings.append(_issue(
            "content_depth_low",
            "正文深度偏低，建议补足关键因果桥或例子",
        ))

    duplicate_counts: dict[str, int] = {}
    for block in blocks:
        key = _normalized_duplicate_key(block)
        if len(key) < 30:
            continue
        duplicate_counts[key] = duplicate_counts.get(key, 0) + 1
    duplicate_groups = sum(count > 1 for count in duplicate_counts.values())
    if duplicate_groups >= 2:
        fatal.append(_issue(
            "repeated_content",
            "多个正文块重复，学习路径没有继续推进",
        ))
    elif duplicate_groups == 1:
        warnings.append(_issue(
            "repeated_content_minor",
            "存在一组重复正文块",
        ))

    if any(_PLACEHOLDER_RE.search(block) for block in blocks):
        fatal.append(_issue(
            "placeholder_content",
            "正文含有待补充或占位内容",
        ))

    coverage, hit_blocks, term_count = _topic_coverage(goal, blocks)
    distinctive_count, distinctive_hits = _distinctive_topic_anchor(goal, blocks)
    if term_count >= 3 and (hit_blocks == 0 or coverage < 0.06):
        fatal.append(_issue(
            "topic_mismatch",
            "正文没有覆盖学习目标中的核心主题词",
        ))
    elif term_count >= 3 and (coverage < 0.12 or hit_blocks < 2):
        warnings.append(_issue(
            "topic_coverage_low",
            "学习目标只在少量正文中得到响应",
        ))
    if distinctive_count and not distinctive_hits:
        fatal.append(_issue(
            "topic_anchor_missing",
            "正文只碰到了泛化词，没有出现学习目标的核心对象",
        ))

    content_text = scene_content_text(spec)
    goal_numbers = _numeric_anchors(goal)
    content_numbers = _numeric_anchors(content_text)
    matched_goal_numbers = goal_numbers.intersection(content_numbers)
    if len(goal_numbers) >= 2 and not matched_goal_numbers:
        fatal.append(_issue(
            "numeric_conditions_missing",
            "具体题目的已知数值没有进入正文",
        ))
    elif len(goal_numbers) >= 3 and len(matched_goal_numbers) * 2 < len(goal_numbers):
        warnings.append(_issue(
            "numeric_conditions_partial",
            "正文只保留了少量题目数值，请核对条件是否完整",
        ))

    source_grounding_required = source_requires_grounding(source_text)
    source_anchor_count, source_anchor_hits = _shared_source_anchors(source_text, blocks)
    if source_grounding_required and source_anchor_count and not source_anchor_hits:
        fatal.append(_issue(
            "source_not_grounded",
            "正文与用户提供的教材或笔记没有可追溯的术语重合",
        ))
    source_numbers = _numeric_anchors(source_text)
    source_numeric_matches = source_numbers.intersection(content_numbers)
    if source_grounding_required and len(source_numbers) >= 2 and not source_numeric_matches:
        fatal.append(_issue(
            "source_numbers_missing",
            "用户资料中的具体数值没有进入正文",
        ))

    request_text = f"{goal}\n{source_text}"
    explicit_newton = parse_explicit_newton_problem(request_text)
    if explicit_newton is not None:
        if not newton_content_matches_problem(content_text, explicit_newton):
            fatal.append(_issue(
                "newton_quantitative_content_mismatch",
                "正文中的质量、左右力、合力大小/方向或加速度与题面不一致",
            ))
        force_diagrams = [
            demo for demo in demonstrations if demo.get("kind") == "force_diagram"
        ]
        if (
            len(force_diagrams) != 1
            or not force_diagram_matches_problem(force_diagrams[0], explicit_newton)
        ):
            fatal.append(_issue(
                "newton_force_diagram_mismatch",
                "受力图没有且只用两条箭头呈现题面拉力/摩擦力的左右方向、数值标签与同一线性尺度",
            ))

    explicit_faraday = parse_explicit_faraday_problem(request_text)
    if explicit_faraday is not None:
        if not faraday_content_matches_problem(content_text, explicit_faraday):
            fatal.append(_issue(
                "faraday_quantitative_content_mismatch",
                "正文中的线圈参数、磁场变化、电动势正负或楞次方向与题面不一致",
            ))
        field_experiments = [
            demo for demo in demonstrations if demo.get("kind") == "field_experiment"
        ]
        if (
            len(field_experiments) != 1
            or not field_experiment_matches_problem(field_experiments[0], explicit_faraday)
        ):
            fatal.append(_issue(
                "faraday_field_experiment_mismatch",
                "法拉第演示的匝数、面积、磁场起止值、时间或预测答案方向与题面不一致",
            ))

    folded_goal = goal.casefold()
    folded_content = "\n".join(blocks).casefold()
    if (
        any(signal in folded_goal for signal in _NON_RIEMANN_INTEGRAL_SIGNALS)
        and (
            "riemann_sum" in demo_kinds
            or any(
                signal in folded_content
                for signal in ("黎曼", "曲线下面积", "矩形和", "riemann sum", "area under")
            )
        )
    ):
        fatal.append(_issue(
            "integral_topic_mismatch",
            "场景把其他积分类型错误替换成黎曼面积课",
        ))
    if any(signal in folded_goal for signal in _DERIVATION_REQUEST_SIGNALS):
        derivations = [
            block
            for section in spec.get("sections", [])
            for block in section.get("blocks", [])
            if block.get("kind") == "derivation"
        ]
        if not derivations:
            fatal.append(_issue(
                "missing_derivation",
                "学习目标明确要求推导或证明，但正文没有 derivation",
            ))

    visual_requested = any(signal in folded_goal for signal in _VISUAL_REQUEST_SIGNALS)
    if visual_requested and not demonstrations:
        fatal.append(_issue(
            "missing_demonstration",
            "学习目标明确要求观察动态或图形关系，但没有演示",
        ))
    if visual_requested:
        for family, signals, compatible in _DYNAMIC_FAMILIES:
            if not any(signal in folded_goal for signal in signals):
                continue
            if not demo_kinds.intersection(compatible):
                fatal.append(_issue(
                    "incompatible_demonstration",
                    f"{family} 学习动作没有匹配的演示原语",
                ))
            break

    if any(signal in folded_goal for signal in _PARAMETER_REQUEST_SIGNALS):
        parameter_kinds = {
            "linked_lab", "field_experiment", "limit_microscope", "riemann_sum",
            "constraint_geometry", "constrained_extremum_2d",
        }
        has_parameter_driver = bool(demo_kinds.intersection(parameter_kinds)) or any(
            demo.get("kind") == "function_plot"
            and isinstance((demo.get("data") or {}).get("parameter"), dict)
            for demo in demonstrations
        )
        if not has_parameter_driver:
            fatal.append(_issue(
                "missing_parameter_driver",
                "学习目标要求拖动或同步变化，但演示没有可操作的共享参数",
            ))

    explicit_relations = parse_explicit_relations(goal)
    if explicit_relations:
        strict_relations = (
            "有向图" in folded_goal
            or "directed graph" in folded_goal
            or any(weight is not None for _, _, weight in explicit_relations)
        )
        if not demonstrations_match_explicit_relations(
            demonstrations,
            explicit_relations,
            strict=strict_relations,
        ):
            fatal.append(_issue(
                "explicit_relation_demo_mismatch",
                "关系演示的端点、方向或边权与题目中的显式箭头关系不一致",
            ))

    expected_integral = parse_simple_integral(goal)
    asks_riemann = any(signal in folded_goal for signal in _RIEMANN_REQUEST_SIGNALS)
    if expected_integral is not None and asks_riemann:
        riemann_demos = [demo for demo in demonstrations if demo.get("kind") == "riemann_sum"]
        if not riemann_demos:
            fatal.append(_issue(
                "missing_explicit_integral_demo",
                "显式黎曼积分题没有经过校验的 riemann_sum 演示",
            ))
        elif not any(_demo_matches_integral(demo, expected_integral) for demo in riemann_demos):
            fatal.append(_issue(
                "integral_demo_mismatch",
                "riemann_sum 的被积函数或上下限与题目不一致",
            ))

    score = max(0, 100 - 28 * len(fatal) - 7 * len(warnings))
    return {
        "version": QUALITY_GATE_VERSION,
        "passed": not fatal,
        "score": score,
        "fatal_issues": fatal,
        "warnings": warnings,
        "metrics": {
            "content_chars": compact_chars,
            "substantive_blocks": substantive_blocks,
            "demonstrations": len(demonstrations),
            "topic_coverage": round(coverage, 3),
            "topic_hit_blocks": hit_blocks,
            "topic_anchor_hits": distinctive_hits,
            "goal_numeric_anchors": len(goal_numbers),
            "goal_numeric_matches": len(matched_goal_numbers),
            "source_anchor_hits": source_anchor_hits,
            "source_grounding_required": source_grounding_required,
            "source_numeric_anchors": len(source_numbers),
            "source_numeric_matches": len(source_numeric_matches),
            "explicit_newton_contract": explicit_newton is not None,
            "explicit_faraday_contract": explicit_faraday is not None,
        },
    }


def quality_failure_message(report: dict[str, Any]) -> str:
    messages = [
        str(issue.get("message", ""))
        for issue in report.get("fatal_issues", [])
        if issue.get("message")
    ]
    return "；".join(messages[:3]) or "知识场景未通过教学质量门"
