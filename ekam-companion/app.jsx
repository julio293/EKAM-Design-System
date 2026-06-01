/* global React, ReactDOM */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Chapter VI · Companion · main app
// ════════════════════════════════════════════════════════════════
const { useState } = React;

const SCREEN_NOTES = {
  home: {
    step: 'Companion · 01',
    h: 'A home screen that knows the time of day.',
    sub: 'Forest gradient with a slow window-glow. Greeting · moment · next thing · weather · letter · host on one tap.',
    rationale: [
      { l: 'Ambient art',     v: <>SVG ridge gradient with a clay <em>cabin window light</em> that gently pulses (6s loop). The only motion in the entire app.</> },
      { l: 'Time-aware greeting', v: <>"<strong>Morning, Anika.</strong>" — the only place the user is greeted by name. Updates by time-of-day, not by tap.</> },
      { l: 'The moment',      v: <>One italic line about <em>right now</em>: "<em>The kettle's on the stove. The monal called from the ridge at 5:42.</em>" Authored daily by the host.</> },
      { l: 'Next thing card', v: <>Sand-block with clay rule. <strong>Fire-pit dinner · Tonight at 7 · cedar smoke.</strong> The only upcoming event shown — never a feed of options.</> },
      { l: 'Trio numbers',    v: <>Weather · sunrise tomorrow · nights remaining. Numbers, not icons. Hairline-divided. Calm orientation.</> },
      { l: 'Host as a button',v: <>The host is the primary action. <em>"Aarav · One tap · 7am — 9pm."</em> The relationship is real; the contact is direct.</> },
    ],
  },
  cabin: {
    step: 'Companion · 02',
    h: 'Practical, in the open. Wi-Fi, by reluctance.',
    sub: 'Gate code as the headline. Hot water pills. Pantry list. Wi-Fi credentials hidden behind a Reveal.',
    rationale: [
      { l: 'Gate as headline',v: <>The most-used surface in the cabin gets the most-prominent slot. <strong>2 · 8 · 1 · 1</strong> in 64-point display serif on ink.</> },
      { l: 'Hot water pills', v: <>Two windows. Two pills. <em>"Two windows daily — request otherwise on the day."</em> The cabin runs on a wood-fed geyser; honesty matters.</> },
      { l: 'Pantry list',     v: <>Five items, two columns, dashed dividers. <em>"Topped up daily. Take what you like."</em> The cabin is yours.</> },
      { l: 'Wi-Fi by reveal', v: <>Credentials hidden behind a tap. <em>"Only in the reading corner. By design."</em> The cabin is off-grid by choice; the app honours that choice.</> },
    ],
  },
  today: {
    step: 'Companion · 03',
    h: 'A loose schedule. None of it is mandatory.',
    sub: 'Nine entries today; two for tomorrow. Sky events in moss. Booked events in clay. Open hours in ink.',
    rationale: [
      { l: 'Three kinds',     v: <><strong>Sky</strong> (sunrise, sunset) · <strong>Cabin</strong> (hot water, breakfast) · <strong>Booked</strong> (the things the user chose). Three tones, never more.</> },
      { l: 'Sky in moss',     v: <>Sunrise and sunset get a moss <em>— Sky</em> tag and a quieter time. They are reminders, not appointments.</> },
      { l: 'Booked in clay',  v: <>Fire-pit dinner is clay-tagged <em>— Booked</em>. The user knows what they chose; the rest is invitation.</> },
      { l: 'Tomorrow strip',  v: <>Two things only. Even tomorrow is not a feed. <em>"5:45 · Birdwalk with Tashi."</em> Enough.</> },
    ],
  },
  trails: {
    step: 'Companion · 04',
    h: 'Three walks, drawn from the cabin.',
    sub: 'Hand-styled topographic glyphs · distance, time, difficulty · one editorial sentence.',
    rationale: [
      { l: 'Glyphs not maps', v: <>An SVG topographic outline with a dotted trail and a clay cabin pin. Not Google Maps — a printed strip from a field guide.</> },
      { l: 'Three only',      v: <>Ridge · Oak · Stream. Never twelve. The cabin has three good walks; the app respects the boundary.</> },
      { l: 'Editorial line',  v: <>Not <em>"Easy 2.4km loop"</em>. <strong>"Loops above the cabin to the Zero Point ridge. The monal nests here."</strong></> },
      { l: 'Foot note',       v: <>"<em>The map is printed and left under your cup each morning.</em>" The physical artifact is the source of truth; the app mirrors it.</> },
    ],
  },
  kitchen: {
    step: 'Companion · 04',
    h: 'A small kitchen, in your phone.',
    sub: 'Complimentary first. Chai at the top of the orderable list. A tiffin for the day. A short à-la-carte. Tray pinned at the bottom.',
    rationale: [
      { l: 'Complimentary first', v: <>The first surface lists what is <strong>already free in the cabin</strong>. The guest knows before they scroll: filter coffee, three teas, oats, jam, spring water. <em>No charge.</em></> },
      { l: 'EKAM चाय on top',     v: <>Chai is the headline of the orderable menu. Five options, satvik. Three are <em>on the house</em>; two are paid. <strong>The chai pill is the specialty.</strong></> },
      { l: 'Tiffin as a meal',    v: <>One set thali a day — today's Kumaoni. Five course lines, numbered. <strong>Time-slot pills</strong> for delivery (12:30, 1:00, 1:30). Single Add-to-tray button.</> },
      { l: 'À la carte, short',   v: <>Five items only. Aloo paratha · Maggi · omelette · soup · khichdi. <em>"We add nothing the cabin team isn't cooking for themselves."</em></> },
      { l: 'Tray, not cart',      v: <>Sticky bottom strip — <strong>"3 on the tray · ₹780"</strong>. Becomes <em>"On the house"</em> if everything is complimentary. Place order CTA, never a cart icon.</> },
      { l: 'No upsell language',  v: <>No "Pair with…", no "Customers also ordered". The kitchen suggests; it never sells. The footnote: <em>"If something on the menu is not right for you, tell Aarav."</em></> },
      { l: 'Stepper on tap',      v: <>Tap + to add. Once in the tray, the row shows a stepper (− qty +). The clay fill marks what's already coming. <strong>WCAG 44px taps.</strong></> },
    ],
  },
  rituals: {
    step: 'Companion · 05',
    h: 'Three quiet things.',
    sub: 'A morning tea. An evening journal prompt. Twenty minutes of forest sound.',
    rationale: [
      { l: 'Tea triad',       v: <>Three teas, no recipes — only timing notes. The cabin has all three; the user picks. <em>No "Start brewing" timer.</em></> },
      { l: 'Daily prompt',    v: <>One line per day. Day 2's prompt: <em>"Name three sounds you have heard since arriving."</em> A pencil sits beside the bed.</> },
      { l: 'Forest audio',    v: <>Three field recordings (8 · 12 · 20 minutes). Plays via the cabin's speaker. <strong>Field-recorded on site.</strong> No Spotify mood playlist.</> },
      { l: 'No streaks',      v: <>No daily-prompt streak. No tea-completion badge. Each day is its own — the ritual is in the doing, not in the counting.</> },
    ],
  },
  notes: {
    step: 'Companion · 06',
    h: 'Letters from the cabin, not notifications.',
    sub: '"Foggy mornings expected tomorrow." Sand-block cards. No badge counters, no inbox zero.',
    rationale: [
      { l: 'Renaming',         v: <>Notifications → <strong>Letters</strong>. The artifact is editorial; the app is the inbox.</> },
      { l: 'Author named',     v: <>Each letter is signed: <em>"From Aarav"</em> or <em>"From the cabin"</em>. The user knows who wrote it, always.</> },
      { l: 'No push',          v: <><em>"You will never get a push notification during your stay."</em> Letters live here, the user opens them when they want.</> },
      { l: 'Examples',         v: <><em>"The monal was on the deck rail at 5:42."</em> · <em>"The mountains are especially clear tonight."</em> · <em>"Bonfire begins at 7."</em></> },
    ],
  },
  reach: {
    step: 'Companion · 07',
    h: 'If you need us. Four ways, no queues.',
    sub: 'Host as the headline (sand block + clay call/message buttons). Cabin team, gate, clinic below.',
    rationale: [
      { l: 'Host headline',    v: <>Sand block with two clay-filled action circles: <strong>Call</strong> + <strong>Message</strong>. The host is the first surface, always.</> },
      { l: 'No ticket form',   v: <>No "Submit issue", no "Estimated response 24 hours". Aarav picks up; the cabin team picks up; the clinic answers.</> },
      { l: 'Editorial details',v: <>"<em>Aarav can drive you · any hour.</em>" The clinic isn't a phone number — it's a relationship and a car.</> },
      { l: 'No SLA language',  v: <>The footnote is the assurance: <em>"Aarav is on site. The cabin team is in the next building."</em> Proximity replaces support tiers.</> },
    ],
  },
};

const INDEX = [
  { id: 'home',    n: '01', name: 'Home',    dev: 'घर',     meta: 'Ambient · time-aware · host one-tap' },
  { id: 'cabin',   n: '02', name: 'Cabin',   dev: 'कुटी',   meta: 'Gate code · water · pantry · Wi-Fi' },
  { id: 'kitchen', n: '03', name: 'Kitchen', dev: 'अन्न',   meta: 'Chai · tiffin · à la carte · complimentary' },
  { id: 'trails',  n: '04', name: 'Trails',  dev: 'पथ',     meta: 'Three walks · drawn glyphs' },
  { id: 'rituals', n: '06', name: 'Rituals', dev: 'क्रिया', meta: 'Tea · journal · forest sound' },
  { id: 'notes',   n: '07', name: 'Letters', dev: 'पत्र',   meta: 'No notifications · letters only' },
  { id: 'reach',   n: '08', name: 'Reach',   dev: 'सहाय',  meta: 'Host first · no queues' },
];

function Phone({ activeIndex }) {
  return (
    <div className="phone">
      <div className="phone__screen">
        {activeIndex === 'home'    && <window.COMP_HomeScreen   />}
        {activeIndex === 'cabin'   && <window.COMP_CabinScreen  />}
        {activeIndex === 'kitchen' && <window.COMP_KitchenScreen/>}
        {activeIndex === 'trails'  && <window.COMP_TrailsScreen />}
        {activeIndex === 'rituals' && <window.COMP_RitualsScreen/>}
        {activeIndex === 'notes'   && <window.COMP_NotesScreen  />}
        {activeIndex === 'reach'   && <window.COMP_ReachScreen  />}
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
  const [activeIndex, setActiveIndex] = useState('home');
  const note = SCREEN_NOTES[activeIndex] || SCREEN_NOTES.home;

  return (
    <div className="page">
      <header className="page__head">
        <div>
          <span className="page__eyebrow">— EKAM Living · Mobile · Chapter VI</span>
          <div className="page__brand">
            <span className="page__brand-dev">एकम्</span>
            <span className="page__brand-wm">E<span className="dot"></span>KAM</span>
          </div>
          <h1 className="page__title">Companion — the in-stay layer. Airbnb's trip features, rebuilt as a quiet presence in the cabin.</h1>
          <p className="page__lede">
            Seven screens for the days a guest is in the cabin. A home screen with a slow window-glow. A cabin tab where the gate code is bigger than the brand. A schedule where sunrise has the same weight as dinner. Three trails, not twelve. A tea triad, a journal prompt, twenty minutes of field recording. <strong>Letters in place of notifications.</strong> The host as the first action, always.
          </p>
        </div>
        <div className="page__meta">
          <span>Version <b>0.1 · draft</b></span>
          <span>Screens · <b>7</b></span>
          <span>Builds on · <b>Chapter V</b></span>
        </div>
      </header>

      {/* Translation map */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="intro">
          <div className="col-lbl">
            <span className="page__eyebrow">— The in-stay layer</span>
            <span className="intro__dev">कुटीर · the cabin</span>
          </div>
          <div>
            <h3>Eight trip-app mechanics, eight EKAM rewrites.</h3>
            <p>The companion is the chapter Airbnb does not have. It runs only while the guest is on site, and disappears when the stay ends.</p>
          </div>
        </div>

        <div className="pattern">
          <div className="pattern__head">
            <div>Airbnb / OTA mechanic</div><div>EKAM expression</div><div>Why</div>
          </div>
          {[
            ['Digital check-in (key code)',     'Gate code, in 64pt display',         'The most-used surface, given the most-prominent slot. The cabin door and gate share the code.'],
            ['Trip itinerary (list of bookings)', 'Today · a loose schedule',         'Sky events have the same weight as meals. Booked things are clay. Open hours are blank.'],
            ['Local recommendations (Resy/Yelp)', 'Three trails from the cabin',     'Not "places near you". Three walks from this cabin\'s door, with the host\'s editorial note.'],
            ['Support chat (24/7 helpdesk)',     'Reach · host as the first action', 'The host has a name (Aarav), hours (7am-9pm), and one tap. The clinic gets a driver, not a phone number.'],
            ['Push notifications',                'Letters · written by hand',        'No push during stays. Letters are signed by the cabin or the host, and live in a feed the user opens.'],
            ['Streak counters · daily prompts',   'A pencil beside the bed',          'No streak. No completion badge. The prompt is one line a day; the writing is on paper.'],
            ['Spotify playlists',                  'Three field recordings · on site',  'Twenty minutes of cedar wind, recorded at this cabin. Not a Calm-app meditation track.'],
            ['Booking reminders · "Book again"',  'No reminders during the stay',     'The stay is the priority. The next booking is a question for after the guest has gone home.'],
          ].map((r, i) => (
            <div className="pattern__row" key={i}>
              <div className="pattern__from">{r[0]}</div>
              <div className="pattern__to">{r[1]}</div>
              <div className="pattern__why">{r[2]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Stage */}
      <section>
        <div className="intro" style={{ marginBottom: 28 }}>
          <div className="col-lbl">
            <span className="page__eyebrow">— The prototype</span>
            <span className="intro__dev">साथ · in company</span>
          </div>
          <div>
            <h3>Tap through the seven screens. The Home has slow ambient motion; the Cabin has a reveal-on-tap Wi-Fi.</h3>
            <p>The Rituals page has three playable audio cards (state-only — they don't actually play). The Notes page proves the no-notifications rule: every letter lives in the feed, signed by the cabin or the host.</p>
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
            <Phone activeIndex={activeIndex} />
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
              Seven screens. The Companion replaces the regular app shell during a stay.
            </h3>
            <p>The Companion is what the guest sees on their phone for the three nights they are at Binsar. After check-out, it reverts to the standard Home / Discover / Saved shell of Chapters II and V — and Mudra retains the seal that arrived in the post.</p>
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
