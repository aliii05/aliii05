import { useEffect, useState } from 'react'
import { business } from '../config/site'

export default function StickyBook() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const f = () => {
      const book = document.getElementById('book')?.getBoundingClientRect()
      const inBook = book ? book.top < window.innerHeight && book.bottom > 0 : false
      setShow(window.scrollY > window.innerHeight * 0.6 && !inBook)
    }
    f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-ivory/90 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition duration-500 md:hidden ${show ? '' : 'pointer-events-none translate-y-full'}`}>
      <a href={`tel:${business.phone}`} className="btn-light flex-[0_0_auto] !px-5" aria-label="Call SNS Nails">Call</a>
      <a href="#book" className="btn-dark flex-1">Book an Appointment</a>
    </div>
  )
}
