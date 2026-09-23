"""按原则守护 Axiom 前端美学，而不是按某一版实现的快照。

依据：docs/FRONTEND_ART_DIRECTION.md（夜行长卷）

设计约定
--------
这个脚本只断言纲领里**不可让步**的原则，并且对 ``frontend/src`` 全量生效。

- 纲领允许演进的东西（暗场具体色值、顶栏高度、页面构图像素、入口文案）
  一律不做断言。之前的版本把 2026-08-27 的实现细节写成了契约，
  结果是纲领要求的改色和顶栏退场会让检查失败，而纲领禁止的玻璃拟态
  因为不在白名单里反而存活——守卫方向是反的。
- 纲领明令禁止的东西（渐变、玻璃、视口缩放字号、过小界面字号、
  非零字距、幽灵字体、英文装饰眉题、低于可访问性下限的对比度）
  对所有界面文件生效，不再维护"受管文件"白名单。
- 对比度是算出来的，不是比字符串。阈值来自纲领第 13 节与 WCAG 2.2 AA。
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[1]
FRONTEND = ROOT / "frontend"
SRC = FRONTEND / "src"
TOKENS = SRC / "styles" / "tokens.css"
BASE = SRC / "styles" / "base.css"

# _legacy 只保留回归价值，不参与下一代美学治理。
EXCLUDED_DIRS = {"_legacy"}

# 已登记的例外。
#
# 这不是免检许可，而是一张**可见的债务清单**：每条都写明原因和清理计划，
# 检查通过时也会把条数打出来。旧版守卫用"受管文件白名单"，效果是
# 整个文件（包括 2870 行的 AtlasView）连同它的全部违规一起隐身；
# 这里换成按"文件 + 规则"逐条登记，规模一目了然，也不会悄悄增长。
WAIVERS: dict[str, dict[str, str]] = {
    # Foundry 性质的工程界面：纲领 5.2 允许更高密度的仪器语言。
    # 10px 用于图谱调试面板的元数据，不承载日常判断。
    "frontend/src/components/cosmos/AssociationEditDialog.vue": {"tiny-type": "图谱治理面板元数据"},
    "frontend/src/components/cosmos/AtlasSearch.vue": {"tiny-type": "图谱治理面板元数据"},
    "frontend/src/components/cosmos/LegendBar.vue": {"tiny-type": "图谱图例刻度"},
    "frontend/src/components/cosmos/NodeDetailCard.vue": {"tiny-type": "图谱治理面板元数据"},
    "frontend/src/components/cosmos/PathPanel.vue": {"tiny-type": "图谱路径刻度"},
    "frontend/src/components/cosmos/PendingReviewPanel.vue": {"tiny-type": "图谱待审元数据"},
    "frontend/src/components/cosmos/RecentPanel.vue": {"tiny-type": "图谱最近列表元数据"},
    "frontend/src/components/LifelinePanel.vue": {"tiny-type": "生活线树层级标注"},
    "frontend/src/components/SmartInput.vue": {"tiny-type": "输入解析提示"},
    # 隔离原型：study.css 自带一套色板与字阶，合并回主应用时统一清理。
    # 见 docs/FRONTEND_ART_DIRECTION.md 第 16 节研发顺序第 4 步。
    "frontend/src/atlas-study/study.css": {
        "tiny-type": "原型区域编号与来源标注，合并回主应用时统一到 11px 下限",
        "ghost-font": "原型未接入 tokens.css，字体链待合并",
    },
}


def waived(path_key: str, rule: str) -> str | None:
    return WAIVERS.get(path_key, {}).get(rule)


def surfaces() -> list[Path]:
    """所有参与下一代美学治理的界面文件。"""
    files: list[Path] = []
    for path in sorted(SRC.rglob("*")):
        if path.suffix not in {".vue", ".css"}:
            continue
        if any(part in EXCLUDED_DIRS for part in path.parts):
            continue
        files.append(path)
    return files


def rel(path: Path) -> str:
    return str(path.relative_to(ROOT)).replace("\\", "/")


# --------------------------------------------------------------------------
# 颜色与对比度
# --------------------------------------------------------------------------


def srgb_to_linear(channel: float) -> float:
    channel /= 255
    return channel / 12.92 if channel <= 0.03928 else ((channel + 0.055) / 1.055) ** 2.4


def luminance(rgb: tuple[float, float, float]) -> float:
    r, g, b = (srgb_to_linear(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(fg: tuple[float, float, float], bg: tuple[float, float, float]) -> float:
    l1, l2 = luminance(fg), luminance(bg)
    hi, lo = (l1, l2) if l1 > l2 else (l2, l1)
    return (hi + 0.05) / (lo + 0.05)


def parse_hex(value: str) -> tuple[float, float, float] | None:
    match = re.fullmatch(r"#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})", value.strip())
    if not match:
        return None
    digits = match.group(1)
    if len(digits) == 3:
        digits = "".join(c * 2 for c in digits)
    return tuple(int(digits[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def parse_rgba(value: str) -> tuple[tuple[float, float, float], float] | None:
    match = re.fullmatch(
        r"rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,/\s]+([\d.]+))?\s*\)",
        value.strip(),
    )
    if not match:
        return None
    r, g, b = (float(match.group(i)) for i in (1, 2, 3))
    alpha = float(match.group(4)) if match.group(4) else 1.0
    return (r, g, b), alpha


def over(
    fg: tuple[float, float, float], alpha: float, bg: tuple[float, float, float]
) -> tuple[float, float, float]:
    return tuple(f * alpha + b * (1 - alpha) for f, b in zip(fg, bg))  # type: ignore[return-value]


def read_tokens() -> dict[str, str]:
    text = TOKENS.read_text(encoding="utf-8")
    return {
        name: value.strip()
        for name, value in re.findall(r"--([a-z0-9-]+):\s*([^;]+);", text)
    }


def check_contrast(tokens: dict[str, str]) -> list[str]:
    """实算对比度。阈值来自纲领第 13 节与 WCAG 2.2 AA。

    分隔线按承担的认识角色分三级，而不是一刀切：纲领第 3.3 节既拒绝
    "低对比细线铺满页面"，也拒绝把所有内容对齐成企业后台的硬网格。
    """
    errors: list[str] = []

    surface_names = ["surface-0", "surface-1", "surface-2", "surface-3"]
    backgrounds: dict[str, tuple[float, float, float]] = {}
    for name in surface_names:
        raw = tokens.get(name)
        rgb = parse_hex(raw) if raw else None
        if rgb is None:
            errors.append(f"tokens.css: --{name} 缺失或不是可解析的十六进制色")
            continue
        backgrounds[name] = rgb

    if not backgrounds:
        return errors

    darkest = backgrounds.get("surface-0")
    # 线画在哪个表面上最吃亏，就用哪个表面验收。
    brightest_name = max(backgrounds, key=lambda n: luminance(backgrounds[n]))
    brightest = backgrounds[brightest_name]

    # 文字：正文与次级文字对底色的最低要求。
    text_floors = {
        "text-1": 4.5,
        "text-2": 4.5,
        "text-3": 4.5,
        "text-4": 4.5,
        "text-5": 4.5,
    }
    for name, floor in text_floors.items():
        raw = tokens.get(name)
        rgb = parse_hex(raw) if raw else None
        if rgb is None:
            errors.append(f"tokens.css: --{name} 缺失或不是可解析的十六进制色")
            continue
        if darkest is None:
            continue
        ratio = contrast(rgb, darkest)
        if ratio < floor:
            errors.append(
                f"tokens.css: --{name} 对 --surface-0 只有 {ratio:.2f}:1，"
                f"低于 AA 正文下限 {floor}:1（纲领 13）"
            )

    # 分隔线：三级角色，各有下限。
    line_floors = {
        "line-1": (1.7, "装饰性分段，旁边必须另有排版线索"),
        "line-2": (3.0, "承载结构的边界，AA 非文本下限"),
        "line-3": (4.5, "交互与焦点边界"),
    }
    for name, (floor, role) in line_floors.items():
        raw = tokens.get(name)
        if raw is None:
            errors.append(f"tokens.css: --{name} 缺失")
            continue
        parsed = parse_rgba(raw)
        if parsed is None:
            rgb = parse_hex(raw)
            if rgb is None:
                errors.append(f"tokens.css: --{name} 不是可解析的颜色：{raw}")
                continue
            composited = rgb
        else:
            composited = over(parsed[0], parsed[1], brightest)
        ratio = contrast(composited, brightest)
        if ratio < floor:
            errors.append(
                f"tokens.css: --{name} 在 --{brightest_name} 上只有 {ratio:.2f}:1，"
                f"低于 {floor}:1（{role}）"
            )

    return errors


# --------------------------------------------------------------------------
# 材料禁令：纲领 9.3 / 12 / 15
# --------------------------------------------------------------------------

BANNED_MATERIAL = (
    ("gradient", re.compile(r"linear-gradient\("), "渐变背景（纲领 9.3 / 15）"),
    ("gradient", re.compile(r"radial-gradient\("), "渐变光斑（纲领 3.4 / 9.3 / 15）"),
    ("glass", re.compile(r"(?:-webkit-)?backdrop-filter:\s*blur"), "玻璃拟态（纲领 9.3 / 15）"),
    ("clamp-type", re.compile(r"font-size:\s*clamp\("), "视口缩放字号（纲领 8.2）"),
    # 8–9px 在任何环境都不可读，不接受登记例外；10px 属于密集元数据，可登记。
    ("unreadable-type", re.compile(r"font-size:\s*[89]px"), "不可读的界面字号（纲领 8.2 / 13）"),
    ("tiny-type", re.compile(r"font-size:\s*10px"), "小于 11px 的界面字号（纲领 8.2 / 13）"),
    ("shouting", re.compile(r"text-transform:\s*uppercase"), "全大写英文装饰（纲领 8.3）"),
)

# 地图内标签自有尺度，只有图层界面可以使用；否则它会变成界面字号的后门。
MAP_LABEL = re.compile(r"var\(--map-label(?:-minor)?\)")
MAP_SURFACES = ("atlas", "cosmos")

# 字距恒为零（纲领 8.2）。
LETTER_SPACING = re.compile(r"letter-spacing:\s*([^;]+);")
LETTER_SPACING_ZERO = re.compile(r"^(0|0[a-z%]+|normal)(\s*!important)?$")

# 圆角上限：卡片化的主要外观信号（纲领 12）。
# 圆点、药丸、控件小圆角不在此列。
RADIUS = re.compile(r"border-radius:\s*([^;]+);")
RADIUS_ALLOWED = re.compile(r"^(0|50%|999px|var\(--r-(?:1|2|3|pill)\)|[0-8]px)$")


def check_material(files: list[Path]) -> tuple[list[str], int]:
    errors: list[str] = []
    waived_count = 0
    for path in files:
        key = rel(path)
        text = path.read_text(encoding="utf-8")
        for rule, pattern, reason in BANNED_MATERIAL:
            matches = list(pattern.finditer(text))
            if not matches:
                continue
            if waived(key, rule):
                waived_count += len(matches)
                continue
            for match in matches:
                line = text.count("\n", 0, match.start()) + 1
                errors.append(f"{key}:{line} 出现{reason}：{match.group(0)}")
        for match in LETTER_SPACING.finditer(text):
            value = match.group(1).strip()
            if LETTER_SPACING_ZERO.fullmatch(value):
                continue
            if waived(key, "letter-spacing"):
                waived_count += 1
                continue
            line = text.count("\n", 0, match.start()) + 1
            errors.append(f"{key}:{line} 字距不为零（纲领 8.2）：{value}")
        for match in RADIUS.finditer(text):
            value = match.group(1).strip()
            if RADIUS_ALLOWED.fullmatch(value):
                continue
            if waived(key, "radius"):
                waived_count += 1
                continue
            line = text.count("\n", 0, match.start()) + 1
            errors.append(f"{key}:{line} 圆角超出克制区间（纲领 12）：{value}")
        if key != "frontend/src/styles/tokens.css":
            for match in MAP_LABEL.finditer(text):
                if any(surface in key.lower() for surface in MAP_SURFACES):
                    continue
                line = text.count("\n", 0, match.start()) + 1
                errors.append(
                    f"{key}:{line} 地图标签尺度用在了非图层界面（纲领 7.6 / 8.2）："
                    f"{match.group(0)}"
                )
    return errors, waived_count


# --------------------------------------------------------------------------
# 字体：纲领 8.1 明确禁止依赖不存在的家族名
# --------------------------------------------------------------------------

# 随工程一起安装、或由系统提供的家族名。
SHIPPED_FONTS = {"Inter Variable", "Noto Sans SC Variable"}
SYSTEM_FONTS = {
    "PingFang SC",
    "Microsoft YaHei UI",
    "Microsoft YaHei",
    "Hiragino Sans GB",
    "Heiti SC",
    "SF Mono",
    "Cascadia Mono",
    "Segoe UI Mono",
    "Liberation Mono",
    "DejaVu Sans Mono",
    "Menlo",
    "Consolas",
}
FONT_FAMILY = re.compile(r"font-family:\s*([^;}]+)")
QUOTED_FAMILY = re.compile(r"[\"']([^\"']+)[\"']")


def check_fonts(files: list[Path]) -> tuple[list[str], int]:
    errors: list[str] = []
    waived_count = 0
    package = (FRONTEND / "package.json").read_text(encoding="utf-8")
    for path in files:
        key = rel(path)
        text = path.read_text(encoding="utf-8")
        for match in FONT_FAMILY.finditer(text):
            for family in QUOTED_FAMILY.findall(match.group(1)):
                if family in SHIPPED_FONTS or family in SYSTEM_FONTS:
                    continue
                if waived(key, "ghost-font"):
                    waived_count += 1
                    continue
                line = text.count("\n", 0, match.start()) + 1
                errors.append(
                    f"{key}:{line} 字体链依赖未安装的家族名（纲领 8.1）：{family}"
                )
    for family in SHIPPED_FONTS:
        slug = family.replace(" Variable", "").replace(" ", "-").lower()
        if f'"@fontsource-variable/{slug}"' not in package:
            errors.append(f"frontend/package.json 未声明随工程安装的字体：{family}")
    return errors, waived_count


# --------------------------------------------------------------------------
# 中文优先：纲领 8.2 / 8.3
# --------------------------------------------------------------------------

EYEBROW = re.compile(r"class=\"eyebrow\"[^>]*>\s*([^<>{]+?)\s*<")
BRAND_DECLARATION = re.compile(
    r"(PRIVATE\s+(?:ACCESS|INDEX|EDITION|CORTEX)|LOCAL\s+FIRST|PERSONAL\s+CORTEX|personal\s+cortex)"
)
# 纯 ASCII 装饰眉题：全大写英文、编号、斜杠组合。
DECORATIVE_EYEBROW = re.compile(r"^[A-Za-z0-9 /·+\-]+$")

# 装饰编号与全大写口号可以出现在任何标签里，不只是 .eyebrow。
# 纲领 8.2 点名的 `01 / NOW` 就藏在一个裸 <span> 中。
# 只匹配"编号 / 全大写"这种明确的装饰形状，不误伤 Axiom、Atlas 这类专名。
DECORATIVE_NODE = re.compile(
    r">\s*(\d{2}\s*/\s*[A-Z][A-Z ]*|[A-Z]{2,}[A-Z ]*(?:\s*/\s*[A-Z0-9][A-Z0-9 +]*)+)\s*<"
)

# 编号也可以由 CSS 伪元素生成，模板扫描看不见。
# AtlasView 的 `content: '03'` 就是这样在标题旁挂了一个装饰序号。
DECORATIVE_CONTENT = re.compile(r"content:\s*['\"](\s*\d{1,2}\s*|[A-Z][A-Z /]+)['\"]")


def check_chinese_first(files: list[Path]) -> list[str]:
    errors: list[str] = []
    for path in files:
        text = path.read_text(encoding="utf-8")
        for match in DECORATIVE_CONTENT.finditer(text):
            line = text.count("\n", 0, match.start()) + 1
            errors.append(
                f"{rel(path)}:{line} 伪元素生成装饰编号（纲领 8.2）：{match.group(0)}"
            )
        if path.suffix != ".vue":
            continue
        for match in BRAND_DECLARATION.finditer(text):
            line = text.count("\n", 0, match.start()) + 1
            errors.append(
                f"{rel(path)}:{line} 入口/导航宣告英文品牌口号（纲领 7.1 / 8.3）："
                f"{match.group(1)}"
            )
        for match in EYEBROW.finditer(text):
            label = match.group(1).strip()
            if not label or not DECORATIVE_EYEBROW.fullmatch(label):
                continue
            line = text.count("\n", 0, match.start()) + 1
            errors.append(
                f"{rel(path)}:{line} 英文装饰眉题（纲领 8.2 / 8.3）：{label}"
            )
        for match in DECORATIVE_NODE.finditer(text):
            line = text.count("\n", 0, match.start()) + 1
            errors.append(
                f"{rel(path)}:{line} 装饰编号或全大写口号（纲领 8.2 / 8.3）："
                f"{match.group(1).strip()}"
            )
    return errors


# --------------------------------------------------------------------------
# 少量真正的基础
# --------------------------------------------------------------------------


def check_foundations() -> list[str]:
    errors: list[str] = []

    tokens_text = TOKENS.read_text(encoding="utf-8")
    if "color-scheme: dark" not in tokens_text:
        errors.append("frontend/src/styles/tokens.css 未声明原生暗色（纲领 9.1）")
    if "color-scheme: light" in tokens_text or "--surface-0: #e" in tokens_text:
        errors.append("frontend/src/styles/tokens.css 回到了浅色底（纲领 1.1 / 9.1）")

    base_text = BASE.read_text(encoding="utf-8")
    if "@media (prefers-reduced-motion: reduce)" not in base_text:
        errors.append("frontend/src/styles/base.css 缺少减少动态偏好支持（纲领 10 / 13）")
    if "letter-spacing: 0" not in base_text:
        errors.append("frontend/src/styles/base.css 未把字距归零（纲领 8.2）")

    main_text = (SRC / "main.ts").read_text(encoding="utf-8")
    for family, module in (
        ("Inter Variable", "@fontsource-variable/inter"),
        ("Noto Sans SC Variable", "@fontsource-variable/noto-sans-sc"),
    ):
        if module not in main_text:
            errors.append(f"frontend/src/main.ts 未加载 {family}")

    notices = FRONTEND / "THIRD_PARTY_NOTICES.md"
    licenses = (
        FRONTEND / "licenses" / "Inter-OFL-1.1.txt",
        FRONTEND / "licenses" / "NotoSansSC-OFL-1.1.txt",
    )
    if not notices.exists():
        errors.append("frontend/THIRD_PARTY_NOTICES.md 缺失：字体授权必须可追溯")
    for license_file in licenses:
        if not license_file.exists():
            errors.append(f"{rel(license_file)} 缺失：字体授权必须可追溯")

    direction = ROOT / "docs" / "FRONTEND_ART_DIRECTION.md"
    if not direction.exists():
        errors.append("docs/FRONTEND_ART_DIRECTION.md 缺失：美学纲领是这份检查的依据")

    return errors


# --------------------------------------------------------------------------
# 产品边界：火山杯竞赛项目不回到 Axiom 日常界面
# --------------------------------------------------------------------------


def check_product_boundary() -> list[str]:
    errors: list[str] = []
    recent = SRC / "views" / "RecentView.vue"
    if not recent.exists():
        return errors
    text = recent.read_text(encoding="utf-8")
    for fragment in ("Learning Board", "学习白板", "listLearningBoards"):
        if fragment in text:
            errors.append(f"竞赛项目界面回到了 Axiom 日常视图：{fragment}")
    return errors


def main() -> int:
    files = surfaces()
    errors: list[str] = []
    errors.extend(check_contrast(read_tokens()))

    material_errors, material_waived = check_material(files)
    errors.extend(material_errors)

    font_errors, font_waived = check_fonts(files)
    errors.extend(font_errors)

    errors.extend(check_chinese_first(files))
    errors.extend(check_foundations())
    errors.extend(check_product_boundary())

    waived_total = material_waived + font_waived
    debt = f"，{waived_total} 处已登记例外待清理" if waived_total else ""

    if errors:
        print(f"Axiom frontend art-direction guard failed（{len(errors)} 项{debt}）")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        f"Axiom frontend art-direction guard passed"
        f"（已按原则检查 {len(files)} 个界面文件{debt}）"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
