"""Offline regression checks for the deterministic benchmark oracle."""
from __future__ import annotations

from copy import deepcopy

from benchmark_knowledge_scene import (
    CatalogError,
    evaluate_correctness_item,
    load_catalog,
    normalize_text,
    scene_text,
    scene_text_scopes,
    text_scopes,
    validate_catalog,
)


MIGRATED_CASES = {"P01", "P02", "P04", "C01", "C03", "B03"}


def _item(cases: dict[str, dict], case_id: str, item_id: str) -> dict:
    return next(
        item
        for item in cases[case_id]["correctness"]
        if item["id"] == item_id
    )


def _passes(item: dict, text: str) -> bool:
    passed, _ = evaluate_correctness_item(
        item,
        normalize_text(text),
        text_scopes(text),
    )
    return passed


def _scene_passes(item: dict, scene: dict) -> bool:
    passed, _ = evaluate_correctness_item(
        item,
        scene_text(scene),
        scene_text_scopes(scene),
    )
    return passed


def main() -> None:
    catalog = load_catalog()
    validated = validate_catalog(catalog)
    cases = {case["id"]: case for case in validated}

    for case_id in MIGRATED_CASES:
        for item in cases[case_id]["correctness"]:
            assert any(key in item for key in ("typed", "typed_all", "typed_any")), (
                case_id,
                item["id"],
            )
            assert item.get("oracle_examples"), (case_id, item["id"])

    # Preserve the exact approved-1.7 P01 block shape that originally exposed
    # the benchmark false negative.  Presentation wrappers must not erase or
    # alter the arithmetic operator/order/result.
    p01_scene = {
        "title": "水平受力与加速度",
        "topic": "牛顿第二定律",
        "subject": "物理",
        "content": {
            "sections": [{
                "id": "example",
                "heading": "先定正方向，再合成水平力",
                "blocks": [{
                    "kind": "example",
                    "prompt": "质量 2 kg 的物体只受向右 10 N 拉力和向左 4 N 摩擦力。",
                    "result": "合力为 6 N，方向向右；加速度为 3 m/s²，方向向右。",
                    "steps": [
                        {
                            "latex": r"F_{\mathrm{net}}=10\,\mathrm{N}-4\,\mathrm{N}=6\,\mathrm{N}",
                            "text": "取向右为正，水平方向合力为 6 N，方向向右。",
                        },
                        {
                            "latex": r"a=\frac{F_{\mathrm{net}}}{m}=\frac{6\,\mathrm{N}}{2\,\mathrm{kg}}=3\,\mathrm{m/s^2}",
                            "text": "由 a=F_net/m，得到加速度为 3 m/s²，方向向右。",
                        },
                    ],
                }],
            }],
            "summary": [],
        },
    }
    assert all(
        _scene_passes(item, p01_scene)
        for item in cases["P01"]["correctness"]
    )
    subtraction = _item(cases, "P01", "subtraction")
    assert not _passes(subtraction, "F_net=10 N+4 N=14 N")
    assert not _passes(subtraction, "F_net=4 N-10 N=-6 N")
    assert not _passes(subtraction, "F_net=10 N-4 N=-6 N")

    wrong_direction_scene = deepcopy(p01_scene)
    wrong_block = wrong_direction_scene["content"]["sections"][0]["blocks"][0]
    wrong_block["result"] = wrong_block["result"].replace("方向向右", "方向向左")
    for step in wrong_block["steps"]:
        step["text"] = step["text"].replace("方向向右", "方向向左")
    assert _scene_passes(subtraction, wrong_direction_scene)
    assert not _scene_passes(
        _item(cases, "P01", "net-force"),
        wrong_direction_scene,
    )
    assert not _scene_passes(
        _item(cases, "P01", "acceleration"),
        wrong_direction_scene,
    )

    # Numeric tokens must be complete and bound to the nearest named quantity.
    assert not _passes(_item(cases, "P01", "acceleration"), "a=30 m/s²，方向向右")
    assert not _passes(
        _item(cases, "P01", "net-force"),
        "合力 6 N 向左，加速度 3 m/s² 向右",
    )
    assert not _passes(
        _item(cases, "P01", "acceleration"),
        "合力 6 N 向右，加速度 3 m/s² 向左",
    )
    assert not _passes(_item(cases, "P04", "height"), "H=50 m")
    assert not _passes(_item(cases, "C01", "ph"), "pKa=4.76，但 pH=5.76")
    assert not _passes(_item(cases, "C03", "cell-voltage"), "电池电势为 11.10 V")

    # Equivalent units and conventional exact/decimal forms remain accepted.
    assert _passes(_item(cases, "P02", "emf"), "感应电动势为 -350 mV")
    assert _passes(_item(cases, "P04", "range"), r"射程为 20\sqrt{3}\,\mathrm{m}")
    assert _passes(_item(cases, "C03", "cell-voltage"), "E°cell=1100 mV")

    # Objects and directions must be linked locally; polarity is significant.
    assert not _passes(
        _item(cases, "C03", "electron-direction"),
        "电子涉及 Zn 和 Cu，但实际从 Cu 流向 Zn",
    )
    assert not _passes(
        _item(cases, "B03", "sodium"),
        "Na+ 外流、K+ 内流造成去极化",
    )
    assert not _passes(
        _item(cases, "P02", "emf"),
        "电动势为 +0.35 V，方向顺时针",
    )

    # A correct negative statement is not itself the forbidden claim.
    assert _passes(
        _item(cases, "C03", "no-electron-salt-bridge"),
        "电子不通过盐桥",
    )
    assert not _passes(
        _item(cases, "C03", "no-electron-salt-bridge"),
        "电子不通过盐桥，却又通过盐桥",
    )
    assert _passes(
        _item(cases, "B03", "pump-role"),
        "钠钾泵维持离子梯度，并不直接导致快速复极化",
    )

    # Prove --validate-cases is coupled to the examples, rather than merely
    # compiling their regexes.
    broken = deepcopy(catalog)
    broken_cases = {case["id"]: case for case in broken["cases"]}
    broken_item = _item(broken_cases, "P04", "height")
    broken_item["oracle_examples"]["accept"].append("H=50 m")
    try:
        validate_catalog(broken)
    except CatalogError as exc:
        assert "oracle_examples.accept" in str(exc)
    else:
        raise AssertionError("validate_catalog did not execute oracle_examples")

    print("knowledge scene benchmark oracle smoke: OK")


if __name__ == "__main__":
    main()
