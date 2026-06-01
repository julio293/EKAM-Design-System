/* global React */
// ════════════════════════════════════════════════════════════════
// Phone-internal screens · Home + Discover + Filters
// ════════════════════════════════════════════════════════════════
const { useState, useEffect, useRef } = React;

// ─── Shared chrome ─────────────────────────────────────────────
function StatusBar({ dark = false }) {
  const c = dark ? '#FAF7F0' : '#14201A';
  return (
    <div className={`sb ${dark ? 'dark' : ''}`}>
      <span>9:42</span>
      <div className="sb__ind">
        <svg width="16" height="10" viewBox="0 0 16 10">
          <circle cx="2" cy="8" r="1.4" fill={c} />
          <circle cx="6" cy="6" r="1.4" fill={c} />
          <circle cx="10" cy="4" r="1.4" fill={c} />
          <circle cx="14" cy="2" r="1.4" fill={c} />
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M1 9h2M4 7h2M7 5h2M10 3h2" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 11, fontWeight: 500 }}>84</span>
        <svg width="22" height="10" viewBox="0 0 22 10">
          <rect x="0.5" y="0.5" width="18" height="9" rx="1.5" fill="none" stroke={c} opacity="0.5" />
          <rect x="2" y="2" width="14" height="6" rx="0.5" fill={c} />
          <rect x="19" y="3.5" width="1.5" height="3" rx="0.4" fill={c} opacity="0.5" />
        </svg>
      </div>
    </div>);

}

