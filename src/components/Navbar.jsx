import React, { useState, useEffect, useRef } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/catalogue", label: "Catalogue" },
]

function Logo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group" aria-label="HIC Hydraulic home">
      <span className="relative grid h-9 w-9 place-items-center rounded-[10px] bg-neutral-900 text-[13px] font-bold tracking-tight text-white transition-colors group-hover:bg-accent">
        HIC
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent ring-2 ring-paper" />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block text-[15px] font-semibold tracking-tight text-neutral-900">Hydraulic</span>
          <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-fog-dim">est. 1988 · india</span>
        </span>
      )}
    </Link>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [loc.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo compact={scrolled} />
        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${
                  isActive ? "bg-neutral-900/10 text-neutral-900" : "text-fog hover:text-neutral-900"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <a
            href="/products#enquiry"
            className="ml-3 rounded-full bg-neutral-900 px-4.5 py-2 text-[13.5px] font-semibold text-white transition-colors hover:bg-accent"
          >
            Get a quote
          </a>
        </div>
        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-line text-neutral-900 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="space-y-1.5">
            <span className={`block h-px w-4.5 bg-neutral-900 transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block h-px w-4.5 bg-neutral-900 transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden border-b border-line bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-5 py-4">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-[15px] font-medium ${isActive ? "bg-neutral-900/10 text-neutral-900" : "text-fog"}`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              <a href="/products#enquiry" className="mt-2 block rounded-xl bg-neutral-900 px-4 py-3 text-center text-[15px] font-semibold text-white">
                Get a quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
