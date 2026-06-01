"""Cosmos 关联自动生成 — 规则初筛 + LLM 分类."""
import json
from datetime import datetime, timezone
from uuid import uuid4

from flask import request

from core._common import (
    DEEPSEEK_API_KEY,
    DEEPSEEK_BASE_URL,
    DEEPSEEK_MODEL,
    error_response,
    get_db_connection,
    ok_response,
    parse_positive_int,
    require_key,
)
from core.routes.cosmos import PREFIX_TO_TABLE, entity_id

SYSTEM_PROMPT = """你是个人知识图谱的关联分类器。对每对 entity，判断关系类型：
- co_occurrence: 同主题/同场景/同时间段
- causal: A 导致/触发了 B（或反过来）
- tension: 矛盾、竞争、冲突
- derived_from: B 从 A 衍生（任务从记忆中产生、决策基于某条笔记等）
- none: 无明显关联

只返回 JSON，格式：
[{"pair_index": 1, "relation_type": "...", "confidence": 0.75, "evidence": "..."}, ...]
confidence 范围 0-1。evidence 是 1 句简短摘录（≤40 字），说明判断依据。
如果 relation_type 是 none，confidence 设 0，evidence 留空字符串。
不要返回任何非 JSON 文本。"""

BATCH_SIZE = 20
SCORE_THRESHOLD = 0.5
MAX_PER_LIFELINE = 30


# === 文本提取 ===

def extract_entity_text(row: dict, kind: str) -> str:
    """从四种 entity 行提取搜索文本。"""
    if kind == "item":
        return (row.get("content") or "") + " " + (row.get("original_name") or "")
    elif kind == "task":
        return (row.get("title") or "") + " " + (row.get("detail") or "")
    elif kind == "memory":
        return row.get("content") or ""
    elif kind == "decision":
        return (row.get("title") or "") + " " + (row.get("context") or "") + " " + (row.get("decision") or "")
    return ""


# === Bigram 相似度 ===

def bigrams(text: str) -> set[str]:
    """提取 2-gram 集合。中文走字符二元组，ASCII 词走空格分词后二元组。"""
    tokens: list[str] = []
    buf = ""
    for ch in text:
        if ch.isascii() and ch.isalpha():
            buf += ch.lower()
        else:
            if buf:
                tokens.append(buf)
                buf = ""
            if not ch.isspace():
                tokens.append(ch)
    if buf:
        tokens.append(buf)
    result: set[str] = set()
    for i in range(len(tokens) - 1):
        result.add(tokens[i] + "\x00" + tokens[i + 1])
    return result


def bigram_similarity(text_a: str, text_b: str) -> float:
    a = bigrams(text_a)
    b = bigrams(text_b)
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


# === 候选评分 ===

def candidate_score(entity_a: dict, entity_b: dict, text_a: str, text_b: str) -> tuple[float, dict]:
    """返回 (总分, 分项)。"""
    score = 0.3  # 同 lifeline 基分
    breakdown = {"lifeline": 0.3, "temporal": 0.0, "keyword": 0.0}

    # 时间邻接
    try:
        t_a = datetime.fromisoformat(entity_a["created_at"])
        t_b = datetime.fromisoformat(entity_b["created_at"])
        delta_hours = abs((t_a - t_b).total_seconds()) / 3600
        if delta_hours <= 24:
            score += 0.3
            breakdown["temporal"] = 0.3
        elif delta_hours <= 168:
            score += 0.15
            breakdown["temporal"] = 0.15
    except (ValueError, TypeError):
        pass

    # 关键词重叠
    sim = bigram_similarity(text_a, text_b)
    score += sim * 0.4
    breakdown["keyword"] = round(sim * 0.4, 4)

    return score, breakdown


# === 核心函数 ===

