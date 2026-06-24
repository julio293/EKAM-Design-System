import React from 'react';
import { palette, colors, typography, radius } from '../tokens/tokens.js';

const accentColor = {
  terracotta: palette.terracotta,
  forest: palette.forest,
  olive: palette.olive,
  danger: palette.danger,
};

/** Library-tier card with a coloured top bar (node 202:45 "tier"). */
export default function TierCard({ accent = 'terracotta', title, value, body, surface = palette.cream }) {
  const bar = accentColor[accent] || palette.terracotta;
  return (
    <div
      style={{
        background: surface,
        borderRadius: radius.xl,
        overflow: 'hidden',
        fontFamily: typography.fontFamily,
      }}
    >
      <div style={{ height: 4, background: bar }} />
      <div style={{ padding: '18px 16px 16px' }}>
        <p style={{ margin: 0, fontWeight: typography.weight.semibold, fontSize: typography.size.bodyStrong, color: palette.ink }}>
          {title}
        </p>
        <p style={{ margin: '6px 0 0', fontWeight: typography.weight.bold, fontSize: typography.size.tierValue, color: bar }}>
          {value}
        </p>
        <p style={{ margin: '12px 0 0', fontWeight: typography.weight.regular, fontSize: typography.size.caption, lineHeight: typography.lineHeight.tight, color: colors.textBody }}>
          {body}
        </p>
      </div>
    </div>
  );
}
