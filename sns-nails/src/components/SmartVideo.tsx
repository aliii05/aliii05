import { useEffect, useRef, useState } from 'react'

type V = { desktop: string; mobile?: string; poster: string }

/** Muted ambient loop: small file on phones / data-saver, plays only while visible.
 *  These are slow, calm loops, so they still play with Reduce Motion on.
 *  If autoplay is blocked (e.g. iPhone Low Power Mode) it starts on the first tap or scroll. */
export default function SmartVideo({ v, className = '' }: { v: V; reduced?: boolean; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [src, setSrc] = useState('')
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    setSrc(window.innerWidth < 768 || conn?.saveData ? v.mobile || v.desktop : v.desktop)
  }, [v])
  useEffect(() => {
    const el = ref.current; if (!el || !src) return
    // iOS Safari needs the real `muted` attribute (React only sets the property).
    el.muted = true; el.defaultMuted = true; el.setAttribute('muted', ''); el.setAttribute('playsinline', '')
    let visible = false
    const events = ['touchstart', 'pointerdown', 'scroll', 'keydown']
    const retry = () => { if (visible) el.play().catch(() => {}); events.forEach((e) => window.removeEventListener(e, retry)) }
    const tryPlay = () => el.play().catch(() => events.forEach((e) => window.addEventListener(e, retry, { passive: true, once: true })))
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) tryPlay(); else el.pause() }, { threshold: 0.15 })
    io.observe(el)
    return () => { io.disconnect(); events.forEach((e) => window.removeEventListener(e, retry)) }
  }, [src])
  if (!src) return <img src={v.poster} alt="" aria-hidden className={className} />
  return <video ref={ref} src={src} poster={v.poster} muted autoPlay loop playsInline preload="metadata" aria-hidden className={className} />
}
