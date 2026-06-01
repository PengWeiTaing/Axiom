"""First-pass Atlas v1 topic cluster generation."""
from __future__ import annotations

from collections import Counter, defaultdict
from typing import Any

from core.graph.schema import make_node


TYPE_LABELS = {
    "item": "原始记录",
    "task": "任务",
    "memory": "记忆",
    "decision": "决策",
}

TYPE_PRIORITY = {
    "decision": 0,
    "task": 1,
    "memory": 2,
    "item": 3,
}

TOPIC_RULES = [
    {
        "key": "atlas",
        "label": "Atlas 重构",
        "summary": "Atlas 图谱、节点、边、聚焦视图和空间语法相关内容。",
        "keywords": ("atlas", "图谱", "节点", "边", "语义边", "3d", "2d", "local atlas", "聚焦", "球壳", "halo"),
    },
    {
        "key": "relation_chain",
        "label": "对象关系链",
        "summary": "对象之间的关联、证据、关系类型和过滤规则。",
        "keywords": ("关联", "关系", "association", "evidence", "证据", "强度", "置信", "过滤", "supports", "causal"),
    },
    {
        "key": "agent_collab",
        "label": "Agent 协作",
        "summary": "Codex、Claude、自动化协作和真实页面验证流程。",
        "keywords": ("agent", "codex", "claude", "deepseek", "playwright", "自动", "协作", "开发约束"),
    },
    {
        "key": "backend",
        "label": "后端架构",
        "summary": "API、数据层、部署、测试、VPS 和服务端结构。",
        "keywords": ("后端", "api", "flask", "vps", "部署", "测试", "数据库", "数据层", "schema", "sqlite"),
    },
    {
        "key": "frontend_ui",
        "label": "前端 UI",
        "summary": "Vue、Three.js、移动端、布局、视觉和交互表达。",
        "keywords": ("前端", "ui", "vue", "three", "three.js", "移动端", "布局", "视觉", "界面", "交互"),
    },
    {
        "key": "automation_review",
        "label": "自动化回顾",
        "summary": "自动化系统、回顾、复盘、烟测和工作流闭环。",
        "keywords": ("自动化", "回顾", "复盘", "smoke", "烟测", "验证", "工作流"),
    },
    {
        "key": "rust_ownership",
        "label": "所有权与借用",
        "summary": "Rust 所有权、借用、生命周期和基础语法练习。",
        "keywords": ("所有权", "借用", "生命周期", "borrow", "ownership"),
    },
    {
        "key": "rust_cli",
        "label": "CLI 项目实践",
        "summary": "Rust CLI、项目实践、错误处理和模块拆分。",
        "keywords": ("cli", "项目", "error handling", "错误处理", "模块", "工具", "markdown"),
    },
    {
        "key": "rust_runtime",
        "label": "并发与运行时",
        "summary": "Rust 并发、Tokio、trait 和 unsafe 等进阶主题。",
        "keywords": ("tokio", "并发", "trait", "unsafe", "runtime"),
    },
    {
        "key": "health_training",
        "label": "训练与恢复",
        "summary": "训练计划、睡眠、疲劳和身体状态记录。",
        "keywords": ("训练", "力量", "有氧", "睡眠", "疲劳", "表现", "恢复"),
    },
    {
        "key": "health_nutrition",
        "label": "饮食与蛋白质",
        "summary": "饮食记录、蛋白质、饥饿感和备餐策略。",
        "keywords": ("饮食", "蛋白质", "晚餐", "备餐", "高蛋白", "饿"),
    },
    {
        "key": "finance_cashflow",
        "label": "现金流整理",
        "summary": "月度现金流、固定支出、弹性消费和投资节奏。",
        "keywords": ("现金流", "固定支出", "弹性消费", "投资", "月度", "一次性支出"),
    },
    {
        "key": "finance_subs",
        "label": "订阅复盘",
        "summary": "订阅服务、低频工具、暂停与恢复决策。",
        "keywords": ("订阅", "低频", "暂停", "恢复", "服务"),
    },
    {
        "key": "creative_video",
        "label": "视频脚本",
        "summary": "视频选题、脚本、真实工作流画面和开场结构。",
        "keywords": ("视频", "脚本", "画面", "开头", "截图", "工作流"),
    },
    {
        "key": "creative_writing",
        "label": "文章输出",
        "summary": "文章草稿、外脑叙事和知识系统表达。",
        "keywords": ("文章", "草稿", "外脑", "知识系统", "资料库"),
    },
]

GENERIC_TOPIC = {
    "key": "topic",
    "label": "主题线索",
    "summary": "暂未命中明确规则的主题线索。",
}


def cluster_id_for(lifeline_id: str, topic_key: str) -> str:
    safe_lifeline = lifeline_id.replace(":", "_").replace("/", "_")
    safe_topic = topic_key.replace(":", "_").replace("/", "_")
    return f"cluster:{safe_lifeline}:{safe_topic}"


