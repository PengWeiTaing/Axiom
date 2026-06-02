<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useModeStore } from '@/stores/mode';
import KeyGate from '@/components/KeyGate.vue';
import CaptureView from '@/views/CaptureView.vue';
import ModeSwitcher from '@/components/ModeSwitcher.vue';
import QuickCapture from '@/components/QuickCapture.vue';
import FloatChat from '@/components/FloatChat.vue';

// 懒加载，避免拖慢 Capture 启动
const AtlasView = defineAsyncComponent(() => import('@/views/AtlasView.vue'));
const RecentView = defineAsyncComponent(() => import('@/views/RecentView.vue'));
const TasksView = defineAsyncComponent(() => import('@/views/TasksView.vue'));
const AutomationView = defineAsyncComponent(() => import('@/views/AutomationView.vue'));

const auth = useAuthStore();
const mode = useModeStore();

onMounted(async () => {
  mode.bindHistory();
  if (auth.hasKey) {
    await auth.verify();
  }
});
</script>

<template>
  <KeyGate v-if="!auth.ready" />
  <template v-else>
    <ModeSwitcher v-if="auth.ready" />
    <Transition name="mode" mode="out-in">
      <CaptureView v-if="mode.mode === 'capture'" key="capture" />
      <AtlasView v-else-if="mode.mode === 'atlas'" key="atlas" />
      <RecentView v-else-if="mode.mode === 'recent'" key="recent" />
      <TasksView v-else-if="mode.mode === 'tasks'" key="tasks" />
      <AutomationView v-else-if="mode.mode === 'automation'" key="automation" />
      <RecentView v-else key="fallback-recent" />
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
