from __future__ import annotations

import subprocess
import sys
from pathlib import Path


def run_command(command: list[str]) -> bool:
    try:
        completed = subprocess.run(command, check=False)
    except FileNotFoundError:
        return False
    return completed.returncode == 0


def main() -> None:
    python_executable = Path(sys.executable).resolve()
    base_dir = python_executable.parent
    candidate_commands = [
        [str(python_executable), "-m", "playwright", "install", "chromium"],
        [str(base_dir / "Scripts" / "playwright.exe"), "install", "chromium"],
        [str(base_dir / "playwright"), "install", "chromium"],
    ]

    for command in candidate_commands:
        if run_command(command):
            print("playwright chromium install passed")
            print("command:", " ".join(command))
            return

    raise SystemExit(
        "无法安装 Playwright Chromium。请先确认 requirements-dev.txt 已安装，"
        "然后检查当前 Python 环境的 Scripts 目录。"
    )


if __name__ == "__main__":
    main()
