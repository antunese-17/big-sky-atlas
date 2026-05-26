# Big Sky Atlas — Surgical Prompts for Claude Code
**Project phase**: 6 (execution) · **Generated**: 2026-04-18 · **Visual direction**: Cinematic Backcountry (daylight)

---

## Como usar este documento

Este arquivo contém **~24 prompts cirúrgicos** organizados em **7 lotes**, prontos para serem colados um por um no Claude Code. Cada prompt é **autossuficiente** — não precisa de contexto adicional além do arquivo `bsa-blueprint.json` anexo ao projeto.

### Ordem de execução
Execute os lotes **em sequência** — cada um assume o anterior concluído. Dentro de cada lote, os prompts também são ordenados.

### Antes de começar
1. Tenha o arquivo `bsa-blueprint.json` dentro da pasta `/docs/` do projeto Claude Code
2. Tenha as imagens Nano Banana Pro em `/public/images/` (ver Lote 0)
3. Tenha os vídeos Flow em `/public/videos/` (ver Lote 0)
4. Tenha a pasta `/references/` com os JSONs de DNA para Claude Code consultar quando precisar

### Convenção de checkpoints
Depois de cada prompt, Claude Code vai parar e me dizer "P1.1 completo — próximo?". Rode `npm run dev` a cada 2-3 prompts para ver resultado no navegador.

---

## LOTE 0 — Pré-trabalho (fora do Claude Code)

Antes de abrir o Claude Code, gere os assets pesados.

### P0.1 · Imagens Nano Banana Pro (~60 imagens 4K)

Use o `shotlist_nano_banana_pro` do `bsa-blueprint.json` como roteiro. Template de prompt base para cada imagem:

```
4K resolution, aspect ratio {16:9 | 3:4 | 1:1}, natural daylight, medium format look (Hasselblad X2D),
{contemplative | energetic | atmospheric} mood, palette dominated by #FAF8F4 (paper), #2A3820 (pine),
#4F6305 (moss), with warm granite tones and occasional alpenglow (#F6C67F). Humans as scale references,
not subjects. Fog in valleys, sun hitting peaks. Shot in Montana or Wyoming Rockies summer season.
NO: HDR processing, saturated greens, blue-sky-no-clouds, tourists with gear logos, neon colors,
fantasy landscapes, AI-obvious artifacts. Photorealistic, film grain allowed, slight vignette OK.
```

Salve em `/public/images/` com estrutura:
```
/public/images/
├── home/
│   ├── hero-poster.avif (4K, 16:9)
│   ├── expedition-01-bighorn-cover.avif (4K, 3:4)
│   ├── expedition-02-beartooth-cover.avif
│   ├── ... (5 covers)
│   ├── testimonial-01.avif, 02, 03 (guest portraits)
│   └── ethos-teaser-bg.avif
├── expeditions/
│   ├── [slug]/
│   │   ├── hero-poster.avif
│   │   ├── poi-01.avif ... poi-08.avif
│   │   ├── day-01.avif ... day-09.avif
│   │   ├── gallery-01.avif ... gallery-16.avif
│   │   ├── guide-01.avif, 02, 03
│   │   └── testimonial.avif
├── ethos/
│   ├── opening.avif, inline-01.avif, inline-02.avif
│   └── team-01.avif ... team-10.avif
└── contact/
    └── hero.avif
```

### P0.2 · Vídeos Flow (7 loops drone)

Use o `shotlist_flow_videos` do blueprint. Especificações:
- **Formato**: AV1 primário + H.265 fallback
- **Resolução**: 4K (3840×2160)
- **Duração**: 15-20s looping seamless
- **Bitrate**: max 8 Mbps (compressão AV1 permite isso sem perda)
- **Poster**: primeiro frame como `.webp` 1920px

Salve em `/public/videos/` seguindo convenção `{slug}-{duration}s.{av1|h265}.{ext}` e pôsteres como `{slug}-poster.webp`.

---

## LOTE 1 — Fundação (ambiente base)

### P1.1 · Next.js 15 project setup

```
Set up a Next.js 15 project for Big Sky Atlas — a luxury adventure travel agency website.

Requirements:
- Next.js 15 with App Router
- TypeScript strict mode
- Tailwind CSS 3.4+
- pnpm as package manager (faster than npm)
- ESLint + Prettier with Tailwind plugin
- Path aliases: @/components, @/lib, @/styles, @/content, @/public

Install these dependencies:
- gsap (^3.13) + gsap/dist/ScrollTrigger
- @studio-freight/lenis (^1.0) for smooth scroll
- framer-motion (^11) for component animations
- mapbox-gl (^3.8) for 3D terrain maps
- three (^0.170) for ambient WebGL backgrounds
- swiper (^11) for carousels
- photoswipe (^5.4) for gallery lightbox
- react-hook-form (^7) + zod (^3) for forms
- resend (^4) for email delivery
- lucide-react for minimal icons

Install dev dependencies:
- @fontsource-variable/fraunces (fallback for Gambarino)
- @fontsource/satoshi, @fontsource/khand, @fontsource/jetbrains-mono

Create folder structure:
/app
  /(marketing)
    /page.tsx (home)
    /expeditions/page.tsx
    /expeditions/[slug]/page.tsx
    /ethos/page.tsx
    /contact/page.tsx
  /api
    /contact/route.ts
  /layout.tsx
  /not-found.tsx
/components
  /ui (primitives)
  /blocks (sections)
  /features (map3d, cursor, transitions)
/lib (utils, config)
/content (MDX for expeditions)
/docs (place bsa-blueprint.json here)
/references (place DNA JSONs here)
/styles

Read /docs/bsa-blueprint.json to understand the project tokens before proceeding.

When done, show me the package.json and folder tree, then stop.
```

### P1.2 · Tailwind config + design tokens

```
Configure Tailwind CSS with the Big Sky Atlas design tokens from /docs/bsa-blueprint.json.

Create tailwind.config.ts with:

Colors (from blueprint design_tokens.colors) — use bsa- prefix:
- bsa-papel: #FAF8F4
- bsa-carvao: #141414
- bsa-granito: #A8ADA7
- bsa-pinheiro: #2A3820
- bsa-musgo: #4F6305
- bsa-noite-alpina: #1A2638
- bsa-brasa: #C02B0A
- bsa-lanterna: #F6C67F
- bsa-alerta: #B32025

Fonts:
- display: ['Gambarino', 'Fraunces Variable', 'Georgia', 'serif']
- body: ['Satoshi', '-apple-system', 'system-ui', 'sans-serif']
- technical: ['Khand', 'Arial Narrow', 'sans-serif']
- mono: ['JetBrains Mono', 'SF Mono', 'monospace']

Extend with custom utilities:
- letter spacing: tight-display (-0.035em), tight-h1 (-0.02em)
- line height: display (0.92), hero (0.88)
- transition timing: ease-cinematic (cubic-bezier(0.75, 0, 0.25, 1)), ease-natural (cubic-bezier(0.165, 0.84, 0.44, 1)), ease-precise (cubic-bezier(0.4, 0, 0.2, 1))
- transition duration: dur-micro (200ms), dur-fast (400ms), dur-smooth (600ms), dur-hero (1000ms), dur-page (1200ms)
- spacing: bsa-sm (75px), bsa-md (96px), bsa-lg (168px)
- border radius: bsa-sm (4px), bsa-md (8px), bsa-lg (16px), bsa-xl (32px)

Create /styles/globals.css that imports @fontsource packages and sets base styles:
- html, body: background bsa-papel, text bsa-carvao
- body: font-body, antialiased, weight 400
- text selection: bg bsa-brasa/20, text bsa-carvao
- smooth scrolling disabled (Lenis will handle)
- custom scrollbar: 6px wide, track bsa-papel, thumb bsa-granito

Also install Gambarino from Fontshare. Since it's not on @fontsource, add it via CDN in the root layout:
<link href="https://api.fontshare.com/v2/css?f[]=gambarino@400&display=swap" rel="stylesheet">

Keep Fraunces Variable loaded via @fontsource-variable/fraunces as fallback.

When done, show me tailwind.config.ts and globals.css, then stop.
```

