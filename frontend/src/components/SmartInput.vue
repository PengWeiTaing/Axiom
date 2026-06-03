<script setup lang="ts">
/*
 * SmartInput — Axiom 唯一的捕获入口
 *
 * 视觉上必须是页面里唯一的"重点"。
 * 没有标题、没有标签、没有分类选择。
 * 只有一个会随时间换占位符的输入框。
 *
 * 交互：
 *   - 自动 grow（min 2 行，max 12 行）
 *   - Cmd/Ctrl+Enter 提交
 *   - 选择附件 / 拖入文件 / 粘贴图片自动收集到附件区
 *   - 提交成功后清空 + 显示 1.5s AI 判定 ghost
 */

import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useSmartCapture, type CaptureSuccess } from '@/composables/useSmartCapture';
import { humanSize } from '@/composables/useHumanSize';

const PLACEHOLDERS = [
  '记一句…',
  '粘个链接，AI 帮你抓内容…',
  '丢张图、丢段文字、说几个字…',
  '想到啥写啥，不用分类',
  '"明天 3 点开会"、"我喜欢深色界面"、"决定换工作"…',
];

const FILE_ACCEPT = 'image/*,.pdf,.doc,.docx,audio/*,.aac,.caf,.flac,.m4a,.mp3,.ogg,.wav,.webm';

const text = ref('');
const files = ref<File[]>([]);
const textarea = ref<HTMLTextAreaElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const dragging = ref(false);
const placeholder = ref(PLACEHOLDERS[0]);
const ghost = ref<CaptureSuccess | null>(null);

const { capture, submitting, lastError, acceptLifeline } = useSmartCapture();

const canSubmit = computed(() => (text.value.trim().length > 0 || files.value.length > 0) && !submitting.value);

let placeholderTimer: number | undefined;
let ghostTimer: number | undefined;

onMounted(() => {
  // 占位符 8s 轮换一次，让空状态有呼吸感但不打扰
  let idx = 0;
  placeholderTimer = window.setInterval(() => {
    idx = (idx + 1) % PLACEHOLDERS.length;
    placeholder.value = PLACEHOLDERS[idx];
  }, 8000);
  textarea.value?.focus();
});

onBeforeUnmount(() => {
  if (placeholderTimer) clearInterval(placeholderTimer);
  if (ghostTimer) clearTimeout(ghostTimer);
});

function autoGrow() {
  const el = textarea.value;
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 12 * 24) + 'px';
}

function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault();
    submit();
  }
}

async function submit() {
  if (!canSubmit.value) return;
  const payload = text.value;
  const fs = [...files.value];
  try {
    const result = await capture(payload, fs);
    text.value = '';
    files.value = [];
    await nextTick();
    autoGrow();
    showGhost(result);
  } catch {
    // 错误已经写到 lastError，UI 自己显示
  }
}

function showGhost(result: CaptureSuccess) {
  ghost.value = result;
  if (ghostTimer) clearTimeout(ghostTimer);
  ghostTimer = window.setTimeout(() => {
    ghost.value = null;
  }, 1800);
}

async function onAcceptLifeline() {
  if (!ghost.value) return
  await acceptLifeline(ghost.value)
  ghost.value = { ...ghost.value, suggestedLifelineId: undefined, suggestedLifelineName: undefined }
}

function onDrop(e: DragEvent) {
  dragging.value = false;
  if (!e.dataTransfer?.files.length) return;
  e.preventDefault();
  for (const f of e.dataTransfer.files) files.value.push(f);
}

function onPaste(e: ClipboardEvent) {
  if (!e.clipboardData) return;
  const items = e.clipboardData.items;
  for (const it of items) {
    if (it.kind === 'file') {
      const f = it.getAsFile();
      if (f) files.value.push(f);
    }
  }
}

function openFilePicker() {
  fileInput.value?.click();
}

function onFilePicked(e: Event) {
  const input = e.target as HTMLInputElement | null;
  if (!input?.files?.length) return;
  for (const f of input.files) files.value.push(f);
  input.value = '';
}

function removeFile(idx: number) {
  files.value.splice(idx, 1);
}
</script>

