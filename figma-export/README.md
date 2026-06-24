# EKAM Design System — Figma Export

Exported from Figma file [`3FvNk9nK0ed9dlPPvbKMms`](https://www.figma.com/design/3FvNk9nK0ed9dlPPvbKMms/EKAM-Design-System) — page **"Foundation Design"**, section **202:2 "Icon Set 2 — Audit Report"** (the only page in the file).

Everything is plain **React `.jsx` + JS**, styled with inline styles driven by `tokens.js`. No Tailwind, no build-time CSS, no external runtime dependency beyond `react`.

## Structure (atomic design)

```
figma-export/
├── tokens/
│   └── tokens.js          # variables: colors, typography, spacing, radii
├── data/
│   └── report.js          # all report copy as structured data
├── components/            # reusable atoms/molecules (12)
│   ├── LogoPill.jsx        SectionHeader.jsx   Badge.jsx
│   ├── ScoreCard.jsx       TierCard.jsx        NamingStat.jsx
│   ├── IssueRow.jsx        SizeCard.jsx        ComparisonCard.jsx
│   ├── RecCard.jsx         TaskRow.jsx         PhaseHeader.jsx
│   └── index.js
├── organisms/             # 11 sections of the report
│   ├── Cover.jsx           Intro.jsx           Scores.jsx
│   ├── LibraryBreakdown.jsx NamingAnalysis.jsx Issues.jsx
│   ├── SizeReadability.jsx  BrandFit.jsx       Recommendations.jsx
│   ├── Checklist.jsx        Footer.jsx
│   └── index.js
├── pages/
│   └── IconSet2AuditReport.jsx   # full composed page
└── index.js               # single barrel entry point
```

Every component/organism carries the originating Figma `node-id` in a JSDoc comment for traceability.

## Usage

```jsx
import { IconSet2AuditReport } from './figma-export';
// or granular:
import { ScoreCard, tokens } from './figma-export';

export default function App() {
  return <IconSet2AuditReport />;
}
```

Use tokens directly:

```js
import { palette, typography, scoreColor } from './figma-export/tokens/tokens.js';

palette.terracotta;   // '#9c4f2a'
scoreColor(4.5);      // '#b23a2a'  (poor → danger red)
```

## Color tokens (canonical)

Single source of truth: `tokens/colors.js`, exported from Figma node **1:24** ("Color Accessibility Audit Report"). Names and values are the canonical EKAM tokens.

| Group | Token (`color.*`) | Value | Role |
|---|---|---|---|
| Surface | `cream` | `#FAF7F0` | primary surface / text on dark |
| Surface | `sand` | `#F4EDE1` | secondary surface / cards |
| Surface | `bone` | `#ECE4D3` | tertiary surface |
| Text | `ink` | `#14201A` | primary text, dark ground |
| Text | `forest` | `#2B4630` | body text, brand green |
| Text | `moss` | `#4F5C3F` | muted text, labels, captions |
| Text | `sage` | `#C9D6BC` | muted on dark / decorative |
| Accent | `bindu` | `#B4613A` | primary accent — the • dot |
| Accent | `binduDeep` | `#9C4F2A` | deep accent — Devanagari |
| State | `mist` | `#D8D3C4` | hairlines, borders |
| State | `danger` | `#B23A2A` | errors, critical |
| State | `success` | `#2B7A3F` | positive / confirmation |

> The Figma file mislabels three swatches (Forest `#EAEAFF`, Moss `#FF00FF`, Sage `#FFFFFF`) — its own audit flags these. The true swatch values above are used.
>
> Legacy aliases in `palette` (`olive`→`moss`, `terracotta`→`binduDeep`, `parchment`→`sand`, `border`→`mist`) are kept for back-compat. WCAG guidance per token lives in `color`'s sibling export `a11y`.

Type: **Inter** (400 / 600 / 700); display 56 · h2 36 · stat 24 · body 12–14 · labels 10–11.

## Notes / fidelity

- The Figma frame is a fixed 1440px-wide poster using absolute positioning. This export rebuilds it with semantic fl/flex + CSS grid so it is maintainable and reflows, while preserving exact colors, type, spacing, and radii.
- `scoreColor()` reproduces the value→color logic seen in the scores row (≥7.5 forest, ≥5.5 terracotta, else danger red).
- Source content is verbatim from the Figma text layers (see `data/report.js`).
