# HIC Hydraulic — redesign POC

Premium dark redesign concept for hichydraulic.com, built to the client's brief:
long-form content that never forces scrolling (H2 FAQ accordions), an interactive
PDF flipbook catalogue, voice intro, WhatsApp chat, enquiry form with captcha and
buyer copy, email-triggered catalogue download, translator UI, copy protection,
and JSON-LD schema for AI/GEO.

## Stack

- React 19 + Vite 6
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- GSAP ScrollTrigger + Framer Motion
- ogl (ShapeGrid hero canvas + Grainient mesh)
- react-pageflip + pdfjs-dist (flipbook), pdf-lib (catalogue generator)

## Commands

```bash
npm install
npm run dev          # dev server
npm run build        # production build
npm run preview      # preview the build
npm run gen:catalog  # regenerate public/catalog.pdf (demo catalogue)
```

## Pages

| Route        | What it demonstrates |
|--------------|----------------------|
| `/`          | ShapeGrid hero, count-up stats, 33-country export marquee, product grid, industries, reviews, FAQ accordion, Grainient CTA |
| `/products`  | Sticky editorial split-column: ~1,600 words hidden behind click-to-open H2 sections, spec table, enquiry form with captcha |
| `/catalogue` | PDF flipbook (drag corners / arrow keys), upload-your-own-PDF preview, email-capture download |

## Production wiring notes (marked in code)

- Enquiry + newsletter forms → Sendgrid/Mailchimp endpoints (req #5, #6)
- Catalogue download → trigger email + lead log (req #7)
- Translator select → Google Translate widget or paid API (req #15)
- Reviews section → Google Places API live feed (req #13)
- LinkedIn feed embed slot (req #14)
- Voice player uses SpeechSynthesis; swap for recorded audio files if preferred (req #3)