### P1.3 · Root layout + font loading + reduced-motion provider

```
Build the root layout at /app/layout.tsx for Big Sky Atlas.

Requirements:
1. Load fonts from @fontsource packages: Satoshi (400,500,700), Khand (500,700), JetBrains Mono (400)
2. Load Gambarino from Fontshare CDN (link tag)
3. Load Fraunces Variable from @fontsource-variable as fallback

4. Create a <ReducedMotionProvider> that:
   - Detects prefers-reduced-motion via useReducedMotion from framer-motion
   - Exposes a React context with { reducedMotion: boolean }
   - Place this at /components/features/ReducedMotionProvider.tsx

5. Create a <LenisProvider> at /components/features/LenisProvider.tsx that:
   - Initializes Lenis with: duration 1.2, easing t => 1 - Math.pow(1 - t, 4) (easeOutQuart)
   - Integrates with GSAP ScrollTrigger (gsap.ticker.add lenis.raf)
   - Disables if reducedMotion is true
   - Re-enables on route change cleanup

6. Root layout composition:
<html lang="en" className={`${fontsClassName}`}>
  <head>
    <meta og:image>, JSON-LD TravelAgency schema (basic)
  </head>
  <body>
    <ReducedMotionProvider>
      <LenisProvider>
        <Nav />  {/* placeholder — build in P1.4 */}
        <main>{children}</main>
        <Footer />  {/* placeholder — build in P1.4 */}
      </LenisProvider>
    </ReducedMotionProvider>
  </body>
</html>

7. Metadata defaults in /app/layout.tsx:
- title template: '%s · Big Sky Atlas'
- default title: 'Big Sky Atlas — Expeditions in the Northern Rockies'
- description: 'A boutique agency running five technical expeditions across Montana and Wyoming. Small groups. Local guides. No shortcuts.'
- OpenGraph with /public/og/default.jpg

When done, show me layout.tsx + ReducedMotionProvider.tsx + LenisProvider.tsx, then stop.
```

### P1.4 · Nav + Footer (global chrome)

```
Build the <Nav /> and <Footer /> components for Big Sky Atlas.

<Nav />:
- Position: fixed top, full width, z-50
- Height: 64px
- Padding: 0 40px (36px on mobile)
- Background: transparent over hero, semi-transparent bsa-papel/90 with backdrop-blur when scrolled past 80vh
- Transition to opaque state: 400ms ease-precise
- Left: "BIG SKY ATLAS" in font-technical, weight 700, size 13px, tracking 0.22em, uppercase — links to /
- Right: nav items inline (Expeditions, Ethos, Contact) — font-body, weight 500, size 13px — gap 28px
- Active state: underline 1px, bsa-brasa, offset 4px
- Mobile (<768px): hamburger icon right, opens full-screen overlay nav (bsa-noite-alpina bg, text bsa-papel, stacked items in font-display 40px)

<Footer />:
- Background: bsa-pinheiro
- Text: bsa-papel (with bsa-lanterna accents)
- Padding: bsa-lg vertical, 40px horizontal

Structure (4 columns on desktop, stacked on mobile):
1. Brand:
   - "BIG SKY ATLAS" wordmark (font-technical 16px)
   - Tagline: "Expeditions in the Northern Rockies" (font-display italic 20px)
   - Address: "214 W Main · Bozeman MT 59715" (font-body 14px, bsa-papel/70)

2. Expeditions:
   - Header: "EXPEDITIONS" in font-technical 11px uppercase tracking-wide, bsa-lanterna
   - Links list: all 5 expeditions from blueprint (Bighorn, Beartooth, Wind River, Teton, Snake)

3. About:
   - Header "COMPANY"
   - Links: Ethos, Guides, Sustainability, Press

4. Connect:
   - Header "CONNECT"
   - WhatsApp: "+1 406 555 0142" (with WA icon)
   - Email: "hello@bigskyatlas.co"
   - Hours: "Mon-Fri 08:00-18:00 MST"

Bottom bar:
- Divider line 0.5px bsa-papel/20
- Row with: © 2026 Big Sky Atlas · All rights reserved · Leave No Trace certified · AMGA accredited
- Right: tiny "EOSYS-portfolio" attribution (size 10px bsa-papel/40)

When done, show me Nav.tsx + Footer.tsx, then update /app/layout.tsx to use them, then stop.
```

### P1.5 · Custom cursor — compass

```
Build <CompassCursor /> at /components/features/CompassCursor.tsx.

This is Signature Element #4 of the brand — must feel inconfundível.

Behavior:
- Hide default cursor on desktop (pointer: none on body)
- Render custom SVG compass rose that follows mouse position
- Base state: 24×24px SVG — center dot + 4 cardinal strokes (N/E/S/W), weight 1px, color bsa-carvao
- Smooth follow with 80ms delay (easing: framer-motion spring damping 30 stiffness 400)
- Subtle rotation based on scroll velocity — max ±15° (use requestAnimationFrame to track scroll delta)

Context-aware variants (detect via data-cursor attribute on hovered element):
- Default: base compass
- data-cursor="link": strokes extend 25% longer, still bsa-carvao
- data-cursor="cta": rose fills with bsa-brasa, strokes become bsa-papel, scale 1.15
- data-cursor="image": compass transforms into "view" icon (circle + magnifying glass), scale 1.2
- data-cursor="drag": compass transforms into horizontal arrows pointing left and right (used in featured carousel)
- data-cursor="map": compass is replaced by a small pin icon

Transitions between states: 300ms ease-natural.

Disable on:
- Touch devices (detect via ontouchstart or pointer:coarse)
- prefers-reduced-motion (fallback to default cursor)

Export a <CursorAware data-cursor="cta"> wrapper component that applies the attribute and handles mouse enter/leave.

When done, show me CompassCursor.tsx + CursorAware.tsx + add it to the root layout, then stop.
```

### P1.6 · Page transition wrapper — Trail Descent

```
Build <TrailDescentTransition /> at /components/features/TrailDescentTransition.tsx.

This is Signature Element #5 — page transitions that feel like descending a trail.

Use framer-motion's <AnimatePresence mode="wait"> with custom variants.

Variants:
- initial: { opacity: 0, y: -40, clipPath: 'inset(0 0 100% 0)' }
- animate: { opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)' }
- exit: { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' }

Transition: { duration: 1.2, ease: [0.75, 0, 0.25, 1] } (ease-cinematic from blueprint)

On prefers-reduced-motion: all durations become 0, no y transform, instant opacity.

Apply this at the <main> level of /app/layout.tsx, wrapping {children}.

Additionally, on route change:
- Freeze current scroll position on exit start
- Reset scroll to top after entry complete
- Pause Lenis during transition (to prevent conflicts)
- Re-enable Lenis 100ms after transition end

When done, show me the transition component + integration into layout.tsx, then stop.
```

