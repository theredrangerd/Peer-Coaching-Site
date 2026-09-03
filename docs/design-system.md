# Design System — UWC Peer Coaching Hub

This defines the **shared visual core** every mockup uses so all three read as the
same institution. Things that are *meant to differ* between mockups — type
personality, density, layout, motion — are called out as **variable** and
specified per direction in `docs/mockup-briefs.md`.

Brief: **mostly white, bright, UWC blue/teal/mint accents.** White is the canvas;
saturated colour is for emphasis and graphics, not for large text.

## Colour

### Primitives (from `resources _n_aesthetics/`)

| Token | Hex | Notes |
| --- | --- | --- |
| `--uwc-navy` | `#13233A` | Primary text, headings, footer |
| `--uwc-teal-deep` | `#0B6477` | Primary brand colour; passes AA for text on white (~6.3:1) |
| `--uwc-teal` | `#14919B` | Hover/active, secondary accents; large text only |
| `--uwc-cyan` | `#0AD1C8` | Graphics/fills only — fails text contrast on white |
| `--uwc-mint` | `#45DFB1` | Graphics/fills only |
| `--uwc-green` | `#80ED99` | Graphics/fills only; use sparingly |
| `--uwc-pale` | `#CBF3F0` | Tints, section bands, chips |
| `--white` | `#FFFFFF` | Dominant surface |

### Semantic tokens

```css
:root {
  --bg:            #FFFFFF;
  --bg-subtle:     #F3FBFA;   /* pale mint-tinted section band */
  --surface:       #FFFFFF;
  --surface-2:     #F3FBFA;
  --border:        #E1EEEC;
  --border-strong: #C3DEDA;

  --text:          #13233A;   /* uwc-navy */
  --text-muted:    #4B5A69;
  --text-on-fill:  #FFFFFF;   /* text sitting on teal-deep */

  --primary:       #0B6477;   /* uwc-teal-deep */
  --primary-hover: #14919B;
  --primary-weak:  #CBF3F0;

  --accent:        #0AD1C8;   /* decorative only */
  --accent-mint:   #45DFB1;   /* decorative only */

  --focus-ring:    #14919B;
  --link:          #0B6477;
  --link-hover:    #14919B;

  /* status */
  --danger:        #B23A48;   /* cancellations / urgent notices */
  --danger-bg:     #FBEDEE;
  --success:       #0B6477;
  --success-bg:    #E7F6F4;
}
```

### Contrast rules (WCAG 2.1 AA)

- Body text: `--text` or `--primary` on white/`--bg-subtle` only.
- **Never** use `--uwc-cyan`, `--uwc-mint`, `--uwc-green` for text, icons that
  carry meaning, or small UI on a light background — decoration and fills only.
- Buttons: solid `--primary` fill with `--text-on-fill`; hover `--primary-hover`.
- Every interactive element needs a visible `:focus-visible` outline using
  `--focus-ring` (min 2px, 2px offset).
- Urgent notice style uses `--danger` text on `--danger-bg`, plus a non-colour
  cue (icon or "CANCELLED" label) — never colour alone.

### Dark mode

Not required for Phase 0. If added later, invert: `--bg` → `#0E1B2C`, keep teal
family as accents, lift `--uwc-cyan`/`--uwc-mint` for accent text since they pass
on dark. Author light-first with tokens so it's a later swap, not a rewrite.

## Typography

- **Body (fixed):** `Inter`, fallback
  `-apple-system, "Segoe UI", Roboto, system-ui, sans-serif`. Base 16px min on
  mobile, ~17–18px on desktop. Line length 60–75ch. Line height ~1.6 for prose.
- **Headings (variable — set per mockup):** each direction picks a display face
  with its own personality (see briefs). Fallback to the body stack.
- Type scale (major third, 1.25): 0.8 / 1 / 1.25 / 1.563 / 1.953 / 2.441 / 3.052 rem.
- Fonts load from Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) with
  a real fallback stack and `font-display: swap`.

## Spacing & layout

- Spacing scale (4px base): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Content max-width: 72rem (wide layouts) / 42rem (prose). Gutter: 16px mobile,
  24–32px desktop.
- Radius: `--radius-sm: 6px`, `--radius: 12px`, `--radius-lg: 20px`,
  `--radius-full: 999px`. (A mockup may go sharper/softer — note it in its brief.)
- Shadows: keep light. `--shadow-sm: 0 1px 2px rgba(19,35,58,.06)`,
  `--shadow: 0 6px 20px rgba(19,35,58,.08)`.

## Breakpoints

`sm 480` · `md 768` · `lg 1024` · `xl 1280`. Mobile-first — assume students
arrive on phones.

## Components (shared behaviour, styled per direction)

Header/nav, hero, subject list/grid, timetable grid, tutor card, notice
list-item (default + urgent), FAQ accordion, resource-link card, CTA button,
contact card, footer. Each mockup styles these to its own aesthetic but keeps:
semantic HTML, keyboard operability, visible focus, and the contrast rules above.

## Accessibility baseline (all mockups)

- Semantic landmarks (`header`/`nav`/`main`/`footer`), one `h1` per page,
  ordered headings.
- All images have `alt`; decorative images `alt=""`.
- Accordions/menus use correct ARIA and are keyboard-operable.
- Respect `prefers-reduced-motion` — no essential info conveyed only by motion.
- Tap targets ≥ 44×44px.

## Assets

- UWC colour references: `resources _n_aesthetics/color scheme uwc.png`,
  `color scheme uwc 2.png`.
- `[OPEN]` Official UWCSEA logo + brand guidelines — not yet supplied; mockups use
  a text wordmark "Peer Coaching Hub" until confirmed.
