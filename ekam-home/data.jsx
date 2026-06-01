/* global React */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Home & Discovery · data
// ════════════════════════════════════════════════════════════════

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
};

const CABINS = [
  { id: 'binsar',   name: 'Binsar',      dev: 'कुटीर', tier: 'KUTIR',   region: 'Kumaon · UK',      elev: '2,400 m', elevN: 2400, price: 6400,  mood: 'A', lat: 29.683, lng: 79.747, drive: 8,  workOk: true,  petOk: true,  familyOk: true,  workcation: false, season: ['spring','autumn'], note: 'Oak forest, monal song.' },
  { id: 'lamgad',   name: 'Lamgad',      dev: 'कुटीर', tier: 'KUTIR',   region: 'Almora · UK',      elev: '1,900 m', elevN: 1900, price: 6400,  mood: 'B', lat: 29.598, lng: 79.668, drive: 9,  workOk: true,  petOk: true,  familyOk: true,  workcation: true,  season: ['spring','summer','autumn'], note: 'Terraced fields. Slow river.' },
  { id: 'kausani',  name: 'Kausani',     dev: 'कुटीर', tier: 'KUTIR',   region: 'Bageshwar · UK',   elev: '1,890 m', elevN: 1890, price: 6400,  mood: 'C', lat: 29.844, lng: 79.601, drive: 11, workOk: false, petOk: true,  familyOk: true,  workcation: false, season: ['autumn','winter'],     note: '300-km Himalayan arc.' },
  { id: 'ramgarh',  name: 'Ramgarh',     dev: 'कुटीर', tier: 'KUTIR',   region: 'Nainital · UK',    elev: '1,790 m', elevN: 1790, price: 6400,  mood: 'D', lat: 29.435, lng: 79.578, drive: 7,  workOk: true,  petOk: true,  familyOk: true,  workcation: true,  season: ['spring','autumn','winter'], note: 'Orchards. Deodar.' },
  { id: 'fago',     name: 'Fago',        dev: 'कुटीर', tier: 'KUTIR',   region: 'Spiti · HP',       elev: '3,400 m', elevN: 3400, price: 7200,  mood: 'E', lat: 32.131, lng: 78.080, drive: 18, workOk: false, petOk: false, familyOk: false, workcation: false, season: ['summer'],               note: 'Cold desert. Prayer flag.' },
  { id: 'shimla',   name: 'Shimla',      dev: 'कुटीर', tier: 'KUTIR',   region: 'Mashobra · HP',    elev: '2,290 m', elevN: 2290, price: 6800,  mood: 'F', lat: 31.116, lng: 77.288, drive: 9,  workOk: true,  petOk: true,  familyOk: true,  workcation: true,  season: ['spring','autumn','winter'], note: 'Forest above the town.' },
  { id: 'jhebi',    name: 'Jhebi',       dev: 'कुटीर', tier: 'KUTIR',   region: 'Tirthan · HP',     elev: '1,800 m', elevN: 1800, price: 6400,  mood: 'G', lat: 31.621, lng: 77.385, drive: 12, workOk: false, petOk: true,  familyOk: true,  workcation: false, season: ['spring','summer','autumn'], note: 'Trout stream. Pine.' },
  { id: 'baspa',    name: 'Baspa',       dev: 'वन',    tier: 'VAN',     region: 'Sangla · HP',      elev: '1,900 m', elevN: 1900, price: 9200,  mood: 'H', lat: 31.430, lng: 78.260, drive: 14, workOk: true,  petOk: true,  familyOk: true,  workcation: true,  season: ['summer','autumn'],     note: 'Deodar canopy.' },
  { id: 'tirthan',  name: 'Tirthan',     dev: 'वन',    tier: 'VAN',     region: 'GHNP · HP',        elev: '2,100 m', elevN: 2100, price: 9200,  mood: 'I', lat: 31.640, lng: 77.421, drive: 13, workOk: false, petOk: true,  familyOk: true,  workcation: false, season: ['spring','autumn'],     note: 'Leopard tracks.' },
  { id: 'binsar2',  name: 'Binsar Deep', dev: 'वन',    tier: 'VAN',     region: 'Kumaon · UK',      elev: '2,300 m', elevN: 2300, price: 9200,  mood: 'J', lat: 29.700, lng: 79.760, drive: 8,  workOk: false, petOk: true,  familyOk: false, workcation: false, season: ['spring','autumn'],     note: 'Dense canopy.' },
  { id: 'sainj',    name: 'Sainj',       dev: 'वन',    tier: 'VAN',     region: 'Kullu · HP',       elev: '2,000 m', elevN: 2000, price: 9200,  mood: 'K', lat: 31.766, lng: 77.350, drive: 14, workOk: false, petOk: true,  familyOk: true,  workcation: false, season: ['spring','summer','autumn'], note: 'Ancient forest. Mushrooms.' },
  { id: 'kalpa',    name: 'Kalpa',       dev: 'शिखर', tier: 'SHIKHAR', region: 'Kinnaur · HP',     elev: '3,200 m', elevN: 3200, price: 14800, mood: 'L', lat: 31.535, lng: 78.260, drive: 16, workOk: true,  petOk: false, familyOk: false, workcation: true,  season: ['summer','autumn'],     note: 'Kinner Kailash facing.' },
  { id: 'nako',     name: 'Nako',        dev: 'शिखर', tier: 'SHIKHAR', region: 'Spiti · HP',       elev: '3,600 m', elevN: 3600, price: 14800, mood: 'M', lat: 31.882, lng: 78.625, drive: 19, workOk: false, petOk: false, familyOk: false, workcation: false, season: ['summer'],               note: 'Sacred lake.' },
  { id: 'chitkul',  name: 'Chitkul',     dev: 'शिखर', tier: 'SHIKHAR', region: 'Last village · HP',elev: '3,450 m', elevN: 3450, price: 14800, mood: 'N', lat: 31.346, lng: 78.428, drive: 17, workOk: false, petOk: false, familyOk: false, workcation: false, season: ['summer'],               note: 'End of the road.' },
  { id: 'munsiyari',name: 'Munsiyari',   dev: 'शिखर', tier: 'SHIKHAR', region: 'Pithoragarh · UK', elev: '3,400 m', elevN: 3400, price: 14800, mood: 'O', lat: 30.066, lng: 80.241, drive: 15, workOk: false, petOk: false, familyOk: true,  workcation: false, season: ['summer','autumn'],     note: 'Panchachuli wall.' },
];

