#!/usr/bin/env python3
"""Build a daily Axiom production status snapshot."""
from __future__ import annotations

import argparse
import json
import os
import sys
from collections import Counter
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
SCRIPT_DIR = Path(__file__).resolve().parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

import check_consistency  # noqa: E402


def default_root() -> Path:
    env_root = os.environ.get("AXIOM_ROOT")
    if env_root:
        return Path(env_root).expanduser().resolve()
    vps_root = Path("/opt/axiom")
    if vps_root.exists():
        return vps_root.resolve()
    return REPO_ROOT


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate and save an Axiom system status snapshot.",
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=default_root(),
        help="Axiom root directory. Default: AXIOM_ROOT, /opt/axiom, or repo root.",
    )
    parser.add_argument(
        "--deploy-root",
        default=check_consistency.DEFAULT_DEPLOY_ROOT,
        help="Deployment root used in stored file paths. Default: /opt/axiom.",
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
        default=os.environ.get("AXIOM_LOCAL_UTC_OFFSET", "+08:00"),
        help="Local timezone offset, default +08:00.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        help="Optional explicit output path. Defaults to data/reviews/system-status/<year>/<date>.md.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite existing snapshot file.",
    )
    parser.add_argument(
        "--stdout",
        action="store_true",
        help="Print markdown to stdout instead of writing a file.",
    )
    return parser.parse_args()


def output_path(root: Path, run_date: str) -> Path:
    return root / "data" / "reviews" / "system-status" / run_date[:4] / f"{run_date}.md"


def response_json(client, path: str, key: str) -> dict:
    resp = client.get(path, headers={"X-Axiom-Key": key})
    payload = resp.get_json(silent=True)
    if isinstance(payload, dict):
        payload.setdefault("_http_status", resp.status_code)
        return payload
    return {
        "ok": False,
        "_http_status": resp.status_code,
        "body": resp.get_data(as_text=True)[:1000],
    }


def bool_label(value) -> str:
    return "是" if bool(value) else "否"


def status_label(payload: dict) -> str:
    if not payload:
        return "missing"
    if payload.get("_http_status") != 200:
        return f"http {payload.get('_http_status')}"
    return "ok" if payload.get("ok", True) else "warn"


def count_run_statuses(runs_payload: dict) -> dict[str, int]:
    items = runs_payload.get("items") or []
    counter = Counter(str(item.get("status") or "unknown") for item in items if isinstance(item, dict))
    return dict(counter)


def markdown_table(headers: list[str], rows: list[list[object]]) -> str:
    lines = [
        "| " + " | ".join(headers) + " |",
        "| " + " | ".join("---" for _ in headers) + " |",
    ]
    for row in rows:
        lines.append("| " + " | ".join(str(cell) for cell in row) + " |")
    return "\n".join(lines)


