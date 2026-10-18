import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Draggable } from 'gsap/Draggable'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { Backdrop } from './Backdrop.jsx'
import { RESUME, links, skills, experience, leadership, projects, photos } from './data.js'

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable)
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches
const wrap = 'mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16'

// Runs GSAP setup scoped to the returned ref; everything it creates is reverted on unmount.
function useGsap(setup) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => setup(ref.current), ref)
    return () => ctx.revert()
  }, [])
  return ref
}

// Pieces drift up out of a blur (react-bits BlurText); no clipping masks, so ascenders and descenders stay whole.
const blurIn = (targets, vars) =>
  gsap.from(targets, { yPercent: 35, autoAlpha: 0, filter: 'blur(12px)', duration: 1.3, ease: 'expo.out', ...vars })

const toc = [
  ['about', 'A Bit About Me', 'About'],
  ['experience', 'A Nibble On Experience', 'Experience'],
  ['projects', 'A Byte Of Projects', 'Projects'],
  ['life', 'A Word Off the Clock', 'Off the clock'],
  ['contact', 'A Space to Connect', 'Contact'],
]

function Nav() {
  const bar = useGsap((el) => {
    gsap.to(el, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
  })
  const [active, setActive] = useState(null)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('main > [id]').forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  const pill = 'rounded-full bg-[#070914]/55 ring-1 ring-white/10 backdrop-blur-md'
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div ref={bar} className="h-px origin-left scale-x-0 bg-dusk" />
      <nav className={`${wrap} flex items-center justify-between py-4`}>
        <a href="#top" className={`${pill} px-4 py-1 font-hand text-2xl text-cream`}>ethan lu</a>
        <div className={`${pill} flex items-center gap-2 p-1 pl-2`}>
          <ul className="hidden text-sm md:flex">
            {toc.map(([id, , label]) => (
              <li key={id}>
                <a href={`#${id}`} className={`relative block rounded-full px-3 py-1.5 transition-colors ${active === id ? 'text-cream' : 'text-mist hover:text-cream'}`}>
                  {label}
                  <span className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-dusk transition-transform duration-500 ${active === id ? 'scale-x-100' : 'scale-x-0'}`} />
                </a>
              </li>
            ))}
          </ul>
          <a href={RESUME} target="_blank" rel="noreferrer" className="rounded-full bg-cream px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-dusk">
            Résumé
          </a>
        </div>
      </nav>
    </header>
  )
}

function Hero() {
  const ref = useGsap((el) => {
    const name = SplitText.create('.hero-name', { type: 'chars' })
    gsap.timeline()
      .add(blurIn('.hero-hi', { yPercent: 60 }))
      .add(blurIn(name.chars, { stagger: 0.06, duration: 1.6 }), 0.15)
      .add(blurIn('.hero-toc > *', { stagger: 0.07, yPercent: 60 }), 0.8)
      .add(blurIn('.hero-cue', { yPercent: 0 }), 1.5)
    gsap.to('.hero-inner', {
      yPercent: -20, autoAlpha: 0, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
    })
  })
  return (
    <section ref={ref} id="top" className="relative min-h-svh">
      <div className={`hero-inner ${wrap} flex min-h-svh flex-col justify-center pt-20`}>
        <p className="hero-hi font-hand text-2xl text-dusk sm:text-3xl">Hey there, I'm</p>
        <h1 className="hero-name font-display text-[clamp(4.5rem,17vw,15rem)] font-medium leading-[1] tracking-tight">Ethan Lu</h1>
        <nav aria-label="Contents" className="hero-toc mt-12 flex flex-col">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sage">Contents</p>
          {toc.map(([id, title], i) => (
            <a key={id} href={`#${id}`} className="group flex items-baseline gap-4 self-start py-1 text-xl text-cream/80 transition-colors hover:text-cream sm:text-2xl">
              <span className="w-5 font-hand text-dusk">{i + 1}</span>
              <span className="font-display transition-transform duration-300 group-hover:translate-x-2">{title}</span>
            </a>
          ))}
        </nav>
        <a href="#about" className="hero-cue mt-16 flex items-center gap-3 self-start font-hand text-2xl text-mist transition-colors hover:text-cream sm:text-3xl">
          <svg className="h-6 w-6 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9l6 6 6-6" /></svg>
          Come take a scroll with me
        </a>
      </div>
    </section>
  )
}

