/* global React */
// ============================================================
// EKAM Mobile — data layer
// ============================================================

// 15 cabins across the western Himalaya, with mood gradients
// used as cinematic photo placeholders. Each mood letter maps to
// a vertical gradient that suggests its forest, ridge, or sky.

const MOOD = {
  A: 'linear-gradient(180deg, #1a2620 0%, #2B4630 45%, #5a6655 95%)',
  B: 'linear-gradient(195deg, #36443a 0%, #5a6655 50%, #a59f86 100%)',
  C: 'linear-gradient(180deg, #2a3845 0%, #6e7a82 35%, #d68763 75%, #b8a48c 100%)',
  D: 'linear-gradient(180deg, #36443a 0%, #6b5e44 50%, #a59f86 100%)',
  E: 'linear-gradient(180deg, #6e7a82 0%, #a59f86 40%, #806d4e 100%)',
  F: 'linear-gradient(180deg, #14201A 0%, #1F3525 40%, #4a5a44 100%)',
  G: 'linear-gradient(180deg, #1f3525 0%, #2B4630 60%, #5a6655 100%)',
  H: 'linear-gradient(180deg, #14201A 0%, #1F3525 30%, #2B4630 65%, #4a5a44 100%)',
  I: 'linear-gradient(170deg, #1a2620 0%, #36443a 50%, #5a6655 100%)',
  J: 'linear-gradient(180deg, #0c1410 0%, #14201A 50%, #1F3525 100%)',
  K: 'linear-gradient(180deg, #2B4630 0%, #4a5a44 50%, #6b7a5c 100%)',
  L: 'linear-gradient(180deg, #2a3845 0%, #6e7a82 50%, #b8a48c 100%)',
  M: 'linear-gradient(180deg, #2a3845 0%, #4a5a64 50%, #806d4e 100%)',
  N: 'linear-gradient(180deg, #14201A 0%, #2a3845 50%, #6e7a82 100%)',
  O: 'linear-gradient(180deg, #1a2228 0%, #3a4854 35%, #b8a48c 75%, #4a4035 100%)',
  P: 'linear-gradient(160deg, #3a2c1e 0%, #6b4a2b 50%, #b8a48c 100%)',
};