<template>
  <div
    class="smart-input"
    :class="{ dragging, submitting }"
    @dragenter.prevent="dragging = true"
    @dragover.prevent="dragging = true"
    @dragleave.prevent="dragging = false"
    @drop="onDrop"
  >
    <textarea
      ref="textarea"
      v-model="text"
      :placeholder="placeholder"
      rows="2"
      :disabled="submitting"
      @input="autoGrow"
      @keydown="onKeydown"
      @paste="onPaste"
    />
    <input
      id="smart-file-input"
      ref="fileInput"
      class="sr-only-file"
      type="file"
      multiple
      :accept="FILE_ACCEPT"
      :disabled="submitting"
      @change="onFilePicked"
    >

    <Transition name="fade">
      <div v-if="files.length" class="attachments">
        <button
          v-for="(f, i) in files"
          :key="i"
          class="chip"
          type="button"
          :title="f.name"
          @click="removeFile(i)"
        >
          <span class="chip-name">{{ f.name }}</span>
          <span class="chip-size">{{ humanSize(f.size) }}</span>
          <span class="chip-x">×</span>
        </button>
      </div>
    </Transition>

    <div class="bar">
      <div class="bar-left">
        <Transition name="fade" mode="out-in">
          <span v-if="ghost" class="ghost" :data-kind="ghost.kind">
            <span class="ghost-dot" />
            AI 判定为 <strong>{{ ghost.label }}</strong>
            <template v-if="ghost.suggestedLifelineName">
              · 归类到
              <strong class="lifeline-suggest">{{ ghost.suggestedLifelineName }}</strong>
              <button class="ghost-accept" @click="onAcceptLifeline">✓</button>
            </template>
          </span>
          <span v-else-if="lastError" class="error">{{ lastError }}</span>
          <span v-else-if="submitting" class="hint">写入中…</span>
          <span v-else-if="files.length || text" class="hint mono">
            <kbd>⌘</kbd><kbd>↵</kbd> 提交
          </span>
          <span v-else class="hint dim">
            少思考、多记录。AI 会判断这是笔记、任务还是记忆。
          </span>
        </Transition>
      </div>

      <div class="bar-actions">
        <button
          class="attach"
          type="button"
          :disabled="submitting"
          title="选择附件"
          aria-label="选择附件"
          @click="openFilePicker"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path
              d="M5.5 8.8l3.8-3.8a2.2 2.2 0 1 1 3.1 3.1l-5 5a3.4 3.4 0 0 1-4.8-4.8l5.4-5.4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.35"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <button
          class="submit"
          type="button"
          :disabled="!canSubmit"
          @click="submit"
          aria-label="提交"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path
              d="M2 8h12M9 3l5 5-5 5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.smart-input {
  position: relative;
  background: var(--surface-2);
  border: 1px solid var(--line-1);
  border-radius: var(--r-3);
  padding: var(--s-4);
  transition: border-color var(--t-base) var(--ease),
              background var(--t-base) var(--ease),
              box-shadow var(--t-base) var(--ease);
}

.smart-input:focus-within {
  border-color: var(--line-3);
  background: var(--surface-2);
  box-shadow: 0 0 0 4px var(--accent-glow);
}

.smart-input.dragging {
  border-color: var(--accent);
  background: var(--surface-3);
}

.smart-input.submitting {
  opacity: 0.7;
}

textarea {
  width: 100%;
  min-height: 56px;
  font-size: var(--fs-5);
  line-height: var(--lh-base);
  color: var(--text-1);
  resize: none;
  background: transparent;
  border: none;
  outline: none;
  overflow: hidden;
}

textarea::placeholder {
  color: var(--text-4);
}

.sr-only-file {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.attachments {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
  margin-top: var(--s-3);
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  padding: 4px 10px;
  background: var(--surface-3);
  border: 1px solid var(--line-2);
  border-radius: var(--r-pill);
  font-size: var(--fs-2);
  color: var(--text-2);
  max-width: 240px;
  transition: background var(--t-fast) var(--ease);
}

.chip:hover {
  background: var(--surface-4);
}

.chip-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chip-size {
  color: var(--text-4);
  font-family: var(--font-mono);
  font-size: var(--fs-1);
}

.chip-x {
  color: var(--text-4);
  margin-left: 2px;
}

.chip:hover .chip-x {
  color: var(--error);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--s-3);
  min-height: 24px;
}

.bar-left {
  font-size: var(--fs-2);
  flex: 1;
  min-width: 0;
}

.bar-actions {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  flex: 0 0 auto;
}

.hint {
  color: var(--text-3);
}

.hint.dim {
  color: var(--text-4);
}

.hint.mono kbd {
  display: inline-block;
  padding: 2px 6px;
  margin: 0 2px;
  background: var(--surface-3);
  border: 1px solid var(--line-2);
  border-radius: var(--r-1);
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-2);
}

.error {
  color: var(--error);
}

.ghost {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  color: var(--text-2);
}

.ghost strong {
  color: var(--accent);
  font-weight: 500;
}

.ghost-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}

.ghost .lifeline-suggest {
  color: var(--accent);
}

.ghost-accept {
  background: none;
  border: 1px solid var(--accent);
  border-radius: var(--r-1);
  color: var(--accent);
  cursor: pointer;
  font-size: 12px;
  padding: 0 4px;
  margin-left: 2px;
  line-height: 1.4;
}

.ghost-accept:hover {
  background: var(--accent);
  color: var(--surface-0);
}

.attach,
.submit {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  background: var(--surface-3);
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  color: var(--text-2);
  transition: all var(--t-fast) var(--ease);
}

.attach {
  background: transparent;
  color: var(--text-3);
}

.attach:hover:not(:disabled) {
  background: var(--surface-3);
  border-color: var(--line-3);
  color: var(--text-1);
}

.submit:hover:not(:disabled) {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--surface-0);
}

.attach:disabled,
.submit:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
