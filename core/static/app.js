const LOCAL_KEY_NAME = "axiom.web.key";
const OVERVIEW_RECENT_LIMIT = 4;
const OVERVIEW_PREVIEW_CHARS = 140;
const RECENT_PAGE_SIZE = 9;
const SEARCH_PAGE_SIZE = 9;
const ARTIFACT_PAGE_SIZE = 12;
const AUTOMATION_RUN_PAGE_SIZE = 8;

const CHAT_STORAGE_KEY = "axiom.chat.history";

function loadChatHistory() {
    try {
        const raw = localStorage.getItem(CHAT_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

function saveChatHistory(history) {
    try {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history.slice(-30)));
    } catch { /* quota exceeded */ }
}

const chatHistory = loadChatHistory();

const registeredModules = new Map();

window.axiom = {
    registerModule(def) {
        registeredModules.set(def.name, def);
    },
};

const state = {
    key: "",
    recent: {
        page: 1,
        totalPages: 1,
        items: [],
        total: 0,
    },
    search: {
        page: 1,
        totalPages: 1,
        items: [],
        active: false,
        total: 0,
    },
    artifacts: {
        page: 1,
        totalPages: 1,
        items: [],
    },
    automation: {
        jobs: [],
        historyJobs: [],
        jobsLoaded: false,
        runs: [],
        runsPage: 1,
        runsTotalPages: 1,
        runsTotal: 0,
    },
    memories: {
        page: 1,
        totalPages: 1,
        items: [],
        total: 0,
    },
    tasks: {
        page: 1,
        totalPages: 1,
        items: [],
        total: 0,
        todayItems: [],
        overdueItems: [],
    },
    decisions: {
        page: 1,
        totalPages: 1,
        items: [],
        total: 0,
    },
    objectUrls: new Set(),
    viewerObjectUrl: null,
    viewerContext: null,
};

const elements = {
    keyForm: document.getElementById("key-form"),
    keyInput: document.getElementById("key-input"),
    keyFeedback: document.getElementById("key-feedback"),
    exportDataButton: document.getElementById("export-data-button"),
    clearKeyButton: document.getElementById("clear-key-button"),
    syncNowButton: document.getElementById("sync-now-button"),
    connectionBar: document.getElementById("connection-bar"),
    connectionIndicator: document.getElementById("connection-indicator"),
    lastSyncIndicator: document.getElementById("last-sync-indicator"),
    textCaptureForm: document.getElementById("text-capture-form"),
    textInput: document.getElementById("text-input"),
    urlFetchForm: document.getElementById("url-fetch-form"),
    urlFetchInput: document.getElementById("url-fetch-input"),
    urlFetchFeedback: document.getElementById("url-fetch-feedback"),
    fileCaptureForm: document.getElementById("file-capture-form"),
    fileInput: document.getElementById("file-input"),
    captureFeedback: document.getElementById("capture-feedback"),
    overviewStats: document.getElementById("overview-stats"),
    overviewRecentHighlights: document.getElementById("overview-recent-highlights"),
    overviewProcessingBacklog: document.getElementById("overview-processing-backlog"),
    overviewBacklogTotal: document.getElementById("overview-backlog-total"),
    overviewSuggestions: document.getElementById("overview-suggestions"),
    overviewAiReview: document.getElementById("overview-ai-review"),
    refreshSuggestionsButton: document.getElementById("refresh-suggestions-button"),
    overviewArtifactHighlights: document.getElementById("overview-artifact-highlights"),
    overviewGeneratedAt: document.getElementById("overview-generated-at"),
    refreshOverviewButton: document.getElementById("refresh-overview-button"),
    processingWorkbench: document.getElementById("processing-workbench"),
    processingQueueTotal: document.getElementById("processing-queue-total"),
    processingQueueNextLabel: document.getElementById("processing-queue-next-label"),
    refreshProcessingButton: document.getElementById("refresh-processing-button"),
    recentPanel: document.getElementById("recent-panel"),
    recentFilterForm: document.getElementById("recent-filter-form"),
    recentFeedback: document.getElementById("recent-feedback"),
    recentBatchActions: document.getElementById("recent-batch-actions"),
    resetRecentFiltersButton: document.getElementById("reset-recent-filters-button"),
    recentList: document.getElementById("recent-list"),
    refreshRecentButton: document.getElementById("refresh-recent-button"),
    loadMoreRecentButton: document.getElementById("load-more-recent-button"),
    searchForm: document.getElementById("search-form"),
    searchFeedback: document.getElementById("search-feedback"),
    searchBatchActions: document.getElementById("search-batch-actions"),
    searchResults: document.getElementById("search-results"),
    loadMoreSearchButton: document.getElementById("load-more-search-button"),
    resetSearchButton: document.getElementById("reset-search-button"),
    automationRunForm: document.getElementById("automation-run-form"),
    automationDateInput: document.getElementById("automation-date-input"),
    automationFeedback: document.getElementById("automation-feedback"),
    automationJobs: document.getElementById("automation-jobs"),
    automationRunsFilterForm: document.getElementById("automation-runs-filter-form"),
    automationRunsJobInput: document.getElementById("automation-runs-job-input"),
    automationRunsStatusInput: document.getElementById("automation-runs-status-input"),
    automationRunsFeedback: document.getElementById("automation-runs-feedback"),
    automationRuns: document.getElementById("automation-runs"),
    refreshAutomationRunsButton: document.getElementById("refresh-automation-runs-button"),
    loadMoreAutomationRunsButton: document.getElementById("load-more-automation-runs-button"),
    resetAutomationRunsFiltersButton: document.getElementById("reset-automation-runs-filters-button"),
    refreshArtifactsButton: document.getElementById("refresh-artifacts-button"),
    artifactFilterForm: document.getElementById("artifact-filter-form"),
    resetArtifactFiltersButton: document.getElementById("reset-artifact-filters-button"),
    artifactSummaryCards: document.getElementById("artifact-summary-cards"),
    artifactList: document.getElementById("artifact-list"),
    loadMoreArtifactsButton: document.getElementById("load-more-artifacts-button"),
    viewerBackdrop: document.getElementById("viewer-backdrop"),
    viewerTitle: document.getElementById("viewer-title"),
    viewerMeta: document.getElementById("viewer-meta"),
    viewerActions: document.getElementById("viewer-actions"),
    viewerContent: document.getElementById("viewer-content"),
    closeViewerButton: document.getElementById("close-viewer-button"),
    toast: document.getElementById("toast"),
    chatMessages: document.getElementById("chat-messages"),
    chatForm: document.getElementById("chat-form"),
    chatInput: document.getElementById("chat-input"),
    chatFeedback: document.getElementById("chat-feedback"),
    floatChatBtn: document.getElementById("float-chat-btn"),
    floatChatPopup: document.getElementById("float-chat-popup"),
    floatChatBody: document.getElementById("float-chat-body"),
    floatChatForm: document.getElementById("float-chat-form"),
    floatChatInput: document.getElementById("float-chat-input"),
    floatChatClose: document.getElementById("float-chat-close"),
    clearChatButton: document.getElementById("clear-chat-button"),
    memoryStats: document.getElementById("memory-stats"),
    memoryQuickForm: document.getElementById("memory-quick-form"),
    memoryQuickCategory: document.getElementById("memory-quick-category"),
    memoryQuickContent: document.getElementById("memory-quick-content"),
    memoryQuickDetail: document.getElementById("memory-quick-detail"),
    memoryQuickFeedback: document.getElementById("memory-quick-feedback"),
    memoryFilterCategory: document.getElementById("memory-filter-category"),
    memoryFilterStatus: document.getElementById("memory-filter-status"),
    applyMemoryFilterButton: document.getElementById("apply-memory-filter-button"),
    memoryList: document.getElementById("memory-list"),
    loadMoreMemoriesButton: document.getElementById("load-more-memories-button"),
    suggestMemoriesButton: document.getElementById("suggest-memories-button"),
    refreshMemoriesButton: document.getElementById("refresh-memories-button"),
    decisionQuickForm: document.getElementById("decision-quick-form"),
    decisionQuickTitle: document.getElementById("decision-quick-title"),
    decisionQuickContext: document.getElementById("decision-quick-context"),
    decisionQuickDecision: document.getElementById("decision-quick-decision"),
    decisionQuickReasoning: document.getElementById("decision-quick-reasoning"),
    decisionQuickExpected: document.getElementById("decision-quick-expected"),
    decisionQuickFeedback: document.getElementById("decision-quick-feedback"),
    decisionFilterStatus: document.getElementById("decision-filter-status"),
    applyDecisionFilterButton: document.getElementById("apply-decision-filter-button"),
    decisionList: document.getElementById("decision-list"),
    loadMoreDecisionsButton: document.getElementById("load-more-decisions-button"),
    refreshDecisionsButton: document.getElementById("refresh-decisions-button"),
    tasksTodayList: document.getElementById("tasks-today-list"),
    tasksOverdueList: document.getElementById("tasks-overdue-list"),
    taskQuickForm: document.getElementById("task-quick-form"),
    taskQuickTitle: document.getElementById("task-quick-title"),
    taskQuickDetail: document.getElementById("task-quick-detail"),
    taskQuickPriority: document.getElementById("task-quick-priority"),
    taskQuickDueDate: document.getElementById("task-quick-due-date"),
    taskQuickFeedback: document.getElementById("task-quick-feedback"),
    taskFilterStatus: document.getElementById("task-filter-status"),
    applyTaskFilterButton: document.getElementById("apply-task-filter-button"),
    taskList: document.getElementById("task-list"),
    loadMoreTasksButton: document.getElementById("load-more-tasks-button"),
    refreshTasksButton: document.getElementById("refresh-tasks-button"),
};

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function summarizeText(value, maxChars = 120) {
    const text = String(value ?? "")
        .split(/\r?\n/)
        .map((part) => part.trim())
        .filter(Boolean)
        .join(" ");
    if (!text) {
        return "";
    }
    if (text.length <= maxChars) {
        return text;
    }
    return `${text.slice(0, Math.max(0, maxChars - 3)).trimEnd()}...`;
}

function buildItemIdsValue(items) {
    return (items || [])
        .map((item) => String(item?.id || "").trim())
        .filter(Boolean)
        .join(",");
}

function parseItemIdsValue(value) {
    return String(value || "")
        .split(",")
        .map((part) => Number.parseInt(part.trim(), 10))
        .filter((itemId) => Number.isInteger(itemId) && itemId > 0);
}

function formatDateTime(value) {
    if (!value) {
        return "未知时间";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleString("zh-CN", {
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function toUtcIsoFromLocalInput(value) {
    if (!value) {
        return "";
    }
    const localDate = new Date(value);
    if (Number.isNaN(localDate.getTime())) {
        return value;
    }
    return localDate.toISOString();
}

function formatType(type) {
    if (type === "image") {
        return "图片";
    }
    if (type === "document") {
        return "文档";
    }
    if (type === "audio") {
        return "音频";
    }
    return "文本";
}

function formatBytes(sizeBytes) {
    if (sizeBytes === null || sizeBytes === undefined || Number.isNaN(Number(sizeBytes))) {
        return "未知";
    }
    const size = Number(sizeBytes);
    if (size < 1024) {
        return `${size} B`;
    }
    if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(size >= 10 * 1024 ? 0 : 1)} KB`;
    }
    return `${(size / (1024 * 1024)).toFixed(size >= 10 * 1024 * 1024 ? 0 : 1)} MB`;
}

function getDocumentAwarePreviewText(item, maxChars = 150) {
    const primary = summarizeText(item?.content, maxChars);
    const derived = summarizeText(item?.derived_text_preview, maxChars);
    const transcript = summarizeText(item?.transcript_text_preview, maxChars);
    const originalName = String(item?.original_name || "").trim();
    if (item?.type === "document" && (!primary || primary === originalName)) {
        return derived || originalName || "no preview";
    }
    if (item?.type === "audio" && (!primary || primary === originalName)) {
        return transcript || originalName || "no preview";
    }
    return primary || transcript || derived || originalName || "no preview";
}

function getItemDisplayName(item) {
    return summarizeText(item?.content, 40) || item?.original_name || `${formatType(item?.type)} #${item?.id}`;
}

function getItemPreviewText(item, maxChars = 150) {
    return summarizeText(item?.content, maxChars) || item?.original_name || "没有可显示内容。";
}

function getItemFileDetail(item) {
    const originalName = item?.original_name || "";
    const extension = String(item?.extension || "").toLowerCase();
    if (item?.type === "document") {
        if (extension === "pdf") {
            return "PDF";
        }
        if (extension === "doc" || extension === "docx") {
            return "Word";
        }
        return originalName || "文档文件";
    }
    if (item?.type === "audio") {
        return originalName || "音频文件";
    }
    return originalName || "";
}

function isPdfItem(item) {
    return item?.type === "document" && String(item?.extension || "").toLowerCase() === "pdf";
}

function formatStorage(storage) {
    if (storage === "archive") {
        return "archive";
    }
    return "inbox";
}

function formatTextSource(textSource) {
    if (textSource === "derived_text") {
        return "文档正文";
    }
    if (textSource === "transcript_text") {
        return "音频转写";
    }
    if (textSource === "original_name") {
        return "仅文件名";
    }
    if (textSource === "empty") {
        return "无可读文本";
    }
    return "内容说明";
}

function formatProcessingState(processingState) {
    return processingState === "pending" ? "待处理" : "已就绪";
}

function formatArtifactLabel(artifact) {
    if (!artifact) {
        return "未生成";
    }
    if (artifact.group === "review") {
        return artifact.window === "weekly" ? "周回顾" : "日回顾";
    }
    if (artifact.group === "inbox") {
        return "Inbox 报告";
    }
    if (artifact.group === "inbox-actions") {
        return artifact.mode === "apply" ? "Inbox 动作执行" : "Inbox 动作预演";
    }
    if (artifact.group === "inbox-action-history") {
        return artifact.window === "weekly" ? "动作历史周报" : "动作历史日报";
    }
    if (artifact.group === "audio-transcripts") {
        return "音频转写报告";
    }
    if (artifact.group === "image-descriptions") {
        return "图片描述报告";
    }
    return artifact.group;
}

function formatAutomationStatus(status) {
    if (status === "success") {
        return "成功";
    }
    if (status === "skipped") {
        return "已跳过";
    }
    if (status === "failed") {
        return "失败";
    }
    if (status === "timeout") {
        return "超时";
    }
    if (status === "running") {
        return "运行中";
    }
    return status || "未知";
}

function formatAutomationRuntime(job) {
    if (!job) {
        return "未知";
    }
    if (!job.ready) {
        return "未就绪";
    }
    if (job.runtime_mode === "openai") {
        return "OpenAI";
    }
    if (job.runtime_mode === "mock") {
        return "mock";
    }
    return "local";
}

function formatDuration(durationMs) {
    if (durationMs === null || durationMs === undefined) {
        return "未知";
    }
    if (durationMs < 1000) {
        return `${durationMs} ms`;
    }
    return `${(durationMs / 1000).toFixed(durationMs >= 10_000 ? 0 : 1)} s`;
}

function pickLatestArtifact(...artifacts) {
    return artifacts
        .filter(Boolean)
        .sort((left, right) => {
            const leftValue = `${left.modified_at}|${left.relative_path}`;
            const rightValue = `${right.modified_at}|${right.relative_path}`;
            return rightValue.localeCompare(leftValue);
        })[0] || null;
}

function setFeedback(element, message, tone = "muted") {
    if (!element) {
        return;
    }
    element.textContent = message || "";
    element.dataset.tone = tone;
}

function setConnectionState(status, message) {
    elements.connectionIndicator.dataset.state = status;
    elements.connectionIndicator.className = "conn-dot " + status;
    if (state.key) {
        elements.connectionBar.classList.add("visible");
    } else {
        elements.connectionBar.classList.remove("visible");
    }

    if (message) {
        elements.lastSyncIndicator.textContent = message;
    }
}

function showToast(message) {
    if (!message) {
        return;
    }
    elements.toast.textContent = message;
    elements.toast.classList.remove("hidden");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
        elements.toast.classList.add("hidden");
    }, 2400);
}

function saveKey(value) {
    state.key = value.trim();
    if (state.key) {
        localStorage.setItem(LOCAL_KEY_NAME, state.key);
    } else {
        localStorage.removeItem(LOCAL_KEY_NAME);
    }
}

function loadStoredKey() {
    const stored = localStorage.getItem(LOCAL_KEY_NAME) || "";
    state.key = stored.trim();
    elements.keyInput.value = state.key;
}

function requireKey() {
    if (!state.key) {
        elements.keyInput.focus();
        throw new Error("请先保存访问 key");
    }
}

function buildApiUrl(path, query = {}) {
    const url = new URL(path, window.location.origin);
    Object.entries(query).forEach(([name, value]) => {
        if (value === undefined || value === null || value === "") {
            return;
        }
        url.searchParams.set(name, String(value));
    });
    return url;
}

async function parseErrorMessage(response) {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        const body = await response.json().catch(() => null);
        if (body?.error?.message) {
            return body.error.message;
        }
        if (body?.message) {
            return body.message;
        }
    }
    const text = await response.text().catch(() => "");
    return text || `请求失败 (${response.status})`;
}

async function apiRequest(path, options = {}) {
    requireKey();

    const {
        method = "GET",
        query,
        json,
        formData,
        responseType = "json",
    } = options;

    const headers = new Headers({
        "X-Axiom-Key": state.key,
    });

    let body;
    if (json !== undefined) {
        headers.set("Content-Type", "application/json");
        body = JSON.stringify(json);
    } else if (formData) {
        body = formData;
    }

    const response = await fetch(buildApiUrl(path, query), {
        method,
        headers,
        body,
        credentials: "same-origin",
    });

    if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
    }

    if (responseType === "blob") {
        return response.blob();
    }
    if (responseType === "text") {
        return response.text();
    }

    const payload = await response.json();
    if (payload?.ok === false) {
        throw new Error(payload.error?.message || "请求失败");
    }
    return payload;
}

function renderEmptyState(container, message) {
    container.innerHTML = `<div class="empty-state">${escapeHtml(message)}</div>`;
}

function setButtonDisabled(button, disabled, textWhenDisabled = "") {
    if (!button) {
        return;
    }
    button.disabled = disabled;
    if (textWhenDisabled) {
        button.dataset.idleText ??= button.textContent;
        button.textContent = disabled ? textWhenDisabled : button.dataset.idleText;
    }
}

function updateLoadMoreButton(button, page, totalPages, emptyText = "没有更多了") {
    const hasMore = page < totalPages;
    button.disabled = !hasMore;
    button.textContent = hasMore ? "加载更多" : emptyText;
}

