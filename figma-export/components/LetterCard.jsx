import React from 'react';
import { palette, typography } from '../tokens/tokens.js';
import { CARD_BORDER } from './Card.jsx';

/**
 * EKAM Letter Card — exported from Figma "Card" Letter variants (node 142:28).
 *
 * Sand note block with a 2px bindu left rule, used for letters, hints and smart
 * recommendations. Author/source signed in the eyebrow. Variants:
 *   Letter                    → note block + outbox description below
 *   Letter-without-text       → note block only (omit `note`)
 *   Letter-without-text-small → shorter block (set `blockHeight`, e.g. 96)
 *
 * Tokens: surface/sand #F4EDE1 · accent/bindu (rule + eyebrow) · text/ink (quote)
 *   · text/moss (outbox). editorial/sm — Cormorant Italic 16/24.
 */

const EDITORIAL_FONT = "'Cormorant Garamond', 'Georgia', serif";

export default function LetterCard({
  subtitle = '— FROM THE CABIN',
  quote,
  note, // outbox description below the block; omit for "without-text"
  blockHeight = 140,
  style,
  ...rest
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: 340,
        maxWidth: '100%',
        background: '#FFFFFF',
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 8,
        overflow: 'hidden',
        padding: 24,
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {/* Note block: sand fill, clay left rule */}
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          width: '100%',
          minHeight: blockHeight,
          background: palette.sand,
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div style={{ width: 2, background: palette.bindu, flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12, flex: '1 1 0', minWidth: 0 }}>
          {subtitle && (
            <p
              style={{
                fontFamily: typography.fontFamily,
                fontWeight: 500,
                fontSize: 11,
                lineHeight: '13.5px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: palette.bindu,
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          )}
          {quote && (
            <p style={{ fontFamily: EDITORIAL_FONT, fontStyle: 'italic', fontSize: 16, lineHeight: '24px', color: palette.ink, margin: 0 }}>
              {quote}
            </p>
          )}
        </div>
      </div>

      {note && (
        <>
          <div style={{ height: 16, flexShrink: 0 }} />
          <p style={{ fontFamily: EDITORIAL_FONT, fontStyle: 'italic', fontSize: 16, lineHeight: '24px', color: palette.moss, margin: 0, width: '100%' }}>
            {note}
          </p>
        </>
      )}
    </div>
  );
}
