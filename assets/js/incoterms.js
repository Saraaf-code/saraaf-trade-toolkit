/**
 * Saraaf Trade Toolkit - Incoterms 2020 Operational Matrix Engine
 */

const incotermsData = {
  EXW: {
    title: "EXW – Ex Works",
    mode: "Any Transport Mode",
    risk: "Risk transfers at seller's premises (factory/warehouse) when goods are made available to buyer. Buyer bears all loading, transport, and customs risks.",
    stages: { packaging: "Seller", exportCustoms: "Buyer", inlandOrigin: "Buyer", loadingOrigin: "Buyer", freight: "Buyer", insurance: "Buyer (Optional)", importCustoms: "Buyer", finalDelivery: "Buyer" }
  },
  FCA: {
    title: "FCA – Free Carrier",
    mode: "Any Transport Mode",
    risk: "Risk transfers when goods are delivered to the nominated carrier or terminal named by the buyer.",
    stages: { packaging: "Seller", exportCustoms: "Seller", inlandOrigin: "Seller", loadingOrigin: "Seller", freight: "Buyer", insurance: "Buyer (Optional)", importCustoms: "Buyer", finalDelivery: "Buyer" }
  },
  FAS: {
    title: "FAS – Free Alongside Ship",
    mode: "Sea & Inland Waterway Only",
    risk: "Risk transfers when goods are placed alongside the vessel nominated by the buyer at the named port of shipment.",
    stages: { packaging: "Seller", exportCustoms: "Seller", inlandOrigin: "Seller", loadingOrigin: "Buyer", freight: "Buyer", insurance: "Buyer (Optional)", importCustoms: "Buyer", finalDelivery: "Buyer" }
  },
  FOB: {
    title: "FOB – Free On Board",
    mode: "Sea & Inland Waterway Only",
    risk: "Risk transfers once goods are loaded safely on board the vessel at the named port of shipment.",
    stages: { packaging: "Seller", exportCustoms: "Seller", inlandOrigin: "Seller", loadingOrigin: "Seller", freight: "Buyer", insurance: "Buyer (Optional)", importCustoms: "Buyer", finalDelivery: "Buyer" }
  },
  CFR: {
    title: "CFR – Cost and Freight",
    mode: "Sea & Inland Waterway Only",
    risk: "Risk transfers on board vessel at origin port. Seller pays ocean freight to destination port, but buyer holds transit risk.",
    stages: { packaging: "Seller", exportCustoms: "Seller", inlandOrigin: "Seller", loadingOrigin: "Seller", freight: "Seller", insurance: "Buyer (Optional)", importCustoms: "Buyer", finalDelivery: "Buyer" }
  },
  CIF: {
    title: "CIF – Cost, Insurance & Freight",
    mode: "Sea & Inland Waterway Only",
    risk: "Risk transfers on board vessel at origin port. Seller pays freight and minimum clause (C) marine insurance to destination port.",
    stages: { packaging: "Seller", exportCustoms: "Seller", inlandOrigin: "Seller", loadingOrigin: "Seller", freight: "Seller", insurance: "Seller (Minimum Cover)", importCustoms: "Buyer", finalDelivery: "Buyer" }
  },
  CPT: {
    title: "CPT – Carriage Paid To",
    mode: "Any Transport Mode",
    risk: "Risk transfers when goods are handed over to the first carrier. Seller pays main transport to named destination.",
    stages: { packaging: "Seller", exportCustoms: "Seller", inlandOrigin: "Seller", loadingOrigin: "Seller", freight: "Seller", insurance: "Buyer (Optional)", importCustoms: "Buyer", finalDelivery: "Buyer" }
  },
  CIP: {
    title: "CIP – Carriage and Insurance Paid To",
    mode: "Any Transport Mode",
    risk: "Risk transfers when handed to first carrier. Seller pays freight and mandatory comprehensive Clause (A) insurance.",
    stages: { packaging: "Seller", exportCustoms: "Seller", inlandOrigin: "Seller", loadingOrigin: "Seller", freight: "Seller", insurance: "Seller (All-Risk Cover)", importCustoms: "Buyer", finalDelivery: "Buyer" }
  },
  DAP: {
    title: "DAP – Delivered at Place",
    mode: "Any Transport Mode",
    risk: "Risk transfers when goods arrive at named destination ready for unloading. Buyer handles import clearance and unloading.",
    stages: { packaging: "Seller", exportCustoms: "Seller", inlandOrigin: "Seller", loadingOrigin: "Seller", freight: "Seller", insurance: "Seller", importCustoms: "Buyer", finalDelivery: "Seller" }
  },
  DPU: {
    title: "DPU – Delivered at Place Unloaded",
    mode: "Any Transport Mode",
    risk: "Risk transfers once goods are unloaded by seller at named place of destination. Buyer handles import clearance.",
    stages: { packaging: "Seller", exportCustoms: "Seller", inlandOrigin: "Seller", loadingOrigin: "Seller", freight: "Seller", insurance: "Seller", importCustoms: "Buyer", finalDelivery: "Seller (Unloaded)" }
  },
  DDP: {
    title: "DDP – Delivered Duty Paid",
    mode: "Any Transport Mode",
    risk: "Maximum seller obligation. Risk transfers upon arrival at destination after seller completes import customs clearance and duties.",
    stages: { packaging: "Seller", exportCustoms: "Seller", inlandOrigin: "Seller", loadingOrigin: "Seller", freight: "Seller", insurance: "Seller", importCustoms: "Seller", finalDelivery: "Seller" }
  }
};

function updateIncotermView() {
  const selectEl = document.getElementById('select-incoterm');
  if (!selectEl) return;
  
  const code = selectEl.value;
  const data = incotermsData[code];
  if (!data) return;

  document.getElementById('incoterm-title').textContent = data.title;
  document.getElementById('incoterm-mode-badge').textContent = data.mode;
  document.getElementById('incoterm-risk-point').textContent = data.risk;

  setStageBadge('stage-packaging', data.stages.packaging);
  setStageBadge('stage-export-customs', data.stages.exportCustoms);
  setStageBadge('stage-inland-origin', data.stages.inlandOrigin);
  setStageBadge('stage-loading-origin', data.stages.loadingOrigin);
  setStageBadge('stage-freight', data.stages.freight);
  setStageBadge('stage-insurance', data.stages.insurance);
  setStageBadge('stage-import-customs', data.stages.importCustoms);
  setStageBadge('stage-final-delivery', data.stages.finalDelivery);
}

function setStageBadge(elementId, text) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = text;
  el.className = 'party-badge';
  if (text.startsWith('Seller')) {
    el.classList.add('badge-seller');
  } else if (text.startsWith('Buyer')) {
    el.classList.add('badge-buyer');
  } else {
    el.classList.add('badge-shared');
  }
}
