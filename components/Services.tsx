"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import Reveal from "./Reveal";

const services = [
  {
    title: "Strategic Consulting",
    desc: "Executive-level advisory that turns ambiguity into a decisive, board-ready roadmap.",
    icon: "M12 2l3 7 7 1-5.5 5 1.5 7-6-3.5L6 22l1.5-7L2 10l7-1z",
  },
  {
    title: "Product Engineering",
    desc: "Full-stack build teams shipping resilient, elegant software at world-class velocity.",
    icon: "M4 4h16v16H4zM4 9h16M9 4v16",
  },
  {
    title: "Brand & Experience",
    desc: "Identity systems and interfaces crafted with the precision of a luxury atelier.",
    icon: "M12 3a9 9 0 100 18 9 9 0 000-18zm0 5v4l3 3",
  },
  {
    title: "Growth Infrastructure",
    desc: "Performance marketing and data systems engineered to compound, not just convert.",
    icon: "M3 17l6-6 4 4 8-8M21 7h-6v6",
  },
  {
    title: "Security & Compliance",
    desc: "Enterprise-grade protection woven into every layer, invisible until it matters most.",
    icon: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z",
  },
  {
    title: "Concierge Support",
    desc: "A dedicated white-glove desk, on call around the clock for mission-critical moments.",
    icon: "M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  },
];

function TiltCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: x * 14,
      rotateX: -y * 14,
      duration: 0.5,
      ease: "power3.out",
      transformPerspective: 800,
    });
  }

  function onLeave() {
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1,0.5)" });
  }

  return (
    <Reveal delay={(i % 3) * 0.1} y={50}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor-hover
        className="glow-card glass-card rounded-3xl p-8 h-full flex flex-col gap-6 animate-float will-change-transform"
        style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${6 + (i % 3)}s` }}
      >
        <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-aurora-cyan">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d={s.icon}
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-display text-2xl text-white mb-3">{s.title}</h3>
          <p className="text-ink-300 text-sm leading-relaxed">{s.desc}</p>
        </div>
        <div className="mt-auto flex items-center gap-2 text-sm text-aurora-cyan opacity-0 group-hover:opacity-100">
          Learn more
        </div>
      </div>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative z-10 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-xs tracking-[0.3em] text-aurora-cyan uppercase mb-4">
              Capabilities
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-white max-w-2xl">
              Every service, <span className="italic text-gradient">engineered</span> to
              perform.
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <TiltCard key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
