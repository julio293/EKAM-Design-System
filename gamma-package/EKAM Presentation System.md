# EKAM Living — Presentation System

A complete brand operating system for presentations. Designed to work in Google Slides, exported to Gamma, and to hold its discipline even when AI generates the slides automatically.

This is not a deck. It is the rules a deck must obey.

---

## Part 1 — Theme System

### Brand colors (the only eight)

| Token        | Hex       | Role                                 | Use share |
|--------------|-----------|--------------------------------------|-----------|
| **Cream**    | `#FAF7F0` | Default surface                      | **60%**   |
| **Sand**     | `#F4EDE1` | Subtle elevation (cards on cream)    | 12%       |
| **Bone**     | `#ECE4D3` | Hairline dividers                    | 4%        |
| **Mist**     | `#D8D3C4` | Disabled, faded states               | 2%        |
| **Moss**     | `#7A8A6B` | Secondary text on cream              | 7%        |
| **Deep Forest** | `#2B4630` | Headlines, dark cover surfaces   | 8%        |
| **Forest Ink**  | `#14201A` | Body text, deepest dark surface  | 4%        |
| **Bindu Clay**  | `#B4613A` | **The only accent**              | **3%**    |

**Domination rules.** Cream owns 60% of any deck. Forest pairs (Deep Forest + Forest Ink) own ~12%. Clay never owns more than ~3% — it is an accent, not a colour.

**Never let these dominate.** Clay (Bindu) > 5% of any slide. Sand backgrounds on more than 2 consecutive slides. Mist on text (it does not have contrast).

**Accessibility-safe text pairings (4.5:1 minimum).**
- Forest Ink (`#14201A`) on Cream — body
- Deep Forest (`#2B4630`) on Cream — headlines
- Moss (`#7A8A6B`) on Cream — only at 14px+ medium weight (AA Large)
- Cream on Forest Ink — dark cover slides
- Bindu Clay on Cream — only for accents 12px+ medium weight
- **Never** Mist on Cream. **Never** Sand on Cream. **Never** Moss on Sand.

### Gamma theme configuration values

```json
{
  "Primary Accent Color":      "#B4613A",   // Bindu Clay
  "Secondary Accent Color":    "#2B4630",   // Deep Forest
  "Heading Color":             "#2B4630",   // Deep Forest
  "Body Color":                "#14201A",   // Forest Ink
  "Link Color":                "#B4613A",   // Bindu Clay
  "Button Color":              "#B4613A",   // Bindu Clay (white text)
  "Background Color":          "#FAF7F0",   // Cream
  "Card Background Color":     "#F4EDE1",   // Sand
  "Border / Divider Color":    "#ECE4D3"    // Bone
}
```

### Data-visualization palette (in order)

1. Bindu Clay `#B4613A` — the one number that matters
2. Deep Forest `#2B4630` — the comparison
3. Moss `#7A8A6B` — context, secondary series
4. Mist `#D8D3C4` — backdrop, grid lines

**Never** use more than three series in one chart. **Never** introduce a fourth colour (red, blue, green outside the palette) — if you need contrast, use density, not colour.

---

## Part 2 — Typography System

### The five families

| Family                  | Use                                         | Weight  |
|-------------------------|---------------------------------------------|---------|
| **Cormorant Garamond**  | Display · headlines · cover titles          | 300, 400 |
| **Fraunces** (italic)   | Editorial · taglines · pull-quotes · subs   | 300, 400 |
| **Raleway**             | Body · long-form paragraphs                 | 300, 400, 500 |
| **Inter**               | UI · labels · CTAs · metadata · captions    | 400, 500 |
| **Tiro Devanagari Hindi** | Sacred-moment context · tier marks        | 400 |

### Hierarchy table

| Token                   | Family / weight                         | Size    | Tracking  | Line-height |
|-------------------------|-----------------------------------------|---------|-----------|-------------|
| **Cover title**         | Cormorant Garamond 300                  | 88pt    | 0.4px     | 1.02        |
| **Section divider**     | Cormorant Garamond 300 + Fraunces italic 400 | 64pt | 0.3px | 1.05 |
| **Slide title**         | Cormorant Garamond 300                  | 48pt    | 0.3px     | 1.05        |
| **Sub-title**           | Fraunces italic 400                     | 17pt    | 0px       | 1.5         |
| **Body**                | Raleway 300                             | 14pt    | 0.2px     | 1.55        |
| **Quote (large)**       | Cormorant Garamond italic 300           | 38pt    | 0.3px     | 1.15        |
| **Caption**             | Inter 500                               | 10pt    | 2.5px     | 1.4 · UPPERCASE |
| **Label / eyebrow**     | Inter 500 + Bindu Clay                  | 11pt    | 3px       | 1 · UPPERCASE |
| **Metadata · table**    | Inter 400                               | 11.5pt  | 0.3px     | 1.4         |
| **Chart numbers**       | Cormorant Garamond 400 (tabular)        | 18–24pt | 0.2px     | 1           |
| **Devanagari**          | Tiro Devanagari Hindi 400               | 13–20pt | 1.5–2px   | 1.2         |

