<script setup lang="ts">
import { useDocumentEventListener } from '@/composables/useEventListener'

const emit = defineEmits<{ (e: 'close'): void }>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === '?' || e.key === 'Escape') emit('close')
}

useDocumentEventListener('keydown', onKeydown)
</script>

<template>
  <div class="sp-overlay" @click.self="emit('close')">
    <div class="sp-panel">
      <div class="sp-header">
        <span class="sp-title">快捷键参考</span>
        <button class="sp-close" @click="emit('close')">✕</button>
      </div>
      <div class="sp-grid">
        <div class="sp-section">
          <div class="sp-section-title">全局</div>
          <div class="sp-row"><kbd>Ctrl+K</kbd> <kbd>/</kbd> <span>搜索 entity/lifeline</span></div>
          <div class="sp-row"><kbd>?</kbd> <span>显示/隐藏此面板</span></div>
          <div class="sp-row"><kbd>滚轮</kbd> <span>缩放</span></div>
          <div class="sp-row"><kbd>拖拽</kbd> <span>旋转</span></div>
        </div>

        <div class="sp-section">
          <div class="sp-section-title">global_overview</div>
          <div class="sp-row"><kbd>左键点击 R1</kbd> <span>进入 lifeline 区域</span></div>
        </div>

        <div class="sp-section">
          <div class="sp-section-title">region_zoom</div>
          <div class="sp-row"><kbd>Esc</kbd> <span>返回全局视图</span></div>
          <div class="sp-row"><kbd>左键点击 R2/R3</kbd> <span>聚焦 entity</span></div>
          <div class="sp-row"><kbd>右键 R1/R2</kbd> <span>新建 entity / 编辑名称</span></div>
        </div>

        <div class="sp-section">
          <div class="sp-section-title">node_focus</div>
          <div class="sp-row"><kbd>Esc</kbd> <span>返回 lifeline 区域</span></div>
          <div class="sp-row"><kbd>R</kbd> <span>查看关联（relation_reveal）</span></div>
          <div class="sp-row"><kbd>右键 entity</kbd> <span>编辑/移动/删除/关联/路径查找</span></div>
          <div class="sp-row"><kbd>双击标题</kbd> <span>内联编辑标题</span></div>
        </div>

        <div class="sp-section">
          <div class="sp-section-title">relation_reveal</div>
          <div class="sp-row"><kbd>Esc</kbd> <span>返回 node_focus</span></div>
          <div class="sp-row"><kbd>R</kbd> <span>退出关联视图</span></div>
          <div class="sp-row"><kbd>点击关联线</kbd> <span>查看证据</span></div>
          <div class="sp-row"><kbd>筛选条</kbd> <span>按类型/信心度过滤</span></div>
        </div>

        <div class="sp-section">
          <div class="sp-section-title">路径查找</div>
          <div class="sp-row"><kbd>右键 → 查找路径</kbd> <span>进入路径选择模式</span></div>
          <div class="sp-row"><kbd>Esc</kbd> <span>退出路径模式</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sp-overlay {
  position: fixed; inset: 0; z-index: 130;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
}

.sp-panel {
  background: var(--surface-1);
  border-radius: var(--r-2);
  padding: var(--s-4);
  max-width: 480px;
  max-height: 80vh;
  overflow-y: auto;
  display: flex; flex-direction: column; gap: var(--s-3);
}

.sp-header {
  display: flex; justify-content: space-between; align-items: center;
}

.sp-title {
  font-size: var(--fs-3); color: var(--text-1); font-weight: 600;
}

.sp-close {
  background: none; border: none; color: var(--text-3); font-size: var(--fs-3); cursor: pointer;
}

.sp-grid {
  display: flex; flex-direction: column; gap: var(--s-3);
}

.sp-section-title {
  font-size: var(--fs-1); color: var(--accent); margin-bottom: var(--s-1); font-weight: 500;
}

.sp-row {
  display: flex; gap: var(--s-2); padding: 3px 0; font-size: var(--fs-2); align-items: center;
}

.sp-row kbd {
  display: inline-block;
  padding: 1px 6px;
  background: var(--surface-2);
  border: 1px solid var(--line-1);
  border-radius: var(--r-1);
  font-family: var(--font-mono);
  font-size: var(--fs-1);
  color: var(--text-2);
  white-space: nowrap;
}

.sp-row span { color: var(--text-3); }
</style>
