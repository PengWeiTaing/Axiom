"""Guard frontend code against importing the compatibility API barrel.

New frontend code should import domain modules from ``frontend/src/api/*.ts``
directly. ``api/endpoints.ts`` remains only as a compatibility re-export for
older code or external references.
"""

from __future__ import annotations

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FRONTEND_SRC = ROOT / "frontend" / "src"
FORBIDDEN = "@/api/endpoints"
SKIP = {FRONTEND_SRC / "api" / "endpoints.ts"}


def iter_source_files() -> list[Path]:
    suffixes = {".ts", ".vue"}
    return [
        path
        for path in FRONTEND_SRC.rglob("*")
        if path.is_file() and path.suffix in suffixes and path not in SKIP
    ]


def main() -> int:
    violations: list[tuple[Path, int, str]] = []
    for path in iter_source_files():
        for line_no, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            if FORBIDDEN in line:
                violations.append((path, line_no, line.strip()))

    if not violations:
        print("frontend API import guard passed")
        return 0

    print("frontend API import guard failed: import domain modules instead of @/api/endpoints")
    for path, line_no, line in violations:
        rel = path.relative_to(ROOT)
        print(f"{rel}:{line_no}: {line}")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
