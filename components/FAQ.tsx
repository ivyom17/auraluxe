"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "What makes your process different?",
    a: "We combine senior-only delivery teams with radical transparency — live dashboards, weekly syncs, and a single accountable lead — so quality never depends on luck.",
  },
  {
    q: "How quickly can we get started?",
    a: "Most engagements kick off within 5–7 business days of your discovery call, with a full blueprint delivered in the first two weeks.",
  },
  {
    q: "Do you work with early-stage companies?",
    a: "Yes — while many of our clients are established brands, we selectively partner with ambitious early-stage teams who value craft over shortcuts.",
  },
  {
    q: "What does pricing look like?",
    a: "Engagements are scoped around outcomes, not hours. After discovery, you'll receive a fixed-scope proposal with transparent milestones.",
  },
  {
    q: "Can I request ongoing support after launch?",
    a: "Absolutely — our concierge desk offers 24/7 coverage with dedicated response-time SLAs for retained clients.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative z-10 py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.3em] text-aurora-cyan uppercase mb-4 block">
              FAQ
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-white">
              Questions, <span className="italic text-gradient">answered.</span>
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05} y={30}>
                <div
                  data-cursor-hover
                  className="glass-card rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <div className="flex items-center justify-between p-6">
                    <h3 className="font-display text-lg md:text-xl text-white pr-6">{f.q}</h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="shrink-0 w-8 h-8 rounded-full glass flex items-center justify-center text-white"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 text-ink-300 text-sm leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
