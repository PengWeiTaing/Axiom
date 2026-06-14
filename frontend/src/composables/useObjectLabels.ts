import type {
  DecisionStatus,
  MemoryCategory,
  MemoryStatus,
  ObjectKind,
  TaskPriority,
  TaskStatus,
} from '@/api/types'

export function objectKindLabel(kind: ObjectKind | 'item'): string {
  return {
    item: '记录',
    task: '任务',
    memory: '记忆',
    decision: '决策',
  }[kind]
}

export function taskStatusLabel(status: TaskStatus): string {
  return {
    todo: '待办',
    done: '已完成',
    cancelled: '已取消',
  }[status]
}

export function taskPriorityLabel(priority: TaskPriority): string {
  return {
    high: '高优先级',
    medium: '中优先级',
    low: '低优先级',
  }[priority]
}

export function memoryCategoryLabel(category: MemoryCategory): string {
  return {
    fact: '事实',
    preference: '偏好',
    goal: '目标',
    relationship: '关系',
    event: '事件',
  }[category]
}

export function memoryStatusLabel(status: MemoryStatus): string {
  return {
    candidate: '候选',
    confirmed: '已确认',
    archived: '已归档',
  }[status]
}

export function decisionStatusLabel(status: DecisionStatus): string {
  return {
    pending: '待回顾',
    reviewed: '已回顾',
  }[status]
}
