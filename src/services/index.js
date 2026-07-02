/**
 * services/index.js
 *
 * Barrel export for all service modules.
 * Import from "@/services" instead of individual files.
 */

export * from './authService'
export * from './productsService'
export { default as axiosInstance } from './axiosInstance'
