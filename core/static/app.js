const LOCAL_KEY_NAME = "axiom.web.key";
const OVERVIEW_RECENT_LIMIT = 4;
const OVERVIEW_PREVIEW_CHARS = 140;
const RECENT_PAGE_SIZE = 9;
const SEARCH_PAGE_SIZE = 9;
const ARTIFACT_PAGE_SIZE = 12;

const state = {
    key: "",
    recent: {
        page: 1,
        totalPages: 1,
        items: [],
    },
    search: {
        page: 1,
        totalPages: 1,
        items: [],
        active: false,
    },
    artifacts: {
        page: 1,
        totalPages: 1,
        items: [],
    },
    objectUrls: new Set(),
    viewerObjectUrl: null,
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
    imageCaptureForm: document.getElementById("image-capture-form"),
    imageInput: document.getElementById("image-input"),
    captureFeedback: document.getElementById("capture-feedback"),
    overviewStats: document.getElementById("overview-stats"),
    overviewRecentHighlights: document.getElementById("overview-recent-highlights"),
    overviewArtifactHighlights: document.getElementById("overview-artifact-highlights"),
    overviewGeneratedAt: document.getElementById("overview-generated-at"),
    refreshOverviewButton: document.getElementById("refresh-overview-button"),
    recentList: document.getElementById("recent-list"),
    refreshRecentButton: document.getElementById("refresh-recent-button"),
    loadMoreRecentButton: document.getElementById("load-more-recent-button"),
    searchForm: document.getElementById("search-form"),
    searchFeedback: document.getElementById("search-feedback"),
    searchResults: document.getElementById("search-results"),
    loadMoreSearchButton: document.getElementById("load-more-search-button"),
    resetSearchButton: document.getElementById("reset-search-button"),
    refreshArtifactsButton: document.getElementById("refresh-artifacts-button"),
    artifactFilterForm: document.getElementById("artifact-filter-form"),
    resetArtifactFiltersButton: document.getElementById("reset-artifact-filters-button"),
    artifactSummaryCards: document.getElementById("artifact-summary-cards"),
    artifactList: document.getElementById("artifact-list"),
    loadMoreArtifactsButton: document.getElementById("load-more-artifacts-button"),
    viewerBackdrop: document.getElementById("viewer-backdrop"),
    viewerTitle: document.getElementById("viewer-title"),
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
    return type === "image" ? "图片" : "文本";
}

