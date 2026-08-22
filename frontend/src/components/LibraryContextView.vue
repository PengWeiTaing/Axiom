<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import {
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Circle,
  FileText,
  FolderTree,
  GitFork,
  ListTree,
  ListTodo,
  Target,
} from '@lucide/vue';
import { ApiError } from '@/api/client';
import { getLifelineContext, getLifelineIndex } from '@/api/cosmos';
import {
  memoryCategoryLabel,
  memoryStatusLabel,
  taskPriorityLabel,
  taskStatusLabel,
} from '@/composables/useObjectLabels';
import { formatRelative } from '@/composables/useRelativeTime';
import type {
  LifelineContextActivity,
  LifelineContextGoal,
  LifelineContextPayload,
  LifelineSummary,
  ObjectTarget,
} from '@/api/types';

const props = defineProps<{ selectedId?: string | null }>();
const emit = defineEmits<{
  selectLifeline: [id: string];
  openItem: [id: number];
  openObject: [target: ObjectTarget];
}>();

const indexLoading = ref(false);
const contextLoading = ref(false);
const error = ref<string | null>(null);
const lifelines = ref<LifelineSummary[]>([]);
const context = ref<LifelineContextPayload | null>(null);
const loadingContextId = ref<string | null>(null);
let contextRequest = 0;

const activeId = computed(() => props.selectedId || context.value?.lifeline.id || null);
const compositeTasks = computed(() => context.value?.tasks.filter((task) => (
  Boolean(task.subtask_progress?.total)
)) || []);
const openTasks = computed(() => context.value?.tasks.filter((task) => (
  task.status === 'todo' && (!task.goal_state || task.goal_state === 'active')
  && !task.subtask_progress?.total
)) || []);
const heldTasks = computed(() => context.value?.tasks.filter((task) => (
  task.status === 'todo' && Boolean(task.goal_state) && task.goal_state !== 'active'
  && !task.subtask_progress?.total
)) || []);
const completedTasks = computed(() => context.value?.tasks.filter((task) => (
  task.status === 'done' && !task.subtask_progress?.total
)) || []);
const visibleMaterials = computed(() => context.value?.materials.slice(0, 6) || []);
const visibleMemories = computed(() => context.value?.memories.slice(0, 6) || []);
const visibleDecisions = computed(() => context.value?.decisions.slice(0, 5) || []);
const visibleActivity = computed(() => context.value?.activity.slice(0, 10) || []);

function preferredLifeline(): LifelineSummary | null {
  return lifelines.value.find((line) => line.depth === 0 && line.counts.entities > 0)
    || lifelines.value.find((line) => line.counts.entities > 0)
    || lifelines.value[0]
    || null;
}

async function loadIndex() {
  indexLoading.value = true;
  error.value = null;
  try {
    const payload = await getLifelineIndex();
    lifelines.value = payload.lifelines;
    const requested = props.selectedId
      ? lifelines.value.find((line) => line.id === props.selectedId || line.raw_id === props.selectedId)
      : null;
    const selected = requested || preferredLifeline();
    if (selected) {
      if (selected.id !== props.selectedId) emit('selectLifeline', selected.id);
      await loadContext(selected.id);
    }
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '项目脉络加载失败';
  } finally {
    indexLoading.value = false;
  }
}

async function loadContext(id: string) {
  if (!id) return;
  if (contextLoading.value && loadingContextId.value === id) return;
  const requestId = ++contextRequest;
  loadingContextId.value = id;
  contextLoading.value = true;
  error.value = null;
  try {
    const payload = await getLifelineContext(id);
    if (requestId === contextRequest) context.value = payload;
  } catch (err) {
    if (requestId !== contextRequest) return;
    context.value = null;
    error.value = err instanceof ApiError ? err.message : '脉络详情加载失败';
  } finally {
    if (requestId === contextRequest) {
      contextLoading.value = false;
      loadingContextId.value = null;
    }
  }
}

function selectLine(id: string) {
  if (!id || id === activeId.value) return;
  emit('selectLifeline', id);
  loadContext(id);
}

