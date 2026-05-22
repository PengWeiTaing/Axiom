# Axiom 前端重构指南

> 本文档供 Claude 模型重建 Axiom 前端时快速理解项目全貌。

## 一、项目概要

Axiom 是一个**个人外脑系统**——把想法、文件、链接存进去，AI 帮你整理、检索、建议。后端 70+ API 端点在 VPS 上稳定运行，前端需要重做成跨平台（Web/iOS/Windows）、高端概念感的暗色玻璃 UI。

### 技术栈

- **后端**: Python 3.12 + Flask + SQLite (WAL mode) + FTS5 全文搜索
- **AI**: DeepSeek (OpenAI 兼容, `deepseek-chat` 模型)
- **部署**: VPS (157.245.159.152), Nginx, Gunicorn, systemd
- **前端当前状态**: 暗色玻璃主题, 5 面板, 侧边栏+底部导航, 4200 行 JS
- **PWA**: manifest + service worker 已有

### 核心设计理念

**你不需要知道数据该放哪里——AI 会判断。**
- 打字 → AI 自动判断是笔记、任务还是记忆
- 少思考、多记录

## 二、快速启动

```bash
# 本地运行
pip install -r requirements.txt
python -c "from core.receiver import app; app.run(host='0.0.0.0', port=5000)"

# 冒烟测试
python scripts/smoke_test_receiver.py

# 前端文件位置
core/static/app.js      # JS 逻辑（4213 行）
core/static/app.css     # 样式（640 行）
core/templates/app.html # HTML 框架（~700 行）
```

## 三、API 架构

### 认证方式

所有 API（除 `/health` `/app` `/sw.js`）都需要在 Header 中带 `X-Axiom-Key`，值为预设的共享 key。

```
X-Axiom-Key: axiomnb
```

### 响应格式

```json
// 成功
{"ok": true, "key": "value", ...}

// 失败
{"ok": false, "error": {"code": "error_code", "message": "人类可读信息"}}

// 分页
{"page": 1, "page_size": 10, "total": 100, "total_pages": 10, "items": [...]}
```

### Python SDK（推荐使用）

```python
from core.client import AxiomClient
c = AxiomClient("https://pengweitai.me", "axiomnb")

# 数据操作
c.add_note("今天跑步5公里")
c.create_task("交周报", priority="high")
c.create_memory("goal", "年底前减到65kg")
c.create_decision("换工作", "接受A公司offer", reasoning="薪资涨30%")

# 查询
c.search("Python")           # FTS5 全文搜索
c.search_all("AI")           # 跨表搜索 (items+memories+tasks+decisions)
c.stats()                    # 系统统计
c.overview()                 # 总览数据
c.tasks_today()              # 今日任务 + 过期

# AI 功能
c.ai_parse("明天下午3点开会")  # → {"type":"task","title":"开会","due_date":"2026-05-21"}
c.ai_chat("今天该做什么？")    # 流式聊天（需用fetch直接调 /chat/stream）
c.ai_suggestions()           # AI 建议
c.ai_brief()                 # 每日简报
c.ai_weekly_report()         # 周报

# 管理
c.health()                   # 健康检查
c.system()                   # 完整系统状态
c.insights()                 # 使用模式分析 + AI准确率
```

## 四、全部 API 端点

