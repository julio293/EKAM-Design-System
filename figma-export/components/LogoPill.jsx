import React from 'react';
import { palette, typography, radius } from '../tokens/tokens.js';

/** Rounded brand pill — "EKAM" lockup used on the cover (node 202:5). */
export default function LogoPill({ label = 'EKAM' }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: palette.terracotta,
        color: palette.cream,
        borderRadius: radius.pill,
        padding: '11px 22px',
        fontFamily: typography.fontFamily,
        fontWeight: typography.weight.bold,
        fontSize: typography.size.bodyStrong,
        letterSpacing: typography.tracking.scLabel,
      }}
    >
      {label}
    </span>
  );
}
