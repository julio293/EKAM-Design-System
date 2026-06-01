/* global React */
const { useState, useEffect } = React;

// Full portfolio data (kept here so SavedPanel has its own copy)
const SAVED_PROPS = {
  binsar:    { name: 'Binsar',      tier: 'KUTIR',   dev: 'कुटीर', region: 'Kumaon · 2,400 m',     from: 8400 },
  fago:      { name: 'Fago',        tier: 'KUTIR',   dev: 'कुटीर', region: 'Spiti · 3,400 m',      from: 7800 },
  jhebi:     { name: 'Jhebi',       tier: 'KUTIR',   dev: 'कुटीर', region: 'Tirthan · 1,800 m',    from: 6400 },
  kausani:   { name: 'Kausani',     tier: 'KUTIR',   dev: 'कुटीर', region: 'Bageshwar · 1,890 m',  from: 6800 },
  lamgad:    { name: 'Lamgad',      tier: 'KUTIR',   dev: 'कुटीर', region: 'Almora · 1,900 m',     from: 6400 },
  ramgarh:   { name: 'Ramgarh',     tier: 'KUTIR',   dev: 'कुटीर', region: 'Nainital · 1,790 m',   from: 6400 },
  shimla:    { name: 'Shimla',      tier: 'KUTIR',   dev: 'कुटीर', region: 'Mashobra · 2,290 m',   from: 7200 },
  baspa:     { name: 'Baspa',       tier: 'VAN',     dev: 'वन',    region: 'Sangla · 1,900 m',     from: 9200 },
  binsar2:   { name: 'Binsar Deep', tier: 'VAN',     dev: 'वन',    region: 'Kumaon · 2,300 m',     from: 9600 },
  sainj:     { name: 'Sainj',       tier: 'VAN',     dev: 'वन',    region: 'Kullu · 2,000 m',      from: 9200 },
  tirthan:   { name: 'Tirthan',     tier: 'VAN',     dev: 'वन',    region: 'GHNP · 2,100 m',       from: 9400 },
  chitkul:   { name: 'Chitkul',     tier: 'SHIKHAR', dev: 'शिखर',  region: 'Last village · 3,450 m', from: 14400 },
  kalpa:     { name: 'Kalpa',       tier: 'SHIKHAR', dev: 'शिखर',  region: 'Kinnaur · 3,200 m',    from: 14800 },
  munsiyari: { name: 'Munsiyari',   tier: 'SHIKHAR', dev: 'शिखर',  region: 'Pithoragarh · 3,400 m',from: 13800 },
  nako:      { name: 'Nako',        tier: 'SHIKHAR', dev: 'शिखर',  region: 'Spiti · 3,600 m',      from: 15200 },
};

const ATMOS = {
  KUTIR:   'linear-gradient(180deg, #1a2620 0%, #2B4630 60%, #5a6655 100%)',
  VAN:     'linear-gradient(170deg, #14201A 0%, #2B4630 50%, #4a5a44 100%)',
  SHIKHAR: 'linear-gradient(180deg, #2a3845 0%, #6e7a82 50%, #b8a48c 100%)',
};

function SavedPanel({ onClose, onReserve }) {
  const { items, toggle } = window.useFavorites();
  const saved = items.map(id => ({ id, ...SAVED_PROPS[id] })).filter(p => p.name);

  return (
    <div className="sv-overlay" onClick={onClose}>
      <aside className="sv" onClick={(e) => e.stopPropagation()}>
        <div className="sv__head">
          <div>
            <span className="sv__eyebrow">— Your shortlist</span>
            <h2 className="sv__title">A few escapes, held quietly.</h2>
            <p className="sv__sub">{saved.length === 0 ? 'Tap ♡ on any cabin to keep it here. We hold it for you — no account needed.' : `${saved.length} cabin${saved.length > 1 ? 's' : ''} on your shortlist.`}</p>
          </div>
          <button className="sv__close" onClick={onClose}>— Close</button>
        </div>

        {saved.length === 0 ? (
          <div className="sv-empty">
            <div className="sv-empty__dev">एकम्</div>
            <p>Tap the heart on any cabin to keep it here for later — like a postcard you mailed to your future self.</p>
          </div>
        ) : (
          <div className="sv-list">
            {saved.map(p => (
              <div className="sv-row" key={p.id}>
                <div className="sv-row__photo" style={{ background: ATMOS[p.tier] }}>
                  <span className="sv-row__bindu"></span>
                </div>
                <div className="sv-row__body">
                  <div className="sv-row__top">
                    <span className="sv-row__eb">EKAM · {p.dev} · {p.tier}</span>
                    <button className="sv-row__remove" onClick={() => toggle(p.id)} aria-label="Remove">×</button>
                  </div>
                  <div className="sv-row__name">{p.name}</div>
                  <div className="sv-row__region">{p.region}</div>
                </div>
                <div className="sv-row__actions">
                  <div className="sv-row__price"><small>From</small>₹{p.from.toLocaleString('en-IN')}<small>/ night</small></div>
                  <button className="sv-row__cta" onClick={() => onReserve(p)}>
                    <span className="dot"></span>
                    Reserve
                  </button>
                  <a className="sv-row__more" href={`property.html?cabin=${p.id}`}>View cabin →</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}
window.SavedPanel = SavedPanel;
