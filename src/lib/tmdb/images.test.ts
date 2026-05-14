import { describe, expect, it } from 'vitest'
import { getBackdropUrl, getPosterUrl, getProfileUrl } from './images'

describe('getPosterUrl', () => {
  it('returns null when path is null', () => {
    expect(getPosterUrl(null)).toBeNull()
  })

  it('builds URL with the default size', () => {
    expect(getPosterUrl('/abc.jpg')).toBe('https://image.tmdb.org/t/p/w500/abc.jpg')
  })

  it('respects an explicit size', () => {
    expect(getPosterUrl('/abc.jpg', 'w185')).toBe('https://image.tmdb.org/t/p/w185/abc.jpg')
  })
})

describe('getBackdropUrl', () => {
  it('returns null when path is null', () => {
    expect(getBackdropUrl(null)).toBeNull()
  })

  it('uses w1280 by default', () => {
    expect(getBackdropUrl('/x.jpg')).toBe('https://image.tmdb.org/t/p/w1280/x.jpg')
  })
})

describe('getProfileUrl', () => {
  it('returns null when path is null', () => {
    expect(getProfileUrl(null)).toBeNull()
  })

  it('uses w185 by default', () => {
    expect(getProfileUrl('/p.jpg')).toBe('https://image.tmdb.org/t/p/w185/p.jpg')
  })
})
