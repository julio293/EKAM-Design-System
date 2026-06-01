/* global React, L */
const { useState, useEffect, useRef } = React;

// Real lat/lng for the 15 cabins
const PROPERTIES = [
{ id: 'jhebi', name: 'Jhebi', tier: 'KUTIR', dev: 'कुटीर', region: 'Tirthan · HP', elev: '1,800 m', open: 'Mar — Oct', lat: 31.621, lng: 77.385 },
{ id: 'sainj', name: 'Sainj', tier: 'VAN', dev: 'वन', region: 'Kullu · HP', elev: '2,000 m', open: 'Apr — Oct', lat: 31.766, lng: 77.350 },
{ id: 'tirthan', name: 'Tirthan', tier: 'VAN', dev: 'वन', region: 'GHNP · HP', elev: '2,100 m', open: 'Apr — Oct', lat: 31.640, lng: 77.421 },
{ id: 'shimla', name: 'Shimla', tier: 'KUTIR', dev: 'कुटीर', region: 'Mashobra · HP', elev: '2,290 m', open: 'Year-round', lat: 31.116, lng: 77.288 },
{ id: 'baspa', name: 'Baspa', tier: 'VAN', dev: 'वन', region: 'Sangla · HP', elev: '1,900 m', open: 'Year-round', lat: 31.430, lng: 78.260 },
{ id: 'chitkul', name: 'Chitkul', tier: 'SHIKHAR', dev: 'शिखर', region: 'Last village · HP', elev: '3,450 m', open: 'May — Sep', lat: 31.346, lng: 78.428 },
{ id: 'kalpa', name: 'Kalpa', tier: 'SHIKHAR', dev: 'शिखर', region: 'Kinnaur · HP', elev: '3,200 m', open: 'Apr — Sep', lat: 31.535, lng: 78.260 },
{ id: 'fago', name: 'Fago', tier: 'KUTIR', dev: 'कुटीर', region: 'Spiti · HP', elev: '3,400 m', open: 'May — Sep', lat: 32.131, lng: 78.080 },
{ id: 'nako', name: 'Nako', tier: 'SHIKHAR', dev: 'शिखर', region: 'Spiti · HP', elev: '3,600 m', open: 'May — Sep', lat: 31.882, lng: 78.625 },
{ id: 'ramgarh', name: 'Ramgarh', tier: 'KUTIR', dev: 'कुटीर', region: 'Nainital · UK', elev: '1,790 m', open: 'Year-round', lat: 29.435, lng: 79.578 },
{ id: 'lamgad', name: 'Lamgad', tier: 'KUTIR', dev: 'कुटीर', region: 'Almora · UK', elev: '1,900 m', open: 'Year-round', lat: 29.598, lng: 79.668 },
{ id: 'binsar', name: 'Binsar', tier: 'KUTIR', dev: 'कुटीर', region: 'Kumaon · UK', elev: '2,400 m', open: 'Mar — Nov', lat: 29.683, lng: 79.747 },
{ id: 'binsar2', name: 'Binsar Deep', tier: 'VAN', dev: 'वन', region: 'Kumaon · UK', elev: '2,300 m', open: 'Mar — Nov', lat: 29.700, lng: 79.760 },
{ id: 'kausani', name: 'Kausani', tier: 'KUTIR', dev: 'कुटीर', region: 'Bageshwar · UK', elev: '1,890 m', open: 'Mar — Nov', lat: 29.844, lng: 79.601 },
{ id: 'munsiyari', name: 'Munsiyari', tier: 'SHIKHAR', dev: 'शिखर', region: 'Pithoragarh · UK', elev: '3,400 m', open: 'May — Sep', lat: 30.066, lng: 80.241 }];


const TIER_FILTERS = [
{ id: 'all', label: 'All', count: PROPERTIES.length },
{ id: 'KUTIR', label: 'Kutir', count: PROPERTIES.filter((p) => p.tier === 'KUTIR').length },
{ id: 'VAN', label: 'Van', count: PROPERTIES.filter((p) => p.tier === 'VAN').length },
{ id: 'SHIKHAR', label: 'Shikhar', count: PROPERTIES.filter((p) => p.tier === 'SHIKHAR').length }];