---

## LOTE 2 — Typography & primitives

### P2.1 · Typography component library

```
Build typography primitives at /components/ui/typography/.

Files:
- Display.tsx — renders display text (hero, section titles)
- Heading.tsx — renders h1, h2, h3
- Body.tsx — renders paragraph text
- Overline.tsx — renders technical overlines in Khand
- Mono.tsx — renders monospaced coordinates / data
- PullQuote.tsx — renders italic editorial pull quotes

Display props:
- size: 'hero' (clamp 96/14vw/200) | 'xl' (72/10vw/140) | 'l' (56/7vw/96)
- children
- as: keyof JSX.IntrinsicElements = 'h1'
- className

Display default styles:
- font-family: font-display (Gambarino)
- font-weight: 400
- line-height: 0.92 for hero/xl, 1.0 for l
- letter-spacing: -0.035em hero, -0.03em xl, -0.02em l
- color: inherit (defaults to bsa-carvao in papel mode, bsa-papel in noite mode)

Heading props:
- level: 1 | 2 | 3
- children, className

Heading styles:
- h1: 56px / 1.05 / -0.02em / Gambarino 500
- h2: 40px / 1.1 / -0.01em / Gambarino 500
- h3: 28px / 1.25 / Satoshi 600

Body props:
- size: 'large' (20px) | 'default' (16px) | 'small' (14px)
- children, className

Body default:
- font-family: font-body (Satoshi)
- line-height: 1.6 large, 1.7 default, 1.6 small
- font-weight: 400
- max-width: 65ch for readability

Overline props:
- color: 'musgo' | 'granito' | 'lanterna' | 'brasa' | 'pinheiro'
- children, className

Overline styles:
- font-family: font-technical (Khand)
- font-weight: 500
- font-size: 12px
- letter-spacing: 0.22em
- text-transform: uppercase

Mono styles:
- font-family: font-mono (JetBrains Mono)
- font-size: 13px
- letter-spacing: 0.04em

PullQuote props:
- size: 'l' (56px) | 'm' (36px) | 's' (28px)
- attribution?: string
- children

PullQuote styles:
- font-family: font-display
- font-style: italic
- font-variation-settings: 'opsz' 72, 'SOFT' 100
- line-height: 1.25
- attribution: Overline color=granito, mt-3

Export all from /components/ui/typography/index.ts.

When done, show me all 6 component files + the barrel export, then stop.
```

### P2.2 · Button primitive + CTA variants

```
Build <Button /> at /components/ui/Button.tsx with CTA variants.

Props:
- variant: 'primary' | 'secondary' | 'ghost' | 'whatsapp'
- size: 'default' | 'large'
- href?: string (renders as Next <Link> if provided)
- children, className
- external?: boolean (opens in new tab if true)
- data-cursor attribute is applied: 'cta' for primary/secondary, 'link' for ghost

Variant styles:

Primary (most prominent):
- bg bsa-brasa
- text bsa-papel
- border none
- hover: bsa-brasa brightness 110%, subtle scale 1.02
- Transition: 300ms ease-natural

Secondary (inverse on dark sections):
- bg bsa-papel
- text bsa-carvao
- border none
- Used on noite-alpina backgrounds

Ghost (minimal):
- bg transparent
- text current
- border-bottom: 1px solid bsa-brasa, offset 3px
- Hover: bsa-brasa extends to underline-offset 5px

Whatsapp:
- bg #25D366 (WhatsApp green — one exception to the palette for brand recognition)
- text white
- WhatsApp icon (lucide-react MessageCircle or custom SVG)
- Used only on contact CTAs

Common styles (all variants):
- font-body (Satoshi), weight 700, size 13px (15px for large), letter-spacing 0.02em
- padding: 12px 24px default, 16px 32px large
- border-radius: 4px
- No all-caps (sentence case always)
- Right-arrow ↗ or → character at end of primary/secondary CTAs
- Active state: scale 0.98 (spring feel)
- Focus-visible: outline 2px bsa-brasa offset 2px

When done, show me Button.tsx + usage examples in a demo route /app/_demo/page.tsx, then stop.
```

### P2.3 · Overline metadata strip

```
Build <MetadataStrip /> at /components/ui/MetadataStrip.tsx.

This is Signature Element #3 — the "EXPEDITION 04 · ELEV 3,842M · 7 DAYS · TECH 4/5" overline that appears across the site.

Props:
- items: Array<{ label: string; accent?: boolean }>
- color: 'musgo' | 'granito' | 'lanterna' | 'brasa' | 'papel' (for noite backgrounds)
- size: 'default' (12px) | 'small' (10px)
- separator: '·' | '—' | '/' (default '·')
- animate?: boolean (fade-in on scroll if true, default true)

Styling:
- font-technical (Khand)
- weight 500
- tracking 0.22em
- uppercase
- separator bsa-granito/60
- gap between items: 10px
- accent items (isAccent=true): weight 700, always bsa-brasa regardless of color prop
- flex wrap on mobile, horizontal scroll with fade-right on overflow

Animation:
- When animate=true, use framer-motion whileInView
- Stagger each item 60ms apart
- Opacity 0 → 1, y 10px → 0
- Duration 400ms, ease-natural

Usage examples to include:
- <MetadataStrip items={[{label: 'Expedition 04'}, {label: '7 days'}, {label: 'Teton Range, WY'}, {label: 'Intensity 4/5', accent: true}, {label: 'From $11,800'}]} color="musgo" />
- <MetadataStrip items={[{label: '44.6789° N'}, {label: '110.5423° W'}, {label: 'ELEV 3,842M'}, {label: 'JUL 14 — 21'}]} color="granito" size="small" />

When done, show me MetadataStrip.tsx + demo usage, then stop.
```

### P2.4 · Section wrapper with mode (papel / noite)

```
Build <Section /> at /components/ui/Section.tsx.

This implements Signature Element #6 — daylight-dominant alternation with strategic noite moments.

Props:
- mode: 'papel' | 'noite' | 'granito'
- size: 'sm' (75px vertical) | 'md' (96px) | 'lg' (168px)
- fullBleed?: boolean (default false — normal has max-width 1440 centered + horizontal padding 40px/24px mobile)
- container?: 'default' (max-w-[1440px]) | 'narrow' (max-w-[720px]) | 'wide' (max-w-[1720px])
- className
- children

Styling by mode:
- papel: bg bsa-papel, text bsa-carvao — default daylight
- noite: bg bsa-noite-alpina, text bsa-papel — reserved for 3 strategic moments
- granito: bg #EFECDE (a lighter cream between papel and granito) — used for subtle contrast without going dark

Behavior:
- Mode transitions between adjacent sections should crossfade (not hard-cut)
- Add a parent-level observer that tracks current-mode as user scrolls
- Expose via CSS custom property: --current-mode on html element
- Some global elements (nav text, cursor color) react to this

Parent-level: create <ModeTracker /> in /components/features/ModeTracker.tsx that:
- Uses IntersectionObserver with threshold 0.5
- Updates html[data-mode] attribute based on currently-visible section
- Nav.tsx subscribes to this to adjust text color

When done, show me Section.tsx + ModeTracker.tsx + integration in layout.tsx, then stop.
```

