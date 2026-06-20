# Design System & UI Guidelines: SubZero

---

# 1. Component Library & Styling

## Design Inspiration

Primary:

* Linear (70%)

Secondary:

* Stripe (20%)

Analytics Inspiration:

* Revolut (10%)

---

## Core Stack

* Tailwind CSS v4
* shadcn/ui
* React 19
* Lucide React
* Recharts

---

## Design Principles

* Minimal and clean.
* Dark-first interface.
* High information density.
* No unnecessary gradients.
* Premium SaaS aesthetics.
* Focus on readability over decoration.

---

# 2. Color Palette

## Background

| Token         | Hex     |
| ------------- | ------- |
| background    | #09090B |
| surface       | #18181B |
| surface-hover | #1F1F23 |
| border        | #27272A |

---

## Primary

Inspired by Linear.

| Token         | Hex     |
| ------------- | ------- |
| primary       | #5E6AD2 |
| primary-hover | #7C87F8 |
| primary-focus | #818CF8 |

---

## Text

| Token          | Hex     |
| -------------- | ------- |
| text-primary   | #FAFAFA |
| text-secondary | #A1A1AA |
| text-muted     | #71717A |

---

## Semantic

### Success

```text
success: #22C55E
```

### Warning

```text
warning: #F59E0B
```

### Error

```text
error: #EF4444
```

### Info

```text
info: #3B82F6
```

---

## Charts

Inspired by Revolut.

```text
#5E6AD2
#22C55E
#F59E0B
#3B82F6
#EC4899
```

Only charts may use multiple colors.

---

# 3. Typography

## Font Family

Headings:

```text
Geist Sans
```

Fallback:

```text
Inter
system-ui
```

Body:

```text
Inter
```

Numbers:

```text
Geist Mono
```

---

## Type Scale

| Role    | Size      | Weight |
| ------- | --------- | ------ |
| Hero    | text-5xl  | 600    |
| H1      | text-4xl  | 600    |
| H2      | text-3xl  | 600    |
| H3      | text-2xl  | 600    |
| Title   | text-xl   | 600    |
| Body    | text-base | 400    |
| Small   | text-sm   | 400    |
| Caption | text-xs   | 400    |

---

## Rules

Use:

```jsx
font-semibold
tracking-tight
```

Avoid:

```jsx
font-bold
tracking-wide
```

Never exceed:

```jsx
text-5xl
```

No giant typography.

---

# 4. Spacing & Sizing

Base unit:

```text
4px
```

Preferred spacing:

| Tailwind |
| -------- |
| gap-2    |
| gap-4    |
| gap-6    |
| gap-8    |
| p-4      |
| p-6      |

---

## Border Radius

Cards:

```jsx
rounded-xl
```

Inputs:

```jsx
rounded-lg
```

Buttons:

```jsx
rounded-lg
```

Badges:

```jsx
rounded-full
```

Modals:

```jsx
rounded-2xl
```

Avoid:

```jsx
rounded-full buttons
```

Keep geometry similar to Linear.

---

## Shadows

Default:

```jsx
border border-zinc-800
```

Prefer borders over shadows.

Use:

```jsx
shadow-sm
```

only when necessary.

Avoid heavy shadows.

---

# 5. Responsive Breakpoints

## Mobile

```text
0-767px
```

Layout:

* Single column
* Cards stacked
* Sidebar collapses

---

## Tablet

```text
768-1023px
```

Layout:

* Two columns
* Responsive tables

---

## Desktop

```text
1024px+
```

Layout:

* Sidebar visible
* Grid layouts
* Analytics dashboard

---

## Tables

Desktop:

Normal tables.

Mobile:

Convert to cards.

Never allow horizontal scrolling.

---

# 6. State Variations

## Hover

Cards:

```jsx
hover:bg-zinc-900
```

Buttons:

```jsx
hover:bg-indigo-500
```

Transition:

```jsx
transition-colors duration-200
```

---

## Focus

Always show:

```jsx
focus:ring-2
focus:ring-indigo-400
```

No hidden focus states.

---

## Disabled

```jsx
opacity-50
cursor-not-allowed
```

---

## Loading

Buttons:

Show spinner.

Cards:

Use skeleton loaders.

Tables:

Use skeleton rows.

Never leave empty blank areas.

---

# Components

## Sidebar

Width:

```text
260px
```

Background:

```text
#09090B
```

Border:

```jsx
border-r border-zinc-800
```

---

## Navbar

Height:

```text
64px
```

Sticky.

Background:

```text
#09090B
```

---

## Cards

Background:

```text
#18181B
```

Padding:

```jsx
p-6
```

Radius:

```jsx
rounded-xl
```

Border:

```jsx
border border-zinc-800
```

---

## Buttons

Primary:

```jsx
bg-indigo-500
text-white
rounded-lg
```

Secondary:

```jsx
bg-zinc-900
border border-zinc-800
```

Height:

```text
40px
```

---

## Inputs

Height:

```text
44px
```

Border:

```jsx
border-zinc-700
```

Background:

```jsx
bg-zinc-900
```

---

## Tables

Minimal.

No zebra stripes.

Use:

```jsx
border-b border-zinc-800
```

Padding:

```jsx
py-4
```

---

## Charts

Use:

* Recharts
* Rounded bars
* Smooth lines

Keep chart backgrounds transparent.

---

# Empty States

Always show:

* Icon
* Short title
* One sentence
* CTA button

Example:

```text
No subscriptions yet

Add your first subscription to start tracking expenses.
```

---

# Icons

Use:

```text
Lucide React
```

Size:

```jsx
h-4 w-4
```

Default.

Avoid oversized icons.

---

# Animation

Allowed:

```jsx
transition-colors
transition-opacity
```

Duration:

```text
200ms
```

Avoid:

* bounce
* pulse
* parallax
* excessive motion

---

# Dark Mode

Dark mode is default.

Light mode may be added later.

Do not build separate light-mode components.

---

# Do

* Use lots of whitespace.
* Use borders instead of shadows.
* Keep cards simple.
* Keep charts colorful.
* Prioritize readability.
* Use subtle transitions.
* Make it feel like Linear.

---

# Don't

* No gradients.
* No glassmorphism.
* No neumorphism.
* No heavy shadows.
* No bright backgrounds.
* No oversized icons.
* No rounded-full buttons.
* No excessive animations.
* No emoji-heavy UI.

---

# Visual Goal

Linear layout +
Stripe polish +
Revolut analytics

Minimal, premium, and production-ready.
