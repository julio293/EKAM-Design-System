import React from 'react';
import { palette, typography } from '../tokens/tokens.js';

/**
 * EKAM Top Navigation — app bar exported from Figma "Top Navigation" (node 285:3261).
 *
 * Cream bar with a bottom bone hairline: optional back chevron, a centered title
 * block (Devanagari line + screen title), and a trailing slot for icon/text
 * buttons. Figma elemAfter (none / icon button / multiple / text button) maps to
 * the `trailing` slot; `background=false` makes the bar transparent.
 *
 * Tokens: surface/cream #FAF7F0 · surface/bone #ECE4D3 (hairline) · text/ink ·
 *   display/sm — Cormorant SemiBold 18/22 (titles). Row padding 12.
 */

const EDITORIAL_FONT = "'Cormorant Garamond', 'Georgia', serif";

function BackChevron({ onClick }) {
  return (
    <button
      type="button"
      aria-label="Back"
      onClick={onClick}
      style={{ width: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12, border: 'none', background: 'transparent', cursor: 'pointer', flexShrink: 0 }}
    >
      <svg width={32} height={32} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M15 5l-7 7 7 7" stroke={palette.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default function TopNav({
  title = 'Screen title',
  hindiTitle, // e.g. अन्न — shown above the screen title
  showBack = true,
  onBack,
  trailing = null, // icon/text buttons (Figma elemAfter)
  background = true,
  statusBar = null, // optional status-bar slot
  children, // e.g. a <Tabs> progress bar under the row
  style,
  ...rest
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 380,
        maxWidth: '100%',
        background: background ? palette.cream : 'transparent',
        borderBottom: background ? `1px solid ${palette.bone}` : 'none',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {statusBar}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {/* before */}
        <div style={{ width: 44, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {showBack && <BackChevron onClick={onBack} />}
        </div>

        {/* center title block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '1 1 0',
            minWidth: 0,
            padding: '12px 8px',
            fontFamily: EDITORIAL_FONT,
            fontWeight: 600,
            fontSize: 18,
            lineHeight: '22px',
            letterSpacing: '0.3px',
            color: palette.ink,
            textAlign: 'center',
          }}
        >
          {hindiTitle && <span style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{hindiTitle}</span>}
          {title && <span style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>}
        </div>

        {/* after */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, padding: '12px 12px 12px 0', flexShrink: 0 }}>
          {trailing}
        </div>
      </div>

      {children}
    </div>
  );
}