---

## LOTE 3 — Componentes de conteúdo

### P3.1 · Expedition card component

```
Build <ExpeditionCard /> at /components/blocks/ExpeditionCard.tsx.

Used in:
- Home featured section (horizontal scroll)
- Expeditions page grid
- Footer navigation

Props:
- expedition: {
    slug, number, name, subtitle, region,
    duration_days, intensity, tech_grade,
    elevation_max_m, price_from_usd, cover_image
  }
- variant: 'featured' (vertical 3:4) | 'grid' (varies) | 'compact' (horizontal small)
- index?: number (for stagger animation)

Featured variant (used in home horizontal scroll):
- Aspect ratio 3:4
- Width: 340px fixed (for scroll-snap)
- Cover image full-bleed
- Overlay gradient at bottom (from transparent to bsa-carvao/60)
- On top of overlay:
  - Number in Khand "04" 14px, bsa-lanterna
  - Name in font-display 32px, bsa-papel
  - MetadataStrip with duration + region + intensity
- data-cursor="image" on the entire card
- Hover: image scale 1.05 (1000ms ease-cinematic), overlay intensifies, "View expedition →" slides up from bottom
- Click navigates to /expeditions/{slug} with trail-descent transition

Grid variant (used in /expeditions):
- Asymmetric sizing (first card larger, others standard — randomized per grid position)
- Full card with cover image + name below + overline below name + CTA
- Same hover behavior
- Uses MetadataStrip

Compact variant (used in footer):
- Small, horizontal, text-only with small cover thumbnail 48x64px
- Link style

When done, show me ExpeditionCard.tsx + demo in _demo/page.tsx showing all 3 variants, then stop.
```

### P3.2 · Horizontal scroll snap — Featured expeditions

```
Build <FeaturedExpeditions /> at /components/blocks/FeaturedExpeditions.tsx.

Used on the Home page. Horizontal scroll carousel with snap-to-card.

Props:
- expeditions: ExpeditionData[] (5 items)

Implementation:
- Horizontal overflow-x-scroll with scroll-snap-type: x mandatory
- Each card has scroll-snap-align: center
- Gap between cards: 24px
- First and last cards have extra padding to ensure they can center-snap

Controls:
- Previous/Next arrow buttons (bsa-carvao circles with arrows)
- Progress indicator at bottom: "01 / 05 · 04 / 05" in Mono
- Swipe supported on touch
- Drag supported on desktop (cursor becomes "drag" via data-cursor="drag")

Behavior:
- Use Swiper.js for mechanics (initialized with slidesPerView='auto', spaceBetween 24, centeredSlides true, mousewheel enabled)
- Navigation arrows are custom (not default swiper)
- Active slide has subtle scale 1 while inactive have scale 0.92 (400ms ease-natural)
- GSAP ScrollTrigger: pin this section for first 1.5× scroll distance so user must interact

Header of the section:
- Overline: "FEATURED · FIVE EXPEDITIONS"
- Title: "Choose your route" in Display size="l"
- Subtitle body: "Five technical routes across Montana and Wyoming, each designed around the terrain that shaped it."

When done, show me FeaturedExpeditions.tsx + demo, then stop.
```

### P3.3 · Testimonial card editorial

```
Build <TestimonialCard /> at /components/blocks/TestimonialCard.tsx.

Editorial style — not traditional testimonial card.

Props:
- testimonial: {
    quote: string (long, 2-4 sentences)
    author: { name, origin, expedition_slug, expedition_name, photo }
  }
- variant: 'horizontal' | 'vertical' | 'inline'
- index?: number

Horizontal variant (home band):
- Two-column: 40% photo + 60% text
- Photo: 3:4 aspect, treated as "editorial portrait"
- Quote: font-display italic 28px, line-height 1.3, bsa-carvao
- Attribution block: name (Satoshi 500 16px) + origin + "On the {expedition_name}" in Overline
- No quote marks — use em-dash before attribution

Vertical variant (expedition detail page):
- Single column, photo on top
- Larger quote (36px)
- Same attribution

Inline variant (embedded in long-form text):
- No photo
- Quote italic 28px
- Attribution inline beside end of quote

Animation:
- On scroll into view, text reveals via type-stagger (split by word, opacity 0→1, 40ms per word, ease-natural)
- Photo parallax: translateY -5% to 5% based on scroll position within viewport

When done, show me TestimonialCard.tsx + demo with all 3 variants, then stop.
```

### P3.4 · Day-by-day timeline

```
Build <DayByDayTimeline /> at /components/blocks/DayByDayTimeline.tsx.

Used in expedition detail pages. Editorial narrative of itinerary.

Props:
- days: Array<{
    number: number (1-9)
    title: string
    narrative: string (2-3 paragraphs)
    image: string (path)
    elevation_gain_m?: number
    distance_km?: number
  }>

Layout:
- Vertical timeline, one row per day
- Alternating alignment (odd days content-left, even days content-right)
- Thin vertical line running through center (bsa-granito, 1px)
- Day number marker on the line (circle bsa-brasa, 12px, with day number inside in mono 10px bsa-papel)

Per day row:
- Overline: "DAY 0X" (Khand, bsa-musgo, 11px)
- Title: font-display, size 40px
- Body: 2-3 paragraphs (Satoshi 16px, max-width 520px)
- Image: 60% container width, aspect 16:10, bsa-xl radius (32px)
- Metadata: MetadataStrip bottom — "ELEV +850M · 12KM · 6H HIKING"

Animation:
- Each day row animates in on scroll (stagger, 800ms ease-cinematic)
- Image enters with subtle parallax
- Day marker circle scales from 0 to 1 with bounce

Mobile (<768px):
- All rows stack left-aligned (no alternation)
- Images become full-width
- Marker moves to the left with items

When done, show me DayByDayTimeline.tsx + demo with 7 sample days (for Teton Traverse), then stop.
```

### P3.5 · Gallery editorial + PhotoSwipe

```
Build <EditorialGallery /> at /components/blocks/EditorialGallery.tsx.

Used in expedition detail + ethos + home.

Props:
- images: Array<{
    src: string
    alt: string
    caption?: string
    aspect?: 'landscape' | 'portrait' | 'square'
  }>
- columns?: 2 | 3 | 4 (default 3)

Layout:
- Asymmetric masonry using CSS grid + grid-auto-rows: masonry (with fallback for unsupported browsers)
- Each image respects its natural aspect ratio
- Gap: 16px (desktop) / 12px (mobile)
- Images are rendered at 2× DPR via <Image /> from next/image with sizes appropriate to grid

Lightbox:
- On click, open PhotoSwipe v5 lightbox
- Full screen, bsa-noite-alpina bg, bsa-papel text
- Caption appears at bottom if provided
- Keyboard navigation (arrows, escape)
- Counter "04 / 16" in Mono

Image states:
- Default: image with subtle 0.5px bsa-granito/30 border
- Hover (desktop): scale 1.03, shadow-hero applied (0 40px 80px -10px rgba(0,0,0,0.35)), data-cursor="image"
- Loading: LQIP (low-quality image placeholder) blurred base64 embedded in markup

Animation:
- Progressive reveal as images scroll into view
- Stagger 80ms between images

When done, show me EditorialGallery.tsx + PhotoSwipe setup + demo with 12 sample images, then stop.
```

