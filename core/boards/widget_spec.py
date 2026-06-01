"""Learning Board v0.1 — Widget JSON Schema 定义与安全验证器。

四类 widget 的输入、输出、事件类型的完整契约。
"""
from __future__ import annotations

import json
import re
from typing import Any

# ---------------------------------------------------------------------------
# 安全表达式语法 (function_visualizer 专用)
# ---------------------------------------------------------------------------
_SAFE_EXPR_RE = re.compile(
    r'^[\s\d\*\-\+/^\(\)\.a-zA-Z,<>=!_|&%]+$'
)

_SAFE_FUNCTIONS = frozenset({
    "sin", "cos", "tan", "asin", "acos", "atan", "atan2",
    "sinh", "cosh", "tanh",
    "sqrt", "abs", "exp", "log", "log2", "log10",
    "floor", "ceil", "round", "sign",
    "min", "max", "clamp", "pow",
    "pi", "e",
})

# 危险模式黑名单
_FORBIDDEN_PATTERNS = [
    r'\bimport\b', r'\bexec\b', r'\beval\b', r'\bopen\b',
    r'\b__', r'\bos\.', r'\bsys\.', r'\bsubprocess\b',
    r'\(.*\(.*\(',  # 深度嵌套调用
]

# ---------------------------------------------------------------------------
# Widget type enum
# ---------------------------------------------------------------------------
ALLOWED_WIDGET_TYPES = frozenset({
    "concept_map",
    "function_visualizer",
    "quiz_card",
    "example_card",
})

ALLOWED_SIZE_FAMILIES = frozenset({"S", "M", "L", "XL"})

ALLOWED_EVENT_TYPES: dict[str, frozenset[str]] = {
    "concept_map": frozenset({
        "node_opened", "node_focused", "path_highlighted",
        "concept_marked_done",
    }),
    "function_visualizer": frozenset({
        "slider_changed", "graph_reset", "point_hovered",
        "question_answered", "completed",
    }),
    "quiz_card": frozenset({
        "quiz_started", "answer_changed", "hint_opened",
        "answer_submitted", "retry_requested",
    }),
    "example_card": frozenset({
        "step_revealed", "self_try_started", "variant_requested",
        "bookmark_review", "completed",
    }),
}

ALLOWED_SECURITY_MODES = frozenset({"pure_client", "trusted_renderer"})

ALLOWED_WRITEBACK_TARGETS = frozenset({"mastery", "review", "task", "memory", "lifeline"})


# ---------------------------------------------------------------------------
# 验证错误类
# ---------------------------------------------------------------------------
class WidgetValidationError(ValueError):
    def __init__(self, message: str, widget_id: str = "", field: str = ""):
        self.widget_id = widget_id
        self.field = field
        super().__init__(f"[{widget_id or '?'}]{' ' + field + ': ' if field else ''}{message}")


# ---------------------------------------------------------------------------
# Widget spec 通用字段验证
# ---------------------------------------------------------------------------
_REQUIRED_COMMON_FIELDS = {"type", "title"}


def _validate_common(widget: dict[str, Any], widget_id: str) -> None:
    for field in _REQUIRED_COMMON_FIELDS:
        if field not in widget:
            raise WidgetValidationError(f"缺少必填字段 {field}", widget_id, field)

    wtype = widget.get("type")
    if wtype not in ALLOWED_WIDGET_TYPES:
        raise WidgetValidationError(
            f"不允许的 widget 类型: {wtype}", widget_id, "type"
        )

    spec_version = widget.get("spec_version", "1.0.0")
    if not isinstance(spec_version, str):
        raise WidgetValidationError("spec_version 必须是字符串", widget_id, "spec_version")

    title = widget.get("title", "")
    if not isinstance(title, str) or not title.strip():
        raise WidgetValidationError("title 不能为空", widget_id, "title")

    # 禁止 HTML
    title_str = str(title)
    if "<" in title_str or ">" in title_str:
        raise WidgetValidationError("title 不允许包含 HTML", widget_id, "title")

    security = widget.get("security", "pure_client")
    if security not in ALLOWED_SECURITY_MODES:
        raise WidgetValidationError(
            f"security 必须是 {ALLOWED_SECURITY_MODES}", widget_id, "security"
        )

    writeback = widget.get("writeback", [])
    if isinstance(writeback, list):
        for target in writeback:
            if target not in ALLOWED_WRITEBACK_TARGETS:
                raise WidgetValidationError(
                    f"writeback 目标不允许: {target}", widget_id, "writeback"
                )


