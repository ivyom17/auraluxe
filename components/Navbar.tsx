"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const links = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const lenis = (window as any).__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -40, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <motion.nav
        animate={{
          width: scrolled ? "min(880px, 94vw)" : "min(1180px, 96vw)",
          paddingTop: scrolled ? 10 : 16,
          paddingBottom: scrolled ? 10 : 16,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong rounded-full px-6 flex items-center justify-between"
      >
        <a href="#top" data-cursor-hover className="font-display italic text-xl text-white">
          AURA
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              data-cursor-hover
              onClick={() => scrollTo(l.href)}
              className="text-sm text-ink-300 hover:text-white transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-aurora-cyan transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <MagneticButton
            variant="ghost"
            className="!px-5 !py-2.5 !text-xs"
            onClick={() => scrollTo("#contact")}
          >
            Request a Service
          </MagneticButton>
        </div>

        <button
          data-cursor-hover
          className="md:hidden text-white w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-6 bg-white transition-transform ${
              open ? "rotate-45 translate-y-[3px]" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-white transition-transform ${
              open ? "-rotate-45 -translate-y-[3px]" : ""
            }`}
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="glass-strong fixed top-24 left-4 right-4 rounded-3xl p-6 flex flex-col gap-4 md:hidden"
          >
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => {
                  scrollTo(l.href);
                  setOpen(false);
                }}
                className="text-left text-lg text-ink-100"
              >
                {l.label}
              </button>
            ))}
            <MagneticButton onClick={() => { scrollTo("#contact"); setOpen(false); }}>
              Request a Service
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
