/**
 * Navigation Module - Handles tool switching, placeholder views, and PWA Install Prompt
 */

import { renderCommodityConverter } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  const navTabs = document.querySelectorAll('.nav-tab');
  const mainContent = document.getElementById('main-content');
  const installBtn = document.getElementById('install-app-btn');

  let deferredPrompt;

  // Catch the browser's install event and show the "Install App" button
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) {
      installBtn.style.display = 'inline-block';
    }
  });

  // Handle click on custom Install App button
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
      deferredPrompt = null;
      installBtn.style.display = 'none';
    });
  }

  // Hide button if already installed
  window.addEventListener('appinstalled', () => {
    if (installBtn) installBtn.style.display = 'none';
    deferredPrompt = null;
    console.log('Saraaf Trade Toolkit was successfully installed!');
  });

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
