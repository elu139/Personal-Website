/*
 * <PlaygroundAtmosphere />  —  Asset 05
 * A gentle generative background of firefly-like orbs drifting slowly upward in
 * warm sunset tones (peach, coral, soft gold). Alive and curious, but calm.
 * Canvas-based; pauses cleanly when `isVisible` is false and respects
 * prefers-reduced-motion (renders a soft static field instead).
 *
 * Drop it behind the Playground content:
 *   <div className="relative">
 *     <PlaygroundAtmosphere className="absolute inset-0 -z-10" />
 *     ...cards...
 *   </div>
 *
 * Props:
 *   isVisible?  boolean (default true) — pauses the animation loop when false
 *   className?, style?
 */
import { useEffect, useRef } from 'react'

const COLORS = ['#fcd5b5', '#f4a7b9', '#f6c177', '#fbb89c', '#f8c8b0']

function hexA(hex, a) {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const n = parseInt(h, 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a.toFixed(3)})`
}

export default function PlaygroundAtmosphere({ isVisible = true, className = '', style }) {
  const canvasRef = useRef(null)
  const visibleRef = useRef(isVisible)
  visibleRef.current = isVisible

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let parts = []
    let raf = 0
    let t = 0

    const mk = (spread) => ({
      x: Math.random() * w,
      y: spread ? Math.random() * h : h + 12,
      r: 1.4 + Math.random() * 3.2,
      vy: 0.12 + Math.random() * 0.42,
      sway: 0.3 + Math.random() * 0.9,
      sx: 0.4 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      baseA: 0.28 + Math.random() * 0.5,
    })

    const init = () => {
      const rect = cv.getBoundingClientRect()
      w = rect.width
      h = rect.height
      cv.width = w * dpr
      cv.height = h * dpr
      const n = Math.max(24, Math.round(w / 20))
      parts = Array.from({ length: n }, () => mk(true))
    }

    const paint = () => {
      ctx.clearRect(0, 0, cv.width, cv.height)
      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.globalCompositeOperation = 'lighter'
      for (const p of parts) {
        const x = p.x + Math.sin(p.phase) * 22 * p.sway
        const a = p.baseA * (0.55 + 0.45 * Math.sin(t * 1.4 + p.phase))
        const g = ctx.createRadialGradient(x, p.y, 0, x, p.y, p.r * 4.2)
        g.addColorStop(0, hexA(p.color, a))
        g.addColorStop(1, hexA(p.color, 0))
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, p.y, p.r * 4.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = hexA('#ffffff', a * 0.55)
        ctx.beginPath()
        ctx.arc(x, p.y, p.r * 0.55, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visibleRef.current) return
      t += 0.016
      for (const p of parts) {
        p.y -= p.vy
        p.phase += 0.01 * p.sx
        if (p.y < -12) Object.assign(p, mk(false))
      }
      paint()
    }

    init()
    if (reduce) {
      paint() // single static field, no motion
    } else {
      tick()
    }

    const onResize = () => init()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...style }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
