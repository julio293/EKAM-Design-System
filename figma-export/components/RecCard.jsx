import React from 'react';
import { palette, colors, typography, radius } from '../tokens/tokens.js';

/** Recommendation card — big index number, title, body (node 202:217 "rec"). */
export default function RecCard({ number, title, body, accent = palette.terracotta, surface = palette.parchment }) {
  return (
    <div
      style={{
        background: surface,
        borderRadius: radius.xl,
        overflow: 'hidden',
        fontFamily: typography.fontFamily,
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ height: 4, background: accent }} />
      <div style={{ padding: '20px 16px' }}>
        <p style={{ margin: 0, fontWeight: typography.weight.bold, fontSize: 32, color: accent, lineHeight: 1 }}>
          {number}
        </p>
        <p style={{ margin: '16px 0 0', fontWeight: typography.weight.semibold, fontSize: typography.size.bodyStrong, color: palette.ink, lineHeight: 1.25 }}>
          {title}
        </p>
        <p style={{ margin: '16px 0 0', fontWeight: typography.weight.regular, fontSize: typography.size.caption, lineHeight: typography.lineHeight.tight, color: colors.textBody }}>
          {body}
        </p>
      </div>
    </div>
  );
}
