import React from 'react';
import { palette, colors, typography } from '../tokens/tokens.js';

/**
 * Section header — eyebrow label + large title above a hairline rule.
 * Shared by every content organism (nodes 202:14–16 pattern).
 */
export default function SectionHeader({ label, title, rule = true }) {
  return (
    <header style={{ marginBottom: 24 }}>
      {rule && (
        <div style={{ height: 1, background: colors.border, marginBottom: 16 }} />
      )}
      {label && (
        <p
          style={{
            margin: 0,
            fontFamily: typography.fontFamily,
            fontWeight: typography.weight.semibold,
            fontSize: typography.size.caption,
            letterSpacing: typography.tracking.sectionLabel,
            color: colors.textMuted,
            textTransform: 'uppercase',
          }}
        >
          {label}
        </p>
      )}
      {title && (
        <h2
          style={{
            margin: '6px 0 0',
            fontFamily: typography.fontFamily,
            fontWeight: typography.weight.bold,
            fontSize: typography.size.h2,
            color: palette.ink,
            lineHeight: 1.1,
          }}
        >
          {title}
        </h2>
      )}
    </header>
  );
}