function progressPercent(goal: LifelineContextGoal): number {
  if (!goal.progress.total) return 0;
  return Math.round((goal.progress.done / goal.progress.total) * 100);
}

function itemTypeLabel(type: string): string {
  return { text: '文本', image: '图片', document: '文档', audio: '音频' }[type] || type;
}

function activityLabel(entry: LifelineContextActivity): string {
  if (entry.kind === 'item') return '材料';
  if (entry.kind === 'task') return entry.status === 'done' ? '完成行动' : '行动';
  if (entry.kind === 'decision') return '决定';
  return '记忆';
}

function openActivity(entry: LifelineContextActivity) {
  if (entry.kind === 'item') {
    emit('openItem', entry.id);
    return;
  }
  emit('openObject', { kind: entry.kind, id: entry.id });
}

watch(
  () => props.selectedId,
  (next, previous) => {
    if (!next || next === previous || next === context.value?.lifeline.id) return;
    loadContext(next);
  },
);

onMounted(loadIndex);
</script>

<template>
  <section class="context-browser">
    <aside class="line-rail">
      <header>
        <div>
          <p class="eyebrow">Context</p>
          <h2>项目与生活线</h2>
        </div>
        <span>{{ lifelines.length }}</span>
      </header>

      <select
        class="mobile-line-select"
        :value="activeId || ''"
        aria-label="项目与生活线"
        @change="selectLine(($event.target as HTMLSelectElement).value)"
      >
        <option v-for="line in lifelines" :key="line.id" :value="line.id">
          {{ `${'　'.repeat(line.depth)}${line.name}` }}
        </option>
      </select>

      <div class="line-tree" aria-label="项目与生活线">
        <button
          v-for="line in lifelines"
          :key="line.id"
          class="line-row"
          :class="{ active: activeId === line.id || activeId === line.raw_id }"
          :style="{ '--line-depth': line.depth }"
          type="button"
          @click="selectLine(line.id)"
        >
          <FolderTree v-if="line.has_children" :size="15" :stroke-width="1.7" />
          <Circle v-else :size="9" :stroke-width="2" />
          <span class="line-copy">
            <strong>{{ line.name }}</strong>
            <small>
              {{ line.counts.active_goals }} 项承诺 · {{ line.counts.open_actions }} 个行动
            </small>
          </span>
          <span class="line-count">{{ line.counts.entities }}</span>
        </button>
      </div>
    </aside>

    <div class="context-main">
      <div v-if="indexLoading && !context" class="context-state">加载中</div>
      <div v-else-if="error" class="context-state error-state">
        <span>{{ error }}</span>
        <button type="button" @click="loadIndex">重试</button>
      </div>
      <div v-else-if="!lifelines.length" class="context-state">尚无项目或生活线</div>
      <div v-else-if="!context" class="context-state">选择一条脉络</div>

      <template v-else>
        <div v-if="contextLoading" class="context-progress" />
        <header class="context-head">
          <nav v-if="context.lifeline.ancestors.length" class="context-path" aria-label="上层脉络">
            <template v-for="ancestor in context.lifeline.ancestors" :key="ancestor.id">
              <button type="button" @click="selectLine(ancestor.id)">{{ ancestor.name }}</button>
              <ChevronRight :size="13" />
            </template>
          </nav>
          <div class="context-title-row">
            <div>
              <p class="eyebrow">{{ context.scope.descendant_count ? `含 ${context.scope.descendant_count} 条子线` : '当前脉络' }}</p>
              <h2>{{ context.lifeline.name }}</h2>
            </div>
            <span v-if="context.summary.last_activity_at" class="last-active">
              最近 {{ formatRelative(context.summary.last_activity_at) }}
            </span>
          </div>
          <div class="context-metrics" aria-label="脉络摘要">
            <div><strong>{{ context.summary.active_goals }}</strong><span>推进中承诺</span></div>
            <div><strong>{{ context.summary.open_actions }}</strong><span>下一步</span></div>
            <div><strong>{{ context.summary.materials }}</strong><span>材料</span></div>
            <div><strong>{{ context.summary.memories }}</strong><span>记忆</span></div>
            <div><strong>{{ context.summary.decisions }}</strong><span>决定</span></div>
          </div>
        </header>

        <section v-if="context.lifeline.children.length" class="child-lines">
          <button
            v-for="child in context.lifeline.children"
            :key="child.id"
            type="button"
            @click="selectLine(child.id)"
          >
            <span>{{ child.name }}</span>
            <small>{{ child.counts.active_goals }} 项承诺 · {{ child.counts.open_actions }} 个行动</small>
            <ChevronRight :size="15" />
          </button>
        </section>

        <div class="context-columns">
          <div class="momentum-column">
            <section class="context-section commitments-section">
              <header class="section-head">
                <div>
                  <Target :size="17" />
                  <h3>承诺与进展</h3>
                </div>
                <span>{{ context.goals.length }}</span>
              </header>
              <p v-if="!context.goals.length" class="section-empty">没有已确认承诺</p>
              <button
                v-for="goal in context.goals"
                :key="goal.id"
                class="goal-row"
                type="button"
                @click="emit('openObject', { kind: 'memory', id: goal.id })"
              >
                <span class="goal-state-dot" :class="`state-${goal.profile?.state || 'active'}`" />
                <span class="goal-copy">
                  <span class="goal-meta">
                    <small>{{ goal.profile?.state_label || '推进中' }}</small>
                    <small v-if="goal.profile?.parent_goal">承接 {{ goal.profile.parent_goal.title }}</small>
                    <small v-if="goal.profile?.target_date">{{ goal.profile.target_date }}</small>
                  </span>
                  <strong>{{ goal.title }}</strong>
                  <small class="goal-criteria">{{ goal.profile?.success_criteria || '完成定义待补充' }}</small>
                  <span class="goal-progress-track" aria-hidden="true">
                    <span :style="{ width: `${progressPercent(goal)}%` }" />
                  </span>
                  <small>{{ goal.progress.done }} / {{ goal.progress.total }} 个行动完成</small>
                </span>
                <ChevronRight :size="16" />
              </button>
            </section>

            <section v-if="compositeTasks.length" class="context-section decompositions-section">
              <header class="section-head">
                <div>
                  <ListTree :size="17" />
                  <h3>行动脉络</h3>
                </div>
                <span>{{ compositeTasks.length }}</span>
              </header>
              <button
                v-for="task in compositeTasks"
                :key="task.id"
                class="object-row task-row"
                type="button"
                @click="emit('openObject', { kind: 'task', id: task.id })"
              >
                <span class="object-icon"><ListTree :size="14" /></span>
                <span class="object-copy">
                  <strong>{{ task.title }}</strong>
                  <small>
                    {{ task.subtask_progress?.done || 0 }} / {{ task.subtask_progress?.total || 0 }} 个步骤完成
                    <template v-if="task.goal_title"> · {{ task.goal_title }}</template>
                  </small>
                </span>
                <span class="object-tail">{{ task.status === 'done' ? '已结束' : '推进中' }}</span>
              </button>
            </section>

            <section class="context-section actions-section">
              <header class="section-head">
                <div>
                  <ListTodo :size="17" />
                  <h3>下一步</h3>
                </div>
                <span>{{ openTasks.length }}</span>
              </header>
              <p v-if="!openTasks.length" class="section-empty">当前没有未完成行动</p>
              <button
                v-for="task in openTasks"
                :key="task.id"
                class="object-row task-row"
                type="button"
                @click="emit('openObject', { kind: 'task', id: task.id })"
              >
                <span class="object-icon"><Circle :size="10" /></span>
                <span class="object-copy">
                  <strong>{{ task.title }}</strong>
                  <small>
                    {{ taskPriorityLabel(task.priority) }}
                    <template v-if="task.due_date"> · {{ task.due_date }}</template>
                    <template v-if="task.goal_title"> · {{ task.goal_title }}</template>
                    <template v-if="task.parent_task"> · 来自 {{ task.parent_task.title }}</template>
                  </small>
                </span>
                <span v-if="task.estimated_minutes" class="object-tail">{{ task.estimated_minutes }} 分钟</span>
              </button>
              <details v-if="completedTasks.length" class="completed-actions">
                <summary>{{ completedTasks.length }} 个已完成行动</summary>
                <button
                  v-for="task in completedTasks.slice(0, 10)"
                  :key="task.id"
                  type="button"
                  @click="emit('openObject', { kind: 'task', id: task.id })"
                >
                  <CheckCircle2 :size="14" />
                  <span>{{ task.title }}</span>
                  <small>{{ taskStatusLabel(task.status) }}</small>
                </button>
              </details>
              <details v-if="heldTasks.length" class="completed-actions held-actions">
                <summary>{{ heldTasks.length }} 个暂停或结束承诺中的保留行动</summary>
                <button
                  v-for="task in heldTasks.slice(0, 10)"
                  :key="task.id"
                  type="button"
                  @click="emit('openObject', { kind: 'task', id: task.id })"
                >
                  <Circle :size="10" />
                  <span>{{ task.title }}</span>
                  <small>已保留</small>
                </button>
              </details>
            </section>
          </div>

          <div class="knowledge-column">
            <section class="context-section">
              <header class="section-head">
                <div>
                  <FileText :size="17" />
                  <h3>材料</h3>
                </div>
                <span>{{ context.materials.length }}</span>
              </header>
              <p v-if="!visibleMaterials.length" class="section-empty">暂无材料</p>
              <button
                v-for="material in visibleMaterials"
                :key="material.id"
                class="object-row"
                type="button"
                @click="emit('openItem', material.id)"
              >
                <span class="object-icon"><FileText :size="14" /></span>
                <span class="object-copy">
                  <strong>{{ material.title }}</strong>
                  <small>{{ itemTypeLabel(material.type) }} · {{ formatRelative(material.created_at) }}</small>
                </span>
              </button>
            </section>

            <section class="context-section">
              <header class="section-head">
                <div>
                  <Brain :size="17" />
                  <h3>事实与记忆</h3>
                </div>
                <span>{{ context.memories.length }}</span>
              </header>
              <p v-if="!visibleMemories.length" class="section-empty">暂无记忆</p>
              <button
                v-for="memory in visibleMemories"
                :key="memory.id"
                class="object-row"
                type="button"
                @click="emit('openObject', { kind: 'memory', id: memory.id })"
              >
                <span class="object-icon"><Brain :size="14" /></span>
                <span class="object-copy">
                  <strong>{{ memory.title }}</strong>
                  <small>{{ memoryCategoryLabel(memory.category) }} · {{ memoryStatusLabel(memory.status) }}</small>
                </span>
              </button>
            </section>

            <section class="context-section">
              <header class="section-head">
                <div>
                  <GitFork :size="17" />
                  <h3>决定</h3>
                </div>
                <span>{{ context.decisions.length }}</span>
              </header>
              <p v-if="!visibleDecisions.length" class="section-empty">暂无决定</p>
              <button
                v-for="decision in visibleDecisions"
                :key="decision.id"
                class="object-row"
                type="button"
                @click="emit('openObject', { kind: 'decision', id: decision.id })"
              >
                <span class="object-icon"><GitFork :size="14" /></span>
                <span class="object-copy">
                  <strong>{{ decision.title }}</strong>
                  <small>{{ decision.status === 'reviewed' ? '已回顾' : '待回顾' }} · {{ formatRelative(decision.updated_at) }}</small>
                </span>
              </button>
            </section>

            <section class="context-section history-section">
              <header class="section-head">
                <div>
                  <CalendarDays :size="17" />
                  <h3>最近发生</h3>
                </div>
              </header>
              <button
                v-for="entry in visibleActivity"
                :key="`${entry.kind}-${entry.id}-${entry.timestamp}`"
                class="history-row"
                type="button"
                @click="openActivity(entry)"
              >
                <span>{{ activityLabel(entry) }}</span>
                <strong>{{ entry.title }}</strong>
                <small>{{ formatRelative(entry.timestamp) }}</small>
              </button>
            </section>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.context-browser {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  min-height: 640px;
  border-top: 1px solid var(--line-1);
}

