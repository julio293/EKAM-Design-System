/* global React */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Saved Escapes, Profile & Membership · phone screens
// ════════════════════════════════════════════════════════════════
const { useState, useEffect } = React;

// ─── SHARED CHROME ────────────────────────────────────────────
function StatusBar({ dark = false }) {
  const c = dark ? '#FAF7F0' : '#14201A';
  return (
    <div className={`circle-sb ${dark ? 'on-dark' : ''}`}>
      <span>9:42</span>
      <div className="circle-sb__ind">
        <svg width="16" height="10" viewBox="0 0 16 10">
          <circle cx="2"  cy="8" r="1.4" fill={c} />
          <circle cx="6"  cy="6" r="1.4" fill={c} />
          <circle cx="10" cy="4" r="1.4" fill={c} />
          <circle cx="14" cy="2" r="1.4" fill={c} />
        </svg>
        <span style={{ fontSize: 11, fontWeight: 500 }}>84</span>
        <svg width="22" height="10" viewBox="0 0 22 10">
          <rect x="0.5" y="0.5" width="18" height="9" rx="1.5" fill="none" stroke={c} opacity="0.5" />
          <rect x="2" y="2" width="14" height="6" rx="0.5" fill={c} />
        </svg>
      </div>
    </div>
  );
}

function TopBar({ title, dev, dark = false, action = null }) {
  return (
    <div className={`circle-top ${dark ? 'on-dark' : ''}`}>
      <div className="circle-top__l">
        {dev && <span className="circle-top__dev">{dev}</span>}
        <span className="circle-top__title">{title}</span>
      </div>
      {action}
    </div>
  );
}

function TabStub({ active }) {
  const tabs = [
    { id: 'home',     name: 'Home',     href: 'EKAM Mobile - Home & Discovery.html' },
    { id: 'discover', name: 'Discover', href: 'EKAM Mobile - Home & Discovery.html#discover' },
    { id: 'saved',    name: 'Saved',    href: 'EKAM Mobile - Saved & Membership.html' },
    { id: 'trips',    name: 'Trips',    href: 'EKAM Mobile - Companion.html' },
    { id: 'profile',  name: 'Profile',  href: 'EKAM Mobile - Profile, Mudra & Referral.html#profile' },
  ];
  return (
    <nav className="circle-tabbar">
      {tabs.map(t => (
        <a key={t.id} href={t.href} className={`circle-tabbar__tab ${active === t.id ? 'on' : ''}`}>
          <span>{t.name}</span>
        </a>
      ))}
    </nav>
  );
}

