/* global React, ReactDOM */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Home & Discovery · main app
// ════════════════════════════════════════════════════════════════
const { useState } = React;

// ─── Strategic notes — per active screen ────────────────────────
const SCREEN_NOTES = {
  home: {
    step: 'Home',
    h: 'An editorial feed, not a marketplace grid.',
    sub: 'Greet, surface the upcoming stay, then five small invitations.',
    rationale: [
    { l: 'Greeting', v: <>Caveat hand · <em>"Good morning, Anika"</em>. A named greeting in present tense. Never <em>"Hi user"</em>.</> },
    { l: 'Weather strip', v: <>Two pills. Live conditions in the network — not the user's city. <em>Foggy in Kumaon · First snow at Munsiyari.</em></> },
    { l: 'Upcoming trip', v: <>Hero card if a stay is within 30 days. Mood gradient + countdown + tap-through to the Companion. <em>One per home.</em></> },
    { l: 'Rails', v: <>Three to five collections, each a written sentence. Cards live on a hairline, no shadow. Horizontal scroll, max 4 cards visible.</> },
    { l: 'Editorial band', v: <>Full-bleed forest section every third unit. Breaks the rhythm. A field note from a specific valley.</> },
    { l: 'Recently viewed', v: <>Square thumbnails, half the height. Surfaces without claiming attention.</> },
    { l: 'Five-letter rule', v: <>No streak nudge, no "complete your profile," no daily push. The home only updates with real news.</> }]

  },
  discover: {
    step: 'Discover',
    h: 'A map that knows the cabins by name.',
    sub: 'Pin first, list second. Filters are a soft sheet, not a wall.',
    rationale: [
    { l: 'Search bar', v: <>One line: <em>"Where, when, why"</em>. Replaces three Airbnb fields with intent. Tap opens the structured sheet.</> },
    { l: 'Filter chips', v: <>Tier (Kutir/Van/Shikhar) + season + party flags. Devanagari tucked inside each chip — never as a substitute label.</> },
    { l: 'The map', v: <>SVG topographic illustration, not a Google tile. The bindu pins are the only saturated colour on the cream paper.</> },
    { l: 'Active pin', v: <>Grows 40 %, gains a clay halo, drops an ink tooltip. <strong>One pin active at a time.</strong></> },
    { l: 'Bottom sheet', v: <>Always visible, half-height. Scroll up to expand. Tap a row to focus its pin. Tap the pin to focus the row.</> },
    { l: 'List ↔ Map toggle', v: <>Small inline toggle inside the sheet header. Map is the default for the network's geographic identity.</> }]

  },
  filters: {
    step: 'Filters',
    h: 'A sheet, not a separate screen.',
    sub: 'Closes on completion. The match count updates as you choose.',
    rationale: [
    { l: 'Tier', v: <>The three brand glyphs in chip form. Multi-select. <em>The most important filter.</em></> },
    { l: 'Elevation', v: <>Dual-handle slider. Mountains are sorted by altitude in the brand mind — so this is the second filter, not last.</> },
    { l: 'Drive time', v: <>From Delhi or Chandigarh. India-context. Not <em>"distance"</em>, not <em>"travel time"</em> — drive time.</> },
    { l: 'Flexible dates', v: <>Five mood options, not a calendar. The calendar appears on the property page, not in filters.</> },
    { l: 'Suitability', v: <>Two toggles with editorial sub-lines. <em>Pet-friendly</em> moves to the per-property listing form — kept off this screen on purpose.</> },
    { l: 'CTA', v: <>"<em>Show 7 cabins</em>" — verbose count, no jargon. No "Apply." The button does the work.</> }]

  },
  saved: {
    step: 'Saved',
    h: 'Wishlist, renamed.',
    sub: 'A held shortlist of future states of mind.',
    rationale: [
    { l: 'Title', v: <><strong>Saved Escapes</strong>, not <em>Wishlist</em>. A wishlist is for buying. An escape is for going.</> },
    { l: 'Empty state', v: <>Devanagari मन + a one-line editorial copy. Never <em>"You haven't saved anything yet."</em></> },
    { l: 'Row format', v: <>Photo + tier + region + price. The heart stays clay; tap to unsave with a quiet 60ms dim.</> },
    { l: 'No folders', v: <>One list. Folders are friction. The list rarely exceeds 6 items in this category.</> }]

  },
  trips: {
    step: 'Stay',
    h: 'Mode-switching label.',
    sub: 'Reads "Stay" when a trip is active, "Trips" otherwise.',
    rationale: [
    { l: 'Label', v: <>Active stay → <em>Stay</em>. No active stay → <em>Trips</em>. The tab title carries the state.</> },
    { l: 'Companion mode', v: <>Opens the in-cabin tablet's mobile twin: today's weather, programs, the cabin's services, the host's number.</> },
    { l: 'Past trips', v: <>Below upcoming. Each is a single-line letter from the host with two photographs. No reviews. No re-book button.</> }]

  },
  profile: {
    step: 'Profile',
    h: 'A house, not a dashboard.',
    sub: 'Preferences, member benefits, payment, language.',
    rationale: [
    { l: 'Memberships', v: <>EKAM Circle. Three nights / year unlocks the field journal subscription. <em>One tier, not five.</em></> },
    { l: 'Preferences', v: <>Edits the onboarding answers. Intent, party, elevation, season — same screen, no separate edit modes.</> },
    { l: 'Refer a friend', v: <>A postcard you write. Not a code. The friend receives a Caveat-hand letter from you with the link.</> },
    { l: 'Logout', v: <>One tap. No "Are you sure?" — the cabin will still be there.</> }]

  }
};

// ─── Phone ─────────────────────────────────────────────────────
function Phone({ activeTab, setActiveTab, saved, toggleSave, filtersOpen, setFiltersOpen, filterChip, setFilterChip, filters, setFilters }) {
  return (
    <div className="phone">
      <div className="phone__screen">
        {activeTab === 'home' &&
        <window.HomeScreen saved={saved} toggleSave={toggleSave} tab={activeTab} onTab={setActiveTab} />
        }
        {activeTab === 'discover' &&
        <window.DiscoverScreen
          saved={saved} toggleSave={toggleSave}
          tab={activeTab} onTab={setActiveTab}
          onOpenFilters={() => setFiltersOpen(true)}
          filterChip={filterChip} setFilterChip={setFilterChip}
          activeFilters={filters} />

        }
        {activeTab === 'saved' &&
        <window.SavedScreen saved={saved} toggleSave={toggleSave} tab={activeTab} onTab={setActiveTab} />
        }
        {activeTab === 'trips' &&
        <window.StubScreen
          tab={activeTab} onTab={setActiveTab}
          eyebrow="STAY"
          dev="अभी"
          title="Twelve nights to Kalpa."
          sub="The companion mode opens here once you arrive."
          body={
          <div>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9.5, letterSpacing: 2, color: 'var(--bindu)', textTransform: 'uppercase', fontWeight: 500 }}>— Upcoming</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--forest)', fontWeight: 400, letterSpacing: 0.3, marginTop: 6 }}>Kalpa · 14 — 20 Aug 2026</h3>
                <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 13.5, color: 'var(--moss)', lineHeight: 1.5, marginTop: 6 }}>
                  Cabin notes, directions and packing list arrive two weeks before you do.
                </p>
                <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--bone)' }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9.5, letterSpacing: 2, color: 'var(--bindu)', textTransform: 'uppercase', fontWeight: 500 }}>— Past</span>
                  <div style={{ marginTop: 10, fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--forest)', fontWeight: 400 }}>Binsar · Nov 2025</div>
                  <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 12.5, color: 'var(--moss)', lineHeight: 1.5, marginTop: 4 }}>
                    You wrote three letters and finished none.
                  </p>
                </div>
              </div>
          } />

        }
        {activeTab === 'profile' &&
        <window.StubScreen
          tab={activeTab} onTab={setActiveTab}
          eyebrow="PROFILE"
          dev="आप"
          title="Anika S."
          sub="Circle member · since 2024 · 17 nights"
          body={
          <div>
                {[
            ['Stays', '4 cabins · 17 nights · 32 saplings funded'],
            ['Preferences', 'Solitude · A slow reset · Wild forest'],
            ['Member benefits', 'Field journal · Cabin priority · Postcards'],
            ['Payment methods', 'One card on file · UPI'],
            ['Language', 'English'],
            ['Sign out', '']].
            map((row, i) =>
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, padding: '14px 0', borderBottom: i < 5 ? '1px solid var(--bone)' : 0, alignItems: 'baseline' }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9.5, letterSpacing: 2, color: 'var(--bindu)', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: 2 }}>{row[0]}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>{row[1]}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--bindu)' }}>→</span>
                  </div>
            )}
              </div>
          } />

        }

        {/* Filters sheet overlays Discover */}
        <window.FiltersSheet
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          filters={filters}
          setFilters={setFilters} />
        
      </div>
    </div>);

}

