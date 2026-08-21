"""Strict, renderer-neutral contract for generated Axiom knowledge scenes.

The model may author learning content, but it never authors markup or code.  This
module keeps only a small set of text blocks and deterministic demonstration
primitives that the browser knows how to render safely.
"""
from __future__ import annotations

import ast
from fractions import Fraction
import math
import re
from typing import Any


SCENE_SCHEMA_VERSION = "2.0"

ALLOWED_BLOCK_KINDS = frozenset({
    "paragraph",
    "definition",
    "formula",
    "derivation",
    "example",
    "list",
    "comparison",
})

ALLOWED_DEMONSTRATION_KINDS = frozenset({
    "constrained_extremum_2d",
    "constraint_geometry",
    "equation_morph",
    "field_experiment",
    "function_plot",
    "geometry",
    "limit_microscope",
    "linked_lab",
    "force_diagram",
    "concept_map",
    "timeline",
    "probability_bars",
    "process",
    "riemann_sum",
})

_SAFE_EXPRESSION_RE = re.compile(r"^[\s\dA-Za-z_+\-*/^().,]+$")
_SAFE_EXPRESSION_NAMES = frozenset({
    "x", "t", "a", "b", "c", "h", "k", "m", "n", "p", "q", "r",
    "sin", "cos", "tan", "sqrt", "abs", "exp", "log", "pi", "e",
})
_SAFE_PARAMETER_NAMES = _SAFE_EXPRESSION_NAMES - {
    "x", "t", "sin", "cos", "tan", "sqrt", "abs", "exp", "log", "pi", "e",
}
_ID_RE = re.compile(r"[^a-z0-9_-]+")
_SEMANTIC_PART_ID_RE = re.compile(r"^[a-z][a-z0-9_-]{0,31}$")
_ANIMATION_SOURCE_REF_RE = re.compile(
    r"^/sections/(0|[1-9]\d*)/blocks/(0|[1-9]\d*)/steps/(0|[1-9]\d*)$"
)
_SEMANTIC_RELATIONS = frozenset({
    "appear",
    "match",
    "copy",
    "rewrite",
    "derive",
    "substitute",
    "split",
    "merge",
})
_MISSING = object()
_FORBIDDEN_LATEX_RE = re.compile(
    r"\\(?:href|url|includegraphics|htmlClass|htmlStyle|htmlId|htmlData|class|style|require|def|gdef|newcommand)\b",
    re.IGNORECASE,
)

_REQUEST_NUMBER_TOKEN = r"[+\-\u2212]?(?:\d+(?:\.\d+)?|\.\d+)"
_REQUEST_UNIT_TOKEN = (
    r"(?:rad/s|m/s(?:\^2|2|\u00b2)|m(?:\^2|2|\u00b2)|kg|mol|Hz|Pa|"
    r"N|T|V|A|J|W|K|s|ms|cm|mm|km|m|g|%|\u03a9|\u00b0|"
    r"\u5e73\u65b9\u7c73|\u7c73/\u79d2(?:\u5e73\u65b9|\u00b2)|\u5f27\u5ea6/\u79d2|\u5343\u514b|\u514b|\u725b\u987f|\u7279\u65af\u62c9|"
    r"\u4f0f\u7279|\u79d2|\u6beb\u79d2|\u7c73|\u8d6b\u5179|\u5e15|\u7126\u8033|\u74e6|\u6469\u5c14|\u6444\u6c0f\u5ea6|\u5ea6|\u531d)"
)
_REQUEST_NUMBER_RE = re.compile(
    rf"(?<![A-Za-z0-9_.^])(?P<number>{_REQUEST_NUMBER_TOKEN})"
    rf"(?P<spacing>\s*)(?P<unit>{_REQUEST_UNIT_TOKEN})?(?![A-Za-z0-9_])"
)
_REQUEST_SYMBOL_BEFORE_RE = re.compile(
    r"(?P<symbol>(?:[A-Za-z][A-Za-z0-9_]*|[\u0391-\u03a9\u03b1-\u03c9])"
    r"(?:\([^()\s]{1,12}\))?)\s*=\s*$"
)
_REQUEST_DIRECTIONS = (
    "\u5782\u76f4\u7eb8\u9762\u5411\u5916", "\u5782\u76f4\u7eb8\u9762\u5411\u5185",
    "\u9006\u65f6\u9488", "\u987a\u65f6\u9488", "\u51fa\u7eb8\u9762", "\u5165\u7eb8\u9762",
    "\u5411\u53f3", "\u5411\u5de6", "\u5411\u4e0a", "\u5411\u4e0b",
)
_REQUEST_QUANTITY_HINTS = (
    ("\u6469\u64e6\u529b", "\u6469\u64e6\u529b", "\u529b"),
    ("\u62c9\u529b", "\u62c9\u529b", "\u529b"),
    ("\u5408\u529b", "\u5408\u529b", "\u529b"),
    ("\u8d28\u91cf", "\u7269\u4f53", "\u8d28\u91cf"),
    ("\u9762\u79ef", "\u7ebf\u5708", "\u9762\u79ef"),
    ("\u531d", "\u7ebf\u5708", "\u531d\u6570"),
    ("\u78c1\u573a", "\u78c1\u573a", "\u78c1\u611f\u5e94\u5f3a\u5ea6"),
    ("\u611f\u5e94\u7535\u52a8\u52bf", "\u611f\u5e94\u7535\u52a8\u52bf", "\u7535\u52a8\u52bf"),
    ("\u7535\u52a8\u52bf", "\u7535\u52a8\u52bf", "\u7535\u52a8\u52bf"),
    ("\u7535\u963b", "\u7535\u963b", "\u7535\u963b"),
    ("\u7535\u6d41", "\u7535\u6d41", "\u7535\u6d41"),
    ("\u632f\u5e45", "\u632f\u5e45", "\u632f\u5e45"),
    ("\u89d2\u9891\u7387", "\u89d2\u9891\u7387", "\u89d2\u9891\u7387"),
    ("\u9891\u7387", "\u9891\u7387", "\u9891\u7387"),
    ("\u52a0\u901f\u5ea6", "\u7269\u4f53", "\u52a0\u901f\u5ea6"),
    ("\u901f\u5ea6", "\u7269\u4f53", "\u901f\u5ea6"),
    ("\u534a\u5f84", "\u51e0\u4f55\u5bf9\u8c61", "\u534a\u5f84"),
    ("\u6982\u7387", "\u4e8b\u4ef6", "\u6982\u7387"),
    ("\u6e29\u5ea6", "\u7cfb\u7edf", "\u6e29\u5ea6"),
    ("\u6d53\u5ea6", "\u6eb6\u6db2", "\u6d53\u5ea6"),
)
_REQUEST_SCOPE_PHRASES = (
    "\u5ffd\u7565\u7ad6\u76f4\u65b9\u5411",
    "\u53ea\u5206\u6790\u9898\u76ee\u7ed9\u51fa\u7684\u4e24\u4e2a\u6c34\u5e73\u529b",
)


class SceneValidationError(ValueError):
    """Raised when a model-authored scene cannot be rendered safely."""


def scene_contract_summary() -> dict[str, Any]:
    """Compact contract sent to Coze; the full prompt contains semantic rules."""
    return {
        "schema_version": SCENE_SCHEMA_VERSION,
        "renderer": "axiom_structured_scene",
        "block_kinds": sorted(ALLOWED_BLOCK_KINDS),
        "demonstration_kinds": sorted(ALLOWED_DEMONSTRATION_KINDS),
        "root_shape": {
            "subject": "string",
            "topic": "string",
            "title": "string",
            "learning_goal": "string",
            "sections": "[{id, heading, blocks}]",
            "demonstrations": "[{id, kind, title, anchor_section_id, side, semantic_ids?, prediction?, data}]",
            "summary": "string[2..6]",
        },
        "block_shapes": {
            "paragraph": "{kind, text, semantic_ids?:semantic_id[0..8]}",
            "definition": "{kind, term, text, latex?, semantic_ids?:semantic_id[0..8]}",
            "formula": "{kind, latex, caption?, semantic_ids?:semantic_id[0..8]}",
            "derivation": "{kind, title?, steps:formula_step[2..10], semantic_ids?:semantic_id[0..8]}",
            "example": "{kind, prompt, steps:[{text?,latex?}], result?, semantic_ids?:semantic_id[0..8]}; every step must contain text or latex",
            "list": "{kind, style:ordered|unordered, items:string[], semantic_ids?:semantic_id[0..8]}",
            "comparison": "{kind, columns:string[], rows:string[][], semantic_ids?:semantic_id[0..8]}",
        },
        "semantic_id_shape": "lowercase ^[a-z][a-z0-9_-]{0,31}$; ids on a demonstration must be declared by at least one content block",
        "prediction_shape": "{prompt,options:[{id,label}][2..4],answer_id,explanation?}; answer_id must reference exactly one option",
        "formula_step_shape": "{latex,note?,parts?:[{id,latex,from?:id[0..4],relation?:appear|match|copy|rewrite|derive|substitute|split|merge,phase?:integer 0..4}]}",
        "animation_patch_shape": {
            "patch_versions": ["1.0", "1.1"],
            "v1.0_animation": "null | {title, steps:[{source_ref,parts}][3..10]}",
            "v1.1_animation": "null | {title, source_refs:string[3..10]}",
            "source_ref": "/sections/{zero_based_index}/blocks/{zero_based_index}/steps/{zero_based_index}",
            "step_rule": "refs are unique and strictly increase in prose order; they only target derivation steps; v1.1 must cover every step of each selected derivation block and selected derivation blocks must be consecutive; v1.0 parts has exactly id,latex,from,relation,phase; neither version can supply full-step latex or note",
        },
        "demonstration_shapes": {
            "constrained_extremum_2d": "data={constraint:{kind:circle,center:[x,y],radius},objective:{kind:linear,coefficients:[a,b],constant?},extremum:maximum|minimum,start_angle_deg,duration_ms}",
            "constraint_geometry": "data={mode:inscribed_angle,center:[x,y],radius,fixed_angles_deg:[a,b],moving_angle_deg,duration_ms?,semantic_map?:{chord,angle,invariant}}; semantic_map is required when demonstration.semantic_ids is non-empty",
            "equation_morph": "data={steps:formula_step[2..10]}",
            "field_experiment": "data={mode:faraday_loop,turns,area,orientation_deg,field_start,field_end,change_duration_s?,duration_ms?,semantic_map?:{field,flux,emf,direction}}; semantic_map is required when demonstration.semantic_ids is non-empty; B>0 is out of page and counter-clockwise emf is positive",
            "function_plot": "data={domain:[min,max],range:[min,max],series:[{expression,label}],x_label?,y_label?,parameter?:{name,min,max,initial}}",
            "geometry": "data={points:[{id,x:0..1,y:0..1,label?}],segments:[{from,to,label?}],polygons?:[point_id[]]}",
            "limit_microscope": "data={mode:derivative,expression,domain:[min,max],range:[min,max],x0,h_initial,h_min,h_max,duration_ms?,semantic_map?:{secant,tangent,process}}; semantic_map is required when demonstration.semantic_ids is non-empty",
            "linked_lab": "data={parameter:{id,label,min,max,initial,step?,unit?},domain?:[min,max],range:[min,max],readouts:[{id,semantic_id,label,expression,unit?}][1..4],curves?:[{id,semantic_id,label,expression}][0..3],vectors?:[{id,semantic_id,label,x_expression,y_expression}][0..3],formula_latex?}",
            "force_diagram": "data={body_label,vectors:[{label,angle,magnitude}]}; angle uses mathematical convention: 0=right, 90=up, 180=left, -90=down; all vectors share one linear magnitude scale",
            "concept_map": "data={nodes:[{id,label}][2..9],edges:[{from,to,label?}][1..14]}; no self-loop or duplicate directed edge; every node must belong to one connected relation graph",
            "timeline": "data={items:[{label,detail?}][2..8]}; labels must be distinct",
            "probability_bars": "data={bars:[{label,value:0..1}]}",
            "process": "data={steps:[{label,detail?}][2..8]}; labels must be distinct",
            "riemann_sum": "data={mode:area_under_curve,expression,domain:[a,b],range:[min,max],n_initial,n_min,n_max,sample:left|midpoint|right,duration_ms?,semantic_map?:{curve,rectangles,area,limit}}; n are integers 2..128 with n_min<=n_initial<n_max; semantic_map is required when demonstration.semantic_ids is non-empty; renderer must show n, rectangles, sum, stable numerical reference/error and n->infinity limit; paths, rectangles and numerical values are renderer-computed",
        },
        "limits": {
            "sections": [3, 8],
            "blocks_per_section": [1, 8],
            "demonstrations": [0, 6],
            "derivation_steps": [2, 10],
            "concept_nodes": 9,
            "semantic_ids_per_object": 8,
            "prediction_options": [2, 4],
        },
        "layout_rule": "正文按 learning_path 竖向推进；演示只锚定正文并置于左右侧",
        "security_rule": "只输出 JSON；不得输出 HTML、JavaScript、Markdown、URL 或可执行代码",
    }


def _request_number_value(raw: str) -> int | float:
    value = float(raw.replace("\u2212", "-"))
    return int(value) if value.is_integer() else value


def _request_number_display(raw: str) -> str:
    value = _request_number_value(raw)
    return str(value)


