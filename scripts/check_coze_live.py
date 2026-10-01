r"""检查扣子工作流是否真的接通，并跑一次真实生成。

用法（先设好 COZE_* 与 AXIOM_SECRET_KEY，再启动服务）：
    python scripts\check_coze_live.py
    python scripts\check_coze_live.py --goal "什么是矩阵的特征值"

脚本只读取环境变量，不打印令牌本身，也不会把令牌写到任何文件里。
"""
from __future__ import annotations

import argparse
import json
import os
import time
import urllib.error
import urllib.request

JOBS_PATH = "/api/learning/knowledge-scenes/jobs"
# 刻意挑一个没有离线样例的主题：命中精品场景就说明不了扣子是否接通。
DEFAULT_GOAL = "什么是矩阵的特征值和特征向量"


def request_json(url: str, *, payload=None, key: str = "", timeout: int = 30):
    data = json.dumps(payload).encode() if payload is not None else None
    headers = {"Content-Type": "application/json"}
    if key:
        headers["X-Axiom-Key"] = key
    req = urllib.request.Request(url, data=data, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as res:
            return res.status, json.loads(res.read().decode())
    except urllib.error.HTTPError as exc:
        try:
            return exc.code, json.loads(exc.read().decode())
        except Exception:
            return exc.code, {}
    except urllib.error.URLError as exc:
        return 0, {"_unreachable": str(exc.reason)}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", default="http://127.0.0.1:5000")
    parser.add_argument("--goal", default=DEFAULT_GOAL)
    parser.add_argument("--timeout", type=int, default=420, help="等待生成的秒数上限")
    args = parser.parse_args()

    token = os.environ.get("COZE_API_TOKEN", "").strip()
    workflow = os.environ.get("COZE_WORKFLOW_ID", "").strip()
    key = os.environ.get("AXIOM_SECRET_KEY", "").strip()

    print()
    print("  1) 环境变量")
    print(f"     COZE_API_TOKEN     {'已设置' if token else '缺失 ← 不配就只能走离线'}")
    print(f"     COZE_WORKFLOW_ID   {workflow or '缺失 ← 不配就只能走离线'}")
    print(f"     AXIOM_SECRET_KEY   {'已设置' if key else '缺失 ← 没有它服务端不会调扣子'}")
    if not (token and workflow and key):
        print()
        print("  三项必须同时设置在【启动服务的那个终端】里，然后重启服务。")
        return 1

    print()
    print("  2) 服务端自检")
    status, health = request_json(f"{args.base}/health")
    if status != 200:
        print(f"     [x] {args.base}/health 不可达，先启动服务")
        return 1
    print(f"     /health -> ok={health.get('ok')}")

    print()
    print(f"  3) 真实生成：{args.goal}")
    print("     故意挑没有离线样例的主题；能成就证明扣子真的在跑。")
    started = time.time()
    status, created = request_json(
        f"{args.base}{JOBS_PATH}", payload={"goal": args.goal}, key=key
    )
    job_id = created.get("job_id")
    if not job_id:
        print(f"     [x] 创建任务失败 http={status} {json.dumps(created, ensure_ascii=False)[:200]}")
        return 1

    last_stage = ""
    while time.time() - started < args.timeout:
        time.sleep(3)
        status, job = request_json(f"{args.base}{JOBS_PATH}/{job_id}", key=key, timeout=30)
        stage = (job.get("progress") or {}).get("stage", "")
        if stage and stage != last_stage:
            last_stage = stage
            print(f"     … {int(time.time() - started)}s {stage}")
        if job.get("status") in {"succeeded", "failed"}:
            break
    else:
        print(f"     [x] 等待超过 {args.timeout}s 仍未结束")
        return 1

    elapsed = int(time.time() - started)
    if job.get("status") != "succeeded":
        err = job.get("error") or {}
        print(f"     [x] 生成失败（{elapsed}s）：{err.get('code')} — {err.get('message')}")
        return 1

    scene = job.get("scene") or {}
    generation = scene.get("generation") or {}
    provider = generation.get("provider")
    print(f"     [+] 成功（{elapsed}s）：{scene.get('title')}")
    print(f"         provider={provider} 质量={generation.get('quality_status')}/{generation.get('quality_score')}")

    print()
    if provider == "coze":
        print("  结论：扣子工作流已接通，可以现场演示真实生成。")
        print(f"        本次耗时 {elapsed} 秒——答辩时按这个时间安排讲解。")
        return 0

    print(f"  结论：这次走的是 {provider}，不是扣子。")
    print(f"        原因：{generation.get('fallback_reason') or '未说明'}")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
