"""冒烟测试 — POST /cosmos/associations/generate

覆盖率:
  1. 无 key → 403
  2. dry_run → 200 + 返回候选对列表（不调 LLM）
  3. 种子 lifeline + 2 entity → 候选对生成正确（score_breakdown 三个分量都有）
  4. 已有 association 的去重 → skipped_existing = 1
  5. 没标 lifeline_id 的 entity 不出现在候选对中
  6. 未配置 AI key 时非 dry_run → 503
"""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from core._common import app, init_app_storage, get_db_connection
from core.routes.cosmos_associations import register_routes

init_app_storage()
register_cosmos = register_routes
register_cosmos(app)

AXIOM_KEY = os.environ.get("AXIOM_SECRET_KEY", os.environ.get("AXIOM_KEY", "axiom123"))

passed = 0
failed = 0


def check(name: str, ok: bool, detail: str = ""):
    global passed, failed
    if ok:
        passed += 1
    else:
        failed += 1
        print(f"  FAIL [{name}] {detail}")


def req(path: str):
    with app.test_client() as client:
        return client.post(path, headers={"X-Axiom-Key": AXIOM_KEY})


def req_no_key(path: str):
    with app.test_client() as client:
        return client.post(path)


# ---- 前置清理 ----
cleanup_conn = get_db_connection()
try:
    cleanup_conn.execute("DELETE FROM associations")
    cleanup_conn.execute("DELETE FROM tasks")
    cleanup_conn.execute("DELETE FROM memories")
    cleanup_conn.execute("DELETE FROM items")
    cleanup_conn.execute("DELETE FROM lifelines")
    cleanup_conn.execute("DELETE FROM sqlite_sequence WHERE name IN ('items', 'tasks')")
    cleanup_conn.commit()
finally:
    cleanup_conn.close()

# ---- 1. 无 key → 403 ----
resp = req_no_key("/cosmos/associations/generate")
check("403 without key", resp.status_code == 403, f"got {resp.status_code}")

# ---- 2. dry_run → 200 + 空候选 ----
resp = req("/cosmos/associations/generate?dry_run=true")
check("dry_run: 200", resp.status_code == 200, f"got {resp.status_code}")
data = resp.get_json()
check("dry_run: ok", data.get("ok") is True)
check("dry_run: candidates_found=0", data.get("candidates_found") == 0, f"got {data.get('candidates_found')}")

# ---- 3. 种子数据 + 候选生成 ----
conn = get_db_connection()
try:
    conn.execute(
        "INSERT INTO lifelines (id, name, parent_id, order_index) VALUES (?, ?, ?, ?)",
        ("L1", "课业", None, 1),
    )
    conn.execute(
        "INSERT INTO items (type, content, source, created_at, lifeline_id) VALUES (?, ?, ?, datetime('now', '-2 hours'), ?)",
        ("text", "一道不会的数学题，求极限", "web_app", "L1"),
    )
    conn.execute(
        "INSERT INTO tasks (title, priority, status, created_at, updated_at, lifeline_id) VALUES (?, ?, ?, datetime('now', '-3 hours'), datetime('now'), ?)",
        ("做完数学作业，重点是极限章节", "high", "todo", "L1"),
    )
    # 没标 lifeline_id 的 entity（不应出现）
    conn.execute(
        "INSERT INTO items (type, content, source, created_at) VALUES (?, ?, ?, datetime('now'))",
        ("text", "一条游离的笔记", "web_app"),
    )
    conn.commit()
finally:
    conn.close()

resp = req("/cosmos/associations/generate?dry_run=true&max_candidates=10")
check("seed dry_run: 200", resp.status_code == 200)
data = resp.get_json()

candidates = data.get("candidates", [])
check("seed: 1 candidate", len(candidates) == 1,
      f"got {len(candidates)}: {[c.get('entity_a',{}).get('title') for c in candidates]}")

if candidates:
    c = candidates[0]
    check("seed: entity_a.id prefixed", c["entity_a"]["id"].startswith("item:")
          or c["entity_a"]["id"].startswith("task:"))
    check("seed: entity_b.id prefixed", c["entity_b"]["id"].startswith("item:")
          or c["entity_b"]["id"].startswith("task:"))
    check("seed: score >= 0.5", c["score"] >= 0.5, f"got {c['score']}")
    bd = c.get("score_breakdown", {})
    check("seed: lifeline base", bd.get("lifeline") == 0.3, f"got {bd.get('lifeline')}")
    check("seed: temporal score", isinstance(bd.get("temporal"), (int, float)), f"got {bd.get('temporal')}")
    check("seed: keyword score", isinstance(bd.get("keyword"), (int, float)), f"got {bd.get('keyword')}")

# 验证未标 lifeline_id 的 entity 不出现在候选对
all_titles = [
    c["entity_a"]["title"] for c in candidates
] + [
    c["entity_b"]["title"] for c in candidates
]
check("seed: no unmarked entity", "一条游离的笔记" not in all_titles,
      "unmarked entity leaked into candidates")

# ---- 4. 503 when no AI key（在去重测试前，此时还有候选对）----
import core._common as _c
import core.routes.cosmos_associations as _ca
saved = _c.DEEPSEEK_API_KEY
_c.DEEPSEEK_API_KEY = ""
_ca.DEEPSEEK_API_KEY = ""
resp = req("/cosmos/associations/generate?max_candidates=1")
check("503 without AI key", resp.status_code == 503, f"got {resp.status_code}")
_c.DEEPSEEK_API_KEY = saved
_ca.DEEPSEEK_API_KEY = saved

# ---- 5. 去重 ----
conn = get_db_connection()
try:
    conn.execute(
        "INSERT INTO associations (id, from_kind, from_id, to_kind, to_id, relation_type, confidence, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        ("A_DEDUP", "item", "1", "task", "1", "co_occurrence", 0.5, "pending"),
    )
    conn.commit()
finally:
    conn.close()

resp = req("/cosmos/associations/generate?dry_run=true&max_candidates=10")
data = resp.get_json()
check("dedup: skipped_existing=1", data.get("skipped_existing") == 1,
      f"got {data.get('skipped_existing')}")
check("dedup: candidates_found=0", data.get("candidates_found") == 0,
      f"got {data.get('candidates_found')}")

# ---- 清理 ----
conn = get_db_connection()
try:
    conn.execute("DELETE FROM associations")
    conn.execute("DELETE FROM tasks")
    conn.execute("DELETE FROM items")
    conn.execute("DELETE FROM lifelines")
    conn.execute("DELETE FROM sqlite_sequence WHERE name IN ('items', 'tasks')")
    conn.commit()
finally:
    conn.close()

# ---- 总结 ----
print()
if failed:
    print(f"[FAIL] {failed}/{passed + failed} checks failed")
    sys.exit(1)
else:
    print(f"all checks passed ({passed} tests)")
