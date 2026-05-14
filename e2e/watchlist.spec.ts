import { test, expect } from '@playwright/test'

test.describe('Watchlist flow', () => {
  test.beforeEach(async ({ context }) => {
    // Start each test with an empty watchlist
    await context.clearCookies()
  })

  test('user can add a movie to their watchlist from search', async ({ page }) => {
    await page.goto('/search?q=inception')

    // Wait for results to render (Suspense streams in)
    const firstResult = page.locator('a[href^="/movies/"]').first()
    await expect(firstResult).toBeVisible()

    // Open detail page
    await firstResult.click()
    await expect(page).toHaveURL(/\/movies\/\d+/)

    // Add to watchlist
    const addButton = page.getByRole('button', { name: /add to watchlist/i })
    await expect(addButton).toBeVisible()
    await addButton.click()

    // Optimistic toggle: button instantly says "On watchlist"
    await expect(page.getByRole('button', { name: /on watchlist/i })).toBeVisible()

    // Navigate to watchlist page
    await page.getByRole('link', { name: /watchlist/i }).click()
    await expect(page).toHaveURL('/watchlist')

    // Should see at least one movie card
    await expect(page.locator('a[href^="/movies/"]').first()).toBeVisible()
    await expect(page.getByText(/1 movie saved/i)).toBeVisible()
  })

  test('user can clear their entire watchlist', async ({ page, context }) => {
    // Seed the cookie directly to skip the add flow
    await context.addCookies([
      {
        name: 'watchlist',
        value: encodeURIComponent('[27205]'), // Inception's TMDB id
        domain: 'localhost',
        path: '/',
      },
    ])

    await page.goto('/watchlist')
    await expect(page.getByText(/1 movie saved/i)).toBeVisible()

    await page.getByRole('button', { name: /clear/i }).click()

    // Confirmation dialog appears
    await expect(page.getByRole('alertdialog')).toBeVisible()
    await page.getByRole('button', { name: /clear watchlist/i }).click()

    await expect(page.getByText(/your watchlist is empty/i)).toBeVisible()
  })
})
