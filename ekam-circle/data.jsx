/* global React */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Saved Escapes, Profile & Membership · data
// ════════════════════════════════════════════════════════════════

// Mood gradients reused across cards
const MOOD = {
  binsar:    'linear-gradient(180deg, #0c1410 0%, #1F3525 30%, #2B4630 60%, #6a7565 100%)',
  kalpa:     'linear-gradient(180deg, #2a3845 0%, #6e7a82 50%, #b8a48c 100%)',
  baspa:     'linear-gradient(180deg, #14201A 0%, #1F3525 30%, #2B4630 65%, #4a5a44 100%)',
  jhebi:     'linear-gradient(180deg, #1f3525 0%, #2B4630 60%, #5a6655 100%)',
  munsiyari: 'linear-gradient(180deg, #1a2228 0%, #3a4854 35%, #b8a48c 75%, #4a4035 100%)',
  ramgarh:   'linear-gradient(180deg, #36443a 0%, #6b5e44 50%, #a59f86 100%)',
  fago:      'linear-gradient(180deg, #6e7a82 0%, #a59f86 40%, #806d4e 100%)',
};

// Saved cabins — each carries enough to render a cinematic shortlist card
const SAVED = [
  {
    id: 'kalpa', name: 'Kalpa', dev: 'शिखर', tier: 'SHIKHAR', region: 'Kinnaur · HP',
    elev: '3,200 m', drive: '16 hr from Delhi',
    from: 14800, memberFrom: 12580, // 15% member price
    savedAt: '14 days ago',
    note: 'Kinner Kailash facing.',
    offer: { kind: 'season', label: 'Pre-monsoon stillness', sub: 'June rates · −12%' },
    highlights: ['Apple orchard', 'Snow-line trail', 'Wood stove'],
    mood: 'kalpa',
  },
  {
    id: 'binsar', name: 'Binsar', dev: 'कुटीर', tier: 'KUTIR', region: 'Kumaon · UK',
    elev: '2,400 m', drive: '1 hr from Almora',
    from: 8400, memberFrom: 7140,
    savedAt: '2 days ago',
    note: 'Forest light. Monal song.',
    offer: { kind: 'member', label: 'Circle exclusive', sub: '−15% on three nights' },
    highlights: ['Stone floor', 'Trail to ridge', 'Resident host'],
    mood: 'binsar',
  },
  {
    id: 'baspa', name: 'Baspa', dev: 'वन', tier: 'VAN', region: 'Sangla · HP',
    elev: '1,900 m', drive: '14 hr from Delhi',
    from: 9200, memberFrom: 7820,
    savedAt: '3 weeks ago',
    note: 'Deodar canopy. Trout stream.',
    offer: null,
    highlights: ['River view', 'Cedar fire pit', 'Family ok'],
    mood: 'baspa',
  },
];

// Recently viewed — small rail under the shortlist
const RECENT = [
  { id: 'jhebi',     name: 'Jhebi',     tier: 'KUTIR', region: 'Tirthan · HP', mood: 'jhebi' },
  { id: 'munsiyari', name: 'Munsiyari', tier: 'SHIKHAR', region: 'Pithoragarh · UK', mood: 'munsiyari' },
  { id: 'ramgarh',   name: 'Ramgarh',   tier: 'KUTIR', region: 'Nainital · UK', mood: 'ramgarh' },
];

// User
const USER = {
  name: 'Anika S.',
  initial: 'A',
  joined: 'June 2024',
  nights: 17,
  saplings: 32,
  tier: 'Circle',
  tierStarted: 'Mar 2025',
  toNextTier: 13, // nights until next tier
  intent: 'A slow reset',
  party: 'Just the two of us',
  elevation: '2,400 — 3,400 m',
  season: 'Autumn through first snow',
};

