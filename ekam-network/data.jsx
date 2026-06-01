/* global React */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Chapter V · Saved, Profile, Mudra, Referral
// Data layer
// ════════════════════════════════════════════════════════════════

// Mood gradients
const MOOD = {
  binsar:    'linear-gradient(180deg, #0c1410 0%, #1F3525 30%, #2B4630 60%, #6a7565 100%)',
  kalpa:     'linear-gradient(180deg, #2a3845 0%, #6e7a82 50%, #b8a48c 100%)',
  baspa:     'linear-gradient(180deg, #14201A 0%, #1F3525 30%, #2B4630 65%, #4a5a44 100%)',
  jhebi:     'linear-gradient(180deg, #1f3525 0%, #2B4630 60%, #5a6655 100%)',
  munsiyari: 'linear-gradient(180deg, #1a2228 0%, #3a4854 35%, #b8a48c 75%, #4a4035 100%)',
  ramgarh:   'linear-gradient(180deg, #36443a 0%, #6b5e44 50%, #a59f86 100%)',
  fago:      'linear-gradient(180deg, #6e7a82 0%, #a59f86 40%, #806d4e 100%)',
  chitkul:   'linear-gradient(180deg, #14201A 0%, #3a4854 50%, #8a9476 100%)',
};

// ─── SAVED ESCAPES (restraint — no offers, no member pricing on the card) ─
const SAVED = [
  {
    id: 'kalpa', name: 'Kalpa', dev: 'शिखर', tier: 'SHIKHAR',
    region: 'Kinnaur · Himachal', drive: '8 hr from Shimla',
    season: 'June, before the monsoon',
    note: 'Apple orchard, a wood stove, the Kinner Kailash facing wall.',
    mood: 'kalpa',
  },
  {
    id: 'binsar', name: 'Binsar', dev: 'कुटीर', tier: 'KUTIR',
    region: 'Kumaon · Uttarakhand', drive: '1 hr from Almora',
    season: 'October, the last of the monal',
    note: 'Stone floor, one bed, one window onto the ridge.',
    mood: 'binsar',
  },
  {
    id: 'baspa', name: 'Baspa', dev: 'वन', tier: 'VAN',
    region: 'Sangla · Himachal', drive: '14 hr from Delhi',
    season: 'Late summer, when the river is loud',
    note: 'Deodar canopy. A trout stream beneath the deck.',
    mood: 'baspa',
  },
];

const RECENT = [
  { id: 'jhebi', name: 'Jhebi', region: 'Tirthan · HP', mood: 'jhebi' },
  { id: 'munsiyari', name: 'Munsiyari', region: 'Pithoragarh · UK', mood: 'munsiyari' },
];

// ─── USER + PROFILE ──────────────────────────────────────────
const USER = {
  name: 'Anika S.',
  initial: 'A',
  joined: 'Since June 2024',
  greeting: 'Good morning, Anika',
};