def generate_associations(lifeline_id: str | None = None, max_candidates: int = 50, dry_run: bool = False) -> dict:
    conn = get_db_connection()
    try:
        # 1. 收集所有 entity（只取有 lifeline_id 的）
        entities: list[dict] = []

        for r in conn.execute(
            "SELECT id, content, original_name, created_at, lifeline_id FROM items WHERE lifeline_id IS NOT NULL"
        ).fetchall():
            entities.append({
                "id": r["id"], "kind": "item",
                "title": (r["content"] or r["original_name"] or "")[:80],
                "created_at": r["created_at"],
                "lifeline_id": r["lifeline_id"],
                "content": r["content"], "original_name": r["original_name"],
            })

        for r in conn.execute(
            "SELECT id, title, detail, created_at, lifeline_id FROM tasks WHERE lifeline_id IS NOT NULL"
        ).fetchall():
            entities.append({
                "id": r["id"], "kind": "task",
                "title": (r["title"] or "")[:80],
                "created_at": r["created_at"],
                "lifeline_id": r["lifeline_id"],
                "detail": r["detail"],
            })

        for r in conn.execute(
            "SELECT id, content, created_at, lifeline_id FROM memories WHERE lifeline_id IS NOT NULL"
        ).fetchall():
            entities.append({
                "id": r["id"], "kind": "memory",
                "title": (r["content"] or "")[:80],
                "created_at": r["created_at"],
                "lifeline_id": r["lifeline_id"],
                "content": r["content"],
            })

        for r in conn.execute(
            "SELECT id, title, context, decision, created_at, lifeline_id FROM decisions WHERE lifeline_id IS NOT NULL"
        ).fetchall():
            entities.append({
                "id": r["id"], "kind": "decision",
                "title": (r["title"] or "")[:80],
                "created_at": r["created_at"],
                "lifeline_id": r["lifeline_id"],
                "context": r["context"], "decision": r["decision"],
            })

        # 2. 按 lifeline_id 分组
        groups: dict[str, list[dict]] = {}
        for e in entities:
            lid = e["lifeline_id"]
            if lifeline_id and lid != lifeline_id:
                continue
            groups.setdefault(lid, []).append(e)

        # 3. 加载已有 associations（去重用）
        existing: set[tuple[str, str, str, str]] = set()
        for r in conn.execute("SELECT from_kind, from_id, to_kind, to_id FROM associations").fetchall():
            existing.add((r["from_kind"], str(r["from_id"]), r["to_kind"], str(r["to_id"])))
            existing.add((r["to_kind"], str(r["to_id"]), r["from_kind"], str(r["from_id"])))

        # 4. 阶段 1 — 候选生成
        candidates: list[dict] = []  # {score, score_breakdown, a, b}
        skipped_existing = 0

        for group_entities in groups.values():
            group_candidates: list[dict] = []
            for i in range(len(group_entities)):
                for j in range(i + 1, len(group_entities)):
                    a = group_entities[i]
                    b = group_entities[j]

                    key = (a["kind"], str(a["id"]), b["kind"], str(b["id"]))
                    if key in existing:
                        skipped_existing += 1
                        continue

                    text_a = extract_entity_text(a, a["kind"])
                    text_b = extract_entity_text(b, b["kind"])
                    score, breakdown = candidate_score(a, b, text_a, text_b)

                    if score >= SCORE_THRESHOLD:
                        group_candidates.append({
                            "score": score, "score_breakdown": breakdown,
                            "entity_a": a, "entity_b": b,
                        })

            group_candidates.sort(key=lambda c: -c["score"])
            candidates.extend(group_candidates[:MAX_PER_LIFELINE])

        candidates.sort(key=lambda c: -c["score"])
        total_candidates = len(candidates)

        # 5. 阶段 2 — LLM 分类
        if dry_run:
            return {
                "dry_run": True,
                "candidates_found": total_candidates,
                "skipped_existing": skipped_existing,
                "candidates": _format_dry_run_candidates(candidates),
            }

        if total_candidates == 0:
            return {
                "dry_run": False,
                "candidates_found": 0,
                "batches_sent": 0,
                "associations_generated": 0,
                "skipped_existing": skipped_existing,
                "associations": [],
            }

        selected = candidates[:max_candidates]

        if not DEEPSEEK_API_KEY:
            return {
                "error": "ai_unavailable",
                "message": "未配置 AI key，无法生成关联。请用 dry_run=true 先验证候选。",
                "candidates_found": total_candidates,
                "dry_run": False,
            }

        import openai as _openai
        client = _openai.OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)

        all_results: list[dict] = []
        batches_sent = 0
        batch_errors: list[str] = []

        for batch_start in range(0, len(selected), BATCH_SIZE):
            batch = selected[batch_start:batch_start + BATCH_SIZE]
            batches_sent += 1

            # 构建 prompt
            parts: list[str] = []
            for idx, c in enumerate(batch):
                a = c["entity_a"]
                b = c["entity_b"]
                a_date = _format_date(a.get("created_at", ""))
                b_date = _format_date(b.get("created_at", ""))
                parts.append(
                    f"## Entity Pair {idx + 1}\n"
                    f"A: [{a['kind']}] {a['title']} (created: {a_date})\n"
                    f"B: [{b['kind']}] {b['title']} (created: {b_date})\n"
                )
            batch_prompt = "\n".join(parts)

            try:
                resp = client.chat.completions.create(
                    model=DEEPSEEK_MODEL,
                    messages=[
                        {"role": "system", "content": SYSTEM_PROMPT},
                        {"role": "user", "content": batch_prompt},
                    ],
                    max_tokens=2000,
                    temperature=0.3,
                )
                raw = resp.choices[0].message.content.strip()
                if raw.startswith("```"):
                    raw = raw.split("\n", 1)[-1].rsplit("\n```", 1)[0]
                results = json.loads(raw)
                all_results.extend(results)
            except Exception as exc:
                batch_errors.append(f"batch {batches_sent}: {exc}")
                continue  # fail-fast per batch, continue remaining

        # 6. 写入 associations
        generated: list[dict] = []
        for r in all_results:
            pair_idx = r.get("pair_index", -1)
            rel_type = r.get("relation_type", "none")
            if rel_type == "none" or pair_idx < 1 or pair_idx > len(selected):
                continue

            candidate = selected[pair_idx - 1]
            a = candidate["entity_a"]
            b = candidate["entity_b"]
            confidence = float(r.get("confidence", 0.5))
            evidence_text = str(r.get("evidence", "") or "")[:120]

            assoc_id = str(uuid4())[:8]
            evidence_json = json.dumps(
                [{"type": "llm_judgment", "excerpt": evidence_text, "weight": confidence}],
                ensure_ascii=False,
            )

            conn.execute(
                "INSERT INTO associations (id, from_kind, from_id, to_kind, to_id, relation_type, confidence, status, evidence, created_at) "
                "VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)",
                (
                    assoc_id,
                    a["kind"], str(a["id"]), b["kind"], str(b["id"]),
                    rel_type, confidence,
                    evidence_json,
                    datetime.now(timezone.utc).isoformat(),
                ),
            )

            generated.append({
                "id": assoc_id,
                "from": entity_id(a["kind"], a["id"]),
                "to": entity_id(b["kind"], b["id"]),
                "relation_type": rel_type,
                "confidence": confidence,
                "status": "pending",
                "evidence": [{"type": "llm_judgment", "excerpt": evidence_text, "weight": confidence}],
            })

        conn.commit()

        return {
            "dry_run": False,
            "candidates_found": total_candidates,
            "batches_sent": batches_sent,
            "associations_generated": len(generated),
            "skipped_existing": skipped_existing,
            "associations": generated,
            "errors": batch_errors or [],
        }
    finally:
        conn.close()


