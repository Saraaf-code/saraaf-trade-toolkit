# Saraaf Trade Toolkit | Development Roadmap & State

## 📌 Phase 1 Status: Toolkit Suite Core (In Progress)

### ✅ Completed Updates
1. **Landing View**: Updated `index.html` so "All Tools" hub is the default landing view.
2. **Branding & Routing**: Logo links to `https://saraafglobal.com`.
3. **Commodity Price Converter**: Step-by-step arithmetic breakdown (explicit multiplication and division steps) implemented for full transparency.
4. **Moisture & Dry Mass Calculator**: Dual-model support active:
   - **Dry Mass & Penalty Deduction Model**: Cotton and general physical commodities (contract threshold penalty).
   - **Commercial Dry Matter & Shrink Model**: Grains and processing equivalence.

---

## 🎯 Next Immediate Tasks (Phase 1 Finalization)

### 1. HS Code & Tariff Lookup Tool (Tool #3)
- Basic classification lookup with import tax/duty calculations per tariff schedule.

### 2. Container CBM & Load Estimator (Tool #4)
- Volumetric utilization calculations for standard 20ft, 40ft, and 40ft High Cube containers.

### 3. Progressive Web App (PWA) Foundation Setup
- Configure `manifest.json` and a Service Worker (`sw.js`) to ensure offline availability and installability across devices.

---

## 🚀 Phase 2 Strategy: Commodity-Specific PWAs & Advanced Tools

### 1. Standalone Industry PWAs (Modular Architecture)
Design calculators so each can deploy as a hyper-focused, standalone PWA alongside the unified suite:
- **Cotton PWA**: Locked directly into the *Dry Mass & Contract Penalty Calculator* (no confusing rehydration modes).
- **Zinc & Lead Ore PWA**: Specialized assay calculator determining net recoverable metal content (MT of Zn and Pb yield per shipment based on assay percentages, moisture, and smelting deductions).
- **Onyx & Dimension Stone PWA**: Volume-to-tonnage conversions based on block dimensions, specific gravity, and slab recovery ratios.

### 2. Live Market Integration
- Integration of live forex exchange rates and bank historical rate tables into the Commodity Price Converter.


## Progress & Completed Features

- [x] **1. Commodity Price Converter**
  - Multi-unit weight and currency conversion logic.
  - Front & center settlement display with step-by-step mathematical breakdown.
  - Fixed clipboard button label formatting ("Copy Results").
- [x] **2. Moisture & Dry Mass Calculator**
  - Commercial dry mass fiber and penalty deduction formulas.
  - Rehydration shrink/variance calculations.
- [x] **3. Container CBM & Load Estimator**
  - Volume utilization calculations for 20ft, 40ft, and 40ft HC containers.
  - Dynamic carton limits and max payload warnings.
- [x] **4. Incoterms® 2020 Risk & Cost Matrix**
  - Full operational cost allocations across all 11 Incoterms.
  - Critical risk transfer visualizer and transport mode badges.

---

## Next Steps / Upcoming Queue

- [ ] **HS Code & Tariff Calculator** (Interactive lookup & regional tariff estimation)
- [ ] **Letter of Credit (L/C) Checklist** (Document validation criteria)
- [ ] **State Bank / Historical Exchange Rates** (API or static dataset integration)
- [ ] **Live Market Exchange Rates**
