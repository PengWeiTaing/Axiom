"""Guard the Living Folio frontend language against visual regression."""

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
            "Axiom / Living Folio",
            "--surface-0: #e8eae5",
            "--focus: #b24d37",
            "--accent: #587363",
            "--cobalt: #315d82",
            "--vermilion: #b24d37",
            "--r-3: 4px",
            "--app-header-height: 74px",
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
            "function seeded(index: number, salt: number)",
            "A deterministic fibre field",
            "mix-blend-mode: multiply",
            ".axiom-atmosphere.is-atlas",
        ),
        FRONTEND / "components" / "AppNavigation.vue": (
            "app-header-height",
            "index-sheet",
            "function openSearch()",
            "capture-link",
        ),
        FRONTEND / "components" / "QuickCapture.vue": (
            "先接住，再理解。",
            '<section class="capture-plane"',
            ".capture-editor textarea",
        ),
        FRONTEND / "views" / "TodayView.vue": (
            "focus-spread",
            "week-score",
            "context-field",
            "recent-trace",
        ),
        FRONTEND / "views" / "SearchView.vue": (
            "function scheduleSearch()",
            "recall-line",
            "result-section",
            "library-query:focus-visible",
        ),
        FRONTEND / "views" / "AtlasView.vue": (
            "scene.background = new Color(0x090a08)",
            "if (node.type === 'root') return 3.5 * boost",
            "vector-effect: non-scaling-stroke",
            ".local-edges path.structural.secondary",
            "the map owns the viewport; controls read like museum captions",
        ),
        ROOT / "docs" / "FRONTEND_ART_DIRECTION.md": (
            "# Axiom 前端艺术方向：活页",
            "## 低摩擦原则",
            "## 核心产品空间",
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
