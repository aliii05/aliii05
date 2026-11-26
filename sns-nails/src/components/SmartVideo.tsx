import { useEffect, useRef, useState } from 'react'

type V = { desktop: string; mobile?: string; poster: string }

/** Muted looping video: picks a small file on phones / data-saver, plays only while visible,
 *  and shows just the poster for reduced-motion users. */
export default function SmartVideo({ v, reduced, className = '' }: { v: V; reduced: boolean; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [src, setSrc] = useState('')
  useEffect(() => {
    if (reduced) return
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    setSrc(window.innerWidth < 768 || conn?.saveData ? v.mobile || v.desktop : v.desktop)
  }, [reduced, v])
  useEffect(() => {
    const el = ref.current; if (!el || !src) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.play().catch(() => {}); else el.pause() }, { threshold: 0.15 })
    io.observe(el); return () => io.disconnect()
  }, [src])
  if (reduced || !src) return <img src={v.poster} alt="" aria-hidden className={className} />
  return <video ref={ref} src={src} poster={v.poster} muted loop playsInline preload="metadata" aria-hidden className={className} />
}
