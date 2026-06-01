/* global React */
const { useState, useRef, useEffect } = React;

// All 15 EKAM cabins, sorted by tier then name
const PLACES = [
  { id: 'binsar',    dev: 'कुटीर', tier: 'KUTIR',   name: 'Binsar',      region: 'Kumaon · 2,400 m',     from: 8400  },
  { id: 'fago',      dev: 'कुटीर', tier: 'KUTIR',   name: 'Fago',        region: 'Spiti · 3,400 m',      from: 7800  },
  { id: 'jhebi',     dev: 'कुटीर', tier: 'KUTIR',   name: 'Jhebi',       region: 'Tirthan · 1,800 m',    from: 6400  },
  { id: 'kausani',   dev: 'कुटीर', tier: 'KUTIR',   name: 'Kausani',     region: 'Bageshwar · 1,890 m',  from: 6800  },
  { id: 'lamgad',    dev: 'कुटीर', tier: 'KUTIR',   name: 'Lamgad',      region: 'Almora · 1,900 m',     from: 6400  },
  { id: 'ramgarh',   dev: 'कुटीर', tier: 'KUTIR',   name: 'Ramgarh',     region: 'Nainital · 1,790 m',   from: 6400  },
  { id: 'shimla',    dev: 'कुटीर', tier: 'KUTIR',   name: 'Shimla',      region: 'Mashobra · 2,290 m',   from: 7200  },
  { id: 'baspa',     dev: 'वन',    tier: 'VAN',     name: 'Baspa',       region: 'Sangla · 1,900 m',     from: 9200  },
  { id: 'binsar2',   dev: 'वन',    tier: 'VAN',     name: 'Binsar Deep', region: 'Kumaon · 2,300 m',     from: 9600  },
  { id: 'sainj',     dev: 'वन',    tier: 'VAN',     name: 'Sainj',       region: 'Kullu · 2,000 m',      from: 9200  },
  { id: 'tirthan',   dev: 'वन',    tier: 'VAN',     name: 'Tirthan',     region: 'GHNP · 2,100 m',       from: 9400  },
  { id: 'chitkul',   dev: 'शिखर',  tier: 'SHIKHAR', name: 'Chitkul',     region: 'Last village · 3,450 m', from: 14400 },
  { id: 'kalpa',     dev: 'शिखर',  tier: 'SHIKHAR', name: 'Kalpa',       region: 'Kinnaur · 3,200 m',    from: 14800 },
  { id: 'munsiyari', dev: 'शिखर',  tier: 'SHIKHAR', name: 'Munsiyari',   region: 'Pithoragarh · 3,400 m',from: 13800 },
  { id: 'nako',      dev: 'शिखर',  tier: 'SHIKHAR', name: 'Nako',        region: 'Spiti · 3,600 m',      from: 15200 },
];

// Daily rate model — varies by base rate × weekday/weekend modifier
function dailyRate(base, date) {
  const d = date.getDay();
  if (d === 1 || d === 2) return Math.round(base * 0.78); // Mon/Tue best
  if (d === 3 || d === 4) return Math.round(base * 0.88); // Wed/Thu mid
  if (d === 0) return Math.round(base * 0.95);            // Sun shoulder
  return base;                                            // Fri/Sat full
}
function isBestValue(base, date) {
  return dailyRate(base, date) <= Math.round(base * 0.78);
}