// ─── Notes columns flanking the phone ──────────────────────────
function NotesLeft({ note }) {
  return (
    <div className="stage__notes-left">
      <div>
        <div className="stage__step">{note.step}</div>
        <div className="stage__h" style={{ marginTop: 8 }}>{note.h}</div>
        <p className="stage__sub" style={{ marginTop: 10 }}>{note.sub}</p>
      </div>
    </div>);

}

function NotesRight({ note }) {
  return (
    <div className="stage__notes-right">
      <div>
        <div className="stage__why-head">— How it's built</div>
        <div className="stage__why-list" style={{ marginTop: 12 }}>
          {note.rationale.map((r, i) =>
          <div key={i}>
              <span className="l">{r.l}</span>
              <span className="v">{r.v}</span>
            </div>
          )}
        </div>
      </div>
    </div>);

}

// ─── Screen index ──────────────────────────────────────────────
const INDEX = [
{ id: 'home', n: '01', name: 'Home', meta: 'Editorial feed + collections', thumb: 'home' },
{ id: 'discover', n: '02', name: 'Discover', meta: 'Map · pins · bottom sheet', thumb: 'map' },
{ id: 'filters', n: '03', name: 'Filters', meta: 'Sheet over Discover', thumb: 'filt' },
{ id: 'saved', n: '04', name: 'Saved', meta: 'Held shortlist', thumb: 'saved' },
{ id: 'trips', n: '05', name: 'Stay', meta: 'Active / past trips', thumb: 'stay' },
{ id: 'profile', n: '06', name: 'Profile', meta: 'Memberships · prefs · pay', thumb: 'prof' }];


