import React from 'react';
import { palette } from '../tokens/tokens.js';

/**
 * EKAM Radio — selection control used in List rows (node 285:7382).
 * 20px ring; selected = bindu ring + filled dot, disabled = mist.
 * Tokens: accent/bindu #B4613A · state/mist #D8D3C4 · radius full.
 */
export default function Radio({ checked = false, disabled = false, onChange, size = 20, style, ...rest }) {
  const ring = disabled ? palette.mist : checked ? palette.bindu : palette.mist;
  return (
    <span
      role="radio"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      onClick={() => !disabled && onChange?.(!checked)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: 999,
        border: `${checked ? 2 : 1.5}px solid ${ring}`,
        boxSizing: 'border-box',
        flexShrink: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: 'transparent',
        ...style,
      }}
      {...rest}
    >
      {checked && (
        <span style={{ width: size * 0.5, height: size * 0.5, borderRadius: 999, background: disabled ? palette.mist : palette.bindu }} />
      )}
    </span>
  );
}
