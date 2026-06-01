"""Seed local Atlas demo data.

The script is idempotent: it removes rows previously created with the
`atlas_demo` marker, then inserts a small graph-shaped dataset for UI work.
"""
from __future__ import annotations

import json
import os
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

os.environ.setdefault("AXIOM_ROOT", str(REPO_ROOT))
os.environ.setdefault("AXIOM_LOG_PATH", "")

from core._common import cjk_tokenize, get_db_connection, init_app_storage  # noqa: E402


SOURCE = "atlas_demo"
LIFELINES = [
    ("demo_axiom", "Axiom 开发", 10),
    ("demo_learning", "Rust 学习", 20),
    ("demo_health", "健康管理", 30),
    ("demo_finance", "财务整理", 40),
    ("demo_creative", "创作输出", 50),
]


def iso(days_ago: int, hour: int = 8) -> str:
    value = datetime.now(timezone.utc) - timedelta(days=days_ago)
    return value.replace(hour=hour, minute=0, second=0, microsecond=0).isoformat(timespec="seconds")


ITEMS = [
    (
        "atlas_spec",
        "demo_axiom",
        "Atlas v1 的全局图不直接铺满所有原始记录，而是先显示 root / lifeline / cluster / representative leaf。",
        1,
    ),
    (
        "atlas_edges",
        "demo_axiom",
        "结构边只表达包含关系；语义边必须有证据、强度和关系类型，默认过滤低置信边。",
        1,
    ),
    (
        "atlas_playwright",
        "demo_axiom",
        "前端开发过程中要用 Playwright 打开真实页面，边看布局边修交互，避免只停留在代码上。",
        0,
    ),
    ("rust_book", "demo_learning", "本周 Rust 重点：所有权、借用、生命周期，先用小练习建立手感。", 2),
    ("rust_project", "demo_learning", "用一个小 CLI 把学习笔记转成 Markdown 索引，练习 error handling 和模块拆分。", 1),
    ("health_training", "demo_health", "训练计划：每周三次力量，两次低强度有氧，记录睡眠和疲劳感。", 3),
    ("health_food", "demo_health", "饮食记录显示晚餐蛋白质偏低，第二天容易饿，需要提前准备高蛋白选项。", 2),
    ("finance_cashflow", "demo_finance", "月度现金流需要分成固定支出、弹性消费、投资和一次性支出四类。", 4),
    ("finance_subs", "demo_finance", "订阅服务里有两个低频工具可以暂停，先观察一个月再决定是否恢复。", 1),
    ("creative_video", "demo_creative", "下一条视频想讲个人知识系统，核心画面可以从 Capture 到 Atlas 的视角切换开始。", 3),
    ("creative_article", "demo_creative", "文章草稿主题：为什么外脑不是资料库，而是能被回看的行动上下文。", 1),
]

MEMORIES = [
    ("prefer_3d", "preference", "我更喜欢 Atlas 保留空间感和 3D 视觉。", "Atlas 的宏观视图应该是认知地图的空间层次，而不是天文星图隐喻。", "confirmed", "demo_axiom", 0),
    ("dev_loop", "preference", "Axiom 前端开发需要边跑页面边调。", "每次视觉和布局变化都要用 Playwright 看桌面和移动端。", "confirmed", "demo_axiom", 0),
    ("rust_goal", "goal", "Rust 学习目标是能独立写一个可维护的小工具。", "先完成 CLI，再补测试和错误处理。", "confirmed", "demo_learning", 1),
    ("health_pattern", "fact", "晚睡会显著影响第二天训练表现。", "连续两次低睡眠日训练表现下降，需优先保护睡眠。", "candidate", "demo_health", 2),
    ("finance_rule", "preference", "财务复盘更适合按月做，不适合每天细碎查看。", "月度窗口更容易看到订阅、一次性支出和投资节奏。", "confirmed", "demo_finance", 1),
    ("creative_goal", "goal", "创作输出要从系统截图和真实工作流开始。", "比抽象讲概念更容易让观众理解 Axiom 的价值。", "confirmed", "demo_creative", 2),
]

TASKS = [
    ("restore_3d", "demo_axiom", "把 Atlas 主视图恢复成 3D 表达", "沿用 atlas.v1 数据层，在 Three.js 中表达 skeleton / cluster / leaf。", "todo", "high", 0),
    ("edge_review", "demo_axiom", "为语义边增加人工确认入口", "点击语义边时显示 evidence，并允许接受、隐藏或降权。", "todo", "medium", 1),
    ("rust_cli", "demo_learning", "完成 Rust 笔记索引 CLI", "读取 notes 目录，输出 topic index 和最近修改列表。", "todo", "medium", 2),
    ("health_week", "demo_health", "记录一周训练和饮食", "每天只记三项：训练、睡眠、蛋白质是否达标。", "todo", "medium", 1),
    ("finance_month", "demo_finance", "复盘本月现金流", "标记可暂停订阅，并把一次性支出从日常消费中拆出来。", "todo", "low", 1),
    ("creative_script", "demo_creative", "写个人知识系统视频脚本", "开头用 Capture 到 Atlas 的真实画面，不做空泛介绍。", "todo", "medium", 2),
]

