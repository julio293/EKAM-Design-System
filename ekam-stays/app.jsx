/* global React, ReactDOM */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Stays & Profile · app
// In-phone router (push / pop / tab-reset) with calm transitions,
// wrapped in a quiet showcase shell with per-screen side-notes.
// ════════════════════════════════════════════════════════════════
const { useState, useRef } = React;

// Which bottom-tab each screen belongs to (its root)
const TAB_ROOT = {
  profile: 'profile', preferences: 'profile', signout: 'profile', help: 'profile',
  intros: 'profile',
  stays: 'stays', 'stay-upcoming': 'stays', 'stay-completed': 'stays',
  saved: 'saved', 'saved-detail': 'saved',
  mudra: 'mudra', 'mudra-detail': 'mudra',
};

const TAB_HOME = { profile: 'profile', stays: 'stays', saved: 'saved', mudra: 'mudra', intros: 'intros' };

// Side-notes per screen — the supporting guidance the brief asked for.
const NOTES = {
  profile: {
    step: 'You · the archive',
    h: 'A personal retreat archive, not a settings menu.',
    sub: 'A photographic hero, the one stay ahead, glimpses of the seals and the shortlist. Each glimpse opens its own world.',
    why: [
      ['Hero, not header', 'A seasonal cabin field with the guest\'s name, set in light. The land greets them before the UI does.'],
      ['One anticipatory card', 'The next arrival is the only thing that counts up — a quiet day-count, never a notification badge.'],
      ['Glimpses, not counts', 'Three seals, two saved cabins — shown, not tallied. "3 cabins have left a mark," never "3/14".'],
      ['Prose entries', 'Every row is a sentence: "One ahead, three behind you." The label names the thing; the value is its state.'],
      ['Sign out, plain', 'Two words at the foot. No red, no "are you sure" — the cabin will be there.'],
    ],
  },
  stays: {
    step: 'Stays · the road',
    h: 'The road ahead, and the archive behind.',
    sub: 'A two-state segment. Upcoming carries the one booked stay; Behind you is a journal of completed retreats.',
    why: [
      ['"Stays", not "Retreat Ahead"', 'The brief\'s working name was abstract. "Stays" is plain, warm, timeless — holds both tenses.'],
      ['One forward, many back', 'Most guests have one trip ahead and a growing archive. The layout reflects that asymmetry.'],
      ['Archive, not history table', 'Completed stays are photographic cards with a season and a host — not a booking ledger.'],
      ['Empty as a pause', 'When nothing is ahead, the note is calm: the stay becomes an archive entry once it\'s behind you.'],
    ],
  },
  'stay-upcoming': {
    step: 'Stays · the arrival',
    h: 'Anticipatory, calm, beautifully organised.',
    sub: 'Hero with a day-count, dates, the week\'s weather, the road in three steps, and how to enter the cabin.',
    why: [
      ['Countdown, not urgency', '"8 days until you arrive" anticipates; it never pressures. No timer, no "book before".'],
      ['Travel as three steps', 'From Shimla → the last stretch → on foot. The road is hospitality, written like directions from a friend.'],
      ['Check-in is sensory', 'The brass key in the niche, the laid-but-unlit stove. Arrival is described, not instructed.'],
      ['Companion handoff', 'One forward link to the in-stay Companion — which opens only the morning you arrive.'],
    ],
  },
  'stay-completed': {
    step: 'Stays · the memory',
    h: 'Archival, personal, almost journal-like.',
    sub: 'A past stay held as a page: the season, the host, the line you wrote, and the seal it left.',
    why: [
      ['A line you wrote', 'The single most personal field — kept on-device, never a public review, never a star rating.'],
      ['Linked to its seal', 'Each memory opens the Mudra it earned. The archive and the seal collection are one fabric.'],
      ['Season, not date', '"After the first frost," not "12–15 Nov". The brand remembers in weather, not in calendar rows.'],
    ],
  },
  saved: {
    step: 'Saved · the shortlist',
    h: 'A quiet archive of future arrivals.',
    sub: 'The held shortlist with no prices, then recently viewed, then a few that suit the season.',
    why: [
      ['No price on the card', 'Saved is intent, not commerce. Price lives on the cabin\'s page, where the decision is made.'],
      ['One purpose per card', 'Held cabins are editorial; recently-viewed is a thin rail; seasonal is a hand-written nudge. Each reads differently.'],
      ['Seasonal, by hand', '"The river is loudest now, before the monsoon." Suggestions are written, not algorithmic.'],
      ['Quiet release', 'The heart fills clay, no toast, no animation. Tap to let a cabin go.'],
    ],
  },
  'saved-detail': {
    step: 'Saved · the cabin',
    h: 'A held cabin, one screen from the decision.',
    sub: 'A photographic open, the one sentence you remembered, and a single way forward to the cabin\'s page.',
    why: [
      ['Hold / release here', 'The save toggle lives on the detail too, so the shortlist is editable wherever you are.'],
      ['One primary action', '"See the cabin" is the only button; releasing is a quiet text link beneath.'],
    ],
  },
  mudra: {
    step: 'Mudra · the seals',
    h: 'A network of seals, not a status ladder.',
    sub: 'A quiet map of the land — visited cabins as clay marks — toggling to a journal page that mirrors the posted book.',
    why: [
      ['The land is the navigation', 'A faint outline of HP + UK; the only saturated colour is the clay of a visited mark.'],
      ['Tap a mark', 'Each visited mark opens the stay it remembers. The map is an index of memory, not a scoreboard.'],
      ['Arrives, never unlocks', 'The wax seal comes by post after a stay. The app mirrors it; it never animates an "unlock".'],
    ],
  },
  'mudra-detail': {
    step: 'Mudra · one mark',
    h: 'One mark, fully present.',
    sub: 'The seal at the centre. Cabin number, host, season, and the line you wrote. No share button.',
    why: [
      ['Record, not content', 'No "share to story", no badge. The mudra is a private record of a real night.'],
      ['Three facts', 'Stayed · with · when. The host is named; the season is described, not dated.'],
    ],
  },
  intros: {
    step: 'Introductions · the note',
    h: 'A postcard, not a coupon.',
    sub: 'What the recipient sees, a note in your hand, four channels, and the people you\'ve already brought in.',
    why: [
      ['The link is your name', 'No promo code. The recipient gets your first name, your note, and a held cabin.'],
      ['Editable note', 'A real text field in the Caveat hand — you\'re writing to a person, not filling a form.'],
      ['State-aware past', 'Each introduction shows what happened: arriving · holding · stayed. Live, never historical.'],
      ['Return, not reward', '₹1,000 is held only after their first stay — stated, never promoted.'],
    ],
  },
  preferences: {
    step: 'You · preferences',
    h: 'The answers from when you joined.',
    sub: 'Six editable preferences in the brand\'s own vocabulary — pace, party, elevation, season, the cup.',
    why: [
      ['Same questions, later', 'The onboarding answers, returned to as preferences. Same language, different time.'],
      ['On-device', 'Nothing is shared. They shape only what the app surfaces.'],
    ],
  },
  signout: { step: 'You · sign out', h: 'A plain leaving.', sub: 'No friction, no guilt. The cabin will be there.', why: [['No dark pattern', 'Sign-out is one tap and one calm confirmation. We do not make leaving hard.']] },
  help: { step: 'You · help', h: 'A person, not a bot.', sub: 'The host who knows your cabin answers fastest.', why: [['Hospitality, not a ticket', 'Help routes to a human. No chatbot, no queue position.']] },
};

