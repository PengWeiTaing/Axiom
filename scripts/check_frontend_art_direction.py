"""Guard the Night Field frontend language against visual regression."""

from __future__ import annotations

import re
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


def forbid(path: Path, fragments: tuple[str, ...]) -> list[str]:
    if not path.exists():
        return []
    text = path.read_text(encoding="utf-8")
    return [
        f"{path.relative_to(ROOT)} contains forbidden art direction: {fragment}"
        for fragment in fragments
        if fragment in text
    ]


def main() -> int:
    errors: list[str] = []
    contracts = {
        FRONTEND / "styles" / "tokens.css": (
            "Axiom / Night Field",
            "color-scheme: dark",
            "--surface-0: #0b0e0c",
            "--text-1: #f2f1eb",
            "--focus: #d36d52",
            "--accent: #8ea797",
            "--cobalt: #7ca4c8",
            "--r-3: 6px",
            "--app-header-height: 68px",
            '"Inter Variable", "Noto Sans SC Variable"',
            "--font-display: var(--font-ui)",
            "--font-mono: var(--font-ui)",
        ),
        FRONTEND / "styles" / "base.css": (
            "letter-spacing: 0 !important",
            "font-optical-sizing: auto",
            "font-synthesis: none",
            "font-weight: 450",
            "font-weight: 620",
            'font-feature-settings: "tnum" 1, "case" 1',
            "@media (prefers-reduced-motion: reduce)",
        ),
        FRONTEND / "main.ts": (
            "import '@fontsource-variable/inter'",
            "import '@fontsource-variable/noto-sans-sc'",
        ),
        ROOT / "frontend" / "package.json": (
            '"@fontsource-variable/inter"',
            '"@fontsource-variable/noto-sans-sc"',
        ),
        ROOT / "frontend" / "THIRD_PARTY_NOTICES.md": (
            "Inter Variable",
            "Noto Sans SC Variable",
            "licenses/Inter-OFL-1.1.txt",
            "licenses/NotoSansSC-OFL-1.1.txt",
        ),
        ROOT / "frontend" / "licenses" / "Inter-OFL-1.1.txt": (
            "SIL OPEN FONT LICENSE Version 1.1",
            "The Inter Project Authors",
        ),
        ROOT / "frontend" / "licenses" / "NotoSansSC-OFL-1.1.txt": (
            "SIL OPEN FONT LICENSE Version 1.1",
            "Google Inc.",
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
            "Sparse graphite grain keeps the field tactile",
            ".axiom-atmosphere.is-atlas",
        ),
        FRONTEND / "components" / "AppNavigation.vue": (
            "app-header-height",
            "index-sheet",
            "function openSearch()",
            "capture-link",
        ),
        FRONTEND / "components" / "KeyGate.vue": (
            "回来，继续。",
            "PRIVATE ACCESS / 01",
            "LOCAL FIRST",
        ),
        FRONTEND / "components" / "QuickCapture.vue": (
            "先接住，再理解。",
            '<section class="capture-plane"',
            ".capture-editor textarea",
        ),
        FRONTEND / "views" / "TodayView.vue": (
            "focus-spread",
            "min-height: min(420px, calc(100vh - 250px))",
            "week-score",
            "context-field",
        ),
        FRONTEND / "views" / "SearchView.vue": (
            "function scheduleSearch()",
            "recall-line",
            "result-section",
            "library-query:focus-visible",
        ),
        FRONTEND / "views" / "TasksView.vue": (
            "行动索引",
            '<details class="panel create-panel">',
            "今天与逾期",
            "行动档案",
        ),
        FRONTEND / "views" / "MemoriesView.vue": (
            "记忆索引",
            '<details class="panel create-panel">',
            "长期记忆",
        ),
        FRONTEND / "views" / "DecisionsView.vue": (
            "决定索引",
            '<details class="panel create-panel">',
            "选择与结果",
        ),
        FRONTEND / "views" / "RecentView.vue": (
            "最近记录",
            "处理积压",
            "自动化产物",
        ),
        FRONTEND / "components" / "ItemDrawer.vue": (
            "原始记录",
            "记录信息",
            "background: rgba(0, 0, 0, 0.64)",
        ),
        FRONTEND / "components" / "ObjectDrawer.vue": (
            " / CONTEXT",
            'class="context-link"',
            "background: rgba(0, 0, 0, 0.64)",
        ),
        FRONTEND / "views" / "AtlasView.vue": (
            "scene.background = new Color(0x090a08)",
            "if (node.type === 'root') return 4.1 * boost",
            "node.layer === 2 && node.weight >= 0.72",
            "vector-effect: non-scaling-stroke",
            ".local-edges path.structural.secondary",
            "the map owns the viewport; controls read like museum captions",
        ),
        ROOT / "docs" / "FRONTEND_ART_DIRECTION.md": (
            "# Axiom 前端艺术方向：夜间认知场",
            "## 低摩擦原则",
            "## 核心产品空间",
            "## 必须避免",
        ),
    }

    for path, fragments in contracts.items():
        errors.extend(require(path, fragments))

    native_dark_surfaces = (
        FRONTEND / "components" / "AppNavigation.vue",
        FRONTEND / "components" / "KeyGate.vue",
        FRONTEND / "components" / "QuickCapture.vue",
        FRONTEND / "components" / "ItemDrawer.vue",
        FRONTEND / "components" / "ObjectDrawer.vue",
        FRONTEND / "views" / "TodayView.vue",
        FRONTEND / "views" / "SearchView.vue",
        FRONTEND / "views" / "TasksView.vue",
        FRONTEND / "views" / "MemoriesView.vue",
        FRONTEND / "views" / "DecisionsView.vue",
        FRONTEND / "views" / "ProcessingView.vue",
        FRONTEND / "views" / "RecentView.vue",
        FRONTEND / "views" / "TimelineView.vue",
        FRONTEND / "views" / "AutomationView.vue",
        FRONTEND / "views" / "SystemView.vue",
    )
    for path in native_dark_surfaces:
        text = path.read_text(encoding="utf-8")
        if "font-size: clamp(" in text:
            errors.append(f"viewport-scaled type returned: {path.relative_to(ROOT)}")
        if re.search(r"font-size:\s*(?:8|9|10)px", text):
            errors.append(f"sub-11px interface type returned: {path.relative_to(ROOT)}")
        errors.extend(
            forbid(
                path,
                (
                    "radial-gradient(",
                    "linear-gradient(",
                    "backdrop-filter: blur",
                    "rgba(13, 17, 22, 0.74)",
                    "rgba(13, 17, 22, 0.78)",
                    "rgba(13, 17, 22, 0.82)",
                ),
            )
        )

    errors.extend(
        forbid(
            FRONTEND / "styles" / "tokens.css",
            (
                "color-scheme: light",
                "--surface-0: #e8eae5",
                "Iowan Old Style",
                "Source Han Serif SC",
                "Noto Serif CJK SC",
                "Songti SC",
                "Georgia, serif",
            ),
        )
    )

    recent_text = (FRONTEND / "views" / "RecentView.vue").read_text(encoding="utf-8")
    for competition_surface in ("Learning Board", "学习白板", "listLearningBoards"):
        if competition_surface in recent_text:
            errors.append(f"competition surface returned to Axiom recent view: {competition_surface}")

    if errors:
        print("Axiom frontend art-direction guard failed")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Axiom frontend art-direction guard passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
