"""Deterministic cross-subject benchmark for the Fire Cup knowledge board.

The default command is deliberately offline: it only validates the checked-in
case catalog.  Network requests, and therefore Coze credit use, require the
explicit ``--run-live`` flag.

Examples::

    python -B scripts/benchmark_knowledge_scene.py --validate-cases
    python -B scripts/benchmark_knowledge_scene.py --run-live --case M02
    python -B scripts/benchmark_knowledge_scene.py --run-live --repeat 3 \
        --base-url https://example.invalid

An optional Axiom application key is read from ``FIRECUP_BENCHMARK_KEY`` and
sent as ``X-Axiom-Key``.  The value is never printed or written to reports.
For the isolated public gateway, an allowed Origin can be supplied with
``--origin`` or ``FIRECUP_BENCHMARK_ORIGIN``.
"""
from __future__ import annotations

import argparse
import itertools
import json
import math
import os
import re
import statistics
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable


REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

DEFAULT_CASES_PATH = Path(__file__).with_name("knowledge_scene_benchmark_cases.json")
CURRENT_QUALITY_VERSION = "1.7"
DEFAULT_OUTPUT_DIR = REPO_ROOT / "artifacts" / "knowledge-scene-benchmark"
GENERATE_PATH = "/api/learning/knowledge-scenes/generate"
JOBS_PATH = "/api/learning/knowledge-scenes/jobs"
SUPPORTED_DOMAINS = {"数学", "物理", "化学", "生物", "计算机", "人文"}
SUPPORTED_ASSERTIONS = {
    "concept_edge",
    "concept_no_edge",
    "demo_field",
    "demo_field_regex",
    "demo_text_all",
    "demo_text_any",
    "force_vector",
    "process_order",
}
SUPPORTED_TEXT_ASSERTIONS = {
    "directed_relation",
    "expression_relation",
    "forbidden_relation",
    "quantity_relation",
    "scoped_relation",
}

# Unit aliases are deliberately small and benchmark-owned.  They normalize
# equivalent renderings without turning arbitrary prose into a unit parser.
# Each tuple is ``(regex, multiplier_to_case_unit)``.
UNIT_SPECS: dict[str, tuple[tuple[str, float], ...]] = {
    "acceleration": (
        (
            r"(?<![A-Za-z])m\s*(?:/\s*s\s*(?:\^\s*)?\{?\s*[-\u2212]?\s*2\s*\}?|[\u00b7*]\s*s\s*(?:\^\s*)?\{?\s*[-\u2212]\s*2\s*\}?)(?![A-Za-z0-9])",
            1.0,
        ),
        (r"米\s*(?:每|/)?\s*(?:二次方秒|秒的二次方)", 1.0),
    ),
    "meter": (
        (r"(?<![A-Za-z])km(?![A-Za-z])", 1000.0),
        (r"(?<![A-Za-z])cm(?![A-Za-z])", 0.01),
        (r"(?<![A-Za-z])m(?![A-Za-z]|\s*(?:/|[\u00b7*])\s*s)", 1.0),
        (r"米", 1.0),
    ),
    "newton": (
        (r"(?<![A-Za-z])N(?![A-Za-z])", 1.0),
        (r"牛顿", 1.0),
    ),
    "second": (
        (r"(?<![A-Za-z])ms(?![A-Za-z])", 0.001),
        (r"(?<![A-Za-z])s(?![A-Za-z0-9])", 1.0),
        (r"秒", 1.0),
    ),
    "volt": (
        (r"(?<![A-Za-z])mV(?![A-Za-z])", 0.001),
        (r"(?<![A-Za-z])V(?![A-Za-z])", 1.0),
        (r"伏特", 1.0),
    ),
}

_NUMBER_TOKEN_RE = re.compile(
    r"(?<![\d.])(?P<number>[+\-\u2212]?\s*(?:\d+(?:\.\d+)?|\.\d+)"
    r"(?:[eE][+\-\u2212]?\d+)?)(?![\d.])"
)
_CLAUSE_SPLIT_RE = re.compile(r"[\n\r\u3002\uff01\uff1f\uff1b;]+")
_DIRECTION_TOKEN_RE = re.compile(
    r"(?:\u5411|\u671d)?(?:\u5de6|\u53f3|\u4e0a|\u4e0b)(?:\u65b9|\u4fa7|\u5411)?|"
    r"\u987a\u65f6\u9488|\u9006\u65f6\u9488|\u51fa\u7eb8\u9762|\u5165\u7eb8\u9762|\u7eb8\u5185|\u7eb8\u5916",
    flags=re.IGNORECASE,
)
_NEGATION_BEFORE_RE = re.compile(
    r"(?:\u4e0d(?:\u662f|\u7b49\u4e8e|\u4e3a|\u5e94\u4e3a|\u9700\u8981|\u4f1a|\u80fd|\u53ef|\u5f97|\u8981)?|"
    r"\u5e76\u4e0d|\u5e76\u975e|\u672a|\u65e0\u987b|\u907f\u514d|\u7981\u6b62)"
    r"(?:\u8bf4|\u8ba4\u4e3a|\u58f0\u79f0|\u8868\u793a)?\s*$"
)
_NEGATION_TOKEN_RE = re.compile(
    r"(?:\u4e0d(?:\u662f|\u7b49\u4e8e|\u4e3a|\u5e94\u4e3a|\u9700\u8981|\u4f1a|\u80fd|\u53ef|\u5f97|\u8981)?|"
    r"\u5e76\u4e0d|\u5e76\u975e|\u672a|\u65e0\u987b|\u907f\u514d|\u7981\u6b62)"
)


class CatalogError(ValueError):
    """Raised when the checked-in benchmark catalog is malformed."""


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def normalize_text(value: Any) -> str:
    text = unicodedata.normalize("NFKC", str(value or ""))
    return re.sub(r"\s+", " ", text).strip()


def normalize_expression(value: Any) -> str:
    text = unicodedata.normalize("NFKC", str(value or "")).lower()
    text = re.sub(r"\s+", "", text).replace("**", "^")
    while len(text) >= 2 and text.startswith("(") and text.endswith(")"):
        inner = text[1:-1]
        depth = 0
        balanced = True
        for character in inner:
            if character == "(":
                depth += 1
            elif character == ")":
                depth -= 1
                if depth < 0:
                    balanced = False
                    break
        if not balanced or depth != 0:
            break
        text = inner
    return text


def normalize_math_scope(value: Any) -> str:
    """Canonicalize harmless LaTeX presentation wrappers for oracle matching.

    This intentionally does not simplify arithmetic or reorder operands.  It
    only removes spacing commands and wrappers such as ``\\mathrm{N}``, so
    ``10 N - 4 N = 6 N`` remains distinct from ``10 N + 4 N`` and ``4 N - 10 N``.
    """
    text = unicodedata.normalize("NFKC", str(value or ""))
    text = text.replace("\u2212", "-")
    previous = None
    while previous != text:
        previous = text
        text = re.sub(
            r"\\(?:mathrm|text|operatorname)\s*\{([^{}]*)\}",
            r"\1",
            text,
        )
    text = re.sub(r"\\(?:mathrm|text|operatorname)\s*", "", text)
    text = re.sub(r"\\(?:,|;|!|:|quad|qquad)\s*", "", text)
    text = re.sub(r"\\(?:left|right)\s*", "", text)
    text = text.replace("{", "").replace("}", "")
    return re.sub(r"\s+", "", text)


def regex_matches(pattern: str, text: str) -> bool:
    return re.search(pattern, text, flags=re.IGNORECASE) is not None


def any_pattern(patterns: Iterable[str], text: str) -> bool:
    return any(regex_matches(pattern, text) for pattern in patterns)


def all_patterns(patterns: Iterable[str], text: str) -> bool:
    return all(regex_matches(pattern, text) for pattern in patterns)


def flatten_scalars(value: Any) -> list[str]:
    result: list[str] = []
    if isinstance(value, dict):
        for item in value.values():
            result.extend(flatten_scalars(item))
    elif isinstance(value, list):
        for item in value:
            result.extend(flatten_scalars(item))
    elif isinstance(value, (str, int, float)) and not isinstance(value, bool):
        result.append(normalize_text(value))
    return result


def scene_text(scene: dict[str, Any]) -> str:
    content = scene.get("content") if isinstance(scene.get("content"), dict) else {}
    values = [scene.get("title"), scene.get("topic"), scene.get("subject")]
    values.extend(flatten_scalars(content.get("sections") or []))
    values.extend(flatten_scalars(content.get("summary") or []))
    return normalize_text("\n".join(str(value or "") for value in values))


def _append_scope(result: list[str], value: Any) -> None:
    text = normalize_text(value)
    if not text:
        return
    clauses = [normalize_text(item) for item in _CLAUSE_SPLIT_RE.split(text)]
    result.extend(item for item in clauses if item)


def _collect_logical_scopes(value: Any, result: list[str]) -> None:
    """Collect renderer-visible clauses without flattening the whole board.

    Formula/note and label/detail pairs remain together because they describe
    one local fact.  Prompts, results, list items, derivation steps and summary
    entries remain separate so an input number cannot satisfy an output check
    elsewhere on the board.
    """
    if isinstance(value, str):
        _append_scope(result, value)
        return
    if isinstance(value, list):
        for item in value:
            _collect_logical_scopes(item, result)
        return
    if not isinstance(value, dict):
        return

    consumed: set[str] = set()
    for keys in (("latex", "note", "text", "caption"), ("label", "detail")):
        parts = [value.get(key) for key in keys if isinstance(value.get(key), (str, int, float))]
        if parts:
            _append_scope(result, " ".join(str(part) for part in parts))
            consumed.update(key for key in keys if key in value)
    for key in ("prompt", "result", "heading", "title"):
        if isinstance(value.get(key), (str, int, float)):
            _append_scope(result, value[key])
            consumed.add(key)

    ignored_scalars = {"id", "kind", "style", "side", "semantic_id"}
    fallback_scalars = [
        scalar
        for key, scalar in value.items()
        if key not in consumed
        and key not in ignored_scalars
        and isinstance(scalar, (str, int, float))
        and not isinstance(scalar, bool)
    ]
    if fallback_scalars:
        _append_scope(result, " ".join(str(item) for item in fallback_scalars))

    for key, child in value.items():
        if key in consumed or isinstance(child, (str, int, float, bool)) or child is None:
            continue
        _collect_logical_scopes(child, result)


