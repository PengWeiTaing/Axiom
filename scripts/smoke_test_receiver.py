from __future__ import annotations

import io
import logging
import os
import sqlite3
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


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="axiom_receiver_") as temp_dir:
        root = Path(temp_dir)
        os.environ["AXIOM_ROOT"] = str(root)
        os.environ["AXIOM_SECRET_KEY"] = "test-key"
        os.environ["AXIOM_LOG_PATH"] = str(root / "logs" / "receiver.log")
        os.environ["AXIOM_AUDIO_TRANSCRIBE_MOCK_TEMPLATE"] = "mock transcript for {original_name}"
        os.environ["AXIOM_IMAGE_DESCRIBE_MOCK_TEMPLATE"] = "mock image description for {original_name}"

        try:
            from core.receiver import app  # noqa: WPS433
            from scripts.backfill_audio_transcript import backfill_audio_transcript  # noqa: WPS433
            from scripts.backfill_document_text import backfill_document_text  # noqa: WPS433
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
            pdf_bytes = build_pdf_bytes("Axiom pdf summary line")
            document = assert_status(
                client.post(
                    "/upload",
                    data={
                        "key": "test-key",
                        "content": "important project spec",
                        "source": "document_test",
                        "file": (io.BytesIO(pdf_bytes), "Project Spec.pdf"),
                    },
                    content_type="multipart/form-data",
                ),
                200,
                "upload document",
            )
            assert document["item"]["type"] == "document"
            assert document["item"]["content"] == "important project spec"
            assert document["item"]["original_name"] == "Project Spec.pdf"
            assert document["item"]["mime_type"] == "application/pdf"
            assert document["item"]["extension"] == "pdf"
            assert document["item"]["download_name"] == "Project Spec.pdf"
            assert document["item"]["size_bytes"] == len(pdf_bytes)
            assert document["item"]["derived_text_available"] is True
            assert document["item"]["text_source"] == "derived_text"
            assert document["item"]["processing_state"] == "ready"
            assert document["item"]["processing_note"] == "正文已就绪"
            assert "Axiom pdf summary line" in (
                document["item"]["derived_text_preview"] or ""
            )

            document_file = client.get(
                f"/file/{document['item']['id']}",
                headers={"X-Axiom-Key": "test-key"},
            )
            if "Project Spec.pdf" not in (document_file.headers.get("Content-Disposition") or ""):
                raise AssertionError(
                    f"document file headers unexpected: {document_file.headers!r}"
                )
            assert_file_body(document_file, pdf_bytes, "document file")

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
                "Axiom pdf summary line"
                in (document_detail["item"].get("derived_text") or "")
            )

            docx_bytes = build_docx_bytes(
                "Axiom project plan",
                "Document body line for extracted search",
            )
            docx_document = assert_status(
                client.post(
                    "/upload",
                    data={
                        "key": "test-key",
                        "source": "docx_test",
                        "file": (io.BytesIO(docx_bytes), "Weekly Plan.docx"),
                    },
                    content_type="multipart/form-data",
                ),
                200,
                "upload docx document",
            )
            assert docx_document["item"]["type"] == "document"
            assert docx_document["item"]["extension"] == "docx"
            assert docx_document["item"]["derived_text_available"] is True
            assert docx_document["item"]["text_source"] == "derived_text"
            assert docx_document["item"]["processing_state"] == "ready"
            assert "Document body line for extracted search" in (
                docx_document["item"]["derived_text_preview"] or ""
            )

            db_path = root / "db" / "axiom.db"
            conn = sqlite3.connect(str(db_path))
            try:
                conn.execute(
                    "UPDATE items SET derived_text = NULL WHERE id IN (?, ?)",
                    (document["item"]["id"], docx_document["item"]["id"]),
                )
                conn.commit()
            finally:
                conn.close()

            backfill_summary = backfill_document_text(
                root=root,
                item_ids=[document["item"]["id"], docx_document["item"]["id"]],
            )
            assert backfill_summary["updated"] == 2
            assert sorted(backfill_summary["updated_ids"]) == sorted(
                [document["item"]["id"], docx_document["item"]["id"]]
            )

            backfilled_document_detail = assert_status(
                client.get(
                    f"/item/{document['item']['id']}",
                    query_string={"key": "test-key"},
                ),
                200,
                "backfilled pdf detail",
            )
            assert backfilled_document_detail["item"]["derived_text_available"] is True
            assert (
                "Axiom pdf summary line"
                in (backfilled_document_detail["item"].get("derived_text") or "")
            )

            backfilled_docx_detail = assert_status(
                client.get(
                    f"/item/{docx_document['item']['id']}",
                    query_string={"key": "test-key"},
                ),
                200,
                "backfilled docx detail",
            )
            assert backfilled_docx_detail["item"]["derived_text_available"] is True
            assert (
                "Document body line for extracted search"
                in (backfilled_docx_detail["item"].get("derived_text") or "")
            )

            time.sleep(1.1)

            audio_transcript_srt = (
                "1\n"
                "00:00:00,000 --> 00:00:01,500\n"
                "Axiom audio transcript line\n\n"
                "2\n"
                "00:00:01,700 --> 00:00:03,000\n"
                "<v Speaker>Second transcript line</v>\n"
            ).encode("utf-8")
            audio = assert_status(
                client.post(
                    "/upload",
                    data={
                        "key": "test-key",
                        "content": "team sync voice note",
                        "source": "audio_test",
                        "file": (io.BytesIO(b"fake m4a bytes"), "meeting-note.m4a"),
                        "transcript_file": (io.BytesIO(audio_transcript_srt), "meeting-note.srt"),
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
            assert audio["item"]["transcript_text_available"] is True
            assert audio["item"]["text_source"] == "transcript_text"
            assert audio["item"]["processing_state"] == "ready"
            assert "Axiom audio transcript line" in (
                audio["item"]["transcript_text_preview"] or ""
            )
            assert "00:00" not in (audio["item"]["transcript_text_preview"] or "")

            audio_file = client.get(
                f"/file/{audio['item']['id']}",
                headers={"X-Axiom-Key": "test-key"},
            )
            if "meeting-note.m4a" not in (audio_file.headers.get("Content-Disposition") or ""):
                raise AssertionError(
                    f"audio file headers unexpected: {audio_file.headers!r}"
                )
            assert_file_body(audio_file, b"fake m4a bytes", "audio file")

            audio_detail = assert_status(
                client.get(
                    f"/item/{audio['item']['id']}",
                    query_string={"key": "test-key"},
                ),
                200,
                "audio detail",
            )
            assert audio_detail["item"]["transcript_text_available"] is True
            assert "Axiom audio transcript line" in (
                audio_detail["item"].get("transcript_text") or ""
            )
            assert "Second transcript line" in (
                audio_detail["item"].get("transcript_text") or ""
            )

            transcript_sidecar_dir = root / "data" / "transcripts"
            transcript_sidecar_dir.mkdir(parents=True, exist_ok=True)
            audio_sidecar_path = transcript_sidecar_dir / "meeting-note.srt"
            audio_sidecar_path.write_text(
                "1\n"
                "00:00:00,000 --> 00:00:01,500\n"
                "Recovered transcript from sidecar\n",
                encoding="utf-8",
            )

            conn = sqlite3.connect(str(db_path))
            try:
                conn.execute(
                    "UPDATE items SET transcript_text = NULL WHERE id = ?",
                    (audio["item"]["id"],),
                )
                conn.commit()
            finally:
                conn.close()

            audio_backfill_summary = backfill_audio_transcript(
                root=root,
                item_ids=[audio["item"]["id"]],
                transcript_dir=transcript_sidecar_dir,
            )
            assert audio_backfill_summary["updated"] == 1
            assert audio_backfill_summary["updated_ids"] == [audio["item"]["id"]]

            backfilled_audio_detail = assert_status(
                client.get(
                    f"/item/{audio['item']['id']}",
                    query_string={"key": "test-key"},
                ),
                200,
                "backfilled audio detail",
            )
            assert backfilled_audio_detail["item"]["transcript_text_available"] is True
            assert "Recovered transcript from sidecar" in (
                backfilled_audio_detail["item"].get("transcript_text") or ""
            )

            updated_audio = assert_status(
                client.post(
                    f"/item/{audio['item']['id']}/update",
                    headers={"X-Axiom-Key": "test-key"},
                    json={"transcript_text": "updated audio transcript"},
                ),
                200,
                "update audio transcript",
            )
            assert updated_audio["updated_fields"] == ["transcript_text"]
            assert updated_audio["item"]["transcript_text_available"] is True
            assert "updated audio transcript" in (
                updated_audio["item"].get("transcript_text") or ""
            )

            recent = assert_status(
                client.get("/recent", query_string={"key": "test-key", "limit": "100"}),
                200,
                "recent",
            )
            assert recent["page_size"] == 50
            assert recent["total"] == 6
            assert len(recent["items"]) == 6
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
            assert recent_documents["total"] == 2
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
            assert recent_audio["items"][0]["transcript_text_available"] is True

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
            assert recent_inbox["total"] == 6

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
            assert search["total"] == 3
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
            assert document_name_search["items"][0]["id"] == docx_document["item"]["id"]
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
            assert document_text_search["items"][0]["id"] == docx_document["item"]["id"]

            pdf_text_search = assert_status(
                client.get(
                    "/search",
                    query_string={
                        "key": "test-key",
                        "q": "pdf summary",
                        "type": "document",
                        "source": "document_test",
                    },
                ),
                200,
                "search pdf extracted text",
            )
            assert pdf_text_search["type"] == "document"
            assert pdf_text_search["total"] == 1
            assert pdf_text_search["items"][0]["id"] == document["item"]["id"]

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

            audio_transcript_search = assert_status(
                client.get(
                    "/search",
                    query_string={
                        "key": "test-key",
                        "q": "updated audio transcript",
                        "type": "audio",
                    },
                ),
                200,
                "search audio transcript",
            )
            assert audio_transcript_search["type"] == "audio"
            assert audio_transcript_search["total"] == 1
            assert audio_transcript_search["items"][0]["id"] == audio["item"]["id"]

            export_document_result = subprocess.run(
                [
                    sys.executable,
                    "-X",
                    "utf8",
                    str(REPO_ROOT / "scripts" / "export_items_markdown.py"),
                    "--root",
                    str(root),
                    "--type",
                    "document",
                ],
                check=False,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
            )
            if export_document_result.returncode != 0:
                raise AssertionError(
                    "export document markdown failed: "
                    + (export_document_result.stderr or export_document_result.stdout)
                )
            assert "derived_text:" in export_document_result.stdout
            assert "Axiom pdf summary line" in export_document_result.stdout

            export_audio_result = subprocess.run(
                [
                    sys.executable,
                    "-X",
                    "utf8",
                    str(REPO_ROOT / "scripts" / "export_items_markdown.py"),
                    "--root",
                    str(root),
                    "--type",
                    "audio",
                ],
                check=False,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
            )
            if export_audio_result.returncode != 0:
                raise AssertionError(
                    "export audio markdown failed: "
                    + (export_audio_result.stderr or export_audio_result.stdout)
                )
            assert "transcript_text:" in export_audio_result.stdout
            assert "updated audio transcript" in export_audio_result.stdout

            review_result = subprocess.run(
                [
                    sys.executable,
                    "-X",
                    "utf8",
                    str(REPO_ROOT / "scripts" / "build_review_markdown.py"),
                    "--root",
                    str(root),
                    "--date",
                    current_local_date_iso(),
                ],
                check=False,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
            )
            if review_result.returncode != 0:
                raise AssertionError(
                    "build review markdown failed: " + (review_result.stderr or review_result.stdout)
                )
            assert "derived_text: Axiom pdf summary line" in review_result.stdout
            assert "transcript_text: updated audio transcript" in review_result.stdout

            conn = sqlite3.connect(str(db_path))
            try:
                conn.execute(
                    "UPDATE items SET derived_text = NULL WHERE id = ?",
                    (docx_document["item"]["id"],),
                )
                conn.commit()
            finally:
                conn.close()

            pending_docx_detail = assert_status(
                client.get(
                    f"/item/{docx_document['item']['id']}",
                    query_string={"key": "test-key"},
                ),
                200,
                "pending docx detail",
            )
            assert pending_docx_detail["item"]["derived_text_available"] is False
            assert pending_docx_detail["item"]["processing_state"] == "pending"
            assert pending_docx_detail["item"]["processing_note"] == "待补正文"

            pending_recent_documents = assert_status(
                client.get(
                    "/recent",
                    query_string={
                        "key": "test-key",
                        "type": "document",
                        "processing_state": "pending",
                    },
                ),
                200,
                "recent pending document filter",
            )
            assert pending_recent_documents["processing_state"] == "pending"
            assert pending_recent_documents["total"] == 1
            assert pending_recent_documents["items"][0]["id"] == docx_document["item"]["id"]

            pending_document_search = assert_status(
                client.get(
                    "/search",
                    query_string={
                        "key": "test-key",
                        "q": "Weekly Plan",
                        "type": "document",
                        "processing_state": "pending",
                    },
                ),
                200,
                "search pending document",
            )
            assert pending_document_search["processing_state"] == "pending"
            assert pending_document_search["total"] == 1
            assert pending_document_search["items"][0]["id"] == docx_document["item"]["id"]

            updated_document = assert_status(
                client.post(
                    f"/item/{docx_document['item']['id']}/update",
                    headers={"X-Axiom-Key": "test-key"},
                    json={"derived_text": "Manual document recovery line"},
                ),
                200,
                "update document derived text",
            )
            assert updated_document["updated_fields"] == ["derived_text"]
            assert updated_document["item"]["derived_text_available"] is True
            assert updated_document["item"]["text_source"] == "derived_text"
            assert updated_document["item"]["processing_state"] == "ready"
            assert "Manual document recovery line" in (
                updated_document["item"].get("derived_text") or ""
            )

            manual_document_search = assert_status(
                client.get(
                    "/search",
                    query_string={
                        "key": "test-key",
                        "q": "Manual document recovery",
                        "type": "document",
                        "processing_state": "ready",
                    },
                ),
                200,
                "search manually updated document text",
            )
            assert manual_document_search["processing_state"] == "ready"
            assert manual_document_search["total"] == 1
            assert manual_document_search["items"][0]["id"] == docx_document["item"]["id"]

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
            assert stats["total"] == 6
            assert stats["by_type"]["text"] == 2
            assert stats["by_type"]["image"] == 1
            assert stats["by_type"]["document"] == 2
            assert stats["by_type"]["audio"] == 1
            assert stats["by_source"]["ios_shortcut"] == 1
            assert stats["by_source"]["smoke_test"] == 1
            assert stats["by_source"]["image_edit_test"] == 1
            assert stats["by_source"]["document_test"] == 1
            assert stats["by_source"]["docx_test"] == 1
            assert stats["by_source"]["audio_test"] == 1
            assert stats["by_storage"].get("archive", 0) == 0
            assert stats["by_storage"]["inbox"] == 6
            assert stats["by_text_source"]["content"] == 3
            assert stats["by_text_source"]["derived_text"] == 2
            assert stats["by_text_source"]["transcript_text"] == 1
            assert stats["by_processing_state"]["ready"] == 6
            assert stats["by_processing_state"].get("pending", 0) == 0

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
            assert overview["stats"]["total"] == 6
            assert overview["recent"]["limit"] == 2
            assert len(overview["recent"]["items"]) == 2
            assert overview["recent"]["items"][0]["id"] == audio["item"]["id"]
            assert overview["recent"]["items"][1]["id"] == docx_document["item"]["id"]

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
                or "总条目: 6" not in overview_text_body
                or "文档: 2" not in overview_text_body
                or "音频: 1" not in overview_text_body
                or "已就绪: 6" not in overview_text_body
                or "待处理: 0" not in overview_text_body
            ):
                raise AssertionError(f"overview text body unexpected: {overview_text_body}")

            automation_jobs = assert_status(
                client.get("/automation/jobs", query_string={"key": "test-key"}),
                200,
                "automation jobs before runtime restore",
            )
            audio_job_preflight = next(job for job in automation_jobs["jobs"] if job["id"] == "audio_transcribe_day")
            image_job_preflight = next(job for job in automation_jobs["jobs"] if job["id"] == "image_describe_day")
            assert audio_job_preflight["ready"] is True
            assert audio_job_preflight["runtime_mode"] == "mock"
            assert image_job_preflight["ready"] is True
            assert image_job_preflight["runtime_mode"] == "mock"

            previous_mock_template = os.environ.pop("AXIOM_AUDIO_TRANSCRIBE_MOCK_TEMPLATE", None)
            previous_image_mock_template = os.environ.pop("AXIOM_IMAGE_DESCRIBE_MOCK_TEMPLATE", None)
            previous_axiom_openai_key = os.environ.pop("AXIOM_OPENAI_API_KEY", None)
            previous_openai_key = os.environ.pop("OPENAI_API_KEY", None)
            try:
                unavailable_jobs = assert_status(
                    client.get("/automation/jobs", query_string={"key": "test-key"}),
                    200,
                    "automation jobs unavailable",
                )
                unavailable_audio_job = next(
                    job for job in unavailable_jobs["jobs"] if job["id"] == "audio_transcribe_day"
                )
                unavailable_image_job = next(
                    job for job in unavailable_jobs["jobs"] if job["id"] == "image_describe_day"
                )
                assert unavailable_audio_job["ready"] is False
                assert unavailable_audio_job["runtime_mode"] == "missing_key"
                assert "OPENAI_API_KEY" in unavailable_audio_job["availability_note"]
                assert unavailable_image_job["ready"] is False
                assert unavailable_image_job["runtime_mode"] == "missing_key"
                assert "OPENAI_API_KEY" in unavailable_image_job["availability_note"]

                unavailable_run_response = client.post(
                    "/automation/run",
                    headers={"X-Axiom-Key": "test-key"},
                    json={"job": "audio_transcribe_day", "date": current_local_date_iso()},
                )
                assert unavailable_run_response.status_code == 400
                unavailable_run = unavailable_run_response.get_json()
                assert unavailable_run["error"]["code"] == "automation_job_unavailable"
                assert "OPENAI_API_KEY" in unavailable_run["error"]["message"]

                unavailable_image_run_response = client.post(
                    "/automation/run",
                    headers={"X-Axiom-Key": "test-key"},
                    json={"job": "image_describe_day", "date": current_local_date_iso()},
                )
                assert unavailable_image_run_response.status_code == 400
                unavailable_image_run = unavailable_image_run_response.get_json()
                assert unavailable_image_run["error"]["code"] == "automation_job_unavailable"
                assert "OPENAI_API_KEY" in unavailable_image_run["error"]["message"]
            finally:
                if previous_mock_template is not None:
                    os.environ["AXIOM_AUDIO_TRANSCRIBE_MOCK_TEMPLATE"] = previous_mock_template
                if previous_image_mock_template is not None:
                    os.environ["AXIOM_IMAGE_DESCRIBE_MOCK_TEMPLATE"] = previous_image_mock_template
                if previous_axiom_openai_key is not None:
                    os.environ["AXIOM_OPENAI_API_KEY"] = previous_axiom_openai_key
                if previous_openai_key is not None:
                    os.environ["OPENAI_API_KEY"] = previous_openai_key

            automation_jobs = assert_status(
                client.get("/automation/jobs", query_string={"key": "test-key"}),
                200,
                "automation jobs",
            )
            job_ids = [job["id"] for job in automation_jobs["jobs"]]
            history_job_ids = [job["id"] for job in automation_jobs["history_jobs"]]
            audio_job = next(job for job in automation_jobs["jobs"] if job["id"] == "audio_transcribe_day")
            image_job = next(job for job in automation_jobs["jobs"] if job["id"] == "image_describe_day")
            assert "review_day" in job_ids
            assert "inbox_action_dry_run" in job_ids
            assert "audio_transcribe_day" in job_ids
            assert "image_describe_day" in job_ids
            assert "inbox_action_history_day" not in job_ids
            assert "inbox_action_history_day" in history_job_ids
            assert audio_job["ready"] is True
            assert audio_job["runtime_mode"] == "mock"
            assert image_job["ready"] is True
            assert image_job["runtime_mode"] == "mock"
            assert "mock" in image_job["availability_note"]
            audio_job["availability_note"] = f'{audio_job["availability_note"]} mock 친겼'
            assert "mock 模板" in audio_job["availability_note"]

            run_date = current_local_date_iso()

            automation_audio = assert_status(
                client.post(
                    "/upload",
                    data={
                        "key": "test-key",
                        "content": "automation voice note",
                        "source": "audio_automation_test",
                        "file": (io.BytesIO(b"automation m4a bytes"), "automation-note.m4a"),
                    },
                    content_type="multipart/form-data",
                ),
                200,
                "upload automation audio",
            )
            assert automation_audio["item"]["type"] == "audio"
            assert automation_audio["item"]["transcript_text_available"] is False

            automation_image = assert_status(
                client.post(
                    "/upload",
                    data={
                        "key": "test-key",
                        "source": "image_automation_test",
                        "file": (io.BytesIO(b"automation png bytes"), "automation-shot.png"),
                    },
                    content_type="multipart/form-data",
                ),
                200,
                "upload automation image",
            )
            assert automation_image["item"]["type"] == "image"
            assert automation_image["item"]["processing_state"] == "pending"
            assert automation_image["item"]["content"] == "automation-shot.png"

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

            transcribe_run = assert_status(
                client.post(
                    "/automation/run",
                    headers={"X-Axiom-Key": "test-key"},
                    json={"job": "audio_transcribe_day", "date": run_date},
                ),
                200,
                "run audio transcribe day",
            )
            assert transcribe_run["message"] == "completed"
            assert transcribe_run["job"]["id"] == "audio_transcribe_day"
            assert transcribe_run["artifact"]["group"] == "audio-transcripts"
            assert transcribe_run["artifact"]["report_date"] == run_date
            assert transcribe_run["run"]["status"] == "success"

            image_describe_run = assert_status(
                client.post(
                    "/automation/run",
                    headers={"X-Axiom-Key": "test-key"},
                    json={"job": "image_describe_day", "date": run_date},
                ),
                200,
                "run image describe day",
            )
            assert image_describe_run["message"] == "completed"
            assert image_describe_run["job"]["id"] == "image_describe_day"
            assert image_describe_run["artifact"]["group"] == "image-descriptions"
            assert image_describe_run["artifact"]["report_date"] == run_date
            assert image_describe_run["run"]["status"] == "success"

            transcribed_audio_detail = assert_status(
                client.get(
                    f"/item/{automation_audio['item']['id']}",
                    query_string={"key": "test-key"},
                ),
                200,
                "transcribed automation audio detail",
            )
            assert "mock transcript for automation-note.m4a" in (
                transcribed_audio_detail["item"].get("transcript_text") or ""
            )

            described_image_detail = assert_status(
                client.get(
                    f"/item/{automation_image['item']['id']}",
                    query_string={"key": "test-key"},
                ),
                200,
                "described automation image detail",
            )
            assert described_image_detail["item"]["processing_state"] == "ready"
            assert "mock image description for automation-shot.png" in (
                described_image_detail["item"].get("content") or ""
            )

            automation_runs = assert_status(
                client.get(
                    "/automation/runs",
                    query_string={"key": "test-key", "page_size": "8"},
                ),
                200,
                "automation runs",
            )
            assert automation_runs["total"] == 4
            assert len(automation_runs["items"]) == 4
            assert automation_runs["items"][0]["job_id"] == "image_describe_day"
            assert automation_runs["items"][0]["status"] == "success"
            assert automation_runs["items"][0]["artifact"]["group"] == "image-descriptions"
            assert automation_runs["items"][1]["job_id"] == "audio_transcribe_day"
            assert automation_runs["items"][1]["artifact"]["group"] == "audio-transcripts"
            assert automation_runs["items"][2]["job_id"] == "inbox_action_dry_run"
            assert automation_runs["items"][2]["artifact"]["group"] == "inbox-actions"
            assert automation_runs["items"][3]["job_id"] == "review_day"
            assert automation_runs["items"][3]["artifact"]["group"] == "review"

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
            assert success_run_history["total"] == 4

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
            assert artifacts["total"] == 8
            assert len(artifacts["items"]) == 8
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
            assert artifact_summary["total"] == 8
            assert artifact_summary["counts"]["review"]["daily"] == 2
            assert artifact_summary["counts"]["inbox"] == 1
            assert artifact_summary["counts"]["inbox-actions"]["dry-run"] == 2
            assert artifact_summary["counts"]["inbox-action-history"]["daily"] == 1
            assert artifact_summary["counts"]["audio-transcripts"] == 1
            assert artifact_summary["counts"]["image-descriptions"] == 1
            assert artifact_summary["latest"]["review"]["daily"]["report_date"] == run_date
            assert artifact_summary["latest"]["inbox-actions"]["dry-run"]["report_date"] == run_date
            assert artifact_summary["latest"]["audio-transcripts"]["report_date"] == run_date
            assert artifact_summary["latest"]["image-descriptions"]["report_date"] == run_date

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
            assert overview_with_artifacts["artifacts"]["total"] == 8
            assert overview_with_artifacts["artifacts"]["counts"]["review"]["daily"] == 2
            assert overview_with_artifacts["artifacts"]["counts"]["audio-transcripts"] == 1
            assert overview_with_artifacts["artifacts"]["counts"]["image-descriptions"] == 1
            assert overview_with_artifacts["artifacts"]["latest"]["review"]["daily"]["report_date"] == run_date
            assert overview_with_artifacts["artifacts"]["latest"]["audio-transcripts"]["report_date"] == run_date
            assert overview_with_artifacts["artifacts"]["latest"]["image-descriptions"]["report_date"] == run_date
            assert overview_with_artifacts["artifacts"]["latest_overall"]["group"] in {
                "image-descriptions",
                "audio-transcripts",
                "inbox-actions",
            }
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
            if "音频转写报告" not in overview_text_with_artifacts_body:
                raise AssertionError(
                    "overview text with artifacts missing audio transcript line: "
                    f"{overview_text_with_artifacts_body}"
                )
            if "图片描述报告" not in overview_text_with_artifacts_body:
                raise AssertionError(
                    "overview text with artifacts missing image description line: "
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

            skip_env = os.environ.copy()
            skip_env.pop("AXIOM_AUDIO_TRANSCRIBE_MOCK_TEMPLATE", None)
            skip_env.pop("AXIOM_IMAGE_DESCRIBE_MOCK_TEMPLATE", None)
            skip_env.pop("AXIOM_OPENAI_API_KEY", None)
            skip_env.pop("OPENAI_API_KEY", None)
            skipped_image_result = subprocess.run(
                [
                    sys.executable,
                    "-X",
                    "utf8",
                    str(REPO_ROOT / "scripts" / "run_logged_automation.py"),
                    "--job-id",
                    "image_describe_day",
                    "--root",
                    str(root),
                    "--date",
                    run_date,
                    "--utc-offset",
                    "+08:00",
                    "--skip-when-unavailable",
                ],
                check=False,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                env=skip_env,
            )
            if skipped_image_result.returncode != 0:
                raise AssertionError(
                    "run_logged_automation skip-when-unavailable failed: "
                    f"code={skipped_image_result.returncode}, "
                    f"stdout={skipped_image_result.stdout!r}, stderr={skipped_image_result.stderr!r}"
                )
            if '"message": "skipped"' not in skipped_image_result.stdout:
                raise AssertionError(
                    "run_logged_automation skip result missing skipped message: "
                    f"{skipped_image_result.stdout!r}"
                )

            skipped_image_run = assert_status(
                client.get(
                    "/automation/runs",
                    query_string={
                        "key": "test-key",
                        "job": "image_describe_day",
                        "status": "skipped",
                    },
                ),
                200,
                "automation runs skipped image describe",
            )
            assert skipped_image_run["total"] == 1
            assert skipped_image_run["items"][0]["job_id"] == "image_describe_day"
            assert skipped_image_run["items"][0]["status"] == "skipped"
            assert skipped_image_run["items"][0]["artifact"] is None
            assert "OPENAI_API_KEY" in skipped_image_run["items"][0]["message"]

            inbox_text_files = list((root / "data" / "inbox").glob("*.txt"))
            if len(inbox_text_files) != 2:
                raise AssertionError(
                    f"expected 2 inbox text files, got {len(inbox_text_files)}"
                )

            all_inbox_files = [
                path for path in (root / "data" / "inbox").rglob("*") if path.is_file()
            ]
            if len(all_inbox_files) != 8:
                raise AssertionError(f"expected 8 inbox files, got {len(all_inbox_files)}")

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
