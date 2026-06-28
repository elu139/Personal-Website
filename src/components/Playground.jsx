import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'
import Modal from './Modal'
import PlaygroundAtmosphere from '../design/PlaygroundAtmosphere'
import { favoriteTracks } from '../data'

function PlayCard({ children, className = '', onClick, delay = 0 }) {
  const interactive = !!onClick
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`rounded-[28px] p-6 shadow-md ring-1 ring-white/50 backdrop-blur transition-all duration-300 dark:ring-white/5 ${
        interactive ? 'cursor-pointer hover:-translate-y-1.5 hover:shadow-xl' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function Playground() {
  const [lovart, setLovart] = useState(false)
  const atmoRef = useRef(null)
  // Mount the canvas atmosphere only when the section is near view so its
  // animation loop doesn't run (and burn frames) while far offscreen.
  const atmoInView = useInView(atmoRef, { margin: '300px' })

  return (
    <section
      id="playground"
      className="section-anchor relative mx-auto max-w-6xl px-6 py-24 sm:py-32"
    >
      {/* Claude Design — drifting firefly atmosphere */}
      <div ref={atmoRef} className="absolute inset-0 -z-10">
        {atmoInView && <PlaygroundAtmosphere className="absolute inset-0" />}
      </div>

      <SectionHeading eyebrow="things I'm tinkering with" title="Playground" />
      <p className="mx-auto mb-12 max-w-2xl text-center text-stone-600 dark:text-stone-300">
        Welcome to my play—initiate-deliberate-innovate-cultivate-evaluate-contemplate-iterate-validate—ground,
        or mostly just my playground.
      </p>

      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {/* My Font */}
        <PlayCard className="animate-breathe bg-white/70 dark:bg-night-soft/70">
          <h4 className="font-ethan text-2xl text-stone-700 dark:text-stone-100">My Font</h4>
          <p className="mt-3 font-ethan text-xl text-stone-600 dark:text-stone-300">
            Click{' '}
            <a
              href="/Ethansans-Regular.ttf"
              download
              className="text-sage-deep underline dark:text-dusk-light"
            >
              here
            </a>{' '}
            to download a copy of my handwriting!
          </p>
        </PlayCard>

        {/* Made with Lov(art) */}
        <PlayCard
          delay={0.1}
          onClick={() => setLovart(true)}
          className="bg-gradient-to-br from-blush-lilac/50 to-dusk-light/40 dark:from-dusk/40 dark:to-dusk-deep/30"
        >
          <h4 className="font-ethan text-2xl text-stone-700 dark:text-stone-100">
            Made with Lov(art)
          </h4>
          <p className="mt-3 font-ethan text-lg text-stone-600 dark:text-stone-200">
            Click to see a comparison from my Barcelona adventure!
          </p>
        </PlayCard>

        {/* Spotify favorites */}
        <PlayCard
          delay={0.2}
          className="flex max-h-[460px] flex-col bg-gradient-to-br from-[#1DB954] to-[#191414] text-white"
        >
          <div className="mb-4 flex items-center gap-3 border-b border-white/20 pb-3">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.301.421-1.02.599-1.559.3z" />
            </svg>
            <h4 className="font-semibold">My Favorites</h4>
          </div>
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
            {favoriteTracks.map((id) => (
              <iframe
                key={id}
                title={`Spotify track ${id}`}
                className="rounded-xl"
                src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            ))}
          </div>
        </PlayCard>
      </div>

      <Modal open={lovart} onClose={() => setLovart(false)} title="Made with Lov(art)">
        <p className="mb-5 leading-relaxed">
          Late night homework back at Tech has me reminiscing about my amazing experiences
          while studying abroad in Barcelona during the summer. Here's a side-by-side
          comparison of me at Parc de la Ciutadella and my Hirono-esque doppelgänger generated
          using Lovart.
        </p>
        <div className="flex flex-wrap justify-center gap-5">
          <figure className="min-w-[260px] flex-1 text-center">
            <img
              src="/extra/20250725_235144_A24D7F.JPEG"
              alt="Ethan at Parc de la Ciutadella, Barcelona"
              className="mx-auto w-full max-w-xs rounded-2xl shadow-md"
            />
            <figcaption className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              Parc de la Ciutadella, Barcelona — July 2025
            </figcaption>
          </figure>
          <figure className="min-w-[260px] flex-1 text-center">
            <img
              src="/extra/Authentic Hirono-Style Figurine.png"
              alt="Hirono-style figurine with my expression"
              className="mx-auto w-full max-w-xs rounded-2xl shadow-md"
            />
            <figcaption className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              Hey Twin! 🤞
            </figcaption>
          </figure>
        </div>
      </Modal>
    </section>
  )
}
