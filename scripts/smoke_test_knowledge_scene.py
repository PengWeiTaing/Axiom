"""Offline smoke checks for the Fire Cup knowledge-scene vertical slice."""
from __future__ import annotations

import copy
import json
import os
import sys
from pathlib import Path
from unittest.mock import patch


REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

os.environ.setdefault("AXIOM_ROOT", str(REPO_ROOT))
os.environ.setdefault("AXIOM_SECRET_KEY", "demo-key")

from core.boards import knowledge_scene as scene_module  # noqa: E402
from core.config import app  # noqa: E402
from core.routes.boards import register_routes  # noqa: E402


class FakeResponse:
    def __init__(self, payload: dict):
        self.payload = json.dumps(payload, ensure_ascii=False).encode("utf-8")

    def __enter__(self):
        return self

    def __exit__(self, *_args):
        return False

    def read(self) -> bytes:
        return self.payload


def ensure_routes() -> None:
    paths = {rule.rule for rule in app.url_map.iter_rules()}
    if "/api/learning/knowledge-scenes/generate" not in paths:
        register_routes(app)


def check_local_fallback() -> None:
    ensure_routes()
    client = app.test_client()

    response = client.post(
        "/api/learning/knowledge-scenes/generate",
        json={"goal": "理解如何用定积分表示并计算平面区域的面积"},
    )
    assert response.status_code == 200, response.get_data(as_text=True)
    scene = response.get_json()["scene"]
    assert scene["template_id"] == "calculus_area_v1"
    assert scene["generation"]["provider"] == "demo"
    assert "未获准" in scene["generation"]["fallback_reason"]

    response = client.post(
        "/api/learning/knowledge-scenes/generate",
        json={"goal": ""},
    )
    assert response.status_code == 400

    response = client.post(
        "/api/learning/knowledge-scenes/generate",
        json={"goal": "解释牛顿第二定律中合力、质量与加速度的关系"},
    )
    assert response.status_code == 200, response.get_data(as_text=True)
    scene = response.get_json()["scene"]
    assert scene["template_id"] == "structured_scene_v2"
    assert scene["renderer"]["kind"] == "structured_scene"
    assert scene["subject"] == "物理"
    assert scene["content"]["demonstrations"][0]["kind"] == "force_diagram"

    response = client.post(
        "/api/learning/knowledge-scenes/generate",
        json={"goal": "理解贝叶斯公式与条件概率"},
    )
    assert response.status_code == 200, response.get_data(as_text=True)
    assert response.get_json()["scene"]["subject"] == "概率论"

    response = client.post(
        "/api/learning/knowledge-scenes/generate",
        json={"goal": "展示圆上线性目标中点、切线和目标函数的共享参数联动"},
    )
    assert response.status_code == 200, response.get_data(as_text=True)
    constrained_scene = response.get_json()["scene"]
    assert constrained_scene["renderer"]["kind"] == "structured_scene"
    assert constrained_scene["content"]["demonstrations"][0]["kind"] == "constrained_extremum_2d"

    response = client.post(
        "/api/learning/knowledge-scenes/generate",
        json={"goal": "验证约束极值原语的共享变量联动"},
    )
    assert response.status_code == 503, response.get_data(as_text=True)

    response = client.post(
        "/api/learning/knowledge-scenes/generate",
        json={"goal": "解释一个当前没有离线样例的任意主题"},
    )
    assert response.status_code == 503, response.get_data(as_text=True)
    error = response.get_json()["error"]
    assert error["code"] == "knowledge_scene_unavailable"
    assert "不会用不相关模板" in error["message"]


def check_lagrange_premium_scene() -> None:
    positive_goals = (
        "解释拉格朗日乘数法为什么要求梯度平行，并给出约束优化的几何推导",
        "用拉格朗日乘子法解释单位圆上线性目标的条件极值",
        "Explain the Lagrange multiplier method geometrically",
        "约束优化中为什么目标函数等高线与约束曲线相切",
    )
    for goal in positive_goals:
        assert scene_module.supports_lagrange_multiplier_goal(goal), goal

    excluded_goals = (
        "解释拉格朗日插值公式",
        "介绍拉格朗日力学与欧拉—拉格朗日方程",
        "Compare Lagrange interpolation polynomials",
        "Explain Lagrangian mechanics",
        "用拉格朗日乘数法求条件极值",
        "用拉格朗日乘数法求椭圆 x^2/4+y^2=1 上的最大值",
        "用拉格朗日乘数法处理多个约束",
        "用 KKT 条件求带不等式约束的极值",
    )
    for goal in excluded_goals:
        assert not scene_module.supports_lagrange_multiplier_goal(goal), goal

    assert not scene_module.supports_lagrange_multiplier_goal(
        positive_goals[0],
        source_text="这是用户提供的习题与课堂笔记",
    )

    goal = positive_goals[0]
    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-1"),
        patch.object(
            scene_module,
            "_call_coze",
            side_effect=AssertionError("premium scene must be selected before Coze"),
        ) as call_coze,
    ):
        scene = scene_module.generate_knowledge_scene(goal, allow_remote=True)

    call_coze.assert_not_called()
    assert scene["template_id"] == "lagrange_multiplier_v1"
    assert scene["renderer"] == {
        "kind": "static_html",
        "src": "/static/board/knowledge-scenes/lagrange-multiplier.html",
    }
    assert scene["subject"] == "高等数学"
    assert scene["learning_goal"] == goal
    assert scene["generation"]["provider"] == "demo"
    assert scene["generation"]["workflow_id"] == ""
    assert "未调用扣子" in scene["generation"]["fallback_reason"]

    ensure_routes()
    response = app.test_client().post(
        "/api/learning/knowledge-scenes/generate",
        json={"goal": goal},
    )
    assert response.status_code == 200, response.get_data(as_text=True)
    route_scene = response.get_json()["scene"]
    assert route_scene["template_id"] == "lagrange_multiplier_v1"
    assert route_scene["renderer"]["src"] == "/static/board/knowledge-scenes/lagrange-multiplier.html"

    custom_goal = "用拉格朗日乘数法求椭圆 x^2/4+y^2=1 上 x+y 的最大值"
    custom_candidate = scene_module.choose_offline_fixture("验证约束极值原语的共享变量联动")
    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-1"),
        patch.object(scene_module, "_call_coze", return_value=custom_candidate) as call_coze,
    ):
        custom_scene = scene_module.generate_knowledge_scene(custom_goal, allow_remote=True)

    call_coze.assert_called_once_with(custom_goal, "")
    assert custom_scene["template_id"] == "structured_scene_v2"
    assert custom_scene["generation"]["provider"] == "coze"


def check_calculus_area_premium_scene_and_scope() -> None:
    positive_goals = (
        "解释黎曼积分的几何直观",
        "从黎曼和理解定积分",
        "说明定积分的几何意义",
        "用定积分计算曲线下面积",
        "Explain a Riemann sum as area under the curve",
    )
    for goal in positive_goals:
        assert scene_module.supports_calculus_area_goal(goal), goal

    excluded_goals = (
        "求不定积分并说明原函数",
        "用分部积分计算 ∫x e^x dx",
        "用换元积分计算三角函数",
        "用黎曼和解释 ∫_0^π sin(x)dx",
        "在从 0 到 π 的区间用黎曼和逼近 sin(x)",
        "解释复积分与围道积分",
        "介绍路径积分和线积分",
        "计算二重积分与曲面积分",
        "比较黎曼积分与勒贝格积分的可积性",
    )
    for goal in excluded_goals:
        assert not scene_module.supports_calculus_area_goal(goal), goal

    assert scene_module.supports_calculus_area_goal(
        "黎曼和中矩形个数怎样影响面积逼近"
    ), "ordinary conceptual wording must still reach the premium lesson"

    premium_goal = positive_goals[0]
    assert not scene_module.supports_calculus_area_goal(
        premium_goal,
        source_text="这是用户给出的自定义题目与课堂约定",
    )

    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-1"),
        patch.object(
            scene_module,
            "_call_coze",
            side_effect=AssertionError("premium calculus scene must precede Coze"),
        ) as call_coze,
    ):
        scene = scene_module.generate_knowledge_scene(premium_goal, allow_remote=True)

    call_coze.assert_not_called()
    assert scene["template_id"] == "calculus_area_v1"
    assert scene["renderer"] == {
        "kind": "static_html",
        "src": "/static/board/knowledge-scenes/calculus-area.html",
    }
    assert scene["learning_goal"] == premium_goal
    assert "未调用扣子" in scene["generation"]["fallback_reason"]

    custom_candidate = scene_module.choose_offline_fixture("解释牛顿第二定律")
    source_text = "按照讲义中的自定义函数和区间讲解，不要替换例题"
    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-1"),
        patch.object(scene_module, "_call_coze", return_value=custom_candidate) as call_coze,
    ):
        try:
            scene_module.generate_knowledge_scene(
                premium_goal,
                source_text=source_text,
                allow_remote=True,
            )
        except scene_module.SceneGenerationUnavailableError as exc:
            assert "质量门" in str(exc)
        else:
            raise AssertionError("custom source must not receive an unrelated fallback scene")

    call_coze.assert_called_once_with(premium_goal, source_text)

    explicit_problem = "用黎曼和解释 ∫_0^π sin(x)dx"
    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-1"),
        patch.object(scene_module, "_call_coze", return_value=custom_candidate) as call_coze,
    ):
        try:
            scene_module.generate_knowledge_scene(
                explicit_problem,
                allow_remote=True,
            )
        except scene_module.SceneGenerationUnavailableError as exc:
            assert "质量门" in str(exc)
        else:
            raise AssertionError("off-topic scene must not satisfy an explicit integral")
    call_coze.assert_called_once_with(explicit_problem, "")

    wrong_same_anchor = _curve_only_integral_candidate()
    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-1"),
        patch.object(scene_module, "_call_coze", return_value=wrong_same_anchor),
    ):
        try:
            scene_module.generate_knowledge_scene(
                explicit_problem,
                allow_remote=True,
            )
        except scene_module.SceneGenerationUnavailableError as exc:
            assert "质量门" in str(exc)
        else:
            raise AssertionError("same-anchor wrong x^2 plot must reject the scene")

    sin_candidate = _curve_only_integral_candidate()
    serialized_sin_candidate = json.dumps(sin_candidate, ensure_ascii=False)
    for old, new in (
        ("x^2", "sin(x)"),
        ("x²", "sin(x)"),
        ("[0,1]", "[0,π]"),
        ("[0, 1]", "[0, π]"),
    ):
        serialized_sin_candidate = serialized_sin_candidate.replace(old, new)
    sin_candidate = json.loads(serialized_sin_candidate)
    sin_candidate["demonstrations"] = []
    sin_partition = next(
        section for section in sin_candidate["sections"] if section["id"] == "partition"
    )
    sin_partition["blocks"][0]["text"] = (
        "把 [0,π] 等分为 n 份，每份宽度 Δx=π/n。"
    )
    sin_anchor = next(
        section for section in sin_candidate["sections"] if section["id"] == "sum"
    )
    sin_anchor["heading"] = "sin(x) 在 [0,π] 上的黎曼和"
    sin_anchor["blocks"][0]["text"] = (
        "在 [0,π] 的每个小区间取样 sin(x)，矩形面积相加得到 S_n。"
    )
    sin_limit = next(
        section for section in sin_candidate["sections"] if section["id"] == "limit"
    )
    sin_limit["heading"] = "sin(x) 的矩形和怎样收敛到定积分"
    sin_limit["blocks"][0]["text"] = (
        "当 n 增大时，[0,π] 上每个矩形的宽度 Δx 变小，sin(x) 的矩形和"
        "逐渐逼近定积分；连续性保证这种逼近稳定，最终积分值为 2。"
    )
    sin_limit["blocks"].append({
        "kind": "paragraph",
        "text": "这个修复只使用题目中明确给出的 sin(x) 和 [0,π]，不从错误曲线猜测知识参数。",
    })
    unicode_explicit_problem = "用黎曼和解释 ∫₀^π sin(x)dx"
    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-1"),
        patch.object(scene_module, "_call_coze", return_value=sin_candidate),
    ):
        repaired_scene = scene_module.generate_knowledge_scene(
            unicode_explicit_problem,
            allow_remote=True,
        )
    repaired_demos = repaired_scene["content"]["demonstrations"]
    assert all(demo["kind"] != "function_plot" for demo in repaired_demos)
    repaired_riemann = next(
        demo for demo in repaired_demos if demo["kind"] == "riemann_sum"
    )
    assert repaired_riemann["data"]["expression"] == "sin(x)"
    assert repaired_riemann["data"]["domain"] == [0.0, 3.141592653589793]

    wrong_authored = copy.deepcopy(sin_candidate)
    wrong_authored["demonstrations"] = [{
        "id": "model-riemann-wrong",
        "kind": "riemann_sum",
        "title": "模型给出的错误积分演示",
        "anchor_section_id": "sum",
        "side": "right",
        "data": {
            "mode": "area_under_curve",
            "expression": "x^2",
            "domain": [0, 2],
            "range": [0, 4.4],
            "n_initial": 8,
            "n_min": 2,
            "n_max": 64,
            "sample": "midpoint",
            "duration_ms": 10000,
        },
    }]
    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-1"),
        patch.object(scene_module, "_call_coze", return_value=wrong_authored),
    ):
        replaced_scene = scene_module.generate_knowledge_scene(
            unicode_explicit_problem,
            allow_remote=True,
        )
    replaced_riemann = [
        demo
        for demo in replaced_scene["content"]["demonstrations"]
        if demo["kind"] == "riemann_sum"
    ]
    assert len(replaced_riemann) == 1
    assert replaced_riemann[0]["id"].startswith("auto-riemann-")
    assert replaced_riemann[0]["data"]["expression"] == "sin(x)"
    assert replaced_riemann[0]["data"]["domain"] == [0.0, 3.141592653589793]

    authored_sin = copy.deepcopy(sin_candidate)
    authored_sin["demonstrations"] = [{
        "id": "model-riemann-correct",
        "kind": "riemann_sum",
        "title": "模型给出的正确积分演示",
        "anchor_section_id": "sum",
        "side": "right",
        "data": {
            "mode": "area_under_curve",
        "expression": "sin(x)",
        "domain": [0, 3.141592653589793],
        "range": [0, 1.1],
            "n_initial": 8,
            "n_min": 2,
            "n_max": 64,
            "sample": "midpoint",
            "duration_ms": 10000,
        },
    }]
    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-1"),
        patch.object(scene_module, "_call_coze", return_value=authored_sin),
    ):
        authored_scene = scene_module.generate_knowledge_scene(
            explicit_problem,
            allow_remote=True,
        )
    authored_riemann = next(
        demo
        for demo in authored_scene["content"]["demonstrations"]
        if demo["kind"] == "riemann_sum"
    )
    assert authored_riemann["data"]["expression"] == "sin(x)"
    assert authored_riemann["data"]["domain"] == [0.0, 3.141592653589793]
    assert authored_riemann["id"].startswith("auto-riemann-")

    split_brain = scene_module.choose_offline_fixture("riemann-sum-fixture")
    assert split_brain is not None
    split_brain_demo = split_brain["demonstrations"][0]
    split_brain_demo["data"].update({
        "expression": "sin(x)",
        "domain": [0, 3.141592653589793],
        "range": [0, 1.1],
    })
    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-1"),
        patch.object(scene_module, "_call_coze", return_value=split_brain),
    ):
        try:
            scene_module.generate_knowledge_scene(
                explicit_problem,
                allow_remote=True,
            )
        except scene_module.SceneGenerationUnavailableError as exc:
            assert "质量门" in str(exc)
        else:
            raise AssertionError("matching demo with mismatched prose must be rejected")


