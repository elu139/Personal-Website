/*
 * <BotanicalAccent />  —  Asset 04
 * A soft sprig of vines, leaves and wildflowers that draws itself in (grows &
 * blooms) on load — or whenever `isVisible` becomes true — then sways gently.
 * SVG-based, so it scales cleanly. Tuck it into a section corner.
 *
 * The component fills its parent box; mirror or fade it from the parent:
 *   <BotanicalAccent className="absolute bottom-0 left-6 h-40 w-28 opacity-60" />
 *   <BotanicalAccent className="absolute bottom-0 right-6 h-40 w-28 -scale-x-100" />
 *
 * Props:
 *   isVisible?  boolean (default true) — triggers the grow-in when true.
 *               Wire it to an in-view observer to grow on scroll.
 *   className?, style?
 */
import { useEffect, useState } from 'react'

const KF_ID = 'botanical-accent-kf'
if (typeof document !== 'undefined' && !document.getElementById(KF_ID)) {
  const s = document.createElement('style')
  s.id = KF_ID
  s.textContent = `
    @keyframes bot-grow  { from{stroke-dashoffset:100} to{stroke-dashoffset:0} }
    @keyframes bot-leaf  { 0%{transform:scale(0) rotate(-8deg);opacity:0} 100%{transform:scale(1) rotate(0);opacity:1} }
    @keyframes bot-bloom { 0%{transform:scale(0);opacity:0} 65%{transform:scale(1.18);opacity:1} 100%{transform:scale(1);opacity:1} }
    @keyframes bot-sway  { 0%,100%{transform:rotate(-2deg)} 50%{transform:rotate(2deg)} }
  `
  document.head.appendChild(s)
}

const stem = (extra) => ({
  fill: 'none',
  strokeLinecap: 'round',
  strokeDasharray: 100,
  ...extra,
})
const grown = (play, dur, delay) => ({
  animation: `bot-grow ${dur}s ease-out ${delay}s forwards`,
  animationPlayState: play ? 'running' : 'paused',
  strokeDashoffset: 100,
})
const leaf = (play, delay, origin) => ({
  transformBox: 'fill-box',
  transformOrigin: origin,
  animation: `bot-leaf 0.6s ease-out ${delay}s both`,
  animationPlayState: play ? 'running' : 'paused',
})
const bloom = (play, delay) => ({
  transformBox: 'fill-box',
  transformOrigin: 'center',
  animation: `bot-bloom 0.7s ease-out ${delay}s both`,
  animationPlayState: play ? 'running' : 'paused',
})

export default function BotanicalAccent({ isVisible = true, className = '', style }) {
  const [play, setPlay] = useState(false)
  useEffect(() => {
    if (isVisible) setPlay(true)
  }, [isVisible])

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', ...style }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformOrigin: 'bottom center',
          animation: 'bot-sway 7s ease-in-out infinite',
        }}
      >
        <svg viewBox="0 0 280 340" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          {/* stems */}
          <path d="M44,338 C70,260 48,205 120,168 C168,143 165,96 150,40" pathLength="100" stroke="#5e7d62" strokeWidth="3.5" style={stem(grown(play, 1.6, 0))} />
          <path d="M58,300 C36,256 60,222 26,196" pathLength="100" stroke="#7a9e7e" strokeWidth="2.6" style={stem(grown(play, 1.3, 0.5))} />
          <path d="M96,232 C120,212 150,220 176,196" pathLength="100" stroke="#7a9e7e" strokeWidth="2.4" style={stem(grown(play, 1.2, 0.9))} />
          {/* leaves */}
          <g style={leaf(play, 0.7, '0% 100%')}><path d="M60,300 C82,294 96,272 78,250 C66,272 50,284 60,300 Z" fill="#a8c5a0" /></g>
          <g style={leaf(play, 0.95, '100% 100%')}><path d="M70,262 C50,258 34,238 50,216 C62,236 80,246 70,262 Z" fill="#7a9e7e" /></g>
          <g style={leaf(play, 1.15, '0% 100%')}><path d="M112,210 C134,206 150,186 134,162 C120,184 102,194 112,210 Z" fill="#a8c5a0" /></g>
          <g style={leaf(play, 1.35, '100% 100%')}><path d="M120,170 C100,168 82,150 96,126 C110,146 130,154 120,170 Z" fill="#7a9e7e" /></g>
          <g style={leaf(play, 1.55, '0% 100%')}><path d="M150,118 C172,116 190,98 176,72 C160,94 140,102 150,118 Z" fill="#a8c5a0" /></g>
          {/* blooms */}
          <g style={bloom(play, 1.7)}>
            <g transform="translate(26,196)">
              <circle r="6.5" fill="#b8a9d4" />
              <circle cx="9" r="5.5" fill="#e8c4e0" /><circle cx="-9" r="5.5" fill="#e8c4e0" />
              <circle cy="9" r="5.5" fill="#e8c4e0" /><circle cy="-9" r="5.5" fill="#e8c4e0" />
              <circle r="3.5" fill="#fcd5b5" />
            </g>
          </g>
          <g style={bloom(play, 1.95)}>
            <g transform="translate(176,196)">
              <circle r="6" fill="#f4a7b9" />
              <circle cx="8.5" r="5" fill="#fcd5b5" /><circle cx="-8.5" r="5" fill="#fcd5b5" />
              <circle cy="8.5" r="5" fill="#fcd5b5" /><circle cy="-8.5" r="5" fill="#fcd5b5" />
              <circle r="3" fill="#fff" />
            </g>
          </g>
          <g style={bloom(play, 2.2)}>
            <g transform="translate(150,40)">
              <circle r="7" fill="#e8c4e0" />
              <circle cx="10" r="6" fill="#f4a7b9" /><circle cx="-10" r="6" fill="#f4a7b9" />
              <circle cy="10" r="6" fill="#f4a7b9" /><circle cy="-10" r="6" fill="#f4a7b9" />
              <circle r="4" fill="#fcd5b5" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}
