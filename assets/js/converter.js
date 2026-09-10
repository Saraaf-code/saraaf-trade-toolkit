/**
 * Saraaf Trade Toolkit - Commodity Price Converter Engine
 */

const unitRatiosInKg = {
  kg: 1,
  g: 0.001,
  mt: 1000,
  lb: 0.45359237,
  oz: 0.028349523125,
  maund: 37.3242,   // Traditional Maund (37.3242 kg)
  maund40: 40,     // Commercial Metric Maund (40 kg)
  seer: 0.9331
};

function setMode(mode) {
  document.querySelectorAll('.pill-toggle-group .pill-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById('btn-mode-' + mode);
  if (activeBtn) activeBtn.classList.add('active');

  const manualBox = document.getElementById('manual-rate-box');
  const stateBankBox = document.getElementById('statebank-rate-box');

  if (mode === 'manual') {
    manualBox?.classList.remove('hidden');
    stateBankBox?.classList.add('hidden');
  } else if (mode === 'statebank') {
    manualBox?.classList.add('hidden');
    stateBankBox?.classList.remove('hidden');
  } else if (mode === 'live') {
    alert('Live Market exchange rate integration is coming in Phase 2.');
  }
}

function runCalculation() {
  const amount = parseFloat(document.getElementById('input-amount').value);
  const price = parseFloat(document.getElementById('input-price').value);
  
  // Read manual rate reliably
  const rateInput = document.getElementById('input-exchange-rate');
  const exchangeRate = (rateInput && rateInput.value && parseFloat(rateInput.value) > 0) 
    ? parseFloat(rateInput.value) 
    : 1.0;

  const srcUnit = document.getElementById('select-source-unit').value;
  const tgtUnit = document.getElementById('select-target-unit').value;

  if (isNaN(amount) || isNaN(price) || amount <= 0 || price <= 0) {
    document.getElementById('results-card').classList.add('hidden');
    return;
  }

  const srcRatio = unitRatiosInKg[srcUnit] || 1;
  const tgtRatio = unitRatiosInKg[tgtUnit] || 1;

  const priceInTargetCurr = price * exchangeRate;
  const pricePerKgInTargetCurr = priceInTargetCurr / srcRatio;
  const pricePerTargetUnit = pricePerKgInTargetCurr * tgtRatio;
  
  const totalOrderValueTargetCurrency = priceInTargetCurr * amount;
  const totalWeightInKg = amount * srcRatio;
  const totalWeightInTargetUnit = totalWeightInKg / tgtRatio;

  const unitDecimals = pricePerTargetUnit < 0.1 ? 4 : 2;

  document.getElementById('output-target-price').textContent = 
    pricePerTargetUnit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: unitDecimals }) + ' / ' + tgtUnit.toUpperCase();

  document.getElementById('output-total-value').textContent = 
    totalOrderValueTargetCurrency.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const breakdown = document.getElementById('breakdown-list');
  if (breakdown) {
    breakdown.innerHTML = `
      <li><strong>Step 1 (Currency & Unit Base Rate):</strong> ${price} Base Currency × Exchange Rate (${exchangeRate}) = ${priceInTargetCurr.toFixed(4)} Target Currency per ${srcUnit.toUpperCase()}</li>
      <li><strong>Step 2 (Converted Target Unit Price):</strong> ${priceInTargetCurr.toFixed(4)} per ${srcUnit.toUpperCase()} = <strong>${pricePerTargetUnit.toFixed(4)} Target Currency per ${tgtUnit.toUpperCase()}</strong></li>
      <li><strong>Step 3 (Converted Total Volume):</strong> ${amount.toLocaleString()} ${srcUnit.toUpperCase()} = <strong>${totalWeightInTargetUnit.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${tgtUnit.toUpperCase()}</strong></li>
      <li><strong>Step 4 (Total Settlement Value):</strong> ${amount.toLocaleString()} ${srcUnit.toUpperCase()} × ${priceInTargetCurr.toFixed(4)} = <strong>${totalOrderValueTargetCurrency.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Total Target Currency</strong></li>
    `;
  }

  document.getElementById('results-card').classList.remove('hidden');
}

function copyResults() {
  const outputVal = document.getElementById('output-target-price').textContent;
  const totalVal = document.getElementById('output-total-value').textContent;
  const summaryText = 'Saraaf Trade Summary | Total Settlement Value: ' + totalVal + ' | Target Unit Price: ' + outputVal;

  const btn = document.getElementById('btn-copy-results');

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(summaryText).then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy Results', 2000);
    }).catch(() => fallbackCopyText(summaryText, btn));
  } else {
    fallbackCopyText(summaryText, btn);
  }
}

function fallbackCopyText(text, btn) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy Results', 2000);
  } catch (err) {
    console.error('Fallback copy failed', err);
  }
  document.body.removeChild(textArea);
}
