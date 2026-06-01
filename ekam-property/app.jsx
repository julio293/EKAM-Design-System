/* global React, ReactDOM */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Property & Booking · main app
// ════════════════════════════════════════════════════════════════
const { useState } = React;

// Strategic notes per screen
const SCREEN_NOTES = {
  hero: {
    step: 'Property · 01',
    h: 'A postcard, not a listing.',
    sub: 'Hero is the cabin\'s mood at one specific hour. Caption strip carries name + tier + region.',
    rationale: [
      { l: 'Hero gallery',  v: <>Tall <em>4:5</em> aspect, swipe rail. Each slide is a <strong>moment</strong> ("Forest light · early morning"), never a label.</> },
      { l: 'Window glow',   v: <>The <em>only</em> warm pixel on the hero. Sits where the cabin window actually is. Reads as firelight, not branding.</> },
      { l: 'Devanagari',    v: <>The <em>कुटीर</em> mark sits in the caption strip, never on the photo. Photo is sacred ground.</> },
      { l: 'Floating chrome', v: <>Back · share · save float above the photo. Glass blur, not solid pills. <strong>Saved</strong> uses the clay fill — no other state earns it.</> },
      { l: 'Meta row',      v: <>Three numbers, hairline-divided: rating, weather, drive time. No icons. Numbers do the work.</> },
      { l: 'Book bar',      v: <>Sticky bottom. Two stacked lines: <em>seasonal urgency</em> + price/dates. The Reserve button is the only saturated colour.</> },
    ],
  },
  included: {
    step: 'Property · 02',
    h: 'Trust by listing, not by promise.',
    sub: 'Six things included, four rituals optional. Numbers, not icons.',
    rationale: [
      { l: 'Included',     v: <>Six rows, numbered 01–06. Caveat: each <em>sub</em> is a sentence, not a feature. "<strong>Pantry kit</strong> — filter coffee, three teas, oats, jam, local honey."</> },
      { l: 'No icons',     v: <>Generic UI icons would flatten the editorial tone. The number is the only visual; the sentence carries the weight.</> },
      { l: 'Rituals rail', v: <>Optional add-ons, horizontal scroll, four cards. <strong>Breakfast included</strong>, others priced per cabin or per person. <em>"Moment"</em> chip on each: when it happens.</> },
      { l: 'No marketing', v: <>Never <em>"Treat yourself"</em>. The ritual sells itself by being there. "Birdwalk with Tashi · 6am · day 2."</> },
    ],
  },
  reviews: {
    step: 'Property · 03',
    h: 'Two quotes, not twenty.',
    sub: 'Themed pull-quotes do the trust-building work. Category ratings give the math.',
    rationale: [
      { l: 'Themed quotes', v: <>Two cards. Each has a <em>theme</em> ("The quiet", "Host care") and a one-line attribution ("3 nights · Workcation"). The body text is a real sentence.</> },
      { l: 'Ratings panel', v: <>Big <em>4.96</em> on the left, four named categories on the right. Categories renamed: <strong>Cabin-fresh</strong> not Cleanliness, <strong>Worth it</strong> not Value.</> },
      { l: 'Host strip',    v: <>Sand block, clay avatar, two lines: tenure + response time. Aarav is a person, not a chat agent.</> },
    ],
  },
  sheet: {
    step: 'Booking · 04',
    h: 'A multi-stage sheet, not a separate screen.',
    sub: 'Dates and guests collapsed at the top. Rituals and breakdown below. Confirm pinned at the foot.',
    rationale: [
      { l: 'Sheet rise',    v: <>380ms cubic-bezier slide. Body scrolls; head and foot stay pinned. Title shows nights count + cabin name.</> },
      { l: 'Best value',    v: <>Sand block, clay rule on the left. Fires only when 2+ weekend nights are in range. Reads as a hint, not a discount.</> },
      { l: 'Weekend pricing', v: <>Breakdown shows weekday × N and weekend × N as <strong>separate lines</strong> — guests learn the model without us explaining it.</> },
      { l: 'Rituals strip', v: <>Mini horizontal rail inside the sheet. Selected ones get a clay border + check. Selected count shows in the head.</> },
      { l: 'Trust line',    v: <>Single row above the breakdown. Shield icon. <em>"Free cancellation up to 7 days before. No payment held."</em></> },
      { l: 'Confirm',       v: <>Total prominent in the CTA. Hint below: "No payment yet — we hold the cabin for 24 hours." <strong>The promise is the conversion mechanic.</strong></> },
    ],
  },
  popover: {
    step: 'Booking · 05',
    h: 'Smart capacity, mandatory ages, dignified language.',
    sub: 'Sits as a higher layer over the booking sheet. Closes back into the sheet.',
    rationale: [
      { l: 'Three rows',     v: <>Adults · Children · Cabins. Same vocabulary throughout. <strong>Children</strong> not Kids. <strong>Cabins</strong> not Rooms.</> },
      { l: 'Mandatory ages', v: <>Every child gets an age card. <strong>Clay border until set.</strong> The "Done" button stays disabled until every age is selected — the booking depends on it.</> },
      { l: 'Under-5 pill',   v: <>Quiet bone chip on the Children row. "<em>Under 5 free</em>" — sets expectation before they see the price.</> },
      { l: 'Try N pill',     v: <>Clay chip on the Cabins row when the user's count is below the recommendation. Tells them how many to set without forcing it.</> },
      { l: 'Capacity smart card', v: <>Sand block at the bottom of the popover. Family / Recommended / Over-capacity strategies — each with copy that explains <em>why</em>, not what.</> },
    ],
  },
  lead: {
    step: 'Booking · 06',
    h: 'The lead guest — for myself, or for someone else.',
    sub: 'A two-state segmented control. Self is pre-selected. Switch to "someone else" reveals a contact picker (Uber pattern) above manual fields.',
    rationale: [
      { l: 'Default is self',  v: <>The most common case is pre-selected with a sand block showing the signed-in user — name, email, phone, country. Single tap to <em>Edit profile</em> if anything is wrong.</> },
      { l: 'Toggle, not radio',v: <><strong>For myself · For someone else</strong> as a segmented pill. Ink-fill on the active side, moss on the dormant. The toggle is the single decision.</> },
      { l: 'Contact picker',   v: <>Primary path when booking for someone else — Uber-style. <strong>"Pick from your contacts"</strong> as the hero card with the avatar glyph and an italic privacy note: <em>"We only read who you choose · never the whole book."</em></> },
      { l: 'Manual fallback',  v: <>An <em>"— or type the details"</em> divider, then a tight form: first/last/phone+cc/email (optional). Inputs use placeholder italic for hints, clay border on focus.</> },
      { l: 'Picker as sheet',  v: <>A 80%-height bottom sheet rises with a list of contacts, search bar, and a footer line: <em>"Your phone book stays on your phone."</em> Picking one fills the lead card.</> },
      { l: 'Save toggle',      v: <>Opt-in checkbox: <em>"Save these details for faster booking next time. Stored on your device only."</em> The brand promise is in the small print.</> },
      { l: 'CTA copy',         v: <><strong>Hold the cabin · 24 hours</strong> — not "Book now" or "Confirm". The brand sells the promise (no payment yet, freely cancellable) as the conversion mechanic.</> },
    ],
  },
  confirmed: {
    step: 'Post-booking · 06',
    h: 'The companion handoff — the moment the brand becomes a place.',
    sub: 'Forest gradient, clay accents, the confirmation feels like an arrival, not a receipt.',
    rationale: [
      { l: 'Quiet check',    v: <>One clay outline check inside a circle. No animation. The moment is calm, not celebratory.</> },
      { l: 'Confirmation code', v: <>Letter-spaced, ink + clay dashed border. Reads as a postcard stamp, not a transaction ID.</> },
      { l: 'Four-step list', v: <>What the companion opens, numbered 01–04. <strong>Itinerary · Aarav · Check-in · Daily ritual.</strong> Each a single line.</> },
      { l: 'Primary action', v: <>"Open the companion" — clay pill. Secondary: "<em>View itinerary later</em>" — ghost. The companion is the home screen between now and arrival.</> },
      { l: 'No "share with friends"', v: <>The confirmation is private. Sharing happens on the property page; this screen is between the guest and us.</> },
    ],
  },
};

// Tab index for the prototype stage
const INDEX = [
  { id: 'hero',      n: '01', name: 'Hero',       meta: 'Mood photo · meta · book bar', dev: 'पहला' },
  { id: 'included',  n: '02', name: 'Included',   meta: 'Six things + retreat rituals', dev: 'सब' },
  { id: 'reviews',   n: '03', name: 'Reviews',    meta: 'Themed quotes · host',         dev: 'मन' },
  { id: 'sheet',     n: '04', name: 'Book sheet', meta: 'Dates · pricing · rituals',     dev: 'अभी' },
  { id: 'popover',   n: '05', name: 'Guests',     meta: 'Smart capacity · ages',        dev: 'कौन' },
  { id: 'lead',      n: '06', name: 'Lead guest', meta: 'Self / someone else · contacts', dev: 'नाम' },
  { id: 'confirmed', n: '07', name: 'Confirmed',  meta: 'Companion handoff',             dev: 'स्वागत' },
];

function Phone({ activeIndex, saved, toggleSave }) {
  const PROPS = { saved, onToggleSave: toggleSave };
  return (
    <div className="phone">
      <div className="phone__screen">
        {activeIndex === 'hero'      && <window.PDP_HeroScreen      {...PROPS} />}
        {activeIndex === 'included'  && <window.PDP_IncludedScreen  {...PROPS} />}
        {activeIndex === 'reviews'   && <window.PDP_ReviewsScreen   {...PROPS} />}
        {activeIndex === 'sheet'     && <window.PDP_BookingSheet    {...PROPS} />}
        {activeIndex === 'popover'   && <window.PDP_GuestPopover    {...PROPS} />}
        {activeIndex === 'lead'      && <window.PDP_LeadGuestScreen />}
        {activeIndex === 'confirmed' && <window.PDP_ConfirmedScreen />}
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

// Tiny thumbnail render per screen (for the index strip)
function Thumb({ kind }) {
  const cream = 'var(--cream)';
  const bone  = 'var(--bone)';
  const fg    = 'var(--forest)';
  const bd    = 'var(--bindu)';
  const sand  = 'var(--sand)';

  if (kind === 'hero') {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: '0 0 60%', background: 'linear-gradient(180deg, #0c1410 0%, #1F3525 30%, #2B4630 60%, #6a7565 100%)', position: 'relative' }}>
          <span style={{ position: 'absolute', width: 4, height: 3, background: '#d68763', boxShadow: '0 0 14px 3px rgba(214,135,99,0.6)', left: '72%', top: '64%' }} />
        </div>
        <div style={{ flex: 1, padding: '6px 8px', background: cream }}>
          <div style={{ fontFamily: 'var(--font-devanagari)', fontSize: 5, color: bd }}>कुटीर</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, color: fg, marginTop: 1 }}>Binsar.</div>
          <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 4, color: 'var(--moss)' }}>Kumaon · 2,400 m</div>
          <div style={{ height: 1, background: bone, margin: '3px 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
            <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 5, color: fg }}>4.96</div><div style={{ fontSize: 3, color: bd }}>STAYS</div></div>
            <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 5, color: fg }}>14°/4°</div><div style={{ fontSize: 3, color: bd }}>TODAY</div></div>
            <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 5, color: fg }}>1 hr</div><div style={{ fontSize: 3, color: bd }}>ALMORA</div></div>
          </div>
          <div style={{ marginTop: 'auto', position: 'absolute', bottom: 6, left: 8, right: 8, background: cream, borderTop: `1px solid ${bone}`, padding: '3px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 6, color: fg }}>₹8,400</div>
            <div style={{ background: bd, padding: '1px 5px', color: cream, fontSize: 3, borderRadius: 999 }}>RESERVE</div>
          </div>
        </div>
      </div>
    );
  }
  if (kind === 'included') {
    return (
      <div style={{ position: 'absolute', inset: 0, padding: '14% 9%', background: cream, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 3, color: bd, letterSpacing: 0.5 }}>— INCLUDED</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 6, color: fg, lineHeight: 1.15 }}>Six things, included.</div>
        {[1,2,3,4].map(i => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '8px 1fr', gap: 4, padding: '2px 0', borderBottom: `1px solid ${bone}` }}>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 5, color: bd }}>0{i}</span>
            <div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 3.5, color: fg, fontWeight: 500 }}>Thing {i}</div>
              <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 3, color: 'var(--moss)' }}>A short line about it.</div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 4, fontFamily: 'var(--font-ui)', fontSize: 3, color: bd }}>— RITUALS</div>
        <div style={{ display: 'flex', gap: 2 }}>
          <div style={{ flex: 1, height: 18, background: 'linear-gradient(180deg, #1F3525, #4a5a44)', borderRadius: 1 }} />
          <div style={{ flex: 1, height: 18, background: 'linear-gradient(180deg, #14201A, #c9853c)', borderRadius: 1 }} />
        </div>
      </div>
    );
  }
  if (kind === 'reviews') {
    return (
      <div style={{ position: 'absolute', inset: 0, padding: '14% 9%', background: cream, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 3, color: bd }}>— AFTER THEY LEFT</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 6, color: fg }}>What guests said.</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 3, padding: '3px 0', borderBottom: `1px solid ${bone}` }}>
          <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 10, color: fg }}>4.96</div></div>
          <div>{[1,2,3].map(i => (<div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 3, color: fg }}><span>Cabin-fresh</span><span>4.98</span></div>))}</div>
        </div>
        <div style={{ padding: 3, background: sand, borderLeft: `1.5px solid ${bd}`, marginTop: 3 }}>
          <div style={{ fontSize: 3, color: bd }}>— THE QUIET</div>
          <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 4, color: fg, lineHeight: 1.3, marginTop: 1 }}>"We did not check our phones for four days."</div>
        </div>
        <div style={{ display: 'flex', gap: 3, alignItems: 'center', padding: 3, background: sand, marginTop: 3 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: bd, color: cream, fontSize: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)' }}>A</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 4, color: fg }}>Aarav</div>
            <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 3, color: 'var(--moss)' }}>Resident · since 2023</div>
          </div>
        </div>
      </div>
    );
  }
  if (kind === 'sheet') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,32,26,0.6)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: '0 0 22%', background: 'linear-gradient(180deg, #1F3525, #2B4630)' }} />
        <div style={{ flex: 1, background: cream, borderRadius: '5px 5px 0 0', padding: '4px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: 8, height: 1, background: bone, margin: '1px auto', borderRadius: 999 }} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 5, color: fg }}>Your stay · 3 nights</div>
          <div style={{ height: 1, background: bone, margin: '2px 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: `1px solid ${bone}` }}>
            <div style={{ padding: 2, borderRight: `1px solid ${bone}` }}><div style={{ fontSize: 2.5, color: bd }}>ARRIVE</div><div style={{ fontSize: 3, color: fg }}>12 Mar</div></div>
            <div style={{ padding: 2 }}><div style={{ fontSize: 2.5, color: bd }}>DEPART</div><div style={{ fontSize: 3, color: fg }}>15 Mar</div></div>
          </div>
          <div style={{ padding: 2, border: `1px solid ${bone}` }}><div style={{ fontSize: 2.5, color: bd }}>GUESTS</div><div style={{ fontSize: 3, color: fg }}>2 adults · 1 cabin</div></div>
          <div style={{ padding: 2, background: sand, borderLeft: `1.5px solid ${bd}` }}><div style={{ fontSize: 2.5, color: bd }}>— BEST VALUE</div><div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 3, color: fg, lineHeight: 1.3 }}>2 weekend nights. Shift Mon-Thu, save ₹2.5k.</div></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 3, color: fg }}><span>Weekend × 2</span><span>₹19,320</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${bone}`, paddingTop: 2, fontFamily: 'var(--font-display)', fontSize: 5, color: fg }}><span>Total</span><span>₹28,170</span></div>
          <div style={{ marginTop: 'auto', background: bd, color: cream, textAlign: 'center', padding: 2, fontSize: 3, borderRadius: 999 }}>CONFIRM</div>
        </div>
      </div>
    );
  }
  if (kind === 'popover') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,32,26,0.75)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: '0 0 15%' }} />
        <div style={{ flex: 1, background: cream, borderRadius: '5px 5px 0 0', padding: '4px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: 8, height: 1, background: bone, margin: '1px auto', borderRadius: 999 }} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 5, color: fg }}>Guests &amp; cabins.</div>
          <div style={{ height: 1, background: bone }} />
          {['Adults','Children','Cabins'].map(r => (
            <div key={r} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0', borderBottom: `1px solid ${bone}` }}>
              <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 4, color: fg }}>{r}</div></div>
              <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <span style={{ width: 4, height: 4, border: `0.5px solid ${fg}`, borderRadius: '50%' }} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 4, color: fg }}>{r === 'Adults' ? 2 : r === 'Cabins' ? 1 : 1}</span>
                <span style={{ width: 4, height: 4, border: `0.5px solid ${fg}`, borderRadius: '50%' }} />
              </div>
            </div>
          ))}
          <div style={{ padding: 3, background: sand }}>
            <div style={{ fontSize: 2.5, color: bd }}>— SET AGE</div>
            <div style={{ display: 'flex', gap: 2, marginTop: 1 }}>
              <div style={{ flex: 1, padding: 2, border: `1px solid ${bd}` }}><div style={{ fontSize: 2.5, color: bd }}>CHILD 1</div><div style={{ fontSize: 3, color: fg }}>—</div></div>
              <div style={{ flex: 1, padding: 2, border: `1px solid ${bone}` }}><div style={{ fontSize: 2.5, color: 'var(--moss)' }}>CHILD 2</div><div style={{ fontSize: 3, color: fg }}>7 yr</div></div>
            </div>
          </div>
          <div style={{ marginTop: 'auto', background: 'var(--mist)', color: 'var(--moss)', textAlign: 'center', padding: 2, fontSize: 3, borderRadius: 999 }}>SET AGES</div>
        </div>
      </div>
    );
  }
  if (kind === 'confirmed') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #14201A 0%, #1F3525 100%)', padding: '14% 9%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2 }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 3, color: bd }}>— RESERVED</div>
        <div style={{ width: 12, height: 12, border: `1px solid ${bd}`, borderRadius: '50%', margin: '2px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: bd, fontSize: 7 }}>✓</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 5, color: cream, lineHeight: 1.15 }}>Your companion <em style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: bd }}>is ready.</em></div>
        <div style={{ padding: 3, border: `0.5px dashed rgba(180,97,58,0.4)`, background: 'rgba(180,97,58,0.1)', marginTop: 3 }}>
          <div style={{ fontFamily: 'var(--font-display)', color: cream, letterSpacing: 1, fontSize: 5 }}>EKM · 7842</div>
        </div>
        <div style={{ marginTop: 4, alignSelf: 'stretch' }}>
          {['Itinerary','Aarav','Check-in','Daily ritual'].map((x, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '8px 1fr', gap: 3, padding: '1.5px 0', borderBottom: '1px solid rgba(236,228,211,0.18)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 4, color: bd }}>0{i+1}</span>
              <span style={{ fontSize: 3, color: cream }}>{x}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', background: bd, color: cream, textAlign: 'center', padding: 2, fontSize: 3, borderRadius: 999, width: '100%' }}>OPEN COMPANION</div>
      </div>
    );
  }
  return null;
}

function App() {
  const [activeIndex, setActiveIndex] = useState('hero');
  const [saved, setSaved] = useState(true); // start saved; this PDP is reachable from saved list
  const toggleSave = () => setSaved(s => !s);
  const note = SCREEN_NOTES[activeIndex] || SCREEN_NOTES.hero;

  return (
    <div className="page">
      <header className="page__head">
        <div>
          <span className="page__eyebrow">— EKAM Living · Mobile · Chapter III</span>
          <div className="page__brand">
            <span className="page__brand-dev">एकम्</span>
            <span className="page__brand-wm">E<span className="dot"></span>KAM</span>
          </div>
          <h1 className="page__title">Property &amp; Booking — Airbnb mechanics, retranslated as a postcard with a checkout.</h1>
          <p className="page__lede">
            Six screens. Three on the property page (Hero · Included · Reviews), two in the booking sheet (Sheet · Guest popover), and one for the post-booking moment (Companion handoff). Smart capacity, weekend pricing, child-age handling, and a quiet confirmation that opens into the in-cabin companion.
          </p>
        </div>
        <div className="page__meta">
          <span>Version <b>0.3 · draft</b></span>
          <span>Screens · <b>6</b></span>
          <span>Builds on · <b>home v0.5</b></span>
        </div>
      </header>

      {/* Translation map — Airbnb mechanic → EKAM expression */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="intro">
          <div className="col-lbl">
            <span className="page__eyebrow">— Booking mechanics</span>
            <span className="intro__dev">अभी · now</span>
          </div>
          <div>
            <h3>Eight Airbnb mechanics, eight EKAM rewrites.</h3>
            <p>The mechanics translate cleanly. The vocabulary is where retreat begins.</p>
          </div>
        </div>

        <div className="pattern">
          <div className="pattern__head">
            <div>Airbnb mechanic</div><div>EKAM expression</div><div>Why</div>
          </div>
          {[
            ['Hero photo carousel',          'Cabin mood gallery',        'Each slide is a moment with a caption ("Forest light · early morning"), never a label like "Bedroom 1".'],
            ['Listing title + meta',         'Postcard caption strip',    'Devanagari mark + tier + name + region. The italic display face says retreat; ui sans handles the numbers.'],
            ['Amenities checklist',          'Six things, included',      'Numbered 01–06. No icons. Each line is a sentence, not a feature tag.'],
            ['Experiences',                  'Retreat rituals',           'Optional add-ons sold by feeling. Each card has a "moment" (when), a price, and an editorial name.'],
            ['Review rail (long list)',      'Two themed pull-quotes',    'Each carries a theme and a one-line attribution. Long lists kill conversion confidence; quotes build it.'],
            ['Sticky Reserve bar',           'Book bar with urgency',     'Seasonal urgency line above, price + dates below. The Reserve is the only saturated colour on the screen.'],
            ['Guest selector dropdown',      'Guest popover · two-layer', 'Sheet over the booking sheet. Adults, children with ages, cabins — each row carries a quiet recommendation.'],
            ['Booking confirmation page',    'Companion handoff',         'Not a receipt. A handoff into the in-cabin companion app. The booking ends; the relationship begins.'],
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
            <span className="intro__dev">कुटीर · the cabin</span>
          </div>
          <div>
            <h3>Tap through the six screens. Smart capacity, mandatory ages, and weekend pricing are all live.</h3>
            <p>The guest popover validates capacity in real time — try increasing adults beyond two to see the cabin recommendation. The save heart on the hero header is live; the saved state persists across screens.</p>
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
            <Phone activeIndex={activeIndex} saved={saved} toggleSave={toggleSave} />
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
              Six screens. Three pages, one sheet, one popover, one handoff.
            </h3>
            <p>The property page itself is one scroll; we surface it here as three frames for readability. The booking sheet is a single component with a popover layer. The companion handoff replaces the legacy "confirmed" page entirely.</p>
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
