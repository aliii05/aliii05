import { useEffect, useRef, useState } from 'react';
import { business as B, media, nav, services, team, reviews } from './data.js';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Stars({ value = 5, size = 14 }) {
  return (
    <span className="stars" style={{ '--pct': `${(value / 5) * 100}%`, fontSize: size }} aria-hidden="true">
      ★★★★★
    </span>
  );
}

function Preloader() {
  const [state, setState] = useState(() => {
    try { return sessionStorage.getItem('vr-intro') ? 'gone' : 'show'; } catch { return 'show'; }
  });
  useEffect(() => {
    if (state !== 'show') return;
    try { sessionStorage.setItem('vr-intro', '1'); } catch {}
    const start = performance.now();
    const min = reduced() ? 300 : 1000;
    let t;
    const finish = () => {
      t = setTimeout(() => setState('out'), Math.max(0, min - (performance.now() - start)));
    };
    const cap = setTimeout(() => setState('out'), 1500);
    if (document.readyState === 'complete') finish(); else window.addEventListener('load', finish, { once: true });
    return () => { clearTimeout(t); clearTimeout(cap); window.removeEventListener('load', finish); };
  }, [state]);
  useEffect(() => {
    if (state === 'out') { const t = setTimeout(() => setState('gone'), 650); return () => clearTimeout(t); }
  }, [state]);
  if (state === 'gone') return null;
  return (
    <div className={`preloader ${state === 'out' ? 'is-out' : ''}`} aria-hidden="true">
      <div className="preloader__logo">
        <img src={media.logo} alt="" />
        <span className="preloader__sweep" />
      </div>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);
  return (
    <header className={`nav ${scrolled ? 'is-solid' : ''} ${open ? 'is-open' : ''}`}>
      <a href="#home" className="nav__brand" aria-label="VR Barber Shop home">
        <img src={media.logo} alt="VR Barber Shop" width="54" height="36" />
      </a>
      <nav className="nav__links" aria-label="Primary">
        {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
      </nav>
      <a className="nav__call" href={B.phoneHref}>{B.phoneDisplay}</a>
      <button className="nav__toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
        <span /><span />
      </button>
      <div className="menu" hidden={!open}>
        {nav.map((n, i) => (
          <a key={n.href} href={n.href} style={{ '--i': i }} onClick={() => setOpen(false)}>
            <small>0{i + 1}</small>{n.label}
          </a>
        ))}
        <a className="menu__call" href={B.phoneHref} style={{ '--i': nav.length }}>Call {B.phoneDisplay}</a>
      </div>
    </header>
  );
}

/* Scroll-driven cinematic hero: the video autoplays once, then the scroll position scrubs through it. */
function Hero() {
  const wrap = useRef(null);
  const vid = useRef(null);
  const [progress, setProgress] = useState(0);
  const [ended, setEnded] = useState(false);
  const scrubbing = useRef(false);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (reduced()) { v.removeAttribute('autoplay'); v.pause(); }
    let target = 0, raf = 0;
    const tick = () => {
      if (scrubbing.current && v.duration) {
        const diff = target - v.currentTime;
        if (Math.abs(diff) > 0.03) v.currentTime += diff * 0.25;
      }
      raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      const el = wrap.current;
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total));
      setProgress(p);
      if (reduced() || !v.duration) return;
      if (p > 0.01) {
        if (!scrubbing.current) { scrubbing.current = true; v.pause(); }
        target = p * (v.duration - 0.05);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const replay = () => {
    const v = vid.current;
    scrubbing.current = false;
    window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' });
    v.currentTime = 0; setEnded(false); v.play().catch(() => {});
  };

  const fade = Math.max(0, 1 - progress * 3);
  return (
    <section id="home" className="hero" ref={wrap}>
      <div className="hero__stage">
        <video
          ref={vid} className="hero__video" autoPlay muted playsInline preload="auto"
          poster={media.heroPoster} onEnded={() => setEnded(true)} aria-label="Walkthrough of VR Barber Shop"
        >
          <source src={media.heroVideoMobile} type="video/mp4" media="(max-width: 760px)" />
          <source src={media.heroVideo} type="video/mp4" />
        </video>
        <div className="hero__shade" style={{ opacity: 0.25 + fade * 0.75 }} />
        <div className="hero__content" style={{ opacity: fade, transform: `translateY(${progress * -60}px)` }}>
          <p className="eyebrow eyebrow--light">Wollert · Melbourne</p>
          <h1 className="hero__title">
            <span className="line"><span>Precision.</span></span>
            <span className="line"><span>Style.</span></span>
            <span className="line"><span><em>Confidence.</em></span></span>
          </h1>
          <p className="hero__lede">Experience premium barbering in the heart of Wollert.</p>
          <div className="hero__rating">
            <Stars value={B.rating} /> <strong>{B.rating}</strong> Google rating <i /> {B.reviewCount} Google reviews
          </div>
          <div className="hero__cta">
            <a className="btn btn--gold" href={B.phoneHref}>Call Now</a>
            <a className="btn btn--ghost" href={B.directionsUrl} target="_blank" rel="noopener">Get Directions</a>
          </div>
        </div>
        <div className="hero__ui">
          <div className="hero__scroll" style={{ opacity: fade }}><span />Scroll to walk in</div>
          <button className="hero__replay" onClick={replay} aria-label="Replay walkthrough video">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z" fill="currentColor"/></svg>
            Replay
          </button>
          <div className="hero__progress"><span style={{ transform: `scaleX(${progress})` }} /></div>
        </div>
      </div>
    </section>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (reduced() || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

function SectionHead({ num, eyebrow, title }) {
  return (
    <div className="head" data-reveal>
      <p className="eyebrow"><span>{num}</span>{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="section services">
      <div className="wrap">
        <div className="services__top">
          <SectionHead num="01" eyebrow="Services" title="Crafted to Perfection" />
          <p className="services__intro" data-reveal>
            From sharp skin fades to the ritual of a traditional shave, every service is delivered with an eye for detail and
            the time it deserves. Call us to discuss your cut or arrange an appointment.
          </p>
        </div>
        <div className="services__grid">
          {services.map((g, gi) => (
            <div className="svc" key={g.group} data-reveal style={{ '--d': `${gi * 120}ms` }}>
              <h3><span>{String(gi + 1).padStart(2, '0')}</span>{g.group}</h3>
              <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          ))}
        </div>
        <figure className="services__img reveal-img" data-reveal>
          <img src={media.interior} alt="Inside VR Barber Shop with the gold VR wall feature" loading="lazy" width="1100" height="619" />
        </figure>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="section team">
      <div className="wrap">
        <SectionHead num="02" eyebrow="Our Team" title="Meet the Professionals" />
        <div className="team__grid">
          <div className="team__intro" data-reveal>
            <p className="lead">
              Behind every chair is a team that takes pride in the craft — professional, skilled and genuinely welcoming.
            </p>
            <p>
              Our clients come back for consistent, precise work and an atmosphere that makes everyone feel at home, from
              first-timers to the youngest members of the family.
            </p>
          </div>
          {team.map((m) => (
            <article className="member" key={m.name} data-reveal>
              <div className="member__photo reveal-img">
                {m.photo ? <img src={m.photo} alt={`${m.name}, ${m.role} at VR Barber Shop`} loading="lazy" /> : (
                  <div className="member__placeholder" aria-hidden="true"><span>{m.name[0]}</span></div>
                )}
              </div>
              <div className="member__body">
                <p className="eyebrow">{m.role}</p>
                <h3>{m.name}</h3>
                <p>{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = reviews.length;
  useEffect(() => {
    if (paused || reduced()) return;
    const t = setTimeout(() => setI((x) => (x + 1) % n), 6500);
    return () => clearTimeout(t);
  }, [i, paused, n]);
  const go = (d) => setI((x) => (x + d + n) % n);
  return (
    <section id="reviews" className="section reviews">
      <div className="wrap">
        <SectionHead num="03" eyebrow="Reviews" title="Trusted by Our Community" />
        <div className="reviews__grid">
          <div className="score" data-reveal>
            <div className="score__num">{B.rating}<small>/5</small></div>
            <Stars value={B.rating} size={20} />
            <p>Average Google rating from <strong>{B.reviewCount} reviews</strong></p>
            <a className="link" href={B.reviewsUrl} target="_blank" rel="noopener">Read all Google reviews →</a>
          </div>
          <div className="carousel" data-reveal onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
               onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} aria-roledescription="carousel" aria-label="Customer testimonials">
            <div className="carousel__track" aria-live="polite">
              {reviews.map((r, k) => (
                <blockquote key={r.name} className={`quote ${k === i ? 'is-active' : ''}`} aria-hidden={k !== i}>
                  <span className="quote__mark" aria-hidden="true">“</span>
                  {r.fiveStarConfirmed && <Stars value={5} />}
                  <p>{r.text}</p>
                  <footer>— {r.name}</footer>
                </blockquote>
              ))}
            </div>
            <div className="carousel__nav">
              <button onClick={() => go(-1)} aria-label="Previous review">←</button>
              <div className="carousel__dots">
                {reviews.map((r, k) => (
                  <button key={r.name} className={k === i ? 'is-active' : ''} onClick={() => setI(k)} aria-label={`Review from ${r.name}`} />
                ))}
              </div>
              <button onClick={() => go(1)} aria-label="Next review">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="section visit">
      <div className="wrap">
        <SectionHead num="04" eyebrow="Visit Us" title="Your Next Fresh Cut Starts Here" />
        <div className="visit__grid">
          <div className="visit__info" data-reveal>
            <dl>
              <div><dt>Studio</dt><dd>{B.name}</dd></div>
              <div><dt>Address</dt><dd>{B.address}</dd></div>
              <div><dt>Phone</dt><dd><a href={B.phoneHref}>{B.phoneDisplay}</a></dd></div>
            </dl>
            <p className="visit__note">
              {B.bookingUrl ? 'Book online or call us for appointment enquiries.' : 'For appointments and enquiries, please give us a call.'}
            </p>
            <div className="visit__cta">
              {B.bookingUrl && <a className="btn btn--gold" href={B.bookingUrl}>Book Online</a>}
              <a className={`btn ${B.bookingUrl ? 'btn--dark' : 'btn--gold'}`} href={B.phoneHref}>Call {B.phoneDisplay}</a>
              <a className="btn btn--dark" href={B.directionsUrl} target="_blank" rel="noopener">Get Directions</a>
            </div>
          </div>
          <div className="visit__map reveal-img" data-reveal>
            <iframe title="Map showing VR Barber Shop, 43 Baltrum Dr, Wollert" src={B.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <img src={media.logo} alt="VR Barber Shop" width="84" height="56" />
        <nav aria-label="Footer">{nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}</nav>
        <div className="footer__contact">
          <p>{B.address}</p>
          <a href={B.phoneHref}>{B.phoneDisplay}</a>
        </div>
      </div>
      <p className="footer__copy wrap">© {new Date().getFullYear()} {B.name}. All rights reserved.</p>
    </footer>
  );
}

export default function App() {
  useReveal();
  return (
    <>
      <a className="skip" href="#services">Skip to content</a>
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Team />
        <Reviews />
        <Visit />
      </main>
      <Footer />
      <a className="sticky-call" href={B.phoneHref} aria-label={`Call ${B.name}`}>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg>
        Call to Book
      </a>
    </>
  );
}