---

## LOTE 4 — O MAPA 3D (killer moment — atenção extrema)

### P4.1 · Mapbox GL JS setup + custom style

```
Set up Mapbox GL JS v2 for Big Sky Atlas.

Tasks:
1. Create Mapbox account, generate public token
2. Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local
3. Install dependencies if not already: mapbox-gl types

4. Create custom Mapbox Studio style:
   - Base: Mapbox Outdoors style cloned
   - Customize colors to BSA palette:
     - Water: bsa-noite-alpina
     - Parks/vegetation: bsa-pinheiro (dark green)
     - Meadows: bsa-musgo/40
     - Terrain shading: warm granite tones matching our palette
     - Roads: bsa-granito
     - Country/state borders: bsa-carvao thin
     - Labels: font Khand (load as web font in style), carvao color
   - Enable 3D terrain with exaggeration 1.5
   - Enable atmosphere (fog, sky) for immersive camera flights
   - Save style as "big-sky-atlas-v1"

5. Add helper at /lib/mapbox.ts:
   - export function initMapbox(container: HTMLElement, options): mapboxgl.Map
   - Sets access token
   - Creates map with custom style URL, center on Montana/Wyoming (lng -110, lat 44.5), zoom 6.5, pitch 45
   - Adds terrain source and fog/atmosphere
   - Returns map instance

6. Type all route GeoJSONs at /content/routes/:
   - /content/routes/teton-traverse.geojson (fictional but plausible coordinates + elevations)
   - One per expedition (5 total)
   - Format: FeatureCollection with LineString for route + Points for POIs
   - Each point has properties: name, elevation_m, day, poi_type (trailhead|camp|summit|viewpoint)

When done, show me .env.local template + lib/mapbox.ts + one sample GeoJSON (teton-traverse), then stop.
```

### P4.2 · Trail 3D map component (killer moment)

```
Build <TrailMap3D /> at /components/features/TrailMap3D.tsx.

This is Signature Element #2 and the MOST IMPORTANT component of the site. Spend time on it.

Props:
- routeSlug: string (loads /content/routes/{slug}.geojson)
- scrollDriven?: boolean (default true)

Implementation:

1. Full-bleed container (h-screen sticky during scroll)

2. On mount, load map via lib/mapbox initMapbox

3. After map loads:
   - Fit camera to route bounds with padding
   - Add route as line layer (width 4px, color bsa-brasa, line-dasharray [1,1] until animation completes)
   - Add POIs as custom HTML markers (not Mapbox default markers)
     Each marker: small dot (8px, bsa-brasa) + label card (appears on hover)
     Label card: name + elevation + overline with day number
   - Add atmosphere (fog at low altitudes for drama)

4. Animate route drawing with animateLine from turf.js — dashoffset from 100% to 0% over 2000ms ease-cinematic

5. Scroll-driven camera (use GSAP ScrollTrigger):
   - Pin the section for a total scroll distance of 300vh (3x viewport)
   - Camera follows the route from start to end as user scrolls
   - At each POI marker, briefly ease the camera (pause for 200ms simulated via eased bezier, don't actually stop scroll)
   - Camera pitch varies: 45° default, increasing to 75° at dramatic summits
   - Camera bearing rotates to follow route direction naturally

6. Side panel (sticky right, overlay):
   - Width: 320px (hidden on mobile <1024px)
   - Contents:
     - Route name at top (Display 32px)
     - Overline: "DAY {current} OF {total}"
     - Elevation graph: SVG line chart showing elevation profile, with a moving dot that tracks scroll position
     - Gain/Loss counter: "+3,200M / -2,100M" (Mono, updates as scroll progresses)
     - Current POI label (if near one): "Upper Camp · 2,840M · Day 3"

7. "Expand map" button (bottom-right):
   - On click, the map goes full-screen and ScrollTrigger pauses
   - User can freely pan/zoom, rotate, click POIs
   - Close button returns to scroll-driven mode

8. prefers-reduced-motion:
   - Map becomes 2D (no 3D terrain, no atmosphere)
   - Route draws instantly (no animation)
   - No scroll-pinning — replaced by a normal scrollable section with static map + POI list below
   - Camera does NOT auto-follow

Performance notes:
- Lazy-load mapbox-gl only when this component mounts (use next/dynamic with ssr: false)
- Use requestIdleCallback for non-critical marker positioning
- Debounce scroll events for camera updates (16ms throttle)

When done, show me TrailMap3D.tsx + lib/mapbox additions, and test on /app/_demo/map/page.tsx with Teton Traverse data. Then stop.
```

### P4.3 · Master map teaser + full

```
Build <MasterMap /> at /components/features/MasterMap.tsx.

Used in two places:
1. Home page "master-map-teaser" section (smaller, teaser view)
2. Expeditions page "master-map-full" section (larger, interactive)

Props:
- mode: 'teaser' | 'full'
- expeditions: ExpeditionData[] (5 items)

Shared behavior:
- Load Mapbox style from P4.1
- Show all 5 routes simultaneously, each in a different color:
  - Bighorn: bsa-musgo
  - Beartooth: bsa-lanterna
  - Wind River: bsa-pinheiro (dark)
  - Teton: bsa-brasa
  - Snake River: bsa-noite-alpina (lighter on lighter BG, or use alert)
- Initial camera: bounds that include all 5 routes, pitch 30, altitude high

Teaser mode (Home):
- Height: 60vh
- No interactivity (map is visual only)
- Overlay legend with 5 route names + color swatches
- CTA overlay: "See all expeditions →" links to /expeditions

Full mode (Expeditions):
- Height: 90vh
- Full interactivity (pan, zoom, rotate via shift+drag)
- Hover a route: that route highlights (other routes fade to 0.4 opacity), camera smoothly flies to route bounds (1200ms cinematic)
- Side panel slides in with expedition summary + "View expedition →" CTA
- Click elsewhere: all routes return to 1.0 opacity, side panel slides out
- Elevation ticker below map: shows real-time elev as cursor hovers over route at that point

Both modes:
- Route lines animate draw on mount (1500ms stagger across 5 routes)
- Atmosphere (fog) enabled for drama
- 3D terrain enabled

prefers-reduced-motion: both modes become 2D static map, no animations, side panel instant toggle.

When done, show me MasterMap.tsx + demo on /_demo/master-map, then stop.
```

---

## LOTE 5 — Páginas (composições finais)

### P5.1 · Home page composition

