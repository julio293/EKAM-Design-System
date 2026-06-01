/* global React */
function TierCard({ id, dev, name, sub, price, photoClass, glyphHref, onPick }) {
  return (
    <article className="tier" id={id} onClick={() => onPick(id)}>
      <div className={`tier__photo ${photoClass}`}>
        <div className="tier__glyph">
          <svg viewBox="0 0 120 100"><use href={glyphHref} /></svg>
        </div>
      </div>
      <div className="tier__body">
        <div className="tier__dev">{dev}</div>
        <div className="tier__name">{name}</div>
        <p className="tier__sub">{sub}</p>
        <div className="tier__doctrine">
          <div className="tier__price">
            <small>From</small>
            ₹{price.toLocaleString('en-IN')} / night
          </div>
          <span className="tier__cta">Stay here →</span>
        </div>
      </div>
    </article>
  );
}

function TierCards({ onPick }) {
  return (
    <section className="surface" id="tiers">
      <div className="container">
        <span className="eyebrow">Three tiers</span>
        <h2 className="title">The cabin is the constant. The land changes everything.</h2>
        <p className="lede">
          Three experience tiers. Same craft. Same comfort. Three different ways the forest finds you.
        </p>
        <div className="tiers">
          <TierCard
            id="kutir"
            dev="कुटीर"
            name="KUTIR"
            sub="The hut. Stone floor. Wood stove. Everything you need to arrive."
            price={6400}
            photoClass="kutir"
            glyphHref="#g-kutir"
            onPick={onPick}
          />
          <TierCard
            id="van"
            dev="वन"
            name="VAN"
            sub="The forest. Tents woven into the canopy. Living with the land."
            price={9200}
            photoClass="van"
            glyphHref="#g-van"
            onPick={onPick}
          />
          <TierCard
            id="shikhar"
            dev="शिखर"
            name="SHIKHAR"
            sub="The peak. Ridgeline, unobstructed. You have climbed here. Now breathe."
            price={14800}
            photoClass="shikhar"
            glyphHref="#g-shikhar"
            onPick={onPick}
          />
        </div>
      </div>
    </section>
  );
}
window.TierCards = TierCards;
window.TierCard = TierCard;
