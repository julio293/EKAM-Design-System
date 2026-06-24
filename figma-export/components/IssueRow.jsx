import React from 'react';
import { palette, colors, typography, severityColor } from '../tokens/tokens.js';

const glyph = { critical: '●', important: '▲', note: '◆' };

/**
 * Findings table row (node 202:112 … pattern).
 * `alt` paints the soft striped background (node 202:116).
 */
export default function IssueRow({ severity = 'note', title, description, scope, alt = false }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '24px 1fr',
        gap: '0 8px',
        padding: '12px 0',
        background: alt ? 'rgba(244,237,225,0.5)' : 'transparent',
        fontFamily: typography.fontFamily,
      }}
    >
      <div style={{ color: severityColor[severity], fontSize: typography.size.subtitle, lineHeight: 1.3 }}>
        {glyph[severity]}
      </div>
      <div>
        <p style={{ margin: 0, fontWeight: typography.weight.semibold, fontSize: typography.size.subtitle, color: palette.ink }}>
          {title}
        </p>
        <p style={{ margin: '6px 0 0', fontWeight: typography.weight.regular, fontSize: typography.size.caption, lineHeight: typography.lineHeight.compact, color: colors.textBody }}>
          {description}
        </p>
        <p style={{ margin: '8px 0 0', fontWeight: typography.weight.regular, fontSize: typography.size.micro, color: colors.textMuted }}>
          {scope}
        </p>
      </div>
    </div>
  );
}
