// Generates public/catalog.pdf, a 12-page HIC Hydraulic product catalogue
// used by the flipbook demo. Run: npm run gen:catalog
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
mkdirSync(join(root, 'public'), { recursive: true })

const INK = rgb(0.055, 0.055, 0.06)
const BLUE = rgb(0.2, 0.36, 0.9)
const GREY = rgb(0.42, 0.44, 0.48)
const CREAM = rgb(0.98, 0.96, 0.92)

const PRODUCTS = [
  ['High Pressure Hydraulic Hose', 'SAE 100 R1 to R15, EN 853 / EN 856 wire braided and spiral hoses to 640 bar.', ['Size: 3/16 in to 2 in', 'Impulse: 1,000,000 cycles (R15)', 'Temp: -40 C to +100 C']],
  ['Camlock Quick Couplings', 'SS 316, brass, aluminium and PP cam and groove couplings, types A to F with dust caps and plugs.', ['Size: 1/2 in to 6 in', 'Std: MIL-C-27487 / A-A-59326', 'Gaskets: NBR, EPDM, Viton']],
  ['High Pressure Ball Valves', '2-way and 3-way hydraulic ball valves in carbon steel and SS 316.', ['Size: 1/4 in to 2 in', 'Rating: up to 500 bar', 'Seats: POM / PTFE']],
  ['Hose Assemblies and End Fittings', 'Crimped, hydrostatically tested and certified assemblies built to drawing.', ['Test: 1.5x working pressure', 'Certs: EN 10204 3.1 on request', 'Private label available']],
  ['Instrumentation Needle Valves', 'Precision flow control valves for instrumentation and sampling lines.', ['Rating: 6000 PSI', 'Material: SS 316', 'Threads: NPT / BSP']],
  ['Suction and Discharge Hoses', 'Oil, water, slurry and dock hoses for petroleum transfer and dredging.', ['Size: 2 in to 12 in', 'Rating: 10 to 20 bar', 'Flanged or camlock ends']],
  ['Steam and Hot Water Hose', 'EPDM steam hose for saturated steam service to 17 bar / 208 C.', ['Size: 1/2 in to 2 in', 'Std: BS 5342', 'Cover: pin-pricked EPDM']],
  ['UHP Waterblast Assemblies', 'Ultra high pressure spiral assemblies for waterjetting and hydro-demolition.', ['Rating: to 1100 bar', 'Fittings: M-type, NPT', 'Safety covers available']],
  ['Check and Flow Control Valves', 'Non-return, swing check and flow control valves for hydraulic circuits.', ['Cracking: 0.5 bar std', 'Material: CS / SS 316', 'Threads: BSP / NPT']],
  ['Tank Truck and Dock Hoses', 'Composite and rubber hoses for road tanker bottom loading and bunkering.', ['Std: EN 13765 / BS 5842', 'Ends: flanged, camlock', 'Certificates per batch']],
]

const doc = await PDFDocument.create()
const bold = await doc.embedFont(StandardFonts.HelveticaBold)
const reg = await doc.embedFont(StandardFonts.Helvetica)
const oblique = await doc.embedFont(StandardFonts.HelveticaOblique)
const W = 620
const H = 800

const wrap = (text, font, size, maxWidth) => {
  const words = text.split(' ')
  const lines = []
  let line = ''
  for (const w of words) {
    const t = line ? line + ' ' + w : w
    if (font.widthOfTextAtSize(t, size) > maxWidth && line) { lines.push(line); line = w } else line = t
  }
  if (line) lines.push(line)
  return lines
}

const footer = (page, n) => {
  page.drawText(`hichydraulic.com`, { x: 40, y: 30, size: 8, font: reg, color: GREY })
  page.drawText(`${n}`, { x: W - 60, y: 30, size: 8, font: reg, color: GREY })
}

