"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  seed: number;
  char: string;
  rotation: number;
  rotationSpeed: number;
}

const COLORS = [
  "rgba(98, 182, 203,",  // #62B6CB Pacific Teal
  "rgba(202, 233, 255,", // #CAE9FF Ice Blue
  "rgba(27, 73, 101,",   // #1B4965 Slate Navy
];

// Curated ASCII character palette fitting academic / CS & antigravity aesthetics
const ASCII_CHARS = [
  "+",
  "*",
  "·",
  "~",
  ":",
  "-",
  "=",
  "^",
  "#",
  "%",
  "&",
  "{",
  "}",
  "[",
  "]",
  "<",
  ">",
  "/",
  "\\",
  "|",
  "0",
  "1",
  "x",
  "o",
  "_",
];

export default function AntigravityParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect reduced motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    // Pointer tracking
    const mouse = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      active: false,
    };

    const REPEL_RADIUS = 160; // Interaction radius around cursor
    const REPEL_FORCE = 3.2;  // Immediate repulsion strength

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      // Internal bitmap resolution (physical device pixels)
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      // Force canvas display dimensions to match CSS viewport pixels exactly
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Scale drawing context so 1 unit = 1 CSS pixel
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density-based count: ~80 particles on desktop, ~40 on mobile
      const count = Math.min(Math.floor((width * height) / 15000), 90);
      particles = [];

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const colorIdx = Math.floor(Math.random() * COLORS.length);
        const colorPrefix = COLORS[colorIdx];

        // Slate Navy has higher opacity so thin ASCII glyph strokes remain crisp
        const baseAlpha =
          colorIdx === 2
            ? 0.55 + Math.random() * 0.35 // 0.55 - 0.90 for navy
            : 0.35 + Math.random() * 0.45; // 0.35 - 0.80 for teal & ice blue

        const char = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
        const size = Math.floor(10 + Math.random() * 6); // 10px - 15px font size

        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -(0.25 + Math.random() * 0.45), // Constant gentle upward drift
          size,
          alpha: baseAlpha,
          baseAlpha,
          color: colorPrefix,
          seed: Math.random() * 1000,
          char,
          rotation: (Math.random() - 0.5) * 0.4, // Initial slight tilt
          rotationSpeed: (Math.random() - 0.5) * 0.006, // Gentle zero-g ambient tumble
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!mouse.active) {
        mouse.prevX = e.clientX;
        mouse.prevY = e.clientY;
      } else {
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.vx = mouse.x - mouse.prevX;
      mouse.vy = mouse.y - mouse.prevY;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Natural decay of cursor velocity when mouse stops
      mouse.vx *= 0.8;
      mouse.vy *= 0.8;

      const t = time * 0.001;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Ambient Zero-Gravity Motion: slow upward float + horizontal swaying
        const sway = Math.sin(t * 0.8 + p.seed) * 0.35;
        p.x += p.vx + sway;
        p.y += p.vy;

        // Gentle ambient rotation
        p.rotation += p.rotationSpeed;

        // 2. Cursor Antigravity Repulsion & Fluid Wake Field
        let cursorInfluence = 0;
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < REPEL_RADIUS && dist > 0) {
            // Linear falloff for immediate, noticeable response at distance
            const factor = 1 - dist / REPEL_RADIUS;
            cursorInfluence = factor;
            const force = factor * REPEL_FORCE;
            const angle = Math.atan2(dy, dx);

            // Radial repulsion pushing outward from cursor
            p.vx += Math.cos(angle) * force * 0.75;
            p.vy += Math.sin(angle) * force * 0.75;

            // Fluid wake momentum transferred from mouse motion
            p.vx += mouse.vx * factor * 0.25;
            p.vy += mouse.vy * factor * 0.25;

            // Subtle orbital swirl around cursor
            p.vx += -Math.sin(angle) * factor * 0.3;
            p.vy += Math.cos(angle) * factor * 0.3;

            // Fluid torque on interaction
            p.rotationSpeed += (Math.random() - 0.5) * factor * 0.02;
          }
        }

        // 3. Friction / Damping back to ambient drift
        p.vx *= 0.92;
        p.vy = p.vy * 0.92 - 0.025; // re-anchor gentle upward float
        p.rotationSpeed *= 0.96; // damp angular speed back toward ambient

        // 4. Screen Wrapping with padding to avoid abrupt character cutoff
        const padding = 24;
        if (p.y < -padding) {
          p.y = height + padding;
          p.x = Math.random() * width;
          p.char = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
        } else if (p.y > height + padding) {
          p.y = -padding;
          p.char = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
        }
        if (p.x < -padding) {
          p.x = width + padding;
        } else if (p.x > width + padding) {
          p.x = -padding;
        }

        // 5. Draw ASCII Character with subtle interaction illumination
        const drawAlpha = Math.min(1, p.baseAlpha + cursorInfluence * 0.25);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `${p.size}px var(--font-plex-mono), "IBM Plex Mono", Menlo, Monaco, Consolas, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `${p.color} ${drawAlpha})`;
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    // Pause on background tabs to conserve battery/GPU
    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animId = requestAnimationFrame(render);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden
    />
  );
}
