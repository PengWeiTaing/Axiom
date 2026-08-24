<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useModeStore } from '@/stores/mode';
import KeyGate from '@/components/KeyGate.vue';
import AppNavigation from '@/components/AppNavigation.vue';
import AxiomAtmosphere from '@/components/AxiomAtmosphere.vue';
import QuickCapture from '@/components/QuickCapture.vue';
import TodayView from '@/views/TodayView.vue';

// 次级视图按需加载，让默认的“此刻”保持轻量。
const AtlasView = defineAsyncComponent(() => import('@/views/AtlasView.vue'));
const CosmosView = defineAsyncComponent(() => import('@/views/CosmosView.vue'));
const RecentView = defineAsyncComponent(() => import('@/views/RecentView.vue'));
const ProcessingView = defineAsyncComponent(() => import('@/views/ProcessingView.vue'));
const SearchView = defineAsyncComponent(() => import('@/views/SearchView.vue'));
const TimelineView = defineAsyncComponent(() => import('@/views/TimelineView.vue'));
const TasksView = defineAsyncComponent(() => import('@/views/TasksView.vue'));
const MemoriesView = defineAsyncComponent(() => import('@/views/MemoriesView.vue'));
const DecisionsView = defineAsyncComponent(() => import('@/views/DecisionsView.vue'));
const AutomationView = defineAsyncComponent(() => import('@/views/AutomationView.vue'));
const SystemView = defineAsyncComponent(() => import('@/views/SystemView.vue'));

const auth = useAuthStore();
const mode = useModeStore();
const quickCapture = ref<InstanceType<typeof QuickCapture> | null>(null);
const captureRevision = ref(0);

function openCapture() {
  quickCapture.value?.show();
}

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
    <AxiomAtmosphere :mode="mode.mode" />
    <AppNavigation @capture="openCapture" />
    <div class="app-stage" :class="[`mode-${mode.mode}`, { 'atlas-stage': mode.mode === 'atlas' }]">
      <Transition name="mode" mode="out-in">
        <TodayView
          v-if="mode.mode === 'today' || mode.mode === 'capture'"
          key="today"
          :revision="captureRevision"
          @capture="openCapture"
        />
        <SearchView
          v-else-if="mode.mode === 'library' || mode.mode === 'search'"
          :key="`library-${captureRevision}`"
        />
        <AtlasView v-else-if="mode.mode === 'atlas'" key="atlas" />
        <CosmosView v-else-if="mode.mode === 'cosmos'" key="cosmos" />
        <RecentView v-else-if="mode.mode === 'recent'" key="recent" />
        <ProcessingView v-else-if="mode.mode === 'processing'" key="processing" />
        <TimelineView v-else-if="mode.mode === 'timeline'" key="timeline" />
        <TasksView v-else-if="mode.mode === 'tasks'" key="tasks" />
        <MemoriesView v-else-if="mode.mode === 'memories'" key="memories" />
        <DecisionsView v-else-if="mode.mode === 'decisions'" key="decisions" />
        <AutomationView v-else-if="mode.mode === 'automation'" key="automation" />
        <SystemView v-else-if="mode.mode === 'system'" key="system" />
        <TodayView v-else key="fallback-today" :revision="captureRevision" @capture="openCapture" />
      </Transition>
    </div>
    <QuickCapture ref="quickCapture" @captured="captureRevision += 1" />
  </template>
</template>

<style>
.app-stage {
  --atlas-shell-left: 0px;
  --atlas-shell-top: var(--app-header-height);
  --atlas-shell-bottom: 0px;
  min-height: 100vh;
  padding-top: var(--app-header-height);
  position: relative;
}

.app-stage.atlas-stage {
  min-height: 0;
}

.mode-enter-active,
.mode-leave-active {
  transition: opacity var(--t-slow) var(--ease),
              transform var(--t-slow) var(--ease);
}

.mode-enter-from {
  opacity: 0;
  transform: translateY(7px);
}

.mode-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 760px) {
  .app-stage {
    --atlas-shell-left: 0px;
    --atlas-shell-top: 0px;
    --atlas-shell-bottom: var(--app-mobile-nav-height);
    padding-top: 0;
    padding-bottom: var(--app-mobile-nav-height);
  }
}
</style>
