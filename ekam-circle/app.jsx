/* global React, ReactDOM */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Saved Escapes, Profile & Membership · main app
// ════════════════════════════════════════════════════════════════
const { useState } = React;

const SCREEN_NOTES = {
  saved: {
    step: 'Saved · 01',
    h: 'A shortlist, not a wishlist.',
    sub: 'Three cabins held with editorial calm. One live offer at the top. Recently viewed quietly below.',
    rationale: [
      { l: 'Card photo',     v: <>16:9 mood, devanagari mark, save heart. <strong>Offer chip</strong> on the photo only when there's a real offer — never as decoration.</> },
      { l: 'Member price',   v: <>Two-line price block on the right of the body. Strike-through original, clay member price, "/ night". The clay reads as belonging, not discount.</> },
      { l: 'Highlights',     v: <>Three small chips in sand — "Stone floor · Trail to ridge · Resident host". Editorial fragments, not feature tags.</> },
      { l: 'Offer ribbon',   v: <>One ribbon at the top — the most relevant current offer. Clay rule + soft clay tint. Subtle pulse on the dot.</> },
      { l: 'Drive time',     v: <>Bottom-left of every card. <em>"↗ 1 hr from Almora"</em> — practical, never under-the-fold.</> },
      { l: 'Recently viewed', v: <>Square thumbnails at the bottom, half height. Surfaces without claiming attention. Three at most.</> },
    ],
  },
  empty: {
    step: 'Saved · 02',
    h: 'Empty by design — never by accident.',
    sub: 'When the shortlist is empty, the screen explains what saving is, not that you haven\'t done it.',
    rationale: [
      { l: 'No "0 saved"',   v: <>Never <em>"You haven't saved anything yet."</em> — that reads as failure. Always frame the absence as future possibility.</> },
      { l: 'Devanagari mark', v: <>मन — the heart, the mind. Sits inside the dashed clay circle. Quietly says: this is where intention is held.</> },
      { l: 'Copy',            v: <>A sentence describing what a shortlist <strong>could</strong> be. Three possibilities, one per clause.</> },
      { l: 'Single CTA',      v: <>"Browse Escape Collections" — a soft pill, clay outline. Sends the user back to discover, not into an upsell.</> },
    ],
  },
  profile: {
    step: 'Profile · 03',
    h: 'A house, not a dashboard.',
    sub: 'User strip, three stats, the next retreat hero, four quick rows, and a postcard from the last journey.',
    rationale: [
      { l: 'User strip',     v: <>Avatar, name, tier. <em>"Circle · since Mar 2025"</em>. Edit lives on the right, not deeper.</> },
      { l: 'Three stats',    v: <>Nights · saplings · nights-to-next-tier. <strong>Saplings</strong> communicates the environmental contribution without ceremony.</> },
      { l: 'Upcoming hero',  v: <>If there's a retreat within 60 days, it gets a 16:9 card with a countdown chip. <em>"88 days"</em> — present-tense expectation.</> },
      { l: 'Quick rows',     v: <>Four rows: Saved · Past · Circle benefits · Preferences. Each carries a devanagari glyph; each value is a sentence, not a count.</> },
      { l: 'Past preview',   v: <>One line from the host's letter for the last journey. <em>"You wrote three letters and finished none."</em> — memory, not history.</> },
    ],
  },
  journeys: {
    step: 'Journeys · 04',
    h: 'Retreat Journeys — not Trips.',
    sub: 'Upcoming in full bloom; past as small letters from the host.',
    rationale: [
      { l: 'Renaming',       v: <>Trips → Retreat Journeys. <strong>A trip is logistics</strong>, a journey is a year-long memory. Words shape expectation.</> },
      { l: 'Upcoming card',  v: <>Big mood photo with a countdown overlay, meta row (Dates · Host), one-line note, two actions: <em>Open companion</em> + <em>View itinerary</em>.</> },
      { l: 'Past card',      v: <>Side-by-side photo (100px) + body. Body is a quoted letter, not a star rating. <strong>No re-book button.</strong> The cabin will be there when you want it.</> },
      { l: 'Photo count',    v: <>Bottom of each past card: "<em>4 photographs →</em>". Tap to see what you sent yourselves home with.</> },
    ],
  },
  circle: {
    step: 'Circle · 05',
    h: 'A membership made of nights, not points.',
    sub: 'Three rings. Quiet privileges. One forest at a time.',
    rationale: [
      { l: 'Dark surface',   v: <>The Circle screen is the only place in the app that breaks from cream. Forest gradient, clay accents — reads as <strong>elevated and private</strong>.</> },
      { l: 'Status card',    v: <>Big "Circle", member-since line, a clay arc ring showing nights count vs next tier. The arc is real progress — <em>17 of 30 nights</em>.</> },
      { l: 'To Inner',       v: <>One italic line: <em>"13 more nights — and a small invitation — to Inner Circle."</em> The invitation matters more than the count.</> },
      { l: 'Three tiers',    v: <>First stay · Circle · Inner Circle. Devanagari for each — प्रथम · मंडल · अंतर. Benefits in italic sentences, not bullet lists.</> },
      { l: 'No points talk', v: <>Final paragraph: <em>"Privileges follow time, not transactions."</em> — the design statement of the entire programme.</> },
    ],
  },
  prefs: {
    step: 'Preferences · 06',
    h: 'Edit the onboarding answers, anytime.',
    sub: 'Same questions you answered before the first trip. Re-tuning anytime, in one screen.',
    rationale: [
      { l: 'Six rows',       v: <>Intent · party · elevation · season · pace · quiet. The exact set from onboarding. <strong>Edit, not configure.</strong></> },
      { l: 'Hint line',      v: <>Each row carries a quiet italic hint — <em>"Asked at onboarding"</em>, <em>"Couple · no children"</em>. The user knows what they're changing.</> },
      { l: 'Change action',  v: <>Right-aligned clay link — <em>"Change"</em>. Opens the original question step. No new vocabulary to learn.</> },
      { l: 'A small promise', v: <>Sand block at the bottom: where data lives, who can read it, how to delete. <strong>The delete is one tap</strong> — no friction by design.</> },
    ],
  },
};

const INDEX = [
  { id: 'saved',    n: '01', name: 'Saved Escapes', meta: 'Cards · offers · recently viewed', dev: 'मन' },
  { id: 'empty',    n: '02', name: 'Saved · empty', meta: 'Empty state of the shortlist',     dev: 'शून्य' },
  { id: 'profile',  n: '03', name: 'Profile',       meta: 'Dashboard · upcoming · quickrow',  dev: 'आप' },
  { id: 'journeys', n: '04', name: 'Journeys',      meta: 'Upcoming + past retreats',         dev: 'पथ' },
  { id: 'circle',   n: '05', name: 'EKAM Circle',   meta: 'Membership · benefits · tiers',    dev: 'मंडल' },
  { id: 'prefs',    n: '06', name: 'Preferences',   meta: 'Edit onboarding answers',          dev: 'मन' },
];

function Phone({ activeIndex, saved, onUnsave }) {
  return (
    <div className="phone">
      <div className="phone__screen">
        {activeIndex === 'saved'    && <window.CIRCLE_SavedScreen      saved={saved} onUnsave={onUnsave} />}
        {activeIndex === 'empty'    && <window.CIRCLE_SavedEmptyScreen />}
        {activeIndex === 'profile'  && <window.CIRCLE_ProfileScreen   />}
        {activeIndex === 'journeys' && <window.CIRCLE_JourneysScreen  />}
        {activeIndex === 'circle'   && <window.CIRCLE_CircleScreen    />}
        {activeIndex === 'prefs'    && <window.CIRCLE_PrefsScreen     />}
      </div>
    </div>
  );
}

function NotesLeft({ note }) {
  return (
    <div className="stage__notes-left">
      <div>
        <div className="stage__step">{note.step}</div>
        <div className="stage__h" style={{ marginTop: 8 }}>{note.h}</div>
        <p className="stage__sub" style={{ marginTop: 10 }}>{note.sub}</p>
      </div>
    </div>
  );
}

function NotesRight({ note }) {
  return (
    <div className="stage__notes-right">
      <div>
        <div className="stage__why-head">— How it's built</div>
        <div className="stage__why-list" style={{ marginTop: 12 }}>
          {note.rationale.map((r, i) => (
            <div key={i}>
              <span className="l">{r.l}</span>
              <span className="v">{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Thumb({ kind }) {
  const cream = 'var(--cream)';
  const bone  = 'var(--bone)';
  const fg    = 'var(--forest)';
  const bd    = 'var(--bindu)';
  const sand  = 'var(--sand)';

  if (kind === 'saved') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: cream, padding: '12% 8%', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 5, color: bd }}>मन</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 7, color: fg }}>Saved Escapes.</div>
        <div style={{ padding: 2, background: 'rgba(180,97,58,0.1)', borderLeft: `1px solid ${bd}`, marginTop: 2 }}>
          <div style={{ fontSize: 2.5, color: bd }}>— OFFER</div>
        </div>
        {[1,2].map(i => (
          <div key={i} style={{ border: `1px solid ${bone}`, marginTop: 2 }}>
            <div style={{ aspectRatio: '16/9', background: i === 1 ? 'linear-gradient(180deg, #2a3845, #b8a48c)' : 'linear-gradient(180deg, #0c1410, #6a7565)' }} />
            <div style={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 4, color: fg }}>{i === 1 ? 'Kalpa' : 'Binsar'}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 4, color: bd }}>₹{i === 1 ? '12.5k' : '7.1k'}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'empty') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: cream, padding: '12% 8%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 5, color: bd, alignSelf: 'flex-start' }}>मन</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 7, color: fg, alignSelf: 'flex-start' }}>Saved Escapes.</div>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: sand, border: `1px dashed ${bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 18 }}>
          <span style={{ color: bd, fontSize: 12, lineHeight: 1 }}>♡</span>
        </div>
        <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 3, color: 'var(--moss)', textAlign: 'center', marginTop: 4, lineHeight: 1.4 }}>A small shortlist of future weeks.</div>
        <div style={{ marginTop: 4, padding: '2px 6px', border: `0.5px solid ${bd}`, borderRadius: 999, fontSize: 3, color: bd }}>BROWSE</div>
      </div>
    );
  }
  if (kind === 'profile') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: cream, padding: '12% 8%', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ display: 'flex', gap: 3, alignItems: 'center', paddingBottom: 3, borderBottom: `1px solid ${bone}` }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: bd, color: cream, fontSize: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)' }}>A</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 5, color: fg }}>Anika S.</div>
            <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 3, color: 'var(--moss)' }}>Circle · 17 nights</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, padding: '2px 0', borderBottom: `1px solid ${bone}` }}>
          {[17, 32, 13].map((n, i) => (<div key={i}><div style={{ fontFamily: 'var(--font-display)', fontSize: 5, color: fg }}>{n}</div><div style={{ fontSize: 2.5, color: bd }}>{['NIGHTS','SAPLINGS','TO INNER'][i]}</div></div>))}
        </div>
        <div style={{ border: `1px solid ${bone}` }}>
          <div style={{ aspectRatio: '16/9', background: 'linear-gradient(180deg, #2a3845, #b8a48c)', position: 'relative' }}>
            <span style={{ position: 'absolute', right: 3, bottom: 3, background: 'rgba(250,247,240,0.9)', fontSize: 3, padding: '1px 3px', color: fg }}>88 DAYS</span>
          </div>
          <div style={{ padding: 2 }}>
            <div style={{ fontSize: 2.5, color: bd }}>— NEXT RETREAT</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 4, color: fg }}>Kalpa.</div>
          </div>
        </div>
        {['Saved','Past','Circle','Prefs'].map((x, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5px 0', borderBottom: i < 3 ? `1px solid ${bone}` : 0 }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 3, color: bd }}>{x}</span>
            <span style={{ fontSize: 3, color: 'var(--moss)' }}>→</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'journeys') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: cream, padding: '12% 8%', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 5, color: bd }}>पथ</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 7, color: fg }}>Retreat Journeys.</div>
        <div style={{ fontSize: 2.5, color: bd, marginTop: 2 }}>— UPCOMING</div>
        <div style={{ border: `1px solid ${bone}` }}>
          <div style={{ aspectRatio: '16/9', background: 'linear-gradient(180deg, #2a3845, #b8a48c)', position: 'relative' }}>
            <div style={{ position: 'absolute', right: 3, bottom: 3, background: 'rgba(250,247,240,0.95)', padding: '1px 3px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 5, color: fg, lineHeight: 1 }}>88</div>
              <div style={{ fontSize: 2, color: 'var(--moss)' }}>DAYS</div>
            </div>
          </div>
          <div style={{ padding: 2 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 4, color: fg }}>Kalpa.</div>
          </div>
        </div>
        <div style={{ fontSize: 2.5, color: bd, marginTop: 3 }}>— BEHIND</div>
        {['Binsar · Nov 2025', 'Ramgarh · Mar 2025'].map((x, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '12px 1fr', gap: 3, border: `1px solid ${bone}`, padding: 1 }}>
            <div style={{ aspectRatio: 1, background: ['linear-gradient(180deg, #0c1410, #6a7565)','linear-gradient(180deg, #36443a, #a59f86)'][i] }} />
            <div style={{ padding: '1px 0' }}>
              <div style={{ fontSize: 2.5, color: bd }}>{x.split(' · ')[1]}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 3.5, color: fg }}>{x.split(' · ')[0]}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'circle') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #14201A 0%, #1F3525 100%)', padding: '12% 8%', display: 'flex', flexDirection: 'column', gap: 3, color: cream }}>
        <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 5, color: bd }}>मंडल</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 7, color: cream }}>EKAM Circle.</div>
        <div style={{ padding: 3, background: 'rgba(180,97,58,0.15)', border: `0.5px solid rgba(180,97,58,0.4)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
          <div>
            <div style={{ fontSize: 2.5, color: bd }}>— YOU ARE</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 6, color: cream }}>Circle</div>
          </div>
          <div style={{ width: 12, height: 12, borderRadius: '50%', border: `1.5px solid ${bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 3, color: cream }}>17</div>
        </div>
        <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 3, color: 'var(--sand)', marginTop: 2 }}>13 more nights to Inner.</div>
        {['First stay','Circle','Inner Circle'].map((t, i) => (
          <div key={i} style={{ padding: 2, border: i === 1 ? `0.5px solid ${bd}` : `0.5px solid rgba(236,228,211,0.18)`, background: i === 1 ? 'rgba(180,97,58,0.08)' : 'transparent', marginTop: 2 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 4, color: cream }}>{t}</div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'prefs') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: cream, padding: '12% 8%', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 4, color: bd }}>मन · PREFERENCES</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 6, color: fg }}>What we know.</div>
        {['Intent','Party','Elevation','Season','Pace','Quiet'].map((x, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0', borderBottom: i < 5 ? `1px solid ${bone}` : 0 }}>
            <div>
              <div style={{ fontSize: 2.5, color: bd }}>{x.toUpperCase()}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 3.5, color: fg }}>{['A slow reset','Just the two of us','2.4 – 3.4 km','Autumn → snow','3-5 nights','No notifications'][i]}</div>
            </div>
            <span style={{ fontSize: 2.5, color: bd }}>CHANGE</span>
          </div>
        ))}
        <div style={{ background: sand, padding: 2, marginTop: 2 }}>
          <div style={{ fontSize: 2.5, color: bd }}>— A SMALL PROMISE</div>
          <div style={{ padding: '1px 3px', border: `0.5px solid 'var(--moss)'`, borderRadius: 999, fontSize: 2.5, color: 'var(--moss)', alignSelf: 'flex-start', display: 'inline-block', marginTop: 2 }}>DELETE ALL</div>
        </div>
      </div>
    );
  }
  return null;
}