// Upcoming + past retreats — emotional, not transactional
const JOURNEYS = {
  upcoming: [
    {
      id: 'aug',
      name: 'Kalpa',
      dev: 'शिखर',
      tier: 'SHIKHAR',
      region: 'Kinnaur · HP',
      dates: '14 — 20 Aug 2026',
      countdown: 88, // days
      mood: 'kalpa',
      host: 'Tashi',
      note: 'Cabin notes, directions and packing list arrive two weeks before you do.',
    },
  ],
  past: [
    {
      id: 'nov',
      name: 'Binsar',
      dev: 'कुटीर',
      tier: 'KUTIR',
      dates: 'Nov 2025',
      mood: 'binsar',
      letter: 'You wrote three letters and finished none. The monal landed on the deck on day three.',
      host: 'Aarav',
      photos: 2,
    },
    {
      id: 'mar',
      name: 'Ramgarh',
      dev: 'कुटीर',
      tier: 'KUTIR',
      dates: 'Mar 2025',
      mood: 'ramgarh',
      letter: 'Apple blossoms were two weeks early. You walked to the village every afternoon.',
      host: 'Pavan',
      photos: 4,
    },
  ],
};

// Membership tiers
const TIERS = [
  {
    id: 'first',
    name: 'First stay',
    dev: 'प्रथम',
    range: '0–2 nights',
    benefits: ['Field journal · printed quarterly', 'Cabin saved-list', 'A handwritten arrival note'],
    current: false,
  },
  {
    id: 'circle',
    name: 'Circle',
    dev: 'मंडल',
    range: '3+ nights',
    benefits: [
      'Circle pricing on every cabin · up to −15%',
      'Two-week early access on new cabins',
      'Priority on monsoon and snowfall windows',
      'A personal note from your last host before you arrive again',
      'Field journal · printed quarterly',
    ],
    current: true,
  },
  {
    id: 'inner',
    name: 'Inner Circle',
    dev: 'अंतर',
    range: '30+ nights · by invitation',
    benefits: [
      'Cabin-hold rights for Diwali, Christmas, New Year',
      'First refusal on cabin openings, before site',
      'Annual residency at a new cabin — pre-launch',
      'A small thing in the post, each season',
    ],
    current: false,
  },
];

// Personalisation answers (preferences screen)
const PREFS = [
  { lbl: 'Intent',      val: 'A slow reset',                     hint: 'Asked at onboarding' },
  { lbl: 'Party',       val: 'Just the two of us',               hint: 'Couple · no children' },
  { lbl: 'Elevation',   val: '2,400 — 3,400 m',                  hint: 'Mid- to high-altitude' },
  { lbl: 'Season',      val: 'Autumn through first snow',        hint: 'Sep — Dec' },
  { lbl: 'Pace',        val: 'Three to five nights per stay',    hint: 'You favour shorter, repeated stays' },
  { lbl: 'Quiet',       val: 'No notifications during stay',     hint: 'The cabin\'s rules apply' },
];

// Saved offers (cross-cabin tier-aware promotions)
const OFFERS = [
  { kind: 'season',  label: 'Monsoon at altitude', sub: '−18% on cabins above 2,500 m', endsIn: '12 days', cabins: ['kalpa', 'fago', 'munsiyari'] },
  { kind: 'season',  label: 'Pre-snowfall stillness', sub: '−12% on Kumaon cabins', endsIn: '6 weeks', cabins: ['binsar', 'ramgarh'] },
  { kind: 'member',  label: 'Circle weekday rates', sub: 'Mon – Thu · always −15%', endsIn: 'Standing offer', cabins: [] },
];

// HELPERS
function fmtMoney(n) { return `₹${n.toLocaleString('en-IN')}`; }
function fmtMoneyShort(n) { return `₹${(n/1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`; }

window.EKAM_CIRCLE = { SAVED, RECENT, USER, JOURNEYS, TIERS, PREFS, OFFERS, MOOD, fmtMoney, fmtMoneyShort };
