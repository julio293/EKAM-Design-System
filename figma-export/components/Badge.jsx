import React from 'react';
import { palette, typography, radius } from '../tokens/tokens.js';

const toneColor = {
  danger: palette.danger,
  terracotta: palette.terracotta,
  forest: palette.forest,
  olive: palette.olive,
  ink: palette.ink,
};

/** Solid filled label chip (nodes 202:154, 202:191 …). */
export default function Badge({ children, tone = 'forest' }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: toneColor[tone] || palette.forest,
        color: palette.cream,
        borderRadius: radius.sm,
        padding: '5px 10px',
        fontFamily: typography.fontFamily,
        fontWeight: typography.weight.semibold,
        fontSize: typography.size.caption,
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}
