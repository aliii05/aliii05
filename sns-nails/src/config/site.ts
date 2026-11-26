// ─────────────────────────────────────────────────────────────
//  SNS Nails — central content file.
//  Edit prices, hours, reviews and contact details here only.
// ─────────────────────────────────────────────────────────────

export const business = {
  name: 'SNS Nails',
  tagline: 'Beauty at your fingertips.',
  address: { street: '30 Stilt St', suburb: 'Kalkallo', state: 'VIC', postcode: '3064', country: 'AU' },
  phoneDisplay: '+61 469 360 879',
  phone: '+61469360879',
  instagram: 'snsnails3',
  rating: 5.0,
  reviewCount: 30,
  url: 'https://snsnails.com.au', // update once the domain is known
  geo: { lat: -37.5314, lng: 144.9537 }, // approximate — confirm on Google Maps
}

export const mapsQuery = encodeURIComponent('SNS Nails, 30 Stilt St, Kalkallo VIC 3064')
export const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`
export const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`

// 24h "HH:MM". Day index 0 = Sunday (matches Date.getDay()).
export type Hours = { day: string; short: string; open: string; close: string }
export const hours: Hours[] = [
  { day: 'Sunday', short: 'Sun', open: '09:00', close: '14:00' },
  { day: 'Monday', short: 'Mon', open: '10:00', close: '20:30' },
  { day: 'Tuesday', short: 'Tue', open: '10:00', close: '20:30' },
  { day: 'Wednesday', short: 'Wed', open: '10:00', close: '20:30' },
  { day: 'Thursday', short: 'Thu', open: '10:00', close: '20:30' },
  { day: 'Friday', short: 'Fri', open: '09:00', close: '12:00' },
  { day: 'Saturday', short: 'Sat', open: '09:00', close: '17:30' },
]

/** Latest appointment start = close minus this many minutes. */
export const lastBookingBeforeClose = 60
export const slotMinutes = 30
/** Appointments starting at/after this time are subject to after-hours T&Cs. */
export const afterHoursFrom = '19:00'

export type Service = { id: string; name: string; price: number; unit?: string; note?: string }
export type Category = { id: string; title: string; script: string; intro: string; items: Service[] }

export const categories: Category[] = [
  {
    id: 'nails',
    title: 'Nail Services',
    script: 'the art of nails',
    intro: 'Shellac, extensions, BIAB and hand-finished nail art, shaped to suit you.',
    items: [
      { id: 'shellac-mani', name: 'Shellac manicure', price: 45 },
      { id: 'shellac-pedi', name: 'Shellac pedicure', price: 30 },
      { id: 'refills', name: 'Refills', price: 25 },
      { id: 'removal', name: 'Removal', price: 10 },
      { id: 'repair', name: 'Nail repair', price: 15 },
      { id: 'gelx', name: 'Gel-X extension', price: 50 },
      { id: 'temporary', name: 'Temporary', price: 40 },
      { id: 'design-finger', name: 'Design', price: 5, unit: 'per finger' },
      { id: 'french', name: 'French art', price: 60 },
      { id: 'chrome', name: 'Chrome', price: 60 },
      { id: 'ombre', name: 'Ombre', price: 60 },
      { id: '3d-art', name: '3D art', price: 10, unit: 'per item' },
      { id: 'rhinestone', name: 'Rhinestone', price: 2, unit: 'per item' },
      { id: 'bow', name: 'Bow', price: 5 },
      { id: 'cat-eye', name: 'Cat eye set', price: 60 },
      { id: 'biab', name: 'BIAB', price: 65 },
      { id: 'biab-natural', name: 'BIAB on natural nails', price: 55 },
    ],
  },
  {
    id: 'beauty',
    title: 'Beauty Extras',
    script: 'finishing touches',
    intro: 'Quick, gentle threading and waxing to complete your visit.',
    items: [
      { id: 'eyebrows', name: 'Eyebrows', price: 10 },
      { id: 'forehead', name: 'Forehead', price: 5 },
      { id: 'upper-lip', name: 'Upper lip', price: 10 },
      { id: 'chin', name: 'Chin', price: 5 },
      { id: 'full-face', name: 'Full face', price: 25 },
    ],
  },
]

export const allServices = categories.flatMap((c) => c.items)
export const priceNote =
  'Prices are in AUD and subject to confirmation at your appointment. Terms and conditions apply to appointments after 7 pm.'

// Genuine Google review excerpts — first names only. Do not add invented reviews.
export const reviews = [
  { name: 'Jade', text: 'From the moment I arrived, I felt so welcome. Such a lovely, professional and accommodating experience, and the attention to detail was amazing.' },
  { name: 'Navneet', text: 'The shape is perfect, the design is exactly what I wanted, and the attention to detail is amazing.' },
  { name: 'Astrid', text: 'Best nail experience I’ve had! So welcoming and took the time to make sure everything was exactly how I wanted.' },
  { name: 'Kiara', text: 'She was so patient, took her time and made sure every little detail was perfect.' },
  { name: 'Karina', text: 'Service was amazing, so professional and precise! Extremely happy with my nails.' },
  { name: 'Nina', text: 'Very clean, professional and accommodating.' },
  { name: 'Noor', text: 'My French tips came out absolutely flawless.' },
  { name: 'Neha', text: 'Absolutely love my nail extensions! The shape and finish are perfect, and the attention to detail was amazing.' },
]

// Genuine salon photographs. Drop files into /public/gallery with these names.
export const gallery = [
  { src: '/gallery/nail-1.webp', alt: 'Nail design by SNS Nails, Kalkallo — photo 1', tall: true },
  { src: '/gallery/nail-2.webp', alt: 'Nail design by SNS Nails, Kalkallo — photo 2' },
  { src: '/gallery/nail-3.webp', alt: 'Nail design by SNS Nails, Kalkallo — photo 3', tall: true },
  { src: '/gallery/nail-4.webp', alt: 'Nail design by SNS Nails, Kalkallo — photo 4' },
  { src: '/gallery/nail-5.webp', alt: 'Nail design by SNS Nails, Kalkallo — photo 5' },
]

// Optional AI hero video (only after approval). Leave empty to use the coded hero.
export const heroVideo = { desktop: '', mobile: '', poster: '' }
