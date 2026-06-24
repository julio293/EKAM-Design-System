/**
 * EKAM Design System — Design Tokens
 * Exported from Figma "Foundation Design" (file 3FvNk9nK0ed9dlPPvbKMms).
 * Source node: section 202:2 "Icon Set 2 — Audit Report".
 *
 * These are the raw variables (colors, type, spacing, radii) observed in the
 * Figma file. Components and organisms consume these — never hard-code a value.
 */

import { color } from './colors.js';

// ── Color palette ────────────────────────────────────────────────────
// Canonical EKAM token names (single source of truth: ./colors.js, Figma node 1:24).
// Legacy aliases are kept so earlier components keep resolving.
export const palette = {
  // canonical
  cream: color.cream,          // #FAF7F0 — primary surface, text on dark
  sand: color.sand,            // #F4EDE1 — secondary surface / cards
  bone: color.bone,            // #ECE4D3 — tertiary surface
  ink: color.ink,              // #14201A — primary text, dark ground
  forest: color.forest,        // #2B4630 — body text, brand green
  moss: color.moss,            // #4F5C3F — muted text, labels, captions
  sage: color.sage,            // #C9D6BC — muted on dark / decorative
  bindu: color.bindu,          // #B4613A — primary accent (the • dot)
  binduDeep: color.binduDeep,  // #9C4F2A — deep accent
  mist: color.mist,            // #D8D3C4 — hairlines, borders
  danger: color.danger,        // #B23A2A — critical / errors
  success: color.success,      // #2B7A3F — positive / confirmation

  // legacy aliases → canonical (do not add new uses)
  olive: color.moss,
  terracotta: color.binduDeep,
  parchment: color.sand,
  border: color.mist,
};

// ── Semantic colors ──────────────────────────────────────────────────
export const colors = {
  bgInk: palette.ink,
  bgCream: palette.cream,
  bgParchment: palette.parchment,
  surface: palette.parchment,        // default card surface on cream sections
  surfaceAlt: palette.cream,         // card surface on parchment sections
  textPrimary: palette.ink,
  textBody: palette.forest,
  textMuted: palette.olive,
  textOnDark: palette.cream,
  textMutedOnDark: palette.sage,
  accent: palette.terracotta,
  positive: palette.forest,
  warning: palette.terracotta,
  critical: palette.danger,
  border: palette.border,
};

// ── Score / severity scales (value → color) ──────────────────────────
export const scoreColor = (value) => {
  if (value == null) return colors.textBody;
  if (value >= 7.5) return palette.forest;     // good
  if (value >= 5.5) return palette.terracotta;  // caution
  return palette.danger;                        // poor
};

export const severityColor = {
  critical: palette.danger,    // ●
  important: palette.terracotta, // ▲
  note: palette.olive,         // ◆
};

// ── Typography ───────────────────────────────────────────────────────
export const typography = {
  fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  weight: { regular: 400, semibold: 600, bold: 700 },
  size: {
    display: 56, // cover title
    h2: 36,      // section title
    statValue: 24,
    tierValue: 20,
    bodyStrong: 14,
    subtitle: 13,
    body: 12,
    caption: 11,
    micro: 10,   // uppercase labels
  },
  tracking: {
    sectionLabel: '0.88px',
    microLabel: '0.8px',
    scLabel: '0.6px',
  },
  lineHeight: {
    display: '64px',
    relaxed: '22px',
    body: '20px',
    snug: '18px',
    tight: '17px',
    compact: '16px',
  },
};

// ── Spacing & layout ─────────────────────────────────────────────────
export const layout = {
  pageWidth: 1440,   // full poster frame
  contentX: 80,      // left/right margin to content
  contentWidth: 1280,
  sectionGap: 40,
};

export const space = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 40,
};

// ── Radii ────────────────────────────────────────────────────────────
export const radius = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
  pill: 20,
};

const tokens = {
  palette,
  colors,
  scoreColor,
  severityColor,
  typography,
  layout,
  space,
  radius,
};

export default tokens;