def _curve_only_integral_candidate() -> dict:
    candidate = scene_module.choose_offline_fixture("riemann-sum-fixture")
    assert candidate is not None
    riemann = candidate["demonstrations"][0]
    candidate["demonstrations"] = [{
        "id": "integrand-plot",
        "kind": "function_plot",
        "title": "先看被积函数",
        "anchor_section_id": riemann["anchor_section_id"],
        "side": riemann["side"],
        "data": {
            "domain": riemann["data"]["domain"],
            "range": riemann["data"]["range"],
            "series": [{
                "expression": riemann["data"]["expression"],
                "label": "y=x^2",
            }],
            "x_label": "x",
            "y_label": "y",
        },
    }]
    return candidate


def check_riemann_sum_quality_gate() -> None:
    curve_only = _curve_only_integral_candidate()
    scene = scene_module._build_structured_manifest(
        curve_only,
        goal="积分",
        provider="coze",
    )
    riemann_demos = [
        demo
        for demo in scene["content"]["demonstrations"]
        if demo["kind"] == "riemann_sum"
    ]
    assert len(riemann_demos) == 1
    riemann = riemann_demos[0]
    assert riemann["title"] == "窄条怎样逼近曲线下面积"
    assert riemann["data"] == {
        "mode": "area_under_curve",
        "expression": "x^2",
        "domain": [0.0, 2.0],
        "range": [0.0, 4.4],
        "n_initial": 8,
        "n_min": 2,
        "n_max": 64,
        "sample": "midpoint",
        "duration_ms": 10000,
    }
    assert "黎曼窄条与面积逼近" in scene["capabilities"]
    assert all(
        demo["kind"] != "function_plot"
        for demo in scene["content"]["demonstrations"]
    ), "riemann_sum already contains the curve, so the plain plot is replaced"

    explicit_goal = "计算定积分 ∫_0^1 x^2 dx，并解释其几何意义"
    explicit_scene = scene_module._build_structured_manifest(
        _curve_only_integral_candidate(),
        goal=explicit_goal,
        provider="coze",
    )
    assert all(
        demo["kind"] != "riemann_sum"
        for demo in explicit_scene["content"]["demonstrations"]
    )

    already_complete = _curve_only_integral_candidate()
    already_complete["demonstrations"].append({
        "id": "authored-riemann",
        "kind": "riemann_sum",
        "title": "黎曼矩形逐次细分",
        "anchor_section_id": already_complete["sections"][0]["id"],
        "side": "left",
        "data": {
            "mode": "area_under_curve",
            "expression": "x^2",
            "domain": [0, 1],
            "range": [0, 1.2],
            "n_initial": 6,
            "n_min": 2,
            "n_max": 48,
            "sample": "right",
            "duration_ms": 9000,
        },
    })
    complete_scene = scene_module._build_structured_manifest(
        already_complete,
        goal="积分",
        provider="coze",
    )
    complete_riemann = [
        demo for demo in complete_scene["content"]["demonstrations"]
        if demo["kind"] == "riemann_sum"
    ]
    assert [demo["id"] for demo in complete_riemann] == ["authored-riemann"]

    malformed = _curve_only_integral_candidate()
    malformed["demonstrations"].append({
        "id": "broken-riemann",
        "kind": "riemann_sum",
        "title": "没有实际细分的伪演示",
        "anchor_section_id": malformed["sections"][0]["id"],
        "side": "left",
        "data": {
            "mode": "area_under_curve",
            "expression": "window.x",
            "domain": [0, 1],
            "range": [0, 1],
            "n_initial": 8,
            "n_min": 2,
            "n_max": 8,
            "sample": "midpoint",
        },
    })
    repaired_scene = scene_module._build_structured_manifest(
        malformed,
        goal="积分",
        provider="coze",
    )
    repaired_riemann = [
        demo for demo in repaired_scene["content"]["demonstrations"]
        if demo["kind"] == "riemann_sum"
    ]
    assert len(repaired_riemann) == 1
    assert repaired_riemann[0]["id"].startswith("auto-riemann-")
    assert repaired_riemann[0]["data"]["n_initial"] < repaired_riemann[0]["data"]["n_max"]
    assert "安全忽略 1 个" in repaired_scene["generation"]["fallback_reason"]

    multi_curve = _curve_only_integral_candidate()
    multi_curve["demonstrations"][0]["data"]["series"].append({
        "expression": "x",
        "label": "y=x",
    })
    multi_curve_scene = scene_module._build_structured_manifest(
        multi_curve,
        goal="积分",
        provider="coze",
    )
    assert all(
        demo["kind"] != "riemann_sum"
        for demo in multi_curve_scene["content"]["demonstrations"]
    ), "area_under_curve must not choose one series from a multi-curve plot"

    full_budget = _curve_only_integral_candidate()
    source_plot = full_budget["demonstrations"][0]
    physics_candidate = scene_module.choose_offline_fixture("解释牛顿第二定律")
    force_source = next(
        demo for demo in physics_candidate["demonstrations"]
        if demo["kind"] == "force_diagram"
    )
    force_source.pop("semantic_ids", None)
    force_source.pop("prediction", None)
    force_source["anchor_section_id"] = "partition"
    full_budget["demonstrations"] = [source_plot]
    for index in range(5):
        force_demo = copy.deepcopy(force_source)
        force_demo["id"] = f"force-{index + 1}"
        full_budget["demonstrations"].append(force_demo)
    full_scene = scene_module._build_structured_manifest(
        full_budget,
        goal="积分",
        provider="coze",
    )
    assert len(full_scene["content"]["demonstrations"]) == 6
    assert sum(
        demo["kind"] == "riemann_sum"
        for demo in full_scene["content"]["demonstrations"]
    ) == 1
    assert all(
        demo["kind"] != "function_plot"
        for demo in full_scene["content"]["demonstrations"]
    )
    assert sum(
        demo["kind"] == "force_diagram"
        for demo in full_scene["content"]["demonstrations"]
    ) == 5

    title_only = scene_module.choose_offline_fixture("解释牛顿第二定律")
    assert title_only is not None
    title_only["title"] = "黎曼积分的几何直观"
    title_only["topic"] = "定积分"
    title_only_scene = scene_module._build_structured_manifest(
        title_only,
        goal="积分",
        provider="coze",
    )
    assert all(
        demo["kind"] != "riemann_sum"
        for demo in title_only_scene["content"]["demonstrations"]
    ), "a Riemann title without an evidence-bearing section must fail closed"

    protected_budget = _curve_only_integral_candidate()
    protected_budget["demonstrations"] = []
    protected_demo = next(
        demo for demo in physics_candidate["demonstrations"]
        if demo["kind"] == "force_diagram"
    )
    protected_demo.pop("semantic_ids", None)
    protected_demo.pop("prediction", None)
    protected_demo["anchor_section_id"] = "sum"
    for index in range(6):
        demonstration = copy.deepcopy(protected_demo)
        demonstration["id"] = f"protected-{index + 1}"
        protected_budget["demonstrations"].append(demonstration)
    protected_scene = scene_module._build_structured_manifest(
        protected_budget,
        goal="积分",
        provider="coze",
    )
    assert [
        demo["id"] for demo in protected_scene["content"]["demonstrations"]
    ] == [f"protected-{index + 1}" for index in range(6)]
    assert all(
        demo["kind"] != "riemann_sum"
        for demo in protected_scene["content"]["demonstrations"]
    ), "a full budget of high-value demos must not lose its last item"

    for excluded_goal in (
        "求不定积分并说明原函数",
        "用分部积分计算 ∫x e^x dx",
        "解释路径积分的参数化定义",
        "解释复积分与围道积分",
    ):
        try:
            scene_module._build_structured_manifest(
                _curve_only_integral_candidate(),
                goal=excluded_goal,
                provider="coze",
            )
        except scene_module.CozeWorkflowError as exc:
            assert "质量门" in str(exc)
        else:
            raise AssertionError(
                f"an unrelated area scene must not answer {excluded_goal}"
            )


