"""CLI wrapper — 供 automation_jobs 调用."""
import sys
import os
import json

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from core._common import init_app_storage
from core.routes.cosmos_associations import generate_associations

init_app_storage()
result = generate_associations(max_candidates=100)
print(json.dumps(result, ensure_ascii=False, indent=2))
