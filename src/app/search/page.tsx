import { Suspense } from 'react'
import { searchMovies } from '@/lib/tmdb/endpoints'
import { MovieCard } from '@/features/movies/components/movie-card'
import { SearchInput } from '@/features/movies/components/search-input'
import { SearchPagination } from '@/features/movies/components/search-pagination'
import { SearchSkeleton } from '@/features/movies/components/search-skeleton'

type PageProps = {
  searchParams: Promise<{ q?: string; page?: string }>
}

export const metadata = {
  title: 'Search · CineScope',
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = '', page = '1' } = await searchParams
  const pageNum = Math.max(1, Number(page) || 1)

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <p className="text-muted-foreground">Find movies by title.</p>
      </div>

      <SearchInput />

      {q.trim() ? (
        <Suspense key={`${q}-${pageNum}`} fallback={<SearchSkeleton />}>
          <SearchResults query={q.trim()} page={pageNum} />
        </Suspense>
      ) : (
        <EmptyHint />
      )}
    </div>
  )
}

async function SearchResults({ query, page }: { query: string; page: number }) {
  const data = await searchMovies(query, page).catch(() => null)

  if (!data) {
    return (
      <div className="text-muted-foreground py-12 text-center text-sm">
        Something went wrong. Try again in a moment.
      </div>
    )
  }

  if (data.results.length === 0) {
    return (
      <div className="text-muted-foreground py-12 text-center">
        <p className="text-lg">No results for “{query}”</p>
        <p className="mt-1 text-sm">Try a different title.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <p className="text-muted-foreground text-sm">
        {data.total_results.toLocaleString()} results for “{query}”
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} sizes="(min-width: 1024px) 200px, 40vw" />
        ))}
      </div>
      <SearchPagination currentPage={page} totalPages={Math.min(data.total_pages, 500)} />
    </div>
  )
}

function EmptyHint() {
  return (
    <div className="text-muted-foreground py-16 text-center">
      <p className="text-lg">Start typing to search.</p>
    </div>
  )
}
