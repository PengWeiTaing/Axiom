#!/usr/bin/env python3
"""
Axiom 思考引擎 — 在 GPU 服务器上长期运行，做深度分析和自迭代。
与 VPS 上快速响应的用户交互轨互补。

用法: python3 scripts/think.py [--once] [--interval 3600]
"""
from __future__ import annotations

import json
import os
import sys
import time as _time
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import Any

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from core.client import AxiomClient


class ThinkEngine:
    """Axiom 的深度思考引擎。"""

    def __init__(self, base_url: str = "http://127.0.0.1:5001", key: str = "axiomnb"):
        self.c = AxiomClient(base_url, key)
        self.insights_dir = REPO_ROOT / "data" / "insights"
        self.insights_dir.mkdir(parents=True, exist_ok=True)

    def analyze_trends(self, days: int = 30) -> dict:
        """深度趋势分析。"""
        stats = self.c.daily_stats(days=days)
        if not stats.get("ok"):
            return {"error": "failed to get stats"}

        daily = stats["daily"]
        items_total = sum(d["items"] for d in daily)
        tasks_created = sum(d["tasks_created"] for d in daily)
        tasks_done = sum(d["tasks_done"] for d in daily)

        # Split into two halves for comparison
        mid = len(daily) // 2
        first_half = daily[:mid]
        second_half = daily[mid:]
        first_items = sum(d["items"] for d in first_half)
        second_items = sum(d["items"] for d in second_half)
        trend = "↑" if second_items > first_items else "↓" if second_items < first_items else "→"

        # Active days
        active_days = sum(1 for d in daily if d["items"] > 0)

        return {
            "period": f"{days} days",
            "total_items": items_total,
            "tasks_created": tasks_created,
            "tasks_done": tasks_done,
            "completion_rate": round(tasks_done / max(tasks_created, 1) * 100),
            "active_days": active_days,
            "active_pct": round(active_days / days * 100),
            "half1_items": first_items,
            "half2_items": second_items,
            "trend": trend,
        }

    def deep_analyze(self) -> dict:
        """运行一次完整的深度分析循环。"""
        print(f"\n{'='*50}")
        print(f"Think Engine — {datetime.now().isoformat()}")
        print(f"{'='*50}")

        results = {}

        # 1. Trend analysis (30 days)
        print("\n[1/4] 趋势分析 (30天)...")
        trends = self.analyze_trends(30)
        print(f"  活跃 {trends['active_days']}/{trends['period']} 天, "
              f"趋势 {trends['trend']}, 任务完成率 {trends['completion_rate']}%")
        results["trends"] = trends

        # 2. AI accuracy check
        print("\n[2/4] AI 准确率分析...")
        try:
            insights = self.c.insights()
            acc = insights.get("parse_accuracy")
            if acc is not None:
                print(f"  解析准确率: {acc}%")
                results["parse_accuracy"] = acc
        except Exception:
            pass

        # 3. Generate deep review using local LLM
        print("\n[3/4] 生成深度回顾...")
        deep_review = self._generate_deep_review(trends)
        if deep_review:
            results["deep_review"] = deep_review[:200]
            print(f"  已生成 {len(deep_review)} 字符")

        # 4. Save insights as artifact
        print("\n[4/4] 保存洞察...")
        saved = self._save_insight(results)
        print(f"  已保存: {saved}")

        return results

    def _generate_deep_review(self, trends: dict) -> str | None:
        """使用本地 LLM 生成深度回顾。"""
        try:
            response = self.c._req("POST", "/chat", data={
                "message": (
                    f"基于以下30天数据做深度分析(3-5句):\n"
                    f"总记录{trends['total_items']}条, 活跃{trends['active_days']}天({trends['active_pct']}%), "
                    f"任务创建{trends['tasks_created']}, 完成{trends['tasks_done']}({trends['completion_rate']}%), "
                    f"趋势{trends['trend']}.\n"
                    f"请分析: 1)主要模式 2)值得注意的变化 3)一条改进建议。用中文。"
                )
            })
            return response.get("reply", "")
        except Exception:
            return None

    def _save_insight(self, results: dict) -> str:
        """保存洞察为 markdown 文件。"""
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = self.insights_dir / f"think_{ts}.md"
        lines = [
            f"# Think Engine Report — {datetime.now().isoformat()}",
            "",
            "## Trends",
            f"- Period: {results.get('trends', {}).get('period', '?')}",
            f"- Total Items: {results.get('trends', {}).get('total_items', 0)}",
            f"- Active Days: {results.get('trends', {}).get('active_days', 0)}",
            f"- Tasks Created: {results.get('trends', {}).get('tasks_created', 0)}",
            f"- Tasks Done: {results.get('trends', {}).get('tasks_done', 0)}",
            f"- Completion Rate: {results.get('trends', {}).get('completion_rate', 0)}%",
            f"- Trend: {results.get('trends', {}).get('trend', '?')}",
            "",
            "## AI Accuracy",
            f"- Parse Accuracy: {results.get('parse_accuracy', 'N/A')}%",
            "",
            "## Deep Review",
            results.get("deep_review", "(not generated)"),
        ]
        filename.write_text("\n".join(lines), encoding="utf-8")
        return str(filename)

    def run_loop(self, interval: int = 3600):
        """持续运行，每隔 interval 秒分析一次。"""
        print(f"Think Engine running, interval={interval}s")
        while True:
            try:
                self.deep_analyze()
            except Exception as exc:
                print(f"Analysis failed: {exc}")
            print(f"\nNext analysis in {interval}s...")
            _time.sleep(interval)


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Axiom Think Engine")
    parser.add_argument("--once", action="store_true", help="Run once and exit")
    parser.add_argument("--interval", type=int, default=3600, help="Interval in seconds (default: 3600)")
    parser.add_argument("--base-url", default="http://127.0.0.1:5001", help="Axiom base URL")
    parser.add_argument("--key", default="axiomnb", help="API key")
    args = parser.parse_args()

    engine = ThinkEngine(args.base_url, args.key)

    if args.once:
        engine.deep_analyze()
    else:
        engine.run_loop(args.interval)


if __name__ == "__main__":
    raise SystemExit(main())
