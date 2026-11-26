# Agent Instructions

This repository is the single source of the document templates used by Vaultia skills. Installed skills of every version read it live from `main`.

- Follow the compatibility rules in `README.md`: never move or rename `manifest.json`, a template ID, or a file a skill names by path. Breaking changes go under a new template ID.
- Every file in a template folder must be listed in `manifest.json`.
- Template content is written in English; skills translate it for the user.
- After any change, run `python3 scripts/validate.py`.
- Scripts use the Python standard library only.
