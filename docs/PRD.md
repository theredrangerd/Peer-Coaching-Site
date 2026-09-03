# Peer Coaching Hub — Product Requirements

**Status:** Draft v0.1 — expanded from the coordinators' notes
(`resources _n_aesthetics/site requirements.txt`). Sections are tagged:

- `[CONFIRMED]` — stated in the notes or by the owner
- `[ASSUMED]` — a reasonable default filled in to move forward; confirm before relying on it
- `[OPEN]` — genuinely undecided; tracked in `docs/open-questions.md`

Last updated: 2026-09-03

---

## 1. Background & problem

`[CONFIRMED]` Peer Coaching at UWCSEA pairs high-performing students with peers who
want to improve their grades and study habits. It is run by student **coordinators**
with staff oversight from the **Head of Learning (Ellie Alchin)**.

`[CONFIRMED]` Private tutoring in Singapore is expensive and widespread. Peer
Coaching is a free, school-based alternative. Widening access to good academic
support is the programme's core purpose.

**Problem the site solves:** today there is no single place for students to
understand the programme, see when sessions run, find a tutor, sign up, or reach
the curated revision resources. Information is scattered and coordination is manual.

## 2. Goals

`[CONFIRMED]`

1. **Market** the programme — communicate what it is, who it helps, and why it
   works, to drive student sign-ups.
2. **Coordinate** delivery — publish the timetable, tutor availability, notices,
   sign-up links, and contacts in one authoritative place.
3. **Host resources** — a coach-curated library of revision material.

### Non-goals (for now) `[CONFIRMED]`

- Not building a booking system, login area, or CMS in this phase.
- Not a polished production site yet — see Section 4.
- Not replacing whatever internal tools coordinators use to roster tutors.

## 3. Success metrics `[ASSUMED]`

Confirm which of these the coordinators actually care about:

- Number of student sign-ups per term attributable to the site.
- Reduction in "when/where is peer coaching?" questions to coordinators.
- Tutor roster and timetable are updated without developer involvement.
- Ellie Alchin approves a design direction from the mockup round (immediate).

## 4. Delivery phases

### Phase 0 — Design approval `[CONFIRMED]` ← we are here

Produce **2–3 mockups**, each a different structural layout and aesthetic, all on
the UWC palette, populated with realistic placeholder content. Present to Ellie
Alchin for sign-off on direction. Fast and disposable — no backend, no CMS, no
build pipeline required. Directions are specified in `docs/mockup-briefs.md`.

**Exit criteria:** Ellie picks a direction (or a blend), and open questions in
Section 9 that block the build are answered.

### Phase 1 — Real site build `[OPEN]`

Build the approved direction as a maintainable site with real content. Stack
recommendation below; final choice pending the content-ownership answers.

### Phase 2 — Handover & maintenance `[OPEN]`

The current owner is a student and will graduate. Define who owns updates
(notices, timetable, roster) afterward and hand over docs + access.

## 5. Audience

| Audience | Needs from the site |
| --- | --- |
| Prospective coachee (student) | What is this? Is it for me? Is it free? How do I sign up? |
| Current coachee | When is my session? Any notices/cancellations? Where are the resources? |
| Prospective peer coach | What's expected? How do I apply? |
| Coordinators | A place to point people to; low-effort updates to notices/timetable |
| Staff (Ellie Alchin, teacher heads) | Confidence the programme looks credible and safe; easy oversight |
| Parents `[ASSUMED]` | Reassurance about what the programme is |

## 6. Information architecture

`[ASSUMED]` sitemap — adjust per the chosen mockup direction. Some directions
collapse these into a long single page; others make each a route.

```
Home / Overview
├── About Peer Coaching        (intro, mission, how it works)
├── Subjects Offered
├── Timetable                  (session schedule — programme-wide)
├── Tutor Availability         (per-tutor slots)
├── Meet the Tutors            (bios, photos, specialties, interests)
├── Sign Up
│   ├── Sign up as a student
│   └── Become a peer coach
├── Revision Resources
│   ├── Past Paper Hub
│   ├── Recommended YouTube channels (+ why each is good)
│   └── Learning effectively with AI
├── FAQ
├── Notices                    (announcements, cancellations)
├── Contacts                   (coordinators, coaches, teacher heads)
└── Feedback                   (link out to a form)
```

## 7. Feature requirements

Each item: what the notes asked for, plus the decisions still needed.

### 7.1 Timetable `[CONFIRMED, content OPEN]`
Programme-wide schedule of when peer coaching sessions run.
- Not yet finalised by coordinators.
- `[OPEN]` Format: recurring weekly grid? Per-subject? Term dates?
- `[OPEN]` Source of truth and update method (embed a Google Sheet/Calendar, or
  hand-maintained in the site?).

### 7.2 Introduction to Peer Coaching `[CONFIRMED, content OPEN]`
Explains the programme and its ethos.
- `[OPEN]` Copy to be written with coordinators. Should carry the
  access/affordability mission and a plain "how it works" explanation.

### 7.3 Subjects offered `[CONFIRMED, content OPEN]`
List of subjects with peer coaching available.
- `[OPEN]` The actual list, and whether it varies by term or by tutor availability.

