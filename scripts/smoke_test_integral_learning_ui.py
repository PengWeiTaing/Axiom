"""Exercise the actual built board with intercepted, offline-only requests.

No Flask app, credentials, generation provider, or real API is used. Rebuild
frontend/board before running. Browser routes serve only the checked-in build
and two mocked generation-job responses; all other requests are rejected.
"""
from __future__ import annotations

import mimetypes
import re
import tempfile
from pathlib import Path
from urllib.parse import unquote, urlparse

from playwright.sync_api import expect, sync_playwright

ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / "core/static/board"
BASE = "http://127.0.0.1:18749"
QUALITY_VERSION = re.search(
    r"CURRENT_KNOWLEDGE_SCENE_QUALITY_VERSION = '([^']+)'",
    (ROOT / "frontend/board/src/api/endpoints.ts").read_text(encoding="utf-8"),
).group(1)
SCENE = {
    "schema_version": "2.0", "scene_id": "offline-practice-scene",
    "template_id": "calculus_area_v1", "title": "用定积分表示平面区域的面积",
    "topic": "定积分 · 平面区域面积", "subject": "高等数学",
    "learning_goal": "理解如何用定积分表示并计算平面区域的面积",
    "renderer": {"kind": "static_html", "src": "/static/board/knowledge-scenes/calculus-area.html"},
    "learning_path": [], "capabilities": [],
    "generation": {"provider": "demo", "workflow_id": "", "generated_at": "", "fallback_reason": "离线 UI 测试",
                   "quality_status": "approved", "quality_score": 100, "quality_version": QUALITY_VERSION},
}


