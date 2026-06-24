import React from 'react';
import { palette, colors, typography, radius } from '../tokens/tokens.js';

/** Checklist task row with a checkbox (node 202:248 "task"). */
export default function TaskRow({ label, checked = false, surface = palette.cream }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: surface,
        borderRadius: radius.md,
        padding: '15px 12px',
        fontFamily: typography.fontFamily,
      }}
    >
      <span
        style={{
          flex: '0 0 auto',
          width: 16,
          height: 16,
          borderRadius: radius.sm,
          border: `1.5px solid ${colors.border}`,
          background: checked ? palette.forest : 'transparent',
          display: 'inline-block',
          boxSizing: 'border-box',
        }}
      />
      <span style={{ fontWeight: typography.weight.regular, fontSize: typography.size.body, color: palette.ink }}>
        {label}
      </span>
    </div>
  );
}
