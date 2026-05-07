#!/usr/bin/env python3
"""
Transcribe Axiom audio items with OpenAI and save a daily snapshot report.

This script is optional: it only becomes usable after configuring an OpenAI API
key in the runtime environment. When a mock template is provided, it can also
run without network access for local smoke tests.
"""

from __future__ import annotations

import argparse
import os
import sqlite3
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from types import SimpleNamespace


SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

import build_review_markdown as review_tools  # noqa: E402
import export_items_markdown as export_tools  # noqa: E402
from core.receiver import normalize_audio_transcript_text  # noqa: E402


DEFAULT_MODEL = os.environ.get("AXIOM_AUDIO_TRANSCRIBE_MODEL", "gpt-4o-mini-transcribe")
DEFAULT_LANGUAGE = os.environ.get("AXIOM_AUDIO_TRANSCRIBE_LANGUAGE", "").strip()
DEFAULT_PROMPT = os.environ.get("AXIOM_AUDIO_TRANSCRIBE_PROMPT", "").strip()
MOCK_TEMPLATE = os.environ.get("AXIOM_AUDIO_TRANSCRIBE_MOCK_TEMPLATE", "").strip()


@dataclass
class TranscriptionResult:
    item_id: int
    original_name: str
    status: str
    message: str
    preview: str
    transcript_text: str | None = None
    file_path: str | None = None


def build_output_path(root: Path, report_date: str) -> Path:
    year = report_date[:4]
    return root / "data" / "reviews" / "audio-transcripts" / year / f"{report_date}.md"


def build_query_args(args: argparse.Namespace, start_utc: str, end_utc: str) -> SimpleNamespace:
    return SimpleNamespace(
        root=args.root,
        deploy_root=args.deploy_root,
        created_from=start_utc,
        created_to=end_utc,
        item_type="audio",
        storage=None,
        source=args.source,
        sort="oldest",
        limit=args.limit,
    )


def fetch_audio_rows(args: argparse.Namespace) -> list[sqlite3.Row]:
    if args.item_ids:
        db_path = args.root / "db" / "axiom.db"
        if not db_path.exists():
            raise FileNotFoundError(f"数据库不存在: {db_path}")

        conn = sqlite3.connect(str(db_path), timeout=30)
        conn.row_factory = sqlite3.Row
        try:
            placeholders = ",".join("?" for _ in args.item_ids)
            params: list[object] = ["audio", *args.item_ids]
            source_clause = ""
            if args.source:
                source_clause = " AND source = ?"
                params.append(args.source)
            limit_clause = ""
            if args.limit:
                limit_clause = " LIMIT ?"
                params.append(args.limit)
            rows = conn.execute(
                f"""
                SELECT
                    id,
                    type,
                    content,
                    file_path,
                    source,
                    created_at,
                    original_name,
                    mime_type,
                    size_bytes,
                    derived_text,
                    transcript_text
                FROM items
                WHERE type = ? AND id IN ({placeholders}){source_clause}
                ORDER BY id ASC
                {limit_clause}
                """,
                params,
            ).fetchall()
        finally:
            conn.close()
        return list(rows)

    rows = export_tools.read_rows(
        build_query_args(args, args.created_from, args.created_to),
        args.root,
    )
    return rows


def build_mock_transcript(row: sqlite3.Row) -> str:
    values = {
        "id": row["id"],
        "item_id": row["id"],
        "original_name": export_tools.read_row_text(row, "original_name"),
        "content": export_tools.read_row_text(row, "content"),
        "source": export_tools.read_row_text(row, "source"),
        "created_at": export_tools.read_row_text(row, "created_at"),
    }
    if not MOCK_TEMPLATE:
        return ""
    try:
        return MOCK_TEMPLATE.format(**values)
    except Exception:
        return MOCK_TEMPLATE


