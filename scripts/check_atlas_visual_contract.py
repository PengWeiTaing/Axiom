"""Guard the Atlas visual language against the previous debug-style layout."""

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
        "selectedLocalRelation",
        'data-testid="atlas-3d-scene"',
        'data-testid="local-atlas-2d"',
    )
    for fragment in required:
        if fragment not in text:
            errors.append(f"Atlas visual contract is missing: {fragment}")

    retired = (
        "GridHelper",
        "frontend_atlas_affinity_mesh",
        'class="local-grid"',
        'class="zoom-range"',
        "3D Skeleton Atlas",
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
