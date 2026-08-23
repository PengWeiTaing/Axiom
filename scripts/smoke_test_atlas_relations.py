"""Atlas relationship governance smoke test with isolated storage."""
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
    with tempfile.TemporaryDirectory(prefix="axiom_atlas_relations_") as temp_dir:
        os.environ["AXIOM_ROOT"] = temp_dir
        os.environ["AXIOM_SECRET_KEY"] = "test-key"
        os.environ["AXIOM_LOG_PATH"] = ""

        from core._common import app, get_db_connection, init_app_storage  # noqa: WPS433
        from core.routes.atlas import register_routes as register_atlas  # noqa: WPS433
        from core.routes.cosmos_associations import (  # noqa: WPS433
            _normalize_llm_results,
            register_routes as register_associations,
        )

        app.config["TESTING"] = True
        init_app_storage()
        register_associations(app)
        register_atlas(app)

        conn = get_db_connection()
        try:
            conn.execute(
                "INSERT INTO lifelines (id, name, parent_id, order_index) VALUES (?, ?, ?, ?)",
                ("work", "工作", None, 1),
            )
            conn.execute(
                """
                INSERT INTO items (type, content, source, created_at, lifeline_id)
                VALUES ('text', 'Atlas 关系证据记录', 'smoke', datetime('now'), 'work')
                """
            )
            conn.execute(
                """
                INSERT INTO tasks (title, detail, status, priority, created_at, updated_at, lifeline_id)
                VALUES ('实现关系治理', '确认、修改与删除', 'todo', 'high', datetime('now'), datetime('now'), 'work')
                """
            )
            conn.execute(
                """
                INSERT INTO memories (category, content, status, created_at, updated_at, lifeline_id)
                VALUES ('fact', '关系必须有真实证据', 'confirmed', datetime('now'), datetime('now'), 'work')
                """
            )
            conn.commit()
        finally:
            conn.close()

        headers = {"X-Axiom-Key": "test-key"}
        evidence = [{"type": "manual_note", "excerpt": "记录直接要求实现关系治理", "weight": 0.91}]

        with app.test_client() as client:
            create_path = "/cosmos/associations"
            create_body = {
                "from": "item:1",
                "to": "task:1",
                "relation_type": "derived_from",
                "confidence": 0.91,
                "status": "pending",
                "evidence": evidence,
            }

            check("create requires auth", client.post(create_path, json=create_body).status_code == 403)
            check(
                "reject invalid kind",
                client.post(create_path, json={**create_body, "from": "cluster:fake"}, headers=headers).status_code == 400,
            )
            check(
                "reject missing target",
                client.post(create_path, json={**create_body, "to": "task:999"}, headers=headers).status_code == 404,
            )
            check(
                "reject self relation",
                client.post(create_path, json={**create_body, "to": "item:1"}, headers=headers).status_code == 400,
            )
            check(
                "reject empty evidence",
                client.post(create_path, json={**create_body, "evidence": []}, headers=headers).status_code == 400,
            )
            check(
                "reject invalid confidence",
                client.post(create_path, json={**create_body, "confidence": "not-a-number"}, headers=headers).status_code == 400,
            )
            check(
                "reject invalid relation type",
                client.post(create_path, json={**create_body, "relation_type": "mystery"}, headers=headers).status_code == 400,
            )

            created = client.post(create_path, json=create_body, headers=headers)
            check("create relation", created.status_code == 200, created.get_data(as_text=True))
            association = created.get_json()["association"]
            association_id = association["id"]
            check("create preserves status", association["status"] == "pending", str(association))
            check("create preserves evidence", association["evidence"] == evidence, str(association))

            duplicate = client.post(
                create_path,
                json={**create_body, "from": "task:1", "to": "item:1"},
                headers=headers,
            )
            check("reject reverse duplicate", duplicate.status_code == 409, duplicate.get_data(as_text=True))

            graph = client.get("/api/atlas/graph", headers=headers).get_json()
            semantic = [edge for edge in graph["edges"] if edge["edge_class"] == "semantic"]
            check("graph exposes relation", len(semantic) == 1, str(semantic))
            check("graph exposes status", semantic[0]["status"] == "pending", str(semantic[0]))
            check("graph exposes structured evidence", semantic[0]["evidence_items"] == evidence, str(semantic[0]))

            updated_evidence = [{"type": "manual_note", "excerpt": "任务由这条记录明确派生", "weight": 0.88}]
            updated = client.put(
                f"/cosmos/associations/{association_id}",
                json={
                    "relation_type": "supports",
                    "confidence": 0.88,
                    "evidence": updated_evidence,
                },
                headers=headers,
            )
            check("update relation", updated.status_code == 200, updated.get_data(as_text=True))
            updated_payload = updated.get_json()["association"]
            check("update fields", updated_payload["relation_type"] == "supports", str(updated_payload))
            check("update evidence", updated_payload["evidence"] == updated_evidence, str(updated_payload))
            check(
                "reject clearing evidence",
                client.put(f"/cosmos/associations/{association_id}", json={"evidence": []}, headers=headers).status_code == 400,
            )
            check(
                "reject empty update",
                client.put(f"/cosmos/associations/{association_id}", json={}, headers=headers).status_code == 400,
            )

            reviewed = client.post(
                f"/cosmos/associations/{association_id}/review",
                json={"status": "accepted"},
                headers=headers,
            )
            check("accept pending relation", reviewed.status_code == 200, reviewed.get_data(as_text=True))
            check("accepted status", reviewed.get_json()["association"]["status"] == "accepted")

            conn = get_db_connection()
            try:
                conn.execute(
                    """
                    INSERT INTO associations (
                        id, from_kind, from_id, to_kind, to_id, relation_type,
                        confidence, status, evidence, created_at
                    ) VALUES ('NO_EVIDENCE', 'memory', '1', 'task', '1', 'supports', 0.95, 'accepted', NULL, datetime('now'))
                    """
                )
                conn.commit()
            finally:
                conn.close()

            graph = client.get("/api/atlas/graph", headers=headers).get_json()
            semantic_ids = {edge["id"] for edge in graph["edges"] if edge["edge_class"] == "semantic"}
            check("evidence-free relation hidden", "assoc:NO_EVIDENCE" not in semantic_ids, str(semantic_ids))
            check("hidden edge counted", graph["view"]["hidden_edges"] >= 1, str(graph["view"]))

            deleted = client.delete(f"/cosmos/associations/{association_id}", headers=headers)
            check("delete relation", deleted.status_code == 200, deleted.get_data(as_text=True))
            check(
                "delete is durable",
                client.delete(f"/cosmos/associations/{association_id}", headers=headers).status_code == 404,
            )

        normalized = _normalize_llm_results(
            [
                {"pair_index": 1, "relation_type": "causal", "confidence": 1.4, "evidence": "第二批第一对"},
                {"pair_index": 2, "relation_type": "none", "confidence": 0, "evidence": ""},
                {"pair_index": 3, "relation_type": "supports", "confidence": 0.9, "evidence": "越界类型"},
            ],
            batch_start=20,
            batch_size=3,
        )
        check("batch index remains global", normalized[0]["candidate_index"] == 20, str(normalized))
        check("generated confidence clamped", normalized[0]["confidence"] == 1.0, str(normalized))
        check("weak llm results discarded", len(normalized) == 1, str(normalized))

        conn = get_db_connection()
        try:
            actions = {
                row["action"]
                for row in conn.execute(
                    "SELECT action FROM audit_log WHERE target_type = 'association'"
                ).fetchall()
            }
        finally:
            conn.close()
        check(
            "relationship mutations audited",
            {"association_create", "association_update", "association_review", "association_delete"} <= actions,
            str(actions),
        )

        print("all checks passed")


if __name__ == "__main__":
    main()
