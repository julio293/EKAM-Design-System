import React from 'react';
import { palette } from '../tokens/tokens.js';
import SectionHeader from '../components/SectionHeader.jsx';
import ScoreCard from '../components/ScoreCard.jsx';
import { scores } from '../data/report.js';

/** "At a glance" summary scores — node 202:13. */
export default function Scores() {
  return (
    <section style={{ background: palette.cream, padding: '40px 80px', maxWidth: 1440, margin: '0 auto', boxSizing: 'border-box' }}>
      <SectionHeader label={scores.label} title={scores.title} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
        {scores.cards.map((c) => (
          <ScoreCard key={c.label} {...c} />
        ))}
      </div>
    </section>
  );
}