### Whitespace / line-length rules

- Body width: **45–65 characters** per line. Hard cap 70.
- Paragraph spacing: **8–12pt** below body, **18pt** below quotes.
- Slide margins: minimum **64pt** all sides on a 1280×720 deck. Cover slides may use 96pt.
- Between elements: minimum **24pt**. Cards from edge: minimum **48pt**.

### AI-safe rules for Gamma-generated text

- Title length: **3–6 words ideal**, 9 words maximum.
- Sub-line length: **1 short sentence**, 12 words max.
- Bullets: **3 maximum** per slide. 4 only if absolutely required.
- Each bullet: one phrase, 8–14 words. No semicolons.
- No emoji. No exclamation marks. No words in ALL CAPS except eyebrows / labels.

---

## Part 3 — Master Slide System (15 layouts)

Each slide is a Google Slides master. Use exactly one master per slide. Do not mix masters.

### 1. Cover slide
- Forest gradient backdrop, subtle ridge SVG with a single clay window glow.
- Cover title: 88pt display, two lines, italic clause as second half.
- Sub: 22pt Fraunces italic, max 14 words.
- Footer row: prepared-by + version, Inter 500 11pt, tracking 2.5px.
- **Image: none.** The cover earns its weight from typography and one warm pixel.

### 2. Section divider
- Same forest backdrop.
- Two-column grid: large Roman numeral (140pt display italic clay) on the left, chapter title + sub on the right.
- Devanagari mark under the numeral.

### 3. Editorial full-bleed image
- Photograph covers the slide.
- 28% bottom gradient scrim from `rgba(20,32,26,0.6)` to transparent for legibility.
- Caption in bottom-left: Inter 500 10pt UPPERCASE label + Fraunces italic 17pt one-line sentence.
- No title competing on the image.

### 4. Two-column storytelling
- 5/7 split: text left, image (or set of phone mockups) right.
- Text: eyebrow + title + 1-paragraph sub + 3-bullet list.
- 24pt gap between columns; 64pt slide margins.

### 5. Architecture presentation
- Hero photograph at top, 60% of slide height.
- Below: name (display 32pt) + region (Fraunces italic 17pt) on left, three meta facts on right (label + value).
- One quote-line caption below the meta row.

### 6. Hospitality concept
- Three-up grid of small visual cards (cabin / ritual / experience).
- Each card: image (4:3) + name + 1-line description.
- Editorial header above: eyebrow + 1-line title.

### 7. Metrics / data
- 4 KPIs at top in a single row, hairline-divided.
- Each KPI: huge number (Cormorant 64pt) + small label (Inter 10pt UPPERCASE).
- Optional one chart below — single accent (clay), secondary moss, grid bone.

### 8. Founder note
- Cream surface. Plain.
- 65-char-wide column, centred.
- Body in Raleway 300 14pt. Signature in Caveat 24pt clay.
- Date in Inter 10pt UPPERCASE moss, top-right.

### 9. Timeline
- Single horizontal hairline running across the slide at the vertical centre.
- 4–6 milestones as small clay dots on the line.
- Above each dot: year (Cormorant 18pt). Below each dot: 8-word note (Fraunces italic 13pt).
- No connecting arrows. No graphics. Just the line.

### 10. Quote
- Forest dark surface.
- Quote centred: Cormorant italic 38pt cream, max 18 words.
- Attribution below the quote in Inter 500 11pt UPPERCASE clay, 36pt gap.
- A 28-px clay hairline between quote and attribution.

### 11. Property showcase
- Full-bleed photograph left half.
- Right half: cabin name (display 48pt) + tier (devanagari) + 3-line italic note + property meta strip (location · elevation · drive).
- One Bindu dot on the photo at the cabin location.

### 12. Moodboard
- 6-up grid of photographs, equal weight.
- Each image with a one-word caption in Inter 10pt UPPERCASE underneath (forest, fire, ridge, stone, kettle, dusk).
- No descriptions, no titles. Let the images carry it.

### 13. Operational framework
- Three numbered cards in a row (01 · 02 · 03).
- Each card: large Roman numeral italic clay + title + 3-line description.
- Sand-fill cards on cream surface. Hairline border.

