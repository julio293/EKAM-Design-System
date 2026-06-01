/* global React, S_StatusBar, S_Seal, S_TierGlyph, S_Row, S_TabBar, S_Photo */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Stays & Profile · the Profile Home
// "A personal retreat archive" — a quiet hero, the next arrival,
// glimpses of the seals, the shortlist, the introductions, a season.
// ════════════════════════════════════════════════════════════════

function ProfileHome({ nav, onTab }) {
  const { SUSER, SSEASON, SUPCOMING, SCOMPLETED, SSAVED, SINTROS, SNETWORK, SCOUNT } = window.STAYS;
  const visitedSeals = SNETWORK.filter(n => n.visited);
  const arriving = SINTROS.filter(i => i.state === 'arriving').length;
  const stayed = SINTROS.filter(i => i.state === 'stayed').length;

  return (
    <div className="sp-screen">
      <S_StatusBar dark />
      <div className="sp-scroll">

        {/* ── Quiet photographic hero ── */}
        <S_Photo mood={SUPCOMING.mood} height={232} className="prof-hero">
          <div className="prof-hero__top">
            <span className="prof-hero__eb">{SSEASON.tag} · the archive</span>
          </div>
          <div className="prof-hero__id">
            <span className="prof-hero__avatar">{SUSER.initial}</span>
            <div>
              <span className="prof-hero__name">{SUSER.name}.</span>
              <span className="prof-hero__sub">{SUSER.joined}</span>
            </div>
          </div>
        </S_Photo>

        <div className="sp-body">

          {/* ── The next arrival — the one anticipatory card ── */}
          <button className="next-stay" onClick={() => nav.push('stay-upcoming')}>
            <div className="next-stay__head">
              <span className="next-stay__eb">— Your next arrival</span>
              <span className="next-stay__count">{SUPCOMING.daysUntil} days</span>
            </div>
            <div className="next-stay__main">
              <S_TierGlyph tier={SUPCOMING.tier} size={30} />
              <div>
                <span className="next-stay__name">{SUPCOMING.name}.</span>
                <span className="next-stay__meta">{SUPCOMING.region} · {SUPCOMING.dates}</span>
              </div>
            </div>
            <p className="next-stay__line">{SUPCOMING.arrivalLine}</p>
            <span className="next-stay__cta">Open the retreat
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </span>
          </button>

          {/* ── Stays — upcoming + completed ── */}
          <S_Row
            glyph={<span className="sp-row__icon">⌂</span>}
            lbl="Stays"
            val={`One ahead, ${SCOMPLETED.length} behind you.`}
            hint="The road ahead, and the archive of where you've been."
            onClick={() => onTab('stays')}
          />

          {/* ── Mudra glimpse — three seals in a row ── */}
          <div className="prof-glimpse">
            <button className="prof-glimpse__head" onClick={() => onTab('mudra')}>
              <div>
                <span className="prof-glimpse__lbl">Mudra · the seals</span>
                <span className="prof-glimpse__val">{SCOUNT.visited} cabins have left a mark.</span>
              </div>
              <svg className="sp-row__chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
            <div className="prof-glimpse__seals">
              {visitedSeals.map(s => (
                <button key={s.id} className="prof-glimpse__seal" onClick={() => nav.push('mudra-detail', { id: s.id })}>
                  <S_Seal dev={s.dev.charAt(0)} tier={s.tier} size={52} />
                  <span>{s.name}</span>
                </button>
              ))}
              <div className="prof-glimpse__seal prof-glimpse__seal--dim">
                <S_Seal dev="·" size={52} dim />
                <span>{SCOUNT.remaining} to come</span>
              </div>
            </div>
          </div>

          {/* ── Saved preview ── */}
          <div className="prof-glimpse">
            <button className="prof-glimpse__head" onClick={() => onTab('saved')}>
              <div>
                <span className="prof-glimpse__lbl">Saved</span>
                <span className="prof-glimpse__val">{SSAVED.length} cabins, held quietly.</span>
              </div>
              <svg className="sp-row__chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
            <div className="prof-saved-rail">
              {SSAVED.map(c => (
                <button key={c.id} className="prof-saved-rail__c" onClick={() => nav.push('saved-detail', { id: c.id })}>
                  <S_Photo mood={c.mood} height={92} scrim={false} />
                  <span className="prof-saved-rail__name">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Introductions preview ── */}
          <S_Row
            glyph={<span className="sp-row__icon">✎</span>}
            lbl="Introductions"
            val={`${arriving} arriving, ${stayed} stayed.`}
            hint="A note from you, a held cabin for them."
            onClick={() => onTab('intros')}
          />

          {/* ── Seasonal note — editorial ── */}
          <div className="prof-season">
            <span className="prof-season__eb">— {SSEASON.tag}, in the hills</span>
            <p className="prof-season__line">{SSEASON.line}</p>
          </div>

          {/* ── Preferences ── */}
          <S_Row
            lbl="What we know of you"
            val="A slow reset · two of you · 2,400–3,400 m"
            hint="The questions from when you joined. Change them anytime."
            onClick={() => nav.push('preferences')}
          />

          {/* ── Foot ── */}
          <div className="prof-foot">
            <button onClick={() => nav.push('signout')}>Sign out</button>
            <button onClick={() => nav.push('help')}>Help</button>
          </div>

        </div>
      </div>
      <S_TabBar active="profile" onTab={onTab} />
    </div>
  );
}

// ─── Preferences (the onboarding answers, editable) ──────────
function PreferencesScreen({ nav }) {
  const { SPREFS } = window.STAYS;
  return (
    <div className="sp-screen">
      <S_StatusBar />
      <window.S_BackBar onBack={nav.pop} label="You" />
      <div className="sp-scroll">
        <div className="sp-body">
          <header className="sp-hd">
            <span className="sp-hd__dev">आप</span>
            <h1 className="sp-hd__title">What we know of you.</h1>
            <p className="sp-hd__sub">The six answers from when you joined. They shape what we show you — change them whenever the season in you changes.</p>
          </header>

          <ul className="pref-list">
            {SPREFS.map((p, i) => (
              <li className="pref-row" key={i}>
                <div>
                  <span className="pref-row__lbl">{p.lbl}</span>
                  <span className="pref-row__val">{p.val}</span>
                  <span className="pref-row__hint">{p.hint}</span>
                </div>
                <button className="pref-row__edit">Change</button>
              </li>
            ))}
          </ul>

          <p className="sp-quiet-foot">Nothing here is shared. It lives on your device and shapes only what the app shows you.</p>
        </div>
      </div>
    </div>
  );
}

// ─── A small generic confirm screen (Sign out / Help) ────────
function PlainScreen({ nav, kind }) {
  const copy = kind === 'signout'
    ? { dev: 'विदा', title: 'Leave the cabin?', sub: 'You can sign back in whenever you like. Your stays, seals, and saved cabins will be here.', primary: 'Sign out', secondary: 'Stay signed in' }
    : { dev: 'सहायता', title: 'A quiet word.', sub: 'Most questions are answered fastest by the host who knows your cabin. Reach us, and a person — not a bot — will reply.', primary: 'Write to your host', secondary: 'Back' };
  return (
    <div className="sp-screen">
      <S_StatusBar />
      <window.S_BackBar onBack={nav.pop} label="You" />
      <div className="sp-scroll">
        <div className="sp-body sp-body--center">
          <div className="plain">
            <span className="plain__dev">{copy.dev}</span>
            <h1 className="plain__title">{copy.title}</h1>
            <p className="plain__sub">{copy.sub}</p>
            <div className="plain__actions">
              <button className="sp-btn" onClick={nav.pop}>{copy.primary}</button>
              <button className="sp-link" onClick={nav.pop}>{copy.secondary}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SP_ProfileHome: ProfileHome, SP_Preferences: PreferencesScreen, SP_Plain: PlainScreen });
