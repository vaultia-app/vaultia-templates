# Base UI React Kit

A ready-to-use UI kit for React apps: about 60 components on **Base UI** primitives, styled with **Tailwind CSS v4** and **class-variance-authority**, organized as atoms, molecules, and organisms. Copy it into a project and start building screens instead of rebuilding a design system.

- Light and dark mode, multiple brand themes from one set of design tokens (W3C DTCG)
- Built-in English and Vietnamese text, date, and currency defaults, switchable per app
- No business logic: works for any product (portals, dashboards, admin tools)
- Rules for AI agents in [`AGENTS.md`](AGENTS.md)

Inspired by how shadcn/ui builds components (open code you own, `cva` variants, `data-slot`, CSS-variable theming), without depending on the shadcn CLI.

## Use it in a project

### 1. Copy the kit

In a monorepo, the kit becomes `packages/ui`:

```bash
npx degit vaultia-app/vaultia-templates/src/frontend/base-ui-react-kit packages/ui
```

Without `degit`:

```bash
git clone --depth 1 https://github.com/vaultia-app/vaultia-templates.git /tmp/vaultia-templates
cp -R /tmp/vaultia-templates/src/frontend/base-ui-react-kit packages/ui
```

The package is named `@workspace/ui`. To rename it (for example `@acme/ui`), replace `@workspace/ui` everywhere in `packages/ui` (`package.json`, `tsconfig.json`, and imports).

The `tsconfig.json` is standalone. If the project has a shared TypeScript config, extend it instead and keep the `paths`.

### 2. Install dependencies

```bash
bun install          # or npm / pnpm install, from the monorepo root
```

The app also needs `tailwindcss` (v4), `@tailwindcss/postcss` (or the Vite plugin), and `tw-animate-css`.

### 3. Wire it into the app

Add the kit to the app's dependencies:

```json
{ "dependencies": { "@workspace/ui": "workspace:*" } }
```

In the app's Tailwind entry stylesheet:

```css
@import 'tailwindcss';
@import 'tw-animate-css';
@import '@workspace/ui/styles/theme.css';
@source '../../../packages/ui/src'; /* path from this file to the kit's src */

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground antialiased;
  }
}
```

In the root layout, set the theme and, for Vietnamese defaults, the locale:

```tsx
import { DEFAULT_THEME, UiLocaleProvider } from '@workspace/ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <body>
        <UiLocaleProvider locale='en'>{children}</UiLocaleProvider>
      </body>
    </html>
  );
}
```

Dark mode: add the `dark` class to `<html>` (for example with `next-themes`, `attribute='class'`).

### 4. Use components

```tsx
import { Button } from '@workspace/ui/atoms/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/organisms/card';
import { DatePicker } from '@workspace/ui/molecules/date-picker';
```

Everything is also exported from `@workspace/ui`.

## Brand themes

Colors come from `src/tokens/tokens.json`. The default theme follows the [shadcn/ui](https://ui.shadcn.com/colors) **Neutral** palette: a near-black `primary` (light gray in dark mode), neutral grays, radius `0.625rem`, and the shadcn chart colors. Status colors (`success`, `warning`, `info`, `error`) are the kit's own. The only change from shadcn is a darker focus `ring` (`neutral.500`), so focus outlines meet WCAG 2.2 AA (3:1).

- **Add a brand color:** replace the `brand` scale (50–950; your color is usually 500 or 600) and point the semantic tokens at it. Light: `primary` and `sidebar-primary` → `brand.600`, `ring` and `sidebar-ring` → `brand.500`, `accent` → `brand.50` with `accent-foreground` → `brand.700`. Dark: `primary` and `sidebar-primary` → `brand.500`, `ring` and `sidebar-ring` → `brand.400`. Set `primary-foreground` to white or near-black, whichever gives at least 4.5:1. Then run `bun run theme:build`.
- **Add a theme:** copy `tokens.json` to `src/tokens/<name>.json`, edit it, run `node scripts/build-theme.mjs src/tokens/<name>.json <name>`, add `@import './themes/<name>.css';` to `src/styles/theme.css`, and set `data-theme='<name>'`.

The generated files in `src/styles/themes/` are never edited by hand. `bun run theme:check` fails when they are out of date.

## Text and locale

Components have no hard-coded text. Defaults come from the active locale:

| Locale | Language | Dates | Currency | Amount in words |
|---|---|---|---|---|
| `en` (default) | English | date-fns `enUS` | `$`, `1,234,567` | none |
| `vi` | Vietnamese | date-fns `vi` | `₫`, `1.234.567` | "Một triệu hai trăm … đồng" |

Any prop you pass (`placeholder`, `tooltipText`, `title`…) overrides the locale. For another language, build a `UiLocale` object (see `src/lib/locale.tsx`) and pass it to `UiLocaleProvider`.

## Components

| Level | Components |
|---|---|
| Atoms | avatar, badge, button (+ button-group, loading-button), checkbox, collapsible, input, kbd, label, progress, radio-group, rating, scroll-area, separator, skeleton, slider, switch, textarea, toggle-group, tooltip |
| Molecules | alert, autocomplete, breadcrumb, calendar, combobox, copy-button, currency-input, date-picker (+ range), datetime-picker, description-list, field, file-upload, input-group, month-picker, number-input, pagination, pin-input, select, sonner, stepper, tabs, time-picker, timeline |
| Organisms | accordion, alert-dialog, bottom-sheet, card, chart, command, dialog, dropdown-menu, empty, notifications, popover, sheet, sidebar, table |

## Checks

```bash
bun run typecheck
bun run theme:check
```
