import { ImageResponse } from 'next/og'

export const alt = 'Cinext — Discover movies you’ll love'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 80,
        background: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #27272a 100%)',
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ fontSize: 36, opacity: 0.6, letterSpacing: 4 }}>CINEXT</div>
      <div style={{ fontSize: 110, fontWeight: 900, lineHeight: 0.95, marginTop: 24 }}>
        Discover movies
        <br />
        you’ll love
      </div>
    </div>,
    { ...size },
  )
}
