import { useState } from 'react'
import { categories, priceNote } from '../config/site'
import { Selection, total } from '../lib'

type Props = { sel: Selection; setSel: (s: Selection) => void }

export default function Services({ sel, setSel }: Props) {
  const [open, setOpen] = useState<string>(categories[0].id)
  const toggle = (id: string) => { const n = { ...sel }; if (n[id]) delete n[id]; else n[id] = 1; setSel(n) }
  const qty = (id: string, d: number) => { const n = { ...sel }; n[id] = Math.max(1, Math.min(20, (n[id] || 1) + d)); setSel(n) }
  const count = Object.keys(sel).length

  return (
    <section id="services" className="section bg-nude/35">
      <div className="mx-auto max-w-5xl">
        <header className="text-center" data-reveal>
          <p className="eyebrow">The menu</p>
          <h2 className="h-display mt-4 text-[clamp(2.6rem,6vw,4.8rem)]">Services <span className="font-script text-rose">&</span> pricing</h2>
          <p className="mx-auto mt-5 max-w-lg text-espresso/70">Tap any service to add it to your appointment request, then continue to booking.</p>
        </header>

        <div className="mt-14 space-y-4">
          {categories.map((c, ci) => {
            const isOpen = open === c.id
            return (
              <article key={c.id} className="overflow-hidden rounded-[2rem] border border-espresso/10 bg-ivory/80" data-reveal style={{ ['--d' as string]: `${ci * 120}ms` }}>
                <h3>
                  <button className="flex w-full items-center justify-between gap-4 px-6 py-7 text-left sm:px-10" aria-expanded={isOpen} aria-controls={`cat-${c.id}`} onClick={() => setOpen(isOpen ? '' : c.id)}>
                    <span>
                      <span className="block font-script text-2xl text-rose">{c.script}</span>
                      <span className="h-display block text-4xl sm:text-5xl">{c.title}</span>
                    </span>
                    <span aria-hidden className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border border-espresso/20 text-2xl transition duration-500 ${isOpen ? 'rotate-45 bg-espresso text-ivory' : ''}`}>+</span>
                  </button>
                </h3>
                <div id={`cat-${c.id}`} className={`accordion ${isOpen ? 'open' : ''}`}>
                  <div>
                    <p className="px-6 text-espresso/65 sm:px-10">{c.intro}</p>
                    <ul className="grid gap-x-10 px-3 pb-8 pt-4 sm:grid-cols-2 sm:px-7">
                      {c.items.map((s) => {
                        const on = !!sel[s.id]
                        return (
                          <li key={s.id} className="relative">
                            <button onClick={() => toggle(s.id)} aria-pressed={on}
                              className={`group flex w-full items-baseline gap-3 rounded-2xl px-3 py-4 text-left transition ${on ? 'bg-blush/20' : 'hover:bg-nude/40'}`}>
                              <span aria-hidden className={`mt-1 grid h-5 w-5 shrink-0 place-items-center self-center rounded-full border text-[11px] transition ${on ? 'border-rose bg-rose text-ivory' : 'border-espresso/30'}`}>{on ? '✓' : ''}</span>
                              <span className="text-[16px]">{s.name}{s.unit && <span className="ml-1.5 text-[12px] text-espresso/55">{s.unit}</span>}</span>
                              <span aria-hidden className="mx-1 flex-1 translate-y-[-4px] border-b border-dotted border-espresso/25" />
                              <span className="font-serif text-xl">${s.price}</span>
                            </button>
                            {on && s.unit && (
                              <div className="-mt-1 mb-2 flex items-center gap-3 pl-11 text-sm">
                                <span className="text-espresso/60">Qty</span>
                                <button className="h-9 w-9 rounded-full border border-espresso/20" onClick={() => qty(s.id, -1)} aria-label={`Fewer ${s.name}`}>−</button>
                                <span className="w-5 text-center tabular-nums" aria-live="polite">{sel[s.id]}</span>
                                <button className="h-9 w-9 rounded-full border border-espresso/20" onClick={() => qty(s.id, 1)} aria-label={`More ${s.name}`}>+</button>
                              </div>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-[13px] italic text-espresso/60" data-reveal>{priceNote}</p>

        <div className={`sticky bottom-20 z-30 mx-auto mt-8 max-w-xl transition duration-500 md:bottom-6 ${count ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>
          <a href="#book" className="flex items-center justify-between gap-4 rounded-full bg-espresso py-2 pl-6 pr-2 text-ivory shadow-2xl">
            <span className="text-sm">{count} selected · est. <span className="font-serif text-lg">${total(sel)}</span></span>
            <span className="rounded-full bg-blush px-5 py-3 text-[12px] uppercase tracking-[.18em] text-espresso">Continue</span>
          </a>
        </div>
      </div>
    </section>
  )
}
