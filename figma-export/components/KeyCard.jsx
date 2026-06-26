import React from 'react';
import { palette, typography } from '../tokens/tokens.js';
import { CARD_BORDER, PHOTO_GRADIENT } from './Card.jsx';

/**
 * EKAM Key Card — door / gate code card, exported from Figma "Key card" (node 302:6340).
 *
 * Dark-green block with a centered eyebrow, a large display code, a sage note,
 * and an underlined "Share the key" action. Closed by a 1px divider.
 *
 * Tokens: accent/bindu (eyebrow + action) · surface/cream (code) · text/sage
 *   #C9D6BC (note). display/xxl — Cormorant Bold 64/70. ui/button-underline.
 */

const EDITORIAL_FONT = "'Cormorant Garamond', 'Georgia', serif";

export default function KeyCard({
  label = '— GATE CODE · CABIN DOOR',
  code,
  note,
  actionLabel = 'Share the key',
  onShare,
  style,
  ...rest
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: 340, maxWidth: '100%', overflow: 'hidden', borderRadius: 8, ...style }} {...rest}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 48px', background: PHOTO_GRADIENT, width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', width: 246, maxWidth: '100%' }}>
          {label && (
            <p
              style={{
                fontFamily: typography.fontFamily,
                fontWeight: 500,
                fontSize: 11,
                lineHeight: '13.5px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: palette.bindu,
                textAlign: 'center',
                margin: 0,
                width: '100%',
              }}
            >
              {label}
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', width: '100%' }}>
            {code != null && (
              <p style={{ fontFamily: EDITORIAL_FONT, fontWeight: 700, fontSize: 64, lineHeight: '70px', letterSpacing: '0.4px', color: palette.cream, textAlign: 'center', margin: 0, width: '100%' }}>
                {code}
              </p>
            )}
            {note && (
              <p style={{ fontFamily: EDITORIAL_FONT, fontStyle: 'italic', fontSize: 16, lineHeight: '24px', color: palette.sage, textAlign: 'right', margin: 0, width: '100%' }}>
                {note}
              </p>
            )}
          </div>

          {actionLabel && (
            <button
              type="button"
              onClick={onShare}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: 0,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontFamily: typography.fontFamily,
                fontWeight: 500,
                fontSize: 11,
                lineHeight: 1,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                textDecoration: 'underline',
                textUnderlineOffset: 2,
                color: palette.bindu,
              }}
            >
              {actionLabel}
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M14 5l7 7-7 7M21 12H3" stroke={palette.bindu} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div style={{ height: 1, width: '100%', background: CARD_BORDER }} />
    </div>
  );
}
