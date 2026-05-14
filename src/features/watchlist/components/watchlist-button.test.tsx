import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const toggleMock = vi.fn().mockResolvedValue({ isOnWatchlist: true })
vi.mock('../actions', () => ({
  toggleWatchlist: (id: number) => toggleMock(id),
}))

const { WatchlistButton } = await import('./watchlist-button')

describe('<WatchlistButton />', () => {
  it('renders "Add to watchlist" when not saved', () => {
    render(<WatchlistButton movieId={1} initialIsOnWatchlist={false} />)
    expect(screen.getByRole('button', { name: /add to watchlist/i })).toBeInTheDocument()
  })

  it('renders "On watchlist" when initially saved', () => {
    render(<WatchlistButton movieId={1} initialIsOnWatchlist={true} />)
    expect(screen.getByRole('button', { name: /on watchlist/i })).toBeInTheDocument()
  })

  it('optimistically toggles the label and calls the action on click', async () => {
    const user = userEvent.setup()
    toggleMock.mockImplementationOnce(() => new Promise(() => {}))
    render(<WatchlistButton movieId={42} initialIsOnWatchlist={false} />)

    await user.click(screen.getByRole('button', { name: /add to watchlist/i }))

    expect(screen.getByRole('button', { name: /on watchlist/i })).toBeInTheDocument()
    expect(toggleMock).toHaveBeenCalledWith(42)
  })

  it('exposes pressed state for assistive tech', () => {
    render(<WatchlistButton movieId={1} initialIsOnWatchlist={true} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })
})
