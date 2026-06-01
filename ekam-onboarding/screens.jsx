/* global React */
// ═══════════════════════════════════════════════════════════════
// ONBOARDING SCREENS · 0 — 7
// State shape:
//   { intents: [], party: '', elevation: 2400, season: '', notify: null }
// ═══════════════════════════════════════════════════════════════

const MOOD_GRAD = {
  forest: 'linear-gradient(180deg, #14201A 0%, #2B4630 100%)',
  ridge:  'linear-gradient(180deg, #2a3845 0%, #6e7a82 50%, #b8a48c 100%)',
  warm:   'linear-gradient(180deg, #36443a 0%, #6b5e44 50%, #a59f86 100%)',
  spring: 'linear-gradient(180deg, #2B4630 0%, #4a5a44 60%, #C9D6BC 100%)',
  summer: 'linear-gradient(180deg, #1f3525 0%, #2B4630 60%, #6b7a5c 100%)',
  autumn: 'linear-gradient(180deg, #2a3845 0%, #6e7a82 35%, #d68763 75%, #b8a48c 100%)',
  winter: 'linear-gradient(180deg, #2a3845 0%, #6e7a82 50%, #ECE4D3 100%)',
  stillness: 'linear-gradient(180deg, #14201A 0%, #1F3525 50%, #2B4630 100%)',
  forest2: 'linear-gradient(180deg, #1a2620 0%, #2B4630 45%, #5a6655 95%)',
  altitude: 'linear-gradient(180deg, #2a3845 0%, #6e7a82 50%, #b8a48c 100%)',
};

const INTENTS = [
  { id: 'solitude',  dev: 'एकांत',  name: 'Solitude',          meta: 'Nobody else for a few days. Just the forest and what it does.' },
  { id: 'reset',     dev: 'विश्राम', name: 'A slow reset',       meta: 'You\'ve been running. You want the days to be longer.' },
  { id: 'work',      dev: 'कार्य',  name: 'Work that needs quiet', meta: 'Starlink. A desk that faces something useful. Electricity that holds.' },
  { id: 'forest',    dev: 'वन',     name: 'Wild forest',         meta: 'Canopy. Tracks. Light filtered to a green you have not seen.' },
  { id: 'sky',       dev: 'तारा',   name: 'The night sky',       meta: 'Above the inversion layer. Naked-eye constellations.' },
  { id: 'with',      dev: 'युगल',   name: 'Quiet with someone',  meta: 'Two cups by the stove. No itinerary. No phone.' },
];

const PARTIES = [
  { id: 'me',      dev: 'एक',    name: 'Just me',                 sub: 'A Kutir cabin. Two cups, but you only use one.' },
  { id: 'two',     dev: 'युगल',   name: 'Two of us',               sub: 'Kutir or Van. The fire warms both sides.' },
  { id: 'family',  dev: 'परिवार', name: 'Small humans, too',       sub: 'A Van cabin. We will set the kettle so you don\'t have to.' },
  { id: 'friends', dev: 'मित्र',  name: 'Three or four friends',  sub: 'Van or a paired Kutir. Late nights are allowed.' },
  { id: 'pet',     dev: 'पशु',    name: 'A dog comes too',         sub: 'Eleven of the fifteen cabins. A bowl is already there.' },
];

const SEASONS = [
  { id: 'spring', dev: 'वसंत',  name: 'Spring',     meta: 'Mar – May. The forest fills with sound. Rhododendron in bloom.', tone: 'spring' },
  { id: 'summer', dev: 'ग्रीष्म', name: 'Late summer',meta: 'Jun – Aug. The rivers are at their best. Light afternoon rain.', tone: 'summer' },
  { id: 'autumn', dev: 'शरद',   name: 'Autumn',     meta: 'Sep – Nov. The light gets editorial. Apple harvest in the orchards.', tone: 'autumn' },
  { id: 'winter', dev: 'हेम',   name: 'Winter',     meta: 'Dec – Feb. Snow at altitude. Long fires. Slow mornings.', tone: 'winter' },
];

const LETTERS = [
  { n: 'i.',  name: 'Booking confirmation', when: 'Within ten minutes — directions, what to pack, who your host will be.' },
  { n: 'ii.', name: 'Cabin notes',          when: 'Two weeks before — a PDF, hand-drawn map, mobile signal truths.' },
  { n: 'iii.',name: 'Day-before SMS',       when: 'The afternoon prior — weather, road state, the wood stove is laid.' },
  { n: 'iv.', name: 'Post-stay letter',     when: 'Two days after — what the host noticed, photographs if any.' },
  { n: 'v.',  name: 'A postcard',           when: 'Four weeks after — sent by post, one line, your handwriting on the envelope back.' },
];

