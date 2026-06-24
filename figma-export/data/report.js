/**
 * EKAM — Icon Set 2 Audit Report — Content data
 * All copy extracted verbatim from Figma section 202:2.
 * Organisms render from this so content stays separate from layout.
 */

export const meta = {
  brand: 'EKAM',
  title: 'Icon Set 2',
  subtitle: 'Audit Report',
  caption: 'EKAM Design System  ·  Material Icons Library Analysis  ·  June 2026',
};

export const intro = {
  heading: 'About this report',
  body:
    'This document audits icon set node 195-62 of the EKAM Design System — a large-scale ' +
    'library of 3,636 icons in 26 columns × 140 rows. The set comprises two tiers: a brand/social ' +
    'logo row (9 icons: Relume, Google, Facebook, Apple, Instagram, LinkedIn, X, Youtube, Dribbble) ' +
    'and the complete Google Material Icons filled library (3,627 icons). Issues cover visual ' +
    'consistency, naming conventions, brand alignment, structural organisation, and readability ' +
    'across sizes.',
};

// ── Summary scores ───────────────────────────────────────────────────
export const scores = {
  label: 'SUMMARY SCORES',
  title: 'At a glance',
  cards: [
    { label: 'ICON COUNT', value: '3,636', score: null, caption: 'Largest set in system' },
    { label: 'NAMING QUALITY', value: '8.5 / 10', score: 8.5, caption: 'Mostly good snake_case' },
    { label: 'STYLE CONSISTENCY', value: '6.5 / 10', score: 6.5, caption: 'Filled + mixed logos' },
    { label: 'EKAM BRAND FIT', value: '4.5 / 10', score: 4.5, caption: 'Generic — not bespoke' },
    { label: 'READABILITY 16px', value: '7.5 / 10', score: 7.5, caption: 'Material optimised well' },
    { label: 'COVERAGE', value: '9.5 / 10', score: 9.5, caption: 'Exceptional breadth' },
  ],
};

// ── Library breakdown ────────────────────────────────────────────────
export const libraryBreakdown = {
  label: 'LIBRARY BREAKDOWN',
  title: 'What is in this set',
  tiers: [
    {
      accent: 'terracotta',
      title: 'Brand & Social Logos',
      value: '9 icons — Row 1',
      body:
        'Relume, Google, Facebook, Apple, Instagram, LinkedIn, X (Twitter), Youtube, Dribbble. ' +
        'Solid filled logomarks — different visual weight and style from the icon body.',
    },
    {
      accent: 'forest',
      title: 'Google Material Icons',
      value: '3,627 icons — Rows 2–140',
      body:
        'The complete Google Material Icons library in filled/solid style. All 24×24px. Consistent ' +
        'filled treatment. Organised in a flat 26-column grid with no category grouping.',
    },
    {
      accent: 'olive',
      title: 'Numerical Display Icons',
      value: '318 icons — subset',
      body:
        'Icons with numbers in names: 10k, 4mp, 60fps, counter_5, battery_horiz_050 etc. Narrow ' +
        'display/camera/media use cases. Rarely applicable to hospitality product UI.',
    },
  ],
};

