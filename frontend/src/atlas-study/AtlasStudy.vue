<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { ArrowRight, ArrowUpRight, Bookmark, Check, History, Search, X, CornerDownLeft, Link2, CircleHelp } from '@lucide/vue';
import AtlasMap from './AtlasMap.vue';
import KnowledgeBoard from './KnowledgeBoard.vue';
import { deltaImage, materials, regions, relations } from './data';
import { parseStudyLocation, searchMaterials } from './model';
import type { RegionId } from './model';

const initial = parseStudyLocation(location.search, materials);
const selected = ref<string | null>(initial.focus);
const board = ref(initial.board);
const region = ref<RegionId | null>(null);
const modal = ref<'search' | 'history' | null>(null);
const query = ref('');
const searchInput = ref<HTMLInputElement | null>(null);
const dialog = ref<HTMLElement | null>(null);
const detailPane = ref<HTMLElement | null>(null);
const rejected = ref(false);
const saved = ref(false);
const toast = ref('');
const imageFailed = ref(false);
const compactScreen = ref(matchMedia('(max-width: 649px)').matches);
const recent = ref<string[]>([]);
const storageKey = 'axiom.atlas-study.v1';
const active = computed(() => materials.find(item => item.id === selected.value));
const area = computed(() => regions.find(item => item.id === active.value?.region));
const matches = computed(() => searchMaterials(query.value, materials));
const activeRelations = computed(() => relations.filter(edge => edge.from === selected.value || edge.to === selected.value));
const kinds = { question: '一个问题', note: '一段记录', research: '外部研究', image: '影像材料', hypothesis: '待检验的想法' };
let returnFocus: HTMLElement | null = null;
let toastTimer: ReturnType<typeof setTimeout>;
const screenQuery = matchMedia('(max-width: 649px)');
function updateScreen() { compactScreen.value = screenQuery.matches; }

function persist() {
  try { localStorage.setItem(storageKey, JSON.stringify({ saved: saved.value, rejected: rejected.value, recent: recent.value })); }
  catch { notify('浏览器未允许保存，本次探索仍可继续。'); }
}
function notify(message: string) { clearTimeout(toastTimer); toast.value = message; toastTimer = setTimeout(() => toast.value = '', 3200); }
function setLocation() {
  const url = new URL(location.href);
  url.searchParams.delete('focus'); url.searchParams.delete('view');
  if (selected.value) url.searchParams.set('focus', selected.value);
  if (board.value) url.searchParams.set('view', 'board');
  history.pushState({}, '', url);
}
function readLocation() { const state = parseStudyLocation(location.search, materials); selected.value = state.focus; board.value = state.board; }
function remember(id: string) { recent.value = [id, ...recent.value.filter(item => item !== id)].slice(0, 12); persist(); }
async function select(id: string) {
  if (!materials.some(item => item.id === id)) return;
  selected.value = id; board.value = false; region.value = null; modal.value = null;
  remember(id); setLocation();
  await nextTick(); detailPane.value?.focus({ preventScroll: true });
}
async function goBack() {
  const previous = selected.value;
  if (board.value) board.value = false;
  else { selected.value = null; region.value = null; }
  setLocation(); await nextTick();
  if (selected.value) detailPane.value?.focus({ preventScroll: true });
  else if (previous) document.querySelector<HTMLButtonElement>(`.map-material[aria-label="${materials.find(item => item.id === previous)?.title.replace('\n', '')}"]`)?.focus({ preventScroll: true });
}
function enterBoard() { selected.value = 'unfinished'; board.value = true; setLocation(); window.scrollTo(0, 0); }
function toggleSaved() { saved.value = !saved.value; persist(); notify(saved.value ? '已留在「待验证」中' : '已取消留存'); }
function toggleRejected() { rejected.value = !rejected.value; persist(); notify(rejected.value ? '已标记异议，依据仍然保留' : '已撤回异议'); }
async function openModal(kind: 'search' | 'history') {
  returnFocus = document.activeElement as HTMLElement;
  modal.value = kind; query.value = ''; await nextTick();
  if (kind === 'search') searchInput.value?.focus();
  else dialog.value?.querySelector<HTMLButtonElement>('button')?.focus();
}
function closeModal() { modal.value = null; returnFocus?.focus(); }
function keydown(event: KeyboardEvent) {
  if (event.key === 'Escape') { if (modal.value) closeModal(); else if (selected.value) void goBack(); return; }
  if (modal.value && event.key === 'Tab') {
    const elements = [...(dialog.value?.querySelectorAll<HTMLElement>('button:not([disabled]), input, a[href]') || [])];
    const first = elements[0], last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  if ((event.key === '/' || ((event.ctrlKey || event.metaKey) && event.key === 'k')) && !(event.target instanceof HTMLInputElement)) {
    event.preventDefault(); void openModal('search');
  }
}
onMounted(() => {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
    saved.value = stored.saved === true; rejected.value = stored.rejected === true;
    if (Array.isArray(stored.recent)) recent.value = stored.recent.filter((id: unknown) => materials.some(item => item.id === id)).slice(0, 12);
  } catch { /* A corrupt preview preference must never prevent opening the sample. */ }
  addEventListener('popstate', readLocation); addEventListener('keydown', keydown);
  screenQuery.addEventListener('change', updateScreen);
});
onBeforeUnmount(() => { removeEventListener('popstate', readLocation); removeEventListener('keydown', keydown); screenQuery.removeEventListener('change', updateScreen); clearTimeout(toastTimer); });
</script>

