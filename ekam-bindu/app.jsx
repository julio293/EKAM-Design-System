/* global React, ReactDOM */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — The Bindu · interaction object prototype
// State machine: rest → press → search → voice(listening→processing) → results
// Three contexts: Home · Booking · In-stay. Brand-true defaults.
// ════════════════════════════════════════════════════════════════
const { useState, useEffect, useRef } = React;

// ─── Context definitions ─────────────────────────────────────
const CONTEXTS = {
  home: {
    pos: 'pos-br',
    placeholder: 'Find a forest stay',
    rotating: ['Find a forest stay', 'Show saved cabins', 'Find a cabin in Kinnaur', 'Open a quiet week in June'],
    suggestLabel: 'Try',
    suggest: ['Forest stays', 'Under 6 hours from Delhi', 'Open in June', 'Saved cabins'],
    recent: [
      { ic: '↗', t: 'Kalpa · Shikhar', sub: 'viewed' },
      { ic: '♡', t: 'Baspa', sub: 'saved' },
    ],
    actionsLabel: 'Saved searches',
    actions: [
      { ic: '⌕', t: 'Pre-monsoon · mid-elevation' },
      { ic: '⌕', t: 'Two of us · a slow reset' },
    ],
  },
  booking: {
    pos: 'pos-lift',
    placeholder: 'Ask about this cabin',
    rotating: ['Ask about this cabin', 'Is the kitchen full?', 'How far is the drive?', 'When is the road open?'],
    suggestLabel: 'About Kalpa',
    suggest: ['The drive in', 'What the kitchen has', 'Cancellation', 'Talk to the host'],
    recent: [
      { ic: '↗', t: 'Kalpa · the cabin', sub: 'open' },
    ],
    actionsLabel: 'On this page',
    actions: [
      { ic: '◷', t: 'Hold these dates' },
      { ic: '✎', t: 'A question for Aarav' },
    ],
  },
  instay: {
    pos: 'pos-br',
    placeholder: 'Tea by the fire',
    rotating: ['Tea by the fire', 'Extend my stay', 'The trail to the spring', 'Ask the host'],
    suggestLabel: 'In the cabin',
    suggest: ['Tea by the fire', 'Light the stove', 'Extend my stay', 'The trail'],
    recent: [
      { ic: '☕', t: 'A pot of estate black', sub: 'this morning' },
    ],
    actionsLabel: 'Your stay · Kalpa, night 2',
    actions: [
      { ic: '♨', t: 'Ask for the kettle' },
      { ic: '☾', t: 'A late checkout tomorrow' },
    ],
  },
};

