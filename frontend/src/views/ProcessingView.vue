<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ApiError } from '@/api/client';
import { getProcessingBacklog, markProcessingPending, markProcessingReady } from '@/api/endpoints';
import type { Item, ItemType, ProcessingBacklogGroup, ProcessingBacklogPayload } from '@/api/types';
import ItemDrawer from '@/components/ItemDrawer.vue';
import { formatRelative } from '@/composables/useRelativeTime';
import { typeAccent } from '@/composables/useTypeAccent';

const backlog = ref<ProcessingBacklogPayload | null>(null);
const loading = ref(false);
const busyKey = ref<string | null>(null);
const error = ref<string | null>(null);
const feedback = ref<string | null>(null);
const selectedItemId = ref<number | null>(null);
const lastMarked = ref<Item[]>([]);

const hasBacklog = computed(() => Boolean(backlog.value && backlog.value.total > 0));

const metrics = computed(() => {
  const byType = backlog.value?.by_type || {};
  return [
    { label: '待处理', value: backlog.value?.total ?? 0, hint: '需要补正文、转写或说明' },
    { label: '文本', value: byType.text || 0, hint: '内容待完善' },
    { label: '图片', value: byType.image || 0, hint: '说明待补' },
    { label: '文档', value: byType.document || 0, hint: '正文待补' },
    { label: '音频', value: byType.audio || 0, hint: '转写待补' },
  ];
});

async function loadQueue() {
  loading.value = true;
  error.value = null;
  try {
    backlog.value = await getProcessingBacklog({ group_limit: 8 });
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '处理队列加载失败';
  } finally {
    loading.value = false;
  }
}

function itemTitle(item: Item | null | undefined): string {
  if (!item) return '无待处理项';
  const text = compactText(item.content)
    || compactText(item.derived_text)
    || compactText(item.transcript_text)
    || item.original_name
    || `#${item.id}`;
  return text;
}

function compactText(value: string | null | undefined, limit = 96): string {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  return text.length > limit ? `${text.slice(0, limit - 1)}...` : text;
}

function typeLabel(type: ItemType): string {
  const labels: Record<ItemType, string> = {
    text: '文本',
    image: '图片',
    document: '文档',
    audio: '音频',
  };
  return labels[type] || type;
}

function itemMeta(item: Item): string {
  const source = item.source || 'unknown';
  return `${typeLabel(item.type)} / ${source} / ${formatRelative(item.created_at)}`;
}

function groupIds(group: ProcessingBacklogGroup): number[] {
  const ids = group.items.map((item) => item.id);
  if (!ids.length && group.next_item) ids.push(group.next_item.id);
  return Array.from(new Set(ids));
}

function actionItem(group: ProcessingBacklogGroup): Item | null {
  return group.next_item || group.items[0] || null;
}

async function markReady(ids: number[], key: string) {
  if (!ids.length || busyKey.value) return;
  busyKey.value = key;
  error.value = null;
  feedback.value = null;
  try {
    const payload = await markProcessingReady(ids);
    lastMarked.value = payload.items || [];
    feedback.value = `已标记 ${payload.count} 条为就绪`;
    await loadQueue();
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '标记就绪失败';
  } finally {
    busyKey.value = null;
  }
}

async function markPending(ids: number[], key: string) {
  if (!ids.length || busyKey.value) return;
  busyKey.value = key;
  error.value = null;
  feedback.value = null;
  try {
    const payload = await markProcessingPending(ids);
    lastMarked.value = payload.items || [];
    feedback.value = `已退回 ${payload.count} 条到待处理`;
    await loadQueue();
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '退回待处理失败';
  } finally {
    busyKey.value = null;
  }
}

function openItem(item: Item | null | undefined) {
  if (!item) return;
  selectedItemId.value = item.id;
}

function onDrawerChanged(options?: { nextItemId?: number }) {
  selectedItemId.value = options?.nextItemId ?? null;
  loadQueue();
}

onMounted(loadQueue);
</script>

