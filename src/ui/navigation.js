/**
 * Navigation Module - Handles tool switching and placeholder views
 */

import { renderCommodityConverter } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  const navTabs = document.querySelectorAll('.nav-tab');
  const mainContent = document.getElementById('main-content');

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
