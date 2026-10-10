import { useEffect, useState } from 'react'
import { LazyMotion, MotionConfig, domAnimation, m } from 'framer-motion'
import { Backdrop, Footprints } from './Backdrop.jsx'
import { RESUME, links, skills, experience, leadership, projects, photos } from './data.js'

const ease = [0.22, 1, 0.36, 1]

function Reveal({ delay = 0, y = 24, className, children }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </m.div>
  )
}

function Section({ id, kicker, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <Reveal className="panel">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sage">{kicker}</p>
        <h2 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">{title}</h2>
        <div className="mt-10">{children}</div>
      </Reveal>
    </section>
  )
}

const toc = [
  ['about', 'A Bit About Me'],
  ['experience', 'A Nibble On Experience'],
  ['projects', 'A Byte Of Projects'],
  ['life', 'A Word Off the Clock'],
  ['contact', 'A Space to Connect'],
]

const nav = [['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects'], ['life', 'Off the clock'], ['contact', 'Contact']]

function Nav() {
  const [state, setState] = useState({ hidden: false, solid: false })
  useEffect(() => {
    let last = scrollY
    const onScroll = () => {
      const y = scrollY
      setState({ hidden: y > last && y > innerHeight * 0.6, solid: y > 20 })
      last = y
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${state.hidden ? '-translate-y-full' : ''} ${
        state.solid ? 'bg-[#070914]/70 backdrop-blur-md' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <a href="#top" className="font-hand text-2xl text-cream">ethan lu</a>
        <div className="flex items-center gap-1 sm:gap-6">
          <ul className="hidden gap-6 text-sm text-mist md:flex">
            {nav.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="transition-colors hover:text-cream">{label}</a></li>
            ))}
          </ul>
          <a
            href={RESUME}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-cream px-5 py-2 text-sm font-medium text-[#0a0d1a] transition-colors hover:bg-dusk"
          >
            Résumé
          </a>
        </div>
      </nav>
    </header>
  )
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(scrollY > 480)
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-cream text-[#0a0d1a] shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-1 hover:bg-dusk ${
        show ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 15l6-6 6 6" /></svg>
    </button>
  )
}

function Hero() {
  const item = (delay) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay },
  })
  return (
    <section id="top" className="mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-4 pt-16">
      <m.p {...item(0.1)} className="font-hand text-2xl text-dusk">Hey there, I'm</m.p>
      <m.h1 {...item(0.2)} className="mt-1 font-display text-7xl font-medium tracking-tight sm:text-9xl">Ethan Lu</m.h1>
      <m.nav {...item(0.4)} aria-label="Contents" className="mt-12 flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sage">Contents</p>
        {toc.map(([id, title], i) => (
          <a key={id} href={`#${id}`} className="group flex items-baseline gap-4 self-start text-xl text-cream/85 transition hover:translate-x-1.5 hover:text-cream sm:text-2xl">
            <span className="w-4 font-hand text-dusk">{i + 1}</span>
            <span className="font-display">{title}</span>
          </a>
        ))}
      </m.nav>
      <m.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-20 flex items-center gap-3 self-start font-hand text-3xl text-mist transition-colors hover:text-cream sm:text-4xl"
      >
        <svg className="h-7 w-7 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
        Come take a scroll with me
      </m.a>
    </section>
  )
}