function renderOverviewStats(stats) {
    const cards = [
        ["连续记录", `${stats.streak || 0} 天`],
        ["总条目", stats.total],
        ["文本", stats.by_type?.text || 0],
        ["图片", stats.by_type?.image || 0],
        ["文档", stats.by_type?.document || 0],
        ["音频", stats.by_type?.audio || 0],
        ["已就绪", stats.by_processing_state?.ready || 0],
        ["待处理", stats.by_processing_state?.pending || 0],
        ["手动完成", stats.by_processing_override?.ready || 0],
        ["Inbox", stats.by_storage?.inbox || 0],
        ["Archive", stats.by_storage?.archive || 0],
    ];

    const filterMap = [
        null,  // streak card has no filter
        { kind: "all", value: "" },
        { kind: "type", value: "text" },
        { kind: "type", value: "image" },
        { kind: "type", value: "document" },
        { kind: "type", value: "audio" },
        { kind: "processing_state", value: "ready" },
        { kind: "processing_state", value: "pending" },
        { kind: "processing_override", value: "ready" },
        { kind: "storage", value: "inbox" },
        { kind: "storage", value: "archive" },
    ];

    elements.overviewStats.innerHTML = cards
        .map(
            ([label, value], index) => `
                <button
                    class="stat-card"
                    type="button"
                    ${filterMap[index] ? `
                    data-action="apply-overview-filter"
                    data-filter-kind="${escapeHtml(filterMap[index].kind)}"
                    data-filter-value="${escapeHtml(filterMap[index].value)}"
                    ` : ""}
                >
                    <span class="subtle-text">${escapeHtml(label)}</span>
                    <strong>${escapeHtml(value)}</strong>
                </button>
            `
        )
        .join("");
}

async function applyOverviewQuickFilter(filterKind, filterValue) {
    try {
        elements.recentFilterForm.reset();
        document.getElementById("recent-sort-input").value = "newest";

        if (filterKind === "type") {
            document.getElementById("recent-type-input").value = filterValue || "";
        } else if (filterKind === "storage") {
            document.getElementById("recent-storage-input").value = filterValue || "";
        } else if (filterKind === "processing_state") {
            document.getElementById("recent-processing-state-input").value = filterValue || "";
        } else if (filterKind === "processing_override") {
            document.getElementById("recent-processing-override-input").value = filterValue || "";
        }

        setConnectionState("busy", "正在切换总览筛选");
        await loadRecentPage({ reset: true });
        setConnectionState("ready", elements.lastSyncIndicator.textContent);
        elements.recentPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
        setConnectionState("error", error.message);
        showToast(error.message);
    }
}

function renderOverviewRecent(items) {
    if (!items.length) {
        renderEmptyState(elements.overviewRecentHighlights, "还没有记录。");
        return;
    }

    elements.overviewRecentHighlights.innerHTML = items
        .map(
            (item) => `
                <article class="summary-card">
                    <div class="item-meta">
                        <span class="tag">${escapeHtml(formatType(item.type))}</span>
                        <span>${escapeHtml(formatDateTime(item.created_at))}</span>
                    </div>
                    <h3>${escapeHtml(getItemDisplayName(item))}</h3>
                    <p class="item-preview">${escapeHtml(getDocumentAwarePreviewText(item, 120))}</p>
                </article>
            `
        )
        .join("");
}

function renderOverviewBacklogV2(backlog) {
    const groups = backlog?.groups || [];
    const total = Number(backlog?.total || 0);
    const nextOverall = backlog?.next_overall || null;
    elements.overviewBacklogTotal.textContent = total > 0 ? `待处理 ${total} 条` : "当前已清空";

    if (!groups.length) {
        renderEmptyState(elements.overviewProcessingBacklog, "当前没有待补正文、待补转写或待补说明的条目。");
        return;
    }

    const nextOverallCard = nextOverall
        ? `
            <article class="summary-card backlog-card backlog-next-card">
                <div class="item-meta">
                    <span class="tag">下一条</span>
                    <span>${escapeHtml(formatType(nextOverall.type))}</span>
                    <span>${escapeHtml(nextOverall.processing_note || formatProcessingState(nextOverall.processing_state))}</span>
                </div>
                <h3>${escapeHtml(getItemDisplayName(nextOverall))}</h3>
                <p class="item-preview">${escapeHtml(getDocumentAwarePreviewText(nextOverall, 120))}</p>
                <div class="card-actions">
                    <button
                        class="secondary-button"
                        type="button"
                        data-action="view-item"
                        data-item-id="${escapeHtml(nextOverall.id)}"
                    >
                        直接处理下一条
                    </button>
                </div>
            </article>
        `
        : "";

    elements.overviewProcessingBacklog.innerHTML = nextOverallCard + groups
        .map((group) => {
            const nextItem = group.next_item || null;
            const sampleItems = (group.items || [])
                .map(
                    (item) => `
                        <li>
                            <strong>${escapeHtml(getItemDisplayName(item))}</strong>
                            <span>${escapeHtml(formatDateTime(item.created_at))}</span>
                        </li>
                    `,
                )
                .join("");
            return `
                <article class="summary-card backlog-card">
                    <div class="item-meta">
                        <span class="tag">${escapeHtml(group.type_label || formatType(group.type))}</span>
                        <span>${escapeHtml(group.processing_note || formatProcessingState("pending"))}</span>
                        <span>${escapeHtml(group.count)} 条</span>
                    </div>
                    <h3>${escapeHtml(group.title || "待处理队列")}</h3>
                    <p class="item-preview">${escapeHtml(group.description || "")}</p>
                    ${
                        nextItem
                            ? `<p class="item-preview"><strong>下一条：</strong>${escapeHtml(getItemDisplayName(nextItem))}</p>`
                            : ""
                    }
                    ${sampleItems ? `<ul class="backlog-preview-list">${sampleItems}</ul>` : ""}
                    <div class="card-actions">
                        ${
                            nextItem
                                ? `
                                    <button
                                        class="secondary-button"
                                        type="button"
                                        data-action="view-item"
                                        data-item-id="${escapeHtml(nextItem.id)}"
                                    >
                                        直接处理最新一条
                                    </button>
                                `
                                : ""
                        }
                        <button
                            class="${nextItem ? "text-button" : "secondary-button"}"
                            type="button"
                            data-action="apply-processing-backlog-filter"
                            data-item-type="${escapeHtml(group.filters?.type || "")}"
                            data-processing-state="${escapeHtml(group.filters?.processing_state || "pending")}"
                        >
                            查看这组待处理
                        </button>
                    </div>
                </article>
            `;
        })
        .join("");
}

function renderProcessingWorkbenchV2(backlog) {
    const groups = backlog?.groups || [];
    const total = Number(backlog?.total || 0);
    const nextOverall = backlog?.next_overall || null;

    elements.processingQueueTotal.textContent = total > 0 ? `待处理 ${total} 条` : "当前已清空";
    elements.processingQueueNextLabel.textContent = nextOverall
        ? `下一条待处理：${getItemDisplayName(nextOverall)}`
        : "当前没有待补正文、待补转写或待补说明的记录。";

    if (!groups.length) {
        renderEmptyState(elements.processingWorkbench, "当前工作台没有待处理条目。");
        return;
    }

    const cards = [];
    if (nextOverall) {
        cards.push(`
            <article class="item-card processing-workbench-card processing-next-card">
                <div class="item-meta">
                    <span class="tag">全局下一条</span>
                    <span>${escapeHtml(formatType(nextOverall.type))}</span>
                    <span>${escapeHtml(nextOverall.processing_note || formatProcessingState(nextOverall.processing_state))}</span>
                </div>
                <h3>${escapeHtml(getItemDisplayName(nextOverall))}</h3>
                <p class="item-preview">${escapeHtml(getDocumentAwarePreviewText(nextOverall, 140))}</p>
                <div class="card-actions">
                    <button
                        class="primary-button"
                        type="button"
                        data-action="edit-item"
                        data-item-id="${escapeHtml(nextOverall.id)}"
                    >
                        连续处理
                    </button>
                    <button
                        class="secondary-button"
                        type="button"
                        data-action="view-item"
                        data-item-id="${escapeHtml(nextOverall.id)}"
                    >
                        查看详情
                    </button>
                </div>
            </article>
        `);
    }

    cards.push(
        ...groups.map((group) => {
            const nextItem = group.next_item || null;
            return `
                <article class="item-card processing-workbench-card">
                    <div class="item-meta">
                        <span class="tag">${escapeHtml(group.type_label || formatType(group.type))}</span>
                        <span>${escapeHtml(group.processing_note || formatProcessingState("pending"))}</span>
                        <span>${escapeHtml(group.count)} 条</span>
                    </div>
                    <h3>${escapeHtml(group.title || "待处理队列")}</h3>
                    <p class="item-preview">${escapeHtml(group.description || "")}</p>
                    ${
                        nextItem
                            ? `
                                <div class="processing-next-inline">
                                    <strong>下一条</strong>
                                    <span>${escapeHtml(getItemDisplayName(nextItem))}</span>
                                </div>
                            `
                            : ""
                    }
                    <div class="card-actions">
                        ${
                            nextItem
                                ? `
                                    <button
                                        class="primary-button"
                                        type="button"
                                        data-action="edit-item"
                                        data-item-id="${escapeHtml(nextItem.id)}"
                                    >
                                        连续处理
                                    </button>
                                    <button
                                        class="secondary-button"
                                        type="button"
                                        data-action="view-item"
                                        data-item-id="${escapeHtml(nextItem.id)}"
                                    >
                                        查看这条
                                    </button>
                                `
                                : ""
                        }
                        <button
                            class="secondary-button"
                            type="button"
                            data-action="apply-processing-backlog-filter"
                            data-item-type="${escapeHtml(group.filters?.type || "")}"
                            data-processing-state="${escapeHtml(group.filters?.processing_state || "pending")}"
                        >
                            看这一组
                        </button>
                    </div>
                </article>
            `;
        }),
    );

    elements.processingWorkbench.innerHTML = cards.join("");
}

function renderOverviewBacklog(backlog) {
    const groups = backlog?.groups || [];
    const total = Number(backlog?.total || 0);
    const nextOverall = backlog?.next_overall || null;
    elements.overviewBacklogTotal.textContent = total > 0 ? `待处理 ${total} 条` : "当前已清空";

    if (!groups.length) {
        renderEmptyState(elements.overviewProcessingBacklog, "当前没有待补正文、待补转写或待补说明的条目。");
        return;
    }

    const nextOverallCard = nextOverall
        ? `
            <article class="summary-card backlog-card backlog-next-card">
                <div class="item-meta">
                    <span class="tag">下一条</span>
                    <span>${escapeHtml(formatType(nextOverall.type))}</span>
                    <span>${escapeHtml(nextOverall.processing_note || formatProcessingState(nextOverall.processing_state))}</span>
                </div>
                <h3>${escapeHtml(getItemDisplayName(nextOverall))}</h3>
                <p class="item-preview">${escapeHtml(getDocumentAwarePreviewText(nextOverall, 120))}</p>
                <div class="card-actions">
                    <button
                        class="secondary-button"
                        type="button"
                        data-action="view-item"
                        data-item-id="${escapeHtml(nextOverall.id)}"
                    >
                        直接处理下一条
                    </button>
                </div>
            </article>
        `
        : "";

    elements.overviewProcessingBacklog.innerHTML =
        nextOverallCard +
        groups
            .map((group) => {
                const nextItem = group.next_item || null;
                const previewItems = group.items || [];
                const previewItemIds = buildItemIdsValue(previewItems);
                const sampleItems = previewItems
                    .map(
                        (item) => `
                            <li>
                                <strong>${escapeHtml(getItemDisplayName(item))}</strong>
                                <span>${escapeHtml(formatDateTime(item.created_at))}</span>
                            </li>
                        `,
                    )
                    .join("");
                return `
                    <article class="summary-card backlog-card">
                        <div class="item-meta">
                            <span class="tag">${escapeHtml(group.type_label || formatType(group.type))}</span>
                            <span>${escapeHtml(group.processing_note || formatProcessingState("pending"))}</span>
                            <span>${escapeHtml(group.count)} 条</span>
                        </div>
                        <h3>${escapeHtml(group.title || "待处理队列")}</h3>
                        <p class="item-preview">${escapeHtml(group.description || "")}</p>
                        ${
                            nextItem
                                ? `<p class="item-preview"><strong>下一条：</strong>${escapeHtml(getItemDisplayName(nextItem))}</p>`
                                : ""
                        }
                        ${sampleItems ? `<ul class="backlog-preview-list">${sampleItems}</ul>` : ""}
                        <div class="card-actions">
                            ${
                                nextItem
                                    ? `
                                        <button
                                            class="secondary-button"
                                            type="button"
                                            data-action="view-item"
                                            data-item-id="${escapeHtml(nextItem.id)}"
                                        >
                                            直接处理最新一条
                                        </button>
                                    `
                                    : ""
                            }
                            <button
                                class="${nextItem ? "text-button" : "secondary-button"}"
                                type="button"
                                data-action="apply-processing-backlog-filter"
                                data-item-type="${escapeHtml(group.filters?.type || "")}"
                                data-processing-state="${escapeHtml(group.filters?.processing_state || "pending")}"
                            >
                                查看这组待处理
                            </button>
                            ${
                                previewItemIds
                                    ? `
                                        <button
                                            class="text-button"
                                            type="button"
                                            data-action="mark-processing-batch-ready"
                                            data-item-ids="${escapeHtml(previewItemIds)}"
                                            data-item-type="${escapeHtml(group.type || "")}"
                                        >
                                            将预览项标记为已处理
                                        </button>
                                    `
                                    : ""
                            }
                        </div>
                    </article>
                `;
            })
            .join("");
}

function renderProcessingWorkbench(backlog) {
    const groups = backlog?.groups || [];
    const total = Number(backlog?.total || 0);
    const nextOverall = backlog?.next_overall || null;

    elements.processingQueueTotal.textContent = total > 0 ? `待处理 ${total} 条` : "当前已清空";
    elements.processingQueueNextLabel.textContent = nextOverall
        ? `下一条待处理：${getItemDisplayName(nextOverall)}`
        : "当前没有待补正文、待补转写或待补说明的记录。";

    if (!groups.length) {
        renderEmptyState(elements.processingWorkbench, "当前工作台没有待处理条目。");
        return;
    }

    const cards = [];
    if (nextOverall) {
        cards.push(`
            <article class="item-card processing-workbench-card processing-next-card">
                <div class="item-meta">
                    <span class="tag">全局下一条</span>
                    <span>${escapeHtml(formatType(nextOverall.type))}</span>
                    <span>${escapeHtml(nextOverall.processing_note || formatProcessingState(nextOverall.processing_state))}</span>
                </div>
                <h3>${escapeHtml(getItemDisplayName(nextOverall))}</h3>
                <p class="item-preview">${escapeHtml(getDocumentAwarePreviewText(nextOverall, 140))}</p>
                <div class="card-actions">
                    <button
                        class="primary-button"
                        type="button"
                        data-action="edit-item"
                        data-item-id="${escapeHtml(nextOverall.id)}"
                    >
                        连续处理
                    </button>
                    <button
                        class="secondary-button"
                        type="button"
                        data-action="view-item"
                        data-item-id="${escapeHtml(nextOverall.id)}"
                    >
                        查看详情
                    </button>
                </div>
            </article>
        `);
    }

    cards.push(
        ...groups.map((group) => {
            const nextItem = group.next_item || null;
            const previewItems = group.items || [];
            const previewItemIds = buildItemIdsValue(previewItems);
            return `
                <article class="item-card processing-workbench-card">
                    <div class="item-meta">
                        <span class="tag">${escapeHtml(group.type_label || formatType(group.type))}</span>
                        <span>${escapeHtml(group.processing_note || formatProcessingState("pending"))}</span>
                        <span>${escapeHtml(group.count)} 条</span>
                    </div>
                    <h3>${escapeHtml(group.title || "待处理队列")}</h3>
                    <p class="item-preview">${escapeHtml(group.description || "")}</p>
                    ${
                        nextItem
                            ? `
                                <div class="processing-next-inline">
                                    <strong>下一条</strong>
                                    <span>${escapeHtml(getItemDisplayName(nextItem))}</span>
                                </div>
                            `
                            : ""
                    }
                    <div class="card-actions">
                        ${
                            nextItem
                                ? `
                                    <button
                                        class="primary-button"
                                        type="button"
                                        data-action="edit-item"
                                        data-item-id="${escapeHtml(nextItem.id)}"
                                    >
                                        连续处理
                                    </button>
                                    <button
                                        class="secondary-button"
                                        type="button"
                                        data-action="view-item"
                                        data-item-id="${escapeHtml(nextItem.id)}"
                                    >
                                        查看这条
                                    </button>
                                `
                                : ""
                        }
                        <button
                            class="secondary-button"
                            type="button"
                            data-action="apply-processing-backlog-filter"
                            data-item-type="${escapeHtml(group.filters?.type || "")}"
                            data-processing-state="${escapeHtml(group.filters?.processing_state || "pending")}"
                        >
                            看这组
                        </button>
                        ${
                            previewItemIds
                                ? `
                                    <button
                                        class="text-button"
                                        type="button"
                                        data-action="mark-processing-batch-ready"
                                        data-item-ids="${escapeHtml(previewItemIds)}"
                                        data-item-type="${escapeHtml(group.type || "")}"
                                    >
                                        批量标记预览项
                                    </button>
                                `
                                : ""
                        }
                    </div>
                </article>
            `;
        }),
    );

    elements.processingWorkbench.innerHTML = cards.join("");
}

function renderOverviewArtifacts(artifactSummary) {
    const summaryEntries = [
        pickLatestArtifact(artifactSummary.review?.daily, artifactSummary.review?.weekly),
        artifactSummary.inbox,
        pickLatestArtifact(artifactSummary["inbox-actions"]?.["dry-run"], artifactSummary["inbox-actions"]?.apply),
        pickLatestArtifact(
            artifactSummary["inbox-action-history"]?.daily,
            artifactSummary["inbox-action-history"]?.weekly,
        ),
        artifactSummary["audio-transcripts"],
        artifactSummary["image-descriptions"],
    ].filter(Boolean);

    if (!summaryEntries.length) {
        renderEmptyState(elements.overviewArtifactHighlights, "自动化产物还没有生成。");
        return;
    }

    elements.overviewArtifactHighlights.innerHTML = summaryEntries
        .map(
            (artifact) => `
                <article class="summary-card">
                    <div class="item-meta">
                        <span class="tag">${escapeHtml(formatArtifactLabel(artifact))}</span>
                        <span>${escapeHtml(artifact.report_date || formatDateTime(artifact.modified_at))}</span>
                    </div>
                    <h3>${escapeHtml(artifact.generated_name || artifact.name)}</h3>
                    <p class="item-preview">${escapeHtml(summarizeText(artifact.preview, 140) || "没有预览内容。")}</p>
                </article>
            `
        )
        .join("");
}

