/**
 * Saraaf Trade Toolkit - Commodity Moisture Calculator Engine
 */

function runMoistureCalc() {
  const mode = document.getElementById('select-moisture-mode').value;
  const weight = parseFloat(document.getElementById('moisture-initial-weight').value);
  const unit = document.getElementById('moisture-weight-unit').value;
  const actualMoisture = parseFloat(document.getElementById('moisture-initial-pct').value);
  const contractMoisture = parseFloat(document.getElementById('moisture-target-pct').value);

  if (isNaN(weight) || isNaN(actualMoisture) || isNaN(contractMoisture) || weight <= 0) {
    document.getElementById('moisture-results-card').classList.add('hidden');
    return;
  }

  const breakdown = document.getElementById('moisture-breakdown-list');

  if (mode === 'drymass') {
    const dryMass = weight * ((100 - actualMoisture) / 100);
    let netPayableWeight = weight;
    let penaltyDeduction = 0;
    
    if (actualMoisture > contractMoisture) {
      netPayableWeight = dryMass / ((100 - contractMoisture) / 100);
      penaltyDeduction = weight - netPayableWeight;
    }

    document.getElementById('output-moisture-label').textContent = 'Net Payable Weight';
    document.getElementById('output-moisture-weight').textContent = 
      netPayableWeight.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ' + unit;

    if (breakdown) {
      breakdown.innerHTML = `
        <li><strong>Absolute Dry Mass (0% Moisture):</strong> ${weight} ${unit} × (100% - ${actualMoisture}%) = <strong>${dryMass.toFixed(2)} ${unit}</strong></li>
        <li><strong>Contract Limit Allowed Margin:</strong> ${contractMoisture}% max moisture threshold</li>
        <li><strong>Excess Moisture Deduction:</strong> ${penaltyDeduction > 0 ? penaltyDeduction.toFixed(2) + ' ' + unit + ' (' + ((penaltyDeduction/weight)*100).toFixed(2) + '% penalty)' : '0.00 ' + unit + ' (Within allowed limit)'}</li>
        <li><strong>Final Payable Lot Weight:</strong> <strong>${netPayableWeight.toFixed(2)} ${unit}</strong></li>
      `;
    }

  } else {
    const dryMatterPct = (100 - actualMoisture) / 100;
    const targetDryMatterPct = (100 - contractMoisture) / 100;
    const adjustedWeight = weight * (dryMatterPct / targetDryMatterPct);
    const weightDifference = adjustedWeight - weight;

    document.getElementById('output-moisture-label').textContent = 'Adjusted Commercial Weight';
    document.getElementById('output-moisture-weight').textContent = 
      adjustedWeight.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ' + unit;

    if (breakdown) {
      breakdown.innerHTML = `
        <li><strong>Dry Matter Ratio:</strong> (100% - ${actualMoisture}%) ÷ (100% - ${contractMoisture}%) = ${(dryMatterPct / targetDryMatterPct).toFixed(6)}</li>
        <li><strong>Adjusted Lot Weight:</strong> ${weight} ${unit} × ${(dryMatterPct / targetDryMatterPct).toFixed(6)} = <strong>${adjustedWeight.toFixed(2)} ${unit}</strong></li>
        <li><strong>Commercial Shrink / Variance:</strong> ${weightDifference >= 0 ? '+' + weightDifference.toFixed(2) : weightDifference.toFixed(2)} ${unit}</li>
      `;
    }
  }

  document.getElementById('moisture-results-card').classList.remove('hidden');
}
