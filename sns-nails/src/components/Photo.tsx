import { useState } from 'react'

/** Image with a tasteful branded fallback while the real salon photos are being added. */
export default function Photo({ src, alt, className = '', eager = false, sizes = '(max-width: 768px) 100vw, 50vw' }:
  { src: string; alt: string; className?: string; eager?: boolean; sizes?: string }) {
  const [err, setErr] = useState(false)
  if (err) return (
    <div role="img" aria-label={`${alt} (image pending)`} className={`flex items-center justify-center bg-gradient-to-br from-nude via-blush/60 to-rose/70 ${className}`}>
      <span className="font-script text-5xl text-ivory/80">SNS</span>
    </div>
  )
  return <img src={src} alt={alt} sizes={sizes} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'auto'} onError={() => setErr(true)} className={`object-cover ${className}`} />
}
