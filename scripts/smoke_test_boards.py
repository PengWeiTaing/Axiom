"""Smoke test for Learning Board v0.1 API."""
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
    with tempfile.TemporaryDirectory(prefix="axiom_board_") as temp_dir:
        os.environ["AXIOM_ROOT"] = temp_dir
        os.environ["AXIOM_SECRET_KEY"] = "test-key"
        os.environ["AXIOM_LOG_PATH"] = ""

        from core._common import app, get_db_connection, init_app_storage
        from core.routes.boards import register_routes

        app.config["TESTING"] = True
        init_app_storage()
        register_routes(app)

        conn = get_db_connection()
        try:
            from core.boards.schema import ensure_board_tables
            ensure_board_tables(conn)
        finally:
            conn.close()

        client = app.test_client()
        headers = {"X-Axiom-Key": "test-key"}

        # 1. List boards (empty)
        resp = client.get("/api/learning/boards", headers=headers)
        check("list empty", resp.status_code == 200, f"got {resp.status_code}")
        data = resp.get_json()
        check("list empty body", isinstance(data.get("boards"), list), str(data))
        check("zero boards", len(data["boards"]) == 0, str(len(data["boards"])))

        # 2. Create board manually (without AI)
        resp = client.post(
            "/api/learning/boards",
            headers=headers,
            json={
                "title": "Smoke Test Board",
                "source_type": "manual",
                "widgets": [
                    {
                        "id": "w_test",
                        "type": "quiz_card",
                        "spec_version": "1.0.0",
                        "title": "Smoke Quiz",
                        "input": {
                            "items": [{
                                "id": "q1",
                                "kind": "single_choice",
                                "prompt": "2+2=?",
                                "options": ["3", "4", "5"],
                                "answer": "4",
                                "concept_refs": ["math.addition"],
                            }],
                            "scoring": {"mode": "deterministic"},
                        },
                        "state": {},
                        "security": "pure_client",
                        "writeback": ["mastery", "review"],
                    }
                ],
                "nodes": [{
                    "widget_id": "w_test",
                    "x": 100, "y": 100, "w": 400, "h": 300,
                    "size_family": "M",
                }],
            },
        )
        check("create board", resp.status_code == 201, f"got {resp.status_code}: {resp.get_data(as_text=True)}")
        create_data = resp.get_json()
        board_id = create_data.get("board_id", "")
        check("board_id returned", bool(board_id), str(create_data))

        # 3. GET board
        resp = client.get(f"/api/learning/boards/{board_id}", headers=headers)
        check("get board", resp.status_code == 200, f"got {resp.status_code}")
        board_data = resp.get_json()
        check("board title", board_data["board"]["title"] == "Smoke Test Board")
        check("widgets count", len(board_data.get("widgets", [])) == 1)
        check("nodes count", len(board_data.get("nodes", [])) == 1)

        # 4. Save layout
        resp = client.patch(
            f"/api/learning/boards/{board_id}/layout",
            headers=headers,
            json={"updates": [{"widget_id": "w_test", "x": 200, "y": 200, "w": 500, "h": 400}]},
        )
        check("save layout", resp.status_code == 200, f"got {resp.status_code}")

        # 5. Post widget event
        resp = client.post(
            "/api/learning/widgets/w_test/event",
            headers=headers,
            json={
                "event_type": "answer_submitted",
                "idempotency_key": "evt_smoke_001",
                "payload": {
                    "question_id": "q1",
                    "selected": "4",
                    "correct": True,
                    "attempt_index": 1,
                    "latency_ms": 2500,
                    "hint_used": False,
                    "confidence": 0.9,
                    "concept_refs": ["math.addition"],
                },
            },
        )
        check("post event", resp.status_code == 200, f"got {resp.status_code}: {resp.get_data(as_text=True)}")
        event_data = resp.get_json()
        check("event accepted", event_data.get("accepted") is True, str(event_data))
        check("mastery delta", event_data.get("mastery_delta") is not None, str(event_data))

        # 6. Review queue
        resp = client.get("/api/learning/reviews/queue", headers=headers)
        check("review queue", resp.status_code == 200, f"got {resp.status_code}")
        queue = resp.get_json()
        check("has items", len(queue.get("items", [])) > 0, str(queue))

        # 7. Board search
        resp = client.get(f"/api/learning/boards/{board_id}/search?q=quiz", headers=headers)
        check("search", resp.status_code == 200, f"got {resp.status_code}")
        search = resp.get_json()
        check("search hits", len(search.get("hits", [])) > 0, str(search))

        # 8. List boards (now has 1)
        resp = client.get("/api/learning/boards", headers=headers)
        check("list with items", resp.status_code == 200)
        data = resp.get_json()
        check("one board", len(data["boards"]) == 1, str(len(data["boards"])))

        # 9. Delete board
        resp = client.delete(f"/api/learning/boards/{board_id}", headers=headers)
        check("delete board", resp.status_code == 200, f"got {resp.status_code}")

        # 10. Verify deleted
        resp = client.get(f"/api/learning/boards/{board_id}", headers=headers)
        check("board gone", resp.status_code == 404, f"got {resp.status_code}")

        print("OK: All Learning Board smoke tests passed.")


if __name__ == "__main__":
    main()
