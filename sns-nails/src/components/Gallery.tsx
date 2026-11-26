import { useCallback, useEffect, useRef, useState } from 'react'
import { gallery } from '../config/site'
import Photo from './Photo'
import { useReducedMotion } from '../lib'
import SmartVideo from './SmartVideo'

export default function Gallery() {
  const [idx, setIdx] = useState<number | null>(null)
  const touch = useRef(0)
  const reduced = useReducedMotion()
  const go = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + gallery.length) % gallery.length)), [])
  useEffect(() => {
    if (idx === null) return
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setIdx(null); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    document.body.style.overflow = 'hidden'; window.addEventListener('keydown', k)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', k) }
  }, [idx, go])

  return (
    <section id="gallery" className="section">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="eyebrow">The gallery</p>
            <h2 className="h-display mt-4 text-[clamp(2.6rem,6vw,4.8rem)]">Real nails, <span className="font-script text-rose">real clients</span></h2>
          </div>
          <p className="max-w-sm text-espresso/70">Genuine designs created in our Kalkallo studio.</p>
        </header>

        <div className={`mt-14 columns-2 gap-3 sm:gap-5 ${gallery.length > 2 ? 'lg:columns-3' : 'mx-auto max-w-4xl'}`}>
          {gallery.map((g, i) => (
            <button key={g.src} onClick={() => setIdx(i)} data-reveal style={{ ['--d' as string]: `${(i % 3) * 120}ms` }}
              className="group relative mb-3 block w-full overflow-hidden rounded-[1.5rem] sm:mb-5" aria-label={`View ${g.alt} full screen`}>
              <Photo src={g.src} alt={g.alt} sizes="(max-width: 1024px) 50vw, 33vw" className={`w-full transition duration-[1400ms] ease-out group-hover:scale-[1.06] ${g.tall ? 'aspect-[3/4]' : 'aspect-square'}`} />
              {g.clip && <SmartVideo v={{ desktop: g.clip, poster: g.src }} reduced={reduced} className="pointer-events-none absolute inset-0 h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.06]" />}
              {g.clip && <span className="absolute left-3 top-3 rounded-full bg-ivory/85 px-3 py-1 text-[10px] uppercase tracking-[.2em] text-espresso">Animated photo</span>}
              <span className="absolute inset-0 bg-espresso/0 transition duration-700 group-hover:bg-espresso/15" />
              <span className="absolute bottom-4 right-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-ivory/90 text-lg opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">↗</span>
            </button>
          ))}
        </div>
      </div>

      {idx !== null && (
        <div role="dialog" aria-modal="true" aria-label="Gallery viewer" className="fixed inset-0 z-[90] flex items-center justify-center bg-espresso/95 p-4"
          onClick={() => setIdx(null)} onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1) }}>
          <Photo key={idx} src={gallery[idx].src} alt={gallery[idx].alt} eager sizes="100vw" className="rise max-h-[85vh] w-auto max-w-full rounded-2xl !object-contain" />
          <button className="absolute right-4 top-4 h-12 w-12 rounded-full bg-ivory/10 text-2xl text-ivory" aria-label="Close" onClick={() => setIdx(null)}>×</button>
          <button className="absolute left-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-ivory/10 text-2xl text-ivory" aria-label="Previous" onClick={(e) => { e.stopPropagation(); go(-1) }}>‹</button>
          <button className="absolute right-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-ivory/10 text-2xl text-ivory" aria-label="Next" onClick={(e) => { e.stopPropagation(); go(1) }}>›</button>
          <p className="absolute bottom-5 text-xs tracking-[.3em] text-ivory/60">{idx + 1} / {gallery.length}</p>
        </div>
      )}
    </section>
  )
}
