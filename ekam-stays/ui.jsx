/* global React */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Stays & Profile · shared UI primitives
// Exported to window so each Babel-scoped screen file can use them.
// ════════════════════════════════════════════════════════════════

// ─── Status bar ──────────────────────────────────────────────
function S_StatusBar({ dark = false }) {
  const c = dark ? '#FAF7F0' : '#14201A';
  return (
    <div className={`sp-sb ${dark ? 'on-dark' : ''}`}>
      <span>9:42</span>
      <div className="sp-sb__ind">
        <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden="true">
          <circle cx="2" cy="8" r="1.4" fill={c} />
          <circle cx="6" cy="6" r="1.4" fill={c} />
          <circle cx="10" cy="4" r="1.4" fill={c} />
          <circle cx="14" cy="2" r="1.4" fill={c} />
        </svg>
        <span style={{ fontSize: 11, fontWeight: 500 }}>84</span>
        <svg width="22" height="10" viewBox="0 0 22 10" aria-hidden="true">
          <rect x="0.5" y="0.5" width="18" height="9" rx="1.5" fill="none" stroke={c} opacity="0.5" />
          <rect x="2" y="2" width="14" height="6" rx="0.5" fill={c} />
        </svg>
      </div>
    </div>
  );
}

// ─── Back bar — the in-phone back gesture ────────────────────
function S_BackBar({ onBack, label = 'Back', dark = false, right = null }) {
  return (
    <div className={`sp-back ${dark ? 'on-dark' : ''}`}>
      <button className="sp-back__btn" onClick={onBack} aria-label={`Back to ${label}`}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
        <span>{label}</span>
      </button>
      {right}
    </div>
  );
}

// ─── Wax seal glyph ──────────────────────────────────────────
// Monochrome tier marks (currentColor) so they read as a single-colour
// wax impression inside the seal. Falls back to a Devanagari letter.
const S_SEAL_MARKS = {
  KUTIR: (
    <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 20 56 L 60 22 L 100 56" />
      <path d="M 28 56 L 28 86 L 92 86 L 92 56" />
      <path d="M 76 26 L 76 14 L 84 14 L 84 33" />
      <rect x="52" y="64" width="16" height="22" fill="currentColor" stroke="none" />
    </g>
  ),
  VAN: (
    <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 24 84 L 24 64 M 14 64 L 24 36 L 34 64 Z" />
      <path d="M 60 88 L 60 60 M 46 60 L 60 22 L 74 60 Z" />
      <path d="M 96 84 L 96 64 M 86 64 L 96 36 L 106 64 Z" />
    </g>
  ),
  SHIKHAR: (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M 30 80 L 60 28 L 90 80" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M 50 80 L 80 38 L 110 80 Z" fill="currentColor" stroke="none" />
      <line x1="14" y1="80" x2="110" y2="80" stroke="currentColor" strokeWidth="3" />
    </g>
  ),
  CHAI: (
    <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 38 32 L 42 76 L 78 76 L 82 32 Z" />
      <path d="M 82 42 Q 96 42 96 56 Q 96 68 82 64" />
      <line x1="26" y1="86" x2="94" y2="86" />
      <path d="M 52 24 Q 48 16 54 8" strokeWidth="2" />
      <path d="M 64 24 Q 68 16 62 8" strokeWidth="2" />
    </g>
  ),
};

function S_Seal({ dev = 'कु', tier = null, dark = false, size = 56, dim = false }) {
  const mark = tier && S_SEAL_MARKS[tier];
  return (
    <div className={`sp-seal ${dark ? 'sp-seal--dark' : ''} ${dim ? 'sp-seal--dim' : ''}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M14 6 L40 4 L54 14 L60 32 L52 50 L36 60 L14 58 L4 44 L4 24 L14 6 Z" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
        <path d="M16 9 L40 7 L52 16 L58 32 L51 48 L36 57 L16 55 L7 44 L7 24 L16 9 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      </svg>
      {mark ? (
        <svg className="sp-seal__mark" viewBox="-35 -45 190 190" aria-hidden="true">{mark}</svg>
      ) : (
        <span className="sp-seal__dev">{dev}</span>
      )}
    </div>
  );
}

// ─── Tier glyph (Kutir / Van / Shikhar) — canonical assets ───
const S_GLYPH = { KUTIR: 'kutir', VAN: 'van', SHIKHAR: 'shikhar', CHAI: 'chai' };
function S_TierGlyph({ tier, size = 26, dark = false }) {
  const file = S_GLYPH[tier] || 'kutir';
  return (
    <img
      className={`sp-glyph ${dark ? 'sp-glyph--dark' : ''}`}
      src={`assets/glyph-${file}.svg`}
      alt=""
      style={{ width: size, height: 'auto' }}
    />
  );
}

// ─── Section label (eyebrow) ─────────────────────────────────
function S_Label({ children, dev = null }) {
  return (
    <div className="sp-lbl">
      {dev && <span className="sp-lbl__dev">{dev}</span>}
      <span className="sp-lbl__en">{children}</span>
    </div>
  );
}

// ─── A navigable row (the archive entry) ─────────────────────
function S_Row({ lbl, val, hint, onClick, glyph = null }) {
  return (
    <button className="sp-row" onClick={onClick}>
      {glyph}
      <div className="sp-row__text">
        <span className="sp-row__lbl">{lbl}</span>
        <span className="sp-row__val">{val}</span>
        {hint && <span className="sp-row__hint">{hint}</span>}
      </div>
      <svg className="sp-row__chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  );
}

// ─── Bottom tab bar ──────────────────────────────────────────
function S_TabBar({ active, onTab, dark = false }) {
  const tabs = [
    { id: 'saved',   name: 'Saved' },
    { id: 'stays',   name: 'Stays' },
    { id: 'mudra',   name: 'Mudra' },
    { id: 'profile', name: 'You' },
  ];
  return (
    <nav className={`sp-tabbar ${dark ? 'on-dark' : ''}`}>
      {tabs.map(t => (
        <button key={t.id} className={`sp-tabbar__tab ${active === t.id ? 'on' : ''}`} onClick={() => onTab(t.id)}>
          <span>{t.name}</span>
        </button>
      ))}
    </nav>
  );
}

// ─── Photographic banner (mood field standing in for a photo) ─
function S_Photo({ mood, height = 200, children, className = '', scrim = true }) {
  const { SMOOD } = window.STAYS;
  return (
    <div className={`sp-photo ${className}`} style={{ background: SMOOD[mood], height }}>
      {scrim && <span className="sp-photo__scrim" />}
      {children}
    </div>
  );
}

Object.assign(window, {
  S_StatusBar, S_BackBar, S_Seal, S_TierGlyph, S_Label, S_Row, S_TabBar, S_Photo,
});
