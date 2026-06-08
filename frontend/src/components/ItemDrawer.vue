<script setup lang="ts">
/*
 * ItemDrawer — Timeline 条目详情面板
 *
 * 从右侧滑出。不遮断左侧时间流的上下文。
 * 支持看全文、图片/文档/音频预览、metadata、归档/恢复/删除。
 */

import { ref, watch, computed, onBeforeUnmount } from 'vue'
import {
  getItem,
  getItemFile,
  updateItem,
  archiveItem,
  restoreItem,
  deleteItem,
  getProcessingNext,
  markProcessingPending,
  markProcessingReady,
} from '@/api/endpoints'
import { typeAccent } from '@/composables/useTypeAccent'
import { useWindowEventListener } from '@/composables/useEventListener'
import { humanSize } from '@/composables/useHumanSize'
import { formatRelative } from '@/composables/useRelativeTime'
import { downloadBlob, triggerDownloadUrl } from '@/composables/useDownload'
import { ApiError } from '@/api/client'
import type { ItemDetail } from '@/api/types'

const props = defineProps<{ itemId: number | null }>()
const emit = defineEmits<{ close: []; changed: [options?: { nextItemId?: number }] }>()

const now = ref(Date.now())
const nowDate = computed(() => new Date(now.value))

const loading = ref(false)
const acting = ref(false)
const fileLoading = ref(false)
const error = ref<string | null>(null)
const fileError = ref<string | null>(null)
const detail = ref<ItemDetail | null>(null)
const fileObjectUrl = ref<string | null>(null)
const editing = ref(false)
const editSource = ref('')
const editBody = ref('')
const editFeedback = ref<string | null>(null)

// 删除二次确认
const deleteConfirm = ref(false)
let deleteTimer: number | undefined

watch(() => props.itemId, async (id) => {
  if (id === null) {
    detail.value = null
    error.value = null
    editing.value = false
    editFeedback.value = null
    return
  }
  loading.value = true
  error.value = null
  editing.value = false
  editFeedback.value = null
  try {
    const data = await getItem(id)
    detail.value = data.item
    resetEditForm(data.item)
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '加载失败'
  } finally {
    loading.value = false
  }
})

const isInbox = computed(() => detail.value?.storage !== 'archive')
const isPending = computed(() => detail.value?.processing_state === 'pending')
const isOverridden = computed(() => Boolean(detail.value?.processing_is_overridden))
const canPreviewPdf = computed(() =>
  detail.value?.type === 'document'
  && Boolean(fileObjectUrl.value)
  && (detail.value.mime_type === 'application/pdf' || detail.value.original_name?.toLowerCase().endsWith('.pdf')),
)

const typeLabel = computed(() => {
  const map: Record<string, string> = { text: 'TEXT', image: 'IMAGE', document: 'DOC', audio: 'AUDIO' }
  return map[detail.value?.type ?? ''] ?? 'ITEM'
})

const editBodyLabel = computed(() => {
  const map: Record<string, string> = {
    text: '正文',
    image: '说明',
    document: '抽取正文',
    audio: '转写文本',
  }
  return map[detail.value?.type ?? ''] ?? '内容'
})

function hasBody(): boolean {
  if (!detail.value) return false
  const t = detail.value.type
  if (t === 'text') return !!detail.value.content
  if (t === 'image') return !!(fileObjectUrl.value || detail.value.content || fileError.value)
  if (t === 'document') return !!(detail.value.content || detail.value.derived_text || detail.value.derived_text_preview)
    || canPreviewPdf.value
    || !!fileError.value
  if (t === 'audio') return !!(fileObjectUrl.value || detail.value.transcript_text || fileError.value)
  return false
}

function releaseFileObjectUrl() {
  if (!fileObjectUrl.value) return
  URL.revokeObjectURL(fileObjectUrl.value)
  fileObjectUrl.value = null
}

function getEditableBody(item: ItemDetail): string {
  if (item.type === 'document') return item.derived_text ?? item.derived_text_preview ?? ''
  if (item.type === 'audio') return item.transcript_text ?? ''
  return item.content ?? ''
}

