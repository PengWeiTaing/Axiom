"""URL content fetch helpers."""
from __future__ import annotations

import json
import re


def fetch_url_content(url: str) -> dict:
    """抓取 URL 内容。支持 Bilibili 视频和通用网页。"""
    if _is_bilibili_url(url):
        return _fetch_bilibili(url)
    return _fetch_generic_url(url)


def _is_bilibili_url(url: str) -> bool:
    return bool(re.search(r"bilibili\.com/video/(BV[a-zA-Z0-9]+|av\d+)", url))


def _parse_bilibili_id(url: str) -> tuple[str | None, str | None]:
    m = re.search(r"bilibili\.com/video/(BV[a-zA-Z0-9]+)", url)
    if m:
        return m.group(1), "BV"
    m = re.search(r"bilibili\.com/video/av(\d+)", url)
    if m:
        return m.group(1), "AV"
    return None, None


def _fetch_bilibili(url: str) -> dict:
    """抓取 Bilibili 视频信息、字幕和 AI 摘要。"""
    vid, _ = _parse_bilibili_id(url)
    if not vid:
        return {"error": "无法解析 Bilibili 链接", "content": url}

    import urllib.request

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://www.bilibili.com/",
    }
    parts = []
    metadata = {}

    try:
        api_url = f"https://api.bilibili.com/x/web-interface/view?bvid={vid}"
        req = urllib.request.Request(api_url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        if data.get("code") == 0:
            vdata = data["data"]
            metadata["title"] = vdata.get("title", "")
            metadata["author"] = vdata.get("owner", {}).get("name", "")
            metadata["description"] = vdata.get("desc", "")[:500]
            metadata["duration"] = f"{vdata.get('duration', 0) // 60}:{vdata.get('duration', 0) % 60:02d}"
            metadata["tags"] = vdata.get("tname", "")

            if not metadata.get("title"):
                return {"error": "Bilibili API 无法获取视频信息（可能地区限制）", "title": url, "content": url}

            parts.append(f"# {metadata['title']}")
            parts.append(f"作者: {metadata['author']} | 时长: {metadata['duration']} | 分区: {metadata['tags']}")
            if metadata["description"]:
                parts.append(f"\n## 简介\n{metadata['description']}")

            cid = vdata.get("cid", 0)
            if cid:
                try:
                    sub_url = f"https://api.bilibili.com/x/player/v2?bvid={vid}&cid={cid}"
                    req2 = urllib.request.Request(sub_url, headers=headers)
                    with urllib.request.urlopen(req2, timeout=10) as resp2:
                        sub_data = json.loads(resp2.read().decode("utf-8"))
                    subtitle_list = sub_data.get("data", {}).get("subtitle", {}).get("subtitles", [])
                    if subtitle_list:
                        sub_url_raw = subtitle_list[0].get("subtitle_url", "")
                        if sub_url_raw and sub_url_raw.startswith("//"):
                            sub_url_raw = "https:" + sub_url_raw
                        if sub_url_raw:
                            req3 = urllib.request.Request(sub_url_raw, headers=headers)
                            with urllib.request.urlopen(req3, timeout=10) as resp3:
                                sub_content = json.loads(resp3.read().decode("utf-8"))
                            subtitle_lines = []
                            for item in sub_content.get("body", []):
                                subtitle_lines.append(item.get("content", ""))
                            subtitle_text = "\n".join(subtitle_lines)
                            parts.append(f"\n## 字幕/转写\n{subtitle_text[:5000]}")
                except Exception:
                    pass
    except Exception as e:
        return {"error": f"Bilibili API 请求失败: {e}", "content": url}

    content = "\n".join(parts)
    return {
        "content": content,
        "title": metadata.get("title", ""),
        "source_url": url,
        "site": "bilibili",
        "metadata": metadata,
    }


def _fetch_generic_url(url: str) -> dict:
    """抓取通用网页的标题和正文。"""
    import urllib.request

    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        })
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        return {"error": f"无法访问链接: {e}", "content": url}

    title_match = re.search(r"<title>(.+?)</title>", html, re.IGNORECASE)
    title = title_match.group(1).strip() if title_match else ""

    text = re.sub(r"<script[^>]*>.*?</script>", "", html, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r"<style[^>]*>.*?</style>", "", text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\s+", " ", text).strip()

    content = (f"# {title}\n\n" if title else "") + text[:5000]

    return {
        "content": content,
        "title": title,
        "source_url": url,
        "site": "web",
    }