def build_type_clusters(
    lifeline_names: dict[str, str],
    entities: list[dict[str, Any]],
) -> tuple[list[dict[str, Any]], dict[str, str], dict[str, list[dict[str, Any]]]]:
    """Build semantic topic clusters.

    The public function name stays stable for callers, but clusters are now
    topic-first. Object type remains in metadata for badges and filters.
    """

    grouped: dict[tuple[str, str], list[dict[str, Any]]] = defaultdict(list)
    topic_meta: dict[tuple[str, str], dict[str, str]] = {}
    for entity in entities:
        topic = _topic_for(entity)
        key = (entity["lifeline_id"], topic["key"])
        grouped[key].append(entity)
        topic_meta[key] = topic

    clusters: list[dict[str, Any]] = []
    entity_to_cluster: dict[str, str] = {}
    members_by_cluster: dict[str, list[dict[str, Any]]] = {}

    for (lifeline_id, topic_key), members in sorted(
        grouped.items(),
        key=lambda item: (
            lifeline_names.get(item[0][0], item[0][0]),
            -_cluster_weight(item[1]),
            topic_meta[item[0]]["label"],
        ),
    ):
        topic = topic_meta[(lifeline_id, topic_key)]
        cid = cluster_id_for(lifeline_id, topic_key)
        type_counts = Counter(member["type"] for member in members)
        label = topic["label"]
        lifeline_name = lifeline_names.get(lifeline_id, lifeline_id)
        fallback_bucket = lifeline_id.endswith(":uncategorized")
        weight = _cluster_weight(members)
        if fallback_bucket:
            weight = min(weight, 0.28)
        cluster = make_node(
            node_id=cid,
            node_type="cluster",
            label=label,
            summary=f"{lifeline_name} 下的{label}，共 {len(members)} 个对象。",
            layer=2,
            lifeline_id=lifeline_id,
            weight=weight,
            visible_label=not fallback_bucket,
            meta={
                "cluster_kind": "topic",
                "topic_key": topic_key,
                "topic_summary": topic["summary"],
                "object_type_counts": dict(type_counts),
                "fallback_bucket": fallback_bucket,
                "item_count": type_counts.get("item", 0),
                "entity_count": len(members),
            },
        )
        clusters.append(cluster)
        members_by_cluster[cid] = members
        for member in members:
            entity_to_cluster[member["id"]] = cid

    return clusters, entity_to_cluster, members_by_cluster


def representative_members(
    members: list[dict[str, Any]],
    *,
    per_cluster_limit: int = 5,
    item_limit: int = 2,
) -> list[dict[str, Any]]:
    sorted_members = sorted(
        members,
        key=lambda m: (
            -float(m.get("weight") or 0.0),
            TYPE_PRIORITY.get(m.get("type"), 9),
            str(m.get("created_at") or ""),
        ),
    )
    selected: list[dict[str, Any]] = []
    item_count = 0
    seen_types: set[str] = set()

    # Keep the local graph semantically mixed where possible.
    for member in sorted_members:
        if len(selected) >= per_cluster_limit:
            break
        if member.get("type") in seen_types:
            continue
        if member.get("type") == "item":
            item_count += 1
        seen_types.add(member.get("type"))
        selected.append(member)

    for member in sorted_members:
        if len(selected) >= per_cluster_limit:
            break
        if member in selected:
            continue
        if member.get("type") == "item":
            if item_count >= item_limit:
                continue
            item_count += 1
        selected.append(member)
    return selected


def _topic_for(entity: dict[str, Any]) -> dict[str, str]:
    haystack = _entity_text(entity)
    best: tuple[int, dict[str, str]] | None = None
    for topic in TOPIC_RULES:
        score = sum(1 for keyword in topic["keywords"] if keyword.lower() in haystack)
        if score and (best is None or score > best[0]):
            best = (score, topic)
    if best:
        return {
            "key": best[1]["key"],
            "label": best[1]["label"],
            "summary": best[1]["summary"],
        }
    label = TYPE_LABELS.get(entity.get("type"), GENERIC_TOPIC["label"])
    return {
        "key": f"fallback_{entity.get('type', 'entity')}",
        "label": f"{label}线索",
        "summary": GENERIC_TOPIC["summary"],
    }


def _entity_text(entity: dict[str, Any]) -> str:
    meta = entity.get("meta") or {}
    parts = [
        str(entity.get("label") or ""),
        str(entity.get("summary") or ""),
        str(meta.get("category") or ""),
        str(meta.get("source") or ""),
        str(meta.get("item_type") or ""),
    ]
    return " ".join(parts).lower()


def _cluster_weight(members: list[dict[str, Any]]) -> float:
    if not members:
        return 0.25
    max_weight = max(float(member.get("weight") or 0.0) for member in members)
    avg_weight = sum(float(member.get("weight") or 0.0) for member in members) / len(members)
    density = min(len(members), 12) * 0.025
    return min(1.0, 0.28 + max_weight * 0.42 + avg_weight * 0.18 + density)
