"""Zero-dependency regression checks for the learning-board theme contract.

This smoke test deliberately does not start the app or call the generation API.
It protects the source-to-build contract that keeps the competition shell,
structured scenes, and same-origin static scene iframes on one theme.
"""

from __future__ import annotations

import re
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
BOARD_ROOT = REPO_ROOT / "frontend" / "board"
SOURCE_INDEX = BOARD_ROOT / "index.html"
APP_SOURCE = BOARD_ROOT / "src" / "App.tsx"
STRUCTURED_SOURCE = (
    BOARD_ROOT / "src" / "knowledge-scene" / "StructuredKnowledgeScene.tsx"
)
COMPETITION_CSS = BOARD_ROOT / "src" / "styles" / "competition.css"
STRUCTURED_CSS = (
    BOARD_ROOT / "src" / "knowledge-scene" / "knowledge-scene.css"
)
PUBLIC_SCENE_ROOT = BOARD_ROOT / "public" / "knowledge-scenes"
BUILD_ROOT = REPO_ROOT / "core" / "static" / "board"
BUILD_INDEX = BUILD_ROOT / "index.html"

THEME_STORAGE_KEY = "axiom.scene.theme"
PARENT_TO_SCENE_MESSAGE = "axiom:set-scene-theme"
PREMIUM_SCENES = ("calculus-area.html", "lagrange-multiplier.html")


def read_text(path: Path) -> str:
    assert path.is_file(), f"missing required file: {path.relative_to(REPO_ROOT)}"
    return path.read_text(encoding="utf-8")


def require(text: str, needle: str, context: str) -> None:
    assert needle in text, f"{context}: missing {needle!r}"


def require_regex(text: str, pattern: str, context: str) -> re.Match[str]:
    match = re.search(pattern, text, flags=re.DOTALL)
    assert match is not None, f"{context}: missing pattern {pattern!r}"
    return match


def assert_source_index_prepaints_saved_theme() -> None:
    source = read_text(SOURCE_INDEX)
    context = "frontend/board/index.html pre-paint theme"

    require(source, THEME_STORAGE_KEY, context)
    require(source, "document.documentElement.dataset.axiomTheme", context)
    require_regex(
        source,
        r"getItem\(['\"]axiom\.scene\.theme['\"]\)\s*===\s*['\"]light['\"]"
        r"\s*\?\s*['\"]light['\"]\s*:\s*['\"]dark['\"]",
        context,
    )
    require_regex(
        source,
        r"html\[data-axiom-theme=['\"]light['\"]\].*?background:\s*#fff(?:fff)?",
        context,
    )
    require_regex(
        source,
        r"html\[data-axiom-theme=['\"]dark['\"]\].*?background:\s*#0b0f13",
        context,
    )

    prepaint_position = source.index("document.documentElement.dataset.axiomTheme")
    app_entry_position = source.index('/src/main.tsx')
    assert prepaint_position < app_entry_position, (
        f"{context}: saved theme must be applied before the React entry loads"
    )


def assert_parent_theme_protocol() -> None:
    source = read_text(APP_SOURCE)
    context = "frontend/board/src/App.tsx parent theme protocol"

    for marker in (
        THEME_STORAGE_KEY,
        PARENT_TO_SCENE_MESSAGE,
        "sceneFrameRef",
        "syncThemeToFrame",
        "removeLegacyFrameThemeControls",
        "handleSceneFrameLoad",
    ):
        require(source, marker, context)

    theme_toggle_count = source.count('className="competition-theme-toggle"')
    assert theme_toggle_count == 1, (
        f"{context}: expected exactly one shell theme control, found "
        f"{theme_toggle_count}"
    )

    require_regex(
        source,
        r"setSceneThemeState\(theme\).*?persistSceneTheme\(theme\)",
        context,
    )
    require_regex(
        source,
        r"contentWindow\?\.postMessage\(\s*"
        r"\{\s*type:\s*SET_SCENE_THEME_MESSAGE,\s*theme:\s*sceneTheme\s*\},\s*"
        r"window\.location\.origin",
        context,
    )
    assert "const SCENE_THEME_MESSAGE =" not in source, (
        f"{context}: child scenes must not expose a second theme-control channel"
    )
    assert "'axiom:scene-theme'" not in source and '"axiom:scene-theme"' not in source, (
        f"{context}: obsolete child-to-parent theme message remains"
    )
    require_regex(
        source,
        r"useEffect\(\(\)\s*=>\s*\{\s*const frame = sceneFrameRef\.current"
        r".*?syncThemeToFrame\(frame\).*?\},\s*\[sceneTheme,\s*syncThemeToFrame\]\)",
        context,
    )
    require_regex(
        source,
        r"root\.dataset\.axiomTheme\s*=\s*sceneTheme",
        context,
    )
    require_regex(
        source,
        r"competition-board competition-board--\$\{sceneTheme\}",
        context,
    )
    require_regex(
        source,
        r"<iframe.*?ref=\{sceneFrameRef\}.*?onLoad=\{\(event\)\s*=>\s*"
        r"handleSceneFrameLoad\(event\.currentTarget\)\}",
        context,
    )
    require_regex(
        source,
        r"const removeLegacyFrameThemeControls\s*=\s*useCallback\("
        r"\(frame:\s*HTMLIFrameElement\)\s*=>\s*\{.*?"
        r"frame\.contentDocument.*?querySelectorAll<HTMLElement>\("
        r"['\"]\.ams-tone,\s*\.als-theme['\"]\).*?"
        r"\.forEach\(control\s*=>\s*control\.remove\(\)\).*?"
        r"\},\s*\[\]\)",
        context,
    )
    require_regex(
        source,
        r"const handleSceneFrameLoad\s*=\s*useCallback\("
        r"\(frame:\s*HTMLIFrameElement\)\s*=>\s*\{\s*"
        r"removeLegacyFrameThemeControls\(frame\).*?"
        r"syncThemeToFrame\(frame\)",
        context,
    )
    require_regex(
        source,
        r"<StructuredKnowledgeScene.*?theme=\{sceneTheme\}.*?/>",
        context,
    )
    assert "onThemeChange={setSceneTheme}" not in source, (
        f"{context}: structured scenes must not expose a second theme control"
    )