const CABINS = [
  { id: 'binsar',   name: 'Binsar',       dev: 'कुटीर', tier: 'KUTIR',   region: 'Kumaon · Uttarakhand',  elev: '2,400 m', open: 'Mar — Nov',   price: 6400,  guests: '2 adults',     mood: 'A', note: 'Oak forest, monal song, dawn that takes its time.' },
  { id: 'lamgad',   name: 'Lamgad',       dev: 'कुटीर', tier: 'KUTIR',   region: 'Almora · Uttarakhand',  elev: '1,900 m', open: 'Year-round',  price: 6400,  guests: '2 adults',     mood: 'B', note: 'Terraced fields. A slow river. Cooking smells from the village.' },
  { id: 'kausani',  name: 'Kausani',      dev: 'कुटीर', tier: 'KUTIR',   region: 'Bageshwar · Uttarakhand', elev: '1,890 m', open: 'Mar — Nov', price: 6400,  guests: '2 adults',     mood: 'C', note: 'A 300-km Himalayan arc. Sunset is the appointment.' },
  { id: 'ramgarh',  name: 'Ramgarh',      dev: 'कुटीर', tier: 'KUTIR',   region: 'Nainital · Uttarakhand', elev: '1,790 m', open: 'Year-round', price: 6400,  guests: '2 adults',     mood: 'D', note: 'Orchards. Deodar. The smell of woodsmoke in October.' },
  { id: 'fago',     name: 'Fago',         dev: 'कुटीर', tier: 'KUTIR',   region: 'Spiti · HP',            elev: '3,400 m', open: 'May — Sep',   price: 7200,  guests: '2 adults',     mood: 'E', note: 'Cold desert. A prayer flag in the only wind that matters.' },
  { id: 'shimla',   name: 'Shimla',       dev: 'कुटीर', tier: 'KUTIR',   region: 'Mashobra · HP',         elev: '2,290 m', open: 'Year-round',  price: 6800,  guests: '2 adults',     mood: 'F', note: 'Forest above the town. Far enough that you forget the town.' },
  { id: 'jhebi',    name: 'Jhebi',        dev: 'कुटीर', tier: 'KUTIR',   region: 'Tirthan · HP',          elev: '1,800 m', open: 'Mar — Oct',   price: 6400,  guests: '2 adults',     mood: 'G', note: 'Trout stream. Pine. The sound of running water for breakfast.' },
  { id: 'baspa',    name: 'Baspa',        dev: 'वन',    tier: 'VAN',     region: 'Sangla · HP',           elev: '1,900 m', open: 'Year-round',  price: 9200,  guests: '2 – 4 adults', mood: 'H', note: 'Deodar canopy. Brown bear range. The forest as it actually feels.' },
  { id: 'tirthan',  name: 'Tirthan',      dev: 'वन',    tier: 'VAN',     region: 'Great Himalayan NP',    elev: '2,100 m', open: 'Apr — Oct',   price: 9200,  guests: '2 – 4 adults', mood: 'I', note: 'Oak-rhododendron. Leopard tracks. A path the cabin does not advertise.' },
  { id: 'binsar2',  name: 'Binsar Deep',  dev: 'वन',    tier: 'VAN',     region: 'Kumaon · UK',           elev: '2,300 m', open: 'Mar — Nov',   price: 9200,  guests: '2 – 4 adults', mood: 'J', note: 'Dense canopy. Barking deer. Light filtered to a green you have not seen.' },
  { id: 'sainj',    name: 'Sainj',        dev: 'वन',    tier: 'VAN',     region: 'Kullu · HP',            elev: '2,000 m', open: 'Apr — Oct',   price: 9200,  guests: '2 – 4 adults', mood: 'K', note: 'Ancient forest. Mycology season. The naturalist will show you.' },
  { id: 'kalpa',    name: 'Kalpa',        dev: 'शिखर', tier: 'SHIKHAR', region: 'Kinnaur · HP',          elev: '3,200 m', open: 'Apr — Sep',   price: 14800, guests: '2 adults',     mood: 'L', note: 'Kinner Kailash, full face. The world feels different at this altitude.' },
  { id: 'nako',     name: 'Nako',         dev: 'शिखर', tier: 'SHIKHAR', region: 'Spiti · HP',            elev: '3,600 m', open: 'May — Sep',   price: 14800, guests: '2 adults',     mood: 'M', note: 'Sacred lake. Monastery view. The silence here is older than language.' },
  { id: 'chitkul',  name: 'Chitkul',      dev: 'शिखर', tier: 'SHIKHAR', region: 'Last village · HP',     elev: '3,450 m', open: 'May — Sep',   price: 14800, guests: '2 adults',     mood: 'N', note: 'End of the road. Source of the Baspa. After this, there is nothing.' },
  { id: 'munsiyari',name: 'Munsiyari',    dev: 'शिखर', tier: 'SHIKHAR', region: 'Pithoragarh · UK',      elev: '3,400 m', open: 'May — Sep',   price: 14800, guests: '2 adults',     mood: 'O', note: 'The Panchachuli wall. Five peaks. You watch them from bed.' },
];

const COLLECTIONS = [
  {
    id: 'stillness',
    eyebrow: 'For the stillness',
    title: 'Retreats made for stopping',
    sub: 'Cabins chosen for how quiet they keep you. Low elevation, dense forest, days that ask nothing.',
    cabins: ['binsar', 'sainj', 'jhebi', 'tirthan'],
    tone: 'forest',
  },
  {
    id: 'ridge',
    eyebrow: 'Above the cloud',
    title: 'Ridgeline & high country',
    sub: 'Above 3,000 metres. Thinner air, bigger sky. The mountains feel different here.',
    cabins: ['kalpa', 'nako', 'chitkul', 'munsiyari'],
    tone: 'ridge',
  },
  {
    id: 'work',
    eyebrow: 'For the work',
    title: 'Work from the mountains',
    sub: 'Cabins with Starlink, a desk that faces something useful, and electricity that holds.',
    cabins: ['shimla', 'kausani', 'ramgarh', 'binsar2'],
    tone: 'sand',
  },
  {
    id: 'forest',
    eyebrow: 'Inside the trees',
    title: 'Forest immersion',
    sub: 'The Van tier. Cabins woven into canopy. You will hear weather before you see it.',
    cabins: ['baspa', 'tirthan', 'binsar2', 'sainj'],
    tone: 'forest',
  },
];

