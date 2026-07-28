"use client";

import Reveal from "./Reveal";

const reviews = [
  {
    quote:
      "The level of polish is unlike anything we've worked with. It feels less like a vendor relationship and more like acquiring a superpower.",
    name: "Amara Chen",
    role: "CEO, Northlight Capital",
  },
  {
    quote:
      "Every deliverable looked like it belonged at a keynote. Our board asked who built it — twice.",
    name: "Julian Voss",
    role: "COO, Meridian Group",
  },
  {
    quote:
      "Ruthlessly organized, quietly brilliant. They anticipated problems we hadn't even framed yet.",
    name: "Priya Anand",
    role: "VP Product, Solace Labs",
  },
  {
    quote:
      "This is what 'premium' is supposed to mean. Fast, exacting, and somehow still warm to work with.",
    name: "Marcus Reyes",
    role: "Founder, Lumen Studio",
  },
];

const logos = ["NORTHLIGHT", "MERIDIAN", "SOLACE", "LUMEN", "VANTAGE", "ORBITAL", "HALCYON"];

export default function Reviews() {
  return (
    <section id="reviews" className="relative z-10 py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <Reveal>
          <div className="text-center">
            <span className="text-xs tracking-[0.3em] text-aurora-gold uppercase mb-4 block">
              Trusted By Leaders
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-white">
              Loved by teams who
              <span className="italic text-gradient"> demand more.</span>
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="relative mb-20 overflow-hidden">
        <div className="marquee-track">
          {[...logos, ...logos].map((l, i) => (
            <span
              key={i}
              className="mx-10 text-2xl font-display italic text-white/20 whitespace-nowrap"
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        {reviews.map((r, i) => (
          <Reveal key={r.name} delay={(i % 2) * 0.1} y={40}>
            <div
              data-cursor-hover
              className="glass-card rounded-3xl p-8 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-5 text-aurora-gold">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                    </svg>
                  ))}
                </div>
                <p className="font-display text-xl md:text-2xl text-white leading-snug italic">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-aurora-violet to-aurora-cyan flex items-center justify-center text-sm font-medium text-white">
                  {r.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{r.name}</div>
                  <div className="text-ink-500 text-xs">{r.role}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
