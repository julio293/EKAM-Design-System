import React from 'react';
import { logoColors, logoModes, typefaces } from './logoTokens.js';

/**
 * EKAM primary logo — the "E•KAM" wordmark (Figma "Logo Variable", page 1:23).
 *
 * Props
 *  - mode:   color theme — 'light' | 'dark' | 'forest' | 'black' | 'mono'  (default 'light')
 *  - size:   cap-height-ish font size in px (default 96). Figma ships 16…512.
 *  - script: 'latin' (E•KAM) | 'devanagari' (एकम्)                         (default 'latin')
 *  - color / dotColor: optional explicit overrides (win over `mode`)
 *
 * The Bindu dot is a true circle in the accent color — no image asset required.
 */
export default function Logo({
  mode = 'light',
  size = 96,
  script = 'latin',
  color,
  dotColor,
  title = 'EKAM',
  style,
  ...rest
}) {
  const theme = logoModes[mode] || logoModes.light;
  const textColor = color || theme.text;
  const bindu = dotColor || theme.dot;

  // Devanagari lockup — एकम् in Tiro Devanagari Hindi.
  if (script === 'devanagari') {
    return (
      <span
        role="img"
        aria-label={title}
        style={{
          fontFamily: typefaces.devanagari.family,
          fontSize: size,
          lineHeight: 1,
          color: mode === 'light' || mode === 'black' ? logoColors.binduDeep : bindu,
          display: 'inline-block',
          whiteSpace: 'nowrap',
          ...style,
        }}
        {...rest}
      >
        एकम्
      </span>
    );
  }

  // Latin lockup — E • KAM in Cormorant Garamond Bold.
  const dot = Math.round(size * 0.14);
  return (
    <span
      role="img"
      aria-label={title}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.22,
        fontFamily: typefaces.primary.family,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: size * 0.01,
        color: textColor,
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      <span aria-hidden="true">E</span>
      <span
        aria-hidden="true"
        style={{
          width: dot,
          height: dot,
          borderRadius: '50%',
          background: bindu,
          flex: '0 0 auto',
          marginBottom: size * 0.04,
        }}
      />
      <span aria-hidden="true">KAM</span>
    </span>
  );
}
