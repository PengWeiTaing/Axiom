<script setup lang="ts">
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
  if (!(el instanceof HTMLElement)) return false;
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) || el.isContentEditable;
}

function onKey(event: KeyboardEvent) {
  if (event.ctrlKey && event.key === '/' && !isTextLikeElement(event.target)) {
    event.preventDefault();
    show();
  }
  if (event.key === 'Escape' && open.value) {
    event.preventDefault();
    close();
  }
}

watch(open, async (value) => {
  if (!value) return;
  await nextTick();
  textarea.value?.focus();
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

async function submit(event?: Event) {
  event?.preventDefault();
  if ((!text.value.trim() && !files.value.length) || submitting.value) return;
  try {
    const result = await capture(text.value, files.value);
    text.value = '';
    files.value = [];
    open.value = false;
    emit('captured', result);
    showToast(result);
  } catch {
    // useSmartCapture exposes the actionable error message.
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

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    submit();
  }
}

function showToast(result: CaptureSuccess) {
  toast.value = result;
  toastTimer.schedule(() => {
    toast.value = null;
  }, 1800);
}

useWindowEventListener('keydown', onKey);
defineExpose({ show, close });
</script>

<template>
  <Transition name="capture-plane">
    <div v-if="open" class="quick-overlay" @click.self="close" @dragover.prevent @drop.prevent="onDrop">
      <section class="capture-plane" role="dialog" aria-modal="true" aria-label="记录">
        <header class="capture-head">
          <div>
            <span>AXIOM / INTAKE</span>
            <strong>先接住，再理解。</strong>
          </div>
          <button type="button" title="关闭" aria-label="关闭记录" @click="close">
            <X :size="21" :stroke-width="1.45" />
          </button>
        </header>

        <div class="capture-editor">
          <span class="capture-index" aria-hidden="true" />
          <textarea
            ref="textarea"
            v-model="text"
            rows="4"
            placeholder="正在占据你注意力的，是……"
            :disabled="submitting"
            @keydown="onKeydown"
            @paste="onPaste"
          />
        </div>

        <div v-if="files.length" class="file-list" aria-label="待记录附件">
          <div v-for="(file, index) in files" :key="fileKey(file)" class="file-row">
            <File :size="15" />
            <span>{{ file.name }}</span>
            <button type="button" :title="`移除 ${file.name}`" :aria-label="`移除 ${file.name}`" @click="removeFile(index)">
              <X :size="14" />
            </button>
          </div>
        </div>

        <footer class="capture-foot">
          <input ref="fileInput" class="file-input" type="file" multiple @change="onFileChange">
          <button class="attach-button" type="button" title="添加附件" aria-label="添加附件" @click="fileInput?.click()">
            <Paperclip :size="18" :stroke-width="1.55" />
          </button>
          <span v-if="lastError" class="error">{{ lastError }}</span>
          <span v-else-if="submitting">正在写入外脑</span>
          <span v-else>未分类输入</span>
          <button
            class="submit-button"
            type="button"
            title="记录"
            aria-label="记录"
            :disabled="(!text.trim() && !files.length) || submitting"
            @click="submit()"
          >
            <ArrowUp :size="19" :stroke-width="1.7" />
          </button>
        </footer>
      </section>
    </div>
  </Transition>

  <Transition name="toast">
    <div v-if="toast" class="quick-toast">
      <span aria-hidden="true">✓</span>
      <p>已接住</p>
      <small>{{ toast.label }}</small>
    </div>
  </Transition>
</template>

<style scoped>
.quick-overlay {
  position: fixed;
  inset: 0;
  z-index: 90;
  overflow-y: auto;
  color: var(--text-2);
  background: rgba(11, 14, 12, 0.99);
}

.quick-overlay::before {
  content: '';
  position: fixed;
  top: 0;
  bottom: 0;
  left: max(24px, calc((100vw - 1120px) / 2));
  width: 3px;
  background: var(--focus);
  opacity: 1;
}

.capture-plane {
  width: min(1280px, calc(100% - 64px));
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto minmax(300px, 1fr) auto auto;
  margin: 0 auto;
  padding: 36px 0 38px 58px;
}

.capture-head {
  min-height: 104px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 28px;
  border-bottom: 1px solid var(--line-1);
}

.capture-head > div {
  display: grid;
  gap: 7px;
}

.capture-head span {
  color: var(--focus);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
}

.capture-head strong {
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 620;
}

.capture-head > button {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  color: var(--text-3);
  border: 1px solid var(--line-2);
}

.capture-head > button:hover {
  color: var(--surface-0);
  background: var(--text-1);
}

.capture-editor {
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);
  gap: 22px;
  align-content: center;
  padding: 58px 0;
}

.capture-index {
  width: 9px;
  height: 9px;
  margin-top: 19px;
  background: var(--focus);
  border-radius: 50%;
  box-shadow: 0 0 0 7px var(--focus-dim);
}

.capture-editor textarea {
  width: 100%;
  min-height: 250px;
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 44px;
  font-weight: 540;
  line-height: 1.42;
}

.capture-editor textarea::placeholder {
  color: var(--text-4);
}

.file-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  border-top: 1px solid var(--line-1);
}

