"""Core routes: /app, /health, /stats, /add, /upload, /item, /file, /archive, /restore, /recent, /search, /overview, /automation, /artifacts, /processing."""
from core._common import *

def register_routes(app):
    # ===== 路由 =====
    @app.route("/app", methods=["GET"], strict_slashes=False)
    def app_shell():
        return render_template("app.html")


    @app.route("/sw.js", methods=["GET"])
    def service_worker():
        static_root = Path(app.static_folder or "").resolve()
        return send_file(static_root / "sw.js", mimetype="application/javascript")


    @app.route("/health", methods=["GET"])
    def health_check():
        conn = None
        try:
            conn = get_db_connection()
            conn.execute("SELECT 1")
        except sqlite3.Error:
            logger.exception("health check failed")
            return error_response(500, "database_error", "数据库不可用")
        finally:
            if conn is not None:
                conn.close()

        return ok_response(
            {
                "service": "axiom-receiver",
                "db": "ok",
                "inbox": "ok" if INBOX_PATH.exists() else "missing",
            }
        )


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


    @app.route("/processing/backlog", methods=["GET"])
    def processing_backlog():
        auth_error = require_key()
        if auth_error:
            return auth_error

        try:
            group_limit = read_group_limit()
        except ValueError as exc:
            return error_response(400, "invalid_processing_backlog_param", str(exc))

        return ok_response(build_processing_backlog_payload(group_limit))


    @app.route("/processing/next", methods=["GET"])
    def processing_next_item():
        auth_error = require_key()
        if auth_error:
            return auth_error

        try:
            item_type = read_item_type_filter()
            exclude_id_value = request.args.get("exclude_id")
            exclude_item_id = None
            if exclude_id_value not in {None, ""}:
                exclude_item_id = parse_positive_int(
                    exclude_id_value,
                    "exclude_id",
                    1,
                )
        except ValueError as exc:
            return error_response(400, "invalid_processing_next_param", str(exc))

        row = fetch_next_pending_item_row(item_type, exclude_item_id)
        return ok_response(
            {
                "type": item_type,
                "processing_state": "pending",
                "exclude_id": exclude_item_id,
                "item": row_to_item(row) if row else None,
            }
        )


    @app.route("/processing/mark-ready", methods=["POST"])
    def processing_mark_ready():
        auth_error = require_key()
        if auth_error:
            return auth_error

        try:
            body = get_request_body_data()
        except ValueError as exc:
            return error_response(400, "invalid_request_body", str(exc))

        try:
            item_ids = normalize_item_id_list(body.get("ids"))
        except ValueError as exc:
            return error_response(400, "invalid_processing_ids", str(exc))

        rows = get_items_by_ids(item_ids)
        found_ids = {int(row["id"]) for row in rows}
        missing_ids = [item_id for item_id in item_ids if item_id not in found_ids]
        if missing_ids:
            missing_text = ", ".join(str(item_id) for item_id in missing_ids)
            return error_response(404, "item_not_found", f"浠ヤ笅 item 涓嶅瓨鍦? {missing_text}")

        update_items_processing_override(item_ids, "ready")
        updated_rows = get_items_by_ids(item_ids)

        counts_by_type: dict[str, int] = {}
        for row in updated_rows:
            item_type = str(row["type"])
            counts_by_type[item_type] = counts_by_type.get(item_type, 0) + 1

        return ok_response(
            {
                "message": "marked_ready",
                "processing_override": "ready",
                "count": len(updated_rows),
                "ids": item_ids,
                "by_type": counts_by_type,
                "items": [row_to_item(row) for row in updated_rows],
            }
        )


    @app.route("/processing/mark-pending", methods=["POST"])
    def processing_mark_pending():
        auth_error = require_key()
        if auth_error:
            return auth_error

        try:
            body = get_request_body_data()
        except ValueError as exc:
            return error_response(400, "invalid_request_body", str(exc))

        try:
            item_ids = normalize_item_id_list(body.get("ids"))
        except ValueError as exc:
            return error_response(400, "invalid_processing_ids", str(exc))

        rows = get_items_by_ids(item_ids)
        found_ids = {int(row["id"]) for row in rows}
        missing_ids = [item_id for item_id in item_ids if item_id not in found_ids]
        if missing_ids:
            missing_text = ", ".join(str(item_id) for item_id in missing_ids)
            return error_response(404, "item_not_found", f"找不到这些 item id: {missing_text}")

        update_items_processing_override(item_ids, None)
        updated_rows = get_items_by_ids(item_ids)

        counts_by_type: dict[str, int] = {}
        for row in updated_rows:
            item_type = str(row["type"])
            counts_by_type[item_type] = counts_by_type.get(item_type, 0) + 1

        return ok_response(
            {
                "message": "marked_pending",
                "processing_override": None,
                "count": len(updated_rows),
                "ids": item_ids,
                "by_type": counts_by_type,
                "items": [row_to_item(row) for row in updated_rows],
            }
        )


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

        return ok_response({"item": row_to_item(row)})


    @app.route("/automation/jobs", methods=["GET"])
    def list_automation_jobs():
        auth_error = require_key()
        if auth_error:
            return auth_error

        jobs = [build_automation_job_payload(job_id, job) for job_id, job in iter_automation_job_items(manual_only=True)]
        history_jobs = [build_automation_job_payload(job_id, job) for job_id, job in iter_automation_job_items()]
        return ok_response({"jobs": jobs, "history_jobs": history_jobs})


    @app.route("/automation/runs", methods=["GET"])
    def list_automation_runs():
        auth_error = require_key()
        if auth_error:
            return auth_error

        try:
            page, page_size = read_pagination(default_page_size=8)
            job_id = read_automation_job_filter()
            status = read_automation_status_filter()
        except ValueError as exc:
            return error_response(400, "invalid_automation_filter", str(exc))

        total, rows = fetch_automation_run_rows(
            page=page,
            page_size=page_size,
            job_id=job_id,
            status=status,
        )
        total_pages = (total + page_size - 1) // page_size
        return ok_response(
            {
                "job": job_id,
                "status": status,
                "page": page,
                "page_size": page_size,
                "total": total,
                "total_pages": total_pages,
                "items": [row_to_automation_run(row) for row in rows],
            }
        )


    @app.route("/automation/run", methods=["POST"])
    def run_automation():
        auth_error = require_key()
        if auth_error:
            return auth_error

        try:
            body = get_request_body_data()
        except ValueError as exc:
            return error_response(400, "invalid_request_body", str(exc))

        job_id = str(body.get("job") or "").strip()
        if not job_id:
            return error_response(400, "missing_job", "job 不能为空")
        if job_id not in AUTOMATION_JOBS:
            return error_response(400, "invalid_job", "job 不存在")
        job = AUTOMATION_JOBS[job_id]
        if not job.get("manual_enabled", True):
            return error_response(400, "manual_job_disabled", "job 不支持手动触发")
        job_payload = build_automation_job_payload(job_id, job)
        if not job_payload["ready"]:
            return error_response(400, "automation_job_unavailable", job_payload["availability_note"])

        try:
            run_date = read_optional_run_date(body)
        except ValueError as exc:
            return error_response(400, "invalid_run_date", str(exc))
        payload, status = execute_logged_automation_job(job_id, run_date)
        return jsonify(payload), status


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


    @app.route("/artifacts", methods=["GET"])
    def list_artifacts():
        auth_error = require_key()
        if auth_error:
            return auth_error

        try:
            page, page_size = read_pagination()
            group = read_artifact_group_filter()
            window = read_artifact_window_filter()
            mode = read_artifact_mode_filter()
            date_from, date_to = read_artifact_date_range()
        except ValueError as exc:
            return error_response(400, "invalid_artifact_filter", str(exc))

        sort = request.args.get("sort", "newest").strip().lower()
        if sort not in {"newest", "oldest"}:
            return error_response(400, "invalid_sort", "sort 只能是 newest 或 oldest")

        artifacts = [
            artifact
            for artifact in list_review_artifacts()
            if artifact_matches_filters(
                artifact,
                group=group,
                window=window,
                mode=mode,
                date_from=date_from,
                date_to=date_to,
            )
        ]

        artifacts.sort(
            key=lambda artifact: (artifact["modified_at"], artifact["relative_path"]),
            reverse=(sort == "newest"),
        )

        total = len(artifacts)
        offset = (page - 1) * page_size
        page_items = artifacts[offset : offset + page_size]
        total_pages = (total + page_size - 1) // page_size

        return ok_response(
            {
                "group": group,
                "window": window,
                "mode": mode,
                "date_from": date_from.isoformat() if date_from else None,
                "date_to": date_to.isoformat() if date_to else None,
                "sort": sort,
                "page": page,
                "page_size": page_size,
                "total": total,
                "total_pages": total_pages,
                "items": page_items,
            }
        )


    @app.route("/artifacts/summary", methods=["GET"])
    def artifact_summary():
        auth_error = require_key()
        if auth_error:
            return auth_error

        try:
            group = read_artifact_group_filter()
            window = read_artifact_window_filter()
            mode = read_artifact_mode_filter()
            date_from, date_to = read_artifact_date_range()
            preview_chars = read_preview_chars()
        except ValueError as exc:
            return error_response(400, "invalid_artifact_filter", str(exc))

        artifacts = [
            artifact
            for artifact in list_review_artifacts()
            if artifact_matches_filters(
                artifact,
                group=group,
                window=window,
                mode=mode,
                date_from=date_from,
                date_to=date_to,
            )
        ]

        latest_overall = max(artifacts, key=artifact_sort_key) if artifacts else None

        return ok_response(
            {
                "group": group,
                "window": window,
                "mode": mode,
                "date_from": date_from.isoformat() if date_from else None,
                "date_to": date_to.isoformat() if date_to else None,
                "preview_chars": preview_chars,
                "total": len(artifacts),
                "counts": build_artifact_counts(artifacts),
                "latest_overall": build_artifact_summary_payload(latest_overall, preview_chars),
                "latest": build_artifact_latest_summary(artifacts, preview_chars),
            }
        )


    @app.route("/artifacts/file/<path:artifact_path>", methods=["GET"])
    def get_artifact_file(artifact_path: str):
        auth_error = require_key()
        if auth_error:
            return auth_error

        try:
            file_path = resolve_review_artifact_path(artifact_path)
        except ValueError:
            logger.warning("blocked artifact access outside reviews: path=%s", artifact_path)
            return error_response(403, "forbidden_artifact_path", "artifact 路径不允许访问")

        if not file_path.is_file():
            return error_response(404, "artifact_not_found", "artifact 不存在")

        if file_path.suffix.lower() != ".md":
            return error_response(400, "invalid_artifact_type", "当前只支持读取 markdown artifact")

        return send_file(file_path, download_name=file_path.name, mimetype="text/markdown")


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


