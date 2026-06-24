# EKAM Module Rebuild Plan

> The sequenced, dependency-aware roadmap for rebuilding the seven mobile chapters against `EKAM Human Interface System.md`. Designed so any Claude session — fresh or continuing — can pick up at any phase and know exactly what to do.

---

## How to use this document

Each phase below has:

- **Scope** — what is in, what is out.
- **Deliverable** — the artifact a session produces.
- **Time** — realistic estimate for a focused session (one Claude session = ~30–90 minutes of work).
- **Depends on** — earlier phases that must be complete.
- **Exit criteria** — what "done" looks like, checkable from code.
- **Hand-off note** — what to tell the next session.

**Picking up a phase:**

1. Open `EKAM Human Interface System.md` (the spine) and `EKAM Drift Audit.md` (the diagnostics).
2. Find the lowest-numbered phase whose dependencies are met but whose exit criteria are not.
3. Read its scope and start there.
4. When done, **update this document** — mark the phase complete, write a one-line hand-off note for the next session.

---

## The big picture

```
Phase 0 — Foundation (shared system)
   │
   ├── Phase 1 — High-leverage drift cleanup (4 patterns × 5–7 files)
   │       │
   │       └── Phase 2 — Canonical primitives (rebuild 8 components)
   │                │
   │                └── Phase 3 — Chapter migrations (7 chapters, sequenced)
   │                         │
   │                         └── Phase 4 — Polish (a11y, copy, motion review)
```

Each phase is independently shippable. Phases 0–2 are system work; Phase 3 is the chapter-by-chapter application.

---

## Phase 0 — Foundation

**Goal:** Extract the duplication so chapter work doesn't keep multiplying it.

**Scope (in):**
- Create `components-canonical/` folder.
- Create `components-canonical/_chapter-shell.css` containing the rules currently duplicated in 6 chapter stylesheets: `.phone`, `.phone::before`, `.phone__screen`, `.stage`, the chapter-page header (`.page__brand`, `.page__brand-wm`, `.page__brand-dev`, `.page__title`, `.page__eyebrow`), and the `.index*` cell grid.
- Add `<link rel="stylesheet" href="components-canonical/_chapter-shell.css">` to every chapter HTML.
- Delete the duplicated rules from each chapter's `styles.css`.

**Scope (out):**
- Visual changes. This is a refactor; no pixel moves.
- New components.

**Deliverable:**
- One new file: `components-canonical/_chapter-shell.css` (~150 lines).
- Edits to 7 chapter HTML files (each adds the link).
- Edits to 6 chapter `styles.css` files (each loses ~80 lines).

**Time:** 60–90 minutes.

**Depends on:** Nothing.

**Exit criteria:**
- `grep -r '.phone {' .` returns exactly one result (in `_chapter-shell.css`).
- `grep -r '.index__cell' .` returns exactly one result.
- Every chapter page renders identically to before the extraction (visual diff = zero).

**Hand-off note when done:** "Phase 0 complete. _chapter-shell.css is the single source of truth for the phone harness and the index cell. Phase 1 can start."

---

## Phase 1 — High-leverage drift cleanup

**Goal:** Eliminate the four systemic violations from the Drift Audit's Tier 1. These touch every chapter and are the highest-leverage fixes per minute.

**Scope (in):**

Run through the Drift Audit's Tier 1 in this order:

1. **S1 — backdrop-filter blur** (4 instances). Replace with solid cream + hairline. Files: `ekam-property/styles.css`, `ekam-circle/styles.css`.
2. **S2 — forest section gradients** (5 instances). Flatten to `--forest` or `--ink`. Files: `ekam-home`, `ekam-property`, `ekam-circle`, `ekam-onboarding`.
3. **S3 — clay glow box-shadows** (4 instances). Remove the shadow; keep the dot. Files: `ekam-home`, `ekam-property`, `ekam-network`, `ekam-onboarding`.
4. **S7 — sheet drop-shadows** (5 instances). Replace with `border-top: 1px solid var(--bone)`. Files: `ekam-home`, `ekam-property`, `ekam-companion`.

**Scope (out):**
- Tier 2 chapter-specific drift. That happens during Phase 3 (chapter migrations).
- New primitives. That's Phase 2.

