# EKAM Mobile — Gamma Theme Package

A drop-in package for building Gamma decks (or any presentation tool) in the EKAM brand.

## What's in here

```
gamma-package/
├── README.md                       ← this file
├── EKAM Deck Template.html          ← 9-slide template, ready to copy
├── theme-tokens.json                ← Gamma-importable color + type tokens
├── (tokens) → ../colors_and_type.css   ← imported from root (single source of truth)
├── (ridge) → ../ambient-ridge.css      ← imported from root
├── assets/
│   └── ambient-ridge.svg            ← the cabin-window-glow ridge
└── screens/
    ├── chapter-1-onboarding.png     ← chapter overview captures
    ├── chapter-2-home-discovery.png
    ├── chapter-3-property-booking.png
    ├── chapter-4-saved-membership.png
    ├── chapter-5-profile-mudra-referral.png
    ├── chapter-6-companion.png
    ├── design-system.png
    └── booking-widget.png
```

## Brand tokens at a glance

**Colors**
- Cream `#FAF7F0` — default surface
- Sand `#F1ECDE` — subtle elevation
- Bone `#E5DFCB` — hairline dividers
- Mist `#C9C2AC` — disabled state
- Moss `#4F5C3F` — secondary text (AA on cream)
- Forest `#2B4630` — headlines
- Ink `#14201A` — body text · dark surface
- **Bindu `#B4613A`** — the only accent (clay)

**Type**
- Display · Cormorant Garamond (300/400) — headlines, cabin names
- Editorial · Fraunces italic (400) — emotional copy, taglines
- Body · Raleway (300) — long-form paragraphs
- UI · Inter (500) — labels, CTAs (9–11px, 2px tracking, uppercase)
- Devanagari · Tiro Devanagari Hindi — tier marks, cultural depth
- Hand · Caveat (500) — greetings, referral notes

**Motion**
- Default easing · `cubic-bezier(0.22, 0.68, 0.16, 1)`
- Sheet rise: 380ms
- Hover/state: 180ms
- Ambient pulses: 2.4–6s loops

## Using with Gamma

1. **Import the theme** — upload `theme-tokens.json` in Gamma's theme editor (or paste colors manually from the table above).
2. **Use the deck template** — open `EKAM Deck Template.html` to see the slide vocabulary (cover, divider, content, closing).
3. **Drop in screens** — every chapter screen is in `screens/` as a print-quality PNG, ready to place in slides.
4. **Fonts** — Gamma supports Google Fonts; load Cormorant Garamond, Fraunces, Raleway, Inter, Caveat, and Tiro Devanagari Hindi from the font picker.

## Anti-patterns (the discipline)

- No streak counters, no badges, no points language
- No discount banners or "limited time"
- No push notifications during stays
- No share-to-story buttons
- No star ratings on reviews — use the host's quoted letter instead
- No skeleton loaders — show ambient surface while loading
- One accent colour (clay). Nothing more should exist.

— EKAM Design · v1.0
