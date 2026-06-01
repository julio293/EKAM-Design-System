/* global React, S_StatusBar, S_BackBar, S_TierGlyph, S_TabBar, S_Photo */
// ════════════════════════════════════════════════════════════════
// EKAM Mobile — Stays & Profile · Introductions
// A hospitality-led referral. A postcard, a note in your hand,
// a few channels, and the people you've already brought in.
// ════════════════════════════════════════════════════════════════
const { useState: useStateIntro } = React;

function IntroductionsScreen({ nav, onTab }) {
  const { SINTROS, SMOOD } = window.STAYS;
  const [copied, setCopied] = useStateIntro(false);
  const [sent, setSent] = useStateIntro(null);
  const [note, setNote] = useStateIntro('I think you would like this one — the kettle warms before sunrise.');

  const channels = [
    { id: 'whatsapp', name: 'WhatsApp', icon: <path d="M21 12a9 9 0 01-13.5 7.8L3 21l1.3-4.4A9 9 0 1121 12z M9 9c.5 1.5 1.5 2.5 3 3" /> },
    { id: 'imessage', name: 'Messages', icon: <path d="M21 11.5a8.4 8.4 0 01-9 8.4 8.5 8.5 0 01-3.6-.8L3 21l1.9-5.4A8.4 8.4 0 0112 3a8.4 8.4 0 019 8.5z" /> },
    { id: 'email', name: 'Email', icon: <><rect x="3" y="5" width="18" height="14" rx="1" /><polyline points="3 7 12 13 21 7" /></> },
    { id: 'link', name: copied ? 'Copied' : 'Copy link', icon: copied ? <polyline points="20 6 9 17 4 12" /> : <><rect x="9" y="9" width="12" height="12" rx="1" /><path d="M5 15V5a1 1 0 011-1h10" /></> },
  ];

  const onSend = (id) => {
    if (id === 'link') { setCopied(true); setTimeout(() => setCopied(false), 1800); return; }
    setSent(id); setTimeout(() => setSent(null), 1500);
  };

  const stateLabel = { arriving: 'Arriving', held: 'Holding', stayed: 'Stayed' };

  return (
    <div className="sp-screen">
      <S_StatusBar />
      <div className="sp-scroll">
        <div className="sp-body">
          <header className="sp-hd">
            <span className="sp-hd__dev">परिचय</span>
            <h1 className="sp-hd__title">An introduction.</h1>
            <p className="sp-hd__sub">When you've found a cabin worth telling someone about, here is how. A note from you, a held cabin for them — never a coupon.</p>
          </header>

          {/* Postcard preview */}
          <div className="postcard">
            <S_Photo mood="binsar" height={150} className="postcard__photo">
              <span className="postcard__stamp">
                <span className="postcard__stamp-dev">कुटीर</span>
                <span className="postcard__stamp-lbl">EKAM</span>
              </span>
              <span className="postcard__caption">An invitation, from Anika</span>
            </S_Photo>
            <div className="postcard__body">
              <span className="postcard__eb">— What they'll see</span>
              <span className="postcard__name">Your first name, your note, one cabin.</span>
            </div>
          </div>

          {/* The note, in your hand */}
          <div className="ref-note">
            <span className="ref-note__lbl">A few words, in your hand</span>
            <textarea
              className="ref-note__field"
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={2}
              aria-label="Your note"
            />
          </div>

          {/* Channels */}
          <div className="share-grid-wrap">
            <span className="share-grid__lbl">Send to</span>
            <div className="share-grid share-grid--4">
              {channels.map(c => (
                <button
                  key={c.id}
                  className={`share-cell ${sent === c.id ? 'sent' : ''} ${c.id === 'link' && copied ? 'sent' : ''}`}
                  onClick={() => onSend(c.id)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{c.icon}</svg>
                  <span>{sent === c.id ? 'Sent' : c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* The return — quiet, factual */}
          <div className="ref-reward">
            <span className="ref-reward__lbl">A small return, after their first stay</span>
            <p className="ref-reward__body">When the person you introduce completes their first night with us, ₹1,000 in Mudra is held for you. No code, no expiry, no claim — it simply arrives.</p>
          </div>

          {/* People you've brought in */}
          <div className="ref-past">
            <span className="ref-past__lbl">People you've brought in</span>
            <ul>
              {SINTROS.map(p => (
                <li key={p.name}>
                  <span className="ref-past__avatar">{p.initial}</span>
                  <div>
                    <span className="ref-past__name">{p.name}</span>
                    <span className="ref-past__status">{p.status} · {p.when}</span>
                    <span className="ref-past__note">{p.note}</span>
                  </div>
                  <span className={`ref-past__chip ref-past__chip--${p.state}`}>{stateLabel[p.state]}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="sp-quiet-foot">No invite spam, no growth targets. You introduce someone when a cabin reminds you of them — that's the whole mechanic.</p>
        </div>
      </div>
      <S_TabBar active="profile" onTab={onTab} />
    </div>
  );
}

Object.assign(window, { SP_Introductions: IntroductionsScreen });
