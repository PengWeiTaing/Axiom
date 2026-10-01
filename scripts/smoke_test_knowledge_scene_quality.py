"""Deterministic regressions for the teaching-quality gate."""
from __future__ import annotations

import copy
import math
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from core.boards.knowledge_scene import CozeWorkflowError, _build_structured_manifest  # noqa: E402
from core.boards.knowledge_scene_fixtures import choose_offline_fixture  # noqa: E402
from core.boards.knowledge_scene_quality import (  # noqa: E402
    audit_scene_quality,
    parse_explicit_relations,
    parse_simple_integral,
    parse_simple_integral_source,
    simple_expression_plot_range,
)
from core.boards.knowledge_scene_spec import (  # noqa: E402
    SceneValidationError,
    normalize_scene_spec,
)


def normalized_fixture(goal: str):
    fixture_selector = "riemann-sum-fixture" if "黎曼和" in goal else goal
    candidate = choose_offline_fixture(fixture_selector)
    assert candidate is not None, goal
    return normalize_scene_spec(candidate, goal)


def check_checked_in_fixtures_pass() -> None:
    goals = (
        "解释贝叶斯公式",
        "解释牛顿第二定律",
        "解释简谐运动",
        "解释导数",
        "解释电磁感应",
        "用黎曼和理解曲线下面积",
    )
    for goal in goals:
        report = audit_scene_quality(normalized_fixture(goal), goal=goal)
        assert report["passed"], (goal, report)


def check_topic_mismatch_and_shallow_content_fail() -> None:
    newton = normalized_fixture("解释牛顿第二定律")
    mismatch = audit_scene_quality(
        newton,
        goal="解释光合作用光反应如何产生 ATP 和 NADPH",
    )
    assert not mismatch["passed"]
    assert "topic_mismatch" in {
        issue["code"] for issue in mismatch["fatal_issues"]
    }

    shared_generic_word = audit_scene_quality(
        newton,
        goal="解释欧姆定律中电压、电流与电阻的关系",
    )
    assert not shared_generic_word["passed"]
    assert "topic_anchor_missing" in {
        issue["code"] for issue in shared_generic_word["fatal_issues"]
    }

    shallow = copy.deepcopy(newton)
    for section in shallow["sections"]:
        section["blocks"] = [{"kind": "paragraph", "text": "简短说明。"}]
    shallow_report = audit_scene_quality(
        shallow,
        goal="解释牛顿第二定律",
    )
    assert "content_too_shallow" in {
        issue["code"] for issue in shallow_report["fatal_issues"]
    }

    missing_numbers = audit_scene_quality(
        newton,
        goal="质量为137千克的物体受到29牛和83牛两个力，求加速度",
    )
    assert "numeric_conditions_missing" in {
        issue["code"] for issue in missing_numbers["fatal_issues"]
    }

    unit_attached_numbers = audit_scene_quality(
        newton,
        goal="已知振幅137m、角频率283rad/s，求简谐运动的最大速度",
    )
    assert "numeric_conditions_missing" in {
        issue["code"] for issue in unit_attached_numbers["fatal_issues"]
    }, "numbers immediately followed by physical units must remain conditions"

    ungrounded_source = audit_scene_quality(
        newton,
        goal="解释牛顿第二定律",
        source_text="叶绿体类囊体膜上的光系统吸收光能并建立质子梯度。",
    )
    assert "source_not_grounded" in {
        issue["code"] for issue in ungrounded_source["fatal_issues"]
    }

    presentation_only = audit_scene_quality(
        normalized_fixture("解释简谐运动"),
        goal="解释简谐运动",
        source_text="不要把普通代数整理单列成推导步骤。",
    )
    assert presentation_only["passed"], presentation_only
    assert presentation_only["metrics"]["source_grounding_required"] is False

    named_fact_inside_directive = audit_scene_quality(
        newton,
        goal="解释牛顿第二定律",
        source_text="请勿省略叶绿体类囊体膜上的光系统和质子梯度。",
    )
    assert "source_not_grounded" in {
        issue["code"] for issue in named_fact_inside_directive["fatal_issues"]
    }


