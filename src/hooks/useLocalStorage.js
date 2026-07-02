/**
 * hooks/useLocalStorage.js
 *
 * Generic hook for reading and writing a value to localStorage
 * with automatic JSON serialization/deserialization.
 *
 * @param {string} key          - localStorage key.
 * @param {*}      initialValue - Value to use when the key is not yet set.
 *
 * Returns [storedValue, setValue] — same API as useState.
 */

import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      // Allow functional updates: setValue(prev => newValue)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`useLocalStorage: failed to set key "${key}"`, error)
    }
  }

  return [storedValue, setValue]
}
