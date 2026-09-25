"""Small offline scenes used to demonstrate the universal renderer without AI.

These are not a substitute for the Coze workflow.  They are deliberately
limited, factual fixtures that exercise different subject families and visual
primitives during development and an offline competition demo.
"""
from __future__ import annotations

from typing import Any


def _bayes_scene(goal: str) -> dict[str, Any]:
    return {
        "schema_version": "2.0",
        "subject": "概率论",
        "topic": "条件概率与贝叶斯公式",
        "title": "从条件概率走到贝叶斯公式",
        "learning_goal": goal,
        "sections": [
            {
                "id": "condition",
                "heading": "条件改变后，样本空间也随之缩小",
                "blocks": [
                    {
                        "kind": "paragraph",
                        "text": "已知事件 B 发生以后，我们只在 B 对应的范围内重新计算 A 的比例。分母不再是全部样本，而是 B。",
                    },
                    {
                        "kind": "definition",
                        "term": "条件概率",
                        "text": "在 P(B)>0 时，A 在条件 B 下发生的概率等于 A 与 B 同时发生的概率除以 B 的概率。",
                        "latex": "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}",
                    },
                ],
            },
            {
                "id": "reverse",
                "heading": "同一个交集可以从两个方向写",
                "blocks": [
                    {
                        "kind": "paragraph",
                        "text": "P(A∩B) 既可以先取 A 再看 B，也可以先取 B 再看 A。贝叶斯公式来自这两个乘法公式描述的是同一个交集。",
                    },
                    {
                        "kind": "derivation",
                        "title": "只保留关键等价变形",
                        "steps": [
                            {"latex": "P(A\\cap B)=P(B\\mid A)P(A)", "note": "从 A 出发"},
                            {"latex": "P(A\\cap B)=P(A\\mid B)P(B)", "note": "从 B 出发"},
                            {"latex": "P(A\\mid B)=\\frac{P(B\\mid A)P(A)}{P(B)}", "note": "联立"},
                        ],
                    },
                ],
            },
            {
                "id": "test",
                "heading": "把“检测准确率”翻译成事件",
                "blocks": [
                    {
                        "kind": "example",
                        "prompt": "某病患病率为 1%，检测对患者的阳性率为 95%，对健康者的误报率为 5%。已知检测阳性，真正患病的概率是多少？",
                        "steps": [
                            {"text": "先计算阳性的总概率。", "latex": "P(+)=0.95\\times0.01+0.05\\times0.99=0.059"},
                            {"text": "再反推阳性人群中患者所占的比例。", "latex": "P(D\\mid +)=\\frac{0.95\\times0.01}{0.059}\\approx0.161"},
                        ],
                        "result": "阳性并不等于有 95% 的患病概率；基础患病率会显著改变后验概率。",
                    }
                ],
            },
            {
                "id": "transfer",
                "heading": "使用时先找先验，再找证据",
                "blocks": [
                    {
                        "kind": "list",
                        "style": "ordered",
                        "items": [
                            "明确要反推的事件 A，以及已经观察到的证据 B。",
                            "写出先验 P(A) 和似然 P(B|A)。",
                            "用全概率公式计算证据 P(B)，最后归一化。",
                        ],
                    }
                ],
            },
        ],
        "demonstrations": [
            {
                "id": "bayes-morph",
                "kind": "equation_morph",
                "title": "交集的两种读取方向",
                "anchor_section_id": "reverse",
                "side": "left",
                "data": {
                    "steps": [
                        {"latex": "P(A\\cap B)=P(B\\mid A)P(A)", "note": "先验到证据"},
                        {"latex": "P(A\\cap B)=P(A\\mid B)P(B)", "note": "证据到后验"},
                        {"latex": "P(A\\mid B)=\\frac{P(B\\mid A)P(A)}{P(B)}", "note": "贝叶斯公式"},
                    ]
                },
            },
            {
                "id": "test-bars",
                "kind": "probability_bars",
                "title": "阳性样本中的两种来源",
                "anchor_section_id": "test",
                "side": "right",
                "data": {
                    "bars": [
                        {"label": "患者且阳性", "value": 0.0095},
                        {"label": "健康但误报", "value": 0.0495},
                    ]
                },
            },
        ],
        "summary": [
            "条件概率改变的是计算所依赖的样本空间。",
            "贝叶斯公式把先验与新证据合成为后验。",
            "判断检测结果时不能忽略基础发生率。",
        ],
    }


def _newton_scene(goal: str) -> dict[str, Any]:
    return {
        "schema_version": "2.0",
        "subject": "物理",
        "topic": "牛顿第二定律",
        "title": "合外力如何改变运动状态",
        "learning_goal": goal,
        "sections": [
            {
                "id": "change",
                "heading": "力不决定速度，力决定速度怎样变化",
                "blocks": [
                    {"kind": "paragraph", "text": "物体可以在没有合外力时保持匀速。真正与合外力直接对应的是加速度，也就是速度的变化率。"},
                    {"kind": "definition", "term": "牛顿第二定律", "text": "物体的加速度方向与合外力方向相同；在质量不变的经典力学范围内，加速度大小等于合外力除以质量。", "latex": "\\sum \\vec F=m\\vec a"},
                ],
            },
            {
                "id": "vector",
                "heading": "先把所有力放进同一个矢量和",
                "blocks": [
                    {"kind": "paragraph", "text": "重力、支持力、拉力和摩擦力不会分别产生一个独立加速度。先按方向求合力，再由同一个合力求加速度。"},
                    {"kind": "formula", "latex": "\\vec F_{\\mathrm{net}}=\\vec T+\\vec f+\\vec N+m\\vec g", "caption": "实际列式时只保留题目中真实存在的力"},
                ],
            },
            {
                "id": "mass",
                "heading": "相同的力作用在不同质量上",
                "blocks": [
                    {"kind": "derivation", "title": "保持合力不变", "steps": [
                        {"latex": "F_{\\mathrm{net}}=ma", "note": "动力学关系"},
                        {"latex": "a=\\frac{F_{\\mathrm{net}}}{m}", "note": "解出加速度"},
                    ]},
                    {"kind": "paragraph", "text": "质量越大，同样的合外力带来的加速度越小。这里的质量体现物体改变运动状态的困难程度。"},
                ],
            },
            {
                "id": "example",
                "heading": "水平面上的受力计算",
                "blocks": [
                    {"kind": "example", "prompt": "质量 2 kg 的物体受到向右 10 N 拉力和向左 4 N 摩擦力，求加速度。", "steps": [
                        {"text": "水平方向合力向右。", "latex": "F_{\\mathrm{net}}=10-4=6\\,\\mathrm N"},
                        {"text": "由合力求加速度。", "latex": "a=\\frac{6}{2}=3\\,\\mathrm{m/s^2}"},
                    ], "result": "加速度大小为 3 m/s²，方向向右。"},
                ],
            },
        ],
        "demonstrations": [
            {
                "id": "forces",
                "kind": "force_diagram",
                "title": "先看方向，再看长度",
                "anchor_section_id": "vector",
                "side": "left",
                "data": {"body_label": "2 kg", "vectors": [
                    {"label": "N", "angle": 90, "magnitude": 1.4},
                    {"label": "mg", "angle": -90, "magnitude": 1.4},
                    {"label": "10 N", "angle": 0, "magnitude": 2.0},
                    {"label": "4 N", "angle": 180, "magnitude": 0.9},
                ]},
            },
            {
                "id": "mass-plot",
                "kind": "function_plot",
                "title": "固定 6 N 时，a 随 m 的变化",
                "anchor_section_id": "mass",
                "side": "right",
                "data": {
                    "domain": [0.5, 8],
                    "range": [0, 12],
                    "x_label": "m / kg",
                    "y_label": "a / (m·s⁻²)",
                    "series": [{"expression": "6/x", "label": "a=6/m"}],
                },
            },
        ],
        "summary": [
            "牛顿第二定律联系的是合外力、质量与加速度。",
            "列式前先完成受力分析和矢量合成。",
            "同一合力下，质量越大，加速度越小。",
        ],
    }


