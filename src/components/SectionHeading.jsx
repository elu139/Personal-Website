import Reveal from './Reveal'

/** Soft, generously-spaced section heading with an organic underline. */
export default function SectionHeading({ eyebrow, title, align = 'center' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <Reveal className={`flex flex-col ${alignment} gap-3 mb-12`}>
      {eyebrow && (
        <span className="font-ethan text-lg tracking-wide text-sage dark:text-dusk-light">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-stone-700 dark:text-stone-100">
        {title}
      </h2>
      <svg width="120" height="14" viewBox="0 0 120 14" fill="none" aria-hidden="true">
        <path
          d="M2 8C20 2 40 12 60 7C80 2 100 12 118 6"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-sage/60 dark:text-dusk-light/60"
        />
      </svg>
    </Reveal>
  )
}
