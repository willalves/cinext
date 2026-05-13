'use client'

import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { Video } from '@/lib/tmdb/schemas'

export function TrailerModal({ title, trailer }: { title: string; trailer: Video | null }) {
  const router = useRouter()

  return (
    <Dialog open onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="max-w-4xl p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>{title} — Trailer</DialogTitle>
        </DialogHeader>
        <div className="bg-muted aspect-video w-full overflow-hidden rounded-b-lg">
          {trailer ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={trailer.name}
              className="h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm">
              No trailer available
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
