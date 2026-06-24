/**
 * EKAM Design System — Figma export barrel.
 * Single entry point for tokens, data, components, organisms, and pages.
 *
 * Source: Figma file 3FvNk9nK0ed9dlPPvbKMms — page "Foundation Design",
 * section 202:2 "Icon Set 2 — Audit Report".
 */

// Variables / tokens
export { default as tokens } from './tokens/tokens.js';
export * from './tokens/tokens.js';
export * from './tokens/colors.js'; // canonical color tokens (node 1:24)

// Content data
export { default as report } from './data/report.js';

// Logo / brand
export * from './logo/index.js';

// Components (atoms / molecules)
export * from './components/index.js';

// Organisms (sections)
export * from './organisms/index.js';

// Pages
export * from './pages/index.js';
