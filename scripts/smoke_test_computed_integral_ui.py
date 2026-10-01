"""Actual backend-built lessons in the built frontend; all network intercepted."""
from __future__ import annotations

from copy import deepcopy
import mimetypes
from pathlib import Path
import tempfile
from urllib.parse import unquote, urlparse

from playwright.sync_api import expect, sync_playwright
from smoke_test_computed_integral import ROOT
from core.boards.knowledge_scene import _build_structured_manifest
from core.boards.knowledge_scene_fixtures import choose_offline_fixture
from smoke_test_trigonometric_practice import manifest as trig_manifest

BUILD = ROOT / "core/static/board"
BASE = "http://127.0.0.1:18750"
GOAL = "用黎曼和理解曲线下面积"


def manifest(expression="x^2", sample="midpoint", domain=None):
    fixture = choose_offline_fixture("riemann-sum-fixture")
    fixture["learning_goal"] = GOAL
    data = fixture["demonstrations"][0]["data"]
    data.update(expression=expression, sample=sample, range=[-8, 8])
    if domain is not None:
        data["domain"] = domain
    return _build_structured_manifest(fixture, goal=GOAL, provider="demo")


def main():
    captures = Path(tempfile.mkdtemp(prefix="axiom-computed-integral-"))
    scene = manifest()
    errors, unexpected = [], []
    job_calls = []

    def route_request(route):
        request = route.request
        url = urlparse(request.url)
        if url.path == "/api/learning/knowledge-scenes/jobs" and request.method == "POST":
            job_calls.append("POST")
            route.fulfill(json={"job_id": "computed-test", "status": "queued", "retry_after_ms": 1})
            return
        if url.path == "/api/learning/knowledge-scenes/jobs/computed-test" and request.method == "GET":
            job_calls.append("GET")
            route.fulfill(json={"job_id": "computed-test", "status": "succeeded", "scene": scene,
                                "progress": {"percent": 100, "stage": "完成"}})
            return
        relative = "index.html" if url.path == "/board" else unquote(url.path).removeprefix("/static/board/")
        target = (BUILD / relative).resolve()
        if url.netloc != "127.0.0.1:18750" or not target.is_relative_to(BUILD.resolve()) or not target.is_file() or request.method != "GET":
            unexpected.append(request.url)
            route.abort()
            return
        mime = "text/javascript" if target.suffix == ".js" else mimetypes.guess_type(target)[0] or "application/octet-stream"
        route.fulfill(body=target.read_bytes(), content_type=mime)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1500, "height": 1000}, reduced_motion="reduce", service_workers="block")
        context.route("**/*", route_request)
        page = context.new_page()
        page.on("pageerror", lambda error: errors.append(str(error)))

        def load(candidate):
            nonlocal scene
            scene = candidate
            page.goto(BASE + "/board")
            page.evaluate("localStorage.clear()")
            page.reload()
            # Mock the response only, not the UI path or the backend question data.
            page.locator(".intake-example").first.click()
            expect(page.locator(".structured-scene")).to_be_visible()

        lesson = scene["content"]["demonstrations"][0]["practice"]
        load(scene)
        box = page.locator("[data-computed-practice]")
        expect(box).to_have_attribute("data-stage", "predict")
        expect(box).to_contain_text("f(x) = x^2")
        expect(box).to_contain_text("等分 8 段，取中点")
        expect(box.locator('[data-kind="riemann_sum"]')).to_have_count(0)
        box.get_by_role("button", name="S = I", exact=True).click()
        box.get_by_role("button", name="提交预测", exact=True).click()
        expect(box.locator(".learning-path__feedback")).to_contain_text("S = 85/32，I = 8/3")
        expect(box.locator('[data-kind="riemann_sum"]')).to_be_visible()
        box.screenshot(path=str(captures / "computed-observation-dark.png"))
        box.get_by_role("button", name="换区间试试", exact=True).click()
        expect(box).to_contain_text("区间改为 [0, 1]")
        wrong = next(o for o in lesson["transfer"]["options"] if o["id"] == "width")
        correct = next(o for o in lesson["transfer"]["options"] if o["id"] == "right")
        box.get_by_role("button", name=wrong["label"], exact=True).click()
        box.get_by_role("button", name="提交答案", exact=True).click()
        expect(box.locator(".learning-path__feedback")).to_contain_text("是否忘了乘每段宽度")
        page.set_viewport_size({"width": 390, "height": 844})
        expect(page.locator(".structured-scene")).to_have_attribute("data-layout", "narrow")
        expect(box).to_have_attribute("data-stage", "transfer")
        expect(box.locator(".learning-path__feedback")).to_contain_text("是否忘了乘每段宽度")
        box.get_by_role("button", name=correct["label"], exact=True).click()
        box.get_by_role("button", name="提交答案", exact=True).click()
        expect(box.get_by_text("根据反馈改正后答对", exact=True)).to_be_visible()
        box.get_by_role("button", name="查看本次结果", exact=True).click()
        expect(box).to_contain_text("提交了 2 次")
        page.get_by_role("button", name="切换为浅色模式").click()
        assert page.locator(".structured-scene").evaluate("e => getComputedStyle(e).backgroundColor") == "rgb(255, 255, 255)"
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1")
        box.screenshot(path=str(captures / "computed-result-mobile-light.png"))

        # New conditions create a new question and cannot reuse the old answer.
        negative = manifest("-x^2", "right")
        load(negative)
        expect(box).to_have_attribute("data-stage", "predict")
        expect(box).to_contain_text("f(x) = -x^2")
        box.get_by_role("button", name="跳过预测，看演示", exact=True).click()
        expect(box.locator(".learning-path__feedback")).to_contain_text("小于定积分")
        box.get_by_role("button", name="换区间试试", exact=True).click()
        box.get_by_role("button", name="给一点提示", exact=True).click()
        page.set_viewport_size({"width": 1500, "height": 1000})
        expect(page.locator(".structured-scene")).to_have_attribute("data-layout", "wide")
        expect(box.locator(".learning-path__hint")).to_be_visible()
        negative_correct = next(o for o in negative["content"]["demonstrations"][0]["practice"]["transfer"]["options"] if o["id"] == "right")
        box.get_by_role("button", name=negative_correct["label"], exact=True).click()
        box.get_by_role("button", name="提交答案", exact=True).click()
        expect(box.get_by_text("使用提示后答对", exact=True)).to_be_visible()

        load(manifest("2*x", "midpoint"))
        box.get_by_role("button", name="S = I", exact=True).click()
        box.get_by_role("button", name="提交预测", exact=True).click()
        expect(box.locator(".learning-path__feedback")).to_contain_text("判断正确")
        box.get_by_role("button", name="换区间试试", exact=True).click()
        box.get_by_role("button", name="直接看答案", exact=True).click()
        expect(box).to_contain_text("已看答案，未计为独立答对")
        expect(box.get_by_role("button", name="提交答案", exact=True)).to_have_count(0)

        # Unsupported expressions and stale binding keep the original visual.
        load(manifest("sin(x)"))
        expect(box).to_have_count(0)
        expect(page.locator('[data-kind="riemann_sum"]')).to_be_visible()
        stale = deepcopy(manifest())
        stale["content"]["demonstrations"][0]["practice"]["source"]["domain"] = [-1, 1]
        load(stale)
        expect(box).to_have_count(0)
        expect(page.locator('[data-kind="riemann_sum"]')).to_be_visible()

        # Exact pi provenance, cancellation vs area, and signed fills/readouts.
        load(trig_manifest())
        expect(box).to_have_attribute("data-stage", "predict")
        expect(box).to_contain_text("区间 [0, 2π]")
        box.get_by_role("button", name="I = 0，A = 0", exact=True).click()
        box.get_by_role("button", name="提交预测", exact=True).click()
        expect(box.locator(".learning-path__feedback")).to_contain_text("不代表曲线与横轴之间没有面积")
        expect(box.locator(".learning-path__feedback")).to_contain_text("I = 0，A = 4")
        expect(box.locator(".riemann-sum__endpoint").last).to_have_text("b=2π")
        expect(box.locator(".riemann-sum__geometric b")).to_have_text("4")
        expect(box.locator(".advanced-scene__readout").filter(has_text="定积分数值参考").locator("b")).to_have_text("≈ 0")
        expect(box.locator('.riemann-sum__rectangle[data-sign="negative"]')).to_have_count(4)
        expect(box.locator('.riemann-sum__rectangle[data-sign="positive"]')).to_have_count(4)
        positive_fill = box.locator('.riemann-sum__area[data-sign="positive"]').evaluate("e => getComputedStyle(e).fill")
        negative_fill = box.locator('.riemann-sum__area[data-sign="negative"]').evaluate("e => getComputedStyle(e).fill")
        assert positive_fill != negative_fill
        box.screenshot(path=str(captures / "trig-signed-area-dark.png"))
        slider = box.get_by_role("slider", name="黎曼和分割数 n", exact=True)
        slider.focus()
        slider.press("Home")
        for _ in range(14):
            slider.press("ArrowRight")
        expect(slider).to_have_value("16")
        expect(box.locator(".riemann-sum__geometric b")).to_have_text("4")
        expect(box.locator(".advanced-scene__readout").filter(has_text="定积分数值参考").locator("b")).to_have_text("≈ 0")
        page.set_viewport_size({"width":390,"height":844})
        page.get_by_role("button",name="切换为浅色模式").click()
        expect(box.locator(".riemann-sum__geometric b")).to_have_text("4")
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1")
        box.screenshot(path=str(captures / "trig-signed-area-mobile-light.png"))
        box.get_by_role("button",name="换区间试试",exact=True).click()
        expect(box).to_contain_text("区间改为 [0, π]")
        box.get_by_role("button",name="I = 2，A = 2",exact=True).click()
        box.get_by_role("button",name="提交答案",exact=True).click()
        expect(box.get_by_text("本页首次作答正确（未用提示）",exact=True)).to_be_visible()

        load(trig_manifest("cos(x)", -1, 1))
        box.get_by_role("button",name="跳过预测，看演示",exact=True).click()
        expect(box.locator(".riemann-sum__endpoint").first).to_have_text("a=−π/2")
        expect(box.locator(".riemann-sum__geometric b")).to_have_text("2")
        expect(box.locator(".learning-path__feedback")).to_contain_text("I = 2，A = 2")
        browser.close()

    assert not errors, errors
    assert not unexpected, unexpected
    assert len(job_calls) == 14, job_calls
    print("OK: computed integral UI, source binding, negative/equal cases, resize-preserved evidence and fallback.")
    print("All network intercepted; 0 real model calls. Screenshots:", captures)


if __name__ == "__main__":
    main()
