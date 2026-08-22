"""Offline smoke test for DeepSeek V4 routing and reversible suggestions."""
from __future__ import annotations

import json
import os
import sys
import tempfile
from pathlib import Path
from types import SimpleNamespace


REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))


def check(name: str, ok: bool, detail: str = "") -> None:
    if not ok:
        raise AssertionError(f"{name}: {detail}")


class FakeCompletions:
    def __init__(self) -> None:
        self.kwargs = None

    def create(self, **kwargs):
        self.kwargs = kwargs
        content = json.dumps(
            {
                "rationale": "先确认输入边界，再验证完整流程。",
                "steps": [
                    {"title": "确认输入边界", "estimated_minutes": 15},
                    {"title": "验证完整流程", "estimated_minutes": 20},
                ],
            },
            ensure_ascii=False,
        )
        return SimpleNamespace(
            choices=[SimpleNamespace(message=SimpleNamespace(content=content))]
        )


class FakeClient:
    def __init__(self) -> None:
        self.chat = SimpleNamespace(completions=FakeCompletions())


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="axiom_deepseek_v4_") as temp_dir:
        os.environ["AXIOM_ROOT"] = temp_dir
        os.environ["AXIOM_SECRET_KEY"] = "test-key"
        os.environ["AXIOM_LOG_PATH"] = ""
        os.environ.pop("AXIOM_DEEPSEEK_MODEL", None)
        os.environ.pop("AXIOM_DEEPSEEK_REASONING_MODEL", None)

        from core.config import (  # noqa: WPS433
            DEEPSEEK_FAST_EXTRA_BODY,
            DEEPSEEK_MODEL,
            DEEPSEEK_REASONING_MODEL,
            _deepseek_model,
        )
        from core.database import get_db_connection, init_app_storage  # noqa: WPS433
        from core.task_decomposition_ai import (  # noqa: WPS433
            generate_task_decomposition_suggestion,
        )

        check("fast model default", DEEPSEEK_MODEL == "deepseek-v4-flash", DEEPSEEK_MODEL)
        check(
            "reasoning model default",
            DEEPSEEK_REASONING_MODEL == "deepseek-v4-pro",
            DEEPSEEK_REASONING_MODEL,
        )
        check(
            "fast mode disables thinking",
            DEEPSEEK_FAST_EXTRA_BODY == {"thinking": {"type": "disabled"}},
            str(DEEPSEEK_FAST_EXTRA_BODY),
        )
        os.environ["AXIOM_DEEPSEEK_MODEL"] = "deepseek-chat"
        os.environ["AXIOM_DEEPSEEK_REASONING_MODEL"] = "deepseek-reasoner"
        check(
            "legacy fast alias",
            _deepseek_model("AXIOM_DEEPSEEK_MODEL", "deepseek-v4-flash")
            == "deepseek-v4-flash",
        )
        check(
            "legacy reasoning alias",
            _deepseek_model("AXIOM_DEEPSEEK_REASONING_MODEL", "deepseek-v4-pro")
            == "deepseek-v4-pro",
        )
        os.environ.pop("AXIOM_DEEPSEEK_MODEL", None)
        os.environ.pop("AXIOM_DEEPSEEK_REASONING_MODEL", None)
        init_app_storage()

        conn = get_db_connection()
        try:
            now = "2026-08-22T09:00:00+00:00"
            conn.execute(
                "INSERT INTO lifelines (id, name, parent_id, order_index) VALUES ('product', 'Axiom 产品', NULL, 1)"
            )
            cursor = conn.execute(
                """
                INSERT INTO tasks (
                    title, detail, status, priority, due_date,
                    estimated_minutes, created_at, updated_at, lifeline_id
                ) VALUES (?, ?, 'todo', 'high', '2026-08-24', 90, ?, ?, 'product')
                """,
                ("完成可撤回拆解候选", "保持来源并由用户确认", now, now),
            )
            task_id = int(cursor.lastrowid)
            conn.execute(
                """
                INSERT INTO weekly_reviews (
                    week_start, decomposition_fit, reflection,
                    reviewed_at, created_at, updated_at
                ) VALUES ('2026-08-17', 'too_coarse', '上周步骤仍然偏大', ?, ?, ?)
                """,
                (now, now, now),
            )
            conn.commit()

            fake_client = FakeClient()
            suggestion = generate_task_decomposition_suggestion(
                conn,
                task_id,
                client=fake_client,
            )
            kwargs = fake_client.chat.completions.kwargs
            check("V4 Pro used", kwargs["model"] == "deepseek-v4-pro", str(kwargs))
            check(
                "thinking enabled",
                kwargs["extra_body"] == {"thinking": {"type": "enabled"}},
                str(kwargs),
            )
            check("thinking effort", kwargs["reasoning_effort"] == "high", str(kwargs))
            check("JSON mode", kwargs["response_format"] == {"type": "json_object"}, str(kwargs))
            check("review reaches prompt", "too_coarse" in kwargs["messages"][1]["content"])
            check("two suggestions", len(suggestion["steps"]) == 2, str(suggestion))
            check("scope is reversible", "确认后才创建" in suggestion["scope"], str(suggestion))
            task_count = int(conn.execute("SELECT COUNT(*) FROM tasks").fetchone()[0])
            link_count = int(conn.execute("SELECT COUNT(*) FROM task_decomposition_links").fetchone()[0])
            check("suggestion does not persist tasks", task_count == 1, str(task_count))
            check("suggestion does not persist links", link_count == 0, str(link_count))
        finally:
            conn.close()

    print("DeepSeek V4 smoke test passed")


if __name__ == "__main__":
    main()
