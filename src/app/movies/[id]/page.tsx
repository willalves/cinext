import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Star, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getMovieDetails, getMovieCredits, getSimilarMovies } from '@/lib/tmdb/endpoints'
import { getBackdropUrl, getPosterUrl } from '@/lib/tmdb/images'
import { MovieRow } from '@/features/movies/components/movie-row'
import { CastRow } from '@/features/movies/components/cast-row'

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const movieId = Number(id)
  if (Number.isNaN(movieId)) return { title: 'Not found' }

  try {
    const movie = await getMovieDetails(movieId)
    return {
      title: `${movie.title} | CineScope`,
      description: movie.overview || movie.tagline || `${movie.title} on CineScope`,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: movie.backdrop_path ? [{ url: getBackdropUrl(movie.backdrop_path, 'w1280')! }] : [],
      },
    }
  } catch {
    return { title: 'Not found' }
  }
}

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params
  const movieId = Number(id)
  if (Number.isNaN(movieId)) notFound()

  // Parallel fetch — three requests in flight at once, not waterfall
  const [movie, credits, similar] = await Promise.all([
    getMovieDetails(movieId).catch(() => null),
    getMovieCredits(movieId).catch(() => null),
    getSimilarMovies(movieId).catch(() => null),
  ])

  if (!movie) notFound()

  const backdrop = getBackdropUrl(movie.backdrop_path, 'original')
  const poster = getPosterUrl(movie.poster_path, 'w500')
  const year = movie.release_date ? movie.release_date.slice(0, 4) : ''
  const runtime = movie.runtime ? formatRuntime(movie.runtime) : null

  return (
    <article>
      <section className="relative">
        {backdrop && (
          <div className="absolute inset-0 -z-10 h-[80vh] overflow-hidden">
            <Image
              src={backdrop}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
            <div className="from-background absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
            <div className="from-background/95 via-background/40 absolute inset-0 bg-linear-to-r to-transparent" />
            <div className="from-background absolute inset-0 bg-linear-to-b to-transparent opacity-60" />
          </div>
        )}

        <div className="container mx-auto px-4 pt-20 pb-12 md:pt-32 md:pb-20">
          <div className="grid gap-8 md:grid-cols-[240px_1fr] md:gap-12">
            <div className="ring-border/40 relative mx-auto aspect-2/3 w-48 overflow-hidden rounded-lg shadow-2xl ring-1 md:mx-0 md:w-60">
              {poster ? (
                <Image src={poster} alt="" fill sizes="240px" className="object-cover" priority />
              ) : (
                <div className="bg-muted flex h-full items-center justify-center">No poster</div>
              )}
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl leading-[0.95] font-black tracking-tight text-balance md:text-6xl">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-muted-foreground text-lg italic">{movie.tagline}</p>
              )}

              <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                {movie.vote_average > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                    <span className="text-foreground font-medium">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </span>
                )}
                {year && <span>{year}</span>}
                {runtime && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {runtime}
                  </span>
                )}
                {movie.genres.length > 0 && (
                  <span>{movie.genres.map((g) => g.name).join(' · ')}</span>
                )}
              </div>

              {movie.overview && (
                <p className="max-w-2xl leading-relaxed text-pretty">{movie.overview}</p>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg">
                  <Link href={`/movies/${movie.id}/trailer`} scroll={false}>
                    <Play className="mr-1 h-4 w-4 fill-current" />
                    Play trailer
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  Add to watchlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {credits && credits.cast.length > 0 && (
        <CastRow title="Cast" cast={credits.cast.slice(0, 12)} />
      )}

      {similar && similar.results.length > 0 && (
        <MovieRow title="Similar movies" movies={similar.results.slice(0, 20)} />
      )}
    </article>
  )
}

function formatRuntime(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}
