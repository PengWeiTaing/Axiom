"""Browse routes: recent, search, stats, overview."""
from core._common import *

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
    
    
