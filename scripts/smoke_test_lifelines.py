"""冒烟测试 — Lifeline CRUD + Entity 挂载

覆盖率:
  1. 无 key → 403
  2. 创建 lifeline → 200 + 返回带前缀 ID
  3. 创建重复 id → 400
  4. 创建空 name → 400
  5. 创建无效 parent_id → 400
  6. 更新 lifeline → 200 + 字段变更
  7. 更新不存在的 lifeline → 404
  8. 挂载 entity → 200 + lifeline_id 正确
  9. 挂载到不存在的 lifeline → 400
  10. 挂载不存在的 entity → 404
  11. 卸载 entity (lifeline_id: null) → 200
  12. 删除 lifeline → 200 + 副作用
  13. 无效 kind → 400
"""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from core._common import app, init_app_storage, get_db_connection
from core.routes.lifelines import register_routes

init_app_storage()
register_routes(app)

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


def req(method: str, path: str, json_body: dict | None = None):
    with app.test_client() as client:
        kwargs = {"headers": {"X-Axiom-Key": AXIOM_KEY}}
        if json_body is not None:
            kwargs["json"] = json_body
        return getattr(client, method.lower())(path, **kwargs)


def req_no_key(method: str, path: str, json_body: dict | None = None):
    with app.test_client() as client:
        kwargs = {}
        if json_body is not None:
            kwargs["json"] = json_body
        return getattr(client, method.lower())(path, **kwargs)


# ---- 前置清理 ----
cleanup_conn = get_db_connection()
try:
    cleanup_conn.execute("DELETE FROM tasks")
    cleanup_conn.execute("DELETE FROM items")
    cleanup_conn.execute("DELETE FROM memories")
    cleanup_conn.execute("DELETE FROM decisions")
    cleanup_conn.execute("DELETE FROM lifelines")
    cleanup_conn.execute("DELETE FROM sqlite_sequence WHERE name IN ('items', 'tasks')")
    cleanup_conn.commit()
finally:
    cleanup_conn.close()

# ---- 种子数据 ----
conn = get_db_connection()
try:
    conn.execute(
        "INSERT INTO items (type, content, source, created_at) VALUES (?, ?, ?, datetime('now'))",
        ("text", "一条测试笔记", "web_app"),
    )
    item_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    conn.execute(
        "INSERT INTO tasks (title, priority, status, created_at, updated_at) VALUES (?, ?, ?, datetime('now'), datetime('now'))",
        ("测试任务", "medium", "todo"),
    )
    task_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    conn.commit()
finally:
    conn.close()

# ---- 1. 无 key → 403 ----
resp = req_no_key("post", "/lifelines", {"id": "t1", "name": "Test"})
check("403 without key", resp.status_code == 403, f"got {resp.status_code}")

# ---- 2. 创建 lifeline → 200 ----
resp = req("post", "/lifelines", {"id": "alpha", "name": "Alpha 测试", "parent_id": "ROOT"})
check("create: 200", resp.status_code == 200, f"got {resp.status_code}")
data = resp.get_json()
check("create: ok", data.get("ok") is True)
check("create: id prefixed", data["lifeline"]["id"] == "lifeline:alpha",
      f"got {data['lifeline']['id']}")
check("create: parent_id ROOT", data["lifeline"]["parent_id"] == "ROOT",
      f"got {data['lifeline']['parent_id']}")
check("create: order_index", data["lifeline"]["order_index"] == 0)

# 创建子 lifeline
resp = req("post", "/lifelines", {"id": "beta", "name": "Beta 子", "parent_id": "alpha"})
check("create child: 200", resp.status_code == 200)
check("create child: parent_id", resp.get_json()["lifeline"]["parent_id"] == "lifeline:alpha")

# 创建 parent_id 不传（默认 null = ROOT）
resp = req("post", "/lifelines", {"id": "gamma", "name": "Gamma"})
check("create no parent: 200", resp.status_code == 200)
check("create no parent: ROOT", resp.get_json()["lifeline"]["parent_id"] == "ROOT")

# ---- 3. 创建重复 id → 400 ----
resp = req("post", "/lifelines", {"id": "alpha", "name": "Dup"})
check("duplicate id: 400", resp.status_code == 400, f"got {resp.status_code}")
err = resp.get_json()
check("duplicate id: error code", err.get("error", {}).get("code") == "duplicate_id", f"got {err}")

# ---- 4. 创建空 name → 400 ----
resp = req("post", "/lifelines", {"id": "empty_name", "name": "   "})
check("empty name: 400", resp.status_code == 400, f"got {resp.status_code}")
check("empty name: error code", resp.get_json().get("error", {}).get("code") == "invalid_name", f"got {resp.get_json()}")

# ---- 5. 创建无效 parent_id → 400 ----
resp = req("post", "/lifelines", {"id": "bad_parent", "name": "Bad", "parent_id": "nonexist"})
check("bad parent: 400", resp.status_code == 400, f"got {resp.status_code}")
check("bad parent: error code", resp.get_json().get("error", {}).get("code") == "parent_not_found", f"got {resp.get_json()}")

