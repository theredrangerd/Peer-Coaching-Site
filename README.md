# Peer Coaching Hub

Central website for the **Peer Coaching** programme at UWCSEA — marketing,
coordination (timetable, availability, notices, sign-ups, contacts), and a
coach-curated revision resource library.

## Status

**Phase 0 — design approval.** Building 2–3 structurally different mockups on the
UWC palette for Ellie Alchin (Head of Learning) to pick a direction. Not the
production build yet.

Live review site (GitHub Pages, auto-deploys from `main`):
<https://theredrangerd.github.io/Peer-Coaching-Site/>

| Mockup | Status |
| --- | --- |
| Landing / chooser (`mockups/index.html`) | built |
| 01 Portal — one-page dashboard | built, awaiting review |
| 02 Editorial — marketing microsite | built, awaiting review |
| 03 Library — browsable knowledge base | built, awaiting review |

All three drew their copy from `mockups/content.md` (placeholder). Next: visual
review, then a polish pass, then share the link with Ellie.

## Docs

| File | What |
| --- | --- |
| `AGENTS.md` / `CLAUDE.md` | Agent brief (tool-agnostic; `CLAUDE.md` imports `AGENTS.md`) |
| `docs/PRD.md` | Product requirements, expanded from the coordinators' notes |
| `docs/mockup-briefs.md` | The three design directions for the approval round |
| `docs/design-system.md` | UWC palette tokens, type, spacing, a11y — shared by all mockups |
| `docs/stack-decision.md` | Phase 0 = plain HTML/CSS/JS, no build (decided); Phase 1 stack still open |
| `mockups/` | The Phase 0 mockups + shared `tokens.css`/`reset.css`/`a11y.css` and the landing page |
| `mockups/content.md` | Shared placeholder copy all three mockups draw from |
| `docs/open-questions.md` | Everything still undecided; the list for coordinators / Ellie |
| `resources _n_aesthetics/` | UWC colour images + the original `site requirements.txt` |

## Working here

Read `AGENTS.md`, then `docs/PRD.md`, then `docs/open-questions.md`. Don't invent
answers to open questions — log them.
