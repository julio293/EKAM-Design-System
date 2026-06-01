# EKAM Design System

> **एकम्** — *The One.* Hospitality, disguised as solitude.

The design system for **EKAM**, a network of off-grid cabins in India's quietest corners — a hospitality brand whose moat is not luxury but the *permission* to build inside buffer zones, forest leases, and ridgelines where most operators legally cannot go. The cabin is the consistent vessel; the landscape is what makes every stay singular.

---

## What EKAM is

**EKAM** is the master brand. Sanskrit for *the one* — singular presence, unity, the indivisible. Founded by Abhishek Singh; sustainability-led, Indian-context, modular, regenerative.

The brand operates a **three-tier product architecture** plus a **hospitality / route network**:

| Tier | Sanskrit | English | Position |
|---|---|---|---|
| **KUTIR** | कुटीर | The Hut | Standard cabin — Kutir/Van periphery, 2 adults, essential comfort |
| **VAN** | वन | The Forest | Premium cabin — forest immersion, tents/platforms, 2–4 adults |
| **SHIKHAR** | शिखर | The Peak | Luxury retreat — ridgeline cabins, private vistas, full solitude |
| **CHAI** | (network layer) | The Hospitality | F&B inside properties first, standalone waystations later |

Three pillars: **Singular · Serene · Wild.**
Three taglines, never paraphrased:
- "Hospitality, disguised as solitude." — master expression
- "No two alike." — signature
- "The most considered." — competitive frame

### Audience (refined positioning)
EKAM is **welcoming, not gatekeeping**. The brand invites people who have scrolled past beautiful photos for years and want to know what those places *actually feel like* — not luxury seekers, not wellness retreaters, not adventure tourists. Real landscapes. Real light. Real silence.

### Geography
Initial sites in Kalpa/Nako (Shikhar, 3200m+), Chitkul/Sangla valleys (Kutir, 2100–2400m), Baspa Valley canopy (Van, 1800–2200m). All Himalayan; future sites must meet the **Site Evaluation Worksheet** in the Sustainability Roadmap.

---

## Source materials (provided)

All originals copied into `reference/`. No external Figma or codebase was attached — every visual decision here is grounded in:

