'use client'

import { Check, Plus } from 'lucide-react'
import { useOptimistic, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { toggleWatchlist } from '../actions'

type Props = {
  movieId: number
  initialIsOnWatchlist: boolean
  size?: 'default' | 'sm' | 'lg'
}

export function WatchlistButton({ movieId, initialIsOnWatchlist, size = 'lg' }: Props) {
  const [isPending, startTransition] = useTransition()
  const [optimistic, setOptimistic] = useOptimistic(
    initialIsOnWatchlist,
    (_state, next: boolean) => next,
  )

  function handleClick() {
    startTransition(async () => {
      setOptimistic(!optimistic)
      await toggleWatchlist(movieId)
    })
  }

  return (
    <Button
      variant={optimistic ? 'secondary' : 'outline'}
      size={size}
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={optimistic}
    >
      {optimistic ? (
        <>
          <Check className="mr-1 size-4" />
          On watchlist
        </>
      ) : (
        <>
          <Plus className="mr-1 size-4" />
          Add to watchlist
        </>
      )}
    </Button>
  )
}