def check_visual_and_derivation_obligations() -> None:
    derivative = normalized_fixture("解释导数")
    derivative["demonstrations"] = []
    no_visual = audit_scene_quality(
        derivative,
        goal="用动画展示割线如何逼近切线并得到导数",
    )
    codes = {issue["code"] for issue in no_visual["fatal_issues"]}
    assert "missing_demonstration" in codes
    assert "incompatible_demonstration" in codes

    no_derivation = copy.deepcopy(derivative)
    for section in no_derivation["sections"]:
        section["blocks"] = [
            block for block in section["blocks"]
            if block["kind"] != "derivation"
        ] or [{"kind": "paragraph", "text": "导数描述函数在一点附近的变化率。"}]
    derivation_report = audit_scene_quality(
        no_derivation,
        goal="推导函数 x^2 的导数公式",
    )
    assert "missing_derivation" in {
        issue["code"] for issue in derivation_report["fatal_issues"]
    }

    static_only = normalized_fixture("解释牛顿第二定律")
    static_only["demonstrations"] = [
        demo for demo in static_only["demonstrations"]
        if demo["kind"] == "function_plot"
    ]
    parameter_report = audit_scene_quality(
        static_only,
        goal="拖动时间参数观察物体运动如何随时间变化",
    )
    assert "missing_parameter_driver" in {
        issue["code"] for issue in parameter_report["fatal_issues"]
    }


def check_explicit_integral_is_cross_validated() -> None:
    goal = "用黎曼和解释 ∫_0^π sin(x)dx"
    parsed = parse_simple_integral(goal)
    assert parsed is not None
    assert math.isclose(parsed[1], 0.0)
    assert math.isclose(parsed[2], math.pi)

    unicode_goal = "用黎曼和解释 ∫₀^π sin(x)dx"
    unicode_parsed = parse_simple_integral(unicode_goal)
    assert unicode_parsed is not None
    assert math.isclose(unicode_parsed[1], 0.0)
    assert math.isclose(unicode_parsed[2], math.pi)
    source = parse_simple_integral_source(unicode_goal)
    assert source is not None and source[0] == "sin(x)"
    plot_range = simple_expression_plot_range(*source)
    assert plot_range is not None
    assert plot_range[0] < 0 < 1 < plot_range[1]

    wrong = normalized_fixture("riemann-sum-fixture")
    wrong_demo = wrong["demonstrations"][0]
    wrong_demo["data"].update({
        "expression": "x^2",
        "domain": [0.0, 2.0],
        "range": [0.0, 4.4],
    })
    wrong_report = audit_scene_quality(wrong, goal=goal)
    assert not wrong_report["passed"]
    assert "integral_demo_mismatch" in {
        issue["code"] for issue in wrong_report["fatal_issues"]
    }

    correct = normalized_fixture("riemann-sum-fixture")
    correct_demo = correct["demonstrations"][0]
    correct_demo["data"].update({
        "expression": "sin(x)",
        "domain": [0.0, math.pi],
        "range": [0.0, 1.1],
    })
    correct_report = audit_scene_quality(correct, goal=goal)
    assert correct_report["passed"], correct_report

    candidate = choose_offline_fixture("riemann-sum-fixture")
    assert candidate is not None
    candidate["demonstrations"][0]["data"].update({
        "expression": "x^2",
        "domain": [0, 2],
        "range": [0, 4.4],
    })
    try:
        _build_structured_manifest(candidate, goal=goal, provider="coze")
    except CozeWorkflowError as exc:
        assert "质量门" in str(exc)
    else:  # pragma: no cover - explicit safety assertion
        raise AssertionError("mismatched integral scene must be rejected")


