from __future__ import annotations

import io
import logging
import os
import sys
import tempfile
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


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="axiom_receiver_") as temp_dir:
        root = Path(temp_dir)
        os.environ["AXIOM_ROOT"] = str(root)
        os.environ["AXIOM_SECRET_KEY"] = "test-key"
        os.environ["AXIOM_LOG_PATH"] = str(root / "logs" / "receiver.log")

        from core.receiver import app  # noqa: WPS433
        from scripts.check_consistency import build_report  # noqa: WPS433

        client = app.test_client()
        first_text = "Axiom first smoke text"

        health = assert_status(client.get("/health"), 200, "health")
        assert health["ok"] is True

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

        text_file = client.get(
            f"/file/{first['item']['id']}",
            query_string={"key": "test-key"},
        )
        assert_file_body(text_file, first_text.encode("utf-8"), "text file")

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
            first_text.encode("utf-8"),
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
        assert restored_item_detail["item"]["content"] == first_text
        assert restored_item_detail["item"]["storage"] == "inbox"

        restored_text_file = client.get(
            f"/file/{first['item']['id']}",
            query_string={"key": "test-key"},
        )
        assert_file_body(
            restored_text_file,
            first_text.encode("utf-8"),
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

        recent = assert_status(
            client.get("/recent", query_string={"key": "test-key", "limit": "100"}),
            200,
            "recent",
        )
        assert recent["page_size"] == 50
        assert recent["total"] == 3
        assert len(recent["items"]) == 3
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
        assert recent_inbox["total"] == 3

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
        assert search["total"] == 1
        assert search["items"][0]["score"] > 0
        assert search["items"][0]["file_url"].startswith("/file/")

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

        stats = assert_status(
            client.get("/stats", query_string={"key": "test-key"}),
            200,
            "stats",
        )
        assert stats["total"] == 3
        assert stats["by_type"]["text"] == 2
        assert stats["by_type"]["image"] == 1
        assert stats["by_source"]["ios_shortcut"] == 2
        assert stats["by_source"]["smoke_test"] == 1
        assert stats["by_storage"].get("archive", 0) == 0
        assert stats["by_storage"]["inbox"] == 3

        inbox_text_files = list((root / "data" / "inbox").glob("*.txt"))
        if len(inbox_text_files) != 2:
            raise AssertionError(
                f"expected 2 inbox text files, got {len(inbox_text_files)}"
            )

        all_inbox_files = [
            path for path in (root / "data" / "inbox").rglob("*") if path.is_file()
        ]
        if len(all_inbox_files) != 3:
            raise AssertionError(f"expected 3 inbox files, got {len(all_inbox_files)}")

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
        logging.shutdown()


if __name__ == "__main__":
    main()
