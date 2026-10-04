# Peer Coaching Hub

Central website for the **Peer Coaching** programme at UWCSEA — marketing,
coordination (timetable, availability, notices, sign-ups, contacts), and a
coach-curated revision resource library.

## Status

**Direction chosen: the Portal.** The site is now two pages in the portal's
look, on the UWC palette. (Branch `site/portal-and-resources`; the earlier
three-mockup review round — Portal / Editorial / Library — is in git history.)

| Page | What | Status |
| --- | --- | --- |
| `mockups/index.html` — Home | Parent-first: why families choose it, how it works, subjects, flexible scheduling, coaches (profiles on a separate internal site), trust, FAQ, contacts | built; overhauled 2026-10-04 |
| `mockups/resources.html` — Revision resources | Library-style reference: past papers, video channels, learning with AI, best picks by subject, with a table filter | built; "best picks by subject" is an empty template to fill |

**Privacy rule:** the public site carries no student or coach names, photos or
achievements. Coach profiles go on a separate internal site. See `AGENTS.md`.

Next: overhaul the revision resources page. Still open: Phase 1 stack and the
build-blocking questions in `docs/open-questions.md`.

Live site (GitHub Pages, auto-deploys `mockups/` from `main`):
<https://theredrangerd.github.io/Peer-Coaching-Site/>

## Docs

| File | What |
| --- | --- |
| `AGENTS.md` / `CLAUDE.md` | Agent brief (tool-agnostic; `CLAUDE.md` imports `AGENTS.md`) |
| `docs/PRD.md` | Product requirements, expanded from the coordinators' notes |
| `docs/mockup-briefs.md` | The three design directions for the approval round |
| `docs/design-system.md` | UWC palette tokens, type, spacing, a11y — shared by all mockups |
| `docs/stack-decision.md` | Phase 0 = plain HTML/CSS/JS, no build (decided); Phase 1 stack still open |
| `mockups/` | The site pages (`index.html`, `resources.html`), their CSS/JS, and shared `shared/tokens.css`/`reset.css`/`a11y.css` |
| `docs/content-pack.md` | Early placeholder copy (no longer the source of truth for the pages) |
| `docs/open-questions.md` | Everything still undecided; the list for coordinators / [EA] |
| `resources _n_aesthetics/` | UWC colour images + the original `site requirements.txt` |

## Working here

Read `AGENTS.md`, then `docs/PRD.md`, then `docs/open-questions.md`. Don't invent
answers to open questions — log them.