def _finite_decimal_text(value: Fraction, *, maximum_places: int = 12) -> str | None:
    """Return an exact finite decimal, never a rounded physics result."""
    denominator = value.denominator
    remaining = denominator
    powers_of_two = 0
    powers_of_five = 0
    while remaining % 2 == 0:
        powers_of_two += 1
        remaining //= 2
    while remaining % 5 == 0:
        powers_of_five += 1
        remaining //= 5
    places = max(powers_of_two, powers_of_five)
    if remaining != 1 or places > maximum_places:
        return None

    scale = 10 ** places
    scaled = value.numerator * (scale // denominator)
    sign = "-" if scaled < 0 else ""
    digits = abs(scaled)
    if places == 0:
        return f"{sign}{digits}"
    whole, fraction = divmod(digits, scale)
    decimal = f"{fraction:0{places}d}".rstrip("0")
    return f"{sign}{whole}.{decimal}" if decimal else f"{sign}{whole}"


def _nearest_request_hint(
    text: str,
    start: int,
    end: int,
) -> tuple[str, str] | None:
    best: tuple[int, str, str] | None = None
    window_start = max(0, start - 48)
    window_end = min(len(text), end + 48)
    window = text[window_start:window_end]
    for marker, object_name, quantity in _REQUEST_QUANTITY_HINTS:
        offset = 0
        while True:
            marker_index = window.find(marker, offset)
            if marker_index < 0:
                break
            absolute_start = window_start + marker_index
            absolute_end = absolute_start + len(marker)
            distance = min(abs(start - absolute_end), abs(absolute_start - end))
            candidate = (distance, object_name, quantity)
            if best is None or candidate < best:
                best = candidate
            offset = marker_index + len(marker)
    if best is None:
        return None
    return best[1], best[2]


def _request_fact_identity(
    text: str,
    start: int,
    end: int,
    unit: str,
) -> tuple[str, str] | None:
    compact_unit = unit.replace(" ", "")
    if compact_unit in {"kg", "\u5343\u514b", "g", "\u514b"}:
        return "\u7269\u4f53", "\u8d28\u91cf"
    if compact_unit in {"\u531d"}:
        return "\u7ebf\u5708", "\u531d\u6570"
    if compact_unit in {"m^2", "m2", "m\u00b2", "\u5e73\u65b9\u7c73"}:
        return "\u7ebf\u5708", "\u9762\u79ef"
    if compact_unit in {"T", "\u7279\u65af\u62c9"}:
        return "\u78c1\u573a", "\u78c1\u611f\u5e94\u5f3a\u5ea6"
    if compact_unit in {"s", "ms", "\u79d2", "\u6beb\u79d2"}:
        return "\u8fc7\u7a0b", "\u65f6\u95f4"
    if compact_unit in {"rad/s", "\u5f27\u5ea6/\u79d2"}:
        return "\u89d2\u9891\u7387", "\u89d2\u9891\u7387"
    if compact_unit in {"V", "\u4f0f\u7279"}:
        return "\u7535\u52a8\u52bf", "\u7535\u52a8\u52bf"
    if compact_unit in {"A"}:
        return "\u7535\u6d41", "\u7535\u6d41"
    nearest = _nearest_request_hint(text, start, end)
    if compact_unit in {"N", "\u725b\u987f"}:
        if nearest is not None and nearest[1] == "\u529b":
            return nearest
        return "\u529b", "\u529b"
    if nearest is not None:
        return nearest
    if compact_unit:
        return "\u5df2\u77e5\u91cf", "\u6570\u503c"
    return None


def _nearest_request_direction(text: str, start: int, end: int) -> str | None:
    best: tuple[int, str] | None = None
    for direction in _REQUEST_DIRECTIONS:
        offset = 0
        while True:
            index = text.find(direction, offset)
            if index < 0:
                break
            direction_end = index + len(direction)
            distance = min(abs(start - direction_end), abs(index - end))
            if distance <= 24:
                candidate = (distance, direction)
                if best is None or candidate < best:
                    best = candidate
            offset = index + len(direction)
    return best[1] if best is not None else None


def _explicit_request_symbol(text: str, number_start: int) -> str | None:
    prefix = text[max(0, number_start - 28):number_start]
    match = _REQUEST_SYMBOL_BEFORE_RE.search(prefix)
    return match.group("symbol") if match is not None else None


def _request_numeric_facts(text: str, origin: str) -> list[dict[str, Any]]:
    facts: list[dict[str, Any]] = []
    for match in _REQUEST_NUMBER_RE.finditer(text):
        unit = match.group("unit") or ""
        identity = _request_fact_identity(text, match.start(), match.end(), unit)
        symbol = _explicit_request_symbol(text, match.start())
        if identity is None and symbol is None:
            continue
        object_name, quantity = identity or ("\u663e\u5f0f\u7b26\u53f7", "\u6570\u503c")
        fact: dict[str, Any] = {
            "object": object_name,
            "quantity": quantity,
            "value": _request_number_value(match.group("number")),
            "raw": match.group(0).strip(),
            "origin": origin,
        }
        if unit:
            fact["unit"] = unit
        if symbol is not None:
            fact["symbol"] = symbol
        if quantity in {"\u529b", "\u901f\u5ea6", "\u52a0\u901f\u5ea6", "\u78c1\u611f\u5e94\u5f3a\u5ea6", "\u7535\u6d41", "\u7535\u52a8\u52bf"}:
            if quantity == "\u78c1\u611f\u5e94\u5f3a\u5ea6":
                direction = next(
                    (
                        item for item in (
                            "\u5782\u76f4\u7eb8\u9762\u5411\u5916", "\u5782\u76f4\u7eb8\u9762\u5411\u5185",
                            "\u51fa\u7eb8\u9762", "\u5165\u7eb8\u9762",
                        )
                        if item in text
                    ),
                    None,
                )
            else:
                direction = _nearest_request_direction(text, match.start(), match.end())
            if direction is not None:
                fact["direction"] = direction
        facts.append(fact)
    return facts


def _request_relation_facts(text: str, origin: str) -> list[dict[str, Any]]:
    facts: list[dict[str, Any]] = []
    positive_direction = re.compile(
        r"\u4ee5(?P<direction>\u9006\u65f6\u9488|\u987a\u65f6\u9488|\u5411\u53f3|\u5411\u5de6|\u5411\u4e0a|\u5411\u4e0b)"
        r"(?P<object>\u611f\u5e94\u7535\u52a8\u52bf|\u7535\u52a8\u52bf|\u7535\u6d41|\u78c1\u573a)\u4e3a\u6b63"
    )
    named_positive_direction = re.compile(
        r"(?P<object>\u78c1\u573a|\u611f\u5e94\u7535\u52a8\u52bf|\u7535\u52a8\u52bf|\u7535\u6d41)"
        r"(?:\u7684)?\u6b63\u65b9\u5411\u4e3a(?P<direction>\u51fa\u7eb8\u9762|\u5165\u7eb8\u9762|\u9006\u65f6\u9488|\u987a\u65f6\u9488|\u5411\u53f3|\u5411\u5de6|\u5411\u4e0a|\u5411\u4e0b)"
    )
    for pattern in (positive_direction, named_positive_direction):
        for match in pattern.finditer(text):
            facts.append({
                "object": match.group("object"),
                "quantity": "\u6b63\u65b9\u5411",
                "direction": match.group("direction"),
                "raw": match.group(0),
                "origin": origin,
            })
    for match in re.finditer(r"(?P<object>\u7ebf\u5708\u7535\u963b|\u7535\u963b)\u4e3a\u6b63", text):
        facts.append({
            "object": match.group("object"),
            "quantity": "\u7b26\u53f7",
            "relation": "positive",
            "raw": match.group(0),
            "origin": origin,
        })
    for phrase in _REQUEST_SCOPE_PHRASES:
        if phrase in text:
            facts.append({
                "object": "\u5206\u6790\u8303\u56f4",
                "quantity": "\u9650\u5b9a",
                "raw": phrase,
                "origin": origin,
            })
    return facts


def _request_force_visual_target(text: str) -> dict[str, Any] | None:
    if "\u53d7\u529b\u56fe" not in text and "\u529b\u56fe" not in text:
        return None
    direction_angles = {"\u5411\u53f3": 0, "\u5411\u4e0a": 90, "\u5411\u5de6": 180, "\u5411\u4e0b": -90}
    number = _REQUEST_NUMBER_TOKEN
    patterns = (
        re.compile(
            rf"(?P<direction>\u5411\u53f3|\u5411\u5de6|\u5411\u4e0a|\u5411\u4e0b)\s*"
            rf"(?P<number>{number})\s*(?P<unit>N|\u725b\u987f)\s*(?P<label>[\u3400-\u9fffA-Za-z]{{1,8}}?\u529b)"
        ),
        re.compile(
            rf"(?P<number>{number})\s*(?P<unit>N|\u725b\u987f)\s*"
            rf"(?P<direction>\u5411\u53f3|\u5411\u5de6|\u5411\u4e0a|\u5411\u4e0b)(?:\u7684)?"
            rf"(?P<label>[\u3400-\u9fffA-Za-z]{{1,8}}?\u529b)"
        ),
    )
    matches: list[tuple[int, dict[str, Any]]] = []
    for pattern in patterns:
        for match in pattern.finditer(text):
            magnitude = _request_number_value(match.group("number"))
            matches.append((match.start(), {
                "label": f"{_request_number_display(match.group('number'))} N {match.group('label')}",
                "angle": direction_angles[match.group("direction")],
                "magnitude": magnitude,
            }))
    vectors: list[dict[str, Any]] = []
    seen: set[tuple[str, int, float]] = set()
    for _, vector in sorted(matches, key=lambda item: item[0]):
        key = (vector["label"], vector["angle"], vector["magnitude"])
        if key in seen:
            continue
        seen.add(key)
        vectors.append(vector)
    if (
        not 1 <= len(vectors) <= 8
        or any(not 0.05 <= float(vector["magnitude"]) <= 10 for vector in vectors)
    ):
        return None
    mass_match = re.search(
        rf"\u8d28\u91cf\s*(?P<number>{number})\s*(?:kg|\u5343\u514b)",
        text,
    )
    body_label = (
        f"{_request_number_display(mass_match.group('number'))} kg"
        if mass_match is not None
        else ("\u7269\u4f53" if "\u7269\u4f53" in text else "\u53d7\u529b\u7269\u4f53")
    )
    return {
        "kind": "force_diagram",
        "semantic_ids": [],
        "data": {
            "body_label": body_label,
            "vectors": vectors,
        },
    }


def _request_field_visual_target(text: str) -> dict[str, Any] | None:
    if not all(marker in text for marker in ("\u7ebf\u5708", "\u78c1\u573a", "\u7535\u52a8\u52bf")):
        return None
    number = _REQUEST_NUMBER_TOKEN
    turns_match = re.search(rf"(?P<value>{number})\s*\u531d", text)
    area_match = re.search(
        rf"\u9762\u79ef\s*(?:\u4e3a|=)?\s*(?P<value>{number})\s*(?:m(?:\^2|2|\u00b2)|\u5e73\u65b9\u7c73)",
        text,
    )
    duration_match = re.search(rf"(?P<value>{number})\s*(?:s|\u79d2)\s*\u5185", text)
    field_match = re.search(
        rf"\u4ece\s*(?P<start>{number})\s*(?:T|\u7279\u65af\u62c9)\s*(?:\u5747\u5300)?\s*"
        rf"(?:\u589e\u81f3|\u589e\u52a0\u81f3|\u589e\u52a0\u5230|\u5347\u81f3|\u53d8\u4e3a|\u5230|\u51cf\u81f3|\u964d\u81f3)\s*"
        rf"(?P<end>{number})\s*(?:T|\u7279\u65af\u62c9)",
        text,
    )
    outward = "\u5782\u76f4\u7eb8\u9762\u5411\u5916" in text or "\u51fa\u7eb8\u9762" in text
    if not all((turns_match, area_match, duration_match, field_match, outward)):
        return None
    turns = _request_number_value(turns_match.group("value"))
    area = float(_request_number_value(area_match.group("value")))
    duration = _request_number_value(duration_match.group("value"))
    field_start = float(_request_number_value(field_match.group("start")))
    field_end = float(_request_number_value(field_match.group("end")))
    if (
        not isinstance(turns, int)
        or not 1 <= turns <= 10000
        or not 1e-8 <= area <= 1000
        or not 0.001 <= float(duration) <= 1000
        or not -100 <= field_start <= 100
        or not -100 <= field_end <= 100
        or math.isclose(field_start, field_end, rel_tol=0.0, abs_tol=1e-12)
    ):
        return None
    return {
        "kind": "field_experiment",
        "semantic_ids": [],
        "data": {
            "mode": "faraday_loop",
            "turns": turns,
            "area": area,
            "orientation_deg": 0,
            "field_start": field_start,
            "field_end": field_end,
            "change_duration_s": duration,
        },
    }


def _request_derived_physics_facts(text: str) -> list[dict[str, Any]]:
    """Derive only exact finite-decimal results from the production P01/P02 parsers.

    The quality gate remains the single source of truth for deciding whether a
    request is the supported, unambiguous two-force or Faraday problem.  This
    writer hint only closes the final arithmetic step after that parser has
    proved the inputs; it never tries to infer a result from generic physics
    prose.
    """
    from core.boards.knowledge_scene_quality import (  # Local import avoids a module cycle.
        parse_explicit_faraday_problem,
        parse_explicit_newton_problem,
    )

    newton = parse_explicit_newton_problem(text)
    faraday = parse_explicit_faraday_problem(text)
    if (newton is None) == (faraday is None):
        # Neither shape, or an input that combines two independent problems.
        return []

    if newton is not None:
        # Do not place a second trusted answer beside an answer already supplied
        # by the request.  A stated result belongs to model/quality review.
        if re.search(
            rf"(?:\u5408\u529b|\u51c0\u529b)[^\u3002\uff1b;\n]{{0,24}}{_REQUEST_NUMBER_TOKEN}\s*(?:N|\u725b\u987f)",
            text,
        ) or re.search(
            rf"{_REQUEST_NUMBER_TOKEN}\s*(?:N|\u725b\u987f)[^\u3002\uff1b;\n]{{0,12}}(?:\u5408\u529b|\u51c0\u529b)",
            text,
        ) or re.search(
            rf"\u52a0\u901f\u5ea6[^\u3002\uff1b;\n]{{0,24}}{_REQUEST_NUMBER_TOKEN}\s*"
            rf"(?:m/s(?:\^2|2|\u00b2)|\u7c73/\u79d2(?:\u5e73\u65b9|\u00b2))",
            text,
        ) or re.search(
            rf"{_REQUEST_NUMBER_TOKEN}\s*(?:m/s(?:\^2|2|\u00b2)|\u7c73/\u79d2(?:\u5e73\u65b9|\u00b2))"
            rf"[^\u3002\uff1b;\n]{{0,12}}\u52a0\u901f\u5ea6",
            text,
        ):
            return []
        mass = Fraction(str(newton["mass_kg"]))
        net_force = Fraction(str(newton["right_force_n"])) - Fraction(
            str(newton["left_force_n"])
        )
        acceleration = net_force / mass
        net_text = _finite_decimal_text(net_force)
        acceleration_text = _finite_decimal_text(acceleration)
        if net_text is None or acceleration_text is None:
            return []
        return [
            {
                "object": "\u5408\u529b",
                "quantity": "\u529b",
                "value": _request_number_value(net_text),
                "unit": "N",
                "direction": "\u5411\u53f3",
                "raw": f"\u5408\u529b\u4e3a{net_text} N\uff0c\u65b9\u5411\u5411\u53f3",
                "origin": "axiom_derived",
            },
            {
                "object": "\u7269\u4f53",
                "quantity": "\u52a0\u901f\u5ea6",
                "value": _request_number_value(acceleration_text),
                "unit": "m/s\u00b2",
                "direction": "\u5411\u53f3",
                "raw": f"\u52a0\u901f\u5ea6\u4e3a{acceleration_text} m/s\u00b2\uff0c\u65b9\u5411\u5411\u53f3",
                "origin": "axiom_derived",
            },
        ]

    assert faraday is not None
    if re.search(
        rf"(?:\u611f\u5e94)?\u7535\u52a8\u52bf[^\u3002\uff1b;\n]{{0,24}}{_REQUEST_NUMBER_TOKEN}\s*(?:V|\u4f0f\u7279)",
        text,
    ) or re.search(
        rf"{_REQUEST_NUMBER_TOKEN}\s*(?:V|\u4f0f\u7279)[^\u3002\uff1b;\n]{{0,12}}(?:\u611f\u5e94)?\u7535\u52a8\u52bf",
        text,
    ):
        return []
    emf = (
        -Fraction(str(faraday["turns"]))
        * Fraction(str(faraday["area_m2"]))
        * (Fraction(str(faraday["field_end_t"])) - Fraction(str(faraday["field_start_t"])))
        / Fraction(str(faraday["change_duration_s"]))
    )
    emf_text = _finite_decimal_text(emf)
    if emf_text is None:
        return []
    return [
        {
            "object": "\u611f\u5e94\u7535\u52a8\u52bf",
            "quantity": "\u7535\u52a8\u52bf",
            "value": _request_number_value(emf_text),
            "unit": "V",
            "direction": "\u987a\u65f6\u9488",
            "raw": f"\u611f\u5e94\u7535\u52a8\u52bf\u4e3a{emf_text} V\uff0c\u5bf9\u5e94\u987a\u65f6\u9488\u611f\u5e94\u7535\u6d41",
            "origin": "axiom_derived",
        },
        {
            "object": "\u695e\u6b21\u5b9a\u5f8b",
            "quantity": "\u4f5c\u7528",
            "relation": "opposes_flux_increase",
            "raw": "\u695e\u6b21\u5b9a\u5f8b\uff1a\u611f\u5e94\u7535\u6d41\u4ea7\u751f\u7684\u78c1\u573a\u963b\u788d\u78c1\u901a\u91cf\u589e\u52a0",
            "origin": "axiom_derived",
        },
    ]


def scene_request_requirements(goal: str = "", source_text: str = "") -> dict[str, Any]:
    """Extract bounded, non-instructional request anchors for the writer.

    Only short numeric facts, explicit sign/direction conventions and two
    renderer-native visual targets are promoted into the trusted contract.  No
    arbitrary source prose is copied, so prompt-like source text cannot grow the
    system contract or change its rules.
    """
    facts: list[dict[str, Any]] = []
    seen: set[tuple[tuple[str, str], ...]] = set()
    for origin, text in (("goal", goal), ("source_text", source_text)):
        bounded = str(text or "")[:12000]
        for fact in (*_request_numeric_facts(bounded, origin), *_request_relation_facts(bounded, origin)):
            key = tuple(
                sorted((name, str(value)) for name, value in fact.items() if name != "origin")
            )
            if key in seen:
                continue
            seen.add(key)
            facts.append(fact)
            if len(facts) >= 16:
                break
        if len(facts) >= 16:
            break

    combined = f"{goal}\n{source_text}"[:12250]
    for fact in _request_derived_physics_facts(combined):
        key = tuple(
            sorted((name, str(value)) for name, value in fact.items() if name != "origin")
        )
        if key in seen:
            continue
        seen.add(key)
        facts.append(fact)
    visual_target = _request_force_visual_target(combined)
    if visual_target is None:
        visual_target = _request_field_visual_target(combined)

    result: dict[str, Any] = {}
    if facts:
        result["required_facts"] = facts
    if visual_target is not None:
        result["required_visual_target"] = visual_target
    return result


def scene_writer_contract_summary(
    goal: str = "",
    source_text: str = "",
) -> dict[str, Any]:
    """Return only fields the scene-writer node is allowed to author.

    Formula animation is derived from validated prose or selected by the later
    read-only patch node.  Hiding those shapes from the writer removes a
    contradictory instruction and reduces the chance of invalid demonstrations
    being emitted in the scene itself.
    """
    contract = scene_contract_summary()
    contract["demonstration_kinds"] = [
        kind for kind in contract["demonstration_kinds"]
        if kind != "equation_morph"
    ]
    contract["formula_step_shape"] = "{latex,note?}"
    contract.pop("animation_patch_shape", None)
    contract["demonstration_shapes"].pop("equation_morph", None)
    contract["forbidden_writer_fields"] = [
        "formula_step.parts", "equation_morph", "animation_patch",
    ]
    requirements = scene_request_requirements(goal, source_text)
    if requirements:
        contract["request_requirement_rule"] = (
            "required_facts\u9010\u9879\u8fdb\u5165\u6b63\u6587\uff1brequired_visual_target.kind/semantic_ids/data\u9010\u5b57\u590d\u5236\u5230\u4e00\u4e2a\u6f14\u793a\u3002"
            "\u7981\u6b62\u6362\u7b97\u3001\u53d6\u8fd1\u4f3c\u3001\u6539\u5355\u4f4d/\u7b26\u53f7/\u6b63\u8d1f\u53f7/\u65b9\u5411/\u89d2\u5ea6\uff1b\u51b2\u7a81\u65f6\u672c\u5408\u540c\u4f18\u5148\u3002"
        )
        contract.update(requirements)
    return contract


def _text(value: Any, field: str, *, maximum: int, minimum: int = 1) -> str:
    if not isinstance(value, str):
        raise SceneValidationError(f"{field} 必须是字符串")
    result = value.strip()
    if len(result) < minimum:
        raise SceneValidationError(f"{field} 不能为空")
    if len(result) > maximum:
        raise SceneValidationError(f"{field} 超过 {maximum} 个字符")
    return result


def _optional_text(value: Any, field: str, *, maximum: int) -> str:
    if value in (None, ""):
        return ""
    return _text(value, field, maximum=maximum)


def _latex(value: Any, field: str, *, maximum: int) -> str:
    result = _text(value, field, maximum=maximum)
    if _FORBIDDEN_LATEX_RE.search(result):
        raise SceneValidationError(f"{field} 包含不允许的 LaTeX 命令")
    return result


def _optional_latex(value: Any, field: str, *, maximum: int) -> str:
    if value in (None, ""):
        return ""
    return _latex(value, field, maximum=maximum)


def _number(
    value: Any,
    field: str,
    *,
    minimum: float = -10000,
    maximum: float = 10000,
) -> float:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise SceneValidationError(f"{field} 必须是数字")
    result = float(value)
    if not math.isfinite(result) or not minimum <= result <= maximum:
        raise SceneValidationError(f"{field} 超出允许范围")
    return result


def _identifier(value: Any, fallback: str) -> str:
    raw = str(value or fallback).strip().lower()[:48]
    normalized = _ID_RE.sub("-", raw).strip("-")
    return normalized or fallback


def _string_list(
    value: Any,
    field: str,
    *,
    minimum: int = 1,
    maximum: int = 10,
    item_limit: int = 180,
) -> list[str]:
    if not isinstance(value, list) or not minimum <= len(value) <= maximum:
        raise SceneValidationError(f"{field} 数量必须在 {minimum} 到 {maximum} 之间")
    return [
        _text(item, f"{field}[{index}]", maximum=item_limit)
        for index, item in enumerate(value)
    ]


def _normalize_formula_step(value: Any, field: str) -> dict[str, Any]:
    if isinstance(value, str):
        return {"latex": _latex(value, field, maximum=360), "note": ""}
    if not isinstance(value, dict):
        raise SceneValidationError(f"{field} 必须是公式步骤对象")
    return {
        "latex": _latex(value.get("latex"), f"{field}.latex", maximum=360),
        "note": _optional_text(value.get("note"), f"{field}.note", maximum=100),
    }


def _semantic_part_id(value: Any, field: str) -> str:
    if not isinstance(value, str) or not _SEMANTIC_PART_ID_RE.fullmatch(value):
        raise SceneValidationError(
            f"{field} 必须匹配 ^[a-z][a-z0-9_-]{{0,31}}$"
        )
    return value


def _normalize_semantic_ids(value: Any, field: str) -> list[str]:
    """Normalize a small, declarative bridge between prose and demonstrations."""
    if value in (None, ""):
        return []
    if not isinstance(value, list) or len(value) > 8:
        raise SceneValidationError(f"{field} 必须是最多 8 个语义 id 的数组")
    result = [
        _semantic_part_id(item, f"{field}[{index}]")
        for index, item in enumerate(value)
    ]
    if len(result) != len(set(result)):
        raise SceneValidationError(f"{field} 不能包含重复 id")
    return result


def _normalize_prediction(value: Any, field: str) -> dict[str, Any] | None:
    if value in (None, ""):
        return None
    if not isinstance(value, dict):
        raise SceneValidationError(f"{field} 必须是对象")
    raw_options = value.get("options")
    if not isinstance(raw_options, list) or not 2 <= len(raw_options) <= 4:
        raise SceneValidationError(f"{field}.options 必须有 2 到 4 项")
    options: list[dict[str, str]] = []
    option_ids: set[str] = set()
    for index, raw_option in enumerate(raw_options):
        option_field = f"{field}.options[{index}]"
        if not isinstance(raw_option, dict):
            raise SceneValidationError(f"{option_field} 必须是对象")
        option_id = _semantic_part_id(raw_option.get("id"), f"{option_field}.id")
        if option_id in option_ids:
            raise SceneValidationError(f"{option_field}.id 重复")
        option_ids.add(option_id)
        options.append({
            "id": option_id,
            "label": _text(raw_option.get("label"), f"{option_field}.label", maximum=120),
        })
    answer_id = _semantic_part_id(value.get("answer_id"), f"{field}.answer_id")
    if answer_id not in option_ids:
        raise SceneValidationError(f"{field}.answer_id 必须引用已有 option.id")
    return {
        "prompt": _text(value.get("prompt"), f"{field}.prompt", maximum=240),
        "options": options,
        "answer_id": answer_id,
        "explanation": _optional_text(
            value.get("explanation"),
            f"{field}.explanation",
            maximum=320,
        ),
    }


def _attach_semantic_ids(
    result: dict[str, Any],
    value: dict[str, Any],
    field: str,
    *,
    drop_invalid_semantics: bool,
    validation_warnings: list[str],
) -> dict[str, Any]:
    if "semantic_ids" in value:
        try:
            result["semantic_ids"] = _normalize_semantic_ids(
                value.get("semantic_ids"),
                f"{field}.semantic_ids",
            )
        except SceneValidationError as exc:
            if not drop_invalid_semantics:
                raise
            validation_warnings.append(
                f"{exc}；已忽略该内容块的 semantic_ids 并保留知识内容"
            )
    return result


def _compact_latex(value: str) -> str:
    return re.sub(r"\s+", "", value)


def _has_balanced_group_braces(value: str) -> bool:
    """Cheaply reject fragments that split a TeX group between two parts."""
    depth = 0
    preceding_backslashes = 0
    for character in value:
        if character == "\\":
            preceding_backslashes += 1
            continue
        escaped = preceding_backslashes % 2 == 1
        preceding_backslashes = 0
        if character == "{" and not escaped:
            depth += 1
        elif character == "}" and not escaped:
            depth -= 1
            if depth < 0:
                return False
    return depth == 0


def _has_balanced_sizing_delimiters(value: str) -> bool:
    r"""Require every TeX ``\left`` to close with a later ``\right`` in-part."""
    depth = 0
    index = 0
    while index < len(value):
        if value[index] != "\\":
            index += 1
            continue

        run_start = index
        while index < len(value) and value[index] == "\\":
            index += 1
        # TeX consumes pairs of backslashes as ``\\``.  With an odd run the
        # final backslash can introduce the alphabetic command that follows.
        if (index - run_start) % 2 == 0:
            continue

        command = ""
        if value.startswith("left", index):
            command = "left"
        elif value.startswith("right", index):
            command = "right"
        if not command:
            continue

        command_end = index + len(command)
        if command_end < len(value) and value[command_end].isalpha():
            continue
        if command == "left":
            depth += 1
        else:
            depth -= 1
            if depth < 0:
                return False
        index = command_end

    return depth == 0


def _normalize_semantic_parts(
    raw_steps: list[Any],
    steps: list[dict[str, Any]],
    field: str,
) -> None:
    raw_parts_by_step = [
        step.get("parts") if isinstance(step, dict) and "parts" in step else _MISSING
        for step in raw_steps
    ]
    annotated = [raw_parts is not _MISSING for raw_parts in raw_parts_by_step]
    if not any(annotated):
        return
    if not all(annotated):
        raise SceneValidationError(f"{field} 的 semantic parts 必须覆盖全部步骤或全部省略")

    previous_parts: dict[str, dict[str, Any]] = {}
    normalized_parts_by_step: list[list[dict[str, Any]]] = []
    arity = {
        "appear": (0, 0),
        "match": (1, 1),
        "copy": (1, 1),
        "rewrite": (1, 1),
        "derive": (1, 4),
        "substitute": (1, 4),
        "split": (1, 1),
        "merge": (2, 4),
    }

    for step_index, (raw_parts, step) in enumerate(zip(raw_parts_by_step, steps)):
        step_field = f"{field}[{step_index}]"
        if not isinstance(raw_parts, list) or not 1 <= len(raw_parts) <= 20:
            raise SceneValidationError(f"{step_field}.parts 必须有 1 到 20 个语义片段")

        part_ids: set[str] = set()
        parts: list[dict[str, Any]] = []
        for part_index, raw_part in enumerate(raw_parts):
            part_field = f"{step_field}.parts[{part_index}]"
            if not isinstance(raw_part, dict):
                raise SceneValidationError(f"{part_field} 必须是对象")

            part_id = _semantic_part_id(raw_part.get("id"), f"{part_field}.id")
            if part_id in part_ids:
                raise SceneValidationError(f"{part_field}.id 重复")
            part_ids.add(part_id)

            latex = _latex(raw_part.get("latex"), f"{part_field}.latex", maximum=180)
            if not _has_balanced_group_braces(latex):
                raise SceneValidationError(f"{part_field}.latex 必须是花括号完整的独立片段")
            if not _has_balanced_sizing_delimiters(latex):
                raise SceneValidationError(
                    f"{part_field}.latex 必须在同一片段内配对 \\left 与 \\right"
                )

            if "from" not in raw_part:
                source_ids: list[str] = []
            else:
                raw_sources = raw_part.get("from")
                if not isinstance(raw_sources, list) or len(raw_sources) > 4:
                    raise SceneValidationError(f"{part_field}.from 必须是最多 4 个 id 的数组")
                source_ids = [
                    _semantic_part_id(source, f"{part_field}.from[{source_index}]")
                    for source_index, source in enumerate(raw_sources)
                ]
                if len(source_ids) != len(set(source_ids)):
                    raise SceneValidationError(f"{part_field}.from 不能包含重复 id")

            if "relation" not in raw_part:
                relation = "match" if source_ids else "appear"
            else:
                raw_relation = raw_part.get("relation")
                if not isinstance(raw_relation, str):
                    raise SceneValidationError(f"{part_field}.relation 必须是字符串")
                relation = raw_relation.strip().lower()
            if relation not in _SEMANTIC_RELATIONS:
                raise SceneValidationError(f"{part_field}.relation 不受支持：{relation}")

            phase = raw_part.get("phase", 0)
            if isinstance(phase, bool) or not isinstance(phase, int) or not 0 <= phase <= 4:
                raise SceneValidationError(f"{part_field}.phase 必须是 0 到 4 的整数")

            minimum_sources, maximum_sources = arity[relation]
            if not minimum_sources <= len(source_ids) <= maximum_sources:
                raise SceneValidationError(
                    f"{part_field}.relation={relation} 与 from 数量不匹配"
                )

            if step_index == 0:
                if source_ids or relation != "appear" or phase != 0:
                    raise SceneValidationError(
                        f"{part_field} 位于首步，只能使用空 from、appear 和 phase 0"
                    )
            else:
                missing_sources = [source for source in source_ids if source not in previous_parts]
                if missing_sources:
                    raise SceneValidationError(
                        f"{part_field}.from 引用了非紧邻前一步的 id：{missing_sources[0]}"
                    )
                if relation in {"match", "copy"}:
                    source_latex = previous_parts[source_ids[0]]["latex"]
                    if _compact_latex(source_latex) != _compact_latex(latex):
                        raise SceneValidationError(
                            f"{part_field}.relation={relation} 要求源与目标 latex 相同"
                        )

            parts.append({
                "id": part_id,
                "latex": latex,
                "from": source_ids,
                "relation": relation,
                "phase": phase,
            })

        if _compact_latex("".join(part["latex"] for part in parts)) != _compact_latex(step["latex"]):
            raise SceneValidationError(f"{step_field}.parts 拼接后必须等于该步 latex")

        if step_index > 0:
            if not any(part["from"] for part in parts):
                raise SceneValidationError(f"{step_field}.parts 至少要映射一个前一步片段")
            source_uses: dict[str, list[str]] = {}
            for part in parts:
                for source in part["from"]:
                    source_uses.setdefault(source, []).append(part["relation"])
            for source, relations in source_uses.items():
                if len(relations) > 1 and any(
                    relation not in {"copy", "split"} for relation in relations
                ):
                    raise SceneValidationError(
                        f"{step_field}.parts 对源 {source} 的多目标映射只能使用 copy 或 split"
                    )

        normalized_parts_by_step.append(parts)
        previous_parts = {part["id"]: part for part in parts}

    for step, parts in zip(steps, normalized_parts_by_step):
        step["parts"] = parts


def _normalize_formula_steps(
    raw_steps: list[Any],
    field: str,
    *,
    drop_invalid_semantics: bool,
    validation_warnings: list[str],
) -> list[dict[str, Any]]:
    steps = [
        _normalize_formula_step(step, f"{field}[{index}]")
        for index, step in enumerate(raw_steps)
    ]
    try:
        _normalize_semantic_parts(raw_steps, steps, field)
    except SceneValidationError as exc:
        if not drop_invalid_semantics:
            raise
        validation_warnings.append(f"{exc}；已忽略语义 parts 并保留公式步骤")
    return steps


def _require_exact_keys(value: dict[str, Any], expected: set[str], field: str) -> None:
    actual = set(value)
    if actual == expected:
        return
    missing = sorted(expected - actual)
    extra = sorted(actual - expected)
    details = []
    if missing:
        details.append(f"缺少 {', '.join(missing)}")
    if extra:
        details.append(f"包含未知字段 {', '.join(extra)}")
    raise SceneValidationError(f"{field} 字段不合法：{'；'.join(details)}")


def _resolve_animation_source_ref(
    spec: dict[str, Any],
    source_ref: Any,
    field: str,
) -> tuple[
    tuple[int, int, int],
    dict[str, Any],
    dict[str, Any],
    dict[str, Any],
]:
    if not isinstance(source_ref, str):
        raise SceneValidationError(f"{field} 必须是字符串")
    match = _ANIMATION_SOURCE_REF_RE.fullmatch(source_ref)
    if match is None:
        raise SceneValidationError(
            f"{field} 必须是 0-based 的 /sections/i/blocks/j/steps/k"
        )

    location = tuple(int(group) for group in match.groups())
    section_index, block_index, source_step_index = location
    sections = spec.get("sections")
    if not isinstance(sections, list):
        raise SceneValidationError("animation_patch 无法引用未规范化的正文")
    try:
        section = sections[section_index]
        block = section["blocks"][block_index]
    except (IndexError, KeyError, TypeError):
        raise SceneValidationError(f"{field} 不存在") from None
    if block.get("kind") != "derivation":
        raise SceneValidationError(f"{field} 只能引用正文 derivation 步骤")
    try:
        source_step = block["steps"][source_step_index]
    except (IndexError, KeyError, TypeError):
        raise SceneValidationError(f"{field} 不存在") from None
    return location, section, block, source_step


def normalize_animation_patch(
    spec: dict[str, Any],
    patch: Any,
) -> dict[str, Any] | None:
    """Resolve a model-authored animation patch against normalized prose.

    Version 1.0 may annotate semantic fragments.  Version 1.1 is selection-only
    and therefore yields canonical steps without ``parts`` so the renderer uses
    its exact-token FLIP fallback.  Neither version can provide or replace a
    full formula, note, block or section.
    """
    if patch in (None, ""):
        return None
    if not isinstance(patch, dict):
        raise SceneValidationError("animation_patch 必须是 JSON 对象")
    _require_exact_keys(patch, {"patch_version", "animation"}, "animation_patch")
    patch_version = patch.get("patch_version")
    if patch_version not in {"1.0", "1.1"}:
        raise SceneValidationError("animation_patch.patch_version 必须是 1.0 或 1.1")

    animation = patch.get("animation")
    if animation is None:
        return None
    if not isinstance(animation, dict):
        raise SceneValidationError("animation_patch.animation 必须是对象或 null")

    animation_keys = (
        {"title", "steps"}
        if patch_version == "1.0"
        else {"title", "source_refs"}
    )
    _require_exact_keys(animation, animation_keys, "animation_patch.animation")

    title = _text(
        animation.get("title"),
        "animation_patch.animation.title",
        maximum=100,
    )
    if "$" in title or "\\" in title:
        raise SceneValidationError("animation_patch.animation.title 必须是普通文本")

    raw_formula_steps: list[dict[str, Any]] = []
    previous_location: tuple[int, int, int] | None = None
    anchor_section_id = ""

    if patch_version == "1.1":
        source_refs = animation.get("source_refs")
        if not isinstance(source_refs, list) or not 3 <= len(source_refs) <= 10:
            raise SceneValidationError("animation_patch.animation.source_refs 必须有 3 到 10 项")
        selected_step_indexes: dict[tuple[int, int], list[int]] = {}
        selected_blocks: dict[tuple[int, int], dict[str, Any]] = {}
        for source_index, source_ref in enumerate(source_refs):
            field = f"animation_patch.animation.source_refs[{source_index}]"
            location, section, block, source_step = _resolve_animation_source_ref(
                spec,
                source_ref,
                field,
            )
            if previous_location is not None and location <= previous_location:
                raise SceneValidationError(
                    f"{field} 必须按正文顺序严格递增且不重复"
                )
            previous_location = location
            if source_index == 0:
                anchor_section_id = section["id"]
            block_location = location[:2]
            selected_blocks.setdefault(block_location, block)
            selected_step_indexes.setdefault(block_location, []).append(location[2])
            raw_formula_steps.append({
                "latex": source_step["latex"],
                "note": source_step.get("note", ""),
            })

        for block_location, step_indexes in selected_step_indexes.items():
            expected_indexes = list(range(len(selected_blocks[block_location]["steps"])))
            if step_indexes != expected_indexes:
                raise SceneValidationError(
                    "animation_patch v1.1 必须完整覆盖每个所选 derivation 块的全部步骤"
                )

        derivation_order = [
            (section_index, block_index)
            for section_index, section in enumerate(spec["sections"])
            for block_index, block in enumerate(section["blocks"])
            if block["kind"] == "derivation"
        ]
        derivation_positions = {
            block_location: index
            for index, block_location in enumerate(derivation_order)
        }
        selected_positions = [
            derivation_positions[block_location]
            for block_location in selected_blocks
        ]
        if selected_positions != list(range(
            selected_positions[0],
            selected_positions[0] + len(selected_positions),
        )):
            raise SceneValidationError(
                "animation_patch v1.1 所选 derivation 块必须在正文推导顺序中连续"
            )
    else:
        raw_patch_steps = animation.get("steps")
        if not isinstance(raw_patch_steps, list) or not 3 <= len(raw_patch_steps) <= 10:
            raise SceneValidationError("animation_patch.animation.steps 必须有 3 到 10 步")
        for patch_step_index, raw_patch_step in enumerate(raw_patch_steps):
            field = f"animation_patch.animation.steps[{patch_step_index}]"
            if not isinstance(raw_patch_step, dict):
                raise SceneValidationError(f"{field} 必须是对象")
            _require_exact_keys(raw_patch_step, {"source_ref", "parts"}, field)

            location, section, _block, source_step = _resolve_animation_source_ref(
                spec,
                raw_patch_step.get("source_ref"),
                f"{field}.source_ref",
            )
            if previous_location is not None and location <= previous_location:
                raise SceneValidationError(
                    f"{field}.source_ref 必须按正文顺序严格递增且不重复"
                )
            previous_location = location
            if patch_step_index == 0:
                anchor_section_id = section["id"]

            raw_parts = raw_patch_step.get("parts")
            if not isinstance(raw_parts, list) or not 1 <= len(raw_parts) <= 20:
                raise SceneValidationError(f"{field}.parts 必须有 1 到 20 个语义片段")
            for part_index, raw_part in enumerate(raw_parts):
                part_field = f"{field}.parts[{part_index}]"
                if not isinstance(raw_part, dict):
                    raise SceneValidationError(f"{part_field} 必须是对象")
                _require_exact_keys(
                    raw_part,
                    {"id", "latex", "from", "relation", "phase"},
                    part_field,
                )

            raw_formula_steps.append({
                "latex": source_step["latex"],
                "note": source_step.get("note", ""),
                "parts": raw_parts,
            })

    normalized_steps = _normalize_formula_steps(
        raw_formula_steps,
        "animation_patch.animation.steps",
        drop_invalid_semantics=False,
        validation_warnings=[],
    )
    if len({_compact_latex(step["latex"]) for step in normalized_steps}) < 3:
        raise SceneValidationError("animation_patch 至少要引用 3 个不同的公式步骤")

    return {
        "title": title,
        "anchor_section_id": anchor_section_id,
        "steps": normalized_steps,
    }


def _normalize_block(
    value: Any,
    section_index: int,
    block_index: int,
    *,
    drop_invalid_semantics: bool,
    validation_warnings: list[str],
) -> dict[str, Any]:
    field = f"sections[{section_index}].blocks[{block_index}]"
    if not isinstance(value, dict):
        raise SceneValidationError(f"{field} 必须是对象")
    kind = str(value.get("kind") or "").strip()
    if kind not in ALLOWED_BLOCK_KINDS:
        raise SceneValidationError(f"{field}.kind 不受支持：{kind}")

    if kind == "paragraph":
        return _attach_semantic_ids(
            {"kind": kind, "text": _text(value.get("text"), f"{field}.text", maximum=700)},
            value,
            field,
            drop_invalid_semantics=drop_invalid_semantics,
            validation_warnings=validation_warnings,
        )

    if kind == "definition":
        return _attach_semantic_ids(
            {
                "kind": kind,
                "term": _text(value.get("term"), f"{field}.term", maximum=80),
                "text": _text(value.get("text"), f"{field}.text", maximum=520),
                "latex": _optional_latex(value.get("latex"), f"{field}.latex", maximum=360),
            },
            value,
            field,
            drop_invalid_semantics=drop_invalid_semantics,
            validation_warnings=validation_warnings,
        )

    if kind == "formula":
        return _attach_semantic_ids(
            {
                "kind": kind,
                "latex": _latex(value.get("latex"), f"{field}.latex", maximum=420),
                "caption": _optional_text(value.get("caption"), f"{field}.caption", maximum=160),
            },
            value,
            field,
            drop_invalid_semantics=drop_invalid_semantics,
            validation_warnings=validation_warnings,
        )

    if kind == "derivation":
        raw_steps = value.get("steps")
        if not isinstance(raw_steps, list) or not 2 <= len(raw_steps) <= 10:
            raise SceneValidationError(f"{field}.steps 必须有 2 到 10 个关键步骤")
        return _attach_semantic_ids(
            {
                "kind": kind,
                "title": _optional_text(value.get("title"), f"{field}.title", maximum=80),
                "steps": _normalize_formula_steps(
                    raw_steps,
                    f"{field}.steps",
                    drop_invalid_semantics=drop_invalid_semantics,
                    validation_warnings=validation_warnings,
                ),
            },
            value,
            field,
            drop_invalid_semantics=drop_invalid_semantics,
            validation_warnings=validation_warnings,
        )

    if kind == "example":
        raw_steps = value.get("steps") or []
        if not isinstance(raw_steps, list) or len(raw_steps) > 6:
            raise SceneValidationError(f"{field}.steps 最多 6 项")
        steps = []
        for index, step in enumerate(raw_steps):
            step_field = f"{field}.steps[{index}]"
            if isinstance(step, str):
                steps.append({"text": _text(step, step_field, maximum=320), "latex": ""})
            elif isinstance(step, dict):
                text = _optional_text(step.get("text"), f"{step_field}.text", maximum=320)
                latex = _optional_latex(step.get("latex"), f"{step_field}.latex", maximum=300)
                if not text and not latex:
                    raise SceneValidationError(f"{step_field} 必须至少包含 text 或 latex")
                steps.append({"text": text, "latex": latex})
            else:
                raise SceneValidationError(f"{step_field} 必须是字符串或对象")
        return _attach_semantic_ids(
            {
                "kind": kind,
                "prompt": _text(value.get("prompt"), f"{field}.prompt", maximum=420),
                "steps": steps,
                "result": _optional_text(value.get("result"), f"{field}.result", maximum=320),
            },
            value,
            field,
            drop_invalid_semantics=drop_invalid_semantics,
            validation_warnings=validation_warnings,
        )

    if kind == "list":
        return _attach_semantic_ids(
            {
                "kind": kind,
                "style": "ordered" if value.get("style") == "ordered" else "unordered",
                "items": _string_list(value.get("items"), f"{field}.items", maximum=8, item_limit=260),
            },
            value,
            field,
            drop_invalid_semantics=drop_invalid_semantics,
            validation_warnings=validation_warnings,
        )

    columns = _string_list(value.get("columns"), f"{field}.columns", minimum=2, maximum=4, item_limit=80)
    raw_rows = value.get("rows")
    if not isinstance(raw_rows, list) or not 1 <= len(raw_rows) <= 8:
        raise SceneValidationError(f"{field}.rows 必须有 1 到 8 行")
    rows: list[list[str]] = []
    for row_index, row in enumerate(raw_rows):
        if not isinstance(row, list) or len(row) != len(columns):
            raise SceneValidationError(f"{field}.rows[{row_index}] 列数不一致")
        rows.append([
            _text(cell, f"{field}.rows[{row_index}][{cell_index}]", maximum=180)
            for cell_index, cell in enumerate(row)
        ])
    return _attach_semantic_ids(
        {"kind": kind, "columns": columns, "rows": rows},
        value,
        field,
        drop_invalid_semantics=drop_invalid_semantics,
        validation_warnings=validation_warnings,
    )


def _normalize_range(value: Any, field: str, fallback: tuple[float, float]) -> list[float]:
    if value in (None, ""):
        return [fallback[0], fallback[1]]
    if not isinstance(value, list) or len(value) != 2:
        raise SceneValidationError(f"{field} 必须是两个数字")
    low = _number(value[0], f"{field}[0]", minimum=-1000, maximum=1000)
    high = _number(value[1], f"{field}[1]", minimum=-1000, maximum=1000)
    if high <= low:
        raise SceneValidationError(f"{field} 上界必须大于下界")
    return [low, high]


def _safe_expression(
    value: Any,
    field: str,
    *,
    allowed_variables: set[str] | None = None,
) -> str:
    expression = _text(value, field, maximum=120)
    if not _SAFE_EXPRESSION_RE.fullmatch(expression):
        raise SceneValidationError(f"{field} 含有不受支持的表达式字符")
    if "**" in expression:
        raise SceneValidationError(f"{field} 幂运算请使用 ^")
    names = re.findall(r"[A-Za-z_][A-Za-z0-9_]*", expression)
    if any(name not in _SAFE_EXPRESSION_NAMES for name in names):
        raise SceneValidationError(f"{field} 使用了未声明的名称")

    # Character and name allowlists are not enough: malformed input such as
    # ``2x``, ``sin()`` or ``x+`` would otherwise survive the server boundary
    # and only fail as an empty drawing in the browser.  Parse a Python-shaped
    # copy solely for syntax validation; the original expression is returned
    # and is still evaluated by the browser's non-eval recursive parser.
    try:
        parsed = ast.parse(expression.replace("^", "**"), mode="eval")
    except (SyntaxError, ValueError) as exc:
        raise SceneValidationError(f"{field} 表达式语法无效") from exc

    allowed_binary = (ast.Add, ast.Sub, ast.Mult, ast.Div, ast.Pow)
    allowed_unary = (ast.UAdd, ast.USub)
    allowed_functions = {"sin", "cos", "tan", "sqrt", "abs", "exp", "log"}

    def validate(node: ast.AST) -> None:
        if isinstance(node, ast.Expression):
            validate(node.body)
            return
        if isinstance(node, ast.Constant):
            if isinstance(node.value, bool) or not isinstance(node.value, (int, float)):
                raise SceneValidationError(f"{field} 只能使用数字常量")
            return
        if isinstance(node, ast.Name):
            if node.id not in _SAFE_EXPRESSION_NAMES:
                raise SceneValidationError(f"{field} 使用了未声明的名称")
            if (
                allowed_variables is not None
                and node.id not in allowed_variables
                and node.id not in {"pi", "e"}
            ):
                raise SceneValidationError(f"{field} 使用了当前原语未声明的变量")
            return
        if isinstance(node, ast.BinOp) and isinstance(node.op, allowed_binary):
            validate(node.left)
            validate(node.right)
            return
        if isinstance(node, ast.UnaryOp) and isinstance(node.op, allowed_unary):
            validate(node.operand)
            return
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Name):
            if node.func.id not in allowed_functions or len(node.args) != 1 or node.keywords:
                raise SceneValidationError(f"{field} 函数调用无效")
            validate(node.args[0])
            return
        raise SceneValidationError(f"{field} 含有不受支持的表达式结构")

    validate(parsed)
    return expression