def _relation_scene(*, wrong: bool = False) -> dict:
    candidate = {
        "subject": "分子生物学",
        "topic": "中心法则中的信息传递",
        "title": "复制、转录与翻译",
        "learning_goal": "区分复制并理解基因表达路线",
        "sections": [
            {
                "id": "replication",
                "heading": "复制不属于基因表达主线",
                "blocks": [{
                    "kind": "paragraph",
                    "text": "DNA 复制把一条 DNA 模板变成新的 DNA 分子，用于细胞分裂前完整保存并传递遗传信息。复制的产物仍是 DNA，它不产生 RNA 或蛋白质，因此不能把复制列进基因表达中的转录—翻译主线。",
                }],
            },
            {
                "id": "transcription",
                "heading": "转录把 DNA 信息交给 RNA",
                "blocks": [{
                    "kind": "paragraph",
                    "text": "转录由 RNA 聚合酶读取 DNA 模板链并合成互补 RNA，把基因中的核苷酸信息转移到可以被核糖体读取的分子上。因此基因表达的第一段方向是 DNA→RNA，信息来源和产物不能倒置。",
                }],
            },
            {
                "id": "translation",
                "heading": "翻译把 RNA 信息变成蛋白质",
                "blocks": [{
                    "kind": "paragraph",
                    "text": "翻译发生在核糖体上：核糖体按顺序读取 RNA 上的密码子，转运 RNA 携带相应氨基酸并形成多肽，随后折叠成蛋白质。表达主线的第二段是 RNA→蛋白质，而不是蛋白质反向生成 RNA。",
                }],
            },
        ],
        "demonstrations": [{
            "id": "central-dogma-map",
            "kind": "concept_map",
            "title": "中心法则方向",
            "anchor_section_id": "transcription",
            "side": "right",
            "semantic_ids": [],
            "data": {
                "nodes": [
                    {"id": "dna", "label": "DNA"},
                    {"id": "rna", "label": "RNA"},
                    {"id": "protein", "label": "蛋白质"},
                ],
                "edges": (
                    [
                        {"from": "rna", "to": "dna"},
                        {"from": "protein", "to": "rna"},
                    ]
                    if wrong
                    else [
                        {"from": "dna", "to": "rna"},
                        {"from": "rna", "to": "protein"},
                    ]
                ),
            },
        }],
        "summary": [
            "复制保存 DNA 信息，但不属于基因表达步骤。",
            "基因表达沿 DNA→RNA→蛋白质单向推进。",
        ],
    }
    return normalize_scene_spec(candidate, "中心法则关系测试")


def check_explicit_relation_maps_are_cross_validated_and_repaired() -> None:
    biology_goal = "重点说明基因表达的 DNA→RNA→蛋白质路线"
    relations = parse_explicit_relations(biology_goal)
    assert relations == (("DNA", "RNA", None), ("RNA", "蛋白质", None))
    assert parse_explicit_relations("用 h→0 解释导数极限") == ()
    assert parse_explicit_relations("观察 n→∞ 时黎曼和的变化") == ()

    correct = _relation_scene()
    correct_report = audit_scene_quality(correct, goal=biology_goal)
    assert correct_report["passed"], correct_report

    wrong = _relation_scene(wrong=True)
    wrong_report = audit_scene_quality(wrong, goal=biology_goal)
    assert "explicit_relation_demo_mismatch" in {
        issue["code"] for issue in wrong_report["fatal_issues"]
    }

    repaired = _build_structured_manifest(
        wrong,
        goal=biology_goal,
        provider="coze",
    )
    repaired_maps = [
        demo for demo in repaired["content"]["demonstrations"]
        if demo["kind"] == "concept_map"
    ]
    assert len(repaired_maps) == 1
    assert repaired_maps[0]["id"].startswith("auto-relations-")
    repaired_edges = repaired_maps[0]["data"]["edges"]
    repaired_labels = {
        node["id"]: node["label"] for node in repaired_maps[0]["data"]["nodes"]
    }
    assert [
        (repaired_labels[edge["from"]], repaired_labels[edge["to"]])
        for edge in repaired_edges
    ] == [("DNA", "RNA"), ("RNA", "蛋白质")]

    graph_goal = "用有向图 A→B=2、A→C=1、B→C=-3 解释算法失败"
    assert parse_explicit_relations(graph_goal) == (
        ("A", "B", 2.0), ("A", "C", 1.0), ("B", "C", -3.0),
    )
    graph_scene = copy.deepcopy(correct)
    graph_scene["demonstrations"][0]["data"] = {
        "nodes": [
            {"id": "a", "label": "A"},
            {"id": "b", "label": "B"},
            {"id": "c", "label": "C"},
        ],
        "edges": [
            {"from": "a", "to": "b", "label": "-3"},
            {"from": "c", "to": "a", "label": "2"},
        ],
    }
    graph_report = audit_scene_quality(graph_scene, goal=graph_goal)
    assert "explicit_relation_demo_mismatch" in {
        issue["code"] for issue in graph_report["fatal_issues"]
    }


