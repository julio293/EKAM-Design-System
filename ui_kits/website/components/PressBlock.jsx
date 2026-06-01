/* global React */
function PressBlock() {
  const quotes = [
    { src: 'Condé Nast Traveller',  line: 'The most considered new stay in the Indian Himalaya — quiet to the point of being radical.' },
    { src: 'Monocle',               line: 'A hospitality brand that has read its own manual. Restraint becomes the offer.' },
    { src: 'The Hindu BusinessLine',line: 'Sustainability baked in at design stage, not bolted on as an SOP.' },
  ];

  return (
    <section className="surface is-forest" id="press">
      <div className="container">
        <span className="eyebrow eyebrow--onforest" style={{color: 'var(--moss-on-forest)'}}>— Read elsewhere</span>
        <h2 className="title">What others said, after they left.</h2>
        <div className="press-grid">
          {quotes.map((q, i) => (
            <figure className="press" key={i}>
              <blockquote className="press__line">"{q.line}"</blockquote>
              <figcaption className="press__src">— {q.src}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
window.PressBlock = PressBlock;
