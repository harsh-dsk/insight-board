/**
 * constants/products.js
 *
 * Product-module constants: view modes, sort options, status values,
 * and page-size choices for the Products page.
 */

export const VIEW_MODES = {
  GRID: 'grid',
  TABLE: 'table',
}

export const SORT_OPTIONS = [
  { value: 'newest',     label: 'Newest' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Highest Rated' },
  { value: 'name-asc',   label: 'Name: A → Z' },
  { value: 'name-desc',  label: 'Name: Z → A' },
]

export const RATING_OPTIONS = [
  { value: '',  label: 'Any rating' },
  { value: '1', label: '1+ stars' },
  { value: '2', label: '2+ stars' },
  { value: '3', label: '3+ stars' },
  { value: '4', label: '4+ stars' },
  { value: '4.5', label: '4.5+ stars' },
]

export const PAGE_SIZE_OPTIONS = [
  { value: '12', label: '12 per page' },
  { value: '20', label: '20 per page' },
  { value: '40', label: '40 per page' },
]

export const PRODUCT_STATUS = {
  PUBLISHED: 'published',
  HIDDEN: 'hidden',
}

/** Default URL params for the Products page */
export const PRODUCTS_DEFAULTS = {
  VIEW:      VIEW_MODES.GRID,
  SORT:      'newest',
  PAGE:      1,
  LIMIT:     20,
  MIN_RATING: '',
  CATEGORY:  '',
  SEARCH:    '',
}
