<script setup lang="ts">
import { ref } from 'vue';
import { ArrowRight, LockKeyhole } from '@lucide/vue';
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
    <header class="gate-head">
      <span>Axiom / Private Edition</span>
      <span>01</span>
    </header>

    <section class="gate-cover" aria-labelledby="gate-title">
      <div class="gate-title">
        <span class="gate-seal"><LockKeyhole :size="18" :stroke-width="1.45" /></span>
        <p>PERSONAL CORTEX</p>
        <h1 id="gate-title">Axiom</h1>
        <strong>私有外脑</strong>
      </div>

      <div class="gate-entry">
        <span class="entry-index">PRIVATE ACCESS / 01</span>
        <h2>回来，继续。</h2>
        <form @submit.prevent="submit">
          <input class="visually-hidden" type="text" name="username" autocomplete="username" value="axiom" tabindex="-1" aria-hidden="true" />
          <label>
            <span>访问密钥</span>
            <input v-model="input" type="password" name="axiom-key" autocomplete="current-password" placeholder="X-Axiom-Key" autofocus spellcheck="false" />
          </label>
          <button type="submit" :disabled="!input.trim() || checking" :title="checking ? '验证中' : '进入'" aria-label="进入 Axiom">
            <ArrowRight :size="20" :class="{ checking }" />
          </button>
        </form>
        <p v-if="auth.lastError" class="gate-error">{{ auth.lastError }}</p>
        <p class="gate-local">LOCAL DEVICE / ENCRYPTED TRANSIT</p>
      </div>
    </section>

    <footer class="gate-foot">
      <span>LOCAL FIRST</span><i /><span>PRIVATE CORTEX / 01</span>
    </footer>
  </main>
</template>

<style scoped>
.gate {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  padding: 24px clamp(24px, 3.5vw, 56px) 20px;
  color: var(--text-2);
  background: var(--surface-1);
}

.gate::before {
  content: '';
  position: absolute;
  top: 24px;
  bottom: 20px;
  left: clamp(24px, 3.5vw, 56px);
  width: 3px;
  background: var(--focus);
}

.gate::after {
  content: '';
  position: absolute;
  top: 18%;
  right: 35%;
  bottom: 12%;
  width: 1px;
  background: var(--line-1);
  pointer-events: none;
}

.gate-head,
.gate-foot {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  color: var(--text-4);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 560;
}

.gate-head {
  min-height: 44px;
  justify-content: space-between;
  border-bottom: 1px solid var(--line-2);
}

.gate-cover {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 140px);
  display: grid;
  grid-template-columns: minmax(420px, 1.35fr) minmax(380px, 0.65fr);
  align-items: center;
}

.gate-title {
  min-height: 520px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 64px 8vw 64px 9vw;
}

.gate-seal {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  margin-bottom: 68px;
  color: var(--focus-bright);
  background: var(--focus-dim);
  border: 1px solid var(--line-warm);
  border-radius: 50%;
}

.gate-title p,
.entry-index,
.gate-local {
  color: var(--text-4);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 580;
}

.gate-title h1 {
  margin-top: 14px;
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 92px;
  font-weight: 660;
  line-height: 0.96;
}

.gate-title strong {
  margin-top: 18px;
  color: var(--text-3);
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 560;
}

.gate-entry {
  width: 100%;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 64px clamp(42px, 5vw, 76px);
  background: var(--surface-2);
  border-left: 1px solid var(--line-2);
}

.entry-index {
  color: var(--focus-bright);
}

.gate-entry h2 {
  margin-top: 20px;
  color: var(--text-1);
  font-size: 30px;
  font-weight: 620;
}

.gate-entry form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 48px;
  align-items: end;
  gap: 16px;
  margin-top: 62px;
}

.gate-entry label {
  display: grid;
  gap: 9px;
}

.gate-entry label > span {
  color: var(--text-4);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 560;
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

.gate-entry input:not(.visually-hidden) {
  width: 100%;
  min-height: 54px;
  padding: 0 2px;
  color: var(--text-1);
  font-size: 16px;
  font-weight: 520;
  border-bottom: 1px solid var(--line-3);
}

.gate-entry input:not(.visually-hidden):focus {
  border-bottom-color: var(--focus);
}

.gate-entry input:not(.visually-hidden):focus-visible {
  outline: none;
}

.gate-entry input::placeholder {
  color: var(--text-5);
}

.gate-entry form button {
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  color: var(--surface-0);
  background: var(--text-1);
  border-radius: 50%;
}

.gate-entry form button:hover:not(:disabled) {
  background: var(--focus);
}

.gate-error,
.gate-local {
  margin-top: 18px;
}

.gate-error {
  color: var(--error);
  font-size: 11px;
}

.checking {
  animation: checking 800ms var(--ease) infinite alternate;
}

.gate-foot {
  min-height: 42px;
  gap: 12px;
  border-top: 1px solid var(--line-2);
}

.gate-foot i {
  flex: 1;
  height: 1px;
  background: var(--line-1);
}

@keyframes checking {
  to { opacity: 0.3; transform: translateX(5px); }
}

@media (max-width: 760px) {
  .gate {
    padding: 18px 18px calc(18px + env(safe-area-inset-bottom));
  }

  .gate::before {
    top: 18px;
    bottom: 18px;
    left: 18px;
    width: 3px;
  }

  .gate::after {
    display: none;
  }

  .gate-cover {
    min-height: calc(100vh - 118px);
    grid-template-columns: 1fr;
    align-content: center;
  }

  .gate-title {
    min-height: 320px;
    padding: 52px 26px 36px;
    border-right: 0;
    border-bottom: 1px solid var(--line-2);
  }

  .gate-seal {
    margin-bottom: 38px;
  }

  .gate-title h1 {
    font-size: 64px;
  }

  .gate-entry {
    width: calc(100% - 26px);
    min-height: 310px;
    justify-self: end;
    padding: 42px 28px 50px;
    border-left: 0;
    border-top: 1px solid var(--line-2);
  }

  .gate-entry form {
    margin-top: 42px;
  }

  .gate-foot span:last-child { display: none; }
}
</style>