function Thumb({ kind }) {
  const cream = 'var(--cream)';
  const sand = 'var(--sand)';
  const bone = 'var(--bone)';
  const fg = 'var(--forest)';
  const bd = 'var(--bindu)';
  const grad = (c) => ({ background: window.EKAM_HOME.MOOD[c] });
  if (kind === 'home') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: cream, padding: '14% 9% 14%', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 8, color: fg, letterSpacing: 1.3 }}>EKAM</span>
          <span style={{ display: 'flex', gap: 3 }}><span style={{ width: 5, height: 5, borderRadius: '50%', border: `1px solid ${fg}` }} /><span style={{ width: 5, height: 5, borderRadius: '50%', border: `1px solid ${fg}` }} /></span>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 6, color: fg, marginTop: 4, lineHeight: 1.1 }}>Good morning, Anika.</div>
        <div style={{ display: 'flex', gap: 3, marginTop: 2 }}>
          <span style={{ flex: '0 0 auto', padding: '1px 4px', border: `1px solid ${bd}`, borderRadius: 999, fontSize: 3, color: bd, letterSpacing: 0.5 }}>FOGGY KUMAON</span>
          <span style={{ flex: '0 0 auto', padding: '1px 4px', border: `1px solid ${bd}`, borderRadius: 999, fontSize: 3, color: bd, letterSpacing: 0.5 }}>SNOW</span>
        </div>
        <div style={{ aspectRatio: '16/8', marginTop: 4, ...grad('L'), borderBottom: `1px solid ${bd}`, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 4, bottom: 4, fontFamily: 'var(--font-display)', fontSize: 8, color: 'var(--cream)', lineHeight: 1 }}>Kalpa</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 3, marginTop: 4 }}>
          <div style={{ aspectRatio: '4/5', ...grad('A'), borderBottom: `1px solid ${bone}` }} />
          <div style={{ aspectRatio: '4/5', ...grad('G'), borderBottom: `1px solid ${bone}` }} />
          <div style={{ aspectRatio: '4/5', ...grad('K'), borderBottom: `1px solid ${bone}` }} />
        </div>
        <div style={{ background: '#1F3525', height: 18, marginTop: 4, padding: 3, color: 'var(--cream)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 5, lineHeight: 1.1 }}>The monsoon arrives June 14.</div>
        <div style={{ marginTop: 'auto', borderTop: `1px solid ${bone}`, height: 10, display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingTop: 2 }}>
          {[1, 2, 3, 4, 5].map((i) => <span key={i} style={{ width: 4, height: 4, background: i === 1 ? bd : 'var(--moss)', borderRadius: '50%' }} />)}
        </div>
      </div>);

  }
  if (kind === 'map') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: cream, padding: '14% 9% 14%', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ border: `1px solid ${bone}`, padding: '3px 5px', display: 'flex', gap: 4, alignItems: 'center', fontSize: 4, color: fg, fontFamily: 'var(--font-display)' }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', border: `1px solid ${fg}` }} />
          Where, when, why
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          {['All', 'Kut', 'Van', 'Shi'].map((x, i) => <span key={i} style={{ flex: '0 0 auto', padding: '1px 3px', borderRadius: 999, border: i === 0 ? `1px solid ${fg}` : `1px solid ${bone}`, background: i === 0 ? fg : 'transparent', color: i === 0 ? 'var(--cream)' : fg, fontSize: 3 }}>{x}</span>)}
        </div>
        <div style={{ flex: 1, position: 'relative', background: sand, border: `1px solid ${bone}`, overflow: 'hidden' }}>
          <svg viewBox="0 0 100 80" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0 30 L 20 18 L 40 26 L 60 14 L 80 22 L 100 18 L 100 0 L 0 0 Z" fill="#C9D6BC" opacity="0.5" />
            <path d="M0 50 L 25 38 L 50 46 L 75 38 L 100 44 L 100 0 L 0 0 Z" fill="#7A8A6B" opacity="0.5" />
          </svg>
          {[[22, 55], [40, 42], [58, 38], [72, 48], [35, 62], [80, 32]].map(([x, y], i) =>
          <span key={i} style={{ position: 'absolute', width: 3, height: 3, background: bd, borderRadius: '50%', border: '0.5px solid var(--cream)', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }} />
          )}
        </div>
        <div style={{ background: cream, borderTop: `1px solid ${bone}`, padding: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 3, color: fg, fontFamily: 'var(--font-display)' }}>
          <span>15 cabins</span><span style={{ background: fg, color: 'var(--cream)', padding: '0 3px' }}>List</span>
        </div>
        <div style={{ marginTop: 'auto', borderTop: `1px solid ${bone}`, height: 10, display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingTop: 2 }}>
          {[1, 2, 3, 4, 5].map((i) => <span key={i} style={{ width: 4, height: 4, background: i === 2 ? bd : 'var(--moss)', borderRadius: '50%' }} />)}
        </div>
      </div>);

  }
  if (kind === 'filt') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,32,26,0.5)', padding: '50% 6% 14%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: cream, padding: 5, flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ width: 12, height: 1.5, background: 'var(--mist)', borderRadius: 999, margin: '2px auto' }} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 6, color: fg }}>Filters</div>
          <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {['Kut', 'Van', 'Shi'].map((x, i) => <span key={i} style={{ padding: '1px 3px', border: `1px solid ${i === 0 ? bd : bone}`, fontSize: 3, color: i === 0 ? bd : fg, background: i === 1 ? fg : 'transparent' }}>{x}</span>)}
          </div>
          <div style={{ height: 1, background: bone }} />
          <div style={{ background: bd, height: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: '30%', top: '50%', transform: 'translate(-50%, -50%)', width: 4, height: 4, background: bd, borderRadius: '50%', border: '0.5px solid var(--cream)' }} />
            <span style={{ position: 'absolute', left: '75%', top: '50%', transform: 'translate(-50%, -50%)', width: 4, height: 4, background: bd, borderRadius: '50%', border: '0.5px solid var(--cream)' }} />
          </div>
          <div style={{ height: 1, background: bone, marginTop: 1 }} />
          {[1, 2, 3].map((i) => <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1px 0' }}><span style={{ fontSize: 3, fontFamily: 'var(--font-display)', color: fg }}>Toggle</span><span style={{ width: 6, height: 3, background: i === 2 ? fg : 'var(--mist)', borderRadius: 999, position: 'relative' }}><span style={{ position: 'absolute', width: 2, height: 2, background: 'var(--cream)', borderRadius: '50%', top: 0.5, left: i === 2 ? 3 : 0.5 }} /></span></div>)}
          <div style={{ marginTop: 'auto', background: bd, padding: '2px 0', textAlign: 'center', color: 'var(--cream)', fontSize: 3, borderRadius: 999, letterSpacing: 0.5 }}>SHOW 7 CABINS</div>
        </div>
      </div>);

  }
  if (kind === 'saved') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: cream, padding: '14% 9% 14%', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 8, color: fg, letterSpacing: 1.5 }}>SAVED ESCAPES</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 5, color: fg, fontStyle: 'italic' }}>A shortlist, held.</div>
        <div style={{ height: 1, background: bone, marginTop: 2 }} />
        {['L', 'A', 'H'].map((m, i) =>
        <div key={i} style={{ display: 'flex', gap: 4, alignItems: 'center', borderBottom: `1px solid ${bone}`, paddingBottom: 2 }}>
            <div style={{ width: 10, aspectRatio: '4/5', ...grad(m) }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 5, color: fg, lineHeight: 1 }}>{['Kalpa', 'Binsar', 'Baspa'][i]}</span>
              <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 3, color: 'var(--moss)' }}>{['Kinnaur', 'Kumaon', 'Sangla'][i]}</span>
            </div>
            <span style={{ width: 4, height: 4, background: bd, borderRadius: '50%' }} />
          </div>
        )}
        <div style={{ marginTop: 'auto', borderTop: `1px solid ${bone}`, height: 10, display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingTop: 2 }}>
          {[1, 2, 3, 4, 5].map((i) => <span key={i} style={{ width: 4, height: 4, background: i === 3 ? bd : 'var(--moss)', borderRadius: '50%' }} />)}
        </div>
      </div>);

  }
  if (kind === 'stay') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: cream, padding: '14% 9% 14%', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 8, color: fg, letterSpacing: 1.5 }}>STAY</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 5, color: fg, fontStyle: 'italic' }}>Twelve nights to Kalpa.</div>
        <div style={{ aspectRatio: '16/8', marginTop: 2, ...grad('L'), position: 'relative' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
          <div><span style={{ fontSize: 3, color: bd }}>TIER</span><br /><span style={{ fontSize: 4, color: fg, fontFamily: 'var(--font-display)' }}>Shikhar</span></div>
          <div><span style={{ fontSize: 3, color: bd }}>NIGHTS</span><br /><span style={{ fontSize: 4, color: fg, fontFamily: 'var(--font-display)' }}>6</span></div>
          <div><span style={{ fontSize: 3, color: bd }}>HOST</span><br /><span style={{ fontSize: 4, color: fg, fontFamily: 'var(--font-display)' }}>Tashi</span></div>
        </div>
        <div style={{ height: 1, background: bone, marginTop: 3 }} />
        <div style={{ fontSize: 3, color: bd, letterSpacing: 0.5 }}>— PAST</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 4, color: fg }}>Binsar · Nov 2025</div>
        <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 3, color: 'var(--moss)' }}>You wrote three letters.</div>
        <div style={{ marginTop: 'auto', borderTop: `1px solid ${bone}`, height: 10, display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingTop: 2 }}>
          {[1, 2, 3, 4, 5].map((i) => <span key={i} style={{ width: 4, height: 4, background: i === 4 ? bd : 'var(--moss)', borderRadius: '50%' }} />)}
        </div>
      </div>);

  }
  if (kind === 'prof') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: cream, padding: '14% 9% 14%', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 8, color: fg, letterSpacing: 1.5 }}>PROFILE</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 6, color: fg }}>Anika S.</div>
        <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 3, color: 'var(--moss)' }}>Circle · 17 nights · 32 saplings</div>
        <div style={{ height: 1, background: bone, marginTop: 2 }} />
        {['Stays', 'Preferences', 'Member benefits', 'Payment', 'Language', 'Sign out'].map((x, i) =>
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1px 0', borderBottom: i < 5 ? `1px solid ${bone}` : 0 }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 3, color: i === 5 ? 'var(--moss)' : fg, letterSpacing: 0.5 }}>{x}</span>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 4, color: bd }}>→</span>
          </div>
        )}
        <div style={{ marginTop: 'auto', borderTop: `1px solid ${bone}`, height: 10, display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingTop: 2 }}>
          {[1, 2, 3, 4, 5].map((i) => <span key={i} style={{ width: 4, height: 4, background: i === 5 ? bd : 'var(--moss)', borderRadius: '50%' }} />)}
        </div>
      </div>);

  }
  return null;
}