def _evaluate_safe_expression(expression: str, variables: dict[str, float]) -> float:
    """Evaluate an already validated expression without ``eval``."""
    parsed = ast.parse(expression.replace("^", "**"), mode="eval")
    functions = {
        "sin": math.sin,
        "cos": math.cos,
        "tan": math.tan,
        "sqrt": math.sqrt,
        "abs": abs,
        "exp": math.exp,
        "log": math.log,
    }

    def visit(node: ast.AST) -> float:
        if isinstance(node, ast.Expression):
            return visit(node.body)
        if isinstance(node, ast.Constant):
            return float(node.value)
        if isinstance(node, ast.Name):
            if node.id == "pi":
                return math.pi
            if node.id == "e":
                return math.e
            if node.id not in variables:
                raise ValueError(f"missing variable {node.id}")
            return float(variables[node.id])
        if isinstance(node, ast.UnaryOp):
            value = visit(node.operand)
            if isinstance(node.op, ast.USub):
                return -value
            if isinstance(node.op, ast.UAdd):
                return value
        if isinstance(node, ast.BinOp):
            left = visit(node.left)
            right = visit(node.right)
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
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Name):
            return float(functions[node.func.id](visit(node.args[0])))
        raise ValueError("unsupported expression node")

    result = float(visit(parsed))
    if not math.isfinite(result):
        raise ValueError("non-finite expression result")
    return result


