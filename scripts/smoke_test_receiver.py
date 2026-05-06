from __future__ import annotations

import io
import logging
import os
import subprocess
import sys
import tempfile
import time
import zipfile
from datetime import datetime, timedelta, timezone
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))


def assert_status(response, expected_status: int, label: str) -> dict:
    body = response.get_json()
    if response.status_code != expected_status:
        raise AssertionError(
            f"{label}: expected HTTP {expected_status}, got {response.status_code}, body={body}"
        )
    if body is None:
        raise AssertionError(f"{label}: response is not JSON")
    return body


def assert_file_body(response, expected_bytes: bytes, label: str) -> None:
    if response.status_code != 200:
        raise AssertionError(f"{label}: expected HTTP 200, got {response.status_code}")
    if expected_bytes not in response.data:
        raise AssertionError(f"{label}: file content did not match expected bytes")
    response.close()


def current_local_date_iso() -> str:
    return datetime.now(timezone(timedelta(hours=8))).date().isoformat()


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


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="axiom_receiver_") as temp_dir:
        root = Path(temp_dir)
        os.environ["AXIOM_ROOT"] = str(root)
        os.environ["AXIOM_SECRET_KEY"] = "test-key"
        os.environ["AXIOM_LOG_PATH"] = str(root / "logs" / "receiver.log")

        try:
            from core.receiver import app  # noqa: WPS433
            from scripts.check_consistency import build_report  # noqa: WPS433

            client = app.test_client()
            first_text = "Axiom first smoke text"

            health = assert_status(client.get("/health"), 200, "health")
            assert health["ok"] is True

            app_shell = client.get("/app")
            if app_shell.status_code != 200:
                raise AssertionError(
                    f"app shell: expected HTTP 200, got {app_shell.status_code}"
                )
            app_shell_body = app_shell.get_data(as_text=True)
            if "Axiom 外脑控制台" not in app_shell_body:
                raise AssertionError(f"app shell body unexpected: {app_shell_body[:200]}")

            app_css = client.get("/static/app.css")
            if app_css.status_code != 200:
                raise AssertionError(
                    f"app css: expected HTTP 200, got {app_css.status_code}"
                )
            if ":root" not in app_css.get_data(as_text=True):
                raise AssertionError("app css body unexpected")

            app_js = client.get("/static/app.js")
            if app_js.status_code != 200:
                raise AssertionError(
                    f"app js: expected HTTP 200, got {app_js.status_code}"
                )
            if "syncDashboard" not in app_js.get_data(as_text=True):
                raise AssertionError("app js body unexpected")

            app_manifest = client.get("/static/manifest.webmanifest")
            if app_manifest.status_code != 200:
                raise AssertionError(
                    "manifest: "
                    f"expected HTTP 200, got {app_manifest.status_code}"
                )
            if "Axiom 外脑控制台" not in app_manifest.get_data(as_text=True):
                raise AssertionError("manifest body unexpected")

            service_worker = client.get("/sw.js")
            if service_worker.status_code != 200:
                raise AssertionError(
                    "service worker: "
                    f"expected HTTP 200, got {service_worker.status_code}"
                )
            if "axiom-app-shell-v1" not in service_worker.get_data(as_text=True):
                raise AssertionError("service worker body unexpected")

            app_icon = client.get("/static/icons/axiom-mark.svg")
            if app_icon.status_code != 200:
                raise AssertionError(
                    f"app icon: expected HTTP 200, got {app_icon.status_code}"
                )
            if "<svg" not in app_icon.get_data(as_text=True):
                raise AssertionError("app icon body unexpected")

            unauthorized = assert_status(
                client.get("/add", query_string={"text": "hello"}),
                403,
                "unauthorized add",
            )
            assert unauthorized["ok"] is False

            first = assert_status(
                client.get(
                    "/add",
                    query_string={"key": "test-key", "text": first_text},
                ),
                200,
                "add via query",
            )
            assert first["item"]["type"] == "text"
            assert first["item"]["storage"] == "inbox"
            assert first["item"]["file_url"] == f"/file/{first['item']['id']}"

            item_detail = assert_status(
                client.get(
                    f"/item/{first['item']['id']}",
                    query_string={"key": "test-key"},
                ),
                200,
                "item detail",
            )
            assert item_detail["item"]["content"] == first_text
            assert item_detail["item"]["storage"] == "inbox"
            assert item_detail["item"]["file_url"] == first["item"]["file_url"]

            invalid_text_update = assert_status(
                client.post(
                    f"/item/{first['item']['id']}/update",
                    headers={"X-Axiom-Key": "test-key"},
                    json={"content": "   "},
                ),
                400,
                "invalid text update",
            )
            assert invalid_text_update["ok"] is False
            assert invalid_text_update["error"]["code"] == "empty_text"

            updated_first_text = "Axiom first smoke text updated\nsecond line"
            updated_first = assert_status(
                client.post(
                    f"/item/{first['item']['id']}/update",
                    headers={"X-Axiom-Key": "test-key"},
                    json={"content": updated_first_text},
                ),
                200,
                "update text item",
            )
            assert updated_first["message"] == "updated"
            assert updated_first["updated_fields"] == ["content"]
            assert updated_first["item"]["content"] == updated_first_text
            assert updated_first["item"]["source"] == "ios_shortcut"

            updated_item_detail = assert_status(
                client.get(
                    f"/item/{first['item']['id']}",
                    query_string={"key": "test-key"},
                ),
                200,
                "updated item detail",
            )
            assert updated_item_detail["item"]["content"] == updated_first_text

            text_file = client.get(
                f"/file/{first['item']['id']}",
                query_string={"key": "test-key"},
            )
            assert_file_body(text_file, updated_first_text.encode("utf-8"), "text file")

            archived = assert_status(
                client.post(
                    f"/archive/{first['item']['id']}",
                    query_string={"key": "test-key"},
                ),
                200,
                "archive text item",
            )
            assert archived["item"]["storage"] == "archive"
            assert archived["item"]["file_url"] == first["item"]["file_url"]

            archived_text_file = client.get(
                f"/file/{first['item']['id']}",
                query_string={"key": "test-key"},
            )
            assert_file_body(
                archived_text_file,
                updated_first_text.encode("utf-8"),
                "archived text file",
            )

            recent_archive_before_restore = assert_status(
                client.get(
                    "/recent",
                    query_string={"key": "test-key", "storage": "archive"},
                ),
                200,
                "recent archive before restore",
            )
            assert recent_archive_before_restore["storage"] == "archive"
            assert recent_archive_before_restore["total"] == 1
            assert recent_archive_before_restore["items"][0]["storage"] == "archive"

            archive_search_before_restore = assert_status(
                client.get(
                    "/search",
                    query_string={
                        "key": "test-key",
                        "q": "Axiom",
                        "storage": "archive",
                    },
                ),
                200,
                "search archive before restore",
            )
            assert archive_search_before_restore["storage"] == "archive"
            assert archive_search_before_restore["total"] == 1
            assert archive_search_before_restore["items"][0]["storage"] == "archive"

            restored = assert_status(
                client.post(
                    f"/restore/{first['item']['id']}",
                    query_string={"key": "test-key"},
                ),
                200,
                "restore text item",
            )
            assert restored["message"] == "restored"
            assert restored["item"]["storage"] == "inbox"
            assert restored["item"]["file_url"] == first["item"]["file_url"]

            restored_item_detail = assert_status(
                client.get(
                    f"/item/{first['item']['id']}",
                    query_string={"key": "test-key"},
                ),
                200,
                "restored item detail",
            )
            assert restored_item_detail["item"]["content"] == updated_first_text
            assert restored_item_detail["item"]["storage"] == "inbox"

            restored_text_file = client.get(
                f"/file/{first['item']['id']}",
                query_string={"key": "test-key"},
            )
            assert_file_body(
                restored_text_file,
                updated_first_text.encode("utf-8"),
                "restored text file",
            )

            restored_again = assert_status(
                client.post(
                    f"/restore/{first['item']['id']}",
                    query_string={"key": "test-key"},
                ),
                200,
                "restore already restored item",
            )
            assert restored_again["message"] == "already restored"
            assert restored_again["item"]["storage"] == "inbox"

            time.sleep(1.1)

            second = assert_status(
                client.post(
                    "/add",
                    headers={"X-Axiom-Key": "test-key"},
                    json={"text": "literal 100% value", "source": "smoke_test"},
                ),
                200,
                "add via json",
            )
            assert second["item"]["source"] == "smoke_test"

            time.sleep(1.1)

            image = assert_status(
                client.post(
                    "/upload",
                    data={
                        "key": "test-key",
                        "caption": "smoke image",
                        "file": (io.BytesIO(b"fake png bytes"), "smoke.png"),
                    },
                    content_type="multipart/form-data",
                ),
                200,
                "upload image",
            )
            assert image["item"]["type"] == "image"
            assert image["item"]["content"] == "smoke image"
            assert image["item"]["storage"] == "inbox"
            assert image["item"]["file_path"].endswith(".png")
            assert image["item"]["file_url"] == f"/file/{image['item']['id']}"

            image_file = client.get(
                f"/file/{image['item']['id']}",
                headers={"X-Axiom-Key": "test-key"},
            )
            assert_file_body(image_file, b"fake png bytes", "image file")

            updated_image_caption = "edited smoke image"
            updated_image = assert_status(
                client.post(
                    f"/item/{image['item']['id']}/update",
                    headers={"X-Axiom-Key": "test-key"},
                    json={
                        "content": updated_image_caption,
                        "source": "image_edit_test",
                    },
                ),
                200,
                "update image item",
            )
            assert updated_image["message"] == "updated"
            assert updated_image["updated_fields"] == ["content", "source"]
            assert updated_image["item"]["content"] == updated_image_caption
            assert updated_image["item"]["source"] == "image_edit_test"

            updated_image_detail = assert_status(
                client.get(
                    f"/item/{image['item']['id']}",
                    query_string={"key": "test-key"},
                ),
                200,
                "updated image detail",
            )
            assert updated_image_detail["item"]["content"] == updated_image_caption
            assert updated_image_detail["item"]["source"] == "image_edit_test"

            time.sleep(1.1)

            docx_bytes = build_docx_bytes(
                "Axiom project plan",
                "Document body line for extracted search",
            )
            document = assert_status(
                client.post(
                    "/upload",
                    data={
                        "key": "test-key",
                        "source": "document_test",
                        "file": (io.BytesIO(docx_bytes), "Weekly Plan.docx"),
                    },
                    content_type="multipart/form-data",
                ),
                200,
                "upload document",
            )
            assert document["item"]["type"] == "document"
            assert document["item"]["content"] == "Weekly Plan.docx"
            assert document["item"]["original_name"] == "Weekly Plan.docx"
            assert document["item"]["mime_type"] == (
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            )
            assert document["item"]["extension"] == "docx"
            assert document["item"]["download_name"] == "Weekly Plan.docx"
            assert document["item"]["size_bytes"] == len(docx_bytes)
            assert document["item"]["derived_text_available"] is True
            assert "Document body line for extracted search" in (
                document["item"]["derived_text_preview"] or ""
            )

            document_file = client.get(
                f"/file/{document['item']['id']}",
                headers={"X-Axiom-Key": "test-key"},
            )
            if "Weekly Plan.docx" not in (document_file.headers.get("Content-Disposition") or ""):
                raise AssertionError(
                    f"document file headers unexpected: {document_file.headers!r}"
                )
            assert_file_body(document_file, docx_bytes, "document file")

            document_detail = assert_status(
                client.get(
                    f"/item/{document['item']['id']}",
                    query_string={"key": "test-key"},
                ),
                200,
                "document detail",
            )
            assert document_detail["item"]["derived_text_available"] is True
            assert (
                "Document body line for extracted search"
                in (document_detail["item"].get("derived_text") or "")
            )

            time.sleep(1.1)

            audio = assert_status(
                client.post(
                    "/upload",
                    data={
                        "key": "test-key",
                        "content": "team sync voice note",
                        "source": "audio_test",
                        "file": (io.BytesIO(b"fake m4a bytes"), "meeting-note.m4a"),
                    },
                    content_type="multipart/form-data",
                ),
                200,
                "upload audio",
            )
            assert audio["item"]["type"] == "audio"
            assert audio["item"]["content"] == "team sync voice note"
            assert audio["item"]["original_name"] == "meeting-note.m4a"
            assert audio["item"]["mime_type"] in {"audio/mp4", "audio/x-m4a"}
            assert audio["item"]["extension"] == "m4a"
            assert audio["item"]["download_name"] == "meeting-note.m4a"
            assert audio["item"]["size_bytes"] == len(b"fake m4a bytes")

            audio_file = client.get(
                f"/file/{audio['item']['id']}",
                headers={"X-Axiom-Key": "test-key"},
            )
            if "meeting-note.m4a" not in (audio_file.headers.get("Content-Disposition") or ""):
                raise AssertionError(
                    f"audio file headers unexpected: {audio_file.headers!r}"
                )
            assert_file_body(audio_file, b"fake m4a bytes", "audio file")

            recent = assert_status(
                client.get("/recent", query_string={"key": "test-key", "limit": "100"}),
                200,
                "recent",
            )
            assert recent["page_size"] == 50
            assert recent["total"] == 5
            assert len(recent["items"]) == 5
            assert all(item["file_url"].startswith("/file/") for item in recent["items"])

            recent_images = assert_status(
                client.get(
                    "/recent",
                    query_string={"key": "test-key", "type": "image"},
                ),
                200,
                "recent image filter",
            )
            assert recent_images["type"] == "image"
            assert recent_images["total"] == 1
            assert recent_images["items"][0]["type"] == "image"

            recent_documents = assert_status(
                client.get(
                    "/recent",
                    query_string={"key": "test-key", "type": "document"},
                ),
                200,
                "recent document filter",
            )
            assert recent_documents["type"] == "document"
            assert recent_documents["total"] == 1
            assert recent_documents["items"][0]["type"] == "document"
            assert recent_documents["items"][0]["derived_text_available"] is True

            recent_audio = assert_status(
                client.get(
                    "/recent",
                    query_string={"key": "test-key", "type": "audio"},
                ),
                200,
                "recent audio filter",
            )
            assert recent_audio["type"] == "audio"
            assert recent_audio["total"] == 1
            assert recent_audio["items"][0]["type"] == "audio"

            recent_archive = assert_status(
                client.get(
                    "/recent",
                    query_string={"key": "test-key", "storage": "archive"},
                ),
                200,
                "recent archive filter",
            )
            assert recent_archive["storage"] == "archive"
            assert recent_archive["total"] == 0
            assert recent_archive["items"] == []

            recent_inbox = assert_status(
                client.get(
                    "/recent",
                    query_string={"key": "test-key", "storage": "inbox"},
                ),
                200,
                "recent inbox filter",
            )
            assert recent_inbox["storage"] == "inbox"
            assert recent_inbox["total"] == 5

            recent_created_from = assert_status(
                client.get(
                    "/recent",
                    query_string={
                        "key": "test-key",
                        "created_from": audio["item"]["created_at"],
                    },
                ),
                200,
                "recent created_from filter",
            )
            assert recent_created_from["created_from"] == audio["item"]["created_at"]
            assert recent_created_from["total"] == 1
            assert recent_created_from["items"][0]["id"] == audio["item"]["id"]

            recent_created_to = assert_status(
                client.get(
                    "/recent",
                    query_string={
                        "key": "test-key",
                        "created_to": second["item"]["created_at"],
                    },
                ),
                200,
                "recent created_to filter",
            )
            assert recent_created_to["created_to"] == second["item"]["created_at"]
            assert recent_created_to["total"] == 2
            assert all(
                item["created_at"] <= second["item"]["created_at"]
                for item in recent_created_to["items"]
            )

            recent_source = assert_status(
                client.get(
                    "/recent",
                    query_string={"key": "test-key", "source": "smoke_test"},
                ),
                200,
                "recent source filter",
            )
            assert recent_source["source"] == "smoke_test"
            assert recent_source["total"] == 1
            assert recent_source["items"][0]["source"] == "smoke_test"

            search = assert_status(
                client.get("/search", query_string={"key": "test-key", "q": "Axiom"}),
                200,
                "search",
            )
            assert search["total"] == 2
            assert search["items"][0]["score"] > 0
            assert search["items"][0]["file_url"].startswith("/file/")
            assert search["items"][0]["id"] == first["item"]["id"]

            literal_search = assert_status(
                client.get("/search", query_string={"key": "test-key", "q": "100%"}),
                200,
                "literal percent search",
            )
            assert literal_search["total"] == 1

            image_search = assert_status(
                client.get(
                    "/search",
                    query_string={"key": "test-key", "q": "smoke", "type": "image"},
                ),
                200,
                "search image filter",
            )
            assert image_search["type"] == "image"
            assert image_search["total"] == 1
            assert image_search["items"][0]["type"] == "image"

            document_name_search = assert_status(
                client.get(
                    "/search",
                    query_string={"key": "test-key", "q": "Weekly Plan", "type": "document"},
                ),
                200,
                "search document original name",
            )
            assert document_name_search["type"] == "document"
            assert document_name_search["total"] == 1
            assert document_name_search["items"][0]["id"] == document["item"]["id"]
            assert document_name_search["items"][0]["derived_text_available"] is True

            document_text_search = assert_status(
                client.get(
                    "/search",
                    query_string={
                        "key": "test-key",
                        "q": "extracted search",
                        "type": "document",
                    },
                ),
                200,
                "search document extracted text",
            )
            assert document_text_search["type"] == "document"
            assert document_text_search["total"] == 1
            assert document_text_search["items"][0]["id"] == document["item"]["id"]

            audio_name_search = assert_status(
                client.get(
                    "/search",
                    query_string={"key": "test-key", "q": "meeting-note", "type": "audio"},
                ),
                200,
                "search audio original name",
            )
            assert audio_name_search["type"] == "audio"
            assert audio_name_search["total"] == 1
            assert audio_name_search["items"][0]["id"] == audio["item"]["id"]

            archive_search = assert_status(
                client.get(
                    "/search",
                    query_string={
                        "key": "test-key",
                        "q": "Axiom",
                        "storage": "archive",
                    },
                ),
                200,
                "search archive filter",
            )
            assert archive_search["storage"] == "archive"
            assert archive_search["total"] == 0
            assert archive_search["items"] == []

            created_from_search = assert_status(
                client.get(
                    "/search",
                    query_string={
                        "key": "test-key",
                        "q": "smoke",
                        "created_from": image["item"]["created_at"],
                    },
                ),
                200,
                "search created_from filter",
            )
            assert created_from_search["created_from"] == image["item"]["created_at"]
            assert created_from_search["total"] == 1
            assert created_from_search["items"][0]["id"] == image["item"]["id"]

            created_to_search = assert_status(
                client.get(
                    "/search",
                    query_string={
                        "key": "test-key",
                        "q": "Axiom",
                        "created_to": second["item"]["created_at"],
                    },
                ),
                200,
                "search created_to filter",
            )
            assert created_to_search["created_to"] == second["item"]["created_at"]
            assert created_to_search["total"] == 1
            assert created_to_search["items"][0]["id"] == first["item"]["id"]

            source_search = assert_status(
                client.get(
                    "/search",
                    query_string={
                        "key": "test-key",
                        "q": "100%",
                        "source": "smoke_test",
                    },
                ),
                200,
                "search source filter",
            )
            assert source_search["source"] == "smoke_test"
            assert source_search["total"] == 1
            assert source_search["items"][0]["source"] == "smoke_test"

            invalid_created_range = assert_status(
                client.get(
                    "/recent",
                    query_string={
                        "key": "test-key",
                        "created_from": image["item"]["created_at"],
                        "created_to": first["item"]["created_at"],
                    },
                ),
                400,
                "invalid created range",
            )
            assert invalid_created_range["ok"] is False
            assert invalid_created_range["error"]["code"] == "invalid_created_range"

            stats = assert_status(
                client.get("/stats", query_string={"key": "test-key"}),
                200,
                "stats",
            )
            assert stats["total"] == 5
            assert stats["by_type"]["text"] == 2
            assert stats["by_type"]["image"] == 1
            assert stats["by_type"]["document"] == 1
            assert stats["by_type"]["audio"] == 1
            assert stats["by_source"]["ios_shortcut"] == 1
            assert stats["by_source"]["smoke_test"] == 1
            assert stats["by_source"]["image_edit_test"] == 1
            assert stats["by_source"]["document_test"] == 1
            assert stats["by_source"]["audio_test"] == 1
            assert stats["by_storage"].get("archive", 0) == 0
            assert stats["by_storage"]["inbox"] == 5

            overview = assert_status(
                client.get(
                    "/overview",
                    query_string={
                        "key": "test-key",
                        "recent_limit": "2",
                        "preview_chars": "120",
                    },
                ),
                200,
                "overview",
            )
            assert overview["service"] == "axiom-receiver"
            assert overview["stats"]["total"] == 5
            assert overview["recent"]["limit"] == 2
            assert len(overview["recent"]["items"]) == 2
            assert overview["recent"]["items"][0]["id"] == audio["item"]["id"]
            assert overview["recent"]["items"][1]["id"] == document["item"]["id"]

            overview_text = client.get(
                "/overview/text",
                query_string={
                    "key": "test-key",
                    "recent_limit": "2",
                    "preview_chars": "40",
                },
            )
            if overview_text.status_code != 200:
                raise AssertionError(
                    f"overview text: expected HTTP 200, got {overview_text.status_code}, body={overview_text.data!r}"
                )
            if overview_text.mimetype != "text/plain":
                raise AssertionError(
                    f"overview text: expected text/plain, got {overview_text.mimetype}"
            )
            overview_text_body = overview_text.get_data(as_text=True)
            if (
                "Axiom 总览" not in overview_text_body
                or "总条目: 5" not in overview_text_body
                or "文档: 1" not in overview_text_body
                or "音频: 1" not in overview_text_body
            ):
                raise AssertionError(f"overview text body unexpected: {overview_text_body}")

            automation_jobs = assert_status(
                client.get("/automation/jobs", query_string={"key": "test-key"}),
                200,
                "automation jobs",
            )
            job_ids = [job["id"] for job in automation_jobs["jobs"]]
            history_job_ids = [job["id"] for job in automation_jobs["history_jobs"]]
            assert "review_day" in job_ids
            assert "inbox_action_dry_run" in job_ids
            assert "inbox_action_history_day" not in job_ids
            assert "inbox_action_history_day" in history_job_ids

            run_date = current_local_date_iso()

            review_run = assert_status(
                client.post(
                    "/automation/run",
                    headers={"X-Axiom-Key": "test-key"},
                    json={"job": "review_day", "date": run_date},
                ),
                200,
                "run review day",
            )
            assert review_run["message"] == "completed"
            assert review_run["job"]["id"] == "review_day"
            assert review_run["artifact"]["group"] == "review"
            assert review_run["artifact"]["window"] == "daily"
            assert review_run["artifact"]["report_date"] == run_date
            assert review_run["artifact"]["file_url"].startswith("/artifacts/file/")

            action_run = assert_status(
                client.post(
                    "/automation/run",
                    headers={"X-Axiom-Key": "test-key"},
                    json={"job": "inbox_action_dry_run", "date": run_date},
                ),
                200,
                "run inbox action dry-run",
            )
            assert action_run["message"] == "completed"
            assert action_run["job"]["id"] == "inbox_action_dry_run"
            assert action_run["artifact"]["group"] == "inbox-actions"
            assert action_run["artifact"]["mode"] == "dry-run"
            assert action_run["artifact"]["report_date"] == run_date
            assert action_run["run"]["status"] == "success"

            automation_runs = assert_status(
                client.get(
                    "/automation/runs",
                    query_string={"key": "test-key", "page_size": "8"},
                ),
                200,
                "automation runs",
            )
            assert automation_runs["total"] == 2
            assert len(automation_runs["items"]) == 2
            assert automation_runs["items"][0]["job_id"] == "inbox_action_dry_run"
            assert automation_runs["items"][0]["status"] == "success"
            assert automation_runs["items"][0]["artifact"]["group"] == "inbox-actions"
            assert automation_runs["items"][1]["job_id"] == "review_day"
            assert automation_runs["items"][1]["artifact"]["group"] == "review"

            review_run_history = assert_status(
                client.get(
                    "/automation/runs",
                    query_string={"key": "test-key", "job": "review_day"},
                ),
                200,
                "automation runs by job",
            )
            assert review_run_history["total"] == 1
            assert review_run_history["items"][0]["job_id"] == "review_day"

            success_run_history = assert_status(
                client.get(
                    "/automation/runs",
                    query_string={"key": "test-key", "status": "success"},
                ),
                200,
                "automation runs by status",
            )
            assert success_run_history["total"] == 2

            review_daily_path = root / "data" / "reviews" / "daily" / "2026" / "2026-04-29.md"
            review_daily_path.parent.mkdir(parents=True, exist_ok=True)
            review_daily_path.write_text(
                "# daily review\n\n"
                "- generated_at: 2026-04-29T00:00:00+00:00\n"
                "- report_date: 2026-04-29\n\n"
                "## Summary\n\n"
                "Daily review summary line.\n",
                encoding="utf-8",
            )

            inbox_report_path = root / "data" / "reviews" / "inbox" / "2026" / "2026-04-29.md"
            inbox_report_path.parent.mkdir(parents=True, exist_ok=True)
            inbox_report_path.write_text(
                "# inbox report\n\n"
                "- generated_at: 2026-04-29T00:10:00+00:00\n\n"
                "## Summary\n\n"
                "Inbox report summary line.\n",
                encoding="utf-8",
            )

            action_snapshot_path = (
                root
                / "data"
                / "reviews"
                / "inbox-actions"
                / "dry-run"
                / "2026"
                / "2026-04-30"
                / "20260430_120000_000001.md"
            )
            action_snapshot_path.parent.mkdir(parents=True, exist_ok=True)
            action_snapshot_path.write_text(
                "# action snapshot\n\n"
                "- generated_at: 2026-04-30T12:00:00+00:00\n"
                "- mode: dry-run\n\n"
                "## Entries\n\n"
                "Action snapshot preview line.\n",
                encoding="utf-8",
            )

            action_history_path = (
                root
                / "data"
                / "reviews"
                / "inbox-action-history"
                / "daily"
                / "2026"
                / "2026-04-29.md"
            )
            action_history_path.parent.mkdir(parents=True, exist_ok=True)
            action_history_path.write_text(
                "# action history\n\n"
                "- generated_at: 2026-04-29T18:00:00+00:00\n\n"
                "## Summary\n\n"
                "Action history preview line.\n",
                encoding="utf-8",
            )

            base_mtime = 1_700_000_000
            os.utime(review_daily_path, (base_mtime + 10, base_mtime + 10))
            os.utime(inbox_report_path, (base_mtime + 20, base_mtime + 20))
            os.utime(action_history_path, (base_mtime + 30, base_mtime + 30))
            os.utime(action_snapshot_path, (base_mtime + 40, base_mtime + 40))

            artifacts = assert_status(
                client.get("/artifacts", query_string={"key": "test-key", "limit": "100"}),
                200,
                "artifacts",
            )
            assert artifacts["total"] == 6
            assert len(artifacts["items"]) == 6
            assert all(item["file_url"].startswith("/artifacts/file/") for item in artifacts["items"])

            review_artifacts = assert_status(
                client.get(
                    "/artifacts",
                    query_string={
                        "key": "test-key",
                        "group": "review",
                        "window": "daily",
                        "date_from": "2026-04-29",
                        "date_to": "2026-04-29",
                    },
                ),
                200,
                "review artifacts filter",
            )
            assert review_artifacts["group"] == "review"
            assert review_artifacts["window"] == "daily"
            assert review_artifacts["total"] == 1
            assert review_artifacts["items"][0]["relative_path"] == "data/reviews/daily/2026/2026-04-29.md"

            action_artifacts = assert_status(
                client.get(
                    "/artifacts",
                    query_string={
                        "key": "test-key",
                        "group": "inbox-actions",
                        "mode": "dry-run",
                        "date_from": "2026-04-30",
                        "date_to": "2026-04-30",
                    },
                ),
                200,
                "action artifact filter",
            )
            assert action_artifacts["group"] == "inbox-actions"
            assert action_artifacts["mode"] == "dry-run"
            assert action_artifacts["total"] == 1
            assert action_artifacts["items"][0]["report_date"] == "2026-04-30"

            artifact_summary = assert_status(
                client.get(
                    "/artifacts/summary",
                    query_string={"key": "test-key", "preview_chars": "120"},
                ),
                200,
                "artifact summary",
            )
            assert artifact_summary["total"] == 6
            assert artifact_summary["counts"]["review"]["daily"] == 2
            assert artifact_summary["counts"]["inbox"] == 1
            assert artifact_summary["counts"]["inbox-actions"]["dry-run"] == 2
            assert artifact_summary["counts"]["inbox-action-history"]["daily"] == 1
            assert artifact_summary["latest"]["review"]["daily"]["report_date"] == run_date
            assert artifact_summary["latest"]["inbox-actions"]["dry-run"]["report_date"] == run_date

            overview_with_artifacts = assert_status(
                client.get(
                    "/overview",
                    query_string={
                    "key": "test-key",
                    "recent_limit": "2",
                    "preview_chars": "120",
                },
                ),
                200,
                "overview with artifacts",
            )
            assert overview_with_artifacts["artifacts"]["total"] == 6
            assert overview_with_artifacts["artifacts"]["counts"]["review"]["daily"] == 2
            assert overview_with_artifacts["artifacts"]["latest"]["review"]["daily"]["report_date"] == run_date
            assert overview_with_artifacts["artifacts"]["latest_overall"]["group"] == "inbox-actions"
            assert overview_with_artifacts["artifacts"]["latest_overall"]["report_date"] == run_date

            overview_text_with_artifacts = client.get(
                "/overview/text",
                query_string={
                    "key": "test-key",
                    "recent_limit": "2",
                    "preview_chars": "40",
                },
            )
            if overview_text_with_artifacts.status_code != 200:
                raise AssertionError(
                    "overview text with artifacts: "
                    f"expected HTTP 200, got {overview_text_with_artifacts.status_code}, "
                    f"body={overview_text_with_artifacts.data!r}"
                )
            overview_text_with_artifacts_body = overview_text_with_artifacts.get_data(
                as_text=True
            )
            if "Inbox 动作预演" not in overview_text_with_artifacts_body:
                raise AssertionError(
                    "overview text with artifacts missing dry-run line: "
                    f"{overview_text_with_artifacts_body}"
                )
            if run_date not in overview_text_with_artifacts_body:
                raise AssertionError(
                    "overview text with artifacts missing latest run date: "
                    f"{overview_text_with_artifacts_body}"
                )

            review_artifact_summary = assert_status(
                client.get(
                    "/artifacts/summary",
                    query_string={
                        "key": "test-key",
                        "group": "review",
                        "window": "daily",
                        "date_from": "2026-04-29",
                        "date_to": "2026-04-29",
                    },
                ),
                200,
                "review artifact summary",
            )
            assert review_artifact_summary["total"] == 1
            assert review_artifact_summary["latest"]["review"]["daily"]["relative_path"] == (
                "data/reviews/daily/2026/2026-04-29.md"
            )
            assert review_artifact_summary["latest"]["inbox"] is None

            invalid_artifact_filter = assert_status(
                client.get(
                    "/artifacts",
                    query_string={"key": "test-key", "group": "unknown"},
                ),
                400,
                "invalid artifact filter",
            )
            assert invalid_artifact_filter["ok"] is False
            assert invalid_artifact_filter["error"]["code"] == "invalid_artifact_filter"

            invalid_overview = assert_status(
                client.get(
                    "/overview",
                    query_string={"key": "test-key", "recent_limit": "0"},
                ),
                400,
                "invalid overview",
            )
            assert invalid_overview["error"]["code"] == "invalid_overview_param"

            artifact_file = client.get(
                "/artifacts/file/data/reviews/daily/2026/2026-04-29.md",
                query_string={"key": "test-key"},
            )
            assert_file_body(artifact_file, b"# daily review", "artifact file")

            logged_history_result = subprocess.run(
                [
                    sys.executable,
                    "-X",
                    "utf8",
                    str(REPO_ROOT / "scripts" / "run_logged_automation.py"),
                    "--job-id",
                    "inbox_action_history_day",
                    "--root",
                    str(root),
                    "--date",
                    run_date,
                    "--utc-offset",
                    "+08:00",
                ],
                check=False,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
            )
            if logged_history_result.returncode != 0:
                raise AssertionError(
                    "run_logged_automation failed: "
                    f"code={logged_history_result.returncode}, "
                    f"stdout={logged_history_result.stdout!r}, stderr={logged_history_result.stderr!r}"
                )

            history_run = assert_status(
                client.get(
                    "/automation/runs",
                    query_string={"key": "test-key", "job": "inbox_action_history_day"},
                ),
                200,
                "automation runs scheduled history job",
            )
            assert history_run["total"] == 1
            assert history_run["items"][0]["job_id"] == "inbox_action_history_day"
            assert history_run["items"][0]["artifact"]["group"] == "inbox-action-history"
            assert history_run["items"][0]["artifact"]["window"] == "daily"
            assert history_run["items"][0]["artifact"]["report_date"] == run_date

            inbox_text_files = list((root / "data" / "inbox").glob("*.txt"))
            if len(inbox_text_files) != 2:
                raise AssertionError(
                    f"expected 2 inbox text files, got {len(inbox_text_files)}"
                )

            all_inbox_files = [
                path for path in (root / "data" / "inbox").rglob("*") if path.is_file()
            ]
            if len(all_inbox_files) != 5:
                raise AssertionError(f"expected 5 inbox files, got {len(all_inbox_files)}")

            archive_files = [
                path for path in (root / "data" / "archive").rglob("*") if path.is_file()
            ]
            if len(archive_files) != 0:
                raise AssertionError(f"expected 0 archive files, got {len(archive_files)}")

            consistency = build_report(root)
            if not consistency["ok"]:
                raise AssertionError(f"consistency check failed: {consistency}")
            if consistency["archive_file_count"] != 0:
                raise AssertionError(f"expected 0 archive files in report: {consistency}")

            log_path = root / "logs" / "receiver.log"
            if not log_path.exists():
                raise AssertionError(f"expected log file to exist: {log_path}")

            print("receiver smoke test passed")
            print(f"temporary root: {root}")
        finally:
            logging.shutdown()


if __name__ == "__main__":
    main()
