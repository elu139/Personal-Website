/*
 * PLACEHOLDER FOR CLAUDE DESIGN — <MountainParallax />
 * Layered ridgeline that sits at the top edge of a section, easing the
 * transition between landscapes. Replace inner SVG as desired.
 */
export default function MountainParallax({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 -translate-y-full ${className}`}
    >
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="w-full h-[120px]">
        <path
          d="M0 160 L240 60 L420 120 L640 30 L860 110 L1080 50 L1280 120 L1440 70 V160 Z"
          className="fill-dusk/40 dark:fill-night-soft/60"
        />
        <path
          d="M0 160 L200 100 L440 150 L700 90 L960 150 L1180 100 L1440 140 V160 Z"
          className="fill-dusk-deep/40 dark:fill-night/70"
        />
      </svg>
    </div>
  )
}
