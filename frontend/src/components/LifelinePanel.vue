<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCosmosStore } from '@/stores/cosmos'
import type { CosmosLifeline, CosmosEntity } from '@/cosmos/types'

const emit = defineEmits<{
  (e: 'focus-lifeline', lifelineId: string): void
  (e: 'focus-entity', entityId: string): void
}>()

const store = useCosmosStore()

const activeLifelineId = computed<string | null>(() => {
  const s = store.state
  if (s.kind === 'region_zoom') return (s as any).lifeline_id ?? null
  if (s.kind === 'node_focus' || s.kind === 'relation_reveal') {
    return store.data?.entities.find(e => e.id === (s as any).entity_id)?.lifeline_id ?? null
  }
  return null
})

const activeEntityId = computed<string | null>(() => {
  const s = store.state
  if (s.kind === 'node_focus' || s.kind === 'relation_reveal') return (s as any).entity_id ?? null
  return null
})

const stats = computed(() => {
  if (!store.data) return { lifelines: 0, entities: 0, byKind: { task: 0, memory: 0, decision: 0, item: 0 } }
  const byKind = { task: 0, memory: 0, decision: 0, item: 0 }
  for (const e of store.data.entities) {
    if (byKind[e.kind] !== undefined) byKind[e.kind]++
  }
  return { lifelines: store.data.lifelines.length, entities: store.data.entities.length, byKind }
})

function entityCountsByKind(lifelineId: string) {
  const byKind = { task: 0, memory: 0, decision: 0, item: 0 }
  if (!store.data) return byKind
  for (const e of store.data.entities) {
    if (e.lifeline_id === lifelineId && byKind[e.kind] !== undefined) byKind[e.kind]++
  }
  return byKind
}

const expandedIds = ref<Set<string>>(new Set())
const creating = ref(false)
const editingId = ref<string | null>(null)
const deletingId = ref<string | null>(null)
const searchLifelineId = ref<string | null>(null)
const searchQuery = ref('')
const searchResults = ref<Array<{ id: string; kind: string; title: string; lifeline_id?: string; mounted_name?: string }>>([])
const searchLoading = ref(false)

const newId = ref('')
const newName = ref('')
const newParent = ref('ROOT')
const editName = ref('')

// 树结构
interface TreeNode {
  lifeline: CosmosLifeline
  children: TreeNode[]
  depth: number
}

const tree = computed<TreeNode[]>(() => {
  if (!store.data) return []
  const lifelines = store.data.lifelines
  const byParent: Record<string, CosmosLifeline[]> = {}
  for (const ll of lifelines) {
    const pid = ll.parent_id
    if (!byParent[pid]) byParent[pid] = []
    byParent[pid].push(ll)
  }

  function build(parentId: string, depth: number): TreeNode[] {
    const children = byParent[parentId] || []
    return children.map(ll => ({
      lifeline: ll,
      children: build(ll.id, depth + 1),
      depth,
    }))
  }

  return build('ROOT', 0)
})

function entityCount(lifelineId: string): number {
  if (!store.data) return 0
  return store.data.entities.filter(e => e.lifeline_id === lifelineId).length
}

function entitiesFor(lifelineId: string): CosmosEntity[] {
  if (!store.data) return []
  return store.data.entities.filter(e => e.lifeline_id === lifelineId)
}

function toggleExpand(id: string) {
  if (expandedIds.value.has(id)) {
    expandedIds.value.delete(id)
  } else {
    expandedIds.value.add(id)
  }
}

function isExpanded(id: string): boolean {
  return expandedIds.value.has(id)
}

function isCurrentLifeline(id: string): boolean {
  return activeLifelineId.value === id
}

function clickLifeline(id: string) {
  emit('focus-lifeline', id)
}

async function doCreate() {
  if (!newId.value.trim() || !newName.value.trim()) return
  await store.createLifeline({
    id: newId.value.trim(),
    name: newName.value.trim(),
    parent_id: newParent.value === 'ROOT' ? undefined : newParent.value,
  })
  newId.value = ''
  newName.value = ''
  newParent.value = 'ROOT'
  creating.value = false
}

function startEdit(ll: CosmosLifeline) {
  editingId.value = ll.id
  editName.value = ll.name
}

async function doEdit(ll: CosmosLifeline) {
  if (editName.value.trim() && editName.value !== ll.name) {
    await store.updateLifeline(ll.id, { name: editName.value.trim() })
  }
  editingId.value = null
}

function cancelEdit() {
  editingId.value = null
}

async function doDelete(ll: CosmosLifeline) {
  await store.deleteLifeline(ll.id)
  deletingId.value = null
}

