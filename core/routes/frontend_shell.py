"""Shared helpers for serving the Vite frontend shell."""
from __future__ import annotations

from pathlib import Path

from flask import render_template_string, send_file


def serve_vite_app(app, missing_status: int = 404):
    static_root = Path(app.static_folder).resolve() if app.static_folder else None
    v2_index = static_root / "v2" / "index.html" if static_root else None
    if v2_index and v2_index.exists():
        return send_file(v2_index, mimetype="text/html")

    return render_template_string(
        """<!doctype html><html lang="zh"><head><meta charset="utf-8">
<title>Axiom (未构建)</title><style>body{font-family:system-ui;max-width:560px;margin:80px auto;padding:24px;background:#07090d;color:#b4bcc9;line-height:1.6}
h1{color:#6ee7d0;font-weight:500;margin-bottom:12px}code{background:#141921;padding:2px 8px;border-radius:4px;color:#e8ecf2;font-family:ui-monospace,monospace}
.hint{color:#7d8694;margin-top:24px;font-size:14px}a{color:#6ee7d0}</style></head><body>
<h1>Axiom 前端尚未构建</h1>
<p>新一代前端在 <code>frontend/</code> 目录。先构建一次再访问。</p>
<p>本地：<br><code>cd frontend && npm install && npm run build</code></p>
<p class="hint">构建产物会输出到 <code>core/static/v2/</code>。旧版移动 Web App 在 <a href="/app/legacy">/app/legacy</a>。</p>
</body></html>"""
    ), missing_status
