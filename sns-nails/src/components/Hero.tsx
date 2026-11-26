import { useEffect, useState } from 'react'
import { business, gallery, heroVideo } from '../config/site'
import { useReducedMotion } from '../lib'
import Photo from './Photo'
import Bottle from './Bottle'
import Stars from './Stars'

export default function Hero({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduced || heroVideo.desktop) return
    const t = setInterval(() => setI((n) => (n + 1) % gallery.length), 5000); return () => clearInterval(t)
  }, [reduced])
  const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` })
  if (!ready) return <section id="top" className="min-h-[100svh]" />
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-8 md:min-h-[100svh] md:pt-28">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-blush/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-nude/60 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.05fr_.95fr] md:gap-8">
        <div className="order-2 md:order-1">
          <p className="eyebrow rise text-center md:text-left" style={d(100)}>Boutique nail studio · Kalkallo</p>
          <h1 className="h-display mt-6 text-[clamp(3.2rem,9vw,7.4rem)]">
            <span className="rise block" style={d(200)}>Beauty</span>
            <span className="rise block" style={d(350)}>at your <em className="font-script not-italic text-rose text-[1.1em] leading-[.6]">fingertips.</em></span>
          </h1>
          <p className="rise mt-8 max-w-md text-[17px] leading-relaxed text-espresso/75" style={d(550)}>
            Beautiful nails, personalised care and attention to every detail. Discover your next favourite nail design in Kalkallo.
          </p>
          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={d(700)}>
            <a href="#book" className="btn-dark">Book an Appointment</a>
            <a href="#services" className="btn-light">Explore Our Services</a>
          </div>
          <a href="#reviews" className="rise mt-10 inline-flex items-center gap-4" style={d(850)}>
            <span className="h-display text-4xl">{business.rating.toFixed(1)}</span>
            <span className="text-[13px] leading-tight text-espresso/70"><Stars /><span className="mt-1 block">Google rating · {business.reviewCount} reviews</span></span>
          </a>
        </div>

        <div className="relative order-1 mx-auto w-[72%] max-w-[460px] md:order-2 md:w-full">
          <div className="rise relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] bg-nude shadow-[0_40px_80px_-30px_rgba(73,51,44,.45)]" style={d(150)}>
            {heroVideo.desktop ? (
              <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster={heroVideo.poster} preload="metadata">
                <source media="(max-width: 767px)" src={heroVideo.mobile || heroVideo.desktop} type="video/mp4" />
                <source src={heroVideo.desktop} type="video/mp4" />
              </video>
            ) : gallery.map((g, n) => (
              <div key={g.src} className={`absolute inset-0 transition-opacity duration-[1600ms] ${n === i ? 'opacity-100' : 'opacity-0'}`}>
                {(n === 0 || n === i || n === (i + 1) % gallery.length) && <Photo src={g.src} alt={g.alt} eager={n === 0} className={`h-full w-full ${n === i ? 'kenburns' : ''}`} />}
              </div>
            ))}
            <div className="shine" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-0 right-0 text-center font-script text-3xl text-ivory drop-shadow">our work</p>
          </div>
          <Bottle className="float-a absolute -left-6 top-[18%] w-16 drop-shadow-2xl sm:-left-12 sm:w-24" />
          <Bottle hue="#E6D3CA" deep="#c7a99a" className="float-b absolute -right-4 bottom-[14%] w-14 drop-shadow-2xl sm:-right-10 sm:w-20" />
          <span aria-hidden className="float-b absolute right-[12%] top-[6%] h-3 w-3 rounded-full bg-blush" />
          <span aria-hidden className="float-a absolute bottom-[4%] left-[18%] h-2 w-2 rounded-full bg-rose" />
        </div>
      </div>
    </section>
  )
}
