import React from 'react';
import { palette, typography } from '../tokens/tokens.js';

/**
 * EKAM Letter Card — a sand note block with a 2px bindu left rule, for letters,
 * hints, "coming up" notes and smart recommendations. There is NO outer card or
 * box — it is the note block itself.
 *
 * Content: an eyebrow (subtitle), an optional upright title, and an italic line
 * (quote/detail). An optional outbox `note` renders in italic below the block.
 *
 * Tokens: surface/sand #F4EDE1 (fill) · accent/bindu (rule + eyebrow) · text/ink
 *   (title / quote) · text/moss (detail + outbox). display Cormorant SemiBold,
 *   editorial/sm Cormorant Italic, ui/label Inter Medium 11/+2.5.
 */

const EDITORIAL_FONT = "'Cormorant Garamond', 'Georgia', serif";

export default function LetterCard({
  subtitle = '— FROM THE CABIN',
  title,
  quote,
  note, // optional outbox line below the block
  blockHeight,
  style,
  ...rest
}) {
  return (
    <div style={{ width: '100%', boxSizing: 'border-box', ...style }} {...rest}>
      {/* sand note block with clay left rule — no surrounding card */}
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          width: '100%',
          minHeight: blockHeight,
          background: palette.sand,
          borderRadius: 8,
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ width: 3, background: palette.bindu, flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '20px 24px', flex: '1 1 0', minWidth: 0 }}>
          {subtitle && (
            <p style={{ margin: 0, fontFamily: typography.fontFamily, fontWeight: 500, fontSize: 11, lineHeight: '13.5px', letterSpacing: '2.5px', textTransform: 'uppercase', color: palette.bindu }}>
              {subtitle}
            </p>
          )}
          {title && (
            <p style={{ margin: 0, fontFamily: EDITORIAL_FONT, fontWeight: 600, fontSize: 26, lineHeight: '30px', letterSpacing: '0.3px', color: palette.ink }}>
              {title}
            </p>
          )}
          {quote && (
            <p style={{ margin: 0, fontFamily: EDITORIAL_FONT, fontStyle: 'italic', fontSize: 16, lineHeight: '24px', color: title ? palette.moss : palette.ink }}>
              {quote}
            </p>
          )}
        </div>
      </div>

      {note && (
        <p style={{ margin: '16px 0 0', fontFamily: EDITORIAL_FONT, fontStyle: 'italic', fontSize: 16, lineHeight: '24px', color: palette.moss }}>
          {note}
        </p>
      )}
    </div>
  );
}