def scene_text_scopes(scene: dict[str, Any]) -> list[str]:
    content = scene.get("content") if isinstance(scene.get("content"), dict) else {}
    result: list[str] = []
    for value in (scene.get("title"), scene.get("topic"), scene.get("subject")):
        _append_scope(result, value)
    _collect_logical_scopes(content.get("sections") or [], result)
    _collect_logical_scopes(content.get("summary") or [], result)
    return result


def text_scopes(value: str) -> list[str]:
    result: list[str] = []
    _append_scope(result, value)
    return result


def _matches(pattern: str, text: str) -> list[re.Match[str]]:
    return list(re.finditer(pattern, text, flags=re.IGNORECASE))


def _match_is_negated(text: str, match: re.Match[str], *, lookback: int = 14) -> bool:
    prefix = text[max(0, match.start() - lookback):match.start()]
    return _NEGATION_BEFORE_RE.search(prefix) is not None


def _combination_spans(
    pattern_groups: Iterable[str],
    scope: str,
    *,
    max_span: int,
) -> Iterable[tuple[re.Match[str], ...]]:
    matches_by_group = [_matches(pattern, scope) for pattern in pattern_groups]
    if not matches_by_group or any(not matches for matches in matches_by_group):
        return
    for combination in itertools.product(*matches_by_group):
        start = min(match.start() for match in combination)
        end = max(match.end() for match in combination)
        if end - start <= max_span:
            yield combination


def _unit_matches(scope: str, unit: str) -> list[tuple[re.Match[str], float]]:
    return [
        (match, multiplier)
        for pattern, multiplier in UNIT_SPECS.get(unit, ())
        for match in _matches(pattern, scope)
    ]


def _number_value(match: re.Match[str]) -> float:
    raw = match.group("number").replace(" ", "").replace("\u2212", "-")
    return float(raw)


def _distance(left: re.Match[str], right: re.Match[str]) -> int:
    if left.end() < right.start():
        return right.start() - left.end()
    if right.end() < left.start():
        return left.start() - right.end()
    return 0


def _distance_to_span(match: re.Match[str], start: int, end: int) -> int:
    if match.end() < start:
        return start - match.end()
    if match.start() > end:
        return match.start() - end
    return 0


def _check_quantity_relation(
    scopes: list[str], assertion: dict[str, Any]
) -> tuple[bool, str]:
    entity_patterns = assertion.get("entity_patterns") or []
    expected = float(assertion["expected"])
    tolerance = float(assertion.get("tolerance", 1e-6))
    max_distance = int(assertion.get("max_distance", 48))
    unit_distance = int(assertion.get("unit_distance", 24))
    unit = str(assertion.get("unit") or "")
    direction_patterns = assertion.get("direction_patterns") or []
    actual: list[str] = []

    for scope in scopes:
        entities = [match for pattern in entity_patterns for match in _matches(pattern, scope)]
        if not entities:
            continue
        directions = [
            match
            for match in _DIRECTION_TOKEN_RE.finditer(scope)
            if not _match_is_negated(scope, match)
        ]
        if direction_patterns and not directions:
            continue
        units = _unit_matches(scope, unit) if unit else []
        if unit and not units:
            continue
        numbers = [
            match
            for match in _NUMBER_TOKEN_RE.finditer(scope)
            if not _match_is_negated(scope, match)
        ]
        for entity in entities:
            entity_candidates: list[
                tuple[tuple[int, int], float, str, re.Match[str], re.Match[str] | None]
            ] = []
            for number in numbers:
                entity_distance = _distance(entity, number)
                if entity_distance > max_distance:
                    continue
                if unit and any(
                    unit_match.start() <= number.start()
                    and number.end() <= unit_match.end()
                    for unit_match, _ in units
                ):
                    # Exponents in units such as m/s2 or m*s-2 are not
                    # candidate physical values.
                    continue
                multiplier = 1.0
                unit_label = ""
                unit_match: re.Match[str] | None = None
                if unit:
                    nearby_units = [
                        (match, factor)
                        for match, factor in units
                        if _distance(number, match) <= unit_distance
                    ]
                    if not nearby_units:
                        continue
                    unit_match, multiplier = min(
                        nearby_units,
                        key=lambda item: _distance(number, item[0]),
                    )
                    unit_label = unit_match.group(0)
                value = _number_value(number) * multiplier
                binding_rank = (
                    _distance(number, unit_match) if unit_match is not None else entity_distance,
                    entity_distance,
                )
                entity_candidates.append(
                    (binding_rank, value, unit_label, number, unit_match)
                )
            if not entity_candidates:
                continue
            nearest_distance = min(candidate[0] for candidate in entity_candidates)
            nearest = [
                candidate for candidate in entity_candidates
                if candidate[0] == nearest_distance
            ]
            if direction_patterns:
                # A direction belongs to this quantity only when it is the
                # nearest direction token to the entity/value pair.  This
                # prevents one clause containing two quantities from lending
                # the second quantity's direction to the first.
                direction_bound_candidates = []
                for candidate in nearest:
                    _, _, _, number, matched_unit = candidate
                    span_start = min(
                        entity.start(),
                        number.start(),
                        matched_unit.start() if matched_unit is not None else number.start(),
                    )
                    span_end = max(
                        entity.end(),
                        number.end(),
                        matched_unit.end() if matched_unit is not None else number.end(),
                    )
                    nearest_direction_distance = min(
                        _distance_to_span(direction, span_start, span_end)
                        for direction in directions
                    )
                    nearest_directions = [
                        direction
                        for direction in directions
                        if _distance_to_span(direction, span_start, span_end)
                        == nearest_direction_distance
                    ]
                    direction_span = max(
                        max(direction.end() for direction in nearest_directions),
                        span_end,
                    ) - min(
                        min(direction.start() for direction in nearest_directions),
                        span_start,
                    )
                    expected_direction = all(
                        any(regex_matches(pattern, direction.group(0)) for pattern in direction_patterns)
                        for direction in nearest_directions
                    )
                    if expected_direction and direction_span <= int(
                        assertion.get("direction_max_span", max_distance + 24)
                    ):
                        direction_bound_candidates.append(candidate)
                if not direction_bound_candidates:
                    continue
                nearest = direction_bound_candidates
            actual.extend(
                f"{value:g}{unit_label}@{scope[:120]}"
                for _, value, unit_label, _, _ in nearest
            )
            for _, value, _, _, _ in nearest:
                if math.isclose(value, expected, abs_tol=tolerance, rel_tol=0):
                    return True, (
                        f"expected={expected:g} {unit}; matched={value:g} "
                        f"in {scope!r}"
                    )
    return False, f"expected={expected:g} {unit}; candidates={actual}"


def _check_scoped_relation(
    scopes: list[str], assertion: dict[str, Any]
) -> tuple[bool, str]:
    required = assertion.get("required_all") or []
    forbidden = assertion.get("forbidden_any") or []
    max_span = int(assertion.get("max_span", 80))
    candidates: list[str] = []
    for scope in scopes:
        for combination in _combination_spans(required, scope, max_span=max_span):
            if any(_match_is_negated(scope, match) for match in combination):
                continue
            forbidden_hits = [
                match.group(0)
                for pattern in forbidden
                for match in _matches(pattern, scope)
                if not _match_is_negated(scope, match)
            ]
            candidates.append(scope)
            if not forbidden_hits:
                return True, f"matched local scope={scope!r}"
    return False, f"required={required}; candidate_scopes={candidates}"


def _direction_candidate(
    scope: str,
    *,
    actor_patterns: list[str],
    source_patterns: list[str],
    target_patterns: list[str],
    connector_patterns: list[str],
    max_span: int,
) -> bool:
    actors = [match for pattern in actor_patterns for match in _matches(pattern, scope)]
    sources = [match for pattern in source_patterns for match in _matches(pattern, scope)]
    targets = [match for pattern in target_patterns for match in _matches(pattern, scope)]
    connectors = [match for pattern in connector_patterns for match in _matches(pattern, scope)]
    for source, connector, target in itertools.product(sources, connectors, targets):
        if not (source.start() < connector.start() < target.start()):
            continue
        relevant = (source, connector, target)
        if actors:
            nearby = [
                actor
                for actor in actors
                if max(target.end(), actor.end()) - min(source.start(), actor.start()) <= max_span
            ]
            if not nearby:
                continue
            relevant = (*relevant, nearby[0])
        start = min(match.start() for match in relevant)
        end = max(match.end() for match in relevant)
        if end - start > max_span or _match_is_negated(scope, connector):
            continue
        negation_window = scope[max(0, start - 12):connector.start()]
        if _NEGATION_TOKEN_RE.search(negation_window):
            continue
        return True
    return False