DECISIONS = [
    (
        "atlas_data_first",
        "demo_axiom",
        "Atlas v1 数据层先稳定，再迭代 3D 表达",
        "先把节点、边、过滤和证据结构稳定下来，再换渲染层。",
        "这样 2D/3D 都能共用同一份图谱数据。",
        "pending",
        0,
    ),
    (
        "demo_marker",
        "demo_axiom",
        "示例数据统一使用 atlas_demo 标记",
        "所有 demo item 使用 source=atlas_demo，association id 使用 atlas_demo: 前缀。",
        "后续可以安全清理和重复生成。",
        "accepted",
        0,
    ),
    (
        "semantic_filter",
        "demo_axiom",
        "语义边默认只显示高置信证据",
        "全局视图容易被边淹没，先只展示有 evidence 且 confidence 足够高的边。",
        "保留局部探索入口给低置信关系。",
        "accepted",
        1,
    ),
]


def clear_demo(conn) -> dict[str, int]:
    item_ids = [row["id"] for row in conn.execute("SELECT id FROM items WHERE source = ?", (SOURCE,)).fetchall()]
    for item_id in item_ids:
        conn.execute("DELETE FROM items_fts WHERE rowid = ?", (item_id,))
    conn.execute("DELETE FROM items WHERE source = ?", (SOURCE,))
    counts = {"items": len(item_ids)}

    for table in ("tasks", "memories", "decisions"):
        marker_column = "detail" if table != "decisions" else "context"
        cur = conn.execute(f"DELETE FROM {table} WHERE {marker_column} LIKE ?", ("[Atlas Demo]%",))
        counts[table] = cur.rowcount

    cur = conn.execute("DELETE FROM associations WHERE id LIKE 'atlas_demo:%'")
    counts["associations"] = cur.rowcount
    lifeline_ids = [row[0] for row in LIFELINES]
    cur = conn.execute(
        f"DELETE FROM lifelines WHERE id IN ({','.join('?' for _ in lifeline_ids)})",
        lifeline_ids,
    )
    counts["lifelines"] = cur.rowcount
    conn.execute("DELETE FROM graph_layout_cache")
    conn.execute("DELETE FROM graph_edges")
    conn.execute("DELETE FROM graph_nodes")
    conn.execute("DELETE FROM graph_clusters")
    return counts


def insert_lifelines(conn) -> None:
    now = iso(0)
    for lifeline_id, name, order_index in LIFELINES:
        conn.execute(
            """
            INSERT INTO lifelines (id, name, parent_id, order_index, created_at, updated_at)
            VALUES (?, ?, NULL, ?, ?, ?)
            """,
            (lifeline_id, name, order_index, now, now),
        )


