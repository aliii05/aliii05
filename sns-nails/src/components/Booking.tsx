import { FormEvent, useMemo, useState } from 'react'
import { allServices, business, categories, priceNote, afterHoursFrom } from '../config/site'
import { Selection, fmtHour, slotsFor, todayISO, total } from '../lib'

type Props = { sel: Selection; setSel: (s: Selection) => void }

export default function Booking({ sel, setSel }: Props) {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [tried, setTried] = useState(false)
  const slots = useMemo(() => slotsFor(date), [date])
  const est = total(sel)
  const chosen = Object.entries(sel).map(([id, q]) => ({ s: allServices.find((x) => x.id === id)!, q })).filter((x) => x.s)
  const errors = { name: !name.trim(), services: chosen.length === 0, date: !date, time: !time }
  const invalid = Object.values(errors).some(Boolean)
  const toggle = (id: string) => { const n = { ...sel }; if (n[id]) delete n[id]; else n[id] = 1; setSel(n) }

  const submit = (e: FormEvent) => {
    e.preventDefault(); setTried(true)
    if (invalid) return
    const when = new Date(`${date}T00:00:00`).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    const slot = slots.find((s) => s.value === time)?.label ?? time
    const body = [
      `Hi SNS Nails, I'd like to request an appointment.`, ``,
      `Name: ${name.trim()}`,
      `Services: ${chosen.map(({ s, q }) => (q > 1 ? `${s.name} x${q}` : s.name)).join(', ')}`,
      `Preferred: ${when} at ${slot}`,
      `Estimated total: $${est} AUD`,
      notes.trim() ? `Notes: ${notes.trim()}` : '', ``,
      `I understand this is a request and is subject to your confirmation.`,
    ].filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n')
    window.location.href = `sms:${business.phone}?&body=${encodeURIComponent(body)}`
  }
  const err = (k: keyof typeof errors) => tried && errors[k]

  return (
    <section id="book" className="section">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[.8fr_1.2fr]">
        <div data-reveal>
          <p className="eyebrow">Appointments</p>
          <h2 className="h-display mt-4 text-[clamp(2.6rem,6vw,4.6rem)]">Request your <span className="font-script text-rose">moment</span></h2>
          <p className="mt-6 text-espresso/70">Choose your services and a preferred time. Sending opens your SMS app with a ready-to-send message to the salon.</p>
          <div className="mt-8 rounded-3xl border border-blush/50 bg-blush/10 p-5 text-[14px] leading-relaxed">
            <strong className="font-medium">Please note:</strong> this is an appointment <em>request</em>. We don't show live availability. Your time is only booked once the salon confirms by text or call.
          </div>
          <a href={`tel:${business.phone}`} className="btn-light mt-8 w-full sm:w-auto">Call {business.phoneDisplay}</a>
        </div>

        <form onSubmit={submit} noValidate className="rounded-[2rem] border border-espresso/10 bg-white/50 p-5 shadow-[0_30px_60px_-40px_rgba(73,51,44,.35)] sm:p-9" data-reveal style={{ ['--d' as string]: '150ms' }}>
          <label className="block">
            <span className="eyebrow">Your name</span>
            <input className="field mt-2" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" placeholder="First name" aria-invalid={err('name')} />
            {err('name') && <span className="mt-1 block text-sm text-rose">Please add your name.</span>}
          </label>

          <fieldset className="mt-7">
            <legend className="eyebrow">Services</legend>
            {categories.map((c) => (
              <div key={c.id} className="mt-3">
                <p className="mb-2 text-[12px] text-espresso/55">{c.title}</p>
                <div className="flex flex-wrap gap-2">
                  {c.items.map((s) => {
                    const on = !!sel[s.id]
                    return (
                      <button type="button" key={s.id} onClick={() => toggle(s.id)} aria-pressed={on}
                        className={`min-h-[40px] rounded-full border px-4 py-2 text-[13px] transition ${on ? 'border-espresso bg-espresso text-ivory' : 'border-espresso/15 hover:border-rose'}`}>
                        {s.name} <span className={on ? 'text-blush' : 'text-espresso/50'}>${s.price}{sel[s.id] > 1 ? ` ×${sel[s.id]}` : ''}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
            {err('services') && <span className="mt-2 block text-sm text-rose">Choose at least one service.</span>}
          </fieldset>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="eyebrow">Preferred date</span>
              <input type="date" className="field mt-2" min={todayISO()} value={date} onChange={(e) => { setDate(e.target.value); setTime('') }} aria-invalid={err('date')} />
              {err('date') && <span className="mt-1 block text-sm text-rose">Pick a date.</span>}
            </label>
            <label className="block">
              <span className="eyebrow">Preferred time</span>
              <select className="field mt-2" value={time} onChange={(e) => setTime(e.target.value)} disabled={!date} aria-invalid={err('time')}>
                <option value="">{!date ? 'Choose a date first' : slots.length ? 'Select a time' : 'No times left today'}</option>
                {slots.map((s) => <option key={s.value} value={s.value}>{s.label}{s.late ? ' *' : ''}</option>)}
              </select>
              {err('time') && <span className="mt-1 block text-sm text-rose">Pick a time.</span>}
            </label>
          </div>
          {slots.some((s) => s.late) && <p className="mt-2 text-[12px] text-espresso/55">* Appointments from {fmtHour(afterHoursFrom)} are subject to terms and conditions.</p>}

          <label className="mt-7 block">
            <span className="eyebrow">Notes (optional)</span>
            <textarea className="field mt-2 min-h-[96px] resize-y" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Design ideas, nail length, inspiration…" />
          </label>

          <div className="mt-8 flex flex-col items-stretch justify-between gap-5 border-t border-espresso/10 pt-6 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow">Estimated total</p>
              <p className="h-display mt-1 text-5xl" aria-live="polite">${est}<span className="ml-1 text-base text-espresso/50">AUD</span></p>
            </div>
            <button type="submit" className="btn-dark">Send request by SMS</button>
          </div>
          <p className="mt-4 text-[12px] italic text-espresso/55">{priceNote}</p>
        </form>
      </div>
    </section>
  )
}