function formatStorage(storage) {
    if (storage === "archive") {
        return "archive";
    }
    return "inbox";
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
    return artifact.group;
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
                    <h3>${escapeHtml(summarizeText(item.content, 40) || "未命名记录")}</h3>
                    <p class="item-preview">${escapeHtml(summarizeText(item.content, 120) || "没有可显示内容。")}</p>
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
            const actionLabel = item.storage === "archive" ? "恢复到 Inbox" : "归档";
            const preview = summarizeText(item.content, 150) || "没有可显示内容。";
            return `
                <article class="item-card" data-item-id="${escapeHtml(item.id)}">
                    <div class="item-meta">
                        <span class="tag">${escapeHtml(formatType(item.type))}</span>
                        <span class="tag">${escapeHtml(formatStorage(item.storage))}</span>
                        <span>${escapeHtml(formatDateTime(item.created_at))}</span>
                    </div>
                    <h3>${escapeHtml(summarizeText(item.content, 40) || `${formatType(item.type)} #${item.id}`)}</h3>
                    ${
                        item.type === "image"
                            ? `<img class="item-image" alt="${escapeHtml(preview)}" data-protected-image="${escapeHtml(item.file_url || "")}">`
                            : `<p class="item-preview">${escapeHtml(preview)}</p>`
                    }
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

function findItemById(itemId) {
    const targetId = Number(itemId);
    return (
        state.recent.items.find((item) => item.id === targetId) ||
        state.search.items.find((item) => item.id === targetId) ||
        null
    );
}

function findArtifactByPath(relativePath) {
    return state.artifacts.items.find((artifact) => artifact.relative_path === relativePath);
}

function openViewerWithText(title, content) {
    releaseViewerObjectUrl();
    elements.viewerTitle.textContent = title;
    elements.viewerContent.className = "viewer-content is-text";
    elements.viewerContent.textContent = content;
    elements.viewerBackdrop.classList.remove("hidden");
}

async function openViewerWithImage(title, fileUrl) {
    releaseViewerObjectUrl();
    const blob = await apiRequest(fileUrl, { responseType: "blob" });
    const objectUrl = URL.createObjectURL(blob);
    state.viewerObjectUrl = objectUrl;
    const image = document.createElement("img");
    image.src = objectUrl;
    image.alt = title;
    elements.viewerTitle.textContent = title;
    elements.viewerContent.className = "viewer-content";
    elements.viewerContent.innerHTML = "";
    elements.viewerContent.append(image);
    elements.viewerBackdrop.classList.remove("hidden");
}

async function openArtifactViewer(relativePath) {
    const artifact = findArtifactByPath(relativePath);
    const title = artifact ? artifact.name : relativePath;
    const body = await apiRequest(`/artifacts/file/${relativePath}`, {
        responseType: "text",
    });
    openViewerWithText(title, body);
}

function closeViewer() {
    releaseViewerObjectUrl();
    elements.viewerBackdrop.classList.add("hidden");
    elements.viewerContent.innerHTML = "";
    elements.viewerContent.className = "viewer-content";
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

async function loadRecentPage({ reset = false } = {}) {
    const nextPage = reset ? 1 : state.recent.page + 1;
    const payload = await apiRequest("/recent", {
        query: {
            page: nextPage,
            page_size: RECENT_PAGE_SIZE,
            sort: "newest",
        },
    });

    state.recent.page = payload.page;
    state.recent.totalPages = payload.total_pages || 1;
    state.recent.items = reset
        ? payload.items
        : [...state.recent.items, ...payload.items];

    renderItemCards(elements.recentList, state.recent.items, "还没有记录。");
    updateLoadMoreButton(elements.loadMoreRecentButton, state.recent.page, state.recent.totalPages);
}

function readSearchFilters() {
    const form = new FormData(elements.searchForm);
    return {
        q: String(form.get("q") || "").trim(),
        type: String(form.get("type") || "").trim(),
        storage: String(form.get("storage") || "").trim(),
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

async function syncDashboard({ showMessage = false } = {}) {
    try {
        requireKey();
        setConnectionState("busy", "正在同步总览、最近记录和自动化产物");
        await loadOverview();
        await loadRecentPage({ reset: true });
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

async function handleImageCaptureSubmit(event) {
    event.preventDefault();
    const file = elements.imageInput.files?.[0];
    const sourceInput = document.getElementById("image-source-input");
    const captionInput = document.getElementById("image-caption-input");

    if (!file) {
        setFeedback(elements.captureFeedback, "请先选择图片。", "error");
        return;
    }

    try {
        const formData = new FormData();
        formData.set("file", file);
        formData.set("source", sourceInput.value.trim() || "web_app");
        formData.set("caption", captionInput.value.trim());

        setConnectionState("busy", "正在上传图片");
        const payload = await apiRequest("/upload", {
            method: "POST",
            formData,
        });

        elements.imageCaptureForm.reset();
        sourceInput.value = "web_app";
        setFeedback(
            elements.captureFeedback,
            `图片已写入 inbox，item #${payload.item.id}`,
            "ok",
        );
        showToast("图片已上传");
        await syncDashboard();
    } catch (error) {
        setConnectionState("error", error.message);
        setFeedback(elements.captureFeedback, error.message, "error");
        showToast(error.message);
    }
}

async function handleStorageToggle(itemId) {
    const item = findItemById(itemId);
    if (!item) {
        showToast("没有找到对应记录");
        return;
    }

    const endpoint = item.storage === "archive" ? `/restore/${item.id}` : `/archive/${item.id}`;
    const actionLabel = item.storage === "archive" ? "恢复" : "归档";

    try {
        setConnectionState("busy", `正在${actionLabel}`);
        await apiRequest(endpoint, { method: "POST" });
        showToast(`${actionLabel}完成`);
        await syncDashboard();
    } catch (error) {
        setConnectionState("error", error.message);
        showToast(error.message);
    }
}

async function handleItemView(itemId) {
    const item = findItemById(itemId);
    if (!item) {
        showToast("没有找到对应记录");
        return;
    }

    try {
        if (item.type === "image") {
            await openViewerWithImage(
                summarizeText(item.content, 40) || `图片 #${item.id}`,
                item.file_url,
            );
            return;
        }

        openViewerWithText(
            summarizeText(item.content, 40) || `文本 #${item.id}`,
            item.content || "没有内容。",
        );
    } catch (error) {
        showToast(error.message);
    }
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
        } else if (action === "view-artifact") {
            await openArtifactViewer(target.getAttribute("data-artifact-path"));
        }
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
        setFeedback(elements.keyFeedback, "本地 key 已清除。", "ok");
        setConnectionState("idle", "尚未同步");
        elements.overviewGeneratedAt.textContent = "";
        renderEmptyState(elements.overviewStats, "保存 key 后即可读取总览。");
        renderEmptyState(elements.overviewRecentHighlights, "保存 key 后即可查看最近记录。");
        renderEmptyState(elements.overviewArtifactHighlights, "保存 key 后即可查看自动化产物。");
        renderEmptyState(elements.recentList, "保存 key 后即可读取最近记录。");
        renderEmptyState(elements.searchResults, "输入关键词后再开始搜索。");
        renderEmptyState(elements.artifactSummaryCards, "保存 key 后即可读取自动化摘要。");
        renderEmptyState(elements.artifactList, "保存 key 后即可读取自动化产物。");
        updateLoadMoreButton(elements.loadMoreRecentButton, 1, 1);
        updateLoadMoreButton(elements.loadMoreSearchButton, 1, 1, "还没有结果");
        updateLoadMoreButton(elements.loadMoreArtifactsButton, 1, 1);
        showToast("已清除本地 key");
    });

    elements.syncNowButton.addEventListener("click", async () => {
        await syncDashboard({ showMessage: true });
    });

    elements.textCaptureForm.addEventListener("submit", handleTextCaptureSubmit);
    elements.imageCaptureForm.addEventListener("submit", handleImageCaptureSubmit);

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
    renderEmptyState(elements.artifactSummaryCards, "保存 key 后即可读取自动化摘要。");
    renderEmptyState(elements.artifactList, "保存 key 后即可读取自动化产物。");
    updateLoadMoreButton(elements.loadMoreRecentButton, 1, 1);
    updateLoadMoreButton(elements.loadMoreSearchButton, 1, 1, "还没有结果");
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
