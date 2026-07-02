/**
 * components/products/ProductTableSkeleton.jsx
 *
 * Skeleton loading state for the product table.
 * Renders N placeholder rows that match the table column layout.
 */

import { memo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const ProductTableSkeleton = memo(function ProductTableSkeleton({ rows = 10 }) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            {['', 'Product', 'Category', 'Price', 'Rating', 'Stock', 'Status', ''].map((h, i) => (
              <TableHead key={i} className="text-xs">{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-10 w-10 rounded-md" /></TableCell>
              <TableCell>
                <Skeleton className="h-3.5 w-36 mb-1.5" />
                <Skeleton className="h-3 w-20" />
              </TableCell>
              <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
              <TableCell>
                <Skeleton className="h-3.5 w-16 mb-1" />
                <Skeleton className="h-3 w-12" />
              </TableCell>
              <TableCell><Skeleton className="h-3.5 w-24" /></TableCell>
              <TableCell><Skeleton className="h-3.5 w-12" /></TableCell>
              <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
              <TableCell><Skeleton className="h-7 w-7 rounded-md" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
})
