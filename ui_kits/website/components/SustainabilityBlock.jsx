/* global React */
function SustainabilityBlock() {
  const commitments = [
    { num: '01', metric: '≤ 7%',     unit: 'land conversion',    body: 'The cabin and the land it sits on are the asset. The ground-screw foundation lets a site return to baseline within 24 months if we ever leave.' },
    { num: '02', metric: '≥ 80%',    unit: 'recycled material',  body: 'Walls, floors, roof — Wood-Plastic Composite with majority post-consumer fibre. Termite-resistant, monsoon-graded, designed for disassembly.' },
    { num: '03', metric: '55%',      unit: 'local hire',         body: 'Blended across all sites by Year 3. A six-month skill academy that recruits from the panchayat, not the next metro.' },
    { num: '04', metric: 'Net-neutral', unit: 'water by year 3', body: 'Rainwater harvest on every cabin. Biological STP. Treated water re-used for irrigation and toilets, never released to a watercourse.' },
  ];

  return (
    <section className="surface" id="sustainability">
      <div className="container">
        <span className="eyebrow">— Sustainability is the design</span>
        <h2 className="title">Built into the cabin, not bolted on after.</h2>
        <p className="lede">
          Four commitments, kept at every site. We measure them quarterly, not in the annual report.
        </p>
        <div className="sust-grid">
          {commitments.map((c) => (
            <div className="sust" key={c.num}>
              <span className="sust__num">{c.num}</span>
              <div>
                <div className="sust__metric">
                  <span className="sust__value">{c.metric}</span>
                  <span className="sust__unit">{c.unit}</span>
                </div>
                <p className="sust__body">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.SustainabilityBlock = SustainabilityBlock;
