# AURA — Premium Cinematic Website

A billion-dollar-startup-grade marketing site built with Next.js 14 (App Router),
TypeScript, Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, Three.js /
React Three Fiber, and Lenis smooth scroll.

## Quickstart

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production build:

```bash
npm run build
npm start
```

## Architecture

- `app/layout.tsx` — mounts fonts (Fraunces display + Inter sans), the aurora
  background, custom cursor, cinematic loader, and the Lenis smooth-scroll
  provider around all page content.
- `app/globals.css` — design-system primitives: `.glass` / `.glass-card`
  (glassmorphism), `.text-gradient` (animated gradient text), `.btn-liquid`
  (liquid hover fill), custom scrollbar, cursor styles, grain overlay.
- `components/Loader.tsx` — GSAP-driven percentage counter with a two-panel
  curtain wipe reveal.
- `components/AuroraBackground.tsx` — fixed-position layer with three blurred
  gradient blobs animated via GSAP, a canvas particle field, and a subtle
  grid mask — sits behind all content at `z-0`.
- `components/HeroScene.tsx` — React Three Fiber scene: a distorted
  icosahedron core (`MeshDistortMaterial`), floating octahedron shards,
  two rotating torus rings, drei `Sparkles`, and a mouse-parallax camera rig.
  Dynamically imported with `ssr:false` in `Hero.tsx`.
- `components/Hero.tsx` — cinematic staggered headline reveal (timed to
  finish after the loader), magnetic CTAs, live stats, GSAP parallax on
  scroll.
- `components/Services.tsx` — floating glass cards with per-card 3D tilt
  driven by pointer position (GSAP `rotateX/rotateY`).
- `components/WhyChooseUs.tsx` — animated morphing SVG blob background +
  glass stat cards.
- `components/HowItWorks.tsx` — vertical timeline with a scroll-scrubbed
  gradient progress line (GSAP ScrollTrigger `scrub`).
- `components/Reviews.tsx` — infinite CSS marquee of client wordmarks +
  glass testimonial cards.
- `components/FAQ.tsx` — accordion with Framer Motion height/opacity
  animation.
- `components/Contact.tsx` — the **Request a Service** form (Name, Phone,
  City, Email, Service Needed dropdown, Description), with client-side
  validation, a loading state, and an animated success state. Replace the
  `setTimeout` in `handleSubmit` with a real POST to your backend or an
  API route (`app/api/request-service/route.ts`).
- `components/MagneticButton.tsx` / `components/Reveal.tsx` — shared
  primitives: magnetic-follow buttons and scroll-triggered fade/rise
  wrappers used throughout every section.

## Notes for production

- Wire `Contact.tsx`'s `handleSubmit` to a real endpoint (Next.js Route
  Handler, or a service like Resend/Formspree/your CRM).
- The loader currently blocks scroll for ~3.2s total; tune the GSAP
  timeline duration in `Loader.tsx` to taste.
- `HeroScene.tsx` is tuned for a `dpr` cap of 1.8 and a modest particle/
  shard count to stay smooth on mid-range laptops — raise counts only
  after profiling on target devices.
- All interactive elements carry `data-cursor-hover` so the custom cursor
  enlarges on hover; add this attribute to any new clickable element.
- Cursor is disabled automatically on touch/coarse-pointer devices.
