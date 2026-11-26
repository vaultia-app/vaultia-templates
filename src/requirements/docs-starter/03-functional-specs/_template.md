# F<nn> — <Feature name>

| Field | Value |
|---|---|
| Status | Draft / In review / Approved / Deprecated |
| Version | v0.1 |
| Priority | Must / Should / Could |
| Release | <MVP / release name> |
| Owner | <name or role> |
| Last updated | <YYYY-MM-DD> |
| Related | <D-xxx, Q-xxx, designs, tickets> |

## 1. Summary

<Two to four sentences: what this feature does, for whom, and why.>

## 2. Problem and goals

- **Problem:** <in the users' terms>
- **Evidence:** <data or quotes; mark as an assumption if none>
- **Contributes to:** <G-1>
- **Feature goals:** <outcomes, not outputs>
- **Non-goals:** <what this feature deliberately leaves out>

## 3. Users

| Actor | Need in this feature |
|---|---|
| <Actor from 01-business/01-actors-and-permissions.md> | <need> |

## 4. User journeys

### J-1: <Journey name>

1. <Trigger / starting point>
2. <Step>
3. <Outcome the user achieves>

**Edge cases**
- E-1: <unusual or failure situation> → AC-<n.m>

## 5. Business objects and rules

- **Objects:** <objects from 01-business/02-domain-model.md this feature creates or changes>
- **Rules:** <BR-xxx: one-line summary>. Full rules and worked examples live in `01-business/03-business-rules.md`.

## 6. Functional requirements

| ID | Requirement | Priority | Journey |
|---|---|---|---|
| FR-1 | The system shall <behavior>. | Must | J-1 |

## 7. Acceptance criteria

### FR-1: <short name>
- AC-1.1: Given <context>, when <action>, then <observable result>.

## 8. Non-functional requirements (this feature)

| ID | Category | Requirement |
|---|---|---|
| NFR-L1 | <category> | <measurable expectation that applies to this feature only> |

Product-wide requirements that also apply: <NFR-001, …>

## 9. Success metrics

| ID | Metric | Baseline | Target | Measurement |
|---|---|---|---|---|
| M-1 | <metric> | <value or "unknown"> | <target and timeframe> | <events or data source> |

## 10. Release

- **Rollout:** <phases, feature flag, beta cohort>
- **Kill switch / rollback:** <how to disable or revert>
- **Dependencies:** <teams, systems, vendors, other features>

## 11. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| <risk> | Low / Med / High | Low / Med / High | <mitigation> |

## 12. Assumptions, defaults, and open items

### Assumptions
- A-1: <assumption> — <how to validate>

### Defaults (review anytime)
| Item | Default | Reason |
|---|---|---|
| <item> | <value> | <one line> |

### Decisions and open questions
- Decided: <D-xxx: one-line summary> (full entries in `09-working/decisions-log.md`)
- Open: <Q-xxx: one-line summary> (full entries in `09-working/open-questions.md`)

## Change log

| Version | Date | Changes |
|---|---|---|
| v0.1 | <YYYY-MM-DD> | Initial proposal |
