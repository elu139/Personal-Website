import { motion } from 'framer-motion'
import HeroAnimation from '../design/HeroAnimation'
import { DuskVeil } from './SceneDividers'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Claude Design — animated dawn-sky background */}
      <HeroAnimation />
      <DuskVeil className="-z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl"
      >
        <p className="font-ethan text-xl text-stone-700/80 dark:text-stone-200/80">
          Hey, I'm
        </p>
        <h1 className="mt-2 font-display text-6xl font-bold tracking-tight text-stone-800 dark:text-white sm:text-7xl md:text-8xl">
          Ethan&nbsp;Lu
        </h1>
        <p className="mt-6 text-lg font-light italic text-stone-700/90 dark:text-stone-200/90 sm:text-2xl">
          "Be present above all else."
        </p>
        <p className="mt-1 text-sm tracking-wide text-stone-600/70 dark:text-stone-300/70">
          — Naval Ravikant
        </p>

        <a
          href="#about"
          className="mt-10 inline-flex items-center rounded-full border border-white/40 bg-white/30 px-8 py-3 font-medium text-stone-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
        >
          Wander through my work
        </a>
      </motion.div>

      {/* scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to explore"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-stone-700/70 dark:text-stone-200/70"
      >
        <span className="mb-2 block text-xs uppercase tracking-[0.3em]">scroll</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="mx-auto h-6 w-6 animate-bobScroll"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  )
}