def main() -> None:
    screenshots = Path(tempfile.mkdtemp(prefix="axiom-integral-ui-"))
    errors: list[str] = []
    unexpected: list[str] = []
    mocked_jobs: list[str] = []

    def intercept(route):
        request = route.request
        parsed = urlparse(request.url)
        # Match API by path to also isolate builds configured for a public gateway.
        if parsed.path == "/api/learning/knowledge-scenes/jobs" and request.method == "POST":
            mocked_jobs.append(request.method)
            route.fulfill(json={"job_id": "offline-job", "status": "queued", "retry_after_ms": 1})
            return
        if parsed.path == "/api/learning/knowledge-scenes/jobs/offline-job" and request.method == "GET":
            mocked_jobs.append(request.method)
            route.fulfill(json={"job_id": "offline-job", "status": "succeeded", "scene": SCENE,
                                "progress": {"percent": 100, "stage": "完成"}})
            return
        if parsed.netloc != "127.0.0.1:18749":
            # The pre-existing full-board HTML has optional remote font links.
            if parsed.hostname not in {"fonts.googleapis.com", "fonts.gstatic.com"}:
                unexpected.append(request.url)
            route.abort()
            return
        relative = "index.html" if parsed.path == "/board" else unquote(parsed.path).removeprefix("/static/board/")
        target = (BUILD / relative).resolve()
        if not target.is_relative_to(BUILD.resolve()) or not target.is_file() or request.method != "GET":
            unexpected.append(request.url)
            route.abort()
            return
        mime = "text/javascript" if target.suffix == ".js" else mimetypes.guess_type(target)[0] or "application/octet-stream"
        route.fulfill(body=target.read_bytes(), content_type=mime)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 1000}, reduced_motion="reduce", service_workers="block")
        context.route("**/*", intercept)
        page = context.new_page()
        page.on("pageerror", lambda error: errors.append(str(error)))

        def reset():
            page.goto(f"{BASE}/board")
            page.evaluate("localStorage.clear()")
            page.reload()
            expect(page.locator(".intake-example")).to_have_count(3)
            page.locator(".intake-example").filter(has_text="为什么定积分能算面积").click()
            expect(page.locator('.learning-path[data-stage="predict"]')).to_be_visible()
            expect(page.locator("iframe")).to_have_count(0)

        def transfer():
            page.get_by_role("button", name="跳过预测，看讲解", exact=True).click()
            page.get_by_role("button", name="换一道题试试", exact=True).click()
            expect(page.locator('.learning-path[data-stage="transfer"]')).to_be_visible()
            expect(page.locator('[data-kind="riemann_sum"]')).to_have_count(0)

        def choose(label):
            page.get_by_role("button", name=label, exact=True).click()
            page.get_by_role("button", name="提交答案", exact=True).click()

        reset()
        expect(page.get_by_role("button", name="提交预测", exact=True)).to_be_disabled()
        page.get_by_role("button", name="变大，因为矩形数量翻倍了", exact=True).click()
        page.get_by_role("button", name="提交预测", exact=True).click()
        expect(page.locator(".learning-path__feedback")).to_contain_text("每块的宽度也减半")
        expect(page.locator('[data-kind="riemann_sum"]')).to_be_visible()
        page.locator(".learning-path").screenshot(path=str(screenshots / "observation-dark.png"))
        expect(page.locator(".advanced-scene__readout").first).to_contain_text("0.46875")
        slider = page.get_by_role("slider", name="黎曼和分割数 n", exact=True)
        slider.focus()
        slider.press("Home")
        for _ in range(6):
            slider.press("ArrowRight")
        expect(slider).to_have_value("8")
        expect(page.locator(".advanced-scene__readout").first).to_contain_text("0.39844")
        page.get_by_role("button", name="切换为浅色模式").click()
        page.locator(".learning-path").screenshot(path=str(screenshots / "observation-light.png"))
        assert page.locator(".integral-learning").evaluate("e => getComputedStyle(e).backgroundColor") == "rgb(255, 255, 255)"
        page.get_by_role("button", name="换一道题试试", exact=True).click()
        choose("S₄ = 5，I = 4")
        expect(page.get_by_text("本页首次作答正确（未用提示）", exact=True)).to_be_visible()
        page.get_by_role("button", name="查看本次结果", exact=True).click()
        expect(page.locator('.learning-path[data-stage="complete"]')).to_contain_text("提交了 1 次")

        reset()
        transfer()
        choose("S₄ = 10，I = 4")
        expect(page.locator(".learning-path__feedback")).to_contain_text("每块面积还要乘上它的宽度")
        expect(page.get_by_role("button", name="提交答案", exact=True)).to_be_disabled()
        choose("S₄ = 5，I = 4")
        expect(page.get_by_text("根据反馈改正后答对", exact=True)).to_be_visible()

        reset()
        transfer()
        page.get_by_role("button", name="给一点提示", exact=True).click()
        choose("S₄ = 5，I = 4")
        expect(page.get_by_text("使用提示后答对", exact=True)).to_be_visible()

        reset()
        transfer()
        page.get_by_role("button", name="直接看答案", exact=True).click()
        expect(page.get_by_text("已看答案，未计为独立答对", exact=True)).to_be_visible()
        expect(page.get_by_role("button", name="提交答案", exact=True)).to_have_count(0)
        expect(page.locator(".learning-path__solution")).to_be_visible()

        reset()
        transfer()
        page.get_by_role("button", name="跳过这题", exact=True).click()
        expect(page.get_by_text("本题已跳过，未记录答对", exact=True)).to_be_visible()

        reset()
        transfer()
        page.get_by_role("button", name="回看演示（算使用提示）", exact=True).click()
        page.get_by_role("button", name="回到变式题", exact=True).click()
        choose("S₄ = 5，I = 4")
        expect(page.get_by_text("使用提示后答对", exact=True)).to_be_visible()

        reset()
        transfer()
        page.get_by_role("button", name="直接看完整白板", exact=True).click()
        expect(page.locator("iframe")).to_have_count(1)
        page.get_by_role("button", name="收起完整白板", exact=True).click()
        choose("S₄ = 5，I = 4")
        expect(page.get_by_text("使用提示后答对", exact=True)).to_be_visible()

        # Narrow layout, direct-reading escape hatch, iframe theme and re-open.
        reset()
        page.set_viewport_size({"width": 390, "height": 844})
        page.locator(".learning-path").screenshot(path=str(screenshots / "prediction-mobile-dark.png"))
        page.get_by_role("button", name="直接看完整白板", exact=True).click()
        expect(page.locator("iframe")).to_have_count(1)
        expect(page.locator('.learning-path[data-stage="observe"]')).to_be_visible()
        frame = page.frame_locator("iframe")
        expect(frame.locator("#axiom-motion-spine")).to_be_visible()
        page.get_by_role("button", name="切换为浅色模式").click()
        expect(page.locator("html")).to_have_attribute("data-axiom-theme", "light")
        expect(frame.locator("#axiom-motion-spine")).to_have_attribute("data-tone", "paper")
        page.get_by_role("button", name="切换为深色模式").click()
        expect(frame.locator("#axiom-motion-spine")).to_have_attribute("data-tone", "dark")
        page.get_by_role("button", name="切换为浅色模式").click()
        expect(frame.locator("#axiom-motion-spine")).to_have_attribute("data-tone", "paper")
        assert page.locator(".competition-theme-toggle").count() == 1
        assert frame.locator(".ams-tone").count() == 0
        page.get_by_role("button", name="收起完整白板", exact=True).click()
        page.get_by_role("button", name="直接看完整白板", exact=True).click()
        expect(frame.locator("#axiom-motion-spine")).to_have_attribute("data-tone", "paper")
        page.get_by_role("button", name="收起完整白板", exact=True).click()
        page.locator(".learning-path").screenshot(path=str(screenshots / "observation-mobile-light.png"))
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1")
        page.get_by_role("button", name="换一道题试试", exact=True).click()
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1")
        page.locator(".learning-path").screenshot(path=str(screenshots / "transfer-mobile-light.png"))
        # Only scene metadata and theme are persisted, never practice attempts.
        assert page.evaluate("Object.keys(localStorage).every(k => k.startsWith('axiom.competition.lastScene.') || k === 'axiom.scene.theme')")
        page.reload()
        page.get_by_role("button", name=re.compile("继续上次白板")).click()
        expect(page.locator('.learning-path[data-stage="predict"]')).to_be_visible()
        browser.close()

    assert not errors, errors
    assert not unexpected, unexpected
    assert len(mocked_jobs) == 16, mocked_jobs
    print("OK: integral UI paths, feedback, evidence labels, reload, mobile and shared theme.")
    print("All requests intercepted; 0 real model/API calls. Screenshots:", screenshots)


if __name__ == "__main__":
    main()