// ─────────────────────────────────────────────────────────────
// Status bar + Progress dots — shared across every screen
// ─────────────────────────────────────────────────────────────
function StatusBar({ dark = false }) {
  const c = dark ? '#FAF7F0' : '#14201A';
  return (
    <div className={`sb ${dark ? 'on-dark' : 'on-light'}`}>
      <span>9:42</span>
      <div className="sb__ind">
        <svg width="16" height="10" viewBox="0 0 16 10">
          <circle cx="2" cy="8" r="1.4" fill={c} />
          <circle cx="6" cy="6" r="1.4" fill={c} />
          <circle cx="10" cy="4" r="1.4" fill={c} />
          <circle cx="14" cy="2" r="1.4" fill={c} />
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M1 9h2M4 7h2M7 5h2M10 3h2" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 11, fontWeight: 500 }}>84</span>
        <svg width="22" height="10" viewBox="0 0 22 10">
          <rect x="0.5" y="0.5" width="18" height="9" rx="1.5" fill="none" stroke={c} opacity="0.5" />
          <rect x="2" y="2" width="14" height="6" rx="0.5" fill={c} />
          <rect x="19" y="3.5" width="1.5" height="3" rx="0.4" fill={c} opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}

function TopBar({ step, total, onBack, onSkip, dark = false }) {
  return (
    <div className={`topbar ${dark ? 'on-dark' : ''}`}>
      <button className="back" onClick={onBack} aria-label="Back">
        {step > 0 ? '← Back' : ' '}
      </button>
      <div className="dots">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className={`dot ${i === step ? 'on' : ''}`} />
        ))}
      </div>
      <button className="skip" onClick={onSkip} aria-label="Skip">Skip</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 0 · SPLASH — cinematic brand reveal
