"""AI routes: alerts, chat, suggestions."""
from core._common import *

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

        lines.extend([
            "请根据以上信息，给出 3 到 5 条具体、可执行的下一步建议。",
            "每条建议一行，以 '- ' 开头，20 字以内。",
            "",
            "建议应该覆盖以下方面（有则提，没有则跳过）：",
            "1. 最该优先做的事（从待办任务中选，考虑优先级和截止日期）",
            "2. 长时间未完成的任务（提醒拆分或降低优先级）",
            "3. 待确认的记忆（提醒用户处理）",
            "4. 待回顾的决策（提醒复盘，特别是超过 3 天的）",
            "5. 如果没有足够数据，建议用户今天记录一些内容",
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


