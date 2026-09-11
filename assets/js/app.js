/**
 * Saraaf Trade Toolkit - Core App Controller
 *
 * Phase 1 strategy:
 * - Every calculator is an independent tool.
 * - The homepage is a 50-card progress wall.
 * - Tools can be activated or hidden without deleting their code.
 * - Commodity/category associations can be added later.
 */

const SARAAF_TOOL_VISIBILITY = {
  converter: true,
  moisture: true,
  container: true,
  incoterms: true,
  oreValuation: true
};

const SARAAF_PHASE1_TOOLS = [
  { id: 'converter', title: 'The Commodity Price Converter', description: 'Convert weight, currency, and unit prices dynamically with formula breakdowns.', status: 'active' },
  { id: 'moisture', title: 'Commodity Moisture & Dry Mass Calculator', description: 'Calculate dry mass, moisture adjustments, and commercial shrink scenarios.', status: 'active' },
  { id: 'container', title: 'Container CBM & Load Estimator', description: 'Calculate volume utilization, carton counts, and payload limits.', status: 'active' },
  { id: 'incoterms', title: 'Incoterms 2020 Risk & Cost Matrix', description: 'Compare operational cost allocation and risk transfer points.', status: 'active' },
  { id: 'ore-valuation', title: 'Ore Valuation Engine', description: 'Estimate Gold-Antimony ore settlement value using grade, moisture, payability, and benchmark prices.', status: 'active' },
  { id: 'landed-cost', title: 'Landed Cost Calculator', description: 'Build the true delivered cost of a commodity from origin to destination.', status: 'planned' },
  { id: 'hs-code', title: 'HS Code Lookup', description: 'Browse and search the global HS hierarchy and country-specific tariff lines.', status: 'planned' },
  { id: 'lc-checklist', title: 'Letter of Credit Document Checklist', description: 'Check documentary requirements before presenting a trade shipment to the bank.', status: 'planned' },
  { id: 'freight-mt', title: 'Freight Cost per MT Calculator', description: 'Convert freight quotations into comparable cost per metric ton.', status: 'planned' },
  { id: 'break-even', title: 'Break-even Selling Price Calculator', description: 'Find the minimum selling price required to cover the complete deal cost.', status: 'planned' },
  { id: 'cotton-quality', title: 'Cotton Quality / Grade Calculator', description: 'Compare cotton quality inputs and translate them into commercial implications.', status: 'planned' },
  { id: 'cotton-bale', title: 'Cotton Bale / Shipment Calculator', description: 'Estimate bale counts, shipment weight, and loading quantities.', status: 'planned' },
  { id: 'ore-assay', title: 'Ore Assay & Recoverable Metal Calculator', description: 'Estimate contained and recoverable metal from assay and processing assumptions.', status: 'planned' },
  { id: 'payable-metal', title: 'Concentrate Payable Metal Calculator', description: 'Calculate payable Lead/Zinc metal after commercial deductions and payability.', status: 'planned' },
  { id: 'dimension-stone', title: 'Dimension Stone / Onyx Block Calculator', description: 'Calculate block volume, tonnage, and dimension-stone quantities.', status: 'planned' },
  { id: 'trade-deal', title: 'Trade Deal Economics — Should I Actually Do This Deal?', description: 'Put the major deal assumptions on the negotiation table and test the economics.', status: 'planned' },
  { id: 'phase1-slot-17', title: 'Phase 1 Candidate Tool 17', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-18', title: 'Phase 1 Candidate Tool 18', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-19', title: 'Phase 1 Candidate Tool 19', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-20', title: 'Phase 1 Candidate Tool 20', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-21', title: 'Phase 1 Candidate Tool 21', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-22', title: 'Phase 1 Candidate Tool 22', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-23', title: 'Phase 1 Candidate Tool 23', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-24', title: 'Phase 1 Candidate Tool 24', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-25', title: 'Phase 1 Candidate Tool 25', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-26', title: 'Phase 1 Candidate Tool 26', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-27', title: 'Phase 1 Candidate Tool 27', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-28', title: 'Phase 1 Candidate Tool 28', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-29', title: 'Phase 1 Candidate Tool 29', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-30', title: 'Phase 1 Candidate Tool 30', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-31', title: 'Phase 1 Candidate Tool 31', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-32', title: 'Phase 1 Candidate Tool 32', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-33', title: 'Phase 1 Candidate Tool 33', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-34', title: 'Phase 1 Candidate Tool 34', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-35', title: 'Phase 1 Candidate Tool 35', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-36', title: 'Phase 1 Candidate Tool 36', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-37', title: 'Phase 1 Candidate Tool 37', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-38', title: 'Phase 1 Candidate Tool 38', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-39', title: 'Phase 1 Candidate Tool 39', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-40', title: 'Phase 1 Candidate Tool 40', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-41', title: 'Phase 1 Candidate Tool 41', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-42', title: 'Phase 1 Candidate Tool 42', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-43', title: 'Phase 1 Candidate Tool 43', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-44', title: 'Phase 1 Candidate Tool 44', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-45', title: 'Phase 1 Candidate Tool 45', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-46', title: 'Phase 1 Candidate Tool 46', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-47', title: 'Phase 1 Candidate Tool 47', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-48', title: 'Phase 1 Candidate Tool 48', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-49', title: 'Phase 1 Candidate Tool 49', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' },
  { id: 'phase1-slot-50', title: 'Phase 1 Candidate Tool 50', description: 'Reserved slot for the next validated trade-workflow calculator.', status: 'candidate' }
];

function switchView(toolId) {
  if (toolId === 'ore-valuation') {
    window.location.href = './tools/ore-valuation-engine.html';
    return;
  }

  document.querySelectorAll('.nav-tab').forEach(btn => {
    const isMatch = btn.getAttribute('onclick')?.includes("'" + toolId + "'");
    btn.classList.toggle('active', isMatch);
  });

  document.querySelectorAll('.tool-view').forEach(view => {
    view.classList.toggle('hidden', view.id !== 'tool-' + toolId);
  });

  if (toolId === 'incoterms' && typeof updateIncotermView === 'function') {
    updateIncotermView();
  }
}

function renderPhase1Wall() {
  const hub = document.querySelector('#tool-hub .hub-grid');
  if (!hub) return;

  hub.innerHTML = '';

  SARAAF_PHASE1_TOOLS.forEach((tool, index) => {
    const number = index + 1;
    const visible = SARAAF_TOOL_VISIBILITY[tool.id] !== false;
    const isActive = tool.status === 'active' && visible;
    const card = document.createElement('div');

    card.id = 'tool-card-' + tool.id;
    card.className = 'tool-card ' + (isActive ? 'active-card' : 'disabled-card');
    card.setAttribute('data-tool-id', tool.id);

    let badgeText = 'Coming Soon';
    let badgeClass = '';
    if (isActive) {
      badgeText = 'Active';
      badgeClass = 'badge-active';
    } else if (tool.status === 'candidate') {
      badgeText = 'Candidate';
    } else if (!visible) {
      badgeText = 'Hidden';
    }

    card.innerHTML = '<span class="badge ' + badgeClass + '">' + badgeText + '</span>' +
      '<h3>' + number + '. ' + tool.title + '</h3>' +
      '<p>' + tool.description + '</p>';

    if (isActive) {
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.addEventListener('click', () => switchView(tool.id));
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          switchView(tool.id);
        }
      });
    }

    hub.appendChild(card);
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('PWA Service Worker active:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}

document.addEventListener('DOMContentLoaded', renderPhase1Wall);
