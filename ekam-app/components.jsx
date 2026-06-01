/* global React */
// EKAM Mobile — shared UI components
// Wordmark, status bar, top bar, bottom nav, bindu rule, pill button, sheet.

const { useState, useEffect, useRef } = React;

// ──────────────────────────────────────────────────────────────
// EKAM Wordmark — inline SVG (so it tints with currentColor)
// ──────────────────────────────────────────────────────────────
function Wordmark({ width = 96, dark = false }) {
  const fg = dark ? '#FAF7F0' : '#2B4630';
  return (
    <svg viewBox="0 0 280 70" width={width} height={width * 70 / 280} aria-label="EKAM">
      <text x="14" y="56" fontFamily="Cormorant Garamond, serif" fontWeight="400" fontSize="58" fill={fg} letterSpacing="8">E</text>
      <circle cx="74" cy="34" r="5.5" fill="#B4613A" />
      <text x="92" y="56" fontFamily="Cormorant Garamond, serif" fontWeight="400" fontSize="58" fill={fg} letterSpacing="8">KAM</text>
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────
// Status bar (iOS-like, but quiet)
// ──────────────────────────────────────────────────────────────
function StatusBar({ dark = false }) {
  const c = dark ? '#FAF7F0' : '#14201A';
  return (
    <div className="statusbar" style={{ color: c }}>
      <span>9:42</span>
      <div className="statusbar__ind">
        <svg width="16" height="10" viewBox="0 0 16 10"><circle cx="2" cy="8" r="1.4" fill={c} /><circle cx="6" cy="6" r="1.4" fill={c} /><circle cx="10" cy="4" r="1.4" fill={c} /><circle cx="14" cy="2" r="1.4" fill={c} /></svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 9h2M4 7h2M7 5h2M10 3h2" stroke={c} strokeWidth="1.5" strokeLinecap="round" /></svg>
        <span style={{ fontSize: 11, fontWeight: 500 }}>84</span>
        <svg width="22" height="10" viewBox="0 0 22 10"><rect x="0.5" y="0.5" width="18" height="9" rx="2" fill="none" stroke={c} opacity="0.5" /><rect x="2" y="2" width="14" height="6" rx="1" fill={c} /><rect x="19" y="3.5" width="1.5" height="3" rx="0.6" fill={c} opacity="0.5" /></svg>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Top bar — used inside screens (not the global tab nav)
// ──────────────────────────────────────────────────────────────
function TopBar({ title, dev, eyebrow, dark = false, right, onBack, sticky = false }) {
  return (
    <div className={`topbar ${dark ? 'is-dark' : ''} ${sticky ? 'is-sticky' : ''}`}>
      <div className="topbar__row">
        {onBack ? (
          <button className="topbar__back" onClick={onBack} aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
        ) : <span style={{ width: 22 }} />}
        <div className="topbar__center">
          {dev && <div className="topbar__dev">{dev}</div>}
          {eyebrow && <div className="topbar__eyebrow">{eyebrow}</div>}
          {title && <div className="topbar__title">{title}</div>}
        </div>
        <div className="topbar__right">{right}</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Section header — eyebrow · headline. The standard rhythm.
// ──────────────────────────────────────────────────────────────
function SectionHead({ eyebrow, dev, title, sub, action, onForest = false, dense = false }) {
  return (
    <div className={`sechead ${dense ? 'is-dense' : ''}`}>
      <div className="sechead__main">
        {eyebrow && <span className={`sechead__eb ${onForest ? 'on-forest' : ''}`}>— {eyebrow}</span>}
        {dev && <span className="sechead__dev">{dev}</span>}
        {title && <h2 className={`sechead__title ${onForest ? 'on-forest' : ''}`}>{title}</h2>}
        {sub && <p className={`sechead__sub ${onForest ? 'on-forest' : ''}`}>{sub}</p>}
      </div>
      {action && <div className="sechead__action">{action}</div>}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Cabin chip / photo placeholder — uses the mood gradient
// ──────────────────────────────────────────────────────────────
function MoodPhoto({ moodKey, children, aspect = '4 / 5', round = false }) {
  const bg = window.EKAM_MOOD[moodKey] || window.EKAM_MOOD.A;
  return (
    <div className={`mood-photo ${round ? 'is-round' : ''}`} style={{ background: bg, aspectRatio: aspect }}>
      <span className="mood-photo__bindu" />
      {children}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Pill button (the only allowed rounded shape)
// ──────────────────────────────────────────────────────────────
function Pill({ children, onClick, variant = 'clay', size = 'md', icon = true, disabled }) {
  return (
    <button className={`pill pill--${variant} pill--${size}`} onClick={onClick} disabled={disabled}>
      {icon && <span className="pill__dot" />}
      <span>{children}</span>
    </button>
  );
}

// ──────────────────────────────────────────────────────────────
// Toggle (settings)
// ──────────────────────────────────────────────────────────────
function Toggle({ on, onChange }) {
  return (
    <div className={`toggle ${on ? 'on' : ''}`} onClick={() => onChange && onChange(!on)} role="switch" aria-checked={on} />
  );
}

// ──────────────────────────────────────────────────────────────
// Heart (save / favourite)
// ──────────────────────────────────────────────────────────────
function Heart({ saved, onToggle, size = 16, onPhoto = true }) {
  return (
    <button
      className={`heart ${onPhoto ? 'on-photo' : ''}`}
      onClick={(e) => { e.stopPropagation(); onToggle && onToggle(); }}
      aria-label={saved ? 'Remove from saved' : 'Save'}
    >
      <svg viewBox="0 0 24 24" width={size} height={size}
        fill={saved ? '#B4613A' : 'none'}
        stroke="#B4613A" strokeWidth="1.6">
        <path d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" />
      </svg>
    </button>
  );
}

// ──────────────────────────────────────────────────────────────
// Bindu rule — 36px clay hairline, the section anchor
// ──────────────────────────────────────────────────────────────
function BinduRule({ w = 36 }) {
  return <div className="bindu-rule" style={{ width: w }} />;
}

// ──────────────────────────────────────────────────────────────
// Sheet — bottom-sheet modal
// ──────────────────────────────────────────────────────────────
function Sheet({ open, onClose, children, title, dev, eyebrow, full = false }) {
  if (!open) return null;
  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className={`sheet ${full ? 'is-full' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="sheet__handle" />
        {(title || dev || eyebrow) && (
          <div className="sheet__head">
            {eyebrow && <span className="sheet__eb">— {eyebrow}</span>}
            {dev && <span className="sheet__dev">{dev}</span>}
            {title && <h3 className="sheet__title">{title}</h3>}
          </div>
        )}
        <div className="sheet__body">{children}</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Bottom tab nav
// ──────────────────────────────────────────────────────────────
function BottomNav({ tab, onTab, hasTrip = true }) {
  const tabs = [
    { id: 'home',     label: 'Home',     dev: 'घर',  icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8" /><path d="M5 9v12h14V9" /></svg>
    ) },
    { id: 'discover', label: 'Discover', dev: 'खोज', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="6.5" /><path d="M21 21l-4.5-4.5" /></svg>
    ) },
    { id: 'saved',    label: 'Saved',    dev: 'मन',  icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" /></svg>
    ) },
    { id: 'trips',    label: hasTrip ? 'Stay'   : 'Trips', dev: hasTrip ? 'अभी' : 'यात्रा',  icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 18s4-2 9-2 9 2 9 2" /><path d="M3 13s4-2 9-2 9 2 9 2" /><path d="M12 11V4" /><path d="M8 7l4-3 4 3" /></svg>
    ) },
    { id: 'profile',  label: 'Profile',  dev: 'आप',  icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></svg>
    ) },
  ];
  return (
    <nav className="tabbar">
      {tabs.map(t => (
        <button key={t.id} className={`tabbar__tab ${tab === t.id ? 'on' : ''}`} onClick={() => onTab(t.id)}>
          <span className="tabbar__icon">{t.icon}</span>
          <span className="tabbar__lbl">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

// ──────────────────────────────────────────────────────────────
// Tier glyph (Kutir hut / Van trees / Shikhar peak)
// ──────────────────────────────────────────────────────────────
function TierGlyph({ tier, size = 24, color = '#FAF7F0' }) {
  const s = { width: size, height: size };
  if (tier === 'KUTIR') return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M4 11L12 5l8 6" /><path d="M6 11v9h12v-9" /><rect x="10" y="13" width="4" height="7" stroke={color} fill={color} /></svg>
  );
  if (tier === 'VAN') return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"><path d="M6 19l4-6-2 0 4-6 4 6-2 0 4 6z" /></svg>
  );
  if (tier === 'SHIKHAR') return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"><path d="M3 20l6-11 4 7 3-5 5 9z" fill={color} fillOpacity="0.6" /></svg>
  );
  return null;
}

Object.assign(window, {
  Wordmark, StatusBar, TopBar, SectionHead, MoodPhoto,
  Pill, Toggle, Heart, BinduRule, Sheet, BottomNav, TierGlyph,
});