def _preflight_curve(
    expression: str,
    *,
    domain: list[float],
    plot_range: list[float],
    parameter_values: tuple[tuple[str, float], ...] = (),
    require_all_finite: bool = False,
    field: str,
) -> list[float]:
    """Reject expressions that would become an empty or singular renderer."""
    samples = 129
    finite_values: list[float] = []
    sampled_values: list[float | None] = []
    visible = 0
    failures = 0
    for index in range(samples):
        x = domain[0] + (domain[1] - domain[0]) * index / (samples - 1)
        variables = {"x": x, **dict(parameter_values)}
        try:
            value = _evaluate_safe_expression(expression, variables)
        except (ArithmeticError, OverflowError, TypeError, ValueError):
            failures += 1
            sampled_values.append(None)
            continue
        finite_values.append(value)
        sampled_values.append(value)
        if plot_range[0] <= value <= plot_range[1]:
            visible += 1

    if require_all_finite and failures:
        raise SceneValidationError(f"{field} 在积分区间内存在未定义或非有限采样")
    minimum_finite = samples if require_all_finite else math.ceil(samples * 0.6)
    if len(finite_values) < minimum_finite:
        raise SceneValidationError(f"{field} 在给定定义域内没有足够有限采样点")
    if visible < 3:
        raise SceneValidationError(f"{field} 在给定视窗内不可见")
    if require_all_finite:
        if visible < math.ceil(samples * 0.8):
            raise SceneValidationError(f"{field} 大部分曲线落在积分视窗之外")
        plot_span = max(1e-9, plot_range[1] - plot_range[0])
        for left, right in zip(sampled_values, sampled_values[1:]):
            if left is None or right is None:
                continue
            jump = abs(right - left)
            crosses_sign = left * right < 0
            outside_scale = max(abs(left), abs(right)) > 4 * plot_span
            if jump > 3 * plot_span and (crosses_sign or outside_scale):
                raise SceneValidationError(
                    f"{field} 在积分区间内疑似存在不连续或奇点"
                )
    return finite_values


