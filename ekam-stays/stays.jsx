/* global React, S_StatusBar, S_BackBar, S_TierGlyph, S_Seal, S_TabBar, S_Photo */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Stays & Profile · Stays
// The Stays list (Upcoming · Completed) + an upcoming retreat detail
// (countdown, dates, travel, check-in) + a completed retreat (journal).
// ════════════════════════════════════════════════════════════════
const { useState: useStateStays } = React;

// ─── STAYS LIST ──────────────────────────────────────────────
function StaysList({ nav, onTab }) {
  const { SUPCOMING, SCOMPLETED } = window.STAYS;
  const [seg, setSeg] = useStateStays('upcoming');

  return (
    <div className="sp-screen">
      <S_StatusBar />
      <div className="sp-scroll">
        <div className="sp-body">
          <header className="sp-hd">
            <span className="sp-hd__dev">यात्रा</span>
            <h1 className="sp-hd__title">Stays.</h1>
            <p className="sp-hd__sub">The road ahead, and the archive of where you've been.</p>
          </header>

          <div className="seg">
            <button className={seg === 'upcoming' ? 'on' : ''} onClick={() => setSeg('upcoming')}>The road ahead</button>
            <button className={seg === 'completed' ? 'on' : ''} onClick={() => setSeg('completed')}>Behind you</button>
          </div>

          {seg === 'upcoming' && (
            <div className="stays-up">
              <button className="up-card" onClick={() => nav.push('stay-upcoming')}>
                <S_Photo mood={SUPCOMING.mood} height={180}>
                  <span className="up-card__count">{SUPCOMING.daysUntil} days</span>
                  <div className="up-card__cap">
                    <S_TierGlyph tier={SUPCOMING.tier} size={26} dark />
                    <div>
                      <span className="up-card__name">{SUPCOMING.name}.</span>
                      <span className="up-card__meta">{SUPCOMING.region}</span>
                    </div>
                  </div>
                </S_Photo>
                <div className="up-card__foot">
                  <span><b>{SUPCOMING.dates}</b> · {SUPCOMING.nights} nights</span>
                  <span className="up-card__open">Open
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
                  </span>
                </div>
              </button>
              <p className="stays-empty-note">When this stay is behind you, it moves into the archive — with the line you write afterward and the seal that arrives by post.</p>
            </div>
          )}

          {seg === 'completed' && (
            <div className="stays-archive">
              <span className="stays-archive__lead">Three nights, in three valleys.</span>
              {SCOMPLETED.map((s, i) => (
                <button className="arch-card" key={s.id} onClick={() => nav.push('stay-completed', { id: s.id })}>
                  <S_Photo mood={s.mood} height={64} className="arch-card__photo" scrim={false} />
                  <div className="arch-card__body">
                    <div className="arch-card__top">
                      <S_TierGlyph tier={s.tier} size={20} />
                      <span className="arch-card__name">{s.name}</span>
                      <span className="arch-card__when">{s.when}</span>
                    </div>
                    <span className="arch-card__season">{s.season} · with {s.host}</span>
                  </div>
                </button>
              ))}
              <p className="stays-empty-note">Each completed stay holds the seal you were sent, the host who kept it, and a line in your own hand.</p>
            </div>
          )}

        </div>
      </div>
      <S_TabBar active="stays" onTab={onTab} />
    </div>
  );
}

