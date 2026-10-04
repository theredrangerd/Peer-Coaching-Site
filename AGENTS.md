# Peer Coaching Hub — Agent Brief

Shared orientation for any AI coding agent working in this repo (Claude Code, Google
Antigravity, Cursor, etc.). Keep this file tool-agnostic. `CLAUDE.md` imports it.

## What this project is

A website that acts as the central hub for the **Peer Coaching** programme at
**UWCSEA** (United World College of South East Asia, Singapore).

Peer Coaching pairs students who are excelling in a subject with peers who
want to be brought up to speed. All coaches are **Grade 11** (first year of the IB) and
ahead of the curve: Grade 9/10 coachees get a coach who took that course
earlier; Grade 11 coachees get a coach in the same IB course now. That is the
main selling point and the core of the pitch. It is a legitimate alternative to
commercial tutoring (UWCSEA families can generally afford that, so do **not**
frame it as a "free alternative for those who can't afford tuition"). It
happens to be free and cheaper; mention that, but as a supporting point, never
the headline.

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
| Peer coaches | Provide the revision resources; their bios/photos go only on the separate internal site, never the public one |
| Students | Primary audience — sign up, browse resources, check schedules |

## Current phase — READ THIS BEFORE BUILDING

**The Portal direction was chosen.** The site is now two static pages in
`mockups/`: `index.html` (parent-first home) and `resources.html` (public,
library-style revision resources). Work order: overhaul the portal, then the
revision resources page. Still plain HTML/CSS/JS, no build step; the real
(Phase 1) stack is undecided. The original three-mockup brief is in
`docs/mockup-briefs.md` and git history.

## Hard constraints

- **Palette:** mostly white, bright, with the blue/teal/mint UWC accents in
  `resources _n_aesthetics/`. Navy/deep-teal for text; bright cyan/mint for
  fills and graphics only (they fail text contrast on white). Tokens in
  `docs/design-system.md`.
- **Accessibility:** target WCAG 2.1 AA (school audience, staff sign-off).
- **Safeguarding / privacy — NO STUDENT INFO ON THE PUBLIC SITE (decided
  2026-10-04):** the site is publicly accessible and students are minors. It must
  contain no student or coach **names**, **photos**, **bios**, **grades or
  other achievements**, or quotes — placeholder/fake people included. Coach
  profiles live on a separate internal site (Google Apps Script, school Google
  Workspace); the public site links to it and explains why it is internal.
  Show availability by subject, never by person. Contact details: role titles or
  a shared programme email only. Singapore PDPA applies to any form data.
  Revision resources are intended to be public; sign-up/feedback are Google
  Forms (restricted).
- **Audience and positioning:** the public home page is written for **parents**
  and prospective students. A core goal is making Peer Coaching read as a
  legitimate alternative to commercial tutoring. Never name a competitor.
  Only use trust claims the owner has confirmed (see below); don't invent
  statistics or processes.
- **Confirmed facts:** see `docs/programme-facts.md` (sanitised from the
  coordinators' 2026-27 handout) — the source of truth for what the site may
  claim. `peer-coaching-resources/` holds the raw handout, which names students
  and lists their emails: it is gitignored; never commit or copy from it
  names, class codes or emails.
- **Content in mockups:** realistic placeholder copy, no invented people.

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