def _preflight_parameter_variation(
    expression: str,
    *,
    parameter_name: str,
    parameter_values: tuple[float, ...],
    field: str,
    domain: list[float] | None = None,
) -> bool:
    """Prove that a declared driver stays finite and changes the observable."""
    x_samples = (
        tuple(
            domain[0] + (domain[1] - domain[0]) * index / 16
            for index in range(17)
        )
        if domain is not None
        else (0.0,)
    )
    changed = False
    for x in x_samples:
        values: list[float] = []
        for parameter_value in parameter_values:
            variables = {parameter_name: parameter_value}
            if domain is not None:
                variables["x"] = x
            try:
                values.append(_evaluate_safe_expression(expression, variables))
            except (ArithmeticError, OverflowError, TypeError, ValueError) as exc:
                raise SceneValidationError(
                    f"{field} 在共享参数端点产生未定义或非有限值"
                ) from exc
        scale = max(1.0, *(abs(value) for value in values))
        if max(values) - min(values) > 1e-8 * scale:
            changed = True
    return changed


def _integer(
    value: Any,
    field: str,
    *,
    minimum: int,
    maximum: int,
) -> int:
    number = _number(value, field, minimum=minimum, maximum=maximum)
    if not number.is_integer():
        raise SceneValidationError(f"{field} 必须是整数")
    return int(number)


