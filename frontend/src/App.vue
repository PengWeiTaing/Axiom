<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useModeStore } from '@/stores/mode';
import KeyGate from '@/components/KeyGate.vue';
import CaptureView from '@/views/CaptureView.vue';
import QuickCapture from '@/components/QuickCapture.vue';
import FloatChat from '@/components/FloatChat.vue';

// Atlas 视图懒加载，避免拖慢 Capture 启动
const AtlasView = defineAsyncComponent(() => import('@/views/AtlasView.vue'));

const auth = useAuthStore();
const mode = useModeStore();

onMounted(async () => {
  if (auth.hasKey) {
    await auth.verify();
  }
});
</script>

<template>
  <KeyGate v-if="!auth.ready" />
  <template v-else>
    <Transition name="mode" mode="out-in">
      <CaptureView v-if="mode.mode === 'capture'" key="capture" />
      <AtlasView v-else key="atlas" />
    </Transition>
    <QuickCapture />
    <FloatChat />
  </template>
</template>

<style>
/* 模式切换过渡：轻微缩放 + 渐隐，传达"切到另一种视角" */
.mode-enter-active,
.mode-leave-active {
  transition: opacity 240ms var(--ease),
              transform 240ms var(--ease);
}

.mode-enter-from {
  opacity: 0;
  transform: scale(1.02);
}

.mode-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