def _format_date(iso_str: str) -> str:
    try:
        return datetime.fromisoformat(iso_str).strftime("%Y-%m-%d")
    except (ValueError, TypeError):
        return iso_str[:10] if iso_str else "?"


def _format_dry_run_candidates(candidates: list[dict]) -> list[dict]:
    return [
        {
            "entity_a": {
                "id": entity_id(c["entity_a"]["kind"], c["entity_a"]["id"]),
                "kind": c["entity_a"]["kind"],
                "title": c["entity_a"]["title"],
            },
            "entity_b": {
                "id": entity_id(c["entity_b"]["kind"], c["entity_b"]["id"]),
                "kind": c["entity_b"]["kind"],
                "title": c["entity_b"]["title"],
            },
            "score": round(c["score"], 4),
            "score_breakdown": c["score_breakdown"],
        }
        for c in candidates
    ]


# === 路由注册 ===

def register_routes(app):

    @app.route("/cosmos/associations/generate", methods=["POST"])
    def cosmos_assoc_generate():
        auth_error = require_key()
        if auth_error:
            return auth_error

        lifeline_id = request.args.get("lifeline_id", "").strip() or None
        max_candidates = parse_positive_int(request.args.get("max_candidates"), "max_candidates", 50, 200)
        raw_dry = str(request.args.get("dry_run", "")).strip().lower()
        dry_run = raw_dry in ("true", "1", "yes")

        result = generate_associations(lifeline_id=lifeline_id, max_candidates=max_candidates, dry_run=dry_run)

        if result.get("error") == "ai_unavailable":
            return error_response(503, "ai_unavailable", result.get("message", "AI key 未配置"))
        return ok_response(result)

    @app.route("/cosmos/associations/<path:assoc_id>/review", methods=["POST"])
    def cosmos_assoc_review(assoc_id: str):
        auth_error = require_key()
        if auth_error:
            return auth_error

        body = request.get_json(silent=True) or {}
        status = str(body.get("status", "")).strip()
        if status not in ("accepted", "rejected"):
            return error_response(400, "invalid_status", "status 必须是 accepted 或 rejected")

        conn = get_db_connection()
        try:
            row = conn.execute(
                "SELECT id, from_kind, from_id, to_kind, to_id, relation_type, confidence, status, evidence "
                "FROM associations WHERE id = ?", (assoc_id,)
            ).fetchone()
            if not row:
                return error_response(404, "association_not_found", f"association '{assoc_id}' 不存在")

            conn.execute("UPDATE associations SET status = ? WHERE id = ?", (status, assoc_id))
            conn.commit()

            evidence_raw = row["evidence"]
            evidence = json.loads(evidence_raw) if evidence_raw else []
        finally:
            conn.close()

        return ok_response({
            "association": {
                "id": row["id"],
                "from": entity_id(row["from_kind"], row["from_id"]),
                "to": entity_id(row["to_kind"], row["to_id"]),
                "relation_type": row["relation_type"],
                "confidence": row["confidence"],
                "status": status,
                "evidence": evidence,
            },
        })

    # === CRUD：手动创建/编辑/删除关联 ===

    @app.route("/cosmos/associations", methods=["POST"])
    def cosmos_assoc_create():
        auth_error = require_key()
        if auth_error:
            return auth_error

        body = request.get_json(silent=True) or {}
        from_raw = str(body.get("from", "")).strip()
        to_raw = str(body.get("to", "")).strip()
        relation_type = str(body.get("relation_type", "manual")).strip()
        confidence = float(body.get("confidence", 0.7))
        status = str(body.get("status", "accepted")).strip()
        evidence_list = body.get("evidence", [])

        if not from_raw or not to_raw:
            return error_response(400, "missing_fields", "from 和 to 不能为空")
        if ":" not in from_raw or ":" not in to_raw:
            return error_response(400, "invalid_format", "from/to 格式应为 kind:id（如 task:7）")

        from_kind, from_id_str = from_raw.split(":", 1)
        to_kind, to_id_str = to_raw.split(":", 1)

        if relation_type not in ("co_occurrence", "causal", "tension", "derived_from", "manual"):
            relation_type = "manual"
        if status not in ("pending", "accepted", "rejected"):
            status = "accepted"
        confidence = max(0.0, min(1.0, confidence))

        if not isinstance(evidence_list, list):
            evidence_list = []

        assoc_id = str(uuid4())[:8]
        evidence_json = json.dumps(evidence_list, ensure_ascii=False)

        conn = get_db_connection()
        try:
            conn.execute(
                "INSERT INTO associations (id, from_kind, from_id, to_kind, to_id, relation_type, confidence, status, evidence, created_at) "
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    assoc_id, from_kind, from_id_str, to_kind, to_id_str,
                    relation_type, confidence, status,
                    evidence_json,
                    datetime.now(timezone.utc).isoformat(),
                ),
            )
            conn.commit()
        finally:
            conn.close()

        return ok_response({
            "association": {
                "id": assoc_id,
                "from": entity_id(from_kind, from_id_str),
                "to": entity_id(to_kind, to_id_str),
                "relation_type": relation_type,
                "confidence": confidence,
                "status": status,
                "evidence": evidence_list,
            },
        })

    @app.route("/cosmos/associations/<path:assoc_id>", methods=["PUT"])
    def cosmos_assoc_update(assoc_id: str):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            row = conn.execute("SELECT * FROM associations WHERE id = ?", (assoc_id,)).fetchone()
            if not row:
                return error_response(404, "association_not_found", f"association '{assoc_id}' 不存在")

            body = request.get_json(silent=True) or {}

            updates: dict[str, str | float] = {}
            if "relation_type" in body:
                rt = str(body["relation_type"]).strip()
                if rt in ("co_occurrence", "causal", "tension", "derived_from", "manual"):
                    updates["relation_type"] = rt
            if "confidence" in body:
                updates["confidence"] = max(0.0, min(1.0, float(body["confidence"])))
            if "status" in body:
                st = str(body["status"]).strip()
                if st in ("pending", "accepted", "rejected"):
                    updates["status"] = st
            if "evidence" in body:
                ev = body["evidence"]
                if isinstance(ev, list):
                    updates["evidence"] = json.dumps(ev, ensure_ascii=False)

            set_clauses = [f"{k} = ?" for k in updates]
            values = list(updates.values())
            if set_clauses:
                values.append(assoc_id)
                conn.execute(f"UPDATE associations SET {', '.join(set_clauses)} WHERE id = ?", values)
                conn.commit()

            row = conn.execute("SELECT * FROM associations WHERE id = ?", (assoc_id,)).fetchone()
            evidence_raw = row["evidence"]
            evidence = json.loads(evidence_raw) if evidence_raw else []
        finally:
            conn.close()

        return ok_response({
            "association": {
                "id": row["id"],
                "from": entity_id(row["from_kind"], row["from_id"]),
                "to": entity_id(row["to_kind"], row["to_id"]),
                "relation_type": row["relation_type"],
                "confidence": row["confidence"],
                "status": row["status"],
                "evidence": evidence,
            },
        })

    @app.route("/cosmos/associations/<path:assoc_id>", methods=["DELETE"])
    def cosmos_assoc_delete(assoc_id: str):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            row = conn.execute("SELECT id FROM associations WHERE id = ?", (assoc_id,)).fetchone()
            if not row:
                return error_response(404, "association_not_found", f"association '{assoc_id}' 不存在")
            conn.execute("DELETE FROM associations WHERE id = ?", (assoc_id,))
            conn.commit()
        finally:
            conn.close()

        return ok_response({"ok": True, "message": f"已删除 association:{assoc_id}"})

    return  # register_routes 结束
