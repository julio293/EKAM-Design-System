/* global React */
function TouchpointsStrip() {
  const items = [
    { dev: '१', name: 'The welcome card',  meta: 'Letterpress · cream Mohawk' },
    { dev: '२', name: 'The wax seal',      meta: 'Clay, hand-pressed' },
    { dev: '३', name: 'The match box',     meta: 'Cream sleeve · sulfur inside' },
    { dev: '४', name: 'The mug',           meta: 'Hand-thrown · moss glaze' },
    { dev: '५', name: 'The property map',  meta: 'Drawn fresh, by the host' },
    { dev: '६', name: 'The pre-stay card', meta: 'A week before arrival' },
    { dev: '७', name: 'The journal',       meta: 'One volume per season' },
    { dev: '८', name: 'The number plate',  meta: 'Local stone, hand-cut' },
  ];

  return (
    <section className="surface is-ink" id="touchpoints">
      <div className="container">
        <span className="eyebrow">— Twelve touchpoints</span>
        <h2 className="title">The objects you'll meet.</h2>
        <p className="lede">
          Each artifact carries the same anatomy — the object, its role in the day, the substrate it is made from, the one line from the doctrine that earned it its place.
        </p>
        <div className="tp-strip">
          {items.map((t) => (
            <div className="tp" key={t.dev}>
              <span className="tp__dev">{t.dev}</span>
              <span className="tp__name">{t.name}</span>
              <span className="tp__meta">{t.meta}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.TouchpointsStrip = TouchpointsStrip;
