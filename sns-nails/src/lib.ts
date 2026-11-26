import { useEffect, useState } from 'react'
import { hours, lastBookingBeforeClose, slotMinutes, afterHoursFrom, allServices } from './config/site'

export type Selection = Record<string, number> // serviceId -> quantity

export const toMin = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m }
export const fmt12 = (mins: number) => {
  const h = Math.floor(mins / 60), m = mins % 60
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`
}
export const fmtHour = (t: string) => fmt12(toMin(t)).replace(':00', '')

/** Bookable start times for a YYYY-MM-DD date, based on published hours. */
export function slotsFor(dateStr: string): { value: string; label: string; late: boolean }[] {
  if (!dateStr) return []
  const d = new Date(`${dateStr}T00:00:00`)
  const h = hours[d.getDay()]
  const start = toMin(h.open), end = toMin(h.close) - lastBookingBeforeClose
  const now = new Date()
  const isToday = d.toDateString() === now.toDateString()
  const nowMin = now.getHours() * 60 + now.getMinutes() + 60 // at least 1h notice
  const out = []
  for (let m = start; m <= end; m += slotMinutes) {
    if (isToday && m < nowMin) continue
    const value = `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
    out.push({ value, label: fmt12(m), late: m >= toMin(afterHoursFrom) })
  }
  return out
}

export const total = (sel: Selection) =>
  Object.entries(sel).reduce((sum, [id, q]) => sum + (allServices.find((s) => s.id === id)?.price ?? 0) * q, 0)

export const todayISO = () => {
  const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10)
}

export function useReducedMotion() {
  const [r, setR] = useState(false)
  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)'); setR(q.matches)
    const f = () => setR(q.matches); q.addEventListener('change', f); return () => q.removeEventListener('change', f)
  }, [])
  return r
}

/** One shared IntersectionObserver for all [data-reveal] elements. */
export function useReveal(dep: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-in)')
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) } }), { rootMargin: '0px 0px -8% 0px' })
    els.forEach((el) => io.observe(el)); return () => io.disconnect()
  }, [dep])
}