**Deliverable:**
- Edits to ~6 chapter stylesheets.
- An updated entry in `EKAM Drift Audit.md` under "What's already fixed" for each completed item (F12, F13, F14, F15).

**Time:** 90–120 minutes.

**Depends on:** Phase 0 (cleanest order — Phase 0 first means you don't fix the same rule in 5 files).

**Exit criteria:**
- `grep -r 'backdrop-filter' .` returns zero results.
- `grep -r 'linear-gradient(180deg, #1' .` returns at most: known photo scrim instances (HIS §6 Surface E exception).
- `grep -r 'box-shadow: 0 0 .* rgba(214,135,99' .` returns zero results (no clay glows).
- Sheets in Home, Property, Companion: no `box-shadow` on `.disc__sheet`, `.pdp-sheet`, `.tray`.

**Hand-off note when done:** "Phase 1 complete. All four systemic Tier 1 violations cleared. The system is now flat and hairlined as the brand mandates. Phase 2 (canonical primitives) can start."

---

## Phase 2 — Canonical primitives

**Goal:** Build, in `components-canonical/`, one CSS partial per primitive listed in HIS §7. Each primitive lives in exactly one place; chapters consume it.

This is **Option C from the parent project** — built incrementally, one primitive per session.

### Phase 2.1 — Card (THE highest-leverage primitive)

Status: **scaffolded** (see `components-canonical/Card.html` and `Card.css`). One chapter still needs to migrate to it.

**Scope (in):**
- `components-canonical/Card.css` — the canonical card CSS, including:
  - The base card (sand surface, bone hairline)
  - The photo slot (4:5 default, 16:11 wide variant)
  - The eyebrow row (with tier-glyph slot, eyebrow metadata, optional save heart)
  - The title (Cormorant Garamond)
  - The body (Raleway)
  - The metadata strip
  - The chevron affordance
- `components-canonical/Card.html` — a reference page showing:
  - The four variants (Kutir / Van / Shikhar / Chai) with their tier glyphs
  - Three sizes (sm dense / md default / lg hero)
  - Before/after for each chapter that currently has a different card.

**Scope (out):**
- Migrating chapters to it. That's Phase 3.

**Deliverable:**
- Two files in `components-canonical/`.
- A note in `EKAM Human Interface System.md` §7.4 pointing at the canonical Card file.

**Time:** 60–90 minutes.

**Depends on:** Phase 1 (don't build a primitive on top of drift).

**Exit criteria:**
- `components-canonical/Card.html` opens, shows all four tier variants, all three sizes.
- The CSS is copy-pasteable into a chapter and produces the expected card with no modification.

**Hand-off note when done:** "Card primitive scaffolded. Next session: continue with Phase 2.2 (Button), or jump to Phase 3.1 (Home migration to canonical Card) if Buttons can wait."

### Phase 2.2 — Button

**Scope:** Promote `.btn-primary` / `.btn-secondary` from the chapters into `components-canonical/Button.css`. Current implementations are *almost* consistent — the eyebrow text, the small bindu prefix dot, the pill border. Audit, normalise, ship.

**Time:** 30–45 minutes.

**Exit criteria:** All seven chapter buttons render from the same CSS file.

### Phase 2.3 — Field

**Scope:** Build the bottom-line input pattern (HIS §7.3). Currently every chapter rolls its own; some use boxed inputs (drift). Normalise to bottom-line only.

**Time:** 45 minutes.

### Phase 2.4 — Sheet

**Scope:** The canonical bottom sheet (HIS §6 Surface D / §7.5). Includes the 1px clay grabber, the rise animation, the dismiss patterns. Replaces 5 chapter-specific sheets after Phase 1 has stripped their drop-shadows.

**Time:** 60 minutes.

### Phase 2.5 — Tab bar

**Scope:** The five-tab persistent navigation. Currently varies by chapter; unify into one component with the clay-underline active state (no badges, no hide-on-scroll).

**Time:** 60 minutes.

### Phase 2.6 — Eyebrow + Empty state

**Scope:** Both are mostly utility classes already. Ship as small partials in `components-canonical/` for discoverability.

**Time:** 30 minutes.

### Phase 2.7 — Tier glyphs

Status: **complete** — `assets/glyph-*.svg` are canonical, documented in Design System page §01 sub-block, sized rules in HIS §7.9.

**Remaining:** ensure every chapter that should display a tier glyph (per HIS §7.9) does. This happens during Phase 3.

**End of Phase 2:** All eight primitives have a single source of truth in `components-canonical/`. Future chapter work is composition, not authoring.

---

## Phase 3 — Chapter migrations

**Goal:** Walk each chapter against the spine and the canonical primitives, applying the relevant Tier 2 drift fixes from the Drift Audit.

**Order is deliberate** — earlier chapters establish patterns that later ones inherit.

### Phase 3.1 — Home & Discovery

**Why first:** Highest-traffic surface (every session starts here). Drift is medium, primitives are simple. Proving the system here builds confidence for the harder ones.

**Scope (in):**
- Migrate `.trip-card`, `.rail-card`, `.saved-row`, `.disc__sheet-row` to canonical Card.
- Add tier glyphs to every card (Kutir / Van / Shikhar identification, HIS §7.9).
- Apply Drift Audit C2.1–C2.6 (editorial-band gradient, glow, weather-strip pills).
- Audit copy against HIS §9.

**Out:** Map view chrome — separate effort.

**Deliverable:** `ekam-home/styles.css` shrinks; chapter renders against canonical primitives.

**Time:** 2–3 hours (one focused session).

**Depends on:** Phase 2.1 (Card), Phase 2.2 (Button).

**Exit criteria:**
- No `.trip-card`/`.rail-card`/`.saved-row` rules in `ekam-home/styles.css` — all replaced by the canonical Card with chapter-specific copy.
- Every cabin card displays its tier glyph.
- QA gate (HIS §13) passes.

### Phase 3.2 — Property & Booking

**Why second:** Highest drift severity (8 critical items in Drift Audit C3). Biggest visual improvement from a single session. Hardest, so do it while momentum is fresh.

**Scope (in):**
- Apply Drift Audit C3.1–C3.9 in full.
- Migrate the booking sheet to canonical Sheet.
- Re-evaluate the confirmation screen against HIS §9 (consider sheet vs full screen).
- Tier glyph on the property hero, top-left.

**Time:** 3–4 hours (could be split across two sessions: hero + booking flow on day 1, confirmation + lead-guest on day 2).

**Depends on:** Phase 2.1, 2.4 (Sheet), 2.2.

**Exit criteria:** Every Tier 2 finding under C3.* in the Drift Audit moves to "What's already fixed."

### Phase 3.3 — Saved & Membership (Circle)

**Why third:** Saved cabin rows share the Home card pattern — gets the win for free now that Home is migrated. Membership module is small.

**Scope:** Drift Audit C5.1–C5.7.

**Time:** 90 minutes.

**Depends on:** Phase 3.1 (cards already in canonical form).

### Phase 3.4 — Companion

**Why fourth:** In-stay surface; valued users; drift is moderate but specific (tray patterns are well-defined).

**Scope:** Drift Audit C1.1–C1.5. The tray is its own primitive variant — add it to `components-canonical/Tray.css` if Phase 2.4 didn't cover.

**Time:** 2 hours.

### Phase 3.5 — Onboarding

**Why fifth:** Critical drift (10 halo rings, gradients, multiple sheet patterns) but lower frequency — users see it once. Worth doing after the in-trip flows.

**Scope:** Drift Audit C4.1–C4.9.

**Time:** 2 hours.

### Phase 3.6 — Profile, Mudra & Referral

**Scope:** Settings-style page; least drift. Mostly normalising `.field` to canonical and removing the avatar clay-spotting (C3.8 reference).

**Time:** 60–90 minutes.

### Phase 3.7 — Network

**Scope:** The map + editorial-list pattern. Drift is light. The repeating-gradient on `MudraMap` needs a brand decision (Drift Audit C5.4).

**Time:** 90 minutes.

---

## Phase 4 — Polish

**Goal:** Three thin passes across the whole system.

### Phase 4.1 — Accessibility audit

- Run axe-core on every chapter HTML.
- Verify HIS §12 floor: 44px tap targets, focus-visible everywhere, prefers-reduced-motion, lang tags on Devanagari.

**Time:** 90 minutes.

### Phase 4.2 — Copy review

- Walk every screen with `EKAM Human Interface System.md` §9 and `README.md` content fundamentals open.
- Re-read aloud; flag anything that doesn't sound like a person.

**Time:** 2 hours.

### Phase 4.3 — Motion review

- Walk every screen with HIS §8 open. Confirm: no scale, no rotate, no pulse, no bounce. Reduced-motion honoured.

**Time:** 60 minutes.

---

## Realistic timeline

If one session = ~60 minutes of focused work:

| Phase | Sessions |
|---|---|
| Phase 0 | 1 |
| Phase 1 | 2 |
| Phase 2 (7 primitives) | 6 |
| Phase 3.1 Home | 2 |
| Phase 3.2 Property | 3 |
| Phase 3.3 Circle | 1 |
| Phase 3.4 Companion | 2 |
| Phase 3.5 Onboarding | 2 |
| Phase 3.6 Profile | 1 |
| Phase 3.7 Network | 1 |
| Phase 4 | 3 |
| **Total** | **~24 sessions** |

That is the **honest scope**. Not "we'll rebuild it all next week." This is six-week-of-real-work scope, sized for sessions.

---

## What done looks like

When Phase 4 ends:

- `components-canonical/` contains eight primitive CSS partials, each authoritative.
- Every chapter `styles.css` is a thin layer of chapter-specific styling on top of the canonical primitives — average 200 lines per chapter, down from the current 500–1000.
- Every Tier 1 and Tier 2 finding in `EKAM Drift Audit.md` is in the "What's already fixed" table.
- Every screen passes the HIS §13 QA gate without remediation.
- A new module added against this system inherits everything by default and only needs to author its chapter-specific copy + composition.

That is the point of a design system. Discipline becomes the product.

---

## Progress tracker

Update this table at the end of every session. The next session reads this table first.

| Phase | Status | Session count | Last update | Note |
|---|---|---|---|---|
| Phase 0 — Foundation | Not started | 0 | — | _chapter-shell.css to be extracted |
| Phase 1 — Drift cleanup | Not started | 0 | — | After Phase 0 |
| Phase 2.1 — Card | **In progress** | 1 | 2026-05-28 | Scaffolded in components-canonical/; needs chapter migration |
| Phase 2.2 — Button | Not started | 0 | — | |
| Phase 2.3 — Field | Not started | 0 | — | |
| Phase 2.4 — Sheet | Not started | 0 | — | |
| Phase 2.5 — Tab bar | Not started | 0 | — | |
| Phase 2.6 — Eyebrow + Empty | Not started | 0 | — | |
| Phase 2.7 — Tier glyphs | **Complete** | 1 | 2026-05-28 | Standalone SVGs canonical; documented in Design System §01 + HIS §7.9 |
| Phase 3.1 — Home | Not started | 0 | — | |
| Phase 3.2 — Property | Not started | 0 | — | |
| Phase 3.3 — Circle | Not started | 0 | — | |
| Phase 3.4 — Companion | **In progress** | 1 | 2026-06-02 | C1.2–C1.5 fixed; C1.1 (phone-bezel extraction) deferred to Phase 0 |
| Phase 3.5 — Onboarding | Not started | 0 | — | |
| Phase 3.6 — Profile | Not started | 0 | — | |
| Phase 3.7 — Network | Not started | 0 | — | |
| Phase 4.1 — A11y | Not started | 0 | — | |
| Phase 4.2 — Copy | Not started | 0 | — | |
| Phase 4.3 — Motion | Not started | 0 | — | |

---

## For the next session — start here

Read in this order:

1. **This document** — find the lowest in-progress / not-started phase whose dependencies are met.
2. **`EKAM Human Interface System.md`** — the law.
3. **`EKAM Drift Audit.md`** — the specific findings your phase will address.
4. **The chapter or component you're touching** — read its current state in code before changing anything.

Then work the phase. Then update this document's progress tracker before ending.

The discipline is the product.

---

*Last revised 2026-05-28. Companion to `EKAM Human Interface System.md` and `EKAM Drift Audit.md`.*
