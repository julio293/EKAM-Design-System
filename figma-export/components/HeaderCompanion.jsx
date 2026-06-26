import React from 'react';
import { palette, typography } from '../tokens/tokens.js';

/**
 * EKAM Header Companion — immersive dark header from Figma "Header Companion" (node 293:3209).
 *
 * Near-black panel with a background image, a centered eyebrow / title / line.
 * Figma axes: State = Morning | Evening (mood / background), isScroll =
 * collapsed (170) vs full (250) height.
 *
 * Tokens: surface/cream #FAF7F0 (all text) · ui/label — Inter Medium 11/+2.5
 *   (eyebrow) · display/lg — Cormorant SemiBold 36/40 (title) · editorial/sm —
 *   Cormorant Italic 16/24 (line).
 */

const EDITORIAL_FONT = "'Cormorant Garamond', 'Georgia', serif";

export default function HeaderCompanion({
  eyebrow = '— DAY 2 OF 3 · BINSAR',
  title = 'Morning Anika',
  description,
  backgroundImage, // url; rendered over the dark base
  isScroll = false,
  statusBar = null,
  style,
  ...rest
}) {
  const height = isScroll ? 170 : 250;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 393,
        maxWidth: '100%',
        height,
        background: '#141414',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
        />
      )}

      {statusBar && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>{statusBar}</div>}

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '12px 32px',
          textAlign: 'center',
          color: palette.cream,
        }}
      >
        {eyebrow && (
          <p style={{ margin: 0, width: '100%', fontFamily: typography.fontFamily, fontWeight: 500, fontSize: 11, lineHeight: '13.5px', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
            {eyebrow}
          </p>
        )}
        {title && (
          <p style={{ margin: 0, width: '100%', fontFamily: EDITORIAL_FONT, fontWeight: 600, fontSize: 36, lineHeight: '40px', letterSpacing: '0.3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {title}
          </p>
        )}
        {description && (
          <p style={{ margin: 0, width: '100%', fontFamily: EDITORIAL_FONT, fontStyle: 'italic', fontSize: 16, lineHeight: '24px' }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