// ── Naming analysis ──────────────────────────────────────────────────
export const naming = {
  label: 'NAMING CONVENTION AUDIT',
  title: 'Naming quality deep dive',
  stats: [
    { label: 'SNAKE_CASE (CORRECT)', value: '2,754 icons', caption: '75.7% of set' },
    { label: 'SINGLE-WORD (AMBIGUOUS)', value: '873 icons', caption: '24.0% — need prefixes' },
    { label: 'BRAND TITLE CASE (ROW 1)', value: '9 icons', caption: 'Correct for brand logos' },
    { label: 'DUPLICATE NAMES', value: '1 duplicate', caption: 'person ×2 (195:88, 195:6989)' },
  ],
  summary:
    '75.7% of icons use proper snake_case — strong baseline. However 873 single-word icons like ' +
    '"add", "check", "menu", "box", "circle", "close", "search", "help" will collide with HTML ' +
    'element names, CSS tokens, and framework reserved words in any code export. All need a ui_ ' +
    'prefix. Additionally 47 icons exceed 25 characters (longest: ' +
    'signal_cellular_connected_no_internet_0_bar at 43 chars) — these overflow variable name ' +
    'limits in most frameworks.',
  table: {
    columns: ['ISSUE', 'EXAMPLES', 'ACTION'],
    rows: [
      {
        issue: 'Generic ambiguous single words',
        examples: '"add","check","menu","box","circle","close","remove","more","help","search"',
        action: 'Prefix with ui_: ui_add, ui_check, ui_menu',
      },
      {
        issue: 'Ultra-long names (>25 chars)',
        examples: '"signal_cellular_connected_no_internet_0_bar" (43 chars)',
        action: 'Abbreviate: signal_no_internet_0bar',
      },
      {
        issue: 'Number-only icons with no prefix',
        examples: '"10k","4mp","60fps","5g","3d","1k","counter_5"',
        action: 'Add display_ prefix: display_10k, media_60fps',
      },
      {
        issue: 'Duplicate: person ×2',
        examples: '195:88 and 195:6989 both named "person"',
        action: 'Rename 195:6989 → person_alt or person_outline',
      },
      {
        issue: '"Dribble" brand typo',
        examples: '195:74 named "Dribble" (should be "Dribbble")',
        action: 'Fix typo: Dribble → Dribbble',
      },
    ],
  },
};

// ── Critical & important issues ──────────────────────────────────────
export const issues = {
  label: 'FINDINGS',
  title: 'Critical & important issues',
  columns: ['SEV', 'ISSUE', 'DESCRIPTION & SCOPE'],
  rows: [
    {
      severity: 'critical',
      title: 'Unmodified Material Icons — no EKAM brand differentiation',
      description:
        'The 3,627-icon body is verbatim Google Material Icons (filled variant). EKAM is a ' +
        'hospitality brand with warm earth tones and a human, inviting character. Material Icons ' +
        'are geometric, utilitarian, and designed for software dashboards — not brand experiences. ' +
        'Any senior brand reviewer will flag this immediately.',
      scope: 'Scope: All 3,627 non-logo icons',
    },
    {
      severity: 'critical',
      title: 'Two incompatible visual styles in one set',
      description:
        'Row 1 uses rounded, heavy logomarks (social brand icons). The main body uses flat, ' +
        'geometric Material filled icons. No visual connector exists between these tiers. Together ' +
        'they do not constitute a coherent design system icon language.',
      scope: 'Scope: 195:63 (brand row) vs 195:75 (main body)',
    },
    {
      severity: 'critical',
      title: 'No EKAM style tokens applied — icons are disconnected from design system',
      description:
        'No EKAM color tokens (Forest, Ink, Bindu), stroke weights, or corner treatments have been ' +
        'applied to the icon set. Icons cannot be color-themed via design tokens. They exist as ' +
        'standalone visual assets, not integrated design system components.',
      scope: 'Scope: Full set — zero token bindings',
    },
    {
      severity: 'important',
      title: '873 single-word icons will cause code namespace collisions',
      description:
        '"add", "remove", "search", "check", "menu", "circle", "box" and 866 more are reserved or ' +
        'generic terms that collide with HTML element names, CSS property names, and framework ' +
        'component names. Cannot be safely exported as tokens without prefixes.',
      scope: 'Scope: 873 icons (24% of set)',
    },
    {
      severity: 'important',
      title: '47 icon names exceed 25 characters — developer experience failure',
      description:
        '"signal_cellular_connected_no_internet_0_bar" (43 chars) and 46 others break practical ' +
        'variable name length limits. Causes linting warnings and makes code unreadable. The ' +
        'longest name is 43 characters.',
      scope: 'Scope: 47 icons; worst: 43 characters',
    },
    {
      severity: 'important',
      title: '"Dribble" typo in brand logo row (should be "Dribbble")',
      description:
        'The Dribbble logo is named "Dribble" — missing one "b". This typo propagates into all ' +
        'exports, documentation, and component libraries. Low effort to fix; high cost if left unfixed.',
      scope: 'Scope: 195:74',
    },
    {
      severity: 'important',
      title: '318 numeric/display icons clutter browsability without categorisation',
      description:
        'Without category grouping the flat grid of 3,636 icons is overwhelming. There is no ' +
        'separation between UI icons, system icons, brand icons, and display icons. Discovery is ' +
        'dependent on knowing exact names.',
      scope: 'Scope: 318 display icons, full flat layout',
    },
    {
      severity: 'note',
      title: 'No component structure — all icons are flat instances without Size/Color props',
      description:
        'No component sets with Size=16|20|24|32 or Color=default|muted|inverted properties exist. ' +
        'Engineers must manually resize every icon, defeating the purpose of a shared library. ' +
        'Figma component sets are needed.',
      scope: 'Scope: Full set — structural gap',
    },
  ],
};

