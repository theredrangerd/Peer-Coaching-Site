# Peer Coaching Hub — Agent Brief

Shared orientation for any AI coding agent working in this repo (Claude Code, Google
Antigravity, Cursor, etc.). Keep this file tool-agnostic. `CLAUDE.md` imports it.

## What this project is

A website that acts as the central hub for the **Peer Coaching** programme at
**UWCSEA** (United World College of South East Asia, Singapore).

Peer Coaching pairs high-performing students with peers who want to raise their
grades and learn better habits. It is a **free** alternative to Singapore's
expensive private-tuition market — that affordability-and-access mission is the
emotional core of the programme and should come through in the marketing surfaces
of the site.

The site serves three jobs at once:

1. **Marketing** — explain the programme, build trust, drive student sign-ups.
2. **Coordination** — timetable, tutor availability, notices, sign-up links,
   contacts.
3. **Resource library** — revision resources curated by the coaches (past papers,
   vetted YouTube channels, how to learn with AI).

## Who the stakeholders are

| Person / group | Role |
| --- | --- |
| The repo owner | Peer coach + the person building this site; assisting the coordinators |
| Peer Coaching coordinators | Student leaders who run the programme; the client |
| Ellie Alchin (Head of Learning) | Staff approver — signs off on the design direction |
| Peer coaches | Provide tutor bios/photos and the revision resources |
| Students | Primary audience — sign up, browse resources, check schedules |

## Current phase — READ THIS BEFORE BUILDING

**We are at the design-approval stage, not the production build.**

The immediate deliverable is **2–3 mockups of the site**, each with a *different
structural layout and aesthetic*, all on the UWC palette. Ellie Alchin reviews
them and picks a direction. Do **not** invest in a sophisticated, final,
data-backed build yet — the mockups are meant to be fast and disposable.

See `docs/mockup-briefs.md` for the three directions.

## Hard constraints

- **Palette:** mostly white, bright, with the blue/teal/mint UWC accents in
  `resources _n_aesthetics/`. Navy/deep-teal for text; bright cyan/mint for
  fills and graphics only (they fail text contrast on white). Tokens in
  `docs/design-system.md`.
- **Accessibility:** target WCAG 2.1 AA (school audience, staff sign-off).
- **Safeguarding / privacy:** this site involves photos, names, and contact
  details of students who are minors. Never publish a real student's personal
  contact info, photo, or full name without explicit confirmation it is cleared.
  Use placeholder people in mockups. Singapore PDPA applies to any form data.
- **Content in mockups:** realistic placeholder — real section names and
  plausible copy, fake names/data.

## Where things live

| Path | What |
| --- | --- |
| `docs/PRD.md` | The product requirements — expanded from the coordinators' notes, with gaps flagged |
| `docs/mockup-briefs.md` | The 2–3 design directions for the approval round |
| `docs/design-system.md` | UWC palette tokens, spacing, type, a11y — the shared core all mockups use |
| `docs/open-questions.md` | Everything still undecided; the list to take back to coordinators / Ellie |
| `resources _n_aesthetics/` | Source material: UWC colour-scheme images, the original `site requirements.txt` |

## Working agreement

- The stack for the real site is **not decided** — recommend from the PRD, don't
  assume. The mockups themselves need no build tooling.
- When you hit something the notes don't answer, add it to
  `docs/open-questions.md` rather than inventing a decision.
- Keep real content in `docs/`. `CLAUDE.md` and this file stay thin so they don't
  drift apart.