.line-rail {
  min-width: 0;
  padding: var(--s-4) var(--s-4) var(--s-4) 0;
  border-right: 1px solid var(--line-1);
}

.line-rail header,
.section-head,
.context-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-3);
}

.line-rail h2,
.context-head h2,
.section-head h3 {
  color: var(--text-1);
  font-weight: 560;
  letter-spacing: 0;
}

.line-rail h2 {
  margin-top: 2px;
  font-size: var(--fs-5);
}

.line-rail header > span,
.section-head > span,
.line-count {
  color: var(--text-4);
  font-family: var(--font-mono);
  font-size: var(--fs-2);
}

.line-tree {
  display: grid;
  gap: 2px;
  margin-top: var(--s-4);
}

.line-row {
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr) max-content;
  align-items: center;
  gap: var(--s-2);
  min-height: 50px;
  margin-left: calc(var(--line-depth) * 12px);
  padding: var(--s-2);
  border-left: 2px solid transparent;
  color: var(--text-4);
  text-align: left;
}

.line-row:hover,
.line-row.active {
  color: var(--text-1);
  background: rgba(255, 255, 255, 0.025);
}

.line-row.active {
  border-left-color: var(--focus);
}

.line-copy,
.object-copy,
.goal-copy {
  min-width: 0;
  display: grid;
}