// Shared motion vocabulary: title words blur in, [data-reveal] blocks rise, [data-speed] elements parallax.
function Section({ id, n, title, children }) {
  const ref = useGsap((el) => {
    const h2 = el.querySelector('h2')
    SplitText.create(h2, {
      type: 'words', autoSplit: true,
      onSplit: (s) => blurIn(s.words, { stagger: 0.08, scrollTrigger: { trigger: h2, start: 'top 88%' } }),
    })
    blurIn(el.querySelector('.sec-n'), { yPercent: 0, scrollTrigger: { trigger: h2, start: 'top 88%' } })
    gsap.utils.toArray('[data-reveal]', el).forEach((r) =>
      gsap.from(r, { y: 40, autoAlpha: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: r, start: 'top 90%' } }),
    )
    gsap.utils.toArray('[data-speed]', el).forEach((p) =>
      gsap.fromTo(p, { yPercent: 12 * p.dataset.speed }, {
        yPercent: -12 * p.dataset.speed, ease: 'none',
        scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom top', scrub: true },
      }),
    )
  })
  return (
    <section ref={ref} id={id} className={`${wrap} py-16`}>
      <header className="mb-14 flex items-baseline gap-5 sm:mb-24">
        <span className="sec-n font-hand text-2xl text-dusk sm:text-4xl">{n}</span>
        <h2 className="font-display text-[clamp(2.75rem,8vw,7.5rem)] font-medium leading-[1.05] tracking-tight">{title}</h2>
      </header>
      {children}
    </section>
  )
}

// Words brighten one by one as the paragraph scrolls through the viewport (react-bits ScrollReveal, pared down).
function ScrubText({ className, children }) {
  const ref = useGsap((el) => {
    SplitText.create(el, {
      type: 'words', autoSplit: true,
      onSplit: (s) => gsap.fromTo(s.words, { opacity: 0.2 }, {
        opacity: 1, stagger: 0.1, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 50%', scrub: true },
      }),
    })
  })
  return <p ref={ref} className={className}>{children}</p>
}

