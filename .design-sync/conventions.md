# EKAM Design System — building with these components

EKAM is a warm, editorial design system for a Himalayan cabin-hospitality brand. Components are real, compiled React exports — import and compose them; do not reimplement.

## Setup / wrapping
No provider, theme context, or root wrapper is required. Every component is self-contained and renders correctly on its own — just render it. The brand fonts (below) ship via `styles.css`; make sure that stylesheet is present so type renders on-brand.

## Styling idiom — props + inline styles, NOT CSS classes
This system has **no utility-class vocabulary and no CSS-module class names**. Each component styles itself with inline styles driven by its **props**. Style through the documented props, never by passing `className`:

- Variant/appearance props: `type` (`'primary' | 'secondary' | 'clear'` on Button), `variant` (`'plain' | 'card'` on ListItem), `tone` (Badge), `appearance` (AppSectionHeader), `size` (`'xs'|'sm'|'md'|'lg'` etc.).
- Content props: `title`, `subtitle`, `eyebrow`, `label`, `children`.
- Slots take ReactNode: `leading`, `trailing`, `iconLeft`, `iconRight`, `addonRight`, `action`.

For your own **layout glue** around components, use plain inline `style={{…}}` (flex, gap, width) — that's how the previews are written. When you need a brand value, use these palette hexes (the system's tokens — applied internally by the components):

`bindu #B4613A` (primary accent — the • dot, CTAs), `binduDeep #9C4F2A`, `ink #14201A` (primary text), `forest #2B4630`, `moss #4F5C3F` (muted), `sage #C9D6BC`, `cream #FAF7F0` (page surface), `sand #F4EDE1`, `bone #ECE4D3`, `mist #D8D3C4` (hairlines), `danger #B23A2A`, `success #2B7A3F`.

## Type families (shipped via `styles.css`)
- **Inter** — UI labels, buttons, eyebrows. Uppercase with `+2.5px` letter-spacing for labels/eyebrows.
- **Cormorant Garamond** — display & editorial: card titles (SemiBold), italic placeholders, italic quotes.
- **Raleway** — body copy / descriptions.
- **Tiro Devanagari Hindi** — Devanagari script (e.g. कुटीर, tab labels like आज).

## Where the truth lives
- `styles.css` — the shipped `@font-face` declarations (read before assuming a font).
- `components/<group>/<Name>/<Name>.d.ts` — the exact prop contract for each component.
- `components/<group>/<Name>/<Name>.prompt.md` — per-component usage notes.

## Idiomatic build snippet
```jsx
import { Card, Button, Badge } from '@ekam/design-system';

function CabinTeaser() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 340 }}>
      <Card eyebrow="EKAM · CABIN" title="Binsar." subtitle="Kumaon · 2,400 m" scriptLabel="कुटीर" />
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Button type="primary" bindu>Reserve</Button>
        <Badge tone="terracotta">2 left</Badge>
      </div>
    </div>
  );
}
```
