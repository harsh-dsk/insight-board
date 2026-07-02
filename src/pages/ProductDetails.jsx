/**
 * pages/ProductDetails.jsx
 *
 * Single product detail page (protected).
 * Reads the :id param from the URL and fetches product data via useProduct(id).
 * Displays product images, metadata, ratings, and stock information.
 *
 * TODO: Implement UI with <ProductGallery />, <ProductInfo />, <RatingDisplay />.
 */

import { useParams } from 'react-router-dom'

export default function ProductDetails() {
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams()

  return null
}
