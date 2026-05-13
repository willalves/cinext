import { tmdbFetch } from './client'
import {
  movieDetailsSchema,
  paginatedMoviesSchema,
  type MovieDetails,
  type PaginatedMovies,
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
