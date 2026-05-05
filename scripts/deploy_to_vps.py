from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import tempfile
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath
from shlex import quote


REPO_ROOT = Path(__file__).resolve().parents[1]
RUNTIME_EXCLUDES = [
    ".env",
    ".venv",
    "db",
    "data",
    "backup",
    "logs",
    "__pycache__",
]


@dataclass
class DeployPlan:
    host: str
    root: str
    service: str
    commit_ref: str
    allow_dirty: bool


def run_command(
    command: list[str],
    *,
    cwd: Path | None = None,
    capture_output: bool = False,
    input_text: str | None = None,
    echo_command: bool = True,
) -> subprocess.CompletedProcess[str]:
    if echo_command:
        print(f"$ {' '.join(command)}")
    return subprocess.run(
        command,
        cwd=str(cwd) if cwd else None,
        check=True,
        text=True,
        capture_output=capture_output,
        input=input_text,
    )


def ensure_tool(name: str) -> None:
    if shutil.which(name):
        return
    raise SystemExit(f"missing required tool: {name}")


def ensure_clean_worktree(allow_dirty: bool) -> None:
    status = run_command(
        ["git", "status", "--porcelain"],
        cwd=REPO_ROOT,
        capture_output=True,
    ).stdout.strip()
    if status and not allow_dirty:
        raise SystemExit(
            "working tree is not clean; commit your changes first or rerun with --allow-dirty"
        )


def read_head_ref(commit_ref: str) -> tuple[str, str]:
    full_sha = run_command(
        ["git", "rev-parse", commit_ref],
        cwd=REPO_ROOT,
        capture_output=True,
    ).stdout.strip()
    short_sha = run_command(
        ["git", "rev-parse", "--short", commit_ref],
        cwd=REPO_ROOT,
        capture_output=True,
    ).stdout.strip()
    return full_sha, short_sha


def create_release_archive(commit_ref: str, archive_path: Path) -> None:
    print(f"$ git archive --format=tar.gz {commit_ref} > {archive_path}")
    with archive_path.open("wb") as file_handle:
        subprocess.run(
            ["git", "archive", "--format=tar.gz", commit_ref],
            cwd=str(REPO_ROOT),
            check=True,
            stdout=file_handle,
        )


def run_remote_script(host: str, script: str, *, capture_output: bool = False) -> subprocess.CompletedProcess[str]:
    print("$ ssh", host, "bash -s <<'EOF'")
    print(script.rstrip())
    print("EOF")
    return run_command(
        ["ssh", host, "bash", "-s"],
        capture_output=capture_output,
        input_text=script,
        echo_command=False,
    )


def upload_archive(host: str, local_path: Path, remote_path: str) -> None:
    run_command(["scp", str(local_path), f"{host}:{remote_path}"])


def build_exclude_flags() -> str:
    return " ".join(f"--exclude={quote(name)}" for name in RUNTIME_EXCLUDES)


def backup_remote_code(host: str, root: str, backup_path: str) -> None:
    backup_dir = str(PurePosixPath(backup_path).parent)
    script = f"""
set -euo pipefail
mkdir -p {quote(backup_dir)}
tar -czf {quote(backup_path)} {build_exclude_flags()} -C {quote(root)} .
"""
    run_remote_script(host, script)


def extract_remote_archive(host: str, remote_archive_path: str, remote_release_dir: str) -> None:
    script = f"""
set -euo pipefail
rm -rf {quote(remote_release_dir)}
mkdir -p {quote(remote_release_dir)}
tar -xzf {quote(remote_archive_path)} -C {quote(remote_release_dir)}
"""
    run_remote_script(host, script)


def sync_remote_release(host: str, remote_release_dir: str, root: str) -> None:
    exclude_flags = " ".join(f"--exclude={quote(name)}/" for name in RUNTIME_EXCLUDES if name != ".env")
    script = f"""
set -euo pipefail
command -v rsync >/dev/null 2>&1
rsync -a --delete --exclude='.env' {exclude_flags} {quote(remote_release_dir)}/ {quote(root)}/
"""
    run_remote_script(host, script)


def install_requirements_and_restart(host: str, root: str, service: str) -> None:
    script = f"""
set -euo pipefail
{quote(root)}/.venv/bin/pip install -r {quote(root)}/requirements.txt
systemctl restart {quote(service)}
"""
    run_remote_script(host, script)


def validate_remote_runtime(host: str, root: str) -> None:
    script = f"""
set -euo pipefail
curl -fsS http://127.0.0.1:5000/health
python3 {quote(root)}/scripts/check_consistency.py --root {quote(root)}
"""
    run_remote_script(host, script)


def cleanup_remote_temp(host: str, remote_archive_path: str, remote_release_dir: str) -> None:
    script = f"""
set -euo pipefail
rm -rf {quote(remote_archive_path)} {quote(remote_release_dir)}
"""
    run_remote_script(host, script)


def parse_args() -> DeployPlan:
    parser = argparse.ArgumentParser(
        description="Deploy the current tracked Axiom code snapshot to the VPS root."
    )
    parser.add_argument("--host", default="157.245.159.152", help="SSH host or alias.")
    parser.add_argument("--root", default="/opt/axiom", help="Deploy root on the VPS.")
    parser.add_argument("--service", default="axiom-receiver", help="systemd service name.")
    parser.add_argument("--commit-ref", default="HEAD", help="Git ref to archive and deploy.")
    parser.add_argument(
        "--allow-dirty",
        action="store_true",
        help="Allow deploying HEAD even when the worktree still has uncommitted changes.",
    )
    args = parser.parse_args()
    return DeployPlan(
        host=args.host,
        root=args.root,
        service=args.service,
        commit_ref=args.commit_ref,
        allow_dirty=args.allow_dirty,
    )


def main() -> None:
    ensure_tool("git")
    ensure_tool("ssh")
    ensure_tool("scp")

    plan = parse_args()
    ensure_clean_worktree(plan.allow_dirty)
    full_sha, short_sha = read_head_ref(plan.commit_ref)
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")

    release_name = f"axiom_release_{timestamp}_{short_sha}"
    backup_path = f"{plan.root}/backup/code/axiom_code_backup_{timestamp}_{short_sha}.tar.gz"
    remote_archive_path = f"/tmp/{release_name}.tar.gz"
    remote_release_dir = f"/tmp/{release_name}"

    with tempfile.TemporaryDirectory(prefix="axiom_deploy_") as temp_dir:
        local_archive_path = Path(temp_dir) / f"{release_name}.tar.gz"
        create_release_archive(plan.commit_ref, local_archive_path)
        backup_remote_code(plan.host, plan.root, backup_path)
        upload_archive(plan.host, local_archive_path, remote_archive_path)
        try:
            extract_remote_archive(plan.host, remote_archive_path, remote_release_dir)
            sync_remote_release(plan.host, remote_release_dir, plan.root)
            install_requirements_and_restart(plan.host, plan.root, plan.service)
            validate_remote_runtime(plan.host, plan.root)
        finally:
            cleanup_remote_temp(plan.host, remote_archive_path, remote_release_dir)

    print("")
    print("deploy completed")
    print(f"commit: {full_sha}")
    print(f"backup: {backup_path}")
    print(f"root: {plan.root}")
    print(f"service: {plan.service}")


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as exc:
        print("")
        print(f"command failed with exit code {exc.returncode}", file=sys.stderr)
        raise SystemExit(exc.returncode) from exc
