/**
 * components/products/ProductTable.jsx
 *
 * Product data table wrapping <ProductTableRow> for each item.
 * Handles the table header and column show/hide customization.
 */

import { memo, useState, useMemo, useEffect } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { useAuth } from '@/context'
import { ROLES } from '@/constants/app'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ProductTableRow } from './ProductTableRow'

const COLUMNS = [
  { id: 'thumbnail', label: 'Image',      className: 'w-14' },
  { id: 'product',   label: 'Product',    className: 'min-w-[160px]' },
  { id: 'category',  label: 'Category',   className: '' },
  { id: 'price',     label: 'Price',      className: 'tabular-nums' },
  { id: 'rating',    label: 'Rating',     className: '' },
  { id: 'stock',     label: 'Stock',      className: '' },
  { id: 'status',    label: 'Status',     className: '' },
  { id: 'actions',   label: 'Actions',    className: 'w-12' },
]

const DEFAULT_COLUMNS = ['thumbnail', 'product', 'category', 'price', 'rating', 'stock', 'status', 'actions']

export const ProductTable = memo(function ProductTable({ products }) {
  const { user } = useAuth()
  const isAdmin = user?.role === ROLES.ADMIN

  const [visibleColumns, setVisibleColumns] = useState(() => {
    try {
      const saved = localStorage.getItem('insightboard_table_columns')
      return saved ? JSON.parse(saved) : DEFAULT_COLUMNS
    } catch {
      return DEFAULT_COLUMNS
    }
  })

  useEffect(() => {
    localStorage.setItem('insightboard_table_columns', JSON.stringify(visibleColumns))
  }, [visibleColumns])

  // Hide the status column entirely from non-admin users
  const availableColumns = useMemo(() => {
    if (isAdmin) return COLUMNS
    return COLUMNS.filter((col) => col.id !== 'status')
  }, [isAdmin])

  const filteredColumns = useMemo(() => {
    return availableColumns.filter((col) => visibleColumns.includes(col.id))
  }, [availableColumns, visibleColumns])

  return (
    <div className="space-y-3">
      {/* ── Column Customizer ── */}
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
              <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableColumns.map((col) => (
              <DropdownMenuCheckboxItem
                key={col.id}
                checked={visibleColumns.includes(col.id)}
                onCheckedChange={(checked) => {
                  setVisibleColumns((prev) =>
                    checked
                      ? [...prev, col.id]
                      : prev.filter((id) => id !== col.id)
                  )
                }}
                className="text-xs capitalize"
              >
                {col.id === 'thumbnail' ? 'Image' : col.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ── Table ── */}
      <div className="rounded-lg border border-border overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              {filteredColumns.map((col) => (
                <TableHead key={col.id} className={`text-xs font-medium ${col.className}`}>
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                visibleColumns={visibleColumns}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
})
