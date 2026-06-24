import React from 'react';
import { palette } from '../tokens/tokens.js';

/**
 * EKAM Progress Bar — exported from Figma "Progress bar" (node 29:3427).
 *
 * A 2px rail: filled portion = accent/bindu (#B4613A), remainder = surface/bone (#ECE4D3).
 * Optional left/right labels (Cormorant Garamond Italic 16 / ink). Disabled mutes the fill.
 *
 * value: 0–100 (percent). Pass `disabled` for the inert grey rail.
 */

const EDITORIAL_FONT = "'Cormorant Garamond', 'Georgia', serif";

const endLabel = {
  fontFamily: EDITORIAL_FONT,
  fontStyle: 'italic',
  fontSize: 16,
  lineHeight: '24px',
  color: palette.ink,
  whiteSpace: 'nowrap',
  flexShrink: 0,
};

export default function ProgressBar({ value = 0, labelLeft, labelRight, disabled = false, style }) {
  const pct = Math.max(0, Math.min(100, value));
  const fill = disabled ? palette.mist : palette.bindu;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', ...style }}>
      {labelLeft != null && <span style={endLabel}>{labelLeft}</span>}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          flex: '1 1 0',
          minWidth: 0,
          height: 2,
          background: palette.bone,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ width: `${pct}%`, height: '100%', background: fill, transition: 'width 160ms ease' }} />
      </div>
      {labelRight != null && <span style={endLabel}>{labelRight}</span>}
    </div>
  );
}
