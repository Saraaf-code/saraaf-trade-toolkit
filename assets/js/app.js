/**
 * Saraaf Trade Toolkit - Core App Controller & View Switcher
 */

function switchView(toolId) {
  // Hide all tool views
  const views = document.querySelectorAll('.tool-view');
  views.forEach(view => view.classList.add('hidden'));

  // Remove active state from header tabs
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => tab.classList.remove('active'));

  // Show the selected view section in index.html
  const targetView = document.getElementById('tool-' + toolId);
  if (targetView) {
    targetView.classList.remove('hidden');
  }

  // Highlight the active navigation tab
  const activeTab = Array.from(tabs).find(tab => 
    tab.getAttribute('onclick')?.includes("'" + toolId + "'")
  );
  if (activeTab) {
    activeTab.classList.add('active');
  }

  // Trigger tool-specific view initializers when navigating
  if (toolId === 'incoterms' && typeof updateIncotermView === 'function') {
    updateIncotermView();
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Service Worker Registration for PWA Support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('PWA Service Worker active:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}