# ---------------------------------------------------------------------------
# concept_map spec
# ---------------------------------------------------------------------------
_CONCEPT_MAP_SCHEMA = {
    "type": "object",
    "required": ["nodes", "edges"],
    "properties": {
        "nodes": {
            "type": "array",
            "minItems": 1,
            "items": {
                "type": "object",
                "required": ["id", "label"],
                "properties": {
                    "id": {"type": "string"},
                    "label": {"type": "string"},
                    "detail": {"type": "string"},
                },
            },
        },
        "edges": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["from", "to", "relation"],
                "properties": {
                    "from": {"type": "string"},
                    "to": {"type": "string"},
                    "relation": {
                        "type": "string",
                        "enum": ["prerequisite", "contains", "related", "derived_from"],
                    },
                },
            },
        },
        "focus": {"type": "string"},
    },
}


def _validate_concept_map(widget: dict[str, Any], widget_id: str) -> list[str]:
    issues: list[str] = []
    inp = widget.get("input", {})
    nodes = inp.get("nodes", [])
    eds = inp.get("edges", [])

    if not isinstance(nodes, list) or len(nodes) == 0:
        issues.append("concept_map input.nodes 必须是非空数组")

    node_ids = set()
    for i, node in enumerate(nodes):
        if not isinstance(node, dict):
            issues.append(f"input.nodes[{i}] 必须是对象")
            continue
        nid = node.get("id")
        if not nid or not isinstance(nid, str):
            issues.append(f"input.nodes[{i}].id 必须是非空字符串")
        elif nid in node_ids:
            issues.append(f"节点 ID 重复: {nid}")
        else:
            node_ids.add(nid)
        label = node.get("label")
        if not label or not isinstance(label, str):
            issues.append(f"input.nodes[{i}].label 必须是非空字符串")

    if not isinstance(eds, list):
        issues.append("input.edges 必须是数组")
    else:
        for j, edge in enumerate(eds):
            if not isinstance(edge, dict):
                issues.append(f"input.edges[{j}] 必须是对象")
                continue
            for key in ("from", "to"):
                val = edge.get(key)
                if val and val not in node_ids:
                    issues.append(f"input.edges[{j}].{key}='{val}' 引用了不存在的节点")

    state = widget.get("state", {})
    if state:
        sel = state.get("selected_node")
        if sel and sel not in node_ids:
            issues.append(f"state.selected_node='{sel}' 引用了不存在的节点")

    return issues


# ---------------------------------------------------------------------------
# function_visualizer spec
# ---------------------------------------------------------------------------
def _validate_safe_expression(expr: str) -> bool:
    """验证表达式是否在安全 DSL 内。"""
    if not expr or not isinstance(expr, str):
        return False
    if not _SAFE_EXPR_RE.match(expr):
        return False
    for pattern in _FORBIDDEN_PATTERNS:
        if re.search(pattern, expr):
            return False
    tokens = re.findall(r'[a-zA-Z_][a-zA-Z0-9_]*', expr)
    for token in tokens:
        if token in _SAFE_FUNCTIONS:
            continue
        # 变量名可以是 x 或用户定义的参数名
    return True


def _validate_function_visualizer(widget: dict[str, Any], widget_id: str) -> list[str]:
    issues: list[str] = []
    inp = widget.get("input", {})

    expr = inp.get("expression", "")
    if not expr or not isinstance(expr, str):
        issues.append("function_visualizer input.expression 不能为空")
    elif not _validate_safe_expression(expr):
        issues.append("function_visualizer input.expression 包含不安全的语法")

    params = inp.get("parameters", [])
    param_names = {"x"}
    if isinstance(params, list):
        for pi, param in enumerate(params):
            if not isinstance(param, dict):
                issues.append(f"input.parameters[{pi}] 必须是对象")
                continue
            pname = param.get("name")
            if not pname or not isinstance(pname, str):
                issues.append(f"input.parameters[{pi}].name 缺失")
            else:
                param_names.add(pname)

    domain = inp.get("domain", {})
    if not isinstance(domain, dict):
        issues.append("input.domain 必须是对象")

    prompts = inp.get("prompts", [])
    if not isinstance(prompts, list) or len(prompts) == 0:
        issues.append("function_visualizer 必须有至少一个 question prompt")

    return issues