### 7.4 FAQ `[CONFIRMED, content OPEN]`
Named questions so far: *How do I sign up?*, *How do I become a peer coach?*, plus
others TBD.
- `[ASSUMED]` Also cover: Is it free? Who can join? How often can I attend? What
  should I bring? Can I request a specific tutor? What subjects/levels? Online or
  in person? What if I need to cancel?
- `[OPEN]` Real answers from coordinators.

### 7.5 Revision Resources `[CONFIRMED, content OPEN]`
Curated by the coaches. Three sub-sections named in the notes:
- **Past Paper Hub** — `[OPEN]` are papers hosted, or linked to an existing
  store/Drive? Copyright: exam-board past papers may not be redistributable —
  prefer linking. Organise by subject + level + year.
- **Recommended YouTube channels** — each entry needs a note on *what makes it
  good* (per the notes), not just a link.
- **Learning effectively with AI** — a written guide. `[OPEN]` Should align with
  UWCSEA's academic-integrity / AI-use policy — check with Ellie.
- `[OPEN]` Who maintains this after launch, and how (markdown files, a sheet, a
  form submission from coaches?).

### 7.6 Tutor availability schedule `[CONFIRMED, content OPEN]`
Per-tutor slots, distinct from the programme timetable.
- `[OPEN]` Is this live data (tutors update their own availability) or a static
  snapshot refreshed by coordinators? This is the single biggest driver of stack
  choice.
- `[OPEN]` Relationship to §7.1 — one combined view or two?

### 7.7 Student sign-up `[CONFIRMED, mechanism OPEN]`
Links for students to join peer coaching.
- `[ASSUMED]` A Google Form or Microsoft Form the school already uses.
- `[OPEN]` The actual form URL(s). Separate form for "become a coach".
- `[OPEN]` Does sign-up need to be gated behind school SSO?

### 7.8 Meet the Tutors `[CONFIRMED, content OPEN]`
Card per tutor: photo, description, interests, specialties.
- `[OPEN]` The roster.
- `[OPEN, safeguarding]` Photo + name consent for each student tutor. Decide
  whether to use first name + last initial, and whether photos are required or
  optional (avatar fallback). Do not publish real tutors in mockups.

### 7.9 Notices `[CONFIRMED, mechanism OPEN]`
Announcements such as "sessions cancelled until X due to internal mocks."
- Needs to be updatable quickly and often, by a non-developer.
- `[ASSUMED]` A dated list, newest first, with an optional "pinned/urgent" style.
- `[OPEN]` Update mechanism — this and §7.6 decide whether Phase 1 needs a CMS or
  just a quick redeploy is acceptable.

### 7.10 Contacts `[CONFIRMED, content OPEN]`
Coordinators, coaches, and teacher heads.
- `[OPEN, safeguarding]` Which contact details may be published. Prefer a shared
  programme email or staff emails over individual student emails.

### 7.11 Feedback form link `[CONFIRMED, URL OPEN]`
Link out to an existing feedback form. `[OPEN]` URL.

## 8. Design & brand requirements

`[CONFIRMED]`

- Colour scheme **mostly white**, **bright**, with the **blue/teal/mint UWC
  accents** in `resources _n_aesthetics/`.
- Tokens, contrast rules, spacing, and type scale: `docs/design-system.md`.
- `[ASSUMED]` WCAG 2.1 AA. Responsive (many students are on phones).
- `[OPEN]` Is there an official UWCSEA brand guideline / logo-usage policy the
  site must follow? Does the site sit under a uwcsea.edu.sg domain or subdomain,
  and does that bring brand rules with it?
- `[OPEN]` Site name / wordmark. Working title: "Peer Coaching Hub".

## 9. Open questions that block Phase 1

Full list in `docs/open-questions.md`. The critical few:

1. **Availability + notices update mechanism** → CMS vs. static + redeploy.
2. **Hosting & domain** → who hosts it, under what URL, and does the school need
   to own it.
3. **Auth** → fully public, or parts gated behind school SSO.
4. **Content ownership after handover** → determines how editable the build must be.
5. **Safeguarding sign-off** → what student data (photos, names, emails) may be
   published, from Ellie / teacher heads.

## 10. Tech approach

### Phase 0 mockups `[ASSUMED]`
Static HTML/CSS/JS. One folder per mockup, sharing `tokens.css` from the design
system. No framework, no build — must open by double-click and be trivial to zip
or drop on a static host for Ellie to click through.

### Phase 1 recommendation `[ASSUMED — decide with the answers to §9]`
- **Content-driven static site** (e.g. Astro, or 11ty) with content as markdown /
  data files in the repo. Fast, cheap to host, accessible, good SEO, and diffs
  are readable.
- **Notices & timetable:** if a non-developer must edit them frequently, either
  (a) embed a Google Sheet / Google Calendar the coordinators own, or (b) add a
  lightweight git-based CMS (e.g. Decap/Sveltia) so edits are point-and-click.
  Avoid a heavy CMS/database unless live per-tutor availability (§7.6) forces it.
- **Forms:** link out to Google/Microsoft Forms rather than building form
  handling — keeps PDPA surface minimal.
- **Hosting `[OPEN]`:** a static host (Netlify / Vercel / Cloudflare Pages /
  GitHub Pages) unless the school requires hosting on its own infrastructure.

## 11. Out of scope

- Session booking / matching algorithm.
- Attendance tracking or analytics dashboards for coordinators.
- Accounts, messaging, or a tutor-facing portal.
- Native mobile apps.
