from __future__ import annotations

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


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="axiom_receiver_") as temp_dir:
        root = Path(temp_dir)
        os.environ["AXIOM_ROOT"] = str(root)
        os.environ["AXIOM_SECRET_KEY"] = "test-key"
        os.environ["AXIOM_LOG_PATH"] = str(root / "logs" / "receiver.log")

        from core.receiver import app  # noqa: WPS433
        from scripts.check_consistency import build_report  # noqa: WPS433

        client = app.test_client()

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
                query_string={"key": "test-key", "text": "Axiom 第一条测试"},
            ),
            200,
            "add via query",
        )
        assert first["item"]["type"] == "text"

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

        recent = assert_status(
            client.get("/recent", query_string={"key": "test-key", "limit": "100"}),
            200,
            "recent",
        )
        assert recent["page_size"] == 50
        assert recent["total"] == 2
        assert len(recent["items"]) == 2

        search = assert_status(
            client.get("/search", query_string={"key": "test-key", "q": "Axiom"}),
            200,
            "search",
        )
        assert search["total"] == 1
        assert search["items"][0]["score"] > 0

        literal_search = assert_status(
            client.get("/search", query_string={"key": "test-key", "q": "100%"}),
            200,
            "literal percent search",
        )
        assert literal_search["total"] == 1

        inbox_files = list((root / "data" / "inbox").glob("*.txt"))
        if len(inbox_files) != 2:
            raise AssertionError(f"expected 2 inbox files, got {len(inbox_files)}")

        consistency = build_report(root)
        if not consistency["ok"]:
            raise AssertionError(f"consistency check failed: {consistency}")

        log_path = root / "logs" / "receiver.log"
        if not log_path.exists():
            raise AssertionError(f"expected log file to exist: {log_path}")

        print("receiver 冒烟测试通过")
        print(f"临时根目录: {root}")
        logging.shutdown()


if __name__ == "__main__":
    main()