# ---------------------------------------------------------------------------
# quiz_card spec
# ---------------------------------------------------------------------------
def _validate_quiz_card(widget: dict[str, Any], widget_id: str) -> list[str]:
    issues: list[str] = []
    inp = widget.get("input", {})

    items = inp.get("items", [])
    if not isinstance(items, list) or len(items) == 0:
        issues.append("quiz_card input.items 必须是非空数组")

    allowed_kinds = {"single_choice", "multi_choice", "text_input", "true_false"}
    for qi, item in enumerate(items or []):
        if not isinstance(item, dict):
            issues.append(f"input.items[{qi}] 必须是对象")
            continue
        if not item.get("id"):
            issues.append(f"input.items[{qi}].id 缺失")
        kind = item.get("kind", "")
        if kind not in allowed_kinds:
            issues.append(f"input.items[{qi}].kind='{kind}' 不在允许范围内")
        if not item.get("prompt"):
            issues.append(f"input.items[{qi}].prompt 不能为空")
        concept_refs = item.get("concept_refs", [])
        if not isinstance(concept_refs, list) or len(concept_refs) == 0:
            issues.append(f"input.items[{qi}].concept_refs 不能为空，quiz 必须映射到概念")

    scoring = inp.get("scoring", {})
    if scoring.get("mode") != "deterministic":
        issues.append("quiz_card scoring.mode 必须是 deterministic")

    return issues


# ---------------------------------------------------------------------------
# example_card spec
# ---------------------------------------------------------------------------
def _validate_example_card(widget: dict[str, Any], widget_id: str) -> list[str]:
    issues: list[str] = []
    inp = widget.get("input", {})

    if not inp.get("problem"):
        issues.append("example_card input.problem 不能为空")

    steps = inp.get("steps", [])
    if not isinstance(steps, list) or len(steps) == 0:
        issues.append("example_card input.steps 必须是非空数组")

    errors = inp.get("common_errors", [])
    if not isinstance(errors, list) or len(errors) == 0:
        issues.append("example_card input.common_errors 不能为空，必须列出常见错因")

    return issues


# ---------------------------------------------------------------------------
# 聚合验证入口
# ---------------------------------------------------------------------------
_WIDGET_VALIDATORS = {
    "concept_map": _validate_concept_map,
    "function_visualizer": _validate_function_visualizer,
    "quiz_card": _validate_quiz_card,
    "example_card": _validate_example_card,
}


def validate_widget(widget: dict[str, Any], widget_id: str = "") -> list[str]:
    """验证单个 widget spec，返回问题列表。空列表表示通过。"""
    issues: list[str] = []

    if not isinstance(widget, dict):
        return ["widget 必须是 JSON 对象"]

    wid = widget.get("id", widget_id) or widget_id
    try:
        _validate_common(widget, wid)
    except WidgetValidationError as exc:
        issues.append(str(exc))

    wtype = widget.get("type", "")
    if wtype not in ALLOWED_WIDGET_TYPES:
        issues.append(f"未知 widget 类型: {wtype}")
        return issues

    # 禁止 HTML/script
    spec_str = json.dumps(widget, ensure_ascii=False)
    if re.search(r'<script|<iframe|javascript:|on\w+\s*=', spec_str, re.IGNORECASE):
        issues.append("widget spec 包含不安全的 HTML/脚本")

    validator = _WIDGET_VALIDATORS.get(wtype)
    if validator:
        issues.extend(validator(widget, wid))

    return issues


def validate_board_widgets(widgets: list[dict[str, Any]]) -> dict[str, list[str]]:
    """验证一批 widget，返回 {widget_id: issues}。"""
    result: dict[str, list[str]] = {}
    for i, widget in enumerate(widgets):
        wid = widget.get("id", f"widget_{i}")
        issues = validate_widget(widget, wid)
        if issues:
            result[wid] = issues
    return result


def validate_event(widget_type: str, event_type: str) -> bool:
    """检查事件类型是否对该 widget 合法。"""
    allowed = ALLOWED_EVENT_TYPES.get(widget_type)
    return allowed is not None and event_type in allowed
