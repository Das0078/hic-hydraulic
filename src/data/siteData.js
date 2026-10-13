// Content model for HIC Hydraulic redesign POC.
// Long-form copy is structured as H2-question blocks (client req #10/#11):
// only the H1 + lead paragraph render expanded, each H2 answer opens on click.

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80",
  factory: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=80",
  hoses: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
  assembly: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=80",
  engineering: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
  lab: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
  valves: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80",
  oilrig: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
  marine: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=80",
  mining: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80",
}

export const STATS = [
  { value: 37, suffix: "+", label: "Years manufacturing" },
  { value: 33, suffix: "", label: "Export countries" },
  { value: 640, suffix: " bar", label: "Max working pressure" },
  { value: 24, suffix: "h", label: "Quotation turnaround" },
]

export const EXPORT_COUNTRIES = [
  "USA", "UAE", "Saudi Arabia", "Germany", "Russia", "Brazil", "Nigeria",
  "Qatar", "Kuwait", "Oman", "Norway", "Canada", "Malaysia", "Indonesia",
  "Egypt", "Italy", "Vietnam", "Denmark", "Kazakhstan", "Angola", "Iraq",
  "Iran", "Libya", "Sudan", "Yemen", "Uganda", "Gabon", "Congo Rep.", "Nepal", "Azerbaijan",
]

export const PRODUCTS = [
  {
    id: "hydraulic-hose",
    code: "HH",
    title: "High Pressure Hydraulic Hose",
    short: "SAE 100 R1–R15 wire braided & spiral hoses for 640 bar systems.",
    spec: "3/16″ – 2″ · EN 853 / EN 856",
    image: IMAGES.hoses,
  },
  {
    id: "camlock",
    code: "CC",
    title: "Camlock Quick Couplings",
    short: "SS 316 / brass / aluminium cam & groove couplings, type A–F, DC, DP.",
    spec: "1/2″ – 6″ · MIL-C-27487",
    image: IMAGES.valves,
  },
  {
    id: "ball-valve",
    code: "BV",
    title: "High Pressure Ball Valves",
    short: "2-way & 3-way ball valves in SS 316, rated to 500 bar hydraulic duty.",
    spec: "1/4″ – 2″ · 500 bar",
    image: IMAGES.engineering,
  },
  {
    id: "hose-assembly",
    code: "HA",
    title: "Hose Assemblies & End Fittings",
    short: "Crimped, tested and certified assemblies built to your drawing.",
    spec: "100% pressure tested",
    image: IMAGES.assembly,
  },
  {
    id: "needle-valve",
    code: "NV",
    title: "Instrumentation Needle Valves",
    short: "Precision flow control for instrumentation lines to 6000 PSI.",
    spec: "SS 316 · 6000 PSI",
    image: IMAGES.lab,
  },
  {
    id: "suction-hose",
    code: "SH",
    title: "Suction & Discharge Hoses",
    short: "Oil, water, slurry and dock hoses for petroleum and dredging duty.",
    spec: "2″ – 12″ · 10–20 bar",
    image: IMAGES.marine,
  },
]

export const INDUSTRIES = [
  { name: "Oil & Gas", code: "OG", desc: "Dock hoses, mud pump suction, high-pressure assemblies", image: IMAGES.oilrig },
  { name: "Construction", code: "CO", desc: "Excavator & crane hydraulic hose, quick couplers", image: IMAGES.factory },
  { name: "Marine & Ports", code: "MR", desc: "Tank truck hoses, bunkering, camlock transfer", image: IMAGES.marine },
  { name: "Mining", code: "MN", desc: "Slurry hoses, waterblast assemblies, abrasion duty", image: IMAGES.mining },
]