def _simple_harmonic_derivation_steps() -> list[dict[str, Any]]:
    """Return the text-first source for the semantic SHM derivation.

    The prose derivation remains the content source.  When Axiom promotes it to
    an equation_morph, the renderer can reuse these token identities instead
    of asking the model to duplicate or animate elementary algebra.
    """
    return [
        {
            "latex": "v(t)=\\frac{dx}{dt}=\\frac{d}{dt}[A\\cos(\\omega t+\\phi)]",
            "note": "把位移表达式放进速度定义",
            "parts": [
                {"id": "s1-v", "latex": "v(t)", "from": [], "relation": "appear", "phase": 0},
                {"id": "s1-eq1", "latex": "=", "from": [], "relation": "appear", "phase": 0},
                {"id": "s1-dx", "latex": "\\frac{dx}{dt}", "from": [], "relation": "appear", "phase": 0},
                {"id": "s1-eq2", "latex": "=", "from": [], "relation": "appear", "phase": 0},
                {"id": "s1-outer-d", "latex": "\\frac{d}{dt}", "from": [], "relation": "appear", "phase": 0},
                {"id": "s1-bracket-open", "latex": "[", "from": [], "relation": "appear", "phase": 0},
                {"id": "s1-a", "latex": "A", "from": [], "relation": "appear", "phase": 0},
                {"id": "s1-cos", "latex": "\\cos", "from": [], "relation": "appear", "phase": 0},
                {"id": "s1-phase-open", "latex": "(", "from": [], "relation": "appear", "phase": 0},
                {"id": "s1-phase", "latex": "\\omega t+\\phi", "from": [], "relation": "appear", "phase": 0},
                {"id": "s1-phase-close", "latex": ")", "from": [], "relation": "appear", "phase": 0},
                {"id": "s1-bracket-close", "latex": "]", "from": [], "relation": "appear", "phase": 0},
            ],
        },
        {
            "latex": "v(t)=-A\\sin(\\omega t+\\phi)\\cdot\\frac{d}{dt}(\\omega t+\\phi)",
            "note": "先求余弦外层，内层相位仍保留为导数",
            "parts": [
                {"id": "s2-v", "latex": "v(t)", "from": ["s1-v"], "relation": "match", "phase": 0},
                {"id": "s2-eq", "latex": "=", "from": ["s1-eq1"], "relation": "match", "phase": 0},
                {"id": "s2-minus", "latex": "-", "from": ["s1-dx"], "relation": "derive", "phase": 1},
                {"id": "s2-a", "latex": "A", "from": ["s1-a"], "relation": "match", "phase": 0},
                {"id": "s2-sin", "latex": "\\sin", "from": ["s1-cos"], "relation": "rewrite", "phase": 1},
                {"id": "s2-open", "latex": "(", "from": ["s1-phase-open"], "relation": "copy", "phase": 0},
                {"id": "s2-phase", "latex": "\\omega t+\\phi", "from": ["s1-phase"], "relation": "split", "phase": 0},
                {"id": "s2-close", "latex": ")", "from": ["s1-phase-close"], "relation": "copy", "phase": 0},
                {"id": "s2-dot", "latex": "\\cdot", "from": [], "relation": "appear", "phase": 2},
                {"id": "s2-inner-d", "latex": "\\frac{d}{dt}", "from": ["s1-outer-d"], "relation": "rewrite", "phase": 2},
                {"id": "s2-inner-open", "latex": "(", "from": ["s1-phase-open"], "relation": "copy", "phase": 2},
                {"id": "s2-inner-phase", "latex": "\\omega t+\\phi", "from": ["s1-phase"], "relation": "copy", "phase": 2},
                {"id": "s2-inner-close", "latex": ")", "from": ["s1-phase-close"], "relation": "copy", "phase": 2},
            ],
        },
        {
            "latex": "v(t)=-A\\omega\\sin(\\omega t+\\phi)",
            "note": "相位的时间导数给出因子 ω",
            "parts": [
                {"id": "s3-v", "latex": "v(t)", "from": ["s2-v"], "relation": "match", "phase": 0},
                {"id": "s3-eq", "latex": "=", "from": ["s2-eq"], "relation": "match", "phase": 0},
                {"id": "s3-minus", "latex": "-", "from": ["s2-minus"], "relation": "match", "phase": 0},
                {"id": "s3-a", "latex": "A", "from": ["s2-a"], "relation": "match", "phase": 0},
                {"id": "s3-omega", "latex": "\\omega", "from": ["s2-inner-d", "s2-inner-phase"], "relation": "derive", "phase": 1},
                {"id": "s3-sin", "latex": "\\sin", "from": ["s2-sin"], "relation": "match", "phase": 0},
                {"id": "s3-open", "latex": "(", "from": ["s2-open"], "relation": "match", "phase": 0},
                {"id": "s3-phase", "latex": "\\omega t+\\phi", "from": ["s2-phase"], "relation": "match", "phase": 0},
                {"id": "s3-close", "latex": ")", "from": ["s2-close"], "relation": "match", "phase": 0},
            ],
        },
        {
            "latex": "v(t)=-A\\omega\\sin(\\omega t+\\phi)=A\\omega\\cos(\\omega t+\\phi+\\frac{\\pi}{2})",
            "note": "负正弦改写为相位增加 π/2 的余弦",
            "parts": [
                {"id": "s4-v", "latex": "v(t)", "from": ["s3-v"], "relation": "match", "phase": 0},
                {"id": "s4-eq1", "latex": "=", "from": ["s3-eq"], "relation": "match", "phase": 0},
                {"id": "s4-minus", "latex": "-", "from": ["s3-minus"], "relation": "split", "phase": 0},
                {"id": "s4-a-left", "latex": "A", "from": ["s3-a"], "relation": "copy", "phase": 0},
                {"id": "s4-omega-left", "latex": "\\omega", "from": ["s3-omega"], "relation": "copy", "phase": 0},
                {"id": "s4-sin", "latex": "\\sin", "from": ["s3-sin"], "relation": "split", "phase": 0},
                {"id": "s4-open-left", "latex": "(", "from": ["s3-open"], "relation": "copy", "phase": 0},
                {"id": "s4-phase-left", "latex": "\\omega t+\\phi", "from": ["s3-phase"], "relation": "copy", "phase": 0},
                {"id": "s4-close-left", "latex": ")", "from": ["s3-close"], "relation": "copy", "phase": 0},
                {"id": "s4-eq2", "latex": "=", "from": [], "relation": "appear", "phase": 1},
                {"id": "s4-a-right", "latex": "A", "from": ["s3-a"], "relation": "copy", "phase": 1},
                {"id": "s4-omega-right", "latex": "\\omega", "from": ["s3-omega"], "relation": "copy", "phase": 1},
                {"id": "s4-cos", "latex": "\\cos", "from": ["s3-sin"], "relation": "split", "phase": 1},
                {"id": "s4-open-right", "latex": "(", "from": ["s3-open"], "relation": "copy", "phase": 1},
                {"id": "s4-phase-right", "latex": "\\omega t+\\phi", "from": ["s3-phase"], "relation": "copy", "phase": 1},
                {"id": "s4-quarter-turn", "latex": "+\\frac{\\pi}{2}", "from": ["s3-minus"], "relation": "split", "phase": 2},
                {"id": "s4-close-right", "latex": ")", "from": ["s3-close"], "relation": "copy", "phase": 1},
            ],
        },
        {
            "latex": "a(t)=\\frac{dv}{dt}=\\frac{d}{dt}[-A\\omega\\sin(\\omega t+\\phi)]",
            "note": "把速度的正弦形式放进加速度定义",
            "parts": [
                {"id": "s5-a-label", "latex": "a(t)", "from": ["s4-v"], "relation": "derive", "phase": 0},
                {"id": "s5-eq1", "latex": "=", "from": ["s4-eq1"], "relation": "match", "phase": 0},
                {"id": "s5-dv", "latex": "\\frac{dv}{dt}", "from": [], "relation": "appear", "phase": 0},
                {"id": "s5-eq2", "latex": "=", "from": ["s4-eq2"], "relation": "match", "phase": 0},
                {"id": "s5-outer-d", "latex": "\\frac{d}{dt}", "from": [], "relation": "appear", "phase": 1},
                {"id": "s5-bracket-open", "latex": "[", "from": [], "relation": "appear", "phase": 1},
                {"id": "s5-minus", "latex": "-", "from": ["s4-minus"], "relation": "copy", "phase": 1},
                {"id": "s5-a", "latex": "A", "from": ["s4-a-left"], "relation": "copy", "phase": 1},
                {"id": "s5-omega", "latex": "\\omega", "from": ["s4-omega-left"], "relation": "copy", "phase": 1},
                {"id": "s5-sin", "latex": "\\sin", "from": ["s4-sin"], "relation": "copy", "phase": 1},
                {"id": "s5-open", "latex": "(", "from": ["s4-open-left"], "relation": "copy", "phase": 1},
                {"id": "s5-phase", "latex": "\\omega t+\\phi", "from": ["s4-phase-left"], "relation": "copy", "phase": 1},
                {"id": "s5-close", "latex": ")", "from": ["s4-close-left"], "relation": "copy", "phase": 1},
                {"id": "s5-bracket-close", "latex": "]", "from": [], "relation": "appear", "phase": 1},
            ],
        },
        {
            "latex": "a(t)=-A\\omega\\cos(\\omega t+\\phi)\\cdot\\frac{d}{dt}(\\omega t+\\phi)",
            "note": "先求正弦外层，内层相位仍保留为导数",
            "parts": [
                {"id": "s6-a-label", "latex": "a(t)", "from": ["s5-a-label"], "relation": "match", "phase": 0},
                {"id": "s6-eq", "latex": "=", "from": ["s5-eq1"], "relation": "match", "phase": 0},
                {"id": "s6-minus", "latex": "-", "from": ["s5-minus"], "relation": "match", "phase": 0},
                {"id": "s6-a", "latex": "A", "from": ["s5-a"], "relation": "match", "phase": 0},
                {"id": "s6-omega", "latex": "\\omega", "from": ["s5-omega"], "relation": "match", "phase": 0},
                {"id": "s6-cos", "latex": "\\cos", "from": ["s5-sin"], "relation": "rewrite", "phase": 1},
                {"id": "s6-open", "latex": "(", "from": ["s5-open"], "relation": "copy", "phase": 0},
                {"id": "s6-phase", "latex": "\\omega t+\\phi", "from": ["s5-phase"], "relation": "split", "phase": 0},
                {"id": "s6-close", "latex": ")", "from": ["s5-close"], "relation": "copy", "phase": 0},
                {"id": "s6-dot", "latex": "\\cdot", "from": [], "relation": "appear", "phase": 2},
                {"id": "s6-inner-d", "latex": "\\frac{d}{dt}", "from": ["s5-outer-d"], "relation": "rewrite", "phase": 2},
                {"id": "s6-inner-open", "latex": "(", "from": ["s5-open"], "relation": "copy", "phase": 2},
                {"id": "s6-inner-phase", "latex": "\\omega t+\\phi", "from": ["s5-phase"], "relation": "copy", "phase": 2},
                {"id": "s6-inner-close", "latex": ")", "from": ["s5-close"], "relation": "copy", "phase": 2},
            ],
        },
        {
            "latex": "a(t)=-A\\omega\\cos(\\omega t+\\phi)\\cdot\\omega",
            "note": "内层相位求导给出第二个 ω",
            "parts": [
                {"id": "s7-a-label", "latex": "a(t)", "from": ["s6-a-label"], "relation": "match", "phase": 0},
                {"id": "s7-eq", "latex": "=", "from": ["s6-eq"], "relation": "match", "phase": 0},
                {"id": "s7-minus", "latex": "-", "from": ["s6-minus"], "relation": "match", "phase": 0},
                {"id": "s7-a", "latex": "A", "from": ["s6-a"], "relation": "match", "phase": 0},
                {"id": "s7-omega", "latex": "\\omega", "from": ["s6-omega"], "relation": "match", "phase": 0},
                {"id": "s7-cos", "latex": "\\cos", "from": ["s6-cos"], "relation": "match", "phase": 0},
                {"id": "s7-open", "latex": "(", "from": ["s6-open"], "relation": "match", "phase": 0},
                {"id": "s7-phase", "latex": "\\omega t+\\phi", "from": ["s6-phase"], "relation": "match", "phase": 0},
                {"id": "s7-close", "latex": ")", "from": ["s6-close"], "relation": "match", "phase": 0},
                {"id": "s7-dot", "latex": "\\cdot", "from": ["s6-dot"], "relation": "match", "phase": 0},
                {
                    "id": "s7-inner-omega",
                    "latex": "\\omega",
                    "from": ["s6-inner-d", "s6-inner-open", "s6-inner-phase", "s6-inner-close"],
                    "relation": "derive",
                    "phase": 1,
                },
            ],
        },
        {
            "latex": "a(t)=-A\\omega^2\\cos(\\omega t+\\phi)",
            "note": "两个频率因子汇成 ω²",
            "parts": [
                {"id": "s8-a-label", "latex": "a(t)", "from": ["s7-a-label"], "relation": "match", "phase": 0},
                {"id": "s8-eq", "latex": "=", "from": ["s7-eq"], "relation": "match", "phase": 0},
                {"id": "s8-minus", "latex": "-", "from": ["s7-minus"], "relation": "match", "phase": 0},
                {"id": "s8-a", "latex": "A", "from": ["s7-a"], "relation": "match", "phase": 0},
                {"id": "s8-omega2", "latex": "\\omega^2", "from": ["s7-omega", "s7-inner-omega"], "relation": "merge", "phase": 0},
                {"id": "s8-cos", "latex": "\\cos", "from": ["s7-cos"], "relation": "match", "phase": 0},
                {"id": "s8-open", "latex": "(", "from": ["s7-open"], "relation": "match", "phase": 0},
                {"id": "s8-phase", "latex": "\\omega t+\\phi", "from": ["s7-phase"], "relation": "match", "phase": 0},
                {"id": "s8-close", "latex": ")", "from": ["s7-close"], "relation": "match", "phase": 0},
            ],
        },
        {
            "latex": "a(t)=-A\\omega^2\\cos(\\omega t+\\phi)=A\\omega^2\\cos(\\omega t+\\phi+\\pi)",
            "note": "负号移入相位，得到相差 π 的余弦形式",
            "parts": [
                {"id": "s9-a-label", "latex": "a(t)", "from": ["s8-a-label"], "relation": "match", "phase": 0},
                {"id": "s9-eq1", "latex": "=", "from": ["s8-eq"], "relation": "match", "phase": 0},
                {"id": "s9-minus", "latex": "-", "from": ["s8-minus"], "relation": "split", "phase": 0},
                {"id": "s9-a-left", "latex": "A", "from": ["s8-a"], "relation": "copy", "phase": 0},
                {"id": "s9-omega2-left", "latex": "\\omega^2", "from": ["s8-omega2"], "relation": "copy", "phase": 0},
                {"id": "s9-cos-left", "latex": "\\cos", "from": ["s8-cos"], "relation": "copy", "phase": 0},
                {"id": "s9-open-left", "latex": "(", "from": ["s8-open"], "relation": "copy", "phase": 0},
                {"id": "s9-phase-left", "latex": "\\omega t+\\phi", "from": ["s8-phase"], "relation": "copy", "phase": 0},
                {"id": "s9-close-left", "latex": ")", "from": ["s8-close"], "relation": "copy", "phase": 0},
                {"id": "s9-eq2", "latex": "=", "from": [], "relation": "appear", "phase": 1},
                {"id": "s9-a-right", "latex": "A", "from": ["s8-a"], "relation": "copy", "phase": 1},
                {"id": "s9-omega2-right", "latex": "\\omega^2", "from": ["s8-omega2"], "relation": "copy", "phase": 1},
                {"id": "s9-cos-right", "latex": "\\cos", "from": ["s8-cos"], "relation": "copy", "phase": 1},
                {"id": "s9-open-right", "latex": "(", "from": ["s8-open"], "relation": "copy", "phase": 1},
                {"id": "s9-phase-right", "latex": "\\omega t+\\phi", "from": ["s8-phase"], "relation": "copy", "phase": 1},
                {"id": "s9-half-turn", "latex": "+\\pi", "from": ["s8-minus"], "relation": "split", "phase": 2},
                {"id": "s9-close-right", "latex": ")", "from": ["s8-close"], "relation": "copy", "phase": 1},
            ],
        },
    ]


