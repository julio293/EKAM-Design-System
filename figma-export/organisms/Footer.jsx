import React from 'react';
import { palette, typography } from '../tokens/tokens.js';
import { footer } from '../data/report.js';

/** Footer band — node 202:315. Dark ink ground. */
export default function Footer() {
  return (
    <footer
      style={{
        background: palette.ink,
        padding: '28px 80px',
        maxWidth: 1440,
        margin: '0 auto',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 24,
        flexWrap: 'wrap',
        fontFamily: typography.fontFamily,
        fontSize: typography.size.bodyStrong,
        color: palette.sage,
      }}
    >
      <span>{footer.left}</span>
      <span>{footer.right}</span>
    </footer>
  );
}
