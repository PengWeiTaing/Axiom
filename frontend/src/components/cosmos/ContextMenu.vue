<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useCosmosStore } from '@/stores/cosmos'

export interface ContextMenuTarget {
  id: string
  kind: string
  title: string
  layer: number
  lifelineId?: string
}

const props = defineProps<{
  target: ContextMenuTarget
  x: number
  y: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'edit-title', target: ContextMenuTarget): void
  (e: 'delete-entity', target: ContextMenuTarget): void
  (e: 'move-lifeline', entityId: string, lifelineId: string): void
  (e: 'create-entity', kind: string, lifelineId: string): void
  (e: 'edit-lifeline-name', target: ContextMenuTarget): void
  (e: 'associate-to', target: ContextMenuTarget): void
  (e: 'find-path-to', target: ContextMenuTarget): void
  (e: 'copy-title', target: ContextMenuTarget): void
}>()

const store = useCosmosStore()

const menuRef = ref<HTMLElement | null>(null)
const submenuKind = ref<string | null>(null) // 'lifeline' | 'entity'

// Position: prevent overflow
const pos = computed(() => {
  const mw = 200
  const mh = 300
  let px = props.x
  let py = props.y
  if (px + mw > window.innerWidth) px = window.innerWidth - mw - 4
  if (py + mh > window.innerHeight) py = window.innerHeight - mh - 4
  return { left: `${px}px`, top: `${py}px` }
})

const isR3 = computed(() => props.target.layer === 3)

// Lifeline list (R1 + R2 hierarchy) for "移动到 lifeline" submenu
const lifelineTree = computed(() => {
  if (!store.data) return []
  const r1List = store.data.lifelines.filter(l => l.parent_id === 'ROOT')
  return r1List.map(r1 => ({
    ...r1,
    children: store.data!.lifelines.filter(l => l.parent_id === r1.id),
  }))
})

const currentLifelineId = computed(() => {
  if (!store.data || !props.target.id) return null
  const e = store.data.entities.find(en => en.id === props.target.id)
  return e?.lifeline_id ?? null
})

const entityKinds = ['task', 'memory', 'decision', 'item'] as const
const kindLabels: Record<string, string> = { task: '任务', memory: '记忆', decision: '决策', item: '条目' }

function onEditTitle() {
  emit('edit-title', props.target)
  emit('close')
}

function onDelete() {
  emit('delete-entity', props.target)
  emit('close')
}

function onMoveToLifeline(lifelineId: string) {
  emit('move-lifeline', props.target.id, lifelineId)
  emit('close')
}

function onCreateEntity(kind: string) {
  emit('create-entity', kind, props.target.id)
  emit('close')
}

function onAssociateTo() {
  emit('associate-to', props.target)
  emit('close')
}

function onFindPathTo() {
  emit('find-path-to', props.target)
  emit('close')
}

function onCopyTitle() {
  emit('copy-title', props.target)
  emit('close')
}

function onEditLifelineName() {
  emit('edit-lifeline-name', props.target)
  emit('close')
}

// Close on click outside
function onPointerDown(e: PointerEvent) {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    emit('close')
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown, true)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown, true)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="menuRef" class="ctx-menu" :style="pos">
    <!-- R3 entity node menu -->
    <template v-if="isR3">
      <button class="ctx-item" @click="onEditTitle">编辑标题…</button>

      <div
        class="ctx-item has-sub"
        @pointerenter="submenuKind = 'lifeline'"
        @pointerleave="submenuKind = null"
      >
        移动到 lifeline ▸
        <div v-if="submenuKind === 'lifeline'" class="submenu">
          <template v-for="r1 in lifelineTree" :key="r1.id">
            <button
              class="subitem r1-item"
              :class="{ current: r1.id === currentLifelineId }"
              :disabled="r1.id === currentLifelineId"
              @click="onMoveToLifeline(r1.id)"
            >{{ r1.name }}</button>
            <button
              v-for="r2 in r1.children"
              :key="r2.id"
              class="subitem r2-item"
              :class="{ current: r2.id === currentLifelineId }"
              :disabled="r2.id === currentLifelineId"
              @click="onMoveToLifeline(r2.id)"
            >{{ r2.name }}</button>
          </template>
          <div v-if="lifelineTree.length === 0" class="subitem empty">暂无 lifeline</div>
        </div>
      </div>

      <button class="ctx-item" @click="onAssociateTo">关联到…</button>
      <button class="ctx-item" @click="onFindPathTo">查找路径到…</button>
      <button class="ctx-item" @click="onCopyTitle">复制标题</button>
      <div class="ctx-separator" />
      <button class="ctx-item danger" @click="onDelete">删除</button>
    </template>

    <!-- R1/R2 lifeline node menu -->
    <template v-else>
      <div
        class="ctx-item has-sub"
        @pointerenter="submenuKind = 'entity'"
        @pointerleave="submenuKind = null"
      >
        新建 entity ▸
        <div v-if="submenuKind === 'entity'" class="submenu">
          <button
            v-for="k in entityKinds"
            :key="k"
            class="subitem"
            @click="onCreateEntity(k)"
          >{{ kindLabels[k] }}</button>
        </div>
      </div>
      <button class="ctx-item" @click="onEditLifelineName">编辑名称…</button>
    </template>
  </div>
</template>

<style scoped>
.ctx-menu {
  position: fixed;
  z-index: 100;
  background: var(--surface-1);
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  padding: var(--s-1);
  min-width: 170px;
  display: flex;
  flex-direction: column;
}

.ctx-item {
  display: flex;
  align-items: center;
  gap: var(--s-1);
  padding: var(--s-1) var(--s-2);
  background: none;
  border: none;
  border-radius: var(--r-1);
  color: var(--text-2);
  font-size: var(--fs-2);
  cursor: pointer;
  white-space: nowrap;
  text-align: left;
  position: relative;
}

.ctx-item:hover {
  background: var(--surface-2);
  color: var(--text-1);
}

.ctx-item.danger {
  color: #f87171;
}

.ctx-item.danger:hover {
  background: rgba(248, 113, 113, 0.12);
}

.ctx-item.has-sub {
  justify-content: space-between;
}

.ctx-separator {
  height: 1px;
  background: var(--line-1);
  margin: var(--s-1) 0;
}

/* Submenu */
.submenu {
  position: absolute;
  left: calc(100% + 4px);
  top: calc(-1 * var(--s-1));
  background: var(--surface-1);
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  padding: var(--s-1);
  min-width: 130px;
  max-height: 260px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.subitem {
  display: block;
  padding: var(--s-1) var(--s-2);
  background: none;
  border: none;
  border-radius: var(--r-1);
  color: var(--text-2);
  font-size: var(--fs-2);
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
}

.subitem:hover {
  background: var(--surface-2);
  color: var(--text-1);
}

.subitem.current {
  color: var(--accent);
}

.subitem:disabled {
  color: var(--text-4);
  cursor: default;
}

.subitem.r2-item {
  padding-left: var(--s-4);
  font-size: var(--fs-1);
}

.subitem.empty {
  color: var(--text-4);
  cursor: default;
  font-size: var(--fs-1);
}
</style>