function renderItemCards(container, items, emptyText) {
    if (!items.length) {
        renderEmptyState(container, emptyText);
        return;
    }

    container.innerHTML = items
        .map((item) => {
            const actionLabel = buildStorageActionLabel(item);
            const preview = getDocumentAwarePreviewText(item, 150);
            const fileDetail = getItemFileDetail(item);
            return `
                <article class="item-card" data-item-id="${escapeHtml(item.id)}">
                    <div class="item-meta">
                        <span class="tag">${escapeHtml(formatType(item.type))}</span>
                        <span class="tag">${escapeHtml(formatStorage(item.storage))}</span>
                        <span class="tag">${escapeHtml(formatProcessingState(item.processing_state))}</span>
                        <span>${escapeHtml(formatDateTime(item.created_at))}</span>
                    </div>
                    <h3>${escapeHtml(getItemDisplayName(item))}</h3>
                    ${
                        item.type === "image"
                            ? `<img class="item-image" alt="${escapeHtml(preview)}" data-protected-image="${escapeHtml(item.file_url || "")}">`
                            : `<p class="item-preview">${escapeHtml(preview)}</p>`
                    }
                    ${
                        fileDetail
                            ? `<p class="helper-text">文件：${escapeHtml(fileDetail)}</p>`
                            : ""
                    }
                    <p class="helper-text">文本层：${escapeHtml(formatTextSource(item.text_source))} · ${escapeHtml(item.processing_note || formatProcessingState(item.processing_state))}</p>
                    <p class="helper-text">来源：${escapeHtml(item.source || "unknown")}</p>
                    <div class="card-actions">
                        <button class="secondary-button" type="button" data-action="view-item" data-item-id="${escapeHtml(item.id)}">查看</button>
                        <button class="text-button" type="button" data-action="toggle-storage" data-item-id="${escapeHtml(item.id)}">${escapeHtml(actionLabel)}</button>
                    </div>
                </article>
            `;
        })
        .join("");

    container.querySelectorAll("[data-protected-image]").forEach((imageElement) => {
        const fileUrl = imageElement.getAttribute("data-protected-image");
        if (!fileUrl) {
            return;
        }
        void loadProtectedImage(imageElement, fileUrl);
    });
}

function flattenArtifactCards(summaryPayload) {
    const latest = summaryPayload.latest;
    return [
        {
            title: "Review",
            countText: `daily ${summaryPayload.counts.review.daily} / weekly ${summaryPayload.counts.review.weekly}`,
            artifact: pickLatestArtifact(latest.review?.daily, latest.review?.weekly),
        },
        {
            title: "Inbox Report",
            countText: `${summaryPayload.counts.inbox} 份`,
            artifact: latest.inbox,
        },
        {
            title: "Inbox Actions",
            countText: `dry-run ${summaryPayload.counts["inbox-actions"]["dry-run"]} / apply ${summaryPayload.counts["inbox-actions"].apply}`,
            artifact: pickLatestArtifact(
                latest["inbox-actions"]?.["dry-run"],
                latest["inbox-actions"]?.apply,
            ),
        },
        {
            title: "Action History",
            countText: `daily ${summaryPayload.counts["inbox-action-history"].daily} / weekly ${summaryPayload.counts["inbox-action-history"].weekly}`,
            artifact: pickLatestArtifact(
                latest["inbox-action-history"]?.daily,
                latest["inbox-action-history"]?.weekly,
            ),
        },
        {
            title: "Audio Transcripts",
            countText: `${summaryPayload.counts["audio-transcripts"]} 份`,
            artifact: latest["audio-transcripts"],
        },
        {
            title: "Image Descriptions",
            countText: `${summaryPayload.counts["image-descriptions"]} 份`,
            artifact: latest["image-descriptions"],
        },
    ];
}

function renderArtifactSummaryCards(summaryPayload) {
    const cards = flattenArtifactCards(summaryPayload);
    elements.artifactSummaryCards.innerHTML = cards
        .map(({ title, countText, artifact }) => {
            const preview = artifact ? summarizeText(artifact.preview, 120) : "还没有产物。";
            const reportDate = artifact?.report_date || "未生成";
            return `
                <article class="summary-card">
                    <div class="item-meta">
                        <span class="tag">${escapeHtml(title)}</span>
                        <span>${escapeHtml(countText)}</span>
                    </div>
                    <h3>${escapeHtml(reportDate)}</h3>
                    <p class="item-preview">${escapeHtml(preview)}</p>
                    ${
                        artifact
                            ? `<div class="card-actions"><button class="secondary-button" type="button" data-action="view-artifact" data-artifact-path="${escapeHtml(artifact.relative_path)}">查看最新</button></div>`
                            : ""
                    }
                </article>
            `;
        })
        .join("");
}

function renderAutomationJobs(jobs) {
    if (!jobs.length) {
        renderAutomationRunJobOptions([]);
        renderEmptyState(elements.automationJobs, "保存 key 后即可读取可执行任务。");
        return;
    }

    elements.automationJobs.innerHTML = jobs
        .map(
            (job) => `
                <article class="automation-job-card">
                    <div class="item-meta">
                        <span class="tag">safe</span>
                        <span>${escapeHtml(job.artifact_group)}</span>
                        <span>${escapeHtml(formatAutomationRuntime(job))}</span>
                    </div>
                    <h3>${escapeHtml(job.label)}</h3>
                    <p class="item-preview">${escapeHtml(job.description)}</p>
                    <p class="helper-text">${escapeHtml(job.availability_note || "当前环境已就绪。")}</p>
                    <div class="card-actions">
                        <button
                            class="primary-button"
                            type="button"
                            data-action="run-automation-job"
                            data-job-id="${escapeHtml(job.id)}"
                            ${job.ready ? "" : 'disabled aria-disabled="true"'}
                        >
                            ${job.ready ? "立即生成" : "未就绪"}
                        </button>
                    </div>
                </article>
            `,
        )
        .join("");
}

function renderAutomationRunJobOptions(jobs) {
    const currentValue = elements.automationRunsJobInput.value;
    elements.automationRunsJobInput.innerHTML = [
        '<option value="">全部任务</option>',
        ...jobs.map((job) => `<option value="${escapeHtml(job.id)}">${escapeHtml(job.label)}</option>`),
    ].join("");

    if (
        currentValue &&
        Array.from(elements.automationRunsJobInput.options).some((option) => option.value === currentValue)
    ) {
        elements.automationRunsJobInput.value = currentValue;
    }
}

function renderAutomationRuns(runs, emptyText = "还没有自动化运行记录。") {
    if (!runs.length) {
        renderEmptyState(elements.automationRuns, emptyText);
        return;
    }

    elements.automationRuns.innerHTML = runs
        .map((run) => {
            const previewSource = run.message || run.stderr_tail?.join(" ") || run.stdout_tail?.join(" ");
            const preview = summarizeText(previewSource, 140) || "没有更多输出。";
            return `
                <article class="automation-run-card">
                    <div class="item-meta">
                        <span class="status-tag" data-status="${escapeHtml(run.status)}">${escapeHtml(formatAutomationStatus(run.status))}</span>
                        <span>${escapeHtml(run.run_date)}</span>
                        <span>${escapeHtml(formatDateTime(run.started_at))}</span>
                    </div>
                    <h3>${escapeHtml(run.job_label)}</h3>
                    <p class="item-preview">${escapeHtml(preview)}</p>
                    <div class="item-meta">
                        <span>耗时 ${escapeHtml(formatDuration(run.duration_ms))}</span>
                        <span>返回码 ${escapeHtml(run.return_code ?? "-")}</span>
                    </div>
                    <div class="card-actions">
                        <button class="secondary-button" type="button" data-action="view-automation-run" data-run-id="${escapeHtml(run.id)}">查看记录</button>
                        ${
                            run.manual_enabled
                                ? `<button class="text-button" type="button" data-action="rerun-automation-run" data-run-id="${escapeHtml(run.id)}">再次运行</button>`
                                : ""
                        }
                        ${
                            run.artifact?.relative_path
                                ? `<button class="text-button" type="button" data-action="view-artifact" data-artifact-path="${escapeHtml(run.artifact.relative_path)}">查看产物</button>`
                                : ""
                        }
                    </div>
                </article>
            `;
        })
        .join("");
}

function renderArtifactList(items) {
    if (!items.length) {
        renderEmptyState(elements.artifactList, "还没有匹配的自动化产物。");
        return;
    }

    elements.artifactList.innerHTML = items
        .map(
            (artifact) => `
                <article class="artifact-card">
                    <div class="artifact-meta">
                        <span class="tag">${escapeHtml(formatArtifactLabel(artifact))}</span>
                        <span>${escapeHtml(artifact.report_date || artifact.generated_name || artifact.name)}</span>
                        <span>${escapeHtml(formatDateTime(artifact.modified_at))}</span>
                    </div>
                    <h3>${escapeHtml(artifact.name)}</h3>
                    <p class="item-preview">${escapeHtml(artifact.relative_path)}</p>
                    <div class="card-actions">
                        <button class="secondary-button" type="button" data-action="view-artifact" data-artifact-path="${escapeHtml(artifact.relative_path)}">查看内容</button>
                    </div>
                </article>
            `
        )
        .join("");
}

async function loadProtectedImage(imageElement, fileUrl) {
    try {
        const blob = await apiRequest(fileUrl, { responseType: "blob" });
        const objectUrl = URL.createObjectURL(blob);
        state.objectUrls.add(objectUrl);
        imageElement.src = objectUrl;
    } catch (error) {
        imageElement.replaceWith(createInlineError("图片读取失败"));
    }
}

function createInlineError(message) {
    const element = document.createElement("div");
    element.className = "empty-state";
    element.textContent = message;
    return element;
}

function buildItemTitle(item) {
    return getItemDisplayName(item);
}

function buildStorageActionLabel(item) {
    return item?.storage === "archive" ? "恢复到 Inbox" : "归档";
}

function buildItemMetaRows(item) {
    const rows = [
        { label: "ID", value: `#${item.id}` },
        { label: "类型", value: formatType(item.type) },
        { label: "存储区", value: formatStorage(item.storage) },
        { label: "处理状态", value: item.processing_note || formatProcessingState(item.processing_state) },
        { label: "主要文本", value: item.text_source_label || formatTextSource(item.text_source) },
        { label: "来源", value: item.source || "unknown" },
        { label: "原文件名", value: item.original_name || "无" },
        { label: "格式", value: item.extension ? item.extension.toUpperCase() : null },
        { label: "MIME", value: item.mime_type || "未知" },
        { label: "大小", value: item.size_bytes ? formatBytes(item.size_bytes) : null },
        { label: "创建时间", value: formatDateTime(item.created_at) },
        { label: "文件路径", value: item.file_path || "无文件" },
    ];
    if (item.type === "document") {
        rows.splice(10, 0, {
            label: "正文抽取",
            value: item.derived_text_available ? "已就绪" : "暂未提取",
        });
    }
    if (item.type === "audio") {
        rows.splice(10, 0, {
            label: "音频转写",
            value: item.transcript_text_available ? "已填写" : "暂未填写",
        });
    }
    if (item.processing_is_overridden && item.processing_override_label) {
        rows.splice(4, 0, { label: "处理覆盖", value: item.processing_override_label });
    }
    if (item.type === "image" && item.content) {
        rows.splice(4, 0, { label: "图片说明", value: item.content });
    } else if (item.type !== "text" && item.content) {
        rows.splice(4, 0, { label: "文件说明", value: item.content });
    }
    return rows;
}

function buildItemViewerActions(item) {
    let downloadLabel = "下载文件";
    if (item.type === "image") {
        downloadLabel = "下载图片";
    } else if (item.type === "document") {
        downloadLabel = "下载文档";
    } else if (item.type === "audio") {
        downloadLabel = "下载音频";
    }
    return [
        {
            label: "编辑",
            className: "primary-button",
            dataset: {
                action: "edit-item",
                itemId: item.id,
            },
        },
        item.file_url
            ? {
                label: downloadLabel,
                dataset: {
                    action: "download-item-file",
                    itemId: item.id,
                    downloadName: item.download_name || `item-${item.id}`,
                },
            }
            : null,
        item.processing_state === "pending"
            ? {
                label: "完成并跳下一条",
                className: "secondary-button",
                dataset: {
                    action: "mark-processing-ready-next",
                    itemId: item.id,
                    itemType: item.type,
                },
            }
            : null,
        item.processing_state === "pending"
            ? {
                label: "标记已处理",
                className: "secondary-button",
                dataset: {
                    action: "mark-processing-ready",
                    itemId: item.id,
                },
            }
            : null,
        item.processing_state === "pending"
            ? {
                label: "同类下一条",
                className: "secondary-button",
                dataset: {
                    action: "open-next-pending-item",
                    itemId: item.id,
                    itemType: item.type,
                },
            }
            : null,
        item.processing_is_overridden
            ? {
                label: "恢复待处理",
                className: "secondary-button",
                dataset: {
                    action: "clear-processing-override",
                    itemId: item.id,
                },
            }
            : null,
        {
            label: buildStorageActionLabel(item),
            className: "secondary-button",
            dataset: {
                action: "viewer-toggle-storage",
                itemId: item.id,
            },
        },
        {
            label: "删除",
            className: "text-button",
            style: "color:var(--color-error)",
            dataset: {
                action: "delete-item",
                itemId: item.id,
            },
        },
    ];
}

function updateKnownItem(item) {
    if (!item?.id) {
        return;
    }

    const mergeItem = (items) => items.map((entry) => (entry.id === item.id ? { ...entry, ...item } : entry));
    state.recent.items = mergeItem(state.recent.items);
    state.search.items = mergeItem(state.search.items);
}

function clearViewerChrome() {
    elements.viewerMeta.innerHTML = "";
    elements.viewerActions.innerHTML = "";
}

function renderViewerMeta(rows) {
    const filteredRows = rows.filter((row) => row && row.value);
    if (!filteredRows.length) {
        elements.viewerMeta.innerHTML = "";
        return;
    }

    elements.viewerMeta.innerHTML = filteredRows
        .map(
            (row) => `
                <div class="viewer-meta-card">
                    <strong>${escapeHtml(row.label)}</strong>
                    <span>${escapeHtml(row.value)}</span>
                </div>
            `
        )
        .join("");
}

function renderViewerActions(actions) {
    const filteredActions = actions.filter(Boolean);
    if (!filteredActions.length) {
        elements.viewerActions.innerHTML = "";
        return;
    }

    elements.viewerActions.innerHTML = filteredActions
        .map((action) => {
            const attributes = Object.entries(action.dataset || {})
                .map(([name, value]) => {
                    const dataName = name.replace(/[A-Z]/g, (character) => `-${character.toLowerCase()}`);
                    return `data-${escapeHtml(dataName)}="${escapeHtml(value)}"`;
                })
                .join(" ");
            return `
                <button class="${escapeHtml(action.className || "secondary-button")}" type="button" ${attributes}>
                    ${escapeHtml(action.label)}
                </button>
            `;
        })
        .join("");
}

async function fetchItemDetail(itemId) {
    const payload = await apiRequest(`/item/${itemId}`);
    updateKnownItem(payload.item);
    return payload.item;
}

async function fetchNextPendingItem(itemType = "", excludeItemId = null) {
    const query = {};
    if (itemType) {
        query.type = itemType;
    }
    if (excludeItemId !== null && excludeItemId !== undefined && excludeItemId !== "") {
        query.exclude_id = excludeItemId;
    }
    const payload = await apiRequest("/processing/next", {
        query,
    });
    if (payload.item) {
        updateKnownItem(payload.item);
    }
    return payload.item || null;
}

async function handleOpenNextPendingItem(itemId, itemType, { edit = false } = {}) {
    try {
        const nextItem = await fetchNextPendingItem(itemType, itemId);
        if (!nextItem) {
            showToast(itemType ? `${formatType(itemType)} 待处理已清空` : "当前没有下一条待处理");
            return;
        }
        if (edit) {
            await openItemEditor(nextItem.id);
            showToast("已打开同类下一条待处理");
        } else {
            await openItemViewer(nextItem.id);
            showToast("已切换到同类下一条待处理");
        }
    } catch (error) {
        setConnectionState("error", error.message);
        showToast(error.message);
    }
}

function buildArtifactFilePath(relativePath) {
    return `/artifacts/file/${String(relativePath || "")
        .split("/")
        .map((part) => encodeURIComponent(part))
        .join("/")}`;
}

async function downloadProtectedFile(fileUrl, downloadName) {
    const blob = await apiRequest(fileUrl, { responseType: "blob" });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = downloadName || "axiom-file";
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
    }, 0);
}

function findItemById(itemId) {
    const targetId = Number(itemId);
    return (
        state.recent.items.find((item) => item.id === targetId) ||
        state.search.items.find((item) => item.id === targetId) ||
        null
    );
}

function findAutomationRunById(runId) {
    const targetId = Number(runId);
    return state.automation.runs.find((run) => run.id === targetId) || null;
}

function findArtifactByPath(relativePath) {
    return state.artifacts.items.find((artifact) => artifact.relative_path === relativePath);
}

function openViewerShell(title, contentClass = "viewer-content") {
    releaseViewerObjectUrl();
    elements.viewerTitle.textContent = title;
    elements.viewerContent.className = contentClass;
    elements.viewerContent.innerHTML = "";
    elements.viewerBackdrop.style.pointerEvents = "auto";
    elements.viewerBackdrop.setAttribute("aria-hidden", "false");
    elements.viewerBackdrop.classList.remove("hidden");
}

function openViewerWithText(title, content, metaRows = [], actions = []) {
    openViewerShell(title, "viewer-content is-text");
    renderViewerMeta(metaRows);
    renderViewerActions(actions);
    elements.viewerContent.textContent = content;
}

function appendViewerTextSection(heading, text) {
    const normalizedText = String(text || "").trim();
    if (!normalizedText) {
        return;
    }

    const section = document.createElement("section");
    section.className = "viewer-text-section";

    const title = document.createElement("h3");
    title.textContent = heading;
    section.append(title);

    const body = document.createElement("pre");
    body.className = "viewer-text-block";
    body.textContent = normalizedText;
    section.append(body);

    elements.viewerContent.append(section);
}

