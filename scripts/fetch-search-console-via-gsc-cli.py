#!/usr/bin/env python3
"""Use an existing gsc-cli OAuth token for an exact Search Analytics date range."""

from __future__ import annotations

import argparse
import importlib.util
import json
import os
from pathlib import Path
from urllib.request import getproxies


ROW_LIMIT = 25_000


def normalize_proxy(value: str | None) -> str | None:
    if not value:
        return None
    proxy = value if "://" in value else f"http://{value}"
    return proxy.replace("://localhost:", "://127.0.0.1:")


def configure_proxy() -> None:
    detected = getproxies()
    configured = False
    for scheme in ("http", "https"):
        lower = f"{scheme}_proxy"
        upper = lower.upper()
        proxy = normalize_proxy(os.environ.get(lower) or os.environ.get(upper) or detected.get(scheme))
        if not proxy:
            continue
        os.environ[lower] = proxy
        os.environ[upper] = proxy
        configured = True

    if configured:
        try:
            import socks  # noqa: F401
        except ImportError as error:
            raise RuntimeError(
                "gsc-cli needs PySocks to honor the Windows proxy. Run: "
                "uv pip install --python .venv/Scripts/python.exe PySocks"
            ) from error


def load_gsc_cli(cli_dir: Path):
    cli_script = cli_dir / "gsc_cli.py"
    if not cli_script.is_file():
        raise FileNotFoundError(f"gsc-cli was not found: {cli_script}")
    spec = importlib.util.spec_from_file_location("openfront_gsc_cli", cli_script)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Could not load gsc-cli: {cli_script}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def fetch_rows(service, site: str, start_date: str, end_date: str) -> list[dict]:
    rows: list[dict] = []
    start_row = 0
    while True:
        request = {
            "startDate": start_date,
            "endDate": end_date,
            "dimensions": ["query", "page"],
            "dataState": "final",
            "rowLimit": ROW_LIMIT,
            "startRow": start_row,
        }
        response = service.searchanalytics().query(siteUrl=site, body=request).execute()
        batch = response.get("rows", [])
        rows.extend(batch)
        if len(batch) < ROW_LIMIT:
            return rows
        start_row += ROW_LIMIT


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--gsc-cli-dir", required=True)
    parser.add_argument("--site", required=True)
    parser.add_argument("--start-date", required=True)
    parser.add_argument("--end-date", required=True)
    args = parser.parse_args()

    configure_proxy()
    gsc_cli = load_gsc_cli(Path(args.gsc_cli_dir).resolve())
    service = gsc_cli.get_gsc_service()
    rows = fetch_rows(service, args.site, args.start_date, args.end_date)
    print(json.dumps(rows, ensure_ascii=False))


if __name__ == "__main__":
    main()