async function unmountEntity(entity: CosmosEntity) {
  const parts = entity.id.split(':')
  const kind = parts[0]
  const rawId = parseInt(parts.slice(1).join(':'), 10)
  await store.mountEntity(kind, rawId, null)
}

async function openSearch(lifelineId: string) {
  searchLifelineId.value = lifelineId
  searchQuery.value = ''
  searchResults.value = []
}

async function doSearch() {
  const q = searchQuery.value.trim()
  if (!q || q.length < 1) return
  searchLoading.value = true
  try {
    const { searchAll } = await import('@/api/endpoints')
    const resp = await searchAll(q, 5)
    const flat: Array<{ id: string; kind: string; title: string; lifeline_id?: string; mounted_name?: string }> = []
    for (const item of resp.items || []) {
      const eid = `item:${(item as any).id}`
      const ent = store.data?.entities.find(e => e.id === eid)
      flat.push({ id: eid, kind: 'item', title: (item as any).content?.slice(0, 60) || '', lifeline_id: ent?.lifeline_id, mounted_name: ent?.lifeline_id ? (store.data?.lifelines.find(l => l.id === ent.lifeline_id)?.name || ent.lifeline_id) : undefined })
    }
    for (const t of resp.tasks || []) {
      const eid = `task:${(t as any).id}`
      const ent = store.data?.entities.find(e => e.id === eid)
      flat.push({ id: eid, kind: 'task', title: (t as any).title?.slice(0, 60) || '', lifeline_id: ent?.lifeline_id, mounted_name: ent?.lifeline_id ? (store.data?.lifelines.find(l => l.id === ent.lifeline_id)?.name || ent.lifeline_id) : undefined })
    }
    for (const m of resp.memories || []) {
      const eid = `memory:${(m as any).id}`
      const ent = store.data?.entities.find(e => e.id === eid)
      flat.push({ id: eid, kind: 'memory', title: (m as any).content?.slice(0, 60) || '', lifeline_id: ent?.lifeline_id, mounted_name: ent?.lifeline_id ? (store.data?.lifelines.find(l => l.id === ent.lifeline_id)?.name || ent.lifeline_id) : undefined })
    }
    for (const d of resp.decisions || []) {
      const eid = `decision:${(d as any).id}`
      const ent = store.data?.entities.find(e => e.id === eid)
      flat.push({ id: eid, kind: 'decision', title: (d as any).title?.slice(0, 60) || '', lifeline_id: ent?.lifeline_id, mounted_name: ent?.lifeline_id ? (store.data?.lifelines.find(l => l.id === ent.lifeline_id)?.name || ent.lifeline_id) : undefined })
    }
    searchResults.value = flat
  } finally {
    searchLoading.value = false
  }
}

async function mountSearchResult(item: { id: string; kind: string }) {
  if (!searchLifelineId.value) return
  const parts = item.id.split(':')
  const kind = parts[0]
  const rawId = parseInt(parts.slice(1).join(':'), 10)
  await store.mountEntity(kind, rawId, searchLifelineId.value)
  searchLifelineId.value = null
  searchResults.value = []
}

function cancelSearch() {
  searchLifelineId.value = null
  searchResults.value = []
}

function parentOptions(): Array<{ id: string; name: string }> {
  if (!store.data) return [{ id: 'ROOT', name: 'ROOT (根级)' }]
  return [
    { id: 'ROOT', name: 'ROOT (根级)' },
    ...store.data.lifelines.map(ll => ({ id: ll.id, name: ll.name })),
  ]
}
</script>

