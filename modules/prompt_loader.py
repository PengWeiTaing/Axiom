"""Prompt 模板加载器 — 从 Markdown 文件加载 prompt，支持 {variable} 替换。"""

from pathlib import Path


class PromptLoader:
    def __init__(self):
        self._prompt_dirs: list[Path] = []
        shared = Path(__file__).parent / "prompts"
        if shared.is_dir():
            self._prompt_dirs.append(shared)

    def register_module(self, module_dir: Path) -> None:
        prompts_dir = module_dir / "prompts"
        if prompts_dir.is_dir():
            self._prompt_dirs.append(prompts_dir)

    def load(self, name: str) -> str:
        """按名称加载 prompt 模板文件。"""
        filename = name if name.endswith(".md") else f"{name}.md"
        for d in self._prompt_dirs:
            candidate = d / filename
            if candidate.exists():
                return candidate.read_text(encoding="utf-8")
        raise FileNotFoundError(f"Prompt not found: {name}")

    def render(self, name: str, **variables) -> str:
        """加载并替换变量。缺失变量替换为 [未提供]。"""
        template = self.load(name)
        return template.format(**variables, _missing_="[未提供]")
