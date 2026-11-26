# UI Kit (`@workspace/ui`): Agent Guidelines

Rules for any AI agent that builds, extends, or maintains this UI kit. Read this file before touching `src/`.

The kit is built on **Base UI** primitives, styled with **Tailwind CSS v4** and **class-variance-authority**. It does not use the shadcn/ui CLI or registry, but it follows the shadcn/ui way of building components: open code that the project owns, small composable parts, variants in `cva`, `data-slot` attributes, and theming through CSS variables.

---

## 1. Principles

- **The project owns the code.** The kit is copied into the project (usually `packages/ui`), not installed from npm. Change components freely to fit the product; there is no upstream to stay in sync with.
- **Pure UI, zero business logic.** Components render props and fire callbacks (`onClick`, `onChange`, `onValueChange`). Never import or implement auth, tenants, users, API calls, cookies, local storage, routing, or domain types (orders, invoices, rooms…). Domain-specific UI belongs in the app.
- **Compose, don't configure.** Prefer small parts that the app assembles (`Card`, `CardHeader`, `CardTitle`, `CardContent`) over one component with many boolean props.
- **One way to do each thing.** Reuse existing atoms and molecules; add a new component only when no composition of existing ones works.

---

## 2. Folder structure (atomic design)

```text
src/
├── components/
│   ├── atoms/        single elements with no dependency on other kit components
│   ├── molecules/    combinations of atoms
│   ├── organisms/    larger, self-contained blocks
│   └── themes/       theme.config.ts (DEFAULT_THEME)
├── hooks/            UI-only hooks (use-mobile)
├── lib/              utils (cn), locale (UiLocaleProvider, messages), formatters
├── styles/           theme.css (entry) and themes/<name>.css (generated)
├── tokens/           tokens.json (W3C DTCG, source of the theme CSS)
└── index.ts          public exports
```

| Level | Rule | Examples |
|---|---|---|
| `atoms/` | Imports no other kit component | Button, Input, Badge, Checkbox, Switch, Label, Avatar, Separator, Skeleton, Tooltip |
| `molecules/` | Built from atoms | Alert, Field, InputGroup, Select, Combobox, DatePicker, TimePicker, Breadcrumb, Pagination, Tabs |
| `organisms/` | Built from molecules and atoms, a full block of UI | Card, Table, Dialog, Sheet, Popover, Sidebar, Accordion, Chart, Empty, Notifications |

- Every component has its **own folder** with the component file(s) and an `index.ts`: `atoms/button/button.tsx`, `atoms/button/button-group.tsx`, `atoms/button/index.ts`.
- Each level has an `index.ts` that re-exports its folders, and `components/index.ts` re-exports the three levels.
- File and folder names are `kebab-case`. Component names are `PascalCase`.
- A lower level never imports a higher one (an atom never imports a molecule).

---

## 3. Writing a component

Follow the shape of `atoms/button/button.tsx`:

