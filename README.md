# Vaultia Templates

The single source of the document templates used by [Vaultia skills](https://github.com/vaultia-app/vaultia-skills).

Skills read these templates **live from `main`** every time they need them, so a change merged here reaches every user and every installed version of the skills. Each skill also bundles a copy, synced from `main` at release time, which it uses only when the live copy cannot be fetched (offline, no web access, or an invalid manifest).

## Templates

| ID | Used by | What it is |
|---|---|---|
| `requirements/docs-starter` | `product-requirements` | Standard `docs/` structure for product requirements: overview, business model, requirements, one file per feature, working notes |
| `design/ui-ux` | Not yet used by a skill | UI/UX docs for `docs/04-ui/`: design brief, information architecture, screen map, user flows, design system, UX copy, accessibility, one file per screen (`S<nn>`), referencing requirement IDs |

Templates live in `src/`; a template's ID is its path inside `src/`. Every template is listed in [`manifest.json`](manifest.json).

## How skills read a template

1. Fetch `https://raw.githubusercontent.com/vaultia-app/vaultia-templates/main/manifest.json`.
2. Check `schema` is a version the skill supports (currently `1`).
3. Find the template by ID in `templates` and fetch each entry of `files` from `https://raw.githubusercontent.com/vaultia-app/vaultia-templates/main/src/<id>/<file>`.
4. If any step fails, use the copy bundled in the skill instead. Never mix files from both sources.

GitHub caches raw files for a few minutes, so a change can take up to about 5 minutes to reach users.

## Compatibility rules

Installed skills of every version read `main`, so changes here must not break older skills.

- **Never move or rename** `manifest.json`, the `src/` folder, a template ID, or a file that a skill names by path (for `requirements/docs-starter`: `00-overview/03-conventions.md`, `03-functional-specs/_template.md`, and the shared files under `01-business/`, `02-requirements/`, and `09-working/`).
- **Adding is safe:** new templates, new files, new sections, better wording, and new optional manifest fields.
- **Removing or changing meaning is breaking:** removing a file or manifest field, changing what an ID prefix or status means, or reordering numbered sections that skills reference.
- For a breaking change, publish the new layout under a new template ID (for example `requirements/docs-starter-v2`) or bump `schema`, keep the old one working, and update the skills to the new one. Remove the old one only after the skills that use it are no longer supported.

## Adding a template

1. Create the folder `src/<area>/<name>/` (for example `src/frontend/component-spec/`), in English, `kebab-case`.
2. Add it to `manifest.json` with `description`, `used_by` (empty until a skill uses it), and the full `files` list.
3. Run `python3 scripts/validate.py`.
4. In `vaultia-skills`, point the skill at the template ID and sync the bundled copy.

## Validation

```bash
python3 scripts/validate.py
```

Checks that the manifest is valid, that every listed file exists, that no file is left unlisted, and that relative links between files resolve. Standard library only.