# ---- 6. 更新 lifeline → 200 ----
resp = req("put", "/lifelines/alpha", {"name": "Alpha 改名"})
check("update: 200", resp.status_code == 200)
check("update: name changed", resp.get_json()["lifeline"]["name"] == "Alpha 改名")

resp = req("put", "/lifelines/alpha", {"order_index": 5})
check("update: order_index", resp.get_json()["lifeline"]["order_index"] == 5)

# ---- 7. 更新不存在的 lifeline → 404 ----
resp = req("put", "/lifelines/noexist", {"name": "X"})
check("update nonexist: 404", resp.status_code == 404, f"got {resp.status_code}")

# ---- 8. 挂载 entity → 200 ----
resp = req("put", f"/cosmos/entities/item/{item_id}/lifeline", {"lifeline_id": "alpha"})
check("mount: 200", resp.status_code == 200, f"got {resp.status_code}")
edata = resp.get_json()
check("mount: ok", edata.get("ok") is True)
check("mount: entity id", edata["entity"]["id"] == f"item:{item_id}")
check("mount: lifeline_id", edata["entity"]["lifeline_id"] == "lifeline:alpha")

resp = req("put", f"/cosmos/entities/task/{task_id}/lifeline", {"lifeline_id": "alpha"})
check("mount task: 200", resp.status_code == 200)
check("mount task: lifeline_id", resp.get_json()["entity"]["lifeline_id"] == "lifeline:alpha")

# ---- 9. 挂载到不存在的 lifeline → 400 ----
resp = req("put", f"/cosmos/entities/item/{item_id}/lifeline", {"lifeline_id": "noexist"})
check("mount bad lifeline: 400", resp.status_code == 400, f"got {resp.status_code}")

# ---- 10. 挂载不存在的 entity → 404 ----
resp = req("put", "/cosmos/entities/task/9999/lifeline", {"lifeline_id": "alpha"})
check("mount bad entity: 404", resp.status_code == 404, f"got {resp.status_code}")

# ---- 11. 卸载 entity → 200 ----
resp = req("put", f"/cosmos/entities/item/{item_id}/lifeline", {"lifeline_id": None})
check("unmount: 200", resp.status_code == 200)
check("unmount: lifeline_id null", resp.get_json()["entity"]["lifeline_id"] is None)

# ---- 12. 删除 lifeline → 200 + 副作用 ----
# 先重新挂载一个 entity 确认卸载副作用
resp = req("put", f"/cosmos/entities/task/{task_id}/lifeline", {"lifeline_id": "alpha"})
check("re-mount for delete test: 200", resp.status_code == 200)

resp = req("delete", "/lifelines/alpha")
check("delete: 200", resp.status_code == 200, f"got {resp.status_code}")
ddata = resp.get_json()
check("delete: ok", ddata.get("ok") is True)
check("delete: unmounted_entities", ddata.get("unmounted_entities", 0) >= 1,
      f"got {ddata.get('unmounted_entities')}")
check("delete: reparented_children", ddata.get("reparented_children", 0) >= 1,
      f"got {ddata.get('reparented_children')}")

# 验证子 lifeline 被提升（parent_id = NULL）
conn = get_db_connection()
try:
    beta_row = conn.execute("SELECT parent_id FROM lifelines WHERE id = 'beta'").fetchone()
    check("reparent: beta parent_id NULL", beta_row is not None and beta_row["parent_id"] is None,
          f"got {beta_row['parent_id'] if beta_row else 'not found'}")
finally:
    conn.close()

# 验证 entity 被卸载
conn = get_db_connection()
try:
    task_row = conn.execute("SELECT lifeline_id FROM tasks WHERE id = ?", (task_id,)).fetchone()
    check("unmount: task lifeline_id NULL", task_row is not None and task_row["lifeline_id"] is None,
          f"got {task_row['lifeline_id'] if task_row else 'not found'}")
finally:
    conn.close()

# ---- 13. 无效 kind → 400 ----
resp = req("put", "/cosmos/entities/note/1/lifeline", {"lifeline_id": "gamma"})
check("invalid kind: 400", resp.status_code == 400)

# ---- 14. 删除不存在的 lifeline → 404 ----
resp = req("delete", "/lifelines/noexist")
check("delete nonexist: 404", resp.status_code == 404, f"got {resp.status_code}")

# ---- 15. 无效 id 格式 → 400 ----
resp = req("post", "/lifelines", {"id": "has space", "name": "Bad ID"})
check("invalid id: 400", resp.status_code == 400, f"got {resp.status_code}")

# ---- 16. PUT 自身 parent → 400 ----
resp = req("put", "/lifelines/gamma", {"parent_id": "gamma"})
check("self-parent: 400", resp.status_code == 400, f"got {resp.status_code}")

# ---- 清理 ----
conn = get_db_connection()
try:
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