```tsx
'use client';

import * as React from 'react';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@workspace/ui/lib/utils';

const buttonVariants = cva('inline-flex items-center … focus-visible:ring-3 disabled:opacity-50', {
  variants: {
    variant: { default: 'bg-primary text-primary-foreground hover:bg-primary/80', outline: '…' },
    size: { default: 'h-8 px-2.5', sm: 'h-7 px-2.5', lg: 'h-9 px-2.5', icon: 'size-8' }
  },
  defaultVariants: { variant: 'default', size: 'default' }
});

export interface ButtonProps extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

- **Primitives:** use `@base-ui/react` for anything interactive or stateful (checkbox, radio, popover, dialog, menu, select, slider, tabs, number field…). Do not add Radix or other headless libraries.
- **Polymorphism:** use Base UI's `render` prop (`<Button render={<a href='…' />} />`), not `asChild`.
- **Variants:** every visual option is a `cva` variant with `defaultVariants`. Export both the component and its `xxxVariants`, and export the props type.
- **`data-slot`:** set `data-slot='<component-name>'` on the root and on each named part (`card-header`, `number-input-increment`). Parents style children through it (`in-data-[slot=button-group]:rounded-lg`).
- **`className` last:** always merge with `cn(…, className)` so the app can override.
- **Spread props** onto the root so ARIA, `id`, and event handlers pass through.
- **`'use client'`** at the top of any file that uses hooks, context, or browser APIs.
- **Controlled and uncontrolled:** support `value` + `onChange` (or `onValueChange`) and `defaultValue`.
- **Comments and JSDoc in English.** Document non-obvious props with `/** … */`.

---

## 4. Theming and tokens

- **Semantic tokens only.** Components use `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-success-accent`, `ring-ring`… Never hard-code hex/rgb values or raw palette classes (`bg-amber-500`, `text-emerald-700`) in a component.
- Available color tokens: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `error`, `success`, `warning`, `info` (each with `-foreground`; status colors also have `-accent` and `-accent-foreground`), `border`, `input`, `ring`, `sidebar-*`, `chart-1`…`chart-5`. Radius: `rounded-sm|md|lg|xl` derive from `--radius`.
- **Source of truth:** `src/tokens/tokens.json` (W3C DTCG). `src/styles/themes/<name>.css` is generated from it with `node scripts/build-theme.mjs`; never edit the generated CSS by hand.
- **Adding a theme:** copy `tokens.json` to `src/tokens/<name>.json`, change the `brand` (and optionally `neutral`) scale, run `node scripts/build-theme.mjs src/tokens/<name>.json <name>`, and `@import './themes/<name>.css'` in `src/styles/theme.css`. Themes switch with `data-theme='<name>'` on `<html>`; dark mode with the `.dark` class. Adding a theme never changes a component.
- **A new semantic token** goes in both `light` and `dark` in `tokens.json`, then in the `@theme inline` block of `theme.css`.

---

## 5. Text and locale

- **No hard-coded user-facing text in components.** Default labels, placeholders, `aria-label`s, and messages come from `useUiLocale().messages` (`src/lib/locale.tsx`); a prop passed by the app always wins (`placeholder ?? t.placeholder`).
- Built-in locales: `en` (default) and `vi`. The app wraps its tree in `<UiLocaleProvider locale='vi'>`, or passes a custom `UiLocale`.
- Dates use `locale.dateLocale` (date-fns); numbers and currency use `Intl` with `locale.code`; amount-in-words uses `locale.amountInWords`.
- Adding a string: add it to `UiMessages`, then to **every** locale in `locale.tsx` (TypeScript fails if one is missing).
- Never ship sample or mock data inside a component; examples belong in the app or a showcase.

---

## 6. Accessibility

- Full keyboard support, visible `focus-visible` rings, correct roles and ARIA attributes (Base UI provides most of this; keep it intact).
- Style invalid and disabled states: `aria-invalid:`, `disabled:` / `data-disabled:`.
- Icon-only buttons have an `aria-label`. Decorative icons have `aria-hidden='true'`.
- Touch targets on mobile layouts are at least 44 × 44 px.
- Text and UI contrast meet WCAG 2.2 AA in light and dark themes.

---

## 7. Imports and exports

- Inside the kit, import shared code through the package alias, not deep relative paths: `@workspace/ui/lib/utils`, `@workspace/ui/lib/locale`, `@workspace/ui/hooks/use-mobile`. Between components, relative imports to a sibling level are fine (`'../../atoms/button'`).
- Keep `tsconfig.json` `paths` and `package.json` `exports` in sync (`./atoms/*`, `./molecules/*`, `./organisms/*`, `./lib/*`, `./hooks/*`, `./styles/*`, `./tokens`).
- Export every new component from its folder `index.ts` and its level `index.ts`.

---

## 8. Adding a component (checklist)

1. Choose the level (atom, molecule, organism) using section 2.
2. Create `src/components/<level>/<name>/<name>.tsx` and `index.ts`; export it from `<level>/index.ts`.
3. Build on a Base UI primitive if it is interactive; variants in `cva`; `data-slot`; `cn(…, className)`.
4. Semantic tokens only; strings from the locale.
5. Check keyboard, focus, disabled, invalid, loading, empty, and dark mode states.
6. Run the checks below.

---

## 9. Verification

After every change:

```bash
bun run typecheck      # or: npx tsc --noEmit
bun run theme:check    # generated theme CSS matches tokens.json
```

In a monorepo, also build the apps that consume the kit so no type or style regression ships.
