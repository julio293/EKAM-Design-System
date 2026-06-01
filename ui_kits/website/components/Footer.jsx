/* global React */
function Footer({ onBook }) {
  return (
    <footer>
      <div className="footer__top">
        <div className="footer__brand">
          <svg><use href="#wm-dark" /></svg>
          <p>Hospitality, disguised as solitude. A network of singular cabins in India's quietest corners — for people who want to meet the forest, not their feed.</p>
        </div>
        <div className="footer__col">
          <h5>Stays</h5>
          <ul>
            <li><a href="#kutir">Kutir · Chitkul</a></li>
            <li><a href="#van">Van · Baspa Valley</a></li>
            <li><a href="#shikhar">Shikhar · Kalpa</a></li>
            <li><a href="#shikhar">Shikhar · Nako</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h5>Read</h5>
          <ul>
            <li><a href="#journal">The journal</a></li>
            <li><a href="#sust">Sustainability roadmap</a></li>
            <li><a href="#touchpoints">The touchpoints</a></li>
            <li><a href="#bos">Brand operating system</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h5>The house</h5>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#chai">Chai</a></li>
            <li><a href="#residency">Residency</a></li>
            <li><a href="#contact">Write to a host</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__legal">
        <span>© 2026 Ekam Hospitality. The cabin is the constant.</span>
        <span>#EkamCabins · Crafted in India</span>
      </div>
    </footer>
  );
}
window.Footer = Footer;