function resetEditForm(item: ItemDetail) {
  editSource.value = item.source ?? ''
  editBody.value = getEditableBody(item)
}

function startEdit() {
  if (!detail.value) return
  resetEditForm(detail.value)
  editFeedback.value = null
  editing.value = true
}

function cancelEdit() {
  if (detail.value) resetEditForm(detail.value)
  editFeedback.value = null
  editing.value = false
}

function buildEditPayload(item: ItemDetail) {
  const payload: {
    content?: string
    source?: string
    derived_text?: string
    transcript_text?: string
  } = {}
  if (editSource.value.trim() !== item.source) {
    payload.source = editSource.value.trim()
  }

  const nextBody = editBody.value
  if (item.type === 'document') {
    if (nextBody !== (item.derived_text ?? item.derived_text_preview ?? '')) {
      payload.derived_text = nextBody
    }
  } else if (item.type === 'audio') {
    if (nextBody !== (item.transcript_text ?? '')) {
      payload.transcript_text = nextBody
    }
  } else if (nextBody !== (item.content ?? '')) {
    payload.content = nextBody
  }
  return payload
}

async function doSaveEdit(openNext = false) {
  if (!detail.value) return
  const current = detail.value
  const payload = buildEditPayload(current)
  if (!Object.keys(payload).length) {
    editFeedback.value = '没有检测到变化'
    if (openNext) {
      acting.value = true
      error.value = null
      try {
        const next = await getProcessingNext({ type: current.type, exclude_id: current.id })
        if (next.item) {
          const nextData = await getItem(next.item.id)
          detail.value = nextData.item
          resetEditForm(nextData.item)
          editing.value = true
          emit('changed', { nextItemId: nextData.item.id })
          editFeedback.value = '没有检测到变化，已打开同类下一条'
        } else {
          editFeedback.value = '没有检测到变化，同类待处理已清空'
        }
      } catch (err) {
        error.value = err instanceof ApiError ? err.message : '打开下一条失败'
      } finally {
        acting.value = false
      }
    } else {
      editing.value = false
    }
    return
  }

  acting.value = true
  error.value = null
  editFeedback.value = null
  try {
    await updateItem(current.id, payload)
    const data = await getItem(current.id)
    detail.value = data.item
    resetEditForm(data.item)
    editing.value = false
    emit('changed')

    if (openNext) {
      const next = await getProcessingNext({ type: current.type, exclude_id: current.id })
      if (next.item) {
        const nextData = await getItem(next.item.id)
        detail.value = nextData.item
        resetEditForm(nextData.item)
        editing.value = true
        emit('changed', { nextItemId: nextData.item.id })
        editFeedback.value = '已保存，并打开同类下一条'
      } else {
        editFeedback.value = '已保存，同类待处理已清空'
      }
    } else {
      editFeedback.value = '已保存'
    }
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '保存失败'
  } finally {
    acting.value = false
  }
}

watch(() => detail.value?.file_url ?? null, async (fileUrl) => {
  releaseFileObjectUrl()
  fileError.value = null
  if (!fileUrl) return

  fileLoading.value = true
  try {
    const blob = await getItemFile(fileUrl)
    const objectUrl = URL.createObjectURL(blob)
    if (detail.value?.file_url !== fileUrl) {
      URL.revokeObjectURL(objectUrl)
      return
    }
    fileObjectUrl.value = objectUrl
  } catch (err) {
    fileError.value = err instanceof ApiError ? err.message : '文件读取失败'
  } finally {
    if (detail.value?.file_url === fileUrl) {
      fileLoading.value = false
    }
  }
})

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

async function doMarkReady() {
  if (!detail.value) return
  acting.value = true
  error.value = null
  try {
    await markProcessingReady([detail.value.id])
    const data = await getItem(detail.value.id)
    detail.value = data.item
    resetEditForm(data.item)
    emit('changed')
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '标记就绪失败'
  } finally {
    acting.value = false
  }
}

