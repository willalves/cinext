import { Suspense } from 'react'
import { getPopularMovies, getTopRatedMovies, getTrendingMovies } from '@/lib/tmdb/endpoints'
import { HeroMovie } from '@/features/movies/components/hero-movie'
import { MovieRow } from '@/features/movies/components/movie-row'
import { HeroSkeleton, MovieRowSkeleton } from '@/features/movies/components/skeletons'

export default function Home() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<MovieRowSkeleton title="Trending This Week" />}>
        <Trending />
      </Suspense>

      <Suspense fallback={<MovieRowSkeleton title="Popular" />}>
        <Popular />
      </Suspense>

      <Suspense fallback={<MovieRowSkeleton title="Top Rated" />}>
        <TopRated />
      </Suspense>
    </div>
  )
}

async function Hero() {
  const trending = await getTrendingMovies('week')
  const featured = trending.results[0]
  if (!featured) return null
  return <HeroMovie movie={featured} />
}

async function Trending() {
  const data = await getTrendingMovies('week')
  return <MovieRow title="Trending This Week" movies={data.results} />
}

async function Popular() {
  const data = await getPopularMovies()
  return <MovieRow title="Popular" movies={data.results} />
}

async function TopRated() {
  const data = await getTopRatedMovies()
  return <MovieRow title="Top Rated" movies={data.results} />
}
