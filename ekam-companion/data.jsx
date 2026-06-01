/* global React */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Chapter VI · Retreat Companion (in-stay)
// Data layer
// ════════════════════════════════════════════════════════════════

const STAY = {
  property: 'Binsar',
  dev: 'कुटीर',
  tier: 'KUTIR',
  cabinNo: '03',
  region: 'Kumaon · Uttarakhand',
  elev: '2,400 m',
  arrived: '12 March 2026',
  leaves: '15 March 2026',
  dayOf: 2,
  nightsTotal: 3,
  host: { name: 'Aarav', title: 'Resident host', initial: 'A', hours: '7 am — 9 pm' },
  guest: { name: 'Anika', initial: 'A' },
  gateCode: '2811',
  wifi: { ssid: 'EKAM-Binsar-03', pass: 'monalcalls' },
  hotWater: ['6:30 am', '9:00 pm'],
  pantry: ['Filter coffee', 'Three teas', 'Steel-cut oats', 'Local honey', 'Wild jam'],
  weather: {
    now: '12°',
    high: '14°', low: '4°',
    note: 'Foggy mornings expected tomorrow.',
    sunrise: '6:08 am',
    sunset: '6:34 pm',
    moon: 'Waxing crescent',
  },
  greeting: 'Morning, Anika.',
  moment: "The kettle's on the stove. The monal called from the ridge at 5:42.",
};

// ─── TODAY (schedule for day 2) ─────────────────────────────────
const TODAY = [
  { time: '6:08',  kind: 'natural', name: 'Sunrise',           sub: 'Ridge will be in gold light for an hour.', icon: 'sun' },
  { time: '6:30',  kind: 'cabin',   name: 'Hot water',         sub: 'Until 7:15 am.',                          icon: 'water' },
  { time: '7:30',  kind: 'meal',    name: 'Mountain breakfast',sub: 'Tray will arrive at the door.',           icon: 'tray' },
  { time: '9:30',  kind: 'open',    name: 'Quiet hours',       sub: 'Until lunch. The trails open both ways.', icon: 'wind' },
  { time: '13:00', kind: 'meal',    name: 'Lunch',              sub: 'In the cabin or on the deck — your call.', icon: 'tray' },
  { time: '16:00', kind: 'open',    name: 'Tea on the deck',    sub: 'A masala kit is in the pantry.',          icon: 'cup' },
  { time: '18:34', kind: 'natural', name: 'Sunset',             sub: 'The ridge holds the last light at 6:42.', icon: 'sun' },
  { time: '19:00', kind: 'booked',  name: 'Fire-pit dinner',    sub: 'Cedar smoke, three courses, Aarav cooks.', icon: 'fire' },
  { time: '21:00', kind: 'cabin',   name: 'Hot water',          sub: 'Until 9:45 pm.',                         icon: 'water' },
];

const TOMORROW = [
  { time: '5:45',  name: 'Birdwalk with Tashi', sub: 'Meet at the gate. Bring layers.' },
  { time: '7:00',  name: 'Sunrise from the ridge', sub: 'A 20-minute walk above the cabin.' },
];

// ─── FOREST TRAILS ───────────────────────────────────────────────
const TRAILS = [
  {
    id: 'ridge',
    name: 'The ridge walk',
    distance: '2.4 km',
    time: '45 min',
    difficulty: 'Gentle',
    note: 'Loops above the cabin to the Zero Point ridge. The monal nests here.',
    glyph: 'M2 26 Q 16 14, 30 18 T 60 12 L 60 30 L 2 30 Z',
  },
  {
    id: 'oak',
    name: 'The oak grove',
    distance: '1.6 km',
    time: '30 min',
    difficulty: 'Easy',
    note: 'A flat circuit through the older oaks. Best at first light.',
    glyph: 'M2 22 Q 14 18, 28 22 T 60 22 L 60 30 L 2 30 Z',
  },
  {
    id: 'stream',
    name: 'Down to the stream',
    distance: '3.1 km',
    time: '1 hr 20',
    difficulty: 'Moderate',
    note: 'Descends to the brook. Steeper coming back. Take water.',
    glyph: 'M2 14 L 12 14 L 20 24 L 32 22 L 44 28 L 60 26 L 60 30 L 2 30 Z',
  },
];

