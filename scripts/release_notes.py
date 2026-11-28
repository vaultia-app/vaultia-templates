#!/usr/bin/env python3
"""Check release metadata and print the corresponding changelog section."""
import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("version", nargs="?")
    group.add_argument("--check-tag")
    args = parser.parse_args()
    tag = args.check_tag or args.version
    version = tag.removeprefix("v")
    if not re.fullmatch(r"(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)", version):
        parser.error("expected a stable semantic version")
    changelog = (ROOT / "CHANGELOG.md").read_text(encoding="utf-8")
    match = re.search(rf"^## \[{re.escape(version)}\][^\n]*\n(.*?)(?=^## |\Z)", changelog, re.M | re.S)
    if not match or not match.group(1).strip():
        parser.error(f"missing changelog section for {version}")
    if args.check_tag:
        project = (ROOT / "pyproject.toml").read_text(encoding="utf-8")
        current = re.search(r'^version\s*=\s*"([^"]+)"', project, re.M)
        if tag != f"v{version}" or not current or current.group(1) != version:
            parser.error("tag must match the project version")
        print(f"ok: {tag} matches pyproject.toml and CHANGELOG.md")
    else:
        print(match.group(1).strip())


if __name__ == "__main__":
    main()