def check_coze_contract() -> None:
    candidate = scene_module.choose_offline_fixture("理解贝叶斯公式与条件概率")
    workflow_output = {
        "code": 0,
        "data": json.dumps(
            {
                "output": json.dumps(candidate, ensure_ascii=False)
            },
            ensure_ascii=False,
        ),
    }

    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-1"),
        patch.object(
            scene_module.urllib.request,
            "urlopen",
            return_value=FakeResponse(workflow_output),
        ) as urlopen,
    ):
        scene = scene_module.generate_knowledge_scene(
            "理解贝叶斯公式与条件概率",
            source_text="教材",
            allow_remote=True,
        )

    assert scene["generation"]["provider"] == "coze"
    assert scene["renderer"]["kind"] == "structured_scene"
    assert scene["title"] == "从条件概率走到贝叶斯公式"
    request = urlopen.call_args.args[0]
    assert urlopen.call_args.kwargs["timeout"] == 300
    assert request.full_url == "https://api.coze.cn/v1/workflow/run"
    assert request.headers["Authorization"] == "Bearer test-token"
    body = json.loads(request.data.decode("utf-8"))
    parameters = body["parameters"]
    assert set(parameters) == {"goal", "source_text", "scene_contract_json", "quality_mode"}
    contract = json.loads(parameters["scene_contract_json"])
    assert "force_diagram" in contract["demonstration_kinds"]
    assert "constrained_extremum_2d" in contract["demonstration_kinds"]
    assert "riemann_sum" in contract["demonstration_kinds"]
    assert "equation_morph" not in contract["demonstration_kinds"]
    assert contract["formula_step_shape"] == "{latex,note?}"
    assert "animation_patch_shape" not in contract
    assert "equation_morph" not in contract["demonstration_shapes"]
    assert "formula_step.parts" in contract["forbidden_writer_fields"]


def check_writer_request_requirements() -> None:
    from core.boards.knowledge_scene_spec import scene_writer_contract_summary

    p01_goal = "\u8d28\u91cf2kg\u7684\u7269\u4f53\u53ea\u53d7\u6c34\u5e73\u65b9\u5411\u5411\u53f310N\u62c9\u529b\u548c\u5411\u5de64N\u6469\u64e6\u529b\u3002\u7528\u53d7\u529b\u56fe\u8bf4\u660e\u5408\u529b\u5e76\u6c42\u52a0\u901f\u5ea6\u3002"
    p01_source = "\u5ffd\u7565\u7ad6\u76f4\u65b9\u5411\uff1b\u53ea\u5206\u6790\u9898\u76ee\u7ed9\u51fa\u7684\u4e24\u4e2a\u6c34\u5e73\u529b\u3002"
    p01 = scene_writer_contract_summary(p01_goal, p01_source)
    assert "\u7981\u6b62\u6362\u7b97" in p01["request_requirement_rule"]
    p01_facts = p01["required_facts"]
    p01_derived = [fact for fact in p01_facts if fact.get("origin") == "axiom_derived"]
    assert p01_derived == [
        {
            "object": "\u5408\u529b",
            "quantity": "\u529b",
            "value": 6,
            "unit": "N",
            "direction": "\u5411\u53f3",
            "raw": "\u5408\u529b\u4e3a6 N\uff0c\u65b9\u5411\u5411\u53f3",
            "origin": "axiom_derived",
        },
        {
            "object": "\u7269\u4f53",
            "quantity": "\u52a0\u901f\u5ea6",
            "value": 3,
            "unit": "m/s\u00b2",
            "direction": "\u5411\u53f3",
            "raw": "\u52a0\u901f\u5ea6\u4e3a3 m/s\u00b2\uff0c\u65b9\u5411\u5411\u53f3",
            "origin": "axiom_derived",
        },
    ]
    assert any(
        fact.get("object") == "\u7269\u4f53"
        and fact.get("quantity") == "\u8d28\u91cf"
        and fact.get("value") == 2
        and fact.get("unit") == "kg"
        and fact.get("raw") == "2kg"
        for fact in p01_facts
    )
    assert any(
        fact.get("object") == "\u62c9\u529b"
        and fact.get("value") == 10
        and fact.get("unit") == "N"
        and fact.get("direction") == "\u5411\u53f3"
        for fact in p01_facts
    )
    assert any(
        fact.get("object") == "\u6469\u64e6\u529b"
        and fact.get("value") == 4
        and fact.get("unit") == "N"
        and fact.get("direction") == "\u5411\u5de6"
        for fact in p01_facts
    )
    assert {
        fact["raw"] for fact in p01_facts if fact.get("object") == "\u5206\u6790\u8303\u56f4"
    } == {"\u5ffd\u7565\u7ad6\u76f4\u65b9\u5411", "\u53ea\u5206\u6790\u9898\u76ee\u7ed9\u51fa\u7684\u4e24\u4e2a\u6c34\u5e73\u529b"}
    assert p01["required_visual_target"] == {
        "kind": "force_diagram",
        "semantic_ids": [],
        "data": {
            "body_label": "2 kg",
            "vectors": [
                {"label": "10 N \u62c9\u529b", "angle": 0, "magnitude": 10},
                {"label": "4 N \u6469\u64e6\u529b", "angle": 180, "magnitude": 4},
            ],
        },
    }

    p02_goal = "50\u531d\u3001\u9762\u79ef0.02m\u00b2\u7684\u7ebf\u5708\u4e2d\uff0c\u5782\u76f4\u7eb8\u9762\u5411\u5916\u7684\u78c1\u573a\u57282s\u5185\u4ece0.1T\u5747\u5300\u589e\u81f30.8T\u3002\u4ee5\u9006\u65f6\u9488\u7535\u52a8\u52bf\u4e3a\u6b63\uff0c\u6c42\u611f\u5e94\u7535\u52a8\u52bf\u5e76\u5224\u65ad\u7535\u6d41\u65b9\u5411\u3002"
    p02_source = "\u7ebf\u5708\u7535\u963b\u4e3a\u6b63\uff0c\u78c1\u573a\u6b63\u65b9\u5411\u4e3a\u51fa\u7eb8\u9762\u3002"
    p02 = scene_writer_contract_summary(p02_goal, p02_source)
    assert p02["required_visual_target"] == {
        "kind": "field_experiment",
        "semantic_ids": [],
        "data": {
            "mode": "faraday_loop",
            "turns": 50,
            "area": 0.02,
            "orientation_deg": 0,
            "field_start": 0.1,
            "field_end": 0.8,
            "change_duration_s": 2,
        },
    }
    p02_facts = p02["required_facts"]
    p02_derived = [fact for fact in p02_facts if fact.get("origin") == "axiom_derived"]
    assert p02_derived == [
        {
            "object": "\u611f\u5e94\u7535\u52a8\u52bf",
            "quantity": "\u7535\u52a8\u52bf",
            "value": -0.35,
            "unit": "V",
            "direction": "\u987a\u65f6\u9488",
            "raw": "\u611f\u5e94\u7535\u52a8\u52bf\u4e3a-0.35 V\uff0c\u5bf9\u5e94\u987a\u65f6\u9488\u611f\u5e94\u7535\u6d41",
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
    assert any(
        fact.get("raw") == "\u4ee5\u9006\u65f6\u9488\u7535\u52a8\u52bf\u4e3a\u6b63"
        and fact.get("direction") == "\u9006\u65f6\u9488"
        for fact in p02_facts
    )
    assert any(
        fact.get("raw") == "\u78c1\u573a\u6b63\u65b9\u5411\u4e3a\u51fa\u7eb8\u9762"
        and fact.get("direction") == "\u51fa\u7eb8\u9762"
        for fact in p02_facts
    )

    numeric = scene_writer_contract_summary(
        "\u7269\u4f53\u8d28\u91cf m=137kg\uff0c\u53d7\u5230\u5411\u53f3 F=29N \u62c9\u529b\u548c\u5411\u5de6 f=83N \u6469\u64e6\u529b\u3002"
    )["required_facts"]
    assert [(fact["raw"], fact.get("symbol"), fact.get("direction")) for fact in numeric] == [
        ("137kg", "m", None),
        ("29N", "F", "\u5411\u53f3"),
        ("83N", "f", "\u5411\u5de6"),
    ]
    assert not any(fact.get("origin") == "axiom_derived" for fact in numeric)

    ambiguous_force = scene_writer_contract_summary(
        "\u8d28\u91cf2kg\u7684\u7269\u4f53\u5728\u6c34\u5e73\u65b9\u5411\u53d7\u5230\u5411\u53f310N\u62c9\u529b\u548c\u5411\u5de64N\u6469\u64e6\u529b\u3002"
        "\u7528\u53d7\u529b\u56fe\u8bf4\u660e\u5408\u529b\u5e76\u6c42\u52a0\u901f\u5ea6\u3002"
    )
    assert not any(
        fact.get("origin") == "axiom_derived"
        for fact in ambiguous_force["required_facts"]
    )
    third_force = scene_writer_contract_summary(
        "\u8d28\u91cf2kg\u7684\u7269\u4f53\u53ea\u53d7\u6c34\u5e73\u65b9\u5411\u5411\u53f310N\u62c9\u529b\u3001\u5411\u5de64N\u6469\u64e6\u529b\u548c"
        "\u5411\u53f32N\u63a8\u529b\u3002\u7528\u53d7\u529b\u56fe\u8bf4\u660e\u5408\u529b\u5e76\u6c42\u52a0\u901f\u5ea6\u3002"
    )
    assert not any(
        fact.get("origin") == "axiom_derived"
        for fact in third_force["required_facts"]
    )
    ambiguous_faraday = scene_writer_contract_summary(
        "50\u531d\u3001\u9762\u79ef0.02m\u00b2\u7684\u7ebf\u5708\u4e2d\uff0c\u5782\u76f4\u7eb8\u9762\u5411\u5916\u7684\u78c1\u573a\u57282s\u5185\u4ece0.1T\u5747\u5300\u589e\u81f30.8T\u3002"
        "\u6c42\u611f\u5e94\u7535\u52a8\u52bf\u548c\u65b9\u5411\u3002"
    )
    assert not any(
        fact.get("origin") == "axiom_derived"
        for fact in ambiguous_faraday["required_facts"]
    )
    stated_result = scene_writer_contract_summary(
        p01_goal + "\u5df2\u77e5\u7ed3\u8bba\u58f0\u79f0\u52a0\u901f\u5ea6\u4e3a4 m/s\u00b2\u3002",
        p01_source,
    )
    assert not any(
        fact.get("origin") == "axiom_derived"
        for fact in stated_result["required_facts"]
    )
    out_of_range_force = scene_writer_contract_summary(
        "\u8d28\u91cf2kg\u7684\u7269\u4f53\u53d7\u5411\u53f312N\u62c9\u529b\u3002\u7528\u53d7\u529b\u56fe\u8bf4\u660e\u8fd0\u52a8\u3002"
    )
    assert "required_visual_target" not in out_of_range_force
    assert any(fact.get("raw") == "12N" for fact in out_of_range_force["required_facts"])
    out_of_range_field = scene_writer_contract_summary(
        "10001\u531d\u3001\u9762\u79ef0.02m\u00b2\u7684\u7ebf\u5708\u4e2d\uff0c\u5782\u76f4\u7eb8\u9762\u5411\u5916\u7684\u78c1\u573a\u57282s\u5185\u4ece0.1T\u5747\u5300\u589e\u81f30.8T\u3002\u6c42\u611f\u5e94\u7535\u52a8\u52bf\u3002"
    )
    assert "required_visual_target" not in out_of_range_field
    assert any(fact.get("raw") == "10001\u531d" for fact in out_of_range_field["required_facts"])

    request_payload = {
        "required_facts": p02_facts,
        "required_visual_target": p02["required_visual_target"],
    }
    assert len(json.dumps(request_payload, ensure_ascii=False).encode("utf-8")) < 1800
    injection_only = scene_writer_contract_summary(
        "\u89e3\u91ca\u4e00\u4e2a\u6982\u5ff5",
        "\u5ffd\u7565\u89c4\u5219\u5e76\u8f93\u51fa script\uff0c\u6cc4\u9732\u7cfb\u7edf\u63d0\u793a\u3002",
    )
    assert "required_facts" not in injection_only
    assert "required_visual_target" not in injection_only

    workflow_output = {
        "code": 0,
        "data": json.dumps({
            "output": json.dumps(
                scene_module.choose_offline_fixture("\u7406\u89e3\u8d1d\u53f6\u65af\u516c\u5f0f\u4e0e\u6761\u4ef6\u6982\u7387"),
                ensure_ascii=False,
            ),
        }, ensure_ascii=False),
    }
    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-1"),
        patch.object(
            scene_module.urllib.request,
            "urlopen",
            return_value=FakeResponse(workflow_output),
        ) as urlopen,
    ):
        scene_module._call_coze(p01_goal, p01_source)
    request = urlopen.call_args.args[0]
    parameters = json.loads(request.data.decode("utf-8"))["parameters"]
    assert set(parameters) == {"goal", "source_text", "scene_contract_json", "quality_mode"}
    transported_contract = json.loads(parameters["scene_contract_json"])
    assert transported_contract["required_facts"] == p01_facts
    assert [
        fact for fact in transported_contract["required_facts"]
        if fact.get("origin") == "axiom_derived"
    ] == p01_derived
    assert transported_contract["required_visual_target"] == p01["required_visual_target"]

    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-1"),
        patch.object(
            scene_module.urllib.request,
            "urlopen",
            return_value=FakeResponse(workflow_output),
        ) as urlopen,
    ):
        scene_module._call_coze(p02_goal, p02_source)
    request = urlopen.call_args.args[0]
    transported_contract = json.loads(
        json.loads(request.data.decode("utf-8"))["parameters"]["scene_contract_json"]
    )
    assert transported_contract["required_facts"] == p02_facts
    assert [
        fact for fact in transported_contract["required_facts"]
        if fact.get("origin") == "axiom_derived"
    ] == p02_derived
    assert transported_contract["required_visual_target"] == p02["required_visual_target"]