async function openViewerWithImage(title, fileUrl, metaRows = [], actions = []) {
    openViewerShell(title);
    renderViewerMeta(metaRows);
    renderViewerActions(actions);
    const blob = await apiRequest(fileUrl, { responseType: "blob" });
    const objectUrl = URL.createObjectURL(blob);
    state.viewerObjectUrl = objectUrl;
    const image = document.createElement("img");
    image.src = objectUrl;
    image.alt = title;
    elements.viewerContent.append(image);
}

async function openViewerWithAudio(title, fileUrl, item, metaRows = [], actions = []) {
    openViewerShell(title);
    renderViewerMeta(metaRows);
    renderViewerActions(actions);
    const blob = await apiRequest(fileUrl, { responseType: "blob" });
    const objectUrl = URL.createObjectURL(blob);
    state.viewerObjectUrl = objectUrl;

    const audio = document.createElement("audio");
    audio.src = objectUrl;
    audio.controls = true;
    audio.preload = "metadata";
    elements.viewerContent.append(audio);

    if (item?.content) {
        const description = document.createElement("p");
        description.className = "item-preview";
        description.textContent = item.content;
        elements.viewerContent.append(description);
    }
    if (item?.transcript_text) {
        appendViewerTextSection("音频转写文本", item.transcript_text);
    }
}

async function openViewerWithPdf(title, fileUrl, item, metaRows = [], actions = []) {
    openViewerShell(title);
    renderViewerMeta(metaRows);
    renderViewerActions(actions);
    const blob = await apiRequest(fileUrl, { responseType: "blob" });
    const objectUrl = URL.createObjectURL(blob);
    state.viewerObjectUrl = objectUrl;

    const frame = document.createElement("iframe");
    frame.src = objectUrl;
    frame.title = title;
    frame.className = "viewer-embed";
    elements.viewerContent.append(frame);

    if (item?.content) {
        const description = document.createElement("p");
        description.className = "item-preview";
        description.textContent = item.content;
        elements.viewerContent.append(description);
    }
    if (item?.derived_text) {
        appendViewerTextSection("PDF 鎻愬彇鏂囨湰", item.derived_text);
    }
}

async function openArtifactViewer(relativePath) {
    const artifact = findArtifactByPath(relativePath);
    const title = artifact ? artifact.name : relativePath;
    const filePath = artifact?.file_url || buildArtifactFilePath(relativePath);
    const body = await apiRequest(filePath, {
        responseType: "text",
    });
    state.viewerContext = { kind: "artifact", relativePath };
    openViewerWithText(
        title,
        body,
        [
            { label: "分组", value: artifact ? formatArtifactLabel(artifact) : "自动化产物" },
            { label: "日期", value: artifact?.report_date || artifact?.generated_name || "未标记" },
            { label: "修改时间", value: artifact?.modified_at ? formatDateTime(artifact.modified_at) : "未知时间" },
            { label: "路径", value: artifact?.relative_path || relativePath },
        ],
        [
            {
                label: "下载 Markdown",
                dataset: {
                    action: "download-artifact-file",
                    artifactPath: relativePath,
                    artifactName: artifact?.name || "artifact.md",
                },
            },
        ],
    );
}

async function openAutomationRunViewer(runId) {
    const run = findAutomationRunById(runId);
    if (!run) {
        throw new Error("当前运行记录未加载，请先刷新运行记录");
    }

    state.viewerContext = { kind: "automation-run", runId: run.id };
    const sections = [
        `状态: ${formatAutomationStatus(run.status)}`,
        `消息: ${run.message || "无"}`,
        "",
        "stdout",
        run.stdout_tail?.length ? run.stdout_tail.join("\n") : "(无)",
        "",
        "stderr",
        run.stderr_tail?.length ? run.stderr_tail.join("\n") : "(无)",
    ];
    if (run.artifact?.preview) {
        sections.push("", "产物预览", run.artifact.preview);
    }

    openViewerWithText(
        `${run.job_label} #${run.id}`,
        sections.join("\n"),
        [
            { label: "状态", value: formatAutomationStatus(run.status) },
            { label: "运行日期", value: run.run_date },
            { label: "开始时间", value: formatDateTime(run.started_at) },
            { label: "结束时间", value: run.finished_at ? formatDateTime(run.finished_at) : "未结束" },
            { label: "耗时", value: formatDuration(run.duration_ms) },
            { label: "返回码", value: run.return_code ?? "-" },
            { label: "产物路径", value: run.artifact?.relative_path || "无" },
        ],
        [
            run.manual_enabled
                ? {
                    label: "再次运行",
                    className: "primary-button",
                    dataset: {
                        action: "rerun-automation-run",
                        runId: run.id,
                    },
                }
                : null,
            run.artifact?.relative_path
                ? {
                    label: "查看产物",
                    dataset: {
                        action: "view-artifact",
                        artifactPath: run.artifact.relative_path,
                    },
                }
                : null,
        ],
    );
}

function createViewerField(labelText, control, helperText = "") {
    const label = document.createElement("label");
    label.className = "field";

    const title = document.createElement("span");
    title.textContent = labelText;
    label.append(title, control);

    if (helperText) {
        const helper = document.createElement("p");
        helper.className = "helper-text";
        helper.textContent = helperText;
        label.append(helper);
    }

    return label;
}

function buildItemEditorForm(item) {
    const form = document.createElement("form");
    form.className = "stack-form viewer-edit-form";
    form.dataset.role = "item-edit-form";
    form.dataset.itemId = String(item.id);
    form.dataset.itemType = item.type;

    const intro = document.createElement("p");
    intro.className = "helper-text";
    intro.textContent = item.type === "text"
        ? "文本内容会同时更新数据库和落盘 txt 文件。"
        : "可以补文件说明，也可以修正 source。留空可清空文件说明。";
    form.append(intro);

    let previewSlot = null;
    if (item.type === "image" && item.file_url) {
        previewSlot = document.createElement("div");
        previewSlot.className = "viewer-edit-preview";
        previewSlot.append(createInlineError("正在加载图片预览..."));
        form.append(previewSlot);
    }

    const contentInput = document.createElement("textarea");
    contentInput.name = "content";
    contentInput.rows = item.type === "text" ? 10 : 4;
    contentInput.placeholder = item.type === "text" ? "修正文本文字" : "给文件补一段说明";
    contentInput.value = item.content || "";
    form.append(
        createViewerField(
            item.type === "text" ? "文本内容" : "文件说明",
            contentInput,
            item.type === "text" ? "文本内容不能为空。" : "",
        ),
    );

    if (item.type === "document") {
        const derivedInput = document.createElement("textarea");
        derivedInput.name = "derived_text";
        derivedInput.rows = 10;
        derivedInput.placeholder = "可选：补充或修正文档正文，后续搜索会直接命中这里";
        derivedInput.value = item.derived_text || "";
        form.append(
            createViewerField(
                "文档正文",
                derivedInput,
                "适合粘贴 PDF / Word 的可读正文，后续搜索和回顾都会优先消费这里。",
            ),
        );
    }

    if (item.type === "audio") {
        const transcriptInput = document.createElement("textarea");
        transcriptInput.name = "transcript_text";
        transcriptInput.rows = 8;
        transcriptInput.placeholder = "可选：补充音频转写文本，后续搜索会直接命中这里";
        transcriptInput.value = item.transcript_text || "";
        form.append(
            createViewerField(
                "音频转写文本",
                transcriptInput,
                "可留空，也可以后续回来继续补写。",
            ),
        );
    }

    const sourceInput = document.createElement("input");
    sourceInput.name = "source";
    sourceInput.type = "text";
    sourceInput.placeholder = "如 web_app / ios_shortcut";
    sourceInput.value = item.source || "";
    form.append(createViewerField("来源", sourceInput));

    const feedback = document.createElement("p");
    feedback.className = "feedback-text";
    feedback.dataset.editFeedback = "true";
    form.append(feedback);

    return { form, previewSlot };
}

async function loadViewerEditPreview(previewSlot, fileUrl, title) {
    if (!previewSlot || !fileUrl) {
        return;
    }

    try {
        const blob = await apiRequest(fileUrl, { responseType: "blob" });
        const objectUrl = URL.createObjectURL(blob);
        state.viewerObjectUrl = objectUrl;

        previewSlot.innerHTML = "";
        const image = document.createElement("img");
        image.src = objectUrl;
        image.alt = title;
        previewSlot.append(image);
    } catch (error) {
        previewSlot.innerHTML = "";
        previewSlot.append(createInlineError("图片预览读取失败"));
    }
}

async function openItemEditor(itemId) {
    const item = await fetchItemDetail(itemId);
    const title = `编辑 ${formatType(item.type)} #${item.id}`;
    state.viewerContext = { kind: "item-edit", itemId: item.id };
    openViewerShell(title);
    renderViewerMeta(buildItemMetaRows(item));
    const canContinuePending = item.processing_state === "pending";
    renderViewerActions([
        {
            label: "保存修改",
            className: canContinuePending ? "secondary-button" : "primary-button",
            dataset: {
                action: "save-item-edit",
                itemId: item.id,
            },
        },
        canContinuePending
            ? {
                label: "保存并处理同类下一条",
                className: "primary-button",
                dataset: {
                    action: "save-item-edit-next",
                    itemId: item.id,
                    itemType: item.type,
                },
            }
            : null,
        item.processing_state === "pending"
            ? {
                label: "完成并跳下一条",
                className: "secondary-button",
                dataset: {
                    action: "mark-processing-ready-next",
                    itemId: item.id,
                    itemType: item.type,
                },
            }
            : null,
        item.processing_state === "pending"
            ? {
                label: "标记已处理",
                className: "secondary-button",
                dataset: {
                    action: "mark-processing-ready",
                    itemId: item.id,
                },
            }
            : null,
        canContinuePending
            ? {
                label: "跳到下一条",
                className: "secondary-button",
                dataset: {
                    action: "open-next-pending-item-edit",
                    itemId: item.id,
                    itemType: item.type,
                },
            }
            : null,
        item.processing_is_overridden
            ? {
                label: "恢复待处理",
                className: "secondary-button",
                dataset: {
                    action: "clear-processing-override",
                    itemId: item.id,
                },
            }
            : null,
        {
            label: "返回查看",
            className: "secondary-button",
            dataset: {
                action: "view-item",
                itemId: item.id,
            },
        },
        item.file_url
            ? {
                label: item.type === "image"
                    ? "下载图片"
                    : item.type === "document"
                        ? "下载文档"
                        : item.type === "audio"
                            ? "下载音频"
                            : "下载文件",
                dataset: {
                    action: "download-item-file",
                    itemId: item.id,
                    downloadName: item.download_name || `item-${item.id}`,
                },
            }
            : null,
    ]);

    const { form, previewSlot } = buildItemEditorForm(item);
    elements.viewerContent.append(form);

    if (previewSlot && item.file_url) {
        await loadViewerEditPreview(previewSlot, item.file_url, buildItemTitle(item));
    }
}

async function openItemViewer(itemId) {
    const item = await fetchItemDetail(itemId);
    const title = buildItemTitle(item);
    state.viewerContext = { kind: "item", itemId: item.id };

    if (item.type === "image" && item.file_url) {
        await openViewerWithImage(title, item.file_url, buildItemMetaRows(item), buildItemViewerActions(item));
        return;
    }

    if (item.type === "audio" && item.file_url) {
        await openViewerWithAudio(title, item.file_url, item, buildItemMetaRows(item), buildItemViewerActions(item));
        return;
    }

    if (isPdfItem(item) && item.file_url) {
        await openViewerWithPdf(title, item.file_url, item, buildItemMetaRows(item), buildItemViewerActions(item));
        return;
    }

    if (item.type === "document") {
        const sections = [];
        const contentText = String(item.content || "").trim();
        const originalName = String(item.original_name || "").trim();
        const derivedText = String(item.derived_text || "").trim();

        if (contentText && contentText !== originalName) {
            sections.push("文件说明", contentText);
        }
        if (derivedText) {
            sections.push("文档正文", derivedText);
        }

        openViewerWithText(
            title,
            sections.length ? sections.join("\n\n") : (contentText || originalName || "document preview unavailable, use download"),
            buildItemMetaRows(item),
            buildItemViewerActions(item),
        );
        return;
    }

    openViewerWithText(
        title,
        item.content || item.original_name || "该文件暂不支持内嵌预览，请使用下载文件。",
        buildItemMetaRows(item),
        buildItemViewerActions(item),
    );
}

function closeViewer() {
    releaseViewerObjectUrl();
    clearViewerChrome();
    elements.viewerBackdrop.style.pointerEvents = "none";
    elements.viewerBackdrop.setAttribute("aria-hidden", "true");
    elements.viewerBackdrop.classList.add("hidden");
    elements.viewerContent.innerHTML = "";
    elements.viewerContent.className = "viewer-content";
    state.viewerContext = null;
}

function releaseViewerObjectUrl() {
    if (!state.viewerObjectUrl) {
        return;
    }
    URL.revokeObjectURL(state.viewerObjectUrl);
    state.viewerObjectUrl = null;
}

function releaseAllObjectUrls() {
    releaseViewerObjectUrl();
    state.objectUrls.forEach((objectUrl) => URL.revokeObjectURL(objectUrl));
    state.objectUrls.clear();
}

async function loadOverview() {
    const payload = await apiRequest("/overview", {
        query: {
            recent_limit: OVERVIEW_RECENT_LIMIT,
            preview_chars: OVERVIEW_PREVIEW_CHARS,
        },
    });
    renderOverviewStats(payload.stats);
    renderOverviewRecent(payload.recent.items || []);
    renderOverviewBacklog(payload.processing_backlog || { total: 0, groups: [] });
    renderOverviewArtifacts(payload.artifacts.latest || {});
    elements.overviewGeneratedAt.textContent = `生成于 ${formatDateTime(payload.generated_at)}`;
    elements.lastSyncIndicator.textContent = `上次同步：${formatDateTime(payload.generated_at)}`;
}

async function loadProcessingQueue() {
    const payload = await apiRequest("/processing/backlog", {
        query: {
            group_limit: 4,
        },
    });
    renderProcessingWorkbench(payload);
}

function readRecentFilters() {
    const form = new FormData(elements.recentFilterForm);
    return {
        type: String(form.get("type") || "").trim(),
        storage: String(form.get("storage") || "").trim(),
        source: String(form.get("source") || "").trim(),
        processing_state: String(form.get("processing_state") || "").trim(),
        processing_override: String(form.get("processing_override") || "").trim(),
        sort: String(form.get("sort") || "newest").trim(),
        created_from: toUtcIsoFromLocalInput(String(form.get("created_from") || "").trim()),
        created_to: toUtcIsoFromLocalInput(String(form.get("created_to") || "").trim()),
    };
}

async function applyProcessingBacklogFilter(itemType, processingState = "pending") {
    try {
        elements.recentFilterForm.reset();
        document.getElementById("recent-sort-input").value = "newest";
        document.getElementById("recent-type-input").value = itemType || "";
        document.getElementById("recent-processing-state-input").value = processingState || "";
        document.getElementById("recent-processing-override-input").value = "";
        setConnectionState("busy", "正在切换到待处理队列");
        await loadRecentPage({ reset: true });
        setConnectionState("ready", elements.lastSyncIndicator.textContent);
        elements.recentPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
        setConnectionState("error", error.message);
        showToast(error.message);
    }
}

async function loadRecentPage({ reset = false } = {}) {
    const filters = readRecentFilters();
    const nextPage = reset ? 1 : state.recent.page + 1;
    const payload = await apiRequest("/recent", {
        query: {
            ...filters,
            page: nextPage,
            page_size: RECENT_PAGE_SIZE,
        },
    });

    state.recent.page = payload.page;
    state.recent.totalPages = payload.total_pages || 1;
    state.recent.total = payload.total || 0;
    state.recent.items = reset
        ? payload.items
        : [...state.recent.items, ...payload.items];

    renderItemCards(elements.recentList, state.recent.items, "还没有记录。");
    renderRecentBatchActions(state.recent.items);
    updateLoadMoreButton(elements.loadMoreRecentButton, state.recent.page, state.recent.totalPages);
    setFeedback(
        elements.recentFeedback,
        `共 ${state.recent.total} 条记录，当前显示 ${state.recent.items.length} 条。`,
        "ok",
    );
}

function readSearchFilters() {
    const form = new FormData(elements.searchForm);
    return {
        q: String(form.get("q") || "").trim(),
        type: String(form.get("type") || "").trim(),
        storage: String(form.get("storage") || "").trim(),
        source: String(form.get("source") || "").trim(),
        processing_state: String(form.get("processing_state") || "").trim(),
        processing_override: String(form.get("processing_override") || "").trim(),
        sort: String(form.get("sort") || "relevance").trim(),
        created_from: toUtcIsoFromLocalInput(String(form.get("created_from") || "").trim()),
        created_to: toUtcIsoFromLocalInput(String(form.get("created_to") || "").trim()),
    };
}

async function loadSearchPage({ reset = false } = {}) {
    const filters = readSearchFilters();
    if (!filters.q) {
        setFeedback(elements.searchFeedback, "请输入关键词后再搜索。", "error");
        renderEmptyState(elements.searchResults, "输入关键词后再开始搜索。");
        if (elements.searchBatchActions) {
            elements.searchBatchActions.innerHTML = "";
        }
        updateLoadMoreButton(elements.loadMoreSearchButton, 1, 1, "还没有结果");
        return;
    }

    const nextPage = reset ? 1 : state.search.page + 1;
    const payload = await apiRequest("/search", {
        query: {
            ...filters,
            page: nextPage,
            page_size: SEARCH_PAGE_SIZE,
        },
    });

    state.search.active = true;
    state.search.page = payload.page;
    state.search.totalPages = payload.total_pages || 1;
    state.search.total = payload.total || 0;
    state.search.items = reset
        ? payload.items
        : [...state.search.items, ...payload.items];

    renderItemCards(elements.searchResults, state.search.items, "没有匹配结果。");
    renderSearchBatchActions(state.search.items);
    updateLoadMoreButton(elements.loadMoreSearchButton, state.search.page, state.search.totalPages);
    setFeedback(
        elements.searchFeedback,
        `共 ${payload.total} 条结果，当前显示 ${state.search.items.length} 条。`,
        "ok",
    );
}

function readArtifactFilters() {
    const form = new FormData(elements.artifactFilterForm);
    return {
        group: String(form.get("group") || "").trim(),
        window: String(form.get("window") || "").trim(),
        mode: String(form.get("mode") || "").trim(),
        date_from: String(form.get("date_from") || "").trim(),
        date_to: String(form.get("date_to") || "").trim(),
    };
}

