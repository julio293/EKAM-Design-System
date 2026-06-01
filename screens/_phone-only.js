/* ═══════════════════════════════════════════════════════════════
   EKAM Mobile · phone-only viewer — scaler
   ───────────────────────────────────────────────────────────────
   Computes a transform: scale() on .phone so it fits the viewport,
   accounting for the floating .tabs dock at the top.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const DESIGN_W = 380;
  const DESIGN_H = 800;

  function fit() {
    const phone = document.querySelector('.phone');
    if (!phone) return;
    const noTabs = document.body.classList.contains('no-tabs');
    const topReserve = noTabs ? 40 : 110;   // tab dock + breathing room
    const bottomReserve = 28;
    const sideReserve = 24;

    const availH = window.innerHeight - topReserve - bottomReserve;
    const availW = window.innerWidth - sideReserve;

    const scale = Math.min(1, availH / DESIGN_H, availW / DESIGN_W);
    document.documentElement.style.setProperty('--phone-scale', scale.toFixed(3));

    // Shrink the wrap height so the scaled phone doesn't leave a gap
    const wrap = phone.closest('.phone-wrap');
    if (wrap) {
      wrap.style.minHeight = (DESIGN_H * scale + topReserve + bottomReserve) + 'px';
    }
  }

  // Wait for React to mount the phone, then size it.
  function waitForPhone(retries) {
    if (document.querySelector('.phone')) { fit(); return; }
    if (retries <= 0) return;
    setTimeout(() => waitForPhone(retries - 1), 100);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitForPhone(50));
  } else {
    waitForPhone(50);
  }
  window.addEventListener('resize', fit);

  // React re-renders may swap out the .phone — observe to refit
  const mo = new MutationObserver(() => {
    if (document.querySelector('.phone')) fit();
  });
  document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    if (root) mo.observe(root, { childList: true, subtree: true });
  });
})();
