/* global React, ReactDOM */
// ═══════════════════════════════════════════════════════════════
// EKAM Mobile — Onboarding · Main app
// ═══════════════════════════════════════════════════════════════
const { useState } = React;

const TOTAL_DOTS = 7; // we show progress for screens 1–7 (welcome → notify), not splash/done

// Per-screen design notes — what & why
const NOTES = [
  {
    step: '00 / Splash',
    h: 'Brand reveal, on forest.',
    sub: 'The first frame is not a sign-up.',
    why: <>The wordmark settles. The bindu glows like a window in the trees. <em>Touch to begin</em> is the only call to action — no Sign in, no Continue with Apple. Authentication waits until after the user has decided to come inside.</>,
  },
  {
    step: '01 / Welcome',
    h: 'A letter, not a splash screen.',
    sub: 'Tashi addresses you in second person.',
    why: <>Replaces the typical "Hi, welcome to the app" with a hand-signed note from a named human. Sets the <strong>voice contract</strong>: present tense, sentence case, no exclamation. Caveat hand for the signature establishes the host-hand motif that recurs on welcome cards in-cabin.</>,
  },
  {
    step: '02 / Intent',
    h: 'Multi-select, capped at three.',
    sub: 'Why these mountains, this time?',
    why: <>Airbnb's "Travel categories" — Beachfront, Treehouses, OMG — translated to <strong>emotional intents</strong>. Each card carries a Sanskrit script header and a single italic line, no icons. A cap of three forces a real signal. The selection drives collection ranking on Home.</>,
  },
  {
    step: '03 / Party',
    h: 'Single-select. Five honest options.',
    sub: 'We will set the cabin for the right number of mugs.',
    why: <>Combines Airbnb's guest counter and trip type. The sub-line on each option tells the user which <strong>tier</strong> they're moving toward (Kutir / Van / paired Kutir) — pricing transparency without a price tag. Pet option is first-class, not buried in filters.</>,
  },
  {
    step: '04 / Elevation',
    h: 'A slider, not a filter.',
    sub: 'The cabin tier resolves underneath.',
    why: <>The most distinctive screen in the flow. Elevation is the variable that <strong>actually decides the cabin</strong> — Kutir below 2,000m, Van mid, Shikhar above 3,000m. The mountain profile illustration gives the slider a meaning the user can feel. Replaces a dropdown with a gesture.</>,
  },
  {
    step: '05 / Season',
    h: 'Four cards. No calendar yet.',
    sub: 'Mood first; the date comes later.',
    why: <>Airbnb leads with a date picker. We lead with <strong>"when does the year speak to you?"</strong> — a softer signal that lets us recommend the cabin that's at its best in that season. The full calendar appears only on the property page, after intent is set.</>,
  },
  {
    step: '06 / Notifications',
    h: 'The five-letter rule.',
    sub: 'A house rule, written down.',
    why: <>Most apps frame the notification prompt as a feature. We frame ours as a <strong>commitment</strong>: confirmation, directions, day-before SMS, post-stay letter, four-week postcard. Five touches per stay, no more. The user opts in to a known volume, not a black box.</>,
  },
  {
    step: '07 / Done',
    h: 'Personalised handover.',
    sub: 'Three collections, ranked by match.',
    why: <>The summary card surfaces three collections derived from the prior six answers — sorted by match score, each a sentence not a label. The CTA reads <em>Find your Ekam</em> not <em>Get started</em>. The user leaves onboarding into a home that already knows them.</>,
  },
];

