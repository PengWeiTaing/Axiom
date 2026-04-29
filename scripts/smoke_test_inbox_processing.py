from __future__ import annotations

import os
import sqlite3
import subprocess
import sys
import tempfile
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))


def run_command(args: list[str]) -> str:
    env = os.environ.copy()
    env["PYTHONUTF8"] = "1"
    result = subprocess.run(
        args,
        cwd=str(REPO_ROOT),
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
        env=env,
    )
    return result.stdout


def assert_contains(text: str, expected: str, label: str) -> None:
    if expected not in text:
        raise AssertionError(f"{label}: expected to find {expected!r}\n{text}")


def init_test_root(root: Path) -> None:
    os.environ["AXIOM_ROOT"] = str(root)
    os.environ["AXIOM_SECRET_KEY"] = "test-key"

    from core.receiver import init_db  # noqa: WPS433

    (root / "data" / "inbox").mkdir(parents=True, exist_ok=True)
    (root / "data" / "archive").mkdir(parents=True, exist_ok=True)
    (root / "db").mkdir(parents=True, exist_ok=True)
    init_db(root / "db" / "axiom.db")


def insert_item(
    root: Path,
    *,
    item_type: str,
    content: str,
    filename: str,
    created_at: str,
    body: bytes,
    source: str = "ios_shortcut",
) -> int:
    file_path = root / "data" / "inbox" / filename
    file_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.write_bytes(body)

    conn = sqlite3.connect(str(root / "db" / "axiom.db"))
    try:
        cursor = conn.execute(
            """
            INSERT INTO items (type, content, file_path, source, created_at)
            VALUES (?, ?, ?, ?, ?)
            """,
            (item_type, content, str(file_path), source, created_at),
        )
        conn.commit()
        return int(cursor.lastrowid)
    finally:
        conn.close()