// ─── The phone with its internal router ──────────────────────
function Phone() {
  const [stack, setStack] = useState([{ s: 'profile', p: {} }]);
  const [dir, setDir] = useState('push');
  const [saved, setSaved] = useState(new Set(['binsar', 'baspa', 'chitkul']));
  const seqRef = useRef(0);

  const top = stack[stack.length - 1];

  const nav = {
    push: (s, p = {}) => { setDir('push'); seqRef.current++; setStack(st => [...st, { s, p }]); },
    pop: () => { setDir('pop'); seqRef.current++; setStack(st => st.length > 1 ? st.slice(0, -1) : st); },
  };
  const onTab = (tab) => {
    const home = TAB_HOME[tab] || tab;
    setDir('tab'); seqRef.current++;
    setStack([{ s: home, p: {} }]);
  };
  const onSave = (id) => setSaved(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const onUnsave = (id) => setSaved(s => { const n = new Set(s); n.delete(id); return n; });

  const activeTab = TAB_ROOT[top.s] || 'profile';

  const render = () => {
    const { s, p } = top;
    switch (s) {
      case 'profile':        return <window.SP_ProfileHome nav={nav} onTab={onTab} />;
      case 'preferences':    return <window.SP_Preferences nav={nav} />;
      case 'signout':        return <window.SP_Plain nav={nav} kind="signout" />;
      case 'help':           return <window.SP_Plain nav={nav} kind="help" />;
      case 'stays':          return <window.SP_StaysList nav={nav} onTab={onTab} />;
      case 'stay-upcoming':  return <window.SP_StayUpcoming nav={nav} />;
      case 'stay-completed': return <window.SP_StayCompleted nav={nav} params={p} />;
      case 'saved':          return <window.SP_Saved nav={nav} onTab={onTab} saved={saved} onUnsave={onUnsave} />;
      case 'saved-detail':   return <window.SP_SavedDetail nav={nav} params={p} saved={saved} onSave={onSave} />;
      case 'mudra':          return <window.SP_Mudra nav={nav} onTab={onTab} />;
      case 'mudra-detail':   return <window.SP_MudraDetail nav={nav} params={p} />;
      case 'intros':         return <window.SP_Introductions nav={nav} onTab={onTab} />;
      default:               return <window.SP_ProfileHome nav={nav} onTab={onTab} />;
    }
  };

  return (
    <div className="phone">
      <div className="phone__screen">
        <div className={`sp-anim sp-anim--${dir}`} key={seqRef.current}>
          {render()}
        </div>
      </div>
      <window.SP_NoteSync screen={top.s} />
    </div>
  );
}

// Bridge: lifts the current screen id up so the side-notes can read it.
function NoteSync({ screen }) {
  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent('sp-screen', { detail: screen }));
  }, [screen]);
  return null;
}
window.SP_NoteSync = NoteSync;

