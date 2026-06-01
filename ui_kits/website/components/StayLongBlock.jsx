/* global React */
function StayLongBlock({ onBook }) {
  return (
    <section className="surface is-sand" id="residency">
      <div className="container">
        <div className="stay-grid">
          <div>
            <span className="eyebrow">— The long stay</span>
            <h2 className="title">Stay seven nights. Pay for the cabin, not the funnel.</h2>
            <p className="body">
              Most operators raise margin on long stays because the guest is already committed. We do the opposite.
            </p>
            <p className="body">
              The customer-acquisition cost we save on the extra five nights — the marketing, the booking commissions, the listing fees — we pass back to you, transparently, at checkout. You see the math.
            </p>
            <p className="body">
              Two cabins per Van and Shikhar site are reserved for writers, conservationists, designers, indigenous-knowledge documentarians. Apply quietly.
            </p>
          </div>
          <div className="stay-card">
            <div className="stay-card__top">
              <span className="stay-card__lbl">Seven nights · Kutir Chitkul</span>
              <span className="stay-card__dev">कुटीर</span>
            </div>
            <div className="stay-card__row"><span>Cabin · 7 × ₹6,400</span><span>₹44,800</span></div>
            <div className="stay-card__row save"><span>— CAC pass-back · nights 3 to 7</span><span>— ₹3,840</span></div>
            <div className="stay-card__row sm"><span>Community cooperative · 1%</span><span>₹448</span></div>
            <div className="stay-card__row sm"><span>Carbon offset · 7 × ₹120</span><span>₹840</span></div>
            <div className="stay-card__rule"></div>
            <div className="stay-card__total"><span>Your stay</span><span>₹42,248</span></div>
            <div className="stay-card__quote">"You see the math. They know we are not extracting from their loyalty."</div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.StayLongBlock = StayLongBlock;
