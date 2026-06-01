/* global React */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Stays & Profile · data layer
// A calm personal retreat archive. One upcoming stay, three completed,
// a held shortlist, the seals, the introductions, the preferences.
// ════════════════════════════════════════════════════════════════

// Mood fields — dawn/dusk/forest tones standing in for cabin photography.
// (Consistent with the rest of the prototype; swap for real images later.)
const SMOOD = {
  kalpa:     'linear-gradient(176deg, #2a3845 0%, #6e7a82 48%, #b8a48c 100%)',
  binsar:    'linear-gradient(176deg, #0c1410 0%, #1F3525 32%, #2B4630 62%, #6a7565 100%)',
  baspa:     'linear-gradient(176deg, #14201A 0%, #1F3525 30%, #2B4630 64%, #4a5a44 100%)',
  jhebi:     'linear-gradient(176deg, #1f3525 0%, #2B4630 58%, #5a6655 100%)',
  ramgarh:   'linear-gradient(176deg, #36443a 0%, #6b5e44 52%, #a59f86 100%)',
  munsiyari: 'linear-gradient(176deg, #1a2228 0%, #3a4854 36%, #b8a48c 76%, #4a4035 100%)',
  chitkul:   'linear-gradient(176deg, #14201A 0%, #3a4854 50%, #8a9476 100%)',
  nako:      'linear-gradient(176deg, #243044 0%, #5d6b78 45%, #c2b39a 100%)',
  fago:      'linear-gradient(176deg, #6e7a82 0%, #a59f86 42%, #806d4e 100%)',
};

// ─── USER ────────────────────────────────────────────────────
const SUSER = {
  name: 'Anika',
  full: 'Anika Sharma',
  initial: 'A',
  joined: 'Joined June 2024',
  joinedShort: '2024',
};

// ─── THE SEASON (late May → early June · pre-monsoon) ─────────
const SSEASON = {
  tag: 'Late May',
  line: 'The rhododendron is past and the rivers are filling. A clear window at mid-elevation before the monsoon closes the high passes.',
  short: 'Pre-monsoon · the rivers filling',
};

// ─── THE UPCOMING STAY (booked, anticipatory) ────────────────
// daysUntil computed live from arrivalISO with a stable fallback.
const _today = new Date();
const _arrival = new Date('2026-06-06T00:00:00');
const _days = Math.max(0, Math.ceil((_arrival - _today) / 86400000));

const SUPCOMING = {
  id: 'kalpa', name: 'Kalpa', dev: 'शिखर', tier: 'SHIKHAR',
  mood: 'kalpa',
  region: 'Kinnaur · Himachal',
  elevation: '2,960 m',
  cabinNo: '07',
  host: 'Aarav',
  daysUntil: Number.isFinite(_days) && _days > 0 ? _days : 8,
  dates: '6 — 10 June',
  nights: 4,
  arrivalLine: 'Four nights, the Kinner Kailash facing wall.',
  travel: [
    { lbl: 'From Shimla', val: '8 hr by road · the NH5 along the Sutlej' },
    { lbl: 'The last stretch', val: '40 km of single-track above Reckong Peo. Leave Shimla before noon — the valley loses light early.' },
    { lbl: 'Final approach', val: 'On foot from the orchard gate. Aarav meets you there.' },
  ],
  checkin: [
    { lbl: 'Arrive', val: 'After 2pm · 6 June' },
    { lbl: 'The key', val: 'A brass key waits in the stone niche by the door. Your phone pairs with the lock the morning you leave.' },
    { lbl: 'On arrival', val: 'The stove is laid, not lit. Matches are on the ledge — you light the cabin yourself.' },
  ],
  weather: { temp: '14° / 4°', sky: 'Clear, thinning cloud by dusk', note: 'Bring the woollens — the nights still hold winter.' },
};