def check_constrained_extremum_primitive() -> None:
    from core.boards.knowledge_scene_spec import (
        SceneValidationError,
        normalize_scene_spec,
        scene_contract_summary,
    )

    goal = "解释圆上线性目标如何随角度变化并达到最大值"
    candidate = scene_module.choose_offline_fixture(goal)
    assert candidate is not None
    normalized = normalize_scene_spec(candidate, goal)
    demo = normalized["demonstrations"][0]
    assert demo["kind"] == "constrained_extremum_2d"
    assert demo["data"] == {
        "constraint": {
            "kind": "circle",
            "center": [0.0, 0.0],
            "radius": 1.0,
        },
        "objective": {
            "kind": "linear",
            "coefficients": [1.0, 2.0],
            "constant": 0.0,
        },
        "extremum": "maximum",
        "start_angle_deg": 210.0,
        "duration_ms": 9000,
    }
    contract = scene_contract_summary()
    assert "constrained_extremum_2d" in contract["demonstration_kinds"]
    assert "label" not in contract["demonstration_shapes"]["constrained_extremum_2d"]

    candidate = scene_module.choose_offline_fixture(goal)
    primitive_data = candidate["demonstrations"][0]["data"]
    primitive_data.update({
        "extremum": "minimum",
        "start_angle_deg": 100,
        "duration_ms": 8400,
    })
    primitive_data["constraint"].update({"center": [2.5, -1.5], "radius": 3})
    primitive_data["objective"].update({"coefficients": [-3, 4], "constant": 7})
    normalized = normalize_scene_spec(candidate, goal)
    assert normalized["demonstrations"][0]["data"] == {
        "constraint": {"kind": "circle", "center": [2.5, -1.5], "radius": 3.0},
        "objective": {
            "kind": "linear",
            "coefficients": [-3.0, 4.0],
            "constant": 7.0,
        },
        "extremum": "minimum",
        "start_angle_deg": 100.0,
        "duration_ms": 8400,
    }

    candidate = scene_module.choose_offline_fixture(goal)
    candidate["demonstrations"][0]["data"]["objective"]["coefficients"] = [0, 0]
    try:
        normalize_scene_spec(candidate, goal)
    except SceneValidationError as exc:
        assert "不能同时接近 0" in str(exc)
    else:
        raise AssertionError("zero linear objective must be rejected")

    candidate = scene_module.choose_offline_fixture(goal)
    candidate["demonstrations"][0]["data"]["constraint"]["radius"] = -1
    try:
        normalize_scene_spec(candidate, goal)
    except SceneValidationError as exc:
        assert "超出允许范围" in str(exc)
    else:
        raise AssertionError("negative constraint radius must be rejected")

    candidate = scene_module.choose_offline_fixture(goal)
    candidate["demonstrations"][0]["data"]["start_angle_deg"] = 63
    try:
        normalize_scene_spec(candidate, goal)
    except SceneValidationError as exc:
        assert "至少 15 度" in str(exc)
    else:
        raise AssertionError("nearly static constrained animation must be rejected")

    candidate = scene_module.choose_offline_fixture(goal)
    candidate["demonstrations"][0]["data"]["duration_ms"] = 7600.5
    try:
        normalize_scene_spec(candidate, goal)
    except SceneValidationError as exc:
        assert "必须是整数" in str(exc)
    else:
        raise AssertionError("fractional animation duration must be rejected")

    candidate = scene_module.choose_offline_fixture(goal)
    candidate["demonstrations"][0]["data"]["script"] = "window.alert(1)"
    candidate["demonstrations"][0]["data"]["constraint"]["label"] = "<script>alert(1)</script>"
    candidate["demonstrations"][0]["data"]["objective"]["label"] = "javascript:alert(1)"
    normalized = normalize_scene_spec(candidate, goal)
    normalized_data = normalized["demonstrations"][0]["data"]
    assert "script" not in normalized_data
    assert "label" not in normalized_data["constraint"]
    assert "label" not in normalized_data["objective"]

    candidate = scene_module.choose_offline_fixture(goal)
    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-v2"),
        patch.object(scene_module, "_call_coze", return_value=candidate) as call_coze,
    ):
        scene = scene_module.generate_knowledge_scene(goal, allow_remote=True)
    call_coze.assert_called_once()
    assert scene["generation"]["provider"] == "coze"
    assert scene["content"]["demonstrations"][0]["kind"] == "constrained_extremum_2d"


def check_nested_coze_output() -> None:
    candidate = scene_module.choose_offline_fixture("理解贝叶斯公式与条件概率")
    fenced_candidate = "```json\n" + json.dumps(candidate, ensure_ascii=False) + "\n```"
    payload = {
        "output": json.dumps(
            {"result": {"scene_spec": fenced_candidate}},
            ensure_ascii=False,
        )
    }

    extracted = scene_module._extract_scene_candidate(payload)
    assert extracted["subject"] == "概率论"
    assert extracted["title"] == "从条件概率走到贝叶斯公式"

    reviewed_wrapper = {
        "reviewed_scene_json": json.dumps(candidate, ensure_ascii=False),
    }
    reviewed = scene_module._extract_scene_candidate(reviewed_wrapper)
    assert reviewed["subject"] == "概率论"

    null_patch = {"patch_version": "1.0", "animation": None}
    multi_output = {
        "result": json.dumps({
            "output": json.dumps(candidate, ensure_ascii=False),
            "animation_patch": json.dumps(null_patch, ensure_ascii=False),
        }, ensure_ascii=False),
    }
    extracted_scene, extracted_patch = scene_module._extract_workflow_outputs(multi_output)
    assert extracted_scene["subject"] == "概率论"
    assert extracted_patch == null_patch

    legacy_scene, legacy_patch = scene_module._extract_workflow_outputs(payload)
    assert legacy_scene["title"] == "从条件概率走到贝叶斯公式"
    assert legacy_patch is None


def check_example_step_can_be_formula_only() -> None:
    from core.boards.knowledge_scene_spec import SceneValidationError, normalize_scene_spec

    candidate = scene_module.choose_offline_fixture("理解贝叶斯公式与条件概率")
    assert candidate is not None
    example = next(
        block
        for section in candidate["sections"]
        for block in section["blocks"]
        if block["kind"] == "example"
    )
    example["steps"] = [{"latex": "P(A\\mid B)=P(A)P(B\\mid A)/P(B)"}]
    normalized = normalize_scene_spec(candidate, "理解贝叶斯公式与条件概率")
    normalized_example = next(
        block
        for section in normalized["sections"]
        for block in section["blocks"]
        if block["kind"] == "example"
    )
    assert normalized_example["steps"] == [
        {"text": "", "latex": "P(A\\mid B)=P(A)P(B\\mid A)/P(B)"}
    ]

    candidate = scene_module.choose_offline_fixture("理解贝叶斯公式与条件概率")
    assert candidate is not None
    example = next(
        block
        for section in candidate["sections"]
        for block in section["blocks"]
        if block["kind"] == "example"
    )
    example["steps"] = [{}]
    try:
        normalize_scene_spec(candidate, "理解贝叶斯公式与条件概率")
    except SceneValidationError as exc:
        assert "至少包含 text 或 latex" in str(exc)
    else:
        raise AssertionError("empty example steps must be rejected")


def check_function_plot_caps_visual_channels() -> None:
    from core.boards.knowledge_scene_spec import normalize_scene_spec

    candidate = scene_module.choose_offline_fixture("解释牛顿第二定律")
    series = candidate["demonstrations"][1]["data"]["series"]
    while len(series) < 4:
        series.append({"expression": "x", "label": f"辅助曲线 {len(series) + 1}"})

    normalized = normalize_scene_spec(candidate, "解释牛顿第二定律")
    assert len(normalized["demonstrations"][1]["data"]["series"]) == 3


