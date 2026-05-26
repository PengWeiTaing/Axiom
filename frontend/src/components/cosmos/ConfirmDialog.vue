<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

withDefaults(defineProps<{
  title: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
}>(), {
  message: '',
  confirmLabel: '确认',
  cancelLabel: '取消',
  danger: false,
})

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('cancel')
  if (e.key === 'Enter') emit('confirm')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="confirm-overlay" @pointerdown="emit('cancel')">
    <div class="confirm-dialog" @pointerdown.stop>
      <div class="confirm-title">{{ title }}</div>
      <div v-if="message" class="confirm-message">{{ message }}</div>
      <div class="confirm-actions">
        <button class="confirm-btn cancel-btn" @click="emit('cancel')">{{ cancelLabel }}</button>
        <button
          class="confirm-btn"
          :class="danger ? 'danger-btn' : 'primary-btn'"
          @click="emit('confirm')"
        >{{ confirmLabel }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confirm-overlay {
  position: fixed;
  inset: 0;
  z-index: 110;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm-dialog {
  background: var(--surface-1);
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  padding: var(--s-3);
  min-width: 280px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
}

.confirm-title {
  font-size: var(--fs-3);
  font-weight: 600;
  color: var(--text-1);
}

.confirm-message {
  font-size: var(--fs-2);
  color: var(--text-3);
}

.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--s-2);
  margin-top: var(--s-1);
}

.confirm-btn {
  padding: var(--s-1) var(--s-3);
  border: none;
  border-radius: var(--r-1);
  font-size: var(--fs-2);
  cursor: pointer;
}

.cancel-btn {
  background: var(--surface-2);
  color: var(--text-2);
}

.cancel-btn:hover {
  background: var(--surface-2);
  color: var(--text-1);
}

.primary-btn {
  background: var(--accent);
  color: var(--surface-0);
}

.primary-btn:hover {
  opacity: 0.85;
}

.danger-btn {
  background: #dc2626;
  color: #fff;
}

.danger-btn:hover {
  background: #b91c1c;
}
</style>
