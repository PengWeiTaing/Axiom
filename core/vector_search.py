"""Embedding generation and vector similarity search helpers."""
from __future__ import annotations

import json
import logging
import os
from datetime import datetime, timezone

from core.database import get_db_connection

logger = logging.getLogger("axiom.receiver")

EMBEDDING_API_URL = os.environ.get("AXIOM_EMBEDDING_URL", "http://127.0.0.1:9050/v1")
EMBEDDING_API_KEY = os.environ.get("AXIOM_EMBEDDING_KEY", os.environ.get("AXIOM_DEEPSEEK_API_KEY", ""))
EMBEDDING_MODEL = os.environ.get("AXIOM_EMBEDDING_MODEL", "qwen3-Embedding-4B")


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def generate_embedding(text: str) -> list[float] | None:
    """调用 embedding API 生成向量。"""
    if not EMBEDDING_API_KEY or not text.strip():
        return None
    try:
        import urllib.request

        data = json.dumps({"model": EMBEDDING_MODEL, "input": text[:2000]}).encode("utf-8")
        req = urllib.request.Request(
            f"{EMBEDDING_API_URL}/embeddings",
            data=data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {EMBEDDING_API_KEY}",
            },
        )
        with urllib.request.urlopen(req, timeout=30) as resp:
            result = json.loads(resp.read().decode("utf-8"))
        return result["data"][0]["embedding"]
    except Exception:
        logger.exception("embedding generation failed")
        return None


def store_embedding(item_id: int, text: str) -> bool:
    """为 item 生成并存储向量。"""
    vec = generate_embedding(text)
    if not vec:
        return False

    import struct

    blob = struct.pack(f"{len(vec)}f", *vec)
    conn = get_db_connection()
    try:
        conn.execute(
            "INSERT OR REPLACE INTO items_vectors (item_id, embedding, model, created_at) VALUES (?, ?, ?, ?)",
            (item_id, blob, EMBEDDING_MODEL, utc_now().isoformat(timespec="seconds")),
        )
        conn.commit()
        return True
    except Exception:
        return False
    finally:
        conn.close()


def delete_embedding(item_id: int) -> None:
    """删除 item 的向量。"""
    conn = get_db_connection()
    try:
        conn.execute("DELETE FROM items_vectors WHERE item_id = ?", (item_id,))
        conn.commit()
    finally:
        conn.close()


def vector_search(query: str, limit: int = 10) -> list[dict]:
    """向量相似度搜索。"""
    import struct

    query_vec = generate_embedding(query)
    if not query_vec:
        return []
    conn = get_db_connection()
    try:
        rows = conn.execute(
            "SELECT item_id, embedding FROM items_vectors ORDER BY item_id DESC LIMIT 2000"
        ).fetchall()
    finally:
        conn.close()

    def dot(a, b):
        return sum(x * y for x, y in zip(a, b))

    def norm(a):
        return sum(x * x for x in a) ** 0.5

    q_norm = norm(query_vec)
    results = []
    for row in rows:
        try:
            emb = list(struct.unpack(f"{len(query_vec)}f", row["embedding"]))
            sim = dot(query_vec, emb) / (q_norm * norm(emb) + 1e-10)
            results.append({"id": row["item_id"], "score": round(sim, 4)})
        except Exception:
            pass

    results.sort(key=lambda x: -x["score"])
    return results[:limit]


def rebuild_all_vectors() -> dict:
    """重建所有 items 的向量。"""
    conn = get_db_connection()
    try:
        conn.execute("DELETE FROM items_vectors")
        rows = conn.execute(
            "SELECT id, content, original_name, derived_text, transcript_text FROM items ORDER BY id"
        ).fetchall()
    finally:
        conn.close()

    count = 0
    for row in rows:
        text = (row["content"] or row["original_name"] or row["derived_text"] or row["transcript_text"] or "")
        if text.strip() and store_embedding(row["id"], text[:2000]):
            count += 1
    return {"total": len(rows), "indexed": count}