<template>
  <main class="processing-view">
    <header class="topbar">
      <div>
        <p class="eyebrow">Processing</p>
        <h1>处理工作台</h1>
      </div>
      <button class="refresh-btn" type="button" :disabled="loading" @click="loadQueue">
        <span>{{ loading ? '刷新中' : '刷新' }}</span>
      </button>
    </header>

    <div v-if="error" class="notice error-row">
      <span>{{ error }}</span>
      <button type="button" @click="loadQueue">重试</button>
    </div>
    <div v-else-if="feedback" class="notice feedback-row">
      <span>{{ feedback }}</span>
    </div>

    <section class="metrics" aria-label="处理指标">
      <article v-for="metric in metrics" :key="metric.label" :class="{ urgent: metric.label === '待处理' && metric.value > 0 }">
        <span>{{ metric.label }}</span>
        <strong>{{ metric.value }}</strong>
        <small>{{ metric.hint }}</small>
      </article>
    </section>

    <section class="queue-grid">
      <article class="panel next-panel" :class="{ empty: !hasBacklog }">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Next</p>
            <h2>全局下一条</h2>
          </div>
          <span class="state-pill">{{ hasBacklog ? '待处理' : '已清空' }}</span>
        </div>
        <template v-if="backlog?.next_overall">
          <div class="next-body">
            <span class="type-dot" :style="{ background: typeAccent(backlog.next_overall.type) }" />
            <div>
              <strong>{{ itemTitle(backlog.next_overall) }}</strong>
              <p>{{ itemMeta(backlog.next_overall) }}</p>
            </div>
          </div>
          <div class="action-row">
            <button type="button" @click="openItem(backlog.next_overall)">打开</button>
            <button
              type="button"
              :disabled="busyKey === 'next-ready'"
              @click="markReady([backlog.next_overall.id], 'next-ready')"
            >
              {{ busyKey === 'next-ready' ? '处理中' : '标记就绪' }}
            </button>
          </div>
        </template>
        <p v-else class="empty-line">当前没有待补正文、待补转写或待补说明的记录。</p>
      </article>

      <section class="panel groups-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Groups</p>
            <h2>队列分组</h2>
          </div>
          <strong>{{ backlog?.groups.length ?? 0 }}</strong>
        </div>

        <div v-if="backlog?.groups.length" class="group-list">
          <article v-for="group in backlog.groups" :key="group.type" class="group-card">
            <div class="group-head">
              <div>
                <div class="row-title">
                  <span class="type-dot" :style="{ background: typeAccent(group.type) }" />
                  <strong>{{ group.title }}</strong>
                </div>
                <p>{{ group.description }}</p>
              </div>
              <span class="count-pill">{{ group.count }}</span>
            </div>

            <div v-if="actionItem(group)" class="next-inline">
              <span>下一条</span>
              <button type="button" @click="openItem(actionItem(group))">
                {{ itemTitle(actionItem(group)) }}
              </button>
            </div>

            <ul v-if="group.items.length" class="preview-list">
              <li v-for="item in group.items" :key="item.id">
                <button type="button" @click="openItem(item)">
                  {{ itemTitle(item) }}
                </button>
                <small>{{ itemMeta(item) }}</small>
              </li>
            </ul>

            <div class="action-row">
              <button type="button" :disabled="!actionItem(group)" @click="openItem(actionItem(group))">
                打开下一条
              </button>
              <button
                type="button"
                :disabled="!actionItem(group) || busyKey === `group-next-${group.type}`"
                @click="markReady(actionItem(group) ? [actionItem(group)!.id] : [], `group-next-${group.type}`)"
              >
                {{ busyKey === `group-next-${group.type}` ? '处理中' : '标记下一条就绪' }}
              </button>
              <button
                type="button"
                :disabled="!groupIds(group).length || busyKey === `group-batch-${group.type}`"
                @click="markReady(groupIds(group), `group-batch-${group.type}`)"
              >
                {{ busyKey === `group-batch-${group.type}` ? '处理中' : '批量标记就绪' }}
              </button>
            </div>
          </article>
        </div>
        <p v-else class="empty-line">当前工作台没有待处理条目。</p>
      </section>
    </section>

    <section v-if="lastMarked.length" class="panel changed-panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Last Action</p>
          <h2>刚处理的记录</h2>
        </div>
        <strong>{{ lastMarked.length }}</strong>
      </div>
      <div class="changed-list">
        <article v-for="item in lastMarked" :key="item.id" class="changed-row">
          <div>
            <strong>{{ itemTitle(item) }}</strong>
            <p>{{ itemMeta(item) }}</p>
          </div>
          <div class="action-row">
            <button type="button" @click="openItem(item)">打开</button>
            <button
              type="button"
              :disabled="busyKey === `pending-${item.id}`"
              @click="markPending([item.id], `pending-${item.id}`)"
            >
              {{ busyKey === `pending-${item.id}` ? '处理中' : '退回待处理' }}
            </button>
          </div>
        </article>
      </div>
    </section>

    <ItemDrawer :item-id="selectedItemId" @close="selectedItemId = null" @changed="onDrawerChanged" />
  </main>
</template>

<style scoped>
.processing-view {
  min-height: 100vh;
  padding: calc(var(--s-10) + 12px) clamp(var(--s-4), 5vw, var(--s-10)) var(--s-8);
  color: var(--text-1);
  background:
    radial-gradient(circle at 20% 8%, rgba(108, 142, 170, 0.14), transparent 28%),
    linear-gradient(180deg, rgba(246, 241, 232, 0.035), transparent 32%),
    var(--bg);
}

.topbar,
.panel-head,
.group-head,
.action-row,
.next-body,
.changed-row {
  display: flex;
  align-items: center;
}

.topbar {
  justify-content: space-between;
  gap: var(--s-4);
  margin-bottom: var(--s-5);
}

