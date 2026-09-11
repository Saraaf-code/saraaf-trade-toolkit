/**
 * Saraaf Trade Toolkit - Ore Engine (Rich Interactive Version)
 */

// Sync Range Slider with Number Inputs
function syncOreInput(inputId, sliderId) {
  const input = document.getElementById(inputId);
  const slider = document.getElementById(sliderId);
  if (input && slider) {
    slider.value = input.value;
    runOreValuation();
  }
}

function syncOreSlider(sliderId, inputId) {
  const slider = document.getElementById(sliderId);
  const input = document.getElementById(inputId);
  if (input && slider) {
    input.value = slider.value;
    runOreValuation();
  }
}

function runOreValuation() {
  const dryWeightMT = parseFloat(document.getElementById('ore-dry-weight')?.value) || 0;
  const gradePct = parseFloat(document.getElementById('ore-grade-pct')?.value) || 0;
  const benchmarkPriceUSD = parseFloat(document.getElementById('ore-benchmark-price')?.value) || 0;
  const payabilityPct = parseFloat(document.getElementById('ore-payability-pct')?.value) || 100;
  const tcDeduction = parseFloat(document.getElementById('ore-tc-deduction')?.value) || 0;
  const rcDeduction = parseFloat(document.getElementById('ore-rc-deduction')?.value) || 0;
  const freightPerMT = parseFloat(document.getElementById('ore-freight-cost')?.value) || 0;

  if (dryWeightMT <= 0 || gradePct <= 0 || benchmarkPriceUSD <= 0) {
    return;
  }

  // Contained Metal Value
  const containedMetalMT = dryWeightMT * (gradePct / 100);
  const grossContainedValue = containedMetalMT * benchmarkPriceUSD;

  // Payability & Treatment/Refining Adjustments
  const payableMetalValue = grossContainedValue * (payabilityPct / 100);
  const totalTreatmentCost = dryWeightMT * tcDeduction;
  const totalRefiningCost = containedMetalMT * rcDeduction;
  const totalFreightCost = dryWeightMT * freightPerMT;

  // Net Commercial Settlement
  const netSettlementUSD = payableMetalValue - totalTreatmentCost - totalRefiningCost - totalFreightCost;
  const netValuePerMT = netSettlementUSD / dryWeightMT;

  // Update UI Displays
  const elNetVal = document.getElementById('output-ore-net-value');
  const elPerMt = document.getElementById('output-ore-per-mt');
  
  if (elNetVal) elNetVal.textContent = '$' + netSettlementUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (elPerMt) elPerMt.textContent = '$' + netValuePerMT.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' / DMT';

  const breakdown = document.getElementById('ore-breakdown-list');
  if (breakdown) {
    breakdown.innerHTML = `
      <li><strong>Dry Weight & Grade:</strong> ${dryWeightMT.toLocaleString()} DMT @ ${gradePct}% Grade = <strong>${containedMetalMT.toFixed(3)} MT Contained Metal</strong></li>
      <li><strong>Gross Contained Value:</strong> ${containedMetalMT.toFixed(3)} MT × $${benchmarkPriceUSD.toLocaleString()} = <strong>$${grossContainedValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></li>
      <li><strong>Payability Adjustment (${payabilityPct}%):</strong> <strong>$${payableMetalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></li>
      <li><strong>Deductions (TC/RC/Freight):</strong> Treatment ($${totalTreatmentCost.toLocaleString()}) + Refining ($${totalRefiningCost.toLocaleString()}) + Freight ($${totalFreightCost.toLocaleString()}) = <strong>-$${(totalTreatmentCost + totalRefiningCost + totalFreightCost).toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></li>
      <li><strong>Net Payable Lot Value:</strong> <strong>$${netSettlementUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></li>
    `;
  }
}

// Native Web Share API (Mobile WhatsApp / Messages / AirDrop)
function shareOreResults() {
  const totalVal = document.getElementById('output-ore-net-value')?.textContent || '';
  const perMtVal = document.getElementById('output-ore-per-mt')?.textContent || '';
  const shareText = `Saraaf Ore Valuation Summary | Net Lot Value: ${totalVal} (${perMtVal})`;

  if (navigator.share) {
    navigator.share({
      title: 'Saraaf Trade Toolkit - Ore Valuation',
      text: shareText,
      url: window.location.href
    }).catch(err => console.log('Share canceled', err));
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Valuation summary copied to clipboard!');
    });
  }
}

// Print / Export to PDF Feature
function printOrePDF() {
  window.print();
}
