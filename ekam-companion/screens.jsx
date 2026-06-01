/* global React */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Chapter VI · Companion phone screens
// ════════════════════════════════════════════════════════════════
const { useState } = React;

function StatusBar({ dark = false }) {
  const c = dark ? '#FAF7F0' : '#14201A';
  return (
    <div className={`comp-sb ${dark ? 'on-dark' : ''}`}>
      <span>9:42</span>
      <div className="comp-sb__ind">
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

function CompTabs({ active }) {
  const tabs = [
    { id: 'home',    name: 'Home',    href: 'EKAM Mobile - Companion.html#home' },
    { id: 'kitchen', name: 'Kitchen', href: 'EKAM Mobile - Companion.html#kitchen' },
    { id: 'trails',  name: 'Trails',  href: 'EKAM Mobile - Companion.html#trails' },
    { id: 'reach',   name: 'Reach',   href: 'EKAM Mobile - Companion.html#reach' },
  ];
  return (
    <nav className="comp-tabbar">
      {tabs.map(t => (
        <a key={t.id} href={t.href} className={`comp-tabbar__tab ${active === t.id ? 'on' : ''}`}>
          <span>{t.name}</span>
        </a>
      ))}
    </nav>
  );
}

// Ambient ridge SVG — the only motion in the app, very slow
function AmbientRidge() {
  return (
    <svg className="comp-ridge" viewBox="0 0 380 220" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ridgeSky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0c1410" />
          <stop offset="55%" stopColor="#1F3525" />
          <stop offset="100%" stopColor="#3a4d3a" />
        </linearGradient>
      </defs>
      <rect width="380" height="220" fill="url(#ridgeSky)" />
      {/* Distant ridges */}
      <path d="M0 140 Q 60 110, 120 130 T 240 120 T 380 130 L 380 220 L 0 220 Z" fill="#1a2e22" opacity="0.6" />
      <path d="M0 165 Q 80 145, 160 160 T 320 155 L 380 162 L 380 220 L 0 220 Z" fill="#243c2c" opacity="0.8" />
      <path d="M0 188 Q 60 178, 130 188 T 260 186 T 380 192 L 380 220 L 0 220 Z" fill="#2b4630" />
      {/* Window glow — like the cabin window */}
      <circle cx="290" cy="178" r="2.5" fill="#d68763" opacity="0.85">
        <animate attributeName="opacity" values="0.6;0.95;0.6" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx="290" cy="178" r="12" fill="#d68763" opacity="0.15">
        <animate attributeName="opacity" values="0.08;0.22;0.08" dur="6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 01 · COMPANION HOME (immersive · time-aware · ambient)
// ════════════════════════════════════════════════════════════════
function CompanionHomeScreen() {
  const { STAY, COPY } = window.EKAM_COMP;
  return (
    <div className="comp-screen comp-screen--dark">
      <StatusBar dark />

      <div className="comp-ambient">
        <AmbientRidge />
        <span className="comp-ambient__eb">{COPY.home.eb}</span>
        <h1 className="comp-ambient__title">{COPY.home.title}</h1>
        <p className="comp-ambient__sub">{COPY.home.sub}</p>
      </div>

      <div className="comp-home-body">
        <div className="comp-card comp-card--feature">
          <span className="comp-card__lbl">{COPY.home.nextLbl}</span>
          <span className="comp-card__name">{COPY.home.nextName}</span>
          <span className="comp-card__when">{COPY.home.nextWhen}</span>
        </div>

        <div className="comp-trio">
          <div className="comp-trio__cell">
            <span className="comp-trio__big">{STAY.weather.high}<span>/{STAY.weather.low}</span></span>
            <span className="comp-trio__lbl">Today</span>
          </div>
          <span className="comp-trio__sep" />
          <div className="comp-trio__cell">
            <span className="comp-trio__big">{STAY.weather.sunrise}</span>
            <span className="comp-trio__lbl">Sunrise tomorrow</span>
          </div>
          <span className="comp-trio__sep" />
          <div className="comp-trio__cell">
            <span className="comp-trio__big">2</span>
            <span className="comp-trio__lbl">Nights remaining</span>
          </div>
        </div>

        <div className="comp-letter">
          <span className="comp-letter__eb">— A letter, this morning</span>
          <p>"{STAY.weather.note}"</p>
          <span className="comp-letter__from">From the cabin · 6:14 am</span>
        </div>

        <a className="comp-host-btn" href="EKAM Mobile - Companion.html#reach">
          <span className="comp-host-btn__avatar">{STAY.host.initial}</span>
          <div>
            <span className="comp-host-btn__name">{STAY.host.name}</span>
            <span className="comp-host-btn__hint">One tap · {STAY.host.hours}</span>
          </div>
          <span className="comp-host-btn__chev">→</span>
        </a>
      </div>

      <CompTabs active="home" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 02 · CABIN (practical info — gate code, water, pantry, wifi)
// ════════════════════════════════════════════════════════════════
function CabinScreen() {
  const { STAY, COPY } = window.EKAM_COMP;
  const [showWifi, setShowWifi] = useState(false);
  return (
    <div className="comp-screen">
      <StatusBar />
      <div className="comp-body">
        <header className="comp-hd">
          <span className="comp-hd__dev">{COPY.cabin.eb}</span>
          <h1 className="comp-hd__title">{COPY.cabin.title}</h1>
          <p className="comp-hd__sub">{COPY.cabin.sub}</p>
        </header>

        {/* Gate code — the most-used surface, big and obvious */}
        <div className="gate-card">
          <span className="gate-card__lbl">{COPY.cabin.gateLbl}</span>
          <span className="gate-card__code">{STAY.gateCode.split('').map((d,i) => <span key={i}>{d}</span>)}</span>
          <span className="gate-card__hint">Same for the cabin door and the lower gate.</span>
        </div>

        {/* Hot water windows */}
        <div className="row-block">
          <span className="row-block__lbl">{COPY.cabin.waterLbl}</span>
          <div className="row-block__pills">
            {STAY.hotWater.map(w => (<span key={w} className="hour-pill">{w}</span>))}
          </div>
          <span className="row-block__sub">Two windows daily · request otherwise on the day.</span>
        </div>

        {/* Pantry list */}
        <div className="row-block">
          <span className="row-block__lbl">{COPY.cabin.pantryLbl}</span>
          <ul className="pantry">
            {STAY.pantry.map(p => (<li key={p}>{p}</li>))}
          </ul>
          <span className="row-block__sub">Topped up daily. Take what you like.</span>
        </div>

        {/* Wi-Fi — hidden by default, by design */}
        <div className="row-block">
          <span className="row-block__lbl">{COPY.cabin.wifiLbl}</span>
          {!showWifi ? (
            <button className="reveal-btn" onClick={() => setShowWifi(true)}>{COPY.cabin.showWifi} →</button>
          ) : (
            <div className="wifi">
              <div><span>SSID</span><span>{STAY.wifi.ssid}</span></div>
              <div><span>Pass</span><span>{STAY.wifi.pass}</span></div>
            </div>
          )}
          <span className="row-block__sub">Only in the reading corner. By design.</span>
        </div>
      </div>
      <CompTabs active="home" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 03 · TODAY — removed. The schedule lived on its own tab; the
// brand decision is the cabin should not present a day-plan view.
// Source data (TODAY / TOMORROW arrays) stays in data.jsx for
// reference but is no longer rendered.
// ════════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════════
// 04 · TRAILS
// ════════════════════════════════════════════════════════════════
function TrailsScreen() {
  const { TRAILS, COPY } = window.EKAM_COMP;
  return (
    <div className="comp-screen">
      <StatusBar />
      <div className="comp-body">
        <header className="comp-hd">
          <span className="comp-hd__dev">{COPY.trails.eb}</span>
          <h1 className="comp-hd__title">{COPY.trails.title}</h1>
          <p className="comp-hd__sub">{COPY.trails.sub}</p>
        </header>

        <ul className="trails">
          {TRAILS.map(t => (
            <li className="trail" key={t.id}>
              <div className="trail__glyph">
                <svg viewBox="0 0 60 30" preserveAspectRatio="none">
                  <path d={t.glyph} fill="#F4EDE1" />
                  <path d={t.glyph} fill="none" stroke="#7A8A6B" strokeWidth="0.6" />
                  {/* Cabin pin */}
                  <circle cx="6" cy="29" r="1.2" fill="#B4613A" />
                  {/* Trail dotted path */}
                  <path
                    d={t.id === 'ridge' ? 'M6 28 Q 14 20, 22 16 T 38 12 T 54 14' :
                       t.id === 'oak'   ? 'M6 28 Q 14 24, 22 23 T 38 23 T 54 24' :
                                          'M6 28 L 14 24 L 22 14 L 34 18 L 46 22 L 56 20'}
                    fill="none" stroke="#B4613A" strokeWidth="0.5" strokeDasharray="1.2 1.4"
                  />
                </svg>
              </div>
              <div className="trail__body">
                <span className="trail__name">{t.name}</span>
                <div className="trail__meta">
                  <span>{t.distance}</span>
                  <span>·</span>
                  <span>{t.time}</span>
                  <span>·</span>
                  <span>{t.difficulty}</span>
                </div>
                <p className="trail__note">{t.note}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="trail-foot">
          The map is printed and left under your cup each morning. Offline-first by hand.
        </p>
      </div>
      <CompTabs active="trails" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 05 · RITUALS (tea · journal · ambient sound)
// ════════════════════════════════════════════════════════════════
function RitualsScreen() {
  const { RITUALS, COPY, STAY } = window.EKAM_COMP;
  const prompt = RITUALS.prompts[Math.min(STAY.dayOf - 1, RITUALS.prompts.length - 1)];
  const [playing, setPlaying] = useState(null);
  // Inline mini-player state — progress per audio id (0-100)
  const [progress, setProgress] = useState({});

  // Tick the playing track forward every second (no real audio file needed —
  // this is a fully-embedded player; the experience never leaves the cabin).
  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setProgress(p => {
        const next = (p[playing] || 0) + 100 / 60; // 60 ticks per minute → ~1% per second-ish for visual purposes
        if (next >= 100) { setPlaying(null); return { ...p, [playing]: 100 }; }
        return { ...p, [playing]: next };
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing]);

  const fmtTime = (pct, totalMin) => {
    const total = totalMin * 60;
    const elapsed = Math.floor((pct / 100) * total);
    const m = Math.floor(elapsed / 60);
    const s = String(elapsed % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="comp-screen">
      <StatusBar />
      <div className="comp-body">
        <header className="comp-hd">
          <span className="comp-hd__dev">{COPY.rituals.eb}</span>
          <h1 className="comp-hd__title">{COPY.rituals.title}</h1>
          <p className="comp-hd__sub">{COPY.rituals.sub}</p>
        </header>

        {/* Tea — the morning ritual */}
        <section className="ritual">
          <span className="ritual__eb">— The tea, this morning</span>
          <ul className="teas">
            {RITUALS.teas.map(t => (
              <li key={t.id}>
                <span className="teas__name">{t.name}</span>
                <span className="teas__sub">{t.sub}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Journal prompt */}
        <section className="ritual">
          <span className="ritual__eb">— A line, this evening</span>
          <div className="prompt">
            <span className="prompt__lbl">{prompt.label}</span>
            <p className="prompt__body">"{prompt.body}"</p>
            <span className="prompt__sig">A pencil sits in the pen rest beside the bed.</span>
          </div>
        </section>

        {/* Audio · twenty minutes */}
        <section className="ritual">
          <span className="ritual__eb">— Twenty minutes of forest</span>
          <ul className="audio">
            {RITUALS.audio.map(a => {
              const totalMin = parseInt(a.len, 10) || 10;
              const pct = progress[a.id] || 0;
              const isPlaying = playing === a.id;
              return (
                <li key={a.id} className={isPlaying ? 'playing' : ''}>
                  <button onClick={() => setPlaying(isPlaying ? null : a.id)}>
                    <span className="audio__play">
                      {isPlaying ? (
                        <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                      )}
                    </span>
                    <div>
                      <span className="audio__name">{a.name}</span>
                      <span className="audio__desc">{a.desc}</span>
                    </div>
                    <span className="audio__len">{a.len}</span>
                  </button>
                  {isPlaying && (
                    <div className="audio__player" aria-label="Mini player">
                      <div className="audio__bar">
                        <span className="audio__bar-fill" style={{ width: `${pct}%` }}></span>
                        <span className="audio__bar-head" style={{ left: `${pct}%` }}></span>
                      </div>
                      <div className="audio__meta">
                        <span className="audio__t">{fmtTime(pct, totalMin)}</span>
                        <span className="audio__pill"><span className="audio__pulse"></span>Playing in cabin</span>
                        <span className="audio__t">−{fmtTime(100 - pct, totalMin)}</span>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
      <CompTabs active="rituals" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 06 · NOTES (the quiet letter feed — replaces notifications)
// ════════════════════════════════════════════════════════════════
function NotesScreen() {
  const { NOTES, COPY } = window.EKAM_COMP;
  return (
    <div className="comp-screen">
      <StatusBar />
      <div className="comp-body">
        <header className="comp-hd">
          <span className="comp-hd__dev">{COPY.notes.eb}</span>
          <h1 className="comp-hd__title">{COPY.notes.title}</h1>
          <p className="comp-hd__sub">{COPY.notes.sub}</p>
        </header>

        <ul className="notes">
          {NOTES.map(n => (
            <li key={n.id} className="note">
              <span className="note__from">{n.from}</span>
              <p className="note__body">"{n.body}"</p>
              <span className="note__when">{n.when}</span>
            </li>
          ))}
        </ul>

        <p className="notes-foot">
          You will never get a push notification during your stay. Letters live here, in the order they arrived.
        </p>
      </div>
      <CompTabs active="home" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 07 · REACH (host + practical contacts)
// ════════════════════════════════════════════════════════════════
function ReachScreen() {
  const { REACH, COPY, STAY } = window.EKAM_COMP;
  return (
    <div className="comp-screen">
      <StatusBar />
      <div className="comp-body">
        <header className="comp-hd">
          <span className="comp-hd__dev">{COPY.reach.eb}</span>
          <h1 className="comp-hd__title">{COPY.reach.title}</h1>
          <p className="comp-hd__sub">{COPY.reach.sub}</p>
        </header>

        <ul className="reach">
          {REACH.map((r, i) => (
            <li key={r.kind} className={`reach__row ${r.kind === 'host' ? 'reach__row--host' : ''}`}>
              <div>
                <span className="reach__lbl">{r.role}</span>
                <span className="reach__name">{r.name}</span>
                <span className="reach__detail">{r.detail}</span>
              </div>
              <div className="reach__actions">
                <button aria-label="Call">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13 1.05.37 2.07.7 3.06a2 2 0 01-.45 2.11L8.09 10.91a16 16 0 006 6l2.02-1.27a2 2 0 012.11-.45c.99.33 2.01.57 3.06.7A2 2 0 0122 16.92z" /></svg>
                </button>
                {r.kind === 'host' && (
                  <button aria-label="Message">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 11.5a8.4 8.4 0 01-9 8.4 8.5 8.5 0 01-3.6-.8L3 21l1.9-5.4A8.4 8.4 0 0112 3a8.4 8.4 0 019 8.5z" /></svg>
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="reach-foot">
          <span className="reach-foot__eb">— No tickets, no queues</span>
          <p>
            Aarav is on site. The cabin team is in the next building. The nearest clinic is a 45-minute drive — Aarav will drive you, any hour.
          </p>
        </div>
      </div>
      <CompTabs active="reach" />
    </div>
  );
}

window.COMP_HomeScreen   = CompanionHomeScreen;
window.COMP_CabinScreen  = CabinScreen;
window.COMP_TrailsScreen = TrailsScreen;
window.COMP_RitualsScreen= RitualsScreen;
window.COMP_NotesScreen  = NotesScreen;
window.COMP_ReachScreen  = ReachScreen;

// ════════════════════════════════════════════════════════════════
// 08 · KITCHEN (in-house ordering · chai · tiffin · à la carte)
// Chai sits at the top. Complimentary is the first surface so the
// guest knows what they already have. Tiffin is the headline meal.
// ════════════════════════════════════════════════════════════════
function KitchenScreen() {
  const { KITCHEN } = window.EKAM_COMP;
  const [tray, setTray] = useState(new Map()); // id → { name, price, qty, group }
  const bodyRef = React.useRef(null);

  // Scroll-shrink: toggle .is-scrolled on the body once the user has moved past 12 px.
  React.useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const onScroll = () => {
      if (el.scrollTop > 12) el.classList.add('is-scrolled');
      else el.classList.remove('is-scrolled');
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  const [slot, setSlot] = useState(KITCHEN.tiffin.today.slots[1]);

  const add = (id, name, price, group) => {
    setTray(t => {
      const n = new Map(t);
      const existing = n.get(id);
      if (existing) n.set(id, { ...existing, qty: existing.qty + 1 });
      else n.set(id, { name, price, qty: 1, group });
      return n;
    });
  };
  const remove = (id) => {
    setTray(t => {
      const n = new Map(t);
      const existing = n.get(id);
      if (!existing) return n;
      if (existing.qty <= 1) n.delete(id);
      else n.set(id, { ...existing, qty: existing.qty - 1 });
      return n;
    });
  };

  // Order total (free items don't add to the count visually, just to the tray)
  const billable = Array.from(tray.values()).filter(i => !/On the house/i.test(i.price));
  const trayQty = Array.from(tray.values()).reduce((a, i) => a + i.qty, 0);
  const total = billable.reduce((sum, i) => {
    const num = parseInt(String(i.price).replace(/[^0-9]/g, ''), 10) || 0;
    return sum + num * i.qty;
  }, 0);

  return (
    <div className="comp-screen">
      <StatusBar />
      <div className="comp-body comp-body--kitchen" ref={bodyRef}>
        {/* Compact bar — chapter eyebrow only, replaces the giant EKAM चाय hero */}
        <header className="comp-hd comp-hd--compact">
          <span className="comp-hd__dev">E<span className="comp-hd__bindu"></span>KAM चाय · the cabin kitchen</span>
        </header>

        {/* On-the-house tile — personalised welcome + the gift list */}
        <details className="onhouse onhouse--celebrate">
          <summary className="onhouse__bar">
            <span className="onhouse__dot" aria-hidden="true"></span>
            <div className="onhouse__txt">
              <span className="onhouse__eb">— Hey Anika · on the house</span>
              <span className="onhouse__msg">{KITCHEN.complimentary.items.length} small things, already in your cabin</span>
            </div>
            <span className="onhouse__chev" aria-hidden="true">›</span>
          </summary>
          <div className="onhouse__body">
            <p className="onhouse__lede">{KITCHEN.complimentary.sub}</p>
            <ul className="onhouse__list">
              {KITCHEN.complimentary.items.map(c => (
                <li key={c.name}>
                  <span className="onhouse__name">{c.name}</span>
                  <span className="onhouse__sub">{c.sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </details>

        {/* EKAM Chai — the specialty, always at the top */}
        <section className="kit kit--chai">
          <div className="kit__head">
            <span className="kit__lbl">— {KITCHEN.chai.lbl}</span>
          </div>
          <p className="kit__sub">{KITCHEN.chai.sub}</p>
          <ul className="kit-list">
            {KITCHEN.chai.items.map(c => {
              const inTray = tray.get(c.id)?.qty || 0;
              return (
                <li key={c.id} className={`kit-row ${inTray ? 'on' : ''} ${c.free ? 'kit-row--gifted' : ''}`}>
                  <div>
                    <span className="kit-row__name">{c.name}</span>
                    <span className="kit-row__desc">{c.desc}</span>
                    {c.free
                      ? <span className="kit-row__tag">In your cabin</span>
                      : <span className="kit-row__price">{c.price}</span>}
                  </div>
                  {c.free ? null : (inTray > 0 ? (
                    <div className="kit-step">
                      <button onClick={() => remove(c.id)} aria-label="One less">−</button>
                      <span>{inTray}</span>
                      <button onClick={() => add(c.id, c.name, c.price, 'chai')} aria-label="One more">+</button>
                    </div>
                  ) : (
                    <button className="kit-add" onClick={() => add(c.id, c.name, c.price, 'chai')} aria-label="Add">Add</button>
                  ))}
                </li>
              );
            })}
          </ul>
        </section>

        {/* Today's tiffin — set menu */}
        <section className="kit kit--tiffin">
          <div className="kit__head">
            <span className="kit__lbl">— {KITCHEN.tiffin.lbl}</span>
          </div>
          <p className="kit__sub">{KITCHEN.tiffin.sub}</p>

          <div className="tiffin">
            <div className="tiffin__top">
              <span className="tiffin__eb">{KITCHEN.tiffin.today.eyebrow}</span>
              <h3 className="tiffin__name">{KITCHEN.tiffin.today.heading}.</h3>
              <span className="tiffin__price">{KITCHEN.tiffin.today.price}</span>
            </div>
            <ul className="tiffin__courses">
              {KITCHEN.tiffin.today.courses.map((c, i) => (
                <li key={c.name}>
                  <span className="tiffin__c-n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <span className="tiffin__c-name">{c.name}</span>
                    <span className="tiffin__c-sub">{c.sub}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="tiffin__slots">
              <span className="tiffin__slots-lbl">Carry up at</span>
              <div className="tiffin__slots-row">
                {KITCHEN.tiffin.today.slots.map(s => (
                  <button
                    key={s}
                    className={`tiffin__slot ${slot === s ? 'on' : ''}`}
                    onClick={() => setSlot(s)}
                  >{s}</button>
                ))}
              </div>
            </div>
            <button
              className="tiffin__cta"
              onClick={() => add('tiffin-today', `${KITCHEN.tiffin.today.heading} · ${slot}`, KITCHEN.tiffin.today.price, 'tiffin')}
            >Add to tray</button>
          </div>
        </section>

        {/* À la carte — short list */}
        <section className="kit kit--alacarte">
          <div className="kit__head">
            <span className="kit__lbl">— {KITCHEN.alacarte.lbl}</span>
          </div>
          <p className="kit__sub">{KITCHEN.alacarte.sub}</p>
          <ul className="kit-list">
            {KITCHEN.alacarte.items.map(c => {
              const inTray = tray.get(c.id)?.qty || 0;
              return (
                <li key={c.id} className={`kit-row ${inTray ? 'on' : ''}`}>
                  <div>
                    <span className="kit-row__name">{c.name}</span>
                    <span className="kit-row__desc">{c.desc}</span>
                    <span className="kit-row__price">{c.price}</span>
                  </div>
                  {inTray > 0 ? (
                    <div className="kit-step">
                      <button onClick={() => remove(c.id)} aria-label="One less">−</button>
                      <span>{inTray}</span>
                      <button onClick={() => add(c.id, c.name, c.price, 'alacarte')} aria-label="One more">+</button>
                    </div>
                  ) : (
                    <button className="kit-add" onClick={() => add(c.id, c.name, c.price, 'alacarte')}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <p className="kit-foot">
          We are a small kitchen. If something on the menu is not right for you, tell Aarav — we will cook the thing you actually want.
        </p>
      </div>

      {/* Sticky tray bar */}
      {/* Sticky tray bar — sleek · count only on the left, amount lives only in the CTA */}
      {trayQty > 0 && (
        <div className="tray">
          <span className="tray__count">{trayQty} item{trayQty === 1 ? '' : 's'}</span>
          <a className="tray__cta" href="EKAM Mobile - Companion.html#reach">
            {total > 0 ? `Pay now · ₹${total.toLocaleString('en-IN')}` : 'Send · on the house'}
          </a>
        </div>
      )}

      <CompTabs active="kitchen" />
    </div>
  );
}

window.COMP_KitchenScreen = KitchenScreen;