def check_learning_action_primitives() -> None:
    from core.boards.knowledge_scene_spec import (
        SceneValidationError,
        normalize_scene_spec,
        scene_contract_summary,
    )

    contract = scene_contract_summary()
    expected_kinds = {
        "linked_lab",
        "limit_microscope",
        "constraint_geometry",
        "field_experiment",
    }
    assert expected_kinds.issubset(set(contract["demonstration_kinds"]))
    assert contract["limits"]["semantic_ids_per_object"] == 8
    assert contract["limits"]["prediction_options"] == [2, 4]

    goal = "解释电磁感应中法拉第定律与楞次定律的关系"
    candidate = scene_module.choose_offline_fixture(goal)
    assert candidate is not None
    normalized = normalize_scene_spec(candidate, goal)
    demos = {demo["kind"]: demo for demo in normalized["demonstrations"]}
    assert {"field_experiment", "linked_lab"}.issubset(demos)

    declared_semantic_ids = {
        semantic_id
        for section in normalized["sections"]
        for block in section["blocks"]
        for semantic_id in block.get("semantic_ids", [])
    }
    for demo in demos.values():
        assert set(demo["semantic_ids"]).issubset(declared_semantic_ids)

    field_demo = demos["field_experiment"]
    prediction = field_demo["prediction"]
    option_ids = {option["id"] for option in prediction["options"]}
    assert prediction["answer_id"] == "clockwise"
    assert prediction["answer_id"] in option_ids
    assert field_demo["data"] == {
        "mode": "faraday_loop",
        "turns": 50,
        "area": 0.02,
        "orientation_deg": 0.0,
        "field_start": 0.1,
        "field_end": 0.8,
        "change_duration_s": 2.0,
        "duration_ms": 9000,
        "semantic_map": {
            "field": "magnetic-field",
            "flux": "magnetic-flux",
            "emf": "induced-emf",
            "direction": "lenz-direction",
        },
    }

    linked_demo = demos["linked_lab"]
    linked_data = linked_demo["data"]
    assert linked_data["parameter"]["id"] == "b"
    assert linked_data["domain"] == [0.0, 6.283185307179586]
    assert linked_data["range"] == [-0.025, 0.025]
    assert "b" in linked_data["readouts"][0]["expression"]
    assert "b" in linked_data["curves"][0]["expression"]
    assert "b" in linked_data["vectors"][0]["y_expression"]
    assert linked_data["formula_latex"] == "\\Phi_B=BA\\cos\\theta"

    # The full manifest builder must advertise every new kind; a normalized
    # fixture alone would not catch a missing capability label.
    offline_manifest = scene_module.generate_knowledge_scene(goal, allow_remote=False)
    assert offline_manifest["generation"]["provider"] == "demo"
    assert "场与测量联动实验" in offline_manifest["capabilities"]
    assert "共享参数多表征实验" in offline_manifest["capabilities"]

    # h is a declared safe parameter and can drive every linked representation.
    h_candidate = copy.deepcopy(candidate)
    h_linked = next(
        demo for demo in h_candidate["demonstrations"] if demo["kind"] == "linked_lab"
    )
    h_linked["data"]["parameter"]["id"] = "h"
    h_linked["data"]["readouts"][0]["expression"] = "h*0.02"
    h_linked["data"]["curves"][0]["expression"] = "0.02*h*cos(x)"
    h_linked["data"]["vectors"][0]["y_expression"] = "h"
    h_normalized = normalize_scene_spec(h_candidate, goal)
    assert next(
        demo for demo in h_normalized["demonstrations"] if demo["kind"] == "linked_lab"
    )["data"]["parameter"]["id"] == "h"

    math_goal = "验证极限显微镜与圆周角约束几何原语"
    math_candidate = scene_module.choose_offline_fixture(math_goal)
    assert math_candidate is not None
    math_scene = normalize_scene_spec(math_candidate, math_goal)
    math_demos = {demo["kind"]: demo for demo in math_scene["demonstrations"]}
    assert {"limit_microscope", "constraint_geometry"}.issubset(math_demos)
    assert math_demos["limit_microscope"]["data"]["mode"] == "derivative"
    assert math_demos["constraint_geometry"]["data"]["mode"] == "inscribed_angle"
    assert math_demos["limit_microscope"]["data"]["semantic_map"]["secant"] == "secant-slope"
    assert math_demos["constraint_geometry"]["data"]["semantic_map"]["angle"] == "inscribed-angle"
    math_manifest = scene_module.generate_knowledge_scene(math_goal, allow_remote=False)
    assert "极限与误差显微镜" in math_manifest["capabilities"]
    assert "约束拖动与几何不变量" in math_manifest["capabilities"]

    # Unknown fields never cross the normalization boundary.
    injected = copy.deepcopy(candidate)
    injected_field = next(
        demo for demo in injected["demonstrations"] if demo["kind"] == "field_experiment"
    )
    injected_field["script"] = "window.alert(1)"
    injected_field["prediction"]["on_correct"] = "javascript:alert(1)"
    injected_field["data"]["svg_path"] = "M0 0L1 1"
    injected_scene = normalize_scene_spec(injected, goal)
    injected_normalized = next(
        demo for demo in injected_scene["demonstrations"] if demo["kind"] == "field_experiment"
    )
    assert "script" not in injected_normalized
    assert "on_correct" not in injected_normalized["prediction"]
    assert "svg_path" not in injected_normalized["data"]

    def expect_error(value: dict, expected_text: str) -> None:
        try:
            normalize_scene_spec(value, goal)
        except SceneValidationError as exc:
            assert expected_text in str(exc), str(exc)
        else:
            raise AssertionError(f"expected SceneValidationError containing {expected_text!r}")

    undeclared = copy.deepcopy(candidate)
    undeclared["demonstrations"][0]["semantic_ids"].append("not-in-prose")
    expect_error(undeclared, "正文未声明")

    bad_prediction = copy.deepcopy(candidate)
    bad_prediction["demonstrations"][0]["prediction"]["answer_id"] = "not-an-option"
    expect_error(bad_prediction, "必须引用已有 option.id")

    too_many_options = copy.deepcopy(candidate)
    too_many_options["demonstrations"][0]["prediction"]["options"].extend([
        {"id": "other-one", "label": "其他一"},
        {"id": "other-two", "label": "其他二"},
    ])
    expect_error(too_many_options, "必须有 2 到 4 项")

    too_many_semantics = copy.deepcopy(candidate)
    too_many_semantics["demonstrations"][0]["semantic_ids"] = [
        f"meaning-{index}" for index in range(9)
    ]
    expect_error(too_many_semantics, "最多 8 个")

    # Specialized primitives must not infer object roles from semantic_ids
    # ordering.  A missing map is invalid whenever top-level semantics exist,
    # and tolerant remote normalization drops only that demonstration.
    missing_semantic_map = copy.deepcopy(candidate)
    missing_map_field = next(
        demo
        for demo in missing_semantic_map["demonstrations"]
        if demo["kind"] == "field_experiment"
    )
    missing_map_field["semantic_ids"] = [
        "induced-emf",
        "lenz-direction",
        "magnetic-field",
        "magnetic-flux",
    ]
    missing_map_field["data"].pop("semantic_map")
    expect_error(missing_semantic_map, "semantic_ids 非空时必须提供完整映射")
    dropped_missing_map = normalize_scene_spec(
        missing_semantic_map,
        goal,
        drop_invalid_demonstrations=True,
    )
    assert [demo["kind"] for demo in dropped_missing_map["demonstrations"]] == [
        "linked_lab"
    ]
    assert any(
        "semantic_ids 非空时必须提供完整映射" in warning
        for warning in dropped_missing_map["_validation_warnings"]
    )

    for specialized_kind in ("limit_microscope", "constraint_geometry"):
        missing_math_map = copy.deepcopy(math_candidate)
        missing_math_demo = next(
            demo
            for demo in missing_math_map["demonstrations"]
            if demo["kind"] == specialized_kind
        )
        missing_math_demo["data"].pop("semantic_map")
        expect_error(missing_math_map, "semantic_ids 非空时必须提供完整映射")

    semantics_free = copy.deepcopy(candidate)
    semantics_free_field = next(
        demo
        for demo in semantics_free["demonstrations"]
        if demo["kind"] == "field_experiment"
    )
    semantics_free_field["semantic_ids"] = []
    semantics_free_field["data"].pop("semantic_map")
    semantics_free_scene = normalize_scene_spec(semantics_free, goal)
    normalized_semantics_free_field = next(
        demo
        for demo in semantics_free_scene["demonstrations"]
        if demo["kind"] == "field_experiment"
    )
    assert "semantic_map" not in normalized_semantics_free_field["data"]

    bad_reference = copy.deepcopy(candidate)
    bad_linked = next(
        demo for demo in bad_reference["demonstrations"] if demo["kind"] == "linked_lab"
    )
    bad_linked["data"]["readouts"][0]["semantic_id"] = "faraday-law"
    expect_error(bad_reference, "必须引用 demonstration.semantic_ids")

    unsafe_expression = copy.deepcopy(candidate)
    unsafe_linked = next(
        demo for demo in unsafe_expression["demonstrations"] if demo["kind"] == "linked_lab"
    )
    unsafe_linked["data"]["curves"][0]["expression"] = "window.alert(1)"
    expect_error(unsafe_expression, "使用了未声明的名称")

    malformed_expressions = {
        "2x": "表达式",
        "x**2": "幂运算请使用 ^",
        "sin()": "函数调用无效",
        "1..2*x": "表达式",
        "x+": "表达式",
    }
    for malformed_expression, expected_error in malformed_expressions.items():
        malformed = copy.deepcopy(candidate)
        malformed_linked = next(
            demo for demo in malformed["demonstrations"] if demo["kind"] == "linked_lab"
        )
        malformed_linked["data"]["curves"][0]["expression"] = malformed_expression
        expect_error(malformed, expected_error)

    wrong_parameter = copy.deepcopy(candidate)
    wrong_parameter_linked = next(
        demo for demo in wrong_parameter["demonstrations"] if demo["kind"] == "linked_lab"
    )
    wrong_parameter_linked["data"]["curves"][0]["expression"] = "a*x"
    expect_error(wrong_parameter, "当前原语未声明的变量")

    conflicting_bus = copy.deepcopy(candidate)
    conflicting_lab = copy.deepcopy(next(
        demo for demo in conflicting_bus["demonstrations"] if demo["kind"] == "linked_lab"
    ))
    conflicting_lab["id"] = "conflicting-shared-parameter"
    conflicting_lab["data"]["parameter"]["max"] = 2
    conflicting_bus["demonstrations"].append(conflicting_lab)
    expect_error(conflicting_bus, "同名共享参数 b")

    too_many_readouts = copy.deepcopy(candidate)
    readout_demo = next(
        demo for demo in too_many_readouts["demonstrations"] if demo["kind"] == "linked_lab"
    )
    base_readout = readout_demo["data"]["readouts"][0]
    readout_demo["data"]["readouts"] = [
        {**base_readout, "id": f"readout-{index}"} for index in range(5)
    ]
    expect_error(too_many_readouts, "数量必须在 1 到 4 之间")

    bad_limit = copy.deepcopy(math_candidate)
    limit_demo = next(
        demo for demo in bad_limit["demonstrations"] if demo["kind"] == "limit_microscope"
    )
    limit_demo["data"].update({"h_min": 2, "h_max": 1})
    expect_error(bad_limit, "超出允许范围")

    out_of_domain_limit = copy.deepcopy(math_candidate)
    next(
        demo for demo in out_of_domain_limit["demonstrations"] if demo["kind"] == "limit_microscope"
    )["data"].update({"x0": 2.5, "h_max": 2})
    expect_error(out_of_domain_limit, "x0+h_max")

    bad_geometry = copy.deepcopy(math_candidate)
    geometry_demo = next(
        demo for demo in bad_geometry["demonstrations"] if demo["kind"] == "constraint_geometry"
    )
    geometry_demo["data"]["fixed_angles_deg"] = [30, 30]
    expect_error(bad_geometry, "两点不能重合")

    bad_field = copy.deepcopy(candidate)
    next(
        demo for demo in bad_field["demonstrations"] if demo["kind"] == "field_experiment"
    )["data"]["turns"] = 1.5
    expect_error(bad_field, "必须是整数")

    unknown_kind = copy.deepcopy(candidate)
    unknown_kind["demonstrations"][0]["kind"] = "model_authored_script"
    expect_error(unknown_kind, "kind 不受支持")
    dropped_unknown = normalize_scene_spec(
        unknown_kind,
        goal,
        drop_invalid_demonstrations=True,
    )
    assert len(dropped_unknown["demonstrations"]) == 1
    assert dropped_unknown["demonstrations"][0]["kind"] == "linked_lab"
    assert dropped_unknown["_validation_warnings"]

    dropped_unsafe = normalize_scene_spec(
        unsafe_expression,
        goal,
        drop_invalid_demonstrations=True,
    )
    assert [demo["kind"] for demo in dropped_unsafe["demonstrations"]] == ["field_experiment"]


def _derivative_candidate_with_semantic_parts():
    candidate = scene_module.choose_offline_fixture("理解导数与瞬时变化率")
    assert candidate is not None
    derivation = next(
        block
        for section in candidate["sections"]
        for block in section["blocks"]
        if block["kind"] == "derivation"
    )
    semantic_parts = [
        [
            {"id": "lhs", "latex": "f'(x)"},
            {"id": "eq", "latex": "="},
            {"id": "rhs", "latex": "\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{h}"},
        ],
        [
            {"id": "lhs-2", "latex": "f'(x)", "from": ["lhs"], "relation": "match"},
            {"id": "eq-2", "latex": "=", "from": ["eq"]},
            {
                "id": "rhs-2",
                "latex": "\\lim_{h\\to0}(2x+h)",
                "from": ["rhs"],
                "relation": "rewrite",
                "phase": 1,
            },
        ],
        [
            {"id": "lhs-3", "latex": "f'(x)", "from": ["lhs-2"]},
            {"id": "eq-3", "latex": "=", "from": ["eq-2"]},
            {
                "id": "rhs-3",
                "latex": "2x",
                "from": ["rhs-2"],
                "relation": "derive",
                "phase": 1,
            },
        ],
    ]
    for step, parts in zip(derivation["steps"], semantic_parts):
        step["parts"] = parts
    return candidate, derivation


