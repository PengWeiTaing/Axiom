"""Focused contract checks for the safe Riemann-sum demonstration primitive."""
from __future__ import annotations

import copy
import os
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

os.environ.setdefault("AXIOM_ROOT", str(REPO_ROOT))
os.environ.setdefault("AXIOM_SECRET_KEY", "demo-key")

from core.boards.knowledge_scene_fixtures import choose_offline_fixture  # noqa: E402
from core.boards.knowledge_scene_spec import (  # noqa: E402
    SceneValidationError,
    normalize_scene_spec,
    scene_contract_summary,
)


GOAL = "riemann-sum-fixture"


def expect_error(candidate: dict, expected: str) -> None:
    try:
        normalize_scene_spec(candidate, GOAL)
    except SceneValidationError as exc:
        assert expected in str(exc), str(exc)
    else:
        raise AssertionError(f"expected SceneValidationError containing {expected!r}")


def main() -> None:
    renderer_source = (
        REPO_ROOT / "frontend" / "board" / "src" / "knowledge-scene" / "RiemannSum.tsx"
    ).read_text(encoding="utf-8")
    switch_source = (
        REPO_ROOT / "frontend" / "board" / "src" / "knowledge-scene" / "StructuredKnowledgeScene.tsx"
    ).read_text(encoding="utf-8")
    assert "data-kind=\"riemann_sum\"" in renderer_source
    assert "KnowledgeTimelineControls" in renderer_source
    assert "type=\"range\"" in renderer_source
    assert "dangerouslySetInnerHTML" not in renderer_source
    assert "case 'riemann_sum':" in switch_source

    contract = scene_contract_summary()
    assert "riemann_sum" in contract["demonstration_kinds"]
    shape = contract["demonstration_shapes"]["riemann_sum"]
    assert "n_initial" in shape and "n_min" in shape and "n_max" in shape
    assert "integral_value" not in shape.lower()
    assert "path" in shape.lower() and "renderer-computed" in shape

    fixture = choose_offline_fixture(GOAL)
    assert fixture is not None
    normalized = normalize_scene_spec(fixture, GOAL)
    demo = normalized["demonstrations"][0]
    assert demo["kind"] == "riemann_sum"
    assert demo["data"] == {
        "mode": "area_under_curve",
        "expression": "x^2",
        "domain": [0.0, 2.0],
        "range": [0.0, 4.4],
        "n_initial": 8,
        "n_min": 2,
        "n_max": 64,
        "sample": "midpoint",
        "duration_ms": 11000,
        "semantic_map": {
            "curve": "integrand-curve",
            "rectangles": "riemann-rectangles",
            "area": "signed-area",
            "limit": "integral-limit",
        },
    }

    # The model may describe the safe expression and viewport, but never SVG
    # geometry, executable code, precomputed rectangles or an asserted answer.
    injected = copy.deepcopy(fixture)
    injected_data = injected["demonstrations"][0]["data"]
    injected_data.update({
        "script": "window.alert(1)",
        "svg_path": "M0,0 L10,10",
        "rectangles": [{"x": 0, "height": 999}],
        "integral_value": 123456,
    })
    safe = normalize_scene_spec(injected, GOAL)["demonstrations"][0]["data"]
    assert set(safe) == {
        "mode", "expression", "domain", "range", "n_initial", "n_min",
        "n_max", "sample", "duration_ms", "semantic_map",
    }

    expanded = copy.deepcopy(fixture)
    expanded["demonstrations"][0]["data"]["range"] = [1, 5]
    assert normalize_scene_spec(expanded, GOAL)["demonstrations"][0]["data"]["range"] == [0.0, 5.0]

    unsafe = copy.deepcopy(fixture)
    unsafe["demonstrations"][0]["data"]["expression"] = "window.alert(x)"
    # Some legacy validation messages in this file were committed with a
    # non-UTF-8 source encoding; assert the stable field path instead.
    expect_error(unsafe, "demonstrations[0].data.expression")

    static = copy.deepcopy(fixture)
    static["demonstrations"][0]["data"]["n_initial"] = 64
    expect_error(static, "必须小于 n_max")

    oversized = copy.deepcopy(fixture)
    oversized["demonstrations"][0]["data"]["n_max"] = 129
    expect_error(oversized, "超出允许范围")

    bad_sample = copy.deepcopy(fixture)
    bad_sample["demonstrations"][0]["data"]["sample"] = "random"
    expect_error(bad_sample, "left、midpoint 或 right")

    missing_map = copy.deepcopy(fixture)
    missing_map["demonstrations"][0]["data"].pop("semantic_map")
    expect_error(missing_map, "必须提供完整映射")

    print("OK: safe riemann_sum contract, fixture and injection rejection passed.")


if __name__ == "__main__":
    main()
