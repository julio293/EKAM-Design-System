import React, { useState } from 'react';
import { palette, typography } from '../tokens/tokens.js';

/**
 * EKAM Button — exported from Figma "Button" frame (node 26:800).
 *
 * Variants resolved from the Figma component set:
 *   type:   'primary' | 'secondary' | 'clear'   (Swipe is a separate icon control)
 *   size:   'xs' | 'sm' | 'md' | 'lg'
 *   radius: 'rounded' | 'square'
 *   state:  Default / Hover / Focus / Disabled  — handled live via interaction,
 *           or forced with the `state` prop for static showcases.
 *
 * Tokens (Figma variables, node 26:934):
 *   accent/bindu        #B4613A  — Primary fill / Clear text
 *   accent/bindu-deep   #9C4F2A  — hover / pressed
 *   text/ink            #14201A  — Secondary border + text
 *   ui/button           Inter Medium 11 / 100% / +2.5 tracking / UPPERCASE
 *   focus/primary       0 0 0 3px #599CDB66
 *   border-radius md    16 (rounded)
 */

// ── Per-size geometry ────────────────────────────────────────────────
export const buttonSizes = {
  xs: { height: 24, padX: 10, icon: 14, dot: 6, gap: 6 },
  sm: { height: 32, padX: 12, icon: 16, dot: 7, gap: 8 },
  md: { height: 40, padX: 16, icon: 20, dot: 8, gap: 8 },
  lg: { height: 52, padX: 20, icon: 22, dot: 9, gap: 8 },
};

const RADIUS = { rounded: 16, square: 4 };
const FOCUS_RING = '0 0 0 3px #599CDB66';
const SHADOW_SM =
  '0 3px 6px -3px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05), 0 1px 2px -1px rgba(0,0,0,0.05)';

// ── Per-type colour resolver (returns the base + hover palette) ──────
function typeStyle(type) {
  switch (type) {
    case 'secondary':
      return {
        base: { background: 'transparent', color: palette.ink, border: `1px solid ${palette.ink}`, boxShadow: 'none' },
        hover: { background: 'rgba(20,32,26,0.06)' },
        underline: false,
      };
    case 'clear':
      return {
        base: { background: 'transparent', color: palette.bindu, border: 'none', boxShadow: 'none' },
        hover: { color: palette.binduDeep },
        underline: true,
      };
    case 'primary':
    default:
      return {
        base: { background: palette.bindu, color: palette.cream, border: 'none', boxShadow: SHADOW_SM },
        hover: { background: palette.binduDeep },
        underline: false,
      };
  }
}

/** The EKAM bindu • mark — inherits the button's current text colour. */
function BinduDot({ size }) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }}
    />
  );
}

/** Dropdown caret (Dropdown=On). */
function Caret({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Button({
  children,
  content,
  type = 'primary',
  size = 'md',
  radius = 'rounded',
  bindu = false,
  iconLeft = null,
  iconRight = null,
  dropdown = false,
  fullWidth = false,
  disabled = false,
  state, // optional forced visual state: 'hover' | 'focus' | 'disabled'
  htmlType = 'button',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);

  const s = buttonSizes[size] || buttonSizes.md;
  const t = typeStyle(type);
  const isClear = type === 'clear';

  const isDisabled = disabled || state === 'disabled';
  const isHover = !isDisabled && (state === 'hover' || hover);
  const isFocus = !isDisabled && (state === 'focus' || focus);

  const label = content ?? children;
  const iconBox = { width: s.icon, height: s.icon, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' };

  return (
    <button
      type={htmlType}
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        display: fullWidth ? 'flex' : 'inline-flex',
        width: fullWidth ? '100%' : undefined,
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: isClear ? 'auto' : s.height,
        padding: isClear ? 0 : `0 ${s.padX}px`,
        borderRadius: isClear ? 0 : RADIUS[radius] ?? RADIUS.rounded,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.4 : 1,
        fontFamily: typography.fontFamily,
        fontWeight: 500, // Inter Medium (ui/button)
        fontSize: typography.size.caption, // 11px (ui/button)
        lineHeight: 1,
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        transition: 'background 120ms ease, color 120ms ease, box-shadow 120ms ease',
        ...t.base,
        ...(isHover ? t.hover : null),
        boxShadow: isFocus ? FOCUS_RING : t.base.boxShadow,
        ...style,
      }}
      {...rest}
    >
      {iconLeft && <span style={iconBox}>{iconLeft}</span>}
      {bindu && <BinduDot size={s.dot} />}
      {label != null && (
        <span style={{ textDecoration: t.underline ? 'underline' : 'none', textUnderlineOffset: 2 }}>{label}</span>
      )}
      {iconRight && <span style={iconBox}>{iconRight}</span>}
      {dropdown && <Caret size={s.icon} />}
    </button>
  );
}