```
Build /app/(marketing)/page.tsx — the Home page.

Read /docs/bsa-blueprint.json pages[0] for complete section specs.

Assembly (in order):

1. <Section mode="papel" fullBleed>
   <HeroManifesto />
   Hero: video drone (home-hero.av1 with h265 fallback), poster image, split-text reveal of "Big Sky Atlas" in Display hero size, overline above "EXPEDITION 04 · TETON TRAVERSE · NOW BOOKING SUMMER 2026" (animated), play button for video
   </Section>

2. <Section mode="papel" size="lg">
   <PositioningStatement />
   Three-line display 120px manifesto: "Five technical routes. / Montana and Wyoming. / Small groups, local guides." with each line revealing on scroll
   </Section>

3. <Section mode="papel" size="md">
   <FeaturedExpeditions expeditions={expeditions} />
   From P3.2
   </Section>

4. <Section mode="noite" size="lg">
   <MasterMap mode="teaser" expeditions={expeditions} />
   From P4.3 — this is one of the 3 strategic noite moments
   </Section>

5. <Section mode="papel" size="md">
   <EthosTeaser />
   Pull quote from P2.1 size="l": "The mountains come first. Everything else follows." (Display italic 56px)
   Attribution overline: "— From our ethos"
   CTA ghost: "Read our ethos →" links to /ethos
   </Section>

6. <Section mode="granito" size="md">
   <SocialProofBand />
   3 TestimonialCards in horizontal layout (from P3.3)
   Below: press logos row (fictional — CN Traveler, Travel+Leisure, Outside, Nat Geo) as monochrome SVGs 40px height, opacity 0.6, hover 1.0
   </Section>

7. <Section mode="papel" size="lg">
   <ClosingCTA />
   Display 96px "Ready to meet the mountains?"
   Two CTAs side by side: primary "Plan your expedition" (whatsapp variant) + ghost "Or send us an email"
   </Section>

Footer already in layout.

Data loading:
- expeditions: import from /content/expeditions/index.ts (which reads all 5 MDX files via gray-matter)
- testimonials: hardcoded in /content/testimonials.ts (3 fictional ones for the home band)

SEO:
- metadata export: title, description, openGraph from blueprint pages[0].seo
- Generate JSON-LD TravelAgency schema at page level

When done, show me the home page file + all section sub-components (HeroManifesto, PositioningStatement, EthosTeaser, SocialProofBand, ClosingCTA) + content files, then stop.
```

### P5.2 · Expeditions page + filtros

```
Build /app/(marketing)/expeditions/page.tsx.

Sections (blueprint pages[1]):

1. <Section mode="papel" size="md">
   Header:
   - Display hero "Expeditions" with MetadataStrip overline "Five ways into the Northern Rockies"
   - Filter bar component (next)
   </Section>

2. <FilterBar /> at /components/blocks/FilterBar.tsx:
   - Filters: intensity (1-5 pill toggles), duration (bucket ranges), profile, season
   - Use URL state (searchParams) for filter state
   - Pills use bsa-brasa when active, bsa-granito when inactive
   - "Reset filters" text link when any filter active

3. <Section mode="papel" size="lg">
   <ExpeditionsGrid />:
   - Uses ExpeditionCard variant="grid"
   - Asymmetric grid via CSS:
     grid-template-columns: repeat(12, 1fr)
     Card 1: col-span-7 row-span-2 (large)
     Card 2: col-span-5 row-span-1
     Card 3: col-span-5 row-span-1
     Card 4: col-span-4 row-span-2
     Card 5: col-span-8 row-span-2
   - Filters apply with framer-motion AnimatePresence for smooth reorder
   </Section>

4. <Section mode="noite" size="lg">
   <MasterMap mode="full" expeditions={filteredExpeditions} />
   From P4.3 — another noite moment
   </Section>

5. <Section mode="papel" size="md">
   <CustomExpeditionCTA />:
   - Display l "Not quite what you had in mind?"
   - Body: "We design custom expeditions around your group, dates, and ambitions. Tell us what you're after."
   - Primary CTA: "Plan a custom expedition" → /contact with pre-filled context
   </Section>

When done, show me the page + FilterBar + ExpeditionsGrid + CustomExpeditionCTA components, then stop.
```

### P5.3 · Expedition template (dynamic)

```
Build /app/(marketing)/expeditions/[slug]/page.tsx — the template for all 5 expedition pages.

This is the conversion page — spend attention here.

Pre-work: Create /content/expeditions/{slug}.mdx for all 5 expeditions (use blueprint expeditions[] data + write fictional but plausible narratives for each day, each POI, each testimonial).

Page composition:

1. generateStaticParams — returns all 5 slugs
2. generateMetadata — from blueprint seo_template

Sections:

1. <Section mode="papel" fullBleed>
   <ExpeditionHero />:
   - Full-bleed drone video (expedition-specific, h265 fallback)
   - Overline: "EXPEDITION 0X" (large Khand 16px)
   - Display hero: expedition name (Gambarino 180px desktop)
   - Subtitle italic: expedition.subtitle
   - MetadataStrip: days, region, intensity, price, elevation_max
   </Section>

2. <Section mode="noite" size="lg" fullBleed>
   <TrailMap3D routeSlug={slug} />
   From P4.2 — THE killer moment, third strategic noite moment
   </Section>

3. <Section mode="papel" size="lg">
   <DayByDayTimeline days={expedition.days} />
   From P3.4
   </Section>

4. <Section mode="papel" size="md">
   <EditorialGallery images={expedition.gallery} />
   From P3.5 — 12-16 images per expedition
   </Section>

5. <Section mode="granito" size="md">
   <TheGuides guides={expedition.guides} />:
   - 2-3 guide cards horizontal
   - Each: portrait (aspect 3:4), name (Gambarino 24px), role + home range (Khand overline), pull quote (italic 16px)
   </Section>

6. <Section mode="papel" size="md">
   <WhatsIncluded included={...} bring={...}>
   - Two columns: "Included" | "What to bring"
   - Each: overline "INCLUDED" / "WHAT TO BRING", list with checks/minuses (lucide icons)
   - Expandable third section: "Provided gear" with full list of technical gear supplied
   </Section>

7. <Section mode="papel" size="md">
   <SpecificTestimonial testimonial={expedition.testimonial} />
   TestimonialCard variant="vertical"
   </Section>

8. <Section mode="papel" size="md">
   <PricingAvailability>
   - Price display: Gambarino 56px "From ${price_from_usd.toLocaleString()} per person"
   - Group size: "Maximum {group_size_max} guests" overline
   - Upcoming departures: 3-5 dates as pills, each with availability dots (e.g. ●●●○○ = 3/5 spots left)
   - Deposit + cancellation in body
   </Section>

9. <Section mode="papel" size="md">
   <ReserveCTA expedition={expedition}>
   - Headline "Reserve this expedition" Display l
   - Primary Button variant="whatsapp": opens WhatsApp deeplink with message:
     "Hi Big Sky Atlas — I'd like to reserve the {name} expedition ({duration_days} days, earliest possible date). Please advise availability."
     URL: https://wa.me/14065550142?text=...
   - Secondary Button: "Email us instead" ghost variant
   - Below: response time guarantee overline
   </Section>

Data pattern:
- /content/expeditions/{slug}.mdx contains all expedition content
- /lib/expeditions.ts exports getExpedition(slug) + getAllExpeditions()

When done, show me the page + all sub-components + one complete MDX file (teton-traverse.mdx) as an example, then stop.
```

### P5.4 · Our Ethos page

