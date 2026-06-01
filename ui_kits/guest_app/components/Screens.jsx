/* global React */

function StatusBar() {
  return (
    <div className="statusbar">
      <span>6:42</span>
      <div className="ind">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 9h2M4 7h2M7 5h2M10 3h2" stroke="#14201A" strokeWidth="1.5" strokeLinecap="round"/></svg>
        <span style={{fontWeight: 600}}>87%</span>
      </div>
    </div>
  );
}

function WelcomeBlock() {
  return (
    <div className="welcome">
      <div className="welcome__dev">एकम्</div>
      <div className="welcome__title">Good morning,<br/>Anika.</div>
      <div className="welcome__rule"></div>
      <p className="welcome__sub">The fire is laid. The kettle is on the stove. The forest is listening.</p>
      <div className="welcome__host">
        <span>Your host · <b>Aarav</b></span>
        <span>Day 3 of 7</span>
      </div>
    </div>
  );
}

function HomeScreen({ onNav }) {
  return (
    <React.Fragment>
      <WelcomeBlock />
      <div className="section-head">
        <span className="eyebrow">— Today, 3 March</span>
        <h2>The mountain woke up slowly.</h2>
      </div>
      <div className="today-list">
        <div className="today-row"><span className="lbl">Sunrise</span><span className="val"><b>6:14</b> — the ridge will catch first.</span></div>
        <div className="today-row"><span className="lbl">Weather</span><span className="val"><b>Clear · 8 to 14°C.</b> A light wool will do.</span></div>
        <div className="today-row"><span className="lbl">Flowering</span><span className="val">Rhododendron arboreum, on the path to the chai pavilion.</span></div>
        <div className="today-row"><span className="lbl">Passing through</span><span className="val">Himalayan monal, lammergeier vulture overhead at noon.</span></div>
        <div className="today-row"><span className="lbl">Sunset</span><span className="val"><b>18:38</b> — the wood stove will be warm by then.</span></div>
      </div>
    </React.Fragment>
  );
}

const PROGRAMS = [
  { id: 'birds', name: 'Dawn bird walk', meta: 'Pre-sunrise, two hours. Led by Tashi, our naturalist.', time: 'Tomorrow · 5:45', price: '₹1,200' },
  { id: 'fora',  name: 'Foraging walk',  meta: 'Hour and a half. Wild greens, the river, what the season offers.', time: 'Wednesday · 10:00', price: '₹1,800' },
  { id: 'sky',   name: 'Night-sky session', meta: 'Telescope on the porch. Naked-eye constellations, planet pass.', time: 'Friday · 21:30', price: '₹900' },
  { id: 'tea',   name: 'Tea at the chai pavilion', meta: 'Three estates, three brews. Twenty minutes.', time: 'Anytime · 16:00–18:00', price: '₹400' },
];