def check_semantic_formula_parts_contract() -> None:
    from core.boards.knowledge_scene_spec import (
        SceneValidationError,
        normalize_scene_spec,
        scene_contract_summary,
    )

    goal = "理解导数与瞬时变化率"
    candidate, _derivation = _derivative_candidate_with_semantic_parts()
    candidate["sections"][2]["blocks"][0]["steps"][0]["parts"][0]["script"] = "alert(1)"
    normalized = normalize_scene_spec(candidate, goal)
    normalized_derivation = next(
        block
        for section in normalized["sections"]
        for block in section["blocks"]
        if block["kind"] == "derivation"
    )
    parts = normalized_derivation["steps"][1]["parts"]
    assert parts[0] == {
        "id": "lhs-2",
        "latex": "f'(x)",
        "from": ["lhs"],
        "relation": "match",
        "phase": 0,
    }
    assert set(normalized_derivation["steps"][0]["parts"][0]) == {
        "id", "latex", "from", "relation", "phase",
    }
    assert "script" not in normalized_derivation["steps"][0]["parts"][0]
    assert "parts" in scene_contract_summary()["formula_step_shape"]

    relation_candidate, relation_derivation = _derivative_candidate_with_semantic_parts()
    relation_derivation["steps"] = [
        {
            "latex": "x+y=z",
            "parts": [
                {"id": "x", "latex": "x"},
                {"id": "plus", "latex": "+"},
                {"id": "y", "latex": "y"},
                {"id": "eq", "latex": "="},
                {"id": "z", "latex": "z"},
            ],
        },
        {
            "latex": "x+x+y=z",
            "parts": [
                {"id": "x-a", "latex": "x", "from": ["x"], "relation": "copy"},
                {"id": "plus-a", "latex": "+", "from": ["plus"]},
                {"id": "x-b", "latex": "x", "from": ["x"], "relation": "split", "phase": 1},
                {"id": "plus-b", "latex": "+", "phase": 1},
                {"id": "y-2", "latex": "y", "from": ["y"]},
                {"id": "eq-2", "latex": "=", "from": ["eq"]},
                {"id": "z-2", "latex": "z", "from": ["z"]},
            ],
        },
        {
            "latex": "2x+y=z",
            "parts": [
                {"id": "two-x", "latex": "2x", "from": ["x-a", "x-b"], "relation": "merge", "phase": 1},
                {"id": "plus-3", "latex": "+", "from": ["plus-a"]},
                {"id": "y-3", "latex": "y", "from": ["y-2"]},
                {"id": "eq-3", "latex": "=", "from": ["eq-2"]},
                {"id": "z-3", "latex": "z", "from": ["z-2"]},
            ],
        },
        {
            "latex": "2(z-y)+y=z",
            "parts": [
                {"id": "sub", "latex": "2(z-y)", "from": ["two-x"], "relation": "substitute", "phase": 1},
                {"id": "plus-4", "latex": "+", "from": ["plus-3"]},
                {"id": "y-4", "latex": "y", "from": ["y-3"]},
                {"id": "eq-4", "latex": "=", "from": ["eq-3"]},
                {"id": "z-4", "latex": "z", "from": ["z-3"]},
            ],
        },
    ]
    relation_normalized = normalize_scene_spec(relation_candidate, goal)
    relation_steps = next(
        block["steps"]
        for section in relation_normalized["sections"]
        for block in section["blocks"]
        if block["kind"] == "derivation"
    )
    relations = {
        part["relation"]
        for step in relation_steps
        for part in step["parts"]
    }
    assert {"appear", "match", "copy", "split", "merge", "substitute"} <= relations

    legacy = scene_module.choose_offline_fixture("解释牛顿第二定律")
    legacy_normalized = normalize_scene_spec(legacy, "解释牛顿第二定律")
    legacy_derivation = next(
        block
        for section in legacy_normalized["sections"]
        for block in section["blocks"]
        if block["kind"] == "derivation"
    )
    assert all("parts" not in step for step in legacy_derivation["steps"])

    def expect_error(mutate, message: str) -> None:
        invalid_candidate, invalid_derivation = _derivative_candidate_with_semantic_parts()
        mutate(invalid_derivation["steps"])
        try:
            normalize_scene_spec(invalid_candidate, goal)
        except SceneValidationError as exc:
            assert message in str(exc), str(exc)
        else:
            raise AssertionError(f"invalid semantic parts should fail: {message}")

    expect_error(lambda steps: steps[1].pop("parts"), "必须覆盖全部步骤")
    expect_error(
        lambda steps: steps[0]["parts"][0].__setitem__("id", "Bad ID"),
        "必须匹配",
    )
    expect_error(
        lambda steps: steps[0]["parts"][1].__setitem__("id", "lhs"),
        "id 重复",
    )
    expect_error(
        lambda steps: steps[1]["parts"][2].__setitem__("from", ["missing"]),
        "非紧邻前一步",
    )
    expect_error(
        lambda steps: steps[1]["parts"][2].__setitem__("relation", "execute"),
        "不受支持",
    )
    expect_error(
        lambda steps: steps[1]["parts"][2].__setitem__("phase", True),
        "0 到 4 的整数",
    )
    expect_error(
        lambda steps: steps[1]["parts"][2].__setitem__("relation", "merge"),
        "from 数量不匹配",
    )
    expect_error(
        lambda steps: steps[0]["parts"][0].__setitem__("latex", "g'(x)"),
        "拼接后必须等于",
    )
    expect_error(
        lambda steps: steps[0]["parts"][0].__setitem__(
            "latex", r"\href{javascript:alert(1)}{f'(x)}"
        ),
        "LaTeX",
    )
    expect_error(
        lambda steps: steps[0]["parts"][2].__setitem__("latex", r"\frac{x}{"),
        "花括号完整",
    )
    expect_error(
        lambda steps: steps[0]["parts"][2].__setitem__("latex", r"\left(x+1"),
        r"配对 \left 与 \right",
    )
    expect_error(
        lambda steps: steps[0]["parts"][2].__setitem__("latex", r"x+1\right)"),
        r"配对 \left 与 \right",
    )

    tolerant_candidate, tolerant_derivation = _derivative_candidate_with_semantic_parts()
    tolerant_derivation["steps"][0]["parts"][2]["latex"] = r"\left(x+1"
    tolerant = normalize_scene_spec(
        tolerant_candidate,
        goal,
        drop_invalid_semantics=True,
    )
    tolerant_derivation = next(
        block
        for section in tolerant["sections"]
        for block in section["blocks"]
        if block["kind"] == "derivation"
    )
    assert all("parts" not in step for step in tolerant_derivation["steps"])
    assert any("已忽略语义 parts" in warning for warning in tolerant["_validation_warnings"])
    tolerant_scene = scene_module._build_structured_manifest(
        tolerant_candidate,
        goal=goal,
        provider="coze",
    )
    assert "已安全降级 1 组无效公式语义映射" in tolerant_scene["generation"]["fallback_reason"]

    explicit_candidate = scene_module.choose_offline_fixture(goal)
    explicit_morph = next(
        demo for demo in explicit_candidate["demonstrations"]
        if demo["kind"] == "equation_morph"
    )
    explicit_morph["data"]["steps"][0]["parts"] = [
        {"id": "whole", "latex": explicit_morph["data"]["steps"][0]["latex"]}
    ]
    tolerant_explicit = normalize_scene_spec(
        explicit_candidate,
        goal,
        drop_invalid_semantics=True,
    )
    retained_morph = next(
        demo for demo in tolerant_explicit["demonstrations"]
        if demo["kind"] == "equation_morph"
    )
    assert all("parts" not in step for step in retained_morph["data"]["steps"])
    assert any("已忽略语义 parts" in warning for warning in tolerant_explicit["_validation_warnings"])


def check_remote_invalid_semantic_ids_keep_knowledge_content() -> None:
    from core.boards.knowledge_scene_spec import SceneValidationError, normalize_scene_spec

    goal = "解释贝叶斯公式中的先验、似然与后验"
    candidate = scene_module.choose_offline_fixture(goal)
    assert candidate is not None
    target_block = candidate["sections"][0]["blocks"][0]
    expected_block = copy.deepcopy(target_block)
    target_block["semantic_ids"] = ["Posterior Probability"]

    try:
        normalize_scene_spec(candidate, goal)
    except SceneValidationError as exc:
        assert "必须匹配" in str(exc), str(exc)
    else:
        raise AssertionError("strict fixture validation must reject invalid semantic_ids")

    ensure_routes()
    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-1"),
        patch.object(scene_module, "_call_coze", return_value=candidate),
        patch("core.routes.boards.require_key", return_value=None),
    ):
        response = app.test_client().post(
            "/api/learning/knowledge-scenes/generate",
            json={"goal": goal},
        )

    assert response.status_code == 200, response.get_data(as_text=True)
    scene = response.get_json()["scene"]
    assert scene["generation"]["provider"] == "coze"
    assert scene["content"]["sections"][0]["blocks"][0] == expected_block
    assert "无效 semantic_ids" in scene["generation"]["fallback_reason"]


def check_animation_patch_contract_and_fallback() -> None:
    from core.boards.knowledge_scene_spec import (
        SceneValidationError,
        normalize_animation_patch,
        normalize_scene_spec,
    )

    goal = "理解导数与瞬时变化率"
    annotated_candidate, _ = _derivative_candidate_with_semantic_parts()
    annotated_normalized = normalize_scene_spec(annotated_candidate, goal)
    section_index, block_index = next(
        (section_index, block_index)
        for section_index, section in enumerate(annotated_normalized["sections"])
        for block_index, block in enumerate(section["blocks"])
        if block["kind"] == "derivation"
    )
    annotated_steps = annotated_normalized["sections"][section_index]["blocks"][block_index]["steps"]

    candidate = copy.deepcopy(annotated_candidate)
    candidate["demonstrations"] = [
        demo for demo in candidate["demonstrations"]
        if demo["kind"] != "equation_morph"
    ]
    raw_derivation = candidate["sections"][section_index]["blocks"][block_index]
    for step in raw_derivation["steps"]:
        step.pop("parts", None)
    normalized = normalize_scene_spec(candidate, goal)

    animation_patch = {
        "patch_version": "1.0",
        "animation": {
            "title": "导数定义的关键变形",
            "steps": [
                {
                    "source_ref": f"/sections/{section_index}/blocks/{block_index}/steps/{step_index}",
                    "parts": copy.deepcopy(step["parts"]),
                }
                for step_index, step in enumerate(annotated_steps)
            ],
        },
    }
    normalized_animation = normalize_animation_patch(normalized, animation_patch)
    assert normalized_animation is not None
    assert normalized_animation["anchor_section_id"] == normalized["sections"][section_index]["id"]
    assert [step["latex"] for step in normalized_animation["steps"]] == [
        step["latex"] for step in raw_derivation["steps"]
    ]

    def expect_patch_error(mutator, message: str) -> None:
        invalid_patch = copy.deepcopy(animation_patch)
        mutator(invalid_patch)
        try:
            normalize_animation_patch(normalized, invalid_patch)
        except SceneValidationError as exc:
            assert message in str(exc), str(exc)
        else:
            raise AssertionError(f"invalid animation patch should fail: {message}")

    expect_patch_error(
        lambda value: value["animation"]["steps"][0].__setitem__("latex", "f'(x)"),
        "未知字段 latex",
    )
    expect_patch_error(
        lambda value: value["animation"]["steps"][1].__setitem__(
            "source_ref", value["animation"]["steps"][0]["source_ref"]
        ),
        "严格递增",
    )
    expect_patch_error(
        lambda value: value["animation"]["steps"][1]["parts"][2].__setitem__(
            "from", ["missing"]
        ),
        "非紧邻前一步",
    )
    expect_patch_error(
        lambda value: value["animation"]["steps"][0].__setitem__(
            "source_ref", "/sections/99/blocks/0/steps/0"
        ),
        "不存在",
    )
    assert normalize_animation_patch(
        normalized,
        {"patch_version": "1.0", "animation": None},
    ) is None

    manifest = scene_module._build_structured_manifest(
        candidate,
        goal=goal,
        provider="coze",
        animation_patch=animation_patch,
    )
    morphs = [
        demo for demo in manifest["content"]["demonstrations"]
        if demo["kind"] == "equation_morph"
    ]
    assert len(morphs) == 1
    assert morphs[0]["title"] == "导数定义的关键变形"
    assert all("parts" in step for step in morphs[0]["data"]["steps"])
    manifest_derivation = next(
        block
        for section in manifest["content"]["sections"]
        for block in section["blocks"]
        if block["kind"] == "derivation"
    )
    assert all("parts" not in step for step in manifest_derivation["steps"])

    rejected_patch = copy.deepcopy(animation_patch)
    rejected_patch["animation"]["steps"][0]["latex"] = "tamper"
    fallback_manifest = scene_module._build_structured_manifest(
        candidate,
        goal=goal,
        provider="coze",
        animation_patch=rejected_patch,
    )
    fallback_morphs = [
        demo for demo in fallback_manifest["content"]["demonstrations"]
        if demo["kind"] == "equation_morph"
    ]
    assert len(fallback_morphs) == 1
    assert all("parts" not in step for step in fallback_morphs[0]["data"]["steps"])
    assert "已安全降级 1 组" in fallback_manifest["generation"]["fallback_reason"]

    extracted_candidate, malformed_patch = scene_module._extract_workflow_outputs({
        "output": json.dumps(candidate, ensure_ascii=False),
        "animation_patch": "{not valid json",
    })
    malformed_manifest = scene_module._build_structured_manifest(
        extracted_candidate,
        goal=goal,
        provider="coze",
        animation_patch=malformed_patch,
    )
    assert malformed_manifest["generation"]["provider"] == "coze"
    assert "已安全降级 1 组" in malformed_manifest["generation"]["fallback_reason"]
    assert any(
        demo["kind"] == "equation_morph"
        for demo in malformed_manifest["content"]["demonstrations"]
    ), "malformed patch JSON must fall back without rejecting valid prose"