def _simple_harmonic_motion_scene(goal: str) -> dict[str, Any]:
    return {
        "schema_version": "2.0",
        "subject": "普通物理学",
        "topic": "一维简谐运动位移、速度、加速度的相位关系",
        "title": "简谐运动中的相位与极值关系",
        "learning_goal": goal,
        "sections": [
            {
                "id": "derive-v-a",
                "heading": "如何从位移表达式得到速度和加速度",
                "blocks": [
                    {
                        "kind": "paragraph",
                        "text": "简谐运动的位移写成 x(t)=A cos(ωt+φ)。速度是位移对时间的一阶导数，加速度是速度对时间的一阶导数。动画只追踪求导与相位改写，不展开普通代数整理。",
                    },
                    {
                        "kind": "formula",
                        "latex": "x(t)=A\\cos(\\omega t+\\phi)",
                        "caption": "A 是振幅，ωt+φ 是随时间推进的相位",
                    },
                    {
                        "kind": "derivation",
                        "title": "速度与加速度的连续推导",
                        "steps": _simple_harmonic_derivation_steps(),
                    },
                    {
                        "kind": "formula",
                        "latex": "x(t)=A\\cos(\\omega t+\\phi),\\quad v(t)=A\\omega\\cos(\\omega t+\\phi+\\frac{\\pi}{2}),\\quad a(t)=A\\omega^2\\cos(\\omega t+\\phi+\\pi)",
                        "caption": "位移、速度、加速度的余弦形式",
                    },
                ],
            },
            {
                "id": "v-phase-relative-x",
                "heading": "速度为什么相对位移超前 π/2",
                "blocks": [
                    {
                        "kind": "comparison",
                        "columns": ["物理量", "相位项", "极值条件"],
                        "rows": [
                            ["位移 x(t)", "ωt+φ", "cos(ωt+φ)=±1 时取极值"],
                            ["速度 v(t)", "ωt+φ+π/2", "cos(ωt+φ+π/2)=±1 时取极值"],
                        ],
                    },
                    {
                        "kind": "paragraph",
                        "text": "速度的相位项比位移多 π/2。位移到达正负最大值时速度为零；位移经过平衡位置时，速度的绝对值达到最大。",
                    },
                    {
                        "kind": "list",
                        "style": "unordered",
                        "items": [
                            "位移到达 A 时，速度为 0。",
                            "位移经过 0 时，速度达到正或负极值。",
                            "两组极值位置交替出现，对应 π/2 的相位差。",
                        ],
                    },
                ],
            },
            {
                "id": "a-phase-relative-x",
                "heading": "加速度为什么与位移反相",
                "blocks": [
                    {
                        "kind": "derivation",
                        "title": "加速度与位移的直接关系",
                        "steps": [
                            {"latex": "a(t)=-\\omega^2[A\\cos(\\omega t+\\phi)]", "note": "识别共同的位移表达式"},
                            {"latex": "a(t)=-\\omega^2x(t)", "note": "加速度始终指向平衡位置"},
                        ],
                    },
                    {
                        "kind": "definition",
                        "term": "反相位",
                        "text": "两个简谐量相差 π 时，一个取正极值，另一个同时取负极值。",
                        "latex": "",
                    },
                    {
                        "kind": "paragraph",
                        "text": "关系 a(t)=-ω²x(t) 表明加速度与位移符号相反。位移为正最大值时，加速度为负最大值；位移为负最大值时，加速度为正最大值。",
                    },
                ],
            },
            {
                "id": "normalized-curve-comparison",
                "heading": "归一化后如何比较三条曲线",
                "blocks": [
                    {
                        "kind": "paragraph",
                        "text": "位移、速度和加速度的振幅分别为 A、Aω、Aω²，量纲也不同。分别除以各自振幅后，三条曲线可以放进同一坐标系，只比较相位与极值位置。",
                    },
                    {
                        "kind": "list",
                        "style": "ordered",
                        "items": [
                            "位移归一化：X=cos(ωt+φ)。",
                            "速度归一化：V=cos(ωt+φ+π/2)。",
                            "加速度归一化：A_acc=cos(ωt+φ+π)。",
                        ],
                    },
                    {
                        "kind": "paragraph",
                        "text": "速度曲线比位移曲线提前四分之一个周期到达同类极值；加速度曲线与位移曲线关于时间轴反相。",
                    },
                ],
            },
        ],
        "demonstrations": [
            {
                "id": "plot-normalized-curves",
                "kind": "function_plot",
                "title": "归一化位移、速度、加速度曲线",
                "anchor_section_id": "normalized-curve-comparison",
                "side": "right",
                "data": {
                    "domain": [0, 12.566370614359172],
                    "range": [-1.5, 1.5],
                    "x_label": "ωt + φ",
                    "y_label": "归一化幅值",
                    "series": [
                        {"expression": "cos(x)", "label": "x(t)"},
                        {"expression": "cos(x + pi/2)", "label": "v(t)"},
                        {"expression": "cos(x + pi)", "label": "a(t)"},
                    ],
                },
            },
        ],
        "summary": [
            "速度相对位移超前 π/2，速度极值出现在位移为零的时刻。",
            "加速度与位移反相，满足 a(t)=-ω²x(t)。",
            "归一化只消除振幅差异，不改变三者的相位关系。",
        ],
    }