def insert_item(conn, content: str, lifeline_id: str, days_ago: int) -> int:
    created_at = iso(days_ago)
    cursor = conn.execute(
        """
        INSERT INTO items (
            type, content, source, created_at, original_name, mime_type,
            size_bytes, processing_override, lifeline_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        ("text", content, SOURCE, created_at, None, None, len(content.encode("utf-8")), "ready", lifeline_id),
    )
    item_id = int(cursor.lastrowid)
    conn.execute(
        "INSERT INTO items_fts(rowid, content, original_name, derived_text, transcript_text) VALUES (?, ?, ?, ?, ?)",
        (item_id, cjk_tokenize(content), None, None, None),
    )
    return item_id


def insert_memory(conn, category: str, content: str, detail: str, status: str, lifeline_id: str, days_ago: int) -> int:
    created_at = iso(days_ago, 9)
    cursor = conn.execute(
        """
        INSERT INTO memories (category, content, detail, status, source_text, created_at, updated_at, lifeline_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (category, content, "[Atlas Demo] " + detail, status, content, created_at, created_at, lifeline_id),
    )
    return int(cursor.lastrowid)


def insert_task(conn, title: str, detail: str, status: str, priority: str, lifeline_id: str, days_ago: int) -> int:
    created_at = iso(days_ago, 10)
    cursor = conn.execute(
        """
        INSERT INTO tasks (title, detail, status, priority, due_date, estimated_minutes, created_at, updated_at, lifeline_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (title, "[Atlas Demo] " + detail, status, priority, None, 45, created_at, created_at, lifeline_id),
    )
    return int(cursor.lastrowid)


def insert_decision(
    conn,
    title: str,
    context: str,
    decision: str,
    reasoning: str,
    status: str,
    lifeline_id: str,
    days_ago: int,
) -> int:
    created_at = iso(days_ago, 11)
    cursor = conn.execute(
        """
        INSERT INTO decisions (
            title, context, decision, reasoning, expected_outcome,
            status, created_at, updated_at, lifeline_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (title, "[Atlas Demo] " + context, decision, reasoning, "Atlas 可读性提升。", status, created_at, created_at, lifeline_id),
    )
    return int(cursor.lastrowid)


def evidence(text: str, weight: float) -> str:
    return json.dumps([{"type": "demo", "excerpt": text, "weight": weight}], ensure_ascii=False)


def insert_assoc(conn, assoc_id: str, source: tuple[str, int], target: tuple[str, int], relation: str, confidence: float, text: str) -> None:
    conn.execute(
        """
        INSERT INTO associations (
            id, from_kind, from_id, to_kind, to_id, relation_type,
            confidence, status, evidence, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            "atlas_demo:" + assoc_id,
            source[0],
            str(source[1]),
            target[0],
            str(target[1]),
            relation,
            confidence,
            "accepted",
            evidence(text, confidence),
            iso(0, 12),
        ),
    )


def main() -> None:
    init_app_storage()
    conn = get_db_connection()
    try:
        removed = clear_demo(conn)
        insert_lifelines(conn)

        item_ids: dict[str, int] = {}
        for key, lifeline_id, content, days_ago in ITEMS:
            item_ids[key] = insert_item(conn, content, lifeline_id, days_ago)

        memory_ids: dict[str, int] = {}
        for key, category, content, detail, status, lifeline_id, days_ago in MEMORIES:
            memory_ids[key] = insert_memory(conn, category, content, detail, status, lifeline_id, days_ago)

        task_ids: dict[str, int] = {}
        for key, lifeline_id, title, detail, status, priority, days_ago in TASKS:
            task_ids[key] = insert_task(conn, title, detail, status, priority, lifeline_id, days_ago)

        decision_ids: dict[str, int] = {}
        for key, lifeline_id, title, decision, reasoning, status, days_ago in DECISIONS:
            decision_ids[key] = insert_decision(conn, title, title, decision, reasoning, status, lifeline_id, days_ago)

        insert_assoc(conn, "prefer_3d_to_restore_3d", ("memory", memory_ids["prefer_3d"]), ("task", task_ids["restore_3d"]), "causal", 0.96, "用户偏好认知地图的 3D 空间层次，因此主视图应保持 3D，但不使用天文大球隐喻。")
        insert_assoc(conn, "playwright_to_dev_loop", ("item", item_ids["atlas_playwright"]), ("memory", memory_ids["dev_loop"]), "supports", 0.94, "真实页面验证已经成为前端开发约束。")
        insert_assoc(conn, "spec_to_data_decision", ("item", item_ids["atlas_spec"]), ("decision", decision_ids["atlas_data_first"]), "supports", 0.91, "v1 spec 要求稳定数据层和分层结构。")
        insert_assoc(conn, "edge_note_to_filter", ("item", item_ids["atlas_edges"]), ("decision", decision_ids["semantic_filter"]), "supports", 0.93, "边的证据、强度和类型直接支持语义边默认过滤。")
        insert_assoc(conn, "rust_goal_to_cli", ("memory", memory_ids["rust_goal"]), ("task", task_ids["rust_cli"]), "next_action", 0.89, "Rust 学习目标落到一个可完成的 CLI 项目。")
        insert_assoc(conn, "health_pattern_to_week", ("memory", memory_ids["health_pattern"]), ("task", task_ids["health_week"]), "causal", 0.9, "睡眠和训练表现相关，因此需要一周连续记录。")
        insert_assoc(conn, "finance_rule_to_month", ("memory", memory_ids["finance_rule"]), ("task", task_ids["finance_month"]), "next_action", 0.88, "月度复盘偏好对应现金流整理任务。")
        insert_assoc(conn, "creative_goal_to_script", ("memory", memory_ids["creative_goal"]), ("task", task_ids["creative_script"]), "next_action", 0.9, "创作目标要求从真实工作流画面开始写脚本。")
        insert_assoc(conn, "video_to_script", ("item", item_ids["creative_video"]), ("task", task_ids["creative_script"]), "supports", 0.86, "视频构思为脚本任务提供开场画面。")

        conn.commit()
    finally:
        conn.close()

    summary = {
        "removed": removed,
        "inserted": {
            "lifelines": len(LIFELINES),
            "items": len(ITEMS),
            "memories": len(MEMORIES),
            "tasks": len(TASKS),
            "decisions": len(DECISIONS),
            "associations": 9,
        },
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
