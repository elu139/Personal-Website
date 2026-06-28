/*
 * PLACEHOLDER FOR CLAUDE DESIGN — <BotanicalAccent />
 * A soft sprig of leaves that gently sways. Tuck into a section corner.
 */
export default function BotanicalAccent({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none origin-bottom animate-sway ${className}`}
    >
      <svg viewBox="0 0 120 160" className="w-full h-full">
        <path
          d="M60 160 C60 110 60 70 60 20"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          className="stroke-sage-deep/70 dark:stroke-sage/60"
        />
        {[
          [60, 120, -1],
          [60, 96, 1],
          [60, 72, -1],
          [60, 50, 1],
          [60, 30, -1],
        ].map(([x, y, dir], i) => (
          <path
            key={i}
            d={`M${x} ${y} q ${dir * 34} -14 ${dir * 4} -38 q ${dir * -26} 8 ${dir * -4} 38 Z`}
            className="fill-sage/70 dark:fill-dusk-light/50"
          />
        ))}
      </svg>
    </div>
  )
}
