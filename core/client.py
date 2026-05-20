"""Axiom Python SDK — 程序化调用所有 API。供 Claude 构建前端时使用。"""
from __future__ import annotations

import json
import urllib.request
import urllib.error
from typing import Any


class AxiomClient:
    """Axiom API 的 Python 客户端。"""

    def __init__(self, base_url: str = "http://127.0.0.1:5000", api_key: str = ""):
        self.base = base_url.rstrip("/")
        self.key = api_key

    def _req(self, method: str, path: str, data: dict | None = None, params: dict | None = None) -> dict:
        url = f"{self.base}{path}"
        if params:
            qs = "&".join(f"{k}={v}" for k, v in params.items() if v is not None)
            url += f"?{qs}"
        headers = {"Content-Type": "application/json", "X-Axiom-Key": self.key}
        body = json.dumps(data).encode("utf-8") if data else None
        req = urllib.request.Request(url, data=body, headers=headers, method=method)
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            return json.loads(e.read().decode("utf-8"))

    def _get(self, path, **params): return self._req("GET", path, params=params)
    def _post(self, path, data=None): return self._req("POST", path, data=data)
    def _put(self, path, data=None): return self._req("PUT", path, data=data)
    def _delete(self, path): return self._req("DELETE", path)

    # ── Items ──
    def add_note(self, text: str, source: str = "python_sdk") -> dict:
        return self._post("/add", {"text": text, "source": source})

    def get_item(self, item_id: int) -> dict:
        return self._get(f"/item/{item_id}")

    def update_item(self, item_id: int, **fields) -> dict:
        return self._post(f"/item/{item_id}/update", fields)

    def delete_item(self, item_id: int) -> dict:
        return self._delete(f"/item/{item_id}")

    def archive_item(self, item_id: int) -> dict:
        return self._post(f"/archive/{item_id}")

    def restore_item(self, item_id: int) -> dict:
        return self._post(f"/restore/{item_id}")

    def fetch_url(self, url: str) -> dict:
        return self._post("/fetch", {"url": url})

    # ── Browse ──
    def recent(self, page=1, item_type=None, storage=None, page_size=10) -> dict:
        return self._get("/recent", page=page, type=item_type, storage=storage, page_size=page_size)

    def search(self, q: str, mode: str = "", page=1, page_size=10) -> dict:
        return self._get("/search", q=q, mode=mode, page=page, page_size=page_size)

    def search_all(self, q: str, limit=20) -> dict:
        return self._get("/search/all", q=q, limit=limit)

    def stats(self) -> dict:
        return self._get("/stats")

    def overview(self) -> dict:
        return self._get("/overview")

    # ── Tasks ──
    def create_task(self, title: str, priority: str = "medium", due_date: str = "", estimated_minutes: int = None) -> dict:
        data = {"title": title, "priority": priority}
        if due_date: data["due_date"] = due_date
        if estimated_minutes: data["estimated_minutes"] = estimated_minutes
        return self._post("/tasks", data)

    def get_task(self, task_id: int) -> dict:
        return self._get(f"/tasks/{task_id}")

    def update_task(self, task_id: int, **fields) -> dict:
        return self._put(f"/tasks/{task_id}", fields)

    def delete_task(self, task_id: int) -> dict:
        return self._delete(f"/tasks/{task_id}")

    def task_done(self, task_id: int) -> dict:
        return self._post(f"/tasks/{task_id}/done")

    def task_todo(self, task_id: int) -> dict:
        return self._post(f"/tasks/{task_id}/todo")

    def task_cancel(self, task_id: int) -> dict:
        return self._post(f"/tasks/{task_id}/cancel")

    def task_reschedule(self, task_id: int, due_date: str = "") -> dict:
        return self._post(f"/tasks/{task_id}/reschedule", {"due_date": due_date} if due_date else {})

    def task_breakdown(self, task_id: int) -> dict:
        return self._post(f"/tasks/{task_id}/breakdown")

    def tasks_today(self) -> dict:
        return self._get("/tasks/today")

    def tasks_list(self, status="", priority="", page=1) -> dict:
        return self._get("/tasks", status=status, priority=priority, page=page)

    # ── Memories ──
    def create_memory(self, category: str, content: str, detail: str = "") -> dict:
        data = {"category": category, "content": content}
        if detail: data["detail"] = detail
        return self._post("/memories", data)

    def get_memory(self, memory_id: int) -> dict:
        return self._get(f"/memories/{memory_id}")

    def update_memory(self, memory_id: int, **fields) -> dict:
        return self._put(f"/memories/{memory_id}", fields)

    def delete_memory(self, memory_id: int) -> dict:
        return self._delete(f"/memories/{memory_id}")

    def confirm_memory(self, memory_id: int) -> dict:
        return self._post(f"/memories/{memory_id}/confirm")

    def archive_memory(self, memory_id: int) -> dict:
        return self._post(f"/memories/{memory_id}/archive")

    def memories_list(self, category="", status="", page=1) -> dict:
        return self._get("/memories", category=category, status=status, page=page)

    def memories_stats(self) -> dict:
        return self._get("/memories/stats")

    def memories_suggest(self) -> dict:
        return self._post("/memories/suggest")

    # ── Decisions ──
    def create_decision(self, title: str, decision: str, context="", reasoning="", expected=""):
        data = {"title": title, "decision": decision}
        if context: data["context"] = context
        if reasoning: data["reasoning"] = reasoning
        if expected: data["expected_outcome"] = expected
        return self._post("/decisions", data)

    def get_decision(self, decision_id: int) -> dict:
        return self._get(f"/decisions/{decision_id}")

    def update_decision(self, decision_id: int, **fields) -> dict:
        return self._put(f"/decisions/{decision_id}", fields)

    def delete_decision(self, decision_id: int) -> dict:
        return self._delete(f"/decisions/{decision_id}")

    def review_decision(self, decision_id: int, actual_outcome: str) -> dict:
        return self._post(f"/decisions/{decision_id}/review", {"actual_outcome": actual_outcome})

    def decisions_list(self, status="", page=1) -> dict:
        return self._get("/decisions", status=status, page=page)

    # ── AI ──
    def ai_parse(self, text: str) -> dict:
        return self._post("/parse", {"text": text})

    def ai_chat(self, message: str, history: list = None) -> dict:
        return self._post("/chat", {"message": message, "history": history or []})

    def ai_suggestions(self) -> dict:
        return self._get("/suggestions")

    def ai_brief(self) -> dict:
        return self._get("/brief")

    def ai_weekly_report(self) -> dict:
        return self._get("/report/weekly")

    # ── Admin ──
    def health(self) -> dict:
        return self._get("/health")

    def system(self) -> dict:
        return self._get("/system")

    def metrics(self) -> dict:
        return self._get("/metrics")

    def insights(self) -> dict:
        return self._get("/admin/insights")

    def daily_stats(self, days=30) -> dict:
        return self._get("/admin/stats/daily", days=days)

    def cleanup(self) -> dict:
        return self._post("/admin/cleanup")

    def dedup(self) -> dict:
        return self._get("/admin/dedup")

    def rebuild_fts(self) -> dict:
        return self._post("/admin/rebuild-fts")

    def vacuum(self) -> dict:
        return self._post("/admin/vacuum")

    def backup(self) -> dict:
        return self._post("/admin/backup")

    def logs(self, lines=50, level="") -> dict:
        return self._get("/admin/logs", lines=lines, level=level)

    def export_csv(self, table="items") -> bytes:
        url = f"{self.base}/export/csv?table={table}"
        req = urllib.request.Request(url, headers={"X-Axiom-Key": self.key})
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.read()

    def batch_archive(self, ids: list[int]) -> dict:
        return self._post("/items/batch", {"ids": ids, "action": "archive"})

    def batch_delete(self, ids: list[int]) -> dict:
        return self._post("/items/batch", {"ids": ids, "action": "delete"})

    def webhook_register(self, url: str, event: str = "*") -> dict:
        return self._post("/admin/webhooks", {"url": url, "event": event})

    def webhook_list(self) -> dict:
        return self._get("/admin/webhooks")

    def webhook_clear(self) -> dict:
        return self._delete("/admin/webhooks")

    def modules_list(self) -> dict:
        return self._get("/modules")

    def modules_admin(self) -> dict:
        return self._get("/admin/modules")

    def module_enable(self, name: str) -> dict:
        return self._post(f"/admin/modules/{name}/enable")

    def module_disable(self, name: str) -> dict:
        return self._post(f"/admin/modules/{name}/disable")
