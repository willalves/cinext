'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Sentry comes handy
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Something went wrong</h1>
      <p className="text-muted-foreground mt-3 max-w-md">
        We hit an unexpected error. Try again, and if it persists, refresh the page.
      </p>
      {error.digest && (
        <p className="text-muted-foreground/70 mt-2 text-xs">Reference: {error.digest}</p>
      )}
      <div className="mt-6 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  )
}
