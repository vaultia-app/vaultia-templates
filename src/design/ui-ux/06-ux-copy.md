# UX Copy

| Field | Value |
|---|---|
| Status | Draft |
| Version | v0.1 |
| Owner | <name or role> |

## 1. Voice and tone

| Situation | Tone | Example |
|---|---|---|
| Default | <clear, friendly, brief> | <…> |
| Errors | <calm, specific, says how to fix> | <…> |
| Success | <short, no exclamation marks> | <…> |
| Destructive actions | <direct, names the consequence> | <…> |

## 2. Writing rules

- <Sentence case for headings and buttons.>
- <Buttons say the action: "Save changes", not "OK".>
- <Address the user as "you".>
- <Numbers, dates, and currency follow the user's locale.>

## 3. Terminology

Use the terms from `docs/00-overview/02-glossary.md`. List only UI wording choices here.

| Use | Don't use | Notes |
|---|---|---|
| <Workspace> | <Team, Org> | <…> |

## 4. System messages

| ID | Type | Trigger | Text | Shown on | Requirement |
|---|---|---|---|---|---|
| MSG-001 | <Error / Warning / Success / Info / Empty / Confirm> | <when it appears> | "<exact text>" | <S02, inline under field> | <F04/AC-1.2> |
