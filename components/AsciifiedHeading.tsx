"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface AsciifiedHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  className?: string;
}

// Curated Physics & Mathematical characters
const PHYSICS_MATH_SYMBOLS = [
  "∂",
  "∇",
  "∫",
  "∑",
  "∆",
  "λ",
  "ψ",
  "ħ",
  "0",
  "1",
  "π",
  "Ω",
  "μ",
  "∞",
  "√",
  "≈",
  "±",
  "×",
  "ϕ",
  "θ",
];

interface LetterState {
  originChar: string;
  char: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
}

export default function AsciifiedHeading({
  text,
  as: Tag = "h1",
  className = "",
}: AsciifiedHeadingProps) {
  const containerRef = useRef<HTMLElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animFrameId = useRef<number | null>(null);

  const lettersRef = useRef<LetterState[]>([]);

  // Initialize or re-initialize letters when text changes
  lettersRef.current = text.split("").map((c, i) => {
    const existing = lettersRef.current[i];
    if (existing && existing.originChar === c) {
      return existing;
    }
    return {
      originChar: c,
      char: c,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      rotation: 0,
      rotSpeed: 0,
    };
  });

  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    prevX: -9999,
    prevY: -9999,
    vx: 0,
    vy: 0,
    active: false,
  });

  const updateSimulation = useCallback(() => {
    // Respect reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const mouse = mouseRef.current;
    mouse.vx *= 0.8;
    mouse.vy *= 0.8;

    // Smoothed spring parameters
    const INTERACTION_RADIUS = 95;
    const REPEL_FORCE = 8.5;
    const SPRING_K = 0.038;
    const DAMPING = 0.89;
    const ANGULAR_SPRING = 0.04;

    let anyMoving = false;

    lettersRef.current.forEach((p, idx) => {
      if (p.originChar === " ") return;

      const span = spanRefs.current[idx];
      if (!span) return;

      // 1. Cursor Repulsion (Scatter into zero-g)
      if (mouse.active) {
        const rect = span.getBoundingClientRect();
        const letterX = rect.left + rect.width / 2;
        const letterY = rect.top + rect.height / 2;

        const dx = letterX - mouse.x;
        const dy = letterY - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < INTERACTION_RADIUS && dist > 0) {
          const factor = 1 - dist / INTERACTION_RADIUS;
          const force = factor * REPEL_FORCE;
          const angle = Math.atan2(dy, dx);

          // Radial repulsion
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;

          // Momentum transfer from cursor speed
          p.vx += mouse.vx * factor * 0.2;
          p.vy += mouse.vy * factor * 0.2;

          p.rotSpeed += (Math.random() - 0.5) * factor * 0.15;
        }
      }

      // 2. Smooth Magnetic Spring Snap back to origin (0, 0)
      const springForceX = -p.x * SPRING_K;
      const springForceY = -p.y * SPRING_K;
      p.vx = (p.vx + springForceX) * DAMPING;
      p.vy = (p.vy + springForceY) * DAMPING;

      p.x += p.vx;
      p.y += p.vy;

      // Smooth angular decay back to upright
      p.rotSpeed = (p.rotSpeed - p.rotation * ANGULAR_SPRING) * DAMPING;
      p.rotation += p.rotSpeed;

      const distFromHome = Math.hypot(p.x, p.y);
      const speed = Math.hypot(p.vx, p.vy);

      // 3. Morph to Physics/Math glyphs when scattered; return to original letter near home
      if (distFromHome > 12) {
        if (p.char === p.originChar || Math.random() < 0.08) {
          p.char =
            PHYSICS_MATH_SYMBOLS[
              Math.floor(Math.random() * PHYSICS_MATH_SYMBOLS.length)
            ];
          span.textContent = p.char;
        }
        span.style.textShadow = "0 0 10px rgba(98, 182, 203, 0.5)";
        span.style.opacity = "0.95";
      } else {
        // As it approaches home (< 12px), lock back to original letter for a clean landing
        if (p.char !== p.originChar) {
          p.char = p.originChar;
          span.textContent = p.char;
        }
        span.style.textShadow = "";
        span.style.opacity = "1";
      }

      // 4. Settling check: cleanly snap to resting state when near zero
      if (distFromHome < 0.2 && speed < 0.1) {
        p.x = 0;
        p.y = 0;
        p.vx = 0;
        p.vy = 0;
        p.rotation = 0;
        p.rotSpeed = 0;
        if (p.char !== p.originChar) {
          p.char = p.originChar;
          span.textContent = p.char;
        }
        span.style.transform = "";
      } else {
        anyMoving = true;
        span.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) rotate(${p.rotation.toFixed(3)}rad)`;
      }
    });

    if (anyMoving || mouse.active) {
      animFrameId.current = requestAnimationFrame(updateSimulation);
    } else {
      animFrameId.current = null;
    }
  }, []);

  const wakeLoop = useCallback(() => {
    if (!animFrameId.current) {
      animFrameId.current = requestAnimationFrame(updateSimulation);
    }
  }, [updateSimulation]);

  const onMouseMove = (e: React.MouseEvent) => {
    const mouse = mouseRef.current;
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

    wakeLoop();
  };

  const onMouseLeave = () => {
    mouseRef.current.active = false;
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
    mouseRef.current.vx = 0;
    mouseRef.current.vy = 0;
    wakeLoop();
  };

  useEffect(() => {
    const handleGlobalLeave = () => {
      mouseRef.current.active = false;
      wakeLoop();
    };

    window.addEventListener("mouseleave", handleGlobalLeave);
    return () => {
      window.removeEventListener("mouseleave", handleGlobalLeave);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [wakeLoop]);

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-label={text}
      className={`select-text cursor-pointer transition-colors inline-block ${className}`}
      title="Hover to scatter"
    >
      {lettersRef.current.map((item, idx) => {
        if (item.originChar === " ") {
          return <span key={idx}>&nbsp;</span>;
        }

        return (
          <span
            key={idx}
            ref={(el) => {
              spanRefs.current[idx] = el;
            }}
            className="inline-block will-change-transform select-none"
            style={{
              display: "inline-block",
              transformOrigin: "center center",
            }}
          >
            {item.originChar}
          </span>
        );
      })}
    </Tag>
  );
}
