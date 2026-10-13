import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import ShapeGrid from "./ShapeGrid"

// Shared lockup markup — rendered once centered, and once as the fixed flying clone.
// Visually identical to the navbar logo so the handoff is seamless.
function LockupMark() {
  return (
    <div className="flex items-center gap-2.5 justify-center">
      <span className="relative grid h-9 w-9 place-items-center rounded-[10px] bg-neutral-900 text-[13px] font-bold tracking-tight text-white">
        HIC
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent ring-2 ring-paper" />
      </span>
      <span className="leading-none text-left">
        <span className="block text-[15px] font-semibold tracking-tight text-neutral-900">Hydraulic</span>
        <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-fog-dim">est. 1988 · india</span>
      </span>
    </div>
  )
}

export default function PageLoader({ onDone, onLanded, assetsReady = true }) {
  const overlayRef = useRef(null)
  const lockupRef = useRef(null)
  const subRef = useRef(null)
  const footRef = useRef(null)
  const barRef = useRef(null)
  const cloneRef = useRef(null)
  const callbacks = useRef({ onDone, onLanded })
  const assetsRef = useRef(assetsReady)
  const finished = useRef(false)
  const [allowGrid] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  useEffect(() => {
    callbacks.current = { onDone, onLanded }
    assetsRef.current = assetsReady
  })

  const finish = (landed) => {
    if (landed) callbacks.current.onLanded?.()
    if (finished.current) return
    finished.current = true
    callbacks.current.onDone?.()
  }

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const ctx = gsap.context(() => {
      const overlay = overlayRef.current
      const lockup = lockupRef.current
      const clone = cloneRef.current

      gsap.set(overlay, { autoAlpha: 1 })
      gsap.set(clone, { autoAlpha: 0 })

      if (prefersReduced) {
        const tl = gsap.timeline()
        tl.to(overlay, { autoAlpha: 0, duration: 0.3, ease: "power1.out", delay: 0.3 })
        tl.call(() => finish(true))
        return
      }

      const tl = gsap.timeline()
      // entrance
      tl.from(lockup, { autoAlpha: 0, y: 12, duration: 0.5, ease: "power2.out", delay: 0.1 })
      tl.from([subRef.current, footRef.current], { autoAlpha: 0, y: 8, duration: 0.4, ease: "power2.out" }, "-=0.3")
      tl.fromTo(barRef.current, { xPercent: -100 }, { xPercent: 0, duration: 1.0, ease: "power2.inOut" }, 0.15)

      // exit — waits for Home assets, then the lockup flies from center to the
      // navbar logo spot while the overlay fades
      const runFlight = () => {
        if (finished.current) return
        const from = lockup.getBoundingClientRect()
        const to = document.getElementById("hic-navbar-logo")?.getBoundingClientRect()
        if (!from || !to || from.width === 0 || to.width === 0) {
          gsap.to(overlay, { autoAlpha: 0, duration: 0.6, ease: "power2.inOut", onComplete: () => finish(true) })
          return
        }
        gsap.set(overlay, { pointerEvents: "none" })
        gsap.set(lockup, { autoAlpha: 0 })
        gsap.set(clone, {
          left: from.left,
          top: from.top,
          width: from.width,
          x: 0,
          y: 0,
          scale: 1,
          transformOrigin: "50% 50%",
          autoAlpha: 1,
        })
        const dx = to.left + to.width / 2 - (from.left + from.width / 2)
        const dy = to.top + to.height / 2 - (from.top + from.height / 2)
        const scale = Math.min(1.4, Math.max(0.4, to.width / from.width))

        const fly = gsap.timeline()
        fly.to(clone, { x: dx, y: dy, scale, duration: 0.9, ease: "power3.inOut" }, 0)
        fly.to(overlay, { autoAlpha: 0, duration: 0.7, ease: "power2.inOut" }, 0.2)
        // handoff: real navbar logo fades in exactly where the clone lands
        fly.call(() => callbacks.current.onLanded?.(), null, 0.65)
        fly.to(clone, { autoAlpha: 0, duration: 0.25, ease: "power1.out" }, 0.7)
        fly.call(() => {
          if (!finished.current) {
            finished.current = true
            callbacks.current.onDone?.()
          }
        }, null, 0.95)
      }

      // gate the flight on Home assets: minimum display time first, then wait
      // for assetsReady (6s cap; App's 8s backstop guarantees it resolves)
      tl.call(() => {
        if (assetsRef.current) {
          runFlight()
          return
        }
        const waitedAt = Date.now()
        const iv = setInterval(() => {
          if (assetsRef.current || Date.now() - waitedAt > 6000) {
            clearInterval(iv)
            runFlight()
          }
        }, 100)
      }, null, 1.15)

      // safety: never trap the user behind the loader
      tl.call(() => finish(true), null, 12)
    }, overlayRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-paper flex flex-col items-center justify-center"
      style={{ visibility: "hidden" }}
    >
      {/* ambient grid backdrop */}
      <div className="absolute inset-0 z-0 opacity-70">
        {allowGrid && (
          <ShapeGrid
            shape="square"
            borderColor="rgba(28,25,18,0.08)"
            hoverFillColor="rgba(29,78,216,0.12)"
            direction="diagonal"
            speed={0.5}
          />
        )}
      </div>

      <div className="relative z-10 text-center">
        <div ref={lockupRef}>
          <LockupMark />
        </div>

        <div ref={subRef} className="mt-10 flex flex-col items-center gap-3">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-fog">Hose · Couplings · Valves</div>
          <div className="w-32 h-px bg-neutral-900/15 overflow-hidden rounded">
            <div ref={barRef} className="h-full w-full bg-neutral-900" />
          </div>
          <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-fog-dim">High pressure, engineered in india</div>
        </div>
      </div>

      <div ref={footRef} className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-fog-dim/70">hichydraulic.com · redesign concept</div>
      </div>

      {/* flying clone — fixed above the fading overlay during the exit flight */}
      <div ref={cloneRef} aria-hidden="true" className="fixed left-0 top-0 z-[101] pointer-events-none" style={{ visibility: "hidden" }}>
        <LockupMark />
      </div>
    </div>
  )
}
