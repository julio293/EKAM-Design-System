/* global React */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Property & Booking · data
// ════════════════════════════════════════════════════════════════

// The cabin we're showing on this property page.
// In the real app this is loaded from a route param.
const PROPERTY = {
  id: 'binsar',
  name: 'Binsar',
  dev: 'कुटीर',
  tier: 'KUTIR',
  tierName: 'Cabin',
  region: 'Kumaon, Uttarakhand',
  elev: '2,400 m',
  lat: 29.683,
  lng: 79.747,
  nightly: 8400,
  rating: 4.96,
  reviews: 187, // bucketed in UI as "100+ stays"
  hostName: 'Aarav',
  hostSince: 'on site since 2023',
  weather: '14° / 4°',
  drives: ['Almora · 1 hr', 'Kathgodam · 3 hr', 'Pantnagar · 3 hr'],
  cancellation: 'Free up to 7 days before',

  // Cinematic mood for the hero — same vocabulary as home/discover
  mood: 'linear-gradient(180deg, #0c1410 0%, #1F3525 30%, #2B4630 60%, #6a7565 100%)',
  windowLight: { x: 72, y: 64 }, // %, where the firelight from the cabin window sits

  // Gallery — five cards swiped horizontally
  gallery: [
    { id: 'cabin',   moment: 'Forest light · early morning',     grad: 'linear-gradient(180deg, #14201A 0%, #2B4630 50%, #6a7565 100%)' },
    { id: 'deck',    moment: 'The deck · before the kettle',     grad: 'linear-gradient(195deg, #3a4030 0%, #6b6e58 60%, #c9b88c 100%)' },
    { id: 'bath',    moment: 'Rain shower · against river stone',grad: 'linear-gradient(180deg, #2d3838 0%, #5a6660 60%, #7a8378 100%)' },
    { id: 'ridge',   moment: 'Ridge · at last light',            grad: 'linear-gradient(180deg, #2a2620 0%, #6b4a30 40%, #c9853c 75%, #d4a075 100%)' },
    { id: 'fire',    moment: 'Fire pit · after dusk',            grad: 'linear-gradient(180deg, #14201A 0%, #2a1f18 50%, #b4613a 100%)' },
    { id: 'bed',     moment: 'The bed · forest beyond',          grad: 'linear-gradient(195deg, #36443a 0%, #5a6655 50%, #a59f86 100%)' },
  ],

  // Story — the one-paragraph editorial intro
  story:
    'A stone-floored cabin at the edge of an oak forest, inside the Binsar sanctuary. One bed. One wood stove. One window that faces the ridge. The kettle warms before sunrise. The monal calls from the canopy by half past five. Reception ends at the gate.',

  // What\'s included — five rows, no marketing copy
  included: [
    { name: 'Whole cabin',         sub: 'No shared walls. Stone floor, wood stove, one window.' },
    { name: 'Pantry kit',          sub: 'Filter coffee, three teas, oats, jam, local honey.' },
    { name: 'Hot water windows',   sub: '6:30 am · 9:00 pm. Request otherwise on the day.' },
    { name: 'Bonfire evening',     sub: 'A walled fire pit. Cedar wood. Lit at dusk.' },
    { name: 'Resident host',       sub: 'Aarav, 7am to 9pm. One tap on the app.' },
    { name: 'Forest trails',       sub: 'Three marked walks. Map left under your cup.' },
  ],

  // Retreat rituals — optional add-ons, sold by feeling not feature
  rituals: [
    { id: 'breakfast', name: 'Mountain breakfast · in-cabin', moment: 'Each morning', price: 'Included', selected: true,  grad: 'linear-gradient(180deg, #6b5e44 0%, #a59f86 60%, #d4c8a8 100%)' },
    { id: 'birding',   name: 'Birdwalk with Tashi',           moment: '6 am · day 2',  price: '₹1,400 / person', selected: false, grad: 'linear-gradient(180deg, #1F3525 0%, #4a5a44 50%, #8a9476 100%)' },
    { id: 'firepit',   name: 'Fire-pit dinner · cedar smoke', moment: 'Day 1 · 7 pm',  price: '₹2,800 / cabin',  selected: true,  grad: 'linear-gradient(180deg, #14201A 0%, #6b4a30 60%, #c9853c 100%)' },
    { id: 'massage',   name: 'Himalayan oil treatment',       moment: 'Day 2 · 4 pm',  price: '₹3,200 / person', selected: false, grad: 'linear-gradient(180deg, #3a3530 0%, #6b5d50 60%, #b8a48c 100%)' },
  ],

  // Reviews — five quotes, themed
  highlights: [
    { theme: 'The quiet',     quote: 'We did not check our phones for four days. The cabin asks nothing of you.', from: 'Anika S.',    when: '5 nights · Couple' },
    { theme: 'Host care',     quote: 'Aarav left a hand-drawn trail map under our cup the morning we left. Small thing. Stayed with me.', from: 'Rohit M.',  when: '4 nights · Family' },
    { theme: 'The bed',       quote: 'The bed is non-negotiable, as promised. The kettle never went cold.',     from: 'Meera K.',    when: '3 nights · Workcation' },
    { theme: 'The cabin',     quote: 'It rains here in a way that makes you want to stay inside — which is exactly what the cabin was built for.', from: 'Jaipreet G.', when: '6 nights · Solo' },
  ],

  // Category ratings — emotional, not OTA labels
  ratings: [
    { lbl: 'Cabin-fresh',    val: 4.98 },
    { lbl: 'Host care',      val: 5.00 },
    { lbl: 'Arrival warmth', val: 4.96 },
    { lbl: 'As described',   val: 4.97 },
    { lbl: 'Setting',        val: 4.99 },
    { lbl: 'Worth it',       val: 4.92 },
  ],
};

