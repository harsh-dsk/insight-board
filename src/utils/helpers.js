/**
 * utils/helpers.js
 *
 * Miscellaneous utility helpers used throughout the application.
 */

/**
 * Compute a product's discounted price.
 * @param {number} price             - Original price.
 * @param {number} discountPercentage - Discount percentage (0–100).
 * @returns {number} Final price after discount.
 */
export function calcDiscountedPrice(price, discountPercentage) {
  return price - (price * discountPercentage) / 100
}

/**
 * Clamp a number between a minimum and maximum value.
 * @param {number} value - The number to clamp.
 * @param {number} min   - Minimum allowed value.
 * @param {number} max   - Maximum allowed value.
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Generate a URL-safe slug from a string.
 * @param {string} str - Input string.
 * @returns {string}   Lowercase, hyphenated slug.
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

/**
 * Capitalize the first letter of each word in a string.
 * @param {string} str - Input string.
 * @returns {string}
 */
export function titleCase(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

/**
 * Get star rating display (e.g. 4.5 → "⭐⭐⭐⭐½").
 * Returns the raw numeric value; rendering is left to the component.
 * @param {number} rating - Rating value between 0 and 5.
 * @returns {number} Rounded-to-half rating.
 */
export function roundHalf(rating) {
  return Math.round(rating * 2) / 2
}
