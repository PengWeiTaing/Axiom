import { onBeforeUnmount, onMounted } from 'vue';

export function useWindowEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void {
  useEventListener(() => (typeof window === 'undefined' ? null : window), type, listener as EventListener, options);
}

export function useDocumentEventListener<K extends keyof DocumentEventMap>(
  type: K,
  listener: (event: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void {
  useEventListener(() => (typeof document === 'undefined' ? null : document), type, listener as EventListener, options);
}

export function useEventListener(
  target: () => EventTarget | null | undefined,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
): void {
  onMounted(() => {
    target()?.addEventListener(type, listener, options);
  });

  onBeforeUnmount(() => {
    target()?.removeEventListener(type, listener, options);
  });
}
