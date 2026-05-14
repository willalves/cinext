import 'server-only'

import { cookies } from 'next/headers'
import { z } from 'zod'

const COOKIE_NAME = 'watchlist'
const ONE_YEAR = 60 * 60 * 24 * 365

const watchlistSchema = z.array(z.number().int().positive())

export async function getWatchlist(): Promise<number[]> {
  const store = await cookies()
  const raw = store.get(COOKIE_NAME)?.value
  if (!raw) return []
  try {
    const parsed = watchlistSchema.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : []
  } catch {
    return []
  }
}

export async function isOnWatchlist(movieId: number): Promise<boolean> {
  const list = await getWatchlist()
  return list.includes(movieId)
}

export async function setWatchlist(ids: number[]): Promise<void> {
  const store = await cookies()
  store.set({
    name: COOKIE_NAME,
    value: JSON.stringify(ids),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: ONE_YEAR,
    path: '/',
  })
}
