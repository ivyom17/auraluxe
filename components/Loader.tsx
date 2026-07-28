"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelTop = useRef<HTMLDivElement>(null);
  const panelBottom = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const counter = { value: 0 };

    const tl = gsap.timeline({
      onUpdate: () => setProgress(Math.floor(counter.value)),
      onComplete: () => {
        const exit = gsap.timeline({
          onComplete: () => {
            setDone(true);
            document.body.style.overflow = "";
          },
        });
        exit
          .to(wordRef.current, { opacity: 0, y: -20, duration: 0.5, ease: "power3.in" })
          .to(
            panelTop.current,
            { yPercent: -100, duration: 1.1, ease: "expo.inOut" },
            "-=0.1"
          )
          .to(
            panelBottom.current,
            { yPercent: 100, duration: 1.1, ease: "expo.inOut" },
            "<"
          );
      },
    });

    tl.to(counter, { value: 100, duration: 2.6, ease: "power2.inOut" });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] pointer-events-none">
      <div
        ref={panelTop}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#05050a] flex items-end justify-center overflow-hidden"
      >
        <div className="pb-2 flex items-baseline gap-3">
          <span className="font-display italic text-2xl md:text-4xl text-white/90">AURA</span>
        </div>
      </div>
      <div
        ref={panelBottom}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#05050a] flex items-start justify-center overflow-hidden"
      >
        <div ref={wordRef} className="pt-6 text-center">
          <div className="font-sans text-xs tracking-[0.4em] text-white/40 mb-3 uppercase">
            Loading experience
          </div>
          <div className="font-display text-5xl md:text-7xl text-white tabular-nums">
            {progress}
            <span className="text-lg align-top text-white/50">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
