/* Saraaf Trade Toolkit - homepage controller */
const SARAAF_HIDDEN_TOOLS = new Set();

function renderToolWall(filter = '') {
  const wall = document.getElementById('tool-wall');
  if (!wall || typeof SARAAF_TOOLS === 'undefined') return;
  const visible = SARAAF_TOOLS.filter(t => !SARAAF_HIDDEN_TOOLS.has(t[0]));
  const active = visible.filter(t => t[3] === 'active');
  const inactive = visible.filter(t => t[3] !== 'active');
  const ordered = active.concat(inactive);
  const q = filter.trim().toLowerCase();
  const matches = q ? ordered.filter(t => (t[1] + ' ' + t[2]).toLowerCase().includes(q)) : ordered;

  wall.innerHTML = matches.map((tool, index) => {
    const [id,title,description,status,path] = tool;
    const isActive = status === 'active';
    const href = path || 'coming-soon.html';
    return `<a class="tool-card ${isActive ? 'active-card' : 'disabled-card'}" href="${href}"><span class="badge ${isActive ? 'badge-active' : ''}">${isActive ? 'Active' : 'Coming Soon'}</span><h3>${index + 1}. ${title}</h3><p>${description}</p></a>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderToolWall();
  document.getElementById('tool-search')?.addEventListener('input', e => renderToolWall(e.target.value));
});

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