class OpenAIAudioTranscriber:
    def __init__(
        self,
        *,
        model: str,
        language: str | None,
        prompt: str | None,
    ) -> None:
        self.model = model
        self.language = language or None
        self.prompt = prompt or None
        self.mock_enabled = bool(MOCK_TEMPLATE)
        self._client = None

        if self.mock_enabled:
            return

        api_key = os.environ.get("AXIOM_OPENAI_API_KEY") or os.environ.get("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("缺少 AXIOM_OPENAI_API_KEY 或 OPENAI_API_KEY，无法执行音频自动转写")

        try:
            from openai import OpenAI
        except ImportError as exc:  # pragma: no cover - deployment should install requirements.txt
            raise ValueError("未安装 openai 依赖，无法执行音频自动转写") from exc

        self._client = OpenAI(api_key=api_key)

    def transcribe(self, file_path: Path, row: sqlite3.Row) -> str:
        if self.mock_enabled:
            return build_mock_transcript(row)

        request_kwargs: dict[str, object] = {
            "model": self.model,
            "response_format": "text",
        }
        if self.language:
            request_kwargs["language"] = self.language
        if self.prompt:
            request_kwargs["prompt"] = self.prompt

        with file_path.open("rb") as audio_file:
            transcript = self._client.audio.transcriptions.create(
                file=audio_file,
                **request_kwargs,
            )

        return str(transcript)


def write_transcript_text(root: Path, item_id: int, transcript_text: str) -> None:
    db_path = root / "db" / "axiom.db"
    conn = sqlite3.connect(str(db_path), timeout=30)
    try:
        conn.execute(
            "UPDATE items SET transcript_text = ? WHERE id = ?",
            (transcript_text, item_id),
        )
        conn.commit()
    finally:
        conn.close()


def build_markdown(
    args: argparse.Namespace,
    results: list[TranscriptionResult],
    summary: dict,
) -> str:
    generated_at = datetime.now(timezone.utc).isoformat()
    lines = [
        "# Axiom Audio Transcript Snapshot",
        "",
        f"- generated_at: {generated_at}",
        f"- root: {args.root}",
        f"- report_date: {args.date}",
        f"- utc_range: {args.created_from} -> {args.created_to}",
        f"- model: {args.model}",
        f"- language: {args.language or 'None'}",
        f"- prompt: {args.prompt or 'None'}",
        f"- source: {args.source or 'None'}",
        f"- limit: {args.limit if args.limit is not None else 'None'}",
        f"- item_ids: {','.join(str(item_id) for item_id in args.item_ids) if args.item_ids else 'None'}",
        f"- force: {args.force}",
        f"- dry_run: {args.dry_run}",
        "",
        "## Summary",
        "",
        f"- scanned: {summary['scanned']}",
        f"- updated: {summary['updated']}",
        f"- would_update: {summary['would_update']}",
        f"- skipped_existing: {summary['skipped_existing']}",
        f"- skipped_missing_file: {summary['skipped_missing_file']}",
        f"- skipped_empty: {summary['skipped_empty']}",
        f"- skipped_unchanged: {summary['skipped_unchanged']}",
        f"- failed: {summary['failed']}",
        "",
        "## Items",
        "",
    ]

    if not results:
        lines.append("_No audio items matched._")
        return "\n".join(lines) + "\n"

    for index, result in enumerate(results, start=1):
        lines.extend(
            [
                f"{index}. `[item {result.item_id}]` `{result.status}` `{result.original_name or 'unknown'}`",
                f"   message: {result.message}",
            ]
        )
        if result.file_path:
            lines.append(f"   file_path: {result.file_path}")
        if result.preview:
            lines.append(f"   preview: {result.preview}")
        lines.append("")

    lines.extend(
        [
            "## Notes",
            "",
            "- 这份快照用于回看当天音频转写自动化的执行结果。",
            "- dry_run 不会写回数据库，但仍会保留一份可读报告。",
            "",
        ]
    )
    return "\n".join(lines) + "\n"


def transcribe_audio_items(args: argparse.Namespace) -> tuple[dict, list[TranscriptionResult]]:
    rows = fetch_audio_rows(args)
    summary = {
        "scanned": 0,
        "updated": 0,
        "would_update": 0,
        "skipped_existing": 0,
        "skipped_missing_file": 0,
        "skipped_empty": 0,
        "skipped_unchanged": 0,
        "failed": 0,
    }
    results: list[TranscriptionResult] = []

    if not rows:
        return summary, results

    transcriber = OpenAIAudioTranscriber(
        model=args.model,
        language=args.language,
        prompt=args.prompt,
    )

    for row in rows:
        summary["scanned"] += 1
        item_id = int(row["id"])
        original_name = export_tools.read_row_text(row, "original_name")
        current_transcript = export_tools.read_row_text(row, "transcript_text")
        file_path = export_tools.resolve_file_path(args.root, row["file_path"], args.deploy_root)

        if current_transcript and not args.force:
            summary["skipped_existing"] += 1
            results.append(
                TranscriptionResult(
                    item_id=item_id,
                    original_name=original_name,
                    status="skipped_existing",
                    message="已有 transcript_text，默认跳过",
                    preview=export_tools.summarize_inline_text(current_transcript),
                    transcript_text=current_transcript,
                    file_path=str(file_path) if file_path else None,
                )
            )
            continue

        if file_path is None or not file_path.exists():
            summary["skipped_missing_file"] += 1
            results.append(
                TranscriptionResult(
                    item_id=item_id,
                    original_name=original_name,
                    status="missing_file",
                    message="音频文件不存在，无法转写",
                    preview="",
                    file_path=str(file_path) if file_path else None,
                )
            )
            continue

        try:
            transcript_text = normalize_audio_transcript_text(
                transcriber.transcribe(file_path, row)
            )
        except Exception as exc:  # pragma: no cover - network/provider errors vary
            summary["failed"] += 1
            results.append(
                TranscriptionResult(
                    item_id=item_id,
                    original_name=original_name,
                    status="failed",
                    message=str(exc).strip() or "转写失败",
                    preview="",
                    file_path=str(file_path),
                )
            )
            continue

        if not transcript_text:
            summary["skipped_empty"] += 1
            results.append(
                TranscriptionResult(
                    item_id=item_id,
                    original_name=original_name,
                    status="skipped_empty",
                    message="转写结果为空，跳过写回",
                    preview="",
                    file_path=str(file_path),
                )
            )
            continue

        if transcript_text == current_transcript:
            summary["skipped_unchanged"] += 1
            results.append(
                TranscriptionResult(
                    item_id=item_id,
                    original_name=original_name,
                    status="skipped_unchanged",
                    message="转写结果与当前 transcript_text 一致",
                    preview=export_tools.summarize_inline_text(transcript_text),
                    transcript_text=transcript_text,
                    file_path=str(file_path),
                )
            )
            continue

        summary["would_update"] += 1
        if not args.dry_run:
            write_transcript_text(args.root, item_id, transcript_text)
            summary["updated"] += 1

        results.append(
            TranscriptionResult(
                item_id=item_id,
                original_name=original_name,
                status="updated" if not args.dry_run else "would_update",
                message="已写回 transcript_text" if not args.dry_run else "dry-run 预览，不写回数据库",
                preview=export_tools.summarize_inline_text(transcript_text),
                transcript_text=transcript_text,
                file_path=str(file_path),
            )
        )

    return summary, results


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Transcribe audio items and save a daily transcript snapshot.",
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=export_tools.default_root(),
        help="Axiom root directory.",
    )
    parser.add_argument(
        "--deploy-root",
        default=export_tools.DEFAULT_DEPLOY_ROOT,
        help="Deployment root used in stored file paths.",
    )
    parser.add_argument(
        "--date",
        help="Anchor local date in YYYY-MM-DD. Defaults to today in the chosen timezone.",
    )
    parser.add_argument(
        "--days-offset",
        type=int,
        default=0,
        help="Shift the anchor local date by N days. Example: -1 means yesterday.",
    )
    parser.add_argument(
        "--utc-offset",
        default="+08:00",
        help="Local timezone offset, default +08:00.",
    )
    parser.add_argument(
        "--item-id",
        dest="item_ids",
        type=int,
        action="append",
        help="Only process the given audio item id. Can be passed multiple times.",
    )
    parser.add_argument(
        "--source",
        help="Optional source filter.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        help="Optional row limit after filtering.",
    )
    parser.add_argument(
        "--model",
        default=DEFAULT_MODEL,
        help=f"Transcription model. Default: {DEFAULT_MODEL}",
    )
    parser.add_argument(
        "--language",
        default=DEFAULT_LANGUAGE,
        help="Optional language hint sent to the transcription API.",
    )
    parser.add_argument(
        "--prompt",
        default=DEFAULT_PROMPT,
        help="Optional prompt sent to the transcription API.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        help="Optional explicit output path. Defaults to data/reviews/audio-transcripts/<year>/<date>.md",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Re-run transcription even when transcript_text already exists.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Preview transcription results without writing transcript_text back to SQLite.",
    )
    args = parser.parse_args()

    if args.limit is not None and args.limit <= 0:
        parser.error("--limit must be greater than 0")

    local_tz = review_tools.parse_utc_offset(args.utc_offset)
    anchor_date = review_tools.parse_anchor_date(args.date, local_tz)
    anchor_date = review_tools.apply_days_offset(anchor_date, args.days_offset)
    start_local, end_local = review_tools.build_window("day", anchor_date, local_tz)

    args.date = anchor_date.isoformat()
    args.root = args.root.expanduser().resolve()
    args.created_from = start_local.astimezone(timezone.utc).isoformat()
    args.created_to = end_local.astimezone(timezone.utc).isoformat()
    args.output = args.output.expanduser().resolve() if args.output else build_output_path(args.root, args.date)

    return args


def main() -> int:
    try:
        args = parse_args()
        summary, results = transcribe_audio_items(args)
        markdown = build_markdown(args, results, summary)
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(markdown, encoding="utf-8", newline="\n")
    except (FileNotFoundError, ValueError) as exc:
        print(str(exc), file=sys.stderr)
        return 1

    print(
        f"audio transcript summary: updated={summary['updated']} would_update={summary['would_update']} "
        f"failed={summary['failed']} scanned={summary['scanned']}"
    )
    print(f"saved audio transcript snapshot: {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
