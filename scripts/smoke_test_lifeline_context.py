"""Smoke test for the read-only project/lifeline context assembler."""
from __future__ import annotations

import sqlite3
import sys
import tempfile
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))


def check(name: str, ok: bool, detail: str = "") -> None:
    if not ok:
        raise AssertionError(f"{name}: {detail}")


def create_schema(conn: sqlite3.Connection) -> None:
    conn.executescript(
        """
        PRAGMA foreign_keys = ON;
        CREATE TABLE lifelines (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            parent_id TEXT,
            order_index INTEGER DEFAULT 0,
            created_at TEXT,
            updated_at TEXT
        );
        CREATE TABLE items (
            id INTEGER PRIMARY KEY,
            type TEXT NOT NULL,
            content TEXT,
            original_name TEXT,
            derived_text TEXT,
            transcript_text TEXT,
            source TEXT,
            created_at TEXT,
            lifeline_id TEXT
        );
        CREATE TABLE memories (
            id INTEGER PRIMARY KEY,
            category TEXT NOT NULL,
            content TEXT NOT NULL,
            detail TEXT,
            status TEXT NOT NULL,
            created_at TEXT,
            updated_at TEXT,
            lifeline_id TEXT
        );
        CREATE TABLE goal_commitments (
            memory_id INTEGER PRIMARY KEY,
            parent_goal_id INTEGER,
            success_criteria TEXT,
            target_date TEXT,
            review_cadence_days INTEGER,
            last_reviewed_at TEXT,
            state TEXT,
            completed_at TEXT,
            created_at TEXT,
            updated_at TEXT
        );
        CREATE TABLE tasks (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            detail TEXT,
            status TEXT NOT NULL,
            priority TEXT NOT NULL,
            memory_id INTEGER,
            due_date TEXT,
            estimated_minutes INTEGER,
            completed_at TEXT,
            created_at TEXT,
            updated_at TEXT,
            lifeline_id TEXT
        );
        CREATE TABLE decisions (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            context TEXT,
            decision TEXT,
            reasoning TEXT,
            expected_outcome TEXT,
            actual_outcome TEXT,
            status TEXT NOT NULL,
            created_at TEXT,
            updated_at TEXT,
            lifeline_id TEXT
        );
        """
    )


def seed(conn: sqlite3.Connection) -> None:
    conn.executemany(
        "INSERT INTO lifelines VALUES (?, ?, ?, ?, ?, ?)",
        [
            ("growth", "个人成长", None, 1, "2026-08-01T00:00:00+00:00", "2026-08-01T00:00:00+00:00"),
            ("axiom", "Axiom", "growth", 1, "2026-08-02T00:00:00+00:00", "2026-08-02T00:00:00+00:00"),
            ("health", "健康", None, 2, "2026-08-03T00:00:00+00:00", "2026-08-03T00:00:00+00:00"),
        ],
    )
    conn.executemany(
        "INSERT INTO memories VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
            (1, "goal", "形成稳定的个人成长系统", "上层承诺", "confirmed", "2026-08-10T00:00:00+00:00", "2026-08-20T00:00:00+00:00", "growth"),
            (2, "goal", "完成 Axiom 核心产品闭环", "当前项目", "confirmed", "2026-08-11T00:00:00+00:00", "2026-08-21T00:00:00+00:00", "axiom"),
            (3, "fact", "资料库只保留三个一级目的地", "产品事实", "confirmed", "2026-08-12T00:00:00+00:00", "2026-08-21T01:00:00+00:00", "axiom"),
            (4, "goal", "完成桌面端可靠性基线", "暂不推进", "confirmed", "2026-08-13T00:00:00+00:00", "2026-08-21T01:30:00+00:00", "axiom"),
        ],
    )
    conn.executemany(
        "INSERT INTO goal_commitments VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            (1, None, "每周能持续复盘", "2026-12-31", 14, "2026-08-20T00:00:00+00:00", "active", None, "2026-08-10T00:00:00+00:00", "2026-08-20T00:00:00+00:00"),
            (2, 1, "此刻、资料库和 Atlas 形成闭环", "2026-09-30", 7, "2026-08-21T00:00:00+00:00", "active", None, "2026-08-11T00:00:00+00:00", "2026-08-21T00:00:00+00:00"),
            (4, 1, "桌面端可安装并保留离线入口", None, 14, "2026-08-21T01:30:00+00:00", "paused", None, "2026-08-13T00:00:00+00:00", "2026-08-21T01:30:00+00:00"),
        ],
    )
    conn.executemany(
        "INSERT INTO tasks VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            (1, "整理研究结论", None, "todo", "high", 1, None, 25, None, "2026-08-20T00:00:00+00:00", "2026-08-20T00:00:00+00:00", "growth"),
            (2, "实现项目脉络详情", None, "todo", "high", 2, "2026-08-25", 45, None, "2026-08-21T00:00:00+00:00", "2026-08-21T02:00:00+00:00", None),
            (3, "完成承诺档案", None, "done", "medium", 2, None, 30, "2026-08-20T03:00:00+00:00", "2026-08-19T00:00:00+00:00", "2026-08-20T03:00:00+00:00", "axiom"),
            (4, "补齐桌面端自动更新", None, "todo", "low", 4, None, 60, None, "2026-08-20T04:00:00+00:00", "2026-08-21T01:30:00+00:00", "axiom"),
        ],
    )
    conn.execute(
        "INSERT INTO items VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (1, "document", "研究报告正文", "研究报告.pdf", None, None, "upload", "2026-08-21T03:00:00+00:00", "axiom"),
    )
    conn.execute(
        "INSERT INTO decisions VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (1, "保留三个一级目的地", "产品重构", "不新增目标工作台", None, None, None, "pending", "2026-08-21T04:00:00+00:00", "2026-08-21T04:00:00+00:00", "axiom"),
    )
    conn.commit()


