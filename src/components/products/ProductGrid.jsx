/**
 * components/products/ProductGrid.jsx
 *
 * Responsive CSS grid of <ProductCard> components.
 * 2 columns on sm, 3 on md, 4 on lg, 5 on xl.
 */

import { memo } from 'react'
import { ProductCard } from './ProductCard'

export const ProductGrid = memo(function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
})
