import React, { useId, useState } from 'react';
import { palette, typography } from '../tokens/tokens.js';

/**
 * EKAM Input — exported from Figma "Input" frame (node 26:2663).
 *
 * size:  'sm' | 'md' | 'lg'
 * state: Empty / Filled / Focus / Error / Disabled — resolved live from
 *        value + focus + `error` + `disabled` (no manual state prop needed).
 *
 * The six Figma "types" (Default, Icon, Dropdown, Button right, Country,
 * Credit card) are reconstructed from composable slots:
 *   leading   — left adornment (icon, country selector, card brand)
 *   trailing  — right adornment (info-circle, custom icon)
 *   dropdown  — show the chevron-down affordance
 *   addonRight — attached right button (Button-right type)
 *
 * Tokens (Figma variables, node 26:2668):
 *   placeholder  text/moss  #4F5C3F (empty) → input-field/focus #191919 (focus) → text/ink (filled)
 *   border       state/mist #D8D3C4 (rest) · accent/bindu #B4613A (focus) · state/danger #B23A2A (error)
 *   focus shadow 0 1px 2px rgba(20,32,26,0.08)
 *   radius       border-radius/md = 8
 *   label/error  ui/label — Inter Medium 11 / 13.5 / +2.5 / UPPERCASE
 *   value/placeholder — editorial/sm: Cormorant Garamond Italic 16 / 24
 */

const EDITORIAL_FONT = "'Cormorant Garamond', 'Georgia', serif";
const FOCUS_SHADOW = '0 1px 2px 0 rgba(20,32,26,0.08)';
const RADIUS = 8;

// height → vertical padding (text line box is 20px, border 1px each side)
export const inputSizes = {
  sm: { height: 36, padY: 7, padX: 16 },
  md: { height: 40, padY: 9, padX: 16 },
  lg: { height: 48, padY: 13, padX: 16 },
};

const labelStyle = {
  fontFamily: typography.fontFamily,
  fontWeight: 500,
  fontSize: 11,
  lineHeight: '13.5px',
  letterSpacing: '2.5px',
  textTransform: 'uppercase',
};

/** Chevron-down affordance (Dropdown / Country / Credit-card types). */
function Chevron({ color }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Error alert row (exclamation + message), ui/label in danger. */
function AlertRow({ message }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
        <path d="M12 7v6" stroke={palette.danger} strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="1.1" fill={palette.danger} />
      </svg>
      <span style={{ ...labelStyle, color: palette.danger }}>{message}</span>
    </div>
  );
}

export default function Input({
  label,
  value,
  defaultValue,
  placeholder = 'Placeholder',
  size = 'md',
  error, // string → error state + message; true → error border only
  disabled = false,
  leading = null,
  trailing = null,
  dropdown = false,
  addonRight = null,
  onChange,
  onFocus,
  onBlur,
  id,
  style,
  inputStyle,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const reactId = useId();
  const inputId = id || reactId;
  const s = inputSizes[size] || inputSizes.md;
  const hasError = Boolean(error);

  // ── Border + shadow per resolved state ─────────────────────────────
  let borderColor = palette.mist; // Empty / Filled / Disabled
  let boxShadow = 'none';
  if (hasError) borderColor = palette.danger;
  else if (focus && !disabled) {
    borderColor = palette.bindu;
    boxShadow = FOCUS_SHADOW;
  }

  // placeholder colour: moss (empty) → #191919 (focus). Typed value is ink.
  const placeholderColor = focus && !disabled ? '#191919' : palette.moss;
  const iconColor = disabled ? palette.mist : palette.ink;

  const fieldStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    boxSizing: 'border-box',
    background: disabled ? palette.bone : '#FFFFFF',
    border: `1px solid ${borderColor}`,
    borderRadius: RADIUS,
    padding: `${s.padY}px ${s.padX}px`,
    boxShadow,
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.6 : 1,
    transition: 'border-color 120ms ease, box-shadow 120ms ease',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', ...style }}>
      {label && (
        <label htmlFor={inputId} style={{ ...labelStyle, color: palette.ink }}>
          {label}
        </label>
      )}

      <div style={{ display: 'flex', alignItems: 'stretch', gap: 8, width: '100%' }}>
        <div style={fieldStyle}>
          {leading && <span style={{ display: 'inline-flex', flexShrink: 0, color: iconColor }}>{leading}</span>}
          <input
            id={inputId}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            onFocus={(e) => { setFocus(true); onFocus?.(e); }}
            onBlur={(e) => { setFocus(false); onBlur?.(e); }}
            style={{
              flex: '1 1 0',
              minWidth: 0,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: EDITORIAL_FONT,
              fontStyle: 'italic',
              fontSize: 16,
              lineHeight: '24px',
              color: palette.ink,
              cursor: disabled ? 'not-allowed' : 'text',
              ...inputStyle,
            }}
            {...rest}
          />
          {trailing && <span style={{ display: 'inline-flex', flexShrink: 0, color: iconColor }}>{trailing}</span>}
          {dropdown && <Chevron color={iconColor} />}
        </div>
        {addonRight}
      </div>

      {/* per-instance placeholder colour (inline styles can't target ::placeholder) */}
      <style>{`#${CSS.escape(inputId)}::placeholder{color:${placeholderColor};opacity:1;font-style:italic;}`}</style>

      {typeof error === 'string' && error && <AlertRow message={error} />}
    </div>
  );
}
