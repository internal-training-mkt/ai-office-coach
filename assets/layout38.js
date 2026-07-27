(() => {
  function utilityFooter() {
    return [...document.querySelectorAll('footer')].find(f => !f.classList.contains('ux-demo-footer37') && (f.querySelector('.brand') || /fictional demo|AI OFFICE/i.test(f.textContent)));
  }
  function placeFooter() {
    const footer = utilityFooter(), root = document.getElementById('root');
    if (!footer || !root) return;
    footer.classList.add('ux-site-footer38');
    if (footer.parentElement !== root || footer !== root.lastElementChild) root.append(footer);
  }
  function improveSemantics() {
    document.querySelectorAll('main,section').forEach(el => { if (el.id) el.style.scrollMarginTop = '100px'; });
    document.querySelectorAll('button:not([type])').forEach(button => button.type = 'button');
    document.querySelector('.ux-help-button')?.setAttribute('aria-label', document.querySelector('.ux-help-button')?.textContent.trim() || 'Help');
  }
  let queued = false;
  function refresh() { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; placeFooter(); improveSemantics(); }); }
  new MutationObserver(refresh).observe(document.documentElement, { childList: true, subtree: true });
  [0, 120, 500, 1400].forEach(delay => setTimeout(refresh, delay));
})();
