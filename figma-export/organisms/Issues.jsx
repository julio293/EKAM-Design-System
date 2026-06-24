import React from 'react';
import { palette, colors, typography } from '../tokens/tokens.js';
import SectionHeader from '../components/SectionHeader.jsx';
import IssueRow from '../components/IssueRow.jsx';
import { issues } from '../data/report.js';

/** "Critical & important issues" — node 202:104. */
export default function Issues() {
  return (
    <section style={{ background: palette.cream, padding: '40px 80px', maxWidth: 1440, margin: '0 auto', boxSizing: 'border-box', fontFamily: typography.fontFamily }}>
      <SectionHeader label={issues.label} title={issues.title} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '24px 1fr',
          gap: '0 8px',
          padding: '0 0 8px',
          borderBottom: `1px solid ${colors.border}`,
          fontWeight: typography.weight.semibold,
          fontSize: typography.size.micro,
          letterSpacing: typography.tracking.microLabel,
          color: colors.textMuted,
        }}
      >
        <span>{issues.columns[0]}</span>
        <span>{issues.columns[1]} &nbsp;·&nbsp; {issues.columns[2]}</span>
      </div>

      {issues.rows.map((row, i) => (
        <IssueRow key={row.title} {...row} alt={i % 2 === 1} />
      ))}
    </section>
  );
}
