/* global React */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Chapter V · phone screens
// ════════════════════════════════════════════════════════════════
const { useState } = React;

function StatusBar({ dark = false }) {
  const c = dark ? '#FAF7F0' : '#14201A';
  return (
    <div className={`net-sb ${dark ? 'on-dark' : ''}`}>
      <span>9:42</span>
      <div className="net-sb__ind">
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

function TabStub({ active, dark = false }) {
  const tabs = [
    { id: 'home',     name: 'Home',     href: 'EKAM Mobile - Home & Discovery.html' },
    { id: 'discover', name: 'Discover', href: 'EKAM Mobile - Home & Discovery.html#discover' },
    { id: 'saved',    name: 'Saved',    href: 'EKAM Mobile - Profile, Mudra & Referral.html#saved' },
    { id: 'mudra',    name: 'Mudra',    href: 'EKAM Mobile - Profile, Mudra & Referral.html#mudra' },
    { id: 'profile',  name: 'You',      href: 'EKAM Mobile - Profile, Mudra & Referral.html#profile' },
  ];
  return (
    <nav className={`net-tabbar ${dark ? 'on-dark' : ''}`}>
      {tabs.map(t => (
        <a key={t.id} href={t.href} className={`net-tabbar__tab ${active === t.id ? 'on' : ''}`}>
          <span>{t.name}</span>
        </a>
      ))}
    </nav>
  );
}

// Brand glyph — used as a small wax-seal-like impression on each mudra
function MudraSeal({ dev = 'कु', dark = false, size = 56 }) {
  return (
    <div className={`mseal ${dark ? 'mseal--dark' : ''}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 64 64">
        {/* Outer impressed edge — irregular octagon for a hand-pressed feel */}
        <path
          d="M14 6 L40 4 L54 14 L60 32 L52 50 L36 60 L14 58 L4 44 L4 24 L14 6 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.5"
        />
        <path
          d="M16 9 L40 7 L52 16 L58 32 L51 48 L36 57 L16 55 L7 44 L7 24 L16 9 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.4"
        />
        {/* Center binud dot */}
        <circle cx="32" cy="48" r="1.4" fill="currentColor" opacity="0.8" />
      </svg>
      <span className="mseal__dev">{dev}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 01 · SAVED ESCAPES (restrained)
// ════════════════════════════════════════════════════════════════
function SavedScreen({ saved, onUnsave }) {
  const { SAVED, RECENT, MOOD, COPY } = window.EKAM_NET;
  return (
    <div className="net-screen">
      <StatusBar />
      <div className="net-body">
        <header className="net-hd">
          <span className="net-hd__dev">{COPY.saved.eyebrow}</span>
          <h1 className="net-hd__title">{COPY.saved.title}</h1>
          <p className="net-hd__sub">{COPY.saved.sub}</p>
        </header>

        <div className="esc-list">
          {SAVED.filter(c => saved.has(c.id)).map(c => (
            <article className="esc" key={c.id}>
              <div className="esc__photo" style={{ background: MOOD[c.mood] }}>
                <button
                  className={`esc__hold ${saved.has(c.id) ? 'on' : ''}`}
                  onClick={() => onUnsave(c.id)}
                  aria-label="Release this cabin"
                >
                  <svg viewBox="0 0 24 24" fill={saved.has(c.id) ? '#B4613A' : 'none'} stroke="#B4613A" strokeWidth="1.4">
                    <path d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" />
                  </svg>
                </button>
              </div>

              <div className="esc__body">
                <div className="esc__top">
                  <span className="esc__dev">{c.dev}</span>
                  <span className="esc__name">{c.name}</span>
                </div>
                <span className="esc__region">{c.region}</span>

                <div className="esc__meta">
                  <div>
                    <span className="esc__meta-lbl">Drive</span>
                    <span className="esc__meta-val">{c.drive}</span>
                  </div>
                  <span className="esc__meta-sep" />
                  <div>
                    <span className="esc__meta-lbl">Season</span>
                    <span className="esc__meta-val">{c.season}</span>
                  </div>
                </div>

                <p className="esc__note">{c.note}</p>

                <a className="esc__cta" href={`EKAM Mobile - Property & Booking.html?cabin=${c.id}`}>{COPY.saved.action}</a>
              </div>
            </article>
          ))}
        </div>

        <section className="recent">
          <span className="recent__lbl">{COPY.saved.recent}</span>
          <div className="recent__rail">
            {RECENT.map(r => (
              <div className="recent__c" key={r.id}>
                <div className="recent__c-photo" style={{ background: MOOD[r.mood] }} />
                <span className="recent__c-name">{r.name}</span>
                <span className="recent__c-region">{r.region}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <TabStub active="saved" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 02 · PROFILE (archival, no dashboard)
// ════════════════════════════════════════════════════════════════
function ProfileScreen() {
  const { USER, COUNT } = window.EKAM_NET;
  return (
    <div className="net-screen">
      <StatusBar />
      <div className="net-body">
        <div className="prof-greet">
          <div className="prof-greet__avatar">{USER.initial}</div>
          <div>
            <span className="prof-greet__name">{USER.name}</span>
            <span className="prof-greet__sub">{USER.joined}</span>
          </div>
        </div>

        <ul className="prof-list">
          <li className="prof-row">
            <div>
              <span className="prof-row__lbl">A retreat ahead</span>
              <span className="prof-row__val">Kalpa · 14 — 20 August</span>
              <span className="prof-row__hint">The companion opens 14 days before you arrive.</span>
            </div>
            <span className="prof-row__chev">→</span>
          </li>
          <li className="prof-row">
            <div>
              <span className="prof-row__lbl">Saved escapes</span>
              <span className="prof-row__val">Three cabins, held quietly.</span>
              <span className="prof-row__hint">Released anytime — nothing held forever.</span>
            </div>
            <span className="prof-row__chev">→</span>
          </li>
          <li className="prof-row">
            <div>
              <span className="prof-row__lbl">Mudra · the seals</span>
              <span className="prof-row__val">{COUNT.visited} of {COUNT.total} cabins.</span>
              <span className="prof-row__hint">The book of your stays — a seal arrives by post after each.</span>
            </div>
            <span className="prof-row__chev">→</span>
          </li>
          <li className="prof-row">
            <div>
              <span className="prof-row__lbl">An introduction</span>
              <span className="prof-row__val">Send a cabin to someone.</span>
              <span className="prof-row__hint">A note from you, a held cabin for them. No discounts.</span>
            </div>
            <span className="prof-row__chev">→</span>
          </li>
          <li className="prof-row">
            <div>
              <span className="prof-row__lbl">What we know</span>
              <span className="prof-row__val">A slow reset · two of you · 2,400 – 3,400 m</span>
              <span className="prof-row__hint">The six questions from when you joined.</span>
            </div>
            <span className="prof-row__chev">→</span>
          </li>
        </ul>

        <div className="prof-foot">
          <span>Sign out</span>
          <span>Help</span>
        </div>
      </div>
      <TabStub active="profile" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 03 · MUDRA HOME (map view — the network as visited vs unvisited)
// ════════════════════════════════════════════════════════════════
function MudraHomeScreen() {
  const { NETWORK, COPY, COUNT } = window.EKAM_NET;
  const [view, setView] = useState('map');

  return (
    <div className="net-screen">
      <StatusBar />
      <div className="net-body">
        <header className="net-hd">
          <span className="net-hd__dev">{COPY.mudra.eyebrow}</span>
          <h1 className="net-hd__title">{COPY.mudra.title}</h1>
          <p className="net-hd__sub">{COPY.mudra.sub}</p>
        </header>

        <div className="mudra-toggle">
          <button className={view === 'map' ? 'on' : ''} onClick={() => setView('map')}>{COPY.mudra.toggleMap}</button>
          <button className={view === 'journal' ? 'on' : ''} onClick={() => setView('journal')}>{COPY.mudra.toggleJournal}</button>
        </div>

        {view === 'map' && (
          <div className="mudra-map">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', aspectRatio: '1/1', display: 'block' }}>
              {/* Background landmass — quiet outline of HP/UK */}
              <path
                d="M14 14 L 86 12 L 90 30 L 86 48 L 78 58 L 60 64 L 44 60 L 24 56 L 14 42 Z"
                fill="#F1ECDE" stroke="#D8D3C4" strokeWidth="0.3"
              />
              {/* Subtle ridges */}
              <path d="M16 28 Q 36 22, 56 30 T 88 24" stroke="#E1D9C0" strokeWidth="0.35" fill="none" />
              <path d="M14 40 Q 32 36, 50 42 T 88 36" stroke="#E1D9C0" strokeWidth="0.35" fill="none" />
              <path d="M14 50 Q 30 47, 48 52 T 88 46" stroke="#E1D9C0" strokeWidth="0.35" fill="none" />

              {/* Pins */}
              {NETWORK.map(n => (
                <g key={n.id}>
                  {n.visited ? (
                    <>
                      <circle cx={n.x} cy={n.y} r={1.6} fill="#B4613A" />
                      <circle cx={n.x} cy={n.y} r={3.2} fill="none" stroke="#B4613A" strokeWidth="0.3" opacity="0.4" />
                    </>
                  ) : (
                    <circle cx={n.x} cy={n.y} r={1.4} fill="none" stroke="#7A8A6B" strokeWidth="0.4" opacity="0.7" />
                  )}
                </g>
              ))}
            </svg>

            <div className="mudra-legend">
              <span><span className="dot dot--filled" /> Visited · {COUNT.visited}</span>
              <span><span className="dot dot--outline" /> Remaining · {COUNT.remaining}</span>
            </div>
          </div>
        )}

        {view === 'journal' && <JournalGrid compact />}

        <p className="mudra-foot">{COPY.mudra.footer}</p>
      </div>
      <TabStub active="mudra" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 04 · MUDRA DETAIL (single property mark)
// ════════════════════════════════════════════════════════════════
function MudraDetailScreen() {
  const { FOCUSED_MUDRA } = window.EKAM_NET;
  const m = FOCUSED_MUDRA;
  return (
    <div className="net-screen">
      <StatusBar />
      <div className="net-body net-body--center">
        <button className="md-back">← Mudra</button>

        <div className="md-stage">
          <div className="md-seal">
            <MudraSeal dev={m.dev} size={140} />
          </div>

          <span className="md-eb">{m.dev} · {m.tier}</span>
          <h1 className="md-name">{m.name}.</h1>
          <span className="md-region">{m.region} · Cabin No. {m.cabinNo}</span>

          <div className="md-meta">
            <div>
              <span className="md-meta-lbl">Stayed</span>
              <span className="md-meta-val">{m.visitedAt}</span>
            </div>
            <span className="md-meta-sep" />
            <div>
              <span className="md-meta-lbl">With</span>
              <span className="md-meta-val">{m.host}</span>
            </div>
            <span className="md-meta-sep" />
            <div>
              <span className="md-meta-lbl">When</span>
              <span className="md-meta-val">{m.season}</span>
            </div>
          </div>

          <div className="md-line">
            <span className="md-line-lbl">A line you wrote</span>
            <p className="md-line-val">
              The monal landed on the deck on day three. Aarav left a hand-drawn trail map under the cup.
            </p>
          </div>

          <span className="md-foot">
            A wax copy of this mudra was posted to you on 02 December 2025.
          </span>
        </div>
      </div>
      <TabStub active="mudra" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 05 · JOURNAL PAGE (wax-seal grid, mirrors the physical book)
// ════════════════════════════════════════════════════════════════
function JournalGrid({ compact = false }) {
  const { NETWORK } = window.EKAM_NET;
  return (
    <div className={`journal ${compact ? 'journal--compact' : ''}`}>
      <div className="journal__page">
        <div className="journal__head">
          <span className="journal__vol">Volume I</span>
          <span className="journal__sub">Three nights, three seals.</span>
        </div>
        <div className="journal__grid">
          {NETWORK.map(n => (
            <div className={`journal__cell ${n.visited ? 'on' : ''}`} key={n.id}>
              <MudraSeal dev={n.dev.charAt(0)} size={compact ? 38 : 52} />
              <span className="journal__name">{n.name}</span>
              {n.visited && <span className="journal__when">{n.visitedAt}</span>}
            </div>
          ))}
        </div>
        {!compact && (
          <div className="journal__foot">
            <span>Volume II opens after your fourth stay.</span>
          </div>
        )}
      </div>
    </div>
  );
}

function JournalScreen() {
  return (
    <div className="net-screen">
      <StatusBar />
      <div className="net-body">
        <header className="net-hd">
          <span className="net-hd__dev">मुद्रा</span>
          <h1 className="net-hd__title">The journal.</h1>
          <p className="net-hd__sub">A page from the book. Each seal arrives in your post after the stay.</p>
        </header>
        <JournalGrid />
      </div>
      <TabStub active="mudra" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 06 · REFERRAL HOME (redesigned — postcard share + reward context)
// ════════════════════════════════════════════════════════════════
function ReferralScreen() {
  const { COPY, PAST_INTRODUCTIONS, MOOD, REFERRAL_REWARD_PER } = window.EKAM_NET;
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(null);

  const channels = [
    { id: 'whatsapp', name: 'WhatsApp', icon: <path d="M21 12a9 9 0 01-13.5 7.8L3 21l1.3-4.4A9 9 0 1121 12z M9 9c.5 1.5 1.5 2.5 3 3" /> },
    { id: 'imessage', name: 'Messages', icon: <path d="M21 11.5a8.4 8.4 0 01-9 8.4 8.5 8.5 0 01-3.6-.8L3 21l1.9-5.4A8.4 8.4 0 0112 3a8.4 8.4 0 019 8.5z" /> },
    { id: 'email',    name: 'Email',    icon: <><rect x="3" y="5" width="18" height="14" rx="1" /><polyline points="3 7 12 13 21 7" /></> },
    { id: 'link',     name: copied ? 'Copied' : 'Copy link', icon: copied ? <polyline points="20 6 9 17 4 12" /> : <><rect x="9" y="9" width="12" height="12" rx="1" /><path d="M5 15V5a1 1 0 011-1h10" /></> },
    { id: 'x',        name: 'X',        icon: <path d="M4 4l16 16M20 4L4 20" /> },
    { id: 'fb',       name: 'Facebook', icon: <path d="M16 7h-3a2 2 0 00-2 2v12M8 13h7" /> },
    { id: 'ig',       name: 'Instagram',icon: <><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="0.6" /></> },
    { id: 'more',     name: 'More',     icon: <><circle cx="5" cy="12" r="1.2" /><circle cx="12" cy="12" r="1.2" /><circle cx="19" cy="12" r="1.2" /></> },
  ];

  const onSend = (id) => {
    if (id === 'link') {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      return;
    }
    setSent(id);
    setTimeout(() => setSent(null), 1500);
  };

  return (
    <div className="net-screen">
      <StatusBar />
      <div className="net-body">
        <header className="net-hd">
          <span className="net-hd__dev">{COPY.referral.eyebrow}</span>
          <h1 className="net-hd__title">{COPY.referral.title}</h1>
          <p className="net-hd__sub">{COPY.referral.sub}</p>
        </header>

        {/* Postcard preview — what the recipient will see */}
        <div className="postcard">
          <div className="postcard__photo" style={{ background: MOOD.binsar }}>
            <span className="postcard__stamp">
              <span className="postcard__stamp-dev">कुटीर</span>
              <span className="postcard__stamp-lbl">EKAM</span>
            </span>
            <span className="postcard__caption">An invitation, from Anika</span>
          </div>
          <div className="postcard__body">
            <span className="postcard__eb">— You're sending</span>
            <span className="postcard__name">A cabin to choose from.</span>
            <span className="postcard__sub">The recipient sees your first name, your note, and one cabin you've already stayed at.</span>
          </div>
        </div>

        {/* Personal note · Caveat hand */}
        <div className="ref-note">
          <span className="ref-note__lbl">{COPY.referral.noteLbl}</span>
          <div className="ref-note__field">
            <p>{COPY.referral.notePlaceholder}</p>
          </div>
        </div>

        {/* Share grid · 4 × 2, matches the web modal */}
        <div className="share-grid-wrap">
          <span className="share-grid__lbl">{COPY.referral.sendLbl}</span>
          <div className="share-grid">
            {channels.map(c => (
              <button
                key={c.id}
                className={`share-cell ${sent === c.id ? 'sent' : ''} ${c.id === 'link' && copied ? 'sent' : ''}`}
                onClick={() => onSend(c.id)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                <span>{sent === c.id ? 'Sent' : c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reward context — quiet, factual */}
        <div className="ref-reward">
          <div className="ref-reward__dev"><MudraSeal dev="₹" size={42} /></div>
          <div>
            <span className="ref-reward__lbl">A small return, after their first stay</span>
            <p className="ref-reward__body">
              ₹{REFERRAL_REWARD_PER.toLocaleString('en-IN')} arrives in your Mudra balance when the person you've introduced completes their first night with us. No code, no expiry, no claim.
            </p>
          </div>
        </div>

        {/* Past introductions */}
        <div className="ref-past">
          <span className="ref-past__lbl">{COPY.referral.pastLbl}</span>
          <ul>
            {PAST_INTRODUCTIONS.map(p => (
              <li key={p.name}>
                <span className="ref-past__avatar">{p.initial}</span>
                <div>
                  <span className="ref-past__name">{p.name}</span>
                  <span className="ref-past__status">{p.status}</span>
                </div>
                <span className={`ref-past__when ref-past__when--${p.state}`}>
                  {p.state === 'completed' && <em>+ ₹{p.earnedMudra.toLocaleString('en-IN')}</em>}
                  {p.state === 'arriving'  && <em>holding · ₹{p.pendingMudra.toLocaleString('en-IN')}</em>}
                  {p.state === 'held'      && p.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <TabStub active="profile" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 06b · MUDRA BALANCE (held for the user)
// ════════════════════════════════════════════════════════════════
function MudraBalanceScreen() {
  const { COPY, MUDRA_LEDGER, MUDRA_BALANCE, MILESTONES, REDEMPTION_CAP_PCT } = window.EKAM_NET;
  const reached = MILESTONES.filter(m => m.reached).length;
  const nextMilestone = MILESTONES.find(m => !m.reached);

  return (
    <div className="net-screen">
      <StatusBar />
      <div className="net-body">
        <header className="net-hd">
          <span className="net-hd__dev">{COPY.balance.eyebrow}</span>
          <h1 className="net-hd__title">{COPY.balance.title}</h1>
          <p className="net-hd__sub">{COPY.balance.sub}</p>
        </header>

        {/* Balance card — the headline number */}
        <div className="bal-card">
          <span className="bal-card__lbl">{COPY.balance.cardLbl}</span>
          <div className="bal-card__amt">
            <span className="bal-card__sym">₹</span>
            <span className="bal-card__big">{MUDRA_BALANCE.toLocaleString('en-IN')}</span>
            <span className="bal-card__sub">mudra</span>
          </div>
          <div className="bal-card__apply">
            <span>Applies to up to {REDEMPTION_CAP_PCT}% of any booking · {reached} milestones met · 1 introduction holding</span>
          </div>
        </div>

        {/* Milestones · what's coming */}
        <div className="bal-section">
          <span className="bal-section__lbl">{COPY.balance.milestonesLbl}</span>
          <ul className="milestones">
            {MILESTONES.map(m => (
              <li key={m.id} className={`milestone ${m.reached ? 'on' : ''} ${m === nextMilestone ? 'next' : ''}`}>
                <span className="milestone__num">{m.nights}</span>
                <div>
                  <span className="milestone__name">{m.label}</span>
                  <span className="milestone__note">{m.note}</span>
                </div>
                <span className="milestone__amt">
                  {m.reached ? <em>received</em> : <>+₹{m.mudra.toLocaleString('en-IN')}</>}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Ledger */}
        <div className="bal-section">
          <span className="bal-section__lbl">{COPY.balance.earnedLbl}</span>
          <ul className="ledger">
            {MUDRA_LEDGER.map(t => (
              <li key={t.id} className={t.kind === 'apply' ? 'apply' : ''}>
                <div>
                  <span className="ledger__src">— {t.source}</span>
                  <span className="ledger__lbl">{t.label}</span>
                </div>
                <div className="ledger__r">
                  <span className="ledger__amt">{t.value > 0 ? '+' : ''}₹{Math.abs(t.value).toLocaleString('en-IN')}</span>
                  <span className="ledger__when">{t.when}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Rules */}
        <div className="bal-rules">
          <span className="bal-rules__lbl">{COPY.balance.rulesLbl}</span>
          <ul>
            {COPY.balance.rules.map((r, i) => (<li key={i}>{r}</li>))}
          </ul>
          <span className="bal-rules__lbl" style={{ marginTop: 20, display: 'block' }}>{COPY.balance.applyLbl}</span>
          <p className="bal-rules__apply">{COPY.balance.apply}</p>
        </div>
      </div>
      <TabStub active="mudra" />
    </div>
  );
}

window.NET_ReferralScreen   = ReferralScreen;
window.NET_MudraBalanceScreen = MudraBalanceScreen;

// ════════════════════════════════════════════════════════════════
// 07 · INVITATION RECEIVED (the recipient's view)
// ════════════════════════════════════════════════════════════════
function InvitationScreen() {
  const { COPY, MOOD } = window.EKAM_NET;
  return (
    <div className="net-screen net-screen--dark">
      <StatusBar dark />
      <div className="inv">
        {/* Poster card — top half of the screen, made to pull */}
        <div className="inv-poster">
          <div className="inv-poster__photo" style={{ background: MOOD.binsar }}>
            {/* Soft window glow — the cabin has someone in it */}
            <span className="inv-poster__glow" />
            {/* Devanagari postage stamp, dashed border */}
            <span className="inv-poster__stamp">
              <span className="inv-poster__stamp-dev">कुटीर</span>
              <span className="inv-poster__stamp-lbl">EKAM</span>
            </span>
            {/* Addressed-to line, like a postcard */}
            <span className="inv-poster__addr">
              <span className="inv-poster__addr-lbl">— Held for</span>
              <span className="inv-poster__addr-name">You.</span>
            </span>
            {/* Bottom strip — cabin name overlay */}
            <div className="inv-poster__caption">
              <span className="inv-poster__name">Binsar.</span>
              <span className="inv-poster__meta">Kumaon · 2,400 m · three nights</span>
            </div>
          </div>
        </div>

        <div className="inv__body">
          <span className="inv__eb">{COPY.invitation.eyebrow}</span>
          <h1 className="inv__title">{COPY.invitation.title}</h1>
          <p className="inv__sub">{COPY.invitation.sub}</p>

          <div className="inv__hand">
            <span>{COPY.invitation.handwritten}</span>
            <span className="inv__sig">— Aarav</span>
          </div>

          <div className="inv__actions">
            <a className="inv__primary" href="EKAM Mobile - Property & Booking.html">{COPY.invitation.cta}</a>
            <a className="inv__ghost" href="EKAM Mobile - Property & Booking.html">{COPY.invitation.secondary}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

window.NET_SavedScreen      = SavedScreen;
window.NET_ProfileScreen    = ProfileScreen;
window.NET_MudraHomeScreen  = MudraHomeScreen;
window.NET_MudraDetailScreen= MudraDetailScreen;
window.NET_JournalScreen    = JournalScreen;
window.NET_ReferralScreen   = ReferralScreen;
window.NET_InvitationScreen = InvitationScreen;
