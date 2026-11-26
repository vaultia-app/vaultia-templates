#!/usr/bin/env python3
"""Validate manifest.json against the template folders.

Checks:
  * manifest.json is valid JSON with a supported schema.
  * Every template ID is a lowercase kebab-case path and its folder src/<id>/ exists.
  * Every listed file exists, and no file inside a template folder is left unlisted.
  * Relative Markdown links inside each template resolve.

Standard library only. Exit code 1 on any error.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SUPPORTED_SCHEMAS = {1}
ID_PATTERN = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*(/[a-z0-9]+(-[a-z0-9]+)*)+$")
LINK = re.compile(r"\]\(([^)\s]+)\)")
FENCE = re.compile(r"```.*?```", re.S)


def validate(root: Path = ROOT) -> list[str]:
    errors: list[str] = []
    manifest_path = root / "manifest.json"
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        return [f"manifest.json: {exc}"]

    if manifest.get("schema") not in SUPPORTED_SCHEMAS:
        errors.append(f"manifest.json: schema must be one of {sorted(SUPPORTED_SCHEMAS)}")
    templates = manifest.get("templates")
    if not isinstance(templates, dict) or not templates:
        return errors + ["manifest.json: templates must be a non-empty object"]

    for template_id, entry in templates.items():
        where = f"manifest.json: {template_id}"
        if not ID_PATTERN.match(template_id):
            errors.append(f"{where}: ID must be lowercase kebab-case segments like 'requirements/docs-starter'")
        folder = root / "src" / template_id
        if not folder.is_dir():
            errors.append(f"{where}: folder src/{template_id}/ does not exist")
            continue
        if not isinstance(entry, dict):
            errors.append(f"{where}: entry must be an object")
            continue
        for field in ("description", "files"):
            if not entry.get(field):
                errors.append(f"{where}: missing '{field}'")
        if not isinstance(entry.get("used_by"), list):
            errors.append(f"{where}: 'used_by' must be a list of skill names (empty until a skill uses it)")
        files = entry.get("files") or []
        if len(files) != len(set(files)):
            errors.append(f"{where}: duplicate entries in files")
        for rel in files:
            if rel.startswith("/") or ".." in Path(rel).parts:
                errors.append(f"{where}: invalid file path {rel!r}")
            elif not (folder / rel).is_file():
                errors.append(f"{where}: listed file {rel} does not exist")
        actual = {str(p.relative_to(folder)) for p in folder.rglob("*") if p.is_file() and p.name != ".DS_Store"}
        for rel in sorted(actual - set(files)):
            errors.append(f"{where}: {rel} exists but is not listed in files")
        for doc in folder.rglob("*.md"):
            text = FENCE.sub("", doc.read_text(encoding="utf-8"))
            for target in LINK.findall(text):
                if "://" in target or target.startswith(("#", "mailto:")) or "<" in target:
                    continue
                if not (doc.parent / target.split("#")[0]).exists():
                    errors.append(f"{doc.relative_to(root)}: broken link {target}")
    return errors


def main() -> int:
    errors = validate()
    for error in errors:
        print(f"ERROR {error}")
    if errors:
        return 1
    print("manifest.json and templates are valid")
    return 0


if __name__ == "__main__":
    sys.exit(main())
