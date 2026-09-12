function calculateCottonContainer(){
  const target=Number(document.getElementById('container-target').value)||0;
  const baleW=Number(document.getElementById('container-bale-weight').value)||0;
  const baleV=Number(document.getElementById('container-bale-volume').value)||0;
  const volume=Number(document.getElementById('container-volume').value)||0;
  const payload=Number(document.getElementById('container-payload').value)||0;
  const fill=(Number(document.getElementById('container-fill').value)||0)/100;
  const usable=volume*fill;
  const byWeight=baleW?Math.floor(payload/baleW):0;
  const byVolume=baleV?Math.floor(usable/baleV):0;
  const bales=Math.max(0,Math.min(byWeight,byVolume));
  const mt=bales*baleW/1000;
  const totalBales=baleW?Math.ceil(target*1000/baleW):0;
  const containers=bales?Math.ceil(totalBales/bales):0;
  const limiter=byVolume<byWeight?'volume/space':byWeight<byVolume?'payload weight':'both';
  document.getElementById('container-count').textContent=containers.toLocaleString();
  document.getElementById('container-bales').textContent=bales.toLocaleString();
  document.getElementById('container-mt').textContent=mt.toFixed(3);
  document.getElementById('container-limit-note').textContent=`Container capacity is limited by ${limiter}.`;
  document.getElementById('container-breakdown').innerHTML=[
    `<li>Required shipment: ${target.toLocaleString()} MT ≈ <strong>${totalBales.toLocaleString()} bales</strong></li>`,
    `<li>Practical usable volume = ${volume.toFixed(2)} × ${fill.toFixed(2)} = <strong>${usable.toFixed(2)} m³</strong></li>`,
    `<li>Bales by payload = floor(${payload.toLocaleString()} ÷ ${baleW.toLocaleString()}) = <strong>${byWeight}</strong></li>`,
    `<li>Bales by volume = floor(${usable.toFixed(2)} ÷ ${baleV.toFixed(2)}) = <strong>${byVolume}</strong></li>`,
    `<li>Practical bales/container = min(${byWeight}, ${byVolume}) = <strong>${bales}</strong></li>`,
    `<li>Containers required = ceil(${totalBales.toLocaleString()} ÷ ${bales||1}) = <strong>${containers.toLocaleString()}</strong></li>`
  ].join('');
}
document.addEventListener('DOMContentLoaded',calculateCottonContainer);
