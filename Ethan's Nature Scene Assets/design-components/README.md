# Nature Scene Assets — Ethan's portfolio

Five self-contained, animated React components. Each is drop-in: no Tailwind
classes or `tailwind.config.js` changes required (styling is inline + scoped
`@keyframes` injected once per page). They share one palette so they feel like
one quiet morning.

## Install

Copy the five files into `src/design/` (replacing the existing placeholders):

```
src/design/HeroAnimation.jsx
src/design/MountainParallax.jsx
src/design/WaterRipple.jsx
src/design/BotanicalAccent.jsx
src/design/PlaygroundAtmosphere.jsx
```

`HeroAnimation`, `BotanicalAccent` and (where you add it) `WaterRipple` already
match how `Hero.jsx`, `About.jsx` and `Contact.jsx` import them today — no call-
site changes needed.

## Components & props

- **HeroAnimation** — full-viewport breathing dawn sky with three drifting cloud
  layers. Renders its own `position:absolute; inset:0; z-index:-10`.
  Props: `className?`, `style?`.

- **MountainParallax** — 4 receding mountain ranges + drifting mist. Fills its
  parent box, so wrap it in a sized, positioned element.
  Props: `scrollProgress` (0→1, default 0), `className?`, `style?`.
  Wire `scrollProgress` to scroll, e.g. with framer-motion:
  ```jsx
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const [p, setP] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', setP)
  // <MountainParallax scrollProgress={p} />
  ```

- **WaterRipple** — full-width ~200px ripple divider, loops seamlessly. Use 2–3×
  between sections. Props: `isVisible` (default true, pauses when false),
  `className?`, `style?`.

- **BotanicalAccent** — vines/leaves/wildflowers that draw themselves in, then
  sway. Fills its parent; mirror via the parent (`-scale-x-100`).
  Props: `isVisible` (default true — set false→true to (re)trigger growth on
  scroll-in), `className?`, `style?`.

- **PlaygroundAtmosphere** — canvas fireflies drifting upward in warm sunset
  tones. Place behind Playground content (`absolute inset-0 -z-10`).
  Props: `isVisible` (default true, pauses loop when false), `className?`,
  `style?`.

## Palette

Greens `#7a9e7e #a8c5a0` · purples `#7b6fa0 #b8a9d4` · pinks/peach
`#f4a7b9 #fcd5b5 #e8c4e0` · sky blues `#c9dff0 #ddeeff`.

## Notes

- All CSS animations respect `prefers-reduced-motion` via your existing global
  rule in `index.css`; `PlaygroundAtmosphere` checks it directly and renders a
  static field instead of animating.
- These render light/dawn tones only (per brief). If you want dusk-mode variants
  to match the site's dark theme, that's an easy follow-up.
