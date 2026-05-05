from __future__ import annotations

import base64
import logging
import os
import sys
import tempfile
import threading
import time
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


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="axiom_web_app_") as temp_dir:
        root = Path(temp_dir)
        os.environ["AXIOM_ROOT"] = str(root)
        os.environ["AXIOM_SECRET_KEY"] = "test-key"
        os.environ["AXIOM_LOG_PATH"] = str(root / "logs" / "receiver.log")

        try:
            from core.receiver import app  # noqa: WPS433
            from playwright.sync_api import sync_playwright  # noqa: WPS433

            server = LocalServerThread(app)
            server.start()

            base_url = f"http://127.0.0.1:{server.port}"
            note_text = "Playwright smoke note"
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
                    page.get_by_role("button", name="写入 inbox").click()
                    assert_text_present(page, "文本已写入 inbox", "text capture feedback")
                    assert_text_present(page, note_text, "recent note")

                    page.fill("#search-query-input", note_text)
                    page.get_by_role("button", name="开始检索").click()
                    assert_text_present(page, "共 1 条结果", "search feedback")
                    assert_text_present(page, note_text, "search result")

                    page.set_input_files(
                        "#image-input",
                        {
                            "name": "smoke.png",
                            "mimeType": "image/png",
                            "buffer": PNG_1X1_BYTES,
                        },
                    )
                    page.fill("#image-caption-input", image_caption)
                    page.get_by_role("button", name="上传图片").click()
                    assert_text_present(page, "图片已写入 inbox", "image capture feedback")

                    page.fill("#search-query-input", image_caption)
                    page.get_by_role("button", name="开始检索").click()
                    assert_text_present(page, image_caption, "image search result")

                    browser.close()
            finally:
                logging.shutdown()
                server.stop()

        except ImportError as exc:
            raise SystemExit(
                "缺少 Playwright。请先执行: "
                "python -m pip install -r requirements-dev.txt，"
                "然后执行 playwright install chromium"
            ) from exc

        print("web app smoke test passed")
        print(f"temporary root: {root}")


if __name__ == "__main__":
    main()