function readAutomationRunFilters() {
    const form = new FormData(elements.automationRunsFilterForm);
    return {
        job: String(form.get("job") || "").trim(),
        status: String(form.get("status") || "").trim(),
    };
}

async function loadArtifactPanels({ reset = false } = {}) {
    const filters = readArtifactFilters();
    const nextPage = reset ? 1 : state.artifacts.page + 1;

    if (reset) {
        const summaryPayload = await apiRequest("/artifacts/summary", {
            query: {
                ...filters,
                preview_chars: OVERVIEW_PREVIEW_CHARS,
            },
        });
        renderArtifactSummaryCards(summaryPayload);
    }

    const payload = await apiRequest("/artifacts", {
        query: {
            ...filters,
            sort: "newest",
            page: nextPage,
            page_size: ARTIFACT_PAGE_SIZE,
        },
    });

    state.artifacts.page = payload.page;
    state.artifacts.totalPages = payload.total_pages || 1;
    state.artifacts.items = reset
        ? payload.items
        : [...state.artifacts.items, ...payload.items];

    renderArtifactList(state.artifacts.items);
    updateLoadMoreButton(
        elements.loadMoreArtifactsButton,
        state.artifacts.page,
        state.artifacts.totalPages,
    );
}

async function loadAutomationJobs({ force = false } = {}) {
    if (state.automation.jobsLoaded && !force) {
        renderAutomationJobs(state.automation.jobs);
        return;
    }

    const payload = await apiRequest("/automation/jobs");
    state.automation.jobs = payload.jobs || [];
    state.automation.historyJobs = payload.history_jobs || payload.jobs || [];
    state.automation.jobsLoaded = true;

    if (!elements.automationDateInput.value && state.automation.jobs[0]?.default_date) {
        elements.automationDateInput.value = state.automation.jobs[0].default_date;
    }

    renderAutomationRunJobOptions(state.automation.historyJobs);
    renderAutomationJobs(state.automation.jobs);
}

async function loadAutomationRuns({ reset = false } = {}) {
    const filters = readAutomationRunFilters();
    const nextPage = reset ? 1 : state.automation.runsPage + 1;
    const payload = await apiRequest("/automation/runs", {
        query: {
            ...filters,
            page: nextPage,
            page_size: AUTOMATION_RUN_PAGE_SIZE,
        },
    });

    state.automation.runsPage = payload.page;
    state.automation.runsTotalPages = payload.total_pages || 1;
    state.automation.runsTotal = payload.total || 0;
    state.automation.runs = reset
        ? (payload.items || [])
        : [...state.automation.runs, ...(payload.items || [])];

    const emptyText = filters.job || filters.status ? "当前筛选下还没有运行记录。" : "还没有自动化运行记录。";
    renderAutomationRuns(state.automation.runs, emptyText);
    updateLoadMoreButton(
        elements.loadMoreAutomationRunsButton,
        state.automation.runsPage,
        state.automation.runsTotalPages,
    );
    setFeedback(
        elements.automationRunsFeedback,
        `共 ${state.automation.runsTotal} 条运行记录，当前显示 ${state.automation.runs.length} 条。`,
        "ok",
    );
}

async function loadMemories({ reset = false } = {}) {
    if (reset) {
        state.memories = { page: 1, totalPages: 1, items: [], total: 0 };
    }
    const query = {
        page: state.memories.page,
        page_size: RECENT_PAGE_SIZE,
    };
    const cat = elements.memoryFilterCategory.value;
    const st = elements.memoryFilterStatus.value;
    if (cat) query.category = cat;
    if (st) query.status = st;

    try {
        const payload = await apiRequest("/memories", { query });
        if (reset) {
            state.memories.items = payload.memories;
        } else {
            state.memories.items.push(...payload.memories);
        }
        state.memories.page = payload.page;
        state.memories.totalPages = payload.total_pages;
        state.memories.total = payload.total;
        renderMemoryCards(state.memories);
        updateLoadMoreButton(elements.loadMoreMemoriesButton, state.memories.page, state.memories.totalPages);
    } catch (error) {
        renderEmptyState(elements.memoryList, error.message);
    }
}

function renderMemoryStats(stats) {
    if (!stats || !stats.total) {
        elements.memoryStats.innerHTML = "";
        return;
    }
    const categories = Object.entries(stats.by_category || {});
    const catBadges = categories.map(([cat, data]) =>
        `<span class="tag tag-${cat}">${escapeHtml(data.label)} ${data.confirmed || 0}</span>`
    ).join("");
    elements.memoryStats.innerHTML = `
        <div class="stat-card">
            <p class="stat-value">${stats.total}</p>
            <p class="stat-label">全部记忆</p>
        </div>
        <div class="stat-card">
            <p class="stat-value">${categories.reduce((s, [, d]) => s + (d.confirmed || 0), 0)}</p>
            <p class="stat-label">已确认</p>
        </div>
        <div class="stat-card">
            <p class="stat-value">${categories.reduce((s, [, d]) => s + (d.candidate || 0), 0)}</p>
            <p class="stat-label">待确认</p>
        </div>
        <div class="stat-card stat-card-wide">
            <p class="stat-label">分类分布</p>
            <p>${catBadges || "暂无"}</p>
        </div>
    `;
}

function renderMemoryCards(data) {
    if (!data || data.items.length === 0) {
        renderEmptyState(elements.memoryList, "还没有记忆，在上方添加第一条吧。");
        updateLoadMoreButton(elements.loadMoreMemoriesButton, data.page, data.totalPages, "没有更多");
        return;
    }

    const cardsHtml = data.items.map((mem) => {
        const statusClass = mem.status === "confirmed" ? "tag-ok" : mem.status === "archived" ? "tag-dim" : "tag-warn";
        const catClass = `tag-${mem.category}`;
        const sourceLink = mem.source_item_id
            ? `<button type="button" class="text-button" data-action="view-item" data-item-id="${mem.source_item_id}">来源 #${mem.source_item_id}</button>`
            : "";
        const detailHtml = mem.detail ? `<p class="item-meta">${escapeHtml(mem.detail)}</p>` : "";

        // Task progress for goal memories
        let progressHtml = "";
        if (mem.category === "goal" && mem.task_progress && mem.task_progress.total > 0) {
            const pct = Math.round((mem.task_progress.done / mem.task_progress.total) * 100);
            progressHtml = `<div style="margin:6px 0;background:var(--glass-border);border-radius:4px;height:4px;overflow:hidden">
                <div style="width:${pct}%;height:100%;background:var(--bloom-cyan);transition:width 300ms"></div>
            </div>
            <p class="item-meta">任务进度 ${mem.task_progress.done}/${mem.task_progress.total} · ${pct}%</p>`;
        }
        const actions = [];
        if (mem.status === "candidate") {
            actions.push(`<button type="button" class="text-button" data-action="confirm-memory" data-memory-id="${mem.id}">确认</button>`);
        }
        if (mem.status !== "archived") {
            actions.push(`<button type="button" class="text-button" data-action="archive-memory" data-memory-id="${mem.id}">归档</button>`);
        }
        actions.push(`<button type="button" class="text-button" data-action="delete-memory" data-memory-id="${mem.id}">删除</button>`);
        return `
            <div class="item-card">
                <div class="item-card-body">
                    <div class="item-card-tags">
                        <span class="tag ${catClass}">${escapeHtml(mem.category_label)}</span>
                        <span class="tag ${statusClass}">${escapeHtml(mem.status_label)}</span>
                    </div>
                    <p class="item-card-text">${escapeHtml(mem.content)}</p>
                    ${detailHtml}
                    ${progressHtml}
                    <p class="item-meta">${formatDateTime(mem.created_at)}${sourceLink ? " · " + sourceLink : ""}</p>
                </div>
                <div class="item-card-actions">${actions.join("")}</div>
            </div>
        `;
    }).join("");

    elements.memoryList.innerHTML = cardsHtml;
}

async function handleMemoryQuickCreate(event) {
    event.preventDefault();
    const category = elements.memoryQuickCategory.value;
    const content = elements.memoryQuickContent.value.trim();
    const detail = elements.memoryQuickDetail.value.trim();

    if (!content) {
        setFeedback(elements.memoryQuickFeedback, "内容不能为空。", "error");
        return;
    }

    try {
        setConnectionState("busy", "正在写入记忆");
        await apiRequest("/memories", {
            method: "POST",
            json: { category, content, detail: detail || undefined },
        });
        elements.memoryQuickContent.value = "";
        elements.memoryQuickDetail.value = "";
        setFeedback(elements.memoryQuickFeedback, "已添加。", "ok");
        await loadMemories({ reset: true });
        const statsPayload = await apiRequest("/memories/stats");
        renderMemoryStats(statsPayload);
        setConnectionState("ready", "记忆已写入");
    } catch (error) {
        setFeedback(elements.memoryQuickFeedback, error.message, "error");
        setConnectionState("error", error.message);
    }
}

async function handleConfirmMemory(memoryId) {
    try {
        setConnectionState("busy", "正在确认记忆");
        await apiRequest(`/memories/${memoryId}/confirm`, { method: "POST" });
        await loadMemories({ reset: true });
        const statsPayload = await apiRequest("/memories/stats");
        renderMemoryStats(statsPayload);
        setConnectionState("ready", "记忆已确认");
    } catch (error) {
        showToast(error.message);
        setConnectionState("error", error.message);
    }
}

async function handleArchiveMemory(memoryId) {
    try {
        setConnectionState("busy", "正在归档记忆");
        await apiRequest(`/memories/${memoryId}/archive`, { method: "POST" });
        await loadMemories({ reset: true });
        const statsPayload = await apiRequest("/memories/stats");
        renderMemoryStats(statsPayload);
        setConnectionState("ready", "记忆已归档");
    } catch (error) {
        showToast(error.message);
        setConnectionState("error", error.message);
    }
}

async function handleDeleteMemory(memoryId) {
    if (!confirm("确定要删除这条记忆吗？")) return;
    try {
        setConnectionState("busy", "正在删除记忆");
        await apiRequest(`/memories/${memoryId}`, { method: "DELETE" });
        await loadMemories({ reset: true });
        const statsPayload = await apiRequest("/memories/stats");
        renderMemoryStats(statsPayload);
        setConnectionState("ready", "记忆已删除");
    } catch (error) {
        showToast(error.message);
        setConnectionState("error", error.message);
    }
}

async function loadTasksToday() {
    try {
        const payload = await apiRequest("/tasks/today");
        state.tasks.todayItems = payload.today;
        state.tasks.overdueItems = payload.overdue;
        renderTasksToday(payload);
    } catch (error) {
        renderEmptyState(elements.tasksTodayList, error.message);
    }
}

function renderTasksToday(data) {
    const prioritySort = { high: 0, medium: 1, low: 2 };

    if (data.overdue && data.overdue.length > 0) {
        const sorted = [...data.overdue].sort((a, b) => prioritySort[a.priority] - prioritySort[b.priority]);
        elements.tasksOverdueList.innerHTML = `
            <div class="section-head section-head-compact">
                <div><p class="eyebrow" style="color:var(--color-warn)">已过期 (${sorted.length})</p></div>
            </div>
            ${sorted.map(t => renderOverdueTaskCard(t)).join("")}
        `;
    } else {
        elements.tasksOverdueList.innerHTML = "";
    }

    if (data.today && data.today.length > 0) {
        const sorted = [...data.today].sort((a, b) => prioritySort[a.priority] - prioritySort[b.priority]);
        elements.tasksTodayList.innerHTML = sorted.map(t => renderTaskCard(t)).join("");
    } else {
        renderEmptyState(elements.tasksTodayList, "今天还没有安排任务，在下方添加吧。");
    }
}

function renderOverdueTaskCard(task) {
    const overdueDays = task.overdue_days || 1;
    const ageBadge = `<span class="tag tag-warn">过期 ${overdueDays} 天</span>`;
    const priorityDot = task.priority === "high" ? '<span class="tag tag-warn">高</span>' : task.priority === "low" ? '<span class="tag tag-dim">低</span>' : "";
    const detailHtml = task.detail ? `<p class="item-meta">${escapeHtml(task.detail)}</p>` : "";
    return `
        <div class="item-card">
            <div class="item-card-body">
                <div class="item-card-tags">${ageBadge} ${priorityDot}</div>
                <p class="item-card-text">${escapeHtml(task.title)}</p>
                ${detailHtml}
                <p class="item-meta">${formatDateTime(task.created_at)} · 截止 ${task.due_date}</p>
            </div>
            <div class="item-card-actions">
                <button type="button" class="text-button" data-action="task-reschedule" data-task-id="${task.id}">今天做</button>
                <button type="button" class="text-button" data-action="task-done" data-task-id="${task.id}">完成</button>
                <button type="button" class="text-button" data-action="task-cancel" data-task-id="${task.id}">取消</button>
            </div>
        </div>
    `;
}

function renderTaskCard(task) {
    const priorityDot = task.priority === "high"
        ? '<span class="tag tag-warn">高</span>'
        : task.priority === "low"
            ? '<span class="tag tag-dim">低</span>'
            : "";
    const doneClass = task.status === "done" ? "task-done" : "";
    const dueInfo = task.due_date ? ` · 截止 ${task.due_date}` : "";
    const detailHtml = task.detail ? `<p class="item-meta">${escapeHtml(task.detail)}</p>` : "";

    let actions = "";
    if (task.status === "todo") {
        actions = `<button type="button" class="text-button" data-action="task-done" data-task-id="${task.id}">完成</button>
                   <button type="button" class="text-button" data-action="task-cancel" data-task-id="${task.id}">取消</button>`;
    } else if (task.status === "done" || task.status === "cancelled") {
        actions = `<button type="button" class="text-button" data-action="task-todo" data-task-id="${task.id}">恢复</button>`;
    }

    return `
        <div class="item-card ${doneClass}">
            <div class="item-card-body">
                <div class="item-card-tags">
                    <span class="tag tag-${task.status === 'done' ? 'ok' : task.status === 'cancelled' ? 'dim' : 'todo'}">${escapeHtml(task.status_label)}</span>
                    ${priorityDot}
                </div>
                <p class="item-card-text">${escapeHtml(task.title)}</p>
                ${detailHtml}
                <p class="item-meta">${formatDateTime(task.created_at)}${dueInfo}</p>
            </div>
            <div class="item-card-actions">${actions}</div>
        </div>
    `;
}

async function loadTasks({ reset = false } = {}) {
    if (reset) {
        state.tasks = { page: 1, totalPages: 1, items: [], total: 0, todayItems: [], overdueItems: [] };
    }
    const query = { page: state.tasks.page, page_size: RECENT_PAGE_SIZE };
    const st = elements.taskFilterStatus.value;
    if (st) query.status = st;

    try {
        const payload = await apiRequest("/tasks", { query });
        if (reset) {
            state.tasks.items = payload.tasks;
        } else {
            state.tasks.items.push(...payload.tasks);
        }
        state.tasks.page = payload.page;
        state.tasks.totalPages = payload.total_pages;
        state.tasks.total = payload.total;
        renderTaskList(state.tasks);
        updateLoadMoreButton(elements.loadMoreTasksButton, state.tasks.page, state.tasks.totalPages);
    } catch (error) {
        renderEmptyState(elements.taskList, error.message);
    }
}

function renderTaskList(data) {
    if (!data || data.items.length === 0) {
        renderEmptyState(elements.taskList, "还没有任务，在上方添加第一条吧。");
        updateLoadMoreButton(elements.loadMoreTasksButton, data.page, data.totalPages, "没有更多");
        return;
    }
    elements.taskList.innerHTML = data.items.map(t => renderTaskCard(t)).join("");
}

async function handleTaskQuickCreate(event) {
    event.preventDefault();
    const title = elements.taskQuickTitle.value.trim();
    const detail = elements.taskQuickDetail.value.trim();
    const priority = elements.taskQuickPriority.value;
    const dueDate = elements.taskQuickDueDate.value || undefined;

    if (!title) {
        setFeedback(elements.taskQuickFeedback, "任务标题不能为空。", "error");
        return;
    }

    try {
        setConnectionState("busy", "正在添加任务");
        await apiRequest("/tasks", {
            method: "POST",
            json: { title, detail: detail || undefined, priority, due_date: dueDate },
        });
        elements.taskQuickTitle.value = "";
        elements.taskQuickDetail.value = "";
        setFeedback(elements.taskQuickFeedback, "已添加。", "ok");
        await loadTasksToday();
        await loadTasks({ reset: true });
        setConnectionState("ready", "任务已添加");
    } catch (error) {
        setFeedback(elements.taskQuickFeedback, error.message, "error");
        setConnectionState("error", error.message);
    }
}

async function handleTaskDone(taskId) {
    try {
        setConnectionState("busy", "正在标记完成");
        await apiRequest(`/tasks/${taskId}/done`, { method: "POST" });
        await loadTasksToday();
        await loadTasks({ reset: true });
        setConnectionState("ready", "任务已完成");
    } catch (error) {
        showToast(error.message);
    }
}

async function handleTaskTodo(taskId) {
    try {
        await apiRequest(`/tasks/${taskId}/todo`, { method: "POST" });
        await loadTasksToday();
        await loadTasks({ reset: true });
        setConnectionState("ready", "任务已恢复");
    } catch (error) {
        showToast(error.message);
    }
}

async function handleTaskCancel(taskId) {
    try {
        await apiRequest(`/tasks/${taskId}/cancel`, { method: "POST" });
        await loadTasksToday();
        await loadTasks({ reset: true });
        setConnectionState("ready", "任务已取消");
    } catch (error) {
        showToast(error.message);
    }
}

async function loadDecisions({ reset = false } = {}) {
    if (reset) {
        state.decisions = { page: 1, totalPages: 1, items: [], total: 0 };
    }
    const query = { page: state.decisions.page, page_size: RECENT_PAGE_SIZE };
    const st = elements.decisionFilterStatus.value;
    if (st) query.status = st;

    try {
        const payload = await apiRequest("/decisions", { query });
        if (reset) {
            state.decisions.items = payload.decisions;
        } else {
            state.decisions.items.push(...payload.decisions);
        }
        state.decisions.page = payload.page;
        state.decisions.totalPages = payload.total_pages;
        state.decisions.total = payload.total;
        renderDecisionCards(state.decisions);
        updateLoadMoreButton(elements.loadMoreDecisionsButton, state.decisions.page, state.decisions.totalPages);
    } catch (error) {
        renderEmptyState(elements.decisionList, error.message);
    }
}

