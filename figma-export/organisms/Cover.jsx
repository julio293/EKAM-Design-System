import React from 'react';
import { palette, typography } from '../tokens/tokens.js';
import LogoPill from '../components/LogoPill.jsx';
import { meta } from '../data/report.js';

/** Cover band — node 202:3. Dark ink ground with left accent rule. */
export default function Cover() {
  return (
    <section
      style={{
        position: 'relative',
        background: palette.ink,
        padding: '80px',
        maxWidth: 1440,
        margin: '0 auto',
        boxSizing: 'border-box',
        fontFamily: typography.fontFamily,
      }}
    >
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, background: palette.terracotta }} />
      <LogoPill label={meta.brand} />
      <h1
        style={{
          margin: '40px 0 0',
          fontWeight: typography.weight.bold,
          fontSize: typography.size.display,
          lineHeight: typography.lineHeight.display,
          color: palette.cream,
        }}
      >
        {meta.title}<br />{meta.subtitle}
      </h1>
      <p
        style={{
          margin: '24px 0 0',
          fontWeight: typography.weight.regular,
          fontSize: typography.size.bodyStrong,
          color: palette.sage,
        }}
      >
        {meta.caption}
      </p>
    </section>
  );
}
