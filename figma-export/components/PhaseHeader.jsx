import React from 'react';
import { palette, typography, radius } from '../tokens/tokens.js';

const toneColor = {
  danger: palette.danger,
  terracotta: palette.terracotta,
  forest: palette.forest,
};

/** Coloured phase header bar above a checklist column (node 202:246). */
export default function PhaseHeader({ children, tone = 'danger' }) {
  return (
    <div
      style={{
        background: toneColor[tone] || palette.danger,
        borderRadius: radius.md,
        padding: '6px 12px',
        fontFamily: typography.fontFamily,
        fontWeight: typography.weight.bold,
        fontSize: typography.size.caption,
        color: palette.cream,
      }}
    >
      {children}
    </div>
  );
}
