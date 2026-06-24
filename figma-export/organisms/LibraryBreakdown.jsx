import React from 'react';
import { palette } from '../tokens/tokens.js';
import SectionHeader from '../components/SectionHeader.jsx';
import TierCard from '../components/TierCard.jsx';
import { libraryBreakdown } from '../data/report.js';

/** "What is in this set" — node 202:41. Parchment ground, cream cards. */
export default function LibraryBreakdown() {
  return (
    <section style={{ background: palette.parchment, padding: '40px 80px', maxWidth: 1440, margin: '0 auto', boxSizing: 'border-box' }}>
      <SectionHeader label={libraryBreakdown.label} title={libraryBreakdown.title} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {libraryBreakdown.tiers.map((t) => (
          <TierCard key={t.title} {...t} surface={palette.cream} />
        ))}
      </div>
    </section>
  );
}
