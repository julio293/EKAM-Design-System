/* global React */
const { useState } = React;

const PORTFOLIO = {
  kutir: {
    dev: 'कुटीर',
    name: 'KUTIR',
    sub: 'The hut. Standard cabin. 2 adults.',
    cabins: [
    { id: 'binsar', name: 'Binsar', region: 'Kumaon · Uttarakhand', elev: '2,400 m', open: 'Mar — Nov', mood: 'A: dawn — oak forest, monal song' },
    { id: 'lamgad', name: 'Lamgad', region: 'Almora · Uttarakhand', elev: '1,900 m', open: 'Year-round', mood: 'B: terraced fields, slow river' },
    { id: 'kausani', name: 'Kausani', region: 'Bageshwar · Uttarakhand', elev: '1,890 m', open: 'Mar — Nov', mood: 'C: 300-km Himalayan arc, sunset' },
    { id: 'ramgarh', name: 'Ramgarh', region: 'Nainital · Uttarakhand', elev: '1,790 m', open: 'Year-round', mood: 'D: orchards, deodar' },
    { id: 'fago', name: 'Fago', region: 'Spiti · HP', elev: '3,400 m', open: 'May — Sep', mood: 'E: cold desert · prayer flag' },
    { id: 'shimla', name: 'Shimla', region: 'Mashobra · HP', elev: '2,290 m', open: 'Year-round', mood: 'F: forest above the town' },
    { id: 'jhebi', name: 'Jhebi', region: 'Tirthan · HP', elev: '1,800 m', open: 'Mar — Oct', mood: 'G: trout stream, pine' }]

  },
  van: {
    dev: 'वन',
    name: 'VAN',
    sub: 'The forest. Premium immersion. 2–4 adults.',
    cabins: [
    { id: 'baspa', name: 'Baspa', region: 'Sangla · HP', elev: '1,900 m', open: 'Year-round', mood: 'H: deodar canopy · brown bear range' },
    { id: 'tirthan', name: 'Tirthan', region: 'Great Himalayan NP', elev: '2,100 m', open: 'Apr — Oct', mood: 'I: oak-rhododendron · leopard tracks' },
    { id: 'binsar2', name: 'Binsar Deep', region: 'Kumaon · UK', elev: '2,300 m', open: 'Mar — Nov', mood: 'J: dense canopy · barking deer' },
    { id: 'sainj', name: 'Sainj', region: 'Kullu · HP', elev: '2,000 m', open: 'Apr — Oct', mood: 'K: ancient forest · mycology season' }]

  },
  shikhar: {
    dev: 'शिखर',
    name: 'SHIKHAR',
    sub: 'The peak. Luxury retreat. 2 adults, full solitude.',
    cabins: [
    { id: 'kalpa', name: 'Kalpa', region: 'Kinnaur · HP', elev: '3,200 m', open: 'Apr — Sep', mood: 'L: Kinner Kailash facing' },
    { id: 'nako', name: 'Nako', region: 'Spiti · HP', elev: '3,600 m', open: 'May — Sep', mood: 'M: sacred lake · monastery view' },
    { id: 'chitkul', name: 'Chitkul', region: 'Last village · HP', elev: '3,450 m', open: 'May — Sep', mood: 'N: end of the road · Baspa source' },
    { id: 'munsiyari', name: 'Munsiyari', region: 'Pithoragarh · UK', elev: '3,400 m', open: 'May — Sep', mood: 'O: Panchachuli wall' }]

  }
};

// 24 mood gradients used as photo placeholders. Cycle by mood letter.
const MOOD_GRADIENT = {
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
  O: 'linear-gradient(180deg, #1a2228 0%, #3a4854 35%, #b8a48c 75%, #4a4035 100%)'
};

function PortfolioBlock({ onPick }) {
  const [tier, setTier] = useState('kutir');
  const fav = window.useFavorites();
  const t = PORTFOLIO[tier];

  return (
    <section className="surface is-sand" id="portfolio">
      <div className="container">
        <span className="eyebrow">— The portfolio</span>
        <h2 className="title">Fifteen cabins. Each one is its own place.</h2>
        <p className="lede">
          Same craft. Same comfort. The land is what changes everything.
        </p>

        {/* Tier tabs */}
        <div className="pf-tabs">
          {Object.entries(PORTFOLIO).map(([key, p]) =>
          <button
            key={key}
            className={`pf-tab ${key === tier ? 'on' : ''}`}
            onClick={() => setTier(key)}>
            
              <span className="pf-tab__dev">{p.dev}</span>
              <span className="pf-tab__name">{p.name}</span>
              <span className="pf-tab__count">{p.cabins.length} cabins</span>
            </button>
          )}
        </div>

        <p className="pf-sub" style={{ fontSize: "20px", color: "rgb(28, 56, 3)", fontWeight: "500" }}>{t.sub}</p>

        {/* Cabin grid */}
        <div className="pf-grid">
          {t.cabins.map((c) => {
            const moodKey = c.mood.charAt(0);
            return (
              <button key={c.id} className="pf-card" onClick={() => {window.location.href = `property.html?cabin=${c.id}`;}}>
                <div className="pf-card__photo" style={{ background: MOOD_GRADIENT[moodKey] }}>
                  <span className="pf-card__bindu"></span>
                  <button
                    className="pf-card__heart"
                    onClick={(e) => {e.stopPropagation();fav.toggle(c.id);}}
                    aria-label={fav.has(c.id) ? 'Remove from saved' : 'Save'}>
                    
                    <svg viewBox="0 0 24 24" fill={fav.has(c.id) ? '#B4613A' : 'none'} stroke={fav.has(c.id) ? '#B4613A' : '#14201A'} strokeWidth="1.6">
                      <path d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" />
                    </svg>
                  </button>
                </div>
                <div className="pf-card__body">
                  <div className="pf-card__top">
                    <span className="pf-card__eyebrow">EKAM · {t.name}</span>
                    <span className="pf-card__elev">{c.elev}</span>
                  </div>
                  <div className="pf-card__name">{c.name}</div>
                  <div className="pf-card__region">{c.region}</div>
                  <div className="pf-card__foot">
                    <span className="pf-card__open">{c.open}</span>
                    <span className="pf-card__arrow">→</span>
                  </div>
                </div>
              </button>);

          })}
        </div>
      </div>
    </section>);

}
window.PortfolioBlock = PortfolioBlock;