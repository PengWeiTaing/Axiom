"""Guard the user-facing Axiom product shell against workspace sprawl."""

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
    errors.extend(
        require(
            FRONTEND / "components" / "AppNavigation.vue",
            (
                "{ key: 'today', label: '此刻'",
                "{ key: 'library', label: '资料库'",
                "{ key: 'atlas', label: 'Atlas'",
                "<span>记录</span>",
                "<span>索引</span>",
                "function openSearch()",
            ),
        )
    )
    errors.extend(
        require(
            FRONTEND / "stores" / "mode.ts",
            (
                "export type PrimaryMode = 'today' | 'library' | 'atlas'",
                "if (requested === 'capture') return 'today'",
                "if (requested === 'search') return 'library'",
            ),
        )
    )
    errors.extend(
        require(
            ROOT / "docs" / "PRODUCT_MODEL.md",
            ("**此刻**", "**资料库**", "**Atlas**", "**记录**"),
        )
    )

    retired = (
        FRONTEND / "components" / "ModeSwitcher.vue",
        FRONTEND / "components" / "FloatChat.vue",
        FRONTEND / "components" / "SearchOverlay.vue",
        FRONTEND / "views" / "CaptureView.vue",
    )
    errors.extend(
        f"retired workspace shell returned: {path.relative_to(ROOT)}"
        for path in retired
        if path.exists()
    )

    nav_text = (FRONTEND / "components" / "AppNavigation.vue").read_text(encoding="utf-8")
    for competition_surface in ("MemoryGuard", "Learning Board", "白板"):
        if competition_surface in nav_text:
            errors.append(f"competition surface leaked into primary shell: {competition_surface}")

    if errors:
        print("Axiom product shell guard failed")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Axiom product shell guard passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