<template>
  <div class="atlas-study" :class="{ 'board-is-open': board }">
    <header class="study-header">
      <a href="/app" class="wordmark" aria-label="Axiom 日常入口">axiom<span class="wordmark-period">.</span></a>
      <div class="header-location"><span class="header-divider"></span><button type="button" @click="selected = null; board = false; region = null; setLocation()">Atlas</button><span class="demo-label">演示</span></div>
      <nav aria-label="Atlas 导航">
        <button class="header-command" type="button" aria-label="查找" @click="openModal('search')"><Search :size="18" /><span>查找</span></button>
        <button class="header-command" type="button" aria-label="最近看过" @click="openModal('history')"><History :size="18" /><span>最近看过</span></button>
        <a href="/app" class="daily-link">回到此刻 <ArrowUpRight :size="15" /></a>
      </nav>
    </header>

    <KnowledgeBoard v-show="board" :saved="saved" :rejected="rejected" @back="goBack" @save="toggleSaved" @reject="toggleRejected" />
    <main v-show="!board" class="atlas-overview">
      <div class="map-topline">
        <div class="map-title"><h1>Atlas</h1></div>
        <div v-if="!selected" class="region-selector"><label for="region-select">所在领域</label><select id="region-select" :value="region || (compactScreen ? 'practice' : '')" @change="region = (($event.target as HTMLSelectElement).value || null) as RegionId | null; selected = null; setLocation()"><option v-if="!compactScreen" value="">全部领域</option><option v-for="item in regions" :key="item.id" :value="item.id">{{ item.title }}</option></select></div>
      </div>
      <AtlasMap :selected="selected" :region="region" :rejected="rejected" @select="select" />
      <aside v-if="active" ref="detailPane" tabindex="-1" class="material-detail" aria-label="认识详情">
        <div class="detail-top"><span class="eyebrow">{{ area?.title }}</span><button class="icon-button" type="button" aria-label="关闭详情" title="关闭详情" @click="goBack"><X :size="20" /></button></div>
        <div class="detail-kind"><span :class="['status-dot', `tone-${active.region}`]"></span>{{ kinds[active.kind] }}</div>
        <h2>{{ active.title }}</h2>
        <p class="detail-summary">{{ active.summary }}</p>
        <div class="detail-source">{{ active.provenance }}</div>
        <img v-if="active.id === 'delta' && !imageFailed" class="detail-image" :src="deltaImage" alt="勒拿河三角洲卫星影像，NASA / USGS" @error="imageFailed = true" />
        <p class="detail-body">{{ active.detail }}</p>
        <a v-if="active.source" class="source-link" :href="active.source" target="_blank" rel="noreferrer">查看原始来源 <ArrowUpRight :size="16" /></a>
        <button v-if="active.id === 'unfinished'" class="primary-command" type="button" @click="enterBoard">把这个问题展开 <ArrowRight :size="19" /></button>
        <div class="detail-relations"><h3><Link2 :size="15" />相关线索</h3>
          <article v-for="edge in activeRelations" :key="edge.id" class="relation-item" :class="edge.kind">
            <button type="button" @click="select(edge.from === selected ? edge.to : edge.from)">{{ materials.find(item => item.id === (edge.from === selected ? edge.to : edge.from))?.title.replace('\n', '') }}<ArrowUpRight :size="14" /></button>
            <span v-if="edge.kind === 'hypothesis'" class="relation-state">{{ rejected && edge.id === 'limit-wip' ? '已标记异议' : '尚待验证' }}</span>
            <p>{{ edge.statement }}</p>
          </article>
        </div>
        <div v-if="active.id === 'unfinished' || active.id === 'little'" class="detail-actions"><button class="quiet-command" type="button" @click="toggleRejected"><CircleHelp :size="16" />{{ rejected ? '撤回异议' : '这条迁移联系有问题' }}</button></div>
      </aside>
      <footer class="map-bottomline">
        <button class="discovery-invitation" type="button" @click="select('unfinished')"><span class="invitation-label"><span class="status-dot"></span>{{ rejected ? '一条有异议的联系' : saved ? '一条留待验证的联系' : '一条值得停留的联系' }}</span><span class="invitation-text">并行数量，也许比投入时长更值得观察。</span><ArrowRight :size="20" /></button>
        <span class="sample-note">20 个认识片段<span>演示资料 · 不含个人数据</span></span>
      </footer>
    </main>

    <div v-if="modal" class="dialog-backdrop" @click.self="closeModal">
      <section ref="dialog" class="search-dialog" role="dialog" aria-modal="true" :aria-label="modal === 'search' ? '查找认识' : '最近看过'">
        <div class="dialog-top"><h2>{{ modal === 'search' ? '查找认识' : '最近看过' }}</h2><button class="icon-button" type="button" aria-label="关闭窗口" @click="closeModal"><X :size="20" /></button></div>
        <div v-if="modal === 'search'" class="search-field"><Search :size="21" /><input ref="searchInput" v-model="query" aria-label="查找内容" placeholder="一个问题、一段话、一个想法" @keydown.enter="matches[0] && select(matches[0].id)" /><CornerDownLeft :size="17" /></div>
        <div class="search-results">
          <template v-if="modal === 'search'">
            <button v-for="item in matches" :key="item.id" type="button" @click="select(item.id)"><span><strong>{{ item.title.replace('\n', '') }}</strong><small>{{ item.provenance }}</small></span><ArrowUpRight :size="17" /></button>
            <p v-if="!matches.length" class="empty-state">没有找到“{{ query }}”相关的内容。</p>
          </template>
          <template v-else>
            <button v-if="saved" type="button" @click="select('unfinished')"><span><strong><Bookmark :size="15" /> 开始得更多，为何完成得更少？</strong><small>留待验证</small></span><ArrowUpRight :size="17" /></button>
            <button v-for="id in recent" :key="id" type="button" @click="select(id)"><span><strong>{{ materials.find(item => item.id === id)?.title.replace('\n', '') }}</strong><small>本地探索记录</small></span><ArrowUpRight :size="17" /></button>
            <p v-if="!recent.length && !saved" class="empty-state">还没有浏览记录。</p>
          </template>
        </div>
      </section>
    </div>
    <div v-if="toast" class="study-toast" role="status"><Check :size="16" />{{ toast }}</div>
  </div>
</template>