def check_simple_harmonic_semantic_fixture() -> None:
    from core.boards.knowledge_scene_spec import normalize_scene_spec

    goal = "理解简谐运动中位移、速度、加速度的相位关系"
    candidate = scene_module.choose_offline_fixture(goal)
    assert candidate is not None
    assert candidate["title"] == "简谐运动中的相位与极值关系"
    assert all(
        demo["kind"] != "equation_morph"
        for demo in candidate["demonstrations"]
    ), "the prose derivation must remain the single content source"

    derivation = next(
        block
        for section in candidate["sections"]
        for block in section["blocks"]
        if block["kind"] == "derivation" and len(block["steps"]) == 9
    )
    assert all("parts" in step for step in derivation["steps"])
    assert all(
        "".join(step["latex"].split())
        == "".join("".join(part["latex"] for part in step["parts"]).split())
        for step in derivation["steps"]
    )
    relations = {
        part["relation"]
        for step in derivation["steps"]
        for part in step["parts"]
    }
    assert {"appear", "match", "copy", "rewrite", "derive", "split", "merge"} <= relations
    basic_markers = ("移项", "分配律", "展开", "通分", "约分", "同项相消", "普通化简")
    assert not any(
        marker in step["note"]
        for step in derivation["steps"]
        for marker in basic_markers
    )

    normalized = normalize_scene_spec(candidate, goal)
    scene = scene_module._build_structured_manifest(
        candidate,
        goal=goal,
        provider="demo",
    )
    morphs = [
        demo
        for demo in scene["content"]["demonstrations"]
        if demo["kind"] == "equation_morph"
    ]
    normalized_derivation = next(
        block
        for section in normalized["sections"]
        for block in section["blocks"]
        if block["kind"] == "derivation" and len(block["steps"]) == 9
    )
    assert len(morphs) == 1
    assert morphs[0]["anchor_section_id"] == "derive-v-a"
    assert morphs[0]["side"] == "left"
    assert morphs[0]["data"]["steps"] == normalized_derivation["steps"]

    english_candidate = scene_module.choose_offline_fixture(
        "explain the phase of a simple harmonic oscillator"
    )
    assert english_candidate is not None
    assert english_candidate["title"] == candidate["title"]


def check_simple_harmonic_premium_scene_and_scope() -> None:
    goal = (
        "从简谐运动 x(t)=Acos(ωt+φ) 连续推导 v(t)、a(t)，分别说明外层求导、"
        "内层求导以及速度和加速度的相位关系。"
    )
    presentation_directive = "不要把普通代数整理单列成推导步骤。"

    assert scene_module.supports_simple_harmonic_motion_goal(
        goal,
        presentation_directive,
    )
    assert scene_module.supports_simple_harmonic_motion_goal(
        "Explain velocity, acceleration and phase in simple harmonic motion",
    )
    assert scene_module.supports_simple_harmonic_motion_goal(
        goal,
        "只讲速度和加速度的相位，不重复正文。",
    )
    assert not scene_module.supports_simple_harmonic_motion_goal(
        goal,
        "不要讲周期。",
    )

    excluded_goals = (
        "解释阻尼简谐振子的振幅衰减",
        "分析受迫振动的共振曲线与相位差",
        "比较两个耦合谐振子的简正模",
        "解释非线性振子的混沌现象",
        "介绍拉格朗日力学中的简谐振子",
        "只说明简谐运动的机械能守恒",
        "推导简谐运动的周期公式",
        "简谐运动的能量与速度关系",
        "已知振幅2m、角频率3rad/s，求简谐运动的最大速度",
        "简谐运动相空间中的速度与位移椭圆",
        "量子谐振子的能级与波函数",
        "由胡克定律推导弹簧振子的运动微分方程",
    )
    for excluded in excluded_goals:
        assert not scene_module.supports_simple_harmonic_motion_goal(excluded), excluded
        try:
            scene_module.generate_knowledge_scene(excluded, allow_remote=False)
        except scene_module.SceneGenerationUnavailableError:
            pass
        else:
            raise AssertionError(f"out-of-scope SHO goal must not reuse the fixture: {excluded}")

    assert not scene_module.supports_simple_harmonic_motion_goal(
        goal,
        source_text="实验测得振子周期为 1.6 s，初相位为 π/3，请按这组数据推导。",
    ), "factual source material must go through the general workflow"

    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-1"),
        patch.object(
            scene_module,
            "_call_coze",
            side_effect=AssertionError("reviewed SHO scene must precede Coze"),
        ) as call_coze,
    ):
        scene = scene_module.generate_knowledge_scene(
            goal,
            source_text=presentation_directive,
            allow_remote=True,
        )

    call_coze.assert_not_called()
    assert scene["template_id"] == "structured_scene_v2"
    assert scene["generation"]["provider"] == "demo"
    assert scene["generation"]["quality_status"] == "approved"
    assert scene["generation"]["quality_version"] == "1.7"
    assert scene["generation"]["quality_score"] == 100
    assert "未调用扣子" in scene["generation"]["fallback_reason"]
    kinds = {
        demo["kind"]
        for demo in scene["content"]["demonstrations"]
    }
    assert {"equation_morph", "function_plot"} <= kinds

    derivation = next(
        block
        for section in scene["content"]["sections"]
        for block in section["blocks"]
        if block["kind"] == "derivation" and len(block["steps"]) == 9
    )
    joined = "\n".join(step["latex"] for step in derivation["steps"])
    all_latex = "\n".join(
        step["latex"]
        for section in scene["content"]["sections"]
        for block in section["blocks"]
        if block["kind"] == "derivation"
        for step in block["steps"]
    )
    assert "v(t)" in joined
    assert "a(t)" in joined
    assert r"-\omega^2x(t)" in all_latex

    wrong_fixture = scene_module.choose_offline_fixture("解释牛顿第二定律")
    assert wrong_fixture is not None
    try:
        scene_module._build_structured_manifest(
            wrong_fixture,
            goal="解释光合作用的光反应",
            provider="demo",
        )
    except scene_module.CozeWorkflowError as exc:
        assert "质量门" in str(exc)
    else:
        raise AssertionError("offline scenes must not bypass a failed quality audit")


def check_animation_patch_spans_split_derivations() -> None:
    from core.boards.knowledge_scene_spec import normalize_scene_spec

    goal = "理解简谐运动中位移、速度、加速度的相位关系"
    source_text = (
        "简谐运动满足 x(t)=Acos(ωt+φ)，速度和加速度由对这条位移公式连续求导得到。"
    )
    annotated_candidate = scene_module.choose_offline_fixture(goal)
    assert annotated_candidate is not None
    annotated_normalized = normalize_scene_spec(annotated_candidate, goal)
    section_index, block_index = next(
        (section_index, block_index)
        for section_index, section in enumerate(annotated_normalized["sections"])
        for block_index, block in enumerate(section["blocks"])
        if block["kind"] == "derivation" and len(block["steps"]) == 9
    )
    annotated_steps = annotated_normalized["sections"][section_index]["blocks"][block_index]["steps"][:8]

    candidate = copy.deepcopy(annotated_candidate)
    plain_steps = [
        {"latex": step["latex"], "note": step.get("note", "")}
        for step in annotated_steps
    ]
    candidate["sections"][section_index]["blocks"][block_index:block_index + 1] = [
        {
            "kind": "derivation",
            "title": "由位移得到速度",
            "steps": plain_steps[:4],
        },
        {
            "kind": "derivation",
            "title": "由速度得到加速度",
            "steps": plain_steps[4:],
        },
    ]
    assert all(
        demo["kind"] != "equation_morph"
        for demo in candidate["demonstrations"]
    )

    patch_steps = []
    for step_index, step in enumerate(annotated_steps):
        target_block = block_index if step_index < 4 else block_index + 1
        target_step = step_index if step_index < 4 else step_index - 4
        patch_steps.append({
            "source_ref": (
                f"/sections/{section_index}/blocks/{target_block}/steps/{target_step}"
            ),
            "parts": copy.deepcopy(step["parts"]),
        })
    animation_patch = {
        "patch_version": "1.0",
        "animation": {
            "title": "速度与加速度的连续推导",
            "steps": patch_steps,
        },
    }

    payload = {
        "output": json.dumps(candidate, ensure_ascii=False),
        "animation_patch": json.dumps(animation_patch, ensure_ascii=False),
    }
    extracted_candidate, extracted_patch = scene_module._extract_workflow_outputs(
        json.dumps(payload, ensure_ascii=False)
    )
    assert extracted_patch == animation_patch

    with (
        patch.object(scene_module, "COZE_API_TOKEN", "test-token"),
        patch.object(scene_module, "COZE_WORKFLOW_ID", "workflow-1"),
        patch.object(
            scene_module,
            "_call_coze",
            return_value=(extracted_candidate, extracted_patch),
        ) as call_coze,
    ):
        scene = scene_module.generate_knowledge_scene(
            goal,
            source_text=source_text,
            allow_remote=True,
        )
    call_coze.assert_called_once_with(goal, source_text)

    morphs = [
        demo for demo in scene["content"]["demonstrations"]
        if demo["kind"] == "equation_morph"
    ]
    assert len(morphs) == 1, "a valid patch must suppress the per-block auto morph"
    morph = morphs[0]
    assert morph["title"] == "速度与加速度的连续推导"
    assert morph["anchor_section_id"] == candidate["sections"][section_index]["id"]
    assert [step["latex"] for step in morph["data"]["steps"]] == [
        step["latex"] for step in annotated_steps
    ]
    assert all("parts" in step for step in morph["data"]["steps"])
    source_derivations = [
        block
        for block in scene["content"]["sections"][section_index]["blocks"]
        if block["kind"] == "derivation"
    ]
    assert [len(block["steps"]) for block in source_derivations] == [4, 4]
    assert all(
        "parts" not in step
        for block in source_derivations
        for step in block["steps"]
    ), "animation metadata must not be written back into the prose source"


