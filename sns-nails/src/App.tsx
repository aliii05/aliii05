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