// ───────────────────────────────────────────────────────────────
// Phone
// ───────────────────────────────────────────────────────────────
function Phone({ step, state, set, next, back, skip }) {
  const dark = step === 0 || step === 7;

  // For dots: step 0 (splash) → don't show; step 7 (done) → don't show; show on 1–7 (indices 0–6)
  const dotIndex = step === 0 ? -1 : step === 7 ? -1 : step - 1;

  let body, cta, ctaDisabled = false;

  if (step === 0) {
    return (
      <div className="phone">
        <div className="phone__screen">
          <window.Splash onContinue={next} />
        </div>
      </div>
    );
  }

  if (step === 7) {
    return (
      <div className="phone">
        <div className="phone__screen">
          <window.Done state={state} onEnter={skip /* loop back to start */} />
        </div>
      </div>
    );
  }

  // Map step → screen + ctaLabel + can-advance check
  if (step === 1) { body = <window.Welcome />;                cta = 'Continue'; }
  if (step === 2) { body = <window.Intent state={state} set={set} />;    cta = 'Continue'; ctaDisabled = state.intents.length === 0; }
  if (step === 3) { body = <window.Party state={state} set={set} />;     cta = 'Continue'; ctaDisabled = !state.party; }
  if (step === 4) { body = <window.Elevation state={state} set={set} />; cta = 'Continue'; }
  if (step === 5) { body = <window.Season state={state} set={set} />;    cta = 'Continue'; ctaDisabled = !state.season; }
  if (step === 6) { body = <window.Notify state={state} set={set} />;    cta = 'Show me my collections'; ctaDisabled = !state.notify; }

  return (
    <div className="phone">
      <div className="phone__screen">
        <window.StatusBar dark={dark} />
        <window.TopBar
          step={dotIndex}
          total={TOTAL_DOTS}
          onBack={back}
          onSkip={skip}
          dark={dark}
        />
        <div className="ob">{body}</div>
        <div className="cta-bar">
          <button className="cta" onClick={next} disabled={ctaDisabled}>
            <span className="dot" />
            {cta}
          </button>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// Notes panels (left + right of phone) — UX rationale
// ───────────────────────────────────────────────────────────────
function NotesLeft({ step }) {
  const n = NOTES[step];
  return (
    <div className="stage__notes-left">
      <div>
        <div className="stage__step">{n.step}</div>
        <div className="stage__h" style={{ marginTop: 8 }}>{n.h}</div>
        <p className="stage__sub" style={{ marginTop: 10 }}>{n.sub}</p>
      </div>
    </div>
  );
}

function NotesRight({ step, state }) {
  const n = NOTES[step];
  return (
    <div className="stage__notes-right">
      <div>
        <div className="stage__why-head">— Why this screen</div>
        <p className="stage__why-body" style={{ marginTop: 12 }}>{n.why}</p>
      </div>

      {/* Live state read-out — useful for designers reviewing */}
      <div>
        <div className="stage__why-head">— Live state</div>
        <div style={{ marginTop: 12, fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--ink)', fontWeight: 300, lineHeight: 1.7 }}>
          <div style={{ paddingBottom: 6, borderBottom: '1px solid var(--bone)' }}>
            <b style={{ color: 'var(--bindu)', fontWeight: 500, letterSpacing: 1.5, fontSize: 9.5, textTransform: 'uppercase' }}>Intent</b>
            <div style={{ marginTop: 3 }}>{state.intents.length ? state.intents.join(' · ') : <em style={{ color: 'var(--moss)', fontFamily: 'var(--font-editorial)' }}>not set</em>}</div>
          </div>
          <div style={{ padding: '6px 0', borderBottom: '1px solid var(--bone)' }}>
            <b style={{ color: 'var(--bindu)', fontWeight: 500, letterSpacing: 1.5, fontSize: 9.5, textTransform: 'uppercase' }}>Party</b>
            <div style={{ marginTop: 3 }}>{state.party || <em style={{ color: 'var(--moss)', fontFamily: 'var(--font-editorial)' }}>not set</em>}</div>
          </div>
          <div style={{ padding: '6px 0', borderBottom: '1px solid var(--bone)' }}>
            <b style={{ color: 'var(--bindu)', fontWeight: 500, letterSpacing: 1.5, fontSize: 9.5, textTransform: 'uppercase' }}>Elevation</b>
            <div style={{ marginTop: 3 }}>{state.elevation.toLocaleString('en-IN')} m</div>
          </div>
          <div style={{ padding: '6px 0', borderBottom: '1px solid var(--bone)' }}>
            <b style={{ color: 'var(--bindu)', fontWeight: 500, letterSpacing: 1.5, fontSize: 9.5, textTransform: 'uppercase' }}>Season</b>
            <div style={{ marginTop: 3 }}>{state.season || <em style={{ color: 'var(--moss)', fontFamily: 'var(--font-editorial)' }}>not set</em>}</div>
          </div>
          <div style={{ padding: '6px 0' }}>
            <b style={{ color: 'var(--bindu)', fontWeight: 500, letterSpacing: 1.5, fontSize: 9.5, textTransform: 'uppercase' }}>Notify</b>
            <div style={{ marginTop: 3 }}>{state.notify || <em style={{ color: 'var(--moss)', fontFamily: 'var(--font-editorial)' }}>not set</em>}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// Screen index — 8 thumbnails below
// ───────────────────────────────────────────────────────────────
const INDEX_ITEMS = [
  { n: '00', name: 'Splash',       meta: 'Brand reveal',   thumb: 'splash' },
  { n: '01', name: 'Welcome',      meta: 'Host\'s letter', thumb: 'letter' },
  { n: '02', name: 'Intent',       meta: 'Multi-select',   thumb: 'grid' },
  { n: '03', name: 'Party',        meta: 'Single radio',   thumb: 'rows' },
  { n: '04', name: 'Elevation',    meta: 'Slider',         thumb: 'slider' },
  { n: '05', name: 'Season',       meta: 'Mood cards',     thumb: 'season' },
  { n: '06', name: 'Notify',       meta: 'Five-letter rule', thumb: 'letters' },
  { n: '07', name: 'Done',         meta: 'Handover',       thumb: 'done' },
];

function Thumb({ kind }) {
  if (kind === 'splash') return (
    <div className="tn-splash">
      <div className="em">एकम्</div>
      <div className="wm">EKAM</div>
    </div>
  );
  if (kind === 'letter') return (
    <div className="tn-light">
      <span className="eb">कुटीर</span>
      <div className="ti">You're early.<br/>So is the forest.</div>
      <div style={{ marginTop: 6, height: 1, background: 'var(--bindu)', width: 16 }} />
      <div style={{ height: 24, background: 'var(--sand)', border: '1px solid var(--bone)', marginTop: 4 }} />
      <div style={{ height: 14, background: 'var(--sand)', border: '1px solid var(--bone)', marginTop: 3 }} />
      <div className="pill" />
    </div>
  );
  if (kind === 'grid') return (
    <div className="tn-light">
      <span className="eb">Two of seven</span>
      <div className="ti">Why these mountains?</div>
      <div className="grid">
        <div className="on" />
        <div />
        <div />
        <div className="on" />
        <div />
        <div />
      </div>
      <div className="pill" />
    </div>
  );
  if (kind === 'rows') return (
    <div className="tn-light">
      <span className="eb">Three of seven</span>
      <div className="ti">Who comes with you?</div>
      <div className="li" />
      <div className="li on" />
      <div className="li" />
      <div className="li" />
      <div className="pill" />
    </div>
  );
  if (kind === 'slider') return (
    <div className="tn-light">
      <span className="eb">Four of seven</span>
      <div className="ti">How thin the air?</div>
      <div className="slider" />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 4, color: 'var(--moss)', fontFamily: 'var(--font-ui)', letterSpacing: 0.3, textTransform: 'uppercase', marginTop: 2 }}><span>1.8</span><span>2.4</span><span>3.2</span><span>3.7k</span></div>
      <div className="pill" />
    </div>
  );
  if (kind === 'season') return (
    <div className="tn-light">
      <span className="eb">Five of seven</span>
      <div className="ti">Which season?</div>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        <div style={{ background: 'linear-gradient(180deg, #2B4630, #C9D6BC)', aspectRatio: '1', border: '1px solid var(--bone)' }} />
        <div style={{ background: 'linear-gradient(180deg, #1f3525, #6b7a5c)', aspectRatio: '1', border: '1px solid var(--bindu)' }} />
        <div style={{ background: 'linear-gradient(180deg, #2a3845, #d68763)', aspectRatio: '1', border: '1px solid var(--bone)' }} />
        <div style={{ background: 'linear-gradient(180deg, #2a3845, #ECE4D3)', aspectRatio: '1', border: '1px solid var(--bone)' }} />
      </div>
      <div className="pill" />
    </div>
  );
  if (kind === 'letters') return (
    <div className="tn-light">
      <span className="eb">Six of seven</span>
      <div className="ti">Five letters.<br/>No more.</div>
      <div style={{ background: 'var(--sand)', border: '1px solid var(--bone)', padding: 3, marginTop: 4 }}>
        {['i.','ii.','iii.','iv.','v.'].map((x, i) => (
          <div key={i} style={{ display: 'flex', gap: 3, alignItems: 'baseline', padding: '2px 0', borderBottom: i < 4 ? '1px solid var(--bone)' : 0 }}>
            <span style={{ color: 'var(--bindu)', fontStyle: 'italic', fontSize: 5, fontFamily: 'var(--font-display)' }}>{x}</span>
            <div style={{ flex: 1, height: 2, background: 'var(--bone)' }} />
          </div>
        ))}
      </div>
      <div className="pill" />
    </div>
  );
  if (kind === 'done') return (
    <div className="tn-dark">
      <div className="em">एकम्</div>
      <div className="wm">EKAM</div>
      <div className="ti">Your retreat<br/>companion is ready.</div>
      <div style={{ background: 'rgba(236,228,211,0.18)', height: 10, marginTop: 4 }} />
      <div style={{ background: 'rgba(236,228,211,0.18)', height: 10, marginTop: 2 }} />
      <div className="pill" />
    </div>
  );
  return null;
}

function ScreenIndex({ step, onJump }) {
  return (
    <section className="index">
      <div className="index__head">
        <div>
          <span className="page__eyebrow">— The flow at a glance</span>
          <h3 style={{ marginTop: 6 }}>Seven steps. Eight screens. About ninety seconds.</h3>
        </div>
        <p>
          Onboarding never asks for a sign-in until the user requests a feature that needs one (booking, saving). The personalisation captured here is held locally — and surfaces on Home as collections, not as a profile.
        </p>
      </div>
      <div className="index__grid">
        {INDEX_ITEMS.map((it, i) => (
          <button
            key={it.n}
            className={`index__cell ${i === step ? 'on' : ''}`}
            onClick={() => onJump(i)}
          >
            <div className="index__thumb"><Thumb kind={it.thumb} /></div>
            <span className="index__num">{it.n}</span>
            <span className="index__name">{it.name}</span>
            <span className="index__meta">{it.meta}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────
// Root app
// ───────────────────────────────────────────────────────────────
function App() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState({
    intents: [],
    party: '',
    elevation: 2400,
    season: '',
    notify: null,
  });

  const next = () => setStep(s => Math.min(s + 1, INDEX_ITEMS.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));
  const skip = () => {
    // From splash, jump to home (loop). From others, skip remaining and head to Done.
    if (step === 0) setStep(0);
    else if (step === 7) {
      // 'Find your Ekam' on Done — loop to splash
      setStep(0);
      setState({ intents: [], party: '', elevation: 2400, season: '', notify: null });
    }
    else setStep(7);
  };

  return (
    <div className="page">

      {/* Header */}
      <header className="page__head">
        <div>
          <span className="page__eyebrow">— EKAM Living · Mobile</span>
          <div className="page__brand" style={{ marginTop: 14 }}>
            <span className="page__brand-dev">एकम्</span>
            <span className="page__brand-wm">E<span className="dot"></span>KAM</span>
          </div>
          <h1 className="page__title">Strategic foundation &amp; onboarding — a calm digital retreat companion.</h1>
          <p className="page__lede">
            Airbnb-grade personalization patterns, retranslated into the editorial register of a small hospitality brand. Five questions, three collections, no sign-in until the user wants one.
          </p>
        </div>
        <div className="page__meta">
          <span>Version <b>0.4 · draft</b></span>
          <span>Screens · <b>8</b></span>
          <span>For · <b>iOS &amp; Android</b></span>
        </div>
      </header>

      {/* Strategic foundation */}
      <window.Foundation />

      {/* Prototype stage */}
      <section>
        <div className="strat__intro" style={{ marginBottom: 32 }}>
          <div className="col-lbl">
            <span className="page__eyebrow">— The onboarding</span>
            <span style={{ fontFamily: 'var(--font-devanagari)', fontSize: 18, color: 'var(--bindu)', letterSpacing: 1.5, marginTop: 4 }}>स्वागत · welcome</span>
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 28, color: 'var(--forest)', letterSpacing: 0.5, lineHeight: 1.15 }}>
              Tap through the phone. Each screen is annotated with the choice we made and why.
            </h3>
            <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 15, color: 'var(--moss)', lineHeight: 1.55, marginTop: 8, maxWidth: 640 }}>
              Use the thumbnail strip below to jump. The slider on screen 04 changes the cabin tier read-out live; the answers you give propagate into the personalised handover on screen 07.
            </p>
          </div>
        </div>

        <div className="stage">
          <NotesLeft step={step} />

          <div className="phone-wrap">
            <Phone step={step} state={state} set={setState} next={next} back={back} skip={skip} />
            <span className="phone__caption">iPhone 15 · 393 × 852 dp · scale 0.96</span>
          </div>

          <NotesRight step={step} state={state} />
        </div>
      </section>

      {/* Screen index */}
      <ScreenIndex step={step} onJump={setStep} />

    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