def main() -> None:
    from core.lifeline_context import list_lifeline_summaries, read_lifeline_context

    with tempfile.TemporaryDirectory(prefix="axiom_lifeline_") as temp_dir:
        path = Path(temp_dir) / "context.db"
        conn = sqlite3.connect(path)
        conn.row_factory = sqlite3.Row
        try:
            create_schema(conn)
            seed(conn)

            summaries = list_lifeline_summaries(conn)
            growth = next(entry for entry in summaries if entry["raw_id"] == "growth")
            axiom = next(entry for entry in summaries if entry["raw_id"] == "axiom")
            check("hierarchy depth", growth["depth"] == 0 and axiom["depth"] == 1, str(summaries))
            check("parent rollup", growth["counts"]["entities"] == 9, str(growth))
            check("direct counts remain direct", growth["direct_counts"]["entities"] == 2, str(growth))
            check("active goals roll up", growth["counts"]["active_goals"] == 2, str(growth))

            payload = read_lifeline_context(conn, "lifeline:growth")
            check("prefixed id accepted", payload is not None, str(payload))
            assert payload is not None
            check("context schema", payload["schema_version"] == "lifeline.context.v1", str(payload))
            check("descendant scope", payload["scope"]["descendant_count"] == 1, str(payload["scope"]))
            check("goals collected", [goal["id"] for goal in payload["goals"]] == [2, 1, 4], str(payload["goals"]))
            child_goal = next(goal for goal in payload["goals"] if goal["id"] == 2)
            check("goal parent retained", child_goal["profile"]["parent_goal"]["id"] == 1, str(child_goal))
            check("linked unmounted task included", {task["id"] for task in payload["tasks"]} == {1, 2, 3, 4}, str(payload["tasks"]))
            check("action progress", child_goal["progress"] == {"total": 2, "open": 1, "done": 1, "cancelled": 0}, str(child_goal))
            check("paused actions retained", payload["summary"]["open_actions"] == 2 and payload["summary"]["held_actions"] == 1, str(payload["summary"]))
            check("context sections", len(payload["materials"]) == 1 and len(payload["memories"]) == 1 and len(payload["decisions"]) == 1, str(payload))
            check("recent activity", payload["activity"][0]["kind"] == "decision", str(payload["activity"][:2]))

            child_payload = read_lifeline_context(conn, "axiom")
            assert child_payload is not None
            check("ancestor path", child_payload["lifeline"]["ancestors"] == [{"id": "lifeline:growth", "name": "个人成长"}], str(child_payload["lifeline"]))
            check("child goal scope", [goal["id"] for goal in child_payload["goals"]] == [2, 4], str(child_payload["goals"]))
            check("outside parent remains linked", child_payload["goals"][0]["profile"]["parent_goal"]["title"] == "形成稳定的个人成长系统", str(child_payload["goals"]))
        finally:
            conn.close()

    print("lifeline context smoke test passed")


if __name__ == "__main__":
    main()