function LocationsBlock({ onPick }) {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null);
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  const visible = filter === 'all' ? PROPERTIES : PROPERTIES.filter((p) => p.tier === filter);

  // Init Leaflet once
  useEffect(() => {
    if (typeof L === 'undefined' || !mapEl.current || mapRef.current) return;
    const map = L.map(mapEl.current, {
      center: [30.5, 78.5],
      zoom: 7,
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: false
    });
    // Carto Voyager tile — soft beige/cream basemap; no token required
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
      attribution: '© OpenStreetMap · Carto',
      maxZoom: 18
    }).addTo(map);
    L.control.attribution({ position: 'bottomleft', prefix: '' }).addTo(map);
    mapRef.current = map;
  }, []);

  // Sync markers with visible
  useEffect(() => {
    const map = mapRef.current;
    if (!map || typeof L === 'undefined') return;

    // Remove existing markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    visible.forEach((p) => {
      const icon = L.divIcon({
        className: 'ekam-marker',
        html: `<span class="em-dot ${active === p.id ? 'em-on' : ''}"></span>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
      const m = L.marker([p.lat, p.lng], { icon }).
      addTo(map).
      bindTooltip(
        `<div class="em-pop">
            <div class="em-pop__name">${p.name}</div>
            <div class="em-pop__tier">${p.dev} · ${p.tier}</div>
            <div class="em-pop__meta">${p.elev} · ${p.open}</div>
          </div>`,
        { offset: [12, 0], direction: 'right', className: 'em-tooltip', opacity: 1 }
      ).
      on('mouseover', () => setActive(p.id)).
      on('mouseout', () => setActive(null)).
      on('click', () => onPick && onPick(p));
      markersRef.current[p.id] = m;
    });

    // Fit bounds when filter changes
    if (visible.length > 0) {
      const bounds = L.latLngBounds(visible.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 9 });
    }
  }, [filter]);

  // Highlight active marker
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const el = marker.getElement();
      if (!el) return;
      const dot = el.querySelector('.em-dot');
      if (!dot) return;
      dot.classList.toggle('em-on', id === active);
    });
  }, [active]);

  const focusOnList = (p) => {
    setActive(p.id);
    if (mapRef.current) {
      mapRef.current.setView([p.lat, p.lng], 10, { animate: true });
      const m = markersRef.current[p.id];
      if (m) m.openTooltip();
    }
  };

  return (
    <section className="surface is-sand" id="locations">
      <div className="container">
        <div className="loc-head">
          <div>
            <span className="eyebrow">— On the map</span>
            <h2 className="title" style={{ letterSpacing: "0.5px" }}>Fifteen cabins. Find yours by where it sits.</h2>
            <p className="lede">
              The western Himalaya, from Kullu to Pithoragarh. Hover a pin for the cabin.
            </p>
          </div>
          <div className="loc-filter">
            {TIER_FILTERS.map((f) =>
            <button
              key={f.id}
              className={`loc-filter__btn ${filter === f.id ? 'on' : ''}`}
              onClick={() => {setFilter(f.id);setActive(null);}}>
              
                {f.label}
                <span className="loc-filter__count">{f.count}</span>
              </button>
            )}
          </div>
        </div>

        <div className="loc-grid">
          <div className="loc-map" ref={mapEl}></div>
          <div className="loc-list">
            {visible.map((p) =>
            <button
              key={p.id}
              className={`loc-row ${active === p.id ? 'on' : ''}`}
              onMouseEnter={() => setActive(p.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => focusOnList(p)}>
              
                <div className="loc-row__dot"></div>
                <div className="loc-row__body">
                  <div className="loc-row__name">{p.name}</div>
                  <div className="loc-row__meta">
                    <span>{p.dev} · {p.tier}</span>
                    <span>{p.region}</span>
                  </div>
                  <div className="loc-row__sub">{p.elev} · {p.open}</div>
                </div>
                <span className="loc-row__arrow">→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>);

}
window.LocationsBlock = LocationsBlock;