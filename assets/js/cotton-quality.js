function syncCotton(source,target){const a=document.getElementById(source),b=document.getElementById(target);if(a&&b)b.value=a.value;}
function inRange(v,min,max){return v>=min&&v<=max;}
function calculateCottonQuality(){
  const s=Number(document.getElementById('actual-staple').value)||0,m=Number(document.getElementById('actual-mic').value)||0,str=Number(document.getElementById('actual-strength').value)||0,t=Number(document.getElementById('actual-trash').value)||0,mo=Number(document.getElementById('actual-moisture').value)||0;
  const rs1=Number(document.getElementById('req-staple-min').value)||0,rs2=Number(document.getElementById('req-staple-max').value)||0,rm1=Number(document.getElementById('req-mic-min').value)||0,rm2=Number(document.getElementById('req-mic-max').value)||0,rstr=Number(document.getElementById('req-strength').value)||0,rt=Number(document.getElementById('req-trash').value)||0,rmo=Number(document.getElementById('req-moisture').value)||0;
  const checks=[['Staple HVI',inRange(s,rs1,rs2),`${s.toFixed(2)} in vs ${rs1.toFixed(2)}–${rs2.toFixed(2)} in`],['Micronaire',inRange(m,rm1,rm2),`${m.toFixed(1)} vs ${rm1.toFixed(1)}–${rm2.toFixed(1)}`],['Strength',str>=rstr,`${str.toFixed(1)} g/tex vs ≥ ${rstr.toFixed(1)}`],['Trash',t<=rt,`${t.toFixed(1)}% vs ≤ ${rt.toFixed(1)}%`],['Moisture',mo<=rmo,`${mo.toFixed(1)}% vs ≤ ${rmo.toFixed(1)}%`]];
  const score=checks.filter(c=>c[1]).length,qty=Number(document.getElementById('quote-quantity').value)||0,price=Number(document.getElementById('quote-price').value)||0,currency=document.getElementById('quote-currency').value;
  document.getElementById('quality-match').textContent=score+' / 5';document.getElementById('quality-status').textContent=score===5?'All five supplied requirements are met.':'One or more buyer requirements are not met.';
  document.getElementById('quality-breakdown').innerHTML=checks.map(c=>`<li><strong>${c[0]}:</strong> ${c[1]?'PASS':'CHECK'} — ${c[2]}</li>`).join('');
  document.getElementById('quote-qty-result').textContent=qty.toLocaleString()+' MT';document.getElementById('quote-total-result').textContent=currency+' '+(qty*price).toLocaleString(undefined,{maximumFractionDigits:2});
}
document.addEventListener('DOMContentLoaded',calculateCottonQuality);
