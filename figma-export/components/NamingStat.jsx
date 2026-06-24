import React from 'react';
import { palette, colors, typography, radius } from '../tokens/tokens.js';

/** Naming-analysis stat tile (node 202:64 "ns"). */
export default function NamingStat({ label, value, caption, surface = palette.parchment }) {
  return (
    <div
      style={{
        background: surface,
        borderRadius: radius.lg,
        padding: '14px 16px',
        minHeight: 90,
        boxSizing: 'border-box',
        fontFamily: typography.fontFamily,
      }}
    >
      <p style={{ margin: 0, fontWeight: typography.weight.semibold, fontSize: typography.size.micro, letterSpacing: typography.tracking.scLabel, color: colors.textMuted, textTransform: 'uppercase' }}>
        {label}
      </p>
      <p style={{ margin: '6px 0 0', fontWeight: typography.weight.bold, fontSize: typography.size.statValue, color: palette.ink }}>
        {value}
      </p>
      <p style={{ margin: '10px 0 0', fontWeight: typography.weight.regular, fontSize: typography.size.caption, color: colors.textMuted }}>
        {caption}
      </p>
    </div>
  );
}
