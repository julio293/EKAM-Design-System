# EKAM Design System — Project Documentation

_A complete record of how this repository's component library was built from Figma and synced to Claude Design, including how the MCP tooling works._

Last updated: 2026-06-29

---

## 1. What this project is

**EKAM** is a warm, editorial design system for a Himalayan cabin‑hospitality brand. The visual language:

- **Palette** — terracotta accent ("bindu" `#B4613A`), deep ink `#14201A`, forest/moss greens, warm cream/sand/bone surfaces.
- **Type** — Cormorant Garamond (display & editorial), Inter (UI labels, uppercase +2.5 tracking), Raleway (body), Tiro Devanagari Hindi (Devanagari script like कुटीर / आज).
- **Source of truth** — a Figma file: `3FvNk9nK0ed9dlPPvbKMms` ("EKAM Design System").

The goal across this work was twofold:
1. **Export** the Figma design system into real, reusable React code in this repo (`figma-export/`).
2. **Sync** that code to **claude.ai/design** so Claude's design agent builds with the *real* EKAM components instead of generic ones.

---

## 2. Starting state

The repo began as a loose collection of HTML mockups, audit markdown docs, and a partial `figma-export/` containing tokens, a logo, and a handful of audit‑report components. There was **no build system, no `package.json`, no TypeScript, no Storybook** — just hand‑written `.jsx` files using inline styles and JS token modules.

---

## 3. Phase 1 — Exporting components from Figma

Each UI component was pulled from a specific Figma node and rebuilt as a token‑driven React component in `figma-export/components/`. The pattern for every component was the same:

1. **Fetch the node** from Figma via the Figma MCP server.
2. **Read the variable definitions** (the design tokens used: colors, fonts, spacing, radii).
3. **Inspect representative variants** (e.g. default / hover / focus / disabled, or each size) to get exact values.
4. **Author a single flexible React component** that reproduces the design with props for every Figma variant axis — using the existing `tokens/` palette and type styles, never hard‑coded values.
5. **Register** it in `figma-export/components/index.js`.

### How the Figma MCP works

The Figma MCP server bridges the Figma file and code. The tools used, and what each is for:

| Tool | Purpose | Notes |
|---|---|---|
| `get_metadata` | Returns the **node tree** (ids, names, types, sizes) as XML | Used first on big/unknown nodes to find the real component sub‑node ids. Cheap, structural only. |
| `get_design_context` | Returns **reference code + a screenshot + token list** for a node | The primary design‑to‑code tool. On nodes too large it returns a "sparse" tree and tells you to call it again on child ids. |
| `get_variable_defs` | Returns the **design variables** bound to a node (e.g. `accent/bindu: #B4613A`, `ui/button: Inter Medium 11 / +2.5`) | This is how exact colors, font specs, radii, and spacing were captured. |
| `get_screenshot` | Renders a **PNG** of a node (returns a short‑lived URL) | Used to visually confirm layout/state before coding, especially for canvas/section nodes the code tools can't parse. |
| `download_assets` | Exports a node as **SVG/PNG** and returns a URL | Used for the icon batch download. |

A node id from a Figma URL like `…?node-id=26-800` becomes `26:800` in the tools. `fileKey` is the segment after `/design/`.

**Practical lessons that shaped the workflow:**
- **Canvas/section nodes** (e.g. `1:44`, `1:25`) fail `get_design_context`/`get_variable_defs` ("nothing selected"). For those, use `get_metadata` to drill into the real child symbol/frame ids, then call the code tools on those.
- **Large nodes** exceed the context budget; the result is saved to a file and you parse it out‑of‑band (a sub‑agent + `jq`/python) so the 400K+‑char blob never floods the main context.
- Figma's exported Tailwind/React is **reference only** — every component was re‑authored to this repo's convention (plain React + inline styles + the shared `tokens/`), not pasted.

### Components built (in `figma-export/components/`)

