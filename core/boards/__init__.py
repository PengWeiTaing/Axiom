"""Axiom Learning Board — 白板即学习运行时模块。

架构：
  schema.py       DB 建表 / FTS5
  widget_spec.py  四类 widget JSON Schema + 安全验证器
  mastery.py      概念掌握度加权证据模型
  review.py       复习队列调度
  writeback.py    事件 -> mastery/review/task/memory 回写适配器
  generator.py    AI 四段生成流水线 (planner/builder/layout/validator)
  export.py       JSON Canvas 导入导出
"""