def _derivative_scene(goal: str) -> dict[str, Any]:
    return {
        "schema_version": "2.0",
        "subject": "高等数学",
        "topic": "导数与瞬时变化率",
        "title": "割线怎样逼近切线",
        "learning_goal": goal,
        "sections": [
            {
                "id": "average",
                "heading": "先从一段区间上的平均变化开始",
                "blocks": [
                    {"kind": "paragraph", "text": "在 x 到 x+h 之间，函数值改变了 f(x+h)-f(x)。用纵向变化除以横向变化 h，得到割线斜率。"},
                    {"kind": "formula", "latex": "\\frac{f(x+h)-f(x)}{h}", "caption": "h 仍是一个非零的区间宽度"},
                ],
            },
            {
                "id": "limit",
                "heading": "让第二个点沿曲线靠近第一个点",
                "blocks": [
                    {"kind": "paragraph", "text": "当 h 趋近于 0，割线的方向逐渐稳定为切线方向。导数不是把 h 直接取成 0，而是考察商的极限。"},
                    {"kind": "definition", "term": "导数", "text": "如果差商在 h→0 时有有限极限，就称函数在 x 处可导。", "latex": "f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}"},
                ],
            },
            {
                "id": "square",
                "heading": "对 f(x)=x²，只保留决定极限的步骤",
                "blocks": [
                    {"kind": "derivation", "steps": [
                        {"latex": "f'(x)=\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{h}", "note": "代入定义"},
                        {"latex": "f'(x)=\\lim_{h\\to0}(2x+h)", "note": "约去非零的 h"},
                        {"latex": "f'(x)=2x", "note": "取极限"},
                    ]},
                ],
            },
            {
                "id": "meaning",
                "heading": "同一个数有两种读法",
                "blocks": [
                    {"kind": "comparison", "columns": ["几何", "变化"], "rows": [
                        ["曲线在该点的切线斜率", "函数在该点的瞬时变化率"],
                        ["描述局部方向", "描述局部变化快慢"],
                    ]},
                ],
            },
        ],
        "demonstrations": [
            {
                "id": "square-plot",
                "kind": "function_plot",
                "title": "抛物线与局部斜率",
                "anchor_section_id": "limit",
                "side": "right",
                "data": {"domain": [-3, 3], "range": [-1, 9], "series": [{"expression": "x^2", "label": "y=x²"}], "x_label": "x", "y_label": "y"},
            },
            {
                "id": "derivative-morph",
                "kind": "equation_morph",
                "title": "差商收束成 2x",
                "anchor_section_id": "square",
                "side": "left",
                "data": {"steps": [
                    {"latex": "\\frac{(x+h)^2-x^2}{h}", "note": "差商"},
                    {"latex": "2x+h", "note": "h≠0 时化简"},
                    {"latex": "2x", "note": "h→0"},
                ]},
            },
        ],
        "summary": [
            "导数由割线斜率的极限定义。",
            "h 趋近于 0，不等于在差商中直接令 h=0。",
            "导数同时表示切线斜率和瞬时变化率。",
        ],
    }