### 14. Brand philosophy
- Forest backdrop with ambient ridge.
- Three short manifesto lines, each on its own row, Cormorant 28pt italic cream.
- Each line ends in a clay-italic phrase: *"...one cabin at a time."*

### 15. Closing slide
- Forest backdrop.
- One quoted phrase, max 12 words. Cormorant italic 64pt cream.
- Signature line in Caveat 32pt clay: *"— Thank you."*
- No CTAs. The deck ends in silence.

---

## Part 4 — Gamma Optimization Rules

### Make Gamma stay restrained

1. **One master per slide.** Pin the 15 layouts as the only acceptable templates. Disable Gamma's "Generate any layout" option.
2. **Density cap.** Maximum 35 words per slide. Maximum 6 elements per slide (counting titles).
3. **Card cap.** Gamma loves cards. Allow at most one card group per slide, max 3 cards in that group.
4. **Image-to-text ratio.** Minimum 40% of each slide must be either image or whitespace. If text would exceed 60% of area, split into two slides.
5. **Bullets cap.** 3 bullets max. If 4+ needed, use the Operational Framework master (numbered cards) instead.
6. **Icons.** Allow only stroke-weight 1.5 icons from one icon set (Feather-style or hand-drawn SVG). **No fill icons. No coloured icons.** Single colour: Forest Ink or Bindu Clay.

### Things Gamma must never do

- Gradient backgrounds outside the brand forest gradient.
- Decorative dividers (no zig-zags, no dotted patterns).
- Emoji in titles.
- Drop shadows on cards.
- Stock photography from Gamma's library — *all* images must be uploaded by us.
- 16:9 → portrait swaps. The deck is landscape, always.
- Colour-coded callouts (no green = good, red = bad).

### Layouts Gamma should prioritise

In rank order: Editorial Full-bleed, Two-Column Storytelling, Property Showcase, Quote, Section Divider, Metrics/Data, Operational Framework.

### Layouts Gamma should avoid

Hospitality Concept and Moodboard should only be generated when the input explicitly contains image content. Architecture Presentation only when given specific property data.

---

## Part 5 — Storytelling Framework

Every EKAM deck (founder, investor, concept, operational) follows the same emotional arc. Sections may compress, but the order does not change.

| #  | Section              | Slide type(s)                           | Word target |
|----|----------------------|-----------------------------------------|-------------|
| 01 | **Emotional opening** | Cover · Full-bleed image                | 6 + 12      |
| 02 | **Land / context**    | Full-bleed · Moodboard                  | 0–8         |
| 03 | **The problem**       | Quote · Two-column                      | 18 + 60     |
| 04 | **Philosophy**        | Brand philosophy · Quote                | 24 + 18     |
| 05 | **Solution**          | Two-column · Property showcase          | 60 + 40     |
| 06 | **Operational model** | Operational framework · Architecture    | 90 + 40     |
| 07 | **Experience**        | Hospitality concept · Moodboard         | 30 + 0      |
| 08 | **Scale**             | Timeline · Metrics                      | 30 + 25     |
| 09 | **Economics**         | Metrics · Two-column                    | 25 + 60     |
| 10 | **Closing reflection** | Quote · Closing                        | 12 + 8      |

Each act lasts **2–4 slides**, never more. A complete deck is **22–32 slides**. Anything beyond 40 slides has lost the discipline.

---

## Part 6 — Image & Visual Direction

### Photography style

- Misty mornings, blue-hour blue, golden-hour gold. Daylight only when describing a specific moment.
- Architectural composition: structure in the frame, never centred.
- Warm grade: shadows lifted to a charcoal, never crushed to black; highlights pulled to cream, never blown white.
- Single human moments. Two people maximum. No groups.
- Aspect ratios: **3:2 landscape** for hero images, **4:5 portrait** for property cards, **1:1 square** only inside moodboards.

### Image crops

- 1/3-from-bottom rule: subject horizon in the lower third.
- Negative space top-right minimum 30%. Captions live there.
- Crop tight; show one thing per frame. If you can describe two things in the photo, you have two photos.

### Image grading

- LUT direction: cool shadows, warm highlights, desaturated overall.
- Skin tones: protect — never let the warm grade push faces orange.
- Greens: muted toward moss, never neon. Trees should look like the forest, not a film set.

### Captions

- Inter 500 10pt UPPERCASE on the image, bottom-left.
- One-line maximum. No periods unless multiple sentences.
- Format: `— [moment of day] · [thing in frame]`. Example: *"— first light · the deck before the kettle"*.

### Pacing

