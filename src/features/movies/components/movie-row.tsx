import type { MovieSummary } from '@/lib/tmdb/schemas'
import { MovieCard } from './movie-card'

type MovieRowProps = {
  title: string
  movies: MovieSummary[]
}

export function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <section className="container mx-auto space-y-4 px-4 py-8">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            className="w-36 shrink-0 snap-start sm:w-44 lg:w-48"
            sizes="(min-width: 1024px) 192px, (min-width: 640px) 176px, 144px"
          />
        ))}
      </div>
    </section>
  )
}