.line-copy {
  gap: 3px;
}

.line-copy strong,
.object-copy strong,
.goal-copy > strong,
.history-row strong {
  overflow: hidden;
  color: var(--text-1);
  font-weight: 520;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.line-copy small,
.object-copy small,
.goal-copy small,
.history-row small,
.child-lines small,
.last-active {
  color: var(--text-4);
  font-size: var(--fs-2);
}

.mobile-line-select {
  display: none;
}

.context-main {
  position: relative;
  min-width: 0;
  padding: var(--s-4) 0 var(--s-8) var(--s-5);
}

.context-progress {
  position: absolute;
  inset: 0 0 auto;
  height: 1px;
  background: var(--accent);
  animation: contextPulse 800ms ease-in-out infinite;
}

@keyframes contextPulse {
  0%, 100% { opacity: 0.18; }
  50% { opacity: 0.72; }
}

.context-state {
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--s-3);
  color: var(--text-3);
}

.context-state button {
  color: var(--accent-bright);
}

.error-state {
  color: var(--error);
}

.context-path {
  display: flex;
  align-items: center;
  gap: var(--s-1);
  min-height: 24px;
  margin-bottom: var(--s-2);
  color: var(--text-4);
}

.context-path button:hover {
  color: var(--text-1);
}

.context-head h2 {
  margin-top: 3px;
  font-size: var(--fs-7);
  line-height: var(--lh-tight);
}

