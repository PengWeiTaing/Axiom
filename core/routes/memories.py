"""Memory routes."""
import sqlite3
from datetime import timedelta

from flask import request

from core._common import (
    DEEPSEEK_API_KEY,
    DEEPSEEK_BASE_URL,
    DEEPSEEK_MODEL,
    DEFAULT_PAGE_SIZE,
    MAX_PAGE_SIZE,
    MEMORY_CATEGORIES,
    MEMORY_CATEGORY_LABELS,
    MEMORY_STATUSES,
    MEMORY_STATUS_LABELS,
    error_response,
    get_db_connection,
    get_type_label,
    logger,
    ok_response,
    parse_positive_int,
    require_key,
    utc_now,
    write_audit_log,
)

def register_routes(app):
    # ===== 记忆路由 =====

    MEMORY_SELECT_FIELDS = """
        id, category, content, detail, status,
        source_item_id, source_text, created_at, updated_at
    """


    def row_to_memory(row: sqlite3.Row) -> dict:
        return {
            "id": row["id"],
            "category": row["category"],
            "category_label": MEMORY_CATEGORY_LABELS.get(row["category"], row["category"]),
            "content": row["content"],
            "detail": row["detail"],
            "status": row["status"],
            "status_label": MEMORY_STATUS_LABELS.get(row["status"], row["status"]),
            "source_item_id": row["source_item_id"],
            "source_text": row["source_text"],
            "created_at": row["created_at"],
            "updated_at": row["updated_at"],
            "linked_tasks": [],
            "task_progress": None,
        }


    def read_memory_filter_args() -> dict:
        category = request.args.get("category", "").strip()
        status = request.args.get("status", "").strip()
        page = parse_positive_int(request.args.get("page"), "page", 1)
        page_size = parse_positive_int(request.args.get("page_size"), "page_size", DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE)
        return {"category": category, "status": status, "page": page, "page_size": page_size}


    def build_memory_filter_conditions(category: str, status: str) -> tuple[list[str], list]:
        conditions: list[str] = []
        params: list = []
        if category:
            if category not in MEMORY_CATEGORIES:
                raise ValueError(f"category 不支持: {category}")
            conditions.append("category = ?")
            params.append(category)
        if status:
            if status not in MEMORY_STATUSES:
                raise ValueError(f"status 不支持: {status}")
            conditions.append("status = ?")
            params.append(status)
        return conditions, params


    @app.route("/memories/stats", methods=["GET"])
    def memory_stats():
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            total = conn.execute("SELECT COUNT(*) FROM memories").fetchone()[0]
            category_rows = conn.execute(
                "SELECT category, status, COUNT(*) AS count FROM memories GROUP BY category, status ORDER BY category, status"
            ).fetchall()
        finally:
            conn.close()

        by_category: dict[str, dict] = {}
        for row in category_rows:
            entry = by_category.setdefault(row["category"], {"total": 0, "confirmed": 0, "candidate": 0, "archived": 0})
            entry[row["status"]] = row["count"]
            entry["total"] += row["count"]

        return ok_response({
            "total": total,
            "by_category": {
                cat: {
                    "label": MEMORY_CATEGORY_LABELS.get(cat, cat),
                    **counts,
                }
                for cat, counts in by_category.items()
            },
        })


    @app.route("/memories", methods=["GET", "POST"])
    def memories():
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            if request.method == "POST":
                body = request.get_json(silent=True) or {}
                category = str(body.get("category", "fact")).strip()
                content = str(body.get("content", "")).strip()
                detail = str(body.get("detail", "")).strip() or None
                source_item_id = body.get("source_item_id")
                source_text = str(body.get("source_text", "")).strip() or None

                if category not in MEMORY_CATEGORIES:
                    return error_response(400, "invalid_category", f"category 不支持: {category}")
                if not content:
                    return error_response(400, "missing_content", "content 不能为空")

                now = utc_now().isoformat(timespec="seconds")
                cursor = conn.execute(
                    "INSERT INTO memories (category, content, detail, status, source_item_id, source_text, created_at, updated_at) VALUES (?, ?, ?, 'candidate', ?, ?, ?, ?)",
                    (category, content, detail, source_item_id, source_text, now, now),
                )
                conn.commit()
                memory_id = cursor.lastrowid
                write_audit_log("memory_create", "memory", memory_id)
                row = conn.execute(f"SELECT {MEMORY_SELECT_FIELDS} FROM memories WHERE id = ?", (memory_id,)).fetchone()
                return ok_response({"memory": row_to_memory(row)}, 201)

            filters = read_memory_filter_args()
            conditions, params = build_memory_filter_conditions(filters["category"], filters["status"])
            where_clause = ("WHERE " + " AND ".join(conditions)) if conditions else ""
            count_row = conn.execute(f"SELECT COUNT(*) FROM memories {where_clause}", params).fetchone()
            total = count_row[0]
            total_pages = max(1, (total + filters["page_size"] - 1) // filters["page_size"])
            offset = (filters["page"] - 1) * filters["page_size"]
            rows = conn.execute(
                f"SELECT {MEMORY_SELECT_FIELDS} FROM memories {where_clause} ORDER BY created_at DESC LIMIT ? OFFSET ?",
                params + [filters["page_size"], offset],
            ).fetchall()

            goal_ids = [r["id"] for r in rows if r["category"] == "goal"]
            task_counts = {}
            if goal_ids:
                placeholders = ",".join("?" for _ in goal_ids)
                task_rows = conn.execute(
                    f"SELECT memory_id, status, COUNT(*) as cnt FROM tasks WHERE memory_id IN ({placeholders}) GROUP BY memory_id, status",
                    goal_ids,
                ).fetchall()
                for tr in task_rows:
                    entry = task_counts.setdefault(tr["memory_id"], {"done": 0, "total": 0})
                    entry["total"] += tr["cnt"]
                    if tr["status"] == "done":
                        entry["done"] = tr["cnt"]

            memories_list = []
            for row in rows:
                m = row_to_memory(row)
                if row["category"] == "goal" and row["id"] in task_counts:
                    m["task_progress"] = task_counts[row["id"]]
                memories_list.append(m)

            return ok_response({
                "page": filters["page"],
                "page_size": filters["page_size"],
                "total": total,
                "total_pages": total_pages,
                "memories": memories_list,
            })
        except ValueError as exc:
            return error_response(400, "invalid_filter", str(exc))
        finally:
            conn.close()


    @app.route("/memories/<int:memory_id>", methods=["GET", "PUT", "DELETE"])
    def memory_detail(memory_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            row = conn.execute(f"SELECT {MEMORY_SELECT_FIELDS} FROM memories WHERE id = ?", (memory_id,)).fetchone()
            if row is None:
                return error_response(404, "not_found", "记忆不存在")

            if request.method == "GET":
                linked_tasks = conn.execute(
                    "SELECT id, title, status, priority FROM tasks WHERE memory_id = ? ORDER BY created_at DESC LIMIT 20",
                    (memory_id,),
                ).fetchall()
                memory = row_to_memory(row)
                memory["linked_tasks"] = [dict(t) for t in linked_tasks]
                if linked_tasks:
                    done = sum(1 for t in linked_tasks if t["status"] == "done")
                    memory["task_progress"] = {"done": done, "total": len(linked_tasks)}

                # 反向链：附带 source item 摘要，避免前端再发一次请求。
                # source_item_id 已是 SET NULL 字段，item 若被删则这里为 None。
                source_item = None
                source_item_id = row["source_item_id"]
                if source_item_id is not None:
                    item_row = conn.execute(
                        "SELECT id, type, content, original_name, derived_text, transcript_text, created_at "
                        "FROM items WHERE id = ?",
                        (source_item_id,),
                    ).fetchone()
                    if item_row is not None:
                        snippet_source = ""
                        for field in ("content", "original_name", "derived_text", "transcript_text"):
                            value = item_row[field]
                            if value and str(value).strip():
                                snippet_source = str(value).strip()
                                break
                        source_item = {
                            "id": item_row["id"],
                            "type": item_row["type"],
                            "type_label": get_type_label(item_row["type"]),
                            "snippet": snippet_source[:120],
                            "created_at": item_row["created_at"],
                        }
                memory["source_item"] = source_item

                return ok_response({"memory": memory})

            if request.method == "DELETE":
                conn.execute("DELETE FROM memories WHERE id = ?", (memory_id,))
                conn.commit()
                write_audit_log("memory_delete", "memory", memory_id)
                return ok_response({"deleted": memory_id})

            body = request.get_json(silent=True) or {}
            category = str(body.get("category", row["category"])).strip()
            content = str(body.get("content", row["content"])).strip()
            detail = str(body.get("detail", row["detail"] or "")).strip() or None
            status = str(body.get("status", row["status"])).strip()

            if category not in MEMORY_CATEGORIES:
                return error_response(400, "invalid_category", f"category 不支持: {category}")
            if not content:
                return error_response(400, "missing_content", "content 不能为空")
            if status not in MEMORY_STATUSES:
                return error_response(400, "invalid_status", f"status 不支持: {status}")

            now = utc_now().isoformat(timespec="seconds")
            conn.execute(
                "UPDATE memories SET category = ?, content = ?, detail = ?, status = ?, updated_at = ? WHERE id = ?",
                (category, content, detail, status, now, memory_id),
            )
            conn.commit()
            write_audit_log("memory_update", "memory", memory_id)
            row = conn.execute(f"SELECT {MEMORY_SELECT_FIELDS} FROM memories WHERE id = ?", (memory_id,)).fetchone()
            return ok_response({"memory": row_to_memory(row)})
        except ValueError as exc:
            return error_response(400, "invalid_input", str(exc))
        finally:
            conn.close()


    @app.route("/memories/<int:memory_id>/confirm", methods=["POST"])
    def confirm_memory(memory_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            row = conn.execute("SELECT id FROM memories WHERE id = ?", (memory_id,)).fetchone()
            if row is None:
                return error_response(404, "not_found", "记忆不存在")
            now = utc_now().isoformat(timespec="seconds")
            conn.execute("UPDATE memories SET status = 'confirmed', updated_at = ? WHERE id = ?", (now, memory_id))
            conn.commit()
            write_audit_log("memory_confirm", "memory", memory_id)
            row = conn.execute(f"SELECT {MEMORY_SELECT_FIELDS} FROM memories WHERE id = ?", (memory_id,)).fetchone()
            return ok_response({"memory": row_to_memory(row)})
        finally:
            conn.close()


    @app.route("/memories/suggest", methods=["POST"])
    def suggest_memories():
        auth_error = require_key()
        if auth_error:
            return auth_error

        if not DEEPSEEK_API_KEY:
            return error_response(503, "ai_unavailable", "未配置 AI API key")

        conn = get_db_connection()
        try:
            week_ago = (utc_now() - timedelta(days=7)).isoformat(timespec="seconds")
            rows = conn.execute(
                "SELECT id, type, content, original_name, derived_text, transcript_text FROM items WHERE created_at >= ? ORDER BY created_at DESC LIMIT 20",
                (week_ago,),
            ).fetchall()
        finally:
            conn.close()

        if not rows:
            return ok_response({"suggestions": []})

        lines = [
            "你是一个个人知识助手。请从以下用户记录中提取可以作为长期记忆的信息。",
            "每条建议一行，格式为：item_id|category|content",
            "- item_id 是上下文行最前面 [id=N] 里的 N，必须照抄；如果一条建议综合多条记录无法归到单一来源，写 0。",
            "- category 可选：fact（事实）、preference（偏好）、goal（目标）、relationship（人际关系）、event（事件）",
            "- content 是记忆正文，简短直接，不要带格式符。",
            "只提取稳定、值得长期保留的信息，不要提取临时或琐碎的内容。",
            "最多提取 5 条。如果没有值得长期记忆的内容，输出 NONE。",
            "",
        ]
        fed_ids: set[int] = set()
        for r in rows:
            text = (r["content"] or r["original_name"] or r["derived_text"] or r["transcript_text"] or "")[:200]
            if text.strip():
                fed_ids.add(r["id"])
                lines.append(f"- [id={r['id']}] [{r['type']}] {text}")

        prompt = "\n".join(lines)

        try:
            import openai
            client = openai.OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)
            response = client.chat.completions.create(
                model=DEEPSEEK_MODEL,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=400,
                temperature=0.5,
            )
            text = response.choices[0].message.content.strip()
        except Exception as exc:
            logger.exception("memory suggest failed")
            return error_response(500, "ai_error", str(exc))

        if text.upper().startswith("NONE"):
            return ok_response({"suggestions": []})

        suggestions = []
        for line in text.split("\n"):
            line = line.strip().lstrip("- ").strip()
            if "|" not in line:
                continue
            parts = line.split("|", 2)
            # 兼容旧 2 段格式 category|content
            if len(parts) == 2:
                source_item_id: int | None = None
                cat = parts[0].strip()
                content = parts[1].strip()
            else:
                raw_id = parts[0].strip()
                try:
                    parsed_id = int(raw_id)
                except ValueError:
                    parsed_id = 0
                source_item_id = parsed_id if parsed_id in fed_ids and parsed_id != 0 else None
                cat = parts[1].strip()
                content = parts[2].strip()
            if cat in MEMORY_CATEGORIES and content:
                suggestions.append({
                    "category": cat,
                    "content": content,
                    "source_item_id": source_item_id,
                })

        return ok_response({"suggestions": suggestions})


    @app.route("/memories/<int:memory_id>/archive", methods=["POST"])
    def archive_memory(memory_id: int):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            row = conn.execute("SELECT id FROM memories WHERE id = ?", (memory_id,)).fetchone()
            if row is None:
                return error_response(404, "not_found", "记忆不存在")
            now = utc_now().isoformat(timespec="seconds")
            conn.execute("UPDATE memories SET status = 'archived', updated_at = ? WHERE id = ?", (now, memory_id))
            conn.commit()
            write_audit_log("memory_archive", "memory", memory_id)
            row = conn.execute(f"SELECT {MEMORY_SELECT_FIELDS} FROM memories WHERE id = ?", (memory_id,)).fetchone()
            return ok_response({"memory": row_to_memory(row)})
        finally:
            conn.close()


