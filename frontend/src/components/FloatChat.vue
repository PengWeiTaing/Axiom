<script setup lang="ts">
/*
 * FloatChat — 悬浮 AI 管家
 *
 * - 右下角圆点按钮 / Ctrl+K 触发
 * - 弹出对话窗，SSE 流式
 * - Esc 收起；Ctrl+K 再按一次也收起
 * - 历史 localStorage 持久化
 */

import { ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue';
import { useChatStore } from '@/stores/chat';
import { renderMarkdown } from '@/composables/useMarkdown';

const chat = useChatStore();
const input = ref('');
const textarea = ref<HTMLTextAreaElement | null>(null);
const scrollEl = ref<HTMLElement | null>(null);

watch(() => chat.open, async (open) => {
  if (open) {
    await nextTick();
    textarea.value?.focus();
    scrollToBottom();
  }
});

watch(() => chat.messages.length, async () => {
  await nextTick();
  scrollToBottom();
});

// 流式 token 增长时也滚到底
watch(
  () => chat.messages[chat.messages.length - 1]?.content,
  async () => {
    if (chat.open) {
      await nextTick();
      scrollToBottom();
    }
  },
);

function scrollToBottom() {
  const el = scrollEl.value;
  if (!el) return;
  el.scrollTop = el.scrollHeight;
}

onMounted(() => {
  window.addEventListener('keydown', onKey);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey);
});

function onKey(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
    e.preventDefault();
    chat.open = !chat.open;
  } else if (e.key === 'Escape' && chat.open) {
    chat.open = false;
  }
}

function submit() {
  const text = input.value;
  if (!text.trim() || chat.sending) return;
  input.value = '';
  chat.send(text);
}

function onTextareaKey(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
    e.preventDefault();
    submit();
  }
}
</script>

<template>
  <button
    class="trigger"
    :class="{ active: chat.open }"
    type="button"
    aria-label="AI 管家"
    @click="chat.open = !chat.open"
  >
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path
        d="M3 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H6l-3 3V4z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
    </svg>
  </button>

  <Transition name="popup">
    <div v-if="chat.open" class="popup" role="dialog" aria-label="AI 管家">
      <header class="popup-head">
        <span class="eyebrow">管家</span>
        <span class="title">问点什么</span>
        <span style="flex:1" />
        <button v-if="chat.sending" class="text-btn" @click="chat.cancel">停止</button>
        <button v-else-if="!chat.empty" class="text-btn" @click="chat.clear">清空</button>
        <button class="text-btn" @click="chat.open = false">收起</button>
      </header>

      <div ref="scrollEl" class="scroll">
        <div v-if="chat.empty" class="welcome">
          <p>问"今天该做什么？"、"上周记了哪些决策？"、"帮我总结这周的笔记"。</p>
          <p class="dim">Ctrl+K 随时呼出 / 收起。</p>
        </div>

        <div v-for="m in chat.messages" :key="m.id" :class="['msg', m.role]">
          <div class="bubble" v-html="renderMarkdown(m.content)" />
          <span v-if="m.pending" class="cursor" />
        </div>
      </div>

      <form class="composer" @submit.prevent="submit">
        <textarea
          ref="textarea"
          v-model="input"
          rows="2"
          placeholder="问点什么，Enter 发送"
          :disabled="chat.sending"
          @keydown="onTextareaKey"
        />
        <button class="send" type="submit" :disabled="!input.trim() || chat.sending">
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
      </form>
    </div>
  </Transition>
</template>

<style scoped>
.trigger {
  position: fixed;
  right: var(--s-5);
  bottom: var(--s-5);
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  background: var(--surface-3);
  border: 1px solid var(--line-2);
  border-radius: 50%;
  color: var(--text-2);
  box-shadow: var(--shadow-1);
  transition: all var(--t-fast) var(--ease);
  z-index: 60;
}

.trigger:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--surface-0);
  transform: translateY(-1px);
}

.trigger.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--surface-0);
}

.popup {
  position: fixed;
  right: var(--s-5);
  bottom: 80px;
  width: min(420px, calc(100vw - 32px));
  height: min(560px, calc(100vh - 120px));
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--line-2);
  border-radius: var(--r-3);
  box-shadow: var(--shadow-2);
  display: flex;
  flex-direction: column;
  z-index: 70;
  overflow: hidden;
}

.popup-head {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  padding: var(--s-3) var(--s-4);
  border-bottom: 1px solid var(--line-1);
}

.popup-head .title {
  font-size: var(--fs-3);
  color: var(--text-2);
}

.text-btn {
  font-size: var(--fs-2);
  color: var(--text-3);
  padding: 4px 8px;
  border-radius: var(--r-1);
  transition: all var(--t-fast) var(--ease);
}

.text-btn:hover {
  background: var(--surface-3);
  color: var(--text-1);
}

.scroll {
  flex: 1;
  overflow-y: auto;
  padding: var(--s-4);
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
}

.welcome {
  color: var(--text-3);
  font-size: var(--fs-3);
  padding: var(--s-3) 0;
}

.welcome p + p {
  margin-top: var(--s-2);
}

.msg {
  display: flex;
  flex-direction: column;
}

.msg.user {
  align-items: flex-end;
}

.msg.assistant {
  align-items: flex-start;
}

.bubble {
  max-width: 85%;
  padding: var(--s-2) var(--s-3);
  border-radius: var(--r-2);
  font-size: var(--fs-3);
  line-height: var(--lh-base);
  word-wrap: break-word;
}

.msg.user .bubble {
  background: var(--accent);
  color: var(--surface-0);
}

.msg.assistant .bubble {
  background: var(--surface-2);
  color: var(--text-1);
  border: 1px solid var(--line-1);
}

.bubble :deep(p) {
  margin: 0;
}
.bubble :deep(p + p) {
  margin-top: var(--s-2);
}
.bubble :deep(code) {
  background: rgba(255, 255, 255, 0.08);
  padding: 1px 5px;
  border-radius: var(--r-1);
  font-family: var(--font-mono);
  font-size: 12px;
}
.bubble :deep(strong) {
  font-weight: 600;
}

.cursor {
  display: inline-block;
  width: 6px;
  height: 12px;
  background: var(--accent);
  margin-top: 4px;
  animation: blink 1s steps(2) infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.composer {
  display: flex;
  gap: var(--s-2);
  align-items: flex-end;
  padding: var(--s-3);
  border-top: 1px solid var(--line-1);
  background: var(--surface-1);
}

.composer textarea {
  flex: 1;
  min-height: 36px;
  max-height: 120px;
  padding: var(--s-2) var(--s-3);
  background: var(--surface-2);
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  font-size: var(--fs-3);
  color: var(--text-1);
  resize: none;
}

.composer textarea:focus {
  border-color: var(--line-3);
}

.send {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  background: var(--accent);
  color: var(--surface-0);
  border-radius: var(--r-2);
  transition: all var(--t-fast) var(--ease);
}

.send:disabled {
  background: var(--surface-3);
  color: var(--text-4);
  cursor: not-allowed;
}

.popup-enter-active,
.popup-leave-active {
  transition: opacity var(--t-base) var(--ease),
              transform var(--t-base) var(--ease);
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>
