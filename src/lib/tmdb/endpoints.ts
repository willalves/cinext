import { tmdbFetch } from './client'
import {
  movieDetailsSchema,
  paginatedMoviesSchema,
  creditsSchema,
  videosSchema,
  type MovieDetails,
  type PaginatedMovies,
  type Credits,
  type Video,
} from './schemas'

export function getPopularMovies(page = 1): Promise<PaginatedMovies> {
  return tmdbFetch(`/movie/popular?page=${page}`, paginatedMoviesSchema)
}

export function getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<PaginatedMovies> {
  return tmdbFetch(`/trending/movie/${timeWindow}`, paginatedMoviesSchema)
}

export function getTopRatedMovies(page = 1): Promise<PaginatedMovies> {
  return tmdbFetch(`/movie/top_rated?page=${page}`, paginatedMoviesSchema)
}

export function getMovieDetails(id: number): Promise<MovieDetails> {
  return tmdbFetch(`/movie/${id}`, movieDetailsSchema, { tags: [`movie-${id}`] })
}

export function searchMovies(query: string, page = 1): Promise<PaginatedMovies> {
  const params = new URLSearchParams({
    query,
    page: String(page),
    include_adult: 'false',
  })
  return tmdbFetch(`/search/movie?${params}`, paginatedMoviesSchema, { revalidate: 60 })
}

export function getMovieCredits(id: number): Promise<Credits> {
  return tmdbFetch(`/movie/${id}/credits`, creditsSchema, { tags: [`movie-${id}`] })
}

export function getMovieVideos(id: number) {
  return tmdbFetch(`/movie/${id}/videos`, videosSchema, { tags: [`movie-${id}`] })
}

export function getSimilarMovies(id: number) {
  return tmdbFetch(`/movie/${id}/similar`, paginatedMoviesSchema, { tags: [`movie-${id}`] })
}

export function pickBestTrailer(videos: Video[]): Video | null {
  // Prefer: official YouTube trailers, then any trailer, then any teaser, then nothing
  const youtube = videos.filter((v) => v.site === 'YouTube')
  return (
    youtube.find((v) => v.type === 'Trailer' && v.official) ??
    youtube.find((v) => v.type === 'Trailer') ??
    youtube.find((v) => v.type === 'Teaser') ??
    null
  )
}
