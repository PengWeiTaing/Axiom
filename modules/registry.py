"""模块自动发现 — 扫描 modules/ 目录，找到所有 AxiomModule 实例。"""

import importlib.util
import sys
from pathlib import Path

from modules.base import AxiomModule


_MODULES: list[AxiomModule] | None = None
_MODULE_DIRS: dict[str, Path] = {}


def discover_modules() -> list[AxiomModule]:
    global _MODULES
    if _MODULES is not None:
        return _MODULES

    _MODULES = []
    modules_dir = Path(__file__).parent

    for entry in sorted(modules_dir.iterdir()):
        if not entry.is_dir():
            continue
        if entry.name.startswith("_") or entry.name.startswith("."):
            continue

        init_file = entry / "__init__.py"
        if not init_file.exists():
            continue

        module_name = f"modules.{entry.name}"
        if module_name in sys.modules:
            mod = sys.modules[module_name]
        else:
            spec = importlib.util.spec_from_file_location(module_name, init_file)
            if spec is None or spec.loader is None:
                continue
            mod = importlib.util.module_from_spec(spec)
            sys.modules[module_name] = mod
            spec.loader.exec_module(mod)

        if hasattr(mod, "module") and isinstance(mod.module, AxiomModule):
            _MODULES.append(mod.module)
            _MODULE_DIRS[mod.module.name] = entry

    return _MODULES


def get_module_dir(module_name: str) -> Path | None:
    return _MODULE_DIRS.get(module_name)

