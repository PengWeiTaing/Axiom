"""Browse routes: recent, search, stats, overview."""
import json
import sqlite3

from flask import request

from core._common import (
    DEEPSEEK_API_KEY,
    DEEPSEEK_BASE_URL,
    DEEPSEEK_MODEL,
    ITEM_JOIN_SELECT_FIELDS,
    ITEM_LIST_SELECT_FIELDS,
    build_item_filter_conditions,
    build_overview_payload,
    build_overview_text,
    build_stats_payload,
    error_response,
    escape_fts_query,
    get_db_connection,
    join_conditions,
    logger,
    ok_response,
    read_created_range,
    read_item_type_filter,
    read_pagination,
    read_preview_chars,
    read_processing_override_filter,
    read_processing_state_filter,
    read_recent_limit,
    read_source_filter,
    read_storage_filter,
    require_key,
    row_to_item,
)

def register_routes(app):
        @app.route("/stats", methods=["GET"])
        def stats():
            auth_error = require_key()
            if auth_error:
                return auth_error
    
            return ok_response(build_stats_payload())
    
    
        @app.route("/overview", methods=["GET"])
        def overview():
            auth_error = require_key()
            if auth_error:
                return auth_error
    
            try:
                recent_limit = read_recent_limit()
                preview_chars = read_preview_chars()
            except ValueError as exc:
                return error_response(400, "invalid_overview_param", str(exc))
    
            return ok_response(build_overview_payload(recent_limit, preview_chars))
    
    
        @app.route("/overview/text", methods=["GET"])
        def overview_text():
            auth_error = require_key()
            if auth_error:
                return auth_error
    
            try:
                recent_limit = read_recent_limit()
                preview_chars = read_preview_chars()
            except ValueError as exc:
                return error_response(400, "invalid_overview_param", str(exc))
    
            payload = build_overview_payload(recent_limit, preview_chars)
            body = build_overview_text(payload, preview_chars)
            return app.response_class(body, mimetype="text/plain")
    
    
        @app.route("/recent", methods=["GET"])
        def recent_items():
            auth_error = require_key()
            if auth_error:
                return auth_error
    
            try:
                page, page_size = read_pagination()
            except ValueError as exc:
                return error_response(400, "invalid_pagination", str(exc))
    
            sort = request.args.get("sort", "newest").strip().lower()
            if sort not in {"newest", "oldest"}:
                return error_response(400, "invalid_sort", "sort 只能是 newest 或 oldest")
    
            try:
                item_type = read_item_type_filter()
            except ValueError as exc:
                return error_response(400, "invalid_type", str(exc))
    
            try:
                storage = read_storage_filter()
            except ValueError as exc:
                return error_response(400, "invalid_storage", str(exc))
    
            try:
                created_from, created_to = read_created_range()
            except ValueError as exc:
                return error_response(400, "invalid_created_range", str(exc))
    
            try:
                processing_state = read_processing_state_filter()
            except ValueError as exc:
                return error_response(400, "invalid_processing_state", str(exc))
    
            try:
                processing_override = read_processing_override_filter()
            except ValueError as exc:
                return error_response(400, "invalid_processing_override_filter", str(exc))
    
            source = read_source_filter()
            filter_conditions, filter_params = build_item_filter_conditions(
                item_type,
                storage,
                source,
                created_from,
                created_to,
                processing_state,
                processing_override,
            )
            where_clause = join_conditions(filter_conditions, "WHERE")
    
            order_clause = "id DESC" if sort == "newest" else "id ASC"
            offset = (page - 1) * page_size
    
            conn = get_db_connection()
            try:
                total = conn.execute(
                    f"SELECT COUNT(*) AS total FROM items {where_clause}",
                    filter_params,
                ).fetchone()["total"]
                rows = conn.execute(
                    f"""
                    SELECT {ITEM_LIST_SELECT_FIELDS}
                    FROM items
                    {where_clause}
                    ORDER BY {order_clause}
                    LIMIT ? OFFSET ?
                    """,
                    (*filter_params, page_size, offset),
                ).fetchall()
            finally:
                conn.close()
    
            total_pages = (total + page_size - 1) // page_size
            return ok_response(
                {
                    "sort": sort,
                    "type": item_type,
                    "storage": storage,
                    "source": source,
                    "created_from": created_from,
                    "created_to": created_to,
                    "processing_state": processing_state,
                    "processing_override": processing_override,
                    "page": page,
                    "page_size": page_size,
                    "total": total,
                    "total_pages": total_pages,
                    "items": [row_to_item(row) for row in rows],
                }
            )
    
    
        @app.route("/search", methods=["GET"])
        def search_items():
            auth_error = require_key()
            if auth_error:
                return auth_error
    
            query = request.args.get("q", "").strip()
            if not query:
                return error_response(400, "empty_query", "q 不能为空")
    
            try:
                page, page_size = read_pagination()
            except ValueError as exc:
                return error_response(400, "invalid_pagination", str(exc))
    
            sort = request.args.get("sort", "relevance").strip().lower()
            if sort not in {"relevance", "newest", "oldest"}:
                return error_response(400, "invalid_sort", "sort 只能是 relevance、newest 或 oldest")
    
            try:
                item_type = read_item_type_filter()
            except ValueError as exc:
                return error_response(400, "invalid_type", str(exc))
    
            try:
                storage = read_storage_filter()
            except ValueError as exc:
                return error_response(400, "invalid_storage", str(exc))
    
            try:
                created_from, created_to = read_created_range()
            except ValueError as exc:
                return error_response(400, "invalid_created_range", str(exc))
    
            try:
                processing_state = read_processing_state_filter()
            except ValueError as exc:
                return error_response(400, "invalid_processing_state", str(exc))
    
            try:
                processing_override = read_processing_override_filter()
            except ValueError as exc:
                return error_response(400, "invalid_processing_override_filter", str(exc))
    
            source = read_source_filter()
            fts_query = escape_fts_query(query)
            if fts_query == '""':
                return ok_response({
                    "query": query, "sort": sort, "type": item_type, "storage": storage,
                    "source": source, "created_from": created_from, "created_to": created_to,
                    "processing_state": processing_state, "processing_override": processing_override,
                    "page": page, "page_size": page_size, "total": 0, "total_pages": 0, "items": [],
                })
            offset = (page - 1) * page_size
    
            if sort == "newest":
                order_clause = "items.id DESC"
            elif sort == "oldest":
                order_clause = "items.id ASC"
            else:
                order_clause = "score DESC"
    
            filter_conditions, filter_params = build_item_filter_conditions(
                item_type,
                storage,
                source,
                created_from,
                created_to,
                processing_state,
                processing_override,
            )
            filter_clause = join_conditions(filter_conditions, "AND")
            extra_where = f" {filter_clause}" if filter_clause else ""
    
            mode = request.args.get("mode", "").strip()
            use_semantic = mode == "semantic"
    
            conn = get_db_connection()
            try:
                total = conn.execute(
                    f"""
                    SELECT COUNT(*) AS total
                    FROM items_fts
                    JOIN items ON items_fts.rowid = items.id
                    WHERE items_fts MATCH ?{extra_where}
                    """,
                    (fts_query, *filter_params),
                ).fetchone()["total"]
                rows = []
            finally:
                conn.close()
    
            # Semantic search: FTS5 found nothing or user explicitly requested
            if (total == 0 or use_semantic) and DEEPSEEK_API_KEY:
                conn = get_db_connection()
                try:
                    candidate_rows = conn.execute(
                        f"SELECT id, type, content, original_name FROM items WHERE 1=1{extra_where} ORDER BY id DESC LIMIT 50",
                        filter_params,
                    ).fetchall()
                finally:
                    conn.close()
    
                if candidate_rows:
                    lines = [f"查询: {query}", "从以下条目中找出最相关的内容（最多10条），每行一个 id:", ""]
                    for r in candidate_rows:
                        text = (r["content"] or r["original_name"] or "")[:150]
                        lines.append(f"id={r['id']}: {text}")
    
                    try:
                        import openai
                        client = openai.OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)
                        resp = client.chat.completions.create(
                            model=DEEPSEEK_MODEL,
                            messages=[{"role": "user", "content": "\n".join(lines)}],
                            max_tokens=200,
                            temperature=0.3,
                        )
                        ai_text = resp.choices[0].message.content.strip()
                        matched_ids = set()
                        for line in ai_text.split("\n"):
                            for part in line.strip().lstrip("- ").replace(",", " ").split():
                                part = part.strip().replace("id=", "").replace("ID=", "")
                                try:
                                    matched_ids.add(int(part))
                                except ValueError:
                                    pass
    
                        if matched_ids:
                            conn = get_db_connection()
                            try:
                                placeholders = ",".join("?" for _ in matched_ids)
                                rows = conn.execute(
                                    f"SELECT {ITEM_JOIN_SELECT_FIELDS}, 0 AS score FROM items WHERE id IN ({placeholders}) ORDER BY id DESC LIMIT ?",
                                    list(matched_ids) + [page_size],
                                ).fetchall()
                                total = len(rows)
                            finally:
                                conn.close()
                    except Exception:
                        pass  # AI failed, return empty
    
            if not rows and total > 0:
                conn = get_db_connection()
                try:
                    rows = conn.execute(
                        f"""
                        SELECT
                            {ITEM_JOIN_SELECT_FIELDS},
                            -rank AS score
                        FROM items_fts
                        JOIN items ON items_fts.rowid = items.id
                        WHERE items_fts MATCH ?{extra_where}
                        ORDER BY {order_clause}
                        LIMIT ? OFFSET ?
                        """,
                        (fts_query, *filter_params, page_size, offset),
                    ).fetchall()
                finally:
                    conn.close()
    
            total_pages = (total + page_size - 1) // page_size
            return ok_response(
                {
                    "query": query,
                    "sort": sort,
                    "type": item_type,
                    "storage": storage,
                    "source": source,
                    "created_from": created_from,
                    "created_to": created_to,
                    "processing_state": processing_state,
                    "processing_override": processing_override,
                    "page": page,
                    "page_size": page_size,
                    "total": total,
                    "total_pages": total_pages,
                    "items": [row_to_item(row, include_score=(sort == "relevance")) for row in rows],
                }
            )


        @app.route("/timeline", methods=["GET"])
        def timeline():
            """统一时间流：items/tasks/memories/decisions 的创建+状态变更事件合流。"""
            auth_error = require_key()
            if auth_error:
                return auth_error

            try:
                page, page_size = read_pagination(default_page_size=30)
            except ValueError as exc:
                return error_response(400, "invalid_pagination", str(exc))

            kinds_raw = request.args.get("kinds", "").strip()
            allowed = {"item", "task", "memory", "decision"}
            kinds = [k for k in kinds_raw.split(",") if k.strip()] if kinds_raw else list(allowed)
            for k in kinds:
                if k not in allowed:
                    return error_response(400, "invalid_kinds", f"kinds 含非法值: {k}")

            conn = get_db_connection()
            try:
                unions = []
                count_unions = []
                params = []
                count_params = []

                # --- 创建事件 ---
                if "item" in kinds:
                    unions.append(
                        "SELECT 'item' AS kind, id, 'created' AS event, created_at AS occurred_at, "
                        "SUBSTR(COALESCE(content,''),1,80) AS title, "
                        "SUBSTR(COALESCE(content,''),1,80) AS summary, "
                        "json_object('type',type,'source',source,'storage',"
                        "CASE WHEN INSTR(file_path,'/archive/')>0 OR INSTR(file_path,'\\archive\\')>0 THEN 'archive' WHEN file_path IS NULL THEN 'inbox' ELSE 'inbox' END) AS meta "
                        "FROM items")
                    count_unions.append("SELECT COUNT(*) FROM items")

                if "task" in kinds:
                    unions.append(
                        "SELECT 'task' AS kind, id, 'created' AS event, created_at AS occurred_at, "
                        "title, title AS summary, "
                        "json_object('status',status,'priority',priority,'due_date',COALESCE(due_date,''),"
                        "'completed_at',COALESCE(completed_at,'')) AS meta "
                        "FROM tasks")
                    count_unions.append("SELECT COUNT(*) FROM tasks")

                if "memory" in kinds:
                    unions.append(
                        "SELECT 'memory' AS kind, id, 'created' AS event, created_at AS occurred_at, "
                        "SUBSTR(COALESCE(content,''),1,80) AS title, "
                        "SUBSTR(COALESCE(content,''),1,80) AS summary, "
                        "json_object('category',category,'status',status) AS meta "
                        "FROM memories")
                    count_unions.append("SELECT COUNT(*) FROM memories")

                if "decision" in kinds:
                    unions.append(
                        "SELECT 'decision' AS kind, id, 'created' AS event, created_at AS occurred_at, "
                        "title, title AS summary, "
                        "json_object('status',status) AS meta "
                        "FROM decisions")
                    count_unions.append("SELECT COUNT(*) FROM decisions")

                # --- 状态变更事件（从 audit_log） ---
                audit_map = {
                    "item":     ("item", ("item_archive", "item_restore", "item_delete"),
                                {"item_archive": "archived", "item_restore": "restored", "item_delete": "deleted"}),
                    "task":     ("task", ("task_done", "task_cancelled", "task_todo"),
                                {"task_done": "completed", "task_cancelled": "cancelled", "task_todo": "restored"}),
                    "memory":   ("memory", ("memory_confirm", "memory_archive"),
                                {"memory_confirm": "confirmed", "memory_archive": "archived"}),
                    "decision": ("decision", ("decision_review",),
                                {"decision_review": "reviewed"}),
                }

                for k in kinds:
                    if k not in audit_map:
                        continue
                    table, actions, mapping = audit_map[k]
                    title_col = {
                        "item": "COALESCE(t.content,'')",
                        "task": "COALESCE(t.title,'')",
                        "memory": "COALESCE(t.content,'')",
                        "decision": "COALESCE(t.title,'')",
                    }[k]
                    table_name = f"{table}s" if table != "memory" else "memories"
                    action_placeholders = ",".join("?" for _ in actions)

                    unions.append(
                        f"SELECT '{k}' AS kind, a.target_id AS id, "
                        f"CASE a.action " + " ".join(f"WHEN '{a}' THEN '{e}'" for a, e in mapping.items()) +
                        " END AS event, a.created_at AS occurred_at, "
                        f"CASE WHEN t.id IS NULL THEN '(已删除 #' || a.target_id || ')' ELSE SUBSTR({title_col},1,80) END AS title, "
                        f"CASE WHEN t.id IS NULL THEN '(已删除 #' || a.target_id || ')' ELSE SUBSTR({title_col},1,80) END AS summary, "
                        f"'{{}}' AS meta "
                        f"FROM audit_log a LEFT JOIN {table_name} t ON t.id = a.target_id "
                        f"WHERE a.action IN ({action_placeholders})")
                    params.extend(actions)

                    count_unions.append(
                        f"SELECT COUNT(*) FROM audit_log a LEFT JOIN {table_name} t ON t.id = a.target_id "
                        f"WHERE a.action IN ({action_placeholders})")
                    count_params.extend(actions)

                if not unions:
                    return ok_response({"page": page, "page_size": page_size,
                                        "total": 0, "total_pages": 0, "entries": []})

                # Total count (each subquery returns COUNT(*), sum them)
                count_sql = "SELECT SUM(cnt) FROM (" + " UNION ALL ".join(
                    q.replace("SELECT COUNT(*)", "SELECT COUNT(*) AS cnt") for q in count_unions
                ) + ")"
                total = conn.execute(count_sql, count_params).fetchone()[0] or 0

                # Data query
                union_sql = " UNION ALL ".join(unions)
                offset = (page - 1) * page_size
                sql = (f"SELECT * FROM ({union_sql}) AS timeline_union "
                       f"ORDER BY occurred_at DESC LIMIT ? OFFSET ?")
                rows = conn.execute(sql, params + [page_size, offset]).fetchall()
            except sqlite3.Error:
                logger.exception("timeline query failed")
                return error_response(500, "database_read_failed", "数据库查询失败")
            finally:
                conn.close()

            total_pages = max(1, (total + page_size - 1) // page_size)
            entries = []
            for row in rows:
                meta_raw = row["meta"]
                if isinstance(meta_raw, str):
                    meta_raw = json.loads(meta_raw)
                entries.append({
                    "kind": row["kind"],
                    "id": row["id"],
                    "event": row["event"],
                    "occurred_at": row["occurred_at"],
                    "title": row["title"],
                    "summary": row["summary"],
                    "meta": {k: v for k, v in (meta_raw or {}).items()
                             if v is not None and v != ""} if meta_raw else {},
                })

            return ok_response({
                "page": page, "page_size": page_size,
                "total": total, "total_pages": total_pages, "entries": entries,
            })
    