function TabBar({ tab, onTab }) {
  const tabs = [
  { id: 'home', name: 'Home', dev: 'घर', i: <path d="M3 11l9-8 9 8M5 9v12h14V9" /> },
  { id: 'discover', name: 'Discover', dev: 'खोज', i: <><circle cx="11" cy="11" r="6.5" /><path d="M21 21l-4.5-4.5" /></> },
  { id: 'saved', name: 'Saved', dev: 'मन', i: <path d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" /> },
  { id: 'trips', name: 'Stay', dev: 'अभी', i: <><path d="M3 18s4-2 9-2 9 2 9 2" /><path d="M3 13s4-2 9-2 9 2 9 2" /><path d="M12 11V4" /><path d="M8 7l4-3 4 3" /></> },
  { id: 'profile', name: 'Profile', dev: 'आप', i: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></> }];

  return (
    <nav className="tabbar">
      {tabs.map((t) =>
      <button key={t.id} className={`tabbar__tab ${tab === t.id ? 'on' : ''}`} onClick={() => onTab(t.id)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{t.i}</svg>
          <span>{t.name}</span>
        </button>
      )}
    </nav>);

}

// ─── Cabin rail card (small) ───────────────────────────────────
function RailCard({ c, saved, onToggleSave, small = false }) {
  const { MOOD } = window.EKAM_HOME;
  return (
    <button className={`rail-card ${small ? 'rail-card--small' : ''}`}>
      <div className="rail-card__photo" style={{ background: MOOD[c.mood] }}>
        <span className="rail-card__bindu" />
        <span className="rail-card__heart" role="button" tabIndex={0} aria-label="Save" onClick={(e) => {e.stopPropagation();onToggleSave && onToggleSave(c.id);}}>
          <svg viewBox="0 0 24 24" fill={saved ? '#B4613A' : 'none'} stroke="#B4613A" strokeWidth="1.6">
            <path d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" />
          </svg>
        </span>
      </div>
      <div className="rail-card__body">
        <div className="rail-card__top">
          <span className="rail-card__eb">EKAM · {c.tier}</span>
          {!small && <span className="rail-card__elev">{c.elev}</span>}
        </div>
        <div className="rail-card__name">{c.name}</div>
        <div className="rail-card__region">{c.region}</div>
        {!small &&
        <div className="rail-card__price">
            <small>From </small>₹{c.price.toLocaleString('en-IN')}<small> / night</small>
          </div>
        }
      </div>
    </button>);

}

// ─── HOME ──────────────────────────────────────────────────────
function HomeScreen({ saved, toggleSave, tab, onTab }) {
  const { CABINS, COLLECTIONS, RECENT, SAVED, MOOD } = window.EKAM_HOME;
  const byId = (id) => CABINS.find((c) => c.id === id);

  const [stillness, ridge, work, monsoon] = COLLECTIONS;

  return (
    <React.Fragment>
      <StatusBar />

      {/* Header */}
      <div className="home__head">
        <div className="home__brand">
          <span className="home__brand-dev">एकम्</span>
          <span className="home__brand-wm">E<span className="d"></span>KAM</span>
        </div>
        <div className="home__icons">
          <button className="home__icon" aria-label="Notifications">
            <svg viewBox="0 0 24 24"><path d="M6 8a6 6 0 1112 0c0 7 3 7 3 9H3c0-2 3-2 3-9z" /><path d="M10 21a2 2 0 004 0" /></svg>
          </button>
          <button className="home__icon" aria-label="Saved">
            <svg viewBox="0 0 24 24" style={{ width: "20px", height: "20px" }}><path d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" /></svg>
          </button>
        </div>
      </div>

      {/* Greeting */}
      <div className="home__greet">
        <div className="home__greet-hand">Good morning, Anika.</div>
        <p className="home__greet-sub">The forest is awake. The kettle, soon.</p>
      </div>

      {/* Weather strip */}
      <div className="weather-strip">
        <span className="weather-strip__pill"><span className="dot" />Foggy in Kumaon · 8 — 14°C</span>
        <span className="weather-strip__pill"><span className="dot" />First snow at Munsiyari</span>
      </div>

      {/* Upcoming trip */}
      <div className="trip-card">
        <div className="trip-card__photo" style={{ background: MOOD.L }}>
          <span className="trip-card__photo-eb">— Twelve nights from now</span>
          <span className="trip-card__count">14 — 20 Aug 2026</span>
          <div className="trip-card__name">
            <div className="trip-card__name-dev">शिखर</div>
            <div className="trip-card__name-h">Kalpa</div>
            <div className="trip-card__name-sub">Kinnaur · 3,200 m · Tashi, your naturalist</div>
          </div>
        </div>
        <div className="trip-card__body">
          <div className="trip-card__meta">
            <div><span className="l">Tier</span><span className="v">Shikhar</span></div>
            <div><span className="l">Nights</span><span className="v">6</span></div>
            <div><span className="l">Status</span><span className="v">Confirmed</span></div>
          </div>
          <button className="trip-card__cta"><span className="dot" />Open retreat companion</button>
        </div>
      </div>

      {/* Collection · Stillness */}
      <div className="sec-head">
        <span className="sec-head__eb">— {stillness.eb}</span>
        <h2 className="sec-head__title">{stillness.name}</h2>
        <p className="sec-head__sub">{stillness.sub}</p>
      </div>
      <div className="rail">
        <div className="rail__track">
          {stillness.cabins.map((id) => {
            const c = byId(id);if (!c) return null;
            return <RailCard key={id} c={c} saved={saved.has(id)} onToggleSave={toggleSave} />;
          })}
        </div>
      </div>

      {/* Editorial moment — forest band */}
      <div className="editorial">
        <span className="editorial__eb">— The valley right now</span>
        <div className="editorial__dev">वर्षा</div>
        <h3 className="editorial__title">The monsoon arrives in Sangla on June 14.</h3>
        <div className="editorial__rule" />
        <p className="editorial__body">
          The Baspa runs full. The deodars hold the smell of warm rain for a week. Two Van cabins are open for the season; one is yours if you want it.
        </p>
        <span className="editorial__link">Read the field note →</span>
      </div>

      {/* Collection · Ridge */}
      <div className="sec-head">
        <span className="sec-head__eb">— {ridge.eb}</span>
        <h2 className="sec-head__title">{ridge.name}</h2>
        <p className="sec-head__sub">{ridge.sub}</p>
      </div>
      <div className="rail">
        <div className="rail__track">
          {ridge.cabins.map((id) => {
            const c = byId(id);if (!c) return null;
            return <RailCard key={id} c={c} saved={saved.has(id)} onToggleSave={toggleSave} />;
          })}
        </div>
      </div>

      {/* Recently viewed */}
      <div className="sec-head">
        <span className="sec-head__eb">— You were just here</span>
        <h2 className="sec-head__title">Recently viewed</h2>
      </div>
      <div className="rail">
        <div className="rail__track">
          {RECENT.map((id) => {
            const c = byId(id);if (!c) return null;
            return <RailCard key={id} c={c} saved={saved.has(id)} onToggleSave={toggleSave} small />;
          })}
        </div>
      </div>

      {/* Collection · Work */}
      <div className="sec-head">
        <span className="sec-head__eb">— {work.eb}</span>
        <h2 className="sec-head__title">{work.name}</h2>
        <p className="sec-head__sub">{work.sub}</p>
      </div>
      <div className="rail">
        <div className="rail__track">
          {work.cabins.map((id) => {
            const c = byId(id);if (!c) return null;
            return <RailCard key={id} c={c} saved={saved.has(id)} onToggleSave={toggleSave} />;
          })}
        </div>
      </div>

      {/* Saved preview */}
      <div className="sec-head">
        <span className="sec-head__eb">— Held for you</span>
        <h2 className="sec-head__title">Three saved escapes</h2>
        <p className="sec-head__sub">Future states of mind. Nothing is booked.</p>
      </div>
      <div style={{ paddingTop: 8 }}>
        {SAVED.map((id) => {
          const c = byId(id);if (!c) return null;
          return (
            <div key={id} className="saved-row" onClick={() => {}}>
              <div className="saved-row__photo" style={{ background: MOOD[c.mood] }} />
              <div className="saved-row__body">
                <span className="saved-row__eb">{c.dev} · {c.tier}</span>
                <span className="saved-row__name">{c.name}</span>
                <span className="saved-row__sub">{c.region} · {c.elev}</span>
              </div>
              <span className="saved-row__arrow">→</span>
            </div>);

        })}
      </div>

      <TabBar tab={tab} onTab={onTab} />
    </React.Fragment>);

}

// ─── DISCOVER ─────────────────────────────────────────────────
const SVGW = 344,SVGH = 380; // map drawing area

function DiscoverScreen({ saved, toggleSave, tab, onTab, onOpenFilters, filterChip, setFilterChip, activeFilters }) {
  const { CABINS, FILTER_CHIPS, MOOD } = window.EKAM_HOME;
  const [active, setActive] = useState('kalpa');
  const [view, setView] = useState('list'); // list | map

  // Apply filter chip + active filters
  const visible = CABINS.filter((c) => {
    if (filterChip === 'kutir' && c.tier !== 'KUTIR') return false;
    if (filterChip === 'van' && c.tier !== 'VAN') return false;
    if (filterChip === 'shikhar' && c.tier !== 'SHIKHAR') return false;
    if (filterChip === 'work' && !c.workcation) return false;
    if (filterChip === 'family' && !c.familyOk) return false;
    if (filterChip === 'monsoon' && c.elevN < 2500) return false;

    if (activeFilters.tiers.length > 0 && !activeFilters.tiers.includes(c.tier)) return false;
    if (Math.abs(c.elevN - activeFilters.elevTarget) > 500) return false;
    if (activeFilters.maxDrive && c.drive > activeFilters.maxDrive) return false;
    if (activeFilters.workcation && !c.workcation) return false;
    if (activeFilters.familyOk && !c.familyOk) return false;
    return true;
  });

  return (
    <React.Fragment>
      <StatusBar />

      <div className="disc__head">
        <div className="disc__search">
          <svg viewBox="0 0 24 24" stroke="currentColor"><circle cx="11" cy="11" r="6.5" /><path d="M21 21l-4.3-4.3" /></svg>
          <div className="disc__search-text">
            <span className="disc__search-main">Where, when, why</span>
            <span className="disc__search-sub">Himachal · Uttarakhand · anytime</span>
          </div>
          <button className="disc__filter-btn" onClick={onOpenFilters} aria-label="Filters">
            <svg viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
          </button>
        </div>

        <div className="chip-rail">
          {FILTER_CHIPS.map((f) =>
          <button key={f.id} className={`chip ${filterChip === f.id ? 'on' : ''}`} onClick={() => setFilterChip(f.id)}>
              <span className="chip__dev">{f.dev}</span>{f.name}
            </button>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="disc__map">
        <svg viewBox={`0 0 ${SVGW} ${SVGH}`} preserveAspectRatio="none">
          {/* Distant Himalayan range */}
          <defs>
            <pattern id="paper" patternUnits="userSpaceOnUse" width="12" height="12">
              <circle cx="2" cy="2" r="0.6" fill="#ECE4D3" opacity="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width={SVGW} height={SVGH} fill="#F4EDE1" />
          <rect x="0" y="0" width={SVGW} height={SVGH} fill="url(#paper)" opacity="0.6" />

          {/* Layered mountain silhouettes — back to front */}
          <path
            d="M -10 60 L 30 30 L 70 50 L 110 25 L 150 45 L 200 22 L 260 40 L 310 28 L 360 38 L 360 -10 L -10 -10 Z"
            fill="#C9D6BC" opacity="0.5" />
          
          <path
            d="M -10 110 L 40 75 L 90 95 L 140 65 L 200 92 L 250 70 L 300 88 L 360 82 L 360 -10 L -10 -10 Z"
            fill="#7A8A6B" opacity="0.55" />
          
          <path
            d="M -10 160 L 60 130 L 130 152 L 200 120 L 270 142 L 360 132 L 360 -10 L -10 -10 Z"
            fill="#4F5C3F" opacity="0.18" />
          

          {/* Rivers — thin pale meanders */}
          <path
            d="M 40 200 Q 90 220 140 215 T 240 240 T 340 260"
            fill="none" stroke="#A8C8E0" strokeWidth="1.4" opacity="0.5" />
          
          <path
            d="M 20 280 Q 70 295 120 290 T 220 300 T 340 320"
            fill="none" stroke="#A8C8E0" strokeWidth="1.2" opacity="0.4" />
          

          {/* Region labels */}
          <text x="80" y="195" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="11" fill="#7A8A6B" letterSpacing="0.5">Himachal</text>
          <text x="270" y="280" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="11" fill="#7A8A6B" letterSpacing="0.5">Uttarakhand</text>
          <text x="170" y="100" fontFamily="Inter, sans-serif" fontSize="8" fill="#8A9476" letterSpacing="2" textAnchor="middle">— THE HIMALAYA —</text>

          {/* Network outline (very subtle dashed connector) */}
          {visible.length > 1 && (() => {
            const pts = visible.map((c) => {
              const p = window.EKAM_PROJECT(c.lat, c.lng, SVGW, SVGH);
              return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
            });
            return null; // skip lines for clarity
          })()}
        </svg>

        {/* Pins layered on top */}
        {visible.map((c) => {
          const p = window.EKAM_PROJECT(c.lat, c.lng, SVGW, SVGH);
          return (
            <span
              key={c.id}
              className={`pin ${active === c.id ? 'on' : ''}`}
              style={{ left: `${p.x / SVGW * 100}%`, top: `${p.y / SVGH * 100}%` }}
              onClick={() => setActive(c.id)}>
              
              <span className="pin__label">
                <span className="pin__label-dev">{c.dev}</span>{c.name}
              </span>
            </span>);

        })}

        <div className="disc__zoom">
          <button>+</button>
          <button>−</button>
        </div>
      </div>

      {/* Bottom sheet — list of visible cabins */}
      <div className="disc__sheet">
        <div className="disc__sheet-handle" />
        <div className="disc__sheet-head">
          <span className="disc__sheet-h">{visible.length} cabins <em>{filterChip === 'all' ? 'in the network' : `· ${filterChip}`}</em></span>
          <div className="disc__sheet-toggle">
            <span className={view === 'list' ? 'on' : ''} onClick={() => setView('list')}>List</span>
            <span className={view === 'map' ? 'on' : ''} onClick={() => setView('map')}>Map</span>
          </div>
        </div>
        <div className="disc__sheet-list">
          {visible.map((c) =>
          <div
            key={c.id}
            className={`disc__sheet-row ${active === c.id ? 'on' : ''}`}
            onClick={() => setActive(c.id)}>
            
              <div className="disc__sheet-row__photo" style={{ background: MOOD[c.mood] }} />
              <div className="disc__sheet-row__body">
                <span className="disc__sheet-row__name">{c.name}</span>
                <span className="disc__sheet-row__meta">{c.region} · {c.elev}</span>
                <span className="disc__sheet-row__tier">{c.dev} · {c.tier}</span>
              </div>
              <div className="disc__sheet-row__price">
                ₹{c.price.toLocaleString('en-IN')}<small>per night</small>
              </div>
            </div>
          )}
        </div>
      </div>

      <TabBar tab={tab} onTab={onTab} />
    </React.Fragment>);

}

// ─── FILTERS sheet ────────────────────────────────────────────
function FiltersSheet({ open, onClose, filters, setFilters }) {
  if (!open) return null;
  const f = filters;
  const set = (patch) => setFilters({ ...f, ...patch });
  const toggleTier = (tier) => {
    const s = new Set(f.tiers);
    s.has(tier) ? s.delete(tier) : s.add(tier);
    set({ tiers: [...s] });
  };
  const TIERS = [
  { id: 'KUTIR', name: 'Kutir', dev: 'कुटीर' },
  { id: 'VAN', name: 'Van', dev: 'वन' },
  { id: 'SHIKHAR', name: 'Shikhar', dev: 'शिखर' }];

  const DRIVES = [
  { v: 6, label: '< 6 h' },
  { v: 10, label: '6 — 10 h' },
  { v: 15, label: '10 — 15 h' },
  { v: 99, label: 'Any drive' }];


  // Compute how many cabins match
  const { CABINS } = window.EKAM_HOME;
  const matching = CABINS.filter((c) => {
    if (f.tiers.length > 0 && !f.tiers.includes(c.tier)) return false;
    if (Math.abs(c.elevN - f.elevTarget) > 500) return false;
    if (f.maxDrive && c.drive > f.maxDrive) return false;
    if (f.workcation && !c.workcation) return false;
    if (f.familyOk && !c.familyOk) return false;
    return true;
  }).length;

  return (
    <div className="filt-overlay" onClick={onClose}>
      <div className="filt" onClick={(e) => e.stopPropagation()}>
        <div className="filt__handle" />
        <div className="filt__head">
          <h3 className="filt__title">Filters</h3>
          <button className="filt__close" onClick={onClose}>Close</button>
        </div>
        <div className="filt__body">

          <div className="filt__group">
            <div className="filt__group-h">
              <span className="filt__group-eb">Tier</span>
              <span className="filt__group-readout">{f.tiers.length || 'all'}</span>
            </div>
            <div className="filt__chip-grid">
              {TIERS.map((t) =>
              <button key={t.id} className={`filt__chip ${f.tiers.includes(t.id) ? 'on' : ''}`} onClick={() => toggleTier(t.id)}>
                  <span className="filt__chip__dev">{t.dev}</span>{t.name}
                </button>
              )}
            </div>
          </div>

          <div className="filt__group">
            <div className="filt__group-h">
              <span className="filt__group-eb">Elevation</span>
              <span className="filt__group-readout">{f.elevMin.toLocaleString('en-IN')} — {f.elevMax.toLocaleString('en-IN')} m</span>
            </div>
            <input
              type="range" min="1700" max="3700" step="100"
              value={f.elevMin}
              onChange={(e) => set({ elevMin: Math.min(+e.target.value, f.elevMax - 200) })}
              className="filt__slider" />
            
            <input
              type="range" min="1700" max="3700" step="100"
              value={f.elevMax}
              onChange={(e) => set({ elevMax: Math.max(+e.target.value, f.elevMin + 200) })}
              className="filt__slider"
              style={{ marginTop: 0 }} />
            
            <div className="filt__marks">
              <span>1,700</span><span>2,400</span><span>3,100</span><span>3,700 m</span>
            </div>
          </div>

          <div className="filt__group">
            <div className="filt__group-h">
              <span className="filt__group-eb">Drive time from</span>
              <span className="filt__group-readout">{f.driveFrom}</span>
            </div>
            <div className="filt__chip-grid" style={{ marginBottom: 10 }}>
              {['Delhi', 'Chandigarh', 'Bengaluru', 'Mumbai'].map((city) =>
              <button
                key={city}
                className={`filt__chip ${f.driveFrom === city ? 'on' : ''}`}
                onClick={() => set({ driveFrom: city })}>
                {city}</button>
              )}
            </div>
            <div className="filt__chip-grid">
              {DRIVES.map((d) =>
              <button key={d.v} className={`filt__chip ${f.maxDrive === d.v ? 'on' : ''}`} onClick={() => set({ maxDrive: d.v })}>
                  {d.label}
                </button>
              )}
            </div>
          </div>

          <div className="filt__group">
            <div className="filt__group-h">
              <span className="filt__group-eb">Flexible dates</span>
              <span className="filt__group-readout">Mood, not a calendar</span>
            </div>
            <div className="filt__chip-grid">
              {['A weekend', 'A week', 'Two weeks', 'A month', 'When you tell me'].map((d, i) =>
              <button key={i} className={`filt__chip ${f.duration === d ? 'on' : ''}`} onClick={() => set({ duration: d })}>{d}</button>
              )}
            </div>
          </div>

          <div className="filt__group">
            <div className="filt__group-h">
              <span className="filt__group-eb">Suitability</span>
            </div>
            <div class="filt__toggle-row" style={{ display: 'none' }}></div>
            <div className="filt__toggle-row">
              <div className="filt__toggle-lbl">
                <span className="n">Workcation-ready</span>
                <span className="s">Starlink + a desk + electricity that holds.</span>
              </div>
              <div className={`toggle ${f.workcation ? 'on' : ''}`} onClick={() => set({ workcation: !f.workcation })} />
            </div>
            <div className="filt__toggle-row">
              <div className="filt__toggle-lbl">
                <span className="n">Family with small humans</span>
                <span className="s">Van and select Kutir. We set the kettle.</span>
              </div>
              <div className={`toggle ${f.familyOk ? 'on' : ''}`} onClick={() => set({ familyOk: !f.familyOk })} />
            </div>
          </div>

        </div>

        <div className="filt__foot">
          <button className="filt__clear" onClick={() => setFilters({ tiers: [], elevTarget: 2400, driveFrom: 'Delhi', maxDrive: null, duration: null, workcation: false, familyOk: false })}>
            Clear
          </button>
          <button className="filt__cta" onClick={onClose}>
            <span className="dot" />Show {matching} cabins
          </button>
        </div>
      </div>
    </div>);

}

// ─── SAVED ────────────────────────────────────────────────────
function SavedScreen({ saved, toggleSave, tab, onTab }) {
  const { CABINS, MOOD } = window.EKAM_HOME;
  const list = [...saved].map((id) => CABINS.find((c) => c.id === id)).filter(Boolean);

  return (
    <React.Fragment>
      <StatusBar />
      <div className="home__head">
        <div className="home__brand">
          <span className="home__brand-dev">मन</span>
          <span className="home__brand-wm" style={{ fontSize: 18, letterSpacing: 3 }}>SAVED ESCAPES</span>
        </div>
      </div>
      <div className="home__greet">
        <div className="home__greet-hand">A shortlist, held.</div>
        <p className="home__greet-sub">Cabins you may not have decided on yet — and that's allowed.</p>
      </div>
      <div style={{ paddingTop: 8 }}>
        {list.length === 0 &&
        <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-devanagari)', fontSize: 28, color: 'var(--bindu)', letterSpacing: 2 }}>मन</span>
            <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 14, color: 'var(--moss)', lineHeight: 1.55, marginTop: 16, maxWidth: 260, marginLeft: 'auto', marginRight: 'auto' }}>
              No saved escapes yet. Tap the heart on any cabin and it will land here, quietly.
            </p>
          </div>
        }
        {list.map((c) =>
        <div key={c.id} className="saved-row">
            <div className="saved-row__photo" style={{ background: MOOD[c.mood] }} />
            <div className="saved-row__body">
              <span className="saved-row__eb">{c.dev} · {c.tier}</span>
              <span className="saved-row__name">{c.name}</span>
              <span className="saved-row__sub">{c.region} · {c.elev} · ₹{c.price.toLocaleString('en-IN')}</span>
            </div>
            <div className="saved-row__actions">
              <button className="saved-row__circle" onClick={() => toggleSave(c.id)} aria-label="Release">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#B4613A" stroke="#B4613A" strokeWidth="1.6"><path d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" /></svg>
              </button>
              <button className="saved-row__circle" aria-label="Share">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#B4613A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>
      <TabBar tab={tab} onTab={onTab} />
    </React.Fragment>);

}

// ─── STUB screens (Stay, Profile) ─────────────────────────────
function StubScreen({ tab, onTab, eyebrow, dev, title, sub, body }) {
  return (
    <React.Fragment>
      <StatusBar />
      <div className="home__head">
        <div className="home__brand">
          <span className="home__brand-dev">{dev}</span>
          <span className="home__brand-wm" style={{ fontSize: 18, letterSpacing: 3 }}>{eyebrow}</span>
        </div>
      </div>
      <div className="home__greet">
        <div className="home__greet-hand">{title}</div>
        <p className="home__greet-sub">{sub}</p>
      </div>
      <div style={{ padding: '20px 24px 24px', borderTop: '1px solid var(--bone)', marginTop: 12 }}>
        {body}
      </div>
      <TabBar tab={tab} onTab={onTab} />
    </React.Fragment>);

}

Object.assign(window, {
  StatusBar, TabBar, RailCard,
  HomeScreen, DiscoverScreen, FiltersSheet, SavedScreen, StubScreen
});