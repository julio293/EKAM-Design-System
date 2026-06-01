/* global React, ReactDOM, L */
const { useState, useEffect, useRef, useMemo } = React;

// ============ DATA ============
// ============ DATA ============
// Bucketed stay count — reveals scale, hides exact number from competitors.
// 187 → "100+", 612 → "500+", 1842 → "1,000+", etc.
function bucketStays(n) {
  if (n == null) return '—';
  if (n < 50) return n < 10 ? 'first stays' : `${Math.floor(n / 10) * 10}+ stays`;
  if (n < 100) return '50+ stays';
  if (n < 500) return '100+ stays';
  if (n < 1000) return '500+ stays';
  if (n < 5000) return '1,000+ stays';
  if (n < 10000) return '5,000+ stays';
  return `${Math.floor(n / 1000).toLocaleString('en-IN')},000+ stays`;
}
function bucketNights(n) {
  if (n == null) return '—';
  if (n < 100) return `${Math.floor(n / 50) * 50 || 50}+ nights`;
  if (n < 500) return '100+ nights';
  if (n < 1000) return '500+ nights';
  if (n < 5000) return '1,000+ nights';
  return '5,000+ nights';
}

// ============ PRICING — weekend/weekday + seasonal urgency ============
// Friday and Saturday nights cost 15% more.
function isWeekendNight(date) {
  if (!date) return false;
  const d = date.getDay(); // 0 = Sun, 5 = Fri, 6 = Sat
  return d === 5 || d === 6;
}
function weekendBreakdown(arriveDate, departDate, baseRate) {
  if (!arriveDate || !departDate) return { weekend: 0, weekday: 0, weekendRate: 0, weekdayRate: 0 };
  const weekendRate = Math.round(baseRate * 1.15);
  const weekdayRate = baseRate;
  let weekend = 0, weekday = 0;
  const cur = new Date(arriveDate);
  while (cur < departDate) {
    if (isWeekendNight(cur)) weekend++;
    else weekday++;
    cur.setDate(cur.getDate() + 1);
  }
  return { weekend, weekday, weekendRate, weekdayRate };
}

// Returns urgency object based on current month — rotates with the year.
function seasonalUrgency() {
  const month = new Date().getMonth(); // 0 = Jan
  // [Jan, Feb, ..., Dec]
  const messages = [
    { copy: 'Snowfall season — three windows left before Holi.',         tone: 'snow' },     // Jan
    { copy: 'Last days of clear cold. Rhododendron buds in three weeks.', tone: 'spring' },   // Feb
    { copy: 'Only 2 cabins held for this weekend. Booked four times this week.', tone: 'demand' }, // Mar (current shown)
    { copy: 'Peak rhododendron — monal calling from the ridge at dawn.',  tone: 'spring' },   // Apr
    { copy: 'Last weeks of monal sightings before they climb up.',        tone: 'spring' },   // May
    { copy: 'Pre-monsoon stillness. Forest at its most patient.',         tone: 'calm' },     // Jun
    { copy: 'Monsoon arrival — stone shower, hot pantry, three teas.',    tone: 'monsoon' },  // Jul
    { copy: 'Mid-monsoon — fewer guests, more silence.',                  tone: 'monsoon' },  // Aug
    { copy: 'Post-monsoon clarity. Air rinsed clean for the week.',       tone: 'clear' },    // Sep
    { copy: 'Autumn ridge light — the cabin sits in gold for an hour.',   tone: 'autumn' },   // Oct
    { copy: 'First flurries forecast. Snowfall expected within weeks.',   tone: 'snow' },     // Nov
    { copy: 'Snowfall arriving — only 3 weeks of pre-winter rates.',      tone: 'snow' },     // Dec
  ];
  return messages[month];
}

// Best-value date hint: if 2+ nights are weekend, suggest shifting earlier.
function bestValueHint({ arriveDate, departDate, baseRate }) {
  const wb = weekendBreakdown(arriveDate, departDate, baseRate);
  if (wb.weekend < 2) return null;
  const couldSave = wb.weekend * (wb.weekendRate - wb.weekdayRate);
  if (couldSave < 1000) return null;
  return {
    copy: `Your dates include ${wb.weekend} weekend nights. Arriving Monday instead saves ₹${couldSave.toLocaleString('en-IN')}.`,
    save: couldSave,
  };
}

const PROPERTY = {
  name: 'Binsar',
  tier: 'KUTIR',
  dev: 'कुटीर',
  region: 'Kumaon, Uttarakhand',
  elev: '2,400 m',
  lat: 29.683, lng: 79.747,
  rating: 4.96, reviews: 187,
  hostName: 'Aarav',
  nightly: 8400,
  tagline: 'A stone-floored cabin at the edge of an oak forest. The morning belongs to the monal.',
  desc1: 'Binsar sits inside a wildlife sanctuary the world forgot to ruin. The cabin is small, walked-to, and intentional — stone floor, wood stove, a low platform bed under one large window. The forest does the rest.',
  desc2: 'You will wake to the call of a Himalayan monal before sunrise. You will watch fog drift up from the valley as the kettle warms. There is no WiFi. There is no concierge. There is a kettle, a fire, a window, and the mountain.',
  weather: '14 °C / 4 °C',
  drives: [
    '3 hr from Kathgodam',
    '3 hr from Pantnagar',
    '1 hr from Almora',
    '9 hr from Delhi',
  ],
  highlights: [
    { icon: 'tree', label: 'Forest-facing deck' },
    { icon: 'home', label: 'Private patio' },
    { icon: 'star', label: 'Stargazing' },
    { icon: 'paw',  label: 'Pet friendly' },
    { icon: 'laptop', label: 'Workcation ready' },
  ],
};

// ============ ICONS (inline SVG) ============
const Icon = ({ name }) => {
  const paths = {
    tree:   <path d="M12 2L7 9h3l-3 5h3l-3 5h10l-3-5h3l-3-5h3z"/>,
    home:   <path d="M3 9l9-6 9 6v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 21V12h6v9"/>,
    star:   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>,
    paw:    <><circle cx="5" cy="11" r="2"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="6" r="2"/><circle cx="19" cy="11" r="2"/><path d="M12 22c4 0 8-3 8-7 0-3-3-5-5-5h-6c-2 0-5 2-5 5 0 4 4 7 8 7z"/></>,
    laptop: <path d="M3 5h18v11H3z M2 19h20 M9 22h6"/>,
    wifi:   <><path d="M5 12.5a10 10 0 0114 0"/><path d="M8.5 16a5 5 0 017 0"/><circle cx="12" cy="19" r="1"/></>,
    fire:   <path d="M12 2c1 4 4 5 4 9a4 4 0 11-8 0c0-2 1-3 1-5 1 2 3 1 3-4z"/>,
    bath:   <><path d="M5 11V5a2 2 0 014 0v6"/><rect x="2" y="11" width="20" height="6"/><path d="M5 17v3 M19 17v3"/></>,
    kitchen:<><rect x="3" y="3" width="18" height="18"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="9"/></>,
    coffee: <><path d="M5 8h12a2 2 0 012 2v6a4 4 0 01-4 4H7a4 4 0 01-4-4v-6a2 2 0 012-2zM19 11h2a2 2 0 010 4h-2"/><path d="M7 4v2M11 3v3M15 4v2"/></>,
    sun:    <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></>,
    leaf:   <path d="M4 20c0-7 8-14 16-14 0 8-7 16-14 16-1 0-2-1-2-2z M4 20l8-8"/>,
    book:   <path d="M4 4h14v16H6a2 2 0 01-2-2zM8 4v16M14 4v16"/>,
    yoga:   <><circle cx="12" cy="5" r="2"/><path d="M12 7v5M8 12h8M8 12l-3 7M16 12l3 7"/></>,
    deer:   <path d="M5 8l2-4 5 2 5-2 2 4-3 2v8h-8v-8z"/>,
    map:    <><polygon points="1 6 9 3 15 6 23 3 23 18 15 21 9 18 1 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></>,
  };
  return <svg viewBox="0 0 24 24">{paths[name] || paths.star}</svg>;
};

// ============ GALLERY CATEGORIES ============
const GALLERY = {
  Cabin:   ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'],
  Patio:   ['g2', 'g4', 'g1', 'g5'],
  Bathroom:['g6', 'g3'],
  Views:   ['g4', 'g3', 'g1', 'g5'],
  Night:   ['g5', 'g1', 'g6'],
  Food:    ['g2', 'g4'],
};

// ============ EXPERIENCES ============
const EXPERIENCES = [
  { id: 'bonfire',   img: 'e1', lbl: 'After dusk',     name: 'Bonfire evenings',      desc: 'A walled fire pit on the lower deck. Cedar wood. Stars overhead.',           price: 'Included' },
  { id: 'tea',       img: 'e2', lbl: 'Mid-morning',    name: 'Tea ritual',            desc: 'Three estates, three brews. The host pours. Twenty minutes.',                price: '₹400' },
  { id: 'breakfast', img: 'e3', lbl: 'Dawn',           name: 'Forest breakfast',      desc: 'On the deck, before the light hits the ridge. Carried in on a wood tray.',  price: '₹650' },
  { id: 'trail',     img: 'e4', lbl: 'Naturalist-led', name: 'Bird walk',             desc: 'Pre-sunrise. Two hours, three kilometres. Led by Tashi, our naturalist.',   price: '₹1,200' },
  { id: 'cinema',    img: 'e5', lbl: 'Saturday',       name: 'Outdoor cinema',        desc: 'A screen strung between two oaks. Hot apple cider. One curated film.',       price: '₹800' },
  { id: 'stars',     img: 'e6', lbl: 'Clear nights',   name: 'Stargazing',            desc: 'Telescope on the porch. Naked-eye constellations, planet pass.',             price: '₹900' },
  { id: 'meditate',  img: 'e7', lbl: 'First light',    name: 'Meditation mornings',   desc: 'Twenty minutes on the porch, before anything else. Optional. Quiet.',        price: 'Included' },
];

// ============ AMENITIES ============
const AMENITIES = [
  {
    group: 'Essentials',
    items: [
      { icon: 'fire',   label: 'Wood stove' },
      { icon: 'bath',   label: 'Rain shower' },
      { icon: 'kitchen',label: 'Pantry kit' },
      { icon: 'coffee', label: 'Filter coffee' },
      { icon: 'home',   label: 'Heated bed' },
      { icon: 'book',   label: 'Library shelf' },
    ],
  },
  {
    group: 'Nature',
    items: [
      { icon: 'tree',   label: 'Forest-facing deck' },
      { icon: 'star',   label: 'Stargazing perch' },
      { icon: 'deer',   label: 'Wildlife viewing' },
      { icon: 'leaf',   label: 'Native garden' },
    ],
  },
  {
    group: 'Wellness',
    items: [
      { icon: 'yoga',   label: 'Yoga deck' },
      { icon: 'sun',    label: 'Sunrise porch' },
      { icon: 'leaf',   label: 'Herbal teas' },
    ],
  },
  {
    group: 'Workcation',
    items: [
      { icon: 'laptop', label: 'Standing desk' },
      { icon: 'wifi',   label: 'Wi-Fi (request only)' },
      { icon: 'home',   label: 'Heated workspace' },
    ],
  },
  {
    group: 'Family & pets',
    items: [
      { icon: 'paw',    label: 'Pets welcome' },
      { icon: 'home',   label: 'Trundle bed' },
      { icon: 'book',   label: "Children's books" },
    ],
  },
];

// ============ REVIEWS ============
const RATINGS = [
  { lbl: 'Cabin-fresh',    val: 4.98 },
  { lbl: 'Host care',      val: 5.00 },
  { lbl: 'Arrival warmth', val: 4.96 },
  { lbl: 'As described',   val: 4.97 },
  { lbl: 'Setting',        val: 4.99 },
  { lbl: 'Worth it',       val: 4.92 },
];
const REVIEWS = [
  { name: 'Anika S.',  when: 'October 2025', initial: 'A', text: 'We did not check our phones for four days. The cabin asks nothing of you, which is the point.' },
  { name: 'Rohit M.',  when: 'September 2025', initial: 'R', text: 'A monal landed on the deck on day three. Aarav left a hand-drawn map under our cup the morning we left.' },
  { name: 'Meera K.',  when: 'May 2025',       initial: 'M', text: 'The bed is non-negotiable, as promised. The kettle never went cold. Already booked again.' },
  { name: 'Jaipreet G.', when: 'March 2025',   initial: 'J', text: 'It rains here in a way that makes you want to stay inside, which is exactly what the cabin was built for.' },
];

