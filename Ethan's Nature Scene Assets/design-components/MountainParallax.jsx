/*
 * <MountainParallax />  —  Asset 02
 * Layered, silhouetted mountain ranges that recede into a hazy distance, with
 * mist drifting between the layers. Drive it with `scrollProgress` (0 → 1) to
 * feel like descending from a peak into a valley — foreground ranges sink
 * faster than the distant ones.
 *
 * The component fills its parent box, so size/position it from the parent:
 *   <div className="relative h-screen">
 *     <MountainParallax scrollProgress={p} />
 *   </div>
 * Pair `scrollProgress` with a scroll listener or framer-motion's useScroll.
 *
 * Props:
 *   scrollProgress?  number 0..1 (default 0) — parallax depth
 *   className?, style?
 */

const KF_ID = 'mountain-parallax-kf'
if (typeof document !== 'undefined' && !document.getElementById(KF_ID)) {
  const s = document.createElement('style')
  s.id = KF_ID
  s.textContent = `
    @keyframes mtn-mist { 0%{transform:translateX(-8%);opacity:0} 25%{opacity:.6} 75%{opacity:.6} 100%{transform:translateX(8%);opacity:0} }
  `
  document.head.appendChild(s)
}

function Ridge({ d, fill, ty }) {
  return (
    <svg
      viewBox="0 0 1440 440"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <g style={{ transform: `translateY(${ty}px)` }}>
        <path d={d} fill={fill} />
      </g>
    </svg>
  )
}

export default function MountainParallax({ scrollProgress = 0, className = '', style }) {
  const p = Math.max(0, Math.min(1, scrollProgress))
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...style }}
    >
      {/* sky */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg,#c9dff0 0%,#ddeeff 30%,#e8c4e0 72%,#f4d3df 100%)',
        }}
      />
      {/* back + far ranges (palest, hazy) */}
      <Ridge
        d="M0,210 L180,130 L360,200 L560,120 L760,195 L980,135 L1200,205 L1440,150 L1440,440 L0,440 Z"
        fill="#cdbfe6"
        ty={p * 14}
      />
      <Ridge
        d="M0,265 L210,175 L420,255 L640,165 L880,250 L1100,180 L1320,255 L1440,210 L1440,440 L0,440 Z"
        fill="#b8a9d4"
        ty={p * 30}
      />
      {/* mist band A */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '54%',
          width: '120%',
          height: 90,
          background: 'linear-gradient(180deg,transparent,rgba(255,255,255,0.85),transparent)',
          filter: 'blur(10px)',
          animation: 'mtn-mist 17s ease-in-out infinite',
        }}
      />
      <Ridge
        d="M0,320 L240,235 L470,320 L700,225 L930,315 L1160,240 L1380,320 L1440,290 L1440,440 L0,440 Z"
        fill="#8a7cb0"
        ty={p * 54}
      />
      {/* mist band B */}
      <div
        style={{
          position: 'absolute',
          left: '-10%',
          top: '70%',
          width: '130%',
          height: 80,
          background: 'linear-gradient(180deg,transparent,rgba(255,255,255,0.9),transparent)',
          filter: 'blur(12px)',
          animation: 'mtn-mist 13s ease-in-out infinite reverse',
        }}
      />
      {/* front range (deepest) */}
      <Ridge
        d="M0,395 L260,300 L520,390 L780,295 L1020,385 L1260,305 L1440,380 L1440,440 L0,440 Z"
        fill="#5d5380"
        ty={p * 92}
      />
    </div>
  )
}
