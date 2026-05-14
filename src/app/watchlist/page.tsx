import { Suspense } from 'react'
import { Heart } from 'lucide-react'
import { getMovieDetails } from '@/lib/tmdb/endpoints'
import { MovieCard } from '@/features/movies/components/movie-card'
import { getWatchlist } from '@/features/watchlist/storage'
import { ClearWatchlistButton } from '@/features/watchlist/components/clear-watchlist-button'
import { SearchSkeleton } from '@/features/movies/components/search-skeleton'

export const metadata = {
  title: 'Watchlist · CineScope',
}

export default async function WatchlistPage() {
  const ids = await getWatchlist()

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <header className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Your watchlist</h1>
          <p className="text-muted-foreground">
            {ids.length === 0
              ? 'Movies you save will appear here.'
              : `${ids.length} ${ids.length === 1 ? 'movie' : 'movies'} saved.`}
          </p>
        </div>
        {ids.length > 0 && <ClearWatchlistButton />}
      </header>

      {ids.length === 0 ? (
        <EmptyWatchlist />
      ) : (
        <Suspense fallback={<SearchSkeleton />}>
          <WatchlistGrid ids={ids} />
        </Suspense>
      )}
    </div>
  )
}

async function WatchlistGrid({ ids }: { ids: number[] }) {
  const movies = await Promise.all(ids.map((id) => getMovieDetails(id).catch(() => null)))
  const found = movies.filter((m): m is NonNullable<typeof m> => m !== null)

  if (found.length === 0) {
    return <EmptyWatchlist />
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {found.map((movie) => (
        <MovieCard key={movie.id} movie={movie} sizes="(min-width: 1024px) 200px, 40vw" />
      ))}
    </div>
  )
}

function EmptyWatchlist() {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center py-20 text-center">
      <Heart className="mb-4 h-10 w-10 opacity-40" />
      <p className="text-lg">Your watchlist is empty</p>
      <p className="mt-1 max-w-sm text-sm">
        Browse movies and tap “Add to watchlist” to start saving.
      </p>
    </div>
  )
}
