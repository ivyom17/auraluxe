"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AuroraBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animate the blobs drifting slowly
  useEffect(() => {
    const blobs = wrapRef.current?.querySelectorAll<HTMLDivElement>(".aurora-blob");
    if (!blobs) return;
    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        x: `random(-120, 120)`,
        y: `random(-100, 100)`,
        duration: 14 + i * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  // Particle field on canvas
  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const COUNT = Math.min(90, Math.floor((width * height) / 18000));
    const particles = Array.from({ length: COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.5 + 0.15,
      hue: Math.random() > 0.5 ? "124,92,255" : "34,211,238",
    }));

    let raf: number;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue},${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${p.hue},0.8)`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();

    function onResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={wrapRef} className="aurora-bg">
      <div
        className="aurora-blob"
        style={{
          width: 600,
          height: 600,
          top: "-10%",
          left: "-10%",
          background: "#7c5cff",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          width: 500,
          height: 500,
          top: "10%",
          right: "-5%",
          background: "#22d3ee",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          width: 450,
          height: 450,
          bottom: "-10%",
          left: "20%",
          background: "#e879f9",
          opacity: 0.35,
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 bg-aurora-gradient mix-blend-screen" />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 80%)",
        }}
      />
    </div>
  );
}
