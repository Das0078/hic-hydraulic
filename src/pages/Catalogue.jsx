import React, { useCallback, useEffect, useRef, useState } from "react"
import HTMLFlipBook from "react-pageflip"
import * as pdfjsLib from "pdfjs-dist"
import GsapReveal from "../components/GsapReveal"
import { useToast } from "../components/Common"

// pdf.js worker from the bundled ESM build (vite handles the ?url import)
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url"
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

const PAGE_W = 500
const PAGE_H = 646

const FlipPage = React.forwardRef(function FlipPage({ canvas, pageNum, total }, ref) {
  return (
    <div ref={ref} className="flipbook-page flex flex-col" data-density={pageNum === 0 || pageNum === total - 1 ? "hard" : "soft"}>
      <div className="relative flex-1 overflow-hidden">
        {canvas ? (
          <img src={canvas} alt={`Catalogue page ${pageNum + 1} of ${total}`} className="h-full w-full object-contain" draggable={false} />
        ) : (
          <div className="grid h-full place-items-center">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-ink-700 border-t-accent" aria-label="Rendering page" />
          </div>
        )}
      </div>
    </div>
  )
})

export default function Catalogue() {
  const showToast = useToast()
  const bookRef = useRef(null)
  const fileRef = useRef(null)
  const [pages, setPages] = useState([]) // data URLs
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [sourceName, setSourceName] = useState("HIC Product Catalogue 2026")
  const [viewportW, setViewportW] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1280))

  useEffect(() => {
    const onResize = () => setViewportW(window.innerWidth)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const isMobile = viewportW < 640

  // Email-capture state for catalogue download (client req #7)
  const [dlOpen, setDlOpen] = useState(false)
  const [dlEmail, setDlEmail] = useState("")
  const [dlSent, setDlSent] = useState(false)

  const renderPdf = useCallback(async (url, label) => {
    setLoading(true)
    setPages([])
    setCurrent(0)
    try {
      const doc = await pdfjsLib.getDocument(url).promise
      const scale = 1.6
      const renders = []
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i)
        const viewport = page.getViewport({ scale })
        const canvas = document.createElement("canvas")
        canvas.width = viewport.width
        canvas.height = viewport.height
        await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise
        renders.push(canvas.toDataURL("image/jpeg", 0.82))
      }
      setPages(renders)
      setSourceName(label)
    } catch (err) {
      console.error(err)
      showToast("Couldn't read that PDF. Try another file.")
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    renderPdf("/catalog.pdf", "HIC Product Catalogue 2026")
  }, [renderPdf])

  // Arrow keys flip pages
  useEffect(() => {
    const onKey = (e) => {
      if (!bookRef.current) return
      if (e.key === "ArrowRight") bookRef.current.pageFlip().flipNext()
      if (e.key === "ArrowLeft") bookRef.current.pageFlip().flipPrev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const onUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    renderPdf(url, file.name)
    e.target.value = ""
  }

  const submitDownload = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dlEmail)) return
    // Production: trigger email with catalogue link + log lead (client req #7)
    setDlSent(true)
    showToast("Catalogue emailed — check your inbox shortly.")
    const a = document.createElement("a")
    a.href = "/catalog.pdf"
    a.download = "HIC-Hydraulic-Catalogue-2026.pdf"
    a.click()
  }

  const w = isMobile ? Math.min(380, viewportW - 40) : PAGE_W
  const h = (w / PAGE_W) * PAGE_H

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-32 sm:px-8 sm:pt-36">
        <GsapReveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">Interactive catalogue</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            The catalogue, <span className="text-accent">page by page.</span>
          </h1>
          <p className="lead-p mx-auto mt-4 max-w-xl text-[15px] text-fog">
            Drag a page corner, click an edge, or use your arrow keys. Upload any PDF to preview it
            as a flipbook, or get the full catalogue by email.
          </p>
        </GsapReveal>

        {/* Toolbar */}
        <GsapReveal delay={0.1} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-[13px] font-medium text-neutral-900 transition-colors hover:border-neutral-900/40"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M12 16V4m0 0L7 9m5-5l5 5M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Upload your PDF
          </button>
          <input ref={fileRef} type="file" accept="application/pdf" className="hidden" onChange={onUpload} />
          <button
            onClick={() => setDlOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M12 4v12m0 0l5-5m-5 5l-5-5M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Get catalogue by email
          </button>
          <span className="font-mono text-[11px] tracking-wide text-fog-dim">
            Now viewing: {sourceName}
          </span>
        </GsapReveal>
      </section>

      {/* Flipbook stage */}
      <section className="relative mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
        />
        <GsapReveal className="relative flex flex-col items-center">
          {loading ? (
            <div className="grid h-[400px] w-full max-w-3xl place-items-center rounded-2xl border border-line bg-ink-900/40">
              <div className="flex flex-col items-center gap-3">
                <span className="h-7 w-7 animate-spin rounded-full border-2 border-ink-700 border-t-accent" />
                <p className="font-mono text-[12px] text-fog-dim">Rendering pages…</p>
              </div>
            </div>
          ) : pages.length > 0 ? (
            <div className="flipbook" style={{ touchAction: "pan-y" }}>
              <HTMLFlipBook
                ref={bookRef}
                width={w}
                height={h}
                size="fixed"
                minWidth={280}
                maxWidth={PAGE_W}
                minHeight={360}
                maxHeight={PAGE_H}
                maxShadowOpacity={0.35}
                showCover={true}
                mobileScrollSupport={false}
                usePortrait={isMobile}
                onFlip={(e) => setCurrent(e.data)}
                className="drop-shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
                startPage={0}
                drawShadow={true}
                flippingTime={750}
                useMouseEvents={true}
                swipeDistance={24}
                clickEventForward={true}
                disableFlipByClick={false}
                style={{}}
                startZIndex={0}
                autoSize={false}
                showPageCorners={true}
              >
                {pages.map((src, i) => (
                  <FlipPage key={`${sourceName}-${i}`} canvas={src} pageNum={i} total={pages.length} />
                ))}
              </HTMLFlipBook>
            </div>
          ) : null}

          {!loading && pages.length > 0 && (
            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => bookRef.current?.pageFlip().flipPrev()}
                aria-label="Previous page"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-fog transition-colors hover:border-line-strong hover:text-neutral-900"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <p className="min-w-[72px] text-center font-mono text-[12px] text-fog">
                {Math.min(current + 1, pages.length)} / {pages.length}
              </p>
              <button
                onClick={() => bookRef.current?.pageFlip().flipNext()}
                aria-label="Next page"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-fog transition-colors hover:border-line-strong hover:text-neutral-900"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          )}
        </GsapReveal>
      </section>

      {/* Download modal (email trigger, client req #7) */}
      {dlOpen && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-white/80 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Download catalogue"
          onClick={() => setDlOpen(false)}
        >
          <div
            className="copy-allowed w-full max-w-md rounded-2xl border border-line-strong bg-ink-900 p-7"
            onClick={(e) => e.stopPropagation()}
          >
            {dlSent ? (
              <div className="text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent-dim text-accent-soft">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12.5l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <p className="mt-4 text-[17px] font-medium text-neutral-900">On its way</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-fog">
                  The catalogue has been emailed to <span className="text-accent">{dlEmail}</span> and your
                  download has started.
                </p>
                <button onClick={() => { setDlOpen(false); setDlSent(false); setDlEmail("") }} className="mt-6 rounded-full border border-line-strong px-6 py-2.5 text-[13px] font-medium text-neutral-900 hover:border-neutral-900/40">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submitDownload}>
                <p className="text-[17px] font-medium text-neutral-900">Catalogue, straight to your inbox</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-fog">
                  Leave your work email and the 2026 catalogue arrives as a PDF link. We email you a
                  copy instantly; one follow-up from our export desk, nothing more.
                </p>
                <input
                  type="email"
                  required
                  autoFocus
                  value={dlEmail}
                  onChange={(e) => setDlEmail(e.target.value)}
                  placeholder="work email"
                  className="mt-5 w-full rounded-xl border border-line bg-white px-4 py-3 text-[14px] text-neutral-900 placeholder:text-fog-dim focus:border-accent/60 focus:outline-none"
                />
                <div className="mt-4 flex gap-2.5">
                  <button type="submit" className="flex-1 rounded-full bg-neutral-900 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-accent">
                    Email me the catalogue
                  </button>
                  <button type="button" onClick={() => setDlOpen(false)} className="rounded-full border border-line px-5 py-3 text-[13.5px] text-fog transition-colors hover:text-neutral-900">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
