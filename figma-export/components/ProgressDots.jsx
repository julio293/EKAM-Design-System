import React from 'react';
import { palette } from '../tokens/tokens.js';

/**
 * EKAM Progress Dots — exported from Figma "dots" (node 272:4916).
 *
 * A step indicator: the active step is an accent/bindu pill (18×6), the rest
 * are 6px muted dots. Figma variants: progress = total dots (2–7),
 * Select = active dot (1-based). Here generalised to any `total`.
 *
 * Tokens: active #B4613A (accent/bindu) · inactive state/mist #D8D3C4 ·
 *   dot 6px · active pill 18×6 · gap 6 · fully rounded (999).
 *
 * total:  number of steps
 * active: 0-based index of the current step
 */
export default function ProgressDots({ total = 7, active = 0, style }) {
  const count = Math.max(0, total);
  const idx = Math.max(0, Math.min(count - 1, active));

  return (
    <div
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={count}
      aria-valuenow={idx + 1}
      style={{ display: 'inline-flex', gap: 6, alignItems: 'center', ...style }}
    >
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === idx;
        return (
          <span
            key={i}
            aria-hidden
            style={{
              height: 6,
              width: isActive ? 18 : 6,
              borderRadius: 999,
              background: isActive ? palette.bindu : palette.mist,
              flexShrink: 0,
              transition: 'width 200ms ease, background 200ms ease',
            }}
          />
        );
      })}
    </div>
  );
}
