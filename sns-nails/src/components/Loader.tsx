import { useEffect, useState } from 'react'
import Logo from './Logo'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [out, setOut] = useState(false)
  const [gone, setGone] = useState(false)
  useEffect(() => {

    const wait = 2200 // just long enough to read the logo
    let t1: number, t2: number
    const fonts = Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 1200))])
    fonts.then(() => {
      t1 = window.setTimeout(() => { setOut(true); onDone() }, wait)
      t2 = window.setTimeout(() => setGone(true), wait + 1100)
    })
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])
  if (gone) return null
  return (
    <div aria-hidden className={`curtain fixed inset-0 z-[100] flex items-center justify-center bg-ivory ${out ? 'out' : ''}`}>
      <div className="w-[min(72vw,360px)]">
        <Logo animate />
        <p className="rise mt-6 text-center text-[10px] uppercase tracking-[.5em] text-rose" style={{ ['--d' as string]: '1s' }}>Kalkallo · Melbourne</p>
      </div>
    </div>
  )
}

