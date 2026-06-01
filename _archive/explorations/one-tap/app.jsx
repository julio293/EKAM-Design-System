/* global React, ReactDOM */
const { useState, useMemo } = React;

// ============================================================
// Pricing model — vary by weekday/weekend; surface "best value"
// ============================================================

function dailyPrice(date) {
  const d = date.getDay();
  // Mon–Tue: best value (₹5,800) — flagged separately
  if (d === 1 || d === 2) return 5800;
  // Wed–Thu: regular weekday
  if (d === 3 || d === 4) return 6400;
  // Sun: shoulder
  if (d === 0) return 7400;
  // Fri/Sat: weekend
  return 8400;
}
function isBestValue(date) {
  const p = dailyPrice(date);
  return p === 5800;
}

// CAC pass-back: discount on nights beyond 2
function computeStay(start, nights) {
  if (!start) return { gross: 0, save: 0, net: 0, breakdown: [] };
  const breakdown = [];
  let gross = 0;
  for (let i = 0; i < nights; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const p = dailyPrice(d);
    breakdown.push({ date: d, price: p });
    gross += p;
  }
  // Tier: 2 nights = 0%, 3 nights = 8%, 5 = 12%, 7+ = 15%
  let rate = 0;
  if (nights >= 7) rate = 0.15;
  else if (nights >= 5) rate = 0.12;
  else if (nights >= 3) rate = 0.08;
  // Discount applied to nights *beyond* the second
  const eligible = breakdown.slice(2).reduce((s, x) => s + x.price, 0);
  const save = Math.round(eligible * rate);
  return { gross, save, net: gross - save, breakdown, rate };
}

// ============================================================
// LANDING
// ============================================================

function Landing({ onBegin }) {
  return (
    <div className="landing">
      <div className="landing__bg" />
      <div className="landing__ridges">
        <svg viewBox="0 0 1600 480" preserveAspectRatio="none">
          <path d="M 0 360 L 100 320 L 200 340 L 320 280 L 440 310 L 560 270 L 680 300 L 820 250 L 960 290 L 1080 240 L 1200 270 L 1340 250 L 1480 280 L 1600 260 L 1600 480 L 0 480 Z" fill="#1f3525" opacity="0.5"/>
          <path d="M 0 400 L 120 380 L 240 395 L 360 360 L 480 380 L 600 350 L 720 370 L 860 340 L 980 360 L 1100 335 L 1240 355 L 1380 340 L 1520 360 L 1600 350 L 1600 480 L 0 480 Z" fill="#2B4630" opacity="0.7"/>
          <path d="M 0 440 L 160 425 L 320 435 L 480 415 L 640 425 L 800 410 L 960 425 L 1120 415 L 1280 430 L 1440 420 L 1600 435 L 1600 480 L 0 480 Z" fill="#14201A"/>
        </svg>
      </div>
      <div className="landing__light"></div>

      <header className="top top--dark">
        <a href="#" className="top__brand"><svg><use href="#wm-dark" /></svg></a>
        <span className="top__meta">एकम् · The Singular</span>
      </header>

      <div className="landing__center">
        <div className="landing__dev">एकम्</div>
        <div className="landing__mark"><svg viewBox="0 0 600 200"><use href="#wm-hero" /></svg></div>
        <div className="landing__rule"></div>
        <p className="landing__line">Hospitality, <em>disguised</em> as solitude.</p>
        <button className="landing__cta" onClick={onBegin}>
          <span className="dot"></span>
          Find your Ekam
        </button>
      </div>

      <div className="landing__foot">
        <span>Off-grid</span>
        <span className="pipe">·</span>
        <span>Western Himalaya</span>
        <span className="pipe">·</span>
        <span>Two-night minimum</span>
      </div>
    </div>
  );
}

// ============================================================
// CALENDAR — month grid with daily prices
// ============================================================

const MONTH_LABEL = (d) => d.toLocaleString('en-IN', { month: 'long', year: 'numeric' });

