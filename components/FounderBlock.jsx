/* global React */
function FounderBlock({ onBook }) {
  return (
    <section className="surface is-sand" id="about">
      <div className="container">
        <span className="eyebrow">— The story</span>
        <h2 className="title">We do not sell rooms. We protect a contour.</h2>
        <p className="lede">
          About EKAM, in the founder's own words.
        </p>
        <div className="about-grid">

          <div className="about-letter">
            <div className="about-letter__eyebrow">— A letter from Abhishek, founder</div>
            <div className="about-letter__body">
              <p>
                Indian travel is a noisy category. Most boutique nature stays are someone's villa with a curtain swap and a glamping tent. They scale by replication, not by design. They depreciate by weather and rot. Six monsoons later, the operator has neither margin nor land left.
              </p>
              <p>
                EKAM has to be the opposite of that — by structure, not by slogan. The cabin and the land it sits on are the asset. If we damage either, we have nothing left to compound.
              </p>
              <p>
                Money buys a better hotel. It does not buy a permit to build inside a buffer zone, on a forest department lease, on a single-track road that took five signatures and twenty years of relationships to earn. That is our moat.
              </p>
              <p>
                The job, then, is to be <em>the most considered</em> option in the forest — not the most expensive.
              </p>
            </div>
            <div className="about-letter__sig">
              <div className="about-letter__hand">— Abhishek</div>
              <div className="about-letter__role">Founder · EKAM</div>
            </div>
          </div>

          <div className="about-side">
            <div className="about-card">
              <div className="about-card__lbl">— Founded</div>
              <div className="about-card__val">2024 · Himachal</div>
            </div>
            <div className="about-card">
              <div className="about-card__lbl">— Cabins today</div>
              <div className="about-card__val">15 · across HP &amp; UK</div>
            </div>
            <div className="about-card">
              <div className="about-card__lbl">— By Year 3</div>
              <div className="about-card__val">30+ cabins · net-water-neutral</div>
            </div>
            <div className="about-card">
              <div className="about-card__lbl">— Read</div>
              <div className="about-card__val">Sustainability roadmap →</div>
            </div>
            <button className="about-cta" onClick={onBook} style={{ borderRadius: "0px" }}>
              <span className="dot"></span>
              Stay with us
            </button>
          </div>

        </div>
      </div>
    </section>);

}
window.FounderBlock = FounderBlock;