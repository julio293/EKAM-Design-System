# design-sync notes — EKAM Design System (figma-export)

Synced to claude.ai/design project `98a571eb-48ee-43a0-b9f5-b6e45ebbd85c`
("EKAM Design System (figma-export)"). Shape: **package**.

## Build setup (this repo had none)
The repo ships plain JSX with inline styles and **no package.json / no build / no TypeScript**. To sync, a minimal package build was added:
- `figma-export/package.json` — name `@ekam/design-system`, `module` → `dist/index.es.js`.
- `figma-export/build.mjs` — esbuild bundles `components/index.js` → `dist/index.es.js` (ESM, React external). Run via `npm run build` **from `figma-export/`** (this is `cfg.buildCmd`).
- Converter invocation (from repo root):
  `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./figma-export/node_modules --entry ./figma-export/dist/index.es.js --out ./ds-bundle`

## Component discovery + prop contracts
- No `.d.ts` exists, so discovery is via `cfg.componentSrcMap` (all 31 components pinned to `components/<Name>.jsx`; NavIcon → `components/TabBar.jsx`).
- Prop types can't be auto-extracted from untyped JSX, so contracts are **hand-written in `cfg.dtsPropsFor`** (24 components). **If a component's props change, update `dtsPropsFor` by hand** — nothing extracts them automatically. The 7 without hand contracts (Avatar, LogoPill, SectionHeader, ComparisonCard, RecCard, SizeCard, TaskRow) emit a generic `[key: string]: unknown` body.

## Styling / fonts
- Inline-style DS → `[CSS_RUNTIME]` (self-styling bundle, expected/non-blocking). `cfg.cssEntry` = `theme.css`, which carries only `@font-face` (no component CSS classes — there are none).
- Brand fonts shipped via `fonts/fonts.css`: Inter, Cormorant Garamond, Raleway (variable TTFs), Tiro Devanagari Hindi (regular+italic). Clean-named copies live at `figma-export/assets/fonts/`.

## Scope
- Synced **`figma-export/components/` only** (31 components). `organisms/` and `pages/` are bespoke audit-report compositions — intentionally excluded.

## Re-sync risks / watch-list
- **Rebuild `dist` first** every re-sync: `cd figma-export && npm run build`, then run the driver. `dist/index.es.js` is gitignored build output.
- **`dtsPropsFor` drift**: hand-written contracts can fall out of sync with the JSX. Re-check after any component prop change.
- **Slider** (FIXED 2026-06-29): previously rendered the browser-default blue track/thumb in Claude Design. Root cause was a real component bug — the scoped `<style>` selector used `useId()` verbatim, whose colons (`:r0:`) made `#id::-webkit-slider-thumb` an invalid selector, so ALL slider styling was silently dropped and the native input painted its default track/thumb. Fix: sanitize the id (`reactId.replace(/[^a-zA-Z0-9_-]/g,'')`) AND make the native input fully transparent (track + thumb) while drawing the real terracotta-ring thumb as a div. Any future component using a scoped `<style id>` selector must sanitize/`CSS.escape` the id the same way (Input already uses `CSS.escape`).
- `@types/react@19` was installed against `react@18` — harmless here (components use no React utility types) but a version bump could matter.
- Conventions header is at `.design-sync/conventions.md` (wired via `readmeHeader`) — human-editable; re-sync validates its named tokens/components against the fresh build.

## Known render warns
None outstanding — all 31 render cleanly (0 bad). 7 components ship the functional floor card with the real component visible (Avatar, LogoPill, SectionHeader, ComparisonCard, RecCard, SizeCard, TaskRow); authorable on any re-sync.
