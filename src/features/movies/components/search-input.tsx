'use client'

import { Search, X } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function SearchInput() {
  const [isPending, startTransition] = useTransition()

  const [q, setQ] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({
      shallow: false,
      throttleMs: 300,
      startTransition,
      clearOnDefault: true,
    }),
  )

  return (
    <div className="relative max-w-2xl">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value || null)}
        placeholder="Search movies..."
        className="h-12 pr-10 pl-9 text-base"
        autoFocus
      />
      {q && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2"
          onClick={() => setQ(null)}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      {isPending && (
        <div className="bg-muted absolute -bottom-1 left-0 h-0.5 w-full overflow-hidden">
          <div className="bg-foreground h-full w-1/3 animate-pulse" />
        </div>
      )}
    </div>
  )
}
