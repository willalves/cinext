import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <article>
      <section className="relative">
        <Skeleton className="absolute inset-0 -z-10 h-[80vh] rounded-none" />
        <div className="container mx-auto px-4 pt-20 pb-12 md:pt-32">
          <div className="grid gap-8 md:grid-cols-[240px_1fr] md:gap-12">
            <Skeleton className="mx-auto aspect-2/3 w-48 rounded-lg md:mx-0 md:w-60" />
            <div className="space-y-4">
              <Skeleton className="h-16 w-3/4 md:h-24" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-20 max-w-2xl" />
              <div className="flex gap-3 pt-2">
                <Skeleton className="h-11 w-36" />
                <Skeleton className="h-11 w-44" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
