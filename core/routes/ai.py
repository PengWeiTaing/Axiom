"""AI routes: alerts, chat, suggestions."""
from core._common import *

AI_CONTEXT_KEY = "ai_context"


def _fetch_ai_context(conn) -> dict:
    """统一构建 AI 所需的用户上下文，供所有 AI 端点复用。"""
    week_ago = (utc_now() - timedelta(days=7)).isoformat(timespec="seconds")
    return {
        "recent_items": conn.execute(
            "SELECT type, content, original_name, created_at FROM items WHERE created_at >= ? ORDER BY created_at DESC LIMIT 20",
            (week_ago,),
        ).fetchall(),
        "pending_tasks": conn.execute(
            "SELECT id, title, priority, due_date FROM tasks WHERE status = 'todo' ORDER BY created_at DESC LIMIT 10"
        ).fetchall(),
        "confirmed_memories": conn.execute(
            "SELECT category, content FROM memories WHERE status = 'confirmed' ORDER BY created_at DESC LIMIT 10"
        ).fetchall(),
        "pending_decisions": conn.execute(
            "SELECT title, decision FROM decisions WHERE status = 'pending' LIMIT 5"
        ).fetchall(),
        "item_total": conn.execute("SELECT COUNT(*) FROM items").fetchone()[0],
    }