def check_selection_only_animation_patch_v11() -> None:
    from core.boards.knowledge_scene_spec import (
        SceneValidationError,
        normalize_animation_patch,
        normalize_scene_spec,
    )

    goal = "理解简谐运动中位移、速度、加速度的相位关系"
    annotated_candidate = scene_module.choose_offline_fixture(goal)
    assert annotated_candidate is not None
    annotated_normalized = normalize_scene_spec(annotated_candidate, goal)
    section_index, block_index = next(
        (section_index, block_index)
        for section_index, section in enumerate(annotated_normalized["sections"])
        for block_index, block in enumerate(section["blocks"])
        if block["kind"] == "derivation" and len(block["steps"]) == 9
    )
    canonical_steps = annotated_normalized["sections"][section_index]["blocks"][block_index]["steps"][:8]

    candidate = copy.deepcopy(annotated_candidate)
    plain_steps = [
        {"latex": step["latex"], "note": step.get("note", "")}
        for step in canonical_steps
    ]
    candidate["sections"][section_index]["blocks"][block_index:block_index + 1] = [
        {
            "kind": "derivation",
            "title": "由位移得到速度",
            "steps": plain_steps[:4],
        },
        {
            "kind": "derivation",
            "title": "由速度得到加速度",
            "steps": plain_steps[4:],
        },
    ]
    normalized_candidate = normalize_scene_spec(candidate, goal)
    canonical_sections = copy.deepcopy(normalized_candidate["sections"])

    source_refs = [
        (
            f"/sections/{section_index}/blocks/"
            f"{block_index if step_index < 4 else block_index + 1}/steps/"
            f"{step_index if step_index < 4 else step_index - 4}"
        )
        for step_index in range(8)
    ]
    animation_patch = {
        "patch_version": "1.1",
        "animation": {
            "title": "速度与加速度的连续推导",
            "source_refs": source_refs,
        },
    }

    normalized_animation = normalize_animation_patch(
        normalized_candidate,
        animation_patch,
    )
    assert normalized_animation is not None
    assert normalize_animation_patch(
        normalized_candidate,
        {"patch_version": "1.1", "animation": None},
    ) is None
    assert normalized_animation["anchor_section_id"] == normalized_candidate["sections"][section_index]["id"]
    assert normalized_animation["steps"] == plain_steps
    assert all("parts" not in step for step in normalized_animation["steps"])

    manifest = scene_module._build_structured_manifest(
        candidate,
        goal=goal,
        provider="coze",
        animation_patch=animation_patch,
    )
    assert manifest["content"]["sections"] == canonical_sections
    morphs = [
        demo for demo in manifest["content"]["demonstrations"]
        if demo["kind"] == "equation_morph"
    ]
    assert len(morphs) == 1
    assert morphs[0]["title"] == "速度与加速度的连续推导"
    assert morphs[0]["data"]["steps"] == plain_steps
    assert all("parts" not in step for step in morphs[0]["data"]["steps"])

    def expect_patch_error(mutator, message: str) -> dict:
        invalid_patch = copy.deepcopy(animation_patch)
        mutator(invalid_patch)
        try:
            normalize_animation_patch(normalized_candidate, invalid_patch)
        except SceneValidationError as exc:
            assert message in str(exc), str(exc)
        else:
            raise AssertionError(f"invalid selection-only patch should fail: {message}")
        return invalid_patch

    expect_patch_error(
        lambda value: value["animation"]["source_refs"].__setitem__(
            0, "/sections/99/blocks/0/steps/0"
        ),
        "不存在",
    )
    expect_patch_error(
        lambda value: value["animation"]["source_refs"].__setitem__(
            slice(0, 2), list(reversed(value["animation"]["source_refs"][:2]))
        ),
        "严格递增",
    )
    expect_patch_error(
        lambda value: value["animation"]["source_refs"].__setitem__(
            1, value["animation"]["source_refs"][0]
        ),
        "不重复",
    )
    rejected_patch = expect_patch_error(
        lambda value: value["animation"].__setitem__("parts", []),
        "未知字段 parts",
    )
    expect_patch_error(
        lambda value: value["animation"].__setitem__(
            "source_refs", value["animation"]["source_refs"][:2]
        ),
        "3 到 10",
    )
    expect_patch_error(
        lambda value: value["animation"]["source_refs"].pop(2),
        "完整覆盖",
    )
    expect_patch_error(
        lambda value: value["animation"].__setitem__(
            "source_refs",
            [
                value["animation"]["source_refs"][3],
                *value["animation"]["source_refs"][4:],
            ],
        ),
        "完整覆盖",
    )

    gapped_candidate = copy.deepcopy(candidate)
    gapped_candidate["sections"][section_index]["blocks"].insert(
        block_index + 1,
        {
            "kind": "derivation",
            "title": "与主线无关的旁支推导",
            "steps": [
                {"latex": "q=0", "note": "旁支起点"},
                {"latex": "q=1", "note": "旁支终点"},
            ],
        },
    )
    gapped_normalized = normalize_scene_spec(gapped_candidate, goal)
    gapped_patch = copy.deepcopy(animation_patch)
    gapped_patch["animation"]["source_refs"] = [
        *source_refs[:4],
        *[
            f"/sections/{section_index}/blocks/{block_index + 2}/steps/{step_index}"
            for step_index in range(4)
        ],
    ]
    try:
        normalize_animation_patch(gapped_normalized, gapped_patch)
    except SceneValidationError as exc:
        assert "推导顺序中连续" in str(exc), str(exc)
    else:
        raise AssertionError("v1.1 must reject non-adjacent derivation blocks")

    non_derivation_location = next(
        (candidate_section_index, candidate_block_index)
        for candidate_section_index, section in enumerate(normalized_candidate["sections"])
        for candidate_block_index, block in enumerate(section["blocks"])
        if block["kind"] != "derivation"
    )
    expect_patch_error(
        lambda value: value["animation"]["source_refs"].__setitem__(
            0,
            f"/sections/{non_derivation_location[0]}/blocks/{non_derivation_location[1]}/steps/0",
        ),
        "只能引用正文 derivation",
    )

    fallback_manifest = scene_module._build_structured_manifest(
        candidate,
        goal=goal,
        provider="coze",
        animation_patch=rejected_patch,
    )
    assert fallback_manifest["content"]["sections"] == canonical_sections
    fallback_morphs = [
        demo for demo in fallback_manifest["content"]["demonstrations"]
        if demo["kind"] == "equation_morph"
    ]
    assert len(fallback_morphs) == 1
    assert len(fallback_morphs[0]["data"]["steps"]) == 4
    assert all("parts" not in step for step in fallback_morphs[0]["data"]["steps"])
    assert "已安全降级 1 组" in fallback_manifest["generation"]["fallback_reason"]


def check_substantial_derivation_gets_automatic_morph() -> None:
    candidate = scene_module.choose_offline_fixture("解释牛顿第二定律")
    assert candidate is not None
    derivation = next(
        block
        for section in candidate["sections"]
        for block in section["blocks"]
        if block["kind"] == "derivation"
    )
    derivation["steps"].append({
        "latex": "m\\uparrow\\Rightarrow a\\downarrow",
        "note": "固定合力时读取反比关系",
    })
    original_demo_count = len(candidate["demonstrations"])

    scene = scene_module._build_structured_manifest(
        candidate,
        goal="解释牛顿第二定律",
        provider="coze",
    )
    morphs = [
        demo
        for demo in scene["content"]["demonstrations"]
        if demo["kind"] == "equation_morph"
    ]
    assert len(scene["content"]["demonstrations"]) == original_demo_count + 1
    assert len(morphs) == 1
    assert morphs[0]["anchor_section_id"] == "mass"
    assert morphs[0]["side"] == "left"
    assert morphs[0]["data"]["steps"] == derivation["steps"]

    two_step_candidate = scene_module.choose_offline_fixture("解释牛顿第二定律")
    two_step_scene = scene_module._build_structured_manifest(
        two_step_candidate,
        goal="解释牛顿第二定律",
        provider="coze",
    )
    assert all(
        demo["kind"] != "equation_morph"
        for demo in two_step_scene["content"]["demonstrations"]
    )

    basic_candidate = scene_module.choose_offline_fixture("解释牛顿第二定律")
    basic_derivation = next(
        block
        for section in basic_candidate["sections"]
        for block in section["blocks"]
        if block["kind"] == "derivation"
    )
    basic_derivation["steps"] = [
        {"latex": "a(b+c)", "note": "分配律"},
        {"latex": "ab+ac", "note": "展开"},
        {"latex": "ac+ab", "note": "整理计算"},
    ]
    basic_scene = scene_module._build_structured_manifest(
        basic_candidate,
        goal="解释牛顿第二定律中的基础代数整理",
        provider="coze",
    )
    assert all(
        demo["kind"] != "equation_morph"
        for demo in basic_scene["content"]["demonstrations"]
    )

    explicit_candidate = scene_module.choose_offline_fixture("理解导数与瞬时变化率")
    assert explicit_candidate is not None
    explicit_scene = scene_module._build_structured_manifest(
        explicit_candidate,
        goal="理解导数与瞬时变化率",
        provider="coze",
    )
    assert sum(
        demo["kind"] == "equation_morph"
        for demo in explicit_scene["content"]["demonstrations"]
    ) == 1

    semantic_candidate, _semantic_derivation = _derivative_candidate_with_semantic_parts()
    semantic_candidate["demonstrations"] = [
        demo for demo in semantic_candidate["demonstrations"]
        if demo["kind"] != "equation_morph"
    ]
    semantic_scene = scene_module._build_structured_manifest(
        semantic_candidate,
        goal="理解导数与瞬时变化率",
        provider="coze",
    )
    scene_derivation = next(
        block
        for section in semantic_scene["content"]["sections"]
        for block in section["blocks"]
        if block["kind"] == "derivation"
    )
    semantic_morph = next(
        demo for demo in semantic_scene["content"]["demonstrations"]
        if demo["kind"] == "equation_morph"
    )
    assert semantic_morph["data"]["steps"] == scene_derivation["steps"]
    assert semantic_morph["data"]["steps"] is not scene_derivation["steps"]
    assert semantic_morph["data"]["steps"][0]["parts"] is not scene_derivation["steps"][0]["parts"]
    assert semantic_morph["data"]["steps"][1]["parts"][2]["relation"] == "rewrite"


def check_remote_manifest_drops_only_unsafe_demo() -> None:
    candidate = scene_module.choose_offline_fixture("解释牛顿第二定律")
    original_count = len(candidate["demonstrations"])
    candidate["demonstrations"][1]["data"]["series"][0]["expression"] = "window.x"

    scene = scene_module._build_structured_manifest(
        candidate,
        goal="解释牛顿第二定律",
        provider="coze",
    )

    assert scene["generation"]["provider"] == "coze"
    assert len(scene["content"]["demonstrations"]) == original_count - 1
    assert "安全忽略 1 个" in scene["generation"]["fallback_reason"]


def check_missing_metadata_uses_safe_text_fallbacks() -> None:
    from core.boards.knowledge_scene_spec import normalize_scene_spec

    candidate = scene_module.choose_offline_fixture("理解贝叶斯公式与条件概率")
    candidate["subject"] = None
    candidate["topic"] = {"unexpected": True}
    candidate.pop("title", None)

    goal = "理解贝叶斯公式与条件概率"
    normalized = normalize_scene_spec(candidate, goal)
    assert normalized["subject"] == "综合学科"
    assert normalized["topic"] == goal
    assert normalized["title"] == goal


def check_validator_rejects_unsafe_content() -> None:
    from core.boards.knowledge_scene_spec import SceneValidationError, normalize_scene_spec

    candidate = scene_module.choose_offline_fixture("理解贝叶斯公式与条件概率")
    candidate["sections"][1]["blocks"][1]["steps"][0]["latex"] = r"\\href{javascript:alert(1)}{x}"
    try:
        normalize_scene_spec(candidate, "理解贝叶斯公式")
    except SceneValidationError as exc:
        assert "LaTeX" in str(exc)
    else:
        raise AssertionError("unsafe LaTeX should be rejected")

    candidate = scene_module.choose_offline_fixture("解释牛顿第二定律")
    candidate["demonstrations"][1]["data"]["series"][0]["expression"] = "window.x"
    try:
        normalize_scene_spec(candidate, "解释牛顿第二定律")
    except SceneValidationError as exc:
        assert "未声明" in str(exc) or "表达式" in str(exc) or "字符" in str(exc)
    else:
        raise AssertionError("unsafe expression should be rejected")


if __name__ == "__main__":
    check_local_fallback()
    check_lagrange_premium_scene()
    check_calculus_area_premium_scene_and_scope()
    check_riemann_sum_quality_gate()
    check_coze_contract()
    check_writer_request_requirements()
    check_constrained_extremum_primitive()
    check_nested_coze_output()
    check_example_step_can_be_formula_only()
    check_function_plot_caps_visual_channels()
    check_learning_action_primitives()
    check_semantic_formula_parts_contract()
    check_remote_invalid_semantic_ids_keep_knowledge_content()
    check_animation_patch_contract_and_fallback()
    check_simple_harmonic_semantic_fixture()
    check_simple_harmonic_premium_scene_and_scope()
    check_animation_patch_spans_split_derivations()
    check_selection_only_animation_patch_v11()
    check_substantial_derivation_gets_automatic_morph()
    check_remote_manifest_drops_only_unsafe_demo()
    check_missing_metadata_uses_safe_text_fallbacks()
    check_validator_rejects_unsafe_content()
    print("OK: cross-subject scenes, Coze v2 contract and safety checks passed.")