def assert_shell_theme_css() -> None:
    source = read_text(COMPETITION_CSS)
    context = "frontend/board/src/styles/competition.css shell theme"

    require_regex(source, r":root\[data-axiom-theme=['\"]dark['\"]\]", context)
    require_regex(
        source,
        r"html,\s*body,\s*#root\s*\{.*?background:\s*var\(--competition-paper\)",
        context,
    )
    require_regex(
        source,
        r"\.competition-board\s*\{.*?background:\s*var\(--competition-paper\)",
        context,
    )
    require_regex(
        source,
        r"\.knowledge-scene iframe\s*\{.*?background:\s*var\(--competition-paper\)",
        context,
    )
    require_regex(
        source,
        r"\.competition-board--dark\.competition-board--intake\s+"
        r"\.competition-board__prompt.*?background:\s*rgba\(11,\s*15,\s*19,",
        context,
    )
    require_regex(
        source,
        r"\.competition-board--dark\.competition-board--with-scene\s+"
        r"\.competition-board__prompt",
        context,
    )


def assert_structured_scene_is_controlled() -> None:
    source = read_text(STRUCTURED_SOURCE)
    css = read_text(STRUCTURED_CSS)
    context = "StructuredKnowledgeScene controlled theme"

    require_regex(
        source,
        r"theme:\s*['\"]dark['\"]\s*\|\s*['\"]light['\"]",
        context,
    )
    require_regex(
        source,
        r"className=\{`structured-scene structured-scene--\$\{theme\}`\}",
        context,
    )
    assert "onThemeChange" not in source, (
        f"{context}: theme must be controlled only by the parent shell"
    )
    assert "structured-scene__theme" not in source, (
        f"{context}: embedded structured scene must not render an internal theme button"
    )
    assert "structured-scene__theme" not in css, (
        f"{context}: obsolete internal theme-button styles should not return"
    )
    dark_block = require_regex(
        css,
        r"\.structured-scene\s*\{.*?--scene-bg:\s*(#[0-9a-fA-F]{6}).*?"
        r"background:\s*var\(--scene-bg\)",
        context,
    )
    assert dark_block.group(1).lower() not in {"#ffffff", "#fff"}, (
        f"{context}: dark theme background cannot be white"
    )
    require_regex(
        css,
        r"\.structured-scene--light\s*\{.*?--scene-bg:\s*#fff(?:fff)?",
        context,
    )


