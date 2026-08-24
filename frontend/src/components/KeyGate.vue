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

    <div class="gate-registration" aria-hidden="true">
      <i /><i /><i /><i />
    </div>

    <section class="gate-cover" aria-labelledby="gate-title">
      <div class="gate-title">
        <span class="gate-seal"><LockKeyhole :size="18" :stroke-width="1.45" /></span>
        <p>PERSONAL CORTEX</p>
        <h1 id="gate-title">Axiom</h1>
        <strong>私有外脑</strong>
      </div>

      <div class="gate-entry">
        <span class="entry-index">ACCESS / 01</span>
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
      <span>RECORD</span><i /><span>RECALL</span><i /><span>RELATE</span><i /><span>ACT</span>
    </footer>
  </main>
</template>

<style scoped>
.gate {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  padding: 28px clamp(28px, 4vw, 62px) 24px;
  color: var(--text-2);
  background: var(--surface-1);
}

.gate::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 7.5%;
  width: 12px;
  background: var(--focus);
}

.gate::after {
  content: 'A';
  position: absolute;
  right: -2vw;
  bottom: -18vh;
  color: rgba(23, 26, 22, 0.025);
  font-family: var(--font-display);
  font-size: 72vh;
  line-height: 1;
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
  font-size: 8px;
}

.gate-head {
  min-height: 44px;
  justify-content: space-between;
  border-bottom: 1px solid var(--line-2);
}

.gate-registration {
  position: absolute;
  inset: 90px clamp(28px, 4vw, 62px) 70px;
  pointer-events: none;
}

.gate-registration i {
  position: absolute;
  width: 24px;
  height: 24px;
}

.gate-registration i::before,
.gate-registration i::after {
  content: '';
  position: absolute;
  background: var(--line-2);
}

.gate-registration i::before { top: 0; left: 0; width: 24px; height: 1px; }
.gate-registration i::after { top: 0; left: 0; width: 1px; height: 24px; }
.gate-registration i:nth-child(1) { top: 0; left: 0; }
.gate-registration i:nth-child(2) { top: 0; right: 0; transform: rotate(90deg); }
.gate-registration i:nth-child(3) { right: 0; bottom: 0; transform: rotate(180deg); }
.gate-registration i:nth-child(4) { bottom: 0; left: 0; transform: rotate(270deg); }

.gate-cover {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 140px);
  display: grid;
  grid-template-columns: minmax(300px, 1.05fr) minmax(360px, 0.95fr);
  align-items: center;
}

.gate-title {
  min-height: 430px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 42px 7vw 42px 10vw;
  border-right: 1px solid var(--line-2);
}

.gate-seal {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  margin-bottom: 52px;
  color: var(--surface-1);
  background: var(--focus);
}

.gate-title p,
.entry-index,
.gate-local {
  color: var(--text-4);
  font-family: var(--font-mono);
  font-size: 8px;
}

.gate-title h1 {
  margin-top: 14px;
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 76px;
  font-weight: 400;
  line-height: 1;
}

.gate-title strong {
  margin-top: 18px;
  color: var(--text-3);
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 400;
}

.gate-entry {
  width: min(460px, calc(100% - 60px));
  justify-self: center;
  padding: 42px 0;
}

.entry-index {
  color: var(--cobalt);
}

.gate-entry form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 48px;
  align-items: end;
  gap: 16px;
  margin-top: 48px;
}

.gate-entry label {
  display: grid;
  gap: 9px;
}

.gate-entry label > span {
  color: var(--text-4);
  font-family: var(--font-mono);
  font-size: 8px;
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
  min-height: 48px;
  padding: 0 2px;
  color: var(--text-1);
  font-family: var(--font-mono);
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
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  color: var(--surface-1);
  background: var(--text-1);
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
    left: 18px;
    width: 4px;
  }

  .gate::after {
    right: -18vw;
    bottom: -5vh;
    font-size: 55vh;
  }

  .gate-cover {
    min-height: calc(100vh - 118px);
    grid-template-columns: 1fr;
    align-content: center;
  }

  .gate-title {
    min-height: 300px;
    padding: 48px 26px 34px;
    border-right: 0;
    border-bottom: 1px solid var(--line-2);
  }

  .gate-seal {
    margin-bottom: 38px;
  }

  .gate-title h1 {
    font-size: 58px;
  }

  .gate-entry {
    width: calc(100% - 52px);
    justify-self: end;
    padding: 38px 0 44px;
  }

  .gate-entry form {
    margin-top: 34px;
  }

  .gate-foot span:nth-of-type(2),
  .gate-foot span:nth-of-type(3),
  .gate-foot i:nth-of-type(2),
  .gate-foot i:nth-of-type(3) {
    display: none;
  }
}
</style>