### 采集层 — 8 个端点

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/add` | 写入文本。body: `{"text":"...", "source":"web_app"}` |
| POST | `/upload` | 上传文件。multipart: `file` + `content`(说明) + `source` |
| POST | `/fetch` | 抓取URL内容（B站视频可抓字幕）。body: `{"url":"..."}` |
| GET | `/item/<id>` | 获取单条元数据 |
| POST | `/item/<id>/update` | 更新条目 (content/source/derived_text/transcript_text) |
| DELETE | `/item/<id>` | 删除条目（清理文件+FK关联） |
| GET | `/file/<id>` | 按id取回文件 |
| POST | `/archive/<id>` | 归档 item 文件 (inbox → archive) |
| POST | `/restore/<id>` | 恢复 item 文件 (archive → inbox) |

### 检索层 — 7 个端点

| 方法 | 路径 | 参数 | 说明 |
|------|------|------|------|
| GET | `/search` | `q`, `mode=semantic`, `page`, `type`, `storage`, `source`, `sort`, `created_from`, `created_to`, `processing_state` | FTS5搜索 + AI语义搜索 |
| GET | `/search/vector` | `q`, `limit` | **向量语义搜索**（Qwen3-Embedding-4B，2048维，cosine similarity） |
| GET | `/search/all` | `q`, `limit` | 跨表搜索（items+memories+tasks+decisions） |
| GET | `/recent` | `page`, `type`, `storage`, `source`, `created_from`, `created_to`, `processing_state` | 最近记录 |
| GET | `/stats` | — | 总量/类型/来源/存储/记忆/任务计数 + streak |
| GET | `/overview` | `recent_limit`, `preview_chars` | 聚合返回 stats + recent + backlog + artifacts |
| GET | `/overview/text` | — | 纯文本总览，适合快捷指令显示 |

### 记忆层 — 7 个端点

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/memories` | 列表。参数: `category`(fact/preference/goal/relationship/event), `status`(candidate/confirmed/archived), `page` |
| POST | `/memories` | 创建。body: `{"category":"goal","content":"年底减到65kg"}` |
| GET | `/memories/<id>` | 详情（含 linked_tasks 和 task_progress） |
| PUT | `/memories/<id>` | 更新 |
| DELETE | `/memories/<id>` | 删除 |
| POST | `/memories/<id>/confirm` | 确认候选记忆 → confirmed |
| POST | `/memories/<id>/archive` | 归档记忆 → archived |
| GET | `/memories/stats` | 按category/status统计 |
| POST | `/memories/suggest` | AI从最近记录中提取候选记忆 |

### 计划层 — 10 个端点

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/tasks` | 列表。参数: `status`(todo/done/cancelled), `priority`(high/medium/low), `page` |
| POST | `/tasks` | 创建。body: `{"title":"...", "priority":"medium", "due_date":"2026-05-21", "estimated_minutes":30, "memory_id":null}` |
| GET | `/tasks/<id>` | 详情 |
| PUT | `/tasks/<id>` | 更新 |
| DELETE | `/tasks/<id>` | 删除 |
| POST | `/tasks/<id>/done` | 标记完成 |
| POST | `/tasks/<id>/todo` | 恢复待办 |
| POST | `/tasks/<id>/cancel` | 取消 |
| POST | `/tasks/<id>/reschedule` | 重新安排到今天。body: `{"due_date":"2026-05-22"}` 或空(默认今天) |
| POST | `/tasks/<id>/breakdown` | AI拆解大任务为3-5个子步骤 |
| GET | `/tasks/today` | 今日任务 + 过期任务（含 overdue_days） |

### 决策层 — 6 个端点

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/decisions` | 列表。参数: `status`(pending/reviewed), `page` |
| POST | `/decisions` | 创建。body: `{"title":"...", "decision":"...", "context":"", "reasoning":"", "expected_outcome":""}` |
| GET | `/decisions/<id>` | 详情 |
| PUT | `/decisions/<id>` | 更新 |
| DELETE | `/decisions/<id>` | 删除 |
| POST | `/decisions/<id>/review` | 回顾决策。body: `{"actual_outcome":"实际结果"}` |

### AI 层 — 7 个端点

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/parse` | AI解析自然语言。body: `{"text":"明天下午3点开会"}` → `{"type":"task","title":"开会","due_date":"2026-05-21"}` |
| POST | `/parse/feedback` | 记录用户纠正。body: `{"text":"...", "ai_type":"note", "user_type":"memory"}` |
| POST | `/chat` | AI对话（一次性返回）。body: `{"message":"...", "history":[]}` |
| POST | `/chat/stream` | AI流式对话（SSE）。body同上，返回 `data: {"content":"字"}` 流 |
| GET | `/suggestions` | AI建议（5分钟缓存） |
| GET | `/brief` | 每日简报 |
| GET | `/report/weekly` | 周报（含本周vs上周对比、完成率、趋势） |

### 提醒层 — 1 个端点

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/alerts` | 主动提醒：久未记录/过期任务/待确认记忆/待回顾决策 |

