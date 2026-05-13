const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export const POSTER_SIZES = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'] as const
export const BACKDROP_SIZES = ['w300', 'w780', 'w1280', 'original'] as const
export const PROFILE_SIZES = ['w45', 'w185', 'h632', 'original'] as const

export type PosterSize = (typeof POSTER_SIZES)[number]
export type BackdropSize = (typeof BACKDROP_SIZES)[number]
export type ProfileSize = (typeof PROFILE_SIZES)[number]

export function getPosterUrl(path: string | null, size: PosterSize = 'w500'): string | null {
  if (!path) return null
  return `${IMAGE_BASE_URL}/${size}${path}`
}

export function getBackdropUrl(path: string | null, size: BackdropSize = 'w1280'): string | null {
  if (!path) return null
  return `${IMAGE_BASE_URL}/${size}${path}`
}

export function getProfileUrl(path: string | null, size: ProfileSize = 'w185'): string | null {
  if (!path) return null
  return `${IMAGE_BASE_URL}/${size}${path}`
}
