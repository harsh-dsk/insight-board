/**
 * hooks/useDebounce.js
 *
 * Returns a debounced copy of `value` that only updates after
 * `delay` milliseconds have elapsed without a new value being set.
 *
 * Useful for delaying API search calls triggered by user input.
 *
 * @param {*}      value - The value to debounce.
 * @param {number} delay - Delay in milliseconds (default 300).
 *
 * Returns the debounced value.
 */

import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