- `reference/ekam_brand_guidelines_v2_revised.md` — Brand Guidelines v2.0 (palette, type, voice, do/don't)
- `reference/ekam-brand-operating-system.html` — **The Brand Operating System v2.0** (eleven volumes; the definitive document). Authored as a long-form HTML manual.
- `reference/ekam-touchpoints.html` — **The Touchpoints** (12 physical artifacts: welcome card, wax seal, match box, mug, property map, letterpress, journal, cabin number plate, monolith, lantern, etc). The texture library.
- `reference/ekam_sustainability_roadmap.md` — Founder's letter to investors; capex, land doctrine, operations.
- `reference/ekam_brand_evolution_prompt.md` (+ `_1`, `_2`) — The repositioning brief from exclusive → welcoming.
- `assets/ekam-logo.png` — Source wordmark.
- `uploads/ekam_brand_operating_system_v3.1_DRAFT.docx` — Founder draft; not parsed (BOS v2.0 supersedes it per the manual's own prologue).

> No Figma file, no production codebase, and no live website were provided. Components in `ui_kits/` are recreations from the BOS + Touchpoints HTML documents, which are themselves carefully designed reference artifacts — treat them as the source of truth.

---

## Index — what lives where

```
README.md                          ← you are here
SKILL.md                           ← Claude Code skill entry point
colors_and_type.css                ← tokens: colors, type, spacing, motion
assets/
  ekam-logo.png                    ← raster wordmark
  wordmark.svg                     ← primary wordmark (forest on cream)
  wordmark-reverse.svg             ← reverse (cream on forest)
  wordmark-stacked.svg             ← एकम् stacked above EKAM (cabin doors, narrow)
  glyph-kutir.svg                  ← hut outline
  glyph-van.svg                    ← three trees
  glyph-shikhar.svg                ← mountain peak
  glyph-chai.svg                   ← steaming cup
  bindu.svg                        ← the sacred clay dot, isolated
preview/                           ← Design System tab cards (one per concept)
ui_kits/
  website/                         ← marketing website kit (KUTIR, VAN, SHIKHAR, booking)
  guest_app/                       ← in-cabin tablet / guest mobile app kit
reference/                         ← source brand documents (read-only context)
```

Run any preview card or UI kit directly — every file references `colors_and_type.css` and Google Fonts; nothing needs a build step.

---

## CONTENT FUNDAMENTALS — how EKAM speaks

**Register.** A close friend who owns a cabin in the forest and is handing you the key. Warm, unhurried, quietly confident in silence. Hospitality, not hype.

**Person.** Always second person — *you, your, we, our*. Never "guests," never "visitors," never third-person distance.

**Sentence shape.** Short. Incomplete. Allowed to breathe.
- ✓ "Your cabin is waiting. The fire is lit."
- ✗ "Your luxurious cabin experience is awaiting your arrival with a fully prepared fireplace."

**Casing.** Sentence case for headlines and body. UPPERCASE only for `.eyebrow` and `.label` UI elements (Inter 500, 11px, letterspacing 3–4px). Title Case is forbidden for marketing copy — it reads commercial.

**Punctuation.**
- Period, comma, em-dash allowed.
- Semicolons used sparingly.
- **No exclamation marks. Ever.** The sentence carries the feeling.
- No multiple punctuation. No "!!", no "...!", no "?!"
- Em-dashes (—), not double hyphens.

**Numbers & units.** Always with the unit. *3200m*, *14°C*, *45 days*, *₹8 lakh*. Indian conventions: lakh, naali, km.

**Sanskrit.** Used as moments, not as decoration. एकम्, कुटीर, वन, शिखर appear on welcome cards, cabin doors, wax seals, and section dividers — **never** inside English navigation, body copy, or as substitute words. Always in Tiro Devanagari Hindi, clay-orange.

**Emoji.** None. The brand has no emoji. No 🌲, no 🏡, no ☕. Decorative emoji on a wordmark or in copy is a Restricted Application per the BOS.

**Vocabulary — preferred.**
forest · stillness · arrival · solitude · wild · unhurried · breathe · fire · tea · mist · dawn · ridge · sit · notice · settle · real · actual

**Vocabulary — forbidden.**
luxury · deal · offer · book now · unlock · limited time · epic · insane · best-ever · transformation · exclusive · inhabit (post-evolution) · curated experience · ultimate

**Tone shifts since the evolution brief:**
| Old (exclusive) | New (welcoming) |
|---|---|
| "Inhabit the view" | "Sit in the view" |
| "Rare altitude" | "The mountains feel different at this altitude. Come find out." |
| "Become part of the place" | "Connect with the place" |
| "Live inside the forest" | "Experience the forest as it actually feels" |

**Frames that work:**
- *"Your cabin is waiting. The fire is laid. The kettle is on."* — Welcome card.
- *"At 3200m, the world feels different. Come find out how."* — Shikhar.
- *"These valleys made you pull over on the drive. We thought you might want to stay awhile."* — Kutir.
- *"Forests are better experienced than photographed. This is where you'll understand why."* — Van.

**Five guest-facing messages per stay, no more.** Confirmation, directions PDF, day-before SMS, post-stay letter, four-week postcard. Volume is a brand decision.

---

## VISUAL FOUNDATIONS

### Colors — earth before accent

Eight tokens. The palette comes from an Indian forest at dusk.

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#14201A` | primary text, deepest forest |
| `--forest` | `#2B4630` | hero surfaces, dark sections |
| `--moss` | `#7A8A6B` | secondary text, muted labels |
| `--sage` | `#C9D6BC` | onforest body voice |
| `--cream` | `#FAF7F0` | page background |
| `--sand` | `#F4EDE1` | light cards, panels |
| `--bone` | `#ECE4D3` | hairlines, tertiary surface |
| `--mist` | `#D8D3C4` | dividers |
| `--bindu` | `#B4613A` | the only accent. Sacred. |

**Usage ratio:** 60% Cream/Sand · 30% Forest · 8% Ink · 2% Bindu Clay. Bindu behaves like saffron in food: small quantity, unmissable presence. *One* bindu per composition. Flooding with clay turns a signature into a billboard.

**No gradients.** Anywhere. The BOS forbids "corporate gradient overlays" outright. Transparency only.

### Type — three voices, one language

- **Cormorant Garamond Light / Regular** — display, hero, chapter titles, the master wordmark. Always upright, never italic, never condensed. Letterspacing 4px minimum on headlines, 8px+ on the wordmark.
- **Cormorant Garamond Italic 300–500** — the *voice*. Taglines, pull-quotes, ledes, host hand on the property map. We use **one serif family in two roles** — upright = display, italic = editorial voice. This is a deliberate departure from the BOS, which originally specified Fraunces as a second serif. Cormorant's italic carries the same Renaissance-Italian calligraphic register as the wordmark — discipline through restraint.
- **Raleway 300 / 400 / 500** — body text. The Touchpoints document uses Raleway as body sans; some early Brand Guidelines specified Inter. **We adopt Raleway for long-form body** (matches the BOS/Touchpoints implementation) and **Inter for tight UI** (labels, captions, buttons, metadata) — both share a clean humanist register, both render well at small sizes.
- **Tiro Devanagari Hindi** — Sanskrit. Brand names, cabin doors, section dividers, wax seals. Never in English navigation.
- **Caveat** — the host hand. Welcome card, the hand-drawn property map, signatures. Used sparingly, signed *first-name-only*.

### Spacing — generous, on an 8-point scale

`--space-xs:4` · `sm:8` · `md:16` · `lg:24` · `xl:40` · `2xl:64` · `3xl:96` · `4xl:128` · `5xl:192`.

Cover screens use `5xl` vertical breathing room. Sections default to `4xl`. Cards `xl`. Section reads slowly because everything is given room.

### Backgrounds — material, not decorative

- **Page default** is `--cream` with subtle paper texture (a 3px dotted bone pattern at 40% opacity) when calling for warmth on artifact illustrations. Most surfaces use no texture.
- **Dark sections** are `--forest`, occasionally `--ink`. Used to break long pages into chapters. About 30% of a layout.
- **Light cards** sit on `--sand`, never on `--cream` (low contrast). Hairline of `--bone` on the bottom only.
- **No full-bleed image gradients, no parallax backdrops, no decorative shapes.** The BOS uses photography only as documentation — natural light, empty frames, no people.
- **Imagery vibe** — warm, slightly desaturated, shadow-preserved. Whites and creams only slightly warmed. **Never cool blue tones** (the "luxury resort" feel is the failure mode).

### Borders — hairline only

`--r: 0px` is the default. **Hard edges everywhere.** The only allowed rounded shape is the CTA pill (`--r-pill: 999px`) — pill-shaped buttons with a 1px bindu border and no fill. Everything else: square. No card rounding. No rounded inputs. No "soft" containers.

Borders are 1px hairlines. On light: `--bone`. On forest: `rgba(236,228,211,0.18)`. Dividers are 1px `--mist`, or a 48px `--bindu` short rule as a section anchor.

### Shadows — paper, not glow

Shadow is used **only on physical-artifact illustrations** (the welcome card, the journal, the wax seal — where it communicates a real object resting on real paper). UI elements never have a shadow; elevation is communicated by hairline + tone shift.

`--shadow-paper`: `0 16px 32px rgba(20,32,26,0.18), 0 4px 8px rgba(20,32,26,0.08)`

### Hover, press, focus

- **Hover** = color shift to `--bindu`. Never opacity dim. Links underline-on-hover with a 1px bindu underline.
- **Press** = no transform, no shadow change. A 60ms color dim to `--bindu-deep`. Quiet acknowledgment.
- **Focus** = 1px `--bindu` outline at `2px` offset. Visible to the keyboard, invisible to the mouse.
- **Disabled** = `--moss` at 50% opacity, no cursor change beyond `not-allowed`.

### Motion — the bindu does not pulse

> *"No animated logo. The bindu does not pulse, the wordmark does not shift."* — BOS Restricted Applications.

Animations are quiet and rare. No bounces. No springs. No parallax. Easings:
- `--ease-quiet`: `cubic-bezier(0.22, 0.61, 0.36, 1)` — default UI ease, restrained
- `--ease-arrive`: `cubic-bezier(0.16, 1, 0.3, 1)` — for slow entrances (page transitions, scroll-revealed sections)

Durations: `--dur-quick: 180ms` (hover/press), `--dur-soft: 320ms` (panels), `--dur-arrive: 640ms` (page-level entrances).

Allowed motions: fade-in on scroll, slow vertical reveal (8–16px translateY). **No** scale-in, **no** rotate, **no** stagger-of-letters, **no** marquee, **no** confetti, **no** loaders that bounce. A spinner is a hairline arc rotating once.

### Transparency & blur

Used sparingly. Clay accent may drop to 60% opacity when layering over photography (per BOS overlay rule); never use it on text. Backdrop-blur is forbidden — no glass cards, no frosted nav.

### Cards

The default card is a rectangle of `--sand` or `--cream` on a `--cream` page, separated by a 1px `--bone` hairline on its underside (a single bottom border, not a four-side box). No rounding. No shadow.

When a card represents a physical object (the journal, the wax seal, the welcome card), it earns paper texture and `--shadow-paper`, and may rotate ±2–4° — the discipline of imperfection.

### Layout rules

- One column for narrative, max-width `--width-narrow` (760px). Body copy capped at 60ch.
- Two-column doctrine grids: `200px 1fr` (label column → body column).
- Three-column pillar grids share a 1px `--bone` border around the whole, with vertical separators between columns. No padding inside the grid; padding is on each cell.
- Generous side gutters. Never edge-to-edge body text.
- A single bindu hairline (48px wide × 1px) often anchors the start of a section above the headline — a quiet visual punctuation.

### Photography direction

- Documentation, not styling.
- Natural light only. No flash.
- Wide unpeopled landscape; the cabin small in a large frame, never heroic.
- Slight desaturation, earth tones boosted, sky muted. Warm, not cool.
- People only as hands holding a cup, silhouettes at dusk. Faces are forbidden.

### What we do not do

- No emoji.
- No mascots, no character illustrations.
- No animated logo.
- No gradients (background, text, overlay — any).
- No purple-blue, no neon, no high saturation.
- No drone footage, no fast cuts, no hypersmoothed video.
- No social hashtag variants beyond `#EkamCabins`.
- No seasonal palette variations.
- No "Book now," no "Limited time," no scarcity copy.

---

## ICONOGRAPHY

EKAM has **no general-purpose icon font.** The brand operates with three categories of mark:

### 1. Brand glyphs (custom, 4 total)
Hand-drawn line glyphs, one per sub-brand, all in `--forest` on light and `--cream` on forest. Single weight: 2px stroke. No fills except Shikhar's filled peak and Kutir's clay-orange door (a single bindu reference).

- `assets/glyph-kutir.svg` — hut roof + door + chimney
- `assets/glyph-van.svg` — three tree silhouettes
- `assets/glyph-shikhar.svg` — twin mountain peaks
- `assets/glyph-chai.svg` — steaming cup on saucer

These are the *only* brand-specific icons. They are never resized below 48px and never used as bullets or list markers — they are tier identifiers, never decoration.

### 2. UI icons (Lucide — substitution, flagged)

For functional UI (chevrons, arrows, close buttons, calendar, menu, etc.) we link **[Lucide](https://lucide.dev/)** from CDN: a thin-stroke, geometrically clean, open-source set whose 1.5–2px stroke matches the brand glyphs visually.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="arrow-right"></i>
<script>lucide.createIcons();</script>
```

**Substitution flag.** No icon library appears in any of the source documents. The BOS and Touchpoints implement what little UI iconography they need with inline SVG. Lucide is the closest neutral match — please review and tell us if you have a preferred set (or want us to inline-SVG everything).

### 3. Hand-drawn marks

Inside the host's hand — the property map, the welcome card, the journal cover — line work is intentionally informal: a Caveat-style wobble, a Forest Ink fine-nib weight, the occasional Bindu dot as a "you are here" marker. These are not SVG components; they are illustrated per artifact in `reference/ekam-touchpoints.html`.

### Emoji — never

Emoji are **forbidden** brand-wide. The wordmark is complete and sacred; the BOS Restricted Applications explicitly bans an "EKAM emoji or stylised E icon." This rule extends to body copy, social posts, email subjects, and UI states. We do not communicate state with 🟢 / 🔴; we use the eyebrow label.

### Unicode characters

The bullet `·` (middle dot, U+00B7) is the brand's official separator — it appears in eyebrow labels, metadata strips, and section breadcrumbs (`EKAM · THE SINGULAR`). Em-dash `—` (U+2014) is the only allowed sentence-internal break. No tilde, no asterisk for ornament, no figure dashes.

### Logos — usage

The wordmark exists in three locked configurations (BOS Volume IV):

1. **Master Wordmark** (`assets/wordmark.svg`) — primary. Forest on cream/sand. Website hero, print covers, primary brand presence. Never condensed, italicised, or with a period.
2. **Reverse Wordmark** (`assets/wordmark-reverse.svg`) — cream on forest. Dark sections only. Bindu stays clay.
3. **Stacked** (`assets/wordmark-stacked.svg`) — एकम् above EKAM. Cabin doors, vertical signage, narrow digital spaces.

The bindu dot between E and K is **never** below 6px on screen, 2mm in print. It is always `#B4613A`. It is never duplicated, scattered, or animated.

---

## UI Kits

| Kit | Location | What it covers |
|---|---|---|
| **Website** | `ui_kits/website/` | Marketing site — landing, sub-brand pages (Kutir/Van/Shikhar), Find-your-Ekam booking flow, footer. The public face. |
| **Guest App** | `ui_kits/guest_app/` | The in-cabin tablet + pre-arrival mobile companion. Service requests, naturalist programs, hot-water schedule, in-cabin store. |

Each kit has its own `README.md`, an interactive `index.html` demo, and a `components/` folder of JSX. Open the `index.html` directly.

No slide template was attached, so `slides/` is omitted. Touchpoints in `reference/ekam-touchpoints.html` are slide-like artifact studies that double as a slide deck if you need one.

---

## Caveats & substitutions (flagged for review)

1. **No font files shipped.** The brand uses Cormorant Garamond, Raleway, Inter, Tiro Devanagari Hindi, Caveat — **all available on Google Fonts**. No substitution; we link from CDN. If you need offline font files, drop the TTFs into `fonts/` and tell us.
2. **Editorial font changed from Fraunces → Cormorant Italic** at user request. One family, two roles (upright = display, italic = voice). The BOS specifies Fraunces; we override that choice here for tighter brand harmony. Revert by editing `--font-editorial` in `colors_and_type.css`.
3. **No icon library defined upstream.** We default to **Lucide** for UI icons; please confirm.
4. **No production codebase or Figma.** Components are recreated from `reference/ekam-brand-operating-system.html` and `reference/ekam-touchpoints.html`. Inline SVG patterns lifted directly.
5. **Raleway vs Inter conflict** — Brand Guidelines v2.0 specifies Inter as the supporting sans; BOS and Touchpoints implement Raleway. We picked **Raleway** for body to match the implementation; **Inter** stays for tight UI labels.
6. **`.docx` not parsed.** The BOS v2.0 prologue explicitly supersedes the v3.1 draft — we treated the HTML BOS as definitive.

---

*See `SKILL.md` to invoke this system from Claude Code or another agent.*
