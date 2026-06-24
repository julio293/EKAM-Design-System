import React from 'react';
import { palette, colors, typography, radius } from '../tokens/tokens.js';
import Badge from './Badge.jsx';

/** Readability-by-size tile (node 202:152 "sz"). */
export default function SizeCard({ size, badge, tone = 'forest', note, surface = palette.parchment }) {
  return (
    <div
      style={{
        background: surface,
        borderRadius: radius.lg,
        padding: '12px 16px',
        minHeight: 76,
        boxSizing: 'border-box',
        fontFamily: typography.fontFamily,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontWeight: typography.weight.bold, fontSize: typography.size.bodyStrong, color: palette.ink }}>
          {size}
        </span>
        <Badge tone={tone}>{badge}</Badge>
      </div>
      <p style={{ margin: '12px 0 0', fontWeight: typography.weight.regular, fontSize: typography.size.caption, lineHeight: typography.lineHeight.compact, color: colors.textBody }}>
        {note}
      </p>
    </div>
  );
}