// ─── RITUALS ────────────────────────────────────────────────────
const RITUALS = {
  teas: [
    { id: 'masala', name: 'Cardamom masala', sub: '6 min steep · whole milk, jaggery' },
    { id: 'kahwa',  name: 'Kashmiri kahwa',  sub: '4 min · saffron · slivered almond' },
    { id: 'lemon',  name: 'Lemongrass green',sub: '3 min · honey, no milk' },
  ],
  prompts: [
    { id: 'day1', label: 'Day 1', body: 'What did you notice today that you would not have noticed at home?' },
    { id: 'day2', label: 'Day 2', body: 'Name three sounds you have heard since arriving.' },
    { id: 'day3', label: 'Day 3', body: 'What would you bring back, if you could only bring back one thing?' },
  ],
  audio: [
    { id: 'm1', name: 'Dawn at the ridge',  len: '12 min', desc: 'Field recording · monal · cedar wind' },
    { id: 'm2', name: 'Rain at altitude',   len: '20 min', desc: 'Stone roof · forest floor · distant brook' },
    { id: 'm3', name: 'The fire after dusk',len: '8 min',  desc: 'Cedar wood · low embers · pine needles' },
  ],
};

// ─── NOTES (the quiet feed — replaces "notifications") ─────────
const NOTES = [
  {
    id: 'n1', when: '6:14 am · today',  from: 'The cabin',
    body: 'Foggy mornings expected tomorrow. The ridge walk holds longer if you wait an hour for the lift to clear.',
  },
  {
    id: 'n2', when: '5:42 am · today',  from: 'From Aarav',
    body: 'The monal was on the deck rail at 5:42. She comes back most mornings before the kettle whistles.',
  },
  {
    id: 'n3', when: '4:00 pm · yesterday',  from: 'The cabin',
    body: 'Bonfire begins at 7. We will leave a wool throw at the seat closest to the fire pit.',
  },
  {
    id: 'n4', when: '11:08 am · yesterday',  from: 'From Aarav',
    body: 'The mountains are especially clear tonight. From the upper deck after 8 — three faces of Trishul visible.',
  },
  {
    id: 'n5', when: '9:00 am · check-in day', from: 'The cabin',
    body: 'Hot water is ready. Tea is on the pantry shelf — three options. The trail map is under your cup.',
  },
];

// ─── REACH (host + practical contacts) ─────────────────────────
const REACH = [
  { kind: 'host',   name: 'Aarav',          role: 'Your host',           detail: 'Available 7 am – 9 pm · one tap' },
  { kind: 'cabin',  name: 'Cabin team',     role: 'Housekeeping · meals',detail: 'Phone the kitchen for anything · 9 am – 8 pm' },
  { kind: 'gate',   name: 'Sanctuary gate', role: 'For arrivals · departures', detail: 'After 6 pm · text first' },
  { kind: 'medic',  name: 'Almora clinic',  role: 'Medical · 28 km',     detail: 'Aarav can drive you · any hour' },
];

// ─── COPY (kept here for editability) ──────────────────────────
const COPY = {
  home: {
    eb: 'Day 2 of 3 · Binsar',
    title: 'Morning, Anika.',
    sub: "The kettle's on the stove. The monal called from the ridge at 5:42.",
    nextLbl: '— Coming up',
    nextName: 'Fire-pit dinner',
    nextWhen: 'Tonight at 7 · cedar smoke',
  },
  cabin: {
    eb: 'कुटीर · Cabin No. 03',
    title: 'What you need.',
    sub: 'Gate code · hot water · pantry · how to reach Aarav.',
    gateLbl: 'Gate code',
    waterLbl: 'Hot water',
    pantryLbl: 'In the pantry',
    wifiLbl: 'Wi-Fi · only if you must',
    showWifi: 'Reveal',
  },
  today: { eb: 'अभी · today', title: 'Today.', sub: 'A loose schedule. None of it is mandatory.' },
  trails: { eb: 'पथ · trails', title: 'Three walks.', sub: 'All from the cabin. The map is under your cup.' },
  rituals: { eb: 'क्रिया · rituals', title: 'Three quiet things.', sub: 'Tea · a journal prompt · twenty minutes of forest sound.' },
  notes: { eb: 'पत्र · letters', title: 'From the cabin.', sub: 'A quiet feed. No notifications, no alerts — letters only.' },
  reach: { eb: 'सहाय · reach', title: 'If you need us.', sub: 'Four ways to reach the cabin team. No queues.' },
};

