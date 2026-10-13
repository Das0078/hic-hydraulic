import React, { useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import GsapReveal from "../components/GsapReveal"
import { Stat } from "../components/Common"
import { FaqAccordion, Translator } from "../components/Widgets"
import ShapeGrid from "../components/ShapeGrid"
import Grainient from "../components/Grainient"
import {
  IMAGES, STATS, EXPORT_COUNTRIES, PRODUCTS, INDUSTRIES, FAQ_HOME, TESTIMONIALS,
} from "../data/siteData"

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0.2])

  return (
    <section ref={ref} className="relative overflow-hidden pt-16">
      {/* ShapeGrid canvas behind the hero content */}
      <div className="absolute inset-0 opacity-70" aria-hidden="true">
        <ShapeGrid
          direction="diagonal"
          speed={0.35}
          borderColor="rgba(28,25,18,0.08)"
          squareSize={44}
          hoverFillColor="rgba(29,78,216,0.12)"
          shape="square"
          hoverTrailAmount={7}
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
        <motion.div style={{ opacity: fade }} className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-900/70 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-fog backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Hydraulic hose · couplings · valves
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-[42px] font-semibold leading-[1.04] tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl"
          >
            Pressure you can
            <br />
            specify. <span className="text-accent">Performance</span> you
            <br className="hidden sm:block" /> can prove.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="lead-p mt-6 max-w-xl text-[16px] text-fog md:text-lg"
          >
            Since 1988, HIC Hydraulic has manufactured high-pressure hydraulic hose, camlock
            couplings and valves in New Delhi,{" "}
            <span className="font-medium text-accent">exported to 33 countries</span> with test
            certificates that arrive before the questions do.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-accent"
            >
              Explore the range
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <path d="M2 12L12 2M4 2h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-[14.5px] font-medium text-neutral-900 transition-colors hover:border-neutral-900/40"
            >
              Open the flipbook catalogue
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative mt-14 overflow-hidden rounded-2xl border border-line"
        >
          <motion.img
            src={IMAGES.hero}
            alt="Engineer inspecting high pressure hydraulic hose assembly on industrial equipment"
            className="h-[300px] w-full object-cover sm:h-[440px]"
            style={{ y: imgY, scale: 1.12 }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-200">SAE 100 R15 · EN 856 4SH</p>
              <p className="mt-1.5 max-w-md text-[15px] font-medium text-white">
                Spiral hose type-tested to one million impulse cycles at 120% of rated pressure.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-900/15 bg-white/70 px-4 py-3 backdrop-blur-md">
              <p className="font-mono text-[22px] font-medium text-neutral-900">640<span className="text-accent"> bar</span></p>
              <p className="text-[11px] text-fog">max working pressure</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y border-line bg-ink-900/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-12 sm:px-8 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <GsapReveal key={s.label} delay={i * 0.06}>
            <Stat value={s.value} suffix={s.suffix} label={s.label} delay={i * 120} />
          </GsapReveal>
        ))}
      </div>
    </section>
  )
}

function ExportMarquee() {
  const doubled = [...EXPORT_COUNTRIES, ...EXPORT_COUNTRIES]
  return (
    <section className="overflow-hidden py-12" aria-label="Export destinations">
      <p className="mx-auto mb-6 max-w-6xl px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-fog-dim sm:px-8">
        Exporting to 33 countries
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent" aria-hidden="true" />
        <div className="animate-marquee flex w-max gap-3">
          {doubled.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="whitespace-nowrap px-4.5 py-2 text-[16px] text-fog"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductGrid() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <GsapReveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">The range</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-neutral-900 sm:text-[34px]">
              Six product families, <span className="text-accent">one quality system</span>
            </h2>
          </div>
          <Link to="/products" className="group inline-flex items-center gap-2 text-[14px] font-medium text-fog transition-colors hover:text-neutral-900">
            Full product detail
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <path d="M2 12L12 2M4 2h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </GsapReveal>
      <GsapReveal stagger={0.07} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <Link
            key={p.id}
            to={`/products#${p.id}`}
            className="group relative overflow-hidden rounded-2xl border border-line bg-ink-900/50 transition-colors hover:border-line-strong"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={p.image}
                alt={`${p.title} manufactured by HIC Hydraulic India`}
                loading="lazy"
                className="h-full w-full object-cover opacity-80 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/35 to-transparent" aria-hidden="true" />
              <span className="absolute left-4 top-4 rounded-md bg-neutral-900/85 px-2 py-1 font-mono text-[10.5px] tracking-[0.14em] text-white backdrop-blur">
                {p.code}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-[16.5px] font-medium tracking-tight text-neutral-900">{p.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-fog">{p.short}</p>
              <p className="mt-3 font-mono text-[11px] tracking-wide text-fog-dim">{p.spec}</p>
            </div>
          </Link>
        ))}
      </GsapReveal>
    </section>
  )
}