// Booking state — defaults
const BOOKING_DEFAULT = {
  arriveDate: new Date(2026, 2, 12), // 12 Mar 2026
  departDate: new Date(2026, 2, 15), // 15 Mar 2026
  adults: 2,
  kidAges: [],   // [null, 7]
  rooms: 1,
  ritualsSelected: new Set(['breakfast', 'firepit']),
};

// ─── HELPERS ────────────────────────────────────────────────────
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const fmtDate = (d) => d ? `${d.getDate()} ${MONTHS[d.getMonth()]}` : '—';
const fmtFull = (d) => d ? `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}` : '—';
const nightsBetween = (a, b) => (a && b) ? Math.max(0, Math.round((b - a) / 86400000)) : 0;
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };

// Bucket stays count — preserves brand modesty, hides exact numbers
function bucketStays(n) {
  if (n == null) return '—';
  if (n < 50)   return n < 10 ? 'first stays' : `${Math.floor(n / 10) * 10}+ stays`;
  if (n < 100)  return '50+ stays';
  if (n < 500)  return '100+ stays';
  if (n < 1000) return '500+ stays';
  return '1,000+ stays';
}

// Weekend = Fri (5) or Sat (6). 15% premium.
function isWeekendNight(d) { const x = d.getDay(); return x === 5 || x === 6; }
function priceBreakdown(arrive, depart, baseRate, rooms = 1) {
  if (!arrive || !depart || arrive >= depart) return { weekday: 0, weekend: 0, weekdayRate: baseRate, weekendRate: Math.round(baseRate * 1.15), total: 0 };
  const weekendRate = Math.round(baseRate * 1.15);
  const weekdayRate = baseRate;
  let weekday = 0, weekend = 0;
  const cur = new Date(arrive);
  while (cur < depart) {
    if (isWeekendNight(cur)) weekend++; else weekday++;
    cur.setDate(cur.getDate() + 1);
  }
  const subtotal = (weekday * weekdayRate + weekend * weekendRate) * rooms;
  return { weekday, weekend, weekdayRate, weekendRate, subtotal };
}

