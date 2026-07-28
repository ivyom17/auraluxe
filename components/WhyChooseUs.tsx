"use client";

import Reveal from "./Reveal";

const points = [
  {
    title: "Obsessive craftsmanship",
    desc: "Every pixel, interaction and process reviewed to a standard most teams don't know exists.",
  },
  {
    title: "Radical transparency",
    desc: "Live dashboards, weekly syncs, and zero surprises — you always know exactly where things stand.",
  },
  {
    title: "Elite bench strength",
    desc: "Senior-only teams drawn from the world's most demanding product and engineering cultures.",
  },
  {
    title: "Outcomes, not hours",
    desc: "We're compensated on impact delivered — our incentives are permanently aligned with yours.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative z-10 py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <svg viewBox="0 0 600 600" className="w-[140%] max-w-none">
          <defs>
            <linearGradient id="morphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c5cff" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#e879f9" />
            </linearGradient>
          </defs>
          <path fill="url(#morphGrad)" opacity="0.15">
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="
                M300,80 C420,80 520,180 520,300 C520,420 420,520 300,520 C180,520 80,420 80,300 C80,180 180,80 300,80 Z;
                M300,60 C440,100 540,200 500,320 C460,440 340,540 220,500 C100,460 60,320 100,200 C140,80 260,20 300,60 Z;
                M300,80 C420,80 520,180 520,300 C520,420 420,520 300,520 C180,520 80,420 80,300 C80,180 180,80 300,80 Z
              "
            />
          </path>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div>
            <span className="text-xs tracking-[0.3em] text-aurora-magenta uppercase mb-4 block">
              Why Choose Us
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-white mb-8 leading-tight">
              Built for clients who
              <span className="italic text-gradient block">expect the exceptional.</span>
            </h2>
            <p className="text-ink-300 text-lg leading-relaxed max-w-lg">
              We're not a vendor — we're an extension of your team, held to a
              standard shaped by the world's most demanding brands.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} y={40}>
              <div
                data-cursor-hover
                className="glass-card rounded-2xl p-7 h-full hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="w-9 h-9 rounded-full glass flex items-center justify-center text-aurora-gold mb-5 text-sm font-display">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-xl text-white mb-2">{p.title}</h3>
                <p className="text-ink-300 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
