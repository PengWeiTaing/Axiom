from __future__ import annotations

import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from core.receiver import DB_PATH, init_db  # noqa: E402


def main() -> None:
    init_db(DB_PATH)
    print(f"database initialized: {DB_PATH}")


if __name__ == "__main__":
    main()
