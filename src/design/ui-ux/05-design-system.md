# Design System

| Field | Value |
|---|---|
| Status | Draft |
| Version | v0.1 |
| Owner | <name or role> |
| Source | <design file or component library link; TBD if none> |

Use tokens and components from this file instead of one-off values. A screen that needs something new adds it here first.

## 1. Tokens

### Color

| Token | Light | Dark | Use |
|---|---|---|---|
| `color.bg.default` | <#FFFFFF> | <#0B0B0C> | Page background |
| `color.text.default` | | | Body text |
| `color.text.muted` | | | Secondary text |
| `color.primary` | | | Primary actions, links |
| `color.danger` | | | Destructive actions, errors |
| `color.success` | | | Success states |
| `color.warning` | | | Warnings |
| `color.border` | | | Dividers, input borders |

### Typography

| Token | Font | Size / line height | Weight | Use |
|---|---|---|---|---|
| `type.heading.1` | <family> | <32 / 40> | <600> | Page title |
| `type.body` | | <16 / 24> | <400> | Body text |
| `type.caption` | | <12 / 16> | <400> | Hints, metadata |

### Spacing, radius, elevation, motion

| Token | Value | Use |
|---|---|---|
| `space.1` … `space.8` | <4, 8, 12, 16, 24, 32, 48, 64 px> | Padding and gaps |
| `radius.sm` / `radius.md` / `radius.lg` | <4 / 8 / 16 px> | Inputs / cards / sheets |
| `elevation.1` / `elevation.2` | <shadow> | Cards / overlays |
| `motion.fast` / `motion.base` | <120 / 200 ms, easing> | Hover / enter and exit |

## 2. Components

| ID | Component | Variants | States | Used on |
|---|---|---|---|---|
| CMP-01 | Button | <primary, secondary, ghost, danger> | default, hover, focus, pressed, disabled, loading | <S01, S02> |
| CMP-02 | Text input | <text, password, search> | default, focus, filled, error, disabled | |
| CMP-03 | <Component> | | | |

For each component that needs more than a row, add a subsection: anatomy, behavior, do and don't, accessibility notes.

## 3. Patterns

| Pattern | Rule |
|---|---|
| Forms | <label above field; validate on blur; show all errors on submit> |
| Empty states | <illustration + one sentence + primary action> |
| Loading | <skeleton for content, spinner only inside buttons> |
| Destructive actions | <confirm with a modal naming the object; offer undo when possible> |
| Notifications | <toast for success, inline for errors> |

## 4. Icons and imagery

<Icon set, sizes, stroke; illustration and photo style.>

## Change log

| Version | Date | Change |
|---|---|---|
| v0.1 | <YYYY-MM-DD> | First draft |