def _check_directed_relation(
    scopes: list[str], assertion: dict[str, Any]
) -> tuple[bool, str]:
    actor_patterns = assertion.get("actor_patterns") or []
    source_patterns = assertion.get("source_patterns") or []
    target_patterns = assertion.get("target_patterns") or []
    connector_patterns = assertion.get("connector_patterns") or []
    max_span = int(assertion.get("max_span", 80))
    for scope in scopes:
        forward = _direction_candidate(
            scope,
            actor_patterns=actor_patterns,
            source_patterns=source_patterns,
            target_patterns=target_patterns,
            connector_patterns=connector_patterns,
            max_span=max_span,
        )
        if not forward:
            continue
        reverse = _direction_candidate(
            scope,
            actor_patterns=actor_patterns,
            source_patterns=target_patterns,
            target_patterns=source_patterns,
            connector_patterns=connector_patterns,
            max_span=max_span,
        )
        if not reverse:
            return True, f"directed relation matched in {scope!r}"
    return False, "no unnegated forward relation, or a reverse relation was also asserted"


def _check_forbidden_relation(
    scopes: list[str], assertion: dict[str, Any]
) -> tuple[bool, str]:
    subject_patterns = assertion.get("subject_patterns") or []
    predicate_patterns = assertion.get("predicate_patterns") or []
    object_patterns = assertion.get("object_patterns") or []
    max_span = int(assertion.get("max_span", 60))
    violations: list[str] = []
    for scope in scopes:
        for combination in _combination_spans(
            [*subject_patterns, *predicate_patterns, *object_patterns],
            scope,
            max_span=max_span,
        ):
            predicate_matches = combination[
                len(subject_patterns):len(subject_patterns) + len(predicate_patterns)
            ]
            subject_matches = combination[:len(subject_patterns)]
            subject_start = min(match.start() for match in subject_matches)
            subject_prefix = scope[max(0, subject_start - 14):subject_start]
            if any(_match_is_negated(scope, match) for match in predicate_matches):
                continue
            if _NEGATION_TOKEN_RE.search(subject_prefix):
                continue
            violations.append(scope)
            break
    return not violations, f"affirmed forbidden scopes={violations}"


def _check_expression_relation(
    scopes: list[str], assertion: dict[str, Any]
) -> tuple[bool, str]:
    entities = assertion.get("entity_patterns") or []
    expressions = assertion.get("expression_patterns") or []
    unit = str(assertion.get("unit") or "")
    max_span = int(assertion.get("max_span", 64))
    for scope in scopes:
        candidate_scope = (
            normalize_math_scope(scope)
            if assertion.get("normalize_math")
            else scope
        )
        for combination in _combination_spans(
            [*entities, *expressions], candidate_scope, max_span=max_span
        ):
            if any(
                _match_is_negated(candidate_scope, match)
                for match in combination
            ):
                continue
            if unit and not _unit_matches(candidate_scope, unit):
                continue
            return True, f"expression relation matched in {candidate_scope!r}"
    return False, f"entity={entities}; expression={expressions}; unit={unit}"


def check_text_assertion(
    scopes: list[str], assertion: dict[str, Any]
) -> tuple[bool, str]:
    assertion_type = assertion.get("type")
    if assertion_type == "quantity_relation":
        return _check_quantity_relation(scopes, assertion)
    if assertion_type == "scoped_relation":
        return _check_scoped_relation(scopes, assertion)
    if assertion_type == "directed_relation":
        return _check_directed_relation(scopes, assertion)
    if assertion_type == "forbidden_relation":
        return _check_forbidden_relation(scopes, assertion)
    if assertion_type == "expression_relation":
        return _check_expression_relation(scopes, assertion)
    return False, f"unknown text assertion type={assertion_type}"


def evaluate_correctness_item(
    item: dict[str, Any],
    text: str,
    scopes: list[str],
) -> tuple[bool, list[str]]:
    passed = True
    details: list[str] = []
    if item.get("any"):
        any_ok = any_pattern(item["any"], text)
        passed = passed and any_ok
        details.append(f"any={item['any']}:{any_ok}")
    if item.get("all"):
        all_ok = all_patterns(item["all"], text)
        passed = passed and all_ok
        details.append(f"all={item['all']}:{all_ok}")
    if item.get("none"):
        none_hits = [pattern for pattern in item["none"] if regex_matches(pattern, text)]
        none_ok = not none_hits
        passed = passed and none_ok
        details.append(f"forbidden_hits={none_hits}")
    if item.get("typed"):
        typed_ok, detail = check_text_assertion(scopes, item["typed"])
        passed = passed and typed_ok
        details.append(f"typed={typed_ok}:{detail}")
    if item.get("typed_all"):
        typed_results = [check_text_assertion(scopes, assertion) for assertion in item["typed_all"]]
        typed_ok = all(result[0] for result in typed_results)
        passed = passed and typed_ok
        details.append(f"typed_all={typed_ok}:{[result[1] for result in typed_results]}")
    if item.get("typed_any"):
        typed_results = [check_text_assertion(scopes, assertion) for assertion in item["typed_any"]]
        typed_ok = any(result[0] for result in typed_results)
        passed = passed and typed_ok
        details.append(f"typed_any={typed_ok}:{[result[1] for result in typed_results]}")
    return passed, details


def demonstrations(scene: dict[str, Any]) -> list[dict[str, Any]]:
    content = scene.get("content")
    if not isinstance(content, dict) or not isinstance(content.get("demonstrations"), list):
        return []
    return [item for item in content["demonstrations"] if isinstance(item, dict)]


def sections(scene: dict[str, Any]) -> list[dict[str, Any]]:
    content = scene.get("content")
    if not isinstance(content, dict) or not isinstance(content.get("sections"), list):
        return []
    return [item for item in content["sections"] if isinstance(item, dict)]


def values_at_path(value: Any, path: str) -> list[Any]:
    parts = [part for part in path.split(".") if part]

    def walk(current: Any, index: int) -> list[Any]:
        if index == len(parts):
            return [current]
        part = parts[index]
        if part == "*":
            if isinstance(current, list):
                return [found for item in current for found in walk(item, index + 1)]
            if isinstance(current, dict):
                return [found for item in current.values() for found in walk(item, index + 1)]
            return []
        if isinstance(current, dict) and part in current:
            return walk(current[part], index + 1)
        if isinstance(current, list) and part.isdigit():
            item_index = int(part)
            if 0 <= item_index < len(current):
                return walk(current[item_index], index + 1)
        return []

    return walk(value, 0)


def load_catalog(path: Path = DEFAULT_CASES_PATH) -> dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise CatalogError(f"题库不存在：{path}") from exc
    except json.JSONDecodeError as exc:
        raise CatalogError(f"题库 JSON 无法解析：{exc}") from exc


def _iter_typed_assertions(check: dict[str, Any]) -> Iterable[tuple[str, dict[str, Any]]]:
    if isinstance(check.get("typed"), dict):
        yield "typed", check["typed"]
    for key in ("typed_all", "typed_any"):
        for index, assertion in enumerate(check.get(key) or []):
            if isinstance(assertion, dict):
                yield f"{key}[{index}]", assertion


def _text_assertion_patterns(assertion: dict[str, Any]) -> Iterable[tuple[str, str]]:
    for key in (
        "actor_patterns", "connector_patterns", "direction_patterns",
        "entity_patterns", "expression_patterns", "forbidden_any",
        "object_patterns", "predicate_patterns", "required_all",
        "source_patterns", "subject_patterns", "target_patterns",
    ):
        for index, pattern in enumerate(assertion.get(key) or []):
            yield f"{key}[{index}]", pattern


def _catalog_patterns(case: dict[str, Any]) -> Iterable[tuple[str, str]]:
    for group_index, group in enumerate(case.get("target_text_any") or []):
        for pattern_index, pattern in enumerate(group):
            yield f"target_text_any[{group_index}][{pattern_index}]", pattern
    for check_index, check in enumerate(case.get("correctness") or []):
        for key in ("any", "all", "none"):
            for pattern_index, pattern in enumerate(check.get(key) or []):
                yield f"correctness[{check_index}].{key}[{pattern_index}]", pattern
        for assertion_path, assertion in _iter_typed_assertions(check):
            for field, pattern in _text_assertion_patterns(assertion):
                yield f"correctness[{check_index}].{assertion_path}.{field}", pattern
    policy = case.get("demo_policy") or {}
    for assertion_index, assertion in enumerate(policy.get("assertions") or []):
        for key in (
            "patterns", "label_patterns", "from_patterns", "to_patterns",
            "edge_patterns",
        ):
            for pattern_index, pattern in enumerate(assertion.get(key) or []):
                yield f"demo_policy.assertions[{assertion_index}].{key}[{pattern_index}]", pattern


