"""Automation routes: jobs, runs, artifacts, processing."""
from core._common import *

def register_routes(app):
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
    
    
