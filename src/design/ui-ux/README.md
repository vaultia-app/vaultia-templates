# <Product name> — UI/UX

| Field | Value |
|---|---|
| Status | Draft |
| Owner | <name or role> |
| Last updated | <YYYY-MM-DD> |

UI/UX design documentation for <product name>. It lives in `docs/04-ui/` and builds on the product requirements: it says **how the product looks and behaves** for the features, actors, and journeys defined in `docs/01-business/` and `docs/03-functional-specs/`. It never redefines them; it references them by ID.

## How to read

1. [Design brief](01-design-brief.md): who we design for, the experience goals, principles, and constraints.
2. [Information architecture](02-information-architecture.md) and [screen map](03-screen-map.md): how the product is organized and every screen in it.
3. [User flows](04-user-flows.md): how actors move through screens to complete each journey.
4. [Screens](08-screens/): one file per screen, with layout, states, interactions, and the requirements it covers.
5. [Design system](05-design-system.md), [UX copy](06-ux-copy.md), and [accessibility](07-accessibility.md): the shared rules every screen follows.

## Map

| File | Contains |
|---|---|
| `01-design-brief.md` | Users, experience goals, design principles, platforms, constraints, references |
| `02-information-architecture.md` | Navigation model, sitemap, content hierarchy |
| `03-screen-map.md` | Inventory of every screen (`S`), with the features and actors it serves |
| `04-user-flows.md` | User flows (`UF`) across screens, including error and edge paths |
| `05-design-system.md` | Design tokens, components (`CMP`), patterns, and their states |
| `06-ux-copy.md` | Voice and tone, terminology, system messages (`MSG`) |
| `07-accessibility.md` | Accessibility target and checklist |
| `08-screens/` | One file per screen: `S<nn>-<slug>.md`, created from `_template.md` |

## IDs

UI/UX IDs extend the project's `docs/00-overview/03-conventions.md`; the rules there (never renumber or reuse, statuses, versions, markers) apply here too.

| Prefix | Meaning | Lives in | Example |
|---|---|---|---|
| `UX` | Experience goal | [Design brief](01-design-brief.md) | `UX-1` |
| `S` | Screen (page, modal, or sheet) | [Screen map](03-screen-map.md) | `S04` |
| `UF` | User flow | [User flows](04-user-flows.md) | `UF-2` |
| `CMP` | Design system component | [Design system](05-design-system.md) | `CMP-07` |
| `MSG` | System message (error, warning, success, empty state, confirmation) | [UX copy](06-ux-copy.md) | `MSG-012` |

- Reference requirements by their IDs: `F04`, `F04/J-1`, `F04/FR-2`, `F04/AC-2.1`, `BR-003`.
- Design decisions go to `docs/09-working/decisions-log.md` (`D-xxx`); open design questions go to `docs/09-working/open-questions.md` (`Q-xxx`).
- Screen files: `08-screens/S<nn>-<slug>.md`, for example `08-screens/S04-member-list.md`.
