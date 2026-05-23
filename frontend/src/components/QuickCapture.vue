<script setup lang="ts">
/*
 * QuickCapture — Ctrl+Shift+N 全局浮层
 *
 * 这是 Axiom 整个交互模型的灵魂。
 * 用户在 iPhone 用快捷指令，在桌面 Web 阶段先用 Ctrl+Shift+N
 * （Tauri 阶段会升级成系统级全局快捷键）。
 *
 * 设计：
 *   - 全屏遮罩 + 居中输入框
 *   - 只有一个输入框，没有任何按钮
 *   - Enter 提交并关闭，Esc 取消
 *   - 提交成功显示 1.2s 的 AI 判定 toast，然后消失
 */

import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import { useSmartCapture, type CaptureSuccess } from '@/composables/useSmartCapture';

const open = ref(false);
const text = ref('');
const textarea = ref<HTMLTextAreaElement | null>(null);
const toast = ref<CaptureSuccess | null>(null);
let toastTimer: number | undefined;

const { capture, submitting, lastError } = useSmartCapture();

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
}

function close() {
  open.value = false;
}

async function submit(e?: Event) {
  e?.preventDefault();
  if (!text.value.trim() || submitting.value) return;
  try {
    const result = await capture(text.value);
    text.value = '';
    open.value = false;
    showToast(result);
  } catch {
    // lastError 已经更新，UI 会显示
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
    e.preventDefault();
    submit();
  }
}

function showToast(result: CaptureSuccess) {
  toast.value = result;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.value = null;
  }, 1500);
}

onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey);
  if (toastTimer) clearTimeout(toastTimer);
});

defineExpose({ show, close });
</script>

<template>
  <Transition name="overlay">
    <div v-if="open" class="quick-overlay" @click.self="close">
      <div class="quick-card">
        <span class="eyebrow">速记 · Ctrl+Shift+N</span>
        <textarea
          ref="textarea"
          v-model="text"
          rows="3"
          placeholder="想到什么直接说，AI 会判断怎么放"
          :disabled="submitting"
          @keydown="onKeydown"
        />
        <div class="bar">
          <span v-if="lastError" class="error">{{ lastError }}</span>
          <span v-else-if="submitting" class="dim">写入中…</span>
          <span v-else class="dim mono">
            <kbd>↵</kbd> 提交 · <kbd>⇧↵</kbd> 换行 · <kbd>Esc</kbd> 取消
          </span>
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
  background: rgba(7, 9, 13, 0.7);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 22vh;
}

.quick-card {
  width: min(560px, 92vw);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--line-2);
  border-radius: var(--r-3);
  padding: var(--s-5);
  box-shadow: var(--shadow-2);
}

.quick-card .eyebrow {
  display: block;
  margin-bottom: var(--s-3);
}

.quick-card textarea {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: var(--fs-6);
  color: var(--text-1);
  resize: none;
  font-family: inherit;
  line-height: var(--lh-tight);
}

.quick-card textarea::placeholder {
  color: var(--text-4);
}

.bar {
  margin-top: var(--s-4);
  font-size: var(--fs-2);
  color: var(--text-3);
  min-height: 20px;
}

.bar kbd {
  display: inline-block;
  padding: 1px 6px;
  margin: 0 2px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  border-radius: var(--r-1);
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-2);
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
  border-radius: var(--r-pill);
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
  color: var(--accent);
  font-weight: 500;
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
