import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GsapReveal = ({
  children,
  className = '',
  style,
  delay = 0,
  duration = 0.42,
  ease = 'power2.out',
  y = 14,
  stagger = 0,
  threshold = 0.15,
  ...props
}) => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const getChildren = () => Array.from(el.children)
    const targets = stagger > 0 ? getChildren() : [el]
    if (!targets.length) return

    // Auto-play on mount: elements below the fold sit below the fold until
    // scrolled into view, elements at/above the fold animate immediately.
    // This avoids StrictMode double-effect killing the "once" trigger.
    gsap.set(targets, { y, autoAlpha: 0 })
    const tween = gsap.to(targets, {
      y: 0,
      autoAlpha: 1,
      duration,
      ease,
      delay,
      stagger: stagger > 0 ? stagger : 0,
      overwrite: 'auto',
      scrollTrigger: threshold > 0 ? {
        trigger: el,
        start: `top ${(1 - threshold) * 100}%`,
        once: true,
      } : undefined,
      onComplete: () => gsap.set(targets, { clearProps: 'willChange' }),
    })

    return () => { tween.scrollTrigger?.kill(); tween.kill(); gsap.killTweensOf(targets) }
  }, [delay, duration, ease, y, stagger, threshold])

  return (
    <div ref={ref} className={className} style={style} {...props}>
      {children}
    </div>
  )
}

export default GsapReveal