// ── Readability by size ──────────────────────────────────────────────
export const sizeReadability = {
  label: 'SIZE TESTING',
  title: 'Readability by size',
  cards: [
    { size: '12px', badge: 'Marginal', tone: 'danger', note: 'Fine inner detail is lost. Simple shapes survive. Not recommended.' },
    { size: '16px', badge: 'Good', tone: 'terracotta', note: 'Material filled icons were designed for 16px — most icons are clear.' },
    { size: '20px', badge: 'Very good', tone: 'forest', note: 'Optimal size for filled Material. Full legibility across all icons.' },
    { size: '24px', badge: 'Excellent', tone: 'forest', note: 'Native size. Perfect clarity. The primary usage context.' },
    { size: '32px+', badge: 'Excellent', tone: 'forest', note: 'All icons scale cleanly. No detail loss at larger sizes.' },
  ],
};

// ── Brand fit ────────────────────────────────────────────────────────
export const brandFit = {
  label: 'BRAND ALIGNMENT',
  title: 'EKAM brand fit analysis',
  lead:
    'The most significant issue is strategic, not technical. Google Material Icons were designed ' +
    'for general-purpose software products. EKAM is a hospitality design system for a warm, human, ' +
    'experience-led brand. The visual language does not match.',
  body:
    'Material filled icons are geometric and utilitarian — cold neutrals appropriate for ' +
    'productivity apps. EKAM uses Cream, Forest, Bindu, and Sage to communicate warmth, nature, ' +
    'and craft. Deploying Material Icons verbatim creates a visible disconnect between the icon ' +
    'layer and every other element in the EKAM system: typography, color, component shapes, and ' +
    'brand tone.',
  cards: [
    {
      accent: 'danger',
      title: 'Material Icons style',
      points: ['Geometric & utilitarian', 'Sharp angles, flat fills', 'Software dashboard feel', 'Cold neutral affect', 'No brand specificity'],
      badge: 'Does not match EKAM',
    },
    {
      accent: 'forest',
      title: 'EKAM brand ideal',
      points: ['Warm & human', 'Round corners preferred', 'Hospitality experience feel', 'Earthy, inviting affect', 'Distinctive brand identity'],
      badge: 'Brand ideal state',
    },
    {
      accent: 'terracotta',
      title: 'Recommended approach',
      points: ['Keep Material as utility base', 'Add namespace/token layer', 'Draw custom core 30 icons', 'Apply Forest/Bindu strokes', 'Add rounded corner treatment'],
      badge: 'Hybrid strategy',
    },
  ],
};

