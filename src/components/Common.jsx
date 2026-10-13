import React, { useCallback, useEffect, useRef, useState, createContext, useContext } from "react"
import { motion } from "framer-motion"

export const ToastContext = createContext(() => {})
export const useToast = () => useContext(ToastContext)

/* Client req #3: voice audio player with a brief English feature narration.
   Uses the SpeechSynthesis API so no audio assets are needed for the POC.
   User can pause, and disable it entirely; choice persists per page. */
export function VoicePlayer({ brief, pageKey }) {
  const storageKey = `hic-voice-${pageKey}`
  const [enabled, setEnabled] = useState(() => {
    try { return localStorage.getItem(storageKey) !== "off" } catch { return true }
  })
  const [state, setState] = useState("idle") // idle | playing | paused
  const utterRef = useRef(null)
  const supported = typeof window !== "undefined" && "speechSynthesis" in window

  const stop = useCallback(() => {
    if (supported) window.speechSynthesis.cancel()
    setState("idle")
  }, [supported])

  useEffect(() => stop, [stop, pageKey])

  useEffect(() => {
    try { localStorage.setItem(storageKey, enabled ? "on" : "off") } catch {}
    if (!enabled) stop()
  }, [enabled, storageKey, stop])

  if (!supported || !enabled) return null

  const toggle = () => {
    if (state === "playing") {
      window.speechSynthesis.pause()
      setState("paused")
    } else if (state === "paused") {
      window.speechSynthesis.resume()
      setState("playing")
    } else {
      const u = new SpeechSynthesisUtterance(brief)
      u.lang = "en-IN"
      u.rate = 1.02
      u.onend = () => setState("idle")
      utterRef.current = u
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(u)
      setState("playing")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
      className="fixed bottom-24 right-5 z-40 flex items-center gap-1.5 rounded-full border border-line bg-ink-900/90 p-1.5 backdrop-blur-lg sm:bottom-6"
      role="group"
      aria-label="Audio introduction"
    >
      <button
        onClick={toggle}
        className="flex items-center gap-2 rounded-full bg-neutral-900/8 px-3.5 py-2 text-[12px] font-medium text-neutral-900 transition-colors hover:bg-neutral-900/14"
        aria-label={state === "playing" ? "Pause audio introduction" : "Play audio introduction"}
      >
        {state === "playing" ? (
          <span className="flex items-end gap-[2.5px]" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[2.5px] rounded-full bg-accent"
                animate={{ height: [4, 12, 6, 13, 4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.12 }}
              />
            ))}
          </span>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path d="M3 1.8v8.4L10.4 6 3 1.8z" />
          </svg>
        )}
        <span>{state === "idle" ? "Listen" : state === "playing" ? "Playing" : "Paused"}</span>
      </button>
      <button
        onClick={() => { stop(); setEnabled(false) }}
        className="grid h-8 w-8 place-items-center rounded-full text-fog transition-colors hover:bg-neutral-900/10 hover:text-neutral-900"
        aria-label="Disable audio on this page"
        title="Disable audio on this page"
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M2 2l8 8M10 2l-8 8" strokeLinecap="round" />
        </svg>
      </button>
    </motion.div>
  )
}

/* Client req #12: WhatsApp chat entry point. */
export function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/918826679660?text=Hi%20HIC%2C%20I%27d%20like%20a%20quote%20for%20hydraulic%20hose."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with HIC on WhatsApp"
      className="fixed bottom-6 right-5 z-40 grid h-13 w-13 place-items-center rounded-full bg-[#22c55e] shadow-[0_8px_30px_rgba(34,197,94,0.35)] transition-transform hover:scale-105"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7, type: "spring", stiffness: 260, damping: 18 }}
      style={{ width: 52, height: 52 }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0b0b0c" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.82 2.42a8.19 8.19 0 0 1 2.42 5.83c0 4.54-3.7 8.24-8.24 8.24-1.55 0-3.06-.42-4.38-1.2l-.31-.19-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m-3.7 3.28c-.18 0-.47.07-.72.33-.24.27-.94.92-.94 2.25 0 1.32.96 2.6 1.1 2.78.13.18 1.87 3 4.62 4.08 2.29.9 2.76.72 3.26.67.5-.05 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.12-.25-.18-.52-.32l-1.83-.85c-.25-.13-.44-.18-.63.07-.18.25-.72.85-.88 1.02-.16.18-.32.2-.6.07a7.5 7.5 0 0 1-2.2-1.36 8.3 8.3 0 0 1-1.52-1.9c-.16-.27-.02-.42.12-.55.12-.12.27-.32.4-.49.14-.16.19-.27.29-.45.09-.18.04-.34-.02-.47-.07-.13-.63-1.47-.87-2.01-.23-.5-.46-.5-.64-.5z"/>
      </svg>
    </motion.a>
  )
}

/* Count-up stat with an IntersectionObserver trigger. */
export function Stat({ value, suffix, label, delay = 0 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect() } },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) { setDisplay(value); return }
    const t0 = performance.now()
    const dur = 1400
    let raf
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(value * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    const timeout = setTimeout(() => { raf = requestAnimationFrame(tick) }, delay)
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf) }
  }, [started, value, delay])

  return (
    <div ref={ref}>
      <p className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
        {display}
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-1.5 text-[13px] text-fog">{label}</p>
    </div>
  )
}
