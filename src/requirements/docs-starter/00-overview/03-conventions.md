# Conventions

## IDs

| Prefix | Meaning | Scope | Lives in | Example |
|---|---|---|---|---|
| `F` | Feature | Global | [Feature list](../02-requirements/01-feature-list.md) | `F01` |
| `G` | Product goal | Global | [Introduction](01-introduction.md) | `G-1` |
| `BR` | Business rule | Global | [Business rules](../01-business/03-business-rules.md) | `BR-001` |
| `NFR` | Product-wide non-functional requirement | Global | [Non-functional requirements](../02-requirements/02-non-functional-requirements.md) | `NFR-001` |
| `W` | Business workflow | Global | [Workflows](../01-business/04-workflows.md) | `W-1` |
| `D` | Decision | Global | [Decisions log](../09-working/decisions-log.md) | `D-001` |
| `Q` | Open question | Global | [Open questions](../09-working/open-questions.md) | `Q-001` |
| `J`, `E`, `FR`, `AC`, `NFR-L`, `M`, `A` | Journey, edge case, functional requirement, acceptance criterion, feature-only NFR, metric, assumption | Local to one feature spec | `03-functional-specs/Fxx-<slug>.md` | `FR-2`, `AC-2.1`, `NFR-L1` |

- **IDs are never renumbered or reused.** A removed item keeps its ID with status `Deprecated`. A duplicate gets a new ID, and the file notes "formerly Fxx".
- **Local IDs** restart in each feature spec. Outside that spec, qualify them with the feature: `F04/AC-2.1`.
- `AC-<n>.<m>` belongs to `FR-<n>` of the same spec.

## File names

- Folders and files: two-digit order prefix plus `kebab-case`, in English: `01-business/02-domain-model.md`.
- Files in `09-working/` have no order prefix, because they are living logs rather than chapters: `open-questions.md`, `decisions-log.md`.
- Feature specs: `03-functional-specs/F<nn>-<slug>.md`, for example `F04-members.md`.
- Dated notes: `09-working/meetings/YYYY-MM-DD-<topic>.md`.

## Statuses

| Applies to | Values |
|---|---|
| Documents | Draft → In review → Approved; `Deprecated` when replaced |
| Features | Proposed → Planned → In progress → Done; `Deprecated` when dropped |
| Open questions | Open → Answered (with the `D-xxx` that settled it); `Deferred` |

## Versions

Each document carries a version: `v0.1`, `v0.2`, … while it is being shaped; `v1.0` when the owner approves it. Every substantive change bumps the version and adds a row to the document's change log.

## Markers

- ✅ confirmed by the owner · 🟡 proposed or assumed · `TBD` unknown. Never fill an unknown with invented detail.
- Priorities use MoSCoW: **Must**, **Should**, **Could**, **Won't** (this release).

## Language

Content is written in <language>. File names, folder names, and IDs stay in English.