// ─────────────────────────────────────────────────────────────
function Splash({ onContinue }) {
  return (
    <div className="splash">
      <div className="splash__hdr">
        <span>एकम्</span>
        <span>The Singular</span>
      </div>

      <div className="splash__mid">
        <div className="splash__dev">एकम्</div>
        <div className="splash__wm">
          E<span className="b" />KAM
        </div>
        <div className="splash__rule" />
        <p className="splash__tag">Hospitality, disguised as solitude.</p>
      </div>

      <div className="splash__foot" onClick={onContinue} style={{ cursor: 'pointer' }}>
        Touch to begin
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 1 · WELCOME LETTER — editorial first hello
// ─────────────────────────────────────────────────────────────
function Welcome() {
  return (
    <div className="ob-body">
      <span className="ob-dev">कुटीर · the first key</span>
      <h1 className="ob-h">You're early. So is the forest.</h1>
      <div className="ob-rule" />
      <div className="letter">
        <p>
          We don't ask much. A few quiet preferences — <em>where you like the air, who's coming with you, when the year speaks to you</em> — and we hand you a key to the cabin that fits.
        </p>
        <p>
          The mountains have not been waiting. But your cabin will be.
        </p>
        <div className="letter__sig">
          <span className="letter__sig-name">Tashi, &amp; the hosts</span>
          <span className="letter__sig-role">Your naturalist · Kalpa</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2 · TRAVEL INTENT — multi-select up to 3
// ─────────────────────────────────────────────────────────────
function Intent({ state, set }) {
  const toggle = (id) => {
    const s = new Set(state.intents);
    if (s.has(id)) { s.delete(id); }
    else if (s.size < 3) { s.add(id); }
    set({ ...state, intents: [...s] });
  };
  return (
    <div className="ob-body">
      <span className="ob-eyebrow">— Two of seven</span>
      <h2 className="ob-h">Why these mountains, this time?</h2>
      <p className="ob-sub">Pick up to three. We will not ask again.</p>

      <div className="intent-grid">
        {INTENTS.map((it) => {
          const on = state.intents.includes(it.id);
          return (
            <div
              key={it.id}
              className={`intent-card ${on ? 'on' : ''}`}
              onClick={() => toggle(it.id)}
            >
              <span className="intent-card__dev">{it.dev}</span>
              <span className="intent-card__name">{it.name}</span>
              <p className="intent-card__meta">{it.meta}</p>
            </div>
          );
        })}
      </div>
      <p className="help">{state.intents.length} / 3 chosen</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3 · PARTY — radio rows
// ─────────────────────────────────────────────────────────────
function Party({ state, set }) {
  return (
    <div className="ob-body">
      <span className="ob-eyebrow">— Three of seven</span>
      <h2 className="ob-h">Who comes with you?</h2>
      <p className="ob-sub">We'll set the cabin for the right number of mugs.</p>

      <div className="party-list">
        {PARTIES.map((p) => {
          const on = state.party === p.id;
          return (
            <div
              key={p.id}
              className={`party-row ${on ? 'on' : ''}`}
              onClick={() => set({ ...state, party: p.id })}
            >
              <div className="party-row__body">
                <span className="party-row__name">{p.name}</span>
                <span className="party-row__sub">{p.sub}</span>
              </div>
              <span className="party-row__bullet" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4 · ELEVATION — slider + cabin profile
// ─────────────────────────────────────────────────────────────
function Elevation({ state, set }) {
  const e = state.elevation;
  const tier =
    e < 2000 ? { name: 'KUTIR', dev: 'कुटीर', region: 'Foothills',     desc: 'Oak, deodar, terraced fields. The forest at a walking pace.' } :
    e < 2800 ? { name: 'KUTIR · VAN', dev: 'कुटीर · वन', region: 'Mid-mountains', desc: 'The canopy thickens. Mornings are colder than you think.' } :
    e < 3300 ? { name: 'SHIKHAR', dev: 'शिखर', region: 'High country',  desc: 'You start to feel the air. The light has a quality to it.' } :
               { name: 'SHIKHAR', dev: 'शिखर', region: 'Above the cloud', desc: 'You will walk slowly. The cabin is the only thing for kilometres.' };

  // Slider 1800 → 3700; pin position
  const pct = ((e - 1800) / (3700 - 1800)) * 100;
  // Y position follows a curve — the higher you go, the higher the pin sits
  const pinX = `${pct}%`;
  // Mountain profile drives the Y. Convert pct to a Y between 60 (low) and 14 (high)
  const pinY = `${60 - (pct / 100) * 46}%`;

  return (
    <div className="ob-body">
      <span className="ob-eyebrow">— Four of seven</span>
      <h2 className="ob-h">How thin would you like the air?</h2>
      <p className="ob-sub">Slide. The cabin tier changes underneath.</p>

      <div className="elev">
        <div className="elev__readout">
          <span className="elev__big">{e.toLocaleString('en-IN')}</span>
          <span className="elev__unit">m</span>
          <span className="elev__tier">{tier.dev} · {tier.region}</span>
        </div>

        {/* Mountain profile */}
        <div className="elev__profile">
          <svg viewBox="0 0 380 88" preserveAspectRatio="none">
            {/* Distant range */}
            <path d="M 0 70 L 60 50 L 110 60 L 180 36 L 240 52 L 300 30 L 360 46 L 380 38 L 380 88 L 0 88 Z" fill="#C9D6BC" opacity="0.5" />
            {/* Mid range */}
            <path d="M 0 80 L 40 60 L 90 70 L 160 48 L 220 62 L 290 44 L 360 60 L 380 56 L 380 88 L 0 88 Z" fill="#7A8A6B" opacity="0.6" />
            {/* Foreground */}
            <path d="M 0 88 L 30 76 L 80 82 L 130 70 L 200 78 L 260 66 L 330 80 L 380 72 L 380 88 Z" fill="#4F5C3F" />
          </svg>
          <span className="elev__pin" style={{ left: pinX, top: pinY }} />
        </div>

        <input
          type="range"
          min="1800" max="3700" step="100"
          value={e}
          onChange={(ev) => set({ ...state, elevation: +ev.target.value })}
          className="elev__slider"
        />
        <div className="elev__marks">
          <span>1,800</span><span>2,400</span><span>3,200</span><span>3,700 m</span>
        </div>
        <p className="elev__desc">{tier.desc}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 5 · SEASON — 2x2 mood cards
// ─────────────────────────────────────────────────────────────
function Season({ state, set }) {
  return (
    <div className="ob-body">
      <span className="ob-eyebrow">— Five of seven</span>
      <h2 className="ob-h">When does the year speak to you?</h2>
      <p className="ob-sub">A season, not a date. We'll narrow when you're ready.</p>

      <div className="season-grid">
        {SEASONS.map((s) => (
          <div
            key={s.id}
            className={`season-card ${state.season === s.id ? 'on' : ''}`}
            onClick={() => set({ ...state, season: s.id })}
          >
            <div className="season-card__mood" style={{ background: MOOD_GRAD[s.tone] }} />
            <div className="season-card__body">
              <span className="season-card__dev">{s.dev}</span>
              <div className="season-card__name">{s.name}</div>
              <p className="season-card__meta">{s.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 6 · NOTIFY — the five-letter rule
// ─────────────────────────────────────────────────────────────
function Notify({ state, set }) {
  return (
    <div className="ob-body">
      <span className="ob-eyebrow">— Six of seven</span>
      <h2 className="ob-h">Five letters per stay. No more.</h2>
      <p className="ob-sub">A house rule. We have written it down so you can hold us to it.</p>

      <div className="notify">
        {LETTERS.map((l) => (
          <div className="notify-row" key={l.n}>
            <span className="notify-row__num">{l.n}</span>
            <div>
              <div className="notify-row__name">{l.name}</div>
              <div className="notify-row__when">{l.when}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="notify-promise">
        <span className="notify-promise__dev">मौन</span>
        <p className="notify-promise__body">
          No marketing emails. No flash sale. No app-store push for a streak. We will not be the reason your phone lights up at dinner.
        </p>
      </div>

      <div className="intent-grid" style={{ marginTop: 6 }}>
        <div
          className={`intent-card ${state.notify === 'on' ? 'on' : ''}`}
          onClick={() => set({ ...state, notify: 'on' })}
          style={{ minHeight: 84 }}
        >
          <span className="intent-card__dev">हाँ</span>
          <span className="intent-card__name" style={{ fontSize: 17 }}>Send the five</span>
        </div>
        <div
          className={`intent-card ${state.notify === 'off' ? 'on' : ''}`}
          onClick={() => set({ ...state, notify: 'off' })}
          style={{ minHeight: 84 }}
        >
          <span className="intent-card__dev">नहीं</span>
          <span className="intent-card__name" style={{ fontSize: 17 }}>Email only</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 7 · DONE — handover with personalized summary inline
// ─────────────────────────────────────────────────────────────
function deriveCollections(state) {
  // Three collections, ordered by match to selections.
  const all = [
    { id: 'stillness', tone: 'stillness', eb: 'For the stillness',  name: 'Retreats made for stopping',   meta: 'Low canopy, dense forest, days that ask nothing.',     count: 4, match: state.intents.includes('solitude') + state.intents.includes('reset') },
    { id: 'ridge',     tone: 'altitude', eb: 'Above the cloud',     name: 'Ridgeline & high country',     meta: 'Above 3,000 m. Thinner air, bigger sky.',              count: 4, match: (state.elevation > 2800) + state.intents.includes('sky') },
    { id: 'work',      tone: 'warm',     eb: 'For the work',        name: 'Work from the mountains',      meta: 'Starlink, a desk, electricity that holds.',             count: 4, match: state.intents.includes('work') * 2 },
    { id: 'forest',    tone: 'forest2',  eb: 'Inside the trees',    name: 'Forest immersion',             meta: 'The Van tier. Cabins woven into canopy.',              count: 4, match: state.intents.includes('forest') * 2 },
    { id: 'pair',      tone: 'autumn',   eb: 'For the two of you',  name: 'Cabins for two cups',          meta: 'Kutir tier. The fire warms both sides.',                count: 3, match: (state.party === 'two') * 2 + state.intents.includes('with') },
  ];
  return all.sort((a, b) => b.match - a.match).slice(0, 3);
}

function Done({ state, onEnter }) {
  const cols = deriveCollections(state);
  return (
    <div className="done">
      <div className="done__top">
        <span className="done__quote-dev">एकम्</span>
        <div className="done__hand">For Anika.</div>
        <h2 className="done__title">Your retreat companion is ready.</h2>
        <div className="done__rule" />
        <p className="done__sub">
          Three collections, chosen for what you told us. The rest of the network is one tap away.
        </p>
      </div>

      <div style={{ width: '100%', marginTop: 24, padding: '0 8px' }}>
        {cols.map((c) => (
          <div className="col-strip" key={c.id} style={{ borderBottomColor: 'rgba(236,228,211,0.18)' }}>
            <div className="col-strip__mood" style={{ background: MOOD_GRAD[c.tone] }} />
            <div className="col-strip__body">
              <span className="col-strip__eb">{c.eb}</span>
              <span className="col-strip__name" style={{ color: 'var(--cream)' }}>{c.name}</span>
              <p className="col-strip__meta" style={{ color: 'var(--sage)' }}>{c.meta}</p>
              <span className="col-strip__count" style={{ color: 'var(--moss-on-forest)' }}>{c.count} cabins</span>
            </div>
          </div>
        ))}
      </div>

      <div className="done__foot">
        <button className="cta" onClick={onEnter}>
          <span className="dot" />
          Find your Ekam
        </button>
      </div>
    </div>
  );
}

Object.assign(window, {
  StatusBar, TopBar,
  Splash, Welcome, Intent, Party, Elevation, Season, Notify, Done,
  deriveCollections, MOOD_GRAD,
});