// ─── COMPLETED STAYS (the archive — journal-like) ────────────
// Linked to their Mudra seals by cabin id.
const SCOMPLETED = [
  {
    id: 'binsar', name: 'Binsar', dev: 'कुटीर', tier: 'KUTIR', mood: 'binsar',
    region: 'Kumaon · Uttarakhand', cabinNo: '03', host: 'Aarav',
    when: 'November 2025', season: 'after the first frost', nights: 3,
    note: 'The monal landed on the deck on day three. Aarav left a hand-drawn trail map under the cup.',
    posted: 'A wax copy of this mudra was posted to you on 02 December 2025.',
  },
  {
    id: 'ramgarh', name: 'Ramgarh', dev: 'कुटीर', tier: 'KUTIR', mood: 'ramgarh',
    region: 'Nainital · Uttarakhand', cabinNo: '02', host: 'Pavan',
    when: 'March 2025', season: 'apple blossom', nights: 2,
    note: 'Blossom on the orchard floor by the second morning. We walked to the spring and back and read all afternoon.',
    posted: 'A wax copy of this mudra was posted to you on 19 March 2025.',
  },
  {
    id: 'jhebi', name: 'Jhebi', dev: 'कुटीर', tier: 'KUTIR', mood: 'jhebi', cabinNo: '01', host: 'Devraj',
    region: 'Tirthan · Himachal', when: 'August 2024', season: 'the loud river', nights: 3,
    note: 'The river never quietened. First stay — we did not check a phone for three days and came back different.',
    posted: 'A wax copy of this mudra was posted to you on 28 August 2024.',
  },
];

// ─── SAVED (held shortlist — no prices on the card) ──────────
const SSAVED = [
  { id: 'binsar', name: 'Binsar', dev: 'कुटीर', tier: 'KUTIR', mood: 'binsar',
    region: 'Kumaon · Uttarakhand', drive: '1 hr from Almora',
    season: 'October, the last of the monal',
    note: 'Stone floor, one bed, one window onto the ridge.' },
  { id: 'baspa', name: 'Baspa', dev: 'वन', tier: 'VAN', mood: 'baspa',
    region: 'Sangla · Himachal', drive: '14 hr from Delhi',
    season: 'Late summer, when the river is loud',
    note: 'Deodar canopy. A trout stream beneath the deck.' },
  { id: 'chitkul', name: 'Chitkul', dev: 'शिखर', tier: 'SHIKHAR', mood: 'chitkul',
    region: 'Kinnaur · the last village', drive: '2 hr from Kalpa',
    season: 'June, before the road softens',
    note: 'The last buildable land before the border. Nothing past the window but the Baspa and the snow.' },
];

// Recently viewed — quiet rail
const SRECENT = [
  { id: 'jhebi', name: 'Jhebi', region: 'Tirthan · HP', mood: 'jhebi' },
  { id: 'munsiyari', name: 'Munsiyari', region: 'Pithoragarh · UK', mood: 'munsiyari' },
  { id: 'nako', name: 'Nako', region: 'Spiti · HP', mood: 'nako' },
];

// Seasonal suggestions — fit the current window, written by hand
const SSEASONAL = [
  { id: 'baspa', name: 'Baspa', region: 'Sangla · HP', mood: 'baspa',
    line: 'The river is loudest now, before the monsoon muddies it.' },
  { id: 'chitkul', name: 'Chitkul', region: 'Kinnaur · HP', mood: 'chitkul',
    line: 'The road opens in June. A short window before the high snow returns.' },
];

// ─── INTRODUCTIONS (referral, hospitality-led) ───────────────
const SINTROS = [
  { name: 'Priya',  initial: 'P', state: 'arriving',  status: 'Arriving at Binsar', when: '12 September', note: 'Bring the woollens. The monal returns Thursday.' },
  { name: 'Karan',  initial: 'K', state: 'held',      status: 'Held a cabin, not yet booked', when: '3 weeks ago', note: 'No rush — the ridge will keep.' },
  { name: 'Devaki', initial: 'D', state: 'stayed',    status: 'Stayed at Ramgarh', when: 'March 2025', note: 'You were right about the spring walk.' },
];

