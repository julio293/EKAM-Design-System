import React from 'react';
import { palette, colors, typography, radius } from '../tokens/tokens.js';
import Badge from './Badge.jsx';

const accentColor = {
  danger: palette.danger,
  forest: palette.forest,
  terracotta: palette.terracotta,
  olive: palette.olive,
};

/** Brand-fit comparison card with top bar, bullet list, and badge (node 202:183 "cmp"). */
export default function ComparisonCard({ accent = 'forest', title, points = [], badge, surface = palette.parchment }) {
  const bar = accentColor[accent] || palette.forest;
  return (
    <div
      style={{
        background: surface,
        borderRadius: radius.xl,
        overflow: 'hidden',
        fontFamily: typography.fontFamily,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ height: 4, background: bar }} />
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        <p style={{ margin: '0 0 4px', fontWeight: typography.weight.semibold, fontSize: typography.size.subtitle, color: palette.ink }}>
          {title}
        </p>
        {points.map((p, i) => (
          <p key={i} style={{ margin: 0, fontWeight: typography.weight.regular, fontSize: typography.size.caption, lineHeight: typography.lineHeight.snug, color: colors.textBody }}>
            {p}
          </p>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: 12 }}>
          <Badge tone={accent}>{badge}</Badge>
        </div>
      </div>
    </div>
  );
}
