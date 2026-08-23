"""Seed a coherent, removable Axiom product demo.

The demo tells one story: a raw observation becomes governed memory, a product
decision, a small next action, and finally an evidence-backed Atlas relation.
The command is dry-run by default; pass ``--apply`` to write the database.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

SOURCE = "atlas_demo"
DETAIL_PREFIX = "[Axiom Demo]"
LEGACY_DETAIL_PREFIX = "[Atlas Demo]"
LEGACY_LIFELINE_IDS = (
    "demo_axiom",
    "demo_learning",
    "demo_health",
    "demo_finance",
    "demo_creative",
)

LIFELINES = (
    {"key": "product", "id": "demo_product", "name": "Axiom 产品演进", "order": 10},
    {"key": "research", "id": "demo_research", "name": "外脑研究", "order": 20},
    {"key": "atlas", "id": "demo_atlas", "name": "Atlas 认知地图", "order": 30},
    {"key": "story", "id": "demo_story", "name": "演示与发布", "order": 40},
)

ITEMS = (
    {"key": "navigation_friction", "lifeline": "product", "days_ago": 8, "content": "连续迭代暴露出一个产品偏差：把记忆、任务、决策、时间线等十三个内部对象做成平级工作台，会迫使用户先理解系统分类，再处理自己此刻真正关心的事。"},
    {"key": "now_surface", "lifeline": "product", "days_ago": 7, "content": "“此刻”应先回答三个问题：现在最值得推进什么、为什么是它、从哪一个足够小的动作开始；其余对象只在需要时进入上下文。"},
    {"key": "library_recall", "lifeline": "product", "days_ago": 6, "content": "资料库负责统一找回记录、文件、记忆、任务和决策，默认按主题与项目组织，而不是要求用户先选择对象类型。"},
    {"key": "approval_boundary", "lifeline": "product", "days_ago": 5, "content": "系统可以自动读取、检索和总结；形成长期记忆、改变承诺或执行外部写操作时，必须留下来源并按风险请求确认。"},
    {"key": "report_conclusion", "lifeline": "research", "days_ago": 12, "content": "研究报告的核心结论：长期有用的外脑不是更会聊天的模型，而是显式检索、分层记忆、状态化计划、工具连接和人工审批共同组成的系统。"},
    {"key": "compounding_cycle", "lifeline": "research", "days_ago": 10, "content": "外脑产生复利的最小闭环是：采集保留原始证据，候选记忆经过确认，目标转成当前行动，执行结果进入回顾，再反向修正记忆与计划。"},
    {"key": "memory_rule", "lifeline": "research", "days_ago": 9, "content": "长期记忆不等于摘要仓库。稳定事实、偏好、目标和事件必须保留来源、情境、置信度与可能的过期条件，并允许修改、归档和删除。"},
    {"key": "adhd_principle", "lifeline": "research", "days_ago": 4, "content": "对启动困难和注意漂移，系统不应强化“意志力不足”的判断；更有效的干预是缩短反馈延迟、降低动作启动成本，并让推荐随当前能量与情境变化。"},
    {"key": "global_local", "lifeline": "atlas", "days_ago": 8, "content": "Atlas 的全局形态是 3D 认知地图，用距离与空间扇区表达长期主线；聚焦节点后进入 2D 局部语境，用少量一跳、二跳关系解释为什么相关。"},
    {"key": "point_aesthetic", "lifeline": "atlas", "days_ago": 7, "content": "节点应是克制的小光点而不是大球。生命感来自 hover、focus、selected 等状态变化，普通节点不持续表演，标签必须让位于图谱结构。"},
    {"key": "relation_contract", "lifeline": "atlas", "days_ago": 6, "content": "语义关系只有在存在具体证据、关系类型和置信度时才进入 Atlas；待确认关系在局部语境审核，结构归属保持只读。"},
    {"key": "visual_tension", "lifeline": "atlas", "days_ago": 4, "content": "节点需要更生动，但全图粒子、轨道和持续流光会迅速损害可读性。更合适的方向是把亮度、halo 与局部动效集中在当前语境。"},
    {"key": "mobile_acceptance", "lifeline": "atlas", "days_ago": 1, "content": "移动端验收记录：390×844 视口中，局部图与关系面板边界应精确衔接，编辑态可滚动、无横向溢出，3D 画布必须非空且主体位于视口内。"},
    {"key": "demo_storyboard", "lifeline": "story", "days_ago": 3, "content": "三分钟演示不罗列功能：从一条“工作台太多”的记录开始，展示它如何沉淀为产品记忆、触发入口决策、形成今日行动，并在 Atlas 中回看证据链。"},
    {"key": "demo_question", "lifeline": "story", "days_ago": 2, "content": "观众看完后应能回答：Axiom 为什么不是笔记库、它如何决定此刻、AI 在哪里提出建议、用户又在哪里保留最终控制权。"},
    {"key": "demo_scope", "lifeline": "story", "days_ago": 2, "content": "演示只呈现 Axiom 主线。白板与 MemoryGuard 可说明为独立竞赛项目，但不进入 Axiom 一级导航，也不拿来填充 Atlas。"},
    {"key": "deployment_proof", "lifeline": "story", "days_ago": 1, "content": "上线验收要同时确认生产入口、静态资源、服务状态、数据库与 FTS 一致性；截图漂亮但真实链路不可操作，不算完成。"},
)

MEMORIES = (
    {"key": "goal_demo", "lifeline": "story", "category": "goal", "content": "在三分钟内让第一次接触的人理解 Axiom 的外脑闭环", "detail": "用同一条项目记录串联采集、记忆、行动、关系与回顾，不做功能清单。", "source": "demo_storyboard", "status": "confirmed"},
    {"key": "product_principle", "lifeline": "product", "category": "fact", "content": "Axiom 不是十三个工具的集合，内部对象不应成为一级导航", "detail": "内部对象属于同一条上下文的不同状态，入口应围绕用户意图组织。", "source": "navigation_friction", "status": "confirmed"},
    {"key": "calm_interface", "lifeline": "atlas", "category": "preference", "content": "界面应安静、克制，视觉层级服务于当前上下文", "detail": "默认态减少标签、光效和持续运动，把高对比留给当前焦点。", "source": "point_aesthetic", "status": "confirmed"},
    {"key": "alive_nodes", "lifeline": "atlas", "category": "preference", "content": "Atlas 节点需要有生命感，但不能靠大球和全图持续特效", "detail": "生命感来自 hover、focus、selected 和新关系等有意义的状态响应。", "source": "visual_tension", "status": "confirmed"},
    {"key": "memory_boundary", "lifeline": "research", "category": "fact", "content": "长期记忆必须保留来源并经过治理", "detail": "候选记忆只有在可追溯、可修改、可归档时才适合长期影响推荐。", "source": "memory_rule", "status": "confirmed"},
    {"key": "control_preference", "lifeline": "research", "category": "preference", "content": "AI 可以提出候选，但用户保留最终决定权", "detail": "高影响写操作需要可见证据、明确确认和可撤销记录。", "source": "approval_boundary", "status": "confirmed"},
    {"key": "atlas_model", "lifeline": "atlas", "category": "fact", "content": "Atlas 全局使用 3D，聚焦后进入 2D 局部语境", "detail": "3D 表达长期结构，2D 控制局部信息量并承载关系治理。", "source": "global_local", "status": "confirmed"},
    {"key": "navigation_event", "lifeline": "product", "category": "event", "content": "十三个平级工作台方案被否定，产品重新回到此刻中心", "detail": "这次修正把功能对象降为上下文细节，并恢复三入口产品模型。", "source": "navigation_friction", "status": "confirmed"},
    {"key": "governance_event", "lifeline": "atlas", "category": "event", "content": "Atlas 关系治理完成桌面与移动端验收", "detail": "关系证据、状态编辑与局部图联动已通过双视口实际页面检查。", "source": "mobile_acceptance", "status": "confirmed"},
    {"key": "demo_content_candidate", "lifeline": "story", "category": "preference", "content": "演示内容应围绕一条真实项目主线组织，而不是平均填充功能", "detail": "这是待确认的演示偏好；首轮走查后再决定是否固化为长期规则。", "source": "demo_storyboard", "status": "candidate"},
)

TASKS = (
    {"key": "shell_done", "lifeline": "product", "title": "收敛一级入口为“此刻 / 资料库 / Atlas”", "detail": "产品壳层已从对象工作台改为三个用户意图入口。", "status": "done", "priority": "high", "days_due": -2, "minutes": 90},
    {"key": "atlas_governance_done", "lifeline": "atlas", "title": "完成 Atlas 关系治理闭环", "detail": "关系面板可查看证据、调整状态并与局部图同步。", "status": "done", "priority": "high", "days_due": -1, "minutes": 120},
    {"key": "atlas_visual_done", "lifeline": "atlas", "title": "完成 Atlas 桌面与移动端视觉验收", "detail": "验证 3D 画布非空、局部图边界、编辑滚动与移动端无横向溢出。", "status": "done", "priority": "high", "days_due": -1, "minutes": 75},
    {"key": "demo_rehearsal", "lifeline": "story", "title": "走一遍三分钟 Axiom 演示", "detail": "只沿记录、记忆、决策、行动和 Atlas 证据链推进，记录卡顿点。", "status": "todo", "priority": "high", "days_due": 0, "minutes": 30, "goal": "goal_demo"},
    {"key": "production_walkthrough", "lifeline": "story", "title": "检查生产 Atlas 的关系证据链", "detail": "从产品原则进入局部语境，确认关系证据、状态和目标任务均可见。", "status": "todo", "priority": "high", "days_due": 1, "minutes": 35, "goal": "goal_demo"},
    {"key": "voiceover", "lifeline": "story", "title": "写演示旁白并压缩到三分钟", "detail": "每段只保留用户问题、系统判断和可见结果，删掉架构术语。", "status": "todo", "priority": "medium", "days_due": 2, "minutes": 50, "goal": "goal_demo"},
    {"key": "feedback_form", "lifeline": "story", "title": "准备首轮演示反馈问题", "detail": "只问定位理解、控制感、下一步清晰度和 Atlas 可读性。", "status": "todo", "priority": "low", "days_due": 4, "minutes": 20, "goal": "goal_demo"},
    {"key": "research_acceptance", "lifeline": "research", "title": "把研究报告原则转成演示验收清单", "detail": "逐项核对检索、分层记忆、状态化行动、工具边界与人工确认。", "status": "todo", "priority": "medium", "days_due": 3, "minutes": 45, "goal": "goal_demo"},
    {"key": "atlas_motion_next", "lifeline": "atlas", "title": "定义 Atlas 状态动效节奏", "detail": "只为 hover、focus、selected、新关系和高相关节点定义时长与亮度层级。", "status": "todo", "priority": "medium", "days_due": 5, "minutes": 60},
    {"key": "demo_cleanup", "lifeline": "story", "title": "确认演示数据可重复清理且不混入真实记录", "detail": "二次生成后核对计数、来源标记、FTS 与非演示记录保持不变。", "status": "todo", "priority": "low", "days_due": 2, "minutes": 25},
)

DECISIONS = (
    {"key": "product_shell", "lifeline": "product", "title": "一级入口只保留“此刻 / 资料库 / Atlas”", "context": "十三个平级工作台分散了用户注意力。", "decision": "围绕当前行动、统一找回和关系理解组织一级入口。", "reasoning": "用户先处理意图，内部对象在上下文中按需出现。", "outcome": "第一次进入 Axiom 时不需要先学习数据模型。", "status": "reviewed"},
    {"key": "global_local", "lifeline": "atlas", "title": "Atlas 采用“3D 全局 + 2D 局部”", "context": "全局结构与局部关系治理需要不同的信息密度。", "decision": "全局保留 3D 空间结构，聚焦节点后切换到 2D 局部语境。", "reasoning": "3D 负责概览，2D 负责解释与操作。", "outcome": "空间感和局部可读性不再互相牺牲。", "status": "reviewed"},
    {"key": "relation_governance", "lifeline": "atlas", "title": "AI 关系候选必须带证据并由用户治理", "context": "无证据的自动连线会把 Atlas 变成不可解释的毛线团。", "decision": "候选关系必须包含类型、置信度和证据；接受、隐藏或拒绝由用户决定。", "reasoning": "关系会长期影响认知地图，必须可追溯、可纠正。", "outcome": "Atlas 中每条高价值语义边都能解释为什么存在。", "status": "reviewed"},
    {"key": "motion_language", "lifeline": "atlas", "title": "Atlas 的生命感来自状态响应，而不是全图持续动画", "context": "大球、全图粒子和持续流光显得粗糙并损害阅读。", "decision": "将 halo、亮度与局部动效集中在 hover、focus、selected 和新关系。", "reasoning": "有触发原因的运动才会增强认知反馈。", "outcome": "图谱安静但不僵硬。", "status": "pending"},
    {"key": "demo_narrative", "lifeline": "story", "title": "演示围绕一条输入的演化展开", "context": "功能清单无法让第一次接触的人理解 Axiom。", "decision": "从“工作台太多”的原始记录开始，追踪它成为记忆、决策、行动和关系证据。", "reasoning": "同一条线索能同时展示复利闭环与用户控制权。", "outcome": "三分钟内形成可复述的产品心智模型。", "status": "pending"},
    {"key": "competition_boundary", "lifeline": "product", "title": "白板与 MemoryGuard 不进入 Axiom 一级导航", "context": "两者分别服务独立竞赛目标，不能反向绑架 Axiom 产品形态。", "decision": "竞赛项目保持独立边界，仅在研究和能力层复用必要成果。", "reasoning": "主产品应遵循外脑研究，而不是展示项目数量。", "outcome": "Axiom 导航与产品叙事保持完整。", "status": "reviewed"},
    {"key": "demo_marker", "lifeline": "story", "title": "演示数据统一使用可清理标记", "context": "生产环境已有少量真实记录，演示内容必须与真实数据隔离。", "decision": "item 使用 atlas_demo source，其余对象使用 [Axiom Demo] 前缀，关系使用 atlas_demo: ID。", "reasoning": "允许备份后重复生成、核验与完整清理。", "outcome": "演示不会覆盖或伪装成用户真实记录。", "status": "reviewed"},
)

ASSOCIATIONS = (
    ("report_to_product_principle", "item", "report_conclusion", "memory", "product_principle", "supports", 0.94, "accepted", "research_principle", "研究报告明确把外脑定义为闭环系统，支持产品不以工具集合为中心。"),
    ("navigation_to_event", "item", "navigation_friction", "memory", "navigation_event", "derived_from", 0.96, "accepted", "project_history", "平级工作台造成的导航摩擦直接沉淀为这次产品修正事件。"),
    ("event_to_shell", "memory", "navigation_event", "decision", "product_shell", "causal", 0.95, "accepted", "product_decision", "工作台方案被否定后，一级入口收敛为三个用户意图。"),
    ("principle_to_shell", "memory", "product_principle", "decision", "product_shell", "supports", 0.97, "accepted", "product_principle", "内部对象不应成为一级导航，直接支持三入口产品壳层。"),
    ("now_to_shell", "item", "now_surface", "decision", "product_shell", "supports", 0.91, "accepted", "interaction_principle", "此刻围绕当前推进组织，解释了为何任务等对象只按需出现。"),
    ("library_to_shell", "item", "library_recall", "decision", "product_shell", "supports", 0.89, "accepted", "retrieval_principle", "统一找回替代对象类型入口，补全资料库在三入口中的职责。"),
    ("approval_to_control", "item", "approval_boundary", "memory", "control_preference", "derived_from", 0.95, "accepted", "governance_rule", "外部写操作按风险确认，形成用户保留最终决定权的稳定偏好。"),
    ("memory_rule_to_boundary", "item", "memory_rule", "memory", "memory_boundary", "derived_from", 0.96, "accepted", "memory_research", "来源、情境和过期条件共同构成长记忆治理边界。"),
    ("boundary_to_control", "memory", "memory_boundary", "memory", "control_preference", "supports", 0.88, "accepted", "governance_rule", "记忆可追溯、可修改，才能让用户真正保留长期控制权。"),
    ("cycle_to_goal", "item", "compounding_cycle", "memory", "goal_demo", "supports", 0.92, "accepted", "research_principle", "演示目标采用采集到回顾的闭环，直接来自研究中的最小复利循环。"),
    ("adhd_to_now", "item", "adhd_principle", "item", "now_surface", "supports", 0.86, "accepted", "behavior_principle", "降低启动成本的研究原则支持此刻只给出足够小的下一步。"),
    ("global_item_to_memory", "item", "global_local", "memory", "atlas_model", "derived_from", 0.97, "accepted", "atlas_spec", "3D 全局与 2D 局部的设计记录沉淀为 Atlas 稳定模型。"),
    ("atlas_memory_to_decision", "memory", "atlas_model", "decision", "global_local", "supports", 0.98, "accepted", "atlas_spec", "Atlas 稳定模型直接支持最终的全局与聚焦形态决策。"),
    ("point_to_calm", "item", "point_aesthetic", "memory", "calm_interface", "same_topic", 0.88, "accepted", "visual_direction", "小光点、少标签与默认克制共同属于安静界面的视觉方向。"),
    ("point_to_alive", "item", "point_aesthetic", "memory", "alive_nodes", "supports", 0.91, "accepted", "visual_direction", "节点生命感应由有意义状态变化表达，而不是扩大节点体积。"),
    ("tension_to_motion", "item", "visual_tension", "decision", "motion_language", "supports", 0.94, "accepted", "design_tradeoff", "持续特效损害可读性的观察支持局部状态动效方案。"),
    ("calm_tension_alive", "memory", "calm_interface", "memory", "alive_nodes", "tension", 0.89, "pending", "design_tension", "界面需要安静，同时节点不能僵硬；两者需要通过状态化动效平衡。"),
    ("relation_to_governance", "item", "relation_contract", "decision", "relation_governance", "supports", 0.97, "accepted", "relation_contract", "证据、类型、置信度和审核状态构成关系治理的完整契约。"),
    ("governance_to_event", "decision", "relation_governance", "memory", "governance_event", "causal", 0.93, "accepted", "acceptance_result", "关系治理决策落地后，桌面与移动端完成实际页面验收。"),
    ("event_to_walkthrough", "memory", "governance_event", "task", "production_walkthrough", "next_action", 0.9, "accepted", "deployment_followup", "本地验收完成后，下一步是在生产 Atlas 复查真实关系证据链。"),
    ("mobile_to_visual_done", "item", "mobile_acceptance", "task", "atlas_visual_done", "supports", 0.95, "accepted", "acceptance_result", "390×844 和桌面视口检查结果证明视觉验收任务已完成。"),
    ("storyboard_to_narrative", "item", "demo_storyboard", "decision", "demo_narrative", "supports", 0.96, "accepted", "demo_design", "故事板明确规定演示沿一条输入的演化推进。"),
    ("question_to_narrative", "item", "demo_question", "decision", "demo_narrative", "same_topic", 0.88, "accepted", "demo_acceptance", "观众必须能复述定位、此刻与控制权，构成演示叙事的验收问题。"),
    ("scope_to_competition", "item", "demo_scope", "decision", "competition_boundary", "supports", 0.94, "accepted", "scope_boundary", "演示范围明确排除独立竞赛项目，支持其不进入一级导航。"),
    ("deploy_to_walkthrough", "item", "deployment_proof", "task", "production_walkthrough", "prerequisite", 0.9, "accepted", "deployment_gate", "生产走查前必须先确认服务、静态资源、数据库和 FTS 一致。"),
    ("goal_to_rehearsal", "memory", "goal_demo", "task", "demo_rehearsal", "next_action", 0.97, "accepted", "goal_commitment", "三分钟理解目标的第一个可执行动作是完成一次全程走查。"),
    ("goal_to_voiceover", "memory", "goal_demo", "task", "voiceover", "next_action", 0.89, "accepted", "goal_commitment", "要在三分钟内形成心智模型，需要压缩旁白并删去架构术语。"),
    ("narrative_to_voiceover", "decision", "demo_narrative", "task", "voiceover", "prerequisite", 0.91, "accepted", "demo_workflow", "旁白必须在叙事决策确定后编写，才能围绕同一条输入展开。"),
    ("narrative_to_feedback", "decision", "demo_narrative", "task", "feedback_form", "next_action", 0.86, "accepted", "demo_workflow", "叙事确定后需要用少量问题验证观众是否形成正确心智模型。"),
    ("report_to_checklist", "item", "report_conclusion", "task", "research_acceptance", "next_action", 0.89, "accepted", "research_followup", "研究结论需要转成可逐项检查的演示验收门槛。"),
    ("motion_to_task", "decision", "motion_language", "task", "atlas_motion_next", "next_action", 0.92, "accepted", "design_followup", "状态化动效方向确定后，需要补齐各状态的节奏与亮度参数。"),
    ("marker_to_cleanup", "decision", "demo_marker", "task", "demo_cleanup", "next_action", 0.9, "accepted", "data_governance", "可清理标记需要通过二次生成与真实记录保留测试来验证。"),
    ("shell_to_done", "decision", "product_shell", "task", "shell_done", "causal", 0.94, "accepted", "implementation_result", "三入口产品决策已经落实为产品壳层收敛任务。"),
    ("governance_to_done", "decision", "relation_governance", "task", "atlas_governance_done", "causal", 0.95, "accepted", "implementation_result", "关系治理决策已经落实为证据与状态编辑闭环。"),
    ("global_to_visual_done", "decision", "global_local", "task", "atlas_visual_done", "causal", 0.93, "accepted", "implementation_result", "3D 全局和 2D 局部形态已经通过双视口视觉验收。"),
    ("candidate_to_narrative", "memory", "demo_content_candidate", "decision", "demo_narrative", "supports", 0.84, "pending", "preference_candidate", "围绕真实主线组织演示仍是候选偏好，需在首轮演示后确认。"),
)


def utc_iso(days_ago: int = 0, hour: int = 8) -> str:
    value = datetime.now(timezone.utc) - timedelta(days=days_ago)
    return value.replace(hour=hour, minute=0, second=0, microsecond=0).isoformat(timespec="seconds")


def due_date(days_from_today: int) -> str:
    return (date.today() + timedelta(days=days_from_today)).isoformat()


def build_plan() -> dict[str, Any]:
    """Return the exact write plan without touching storage."""
    return {
        "mode": "dry-run",
        "marker": SOURCE,
        "story": "一条产品观察如何成为记忆、决策、行动与 Atlas 证据链",
        "would_insert": {
            "lifelines": len(LIFELINES),
            "items": len(ITEMS),
            "memories": len(MEMORIES),
            "goal_commitments": 1,
            "tasks": len(TASKS),
            "decisions": len(DECISIONS),
            "associations": len(ASSOCIATIONS),
        },
    }


def clear_demo(conn: Any) -> dict[str, int]:
    association_cursor = conn.execute("DELETE FROM associations WHERE id LIKE ?", (f"{SOURCE}:%",))
    item_rows = conn.execute("SELECT id FROM items WHERE source = ?", (SOURCE,)).fetchall()
    for row in item_rows:
        conn.execute("DELETE FROM items_fts WHERE rowid = ?", (row["id"],))
    conn.execute("DELETE FROM items WHERE source = ?", (SOURCE,))

    removed: dict[str, int] = {
        "items": len(item_rows),
        "associations": association_cursor.rowcount,
        "goal_commitments": conn.execute(
            """
            SELECT COUNT(*) FROM goal_commitments gc
            JOIN memories m ON m.id = gc.memory_id
            WHERE m.detail LIKE ? OR m.detail LIKE ?
            """,
            (f"{DETAIL_PREFIX}%", f"{LEGACY_DETAIL_PREFIX}%"),
        ).fetchone()[0],
    }
    for table, marker_column in (("tasks", "detail"), ("decisions", "context"), ("memories", "detail")):
        cursor = conn.execute(
            f"DELETE FROM {table} WHERE {marker_column} LIKE ? OR {marker_column} LIKE ?",
            (f"{DETAIL_PREFIX}%", f"{LEGACY_DETAIL_PREFIX}%"),
        )
        removed[table] = cursor.rowcount

    all_lifeline_ids = [entry["id"] for entry in LIFELINES] + list(LEGACY_LIFELINE_IDS)
    removed["lifelines"] = 0
    for lifeline_id in all_lifeline_ids:
        references = sum(
            conn.execute(f"SELECT COUNT(*) FROM {table} WHERE lifeline_id = ?", (lifeline_id,)).fetchone()[0]
            for table in ("items", "tasks", "memories", "decisions")
        )
        if references == 0:
            removed["lifelines"] += conn.execute("DELETE FROM lifelines WHERE id = ?", (lifeline_id,)).rowcount
    for table in ("graph_layout_cache", "graph_edges", "graph_nodes", "graph_clusters"):
        conn.execute(f"DELETE FROM {table}")
    return removed


def _insert_item(conn: Any, row: dict[str, Any], lifelines: dict[str, str], cjk_tokenize: Any) -> int:
    created_at = utc_iso(row["days_ago"])
    cursor = conn.execute(
        """
        INSERT INTO items (
            type, content, source, created_at, original_name, mime_type,
            size_bytes, processing_override, lifeline_id
        ) VALUES (?, ?, ?, ?, NULL, NULL, ?, ?, ?)
        """,
        ("text", row["content"], SOURCE, created_at, len(row["content"].encode("utf-8")), "ready", lifelines[row["lifeline"]]),
    )
    item_id = int(cursor.lastrowid)
    conn.execute(
        "INSERT INTO items_fts(rowid, content, original_name, derived_text, transcript_text) VALUES (?, ?, NULL, NULL, NULL)",
        (item_id, cjk_tokenize(row["content"])),
    )
    return item_id


def _insert_memory(conn: Any, row: dict[str, Any], lifelines: dict[str, str], items: dict[str, int]) -> int:
    created_at = utc_iso(3, 9)
    source_text = next(item["content"] for item in ITEMS if item["key"] == row["source"])
    cursor = conn.execute(
        """
        INSERT INTO memories (
            category, content, detail, status, source_item_id, source_text,
            created_at, updated_at, lifeline_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (row["category"], row["content"], f"{DETAIL_PREFIX} {row['detail']}", row["status"], items[row["source"]], source_text, created_at, created_at, lifelines[row["lifeline"]]),
    )
    return int(cursor.lastrowid)


