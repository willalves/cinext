import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockGet = vi.fn()
const mockSet = vi.fn()

vi.mock('next/headers', () => ({
  cookies: () => Promise.resolve({ get: mockGet, set: mockSet }),
}))

const { getWatchlist, setWatchlist, isOnWatchlist } = await import('./storage')

describe('getWatchlist', () => {
  beforeEach(() => {
    mockGet.mockReset()
  })

  it('returns empty array when cookie is missing', async () => {
    mockGet.mockReturnValue(undefined)
    expect(await getWatchlist()).toEqual([])
  })

  it('parses a valid cookie value', async () => {
    mockGet.mockReturnValue({ value: '[1,2,3]' })
    expect(await getWatchlist()).toEqual([1, 2, 3])
  })

  it('returns empty on malformed JSON', async () => {
    mockGet.mockReturnValue({ value: 'not valid json' })
    expect(await getWatchlist()).toEqual([])
  })

  it('returns empty when shape is invalid', async () => {
    mockGet.mockReturnValue({ value: '{"not": "an array"}' })
    expect(await getWatchlist()).toEqual([])
  })

  it('rejects negative or non-integer entries', async () => {
    mockGet.mockReturnValue({ value: '[-1, 2.5, "three"]' })
    expect(await getWatchlist()).toEqual([])
  })
})

describe('isOnWatchlist', () => {
  beforeEach(() => mockGet.mockReset())

  it('returns true when movie id is present', async () => {
    mockGet.mockReturnValue({ value: '[1,2,3]' })
    expect(await isOnWatchlist(2)).toBe(true)
  })

  it('returns false when missing', async () => {
    mockGet.mockReturnValue({ value: '[1,2,3]' })
    expect(await isOnWatchlist(9)).toBe(false)
  })
})

describe('setWatchlist', () => {
  beforeEach(() => mockSet.mockReset())

  it('writes JSON-serialized value with secure flags', async () => {
    await setWatchlist([42, 7])
    expect(mockSet).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'watchlist',
        value: '[42,7]',
        httpOnly: true,
        sameSite: 'lax',
      }),
    )
  })
})
