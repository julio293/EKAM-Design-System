/* global React */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Property & Booking · phone screens
// ════════════════════════════════════════════════════════════════
const { useState, useEffect, useRef } = React;

// ─── SHARED CHROME ────────────────────────────────────────────
function StatusBar({ dark = false }) {
  const c = dark ? '#FAF7F0' : '#14201A';
  return (
    <div className={`pdp-sb ${dark ? 'on-dark' : ''}`}>
      <span>9:42</span>
      <div className="pdp-sb__ind">
        <svg width="16" height="10" viewBox="0 0 16 10">
          <circle cx="2"  cy="8" r="1.4" fill={c} />
          <circle cx="6"  cy="6" r="1.4" fill={c} />
          <circle cx="10" cy="4" r="1.4" fill={c} />
          <circle cx="14" cy="2" r="1.4" fill={c} />
        </svg>
        <span style={{ fontSize: 11, fontWeight: 500 }}>84</span>
        <svg width="22" height="10" viewBox="0 0 22 10">
          <rect x="0.5" y="0.5" width="18" height="9" rx="1.5" fill="none" stroke={c} opacity="0.5" />
          <rect x="2" y="2" width="14" height="6" rx="0.5" fill={c} />
        </svg>
      </div>
    </div>
  );
}

function HeaderActions({ onBack, dark = false, saved, onToggleSave, onShare }) {
  return (
    <div className={`pdp-actions ${dark ? 'on-dark' : ''}`}>
      <button className="pdp-actions__back" onClick={onBack} aria-label="Back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <div className="pdp-actions__r">
        <button className="pdp-actions__btn" onClick={onShare} aria-label="Share">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </button>
        <button className={`pdp-actions__btn ${saved ? 'on' : ''}`} onClick={onToggleSave} aria-label="Save">
          <svg viewBox="0 0 24 24" fill={saved ? '#B4613A' : 'none'} stroke={saved ? '#B4613A' : 'currentColor'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN 01 · HERO (top of property page) ───────────────────
function HeroScreen({ scroll = 0, saved, onToggleSave }) {
  const { PROPERTY, bucketStays } = window.EKAM_PDP;
  return (
    <div className="pdp-screen">
      <StatusBar dark />
      <HeaderActions dark saved={saved} onToggleSave={onToggleSave} onShare={() => {}} />

      {/* Hero gallery — swipe rail mock */}
      <div className="pdp-hero">
        <div className="pdp-hero__rail">
          <div className="pdp-hero__slide" style={{ background: PROPERTY.mood }}>
            {/* Firelight from the cabin window */}
            <span className="pdp-hero__glow" style={{ left: `${PROPERTY.windowLight.x}%`, top: `${PROPERTY.windowLight.y}%` }} />
            <span className="pdp-hero__bindu" />
          </div>
        </div>
        <div className="pdp-hero__dots">
          {PROPERTY.gallery.map((_, i) => (
            <span key={i} className={`pdp-hero__dot ${i === 0 ? 'on' : ''}`} />
          ))}
        </div>
        <span className="pdp-hero__count">1 / {PROPERTY.gallery.length} · Cabin</span>
      </div>

      {/* Caption strip */}
      <div className="pdp-body" style={{ marginTop: -24, paddingTop: 0 }}>
        <div className="pdp-cap-strip">
          <span className="pdp-cap-strip__dev">{PROPERTY.dev}</span>
          <div>
            <span className="pdp-cap-strip__eb">EKAM · {PROPERTY.tierName}</span>
            <h1 className="pdp-cap-strip__name">{PROPERTY.name}.</h1>
            <span className="pdp-cap-strip__region">{PROPERTY.region} · {PROPERTY.elev}</span>
          </div>
        </div>

        <div className="pdp-meta-row">
          <div className="pdp-meta-row__item">
            <span className="pdp-meta-row__big">{PROPERTY.rating}</span>
            <span className="pdp-meta-row__lbl">{bucketStays(PROPERTY.reviews)}</span>
          </div>
          <span className="pdp-meta-row__sep" />
          <div className="pdp-meta-row__item">
            <span className="pdp-meta-row__big">{PROPERTY.weather}</span>
            <span className="pdp-meta-row__lbl">Today on the ridge</span>
          </div>
          <span className="pdp-meta-row__sep" />
          <div className="pdp-meta-row__item">
            <span className="pdp-meta-row__big">{PROPERTY.drives[0].split('·')[1].trim()}</span>
            <span className="pdp-meta-row__lbl">{PROPERTY.drives[0].split('·')[0].trim()}</span>
          </div>
        </div>

        <div className="pdp-story">
          <span className="pdp-eb">— The cabin</span>
          <p>{PROPERTY.story}</p>
        </div>
      </div>

      <BookingBar />
    </div>
  );
}

// ─── SCREEN 02 · INCLUDED + RITUALS ────────────────────────────
function IncludedScreen({ saved, onToggleSave }) {
  const { PROPERTY } = window.EKAM_PDP;
  return (
    <div className="pdp-screen">
      <StatusBar dark={false} />
      <HeaderActions saved={saved} onToggleSave={onToggleSave} onShare={() => {}} />

      <div className="pdp-body pdp-body--scrolled">
        <div className="pdp-section">
          <span className="pdp-eb">— What's in your stay</span>
          <h2 className="pdp-h">Six things, included. <em>No extras at the door.</em></h2>
          <div className="pdp-included">
            {PROPERTY.included.map((it, i) => (
              <div className="pdp-included__row" key={i}>
                <span className="pdp-included__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <span className="pdp-included__name">{it.name}</span>
                  <span className="pdp-included__sub">{it.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pdp-section">
          <span className="pdp-eb">— Retreat rituals · optional</span>
          <h2 className="pdp-h">Add to the days, if you'd like.</h2>
          <div className="pdp-rituals">
            {PROPERTY.rituals.map(r => (
              <div className="pdp-ritual" key={r.id}>
                <div className="pdp-ritual__photo" style={{ background: r.grad }} />
                <div className="pdp-ritual__body">
                  <span className="pdp-ritual__moment">{r.moment}</span>
                  <span className="pdp-ritual__name">{r.name}</span>
                  <span className={`pdp-ritual__price ${r.price === 'Included' ? 'is-free' : ''}`}>{r.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BookingBar />
    </div>
  );
}

// ─── SCREEN 03 · REVIEWS + HOST ────────────────────────────────
function ReviewsScreen({ saved, onToggleSave }) {
  const { PROPERTY, bucketStays } = window.EKAM_PDP;
  return (
    <div className="pdp-screen">
      <StatusBar dark={false} />
      <HeaderActions saved={saved} onToggleSave={onToggleSave} onShare={() => {}} />

      <div className="pdp-body pdp-body--scrolled">
        <div className="pdp-section">
          <span className="pdp-eb">— After they left</span>
          <h2 className="pdp-h">What guests said, quietly.</h2>

          {/* Rating summary */}
          <div className="pdp-rating-sum">
            <div>
              <span className="pdp-rating-sum__big">{PROPERTY.rating}</span>
              <span className="pdp-rating-sum__lbl">{bucketStays(PROPERTY.reviews)}</span>
            </div>
            <ul className="pdp-rating-sum__cats">
              {PROPERTY.ratings.slice(0, 4).map(r => (
                <li key={r.lbl}>
                  <span>{r.lbl}</span>
                  <em>{r.val.toFixed(2)}</em>
                </li>
              ))}
            </ul>
          </div>

          {/* Highlight quotes */}
          <div className="pdp-quotes">
            {PROPERTY.highlights.slice(0, 2).map((h, i) => (
              <div className="pdp-quote" key={i}>
                <span className="pdp-quote__theme">— {h.theme}</span>
                <p className="pdp-quote__txt">"{h.quote}"</p>
                <div className="pdp-quote__from">
                  <b>{h.from}</b><span>{h.when}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pdp-section">
          <span className="pdp-eb">— Your host</span>
          <div className="pdp-host">
            <div className="pdp-host__avatar">{PROPERTY.hostName.charAt(0)}</div>
            <div>
              <div className="pdp-host__name">{PROPERTY.hostName}</div>
              <div className="pdp-host__sub">Resident · {PROPERTY.hostSince}</div>
              <div className="pdp-host__sub">Replies in &lt; 1 hour, 7am – 9pm.</div>
            </div>
          </div>
        </div>
      </div>

      <BookingBar />
    </div>
  );
}

// ─── BOOKING BAR · sticky bottom (peek) ────────────────────────
function BookingBar({ onTap }) {
  const { PROPERTY, seasonalUrgency } = window.EKAM_COMP_PDP || window.EKAM_PDP;
  return (
    <a className="pdp-book-bar" href="EKAM Mobile - Property & Booking.html#sheet" onClick={onTap}>
      <div className="pdp-book-bar__urgency">
        <span className="pdp-book-bar__pulse" />
        <span>{seasonalUrgency()}</span>
      </div>
      <div className="pdp-book-bar__main">
        <div>
          <div className="pdp-book-bar__price">
            ₹{PROPERTY.nightly.toLocaleString('en-IN')}
            <small>/ night</small>
          </div>
          <div className="pdp-book-bar__dates">12 — 15 Mar · 2 guests · 1 cabin</div>
        </div>
        <span className="pdp-book-bar__cta">
          <span className="dot" />
          Reserve
        </span>
      </div>
    </a>
  );
}

// ─── SCREEN 04 · BOOKING SHEET (3/4 height, matches standalone widget) ─
function BookingSheetScreen({ saved, onToggleSave }) {
  const { PROPERTY, BOOKING_DEFAULT, fmtFull, nightsBetween, priceBreakdown, evaluateParty, summarizeGuests, seasonalUrgency } = window.EKAM_PDP;
  const [state] = useState(BOOKING_DEFAULT);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const nights = nightsBetween(state.arriveDate, state.departDate);
  const wb = priceBreakdown(state.arriveDate, state.departDate, PROPERTY.nightly, state.rooms);
  const ev = evaluateParty(state);
  const cabinSubtotal = (wb.weekday * wb.weekdayRate + wb.weekend * wb.weekendRate) * state.rooms;
  const longSave = nights >= 3 ? Math.round(cabinSubtotal * 0.08) : 0;
  const afterSave = cabinSubtotal - longSave;
  const cgst = Math.round(afterSave * 0.06);
  const sgst = Math.round(afterSave * 0.06);
  const levy = Math.round(afterSave * 0.01);
  const total = afterSave + cgst + sgst + levy;

  return (
    <div className="pdp-screen pdp-screen--sheet">
      <div className="pdp-sheet-bg">
        <div style={{ background: PROPERTY.mood, height: 220 }} />
      </div>
      <div className="pdp-sheet-scrim" />

      <div className="pdp-sheet">
        <div className="pdp-sheet__handle" />

        <div className="pdp-sheet__body">
          {/* Top — matches standalone widget */}
          <div className="bw__top">
            <span className="bw__price">₹{PROPERTY.nightly.toLocaleString('en-IN')}</span>
            <span className="bw__per">/ night</span>
            <span className="bw__star"><span>●</span> {PROPERTY.rating} · 100+ stays</span>
          </div>

          {/* Urgency strip */}
          <div className="bw__urgency">
            <span className="bw__pulse" />
            <span>{seasonalUrgency()}</span>
          </div>

          {/* Fields group */}
          <div className="bw__group">
            <div className="bw__row">
              <div className="bw__field">
                <span className="bw__field-lbl">Arrive</span>
                <span className="bw__field-val">{fmtFull(state.arriveDate)}</span>
              </div>
              <div className="bw__field">
                <span className="bw__field-lbl">Depart</span>
                <span className="bw__field-val">{fmtFull(state.departDate)} <em>· {nights}n</em></span>
              </div>
            </div>
            <div className="bw__field bw__field--single">
              <span className="bw__field-lbl">Guests &amp; cabins</span>
              <span className="bw__field-val">{summarizeGuests(state)}</span>
              <span className="bw__chev">▾</span>
            </div>
          </div>

          {/* Smart card */}
          {ev.strategy && (
            <div className="bw__smart">
              <span className="bw__smart-lbl">— {ev.strategy.kind === 'family' ? 'Family-friendly' : 'Recommended'}</span>
              <p>{ev.strategy.msg}</p>
            </div>
          )}

          {/* Trust strip */}
          <div className="bw__trust">
            <svg viewBox="0 0 24 24" fill="none" stroke="#B4613A" strokeWidth="1.6"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"/><path d="M9 12l2 2 4-4"/></svg>
            <span><b>{PROPERTY.cancellation}</b>. No payment held yet.</span>
          </div>

          {/* Total + details popover */}
          <div className="bw__breakdown">
            <div className="bw__total-row">
              <div>
                <span className="bw__total-lbl">Total</span>
                <button className="bw__details-trigger" onClick={() => setDetailsOpen(o => !o)}>
                  View price details →
                </button>
              </div>
              <span className="bw__total-amt">
                ₹{total.toLocaleString('en-IN')}
                <small>incl. all taxes</small>
              </span>
            </div>

            {detailsOpen && (
              <div className="bw__details on">
                <div className="bw__details-head">
                  <span className="bw__details-title">Price details · {nights} nights</span>
                  <button className="bw__details-close" onClick={() => setDetailsOpen(false)}>×</button>
                </div>
                <div className="bw__details-group">
                  <span className="bw__details-group-lbl">— Stay</span>
                  {wb.weekday > 0 && (
                    <div className="bw__line"><span>Weekday × {wb.weekday} <em>· ₹{wb.weekdayRate.toLocaleString('en-IN')}</em></span><span>₹{(wb.weekday * wb.weekdayRate * state.rooms).toLocaleString('en-IN')}</span></div>
                  )}
                  {wb.weekend > 0 && (
                    <div className="bw__line"><span>Weekend × {wb.weekend} <em>· ₹{wb.weekendRate.toLocaleString('en-IN')}</em></span><span>₹{(wb.weekend * wb.weekendRate * state.rooms).toLocaleString('en-IN')}</span></div>
                  )}
                  {longSave > 0 && (
                    <div className="bw__line save"><span>Long-stay pass-back <em>· 8%</em></span><span>− ₹{longSave.toLocaleString('en-IN')}</span></div>
                  )}
                </div>
                <div className="bw__details-group">
                  <span className="bw__details-group-lbl">— Taxes &amp; levies</span>
                  <div className="bw__line"><span>CGST <em>6%</em></span><span>₹{cgst.toLocaleString('en-IN')}</span></div>
                  <div className="bw__line"><span>SGST <em>6%</em></span><span>₹{sgst.toLocaleString('en-IN')}</span></div>
                  <div className="bw__line"><span>UK tourism levy <em>1%</em></span><span>₹{levy.toLocaleString('en-IN')}</span></div>
                </div>
                <div className="bw__details-foot">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pinned footer with CTA */}
        <div className="pdp-sheet__foot">
          <button className="pdp-sheet__cta">
            <span className="dot" />
            Reserve · ₹{total.toLocaleString('en-IN')}
          </button>
          <p className="pdp-sheet__hint">No payment yet — we hold the cabin for 24 hours.</p>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 05 · GUEST POPOVER (over sheet) ────────────────────
function GuestPopoverScreen({ saved, onToggleSave }) {
  const { PROPERTY } = window.EKAM_PDP;
  const [adults, setAdults] = useState(2);
  const [kidAges, setKidAges] = useState([null, 7]); // showing the unset state
  const [rooms, setRooms] = useState(1);

  const setKidCount = (n) => {
    n = Math.max(0, Math.min(4, n));
    let next = kidAges.slice(0, n);
    while (next.length < n) next.push(null);
    setKidAges(next);
  };
  const setAge = (i, age) => {
    const next = [...kidAges];
    next[i] = age === '' ? null : Number(age);
    setKidAges(next);
  };

  const anyUnset = kidAges.some(a => a === null);
  const { evaluateParty } = window.EKAM_PDP;
  const ev = evaluateParty({ adults, kidAges, rooms });

  return (
    <div className="pdp-screen pdp-screen--sheet">
      <div className="pdp-sheet-bg">
        <div style={{ background: PROPERTY.mood, height: 220 }} />
      </div>
      <div className="pdp-sheet-scrim pdp-sheet-scrim--deep" />

      <div className="pdp-sheet pdp-sheet--popover">
        <div className="pdp-sheet__handle" />

        <div className="pdp-sheet__head">
          <div>
            <span className="pdp-sheet__eb">— Tell us who's coming</span>
            <h3 className="pdp-sheet__title">Guests &amp; cabins.</h3>
          </div>
          <button className="pdp-sheet__close" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>

        <div className="pdp-sheet__body" style={{ paddingTop: 8 }}>

          <div className="pdp-gp-row">
            <div>
              <div className="pdp-gp-row__name">Adults</div>
              <div className="pdp-gp-row__meta">Ages 13 and over</div>
            </div>
            <Stepper value={adults} onChange={(v) => setAdults(Math.max(1, Math.min(8, v)))} min={1} />
          </div>

          <div className="pdp-gp-row">
            <div>
              <div className="pdp-gp-row__name">Children</div>
              <div className="pdp-gp-row__meta">
                Ages 0–12
                <span className="pdp-gp-pill">Under 5 free</span>
              </div>
            </div>
            <Stepper value={kidAges.length} onChange={setKidCount} min={0} max={4} />
          </div>

          {kidAges.length > 0 && (
            <div className="pdp-ages">
              <span className="pdp-ages__lbl">— {anyUnset ? 'Set each child\'s age' : 'Children\'s ages'}</span>
              <div className="pdp-ages__grid">
                {kidAges.map((age, i) => (
                  <label key={i} className={`pdp-age ${age === null ? 'unset' : ''}`}>
                    <span className="pdp-age__lbl">Child {i + 1}</span>
                    <select value={age === null ? '' : age} onChange={(e) => setAge(i, e.target.value)}>
                      <option value="">— Select</option>
                      <option value="0">Under 1</option>
                      {Array.from({ length: 12 }, (_, k) => (
                        <option key={k + 1} value={k + 1}>{k + 1} yr</option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="pdp-gp-row">
            <div>
              <div className="pdp-gp-row__name">Cabins</div>
              <div className="pdp-gp-row__meta">
                Sleeps two per cabin
                {ev.recommendedRooms > 1 && rooms < ev.recommendedRooms && <span className="pdp-gp-pill on">Try {ev.recommendedRooms}</span>}
              </div>
            </div>
            <Stepper value={rooms} onChange={(v) => setRooms(Math.max(1, Math.min(4, v)))} min={1} max={4} />
          </div>

          {ev.strategy && (
            <div className="pdp-smart pdp-smart--in-popover">
              <span className="pdp-smart__lbl">— {ev.strategy.kind === 'family' ? 'Family-friendly' : 'Recommended'}</span>
              <p>{ev.strategy.msg}</p>
            </div>
          )}
        </div>

        <div className="pdp-sheet__foot">
          <button className="pdp-sheet__cta" disabled={anyUnset}>
            {anyUnset ? 'Set ages to continue' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Stepper({ value, onChange, min = 0, max = 99 }) {
  return (
    <div className="pdp-step">
      <button onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease">−</button>
      <span className="pdp-step__val">{value}</span>
      <button onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase">+</button>
    </div>
  );
}

// ─── SCREEN 06 · CONFIRMED + COMPANION HANDOFF ─────────────────
function ConfirmedScreen() {
  const { PROPERTY } = window.EKAM_PDP;
  return (
    <div className="pdp-screen pdp-screen--confirmed">
      <StatusBar dark />
      <div className="pdp-confirmed">
        <div className="pdp-confirmed__top">
          <span className="pdp-confirmed__eb">— Reserved · held for you</span>
          <div className="pdp-confirmed__check">
            <svg viewBox="0 0 24 24" fill="none" stroke="#B4613A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" stroke="#B4613A" strokeWidth="1.4" />
              <polyline points="7 12.5 10.5 16 17 9" />
            </svg>
          </div>
          <h2 className="pdp-confirmed__title">Your retreat companion <em>is ready.</em></h2>
          <p className="pdp-confirmed__sub">
            We're holding {PROPERTY.name} for 12 — 15 March. The companion has your cabin code, the host's number, and a quiet daily ritual. It works without signal.
          </p>
        </div>

        <div className="pdp-confirmed__code">
          <span className="pdp-confirmed__code-lbl">— Confirmation</span>
          <span className="pdp-confirmed__code-val">EKM · 7842</span>
        </div>

        <div className="pdp-confirmed__list">
          <span className="pdp-confirmed__list-lbl">— What the companion opens</span>
          {[
            ['01', 'Your itinerary', 'Dates, gate code, hot-water windows.'],
            ['02', 'Aarav on speed-dial', 'Your host, one tap, 7am — 9pm.'],
            ['03', 'Digital check-in', 'Skip the desk. The cabin knows you.'],
            ['04', 'Daily ritual', 'One quiet prompt each morning.'],
          ].map(([n, name, sub]) => (
            <div className="pdp-confirmed__item" key={n}>
              <span className="pdp-confirmed__item-n">{n}</span>
              <div>
                <span className="pdp-confirmed__item-name">{name}</span>
                <span className="pdp-confirmed__item-sub">{sub}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pdp-confirmed__foot">
          <button className="pdp-confirmed__cta">
            <span className="dot" />
            Open the companion
          </button>
          <button className="pdp-confirmed__ghost">View itinerary later</button>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 06 · LEAD GUEST (post-sheet, pre-confirmation) ───────
// The guest details step. "For myself" is the default; tap to switch
// to "For someone else" — pick from contacts or type the name in.
function LeadGuestScreen() {
  const { PROPERTY } = window.EKAM_PDP;
  const [mode, setMode] = useState('self');         // 'self' | 'someone'
  const [picker, setPicker] = useState(false);      // contact-picker sheet
  const [selectedContact, setSelectedContact] = useState(null);
  const [save, setSave] = useState(true);

  // Stub address-book entries — what a native contact picker would surface
  const CONTACTS = [
    { id: 'p', name: 'Priya Mehra',   phone: '+91 98765 43210', email: 'priya.m@gmail.com',   initial: 'P' },
    { id: 'k', name: 'Karan Singh',   phone: '+91 99876 54321', email: 'karan@hey.com',       initial: 'K' },
    { id: 'd', name: 'Devaki Roy',    phone: '+91 99123 45678', email: 'devaki.roy@gmail.com',initial: 'D' },
    { id: 'r', name: 'Rohit Bansal',  phone: '+91 98123 99887', email: 'rohit@b.in',          initial: 'R' },
  ];

  return (
    <div className="pdp-screen">
      <StatusBar />

      <div className="pdp-body" style={{ paddingTop: 0 }}>
        <header className="pdp-section" style={{ borderBottom: 0, paddingTop: 18 }}>
          <span className="pdp-eb">— Before we hold the cabin</span>
          <h2 className="pdp-h">Who's the lead guest?</h2>
          <p style={{ margin: 0, fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 13.5, color: 'var(--moss)', lineHeight: 1.5, maxWidth: 280 }}>
            One name on the booking. The host greets them at the gate. The cabin code goes to them by post.
          </p>
        </header>

        {/* Mode toggle — pill segmented control */}
        <div className="lg-toggle">
          <button className={mode === 'self' ? 'on' : ''} onClick={() => setMode('self')}>For myself</button>
          <button className={mode === 'someone' ? 'on' : ''} onClick={() => setMode('someone')}>For someone else</button>
        </div>

        {/* Body switches by mode */}
        {mode === 'self' ? (
          <div className="lg-self">
            <div className="lg-card">
              <span className="lg-card__avatar">A</span>
              <div className="lg-card__body">
                <span className="lg-card__name">Anika Sharma</span>
                <span className="lg-card__row">anika@inbox.in</span>
                <span className="lg-card__row">+91 98765 43210</span>
                <span className="lg-card__row">India</span>
              </div>
              <span className="lg-card__check">
                <svg viewBox="0 0 24 24" fill="none" stroke="#B4613A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" stroke="#B4613A" strokeWidth="1.2"/>
                  <polyline points="7 12.5 10.5 16 17 9"/>
                </svg>
              </span>
            </div>
            <a className="lg-edit" href="EKAM Mobile - Profile, Mudra & Referral.html#profile">Edit profile →</a>
          </div>
        ) : (
          <div className="lg-someone">
            {!selectedContact ? (
              <>
                {/* Contact picker — primary path, Uber-style */}
                <button className="lg-pick" onClick={() => setPicker(true)}>
                  <span className="lg-pick__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>
                    </svg>
                  </span>
                  <div>
                    <span className="lg-pick__lbl">Pick from your contacts</span>
                    <span className="lg-pick__sub">We only read who you choose · never the whole book</span>
                  </div>
                  <span className="lg-pick__chev">→</span>
                </button>

                <div className="lg-or"><span>or type the details</span></div>

                <div className="lg-form">
                  <div className="lg-row">
                    <label className="lg-field">
                      <span className="lg-field__lbl">First name</span>
                      <input type="text" placeholder="Their first name" />
                    </label>
                    <label className="lg-field">
                      <span className="lg-field__lbl">Last name</span>
                      <input type="text" placeholder="Last name" />
                    </label>
                  </div>
                  <label className="lg-field">
                    <span className="lg-field__lbl">Mobile · India</span>
                    <div className="lg-phone">
                      <span className="lg-phone__cc">+91</span>
                      <input type="tel" placeholder="10-digit number" />
                    </div>
                  </label>
                  <label className="lg-field">
                    <span className="lg-field__lbl">Email <em>· optional</em></span>
                    <input type="email" placeholder="To send the cabin code" />
                  </label>
                </div>
              </>
            ) : (
              <>
                <div className="lg-card lg-card--picked">
                  <span className="lg-card__avatar">{selectedContact.initial}</span>
                  <div className="lg-card__body">
                    <span className="lg-card__name">{selectedContact.name}</span>
                    <span className="lg-card__row">{selectedContact.email}</span>
                    <span className="lg-card__row">{selectedContact.phone}</span>
                  </div>
                  <button className="lg-card__clear" onClick={() => setSelectedContact(null)} aria-label="Choose again">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
                  </button>
                </div>
                <a className="lg-edit" onClick={() => setSelectedContact(null)}>Choose someone else →</a>
              </>
            )}
          </div>
        )}

        {/* Save toggle — opt-in */}
        <label className="lg-save">
          <input type="checkbox" checked={save} onChange={() => setSave(s => !s)} />
          <span className="lg-save__box"><span className="lg-save__check">✓</span></span>
          <span className="lg-save__txt">Save these details for faster booking next time. <em>Stored on your device only.</em></span>
        </label>

        <p className="lg-foot">
          We'll send the cabin code, directions and Aarav's number to the lead guest. <em>Nothing else, ever.</em>
        </p>
      </div>

      {/* Pinned CTA */}
      <div className="lg-cta-bar">
        <a className="lg-cta" href="EKAM Mobile - Property & Booking.html#confirmed">
          <span className="dot" />
          Hold the cabin · 24 hours
        </a>
        <p className="lg-cta__hint">No payment yet — change anything until checkout.</p>
      </div>

      {/* Contact picker overlay — slides up */}
      {picker && (
        <div className="lg-picker">
          <div className="lg-picker__scrim" onClick={() => setPicker(false)} />
          <div className="lg-picker__sheet">
            <div className="lg-picker__handle" />
            <div className="lg-picker__head">
              <span>Choose a contact</span>
              <button onClick={() => setPicker(false)} aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
              </button>
            </div>
            <div className="lg-picker__search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="6.5"/><path d="M21 21l-4.5-4.5"/></svg>
              <input type="text" placeholder="Search by name" />
            </div>
            <ul className="lg-picker__list">
              {CONTACTS.map(c => (
                <li key={c.id}>
                  <button onClick={() => { setSelectedContact(c); setPicker(false); }}>
                    <span className="lg-picker__avatar">{c.initial}</span>
                    <div>
                      <span className="lg-picker__name">{c.name}</span>
                      <span className="lg-picker__meta">{c.phone}</span>
                    </div>
                    <span className="lg-picker__chev">→</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="lg-picker__note">
              We only read what you pick. Your phone book stays on your phone.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

window.PDP_HeroScreen        = HeroScreen;
window.PDP_IncludedScreen    = IncludedScreen;
window.PDP_ReviewsScreen     = ReviewsScreen;
window.PDP_BookingSheet      = BookingSheetScreen;
window.PDP_GuestPopover      = GuestPopoverScreen;
window.PDP_LeadGuestScreen   = LeadGuestScreen;
window.PDP_ConfirmedScreen   = ConfirmedScreen;