// ─── KITCHEN · in-house ordering ─────────────────────────────────
// Order matters: complimentary first (set the expectation), then EKAM Chai
// at the top of the orderable menu, then today's tiffin, then a small à
// la carte. The brand stance is satvik & simple — nothing more than needed.
const KITCHEN = {
  complimentary: {
    lbl: 'Free, from us · the EKAM Chai pantry',
    sub: 'Six items already in your cabin. Stocked on arrival, refreshed daily. Never billed.',
    items: [
      { name: 'Filter coffee',     sub: 'Beans from Coorg · French press in the shelf' },
      { name: 'Three teas',        sub: 'Cardamom masala · Kashmiri kahwa · lemongrass' },
      { name: 'Steel-cut oats',    sub: 'Local honey · wild jam · seasonal fruit' },
      { name: 'Spring water',      sub: 'Glass bottle by the kettle · refilled twice a day' },
      { name: 'Fresh fruit bowl',  sub: 'Refilled every morning · whatever is in season' },
    ],
  },
  chai: {
    lbl: 'EKAM चाय · the specialty',
    sub: 'Satvik. Simple. Brewed slow. A cup arrives in twelve minutes.',
    items: [
      { id: 'masala',   name: 'Adrak-elaichi chai',  desc: 'Ginger, cardamom, whole milk, jaggery',         price: '₹140' },
      { id: 'kahwa',    name: 'Kashmiri kahwa',      desc: 'Saffron, slivered almond, cinnamon',            price: '₹180' },
      { id: 'lemon',    name: 'Lemongrass green',    desc: 'No milk, no sugar, a touch of honey',            price: '₹100' },
      { id: 'tulsi',    name: 'Tulsi-ginger',         desc: 'Holy basil, ginger, lemon · for the throat',    price: '₹120' },
      { id: 'butter',   name: 'Himalayan butter tea', desc: 'Salted, churned · the high-altitude warmer',   price: '₹220' },
    ],
  },
  tiffin: {
    lbl: 'आज का भोजन · today\'s tiffin',
    sub: 'A set three-course meal. Cooked at the cabin, carried up at the hour you choose.',
    today: {
      eyebrow: 'Mid-day, day 2',
      heading: 'Kumaoni thali',
      courses: [
        { name: 'Bhatt ki churkani',  sub: 'Black soybean curry, slow-simmered in iron' },
        { name: 'Madua roti',         sub: 'Stone-ground finger-millet flatbread' },
        { name: 'Kachri ki sabzi',    sub: 'Wild cucumber, hand-picked from the village' },
        { name: 'Bhang ki chutney',   sub: 'Hemp seed, lime, green chilli' },
        { name: 'Bal mithai',         sub: 'Roasted khoya, coated in white sugar pearls' },
      ],
      price: '₹780 per person',
      slots: ['12:30 pm', '1:00 pm', '1:30 pm'],
    },
  },
  alacarte: {
    lbl: 'अलग से · à la carte',
    sub: 'A short menu. We add nothing the cabin team isn\'t cooking for themselves.',
    items: [
      { id: 'aloo',     name: 'Aloo paratha · curd',       desc: 'Hand-rolled, ghee on the side',           price: '₹220' },
      { id: 'maggi',    name: 'Mountain Maggi',             desc: 'With vegetables, lemon, green chilli',   price: '₹180' },
      { id: 'omelette', name: 'Three-egg omelette',         desc: 'Local farm eggs, coriander, salt',       price: '₹240' },
      { id: 'soup',     name: 'Tomato-ginger soup',         desc: 'A bowl, on cold afternoons',             price: '₹260' },
      { id: 'khichdi',  name: 'Moong-dal khichdi · ghee',  desc: 'Plain, restorative, made-to-order',      price: '₹320' },
    ],
  },
};

window.EKAM_COMP = { STAY, TODAY, TOMORROW, TRAILS, RITUALS, NOTES, REACH, COPY, KITCHEN };