- **Controls** — Button (26:800), Input (26:2663), Slider (1:44), ProgressBar, ProgressDots (272:4381), Tabs (29:4978), Radio, Stepper
- **Content** — Card / LetterCard / KeyCard (134:1891), List / ListItem (268:256)
- **Navigation & headers** — TopNav, AppSectionHeader, HeaderCompanion (285:4397), TabBar + inline NavIcon set (317:4685)
- Plus the earlier audit‑report components (ScoreCard, TierCard, NamingStat, IssueRow, PhaseHeader, ComparisonCard, RecCard, TaskRow, SizeCard, Avatar, Badge, LogoPill, SectionHeader)

Notable detail: the **TabBar** embeds 5 nav glyphs (Today/Stay/Explore/Cabin/Connect) as inline single‑path SVGs extracted from Figma, recolored via `currentColor` so they theme by state.

### Icon batch download

The Figma "Icon" page (`1:25`) holds **3,846 symbols** — but 3,612 of those are the entire Material Symbols library dumped wholesale. The curated EKAM set is the **24 hand‑placed `<instance>` icons** (9 brand/social + 15 functional UI). Those 24 were exported as SVG via `download_assets`, then **cleaned** — each raw export carried Figma's `#1E1E1E` frame‑background rect and a 1645×8152 page‑background rect, both stripped to leave only the glyph. Saved to `figma-export/icons/` with a `manifest.json`.

### Git workflow

Work was committed and pushed to `github.com/julio293/EKAM-Design-System` (branch `main`) in batches as features completed, using the `gh`‑less `git` CLI. Commit identity: `Charity <julio@fyscaltech.com>`.

---

## 4. Phase 2 — Syncing to Claude Design (`/design-sync`)

The second half converts `figma-export/` into the format **claude.ai/design** consumes and uploads it, so the design agent builds with the real components. This was driven by the `/design-sync` skill plus the **`DesignSync` MCP server**.

### How the DesignSync MCP works

`DesignSync` reads and writes the user's claude.ai/design **design‑system projects** through their claude.ai login. It dispatches on a `method`:

| Method | What it does |
|---|---|
| `list_projects` / `get_project` | List/inspect design‑system projects you can write to |
| `create_project` | Make a new design‑system project (permission‑prompted) |
| `finalize_plan` | Lock the exact set of paths that may be written/deleted and the local source dir → returns a `planId`. One approval covers the whole run. |
| `write_files` / `delete_files` | Upload/remove files (must match the finalized plan; ≤256 files per call; reads from disk by `localPath` so contents never enter the model context) |
| `list_files` / `get_file` | Read back the project's contents to verify |

The app's **self‑check** fires when the project is opened (triggered by a `_ds_needs_recompile` sentinel file): it reads each component's `.d.ts` as the API contract, each preview's `@dsCard` header to register cards, and rebuilds its component index — then the design pane populates.

### The hard part: this repo had no build

The converter expects a buildable package with a `dist/` entry. This repo had none, so a **minimal build was created**:

- `figma-export/package.json` — name `@ekam/design-system`, `module` → `dist/index.es.js`.
- `figma-export/build.mjs` — esbuild bundles `components/index.js` into one ESM file with React external.
- `figma-export/theme.css` — `@font-face` declarations for the 4 brand families, pointing at clean‑named copies in `figma-export/assets/fonts/`.

### The conversion pipeline (what actually ran)

1. **Create the target project** — "EKAM Design System (figma-export)" (id `98a571eb‑…`), pinned in `.design-sync/config.json` before anything uploaded.
2. **Build `dist/`** via esbuild (`npm run build`).
3. **Run the converter** (`.ds-sync/package-build.mjs`) pointing at `dist/index.es.js`. Because there's no TypeScript:
   - Component discovery was forced via **`componentSrcMap`** (all 31 pinned).
   - Prop contracts were **hand‑written in `cfg.dtsPropsFor`** (24 components) since types can't be extracted from untyped JSX.
