/**
 * Navigation Module - Handles tool switching, placeholder views, and PWA Install Button
 */

import { renderCommodityConverter } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  const navTabs = document.querySelectorAll('.nav-tab');
  const mainContent = document.getElementById('main-content');
  const installBtn = document.getElementById('install-app-btn');

  let deferredPrompt;

  // Listen for Chrome's native install prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });

  // Handle Install Button Click
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response: ${outcome}`);
        deferredPrompt = null;
      } else {
        alert("To install on Android / Chrome:\n\n1. Tap the 3 dots menu (⋮) at top-right.\n2. Select 'Add to Home screen' or 'Install app'.");
      }
    });
  }

  // Render content based on selected tab key
  function renderToolView(toolKey) {
    if (toolKey === 'commodity-converter') {
      renderCommodityConverter(mainContent);
    } else {
      mainContent.innerHTML = `
        <div class="tool-card coming-soon-container">
          <h2 class="coming-soon-title">Coming Soon</h2>
          <p class="coming-soon-desc">The requested trade tool module is currently under development.</p>
        </div>
      `;
    }
  }

  // Handle click events on navigation tabs
  navTabs.forEach(tab => {
    if (tab.id === 'install-app-btn') return;
    tab.addEventListener('click', (e) => {
      navTabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      
      const selectedTool = e.target.getAttribute('data-tool');
      renderToolView(selectedTool);
    });
  });

  // Initial render on load
  renderToolView('commodity-converter');
});