function PriceCalendar({ arrive, nights, onPickArrive, monthOffset, onShift }) {
  const today = new Date('2026-03-01');
  const base = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const monthStart = new Date(base.getFullYear(), base.getMonth(), 1);
  const monthEnd = new Date(base.getFullYear(), base.getMonth() + 1, 0);
  const daysInMonth = monthEnd.getDate();
  // Week starts Monday
  const firstWeekday = (monthStart.getDay() + 6) % 7;

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(base.getFullYear(), base.getMonth(), d));
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const rangeEnd = arrive ? new Date(arrive.getTime() + (nights - 1) * 86400000) : null;
  const inRange = (d) => arrive && d && d >= arrive && d <= rangeEnd;
  const isArrive = (d) => arrive && d && d.getTime() === arrive.getTime();
  const isDepart = (d) => rangeEnd && d && d.getTime() === rangeEnd.getTime();

  return (
    <div className="cal">
      <div className="cal__head">
        <button className="cal__nav" onClick={() => onShift(-1)} aria-label="Previous month">←</button>
        <span className="cal__month">{MONTH_LABEL(base)}</span>
        <button className="cal__nav" onClick={() => onShift(1)} aria-label="Next month">→</button>
      </div>
      <div className="cal__weekdays">
        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(w => <span key={w}>{w}</span>)}
      </div>
      <div className="cal__grid">
        {cells.map((d, i) => {
          if (!d) return <div key={i} className="cal__empty" />;
          const p = dailyPrice(d);
          const best = isBestValue(d);
          const ar = isArrive(d);
          const de = isDepart(d);
          const mid = inRange(d) && !ar && !de;
          return (
            <button
              key={i}
              className={`cal__cell ${best ? 'is-best' : ''} ${ar ? 'is-arrive' : ''} ${de ? 'is-depart' : ''} ${mid ? 'is-mid' : ''}`}
              onClick={() => onPickArrive(d)}
            >
              <span className="cal__day">{d.getDate()}</span>
              <span className="cal__price">₹{(p/100).toFixed(0)}</span>
            </button>
          );
        })}
      </div>
      <div className="cal__legend">
        <span><i className="lg-dot lg-best"></i>Best value · weekdays</span>
        <span><i className="lg-dot lg-sel"></i>Your stay</span>
      </div>
    </div>
  );
}

// ============================================================
// STAY LENGTH — Google Flights "longer stay" hint
// ============================================================

