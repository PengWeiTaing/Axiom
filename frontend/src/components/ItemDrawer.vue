<script setup lang="ts">
/*
 * ItemDrawer — Timeline 条目详情面板
 *
 * 从右侧滑出。不遮断左侧时间流的上下文。
 * 支持看全文、图片/文档/音频预览、metadata、归档/恢复/删除。
 */

import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import { getItem, archiveItem, restoreItem, deleteItem } from '@/api/endpoints'
import { typeAccent } from '@/composables/useTypeAccent'
import { humanSize } from '@/composables/useHumanSize'
import { formatRelative } from '@/composables/useRelativeTime'
import { ApiError } from '@/api/client'
import type { Item } from '@/api/types'

const props = defineProps<{ itemId: number | null }>()
const emit = defineEmits<{ close: []; changed: [] }>()

const now = ref(Date.now())
const nowDate = computed(() => new Date(now.value))

const loading = ref(false)
const acting = ref(false)
const error = ref<string | null>(null)
const detail = ref<(Item & { derived_text_preview?: string; storage?: string; file_url?: string }) | null>(null)

// 删除二次确认
const deleteConfirm = ref(false)
let deleteTimer: number | undefined

watch(() => props.itemId, async (id) => {
  if (id === null) {
    detail.value = null
    error.value = null
    return
  }
  loading.value = true
  error.value = null
  try {
    const data = await getItem(id)
    detail.value = data.item
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '加载失败'
  } finally {
    loading.value = false
  }
})

const isInbox = computed(() => detail.value?.storage !== 'archive')

const typeLabel = computed(() => {
  const map: Record<string, string> = { text: 'TEXT', image: 'IMAGE', document: 'DOC', audio: 'AUDIO' }
  return map[detail.value?.type ?? ''] ?? 'ITEM'
})

function hasBody(): boolean {
  if (!detail.value) return false
  const t = detail.value.type
  if (t === 'text') return !!detail.value.content
  if (t === 'image') return true
  if (t === 'document') return !!(detail.value.content || detail.value.derived_text || detail.value.derived_text_preview)
  if (t === 'audio') return true
  return false
}

async function doArchive() {
  if (!detail.value) return
  acting.value = true
  error.value = null
  try {
    if (isInbox.value) {
      await archiveItem(detail.value.id)
    } else {
      await restoreItem(detail.value.id)
    }
    emit('changed')
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '操作失败'
  } finally {
    acting.value = false
  }
}

async function doDelete() {
  if (!detail.value) return
  if (!deleteConfirm.value) {
    deleteConfirm.value = true
    deleteTimer = window.setTimeout(() => {
      deleteConfirm.value = false
    }, 2000)
    return
  }
  if (deleteTimer) clearTimeout(deleteTimer)
  deleteConfirm.value = false
  acting.value = true
  error.value = null
  try {
    await deleteItem(detail.value.id)
    emit('changed')
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '删除失败'
  } finally {
    acting.value = false
  }
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.itemId !== null) {
    e.preventDefault()
    emit('close')
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  if (deleteTimer) clearTimeout(deleteTimer)
})
</script>

<template>
  <Transition name="drawer">
    <aside v-if="itemId !== null" class="drawer" @click.self="emit('close')">
      <div class="drawer-panel">
        <!-- 加载进度条 -->
        <div v-if="loading || acting" class="progress-bar" />

        <!-- Header -->
        <header class="drawer-head">
          <div class="head-left">
            <span class="type-chip mono" :style="{ '--chip-accent': detail ? typeAccent(detail.type) : 'var(--text-5)' }">
              {{ typeLabel }}
            </span>
            <span v-if="detail" class="head-time mono">{{ formatRelative(detail.created_at, nowDate) }}</span>
          </div>
          <button
            class="close-btn"
            type="button"
            aria-label="关闭"
            @click="emit('close')"
            :disabled="acting"
          >&times;</button>
        </header>

        <!-- Body -->
        <div class="drawer-body">
          <!-- 加载中 -->
          <div v-if="loading" class="loading">加载中…</div>

          <!-- 内容 -->
          <template v-else-if="detail">
            <!-- text -->
            <template v-if="detail.type === 'text'">
              <p class="content-text">{{ detail.content }}</p>
            </template>

            <!-- image -->
            <template v-else-if="detail.type === 'image'">
              <img
                v-if="detail.file_url"
                :src="detail.file_url"
                :alt="detail.original_name ?? ''"
                class="preview-img"
              />
              <p v-if="detail.content" class="content-text">{{ detail.content }}</p>
            </template>

            <!-- document -->
            <template v-else-if="detail.type === 'document'">
              <p v-if="detail.content" class="content-text">{{ detail.content }}</p>
              <template v-if="detail.derived_text || detail.derived_text_preview">
                <p class="content-text">{{ detail.derived_text || detail.derived_text_preview }}</p>
              </template>
              <p v-if="!detail.content && !detail.derived_text && !detail.derived_text_preview" class="no-body">
                {{ detail.original_name || '无可读正文' }}
              </p>
            </template>

            <!-- audio -->
            <template v-else-if="detail.type === 'audio'">
              <audio
                v-if="detail.file_url"
                :src="detail.file_url"
                controls
                preload="none"
                class="audio-player"
              />
              <p v-if="detail.transcript_text" class="content-text">{{ detail.transcript_text }}</p>
            </template>

            <!-- 无内容兜底 -->
            <p v-if="!hasBody()" class="no-body">无可读内容</p>
          </template>
        </div>

        <!-- Metadata -->
        <div v-if="detail" class="drawer-meta">
          <div class="meta-row"><span class="meta-key mono">ID</span><span class="meta-val mono">#{{ detail.id }}</span></div>
          <div class="meta-row"><span class="meta-key mono">来源</span><span class="meta-val">{{ detail.source }}</span></div>
          <div v-if="detail.size_bytes" class="meta-row">
            <span class="meta-key mono">大小</span><span class="meta-val mono">{{ humanSize(detail.size_bytes) }}</span>
          </div>
          <div v-if="detail.file_path" class="meta-row">
            <span class="meta-key mono">路径</span>
            <span class="meta-val mono path" :title="detail.file_path">{{ detail.file_path }}</span>
          </div>
        </div>

        <!-- Error -->
        <p v-if="error" class="drawer-error">{{ error }}</p>

        <!-- Actions -->
        <div v-if="detail" class="drawer-actions">
          <button
            class="action-btn archive-btn"
            type="button"
            :disabled="acting"
            @click="doArchive"
          >
            {{ isInbox ? '归档' : '恢复' }}
          </button>
          <button
            class="action-btn delete-btn"
            type="button"
            :disabled="acting"
            @click="doDelete"
          >
            {{ deleteConfirm ? '确认删除？' : '删除' }}
          </button>
        </div>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.drawer {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(7, 9, 13, 0.35);
  backdrop-filter: blur(4px);
}

