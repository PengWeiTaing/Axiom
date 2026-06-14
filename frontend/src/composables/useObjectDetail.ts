import { ref, watch, type Ref } from 'vue'
import { updateEntityField } from '@/api/cosmos'
import {
  archiveMemory,
  confirmMemory,
  getDecision,
  getMemory,
  getTask,
  markTaskDone,
  markTaskTodo,
} from '@/api/knowledge'
import { getItem } from '@/api/records'

export type ObjectDetail = Record<string, unknown>

export interface ObjectDetailEntity {
  id: string
}

export interface EntityIdentity {
  kind: string
  rawId: number
}

interface UseObjectDetailOptions {
  cache?: Map<string, ObjectDetail>
  afterEntityChanged?: () => Promise<void>
}

export function parseEntityIdentity(entityId: string): EntityIdentity {
  const parts = entityId.split(':')
  return {
    kind: parts[0],
    rawId: parseInt(parts.slice(1).join(':'), 10),
  }
}

export function useObjectDetail(
  entity: Ref<ObjectDetailEntity | null>,
  options: UseObjectDetailOptions = {},
) {
  const detail = ref<ObjectDetail | null>(null)
  const detailLoading = ref(false)
  const detailError = ref(false)

  function cacheDetail(entityId: string, nextDetail: ObjectDetail) {
    detail.value = nextDetail
    options.cache?.set(entityId, nextDetail)
  }

  function setDetail(nextDetail: ObjectDetail) {
    if (!entity.value) {
      detail.value = nextDetail
      return
    }
    cacheDetail(entity.value.id, nextDetail)
  }

  function patchDetail(patch: ObjectDetail) {
    if (!detail.value) return
    setDetail({ ...detail.value, ...patch })
  }

  async function loadDetail() {
    if (!entity.value) return
    const entityId = entity.value.id
    const cached = options.cache?.get(entityId)
    if (cached) {
      detail.value = cached
      return
    }

    detailLoading.value = true
    detailError.value = false
    try {
      const { kind, rawId } = parseEntityIdentity(entityId)
      let data: ObjectDetail = {}
      if (kind === 'task') {
        const response = await getTask(rawId)
        data = response.task as unknown as ObjectDetail
      } else if (kind === 'memory') {
        const response = await getMemory(rawId)
        data = response.memory as unknown as ObjectDetail
      } else if (kind === 'decision') {
        const response = await getDecision(rawId)
        data = response.decision as unknown as ObjectDetail
      } else if (kind === 'item') {
        const response = await getItem(rawId)
        data = response.item as unknown as ObjectDetail
      }
      cacheDetail(entityId, data)
    } catch {
      detailError.value = true
    } finally {
      detailLoading.value = false
    }
  }

  async function saveObjectField(fieldName: string, value: string): Promise<boolean> {
    if (!entity.value || !detail.value) return false
    const current = String(detail.value[fieldName] || '')
    if (value === current) return true

    const { kind, rawId } = parseEntityIdentity(entity.value.id)
    await updateEntityField(kind, rawId, { [fieldName]: value })
    cacheDetail(entity.value.id, { ...detail.value, [fieldName]: value })
    return true
  }

  async function updateTaskStatus(nextStatus: 'done' | 'todo'): Promise<boolean> {
    if (!entity.value || !detail.value) return false
    const { rawId } = parseEntityIdentity(entity.value.id)
    try {
      const response = nextStatus === 'done'
        ? await markTaskDone(rawId)
        : await markTaskTodo(rawId)
      cacheDetail(entity.value.id, response.task as unknown as ObjectDetail)
    } catch {
      await options.afterEntityChanged?.()
      return false
    }
    await options.afterEntityChanged?.()
    return true
  }

  async function toggleTaskDone(): Promise<boolean> {
    if (!entity.value || !detail.value) return false
    const currentStatus = detail.value.status as string
    return updateTaskStatus(currentStatus === 'todo' ? 'done' : 'todo')
  }

  async function updateMemoryStatus(nextStatus: 'confirmed' | 'archived'): Promise<boolean> {
    if (!entity.value || !detail.value) return false
    const { rawId } = parseEntityIdentity(entity.value.id)
    try {
      const response = nextStatus === 'confirmed'
        ? await confirmMemory(rawId)
        : await archiveMemory(rawId)
      cacheDetail(entity.value.id, { ...detail.value, ...response.memory })
    } catch {
      await options.afterEntityChanged?.()
      return false
    }
    await options.afterEntityChanged?.()
    return true
  }

  async function confirmOrArchiveMemory(): Promise<boolean> {
    if (!entity.value || !detail.value) return false
    const currentStatus = detail.value.status as string
    return updateMemoryStatus(currentStatus === 'candidate' ? 'confirmed' : 'archived')
  }

  watch(() => entity.value?.id, () => {
    detail.value = null
    loadDetail()
  }, { immediate: true })

  return {
    detail,
    detailLoading,
    detailError,
    loadDetail,
    setDetail,
    patchDetail,
    saveObjectField,
    updateTaskStatus,
    toggleTaskDone,
    updateMemoryStatus,
    confirmOrArchiveMemory,
  }
}
