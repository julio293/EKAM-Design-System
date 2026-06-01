/* global React */
function PillarsBlock() {
  return (
    <section className="surface is-sand">
      <div className="container">
        <span className="eyebrow">Three pillars</span>
        <h2 className="title">Singular. Serene. Wild.</h2>
        <p className="lede">
          Every design and operational decision carries at least one of these. If it carries none, we cut it.
        </p>
        <div className="pillars">
          <div className="pillar">
            <div className="pillar__dev">एकम्</div>
            <div className="pillar__name">Singular</div>
            <p className="pillar__body">
              The cabin is constant. The land speaks the difference. No two sunsets hit the same ridge the same way.
            </p>
          </div>
          <div className="pillar">
            <div className="pillar__dev">शान्ति</div>
            <div className="pillar__name">Serene</div>
            <p className="pillar__body">
              Quiet by design. A kettle, a window, the long exhale at six in the morning. The voice mirrors that calm.
            </p>
          </div>
          <div className="pillar">
            <div className="pillar__dev">वन्य</div>
            <div className="pillar__name">Wild</div>
            <p className="pillar__body">
              Off-grid, off-map, on its own. Harder-to-reach places, on purpose. The reward of arrival is the entire experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
window.PillarsBlock = PillarsBlock;