// ── Recommendations ──────────────────────────────────────────────────
export const recommendations = {
  label: 'RECOMMENDATIONS',
  title: 'Design decisions & next steps',
  cards: [
    {
      number: '01',
      title: 'Separate brand logos to a dedicated brand/ page',
      body:
        'Move the 9 social logos to a "brand/" page. This prevents style mixing in the UI library ' +
        'panel and gives engineers a single-style import per context. Fix the "Dribble" → ' +
        '"Dribbble" typo at the same time.',
    },
    {
      number: '02',
      title: 'Prefix all 873 ambiguous single-word icons with ui_',
      body:
        '"add" → "ui_add", "menu" → "ui_menu", "check" → "ui_check". Use Figma Rename It plugin ' +
        'with a prefix batch rule. Critical before any code handoff — prevents irreversible token ' +
        'name collisions.',
    },
    {
      number: '03',
      title: 'Curate an "EKAM Essentials" sub-set (top 80 icons)',
      body:
        'From 3,636 options, surface the 80 most relevant to hospitality UX: navigation, amenities, ' +
        'F&B, travel, booking, social. This becomes the primary library for product designers and ' +
        'reduces decision paralysis.',
    },
    {
      number: '04',
      title: 'Commission custom EKAM icon redraws for the top 30',
      body:
        'The 30 most-used UI icons (search, home, user, bell, cart, heart, map, calendar, star, ' +
        'menu) should be redrawn in EKAM style: 1.5px round-cap strokes, Forest green, warmer ' +
        'geometry. These replace Material defaults in branded contexts.',
    },
    {
      number: '05',
      title: 'Build component sets with Size and Color properties',
      body:
        'Wrap all icons in component sets with Size=16|20|24|32 and ' +
        'Color=default|muted|inverted|brand properties, linked to EKAM design tokens. This is the ' +
        'minimum structure for a production design system handoff.',
    },
  ],
};

// ── Remediation checklist ────────────────────────────────────────────
export const checklist = {
  label: 'REMEDIATION PLAN',
  title: 'Prioritised fix checklist',
  phases: [
    {
      title: 'Phase 1 — Critical (1 day)',
      tone: 'danger',
      tasks: [
        'Move brand logos to separate brand/ page',
        'Fix "Dribble" → "Dribbble" typo (195:74)',
        'Rename person duplicate (195:6989 → person_alt)',
        'Add ui_ prefix to all 873 single-word icons',
        'Review and abbreviate all 47 names >25 chars',
        'Add display_ prefix to 318 numeric icons',
        'Create pinned "EKAM Essentials" component frame',
      ],
    },
    {
      title: 'Phase 2 — Important (2 days)',
      tone: 'terracotta',
      tasks: [
        'Build component sets with Size property (16/20/24/32)',
        'Add Color property linked to EKAM design tokens',
        'Create curated "EKAM Essentials" page (top 80 icons)',
        'Apply Forest/Ink/Bindu color variants as component props',
        'Write icon usage guide (when to use which tier)',
        'Test all Essentials icons at 16px on Cream + Ink backgrounds',
        'Verify all brand logo spellings against official brand guidelines',
      ],
    },
    {
      title: 'Phase 3 — Brand Polish (3–5 days)',
      tone: 'forest',
      tasks: [
        'Commission custom redraws for top 30 UI icons in EKAM style',
        'Apply 1.5px round-cap round-join stroke to custom icons',
        'Create filled + outline variants for top 30 custom icons',
        'Build EKAM icon style guide page in Figma',
        'Export SVG sprite of EKAM Essentials (SVGO optimised)',
        'Publish EKAM Essentials as v1.0 shared library',
        'Set quarterly review cadence for icon additions',
      ],
    },
  ],
};

export const footer = {
  left: 'EKAM Design System · Icon Set 2 (Material Icons) Audit Report · Generated June 2026',
  right: 'Senior Illustrator / Iconographer review',
};

const report = {
  meta, intro, scores, libraryBreakdown, naming, issues,
  sizeReadability, brandFit, recommendations, checklist, footer,
};

export default report;
