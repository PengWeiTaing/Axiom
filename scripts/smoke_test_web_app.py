from __future__ import annotations

import base64
import io
import logging
import os
import re
import sys
import tempfile
import threading
import urllib.error
import urllib.request
import zipfile
from datetime import datetime, timedelta, timezone
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


def current_local_date_iso() -> str:
    return datetime.now(timezone(timedelta(hours=8))).date().isoformat()


def fetch_header(url: str, name: str) -> str:
    with urllib.request.urlopen(url, timeout=10) as response:
        return response.headers.get(name, "")


def fetch_text(url: str) -> str:
    with urllib.request.urlopen(url, timeout=10) as response:
        return response.read().decode("utf-8")


def fetch_status(url: str, headers: dict[str, str] | None = None) -> int:
    request = urllib.request.Request(url, headers=headers or {})
    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            return response.status
    except urllib.error.HTTPError as exc:
        return exc.code


def create_sample_artifact(root: Path) -> None:
    run_date = current_local_date_iso()
    artifact_path = root / "data" / "reviews" / "daily" / run_date[:4] / f"{run_date}.md"
    artifact_path.parent.mkdir(parents=True, exist_ok=True)
    artifact_path.write_text(
        "# daily review\n\nSummary line for the browser smoke test.\n",
        encoding="utf-8",
    )