// ─── MUDRA · the seals (replaces the trophy / loyalty programme) ──
// Each visited cabin leaves a mudra. The collection mirrors the
// physical wax-sealed journal that arrives by post after each stay.
const NETWORK = [
  // visited
  { id: 'binsar',    name: 'Binsar',    dev: 'कुटीर', tier: 'KUTIR',   region: 'Kumaon',     visited: true,  visitedAt: 'Nov 2025', host: 'Aarav',  cabinNo: '03', season: 'after first frost', x: 71, y: 38 },
  { id: 'ramgarh',   name: 'Ramgarh',   dev: 'कुटीर', tier: 'KUTIR',   region: 'Nainital',   visited: true,  visitedAt: 'Mar 2025', host: 'Pavan',  cabinNo: '02', season: 'apple blossom',     x: 68, y: 44 },
  { id: 'jhebi',     name: 'Jhebi',     dev: 'कुटीर', tier: 'KUTIR',   region: 'Tirthan',    visited: true,  visitedAt: 'Aug 2024', host: 'Devraj', cabinNo: '01', season: 'the loud river',    x: 38, y: 50 },
  // unvisited
  { id: 'lamgad',    name: 'Lamgad',    dev: 'कुटीर', tier: 'KUTIR',   region: 'Almora',     visited: false, x: 72, y: 42 },
  { id: 'kausani',   name: 'Kausani',   dev: 'कुटीर', tier: 'KUTIR',   region: 'Bageshwar',  visited: false, x: 73, y: 36 },
  { id: 'fago',      name: 'Fago',      dev: 'कुटीर', tier: 'KUTIR',   region: 'Spiti',      visited: false, x: 32, y: 22 },
  { id: 'shimla',    name: 'Shimla',    dev: 'कुटीर', tier: 'KUTIR',   region: 'Mashobra',   visited: false, x: 28, y: 48 },
  { id: 'baspa',     name: 'Baspa',     dev: 'वन',    tier: 'VAN',     region: 'Sangla',     visited: false, x: 35, y: 36 },
  { id: 'binsar2',   name: 'Binsar Deep', dev: 'वन',  tier: 'VAN',     region: 'Kumaon',     visited: false, x: 73, y: 40 },
  { id: 'sainj',     name: 'Sainj',     dev: 'वन',    tier: 'VAN',     region: 'Kullu',      visited: false, x: 32, y: 44 },
  { id: 'tirthan',   name: 'Tirthan',   dev: 'वन',    tier: 'VAN',     region: 'GHNP',       visited: false, x: 36, y: 49 },
  { id: 'chitkul',   name: 'Chitkul',   dev: 'शिखर',  tier: 'SHIKHAR', region: 'Last village', visited: false, x: 37, y: 38 },
  { id: 'kalpa',     name: 'Kalpa',     dev: 'शिखर',  tier: 'SHIKHAR', region: 'Kinnaur',    visited: false, x: 36, y: 32 },
  { id: 'nako',      name: 'Nako',      dev: 'शिखर',  tier: 'SHIKHAR', region: 'Spiti',      visited: false, x: 38, y: 26 },
  { id: 'munsiyari', name: 'Munsiyari', dev: 'शिखर',  tier: 'SHIKHAR', region: 'Pithoragarh', visited: false, x: 77, y: 32 },
];

// One mudra detail — for the property-mark screen
const FOCUSED_MUDRA = NETWORK.find(n => n.id === 'binsar');

// ─── REFERRALS ───────────────────────────────────────────────
const REFERRAL_REWARD_PER = 1000;   // mudra credited when the introduced guest's first stay completes
const REDEMPTION_CAP_PCT  = 20;     // % of any booking subtotal that can be paid with mudra

const PAST_INTRODUCTIONS = [
  { name: 'Priya',  status: 'Arriving at Binsar · 12 Sep',   date: '12 days ago',  initial: 'P', state: 'arriving',  pendingMudra: 1000 },
  { name: 'Karan',  status: 'Held a cabin · not yet booked', date: '3 weeks ago',  initial: 'K', state: 'held',      pendingMudra: 0 },
  { name: 'Devaki', status: 'Stayed at Ramgarh · Mar 2025',  date: '14 months ago', initial: 'D', state: 'completed', earnedMudra: 1000 },
];

// ─── MUDRA · the balance (rupees, held for the user) ──────────
// One mudra = ₹1. Earned by introductions + milestones. Applied
// up to 20% of any booking. Quiet, not a points programme.
const MUDRA_LEDGER = [
  { id: 't5', kind: 'earn',  source: 'milestone', label: 'Three cabins visited',         value:  500, when: '14 Mar 2026' },
  { id: 't4', kind: 'earn',  source: 'referral',  label: 'Devaki stayed at Ramgarh',    value: 1000, when: '22 Mar 2025' },
  { id: 't3', kind: 'apply', source: 'booking',   label: 'Applied to Binsar · 3 nights', value: -560, when: '10 Nov 2025' },
  { id: 't2', kind: 'earn',  source: 'milestone', label: 'First stay at EKAM',           value:  250, when: '07 Aug 2024' },
  { id: 't1', kind: 'earn',  source: 'sign-up',   label: 'Joined the network',           value:  200, when: '14 Jun 2024' },
];
const MUDRA_BALANCE = MUDRA_LEDGER.reduce((sum, t) => sum + t.value, 0); // 1390

