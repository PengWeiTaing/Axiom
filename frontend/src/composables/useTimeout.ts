import { onBeforeUnmount } from 'vue'

export function useTimeout() {
  let timer: number | undefined

  function clear() {
    if (timer === undefined) return
    window.clearTimeout(timer)
    timer = undefined
  }

  function schedule(callback: () => void, delay: number) {
    clear()
    timer = window.setTimeout(() => {
      timer = undefined
      callback()
    }, delay)
  }

  onBeforeUnmount(clear)

  return { clear, schedule }
}