def _constrained_extremum_scene(goal: str) -> dict[str, Any]:
    """Exercise the safe shared-variable primitive without using the premium page."""
    return {
        "schema_version": "2.0",
        "subject": "多元微积分",
        "topic": "圆约束上的线性目标极值",
        "title": "约束怎样把极值条件变成梯度关系",
        "learning_goal": goal,
        "sections": [
            {
                "id": "motion",
                "heading": "可行点只能沿约束曲线移动",
                "blocks": [
                    {
                        "kind": "paragraph",
                        "text": "设 P(θ)=(cosθ,sinθ) 沿单位圆移动，单位切向量为 t=(-sinθ,cosθ)。同一个 θ 同时决定点、切线和当前目标函数等高线。",
                    },
                    {
                        "kind": "formula",
                        "latex": "P(\\theta)=(\\cos\\theta,\\sin\\theta),\\qquad t=P'(\\theta)=(-\\sin\\theta,\\cos\\theta)",
                        "caption": "演示中的所有运动都由同一个 θ 驱动",
                    },
                ],
            },
            {
                "id": "stationary",
                "heading": "极值处沿切线的一阶变化必须为零",
                "blocks": [
                    {
                        "kind": "paragraph",
                        "text": "目标函数取 f(x,y)=x+2y。沿单位圆限制以后，方向导数为 ∇f·t=-sinθ+2cosθ；它降到 0 时，沿可行切线不再有一阶增减。",
                    },
                    {
                        "kind": "formula",
                        "latex": "\\nabla f\\cdot t=-\\sin\\theta+2\\cos\\theta=0",
                        "caption": "数值计、切向量和约束点保持同步",
                    },
                ],
            },
            {
                "id": "parallel",
                "heading": "两个梯度都落在同一个法空间",
                "blocks": [
                    {
                        "kind": "paragraph",
                        "text": "约束保持不变给出 ∇g·t=0，极值条件给出 ∇f·t=0。在二维正则点处，法空间是一维的，所以两个梯度平行。",
                    },
                    {
                        "kind": "derivation",
                        "title": "只保留决定结论的三步",
                        "steps": [
                            {"latex": "g(P(\\theta))=0\\Rightarrow\\nabla g(P)\\cdot t=0", "note": "约束法向"},
                            {"latex": "\\nabla f(P)\\cdot t=0", "note": "极值的一阶条件"},
                            {"latex": "\\nabla f(P)=\\lambda\\nabla g(P)", "note": "同属一维法空间"},
                        ],
                    },
                ],
            },
            {
                "id": "solve",
                "heading": "联立原约束得到候选点",
                "blocks": [
                    {
                        "kind": "example",
                        "prompt": "在 x²+y²=1 上求 f=x+2y 的最大值。",
                        "steps": [
                            {"text": "梯度平行。", "latex": "(1,2)=\\lambda(2x,2y)"},
                            {"text": "与原约束联立。", "latex": "x^2+y^2=1"},
                            {"text": "比较两个候选点。", "latex": "(x,y)=\\pm(1,2)/\\sqrt5"},
                        ],
                        "result": "最大点为 (1,2)/√5，最大值为 √5；方程给出候选，最后仍需比较。",
                    }
                ],
            },
        ],
        "demonstrations": [
            {
                "id": "circle-linear-extremum",
                "kind": "constrained_extremum_2d",
                "title": "P、Q 合并时，等高线从割线退化为切线",
                "anchor_section_id": "motion",
                "side": "left",
                "data": {
                    "constraint": {
                        "kind": "circle",
                        "center": [0, 0],
                        "radius": 1,
                    },
                    "objective": {
                        "kind": "linear",
                        "coefficients": [1, 2],
                        "constant": 0,
                    },
                    "extremum": "maximum",
                    "start_angle_deg": 210,
                    "duration_ms": 9000,
                },
            },
            {
                "id": "gradient-parallel-morph",
                "kind": "equation_morph",
                "title": "两个垂直条件汇入同一结论",
                "anchor_section_id": "parallel",
                "side": "right",
                "data": {
                    "steps": [
                        {"latex": "\\nabla g(P)\\cdot t=0", "note": "约束保持不变"},
                        {"latex": "\\nabla f(P)\\cdot t=0", "note": "极值处一阶不变"},
                        {"latex": "\\nabla f(P)=\\lambda\\nabla g(P)", "note": "同属一维法空间"},
                    ]
                },
            },
        ],
        "summary": [
            "约束把可行的一阶移动限制在切线方向。",
            "一个共享参数可以同步几何、公式和数值。",
            "梯度平行只产生候选点，极值类型仍需比较。",
        ],
    }


