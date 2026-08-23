"""Cosmos 关联自动生成 — 规则初筛 + LLM 分类."""
import json
import math
from datetime import datetime, timezone
from uuid import uuid4

from flask import request

from core._common import (
    DEEPSEEK_API_KEY,
    DEEPSEEK_BASE_URL,
    DEEPSEEK_FAST_EXTRA_BODY,
    DEEPSEEK_MODEL,
    error_response,
    get_db_connection,
    ok_response,
    parse_positive_int,
    require_key,
)
from core.routes.cosmos import PREFIX_TO_TABLE, entity_id
from core.audit import write_audit_log

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

ENTITY_TABLES = {kind: table for kind, table in PREFIX_TO_TABLE.items() if kind != "lifeline"}
GENERATED_RELATION_TYPES = frozenset({"co_occurrence", "causal", "tension", "derived_from"})
RELATION_TYPES = frozenset({
    *GENERATED_RELATION_TYPES,
    "same_topic",
    "supports",
    "contradicts",
    "prerequisite",
    "next_action",
    "manual",
})
ASSOCIATION_STATUSES = frozenset({"pending", "accepted", "rejected"})


class AssociationValidationError(ValueError):
    def __init__(self, code: str, message: str):
        super().__init__(message)
        self.code = code
        self.message = message


def _parse_entity_ref(raw: object, field: str) -> tuple[str, str]:
    value = str(raw or "").strip()
    if ":" not in value:
        raise AssociationValidationError(
            "invalid_entity_ref",
            f"{field} 格式应为 kind:id（如 task:7）",
        )
    kind, raw_id = (part.strip() for part in value.split(":", 1))
    if kind not in ENTITY_TABLES or not raw_id:
        allowed = "、".join(sorted(ENTITY_TABLES))
        raise AssociationValidationError(
            "invalid_entity_ref",
            f"{field} 只支持 {allowed} 的真实对象",
        )
    return kind, raw_id


def _parse_relation_type(value: object) -> str:
    relation_type = str(value or "").strip()
    if relation_type not in RELATION_TYPES:
        raise AssociationValidationError("invalid_relation_type", "不支持的 relation_type")
    return relation_type


def _parse_status(value: object, *, review: bool = False) -> str:
    status = str(value or "").strip()
    allowed = {"accepted", "rejected"} if review else ASSOCIATION_STATUSES
    if status not in allowed:
        expected = "accepted 或 rejected" if review else "pending、accepted 或 rejected"
        raise AssociationValidationError("invalid_status", f"status 必须是 {expected}")
    return status


def _parse_confidence(value: object) -> float:
    try:
        confidence = float(value)
    except (TypeError, ValueError):
        raise AssociationValidationError("invalid_confidence", "confidence 必须是 0 到 1 的数字") from None
    if not math.isfinite(confidence) or not 0.0 <= confidence <= 1.0:
        raise AssociationValidationError("invalid_confidence", "confidence 必须在 0 到 1 之间")
    return round(confidence, 4)


def _normalize_evidence(value: object, fallback_weight: float) -> list[dict]:
    if not isinstance(value, list):
        raise AssociationValidationError("invalid_evidence", "evidence 必须是证据数组")
    normalized: list[dict] = []
    for item in value[:5]:
        if isinstance(item, dict):
            excerpt = str(item.get("excerpt") or "").strip()
            evidence_type = str(item.get("type") or "manual_note").strip()[:40]
            weight = _parse_confidence(item.get("weight", fallback_weight))
        else:
            excerpt = str(item or "").strip()
            evidence_type = "manual_note"
            weight = fallback_weight
        if excerpt:
            normalized.append({
                "type": evidence_type or "manual_note",
                "excerpt": excerpt[:240],
                "weight": weight,
            })
    if not normalized:
        raise AssociationValidationError("missing_evidence", "关系至少需要一条非空证据")
    return normalized


def _decode_evidence(raw: object) -> list[dict]:
    if not raw:
        return []
    try:
        parsed = json.loads(str(raw))
    except (json.JSONDecodeError, TypeError):
        return []
    return parsed if isinstance(parsed, list) else []


