/*
 * PLACEHOLDER FOR CLAUDE DESIGN — <WaterRipple />
 * A still pond surface with slow concentric ripples. Decorative only.
 */
export default function WaterRipple({ className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`}>
      <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
        {[0, 1, 2].map((i) => (
          <ellipse
            key={i}
            cx="200"
            cy="120"
            rx={60 + i * 50}
            ry={16 + i * 12}
            fill="none"
            strokeWidth="2"
            className="stroke-sage/40 dark:stroke-dusk-light/30 animate-shimmer"
            style={{ animationDelay: `${i * 1.1}s` }}
          />
        ))}
      </svg>
    </div>
  )
}