def _electromagnetic_induction_scene(goal: str) -> dict[str, Any]:
    """A text-first physics scene with prediction and two linked representations."""
    return {
        "schema_version": "2.0",
        "subject": "普通物理学",
        "topic": "法拉第定律与楞次定律",
        "title": "磁通量怎样决定感应电动势与方向",
        "learning_goal": goal,
        "sections": [
            {
                "id": "flux",
                "heading": "先确定穿过线圈的磁通量",
                "blocks": [
                    {
                        "kind": "paragraph",
                        "text": "磁通量由磁场强度、线圈面积以及磁场与线圈法向的夹角共同决定。把出纸面规定为磁场正方向，线圈法向与它同向时夹角为零。",
                        "semantic_ids": ["magnetic-field", "magnetic-flux", "coil-orientation"],
                    },
                    {
                        "kind": "formula",
                        "latex": r"\Phi_B=BA\cos\theta",
                        "caption": "改变 B、A 或 θ 都可能改变磁通量",
                        "semantic_ids": ["magnetic-field", "magnetic-flux", "coil-orientation"],
                    },
                ],
            },
            {
                "id": "change",
                "heading": "感应电动势响应的是磁通量变化率",
                "blocks": [
                    {
                        "kind": "definition",
                        "term": "法拉第电磁感应定律",
                        "text": "N 匝线圈中的感应电动势等于每匝磁通量变化率的负 N 倍。磁通量不变时，即使磁场不为零，也没有持续的感应电动势。",
                        "latex": r"\mathcal E=-N\frac{d\Phi_B}{dt}",
                        "semantic_ids": ["faraday-law", "induced-emf", "magnetic-flux"],
                    },
                    {
                        "kind": "derivation",
                        "title": "固定面积和方向，只改变磁场",
                        "steps": [
                            {"latex": r"\Phi_B(t)=A B(t)\cos\theta", "note": "写出随时间变化的磁通量"},
                            {"latex": r"\frac{d\Phi_B}{dt}=A\cos\theta\frac{dB}{dt}", "note": "面积与方向保持不变"},
                            {"latex": r"\mathcal E=-NA\cos\theta\frac{dB}{dt}", "note": "代入法拉第定律"},
                        ],
                        "semantic_ids": ["faraday-law", "induced-emf", "magnetic-flux"],
                    },
                ],
            },
            {
                "id": "direction",
                "heading": "负号用楞次定律确定方向",
                "blocks": [
                    {
                        "kind": "paragraph",
                        "text": "若出纸面的正磁通量正在增大，线圈产生的磁场必须指向纸内来反抗这种增大。按右手定则，感应电流因此沿顺时针方向。这里反抗的是磁通量的变化，不是反抗磁场本身。",
                        "semantic_ids": ["magnetic-field", "magnetic-flux", "induced-emf", "lenz-direction"],
                    },
                    {
                        "kind": "formula",
                        "latex": r"\frac{d\Phi_B}{dt}>0\Rightarrow\mathcal E<0",
                        "caption": "约定逆时针电动势为正，因此负号对应顺时针",
                        "semantic_ids": ["induced-emf", "lenz-direction"],
                    },
                ],
            },
            {
                "id": "boundary",
                "heading": "先判断变化，再计算大小",
                "blocks": [
                    {
                        "kind": "list",
                        "style": "ordered",
                        "items": [
                            "先选定线圈法向和环路正方向。",
                            "判断磁通量是增大、减小还是保持不变。",
                            "由楞次定律定方向，再用变化率计算电动势大小。",
                        ],
                        "semantic_ids": ["faraday-law", "lenz-direction"],
                    },
                ],
            },
        ],
        "demonstrations": [
            {
                "id": "faraday-loop",
                "kind": "field_experiment",
                "title": "先预测电流方向，再让磁场变化",
                "anchor_section_id": "direction",
                "side": "left",
                "semantic_ids": ["magnetic-field", "magnetic-flux", "induced-emf", "lenz-direction"],
                "prediction": {
                    "prompt": "出纸面的磁场逐渐增强时，感应电流朝哪个方向？",
                    "options": [
                        {"id": "clockwise", "label": "顺时针"},
                        {"id": "counterclockwise", "label": "逆时针"},
                        {"id": "zero", "label": "没有感应电流"},
                    ],
                    "answer_id": "clockwise",
                    "explanation": "正磁通量增大，感应磁场指向纸内；按右手定则，电流为顺时针。",
                },
                "data": {
                    "mode": "faraday_loop",
                    "turns": 50,
                    "area": 0.02,
                    "orientation_deg": 0,
                    "field_start": 0.1,
                    "field_end": 0.8,
                    "change_duration_s": 2,
                    "duration_ms": 9000,
                    "semantic_map": {
                        "field": "magnetic-field",
                        "flux": "magnetic-flux",
                        "emf": "induced-emf",
                        "direction": "lenz-direction",
                    },
                },
            },
            {
                "id": "flux-linked-lab",
                "kind": "linked_lab",
                "title": "同一个 B 同步改变向量、读数与角度曲线",
                "anchor_section_id": "flux",
                "side": "right",
                "semantic_ids": ["magnetic-field", "magnetic-flux", "coil-orientation"],
                "data": {
                    "parameter": {
                        "id": "b",
                        "label": "磁场 B",
                        "min": -1,
                        "max": 1,
                        "initial": 0.6,
                        "step": 0.02,
                        "unit": "T",
                    },
                    "domain": [0, 6.283185307179586],
                    "range": [-0.025, 0.025],
                    "readouts": [
                        {
                            "id": "flux-value",
                            "semantic_id": "magnetic-flux",
                            "label": "θ=0 时的磁通量",
                            "expression": "b*0.02",
                            "unit": "Wb",
                        },
                    ],
                    "curves": [
                        {
                            "id": "flux-angle-curve",
                            "semantic_id": "magnetic-flux",
                            "label": "磁通量随 θ 变化",
                            "expression": "0.02*b*cos(x)",
                        },
                    ],
                    "vectors": [
                        {
                            "id": "field-vector",
                            "semantic_id": "magnetic-field",
                            "label": "磁场方向与大小",
                            "x_expression": "0",
                            "y_expression": "b",
                        },
                    ],
                    "formula_latex": r"\Phi_B=BA\cos\theta",
                },
            },
        ],
        "summary": [
            "磁场本身不直接决定感应电动势，磁通量变化率才决定其大小。",
            "法拉第定律给出大小和符号，楞次定律把负号解释为反抗磁通量变化。",
            "先固定正方向，再判断变化方向，可以避免凭直觉猜电流方向。",
        ],
    }


