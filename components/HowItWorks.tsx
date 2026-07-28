"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Reveal from "./Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    n: "01",
    title: "Discovery",
    desc: "We map your goals, constraints, and definition of success with forensic precision.",
  },
  {
    n: "02",
    title: "Blueprint",
    desc: "A tailored roadmap with milestones, resourcing, and clear success metrics.",
  },
  {
    n: "03",
    title: "Execution",
    desc: "Senior teams build in tight, transparent sprints — you see progress in real time.",
  },
  {
    n: "04",
    title: "Elevation",
    desc: "We launch, measure, and continuously refine — because premium never stops improving.",
  },
];

export default function HowItWorks() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-24">
            <span className="text-xs tracking-[0.3em] text-aurora-violet uppercase mb-4 block">
              How It Works
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-white">
              A process built for
              <span className="italic text-gradient"> zero friction.</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-aurora-violet via-aurora-cyan to-aurora-magenta"
            />
          </div>

          <div className="flex flex-col gap-16">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={0.05} y={50}>
                <div
                  className={`relative flex items-center gap-8 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`hidden md:block md:w-1/2 ${
                      i % 2 === 0 ? "text-right pr-14" : "text-left pl-14"
                    }`}
                  >
                    <div className="font-display italic text-6xl text-white/10">{s.n}</div>
                  </div>

                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-void border-2 border-aurora-cyan animate-pulse-glow z-10" />

                  <div
                    data-cursor-hover
                    className={`glass-card rounded-2xl p-7 ml-16 md:ml-0 md:w-1/2 ${
                      i % 2 === 0 ? "md:pl-14" : "md:pr-14"
                    }`}
                  >
                    <span className="md:hidden font-display italic text-3xl text-white/20">
                      {s.n}
                    </span>
                    <h3 className="font-display text-2xl text-white mt-2 mb-2">{s.title}</h3>
                    <p className="text-ink-300 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
