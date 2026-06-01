/* global React */
// ═══════════════════════════════════════════════════════════════
// STRATEGIC FOUNDATION — the document that frames the prototype
// ═══════════════════════════════════════════════════════════════

const TRANSLATIONS = [
  {
    from: 'Wishlist',
    to: 'Saved Escapes',
    why: 'A wishlist is a list of things you want to buy. A saved escape is a future state of mind — held until it is time.',
  },
  {
    from: 'Experiences',
    to: 'Retreat Rituals',
    why: 'Dawn walk. Forest sit. Tea at the chai pavilion. Rituals are repeated; experiences are consumed.',
  },
  {
    from: 'Travel categories',
    to: 'Escape Collections',
    why: '"For stillness," "Above the cloud," "Work from the mountains" — collections curated emotionally, not by amenity grid.',
  },
  {
    from: 'Hosts',
    to: 'Naturalists',
    why: 'Tashi knows the bird, the path, the weather. A naturalist is a host who reads the land first.',
  },
  {
    from: 'Reviews & ratings',
    to: 'Guest letters',
    why: 'Past guests write a single line about what the place did to them. No star ratings on stillness.',
  },
  {
    from: '"Book now" / urgency',
    to: '"When you\'re ready"',
    why: 'No counters, no scarcity copy, no flash deals. Calm beats conversion in this category.',
  },
  {
    from: 'Personalized feed',
    to: 'Curated for you',
    why: 'Algorithm informs, the editor decides. Every collection has a sentence written by a human.',
  },
  {
    from: 'Superhost badge',
    to: 'The host hand',
    why: 'A Caveat signature on the welcome card. Trust earned through ritual, not a badge.',
  },
];

const VOICE_RULES = [
  { lbl: 'Person',     val: <>Always <em>you</em>. Never "guests," never "users."</> },
  { lbl: 'Tense',      val: <>Present. <em>The fire is laid. The kettle is on.</em></> },
  { lbl: 'Punctuation',val: <>Period. Comma. Em-dash. <em>No exclamation marks. Ever.</em></> },
  { lbl: 'Casing',     val: <>Sentence case for everything. Title Case reads commercial.</> },
  { lbl: 'Numbers',    val: <>Always with the unit. <em>3,200 m. 14°C. 45 nights.</em></> },
  { lbl: 'Sanskrit',   val: <>एकम् कुटीर वन शिखर — as moments, never as substitute words.</> },
  { lbl: 'Forbidden',  val: <><em>luxury · curated · ultimate · book now · limited time · exclusive</em></> },
];

const PERSONALIZATION = [
  { lbl: 'Collected',  val: <>Travel intent, party, elevation comfort, season. <em>Four lines. No quiz fatigue.</em></> },
  { lbl: 'Inferred',   val: <>Tier preference from elevation. Cabin shortlist from intent + party.</> },
  { lbl: 'Surfaced',   val: <>Three collections on home, ordered by match. Each collection is a sentence, not a label.</> },
  { lbl: 'Editable',   val: <>Every answer is changeable from Profile. The retreat companion learns from past stays.</> },
  { lbl: 'Five-letter rule', val: <><strong>Five messages per stay. No more.</strong> Confirmation · directions · day-before · post-stay letter · 4-week postcard.</> },
  { lbl: 'No nudges',  val: <>No streaks, no "complete your profile," no daily prompts. Stillness is the product.</> },
];

function Foundation() {
  return (
    <section className="strat">

      {/* Intro */}
      <div className="strat__intro">
        <div className="col-lbl">
          <span className="page__eyebrow">— Strategic foundation</span>
          <span style={{ fontFamily: 'var(--font-devanagari)', fontSize: 18, color: 'var(--bindu)', letterSpacing: 1.5, marginTop: 4 }}>आधार · the base</span>
        </div>
        <div>
          <h3>Airbnb solved discovery. We are solving what comes after — the part where the forest decides if you stay.</h3>
          <p>
            EKAM borrows what Airbnb perfected — personalised home, saved lists, curated collections, recently viewed — and translates each pattern into a vocabulary that reads as hospitality, not as marketplace. The mechanics are familiar; the emotional register is not.
          </p>
        </div>
      </div>

      {/* Translation map */}
      <div className="map">
        <div className="map__head">
          <div>Airbnb pattern</div>
          <div>—</div>
          <div>EKAM expression</div>
          <div>Why</div>
        </div>
        {TRANSLATIONS.map((t, i) => (
          <div className="map__row" key={i}>
            <div className="map__from">{t.from}</div>
            <div className="map__arrow">→</div>
            <div className="map__to">{t.to}</div>
            <div className="map__why">{t.why}</div>
          </div>
        ))}
      </div>

      {/* Voice + Personalization */}
      <div className="twocol">
        <div className="panel">
          <div className="panel__head">
            <span className="panel__dev">वाणी</span>
            <span className="panel__title">Voice — what the screens may and may not say</span>
          </div>
          <div className="panel__list">
            {VOICE_RULES.map((r, i) => (
              <div className="panel__row" key={i}>
                <span className="lbl">{r.lbl}</span>
                <span className="val">{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel__head">
            <span className="panel__dev">रुचि</span>
            <span className="panel__title">Personalization — what we collect, what we never do</span>
          </div>
          <div className="panel__list">
            {PERSONALIZATION.map((r, i) => (
              <div className="panel__row" key={i}>
                <span className="lbl">{r.lbl}</span>
                <span className="val">{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

window.Foundation = Foundation;
