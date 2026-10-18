import { useEffect, useMemo, useRef, useState } from 'react'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Painted sky → mountains → meadow behind the whole page. The CSS gradient on the
// wrapper shows instantly; the worker's painting fades in on top once it's done.
export function Backdrop() {
  const wrap = useRef(null)
  const canvas = useRef(null)
  const fx = useRef(null)
  const [size, setSize] = useState(null)
  const [painted, setPainted] = useState(false)

  useEffect(() => {
    const el = wrap.current
    const worker = 'OffscreenCanvas' in window
      ? new Worker(new URL('./paint.worker.js', import.meta.url), { type: 'module' })
      : null
    let last = { W: 0, H: 0 }, id = 0, timer

    if (worker) worker.onmessage = ({ data }) => {
      if (data.id !== id) return data.bitmap.close()
      canvas.current.getContext('bitmaprenderer').transferFromImageBitmap(data.bitmap)
      setPainted(true)
    }

    const measure = () => {
      const W = el.clientWidth, H = el.clientHeight
      if (W === last.W && Math.abs(H - last.H) < 60) return
      last = { W, H }
      setSize({ W, H })
      const scale = Math.min(1, 1200 / W, Math.sqrt(9.5e6 / (W * H)))
      worker?.postMessage({ W, H, scale, seed: 158, id: ++id })
    }
    const soon = () => { clearTimeout(timer); timer = setTimeout(measure, 250) }
    measure()
    const ro = new ResizeObserver(soon)
    ro.observe(el)

    // shooting stars every so often
    let shootT
    const shoot = () => {
      shootT = setTimeout(() => {
        if (!document.hidden && fx.current) shootingStar(fx.current, el.clientWidth, last.H * 0.24)
        shoot()
      }, 9000 + Math.random() * 17000)
    }
    if (!reducedMotion()) shoot()

    return () => { worker?.terminate(); ro.disconnect(); clearTimeout(timer); clearTimeout(shootT) }
  }, [])

  return (
    <div ref={wrap} aria-hidden="true" className="backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <canvas
        ref={canvas}
        className={`block h-full w-full transition-opacity duration-1000 ${painted ? 'opacity-100' : 'opacity-0'}`}
      />
      <div ref={fx} className="absolute inset-0">
        {size && <Weather {...size} />}
      </div>
    </div>
  )
}

function Weather({ W, H }) {
  const nightEnd = H * 0.24
  const { stars, clouds } = useMemo(() => {
    const r = Math.random
    return {
      stars: Array.from({ length: Math.round(Math.min(140, W * 0.09)) }, () => ({
        left: r() * 100, top: Math.pow(r(), 1.5) * nightEnd, size: 1 + r() * 1.8,
        a: 0.55 + r() * 0.4, dur: 2.6 + r() * 4, delay: -r() * 6,
      })),
      clouds: Array.from({ length: 5 }, () => ({
        left: r() * 80 - 5, top: H * (0.28 + r() * 0.13), w: W * (0.22 + r() * 0.3),
        h: 18 + r() * 34, depth: 0.5 + r() * 0.5, delay: -r() * 90,
      })),
    }
  }, [W, H, nightEnd])

  return (
    <>
      {stars.map((s, i) => (
        <span
          key={i}
          className="twinkle absolute rounded-full"
          style={{
            left: `${s.left}%`, top: s.top, width: s.size, height: s.size,
            background: `rgba(235,240,255,${s.a})`,
            boxShadow: s.size > 2.1 ? '0 0 6px 1px rgba(220,230,255,0.4)' : undefined,
            animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      {clouds.map((c, i) => (
        <span
          key={i}
          className="drift absolute rounded-full"
          style={{
            left: `${c.left}%`, top: c.top, width: c.w, height: c.h,
            background: `radial-gradient(ellipse closest-side, rgba(244,208,170,${0.1 + c.depth * 0.09}), transparent)`,
            filter: `blur(${3 + c.depth * 4}px)`,
            animationDuration: `${150 - c.depth * 70}s`, animationDelay: `${c.delay}s`,
          }}
        />
      ))}
    </>
  )
}

function shootingStar(parent, W, nightEnd) {
  const sx = W * (0.1 + Math.random() * 0.8), sy = nightEnd * (0.08 + Math.random() * 0.45)
  const dir = Math.random() < 0.5 ? 1 : -1
  const ang = ((16 + Math.random() * 22) * Math.PI) / 180
  const len = 240 + Math.random() * 280
  const dx = Math.cos(ang) * len * dir, dy = Math.sin(ang) * len
  const rot = `rotate(${(Math.atan2(dy, dx) * 180) / Math.PI}deg)`
  const el = document.createElement('div')
  el.style.cssText = `position:absolute;left:${sx}px;top:${sy}px;width:90px;height:1.5px;border-radius:2px;background:linear-gradient(90deg,rgba(255,250,240,0),rgba(255,250,240,.95));opacity:0`
  parent.appendChild(el)
  el.animate(
    [
      { transform: `translate(0,0) ${rot}`, opacity: 0 },
      { opacity: 0.9, offset: 0.15 },
      { opacity: 0.8, offset: 0.7 },
      { transform: `translate(${dx}px,${dy}px) ${rot}`, opacity: 0 },
    ],
    { duration: 1200 + Math.random() * 500, easing: 'cubic-bezier(0.25,0.55,0.45,1)' },
  ).onfinish = () => el.remove()
}
