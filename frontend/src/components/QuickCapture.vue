<script setup lang="ts">
/*
 * QuickCapture is the global intake layer for text, links and files.
 * The web shell exposes it from navigation and local keyboard shortcuts;
 * a native shell can later bind the same component to a system shortcut.
 */

import { nextTick, ref, watch } from 'vue';
import { ArrowUp, File, Paperclip, X } from '@lucide/vue';
import { useWindowEventListener } from '@/composables/useEventListener';
import { useSmartCapture, type CaptureSuccess } from '@/composables/useSmartCapture';
import { useTimeout } from '@/composables/useTimeout';

const open = ref(false);
const text = ref('');
const textarea = ref<HTMLTextAreaElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const files = ref<File[]>([]);
const toast = ref<CaptureSuccess | null>(null);
const emit = defineEmits<{ captured: [result: CaptureSuccess] }>();

const { capture, submitting, lastError } = useSmartCapture();
const toastTimer = useTimeout();

function isTextLikeElement(el: EventTarget | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    el.isContentEditable
  );
}

function onKey(e: KeyboardEvent) {
  // Ctrl+Shift+N 全局触发
  if (e.ctrlKey && e.shiftKey && (e.key === 'N' || e.key === 'n')) {
    // 浏览器的 Ctrl+Shift+N 会开隐身窗口 — Tauri 阶段才能彻底拦住
    // Web 阶段允许冲突，用户也可以用 Ctrl+/ 触发
    e.preventDefault();
    show();
  }
  if (e.ctrlKey && e.key === '/' && !isTextLikeElement(e.target)) {
    e.preventDefault();
    show();
  }
  if (e.key === 'Escape' && open.value) {
    e.preventDefault();
    close();
  }
}

watch(open, async (v) => {
  if (v) {
    await nextTick();
    textarea.value?.focus();
  }
});

function show() {
  if (open.value) return;
  open.value = true;
  text.value = '';
  files.value = [];
  lastError.value = null;
}

function close() {
  open.value = false;
  files.value = [];
}

async function submit(e?: Event) {
  e?.preventDefault();
  if ((!text.value.trim() && !files.value.length) || submitting.value) return;
  try {
    const result = await capture(text.value, files.value);
    text.value = '';
    files.value = [];
    open.value = false;
    emit('captured', result);
    showToast(result);
  } catch {
    // lastError 已经更新，UI 会显示
  }
}

function appendFiles(incoming: File[]) {
  const known = new Set(files.value.map(fileKey));
  for (const file of incoming) {
    const key = fileKey(file);
    if (!known.has(key)) {
      files.value.push(file);
      known.add(key);
    }
  }
}

function fileKey(file: File): string {
  return `${file.name}:${file.size}:${file.lastModified}`;
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  appendFiles(Array.from(input.files || []));
  input.value = '';
}

function onPaste(event: ClipboardEvent) {
  const pasted = Array.from(event.clipboardData?.files || []);
  if (pasted.length) appendFiles(pasted);
}

function onDrop(event: DragEvent) {
  appendFiles(Array.from(event.dataTransfer?.files || []));
}

function removeFile(index: number) {
  files.value.splice(index, 1);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
    e.preventDefault();
    submit();
  }
}

function showToast(result: CaptureSuccess) {
  toast.value = result;
  toastTimer.schedule(() => {
    toast.value = null;
  }, 1500);
}

useWindowEventListener('keydown', onKey);

defineExpose({ show, close });
</script>

<template>
  <Transition name="overlay">
    <div v-if="open" class="quick-overlay" @click.self="close" @dragover.prevent @drop.prevent="onDrop">
      <div class="quick-card" role="dialog" aria-modal="true" aria-label="记录">
        <header class="quick-head">
          <div>
            <span class="eyebrow">Capture</span>
            <strong>记录此刻</strong>
          </div>
          <button class="icon-button" type="button" title="关闭" aria-label="关闭记录" @click="close">
            <X :size="18" />
          </button>
        </header>
        <textarea
          ref="textarea"
          v-model="text"
          rows="4"
          placeholder="写下正在占据你注意力的事…"
          :disabled="submitting"
          @keydown="onKeydown"
          @paste="onPaste"
        />

        <div v-if="files.length" class="file-list" aria-label="待记录附件">
          <div v-for="(file, index) in files" :key="fileKey(file)" class="file-row">
            <File :size="15" />
            <span>{{ file.name }}</span>
            <button type="button" :title="`移除 ${file.name}`" :aria-label="`移除 ${file.name}`" @click="removeFile(index)">
              <X :size="14" />
            </button>
          </div>
        </div>

        <div class="bar">
          <input ref="fileInput" class="file-input" type="file" multiple @change="onFileChange">
          <button class="attach-button" type="button" title="添加附件" aria-label="添加附件" @click="fileInput?.click()">
            <Paperclip :size="18" />
          </button>
          <span v-if="lastError" class="error">{{ lastError }}</span>
          <span v-else-if="submitting" class="dim">正在记录</span>
          <span v-else class="dim">文字、文件、图片或链接</span>
          <button
            class="submit-button"
            type="button"
            title="记录"
            aria-label="记录"
            :disabled="(!text.trim() && !files.length) || submitting"
            @click="submit()"
          >
            <ArrowUp :size="18" :stroke-width="2" />
          </button>
        </div>
      </div>
    </div>
  </Transition>

  <Transition name="toast">
    <div v-if="toast" class="quick-toast">
      <span class="toast-dot" />
      已记录 · AI 判定为 <strong>{{ toast.label }}</strong>
    </div>
  </Transition>
