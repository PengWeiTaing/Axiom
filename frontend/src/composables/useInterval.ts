import { onBeforeUnmount } from 'vue'

export function useInterval() {
  let interval: number | undefined

  function clear() {
    if (interval === undefined) return
    window.clearInterval(interval)
    interval = undefined
  }

  function start(callback: () => void, delay: number) {
    clear()
    interval = window.setInterval(callback, delay)
  }

  onBeforeUnmount(clear)

  return { clear, start }
}
