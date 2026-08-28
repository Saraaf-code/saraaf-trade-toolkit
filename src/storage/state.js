/**
 * Saraaf Trade Toolkit - Storage Service
 * Manages local persistence for user inputs, selected units, and exchange rates.
 */

const STORAGE_KEY = "saraaf_trade_toolkit_state";

const DEFAULT_STATE = {
  lastSourceUnit: "kg",
  lastTargetUnit: "mt",
  lastPricePerUnit: "",
  lastAmount: "",
  lastExchangeRate: "1.0",
  exchangeRateMode: "manual",
  selectedStateBankDate: new Date().toISOString().split("T")[0]
};

/**
 * Retrieves saved application state from LocalStorage.
 * @returns {Object} Application state object.
 */
export function loadState() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? { ...DEFAULT_STATE, ...JSON.parse(data) } : DEFAULT_STATE;
  } catch (error) {
    console.warn("Unable to access localStorage, returning default state.", error);
    return DEFAULT_STATE;
  }
}

/**
 * Saves current application state to LocalStorage.
 * @param {Object} newState - Partial or full state object to persist.
 */
export function saveState(newState) {
  try {
    const currentState = loadState();
    const updatedState = { ...currentState, ...newState };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
  } catch (error) {
    console.warn("Unable to save state to localStorage.", error);
  }
}
