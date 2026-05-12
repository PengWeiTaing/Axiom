"""模块自动发现 — 扫描 modules/ 目录，找到所有 AxiomModule 实例。"""

import importlib.util
import sqlite3
import sys
from pathlib import Path

from modules.base import AxiomModule


_MODULES: list[AxiomModule] | None = None
_MODULE_DIRS: dict[str, Path] = {}


def _get_module_db_path() -> Path:
    import os
    root = Path(os.environ.get("AXIOM_ROOT", "/opt/axiom"))
    return root / "db" / "axiom.db"


def _is_module_enabled(name: str) -> bool:
    db_path = _get_module_db_path()
    if not db_path.exists():
        return True  # no DB yet, enable all
    conn = sqlite3.connect(str(db_path))
    try:
        row = conn.execute("SELECT enabled FROM module_state WHERE name = ?", (name,)).fetchone()
        if row is None:
            # Auto-register new modules as enabled
            conn.execute("INSERT OR IGNORE INTO module_state (name, enabled) VALUES (?, 1)", (name,))
            conn.commit()
            return True
        return bool(row[0])
    finally:
        conn.close()


def get_all_modules_status() -> list[dict]:
    """返回所有模块的状态（包括未加载的）用于管理界面。"""
    modules_dir = Path(__file__).parent
    result = []
    for entry in sorted(modules_dir.iterdir()):
        if not entry.is_dir() or entry.name.startswith("_") or entry.name.startswith("."):
            continue
        init_file = entry / "__init__.py"
        if not init_file.exists():
            continue
        # Try to get module metadata without full import
        name = entry.name
        try:
            spec = importlib.util.spec_from_file_location(f"modules.{name}", init_file)
            if spec and spec.loader:
                mod = importlib.util.module_from_spec(spec)
                sys.modules[f"modules.{name}"] = mod
                spec.loader.exec_module(mod)
                if hasattr(mod, "module") and isinstance(mod.module, AxiomModule):
                    m = mod.module
                    enabled = _is_module_enabled(m.name)
                    result.append({"name": m.name, "label": m.label, "description": m.description, "enabled": enabled})
                    continue
        except Exception:
            pass
        result.append({"name": name, "label": name, "description": "", "enabled": False})
    return result


def set_module_enabled(name: str, enabled: bool) -> bool:
    db_path = _get_module_db_path()
    conn = sqlite3.connect(str(db_path))
    try:
        conn.execute("INSERT OR REPLACE INTO module_state (name, enabled) VALUES (?, ?)", (name, int(enabled)))
        conn.commit()
        return True
    finally:
        conn.close()


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
            # Check module_state: only load enabled modules
            mod_name = mod.module.name
            enabled = _is_module_enabled(mod_name)
            if enabled:
                _MODULES.append(mod.module)
                _MODULE_DIRS[mod_name] = entry
            else:
                # Still register the module dir for management UI discovery
                _MODULE_DIRS[mod_name] = entry

    return _MODULES


def get_module_dir(module_name: str) -> Path | None:
    return _MODULE_DIRS.get(module_name)