// ─── MUDRA · the network (visited vs remaining) ──────────────
const SNETWORK = [
  { id: 'binsar',    name: 'Binsar',    dev: 'कुटीर', tier: 'KUTIR',   region: 'Kumaon',     visited: true,  visitedAt: 'Nov 2025', host: 'Aarav',  cabinNo: '03', season: 'after first frost', x: 71, y: 38 },
  { id: 'ramgarh',   name: 'Ramgarh',   dev: 'कुटीर', tier: 'KUTIR',   region: 'Nainital',   visited: true,  visitedAt: 'Mar 2025', host: 'Pavan',  cabinNo: '02', season: 'apple blossom',     x: 68, y: 44 },
  { id: 'jhebi',     name: 'Jhebi',     dev: 'कुटीर', tier: 'KUTIR',   region: 'Tirthan',    visited: true,  visitedAt: 'Aug 2024', host: 'Devraj', cabinNo: '01', season: 'the loud river',    x: 38, y: 50 },
  { id: 'lamgad',    name: 'Lamgad',    dev: 'कुटीर', tier: 'KUTIR',   region: 'Almora',     visited: false, x: 72, y: 42 },
  { id: 'kausani',   name: 'Kausani',   dev: 'कुटीर', tier: 'KUTIR',   region: 'Bageshwar',  visited: false, x: 73, y: 36 },
  { id: 'fago',      name: 'Fago',      dev: 'कुटीर', tier: 'KUTIR',   region: 'Spiti',      visited: false, x: 32, y: 22 },
  { id: 'shimla',    name: 'Shimla',    dev: 'कुटीर', tier: 'KUTIR',   region: 'Mashobra',   visited: false, x: 28, y: 48 },
  { id: 'baspa',     name: 'Baspa',     dev: 'वन',    tier: 'VAN',     region: 'Sangla',     visited: false, x: 35, y: 36 },
  { id: 'sainj',     name: 'Sainj',     dev: 'वन',    tier: 'VAN',     region: 'Kullu',      visited: false, x: 32, y: 44 },
  { id: 'tirthan',   name: 'Tirthan',   dev: 'वन',    tier: 'VAN',     region: 'GHNP',       visited: false, x: 36, y: 49 },
  { id: 'chitkul',   name: 'Chitkul',   dev: 'शिखर',  tier: 'SHIKHAR', region: 'Last village', visited: false, x: 37, y: 38 },
  { id: 'kalpa',     name: 'Kalpa',     dev: 'शिखर',  tier: 'SHIKHAR', region: 'Kinnaur',    visited: false, x: 36, y: 32 },
  { id: 'nako',      name: 'Nako',      dev: 'शिखर',  tier: 'SHIKHAR', region: 'Spiti',      visited: false, x: 38, y: 26 },
  { id: 'munsiyari', name: 'Munsiyari', dev: 'शिखर',  tier: 'SHIKHAR', region: 'Pithoragarh', visited: false, x: 77, y: 32 },
];

// ─── PREFERENCES (the onboarding answers, editable) ──────────
const SPREFS = [
  { lbl: 'The pace', val: 'A slow reset', hint: 'Stillness over itinerary.' },
  { lbl: 'Who travels', val: 'Two of you', hint: 'One low chair, one stool — the cabin is built for two.' },
  { lbl: 'Elevation', val: '2,400 – 3,400 m', hint: 'High enough for the quiet, low enough for the walk.' },
  { lbl: 'The season', val: 'Spring and autumn', hint: 'Clear light, the shoulder weeks.' },
  { lbl: 'The cup', val: 'Estate black, no sugar', hint: 'Laid by the kettle before you wake.' },
];

const SCOUNT = {
  visited: SNETWORK.filter(n => n.visited).length,
  total: SNETWORK.length,
  remaining: SNETWORK.filter(n => !n.visited).length,
};

window.STAYS = {
  SMOOD, SUSER, SSEASON, SUPCOMING, SCOMPLETED, SSAVED, SRECENT,
  SSEASONAL, SINTROS, SNETWORK, SPREFS, SCOUNT,
};