function Industries() {
  return (
    <section className="border-y border-line bg-ink-900/40 py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <GsapReveal className="max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">Where our hose works</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-neutral-900 sm:text-[34px]">
            Built for sites that <span className="text-accent">don't forgive failure</span>
          </h2>
        </GsapReveal>
        <GsapReveal stagger={0.08} className="mt-10 grid gap-4 sm:grid-cols-2">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.code}
              className="group relative flex min-h-[150px] items-end overflow-hidden rounded-2xl border border-line"
            >
              <img
                src={ind.image}
                alt={`${ind.name} industry hydraulic hose applications`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" aria-hidden="true" />
              <div className="relative flex w-full items-end justify-between gap-4 p-5">
                <div>
                  <p className="text-[16.5px] font-medium text-white">{ind.name}</p>
                  <p className="mt-1 text-[13px] text-white/70">{ind.desc}</p>
                </div>
                <span className="rounded-md border border-white/25 bg-black/40 px-2.5 py-1.5 font-mono text-[10.5px] tracking-[0.14em] text-amber-100 backdrop-blur">
                  {ind.code}
                </span>
              </div>
            </div>
          ))}
        </GsapReveal>
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <GsapReveal className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">Buyer feedback</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-neutral-900 sm:text-[34px]">
            Rated <span className="text-accent">4.8 / 5</span> by trade buyers
          </h2>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fog-dim">
          Google reviews · live feed in production
        </p>
      </GsapReveal>
      <GsapReveal stagger={0.08} className="mt-10 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <figure key={i} className="flex flex-col rounded-2xl border border-line bg-ink-900/50 p-6">
            <div className="flex gap-1 text-accent" aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, s) => (
                <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s < t.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" strokeLinejoin="round" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-fog">"{t.quote}"</blockquote>
            <figcaption className="mt-5 border-t border-line pt-4">
              <p className="text-[13.5px] font-medium text-neutral-900">{t.name}</p>
              <p className="text-[12px] text-fog-dim">{t.org}</p>
            </figcaption>
          </figure>
        ))}
      </GsapReveal>
    </section>
  )
}

function HomeFaq() {
  return (
    <section className="border-t border-line bg-ink-900/40 py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <GsapReveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">Questions, answered</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-neutral-900 sm:text-[34px]">
              The things buyers ask <span className="text-accent">before the first order</span>
            </h2>
            <p className="lead-p mt-4 text-[14.5px] text-fog">
              Every answer expands in place, so a page holding four thousand words never asks you
              to scroll through all of them.
            </p>
            <div className="mt-8">
              <Translator />
            </div>
          </GsapReveal>
          <GsapReveal>
            <FaqAccordion items={FAQ_HOME} idPrefix="home-faq" />
          </GsapReveal>
        </div>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="relative overflow-hidden">
      {/* Slow Grainient mesh behind the closing band, soft blue on paper */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60">
        <Grainient
          color1="#fafaf8"
          color2="#dbe6ff"
          color3="#9db8f5"
          lightMode={true}
          timeSpeed={0.5}
          colorBalance={0.1}
          warpStrength={0.8}
          warpFrequency={3.2}
          warpSpeed={0.9}
          warpAmplitude={36.0}
          blendAngle={0.0}
          blendSoftness={0.1}
          rotationAmount={260.0}
          noiseScale={1.6}
          grainAmount={0.06}
          grainScale={2.2}
          grainAnimated={false}
        />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <GsapReveal className="relative overflow-hidden rounded-3xl border border-line-strong bg-white/70 p-8 backdrop-blur-md sm:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
                Send a drawing. Get a crimped, tested assembly
                <span className="text-accent"> back on schedule.</span>
              </h2>
              <p className="lead-p mt-4 max-w-lg text-[15px] text-fog">
                Photograph the hose you need replaced, or attach the spec sheet. Our export desk
                replies within 24 hours with datasheet, price and a realistic lead time.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a
                href="/products#enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-accent"
              >
                Request a quote
              </a>
              <Link
                to="/catalogue"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-[14.5px] font-medium text-neutral-900 transition-colors hover:border-neutral-900/40"
              >
                Flip through the catalogue
              </Link>
            </div>
          </div>
        </GsapReveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ExportMarquee />
      <ProductGrid />
      <Industries />
      <Reviews />
      <HomeFaq />
      <Cta />
    </>
  )
}
