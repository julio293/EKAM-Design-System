/* global React */
function Hero({ onBook }) {
  return (
    <section className="hero" id="stays">
      <div className="hero__foot">
        <span>एकम् · The Singular</span>
        <span>Singular · Serene · Wild</span>
      </div>
      <div className="hero__inner">
        <div className="hero__dev">एकम्</div>
        <svg className="hero__title" viewBox="0 0 600 200" aria-label="EKAM">
          <text x="60" y="160" fontFamily="Cormorant Garamond, serif" fontWeight="400" fontSize="150" fill="#FAF7F0" letterSpacing="10">E</text>
          <circle cx="200" cy="107" r="10" fill="#B4613A" />
          <text x="240" y="160" fontFamily="Cormorant Garamond, serif" fontWeight="400" fontSize="150" fill="#FAF7F0" letterSpacing="10">KAM</text>
        </svg>
        <div className="hero__rule"></div>
        <p className="hero__sub">
          You've wondered what these places feel like. Here's your chance.
        </p>
        <button className="hero__cta" onClick={onBook} style={{ borderRadius: "0px" }}>
          <span className="dot"></span>
          Find your Ekam
        </button>
      </div>
      <div className="hero__foot">
        <span>Hospitality, disguised as solitude</span>
        <span>Singular · Serene · Wild</span>
      </div>
    </section>);

}
window.Hero = Hero;