// ─── Faux screen behind the bindu ────────────────────────────
function FauxScreen({ ctx, blurred }) {
  const dark = ctx === 'instay';
  return (
    <div className={`fx ${blurred ? 'fx--blur' : ''} ${dark ? 'fx--dark' : ''}`}>
      <div className={`fx__sb ${dark ? 'on-dark' : ''}`}>
        <span>9:42</span><span style={{ fontSize: 11 }}>84 ▮</span>
      </div>
      {ctx === 'home' && (
        <div className="fx__body">
          <div>
            <span className="fx__eyebrow">— Late May · good morning, Anika</span>
            <h2 className="fx__h">Where the rivers are filling.</h2>
          </div>
          <div className="fx__hero" style={{ background: 'linear-gradient(176deg,#1f3525 0%,#2B4630 58%,#5a6655 100%)' }}>
            <span className="fx__hero-scrim" />
            <span className="fx__hero-cap"><span className="fx__hero-name">Baspa.</span><span className="fx__hero-meta">Sangla · the loud river</span></span>
          </div>
          <div className="fx__row"><span className="fx__row-lbl">A retreat ahead</span><span className="fx__row-val">Kalpa · 6 June</span></div>
          <div className="fx__row"><span className="fx__row-lbl">Saved</span><span className="fx__row-val">Three cabins, held quietly</span></div>
        </div>
      )}
      {ctx === 'booking' && (
        <div className="fx__body">
          <div className="fx__hero" style={{ background: 'linear-gradient(176deg,#2a3845 0%,#6e7a82 48%,#b8a48c 100%)', height: 240, marginLeft: -24, marginRight: -24 }}>
            <span className="fx__hero-scrim" />
            <span className="fx__hero-cap"><span className="fx__hero-name">Kalpa.</span><span className="fx__hero-meta">Kinnaur · 2,960 m · Shikhar</span></span>
          </div>
          <div className="fx__row"><span className="fx__row-lbl">Your nights</span><span className="fx__row-val">6 — 10 June · 4 nights</span></div>
          <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 14, color: 'var(--moss)', lineHeight: 1.5 }}>The apple orchard, a wood stove, the Kinner Kailash facing wall.</p>
          <div className="fx__cta">Reserve · ₹—</div>
        </div>
      )}
      {ctx === 'instay' && (
        <div className="fx__body">
          <div>
            <span className="fx__eyebrow" style={{ color: 'var(--bindu)' }}>— Kalpa · night two</span>
            <h2 className="fx__h">The fire is laid.</h2>
          </div>
          <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 15, color: 'var(--sage,#C7CDBA)', lineHeight: 1.6 }}>The kettle warms before sunrise. The trail to the spring leaves from the orchard gate — twenty minutes, mostly down.</p>
          <div className="fx__row"><span className="fx__row-lbl" style={{ color: 'var(--bindu)' }}>This evening</span><span className="fx__row-val">2,400–2,700K · the stove</span></div>
        </div>
      )}
      <div className="fx__tabbar">
        {['Home', 'Discover', 'Saved', 'Stays', 'You'].map((t, i) => (
          <span key={t} className={`fx__tab ${i === (ctx === 'instay' ? 3 : 0) ? 'on' : ''}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ─── The search / voice panel ────────────────────────────────
function Panel({ ctx, mode, onVoice, onStopVoice, onClose, luminous }) {
  const c = CONTEXTS[ctx];
  const [ph, setPh] = useState(0);
  useEffect(() => {
    if (mode !== 'search') return;
    const id = setInterval(() => setPh(p => (p + 1) % c.rotating.length), 2800);
    return () => clearInterval(id);
  }, [mode, ctx]);

  return (
    <div className="panel">
      {mode === 'search' && (
        <>
          <div className="panel__field">
            <span className="panel__dot" />
            <input className="panel__input" placeholder={c.rotating[ph]} aria-label="Search EKAM" />
            <button className="panel__voice" onClick={onVoice} aria-label="Speak to the Bindu">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v3" /></svg>
            </button>
          </div>
          <div className="panel__scroll">
            <div className="panel__sec">
              <span className="panel__sec-lbl">{c.suggestLabel}</span>
              <div className="panel__chips">
                {c.suggest.map((s, i) => <button key={i} className="panel__chip">{s}</button>)}
              </div>
            </div>
            <div className="panel__sec">
              <span className="panel__sec-lbl">{c.actionsLabel}</span>
              {c.actions.map((a, i) => (
                <button key={i} className="panel__item"><span className="panel__item-ic">{a.ic}</span>{a.t}</button>
              ))}
            </div>
            <div className="panel__sec">
              <span className="panel__sec-lbl">Recent</span>
              {c.recent.map((r, i) => (
                <button key={i} className="panel__item"><span className="panel__item-ic">{r.ic}</span>{r.t}<span className="panel__item-sub">{r.sub}</span></button>
              ))}
            </div>
          </div>
        </>
      )}

      {(mode === 'listening' || mode === 'processing') && (
        <div className="panel__voicestage">
          <div className={`voice-orb ${luminous ? 'is-lum' : ''}`}>
            {mode === 'listening' && <><span className="voice-orb__ring" /><span className="voice-orb__ring r2" /></>}
            <span className="voice-orb__core" />
          </div>
          {mode === 'listening' ? (
            <>
              <span className="voice-line">Listening.</span>
              <p className="voice-sub">Speak when you're ready — "tea by the fire," "open my stay," "find a forest cabin."</p>
              <button className="voice-stop" onClick={onStopVoice}>Stop</button>
            </>
          ) : (
            <>
              <span className="voice-dots"><span /><span /><span /></span>
              <span className="voice-line">A moment.</span>
              <p className="voice-sub">Finding what you asked for.</p>
            </>
          )}
        </div>
      )}

      {mode === 'results' && (
        <>
          <div className="panel__field">
            <span className="panel__dot" />
            <span className="panel__input" style={{ color: 'var(--ink)' }}>{ctx === 'instay' ? 'Tea by the fire' : ctx === 'booking' ? 'The drive in' : 'Forest stays'}</span>
          </div>
          <div className="panel__scroll">
            <div className="panel__sec">
              <span className="panel__sec-lbl">What I found</span>
              {(ctx === 'instay'
                ? [{ ic: '♨', t: 'Ask the host for a pot', sub: 'now' }, { ic: '☕', t: 'The kettle is yours', sub: 'in the cabin' }, { ic: '✎', t: 'Leave a note for Aarav', sub: '' }]
                : ctx === 'booking'
                ? [{ ic: '⛰', t: '8 hr from Shimla', sub: 'NH5' }, { ic: '◷', t: 'Leave before noon', sub: 'the light' }, { ic: '✎', t: 'Ask Aarav about the road', sub: '' }]
                : [{ ic: '⌂', t: 'Baspa · Sangla', sub: 'Van' }, { ic: '⌂', t: 'Tirthan · GHNP', sub: 'Van' }, { ic: '⌂', t: 'Jhebi · Tirthan', sub: 'Kutir' }]
              ).map((r, i) => (
                <button key={i} className="panel__item"><span className="panel__item-ic">{r.ic}</span>{r.t}<span className="panel__item-sub">{r.sub}</span></button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Side notes per state ────────────────────────────────────
const NOTES = {
  rest: {
    step: 'The Bindu · at rest',
    h: 'A ceramic stone, set down on the surface.',
    sub: 'Still. No glow, no breath. Its presence is material — a matte clay disc with a soft contact shadow, magnetically held in thumb reach above the tab bar.',
    why: [
      ['Does not animate', 'The BOS is explicit — the Bindu never animates for attention. At rest it is simply there, like a meditation object.'],
      ['Material, not light', 'A subtle ceramic curvature and an impressed centre point — no neon, no glassmorphism, no glow.'],
      ['Thumb-anchored', 'Sits 96px above the base, bottom-right, clear of the tab bar. It moves only to stay reachable, never to perform.'],
      ['One contact shadow', 'It floats, so it casts a small soft shadow — the only elevation it earns, like the phone or the journal.'],
    ],
  },
  press: {
    step: 'The Bindu · touch',
    h: 'It takes the weight of your finger.',
    sub: 'On press it dims and settles inward — a weighted, ceramic response. No ripple, no flash. The acknowledgement is physical.',
    why: [
      ['Press = settle', 'Scale 0.94 with a deeper inner shade. The object compresses, as clay would. Releases instantly.'],
      ['No ripple', 'No expanding water rings, no glow burst. Apple-grade restraint: the material responds, the screen does not perform.'],
    ],
  },
  search: {
    step: 'The Bindu · search',
    h: 'The search layer emerges from the Bindu itself.',
    sub: 'A liquid expansion, anchored at the Bindu\'s corner — the panel grows from where the dot sat, and the clay becomes the field\'s leading mark.',
    why: [
      ['Continuity', 'The panel\'s transform-origin is the Bindu\'s resting point. It grows out of the object, not over it.'],
      ['Editorial field', 'One large serif input, a rotating placeholder of real intents, a clay dot where the Bindu now lives. No OTA search bar.'],
      ['Contextual', 'Suggestions, page actions, and recents are drawn from where you are — Home, a cabin page, or mid-stay.'],
      ['Voice within reach', 'The mic sits in the field. Speaking is one tap from typing — never a separate assistant.'],
    ],
  },
  listening: {
    step: 'The Bindu · voice',
    h: 'It listens, quietly.',
    sub: 'The interface stills. A single calm ring ripples from the clay — material, not a waveform. No Siri bloom, no hologram.',
    why: [
      ['A ring, not a glow', 'One slow concentric ripple marks that it\'s listening. The clay does not light up by default.'],
      ['The room quiets', 'Everything else recedes behind the scrim. Attention narrows to the voice and the object.'],
      ['Human prompts', '"Tea by the fire." "Open my stay." The examples are hospitality, not commands to a machine.'],
      ['Intimate', 'Voice is close and ambient — no personality, no mascot, no assistant identity.'],
    ],
  },
  processing: {
    step: 'The Bindu · a moment',
    h: 'It gathers what you asked for.',
    sub: 'A brief, quiet pause — three clay dots breathing once. No spinner, no progress bar, no "thinking" theatre.',
    why: [
      ['No spinner', 'EKAM never shows a rotating loader. A calm dot cadence marks the wait, then it resolves.'],
      ['Honest brevity', 'The pause is short and unhurried. The technology does not announce its effort.'],
    ],
  },
  results: {
    step: 'The Bindu · results',
    h: 'Answers, as quiet rows.',
    sub: 'The panel settles into a short list — cabins, actions, or a route. One line each, a clay mark, nothing more.',
    why: [
      ['Rows, not cards', 'Results are calm list rows, not an ecommerce grid. One purpose per line.'],
      ['Context-true', 'Mid-stay, results are services. On a cabin page, they\'re facts and the host. At home, they\'re cabins.'],
      ['Dismiss anywhere', 'Tap the dimmed screen and the panel contracts back into the Bindu, which returns to its corner.'],
    ],
  },
};

// ─── The app ─────────────────────────────────────────────────
function App() {
  const [ctx, setCtx] = useState('home');
  const [mode, setMode] = useState('rest'); // rest | press | search | listening | processing | results
  const [breathe, setBreathe] = useState(true);
  const [luminous, setLuminous] = useState(true);
  const timers = useRef([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clearTimers(), []);

  const open = mode !== 'rest' && mode !== 'press';
  const c = CONTEXTS[ctx];
  const minimized = false;

  const activate = () => {
    setMode('press');
    timers.current.push(setTimeout(() => setMode('search'), 180));
  };
  const startVoice = () => {
    setMode('listening');
    clearTimers();
    timers.current.push(setTimeout(() => setMode('processing'), 3200));
    timers.current.push(setTimeout(() => setMode('results'), 4600));
  };
  const stopVoice = () => { clearTimers(); setMode('search'); };
  const close = () => { clearTimers(); setMode('rest'); };
  const switchCtx = (k) => { clearTimers(); setMode('rest'); setCtx(k); };

  const note = NOTES[mode] || NOTES.rest;
  const binduPos = c.pos;
  const binduCls = [
    'bindu-obj', binduPos,
    breathe && mode === 'rest' ? 'breathe' : '',
    open ? 'is-hidden' : '',
    mode === 'press' ? 'is-press' : '',
    ctx === 'instay' ? 'is-min' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="bd-page">
      <header className="bd-head">
        <span className="bd-eyebrow">— EKAM Living · Mobile · the interaction nucleus</span>
        <div className="bd-brand">
          <span className="bd-brand__dev">एकम्</span>
          <span className="bd-brand__wm">E<span className="dot"></span>KAM</span>
        </div>
        <h1 className="bd-title">The Bindu.</h1>
        <p className="bd-lede">
          One clay object — search, voice, and the retreat companion in a single point of presence.
          At rest it is a still ceramic stone; touched, it becomes the calm interaction layer of the whole app.
          Tap it in the phone, or step through the states on the left.
        </p>
      </header>

      <div className="bd-stage">
        {/* Controls */}
        <div className="bd-controls">
          <div className="bd-controls__group">
            <span className="bd-controls__lbl">Context</span>
            {[['home', 'Home', 'घर'], ['booking', 'Booking', 'आरक्षण'], ['instay', 'In-stay', 'वास']].map(([k, label, dev]) => (
              <button key={k} className={`bd-ctl ${ctx === k ? 'on' : ''}`} onClick={() => switchCtx(k)}>
                <span className="bd-ctl__dev">{dev}</span>{label}
              </button>
            ))}
          </div>
          <div className="bd-controls__group">
            <span className="bd-controls__lbl">State</span>
            {[['rest', 'At rest'], ['search', 'Search'], ['listening', 'Voice · listening'], ['processing', 'Processing'], ['results', 'Results']].map(([k, label]) => (
              <button key={k} className={`bd-ctl ${mode === k ? 'on' : ''}`} onClick={() => {
                clearTimers();
                if (k === 'rest') close();
                else setMode(k);
              }}>{label}</button>
            ))}
          </div>
          <div className="bd-controls__group">
            <span className="bd-controls__lbl">Ambient · approved</span>
            <button className={`bd-toggle ${breathe ? 'on' : ''}`} onClick={() => setBreathe(b => !b)}>
              <span>Ambient breath</span><span className="bd-toggle__sw" />
            </button>
            <span className="bd-toggle__note">A microscopic 5.5s breath. On by founder approval.</span>
            <button className={`bd-toggle ${luminous ? 'on' : ''}`} onClick={() => setLuminous(l => !l)}>
              <span>Voice glow</span><span className="bd-toggle__sw" />
            </button>
            <span className="bd-toggle__note">A soft clay warmth while listening. On by approval.</span>
          </div>
        </div>

        {/* Phone */}
        <div className="bd-phone-wrap">
          <div className="bd-phone">
            <div className="bd-screen">
              <FauxScreen ctx={ctx} blurred={open} />
              {open && <div className="bd-scrim" onClick={close} />}
              <button className={binduCls} onClick={activate} aria-label="Open the Bindu" />
              {open && <Panel ctx={ctx} mode={mode} luminous={luminous} onVoice={startVoice} onStopVoice={stopVoice} onClose={close} />}
            </div>
          </div>
          <span className="bd-cap">iPhone 15 · 380 × 800 dp · tap the clay dot · live states</span>
        </div>

        {/* Notes */}
        <aside className="bd-notes">
          <div className="bd-notes__step">{note.step}</div>
          <h2 className="bd-notes__h">{note.h}</h2>
          <p className="bd-notes__sub">{note.sub}</p>
          <div className="bd-notes__head">— How it's built</div>
          <div className="bd-notes__list">
            {note.why.map((w, i) => (
              <div key={i}><span className="l">{w[0]}</span><span className="v">{w[1]}</span></div>
            ))}
          </div>
          <div className="bd-notes__head">— Motion &amp; material tokens</div>
          <div className="bd-tokens">
            {[
              ['--b-quick · press', '200ms'],
              ['--b-soft · field', '380ms'],
              ['--b-arrive · expand', '560ms'],
              ['ease', 'cubic-bezier(.16,1,.3,1)'],
              ['size · rest', '58px'],
              ['clay', '#B4613A'],
              ['ambient motion', 'none'],
              ['glow', 'none'],
            ].map((t, i) => (
              <div key={i} className="bd-tokens__row"><span>{t[0]}</span><span>{t[1]}</span></div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
