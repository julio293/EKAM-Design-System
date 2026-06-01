---
name: ekam-design
description: Use this skill to generate well-branded interfaces and assets for EKAM, a network of off-grid cabins in India's quietest corners — for production designs or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# EKAM — Design Skill

## Begin here

Read these in order before designing anything:

1. **`EKAM Human Interface System.md`** — the operating spine. Laws, refuse list, primitives, motion law, copy law, module recipe, QA gate. This is the authoritative document for any interactive surface. **Read end-to-end.**
2. **`EKAM Drift Audit.md`** — where the current implementation has fallen out of step with the spine. If you are fixing existing code, fix from the top of that document, not from anywhere else.
3. **`README.md`** — brand context, content fundamentals, visual foundations, iconography rules, file manifest.

Then explore:

- `colors_and_type.css` — every design token (colors, type, spacing, motion). Import this into any HTML artifact.
- **`components-canonical/`** — the single-source-of-truth primitives (Card today; Button, Field, Sheet, Tab bar, Eyebrow, Empty state to follow per `EKAM Module Rebuild Plan.md`). When designing a module, link these CSS files instead of re-authoring the styles in a chapter folder.
- `EKAM Module Rebuild Plan.md` — sequenced phases for rebuilding the seven chapters. Tells you exactly which phase to pick up.
- `preview/` — small cards demonstrating each foundational concept. Open any of them as a reference.
- `ui_kits/website/` — marketing-site recreation. JSX components and a single `index.html` demo.
- `ui_kits/guest_app/` — in-cabin tablet recreation.
- `reference/` — source brand documents (BOS v2.0, Touchpoints, Sustainability Roadmap, Brand Evolution prompts). Read these when you need the authoritative voice / rule on something.
- `assets/` — logos, sub-brand glyphs, the isolated bindu. Use these in any artifact — never re-draw the wordmark or tier glyphs from scratch.
- `fonts/` — Cormorant Garamond (10 weights) and Tiro Devanagari Hindi (2 weights) as local TTF files. Used via `@font-face` declarations in `colors_and_type.css`. Other fonts (Raleway, Inter, Caveat) load from Google Fonts.

## How to use

**If creating visual artifacts** (slides, mocks, throwaway prototypes, single-page concepts):
1. Copy `assets/` files you need into your output project.
2. Reference `colors_and_type.css` from your HTML (or inline the relevant tokens).
3. Load fonts: `fonts/CormorantGaramond-*.ttf` and `fonts/TiroDevanagariHindi-*.ttf` via @font-face; Raleway, Inter, Caveat from Google Fonts (URLs in `colors_and_type.css`).
4. Build a single static HTML file for the user to view. Keep the visual vocabulary tight: hairlines, hard edges, the rule of saffron, one bindu per composition.

**If working on production code**:
- Lift `colors_and_type.css` as your token base.
- Use the JSX components in `ui_kits/` as a structural reference, not as production code — they cut corners on accessibility, focus management, and state machines.
- Read `reference/ekam-brand-operating-system.html` end-to-end before making product decisions.

## The non-negotiable rules

These come from `reference/ekam-brand-operating-system.html` (Volume IV Identity, Volume VII Senses) and `reference/ekam_brand_guidelines_v2_revised.md`. Break them only if asked, and even then, flag it:

- **Hard edges everywhere** (`--r: 0px`). The CTA pill is the *only* allowed rounded shape.
- **One bindu per composition.** Never below 6 px on screen. Always `#B4613A`. The bindu does not pulse.
- **No gradients.** None. The BOS forbids "corporate gradient overlays" outright.
- **No emoji.** Anywhere. The brand has no emoji.
- **No exclamation marks** in copy. The sentence carries the feeling.
- **Sentence case** for marketing copy. UPPERCASE only for `.eyebrow` and `.label` UI elements.
- **Second person only** — *you, your, we, our*. Never "guests," never "visitors."
- **Cool blue tones in imagery** = the "luxury resort" failure. Warm, earth-toned, slightly desaturated.
- **Devanagari for sacred moments** (welcome cards, cabin doors, wax seals, section dividers). Never in English navigation or body copy.
- **Three locked taglines.** "Hospitality, disguised as solitude." · "No two alike." · "The most considered." Never paraphrased.

## If invoked without further guidance

Ask the user what they want to build (slide, prototype, mock, landing page, deck) and the audience. Ask whether they want variations of any specific element. Always confirm that they want to stay inside the EKAM aesthetic before producing — and if they ask for "creative" variations, propose them in a `<DCArtboard>` so the user can compare against the canonical look.

Act as an expert designer who outputs HTML artifacts *or* production code, depending on the need.