.eyebrow {
  margin: 0 0 var(--s-1);
  color: var(--text-4);
  font-size: var(--fs-1);
  text-transform: uppercase;
  letter-spacing: 0;
}

h1,
h2,
p {
  margin: 0;
}

h1 {
  font-size: clamp(1.9rem, 3vw, 2.8rem);
  font-weight: 700;
}

h2 {
  font-size: var(--fs-5);
}

.refresh-btn,
button {
  border: 1px solid var(--border-2);
  border-radius: var(--r-2);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-1);
  cursor: pointer;
  transition: border-color var(--t-base) var(--ease), background var(--t-base) var(--ease), transform var(--t-fast) var(--ease);
}

button {
  padding: var(--s-2) var(--s-3);
  font-size: var(--fs-2);
}

button:hover:not(:disabled) {
  border-color: var(--accent);
  background: rgba(255, 255, 255, 0.08);
}

button:active:not(:disabled) {
  transform: translateY(1px);
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.refresh-btn {
  padding: var(--s-2) var(--s-4);
}

.notice {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-3);
  margin-bottom: var(--s-4);
  padding: var(--s-3) var(--s-4);
  border: 1px solid var(--border-2);
  border-radius: var(--r-2);
}

.error-row {
  border-color: rgba(210, 96, 96, 0.42);
  color: #ffc1b8;
  background: rgba(132, 43, 43, 0.16);
}

.feedback-row {
  border-color: rgba(97, 151, 126, 0.42);
  color: #cbe8d7;
  background: rgba(45, 105, 72, 0.16);
}

.metrics {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--s-3);
  margin-bottom: var(--s-5);
}

.metrics article,
.panel {
  border: 1px solid var(--border-1);
  border-radius: var(--r-3);
  background: rgba(255, 255, 255, 0.055);
  box-shadow: var(--shadow-1);
}

.metrics article {
  padding: var(--s-4);
}

.metrics span,
.metrics small {
  display: block;
  color: var(--text-4);
}

.metrics strong {
  display: block;
  margin: var(--s-2) 0;
  font-size: var(--fs-7);
}

.metrics .urgent strong {
  color: #f0b6a0;
}

.queue-grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.8fr) minmax(0, 1.6fr);
  gap: var(--s-4);
}

.panel {
  padding: var(--s-4);
}

.panel-head {
  justify-content: space-between;
  gap: var(--s-4);
  margin-bottom: var(--s-4);
}

.state-pill,
.count-pill {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 var(--s-3);
  border: 1px solid var(--border-2);
  border-radius: 999px;
  color: var(--text-3);
  font-size: var(--fs-1);
}

.next-panel.empty {
  opacity: 0.78;
}

.next-body {
  align-items: flex-start;
  gap: var(--s-3);
  margin-bottom: var(--s-4);
}

.next-body strong,
.changed-row strong {
  display: block;
  margin-bottom: var(--s-1);
}

.next-body p,
.group-card p,
.changed-row p,
.preview-list small {
  color: var(--text-4);
  font-size: var(--fs-2);
}

.type-dot {
  display: inline-block;
  flex: 0 0 auto;
  width: 9px;
  height: 9px;
  margin-top: 7px;
  border-radius: 50%;
  box-shadow: 0 0 14px currentColor;
}

.action-row {
  flex-wrap: wrap;
  gap: var(--s-2);
}

.group-list,
.changed-list {
  display: grid;
  gap: var(--s-3);
}

.group-card,
.changed-row {
  border: 1px solid var(--border-1);
  border-radius: var(--r-2);
  background: rgba(0, 0, 0, 0.12);
}

.group-card {
  padding: var(--s-4);
}

.group-head {
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--s-4);
}

.row-title {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  margin-bottom: var(--s-1);
}

.row-title .type-dot {
  margin-top: 0;
}

.next-inline {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  align-items: center;
  gap: var(--s-2);
  margin: var(--s-3) 0;
}

.next-inline span {
  color: var(--text-4);
  font-size: var(--fs-1);
}

.next-inline button,
.preview-list button {
  width: 100%;
  padding: 0;
  overflow: hidden;
  border: 0;
  background: transparent;
  color: var(--text-2);
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview-list {
  display: grid;
  gap: var(--s-2);
  margin: 0 0 var(--s-3);
  padding: 0;
  list-style: none;
}

.preview-list li {
  display: grid;
  gap: 2px;
  padding: var(--s-2) 0;
  border-top: 1px solid var(--border-1);
}

.changed-panel {
  margin-top: var(--s-4);
}

.changed-row {
  justify-content: space-between;
  gap: var(--s-4);
  padding: var(--s-3);
}

.empty-line {
  color: var(--text-4);
}

@media (max-width: 980px) {
  .metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .queue-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .processing-view {
    padding-top: calc(var(--s-10) + var(--s-8));
  }

  .topbar,
  .changed-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .metrics {
    grid-template-columns: 1fr;
  }
}
</style>
