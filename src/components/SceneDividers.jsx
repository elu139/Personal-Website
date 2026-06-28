import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import MountainParallax from '../design/MountainParallax'
import WaterRipple from '../design/WaterRipple'

/*
 * The Claude Design scene assets render light/dawn tones only. This veil tints
 * them toward dusk in dark mode so they don't read as bright daylight.
 */
export function DuskVeil({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 hidden dark:block ${className}`}
      style={{
        background:
          'linear-gradient(180deg, rgba(29,27,46,0.82) 0%, rgba(21,19,31,0.88) 100%)',
      }}
    />
  )
}

/* Soft top/bottom fades so a full-bleed scene band melts into the page wash. */
function Feather() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cream to-transparent dark:from-night" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream to-transparent dark:from-night" />
    </>
  )
}

/* Mountain range that parallaxes as it scrolls through the viewport. */
export function MountainBand() {
  const ref = useRef(null)
  const [p, setP] = useState(0)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  useMotionValueEvent(scrollYProgress, 'change', setP)

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative h-[42vh] w-full overflow-hidden sm:h-[56vh]"
    >
      <MountainParallax scrollProgress={p} />
      <DuskVeil />
      <Feather />
    </div>
  )
}

/* Full-width water ripple "breath" between sections. */
export function WaterDivider() {
  return (
    <div aria-hidden="true" className="relative h-[200px] w-full overflow-hidden">
      <WaterRipple />
      <DuskVeil />
      <Feather />
    </div>
  )
}