// ─── UPCOMING RETREAT DETAIL ─────────────────────────────────
function StayUpcoming({ nav }) {
  const { SUPCOMING } = window.STAYS;
  const u = SUPCOMING;
  return (
    <div className="sp-screen">
      <S_StatusBar dark />
      <div className="sp-scroll sp-scroll--flush">
        {/* Hero */}
        <S_Photo mood={u.mood} height={300} className="updt-hero">
          <window.S_BackBar onBack={nav.pop} label="Stays" dark />
          <div className="updt-hero__body">
            <span className="updt-hero__count">{u.daysUntil} days until you arrive</span>
            <h1 className="updt-hero__name">{u.name}.</h1>
            <span className="updt-hero__meta">{u.region} · {u.elevation} · Cabin No. {u.cabinNo}</span>
          </div>
        </S_Photo>

        <div className="sp-body">
          {/* Dates + the line */}
          <div className="updt-dates">
            <div>
              <span className="updt-dates__lbl">Your nights</span>
              <span className="updt-dates__val">{u.dates}</span>
            </div>
            <span className="updt-dates__sep" />
            <div>
              <span className="updt-dates__lbl">With</span>
              <span className="updt-dates__val">{u.host}, your host</span>
            </div>
          </div>
          <p className="updt-line">{u.arrivalLine}</p>

          {/* Weather preview */}
          <div className="updt-weather">
            <div className="updt-weather__head">
              <span className="updt-weather__lbl">— The week you arrive</span>
              <span className="updt-weather__temp">{u.weather.temp}</span>
            </div>
            <span className="updt-weather__sky">{u.weather.sky}</span>
            <p className="updt-weather__note">{u.weather.note}</p>
          </div>

          {/* Travel / road guidance */}
          <section className="updt-sec">
            <span className="updt-sec__lbl">Getting there</span>
            <ul className="updt-steps">
              {u.travel.map((t, i) => (
                <li key={i}>
                  <span className="updt-steps__n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <span className="updt-steps__lbl">{t.lbl}</span>
                    <span className="updt-steps__val">{t.val}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Check-in */}
          <section className="updt-sec">
            <span className="updt-sec__lbl">Arriving at the cabin</span>
            <ul className="updt-checkin">
              {u.checkin.map((c, i) => (
                <li key={i}>
                  <span className="updt-checkin__lbl">{c.lbl}</span>
                  <span className="updt-checkin__val">{c.val}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Companion CTA */}
          <a className="updt-companion" href="EKAM Mobile - Companion.html">
            <div>
              <span className="updt-companion__lbl">The Retreat Companion</span>
              <span className="updt-companion__sub">Opens for you the morning you arrive — the stove, the kettle, the trail, the host.</span>
            </div>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </a>

          <p className="sp-quiet-foot">We'll send your directions and the gate location three days before you leave. Nothing before then — there's nothing to do but arrive.</p>
        </div>
      </div>
    </div>
  );
}

// ─── COMPLETED RETREAT DETAIL (journal-like) ─────────────────
function StayCompleted({ nav, params }) {
  const { SCOMPLETED } = window.STAYS;
  const s = SCOMPLETED.find(c => c.id === params.id) || SCOMPLETED[0];
  return (
    <div className="sp-screen">
      <S_StatusBar dark />
      <div className="sp-scroll sp-scroll--flush">
        <S_Photo mood={s.mood} height={240} className="cmpl-hero">
          <window.S_BackBar onBack={nav.pop} label="Stays" dark />
          <div className="cmpl-hero__body">
            <span className="cmpl-hero__when">{s.when} · {s.nights} nights</span>
            <h1 className="cmpl-hero__name">{s.name}.</h1>
            <span className="cmpl-hero__meta">{s.region} · Cabin No. {s.cabinNo}</span>
          </div>
        </S_Photo>

        <div className="sp-body">
          <div className="cmpl-facts">
            <div>
              <span className="cmpl-facts__lbl">The season</span>
              <span className="cmpl-facts__val">{s.season}</span>
            </div>
            <span className="cmpl-facts__sep" />
            <div>
              <span className="cmpl-facts__lbl">Your host</span>
              <span className="cmpl-facts__val">{s.host}</span>
            </div>
          </div>

          {/* The line you wrote */}
          <div className="cmpl-note">
            <span className="cmpl-note__lbl">— A line you wrote afterward</span>
            <p className="cmpl-note__val">{s.note}</p>
          </div>

          {/* The seal it left */}
          <button className="cmpl-seal" onClick={() => nav.push('mudra-detail', { id: s.id })}>
            <S_Seal dev={s.dev.charAt(0)} tier={s.tier} size={64} />
            <div>
              <span className="cmpl-seal__lbl">The seal this stay left</span>
              <span className="cmpl-seal__val">Mudra · Cabin No. {s.cabinNo} · open the mark</span>
            </div>
            <svg className="sp-row__chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>

          <p className="sp-quiet-foot">{s.posted}</p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SP_StaysList: StaysList, SP_StayUpcoming: StayUpcoming, SP_StayCompleted: StayCompleted });
