/*
 * <WaterRipple />  —  Asset 03
 * A full-width, ~200px-tall divider of gentle water ripples emanating from the
 * centre and fading outward. Loops seamlessly — use it as a visual breath
 * between sections (2–3 times across the page is fine).
 *
 * Props:
 *   isVisible?  boolean (default true) — pauses the animation when off-screen
 *   className?, style?
 */

const KF_ID = 'water-ripple-kf'
if (typeof document !== 'undefined' && !document.getElementById(KF_ID)) {
  const s = document.createElement('style')
  s.id = KF_ID
  s.textContent = `
    @keyframes wr-ripple  { 0%{transform:translate(-50%,-50%) scale(.12);opacity:0} 12%{opacity:.6} 100%{transform:translate(-50%,-50%) scale(2.7);opacity:0} }
    @keyframes wr-shimmer { 0%,100%{opacity:.18} 50%{opacity:.45} }
  `
  document.head.appendChild(s)
}

const RINGS = [
  { color: 'rgba(255,255,255,0.85)', delay: 0 },
  { color: 'rgba(168,197,160,0.85)', delay: 1.5 },
  { color: 'rgba(201,223,240,0.90)', delay: 3 },
  { color: 'rgba(255,255,255,0.70)', delay: 4.5 },
]

export default function WaterRipple({ isVisible = true, className = '', style }) {
  const playState = isVisible ? 'running' : 'paused'
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 200,
        overflow: 'hidden',
        background: 'linear-gradient(180deg,#cfe6e6 0%,#a8c5bf 50%,#9cc3c0 100%)',
        ...style,
      }}
    >
      {/* shimmer lines */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: '42%', height: 1, background: 'rgba(255,255,255,0.8)', animation: 'wr-shimmer 5s ease-in-out infinite', animationPlayState: playState }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: '62%', height: 1, background: 'rgba(255,255,255,0.7)', animation: 'wr-shimmer 7s ease-in-out infinite 1s', animationPlayState: playState }} />
      {/* concentric ripple rings */}
      {RINGS.map((r, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 240,
            height: 64,
            borderRadius: '50%',
            border: `2px solid ${r.color}`,
            animation: `wr-ripple 6s ease-out infinite ${r.delay}s`,
            animationPlayState: playState,
          }}
        />
      ))}
      {/* centre glint */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 14,
          height: 6,
          borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'rgba(255,255,255,0.95)',
          boxShadow: '0 0 16px 6px rgba(255,255,255,0.5)',
        }}
      />
    </div>
  )
}