</template>

<style scoped>
.quick-overlay {
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(8, 8, 7, 0.84);
  backdrop-filter: blur(18px) saturate(90%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 17vh;
}

.quick-card {
  position: relative;
  width: min(720px, calc(100vw - 64px));
  background: rgba(14, 14, 12, 0.72);
  backdrop-filter: var(--glass-blur);
  border-top: 1px solid var(--line-warm);
  border-bottom: 1px solid var(--line-2);
  padding: 30px 0 24px;
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.42);
}

.quick-card::before {
  content: '';
  position: absolute;
  top: -1px;
  right: 0;
  width: 74px;
  height: 3px;
  background: var(--focus);
}

.quick-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 34px;
}

.quick-head > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.quick-head strong {
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 400;
}

.quick-head .eyebrow {
  letter-spacing: 0;
  text-transform: none;
}

.icon-button {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--text-4);
}

.icon-button:hover {
  color: var(--text-1);
  background: rgba(255, 255, 255, 0.045);
}

.quick-card textarea {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  min-height: 178px;
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 400;
  color: var(--text-1);
  resize: none;
  line-height: 1.42;
}

.quick-card textarea::placeholder {
  color: var(--text-4);
}

.bar {
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: var(--s-3);
  font-size: var(--fs-2);
  color: var(--text-3);
  min-height: 44px;
  padding-top: 16px;
  border-top: 1px solid var(--line-1);
}

.file-input {
  display: none;
}

.attach-button,
.submit-button {
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--text-3);
}

.attach-button:hover {
  color: var(--text-1);
  background: rgba(255, 255, 255, 0.045);
}

.submit-button {
  margin-left: auto;
  border: 1px solid var(--line-warm);
  background: var(--focus-dim);
  color: var(--focus-bright);
  transition: transform var(--t-base) var(--ease), background var(--t-base) var(--ease), color var(--t-base) var(--ease);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  background: var(--focus);
  color: var(--surface-0);
}

.submit-button:disabled {
  background: var(--surface-3);
  color: var(--text-5);
  cursor: default;
}

.file-list {
  display: grid;
  gap: 6px;
  margin-top: 12px;
}

.file-row {
  min-height: 34px;
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr) 28px;
  align-items: center;
  gap: 8px;
  padding: 0 7px 0 10px;
  border-bottom: 1px solid var(--line-1);
  color: var(--text-3);
  font-size: var(--fs-2);
}

.file-row span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-row button {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  color: var(--text-4);
}

.error {
  color: var(--error);
}

.quick-toast {
  position: fixed;
  top: var(--s-5);
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  padding: var(--s-2) var(--s-4);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  font-size: var(--fs-3);
  color: var(--text-1);
  box-shadow: var(--shadow-1);
  z-index: 95;
}

.toast-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}

.quick-toast strong {
  color: var(--focus);
  font-weight: 500;
}

@media (max-width: 640px) {
  .quick-overlay {
    align-items: flex-end;
    padding: 0 14px calc(var(--app-mobile-nav-height) + 14px);
  }

  .quick-card {
    width: 100%;
    padding: 24px 0 20px;
  }

  .quick-card textarea {
    min-height: 150px;
    font-size: 23px;
  }
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity var(--t-base) var(--ease);
}
.overlay-enter-active .quick-card,
.overlay-leave-active .quick-card {
  transition: transform var(--t-base) var(--ease);
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
.overlay-enter-from .quick-card,
.overlay-leave-to .quick-card {
  transform: translateY(-12px) scale(0.98);
}

.toast-enter-active,
.toast-leave-active {
  transition: all var(--t-base) var(--ease);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -8px);
}
</style>
