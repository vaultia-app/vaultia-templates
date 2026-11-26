# Non-Functional Requirements

Product-wide expectations the business cares about, stated so they can be measured. Requirements that apply to one feature only live in that feature's spec. The architecture documents turn these into technical targets (SLOs) and the design that meets them.

✅ confirmed · 🟡 proposed default · `TBD` unknown · `N/A` with a reason when a category does not apply.

## Requirements

Write each requirement as users notice it, not as a technical metric.

| ID | Category | Requirement | Applies to | Status |
|---|---|---|---|---|
| NFR-001 | Performance | <for example "search results appear within 2 seconds for an account with up to 500 items"> | All features | 🟡 |
| NFR-002 | Availability | <when the product must be usable, for example "business hours, Monday to Saturday" or "24/7"> | All features | 🟡 |
| NFR-003 | Security and privacy | <personal data held, who may see it, retention and deletion> | All features | 🟡 |
| NFR-004 | Accessibility | <standard, for example WCAG 2.2 AA> | All features | 🟡 |
| NFR-005 | Localization | <languages, currency, time zone, formats> | All features | 🟡 |
| NFR-006 | Compliance | <regulations that apply, or "none known"> | All features | 🟡 |
| NFR-007 | Data recovery | <how much recent data the business can afford to lose, and how long it can wait to get it back> | All features | 🟡 |

Add other categories when they matter: supported devices and browsers, scale (users, records, growth), audit trail, data residency.

## Service commitments (SLA)

What the product promises its customers. Fill this in when the product is sold with a service promise; otherwise write "No SLA: <reason>".

| Commitment | Target | Measured over | If missed |
|---|---|---|---|
| Uptime | <for example 99.5% per month, excluding announced maintenance> | Calendar month | <service credit, or none> |
| Support response | <for example first response within 4 business hours for critical issues> | Per ticket | <escalation> |
| Maintenance window | <when planned downtime may happen, and how far ahead it is announced> | — | — |
| Data recovery | <for example data restored to no more than 24 hours old, within 8 hours> | Per incident | <service credit, or none> |