function renderDecisionCards(data) {
    if (!data || data.items.length === 0) {
        renderEmptyState(elements.decisionList, "还没有决策记录。");
        updateLoadMoreButton(elements.loadMoreDecisionsButton, data.page, data.totalPages, "没有更多");
        return;
    }
    elements.decisionList.innerHTML = data.items.map(d => {
        const statusTag = d.status === "reviewed"
            ? '<span class="tag tag-ok">已回顾</span>'
            : '<span class="tag tag-warn">待回顾</span>';
        const contextHtml = d.context ? `<p class="item-meta">背景：${escapeHtml(d.context)}</p>` : "";
        const reasonHtml = d.reasoning ? `<p class="item-meta">理由：${escapeHtml(d.reasoning)}</p>` : "";
        const expectedHtml = d.expected_outcome ? `<p class="item-meta">预期：${escapeHtml(d.expected_outcome)}</p>` : "";
        const outcomeHtml = d.actual_outcome
            ? `<p class="item-meta" style="color:var(--color-ok)">实际：${escapeHtml(d.actual_outcome)}</p>`
            : "";
        const reviewBtn = d.status === "pending"
            ? `<button type="button" class="text-button" data-action="review-decision" data-decision-id="${d.id}">回顾</button>`
            : "";
        return `
            <div class="item-card">
                <div class="item-card-body">
                    <div class="item-card-tags">${statusTag}</div>
                    <p class="item-card-text">${escapeHtml(d.title)}</p>
                    ${contextHtml}
                    <p class="item-card-text" style="font-weight:500">决定：${escapeHtml(d.decision)}</p>
                    ${reasonHtml}${expectedHtml}${outcomeHtml}
                    <p class="item-meta">${formatDateTime(d.created_at)}</p>
                </div>
                <div class="item-card-actions">${reviewBtn}</div>
            </div>
        `;
    }).join("");
}

async function handleDecisionQuickCreate(event) {
    event.preventDefault();
    const title = elements.decisionQuickTitle.value.trim();
    const context = elements.decisionQuickContext.value.trim();
    const decision = elements.decisionQuickDecision.value.trim();
    const reasoning = elements.decisionQuickReasoning.value.trim();
    const expected = elements.decisionQuickExpected.value.trim();

    if (!title || !decision) {
        setFeedback(elements.decisionQuickFeedback, "标题和决定不能为空。", "error");
        return;
    }
    try {
        setConnectionState("busy", "正在记录决策");
        await apiRequest("/decisions", {
            method: "POST",
            json: { title, context: context || undefined, decision, reasoning: reasoning || undefined, expected_outcome: expected || undefined },
        });
        elements.decisionQuickTitle.value = "";
        elements.decisionQuickContext.value = "";
        elements.decisionQuickDecision.value = "";
        elements.decisionQuickReasoning.value = "";
        elements.decisionQuickExpected.value = "";
        setFeedback(elements.decisionQuickFeedback, "已记录。", "ok");
        await loadDecisions({ reset: true });
        setConnectionState("ready", "决策已记录");
    } catch (error) {
        setFeedback(elements.decisionQuickFeedback, error.message, "error");
    }
}

async function handleReviewDecision(decisionId) {
    const outcome = prompt("实际结果是什么？");
    if (!outcome) return;
    try {
        setConnectionState("busy", "正在回顾决策");
        await apiRequest(`/decisions/${decisionId}/review`, {
            method: "POST",
            json: { actual_outcome: outcome },
        });
        await loadDecisions({ reset: true });
        setConnectionState("ready", "决策已回顾");
    } catch (error) {
        showToast(error.message);
    }
}

async function loadAiReview() {
    try {
        const summaryPayload = await apiRequest("/artifacts/summary");
        const latest = summaryPayload.latest || {};
        const dailyReview = latest.review?.daily;
        if (!dailyReview || !dailyReview.path) {
            elements.overviewAiReview.innerHTML = '<p class="item-meta">暂无 AI 回顾，等待今晚自动生成。</p>';
            return;
        }
        const path = dailyReview.path;
        const filePayload = await apiRequest(`/artifacts/file/${encodeURIComponent(path)}`, { responseType: "text" });
        const text = typeof filePayload === "string" ? filePayload : "";
        const aiIdx = text.indexOf("## AI 分析");
        if (aiIdx === -1) {
            elements.overviewAiReview.innerHTML = '<p class="item-meta">回顾尚未包含 AI 分析。</p>';
            return;
        }
        let aiText = text.slice(aiIdx + 8).trim();
        const nextHeader = aiText.search(/\n## /);
        if (nextHeader !== -1) aiText = aiText.slice(0, nextHeader);
        elements.overviewAiReview.innerHTML = `<p class="item-meta" style="white-space:pre-wrap">${escapeHtml(aiText.trim())}</p>`;
    } catch (e) {
        elements.overviewAiReview.innerHTML = '<p class="item-meta">暂无 AI 回顾。</p>';
    }
}

async function loadAlerts() {
    try {
        const payload = await apiRequest("/alerts");
        const alerts = payload.alerts || [];
        const container = document.getElementById("overview-alerts");
        if (!container) return;
        if (alerts.length === 0) {
            container.innerHTML = "";
            return;
        }
        const kindColors = { no_records: "var(--bloom-amber)", overdue_tasks: "var(--error)", stale_memories: "var(--warn)", pending_decisions: "var(--bloom-blue)", empty: "var(--bloom-cyan)" };
        container.innerHTML = alerts.map(a => `
            <div class="alert-item" style="border-left:3px solid ${kindColors[a.kind] || 'var(--ink-dim)'};padding:6px 10px;margin:4px 0;background:var(--glass);border-radius:0 var(--radius-sm) var(--radius-sm) 0">
                <p class="item-meta" style="margin:0">${escapeHtml(a.message)}</p>
            </div>
        `).join("");
    } catch (e) { /* noop */ }
}

async function loadSuggestions() {
    try {
        const payload = await apiRequest("/suggestions");
        const text = payload.suggestions || "";
        if (!text) {
            renderEmptyState(elements.overviewSuggestions, "暂无建议。");
            return;
        }
        const lines = text.split("\n").filter(l => l.trim().startsWith("-"));
        if (lines.length === 0) {
            elements.overviewSuggestions.innerHTML = `<p class="item-meta">${escapeHtml(text)}</p>`;
        } else {
            elements.overviewSuggestions.innerHTML = lines.map(l => {
                const clean = l.trim().replace(/^-\s*/, "");
                return `<div class="suggestion-row" style="display:flex;align-items:center;gap:var(--space-sm);margin:2px 0">
                    <span class="item-meta" style="flex:1">→ ${escapeHtml(clean)}</span>
                    <button type="button" class="text-button" data-action="suggestion-to-task" data-title="${escapeHtml(clean)}">＋任务</button>
                </div>`;
            }).join("");
        }
    } catch (error) {
        renderEmptyState(elements.overviewSuggestions, error.message);
    }
}

function renderMarkdown(text) {
    return escapeHtml(text)
        .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
}

function renderChatMessage(role, content) {
    const div = document.createElement("div");
    div.className = `chat-msg ${role}`;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
    div.innerHTML = `${role === "axi" ? renderMarkdown(content) : escapeHtml(content)}<div class="msg-time">${time}</div>`;
    elements.chatMessages.appendChild(div);
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    return div;
}

async function handleChatSubmit(event) {
    event.preventDefault();
    const message = elements.chatInput.value.trim();
    if (!message) return;

    elements.chatInput.value = "";
    elements.chatInput.disabled = true;
    renderChatMessage("user", message);
    chatHistory.push({ role: "user", content: message });

    setConnectionState("busy", "Axi 正在输入...");

    try {
        requireKey();
        const response = await fetch(buildApiUrl("/chat/stream"), {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-Axiom-Key": state.key },
            body: JSON.stringify({ message, history: chatHistory.slice(0, -1) }),
        });

        if (!response.ok) throw new Error(await parseErrorMessage(response));

        const msgDiv = document.createElement("div");
        msgDiv.className = "chat-msg axi";
        const now = new Date();
        const time = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
        msgDiv.innerHTML = `<span class="streaming-cursor">▊</span><div class="msg-time">${time}</div>`;
        elements.chatMessages.appendChild(msgDiv);
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;

        let fullText = "";
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";
            for (const line of lines) {
                if (line.startsWith("data: ")) {
                    const data = line.slice(6);
                    if (data === "[DONE]") continue;
                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.error) { fullText = `错误: ${parsed.error}`; break; }
                        if (parsed.content) {
                            fullText += parsed.content;
                            msgDiv.innerHTML = `${renderMarkdown(fullText)}<div class="msg-time">${time}</div>`;
                            elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
                        }
                    } catch (e) { /* skip malformed */ }
                }
            }
        }

        if (!fullText) fullText = "让我想想...";
        chatHistory.push({ role: "assistant", content: fullText });
        setConnectionState("ready", "Axi 已回复");
    } catch (error) {
        setFeedback(elements.chatFeedback, error.message, "error");
        setConnectionState("error", error.message);
    } finally {
        elements.chatInput.disabled = false;
        elements.chatInput.focus();
    }
}

// Initial greeting
function showChatGreeting() {
    if (chatHistory.length > 0) return;
    renderChatMessage("axi", "你好，我是 Axi。我了解你的 Axiom 数据，可以帮你回顾、分析、给建议。试试问我：\"今天该做什么？\" 或 \"最近状态怎么样？\"");
}

async function syncDashboard({ showMessage = false } = {}) {
    try {
        requireKey();
        setConnectionState("busy", "正在同步总览、最近记录和自动化产物");
        await loadOverview();
        await loadProcessingQueue();
        await loadRecentPage({ reset: true });
        await loadAutomationJobs();
        await loadAutomationRuns({ reset: true });
        await loadArtifactPanels({ reset: true });
        await loadMemories({ reset: true });
        try { const ms = await apiRequest("/memories/stats"); renderMemoryStats(ms); } catch (e) { /* noop */ }
        await loadTasksToday();
        await loadTasks({ reset: true });
        await loadDecisions({ reset: true });
        await loadAlerts();
        await loadSuggestions();
        await loadAiReview();
        if (state.search.active) {
            await loadSearchPage({ reset: true });
        } else {
            renderEmptyState(elements.searchResults, "输入关键词后再开始搜索。");
            updateLoadMoreButton(elements.loadMoreSearchButton, 1, 1, "还没有结果");
        }
        setConnectionState("ready", `上次同步：${formatDateTime(new Date().toISOString())}`);
        if (showMessage) {
            showToast("同步完成");
        }
    } catch (error) {
        setConnectionState("error", error.message);
        showToast(error.message);
    }

    for (const [, modDef] of registeredModules) {
        if (modDef.onSync) {
            try { await modDef.onSync(); } catch (e) { console.warn(modDef.name, e); }
        }
    }
}

async function handleUrlFetchSubmit(event) {
    event.preventDefault();
    const url = elements.urlFetchInput.value.trim();
    if (!url) {
        setFeedback(elements.urlFetchFeedback, "请输入链接。", "error");
        return;
    }
    try {
        setConnectionState("busy", "正在抓取链接内容...");
        setFeedback(elements.urlFetchFeedback, "抓取中，请稍候...", "muted");
        const payload = await apiRequest("/fetch", { method: "POST", json: { url } });
        elements.urlFetchInput.value = "";
        const title = payload.item?.original_name || url;
        const summary = payload.summary ? `\nAI 摘要：${payload.summary}` : "";
        setFeedback(elements.urlFetchFeedback, `已保存：${title}${summary}`, "ok");
        setConnectionState("ready", "链接已抓取");
        void syncDashboard({ showMessage: false });
    } catch (error) {
        setFeedback(elements.urlFetchFeedback, error.message, "error");
        setConnectionState("error", error.message);
    }
}

async function handleTextCaptureSubmit(event) {
    event.preventDefault();
    const text = elements.textInput.value.trim();
    const sourceInput = document.getElementById("text-source-input");
    const source = sourceInput.value.trim() || "web_app";

    if (!text) {
        setFeedback(elements.captureFeedback, "文本内容不能为空。", "error");
        return;
    }

    try {
        setConnectionState("busy", "正在写入文本");
        const payload = await apiRequest("/add", {
            method: "POST",
            json: {
                text,
                source,
            },
        });
        elements.textInput.value = "";
        setFeedback(
            elements.captureFeedback,
            `文本已写入 inbox，item #${payload.item.id}`,
            "ok",
        );
        showToast("文本已写入 Axiom");
        await syncDashboard();
    } catch (error) {
        setConnectionState("error", error.message);
        setFeedback(elements.captureFeedback, error.message, "error");
        showToast(error.message);
    }
}

async function handleFileCaptureSubmit(event) {
    event.preventDefault();
    const file = elements.fileInput.files?.[0];
    const sourceInput = document.getElementById("file-source-input");
    const noteInput = document.getElementById("file-note-input");
    const transcriptInput = document.getElementById("file-transcript-input");
    const transcriptFileInput = document.getElementById("file-transcript-file-input");
    const transcriptFile = transcriptFileInput?.files?.[0];

    if (!file) {
        setFeedback(elements.captureFeedback, "请先选择文件。", "error");
        return;
    }

    try {
        const formData = new FormData();
        formData.set("file", file);
        formData.set("source", sourceInput.value.trim() || "web_app");
        formData.set("content", noteInput.value.trim());
        formData.set("transcript_text", transcriptInput.value.trim());
        if (transcriptFile) {
            formData.set("transcript_file", transcriptFile);
        }

        setConnectionState("busy", "正在上传文件");
        const payload = await apiRequest("/upload", {
            method: "POST",
            formData,
        });

        elements.fileCaptureForm.reset();
        sourceInput.value = "web_app";
        const typeLabel = payload.item?.type_label || formatType(payload.item?.type);
        setFeedback(
            elements.captureFeedback,
            `${typeLabel}已写入 inbox，item #${payload.item.id}`,
            "ok",
        );
        showToast(`${typeLabel}已上传`);
        await syncDashboard();
    } catch (error) {
        setConnectionState("error", error.message);
        setFeedback(elements.captureFeedback, error.message, "error");
        showToast(error.message);
    }
}

async function handleStorageToggle(itemId, { reopenViewer = false } = {}) {
    let item = findItemById(itemId);
    if (!item) {
        try {
            item = await fetchItemDetail(itemId);
        } catch (error) {
            showToast(error.message);
            return;
        }
    }

    const endpoint = item.storage === "archive" ? `/restore/${item.id}` : `/archive/${item.id}`;
    const actionLabel = item.storage === "archive" ? "恢复" : "归档";

    try {
        setConnectionState("busy", `正在${actionLabel}`);
        const payload = await apiRequest(endpoint, { method: "POST" });
        updateKnownItem(payload.item);
        showToast(`${actionLabel}完成`);
        await syncDashboard();
        if (reopenViewer) {
            await openItemViewer(itemId);
        }
    } catch (error) {
        setConnectionState("error", error.message);
        showToast(error.message);
    }
}

async function handleItemView(itemId) {
    try {
        await openItemViewer(itemId);
    } catch (error) {
        showToast(error.message);
    }
}

async function handleItemEdit(itemId) {
    try {
        await openItemEditor(itemId);
    } catch (error) {
        showToast(error.message);
    }
}

async function handleProcessingOverride(
    itemId,
    processingOverride,
    { reopenEditor = false, openNextSameType = false } = {},
) {
    try {
        setConnectionState("busy", processingOverride ? "正在标记已处理" : "正在恢复待处理");
        const payload = await apiRequest(`/item/${itemId}/update`, {
            method: "POST",
            json: {
                processing_override: processingOverride || "",
            },
        });
        updateKnownItem(payload.item);
        await syncDashboard();
        if (processingOverride === "ready" && openNextSameType) {
            const nextItem = await fetchNextPendingItem(payload.item?.type || "", itemId);
            if (nextItem) {
                if (reopenEditor) {
                    await openItemEditor(nextItem.id);
                } else {
                    await openItemViewer(nextItem.id);
                }
                showToast("已标记完成，并打开同类下一条待处理");
                return;
            }
            if (reopenEditor) {
                await openItemEditor(itemId);
            } else {
                await openItemViewer(itemId);
            }
            showToast("已标记完成，同类待处理已清空");
            return;
        }
        if (reopenEditor) {
            await openItemEditor(itemId);
        } else {
            await openItemViewer(itemId);
        }
        showToast(processingOverride ? "已标记为处理完成" : "已恢复为待处理");
    } catch (error) {
        setConnectionState("error", error.message);
        showToast(error.message);
    }
}

async function handleProcessingBatchReady(itemIds, itemType = "") {
    if (!itemIds.length) {
        showToast("褰撳墠娌℃湁鍙壒閲忓鐞嗙殑璁板綍");
        return;
    }

    try {
        const typeLabel = itemType ? formatType(itemType) : "璁板綍";
        setConnectionState("busy", `姝ｅ湪鎵归噺鏍囪${typeLabel}`);
        const payload = await apiRequest("/processing/mark-ready", {
            method: "POST",
            json: {
                ids: itemIds,
            },
        });
        payload.items?.forEach((item) => updateKnownItem(item));
        await syncDashboard();
        showToast(`宸叉壒閲忔爣璁?${payload.count || itemIds.length} 鏉?${typeLabel}涓哄凡澶勭悊`);
    } catch (error) {
        setConnectionState("error", error.message);
        showToast(error.message);
    }
}

async function handleProcessingBatchPending(itemIds, itemType = "") {
    if (!itemIds.length) {
        showToast("当前没有可恢复为待处理的记录");
        return;
    }

    try {
        const typeLabel = itemType ? formatType(itemType) : "当前列表";
        setConnectionState("busy", `正在恢复待处理：${typeLabel}`);
        const payload = await apiRequest("/processing/mark-pending", {
            method: "POST",
            json: {
                ids: itemIds,
            },
        });
        payload.items?.forEach((item) => updateKnownItem(item));
        await syncDashboard();
        showToast(`已恢复 ${payload.count || itemIds.length} 条${typeLabel}为待处理`);
    } catch (error) {
        setConnectionState("error", error.message);
        showToast(error.message);
    }
}

function renderRecentBatchActions(items) {
    if (!elements.recentBatchActions) {
        return;
    }

    const filters = readRecentFilters();
    const itemIds = buildItemIdsValue(items);
    if (!itemIds) {
        elements.recentBatchActions.innerHTML = "";
        return;
    }

    const typeLabel = filters.type ? formatType(filters.type) : "当前列表";
    if (filters.processing_state === "pending") {
        elements.recentBatchActions.innerHTML = `
            <button
                class="secondary-button"
                type="button"
                data-action="mark-processing-batch-ready"
                data-item-ids="${escapeHtml(itemIds)}"
                data-item-type="${escapeHtml(filters.type || "")}"
            >
                批量标记${escapeHtml(typeLabel)}为已处理
            </button>
        `;
        return;
    }

    if (filters.processing_override === "ready") {
        elements.recentBatchActions.innerHTML = `
            <button
                class="secondary-button"
                type="button"
                data-action="mark-processing-batch-pending"
                data-item-ids="${escapeHtml(itemIds)}"
                data-item-type="${escapeHtml(filters.type || "")}"
            >
                批量恢复${escapeHtml(typeLabel)}为待处理
            </button>
        `;
        return;
    }

    elements.recentBatchActions.innerHTML = "";
}

