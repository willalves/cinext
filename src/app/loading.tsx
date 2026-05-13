import { HeroSkeleton, MovieRowSkeleton } from '@/features/movies/components/skeletons'

export default function Loading() {
  return (
    <div className="space-y-4">
      <HeroSkeleton />
      <MovieRowSkeleton />
      <MovieRowSkeleton />
      <MovieRowSkeleton />
    </div>
  )
}
