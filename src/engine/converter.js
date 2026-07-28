/**
 * Saraaf Trade Toolkit - Pure Business Logic Conversion Engine
 * Converts commodity prices across various weight units and currencies.
 */

// Supported weight conversion factors relative to standard base unit: Kilogram (kg)
export const WEIGHT_UNITS = {
  kg: { name: 'Kilogram (kg)', toBaseRatio: 1 },
  g: { name: 'Gram (g)', toBaseRatio: 0.001 },
  mt: { name: 'Metric Ton (MT)', toBaseRatio: 1000 },
  lb: { name: 'Pound (lb)', toBaseRatio: 0.45359237 },
  oz: { name: 'Ounce (oz)', toBaseRatio: 0.028349523125 },
  maund: { name: 'Maund (40 kg)', toBaseRatio: 40 },
  seer: { name: 'Seer (1.25 kg)', toBaseRatio: 1.25 }
};

/**
 * Calculates converted commodity price and produces step-by-step breakdown.
 * 
 * @param {number} inputPrice - Price per source unit
 * @param {string} sourceUnit - Key from WEIGHT_UNITS (e.g. 'kg', 'maund')
 * @param {string} targetUnit - Key from WEIGHT_UNITS (e.g. 'mt', 'lb')
 * @param {number} exchangeRate - Currency conversion rate (Source / Target)
 * @returns {Object} Calculated values and step breakdown string
 */
export function calculateCommodityConversion(inputPrice, sourceUnit, targetUnit, exchangeRate = 1) {
  const src = WEIGHT_UNITS[sourceUnit];
  const tgt = WEIGHT_UNITS[targetUnit];

  if (!src || !tgt) {
    throw new Error('Unsupported weight unit specified.');
  }

  const numPrice = Number(inputPrice) || 0;
  const numRate = Number(exchangeRate) || 1;

  // Step 1: Calculate price per base unit (Kilogram)
  const pricePerKg = numPrice / src.toBaseRatio;

  // Step 2: Calculate price in target weight unit
  const priceInTargetWeight = pricePerKg * tgt.toBaseRatio;

  // Step 3: Apply currency conversion rate
  const finalConvertedPrice = priceInTargetWeight * numRate;

  return {
    inputPrice: numPrice,
    sourceUnit: src.name,
    targetUnit: tgt.name,
    exchangeRate: numRate,
    pricePerKg: pricePerKg,
    convertedPrice: finalConvertedPrice,
    breakdown: [
      `1 ${src.name} = ${src.toBaseRatio} kg`,
      `Base Price = ${pricePerKg.toFixed(4)} per kg`,
      `Weight Converted = ${priceInTargetWeight.toFixed(4)} per ${tgt.name}`,
      `Currency Adjusted (x${numRate}) = ${finalConvertedPrice.toFixed(2)}`
    ]
  };
}