// ============ REVIEW HIGHLIGHTS (themed pull-quotes) ============
const REVIEW_HIGHLIGHTS = [
  { theme: 'The quiet',     quote: 'We did not check our phones for four days. The cabin asks nothing of you — that is the point.', from: 'Anika S.',    when: '5 nights · Couple' },
  { theme: 'The host care', quote: 'Aarav left a hand-drawn trail map under our cup the morning we left. Small thing. Stayed with me.', from: 'Rohit M.', when: '4 nights · Family' },
  { theme: 'The bed',       quote: 'The bed is non-negotiable, as promised. The kettle never went cold. We have already booked again.', from: 'Meera K.', when: '3 nights · Workcation' },
  { theme: 'The cabin',     quote: 'It rains here in a way that makes you want to stay inside — which is exactly what the cabin was built for.', from: 'Jaipreet G.', when: '6 nights · Solo' },
];

// ============ CREATOR STAYS ============
const CREATORS = [
  { id: 'c1', name: 'Tara Iyer',     handle: '@tarawrites · Travel writer',    line: 'A six-night residency that turned into an essay for Condé Nast Traveller.',  photo: 'cr1', badge: '6-night residency' },
  { id: 'c2', name: 'Devan Singh',   handle: '@dvncuts · Photographer',         line: 'Came for the monsoon light. The full set is in our journal.',                photo: 'cr2', badge: 'Monsoon shoot' },
  { id: 'c3', name: 'Saanvi & Arjun', handle: '@theforestkin · Filmmakers',     line: 'Shot a short film here. The cabin is a quiet co-star.',                      photo: 'cr3', badge: 'Short film' },
  { id: 'c4', name: 'Ila Banerjee',  handle: '@ilabanerjee · Author',            line: 'Three chapters of her next novel were written at this desk.',                photo: 'cr4', badge: 'Writing residency' },
];

// ============ IDEAL FOR (audience tags) ============
const IDEAL_FOR = ['couples', 'workcations', 'slow travellers'];

// ============ TRUST SIGNALS ============
// Curated alternatives for the first slot.
// "Verified by EKAM" was the wrong copy — every property is EKAM-managed,
// so it doesn't actually communicate anything specific to *this* cabin.
const PROOF_VARIANTS = {
  'returning':    { name: 'Hosted by EKAM',           sub: <><b>1 in 4 guests</b> books a second stay</> },
  'repeat-nights':{ name: 'Tested by guests',          sub: <><b>{bucketStays(187)}</b> · {bucketNights(612)} hosted</> },
  'tenure':       { name: 'Three years open',          sub: <>Hosted since 2023 · <b>4.96 average</b></> },
  'first-time':   { name: 'First-stay returns',        sub: <><b>92%</b> of first stays became repeat stays</> },
};
const PROOF_ICON = (<><path d="M9 12l2 2 4-4"/><path d="M12 3l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V7z"/></>);

const TRUST_SIGNALS = [
  {
    icon: PROOF_ICON,
    name: PROOF_VARIANTS['returning'].name,
    sub: PROOF_VARIANTS['returning'].sub,
  },
  {
    icon: (<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></>),
    name: 'Cabin-fresh',
    sub: <><b>4.98 cleanliness</b> · deep-clean between stays</>
  },
  {
    icon: (<><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></>),
    name: 'Host responsiveness',
    sub: <><b>Replies in &lt; 1 hour</b> · Aarav lives on site</>
  },
  {
    icon: (<><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V8a5 5 0 0110 0v3"/></>),
    name: 'Secure booking',
    sub: <>No payment now · we hold for <b>24 hours</b></>
  },
  {
    icon: (<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></>),
    name: 'Flexible cancellation',
    sub: <><b>Free</b> up to 7 days before arrival</>
  },
];

// ============ AVAILABILITY (live feed) ============
const AVAILABILITY = {
  next: 'this weekend (12–15 Mar)',
  windowsLeft: 2,
  weekendBooked: 4,
};

// ============ COMPONENTS ============

function DrivePill() {
  const [i, setI] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % PROPERTY.drives.length), 3200);
    return () => clearInterval(t);
  }, []);

  const propLat = PROPERTY.lat, propLng = PROPERTY.lng;

  const openMap = () => {
    if (loading) return;
    setLoading(true);
    const fallback = () => {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${propLat},${propLng}&travelmode=driving`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setLoading(false);
    };
    if (!navigator.geolocation) { fallback(); return; }
    const timer = setTimeout(fallback, 6000);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(timer);
        const url = `https://www.google.com/maps/dir/?api=1&origin=${pos.coords.latitude},${pos.coords.longitude}&destination=${propLat},${propLng}&travelmode=driving`;
        window.open(url, '_blank', 'noopener,noreferrer');
        setLoading(false);
      },
      () => { clearTimeout(timer); fallback(); },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 5 * 60 * 1000 }
    );
  };

  const current = PROPERTY.drives[i];
  // Parse "3 hr from Kathgodam" → time = "3 hr", city = "Kathgodam"
  const match = current.match(/^(.+?)\s+from\s+(.+)$/i);
  const time = match ? match[1] : '';
  const city = match ? match[2] : current;

  return (
    <button
      className={`drive-pill ${loading ? 'loading' : ''}`}
      onClick={openMap}
      aria-label={`Get directions to Binsar from ${city}`}
      title="Open Google Maps with directions from your location"
    >
      <svg viewBox="0 0 24 24">
        <path d="M12 22s-7-7.5-7-13a7 7 0 0114 0c0 5.5-7 13-7 13z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
      <span className="drive-pill__city" key={i}>{city} <em>· {time}</em></span>
    </button>
  );
}

