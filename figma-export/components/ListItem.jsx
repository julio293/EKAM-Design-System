import React from 'react';
import { palette, typography } from '../tokens/tokens.js';

/**
 * EKAM List Item — the flexible row behind the Figma "List" set (node 285:7382).
 *
 * Two shapes cover every Figma state:
 *   variant="plain"  → row with a bottom hairline divider (bone). Used by
 *                      static / book / left / menu / weather-stat / etc.
 *   variant="card"   → bordered selection card (radius 16, padding 16). Used by
 *                      selected / default / deactive (with a Radio leading).
 *
 * Compose states with the leading / trailing slots (Radio, Stepper, icons,
 * price, chevron, badges). `selected` drives the card border (bindu vs mist)
 * and the menu `filled` (sand) background; `disabled` greys the row.
 *
 * Tokens: display/sm — Cormorant SemiBold 18/22 (title) · body/sm — Raleway 13/20
 *   · editorial/sm — Cormorant Italic 16 (editorial subtitle) · surface/sand ·
 *   surface/bone (divider) · accent/bindu · state/mist · text/ink · text/forest.
 */

const RALEWAY = "'Raleway', system-ui, -apple-system, sans-serif";
const EDITORIAL_FONT = "'Cormorant Garamond', 'Georgia', serif";

const titleStyle = {
  fontFamily: EDITORIAL_FONT,
  fontWeight: 600,
  fontSize: 18,
  lineHeight: '22px',
  letterSpacing: '0.3px',
  margin: 0,
};

export default function ListItem({
  title,
  subtitle,
  subtitleVariant = 'body', // 'body' (Raleway 13) | 'editorial' (Cormorant italic 16)
  leading = null,
  trailing = null,
  variant = 'plain', // 'plain' | 'card'
  selected = false,
  disabled = false,
  filled = false, // sand background (List Menu selected)
  divider, // override; defaults to true for plain rows
  onClick,
  style,
  ...rest
}) {
  const isCard = variant === 'card';
  const showDivider = divider ?? (!isCard);

  const titleColor = disabled ? palette.mist : palette.ink;
  const subColor = disabled ? palette.mist : subtitleVariant === 'editorial' ? palette.forest : palette.ink;

  const subStyle =
    subtitleVariant === 'editorial'
      ? { fontFamily: EDITORIAL_FONT, fontStyle: 'italic', fontSize: 16, lineHeight: '24px', color: subColor, margin: 0 }
      : { fontFamily: RALEWAY, fontWeight: 400, fontSize: 13, lineHeight: '20px', letterSpacing: '0.2px', color: subColor, margin: 0 };

  // container appearance
  const cardBorder = disabled ? palette.mist : selected ? palette.bindu : palette.mist;
  const containerStyle = isCard
    ? {
        border: `1px solid ${cardBorder}`,
        borderRadius: 16,
        padding: 16,
        minHeight: 78,
        background: disabled ? palette.bone : '#FFFFFF',
      }
    : {
        padding: '12px 16px',
        background: filled ? palette.sand : 'transparent',
        borderBottom: showDivider ? `1px solid ${palette.bone}` : 'none',
      };

  return (
    <div
      onClick={() => !disabled && onClick?.()}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: isCard ? 8 : 16,
        width: '100%',
        boxSizing: 'border-box',
        cursor: onClick && !disabled ? 'pointer' : 'default',
        opacity: disabled ? 0.6 : 1,
        ...containerStyle,
        ...style,
      }}
      {...rest}
    >
      {leading && <span style={{ display: 'inline-flex', flexShrink: 0, alignItems: 'center' }}>{leading}</span>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center', flex: '1 1 0', minWidth: 0 }}>
        {title && <p style={{ ...titleStyle, color: titleColor }}>{title}</p>}
        {subtitle && <p style={subStyle}>{subtitle}</p>}
      </div>

      {trailing && <span style={{ display: 'inline-flex', flexShrink: 0, alignItems: 'center' }}>{trailing}</span>}
    </div>
  );
}
