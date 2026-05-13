import { notFound } from 'next/navigation'
import { getMovieDetails, getMovieVideos, pickBestTrailer } from '@/lib/tmdb/endpoints'
import { TrailerModal } from '@/features/movies/components/trailer-modal'

export default async function TrailerModalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const movieId = Number(id)
  if (Number.isNaN(movieId)) notFound()

  const [movie, videos] = await Promise.all([
    getMovieDetails(movieId).catch(() => null),
    getMovieVideos(movieId).catch(() => null),
  ])
  if (!movie) return null

  const trailer = videos ? pickBestTrailer(videos.results) : null
  return <TrailerModal title={movie.title} trailer={trailer} />
}
