import { useEffect, useState } from 'react'
import { business, reviews } from '../config/site'
import { useReducedMotion } from '../lib'
import Stars from './Stars'

export default function Reviews() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (paused || reduced) return
    const t = setTimeout(() => setI((n) => (n + 1) % reviews.length), 6500); return () => clearTimeout(t)
  }, [i, paused, reduced])
  const go = (d: number) => setI((n) => (n + d + reviews.length) % reviews.length)

  return (
    <section id="reviews" className="section overflow-hidden bg-espresso text-ivory">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none font-script text-[40vw] leading-none text-ivory/[.03]">love</div>
      <div className="relative mx-auto max-w-4xl text-center">
        <div data-reveal>
          <p className="eyebrow !text-blush">Kind words</p>
          <div className="mt-6 flex items-center justify-center gap-5">
            <span className="h-display text-7xl sm:text-8xl">{business.rating.toFixed(1)}</span>
            <span className="text-left text-sm text-ivory/70"><Stars className="text-blush" /><span className="mt-1 block">rating<br />on Google</span></span>
          </div>
        </div>

        <div className="relative mt-14 min-h-[260px] sm:min-h-[220px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-live="polite" aria-roledescription="carousel">
          {reviews.map((r, n) => (
            <figure key={r.name} aria-hidden={n !== i} className={`absolute inset-0 transition-all duration-1000 ${n === i ? 'opacity-100 blur-0' : 'pointer-events-none translate-y-4 opacity-0 blur-sm'}`}>
              <blockquote className="h-display text-[clamp(1.6rem,3.6vw,2.6rem)] italic leading-snug">“{r.text}”</blockquote>
              <figcaption className="mt-8 font-script text-4xl text-blush">{r.name}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button className="h-12 w-12 rounded-full border border-ivory/20 transition hover:bg-ivory hover:text-espresso" onClick={() => go(-1)} aria-label="Previous review">‹</button>
          <div className="flex gap-2">
            {reviews.map((r, n) => (
              <button key={r.name} onClick={() => setI(n)} aria-label={`Review from ${r.name}`} className="grid h-6 w-6 place-items-center">
                <span className={`block h-1.5 rounded-full transition-all duration-500 ${n === i ? 'w-6 bg-blush' : 'w-1.5 bg-ivory/30'}`} />
              </button>
            ))}
          </div>
          <button className="h-12 w-12 rounded-full border border-ivory/20 transition hover:bg-ivory hover:text-espresso" onClick={() => go(1)} aria-label="Next review">›</button>
        </div>
      </div>
    </section>
  )
}
