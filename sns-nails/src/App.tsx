import { useCallback, useState } from 'react'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import Booking from './components/Booking'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StickyBook from './components/StickyBook'
import Band from './components/Band'
import { Selection, useReveal } from './lib'

const words = ['BIAB', 'Gel-X', 'Chrome', 'French', 'Cat eye', 'Ombre', '3D art', 'Shellac']

export default function App() {
  const [ready, setReady] = useState(false)
  const [sel, setSel] = useState<Selection>({})
  const done = useCallback(() => setReady(true), [])
  useReveal(ready)
  return (
    <div className="grain">
      <Loader onDone={done} />
      <Nav />
      <main>
        <Hero ready={ready} />
        <div aria-hidden className="overflow-hidden border-y border-espresso/10 py-5">
          <div className="marquee flex w-max gap-12 whitespace-nowrap font-serif text-3xl italic text-espresso/70">
            {[...words, ...words].map((w, i) => <span key={i} className="flex items-center gap-12">{w}<span className="text-blush">✦</span></span>)}
          </div>
        </div>
        <Services sel={sel} setSel={setSel} />
        <Band />
        <Gallery />
        <Reviews />
        <Booking sel={sel} setSel={setSel} />
        <Contact />
      </main>
      <Footer />
      <StickyBook />
    </div>
  )
}