<template>
  <div class="lifeline-panel" v-if="store.data">
    <!-- 头部 -->
    <div class="panel-header">
      <span class="panel-title">Lifeline</span>
      <button class="btn-text" @click="creating = !creating">+ 新建</button>
    </div>

    <div class="stats-row">
      <span class="stats-count">{{ stats.lifelines }} lifeline · {{ stats.entities }} entity</span>
      <span class="stats-kinds">
        <span class="kind-t">T:{{ stats.byKind.task }}</span>
        <span class="kind-m">M:{{ stats.byKind.memory }}</span>
        <span class="kind-d">D:{{ stats.byKind.decision }}</span>
        <span class="kind-i">I:{{ stats.byKind.item }}</span>
      </span>
    </div>

    <!-- 新建表单 -->
    <div v-if="creating" class="inline-form">
      <input
        v-model="newId"
        class="field"
        placeholder="ID (英文短名)"
        @keyup.enter="doCreate"
      />
      <input
        v-model="newName"
        class="field"
        placeholder="显示名称"
        @keyup.enter="doCreate"
      />
      <select v-model="newParent" class="field">
        <option v-for="p in parentOptions()" :key="p.id" :value="p.id">{{ p.name }}</option>
      </select>
      <div class="form-actions">
        <button class="btn-text" @click="doCreate">保存</button>
        <button class="btn-text" @click="creating = false">取消</button>
      </div>
    </div>

    <!-- 树 -->
    <div class="tree">
      <template v-for="node in tree" :key="node.lifeline.id">
        <div
          class="tree-row"
          :style="{ paddingLeft: (node.depth * 16 + 4) + 'px' }"
          :class="{ active: isCurrentLifeline(node.lifeline.id) }"
        >
          <!-- 展开箭头 -->
          <span
            class="arrow"
            @click="toggleExpand(node.lifeline.id)"
          >{{ isExpanded(node.lifeline.id) ? '▼' : '▶' }}</span>

          <!-- 名称 + badge -->
          <span class="name" @click="clickLifeline(node.lifeline.id)">
            {{ node.lifeline.name }}
            <template v-if="isExpanded(node.lifeline.id)">
              <span class="kind-t">T:{{ entityCountsByKind(node.lifeline.id).task }}</span>
              <span class="kind-m">M:{{ entityCountsByKind(node.lifeline.id).memory }}</span>
              <span class="kind-d">D:{{ entityCountsByKind(node.lifeline.id).decision }}</span>
              <span class="kind-i">I:{{ entityCountsByKind(node.lifeline.id).item }}</span>
            </template>
            <span class="badge">({{ entityCount(node.lifeline.id) }})</span>
          </span>

          <!-- 操作按钮 -->
          <span class="actions">
            <button
              v-if="editingId !== node.lifeline.id"
              class="btn-icon"
              @click.stop="startEdit(node.lifeline)"
            >...</button>
          </span>
        </div>

        <!-- 编辑行 -->
        <div v-if="editingId === node.lifeline.id" class="inline-edit" :style="{ paddingLeft: (node.depth * 16 + 20) + 'px' }">
          <input
            v-model="editName"
            class="field"
            @keyup.enter="doEdit(node.lifeline)"
            @keyup.esc="cancelEdit"
          />
          <div class="form-actions">
            <button class="btn-text" @click="doEdit(node.lifeline)">保存</button>
            <button class="btn-text" @click="cancelEdit">取消</button>
            <button
              v-if="deletingId !== node.lifeline.id"
              class="btn-text danger"
              @click="deletingId = node.lifeline.id"
            >删除</button>
          </div>
          <!-- 删除确认 -->
          <div v-if="deletingId === node.lifeline.id" class="confirm-delete">
            确定删除「{{ node.lifeline.name }}」？挂载的 {{ entityCount(node.lifeline.id) }} 个 entity 将被卸载。
            <div class="form-actions">
              <button class="btn-text danger" @click="doDelete(node.lifeline)">确认删除</button>
              <button class="btn-text" @click="deletingId = null">取消</button>
            </div>
          </div>
        </div>

        <!-- 展开的 entity 列表 -->
        <template v-if="isExpanded(node.lifeline.id)">
          <div
            v-for="ent in entitiesFor(node.lifeline.id)"
            :key="ent.id"
            class="entity-row"
            :class="{ active: activeEntityId === ent.id }"
            :style="{ paddingLeft: (node.depth * 16 + 28) + 'px' }"
            @click="emit('focus-entity', ent.id)"
          >
            <span class="entity-kind">{{ ent.kind[0].toUpperCase() }}</span>
            <span class="entity-title">{{ ent.title.slice(0, 30) }}</span>
            <button class="btn-icon" @click.stop="unmountEntity(ent)" title="卸载">×</button>
          </div>
          <div
            class="entity-row add-entity"
            :style="{ paddingLeft: (node.depth * 16 + 28) + 'px' }"
          >
            <button class="btn-text" @click="openSearch(node.lifeline.id)">+ 关联 entity</button>
          </div>
        </template>
      </template>
    </div>

    <!-- 空状态 -->
    <div v-if="tree.length === 0 && !creating" class="empty">
      <div class="empty-icon">◇</div>
      <div class="empty-title">暂无 Lifeline</div>
      <div class="empty-desc">
        Lifeline 是实体分类的主线，例如"健康""学习""工作"。<br />
        创建后实体将分布在 3D 球面上。
      </div>
      <button class="btn-text" @click="creating = true">+ 创建第一个 Lifeline</button>
    </div>

    <!-- 搜索弹窗 -->
    <div v-if="searchLifelineId" class="search-overlay" @click.self="cancelSearch">
      <div class="search-box">
        <input
          v-model="searchQuery"
          class="field"
          placeholder="搜索 entity..."
          @keyup.enter="doSearch"
        />
        <button class="btn-text" @click="doSearch">搜索</button>
        <div v-if="searchLoading" class="loading-text">搜索中...</div>
        <div v-else class="search-results">
          <div v-if="searchResults.length === 0 && searchQuery" class="loading-text">无结果</div>
          <div
            v-for="r in searchResults"
            :key="r.id"
            class="search-row"
            :class="{ mounted: r.mounted_name }"
            @click="r.mounted_name ? null : mountSearchResult(r)"
          >
            <span class="entity-kind">{{ r.kind[0].toUpperCase() }}</span>
            <span class="entity-title">{{ r.title.slice(0, 40) }}</span>
            <span v-if="r.mounted_name" class="mounted-tag">已归类到 {{ r.mounted_name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lifeline-panel {
  width: 260px;
  max-height: 70vh;
  overflow-y: auto;
  background: var(--surface-1);
  border-radius: var(--r-2);
  padding: var(--s-3);
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-title {
  font-size: var(--fs-3);
  color: var(--text-1);
}

.btn-text {
  background: none;
  border: none;
  color: var(--accent);
  cursor: pointer;
  font-size: var(--fs-2);
  padding: 2px var(--s-1);
}

.btn-text.danger {
  color: var(--text-5);
}

.btn-icon {
  background: none;
  border: none;
  color: var(--text-3);
  cursor: pointer;
  font-size: var(--fs-2);
  padding: 0 2px;
  line-height: 1;
}

.inline-form {
  display: flex;
  flex-direction: column;
  gap: var(--s-1);
}

.field {
  background: var(--surface-2);
  border: 1px solid var(--text-4);
  border-radius: var(--r-1);
  color: var(--text-1);
  padding: 2px var(--s-1);
  font-size: var(--fs-2);
  width: 100%;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  gap: var(--s-1);
}

.tree {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.tree-row {
  display: flex;
  align-items: center;
  height: 24px;
  gap: 2px;
  cursor: pointer;
  border-radius: var(--r-1);
}

.tree-row:hover {
  background: var(--surface-2);
}

.tree-row.active .name {
  color: var(--text-1);
  font-weight: 600;
}

.arrow {
  color: var(--text-3);
  font-size: 10px;
  width: 14px;
  text-align: center;
  flex-shrink: 0;
}

.name {
  flex: 1;
  color: var(--text-3);
  font-size: var(--fs-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.badge {
  font-size: 10px;
  color: var(--text-4);
  margin-left: 4px;
}

.actions {
  display: flex;
  gap: 2px;
  flex-shrink: 0;
}

.inline-edit {
  display: flex;
  flex-direction: column;
  gap: var(--s-1);
  margin-bottom: 2px;
}

.confirm-delete {
  color: var(--text-5);
  font-size: var(--fs-1);
}

.entity-row {
  display: flex;
  align-items: center;
  height: 22px;
  gap: 4px;
  font-size: var(--fs-1);
}

.entity-row.add-entity {
  margin-bottom: 2px;
}

.entity-kind {
  color: var(--accent);
  font-size: 10px;
  width: 14px;
  text-align: center;
  flex-shrink: 0;
}

.entity-title {
  flex: 1;
  color: var(--text-3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--s-3) 0;
  text-align: center;
}

.empty-icon {
  font-size: 24px;
  color: var(--text-4);
  margin-bottom: var(--s-2);
}

.empty-title {
  font-size: var(--fs-3);
  color: var(--text-2);
  margin-bottom: var(--s-1);
}

.empty-desc {
  font-size: var(--fs-2);
  color: var(--text-3);
  margin-bottom: var(--s-2);
}

/* 统计行 */
.stats-row {
  font-size: var(--fs-1);
  color: var(--text-4);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stats-kinds {
  display: flex;
  gap: var(--s-1);
}

.kind-t { color: var(--accent); font-size: var(--fs-1); }
.kind-m { color: var(--text-2); font-size: var(--fs-1); }
.kind-d { color: var(--warm); font-size: var(--fs-1); }
.kind-i { color: var(--text-3); font-size: var(--fs-1); }

.entity-row {
  cursor: pointer;
}

.entity-row:hover {
  background: var(--surface-2);
}

.entity-row.active {
  background: var(--surface-2);
  color: var(--text-1);
}

.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.search-box {
  background: var(--surface-1);
  border-radius: var(--r-2);
  padding: var(--s-3);
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 200px;
  overflow-y: auto;
}

.search-row {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  cursor: pointer;
  border-radius: var(--r-1);
}

.search-row:hover {
  background: var(--surface-2);
}

.loading-text {
  color: var(--text-3);
  font-size: var(--fs-2);
}

.search-row.mounted {
  cursor: default;
  opacity: 0.5;
}

.search-row.mounted:hover {
  background: transparent;
}

.mounted-tag {
  color: var(--text-4);
  font-size: var(--fs-1);
  white-space: nowrap;
}
</style>
