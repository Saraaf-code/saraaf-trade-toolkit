/**
 * Saraaf Trade Toolkit - Core App Controller
 *
 * Phase 1 registry keeps independently-built tools easy to activate or hide.
 */

const SARAAF_TOOL_VISIBILITY = {
  oreValuation: true,
  moisture: true,
  converter: true,
  container: true,
  incoterms: true
};

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

function activateIndependentOreTool() {
  if (!SARAAF_TOOL_VISIBILITY.oreValuation) return;

  const hub = document.querySelector('#tool-hub .hub-grid');
  if (!hub || document.getElementById('tool-card-ore-valuation')) return;

  const card = document.createElement('div');
  card.id = 'tool-card-ore-valuation';
  card.className = 'tool-card active-card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.innerHTML = `
    <span class="badge badge-active">Active</span>
    <h3>13. Ore Valuation Engine</h3>
    <p>Estimate settlement value for gold-antimony ore using grade, moisture, payability, and benchmark prices.</p>
  `;
  card.addEventListener('click', () => switchView('ore-valuation'));
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      switchView('ore-valuation');
    }
  });
  hub.appendChild(card);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('PWA Service Worker active:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}

document.addEventListener('DOMContentLoaded', activateIndependentOreTool);
