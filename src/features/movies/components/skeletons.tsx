import { Skeleton } from '@/components/ui/skeleton'

export function HeroSkeleton() {
  return (
    <section className="relative h-[70vh] min-h-120 w-full overflow-hidden">
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="from-background via-background/40 absolute inset-0 bg-linear-to-t to-transparent" />
      <div className="relative z-10 container mx-auto flex h-full flex-col justify-end px-4 pb-12">
        <div className="max-w-2xl space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-16 w-3/4 md:h-24" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-4 w-2/3 max-w-md" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-11 w-28" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function MovieRowSkeleton({ title }: { title?: string }) {
  return (
    <section className="container mx-auto space-y-4 px-4 py-8">
      {title ? (
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      ) : (
        <Skeleton className="h-6 w-40" />
      )}
      <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-36 shrink-0 sm:w-44 lg:w-48">
            <Skeleton className="aspect-2/3 w-full rounded-lg" />
            <div className="mt-2 space-y-1.5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
