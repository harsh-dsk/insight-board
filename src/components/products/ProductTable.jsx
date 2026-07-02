/**
 * components/products/ProductTable.jsx
 *
 * Product data table wrapping <ProductTableRow> for each item.
 * Handles the table header; rows are separated into ProductTableRow
 * to keep this file lean and benefit from per-row memoization.
 */

import { memo } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ProductTableRow } from './ProductTableRow'

const COLUMNS = [
  { label: '',         className: 'w-14' },
  { label: 'Product',  className: 'min-w-[160px]' },
  { label: 'Category', className: '' },
  { label: 'Price',    className: 'tabular-nums' },
  { label: 'Rating',   className: '' },
  { label: 'Stock',    className: '' },
  { label: 'Status',   className: '' },
  { label: 'Actions',  className: 'w-12' },
]

export const ProductTable = memo(function ProductTable({ products }) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            {COLUMNS.map((col) => (
              <TableHead key={col.label} className={`text-xs font-medium ${col.className}`}>
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductTableRow key={product.id} product={product} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
})
