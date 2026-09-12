/* HS 2022 lookup data loader. Source dataset: datasets/harmonized-system, version 2022.0. */
const HS_DATA_URL='https://raw.githubusercontent.com/datasets/harmonized-system/main/data/harmonized-system.csv';
let hsChapters=[];
function parseCSV(text){
  const rows=[];let row=[];let cell='';let quote=false;
  for(let i=0;i<text.length;i++){
    const c=text[i],n=text[i+1];
    if(c==='"'&&quote&&n==='"'){cell+='"';i++;continue;}
    if(c==='"'){quote=!quote;continue;}
    if(c===','&&!quote){row.push(cell);cell='';continue;}
    if((c==='\n'||c==='\r')&&!quote){if(c==='\r'&&n==='\n')i++;row.push(cell);cell='';if(row.length)rows.push(row);row=[];continue;}
    cell+=c;
  }
  if(cell||row.length){row.push(cell);rows.push(row);} return rows;
}
function buildHierarchy(text){
  const rows=parseCSV(text).slice(1);const chapters=[];const byCode={};
  rows.forEach(r=>{const [section,code,description,parent,level]=r;if(level==='2'){const ch={code,description,section,headings:[]};chapters.push(ch);byCode[code]=ch;}});
  rows.forEach(r=>{const [section,code,description,parent,level]=r;if(level==='4'&&byCode[parent])byCode[parent].headings.push({code,description});});
  return chapters;
}
function renderHS(query=''){
  const list=document.getElementById('hs-list');const q=query.trim().toLowerCase();
  const filtered=hsChapters.map(ch=>({...ch,headings:ch.headings.filter(h=>!q||(h.code+' '+h.description).toLowerCase().includes(q))})).filter(ch=>!q||(ch.code+' '+ch.description).toLowerCase().includes(q)||ch.headings.length);
  list.innerHTML=filtered.map(ch=>`<details class="hs-chapter" ${q?'open':''}><summary><span class="hs-code">HS ${ch.code}</span><span class="hs-chapter-name">${ch.description}</span><span class="hs-count">${ch.headings.length} headings</span></summary><div class="hs-headings">${ch.headings.map(h=>`<div class="hs-heading"><strong>${h.code}</strong><span>${h.description}</span></div>`).join('')}</div></details>`).join('');
  document.getElementById('hs-status').innerHTML=`<strong>${filtered.length} chapters shown</strong><p>${filtered.reduce((n,c)=>n+c.headings.length,0).toLocaleString()} four-digit headings shown. Source: HS 2022 global nomenclature dataset.</p>`;
}
async function loadHS(){
  try{const response=await fetch(HS_DATA_URL);if(!response.ok)throw new Error('HTTP '+response.status);hsChapters=buildHierarchy(await response.text());renderHS();}
  catch(err){document.getElementById('hs-status').innerHTML='<strong>HS list could not be loaded.</strong><p>Please refresh the page while connected to the internet. The lookup uses the public HS 2022 dataset.</p>';}}
document.addEventListener('DOMContentLoaded',()=>{document.getElementById('hs-search')?.addEventListener('input',e=>renderHS(e.target.value));loadHS();});
