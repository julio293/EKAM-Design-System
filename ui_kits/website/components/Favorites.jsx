/* global React */
// EKAM favorites store — shared between portfolio, nav, saved panel, property page
window.EkamFavorites = (function() {
  const KEY = 'ekam.favorites';
  let listeners = [];

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch { return []; }
  }
  function write(arr) {
    localStorage.setItem(KEY, JSON.stringify(arr));
    listeners.forEach(fn => fn(arr));
  }
  function has(id) { return read().includes(id); }
  function toggle(id) {
    const cur = read();
    const next = cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id];
    write(next);
    return next;
  }
  function list() { return read(); }
  function subscribe(fn) { listeners.push(fn); return () => { listeners = listeners.filter(f => f !== fn); }; }

  return { has, toggle, list, subscribe };
})();

// Hook for components
window.useFavorites = function useFavorites() {
  const [items, setItems] = React.useState(() => window.EkamFavorites.list());
  React.useEffect(() => window.EkamFavorites.subscribe(setItems), []);
  return {
    items,
    has: (id) => items.includes(id),
    toggle: (id) => window.EkamFavorites.toggle(id),
    count: items.length,
  };
};
