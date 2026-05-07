const LOCAL_KEY_NAME = "axiom.web.key";
const OVERVIEW_RECENT_LIMIT = 4;
const OVERVIEW_PREVIEW_CHARS = 140;
const RECENT_PAGE_SIZE = 9;
const SEARCH_PAGE_SIZE = 9;
const ARTIFACT_PAGE_SIZE = 12;
const AUTOMATION_RUN_PAGE_SIZE = 8;

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
    objectUrls: new Set(),
    viewerObjectUrl: null,
    viewerContext: null,
};

const elements = {
    keyForm: document.getElementById("key-form"),
    keyInput: document.getElementById("key-input"),
    keyFeedback: document.getElementById("key-feedback"),
    clearKeyButton: document.getElementById("clear-key-button"),
    syncNowButton: document.getElementById("sync-now-button"),
    connectionIndicator: document.getElementById("connection-indicator"),
    lastSyncIndicator: document.getElementById("last-sync-indicator"),
    textCaptureForm: document.getElementById("text-capture-form"),
    textInput: document.getElementById("text-input"),
    fileCaptureForm: document.getElementById("file-capture-form"),
    fileInput: document.getElementById("file-input"),
    captureFeedback: document.getElementById("capture-feedback"),
    overviewStats: document.getElementById("overview-stats"),
    overviewRecentHighlights: document.getElementById("overview-recent-highlights"),
    overviewArtifactHighlights: document.getElementById("overview-artifact-highlights"),
    overviewGeneratedAt: document.getElementById("overview-generated-at"),
    refreshOverviewButton: document.getElementById("refresh-overview-button"),
    recentFilterForm: document.getElementById("recent-filter-form"),
    recentFeedback: document.getElementById("recent-feedback"),
    resetRecentFiltersButton: document.getElementById("reset-recent-filters-button"),
    recentList: document.getElementById("recent-list"),
    refreshRecentButton: document.getElementById("refresh-recent-button"),
    loadMoreRecentButton: document.getElementById("load-more-recent-button"),
    searchForm: document.getElementById("search-form"),
    searchFeedback: document.getElementById("search-feedback"),
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
    if (status === "ready") {
        elements.connectionIndicator.textContent = "已连接";
    } else if (status === "busy") {
        elements.connectionIndicator.textContent = "同步中";
    } else if (status === "error") {
        elements.connectionIndicator.textContent = "连接异常";
    } else {
        elements.connectionIndicator.textContent = "未连接";
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
        ["总条目", stats.total],
        ["文本", stats.by_type?.text || 0],
        ["图片", stats.by_type?.image || 0],
        ["文档", stats.by_type?.document || 0],
        ["音频", stats.by_type?.audio || 0],
        ["已就绪", stats.by_processing_state?.ready || 0],
        ["待处理", stats.by_processing_state?.pending || 0],
        ["Inbox", stats.by_storage?.inbox || 0],
        ["Archive", stats.by_storage?.archive || 0],
    ];

    elements.overviewStats.innerHTML = cards
        .map(
            ([label, value]) => `
                <article class="stat-card">
                    <span class="subtle-text">${escapeHtml(label)}</span>
                    <strong>${escapeHtml(value)}</strong>
                </article>
            `
        )
        .join("");
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
        {
            label: buildStorageActionLabel(item),
            className: "secondary-button",
            dataset: {
                action: "viewer-toggle-storage",
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
    renderViewerActions([
        {
            label: "保存修改",
            className: "primary-button",
            dataset: {
                action: "save-item-edit",
                itemId: item.id,
            },
        },
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
    renderOverviewArtifacts(payload.artifacts.latest || {});
    elements.overviewGeneratedAt.textContent = `生成于 ${formatDateTime(payload.generated_at)}`;
    elements.lastSyncIndicator.textContent = `上次同步：${formatDateTime(payload.generated_at)}`;
}

function readRecentFilters() {
    const form = new FormData(elements.recentFilterForm);
    return {
        type: String(form.get("type") || "").trim(),
        storage: String(form.get("storage") || "").trim(),
        source: String(form.get("source") || "").trim(),
        processing_state: String(form.get("processing_state") || "").trim(),
        sort: String(form.get("sort") || "newest").trim(),
        created_from: toUtcIsoFromLocalInput(String(form.get("created_from") || "").trim()),
        created_to: toUtcIsoFromLocalInput(String(form.get("created_to") || "").trim()),
    };
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

async function syncDashboard({ showMessage = false } = {}) {
    try {
        requireKey();
        setConnectionState("busy", "正在同步总览、最近记录和自动化产物");
        await loadOverview();
        await loadRecentPage({ reset: true });
        await loadAutomationJobs();
        await loadAutomationRuns({ reset: true });
        await loadArtifactPanels({ reset: true });
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

async function handleItemEditSubmit(form) {
    const itemId = form.dataset.itemId;
    const itemType = form.dataset.itemType;
    const formData = new FormData(form);
    const content = String(formData.get("content") || "");
    const source = String(formData.get("source") || "");
    const derivedText = String(formData.get("derived_text") || "");
    const transcriptText = String(formData.get("transcript_text") || "");
    const feedback = form.querySelector("[data-edit-feedback]");
    const submitButton = elements.viewerActions.querySelector("[data-action='save-item-edit']");

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
        setButtonDisabled(submitButton, true, "保存中...");
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
        await openItemViewer(itemId);
        showToast(payload.message === "unchanged" ? "没有检测到变化" : "修改已保存");
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

    elements.clearKeyButton.addEventListener("click", () => {
        saveKey("");
        elements.keyInput.value = "";
        state.recent = { page: 1, totalPages: 1, items: [], total: 0 };
        state.search = { page: 1, totalPages: 1, items: [], active: false, total: 0 };
        state.artifacts = { page: 1, totalPages: 1, items: [] };
        state.automation = { jobs: [], historyJobs: [], jobsLoaded: false, runs: [], runsPage: 1, runsTotalPages: 1, runsTotal: 0 };
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
        closeViewer();
        renderEmptyState(elements.overviewStats, "保存 key 后即可读取总览。");
        renderEmptyState(elements.overviewRecentHighlights, "保存 key 后即可查看最近记录。");
        renderEmptyState(elements.overviewArtifactHighlights, "保存 key 后即可查看自动化产物。");
        renderEmptyState(elements.recentList, "保存 key 后即可读取最近记录。");
        renderEmptyState(elements.searchResults, "输入关键词后再开始搜索。");
        renderEmptyState(elements.automationJobs, "保存 key 后即可读取可执行任务。");
        renderEmptyState(elements.automationRuns, "还没有自动化运行记录。");
        renderEmptyState(elements.artifactSummaryCards, "保存 key 后即可读取自动化摘要。");
        renderEmptyState(elements.artifactList, "保存 key 后即可读取自动化产物。");
        updateLoadMoreButton(elements.loadMoreRecentButton, 1, 1);
        updateLoadMoreButton(elements.loadMoreSearchButton, 1, 1, "还没有结果");
        updateLoadMoreButton(elements.loadMoreAutomationRunsButton, 1, 1);
        updateLoadMoreButton(elements.loadMoreArtifactsButton, 1, 1);
        showToast("已清除本地 key");
    });

    elements.syncNowButton.addEventListener("click", async () => {
        await syncDashboard({ showMessage: true });
    });

    elements.textCaptureForm.addEventListener("submit", handleTextCaptureSubmit);
    elements.fileCaptureForm.addEventListener("submit", handleFileCaptureSubmit);
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
    renderEmptyState(elements.overviewArtifactHighlights, "保存 key 后即可查看自动化产物。");
    renderEmptyState(elements.recentList, "保存 key 后即可读取最近记录。");
    renderEmptyState(elements.searchResults, "输入关键词后再开始搜索。");
    renderEmptyState(elements.automationJobs, "保存 key 后即可读取可执行任务。");
    renderEmptyState(elements.automationRuns, "还没有自动化运行记录。");
    renderEmptyState(elements.artifactSummaryCards, "保存 key 后即可读取自动化摘要。");
    renderEmptyState(elements.artifactList, "保存 key 后即可读取自动化产物。");
    updateLoadMoreButton(elements.loadMoreRecentButton, 1, 1);
    updateLoadMoreButton(elements.loadMoreSearchButton, 1, 1, "还没有结果");
    updateLoadMoreButton(elements.loadMoreAutomationRunsButton, 1, 1);
    updateLoadMoreButton(elements.loadMoreArtifactsButton, 1, 1);
}

function init() {
    bindScrollButtons();
    bindForms();
    bindViewer();
    bindDelegatedActions();
    registerServiceWorker();
    renderInitialEmptyStates();
    loadStoredKey();

    if (state.key) {
        setFeedback(elements.keyFeedback, "已读取浏览器中的本地 key。", "ok");
        void syncDashboard();
    } else {
        setConnectionState("idle", "尚未同步");
    }

    window.addEventListener("beforeunload", releaseAllObjectUrls);
}

init();