def validate_catalog(catalog: dict[str, Any]) -> list[dict[str, Any]]:
    errors: list[str] = []
    if not isinstance(catalog, dict):
        raise CatalogError("题库根对象必须是 JSON object")
    if catalog.get("schema_version") != "1.0":
        errors.append("schema_version 必须为 1.0")
    cases = catalog.get("cases")
    if not isinstance(cases, list):
        raise CatalogError("cases 必须是数组")
    if len(cases) != 20:
        errors.append(f"题目数量必须为 20，实际为 {len(cases)}")

    ids: set[str] = set()
    counts: Counter[str] = Counter()
    for index, case in enumerate(cases):
        prefix = f"cases[{index}]"
        if not isinstance(case, dict):
            errors.append(f"{prefix} 必须是对象")
            continue
        case_id = case.get("id")
        if not isinstance(case_id, str) or not re.fullmatch(r"[A-Z]{1,2}\d{2}", case_id):
            errors.append(f"{prefix}.id 格式无效")
        elif case_id in ids:
            errors.append(f"{prefix}.id 重复：{case_id}")
        else:
            ids.add(case_id)
        domain = case.get("domain")
        if domain not in SUPPORTED_DOMAINS:
            errors.append(f"{prefix}.domain 不受支持：{domain}")
        else:
            counts[domain] += 1
        goal = case.get("goal")
        if not isinstance(goal, str) or not goal.strip() or len(goal) > 240:
            errors.append(f"{prefix}.goal 必须是 1 到 240 字的字符串")
        source_text = case.get("source_text")
        if not isinstance(source_text, str) or len(source_text) > 12000:
            errors.append(f"{prefix}.source_text 必须是最多 12000 字的字符串")
        subject_terms = case.get("subject_terms")
        if not isinstance(subject_terms, list) or not subject_terms or not all(
            isinstance(item, str) and item for item in subject_terms
        ):
            errors.append(f"{prefix}.subject_terms 必须是非空字符串数组")
        target_groups = case.get("target_text_any")
        if not isinstance(target_groups, list) or not target_groups or not all(
            isinstance(group, list) and group and all(isinstance(item, str) for item in group)
            for group in target_groups
        ):
            errors.append(f"{prefix}.target_text_any 必须是非空正则分组数组")
        correctness = case.get("correctness")
        if not isinstance(correctness, list) or not correctness:
            errors.append(f"{prefix}.correctness 必须是非空数组")
        else:
            correctness_ids: set[str] = set()
            for check_index, check in enumerate(correctness):
                if not isinstance(check, dict):
                    errors.append(f"{prefix}.correctness[{check_index}] 必须是对象")
                    continue
                check_id = check.get("id")
                if not isinstance(check_id, str) or not check_id:
                    errors.append(f"{prefix}.correctness[{check_index}].id 缺失")
                elif check_id in correctness_ids:
                    errors.append(f"{prefix}.correctness[{check_index}].id 重复")
                correctness_ids.add(str(check_id))
                if not any(
                    check.get(key)
                    for key in ("any", "all", "none", "typed", "typed_all", "typed_any")
                ):
                    errors.append(
                        f"{prefix}.correctness[{check_index}] "
                        "至少需要 any/all/none/typed/typed_all/typed_any"
                    )
                for assertion_path, assertion in _iter_typed_assertions(check):
                    assertion_prefix = (
                        f"{prefix}.correctness[{check_index}].{assertion_path}"
                    )
                    assertion_type = assertion.get("type")
                    if assertion_type not in SUPPORTED_TEXT_ASSERTIONS:
                        errors.append(f"{assertion_prefix}.type 不受支持：{assertion_type}")
                    if assertion_type == "quantity_relation":
                        if not isinstance(assertion.get("expected"), (int, float)):
                            errors.append(f"{assertion_prefix}.expected 必须是数值")
                        unit = str(assertion.get("unit") or "")
                        if unit and unit not in UNIT_SPECS:
                            errors.append(f"{assertion_prefix}.unit 不受支持：{unit}")
                        if not assertion.get("entity_patterns"):
                            errors.append(f"{assertion_prefix}.entity_patterns 不能为空")
                    elif assertion_type == "scoped_relation":
                        if not assertion.get("required_all"):
                            errors.append(f"{assertion_prefix}.required_all 不能为空")
                    elif assertion_type == "directed_relation":
                        for key in ("source_patterns", "target_patterns", "connector_patterns"):
                            if not assertion.get(key):
                                errors.append(f"{assertion_prefix}.{key} 不能为空")
                    elif assertion_type == "forbidden_relation":
                        for key in ("subject_patterns", "predicate_patterns", "object_patterns"):
                            if not assertion.get(key):
                                errors.append(f"{assertion_prefix}.{key} 不能为空")
                    elif assertion_type == "expression_relation":
                        if not assertion.get("entity_patterns") or not assertion.get("expression_patterns"):
                            errors.append(
                                f"{assertion_prefix}.entity_patterns/expression_patterns 不能为空"
                            )
                    unit = str(assertion.get("unit") or "")
                    if unit and unit not in UNIT_SPECS:
                        errors.append(f"{assertion_prefix}.unit 不受支持：{unit}")
                oracle_examples = check.get("oracle_examples")
                if oracle_examples is not None:
                    if not isinstance(oracle_examples, dict):
                        errors.append(
                            f"{prefix}.correctness[{check_index}].oracle_examples 必须是对象"
                        )
                    else:
                        for expectation in ("accept", "reject"):
                            examples = oracle_examples.get(expectation) or []
                            if not isinstance(examples, list) or not all(
                                isinstance(example, str) and example for example in examples
                            ):
                                errors.append(
                                    f"{prefix}.correctness[{check_index}]."
                                    f"oracle_examples.{expectation} 必须是字符串数组"
                                )
        policy = case.get("demo_policy")
        if not isinstance(policy, dict):
            errors.append(f"{prefix}.demo_policy 必须是对象")
        else:
            if policy.get("mode") not in {"required", "optional", "forbidden"}:
                errors.append(f"{prefix}.demo_policy.mode 无效")
            assertions = policy.get("assertions")
            if not isinstance(assertions, list):
                errors.append(f"{prefix}.demo_policy.assertions 必须是数组")
            else:
                for assertion_index, assertion in enumerate(assertions):
                    if not isinstance(assertion, dict):
                        errors.append(
                            f"{prefix}.demo_policy.assertions[{assertion_index}] 必须是对象"
                        )
                        continue
                    if assertion.get("type") not in SUPPORTED_ASSERTIONS:
                        errors.append(
                            f"{prefix}.demo_policy.assertions[{assertion_index}].type 不受支持"
                        )
        for field, pattern in _catalog_patterns(case):
            try:
                re.compile(pattern, flags=re.IGNORECASE)
            except (re.error, TypeError) as exc:
                errors.append(f"{prefix}.{field} 正则无效：{exc}")
        for check_index, check in enumerate(case.get("correctness") or []):
            if not isinstance(check, dict) or not isinstance(check.get("oracle_examples"), dict):
                continue
            examples = check["oracle_examples"]
            for expectation, expected in (("accept", True), ("reject", False)):
                for example_index, example in enumerate(examples.get(expectation) or []):
                    try:
                        actual, detail = evaluate_correctness_item(
                            check,
                            normalize_text(example),
                            text_scopes(example),
                        )
                    except (KeyError, TypeError, ValueError, re.error) as exc:
                        errors.append(
                            f"{prefix}.correctness[{check_index}].oracle_examples."
                            f"{expectation}[{example_index}] 执行失败：{exc}"
                        )
                        continue
                    if actual != expected:
                        errors.append(
                            f"{prefix}.correctness[{check_index}].oracle_examples."
                            f"{expectation}[{example_index}] 预期={expected} 实际={actual}；"
                            f"example={example!r}; detail={detail}"
                        )

    expected_counts = catalog.get("expected_domain_counts")
    if expected_counts != dict(counts):
        errors.append(
            "学科分布不符合 expected_domain_counts："
            f"expected={expected_counts}, actual={dict(counts)}"
        )
    if errors:
        raise CatalogError("\n".join(errors))
    return cases


def select_cases(cases: list[dict[str, Any]], selections: list[str] | None) -> list[dict[str, Any]]:
    if not selections:
        return cases
    requested: list[str] = []
    for selection in selections:
        requested.extend(item.strip().upper() for item in selection.split(",") if item.strip())
    if not requested or "ALL" in requested:
        return cases
    by_id = {case["id"]: case for case in cases}
    unknown = [case_id for case_id in requested if case_id not in by_id]
    if unknown:
        raise CatalogError(f"未知 case：{', '.join(unknown)}")
    # Preserve caller order while avoiding accidental duplicate credit spend.
    result: list[dict[str, Any]] = []
    seen: set[str] = set()
    for case_id in requested:
        if case_id not in seen:
            seen.add(case_id)
            result.append(by_id[case_id])
    return result


def api_url(base_url: str, path: str) -> str:
    normalized = base_url.strip().rstrip("/")
    parsed = urllib.parse.urlsplit(normalized)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise CatalogError("--base-url 必须是 http 或 https URL")
    if parsed.query or parsed.fragment:
        raise CatalogError("--base-url 不应包含 query 或 fragment")
    for known_path in (GENERATE_PATH, JOBS_PATH):
        if parsed.path.rstrip("/").endswith(known_path):
            return f"{normalized[:-len(known_path)]}{path}"
    return f"{normalized}{path}"


def generate_url(base_url: str) -> str:
    """Backward-compatible synchronous endpoint resolver."""
    return api_url(base_url, GENERATE_PATH)


def post_case(
    url: str,
    case: dict[str, Any],
    *,
    timeout_seconds: float,
    key: str,
    origin: str,
) -> dict[str, Any]:
    body = json.dumps(
        {"goal": case["goal"], "source_text": case.get("source_text", "")},
        ensure_ascii=False,
    ).encode("utf-8")
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "AxiomKnowledgeSceneBenchmark/1.0",
    }
    if key:
        headers["X-Axiom-Key"] = key
    if origin:
        headers["Origin"] = origin
    request = urllib.request.Request(url, data=body, method="POST", headers=headers)
    started = time.perf_counter()
    status = 0
    cache = ""
    raw_body = ""
    transport_error = ""
    try:
        with urllib.request.urlopen(request, timeout=timeout_seconds) as response:
            status = int(response.status)
            cache = str(response.headers.get("X-Axiom-Cache") or "").lower()
            raw_body = response.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as exc:
        status = int(exc.code)
        cache = str(exc.headers.get("X-Axiom-Cache") or "").lower()
        raw_body = exc.read().decode("utf-8", errors="replace")
        transport_error = f"HTTP {exc.code}"
    except (urllib.error.URLError, TimeoutError, OSError) as exc:
        transport_error = f"{type(exc).__name__}: {exc}"
    latency_ms = round((time.perf_counter() - started) * 1000, 2)

    payload: Any = None
    parse_error = ""
    if raw_body:
        try:
            payload = json.loads(raw_body)
        except json.JSONDecodeError as exc:
            parse_error = f"响应不是合法 JSON：{exc}"
    return {
        "status": status,
        "cache": cache,
        "latency_ms": latency_ms,
        "payload": payload,
        "transport_error": transport_error,
        "parse_error": parse_error,
        # Error bodies are useful for diagnosis but bounded and never include
        # request headers or the optional benchmark key.
        "error_body": raw_body[:2000] if status >= 400 or parse_error else "",
    }


