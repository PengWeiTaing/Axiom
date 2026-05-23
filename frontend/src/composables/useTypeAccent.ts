/*
 * 共享：timeline 条目左侧色条颜色
 *
 * 从 Timeline.vue 抽出，给 ItemDrawer 也引用同一套映射。
 * 不是"设计 token"——是组件间的业务常量。
 */

import type { Item } from '@/api/types'

export function typeAccent(t: Item['type']): string {
  switch (t) {
    case 'image':    return 'var(--accent)'
    case 'document': return 'var(--warm)'
    case 'audio':    return 'var(--warn)'
    case 'text':
    default:         return 'var(--text-5)'
  }
}
