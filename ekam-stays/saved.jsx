/* global React, S_StatusBar, S_BackBar, S_TierGlyph, S_TabBar, S_Photo */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Stays & Profile · Saved
// A quiet archive of future arrivals. Held shortlist, recently viewed,
// seasonal suggestions, continue exploring — one purpose per card.
// ════════════════════════════════════════════════════════════════
const { useState: useStateSaved } = React;

function SavedScreen({ nav, onTab, saved, onUnsave }) {
  const { SSAVED, SRECENT, SSEASONAL } = window.STAYS;
  const held = SSAVED.filter(c => saved.has(c.id));

  return (
    <div className="sp-screen">
      <S_StatusBar />
      <div className="sp-scroll">
        <div className="sp-body">
          <header className="sp-hd">
            <span className="sp-hd__dev">मन</span>
            <h1 className="sp-hd__title">Saved.</h1>
            <p className="sp-hd__sub">A quiet archive of future arrivals. No prices here — the cabin you choose decides that, one screen on.</p>
          </header>

          {held.length === 0 ? (
            <div className="saved-empty">
              <span className="saved-empty__mark">·</span>
              <p className="saved-empty__line">Nothing held yet.</p>
              <p className="saved-empty__sub">The cabins you keep an eye on gather here, quietly, until the season is right.</p>
              <button className="sp-link" onClick={() => onTab('stays')}>Wander the network</button>
            </div>
          ) : (
            <div className="esc-list">
              {held.map(c => (
                <article className="esc" key={c.id}>
                  <button className="esc__photo-btn" onClick={() => nav.push('saved-detail', { id: c.id })}>
                    <S_Photo mood={c.mood} height={150} scrim={false} />
                  </button>
                  <button
                    className={`esc__hold ${saved.has(c.id) ? 'on' : ''}`}
                    onClick={() => onUnsave(c.id)}
                    aria-label="Release this cabin"
                  >
                    <svg viewBox="0 0 24 24" fill={saved.has(c.id) ? '#B4613A' : 'none'} stroke="#B4613A" strokeWidth="1.4" aria-hidden="true">
                      <path d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" />
                    </svg>
                  </button>
                  <button className="esc__body" onClick={() => nav.push('saved-detail', { id: c.id })}>
                    <div className="esc__top">
                      <S_TierGlyph tier={c.tier} size={22} />
                      <span className="esc__name">{c.name}</span>
                    </div>
                    <span className="esc__region">{c.region}</span>
                    <div className="esc__meta">
                      <div>
                        <span className="esc__meta-lbl">Drive</span>
                        <span className="esc__meta-val">{c.drive}</span>
                      </div>
                      <span className="esc__meta-sep" />
                      <div>
                        <span className="esc__meta-lbl">Season</span>
                        <span className="esc__meta-val">{c.season}</span>
                      </div>
                    </div>
                    <p className="esc__note">{c.note}</p>
                  </button>
                </article>
              ))}
            </div>
          )}

          {/* Recently viewed */}
          <section className="saved-rail-sec">
            <span className="saved-rail-sec__lbl">You were just here</span>
            <div className="saved-rail">
              {SRECENT.map(r => (
                <button className="saved-rail__c" key={r.id} onClick={() => nav.push('saved-detail', { id: r.id })}>
                  <S_Photo mood={r.mood} height={104} scrim={false} />
                  <span className="saved-rail__name">{r.name}</span>
                  <span className="saved-rail__region">{r.region}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Seasonal suggestions */}
          <section className="saved-season">
            <span className="saved-season__lbl">Good this season</span>
            {SSEASONAL.map(s => (
              <button className="season-card" key={s.id} onClick={() => nav.push('saved-detail', { id: s.id })}>
                <S_Photo mood={s.mood} height={70} scrim={false} className="season-card__photo" />
                <div className="season-card__body">
                  <span className="season-card__name">{s.name}</span>
                  <p className="season-card__line">{s.line}</p>
                </div>
              </button>
            ))}
          </section>

          <p className="sp-quiet-foot">Saved is silent. No offers, no countdowns — a cabin you keep for when the week is right.</p>
        </div>
      </div>
      <S_TabBar active="saved" onTab={onTab} />
    </div>
  );
}

// ─── SAVED / CABIN DETAIL (light — leads to the property page) ──
function SavedDetail({ nav, params, saved, onSave }) {
  const { SSAVED, SRECENT, SSEASONAL, SMOOD } = window.STAYS;
  const pool = [...SSAVED, ...SRECENT, ...SSEASONAL];
  const c = pool.find(x => x.id === params.id) || SSAVED[0];
  const isSaved = saved.has(c.id);
  return (
    <div className="sp-screen">
      <S_StatusBar dark />
      <div className="sp-scroll sp-scroll--flush">
        <S_Photo mood={c.mood} height={300} className="cmpl-hero">
          <window.S_BackBar onBack={nav.pop} label="Saved" dark />
          <div className="cmpl-hero__body">
            {c.tier && <span style={{ marginBottom: 10, display: 'inline-block' }}><S_TierGlyph tier={c.tier} size={26} dark /></span>}
            <h1 className="cmpl-hero__name">{c.name}.</h1>
            <span className="cmpl-hero__meta">{c.region}</span>
          </div>
        </S_Photo>
        <div className="sp-body">
          {c.note && <p className="updt-line">{c.note}</p>}
          {(c.drive || c.season) && (
            <div className="cmpl-facts">
              {c.drive && <div><span className="cmpl-facts__lbl">Drive</span><span className="cmpl-facts__val">{c.drive}</span></div>}
              {c.drive && c.season && <span className="cmpl-facts__sep" />}
              {c.season && <div><span className="cmpl-facts__lbl">Season</span><span className="cmpl-facts__val">{c.season}</span></div>}
            </div>
          )}
          <div className="saved-detail__actions">
            <a className="sp-btn" href={`EKAM Mobile - Property & Booking.html?cabin=${c.id}`}>See the cabin</a>
            <button className="sp-link" onClick={() => onSave(c.id)}>{isSaved ? 'Release from saved' : 'Hold this cabin'}</button>
          </div>
          <p className="sp-quiet-foot">The price lives on the cabin's own page, where the decision is being made — never on a card you scroll past.</p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SP_Saved: SavedScreen, SP_SavedDetail: SavedDetail });
