function calculateCottonTruck(){
  const target=Number(document.getElementById('truck-target').value)||0;
  const baleW=Number(document.getElementById('truck-bale-weight').value)||0;
  const baleV=Number(document.getElementById('truck-bale-volume').value)||0;
  const payload=Number(document.getElementById('truck-payload').value)||0;
  const volume=Number(document.getElementById('truck-volume').value)||0;
  const fill=(Number(document.getElementById('truck-fill').value)||0)/100;
  const volCap=volume*fill;
  const byWeight=baleW?Math.floor(payload/baleW):0;
  const byVolume=baleV?Math.floor(volCap/baleV):0;
  const bales=Math.max(0,Math.min(byWeight,byVolume));
  const mtTruck=bales*baleW/1000;
  const totalBales=baleW?Math.ceil(target*1000/baleW):0;
  const trucks=bales?Math.ceil(totalBales/bales):0;
  const limiter=byVolume<byWeight?'volume/space':byWeight<byVolume?'payload weight':'both';
  document.getElementById('truck-count').textContent=trucks.toLocaleString();
  document.getElementById('truck-bales').textContent=bales.toLocaleString();
  document.getElementById('truck-mt').textContent=mtTruck.toFixed(3);
  document.getElementById('truck-limit-note').textContent=`Truck capacity is limited by ${limiter}.`;
  document.getElementById('truck-breakdown').innerHTML=[
    `<li>Required shipment: ${target.toLocaleString()} MT ≈ <strong>${totalBales.toLocaleString()} bales</strong></li>`,
    `<li>Usable truck volume = ${volume.toFixed(2)} × ${fill.toFixed(2)} = <strong>${volCap.toFixed(2)} m³</strong></li>`,
    `<li>Bales by payload = floor(${payload.toLocaleString()} ÷ ${baleW.toLocaleString()}) = <strong>${byWeight}</strong></li>`,
    `<li>Bales by volume = floor(${volCap.toFixed(2)} ÷ ${baleV.toFixed(2)}) = <strong>${byVolume}</strong></li>`,
    `<li>Practical bales/truck = min(${byWeight}, ${byVolume}) = <strong>${bales}</strong></li>`,
    `<li>Trucks required = ceil(${totalBales.toLocaleString()} ÷ ${bales||1}) = <strong>${trucks.toLocaleString()}</strong></li>`
  ].join('');
}
document.addEventListener('DOMContentLoaded',calculateCottonTruck);
