"""Guard the Ink & Light frontend language against visual regression."""

from __future__ import annotations

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FRONTEND = ROOT / "frontend" / "src"


def require(path: Path, fragments: tuple[str, ...]) -> list[str]:
    if not path.exists():
        return [f"missing required file: {path.relative_to(ROOT)}"]
    text = path.read_text(encoding="utf-8")
    return [
        f"{path.relative_to(ROOT)} is missing: {fragment}"
        for fragment in fragments
        if fragment not in text
    ]


def main() -> int:
    errors: list[str] = []
    contracts = {
        FRONTEND / "styles" / "tokens.css": (
            "Axiom / Ink & Light",
            "--surface-0: #0a0a09",
            "--focus: #e1a558",
            "--accent: #86ad9e",
            "--cobalt: #7388ad",
            "--vermilion: #c66f58",
            "--r-3: 8px",
            "--app-rail-width: 88px",
        ),
        FRONTEND / "styles" / "base.css": (
            "letter-spacing: 0 !important",
            "@media (prefers-reduced-motion: reduce)",
        ),
        FRONTEND / "App.vue": (
            "import AxiomAtmosphere",
            '<AxiomAtmosphere :mode="mode.mode" />',
            "mode-enter-from",
            "atlas-stage",
        ),
        FRONTEND / "components" / "AxiomAtmosphere.vue": (
            'ref="canvas"',
            "timestamp - lastPaint < 48",
            "prefers-reduced-motion: reduce",
            ".axiom-atmosphere.is-atlas",
        ),
        FRONTEND / "components" / "AppNavigation.vue": (
            "app-rail-width",
            'data-mode="capture"',
            "capture-icon",
        ),
        FRONTEND / "components" / "QuickCapture.vue": (
            "写下正在占据你注意力的事",
            '<div class="quick-card"',
            ".quick-card textarea",
        ),
        FRONTEND / "views" / "TodayView.vue": (
            "AXIOM / NOW",
            "focus-number",
            "the Now surface behaves like a scroll, not a dashboard",
        ),
        FRONTEND / "views" / "SearchView.vue": (
            "ARCHIVE / 02",
            "library-index",
            "recall is treated as an index room, not a form dashboard",
        ),
        FRONTEND / "views" / "AtlasView.vue": (
            "scene.background = new Color(0x090a08)",
            "if (node.type === 'root') return 3.5 * boost",
            "vector-effect: non-scaling-stroke",
            ".local-edges path.structural.secondary",
            "the map owns the viewport; controls read like museum captions",
        ),
        ROOT / "docs" / "FRONTEND_ART_DIRECTION.md": (
            "# Axiom 前端艺术方向：墨与光",
            "## 产品空间",
            "## 动效逻辑",
            "## 必须避免",
        ),
    }

    for path, fragments in contracts.items():
        errors.extend(require(path, fragments))

    fixed_type_surfaces = (
        FRONTEND / "components" / "AppNavigation.vue",
        FRONTEND / "components" / "KeyGate.vue",
        FRONTEND / "components" / "QuickCapture.vue",
        FRONTEND / "views" / "TodayView.vue",
        FRONTEND / "views" / "SearchView.vue",
        FRONTEND / "views" / "AtlasView.vue",
    )
    for path in fixed_type_surfaces:
        text = path.read_text(encoding="utf-8")
        if "font-size: clamp(" in text:
            errors.append(f"viewport-scaled type returned: {path.relative_to(ROOT)}")

    if errors:
        print("Axiom frontend art-direction guard failed")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Axiom frontend art-direction guard passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
