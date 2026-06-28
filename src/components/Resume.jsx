import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Resume() {
  return (
    <section
      id="resume"
      className="section-anchor relative mx-auto max-w-4xl px-6 py-24 sm:py-32"
    >
      <SectionHeading eyebrow="a quiet desk in a sunlit room" title="Resume" />

      <Reveal className="overflow-hidden rounded-[32px] bg-white/70 shadow-xl shadow-dusk/10 ring-1 ring-white/50 backdrop-blur dark:bg-night-soft/70 dark:ring-white/5">
        <div className="grid items-center gap-8 p-8 sm:grid-cols-[1fr_auto] sm:p-10">
          <div>
            <h3 className="font-display text-2xl font-semibold text-stone-700 dark:text-stone-100">
              The short version, on one page.
            </h3>
            <p className="mt-3 leading-relaxed text-stone-600 dark:text-stone-300">
              A tidy summary of my education, experience, and the tools I reach for. Open it
              in a new tab or take a copy with you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/LuEthan-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-sage-deep"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                </svg>
                Download Resume
              </a>
              <a
                href="/LuEthan-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-sage/50 px-6 py-3 font-semibold text-sage-deep transition-all hover:-translate-y-0.5 hover:bg-sage-light/30 dark:border-dusk-light/40 dark:text-dusk-light dark:hover:bg-dusk/20"
              >
                View in browser
              </a>
            </div>
          </div>

          <div className="hidden h-40 w-32 shrink-0 rotate-3 rounded-lg bg-gradient-to-br from-cream-deep to-white shadow-lg ring-1 ring-stone-200 sm:block dark:from-night dark:to-night-soft dark:ring-white/10">
            <div className="space-y-2 p-4">
              <div className="h-2 w-3/4 rounded bg-sage/40" />
              <div className="h-1.5 w-full rounded bg-stone-300/60 dark:bg-white/10" />
              <div className="h-1.5 w-5/6 rounded bg-stone-300/60 dark:bg-white/10" />
              <div className="h-1.5 w-full rounded bg-stone-300/60 dark:bg-white/10" />
              <div className="mt-3 h-2 w-2/3 rounded bg-dusk/40" />
              <div className="h-1.5 w-full rounded bg-stone-300/60 dark:bg-white/10" />
              <div className="h-1.5 w-4/6 rounded bg-stone-300/60 dark:bg-white/10" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