### 治理层 — 14 个端点

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/system` | 完整系统状态 (DB大小/备份健康/数据完整/增长预测/健康评分) |
| GET | `/metrics` | 请求统计 + 响应时延 p50/p95/p99 |
| GET | `/api` | 所有端点文档 |
| GET | `/ping` | AI连通性检查 |
| GET | `/health` | 健康检查 (公开，无需auth) |
| GET | `/health/badge` | SVG 健康徽章 |
| POST | `/export` | 导出 ZIP (items/memories/tasks JSON + 文件) |
| GET | `/export/csv` | 导出 CSV。参数: `table`(items/memories/tasks/decisions) |
| POST | `/import` | 导入 ZIP。multipart: `file` |
| GET | `/audit-log` | 审计日志。参数: `action`, `target_type`, `page` |
| POST | `/items/batch` | 批量操作。body: `{"ids":[1,2,3], "action":"archive|delete"}` |
| GET/POST | `/admin/webhooks` | Webhook管理。body: `{"url":"...", "event":"item_created"}` |
| GET | `/admin/insights` | 使用模式分析 + AI准确率 |
| GET | `/admin/stats/daily` | 30天时间序列。参数: `days` |
| POST | `/admin/cleanup` | 清理旧数据 + vacuum |
| GET | `/admin/dedup` | 检测重复条目 |
| POST | `/admin/rebuild-fts` | 重建FTS5索引 |
| POST | `/admin/vacuum` | 数据库压缩 |
| POST | `/admin/backup` | 手动备份 |
| GET | `/admin/logs` | 查看日志。参数: `lines`, `level`(info/warning/error) |
| GET/POST | `/admin/workflows` | AI工作流管理 |
| GET | `/admin/workflows/templates` | 4个预设工作流模板 |
| POST | `/admin/workflows/<id>/run` | 手动执行工作流 |
| PUT/DELETE | `/admin/workflows/<id>` | 启用/禁用/删除工作流 |
| POST | `/admin/modules/<name>/enable` | 启用模块 |
| POST | `/admin/modules/<name>/disable` | 禁用模块 |

### 基础 — 5 个端点

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/app` | Web App 入口 |
| GET | `/sw.js` | Service Worker |
| GET | `/modules` | 已加载模块列表 |
| GET | `/admin/modules` | 模块管理（所有模块+启用状态） |
| GET | `/tools/bookmarklet` | 书签工具生成页 |

## 五、数据模型

### items（主表）
```
id, type(text/image/document/audio), content, file_path, source,
created_at, original_name, mime_type, size_bytes,
derived_text, transcript_text, processing_override, file_sha256
```

### memories
```
id, category(fact/preference/goal/relationship/event), content, detail,
status(candidate/confirmed/archived), source_item_id → items(id),
source_text, created_at, updated_at
```

### tasks
```
id, title, detail, status(todo/done/cancelled), priority(high/medium/low),
memory_id → memories(id), due_date, estimated_minutes, completed_at,
created_at, updated_at
```

### decisions
```
id, title, context, decision, reasoning, expected_outcome,
actual_outcome, status(pending/reviewed), created_at, updated_at
```

### 辅助表
- `audit_log`: 所有 CUD 操作记录
- `automation_runs`: 自动化任务运行历史
- `items_fts`: FTS5 全文索引（CJK字符级分词）
- `schema_migrations`: 数据库迁移记录
- `module_state`: 模块启用/禁用状态
- `user_preferences`: 用户偏好学习（key-value）
- `workflows`: AI 工作流规则

### 关系图
```
items ──→ memories (source_item_id, optional FK)
memories ──→ tasks (memory_id, optional FK)
items ──→ items_fts (rowid, 同步)
```

## 六、关键设计决策

1. **认证**: 共享 key 模式，Header `X-Axiom-Key`，`require_key()` 返回 None 或 403
2. **数据库**: SQLite WAL 模式 + FK 强制。每请求新建连接
3. **搜索**: FTS5 + CJK 字符级分词 + AI 语义回退
4. **AI**: DeepSeek (OpenAI 兼容)，流式用 SSE
5. **文件存储**: `data/inbox/` + `data/archive/`，路径存 items.file_path
6. **模块系统**: `modules/` 目录自动发现，`AxiomModule` 基类
7. **前端**: 桌面侧边栏(≥768px) + 移动底部导航(<768px)，面板 `.active` class 切换

