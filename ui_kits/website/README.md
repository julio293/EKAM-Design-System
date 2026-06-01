# EKAM Website — UI Kit

A high-fidelity recreation of the EKAM marketing website's visual language, recreated from the **Brand Operating System v2.0** and **The Touchpoints** HTML documents (in `reference/`). No production codebase was attached; treat the BOS as the source of truth.

## Open

Open `index.html` directly. It is a single-page composition of the kit's components, demonstrating a typical view of `ekam.in`. Click "Find your Ekam" or any of the three tier cards to walk through the **Find-your-Ekam** booking flow.

## What this kit covers

- **`NavBar`** — sticky 64 px top nav, cream + forest variants.
- **`Hero`** — full-bleed forest cover, devanagari + wordmark + tagline + bindu rule.
- **`PillarsBlock`** — Singular · Serene · Wild triplet.
- **`TierCard`** — Kutir / Van / Shikhar offer cards (glyph, devanagari, photo placeholder, price, CTA).
- **`TierPage`** — sub-brand long-form page (eyebrow + hero + doctrine rows + lede image strip).
- **`FindYourEkam`** — booking modal/page with date pickers, party size, tier selector, the CAC pass-back long-stay discount, and carbon-offset toggle (default on).
- **`JournalTeaser`** — the seasonal journal preview.
- **`Footer`** — narrow, ink-on-cream, hairlines only.

## What is *not* here

- A real CMS or page router. Each "page" is a state of the SPA.
- Photography — we render warm earth gradients as documentation placeholders. Replace with the photography brief from BOS Volume VII (natural light, empty frames, unpeopled, slight desaturation, never cool blue).
- The full eleven-volume BOS body content. The BOS itself in `reference/ekam-brand-operating-system.html` is the source.

## Components

All React components live as inline JSX inside `<script type="text/babel">` blocks under `components/`. The kit prioritises pixel fidelity to the BOS aesthetic over production patterns — easy to read, easy to lift, easy to remix.

## Component architecture — single source of truth

Each shared component should live in **one** file. Pages that use it link or import that one file.

| Component | Stylesheet | React (if any) | Used by |
|---|---|---|---|
| `.book` booking card (property reserve card) | `components/booking-card.css` | inline in `property-v4.jsx` (extract pending) | `property-v4.html` + `booking-widget.html` (demo) |
| `BookingWidget` (top-of-page search bar) | inline in `BookingWidget.jsx` | `components/BookingWidget.jsx` | `index.html` |
| Other page sections | colocated | `components/*.jsx` | `index.html` |

**Rule of thumb:** edit the file under `components/` — never the page that uses it. If you find yourself copy-pasting markup or CSS into another HTML file, stop and extract a shared file instead.

### `booking-widget.html` is a demo page, not the component

It's a standalone preview that mounts the same `.book` markup and links the same `booking-card.css` as the property page. Use it to iterate on the component in isolation. Any visual change you make to `booking-card.css` shows up in both the demo and `property-v4.html` immediately.
