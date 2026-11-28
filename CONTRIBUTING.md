# Contributing

Create a branch from `main` and open a pull request. Keep template IDs and existing paths backward compatible; see README.md. Update `manifest.json` for any added or removed files. Use English for template content.

## Validation

```bash
python3 scripts/validate.py
cd src/frontend/base-ui-react-kit
bun install
bun run typecheck
bun run theme:check
```

Add changes under `## [Unreleased]` in `CHANGELOG.md`. Maintainers decide release versions.

## Release

Update `pyproject.toml` and move release notes to a matching version heading in `CHANGELOG.md` through a pull request. After merging and checking CI, tag the resulting main commit:

```bash
git switch main
git pull --ff-only
git tag v0.1.0
git push origin v0.1.0
```

Replace the example version for later releases. The release workflow validates the tagged source, packages templates and publishes only after uploading the assets. Skills continue to fetch from `main`.

### Release from GitHub Actions

After merging the version bump into `main` and checking CI, open **Actions → Release → Run workflow**, select `main`, and enter the matching tag (for example `v0.1.0`). The workflow checks the version and templates, builds assets, creates the tag if needed, and publishes the release in the same run. An existing tag pointing to a different commit is rejected. The manual Git tag flow above remains supported.