def _limit_and_circle_scene(goal: str) -> dict[str, Any]:
    """Exercise a changing local relation and a geometric invariant together."""
    return {
        "schema_version": "2.0",
        "subject": "数学",
        "topic": "动态关系中的极限与不变量",
        "title": "拖动时，什么趋近，什么保持不变",
        "learning_goal": goal,
        "sections": [
            {
                "id": "action",
                "heading": "动态演示先明确观察任务",
                "blocks": [
                    {
                        "kind": "paragraph",
                        "text": "有些数学对象在拖动中逐渐逼近一个极限，有些量则在允许的运动中保持不变。学习动作不是观看图形移动，而是先预测再辨认这两类关系。",
                        "semantic_ids": ["limit-process", "circle-invariant"],
                    }
                ],
            },
            {
                "id": "derivative",
                "heading": "割线斜率怎样逼近切线斜率",
                "blocks": [
                    {
                        "kind": "definition",
                        "term": "导数",
                        "text": "固定 x₀，让第二个点从 x₀+h 靠近 x₀；差商若趋于稳定，就得到该点的切线斜率。",
                        "latex": r"f'(x_0)=\lim_{h\to0}\frac{f(x_0+h)-f(x_0)}{h}",
                        "semantic_ids": ["secant-slope", "tangent-slope", "limit-process"],
                    },
                    {
                        "kind": "formula",
                        "latex": r"f(x)=x^2,\quad x_0=1,\quad f'(1)=2",
                        "caption": "演示只改变 h，不改变观察点 x₀",
                        "semantic_ids": ["secant-slope", "tangent-slope"],
                    },
                ],
            },
            {
                "id": "circle",
                "heading": "同弦所对的圆周角为什么保持不变",
                "blocks": [
                    {
                        "kind": "paragraph",
                        "text": "固定圆上的弦 AB，让顶点 P 沿不跨过 A、B 的同一段圆弧移动。两条射线 PA、PB 都在变化，但圆周角 ∠APB 保持不变。",
                        "semantic_ids": ["fixed-chord", "inscribed-angle", "circle-invariant"],
                    },
                    {
                        "kind": "formula",
                        "latex": r"\angle APB=\frac12\angle AOB",
                        "caption": "固定弦 AB 等价于固定圆心角 AOB",
                        "semantic_ids": ["fixed-chord", "inscribed-angle", "circle-invariant"],
                    },
                ],
            },
            {
                "id": "compare",
                "heading": "一个观察趋近，一个观察不变量",
                "blocks": [
                    {
                        "kind": "comparison",
                        "columns": ["实验", "主动改变", "要观察的关系"],
                        "rows": [
                            ["导数显微镜", "减小 h", "割线斜率趋近切线斜率"],
                            ["圆周角约束", "沿圆弧移动 P", "同弦所对圆周角保持不变"],
                        ],
                        "semantic_ids": ["limit-process", "circle-invariant"],
                    }
                ],
            },
        ],
        "demonstrations": [
            {
                "id": "derivative-microscope",
                "kind": "limit_microscope",
                "title": "拖动 h，观察差商是否稳定",
                "anchor_section_id": "derivative",
                "side": "left",
                "semantic_ids": ["secant-slope", "tangent-slope", "limit-process"],
                "prediction": {
                    "prompt": "当 h 接近 0 时，x² 在 x₀=1 处的割线斜率趋近多少？",
                    "options": [
                        {"id": "toward-two", "label": "趋近 2"},
                        {"id": "toward-zero", "label": "趋近 0"},
                        {"id": "diverges", "label": "不断增大"},
                    ],
                    "answer_id": "toward-two",
                    "explanation": "差商等于 2+h，因此 h 接近 0 时趋近 2。",
                },
                "data": {
                    "mode": "derivative",
                    "expression": "x^2",
                    "domain": [-3, 3],
                    "range": [-1, 9],
                    "x0": 1,
                    "h_initial": 1.5,
                    "h_min": 0.01,
                    "h_max": 2,
                    "duration_ms": 8500,
                    "semantic_map": {
                        "secant": "secant-slope",
                        "tangent": "tangent-slope",
                        "process": "limit-process",
                    },
                },
            },
            {
                "id": "inscribed-angle-lab",
                "kind": "constraint_geometry",
                "title": "移动 P，寻找保持不变的角",
                "anchor_section_id": "circle",
                "side": "right",
                "semantic_ids": ["fixed-chord", "inscribed-angle", "circle-invariant"],
                "prediction": {
                    "prompt": "固定弦 AB 并沿同一段圆弧移动 P，∠APB 怎样变化？",
                    "options": [
                        {"id": "stays-constant", "label": "保持不变"},
                        {"id": "keeps-growing", "label": "不断增大"},
                        {"id": "keeps-shrinking", "label": "不断减小"},
                    ],
                    "answer_id": "stays-constant",
                    "explanation": "同弦 AB 对应固定的圆心角 AOB，圆周角始终是它的一半。",
                },
                "data": {
                    "mode": "inscribed_angle",
                    "center": [0, 0],
                    "radius": 1,
                    "fixed_angles_deg": [210, 330],
                    "moving_angle_deg": 80,
                    "duration_ms": 9000,
                    "semantic_map": {
                        "chord": "fixed-chord",
                        "angle": "inscribed-angle",
                        "invariant": "circle-invariant",
                    },
                },
            },
        ],
        "summary": [
            "极限实验关注一个量在连续变化中趋近什么。",
            "约束几何实验关注哪些对象变化、哪些关系保持不变。",
            "先预测目标关系，再拖动验证，比只观看入场动画更有学习价值。",
        ],
    }