function fmtDate(d) {
  return d.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
function shortDate(d) {
  return d.toLocaleString('en-IN', { day: '2-digit', month: 'short' });
}
function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function GuestStepper({ value, onChange, max = 4, min = 1 }) {
  const dec = (e) => { e.stopPropagation(); if (value > min) onChange(value - 1); };
  const inc = (e) => { e.stopPropagation(); if (value < max) onChange(value + 1); };
  return (
    <div className="bw__stepper">
      <button className="bw__step" onClick={dec} disabled={value <= min} aria-label="Decrease">−</button>
      <span className="bw__step-val">{value}</span>
      <button className="bw__step" onClick={inc} disabled={value >= max} aria-label="Increase">+</button>
    </div>
  );
}

// =========== GUESTS & CABINS POPOVER (matches property page) ===========
function summarizeGuests({ adults, kidAges, rooms }) {
  const kidCount = kidAges.length;
  const parts = [];
  parts.push(`${adults} adult${adults !== 1 ? 's' : ''}`);
  if (kidCount > 0) parts.push(`${kidCount} child${kidCount !== 1 ? 'ren' : ''}`);
  parts.push(`${rooms} cabin${rooms !== 1 ? 's' : ''}`);
  return parts.join(' · ');
}

function GuestsPopover({ adults, kidAges, rooms, onChange, onDone, anyUnset }) {
  const stop = (e) => e.stopPropagation();
  const setAdults = (n) => onChange({ adults: Math.max(1, Math.min(8, n)), kidAges, rooms });
  const setKidCount = (n) => {
    n = Math.max(0, Math.min(4, n));
    let next = kidAges.slice(0, n);
    while (next.length < n) next.push(null);
    onChange({ adults, kidAges: next, rooms });
  };
  const setAge = (i, age) => {
    const next = [...kidAges];
    next[i] = age === '' ? null : Number(age);
    onChange({ adults, kidAges: next, rooms });
  };
  const setRooms = (n) => onChange({ adults, kidAges, rooms: Math.max(1, Math.min(4, n)) });

  return (
    <div className="bw-pop bw-pop--guests" onClick={stop}>
      <div className="bw-pop__head">
        <span className="bw-pop__hint">— Tell us who's coming</span>
        <button className="bw-pop__close" onClick={onDone}>— Close</button>
      </div>

      <div className="bw-gpop">
        <div className="bw-gpop__row">
          <div className="bw-gpop__lbl">
            <span className="bw-gpop__name">Adults</span>
            <span className="bw-gpop__meta">Ages 13 and over</span>
          </div>
          <GuestStepper value={adults} onChange={setAdults} max={8} min={1} />
        </div>

        <div className="bw-gpop__row">
          <div className="bw-gpop__lbl">
            <span className="bw-gpop__name">Children</span>
            <span className="bw-gpop__meta">
              Ages 0–12
              <span className="bw-gpop__pill">Under 5 free</span>
            </span>
          </div>
          <GuestStepper value={kidAges.length} onChange={setKidCount} max={4} min={0} />
        </div>

        {kidAges.length > 0 && (
          <div className="bw-gpop__ages">
            <span className="bw-gpop__ages-lbl">— {anyUnset ? "Set each child's age" : "Children's ages"}</span>
            <div className="bw-gpop__ages-grid">
              {kidAges.map((age, i) => (
                <label key={i} className={`bw-gpop__age ${age === null ? 'unset' : ''}`}>
                  <span className="bw-gpop__age-lbl">Child {i + 1}</span>
                  <select value={age === null ? '' : age} onChange={(e) => setAge(i, e.target.value)}>
                    <option value="">— Select age</option>
                    <option value="0">Under 1</option>
                    {Array.from({length: 12}, (_, k) => (
                      <option key={k+1} value={k+1}>{k+1} year{k+1>1?'s':''} old</option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="bw-gpop__row">
          <div className="bw-gpop__lbl">
            <span className="bw-gpop__name">Cabins</span>
            <span className="bw-gpop__meta">One cabin sleeps 2 adults</span>
          </div>
          <GuestStepper value={rooms} onChange={setRooms} max={4} min={1} />
        </div>
      </div>
    </div>
  );
}

// =========== CALENDAR (Airbnb / Google-Flights style with per-day rates) ===========
function CalendarPicker({ base, arrive, depart, onPick, onClose, side='left' }) {
  const [monthOffset, setMonthOffset] = useState(0);
  const today = new Date(); today.setHours(0,0,0,0);

  const renderMonth = (offset) => {
    const base0 = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    const daysInMonth = new Date(base0.getFullYear(), base0.getMonth() + 1, 0).getDate();
    const firstWd = (base0.getDay() + 6) % 7;
    const cells = [];
    for (let i = 0; i < firstWd; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(base0.getFullYear(), base0.getMonth(), d));
    while (cells.length % 7 !== 0) cells.push(null);

    const arriveDate = arrive;
    const departDate = depart;
    const inRange = (d) => arriveDate && departDate && d && d >= arriveDate && d <= departDate;

    return (
      <div className="bw-cal" key={offset}>
        <div className="bw-cal__head">
          <span className="bw-cal__month">{base0.toLocaleString('en-IN', { month: 'long', year: 'numeric' })}</span>
        </div>
        <div className="bw-cal__weekdays">
          {['Mo','Tu','We','Th','Fr','Sa','Su'].map(w => <span key={w}>{w}</span>)}
        </div>
        <div className="bw-cal__grid">
          {cells.map((d, i) => {
            if (!d) return <div key={i} className="bw-cal__empty" />;
            const past = d < today;
            const p = past ? null : dailyRate(base, d);
            const best = !past && isBestValue(base, d);
            const ar = sameDay(d, arriveDate);
            const de = sameDay(d, departDate);
            const mid = inRange(d) && !ar && !de;
            return (
              <button
                key={i}
                className={`bw-cal__cell ${best ? 'is-best' : ''} ${ar ? 'is-ar' : ''} ${de ? 'is-de' : ''} ${mid ? 'is-mid' : ''} ${past ? 'is-past' : ''}`}
                onClick={(e) => { e.stopPropagation(); if (!past) onPick(d); }}
                disabled={past}
              >
                <span className="bw-cal__day">{d.getDate()}</span>
                {p && <span className="bw-cal__price">₹{(p/1000).toFixed(1)}k</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`bw-pop bw-pop--${side}`} onClick={(e) => e.stopPropagation()}>
      <div className="bw-pop__head">
        <button className="bw-cal__nav" onClick={() => setMonthOffset(monthOffset - 1)} aria-label="Previous">←</button>
        <span className="bw-pop__hint">Per-night rate · Mon–Tue best value</span>
        <button className="bw-cal__nav" onClick={() => setMonthOffset(monthOffset + 1)} aria-label="Next">→</button>
      </div>
      <div className="bw-pop__months">
        {renderMonth(monthOffset)}
        {renderMonth(monthOffset + 1)}
      </div>
      <div className="bw-pop__legend">
        <span><i className="bw-lg bw-lg--best"></i>Best value</span>
        <span><i className="bw-lg bw-lg--sel"></i>Your stay</span>
        <button className="bw-pop__close" onClick={onClose}>— Close</button>
      </div>
    </div>
  );
}

// =========== MAIN WIDGET ===========
function BookingWidget({ onSubmit, onClose }) {
  const [placeId, setPlaceId] = useState('kalpa');
  const [arrive, setArrive] = useState(() => { const d = new Date(); d.setDate(d.getDate() + 14); return d; });
  const [depart, setDepart] = useState(() => { const d = new Date(); d.setDate(d.getDate() + 17); return d; });
  const [adults, setAdults] = useState(2);
  const [kidAges, setKidAges] = useState([]);
  const [rooms, setRooms] = useState(1);
  const [open, setOpen] = useState(null); // 'where' | 'arrive' | 'depart' | 'guests' | null
  const [picking, setPicking] = useState('arrive');
  const place = PLACES.find(p => p.id === placeId);
  const nights = Math.max(0, Math.round((depart - arrive) / 86400000));
  const anyUnset = kidAges.some(a => a === null);

  const wrapRef = useRef(null);
  useEffect(() => {
    const closeAll = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(null); };
    document.addEventListener('mousedown', closeAll);
    return () => document.removeEventListener('mousedown', closeAll);
  }, []);

  const handleDate = (d) => {
    if (picking === 'arrive') {
      setArrive(d);
      if (depart <= d) {
        const nd = new Date(d); nd.setDate(d.getDate() + 3);
        setDepart(nd);
      }
      setPicking('depart');
    } else {
      if (d <= arrive) {
        setArrive(d);
        const nd = new Date(d); nd.setDate(d.getDate() + 3);
        setDepart(nd);
        setPicking('depart');
      } else {
        setDepart(d);
        setOpen(null);
        setPicking('arrive');
      }
    }
  };

  const submit = () => onSubmit && onSubmit(place);

  return (
    <div className="bw-overlay" onClick={onClose}>
    <section className="bw-wrap" ref={wrapRef} onClick={(e) => e.stopPropagation()}>
      <div className="bw">
        <div className="bw__head">
          <span className="bw__dev">एकम्</span>
          <span className="bw__lbl">— Find your Ekam</span>
          <button className="bw__close" onClick={onClose}>— Close</button>
        </div>
        <div className="bw__row">
          {/* WHERE */}
          <div className="bw__field bw__field--lg" onClick={() => setOpen(open === 'where' ? null : 'where')}>
            <span className="bw__cap">Where</span>
            <span className="bw__val">
              <span className="bw__val-name">{place.name}</span>
              <span className="bw__val-meta">{place.region}</span>
            </span>
            {open === 'where' && (
              <div className="bw-pop bw-pop--where" onClick={(e) => e.stopPropagation()}>
                <div className="bw-pop__head">
                  <span className="bw-pop__hint">— All 15 cabins · by tier</span>
                  <button className="bw-pop__close" onClick={() => setOpen(null)}>— Close</button>
                </div>
                <div className="bw-where">
                  {['KUTIR', 'VAN', 'SHIKHAR'].map(tier => (
                    <div className="bw-where__col" key={tier}>
                      <div className="bw-where__head">
                        <span className="bw-where__dev">{PLACES.find(p => p.tier === tier).dev}</span>
                        <span className="bw-where__nm">{tier}</span>
                      </div>
                      {PLACES.filter(p => p.tier === tier).map(p => (
                        <button
                          key={p.id}
                          className={`bw-where__opt ${p.id === placeId ? 'on' : ''}`}
                          onClick={() => { setPlaceId(p.id); setOpen(null); }}
                        >
                          <span className="bw-where__opt-name">{p.name}</span>
                          <span className="bw-where__opt-meta">{p.region}</span>
                          <span className="bw-where__opt-price">₹{(p.from/1000).toFixed(1)}k</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ARRIVE */}
          <div
            className="bw__field"
            onClick={() => { setOpen(open === 'arrive' ? null : 'arrive'); setPicking('arrive'); }}
          >
            <span className="bw__cap">Arrive</span>
            <span className="bw__val">{fmtDate(arrive)}</span>
            {(open === 'arrive' || open === 'depart') && (
              <CalendarPicker
                base={place.from}
                arrive={arrive}
                depart={depart}
                onPick={handleDate}
                onClose={() => setOpen(null)}
                side="arrive"
              />
            )}
          </div>

          {/* DEPART */}
          <div
            className="bw__field"
            onClick={() => { setOpen(open === 'depart' ? null : 'depart'); setPicking('depart'); }}
          >
            <span className="bw__cap">Depart</span>
            <span className="bw__val">
              {fmtDate(depart)}
              {nights > 0 && <em className="bw__val-nights"> · {nights} night{nights !== 1 ? 's' : ''}</em>}
            </span>
          </div>

          {/* GUESTS & CABINS */}
          <div
            className="bw__field"
            onClick={() => setOpen(open === 'guests' ? null : 'guests')}
          >
            <span className="bw__cap">Guests &amp; cabins</span>
            <span className="bw__val">{summarizeGuests({ adults, kidAges, rooms })}</span>
            {open === 'guests' && (
              <GuestsPopover
                adults={adults}
                kidAges={kidAges}
                rooms={rooms}
                anyUnset={anyUnset}
                onChange={({ adults, kidAges, rooms }) => { setAdults(adults); setKidAges(kidAges); setRooms(rooms); }}
                onDone={() => setOpen(null)}
              />
            )}
          </div>

          {/* CTA */}
          <button className="bw__cta" onClick={submit} disabled={anyUnset}>
            <span className="bw__cta-dot"></span>
            {anyUnset ? 'Set ages' : 'Reserve'}
          </button>
        </div>
        <div className="bw__foot">
          <span>From <b>₹{place.from.toLocaleString('en-IN')}</b> / night · {place.dev} · {place.tier}</span>
          <span className="bw__foot-note">Long stays past 2 nights pass CAC saving back to you.</span>
        </div>
      </div>
    </section>
    </div>
  );
}
window.BookingWidget = BookingWidget;
window.GuestStepper = GuestStepper;
