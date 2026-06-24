# EKAM Drift Audit

> Where the current implementation has fallen out of step with `EKAM Human Interface System.md`. Code-cited, ranked, and mapped to the rule it breaks.

This document is the **diagnostic companion** to the Human Interface System. The spine is the law; this is the log of where the law is currently being broken. Fix from the top of this document, not from anywhere else.

The drift here is real but **systemic, not random** — almost every issue is a pattern that was copied across 5–7 chapters. That makes the fixes high-leverage: one extracted partial undoes the same drift in seven files.

---

## How to read this

Each finding lists:
- **Where** — file:line citations.
- **Rule violated** — the HIS section number (e.g. §3 #1, §7.1).
- **Severity** — Critical / Structural / Visual / Behavioural / Hospitality.
- **Why it matters** — one sentence in human English.
- **Fix** — the prescription, sized.

Severities:
- **Critical** — breaks a non-negotiable brand rule explicitly forbidden in `README.md` or HIS §3.
- **Structural** — architectural rot: duplication, dead code, inverted ownership.
- **Visual** — fails the visual rules of the system but does not contradict the brand.
- **Behavioural** — fails interaction laws (motion, hover, press, focus).
- **Hospitality** — the rule is met, but the experience reads cold, transactional, or commercial.

---

## TIER 1 — The systemic violations

These touch every chapter. Fix once at the system level; the chapters inherit.

### S1 · `backdrop-filter: blur()` — frosted-glass surfaces

**Rule violated:** HIS §3 #2 (no frosted glass), README · transparency & blur ("backdrop-blur is forbidden — no glass cards, no frosted nav").

**Where:**
- `ekam-property/styles.css:91` — `.pdp-actions__back, .pdp-actions__btn` (top-of-photo back/share buttons, 38px circles with `backdrop-filter: blur(8px)` and `background: rgba(250,247,240,0.88)`).
- `ekam-property/styles.css:415` — `.lg-cta-bar` (lead-guest CTA bar, `backdrop-filter: blur(10px)`).
- `ekam-circle/styles.css:159` — `.saved-card__heart` (`backdrop-filter: blur(8px)`).
- `ekam-circle/styles.css:367` — `.starter__heart` (`backdrop-filter: blur(4px)`).

**Why it matters.** The brand operates an explicit rule — backdrop-blur is one of the named anti-patterns in the BOS. Frosted glass is the visual signature of a different aesthetic (Apple iOS chrome, late-2010s glassmorphism). EKAM is not that.

**Severity:** Critical (4 instances).

**Fix.** Replace the blur with a solid, slightly translucent flat fill from the palette:

```css
/* before */
background: rgba(250,247,240,0.88); backdrop-filter: blur(8px);
/* after */
background: var(--cream);
border: 1px solid var(--bone); /* if it was previously sitting on a photo */
```

For the property page's `.pdp-actions__back/btn` sitting on top of a photo, switch to a solid cream circle with a bone hairline. The photo legibility is preserved by the hairline; the glass effect is unnecessary.

---

### S2 · Forest "section gradients" — corporate gradient overlays

**Rule violated:** HIS §3 #1, §6 Surface B (forest sections are flat, not gradient), README · backgrounds (no gradients).

**Where:**
- `ekam-home/styles.css:242` — `.editorial { background: linear-gradient(180deg, #1f3525 0%, #2B4630 100%); }` — the editorial moment band.
- `ekam-property/styles.css:908` — `.pdp-screen--confirmed { background: linear-gradient(180deg, #14201A 0%, #1F3525 100%); }` — the confirmation screen background.
- `ekam-circle/styles.css:70` — `.circle-screen--dark { background: linear-gradient(180deg, #14201A 0%, #1F3525 100%); }`.
- `ekam-onboarding/styles.css:914` — `.tn-splash { background: linear-gradient(180deg, #14201A 0%, #1F3525 50%, #2B4630 100%); }`.
- `ekam-onboarding/styles.css:953` — `.tn-dark` — same pattern.
- `ekam-network/styles.css` — searched, no forest gradient (clean).

**Why it matters.** A forest section gradient is the most common slop pattern in mobile design — "make the background a bit more atmospheric." But EKAM's depth is in the photography and in the editorial italic voice, not in chrome. A flat `--forest` reads more confident than a gradient does.

**Severity:** Critical (5 instances; one pattern repeated).

**Fix.** Replace each with a flat fill:

```css
background: var(--forest); /* or var(--ink) for the deepest variant */
```

The two-stop forest gradients (`#1f3525 → #2B4630`) are doing nothing the eye can read — the difference between the stops is below the JND for a midtone green over 800px of viewport. Removing them is invisible to the user and disciplined for the system.

---

### S3 · Atmospheric "glow" box-shadows on the bindu

**Rule violated:** HIS §3 #2 (no drop shadows on UI), §3 #17 (no halos), README · shadows ("UI elements never have a shadow; elevation is hairline + tone").

**Where:**
- `ekam-home/styles.css:252` — `.editorial::before { box-shadow: 0 0 40px 10px rgba(214,135,99,0.35); }` — fake clay light source.
- `ekam-property/styles.css:120` — `.pdp-hero glow { box-shadow: 0 0 80px 18px rgba(214,135,99,0.55); }`.
- `ekam-network/styles.css:600` — `.inv-poster glow { box-shadow: 0 0 80px 18px rgba(214,135,99,0.55); }`.
- `ekam-onboarding/styles.css:919` — `.tn-splash::after { box-shadow: 0 0 20px 4px rgba(180,97,58,0.5); }`.

**Why it matters.** These were probably added to make the screens "feel atmospheric" but they're effectively the pulse-halo's static cousin — a clay glow that has no physical analogue (cabin lights do not radiate orange light in 80px haloes). The system is built on hairline-and-tone elevation; glow is the inverse of that.

**Severity:** Visual + Critical (4 instances).

**Fix.** Replace with a plain bindu dot at the same position, no shadow. If atmosphere is needed, the photograph does that job — not chrome lighting.

---

### S4 · Dead `.page__brand-wm` CSS in chapter stylesheets

**Rule violated:** Structural — dead code; also §5 (don't redefine tokens in chapter files).

**Where:**
- `ekam-home/styles.css:16-18`
- `ekam-property/styles.css:12-14`
- `ekam-circle/styles.css:12-14`
- `ekam-network/styles.css:13-15`
- `ekam-companion/styles.css:12-14`

All five files declare the page header `.page__brand-wm` CSS, but none of those chapter HTML files render a `<div class="page__brand">` — the chapter HTMLs are just React-mount harnesses. Only `EKAM Mobile - Onboarding.html` (and the Design System HTML) actually render that markup; their CSS lives inline in those HTMLs and is already correct after the F9 fix.

**Why it matters.** Five files carry dead code that, if the brand changes the wordmark construction, must be updated five times. It also means the still-incorrect "E•KAM" flex+gap layout lives on as a trap for whoever copies a chapter as a template.

**Severity:** Structural (5 files).

**Fix.** Delete the three lines from each of the five chapter stylesheets. The canonical `.page__brand-wm` rule lives once, in a shared place. If a chapter ever does render its own page header in HTML, it should `@import` the shared partial.

---

### S5 · Phone-bezel rules duplicated 6×

**Rule violated:** Structural (HIS §14 — system not chapter).

**Where:** identical `.phone`, `.phone::before`, `.phone__screen` declarations in:
- `ekam-home/styles.css:64-84`
- `ekam-property/styles.css:67-76`
- `ekam-onboarding/styles.css:227-253`
- `ekam-circle/styles.css:64-66`
- `ekam-network/styles.css:62-65`
- `ekam-companion/styles.css:61-64`

Each declares a 380×800 bezel with a 116×32 notch, 54px radius, and a heavy `0 40px 80px rgba(20,32,26,0.28)` shadow.

**Why it matters.** The phone bezel is a prototype harness, not part of the product. It should live in a single `_chapter-shell.css` partial that every chapter `@import`s. Right now, a change to the harness — a new viewport size, a notch tweak, a shadow simplification — requires editing six files in lockstep, and one will inevitably drift.

**Severity:** Structural (6 files; the largest source of duplication in the system).

**Fix.** Extract to `_chapter-shell.css` (or fold into `colors_and_type.css`). Includes `.phone`, `.phone__screen`, `.stage`, `.comp-sb` / status-bar siblings, and the chapter-page `<header>` rules. Removes ~400 lines of duplication.

---

### S6 · `.index` cell rules duplicated 5×

**Rule violated:** Structural (same as S5).

**Where:** `.index`, `.index__cell`, `.index__thumb`, `.index__cap` patterns repeated in `ekam-companion`, `ekam-property`, `ekam-circle`, `ekam-onboarding`, `ekam-network` styles.css.

**Why it matters.** Same as S5 but more painful — these were the rules that already drifted (the `translateY(-2px)` hover lift had to be fixed in five places).

**Severity:** Structural.

**Fix.** Same as S5 — extract.

---

### S7 · Heavy drop shadows on UI sheets

**Rule violated:** HIS §3 #2, §6 Surface D (sheets use hairline, not shadow).

**Where:**
- `ekam-home/styles.css:423` — `.disc__sheet { box-shadow: 0 -12px 24px rgba(20,32,26,0.10); }`.
- `ekam-property/styles.css:510` — `.pdp-sheet { box-shadow: 0 -16px 40px rgba(20,32,26,0.32); }`.
- `ekam-property/styles.css:630` — `.bw popover { box-shadow: 0 20px 40px rgba(20,32,26,0.18); }`.
- `ekam-companion/styles.css:562` — `.tray { box-shadow: 0 12px 28px rgba(20,32,26,0.30), 0 4px 8px rgba(20,32,26,0.12); }`.
- `ekam-companion/styles.css:642` — `.tray[data-tray-shape=card] { box-shadow: 0 14px 32px rgba(20,32,26,0.22), 0 4px 8px rgba(20,32,26,0.10); }`.

**Why it matters.** Sheets in EKAM lift from the bottom edge. The lift is communicated by the hairline at the top (the 1px line that serves as the grabber) and the fact that the underlying surface is dimmed by a scrim. A heavy shadow underneath the sheet says "this is a dialog" — wrong register. Calm sheets don't shout.

**Severity:** Critical (5 instances of brand-rule violation).

**Fix.** Replace all five with:
```css
border-top: 1px solid var(--bone); /* hairline only */
/* and ensure the backdrop scrim is present: background: rgba(20,32,26,0.45) on the underlying area */
```

Re-test legibility against the page underneath. If the sheet visually merges with the background, the answer is to darken the scrim, not to add shadow.

---

## TIER 2 — Chapter-specific drift

### C1 — Companion

| # | Where | Rule | Severity | Fix |
|---|---|---|---|---|
| C1.1 | `ekam-companion/styles.css:62-64` | S5 dup | Structural | Extract phone bezel. |
| ~~C1.2~~ | ~~`ekam-companion/styles.css:215`~~ | ~~HIS §3 #2 — `border-radius: 22px 22px 0 0` on the body scroll surface~~ | ~~Visual~~ | **Fixed 2026-06-02** — dropped to `border-radius: 0`. |
| ~~C1.3~~ | ~~`ekam-companion/styles.css:561-562`~~ | ~~S7 — heavy tray shadow~~ | ~~Critical~~ | **Fixed 2026-06-02** — replaced shadow with `border-top: 1px solid rgba(255,255,255,0.12)`. |
| ~~C1.4~~ | ~~`ekam-companion/styles.css:778-780`~~ | ~~HIS §8 — `player-arrive` 320ms translateY(-4) animation~~ | ~~Behavioural (low)~~ | **Fixed 2026-06-02** — `translateY(-4px)` → `translateY(8px)` to match system motion vocabulary. |
| ~~C1.5~~ | ~~`ekam-companion/styles.css:366, 401`~~ | ~~HIS §12 (44px tap targets)~~ | ~~Accessibility~~ | **Fixed 2026-06-02** — `.audio__play` 36→44px; `.reach__actions button` 40→44px. |

### C2 — Home & Discovery

| # | Where | Rule | Severity | Fix |
|---|---|---|---|---|
| C2.1 | `ekam-home/styles.css:242, 252` | S2 + S3 — editorial band gradient + glow | Critical | Flat `--forest`; remove the orange glow pseudo-element. |
| C2.2 | `ekam-home/styles.css:163, 220` | HIS §3 #1 — `linear-gradient` bottom scrim on photo cards | Visual (allowed exception) | These are photo-legibility scrims. **Acceptable**, per HIS §6 Surface E. Keep, but ensure they only appear when text actually overlays — not as default decoration. |
| C2.3 | `ekam-home/styles.css:163` | `border-bottom: 2px solid var(--bindu)` on the trip card | Visual | A 2px clay underline on a card is heavy — clay is the saffron. Drop to 1px or remove (the card sits on cream already). |
| C2.4 | `ekam-home/styles.css:475, 483` | `@keyframes fade` and `@keyframes rise` — sheet animations | Behavioural | Allowed; the `rise` uses 80px translateY which is large but within HIS §8 — acceptable for a full sheet. |
| C2.5 | `ekam-home/styles.css:548` | HIS §3 #1 — `linear-gradient(transparent → cream)` fade behind the CTA bar | Visual (borderline) | This is a fade-to-surface for legibility, not a decorative gradient. **Acceptable** as a legibility scrim, same justification as photo scrims. Flag for human review. |
| C2.6 | `ekam-home/styles.css:155, 178, 336, 484, 540, 560` | HIS §5 (radius) — `border-radius: 999px` on chips, CTAs, toggles | Visual | All of these are pill shapes. The HIS allows the pill *for the primary CTA only* (§5). Chips, weather strips, sheet handles, and toggle tracks should reconsider — toggles can stay (interaction affordance), but the weather-strip pill and the inline filter chips read OTA-cluttered. |

### C3 — Property & Booking

| # | Where | Rule | Severity | Fix |
|---|---|---|---|---|
| C3.1 | `ekam-property/styles.css:89-91, 415` | S1 — backdrop-filter blur on action buttons + CTA bar | Critical | Solid `--cream` with bone hairline. |
| C3.2 | `ekam-property/styles.css:908` | S2 — confirmation-screen forest gradient | Critical | Flat `--ink`. |
| C3.3 | `ekam-property/styles.css:120` | S3 — pdp-hero clay glow | Critical | Plain bindu dot, no shadow. |
| C3.4 | `ekam-property/styles.css:510, 630` | S7 — pdp-sheet heavy shadow + bw popover heavy shadow | Critical | Hairlines. |
| C3.5 | `ekam-property/styles.css:142` | `border-radius: 24px 24px 0 0` on the pdp-body scroll edge | Visual | Same as C1.2 — soft container under a photo. Drop to 0. |
| C3.6 | `ekam-property/styles.css:130` | `.pdp-hero__dot.on { width: 18px; border-radius: 999px; }` — the "active" hero dot stretches into a pill | Visual | Acceptable carousel indicator pattern, but `width: 18px` is the iOS HIG signature. Consider a more EKAM-native treatment: a single bindu beneath the photo as "you are looking at this one." |
| C3.7 | `ekam-property/styles.css:363-364` | `.lg-toggle` — pill-shaped 2-way segmented control with `border-radius: 999px` | Visual | The segmented control is OK but the pill border-radius is iOS-native. A 0-radius bone-bordered toggle is more EKAM. |
| C3.8 | `ekam-property/styles.css:344, 370, 382, 433` | 44–52px avatar circles using clay as fill | Visual | Avatars using clay-on-cream as their fill is **second-accent territory** if many avatars appear on one screen (the lead-guest list has many). The first avatar is OK; the second turns a screen into a clay-spotted dashboard. Use cream-with-bindu-border for non-first avatars. |
| C3.9 | `ekam-property/styles.css:910` | The whole confirmed screen | Hospitality | Confirmation reads as a "success state". Per HIS §9, success in EKAM is a quiet line, not a screen. Audit whether this whole screen earns its place or could be a sheet on top of the property page. |

### C4 — Onboarding

| # | Where | Rule | Severity | Fix |
|---|---|---|---|---|
| C4.1 | `ekam-onboarding/styles.css:336, 340` | HIS §3 #1 — fade-to-cream / fade-to-forest gradients behind CTA bars | Visual (borderline) | Same as C2.5. **Acceptable as legibility scrim** under sticky CTA. Flag. |
| C4.2 | `ekam-onboarding/styles.css:386-388, 807-810` | Removed ambient-glow animations (fixed in F1) | — | Already fixed; verify by greps. |
| C4.3 | `ekam-onboarding/styles.css:574` | `.elev__hud` cream→sand gradient header | Critical | Flat `--sand`. |
| C4.4 | `ekam-onboarding/styles.css:914, 953` | S2 — tn-splash and tn-dark gradients | Critical | Flat `--ink`. |
| C4.5 | `ekam-onboarding/styles.css:919` | S3 — bindu glow on the splash | Critical | Remove the box-shadow; keep the dot. |
| C4.6 | `ekam-onboarding/styles.css:948, 949` | tn-light `slider` gradient + slider after dot | Visual | These are the "preview mockup" elements that demonstrate the *system itself* — they're meta. **Acceptable** as long as they remain inside the tn- prefix and don't leak into the real onboarding chrome. |
| C4.7 | `ekam-onboarding/styles.css:374, 796` | `border-radius: 42px` on splash and done screens | Visual | These match the phone-screen inner radius and are part of the phone harness. Acceptable, but ideally inherited from a shared variable so a change to bezel inner-radius doesn't break two splashes. |
| C4.8 | `ekam-onboarding/styles.css:489, 543, 583, 599, 606, 642` | Multiple `box-shadow: 0 0 0 N` halo rings on bindu dots | Critical (HIS §3 #17) | These are not pulses, but they are halo rings — same anti-pattern. The bindu has a colour and a position; it does not need a halo to be seen. Remove all of them. |
| C4.9 | `ekam-onboarding/styles.css:400-403` | `splash-arrive` 1400ms translateY animation | Behavioural | Long (1400ms is on the upper end of `--dur-arrive: 640ms`). Either reduce to 640ms or treat this as a brand-paced "arrival" and document the exception. |

### C5 — Saved, Profile, Mudra, Referral (network + circle)

| # | Where | Rule | Severity | Fix |
|---|---|---|---|---|
| C5.1 | `ekam-circle/styles.css:70` | S2 — circle-screen--dark gradient | Critical | Flat `--ink`. |
| C5.2 | `ekam-circle/styles.css:130, 159, 367` | S1 — backdrop-blur on saved-card hearts and starter hearts | Critical | Solid cream with hairline. |
| C5.3 | `ekam-circle/styles.css:117` | `.circle-tabbar__tab::before` — a 4px outline dot above each tab label | Visual | A dot above every tab label is decoration, not a state. The active tab is identified by the clay underline; the dot is noise. Remove. |
| C5.4 | `ekam-network/styles.css:319-322` | `repeating-linear-gradient` — a striped texture as a background | Visual | The repeating gradient is technically a gradient, but it's used as a texture, not a colour transition. Borderline — closer to noise than to corporate gradient. If it survives, document it as the **only** allowed repeating-gradient and lock it to `<MudraMap>` only. |
| C5.5 | `ekam-network/styles.css:600` | S3 — invitation glow | Critical | Remove. |
| C5.6 | `ekam-network/styles.css:655` | HIS §6 Surface E — photo scrim on inv-poster | Visual (allowed) | This is a legitimate two-stop photo scrim (top + bottom). Acceptable. |
| C5.7 | `ekam-circle/styles.css:251` | `border-radius: 50%` on a dashed-bordered "add to starter" tile | Visual | A dashed circle is twice the chrome of a dashed square. EKAM is hard edges — the dashed border can stay (it signals affordance) but the circle should be a square. |

---

## TIER 3 — Single-instance drift

Listed for completeness; lower priority.

| # | Where | Issue |
|---|---|---|
| T3.1 | `ekam-onboarding/styles.css:489` | Bindu inside intent-card uses double-ring `box-shadow: 0 0 0 2px var(--cream), 0 0 0 3px var(--bindu)`. Replace with `border: 2px solid var(--cream); outline: 1px solid var(--bindu)`. |
| T3.2 | `ekam-property/styles.css:130` | Hero carousel dot pill-stretch — see C3.6. |
| T3.3 | `ekam-property/styles.css:855` | `.pdp-step button:active` (already fixed in F3 to remove `scale(0.94)`). Verify. |
| T3.4 | `ekam-companion/styles.css:215` | See C1.2 — body scroll round corners. |
| T3.5 | All chapters | The `:hover` state on most interactive elements is **missing a `:focus-visible` equivalent** (HIS §12). Cleaned up at the global level in `colors_and_type.css` (F8), but per-component fallbacks (`outline: none` overrides) should be removed where they exist. |

---

## TIER 4 — Copy and hospitality drift

Did a sweep of visible copy strings in the Companion screens and selected others. Findings:

| # | Where | Issue | Fix |
|---|---|---|---|
| K1 | Companion service request labels — "Add to tray", "Send to host" | Verb-tense fine; "tray" reads kitchen-app. The cabin's analogy is *a tea tray*, which is fine in the kitchen module, but as a general-purpose mechanic ("send to tray") it veers ecommerce. | Acceptable in the kitchen sub-module; rename to "Place by the door" or similar elsewhere. |
| K2 | Onboarding screen titles | Audit not done; should be checked against HIS §9 (sentence case, no exclamations, ≤2-word buttons). |
| K3 | Property page "Reserve" CTA | Compliant with HIS §7.1. ✓ |
| K4 | "Find your Ekam" CTA (per components/Hero.jsx:22) | Compliant. ✓ |
| K5 | The booking confirmation screen (C3.9) | Whole-screen success state. Audit whether it could be a sheet or a quiet line. |

---

## What's already fixed (for reference)

These were resolved in earlier passes — recorded here so a future contributor doesn't redo them.

| ID | Fix | Files |
|---|---|---|
| F1 | All bindu pulse/breath/glow animations removed | companion, property, circle, onboarding, network |
| F2 | `.index__cell` hover `translateY(-2)` removed across 5 chapters | all 5 |
| F3 | `.pdp-step button:active scale(0.94)` removed | property |
| F4 | `.pin:hover scale(1.4)` removed | home |
| F5 | `tray-arrive` scale-bounce replaced with calm fade | companion |
| F6 | `.onhouse--celebrate` gradient flattened | companion |
| F7 | Duplicate dead `.kit-add:hover` removed | companion |
| F8 | Runaway 500ms `setInterval` removed | Companion HTML |
| F9 | `:focus-visible` rule added globally | colors_and_type.css |
| F10 | `prefers-reduced-motion` block added globally | colors_and_type.css |
| F11 | Wordmark construction fixed across 38+ instances | colors_and_type.css, Design System, Onboarding, Deck, OS chapters, Gamma templates |
| F11-CORRECTION | **F11 was applied in the wrong direction and is hereby reversed.** F11 floated the bindu *above the A* based on a non-canonical caption in the Design System page. The authoritative source (BOS v2.0 · Ch.15, 18A, 18I — `uploads/ekam-logo-guidelines.pdf`) is explicit: the bindu sits **between E and K, on the cap-midline; never above any letter** (Ch.18I misuse item 01: "Do not float the Bindu above the K… Never above any letter."). Reverted all markup to `E<span class="dot"></span>KAM` and rewrote every wordmark's CSS to place the dot inline between E and K, vertically on the cap-midline, sized ~0.12em (13% cap-height), fill #B4613A always. The `.wm-a` float helper in `colors_and_type.css` was replaced with a correct `.ekam-wm` geometry helper. Touched: colors_and_type.css, EKAM Mobile - Design System.html, Onboarding(+print), Deck, ekam-onboarding (jsx+css), ekam-{home,circle,companion,property,network}/styles.css, ekam-os/_chrome.css + 02-spatial-type.html + 6 chapter HTMLs, gamma-package ×2, screens/index.html, EKAM Human Interface System.md. | (system-wide) |
| F15 | **Companion C1.2–C1.5 + partial S7** — Fixed four Companion drift issues: (1) `.comp-home-body border-radius: 22px 22px 0 0` → `0` (soft iOS container gone); (2) `.tray` and `.tray[data-tray-shape=card]` drop-shadows replaced with `border-top: 1px solid rgba(255,255,255,0.12)` hairlines; (3) `player-arrive` keyframe corrected to `translateY(8px → 0)` matching system motion vocabulary; (4) `.audio__play` 36→44px and `.reach__actions button` 40→44px (WCAG tap-target floor). Also: `AmbientRidge` SVG animation now respects `prefers-reduced-motion` via JS conditional render. | `ekam-companion/styles.css`, `ekam-companion/screens.jsx` |
| F14 | **Select chevron oversized** — `.ds-select` had a chevron SVG as `background-image` with no `background-size`, so it stretched to a large clumsy arrow. Added `background-size: 11px 8px`. | `EKAM Mobile - Design System.html` |
| F12 | **Rounded-corner brand violation in Design System page** — `.brand-base` and `.brand-card` had `border-radius: 14px`, `.imagery` had 14px, `.img-rules__col` had 8px. The brand mandate is hard edges (`--r: 0`); the CTA pill is the only exception. All four flattened to 0. | `EKAM Mobile - Design System.html` |
| F13 | Pulsing `.pulse-dot::before` animation surviving in the Design System page's inline `<style>` — same bindu-pulse violation that was fixed in chapter CSS, but this instance lived in the documentation page itself, demonstrating the wrong rule. Animation removed; the dot now sits still. | `EKAM Mobile - Design System.html` |

---

## Recommended remediation order

If you have **one day**, do this in order — each item undoes the most drift per minute of work:

1. **S1** — kill four `backdrop-filter` instances. 15 minutes. Removes a critical brand violation across two chapters.
2. **S2** — flatten five forest gradients. 30 minutes. Removes the most common slop pattern.
3. **S3** — remove four clay glows. 15 minutes.
4. **S7** — replace five sheet drop-shadows with hairlines. 30 minutes.
5. **C4.8** — remove the ten bindu halo rings in onboarding. 20 minutes.

**Total: ~2 hours.** Every chapter is now flat, hairlined, and free of glow.

If you have **a week**, add:

6. **S4** — delete five dead `.page__brand-wm` CSS blocks. 5 minutes.
7. **S5 + S6** — extract `_chapter-shell.css` with the phone bezel and index cell rules. Half a day; ripples through 7 files. Removes ~400 lines of duplication.
8. **C3.1–C3.9** — full Property chapter pass. Two days.
9. **C1.1–C1.5** — Companion pass. One day.
10. **C2.1–C2.6, C4.1–C4.9, C5.1–C5.7** — Home, Onboarding, Circle, Network passes. Half-day each.

---

## What this audit does not cover

- **Visual design of new modules.** That belongs in the HIS and the Module Recipe, not here.
- **Performance.** Rendering perf, image loading, asset sizing — separate audit.
- **Information architecture.** The seven-question map in HIS §1 is the IA contract; auditing it requires user research, not code reading.
- **Accessibility beyond colour contrast and tap targets.** A real a11y pass should run axe-core on every chapter HTML. Recommended as the next audit.
- **Copy beyond a spot-check.** A full copy pass against HIS §9 would surface dozens more strings.

---

## Governance

When a finding here is fixed, **move it to the "What's already fixed" table** with a fix ID. Do not delete it — the record is part of the system's memory.

When a new violation is introduced, **add a finding here**, do not amend the HIS to permit it. The HIS is the law; this is the log.

---

*Last revised 2026-05-28. Companion to `EKAM Human Interface System.md`.*