const MILESTONES = [
  { id: 'first',   nights: 1,  mudra: 250,  label: 'First stay',      reached: true,  note: 'Welcomed in.' },
  { id: 'three',   nights: 3,  mudra: 500,  label: 'Three cabins',    reached: true,  note: 'Different valleys, same quiet.' },
  { id: 'four',    nights: 4,  mudra: 750,  label: 'Four cabins',     reached: false, note: 'Volume II of the journal arrives.' },
  { id: 'circle',  nights: 6,  mudra: 1500, label: 'Six cabins',      reached: false, note: 'A note from the founder.' },
  { id: 'full',    nights: 15, mudra: 5000, label: 'The full network',reached: false, note: 'A reserved week, on the house.' },
];

// ─── EXACT UI COPY (kept here for editability) ──────────────
const COPY = {
  saved: {
    eyebrow: 'मन',
    title: 'Saved Escapes.',
    sub: 'A quiet collection of future arrivals.',
    recent: 'You were just here',
    action: 'Hold this cabin →',
  },
  profile: {
    name: 'Anika S.',
    sub: 'Since June 2024',
  },
  mudra: {
    eyebrow: 'मुद्रा',
    title: 'Your seals.',
    sub: 'Three cabins have left a mark. Twelve more remain.',
    toggleMap: 'Map',
    toggleJournal: 'Journal',
    footer: 'A mudra arrives in your post after each stay.',
  },
  referral: {
    eyebrow: 'परिचय',
    title: 'An introduction.',
    sub: "When you've found a cabin worth telling someone about, here is how.",
    rewardLine: '₹1,000 in Mudra arrives in your balance when they complete their first stay.',
    linkLbl: 'Your link',
    linkVal: 'ekam.in/from/anika',
    noteLbl: 'A few words, in your hand',
    notePlaceholder: 'I think you would like this one — the kettle warms before sunrise.',
    sendLbl: 'Send to',
    pastLbl: 'Past introductions',
  },
  balance: {
    eyebrow: 'मुद्रा',
    title: 'Held for you.',
    sub: 'Mudra is a small return — one mudra is one rupee. Applied to up to a fifth of any booking.',
    cardLbl: 'Your balance',
    earnedLbl: 'How it arrived',
    milestonesLbl: 'Coming up',
    rulesLbl: 'How mudra is earned',
    rules: [
      'An introduction · ₹1,000 when the guest completes their first stay.',
      'A milestone · earned when the network fills in. First stay, three cabins, six, full set.',
      'Joining · ₹200 the day you set up the account. A welcome, nothing more.',
    ],
    applyLbl: 'How it is applied',
    apply: 'Up to a fifth of any booking subtotal. No expiry. No tier. Untransferable.',
  },
  invitation: {
    eyebrow: 'A note from Aarav',
    title: 'The fire will be lit when you arrive.',
    sub: 'Aarav has held a cabin for you at Binsar. Three nights. The pantry kit is already in the cabin. You only need to come.',
    handwritten: '— Bring the woollens. The monal returns Thursday.',
    cta: 'Continue',
    secondary: 'Read about Binsar',
  },
};

// ─── HELPERS ────────────────────────────────────────────────
const COUNT = {
  visited: NETWORK.filter(n => n.visited).length,
  total: NETWORK.length,
  remaining: NETWORK.filter(n => !n.visited).length,
};

window.EKAM_NET = {
  MOOD, SAVED, RECENT, USER, NETWORK, FOCUSED_MUDRA,
  PAST_INTRODUCTIONS, COPY, COUNT,
  REFERRAL_REWARD_PER, REDEMPTION_CAP_PCT,
  MUDRA_LEDGER, MUDRA_BALANCE, MILESTONES,
};