function About() {
  return (
    <Section id="about" n="1" title={toc[0][1]}>
      <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
        <div>
          <ScrubText className="font-display text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1.2]">
            I'm a third-year CS+Econ student at Georgia Tech, specializing in artificial intelligence, data science, and
            econometrics.
          </ScrubText>
          <p data-reveal className="mt-10 max-w-3xl text-lg leading-relaxed text-cream/85 sm:text-xl">
            I love to fully immerse myself in the AI-product space, where I can bridge the liminal space between{' '}
            <span className="font-hand text-2xl text-dusk sm:text-3xl">"no longer"</span> and{' '}
            <span className="font-hand text-2xl text-dusk sm:text-3xl">"not yet."</span> I've chosen to trailblaze a path of
            innovation that optimizes human experience, streamlines everyday activities, and empowers others to achieve their goals.
          </p>
          <dl data-reveal className="mt-14 max-w-3xl divide-y divide-white/15 border-y border-white/15">
            {skills.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="text-sm text-sage">{k}</dt>
                <dd className="text-cream/80">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative mx-auto h-[32rem] w-full max-w-md">
          <Polaroid src="/img/portrait.webp" w={800} h={1151} cap="BCN, Summer '25" className="absolute left-0 top-0 w-[60%] -rotate-3" speed={1.4} />
          <Polaroid src="/img/prague.webp" w={800} h={600} cap="PRG, Summer '25" className="absolute bottom-4 right-0 w-[66%] rotate-3" speed={0.6} />
        </div>
      </div>
    </Section>
  )
}

function Polaroid({ src, w, h, cap, className = '', speed, style }) {
  return (
    <figure data-speed={speed} style={style} className={`bg-[#f4efe4] p-2 pb-0 shadow-2xl shadow-black/50 [text-shadow:none] ${className}`}>
      <img src={src} width={w} height={h} alt={cap} loading="lazy" decoding="async" draggable={false} className="w-full" />
      <figcaption className="py-2 text-center font-hand text-lg text-ink/80">{cap}</figcaption>
    </figure>
  )
}

// Scrollytelling: the company list stays pinned on the left and lights up whichever story is in view.
function Experience() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  useLayoutEffect(() => {
    const triggers = gsap.utils.toArray('[data-job]', ref.current).map((el, i) =>
      ScrollTrigger.create({ trigger: el, start: 'top 60%', end: 'bottom 60%', onToggle: (t) => t.isActive && setActive(i) }),
    )
    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <Section id="experience" n="2" title={toc[1][1]}>
      <div ref={ref} className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-24">
        <ol className="sticky top-32 hidden self-start md:block">
          {experience.map((job, i) => (
            <li key={job.org} className={`border-t border-white/15 py-5 transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-45'}`}>
              <p className="text-sm tabular-nums text-mist">{job.when}</p>
              <h3 className="mt-1 font-display text-3xl leading-tight lg:text-5xl">{job.org}</h3>
              <p className="mt-1 text-dusk">{job.role}</p>
            </li>
          ))}
        </ol>
        <div>
          {experience.map((job) => (
            <article key={job.org} data-job className="flex flex-col justify-center border-t border-white/15 py-8 md:min-h-[45vh] md:border-0 md:py-0">
              <div className="mb-4 md:hidden">
                <p className="text-sm tabular-nums text-mist">{job.when}</p>
                <h3 className="mt-1 font-display text-3xl leading-tight">{job.org}</h3>
                <p className="mt-1 text-dusk">{job.role}</p>
              </div>
              <p data-reveal className="text-lg leading-relaxed text-cream/90 lg:text-2xl lg:leading-relaxed">{job.desc}</p>
            </article>
          ))}
        </div>
      </div>
      <div data-reveal className="mt-16 flex flex-wrap items-baseline gap-x-10 gap-y-3 border-t border-white/15 pt-8">
        <span className="font-hand text-2xl text-sage">also —</span>
        {leadership.map((l) => (
          <p key={l.org} className="text-lg">
            <span className="text-cream">{l.role}</span>, <span className="text-cream/75">{l.org}</span>{' '}
            <span className="text-sm text-mist">({l.when})</span>
          </p>
        ))}
      </div>
    </Section>
  )
}

// Index list; on desktop a preview card trails the cursor and leans with its velocity.
function Projects() {
  const preview = useRef(null)
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!finePointer) return
    const el = preview.current
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' })
    const r = gsap.quickTo(el, 'rotation', { duration: 0.8, ease: 'power3' })
    let lastX = 0
    const move = (e) => {
      x(e.clientX); y(e.clientY)
      if (!reduced) r(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.5))
      lastX = e.clientX
    }
    addEventListener('pointermove', move)
    return () => removeEventListener('pointermove', move)
  }, [])

  return (
    <Section id="projects" n="3" title={toc[2][1]}>
      <ul className="group/list border-t border-white/15" onPointerLeave={() => setActive(null)}>
        {projects.map((p, i) => {
          const Tag = p.href ? 'a' : 'div'
          return (
            <li key={p.title} data-reveal onPointerEnter={() => setActive(i)} className="transition-opacity duration-300 group-hover/list:opacity-40 hover:!opacity-100">
              <Tag
                {...(p.href && { href: p.href, target: '_blank', rel: 'noreferrer' })}
                className="group grid grid-cols-[1.25rem_1fr_auto] items-baseline gap-x-3 border-b border-white/15 py-7 md:grid-cols-[3rem_1.3fr_1fr_auto] md:gap-x-10"
              >
                <span className="font-hand text-lg text-dusk">{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl leading-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">{p.title}</h3>
                  <p className="mt-2 max-w-xl text-cream/75">{p.blurb}</p>
                  <img src={p.img} alt="" loading="lazy" decoding="async" className={`mt-4 aspect-[16/9] w-full rounded-md md:hidden ${p.contain ? 'bg-cream object-contain p-4' : 'object-cover'}`} />
                </div>
                <p className="hidden text-sm text-cream/70 md:block">{p.tags.join(' · ')}</p>
                <span className={`text-sm text-cream/80 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-dusk ${p.href ? '' : 'invisible'}`}>
                  {p.linkLabel ?? 'GitHub'} ↗
                </span>
              </Tag>
            </li>
          )
        })}
      </ul>
      {finePointer && (
        <div ref={preview} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-40">
          <div
            className={`relative aspect-[16/10] w-96 translate-x-10 -translate-y-1/2 overflow-hidden rounded-lg shadow-2xl shadow-black/60 transition duration-300 ${
              active === null ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            {projects.map((p, i) => (
              <img
                key={p.img}
                src={p.img}
                alt=""
                className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${active === i ? 'opacity-100' : 'opacity-0'} ${p.contain ? 'bg-cream object-contain p-5' : 'object-cover'}`}
              />
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}

// Polaroids scattered on a table you can rearrange (desktop); a swipeable strip on touch.
function Life() {
  const table = useRef(null)
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const cards = gsap.utils.toArray('figure', table.current)
      let z = cards.length
      Draggable.create(cards, { bounds: table.current, zIndexBoost: false, onPress() { this.target.style.zIndex = ++z } })
      if (!reduced) {
        gsap.from(cards, {
          x: (i, el) => table.current.clientWidth / 2 - el.offsetLeft - el.offsetWidth / 2,
          y: (i, el) => table.current.clientHeight / 2 - el.offsetTop - el.offsetHeight / 2,
          duration: 1.4, ease: 'expo.out', stagger: 0.06,
          scrollTrigger: { trigger: table.current, start: 'top 70%' },
        })
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <Section id="life" n="4" title={toc[3][1]}>
      <div
        ref={table}
        className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:-mx-10 sm:px-10 md:relative md:mx-0 md:block md:h-[44rem] md:overflow-visible md:px-0"
      >
        {photos.map((p) => (
          <Polaroid
            key={p.src}
            {...p}
            style={{ left: `${p.pos[0]}%`, top: `${p.pos[1]}%`, rotate: `${p.pos[2]}deg` }}
            className={`shrink-0 snap-center md:absolute md:cursor-grab md:active:cursor-grabbing ${p.h > p.w ? 'w-40 md:w-52 xl:w-60' : 'w-56 md:w-64 xl:w-80'}`}
          />
        ))}
        <p className="pointer-events-none absolute bottom-6 right-4 hidden -rotate-3 font-hand text-2xl text-cream/80 md:block">
          (go on, rearrange them)
        </p>
      </div>
    </Section>
  )
}

// Content drifts toward the pointer and springs back when it leaves (react-bits Magnet, pared down).
function Magnet({ children, strength = 0.25 }) {
  const ref = useRef(null)
  useEffect(() => {
    if (reduced || !finePointer) return
    const zone = ref.current, inner = zone.firstChild
    const x = gsap.quickTo(inner, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const y = gsap.quickTo(inner, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const move = (e) => {
      const r = zone.getBoundingClientRect()
      x((e.clientX - r.left - r.width / 2) * strength)
      y((e.clientY - r.top - r.height / 2) * strength)
    }
    const leave = () => { x(0); y(0) }
    zone.addEventListener('pointermove', move)
    zone.addEventListener('pointerleave', leave)
    return () => { zone.removeEventListener('pointermove', move); zone.removeEventListener('pointerleave', leave) }
  }, [strength])
  return <div ref={ref} className="-m-8 inline-block p-8">{children}</div>
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = () => navigator.clipboard?.writeText(links.email).then(() => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  })
  return (
    <Section id="contact" n="5" title={toc[4][1]}>
      <p data-reveal className="max-w-xl text-lg leading-relaxed text-cream/85 sm:text-xl">
        Working on something in AI or product, or just want to swap travel recommendations? My inbox is open.
      </p>
      <div data-reveal className="mt-10">
        <Magnet>
          <a href={`mailto:${links.email}`} className="inline-block break-all font-display text-[clamp(1.7rem,7vw,7rem)] leading-tight decoration-dusk decoration-1 underline-offset-[0.2em] transition-colors hover:text-dusk hover:underline">
            {links.email}
          </a>
        </Magnet>
        <button onClick={copy} className="ml-1 mt-2 block font-hand text-2xl text-cream/75 transition-colors hover:text-cream">
          {copied ? 'copied ✓' : 'or copy it'}
        </button>
      </div>
      <ul data-reveal className="mt-14 flex flex-wrap gap-x-12 gap-y-3 text-xl">
        {[['LinkedIn', links.linkedin], ['GitHub', links.github], ['Résumé', RESUME]].map(([label, href]) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noreferrer" className="group text-cream/90 transition-colors hover:text-dusk">
              {label} <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default function App() {
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ anchors: { offset: -40 } })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy() }
  }, [])

  return (
    <div className="relative isolate overflow-x-clip">
      <Backdrop />
      <Nav />
      <main className="legible flex flex-col gap-[22vh]">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Life />
        <Contact />
      </main>
      <footer className="legible flex flex-col items-center gap-2 pb-16 pt-[24vh] text-center font-hand text-xl text-cream/90">
        <p>Thanks for walking with me · © {new Date().getFullYear()} Ethan Lu</p>
        <a href="#top" className="text-cream/70 transition-colors hover:text-cream">back to the stars ↑</a>
      </footer>
    </div>
  )
}
