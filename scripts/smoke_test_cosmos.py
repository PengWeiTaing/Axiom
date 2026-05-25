"""冒烟测试 — GET /cosmos

覆盖率:
  1. 无 key → 401
  2. 空库 → 200 + 空数组 + root/schema_version 正确
  3. 种子 lifeline + task + association → 三个数组各 1 条，字段齐
  4. 未标 lifeline_id 的 task 不出现在 entities
"""

import os
import sys

# 确保能找到 core 模块
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from core._common import app, init_app_storage, get_db_connection
from core.routes.cosmos import register_routes as register_cosmos

# 确保表/列初始化完成
init_app_storage()
# 注册 cosmos 路由（测试不走 receiver.py 的模块级注册）
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
        return client.get(path, headers={"X-Axiom-Key": AXIOM_KEY})

def req_no_key(path: str):
    with app.test_client() as client:
        return client.get(path)

# ---- 1. 无 key → 403（Axiom 统一 auth 错误码） ----
resp = req_no_key("/cosmos")
check("403 without key", resp.status_code == 403, f"got {resp.status_code}")

# ---- 2. 空库 → 200 ----
# 先清理可能残留的种子数据（前次运行可能中断在 seed 阶段）
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

resp = req("/cosmos")
check("200 with empty db", resp.status_code == 200, f"got {resp.status_code}")
data = resp.get_json()
check("ok is true", data.get("ok") is True)

root = data.get("root")
check("root present", root is not None)
check("root.id = ROOT", root.get("id") == "ROOT")
check("root.name = 我", root.get("name") == "我")

check("schema_version = 0.1", data.get("schema_version") == "0.1")
check("lifelines empty", data.get("lifelines") == [])
check("entities empty", data.get("entities") == [])
check("associations empty", data.get("associations") == [])

# ---- 3. 种子数据 ----
# lifeline_id 列存 raw 值（外键引用 lifelines.id），endpoint 输出时加前缀
conn = get_db_connection()
try:
    conn.execute(
        "INSERT INTO lifelines (id, name, parent_id, order_index) VALUES (?, ?, ?, ?)",
        ("L1", "课业", None, 1),
    )
    conn.execute(
        "INSERT INTO items (type, content, source, created_at, lifeline_id) VALUES (?, ?, ?, datetime('now'), ?)",
        ("text", "一道不会的题", "web_app", "L1"),
    )
    conn.execute(
        "INSERT INTO tasks (title, priority, status, created_at, updated_at, lifeline_id) VALUES (?, ?, ?, datetime('now'), datetime('now'), ?)",
        ("写完作业", "high", "todo", "L1"),
    )
    conn.execute(
        "INSERT INTO associations (id, from_kind, from_id, to_kind, to_id, relation_type, confidence, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        ("A1", "task", "1", "item", "1", "co_occurrence", 0.82, "accepted"),
    )
    # 种子一条没标 lifeline_id 的 item（不应出现在 entities）
    conn.execute(
        "INSERT INTO items (type, content, source, created_at) VALUES (?, ?, ?, datetime('now'))",
        ("text", "一条普通笔记", "web_app"),
    )
    conn.commit()
finally:
    conn.close()

resp = req("/cosmos")
check("seed: 200", resp.status_code == 200)
data = resp.get_json()

check("seed: lifelines=1", len(data.get("lifelines", [])) == 1, f"got {len(data.get('lifelines', []))}")

lifeline = data["lifelines"][0]
check("seed: lifeline.id", lifeline["id"] == "lifeline:L1", f"got {lifeline['id']}")
check("seed: lifeline.name", lifeline["name"] == "课业")
check("seed: lifeline.parent_id = ROOT", lifeline["parent_id"] == "ROOT")

entities = data.get("entities", [])
# 应该有 2 条：1 个 item + 1 个 task，都有 lifeline_id
# 另一条 item 没标 lifeline_id，不应出现
check("seed: entities=2", len(entities) == 2, f"got {len(entities)}")

entity_ids = [e["id"] for e in entities]
check("seed: item present", any(e.startswith("item:") for e in entity_ids))
check("seed: task present", any(e.startswith("task:") for e in entity_ids))
check("seed: entity lifeline_id prefixed", all(
    e.get("lifeline_id", "").startswith("lifeline:") for e in entities
), f"raw values: {[e.get('lifeline_id') for e in entities]}")
check("seed: no unmarked item", not any(
    e.get("title") == "一条普通笔记" for e in entities
), "unmarked item leaked into entities")

associations = data.get("associations", [])
check("seed: associations=1", len(associations) == 1, f"got {len(associations)}")
if associations:
    a = associations[0]
    check("seed: assoc.from prefixed", a["from"].startswith("task:"))
    check("seed: assoc.to prefixed", a["to"].startswith("item:"))

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