## 七、前端架构（当前）

### 文件
- `core/templates/app.html` (739行): 所有面板 HTML
- `core/static/app.js` (4213行): 全局 state + apiRequest + 40+ 函数
- `core/static/app.css` (640行): 暗色玻璃设计系统

### 面板结构 (5个主面板)
```
记录 (capture-panel)    — 文本输入 + 文件上传 + 链接抓取
总览 (overview-panel)   — AI建议 + 今日任务 + 提醒 + 统计
任务 (tasks-panel)      — 今日/过期/全部 + 快速创建
记忆 (memories-panel)   — 列表 + AI提取 + 分类/状态筛选
档案 (archive-panel)    — 搜索 + 最近 + 决策 + 自动化产物

模块面板 (module-panels)— 由模块系统注入 (减脂等)
```

### 桌面侧边栏导航
```javascript
PANEL_GROUPS = {
    "capture-panel": ["setup-panel", "capture-panel"],
    "overview-panel": ["overview-panel"],
    "tasks-panel": ["tasks-panel"],
    "memories-panel": ["memories-panel"],
    "archive-panel": ["search-panel", "recent-panel", "decisions-panel", "artifacts-panel", "processing-panel", "modules-manage-panel"],
    "chat-panel": ["chat-panel"],
};
```

### 关键 JS 函数
```
state = { key, recent, search, artifacts, automation, memories, tasks, decisions }
apiRequest(path, {method, query, json, formData, responseType}) → 统一API调用
handleSmartCapture(text) → AI解析 → 自动创建对应类型
showQuickCapture() / hideQuickCapture() → Ctrl+Shift+N 全局捕获
bindFloatChat() → 悬浮AI聊天 + 流式 + Markdown + localStorage持久化
syncDashboard() → 加载所有面板数据
updateSidebarBadges() → 侧边栏徽章 (任务数/记忆数)
```

### 快捷键
```
Ctrl+K       → 呼出AI管家
Ctrl+N       → 新建任务
Ctrl+Shift+N → 全局快速捕获
Ctrl+/       → 全局搜索
Esc          → 关闭弹窗/聊天
```

## 八、前端交互模型（核心参考）

### 智能捕获流程 — 最重要的交互

```
用户在记录面板输入文字
  → handleTextCaptureSubmit()
  → POST /parse (body: {"text": "..."})
  → AI 返回 {"type":"task","title":"...","priority":"medium","due_date":"..."}
  → 前端根据 type 自动创建对应类型的记录:
    type=task     → POST /tasks
    type=memory   → POST /memories
    type=decision → POST /decisions
    type=url      → POST /fetch
    type=note     → POST /add
  → 显示反馈

AI 未配置时回退: 关键字匹配规则 → 默认创建 note
```

### 全局快速捕获 Ctrl+Shift+N

```
任意面板按 Ctrl+Shift+N
  → 弹出半透明 overlay (quick-capture-overlay)
  → 打字 → Enter
  → 调用 handleSmartCapture(text)
  → AI 解析 + 自动创建
  → overlay 关闭
```

### 悬浮 AI 聊天

```
右下角悬浮按钮 (float-chat-btn) → 点击或 Ctrl+K
  → 弹出聊天窗口 (float-chat-popup)
  → 输入消息 → Enter
  → POST /chat/stream (SSE)
  → fetch + ReadableStream + TextDecoder 逐字渲染
  → 支持 Markdown (bold/italic/code/lists)
  → 历史持久化到 localStorage
  → 每条 AI 回复下方有 "+任务" "🧠 记忆" 操作按钮
```

### 语音输入

```
记录面板点 "🎤 语音" 按钮
  → Web Speech API (SpeechRecognition, lang=zh-CN)
  → 实时语音转文字 → 自动填入文本框
  → 自动触发 handleSmartCapture
```

### 总览面板数据流

