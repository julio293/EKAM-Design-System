/* global React, ReactDOM */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Chapter V · main app
// Saved · Profile · Mudra (seals + journal) · Referral
// ════════════════════════════════════════════════════════════════
const { useState } = React;

const SCREEN_NOTES = {
  saved: {
    step: 'Saved · 01',
    h: 'A held shortlist, not a wishlist.',
    sub: 'Three cabins. Editorial photo, drive, season, one sentence. No prices on the card.',
    rationale: [
      { l: 'No prices',      v: <>Saved is intent, not commerce. The price lives on the property page, where the decision is being made — not on a card you scroll past.</> },
      { l: 'Seasonal line',  v: <><strong>"June, before the monsoon"</strong> — not "Best in summer". Specific and editorial, written by hand.</> },
      { l: 'One-line note',  v: <><em>"Stone floor, one bed, one window onto the ridge."</em> The single most useful thing the user remembered about this cabin.</> },
      { l: 'Single action',  v: <>"<strong>Hold this cabin</strong>" — a soft, underlined link. Not a Reserve button. Booking is one screen deeper; this is the holding action.</> },
      { l: 'No offer chips', v: <>Saved is silent. No "−15%". No "Limited time". The price difference, if it exists, is on the booking sheet — never on the card.</> },
      { l: 'Quiet save',     v: <>Heart fills clay, no animation, no toast. The interaction's only feedback is the colour. Tap to release.</> },
    ],
  },
  profile: {
    step: 'Profile · 02',
    h: 'A house, not a dashboard.',
    sub: 'Five entries. Each is a sentence, not a count. No tiers. No badges. Sign-out at the bottom.',
    rationale: [
      { l: 'Entries as prose', v: <>"<em>Three cabins, held quietly.</em>" not <em>"3 saved"</em>. The label tells you the kind of thing; the value tells you the state of it as a sentence.</> },
      { l: 'No metrics',       v: <>Never <em>"17 nights · 32 saplings"</em>. Counters belong in business intelligence, not on the user's profile page.</> },
      { l: 'Mudra is a row',   v: <>The seal collection is one of five entries, not the headline. It opens its own world only when tapped.</> },
      { l: 'Sign out, plain',  v: <>Two words at the bottom: <strong>Sign out · Help</strong>. No "Are you sure?" — the cabin will be there.</> },
    ],
  },
  mudra: {
    step: 'Mudra · 03',
    h: 'A network of seals, not a status ladder.',
    sub: 'Quiet India map. Visited cabins as clay dots, unvisited as outlined circles. No routes, no scoreboard.',
    rationale: [
      { l: 'Map first',      v: <>The land is the navigation. A quiet outline of HP + UK; pins are the only saturated colour.</> },
      { l: 'No routes',      v: <>No lines between visited cabins. Travel is the cabin, not the journey between them.</> },
      { l: 'Toggle to Journal', v: <>One alternate view: <strong>Map ↔ Journal</strong>. Both are valid representations; the user picks which mood they're in.</> },
      { l: 'Counts as legend',  v: <>"<em>Visited · 3 · Remaining · 12</em>". Phrased as observation, not progress. The number doesn't go up; the map fills in.</> },
      { l: 'Closing line',    v: <>"<em>A mudra arrives in your post after each stay.</em>" Roots the digital artifact in the physical book that lives on the user's shelf.</> },
    ],
  },
  detail: {
    step: 'Mudra · 04',
    h: 'One mark, fully present.',
    sub: 'The seal at the centre. Cabin number, host, season, the line you wrote afterwards. No share button.',
    rationale: [
      { l: 'Seal as type',   v: <>The wax-seal glyph is hand-drawn as SVG — an octagonal impressed edge with the cabin's devanagari character at the centre. Same form for every cabin.</> },
      { l: 'Cabin number',   v: <>"<strong>Cabin No. 03</strong>" — every cabin is numbered. Singular hospitality requires it: there is only one of each.</> },
      { l: 'Three facts',    v: <>Stayed · With · When. A hairline-divided trio. The host is named; the season is described, not dated.</> },
      { l: 'A line you wrote',v: <>One field. The user can write what they remember. Lives only on their device — never an Instagram-style "review".</> },
      { l: 'No share',       v: <>The mudra is a record, not content. No "Share to story", no badge to post. <strong>Restraint is the discipline.</strong></> },
    ],
  },
  journal: {
    step: 'Mudra · 05',
    h: 'A page from the book.',
    sub: 'Wax-seal grid mirroring the physical journal posted to the user after each stay.',
    rationale: [
      { l: 'Page texture',   v: <>A repeating line, like a ruled page in the book. Sand base. The page is the artifact; the seals sit on it.</> },
      { l: 'Visited bright', v: <>Unvisited cabins are present but dim (0.35 opacity). The page is complete; it just hasn't been earned yet.</> },
      { l: 'Volume system',  v: <>"<strong>Volume I</strong>" · "<em>Volume II opens after your fourth stay.</em>" Mirrors the physical book — a new volume arrives in the post when a year has passed.</> },
      { l: 'No claim button',v: <>The seal isn't "unlocked" — it arrives by post. The app shows the digital copy as record, not reward.</> },
    ],
  },
  balance: {
    step: 'Mudra · 06',
    h: 'Held for you. Not a points system.',
    sub: 'Mudra is a small return — one mudra is one rupee. Earned by introductions and milestones; applied to up to a fifth of any booking.',
    rationale: [
      { l: 'In rupees',      v: <><strong>₹</strong> is the only unit. No "points", no "credits". The user knows what 1,390 buys.</> },
      { l: 'Quiet headline', v: <>"<em>Held for you</em>" not "Your rewards balance". The bank metaphor is intentional — mudra is held, not won.</> },
      { l: 'Two sources',    v: <>Introductions (₹1,000 per first stay) + milestones (₹250 → ₹5,000). Both factual, both rooted in real action.</> },
      { l: 'Ledger',         v: <>Every entry shows source · label · amount · date. A clay <em>+</em> for earnings, a moss <em>−</em> for applications. No celebration.</> },
      { l: 'Milestones list',v: <>The five marks: first stay, three cabins, four, six, the full network. The next one is shown in clay; the rest are silent.</> },
      { l: 'Apply cap',      v: <>"<strong>Up to a fifth</strong>" — phrased in language, not a percentage. The cap protects the brand from feeling like a coupon site.</> },
      { l: 'No expiry',      v: <>"<em>No expiry. No tier. Untransferable.</em>" Three short refusals. The mudra is the user's, indefinitely.</> },
    ],
  },
  referral: {
    step: 'Referral · 07',
    h: 'A postcard, not a coupon.',
    sub: 'Postcard preview of what the recipient sees. Personal note in Caveat. 4 × 2 share grid. A small return after their first stay.',
    rationale: [
      { l: 'Postcard preview', v: <>The first thing the user sees is what their friend will see — a cabin image with their own first name on the caption. The share is honest.</> },
      { l: 'Caveat field',     v: <>Handwritten note. Not a system message. The user is writing to a specific person, not filling a referral form.</> },
      { l: 'Eight channels',   v: <>WhatsApp · Messages · Email · Copy link · X · Facebook · Instagram · More. A 4 × 2 grid matching the web modal. Tap sends, with a quiet "Sent" confirmation.</> },
      { l: 'The return',       v: <>"<strong>₹1,000 arrives when they complete their first stay.</strong>" Stated factually, not promoted. No banner, no celebration — sand block, italic body.</> },
      { l: 'State-aware past', v: <>Each past introduction shows what happened: <em>Devaki stayed → + ₹1,000</em>. <em>Priya arriving → holding · ₹1,000</em>. <em>Karan held a cabin → 3 weeks ago</em>. Live, never historical.</> },
      { l: 'No discounts',     v: <>The recipient gets a held cabin and your first name. No promo code, no discount. The reward only flows back to the introducer — and only after the stay.</> },
    ],
  },
  invitation: {
    step: 'Referral · 08',
    h: 'A note from a friend, not a promo email.',
    sub: 'Dark surface. One photo. Two sentences. A handwritten line. One primary action.',
    rationale: [
      { l: 'Dark surface',   v: <>The invitation is intimate. It reads as a postcard delivered at dusk, not an inbox notification.</> },
      { l: 'Introducer named',v: <>"<em>A note from Aarav</em>" — the eyebrow is the sender. The recipient knows who reached out before they know what for.</> },
      { l: 'Handwritten note',v: <>The Caveat line. <em>"Bring the woollens. The monal returns Thursday."</em> The introducer's voice, in their own hand.</> },
      { l: 'No urgency',     v: <>No "Limited time". No "3 others viewing". No "Book before". Aarav has held a cabin. The recipient comes when they come.</> },
      { l: 'Two actions',    v: <>Primary: <strong>Continue</strong>. Secondary: <em>Read about Binsar</em>. Either is a valid response to an invitation.</> },
    ],
  },
};

const INDEX = [
  { id: 'saved',      n: '01', name: 'Saved Escapes', dev: 'मन',     meta: 'Three cabins, held quietly' },
  { id: 'profile',    n: '02', name: 'Profile',       dev: 'आप',     meta: 'Five entries, no dashboard' },
  { id: 'mudra',      n: '03', name: 'Mudra · map',   dev: 'मुद्रा',  meta: 'The seal collection · map view' },
  { id: 'detail',     n: '04', name: 'Mudra detail',  dev: 'छाप',    meta: 'One seal, full presence' },
  { id: 'journal',    n: '05', name: 'Journal page',  dev: 'अंकन',   meta: 'Wax-seal grid' },
  { id: 'balance',    n: '06', name: 'Mudra balance', dev: 'पात्र',  meta: 'Held for you · ₹1,390' },
  { id: 'referral',   n: '07', name: 'Referral',      dev: 'परिचय', meta: 'Postcard share · ₹1,000 return' },
  { id: 'invitation', n: '08', name: 'Invitation',    dev: 'स्वागत', meta: 'The recipient\'s view' },
];

function Phone({ activeIndex, saved, onUnsave }) {
  return (
    <div className="phone">
      <div className="phone__screen">
        {activeIndex === 'saved'      && <window.NET_SavedScreen      saved={saved} onUnsave={onUnsave} />}
        {activeIndex === 'profile'    && <window.NET_ProfileScreen    />}
        {activeIndex === 'mudra'      && <window.NET_MudraHomeScreen  />}
        {activeIndex === 'detail'     && <window.NET_MudraDetailScreen />}
        {activeIndex === 'journal'    && <window.NET_JournalScreen    />}
        {activeIndex === 'balance'    && <window.NET_MudraBalanceScreen />}
        {activeIndex === 'referral'   && <window.NET_ReferralScreen   />}
        {activeIndex === 'invitation' && <window.NET_InvitationScreen />}
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

function App() {
  const [activeIndex, setActiveIndex] = useState('saved');
  const [saved, setSaved] = useState(new Set(['kalpa', 'binsar', 'baspa']));
  const onUnsave = (id) => setSaved(s => { const n = new Set(s); n.delete(id); return n; });
  const note = SCREEN_NOTES[activeIndex] || SCREEN_NOTES.saved;

  return (
    <div className="page">
      <header className="page__head">
        <div>
          <span className="page__eyebrow">— EKAM Living · Mobile · Chapter V</span>
          <div className="page__brand">
            <span className="page__brand-dev">एकम्</span>
            <span className="page__brand-wm">E<span className="dot"></span>KAM</span>
          </div>
          <h1 className="page__title">Saved, Profile, Mudra &amp; Referral — Airbnb's retention surfaces, rewritten under restraint.</h1>
          <p className="page__lede">
            Seven screens. Saved Escapes as a held shortlist with no prices on the card. Profile as a house, not a dashboard — no tiers, no badges, no points. Mudra (मुद्रा) — the seals — replaces loyalty entirely: a digital mirror of the wax-sealed journal that arrives by post. Referral as an introduction between two people, never a coupon between two accounts.
          </p>
        </div>
        <div className="page__meta">
          <span>Version <b>0.1 · draft</b></span>
          <span>Screens · <b>7</b></span>
          <span>Supersedes · <b>Circle (Ch IV)</b></span>
        </div>
      </header>

      {/* Translation table */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="intro">
          <div className="col-lbl">
            <span className="page__eyebrow">— The retranslation</span>
            <span className="intro__dev">मुद्रा · the seal</span>
          </div>
          <div>
            <h3>Eight retention mechanics, rewritten under restraint.</h3>
            <p>The mechanics we kept; the language we did not. Membership is not a tier ladder. Loyalty is the wax that dries after the stay.</p>
          </div>
        </div>

        <div className="pattern">
          <div className="pattern__head">
            <div>Airbnb mechanic</div><div>EKAM expression</div><div>Why</div>
          </div>
          {[
            ['Wishlist with prices',         'Saved Escapes (no price on the card)', 'Saved is intent, not commerce. Pricing lives on the booking sheet, where the decision is being made.'],
            ['Wishlist folders',             'One held shortlist',                   'Folders are friction. Six cabins is plenty, and six is usually all there is.'],
            ['Profile dashboard',            'A house, not a dashboard',             'Five rows, each a sentence. No metrics, no charts, no streaks. Nothing the user has to interpret.'],
            ['Loyalty tier ladder',          'Mudra — wax seals',                    'No status, no levels. A physical wax seal arrives in the post after each stay; the app is a record of those marks.'],
            ['Badge unlocks, confetti',      'Quiet seal accumulation',              'No achievement language. The seal does not "unlock" — it arrives. The map fills in; the page completes.'],
            ['Referral codes & discounts',   'A personal introduction',              'No promo code, no cashback. The link is the user\'s first name. The reward for the recipient is a held cabin, not a price.'],
            ['Push notifications & timers',  'The post arrives when it does',        'No urgency. No "limited time". No "5 others viewing". The cabin will be there.'],
            ['Account settings',             'Preferences (the onboarding answers)', 'The six questions from joining, editable in one place. Same vocabulary, different time.'],
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
            <span className="intro__dev">अंकन · the marking</span>
          </div>
          <div>
            <h3>Tap through the seven screens. Release a saved cabin and watch the shortlist update.</h3>
            <p>The Mudra screen has a Map ↔ Journal toggle. Three cabins are visited (Binsar, Ramgarh, Jhebi); twelve remain. The detail screen is a single mark — Binsar No. 03 — with the line the user wrote after that stay.</p>
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

      {/* Deliverables — anti-patterns + naming */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div className="intro">
          <div className="col-lbl">
            <span className="page__eyebrow">— What we did not do</span>
            <span className="intro__dev">रिक्त · what is absent</span>
          </div>
          <div>
            <h3>The discipline is the product.</h3>
            <p>Restraint is the absence of the obvious move. These were considered and refused.</p>
          </div>
        </div>

        <div className="delivs">
          <div className="delivs__panel">
            <h3>Anti-patterns avoided</h3>
            <ul className="anti">
              <li>No tier ladder · First / Circle / Inner Circle was on the table in Chapter IV. Removed. A retreat brand cannot have <em>levels</em>.</li>
              <li>No progress bars · The map fills in. The journal page completes. Neither moves on a graph.</li>
              <li>No streak counters · "12 nights in a row" is a SaaS mechanic. Stays are seasonal, not consecutive.</li>
              <li>No badge unlocks, no confetti · The seal arrives by post. The app does not animate it open.</li>
              <li>No "limited time" offers · Saved screen carries no offer ribbon. Pricing is one screen deeper.</li>
              <li>No referral discount · The referrer gets nothing. The recipient gets a held cabin and an introducer's name.</li>
              <li>No notifications during stay · The companion never pings while the cabin is being used.</li>
              <li>No "share your stay" · The mudra is a private record, not Instagram content.</li>
              <li>No reviews, no stars · Past trips show a quoted letter from the host, not a 5-star rating slot.</li>
            </ul>
          </div>

          <div className="delivs__panel">
            <h3>Three names for the seal artifact</h3>
            <p>"Trophy" was the brief's working name and was rejected by every test. Three Sanskrit-rooted alternatives, in order of preference.</p>
            <ul className="naming">
              <li>
                <span>
                  <span className="n">मुद्रा</span>
                  <span className="ro">Mudra</span>
                </span>
                <span className="why">
                  <strong>Recommended.</strong> "Seal" in Sanskrit — also gesture, imprint, currency mark. Used historically for royal seals and manuscript impressions. <em>Tactile, archival, intuitive.</em> The chosen name in this prototype.
                </span>
              </li>
              <li>
                <span>
                  <span className="n">छाप</span>
                  <span className="ro">Chhaap</span>
                </span>
                <span className="why">
                  "Imprint" or "stamp". A more colloquial register, but rooted. Direct connection to wax-seal physicality. <em>Use if Mudra feels too ceremonial.</em>
                </span>
              </li>
              <li>
                <span>
                  <span className="n">अंकन</span>
                  <span className="ro">Ankana</span>
                </span>
                <span className="why">
                  "Inscription" or "marking". Scholarly, manuscript-leaning. The seal as a note made in a book. <em>Use if Mudra and Chhaap both feel modern.</em>
                </span>
              </li>
            </ul>
          </div>
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
              Seven screens. One Saved, one Profile, three Mudra, two Referral.
            </h3>
            <p>The Mudra tab carries the map view, the detail of a single seal, and the journal page. Referral carries the sender's home and the recipient's invitation — both private surfaces, no social proof.</p>
          </div>
        </div>
        <div className="index__grid">
          {INDEX.map(item => (
            <button key={item.id} className={`index__cell ${activeIndex === item.id ? 'on' : ''}`} onClick={() => setActiveIndex(item.id)}>
              <div className="index__thumb"></div>
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
