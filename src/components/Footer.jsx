import React, { useState } from "react"
import { Link } from "react-router-dom"

export function Footer() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const subscribe = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    // Production: POST to Mailchimp/Sendgrid list endpoint (client req #5)
    setSent(true)
  }

  return (
    <footer className="relative z-10 border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="text-[17px] font-semibold tracking-tight text-neutral-900">
              HIC <span className="text-accent">Hydraulic</span>
            </p>
            <p className="mt-3 max-w-xs text-[13.5px] leading-relaxed text-fog">
              High pressure hoses, couplings and valves. Manufactured in New Delhi since 1988,
              exported to 33 countries.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-fog-dim">
              ISO 9001:2015 · CE · SAE J517
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog-dim">Explore</p>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              <li><Link className="text-fog transition-colors hover:text-neutral-900" to="/">Home</Link></li>
              <li><Link className="text-fog transition-colors hover:text-neutral-900" to="/products">Products</Link></li>
              <li><Link className="text-fog transition-colors hover:text-neutral-900" to="/catalogue">Catalogue flipbook</Link></li>
              <li><a className="text-fog transition-colors hover:text-neutral-900" href="/products#enquiry">Request a quote</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog-dim">Contact</p>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              <li><a className="text-fog transition-colors hover:text-neutral-900" href="tel:+918826679660">+91 88266 79660</a></li>
              <li><a className="text-fog transition-colors hover:text-neutral-900" href="mailto:universal@hic-india.com">universal@hic-india.com</a></li>
              <li className="text-fog">New Delhi, India</li>
              <li className="text-fog-dim">Mon–Sat, 9:00–18:30 IST</li>
            </ul>
          </div>
          <div className="copy-allowed">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog-dim">Trade updates, monthly</p>
            {sent ? (
              <p className="mt-4 rounded-xl border border-line bg-ink-900 px-4 py-3 text-[13px] text-accent">
                You're on the list. First update lands next month.
              </p>
            ) : (
              <form onSubmit={subscribe} className="mt-4 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="work email"
                  className="min-w-0 flex-1 rounded-full border border-line bg-ink-900 px-4 py-2.5 text-[13px] text-neutral-900 placeholder:text-fog-dim focus:border-accent/60 focus:outline-none"
                />
                <button className="rounded-full bg-neutral-900 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent">
                  Join
                </button>
              </form>
            )}
            <p className="mt-3 text-[11.5px] leading-relaxed text-fog-dim">
              One email a month. Price movements, new sizes, no noise. Unsubscribe anytime.
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[12px] text-fog-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 HIC Hydraulic · HIC International Co Inc</p>
          <p className="font-mono">hichydraulic.com — redesigned concept</p>
        </div>
      </div>
    </footer>
  )
}
