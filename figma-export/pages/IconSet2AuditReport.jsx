import React from 'react';
import { palette, typography } from '../tokens/tokens.js';
import {
  Cover,
  Intro,
  Scores,
  LibraryBreakdown,
  NamingAnalysis,
  Issues,
  SizeReadability,
  BrandFit,
  Recommendations,
  Checklist,
  Footer,
} from '../organisms/index.js';

/**
 * Icon Set 2 — Audit Report (full page).
 * Faithful composition of Figma section 202:2 (file 3FvNk9nK0ed9dlPPvbKMms).
 * The 11 organisms stack vertically exactly as in the source poster.
 */
export default function IconSet2AuditReport() {
  return (
    <main style={{ background: palette.parchment, fontFamily: typography.fontFamily, color: palette.ink }}>
      <Cover />
      <Intro />
      <Scores />
      <LibraryBreakdown />
      <NamingAnalysis />
      <Issues />
      <SizeReadability />
      <BrandFit />
      <Recommendations />
      <Checklist />
      <Footer />
    </main>
  );
}
