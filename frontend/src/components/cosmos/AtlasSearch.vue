<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCosmosStore } from '@/stores/cosmos'

interface SearchResult {
  id: string
  kind: string
  title: string
  path: string
  layer: number
}

const LS_KEY = 'atlas_recent_searches'
const MAX_RECENT = 5

function loadRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] }
}
function saveRecent(terms: string[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(terms))
}

const recentSearches = ref<string[]>(loadRecent())

function addRecent(term: string) {
  const t = term.trim()
  if (!t) return
  const list = loadRecent().filter(x => x !== t)
  list.unshift(t)
  const trimmed = list.slice(0, MAX_RECENT)
  saveRecent(trimmed)
  recentSearches.value = trimmed
}

function clearRecent() {
  localStorage.removeItem(LS_KEY)
  recentSearches.value = []
}

function useRecent(term: string) {
  query.value = term
  addRecent(term)
  inputEl.value?.focus()
}

const store = useCosmosStore()

const query = ref('')
const selectedIdx = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)

const results = computed<SearchResult[]>(() => {
  const q = query.value.trim().toLowerCase()
  if (!q || !store.data) return []

  const list: SearchResult[] = []

  for (const e of store.data.entities) {
    if (e.title.toLowerCase().includes(q)) {
      list.push({ id: e.id, kind: e.kind, title: e.title, path: buildLifelinePath(e.lifeline_id), layer: 3 })
    }
  }

  for (const l of store.data.lifelines) {
    if (l.name.toLowerCase().includes(q)) {
      const layer = l.parent_id === 'ROOT' ? 1 : 2
      const parent = store.data.lifelines.find(p => p.id === l.parent_id)
      const path = parent ? parent.name : '根级 lifeline'
      list.push({ id: l.id, kind: 'lifeline', title: l.name, path, layer })
    }
  }

  list.sort((a, b) => {
    const aExact = a.title.toLowerCase() === q ? 0 : a.title.toLowerCase().startsWith(q) ? 1 : 2
    const bExact = b.title.toLowerCase() === q ? 0 : b.title.toLowerCase().startsWith(q) ? 1 : 2
    return aExact - bExact || a.title.length - b.title.length
  })

  return list.slice(0, 8)
})

function buildLifelinePath(lifelineId: string): string {
  if (!store.data) return ''
  const parts: string[] = []
  let cur = store.data.lifelines.find(l => l.id === lifelineId)
  while (cur) {
    parts.unshift(cur.name)
    const pid = cur?.parent_id
    cur = pid ? store.data.lifelines.find(l => l.id === pid) : undefined
  }
  if (parts.length >= 2) return `${parts[parts.length - 1]} · ${parts[0]}`
  return parts.join(' · ')
}

function kindBadge(kind: string): string {
  return kind === 'lifeline' ? 'L' : kind[0].toUpperCase()
}

function selectResult(result: SearchResult) {
  addRecent(query.value)
  emit('select', result)
  emit('close')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIdx.value = Math.min(selectedIdx.value + 1, results.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIdx.value = Math.max(selectedIdx.value - 1, 0)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (results.value[selectedIdx.value]) {
      selectResult(results.value[selectedIdx.value])
    }
  } else if (e.key === 'Escape') {
    e.preventDefault()
    emit('close')
  }
}

const emit = defineEmits<{
  (e: 'select', result: SearchResult): void
  (e: 'close'): void
}>()

onMounted(() => {
  inputEl.value?.focus()
})
</script>

<template>
  <div class="atlas-search">
    <input
      ref="inputEl"
      v-model="query"
      class="search-input"
      placeholder="搜索 entity 或 lifeline…"
      @keydown="onKeydown"
    />

    <div v-if="query.trim()" class="results">
      <div v-if="results.length === 0" class="no-results">无匹配结果</div>
      <div
        v-for="(r, i) in results"
        :key="r.id"
        class="result-row"
        :class="{ selected: i === selectedIdx }"
        @click="selectResult(r)"
      >
        <span class="result-kind">{{ kindBadge(r.kind) }}</span>
        <div class="result-info">
          <div class="result-title">{{ r.title }}</div>
          <div class="result-path">{{ r.path }}</div>
        </div>
      </div>
    </div>

    <div v-else-if="recentSearches.length > 0" class="recent">
      <div class="recent-title">最近搜索</div>
      <div v-for="(s, i) in recentSearches" :key="i" class="recent-row" @click="useRecent(s)">{{ s }}</div>
      <button class="recent-clear" @click="clearRecent">清除历史</button>
    </div>
  </div>
</template>

<style scoped>
.atlas-search {
  width: 280px;
  background: var(--surface-1);
  border-radius: var(--r-2);
  overflow: hidden;
}

.search-input {
  width: 100%;
  box-sizing: border-box;
  padding: var(--s-1) var(--s-2);
  background: var(--surface-2);
  border: none;
  border-bottom: 1px solid var(--line-1);
  color: var(--text-1);
  font-size: var(--fs-2);
  outline: none;
}

.search-input::placeholder {
  color: var(--text-4);
}

.results {
  max-height: 320px;
  overflow-y: auto;
}

.no-results {
  padding: var(--s-2);
  color: var(--text-4);
  font-size: var(--fs-1);
  text-align: center;
}

.result-row {
  display: flex;
  align-items: flex-start;
  gap: var(--s-1);
  padding: var(--s-1) var(--s-2);
  cursor: pointer;
}

.result-row:hover,
.result-row.selected {
  background: var(--surface-2);
}

.result-kind {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: var(--r-1);
  flex-shrink: 0;
  margin-top: 1px;
}

.result-info {
  flex: 1;
  min-width: 0;
}

.result-title {
  font-size: var(--fs-2);
  color: var(--text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-path {
  font-size: var(--fs-1);
  color: var(--text-4);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent {
  padding: var(--s-2);
}

.recent-title {
  font-size: var(--fs-1);
  color: var(--text-4);
  margin-bottom: var(--s-1);
}

.recent-row {
  font-size: var(--fs-2);
  color: var(--text-3);
  padding: 4px var(--s-1);
  cursor: pointer;
  border-radius: var(--r-1);
}

.recent-row:hover { background: var(--surface-2); color: var(--text-1); }

.recent-clear {
  background: none; border: none;
  color: var(--text-5);
  font-size: var(--fs-1);
  cursor: pointer;
  padding: var(--s-1);
  margin-top: var(--s-1);
}
</style>
