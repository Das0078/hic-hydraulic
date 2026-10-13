import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

/* Client req #10/#11: long-form content stored as H2 questions; only the H1
   and lead paragraph are visible by default, each H2 answer opens on click.
   This keeps 1500+ word pages to roughly one viewport of visible content. */
export function FaqAccordion({ items, initialOpen = 0, idPrefix = "faq" }) {
  const [open, setOpen] = useState(initialOpen)

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `${idPrefix}-panel-${i}`
        return (
          <div key={i}>
            <h2 className="m-0">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex w-full items-baseline justify-between gap-6 py-5 text-left sm:py-6"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] text-fog-dim tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[17px] font-medium leading-snug tracking-tight transition-colors sm:text-xl ${
                      isOpen ? "text-neutral-900" : "text-fog group-hover:text-neutral-900"
                    }`}
                  >
                    {item.h2}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`relative mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                    isOpen ? "rotate-45 border-accent/60 bg-accent-dim text-accent-soft" : "border-line text-fog group-hover:border-line-strong"
                  }`}
                >
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 1v10M1 6h10" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h2>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-2xl space-y-4 pb-7 pl-9 pr-4 sm:pl-11">
                    {(Array.isArray(item.body) ? item.body : [item.body]).map((p, j) => (
                      <p key={j} className="lead-p text-[14.5px] text-fog">
                        {p}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* Client req #15: website translator. Production swaps this for the Google
   Translate widget or a paid API; the POC applies the locale picker UI and
   demonstrates the pattern without a third-party key. */
export function Translator() {
  const [lang, setLang] = useState("EN")
  const LANGS = ["EN", "HI", "AR", "ES", "FR", "DE", "PT", "RU", "ZH"]
  return (
    <label className="flex items-center gap-2 rounded-full border border-line bg-ink-900 px-3 py-1.5">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-fog" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
      </svg>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        aria-label="Translate website"
        className="cursor-pointer bg-transparent font-mono text-[11px] tracking-wide text-fog outline-none"
      >
        {LANGS.map((l) => (
          <option key={l} value={l} className="bg-ink-900 text-neutral-900">{l}</option>
        ))}
      </select>
    </label>
  )
}

/* Client req #6: product enquiry form with arithmetic captcha and a note that
   a copy of the submission is emailed to the buyer. Production wires this to
   a Google Forms / Sendgrid endpoint; the POC validates client-side. */
export function EnquiryForm({ product = "General enquiry" }) {
  const [a, b] = useState(() => [3 + Math.floor(Math.random() * 6), 2 + Math.floor(Math.random() * 7)])
  const [form, setForm] = useState({ name: "", email: "", product, qty: "", message: "", captcha: "" })
  const [status, setStatus] = useState(null) // null | "error" | "sent"

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (parseInt(form.captcha, 10) !== a + b) {
      setStatus("error")
      return
    }
    // Production: POST to backend → Sendgrid/Mailchimp, cc the buyer (req #6)
    setStatus("sent")
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-ink-900 p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent-dim text-accent-soft">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12.5l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-4 text-[17px] font-medium text-neutral-900">Enquiry received</p>
        <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-fog">
          A copy is on its way to <span className="text-accent">{form.email}</span>. Our export desk replies
          within 24 hours on working days.
        </p>
      </div>
    )
  }

  const field =
    "w-full rounded-xl border border-line bg-ink-900 px-4 py-3 text-[14px] text-neutral-900 placeholder:text-fog-dim transition-colors focus:border-accent/60 focus:outline-none"

  return (
    <form onSubmit={submit} className="copy-allowed rounded-2xl border border-line bg-ink-900/60 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <input required className={field} placeholder="Full name" value={form.name} onChange={set("name")} autoComplete="name" />
        <input required type="email" className={field} placeholder="Work email" value={form.email} onChange={set("email")} autoComplete="email" />
        <select className={field} value={form.product} onChange={set("product")} aria-label="Product of interest">
          {["General enquiry", "High Pressure Hydraulic Hose", "Camlock Quick Couplings", "High Pressure Ball Valves", "Hose Assemblies & End Fittings", "Instrumentation Needle Valves", "Suction & Discharge Hoses"].map((p) => (
            <option key={p} className="bg-ink-900">{p}</option>
          ))}
        </select>
        <input className={field} placeholder="Quantity / sizes (optional)" value={form.qty} onChange={set("qty")} />
        <textarea
          className={`${field} sm:col-span-2 min-h-[110px] resize-y`}
          placeholder="Tell us about the application: pressure, fluid, temperature, standards…"
          value={form.message}
          onChange={set("message")}
        />
        <div className="flex items-center gap-3 sm:col-span-2">
          <label className="flex items-center gap-3 rounded-xl border border-line bg-ink-900 px-4 py-3 text-[14px] text-neutral-900">
            <span className="font-mono text-fog">{a} + {b} =</span>
            <input
              required
              inputMode="numeric"
              className="w-16 bg-transparent text-neutral-900 outline-none"
              value={form.captcha}
              onChange={set("captcha")}
              aria-label={`Captcha: what is ${a} plus ${b}?`}
            />
          </label>
          <p className="text-[12px] leading-snug text-fog-dim">
            Quick check that you're human. A copy of this enquiry is emailed to you too.
          </p>
        </div>
      </div>
      {status === "error" && (
        <p className="mt-3 text-[13px] text-red-400">Captcha answer isn't right, please try again.</p>
      )}
      <button className="mt-5 w-full rounded-full bg-neutral-900 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-accent sm:w-auto sm:px-10">
        Send enquiry
      </button>
    </form>
  )
}
