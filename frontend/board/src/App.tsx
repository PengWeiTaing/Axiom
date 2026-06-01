/* ============================================================
 * App — 根组件
 *
 * 从 URL 提取 boardId，加载白板数据，渲染 BoardShell。
 * ============================================================ */

import React, { useEffect, useState, useCallback } from 'react'
import BoardShell from './BoardShell'
import { getBoard } from './api/endpoints'
import type { Board } from './types'

type AppState =
  | { phase: 'loading' }
  | { phase: 'error'; message: string }
  | { phase: 'empty'; boardId: string }   // 无 boardId 时展示空状态
  | { phase: 'loaded'; board: Board }

/**
 * 从 URL 路径提取 boardId。
 * 预期格式：/board/<id>  或  /static/v2/board/index.html#/board/<id>
 * 适配 hash 路由和 path 路由两种。
 */
function extractBoardId(): string | null {
  // 优先从 hash 中取
  if (typeof window !== 'undefined') {
    const hash = window.location.hash
    const hashMatch = hash.match(/board\/([a-zA-Z0-9_-]+)/)
    if (hashMatch) return hashMatch[1]

    // 再从 pathname 中取
    const pathMatch = window.location.pathname.match(/board\/([a-zA-Z0-9_-]+)/)
    if (pathMatch) return pathMatch[1]
  }
  return null
}

export default function App() {
  const [state, setState] = useState<AppState>({ phase: 'loading' })

  const loadBoard = useCallback(async (boardId: string) => {
    setState({ phase: 'loading' })
    try {
      const board = await getBoard(boardId)
      setState({ phase: 'loaded', board })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '加载白板失败'
      setState({ phase: 'error', message: msg })
    }
  }, [])

  useEffect(() => {
    const boardId = extractBoardId()
    if (boardId) {
      loadBoard(boardId)
    } else {
      // 尝试从 localStorage 读取最近使用的 boardId
      const recentId = localStorage.getItem('axiom_board_recent')
      if (recentId) {
        loadBoard(recentId)
      } else {
        setState({ phase: 'empty', boardId: '' })
      }
    }
  }, [loadBoard])

  switch (state.phase) {
    case 'loading':
      return (
        <div className="board-loading">
          <div className="board-loading__spinner" />
          <p className="board-loading__text">正在加载学习白板…</p>
        </div>
      )

    case 'error':
      return (
        <div className="board-error">
          <div className="board-error__icon">!</div>
          <h2>加载失败</h2>
          <p>{state.message}</p>
          <button
            className="board-error__retry"
            onClick={() => {
              const id = extractBoardId()
              if (id) loadBoard(id)
            }}
          >
            重试
          </button>
        </div>
      )

    case 'empty':
      return (
        <div className="board-empty">
          <div className="board-empty__hero">
            <h1>Axiom Learning Board</h1>
            <p>AI 驱动的交互式学习白板</p>
          </div>
          <div className="board-empty__actions">
            <p className="muted">
              通过 AI 生成一个新白板，或从已有的白板链接进入。
            </p>
            <button
              className="board-empty__btn"
              onClick={() => {
                // 切换到生成模式——BoardShell 会处理
                setState({
                  phase: 'loaded',
                  board: {
                    id: '',
                    title: '新白板',
                    goal: '',
                    widgets: [],
                    source_refs: [],
                    created_at: '',
                    updated_at: '',
                    version: 0,
                  },
                })
              }}
            >
              创建新白板
            </button>
          </div>
        </div>
      )

    case 'loaded':
      return (
        <BoardShell
          board={state.board}
          onBoardUpdate={(updated) => {
            setState({ phase: 'loaded', board: updated })
            if (updated.id) {
              localStorage.setItem('axiom_board_recent', updated.id)
            }
          }}
        />
      )

    default:
      return null
  }
}
