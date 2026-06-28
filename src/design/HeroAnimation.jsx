/*
 * ┌─────────────────────────────────────────────────────────────┐
 * │  PLACEHOLDER FOR CLAUDE DESIGN — <HeroAnimation />            │
 * │  Self-contained, drop-in replaceable.                        │
 * │  Current: a calm dawn sky — drifting sun, layered hills,     │
 * │  floating motes. Replace the inner SVG/canvas as desired.    │
 * └─────────────────────────────────────────────────────────────┘
 */
export default function HeroAnimation() {
  return (
    <div
      id="hero-animation"
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fcd5b5" />
            <stop offset="45%" stopColor="#f4a7b9" />
            <stop offset="100%" stopColor="#e8c4e0" />
          </linearGradient>
          <linearGradient id="skyDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2e52" />
            <stop offset="55%" stopColor="#2a2740" />
            <stop offset="100%" stopColor="#1d1b2e" />
          </linearGradient>
        </defs>

        <rect width="1440" height="900" fill="url(#sky)" className="dark:hidden" />
        <rect
          width="1440"
          height="900"
          fill="url(#skyDark)"
          className="hidden dark:block"
        />

        {/* sun / moon */}
        <circle
          cx="1080"
          cy="240"
          r="120"
          className="fill-white/60 dark:fill-dusk-light/40 animate-breathe"
          style={{ transformOrigin: '1080px 240px' }}
        />

        {/* drifting motes */}
        {[
          [220, 180, 4],
          [520, 120, 3],
          [900, 320, 5],
          [1280, 460, 3],
          [380, 420, 4],
          [700, 220, 2],
        ].map(([cx, cy, r], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            className="fill-white/50 dark:fill-white/30 animate-drift"
            style={{ animationDelay: `${i * 1.3}s` }}
          />
        ))}

        {/* layered hills */}
        <path
          d="M0 720 Q 360 620 720 700 T 1440 680 V900 H0 Z"
          className="fill-dusk-light/50 dark:fill-night-soft/70"
        />
        <path
          d="M0 800 Q 400 720 820 790 T 1440 770 V900 H0 Z"
          className="fill-sage-light/60 dark:fill-night/80"
        />
      </svg>
    </div>
  )
}
