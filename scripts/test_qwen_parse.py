#!/usr/bin/env python3
"""Qwen /parse prompt 调优 —— 对比不同 prompt 格式的准确率。"""
import json, re, time, urllib.request

BASE = "http://127.0.0.1:9060/v1"
KEY = "sk-123456"
MODEL = "Qwen3.5-27B"

TESTS = [
    ("明天下午3点交周报给张三", "task"),
    ("我喜欢早起工作，讨厌开会", "memory"),
    ("我决定辞职创业", "decision"),
    ("今天跑步5公里，配速5分半", "note"),
    ("中午吃了沙拉和鸡胸肉", "note"),
    ("我在北京做软件工程师", "memory"),
    ("本周五前完成项目答辩PPT", "task"),
    ("我觉得比起React，Vue更好用", "memory"),
    ("https://bilibili.com/video/BV123", "url"),
]

PROMPTS = {
    "v1_current": """分类用户输入，只返回JSON:
输入: {text}
类型: task(待办/提醒/截止日期), memory(关于"我"的事实/偏好/目标), decision(做出的选择/决定), note(不属于以上), url(链接)
JSON格式示例: {"type":"task","title":"标题","priority":"medium","due_date":"YYYY-MM-DD"}
只返回JSON，不要其他文字。""",

    "v2_structured": """分析以下文本，判断其类型。只输出一个JSON对象，不要解释。

文本: {text}

类型定义:
- task: 包含明确的待办事项、截止日期或提醒语义。需提取title和due_date
- memory: 关于"我"的陈述，包含个人事实、偏好或目标。需提取category(fact/preference/goal)和content
- decision: 包含明确的选择或决定。需提取title和decision
- url: 是一个网址链接
- note: 不属于以上类型的普通记录

输出格式: {"type":"...", ...字段}""",

    "v3_minimal": """文本: "{text}"

如果包含时间/截止日/待办语义 → {"type":"task","title":"简短标题","priority":"medium"}
如果以"我"开头且陈述事实/偏好 → {"type":"memory","category":"preference","content":"内容"}
如果包含"我决定/我选择" → {"type":"decision","title":"简短标题","decision":"内容"}
如果是网址链接 → {"type":"url"}
否则 → {"type":"note","content":"原文"}

JSON:""",
}


def call_qwen(prompt: str) -> str:
    data = json.dumps({
        "model": MODEL,
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 200,
        "temperature": 0.1,
    }).encode()
    req = urllib.request.Request(f"{BASE}/chat/completions", data=data,
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {KEY}"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        r = json.loads(resp.read())
    msg = r.get("choices", [{}])[0].get("message", {})
    return (msg.get("content") or msg.get("reasoning") or "")


def extract_type(text: str) -> str:
    # Try to find JSON
    match = re.search(r'\{[^{}]*"type"\s*:\s*"([^"]+)"[^{}]*\}', text)
    if match:
        try:
            return json.loads(match.group()).get("type", "raw")
        except: pass
    # Check for bare type words
    text_lower = re.sub(r'[^a-z]', '', text.lower()[:50])
    for t in ["task", "memory", "decision", "note", "url"]:
        if t in text_lower:
            return t
    return f"raw({text[:30]})"


def test_prompt(name: str, template: str) -> dict:
    print(f"\n=== {name} ===")
    correct = 0
    details = []
    for text, expected in TESTS:
        prompt = template.replace("{text}", text)
        try:
            response = call_qwen(prompt)
            result_type = extract_type(response)
            match = result_type == expected
            if match: correct += 1
            sym = "✓" if match else f"✗ ({expected}→{result_type})"
            print(f"  {sym}: {text[:50]}")
            details.append({"text": text, "expected": expected, "got": result_type, "match": match})
        except Exception as e:
            print(f"  ERR: {text[:30]} -> {e}")
        time.sleep(1.5)
    acc = round(correct / len(TESTS) * 100)
    print(f"  准确率: {acc}% ({correct}/{len(TESTS)})")
    return {"accuracy": acc, "details": details}


if __name__ == "__main__":
    results = {}
    for name, tpl in PROMPTS.items():
        results[name] = test_prompt(name, tpl)

    print("\n" + "=" * 40)
    print("总结:")
    best = max(results.items(), key=lambda x: x[1]["accuracy"])
    for name, r in results.items():
        marker = " ← 最佳" if name == best[0] else ""
        print(f"  {name}: {r['accuracy']}%{marker}")
