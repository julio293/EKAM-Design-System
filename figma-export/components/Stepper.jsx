import React, { useState } from 'react';
import { palette } from '../tokens/tokens.js';

/**
 * EKAM Stepper — quantity counter used in List menu rows (node 317:3052).
 * Optional price, then − [qty] + with 32px bindu-bordered buttons.
 * Tokens: accent/bindu #B4613A border · text/ink · editorial/lg
 *   (Cormorant SemiBold Italic 22/32) for price + qty.
 */

const EDITORIAL_FONT = "'Cormorant Garamond', 'Georgia', serif";

const numStyle = {
  fontFamily: EDITORIAL_FONT,
  fontStyle: 'italic',
  fontWeight: 600,
  fontSize: 22,
  lineHeight: '32px',
  color: palette.ink,
};

function StepBtn({ children, onClick, disabled, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 32,
        height: 32,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${disabled ? palette.mist : palette.bindu}`,
        background: 'transparent',
        color: disabled ? palette.mist : palette.bindu,
        cursor: disabled ? 'not-allowed' : 'pointer',
        flexShrink: 0,
        padding: 0,
        fontSize: 18,
        lineHeight: 1,
      }}
    >
      {children}
    </button>
  );
}

export default function Stepper({
  value,
  defaultValue = 0,
  min = 0,
  max = Infinity,
  step = 1,
  onChange,
  price, // optional string/node shown before the controls
  disabled = false,
  style,
}) {
  const isControlled = value != null;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? value : internal;

  const commit = (next) => {
    const v = Math.max(min, Math.min(max, next));
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 32, ...style }}>
      {price != null && <span style={numStyle}>{price}</span>}
      {price != null && <span style={{ width: 8, flexShrink: 0 }} />}
      <StepBtn label="Decrease" disabled={disabled || current <= min} onClick={() => commit(current - step)}>−</StepBtn>
      <span style={{ ...numStyle, width: 32, textAlign: 'center' }}>{current}</span>
      <StepBtn label="Increase" disabled={disabled || current >= max} onClick={() => commit(current + step)}>+</StepBtn>
    </div>
  );
}