def check_renderer_preflight_rejects_empty_visuals() -> None:
    newton = choose_offline_fixture("解释牛顿第二定律")
    assert newton is not None
    function_plot = next(
        demo for demo in newton["demonstrations"]
        if demo["kind"] == "function_plot"
    )
    function_plot["data"]["series"][0]["expression"] = "1/(x-x)"
    try:
        normalize_scene_spec(newton, "解释牛顿第二定律")
    except SceneValidationError as exc:
        assert "有限采样点" in str(exc)
    else:
        raise AssertionError("an all-undefined function plot must be rejected")

    missing_domain = choose_offline_fixture("解释牛顿第二定律")
    assert missing_domain is not None
    missing_plot = next(
        demo for demo in missing_domain["demonstrations"]
        if demo["kind"] == "function_plot"
    )
    del missing_plot["data"]["domain"]
    try:
        normalize_scene_spec(missing_domain, "解释牛顿第二定律")
    except SceneValidationError as exc:
        assert "必须由知识场景明确提供" in str(exc)
    else:
        raise AssertionError("a model-authored plot must not invent its domain")

    unused_parameter = choose_offline_fixture("解释牛顿第二定律")
    assert unused_parameter is not None
    parameter_plot = next(
        demo for demo in unused_parameter["demonstrations"]
        if demo["kind"] == "function_plot"
    )
    parameter_plot["data"]["parameter"] = {
        "name": "a",
        "min": 0,
        "max": 2,
        "initial": 1,
    }
    try:
        normalize_scene_spec(unused_parameter, "解释牛顿第二定律")
    except SceneValidationError as exc:
        assert "未被任何曲线使用" in str(exc)
    else:
        raise AssertionError("an ornamental plot parameter must be rejected")

    unchanged_parameter = choose_offline_fixture("解释牛顿第二定律")
    assert unchanged_parameter is not None
    unchanged_plot = next(
        demo for demo in unchanged_parameter["demonstrations"]
        if demo["kind"] == "function_plot"
    )
    unchanged_plot["data"]["series"][0]["expression"] = "x+a-a"
    unchanged_plot["data"]["parameter"] = {
        "name": "a",
        "min": 0,
        "max": 2,
        "initial": 1,
    }
    try:
        normalize_scene_spec(unchanged_parameter, "解释牛顿第二定律")
    except SceneValidationError as exc:
        assert "没有实际改变任何曲线" in str(exc)
    else:
        raise AssertionError("a syntactically referenced but inert parameter must be rejected")

    invalid_endpoint = choose_offline_fixture("解释牛顿第二定律")
    assert invalid_endpoint is not None
    endpoint_plot = next(
        demo for demo in invalid_endpoint["demonstrations"]
        if demo["kind"] == "function_plot"
    )
    endpoint_plot["data"]["series"][0]["expression"] = "x+sqrt(a)"
    endpoint_plot["data"]["parameter"] = {
        "name": "a",
        "min": -1,
        "max": 1,
        "initial": 1,
    }
    try:
        normalize_scene_spec(invalid_endpoint, "解释牛顿第二定律")
    except SceneValidationError as exc:
        assert "有限采样点" in str(exc)
    else:
        raise AssertionError("a plot that fails at a slider endpoint must be rejected")

    riemann = choose_offline_fixture("riemann-sum-fixture")
    assert riemann is not None
    riemann["demonstrations"][0]["data"].update({
        "expression": "1/x",
        "domain": [-1, 1],
        "range": [-10, 10],
    })
    try:
        normalize_scene_spec(riemann, "riemann-sum-fixture")
    except SceneValidationError as exc:
        assert "积分区间" in str(exc)
    else:
        raise AssertionError("a singular Riemann demo must be rejected")

    off_grid_singularity = choose_offline_fixture("riemann-sum-fixture")
    assert off_grid_singularity is not None
    off_grid_singularity["demonstrations"][0]["data"].update({
        "expression": "1/(x-0.12345)",
        "domain": [0, 1],
        "range": [-100, 100],
    })
    try:
        normalize_scene_spec(off_grid_singularity, "riemann-sum-fixture")
    except SceneValidationError as exc:
        assert "奇点" in str(exc) or "不连续" in str(exc)
    else:
        raise AssertionError("an off-grid integral singularity must be rejected")

    induction = choose_offline_fixture("解释电磁感应")
    assert induction is not None
    linked = next(
        demo for demo in induction["demonstrations"]
        if demo["kind"] == "linked_lab"
    )
    linked["data"]["curves"] = []
    linked["data"]["vectors"] = []
    try:
        normalize_scene_spec(induction, "解释电磁感应")
    except SceneValidationError as exc:
        assert "不能退化为滑杆加数字" in str(exc)
    else:
        raise AssertionError("readout-only linked_lab must be rejected")

    inert_lab = choose_offline_fixture("解释电磁感应")
    assert inert_lab is not None
    inert_linked = next(
        demo for demo in inert_lab["demonstrations"]
        if demo["kind"] == "linked_lab"
    )
    inert_linked["data"]["readouts"][0]["expression"] = "b-b"
    try:
        normalize_scene_spec(inert_lab, "解释电磁感应")
    except SceneValidationError as exc:
        assert "readouts" in str(exc) and "没有实际变化" in str(exc)
    else:
        raise AssertionError("linked_lab needs a readout that actually changes")

    empty_map = _relation_scene()
    empty_map["demonstrations"][0]["data"]["edges"] = []
    try:
        normalize_scene_spec(empty_map, "解释 DNA→RNA→蛋白质关系")
    except SceneValidationError as exc:
        assert "必须有 1 到 14 条" in str(exc)
    else:
        raise AssertionError("concept_map without a relation must be rejected")

    disconnected_map = _relation_scene()
    disconnected_map["demonstrations"][0]["data"]["nodes"].append({
        "id": "isolated",
        "label": "孤立节点",
    })
    try:
        normalize_scene_spec(disconnected_map, "解释 DNA→RNA→蛋白质关系")
    except SceneValidationError as exc:
        assert "所有节点连接" in str(exc)
    else:
        raise AssertionError("a disconnected concept_map must be rejected")

    duplicate_process = _relation_scene()
    duplicate_process["demonstrations"] = [{
        "id": "duplicate-process",
        "kind": "process",
        "title": "重复步骤",
        "anchor_section_id": duplicate_process["sections"][0]["id"],
        "side": "right",
        "semantic_ids": [],
        "data": {
            "steps": [
                {"label": "观察", "detail": "先观察条件"},
                {"label": "观察", "detail": "再次重复同一步"},
            ],
        },
    }]
    try:
        normalize_scene_spec(duplicate_process, "解释学习过程")
    except SceneValidationError as exc:
        assert "与已有步骤重复" in str(exc)
    else:
        raise AssertionError("process steps need distinct learning actions")


def main() -> None:
    check_checked_in_fixtures_pass()
    check_topic_mismatch_and_shallow_content_fail()
    check_visual_and_derivation_obligations()
    check_explicit_integral_is_cross_validated()
    check_explicit_relation_maps_are_cross_validated_and_repaired()
    check_renderer_preflight_rejects_empty_visuals()
    print("OK: teaching-quality gate rejects shallow, off-topic and mismatched scenes.")


if __name__ == "__main__":
    main()
