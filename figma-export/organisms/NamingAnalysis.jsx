import React from 'react';
import { palette, colors, typography } from '../tokens/tokens.js';
import SectionHeader from '../components/SectionHeader.jsx';
import NamingStat from '../components/NamingStat.jsx';
import { naming } from '../data/report.js';

const cellLabel = {
  fontWeight: typography.weight.semibold,
  fontSize: typography.size.micro,
  letterSpacing: typography.tracking.microLabel,
  color: colors.textMuted,
  textTransform: 'uppercase',
};

/** "Naming quality deep dive" — node 202:60. Stats + summary + issue table. */
export default function NamingAnalysis() {
  return (
    <section style={{ background: palette.cream, padding: '40px 80px', maxWidth: 1440, margin: '0 auto', boxSizing: 'border-box', fontFamily: typography.fontFamily }}>
      <SectionHeader label={naming.label} title={naming.title} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {naming.stats.map((s) => (
          <NamingStat key={s.label} {...s} />
        ))}
      </div>

      <p style={{ margin: '24px 0 0', maxWidth: 1280, fontWeight: typography.weight.regular, fontSize: typography.size.body, lineHeight: typography.lineHeight.compact, color: colors.textBody }}>
        {naming.summary}
      </p>

      <div style={{ marginTop: 24, borderTop: `1px solid ${colors.border}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '24% 32% 44%', gap: 12, padding: '12px 0', borderBottom: `1px solid ${colors.border}` }}>
          {naming.table.columns.map((c) => (
            <span key={c} style={cellLabel}>{c}</span>
          ))}
        </div>
        {naming.table.rows.map((r, i) => (
          <div
            key={r.issue}
            style={{
              display: 'grid',
              gridTemplateColumns: '24% 32% 44%',
              gap: 12,
              padding: '10px 8px',
              background: i % 2 === 1 ? palette.parchment : 'transparent',
              fontSize: typography.size.caption,
              color: colors.textBody,
            }}
          >
            <span style={{ fontWeight: typography.weight.semibold, color: palette.ink }}>{r.issue}</span>
            <span>{r.examples}</span>
            <span>{r.action}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