function renderSearchBatchActions(items) {
    if (!elements.searchBatchActions) {
        return;
    }

    const filters = readSearchFilters();
    const itemIds = buildItemIdsValue(items);
    if (!itemIds) {
        elements.searchBatchActions.innerHTML = "";
        return;
    }

    if (filters.processing_state === "pending") {
        const typeLabel = filters.type ? formatType(filters.type) : "当前搜索结果";
        elements.searchBatchActions.innerHTML = `
            <button
                class="secondary-button"
                type="button"
                data-action="mark-processing-batch-ready"
                data-item-ids="${escapeHtml(itemIds)}"
                data-item-type="${escapeHtml(filters.type || "")}"
            >
                批量标记${escapeHtml(typeLabel)}为已处理
            </button>
        `;
        return;
    }

    if (filters.processing_override === "ready") {
        const typeLabel = filters.type ? formatType(filters.type) : "当前搜索结果";
        elements.searchBatchActions.innerHTML = `
            <button
                class="secondary-button"
                type="button"
                data-action="mark-processing-batch-pending"
                data-item-ids="${escapeHtml(itemIds)}"
                data-item-type="${escapeHtml(filters.type || "")}"
            >
                批量恢复${escapeHtml(typeLabel)}为待处理
            </button>
        `;
        return;
    }

    elements.searchBatchActions.innerHTML = "";
}

async function handleItemEditSubmit(form, { openNext = false } = {}) {
    const itemId = form.dataset.itemId;
    const itemType = form.dataset.itemType;
    const formData = new FormData(form);
    const content = String(formData.get("content") || "");
    const source = String(formData.get("source") || "");
    const derivedText = String(formData.get("derived_text") || "");
    const transcriptText = String(formData.get("transcript_text") || "");
    const feedback = form.querySelector("[data-edit-feedback]");
    const submitButton = elements.viewerActions.querySelector(
        openNext ? "[data-action='save-item-edit-next']" : "[data-action='save-item-edit']",
    );

    if (itemType === "text" && !content.trim()) {
        setFeedback(feedback, "文本内容不能为空。", "error");
        return;
    }
    if (!source.trim()) {
        setFeedback(feedback, "来源不能为空。", "error");
        return;
    }

    try {
        setFeedback(feedback, "", "muted");
        setButtonDisabled(submitButton, true, openNext ? "保存并继续中..." : "保存中...");
        setConnectionState("busy", "正在保存修改");
        const payload = await apiRequest(`/item/${itemId}/update`, {
            method: "POST",
            json: {
                content,
                source,
                derived_text: itemType === "document" ? derivedText : undefined,
                transcript_text: itemType === "audio" ? transcriptText : undefined,
            },
        });
        updateKnownItem(payload.item);
        await syncDashboard();
        if (openNext) {
            const nextItem = await fetchNextPendingItem(itemType, itemId);
            if (nextItem) {
                await openItemEditor(nextItem.id);
                showToast(payload.message === "unchanged" ? "已跳到同类下一条待处理" : "已保存，并打开同类下一条");
            } else if (payload.item?.processing_state === "pending") {
                await openItemEditor(itemId);
                showToast(
                    payload.message === "unchanged"
                        ? "当前这条仍待处理，且没有其他同类待处理记录"
                        : "已保存，但当前这条仍待处理；没有其他同类待处理记录",
                );
            } else {
                await openItemViewer(itemId);
                showToast(payload.message === "unchanged" ? "没有检测到变化，同类待处理已清空" : "已保存，同类待处理已清空");
            }
        } else {
            await openItemViewer(itemId);
            showToast(payload.message === "unchanged" ? "没有检测到变化" : "修改已保存");
        }
    } catch (error) {
        setConnectionState("error", error.message);
        setFeedback(feedback, error.message, "error");
        showToast(error.message);
    } finally {
        setButtonDisabled(submitButton, false);
    }
}

async function handleAutomationRun(jobId, button, options = {}) {
    const runDate = options.runDate || elements.automationDateInput.value.trim();
    const job = state.automation.jobs.find((entry) => entry.id === jobId);

    if (job && !job.ready) {
        setFeedback(elements.automationFeedback, job.availability_note || "当前任务暂不可用。", "error");
        showToast(job.availability_note || "当前任务暂不可用。");
        return;
    }

    try {
        setFeedback(elements.automationFeedback, "", "muted");
        setButtonDisabled(button, true, "生成中...");
        setConnectionState("busy", "正在执行自动化任务");
        const payload = await apiRequest("/automation/run", {
            method: "POST",
            json: {
                job: jobId,
                date: runDate || undefined,
            },
        });
        await loadOverview();
        await loadAutomationRuns({ reset: true });
        await loadArtifactPanels({ reset: true });
        setConnectionState("ready", elements.lastSyncIndicator.textContent);
        setFeedback(
            elements.automationFeedback,
            `${payload.job.label} 已完成，日期：${payload.date}`,
            "ok",
        );
        showToast(`${payload.job.label} 已生成`);
        if (payload.artifact?.relative_path) {
            await openArtifactViewer(payload.artifact.relative_path);
        }
    } catch (error) {
        try {
            await loadAutomationRuns({ reset: true });
        } catch (historyError) {
            console.warn("load automation runs failed", historyError);
        }
        setConnectionState("error", error.message);
        setFeedback(elements.automationFeedback, error.message, "error");
        showToast(error.message);
    } finally {
        setButtonDisabled(button, false);
    }
}

async function handleAutomationRunRerun(runId, button) {
    const run = findAutomationRunById(runId);
    if (!run) {
        showToast("当前运行记录未加载，请先刷新运行记录");
        return;
    }
    if (!run.manual_enabled) {
        showToast("这个任务只支持定时执行，不能在 Web 里手动重跑");
        return;
    }

    elements.automationDateInput.value = run.run_date;
    await handleAutomationRun(run.job_id, button, { runDate: run.run_date });
}

function bindDelegatedActions() {
    document.body.addEventListener("click", async (event) => {
        const target = event.target.closest("[data-action]");
        if (!target) {
            return;
        }

        const action = target.getAttribute("data-action");
        if (action === "toggle-storage") {
            await handleStorageToggle(target.getAttribute("data-item-id"));
        } else if (action === "apply-overview-filter") {
            await applyOverviewQuickFilter(
                target.getAttribute("data-filter-kind") || "all",
                target.getAttribute("data-filter-value") || "",
            );
        } else if (action === "apply-processing-backlog-filter") {
            await applyProcessingBacklogFilter(
                target.getAttribute("data-item-type"),
                target.getAttribute("data-processing-state") || "pending",
            );
        } else if (action === "mark-processing-batch-ready") {
            await handleProcessingBatchReady(
                parseItemIdsValue(target.getAttribute("data-item-ids")),
                target.getAttribute("data-item-type") || "",
            );
        } else if (action === "mark-processing-batch-pending") {
            await handleProcessingBatchPending(
                parseItemIdsValue(target.getAttribute("data-item-ids")),
                target.getAttribute("data-item-type") || "",
            );
        } else if (action === "view-item") {
            await handleItemView(target.getAttribute("data-item-id"));
        } else if (action === "edit-item") {
            await handleItemEdit(target.getAttribute("data-item-id"));
        } else if (action === "save-item-edit") {
            const form = elements.viewerContent.querySelector("[data-role='item-edit-form']");
            if (!form) {
                showToast("当前没有可保存的编辑表单");
                return;
            }
            await handleItemEditSubmit(form);
        } else if (action === "save-item-edit-next") {
            const form = elements.viewerContent.querySelector("[data-role='item-edit-form']");
            if (!form) {
                showToast("当前没有可保存的编辑表单");
                return;
            }
            await handleItemEditSubmit(form, { openNext: true });
        } else if (action === "mark-processing-ready") {
            const reopenEditor = state.viewerContext?.kind === "item-edit";
            await handleProcessingOverride(target.getAttribute("data-item-id"), "ready", { reopenEditor });
        } else if (action === "mark-processing-ready-next") {
            const reopenEditor = state.viewerContext?.kind === "item-edit";
            await handleProcessingOverride(target.getAttribute("data-item-id"), "ready", {
                reopenEditor,
                openNextSameType: true,
            });
        } else if (action === "open-next-pending-item") {
            await handleOpenNextPendingItem(
                target.getAttribute("data-item-id"),
                target.getAttribute("data-item-type") || "",
            );
        } else if (action === "open-next-pending-item-edit") {
            await handleOpenNextPendingItem(
                target.getAttribute("data-item-id"),
                target.getAttribute("data-item-type") || "",
                { edit: true },
            );
        } else if (action === "clear-processing-override") {
            const reopenEditor = state.viewerContext?.kind === "item-edit";
            await handleProcessingOverride(target.getAttribute("data-item-id"), "", { reopenEditor });
        } else if (action === "viewer-toggle-storage") {
            await handleStorageToggle(target.getAttribute("data-item-id"), { reopenViewer: true });
        } else if (action === "download-item-file") {
            const item = await fetchItemDetail(target.getAttribute("data-item-id"));
            if (!item.file_url) {
                showToast("当前记录没有可下载文件");
                return;
            }
            await downloadProtectedFile(
                item.file_url,
                target.getAttribute("data-download-name") || `item-${item.id}`,
            );
            showToast("文件下载已开始");
        } else if (action === "download-artifact-file") {
            await downloadProtectedFile(
                buildArtifactFilePath(target.getAttribute("data-artifact-path")),
                target.getAttribute("data-artifact-name") || "artifact.md",
            );
            showToast("Markdown 下载已开始");
        } else if (action === "view-artifact") {
            await openArtifactViewer(target.getAttribute("data-artifact-path"));
        } else if (action === "view-automation-run") {
            await openAutomationRunViewer(target.getAttribute("data-run-id"));
        } else if (action === "rerun-automation-run") {
            await handleAutomationRunRerun(target.getAttribute("data-run-id"), target);
        } else if (action === "run-automation-job") {
            await handleAutomationRun(target.getAttribute("data-job-id"), target);
        } else if (action === "confirm-memory") {
            await handleConfirmMemory(target.getAttribute("data-memory-id"));
        } else if (action === "archive-memory") {
            await handleArchiveMemory(target.getAttribute("data-memory-id"));
        } else if (action === "delete-memory") {
            await handleDeleteMemory(target.getAttribute("data-memory-id"));
        } else if (action === "review-decision") {
            await handleReviewDecision(target.getAttribute("data-decision-id"));
        } else if (action === "suggestion-to-task") {
            const title = target.getAttribute("data-title");
            try {
                setConnectionState("busy", "正在从建议创建任务");
                await apiRequest("/tasks", { method: "POST", json: { title, priority: "medium" } });
                await loadTasksToday();
                await loadTasks({ reset: true });
                target.disabled = true;
                target.textContent = "已添加";
                setConnectionState("ready", "任务已创建");
            } catch (e) { showToast(e.message); }
        } else if (action === "task-done") {
            await handleTaskDone(target.getAttribute("data-task-id"));
        } else if (action === "task-todo") {
            await handleTaskTodo(target.getAttribute("data-task-id"));
        } else if (action === "task-reschedule") {
            const tid = target.getAttribute("data-task-id");
            try {
                await apiRequest(`/tasks/${tid}/reschedule`, { method: "POST", json: {} });
                await loadTasksToday();
                await loadTasks({ reset: true });
                showToast("任务已重新安排到今天");
            } catch (e) { showToast(e.message); }
        } else if (action === "task-cancel") {
            await handleTaskCancel(target.getAttribute("data-task-id"));
        } else if (action === "delete-item") {
            const itemId = target.getAttribute("data-item-id");
            if (!confirm(`确定要删除条目 #${itemId} 吗？删除后无法恢复。`)) return;
            try {
                setConnectionState("busy", "正在删除条目");
                await apiRequest(`/item/${itemId}`, { method: "DELETE" });
                closeViewer();
                await syncDashboard({ showMessage: false });
                setConnectionState("ready", "条目已删除");
                showToast(`条目 #${itemId} 已删除`);
            } catch (error) {
                showToast(error.message);
                setConnectionState("error", error.message);
            }
        }
    });

    document.body.addEventListener("submit", async (event) => {
        const form = event.target.closest("[data-role='item-edit-form']");
        if (!form) {
            return;
        }
        event.preventDefault();
        await handleItemEditSubmit(form);
    });
}

const PANEL_GROUPS = {
    "capture-panel": ["setup-panel", "capture-panel"],
    "overview-panel": ["overview-panel"],
    "tasks-panel": ["tasks-panel"],
    "memories-panel": ["memories-panel"],
    "archive-panel": ["search-panel", "recent-panel", "decisions-panel", "artifacts-panel", "processing-panel"],
    "chat-panel": ["chat-panel"],
};

// Module panels are injected outside .layout, need separate handling
function getModulePanelIds() {
    const container = document.getElementById("module-panels");
    if (!container) return [];
    return Array.from(container.querySelectorAll(".panel")).map(p => p.id);
}