def build_docx_bytes(*paragraphs: str) -> bytes:
    buffer = io.BytesIO()
    document_body = "".join(
        f"<w:p><w:r><w:t>{paragraph}</w:t></w:r></w:p>"
        for paragraph in paragraphs
    )
    document_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
        f"<w:body>{document_body}</w:body>"
        "</w:document>"
    )
    content_types_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Override PartName="/word/document.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
        "</Types>"
    )
    rels_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" '
        'Target="word/document.xml"/>'
        "</Relationships>"
    )

    with zipfile.ZipFile(buffer, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        archive.writestr("[Content_Types].xml", content_types_xml)
        archive.writestr("_rels/.rels", rels_xml)
        archive.writestr("word/document.xml", document_xml)

    return buffer.getvalue()


def build_pdf_bytes(text: str) -> bytes:
    safe_text = text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
    stream = f"BT\n/F1 18 Tf\n40 100 Td\n({safe_text}) Tj\nET\n".encode("latin-1")

    objects = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Count 1 /Kids [3 0 R] >>",
        (
            b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] "
            b"/Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>"
        ),
        b"<< /Length " + str(len(stream)).encode("ascii") + b" >>\nstream\n" + stream + b"endstream",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    ]

    chunks = [b"%PDF-1.4\n"]
    offsets = [0]
    for index, obj in enumerate(objects, start=1):
        offsets.append(sum(len(chunk) for chunk in chunks))
        chunks.append(f"{index} 0 obj\n".encode("ascii"))
        chunks.append(obj)
        chunks.append(b"\nendobj\n")

    xref_offset = sum(len(chunk) for chunk in chunks)
    chunks.append(f"xref\n0 {len(objects) + 1}\n".encode("ascii"))
    chunks.append(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        chunks.append(f"{offset:010d} 00000 n \n".encode("ascii"))
    chunks.append(
        (
            f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\n"
            f"startxref\n{xref_offset}\n%%EOF\n"
        ).encode("ascii")
    )
    return b"".join(chunks)


def wait_for_text(page, selector: str, text: str, label: str) -> None:
    try:
        page.locator(selector).get_by_text(text, exact=False).first.wait_for(timeout=15_000)
    except Exception as exc:  # noqa: BLE001
        raise AssertionError(f"{label}: did not find text {text!r} in {selector}") from exc


def click_first_action(page, selector: str, label: str) -> None:
    locator = page.locator(selector).first
    try:
        locator.wait_for(timeout=15_000)
        locator.scroll_into_view_if_needed(timeout=15_000)
        locator.click()
    except Exception as exc:  # noqa: BLE001
        try:
            locator.evaluate("(element) => element.click()")
        except Exception as fallback_exc:  # noqa: BLE001
            raise AssertionError(f"{label}: could not click {selector}") from fallback_exc


def close_viewer(page) -> None:
    try:
        page.locator("#close-viewer-button").click(force=True)
        page.locator("#viewer-backdrop").wait_for(state="hidden", timeout=15_000)
    except Exception as exc:  # noqa: BLE001
        raise AssertionError("close viewer: viewer backdrop did not disappear") from exc


def ensure_viewer_closed(page) -> None:
    try:
        backdrop = page.locator("#viewer-backdrop")
        if backdrop.is_visible():
            try:
                close_viewer(page)
            except AssertionError:
                page.evaluate(
                    """
                    () => {
                        const backdrop = document.getElementById("viewer-backdrop");
                        if (backdrop) {
                            backdrop.classList.add("hidden");
                        }
                    }
                    """
                )
                backdrop.wait_for(state="hidden", timeout=15_000)
            page.wait_for_timeout(150)
    except Exception as exc:  # noqa: BLE001
        raise AssertionError("ensure viewer closed: viewer backdrop is still active") from exc


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="axiom_web_app_") as temp_dir:
        root = Path(temp_dir)
        os.environ["AXIOM_ROOT"] = str(root)
        os.environ["AXIOM_SECRET_KEY"] = "test-key"
        os.environ["AXIOM_LOG_PATH"] = ""
        os.environ["AXIOM_AUDIO_TRANSCRIBE_MOCK_TEMPLATE"] = "browser mock transcript for {original_name}"
        os.environ["AXIOM_IMAGE_DESCRIBE_MOCK_TEMPLATE"] = "browser mock image description for {original_name}"
        create_sample_artifact(root)

        try:
            from core.receiver import app  # noqa: WPS433
            from playwright.sync_api import sync_playwright  # noqa: WPS433

            server = LocalServerThread(app)
            server.start()

            base_url = f"http://127.0.0.1:{server.port}"
            app_cache_control = fetch_header(f"{base_url}/app", "Cache-Control")
            if "no-store" not in app_cache_control:
                raise AssertionError(f"/app Cache-Control should avoid shell caching: {app_cache_control}")
            app_html = fetch_text(f"{base_url}/app")
            entry_match = re.search(r'src="(/static/v2/assets/index-[^"]+\.js)"', app_html)
            if not entry_match:
                raise AssertionError("Vite shell should reference a hashed entry bundle")
            v2_cache_control = fetch_header(f"{base_url}{entry_match.group(1)}", "Cache-Control")
            if "no-cache" not in v2_cache_control:
                raise AssertionError(f"Vite assets should revalidate hashed entry bundle: {v2_cache_control}")
            legacy_cache_control = fetch_header(f"{base_url}/static/app.js", "Cache-Control")
            if "immutable" not in legacy_cache_control:
                raise AssertionError(f"legacy static cache policy changed unexpectedly: {legacy_cache_control}")
            service_worker_text = fetch_text(f"{base_url}/sw.js")
            if 'startsWith("/static/v2/")' not in service_worker_text:
                raise AssertionError("service worker must not cache Vue v2 assets")
            board_cache_control = fetch_header(f"{base_url}/board", "Cache-Control")
            if "no-store" not in board_cache_control:
                raise AssertionError(f"/board Cache-Control should avoid shell caching: {board_cache_control}")
            board_html = fetch_text(f"{base_url}/board")
            if "Learning Board 未构建" in board_html:
                raise AssertionError("/board should serve the built Learning Board shell")
            if "/static/board/assets/index.js" not in board_html:
                raise AssertionError("Learning Board shell should reference the built JS bundle")
            board_asset_cache_control = fetch_header(f"{base_url}/static/board/assets/index.js", "Cache-Control")
            if "no-cache" not in board_asset_cache_control:
                raise AssertionError(
                    f"Learning Board assets should revalidate fixed bundle names: {board_asset_cache_control}"
                )
            if fetch_status(f"{base_url}/api/learning/boards") not in (401, 403):
                raise AssertionError("Learning Board list endpoint should require X-Axiom-Key")

            note_text = "Playwright smoke note"
            note_source = "web_app_smoke"
            updated_note_text = "Playwright smoke note updated"
            updated_note_source = "web_app_smoke_edited"
            image_caption = "playwright smoke image"
            pdf_note = "playwright project spec"
            docx_note = "weekly planning doc"
            audio_note = "playwright voice note"
            audio_transcript = "browser audio transcript line"
            updated_audio_transcript = "updated browser audio transcript"
            run_date = current_local_date_iso()
            pdf_bytes = build_pdf_bytes("Axiom pdf browser line")
            docx_bytes = build_docx_bytes(
                "Axiom document insight",
                "Docx body line for browser search",
            )

            try:
                with sync_playwright() as playwright:
                    browser = playwright.chromium.launch(headless=True)
                    page = browser.new_page()
                    page.goto(f"{base_url}/app/legacy", wait_until="networkidle")

                    if page.locator("#key-form").count() != 1:
                        raise AssertionError("app shell did not render key form")

                    manifest_href = page.locator("link[rel='manifest']").get_attribute("href")
                    if manifest_href != "/static/manifest.webmanifest":
                        raise AssertionError(f"unexpected manifest href: {manifest_href!r}")

                    page.fill("#key-input", "test-key")
                    page.locator("#key-form button[type='submit']").click()
                    page.locator("#connection-indicator[data-state='ready']").wait_for(timeout=15_000)
                    page.locator("#overview-stats").wait_for(timeout=15_000)
                    wait_for_text(page, "#automation-jobs", "音频自动转写", "audio transcribe job card")
                    wait_for_text(page, "#automation-jobs", "mock", "audio transcribe runtime badge")
                    wait_for_text(page, "#automation-jobs", "生成图片自动描述", "image describe job card")
                    if page.locator("[data-job-id='audio_transcribe_day']").is_disabled():
                        raise AssertionError("audio transcribe job button should be enabled in mock mode")
                    if page.locator("[data-job-id='image_describe_day']").is_disabled():
                        raise AssertionError("image describe job button should be enabled in mock mode")
                    if page.locator("#automation-runs-status-input option[value='skipped']").count() != 1:
                        raise AssertionError("automation runs status filter missing skipped option")

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
                    page.locator("#text-capture-form button[type='submit']").click()
                    page.locator("#capture-feedback").get_by_text("inbox", exact=False).wait_for(timeout=15_000)
                    wait_for_text(page, "#recent-list", note_text, "recent note")

                    page.fill("#search-query-input", note_text)
                    page.fill("#search-source-input", note_source)
                    page.locator("#search-form button[type='submit']").click()
                    wait_for_text(page, "#search-results", note_text, "search result")

                    click_first_action(page, "#search-results [data-action='view-item']", "open text item")
                    wait_for_text(page, "#viewer-meta", note_source, "text source in viewer")
                    wait_for_text(page, "#viewer-content", note_text, "text content in viewer")
                    click_first_action(page, "#viewer-actions [data-action='viewer-toggle-storage']", "archive text item")
                    wait_for_text(page, "#viewer-meta", "archive", "archived storage in viewer")
                    close_viewer(page)
                    ensure_viewer_closed(page)
                    page.select_option("#recent-storage-input", "archive")
                    page.locator("#recent-filter-form button[type='submit']").click()
                    wait_for_text(page, "#recent-list", note_text, "archived recent note")

                    click_first_action(page, "#recent-list [data-action='view-item']", "open archived text item")
                    click_first_action(page, "#viewer-actions [data-action='viewer-toggle-storage']", "restore text item")
                    wait_for_text(page, "#viewer-meta", "inbox", "restored storage in viewer")
                    close_viewer(page)
                    page.locator("#reset-recent-filters-button").click()
                    wait_for_text(page, "#recent-list", note_text, "recent note after restore")

                    click_first_action(page, "#recent-list [data-action='view-item']", "open recent text item")
                    click_first_action(page, "#viewer-actions [data-action='edit-item']", "open edit form")
                    page.locator("[data-role='item-edit-form'] textarea[name='content']").fill(updated_note_text)
                    page.locator("[data-role='item-edit-form'] input[name='source']").fill(updated_note_source)
                    click_first_action(page, "#viewer-actions [data-action='save-item-edit']", "save text edit")
                    wait_for_text(page, "#viewer-meta", updated_note_source, "updated source")
                    wait_for_text(page, "#viewer-content", updated_note_text, "updated text content")
                    close_viewer(page)
                    wait_for_text(page, "#recent-list", updated_note_text, "updated recent note")

                    page.set_input_files(
                        "#file-input",
                        {
                            "name": "smoke.png",
                            "mimeType": "image/png",
                            "buffer": PNG_1X1_BYTES,
                        },
                    )
                    page.fill("#file-note-input", image_caption)
                    page.fill("#file-source-input", "web_app_image")
                    page.locator("#file-capture-form button[type='submit']").click()
                    page.locator("#capture-feedback").get_by_text("inbox", exact=False).wait_for(timeout=15_000)

                    page.fill("#search-query-input", image_caption)
                    page.fill("#search-source-input", "web_app_image")
                    page.locator("#search-form button[type='submit']").click()
                    wait_for_text(page, "#search-results", image_caption, "image search result")
                    click_first_action(page, "#search-results [data-action='view-item']", "open image item")
                    page.locator("#viewer-content img").wait_for(timeout=15_000)
                    close_viewer(page)
                    page.set_input_files(
                        "#file-input",
                        {
                            "name": "Project Spec.pdf",
                            "mimeType": "application/pdf",
                            "buffer": pdf_bytes,
                        },
                    )
                    page.fill("#file-note-input", pdf_note)
                    page.fill("#file-source-input", "web_app_document")
                    page.locator("#file-capture-form button[type='submit']").click()
                    page.locator("#capture-feedback").get_by_text("inbox", exact=False).wait_for(timeout=15_000)

                    page.fill("#search-query-input", "Project Spec")
                    page.fill("#search-source-input", "web_app_document")
                    page.locator("#search-form button[type='submit']").click()
                    wait_for_text(page, "#search-results", pdf_note, "pdf search result")
                    click_first_action(page, "#search-results [data-action='view-item']", "open pdf item")
                    wait_for_text(page, "#viewer-meta", "Project Spec.pdf", "pdf meta")
                    page.locator("#viewer-content iframe").wait_for(timeout=15_000)
                    wait_for_text(page, "#viewer-content", "Axiom pdf browser line", "pdf extracted text")
                    close_viewer(page)
                    page.set_input_files(
                        "#file-input",
                        {
                            "name": "Weekly Plan.docx",
                            "mimeType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            "buffer": docx_bytes,
                        },
                    )
                    page.fill("#file-note-input", docx_note)
                    page.fill("#file-source-input", "web_app_docx")
                    page.locator("#file-capture-form button[type='submit']").click()
                    page.locator("#capture-feedback").get_by_text("inbox", exact=False).wait_for(timeout=15_000)

                    page.fill("#search-query-input", "browser search")
                    page.fill("#search-source-input", "web_app_docx")
                    page.locator("#search-form button[type='submit']").click()
                    wait_for_text(page, "#search-results", docx_note, "docx search result")
                    click_first_action(page, "#search-results [data-action='view-item']", "open docx item")
                    wait_for_text(page, "#viewer-meta", "Weekly Plan.docx", "docx meta")
                    wait_for_text(page, "#viewer-meta", "正文已就绪", "docx ready meta")
                    wait_for_text(page, "#viewer-content", "Docx body line for browser search", "docx extracted text")
                    page.locator("#viewer-actions").evaluate(
                        "(element) => element.scrollIntoView({ block: 'start', behavior: 'auto' })"
                    )
                    click_first_action(page, "#viewer-actions [data-action='edit-item']", "edit docx item")
                    page.locator("[data-role='item-edit-form'] textarea[name='derived_text']").fill("")
                    click_first_action(page, "#viewer-actions [data-action='save-item-edit']", "save empty docx derived text")
                    wait_for_text(page, "#viewer-meta", "待补正文", "docx pending meta")
                    close_viewer(page)

                    wait_for_text(page, "#overview-processing-backlog", "文档待补正文", "overview docx backlog card")
                    wait_for_text(page, "#overview-backlog-total", "待处理 1 条", "overview backlog total")
                    wait_for_text(page, "#processing-workbench", "文档待补正文", "processing workbench docx card")
                    wait_for_text(page, "#processing-queue-total", "待处理 1 条", "processing workbench total")
                    click_first_action(
                        page,
                        "#processing-workbench .processing-next-card [data-action='edit-item']",
                        "open next pending item editor from processing workbench",
                    )
                    wait_for_text(page, "#viewer-meta", "待补正文", "processing workbench viewer meta")
                    page.wait_for_selector("#viewer-actions [data-action='save-item-edit-next']")
                    page.wait_for_selector("#viewer-actions [data-action='open-next-pending-item-edit']")
                    page.wait_for_selector("[data-role='item-edit-form'] textarea[name='derived_text']")
                    close_viewer(page)
                    wait_for_text(page, "#overview-processing-backlog", "下一条", "overview backlog next item")
                    click_first_action(
                        page,
                        "#overview-processing-backlog .backlog-next-card [data-action='view-item']",
                        "open next pending item from overview",
                    )
                    wait_for_text(page, "#viewer-title", docx_note, "next pending viewer title")
                    wait_for_text(page, "#viewer-meta", "待补正文", "next pending viewer meta")
                    close_viewer(page)
                    click_first_action(
                        page,
                        "#overview-processing-backlog [data-action='apply-processing-backlog-filter']",
                        "apply overview backlog filter",
                    )
                    page.wait_for_function(
                        """
                        () => {
                            const typeInput = document.getElementById("recent-type-input");
                            const stateInput = document.getElementById("recent-processing-state-input");
                            return typeInput?.value === "document" && stateInput?.value === "pending";
                        }
                        """,
                        timeout=15_000,
                    )
                    wait_for_text(page, "#recent-list", docx_note, "pending docx recent result")
                    click_first_action(page, "#recent-list [data-action='view-item']", "open pending docx item")
                    wait_for_text(page, "#viewer-meta", "待补正文", "pending docx viewer meta")
                    page.locator("#viewer-actions").evaluate(
                        "(element) => element.scrollIntoView({ block: 'start', behavior: 'auto' })"
                    )
                    click_first_action(page, "#viewer-actions [data-action='edit-item']", "edit pending docx item")
                    wait_for_text(
                        page,
                        "#viewer-actions",
                        "保存并处理同类下一条",
                        "pending docx save-next action",
                    )
                    click_first_action(
                        page,
                        "#viewer-actions [data-action='save-item-edit-next']",
                        "save pending docx without changes and stay on current editor",
                    )
                    page.wait_for_selector("[data-role='item-edit-form'] textarea[name='derived_text']")
                    wait_for_text(page, "#viewer-meta", "待补正文", "pending docx still pending meta")
                    click_first_action(
                        page,
                        "#viewer-actions [data-action='mark-processing-ready-next']",
                        "mark pending docx ready and continue from editor",
                    )
                    wait_for_text(page, "#viewer-meta", "已手动标记完成", "docx manual ready meta")
                    wait_for_text(page, "#viewer-meta", "手动完成", "docx override meta")
                    page.reload(wait_until="domcontentloaded")
                    page.locator("#connection-indicator[data-state='ready']").wait_for(timeout=15_000)
                    page.locator("#overview-stats").wait_for(timeout=15_000)

                    page.set_input_files(
                        "#file-input",
                        {
                            "name": "batch-image.png",
                            "mimeType": "image/png",
                            "buffer": PNG_1X1_BYTES,
                        },
                    )
                    page.fill("#file-note-input", "")
                    page.fill("#file-source-input", "web_app_image_batch")
                    page.locator("#file-capture-form button[type='submit']").click()
                    page.locator("#capture-feedback").get_by_text("inbox", exact=False).wait_for(timeout=15_000)
                    wait_for_text(page, "#processing-workbench", "图片待补说明", "processing workbench batch image card")
                    click_first_action(
                        page,
                        "#processing-workbench [data-action='mark-processing-batch-ready']",
                        "mark image preview batch ready",
                    )
                    wait_for_text(page, "#processing-queue-total", "当前已清空", "processing queue cleared after batch ready")

                    page.fill("#search-query-input", "batch-image.png")
                    page.fill("#search-source-input", "web_app_image_batch")
                    page.locator("#search-form button[type='submit']").click()
                    wait_for_text(page, "#search-results", "batch-image.png", "batch image search result")
                    click_first_action(page, "#search-results [data-action='view-item']", "open batch image item")
                    wait_for_text(page, "#viewer-meta", "已手动标记完成", "batch image manual ready meta")
                    wait_for_text(page, "#viewer-meta", "手动完成", "batch image override meta")
                    close_viewer(page)

                    page.locator("#reset-search-button").click()
                    page.select_option("#search-type-input", "image")
                    page.select_option("#search-processing-override-input", "ready")
                    page.fill("#search-query-input", "batch-image.png")
                    page.fill("#search-source-input", "web_app_image_batch")
                    page.locator("#search-form button[type='submit']").click()
                    wait_for_text(page, "#search-results", "batch-image.png", "manual ready search filter result")
                    page.locator("#reset-recent-filters-button").click()
                    page.select_option("#recent-type-input", "image")
                    page.select_option("#recent-processing-override-input", "ready")
                    page.locator("#recent-filter-form button[type='submit']").click()
                    wait_for_text(page, "#recent-list", "batch-image.png", "manual ready recent filter result")
                    click_first_action(
                        page,
                        "#overview-stats [data-action='apply-overview-filter'][data-filter-kind='processing_override'][data-filter-value='ready']",
                        "apply manual ready overview stat filter",
                    )
                    page.wait_for_function(
                        """
                        () => {
                            const overrideInput = document.getElementById("recent-processing-override-input");
                            return overrideInput?.value === "ready";
                        }
                        """,
                        timeout=15_000,
                    )
                    wait_for_text(page, "#recent-list", "batch-image.png", "manual ready overview stat result")
                    click_first_action(
                        page,
                        "#search-batch-actions [data-action='mark-processing-batch-pending']",
                        "restore manual ready search batch to pending",
                    )
                    wait_for_text(page, "#search-feedback", "共 0 条结果", "manual ready search cleared after batch pending")
                    page.locator("#reset-recent-filters-button").click()
                    page.select_option("#recent-type-input", "image")
                    page.select_option("#recent-processing-state-input", "pending")
                    page.locator("#recent-filter-form button[type='submit']").click()
                    wait_for_text(page, "#recent-list", "batch-image.png", "restored pending image recent result")
                    click_first_action(
                        page,
                        "#recent-batch-actions [data-action='mark-processing-batch-ready']",
                        "mark restored pending recent batch ready",
                    )
                    wait_for_text(page, "#recent-feedback", "共 0 条记录", "pending recent cleared after batch ready")
                    page.locator("#reset-search-button").click()
                    page.select_option("#search-type-input", "image")
                    page.select_option("#search-processing-override-input", "ready")
                    page.fill("#search-query-input", "batch-image.png")
                    page.fill("#search-source-input", "web_app_image_batch")
                    page.locator("#search-form button[type='submit']").click()
                    wait_for_text(page, "#search-results", "batch-image.png", "recent batch ready search result")
                    click_first_action(
                        page,
                        "#search-batch-actions [data-action='mark-processing-batch-pending']",
                        "restore recent batch ready image to pending",
                    )
                    wait_for_text(page, "#search-feedback", "共 0 条结果", "recent batch ready search cleared after batch pending")
                    page.locator("#reset-search-button").click()
                    page.locator("#reset-recent-filters-button").click()

                    page.set_input_files(
                        "#file-input",
                        {
                            "name": "meeting-note.m4a",
                            "mimeType": "audio/mp4",
                            "buffer": b"fake playwright m4a bytes",
                        },
                    )
                    page.set_input_files(
                        "#file-transcript-file-input",
                        {
                            "name": "meeting-note.srt",
                            "mimeType": "application/x-subrip",
                            "buffer": (
                                "1\n"
                                "00:00:00,000 --> 00:00:01,500\n"
                                f"{audio_transcript}\n\n"
                                "2\n"
                                "00:00:01,700 --> 00:00:03,000\n"
                                "Second browser transcript line\n"
                            ).encode("utf-8"),
                        },
                    )
                    page.fill("#file-note-input", audio_note)
                    page.fill("#file-source-input", "web_app_audio")
                    page.locator("#file-capture-form button[type='submit']").click()
                    page.locator("#capture-feedback").get_by_text("inbox", exact=False).wait_for(timeout=15_000)

                    page.fill("#search-query-input", audio_transcript)
                    page.fill("#search-source-input", "web_app_audio")
                    page.locator("#search-form button[type='submit']").click()
                    wait_for_text(page, "#search-results", audio_note, "audio search result")
                    click_first_action(page, "#search-results [data-action='view-item']", "open audio item")
                    wait_for_text(page, "#viewer-meta", "meeting-note.m4a", "audio meta")
                    page.locator("#viewer-content audio").wait_for(timeout=15_000)
                    wait_for_text(page, "#viewer-content", audio_transcript, "audio transcript")
                    wait_for_text(page, "#viewer-content", "Second browser transcript line", "audio transcript second line")
                    click_first_action(page, "#viewer-actions [data-action='edit-item']", "edit audio item")
                    page.locator("[data-role='item-edit-form'] textarea[name='transcript_text']").fill(updated_audio_transcript)
                    click_first_action(page, "#viewer-actions [data-action='save-item-edit']", "save audio transcript")
                    wait_for_text(page, "#viewer-content", updated_audio_transcript, "updated audio transcript")
                    close_viewer(page)

                    page.fill("#search-query-input", updated_audio_transcript)
                    page.fill("#search-source-input", "web_app_audio")
                    page.locator("#search-form button[type='submit']").click()
                    wait_for_text(page, "#search-results", audio_note, "updated audio transcript search result")

                    page.set_input_files(
                        "#file-input",
                        {
                            "name": "pending-shot.png",
                            "mimeType": "image/png",
                            "buffer": PNG_1X1_BYTES,
                        },
                    )
                    page.fill("#file-note-input", "")
                    page.fill("#file-source-input", "web_app_image_pending")
                    page.locator("#file-capture-form button[type='submit']").click()
                    page.locator("#capture-feedback").get_by_text("inbox", exact=False).wait_for(timeout=15_000)
                    wait_for_text(page, "#overview-processing-backlog", "图片待补说明", "overview pending image backlog card")

                    vue_page = browser.new_page()
                    try:
                        vue_page.goto(f"{base_url}/app", wait_until="domcontentloaded")
                        vue_page.evaluate("localStorage.setItem('axiom.key', 'test-key')")
                        vue_board_title = "Vue smoke learning board"
                        vue_board_id = vue_page.evaluate(
                            """
                            async (title) => {
                                const response = await fetch("/api/learning/boards", {
                                    method: "POST",
                                    headers: {
                                        "X-Axiom-Key": "test-key",
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ title, source_type: "manual", widgets: [], nodes: [] }),
                                });
                                if (!response.ok) throw new Error(await response.text());
                                const payload = await response.json();
                                return payload.board_id;
                            }
                            """,
                            vue_board_title,
                        )
                        vue_page.goto(f"{base_url}/app?mode=recent", wait_until="networkidle")
                        vue_page.get_by_role("heading", name="近况").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="处理积压").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="学习白板").wait_for(timeout=15_000)
                        vue_page.get_by_text(vue_board_title, exact=False).wait_for(timeout=15_000)
                        vue_page.get_by_role("button", name="打开白板工作区").wait_for(timeout=15_000)
                        with vue_page.expect_navigation(url=f"**/board/{vue_board_id}", wait_until="domcontentloaded"):
                            vue_page.locator(".board-row").filter(has_text=vue_board_title).first.click()
                        vue_page.get_by_role("heading", name=vue_board_title).first.wait_for(timeout=15_000)
                        vue_page.goto(f"{base_url}/app?mode=recent", wait_until="networkidle")
                        vue_search_text = "Vue smoke search target"
                        vue_page.evaluate(
                            """
                            async (text) => {
                                const response = await fetch("/add", {
                                    method: "POST",
                                    headers: {
                                        "X-Axiom-Key": "test-key",
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ text, source: "vue_search_smoke" }),
                                });
                                if (!response.ok) throw new Error(await response.text());
                            }
                            """,
                            vue_search_text,
                        )
                        vue_page.goto(f"{base_url}/app?mode=search", wait_until="networkidle")
                        vue_page.get_by_role("heading", name="搜索").wait_for(timeout=15_000)
                        vue_page.get_by_label("搜索查询").fill(vue_search_text)
                        with vue_page.expect_response(
                            lambda response: "/search/all" in response.url and response.status == 200
                        ):
                            vue_page.locator("main").get_by_role("button", name="搜索").click()
                        vue_page.locator(".result-row").filter(has_text=vue_search_text).first.wait_for(timeout=15_000)
                        vue_page.locator(".result-row").filter(has_text=vue_search_text).first.click()
                        vue_page.locator(".drawer-panel").get_by_text(vue_search_text, exact=False).wait_for(timeout=15_000)
                        vue_page.get_by_label("关闭").click()
                        vue_page.goto(f"{base_url}/app?mode=timeline", wait_until="networkidle")
                        vue_page.get_by_role("heading", name="时间流").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="活动").wait_for(timeout=15_000)
                        vue_page.locator(".entry-row").filter(has_text=vue_search_text).first.wait_for(timeout=15_000)
                        vue_page.goto(f"{base_url}/app?mode=system", wait_until="networkidle")
                        vue_page.get_by_role("heading", name="系统治理").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="运行状态").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="数据表").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="审计日志").wait_for(timeout=15_000)
                        vue_page.goto(f"{base_url}/app?mode=recent", wait_until="networkidle")
                        with vue_page.expect_response(
                            lambda response: "/processing/mark-ready" in response.url and response.status == 200
                        ):
                            vue_page.get_by_role("button", name="标记就绪").first.click()
                        vue_page.locator(".state-pill.ready").first.wait_for(timeout=15_000)
                        pending_button = vue_page.get_by_role("button", name="退回待处理").first
                        pending_button.wait_for(timeout=15_000)
                        pending_button.scroll_into_view_if_needed(timeout=15_000)
                        with vue_page.expect_response(
                            lambda response: "/processing/mark-pending" in response.url and response.status == 200
                        ):
                            pending_button.click()
                        vue_page.get_by_role("button", name="标记就绪").first.wait_for(timeout=15_000)

                        vue_page.goto(f"{base_url}/app?mode=processing", wait_until="networkidle")
                        vue_page.get_by_role("heading", name="处理工作台").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="全局下一条").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="队列分组").wait_for(timeout=15_000)
                        image_group = vue_page.locator(".group-card").filter(has_text="图片待补说明").first
                        image_group.get_by_role("button", name="打开下一条").click()
                        vue_page.get_by_role("button", name="完成并打开同类下一条").wait_for(timeout=15_000)
                        with vue_page.expect_response(
                            lambda response: "/processing/mark-ready" in response.url and response.status == 200
                        ):
                            vue_page.get_by_role("button", name="完成并打开同类下一条").click()
                        vue_page.goto(f"{base_url}/app?mode=processing", wait_until="networkidle")
                        vue_page.get_by_role("heading", name="处理工作台").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="队列分组").wait_for(timeout=15_000)
                        with vue_page.expect_response(
                            lambda response: "/processing/mark-ready" in response.url and response.status == 200
                        ):
                            vue_page.get_by_role("button", name="批量标记就绪").first.click()
                        vue_page.get_by_role("heading", name="刚处理的记录").wait_for(timeout=15_000)
                        with vue_page.expect_response(
                            lambda response: "/processing/mark-pending" in response.url and response.status == 200
                        ):
                            vue_page.get_by_role("button", name="退回待处理").first.click()

                        restored_ids = vue_page.evaluate(
                            """
                            async () => {
                                const headers = { "X-Axiom-Key": "test-key" };
                                const response = await fetch("/recent?type=image&sort=newest&page=1&page_size=20", { headers });
                                if (!response.ok) throw new Error(await response.text());
                                const payload = await response.json();
                                const ids = (payload.items || [])
                                    .filter((item) => ["batch-image.png", "pending-shot.png"].includes(item.original_name))
                                    .map((item) => item.id);
                                if (ids.length) {
                                    const restoreResponse = await fetch("/processing/mark-pending", {
                                        method: "POST",
                                        headers: { ...headers, "Content-Type": "application/json" },
                                        body: JSON.stringify({ ids }),
                                    });
                                    if (!restoreResponse.ok) throw new Error(await restoreResponse.text());
                                }
                                return ids;
                            }
                            """
                        )
                        if len(restored_ids) < 2:
                            raise AssertionError(f"Vue recent action restore missed smoke image ids: {restored_ids}")

                        vue_task_title = "Vue smoke task"
                        today = datetime.now().date().isoformat()
                        vue_page.goto(f"{base_url}/app?mode=tasks", wait_until="networkidle")
                        vue_page.get_by_role("heading", name="任务台").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="今日任务").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="全部任务").wait_for(timeout=15_000)
                        vue_page.get_by_label("任务标题").fill(vue_task_title)
                        vue_page.get_by_label("任务详情").fill("created by smoke test")
                        vue_page.get_by_label("截止日期").fill(today)
                        with vue_page.expect_response(
                            lambda response: response.url.endswith("/tasks")
                            and response.request.method == "POST"
                            and response.status == 201
                        ):
                            vue_page.get_by_role("button", name="添加任务").click()
                        vue_task_row = vue_page.locator(".list-panel .task-row").filter(has_text=vue_task_title).first
                        vue_task_row.wait_for(timeout=15_000)
                        with vue_page.expect_response(
                            lambda response: "/tasks/" in response.url
                            and response.url.endswith("/done")
                            and response.status == 200
                        ):
                            vue_task_row.get_by_role("button", name="完成").click()
                        vue_page.locator(".list-panel .task-row").filter(has_text=vue_task_title).filter(
                            has_text="已完成"
                        ).first.wait_for(timeout=15_000)
                        vue_page.goto(f"{base_url}/app?mode=search", wait_until="networkidle")
                        vue_page.get_by_role("heading", name="搜索").wait_for(timeout=15_000)
                        vue_page.get_by_label("搜索查询").fill(vue_task_title)
                        with vue_page.expect_response(
                            lambda response: "/search/all" in response.url and response.status == 200
                        ):
                            vue_page.locator("main").get_by_role("button", name="搜索").click()
                        vue_page.locator(".result-row").filter(has_text=vue_task_title).first.click()
                        vue_page.locator(".object-panel").get_by_text("created by smoke test", exact=False).wait_for(
                            timeout=15_000
                        )
                        vue_page.get_by_label("关闭").click()
                        vue_page.goto(f"{base_url}/app?mode=timeline", wait_until="networkidle")
                        vue_page.get_by_role("heading", name="时间流").wait_for(timeout=15_000)
                        vue_page.locator(".entry-row").filter(has_text=vue_task_title).first.click()
                        vue_page.locator(".object-panel").get_by_text("已完成", exact=False).wait_for(timeout=15_000)
                        vue_page.get_by_label("关闭").click()

                        vue_memory_content = "Vue smoke memory"
                        vue_page.goto(f"{base_url}/app?mode=memories", wait_until="networkidle")
                        vue_page.get_by_role("heading", name="记忆库").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="快速新增").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="记忆列表").wait_for(timeout=15_000)
                        vue_page.get_by_label("记忆内容").fill(vue_memory_content)
                        vue_page.get_by_label("记忆详情").fill("created by smoke test")
                        with vue_page.expect_response(
                            lambda response: response.url.endswith("/memories")
                            and response.request.method == "POST"
                            and response.status == 201
                        ):
                            vue_page.get_by_role("button", name="添加记忆").click()
                        vue_memory_row = vue_page.locator(".list-panel .memory-row").filter(
                            has_text=vue_memory_content
                        ).first
                        vue_memory_row.wait_for(timeout=15_000)
                        with vue_page.expect_response(
                            lambda response: "/memories/" in response.url
                            and response.url.endswith("/confirm")
                            and response.status == 200
                        ):
                            vue_memory_row.get_by_role("button", name="确认").click()
                        vue_page.locator(".list-panel .memory-row").filter(has_text=vue_memory_content).filter(
                            has_text="已确认"
                        ).first.wait_for(timeout=15_000)

                        vue_decision_title = "Vue smoke decision"
                        vue_page.goto(f"{base_url}/app?mode=decisions", wait_until="networkidle")
                        vue_page.get_by_role("heading", name="决策台").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="快速新增").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="决策列表").wait_for(timeout=15_000)
                        vue_page.get_by_label("决策标题").fill(vue_decision_title)
                        vue_page.get_by_label("决策内容").fill("choose the smoke path")
                        vue_page.get_by_label("决策背景").fill("created by smoke test")
                        vue_page.get_by_label("预期结果").fill("decision can be reviewed")
                        with vue_page.expect_response(
                            lambda response: response.url.endswith("/decisions")
                            and response.request.method == "POST"
                            and response.status == 201
                        ):
                            vue_page.get_by_role("button", name="添加决策").click()
                        vue_decision_row = vue_page.locator(".list-panel .decision-row").filter(
                            has_text=vue_decision_title
                        ).first
                        vue_decision_row.wait_for(timeout=15_000)
                        vue_decision_row.get_by_label("实际结果").fill("reviewed by smoke test")
                        with vue_page.expect_response(
                            lambda response: "/decisions/" in response.url
                            and response.url.endswith("/review")
                            and response.status == 200
                        ):
                            vue_decision_row.get_by_role("button", name="标记已回顾").click()
                        vue_page.locator(".list-panel .decision-row").filter(has_text=vue_decision_title).filter(
                            has_text="已回顾"
                        ).first.wait_for(timeout=15_000)

                        vue_page.goto(f"{base_url}/app?mode=automation", wait_until="networkidle")
                        vue_page.get_by_role("heading", name="自动化中心").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="可执行任务").wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="生成音频自动转写").wait_for(timeout=15_000)
                        vue_page.locator(".job-card").filter(has_text="生成音频自动转写").locator(
                            ".job-meta span",
                            has_text="Mock",
                        ).wait_for(timeout=15_000)
                        vue_page.get_by_role("heading", name="运行记录").wait_for(timeout=15_000)
                        if vue_page.get_by_role("option", name="跳过").count() != 1:
                            raise AssertionError("Vue automation status filter missing skipped option")
                        inbox_job_card = vue_page.locator(".job-card").filter(has_text="生成 Inbox 报告")
                        inbox_job_card.wait_for(timeout=15_000)
                        with vue_page.expect_response(
                            lambda response: "/automation/run" in response.url and response.status == 200
                        ):
                            inbox_job_card.get_by_role("button", name="运行").click()
                        vue_page.get_by_text("生成 Inbox 报告 已完成", exact=False).wait_for(timeout=20_000)
                        vue_page.locator(".run-detail").get_by_text("生成 Inbox 报告", exact=False).wait_for(timeout=15_000)
                    finally:
                        vue_page.close()

                    page.locator("#reset-recent-filters-button").click()
                    page.select_option("#recent-type-input", "image")
                    page.fill("#recent-source-input", "web_app_image_pending")
                    page.select_option("#recent-processing-state-input", "pending")
                    with page.expect_response(
                        lambda response: "/recent" in response.url
                        and "source=web_app_image_pending" in response.url
                        and response.status == 200
                    ):
                        page.locator("#recent-filter-form button[type='submit']").click()
                    wait_for_text(page, "#recent-list", "pending-shot.png", "pending image recent result")
                    click_first_action(page, "#recent-list [data-action='view-item']", "open pending image item")
                    wait_for_text(page, "#viewer-meta", "pending-shot.png", "pending image viewer meta")
                    click_first_action(
                        page,
                        "#viewer-actions [data-action='open-next-pending-item']",
                        "open next pending image from viewer",
                    )
                    wait_for_text(page, "#viewer-title", "batch-image.png", "next pending image viewer title")
                    wait_for_text(page, "#viewer-meta", "待补说明", "next pending image viewer meta")
                    close_viewer(page)
                    click_first_action(
                        page,
                        "#recent-batch-actions [data-action='mark-processing-batch-ready']",
                        "mark pending recent batch ready",
                    )
                    wait_for_text(page, "#recent-feedback", "共 0 条记录", "pending recent cleared after batch ready")
                    page.locator("#reset-recent-filters-button").click()
                    page.select_option("#recent-type-input", "image")
                    page.select_option("#recent-processing-override-input", "ready")
                    page.locator("#recent-filter-form button[type='submit']").click()
                    wait_for_text(page, "#recent-list", "pending-shot.png", "search batch ready image recent result")
                    click_first_action(
                        page,
                        "#recent-batch-actions [data-action='mark-processing-batch-pending']",
                        "restore search batch ready image to pending",
                    )
                    wait_for_text(page, "#recent-feedback", "共 0 条记录", "manual ready recent cleared after second batch pending")
                    page.locator("#reset-search-button").click()

                    page.fill("#automation-date-input", run_date)
                    click_first_action(page, "[data-job-id='image_describe_day']", "run image describe day")
                    wait_for_text(page, "#viewer-title", f"{run_date}.md", "image describe artifact viewer title")
                    wait_for_text(page, "#viewer-content", "pending-shot.png", "image describe artifact body")
                    close_viewer(page)

                    page.fill("#search-query-input", "pending-shot.png")
                    page.fill("#search-source-input", "web_app_image_pending")
                    page.locator("#search-form button[type='submit']").click()
                    wait_for_text(page, "#search-results", "pending-shot.png", "described image search result")
                    click_first_action(page, "#search-results [data-action='view-item']", "open described image item")
                    click_first_action(page, "#viewer-actions [data-action='edit-item']", "edit described image item")
                    image_description_value = page.locator(
                        "[data-role='item-edit-form'] textarea[name='content']"
                    ).input_value()
                    if "browser mock image description for pending-shot.png" not in image_description_value:
                        raise AssertionError(
                            "described image edit form missing mock description: "
                            f"{image_description_value}"
                        )
                    close_viewer(page)

                    page.fill("#automation-date-input", run_date)
                    click_first_action(page, "[data-job-id='review_day']", "run daily review")
                    wait_for_text(page, "#viewer-title", f"{run_date}.md", "artifact viewer title")
                    wait_for_text(page, "#viewer-content", "Summary", "artifact viewer body")
                    close_viewer(page)

                    page.locator("#automation-runs .automation-run-card").first.wait_for(timeout=15_000)
                    click_first_action(
                        page,
                        "#automation-runs [data-action='view-automation-run']",
                        "open automation run",
                    )
                    wait_for_text(page, "#viewer-content", "completed", "automation run output")
                    close_viewer(page)

                    click_first_action(
                        page,
                        "#automation-runs [data-action='rerun-automation-run']",
                        "rerun automation job",
                    )
                    wait_for_text(page, "#viewer-title", f"{run_date}.md", "rerun artifact title")
                    wait_for_text(page, "#viewer-content", "Summary", "rerun artifact body")
                    close_viewer(page)

                    browser.close()
            finally:
                server.stop()
        except Exception:
            logging.exception("smoke_test_web_app failed")
            raise


if __name__ == "__main__":
    main()
