function calculateCottonGin(){
  const seed=Number(document.getElementById('seed-cotton').value)||0;
  const turnout=(Number(document.getElementById('turnout').value)||0)/100;
  const bale=Number(document.getElementById('bale-weight').value)||0;
  const lint=seed*turnout;
  const baleMt=bale/1000;
  const bales=baleMt?Math.ceil(lint/baleMt):0;
  document.getElementById('gin-lint').textContent=lint.toLocaleString(undefined,{maximumFractionDigits:3})+' MT';
  document.getElementById('gin-bales').textContent=bales.toLocaleString();
  document.getElementById('gin-bale-mt').textContent=baleMt.toFixed(3)+' MT';
  document.getElementById('gin-note').textContent='Planning estimate only: actual turnout varies with cotton, harvesting conditions and gin process.';
  document.getElementById('gin-breakdown').innerHTML=[
    `<li>Seed cotton: ${seed.toLocaleString()} MT</li>`,
    `<li>Gin turnout: ${((turnout)*100).toFixed(1)}%</li>`,
    `<li>Estimated lint = ${seed.toLocaleString()} × ${turnout.toFixed(3)} = <strong>${lint.toLocaleString(undefined,{maximumFractionDigits:3})} MT</strong></li>`,
    `<li>Bale weight: ${bale.toLocaleString()} kg</li>`,
    `<li>Estimated bales = ${lint.toLocaleString(undefined,{maximumFractionDigits:3})} ÷ ${baleMt.toFixed(3)} = <strong>${bales.toLocaleString()} bales</strong> (rounded up)</li>`
  ].join('');
}
document.addEventListener('DOMContentLoaded',calculateCottonGin);