async function doMarkPending() {
  if (!detail.value) return
  acting.value = true
  error.value = null
  try {
    await markProcessingPending([detail.value.id])
    const data = await getItem(detail.value.id)
    detail.value = data.item
    resetEditForm(data.item)
    emit('changed')
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '退回待处理失败'
  } finally {
    acting.value = false
  }
}

async function doReadyAndNext() {
  if (!detail.value) return
  const current = detail.value
  acting.value = true
  error.value = null
  try {
    await markProcessingReady([current.id])
    const next = await getProcessingNext({ type: current.type, exclude_id: current.id })
    if (next.item) {
      const data = await getItem(next.item.id)
      detail.value = data.item
      resetEditForm(data.item)
      emit('changed', { nextItemId: data.item.id })
    } else {
      detail.value = null
      emit('close')
      emit('changed')
    }
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '处理下一条失败'
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

async function doDownloadFile() {
  if (!detail.value?.file_url) return
  acting.value = true
  error.value = null
  try {
    const filename = detail.value.original_name || `item-${detail.value.id}`
    if (fileObjectUrl.value) {
      triggerDownloadUrl(fileObjectUrl.value, filename)
    } else {
      const blob = await getItemFile(detail.value.file_url)
      downloadBlob(blob, filename)
    }
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '文件下载失败'
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

useWindowEventListener('keydown', onKey)

onBeforeUnmount(() => {
  if (deleteTimer) clearTimeout(deleteTimer)
  releaseFileObjectUrl()
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
            <form v-if="editing" class="edit-form" @submit.prevent="doSaveEdit(false)">
              <label class="edit-field">
                <span>来源</span>
                <input v-model="editSource" :disabled="acting" aria-label="记录来源" />
              </label>
              <label class="edit-field">
                <span>{{ editBodyLabel }}</span>
                <textarea
                  v-model="editBody"
                  :disabled="acting"
                  :aria-label="editBodyLabel"
                  rows="12"
                />
              </label>
              <p class="edit-hint">
                文本记录保存正文；图片保存说明；文档保存抽取正文；音频保存转写文本。
              </p>
            </form>

            <template v-else>
              <!-- text -->
              <template v-if="detail.type === 'text'">
                <p class="content-text">{{ detail.content }}</p>
              </template>

              <!-- image -->
              <template v-else-if="detail.type === 'image'">
                <img
                  v-if="fileObjectUrl"
                  :src="fileObjectUrl"
                  :alt="detail.original_name ?? ''"
                  class="preview-img"
                />
                <p v-else-if="fileLoading" class="file-state">文件读取中…</p>
                <p v-else-if="fileError" class="file-state error-state">{{ fileError }}</p>
                <p v-if="detail.content" class="content-text">{{ detail.content }}</p>
              </template>

              <!-- document -->
              <template v-else-if="detail.type === 'document'">
                <p v-if="detail.content" class="content-text">{{ detail.content }}</p>
                <iframe
                  v-if="canPreviewPdf"
                  :src="fileObjectUrl ?? undefined"
                  :title="detail.original_name || `document-${detail.id}`"
                  class="file-frame"
                />
                <p v-else-if="fileLoading" class="file-state">文件读取中…</p>
                <p v-else-if="fileError" class="file-state error-state">{{ fileError }}</p>
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
                  v-if="fileObjectUrl"
                  :src="fileObjectUrl"
                  controls
                  preload="none"
                  class="audio-player"
                />
                <p v-else-if="fileLoading" class="file-state">文件读取中…</p>
                <p v-else-if="fileError" class="file-state error-state">{{ fileError }}</p>
                <p v-if="detail.transcript_text" class="content-text">{{ detail.transcript_text }}</p>
              </template>

              <!-- 无内容兜底 -->
              <p v-if="!hasBody()" class="no-body">无可读内容</p>
            </template>
          </template>
        </div>

        <!-- Metadata -->
        <div v-if="detail" class="drawer-meta">
          <div class="meta-row"><span class="meta-key mono">ID</span><span class="meta-val mono">#{{ detail.id }}</span></div>
          <div class="meta-row"><span class="meta-key mono">来源</span><span class="meta-val">{{ detail.source }}</span></div>
          <div v-if="detail.processing_note" class="meta-row">
            <span class="meta-key mono">处理</span>
            <span class="meta-val">{{ detail.processing_note }}</span>
          </div>
          <div v-if="detail.processing_override_label" class="meta-row">
            <span class="meta-key mono">覆盖</span>
            <span class="meta-val">{{ detail.processing_override_label }}</span>
          </div>
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
        <p v-if="editFeedback" class="drawer-feedback">{{ editFeedback }}</p>

        <!-- Actions -->
        <div v-if="detail" class="drawer-actions">
          <template v-if="editing">
            <button
              class="action-btn primary-btn"
              type="button"
              :disabled="acting"
              @click="doSaveEdit(false)"
            >
              保存
            </button>
            <button
              v-if="isPending"
              class="action-btn archive-btn"
              type="button"
              :disabled="acting"
              @click="doSaveEdit(true)"
            >
              保存并打开同类下一条
            </button>
            <button
              class="action-btn archive-btn"
              type="button"
              :disabled="acting"
              @click="cancelEdit"
            >
              取消
            </button>
          </template>
          <button
            v-else
            class="action-btn archive-btn"
            type="button"
            :disabled="acting"
            @click="startEdit"
          >
            编辑
          </button>
          <button
            v-if="!editing && isPending"
            class="action-btn primary-btn"
            type="button"
            :disabled="acting"
            @click="doReadyAndNext"
          >
            完成并打开同类下一条
          </button>
          <button
            v-if="!editing && isPending"
            class="action-btn archive-btn"
            type="button"
            :disabled="acting"
            @click="doMarkReady"
          >
            标记就绪
          </button>
          <button
            v-if="!editing && isOverridden"
            class="action-btn archive-btn"
            type="button"
            :disabled="acting"
            @click="doMarkPending"
          >
            退回待处理
          </button>
          <button
            v-if="!editing && detail.file_url"
            class="action-btn archive-btn"
            type="button"
            :disabled="acting || fileLoading"
            @click="doDownloadFile"
          >
            下载文件
          </button>
          <button
            v-if="!editing"
            class="action-btn archive-btn"
            type="button"
            :disabled="acting"
            @click="doArchive"
          >
            {{ isInbox ? '归档' : '恢复' }}
          </button>
          <button
            v-if="!editing"
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

.edit-form {
  display: grid;
  gap: var(--s-3);
}

.edit-field {
  display: grid;
  gap: var(--s-2);
  font-size: var(--fs-2);
  color: var(--text-3);
}

.edit-field input,
.edit-field textarea {
  width: 100%;
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  background: var(--surface-1);
  color: var(--text-1);
  font: inherit;
}

.edit-field input {
  height: 36px;
  padding: 0 var(--s-3);
}

.edit-field textarea {
  min-height: 260px;
  padding: var(--s-3);
  line-height: var(--lh-base);
  resize: vertical;
}

.edit-hint {
  margin: 0;
  font-size: var(--fs-2);
  color: var(--text-4);
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

.file-frame {
  width: 100%;
  min-height: 360px;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-1);
  margin: var(--s-3) 0;
}

.file-state {
  font-size: var(--fs-3);
  color: var(--text-4);
  margin-bottom: var(--s-3);
}

.error-state {
  color: var(--error);
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

.drawer-feedback {
  padding: var(--s-2) var(--s-4);
  font-size: var(--fs-2);
  color: var(--accent-bright);
}

/* Actions */
.drawer-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
  padding: var(--s-3) var(--s-4);
  border-top: 1px solid var(--line-1);
  flex-shrink: 0;
}

.action-btn {
  flex: 1 1 42%;
  padding: var(--s-2) var(--s-3);
  font-size: var(--fs-3);
  border-radius: var(--r-2);
  transition: all var(--t-fast) var(--ease);
}

.primary-btn {
  flex-basis: 100%;
  background: var(--accent);
  border: 1px solid transparent;
  color: var(--bg);
}

.primary-btn:hover:not(:disabled) {
  filter: brightness(1.06);
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
