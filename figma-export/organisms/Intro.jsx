import React from 'react';
import { palette, colors, typography } from '../tokens/tokens.js';
import { intro } from '../data/report.js';

/** "About this report" intro — node 202:10. */
export default function Intro() {
  return (
    <section
      style={{
        background: palette.cream,
        padding: '32px 80px',
        maxWidth: 1440,
        margin: '0 auto',
        boxSizing: 'border-box',
        fontFamily: typography.fontFamily,
      }}
    >
      <h3 style={{ margin: 0, fontWeight: typography.weight.semibold, fontSize: 18, color: palette.ink }}>
        {intro.heading}
      </h3>
      <p
        style={{
          margin: '12px 0 0',
          maxWidth: 1280,
          fontWeight: typography.weight.regular,
          fontSize: typography.size.subtitle,
          lineHeight: typography.lineHeight.body,
          color: colors.textBody,
        }}
      >
        {intro.body}
      </p>
    </section>
  );
}
