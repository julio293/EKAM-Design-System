import React from 'react';
import { palette } from '../tokens/tokens.js';
import SectionHeader from '../components/SectionHeader.jsx';
import RecCard from '../components/RecCard.jsx';
import { recommendations } from '../data/report.js';

/** "Design decisions & next steps" — node 202:213. */
export default function Recommendations() {
  return (
    <section style={{ background: palette.cream, padding: '40px 80px', maxWidth: 1440, margin: '0 auto', boxSizing: 'border-box' }}>
      <SectionHeader label={recommendations.label} title={recommendations.title} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, alignItems: 'stretch' }}>
        {recommendations.cards.map((c) => (
          <RecCard key={c.number} {...c} />
        ))}
      </div>
    </section>
  );
}