// ════════════════════════════════════════════════════════════════
// SCREEN 01 · SAVED ESCAPES (with offers)
// ════════════════════════════════════════════════════════════════
function SavedScreen({ saved, onUnsave }) {
  const { SAVED, RECENT, OFFERS, MOOD, fmtMoney } = window.EKAM_CIRCLE;
  return (
    <div className="circle-screen">
      <StatusBar />
      <div className="circle-body">
        <div className="circle-hd">
          <span className="circle-hd__dev">मन</span>
          <h1 className="circle-hd__title">Saved Escapes.</h1>
          <p className="circle-hd__sub">{SAVED.length} cabins held for a quieter week.</p>
        </div>

        {/* Live offer ribbon — one at a time, the most relevant */}
        <div className="offer-ribbon">
          <span className="offer-ribbon__pulse" />
          <div>
            <span className="offer-ribbon__eb">— {OFFERS[0].label}</span>
            <span className="offer-ribbon__sub">{OFFERS[0].sub} · ends in {OFFERS[0].endsIn}</span>
          </div>
        </div>

        {/* Saved cards */}
        <div className="saved-list">
          {SAVED.map(c => (
            <article className="saved-card" key={c.id}>
              <div className="saved-card__photo" style={{ background: MOOD[c.mood] }}>
                <button
                  className={`saved-card__heart ${saved.has(c.id) ? 'on' : ''}`}
                  onClick={() => onUnsave(c.id)}
                  aria-label="Remove from saved"
                >
                  <svg viewBox="0 0 24 24" fill={saved.has(c.id) ? '#B4613A' : 'none'} stroke="#B4613A" strokeWidth="1.6">
                    <path d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" />
                  </svg>
                </button>
                <span className="saved-card__dev">{c.dev}</span>
                {c.offer && (
                  <span className={`saved-card__offer saved-card__offer--${c.offer.kind}`}>
                    {c.offer.label}
                  </span>
                )}
                <span className="saved-card__when">Saved {c.savedAt}</span>
              </div>

              <div className="saved-card__body">
                <div className="saved-card__top">
                  <div>
                    <span className="saved-card__eb">EKAM · {c.tier}</span>
                    <h3 className="saved-card__name">{c.name}.</h3>
                    <span className="saved-card__region">{c.region} · {c.elev}</span>
                  </div>
                  <div className="saved-card__price">
                    {c.memberFrom && (
                      <span className="saved-card__price-strike">{fmtMoney(c.from)}</span>
                    )}
                    <span className="saved-card__price-now">
                      {c.memberFrom ? fmtMoney(c.memberFrom) : fmtMoney(c.from)}
                    </span>
                    <span className="saved-card__price-lbl">/ night</span>
                  </div>
                </div>

                <p className="saved-card__note">{c.note}</p>

                <ul className="saved-card__chips">
                  {c.highlights.map(h => (<li key={h}>{h}</li>))}
                </ul>

                <div className="saved-card__foot">
                  <span className="saved-card__drive">↗ {c.drive}</span>
                  <a className="saved-card__cta" href={`EKAM Mobile - Property & Booking.html?cabin=${c.id}`}>
                    <span className="dot" />
                    Reserve
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Recently viewed strip */}
        <div className="recent">
          <span className="recent__lbl">— You were just here</span>
          <div className="recent__rail">
            {RECENT.map(c => (
              <div className="recent__card" key={c.id}>
                <div className="recent__photo" style={{ background: MOOD[c.mood] }} />
                <span className="recent__name">{c.name}</span>
                <span className="recent__region">{c.region}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TabStub active="saved" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SCREEN 02 · SAVED · EMPTY (redesigned — ambient + map + starters)
// The empty state is the first decision. We give the user
// something to choose from, not a paragraph about what they could.
// ════════════════════════════════════════════════════════════════
function SavedEmptyScreen() {
  const [saving, setSaving] = useState(new Set());
  // A tiny, fixed network — 15 dots, three "starters" highlighted
  const NET = [
    { id: 'binsar',    x: 71, y: 38, on: true,  name: 'Binsar' },
    { id: 'ramgarh',   x: 68, y: 44, on: false, name: 'Ramgarh' },
    { id: 'lamgad',    x: 72, y: 42, on: false, name: 'Lamgad' },
    { id: 'kausani',   x: 73, y: 36, on: false, name: 'Kausani' },
    { id: 'jhebi',     x: 38, y: 50, on: true,  name: 'Jhebi' },
    { id: 'baspa',     x: 35, y: 36, on: false, name: 'Baspa' },
    { id: 'sainj',     x: 32, y: 44, on: false, name: 'Sainj' },
    { id: 'tirthan',   x: 36, y: 49, on: false, name: 'Tirthan' },
    { id: 'kalpa',     x: 36, y: 32, on: true,  name: 'Kalpa' },
    { id: 'nako',      x: 38, y: 26, on: false, name: 'Nako' },
    { id: 'chitkul',   x: 37, y: 38, on: false, name: 'Chitkul' },
    { id: 'fago',      x: 32, y: 22, on: false, name: 'Fago' },
    { id: 'shimla',    x: 28, y: 48, on: false, name: 'Shimla' },
    { id: 'binsar2',   x: 73, y: 40, on: false, name: 'Binsar Deep' },
    { id: 'munsiyari', x: 77, y: 32, on: false, name: 'Munsiyari' },
  ];

  // The three starter cabins
  const STARTERS = [
    { id: 'binsar', name: 'Binsar', dev: 'कुटीर', tier: 'KUTIR', region: 'Kumaon', elev: '2,400 m', note: 'For the quiet. Forest light, monal song.', grad: 'linear-gradient(180deg, #0c1410 0%, #2B4630 60%, #6a7565 100%)' },
    { id: 'kalpa',  name: 'Kalpa',  dev: 'शिखर', tier: 'SHIKHAR', region: 'Kinnaur', elev: '3,200 m', note: 'For the sky. Above the cloud line.',         grad: 'linear-gradient(180deg, #2a3845 0%, #6e7a82 50%, #b8a48c 100%)' },
    { id: 'jhebi',  name: 'Jhebi',  dev: 'कुटीर', tier: 'KUTIR', region: 'Tirthan', elev: '1,800 m', note: 'For the river. Trout stream, deodar.',     grad: 'linear-gradient(180deg, #1f3525 0%, #2B4630 60%, #5a6655 100%)' },
  ];

  const toggleSave = (id) => {
    setSaving(s => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  return (
    <div className="circle-screen circle-screen--empty">
      <StatusBar dark />

      {/* Header sits on the dark ambient ridge */}
      <div className="empty-hd">
        <span className="empty-hd__dev">मन · the shortlist</span>
        <h1 className="empty-hd__title">Pick three to <em>begin</em>.</h1>
      </div>

      {/* Mini network map — the only ambient element */}
      <div className="empty-map">
        <svg viewBox="0 0 100 70" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            <radialGradient id="empty-glow" cx="55%" cy="50%" r="65%">
              <stop offset="0%"  stopColor="rgba(180,97,58,0.10)" />
              <stop offset="100%" stopColor="rgba(180,97,58,0)" />
            </radialGradient>
          </defs>
          <rect width="100" height="70" fill="url(#empty-glow)" />

          {/* Subtle landmass — the Himachal + Uttarakhand crescent */}
          <path
            d="M14 18 Q 22 12, 36 14 L 50 16 Q 62 14, 72 18 L 86 22 Q 88 32, 82 44 L 70 52 Q 56 56, 42 54 L 28 50 Q 16 44, 14 32 Z"
            fill="rgba(250,247,240,0.025)"
            stroke="rgba(250,247,240,0.10)"
            strokeWidth="0.25"
          />

          {/* Two cluster labels — quiet anchors */}
          <text x="32" y="11" fontFamily="Inter, sans-serif" fontSize="2.8" fill="rgba(250,247,240,0.35)" letterSpacing="0.5">HIMACHAL</text>
          <text x="63" y="11" fontFamily="Inter, sans-serif" fontSize="2.8" fill="rgba(250,247,240,0.35)" letterSpacing="0.5">UTTARAKHAND</text>

          {/* Soft ridge curves */}
          <path d="M0 30 Q 30 22, 60 28 T 100 26" fill="none" stroke="rgba(250,247,240,0.08)" strokeWidth="0.3" />
          <path d="M0 44 Q 30 38, 60 42 T 100 40" fill="none" stroke="rgba(250,247,240,0.06)" strokeWidth="0.3" />

          {/* Pins */}
          {NET.map((p, i) => {
            const isSaved = saving.has(p.id);
            return (
              <g key={p.id}>
                {p.on && !isSaved && (
                  <circle cx={p.x} cy={p.y} r="3" fill="none" stroke="rgba(180,97,58,0.5)" strokeWidth="0.5">
                    <animate attributeName="r" values="2;6;2" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
                    <animate attributeName="opacity" values="0.9;0;0.9" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
                  </circle>
                )}
                <circle
                  cx={p.x} cy={p.y}
                  r={isSaved ? 1.9 : (p.on ? 1.6 : 1.1)}
                  fill={isSaved || p.on ? '#B4613A' : 'rgba(250,247,240,0.35)'}
                  stroke={!p.on && !isSaved ? 'rgba(250,247,240,0.5)' : 'none'}
                  strokeWidth="0.3"
                />
                {p.on && (
                  <text
                    x={p.x + 2.5} y={p.y + 0.8}
                    fontFamily="Cormorant Garamond, serif"
                    fontStyle="italic"
                    fontSize="3" fill="rgba(250,247,240,0.7)"
                  >{p.name}</text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Inline guidance on a hairline between map and starters */}
      <div className="empty-rule">
        <span className="empty-rule__l">Fifteen cabins · three suggested</span>
        <span className="empty-rule__r">{saving.size}/3 held</span>
      </div>

      {/* Three starter cabins on the warm sand body */}
      <div className="empty-body">
        <span className="empty-body__eb">— Three to start with</span>
        <ul className="starters">
          {STARTERS.map(s => {
            const isSaved = saving.has(s.id);
            return (
              <li key={s.id} className={`starter ${isSaved ? 'on' : ''}`}>
                <div className="starter__photo" style={{ background: s.grad }}>
                  <span className="starter__tier">{s.dev}</span>
                  <button
                    className={`starter__heart ${isSaved ? 'on' : ''}`}
                    onClick={() => toggleSave(s.id)}
                    aria-label={isSaved ? 'Release from shortlist' : 'Hold this cabin'}
                    aria-pressed={isSaved}
                  >
                    <svg viewBox="0 0 24 24" fill={isSaved ? '#B4613A' : 'none'} stroke="#B4613A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" />
                    </svg>
                  </button>
                </div>
                <div className="starter__body">
                  <span className="starter__name">{s.name}</span>
                  <span className="starter__region">{s.region} · {s.elev}</span>
                  <span className="starter__note">{s.note}</span>
                </div>
              </li>
            );
          })}
        </ul>

        <a className="empty-body__more" href="#">— or browse all fifteen</a>
      </div>

      <TabStub active="saved" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SCREEN 03 · PROFILE (the dashboard)
// ════════════════════════════════════════════════════════════════
function ProfileScreen() {
  const { USER, JOURNEYS, MOOD } = window.EKAM_CIRCLE;
  const upcoming = JOURNEYS.upcoming[0];
  const lastPast = JOURNEYS.past[0];

  return (
    <div className="circle-screen">
      <StatusBar />
      <div className="circle-body">
        {/* User strip */}
        <div className="user-strip">
          <div className="user-strip__avatar">{USER.initial}</div>
          <div>
            <h2 className="user-strip__name">{USER.name}</h2>
            <span className="user-strip__sub">{USER.tier} · since {USER.tierStarted}</span>
          </div>
          <button className="user-strip__edit">Edit →</button>
        </div>

        {/* Stat triplet */}
        <div className="stats">
          <div>
            <span className="stats__big">{USER.nights}</span>
            <span className="stats__lbl">Nights at EKAM</span>
          </div>
          <div>
            <span className="stats__big">{USER.saplings}</span>
            <span className="stats__lbl">Saplings funded</span>
          </div>
          <div>
            <span className="stats__big">{USER.toNextTier}</span>
            <span className="stats__lbl">To Inner Circle</span>
          </div>
        </div>

        {/* Upcoming retreat hero card */}
        {upcoming && (
          <div className="upcoming">
            <div className="upcoming__photo" style={{ background: MOOD[upcoming.mood] }}>
              <span className="upcoming__count">{upcoming.countdown} days</span>
            </div>
            <div className="upcoming__body">
              <span className="upcoming__eb">— Next retreat</span>
              <h3 className="upcoming__name">{upcoming.name}.</h3>
              <span className="upcoming__dates">{upcoming.dates} · with {upcoming.host}</span>
              <p className="upcoming__note">{upcoming.note}</p>
              <button className="upcoming__cta">Open companion →</button>
            </div>
          </div>
        )}

        {/* Quick row */}
        <div className="quickrow">
          {[
            { lbl: 'Saved', val: '3 cabins', dev: 'मन' },
            { lbl: 'Past',  val: '4 retreats', dev: 'पथ' },
            { lbl: 'Circle benefits', val: 'Updated', dev: 'मंडल' },
            { lbl: 'Preferences', val: 'A slow reset', dev: 'मन' },
          ].map((r, i) => (
            <div className="quickrow__row" key={i}>
              <span className="quickrow__dev">{r.dev}</span>
              <div className="quickrow__body">
                <span className="quickrow__lbl">{r.lbl}</span>
                <span className="quickrow__val">{r.val}</span>
              </div>
              <span className="quickrow__chev">→</span>
            </div>
          ))}
        </div>

        {/* Last past retreat (preview) */}
        {lastPast && (
          <div className="past-preview">
            <span className="past-preview__eb">— Last journey</span>
            <div className="past-preview__card">
              <div className="past-preview__photo" style={{ background: MOOD[lastPast.mood] }} />
              <div className="past-preview__body">
                <span className="past-preview__name">{lastPast.name} · {lastPast.dates}</span>
                <p className="past-preview__letter">{lastPast.letter}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <TabStub active="profile" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SCREEN 04 · RETREAT JOURNEYS (upcoming + past)
// ════════════════════════════════════════════════════════════════
function JourneysScreen() {
  const { JOURNEYS, MOOD } = window.EKAM_CIRCLE;
  const up = JOURNEYS.upcoming[0];
  return (
    <div className="circle-screen">
      <StatusBar />
      <div className="circle-body">
        <div className="circle-hd">
          <span className="circle-hd__dev">पथ</span>
          <h1 className="circle-hd__title">Retreat Journeys.</h1>
          <p className="circle-hd__sub">One upcoming, four behind you. Each a small story.</p>
        </div>

        {/* Upcoming */}
        <div className="journey-section">
          <span className="journey-section__eb">— Upcoming</span>
          {up && (
            <div className="journey journey--up">
              <div className="journey__photo" style={{ background: MOOD[up.mood] }}>
                <div className="journey__count">
                  <span className="journey__count-num">{up.countdown}</span>
                  <span className="journey__count-lbl">days from today</span>
                </div>
              </div>
              <div className="journey__body">
                <span className="journey__eb">EKAM · {up.tier}</span>
                <h3 className="journey__name">{up.name}.</h3>
                <div className="journey__meta">
                  <div>
                    <span className="journey__meta-lbl">Dates</span>
                    <span className="journey__meta-val">{up.dates}</span>
                  </div>
                  <span className="journey__meta-sep" />
                  <div>
                    <span className="journey__meta-lbl">Host</span>
                    <span className="journey__meta-val">{up.host}</span>
                  </div>
                </div>
                <p className="journey__note">{up.note}</p>
                <div className="journey__actions">
                  <button className="journey__primary">Open companion</button>
                  <button className="journey__ghost">View itinerary</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Past */}
        <div className="journey-section">
          <span className="journey-section__eb">— Behind</span>
          {JOURNEYS.past.map(p => (
            <div className="journey journey--past" key={p.id}>
              <div className="journey__photo journey__photo--sm" style={{ background: MOOD[p.mood] }} />
              <div className="journey__body">
                <span className="journey__eb">{p.dates} · with {p.host}</span>
                <h3 className="journey__name">{p.name}.</h3>
                <p className="journey__letter">"{p.letter}"</p>
                <div className="journey__photos">
                  <span>{p.photos} photographs</span>
                  <span className="journey__chev">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabStub active="trips" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SCREEN 05 · EKAM CIRCLE (membership)
// ════════════════════════════════════════════════════════════════
function CircleScreen() {
  const { TIERS, USER } = window.EKAM_CIRCLE;
  return (
    <div className="circle-screen circle-screen--dark">
      <StatusBar dark />
      <div className="circle-body circle-body--dark">
        <div className="circle-hd circle-hd--dark">
          <span className="circle-hd__dev">मंडल</span>
          <h1 className="circle-hd__title">EKAM Circle.</h1>
          <p className="circle-hd__sub">Three rings. Quiet privileges. One forest at a time.</p>
        </div>

        {/* Current status card */}
        <div className="circle-status">
          <div>
            <span className="circle-status__eb">— You are</span>
            <span className="circle-status__name">Circle</span>
            <span className="circle-status__since">Member since {USER.tierStarted}</span>
          </div>
          <div className="circle-status__ring">
            <svg viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(180,97,58,0.22)" strokeWidth="3" />
              <circle cx="32" cy="32" r="28" fill="none" stroke="#B4613A" strokeWidth="3"
                strokeDasharray="176" strokeDashoffset="63"
                transform="rotate(-90 32 32)" strokeLinecap="round" />
              <text x="32" y="34" textAnchor="middle" fontFamily="serif" fontSize="13" fill="#FAF7F0">17</text>
              <text x="32" y="46" textAnchor="middle" fontFamily="sans-serif" fontSize="5" fill="rgba(250,247,240,0.5)" letterSpacing="1">NIGHTS</text>
            </svg>
          </div>
        </div>

        <p className="circle-toinner">
          {USER.toNextTier} more nights — and a small invitation — to <em>Inner Circle</em>.
        </p>

        {/* Tier ladder */}
        <div className="tiers">
          {TIERS.map(t => (
            <div className={`tier ${t.current ? 'on' : ''}`} key={t.id}>
              <div className="tier__head">
                <div>
                  <span className="tier__dev">{t.dev}</span>
                  <span className="tier__name">{t.name}</span>
                </div>
                <span className="tier__range">{t.range}</span>
              </div>
              <ul className="tier__benefits">
                {t.benefits.map((b, i) => (
                  <li key={i}>
                    <span className="tier__bullet" />
                    {b}
                  </li>
                ))}
              </ul>
              {t.current && <span className="tier__badge">— Your tier</span>}
            </div>
          ))}
        </div>

        <p className="circle-foot">
          The Circle is not a points system. It is a record of nights you've chosen to spend slowly. <em>Privileges follow time, not transactions.</em>
        </p>
      </div>
      <TabStub active="profile" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SCREEN 06 · PREFERENCES (edit personalisation)
// ════════════════════════════════════════════════════════════════
function PrefsScreen() {
  const { PREFS } = window.EKAM_CIRCLE;
  return (
    <div className="circle-screen">
      <StatusBar />
      <div className="circle-body">
        <TopBar title="Preferences" dev="मन" />
        <div className="circle-hd circle-hd--small">
          <h1 className="circle-hd__title">What we know.</h1>
          <p className="circle-hd__sub">Edit anything. We re-tune the home and the recommendations as soon as you save.</p>
        </div>

        <div className="prefs">
          {PREFS.map((p, i) => (
            <div className="pref" key={i}>
              <div>
                <span className="pref__lbl">{p.lbl}</span>
                <span className="pref__val">{p.val}</span>
                <span className="pref__hint">{p.hint}</span>
              </div>
              <button className="pref__edit">Change</button>
            </div>
          ))}
        </div>

        <div className="prefs-foot">
          <span className="prefs-foot__eb">— A small promise</span>
          <p>We don't sell or share these. They sit on your phone, encrypted, and on our servers, with one engineer who has the key. If you'd like them gone, the line above does it in one tap.</p>
          <button className="prefs-foot__btn">Delete all preferences</button>
        </div>
      </div>
      <TabStub active="profile" />
    </div>
  );
}

window.CIRCLE_SavedScreen      = SavedScreen;
window.CIRCLE_SavedEmptyScreen = SavedEmptyScreen;
window.CIRCLE_ProfileScreen    = ProfileScreen;
window.CIRCLE_JourneysScreen   = JourneysScreen;
window.CIRCLE_CircleScreen     = CircleScreen;
window.CIRCLE_PrefsScreen      = PrefsScreen;
