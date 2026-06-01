/* global React, S_StatusBar, S_BackBar, S_Seal, S_TabBar */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Stays & Profile · Mudra
// The seals. A quiet map of the network (visited vs remaining),
// a journal page mirroring the posted book, and one seal in full.
// ════════════════════════════════════════════════════════════════
const { useState: useStateMudra } = React;

function MudraScreen({ nav, onTab }) {
  const { SNETWORK, SCOUNT } = window.STAYS;
  const [view, setView] = useStateMudra('map');

  return (
    <div className="sp-screen">
      <S_StatusBar />
      <div className="sp-scroll">
        <div className="sp-body">
          <header className="sp-hd">
            <span className="sp-hd__dev">मुद्रा</span>
            <h1 className="sp-hd__title">Your seals.</h1>
            <p className="sp-hd__sub">{SCOUNT.visited} cabins have left a mark. {SCOUNT.remaining} more remain. A wax seal arrives by post after each stay; this is its mirror.</p>
          </header>

          <div className="seg">
            <button className={view === 'map' ? 'on' : ''} onClick={() => setView('map')}>The map</button>
            <button className={view === 'journal' ? 'on' : ''} onClick={() => setView('journal')}>The journal</button>
          </div>

          {view === 'map' && (
            <div className="mudra-map">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', aspectRatio: '1/1', display: 'block' }}>
                <path d="M14 14 L 86 12 L 90 30 L 86 48 L 78 58 L 60 64 L 44 60 L 24 56 L 14 42 Z" fill="#F1ECDE" stroke="#D8D3C4" strokeWidth="0.3" />
                <path d="M16 28 Q 36 22, 56 30 T 88 24" stroke="#E1D9C0" strokeWidth="0.35" fill="none" />
                <path d="M14 40 Q 32 36, 50 42 T 88 36" stroke="#E1D9C0" strokeWidth="0.35" fill="none" />
                <path d="M14 50 Q 30 47, 48 52 T 88 46" stroke="#E1D9C0" strokeWidth="0.35" fill="none" />
                {SNETWORK.map(n => (
                  <g key={n.id} style={{ cursor: n.visited ? 'pointer' : 'default' }} onClick={n.visited ? () => nav.push('mudra-detail', { id: n.id }) : undefined}>
                    {n.visited ? (
                      <>
                        <circle cx={n.x} cy={n.y} r={3.6} fill="transparent" />
                        <circle cx={n.x} cy={n.y} r={1.6} fill="#B4613A" />
                        <circle cx={n.x} cy={n.y} r={3.2} fill="none" stroke="#B4613A" strokeWidth="0.3" opacity="0.4" />
                      </>
                    ) : (
                      <circle cx={n.x} cy={n.y} r={1.4} fill="none" stroke="#7A8A6B" strokeWidth="0.4" opacity="0.7" />
                    )}
                  </g>
                ))}
              </svg>
              <div className="mudra-legend">
                <span><span className="dot dot--filled" /> Visited · {SCOUNT.visited}</span>
                <span><span className="dot dot--outline" /> Remaining · {SCOUNT.remaining}</span>
              </div>
              <p className="mudra-map__hint">Tap a clay mark to open the stay it remembers.</p>
            </div>
          )}

          {view === 'journal' && <MudraJournal nav={nav} />}

          <p className="mudra-foot">A mudra arrives in your post after each stay. Volume II opens after your fourth.</p>
        </div>
      </div>
      <S_TabBar active="mudra" onTab={onTab} />
    </div>
  );
}

function MudraJournal({ nav }) {
  const { SNETWORK } = window.STAYS;
  return (
    <div className="journal">
      <div className="journal__page">
        <div className="journal__head">
          <span className="journal__vol">Volume I</span>
          <span className="journal__sub">Three nights, three seals.</span>
        </div>
        <div className="journal__grid">
          {SNETWORK.map(n => (
            <button
              className={`journal__cell ${n.visited ? 'on' : ''}`}
              key={n.id}
              onClick={n.visited ? () => nav.push('mudra-detail', { id: n.id }) : undefined}
              disabled={!n.visited}
            >
              <S_Seal dev={n.dev.charAt(0)} tier={n.tier} size={44} dim={!n.visited} />
              <span className="journal__name">{n.name}</span>
              {n.visited && <span className="journal__when">{n.visitedAt}</span>}
            </button>
          ))}
        </div>
        <div className="journal__foot">
          <span>Volume II opens after your fourth stay.</span>
        </div>
      </div>
    </div>
  );
}

// ─── MUDRA DETAIL (one seal, full presence) ──────────────────
function MudraDetail({ nav, params }) {
  const { SNETWORK } = window.STAYS;
  const m = SNETWORK.find(n => n.id === params.id && n.visited) || SNETWORK.find(n => n.visited);
  return (
    <div className="sp-screen">
      <S_StatusBar />
      <window.S_BackBar onBack={nav.pop} label="Mudra" />
      <div className="sp-scroll">
        <div className="sp-body sp-body--center">
          <div className="md-stage">
            <div className="md-seal"><S_Seal dev={m.dev} tier={m.tier} size={132} /></div>
            <span className="md-eb">{m.dev} · {m.tier}</span>
            <h1 className="md-name">{m.name}.</h1>
            <span className="md-region">{m.region} · Cabin No. {m.cabinNo}</span>

            <div className="md-meta">
              <div><span className="md-meta-lbl">Stayed</span><span className="md-meta-val">{m.visitedAt}</span></div>
              <span className="md-meta-sep" />
              <div><span className="md-meta-lbl">With</span><span className="md-meta-val">{m.host}</span></div>
              <span className="md-meta-sep" />
              <div><span className="md-meta-lbl">When</span><span className="md-meta-val">{m.season}</span></div>
            </div>

            <div className="md-line">
              <span className="md-line-lbl">— A line you wrote</span>
              <p className="md-line-val">The monal landed on the deck on day three. {m.host} left a hand-drawn trail map under the cup.</p>
            </div>

            <span className="md-foot">A wax copy of this mudra was posted to you after the stay. It lives in Volume I of your journal.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SP_Mudra: MudraScreen, SP_MudraDetail: MudraDetail });
