/* global React */
function NavBar({ onBook, onSaved, dark = false }) {
  const { count } = window.useFavorites();
  return (
    <nav className={`nav ${dark ? 'is-dark' : ''}`}>
      <a href="#" className="nav__brand" aria-label="EKAM">
        <svg><use href={dark ? '#wm-dark' : '#wm-light'} /></svg>
      </a>
      <div className="nav__links">
        <a href="#stays" className="on">Stays</a>
        <a href="#portfolio">Cabins</a>
        <a href="#locations">Map</a>
        <a href="#about">Story</a>
        <a href="#journal">Journal</a>
      </div>
      <div className="nav__right">
        <button className="nav__saved" onClick={onSaved} aria-label="Saved cabins">
          <svg viewBox="0 0 24 24" width="16" height="16" fill={count > 0 ? '#B4613A' : 'none'} stroke="#B4613A" strokeWidth="1.6">
            <path d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" />
          </svg>
          <span>Saved{count > 0 ? ` · ${count}` : ''}</span>
        </button>
        <button className="nav__cta" onClick={onBook} style={{ borderRadius: "0px" }}>Find your Ekam</button>
      </div>
    </nav>);

}
window.NavBar = NavBar;