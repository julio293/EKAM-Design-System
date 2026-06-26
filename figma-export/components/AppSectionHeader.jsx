import React from 'react';
import { palette, typography } from '../tokens/tokens.js';

/**
 * EKAM Section Header — app section header from Figma "Section Header" (node 285:2335).
 * (Distinct from the audit-report poster <SectionHeader>.)
 *
 * Title + optional description, with a trailing action (text button / icon
 * button / none). Figma axes:
 *   size       small | medium | large   → title scale
 *   alignment  left | center
 *   appearance default | uiLabel        → Cormorant title vs Inter uppercase label
 *   elemAfter  text button | icon button | none → `action` slot (or actionLabel)
 *
 * Tokens: text/ink · accent/bindu (action) · display/sm Cormorant SemiBold ·
 *   body/md-regular — Raleway 15/25 (description) · ui/button-underline.
 */

const EDITORIAL_FONT = "'Cormorant Garamond', 'Georgia', serif";
const RALEWAY = "'Raleway', system-ui, -apple-system, sans-serif";

const titleSizes = {
  small: { fontSize: 16, lineHeight: '20px' },
  medium: { fontSize: 18, lineHeight: '22px' },
  large: { fontSize: 22, lineHeight: '28px' },
};

/** Built-in "See all" underlined text button. */
function TextButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: 0,
        fontFamily: typography.fontFamily,
        fontWeight: 500,
        fontSize: 11,
        lineHeight: 1,
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        textDecoration: 'underline',
        textUnderlineOffset: 2,
        color: palette.bindu,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

export default function AppSectionHeader({
  title = 'Section title',
  description,
  size = 'medium',
  alignment = 'left',
  appearance = 'default',
  action = null, // custom trailing element (e.g. icon button)
  actionLabel, // convenience: renders a "See all"-style text button
  onAction,
  style,
  ...rest
}) {
  const center = alignment === 'center';
  const isLabel = appearance === 'uiLabel';

  const titleStyle = isLabel
    ? {
        fontFamily: typography.fontFamily,
        fontWeight: 500,
        fontSize: 11,
        lineHeight: '13.5px',
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        color: palette.bindu,
      }
    : {
        fontFamily: EDITORIAL_FONT,
        fontWeight: 600,
        letterSpacing: '0.3px',
        color: palette.ink,
        ...titleSizes[size],
      };

  const descStyle = isLabel
    ? { fontFamily: EDITORIAL_FONT, fontStyle: 'italic', fontSize: 16, lineHeight: '24px', color: palette.moss }
    : { fontFamily: RALEWAY, fontWeight: 400, fontSize: 15, lineHeight: '25px', letterSpacing: '0.1px', color: palette.ink };

  const trailing = action ?? (actionLabel ? <TextButton onClick={onAction}>{actionLabel}</TextButton> : null);

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', width: '100%', ...style }} {...rest}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          flex: '1 1 0',
          minWidth: 0,
          alignItems: center ? 'center' : 'flex-start',
          textAlign: center ? 'center' : 'left',
        }}
      >
        <p style={{ ...titleStyle, margin: 0, width: '100%' }}>{title}</p>
        {description && <p style={{ ...descStyle, margin: 0, width: '100%' }}>{description}</p>}
      </div>
      {trailing}
    </div>
  );
}