```
Build /app/(marketing)/ethos/page.tsx.

Sections (blueprint pages[3]):

1. <Section mode="noite" size="lg" fullBleed>
   <EthosOpening>:
   - Full-height hero
   - Display: "The mountains come first." (Gambarino 240px desktop, responsive down)
   - Overline below: "OUR ETHOS · EST. 2014"
   - First strategic noite moment
   </Section>

2. <Section mode="papel" size="lg" container="narrow">
   <EthosStory>:
   - 4-6 editorial paragraphs (Satoshi 20px body-large)
   - Drop cap on first paragraph (Gambarino 96px initial)
   - 2 inline full-bleed break-out images between paragraphs
   - Images break out of narrow container to fullbleed width
   </Section>

3. <Section mode="papel" size="lg">
   <EthosPrinciples>:
   - 4 vertical cards, one per principle
   - Each: "01-04" in Khand, principle name in Display l (56px), explanation body
   - Principles:
     01 · Leave no trace (body about trail ethics + carrying out everything)
     02 · Small groups only (body about max 8 guests, why)
     03 · Local guides first (body about hiring within 100 miles of each route)
     04 · No shortcuts (body about paying for safety, gear, slow deliberation)
   </Section>

4. <Section mode="papel" size="lg">
   <TheTeam team={teamData}>:
   - Grid of 8-10 team members
   - Each: editorial portrait 3:4, name (Gambarino 24px), role + home range (Khand overline)
   - Hover: full quote overlays portrait with slight blur background (backdrop-blur)
   </Section>

5. <Section mode="granito" size="md">
   <Certifications>:
   - Logo row of 5-6 fictional badges as monochrome SVGs:
     Leave No Trace · AMGA · Nat Geo Unique Lodges (equivalent) · Relais & Châteaux (equivalent) · 1% for the Planet
   - Each badge 56px height
   - Explanation line beneath in body small
   </Section>

6. <Section mode="papel" size="lg">
   <EthosCTA />:
   - Display l "Ready to meet the mountains?"
   - CTA → /contact
   </Section>

Team data in /content/team.ts — 10 fictional guides with: name, role, home_range, cert_list, quote, photo_url.
Principles data: inline in page.

When done, show me the page + sub-components + content/team.ts, then stop.
```

### P5.5 · Contact page + WhatsApp + form

```
Build /app/(marketing)/contact/page.tsx.

Sections (blueprint pages[4]):

1. <Section mode="papel" size="lg">
   <ContactHero>:
   - Display hero "Let's plan your expedition" (Gambarino 160px)
   - Overline: "RESPONSE WITHIN 4 HOURS · MON-FRI MST"
   </Section>

2. <Section mode="papel" size="md">
   <WhatsAppPrimary>:
   - Large card full-width
   - Border 0.5px bsa-carvao/20, radius bsa-xl
   - Padding bsa-lg
   - WhatsApp icon SVG 48px (bsa-brasa fill)
   - Display l "Message us on WhatsApp"
   - Body: "Tell us which expedition and when — we reply within 4 hours, Monday to Friday."
   - CTA Button variant="whatsapp" size="large" (pre-filled message)
   - Hover: card lifts with shadow-hero, bsa-brasa accent intensifies
   </Section>

3. <Section mode="papel" size="md">
   <ContactForm>:
   - "Or send us an email" Display l
   - Form fields:
     - Name (text, required)
     - Email (email, required, zod validation)
     - Expedition of interest (select — 5 options + "Custom expedition" + "Not sure yet")
     - Ideal dates (date range picker — month precision is enough)
     - Group size (number, 1-12)
     - Message (textarea, optional)
   - Submit calls /api/contact which uses Resend to send to hello@bigskyatlas.co
   - On success: form replaced with Display l "Received." + body "We'll be in touch within 4 hours."
   - Form styling: inputs have bsa-carvao border, focus ring bsa-brasa
   </Section>

4. <Section mode="granito" size="md">
   <LocationBlock>:
   - Two-column layout
   - Left: address "Big Sky Atlas HQ — 214 W Main, Bozeman MT 59715" + hours + note
   - Right: small 2D Mapbox map (monochrome style variant) showing Bozeman location, 400px height
   </Section>

5. <Section mode="papel" size="md" container="narrow">
   <FAQ>:
   - Accordion with 7 questions (use Radix Accordion for a11y)
   - Questions:
     1. How fit do I need to be?
     2. What's the deposit?
     3. Cancellation policy?
     4. Can I travel solo?
     5. Is there a minimum age?
     6. Can I rent gear?
     7. What happens with bad weather?
   - Answers in body, 2-3 lines each, no marketing fluff
   - Items expand with 400ms ease-natural, plus/minus icon rotates on state change
   </Section>

API route /app/api/contact/route.ts:
- POST handler validates payload with zod schema
- Uses Resend API to send email to hello@bigskyatlas.co
- Returns 200 on success, 400 on validation errors
- Rate limiting: 3 submissions per IP per hour (use Upstash Redis or in-memory Map for MVP)

Env:
- RESEND_API_KEY in .env.local
- NEXT_PUBLIC_WHATSAPP_NUMBER = 14065550142

When done, show me the page + all sub-components + API route + .env.example, then stop.
```

---

## LOTE 6 — SEO, A11y, Performance

### P6.1 · Meta + Open Graph + JSON-LD

```
Implement SEO foundation across all pages.

Tasks:

1. Create /lib/seo.ts with:
   - generateMetadata(page: 'home'|'expeditions'|'expedition'|'ethos'|'contact', data?: ExpeditionData): Metadata
   - Pulls from /docs/bsa-blueprint.json pages[].seo
   - Handles dynamic expedition pages using seo_template interpolation

2. Create /lib/json-ld.ts with:
   - TravelAgencyJsonLd() — rendered in root layout
     {
       "@context": "https://schema.org",
       "@type": "TravelAgency",
       "name": "Big Sky Atlas",
       "description": "...",
       "url": "https://bigskyatlas.co",
       "logo": "...",
       "address": { ... Bozeman },
       "telephone": "+1-406-555-0142",
       "priceRange": "$$$",
       "areaServed": ["Montana", "Wyoming"],
       "potentialAction": { ... }
     }
   - ExpeditionTripJsonLd(expedition) — rendered on expedition detail pages
     "@type": "TouristTrip"

3. Generate OpenGraph images for each page:
   - Create /app/og/route.tsx using next/og
   - Params: ?page=home|expedition&slug=...
   - Renders 1200×630 OG image with:
     - bsa-papel bg
     - Display text (page title, use Satoshi as fallback since Gambarino is complex for next/og)
     - Overline metadata
     - Bottom bar with "BIG SKY ATLAS" in Khand-equivalent
   - Cache with revalidate 24h

4. Sitemap:
   - /app/sitemap.ts generates sitemap.xml dynamically from all pages + expedition slugs
   - /app/robots.ts allows all, points to sitemap

When done, show me all 4 files + integration in root layout + example OG image route, then stop.
```

### P6.2 · Accessibility pass

