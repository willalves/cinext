import Link from 'next/link'
import { getWatchlist } from '../storage'
import { Heart } from 'lucide-react'

export async function WatchlistLink() {
  const watchlist = await getWatchlist()
  const count = watchlist.length

  return (
    <Link
      href="/watchlist"
      aria-label={`Watchlist${count > 0 ? ` (${count} ${count === 1 ? 'movie' : 'movies'})` : ''}`}
      className="text-muted-foreground hover:text-foreground relative flex items-center gap-1.5 text-sm transition-colors"
    >
      <Heart className="size-4" />
      {count > 0 && (
        <span className="bg-foreground text-background min-w-5 rounded-full px-1.5 py-0.5 text-center text-xs leading-none font-medium tabular-nums">
          {count}
        </span>
      )}
    </Link>
  )
}
