/**
 * Saraaf Trade Toolkit - Application State & LocalStorage Manager
 * Automatically persists user input values across browser sessions.
 */

const STORAGE_KEY = 'saraaf_trade_toolkit_state';

// Default state values if no saved data exists
const DEFAULT_STATE = {
  inputPrice: 1000,
  sourceUnit: 'maund',
  targetUnit: 'kg',
  exchangeRateMode: 'manual', // 'manual', 'statebank', 'live'
  exchangeRate: 1.0,
  selectedDate: new Date().toISOString().split('T')[0] // Default to today (YYYY-MM-DD)
};

/**
 * Loads saved state from LocalStorage or returns defaults if unavailable.
 * @returns {Object} Application state object
 */
export function loadSavedState() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return { ...DEFAULT_STATE };
    
    const parsed = JSON.parse(savedData);
    return { ...DEFAULT_STATE, ...parsed };
  } catch (error) {
    console.warn('Failed to load state from LocalStorage, returning defaults:', error);
    return { ...DEFAULT_STATE };
  }
}

/**
 * Saves updated state object to LocalStorage.
 * @param {Object} stateObj - Complete or partial state updates
 */
export function saveState(stateObj) {
  try {
    const currentState = loadSavedState();
    const updatedState = { ...currentState, ...stateObj };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
  } catch (error) {
    console.error('Failed to save state to LocalStorage:', error);
  }
}