def _optional_duration(
    value: Any,
    field: str,
    *,
    fallback: int,
    minimum: int = 3000,
    maximum: int = 20000,
) -> int:
    if value in (None, ""):
        return fallback
    return _integer(value, field, minimum=minimum, maximum=maximum)


def _semantic_reference(value: Any, field: str, declared: set[str]) -> str:
    semantic_id = _semantic_part_id(value, field)
    if semantic_id not in declared:
        raise SceneValidationError(f"{field} 必须引用 demonstration.semantic_ids")
    return semantic_id


def _normalize_semantic_role_map(
    value: Any,
    field: str,
    declared: set[str],
    roles: tuple[str, ...],
) -> dict[str, str] | None:
    if value in (None, ""):
        if declared:
            raise SceneValidationError(
                f"{field} 在 demonstration.semantic_ids 非空时必须提供完整映射"
            )
        return None
    if not isinstance(value, dict):
        raise SceneValidationError(f"{field} 必须是对象")
    return {
        role: _semantic_reference(value.get(role), f"{field}.{role}", declared)
        for role in roles
    }


def _normalize_demo_data(
    kind: str,
    data: Any,
    field: str,
    *,
    semantic_ids: set[str],
    drop_invalid_semantics: bool,
    validation_warnings: list[str],
) -> dict[str, Any]:
    if not isinstance(data, dict):
        raise SceneValidationError(f"{field}.data 必须是对象")

    if kind == "linked_lab":
        parameter = data.get("parameter")
        if not isinstance(parameter, dict):
            raise SceneValidationError(f"{field}.data.parameter 必须是对象")
        parameter_id = _semantic_part_id(
            parameter.get("id"),
            f"{field}.data.parameter.id",
        )
        if parameter_id not in _SAFE_PARAMETER_NAMES:
            raise SceneValidationError(f"{field}.data.parameter.id 不受支持")
        minimum = _number(
            parameter.get("min"),
            f"{field}.data.parameter.min",
            minimum=-1000,
            maximum=1000,
        )
        maximum = _number(
            parameter.get("max"),
            f"{field}.data.parameter.max",
            minimum=-1000,
            maximum=1000,
        )
        if maximum <= minimum:
            raise SceneValidationError(f"{field}.data.parameter 范围无效")
        initial = _number(
            parameter.get("initial"),
            f"{field}.data.parameter.initial",
            minimum=minimum,
            maximum=maximum,
        )
        normalized_parameter: dict[str, Any] = {
            "id": parameter_id,
            "label": _text(
                parameter.get("label"),
                f"{field}.data.parameter.label",
                maximum=80,
            ),
            "min": minimum,
            "max": maximum,
            "initial": initial,
        }
        if parameter.get("step") not in (None, ""):
            normalized_parameter["step"] = _number(
                parameter.get("step"),
                f"{field}.data.parameter.step",
                minimum=1e-9,
                maximum=maximum - minimum,
            )
        if parameter.get("unit") not in (None, ""):
            normalized_parameter["unit"] = _text(
                parameter.get("unit"),
                f"{field}.data.parameter.unit",
                maximum=24,
            )

        object_ids: set[str] = set()

        def normalize_objects(
            raw_items: Any,
            key: str,
            *,
            minimum_count: int,
            maximum_count: int,
            vector: bool = False,
            unit: bool = False,
        ) -> list[dict[str, Any]]:
            item_field = f"{field}.data.{key}"
            if raw_items is None and minimum_count == 0:
                return []
            if not isinstance(raw_items, list) or not minimum_count <= len(raw_items) <= maximum_count:
                raise SceneValidationError(
                    f"{item_field} 数量必须在 {minimum_count} 到 {maximum_count} 之间"
                )
            result: list[dict[str, Any]] = []
            for index, raw_item in enumerate(raw_items):
                child_field = f"{item_field}[{index}]"
                if not isinstance(raw_item, dict):
                    raise SceneValidationError(f"{child_field} 必须是对象")
                object_id = _semantic_part_id(raw_item.get("id"), f"{child_field}.id")
                if object_id in object_ids:
                    raise SceneValidationError(f"{child_field}.id 重复")
                object_ids.add(object_id)
                normalized_item: dict[str, Any] = {
                    "id": object_id,
                    "semantic_id": _semantic_reference(
                        raw_item.get("semantic_id"),
                        f"{child_field}.semantic_id",
                        semantic_ids,
                    ),
                    "label": _text(raw_item.get("label"), f"{child_field}.label", maximum=80),
                }
                if vector:
                    normalized_item["x_expression"] = _safe_expression(
                        raw_item.get("x_expression"),
                        f"{child_field}.x_expression",
                        allowed_variables={parameter_id},
                    )
                    normalized_item["y_expression"] = _safe_expression(
                        raw_item.get("y_expression"),
                        f"{child_field}.y_expression",
                        allowed_variables={parameter_id},
                    )
                else:
                    normalized_item["expression"] = _safe_expression(
                        raw_item.get("expression"),
                        f"{child_field}.expression",
                        allowed_variables={parameter_id, "x"} if key == "curves" else {parameter_id},
                    )
                if unit and raw_item.get("unit") not in (None, ""):
                    normalized_item["unit"] = _text(
                        raw_item.get("unit"),
                        f"{child_field}.unit",
                        maximum=24,
                    )
                result.append(normalized_item)
            return result

        if "range" not in data:
            raise SceneValidationError(
                f"{field}.data.range 必须由知识场景明确提供"
            )
        result = {
            "parameter": normalized_parameter,
            "domain": _normalize_range(data.get("domain"), f"{field}.data.domain", (-5, 5)),
            "range": _normalize_range(data.get("range"), f"{field}.data.range", (-5, 5)),
            "readouts": normalize_objects(
                data.get("readouts"),
                "readouts",
                minimum_count=1,
                maximum_count=4,
                unit=True,
            ),
            "curves": normalize_objects(
                data.get("curves"),
                "curves",
                minimum_count=0,
                maximum_count=3,
            ),
            "vectors": normalize_objects(
                data.get("vectors"),
                "vectors",
                minimum_count=0,
                maximum_count=3,
                vector=True,
            ),
        }
        if not result["curves"] and not result["vectors"]:
            raise SceneValidationError(
                f"{field}.data linked_lab 至少需要一条曲线或一个向量，不能退化为滑杆加数字"
            )
        if result["curves"] and "domain" not in data:
            raise SceneValidationError(
                f"{field}.data.domain 在存在曲线时必须明确提供"
            )

        def references_parameter(item: dict[str, Any]) -> bool:
            expressions = (
                item.get("expression", ""),
                item.get("x_expression", ""),
                item.get("y_expression", ""),
            )
            return any(
                parameter_id in re.findall(r"[A-Za-z_][A-Za-z0-9_]*", expression)
                for expression in expressions
            )

        if not any(references_parameter(item) for item in result["readouts"]):
            raise SceneValidationError(
                f"{field}.data.readouts 必须至少有一个读数随共享参数变化"
            )
        if not any(
            references_parameter(item)
            for item in (*result["curves"], *result["vectors"])
        ):
            raise SceneValidationError(
                f"{field}.data 的曲线或向量必须随共享参数变化"
            )

        parameter_samples = tuple(dict.fromkeys((minimum, initial, maximum)))
        readout_varies = False
        for index, item in enumerate(result["readouts"]):
            readout_varies = _preflight_parameter_variation(
                item["expression"],
                parameter_name=parameter_id,
                parameter_values=parameter_samples,
                field=f"{field}.data.readouts[{index}].expression",
            ) or readout_varies
        if not readout_varies:
            raise SceneValidationError(
                f"{field}.data.readouts 的数值在共享参数范围内没有实际变化"
            )

        visual_varies = False
        for index, item in enumerate(result["curves"]):
            for parameter_value in parameter_samples:
                _preflight_curve(
                    item["expression"],
                    domain=result["domain"],
                    plot_range=result["range"],
                    parameter_values=((parameter_id, parameter_value),),
                    field=f"{field}.data.curves[{index}].expression",
                )
            visual_varies = _preflight_parameter_variation(
                item["expression"],
                parameter_name=parameter_id,
                parameter_values=parameter_samples,
                field=f"{field}.data.curves[{index}].expression",
                domain=result["domain"],
            ) or visual_varies
        for index, item in enumerate(result["vectors"]):
            vector_varies = False
            for component in ("x_expression", "y_expression"):
                vector_varies = _preflight_parameter_variation(
                    item[component],
                    parameter_name=parameter_id,
                    parameter_values=parameter_samples,
                    field=f"{field}.data.vectors[{index}].{component}",
                ) or vector_varies
            visual_varies = vector_varies or visual_varies
        if not visual_varies:
            raise SceneValidationError(
                f"{field}.data 的曲线或向量在共享参数范围内没有实际变化"
            )
        formula_latex = _optional_latex(
            data.get("formula_latex"),
            f"{field}.data.formula_latex",
            maximum=420,
        )
        if formula_latex:
            result["formula_latex"] = formula_latex
        return result

    if kind == "limit_microscope":
        if data.get("mode") != "derivative":
            raise SceneValidationError(f"{field}.data.mode 只支持 derivative")
        if "domain" not in data or "range" not in data:
            raise SceneValidationError(
                f"{field}.data.domain 和 range 必须由知识场景明确提供"
            )
        domain = _normalize_range(data.get("domain"), f"{field}.data.domain", (-5, 5))
        plot_range = _normalize_range(data.get("range"), f"{field}.data.range", (-5, 5))
        x0 = _number(
            data.get("x0"),
            f"{field}.data.x0",
            minimum=domain[0],
            maximum=domain[1],
        )
        h_min = _number(data.get("h_min"), f"{field}.data.h_min", minimum=1e-6, maximum=1000)
        h_max = _number(data.get("h_max"), f"{field}.data.h_max", minimum=h_min, maximum=1000)
        h_initial = _number(
            data.get("h_initial"),
            f"{field}.data.h_initial",
            minimum=h_min,
            maximum=h_max,
        )
        if h_max <= h_min:
            raise SceneValidationError(f"{field}.data.h_max 必须大于 h_min")
        if x0 + h_max > domain[1] + 1e-12:
            raise SceneValidationError(f"{field}.data 必须满足 x0+h_max 不超过 domain 上界")
        expression = _safe_expression(
            data.get("expression"),
            f"{field}.data.expression",
            allowed_variables={"x"},
        )
        _preflight_curve(
            expression,
            domain=domain,
            plot_range=plot_range,
            field=f"{field}.data.expression",
        )
        result = {
            "mode": "derivative",
            "expression": expression,
            "domain": domain,
            "range": plot_range,
            "x0": x0,
            "h_initial": h_initial,
            "h_min": h_min,
            "h_max": h_max,
            "duration_ms": _optional_duration(
                data.get("duration_ms"),
                f"{field}.data.duration_ms",
                fallback=8000,
            ),
        }
        semantic_map = _normalize_semantic_role_map(
            data.get("semantic_map"),
            f"{field}.data.semantic_map",
            semantic_ids,
            ("secant", "tangent", "process"),
        )
        if semantic_map:
            result["semantic_map"] = semantic_map
        return result

    if kind == "constraint_geometry":
        if data.get("mode") != "inscribed_angle":
            raise SceneValidationError(f"{field}.data.mode 只支持 inscribed_angle")
        raw_center = data.get("center")
        if not isinstance(raw_center, list) or len(raw_center) != 2:
            raise SceneValidationError(f"{field}.data.center 必须是两个数字")
        center = [
            _number(raw_center[index], f"{field}.data.center[{index}]", minimum=-100, maximum=100)
            for index in range(2)
        ]
        raw_fixed_angles = data.get("fixed_angles_deg")
        if not isinstance(raw_fixed_angles, list) or len(raw_fixed_angles) != 2:
            raise SceneValidationError(f"{field}.data.fixed_angles_deg 必须是两个角度")
        fixed_angles = [
            _number(
                raw_fixed_angles[index],
                f"{field}.data.fixed_angles_deg[{index}]",
                minimum=-360,
                maximum=360,
            )
            for index in range(2)
        ]
        fixed_separation = abs((fixed_angles[1] - fixed_angles[0] + 180) % 360 - 180)
        if fixed_separation < 5:
            raise SceneValidationError(f"{field}.data.fixed_angles_deg 两点不能重合")
        moving_angle = _number(
            data.get("moving_angle_deg"),
            f"{field}.data.moving_angle_deg",
            minimum=-360,
            maximum=360,
        )
        if any(abs((moving_angle - angle + 180) % 360 - 180) < 2 for angle in fixed_angles):
            raise SceneValidationError(f"{field}.data.moving_angle_deg 不能与固定端点重合")
        result = {
            "mode": "inscribed_angle",
            "center": center,
            "radius": _number(data.get("radius"), f"{field}.data.radius", minimum=0.1, maximum=100),
            "fixed_angles_deg": fixed_angles,
            "moving_angle_deg": moving_angle,
            "duration_ms": _optional_duration(
                data.get("duration_ms"),
                f"{field}.data.duration_ms",
                fallback=9000,
            ),
        }
        semantic_map = _normalize_semantic_role_map(
            data.get("semantic_map"),
            f"{field}.data.semantic_map",
            semantic_ids,
            ("chord", "angle", "invariant"),
        )
        if semantic_map:
            result["semantic_map"] = semantic_map
        return result

    if kind == "field_experiment":
        if data.get("mode") != "faraday_loop":
            raise SceneValidationError(f"{field}.data.mode 只支持 faraday_loop")
        result = {
            "mode": "faraday_loop",
            "turns": _integer(data.get("turns"), f"{field}.data.turns", minimum=1, maximum=10000),
            "area": _number(data.get("area"), f"{field}.data.area", minimum=1e-8, maximum=1000),
            "orientation_deg": _number(
                data.get("orientation_deg"),
                f"{field}.data.orientation_deg",
                minimum=-360,
                maximum=360,
            ),
            "field_start": _number(
                data.get("field_start"),
                f"{field}.data.field_start",
                minimum=-100,
                maximum=100,
            ),
            "field_end": _number(
                data.get("field_end"),
                f"{field}.data.field_end",
                minimum=-100,
                maximum=100,
            ),
            "change_duration_s": _number(
                data.get("change_duration_s", 1),
                f"{field}.data.change_duration_s",
                minimum=0.001,
                maximum=1000,
            ),
            "duration_ms": _optional_duration(
                data.get("duration_ms"),
                f"{field}.data.duration_ms",
                fallback=9000,
                minimum=1000,
                maximum=30000,
            ),
        }
        semantic_map = _normalize_semantic_role_map(
            data.get("semantic_map"),
            f"{field}.data.semantic_map",
            semantic_ids,
            ("field", "flux", "emf", "direction"),
        )
        if semantic_map:
            result["semantic_map"] = semantic_map
        return result

    if kind == "equation_morph":
        raw_steps = data.get("steps")
        if not isinstance(raw_steps, list) or not 2 <= len(raw_steps) <= 10:
            raise SceneValidationError(f"{field}.data.steps 必须有 2 到 10 步")
        return {"steps": _normalize_formula_steps(
            raw_steps,
            f"{field}.data.steps",
            drop_invalid_semantics=drop_invalid_semantics,
            validation_warnings=validation_warnings,
        )}

    if kind == "constrained_extremum_2d":
        constraint = data.get("constraint")
        if not isinstance(constraint, dict) or constraint.get("kind") != "circle":
            raise SceneValidationError(f"{field}.data.constraint 只支持 circle")
        raw_center = constraint.get("center")
        if not isinstance(raw_center, list) or len(raw_center) != 2:
            raise SceneValidationError(f"{field}.data.constraint.center 必须是两个数字")
        center = [
            _number(raw_center[index], f"{field}.data.constraint.center[{index}]", minimum=-20, maximum=20)
            for index in range(2)
        ]
        radius = _number(
            constraint.get("radius"),
            f"{field}.data.constraint.radius",
            minimum=0.2,
            maximum=20,
        )

        objective = data.get("objective")
        if not isinstance(objective, dict) or objective.get("kind") != "linear":
            raise SceneValidationError(f"{field}.data.objective 只支持 linear")
        raw_coefficients = objective.get("coefficients")
        if not isinstance(raw_coefficients, list) or len(raw_coefficients) != 2:
            raise SceneValidationError(f"{field}.data.objective.coefficients 必须是两个数字")
        coefficients = [
            _number(
                raw_coefficients[index],
                f"{field}.data.objective.coefficients[{index}]",
                minimum=-20,
                maximum=20,
            )
            for index in range(2)
        ]
        if math.hypot(*coefficients) < 0.1:
            raise SceneValidationError(f"{field}.data.objective.coefficients 不能同时接近 0")

        extremum = str(data.get("extremum") or "maximum").strip().lower()
        if extremum not in {"maximum", "minimum"}:
            raise SceneValidationError(f"{field}.data.extremum 必须是 maximum 或 minimum")

        start_angle_deg = _number(
            data.get("start_angle_deg", 20),
            f"{field}.data.start_angle_deg",
            minimum=-360,
            maximum=360,
        )
        target_angle_deg = math.degrees(math.atan2(coefficients[1], coefficients[0]))
        if extremum == "minimum":
            target_angle_deg += 180
        angular_distance = abs((target_angle_deg - start_angle_deg + 180) % 360 - 180)
        if angular_distance < 15:
            raise SceneValidationError(f"{field}.data.start_angle_deg 距离目标角必须至少 15 度")

        raw_duration = _number(
            data.get("duration_ms", 7600),
            f"{field}.data.duration_ms",
            minimum=4000,
            maximum=12000,
        )
        if not raw_duration.is_integer():
            raise SceneValidationError(f"{field}.data.duration_ms 必须是整数")

        return {
            "constraint": {
                "kind": "circle",
                "center": center,
                "radius": radius,
            },
            "objective": {
                "kind": "linear",
                "coefficients": coefficients,
                "constant": _number(
                    objective.get("constant", 0),
                    f"{field}.data.objective.constant",
                    minimum=-100,
                    maximum=100,
                ),
            },
            "extremum": extremum,
            "start_angle_deg": start_angle_deg,
            "duration_ms": int(raw_duration),
        }

    if kind == "function_plot":
        if "domain" not in data or "range" not in data:
            raise SceneValidationError(
                f"{field}.data.domain 和 range 必须由知识场景明确提供"
            )
        domain = _normalize_range(data.get("domain"), f"{field}.data.domain", (-5, 5))
        plot_range = _normalize_range(data.get("range"), f"{field}.data.range", (-5, 5))
        normalized_parameter: dict[str, Any] | None = None
        parameter = data.get("parameter")
        if parameter:
            if not isinstance(parameter, dict):
                raise SceneValidationError(f"{field}.data.parameter 必须是对象")
            name = _identifier(parameter.get("name"), "a")
            if name not in _SAFE_PARAMETER_NAMES:
                raise SceneValidationError(f"{field}.data.parameter.name 不受支持")
            minimum = _number(parameter.get("min"), f"{field}.data.parameter.min", minimum=-50, maximum=50)
            maximum = _number(parameter.get("max"), f"{field}.data.parameter.max", minimum=-50, maximum=50)
            initial = _number(parameter.get("initial"), f"{field}.data.parameter.initial", minimum=minimum, maximum=maximum)
            if maximum <= minimum:
                raise SceneValidationError(f"{field}.data.parameter 范围无效")
            normalized_parameter = {
                "name": name,
                "min": minimum,
                "max": maximum,
                "initial": initial,
            }

        raw_series = data.get("series")
        if not isinstance(raw_series, list) or not raw_series:
            raise SceneValidationError(f"{field}.data.series 必须有 1 到 3 条曲线")
        # The renderer intentionally exposes three visual channels.  Extra
        # model-authored curves are safe to discard; empty or malformed
        # series still fail closed below.
        raw_series = raw_series[:3]
        series = []
        allowed_variables = {"x"}
        if normalized_parameter is not None:
            allowed_variables.add(normalized_parameter["name"])
        parameter_used = False
        parameter_varies = False
        for index, item in enumerate(raw_series):
            item_field = f"{field}.data.series[{index}]"
            if not isinstance(item, dict):
                raise SceneValidationError(f"{item_field} 必须是对象")
            expression = _safe_expression(
                item.get("expression"),
                f"{item_field}.expression",
                allowed_variables=allowed_variables,
            )
            if normalized_parameter is not None:
                names = set(re.findall(r"[A-Za-z_][A-Za-z0-9_]*", expression))
                parameter_used = parameter_used or normalized_parameter["name"] in names
            if normalized_parameter is None:
                _preflight_curve(
                    expression,
                    domain=domain,
                    plot_range=plot_range,
                    field=f"{item_field}.expression",
                )
            else:
                parameter_samples = tuple(dict.fromkeys((
                    normalized_parameter["min"],
                    normalized_parameter["initial"],
                    normalized_parameter["max"],
                )))
                for parameter_value in parameter_samples:
                    _preflight_curve(
                        expression,
                        domain=domain,
                        plot_range=plot_range,
                        parameter_values=((normalized_parameter["name"], parameter_value),),
                        field=f"{item_field}.expression",
                    )
                parameter_varies = _preflight_parameter_variation(
                    expression,
                    parameter_name=normalized_parameter["name"],
                    parameter_values=parameter_samples,
                    field=f"{item_field}.expression",
                    domain=domain,
                ) or parameter_varies
            series.append({
                "expression": expression,
                "label": _text(item.get("label"), f"{item_field}.label", maximum=60),
            })
        if normalized_parameter is not None and not parameter_used:
            raise SceneValidationError(
                f"{field}.data.parameter 未被任何曲线使用"
            )
        if normalized_parameter is not None and not parameter_varies:
            raise SceneValidationError(
                f"{field}.data.parameter 在参数范围内没有实际改变任何曲线"
            )
        result: dict[str, Any] = {
            "domain": domain,
            "range": plot_range,
            "series": series,
            "x_label": _optional_text(data.get("x_label"), f"{field}.data.x_label", maximum=30) or "x",
            "y_label": _optional_text(data.get("y_label"), f"{field}.data.y_label", maximum=30) or "y",
        }
        if normalized_parameter is not None:
            result["parameter"] = normalized_parameter
        return result

    if kind == "riemann_sum":
        if data.get("mode") != "area_under_curve":
            raise SceneValidationError(f"{field}.data.mode 只支持 area_under_curve")
        if "domain" not in data or "range" not in data:
            raise SceneValidationError(
                f"{field}.data.domain 和 range 必须由知识场景明确提供"
            )
        domain = _normalize_range(data.get("domain"), f"{field}.data.domain", (0, 1))
        plot_range = _normalize_range(data.get("range"), f"{field}.data.range", (0, 1))
        # Rectangles use the x-axis as their signed-area baseline.  Expanding a
        # model-proposed view to include zero is deterministic and prevents a
        # perfectly valid positive/negative function from losing its area
        # encoding merely because the suggested viewport omitted the axis.
        plot_range = [min(plot_range[0], 0.0), max(plot_range[1], 0.0)]
        if plot_range[1] - plot_range[0] < 1e-9:
            raise SceneValidationError(f"{field}.data.range 范围无效")

        n_min = _integer(
            data.get("n_min", 2),
            f"{field}.data.n_min",
            minimum=2,
            maximum=128,
        )
        n_max = _integer(
            data.get("n_max", 64),
            f"{field}.data.n_max",
            minimum=n_min,
            maximum=128,
        )
        if n_max <= n_min:
            raise SceneValidationError(f"{field}.data.n_max 必须大于 n_min")
        n_initial = _integer(
            data.get("n_initial", max(n_min, min(8, n_max - 1))),
            f"{field}.data.n_initial",
            minimum=n_min,
            maximum=n_max,
        )
        if n_initial >= n_max:
            raise SceneValidationError(f"{field}.data.n_initial 必须小于 n_max 以保留细分演示")
        sample = str(data.get("sample") or "midpoint").strip().lower()
        if sample not in {"left", "midpoint", "right"}:
            raise SceneValidationError(
                f"{field}.data.sample 必须是 left、midpoint 或 right"
            )
        expression = _safe_expression(
            data.get("expression"),
            f"{field}.data.expression",
            allowed_variables={"x"},
        )
        _preflight_curve(
            expression,
            domain=domain,
            plot_range=plot_range,
            require_all_finite=True,
            field=f"{field}.data.expression",
        )
        result = {
            "mode": "area_under_curve",
            "expression": expression,
            "domain": domain,
            "range": plot_range,
            "n_initial": n_initial,
            "n_min": n_min,
            "n_max": n_max,
            "sample": sample,
            "duration_ms": _optional_duration(
                data.get("duration_ms"),
                f"{field}.data.duration_ms",
                fallback=10000,
                minimum=1000,
                maximum=30000,
            ),
        }
        semantic_map = _normalize_semantic_role_map(
            data.get("semantic_map"),
            f"{field}.data.semantic_map",
            semantic_ids,
            ("curve", "rectangles", "area", "limit"),
        )
        if semantic_map:
            result["semantic_map"] = semantic_map
        return result

    if kind == "concept_map":
        raw_nodes = data.get("nodes")
        if not isinstance(raw_nodes, list) or not 2 <= len(raw_nodes) <= 9:
            raise SceneValidationError(f"{field}.data.nodes 必须有 2 到 9 个节点")
        nodes = []
        node_ids: set[str] = set()
        for index, node in enumerate(raw_nodes):
            node_field = f"{field}.data.nodes[{index}]"
            if not isinstance(node, dict):
                raise SceneValidationError(f"{node_field} 必须是对象")
            node_id = _identifier(node.get("id"), f"n{index + 1}")
            if node_id in node_ids:
                raise SceneValidationError(f"{node_field}.id 重复")
            node_ids.add(node_id)
            nodes.append({"id": node_id, "label": _text(node.get("label"), f"{node_field}.label", maximum=70)})
        raw_edges = data.get("edges")
        if not isinstance(raw_edges, list) or not 1 <= len(raw_edges) <= 14:
            raise SceneValidationError(f"{field}.data.edges 必须有 1 到 14 条")
        edges = []
        edge_pairs: set[tuple[str, str]] = set()
        neighbours: dict[str, set[str]] = {node_id: set() for node_id in node_ids}
        for index, edge in enumerate(raw_edges):
            edge_field = f"{field}.data.edges[{index}]"
            if not isinstance(edge, dict):
                raise SceneValidationError(f"{edge_field} 必须是对象")
            source = _identifier(edge.get("from"), "")
            target = _identifier(edge.get("to"), "")
            if source not in node_ids or target not in node_ids:
                raise SceneValidationError(f"{edge_field} 引用了不存在的节点")
            if source == target:
                raise SceneValidationError(f"{edge_field} 不能把节点连向自身")
            pair = (source, target)
            if pair in edge_pairs:
                raise SceneValidationError(f"{edge_field} 与已有关系重复")
            edge_pairs.add(pair)
            neighbours[source].add(target)
            neighbours[target].add(source)
            edges.append({
                "from": source,
                "to": target,
                "label": _optional_text(edge.get("label"), f"{edge_field}.label", maximum=50),
            })
        pending = [next(iter(node_ids))]
        reached: set[str] = set()
        while pending:
            current = pending.pop()
            if current in reached:
                continue
            reached.add(current)
            pending.extend(neighbours[current] - reached)
        if reached != node_ids:
            raise SceneValidationError(
                f"{field}.data concept_map 必须把所有节点连接在同一张关系图中"
            )
        return {"nodes": nodes, "edges": edges}

    if kind in {"timeline", "process"}:
        key = "items" if kind == "timeline" else "steps"
        raw_items = data.get(key)
        if not isinstance(raw_items, list) or not 2 <= len(raw_items) <= 8:
            raise SceneValidationError(f"{field}.data.{key} 必须有 2 到 8 项")
        items = []
        item_keys: set[str] = set()
        for index, item in enumerate(raw_items):
            item_field = f"{field}.data.{key}[{index}]"
            if isinstance(item, str):
                items.append({"label": _text(item, item_field, maximum=120), "detail": ""})
            elif isinstance(item, dict):
                items.append({
                    "label": _text(item.get("label"), f"{item_field}.label", maximum=120),
                    "detail": _optional_text(item.get("detail"), f"{item_field}.detail", maximum=220),
                })
            else:
                raise SceneValidationError(f"{item_field} 必须是字符串或对象")
            item_key = re.sub(r"\s+", "", items[-1]["label"]).casefold()
            if item_key in item_keys:
                raise SceneValidationError(f"{item_field}.label 与已有步骤重复")
            item_keys.add(item_key)
        return {key: items}

    if kind == "probability_bars":
        raw_bars = data.get("bars")
        if not isinstance(raw_bars, list) or not 2 <= len(raw_bars) <= 10:
            raise SceneValidationError(f"{field}.data.bars 必须有 2 到 10 项")
        bars = []
        for index, bar in enumerate(raw_bars):
            bar_field = f"{field}.data.bars[{index}]"
            if not isinstance(bar, dict):
                raise SceneValidationError(f"{bar_field} 必须是对象")
            bars.append({
                "label": _text(bar.get("label"), f"{bar_field}.label", maximum=60),
                "value": _number(bar.get("value"), f"{bar_field}.value", minimum=0, maximum=1),
            })
        return {"bars": bars}

    if kind == "force_diagram":
        raw_vectors = data.get("vectors")
        if not isinstance(raw_vectors, list) or not 1 <= len(raw_vectors) <= 8:
            raise SceneValidationError(f"{field}.data.vectors 必须有 1 到 8 个向量")
        vectors = []
        for index, vector in enumerate(raw_vectors):
            vector_field = f"{field}.data.vectors[{index}]"
            if not isinstance(vector, dict):
                raise SceneValidationError(f"{vector_field} 必须是对象")
            vectors.append({
                "label": _text(vector.get("label"), f"{vector_field}.label", maximum=50),
                "angle": _number(vector.get("angle"), f"{vector_field}.angle", minimum=-360, maximum=360),
                "magnitude": _number(vector.get("magnitude"), f"{vector_field}.magnitude", minimum=0.05, maximum=10),
            })
        return {
            "body_label": _optional_text(data.get("body_label"), f"{field}.data.body_label", maximum=60) or "物体",
            "vectors": vectors,
        }

    # geometry: coordinates are normalized so the renderer controls all SVG.
    raw_points = data.get("points")
    if not isinstance(raw_points, list) or not 2 <= len(raw_points) <= 12:
        raise SceneValidationError(f"{field}.data.points 必须有 2 到 12 个点")
    points = []
    point_ids: set[str] = set()
    for index, point in enumerate(raw_points):
        point_field = f"{field}.data.points[{index}]"
        if not isinstance(point, dict):
            raise SceneValidationError(f"{point_field} 必须是对象")
        point_id = _identifier(point.get("id"), f"p{index + 1}")
        if point_id in point_ids:
            raise SceneValidationError(f"{point_field}.id 重复")
        point_ids.add(point_id)
        points.append({
            "id": point_id,
            "x": _number(point.get("x"), f"{point_field}.x", minimum=0, maximum=1),
            "y": _number(point.get("y"), f"{point_field}.y", minimum=0, maximum=1),
            "label": _optional_text(point.get("label"), f"{point_field}.label", maximum=30),
        })
    raw_segments = data.get("segments") or []
    if not isinstance(raw_segments, list) or len(raw_segments) > 16:
        raise SceneValidationError(f"{field}.data.segments 最多 16 条")
    segments = []
    for index, segment in enumerate(raw_segments):
        segment_field = f"{field}.data.segments[{index}]"
        if not isinstance(segment, dict):
            raise SceneValidationError(f"{segment_field} 必须是对象")
        source = _identifier(segment.get("from"), "")
        target = _identifier(segment.get("to"), "")
        if source not in point_ids or target not in point_ids:
            raise SceneValidationError(f"{segment_field} 引用了不存在的点")
        segments.append({
            "from": source,
            "to": target,
            "label": _optional_text(segment.get("label"), f"{segment_field}.label", maximum=40),
        })
    raw_polygons = data.get("polygons") or []
    if not isinstance(raw_polygons, list) or len(raw_polygons) > 4:
        raise SceneValidationError(f"{field}.data.polygons 最多 4 个")
    polygons = []
    for index, polygon in enumerate(raw_polygons):
        polygon_field = f"{field}.data.polygons[{index}]"
        if not isinstance(polygon, list) or not 3 <= len(polygon) <= 8:
            raise SceneValidationError(f"{polygon_field} 必须由 3 到 8 个点组成")
        normalized_polygon = [_identifier(point_id, "") for point_id in polygon]
        if any(point_id not in point_ids for point_id in normalized_polygon):
            raise SceneValidationError(f"{polygon_field} 引用了不存在的点")
        polygons.append(normalized_polygon)
    return {"points": points, "segments": segments, "polygons": polygons}


