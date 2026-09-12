/* Saraaf Trade Toolkit - homepage controller */
function renderToolWall(filter=''){
 const wall=document.getElementById('tool-wall');if(!wall||typeof SARAAF_TOOLS==='undefined')return;
 const visible=SARAAF_TOOLS.filter(t=>t[5]!==false),active=visible.filter(t=>t[3]==='active'),inactive=visible.filter(t=>t[3]!=='active'),ordered=active.concat(inactive),q=filter.trim().toLowerCase();
 const suite=`<a class="tool-card active-card cotton-suite-card" href="cotton/"><span class="badge cotton-suite-badge">Industry Suite</span><h3>Cotton Trade Operating System</h3><p>A connected toolkit for ginners, cotton buyers, sellers and cross-border trade.</p></a>`;
 const matches=q?ordered.filter(t=>(t[1]+' '+t[2]).toLowerCase().includes(q)):ordered;
 wall.innerHTML=(q?'':suite)+matches.map(tool=>{const [id,title,description,status,path]=tool,isActive=status==='active',number=ordered.indexOf(tool)+1,href=path||'coming-soon.html';return `<a class="tool-card ${isActive?'active-card':'disabled-card'}" href="${href}"><span class="badge ${isActive?'badge-active':''}">${isActive?'Active':'Coming Soon'}</span><h3>${number}. ${title}</h3><p>${description}</p></a>`;}).join('');
}
document.addEventListener('DOMContentLoaded',()=>{renderToolWall();document.getElementById('tool-search')?.addEventListener('input',e=>renderToolWall(e.target.value));});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