function bindSidebarTabs() {
    const sidebar = document.getElementById("desktop-sidebar");
    if (!sidebar) return;
    sidebar.querySelectorAll("button[data-panel]").forEach(btn => {
        btn.addEventListener("click", () => {
            const panelId = btn.getAttribute("data-panel");
            const group = PANEL_GROUPS[panelId] || [panelId];
            // Desktop: show only panels in the group
            document.querySelectorAll(".layout > .panel").forEach(p => {
                p.classList.toggle("active", group.includes(p.id));
            });
            // Module panels: show if the panelId matches a module
            const moduleIds = getModulePanelIds();
            const moduleContainer = document.getElementById("module-panels");
            if (moduleContainer) {
                moduleContainer.querySelectorAll(".panel").forEach(p => {
                    p.classList.toggle("active", p.id === panelId || group.includes(p.id));
                });
            }
            // Mobile: scroll to the first panel in group
            if (window.innerWidth < 768) {
                const target = document.getElementById(group[0]);
                if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            // Update sidebar active state
            sidebar.querySelectorAll("button[data-panel]").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            if (panelId === "chat-panel") showChatGreeting();
        });
    });
}

function bindScrollButtons() {
    document.querySelectorAll("[data-scroll-target]").forEach((button) => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-scroll-target");
            const target = document.getElementById(targetId);
            target?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
}

function bindForms() {
    elements.keyForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const key = elements.keyInput.value.trim();
        if (!key) {
            setFeedback(elements.keyFeedback, "请输入 key。", "error");
            return;
        }
        saveKey(key);
        setFeedback(elements.keyFeedback, "key 已保存在当前浏览器。", "ok");
        await syncDashboard({ showMessage: true });
    });

    elements.exportDataButton.addEventListener("click", async () => {
        try {
            setConnectionState("busy", "正在导出数据");
            const blob = await apiRequest("/export", { method: "POST", responseType: "blob" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `axiom_export_${new Date().toISOString().slice(0, 10)}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setConnectionState("ready", "数据已导出");
            showToast("导出完成");
        } catch (error) {
            setConnectionState("error", error.message);
            showToast(error.message);
        }
    });

    elements.clearKeyButton.addEventListener("click", () => {
        saveKey("");
        elements.keyInput.value = "";
        elements.connectionBar.classList.remove("visible");
        state.recent = { page: 1, totalPages: 1, items: [], total: 0 };
        state.search = { page: 1, totalPages: 1, items: [], active: false, total: 0 };
        state.artifacts = { page: 1, totalPages: 1, items: [] };
        state.automation = { jobs: [], historyJobs: [], jobsLoaded: false, runs: [], runsPage: 1, runsTotalPages: 1, runsTotal: 0 };
        state.memories = { page: 1, totalPages: 1, items: [], total: 0 };
        state.tasks = { page: 1, totalPages: 1, items: [], total: 0, todayItems: [], overdueItems: [] };
        state.decisions = { page: 1, totalPages: 1, items: [], total: 0 };
        elements.memoryStats.innerHTML = "";
        elements.automationDateInput.value = "";
        elements.automationRunsFilterForm.reset();
        renderAutomationRunJobOptions([]);
        setFeedback(elements.keyFeedback, "本地 key 已清除。", "ok");
        setFeedback(elements.recentFeedback, "", "muted");
        setFeedback(elements.searchFeedback, "", "muted");
        setFeedback(elements.automationFeedback, "", "muted");
        setFeedback(elements.automationRunsFeedback, "", "muted");
        setConnectionState("idle", "尚未同步");
        elements.overviewGeneratedAt.textContent = "";
        elements.overviewBacklogTotal.textContent = "待处理 0 条";
        elements.processingQueueTotal.textContent = "待处理 0 条";
        elements.processingQueueNextLabel.textContent = "保存 key 后即可查看下一条待处理记录。";
        closeViewer();
        renderEmptyState(elements.overviewStats, "保存 key 后即可读取总览。");
        renderEmptyState(elements.overviewRecentHighlights, "保存 key 后即可查看最近记录。");
        renderEmptyState(elements.overviewProcessingBacklog, "保存 key 后即可查看待处理队列。");
        renderEmptyState(elements.overviewArtifactHighlights, "保存 key 后即可查看自动化产物。");
        renderEmptyState(elements.processingWorkbench, "保存 key 后即可查看处理工作台。");
        renderEmptyState(elements.recentList, "保存 key 后即可读取最近记录。");
        renderEmptyState(elements.searchResults, "输入关键词后再开始搜索。");
        renderEmptyState(elements.automationJobs, "保存 key 后即可读取可执行任务。");
        renderEmptyState(elements.automationRuns, "还没有自动化运行记录。");
        renderEmptyState(elements.artifactSummaryCards, "保存 key 后即可读取自动化摘要。");
        renderEmptyState(elements.artifactList, "保存 key 后即可读取自动化产物。");
        renderEmptyState(elements.memoryList, "保存 key 后即可读取记忆。");
        renderEmptyState(elements.tasksTodayList, "保存 key 后即可读取今日任务。");
        renderEmptyState(elements.taskList, "保存 key 后即可读取全部任务。");
        updateLoadMoreButton(elements.loadMoreRecentButton, 1, 1);
        updateLoadMoreButton(elements.loadMoreSearchButton, 1, 1, "还没有结果");
        updateLoadMoreButton(elements.loadMoreAutomationRunsButton, 1, 1);
        updateLoadMoreButton(elements.loadMoreArtifactsButton, 1, 1);
        updateLoadMoreButton(elements.loadMoreMemoriesButton, 1, 1);
        updateLoadMoreButton(elements.loadMoreTasksButton, 1, 1);
        showToast("已清除本地 key");
    });

    elements.syncNowButton.addEventListener("click", async () => {
        await syncDashboard({ showMessage: true });
    });

    elements.textCaptureForm.addEventListener("submit", handleTextCaptureSubmit);
    elements.fileCaptureForm.addEventListener("submit", handleFileCaptureSubmit);
    elements.urlFetchForm.addEventListener("submit", handleUrlFetchSubmit);
    elements.automationRunForm.addEventListener("submit", (event) => {
        event.preventDefault();
    });

    elements.refreshAutomationRunsButton.addEventListener("click", async () => {
        try {
            setConnectionState("busy", "正在刷新自动化运行记录");
            await loadAutomationRuns({ reset: true });
            setConnectionState("ready", elements.lastSyncIndicator.textContent);
            showToast("运行记录已刷新");
        } catch (error) {
            setConnectionState("error", error.message);
            showToast(error.message);
        }
    });

    elements.loadMoreAutomationRunsButton.addEventListener("click", async () => {
        try {
            await loadAutomationRuns();
        } catch (error) {
            showToast(error.message);
        }
    });

    elements.automationRunsFilterForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        try {
            setConnectionState("busy", "正在筛选自动化运行记录");
            await loadAutomationRuns({ reset: true });
            setConnectionState("ready", elements.lastSyncIndicator.textContent);
        } catch (error) {
            setConnectionState("error", error.message);
            setFeedback(elements.automationRunsFeedback, error.message, "error");
            showToast(error.message);
        }
    });

    elements.resetAutomationRunsFiltersButton.addEventListener("click", async () => {
        elements.automationRunsFilterForm.reset();
        try {
            setConnectionState("busy", "正在重置自动化运行筛选");
            await loadAutomationRuns({ reset: true });
            setConnectionState("ready", elements.lastSyncIndicator.textContent);
        } catch (error) {
            setConnectionState("error", error.message);
            setFeedback(elements.automationRunsFeedback, error.message, "error");
            showToast(error.message);
        }
    });

    elements.refreshSuggestionsButton.addEventListener("click", async () => {
        try {
            setConnectionState("busy", "正在获取AI建议");
            await loadSuggestions();
            setConnectionState("ready", suggestions.refreshed);
        } catch (e) { showToast(e.message); }
    });

    elements.refreshSuggestionsButton.addEventListener("click", async () => {
        try {
            setConnectionState("busy", "正在获取AI建议");
            await loadSuggestions();
            setConnectionState("ready", "建议已刷新");
        } catch (e) { showToast(e.message); }
    });

    elements.refreshOverviewButton.addEventListener("click", async () => {
        try {
            setConnectionState("busy", "正在刷新总览");
            await loadOverview();
            setConnectionState("ready", elements.lastSyncIndicator.textContent);
            showToast("总览已刷新");
        } catch (error) {
            setConnectionState("error", error.message);
            showToast(error.message);
        }
    });

    elements.refreshProcessingButton.addEventListener("click", async () => {
        try {
            setConnectionState("busy", "正在刷新处理工作台");
            await loadProcessingQueue();
            setConnectionState("ready", elements.lastSyncIndicator.textContent);
            showToast("处理工作台已刷新");
        } catch (error) {
            setConnectionState("error", error.message);
            showToast(error.message);
        }
    });

    elements.refreshRecentButton.addEventListener("click", async () => {
        try {
            setConnectionState("busy", "正在刷新最近记录");
            await loadRecentPage({ reset: true });
            setConnectionState("ready", elements.lastSyncIndicator.textContent);
            showToast("最近记录已刷新");
        } catch (error) {
            setConnectionState("error", error.message);
            showToast(error.message);
        }
    });

    elements.recentFilterForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        try {
            setConnectionState("busy", "正在刷新记录浏览");
            await loadRecentPage({ reset: true });
            setConnectionState("ready", elements.lastSyncIndicator.textContent);
        } catch (error) {
            setConnectionState("error", error.message);
            setFeedback(elements.recentFeedback, error.message, "error");
            showToast(error.message);
        }
    });

    elements.resetRecentFiltersButton.addEventListener("click", async () => {
        elements.recentFilterForm.reset();
        document.getElementById("recent-sort-input").value = "newest";
        try {
            setConnectionState("busy", "正在重置记录筛选");
            await loadRecentPage({ reset: true });
            setConnectionState("ready", elements.lastSyncIndicator.textContent);
        } catch (error) {
            setConnectionState("error", error.message);
            setFeedback(elements.recentFeedback, error.message, "error");
            showToast(error.message);
        }
    });

    elements.loadMoreRecentButton.addEventListener("click", async () => {
        try {
            await loadRecentPage();
        } catch (error) {
            showToast(error.message);
        }
    });

    elements.searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        try {
            setConnectionState("busy", "正在搜索");
            await loadSearchPage({ reset: true });
            setConnectionState("ready", elements.lastSyncIndicator.textContent);
        } catch (error) {
            setConnectionState("error", error.message);
            setFeedback(elements.searchFeedback, error.message, "error");
            showToast(error.message);
        }
    });

    elements.loadMoreSearchButton.addEventListener("click", async () => {
        try {
            await loadSearchPage();
        } catch (error) {
            showToast(error.message);
        }
    });

    elements.resetSearchButton.addEventListener("click", () => {
        elements.searchForm.reset();
        state.search = {
            page: 1,
            totalPages: 1,
            items: [],
            active: false,
            total: 0,
        };
        setFeedback(elements.searchFeedback, "", "muted");
        renderEmptyState(elements.searchResults, "输入关键词后再开始搜索。");
        updateLoadMoreButton(elements.loadMoreSearchButton, 1, 1, "还没有结果");
    });

    elements.artifactFilterForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        try {
            setConnectionState("busy", "正在刷新自动化产物");
            await loadArtifactPanels({ reset: true });
            setConnectionState("ready", elements.lastSyncIndicator.textContent);
        } catch (error) {
            setConnectionState("error", error.message);
            showToast(error.message);
        }
    });

    elements.refreshArtifactsButton.addEventListener("click", async () => {
        try {
            setConnectionState("busy", "正在刷新自动化产物");
            await loadArtifactPanels({ reset: true });
            setConnectionState("ready", elements.lastSyncIndicator.textContent);
            showToast("自动化产物已刷新");
        } catch (error) {
            setConnectionState("error", error.message);
            showToast(error.message);
        }
    });

    elements.resetArtifactFiltersButton.addEventListener("click", async () => {
        elements.artifactFilterForm.reset();
        try {
            setConnectionState("busy", "正在重置自动化筛选");
            await loadArtifactPanels({ reset: true });
            setConnectionState("ready", elements.lastSyncIndicator.textContent);
        } catch (error) {
            setConnectionState("error", error.message);
            showToast(error.message);
        }
    });

    elements.loadMoreArtifactsButton.addEventListener("click", async () => {
        try {
            await loadArtifactPanels();
        } catch (error) {
            showToast(error.message);
        }
    });

    elements.memoryQuickForm.addEventListener("submit", handleMemoryQuickCreate);

    elements.suggestMemoriesButton.addEventListener("click", async () => {
        try {
            setConnectionState("busy", "AI 正在分析记录，提取记忆...");
            const payload = await apiRequest("/memories/suggest", { method: "POST" });
            const suggestions = payload.suggestions || [];
            if (suggestions.length === 0) {
                showToast("没有发现新的可提取记忆。");
                setConnectionState("ready", "暂无新记忆");
                return;
            }
            let created = 0;
            for (const s of suggestions) {
                await apiRequest("/memories", { method: "POST", json: s });
                created++;
            }
            await loadMemories({ reset: true });
            const stats = await apiRequest("/memories/stats");
            renderMemoryStats(stats);
            setConnectionState("ready", `已提取 ${created} 条候选记忆`);
            showToast(`AI 提取了 ${created} 条候选记忆，请确认。`);
        } catch (error) {
            setConnectionState("error", error.message);
            showToast(error.message);
        }
    });

    elements.refreshMemoriesButton.addEventListener("click", async () => {
        try {
            setConnectionState("busy", "正在刷新记忆");
            await loadMemories({ reset: true });
            const stats = await apiRequest("/memories/stats");
            renderMemoryStats(stats);
            setConnectionState("ready", "记忆已刷新");
        } catch (error) {
            setConnectionState("error", error.message);
        }
    });

    elements.applyMemoryFilterButton.addEventListener("click", async () => {
        try {
            await loadMemories({ reset: true });
        } catch (error) {
            showToast(error.message);
        }
    });

    elements.loadMoreMemoriesButton.addEventListener("click", async () => {
        try {
            await loadMemories();
        } catch (error) {
            showToast(error.message);
        }
    });

    elements.taskQuickForm.addEventListener("submit", handleTaskQuickCreate);

    elements.refreshTasksButton.addEventListener("click", async () => {
        try {
            setConnectionState("busy", "正在刷新任务");
            await loadTasksToday();
            await loadTasks({ reset: true });
            setConnectionState("ready", "任务已刷新");
        } catch (error) {
            setConnectionState("error", error.message);
        }
    });

    elements.applyTaskFilterButton.addEventListener("click", async () => {
        try {
            await loadTasks({ reset: true });
        } catch (error) {
            showToast(error.message);
        }
    });

    elements.loadMoreTasksButton.addEventListener("click", async () => {
        try {
            await loadTasks();
        } catch (error) {
            showToast(error.message);
        }
    });

    elements.decisionQuickForm.addEventListener("submit", handleDecisionQuickCreate);

    elements.chatForm.addEventListener("submit", handleChatSubmit);
    elements.clearChatButton.addEventListener("click", () => {
        chatHistory.length = 0;
        elements.chatMessages.innerHTML = "";
        showChatGreeting();
    });

    elements.refreshDecisionsButton.addEventListener("click", async () => {
        try {
            setConnectionState("busy", "正在刷新决策");
            await loadDecisions({ reset: true });
            setConnectionState("ready", "决策已刷新");
        } catch (error) {
            setConnectionState("error", error.message);
        }
    });

    elements.applyDecisionFilterButton.addEventListener("click", async () => {
        try { await loadDecisions({ reset: true }); } catch (e) { showToast(e.message); }
    });

    elements.loadMoreDecisionsButton.addEventListener("click", async () => {
        try { await loadDecisions(); } catch (e) { showToast(e.message); }
    });
}

function bindViewer() {
    elements.closeViewerButton.addEventListener("click", closeViewer);
    elements.viewerBackdrop.addEventListener("click", (event) => {
        if (event.target === elements.viewerBackdrop) {
            closeViewer();
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !elements.viewerBackdrop.classList.contains("hidden")) {
            closeViewer();
        }
    });
}

async function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        return;
    }

    try {
        await navigator.serviceWorker.register("/sw.js");
    } catch (error) {
        console.warn("service worker register failed", error);
    }
}

function renderInitialEmptyStates() {
    renderEmptyState(elements.overviewStats, "保存 key 后即可读取总览。");
    renderEmptyState(elements.overviewRecentHighlights, "保存 key 后即可查看最近记录。");
    renderEmptyState(elements.overviewProcessingBacklog, "保存 key 后即可查看待处理队列。");
    renderEmptyState(elements.overviewArtifactHighlights, "保存 key 后即可查看自动化产物。");
    renderEmptyState(elements.processingWorkbench, "保存 key 后即可查看处理工作台。");
    renderEmptyState(elements.recentList, "保存 key 后即可读取最近记录。");
    renderEmptyState(elements.searchResults, "输入关键词后再开始搜索。");
    renderEmptyState(elements.automationJobs, "保存 key 后即可读取可执行任务。");
    renderEmptyState(elements.automationRuns, "还没有自动化运行记录。");
    renderEmptyState(elements.artifactSummaryCards, "保存 key 后即可读取自动化摘要。");
    renderEmptyState(elements.artifactList, "保存 key 后即可读取自动化产物。");
    renderEmptyState(elements.memoryList, "保存 key 后即可读取记忆。");
    renderEmptyState(elements.tasksTodayList, "保存 key 后即可读取今日任务。");
    renderEmptyState(elements.taskList, "保存 key 后即可读取全部任务。");
    elements.overviewBacklogTotal.textContent = "待处理 0 条";
    elements.processingQueueTotal.textContent = "待处理 0 条";
    elements.processingQueueNextLabel.textContent = "保存 key 后即可查看下一条待处理记录。";
    updateLoadMoreButton(elements.loadMoreRecentButton, 1, 1);
    updateLoadMoreButton(elements.loadMoreSearchButton, 1, 1, "还没有结果");
    updateLoadMoreButton(elements.loadMoreAutomationRunsButton, 1, 1);
    updateLoadMoreButton(elements.loadMoreArtifactsButton, 1, 1);
    updateLoadMoreButton(elements.loadMoreMemoriesButton, 1, 1);
    updateLoadMoreButton(elements.loadMoreTasksButton, 1, 1);
}

async function initModules() {
    try {
        const payload = await apiRequest("/modules");
        const modules = payload.modules || [];
        if (modules.length === 0) return;

        const navContainer = document.querySelector(".quick-nav");
        const bottomBar = document.querySelector(".bottom-bar");
        const panelsContainer = document.getElementById("module-panels");

        for (const mod of modules) {
            const navId = `module-panel-${mod.name}`;
            const label = mod.nav_item?.label || mod.label;

            if (navContainer) {
                navContainer.insertAdjacentHTML("beforeend",
                    `<button type="button" data-scroll-target="${navId}">${escapeHtml(label)}</button>`);
            }
            if (bottomBar) {
                bottomBar.insertAdjacentHTML("beforeend",
                    `<button type="button" data-scroll-target="${navId}">${escapeHtml(label)}</button>`);
            }

            if (mod.scripts) {
                for (const scriptUrl of mod.scripts) {
                    await new Promise((resolve, reject) => {
                        const script = document.createElement("script");
                        script.type = "module";
                        script.src = scriptUrl;
                        script.onload = resolve;
                        script.onerror = () => { console.warn("Module script load failed:", scriptUrl); resolve(); };
                        document.head.appendChild(script);
                    });
                }
            }

            const modDef = registeredModules.get(mod.name);
            const panelHtml = modDef?.panelHtml || `<p>${escapeHtml(label)} 模块加载中…</p>`;
            if (panelsContainer) {
                panelsContainer.insertAdjacentHTML("beforeend", `
                    <section class="panel module-panel" id="${navId}">
                        <div class="section-head">
                            <div>
                                <p class="eyebrow">Module</p>
                                <h2>${escapeHtml(label)}</h2>
                            </div>
                        </div>
                        ${panelHtml}
                    </section>
                `);
            }

            if (modDef?.onInit) {
                try { await modDef.onInit(); } catch (e) { console.warn(mod.name, e); }
            }
        }
    } catch (error) {
        console.warn("Module init failed:", error.message);
    }
}

function toggleFloatChat() {
    const popup = elements.floatChatPopup;
    const isHidden = popup.classList.contains("hidden");
    if (isHidden) {
        popup.classList.remove("hidden");
        elements.floatChatInput.focus();
    } else {
        popup.classList.add("hidden");
    }
}

function showFloatMsg(role, content) {
    const div = document.createElement("div");
    div.className = `chat-msg ${role}`;
    div.innerHTML = `${role === "axi" ? renderMarkdown(content) : escapeHtml(content)}`;
    elements.floatChatBody.appendChild(div);
    elements.floatChatBody.scrollTop = elements.floatChatBody.scrollHeight;
    return div;
}

function loadFloatChatHistory() {
    elements.floatChatBody.innerHTML = "";
    if (chatHistory.length === 0) {
        showFloatMsg("axi", "你好，我是 Axi。按 `Ctrl+K` 随时呼出我。试试问我：**今天该做什么？**");
        return;
    }
    for (const msg of chatHistory.slice(-20)) {
        showFloatMsg(msg.role, msg.content);
    }
}

async function handleFloatChatSubmit(event) {
    event.preventDefault();
    const message = elements.floatChatInput.value.trim();
    if (!message) return;

    elements.floatChatInput.value = "";
    elements.floatChatInput.disabled = true;
    showFloatMsg("user", message);
    chatHistory.push({ role: "user", content: message });
    saveChatHistory(chatHistory);

    try {
        requireKey();
        const response = await fetch(buildApiUrl("/chat/stream"), {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-Axiom-Key": state.key },
            body: JSON.stringify({ message, history: chatHistory.slice(-21, -1) }),
        });
        if (!response.ok) throw new Error(await parseErrorMessage(response));

        const msgDiv = showFloatMsg("axi", "");
        let fullText = "";
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";
            for (const line of lines) {
                if (line.startsWith("data: ")) {
                    const data = line.slice(6);
                    if (data === "[DONE]") continue;
                    try {
                        const p = JSON.parse(data);
                        if (p.content) {
                            fullText += p.content;
                            msgDiv.innerHTML = renderMarkdown(fullText);
                            elements.floatChatBody.scrollTop = elements.floatChatBody.scrollHeight;
                        }
                    } catch (e) { /* */ }
                }
            }
        }

        if (fullText) {
            chatHistory.push({ role: "assistant", content: fullText });
            saveChatHistory(chatHistory);
        }
    } catch (error) {
        showFloatMsg("axi", `出错了: ${error.message}`);
    } finally {
        elements.floatChatInput.disabled = false;
        elements.floatChatInput.focus();
    }
}

function bindFloatChat() {
    elements.floatChatBtn.addEventListener("click", toggleFloatChat);
    elements.floatChatClose.addEventListener("click", () => elements.floatChatPopup.classList.add("hidden"));
    elements.floatChatForm.addEventListener("submit", handleFloatChatSubmit);
}

function init() {
    bindScrollButtons();
    bindSidebarTabs();
    bindForms();
    bindViewer();
    bindDelegatedActions();
    registerServiceWorker();
    renderInitialEmptyStates();
    loadStoredKey();

    if (state.key) {
        setFeedback(elements.keyFeedback, "已读取浏览器中的本地 key。", "ok");
        elements.connectionBar.classList.add("visible");
        void syncDashboard();
        void initModules();
    } else {
        setConnectionState("idle", "尚未同步");
    }

    // Floating chat
    bindFloatChat();
    loadFloatChatHistory();

    window.addEventListener("beforeunload", releaseAllObjectUrls);
    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
            e.preventDefault();
            toggleFloatChat();
        }
    });
}

init();
