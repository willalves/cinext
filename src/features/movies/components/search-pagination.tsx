'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'

export function SearchPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  const [isPending, startTransition] = useTransition()
  const [, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({
      shallow: false,
      startTransition,
      clearOnDefault: true,
      scroll: true,
    }),
  )

  if (totalPages <= 1) return null

  return (
    <nav className="flex items-center justify-center gap-3 pt-4" aria-label="Pagination">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage <= 1 || isPending}
        onClick={() => setPage(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      <span className="text-muted-foreground text-sm tabular-nums">
        Page {currentPage} of {totalPages.toLocaleString()}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages || isPending}
        onClick={() => setPage(currentPage + 1)}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}
