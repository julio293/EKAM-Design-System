/**
 * EKAM Design System — Canonical Color Tokens
 * Source of truth: Figma file 3FvNk9nK0ed9dlPPvbKMms, page "Colors" (node 1:24),
 * "Color Accessibility Audit Report".
 *
 * NOTE: The Figma file contains hex *label* typos that the audit page itself flags —
 * Forest was labelled #EAEAFF, Moss #FF00FF, Sage #FFFFFF. Those labels are wrong;
 * the real swatch values (used below) are #2B4630, #4F5C3F and #C9D6BC.
 */

// ── Canonical tokens (name → hex) ────────────────────────────────────
export const color = {
  // Surface
  cream: '#FAF7F0',
  sand: '#F4EDE1',
  bone: '#ECE4D3',
  // Text
  ink: '#14201A',
  forest: '#2B4630',
  moss: '#4F5C3F',
  sage: '#C9D6BC',
  // Accent
  bindu: '#B4613A',
  binduDeep: '#9C4F2A',
  // State
  mist: '#D8D3C4',
  danger: '#B23A2A',
  success: '#2B7A3F',
};

// ── Token groups (as organised on the Figma page) ────────────────────
export const colorGroups = {
  surface: ['cream', 'sand', 'bone'],
  text: ['ink', 'forest', 'moss', 'sage'],
  accent: ['bindu', 'binduDeep'],
  state: ['mist', 'danger', 'success'],
};

// ── Display metadata (label + group + role) ──────────────────────────
export const colorMeta = {
  cream:     { label: 'Cream',      group: 'surface', role: 'Primary surface — default page background' },
  sand:      { label: 'Sand',       group: 'surface', role: 'Secondary surface / card' },
  bone:      { label: 'Bone',       group: 'surface', role: 'Tertiary surface' },
  ink:       { label: 'Ink',        group: 'text',    role: 'Primary text, dark ground' },
  forest:    { label: 'Forest',     group: 'text',    role: 'Body text, brand dark green' },
  moss:      { label: 'Moss',       group: 'text',    role: 'Muted text, labels, captions' },
  sage:      { label: 'Sage',       group: 'text',    role: 'Muted text on dark; decorative on light' },
  bindu:     { label: 'Bindu',      group: 'accent',  role: 'Primary accent — the • dot, large headings/CTAs' },
  binduDeep: { label: 'Bindu Deep', group: 'accent',  role: 'Deep accent — Devanagari, dense accent text' },
  mist:      { label: 'Mist',       group: 'state',   role: 'Hairlines, borders, dividers' },
  danger:    { label: 'Danger',     group: 'state',   role: 'Errors, critical states' },
  success:   { label: 'Success',    group: 'state',   role: 'Confirmation, positive states' },
};

// ── WCAG guidance (verbatim from the audit's recommendations) ────────
export const a11y = {
  sage:
    'Sage (#C9D6BC) at ~2.1:1 on Cream fails every WCAG level. Reserve it for decorative ' +
    'borders, tags, or as text on Ink/Forest backgrounds where it passes AA Large.',
  bindu:
    '#B4613A is 3.3:1 on Cream — valid for AA Large only. Use for headings (18pt+), large ' +
    'CTAs, and icon labels. Do not apply at 14px regular weight or smaller.',
  danger:
    '#B23A2A passes AA (4.6:1) on Cream but drops to ~3.8:1 on Bone. Always pair error ' +
    'messages with Cream or white backgrounds for reliable compliance.',
  darkMode:
    'The palette is warm-light by nature. Map inverse tokens (Ink as background, Cream/Sage ' +
    'as foreground) to unlock a dark mode without introducing new brand hues.',
};

export default color;
