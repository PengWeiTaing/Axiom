<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{ showAssoc: boolean }>()

const faded = ref(false)
const hovering = ref(false)
let fadeTimer: number | undefined

function resetFade() {
  faded.value = false
  if (fadeTimer) clearTimeout(fadeTimer)
  fadeTimer = window.setTimeout(() => { if (!hovering.value) faded.value = true }, 5000)
}

onMounted(() => resetFade())
onBeforeUnmount(() => { if (fadeTimer) clearTimeout(fadeTimer) })

watch(() => props.showAssoc, () => resetFade())
</script>

<template>
  <div
    class="legend-bar"
    :class="{ faded: faded && !hovering }"
    @mouseenter="hovering = true; faded = false"
    @mouseleave="hovering = false; resetFade()"
  >
    <div class="legend-section">
      <span class="legend-title">节点</span>
      <span class="legend-item"><span class="dot task">■</span> 任务</span>
      <span class="legend-item"><span class="dot memory">●</span> 记忆</span>
      <span class="legend-item"><span class="dot decision">◆</span> 决策</span>
      <span class="legend-item"><span class="dot item">▲</span> 条目</span>
    </div>
    <template v-if="showAssoc">
      <div class="legend-sep">|</div>
      <div class="legend-section">
        <span class="legend-title">关联</span>
        <span class="legend-item"><span class="line-sample causal" /> 因果</span>
        <span class="legend-item"><span class="line-sample co" /> 共现</span>
        <span class="legend-item"><span class="line-sample tension" /> 张力</span>
        <span class="legend-item"><span class="line-sample derived" /> 衍生</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.legend-bar {
  position: absolute;
  bottom: var(--s-4);
  left: var(--s-3);
  display: flex;
  align-items: center;
  gap: var(--s-2);
  padding: var(--s-1) var(--s-2);
  background: var(--surface-1);
  border-radius: var(--r-2);
  z-index: 21;
  font-size: var(--fs-1);
  color: var(--text-3);
  transition: opacity 0.5s var(--ease);
}

.legend-bar.faded {
  opacity: 0.3;
}

.legend-section {
  display: flex;
  align-items: center;
  gap: var(--s-1);
}

.legend-title {
  color: var(--text-4);
  margin-right: var(--s-1);
}

.legend-sep {
  color: var(--text-5);
}

.dot {
  font-size: 12px;
}

.dot.task { color: var(--accent); }
.dot.memory { color: var(--text-2); }
.dot.decision { color: var(--warm); }
.dot.item { color: var(--text-3); }

.line-sample {
  display: inline-block;
  width: 16px;
  height: 2px;
  border-radius: 1px;
  vertical-align: middle;
  margin-right: 2px;
}
.line-sample.causal { background: var(--accent); }
.line-sample.co { background: var(--text-3); }
.line-sample.tension { background: var(--warm); }
.line-sample.derived { background: var(--text-4); }
</style>
