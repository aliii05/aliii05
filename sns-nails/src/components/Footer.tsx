import Logo from './Logo'
import { business } from '../config/site'

export default function Footer() {
  return (
    <footer className="bg-espresso px-4 pb-28 pt-16 text-ivory/70 sm:px-8 md:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <div className="w-40"><Logo tone="#FAF6F2" /></div>
        <p className="max-w-md text-sm">Boutique nail salon in Kalkallo, serving Donnybrook, Mickleham, Beveridge, Craigieburn and Melbourne's north.</p>
        <p className="text-sm"><a href={`tel:${business.phone}`} className="hover:text-blush">{business.phoneDisplay}</a> · <a href={`https://www.instagram.com/${business.instagram}/`} className="hover:text-blush" target="_blank" rel="noopener">@{business.instagram}</a></p>
        <p className="text-[11px] uppercase tracking-[.3em] text-ivory/40">© {new Date().getFullYear()} {business.name}</p>
      </div>
    </footer>
  )
}
