/*
 * <HeroAnimation />  —  Asset 01
 * A full-viewport breathing dawn sky for the Hero section.
 *
 * The base gradient slowly drifts and "breathes" (a living sunset), with three
 * wispy cloud layers gliding at different speeds for depth. Loops seamlessly.
 * Self-contained: no Tailwind / config dependency. Drops into src/design/.
 *
 * Props:
 *   className?  extra classes merged onto the root (positioning overrides, etc.)
 *   style?      extra inline style merged onto the root
 */

// Inject keyframes once per page.
const KF_ID = 'hero-animation-kf'
if (typeof document !== 'undefined' && !document.getElementById(KF_ID)) {
  const s = document.createElement('style')
  s.id = KF_ID
  s.textContent = `
    @keyframes hero-skyShift { 0%{background-position:0% 0%} 50%{background-position:100% 100%} 100%{background-position:0% 0%} }
    @keyframes hero-skyPulse { 0%,100%{opacity:.22} 50%{opacity:.55} }
    @keyframes hero-drift    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  `
  document.head.appendChild(s)
}

const CLOUD_A =
  'radial-gradient(ellipse 28% 60% at 18% 55%, rgba(255,255,255,0.85), transparent 62%),' +
  'radial-gradient(ellipse 34% 50% at 54% 40%, rgba(252,213,181,0.70), transparent 60%),' +
  'radial-gradient(ellipse 24% 55% at 84% 60%, rgba(255,255,255,0.70), transparent 62%)'
const CLOUD_B =
  'radial-gradient(ellipse 30% 55% at 30% 50%, rgba(255,255,255,0.90), transparent 60%),' +
  'radial-gradient(ellipse 26% 48% at 68% 64%, rgba(232,196,224,0.75), transparent 60%)'
const CLOUD_C =
  'radial-gradient(ellipse 34% 60% at 22% 70%, rgba(255,255,255,0.95), transparent 60%),' +
  'radial-gradient(ellipse 30% 54% at 62% 78%, rgba(252,213,181,0.85), transparent 60%),' +
  'radial-gradient(ellipse 22% 48% at 90% 72%, rgba(244,167,185,0.70), transparent 62%)'

function Strip({ top, bottom, height, blur, opacity, duration, bg }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top,
        bottom,
        width: '200%',
        height,
        display: 'flex',
        filter: `blur(${blur}px)`,
        opacity,
        animation: `hero-drift ${duration}s linear infinite`,
        willChange: 'transform',
      }}
    >
      <div style={{ width: '50%', height: '100%', background: bg }} />
      <div style={{ width: '50%', height: '100%', background: bg }} />
    </div>
  )
}

export default function HeroAnimation({ className = '', style }) {
  return (
    <div
      id="hero-animation"
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -10,
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* breathing gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg,#fcd5b5 0%,#f4a7b9 28%,#e8c4e0 52%,#c9d5f0 76%,#ddeeff 100%)',
          backgroundSize: '300% 300%',
          animation: 'hero-skyShift 26s ease-in-out infinite',
        }}
      />
      {/* living overlay glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(120% 90% at 76% 22%, rgba(255,246,224,0.85), rgba(244,167,185,0.2) 45%, transparent 70%)',
          mixBlendMode: 'screen',
          animation: 'hero-skyPulse 14s ease-in-out infinite',
        }}
      />
      <Strip top="6%" height="60%" blur={26} opacity={0.55} duration={90} bg={CLOUD_A} />
      <Strip top="24%" height="58%" blur={20} opacity={0.6} duration={58} bg={CLOUD_B} />
      <Strip bottom="-6%" height="54%" blur={16} opacity={0.7} duration={40} bg={CLOUD_C} />
    </div>
  )
}
