import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getBackdropUrl } from '@/lib/tmdb/images'
import type { MovieSummary } from '@/lib/tmdb/schemas'

export function HeroMovie({ movie }: { movie: MovieSummary }) {
  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'original')
  const year = movie.release_date ? movie.release_date.slice(0, 4) : ''

  return (
    <section className="relative h-[70vh] min-h-120 w-full overflow-hidden">
      {backdropUrl && (
        <Image
          src={backdropUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      )}

      {/* Vertical fade to background so the row below blends in */}
      <div className="from-background via-background/40 absolute inset-0 bg-linear-to-t to-transparent" />
      {/* Horizontal fade for text legibility */}
      <div className="from-background/95 via-background/60 absolute inset-0 bg-linear-to-r to-transparent" />

      <div className="relative z-10 container mx-auto flex h-full flex-col justify-end px-4 pb-12">
        <div className="max-w-2xl space-y-4">
          {movie.vote_average > 0 && (
            <div className="flex items-center gap-1.5 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
              <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
              {year && <span className="text-muted-foreground">· {year}</span>}
            </div>
          )}

          <h1 className="text-4xl leading-[0.95] font-black tracking-tight text-balance md:text-6xl lg:text-7xl">
            {movie.title}
          </h1>

          <p className="text-muted-foreground line-clamp-3 max-w-xl text-base md:text-lg">
            {movie.overview}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg">
              <Link href={`/movies/${movie.id}`}>View details</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/search">Browse all</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