// Best-value hint — fires when 2+ weekend nights are in range
function bestValueHint(arrive, depart, baseRate) {
  const wb = priceBreakdown(arrive, depart, baseRate);
  if (wb.weekend < 2) return null;
  const save = wb.weekend * (wb.weekendRate - wb.weekdayRate);
  if (save < 1000) return null;
  return { msg: `${wb.weekend} weekend nights in your stay. Shift to Mon → Thu and save ₹${save.toLocaleString('en-IN')}.`, save };
}

// Capacity engine — same logic as desktop
function evaluateParty({ adults, kidAges, rooms }) {
  const youngAdults  = kidAges.filter(a => a !== null && a >= 13).length;
  const olderKids    = kidAges.filter(a => a !== null && a >= 5 && a < 13).length;
  const toddlers     = kidAges.filter(a => a !== null && a < 5).length;
  const childrenSet  = kidAges.length === 0 || kidAges.every(a => a !== null);
  const totalAdults  = adults + youngAdults;
  const recommendedRooms = Math.max(1, Math.ceil(totalAdults / 2));
  const adultsOK = totalAdults <= rooms * 2;
  const olderKidsOK = olderKids <= rooms; // one trundle per cabin
  const fits = adultsOK && olderKidsOK && childrenSet;

  let strategy = null;
  if (totalAdults >= 3 && totalAdults <= 4 && rooms === 1) {
    strategy = { kind: 'upsell-van', msg: 'For 3–4 guests, the Van cabin sleeps four under one roof — feels like one stay, not two.', cta: 'See Van cabins', action: 'view-van' };
  } else if (totalAdults >= 5) {
    strategy = { kind: 'split', msg: `For ${totalAdults} adults, ${recommendedRooms} cabins fit best. We hold them side-by-side.`, cta: `Set ${recommendedRooms} cabins`, action: 'set-rooms', value: recommendedRooms };
  } else if (totalAdults === 2 && olderKids >= 1 && rooms === 1) {
    strategy = { kind: 'family', msg: toddlers > 0 ? 'A crib will be waiting in the cabin. The trundle bed is included for the older child.' : 'Trundle bed included for the child — no extra cabin needed.' };
  } else if (!adultsOK) {
    strategy = { kind: 'over', msg: `This cabin sleeps two. You've chosen ${totalAdults} adults. We recommend ${recommendedRooms} cabins.`, cta: `Set ${recommendedRooms}`, action: 'set-rooms', value: recommendedRooms };
  }
  return { totalAdults, recommendedRooms, fits, childrenSet, toddlers, olderKids, strategy };
}

function summarizeGuests({ adults, kidAges, rooms }) {
  const k = kidAges.length;
  const parts = [`${adults} adult${adults !== 1 ? 's' : ''}`];
  if (k > 0) parts.push(`${k} child${k !== 1 ? 'ren' : ''}`);
  parts.push(`${rooms} cabin${rooms !== 1 ? 's' : ''}`);
  return parts.join(' · ');
}

// Seasonal urgency — rotates by month
function seasonalUrgency() {
  const m = new Date().getMonth();
  const lines = [
    'Snowfall season · two cabin windows held before Holi.',
    'Last weeks of clear cold. Rhododendron buds in three weeks.',
    'Two cabins held this weekend. Booked four times this week.',
    'Peak rhododendron. Monal calling from the ridge at dawn.',
    'Last weeks of monal sightings before they climb up.',
    'Pre-monsoon stillness. Forest at its most patient.',
    'Monsoon arrival · stone shower, hot pantry, three teas.',
    'Mid-monsoon · fewer guests, more silence.',
    'Post-monsoon clarity. Air rinsed clean for the week.',
    'Autumn ridge light · the cabin sits in gold for an hour.',
    'First flurries forecast. Snowfall expected within weeks.',
    'Snowfall arriving · three weeks of pre-winter rates left.',
  ];
  return lines[m];
}

window.EKAM_PDP = {
  PROPERTY,
  BOOKING_DEFAULT,
  fmtDate, fmtFull, nightsBetween, addDays,
  bucketStays, priceBreakdown, bestValueHint,
  evaluateParty, summarizeGuests, seasonalUrgency,
};