def _request_json(
    url: str,
    *,
    method: str,
    timeout_seconds: float,
    key: str,
    origin: str,
    body: dict[str, Any] | None = None,
) -> dict[str, Any]:
    encoded = None
    headers = {
        "Accept": "application/json",
        "User-Agent": "AxiomKnowledgeSceneBenchmark/1.1",
    }
    if body is not None:
        encoded = json.dumps(body, ensure_ascii=False).encode("utf-8")
        headers["Content-Type"] = "application/json; charset=utf-8"
    if key:
        headers["X-Axiom-Key"] = key
    if origin:
        headers["Origin"] = origin
    request = urllib.request.Request(url, data=encoded, method=method, headers=headers)
    status = 0
    raw_body = ""
    response_headers: dict[str, str] = {}
    transport_error = ""
    try:
        with urllib.request.urlopen(request, timeout=timeout_seconds) as response:
            status = int(response.status)
            response_headers = {str(k).lower(): str(v) for k, v in response.headers.items()}
            raw_body = response.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as exc:
        status = int(exc.code)
        response_headers = {str(k).lower(): str(v) for k, v in exc.headers.items()}
        raw_body = exc.read().decode("utf-8", errors="replace")
        transport_error = f"HTTP {exc.code}"
    except (urllib.error.URLError, TimeoutError, OSError) as exc:
        transport_error = f"{type(exc).__name__}: {exc}"

    payload: Any = None
    parse_error = ""
    if raw_body:
        try:
            payload = json.loads(raw_body)
        except json.JSONDecodeError as exc:
            parse_error = f"响应不是合法 JSON：{exc}"
    return {
        "status": status,
        "headers": response_headers,
        "payload": payload,
        "raw_body": raw_body,
        "transport_error": transport_error,
        "parse_error": parse_error,
    }


def _job_status_url(create_url: str, job_id: str, candidate: Any) -> str:
    fallback = f"{create_url}/{urllib.parse.quote(job_id, safe='')}"
    if not isinstance(candidate, str) or not candidate.strip():
        return fallback
    resolved = urllib.parse.urljoin(create_url, candidate.strip())
    parsed_create = urllib.parse.urlsplit(create_url)
    parsed_status = urllib.parse.urlsplit(resolved)
    if (
        parsed_status.scheme != parsed_create.scheme
        or parsed_status.netloc != parsed_create.netloc
        or not parsed_status.path.startswith(f"{JOBS_PATH}/")
    ):
        return fallback
    return resolved


def _poll_delay_seconds(payload: Any, headers: dict[str, str]) -> float:
    retry_ms = payload.get("retry_after_ms") if isinstance(payload, dict) else None
    if isinstance(retry_ms, (int, float)) and math.isfinite(retry_ms):
        return min(10.0, max(0.5, float(retry_ms) / 1000.0))
    retry_header = headers.get("retry-after", "")
    try:
        return min(10.0, max(0.5, float(retry_header)))
    except (TypeError, ValueError):
        return 2.0


def post_case_async(
    base_url: str,
    case: dict[str, Any],
    *,
    timeout_seconds: float,
    key: str,
    origin: str,
) -> dict[str, Any]:
    """Submit a persistent job and poll short requests until a terminal result."""
    create_url = api_url(base_url, JOBS_PATH)
    started = time.perf_counter()
    deadline = started + timeout_seconds
    create = _request_json(
        create_url,
        method="POST",
        timeout_seconds=min(20.0, timeout_seconds),
        key=key,
        origin=origin,
        body={"goal": case["goal"], "source_text": case.get("source_text", "")},
    )
    create_payload = create.get("payload")
    if create.get("status") not in {200, 202} or not isinstance(create_payload, dict):
        latency_ms = round((time.perf_counter() - started) * 1000, 2)
        return {
            "status": int(create.get("status") or 0),
            "cache": "",
            "latency_ms": latency_ms,
            "payload": create_payload,
            "transport_error": create.get("transport_error") or "",
            "parse_error": create.get("parse_error") or "",
            "error_body": str(create.get("raw_body") or "")[:2000],
        }

    job_id = create_payload.get("job_id")
    if not isinstance(job_id, str) or not job_id.strip():
        return {
            "status": 0,
            "cache": "",
            "latency_ms": round((time.perf_counter() - started) * 1000, 2),
            "payload": create_payload,
            "transport_error": "异步提交未返回合法 job_id",
            "parse_error": "",
            "error_body": "",
        }
    status_url = _job_status_url(create_url, job_id, create_payload.get("status_url"))
    next_delay = _poll_delay_seconds(create_payload, create.get("headers") or {})
    transient_failures = 0

    while True:
        remaining = deadline - time.perf_counter()
        if remaining <= 0:
            return {
                "status": 0,
                "cache": "",
                "latency_ms": round((time.perf_counter() - started) * 1000, 2),
                "payload": None,
                "transport_error": f"异步任务在 {timeout_seconds:g} 秒内未完成",
                "parse_error": "",
                "error_body": "",
            }
        time.sleep(min(next_delay, remaining))
        poll = _request_json(
            status_url,
            method="GET",
            timeout_seconds=min(20.0, max(1.0, deadline - time.perf_counter())),
            key=key,
            origin=origin,
        )
        payload = poll.get("payload")
        if poll.get("status") != 200 or not isinstance(payload, dict):
            transient = int(poll.get("status") or 0) in {0, 408, 425, 429, 500, 502, 503, 504}
            if transient and transient_failures < 3:
                transient_failures += 1
                next_delay = min(10.0, 2.0 * (2 ** (transient_failures - 1)))
                continue
            return {
                "status": int(poll.get("status") or 0),
                "cache": "",
                "latency_ms": round((time.perf_counter() - started) * 1000, 2),
                "payload": payload,
                "transport_error": poll.get("transport_error") or "",
                "parse_error": poll.get("parse_error") or "",
                "error_body": str(poll.get("raw_body") or "")[:2000],
            }

        transient_failures = 0
        status = payload.get("status")
        if status in {"queued", "running"}:
            next_delay = _poll_delay_seconds(payload, poll.get("headers") or {})
            continue
        latency_ms = round((time.perf_counter() - started) * 1000, 2)
        if status == "succeeded" and isinstance(payload.get("scene"), dict):
            request_meta = payload.get("request") if isinstance(payload.get("request"), dict) else {}
            return {
                "status": 200,
                "cache": str(request_meta.get("cache") or "").lower(),
                "latency_ms": latency_ms,
                "payload": {"scene": payload["scene"], "request": request_meta},
                "transport_error": "",
                "parse_error": "",
                "error_body": "",
            }
        error = payload.get("error") if isinstance(payload.get("error"), dict) else {}
        return {
            "status": 503,
            "cache": "",
            "latency_ms": latency_ms,
            "payload": payload,
            "transport_error": "",
            "parse_error": "",
            "error_body": json.dumps(error, ensure_ascii=False)[:2000],
        }


def extract_scene(payload: Any) -> dict[str, Any] | None:
    if not isinstance(payload, dict):
        return None
    if isinstance(payload.get("scene"), dict):
        return payload["scene"]
    data = payload.get("data")
    if isinstance(data, dict) and isinstance(data.get("scene"), dict):
        return data["scene"]
    if all(key in payload for key in ("schema_version", "title", "renderer")):
        return payload
    return None


def strict_schema_check(scene: dict[str, Any], goal: str) -> tuple[bool, str]:
    required_manifest_fields = {
        "schema_version", "scene_id", "template_id", "title", "topic",
        "subject", "learning_goal", "renderer", "learning_path",
        "capabilities", "generation",
    }
    missing = sorted(required_manifest_fields - set(scene))
    if missing:
        return False, f"manifest 缺字段：{', '.join(missing)}"
    renderer = scene.get("renderer")
    if not isinstance(renderer, dict) or renderer.get("kind") != "structured_scene":
        return False, "通用题必须返回 structured_scene"
    content = scene.get("content")
    if not isinstance(content, dict):
        return False, "structured_scene 缺少 content"
    candidate = {
        "subject": scene.get("subject"),
        "topic": scene.get("topic"),
        "title": scene.get("title"),
        "learning_goal": scene.get("learning_goal"),
        "sections": content.get("sections"),
        "demonstrations": content.get("demonstrations"),
        "summary": content.get("summary"),
    }
    try:
        from core.boards.knowledge_scene_spec import normalize_scene_spec

        normalize_scene_spec(candidate, goal)
    except Exception as exc:  # noqa: BLE001 - exact validator error belongs in report
        return False, f"严格场景校验失败：{exc}"
    return True, "通过生产严格校验"


