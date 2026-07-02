/**
 * utils/format.js
 *
 * Formatting utility functions for numbers, currency, dates, and percentages.
 * These are pure functions with no side effects.
 */

/**
 * Format a number as a currency string.
 * @param {number} amount   - Numeric value.
 * @param {string} currency - ISO 4217 currency code (default "USD").
 * @param {string} locale   - BCP 47 locale tag (default "en-US").
 * @returns {string}
 */
export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format a floating-point number as a percentage string.
 * @param {number} value          - Value between 0 and 100.
 * @param {number} decimalPlaces  - Number of decimal places (default 1).
 * @returns {string}
 */
export function formatPercentage(value, decimalPlaces = 1) {
  return `${Number(value).toFixed(decimalPlaces)}%`
}

/**
 * Format a large number with locale-aware separators.
 * @param {number} value  - The number to format.
 * @param {string} locale - BCP 47 locale tag (default "en-US").
 * @returns {string}
 */
export function formatNumber(value, locale = 'en-US') {
  return new Intl.NumberFormat(locale).format(value)
}

/**
 * Format a date string or Date object into a readable format.
 * @param {string|Date} date    - The date to format.
 * @param {object}      options - Intl.DateTimeFormat options.
 * @returns {string}
 */
export function formatDate(date, options = { year: 'numeric', month: 'short', day: 'numeric' }) {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
}

/**
 * Truncate a string to a maximum length, appending "..." if truncated.
 * @param {string} str    - The string to truncate.
 * @param {number} maxLen - Maximum character length (default 50).
 * @returns {string}
 */
export function truncate(str, maxLen = 50) {
  if (!str || str.length <= maxLen) return str
  return `${str.slice(0, maxLen)}...`
}
