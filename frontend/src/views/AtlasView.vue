<script setup lang="ts">
/** AtlasView — 懒加载 Cosmos 原型 */
import { defineAsyncComponent } from 'vue'

const CosmosView = defineAsyncComponent(() => import('./CosmosView.vue'))
</script>

<template>
  <Suspense>
    <CosmosView />
    <template #fallback>
      <div class="loading">加载 Atlas…</div>
    </template>
  </Suspense>
</template>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: var(--text-4);
  font-size: var(--fs-4);
}
</style>