def check_demo_assertion(scene: dict[str, Any], assertion: dict[str, Any]) -> tuple[bool, str]:
    demos = demonstrations(scene)
    assertion_type = assertion["type"]
    kind = assertion.get("kind")
    kind_any = assertion.get("kind_any") or ([kind] if kind else [])
    selected = [demo for demo in demos if not kind_any or demo.get("kind") in kind_any]

    if assertion_type in {"demo_text_all", "demo_text_any"}:
        text = normalize_text("\n".join(item for demo in selected for item in flatten_scalars(demo)))
        patterns = assertion.get("patterns") or []
        passed = all_patterns(patterns, text) if assertion_type.endswith("all") else any_pattern(patterns, text)
        return passed, f"{assertion_type}: {patterns}"

    if assertion_type in {"demo_field", "demo_field_regex"}:
        values = [
            value
            for demo in selected
            for value in values_at_path(demo, str(assertion.get("path") or ""))
        ]
        if assertion_type == "demo_field_regex":
            patterns = assertion.get("patterns") or []
            passed = any(any_pattern(patterns, normalize_text(value)) for value in values)
            return passed, f"{kind}.{assertion.get('path')} matches {patterns}; actual={values}"
        if "equals_normalized_any" in assertion:
            expected = {normalize_expression(value) for value in assertion["equals_normalized_any"]}
            passed = any(normalize_expression(value) in expected for value in values)
        elif "numeric_equals" in assertion:
            expected_number = float(assertion["numeric_equals"])
            tolerance = float(assertion.get("tolerance", 1e-6))
            passed = any(
                isinstance(value, (int, float))
                and not isinstance(value, bool)
                and math.isclose(float(value), expected_number, abs_tol=tolerance, rel_tol=0)
                for value in values
            )
        elif "numeric_sequence_equals" in assertion:
            expected_values = [float(value) for value in assertion["numeric_sequence_equals"]]
            tolerance = float(assertion.get("tolerance", 1e-6))
            passed = any(
                isinstance(value, list)
                and len(value) == len(expected_values)
                and all(
                    isinstance(actual, (int, float))
                    and not isinstance(actual, bool)
                    and math.isclose(float(actual), expected, abs_tol=tolerance, rel_tol=0)
                    for actual, expected in zip(value, expected_values)
                )
                for value in values
            )
        else:
            passed = False
        return passed, f"{kind}.{assertion.get('path')} actual={values}"

    if assertion_type == "force_vector":
        tolerance = float(assertion.get("tolerance", 1e-6))
        expected_magnitude = float(assertion["magnitude"])
        expected_angles = [float(value) % 360 for value in assertion.get("angle_any") or []]
        label_patterns = assertion.get("label_patterns") or []
        passed = False
        actual: list[dict[str, Any]] = []
        for demo in selected or [demo for demo in demos if demo.get("kind") == "force_diagram"]:
            for vector in values_at_path(demo, "data.vectors.*"):
                if not isinstance(vector, dict):
                    continue
                actual.append(vector)
                label_ok = not label_patterns or any_pattern(label_patterns, normalize_text(vector.get("label")))
                magnitude = vector.get("magnitude")
                angle = vector.get("angle")
                magnitude_ok = isinstance(magnitude, (int, float)) and math.isclose(
                    float(magnitude), expected_magnitude, abs_tol=tolerance, rel_tol=0
                )
                angle_ok = isinstance(angle, (int, float)) and any(
                    math.isclose(float(angle) % 360, expected, abs_tol=tolerance, rel_tol=0)
                    for expected in expected_angles
                )
                if label_ok and magnitude_ok and angle_ok:
                    passed = True
                    break
        return passed, f"force vector magnitude={expected_magnitude}, angles={expected_angles}; actual={actual}"

    if assertion_type in {"concept_edge", "concept_no_edge"}:
        matching_edges: list[str] = []
        for demo in demos:
            if demo.get("kind") != "concept_map":
                continue
            nodes = {
                str(node.get("id")): normalize_text(node.get("label"))
                for node in values_at_path(demo, "data.nodes.*")
                if isinstance(node, dict)
            }
            for edge in values_at_path(demo, "data.edges.*"):
                if not isinstance(edge, dict):
                    continue
                from_label = nodes.get(str(edge.get("from")), "")
                to_label = nodes.get(str(edge.get("to")), "")
                edge_label = normalize_text(edge.get("label"))
                if not any_pattern(assertion.get("from_patterns") or [], from_label):
                    continue
                if not any_pattern(assertion.get("to_patterns") or [], to_label):
                    continue
                edge_patterns = assertion.get("edge_patterns") or []
                if edge_patterns and not any_pattern(edge_patterns, edge_label):
                    continue
                matching_edges.append(f"{from_label}->{to_label}:{edge_label}")
        passed = bool(matching_edges)
        if assertion_type == "concept_no_edge":
            passed = not passed
        return passed, f"matching concept edges={matching_edges}"

    if assertion_type == "process_order":
        patterns = assertion.get("patterns") or []
        passed = False
        actual = ""
        for demo in demos:
            if demo.get("kind") != "process":
                continue
            actual = normalize_text("\n".join(flatten_scalars(demo.get("data", {}).get("steps") or [])))
            cursor = 0
            ordered = True
            for pattern in patterns:
                match = re.search(pattern, actual[cursor:], flags=re.IGNORECASE)
                if match is None:
                    ordered = False
                    break
                cursor += match.end()
            if ordered:
                passed = True
                break
        return passed, f"process order={patterns}; actual={actual}"

    return False, f"未知 assertion type：{assertion_type}"


def _new_check(
    group: str,
    check_id: str,
    description: str,
    passed: bool,
    points: float,
    *,
    hard: bool,
    detail: str = "",
) -> dict[str, Any]:
    return {
        "group": group,
        "id": check_id,
        "description": description,
        "passed": bool(passed),
        "hard": hard,
        "points": round(points if passed else 0.0, 4),
        "max_points": round(points, 4),
        "detail": detail,
    }


def _failed_dimension_checks(reason: str) -> list[dict[str, Any]]:
    return [
        _new_check("schema", "response", "接口返回可评分场景", False, 20, hard=True, detail=reason),
        _new_check("text", "target", "目标贴合", False, 15, hard=True, detail=reason),
        _new_check("text", "correctness", "学科正确性", False, 30, hard=True, detail=reason),
        _new_check("demo", "demonstration", "演示必要性与一致性", False, 20, hard=True, detail=reason),
        _new_check("service", "degradation", "服务与降级", False, 10, hard=True, detail=reason),
        _new_check("latency", "latency", "生成耗时", False, 5, hard=False, detail=reason),
    ]


def evaluate_result(case: dict[str, Any], http: dict[str, Any]) -> dict[str, Any]:
    scene = extract_scene(http.get("payload"))
    if scene is None:
        reason = http.get("transport_error") or http.get("parse_error") or (
            f"HTTP {http.get('status')}; body={http.get('error_body', '')[:300]}"
        )
        checks = _failed_dimension_checks(reason)
        return finish_evaluation(case, http, None, checks)

    checks: list[dict[str, Any]] = []
    schema_ok, schema_detail = strict_schema_check(scene, case["goal"])
    checks.append(_new_check(
        "schema", "strict-schema", "生产严格 Schema 校验", schema_ok, 10,
        hard=True, detail=schema_detail,
    ))

    scene_sections = sections(scene)
    section_count = len(scene_sections)
    checks.append(_new_check(
        "schema", "section-count", "正文有 3 到 5 节", 3 <= section_count <= 5, 3,
        hard=False, detail=f"actual={section_count}",
    ))
    block_count = sum(
        len(section.get("blocks") or [])
        for section in scene_sections
        if isinstance(section.get("blocks"), list)
    )
    checks.append(_new_check(
        "schema", "block-count", "正文有 8 到 12 个知识块", 8 <= block_count <= 12, 3,
        hard=False, detail=f"actual={block_count}",
    ))
    content = scene.get("content") if isinstance(scene.get("content"), dict) else {}
    summary = content.get("summary") if isinstance(content.get("summary"), list) else []
    checks.append(_new_check(
        "schema", "summary-count", "总结有 2 到 3 条", 2 <= len(summary) <= 3, 2,
        hard=False, detail=f"actual={len(summary)}",
    ))
    section_ids = [str(section.get("id")) for section in scene_sections]
    learning_path = scene.get("learning_path") if isinstance(scene.get("learning_path"), list) else []
    path_ids = [str(item.get("id")) for item in learning_path if isinstance(item, dict)]
    checks.append(_new_check(
        "schema", "learning-path", "learning_path 与正文顺序一致", path_ids == section_ids, 2,
        hard=False, detail=f"path={path_ids}, sections={section_ids}",
    ))

    text = scene_text(scene)
    scopes = scene_text_scopes(scene)
    subject = normalize_text(scene.get("subject"))
    subject_ok = any(term.lower() in subject.lower() for term in case["subject_terms"])
    checks.append(_new_check(
        "text", "subject", "学科标签正确", subject_ok, 5,
        hard=True, detail=f"actual={subject}, expected_any={case['subject_terms']}",
    ))
    target_groups = case["target_text_any"]
    target_points = 10 / len(target_groups)
    for index, patterns in enumerate(target_groups, 1):
        passed = any_pattern(patterns, text)
        checks.append(_new_check(
            "text", f"target-{index}", "正文命中目标核心概念", passed, target_points,
            hard=True, detail=f"expected_any={patterns}",
        ))

    correctness = case["correctness"]
    correctness_points = 30 / len(correctness)
    for item in correctness:
        passed, details = evaluate_correctness_item(item, text, scopes)
        checks.append(_new_check(
            "text", f"fact-{item['id']}", item["description"], passed,
            correctness_points, hard=True, detail="; ".join(details),
        ))

    policy = case["demo_policy"]
    demo_kinds = [str(demo.get("kind")) for demo in demonstrations(scene)]
    mode = policy["mode"]
    policy_ok = True
    policy_details: list[str] = [f"actual={demo_kinds}"]
    if mode == "required":
        policy_ok = bool(demo_kinds)
    elif mode == "forbidden":
        policy_ok = not demo_kinds
    required_all = policy.get("required_all") or []
    required_any = policy.get("required_any") or []
    forbidden = policy.get("forbidden") or []
    allowed = policy.get("allowed")
    policy_ok = policy_ok and all(kind in demo_kinds for kind in required_all)
    if required_any:
        policy_ok = policy_ok and any(kind in demo_kinds for kind in required_any)
    policy_ok = policy_ok and all(kind not in demo_kinds for kind in forbidden)
    if isinstance(allowed, list):
        policy_ok = policy_ok and all(kind in allowed for kind in demo_kinds)
    required_blocks = policy.get("required_block_any") or []
    if required_blocks:
        block_kinds = [
            str(block.get("kind"))
            for section in scene_sections
            for block in (section.get("blocks") or [])
            if isinstance(block, dict)
        ]
        policy_ok = policy_ok and any(kind in block_kinds for kind in required_blocks)
        policy_details.append(f"block_kinds={block_kinds}")
    checks.append(_new_check(
        "demo", "demo-policy", policy.get("learning_action") or "演示策略",
        policy_ok, 10, hard=True, detail="; ".join(policy_details),
    ))
    assertions = policy.get("assertions") or []
    if assertions:
        assertion_points = 10 / len(assertions)
        for index, assertion in enumerate(assertions, 1):
            passed, detail = check_demo_assertion(scene, assertion)
            checks.append(_new_check(
                "demo", f"demo-assertion-{index}", f"演示断言 {assertion['type']}",
                passed, assertion_points, hard=True, detail=detail,
            ))
    else:
        # A text-only case still earns the second half of the demo dimension by
        # honoring its explicit no-animation policy and required text block.
        checks.append(_new_check(
            "demo", "demo-assertion-none", "无需额外演示数据断言", policy_ok, 10,
            hard=True, detail="text-only policy",
        ))

    status_ok = 200 <= int(http.get("status") or 0) < 300
    checks.append(_new_check(
        "service", "http-success", "生成接口成功返回", status_ok, 3,
        hard=True, detail=f"HTTP {http.get('status')}",
    ))
    generation = scene.get("generation") if isinstance(scene.get("generation"), dict) else {}
    provider = str(generation.get("provider") or "")
    checks.append(_new_check(
        "service", "remote-provider", "通用题由远端工作流生成", provider == "coze", 2,
        hard=False, detail=f"provider={provider}",
    ))
    quality_status = str(generation.get("quality_status") or "")
    quality_version = str(generation.get("quality_version") or "")
    checks.append(_new_check(
        "service", "quality-approved", "服务端确定性质量门已批准",
        quality_status == "approved" and quality_version == CURRENT_QUALITY_VERSION, 3,
        hard=True,
        detail=(
            f"status={quality_status}, version={quality_version}, "
            f"expected={CURRENT_QUALITY_VERSION}"
        ),
    ))
    fallback_reason = normalize_text(generation.get("fallback_reason"))
    checks.append(_new_check(
        "service", "warning-free", "没有回退或安全丢弃警告", not fallback_reason, 2,
        hard=False, detail=fallback_reason,
    ))

    latency_ms = float(http.get("latency_ms") or 0)
    checks.append(_new_check(
        "latency", "under-300s", "冷生成不超过 300 秒", 0 < latency_ms <= 300_000, 2,
        hard=False, detail=f"{latency_ms:.2f}ms",
    ))
    checks.append(_new_check(
        "latency", "under-240s", "冷生成不超过 240 秒", 0 < latency_ms <= 240_000, 2,
        hard=False, detail=f"{latency_ms:.2f}ms",
    ))
    checks.append(_new_check(
        "latency", "under-150s", "冷生成不超过 150 秒", 0 < latency_ms <= 150_000, 1,
        hard=False, detail=f"{latency_ms:.2f}ms",
    ))
    return finish_evaluation(case, http, scene, checks)