def _insert_task(conn: Any, row: dict[str, Any], lifelines: dict[str, str], memories: dict[str, int]) -> int:
    created_at = utc_iso(2, 10)
    completed_at = utc_iso(1, 18) if row["status"] == "done" else None
    cursor = conn.execute(
        """
        INSERT INTO tasks (
            title, detail, status, priority, memory_id, due_date,
            estimated_minutes, completed_at, created_at, updated_at, lifeline_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (row["title"], f"{DETAIL_PREFIX} {row['detail']}", row["status"], row["priority"], memories.get(row.get("goal")), due_date(row["days_due"]), row["minutes"], completed_at, created_at, completed_at or created_at, lifelines[row["lifeline"]]),
    )
    return int(cursor.lastrowid)


def _insert_decision(conn: Any, row: dict[str, Any], lifelines: dict[str, str]) -> int:
    created_at = utc_iso(2, 11)
    cursor = conn.execute(
        """
        INSERT INTO decisions (
            title, context, decision, reasoning, expected_outcome,
            status, created_at, updated_at, lifeline_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (row["title"], f"{DETAIL_PREFIX} {row['context']}", row["decision"], row["reasoning"], row["outcome"], row["status"], created_at, created_at, lifelines[row["lifeline"]]),
    )
    return int(cursor.lastrowid)


def _insert_association(conn: Any, row: tuple[Any, ...], entity_ids: dict[str, dict[str, int]]) -> None:
    key, from_kind, from_key, to_kind, to_key, relation, confidence, status, evidence_type, excerpt = row
    evidence = json.dumps([{"type": evidence_type, "excerpt": excerpt, "weight": confidence}], ensure_ascii=False)
    conn.execute(
        """
        INSERT INTO associations (
            id, from_kind, from_id, to_kind, to_id, relation_type,
            confidence, status, evidence, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (f"{SOURCE}:{key}", from_kind, str(entity_ids[from_kind][from_key]), to_kind, str(entity_ids[to_kind][to_key]), relation, confidence, status, evidence, utc_iso(0, 12)),
    )


def seed_demo(root: Path) -> dict[str, Any]:
    """Replace only marked demo rows and return an auditable summary."""
    os.environ["AXIOM_ROOT"] = str(root.resolve())
    os.environ.setdefault("AXIOM_LOG_PATH", "")

    from core._common import cjk_tokenize, get_db_connection, init_app_storage
    from core.audit import write_audit_log

    init_app_storage()
    conn = get_db_connection()
    try:
        removed = clear_demo(conn)
        now = utc_iso()
        lifeline_ids = {row["key"]: row["id"] for row in LIFELINES}
        for row in LIFELINES:
            conn.execute(
                """
                INSERT INTO lifelines (id, name, parent_id, order_index, created_at, updated_at)
                VALUES (?, ?, NULL, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    name = excluded.name,
                    parent_id = NULL,
                    order_index = excluded.order_index,
                    updated_at = excluded.updated_at
                """,
                (row["id"], row["name"], row["order"], now, now),
            )

        item_ids = {row["key"]: _insert_item(conn, row, lifeline_ids, cjk_tokenize) for row in ITEMS}
        memory_ids = {row["key"]: _insert_memory(conn, row, lifeline_ids, item_ids) for row in MEMORIES}
        goal_id = memory_ids["goal_demo"]
        conn.execute(
            """
            INSERT INTO goal_commitments (
                memory_id, parent_goal_id, success_criteria, target_date,
                review_cadence_days, last_reviewed_at, state, completed_at,
                created_at, updated_at
            ) VALUES (?, NULL, ?, ?, ?, ?, ?, NULL, ?, ?)
            """,
            (goal_id, "观众能复述采集→记忆→行动→关系→回顾，并指出至少一个需要用户确认的环节。", due_date(7), 7, utc_iso(0, 9), "active", now, now),
        )
        task_ids = {row["key"]: _insert_task(conn, row, lifeline_ids, memory_ids) for row in TASKS}
        decision_ids = {row["key"]: _insert_decision(conn, row, lifeline_ids) for row in DECISIONS}
        entity_ids = {"item": item_ids, "memory": memory_ids, "task": task_ids, "decision": decision_ids}
        for row in ASSOCIATIONS:
            _insert_association(conn, row, entity_ids)
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

    inserted = build_plan()["would_insert"]
    summary = {"mode": "applied", "removed": removed, "inserted": inserted, "marker": SOURCE}
    write_audit_log("atlas_demo_seed", "demo_dataset", detail=json.dumps(summary, ensure_ascii=False, sort_keys=True))
    return summary


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="生成可清理的 Axiom 产品演示内容")
    parser.add_argument("--root", type=Path, default=REPO_ROOT, help="Axiom 数据根目录")
    parser.add_argument("--apply", action="store_true", help="实际写入；默认只显示计划")
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> dict[str, Any]:
    args = parse_args(argv)
    result = seed_demo(args.root) if args.apply else build_plan()
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return result


if __name__ == "__main__":
    main()
