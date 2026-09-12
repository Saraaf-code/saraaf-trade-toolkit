/* Saraaf Trade Toolkit - homepage controller */
const HIDDEN_KEY = 'saraaf_hidden_tools';
const getHiddenTools = () => new Set(JSON.parse(localStorage.getItem(HIDDEN_KEY) || '[]'));
const saveHiddenTools = set => localStorage.setItem(HIDDEN_KEY, JSON.stringify([...set]));

function renderToolWall(filter = '') {
  const wall = document.getElementById('tool-wall');
  if (!wall || typeof SARAAF_TOOLS === 'undefined') return;
  const hidden = getHiddenTools();
  const active = SARAAF_TOOLS.filter(t => t[3] === 'active' && !hidden.has(t[0]));
  const inactive = SARAAF_TOOLS.filter(t => t[3] !== 'active' && !hidden.has(t[0]));
  const ordered = active.concat(inactive);
  const q = filter.trim().toLowerCase();
  const matches = q ? ordered.filter(t => (t[1] + ' ' + t[2]).toLowerCase().includes(q)) : ordered;
  wall.innerHTML = matches.map(tool => {
    const [id,title,description,status,path] = tool;
    const isActive = status === 'active';
    const number = SARAAF_TOOLS.indexOf(tool) + 1;
    const href = path || 'coming-soon.html';
    return `<a class="tool-card ${isActive ? 'active-card' : 'disabled-card'}" href="${href}"><span class="badge ${isActive ? 'badge-active' : ''}">${isActive ? 'Active' : 'Coming Soon'}</span><h3>${number}. ${title}</h3><p>${description}</p></a>`;
  }).join('');
}

function addHiddenToolsControl() {
  const nav = document.querySelector('.header-nav');
  if (!nav) return;
  const button = document.createElement('button');
  button.className = 'nav-tab';
  button.type = 'button';
  button.textContent = 'Show Hidden';
  button.addEventListener('click', () => {
    localStorage.removeItem(HIDDEN_KEY);
    renderToolWall(document.getElementById('tool-search')?.value || '');
  });
  nav.appendChild(button);
}

document.addEventListener('DOMContentLoaded', () => {
  renderToolWall();
  addHiddenToolsControl();
  document.getElementById('tool-search')?.addEventListener('input', e => renderToolWall(e.target.value));
});

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
