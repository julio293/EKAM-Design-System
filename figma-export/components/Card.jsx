import React from 'react';
import { palette, typography } from '../tokens/tokens.js';

/**
 * EKAM Card — media / property card exported from Figma "Card" (node 142:30).
 *
 * Covers the photo-led variants: Cabin (isImage=On), Type4 (gradient only),
 * Postcard (wax stamp + invitation). White shell, 1px #E0DBD2 border, radius 8,
 * a dark-green photo block, divider, and a body (eyebrow / title / subtitle).
 *
 * Tokens (node 142:30): accent/bindu #B4613A (eyebrow) · text/ink (title) ·
 *   text/moss (subtitle) · surface/cream (script label) · surface/sand.
 *   display/lg — Cormorant SemiBold 36/40 · ui/eyebrow — Inter Medium 11/+2.5.
 */

const EDITORIAL_FONT = "'Cormorant Garamond', 'Georgia', serif";
export const CARD_BORDER = '#E0DBD2';
export const PHOTO_GRADIENT = 'linear-gradient(to bottom, #26362C 0%, #151F19 60%, #0C120E 100%)';

const eyebrowStyle = {
  fontFamily: typography.fontFamily,
  fontWeight: 500,
  fontSize: 11,
  lineHeight: '13.5px',
  letterSpacing: '2.5px',
  textTransform: 'uppercase',
  color: palette.bindu,
  margin: 0,
};

const titleStyle = {
  fontFamily: EDITORIAL_FONT,
  fontWeight: 600,
  fontSize: 36,
  lineHeight: '40px',
  letterSpacing: '0.3px',
  color: palette.ink,
  margin: 0,
};

const subtitleStyle = {
  fontFamily: EDITORIAL_FONT,
  fontStyle: 'italic',
  fontSize: 16,
  lineHeight: '24px',
  color: palette.moss,
  margin: 0,
};

/** Postcard wax stamp — dashed bindu border, script + EKAM mark. */
function WaxStamp({ script = 'कुटीर', label = 'EKAM' }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 12,
        right: 12,
        width: 64,
        height: 64,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
        background: palette.cream,
        border: `1.5px dashed ${palette.bindu}`,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <span style={{ fontFamily: EDITORIAL_FONT, fontStyle: 'italic', fontSize: 16, lineHeight: '24px', color: palette.bindu }}>
        {script}
      </span>
      <span style={{ fontFamily: typography.fontFamily, fontSize: 12, color: palette.ink }}>{label}</span>
    </div>
  );
}

export default function Card({
  eyebrow,
  title,
  subtitle,
  image,
  scriptLabel, // e.g. कुटीर — overlaid top-left on the photo
  stamp, // { script, label } → Postcard wax stamp
  photoHeight = 220,
  children, // extra body content (e.g. buttons)
  onClick,
  style,
  ...rest
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: 340,
        maxWidth: '100%',
        background: '#FFFFFF',
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 8,
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      {...rest}
    >
      {/* Photo block — gradient with optional image + overlays */}
      <div style={{ position: 'relative', height: photoHeight, width: '100%', background: PHOTO_GRADIENT, overflow: 'hidden' }}>
        {image && (
          <img
            src={image}
            alt={title || ''}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
          />
        )}
        {scriptLabel && (
          <span
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              fontFamily: EDITORIAL_FONT,
              fontStyle: 'italic',
              fontSize: 16,
              lineHeight: '24px',
              color: palette.cream,
            }}
          >
            {scriptLabel}
          </span>
        )}
        {stamp && <WaxStamp {...stamp} />}
      </div>

      <div style={{ height: 1, width: '100%', background: CARD_BORDER }} />

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start', padding: 20, background: '#FFFFFF' }}>
        {eyebrow && <p style={eyebrowStyle}>{eyebrow}</p>}
        {title && <p style={titleStyle}>{title}</p>}
        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