function App() {
  const [activeIndex, setActiveIndex] = useState('saved');
  const [saved, setSaved] = useState(new Set(['kalpa', 'binsar', 'baspa']));
  const onUnsave = (id) => setSaved(s => { const n = new Set(s); n.delete(id); return n; });
  const note = SCREEN_NOTES[activeIndex] || SCREEN_NOTES.saved;

  return (
    <div className="page">
      <header className="page__head">
        <div>
          <span className="page__eyebrow">— EKAM Living · Mobile · Chapter IV</span>
          <div className="page__brand">
            <span className="page__brand-dev">एकम्</span>
            <span className="page__brand-wm">E<span className="dot"></span>KAM</span>
          </div>
          <h1 className="page__title">Saved Escapes, Profile &amp; Membership — Airbnb retention systems, rewritten as a retreat lifestyle ecosystem.</h1>
          <p className="page__lede">
            A wishlist becomes a held shortlist. Trips become Retreat Journeys. Loyalty becomes a membership of nights, not points. Profile is the house, Preferences are the rules, Circle is the privilege of having returned more than once.
          </p>
        </div>
        <div className="page__meta">
          <span>Version <b>0.2 · draft</b></span>
          <span>Screens · <b>6</b></span>
          <span>Builds on · <b>property v0.3</b></span>
        </div>
      </header>

      {/* Translation map — Airbnb retention → EKAM ecosystem */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="intro">
          <div className="col-lbl">
            <span className="page__eyebrow">— Retention mechanics</span>
            <span className="intro__dev">मन · the held mind</span>
          </div>
          <div>
            <h3>Eight Airbnb retention mechanics, eight EKAM rewrites.</h3>
            <p>Loyalty programmes turn places into transactions. We're rebuilding the same surfaces with retreat language and editorial calm.</p>
          </div>
        </div>

        <div className="pattern">
          <div className="pattern__head">
            <div>Airbnb mechanic</div><div>EKAM expression</div><div>Why</div>
          </div>
          {[
            ['Wishlist (multi-folder)',         'Saved Escapes (one shortlist)',     'Folders are friction. The list rarely exceeds six, and that scarcity is the point.'],
            ['Wishlist card with price',         'Cabin card with member pricing',    'Strike-through original + clay member rate. The clay communicates belonging, not discount.'],
            ['Recently viewed strip',            'You were just here',                'Square thumbnails, half height. Surfaces without claiming attention — the home is not a feed of you.'],
            ['Trips tab (upcoming + past)',      'Retreat Journeys',                  'A trip is logistics. A journey is memory. Past cards carry a quoted letter, not a star rating.'],
            ['Booking confirmation page',        'Companion handoff (Chapter III)',   'Not a receipt. A handoff into the in-cabin companion app. The booking ends; the relationship begins.'],
            ['Airbnb Plus / Luxe tiers',         'EKAM Circle (3 rings)',             'First stay · Circle · Inner. Tiers earned by nights, not by booking volume. Privileges follow time, not transactions.'],
            ['Promo codes, push notifications',  'One offer ribbon · seasonal',        'One ribbon at a time, on Saved. The most relevant current offer. No notifications during stays — ever.'],
            ['Account settings',                 'Preferences (the onboarding answers)','The six onboarding questions, editable in one screen. Re-tunes the home and the recommendations.'],
          ].map((r, i) => (
            <div className="pattern__row" key={i}>
              <div className="pattern__from">{r[0]}</div>
              <div className="pattern__to">{r[1]}</div>
              <div className="pattern__why">{r[2]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Prototype stage */}
      <section>
        <div className="intro" style={{ marginBottom: 28 }}>
          <div className="col-lbl">
            <span className="page__eyebrow">— The prototype</span>
            <span className="intro__dev">मंडल · the ring</span>
          </div>
          <div>
            <h3>Tap through the six screens. The Saved heart is live — unsave a cabin and watch the shortlist update.</h3>
            <p>The empty state appears when you remove all three. Profile, Journeys, Circle and Preferences are showing the same authored data as the rest of the app would — same Anika S., same 17 nights, same Kalpa retreat in August.</p>
          </div>
        </div>

        <div className="tabs">
          {INDEX.map(item => (
            <button key={item.id} className={`tabs__btn ${activeIndex === item.id ? 'on' : ''}`} onClick={() => setActiveIndex(item.id)}>
              <span className="dev">{item.dev}</span>
              {item.n} · {item.name}
            </button>
          ))}
        </div>

        <div className="stage">
          <NotesLeft note={note} />
          <div className="phone-wrap">
            <Phone activeIndex={activeIndex} saved={saved} onUnsave={onUnsave} />
            <span className="phone__caption">iPhone 15 · 380 × 800 dp · live state</span>
          </div>
          <NotesRight note={note} />
        </div>
      </section>

      {/* Screen index */}
      <section className="index">
        <div className="index__head">
          <div>
            <span className="page__eyebrow">— Screens in this chapter</span>
            <span className="intro__dev" style={{ marginTop: 4, display: 'block' }}>संग्रह · the set</span>
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 28, color: 'var(--forest)', letterSpacing: 0.5, lineHeight: 1.15 }}>
              Six screens. Two are saved-list states, three live under Profile, and one is the membership.
            </h3>
            <p>The Saved tab shows two states (populated + empty). The Profile tab houses three sub-screens — Profile · Journeys · Preferences — and Circle is its own deep link from Profile, dark surface, the only screen that breaks the cream.</p>
          </div>
        </div>
        <div className="index__grid">
          {INDEX.map(item => (
            <button key={item.id} className={`index__cell ${activeIndex === item.id ? 'on' : ''}`} onClick={() => setActiveIndex(item.id)}>
              <div className="index__thumb"><Thumb kind={item.id} /></div>
              <span className="index__num">{item.n}</span>
              <span className="index__name">{item.name}</span>
              <span className="index__meta">{item.meta}</span>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
