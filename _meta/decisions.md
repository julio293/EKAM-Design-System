# EKAM Design System · Decision Log

> Append-only record of canonical decisions. Every "yes" with reasoning gets a line.
> Every "no" with a refusal gets a line. Reviewed quarterly during the drift audit.
> Format: `YYYY-MM-DD · verdict · subject · proposer · reason · effect`

---

## 2026

### 2026-05-28 · Day 1 of the 30-day reconstruction plan

**YES · `colors_and_type.css` is the single canonical source for all design tokens.**
- Proposer: Drift audit findings · v1.0
- Reason: three sources of truth existed (root CSS, design-system JSON dump, gamma-package/theme-tokens.json) — the latter two carried drifted hex values for sand, bone, and mist.
- Effect: JSON dump in `EKAM Mobile - Design System.html` reconciled to canonical values. `gamma-package/theme-tokens.json` updated. `gamma-package/colors_and_type.css` deleted. `gamma-package/ambient-ridge.css` deleted. Deck templates repointed to `../colors_and_type.css` and `../ambient-ridge.css`. **One source · one truth.**

**Canonical values locked:**
| Token | Hex | Was (in JSON dump) |
|---|---|---|
| `--sand` (surface) | `#F4EDE1` | `#F1ECDE` ✕ |
| `--bone` (line) | `#ECE4D3` | `#E5DFCB` ✕ |
| `--mist` (state) | `#D8D3C4` | `#C9C2AC` ✕ |

**NO · `gamma-package/` may not hold parallel token files.**
- Proposer: Day-1 cleanup
- Reason: any second source drifts within months. The principle of "one canonical token file" is non-negotiable.
- Effect: all gamma artifacts now import from root. README updated to reflect.

---

## Future entries follow

When a vendor proposes a new colour, a new font, or a new material — log it here, with date, proposer, and the rule cited from `00-principles`. The discipline is the record.


### 2026-05-28 · Week 2 build · Day 2

**YES · Sections 04 (Signage), 05 (Wayfinding), 06 (Cabin Anatomy) shipped.**
- Reason: 30-day plan Week 2 deliverables. These three pages convert the 6 FAIL items from the asset matrix into PASS by providing vendor-quotable specs.
- Effect:
  - **04-signage.html** — 6 typology categories, gate marker drawing + spec, cabin plate drawing + spec, 12 promoted house-rule panels, utility plates, site map board, 6 build rules.
  - **05-wayfinding.html** — 3 trail systems (short / forest / ridge), 6-arrow vocabulary, cedar trail-marker post (drawing + spec), no-light-after-dusk formal rule with 3 exceptions, distance & grade conventions, lookout post.
  - **06-cabin-anatomy.html** — reference cabin plan (6.4 × 3.6 m, 23 m² interior), 6 zones (door + bedside + kitchenette + bathroom + deck + roll-up), ~52 named items with material × cycle × supplier.
  - is-pending flags removed from nav across all OS pages now that 04, 05, 06 are live.
  - index.html pillar status: 04 / 05 / 06 → Draft.

**Asset matrix delta:** 6 FAIL items (cabin plate, gate marker, stamp, site map board, panel frames, etc.) now have vendor-quotable specs and become PASS. OS pages built: 4 → 7 (of 15). Pending sections: 11 → 8.
