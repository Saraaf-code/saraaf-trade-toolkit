/**
 * Saraaf Trade Toolkit - Container CBM & Load Estimator Engine
 */

function runCbmCalc() {
  const length = parseFloat(document.getElementById('cbm-box-length').value);
  const width = parseFloat(document.getElementById('cbm-box-width').value);
  const height = parseFloat(document.getElementById('cbm-box-height').value);
  const unit = document.getElementById('cbm-dim-unit').value;
  const boxes = parseInt(document.getElementById('cbm-total-boxes').value);
  const boxWeight = parseFloat(document.getElementById('cbm-box-weight').value) || 0;

  if (isNaN(length) || isNaN(width) || isNaN(height) || isNaN(boxes) || length <= 0 || width <= 0 || height <= 0 || boxes <= 0) {
    document.getElementById('cbm-results-card').classList.add('hidden');
    return;
  }

  let factorToMeters = 0.01;
  if (unit === 'm') factorToMeters = 1.0;
  if (unit === 'in') factorToMeters = 0.0254;

  const singleBoxCbm = (length * factorToMeters) * (width * factorToMeters) * (height * factorToMeters);
  const totalCbm = singleBoxCbm * boxes;
  const totalGrossWeightKg = boxWeight * boxes;

  document.getElementById('output-cbm-total').textContent = 
    totalCbm.toFixed(3) + ' CBM' + (totalGrossWeightKg > 0 ? ' (' + (totalGrossWeightKg/1000).toFixed(2) + ' MT)' : '');

  const containers = [
    { name: '20ft Standard Container', cbm: 33.2, maxWeightKg: 28230 },
    { name: '40ft Standard Container', cbm: 67.7, maxWeightKg: 26700 },
    { name: '40ft High Cube (HC)', cbm: 76.3, maxWeightKg: 28600 }
  ];

  const breakdown = document.getElementById('cbm-breakdown-list');
  let itemsHtml = `<li><strong>Single Carton Volume:</strong> ${length} × ${width} × ${height} ${unit} = <strong>${singleBoxCbm.toFixed(4)} CBM per box</strong></li>`;

  containers.forEach(c => {
    const volUtil = ((totalCbm / c.cbm) * 100).toFixed(1);
    const boxesByVol = Math.floor(c.cbm / singleBoxCbm);
    let weightWarning = '';

    if (totalGrossWeightKg > 0 && totalGrossWeightKg > c.maxWeightKg) {
      weightWarning = ` <span style="color: var(--color-error, #ef4444); font-weight: bold;">[Warning: Exceeds ${c.maxWeightKg.toLocaleString()} kg payload limit!]</span>`;
    }

    itemsHtml += `
      <li>
        <strong>${c.name}:</strong> 
        Utilizes <strong>${volUtil}%</strong> of capacity (${totalCbm.toFixed(2)} / ${c.cbm} CBM). 
        Max unit capacity: ~<strong>${boxesByVol.toLocaleString()} cartons</strong>.${weightWarning}
      </li>
    `;
  });

  if (breakdown) breakdown.innerHTML = itemsHtml;
  document.getElementById('cbm-results-card').classList.remove('hidden');
}
