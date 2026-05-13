import { notFound } from 'next/navigation'
import { getMovieDetails, getMovieVideos, pickBestTrailer } from '@/lib/tmdb/endpoints'

export default async function TrailerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const movieId = Number(id)
  if (Number.isNaN(movieId)) notFound()

  const [movie, videos] = await Promise.all([
    getMovieDetails(movieId).catch(() => null),
    getMovieVideos(movieId).catch(() => null),
  ])
  if (!movie) notFound()

  const trailer = videos ? pickBestTrailer(videos.results) : null

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold tracking-tight">{movie.title} — Trailer</h1>
      <div className="bg-muted mt-6 aspect-video w-full overflow-hidden rounded-lg">
        {trailer ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
            title={trailer.name}
            className="h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full items-center justify-center">No trailer available</div>
        )}
      </div>
    </div>
  )
}
