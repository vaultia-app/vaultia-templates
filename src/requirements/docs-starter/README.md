# <Product name> — Product Documentation

| Field | Value |
|---|---|
| Status | Draft |
| Owner | <name or role> |
| Last updated | <YYYY-MM-DD> |

<One or two sentences: what the product is and who it is for.>

## How to read

1. [Introduction](00-overview/01-introduction.md): what we build, why, and what is out of scope.
2. [Actors and permissions](01-business/01-actors-and-permissions.md) and [domain model](01-business/02-domain-model.md): who uses the product and the business objects every feature shares.
3. [Feature list](02-requirements/01-feature-list.md): every feature with its priority and status. Each row links to its spec.
4. [Open questions](09-working/open-questions.md) and [decisions log](09-working/decisions-log.md): what is still undecided and what was decided recently.

IDs, statuses, and file names follow the [conventions](00-overview/03-conventions.md).

## Map

| Folder | Contains | Written by |
|---|---|---|
| `00-overview/` | Introduction, glossary, conventions | Product |
| `01-business/` | Actors and permissions, domain model, business rules, workflows | Product |
| `02-requirements/` | Feature list, product-wide non-functional requirements | Product |
| `03-functional-specs/` | One file per feature: `Fxx-<slug>.md` | Product |
| `04-ui/` | Screen map, system messages, mockups (added when needed) | Product / design |
| `05-architecture/` | System design, data model, ADRs (added when needed) | Engineering |
| `06-testing/` | Test strategy, UAT scenarios per feature (added when needed) | QA |
| `07-roadmap/` | Roadmap and release plan (added when needed) | Product |
| `09-working/` | Open questions, decisions log, meetings, change requests | Everyone |
