"use client";

import { useRef, MouseEvent, ReactNode } from "react";
import gsap from "gsap";
import clsx from "clsx";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  strength?: number;
  type?: "button" | "submit";
}

export default function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = "primary",
  strength = 0.4,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  function handleMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  }

  function handleLeave() {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-medium text-sm tracking-wide transition-colors duration-300";

  const styles =
    variant === "primary"
      ? "btn-liquid bg-white text-void border border-white/10"
      : "glass text-white hover:border-white/30";

  const Comp: any = href ? "a" : "button";

  return (
    <Comp
      ref={ref}
      href={href}
      type={href ? undefined : type}
      onClick={onClick}
      data-cursor-hover
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={clsx(base, styles, className)}
    >
      {children}
    </Comp>
  );
}
