# Stack Decision

Status of decisions: **Phase 0 = decided** (below). **Phase 1 = still open**, pending
`docs/open-questions.md` #1–#5.

---

## Phase 0 — the mockups

**Decision: plain HTML + CSS + minimal vanilla JS. No build step, no server, no
dependencies. One `mockups/shared/tokens.css` imported by all three.**

Date: 2026-09-03. Owner: repo owner. Reviewer: n/a (internal, disposable work).

### Why

- The mockups are **disposable**. Ellie picks one direction; the other two are
  deleted. Build tooling is sunk cost on throwaway work.
- **Opens by double-click.** Owner, coordinators, and Ellie can all open
  `index.html` with no setup. The deliverable can be a zip or a static link.
- **Tool-agnostic.** No `npm install`, no lockfile, no framework version for
  Google Antigravity (or Cursor, or a plain text editor) to reconcile.
- Choosing vanilla now **locks nothing in** for Phase 1.

### What that still allows (so nobody thinks "no build" means "plain")

All native to CSS/SVG, no libraries:

- Gradients (linear / radial / conic), multi-layer blends for the mint/cyan bands
- Layered soft shadows, glows, inner shadow, `backdrop-filter` frosted glass,
  `mix-blend-mode`
- Gradient borders, large radii, patterned / grain overlays via SVG filters
- Scroll-triggered reveals and parallax via `animation-timeline: scroll()/view()`,
  hover transitions — all gated behind `prefers-reduced-motion`
- Icons and illustrations as **inline SVG** (hand-authored or exported from
  Figma/Illustrator and dropped in)
- A timetable / availability "heatmap" as a CSS grid of coloured cells — no chart
  library needed for a mockup
- Vanilla JS for: accordions, tabs, sticky/scroll-spy nav, filter chips, mobile
  nav drawer

Genuinely out of reach without tooling — and all out of scope for a design
mockup: complex data viz, 3D, heavy cross-page component reuse.

### Conventions

```
mockups/
  shared/
    tokens.css        <- from docs/design-system.md; byte-identical in all three
  01-portal/
    index.html
    styles.css
    app.js            <- only if needed
    assets/
  02-editorial/
    index.html + about.html + ... (multi-page)
    styles.css
    assets/
  03-library/
    index.html
    styles.css
    app.js
    assets/
```

- Fonts: Google Fonts via `<link>` with `font-display: swap`. One display face
  per direction (see `docs/mockup-briefs.md`), shared body face (Inter).
- Images: placeholder only (local stock or `picsum.photos`). **No real student
  photos, names, or contact details** — safeguarding, see `open-questions.md` #6.
- Each direction's `styles.css` owns its own aesthetic; only `tokens.css` is
  shared.
- Accessibility: WCAG 2.1 AA baseline from `docs/design-system.md` applies to
  mockups too (semantic landmarks, one h1, visible focus, contrast, 44px targets).

### Explicitly rejected for Phase 0

| Option | Why not now |
| --- | --- |
| Astro / 11ty / other SSG | Build step + deps for work that gets thrown away |
| Tailwind (even Play CDN) | Large runtime script; three *distinct* looks are cleaner as per-folder CSS sharing tokens |
| React / Vue / Svelte | No app state here; pure over-engineering for static mockups |
| A component library (MUI, shadcn, Pico) | Imposes one aesthetic; the whole point is three different ones |

---

## Phase 1 — the real site (NOT decided)

Recommendation on record in `docs/PRD.md §10`, unchanged:

- Content-driven **static site generator** (Astro or 11ty) with content in
  markdown / data files.
- Notices + tutor availability via an **embedded Google Sheet / Calendar**, or a
  **git-based CMS** (Decap / Sveltia) if a non-dev must edit without touching the
  repo.
- Sign-up and feedback **link out** to Google / Microsoft Forms.
- **Static hosting** (Netlify / Vercel / Cloudflare Pages / GitHub Pages) unless
  the school requires its own infrastructure.

This cannot be finalised until `docs/open-questions.md` #1–#5 are answered — the
availability + notices update mechanism (#1, #2) is the biggest single driver.