def normalize_scene_spec(
    candidate: Any,
    goal: str,
    *,
    drop_invalid_demonstrations: bool = False,
    drop_invalid_semantics: bool = False,
) -> dict[str, Any]:
    """Validate model output and return only fields understood by the renderer."""
    if not isinstance(candidate, dict):
        raise SceneValidationError("场景必须是 JSON 对象")
    for wrapper_key in ("scene_spec", "reviewed_scene_json", "draft_scene_json", "scene_json"):
        nested = candidate.get(wrapper_key)
        if isinstance(nested, dict):
            candidate = nested
            break

    fallback_title = goal.strip()[:80] or "知识学习路径"
    subject_value = candidate.get("subject")
    topic_value = candidate.get("topic")
    title_value = candidate.get("title")
    subject = subject_value.strip()[:40] if isinstance(subject_value, str) and subject_value.strip() else "综合学科"
    topic = topic_value.strip()[:80] if isinstance(topic_value, str) and topic_value.strip() else fallback_title
    title = title_value.strip()[:80] if isinstance(title_value, str) and title_value.strip() else fallback_title
    learning_goal = _optional_text(candidate.get("learning_goal"), "learning_goal", maximum=240) or goal

    validation_warnings: list[str] = []

    raw_sections = candidate.get("sections")
    if not isinstance(raw_sections, list) or not 3 <= len(raw_sections) <= 8:
        raise SceneValidationError("sections 必须有 3 到 8 节")
    sections = []
    section_ids: set[str] = set()
    declared_semantic_ids: set[str] = set()
    for section_index, section in enumerate(raw_sections):
        field = f"sections[{section_index}]"
        if not isinstance(section, dict):
            raise SceneValidationError(f"{field} 必须是对象")
        section_id = _identifier(section.get("id"), f"section-{section_index + 1}")
        if section_id in section_ids:
            raise SceneValidationError(f"{field}.id 重复")
        section_ids.add(section_id)
        raw_blocks = section.get("blocks")
        if not isinstance(raw_blocks, list) or not 1 <= len(raw_blocks) <= 8:
            raise SceneValidationError(f"{field}.blocks 必须有 1 到 8 个内容块")
        normalized_blocks = [
            _normalize_block(
                block,
                section_index,
                block_index,
                drop_invalid_semantics=drop_invalid_semantics,
                validation_warnings=validation_warnings,
            )
            for block_index, block in enumerate(raw_blocks)
        ]
        for block in normalized_blocks:
            declared_semantic_ids.update(block.get("semantic_ids") or [])
        sections.append({
            "id": section_id,
            "heading": _text(section.get("heading"), f"{field}.heading", maximum=100),
            "blocks": normalized_blocks,
        })

    raw_demos = candidate.get("demonstrations") or []
    if not isinstance(raw_demos, list) or len(raw_demos) > 6:
        raise SceneValidationError("demonstrations 最多 6 个")
    demonstrations = []
    demo_ids: set[str] = set()
    shared_parameters: dict[str, tuple[Any, ...]] = {}
    for demo_index, demo in enumerate(raw_demos):
        field = f"demonstrations[{demo_index}]"
        try:
            if not isinstance(demo, dict):
                raise SceneValidationError(f"{field} 必须是对象")
            kind = str(demo.get("kind") or "").strip()
            if kind not in ALLOWED_DEMONSTRATION_KINDS:
                raise SceneValidationError(f"{field}.kind 不受支持：{kind}")
            demo_id = _identifier(demo.get("id"), f"demo-{demo_index + 1}")
            if demo_id in demo_ids:
                raise SceneValidationError(f"{field}.id 重复")
            anchor = _identifier(demo.get("anchor_section_id"), "")
            if anchor not in section_ids:
                raise SceneValidationError(f"{field}.anchor_section_id 不存在")
            semantic_ids = _normalize_semantic_ids(
                demo.get("semantic_ids"),
                f"{field}.semantic_ids",
            )
            missing_semantic_ids = [
                semantic_id
                for semantic_id in semantic_ids
                if semantic_id not in declared_semantic_ids
            ]
            if missing_semantic_ids:
                raise SceneValidationError(
                    f"{field}.semantic_ids 引用了正文未声明的 id：{missing_semantic_ids[0]}"
                )
            prediction = _normalize_prediction(
                demo.get("prediction"),
                f"{field}.prediction",
            )
            normalized_demo = {
                "id": demo_id,
                "kind": kind,
                "title": _text(demo.get("title"), f"{field}.title", maximum=100),
                "anchor_section_id": anchor,
                "side": "left" if demo.get("side") == "left" else "right",
                "semantic_ids": semantic_ids,
                "data": _normalize_demo_data(
                    kind,
                    demo.get("data"),
                    field,
                    semantic_ids=set(semantic_ids),
                    drop_invalid_semantics=drop_invalid_semantics,
                    validation_warnings=validation_warnings,
                ),
            }
            if prediction is not None:
                normalized_demo["prediction"] = prediction
            if kind == "linked_lab":
                parameter = normalized_demo["data"]["parameter"]
                signature = (
                    parameter["min"],
                    parameter["max"],
                    parameter["initial"],
                    parameter.get("step"),
                    parameter.get("unit"),
                )
                previous_signature = shared_parameters.get(parameter["id"])
                if previous_signature is not None and previous_signature != signature:
                    raise SceneValidationError(
                        f"{field}.data.parameter 与同名共享参数 {parameter['id']} 的范围或单位不一致"
                    )
                shared_parameters[parameter["id"]] = signature
        except SceneValidationError as exc:
            if not drop_invalid_demonstrations:
                raise
            validation_warnings.append(str(exc))
            continue
        demo_ids.add(demo_id)
        demonstrations.append(normalized_demo)

    summary = _string_list(
        candidate.get("summary"),
        "summary",
        minimum=2,
        maximum=6,
        item_limit=220,
    )

    return {
        "schema_version": SCENE_SCHEMA_VERSION,
        "subject": subject,
        "topic": topic,
        "title": title,
        "learning_goal": learning_goal,
        "sections": sections,
        "demonstrations": demonstrations,
        "summary": summary,
        "_validation_warnings": validation_warnings,
    }
