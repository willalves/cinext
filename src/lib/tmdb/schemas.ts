import { z } from 'zod'

export const movieSummarySchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  genre_ids: z.array(z.number()),
})

export const paginatedMoviesSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(movieSummarySchema),
})

export const movieDetailsSchema = movieSummarySchema
  .extend({
    runtime: z.number().nullable(),
    tagline: z.string().nullable(),
    status: z.string(),
    genres: z.array(z.object({ id: z.number(), name: z.string() })),
    production_companies: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        logo_path: z.string().nullable(),
      }),
    ),
    homepage: z.string().nullable(),
    imdb_id: z.string().nullable(),
  })
  .omit({ genre_ids: true })

export type MovieSummary = z.infer<typeof movieSummarySchema>
export type PaginatedMovies = z.infer<typeof paginatedMoviesSchema>
export type MovieDetails = z.infer<typeof movieDetailsSchema>