function WeatherPill() {
  const open = () => {
    const url = `https://www.google.com/search?q=weather+${encodeURIComponent('Binsar Wildlife Sanctuary, Uttarakhand')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  // Today's parsed range
  const [hi, lo] = PROPERTY.weather.split('/').map(s => s.trim());
  return (
    <button
      className="weather-pill"
      onClick={open}
      aria-label="View current weather for Binsar"
      title="Live weather"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 16a4 4 0 110-8 5 5 0 019.6 1.5A3.5 3.5 0 0117 16H8z"/>
        <circle cx="6" cy="8" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
      <span className="weather-pill__hi">{hi}</span>
      <span className="weather-pill__sep">/</span>
      <span className="weather-pill__lo">{lo}</span>
      <em>· today</em>
    </button>
  );
}

function DriveFlip() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % PROPERTY.drives.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="drive-flip" key={i}>{PROPERTY.drives[i]}</span>
  );
}

// ============ SUB-HERO (ideal-for + price + availability) ============
function SubHero() {
  return (
    <div className="subhero">
      <div className="subhero__ideal">
        <span className="subhero__ideal-lbl">— Loved by</span>
        {IDEAL_FOR.map((tag, i) => (
          <React.Fragment key={tag}>
            <b>{tag}</b>
            {i < IDEAL_FOR.length - 1 && <span style={{color:'var(--moss)'}}>·</span>}
          </React.Fragment>
        ))}
        <span style={{marginLeft: 8, color:'var(--moss)'}}>— a stone-floored cabin for two, with one bed, one stove, and one window.</span>
      </div>
      <div className="subhero__price">
        <span className="subhero__price-lbl">From</span>
        <span className="subhero__price-val">₹{PROPERTY.nightly.toLocaleString('en-IN')}<small>/ night</small></span>
      </div>
      <div className="subhero__avail">
        <span className="pulse"></span>
        <span><b>2 cabins left</b> for {AVAILABILITY.next}. Booked {AVAILABILITY.weekendBooked}× this week.</span>
      </div>
    </div>
  );
}

// ============ TRUST STRIP ============
function TrustStrip({ proofVariant }) {
  const proof = PROOF_VARIANTS[proofVariant] || PROOF_VARIANTS['returning'];
  const signals = TRUST_SIGNALS.map((s, i) =>
    i === 0 ? { ...s, name: proof.name, sub: proof.sub } : s
  );
  return (
    <div className="trust-strip">
      {signals.map((t, i) => (
        <div className="trust-item" key={i}>
          <svg viewBox="0 0 24 24">{t.icon}</svg>
          <div className="trust-item__body">
            <span className="trust-item__name">{t.name}</span>
            <span className="trust-item__sub">{t.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============ REVIEW HIGHLIGHTS ============
function ReviewHighlights() {
  return (
    <div className="rev-hl">
      <div className="rev-hl__rail">
        {REVIEW_HIGHLIGHTS.map((h, i) => (
          <div className="rev-hl__card" key={i}>
            <span className="rev-hl__theme">— {h.theme}</span>
            <p className="rev-hl__quote">{h.quote}</p>
            <div className="rev-hl__from">
              <b>{h.from}</b>
              <span>{h.when}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ CREATOR STAYS ============
function CreatorStays() {
  return (
    <div className="creators">
      {CREATORS.map(c => (
        <div className="creator" key={c.id}>
          <div className={`creator__photo ${c.photo}`}>
            <span className="badge">{c.badge}</span>
          </div>
          <div>
            <div className="creator__name">{c.name}</div>
            <div className="creator__handle">{c.handle}</div>
          </div>
          <p className="creator__line">{c.line}</p>
        </div>
      ))}
    </div>
  );
}

// ============ "WHAT'S INCLUDED" CONFIDENCE BLOCK ============
function IncludedBlock() {
  const items = [
    { name: 'Whole cabin', sub: 'No shared walls. Stone floor, wood stove, one large window.', icon: <><path d="M3 9l9-6 9 6v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 21V12h6v9"/></> },
    { name: 'Pantry kit', sub: 'Filter coffee, three teas, oats, jam, local honey — for 24 hours.', icon: <><path d="M5 8h12a2 2 0 012 2v6a4 4 0 01-4 4H7a4 4 0 01-4-4v-6a2 2 0 012-2zM19 11h2a2 2 0 010 4h-2"/><path d="M7 4v2M11 3v3M15 4v2"/></> },
    { name: 'Hot water windows', sub: '6:30 and 21:00 by default — request otherwise, day-of.', icon: <><path d="M12 2c1 4 4 5 4 9a4 4 0 11-8 0c0-2 1-3 1-5 1 2 3 1 3-4z"/></> },
    { name: 'Bonfire evening', sub: 'A walled fire pit on the lower deck. Cedar wood. Lit at dusk.', icon: <><path d="M12 2c1 4 4 5 4 9a4 4 0 11-8 0c0-2 1-3 1-5 1 2 3 1 3-4z"/></> },
    { name: 'Resident host', sub: 'Aarav lives on site. Available between 7am and 9pm.', icon: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></> },
    { name: 'Forest trails', sub: 'Three marked walks from the cabin. Map left under your cup.', icon: <path d="M12 2L7 9h3l-3 5h3l-3 5h10l-3-5h3l-3-5h3z"/> },
  ];
  return (
    <div className="included">
      <div className="included__head">
        <span className="included__title">What's in your stay <em>— at no extra cost</em></span>
        <span className="included__hint">— Six things, included</span>
      </div>
      {items.map((it, i) => (
        <div className="included__row" key={i}>
          <svg viewBox="0 0 24 24">{it.icon}</svg>
          <div className="included__row-body">
            <span className="included__row-name">{it.name}</span>
            <span className="included__row-sub">{it.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function GalleryModal({ on, onClose }) {
  return (
    <div className={`gallery-overlay ${on ? 'on' : ''}`}>
      <div className="gallery-overlay__top">
        <span className="gallery-overlay__title">— All photographs · {PROPERTY.name}</span>
        <button className="gallery-overlay__close" onClick={onClose}>← Close</button>
      </div>
      <div className="gallery-overlay__grid">
        {['g1','g2','g3','g4','g5','g6','g1','g3','g4','g2','g5','g6'].map((g, i) => (
          <div key={i} className={`gallery-overlay__tile ${g}`}></div>
        ))}
      </div>
    </div>
  );
}

// ============ MOBILE HERO CAROUSEL ============
const CAPTIONS = {
  g1: 'Forest light through the cabin window — early morning',
  g2: 'The deck. Where the kettle warms before sunrise.',
  g3: 'Rain shower against river stone',
  g4: 'Ridge view at last light',
  g5: 'The fire pit, after dusk',
  g6: 'The bath. Two large windows. Forest beyond.',
};

function MobileHero({ onOpenGallery }) {
  const [cat, setCat] = useState('Cabin');
  const [index, setIndex] = useState(0);
  const railRef = useRef(null);
  const tiles = GALLERY[cat];

  // Reset scroll when category changes
  useEffect(() => {
    setIndex(0);
    if (railRef.current) railRef.current.scrollTo({ left: 0, behavior: 'auto' });
  }, [cat]);

  const onScroll = () => {
    if (!railRef.current) return;
    const w = railRef.current.clientWidth;
    if (w > 0) setIndex(Math.round(railRef.current.scrollLeft / w));
  };

  return (
    <div className="mhero">
      <div className="mhero__tabs">
        {Object.keys(GALLERY).map(k => (
          <button key={k} className={`mhero__tab ${cat === k ? 'on' : ''}`} onClick={() => setCat(k)}>{k}</button>
        ))}
      </div>
      <div className="mhero__rail" ref={railRef} onScroll={onScroll}>
        {tiles.map((g, i) => (
          <div
            key={`${cat}-${i}`}
            className={`mhero__slide ${g}`}
            onClick={() => onOpenGallery(cat, i)}
            role="button"
            aria-label={`Open photo ${i+1} of ${tiles.length}`}
          ></div>
        ))}
      </div>
      <div className="mhero__counter">{index + 1} / {tiles.length} · {cat}</div>
      <div className="mhero__dots">
        {tiles.map((_, i) => (
          <span key={i} className={`mhero__dot ${i === index ? 'on' : ''}`}></span>
        ))}
      </div>
      <button className="mhero__viewall" onClick={() => onOpenGallery(cat, index)}>◇ View all 28</button>
    </div>
  );
}

// ============ MOBILE FULLSCREEN GALLERY ============
function MobileGalleryViewer({ on, cat: initialCat, startIndex, onClose }) {
  const [cat, setCat] = useState(initialCat || 'Cabin');
  const [index, setIndex] = useState(startIndex || 0);
  const railRef = useRef(null);
  const tiles = GALLERY[cat] || [];

  useEffect(() => {
    if (on) {
      setCat(initialCat || 'Cabin');
      setIndex(startIndex || 0);
    }
  }, [on, initialCat, startIndex]);

  // Sync scroll to startIndex when sheet opens
  useEffect(() => {
    if (!on || !railRef.current) return;
    const t = setTimeout(() => {
      if (!railRef.current) return;
      railRef.current.scrollTo({ left: (startIndex || 0) * railRef.current.clientWidth, behavior: 'auto' });
    }, 60);
    return () => clearTimeout(t);
  }, [on, startIndex, cat]);

  useEffect(() => {
    if (!on) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [on, onClose]);

  const onScroll = () => {
    if (!railRef.current) return;
    const w = railRef.current.clientWidth;
    if (w > 0) setIndex(Math.round(railRef.current.scrollLeft / w));
  };

  const switchCat = (k) => {
    setCat(k); setIndex(0);
    if (railRef.current) railRef.current.scrollTo({ left: 0, behavior: 'auto' });
  };

  return (
    <div className={`mgal ${on ? 'on' : ''}`} aria-hidden={!on}>
      <div className="mgal__top">
        <button className="mgal__close" onClick={onClose} aria-label="Close gallery">✕</button>
        <span className="mgal__title">{cat} · {index + 1} of {tiles.length}</span>
        <button className="mgal__share" aria-label="Share">↗</button>
      </div>
      <div className="mgal__rail" ref={railRef} onScroll={onScroll}>
        {tiles.map((g, i) => (
          <div key={`${cat}-${i}`} className={`mgal__slide ${g}`}></div>
        ))}
      </div>
      <div className="mgal__caption">{tiles[index] ? (CAPTIONS[tiles[index]] || '') : ''}</div>
      <div className="mgal__cats">
        {Object.keys(GALLERY).map(k => (
          <button key={k} className={`mgal__cat ${k === cat ? 'on' : ''}`} onClick={() => switchCat(k)}>{k}</button>
        ))}
      </div>
    </div>
  );
}

// ============ DATE HELPERS ============
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const fmtDate = (d) => d ? `${d.getDate()} ${MONTH_ABBR[d.getMonth()]} ${d.getFullYear()}` : '';
const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const nightsBetween = (a, b) => (a && b) ? Math.max(0, Math.round((b - a) / 86400000)) : 0;
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const monthsBetween = (a, b) => (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());

// ============ DATE RANGE PICKER (mobile) ============
function MobileDatePicker({ arriveDate, departDate, onChange }) {
  // We're "today" at March 2026 in this demo
  const today = useMemo(() => new Date(2026, 2, 1), []); // Mar 1 2026
  const [selecting, setSelecting] = useState(arriveDate && !departDate ? 'end' : 'start');
  const [hoverDay, setHoverDay] = useState(null);

  const tap = (day) => {
    if (day < today) return; // can't pick past
    if (selecting === 'start' || !arriveDate) {
      onChange({ arriveDate: day, departDate: null });
      setSelecting('end');
      return;
    }
    // selecting === 'end'
    if (sameDay(day, arriveDate)) return; // same day, ignore
    if (day < arriveDate) {
      // user picked something earlier — treat as new start
      onChange({ arriveDate: day, departDate: null });
      setSelecting('end');
      return;
    }
    onChange({ arriveDate, departDate: day });
    setSelecting('start');
    setHoverDay(null);
  };

  const clear = () => {
    onChange({ arriveDate: null, departDate: null });
    setSelecting('start');
    setHoverDay(null);
  };

  // Render 3 months starting at today
  const months = [];
  for (let m = 0; m < 4; m++) {
    const monthStart = new Date(today.getFullYear(), today.getMonth() + m, 1);
    months.push(monthStart);
  }

  const renderMonth = (monthStart) => {
    const monthIdx = monthStart.getMonth();
    const year = monthStart.getFullYear();
    const startDow = monthStart.getDay();
    const lastDay = new Date(year, monthIdx + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startDow; i++) cells.push({ muted: true, key: `m${i}` });
    for (let d = 1; d <= lastDay; d++) {
      const day = new Date(year, monthIdx, d);
      const isPast = day < today;
      const isStart = arriveDate && sameDay(day, arriveDate);
      const isEnd = departDate && sameDay(day, departDate);
      const inRange = arriveDate && departDate && day > arriveDate && day < departDate;
      // Preview range while selecting end
      const previewEnd = selecting === 'end' && arriveDate && !departDate && hoverDay && day > arriveDate && day < hoverDay;
      const previewEndCap = selecting === 'end' && arriveDate && !departDate && hoverDay && sameDay(day, hoverDay) && hoverDay > arriveDate;
      cells.push({ d, day, isPast, isStart, isEnd, inRange, previewEnd, previewEndCap, key: d });
    }
    return (
      <div key={`${year}-${monthIdx}`} className="mdp__month">
        <div className="mdp__month-title">{MONTH_NAMES[monthIdx]} {year}</div>
        <div className="mdp__weekrow">
          <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
        </div>
        <div className="mdp__grid">
          {cells.map(c => {
            if (c.muted) return <span key={c.key} className="mdp__day muted"></span>;
            const cls = [
              'mdp__day',
              c.isPast ? 'past' : '',
              c.inRange ? 'in-range' : '',
              c.isStart ? 'range-start' : '',
              c.isEnd ? 'range-end' : '',
              c.previewEnd ? 'preview' : '',
              c.previewEndCap ? 'preview-end' : '',
            ].join(' ').replace(/\s+/g,' ').trim();
            return (
              <button
                key={c.key}
                className={cls}
                onClick={() => tap(c.day)}
                onMouseEnter={() => selecting === 'end' && !c.isPast && setHoverDay(c.day)}
              >
                {c.d}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const nights = nightsBetween(arriveDate, departDate);

  return (
    <div className="mdp">
      <div className="mdp__head">
        <div className="mdp__head-left">
          <span className="mdp__head-lbl">
            {!arriveDate ? 'Tap arrival date' : !departDate ? 'Now tap departure' : `${nights} night${nights !== 1 ? 's' : ''} selected`}
          </span>
          <span className="mdp__head-val">
            {arriveDate ? fmtDate(arriveDate) : '—'} <em>→</em> {departDate ? fmtDate(departDate) : '—'}
          </span>
        </div>
        {(arriveDate || departDate) && (
          <button className="mdp__head-clear" onClick={clear}>Clear</button>
        )}
      </div>
      <div className="mdp__scroll">
        {months.map(renderMonth)}
      </div>
      <p className="mdp__hint">{!arriveDate ? '— Pick an arrival, then a departure' : !departDate ? '— Tap any later date to set departure' : '— Tap any day to start over'}</p>
    </div>
  );
}

// ============ EXPERIENCE UPSELLS ============
const parsePrice = (p) => {
  if (!p || p === 'Included') return 0;
  const m = String(p).match(/[\d,]+/);
  return m ? parseInt(m[0].replace(/,/g,''), 10) : 0;
};

function ExperienceUpsells({ selected, onToggle }) {
  return (
    <div className="mxp">
      <div className="mxp__head">
        <span className="mxp__title">Add experiences <em>— optional</em></span>
        <span style={{fontFamily:'var(--font-editorial)', fontStyle:'italic', fontSize:12, color:'var(--moss)'}}>
          {selected.size > 0 ? `${selected.size} added` : 'Swipe to see all'}
        </span>
      </div>
      <div className="mxp__rail">
        {EXPERIENCES.map(x => {
          const on = selected.has(x.id);
          const price = parsePrice(x.price);
          return (
            <div key={x.id} className={`mxp__card ${on ? 'on' : ''}`} onClick={() => onToggle(x.id)}>
              <div className={`mxp__card-img ${x.img}`}>
                <span className="mxp__card-tag">{x.lbl}</span>
                <span className="mxp__card-check">{on ? '✓' : ''}</span>
              </div>
              <div className="mxp__card-body">
                <span className="mxp__card-name">{x.name}</span>
                <span className="mxp__card-desc">{x.desc}</span>
                <span className={`mxp__card-price ${price === 0 ? 'free' : ''}`}>
                  {price === 0 ? 'Included with stay' : `+ ${x.price} per stay`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ APP DOWNLOAD SECTION (in-page, brand-aligned) ============
function AppDownloadSection() {
  return (
    <section className="appdl">
      <div className="appdl__body">
        <span className="appdl__eyebrow">— Bring EKAM with you</span>
        <h2 className="appdl__title">
          The cabin is yours. <em>The app keeps you with it.</em>
        </h2>
        <p className="appdl__sub">
          Offline gate code, the day's ritual, trail map under your cup, the host on speed-dial.
        </p>

        <div className="appdl__features">
          <div className="appdl__feature">
            <span className="appdl__feature-name">Offline first</span>
            <span className="appdl__feature-sub">Gate code, trails, kettle hours — even with no signal.</span>
          </div>
          <div className="appdl__feature">
            <span className="appdl__feature-name">Host on speed-dial</span>
            <span className="appdl__feature-sub">One tap to Aarav, 7am to 9pm.</span>
          </div>
          <div className="appdl__feature">
            <span className="appdl__feature-name">Daily ritual</span>
            <span className="appdl__feature-sub">One quiet morning prompt. Tea. Twenty minutes.</span>
          </div>
          <div className="appdl__feature">
            <span className="appdl__feature-name">Quiet by default</span>
            <span className="appdl__feature-sub">No notifications unless you ask for them.</span>
          </div>
        </div>

        <div className="appdl__badges">
          <a className="appdl__badge" href="#">
            <svg viewBox="0 0 24 24"><path d="M17.05 12.04c-.03-2.85 2.33-4.21 2.44-4.28-1.33-1.94-3.4-2.21-4.13-2.24-1.76-.18-3.43 1.03-4.32 1.03-.89 0-2.27-1.01-3.73-.98-1.92.03-3.69 1.11-4.68 2.82-2 3.47-.51 8.6 1.43 11.42.95 1.38 2.08 2.92 3.55 2.87 1.42-.06 1.96-.92 3.68-.92 1.72 0 2.21.92 3.72.89 1.54-.02 2.51-1.4 3.45-2.79 1.09-1.6 1.54-3.15 1.56-3.23-.03-.01-2.99-1.15-3.02-4.56zM14.34 3.79c.78-.94 1.3-2.25 1.16-3.56-1.12.05-2.48.75-3.28 1.69-.72.83-1.35 2.16-1.18 3.45 1.25.1 2.52-.64 3.3-1.58z"/></svg>
            <div className="appdl__badge-text">
              <small>Download on</small>
              <b>App Store</b>
            </div>
          </a>
          <a className="appdl__badge" href="#">
            <svg viewBox="0 0 24 24"><path d="M3.61 1.84a2 2 0 00-.74 1.54v17.24c0 .6.27 1.15.74 1.54l9.51-9.66L3.61 1.84zM14.54 12.5l2.66 2.7-12.84 7.36 10.18-10.06zm0-1L4.36 1.44 17.2 8.8l-2.66 2.7zM21 11l-2.8-1.61L14.95 12 18.2 14.61 21 13c1.33-.77 1.33-2.23 0-3z"/></svg>
            <div className="appdl__badge-text">
              <small>Get it on</small>
              <b>Google Play</b>
            </div>
          </a>
          <div className="appdl__qr-row">
            <div className="appdl__qr"><div className="appdl__qr-inner"></div></div>
            <span>Scan to install</span>
          </div>
        </div>
      </div>

      <div className="appdl__phone">
        <div className="appdl__phone-inner">
          <div className="appdl__phone-notch"></div>
          <div>
            <span className="appdl__phone-eyebrow">— Day 2 · Binsar</span>
            <div className="appdl__phone-title">Good morning, <em>Anika.</em></div>
          </div>
          <div className="appdl__phone-card">
            <span className="appdl__phone-card-lbl">Gate code · today</span>
            <span className="appdl__phone-card-val">28 11</span>
          </div>
          <div>
            <div className="appdl__phone-row"><span>Sunrise</span><b>6:08 am</b></div>
            <div className="appdl__phone-row"><span>Hot water</span><b>6:30 am</b></div>
            <div className="appdl__phone-row"><span>Bonfire</span><b>6:42 pm</b></div>
            <div className="appdl__phone-row"><span>Bird walk</span><b>Tashi · 5:45</b></div>
          </div>
          <div className="appdl__phone-cta">Open today's ritual →</div>
        </div>
      </div>
    </section>
  );
}
function AppDownloadRow() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="mapp-row">
      <span className="mapp-row__txt">
        <b>Continue on the app</b> — offline gate code, daily ritual, host on speed-dial.
      </span>
      <button className="mapp-row__cta">Get the app</button>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        style={{background:'transparent',border:0,color:'var(--moss)',padding:0,marginLeft:4,cursor:'pointer',fontSize:14,width:20}}
      >×</button>
    </div>
  );
}

// ============ MOBILE MINI CALENDAR (mobile, in sheet) ============
function MobileMiniCal({ arrive, depart, onPick }) {
  // March 2026 preview. Selected range: 12–15.
  const month = 'March 2026';
  const startDow = 0; // March 1 2026 is a Sunday
  const days = 31;
  const arriveDay = 12, departDay = 15;

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push({ muted: true, key: `m${i}` });
  for (let d = 1; d <= days; d++) {
    const inRange = d > arriveDay && d < departDay;
    const isStart = d === arriveDay;
    const isEnd = d === departDay;
    cells.push({ d, inRange, isStart, isEnd, key: d });
  }

  return (
    <div className="mbook-cal">
      <div className="mbook-cal__head">
        <span className="mbook-cal__month">{month}</span>
        <div className="mbook-cal__navs">
          <button aria-label="Prev month">‹</button>
          <button aria-label="Next month">›</button>
        </div>
      </div>
      <div className="mbook-cal__weekrow">
        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
      </div>
      <div className="mbook-cal__grid">
        {cells.map(c => {
          if (c.muted) return <span key={c.key} className="mbook-cal__day muted"></span>;
          const cls = [
            'mbook-cal__day',
            c.inRange ? 'in-range' : '',
            c.isStart ? 'range-start' : '',
            c.isEnd ? 'range-end' : '',
          ].join(' ').trim();
          return <button key={c.key} className={cls}>{c.d}</button>;
        })}
      </div>
    </div>
  );
}

// ============ MOBILE BOOKING SHEET ============
function MobileBookingSheet({ on, onClose, state, setState }) {
  const { arriveDate, departDate, adults, kidAges, rooms, experiences } = state;
  const [showCal, setShowCal] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);

  const nights = nightsBetween(arriveDate, departDate);
  const evalRes = useMemo(() => evaluateParty({ adults, kidAges, rooms }), [adults, kidAges, rooms]);
  const anyUnset = kidAges.some(a => a === null);

  const cabinSubtotal = nights * PROPERTY.nightly * rooms;
  const childSurchargeTotal = evalRes.childSurcharge * nights;
  const expTotal = useMemo(() => {
    let sum = 0;
    EXPERIENCES.forEach(x => { if (experiences.has(x.id)) sum += parsePrice(x.price); });
    return sum;
  }, [experiences]);
  const subtotal = cabinSubtotal + childSurchargeTotal + expTotal;
  const longStaySave = nights >= 3 ? Math.round(PROPERTY.nightly * rooms * 0.08) : 0;
  const afterSave = subtotal - longStaySave;
  const taxes = Math.round(afterSave * 0.05);
  const total = afterSave + taxes;
  const cancelBy = arriveDate ? fmtDate(addDays(arriveDate, -7)) : '—';

  useEffect(() => {
    if (on) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [on]);

  const setDates = ({ arriveDate, departDate }) => setState({ ...state, arriveDate, departDate });
  const setAdults = (n) => setState({ ...state, adults: Math.max(1, Math.min(8, n)) });
  const setKids = (n) => {
    n = Math.max(0, Math.min(4, n));
    let next = kidAges.slice(0, n);
    while (next.length < n) next.push(null);
    setState({ ...state, kidAges: next });
  };
  const setAge = (i, age) => {
    const next = [...kidAges];
    next[i] = age === '' ? null : Number(age);
    setState({ ...state, kidAges: next });
  };
  const setRooms = (n) => setState({ ...state, rooms: Math.max(1, Math.min(4, n)) });
  const toggleExp = (id) => {
    const next = new Set(experiences);
    if (next.has(id)) next.delete(id); else next.add(id);
    setState({ ...state, experiences: next });
  };

  const handleStrategy = (action) => {
    if (!action) return;
    if (action.action === 'set-rooms' && action.value) setRooms(action.value);
    if (action.action === 'add-room') setRooms(Math.min(4, rooms + 1));
  };

  const onScrim = (e) => { if (e.target === e.currentTarget) onClose(); };

  const datesIncomplete = !arriveDate || !departDate || nights < 1;

  return (
    <div className={`mbook-sheet ${on ? 'on' : ''}`} aria-hidden={!on}>
      <div className="mbook-sheet__scrim" onClick={onScrim}></div>
      <div className="mbook-sheet__panel">
        <div className="mbook-sheet__handle" onClick={onClose}></div>
        <div className="mbook-sheet__top">
          <span className="mbook-sheet__title">Your stay{nights > 0 && <em>· {nights} night{nights !== 1 ? 's' : ''}</em>}</span>
          <button className="mbook-sheet__close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="mbook-sheet__body">

          <div className="mbook-sheet__urgency">
            <span className="pulse"></span>
            <span>{seasonalUrgency().copy}</span>
          </div>

          <div className="mbook-dates" onClick={() => setShowCal(!showCal)}>
            <div className="mbook-dates__cell">
              <span className="mbook-dates__lbl">Arrive</span>
              <span className="mbook-dates__val">{arriveDate ? fmtDate(arriveDate) : '— Add date'}</span>
            </div>
            <div className="mbook-dates__cell">
              <span className="mbook-dates__lbl">Depart</span>
              <span className="mbook-dates__val">{departDate ? fmtDate(departDate) : '— Add date'}</span>
            </div>
          </div>
          {showCal && (
            <MobileDatePicker
              arriveDate={arriveDate}
              departDate={departDate}
              onChange={setDates}
            />
          )}

          <div className={`mbook-guest ${guestOpen ? 'open' : ''}`} onClick={() => setGuestOpen(!guestOpen)}>
            <span className="mbook-guest__lbl">
              <span>Guests &amp; cabins</span>
              <span className="mbook-guest__chev">▾</span>
            </span>
            <span className="mbook-guest__val">{summarizeGuests({adults, kidAges, rooms})}</span>
          </div>

          {guestOpen && (
            <div className="mbook-gpanel">
              <div className="mbook-gpanel__row">
                <div>
                  <div className="mbook-gpanel__name">Adults</div>
                  <div className="mbook-gpanel__meta">Ages 13 and over</div>
                </div>
                <div className="mbook-gpanel__step">
                  <button onClick={() => setAdults(adults - 1)} disabled={adults <= 1}>−</button>
                  <span className="mbook-gpanel__step-val">{adults}</span>
                  <button onClick={() => setAdults(adults + 1)} disabled={adults >= 8}>+</button>
                </div>
              </div>

              <div className="mbook-gpanel__row">
                <div>
                  <div className="mbook-gpanel__name">Children</div>
                  <div className="mbook-gpanel__meta">
                    Ages 0–12
                    <span className="pill">Under 5 free</span>
                  </div>
                </div>
                <div className="mbook-gpanel__step">
                  <button onClick={() => setKids(kidAges.length - 1)} disabled={kidAges.length <= 0}>−</button>
                  <span className="mbook-gpanel__step-val">{kidAges.length}</span>
                  <button onClick={() => setKids(kidAges.length + 1)} disabled={kidAges.length >= 4}>+</button>
                </div>
              </div>

              {kidAges.length > 0 && (
                <div className="mbook-gpanel__ages">
                  <span className="mbook-gpanel__ages-lbl">— {anyUnset ? 'Set each child\'s age' : 'Children\'s ages'}</span>
                  <div className="mbook-gpanel__ages-grid">
                    {kidAges.map((age, i) => (
                      <label key={i} className={`mbook-gpanel__age ${age === null ? 'unset' : ''}`}>
                        <span className="mbook-gpanel__age-lbl">Child {i + 1}</span>
                        <select value={age === null ? '' : age} onChange={(e) => setAge(i, e.target.value)}>
                          <option value="">— Select age</option>
                          <option value="0">Under 1</option>
                          {Array.from({length: 12}, (_, k) => (
                            <option key={k+1} value={k+1}>{k+1} year{k+1>1?'s':''} old</option>
                          ))}
                        </select>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="mbook-gpanel__row">
                <div>
                  <div className="mbook-gpanel__name">Cabins</div>
                  <div className="mbook-gpanel__meta">
                    One cabin sleeps 2 adults
                    {rooms === evalRes.recommendedRooms && rooms > 1 && <span className="pill bindu">Recommended</span>}
                    {rooms !== evalRes.recommendedRooms && evalRes.recommendedRooms > 1 && <span className="pill">Try {evalRes.recommendedRooms}</span>}
                  </div>
                </div>
                <div className="mbook-gpanel__step">
                  <button onClick={() => setRooms(rooms - 1)} disabled={rooms <= 1}>−</button>
                  <span className="mbook-gpanel__step-val">{rooms}</span>
                  <button onClick={() => setRooms(rooms + 1)} disabled={rooms >= 4}>+</button>
                </div>
              </div>
            </div>
          )}

          {evalRes.strategy && ['upsell-van','split','over-capacity','family-fit'].includes(evalRes.strategy.kind) && (
            <div className="mbook-smart">
              <span className="mbook-smart__lbl">— {evalRes.strategy.kind === 'upsell-van' ? 'A better fit' : evalRes.strategy.kind === 'family-fit' ? 'Family-friendly' : 'Recommended'}</span>
              <div className="mbook-smart__msg">{evalRes.strategy.title}. {evalRes.strategy.msg}</div>
              {(evalRes.strategy.primary || evalRes.strategy.secondary) && (
                <div className="mbook-smart__actions">
                  {evalRes.strategy.primary && (
                    <button onClick={() => handleStrategy(evalRes.strategy.primary)}>{evalRes.strategy.primary.label} →</button>
                  )}
                  {evalRes.strategy.secondary && (
                    <button className="alt" onClick={() => handleStrategy(evalRes.strategy.secondary)}>{evalRes.strategy.secondary.label}</button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Experience upsells */}
          <ExperienceUpsells
            selected={experiences}
            onToggle={toggleExp}
          />

          <div className="mbook-trust">
            <svg viewBox="0 0 24 24"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"/><path d="M9 12l2 2 4-4"/></svg>
            <span><b>Free cancellation</b>{arriveDate ? ` until ${cancelBy}` : ''}.</span>
          </div>

          {nights > 0 && (
            <div className="mbook-breakdown">
              <div className="line">
                <span>₹{PROPERTY.nightly.toLocaleString('en-IN')} × {nights} night{nights !== 1 ? 's' : ''}{rooms > 1 ? ` × ${rooms} cabins` : ''}</span>
                <span>₹{cabinSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {childSurchargeTotal > 0 && (
                <div className="line"><span>Children (5–12) × {nights} nights</span><span>₹{childSurchargeTotal.toLocaleString('en-IN')}</span></div>
              )}
              {evalRes.toddlers > 0 && (
                <div className="line sm"><span>Under-5 guests ({evalRes.toddlers})</span><span>Free</span></div>
              )}
              {expTotal > 0 && (
                <div className="line"><span>Experiences ({experiences.size})</span><span>₹{expTotal.toLocaleString('en-IN')}</span></div>
              )}
              {longStaySave > 0 && (
                <div className="line save"><span>— Long-stay pass-back</span><span>− ₹{longStaySave.toLocaleString('en-IN')}</span></div>
              )}
              <div className="line sm"><span>Taxes &amp; community share</span><span>₹{taxes.toLocaleString('en-IN')}</span></div>
              <div className="line total"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
            </div>
          )}
        </div>

        <div className="mbook-sheet__foot">
          <AppDownloadRow />
          <button
            className="mbook-sheet__cta"
            disabled={datesIncomplete || anyUnset || !evalRes.fits}
            onClick={() => { if (!datesIncomplete && !anyUnset && evalRes.fits) window.__openPbh?.(); }}
          >
            {datesIncomplete ? 'Choose dates to continue'
              : anyUnset ? 'Set children\'s ages'
              : !evalRes.fits ? 'Adjust cabins to continue'
              : `Confirm · ₹${total.toLocaleString('en-IN')}`}
          </button>
          <p className="mbook-sheet__hint">No payment yet — we hold the cabin for 24 hours.</p>
        </div>
      </div>
    </div>
  );
}

// ============ MOBILE PEEK BAR ============
function MobileBookBar({ onOpen, state }) {
  const { arriveDate, departDate, adults, kidAges, rooms } = state;
  const nights = nightsBetween(arriveDate, departDate);
  const summary = arriveDate && departDate
    ? `${arriveDate.getDate()} ${MONTH_ABBR[arriveDate.getMonth()]} — ${departDate.getDate()} ${MONTH_ABBR[departDate.getMonth()]} · ${adults + kidAges.length} guest${adults+kidAges.length!==1?'s':''} · ${rooms} cabin${rooms!==1?'s':''}`
    : '— Tap to choose dates';
  return (
    <div className="mbook-bar" onClick={onOpen} role="button" aria-label="Open booking">
      <div className="mbook-bar__handle"></div>
      <div className="mbook-bar__price">
        <b>₹{PROPERTY.nightly.toLocaleString('en-IN')}<span style={{fontSize:11, marginLeft:6, color:'var(--moss)'}}>/ night</span></b>
        <span>{summary}</span>
      </div>
      <button className="mbook-bar__cta" onClick={(e) => { e.stopPropagation(); onOpen(); }}>
        {nights > 0 ? 'Reserve' : 'Check'}
      </button>
    </div>
  );
}

// ============ TAB ICONS ============
const TabIcon = ({ name }) => {
  const paths = {
    discover: <><circle cx="12" cy="12" r="9"/><polygon points="14.5 9.5 11 11 9.5 14.5 13 13" fill="currentColor" stroke="none"/></>,
    saved: <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>,
    itin: <><rect x="4" y="5" width="16" height="16" rx="1"/><path d="M4 9h16M9 3v4M15 3v4"/></>,
    me: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></>,
  };
  return <svg viewBox="0 0 24 24">{paths[name] || paths.discover}</svg>;
};

// ============ BOTTOM TAB NAV ============
function MobileTabNav({ active, onChange, savedCount, hasItin }) {
  return (
    <nav className="mtab" aria-label="Primary">
      <button className={`mtab__btn ${active === 'stay' ? 'on' : ''}`} onClick={() => onChange('stay')}>
        <TabIcon name="discover" />
        <span>Stay</span>
      </button>
      <button className={`mtab__btn ${active === 'saved' ? 'on' : ''}`} onClick={() => onChange('saved')}>
        <TabIcon name="saved" />
        {savedCount > 0 && <span className="mtab__btn-badge">{savedCount}</span>}
        <span>Saved</span>
      </button>
      <button className={`mtab__btn ${active === 'itin' ? 'on' : ''}`} onClick={() => onChange('itin')}>
        <TabIcon name="itin" />
        {hasItin && <span className="mtab__btn-badge">1</span>}
        <span>Itinerary</span>
      </button>
      <button className={`mtab__btn ${active === 'me' ? 'on' : ''}`} onClick={() => onChange('me')}>
        <TabIcon name="me" />
        <span>Me</span>
      </button>
    </nav>
  );
}

// ============ TAB PAGES (Saved / Itinerary / Me) ============
function SavedPage({ on, saved }) {
  return (
    <div className={`mtab-page ${on ? 'on' : ''}`}>
      <div className="mtab-page__top">
        <span className="mtab-page__eyebrow">— EKAM</span>
        <h2 className="mtab-page__title"><em>Saved.</em></h2>
      </div>
      <div className="mtab-page__body">
        {saved ? (
          <div className="saved-card">
            <div className="saved-card__img g1"></div>
            <div className="saved-card__body">
              <span className="saved-card__name">{PROPERTY.name}</span>
              <span className="saved-card__meta">{PROPERTY.region} · {PROPERTY.elev}</span>
              <span className="saved-card__price">₹{PROPERTY.nightly.toLocaleString('en-IN')} / night · {PROPERTY.rating} ★</span>
            </div>
          </div>
        ) : (
          <div className="mtab-page__quiet">
            <svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
            <b>Nothing saved yet</b>
            Tap the heart on any cabin to keep it here for later.
          </div>
        )}
      </div>
    </div>
  );
}

function ItineraryPage({ on, state, hasItin }) {
  const { arriveDate, departDate, adults, kidAges, rooms, experiences } = state;
  const nights = nightsBetween(arriveDate, departDate);
  if (!hasItin) {
    return (
      <div className={`mtab-page ${on ? 'on' : ''}`}>
        <div className="mtab-page__top">
          <span className="mtab-page__eyebrow">— EKAM</span>
          <h2 className="mtab-page__title"><em>Your itinerary.</em></h2>
        </div>
        <div className="mtab-page__body">
          <div className="mtab-page__quiet">
            <svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="16" rx="1"/><path d="M4 9h16M9 3v4M15 3v4"/></svg>
            <b>No trip yet</b>
            Choose dates and you'll see your stay come together here.
          </div>
        </div>
      </div>
    );
  }
  const cabinSubtotal = nights * PROPERTY.nightly * rooms;
  return (
    <div className={`mtab-page ${on ? 'on' : ''}`}>
      <div className="mtab-page__top">
        <span className="mtab-page__eyebrow">— Held for 24 hours</span>
        <h2 className="mtab-page__title"><em>Your stay.</em></h2>
      </div>
      <div className="mtab-page__body">
        <div className="itin">
          <div className="itin__head">
            <span className="itin__name">{PROPERTY.name} <em>· {PROPERTY.tier}</em></span>
            <span className="itin__status">Held</span>
          </div>
          <div className="itin__row"><span>Dates</span><span>{fmtDate(arriveDate)} → {fmtDate(departDate)}</span></div>
          <div className="itin__row"><span>Nights</span><span>{nights}</span></div>
          <div className="itin__row"><span>Guests</span><span>{adults} adults{kidAges.length ? `, ${kidAges.length} children` : ''}</span></div>
          <div className="itin__row"><span>Cabins</span><span>{rooms}</span></div>
          {experiences.size > 0 && (
            <div className="itin__row"><span>Experiences</span><span>{experiences.size} added</span></div>
          )}
          <div className="itin__total"><span style={{fontFamily:'var(--font-ui)',fontSize:11,letterSpacing:1,textTransform:'uppercase',color:'var(--moss)'}}>Reserved</span><b>₹{cabinSubtotal.toLocaleString('en-IN')}</b></div>
        </div>
      </div>
    </div>
  );
}

function MePage({ on }) {
  return (
    <div className={`mtab-page ${on ? 'on' : ''}`}>
      <div className="mtab-page__top">
        <span className="mtab-page__eyebrow">— EKAM</span>
        <h2 className="mtab-page__title"><em>You.</em></h2>
      </div>
      <div className="mtab-page__body">
        <div className="mtab-page__quiet">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>
          <b>Sign in</b>
          To remember saved cabins and resume bookings across devices.
        </div>
      </div>
    </div>
  );
}

function CategoryGallery() {
  const [cat, setCat] = useState('Cabin');
  const tiles = GALLERY[cat];

  return (
    <React.Fragment>
      <div className="cat-tabs">
        {Object.keys(GALLERY).map(k => (
          <button key={k} className={`cat-tab ${cat === k ? 'on' : ''}`} onClick={() => setCat(k)}>{k}</button>
        ))}
      </div>
      <div className="masonry">
        {tiles.map((g, i) => (
          <div
            key={i}
            className={`m-tile ${g} ${i === 0 ? 'tall' : ''} ${i === 3 ? 'wide' : ''}`}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

// ============ CAPACITY ENGINE ============
// Per Kutir cabin: 2 adults + 1 child (under 12) on trundle.
// A "young adult" (13+) counts as adult.
// Pricing: under 5 free; 5–12 ₹2,000/night surcharge; 13+ counts as adult occupancy.
function evaluateParty({ adults, kidAges, rooms }) {
  const youngAdults  = kidAges.filter(a => a !== null && a >= 13).length;
  const olderKids    = kidAges.filter(a => a !== null && a >= 5 && a < 13).length;
  const toddlers     = kidAges.filter(a => a !== null && a < 5).length;
  const hasInfant    = kidAges.some(a => a !== null && a < 2);
  const childrenSet  = kidAges.length === 0 || kidAges.every(a => a !== null);

  const totalAdults  = adults + youngAdults;
  const totalChildren = olderKids + toddlers;

  // Per cabin: max 2 adults; +1 child (5-12) on trundle; toddlers don't count against capacity (crib).
  const adultsPerCabin = 2;
  const cabinsForAdults = Math.ceil(totalAdults / adultsPerCabin);
  const recommendedRooms = Math.max(1, cabinsForAdults);

  // Capacity check at current room count
  const adultCapacity = rooms * adultsPerCabin;
  const childTrundleCapacity = rooms; // one trundle per cabin
  const adultsOK = totalAdults <= adultCapacity;
  const olderKidsOK = olderKids <= childTrundleCapacity;
  const fits = adultsOK && olderKidsOK && childrenSet;

  // Surcharges
  const childSurcharge = olderKids * 2000;

  // Recommendation strategy
  let strategy = null;
  if (totalAdults >= 3 && totalAdults <= 4 && rooms === 1) {
    strategy = {
      kind: 'upsell-van',
      title: 'For 3–4 guests, the Van cabin fits better',
      msg: `Two cabins works, but our Van tier sleeps four in one space — and feels like one stay, not two.`,
      primary: { label: 'See Van cabins', href: '#' },
      secondary: { label: 'Add a second Kutir', action: 'add-room' },
    };
  } else if (totalAdults >= 5) {
    strategy = {
      kind: 'split',
      title: `For ${totalAdults} adults, ${recommendedRooms} cabins fit best`,
      msg: `We'll place them side-by-side. If you'd prefer one larger space, the Shikhar suite sleeps six.`,
      primary: { label: `Reserve ${recommendedRooms} cabins`, action: 'set-rooms', value: recommendedRooms },
      secondary: { label: 'See Shikhar', href: '#' },
    };
  } else if (totalAdults === 2 && olderKids >= 1 && rooms === 1) {
    strategy = {
      kind: 'family-fit',
      title: 'Family of three or four fits this cabin',
      msg: hasInfant
        ? 'Trundle bed added at no charge. A crib will be waiting in the cabin — no need to request.'
        : 'One trundle bed is included for the child. No extra cabin needed.',
      primary: null, secondary: null,
    };
  } else if (!adultsOK) {
    strategy = {
      kind: 'over-capacity',
      title: 'This cabin sleeps 2 adults',
      msg: `You've selected ${totalAdults} adults across ${rooms} cabin${rooms>1?'s':''}. We recommend ${recommendedRooms} cabins to fit comfortably.`,
      primary: { label: `Set ${recommendedRooms} cabins`, action: 'set-rooms', value: recommendedRooms },
      secondary: null,
    };
  } else if (!childrenSet) {
    strategy = {
      kind: 'needs-ages',
      title: 'Tell us your children\'s ages',
      msg: 'We use ages to plan beds, cribs, and meals — and to keep pricing fair (under 5 stay free).',
      primary: null, secondary: null,
    };
  }

  return {
    totalAdults, totalChildren, olderKids, toddlers, hasInfant,
    recommendedRooms, fits, childrenSet, childSurcharge, strategy,
  };
}

