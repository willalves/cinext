import Image from 'next/image'
import { getProfileUrl } from '@/lib/tmdb/images'
import type { CastMember } from '@/lib/tmdb/schemas'

export function CastRow({ title, cast }: { title: string; cast: CastMember[] }) {
  return (
    <section className="container mx-auto space-y-4 px-4 py-8">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
        {cast.map((person) => {
          const profileUrl = getProfileUrl(person.profile_path, 'w185')
          return (
            <div key={person.id} className="w-28 shrink-0 snap-start space-y-2 sm:w-32">
              <div className="bg-muted ring-border/40 relative aspect-square overflow-hidden rounded-full ring-1">
                {profileUrl ? (
                  <Image src={profileUrl} alt="" fill sizes="128px" className="object-cover" />
                ) : (
                  <div className="text-muted-foreground flex h-full items-center justify-center text-xs">
                    No photo
                  </div>
                )}
              </div>
              <div className="space-y-0.5 text-center">
                <p className="line-clamp-1 text-sm font-medium">{person.name}</p>
                <p className="text-muted-foreground line-clamp-1 text-xs">{person.character}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