function StayLength({ arrive, nights, onPickNights }) {
  const options = [2, 3, 5, 7];
  const stays = options.map(n => ({ n, ...computeStay(arrive, n) }));
  const cheapest = Math.min(...stays.filter(s => s.save > 0).map(s => s.net / s.n));
  return (
    <div className="stay">
      <div className="stay__head">
        <span className="stay__lbl">— Length of stay</span>
        <span className="stay__hint">Longer stays return what we save on finding new guests.</span>
      </div>
      <div className="stay__rows">
        {stays.map(s => {
          const perNight = Math.round(s.net / s.n);
          const isCheapestPerNight = arrive && perNight === Math.round(cheapest);
          return (
            <button
              key={s.n}
              className={`stay__row ${s.n === nights ? 'on' : ''} ${isCheapestPerNight ? 'is-deal' : ''}`}
              onClick={() => onPickNights(s.n)}
              disabled={!arrive}
            >
              <span className="stay__n">
                <span className="stay__nights">{s.n} nights</span>
                {s.rate > 0 && <span className="stay__saver">— {Math.round(s.rate * 100)}% on extra nights</span>}
              </span>
              <span className="stay__money">
                {arrive ? (
                  <React.Fragment>
                    <span className="stay__total">₹{s.net.toLocaleString('en-IN')}</span>
                    {s.save > 0 && <span className="stay__save">— save ₹{s.save.toLocaleString('en-IN')}</span>}
                  </React.Fragment>
                ) : (
                  <span className="stay__placeholder">pick a date first</span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// GUEST DOTS
// ============================================================

function GuestDots({ value, onChange }) {
  return (
    <div className="guest-dots" role="radiogroup" aria-label="Party size">
      {[1, 2, 3, 4].map((n) => (
        <button
          key={n}
          className={`gd ${n === value ? 'is-on' : ''} ${n <= value ? 'is-filled' : ''}`}
          onClick={() => onChange(n)}
          role="radio"
          aria-checked={n === value}
          aria-label={`${n} guest${n === 1 ? '' : 's'}`}
        >
          <span className="gd__dot"></span>
          <span className="gd__num">{n}</span>
        </button>
      ))}
    </div>
  );
}

// ============================================================
// BOOKING
// ============================================================

function Booking({ onClose, onConfirm }) {
  const [monthOffset, setMonthOffset] = useState(0);
  const [arrive, setArrive] = useState(new Date('2026-03-16'));
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(2);

  const stay = useMemo(() => computeStay(arrive, nights), [arrive, nights]);

  const partyLabel = guests === 1 ? 'You, alone.'
    : guests === 2 ? 'Two adults.'
    : guests === 3 ? 'Three adults.'
    : 'Four adults.';

  const partyNote = guests <= 2
    ? 'Most cabins hold two. Stone floor, one bed, one window.'
    : 'A forest cabin with elevated platforms. We will place you well.';

  return (
    <div className="booking is-active">
      <header className="top top--light booking__top">
        <a href="#" className="top__brand"><svg><use href="#wm-light" /></svg></a>
        <button className="top__close" onClick={onClose}>← Begin again</button>
      </header>

      <div className="booking__body">
        <div className="booking__inner">
          <div className="booking__eyebrow">— एकम् · the one</div>
          <h1 className="booking__title">When, and how many.</h1>
          <p className="booking__sub">
            The cabin is ours to choose. Prices breathe with the season — and lengthen with the stay.
          </p>

          {/* WHEN — calendar + stay length */}
          <section className="panel">
            <div className="panel__head">
              <span className="panel__lbl">— When</span>
              {arrive && (
                <span className="panel__detail">
                  {arrive.toLocaleString('en-IN', { day: 'numeric', month: 'short' })}
                  &nbsp;→&nbsp;
                  {new Date(arrive.getTime() + nights * 86400000).toLocaleString('en-IN', { day: 'numeric', month: 'short' })}
                  · {nights} nights
                </span>
              )}
            </div>
            <div className="when-grid">
              <PriceCalendar
                arrive={arrive}
                nights={nights}
                onPickArrive={(d) => setArrive(d)}
                monthOffset={monthOffset}
                onShift={(delta) => setMonthOffset(monthOffset + delta)}
              />
              <StayLength
                arrive={arrive}
                nights={nights}
                onPickNights={setNights}
              />
            </div>
          </section>

          {/* WHO */}
          <section className="panel">
            <div className="panel__head">
              <span className="panel__lbl">— Who</span>
              <span className="panel__detail">{partyLabel}</span>
            </div>
            <div className="who-row">
              <GuestDots value={guests} onChange={setGuests} />
              <p className="who__note">{partyNote}</p>
            </div>
          </section>

          {/* SUMMARY + CTA */}
          <div className="submit">
            {arrive && stay.save > 0 && (
              <div className="submit__save">
                — You save <strong>₹{stay.save.toLocaleString('en-IN')}</strong> on this {nights}-night stay. The math is on the receipt.
              </div>
            )}
            <p className="submit__line">
              <strong>{nights} nights</strong> from <strong>{arrive ? arrive.toLocaleString('en-IN', { day: 'numeric', month: 'long' }) : '—'}</strong>
              {' · '}
              <strong>₹{stay.net.toLocaleString('en-IN')}</strong>
            </p>
            <button className="submit__cta" onClick={() => onConfirm({ arrive, nights, guests, stay })}>
              <span className="dot"></span>
              Reserve
            </button>
            <p className="submit__hold">We hold the cabin for 24 hours. No payment yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DONE
// ============================================================

function Done({ on, arrive, nights, stay }) {
  const ref = useMemo(() => 'EKM-' + Math.floor(Math.random() * 90000 + 10000), [on]);
  if (!arrive) return <div className="done" />;
  return (
    <div className={`done ${on ? 'on' : ''}`}>
      <div className="done__dev">एकम्</div>
      <div className="done__rule"></div>
      <h2 className="done__title">Your cabin is waiting.</h2>
      <p className="done__sub">
        {nights} nights from {arrive.toLocaleString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}.
        {stay && stay.save > 0 && <> The ₹{stay.save.toLocaleString('en-IN')} you saved is on the receipt.</>}
        {' '}A letterpress card arrives by post a week before.
      </p>
      <span className="done__ref">Reference · {ref}</span>
    </div>
  );
}

// ============================================================
// APP
// ============================================================

function App() {
  const [stage, setStage] = useState('landing');
  const [reservation, setReservation] = useState(null);

  return (
    <div className="app">
      {stage === 'landing'
        ? <Landing onBegin={() => setStage('booking')} />
        : <Booking
            onClose={() => setStage('landing')}
            onConfirm={(r) => { setReservation(r); setStage('done'); }}
          />
      }
      <Done on={stage === 'done'} {...(reservation || {})} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
