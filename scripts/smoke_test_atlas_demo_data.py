"""Regression checks for the coherent Atlas demo dataset."""
from __future__ import annotations

import json
import os
import sys
import tempfile
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))


def check(name: str, ok: bool, detail: str = "") -> None:
    if not ok:
        raise AssertionError(f"{name}: {detail}")


def scalar(conn, sql: str, params: tuple[object, ...] = ()) -> int:
    return int(conn.execute(sql, params).fetchone()[0])


def main() -> None:
    from scripts import seed_atlas_demo_data as demo

    with tempfile.TemporaryDirectory(prefix="axiom_demo_preview_") as preview_parent:
        preview_root = Path(preview_parent) / "not-created"
        result = demo.main(["--root", str(preview_root)])
        check("dry-run mode", result["mode"] == "dry-run", str(result))
        check("dry-run has no side effect", not preview_root.exists(), str(preview_root))

    with tempfile.TemporaryDirectory(prefix="axiom_demo_data_") as temp_dir:
        os.environ["AXIOM_ROOT"] = temp_dir
        os.environ["AXIOM_SECRET_KEY"] = "test-key"
        os.environ["AXIOM_LOG_PATH"] = ""

        first = demo.seed_demo(Path(temp_dir))
        check("first apply", first["mode"] == "applied", str(first))

        from core._common import get_db_connection
        from core.graph.export import build_atlas_graph_payload

        conn = get_db_connection()
        try:
            conn.execute(
                "INSERT INTO lifelines (id, name, parent_id, order_index) VALUES (?, ?, NULL, ?)",
                ("sentinel-real", "真实主线", 99),
            )
            conn.execute(
                "INSERT INTO items (type, content, source, created_at, lifeline_id) VALUES (?, ?, ?, datetime('now'), ?)",
                ("text", "这是一条必须保留的真实记录。", "sentinel", "sentinel-real"),
            )
            sentinel_id = int(conn.execute("SELECT last_insert_rowid()").fetchone()[0])
            conn.commit()
        finally:
            conn.close()

        second = demo.seed_demo(Path(temp_dir))
        check("second apply", second["mode"] == "applied", str(second))
        check("second removed prior demo", second["removed"]["items"] == len(demo.ITEMS), str(second))
        check("second removed prior commitment", second["removed"]["goal_commitments"] == 1, str(second))

        conn = get_db_connection()
        try:
            expected = demo.build_plan()["would_insert"]
            counts = {
                "lifelines": scalar(conn, "SELECT COUNT(*) FROM lifelines WHERE id LIKE 'demo_%'"),
                "items": scalar(conn, "SELECT COUNT(*) FROM items WHERE source = ?", (demo.SOURCE,)),
                "memories": scalar(conn, "SELECT COUNT(*) FROM memories WHERE detail LIKE ?", (f"{demo.DETAIL_PREFIX}%",)),
                "tasks": scalar(conn, "SELECT COUNT(*) FROM tasks WHERE detail LIKE ?", (f"{demo.DETAIL_PREFIX}%",)),
                "decisions": scalar(conn, "SELECT COUNT(*) FROM decisions WHERE context LIKE ?", (f"{demo.DETAIL_PREFIX}%",)),
                "associations": scalar(conn, "SELECT COUNT(*) FROM associations WHERE id LIKE ?", (f"{demo.SOURCE}:%",)),
            }
            for key, actual in counts.items():
                check(f"exact {key}", actual == expected[key], f"expected {expected[key]}, got {actual}")

            check("sentinel item preserved", scalar(conn, "SELECT COUNT(*) FROM items WHERE id = ? AND source = 'sentinel'", (sentinel_id,)) == 1)
            check("sentinel lifeline preserved", scalar(conn, "SELECT COUNT(*) FROM lifelines WHERE id = 'sentinel-real'") == 1)
            check(
                "demo FTS complete",
                scalar(conn, "SELECT COUNT(*) FROM items_fts WHERE rowid IN (SELECT id FROM items WHERE source = ?)", (demo.SOURCE,)) == len(demo.ITEMS),
            )
            check(
                "memory provenance complete",
                scalar(conn, "SELECT COUNT(*) FROM memories WHERE detail LIKE ? AND source_item_id IS NOT NULL", (f"{demo.DETAIL_PREFIX}%",)) == len(demo.MEMORIES),
            )

            commitment = conn.execute(
                """
                SELECT gc.state, gc.success_criteria, gc.target_date, m.content
                FROM goal_commitments gc
                JOIN memories m ON m.id = gc.memory_id
                WHERE m.detail LIKE ?
                """,
                (f"{demo.DETAIL_PREFIX}%",),
            ).fetchall()
            check("one demo goal commitment", len(commitment) == 1, str([dict(row) for row in commitment]))
            check("active goal", commitment[0]["state"] == "active", str(dict(commitment[0])))
            check("goal has success criteria", "采集" in commitment[0]["success_criteria"], str(dict(commitment[0])))
            check(
                "goal-linked next actions",
                scalar(
                    conn,
                    """
                    SELECT COUNT(*) FROM tasks t
                    JOIN memories m ON m.id = t.memory_id
                    WHERE t.detail LIKE ? AND m.category = 'goal'
                    """,
                    (f"{demo.DETAIL_PREFIX}%",),
                ) == 5,
            )

            rows = conn.execute(
                "SELECT relation_type, status, evidence FROM associations WHERE id LIKE ?",
                (f"{demo.SOURCE}:%",),
            ).fetchall()
            check("two pending relations", sum(row["status"] == "pending" for row in rows) == 2, str([row["status"] for row in rows]))
            relation_types = {row["relation_type"] for row in rows}
            required_types = {"supports", "causal", "tension", "derived_from", "same_topic", "prerequisite", "next_action"}
            check("relation language coverage", required_types <= relation_types, str(relation_types))
            for row in rows:
                evidence = json.loads(row["evidence"])
                check("structured evidence", isinstance(evidence, list) and bool(evidence), row["evidence"])
                check("specific evidence type", evidence[0]["type"] not in {"demo", "evidence"}, str(evidence[0]))
                check("nonempty evidence excerpt", bool(evidence[0]["excerpt"].strip()), str(evidence[0]))

            graph = build_atlas_graph_payload(conn, max_nodes=300)
            labels = {node["label"] for node in graph["nodes"] if node["type"] == "cluster"}
            required_labels = {"产品模型", "外脑闭环", "Atlas 重构", "演示叙事"}
            check("product semantic clusters", required_labels <= labels, str(sorted(labels)))
            check("four demo lifelines visible", sum(node["type"] == "lifeline" and node["label"] != "真实主线" for node in graph["nodes"]) == 4)
            semantic_edges = [edge for edge in graph["edges"] if edge["edge_class"] == "semantic"]
            check("visible semantic context", len(semantic_edges) >= 8, str(len(semantic_edges)))
            check("visible evidence", all(edge.get("evidence_items") for edge in semantic_edges), str(semantic_edges[:2]))
            check("graph filters low-information edges", graph["view"]["hidden_edges"] > 0, str(graph["view"]))
            check("real 3d spread", any(abs(float(node["layout"].get("z") or 0)) > 0.1 for node in graph["nodes"] if node["type"] != "root"))
        finally:
            conn.close()

    print("all checks passed")


if __name__ == "__main__":
    main()
