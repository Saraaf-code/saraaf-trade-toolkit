function calculateCottonMoisture(){
  const w=Number(document.getElementById('wet-weight').value)||0;
  const m=Number(document.getElementById('actual-moisture').value)||0;
  const r=Number(document.getElementById('reference-moisture').value)||0;
  const dry=w*(1-m/100);
  const ref=r<100?dry/(1-r/100):0;
  const water=w-dry;
  const delta=ref-w;
  document.getElementById('cotton-ref-weight').textContent=ref.toLocaleString(undefined,{maximumFractionDigits:2})+' kg';
  document.getElementById('cotton-dry').textContent=dry.toLocaleString(undefined,{maximumFractionDigits:2})+' kg';
  document.getElementById('cotton-water').textContent=water.toLocaleString(undefined,{maximumFractionDigits:2})+' kg';
  document.getElementById('cotton-moisture-note').textContent=(delta>=0?'Reference-basis weight is higher by ':'Reference-basis weight is lower by ')+Math.abs(delta).toLocaleString(undefined,{maximumFractionDigits:2})+' kg.';
  document.getElementById('cotton-moisture-breakdown').innerHTML=[
    `<li>Observed weight: ${w.toLocaleString()} kg at ${m.toFixed(1)}% moisture</li>`,
    `<li>Dry matter = ${w.toLocaleString()} × (1 − ${m.toFixed(1)} / 100) = <strong>${dry.toLocaleString(undefined,{maximumFractionDigits:2})} kg</strong></li>`,
    `<li>Reference-basis weight = ${dry.toLocaleString(undefined,{maximumFractionDigits:2})} ÷ (1 − ${r.toFixed(1)} / 100) = <strong>${ref.toLocaleString(undefined,{maximumFractionDigits:2})} kg</strong></li>`,
    `<li>Water contained in observed bale = <strong>${water.toLocaleString(undefined,{maximumFractionDigits:2})} kg</strong></li>`
  ].join('');
}
document.addEventListener('DOMContentLoaded',calculateCottonMoisture);
