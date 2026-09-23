"""守护 Atlas 的功能契约，不锁死它的构图。

这里断言的是"3D 场景、2D 聚焦、关系治理入口仍然存在且可被测试驱动"，
以及"调试期的网格、滑杆、骨架图不再回来"。分栏高度一类的像素构图
交给 docs/FRONTEND_ART_DIRECTION.md 演进，不在这里固化。
"""

from __future__ import annotations

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ATLAS_VIEW = ROOT / "frontend" / "src" / "views" / "AtlasView.vue"


def main() -> int:
    text = ATLAS_VIEW.read_text(encoding="utf-8")
    errors: list[str] = []

    required = (
        "fitCameraToGraph",
        "relaxLocalLayout",
        "localViewBox",
        "selectedLocalRelation",
        'data-testid="atlas-3d-scene"',
        'data-testid="local-atlas-2d"',
        'data-testid="relation-create"',
        'data-testid="relation-editor"',
        'data-testid="relation-accept"',
        'data-testid="relation-delete"',
        "canGovernRelation(selectedLocalRelation)",
    )
    for fragment in required:
        if fragment not in text:
            errors.append(f"Atlas visual contract is missing: {fragment}")

    retired = (
        "GridHelper",
        "frontend_atlas_affinity_mesh",
        'class="local-grid"',
        'class="zoom-range"',
        'viewBox="-400 -270 800 540"',
        "3D Skeleton Atlas",
        "AssociationEditDialog",
    )
    for fragment in retired:
        if fragment in text:
            errors.append(f"retired Atlas visual pattern returned: {fragment}")

    if errors:
        print("Atlas visual contract failed")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Atlas visual contract passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
