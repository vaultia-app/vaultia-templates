#!/usr/bin/env python3
"""Package manifest-listed templates into deterministic ZIP archives."""
import hashlib
import json
from pathlib import Path, PurePosixPath
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "release-assets"


def safe_path(value):
    path = PurePosixPath(value)
    if not path.parts or path.is_absolute() or '..' in path.parts or '\\' in value or ':' in value:
        raise ValueError(f"unsafe manifest path: {value}")
    return path


def write_zip(target, entries):
    with ZipFile(target, "w") as archive:
        for name, source in sorted(entries):
            info = ZipInfo(name, (1980, 1, 1, 0, 0, 0))
            info.compress_type = ZIP_DEFLATED
            info.create_system = 3
            info.external_attr = (0o100644 << 16)
            archive.writestr(info, source.read_bytes())


def main():
    manifest = ROOT / "manifest.json"
    templates = json.loads(manifest.read_text(encoding="utf-8"))["templates"]
    if not templates:
        raise ValueError("no templates to package")
    OUT.mkdir(exist_ok=True)
    combined = [("manifest.json", manifest)]
    names = {"vaultia-templates.zip", "checksums.sha256"}
    assets = []
    for template_id, spec in sorted(templates.items()):
        template = safe_path(template_id)
        name = f"{template.name}.zip"
        if name in names:
            raise ValueError(f"duplicate asset name: {name}")
        names.add(name)
        entries = []
        for filename in spec["files"]:
            relative = safe_path(filename)
            source = ROOT / "src" / template / relative
            if not source.is_file() or not source.resolve().is_relative_to((ROOT / "src" / template).resolve()):
                raise ValueError(f"invalid source: {source}")
            entries.append((relative.as_posix(), source))
            combined.append(((PurePosixPath("src") / template / relative).as_posix(), source))
        asset = OUT / name
        write_zip(asset, entries)
        assets.append(asset)
    full = OUT / "vaultia-templates.zip"
    write_zip(full, combined)
    assets.append(full)
    (OUT / "checksums.sha256").write_text("".join(
        f"{hashlib.sha256(asset.read_bytes()).hexdigest()}  {asset.name}\n"
        for asset in sorted(assets)), encoding="utf-8")


if __name__ == "__main__":
    main()
