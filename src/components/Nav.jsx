import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Resume' },
  { id: 'playground', label: 'Playground' },
  { id: 'contact', label: 'Contact' },
]

function Icon({ path, label }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" role="img" aria-label={label}>
      <path d={path} />
    </svg>
  )
}

export default function Nav({ dark, toggleDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/80 dark:bg-night/80 backdrop-blur-md shadow-[0_2px_30px_rgba(122,158,126,0.12)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a
          href="#home"
          className="font-ethan text-2xl text-sage-deep dark:text-dusk-light transition-colors hover:text-sage"
        >
          Ethan
        </a>

        <div className="flex items-center gap-2 sm:gap-6">
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    active === id
                      ? 'text-sage-deep dark:text-dusk-light'
                      : 'text-stone-600/90 hover:text-sage-deep dark:text-stone-300 dark:hover:text-dusk-light'
                  }`}
                >
                  {label}
                  {active === id && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-sage dark:bg-dusk-light" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <a
              href="mailto:ethanlu0929@gmail.com"
              title="Email"
              className="rounded-full p-2 text-stone-600 transition-all hover:-translate-y-0.5 hover:text-sage-deep dark:text-stone-300 dark:hover:text-dusk-light"
            >
              <Icon
                label="Email"
                path="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
              />
            </a>
            <a
              href="https://github.com/elu139"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              className="rounded-full p-2 text-stone-600 transition-all hover:-translate-y-0.5 hover:text-sage-deep dark:text-stone-300 dark:hover:text-dusk-light"
            >
              <Icon
                label="GitHub"
                path="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/ethan-lu/"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              className="rounded-full p-2 text-stone-600 transition-all hover:-translate-y-0.5 hover:text-sage-deep dark:text-stone-300 dark:hover:text-dusk-light"
            >
              <Icon
                label="LinkedIn"
                path="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"
              />
            </a>
            <button
              onClick={toggleDark}
              title="Toggle dusk mode"
              aria-label="Toggle dusk mode"
              className="rounded-full p-2 text-stone-600 transition-all hover:-translate-y-0.5 hover:text-sage-deep dark:text-stone-300 dark:hover:text-dusk-light"
            >
              {dark ? (
                <Icon
                  label="Light mode"
                  path="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"
                />
              ) : (
                <Icon
                  label="Dusk mode"
                  path="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95Z"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
