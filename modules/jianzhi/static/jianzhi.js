axiom.registerModule({
    name: "jianzhi",
    label: "减脂",
    navLabel: "减脂",

    panelHtml: `
        <div id="jianzhi-quick-feedback" class="feedback-text"></div>

        <form id="jianzhi-quick-form" class="stack-form">
            <div class="field-row">
                <label class="field"><span>类型</span>
                    <select id="jianzhi-quick-type">
                        <option value="weight">体重</option>
                        <option value="food">饮食</option>
                        <option value="exercise">运动</option>
                        <option value="measurement">围度</option>
                        <option value="note">备注</option>
                    </select>
                </label>
                <label class="field" id="jianzhi-weight-field"><span>体重 (kg)</span>
                    <input id="jianzhi-quick-weight" type="number" step="0.1" placeholder="70.0">
                </label>
                <label class="field hidden" id="jianzhi-text-field"><span>内容</span>
                    <input id="jianzhi-quick-text" type="text" placeholder="吃了什么？做了什么运动？">
                </label>
            </div>
            <label class="field"><span>日期</span>
                <input id="jianzhi-quick-date" type="date">
            </label>
            <button class="primary-button" type="submit">记录</button>
        </form>

        <div id="jianzhi-stats" class="stats-mini-grid"></div>

        <div class="section-head section-head-compact">
            <div><p class="eyebrow">历史记录</p></div>
            <div class="filter-row">
                <select id="jianzhi-filter-type">
                    <option value="">全部类型</option>
                    <option value="weight">体重</option>
                    <option value="food">饮食</option>
                    <option value="exercise">运动</option>
                    <option value="measurement">围度</option>
                    <option value="note">备注</option>
                </select>
                <button class="secondary-button" id="jianzhi-apply-filter" type="button">筛选</button>
            </div>
        </div>
        <div id="jianzhi-entry-list" class="item-grid"></div>
    `,

    onInit() {
        const typeSelect = document.getElementById("jianzhi-quick-type");
        const weightField = document.getElementById("jianzhi-weight-field");
        const textField = document.getElementById("jianzhi-text-field");

        typeSelect.addEventListener("change", () => {
            if (typeSelect.value === "weight") {
                weightField.classList.remove("hidden");
                textField.classList.add("hidden");
            } else {
                weightField.classList.add("hidden");
                textField.classList.remove("hidden");
            }
        });

        document.getElementById("jianzhi-quick-date").value = new Date().toISOString().slice(0, 10);

        document.getElementById("jianzhi-quick-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const entryType = typeSelect.value;
            let entryData = {};
            if (entryType === "weight") {
                const w = parseFloat(document.getElementById("jianzhi-quick-weight").value);
                if (!w) { this.setFeedback("请输入体重", "error"); return; }
                entryData = { weight_kg: w };
            } else {
                const txt = document.getElementById("jianzhi-quick-text").value.trim();
                if (!txt) { this.setFeedback("请输入内容", "error"); return; }
                entryData = { text: txt };
            }
            const recordedAt = document.getElementById("jianzhi-quick-date").value;

            try {
                await apiRequest("/m/jianzhi/entries", {
                    method: "POST",
                    json: { entry_type: entryType, entry_data: entryData, recorded_at: recordedAt },
                });
                document.getElementById("jianzhi-quick-weight").value = "";
                document.getElementById("jianzhi-quick-text").value = "";
                this.setFeedback("已记录。", "ok");
                await this.onSync();
            } catch (err) {
                this.setFeedback(err.message, "error");
            }
        });

        document.getElementById("jianzhi-apply-filter").addEventListener("click", () => this.loadEntries({ reset: true }));
    },

    async onSync() {
        await this.loadStats();
        await this.renderWeightTrend();
        await this.loadEntries({ reset: true });
    },

    async renderWeightTrend() {
        try {
            const payload = await apiRequest("/m/jianzhi/weight-trend", { query: { days: 30 } });
            const points = payload.points || [];
            if (points.length < 2) return;

            const weights = points.map(p => p.weight_kg).filter(w => w != null);
            if (weights.length < 2) return;

            const min = Math.min(...weights);
            const max = Math.max(...weights);
            const range = max - min || 1;
            const latest = weights[weights.length - 1];
            const first = weights[0];
            const change = latest - first;
            const arrow = change < 0 ? "↓" : change > 0 ? "↑" : "→";
            const color = change < 0 ? "var(--ok)" : change > 0 ? "var(--warn)" : "var(--ink-soft)";

            const chartHeight = 60;
            const bars = points.map((p, i) => {
                const w = p.weight_kg || (points[i-1]?.weight_kg || min);
                const h = Math.max(3, ((w - min) / range) * chartHeight);
                const isLast = i === points.length - 1;
                return `<span style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:${chartHeight}px" title="${p.recorded_at}: ${w}kg">
                    <span style="width:80%;height:${h}px;background:${isLast ? 'var(--bloom-cyan)' : 'var(--glass-strong)'};border-radius:2px 2px 0 0;opacity:${isLast ? 1 : 0.5}"></span>
                </span>`;
            }).join("");

            document.getElementById("jianzhi-stats").insertAdjacentHTML("beforebegin", `
                <div class="subpanel" style="margin-bottom:12px">
                    <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px">
                        <p class="subtle-text">30 天体重趋势</p>
                        <p style="font-size:0.88rem;color:${color};font-weight:550">${latest} kg ${arrow} ${Math.abs(change).toFixed(1)}</p>
                    </div>
                    <div style="display:flex;align-items:flex-end;gap:2px;padding:0 2px">${bars}</div>
                </div>
            `);
        } catch (e) { /* noop */ }
    },

    async loadStats() {
        try {
            const payload = await apiRequest("/m/jianzhi/stats");
            const s = payload;
            const typeStr = s.by_type ? Object.entries(s.by_type).map(([k, v]) => `${this.typeLabel(k)} ${v}`).join(" · ") : "";
            document.getElementById("jianzhi-stats").innerHTML = `
                <div class="stat-card"><p class="stat-value">${s.total || 0}</p><p class="stat-label">总记录</p></div>
                <div class="stat-card"><p class="stat-value">${s.latest_weight ? s.latest_weight.weight_kg + " kg" : "-"}</p><p class="stat-label">最新体重</p></div>
                <div class="stat-card stat-card-wide"><p class="stat-label">分类分布</p><p>${typeStr || "暂无"}</p></div>
            `;
        } catch (e) { /* noop */ }
    },

    async loadEntries({ reset = false } = {}) {
        const query = { page_size: 20 };
        const ft = document.getElementById("jianzhi-filter-type").value;
        if (ft) query.entry_type = ft;

        try {
            const payload = await apiRequest("/m/jianzhi/entries", { query });
            const entries = payload.entries || [];
            if (entries.length === 0) {
                document.getElementById("jianzhi-entry-list").innerHTML = `<p class="empty-state">还没有记录，在上方添加第一条吧。</p>`;
                return;
            }
            document.getElementById("jianzhi-entry-list").innerHTML = entries.map(e => {
                const dataStr = Object.entries(e.entry_data).map(([k, v]) => `${k}: ${v}`).join(", ");
                return `
                    <div class="item-card">
                        <div class="item-card-body">
                            <div class="item-card-tags">
                                <span class="tag tag-${e.entry_type}">${escapeHtml(e.entry_type_label)}</span>
                            </div>
                            <p class="item-card-text">${escapeHtml(dataStr)}</p>
                            <p class="item-meta">${formatDateTime(e.recorded_at)}</p>
                        </div>
                    </div>
                `;
            }).join("");
        } catch (e) { console.warn(e); }
    },

    setFeedback(msg, kind) {
        const el = document.getElementById("jianzhi-quick-feedback");
        el.textContent = msg;
        el.className = "feedback-text feedback-" + kind;
    },

    typeLabel(t) {
        const map = { weight: "体重", food: "饮食", exercise: "运动", measurement: "围度", note: "备注" };
        return map[t] || t;
    },
});