.context-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-6);
  margin-top: var(--s-5);
  padding: var(--s-3) 0 var(--s-4);
  border-bottom: 1px solid var(--line-1);
}

.context-metrics div {
  display: grid;
  gap: 2px;
}

.context-metrics strong {
  color: var(--text-1);
  font-family: var(--font-mono);
  font-size: var(--fs-6);
  font-weight: 520;
}

.context-metrics span {
  color: var(--text-4);
  font-size: var(--fs-2);
}

.child-lines {
  display: flex;
  gap: var(--s-2);
  overflow-x: auto;
  padding: var(--s-4) 0;
  border-bottom: 1px solid var(--line-1);
}

.child-lines button {
  flex: 0 0 min(250px, 80vw);
  display: grid;
  grid-template-columns: minmax(0, 1fr) 16px;
  gap: 2px var(--s-2);
  align-items: center;
  min-height: 56px;
  padding: var(--s-2) var(--s-3);
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  color: var(--text-2);
  text-align: left;
}

.child-lines button:hover {
  border-color: var(--line-2);
  background: var(--surface-1);
}

.child-lines button > span,
.child-lines button > small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.child-lines button > svg {
  grid-row: 1 / span 2;
  grid-column: 2;
}

.context-columns {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
  gap: var(--s-7);
  padding-top: var(--s-5);
}

.momentum-column,
.knowledge-column {
  min-width: 0;
  display: grid;
  align-content: start;
  gap: var(--s-6);
}

.context-section {
  min-width: 0;
}

