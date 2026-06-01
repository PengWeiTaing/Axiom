"""Smoke test for Atlas v1 graph API."""
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


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="axiom_atlas_") as temp_dir:
        os.environ["AXIOM_ROOT"] = temp_dir
        os.environ["AXIOM_SECRET_KEY"] = "test-key"
        os.environ["AXIOM_LOG_PATH"] = ""

        from core._common import app, get_db_connection, init_app_storage  # noqa: WPS433
        from core.routes.atlas import register_routes as register_atlas  # noqa: WPS433

        app.config["TESTING"] = True
        init_app_storage()
        register_atlas(app)

        conn = get_db_connection()
        try:
            conn.execute(
                "INSERT INTO lifelines (id, name, parent_id, order_index) VALUES (?, ?, ?, ?)",
                ("axiom-dev", "Axiom 开发", None, 1),
            )
            for idx in range(6):
                conn.execute(
                    """
                    INSERT INTO items (type, content, source, created_at, lifeline_id)
                    VALUES (?, ?, ?, datetime('now'), ?)
                    """,
                    ("text", f"Atlas 原始记录 {idx}", "smoke", "axiom-dev"),
                )
            conn.execute(
                """
                INSERT INTO tasks (title, detail, status, priority, created_at, updated_at, lifeline_id)
                VALUES (?, ?, ?, ?, datetime('now'), datetime('now'), ?)
                """,
                ("重构 Atlas v1", "建立 skeleton / cluster / leaf 分层", "todo", "high", "axiom-dev"),
            )
            conn.execute(
                """
                INSERT INTO memories (category, content, detail, status, created_at, updated_at, lifeline_id)
                VALUES (?, ?, ?, ?, datetime('now'), datetime('now'), ?)
                """,
                ("fact", "Atlas 需要结构边和语义边分离", "当前图谱混乱源于层级和边语义混杂", "confirmed", "axiom-dev"),
            )
            conn.execute(
                """
                INSERT INTO decisions (title, context, decision, reasoning, status, created_at, updated_at, lifeline_id)
                VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'), ?)
                """,
                ("Atlas v1 模型", "全局图不可读", "采用三层图谱模型", "先做数据层和过滤层", "pending", "axiom-dev"),
            )
            conn.execute(
                """
                INSERT INTO associations (
                    id, from_kind, from_id, to_kind, to_id, relation_type,
                    confidence, status, evidence, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
                """,
                (
                    "A1",
                    "memory",
                    "1",
                    "decision",
                    "1",
                    "causal",
                    0.92,
                    "accepted",
                    json.dumps([{"type": "smoke", "excerpt": "记忆触发了 Atlas v1 决策", "weight": 0.92}], ensure_ascii=False),
                ),
            )
            conn.commit()
        finally:
            conn.close()

        with app.test_client() as client:
            resp = client.get("/api/atlas/graph")
            check("403 without key", resp.status_code == 403, f"got {resp.status_code}")

            resp = client.get("/api/atlas/graph", headers={"X-Axiom-Key": "test-key"})
            check("graph 200", resp.status_code == 200, f"got {resp.status_code}")
            data = resp.get_json()
            check("schema", data.get("schema_version") == "atlas.v1", str(data.get("schema_version")))
            check("nodes present", len(data.get("nodes", [])) >= 7, str(data.get("nodes")))
            check("edges present", len(data.get("edges", [])) >= 4, str(data.get("edges")))

            node_types = {node["type"] for node in data["nodes"]}
            check("root node", "root" in node_types, str(node_types))
            check("lifeline node", "lifeline" in node_types, str(node_types))
            check("cluster node", "cluster" in node_types, str(node_types))
            check("representative entity", {"memory", "decision", "task"} <= node_types, str(node_types))
            clusters = [node for node in data["nodes"] if node["type"] == "cluster"]
            check("topic cluster", any(node["meta"].get("cluster_kind") == "topic" for node in clusters), str(clusters))
            check("atlas topic label", any(node["label"] == "Atlas 重构" for node in clusters), str(clusters))
            check("3d shell layout", any(abs(float(node["layout"].get("z") or 0)) > 0.1 for node in data["nodes"] if node["type"] != "root"), str(data["nodes"]))

            semantic = [edge for edge in data["edges"] if edge["edge_class"] == "semantic"]
            check("semantic edge visible", len(semantic) == 1, str(semantic))
            check("semantic evidence", bool(semantic[0].get("evidence")), str(semantic[0]))
            check("semantic strength", semantic[0]["strength"] >= 0.9, str(semantic[0]))
            check("hidden nodes", data["view"]["hidden_nodes"] >= 4, str(data["view"]))
            check("layout version", data["view"].get("layout") == "semantic_shell_sector_v2", str(data["view"]))

            local = client.get(
                "/api/atlas/local?center=memory:1&depth=1",
                headers={"X-Axiom-Key": "test-key"},
            )
            check("local 200", local.status_code == 200, f"got {local.status_code}")
            local_data = local.get_json()
            check("local mode", local_data.get("mode") == "local", str(local_data))
            check("local center included", any(node["id"] == "memory:1" for node in local_data.get("nodes", [])), str(local_data))

            rebuild = client.post("/api/atlas/rebuild", headers={"X-Axiom-Key": "test-key"})
            check("rebuild 200", rebuild.status_code == 200, f"got {rebuild.status_code}")
            rebuild_data = rebuild.get_json()
            check("rebuild nodes", rebuild_data["rebuilt"]["nodes"] == len(data["nodes"]), str(rebuild_data))

        print("all checks passed")


if __name__ == "__main__":
    main()
