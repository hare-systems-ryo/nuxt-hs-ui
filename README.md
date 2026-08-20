# nuxt-hs-ui

A Nuxt 4 UI component library for business management applications, built on top of [@nuxt/ui](https://ui.nuxt.com/) and Tailwind CSS v4.

**Version:** 5.x &nbsp; |&nbsp; **License:** MIT &nbsp; |&nbsp; **Author:** [Ryo@Hare-Systems](https://github.com/hare-systems-ryo)

---

## Requirements

| Dependency | Version |
|---|---|
| Nuxt | `^4.x` |
| @nuxt/ui | `^4.x` |
| @pinia/nuxt | `^0.11` |
| pinia-plugin-persistedstate | `^4.x` |
| @vueuse/nuxt | `^13.x` |
| sass-embedded | `^1.x` |

---

## Installation

```sh
npm install nuxt-hs-ui
```

---

## Setup

### 1. `nuxt.config.ts`

Add the module and configure your theme colors. The `theme` object generates TypeScript type definitions for color tokens — **the actual CSS is applied via Tailwind (see step 2).**

```ts
export default defineNuxtConfig({
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },
  build: {
    transpile: ['nuxt-hs-ui'],
  },
  vite: {
    optimizeDeps: { exclude: ['nuxt-hs-ui'] },
    ssr: { noExternal: ['nuxt-hs-ui'] },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    [
      'nuxt-hs-ui',
      {
        theme: {
          main0: '#183C5E',
          main1: '#2C5A85',
          main2: '#487CB4',
          main3: '#A7CDED',
          main4: '#C4E1FF',
          accent1: '#FF6600',
          accent2: '#FFAC7C',
          info: '#2BABB5',
          success: '#2BB60C',
          warn: '#EAB000',
          error: '#D80329',
          link: '#6200EE',
          download: '#11691F',
          dark: '#224466',
          back0: '#FFFFFF',
          back1: '#DCE1E8',
          back2: '#BAC3D1',
          back3: '#97A5BA',
          back4: '#7487A3',
        },
      },
    ],
  ],
});
```

### 2. CSS (e.g. `assets/css/main.css`)

Import Tailwind and define the same colors as CSS custom properties under `@theme static`. The `@source` directive ensures Tailwind scans the library's `dist` folder for utility classes used inside components.

```css
@import "tailwindcss";
@import "@nuxt/ui";
@source "../../node_modules/nuxt-hs-ui/dist";

@theme static {
  --color-text    : #000000;
  --color-main0   : #183C5E;
  --color-main1   : #2C5A85;
  --color-main2   : #487CB4;
  --color-main3   : #A7CDED;
  --color-main4   : #C4E1FF;
  --color-accent1 : #FF6600;
  --color-accent2 : #FFAC7C;
  --color-info    : #2BABB5;
  --color-success : #2BB60C;
  --color-warn    : #EAB000;
  --color-error   : #D80329;
  --color-link    : #6200EE;
  --color-download: #11691F;
  --color-dark    : #224466;
  --color-back0   : #FFFFFF;
  --color-back1   : #DCE1E8;
  --color-back2   : #BAC3D1;
  --color-back3   : #97A5BA;
  --color-back4   : #7487A3;
}
```

> **Note:** The `theme` object in `nuxt.config.ts` is used only for generating TypeScript color token types. The actual CSS values must be declared here in `@theme static`.

### 3. Dark mode

As of v5, `--color-*` values are no longer injected by the module — components read whatever your app's CSS resolves for `--color-<key>` at the time. This means you switch the whole palette for dark mode by re-declaring the same `--color-*` variables under a `.dark` selector (the class `@nuxtjs/color-mode` toggles, configured via the `colorMode` option in `nuxt.config.ts`) and/or a `prefers-color-scheme: dark` media query:

```css
.dark {
  --color-text    : #FFFFFF;
  --color-main0   : #0E2338;
  --color-main1   : #183A59;
  --color-main2   : #2C4E70;
  --color-main3   : #4A6FA0;
  --color-main4   : #9FC6ED;
  --color-accent1 : #FF7A1A;
  --color-accent2 : #FFC199;
  --color-info    : #3FC9D3;
  --color-success : #4CD137;
  --color-warn    : #F5C518;
  --color-error   : #FF5470;
  --color-link    : #D1B8FD;
  --color-download: #3DDC5B;
  --color-dark    : #6E93B8;
  --color-back0   : #1C232B;
  --color-back1   : #323A42;
  --color-back2   : #485059;
  --color-back3   : #5D6770;
  --color-back4   : #737D87;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* same overrides, for the moment before color-mode's class is applied */
  }
}
```

In your own code, prefer `GetColorVar('main0')` (→ `var(--color-main0)`) over `GetColorCode('main0')` (a fixed hex baked in at build time) whenever a color needs to react to the current mode. For a translucent variant, use `GetColorVarAlpha('main0', 50)` instead of appending an alpha suffix to a hex string.

---

## Components

All components are auto-imported when the module is registered.

### Form

| Component | Description |
|---|---|
| `Btn` | Themed button with loading / disabled states |
| `TextBox` | Styled text input |
| `Textarea` | Styled multi-line input |
| `CheckBox` | Single checkbox with label |
| `CheckList` | List of checkboxes |
| `Radio` | Radio button group |
| `Select` | Dropdown select with search |
| `DatePicker` | Date picker (powered by flatpickr) |
| `ValueBox` | Read-only value display field |
| `InputFrame` | Generic wrapper for custom form inputs |

### Interactive

| Component | Description |
|---|---|
| `Alert` | Inline alert banner |
| `BlockLoading` | Full-area loading overlay |
| `Dialog` | Confirmation / prompt dialog |
| `Modal` | Base modal |
| `Toast` | Toast notification |
| `WindowLoader` | Full-window loading screen |

### Layout

| Component | Description |
|---|---|
| `Card` | Themed content card |
| `CardItem` | Row item inside a `Card` |
| `Container` | Page-level container |
| `Accordion` | Collapsible section |
| `AccordionDown` | Bottom-anchored collapsible section |
| `AspectBox` | Fixed aspect-ratio container |

### Misc

| Component | Description |
|---|---|
| `Breadcrumb` | Page breadcrumb navigation |
| `Tabulator` | Data grid (powered by tabulator-tables) |
| `ViewNameDisplay` | Current page / view name label |

---

## Composables

All composables are auto-imported.

| Composable | Description |
|---|---|
| `useHsDialog` | Open/close/control `Dialog` imperatively |
| `useHsModal` | Open/close/control `Modal` imperatively |
| `useHsToast` | Fire toast notifications |
| `useHsWindowLoader` | Show/hide the window-level loader |
| `useHsScrollLock` | Lock/unlock body scroll |
| `useHsFocus` | Focus management helpers |
| `useHsIsMobile` | Reactive mobile breakpoint detection |
| `useHsMultiLang` | Multilingual label resolution |
| `useHsMisc` | Miscellaneous utilities |

---

## Utils

Available via `nuxt-hs-ui/utils/*` named exports.

| Module | Description |
|---|---|
| `string` | String manipulation helpers |
| `number` | Number formatting and parsing |
| `float` | Floating-point safe arithmetic (BigNumber.js) |
| `object` | Object / Map utilities |
| `select` | Select item builder helpers |
| `select-item` | Select item type definitions |
| `multi-lang` | Multilingual string utilities |
| `multi-lang-object` | Multilingual object utilities |
| `dayjs` | Pre-configured dayjs instance |
| `tabulator` | Tabulator helper types and formatters |
| `class-style` | Tailwind class merging utilities |
| `modal` | Modal state helpers |
| `theme` | Theme token accessor |
| `com` | Common utility functions |

---

## License

MIT © [Ryo@Hare-Systems](https://github.com/hare-systems-ryo)
