/* Saraaf Trade Toolkit - single source of truth for the Phase 1 wall */
const SARAAF_TOOLS = [
  ['converter','The Commodity Price Converter','Convert weight, currency and unit prices dynamically.','active','priceconverter/'],
  ['moisture','Commodity Moisture & Dry Mass Calculator','Calculate dry mass, moisture adjustments and commercial shrink.','active','moisture/'],
  ['container','Container CBM & Load Estimator','Calculate volume, carton capacity and payload limits.','active','container/'],
  ['incoterms','Incoterms 2020 Risk & Cost Matrix','Compare cost responsibility and risk transfer points.','active','incoterms/'],
  ['orevalue','Ore Valuation Engine','Gold-Antimony ore settlement using grade, moisture, price and payability.','active','orevalue/'],
  ['freight-rate','Freight Rate Calculator','Estimate freight cost from a known freight rate, especially for land transport.','active','freight-rate/'],
  ['landed-cost','Landed Cost Calculator','Calculate estimated landed cost by combining product, freight, insurance, duty and other charges.','active','landed-cost/'],
  ['trade-finance','Trade Finance Calculator','Model financing cost, buyer funding and supplier settlement for a commodity trade.','active','trade-finance/'],
  ['hs-code','HS Code Lookup','Browse the global HS hierarchy and country extensions.','planned',''],
  ['lc-checklist','Letter of Credit Document Checklist','Review documentary requirements before bank presentation.','planned',''],
  ['break-even','Break-even Selling Price Calculator','Find the minimum selling price needed to cover deal costs.','planned',''],
  ['cotton-quality','Cotton Quality / Grade Calculator','Compare cotton quality inputs and commercial implications.','planned',''],
  ['cotton-bale','Cotton Bale / Shipment Calculator','Estimate bale counts, shipment weight and loading quantities.','planned',''],
  ['ore-assay','Ore Assay & Recoverable Metal Calculator','Estimate contained and recoverable metal from assay inputs.','planned',''],
  ['payable-metal','Concentrate Payable Metal Calculator','Calculate payable Lead/Zinc metal after deductions.','planned',''],
  ['dimension-stone','Dimension Stone / Onyx Block Calculator','Calculate block volume, tonnage and stone quantities.','planned',''],
  ['trade-deal','Trade Deal Economics — Should I Actually Do This Deal?','Put major deal assumptions on the negotiation table.','planned',''],
  ...Array.from({length:33},(_,i)=>['phase1-'+(i+18),'Phase 1 Candidate Tool '+(i+18),'Reserved slot for a validated commodity trade workflow calculator.','candidate',''])
];
