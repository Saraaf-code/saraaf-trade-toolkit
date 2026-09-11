/**
 * Saraaf Trade Toolkit - Core App Controller
 */

function switchView(toolId) {
  if (toolId === 'ore-valuation') {
    window.location.href = './tools/ore-valuation-engine.html';
    return;
  }

  document.querySelectorAll('.nav-tab').forEach(btn => {
    const isMatch = btn.getAttribute('onclick')?.includes("'" + toolId + "'");
    btn.classList.toggle('active', isMatch);
  });

  document.querySelectorAll('.tool-view').forEach(view => {
    view.classList.toggle('hidden', view.id !== 'tool-' + toolId);
  });

  if (toolId === 'incoterms' && typeof updateIncotermView === 'function') {
    updateIncotermView();
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('PWA Service Worker active:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}
