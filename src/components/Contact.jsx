import Reveal from './Reveal'
import BotanicalAccent from '../design/BotanicalAccent'

const CONTACTS = [
  {
    label: 'Email',
    value: 'ethanlu0929@gmail.com',
    href: 'mailto:ethanlu0929@gmail.com',
    path: 'M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z',
  },
  {
    label: 'LinkedIn',
    value: 'in/ethan-lu',
    href: 'https://www.linkedin.com/in/ethan-lu/',
    path: 'M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z',
  },
  {
    label: 'GitHub',
    value: 'elu139',
    href: 'https://github.com/elu139',
    path: 'M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z',
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-anchor relative overflow-hidden px-6 py-24 text-center sm:py-32"
    >
      {/* PLACEHOLDER FOR CLAUDE DESIGN — botanical accent in the corner */}
      <BotanicalAccent className="absolute bottom-0 left-6 h-40 w-28 opacity-60" />
      <BotanicalAccent
        className="absolute bottom-0 right-6 h-40 w-28 -scale-x-100 opacity-60"
      />

      <Reveal className="mx-auto max-w-xl">
        <h2 className="font-display text-4xl font-semibold tracking-tight text-stone-700 dark:text-stone-100 sm:text-5xl">
          Let's connect.
        </h2>
        <p className="mt-4 text-stone-600 dark:text-stone-300">
          Whether it's data, soccer, or where to find the best tiramisu — I'd love to hear
          from you.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {CONTACTS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/70 px-6 py-3 font-medium text-stone-700 shadow-sm ring-1 ring-white/50 backdrop-blur transition-all hover:-translate-y-0.5 hover:text-sage-deep hover:shadow-md dark:bg-night-soft/70 dark:text-stone-200 dark:ring-white/5 dark:hover:text-dusk-light sm:w-auto"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d={c.path} />
              </svg>
              {c.value}
            </a>
          ))}
        </div>
      </Reveal>

      <p className="relative mt-20 text-sm text-stone-500 dark:text-stone-400">
        © {new Date().getFullYear()} Ethan Lu · Be present above all else.
      </p>
    </section>
  )
}
