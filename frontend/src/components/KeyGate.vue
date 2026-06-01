<script setup lang="ts">
/*
 * KeyGate — 首次进入或 key 失效时的门禁
 *
 * 视觉上要"克制庄重"，不要花哨。
 * 单一输入框，单一动作。
 */

import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const input = ref(auth.key);
const checking = ref(false);

async function submit() {
  if (!input.value.trim() || checking.value) return;
  checking.value = true;
  auth.setKey(input.value);
  await auth.verify();
  checking.value = false;
}
</script>

<template>
  <div class="gate">
    <div class="gate-card">
      <div class="gate-mark">
        <span class="mark-dot" />
        <span class="mark-text">Axiom</span>
      </div>
      <p class="gate-line">个人外脑 · 输入访问密钥</p>

      <form @submit.prevent="submit">
        <input
          class="visually-hidden"
          type="text"
          name="username"
          autocomplete="username"
          value="axiom"
          tabindex="-1"
          aria-hidden="true"
        />
        <input
          v-model="input"
          type="password"
          name="axiom-key"
          autocomplete="current-password"
          placeholder="X-Axiom-Key"
          autofocus
          spellcheck="false"
        />
        <button type="submit" :disabled="!input.trim() || checking">
          {{ checking ? '验证中…' : '进入' }}
        </button>
      </form>

      <p v-if="auth.lastError" class="gate-err">{{ auth.lastError }}</p>
      <p class="gate-hint">密钥仅保存在本机浏览器，用于所有 API 请求的 X-Axiom-Key 头。</p>
    </div>
  </div>
</template>

<style scoped>
.gate {
  flex: 1;
  display: grid;
  place-items: center;
  padding: var(--s-5);
}

.gate-card {
  width: min(360px, 92vw);
  display: flex;
  flex-direction: column;
  gap: var(--s-4);
  text-align: center;
}

.gate-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--s-2);
  margin-bottom: var(--s-3);
}

.mark-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent);
}

.mark-text {
  font-size: var(--fs-7);
  font-weight: 500;
  color: var(--text-1);
  letter-spacing: -0.02em;
}

.gate-line {
  color: var(--text-3);
  font-size: var(--fs-3);
  margin-bottom: var(--s-4);
}

form {
  display: flex;
  gap: var(--s-2);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

form input {
  flex: 1;
  padding: var(--s-3) var(--s-4);
  background: var(--surface-2);
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  color: var(--text-1);
  font-size: var(--fs-4);
  font-family: var(--font-mono);
  transition: all var(--t-fast) var(--ease);
}

form input:focus {
  border-color: var(--line-3);
  box-shadow: 0 0 0 4px var(--accent-glow);
}

form button {
  padding: 0 var(--s-4);
  background: var(--accent);
  color: var(--surface-0);
  border-radius: var(--r-2);
  font-size: var(--fs-3);
  font-weight: 500;
  transition: all var(--t-fast) var(--ease);
}

form button:hover:not(:disabled) {
  background: var(--accent-bright);
}

form button:disabled {
  background: var(--surface-3);
  color: var(--text-4);
  cursor: not-allowed;
}

.gate-err {
  color: var(--error);
  font-size: var(--fs-2);
}

.gate-hint {
  margin-top: var(--s-3);
  color: var(--text-4);
  font-size: var(--fs-2);
  line-height: var(--lh-base);
}
</style>
