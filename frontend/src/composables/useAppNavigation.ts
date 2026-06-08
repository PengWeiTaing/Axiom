import { readStoredValue, writeStoredValue } from '@/composables/useLocalStorage';

const RECENT_BOARD_KEY = 'axiom_board_recent';

export function navigateToPath(path: string): void {
  if (typeof window === 'undefined') return;
  window.location.href = path;
}

export function pathForBoard(boardId?: string): string {
  return boardId ? `/board/${boardId}` : '/board';
}

export function pathForRecentBoard(): string {
  const recent = readStoredValue(RECENT_BOARD_KEY, '');
  return recent ? pathForBoard(recent) : pathForBoard();
}

export function navigateToBoard(boardId?: string): void {
  if (boardId) writeStoredValue(RECENT_BOARD_KEY, boardId);
  navigateToPath(pathForBoard(boardId));
}
