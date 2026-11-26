import { useEffect, useState } from 'react'
import Logo from './Logo'
import { business } from '../config/site'

const links = [['Services', '#services'], ['Gallery', '#gallery'], ['Reviews', '#reviews'], ['Visit', '#visit']]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40); f()
    window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${solid || open ? 'bg-ivory/90 shadow-[0_1px_0_rgba(73,51,44,.08)] backdrop-blur-md' : ''}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8 md:h-20" aria-label="Main">
        <a href="#top" aria-label="SNS Nails home" className="w-28 md:w-32"><Logo /></a>
        <ul className="hidden items-center gap-10 text-[12px] uppercase tracking-[.24em] md:flex">
          {links.map(([l, h]) => <li key={h}><a href={h} className="transition hover:text-rose">{l}</a></li>)}
        </ul>
        <div className="flex items-center gap-3">
          <a href="#book" className="btn-dark hidden !px-5 !py-2.5 md:inline-flex">Book</a>
          <button className="relative h-11 w-11 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            <span className={`absolute left-2.5 right-2.5 h-px bg-espresso transition duration-500 ${open ? 'top-1/2 rotate-45' : 'top-[18px]'}`} />
            <span className={`absolute left-2.5 right-2.5 h-px bg-espresso transition duration-500 ${open ? 'top-1/2 -rotate-45' : 'top-[26px]'}`} />
          </button>
        </div>
      </nav>
      <div className={`overflow-hidden bg-ivory transition-[max-height] duration-700 md:hidden ${open ? 'max-h-[100dvh]' : 'max-h-0'}`}>
        <ul className="flex h-[calc(100dvh-4rem)] flex-col justify-center gap-6 px-8">
          {[...links, ['Book', '#book']].map(([l, h]) => (
            <li key={h}><a href={h} onClick={() => setOpen(false)} className="h-display text-5xl">{l}</a></li>
          ))}
          <li className="mt-6 text-sm text-rose"><a href={`tel:${business.phone}`}>{business.phoneDisplay}</a></li>
        </ul>
      </div>
    </header>
  )
}
