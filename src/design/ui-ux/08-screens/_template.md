# S<nn>: <Screen name>

| Field | Value |
|---|---|
| Status | Proposed |
| Version | v0.1 |
| Owner | <name or role> |
| Type | <Page / Modal / Drawer / Sheet> |
| Features | <F04> |
| Actors | <actors who see this screen> |
| Design file | <link or TBD> |

## 1. Purpose

<One or two sentences: what the actor comes here to do.>

## 2. Entry and exit

| Direction | From / to | Trigger |
|---|---|---|
| Entry | <S01> | <clicks "Members" in the sidebar> |
| Exit | <S05> | <saves the form> |

## 3. Layout

<Regions from top to bottom (or a wireframe image or ASCII sketch), with the components each region uses.>

| Region | Content | Components |
|---|---|---|
| Header | <title, primary action> | <CMP-01> |
| Main | <…> | <…> |

## 4. Data shown

| Field | Source object | Format | Notes |
|---|---|---|---|
| <Name> | <Member.name from the domain model> | <text, truncate at 1 line> | <…> |

## 5. States

| State | When | What the actor sees | Message |
|---|---|---|---|
| Loading | <data is being fetched> | <skeleton> | |
| Empty | <no items yet> | <empty state with primary action> | <MSG-xxx> |
| Error | <request fails> | <inline banner with retry> | <MSG-xxx> |
| Partial | <some data missing> | <…> | |
| Success | <normal> | <…> | |
| No permission | <actor lacks access> | <…> | <MSG-xxx> |

## 6. Interactions

| Element | Action | Result | Requirement |
|---|---|---|---|
| <Invite button> | <click> | <opens S06 modal> | <F04/FR-1, F04/AC-1.1> |

## 7. Validation

| Field | Rule | When checked | Message |
|---|---|---|---|
| <Email> | <valid format; not already a member (BR-003)> | <on blur and on submit> | <MSG-xxx> |

## 8. Responsive behavior

| Breakpoint | Changes |
|---|---|
| Small | <table becomes a list of cards; actions move into a menu> |

## 9. Accessibility notes

<Anything beyond the shared checklist: focus on open, announced updates, keyboard shortcuts.>

## 10. Open questions and decisions

- <Q-xxx: question> · <D-xxx: decision>

## Change log

| Version | Date | Change |
|---|---|---|
| v0.1 | <YYYY-MM-DD> | First draft |