4. **Render check** (`package-validate.mjs`) — installed **Playwright + Chromium**, which screenshots every component preview headlessly and flags blanks. Iterated until clean (31/31, 0 bad).
5. **Author previews** — `.design-sync/previews/<Name>.tsx`, realistic cabin‑hospitality compositions. Calibrated on a solo set (Button/Input/Card/AppSectionHeader), then **fanned out to 3 parallel sub‑agents** over the rest, each authoring + screenshotting + grading only its own components. 23 components authored, every cell graded "good".
6. **Conventions header** — `.design-sync/conventions.md`, distilling how the agent must use the system (no provider; style via props not classes; the palette + type families), validated against the built artifacts.
7. **Final driver run** (`resync.mjs`) — chains build → diff → validate → capture and emits one verdict JSON; produced the upload plan and stamped the README with the header.
8. **Upload** — one approved plan, then: sentinel → 162 content files (components, previews, vendored React, fonts, styles) → sentinel re‑arm → `_ds_sync.json` anchor last. Verified via `list_files`.

### Why fonts/inline‑styles worked

EKAM is effectively a **CSS‑in‑JS / inline‑style** system — components carry their own styles, there are no CSS classes. The converter flags this as `[CSS_RUNTIME]` (self‑styling bundle, expected). The only global CSS needed was `@font-face`, which ships via `styles.css → fonts/fonts.css` so every rendered design gets the brand fonts.

---

## 5. Current state

**Live in Claude Design:** https://claude.ai/design/p/98a571eb-48ee-43a0-b9f5-b6e45ebbd85c

- 31 components imported and importable.
- 23 with rich authored previews (all cells "good"); 8 on functional floor cards.
- Render check clean; brand fonts shipped; conventions header in place.

### Repository layout (key paths)

```
figma-export/
  components/        # 31 React components (+ index.js barrel)
  icons/             # 24 curated SVGs + manifest.json
  tokens/            # colors.js, tokens.js (palette + type + spacing)
  logo/              # Logo, SubLogo
  assets/fonts/      # clean-named variable fonts for @font-face
  package.json       # minimal package (added for the sync build)
  build.mjs          # esbuild → dist/index.es.js
  theme.css          # @font-face for the 4 brand families
  dist/              # build output (gitignored)
.design-sync/        # sync inputs (durable, committed)
  config.json        # pkg, globalName, projectId, componentSrcMap, dtsPropsFor, cssEntry, readmeHeader
  conventions.md     # design-agent usage guide (README header)
  NOTES.md           # re-sync risks + gotchas
  previews/          # 23 authored <Name>.tsx preview files
.ds-sync/            # staged converter scripts + deps (gitignored)
ds-bundle/           # converter output uploaded to the project (gitignored)
```

---

## 6. How to maintain / re-sync

When components change, a re‑sync is mostly one command:

```bash
# 1. rebuild the dist entry
cd "figma-export" && npm run build && cd ..

# 2. fetch the project's anchor, then run the driver
#    (re-copy .ds-sync scripts first if stale)
node .ds-sync/resync.mjs --config .design-sync/config.json \
  --node-modules ./figma-export/node_modules \
  --entry ./figma-export/dist/index.es.js --out ./ds-bundle \
  --remote .design-sync/.cache/remote-sync.json
```

The driver re‑verifies only changed/new components and prints what to upload. **Important:** because the JSX is untyped, **prop contracts in `cfg.dtsPropsFor` are hand‑maintained** — update them when a component's props change. See `.design-sync/NOTES.md` for the full watch‑list (including the Slider native‑thumb cosmetic note).

---

## 7. Summary of the two MCP servers

- **Figma MCP** — read designs *out* of Figma (metadata, code context, variables, screenshots, asset export). It is how every component's exact tokens, layout, and variants were captured without leaving the editor.
- **DesignSync MCP** — write the compiled design system *into* claude.ai/design (create project, finalize an upload plan, write/delete/verify files). It is how the real EKAM components became available to Claude's design agent.

Together they close the loop: **Figma → real React code in this repo → Claude Design**, so every design Claude produces is built from EKAM's actual, on‑brand components.
