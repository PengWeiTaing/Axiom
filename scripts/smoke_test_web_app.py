from __future__ import annotations

import base64
import logging
import os
import sys
import tempfile
import threading
from pathlib import Path

from werkzeug.serving import make_server


REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))


PNG_1X1_BYTES = base64.b64decode(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9p2UeJ8AAAAASUVORK5CYII="
)


class LocalServerThread(threading.Thread):
    def __init__(self, app) -> None:
        super().__init__(daemon=True)
        self.server = make_server("127.0.0.1", 0, app)
        self.port = self.server.server_port

    def run(self) -> None:
        self.server.serve_forever()

    def stop(self) -> None:
        self.server.shutdown()
        self.join(timeout=5)


def assert_text_present(page, text: str, label: str) -> None:
    try:
        page.get_by_text(text, exact=False).first.wait_for(timeout=15_000)
    except Exception as exc:  # noqa: BLE001
        raise AssertionError(f"{label}: did not find text {text!r}") from exc


def create_sample_artifact(root: Path) -> None:
    artifact_path = root / "data" / "reviews" / "daily" / "2026" / "2026-05-05.md"
    artifact_path.parent.mkdir(parents=True, exist_ok=True)
    artifact_path.write_text(
        "# daily review\n\nSummary line for the browser smoke test.\n",
        encoding="utf-8",
    )


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="axiom_web_app_") as temp_dir:
        root = Path(temp_dir)
        os.environ["AXIOM_ROOT"] = str(root)
        os.environ["AXIOM_SECRET_KEY"] = "test-key"
        os.environ["AXIOM_LOG_PATH"] = str(root / "logs" / "receiver.log")
        create_sample_artifact(root)

        try:
            from core.receiver import app  # noqa: WPS433
            from playwright.sync_api import sync_playwright  # noqa: WPS433

            server = LocalServerThread(app)
            server.start()

            base_url = f"http://127.0.0.1:{server.port}"
            note_text = "Playwright smoke note"
            note_source = "web_app_smoke"
            image_caption = "playwright smoke image"

            try:
                with sync_playwright() as playwright:
                    browser = playwright.chromium.launch(headless=True)
                    page = browser.new_page()
                    page.goto(f"{base_url}/app", wait_until="networkidle")

                    if page.title() != "Axiom 外脑控制台":
                        raise AssertionError(f"unexpected title: {page.title()!r}")

                    manifest_href = page.locator("link[rel='manifest']").get_attribute("href")
                    if manifest_href != "/static/manifest.webmanifest":
                        raise AssertionError(f"unexpected manifest href: {manifest_href!r}")

                    page.fill("#key-input", "test-key")
                    page.get_by_role("button", name="保存并连接").click()
                    page.locator("#connection-indicator").get_by_text("已连接").wait_for(
                        timeout=15_000
                    )
                    assert_text_present(page, "总条目", "overview stats")

                    has_service_worker = page.evaluate(
                        """
                        async () => {
                            const registrations = await navigator.serviceWorker.getRegistrations();
                            return registrations.length > 0;
                        }
                        """
                    )
                    if not has_service_worker:
                        raise AssertionError("service worker was not registered")

                    page.fill("#text-input", note_text)
                    page.fill("#text-source-input", note_source)
                    page.get_by_role("button", name="写入 inbox").click()
                    assert_text_present(page, "文本已写入 inbox", "text capture feedback")
                    assert_text_present(page, note_text, "recent note")

                    page.fill("#search-query-input", note_text)
                    page.fill("#search-source-input", note_source)
                    page.get_by_role("button", name="开始检索").click()
                    assert_text_present(page, "共 1 条结果", "search feedback")
                    assert_text_present(page, note_text, "search result")

                    page.locator("#search-results").get_by_role("button", name="查看").first.click()
                    page.locator("#viewer-meta").get_by_text(note_source).wait_for(timeout=15_000)
                    page.locator("#viewer-content").get_by_text(note_text, exact=False).wait_for(
                        timeout=15_000
                    )
                    page.locator("#viewer-actions").get_by_role("button", name="归档").click()
                    page.locator("#viewer-actions").get_by_role("button", name="恢复到 Inbox").wait_for(
                        timeout=15_000
                    )
                    page.get_by_role("button", name="关闭").click()

                    page.select_option("#recent-storage-input", "archive")
                    page.get_by_role("button", name="应用筛选").click()
                    assert_text_present(page, note_text, "archive filtered recent")

                    page.locator("#recent-list").get_by_role("button", name="查看").first.click()
                    page.locator("#viewer-actions").get_by_role("button", name="恢复到 Inbox").click()
                    page.locator("#viewer-actions").get_by_role("button", name="归档").wait_for(
                        timeout=15_000
                    )
                    page.get_by_role("button", name="关闭").click()

                    page.get_by_role("button", name="重置筛选").first.click()
                    assert_text_present(page, note_text, "recent note after restore")

                    page.set_input_files(
                        "#image-input",
                        {
                            "name": "smoke.png",
                            "mimeType": "image/png",
                            "buffer": PNG_1X1_BYTES,
                        },
                    )
                    page.fill("#image-caption-input", image_caption)
                    page.fill("#image-source-input", "web_app_image")
                    page.get_by_role("button", name="上传图片").click()
                    assert_text_present(page, "图片已写入 inbox", "image capture feedback")

                    page.fill("#search-query-input", image_caption)
                    page.fill("#search-source-input", "web_app_image")
                    page.get_by_role("button", name="开始检索").click()
                    assert_text_present(page, image_caption, "image search result")

                    page.locator("#artifact-summary-cards").get_by_role("button", name="查看最新").first.click()
                    page.locator("#viewer-content").get_by_text("# daily review", exact=False).wait_for(
                        timeout=15_000
                    )
                    page.locator("#viewer-meta").get_by_text("data/reviews/daily/2026/2026-05-05.md").wait_for(
                        timeout=15_000
                    )

                    browser.close()
            finally:
                logging.shutdown()
                server.stop()

        except ImportError as exc:
            raise SystemExit(
                "缺少 Playwright。请先执行 "
                "python -m pip install -r requirements-dev.txt，"
                "然后执行 playwright install chromium"
            ) from exc

        print("web app smoke test passed")
        print(f"temporary root: {root}")


if __name__ == "__main__":
    main()