def fetch_file_path(root: Path, item_id: int) -> Path:
    conn = sqlite3.connect(str(root / "db" / "axiom.db"))
    try:
        row = conn.execute(
            "SELECT file_path FROM items WHERE id = ?",
            (item_id,),
        ).fetchone()
    finally:
        conn.close()

    if row is None:
        raise AssertionError(f"item not found: {item_id}")
    return Path(row[0])


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="axiom_inbox_processing_") as temp_dir:
        root = Path(temp_dir)
        init_test_root(root)

        fresh_text_id = insert_item(
            root,
            item_type="text",
            content="fresh note",
            filename="fresh_note.txt",
            created_at="2026-04-29T04:00:00+00:00",
            body="fresh note".encode("utf-8"),
        )
        stale_text_id = insert_item(
            root,
            item_type="text",
            content="old note",
            filename="old_note.txt",
            created_at="2026-04-25T04:00:00+00:00",
            body="old note".encode("utf-8"),
        )
        stale_image_id = insert_item(
            root,
            item_type="image",
            content="2026年4月25日 下午1:26",
            filename="old_image.heic",
            created_at="2026-04-25T05:26:00+00:00",
            body=b"old image bytes",
        )
        fresh_image_id = insert_item(
            root,
            item_type="image",
            content="2026年4月29日 下午1:26",
            filename="fresh_image.heic",
            created_at="2026-04-29T05:26:00+00:00",
            body=b"fresh image bytes",
        )
        empty_text_id = insert_item(
            root,
            item_type="text",
            content="",
            filename="empty_note.txt",
            created_at="2026-04-29T06:00:00+00:00",
            body="".encode("utf-8"),
        )

        report_output = run_command(
            [
                sys.executable,
                "scripts/build_inbox_processing_report.py",
                "--root",
                str(root),
                "--date",
                "2026-04-29",
                "--utc-offset",
                "+08:00",
                "--stale-days",
                "3",
            ]
        )
        assert_contains(report_output, "归档候选=1", "report summary")
        assert_contains(report_output, "补描述后归档=1", "report summary")
        assert_contains(report_output, "补描述=1", "report summary")
        assert_contains(report_output, "继续保留=1", "report summary")
        assert_contains(report_output, "检查空内容=1", "report summary")

        dry_run_output = run_command(
            [
                sys.executable,
                "scripts/apply_inbox_actions.py",
                "--root",
                str(root),
                "--date",
                "2026-04-29",
                "--utc-offset",
                "+08:00",
                "--stale-days",
                "3",
            ]
        )
        assert_contains(dry_run_output, "- mode: dry-run", "dry run mode")
        assert_contains(dry_run_output, "- total_candidates: 1", "dry run count")
        assert_contains(dry_run_output, f"[item {stale_text_id}]", "dry run stale text")
        if f"[item {stale_image_id}]" in dry_run_output:
            raise AssertionError("dry run should not include describe-then-archive item by default")

        dry_run_with_image_output = run_command(
            [
                sys.executable,
                "scripts/apply_inbox_actions.py",
                "--root",
                str(root),
                "--date",
                "2026-04-29",
                "--utc-offset",
                "+08:00",
                "--stale-days",
                "3",
                "--include-describe-then-archive",
            ]
        )
        assert_contains(dry_run_with_image_output, "- total_candidates: 2", "dry run include count")
        assert_contains(dry_run_with_image_output, f"[item {stale_image_id}]", "dry run include image")

        dry_run_only_image_output = run_command(
            [
                sys.executable,
                "scripts/apply_inbox_actions.py",
                "--root",
                str(root),
                "--date",
                "2026-04-29",
                "--utc-offset",
                "+08:00",
                "--stale-days",
                "3",
                "--include-describe-then-archive",
                "--only-id",
                str(stale_image_id),
            ]
        )
        assert_contains(dry_run_only_image_output, f"- only_ids: [{stale_image_id}]", "only id header")
        assert_contains(dry_run_only_image_output, "- total_candidates: 1", "only id count")
        assert_contains(dry_run_only_image_output, f"[item {stale_image_id}]", "only id image")
        if f"[item {stale_text_id}]" in dry_run_only_image_output:
            raise AssertionError("only-id run should exclude other candidates")

        apply_output = run_command(
            [
                sys.executable,
                "scripts/apply_inbox_actions.py",
                "--root",
                str(root),
                "--date",
                "2026-04-29",
                "--utc-offset",
                "+08:00",
                "--stale-days",
                "3",
                "--apply",
            ]
        )
        assert_contains(apply_output, "- mode: apply", "apply mode")
        assert_contains(apply_output, "`applied`", "apply result")

        stale_text_path = fetch_file_path(root, stale_text_id)
        if "data\\archive" not in str(stale_text_path) and "data/archive" not in str(stale_text_path):
            raise AssertionError(f"stale text should move to archive: {stale_text_path}")
        if not stale_text_path.exists():
            raise AssertionError(f"archived text file missing: {stale_text_path}")

        fresh_text_path = fetch_file_path(root, fresh_text_id)
        if "data\\inbox" not in str(fresh_text_path) and "data/inbox" not in str(fresh_text_path):
            raise AssertionError(f"fresh text should stay in inbox: {fresh_text_path}")

        from scripts.check_consistency import build_report  # noqa: WPS433

        report_after_apply = build_report(root)
        if not report_after_apply["ok"]:
            raise AssertionError(f"consistency failed after text apply: {report_after_apply}")

        report_output_after_apply = run_command(
            [
                sys.executable,
                "scripts/build_inbox_processing_report.py",
                "--root",
                str(root),
                "--date",
                "2026-04-29",
                "--utc-offset",
                "+08:00",
                "--stale-days",
                "3",
            ]
        )
        if f"[item {stale_text_id}]" in report_output_after_apply:
            raise AssertionError("stale text should disappear from inbox report after apply")

        apply_with_image_output = run_command(
            [
                sys.executable,
                "scripts/apply_inbox_actions.py",
                "--root",
                str(root),
                "--date",
                "2026-04-29",
                "--utc-offset",
                "+08:00",
                "--stale-days",
                "3",
                "--include-describe-then-archive",
                "--apply",
            ]
        )
        assert_contains(apply_with_image_output, f"[item {stale_image_id}]", "apply include image")

        stale_image_path = fetch_file_path(root, stale_image_id)
        if "data\\archive" not in str(stale_image_path) and "data/archive" not in str(stale_image_path):
            raise AssertionError(f"stale image should move to archive: {stale_image_path}")
        if not stale_image_path.exists():
            raise AssertionError(f"archived image file missing: {stale_image_path}")

        final_report = build_report(root)
        if not final_report["ok"]:
            raise AssertionError(f"final consistency failed: {final_report}")

        final_processing_output = run_command(
            [
                sys.executable,
                "scripts/build_inbox_processing_report.py",
                "--root",
                str(root),
                "--date",
                "2026-04-29",
                "--utc-offset",
                "+08:00",
                "--stale-days",
                "3",
            ]
        )
        if f"[item {stale_image_id}]" in final_processing_output:
            raise AssertionError("stale image should disappear from inbox report after apply")
        assert_contains(final_processing_output, f"[item {fresh_image_id}]", "fresh image remains")
        assert_contains(final_processing_output, f"[item {empty_text_id}]", "empty text remains")

        print("inbox processing smoke test passed")
        print(f"temporary root: {root}")


if __name__ == "__main__":
    main()