// Curated collections — copy is editorial, not categorical
const COLLECTIONS = [
  {
    id: 'stillness',
    eb: 'For the stillness',
    name: 'Retreats made for stopping',
    sub: 'Low canopy. Dense forest. Days that ask nothing.',
    cabins: ['binsar', 'jhebi', 'sainj', 'tirthan'],
  },
  {
    id: 'ridge',
    eb: 'Above the cloud',
    name: 'Ridgeline & high country',
    sub: 'Above 3,000 m. Thinner air, bigger sky.',
    cabins: ['kalpa', 'nako', 'chitkul', 'munsiyari'],
  },
  {
    id: 'work',
    eb: 'For the work',
    name: 'Work from the mountains',
    sub: 'Starlink. A desk that faces something useful.',
    cabins: ['shimla', 'ramgarh', 'lamgad', 'kalpa'],
  },
  {
    id: 'monsoon',
    eb: 'Now, in the rain',
    name: 'Monsoon at altitude',
    sub: 'Above 2,500 m. The rain falls below you.',
    cabins: ['kalpa', 'nako', 'chitkul', 'baspa'],
  },
  {
    id: 'stars',
    eb: 'For the sky',
    name: 'Stargazing escapes',
    sub: 'Above the inversion. Naked-eye constellations.',
    cabins: ['nako', 'chitkul', 'munsiyari', 'kalpa'],
  },
];

const RECENT = ['baspa', 'binsar2', 'jhebi'];
const SAVED  = ['kalpa', 'binsar', 'baspa'];

const FILTER_CHIPS = [
  { id: 'all',     name: 'All',         dev: 'सब' },
  { id: 'kutir',   name: 'Kutir',       dev: 'कुटीर' },
  { id: 'van',     name: 'Van',         dev: 'वन' },
  { id: 'shikhar', name: 'Shikhar',     dev: 'शिखर' },
  { id: 'work',    name: 'Workcation',  dev: 'कार्य' },
  { id: 'family',  name: 'Family',      dev: 'परिवार' },
  { id: 'monsoon', name: 'In monsoon',  dev: 'वर्षा' },
];

window.EKAM_HOME = { CABINS, COLLECTIONS, RECENT, SAVED, MOOD, FILTER_CHIPS };

// Projection helper for map (Himachal + Uttarakhand bounding box)
window.EKAM_PROJECT = function (lat, lng, w, h) {
  // Bounding box of the EKAM network
  const LAT_MIN = 29.2, LAT_MAX = 32.4;   // south → north
  const LNG_MIN = 76.9, LNG_MAX = 80.6;   // west → east
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * w;
  // SVG y is inverted (top=0)
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * h;
  return { x, y };
};
