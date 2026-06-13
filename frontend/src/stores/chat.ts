/*
 * Chat store — 悬浮 AI 管家
 *
 * 历史持久化到 localStorage，但只保留最近 50 条（避免无限增长）
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { streamRequest, ApiError } from '@/api/client';
import { readStoredJson, writeStoredJson } from '@/composables/useLocalStorage';
import { isAbortError } from '@/utils/http';

const STORAGE_KEY = 'axiom.chat.history';
const MAX_HISTORY = 50;

export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
  ts: number;
  pending?: boolean;
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>(load());
  const sending = ref(false);
  const error = ref<string | null>(null);
  const open = ref(false);
  let aborter: AbortController | null = null;

  const empty = computed(() => messages.value.length === 0);

  function load(): Message[] {
    const parsed = readStoredJson<unknown>(STORAGE_KEY, []);
    return Array.isArray(parsed) ? parsed.slice(-MAX_HISTORY) as Message[] : [];
  }

  function persist() {
    const trimmed = messages.value.slice(-MAX_HISTORY);
    writeStoredJson(STORAGE_KEY, trimmed);
  }

  function clear() {
    messages.value = [];
    persist();
    error.value = null;
  }

  function cancel() {
    aborter?.abort();
    aborter = null;
    sending.value = false;
    // 把 pending 的最后一条 assistant 留下，标记完成
    const last = messages.value[messages.value.length - 1];
    if (last && last.role === 'assistant' && last.pending) {
      last.pending = false;
      if (!last.content) last.content = '(已取消)';
      persist();
    }
  }

  async function send(text: string) {
    if (sending.value) return;
    const trimmed = text.trim();
    if (!trimmed) return;

    sending.value = true;
    error.value = null;

    const userMsg: Message = {
      id: 'u' + Date.now(),
      role: 'user',
      content: trimmed,
      ts: Date.now(),
    };
    const replyMsg: Message = {
      id: 'a' + (Date.now() + 1),
      role: 'assistant',
      content: '',
      ts: Date.now() + 1,
      pending: true,
    };
    messages.value.push(userMsg, replyMsg);

    aborter = new AbortController();
    const historyForApi = messages.value
      .slice(0, -2) // 排除当前刚加的两条
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      await streamRequest(
        '/chat/stream',
        { message: trimmed, history: historyForApi },
        (chunk) => {
          replyMsg.content += chunk;
        },
        aborter.signal,
      );
      replyMsg.pending = false;
      if (!replyMsg.content) replyMsg.content = '(空回复)';
    } catch (err) {
      if (isAbortError(err)) {
        // 已经在 cancel 里处理过
        return;
      }
      replyMsg.pending = false;
      replyMsg.content = replyMsg.content || '';
      error.value = err instanceof ApiError ? err.message : '连接失败';
      replyMsg.content += `\n\n_[${error.value}]_`;
    } finally {
      sending.value = false;
      aborter = null;
      persist();
    }
  }

  return { messages, sending, error, open, empty, send, cancel, clear };
});