function About() {
  return (
    <Section id="about" kicker="Entry 01" title={toc[0][1]}>
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-cream/85">
          <p>
            I'm a third-year CS+Econ student at Georgia Tech, specializing in artificial intelligence, data science, and
            econometrics.
          </p>
          <p>
            I love to fully immerse myself in the AI-product space, where I can bridge the liminal space between "no
            longer" and "not yet." I've chosen to trailblaze a path of innovation that optimizes human experience,
            streamlines everyday activities, and empowers others to achieve their goals.
          </p>
          <dl className="space-y-3 pt-4 text-base">
            {skills.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4">
                <dt className="text-sage">{k}</dt>
                <dd className="text-mist">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative mx-auto h-[26rem] w-full max-w-sm">
          <Photo src="/img/portrait.webp" w={800} h={1151} cap="BCN, Summer '25" className="absolute left-0 top-0 w-[62%] -rotate-3" />
          <Photo src="/img/prague.webp" w={800} h={600} cap="PRG, Summer '25" className="absolute bottom-0 right-0 w-[68%] rotate-2" />
        </div>
      </div>
    </Section>
  )
}

function Photo({ src, w, h, cap, className = '' }) {
  return (
    <figure className={`group overflow-hidden rounded-2xl shadow-xl shadow-black/40 ring-1 ring-white/10 transition-transform duration-500 hover:z-10 hover:rotate-0 hover:scale-[1.03] ${className}`}>
      <img src={src} width={w} height={h} alt={cap} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-8 font-hand text-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {cap}
      </figcaption>
    </figure>
  )
}

function Experience() {
  return (
    <Section id="experience" kicker="Entry 02" title={toc[1][1]}>
      <ol className="relative space-y-10 border-l border-white/10 pl-8">
        {experience.map((job, i) => (
          <li key={job.org} className="relative">
            <Reveal delay={i * 0.05} y={16}>
              <span className="absolute -left-[2.3rem] top-2 h-2.5 w-2.5 rounded-full bg-dusk ring-4 ring-dusk/20" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-xl font-semibold">
                  {job.role} <span className="text-dusk">· {job.org}</span>
                </h3>
                <span className="text-sm text-mist">{job.when}</span>
              </div>
              <p className="mt-3 leading-relaxed text-mist">{job.desc}</p>
            </Reveal>
          </li>
        ))}
      </ol>
      <h3 className="mt-14 text-xs font-semibold uppercase tracking-[0.25em] text-sage">Leadership</h3>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {leadership.map((l) => (
          <li key={l.org} className="rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/10">
            <p className="font-semibold">{l.role}</p>
            <p className="text-mist">{l.org}</p>
            <p className="mt-1 text-sm text-mist/70">{l.when}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Projects() {
  return (
    <Section id="projects" kicker="Entry 03" title={toc[2][1]}>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => {
          const Tag = p.href ? 'a' : 'div'
          return (
            <Reveal key={p.title} delay={(i % 2) * 0.1} y={30}>
              <Tag
                {...(p.href && { href: p.href, target: '_blank', rel: 'noreferrer' })}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.03] ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06] hover:ring-dusk/40"
              >
                <div className="aspect-[16/9] overflow-hidden bg-cream/90">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full grayscale-[60%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0 ${
                      p.contain ? 'object-contain p-6' : 'object-cover'
                    }`}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-semibold transition-colors group-hover:text-dusk">{p.title}</h3>
                    {p.href && (
                      <span className="shrink-0 text-sm text-mist transition-transform group-hover:translate-x-1">
                        {p.linkLabel ?? 'GitHub'} →
                      </span>
                    )}
                  </div>
                  <p className="mt-2 flex-1 leading-relaxed text-mist">{p.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs text-cream/80">{t}</li>
                    ))}
                  </ul>
                </div>
              </Tag>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

function Life() {
  return (
    <Section id="life" kicker="Entry 04" title={toc[3][1]}>
      <div className="columns-2 gap-4 md:columns-3">
        {photos.map((p, i) => (
          <Reveal key={p.src} delay={(i % 3) * 0.08} y={20} className="mb-4 break-inside-avoid">
            <figure className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10">
              <img
                src={p.src}
                width={p.w}
                height={p.h}
                alt={p.cap}
                loading="lazy"
                decoding="async"
                className="w-full grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 font-hand text-lg">
                {p.cap}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

const icons = {
  linkedin: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
  github: 'M12 .3a12 12 0 00-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 011.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0012 .3',
}

function Contact() {
  return (
    <Section id="contact" kicker="Entry 05" title={toc[4][1]}>
      <p className="max-w-xl text-lg leading-relaxed text-mist">
        Working on something in AI or product, or just want to swap travel recommendations? My inbox is open.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a href={`mailto:${links.email}`} className="rounded-full bg-cream px-7 py-3 font-medium text-[#0a0d1a] transition-colors hover:bg-dusk">
          {links.email}
        </a>
        {['linkedin', 'github'].map((k) => (
          <a
            key={k}
            href={links[k]}
            target="_blank"
            rel="noreferrer"
            aria-label={k}
            className="rounded-full p-3 text-mist ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:text-dusk hover:ring-dusk/50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d={icons[k]} /></svg>
          </a>
        ))}
      </div>
    </Section>
  )
}

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="relative isolate overflow-x-clip">
          <Backdrop />
          <Footprints />
          <Nav />
          <BackToTop />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Life />
            <Contact />
          </main>
          <footer className="pb-16 pt-8 text-center font-hand text-lg text-cream/80">
            Thanks for walking with me · © {new Date().getFullYear()} Ethan Lu
          </footer>
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
