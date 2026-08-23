<script setup lang="ts">
import { ref } from 'vue';
import { ArrowRight, CircleDot } from '@lucide/vue';
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
  <main class="gate">
    <div class="gate-field" aria-hidden="true">
      <i v-for="index in 9" :key="index" />
      <span />
    </div>
    <p class="gate-coordinate">PRIVATE COGNITIVE SYSTEM · 01</p>

    <section class="gate-card" aria-labelledby="gate-title">
      <div class="gate-mark">
        <CircleDot :size="30" :stroke-width="1.2" />
        <span>AX / 01</span>
      </div>
      <h1 id="gate-title">Axiom</h1>
      <p class="gate-line">个人外脑 · 私有入口</p>

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
        <label>
          <span>访问密钥</span>
          <input
            v-model="input"
            type="password"
            name="axiom-key"
            autocomplete="current-password"
            placeholder="X-Axiom-Key"
            autofocus
            spellcheck="false"
          />
        </label>
        <button type="submit" :disabled="!input.trim() || checking" :title="checking ? '验证中' : '进入'" aria-label="进入 Axiom">
          <ArrowRight :size="20" :class="{ checking }" />
        </button>
      </form>

      <p v-if="auth.lastError" class="gate-err">{{ auth.lastError }}</p>
      <p class="gate-hint">密钥只保留在当前设备。</p>
    </section>
  </main>
</template>

<style scoped>
.gate {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(260px, 0.82fr) minmax(420px, 1.18fr);
  align-items: stretch;
  background: var(--surface-0);
}

.gate::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 38%;
  width: 1px;
  background: var(--line-1);
}

.gate::after {
  content: '';
  position: absolute;
  top: 12%;
  left: calc(38% - 1px);
  width: 3px;
  height: 19%;
  background: var(--vermilion);
}

.gate-field {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.gate-field i {
  position: absolute;
  right: 10%;
  width: 72%;
  height: 1px;
  background: rgba(242, 237, 225, 0.055);
  transform-origin: right center;
}

.gate-field i:nth-child(1) { top: 18%; transform: rotate(-4deg); }
.gate-field i:nth-child(2) { top: 26%; transform: rotate(3deg); width: 58%; }
.gate-field i:nth-child(3) { top: 35%; transform: rotate(-8deg); width: 82%; }
.gate-field i:nth-child(4) { top: 45%; transform: rotate(5deg); width: 66%; }
.gate-field i:nth-child(5) { top: 55%; transform: rotate(-2deg); width: 92%; }
.gate-field i:nth-child(6) { top: 65%; transform: rotate(7deg); width: 76%; }
.gate-field i:nth-child(7) { top: 73%; transform: rotate(-5deg); width: 54%; }
.gate-field i:nth-child(8) { top: 81%; transform: rotate(2deg); width: 84%; }
.gate-field i:nth-child(9) { top: 88%; transform: rotate(-3deg); width: 62%; }

.gate-field span {
  position: absolute;
  top: 34%;
  right: 18%;
  width: 88px;
  height: 88px;
  border: 1px solid rgba(225, 165, 88, 0.22);
  transform: rotate(45deg);
  animation: field-turn 24s linear infinite;
}

.gate-coordinate {
  position: absolute;
  left: 24px;
  bottom: 22px;
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 9px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.gate-card {
  width: min(570px, calc(100% - 72px));
  align-self: center;
  justify-self: center;
  padding: 56px 0;
}

.gate-mark {
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--focus-bright);
  margin-bottom: 64px;
}

.gate-mark svg {
  filter: drop-shadow(0 0 10px rgba(225, 165, 88, 0.22));
}

.gate-mark span {
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 9px;
}

h1 {
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 64px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
}

.gate-line {
  margin-top: 15px;
  color: var(--text-3);
  font-size: var(--fs-3);
}

form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 48px;
  align-items: end;
  gap: 16px;
  margin-top: 72px;
}

form label {
  display: grid;
  gap: 9px;
}

form label > span {
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 9px;
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

form input:not(.visually-hidden) {
  width: 100%;
  min-height: 48px;
  padding: 0 4px;
  border-bottom: 1px solid var(--line-3);
  color: var(--text-1);
  font-family: var(--font-mono);
  transition: border-color var(--t-base) var(--ease);
}

form input:not(.visually-hidden):focus {
  border-color: var(--focus-bright);
}

form input::placeholder {
  color: var(--text-5);
}

form button {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line-warm);
  border-radius: 50%;
  color: var(--focus-bright);
  transition: color var(--t-base) var(--ease), background var(--t-base) var(--ease), transform var(--t-base) var(--ease);
}

form button:hover:not(:disabled) {
  color: var(--surface-0);
  background: var(--focus);
  transform: translateX(3px);
}

.checking {
  animation: checking 1s var(--ease) infinite alternate;
}

.gate-err,
.gate-hint {
  margin-top: 18px;
  font-size: var(--fs-2);
}

.gate-err { color: var(--error); }
.gate-hint { color: var(--text-5); }

@keyframes field-turn {
  to { transform: rotate(405deg); }
}

@keyframes checking {
  to { opacity: 0.35; transform: translateX(5px); }
}

@media (max-width: 760px) {
  .gate {
    grid-template-columns: 1fr;
  }

  .gate::before {
    left: 18px;
  }

  .gate::after {
    top: 8%;
    left: 17px;
    height: 16%;
  }

  .gate-field {
    position: absolute;
    inset: 0;
    min-height: 0;
    opacity: 0.75;
  }

  .gate-field i {
    right: -16%;
  }

  .gate-field span {
    top: 17%;
    right: 10%;
    width: 64px;
    height: 64px;
  }

  .gate-coordinate {
    display: none;
  }

  .gate-card {
    position: relative;
    width: calc(100% - 56px);
    padding: 36px 0 90px;
  }

  .gate-mark {
    margin-bottom: 72px;
  }

  h1 {
    font-size: 52px;
  }

  form {
    margin-top: 58px;
  }
}
</style>
