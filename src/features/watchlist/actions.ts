'use server'

import { revalidatePath } from 'next/cache'
import { getWatchlist, setWatchlist } from './storage'

export async function toggleWatchlist(movieId: number): Promise<{ isOnWatchlist: boolean }> {
  const current = await getWatchlist()
  const exists = current.includes(movieId)
  const next = exists ? current.filter((id) => id !== movieId) : [movieId, ...current]
  await setWatchlist(next)

  revalidatePath('/', 'layout')

  return { isOnWatchlist: !exists }
}

export async function removeFromWatchlist(movieId: number): Promise<void> {
  const current = await getWatchlist()
  await setWatchlist(current.filter((id) => id !== movieId))
  revalidatePath('/', 'layout')
}

export async function clearWatchlist(): Promise<void> {
  await setWatchlist([])
  revalidatePath('/', 'layout')
}
