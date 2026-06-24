import React from 'react';
import { palette, colors, typography, radius, scoreColor } from '../tokens/tokens.js';

/**
 * Summary score card (node 202:17 "sc").
 * `score` (number) drives the value colour; pass null for a neutral metric.
 */
export default function ScoreCard({ label, value, score, caption, surface = palette.parchment }) {
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
      <p
        style={{
          margin: 0,
          fontWeight: typography.weight.semibold,
          fontSize: typography.size.micro,
          letterSpacing: typography.tracking.scLabel,
          color: colors.textMuted,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: '6px 0 0',
          fontWeight: typography.weight.bold,
          fontSize: typography.size.statValue,
          color: scoreColor(score),
        }}
      >
        {value}
      </p>
      <p
        style={{
          margin: '8px 0 0',
          fontWeight: typography.weight.regular,
          fontSize: typography.size.caption,
          color: colors.textMuted,
        }}
      >
        {caption}
      </p>
    </div>
  );
}