// Cover
{
  const p = doc.addPage([W, H])
  p.drawRectangle({ x: 0, y: 0, width: W, height: H, color: INK })
  p.drawRectangle({ x: 40, y: H - 130, width: 46, height: 4, color: BLUE })
  p.drawText('HIC HYDRAULIC', { x: 40, y: H - 110, size: 30, font: bold, color: CREAM })
  p.drawText('Product Catalogue 2026', { x: 40, y: H - 175, size: 15, font: reg, color: rgb(0.7, 0.72, 0.78) })
  p.drawText('High pressure hoses, couplings and valves.', { x: 40, y: H - 215, size: 11, font: oblique, color: rgb(0.55, 0.57, 0.62) })
  p.drawText('Manufactured in India. Exported to 33 countries.', { x: 40, y: H - 232, size: 11, font: oblique, color: rgb(0.55, 0.57, 0.62) })
  p.drawText('universal@hic-india.com   +91 88266 79660', { x: 40, y: 40, size: 9, font: reg, color: rgb(0.55, 0.57, 0.62) })
}

// Intro
{
  const p = doc.addPage([W, H])
  p.drawText('About HIC Hydraulic', { x: 40, y: H - 80, size: 20, font: bold, color: INK })
  const intro = 'Since 1988, HIC Hydraulic (HIC International Co Inc, New Delhi) has manufactured high pressure hydraulic hose, camlock quick couplings, ball valves and hose assemblies for customers on five continents. Every coil is batch-tested on our in-house impulse rig, traceable to compound batch and mandrel run, and exported with certificates of conformance, burst and impulse test reports, and EN 10204 3.1 material certificates on request. This catalogue summarises the standard range; custom constructions and private labelling are available on request.'
  let y = H - 115
  for (const line of wrap(intro, reg, 10.5, W - 80)) { p.drawText(line, { x: 40, y, size: 10.5, font: reg, color: rgb(0.2, 0.2, 0.22) }); y -= 16 }
  p.drawText('Contents', { x: 40, y: y - 30, size: 13, font: bold, color: INK })
  y -= 55
  PRODUCTS.forEach(([t], i) => { p.drawText(`${String(i + 1).padStart(2, '0')}   ${t}`, { x: 40, y, size: 10, font: reg, color: rgb(0.2, 0.2, 0.22) }); y -= 17 })
  footer(p, 2)
}

// Product pages
PRODUCTS.forEach(([title, desc, specs], i) => {
  const p = doc.addPage([W, H])
  p.drawRectangle({ x: 40, y: H - 96, width: 30, height: 3, color: BLUE })
  p.drawText(`0${i + 1}`, { x: 40, y: H - 70, size: 11, font: bold, color: BLUE })
  let y = H - 105
  for (const line of wrap(title, bold, 19, W - 80)) { p.drawText(line, { x: 40, y, size: 19, font: bold, color: INK }); y -= 25 }
  y -= 8
  for (const line of wrap(desc, reg, 10.5, W - 80)) { p.drawText(line, { x: 40, y, size: 10.5, font: reg, color: rgb(0.25, 0.25, 0.28) }); y -= 16 }
  y -= 20
  p.drawText('Key specifications', { x: 40, y, size: 11, font: bold, color: INK }); y -= 22
  for (const s of specs) { p.drawText(`•  ${s}`, { x: 44, y, size: 10, font: reg, color: rgb(0.3, 0.3, 0.33) }); y -= 17 }
  // image placeholder band
  p.drawRectangle({ x: 40, y: 90, width: W - 80, height: 190, color: rgb(0.93, 0.93, 0.94), borderColor: rgb(0.8, 0.8, 0.82), borderWidth: 1 })
  p.drawText('[ Product photograph ]', { x: W / 2 - 60, y: 180, size: 10, font: oblique, color: GREY })
  footer(p, i + 3)
})

doc.setTitle('HIC Hydraulic Product Catalogue 2026')
doc.setProducer('HIC Hydraulic')
const bytes = await doc.save()
writeFileSync(join(root, 'public', 'catalog.pdf'), bytes)
console.log(`Wrote public/catalog.pdf (${(bytes.length / 1024).toFixed(1)} KB, ${doc.getPageCount()} pages)`)
