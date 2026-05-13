import { z } from 'zod'

const envSchema = z.object({
  TMDB_READ_ACCESS_TOKEN: z.string().min(1, 'TMDB_READ_ACCESS_TOKEN is required'),
})

export const env = envSchema.parse({
  TMDB_READ_ACCESS_TOKEN: process.env.TMDB_READ_ACCESS_TOKEN,
})