def assert_static_scene_protocol(scene_name: str) -> None:
    source_path = PUBLIC_SCENE_ROOT / scene_name
    source = read_text(source_path)
    context = f"frontend/board/public/knowledge-scenes/{scene_name} theme protocol"

    for marker in (
        THEME_STORAGE_KEY,
        PARENT_TO_SCENE_MESSAGE,
        "const applyTheme",
        "document.documentElement.style.colorScheme",
        "document.documentElement.style.backgroundColor",
        "document.body.style.backgroundColor",
    ):
        require(source, marker, context)

    theme_button_class = "ams-tone" if scene_name == "calculus-area.html" else "als-theme"
    assert theme_button_class not in source, (
        f"{context}: static scenes must not contain their own theme control"
    )
    for legacy_variable in ("themeButton", "toneButton"):
        assert legacy_variable not in source, (
            f"{context}: obsolete theme-button variable {legacy_variable!r} remains"
        )
    assert "axiom:scene-theme" not in source, (
        f"{context}: iframe must not request theme changes from the parent"
    )
    assert "window.parent.postMessage" not in source, (
        f"{context}: obsolete scene-to-parent theme click protocol remains"
    )
    assert not re.search(r"applyTheme\([^\n;]+,\s*true\s*\)", source), (
        f"{context}: obsolete click-origin theme application remains"
    )
    require_regex(source, r"const applyTheme\s*=\s*\(theme\)\s*=>", context)
    require_regex(
        source,
        r"const surface\s*=\s*[^;?]+\?\s*['\"]#0b0f13['\"]\s*:\s*"
        r"['\"]#ffffff['\"]\s*;",
        context,
    )
    assert "getComputedStyle(root).backgroundColor" not in source, (
        f"{context}: reading the transitioning old color can desynchronize iframe edges"
    )

    require_regex(
        source,
        r"event\.origin\s*!==\s*window\.location\.origin\s*\|\|\s*"
        r"event\.source\s*!==\s*window\.parent",
        context,
    )
    require_regex(
        source,
        r"event\.data\?\.type\s*!==\s*['\"]axiom:set-scene-theme['\"]",
        context,
    )
    require_regex(
        source,
        r"event\.data\.theme\s*!==\s*['\"]dark['\"].*?"
        r"event\.data\.theme\s*!==\s*['\"]light['\"]",
        context,
    )
    require_regex(source, r"applyTheme\(storedTheme\)", context)
    require_regex(source, r"applyTheme\(event\.data\.theme\)", context)

    built_path = BUILD_ROOT / "knowledge-scenes" / scene_name
    built = read_text(built_path)
    assert built == source, (
        f"{context}: built copy is stale; run `npm run build` in frontend/board"
    )


def built_asset_paths(index_source: str) -> tuple[Path, Path]:
    js_match = require_regex(
        index_source,
        r"src=['\"](/static/board/assets/index-[A-Za-z0-9_-]{8,}\.js)['\"]",
        "built board index hashed JavaScript",
    )
    css_match = require_regex(
        index_source,
        r"href=['\"](/static/board/assets/index-[A-Za-z0-9_-]{8,}\.css)['\"]",
        "built board index hashed CSS",
    )

    def local_path(public_path: str) -> Path:
        prefix = "/static/board/"
        assert public_path.startswith(prefix)
        return BUILD_ROOT / public_path.removeprefix(prefix)

    return local_path(js_match.group(1)), local_path(css_match.group(1))


def assert_built_contract() -> None:
    source = read_text(BUILD_INDEX)
    context = "core/static/board/index.html build contract"

    require(source, THEME_STORAGE_KEY, context)
    require(source, "document.documentElement.dataset.axiomTheme", context)
    assert "/static/board/assets/index.js" not in source, (
        f"{context}: stable JavaScript filename can leave users on a stale bundle"
    )
    assert "/static/board/assets/index.css" not in source, (
        f"{context}: stable CSS filename can leave users on a stale stylesheet"
    )

    js_path, css_path = built_asset_paths(source)
    assert js_path.is_file(), f"{context}: referenced JavaScript does not exist: {js_path}"
    assert css_path.is_file(), f"{context}: referenced CSS does not exist: {css_path}"

    js = read_text(js_path)
    css = read_text(css_path)
    for marker in (THEME_STORAGE_KEY, PARENT_TO_SCENE_MESSAGE):
        require(js, marker, f"built JavaScript {js_path.name}")
    assert "axiom:scene-theme" not in js, (
        f"built JavaScript {js_path.name}: obsolete child-to-parent theme channel remains"
    )
    require_regex(
        css,
        r":root\[data-axiom-theme=(?:['\"])?dark(?:['\"])?\]",
        f"built CSS {css_path.name}",
    )
    require(css, ".competition-board--dark", f"built CSS {css_path.name}")
    require(css, ".structured-scene--light", f"built CSS {css_path.name}")


def main() -> None:
    assert_source_index_prepaints_saved_theme()
    assert_parent_theme_protocol()
    assert_shell_theme_css()
    assert_structured_scene_is_controlled()
    for scene_name in PREMIUM_SCENES:
        assert_static_scene_protocol(scene_name)
    assert_built_contract()
    print("OK: learning-board light/dark theme source and build contracts passed")


if __name__ == "__main__":
    main()
