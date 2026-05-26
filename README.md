# Big Sky Atlas

> Boutique expedition agency for the Northern Rockies — portfolio project by [EOSYS](https://eosys.com.br).

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

---

## About

**Big Sky Atlas** is a fictional luxury expedition agency based in Jackson Hole, Wyoming. This project was built as a portfolio piece to demonstrate advanced front-end techniques — editorial design, scroll-driven animations, and a cohesive design system — using a modern Next.js stack.

The site covers five expedition routes across Montana and Wyoming, with dedicated pages for each trail.

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero video, expedition accordion, philosophy, testimonials |
| `/expeditions` | Trail listing with video cards (Bighorn, Beartooth, more) |
| `/expeditions/[slug]` | Individual trail detail pages |
| `/ethos` | Brand story — guides, principles, stats, manifesto |
| `/contact` | Contact form with animations |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| Animation | GSAP 3 + ScrollTrigger · Framer Motion · Lenis |
| Fonts | Gambarino · Satoshi · Khand (Fontshare) |
| Forms | Zod schema validation |
| Email | Resend (optional — not required for portfolio) |
| Deploy | Vercel |

---

## Design System

```css
--papel:       #FAF8F4   /* global background    */
--brasa:       #C02B0A   /* primary accent       */
--lanterna:    #F6C67F   /* warm secondary       */
--noite:       #1A2638   /* dark blue            */
--carvao:      #141414   /* near black / text    */
--granito:     #A8ADA7   /* muted grey           */
--pinheiro:    #2A3820   /* footer / forest green*/
```

**Typography:**
- `Gambarino` — display headings, pull quotes (`letter-spacing: -0.04em`)
- `Satoshi` — body, nav, UI
- `Khand` — labels, overlines, counters (uppercase)

---

## Animations

All animations use **vanilla JS** (IntersectionObserver + requestAnimationFrame) except for GSAP stacking cards on `/ethos`.

| Effect | Page | Technique |
|---|---|---|
| Slide-swap hover | `/contact` hero | CSS `::before/::after` + `translate3d` |
| Typing reveal | `/contact` labels | `IntersectionObserver` + `steps(N)` scoped style injection |
| Slot-machine scramble | `/contact` WhatsApp | `requestAnimationFrame` on hover |
| Stacking cards | `/ethos` principles | GSAP ScrollTrigger |
| Count-up stats | `/ethos` | `requestAnimationFrame` + `easeOutExpo` |
| Fit-text | `/ethos` manifesto | Binary search `fontSize` + ResizeObserver |
| Strike-through | `/ethos` manifesto | CSS transition + IntersectionObserver |
| Parallax ghost | `/ethos` stats | Scroll listener + `translateY` |

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev
# → http://localhost:3000
```

> **Note:** No `.env.local` required for portfolio use. The contact form is simulated (no real API call). To enable email sending, copy `.env.local.example` to `.env.local` and fill in your Resend credentials.

---

## Project Structure

```
app/
├── (marketing)/          # Home page (own layout)
├── (app)/                # Main routes (Nav + Footer)
│   ├── expeditions/
│   │   └── [slug]/       # Dynamic trail pages
│   ├── ethos/
│   └── contact/
├── api/contact/          # Email route (Resend — optional)
└── layout.tsx            # Root layout with global providers

components/
├── blocks/               # Nav, Footer, Cards, Timeline
├── features/             # Lenis, Cursor, Transitions
└── ui/                   # Button, Typography, Section

styles/
├── globals.css
├── ethos.css
├── expeditions.css
└── contact.css
```

---

## Portfolio Context

This project was designed and developed by **EOSYS** as a showcase piece demonstrating:

- Editorial web design with a luxury hospitality aesthetic
- Complex CSS animations without heavy libraries
- Next.js App Router patterns (route groups, nested layouts, SSG)
- A scalable design system with consistent tokens

---

*Big Sky Atlas · EOSYS Portfolio · 2026*