def build_markdown(
    *,
    run_date: str,
    root: Path,
    health: dict,
    system: dict,
    stats: dict,
    metrics: dict,
    backlog: dict,
    runs: dict,
    consistency: dict,
) -> str:
    run_counts = count_run_statuses(runs)
    tables = system.get("tables") or {}
    integrity = system.get("integrity") or {}
    pending_groups = backlog.get("groups") or backlog.get("items") or []

    lines = [
        f"# Axiom 系统状态快照 {run_date}",
        "",
        f"- root: `{root}`",
        f"- health endpoint: `{status_label(health)}`",
        f"- system endpoint: `{status_label(system)}`",
        f"- stats endpoint: `{status_label(stats)}`",
        f"- metrics endpoint: `{status_label(metrics)}`",
        "",
        "## 总览",
        "",
        markdown_table(
            ["指标", "值"],
            [
                ["health_score", system.get("health_score", "")],
                ["db_size_mb", system.get("db_size_mb", "")],
                ["fts_index_entries", system.get("fts_index_entries", "")],
                ["backup_ok", bool_label(system.get("backup_ok"))],
                ["backup_age_hours", system.get("backup_age_hours", "")],
                ["integrity_ok", bool_label(integrity.get("ok"))],
                ["orphan_memories", integrity.get("orphan_memories", "")],
                ["orphan_tasks", integrity.get("orphan_tasks", "")],
                ["empty_content_items", integrity.get("empty_content_items", "")],
            ],
        ),
        "",
        "## 表计数",
        "",
        markdown_table(["table", "count"], [[name, count] for name, count in sorted(tables.items())]),
        "",
        "## 内容统计",
        "",
        markdown_table(
            ["指标", "值"],
            [[key, value] for key, value in sorted(stats.items()) if key not in {"ok", "_http_status"}],
        ),
        "",
        "## 自动化运行",
        "",
        markdown_table(
            ["status", "recent_count"],
            [[status, count] for status, count in sorted(run_counts.items())] or [["none", 0]],
        ),
        "",
        "## Pending Backlog",
        "",
    ]

    if isinstance(pending_groups, list) and pending_groups:
        rows = []
        for group in pending_groups[:10]:
            if isinstance(group, dict):
                rows.append([
                    group.get("type") or group.get("id") or group.get("title") or "",
                    group.get("count", ""),
                    group.get("title") or group.get("description") or "",
                ])
        lines.append(markdown_table(["group", "count", "note"], rows or [["none", 0, ""]]))
    else:
        lines.append("暂无 pending backlog 或当前接口未返回分组。")

    lines.extend([
        "",
        "## 一致性检查",
        "",
        markdown_table(
            ["指标", "值"],
            [
                ["ok", bool_label(consistency.get("ok"))],
                ["db_file_count", consistency.get("db_file_count", "")],
                ["storage_file_count", consistency.get("storage_file_count", "")],
                ["missing_files", len(consistency.get("missing_files") or [])],
                ["orphan_files", len(consistency.get("orphan_files") or [])],
                ["missing_path_rows", len(consistency.get("missing_path_rows") or [])],
                ["fts_ok", bool_label(consistency.get("fts_ok"))],
            ],
        ),
        "",
        "## Metrics 摘要",
        "",
        markdown_table(
            ["指标", "值"],
            [
                ["requests", metrics.get("requests", "")],
                ["errors", metrics.get("errors", "")],
                ["uptime_seconds", metrics.get("uptime_seconds", "")],
            ],
        ),
        "",
    ])

    if consistency.get("missing_files"):
        lines.append("### 缺失文件样例")
        lines.extend(f"- `{path}`" for path in consistency["missing_files"][:10])
        lines.append("")
    if consistency.get("orphan_files"):
        lines.append("### 孤立文件样例")
        lines.extend(f"- `{path}`" for path in consistency["orphan_files"][:10])
        lines.append("")

    lines.append("<!-- generated_by: scripts/build_system_status.py -->")
    return "\n".join(lines) + "\n"


def main() -> int:
    args = parse_args()
    root = args.root.expanduser().resolve()
    os.environ["AXIOM_ROOT"] = str(root)
    os.environ["AXIOM_LOCAL_UTC_OFFSET"] = args.utc_offset

    from core import receiver  # noqa: WPS433

    try:
        run_date = receiver.resolve_run_date_value(
            args.date,
            days_offset=args.days_offset,
            utc_offset_text=args.utc_offset,
        )
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    client = receiver.app.test_client()
    key = receiver.SECRET_KEY
    health = response_json(client, "/health", key)
    system = response_json(client, "/system", key)
    stats = response_json(client, "/stats", key)
    metrics = response_json(client, "/metrics", key)
    backlog = response_json(client, "/processing/backlog?group_limit=5", key)
    runs = response_json(client, "/automation/runs?page=1&page_size=50", key)

    try:
        consistency = check_consistency.build_report(root, args.deploy_root)
    except FileNotFoundError as exc:
        consistency = {"ok": False, "error": str(exc)}

    markdown = build_markdown(
        run_date=run_date,
        root=root,
        health=health,
        system=system,
        stats=stats,
        metrics=metrics,
        backlog=backlog,
        runs=runs,
        consistency=consistency,
    )

    if args.stdout:
        print(markdown)
        return 0

    target = args.output.expanduser().resolve() if args.output else output_path(root, run_date)
    if target.exists() and not args.force:
        print(f"system status snapshot already exists: {target}", file=sys.stderr)
        return 1
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(markdown, encoding="utf-8", newline="\n")
    print(f"saved system status snapshot: {target}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
