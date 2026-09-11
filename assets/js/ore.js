/**
 * Saraaf Trade Toolkit - Executive Gold-Antimony (Au-Sb) Ore Valuation Engine
 */

const $ = id => document.getElementById(id);

const money = v => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(v);

const defaults = {
  mass: 75,
  moisture: 0.57,
  sbGrade: 42.11,
  sbPrice: 35500,
  sbPay: 60,
  auConc: 9.2,
  auPrice: 139.73,
  auPay: 75
};

function setupOreSlider(sliderId, inputId, defaultValue) {
  const s = $(sliderId);
  const i = $(inputId);
  if (!s || !i) return;

  s.value = defaultValue;
  i.value = defaultValue;

  s.addEventListener('input', () => {
    i.value = s.value;
    calcOreValuation();
  });

  i.addEventListener('input', () => {
    const v = parseFloat(i.value);
    if (!Number.isNaN(v)) {
      s.value = v;
      calcOreValuation();
    }
  });
}

function calcOreValuation() {
  if (!$('mass-input')) return;

  const mass = +$('mass-input').value || 0;
  const m = +$('moisture-input').value || 0;
  const sbg = +$('sb-grade-input').value || 0;
  const sbp = +$('sb-price-input').value || 0;
  const sbpay = +$('sb-pay-input').value || 0;
  const auc = +$('au-conc-input').value || 0;
  const aup = +$('au-price-input').value || 0;
  const aupay = +$('au-pay-input').value || 0;

  const dmt = mass * (1 - m / 100);
  const sbmt = dmt * sbg / 100;
  const sbgross = sbmt * sbp;
  const sbnet = sbgross * sbpay / 100;

  const aug = dmt * auc;
  const augross = aug * aup;
  const aunet = augross * aupay / 100;

  const total = sbnet + aunet;
  const sbShare = total ? (sbnet / total * 100) : 0;
  const auShare = total ? (aunet / total * 100) : 0;

  if ($('total-value')) $('total-value').textContent = money(total);
  if ($('dmt-display')) $('dmt-display').textContent = dmt.toFixed(2) + ' MT';
  if ($('gross-mass-sub')) $('gross-mass-sub').textContent = mass.toFixed(2);
  if ($('moisture-sub')) $('moisture-sub').textContent = m.toFixed(2);

  if ($('flow-raw-dmt')) $('flow-raw-dmt').textContent = dmt.toFixed(2) + ' MT (DMT)';
  if ($('flow-sb-weight')) $('flow-sb-weight').textContent = sbmt.toFixed(2) + ' MT';
  if ($('flow-sb-payout')) $('flow-sb-payout').textContent = money(sbnet);

  if ($('flow-au-weight')) $('flow-au-weight').textContent = aug.toFixed(2) + ' g';
  if ($('flow-au-payout')) $('flow-au-payout').textContent = money(aunet);

  if ($('sb-pct-share')) $('sb-pct-share').textContent = sbShare.toFixed(1) + '%';
  if ($('au-pct-share')) $('au-pct-share').textContent = auShare.toFixed(1) + '%';

  if ($('sb-bar')) $('sb-bar').style.width = sbShare + '%';
  if ($('au-bar')) $('au-bar').style.width = auShare + '%';

  if ($('ledger-sb-gross')) $('ledger-sb-gross').textContent = money(sbgross);
  if ($('ledger-au-gross')) $('ledger-au-gross').textContent = money(augross);
  if ($('ledger-total')) $('ledger-total').textContent = money(total);
}

function generateOreQuoteText() {
  return 'Saraaf Trade Toolkit — Ore Valuation Engine\n\n' +
    'Quote / Deal Reference: ' + ($('quote-ref')?.value || 'Not specified') + '\n' +
    'Counterparty: ' + ($('counterparty')?.value || 'Not specified') + '\n' +
    'Cargo Total Mass: ' + ($('mass-input')?.value || '0') + ' MT\n' +
    'Moisture Reduction: ' + ($('moisture-input')?.value || '0') + '%\n' +
    'Sb Grade: ' + ($('sb-grade-input')?.value || '0') + '%\n' +
    'Sb Benchmark Price: $' + ($('sb-price-input')?.value || '0') + ' / MT\n' +
    'Sb Payability: ' + ($('sb-pay-input')?.value || '0') + '%\n' +
    'Au Concentration: ' + ($('au-conc-input')?.value || '0') + ' g/t\n' +
    'Au Benchmark Price: $' + ($('au-price-input')?.value || '0') + ' / g\n' +
    'Au Payability: ' + ($('au-pay-input')?.value || '0') + '%\n' +
    'DMT: ' + ($('dmt-display')?.textContent || '0.00 MT') + '\n' +
    'Net Settlement: ' + ($('ledger-total')?.textContent || '$0.00') + '\n\n' +
    'Generated: ' + new Date().toLocaleString();
}

async function shareOreQuote() {
  const text = generateOreQuoteText();
  const shareBtn = $('shareBtn');

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Saraaf Ore Valuation Quote',
        text: text
      });
    } catch (e) {
      console.log('Share canceled', e);
    }
  } else if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      if (shareBtn) shareBtn.textContent = 'Quote Copied!';
      setTimeout(() => {
        if (shareBtn) shareBtn.textContent = 'Share Quote';
      }, 1800);
    } catch (err) {
      alert(text);
    }
  }
}

function printOrePDF() {
  window.print();
}

// Universal Tool Rating & Feedback System
function rateOreTool(stars) {
  const starBtns = document.querySelectorAll('.ore-star-btn');
  starBtns.forEach((btn, idx) => {
    btn.style.color = idx < stars ? '#f59e0b' : '#64748b';
  });
  const feedbackMsg = $('ore-rating-msg');
  if (feedbackMsg) {
    feedbackMsg.textContent = `Thank you for rating this tool ${stars} out of 5 stars!`;
    feedbackMsg.style.display = 'block';
  }
}

function submitOreFeedback() {
  const comment = $('ore-feedback-text')?.value;
  if (!comment) return;
  alert('Thank you for your feedback! Our engineering team will review it.');
  if ($('ore-feedback-text')) $('ore-feedback-text').value = '';
}

// Initialize sliders & events
document.addEventListener('DOMContentLoaded', () => {
  setupOreSlider('mass-slider', 'mass-input', defaults.mass);
  setupOreSlider('moisture-slider', 'moisture-input', defaults.moisture);
  setupOreSlider('sb-grade-slider', 'sb-grade-input', defaults.sbGrade);
  setupOreSlider('sb-price-slider', 'sb-price-input', defaults.sbPrice);
  setupOreSlider('sb-pay-slider', 'sb-pay-input', defaults.sbPay);
  setupOreSlider('au-conc-slider', 'au-conc-input', defaults.auConc);
  setupOreSlider('au-price-slider', 'au-price-input', defaults.auPrice);
  setupOreSlider('au-pay-slider', 'au-pay-input', defaults.auPay);

  if ($('printBtn')) $('printBtn').onclick = printOrePDF;
  if ($('shareBtn')) $('shareBtn').onclick = shareOreQuote;

  calcOreValuation();
});