def finish_evaluation(
    case: dict[str, Any],
    http: dict[str, Any],
    scene: dict[str, Any] | None,
    checks: list[dict[str, Any]],
) -> dict[str, Any]:
    grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for check in checks:
        grouped[check["group"]].append(check)
    points = sum(float(check["points"]) for check in checks)
    max_points = sum(float(check["max_points"]) for check in checks)
    hard_failures = [check for check in checks if check["hard"] and not check["passed"]]
    generation = scene.get("generation") if scene and isinstance(scene.get("generation"), dict) else {}
    dimension_scores = {}
    for group, items in grouped.items():
        earned = sum(float(item["points"]) for item in items)
        available = sum(float(item["max_points"]) for item in items)
        dimension_scores[group] = {
            "score": round(earned, 2),
            "max": round(available, 2),
        }
    return {
        "case_id": case["id"],
        "domain": case["domain"],
        "goal": case["goal"],
        "http_status": http.get("status"),
        "cache": http.get("cache") or "",
        "latency_ms": http.get("latency_ms"),
        "provider": generation.get("provider") or "",
        "server_quality": {
            "status": generation.get("quality_status") or "",
            "score": generation.get("quality_score"),
            "version": generation.get("quality_version") or "",
        },
        "quality": {
            "score": round(points / max_points * 100, 2) if max_points else 0.0,
            "hard_pass": not hard_failures,
            "hard_failure_count": len(hard_failures),
            "dimension_scores": dimension_scores,
        },
        "checks": dict(grouped),
        "transport_error": http.get("transport_error") or "",
        "parse_error": http.get("parse_error") or "",
        "error_body": http.get("error_body") or "",
        "scene": scene,
    }


def percentile(values: list[float], percent: float) -> float | None:
    if not values:
        return None
    ordered = sorted(values)
    index = max(0, min(len(ordered) - 1, math.ceil(percent / 100 * len(ordered)) - 1))
    return ordered[index]


def summarize(results: list[dict[str, Any]]) -> dict[str, Any]:
    scores = [float(result["quality"]["score"]) for result in results]
    latencies = [
        float(result["latency_ms"])
        for result in results
        if isinstance(result.get("latency_ms"), (int, float)) and result["latency_ms"] > 0
    ]
    by_domain: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for result in results:
        by_domain[result["domain"]].append(result)
    return {
        "attempts": len(results),
        "hard_passes": sum(bool(result["quality"]["hard_pass"]) for result in results),
        "hard_pass_rate": round(
            sum(bool(result["quality"]["hard_pass"]) for result in results) / len(results), 4
        ) if results else 0.0,
        "mean_score": round(statistics.fmean(scores), 2) if scores else 0.0,
        "minimum_score": round(min(scores), 2) if scores else 0.0,
        "latency_ms": {
            "p50": percentile(latencies, 50),
            "p95": percentile(latencies, 95),
            "max": max(latencies) if latencies else None,
        },
        "providers": dict(Counter(result.get("provider") or "none" for result in results)),
        "cache": dict(Counter(result.get("cache") or "none" for result in results)),
        "domains": {
            domain: {
                "attempts": len(items),
                "hard_passes": sum(bool(item["quality"]["hard_pass"]) for item in items),
                "mean_score": round(statistics.fmean(item["quality"]["score"] for item in items), 2),
                "minimum_score": round(min(item["quality"]["score"] for item in items), 2),
            }
            for domain, items in sorted(by_domain.items())
        },
    }


def markdown_escape(value: Any) -> str:
    return str(value if value is not None else "").replace("|", "\\|").replace("\n", " ")


def render_markdown(report: dict[str, Any]) -> str:
    summary = report["summary"]
    latency = summary["latency_ms"]
    lines = [
        "# Axiom 通用知识白板 Benchmark",
        "",
        f"- 生成时间：{report['generated_at']}",
        f"- 题目：{report['selected_case_count']}，重复：{report['repeat']}，总请求：{summary['attempts']}",
        f"- 硬门通过：{summary['hard_passes']}/{summary['attempts']} ({summary['hard_pass_rate']:.1%})",
        f"- 平均分：{summary['mean_score']:.2f}，最低分：{summary['minimum_score']:.2f}",
        f"- 延迟：p50={latency['p50']}ms，p95={latency['p95']}ms，max={latency['max']}ms",
        f"- Provider：{summary['providers']}，Cache：{summary['cache']}",
        "",
        "## 逐次结果",
        "",
        "| Case | Run | 学科 | HTTP | Cache | Provider | 延迟(ms) | 分数 | 硬门 | 服务端质量 |",
        "|---|---:|---|---:|---|---|---:|---:|---|---|",
    ]
    for result in report["results"]:
        server_quality = result["server_quality"]
        server_label = server_quality.get("status") or "-"
        if server_quality.get("score") is not None:
            server_label += f"/{server_quality['score']}"
        lines.append(
            "| {case} | {run} | {domain} | {http} | {cache} | {provider} | {latency} | {score:.2f} | {hard} | {server} |".format(
                case=markdown_escape(result["case_id"]),
                run=result["run"],
                domain=markdown_escape(result["domain"]),
                http=result["http_status"],
                cache=markdown_escape(result["cache"] or "-"),
                provider=markdown_escape(result["provider"] or "-"),
                latency=result["latency_ms"],
                score=result["quality"]["score"],
                hard="PASS" if result["quality"]["hard_pass"] else "FAIL",
                server=markdown_escape(server_label),
            )
        )

    lines.extend([
        "",
        "## 学科汇总",
        "",
        "| 学科 | 请求 | 硬门通过 | 平均分 | 最低分 |",
        "|---|---:|---:|---:|---:|",
    ])
    for domain, values in summary["domains"].items():
        lines.append(
            f"| {markdown_escape(domain)} | {values['attempts']} | {values['hard_passes']} | "
            f"{values['mean_score']:.2f} | {values['minimum_score']:.2f} |"
        )

    failures: list[str] = []
    for result in report["results"]:
        for group, checks in result["checks"].items():
            for check in checks:
                if check["passed"]:
                    continue
                failures.append(
                    f"- **{result['case_id']} / run {result['run']} / {group} / {check['id']}**："
                    f"{check['description']}。{check['detail']}"
                )
    lines.extend(["", "## 未通过检查", ""])
    lines.extend(failures or ["无。"])
    lines.extend([
        "",
        "## 判定说明",
        "",
        "- 总分：结构20、目标贴合15、正确性30、演示20、服务与降级10、耗时5。",
        "- 硬检查失败不能由其他维度高分抵消。",
        "- 本报告的文字与演示判断来自固定规则，不使用模型裁判。",
        "- Cache HIT/SHARED 的耗时不应与冷生成混为同一延迟分布。",
        "",
    ])
    return "\n".join(lines)