// Active upcoming trip — drives the home banner & companion mode
const TRIP = {
  cabin: 'kalpa',
  checkIn: '14 Aug 2026',
  checkOut: '20 Aug 2026',
  nights: 6,
  guests: '2 adults',
  status: 'confirmed',
  host: 'Tashi',
  daysOut: 12,
  weather: 'Clear · 8 to 14°C',
};

// In-stay companion content
const PROGRAMS = [
  { id: 'birds', name: 'Dawn bird walk',        meta: 'Pre-sunrise, two hours. Led by Tashi, our naturalist.', time: 'Tomorrow · 5:45',     price: 1200, dev: 'भोर' },
  { id: 'fora',  name: 'Foraging walk',         meta: 'Hour and a half. Wild greens, the river, what the season offers.', time: 'Wed · 10:00', price: 1800, dev: 'वन' },
  { id: 'sky',   name: 'Night-sky session',    meta: 'Telescope on the porch. Naked-eye constellations, planet pass.', time: 'Fri · 21:30', price: 900,  dev: 'तारा' },
  { id: 'tea',   name: 'Tea at the chai pavilion', meta: 'Three estates, three brews. Twenty minutes.',     time: 'Anytime · 16–18',  price: 400,  dev: 'चाय' },
  { id: 'med',   name: 'Forest sit, guided',    meta: 'Forty minutes. A spot in the trees, a quiet voice.', time: 'Thu · 7:00',         price: 800,  dev: 'मौन' },
];

const JOURNAL_PROMPTS = [
  { day: 'Day 1', prompt: 'What did the light look like when you arrived?' },
  { day: 'Day 2', prompt: 'Three sounds you heard before you opened your eyes.' },
  { day: 'Day 3', prompt: 'Something the forest noticed about you.' },
  { day: 'Day 4', prompt: 'A small thing you do at home that you forgot here.' },
  { day: 'Day 5', prompt: 'A sentence you would write to a friend without selling them anything.' },
];

const PAST_TRIPS = [
  { cabin: 'binsar',  dates: 'Nov 2025', nights: 4, mood: 'A', note: 'You wrote three letters and finished none.' },
  { cabin: 'jhebi',   dates: 'May 2025', nights: 3, mood: 'G', note: 'You learnt the difference between deodar and pine.' },
  { cabin: 'kausani', dates: 'Oct 2024', nights: 5, mood: 'C', note: 'You watched the Trishul go pink, six mornings in a row.' },
];

const NOTIFICATIONS = [
  { id: 1, time: 'This morning',   dev: 'भोर', title: 'The mountains are calling this weekend.', body: 'Three Kutir cabins opened up for the long weekend.', read: false },
  { id: 2, time: '2 days ago',     dev: 'वन',  title: 'Foggy mornings expected in Kalpa.',       body: 'Pack one warm layer extra. The light will be worth it.', read: false },
  { id: 3, time: 'Last week',      dev: 'चाय', title: 'Your retreat companion is ready.',         body: 'Twelve days to Kalpa. Tashi has prepared your cabin notes.', read: true },
  { id: 4, time: 'Two weeks ago',  dev: 'मौन', title: 'Bonfire begins at 7 PM tonight.',          body: 'For your stay at Binsar last winter. We miss you here.', read: true },
];

const USER = {
  name: 'Anika',
  member: 'EKAM Circle',
  joined: '2024',
  stays: 4,
  nights: 17,
  saplings: 32,
  hand: 'Anika',
};

Object.assign(window, {
  EKAM_DATA: { CABINS, COLLECTIONS, TRIP, PROGRAMS, JOURNAL_PROMPTS, PAST_TRIPS, NOTIFICATIONS, USER, MOOD },
  EKAM_MOOD: MOOD,
});