- After every 4 text-heavy slides: insert a full-bleed image with a single caption.
- The deck should *breathe*. If three consecutive slides have title + body, the fourth must be image-only.

---

## Part 7 — Data Visualization System

### Charts

- **Bar / line:** one series in Bindu Clay, comparison in Moss, baseline in Bone.
- **Grid:** Bone hairlines only, never lighter than 0.5pt.
- **Axes:** Inter 400 10pt Moss; tick marks short, 4pt long.
- **Labels:** label series directly at line-end, not in a legend.
- **Background:** Cream. Never gradient. Never card-shadow.

### Numbers

- Big numbers in Cormorant Garamond 400 (tabular). One per cell.
- Use Indian-format separators (`1,00,000`) for INR. Always include the `₹` symbol; never the word "Rs".
- One-decimal place for percentages (`12.4%`). No trailing zeros (`12.0%` → `12%`).

### Maps

- Cream or Sand basemap. No Google blue tiles.
- Land outlines in Bone hairline. Cabins as clay dots, 4pt diameter.
- No routes between dots. No labels on the map; legend below in Inter 10pt.

### Tables

- Hairline rows in Bone. Header row in Inter 10pt UPPERCASE Bindu on Sand.
- Body cells in Inter 11.5pt Forest Ink on Cream.
- Right-align numbers. Left-align labels.

---

## Part 8 — AI-Safe Constraints

### Hard caps Gamma must enforce

- **Max words per slide:** 35.
- **Max hierarchy depth:** 2 (heading + bullets). No nested sub-bullets, ever.
- **Max images per slide:** 3 (in the moodboard or hospitality concept layouts only). Otherwise 1.
- **Min whitespace:** 40% of slide area unoccupied by glyph or photo.
- **Title length cap:** 9 words.
- **Body line length:** 65 characters max.
- **Section rhythm:** every 4 slides must include a section divider or full-bleed image.

### Animations & transitions

- Permitted: cross-fade between slides (500ms), single fade-in on title (200ms).
- Forbidden: slide-in, zoom, bounce, character-by-character text. The deck is editorial, not a TikTok.

---

## What EKAM presentation design must never become

10 anti-patterns to police:

1. **Startup pitch deck.** Big numbers + bold colours + "the opportunity" headlines. Refuse it.
2. **Luxury hotel brochure.** Marble textures, gold foil, sweeping aerial drone shots.
3. **SaaS deck.** Three-up "Features / Benefits / Why now" frameworks. Use the Operational Framework master instead.
4. **Architecture portfolio LinkedIn carousel.** Square, photo-only, no editorial copy.
5. **Conference keynote.** Centre-aligned single sentence on a black slide. (We use forest, not black; and we use editorial italic, not bold.)
6. **Investor TAM/SAM slide.** The economics master shows specifics, not market sizing.
7. **Modern Notion-style data dashboard.** No widgets, no progress rings, no card grids of numbers.
8. **AI-generated stock-image moodboard.** Every photo must be commissioned or original.
9. **Bullet-heavy operational doc.** If you have 7 things to say, the deck is wrong, not too short.
10. **A deck that ends with "Thank you · Questions?"** Use the Closing master — one quoted line, signature, silence.

---

## Gamma cleanup checklist (after every AI generation)

Walk these in order. Take 8 minutes.

- [ ] Replace any Gamma-default fonts with the EKAM five.
- [ ] Recolour every accent to Bindu Clay. Remove all other accents.
- [ ] Delete any gradient backgrounds outside the brand forest gradient.
- [ ] Delete any decorative dividers, dotted patterns, drop shadows.
- [ ] Strip emoji from every title.
- [ ] Reduce every bullet list to ≤ 3 items.
- [ ] Re-cap each slide to ≤ 35 words. Split long slides into two.
- [ ] Verify cover, every section divider, and closing use the brand master.
- [ ] Verify every photograph is original (not Gamma stock).
- [ ] Add one full-bleed image after every 4 text-heavy slides.
- [ ] Run the deck on a phone-mirrored Cast and check: would a boutique architecture magazine publish this?

---

## The final test

Every slide must pass:

1. **Is it land-led?** Does the slide defer to the cabin and the landscape, or does the brand try to win attention?
2. **Is it restrained?** Have we removed anything that does not need to exist?
3. **Would it still feel timeless in 10 years?** No 2026-specific design fads.
4. **Is the slide breathing?** At least 40% empty space.
5. **Would a boutique architecture studio approve it?** If they'd reach for a different layout, we used the wrong master.

If a slide fails any one of these, redesign it.

> Restraint is the system.
> The system is the brand.

— EKAM Design · v1.0
