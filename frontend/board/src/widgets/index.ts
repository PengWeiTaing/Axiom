/* ============================================================
 * Widget 组件桶文件
 *
 * 导出 renderWidget 函数，根据 widget_type 渲染对应组件。
 * ============================================================ */

import React from 'react'
import type { Widget } from '../types'
import ConceptMapWidget from './ConceptMapWidget'
import FunctionVizWidget from './FunctionVizWidget'
import QuizCardWidget from './QuizCardWidget'
import ExampleCardWidget from './ExampleCardWidget'

export { ConceptMapWidget, FunctionVizWidget, QuizCardWidget, ExampleCardWidget }

/**
 * 根据 widget 类型渲染对应的 React 组件。
 * 如果 widget 类型不匹配任何已知组件，返回降级状态。
 */
export function renderWidget(
  widget: Widget,
  onEvent: (type: string, payload: Record<string, unknown>) => void,
): React.ReactNode {
  const props = { widget, onEvent }

  switch (widget.widget_type) {
    case 'concept_map':
      return React.createElement(ConceptMapWidget, { key: widget.id, ...props })

    case 'function_visualizer':
      return React.createElement(FunctionVizWidget, { key: widget.id, ...props })

    case 'quiz_card':
      return React.createElement(QuizCardWidget, { key: widget.id, ...props })

    case 'example_card':
      return React.createElement(ExampleCardWidget, { key: widget.id, ...props })

    default:
      // 未知 widget 类型的降级状态
      return React.createElement(
        'div',
        { key: widget.id, className: 'widget-card' },
        React.createElement('div', { className: 'widget-card__header' },
          React.createElement('span', { className: 'type-badge' }, '未知'),
          React.createElement('span', { className: 'title' }, widget.title),
        ),
        React.createElement('div', { className: 'widget-card__body' },
          React.createElement('p', { className: 'muted', style: { textAlign: 'center', padding: '20px 0' } },
            `不支持的控件类型: ${widget.widget_type}`,
          ),
        ),
      )
  }
}
