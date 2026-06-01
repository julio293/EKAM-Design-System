/* global React */
const { useState, useMemo } = React;

const TIERS = {
  kutir:   { dev: 'कुटीर', name: 'KUTIR',   nightly: 6400,  location: 'Chitkul, Sangla',  region: 'Sangla Valley · 2,400 m',
             tagline: 'A stone-floored cabin at the edge of an oak forest.' },
  van:     { dev: 'वन',    name: 'VAN',     nightly: 9200,  location: 'Baspa Valley canopy', region: 'Baspa canopy · 1,900 m',
             tagline: 'Tents woven into the canopy. Living with the land.' },
  shikhar: { dev: 'शिखर',  name: 'SHIKHAR', nightly: 14800, location: 'Kalpa ridgeline',   region: 'Kinnaur ridgeline · 3,200 m',
             tagline: 'You have climbed here. The ridge is yours.' },
};

const ATMOS = {
  kutir:   'linear-gradient(180deg, #14201A 0%, #1F3525 30%, #2B4630 60%, #5a6655 100%)',
  van:     'linear-gradient(170deg, #1a2620 0%, #2B4630 40%, #4a5a44 80%, #6b7a5c 100%)',
  shikhar: 'linear-gradient(180deg, #2a3845 0%, #6e7a82 45%, #b8a48c 80%, #4a4035 100%)',
};

function GuestStepper({ value, onChange, max = 4 }) {
  return (
    <div className="fy-stepper">
      <button className="fy-step" onClick={() => value > 1 && onChange(value - 1)} disabled={value <= 1}>−</button>
      <span className="fy-step-val">{value}</span>
      <button className="fy-step" onClick={() => value < max && onChange(value + 1)} disabled={value >= max}>+</button>
      <span className="fy-step-cap">{value === 1 ? 'You, alone' : `${value} adults`}</span>
    </div>
  );
}

function FindYourEkam({ initialTier='kutir', onClose }) {
  const tier = initialTier === 'any' ? 'kutir' : initialTier;
  const t = TIERS[tier];

  const [arrive, setArrive] = useState('12 March 2026');
  const [depart, setDepart] = useState('19 March 2026');
  const [nights, setNights] = useState(7);
  const [guests, setGuests] = useState(1);
  const [offset, setOffset] = useState(true);
  const [community, setCommunity] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  const subtotal = t.nightly * nights;
  const longStaySaving = nights > 2 ? Math.round((nights - 2) * t.nightly * 0.12) : 0;
  const offsetFee = offset ? 120 * nights : 0;
  const communityFee = community ? Math.round(subtotal * 0.01) : 0;
  const total = subtotal - longStaySaving + offsetFee + communityFee;

  if (confirmed) {
    return (
      <div className="fy-overlay" onClick={onClose}>
        <div className="fy" onClick={(e) => e.stopPropagation()}>
          <button className="fy__close" onClick={onClose}>— Close</button>
          <div className="fy-done">
            <div className="fy-done__dev">एकम्</div>
            <div className="fy-done__rule"></div>
            <h2 className="fy-done__title">Your cabin is waiting.</h2>
            <p className="fy-done__sub">
              {arrive} → {depart}. We will write to you in the next hour with the route, the weather, and the host's name. A letterpress card arrives by post a week before.
            </p>
            <span className="fy-done__ref">Reference · EKM-{Math.floor(Math.random() * 90000 + 10000)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fy-overlay" onClick={onClose}>
      <div className="fy" onClick={(e) => e.stopPropagation()}>
        <button className="fy__close" onClick={onClose}>— Close</button>

        <div className="fy__grid">
          {/* LEFT — cabin context */}
          <div className="fy-ctx">
            <div className="fy-ctx__photo" style={{ background: ATMOS[tier] }}>
              <span className="fy-ctx__bindu"></span>
              <span className="fy-ctx__overlay"></span>
            </div>
            <div className="fy-ctx__body">
              <div className="fy-ctx__eyebrow">EKAM · {t.dev} · {t.name}</div>
              <h3 className="fy-ctx__name">{t.location}</h3>
              <p className="fy-ctx__tagline">{t.tagline}</p>
              <div className="fy-ctx__meta">{t.region}</div>
            </div>
          </div>

          {/* RIGHT — review & reserve */}
          <div className="fy-form">
            <div className="fy__head">
              <span className="fy__eyebrow">— Review &amp; reserve</span>
              <h2 className="fy__title">Almost there.</h2>
              <p className="fy__sub">{nights} nights. The cabin holds for 24 hours after you tap reserve.</p>
            </div>

            {/* When */}
            <div className="fy-row">
              <div>
                <span className="fy-row__lbl">When</span>
                <span className="fy-row__val">{arrive} <span className="fy-row__sep">→</span> {depart}</span>
              </div>
              <button className="fy-row__edit">Change</button>
            </div>

            {/* Nights */}
            <div className="fy-row">
              <div>
                <span className="fy-row__lbl">Nights</span>
                <span className="fy-row__val">{nights}</span>
              </div>
              <div className="fy-stepper-mini">
                <button onClick={() => nights > 2 && setNights(nights - 1)} disabled={nights <= 2}>−</button>
                <button onClick={() => nights < 21 && setNights(nights + 1)} disabled={nights >= 21}>+</button>
              </div>
            </div>

            {/* Guests */}
            <div className="fy-row">
              <div>
                <span className="fy-row__lbl">Guests</span>
              </div>
              <GuestStepper value={guests} onChange={setGuests} />
            </div>

            {/* Add-ons */}
            <div className="fy-toggles">
              <button
                className={`fy-toggle ${offset ? 'on' : ''}`}
                onClick={() => setOffset(!offset)}
              >
                <span className="fy-toggle__check"></span>
                <span className="fy-toggle__body">
                  <span className="fy-toggle__name">Carbon offset</span>
                  <span className="fy-toggle__hint">₹120/night — funds saplings near the cabin you slept in.</span>
                </span>
              </button>
              <button
                className={`fy-toggle ${community ? 'on' : ''}`}
                onClick={() => setCommunity(!community)}
              >
                <span className="fy-toggle__check"></span>
                <span className="fy-toggle__body">
                  <span className="fy-toggle__name">Community share</span>
                  <span className="fy-toggle__hint">1% — the panchayat decides how it's spent.</span>
                </span>
              </button>
            </div>

            {/* Breakdown */}
            <div className="fy-sum">
              <div className="fy-sum__line">
                <span>₹{t.nightly.toLocaleString('en-IN')} × {nights} nights</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {longStaySaving > 0 && (
                <div className="fy-sum__line save">
                  <span>— Long-stay CAC pass-back</span>
                  <span>− ₹{longStaySaving.toLocaleString('en-IN')}</span>
                </div>
              )}
              {offsetFee > 0 && (
                <div className="fy-sum__line sm">
                  <span>Carbon offset</span>
                  <span>₹{offsetFee.toLocaleString('en-IN')}</span>
                </div>
              )}
              {communityFee > 0 && (
                <div className="fy-sum__line sm">
                  <span>Community share · 1%</span>
                  <span>₹{communityFee.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="fy-sum__line total">
                <span>Your stay</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button className="fy-cta" onClick={() => setConfirmed(true)}>
              <span className="fy-cta__dot"></span>
              Reserve · ₹{total.toLocaleString('en-IN')}
            </button>
            <p className="fy-hint">No payment yet. We hold the cabin for 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
window.FindYourEkam = FindYourEkam;