```
Perform comprehensive A11y pass across the site. Target WCAG 2.2 AA.

Checklist (fix each):

1. All interactive elements have focus-visible outlines
   - Apply globally: *:focus-visible { outline: 2px solid #C02B0A; outline-offset: 2px; }
   - Remove any :focus { outline: none } without a visible replacement

2. All images have alt text:
   - Decorative: alt=""
   - Content: descriptive alt (check /public/images/ — add alt metadata if missing)

3. All buttons/links have discernible text:
   - Icon-only buttons: aria-label
   - Compass cursor: aria-hidden="true"
   - Play buttons: aria-label="Play expedition video"

4. Keyboard navigation:
   - All CTAs reachable via Tab
   - FeaturedExpeditions horizontal scroll: arrow keys navigate
   - MasterMap: Tab cycles through route legend links
   - TrailMap3D: expand button is focusable, expanded mode is keyboard-navigable

5. Skip links:
   - Add <SkipToContent /> in root layout, visible only on focus

6. ARIA landmarks:
   - <nav> for navigation
   - <main id="main"> wrapping page content
   - <footer>

7. Color contrast verification:
   - All text meets 4.5:1 on its background
   - Flag and fix any overline or body text on bsa-granito background (granito is mid-value, may fail)

8. Semantic HTML:
   - Headings in logical order per page (no skipping h1 → h3)
   - <time> for dates
   - <address> for contact info

9. Reduced motion:
   - Verify all animations check prefers-reduced-motion
   - Hero videos should NOT autoplay when reduced motion is set — show poster instead
   - TrailMap3D has reduced-motion fallback (already in P4.2)

10. Screen reader test:
    - Run through home with VoiceOver (Mac) or NVDA (Windows)
    - Ensure all content is accessible
    - Custom cursor doesn't interfere

Use axe DevTools + Lighthouse A11y score — target 100.

When done, show me the list of changes made + screenshot of Lighthouse A11y score 100, then stop.
```

### P6.3 · Performance optimization

```
Optimize for Core Web Vitals. Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms.

Tasks:

1. Image pipeline:
   - Convert all /public/images/*.jpg to AVIF (primary) + WebP (fallback) using sharp (or vercel's built-in OptimizedImage)
   - Every <Image /> uses correct `sizes` attribute based on its grid column
   - Add `priority` to home hero poster, LCP candidates
   - Add LQIP (low-quality image placeholder) as blurDataURL on above-fold images

2. Video optimization:
   - All hero videos: preload="metadata" (not "auto")
   - Show poster image immediately, video starts playing after LCP fires
   - Use intersection observer — load video source only when section enters viewport (bottom margin 200px)
   - Pause video when section exits viewport

3. Font optimization:
   - All @fontsource imports have font-display: swap
   - Preload critical fonts in head: satoshi-400, gambarino-400
   - Subset fonts to latin only (remove cyrillic/greek/vietnamese)

4. JavaScript:
   - mapbox-gl lazy-loaded via next/dynamic(..., { ssr: false }) — only on pages that need it
   - photoswipe lazy-loaded on first gallery click
   - three.js only loaded when ambient WebGL actually renders (observer-based)
   - Verify bundle size: home < 150KB gzipped, expedition page < 250KB gzipped (excluding mapbox which is route-specific)

5. Code splitting:
   - Ensure proper next/dynamic usage for heavy components
   - Avoid importing whole framer-motion at layout level — use LazyMotion

6. CSS:
   - Purge unused Tailwind with proper content paths
   - Critical CSS is inlined by Next 15 by default

7. Caching headers:
   - /public/images/*: Cache-Control: public, max-age=31536000, immutable
   - /public/videos/*: same
   - /api/contact: no-cache
   - HTML: s-maxage=3600, stale-while-revalidate=86400

8. Third-party:
   - Plausible analytics via <script async> at end of body
   - NO Google Tag Manager, no Hotjar, no Facebook Pixel (respect user privacy, keep bundle small)

Run Lighthouse Performance + Pagespeed Insights. Target: Perf 95+, all CWV green.

When done, report: current LCP, CLS, INP + bundle sizes + any remaining optimizations, then stop.
```

### P6.4 · Final polish + deployment

```
Final pre-launch pass and deployment setup.

Tasks:

1. 404 page at /app/not-found.tsx:
   - Display hero "Off the map."
   - Body: "The route you're looking for doesn't exist. Let us redirect you."
   - CTA: "Back to home"
   - Background: compass rose SVG, scale 500px, opacity 0.08, centered

2. Loading states:
   - /app/loading.tsx — generic page loader (compass rotating slowly)
   - Specific loading states for dynamic routes (expedition slug)

3. Error boundary:
   - /app/error.tsx — error page with "Something went sideways." + retry button

4. Favicon + PWA icons:
   - Create favicon.ico (compass rose simplified)
   - apple-touch-icon 180x180
   - manifest.json with name, short_name, theme_color (bsa-pinheiro), background_color (bsa-papel)

5. Vercel deployment config:
   - vercel.json with regions set to iad1, sfo1
   - Ensure all env vars are set: NEXT_PUBLIC_MAPBOX_TOKEN, RESEND_API_KEY, NEXT_PUBLIC_WHATSAPP_NUMBER
   - Domain: bigskyatlas.co (fictional)

6. Final QA checklist:
   - Test all 5 expedition pages render correctly
   - Test all filters on /expeditions
   - Test contact form submission (and rate limit)
   - Test WhatsApp deeplink opens correctly on mobile
   - Test reduced-motion on every page
   - Test dark mode compat (should always be bsa-papel default — no system dark mode)
   - Test keyboard navigation through entire site
   - Test all transitions trigger correctly
   - Smoke test on Safari, Chrome, Firefox, Mobile Safari, Chrome Android

7. Portfolio delivery:
   - Create /docs/HANDOFF.md with:
     - Overview of the project
     - How to run locally
     - Folder structure explanation
     - Design system overview (link to blueprint)
     - How to add/modify expeditions (MDX file structure)
     - How to swap brand colors (change CSS vars)
     - How to commission custom expeditions (edit content/expeditions/)

8. Git cleanup:
   - Squash commits into logical groups
   - Clear README.md with screenshots + setup instructions + brand info
   - Push to EOSYS portfolio repository

When done, show me HANDOFF.md + README.md + deployment URL + final Lighthouse scores, then stop.
```

---

## Considerações finais para Eduardo

**Tempo estimado de execução**: 40-60 horas de trabalho do Claude Code, dependendo da profundidade de cada prompt. O Lote 4 (mapa 3D) é o mais demorado — esperar 8-12h só nele.

**Ordem sugerida de conferência**:
1. Após Lote 1: ver se o chrome (nav/footer/cursor/transições) funciona em uma página dummy
2. Após Lote 2: ter os tokens tipográficos + primitives testados
3. Após Lote 3: testar expedition card + gallery isoladamente em /_demo
4. Após Lote 4: testar o mapa 3D — é o componente de maior risco
5. Após Lote 5: ver as páginas compostas
6. Após Lote 6: deploy + pagespeed verification

**Quando algo derrapar**: se um prompt não produzir o esperado, peça ao Claude Code para "retry with focus on X" em vez de refazer do zero. E consulte os arquivos /references/ (DNA JSONs) + /docs/bsa-blueprint.json para resolver ambiguidades.

**Iteração**: cada prompt tem margem para ajuste. Se o hero não ficou "grande o suficiente", peça para aumentar display-hero clamp para 220px desktop. Se o motion está "too fast", ajuste a variável em globals.css.

**Go live**: quando rodar `pnpm build` sem warnings, `pnpm start` localmente e Lighthouse estiver 95+/100/100/100 (Perf/A11y/Best/SEO), está pronto para o portfólio.

---

**Fim do playbook.** Boa expedição. 🏔️
