"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const lenis = (window as any).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -40, duration: 1.4 });
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-parallax-layer",
        { yPercent: 0 },
        {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
      gsap.fromTo(
        ".hero-canvas-layer",
        { yPercent: 0, opacity: 1 },
        {
          yPercent: 15,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-32 pb-20"
    >
      <div className="hero-canvas-layer absolute inset-0 z-0">
        <HeroScene />
      </div>

      <div className="hero-parallax-layer relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.9, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-aurora-cyan animate-pulse-glow" />
            <span className="text-xs tracking-wide text-ink-300">
              Now onboarding for 2026
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 3.0, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[13vw] leading-[0.95] md:text-[6.2vw] tracking-tight text-white"
            >
              Engineering
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 3.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display italic text-[13vw] leading-[0.95] md:text-[6.2vw] tracking-tight text-gradient"
            >
              tomorrow&rsquo;s
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 3.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[13vw] leading-[0.95] md:text-[6.2vw] tracking-tight text-white"
            >
              standard.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 3.6 }}
            className="mt-8 max-w-lg text-lg text-ink-300 leading-relaxed"
          >
            We design and deliver premium services with obsessive precision —
            blending cinematic craft, elite engineering, and white-glove
            execution for clients who refuse to settle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 3.8 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <MagneticButton onClick={() => scrollTo("#contact")}>
              Request a Service
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => scrollTo("#services")}>
              Explore Services
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 4.1 }}
            className="mt-16 flex items-center gap-8 text-ink-500"
          >
            <div>
              <div className="font-display text-3xl text-white">240+</div>
              <div className="text-xs tracking-wide">Elite deployments</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <div className="font-display text-3xl text-white">99.9%</div>
              <div className="text-xs tracking-wide">Client retention</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <div className="font-display text-3xl text-white">24/7</div>
              <div className="text-xs tracking-wide">Concierge desk</div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-ink-500 uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}
