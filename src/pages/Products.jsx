import React, { useEffect } from "react"
import GsapReveal from "../components/GsapReveal"
import { FaqAccordion, EnquiryForm, Translator } from "../components/Widgets"
import { IMAGES, PRODUCTS, PRODUCT_LONGFORM } from "../data/siteData"

/* Sticky editorial split-column layout (client req #1b):
   left column stays pinned with navigation and CTAs while the right column
   carries 2500+ words of content as click-to-expand H2 sections. */

function StickyRail({ words }) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">Product deep-dive · 01</p>
      <p className="mt-3 font-mono text-[12px] leading-relaxed text-fog-dim">
        {words.toLocaleString()} words · 6 sections
        <br />
        ~{Math.ceil(words / 200)} min full read
      </p>
      <nav className="mt-8 hidden lg:block" aria-label="On this page">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog-dim">On this page</p>
        <ul className="mt-3 space-y-2 border-l border-line">
          {PRODUCT_LONGFORM.sections.map((s, i) => (
            <li key={i}>
              <span className="-ml-px block border-l-2 border-transparent py-0.5 pl-4 text-[13px] leading-snug text-fog transition-colors hover:border-accent hover:text-neutral-900">
                {s.h2}
              </span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8 space-y-3">
        <a
          href="#enquiry"
          className="block rounded-full bg-neutral-900 px-5 py-3 text-center text-[13.5px] font-semibold text-white transition-colors hover:bg-accent"
        >
          Enquire about this product
        </a>
        <a
          href="/catalogue"
          className="block rounded-full border border-line-strong px-5 py-3 text-center text-[13.5px] font-medium text-neutral-900 transition-colors hover:border-neutral-900/40"
        >
          View in catalogue
        </a>
        <div className="pt-2">
          <Translator />
        </div>
      </div>
    </aside>
  )
}

function RangeStrip() {
  return (
    <div id={PRODUCTS[0].id} className="scroll-mt-24">
      <GsapReveal stagger={0.06} className="grid gap-3 sm:grid-cols-2">
        {PRODUCTS.map((p, i) => (
          <div
            key={p.id}
            id={p.id}
            className={`scroll-mt-24 rounded-2xl border p-5 transition-colors ${
              i === 0
                ? "border-accent/40 bg-accent-dim/60"
                : "border-line bg-ink-900/50 hover:border-line-strong"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-[15px] font-medium tracking-tight text-neutral-900">{p.title}</p>
              <span className="rounded-md bg-white/70 px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-accent">
                {p.code}
              </span>
            </div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-fog">{p.short}</p>
            <p className="mt-2.5 font-mono text-[10.5px] tracking-wide text-fog-dim">{p.spec}</p>
          </div>
        ))}
      </GsapReveal>
    </div>
  )
}

function SpecTable() {
  const rows = [
    ["Standard", "SAE 100 R1AT – R15 · EN 853 1SN/2SN · EN 856 4SP/4SH"],
    ["Size range", '3/16″ to 2″ (DN5 to DN51)'],
    ["Working pressure", "88 – 640 bar, size and construction dependent"],
    ["Temperature", "-40 °C to +100 °C continuous, +120 °C intermittent"],
    ["Reinforcement", "1–2 wire braid · 4–6 wire spiral, high-tensile brass-coated steel"],
    ["Tube", "Oil-resistant NBR · specialty compounds for phosphate-ester"],
    ["Cover", "Weather, ozone and abrasion resistant · UHMW option"],
    ["Impulse test", "1,000,000 cycles @ 120% WP (R15 spiral)"],
    ["Documentation", "CoC, burst & impulse reports · EN 10204 3.1 on request"],
  ]
  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <table className="w-full text-left text-[13px]">
        <tbody className="divide-y divide-line">
          {rows.map(([k, v]) => (
            <tr key={k} className="bg-ink-900/40 transition-colors hover:bg-ink-900/70">
              <th scope="row" className="w-[38%] px-4 py-3 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-fog-dim sm:px-5">
                {k}
              </th>
              <td className="px-4 py-3 text-fog sm:px-5">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Products() {
  const wordCount = PRODUCT_LONGFORM.sections.reduce(
    (n, s) => n + s.body.join(" ").split(/\s+/).length,
    PRODUCT_LONGFORM.lead.split(/\s+/).length
  )

  // Scroll to hash target after mount (deep links from home grid)
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 150)
    }
  }, [])

  return (
    <>
      {/* Editorial header: H1 + lead visible, everything else opens on click */}
      <section className="relative overflow-hidden pt-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url(${IMAGES.hoses})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-8 sm:pt-24">
          <GsapReveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog-dim">
              Products / Hydraulic hose
            </p>
            <h1 className="mt-5 max-w-3xl text-[34px] font-semibold leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl">
              High Pressure Hydraulic Hose, <span className="text-accent">engineered in Delhi,</span> trusted
              on five continents
            </h1>
            <p className="lead-p mt-6 max-w-2xl text-[15.5px] text-fog md:text-[17px]">
              {PRODUCT_LONGFORM.lead}
            </p>
          </GsapReveal>
        </div>
      </section>

      {/* Split column: sticky rail + expandable long-form */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          <StickyRail words={wordCount} />
          <div>
            <RangeStrip />
            <GsapReveal className="mt-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog-dim">
                The full story · tap any heading
              </p>
              <div className="mt-5">
                <FaqAccordion items={PRODUCT_LONGFORM.sections} idPrefix="prod" />
              </div>
            </GsapReveal>
            <GsapReveal className="mt-12">
              <h2 className="text-2xl font-medium tracking-tight text-neutral-900 sm:text-[26px]">
                Specification <span className="text-accent">at a glance</span>
              </h2>
              <div className="mt-5">
                <SpecTable />
              </div>
            </GsapReveal>
            <GsapReveal className="mt-12">
              <div className="relative overflow-hidden rounded-2xl border border-line">
                <img
                  src={IMAGES.assembly}
                  alt="Crimping hydraulic hose end fittings on CNC controlled press at HIC factory"
                  loading="lazy"
                  className="h-64 w-full object-cover opacity-75 sm:h-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
                <p className="absolute bottom-5 left-5 max-w-sm text-[13.5px] font-medium text-white sm:bottom-6 sm:left-6">
                  Every assembly is crimped to a validated crimp chart and hydrostatically tested
                  to 1.5× working pressure before dispatch.
                </p>
              </div>
            </GsapReveal>
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="scroll-mt-24 border-t border-line bg-ink-900/40 py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <GsapReveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">Enquiry</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-neutral-900 sm:text-[34px]">
                Tell us the duty. <span className="text-accent">We'll spec the hose.</span>
              </h2>
              <p className="lead-p mt-4 max-w-md text-[14.5px] text-fog">
                Working pressure, fluid, temperature and standard, that is usually enough for a
                quotation within 24 hours. A copy of your enquiry is emailed to you automatically.
              </p>
              <div className="mt-6 space-y-2 text-[13.5px] text-fog">
                <p>Direct: <a className="text-neutral-900 underline decoration-line-strong underline-offset-4 hover:decoration-accent" href="mailto:universal@hic-india.com">universal@hic-india.com</a></p>
                <p>Phone / WhatsApp: <a className="text-neutral-900 underline decoration-line-strong underline-offset-4 hover:decoration-accent" href="tel:+918826679660">+91 88266 79660</a></p>
              </div>
            </GsapReveal>
            <GsapReveal delay={0.1}>
              <EnquiryForm product="High Pressure Hydraulic Hose" />
            </GsapReveal>
          </div>
        </div>
      </section>
    </>
  )
}
