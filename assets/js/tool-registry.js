/* Saraaf Trade Toolkit - owner-controlled Phase 1 registry */
/*
   The last value controls homepage visibility:
   true  = show this tool on the toolkit homepage
   false = hide it from the homepage
   This is an OWNER setting, not a user-facing feature. Change only this value.
*/
const SARAAF_TOOLS = [
  ['converter','Commodity Price Converter','Convert weight, currency and unit prices dynamically.','active','priceconverter/',true],
  ['moisture','Commodity Moisture & Dry Mass Calculator','Calculate dry mass, moisture adjustments and commercial shrink.','active','moisture/',true],
  ['container','Container CBM & Load Estimator','Calculate volume, carton capacity and payload limits.','active','container/',true],
  ['incoterms','Incoterms 2020 Risk & Cost Matrix','Compare cost responsibility and risk transfer points.','active','incoterms/',true],
  ['orevalue','Ore Valuation Engine','Gold-Antimony ore settlement using grade, moisture, price and payability.','active','orevalue/',true],
  ['freight-rate','Freight Rate Calculator','Estimate freight cost from a known freight rate, especially for land transport.','active','freight-rate/',true],
  ['landed-cost','Landed Cost Calculator','Calculate estimated landed cost by combining product, freight, insurance, duty and other charges.','active','landed-cost/',true],
  ['trade-finance','Trade Finance Calculator','Model financing cost, buyer funding and supplier settlement for a commodity trade.','active','trade-finance/',true],
  ['hs-code','HS Code Lookup','Browse the global HS hierarchy and country extensions.','planned','',true],
  ['lc-checklist','Letter of Credit Document Checklist','Review documentary requirements before bank presentation.','planned','',true],
  ['break-even','Break-even Selling Price Calculator','Find the minimum selling price needed to cover deal costs.','planned','',true],
  ['cotton-quality','Cotton Quality / Grade Calculator','Compare cotton quality inputs and commercial implications.','planned','',true],
  ['cotton-bale','Cotton Bale / Shipment Calculator','Estimate bale counts, shipment weight and loading quantities.','planned','',true],
  ['ore-assay','Ore Assay & Recoverable Metal Calculator','Estimate contained and recoverable metal from assay inputs.','planned','',true],
  ['payable-metal','Concentrate Payable Metal Calculator','Calculate payable Lead/Zinc metal after deductions.','planned','',true],
  ['dimension-stone','Dimension Stone / Onyx Block Calculator','Calculate block volume, tonnage and stone quantities.','planned','',true],
  ['trade-deal','Trade Deal Economics — Is This Deal Worth It?','Evaluate the economics and risks of a proposed trade.','planned','',true],
  ...Array.from({length:33},(_,i)=>['phase1-'+(i+18),'Phase 1 Candidate Tool '+(i+18),'Reserved slot for a validated commodity trade workflow calculator.','candidate','',true])
];