def _association_payload(row, *, status: str | None = None) -> dict:
    return {
        "id": row["id"],
        "from": entity_id(row["from_kind"], row["from_id"]),
        "to": entity_id(row["to_kind"], row["to_id"]),
        "relation_type": row["relation_type"],
        "confidence": row["confidence"],
        "status": status or row["status"],
        "evidence": _decode_evidence(row["evidence"]),
    }


def _entity_exists(conn, kind: str, raw_id: str) -> bool:
    table = ENTITY_TABLES[kind]
    return conn.execute(f"SELECT 1 FROM {table} WHERE id = ?", (raw_id,)).fetchone() is not None


def _association_exists(conn, from_kind: str, from_id: str, to_kind: str, to_id: str) -> bool:
    return conn.execute(
        """
        SELECT 1 FROM associations
        WHERE (from_kind = ? AND from_id = ? AND to_kind = ? AND to_id = ?)
           OR (from_kind = ? AND from_id = ? AND to_kind = ? AND to_id = ?)
        LIMIT 1
        """,
        (from_kind, from_id, to_kind, to_id, to_kind, to_id, from_kind, from_id),
    ).fetchone() is not None


def _normalize_llm_results(results: object, batch_start: int, batch_size: int) -> list[dict]:
    """把批次内 pair_index 映射为全局候选索引，丢弃不可治理的弱结果。"""
    if not isinstance(results, list):
        return []
    normalized: list[dict] = []
    for result in results:
        if not isinstance(result, dict):
            continue
        try:
            pair_index = int(result.get("pair_index", -1))
        except (TypeError, ValueError):
            continue
        relation_type = str(result.get("relation_type") or "none").strip()
        evidence = str(result.get("evidence") or "").strip()[:120]
        if pair_index < 1 or pair_index > batch_size:
            continue
        if relation_type not in GENERATED_RELATION_TYPES or not evidence:
            continue
        try:
            confidence = float(result.get("confidence", 0.5))
        except (TypeError, ValueError):
            confidence = 0.5
        if not math.isfinite(confidence):
            confidence = 0.5
        normalized.append({
            "candidate_index": batch_start + pair_index - 1,
            "relation_type": relation_type,
            "confidence": round(max(0.0, min(1.0, confidence)), 4),
            "evidence": evidence,
        })
    return normalized


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
                    extra_body=DEEPSEEK_FAST_EXTRA_BODY,
                )
                raw = resp.choices[0].message.content.strip()
                if raw.startswith("```"):
                    raw = raw.split("\n", 1)[-1].rsplit("\n```", 1)[0]
                results = json.loads(raw)
                all_results.extend(_normalize_llm_results(results, batch_start, len(batch)))
            except Exception as exc:
                batch_errors.append(f"batch {batches_sent}: {exc}")
                continue  # fail-fast per batch, continue remaining

        # 6. 写入 associations
        generated: list[dict] = []
        generated_candidate_indexes: set[int] = set()
        for r in all_results:
            candidate_index = r["candidate_index"]
            if candidate_index in generated_candidate_indexes or candidate_index >= len(selected):
                continue
            generated_candidate_indexes.add(candidate_index)
            rel_type = r["relation_type"]
            candidate = selected[candidate_index]
            a = candidate["entity_a"]
            b = candidate["entity_b"]
            confidence = r["confidence"]
            evidence_text = r["evidence"]

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

        if generated:
            write_audit_log(
                "association_generate",
                "association",
                detail=json.dumps({"count": len(generated), "lifeline_id": lifeline_id}, ensure_ascii=False),
            )

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
        try:
            status = _parse_status(body.get("status"), review=True)
        except AssociationValidationError as exc:
            return error_response(400, exc.code, exc.message)

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
        finally:
            conn.close()

        write_audit_log(
            "association_review",
            "association",
            detail=json.dumps({"id": assoc_id, "status": status}, ensure_ascii=False),
        )
        return ok_response({"association": _association_payload(row, status=status)})

    # === CRUD：手动创建/编辑/删除关联 ===

    @app.route("/cosmos/associations", methods=["POST"])
    def cosmos_assoc_create():
        auth_error = require_key()
        if auth_error:
            return auth_error

        body = request.get_json(silent=True) or {}
        try:
            from_kind, from_id_str = _parse_entity_ref(body.get("from"), "from")
            to_kind, to_id_str = _parse_entity_ref(body.get("to"), "to")
            relation_type = _parse_relation_type(body.get("relation_type", "manual"))
            confidence = _parse_confidence(body.get("confidence", 0.7))
            status = _parse_status(body.get("status", "accepted"))
            evidence_list = _normalize_evidence(body.get("evidence"), confidence)
        except AssociationValidationError as exc:
            return error_response(400, exc.code, exc.message)

        if (from_kind, from_id_str) == (to_kind, to_id_str):
            return error_response(400, "self_association", "不能创建对象到自身的关系")

        assoc_id = str(uuid4())[:8]
        evidence_json = json.dumps(evidence_list, ensure_ascii=False)

        conn = get_db_connection()
        try:
            if not _entity_exists(conn, from_kind, from_id_str):
                return error_response(404, "source_not_found", "from 指向的对象不存在")
            if not _entity_exists(conn, to_kind, to_id_str):
                return error_response(404, "target_not_found", "to 指向的对象不存在")
            if _association_exists(conn, from_kind, from_id_str, to_kind, to_id_str):
                return error_response(409, "association_exists", "这两个对象之间已经存在关系")
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

        write_audit_log(
            "association_create",
            "association",
            detail=json.dumps({
                "id": assoc_id,
                "from": entity_id(from_kind, from_id_str),
                "to": entity_id(to_kind, to_id_str),
                "relation_type": relation_type,
            }, ensure_ascii=False),
        )
        return ok_response({"association": {
            "id": assoc_id,
            "from": entity_id(from_kind, from_id_str),
            "to": entity_id(to_kind, to_id_str),
            "relation_type": relation_type,
            "confidence": confidence,
            "status": status,
            "evidence": evidence_list,
        }})

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
            try:
                confidence = (
                    _parse_confidence(body["confidence"])
                    if "confidence" in body
                    else float(row["confidence"])
                )
                if "relation_type" in body:
                    updates["relation_type"] = _parse_relation_type(body["relation_type"])
                if "confidence" in body:
                    updates["confidence"] = confidence
                if "status" in body:
                    updates["status"] = _parse_status(body["status"])
                if "evidence" in body:
                    updates["evidence"] = json.dumps(
                        _normalize_evidence(body["evidence"], confidence),
                        ensure_ascii=False,
                    )
            except AssociationValidationError as exc:
                return error_response(400, exc.code, exc.message)

            if not updates:
                return error_response(400, "no_updates", "没有可更新的关系字段")

            set_clauses = [f"{k} = ?" for k in updates]
            values = list(updates.values())
            values.append(assoc_id)
            conn.execute(f"UPDATE associations SET {', '.join(set_clauses)} WHERE id = ?", values)
            conn.commit()

            row = conn.execute("SELECT * FROM associations WHERE id = ?", (assoc_id,)).fetchone()
        finally:
            conn.close()

        write_audit_log(
            "association_update",
            "association",
            detail=json.dumps({"id": assoc_id, "fields": sorted(updates)}, ensure_ascii=False),
        )
        return ok_response({"association": _association_payload(row)})

    @app.route("/cosmos/associations/<path:assoc_id>", methods=["DELETE"])
    def cosmos_assoc_delete(assoc_id: str):
        auth_error = require_key()
        if auth_error:
            return auth_error

        conn = get_db_connection()
        try:
            row = conn.execute(
                "SELECT id, from_kind, from_id, to_kind, to_id FROM associations WHERE id = ?",
                (assoc_id,),
            ).fetchone()
            if not row:
                return error_response(404, "association_not_found", f"association '{assoc_id}' 不存在")
            conn.execute("DELETE FROM associations WHERE id = ?", (assoc_id,))
            conn.commit()
        finally:
            conn.close()

        write_audit_log(
            "association_delete",
            "association",
            detail=json.dumps({
                "id": assoc_id,
                "from": entity_id(row["from_kind"], row["from_id"]),
                "to": entity_id(row["to_kind"], row["to_id"]),
            }, ensure_ascii=False),
        )
        return ok_response({"ok": True, "message": f"已删除 association:{assoc_id}"})

    return  # register_routes 结束
