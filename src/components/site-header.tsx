import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export function SiteHeader() {
  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          Cinext
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href="/search"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Search
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