.drawer-panel {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: min(440px, 92vw);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-left: 1px solid var(--line-2);
  box-shadow: var(--shadow-2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent);
  opacity: 0.6;
  animation: progressPulse 0.8s ease-in-out infinite;
}

@keyframes progressPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

/* Header */
.drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 var(--s-4);
  border-bottom: 1px solid var(--line-1);
  flex-shrink: 0;
}

.head-left {
  display: flex;
  align-items: center;
  gap: var(--s-3);
}

.type-chip {
  font-size: var(--fs-1);
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding-left: 10px;
  border-left: 4px solid var(--chip-accent, var(--text-5));
}

.head-time {
  font-size: var(--fs-2);
  color: var(--text-4);
}

.close-btn {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  background: transparent;
  border: none;
  border-radius: var(--r-2);
  color: var(--text-3);
  font-size: 18px;
  transition: all var(--t-fast) var(--ease);
}

.close-btn:hover {
  background: var(--surface-2);
  color: var(--text-1);
}

/* Body */
.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--s-4);
}

.loading {
  color: var(--text-4);
  font-size: var(--fs-3);
}

.content-text {
  font-size: var(--fs-4);
  color: var(--text-1);
  line-height: var(--lh-base);
  white-space: pre-wrap;
  word-break: break-word;
}

.no-body {
  font-size: var(--fs-3);
  color: var(--text-4);
}

.preview-img {
  max-width: 100%;
  border-radius: var(--r-2);
  margin-bottom: var(--s-3);
}

.audio-player {
  width: 100%;
  margin-bottom: var(--s-3);
  border-radius: var(--r-2);
}

/* Metadata */
.drawer-meta {
  padding: var(--s-3) var(--s-4);
  border-top: 1px solid var(--line-1);
  flex-shrink: 0;
}

.meta-row {
  display: flex;
  align-items: baseline;
  gap: var(--s-3);
  padding: 3px 0;
}

.meta-key {
  font-size: var(--fs-1);
  color: var(--text-4);
  min-width: 36px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.meta-val {
  font-size: var(--fs-2);
  color: var(--text-3);
}

.meta-val.path {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Error */
.drawer-error {
  padding: var(--s-2) var(--s-4);
  font-size: var(--fs-2);
  color: var(--error);
}

/* Actions */
.drawer-actions {
  display: flex;
  gap: var(--s-2);
  padding: var(--s-3) var(--s-4);
  border-top: 1px solid var(--line-1);
  flex-shrink: 0;
}

.action-btn {
  flex: 1;
  padding: var(--s-2) var(--s-3);
  font-size: var(--fs-3);
  border-radius: var(--r-2);
  transition: all var(--t-fast) var(--ease);
}

.archive-btn {
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  color: var(--text-2);
}

.archive-btn:hover:not(:disabled) {
  background: var(--surface-3);
  color: var(--text-1);
}

.delete-btn {
  background: transparent;
  border: 1px solid var(--line-1);
  color: var(--error);
}

.delete-btn:hover:not(:disabled) {
  background: rgba(232, 120, 120, 0.08);
}

.action-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Transition */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity var(--t-drawer) var(--ease);
}
.drawer-enter-active .drawer-panel,
.drawer-leave-active .drawer-panel {
  transition: transform var(--t-drawer) var(--ease);
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from .drawer-panel {
  transform: translateX(100%);
}
.drawer-leave-to .drawer-panel {
  transform: translateX(100%);
}
</style>