function summarizeGuests({ adults, kidAges, rooms }) {
  const childCount = kidAges.length;
  const parts = [];
  parts.push(`${adults} adult${adults !== 1 ? 's' : ''}`);
  if (childCount > 0) parts.push(`${childCount} child${childCount !== 1 ? 'ren' : ''}`);
  parts.push(`${rooms} cabin${rooms !== 1 ? 's' : ''}`);
  return parts.join(' · ');
}

// ============ GUEST POPOVER ============
function GuestPopover({ adults, kidAges, rooms, onChange, onDone, recommendedRooms, smartLine, anyUnset }) {
  const stop = (e) => e.stopPropagation();
  const setAdults = (n) => onChange({ adults: Math.max(1, Math.min(8, n)), kidAges, rooms });
  const setKids = (n) => {
    n = Math.max(0, Math.min(4, n));
    let next = kidAges.slice(0, n);
    while (next.length < n) next.push(null);
    onChange({ adults, kidAges: next, rooms });
  };
  const setAge = (i, age) => {
    const next = [...kidAges];
    next[i] = age === '' ? null : Number(age);
    onChange({ adults, kidAges: next, rooms });
  };
  const setRooms = (n) => onChange({ adults, kidAges, rooms: Math.max(1, Math.min(4, n)) });
  const clear = () => onChange({ adults: 1, kidAges: [], rooms: 1 });

  return (
    <div className="gp" onClick={stop}>
      <div className="gp__row">
        <div className="gp__row-lbl">
          <span className="gp__row-name">Adults</span>
          <span className="gp__row-meta">Ages 13 and over</span>
        </div>
        <div className="gp__step">
          <button onClick={() => setAdults(adults - 1)} disabled={adults <= 1} aria-label="Decrease adults">−</button>
          <span className="gp__step-val">{adults}</span>
          <button onClick={() => setAdults(adults + 1)} disabled={adults >= 8} aria-label="Increase adults">+</button>
        </div>
      </div>

      <div className="gp__row">
        <div className="gp__row-lbl">
          <span className="gp__row-name">Children</span>
          <span className="gp__row-meta">
            Ages 0–12
            <span className="pill">Under 5 free</span>
          </span>
        </div>
        <div className="gp__step">
          <button onClick={() => setKids(kidAges.length - 1)} disabled={kidAges.length <= 0} aria-label="Decrease children">−</button>
          <span className="gp__step-val">{kidAges.length}</span>
          <button onClick={() => setKids(kidAges.length + 1)} disabled={kidAges.length >= 4} aria-label="Increase children">+</button>
        </div>
      </div>

      {kidAges.length > 0 && (
        <div className="gp__ages">
          <span className="gp__ages-lbl">— {anyUnset ? 'Set each child\'s age' : 'Children\'s ages'}</span>
          <div className="gp__ages-grid">
            {kidAges.map((age, i) => (
              <label key={i} className={`gp__age-card ${age === null ? 'unset' : ''}`}>
                <span className="gp__age-card-lbl">Child {i + 1}</span>
                <select value={age === null ? '' : age} onChange={(e) => setAge(i, e.target.value)}>
                  <option value="">— Select age</option>
                  <option value="0">Under 1</option>
                  {Array.from({length: 12}, (_, k) => (
                    <option key={k+1} value={k+1}>{k+1} year{k+1>1?'s':''} old</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="gp__row">
        <div className="gp__row-lbl">
          <span className="gp__row-name">Cabins</span>
          <span className="gp__row-meta">
            One cabin sleeps 2 adults
            {rooms === recommendedRooms && rooms > 1 && <span className="pill bindu">Recommended</span>}
            {rooms !== recommendedRooms && recommendedRooms > 1 && <span className="pill">Try {recommendedRooms}</span>}
          </span>
        </div>
        <div className="gp__step">
          <button onClick={() => setRooms(rooms - 1)} disabled={rooms <= 1} aria-label="Decrease cabins">−</button>
          <span className="gp__step-val">{rooms}</span>
          <button onClick={() => setRooms(rooms + 1)} disabled={rooms >= 4} aria-label="Increase cabins">+</button>
        </div>
      </div>

      {smartLine && (
        <div className="gp__smart">
          <span className="dot"></span>
          <span>{smartLine}</span>
        </div>
      )}

      <div className="gp__foot">
        <button className="gp__foot-clear" onClick={clear}>Clear</button>
        <button className="gp__foot-done" onClick={onDone} disabled={anyUnset}>
          {anyUnset ? 'Set ages to continue' : 'Done'}
        </button>
      </div>
    </div>
  );
}

// ============ BOOKING CARD ============
function BookingCard() {
  const [arrive, setArrive] = useState('12 Mar 2026');
  const [depart, setDepart] = useState('15 Mar 2026');
  const [adults, setAdults] = useState(2);
  const [kidAges, setKidAges] = useState([]);
  const [rooms, setRooms] = useState(1);
  const [guestOpen, setGuestOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const guestFieldRef = useRef(null);

  const nights = 3;
  const evalRes = useMemo(
    () => evaluateParty({ adults, kidAges, rooms }),
    [adults, kidAges, rooms]
  );
  const anyUnset = kidAges.some(a => a === null);

  // Pricing — with weekend (Fri/Sat) intelligence
  const arriveD = new Date(2026, 2, 12);
  const departD = new Date(2026, 2, 15);
  const wb = weekendBreakdown(arriveD, departD, PROPERTY.nightly);
  const cabinSubtotal = (wb.weekday * wb.weekdayRate + wb.weekend * wb.weekendRate) * rooms;
  const childSurchargeTotal = evalRes.childSurcharge * nights;
  const subtotal = cabinSubtotal + childSurchargeTotal;
  const longStaySave = nights >= 3 ? Math.round(PROPERTY.nightly * rooms * 0.08) : 0;
  const afterSave = subtotal - longStaySave;
  const taxes = Math.round(afterSave * 0.05);
  const total = afterSave + taxes;

  // Cancellation date = arrival - 7 days. (Hardcoded display since we don't have a real date picker yet.)
  const cancelBy = '5 March 2026';

  // Close on outside click / escape
  useEffect(() => {
    if (!guestOpen) return;
    const onDoc = (e) => {
      if (!guestFieldRef.current?.contains(e.target)) setGuestOpen(false);
    };
    const onEsc = (e) => { if (e.key === 'Escape') setGuestOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, [guestOpen]);

  // Smart message inside the popover (one-liner)
  const popoverSmartLine = (() => {
    if (anyUnset) return 'Set ages to continue — under 5 stay free, 5–12 add ₹2,000 per night.';
    if (evalRes.strategy?.kind === 'over-capacity') return evalRes.strategy.msg;
    if (evalRes.strategy?.kind === 'split') return evalRes.strategy.msg;
    if (evalRes.strategy?.kind === 'upsell-van') return evalRes.strategy.msg;
    if (evalRes.strategy?.kind === 'family-fit') return evalRes.strategy.msg;
    return 'Two adults, one cabin. A quiet fit.';
  })();

  const handleStrategy = (action) => {
    if (!action) return;
    if (action.action === 'set-rooms' && action.value) setRooms(action.value);
    if (action.action === 'add-room') setRooms(r => Math.min(4, r + 1));
    if (action.href) {
      // demo: would navigate to van listing
      console.log('would navigate', action.href);
    }
  };

  return (
    <aside className="book">
      <div className="book__top">
        <span className="book__price">₹{PROPERTY.nightly.toLocaleString('en-IN')}</span>
        <span className="book__per">/ night</span>
        <span className="book__star"><span>●</span> {PROPERTY.rating} · {bucketStays(PROPERTY.reviews)}</span>
      </div>

      <div className="book__urgency">
        <span className="pulse"></span>
        <span>{seasonalUrgency().copy}</span>
      </div>

      <div className="book__group">
        <div className="book__field-row">
          <div className="book__field">
            <span className="book__field-lbl">Arrive</span>
            <span className="book__field-val">{arrive}</span>
          </div>
          <div className="book__field">
            <span className="book__field-lbl">Depart</span>
            <span className="book__field-val">{depart} <em>· {nights} nights</em></span>
          </div>
        </div>
        <div
          ref={guestFieldRef}
          className={`book__field ${guestOpen ? 'open' : ''}`}
          onClick={() => setGuestOpen(!guestOpen)}
        >
          <span className="book__field-lbl">Guests &amp; cabins</span>
          <span className="book__field-val">{summarizeGuests({adults, kidAges, rooms})}</span>
          <span className="book__field-chev">▾</span>

          {guestOpen && (
            <GuestPopover
              adults={adults} kidAges={kidAges} rooms={rooms}
              recommendedRooms={evalRes.recommendedRooms}
              smartLine={popoverSmartLine}
              anyUnset={anyUnset}
              onChange={({ adults, kidAges, rooms }) => {
                setAdults(adults); setKidAges(kidAges); setRooms(rooms);
              }}
              onDone={() => setGuestOpen(false)}
            />
          )}
        </div>
      </div>

      {evalRes.strategy && (evalRes.strategy.kind === 'upsell-van' || evalRes.strategy.kind === 'split' || evalRes.strategy.kind === 'over-capacity') && !guestOpen && (
        <div className="book__smart">
          <span className="book__smart-lbl">— {evalRes.strategy.kind === 'upsell-van' ? 'A better fit' : 'Recommended'}</span>
          <span className="book__smart-msg">{evalRes.strategy.title}. {evalRes.strategy.msg}</span>
          <div className="book__smart-actions">
            {evalRes.strategy.primary && (
              <button className="book__smart-action" onClick={() => handleStrategy(evalRes.strategy.primary)}>
                {evalRes.strategy.primary.label} →
              </button>
            )}
            {evalRes.strategy.secondary && (
              <button className="book__smart-action alt" onClick={() => handleStrategy(evalRes.strategy.secondary)}>
                {evalRes.strategy.secondary.label}
              </button>
            )}
          </div>
        </div>
      )}

      <button
        className="book__cta"
        disabled={anyUnset || !evalRes.fits}
        onClick={() => { if (!anyUnset && evalRes.fits) window.__openPbh?.(); }}
      >
        {anyUnset ? 'Set children\'s ages' : !evalRes.fits ? 'Adjust cabins to continue' : `Reserve · ₹${total.toLocaleString('en-IN')}`}
      </button>
      <p className="book__hint">No payment yet — we hold the cabin for 24 hours.</p>

      <div className="book__trust">
        <svg viewBox="0 0 24 24"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"/><path d="M9 12l2 2 4-4"/></svg>
        <span><b>Free cancellation</b> until {cancelBy} — seven days before arrival.</span>
      </div>

      <div className="book__breakdown">
        {(() => {
          const hint = bestValueHint({ arriveDate: arriveD, departDate: departD, baseRate: PROPERTY.nightly });
          if (!hint) return null;
          return (
            <div className="book__bestvalue">
              <span className="book__bestvalue-lbl">— Best value</span>
              <span className="book__bestvalue-msg">{hint.copy}</span>
            </div>
          );
        })()}
        {wb.weekday > 0 && (
          <div className="book__line">
            <span>Weekday nights · ₹{wb.weekdayRate.toLocaleString('en-IN')} × {wb.weekday}{rooms > 1 ? ` × ${rooms}` : ''}</span>
            <span>₹{(wb.weekday * wb.weekdayRate * rooms).toLocaleString('en-IN')}</span>
          </div>
        )}
        {wb.weekend > 0 && (
          <div className="book__line">
            <span>Weekend nights · ₹{wb.weekendRate.toLocaleString('en-IN')} × {wb.weekend}{rooms > 1 ? ` × ${rooms}` : ''}</span>
            <span>₹{(wb.weekend * wb.weekendRate * rooms).toLocaleString('en-IN')}</span>
          </div>
        )}
        {childSurchargeTotal > 0 && (
          <div className="book__line"><span>Children (5–12) × {nights} nights</span><span>₹{childSurchargeTotal.toLocaleString('en-IN')}</span></div>
        )}
        {evalRes.toddlers > 0 && (
          <div className="book__line sm"><span>Under-5 guests ({evalRes.toddlers})</span><span>Free</span></div>
        )}
        {longStaySave > 0 && (
          <div className="book__line save"><span>— Long-stay pass-back (3+ nights)</span><span>− ₹{longStaySave.toLocaleString('en-IN')}</span></div>
        )}
        <div className="book__line sm"><span>Taxes &amp; community share</span><span>₹{taxes.toLocaleString('en-IN')}</span></div>
        <div className="book__line total"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
      </div>
    </aside>
  );
}

function LocationMap() {
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  useEffect(() => {
    if (typeof L === 'undefined' || !mapEl.current || mapRef.current) return;
    const map = L.map(mapEl.current, {
      center: [PROPERTY.lat, PROPERTY.lng],
      zoom: 10,
      scrollWheelZoom: false,
      attributionControl: false,
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', { maxZoom: 18 }).addTo(map);
    L.control.attribution({ position: 'bottomleft', prefix: '' }).addTo(map);
    L.marker([PROPERTY.lat, PROPERTY.lng], {
      icon: L.divIcon({
        className: 'ekam-marker',
        html: '<span class="em-dot"></span>',
        iconSize: [20, 20], iconAnchor: [10, 10],
      }),
    }).addTo(map);
    mapRef.current = map;
  }, []);
  return <div className="loc-pdp" ref={mapEl} />;
}

// ============ SHARE MODAL ============
function ShareModal({ on, onClose, signedInUser }) {
  const [note, setNote] = useState('');
  const [sentVia, setSentVia] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const placeUrl = `ekam.in/binsar`;
  const fullUrl  = `https://ekam.in/binsar?from=${signedInUser ? signedInUser.handle : 'aarav'}`;

  // Pull-from + initial (avatar)
  const inviter = signedInUser
    ? { kind: 'self',  name: signedInUser.name,  initial: signedInUser.initial,  line: 'invites you to see this cabin' }
    : { kind: 'host',  name: PROPERTY.hostName,  initial: PROPERTY.hostName.charAt(0), line: <>welcomes you to <b>{PROPERTY.name}</b> · resident host</> };

  // Default note (placeholder)
  const defaultNote = signedInUser
    ? `Found a stone-floored cabin at the edge of an oak forest. Quiet. No WiFi. Thought of us. Take a look — would you come?`
    : `A small cabin at 2,400m. Stone floor, wood stove, one window. The morning belongs to the monal. Come stay.`;

  useEffect(() => {
    if (on) {
      document.body.style.overflow = 'hidden';
      setSentVia(null); setLinkCopied(false);
      return () => { document.body.style.overflow = ''; };
    }
  }, [on]);

  useEffect(() => {
    if (!on) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [on, onClose]);

  const handleScrim = (e) => { if (e.target === e.currentTarget) onClose(); };

  const channels = [
    {
      id: 'copy',
      name: linkCopied ? 'Copied' : 'Copy link',
      icon: linkCopied
        ? <><polyline points="20 6 9 17 4 12"/></>
        : <><rect x="9" y="9" width="12" height="12" rx="1"/><path d="M5 15V5a1 1 0 011-1h10"/></>
    },
    { id: 'email',    name: 'Email',    icon: <><rect x="3" y="5" width="18" height="14" rx="1"/><polyline points="3 6 12 13 21 6"/></> },
    { id: 'whatsapp', name: 'WhatsApp', icon: <><path d="M21 12a9 9 0 01-13.5 7.8L3 21l1.3-4.4A9 9 0 1121 12z"/><path d="M9 9c.5 1.5 1.5 2.5 3 3"/></> },
    { id: 'messages', name: 'Messages', icon: <><path d="M21 12c0 4-4 7-9 7-1.4 0-2.7-.2-4-.7L3 20l1-3.5C3.4 15.3 3 13.7 3 12c0-4 4-7 9-7s9 3 9 7z"/></> },
    { id: 'x',        name: 'X',        icon: <><path d="M4 4l16 16M20 4L4 20"/></> },
    { id: 'facebook', name: 'Facebook', icon: <path d="M16 7h-3a2 2 0 00-2 2v12M8 13h7"/> },
    { id: 'instagram',name: 'Instagram',icon: <><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none"/></> },
    { id: 'more',     name: 'More',     icon: <><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/></> },
  ];

  const doShare = (id) => {
    if (id === 'copy') {
      if (navigator.clipboard) navigator.clipboard.writeText(fullUrl).catch(() => {});
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2400);
      return;
    }
    setSentVia(id);
    setTimeout(() => setSentVia(null), 2200);
  };

  return (
    <div className={`share-overlay ${on ? 'on' : ''}`} onClick={handleScrim} aria-hidden={!on}>
      <div className="share" role="dialog" aria-label="Share this cabin">
        <div className="share__head">
          <span className="share__head-title">Send the cabin <em>— a postcard invite</em></span>
          <button className="share__head-close" onClick={onClose}>— Close</button>
        </div>

        <div className="share__body">
          <div className="share__card">
            <div className="share__card-photo">
              <div className="share__card-stamp">
                <span className="share__card-stamp-dev">{PROPERTY.dev}</span>
                <span className="share__card-stamp-tier">{PROPERTY.tier}</span>
              </div>
              <span className="share__card-eyebrow">— An invitation</span>
            </div>
            <div className="share__card-body">
              <div className="share__card-from">
                <div className="share__card-avatar">{inviter.initial}</div>
                <span className="share__card-from-txt">
                  <b>{inviter.kind === 'self' ? 'From ' : 'From your host, '}{inviter.name}</b><br/>
                  {inviter.line}
                </span>
              </div>
              <h3 className="share__card-name"><em>{PROPERTY.name}.</em></h3>
              <div className="share__card-meta">
                <span>{PROPERTY.region}</span>
                <span className="pipe">·</span>
                <span>{PROPERTY.elev}</span>
                <span className="pipe">·</span>
                <span><b>{PROPERTY.rating}</b> · {bucketStays(PROPERTY.reviews)}</span>
              </div>
              <p className="share__card-note">{note || defaultNote}</p>
              <div className="share__card-rule"></div>
              <div className="share__card-foot">
                <span>— Held for 24 hours</span>
                <span><b>₹{PROPERTY.nightly.toLocaleString('en-IN')}</b> / night</span>
              </div>
            </div>
          </div>

          <div className="share__note">
            <label className="share__note-lbl">— Add a personal note <span style={{color:'var(--moss)', textTransform:'none', letterSpacing:0, fontStyle:'italic', marginLeft:6, fontSize:11}}>optional</span></label>
            <textarea
              rows={3}
              maxLength={240}
              placeholder={defaultNote}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="share__note-count">{note.length}/240</div>
          </div>

          <div className="share__link">
            <span className="share__link-url">{fullUrl}</span>
            <button
              className={`share__link-copy ${linkCopied ? 'done' : ''}`}
              onClick={() => doShare('copy')}
            >
              {linkCopied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="share__channels">
          <span className="share__channels-lbl">— Send via</span>
          <div className="share__channel-grid">
            {channels.map(c => (
              <button
                key={c.id}
                className={`share__channel ${sentVia === c.id ? 'sent' : ''} ${c.id === 'copy' && linkCopied ? 'sent' : ''}`}
                onClick={() => doShare(c.id)}
              >
                <svg viewBox="0 0 24 24">{c.icon}</svg>
                <span className="share__channel-name">{sentVia === c.id ? 'Sent ✓' : c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ TWEAK DEFAULTS ============
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "proofVariant": "returning",
  "showUrgency": true,
  "showTrustStrip": true,
  "showAppDownload": true,
  "showCreators": true,
  "signedIn": false
}/*EDITMODE-END*/;

// ============ POST-BOOKING APP HANDOFF ============
function PostBookingHandoff({ on, onClose, booking }) {
  useEffect(() => {
    if (on) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [on]);

  useEffect(() => {
    if (!on) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [on, onClose]);

  if (!on) return null;
  const bookingCode = booking?.code || 'EKM-7842';
  const dates = booking?.dates || '12 — 15 Mar 2026';

  return (
    <div className="pbh" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pbh__panel" role="dialog" aria-label="Booking confirmed">
        <button className="pbh__close" onClick={onClose} aria-label="Close">— Close</button>

        <div className="pbh__top">
          <span className="pbh__eyebrow">— Reserved · we have your cabin</span>
          <h2 className="pbh__title">Your retreat companion <em>is ready.</em></h2>
          <p className="pbh__sub">
            The cabin is held for {dates}. We'll send you a few quiet messages between now and arrival — nothing more.
            The app keeps everything in one place when you're there.
          </p>
          <div className="pbh__code">
            <span className="pbh__code-lbl">— Confirmation</span>
            <span className="pbh__code-val">{bookingCode}</span>
          </div>
        </div>

        <div className="pbh__grid">
          <div className="pbh__qrcard">
            <div className="pbh__qrcard-top">
              <span className="pbh__qrcard-lbl">— Scan to install</span>
              <h3 className="pbh__qrcard-title">EKAM <em>·</em> retreat companion</h3>
            </div>
            <div className="pbh__qr">
              <div className="pbh__qr-inner"></div>
            </div>
            <div className="pbh__badges">
              <a className="pbh__badge" href="#">
                <svg viewBox="0 0 24 24"><path d="M17.05 12.04c-.03-2.85 2.33-4.21 2.44-4.28-1.33-1.94-3.4-2.21-4.13-2.24-1.76-.18-3.43 1.03-4.32 1.03-.89 0-2.27-1.01-3.73-.98-1.92.03-3.69 1.11-4.68 2.82-2 3.47-.51 8.6 1.43 11.42.95 1.38 2.08 2.92 3.55 2.87 1.42-.06 1.96-.92 3.68-.92 1.72 0 2.21.92 3.72.89 1.54-.02 2.51-1.4 3.45-2.79 1.09-1.6 1.54-3.15 1.56-3.23-.03-.01-2.99-1.15-3.02-4.56zM14.34 3.79c.78-.94 1.3-2.25 1.16-3.56-1.12.05-2.48.75-3.28 1.69-.72.83-1.35 2.16-1.18 3.45 1.25.1 2.52-.64 3.3-1.58z" fill="currentColor"/></svg>
                <span><small>Download on</small><b>App Store</b></span>
              </a>
              <a className="pbh__badge" href="#">
                <svg viewBox="0 0 24 24"><path d="M3.61 1.84a2 2 0 00-.74 1.54v17.24c0 .6.27 1.15.74 1.54l9.51-9.66L3.61 1.84zM14.54 12.5l2.66 2.7-12.84 7.36 10.18-10.06zm0-1L4.36 1.44 17.2 8.8l-2.66 2.7zM21 11l-2.8-1.61L14.95 12 18.2 14.61 21 13c1.33-.77 1.33-2.23 0-3z" fill="currentColor"/></svg>
                <span><small>Get it on</small><b>Google Play</b></span>
              </a>
            </div>
          </div>

          <div className="pbh__benefits">
            <span className="pbh__benefits-lbl">— What's inside the app</span>
            <ul className="pbh__benefits-list">
              <li>
                <span className="pbh__benefit-num">01</span>
                <div>
                  <b>Your itinerary</b>
                  Dates, gate code, hot-water windows, today's ritual — offline-ready.
                </div>
              </li>
              <li>
                <span className="pbh__benefit-num">02</span>
                <div>
                  <b>Aarav on speed-dial</b>
                  Your resident host, one tap. 7am to 9pm.
                </div>
              </li>
              <li>
                <span className="pbh__benefit-num">03</span>
                <div>
                  <b>Digital check-in</b>
                  Skip the desk. The cabin door knows you're coming.
                </div>
              </li>
              <li>
                <span className="pbh__benefit-num">04</span>
                <div>
                  <b>Local recommendations</b>
                  Trail map, three teas, the one bakery worth the walk.
                </div>
              </li>
              <li>
                <span className="pbh__benefit-num">05</span>
                <div>
                  <b>Support anytime</b>
                  A small team that picks up. No bot. No queue.
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pbh__foot">
          <span>
            <svg viewBox="0 0 24 24" style={{width:14, height:14, marginRight:6, verticalAlign:'middle', stroke:'var(--bindu)', strokeWidth:1.6, fill:'none'}}><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"/><path d="M9 12l2 2 4-4"/></svg>
            Free cancellation until <b>5 March 2026</b>.
          </span>
          <button className="pbh__cta" onClick={onClose}>I'll install later →</button>
        </div>
      </div>
    </div>
  );
}

// ============ POST-BOOKING APP HANDOFF (end) ============

// ============ APP ============
function App() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [mGalOpen, setMGalOpen] = useState(false);
  const [mGalCat, setMGalCat] = useState('Cabin');
  const [mGalStart, setMGalStart] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [pbhOpen, setPbhOpen] = useState(false);
  const [tab, setTab] = useState('stay');

  // Shared booking state — synced between desktop card and mobile sheet
  const [bookingState, setBookingState] = useState({
    arriveDate: new Date(2026, 2, 12),  // 12 Mar 2026
    departDate: new Date(2026, 2, 15),  // 15 Mar 2026
    adults: 2,
    kidAges: [],
    rooms: 1,
    experiences: new Set(['bonfire']),  // bonfire is "included" — pre-selected
  });

  const hasItin = bookingState.arriveDate && bookingState.departDate;

  const openMobileGallery = (cat, idx) => {
    setMGalCat(cat || 'Cabin');
    setMGalStart(idx || 0);
    setMGalOpen(true);
  };

  const fav = window.useFavorites ? window.useFavorites() : { has: () => false, toggle: () => {} };
  const saved = fav.has('binsar');

  // Tweaks — useTweaks returns [values, setTweak]
  const [t, setTweak] = (window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}]);

  // Floating booking widget — deeper shadow + lift once user has scrolled past the hero
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 120) document.body.setAttribute('data-scrolled', '');
      else document.body.removeAttribute('data-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Expose a global trigger so any Reserve button (desktop or mobile) can open
  // the post-booking handoff — keeps the CTA components decoupled.
  useEffect(() => {
    window.__openPbh = () => { setPbhOpen(true); setSheetOpen(false); };
    return () => { delete window.__openPbh; };
  }, []);

  return (
    <React.Fragment>
      {/* NAV */}
      <nav className="nav">
        <a className="nav__brand" href="index.html"><svg><use href="#wm-light"/></svg></a>
        <div className="nav__center">
          <span>एकम् · KUTIR ·</span>
          <b>Binsar</b>
        </div>
        <div className="nav__right">
          <button className="nav__btn">← Back to portfolio</button>
        </div>
      </nav>

      {/* HEADER */}
      <header className="header">
        <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:24, flexWrap:'wrap'}}>
          <div className="header__top" style={{flex:1, minWidth:280}}>
            <span className="header__eyebrow">EKAM · {PROPERTY.dev} · KUTIR</span>
            <h1 className="header__title"><em>{PROPERTY.name}.</em></h1>
            <div className="header__meta">
              <span><span className="star">●</span> <b>{PROPERTY.rating}</b> · {bucketStays(PROPERTY.reviews)}</span>
              <span className="pipe">·</span>
              <span>{PROPERTY.region}</span>
              <span className="pipe">·</span>
              <span>{PROPERTY.elev}</span>
              <span className="pipe">·</span>
              <span style={{display:'flex', alignItems:'center'}}><WeatherPill /></span>
              <span className="pipe drive-sep">·</span>
              <DrivePill />
            </div>
          </div>
          <div className="header__actions">
            <button className="header__action" onClick={() => fav.toggle('binsar')}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill={saved ? '#B4613A' : 'none'} stroke={saved ? '#B4613A' : '#14201A'} strokeWidth="1.6"><path d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z"/></svg>
              {saved ? 'Saved' : 'Save'}
            </button>
            <button className="header__action" onClick={() => setShareOpen(true)}>↗ Share</button>
          </div>
        </div>
      </header>

      {/* HERO GALLERY (desktop) */}
      <div className="hero-grid">
        <div className="tile tile--big" onClick={() => setGalleryOpen(true)}>
          <span className="tile__cat">— Cabin · forest light</span>
        </div>
        <div className="tile tile--a" onClick={() => setGalleryOpen(true)}><span className="tile__cat">Bed</span></div>
        <div className="tile tile--b" onClick={() => setGalleryOpen(true)}><span className="tile__cat">Deck</span></div>
        <div className="tile tile--c" onClick={() => setGalleryOpen(true)}><span className="tile__cat">Stone</span></div>
        <div className="tile tile--d" onClick={() => setGalleryOpen(true)}><span className="tile__cat">Ridge</span></div>
        <button className="gallery-cta" onClick={() => setGalleryOpen(true)}>◇ Show all 28 photographs</button>
      </div>

      {/* HERO GALLERY (mobile) */}
      <MobileHero onOpenGallery={openMobileGallery} />

      {/* SUB-HERO — ideal-for, starting price, live availability */}
      <SubHero />

      {/* TRUST STRIP — 5 hospitality signals */}
      {t.showTrustStrip && <TrustStrip proofVariant={t.proofVariant} />}

      {/* HIGHLIGHTS */}
      <div className="highlights">
        <div className="highlights__inner">
          {PROPERTY.highlights.map(h => (
            <span key={h.label} className="chip"><Icon name={h.icon}/>{h.label}</span>
          ))}
        </div>
      </div>

      {/* MAIN — 2 columns */}
      <main className="main">
        <div className="left">

          {/* OVERVIEW */}
          <section>
            <div className="sec-head">
              <div>
                <span className="sec-eyebrow">— A stone-floored cabin</span>
                <h2 className="sec-title">Quiet by design.</h2>
              </div>
            </div>
            <div className="specs">
              <div className="spec"><div className="spec__lbl">Guests</div><div className="spec__val">2 adults</div></div>
              <div className="spec"><div className="spec__lbl">Bedroom</div><div className="spec__val">1 · low platform</div></div>
              <div className="spec"><div className="spec__lbl">Bathroom</div><div className="spec__val">1 · rain shower</div></div>
              <div className="spec"><div className="spec__lbl">Stay</div><div className="spec__val">Whole cabin</div></div>
            </div>
            <div className="lede-body">
              <p>{PROPERTY.desc1}</p>
              <p>{PROPERTY.desc2}</p>
            </div>
            <div className="host">
              <div className="host__avatar">A</div>
              <div>
                <div className="host__name">Hosted by {PROPERTY.hostName}</div>
                <div className="host__role"><b>EKAM Living</b> · Resident host · Responds within an hour</div>
              </div>
            </div>
            <IncludedBlock />
          </section>

          {/* GALLERY by category */}
          <section>
            <div className="sec-head">
              <div>
                <span className="sec-eyebrow">— The cabin in pictures</span>
                <h2 className="sec-title">Browse by mood.</h2>
              </div>
            </div>
            <CategoryGallery />
          </section>

          {/* CABIN / ROOM DETAILS */}
          <section>
            <div className="sec-head">
              <div>
                <span className="sec-eyebrow">— Inside the cabin</span>
                <h2 className="sec-title">Two rooms, eight feet apart.</h2>
              </div>
            </div>
            <div className="rooms">
              <div className="room">
                <div className="room__photo r1"></div>
                <div className="room__name">The main room</div>
                <div className="room__details">
                  <span>32 sqm</span><span className="pipe">·</span><span>2 adults</span><span className="pipe">·</span><span>1 low king</span>
                </div>
                <p className="room__list">Stone floor with under-floor heating. Wood stove, central. Standing desk under the window. Heated bed with stonewashed linen, one wool blanket folded at the foot.</p>
                <div className="room__price">
                  <span className="room__price-val">₹8,400 <small>/ night</small></span>
                  <span className="room__cta">Includes the deck →</span>
                </div>
              </div>
              <div className="room">
                <div className="room__photo r2"></div>
                <div className="room__name">The bath &amp; pantry</div>
                <div className="room__details">
                  <span>10 sqm</span><span className="pipe">·</span><span>rain shower</span><span className="pipe">·</span><span>pantry</span>
                </div>
                <p className="room__list">Rain shower on stone. Hot water by request — 6:30 and 21:00 by default. Pantry kit stocked for 24 hours: kettle, filter coffee, three teas, local honey, oats, jam.</p>
                <div className="room__price">
                  <span className="room__price-val">— <small>Included</small></span>
                  <span className="room__cta">View pantry list →</span>
                </div>
              </div>
            </div>
          </section>

          {/* EXPERIENCES */}
          <section>
            <div className="sec-head">
              <div>
                <span className="sec-eyebrow">— Walked with the land, slowly</span>
                <h2 className="sec-title">Seven things to do, none required.</h2>
              </div>
            </div>
            <div className="exp-scroller">
              {EXPERIENCES.map(e => (
                <div key={e.id} className="exp-card">
                  <div className={`exp-card__photo ${e.img}`}></div>
                  <div className="exp-card__body">
                    <span className="exp-card__lbl">— {e.lbl}</span>
                    <div className="exp-card__name">{e.name}</div>
                    <p className="exp-card__desc">{e.desc}</p>
                    <div className="exp-card__price">{e.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AMENITIES */}
          <section>
            <div className="sec-head">
              <div>
                <span className="sec-eyebrow">— What's inside</span>
                <h2 className="sec-title">Twenty-three amenities. No more.</h2>
              </div>
            </div>
            {AMENITIES.map(g => (
              <div className="amen-group" key={g.group}>
                <div className="amen-group__head">
                  <span className="amen-group__nm">{g.group}</span>
                  <span className="amen-group__count">{g.items.length} items</span>
                </div>
                <div className="amen-grid">
                  {g.items.map((a, i) => (
                    <div className="amen" key={i}><Icon name={a.icon}/>{a.label}</div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* LOCATION */}
          <section>
            <div className="sec-head">
              <div>
                <span className="sec-eyebrow">— Where it sits</span>
                <h2 className="sec-title">Inside Binsar Wildlife Sanctuary.</h2>
              </div>
            </div>
            <LocationMap />
            <div className="loc-pdp-meta">
              <div><b>Nearest city</b><span>Almora · 28 km</span></div>
              <div><b>Drive route</b><span>Kathgodam → Almora → Binsar gate</span></div>
              <div><b>Best season</b><span>March — June, October</span></div>
              <div><b>Terrain</b><span>Oak-rhododendron · forest road</span></div>
            </div>
          </section>

          {/* APP DOWNLOAD — full band */}
          {t.showAppDownload && <AppDownloadSection />}

          {/* REVIEWS */}
          <section>
            <div className="sec-head">
              <div>
                <span className="sec-eyebrow">— After they left</span>
                <h2 className="sec-title">What guests said, quietly.</h2>
              </div>
            </div>
            <ReviewHighlights />
            <div className="review-summary">
              <div className="review-summary__overall">
                <span className="review-summary__big">{PROPERTY.rating}</span>
                <span className="review-summary__sub">— {bucketStays(PROPERTY.reviews)} · ● {PROPERTY.rating}</span>
              </div>
              {[RATINGS.slice(0, 3), RATINGS.slice(3, 6)].map((col, j) => (
                <div className="cat-rates" key={j}>
                  {col.map(r => (
                    <div className="cat-rate" key={r.lbl}>
                      <span>{r.lbl}</span>
                      <div className="cat-rate__bar"><div className="cat-rate__fill" style={{width: `${(r.val/5)*100}%`}}></div></div>
                      <span className="cat-rate__val">{r.val.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="reviews">
              {REVIEWS.map((r, i) => (
                <div className="review" key={i}>
                  <div className="review__top">
                    <div className="review__avatar">{r.initial}</div>
                    <div>
                      <div className="review__name">{r.name}</div>
                      <div className="review__when">{r.when}</div>
                    </div>
                  </div>
                  <p className="review__quote">"{r.text}"</p>
                </div>
              ))}
            </div>

            {t.showCreators && (
              <React.Fragment>
                <div className="sec-head" style={{marginTop: 48}}>
                  <div>
                    <span className="sec-eyebrow">— Stayed here</span>
                    <h2 className="sec-title" style={{fontSize: 30}}>Writers, photographers, filmmakers.</h2>
                  </div>
                </div>
                <CreatorStays />
              </React.Fragment>
            )}
          </section>

        </div>

        {/* STICKY BOOKING */}
        <BookingCard />
      </main>

      {/* CLOSING CTA */}
      <section className="close">
        <div className="close__inner">
          <div className="close__dev">एकम्</div>
          <div className="close__rule"></div>
          <h2 className="close__title">Disconnect from noise.<br/>Reconnect with stillness.</h2>
          <button className="close__cta">
            <span className="dot"></span>
            Reserve your stay
          </button>
          <p className="close__sub">We hold the cabin for 24 hours. No payment yet.</p>
        </div>
      </section>

      <GalleryModal on={galleryOpen} onClose={() => setGalleryOpen(false)} />
      <ShareModal
        on={shareOpen}
        onClose={() => setShareOpen(false)}
        signedInUser={t.signedIn ? { name: 'Anika', handle: 'anika', initial: 'A' } : null}
      />
      <PostBookingHandoff
        on={pbhOpen}
        onClose={() => setPbhOpen(false)}
        booking={{ code: 'EKM-7842', dates: '12 — 15 Mar 2026' }}
      />

      {/* Mobile-only chrome */}
      <MobileBookBar onOpen={() => setSheetOpen(true)} state={bookingState} />
      <MobileBookingSheet
        on={sheetOpen}
        onClose={() => setSheetOpen(false)}
        state={bookingState}
        setState={setBookingState}
      />
      <MobileGalleryViewer
        on={mGalOpen}
        cat={mGalCat}
        startIndex={mGalStart}
        onClose={() => setMGalOpen(false)}
      />

      {/* Tab pages */}
      <SavedPage on={tab === 'saved'} saved={saved} />
      <ItineraryPage on={tab === 'itin'} state={bookingState} hasItin={hasItin} />
      <MePage on={tab === 'me'} />

      {/* Bottom nav */}
      <MobileTabNav
        active={tab}
        onChange={setTab}
        savedCount={saved ? 1 : 0}
        hasItin={hasItin}
      />

      {/* Tweaks panel — visible only when user toggles edit mode from the toolbar */}
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Trust strip">
            <window.TweakSelect
              label="Proof signal"
              value={t.proofVariant}
              onChange={(v) => setTweak('proofVariant', v)}
              options={[
                { value: 'returning',     label: 'Hosted by EKAM · 1 in 4 return' },
                { value: 'repeat-nights', label: '100+ stays · 500+ nights' },
                { value: 'tenure',        label: 'Three years open' },
                { value: 'first-time',    label: '92% first-stay returns' },
              ]}
            />
            <window.TweakToggle
              label="Show trust strip"
              value={t.showTrustStrip}
              onChange={(v) => setTweak('showTrustStrip', v)}
            />
          </window.TweakSection>

          <window.TweakSection label="Demo state">
            <window.TweakToggle
              label="Signed in as Anika"
              value={t.signedIn}
              onChange={(v) => setTweak('signedIn', v)}
            />
          </window.TweakSection>

          <window.TweakSection label="Page sections">
            <window.TweakToggle
              label="App download band"
              value={t.showAppDownload}
              onChange={(v) => setTweak('showAppDownload', v)}
            />
            <window.TweakToggle
              label="Creator stays"
              value={t.showCreators}
              onChange={(v) => setTweak('showCreators', v)}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
