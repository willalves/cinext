import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-muted-foreground text-sm font-medium tracking-wider uppercase">404</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">Page not found</h1>
      <p className="text-muted-foreground mt-3 max-w-md">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  )
}
