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

export const castMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
  order: z.number(),
})

export const crewMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  job: z.string(),
  department: z.string(),
  profile_path: z.string().nullable(),
})

export const creditsSchema = z.object({
  cast: z.array(castMemberSchema),
  crew: z.array(crewMemberSchema),
})

export const videoSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  site: z.string(),
  type: z.string(),
  official: z.boolean(),
})

export const videosSchema = z.object({
  id: z.number(),
  results: z.array(videoSchema),
})

export type MovieSummary = z.infer<typeof movieSummarySchema>
export type PaginatedMovies = z.infer<typeof paginatedMoviesSchema>
export type MovieDetails = z.infer<typeof movieDetailsSchema>
export type Credits = z.infer<typeof creditsSchema>
export type CastMember = z.infer<typeof castMemberSchema>
export type Video = z.infer<typeof videoSchema>
