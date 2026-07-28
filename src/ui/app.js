/**
 * Saraaf Trade Toolkit - Commodity Converter UI Controller
 * Handles user input events, dynamic form rendering, and live output updates.
 */

import { calculateCommodityConversion, WEIGHT_UNITS } from '../engine/converter.js';
import { loadSavedState, saveState } from '../storage/state.js';

export function renderCommodityConverter(container) {
  const state = loadSavedState();

  // Generate HTML options for unit dropdowns
  const unitOptions = Object.entries(WEIGHT_UNITS)
    .map(([key, unit]) => `<option value="${key}">${unit.name}</option>`)
    .join('');

  container.innerHTML = `
    <div class="tool-card">
      <div class="tool-header">
        <h2 class="tool-title">Commodity Price Converter</h2>
        <p class="tool-subtitle">Convert prices seamlessly across weight units and currencies.</p>
      </div>

      <form id="converter-form" class="converter-form" onsubmit="event.preventDefault();">
        <!-- Input Price & Units Section -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
          
          <!-- Input Price -->
          <div>
            <label style="display:block; font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--spacing-xs);">Price Per Unit</label>
            <input type="number" id="input-price" step="any" value="${state.inputPrice}" style="width: 100%; padding: var(--spacing-sm) var(--spacing-md); background: var(--color-primary-dark); border: 1px solid var(--color-primary-border); border-radius: var(--radius-md); color: var(--color-text-primary); font-size: var(--font-size-md);" required>
          </div>

          <!-- Source Unit Dropdown -->
          <div>
            <label style="display:block; font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--spacing-xs);">From Unit</label>
            <select id="source-unit" style="width: 100%; padding: var(--spacing-sm) var(--spacing-md); background: var(--color-primary-dark); border: 1px solid var(--color-primary-border); border-radius: var(--radius-md); color: var(--color-text-primary); font-size: var(--font-size-md);">
              ${unitOptions}
            </select>
          </div>

          <!-- Target Unit Dropdown -->
          <div>
            <label style="display:block; font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--spacing-xs);">To Unit</label>
            <select id="target-unit" style="width: 100%; padding: var(--spacing-sm) var(--spacing-md); background: var(--color-primary-dark); border: 1px solid var(--color-primary-border); border-radius: var(--radius-md); color: var(--color-text-primary); font-size: var(--font-size-md);">
              ${unitOptions}
            </select>
          </div>

        </div>

        <!-- Exchange Rate Mode Selector -->
        <div style="margin-bottom: var(--spacing-lg); padding: var(--spacing-md); background: rgba(0,0,0,0.15); border-radius: var(--radius-md);">
          <label style="display:block; font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--spacing-sm);">Exchange Rate Mode</label>
          <div style="display: flex; gap: var(--spacing-sm); flex-wrap: wrap; margin-bottom: var(--spacing-md);">
            <button type="button" class="mode-btn ${state.exchangeRateMode === 'manual' ? 'active' : ''}" data-mode="manual" style="padding: 6px 16px; border-radius: var(--radius-pill); border: 1px solid var(--color-primary-border); background: var(--color-primary-dark); color: white; cursor: pointer;">Manual</button>
            <button type="button" class="mode-btn ${state.exchangeRateMode === 'statebank' ? 'active' : ''}" data-mode="statebank" style="padding: 6px 16px; border-radius: var(--radius-pill); border: 1px solid var(--color-primary-border); background: var(--color-primary-dark); color: white; cursor: pointer;">State Bank (Historical)</button>
            <button type="button" class="mode-btn ${state.exchangeRateMode === 'live' ? 'active' : ''}" data-mode="live" style="padding: 6px 16px; border-radius: var(--radius-pill); border: 1px solid var(--color-primary-border); background: var(--color-primary-dark); color: white; cursor: pointer;">Live Market (Future)</button>
          </div>

          <!-- Rate Input Fields -->
          <div id="rate-input-container">
            <div id="manual-rate-field">
              <label style="display:block; font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-bottom: 4px;">Exchange Rate Ratio</label>
              <input type="number" id="exchange-rate" step="any" value="${state.exchangeRate}" style="width: 200px; padding: var(--spacing-sm); background: var(--color-primary-dark); border: 1px solid var(--color-primary-border); border-radius: var(--radius-sm); color: white;">
            </div>
            
            <div id="statebank-date-field" style="display: ${state.exchangeRateMode === 'statebank' ? 'block' : 'none'}; margin-top: 8px;">
              <label style="display:block; font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-bottom: 4px;">Select Rate Date</label>
              <input type="date" id="statebank-date" value="${state.selectedDate}" style="padding: var(--spacing-sm); background: var(--color-primary-dark); border: 1px solid var(--color-primary-border); border-radius: var(--radius-sm); color: white;">
              <p style="font-size: var(--font-size-xs); color: var(--color-accent-blue); margin-top: 4px;">State Bank API integration placeholder active.</p>
            </div>
          </div>
        </div>

        <!-- Converted Output Display Card -->
        <div style="background: var(--color-primary-dark); border: 1px solid var(--color-accent-blue); border-radius: var(--radius-md); padding: var(--spacing-lg); text-align: center; margin-bottom: var(--spacing-lg);">
          <span style="font-size: var(--font-size-sm); color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 1px;">Converted Unit Price</span>
          <div id="converted-output" style="font-size: var(--font-size-xxl); font-weight: bold; color: var(--color-text-primary); margin: var(--spacing-xs) 0;">0.00</div>
          <button type="button" id="copy-btn" style="padding: 6px 20px; background: var(--color-accent-blue); border: none; border-radius: var(--radius-pill); color: white; font-weight: bold; cursor: pointer; transition: background 0.2s;">Copy Result</button>
        </div>

        <!-- Step Breakdown Display -->
        <div style="background: rgba(0,0,0,0.2); border-radius: var(--radius-md); padding: var(--spacing-md);">
          <h4 style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--spacing-xs);">Calculation Breakdown</h4>
          <ul id="calculation-breakdown" style="list-style: none; font-size: var(--font-size-sm); color: var(--color-text-muted); display: flex; flex-direction: column; gap: 4px;">
            <!-- Rendered dynamically -->
          </ul>
        </div>
      </form>
    </div>
  `;

  // Restore initial select dropdown values
  document.getElementById('source-unit').value = state.sourceUnit;
  document.getElementById('target-unit').value = state.targetUnit;

  // Bind live calculation function
  function updateCalculation() {
    const inputPrice = parseFloat(document.getElementById('input-price').value) || 0;
    const sourceUnit = document.getElementById('source-unit').value;
    const targetUnit = document.getElementById('target-unit').value;
    const exchangeRate = parseFloat(document.getElementById('exchange-rate').value) || 1;

    // Run core engine conversion
    const result = calculateCommodityConversion(inputPrice, sourceUnit, targetUnit, exchangeRate);

    // Update Output & Breakdown UI
    document.getElementById('converted-output').textContent = result.convertedPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    const breakdownList = document.getElementById('calculation-breakdown');
    breakdownList.innerHTML = result.breakdown.map(step => `<li>↓ ${step}</li>`).join('');

    // Save state to LocalStorage
    saveState({
      inputPrice,
      sourceUnit,
      targetUnit,
      exchangeRate
    });
  }

  // Attach event listeners for real-time recalculation on input change
  ['input-price', 'source-unit', 'target-unit', 'exchange-rate'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateCalculation);
    document.getElementById(id).addEventListener('change', updateCalculation);
  });

  // Mode button toggle handlers
  const modeBtns = container.querySelectorAll('.mode-btn');
  modeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      modeBtns.forEach(b => b.style.background = 'var(--color-primary-dark)');
      e.target.style.background = 'var(--color-accent-blue)';
      
      const mode = e.target.getAttribute('data-mode');
      const stateBankDate = document.getElementById('statebank-date-field');
      stateBankDate.style.display = mode === 'statebank' ? 'block' : 'none';
      saveState({ exchangeRateMode: mode });
    });
  });

  // One-click Copy Button
  document.getElementById('copy-btn').addEventListener('click', () => {
    const val = document.getElementById('converted-output').textContent;
    navigator.clipboard.writeText(val);
    const copyBtn = document.getElementById('copy-btn');
    copyBtn.textContent = 'Copied!';
    setTimeout(() => { copyBtn.textContent = 'Copy Result'; }, 2000);
  });

  // Trigger initial calculation
  updateCalculation();
}