def register_routes(app):
    # ===== 主动提醒 =====

    @app.route("/alerts", methods=["GET"])
    def alerts():
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            today = local_date_now()
            alerts_list = []

            # 1. No records in 3+ days
            latest_item = conn.execute("SELECT MAX(created_at) FROM items").fetchone()[0]
            if latest_item:
                latest_date = datetime.fromisoformat(latest_item).date()
                gap = (today - latest_date).days
                if gap >= 3:
                    alerts_list.append({
                        "kind": "no_records",
                        "message": f"已 {gap} 天没有新记录了，打开记录面板写点什么吧。",
                        "days": gap,
                    })
            else:
                alerts_list.append({
                    "kind": "empty",
                    "message": "还没有任何记录，从记录面板开始吧。",
                })

            # 2. Tasks overdue more than 5 days
            overdue_count = conn.execute(
                "SELECT COUNT(*) FROM tasks WHERE status = 'todo' AND due_date IS NOT NULL AND due_date < ?",
                ((today - timedelta(days=5)).isoformat(),),
            ).fetchone()[0]
            if overdue_count > 0:
                alerts_list.append({
                    "kind": "overdue_tasks",
                    "message": f"有 {overdue_count} 个任务过期超过 5 天了，去任务面板看看吧。",
                    "count": overdue_count,
                })

            # 3. Candidate memories older than 3 days
            cutoff = (utc_now() - timedelta(days=3)).isoformat(timespec="seconds")
            stale_memories = conn.execute(
                "SELECT COUNT(*) FROM memories WHERE status = 'candidate' AND created_at < ?",
                (cutoff,),
            ).fetchone()[0]
            if stale_memories > 0:
                alerts_list.append({
                    "kind": "stale_memories",
                    "message": f"有 {stale_memories} 条候选记忆等待确认超过 3 天了。",
                    "count": stale_memories,
                })

            # 4. Pending decisions
            pending_dec = conn.execute(
                "SELECT COUNT(*) FROM decisions WHERE status = 'pending'"
            ).fetchone()[0]
            if pending_dec > 0:
                alerts_list.append({
                    "kind": "pending_decisions",
                    "message": f"有 {pending_dec} 条决策等待回顾，花 5 分钟复盘一下吧。",
                    "count": pending_dec,
                })
        finally:
            conn.close()

        return ok_response({"alerts": alerts_list})


    # ===== AI 管家 =====

    @app.route("/report/weekly", methods=["GET"])
    def weekly_report():
        auth_error = require_key()
        if auth_error:
            return auth_error
        if not DEEPSEEK_API_KEY:
            return error_response(503, "ai_unavailable", "未配置 AI API key")

        conn = get_db_connection()
        try:
            week_ago = (utc_now() - timedelta(days=7)).isoformat(timespec="seconds")
            two_weeks_ago = (utc_now() - timedelta(days=14)).isoformat(timespec="seconds")

            this_week = conn.execute("SELECT COUNT(*) FROM items WHERE created_at >= ?", (week_ago,)).fetchone()[0]
            last_week = conn.execute("SELECT COUNT(*) FROM items WHERE created_at >= ? AND created_at < ?", (two_weeks_ago, week_ago)).fetchone()[0]

            tasks_done = conn.execute("SELECT COUNT(*) FROM tasks WHERE status='done' AND completed_at >= ?", (week_ago,)).fetchone()[0]
            tasks_total = conn.execute("SELECT COUNT(*) FROM tasks WHERE created_at >= ?", (week_ago,)).fetchone()[0]

            new_memories = conn.execute("SELECT COUNT(*) FROM memories WHERE created_at >= ?", (week_ago,)).fetchone()[0]

            type_rows = conn.execute(
                "SELECT type, COUNT(*) as cnt FROM items WHERE created_at >= ? GROUP BY type ORDER BY cnt DESC",
                (week_ago,),
            ).fetchall()

            streak = compute_streak()
        finally:
            conn.close()

        type_str = ", ".join(f"{r['type']} {r['cnt']}" for r in type_rows)
        trend = "↑" if this_week > last_week else "↓" if this_week < last_week else "→"

        prompt = (
            f"请生成一份温暖的 Axiom 周报（5-8句），用中文。\n"
            f"本周记录 {this_week} 条（上周 {last_week}）{trend}\n"
            f"分布: {type_str}\n"
            f"完成任务 {tasks_done}/{tasks_total}，新增记忆 {new_memories}，连续记录 {streak} 天\n"
            f"请包括：主要活动和变化、值得肯定的进步、下周 1-2 条建议。语气像关心你的朋友。"
        )
        try:
            import openai
            client = openai.OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)
            resp = client.chat.completions.create(
                model=DEEPSEEK_MODEL, messages=[{"role":"user","content":prompt}],
                max_tokens=500, temperature=0.7,
            )
            report = resp.choices[0].message.content.strip()
        except Exception as exc:
            return error_response(500, "ai_error", str(exc))

        return ok_response({
            "report": report,
            "stats": {
                "this_week_items": this_week,
                "last_week_items": last_week,
                "trend": trend,
                "tasks_done": tasks_done,
                "tasks_total": tasks_total,
                "new_memories": new_memories,
                "streak": streak,
            },
            "generated_at": utc_now().isoformat(timespec="seconds"),
        })


    @app.route("/parse/feedback", methods=["POST"])
    def parse_feedback():
        """记录 AI 解析的用户反馈，用于自进化。"""
        auth_error = require_key()
        if auth_error:
            return auth_error
        body = request.get_json(silent=True) or {}
        original_text = str(body.get("text", "")).strip()
        ai_type = str(body.get("ai_type", "")).strip()
        user_type = str(body.get("user_type", "")).strip()

        if not all([original_text, ai_type, user_type]):
            return error_response(400, "missing_fields", "需要 text, ai_type, user_type")

        # Record the correction for learning
        key = f"parse_correction:{ai_type}:{user_type}"
        current = int(get_preference(key, "0"))
        set_preference(key, str(current + 1))

        # If user corrected, note the pattern
        if ai_type != user_type:
            key2 = f"parse_misc:{ai_type}"
            misc = int(get_preference(key2, "0"))
            set_preference(key2, str(misc + 1))

        write_audit_log("parse_feedback", "ai", detail=f"{ai_type}->{user_type}: {original_text[:80]}")
        return ok_response({"message": "反馈已记录", "corrected": ai_type != user_type})


    @app.route("/parse", methods=["POST"])
    def parse_input():
        auth_error = require_key()
        if auth_error:
            return auth_error

        body = request.get_json(silent=True) or {}
        text = str(body.get("text", "")).strip()
        if not text:
            return error_response(400, "empty_text", "text 不能为空")

        if not DEEPSEEK_API_KEY:
            # Fallback: basic keyword classification
            if any(kw in text for kw in ["明天", "后天", "下周", "记得", "要做", "完成", "交", "提交"]):
                return ok_response({"type": "task", "title": text, "priority": "medium"})
            if any(kw in text for kw in ["我决定", "我选择", "我打算选", "我确定"]):
                return ok_response({"type": "decision", "title": text[:60], "decision": text})
            if len(text) > 30 and ("我" in text):
                return ok_response({"type": "memory", "category": "fact", "content": text})
            return ok_response({"type": "note", "content": text})

        prompt = (
            f"输入: {text}\n\n"
            "分类为task/memory/decision/note/health/url，只输出type值:\n"
            "task(有日期/待办) memory(关于我的陈述) decision(选择) note(其他)"
        )
        try:
            import openai
            client = openai.OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)
            resp = client.chat.completions.create(
                model=DEEPSEEK_MODEL, messages=[{"role":"user","content":prompt}],
                max_tokens=500, temperature=0.1,
                extra_body={"enable_thinking": False},
            )
            result_text = (resp.choices[0].message.content or "").strip().lower()
            if not result_text and hasattr(resp.choices[0].message, "reasoning"):
                result_text = (resp.choices[0].message.reasoning or "").strip().lower()

            # Parse response: try JSON first, then plain text
            import re as _re
            for token in ["task", "memory", "decision", "note", "health", "url"]:
                if token in result_text:
                    return ok_response({"type": token, "title": text[:60], "content": text})
            return ok_response({"type": "note", "content": text})
        except Exception:
            return ok_response({"type": "note", "content": text})


    @app.route("/brief", methods=["GET"])
    def daily_brief():
        auth_error = require_key()
        if auth_error:
            return auth_error
        if not DEEPSEEK_API_KEY:
            return error_response(503, "ai_unavailable", "未配置 AI API key")

        conn = get_db_connection()
        try:
            now = utc_now()
            today = local_date_now().isoformat()
            week_ago = (now - timedelta(days=7)).isoformat(timespec="seconds")
            streak = compute_streak()

            item_total = conn.execute("SELECT COUNT(*) FROM items").fetchone()[0]
            today_items = conn.execute(
                "SELECT COUNT(*) FROM items WHERE date(created_at) = ?", (today,)
            ).fetchone()[0]

            todo_count = conn.execute("SELECT COUNT(*) FROM tasks WHERE status='todo'").fetchone()[0]
            today_tasks = conn.execute(
                "SELECT title, priority FROM tasks WHERE status='todo' AND (due_date=? OR due_date IS NULL) ORDER BY CASE priority WHEN 'high' THEN 0 WHEN 'medium' THEN 1 ELSE 2 END LIMIT 5",
                (today,),
            ).fetchall()

            done_week = conn.execute(
                "SELECT COUNT(*) FROM tasks WHERE status='done' AND completed_at >= ?", (week_ago,)
            ).fetchone()[0]

            mem_total = conn.execute("SELECT COUNT(*) FROM memories WHERE status='confirmed'").fetchone()[0]
            dec_pending = conn.execute("SELECT COUNT(*) FROM decisions WHERE status='pending'").fetchone()[0]

            # Jianzhi module data
            jianzhi_info = ""
            try:
                jz_total = conn.execute("SELECT COUNT(*) FROM module_jianzhi_entries").fetchone()[0]
                if jz_total > 0:
                    latest_w = conn.execute(
                        "SELECT entry_data FROM module_jianzhi_entries WHERE entry_type='weight' ORDER BY recorded_at DESC LIMIT 1"
                    ).fetchone()
                    week_ago_date = (local_date_now() - timedelta(days=7)).isoformat()
                    jz_week = conn.execute(
                        "SELECT COUNT(*) FROM module_jianzhi_entries WHERE recorded_at >= ?", (week_ago_date,)
                    ).fetchone()[0]
                    jianzhi_info = f"减脂: 共{jz_total}条记录，本周{jz_week}条"
                    if latest_w:
                        import json as _json_mod
                        wd = _json_mod.loads(latest_w["entry_data"])
                        if wd.get("weight_kg"):
                            jianzhi_info += f"，最新体重{wd['weight_kg']}kg"
            except Exception:
                pass  # table might not exist yet

            # Get latest daily review AI analysis
            artifacts = list_review_artifacts()
            review_text = ""
            for a in artifacts:
                if a.get("group") == "review" and a.get("window") == "daily":
                    preview = a.get("preview", "")
                    if "AI" in preview:
                        review_text = preview
                        break
        finally:
            conn.close()

        lines = [
            "你是 Axiom 个人外脑的每日简报助手。请生成一段温暖的早安简报（4-6句），包含：",
            f"连续记录 {streak} 天，总共 {item_total} 条记录，今天已记 {today_items} 条",
            f"待办 {todo_count} 个，本周完成 {done_week} 个任务",
            f"已确认 {mem_total} 条记忆，{dec_pending} 条决策待回顾",
        ]
        if jianzhi_info:
            lines.append(jianzhi_info)
        if today_tasks:
            lines.append("今日任务: " + ", ".join(f"[{t['priority']}]{t['title']}" for t in today_tasks))
        if review_text and len(review_text) > 20:
            lines.append(f"昨日回顾: {review_text[:200]}")
        lines.append("用中文，语气像朋友，不需要标题。如果今天是周一可以说'新的一周'。")

        prompt = "\n".join(lines)
        try:
            import openai
            client = openai.OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)
            resp = client.chat.completions.create(
                model=DEEPSEEK_MODEL, messages=[{"role":"user","content":prompt}],
                max_tokens=300, temperature=0.7,
            )
            brief = resp.choices[0].message.content.strip()
        except Exception as exc:
            logger.exception("brief failed")
            return error_response(500, "ai_error", str(exc))

        return ok_response({"brief": brief, "generated_at": utc_now().isoformat(timespec="seconds")})


    @app.route("/chat", methods=["POST"])
    def ai_chat():
        auth_error = require_key()
        if auth_error:
            return auth_error

        if not DEEPSEEK_API_KEY:
            return error_response(503, "ai_unavailable", "未配置 AI API key")

        body = request.get_json(silent=True) or {}
        user_message = str(body.get("message", "")).strip()
        if not user_message:
            return error_response(400, "empty_message", "message 不能为空")

        history = body.get("history", [])
        if not isinstance(history, list):
            history = []

        conn = get_db_connection()
        try:
            now = utc_now()
            week_ago = (now - timedelta(days=7)).isoformat(timespec="seconds")

            item_total = conn.execute("SELECT COUNT(*) FROM items").fetchone()[0]

            recent_items = conn.execute(
                "SELECT type, content, original_name, created_at FROM items WHERE created_at >= ? ORDER BY created_at DESC LIMIT 15",
                (week_ago,),
            ).fetchall()

            pending_tasks = conn.execute(
                "SELECT title, priority, due_date FROM tasks WHERE status = 'todo' ORDER BY created_at DESC LIMIT 10"
            ).fetchall()

            confirmed_memories = conn.execute(
                "SELECT category, content FROM memories WHERE status = 'confirmed' ORDER BY created_at DESC LIMIT 10"
            ).fetchall()

            pending_decisions = conn.execute(
                "SELECT title, decision FROM decisions WHERE status = 'pending' LIMIT 5"
            ).fetchall()
        finally:
            conn.close()

        context_lines = [
            "你是 Axiom 个人外脑系统的 AI 管家。你叫 Axi。",
            "你了解用户的所有数据，能回答问题、给建议、帮分析。",
            "回复简洁（3-5 句），用温暖的中文。",
            "",
            "## 当前状态",
            f"总条目: {item_total}，连续: {compute_streak()}天",
            f"最近 7 天新增: {len(recent_items)} 条",
            f"待办任务: {len(pending_tasks)} 条",
            f"已确认记忆: {len(confirmed_memories)} 条",
            f"待回顾决策: {len(pending_decisions)} 条",
            "",
        ]

        if pending_tasks:
            context_lines.append("## 待办任务")
            for t in pending_tasks[:5]:
                context_lines.append(f"- [{t['priority']}] {t['title']}")
            context_lines.append("")

        if confirmed_memories:
            context_lines.append("## 近期记忆")
            for m in confirmed_memories[:5]:
                context_lines.append(f"- [{m['category']}] {m['content']}")
            context_lines.append("")

        if recent_items:
            context_lines.append("## 最近记录")
            for item in recent_items[:8]:
                text = (item["content"] or item["original_name"] or "")[:100]
                context_lines.append(f"- [{item['type']}] {text}")
            context_lines.append("")

        system_prompt = "\n".join(context_lines)

        messages = [{"role": "system", "content": system_prompt}]
        for h in history[-10:]:
            messages.append({"role": h.get("role", "user"), "content": h.get("content", "")})
        messages.append({"role": "user", "content": user_message})

        try:
            import openai
            client = openai.OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)
            response = client.chat.completions.create(
                model=DEEPSEEK_MODEL,
                messages=messages,
                max_tokens=600,
                temperature=0.7,
            )
            reply = response.choices[0].message.content.strip()
        except Exception as exc:
            logger.exception("AI chat failed")
            return error_response(500, "ai_error", str(exc))

        return ok_response({"reply": reply})


    @app.route("/chat/stream", methods=["POST"])
    def ai_chat_stream():
        auth_error = require_key()
        if auth_error:
            return auth_error

        if not DEEPSEEK_API_KEY:
            return error_response(503, "ai_unavailable", "未配置 AI API key")

        body = request.get_json(silent=True) or {}
        user_message = str(body.get("message", "")).strip()
        if not user_message:
            return error_response(400, "empty_message", "message 不能为空")

        history = body.get("history", [])
        if not isinstance(history, list):
            history = []

        conn = get_db_connection()
        try:
            now = utc_now()
            week_ago = (now - timedelta(days=7)).isoformat(timespec="seconds")
            item_total = conn.execute("SELECT COUNT(*) FROM items").fetchone()[0]
            recent_items = conn.execute(
                "SELECT type, content, original_name, created_at FROM items WHERE created_at >= ? ORDER BY created_at DESC LIMIT 15",
                (week_ago,),
            ).fetchall()
            pending_tasks = conn.execute(
                "SELECT title, priority, due_date FROM tasks WHERE status = 'todo' ORDER BY created_at DESC LIMIT 10"
            ).fetchall()
            confirmed_memories = conn.execute(
                "SELECT category, content FROM memories WHERE status = 'confirmed' ORDER BY created_at DESC LIMIT 10"
            ).fetchall()
            pending_decisions = conn.execute(
                "SELECT title, decision FROM decisions WHERE status = 'pending' LIMIT 5"
            ).fetchall()
        finally:
            conn.close()

        context_lines = [
            "你是 Axiom 个人外脑系统的 AI 管家。你叫 Axi。",
            "回复简洁（3-5句），用温暖的中文。支持 Markdown 格式。",
            "",
            f"总条目: {item_total}，连续: {compute_streak()}天，待办: {len(pending_tasks)}，记忆: {len(confirmed_memories)}",
        ]
        if pending_tasks:
            context_lines.append("待办: " + ", ".join(t["title"] for t in pending_tasks[:5]))
        if recent_items:
            context_lines.append("最近: " + ", ".join(((r["content"] or r["original_name"] or "")[:60]) for r in recent_items[:5]))

        system_prompt = "\n".join(context_lines)

        messages = [{"role": "system", "content": system_prompt}]
        for h in history[-10:]:
            messages.append({"role": h.get("role", "user"), "content": h.get("content", "")})
        messages.append({"role": "user", "content": user_message})

        def generate():
            try:
                import openai
                client = openai.OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)
                response = client.chat.completions.create(
                    model=DEEPSEEK_MODEL,
                    messages=messages,
                    max_tokens=600,
                    temperature=0.7,
                    stream=True,
                )
                for chunk in response:
                    delta = chunk.choices[0].delta
                    if delta.content:
                        yield f"data: {json.dumps({'content': delta.content})}\n\n"
                yield "data: [DONE]\n\n"
            except Exception as exc:
                logger.exception("AI chat stream failed")
                yield f"data: {json.dumps({'error': str(exc)})}\n\n"

        return Response(
            generate(),
            mimetype="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "X-Accel-Buffering": "no",
            },
        )


    # ===== AI 建议 =====

    @app.route("/suggestions", methods=["GET"])
    def ai_suggestions():
        auth_error = require_key()
        if auth_error:
            return auth_error

        now = utc_now().isoformat(timespec="seconds")
        if SUGGESTIONS_CACHE["text"] and SUGGESTIONS_CACHE["generated_at"]:
            age = (utc_now() - datetime.fromisoformat(SUGGESTIONS_CACHE["generated_at"])).total_seconds()
            if age < SUGGESTIONS_CACHE["ttl_seconds"]:
                return ok_response({
                    "suggestions": SUGGESTIONS_CACHE["text"],
                    "generated_at": SUGGESTIONS_CACHE["generated_at"],
                    "cached": True,
                })

        if not DEEPSEEK_API_KEY:
            return error_response(503, "ai_unavailable", "未配置 AI API key")

        conn = get_db_connection()
        try:
            week_ago = (utc_now() - timedelta(days=7)).isoformat(timespec="seconds")

            recent_items = conn.execute(
                "SELECT id, type, content, original_name, created_at FROM items WHERE created_at >= ? ORDER BY created_at DESC LIMIT 30",
                (week_ago,),
            ).fetchall()

            pending_tasks = conn.execute(
                "SELECT id, title, priority, due_date, created_at FROM tasks WHERE status = 'todo' ORDER BY created_at DESC LIMIT 10"
            ).fetchall()

            candidate_memories = conn.execute(
                "SELECT id, category, content FROM memories WHERE status = 'candidate' ORDER BY created_at DESC LIMIT 5"
            ).fetchall()

            pending_decisions = conn.execute(
                "SELECT id, title, decision, expected_outcome, created_at FROM decisions WHERE status = 'pending' ORDER BY created_at DESC LIMIT 5"
            ).fetchall()
        finally:
            conn.close()

        # Build context
        lines = ["你是 Axiom 个人外脑系统的 AI 助手。以下是用户最近一周的状态摘要：", ""]

        if recent_items:
            lines.append("## 最近记录")
            for r in recent_items:
                text = (r["content"] or r["original_name"] or "")[:120]
                lines.append(f"- [{r['type']}] {text}")
            lines.append("")

        if pending_tasks:
            lines.append("## 待办任务")
            for r in pending_tasks:
                lines.append(f"- [{r['priority']}] {r['title']}")
            lines.append("")

        if candidate_memories:
            lines.append("## 待确认记忆")
            for r in candidate_memories:
                lines.append(f"- [{r['category']}] {r['content']}")
            lines.append("")

        if pending_decisions:
            lines.append("## 待回顾决策")
            for r in pending_decisions:
                lines.append(f"- {r['title']}：{r['decision'][:80]}")
            lines.append("")

        if not recent_items and not pending_tasks:
            lines.append("用户最近一周没有新增记录。")
            lines.append("")

        # Add trend context
        today = local_date_now()
        daily_counts = []
        for i in range(6, -1, -1):
            d = (today - timedelta(days=i)).isoformat()
            daily_counts.append(f"{d[-5:]}:{len([r for r in recent_items if (r['created_at'] or '')[:10] == d])}")
        lines.append(f"每日活跃: {', '.join(daily_counts)}")
        lines.append("")

        lines.extend([
            "请根据以上信息，给出 3 到 5 条具体、可执行的下一步建议。",
            "每条建议一行，以 '- ' 开头，20 字以内。",
            "",
            "注意观察规律（有则提，没有则跳过）：",
            "1. 活跃度下降趋势 → 鼓励恢复节奏",
            "2. 某类记录增多 → 肯定并建议继续",
            "3. 某类记录缺失（如运动） → 温和提醒",
            "4. 过多未完成 → 建议优先排序或放弃",
            "",
            "用温暖、鼓励的语气，中文输出。不需要问好或结尾。",
        ])

        prompt = "\n".join(lines)

        try:
            import openai
            client = openai.OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)
            response = client.chat.completions.create(
                model=DEEPSEEK_MODEL,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=500,
                temperature=0.7,
            )
            text = response.choices[0].message.content.strip()
        except Exception as exc:
            logger.exception("AI suggestions failed")
            return error_response(500, "ai_error", str(exc))

        SUGGESTIONS_CACHE["text"] = text
        SUGGESTIONS_CACHE["generated_at"] = now

        return ok_response({
            "suggestions": text,
            "generated_at": now,
            "cached": False,
        })


