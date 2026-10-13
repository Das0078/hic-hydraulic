import React, { Suspense, lazy, useCallback, useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { VoicePlayer, WhatsAppFloat, ToastContext } from "./components/Common"
import Home from "./pages/Home"
import Products from "./pages/Products"
import { VOICE_BRIEFS } from "./data/siteData"

// Catalogue pulls in pdf.js + page-flip (~500KB), keep it out of first paint
const Catalogue = lazy(() => import("./pages/Catalogue"))

gsap.registerPlugin(ScrollTrigger)

/* Client req #4: block copy/drag globally; surfaces marked .copy-allowed
   (forms, footer contact, newsletter) re-enable selection. */
function useCopyProtection() {
  useEffect(() => {
    const block = (e) => {
      if (e.target.closest?.(".copy-allowed")) return
      e.preventDefault()
    }
    document.addEventListener("copy", block)
    document.addEventListener("cut", block)
    document.addEventListener("dragstart", block)
    document.addEventListener("contextmenu", block)
    return () => {
      document.removeEventListener("copy", block)
      document.removeEventListener("cut", block)
      document.removeEventListener("dragstart", block)
      document.removeEventListener("contextmenu", block)
    }
  }, [])
}

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

function Shell() {
  const { pathname } = useLocation()
  const [toast, setToast] = useState("")

  useCopyProtection()

  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3400)
  }, [])

  const briefKey = pathname.startsWith("/products") ? "products" : pathname.startsWith("/catalogue") ? "catalogue" : "home"

  return (
    <ToastContext.Provider value={showToast}>
      <div className="copy-protected relative min-h-screen">
        <Navbar />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/catalogue"
              element={
                <Suspense
                  fallback={
                    <div className="grid min-h-[60vh] place-items-center pt-16">
                      <span className="h-7 w-7 animate-spin rounded-full border-2 border-ink-700 border-t-accent" aria-label="Loading catalogue" />
                    </div>
                  }
                >
                  <Catalogue />
                </Suspense>
              }
            />
          </Routes>
        </main>
        <Footer />
        <VoicePlayer brief={VOICE_BRIEFS[briefKey]} pageKey={briefKey} />
        <WhatsAppFloat />
        {toast && (
          <div
            role="status"
            className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-line-strong bg-ink-800 px-5 py-3 text-[13.5px] text-neutral-900 shadow-2xl"
          >
            {toast}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Shell />
    </BrowserRouter>
  )
}
