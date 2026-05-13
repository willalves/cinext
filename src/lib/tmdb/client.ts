import 'server-only'
import { z } from 'zod'
import { env } from '@/lib/env'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

export class TmdbError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public endpoint: string,
  ) {
    super(`TMDB request failed: ${status} ${statusText} (${endpoint})`)
    this.name = 'TmdbError'
  }
}

type FetchOptions = {
  revalidate?: number | false
  tags?: string[]
}

export async function tmdbFetch<TSchema extends z.ZodTypeAny>(
  endpoint: string,
  schema: TSchema,
  options: FetchOptions = {},
): Promise<z.infer<TSchema>> {
  const url = `${TMDB_BASE_URL}${endpoint}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.TMDB_READ_ACCESS_TOKEN}`,
      Accept: 'application/json',
    },
    next: {
      revalidate: options.revalidate ?? 3600,
      tags: options.tags,
    },
  })

  if (!res.ok) {
    throw new TmdbError(res.status, res.statusText, endpoint)
  }

  const data = await res.json()
  return schema.parse(data)
}