def _riemann_sum_scene(goal: str) -> dict[str, Any]:
    """Exercise the deterministic integral renderer without authored SVG."""
    return {
        "schema_version": "2.0",
        "subject": "高等数学",
        "topic": "黎曼和与定积分",
        "title": "从有限个矩形走向定积分",
        "learning_goal": goal,
        "sections": [
            {
                "id": "partition",
                "heading": "先把区间分成有限个小区间",
                "blocks": [
                    {
                        "kind": "paragraph",
                        "text": "把区间 [0,2] 等分为 n 份，每一份宽度都是 Δx=2/n。在每个小区间取一个代表点，用函数值作为矩形的有向高度。",
                        "semantic_ids": ["integrand-curve", "riemann-rectangles"],
                    },
                    {
                        "kind": "formula",
                        "latex": r"\Delta x=\frac{b-a}{n},\qquad A_i=f(x_i^*)\Delta x",
                        "caption": "单个窄条由高度与宽度共同决定",
                        "semantic_ids": ["riemann-rectangles", "signed-area"],
                    },
                ],
            },
            {
                "id": "sum",
                "heading": "有限个窄条先形成一个矩形和",
                "blocks": [
                    {
                        "kind": "definition",
                        "term": "中点黎曼和",
                        "text": "每段都在中点取样，把所有矩形的有向面积相加，得到对定积分值的有限近似。",
                        "latex": r"S_n=\sum_{i=1}^{n}f(x_i^*)\Delta x",
                        "semantic_ids": ["riemann-rectangles", "signed-area"],
                    }
                ],
            },
            {
                "id": "limit",
                "heading": "分割加密时，有限和趋向什么",
                "blocks": [
                    {
                        "kind": "paragraph",
                        "text": "n 增大时，Δx 变小，矩形边缘与曲线之间留下的缺口收窄。对连续函数，黎曼和趋向同一个定积分值。",
                        "semantic_ids": ["signed-area", "integral-limit"],
                    },
                    {
                        "kind": "formula",
                        "latex": r"\lim_{n\to\infty}\sum_{i=1}^{n}f(x_i^*)\Delta x=\int_a^b f(x)\,dx",
                        "caption": "定积分把有限求和提升为极限",
                        "semantic_ids": ["integral-limit"],
                    },
                ],
            },
        ],
        "demonstrations": [
            {
                "id": "riemann-area-lab",
                "kind": "riemann_sum",
                "title": "矩形生长、逐块求和，再加密分割",
                "anchor_section_id": "sum",
                "side": "right",
                "semantic_ids": [
                    "integrand-curve",
                    "riemann-rectangles",
                    "signed-area",
                    "integral-limit",
                ],
                "data": {
                    "mode": "area_under_curve",
                    "expression": "x^2",
                    "domain": [0, 2],
                    "range": [0, 4.4],
                    "n_initial": 8,
                    "n_min": 2,
                    "n_max": 64,
                    "sample": "midpoint",
                    "duration_ms": 11000,
                    "semantic_map": {
                        "curve": "integrand-curve",
                        "rectangles": "riemann-rectangles",
                        "area": "signed-area",
                        "limit": "integral-limit",
                    },
                },
            }
        ],
        "summary": [
            "每个矩形贡献 f(xᵢ*)Δx。",
            "黎曼和先是有限近似，定积分是分割无限加密时的极限。",
            "误差读数把“看起来更贴合”变成可以比较的量。",
        ],
    }


def _history_scene(goal: str) -> dict[str, Any]:
    return {
        "schema_version": "2.0",
        "subject": "历史",
        "topic": "英国工业革命的形成条件",
        "title": "工业革命不是由单一发明触发的",
        "learning_goal": goal,
        "sections": [
            {"id": "question", "heading": "问题不是“谁发明了机器”，而是“为什么机器在这里形成系统”", "blocks": [
                {"kind": "paragraph", "text": "18 世纪后半叶，英国的技术改良、资本积累、市场扩展、能源条件与劳动组织彼此加强。单独列出某一项，都不足以解释工业化为何持续。"},
            ]},
            {"id": "conditions", "heading": "把条件分成供给、需求与制度环境", "blocks": [
                {"kind": "comparison", "columns": ["方面", "作用"], "rows": [
                    ["煤炭与交通", "降低动力和运输成本"],
                    ["国内外市场", "扩大批量生产的收益"],
                    ["资本与金融", "支持机器和工厂的前期投入"],
                    ["技术与工匠网络", "让改良能够传播并反复迭代"],
                ]},
            ]},
            {"id": "feedback", "heading": "关键在于条件之间形成正反馈", "blocks": [
                {"kind": "paragraph", "text": "市场扩大提高机械化收益，机械化降低成本并进一步扩大市场；煤炭提供动力，交通改进又扩大煤炭和产品的可达范围。因果链条因此不断自我强化。"},
                {"kind": "list", "style": "ordered", "items": ["需求扩大使机器投资更可能回本。", "生产成本下降使商品进入更大的市场。", "利润和经验继续流向下一轮技术改良。"]},
            ]},
            {"id": "boundary", "heading": "结论要保留边界", "blocks": [
                {"kind": "paragraph", "text": "这些条件解释的是工业化的相对优势，不意味着英国道路是唯一道路，也不能把殖民贸易、资源获取和社会代价从叙述中删去。"},
            ]},
        ],
        "demonstrations": [
            {"id": "industrial-map", "kind": "concept_map", "title": "条件不是清单，而是网络", "anchor_section_id": "conditions", "side": "left", "data": {
                "nodes": [{"id": "market", "label": "市场"}, {"id": "capital", "label": "资本"}, {"id": "energy", "label": "煤炭动力"}, {"id": "tech", "label": "技术改良"}, {"id": "factory", "label": "工厂生产"}],
                "edges": [{"from": "market", "to": "capital", "label": "利润"}, {"from": "capital", "to": "tech", "label": "投资"}, {"from": "energy", "to": "factory", "label": "动力"}, {"from": "tech", "to": "factory", "label": "机械化"}, {"from": "factory", "to": "market", "label": "低成本商品"}]
            }},
            {"id": "industrial-process", "kind": "process", "title": "一条自我强化的回路", "anchor_section_id": "feedback", "side": "right", "data": {"steps": [
                {"label": "市场扩大", "detail": "批量生产更有收益"},
                {"label": "机器投资", "detail": "资本进入工厂"},
                {"label": "成本下降", "detail": "单位商品更便宜"},
                {"label": "市场继续扩大", "detail": "需求与供给相互强化"}
            ]}},
        ],
        "summary": ["工业革命由多项条件共同形成。", "解释重点是条件之间的反馈关系。", "历史因果结论必须保留比较范围和社会代价。"],
    }


def choose_offline_fixture(goal: str) -> dict[str, Any] | None:
    """Return a matching fixture only when the requested topic is unambiguous."""
    text = goal.lower()
    if "riemann-sum-fixture" in text:
        return _riemann_sum_scene(goal)
    if any(signal in text for signal in ("电磁感应", "法拉第定律", "楞次定律", "faraday")):
        return _electromagnetic_induction_scene(goal)
    if "极限显微镜" in text and any(signal in text for signal in ("圆周角", "约束几何")):
        return _limit_and_circle_scene(goal)
    if any(signal in text for signal in ("贝叶斯", "条件概率", "bayes")):
        return _bayes_scene(goal)
    if any(signal in text for signal in ("牛顿第二定律", "f=ma", "合外力")):
        return _newton_scene(goal)
    if any(signal in text for signal in ("简谐运动", "谐振子", "simple harmonic")):
        return _simple_harmonic_motion_scene(goal)
    if any(signal in text for signal in ("导数", "瞬时变化率", "割线", "切线斜率")):
        return _derivative_scene(goal)
    if any(signal in text for signal in ("约束极值原语", "圆上线性目标")):
        return _constrained_extremum_scene(goal)
    if "工业革命" in text and any(signal in text for signal in ("英国", "原因", "条件", "为什么")):
        return _history_scene(goal)
    return None