// Long-form product content: each block is one H2 "question" whose answer
// is hidden until clicked (client req #10). Combined word count > 1500.
export const PRODUCT_LONGFORM = {
  id: "hydraulic-hose",
  h1: "High Pressure Hydraulic Hose, Engineered in Delhi, Trusted on Five Continents",
  lead: "Since 1988 HIC Hydraulic has manufactured wire-braided and spiral-wound hydraulic hose that meets and routinely exceeds SAE and EN pressure ratings. Every coil is batch-tested on our in-house impulse rig, traceable to compound batch and mandrel run, and exported with the documentation that EPC contractors, port authorities and OEM procurement teams actually ask for.",
  sections: [
    {
      h2: "What makes a hydraulic hose survive 640 bar working pressure?",
      body: [
        "Pressure capacity in a hydraulic hose is not a single number; it is the outcome of three engineered layers working as a system. The inner tube, extruded from oil-resistant synthetic rubber (NBR for standard hydraulic oil, specialty compounds for phosphate-ester or biodegradable fluids), must resist chemical swell and heat ageing for the full service life. Around it, high-tensile steel wire reinforcement, either braided (SAE 100 R1/R2, EN 853 1SN/2SN) for flexibility or spiral-wound (SAE 100 R12/R13/R15, EN 856 4SP/4SH) for impulse-heavy high-pressure circuits, carries the hoop stress. The outer cover, a weather and abrasion resistant compound, protects the reinforcement from ozone, UV, and mechanical damage on site.",
        "At HIC, our R15 spiral hoses are type-tested to 1,000,000 impulse cycles at 120% of rated working pressure, well beyond the 500,000 cycles the standard demands. That margin matters in rock-breaker, injection-moulding and continuous-duty excavator circuits where impulse fatigue, not steady-state pressure, is what kills hoses. Every production lot carries a vulcanisation batch code; if a customer reports a failure five years later, we can trace the compound, the wire lot and the cure cycle in under an hour.",
      ],
    },
    {
      h2: "How do you select the right hose for Indian site conditions?",
      body: [
        "Selection begins with the working pressure of the circuit, but experienced buyers weigh four more factors. First, impulse severity: a pilot line with steady pressure can run a braided 2SN hose, while a hammer circuit demands spiral construction. Second, temperature: our standard tubes run -40°C to +100°C continuous, with +120°C intermittent; engine-bay routing or tropical yard storage in Rajasthan summers argues for a higher-temp compound. Third, fluid compatibility: mineral oil is the default, but water-glycol fire-resistant fluids, common in steel plants, require a different tube compound. Fourth, abrasion: where hoses rub against booms or each other, we recommend our UHMW-enhanced abrasion cover, which extends external-wear life roughly threefold in drag tests.",
        "Our technical desk, reachable on WhatsApp or the enquiry form, will size against the STAMPED framework (Size, Temperature, Application, Media, Pressure, Ends, Delivery) and return a recommendation with crimp specs within 24 hours. For OEM customers we maintain drawing-controlled assemblies with private labelling.",
      ],
    },
    {
      h2: "What quality documentation ships with every export order?",
      body: [
        "Export buyers, particularly in the Gulf, the USA and the EU, no longer accept a hose on trust. Each HIC consignment ships with a certificate of conformance referencing SAE J517 / EN 853 / EN 856, batch-wise burst and impulse test reports from our lab, and on request, third-party inspection by TUV or SGS arranged before dispatch. For oil and gas projects we additionally furnish material test certificates for end fittings (EN 10204 3.1), hydrostatic test certificates for made-up assemblies, and country-specific documentation such as SASO for Saudi Arabia or GOST-aligned paperwork for CIS buyers.",
        "This documentation discipline is one reason procurement teams in Dammam, Houston and Rotterdam reorder without re-auditing: the paperwork arrives before the questions do.",
      ],
    },
    {
      h2: "Why do 33 countries import hydraulic hose from an Indian manufacturer?",
      body: [
        "The honest answer is a combination of metallurgy supply chains, labour skill, and consistency. India produces world-class high-tensile brass-coated steel wire, the single largest cost component of a hydraulic hose, domestically, which removes one layer of import cost and lead time. Our crimping and assembly shop combines that with skilled operators who have, on average, eleven years on the line. The result is a hose that matches European performance at a landed cost that lets distributors in price-sensitive markets hold margin.",
        "Equally important is what happens after the first order. HIC holds safety stock of fast-moving SKUs, so a repeat order of R2 hoses or camlock couplings ships in days rather than the 60–90 day cycle buyers associate with Asia sourcing. Our export desk handles EXW, FOB Mundra/Nhava Sheva, CFR and DDP terms, and works with buyers' nominated forwarders or our own consolidators for LCL shipments.",
      ],
    },
    {
      h2: "What warranty and failure-analysis support do you provide?",
      body: [
        "Every HIC hose carries a 12-month warranty against manufacturing defect from the date of installation, extendable to 18 months from dispatch for project stock. More valuable than the warranty itself is the failure-analysis loop behind it: customers who return a failed assembly receive a written root-cause report, cut-section photographs, compound hardness readings and reinforcement inspection, within ten working days. Where the failure traces to misapplication (wrong fluid, exceeded bend radius, missing abrasion sleeve), we say so plainly and recommend the corrective spec. Where it traces to us, we replace and freight-credit without a negotiation.",
        "This transparency is unusual in the industry and is the foundation of our longest relationships, some distributors in Nigeria and the UAE have bought continuously from HIC for over fifteen years.",
      ],
    },
    {
      h2: "How do custom hose assemblies and private labelling work?",
      body: [
        "Roughly 40% of our output is made-to-order assemblies rather than bulk hose. Customers submit drawings or even photographs of the assembly to be replaced; our engineering team reverse-engineers the fitting combination, selects crimp dimensions from our validated crimp chart, and produces a first article for approval. On approval, production runs carry the customer's part number, and optionally their branding: layline printing with the customer's name and logo is available from 5,000 metres, and branded hose tags and packaging from much smaller quantities.",
        "For OEMs, we kanban-supply assemblies to their production line on monthly call-offs, with batch test certificates pre-delivered electronically so goods move straight to line without incoming inspection delays.",
      ],
    },
  ],
}