function ProgramsScreen() {
  const [booked, setBooked] = React.useState(new Set(['birds']));
  const toggle = (id) => setBooked(s => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  return (
    <React.Fragment>
      <div className="section-head">
        <span className="eyebrow">— Programs</span>
        <h2>Walked with the land, slowly.</h2>
      </div>
      <div className="programs">
        {PROGRAMS.map(p => (
          <div key={p.id} className={`program-card ${booked.has(p.id) ? 'booked' : ''}`}>
            <div className="top">
              <span className="name">{p.name}</span>
              <span className="price">{p.price}</span>
            </div>
            <p className="meta">{p.meta}</p>
            <div className="row">
              <span className="time">{p.time}</span>
              <button onClick={() => toggle(p.id)}>
                {booked.has(p.id) ? '— Booked' : 'Reserve'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

const MENU = {
  Morning: [
    { id: 'tea',     name: 'Pot of Darjeeling',   desc: 'First flush. From the estate, 40 km.',  price: 240 },
    { id: 'masala',  name: 'Masala chai',         desc: 'Cardamom, ginger. Brewed strong.',       price: 180 },
    { id: 'porridge',name: 'Local oats porridge', desc: 'Walnuts, honey, mountain milk.',         price: 320 },
  ],
  'The cabin': [
    { id: 'fire',  name: 'Fire-time tea',       desc: 'At 18:00. Two cups by the stove.',     price: 0   },
    { id: 'hot',   name: 'Hot water schedule',  desc: 'Set for 6:30 and 21:00 today.',        price: 0   },
    { id: 'lateco',name: 'Late checkout',       desc: 'Until 14:00. Extra ₹600. Subject to availability.', price: 600 },
  ],
  Evening: [
    { id: 'thali', name: 'Cabin thali',         desc: 'Vegetarian. Five elements. Set at 19:30.', price: 1100 },
    { id: 'soup',  name: 'Lentil soup, bread',  desc: 'Simple. Brought in covered.',           price: 480 },
  ],
};

function OrderScreen({ showToast }) {
  const [cart, setCart] = React.useState([]);
  const toggle = (item) => {
    setCart(c => c.find(x => x.id === item.id) ? c.filter(x => x.id !== item.id) : [...c, item]);
  };
  const total = cart.reduce((s, x) => s + x.price, 0);
  const submit = () => {
    showToast(`Noted. Your order will arrive ${cart.some(x => x.id === 'fire' || x.id === 'hot') ? 'when the time comes' : 'shortly'}.`);
    setCart([]);
  };

  return (
    <React.Fragment>
      <div className="section-head">
        <span className="eyebrow">— Chai · चाय</span>
        <h2>What would you like, quietly?</h2>
      </div>
      <div className="order">
        {Object.entries(MENU).map(([group, items]) => (
          <div className="order-group" key={group}>
            <div className="group-head"><span className="group-name">{group}</span></div>
            {items.map(item => (
              <div
                key={item.id}
                className={`order-item ${cart.find(x => x.id === item.id) ? 'added' : ''}`}
                onClick={() => toggle(item)}
              >
                <div>
                  <div className="item-name">{item.name}</div>
                  <div className="item-desc">{item.desc}</div>
                </div>
                <div className="item-price">
                  {item.price === 0 ? 'included' : `₹${item.price}`}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="cart" onClick={submit} disabled={cart.length === 0}>
        <span>{cart.length === 0 ? 'Nothing selected' : `Place order · ${cart.length} item${cart.length>1?'s':''}`}</span>
        <span>{total > 0 ? `₹${total.toLocaleString('en-IN')}` : ''}</span>
      </button>
    </React.Fragment>
  );
}

function SettingsScreen() {
  const [hotWater, setHotWater] = React.useState(true);
  const [blackout, setBlackout] = React.useState(true);
  const [linen, setLinen] = React.useState(false);
  const [offset, setOffset] = React.useState(true);

  return (
    <React.Fragment>
      <div className="section-head">
        <span className="eyebrow">— Your stay</span>
        <h2>A few quiet preferences.</h2>
      </div>
      <div className="settings">
        <div className="setting-row">
          <div>
            <div className="lbl">Hot water · 6:30 + 21:00</div>
            <div className="val">Scheduled per cabin policy.</div>
          </div>
          <div className={`toggle ${hotWater ? 'on' : ''}`} onClick={() => setHotWater(!hotWater)}></div>
        </div>
        <div className="setting-row">
          <div>
            <div className="lbl">Blackout curtains</div>
            <div className="val">Drawn at dusk. Lifted at sunrise.</div>
          </div>
          <div className={`toggle ${blackout ? 'on' : ''}`} onClick={() => setBlackout(!blackout)}></div>
        </div>
        <div className="setting-row">
          <div>
            <div className="lbl">Linen change</div>
            <div className="val">Opt-in, not opt-out.</div>
          </div>
          <div className={`toggle ${linen ? 'on' : ''}`} onClick={() => setLinen(!linen)}></div>
        </div>
        <div className="setting-row">
          <div>
            <div className="lbl">Carbon offset · ₹120 / night</div>
            <div className="val">Funds 8 saplings near this cabin.</div>
          </div>
          <div className={`toggle ${offset ? 'on' : ''}`} onClick={() => setOffset(!offset)}></div>
        </div>
      </div>
      <div className="section-head" style={{marginTop: 8}}>
        <span className="eyebrow" style={{color: 'var(--moss)'}}>— Need a person</span>
        <h2 style={{fontSize: 18}}>Aarav · your host</h2>
      </div>
      <div className="settings">
        <div className="setting-row">
          <div>
            <div className="lbl">Call Aarav</div>
            <div className="val">For anything. The cabin tablet covers the rest.</div>
          </div>
          <button style={{padding: '8px 18px', border: '1px solid var(--bindu)', borderRadius: 999, background: 'transparent', fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 2, color: 'var(--forest)', textTransform: 'uppercase', fontWeight: 500}}>
            +91 98765
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

window.HomeScreen = HomeScreen;
window.ProgramsScreen = ProgramsScreen;
window.OrderScreen = OrderScreen;
window.SettingsScreen = SettingsScreen;
window.StatusBar = StatusBar;