// ─── App ───────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeIndex, setActiveIndex] = useState('home');
  const [saved, setSaved] = useState(new Set(['kalpa', 'binsar', 'baspa']));
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterChip, setFilterChip] = useState('all');
  const [filters, setFilters] = useState({
    tiers: [],
    elevTarget: 2400,
    driveFrom: 'Delhi',
    maxDrive: null,
    duration: null,
    workcation: false,
    familyOk: false
  });

  const toggleSave = (id) => {
    setSaved((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const note = SCREEN_NOTES[activeIndex] || SCREEN_NOTES.home;

  const jumpToIndex = (item) => {
    setActiveIndex(item.id);
    if (item.id === 'filters') {
      setActiveTab('discover');
      setFiltersOpen(true);
    } else {
      setActiveTab(item.id);
      setFiltersOpen(false);
    }
  };

  // Keep activeIndex in sync when user uses the in-phone tab bar
  React.useEffect(() => {
    if (filtersOpen) {setActiveIndex('filters');} else
    {setActiveIndex(activeTab);}
  }, [activeTab, filtersOpen]);

  return (
    <div className="page">

      {/* Header */}
      <header className="page__head">
        <div>
          <span className="page__eyebrow">— EKAM Living · Mobile · Chapter II</span>
          <div className="page__brand">
            <span className="page__brand-dev">एकम्</span>
            <span className="page__brand-wm">E<span className="dot"></span>KAM</span>
          </div>
          <h1 className="page__title">My Bookings section </h1>
          <p className="page__lede">
            An editorial home feed that does not feel like a grid. A discovery experience built around a topographic map, not a search bar. Filters as a sheet, not a screen. Saved Escapes instead of a wishlist.
          </p>
        </div>
        <div className="page__meta">
          <span>Version <b>0.5 · draft</b></span>
          <span>Screens · <b>6</b></span>
          <span>Builds on · <b>onboarding v0.4</b></span>
        </div>
      </header>

      {/* Pattern map */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="intro">
          <div className="col-lbl">
            <span className="page__eyebrow">— Discovery patterns</span>
            <span className="intro__dev">खोज · seek</span>
          </div>
          <div>
            <h3>Six Airbnb mechanics, six EKAM rewrites.</h3>
            <p>The mechanics are familiar. The vocabulary is the work.</p>
          </div>
        </div>

        <div className="pattern">
          <div className="pattern__head">
            <div>Airbnb mechanic</div><div>EKAM expression</div><div>Why</div>
          </div>
          {[
          ['Personalised home feed', 'Editorial collections', 'Three to five hand-curated rails, each a sentence not a label. Recommendations inform; the editor decides.'],
          ['Categories carousel (OMG / Treehouses)', 'Escape Collections', 'Renamed by intent: Stillness, Above the cloud, Work from the mountains, Monsoon retreats.'],
          ['Map exploration with price pins', 'Topographic map with cabin pins', 'A drawn landscape, not a tile. Bindu pins, no prices on the map — solitude is not a discount.'],
          ['Flexible-date pills (weekend / week / month)', 'Mood-first dates', 'A weekend / a week / when you tell me. The calendar is on the property page, not the filter sheet.'],
          ['Wishlist (multi-folder)', 'Saved Escapes (single list)', 'No folder taxonomy. The list rarely exceeds six items, and that\'s the point.'],
          ['Recently viewed strip', 'You were just here', 'Square thumbnails, half the height. Surfaces without claiming attention. The home is not a feed of you.']].
          map((r, i) =>
          <div className="pattern__row" key={i}>
              <div className="pattern__from">{r[0]}</div>
              <div className="pattern__to">{r[1]}</div>
              <div className="pattern__why">{r[2]}</div>
            </div>
          )}
        </div>
      </section>

      {/* Stage */}
      <section>
        <div className="intro" style={{ marginBottom: 28 }}>
          <div className="col-lbl">
            <span className="page__eyebrow">— The prototype</span>
            <span className="intro__dev">स्वागत · welcome</span>
          </div>
          <div>
            <h3>Tap through the phone. The Home, Discover, Filters, Saved, Stay and Profile tabs are all live.</h3>
            <p>The map's pins are real coordinates for the fifteen cabins. The bottom-sheet list filters live with the chips and the Filters sheet. Heart any cabin and watch it appear under Saved.</p>
          </div>
        </div>

        <div className="tabs">
          {INDEX.map((item) =>
          <button
            key={item.id}
            className={`tabs__btn ${activeIndex === item.id ? 'on' : ''}`}
            onClick={() => jumpToIndex(item)}>
            
              <span className="dev">{['घर', 'खोज', 'छान', 'मन', 'अभी', 'आप'][INDEX.indexOf(item)]}</span>
              {item.n} · {item.name}
            </button>
          )}
        </div>

        <div className="stage">
          <NotesLeft note={note} />

          <div className="phone-wrap">
            <Phone
              activeTab={activeTab} setActiveTab={setActiveTab}
              saved={saved} toggleSave={toggleSave}
              filtersOpen={filtersOpen} setFiltersOpen={setFiltersOpen}
              filterChip={filterChip} setFilterChip={setFilterChip}
              filters={filters} setFilters={setFilters} />
            
            <span className="phone__caption">iPhone 15 · 393 × 852 dp · live state</span>
          </div>

          <NotesRight note={note} />
        </div>
      </section>

      {/* Screen index */}
      <section className="index">
        <div className="index__head">
          <div>
            <span className="page__eyebrow">— Screens in this chapter</span>
            <span className="intro__dev" style={{ marginTop: 4, display: 'block' }}>संग्रह · the set</span>
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 28, color: 'var(--forest)', letterSpacing: 0.5, lineHeight: 1.15 }}>
              Six screens. Five tabs and one sheet.
            </h3>
            <p>The Filters sheet is part of Discover, not its own tab — opens with a soft rise, closes on completion. Saved is a quiet list, not a folder system. Stay relabels itself when a trip is active.</p>
          </div>
        </div>
        <div className="index__grid">
          {INDEX.map((item) =>
          <button
            key={item.id}
            className={`index__cell ${activeIndex === item.id ? 'on' : ''}`}
            onClick={() => jumpToIndex(item)}>
            
              <div className="index__thumb"><Thumb kind={item.thumb} /></div>
              <span className="index__num">{item.n}</span>
              <span className="index__name">{item.name}</span>
              <span className="index__meta">{item.meta}</span>
            </button>
          )}
        </div>
      </section>

    </div>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);