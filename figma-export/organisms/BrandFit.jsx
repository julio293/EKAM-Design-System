import React from 'react';
import { palette, colors, typography } from '../tokens/tokens.js';
import SectionHeader from '../components/SectionHeader.jsx';
import ComparisonCard from '../components/ComparisonCard.jsx';
import { brandFit } from '../data/report.js';

/** "EKAM brand fit analysis" — node 202:177. */
export default function BrandFit() {
  return (
    <section style={{ background: palette.cream, padding: '40px 80px', maxWidth: 1440, margin: '0 auto', boxSizing: 'border-box', fontFamily: typography.fontFamily }}>
      <SectionHeader label={brandFit.label} title={brandFit.title} />

      <p style={{ margin: 0, maxWidth: 1280, fontWeight: typography.weight.semibold, fontSize: typography.size.bodyStrong, lineHeight: typography.lineHeight.relaxed, color: palette.ink }}>
        {brandFit.lead}
      </p>
      <p style={{ margin: '12px 0 24px', maxWidth: 1280, fontWeight: typography.weight.regular, fontSize: typography.size.subtitle, lineHeight: typography.lineHeight.body, color: colors.textBody }}>
        {brandFit.body}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {brandFit.cards.map((c) => (
          <ComparisonCard key={c.title} {...c} />
        ))}
      </div>
    </section>
  );
}