.section-head {
  min-height: 32px;
  padding-bottom: var(--s-2);
  border-bottom: 1px solid var(--line-1);
}

.section-head > div {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  color: var(--text-3);
}

.section-head h3 {
  font-size: var(--fs-4);
}

.section-empty {
  padding: var(--s-4) var(--s-2);
  color: var(--text-4);
  font-size: var(--fs-3);
}

.goal-row {
  width: 100%;
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr) 18px;
  gap: var(--s-3);
  align-items: center;
  padding: var(--s-4) var(--s-2);
  border-bottom: 1px solid var(--line-1);
  text-align: left;
}

.goal-row:hover,
.object-row:hover,
.history-row:hover {
  background: rgba(255, 255, 255, 0.022);
}

.goal-state-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--text-4);
}

.goal-state-dot.state-active {
  background: var(--accent-bright);
  box-shadow: 0 0 10px rgba(110, 231, 208, 0.34);
}

.goal-state-dot.state-paused {
  background: var(--warm);
}

.goal-state-dot.state-achieved {
  background: var(--focus);
}

.goal-copy {
  gap: 6px;
}

.goal-meta {
  min-width: 0;
  display: flex;
  gap: var(--s-2);
}

.goal-meta small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.goal-criteria {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.goal-progress-track {
  width: 100%;
  height: 2px;
  overflow: hidden;
  background: var(--line-1);
}

.goal-progress-track span {
  display: block;
  height: 100%;
  background: var(--accent);
}

.object-row {
  width: 100%;
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr) max-content;
  gap: var(--s-2);
  align-items: center;
  min-height: 54px;
  padding: var(--s-2);
  border-bottom: 1px solid var(--line-1);
  text-align: left;
}

.object-icon {
  display: grid;
  place-items: center;
  color: var(--text-4);
}

.object-copy {
  gap: 3px;
}

.object-tail {
  color: var(--text-4);
  font-size: var(--fs-2);
}

.completed-actions {
  margin-top: var(--s-3);
  color: var(--text-4);
  font-size: var(--fs-2);
}

.completed-actions summary {
  cursor: pointer;
  padding: var(--s-2);
}

.completed-actions button {
  width: 100%;
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr) max-content;
  gap: var(--s-2);
  align-items: center;
  padding: var(--s-2);
  color: var(--text-3);
  text-align: left;
}

.completed-actions button span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.history-row {
  width: 100%;
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) max-content;
  gap: var(--s-2);
  align-items: center;
  min-height: 42px;
  padding: var(--s-2);
  border-bottom: 1px solid var(--line-1);
  text-align: left;
}

.history-row > span {
  color: var(--text-4);
  font-size: var(--fs-2);
}

@media (max-width: 980px) {
  .context-browser {
    grid-template-columns: 210px minmax(0, 1fr);
  }

  .context-columns {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .context-browser {
    display: block;
    min-height: 0;
  }

  .line-rail {
    padding: var(--s-4) 0;
    border-right: 0;
    border-bottom: 1px solid var(--line-1);
  }

  .line-tree {
    display: none;
  }

  .mobile-line-select {
    display: block;
    width: 100%;
    min-height: 42px;
    margin-top: var(--s-3);
    border: 1px solid var(--line-2);
    border-radius: var(--r-2);
    background: var(--surface-1);
    color: var(--text-1);
    padding: 0 var(--s-3);
  }

  .context-main {
    padding: var(--s-4) 0 var(--s-7);
  }

  .context-title-row {
    align-items: flex-start;
  }

  .context-head h2 {
    font-size: var(--fs-6);
  }

  .last-active {
    max-width: 120px;
    text-align: right;
  }

  .context-metrics {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--s-3);
  }

  .context-columns {
    gap: var(--s-6);
  }

  .goal-row {
    grid-template-columns: 9px minmax(0, 1fr);
  }

  .goal-row > svg {
    display: none;
  }

  .object-row {
    grid-template-columns: 22px minmax(0, 1fr);
  }

  .object-tail {
    grid-column: 2;
  }

  .history-row {
    grid-template-columns: 56px minmax(0, 1fr);
  }

  .history-row small {
    grid-column: 2;
  }
}
</style>