```
syncDashboard()
  → /alerts       → 渲染提醒卡片
  → /brief        → AI 每日简报
  → /tasks/today  → 今日任务(可操作: 点○完成)
  → /memories     → 待确认记忆(可操作: 点确认)
  → /report/weekly → 周报卡片
  → /stats        → 统计卡片 + 7天活跃度柱状图
  → /suggestions  → AI建议(带"＋任务"按钮)
  → showRandomMemory() → 随机回忆卡片
  → updateSidebarBadges() → 侧边栏数字徽章
```

### 常用交互模式

```javascript
// 任务操作 (委托事件)
data-action="task-done"     → POST /tasks/<id>/done
data-action="task-cancel"   → POST /tasks/<id>/cancel
data-action="task-reschedule" → POST /tasks/<id>/reschedule
data-action="task-breakdown"  → POST /tasks/<id>/breakdown
data-action="suggestion-to-task" → 从AI建议创建任务
data-action="chat-to-task"      → 从聊天消息创建任务

// 记忆操作
data-action="confirm-memory" → POST /memories/<id>/confirm
data-action="archive-memory" → POST /memories/<id>/archive
data-action="delete-memory"  → DELETE /memories/<id>
```

### 桌面 vs 移动布局

```
桌面 (≥768px):
  flex容器 (.app-layout) → sidebar(固定宽度200px) + content(flex:1)
  面板通过 .active class 切换显示
  底部导航栏隐藏

移动 (<768px):
  面板全部垂直排列，滚动浏览
  底部固定导航栏 (bottom-bar) 做锚点跳转
```

## 九、前端重做建议

### 必须保留的核心逻辑
- **apiRequest()** — 统一 API 调用（含 key 注入、错误处理）
- **handleSmartCapture(text)** — AI 路由的智能输入
- **showQuickCapture() / hideQuickCapture()** — 全局捕获 overlay
- **bindFloatChat()** — 流式 SSE 聊天 + localStorage 持久化
- **面板切换** — CSS `.active` 模式，响应式双布局
- **认证流程** — key → localStorage → syncDashboard

### 可以完全重做的
- **HTML 结构** — 当前是单体文件，可以组件化（React/Vue/Svelte 任意框架）
- **CSS** — 当前暗色玻璃主题可保留方向，但实现可以更现代（Tailwind/shared-ui）
- **渲染逻辑** — 当前用 innerHTML 拼接，可改用框架
- **状态管理** — 当前是全局 state 对象，可改用 Zustand/Pinia/Context
- **移动端体验** — 当前只是折叠+滚动，可改用 TabView/BottomSheet

### 面板建议

保留 5+1 面板结构，但可以重新组织内容:
```
记录  — 智能输入框（核心）+ 文件上传 + 链接抓取 + 语音
总览  — 简报 + 周报 + 提醒 + 今日任务(可操作) + 建议 + 统计
任务  — 今日/过期/全部 tab + 快速创建 + 批量操作
记忆  — AI提取 + 列表(分类/状态筛选) + 进度条
档案  — 搜索 + 快速筛选 + 最近/决策/自动化/模块管理 tab
管家  — 流式聊天 + AI建议 + 操作按钮
```

### API 调用注意事项
- 所有写操作成功返回 `{"ok": true, ...}`，失败返回 `{"ok": false, "error": {"code":"...", "message":"..."}}`
- 分页统一: `page`, `page_size`, `total`, `total_pages`
- `/chat/stream` 是 SSE 流，需要 `fetch` + `ReadableStream` + `TextDecoder`，格式 `data: {"content":"字"}\n\n`
- AI 端点有 5 分钟缓存 (`SUGGESTIONS_CACHE`)，传 `?_t=timestamp` 可绕过
- 文件上传用 `multipart/form-data`，`file` + `content` + `source` 字段
- `/parse` 端点返回 `{"type":"task|memory|decision|note|health|url", ...}`，前端据此路由到不同创建端点
- 向量搜索 `/search/vector` 返回 items 数组含 `relevance` 字段(0-1 cosine similarity)
- 语音输入用浏览器 Web Speech API，不需要后端支持

### 快捷键设计建议
```
Ctrl+K       → 呼出AI管家
Ctrl+N       → 新建任务
Ctrl+Shift+N → 全局快速捕获 (核心功能)
Ctrl+/       → 聚焦搜索
Ctrl+V       → 粘贴图片自动上传
Esc          → 关闭所有弹窗
```
