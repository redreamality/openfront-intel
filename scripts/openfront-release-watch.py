"""Read-only Release scout for the Hermes schedule; writes only its cache."""

import argparse
import base64
import json
import os
import re
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path

DEFAULT_REPO = Path(r"C:\Users\Remy\PARA\00_Inbox\00.2_Sandbox\openfront-intel")
DEFAULT_CACHE = Path(r"C:\Users\Remy\.codex\automations\openfront\cache")


def github(endpoint):
    for attempt in range(2):
        try:
            result = subprocess.run(
                ["gh", "api", "-X", "GET", endpoint],
                capture_output=True, text=True, encoding="utf-8", timeout=30,
                creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0),
            )
            if result.returncode:
                raise RuntimeError(result.stderr.strip() or "GitHub GET failed")
            return json.loads(result.stdout)
        except (OSError, RuntimeError, subprocess.TimeoutExpired, json.JSONDecodeError):
            if attempt:
                raise


def latest_formal_release(releases):
    formal = [
        release for release in releases
        if not release.get("draft") and not release.get("prerelease")
        and re.fullmatch(r"v0\.\d+\.\d+", release.get("tag_name", ""))
        and release.get("name", "").strip().upper() != "TEST"
        and release.get("body", "").strip().upper() != "TEST"
        and release.get("published_at")
    ]
    if not formal:
        raise ValueError("No verifiable formal non-TEST Release; status is unknown")
    return max(formal, key=lambda release: release["published_at"])


def run_watch(repo, cache, site_repo):
    release = latest_formal_release(github("repos/openfrontio/OpenFrontIO/releases?per_page=10"))
    upstream = github("repos/openfrontio/OpenFrontIO/commits/main")
    site_file = github(f"repos/{site_repo}/contents/src/config/openfront-release.ts?ref=main")
    site_source = base64.b64decode(site_file["content"], validate=False).decode("utf-8")
    site_match = re.search(r"latestOpenFrontRelease\s*=\s*defineOpenFrontRelease\(['\"](v0\.\d+\.\d+)['\"]\)", site_source)
    if not site_match or not re.fullmatch(r"[0-9a-f]{40}", upstream["sha"]):
        raise ValueError("Invalid site version or upstream main cursor; status is unknown")
    status = subprocess.run(
        ["git", "-C", str(repo), "status", "--porcelain=v1", "--untracked-files=all"],
        capture_output=True, text=True, encoding="utf-8", timeout=15,
        env={**os.environ, "GIT_OPTIONAL_LOCKS": "0"},
        creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0),
    )
    if status.returncode:
        raise RuntimeError(status.stderr.strip() or "Cannot inspect source workspace")
    report = {
        "checkedAt": datetime.now(timezone.utc).isoformat(),
        "releaseTag": release["tag_name"],
        "releasePublishedAt": release["published_at"],
        "releaseUrl": release.get("html_url"),
        "upstreamMain": upstream["sha"],
        "siteTag": site_match[1],
        "siteVersionSource": f"github:{site_repo}@main:src/config/openfront-release.ts",
        "needsContentUpdate": release["tag_name"] != site_match[1],
        "sourceDirty": bool(status.stdout.strip()),
        "mode": "read-only; no model, edits, fetch, commits, push or merge",
    }
    cache.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", dir=cache, delete=False) as handle:
        json.dump(report, handle, ensure_ascii=False, indent=2)
        handle.write("\n")
        temporary = handle.name
    os.replace(temporary, cache / "release-watch.json")
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, default=DEFAULT_REPO)
    parser.add_argument("--cache", type=Path, default=DEFAULT_CACHE)
    parser.add_argument("--site-repo", default="redreamality/openfront-intel")
    args = parser.parse_args()
    previous_path = args.cache / "release-watch.json"
    previous = json.loads(previous_path.read_text(encoding="utf-8")) if previous_path.exists() else {}
    try:
        report = run_watch(args.repo, args.cache, args.site_repo)
    except Exception as error:
        parser.exit(1, f"FAILED_INFRA: release monitoring unknown; last valid cache retained: {error}\n")
    if all(previous.get(key) == report[key] for key in ("releaseTag", "siteTag")):
        print("[SILENT]")
    else:
        print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
