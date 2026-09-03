# Mockup Briefs — Phase 0 Design Approval

Purpose: give **Ellie Alchin** a clear choice between genuinely different ways the
Peer Coaching Hub could be structured and could feel. Not three skins of one
layout — three different *organising ideas*.

All three share:

- The UWC palette and accessibility baseline in `docs/design-system.md`.
- The same content set (IA in `docs/PRD.md` §6).
- Realistic placeholder content — real section names, plausible copy, **fake**
  tutors/data. No real student photos, names, or contact details.
- Mostly-white, bright treatment.

Build each as a self-contained folder that opens by double-click:

```
mockups/
  01-portal/      index.html + styles.css (+ pages if multi-page)
  02-editorial/
  03-library/
  shared/tokens.css     <- from the design system; identical across all three
```

Deliverable for the review: the three folders + a one-page comparison (this doc's
table is the seed) so Ellie can see the trade-offs, not just the pixels.

---

## Direction 1 — "Portal" (utility-first dashboard)

**Organising idea:** the site is a tool students check often. Everything
actionable is one screen away.

- **Layout:** single long home page with a sticky top nav of anchor links.
  Above the fold: a compact hero line + a **Notices** strip (urgent notice styled
  loud) + primary CTAs ("Sign up", "Find a tutor"). Below: a card grid linking to
  Timetable, Availability, Subjects, Resources, FAQ, Contacts.
- **Timetable & availability** are shown inline as real grids, not just links.
- **Feel:** crisp, dense-but-organised, app-like. Rounded cards, subtle shadows,
  lots of teal chips and status pills. Motion minimal.
- **Display type:** something clean and slightly technical — e.g. *Space Grotesk*.
- **Best when:** most visitors are returning students checking "what's on / who's
  free / any cancellations".
- **Trade-off:** less room to tell the programme's story; can feel busy to a
  first-time visitor or a staff reviewer.

## Direction 2 — "Editorial" (marketing microsite)

**Organising idea:** the site sells the programme first. It should make a
prospective coachee (and a parent, and Ellie) trust it immediately.

- **Layout:** multi-page. A spacious landing page that leads with the mission —
  free, student-to-student, access for everyone — with a strong hero, a
  three-step "how it works", a "meet the tutors" preview, and social-proof-style
  quotes. Coordination content (timetable, availability, notices) lives on their
  own clean pages linked from a conventional top nav.
- **Feel:** generous whitespace, big confident headings, one full-bleed mint/cyan
  graphic band per page, photography-forward tutor section. Warm and human.
- **Display type:** a characterful but friendly face — e.g. *Fraunces* or
  *Bricolage Grotesque*.
- **Best when:** the priority is growing sign-ups and looking credible to staff
  and parents.
- **Trade-off:** returning students click more to reach a schedule; more pages to
  keep updated.

## Direction 3 — "Library" (browsable knowledge base)

**Organising idea:** the site is a reference. A persistent sidebar makes every
section reachable from everywhere, doc-site style.

- **Layout:** left sidebar navigation (collapsible on mobile) + wide content
  column. Home is a short "start here" overview. Revision Resources is the
  centre of gravity — Past Paper Hub, YouTube picks with the "why it's good"
  notes, and the Learning-with-AI guide get real depth and structure. FAQ is
  long-form and searchable/filterable.
- **Feel:** quiet, text-forward, GitBook/Notion-like. Thin rules instead of
  shadows, pale-mint section bands, teal links. Reading comfort over flourish.
- **Display type:** near-neutral, high-legibility — e.g. *Inter Tight* or
  *IBM Plex Sans* for headings.
- **Best when:** the resource library and FAQ are expected to carry the most
  ongoing value, and coordinators want to keep adding to it.
- **Trade-off:** least "marketing" impact; sidebar UX needs care on mobile.

---

## Comparison seed (for the review one-pager)

| | Portal | Editorial | Library |
| --- | --- | --- | --- |
| Primary job it optimises for | Coordination | Marketing / sign-ups | Resources / reference |
| First-time visitor clarity | Medium | High | Medium |
| Returning student speed | High | Low–Medium | Medium |
| Story / mission presence | Low | High | Low–Medium |
| Pages to maintain | Fewest | Most | Medium |
| Mobile complexity | Low | Low | Medium (sidebar) |
| Staff/parent credibility | Medium | High | Medium |

## What we need from Ellie

1. A direction (or "Editorial home + Portal-style schedule pages").
2. Any brand constraints we don't know about (logo, domain, UWC guidelines).
3. Sign-off on the safeguarding approach for tutor photos/names and contacts
   (`docs/open-questions.md`).
