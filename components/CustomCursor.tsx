"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const ringPos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    const quickDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const quickDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const quickRingX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const quickRingY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      quickDotX(mouse.x);
      quickDotY(mouse.y);
      quickRingX(mouse.x);
      quickRingY(mouse.y);
    }

    function onOver(e: Event) {
      const target = e.target as HTMLElement;
      
      if (!ring) return;
      
      if (target.closest("[data-cursor-hover]")) {
        ring.classList.add("hovering");
      }
    }
    function onOut(e: Event) {
      const target = e.target as HTMLElement;
      
      if (!ring) return;
      
      if (target.closest("[data-cursor-hover]")) {
        ring.classList.remove("hovering");
      }
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