def rescore_saved_report(
    report_path: Path,
    cases: list[dict[str, Any]],
    output_dir: Path,
) -> tuple[dict[str, Any], Path, Path]:
    """Re-evaluate saved scenes with the current local oracle, without network I/O."""
    try:
        source_report = json.loads(report_path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise CatalogError(f"待重评分报告不存在：{report_path}") from exc
    except json.JSONDecodeError as exc:
        raise CatalogError(f"待重评分报告不是合法 JSON：{exc}") from exc
    source_results = source_report.get("results")
    if not isinstance(source_results, list):
        raise CatalogError("待重评分报告缺少 results 数组")

    by_id = {case["id"]: case for case in cases}
    rescored: list[dict[str, Any]] = []
    for source in source_results:
        if not isinstance(source, dict):
            continue
        case_id = str(source.get("case_id") or "")
        case = by_id.get(case_id)
        if case is None:
            continue
        scene = source.get("scene") if isinstance(source.get("scene"), dict) else None
        http = {
            "status": int(source.get("http_status") or (200 if scene else 0)),
            "cache": source.get("cache") or "",
            "latency_ms": source.get("latency_ms") or 0,
            "payload": scene,
            "transport_error": source.get("transport_error") or "",
            "parse_error": source.get("parse_error") or "",
            "error_body": source.get("error_body") or "",
        }
        evaluated = evaluate_result(case, http)
        evaluated["run"] = int(source.get("run") or 1)
        rescored.append(evaluated)
        print(
            f"RESCORE {case_id} run={evaluated['run']} "
            f"score={evaluated['quality']['score']:.2f} "
            f"hard={'PASS' if evaluated['quality']['hard_pass'] else 'FAIL'}"
        )
    if not rescored:
        raise CatalogError("报告中没有与所选 case 对应且可重评分的 result")

    report = {
        "benchmark_schema_version": "1.0",
        "catalog_name": source_report.get("catalog_name"),
        "generated_at": utc_now(),
        "endpoint": source_report.get("endpoint") or "",
        "transport": "offline_rescore",
        "source_report": str(report_path.resolve()),
        "selected_cases": list(dict.fromkeys(result["case_id"] for result in rescored)),
        "selected_case_count": len({result["case_id"] for result in rescored}),
        "repeat": source_report.get("repeat") or 1,
        "credential_source": "none-offline-rescore",
        "origin_configured": False,
        "summary": summarize(rescored),
        "results": rescored,
    }
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    output_dir.mkdir(parents=True, exist_ok=True)
    json_path = output_dir / f"knowledge-scene-rescore-{timestamp}.json"
    markdown_path = output_dir / f"knowledge-scene-rescore-{timestamp}.md"
    json_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    markdown_path.write_text(render_markdown(report), encoding="utf-8")
    return report, json_path, markdown_path


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Axiom 通用知识白板 20 题确定性 benchmark（默认离线）",
    )
    parser.add_argument(
        "--base-url",
        default="http://127.0.0.1:5010",
        help="服务根 URL，或完整 generate endpoint；默认不会联网",
    )
    parser.add_argument(
        "--case",
        action="append",
        help="只运行指定 case，可重复或用逗号分隔，例如 --case M01,M02",
    )
    parser.add_argument("--repeat", type=int, default=1, help="每题顺序重复次数，默认 1，最大 10")
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help=f"JSON/Markdown 报告目录，默认 {DEFAULT_OUTPUT_DIR}",
    )
    parser.add_argument(
        "--origin",
        default=os.environ.get("FIRECUP_BENCHMARK_ORIGIN", ""),
        help="可选 Origin；也可用 FIRECUP_BENCHMARK_ORIGIN",
    )
    parser.add_argument("--timeout", type=float, default=330.0, help="单请求超时秒数，默认 330")
    parser.add_argument(
        "--validate-cases",
        action="store_true",
        help="仅/先校验本地 20 题及正则，不请求网络",
    )
    parser.add_argument(
        "--rescore-report",
        type=Path,
        help="用当前本地 oracle 重评分已有 JSON 报告中的 scene；绝不请求网络",
    )
    parser.add_argument(
        "--run-live",
        action="store_true",
        help="明确授权向 generate API 发请求；不加此参数绝不联网",
    )
    parser.add_argument(
        "--legacy-sync",
        action="store_true",
        help="使用旧同步 generate endpoint；默认使用可轮询的异步 jobs API",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    try:
        catalog = load_catalog()
        cases = validate_catalog(catalog)
        selected = select_cases(cases, args.case)
        if not 1 <= args.repeat <= 10:
            raise CatalogError("--repeat 必须在 1 到 10 之间")
        if not 1 <= args.timeout <= 600:
            raise CatalogError("--timeout 必须在 1 到 600 秒之间")
        if args.rescore_report and args.run_live:
            raise CatalogError("--rescore-report 与 --run-live 不能同时使用")
    except CatalogError as exc:
        print(f"CASE_CATALOG_INVALID\n{exc}", file=sys.stderr)
        return 2

    print(
        f"CASE_CATALOG_OK: {len(cases)} cases; selected={','.join(case['id'] for case in selected)}"
    )
    if args.validate_cases:
        oracle_items = [
            item
            for case in cases
            for item in case["correctness"]
            if item.get("oracle_examples")
        ]
        accepted = sum(
            len(item["oracle_examples"].get("accept") or [])
            for item in oracle_items
        )
        rejected = sum(
            len(item["oracle_examples"].get("reject") or [])
            for item in oracle_items
        )
        print(
            f"ORACLE_EXAMPLES_OK: checks={len(oracle_items)}; "
            f"accept={accepted}; reject={rejected}; total={accepted + rejected}"
        )
    if args.rescore_report:
        try:
            report, json_path, markdown_path = rescore_saved_report(
                args.rescore_report,
                selected,
                args.output_dir,
            )
        except CatalogError as exc:
            print(f"REPORT_RESCORE_INVALID\n{exc}", file=sys.stderr)
            return 2
        print(f"REPORT_JSON: {json_path}")
        print(f"REPORT_MARKDOWN: {markdown_path}")
        return 0 if all(
            result["quality"]["hard_pass"] for result in report["results"]
        ) else 1
    if not args.run_live:
        print("DRY_RUN: 未提供 --run-live；未发送网络请求，也不会消耗扣子积分。")
        return 0

    try:
        endpoint = api_url(
            args.base_url,
            GENERATE_PATH if args.legacy_sync else JOBS_PATH,
        )
    except CatalogError as exc:
        print(str(exc), file=sys.stderr)
        return 2

    key = os.environ.get("FIRECUP_BENCHMARK_KEY", "").strip()
    origin = args.origin.strip()
    print(
        f"LIVE_RUN: endpoint={endpoint}; cases={len(selected)}; repeat={args.repeat}; "
        f"key={'configured' if key else 'not-configured'}; origin={'configured' if origin else 'not-configured'}"
    )
    results: list[dict[str, Any]] = []
    for case in selected:
        for run_index in range(1, args.repeat + 1):
            print(f"RUN {case['id']} {run_index}/{args.repeat} ...", flush=True)
            if args.legacy_sync:
                http = post_case(
                    endpoint,
                    case,
                    timeout_seconds=args.timeout,
                    key=key,
                    origin=origin,
                )
            else:
                http = post_case_async(
                    args.base_url,
                    case,
                    timeout_seconds=args.timeout,
                    key=key,
                    origin=origin,
                )
            evaluated = evaluate_result(case, http)
            evaluated["run"] = run_index
            results.append(evaluated)
            print(
                f"DONE {case['id']} run={run_index} http={evaluated['http_status']} "
                f"cache={evaluated['cache'] or '-'} latency={evaluated['latency_ms']}ms "
                f"score={evaluated['quality']['score']:.2f} "
                f"hard={'PASS' if evaluated['quality']['hard_pass'] else 'FAIL'}",
                flush=True,
            )

    report = {
        "benchmark_schema_version": "1.0",
        "catalog_name": catalog.get("name"),
        "generated_at": utc_now(),
        "endpoint": endpoint,
        "transport": "legacy_sync" if args.legacy_sync else "async_jobs",
        "selected_cases": [case["id"] for case in selected],
        "selected_case_count": len(selected),
        "repeat": args.repeat,
        "credential_source": "FIRECUP_BENCHMARK_KEY" if key else "none",
        "origin_configured": bool(origin),
        "summary": summarize(results),
        "results": results,
    }
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    args.output_dir.mkdir(parents=True, exist_ok=True)
    json_path = args.output_dir / f"knowledge-scene-benchmark-{timestamp}.json"
    markdown_path = args.output_dir / f"knowledge-scene-benchmark-{timestamp}.md"
    json_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    markdown_path.write_text(render_markdown(report), encoding="utf-8")
    print(f"REPORT_JSON: {json_path}")
    print(f"REPORT_MARKDOWN: {markdown_path}")
    return 0 if all(result["quality"]["hard_pass"] for result in results) else 1


if __name__ == "__main__":
    raise SystemExit(main())