export const FAQ_HOME = [
  {
    h2: "Which hydraulic hose standard should I specify for a 350 bar excavator circuit?",
    body: "For a 350 bar working pressure with heavy impulse duty, specify SAE 100 R12 or EN 856 4SP spiral hose rather than braided 2SN. The four-layer spiral construction survives the repeated pressure spikes that excavator circuits generate. HIC type-tests spiral hoses to one million impulse cycles at 120% of rated pressure.",
  },
  {
    h2: "Do you manufacture camlock couplings in stainless steel 316?",
    body: "Yes. Our camlock range covers SS 316, brass, aluminium and PP in types A through F plus dust caps and plugs, from 1/2 inch to 6 inch, manufactured to MIL-C-27487 / A-A-59326 dimensional standards. SS 316 camlocks are our most exported line into the Gulf petrochemical trade.",
  },
  {
    h2: "What is the minimum order quantity for export?",
    body: "We are flexible: trial orders from one pallet are welcome so new distributors can validate quality in their market. Economy of freight usually begins at one cubic metre for air or LCL sea shipment. Repeat orders of standard SKUs ship from safety stock within days.",
  },
  {
    h2: "Can HIC supply hose assemblies crimped and tested, ready to install?",
    body: "Yes, around 40% of our output is made-to-order assemblies. Every assembly is crimped on CNC-controlled presses to a validated crimp chart, hydrostatically tested to 1.5x working pressure, capped, tagged and shipped with a test certificate. First articles are submitted for approval before production runs.",
  },
  {
    h2: "Which documents accompany export shipments?",
    body: "Certificate of conformance to SAE J517 / EN 853 / EN 856, batch-wise burst and impulse test reports, commercial invoice, packing list and certificate of origin. On request: EN 10204 3.1 material certificates for fittings, third-party inspection (TUV/SGS), and country-specific documents such as SASO for Saudi Arabia.",
  },
  {
    h2: "How quickly do you respond to enquiries?",
    body: "The export desk replies within 24 hours on working days, usually much faster on WhatsApp. Quotations include technical datasheet, crimp spec where relevant, pricing on your chosen Incoterm (EXW, FOB, CFR, DDP) and a realistic lead time, not an optimistic one.",
  },
]

export const TESTIMONIALS = [
  {
    quote: "HIC's R15 spiral hoses outlasted the European brand we used previously on our breaker fleet. Their failure-analysis report on the one hose that did fail was more honest than most suppliers' warranties.",
    name: "Procurement Head",
    org: "Earthmoving fleet, Saudi Arabia",
    rating: 5,
  },
  {
    quote: "Paperwork arrives before the questions do. SASO docs, 3.1 certs, impulse reports, everything in order. That is why we stopped re-auditing them years ago.",
    name: "Import Manager",
    org: "Industrial distributor, UAE",
    rating: 5,
  },
  {
    quote: "From a photo of a failed assembly to a reverse-engineered replacement with crimp spec in under two weeks. That responsiveness is rare.",
    name: "Maintenance Lead",
    org: "Port authority, West Africa",
    rating: 4,
  },
]

export const CATALOG_PAGES = 12

// Brief feature narration used by the voice audio player (client req #3).
export const VOICE_BRIEFS = {
  home: "Welcome to HIC Hydraulic. We manufacture high pressure hydraulic hoses, camlock couplings, ball valves and ready-to-install hose assemblies in India, and export to 33 countries. Scroll to explore our product range, or open the catalogue to flip through it like a printed book.",
  products: "This page covers our high pressure hydraulic hose range in depth. Each heading expands into a detailed answer covering construction, selection, documentation and warranty. Use the enquiry form at any time; our export desk replies within 24 hours.",
  catalogue: "This is the interactive flipbook edition of our product catalogue. Drag the page corners to turn pages, or use the arrow keys. You can also upload any PDF to preview it as a flipbook, or request the full catalogue by email.",
}
