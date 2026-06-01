/* global React */
function JournalTeaser() {
  return (
    <section className="surface is-sand" id="journal">
      <div className="container">
        <div className="journal">
          <div>
            <span className="eyebrow">A journal of the season</span>
            <h2 className="title">Volume XI. Spring 2026.</h2>
            <p className="lede">
              Photographs and writing from the season's stays. The book sits on the porch. The guest reads it. The guest does not take it.
            </p>
            <p className="body">
              One volume per season. Numbered. Cloth-bound in deep forest. Letterpress on cream Mohawk. Inside: an essay from a guest writer, a host's diary, and the season's birds — Himalayan monal, lammergeier, koklass.
            </p>
            <p className="body" style={{marginTop: 28}}>
              The journal is not sold. It is the cabin's. You read it, leave a sentence in the margin if you like, and let it wait for the next stay.
            </p>
          </div>
          <div className="journal__cover">
            <div>
              <div className="journal__cover-top">एकम्</div>
            </div>
            <div>
              <div className="journal__cover-mark">E<span className="b"></span>KAM</div>
              <div style={{height: 14}}></div>
              <div className="journal__cover-title">a journal of the season</div>
            </div>
            <div className="journal__cover-foot">Volume XI · Spring 2026</div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.JournalTeaser = JournalTeaser;
