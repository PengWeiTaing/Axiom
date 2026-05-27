"""Item routes: capture, upload, file, archive, restore."""
from core._common import *

def register_routes(app):
        @app.route("/fetch", methods=["POST"])
        def fetch_url():
            auth_error = require_key()
            if auth_error:
                return auth_error
    
            body = get_request_body_data()
            url = str(body.get("url", "")).strip()
            if not url:
                return error_response(400, "missing_url", "url 不能为空")
            if not (url.startswith("http://") or url.startswith("https://")):
                return error_response(400, "invalid_url", "url 必须以 http:// 或 https:// 开头")
    
            result = fetch_url_content(url)
            if "error" in result:
                return error_response(400, "fetch_failed", result["error"])
    
            text = result["content"]
            source = f"url_fetch_{result.get('site', 'web')}"
            now_iso = utc_now().isoformat(timespec="seconds")
            file_path = build_text_file_path(datetime.now(timezone.utc))
            write_text_file_atomic(file_path, text)
    
            try:
                item_id = insert_item(
                    ITEM_TYPE_TEXT,
                    text,
                    str(file_path),
                    source,
                    now_iso,
                    original_name=result.get("title") or url[:80],
                )
                fts_sync_item(item_id, text, result.get("title"), None, None)
            except sqlite3.Error:
                cleanup_file(file_path)
                logger.exception("failed to insert fetched item")
                return error_response(500, "database_write_failed", "数据库写入失败")
    
            write_audit_log("item_create", "item", item_id)
            logger.info("saved fetched item id=%s url=%s", item_id, url[:80])
    
            if DEEPSEEK_API_KEY and len(text) > 200:
                try:
                    import openai
                    client = openai.OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)
                    resp = client.chat.completions.create(
                        model=DEEPSEEK_MODEL,
                        messages=[{"role": "user", "content": f"请用 3-5 句中文总结以下内容：\n\n{text[:3000]}"}],
                        max_tokens=300,
                        temperature=0.5,
                    )
                    summary = resp.choices[0].message.content.strip()
                except Exception:
                    summary = None
            else:
                summary = None
    
            return ok_response({
                "message": f"saved: {result.get('title', url[:60])}",
                "item": build_item_payload(
                    item_id,
                    ITEM_TYPE_TEXT,
                    text,
                    str(file_path),
                    source,
                    now_iso,
                    original_name=result.get("title"),
                ),
                "summary": summary,
            }, 201)
    
    
        @app.route("/add", methods=["GET", "POST"])
        def add_note():
            auth_error = require_key()
            if auth_error:
                return auth_error
    
            text = get_request_field("text")
            if not text.strip():
                return error_response(400, "empty_text", "text 不能为空")
    
            source = get_request_field("source", DEFAULT_SOURCE).strip() or DEFAULT_SOURCE
            now = utc_now()
            created_at = now.isoformat(timespec="seconds")
            file_path = build_text_file_path(now)
    
            try:
                write_text_file_atomic(file_path, text)
            except OSError:
                logger.exception("failed to write inbox file")
                return error_response(500, "file_write_failed", "文件写入失败")
    
            try:
                item_id = insert_text_item(text, file_path, source, created_at)
            except sqlite3.Error:
                cleanup_file(file_path)
                logger.exception("failed to insert item into database")
                return error_response(500, "database_write_failed", "数据库写入失败")
    
            write_audit_log("item_create", "item", item_id)
            fts_sync_item(item_id, text, None, None, None)
            logger.info("saved text item id=%s file=%s", item_id, file_path.name)
            return ok_response(
                {
                    "message": f"saved: {file_path.name}",
                    "item": build_item_payload(
                        item_id,
                        ITEM_TYPE_TEXT,
                        text,
                        file_path,
                        source,
                        created_at,
                    ),
                }
            )
    
    
        @app.route("/upload", methods=["POST"])
        def upload_file():
            auth_error = require_key()
            if auth_error:
                return auth_error
    
            transcript_file = request.files.get("transcript_file")
            uploaded_file = (
                request.files.get("file")
                or request.files.get("image")
                or request.files.get("document")
                or request.files.get("audio")
            )
            if uploaded_file is None or not uploaded_file.filename:
                return error_response(400, "empty_file", "file 不能为空")
    
            try:
                upload_info = parse_uploaded_file(uploaded_file)
            except ValueError as exc:
                return error_response(400, "invalid_file_type", str(exc))
    
            source = get_request_field("source", DEFAULT_SOURCE).strip() or DEFAULT_SOURCE
            item_type = upload_info["item_type"]
            original_name = upload_info["original_name"]
            mime_type = upload_info["mime_type"]
            content = read_upload_content(original_name, item_type)
            derived_text = None
            transcript_text = None
            if item_type == ITEM_TYPE_AUDIO:
                transcript_text = normalize_audio_transcript_text(
                    get_request_field(
                        "transcript_text",
                        get_request_field("transcript", ""),
                    ).strip()
                )
                if transcript_text is None and transcript_file is not None and transcript_file.filename:
                    try:
                        transcript_text = extract_audio_transcript_text_from_upload(transcript_file)
                    except ValueError as exc:
                        return error_response(400, "invalid_transcript_file", str(exc))
    
            now = utc_now()
            created_at = now.isoformat(timespec="seconds")
            file_path = build_binary_file_path(now, original_name)
    
            try:
                write_binary_file_atomic(file_path, uploaded_file)
            except ValueError:
                return error_response(400, "empty_file", "file 不能为空")
            except OSError:
                logger.exception("failed to write uploaded file")
                return error_response(500, "file_write_failed", "文件写入失败")
    
            size_bytes = file_path.stat().st_size
            if item_type == ITEM_TYPE_DOCUMENT:
                derived_text = extract_document_text(file_path, original_name)
    
            try:
                item_id = insert_item(
                    item_type,
                    content,
                    file_path,
                    source,
                    created_at,
                    original_name=original_name,
                    mime_type=mime_type,
                    size_bytes=size_bytes,
                    derived_text=derived_text,
                    transcript_text=transcript_text,
                )
            except sqlite3.Error:
                cleanup_file(file_path)
                logger.exception("failed to insert uploaded item into database")
                return error_response(500, "database_write_failed", "数据库写入失败")
    
            type_label = get_type_label(item_type)
            write_audit_log("item_create", "item", item_id)
            fts_sync_item(item_id, content, original_name, derived_text, transcript_text)
            logger.info("saved %s item id=%s file=%s", item_type, item_id, file_path.name)
            return ok_response(
                {
                    "message": f"saved: {file_path.name}",
                    "item": build_item_payload(
                        item_id,
                        item_type,
                        content,
                        file_path,
                        source,
                        created_at,
                        original_name,
                        mime_type,
                        size_bytes,
                        derived_text=derived_text,
                        transcript_text=transcript_text,
                    ),
                    "type_label": type_label,
                }
            )
    
    
        @app.route("/item/<int:item_id>", methods=["GET"])
        def get_item(item_id: int):
            auth_error = require_key()
            if auth_error:
                return auth_error

            row = get_item_by_id(item_id)
            if row is None:
                return error_response(404, "item_not_found", "item 不存在")

            item = row_to_item(row)
            item["storage"] = get_storage_area(row["file_path"])
            item["file_url"] = build_file_url(item_id)

            # 反向链：本 item 被升级出来的 memory 列表，最多 10 条，避免列表接口里
            # 每行多查一次（只在 GET /item/<id> 详情里出现）。
            conn = get_db_connection()
            try:
                memory_rows = conn.execute(
                    "SELECT id, category, content, status, created_at "
                    "FROM memories WHERE source_item_id = ? "
                    "ORDER BY created_at DESC LIMIT 10",
                    (item_id,),
                ).fetchall()
            finally:
                conn.close()
            item["derived_memories"] = [
                {
                    "id": m["id"],
                    "category": m["category"],
                    "category_label": MEMORY_CATEGORY_LABELS.get(m["category"], m["category"]),
                    "content": m["content"],
                    "status": m["status"],
                    "status_label": MEMORY_STATUS_LABELS.get(m["status"], m["status"]),
                    "created_at": m["created_at"],
                }
                for m in memory_rows
            ]
            return ok_response({"item": item})
    
    
        @app.route("/item/<int:item_id>/update", methods=["POST"])
        def update_item(item_id: int):
            auth_error = require_key()
            if auth_error:
                return auth_error
    
            row = get_item_by_id(item_id)
            if row is None:
                return error_response(404, "item_not_found", "item 不存在")
    
            try:
                body = get_request_body_data()
            except ValueError as exc:
                return error_response(400, "invalid_request_body", str(exc))
    
            content_provided, raw_content = read_optional_body_field(body, "content")
            source_provided, raw_source = read_optional_body_field(body, "source")
            derived_provided, raw_derived_text = read_optional_body_field(body, "derived_text")
            transcript_provided, raw_transcript_text = read_optional_body_field(body, "transcript_text")
            processing_override_provided, raw_processing_override = read_optional_body_field(body, "processing_override")
    
            if derived_provided and row["type"] != ITEM_TYPE_DOCUMENT:
                return error_response(400, "invalid_derived_text_target", "derived_text 目前只支持 document item")
            if transcript_provided and row["type"] != ITEM_TYPE_AUDIO:
                return error_response(400, "invalid_transcript_target", "transcript_text 目前只支持 audio item")
    
            if (
                not content_provided
                and not source_provided
                and not derived_provided
                and not transcript_provided
                and not processing_override_provided
            ):
                return error_response(
                    400,
                    "missing_update_fields",
                    "至少要提供 content、source、derived_text、transcript_text 或 processing_override",
                )
    
            next_content = row["content"]
            if content_provided:
                if row["type"] == ITEM_TYPE_TEXT:
                    if not raw_content.strip():
                        return error_response(400, "empty_text", "text 不能为空")
                    next_content = raw_content
                else:
                    next_content = raw_content.strip()
    
            next_source = row["source"]
            if source_provided:
                cleaned_source = raw_source.strip()
                if not cleaned_source:
                    return error_response(400, "empty_source", "source 不能为空")
                next_source = cleaned_source
    
            next_derived_text = row["derived_text"] if "derived_text" in row.keys() else None
            if derived_provided:
                next_derived_text = normalize_extracted_text(raw_derived_text)
    
            next_transcript_text = row["transcript_text"] if "transcript_text" in row.keys() else None
            if transcript_provided:
                next_transcript_text = normalize_extracted_text(raw_transcript_text)
    
            next_processing_override = row["processing_override"] if "processing_override" in row.keys() else None
            if processing_override_provided:
                try:
                    next_processing_override = normalize_processing_override(raw_processing_override)
                except ValueError as exc:
                    return error_response(400, "invalid_processing_override", str(exc))
    
            updated_fields: list[str] = []
            if next_content != row["content"]:
                updated_fields.append("content")
            if next_source != row["source"]:
                updated_fields.append("source")
            if next_derived_text != row["derived_text"]:
                updated_fields.append("derived_text")
            if next_transcript_text != row["transcript_text"]:
                updated_fields.append("transcript_text")
            if next_processing_override != row["processing_override"]:
                updated_fields.append("processing_override")
    
            if not updated_fields:
                return ok_response(
                    {
                        "message": "unchanged",
                        "updated_fields": [],
                        "item": row_to_item(row),
                    }
                )
    
            file_path: Path | None = None
            rollback_content = row["content"] or ""
            content_written = False
    
            if row["type"] == ITEM_TYPE_TEXT and "content" in updated_fields:
                file_path = resolve_stored_file_path(row["file_path"])
                if file_path is None:
                    return error_response(404, "file_not_found", "文本文件不存在")
                if not is_path_under(file_path, AXIOM_ROOT):
                    logger.warning("blocked update outside root: item_id=%s path=%s", item_id, file_path)
                    return error_response(403, "forbidden_file_path", "文件路径不允许访问")
                if not file_path.is_file():
                    return error_response(404, "file_not_found", "文本文件不存在")
    
                try:
                    write_text_file_atomic(file_path, next_content or "")
                    content_written = True
                except OSError:
                    logger.exception("failed to rewrite text file: item_id=%s", item_id)
                    return error_response(500, "file_write_failed", "文本文件更新失败")
    
            try:
                update_item_content_source_text_fields(
                    item_id,
                    next_content,
                    next_source,
                    next_derived_text,
                    next_transcript_text,
                    next_processing_override,
                )
            except sqlite3.Error:
                if content_written and file_path is not None:
                    try:
                        write_text_file_atomic(file_path, rollback_content)
                    except OSError:
                        logger.exception("failed to rollback text file after db error: item_id=%s", item_id)
                logger.exception("failed to update item in database: item_id=%s", item_id)
                return error_response(500, "database_write_failed", "数据库写入失败")
    
            updated_row = get_item_by_id(item_id)
            write_audit_log("item_update", "item", item_id, ",".join(updated_fields))
            if updated_row:
                fts_sync_item(item_id, updated_row["content"], updated_row["original_name"], updated_row["derived_text"], updated_row["transcript_text"])
            logger.info("updated item id=%s fields=%s", item_id, ",".join(updated_fields))
            return ok_response(
                {
                    "message": "updated",
                    "updated_fields": updated_fields,
                    "item": row_to_item(updated_row),
                }
            )
    
    
        @app.route("/item/<int:item_id>/promote-to-memory", methods=["POST"])
        def promote_item_to_memory(item_id: int):
            auth_error = require_key()
            if auth_error:
                return auth_error

            row = get_item_by_id(item_id)
            if row is None:
                return error_response(404, "item_not_found", "item 不存在")

            body = request.get_json(silent=True) or {}
            category = str(body.get("category", "")).strip()
            if category not in MEMORY_CATEGORIES:
                return error_response(400, "invalid_category", f"category 不支持: {category}")

            detail = str(body.get("detail", "")).strip() or None
            raw_content = str(body.get("content", "")).strip()

            row_keys = row.keys()
            candidates = [
                row["content"] if "content" in row_keys else None,
                row["derived_text"] if "derived_text" in row_keys else None,
                row["transcript_text"] if "transcript_text" in row_keys else None,
                row["original_name"] if "original_name" in row_keys else None,
            ]
            first_non_empty = next(
                (c.strip() for c in candidates if c and c.strip()),
                None,
            )
            source_text = first_non_empty[:200] if first_non_empty else None

            content = raw_content if raw_content else (source_text or "")
            if not content:
                return error_response(400, "missing_content", "无法派生 content，请显式传入")

            now = utc_now().isoformat(timespec="seconds")
            conn = get_db_connection()
            try:
                cursor = conn.execute(
                    "INSERT INTO memories (category, content, detail, status, source_item_id, source_text, created_at, updated_at) "
                    "VALUES (?, ?, ?, 'candidate', ?, ?, ?, ?)",
                    (category, content, detail, item_id, source_text, now, now),
                )
                conn.commit()
                memory_id = cursor.lastrowid
                write_audit_log("memory_promote_from_item", "memory", memory_id)
                new_row = conn.execute(
                    "SELECT id, category, content, detail, status, source_item_id, source_text, created_at, updated_at "
                    "FROM memories WHERE id = ?",
                    (memory_id,),
                ).fetchone()
            finally:
                conn.close()

            # row_to_memory 闭包定义在 memories.py 的 register_routes 内部，这里复制等价字段拼装
            memory = {
                "id": new_row["id"],
                "category": new_row["category"],
                "category_label": MEMORY_CATEGORY_LABELS.get(new_row["category"], new_row["category"]),
                "content": new_row["content"],
                "detail": new_row["detail"],
                "status": new_row["status"],
                "status_label": MEMORY_STATUS_LABELS.get(new_row["status"], new_row["status"]),
                "source_item_id": new_row["source_item_id"],
                "source_text": new_row["source_text"],
                "created_at": new_row["created_at"],
                "updated_at": new_row["updated_at"],
                "linked_tasks": [],
                "task_progress": None,
            }
            logger.info("promoted item id=%s to memory id=%s", item_id, memory_id)
            return ok_response({"memory": memory}, 201)
    
    
        @app.route("/file/<int:item_id>", methods=["GET"])
        def get_item_file(item_id: int):
            auth_error = require_key()
            if auth_error:
                return auth_error
    
            row = get_item_by_id(item_id)
            if row is None:
                return error_response(404, "item_not_found", "item 不存在")
    
            file_path = resolve_stored_file_path(row["file_path"])
            if file_path is None:
                return error_response(404, "file_not_found", "文件不存在")
    
            if not is_path_under(file_path, AXIOM_ROOT):
                logger.warning("blocked file access outside root: item_id=%s path=%s", item_id, file_path)
                return error_response(403, "forbidden_file_path", "文件路径不允许访问")
    
            if not file_path.is_file():
                return error_response(404, "file_not_found", "文件不存在")
    
            download_name = build_download_name(
                row["original_name"] if "original_name" in row.keys() else None,
                file_path,
                row["id"],
            )
            return send_file(file_path, download_name=download_name)
    
    
        @app.route("/archive/<int:item_id>", methods=["POST"])
        def archive_item(item_id: int):
            auth_error = require_key()
            if auth_error:
                return auth_error
    
            row = get_item_by_id(item_id)
            if row is None:
                return error_response(404, "item_not_found", "item 不存在")
    
            file_path = resolve_stored_file_path(row["file_path"])
            if file_path is None:
                return error_response(404, "file_not_found", "文件不存在")
    
            if not is_path_under(file_path, AXIOM_ROOT):
                logger.warning("blocked archive outside root: item_id=%s path=%s", item_id, file_path)
                return error_response(403, "forbidden_file_path", "文件路径不允许访问")
    
            if is_path_under(file_path, ARCHIVE_PATH):
                return ok_response({"message": "already archived", "item": row_to_item(row)})
    
            if not file_path.is_file():
                return error_response(404, "file_not_found", "文件不存在")
    
            archive_path = build_archive_file_path(utc_now(), file_path)
            try:
                os.replace(file_path, archive_path)
                update_item_file_path(item_id, archive_path)
            except OSError:
                logger.exception("failed to archive item: item_id=%s", item_id)
                return error_response(500, "archive_failed", "归档失败")
    
            updated_row = get_item_by_id(item_id)
            write_audit_log("item_archive", "item", item_id)
            logger.info("archived item id=%s file=%s", item_id, archive_path.name)
            return ok_response({"message": "archived", "item": row_to_item(updated_row)})
    
    
        @app.route("/restore/<int:item_id>", methods=["POST"])
        def restore_item(item_id: int):
            auth_error = require_key()
            if auth_error:
                return auth_error
    
            row = get_item_by_id(item_id)
            if row is None:
                return error_response(404, "item_not_found", "item 不存在")
    
            file_path = resolve_stored_file_path(row["file_path"])
            if file_path is None:
                return error_response(404, "file_not_found", "文件不存在")
    
            if not is_path_under(file_path, AXIOM_ROOT):
                logger.warning("blocked restore outside root: item_id=%s path=%s", item_id, file_path)
                return error_response(403, "forbidden_file_path", "文件路径不允许访问")
    
            if is_path_under(file_path, INBOX_PATH):
                return ok_response({"message": "already restored", "item": row_to_item(row)})
    
            if not is_path_under(file_path, ARCHIVE_PATH):
                return error_response(400, "invalid_storage", "当前文件不在 archive 中")
    
            if not file_path.is_file():
                return error_response(404, "file_not_found", "文件不存在")
    
            restore_path = build_restore_file_path(file_path)
            try:
                os.replace(file_path, restore_path)
                update_item_file_path(item_id, restore_path)
            except OSError:
                logger.exception("failed to restore item: item_id=%s", item_id)
                return error_response(500, "restore_failed", "恢复失败")
    
            updated_row = get_item_by_id(item_id)
            write_audit_log("item_restore", "item", item_id)
            logger.info("restored item id=%s file=%s", item_id, restore_path.name)
            return ok_response({"message": "restored", "item": row_to_item(updated_row)})
    
    