.file-row {
  min-height: 42px;
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr) 28px;
  align-items: center;
  gap: 8px;
  color: var(--text-3);
  font-size: var(--fs-2);
  border-bottom: 1px solid var(--line-1);
}

.file-row span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-row button {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
}

.capture-foot {
  min-height: 62px;
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--text-4);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 560;
  border-top: 1px solid var(--line-2);
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
  color: var(--text-3);
}

.attach-button:hover {
  color: var(--cobalt);
}

.submit-button {
  margin-left: auto;
  color: var(--surface-0);
  background: var(--text-1);
  border-radius: 50%;
}

.submit-button:hover:not(:disabled) {
  background: var(--focus);
}

.submit-button:disabled {
  color: var(--text-5);
  background: var(--surface-2);
}

.error {
  color: var(--error);
}

.quick-toast {
  position: fixed;
  right: 28px;
  bottom: 28px;
  z-index: 95;
  min-width: 190px;
  display: grid;
  grid-template-columns: 24px 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  color: var(--text-1);
  background: var(--surface-3);
  border: 1px solid var(--line-2);
  box-shadow: var(--shadow-1);
}

.quick-toast > span {
  color: var(--success);
}

.quick-toast p {
  font-size: 13px;
  font-weight: 600;
}

.quick-toast small {
  color: var(--text-3);
  font-size: 11px;
}

.capture-plane-enter-active,
.capture-plane-leave-active {
  transition: clip-path var(--t-slow) var(--ease), opacity var(--t-base) var(--ease);
}

.capture-plane-enter-from,
.capture-plane-leave-to {
  opacity: 0;
  clip-path: inset(100% 0 0 0);
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity var(--t-base) var(--ease), transform var(--t-base) var(--ease);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 640px) {
  .quick-overlay::before {
    left: 18px;
  }

  .capture-plane {
    width: calc(100% - 36px);
    padding: 24px 0 calc(var(--app-mobile-nav-height) + 16px) 20px;
  }

  .capture-head {
    min-height: 96px;
  }

  .capture-head strong {
    font-size: 20px;
  }

  .capture-editor {
    grid-template-columns: 12px minmax(0, 1fr);
    gap: 12px;
    padding: 36px 0;
  }

  .capture-index {
    width: 7px;
    height: 7px;
    margin-top: 13px;
  }

  .capture-editor textarea {
    min-height: 220px;
    font-size: 30px;
  }

  .capture-foot > span {
    max-width: 150px;
    line-height: 1.35;
  }

  .quick-toast {
    right: 14px;
    bottom: calc(var(--app-mobile-nav-height) + 14px);
    left: 14px;
  }
}
</style>
