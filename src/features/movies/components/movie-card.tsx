import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { getPosterUrl } from '@/lib/tmdb/images'
import type { MovieSummary } from '@/lib/tmdb/schemas'
import { cn } from '@/lib/utils'

type MovieCardProps = {
  movie: MovieSummary
  className?: string
  sizes?: string
}

export function MovieCard({ movie, className, sizes }: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.poster_path, 'w500')
  const year = movie.release_date ? movie.release_date.slice(0, 4) : ''

  return (
    <Link
      href={`/movies/${movie.id}`}
      className={cn('group block', className)}
      aria-label={`${movie.title}${year ? ` (${year})` : ''}`}
    >
      <div className="bg-muted ring-border/40 relative aspect-2/3 overflow-hidden rounded-lg ring-1">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt=""
            fill
            sizes={sizes ?? '(min-width: 1024px) 200px, 40vw'}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="text-muted-foreground flex h-full items-center justify-center text-xs">
            No poster
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {movie.vote_average > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>

      <div className="mt-2 space-y-0.5">
        <h3 className="line-clamp-1 text-sm font-medium group-hover:underline">{movie.title}</h3>
        {year && <p className="text-muted-foreground text-xs">{year}</p>}
      </div>
    </Link>
  )
}
