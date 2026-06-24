import React from 'react';
import { palette } from '../tokens/tokens.js';
import SectionHeader from '../components/SectionHeader.jsx';
import SizeCard from '../components/SizeCard.jsx';
import { sizeReadability } from '../data/report.js';

/** "Readability by size" — node 202:148. */
export default function SizeReadability() {
  return (
    <section style={{ background: palette.cream, padding: '40px 80px', maxWidth: 1440, margin: '0 auto', boxSizing: 'border-box' }}>
      <SectionHeader label={sizeReadability.label} title={sizeReadability.title} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
        {sizeReadability.cards.map((c) => (
          <SizeCard key={c.size} {...c} />
        ))}
      </div>
    </section>
  );
}
