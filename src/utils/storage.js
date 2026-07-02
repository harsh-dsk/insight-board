/**
 * utils/storage.js
 *
 * Safe localStorage utility functions with JSON serialization.
 * Silently catches errors caused by private browsing or storage quotas.
 */

/**
 * Get and deserialize a value from localStorage.
 * @param {string} key          - The storage key.
 * @param {*}      defaultValue - Fallback value if key is missing.
 * @returns {*}
 */
export function getItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key)
    return item !== null ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

/**
 * Serialize and write a value to localStorage.
 * @param {string} key   - The storage key.
 * @param {*}      value - The value to store.
 */
export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`storage.setItem: failed for key "${key}"`, error)
  }
}

/**
 * Remove a key from localStorage.
 * @param {string} key - The storage key to remove.
 */
export function removeItem(key) {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`storage.removeItem: failed for key "${key}"`, error)
  }
}

/**
 * Clear all entries from localStorage.
 */
export function clearStorage() {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('storage.clearStorage: failed', error)
  }
}