// ─── Side-notes panel ────────────────────────────────────────
function SideNotes() {
  const [screen, setScreen] = useState('profile');
  React.useEffect(() => {
    const h = (e) => setScreen(e.detail);
    window.addEventListener('sp-screen', h);
    return () => window.removeEventListener('sp-screen', h);
  }, []);
  const note = NOTES[screen] || NOTES.profile;
  return (
    <aside className="sp-notes">
      <div className="sp-notes__step">{note.step}</div>
      <h2 className="sp-notes__h">{note.h}</h2>
      <p className="sp-notes__sub">{note.sub}</p>
      <div className="sp-notes__why-head">— How it's built</div>
      <div className="sp-notes__why">
        {note.why.map((w, i) => (
          <div key={i}>
            <span className="l">{w[0]}</span>
            <span className="v">{w[1]}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

// ─── The page shell ──────────────────────────────────────────
function App() {
  return (
    <div className="sp-page">
      <header className="sp-page__head">
        <span className="sp-page__eyebrow">— EKAM Living · Mobile · Profile ecosystem</span>
        <div className="sp-page__brand">
          <span className="sp-page__brand-dev">एकम्</span>
          <span className="sp-page__brand-wm">E<span className="dot"></span>KAM</span>
        </div>
        <h1 className="sp-page__title">A calm personal retreat archive.</h1>
        <p className="sp-page__lede">
          The Profile, rebuilt as a navigable prototype. Tap any row, glimpse, seal, or card —
          every interaction opens somewhere; nothing dead-ends. Move between Saved, Stays, Mudra and You
          with the bottom tabs; step into a detail and step back with the arrow at the top.
        </p>
        <div className="sp-page__hint">
          <span>↓</span> Live prototype — tap through the phone. The notes on the right change with each screen.
        </div>
      </header>

      <div className="sp-stage">
        <div className="sp-stage__phone">
          <Phone />
          <span className="sp-stage__cap">iPhone 15 · 380 × 800 dp · tap-through · live state</span>
        </div>
        <SideNotes />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
