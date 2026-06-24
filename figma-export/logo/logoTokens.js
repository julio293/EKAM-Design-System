/**
 * EKAM Logo — tokens & brand data.
 * Exported from Figma file 3FvNk9nK0ed9dlPPvbKMms, page "→ Logo ✅"
 * (section "Logo EKAM" 22:3 + frame "Logo Guidelines" 159:1723).
 *
 * The wordmark is "E•KAM": serif E + Bindu dot + serif KAM (एकम् = "one" in
 * Sanskrit). The Bindu ("point") dot is the brand marker, always in accent color.
 */

import { color } from '../tokens/colors.js';

// ── Logo color tokens (node 159:2492) ────────────────────────────────
// Drawn from the canonical palette so logo + system never drift apart.
export const logoColors = {
  ink: color.ink,             // #14201A — Latin letterforms (E, KAM)
  forest: color.forest,       // #2B4630 — alternate / reversed text
  bindu: color.bindu,         // #B4613A — the • accent dot
  binduDeep: color.binduDeep, // #9C4F2A — Devanagari script color
  cream: color.cream,         // #FAF7F0 — reversed (on dark backgrounds)
  sand: color.sand,           // #F4EDE1 — soft reversed variant
};

// ── Color modes (Figma "Logo Variable" Mode property) ────────────────
// Each mode sets the letterform color and the Bindu dot color.
export const logoModes = {
  light:  { text: logoColors.ink,    dot: logoColors.bindu },     // default, on light bgs
  dark:   { text: logoColors.cream,  dot: logoColors.bindu },     // on Ink / dark bgs
  forest: { text: logoColors.forest, dot: logoColors.bindu },     // forest-colored on light
  black:  { text: logoColors.ink,    dot: logoColors.ink },       // solid, no accent
  mono:   { text: 'currentColor',    dot: 'currentColor' },        // inherits text color
};

// ── Approved / avoided backgrounds (node 159:2267) ───────────────────
export const backgrounds = {
  approved: [
    { name: 'On Cream', note: 'Primary — default use' },
    { name: 'On Sand', note: 'Secondary surface' },
    { name: 'On Bone', note: 'Tertiary surface' },
    { name: 'On Ink', note: 'Dark mode / reversed' },
    { name: 'On Forest', note: 'Brand dark green' },
    { name: 'On Bindu Deep', note: 'Accent background' },
  ],
  avoid: [
    { name: 'On Sage', note: 'Low contrast — fails AA' },
    { name: 'On Mist', note: 'Bindu dot disappears' },
    { name: 'On Bindu', note: 'Dot merges into bg' },
  ],
};

// ── Four sub-brand verticals (node 159:2335) ─────────────────────────
export const subBrands = [
  { key: 'kutir',   latin: 'KUTIR',   devanagari: 'कुटीर', label: 'Home & Living',    detail: 'Hospitality & spaces. Earthy, warm, grounded.',   accent: '#B4613A', icon: 'home' },
  { key: 'van',     latin: 'VAN',     devanagari: 'वन',    label: 'Nature & Forest',  detail: 'Wild, organic textures. Sustainability focus.',   accent: '#2B4630', icon: 'trees' },
  { key: 'shikhar', latin: 'SHIKHAR', devanagari: 'शिखर',  label: 'Peak & Elevation', detail: 'Achievement, altitude. Adventure & sport.',       accent: '#4F5C3F', icon: 'peak' },
  { key: 'chai',    latin: 'CHAI',    devanagari: 'चाय',   label: 'Tea & Ritual',     detail: 'Daily ritual, warmth. Beverage & culture.',       accent: '#9C4F2A', icon: 'cup' },
];

// ── Typefaces (node 159:2461) ────────────────────────────────────────
export const typefaces = {
  primary:  { family: "'Cormorant Garamond', serif", note: 'Primary wordmark (Latin) — E•KAM and display headings.' },
  devanagari: { family: "'Tiro Devanagari Hindi', serif", note: 'एकम् and sub-brand Devanagari names.' },
  ui: { family: "'Plus Jakarta Sans', system-ui, sans-serif", note: 'UI labels, body copy, functional text.' },
};

// ── Clear space & minimum sizes (node 159:2401) ──────────────────────
export const usage = {
  clearSpace: '1× cap-height on all sides',
  minSizes: [
    { size: '96px+', context: 'Digital — hero / masthead' },
    { size: '48–96px', context: 'Digital — header navigation' },
    { size: '32–48px', context: 'Digital — compact / app icon context' },
    { size: '24mm+', context: 'Print — minimum for legibility' },
    { size: '< 24px', context: 'Digital — use icon/monogram only' },
  ],
  dos: [
    'Use on brand backgrounds only',
    'Maintain proportional scaling',
    'Keep the Bindu dot in accent color',
    'Use Devanagari in cultural contexts',
  ],
  donts: [
    'Do not stretch or distort',
    'Do not recolor the Bindu dot to any other color',
    'Do not place on patterned or photographic backgrounds',
    'Do not use Sage or Mist color on light backgrounds',
  ],
};

const logoTokens = { logoColors, logoModes, backgrounds, subBrands, typefaces, usage };
export default logoTokens;
