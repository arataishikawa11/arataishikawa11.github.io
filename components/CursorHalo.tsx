"use client";

import { useEffect, useRef } from "react";

// iPad-pointer-style cursor: a soft translucent circle that replaces the
// native cursor on fine pointer devices. The circle smoothly expands and
// darkens when hovering interactive elements or when shaken rapidly.

// Shake-to-find parameters
const SHAKE_REVERSALS = 4; // Horizontal direction flips that count as a shake
const SHAKE_WINDOW = 800;  // ms window the flips must land in
const SHAKE_MIN_SEG = 24;  // px each swing must travel to count
const SHAKE_HOLD = 450;    // ms the emphasized state lingers after a shake

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

export default function CursorHalo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only hide the native cursor once JS is active
    document.body.classList.add("cursor-halo");

    let hovering = false;
    let shakeUntil = 0;
    let clearTimer: ReturnType<typeof setTimeout> | null = null;

    // Shake detection tracking
    let lastX = 0;
    let lastDir = 0;
    let segLen = 0;
    let flips: number[] = [];

    const setBig = () =>
      el.classList.toggle("cursor-halo--big", hovering || performance.now() < shakeUntil);

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      el.classList.add("cursor-halo--visible");
      hovering = !!(e.target as Element | null)?.closest?.(INTERACTIVE);

      const dx = e.clientX - lastX;
      const dir = Math.sign(dx);
      if (dir !== 0) {
        if (dir === lastDir || lastDir === 0) {
          segLen += Math.abs(dx);
        } else {
          if (segLen >= SHAKE_MIN_SEG) {
            const now = performance.now();
            flips = [...flips.filter((t) => now - t < SHAKE_WINDOW), now];
            if (flips.length >= SHAKE_REVERSALS) {
              shakeUntil = now + SHAKE_HOLD;
              if (clearTimer) clearTimeout(clearTimer);
              clearTimer = setTimeout(setBig, SHAKE_HOLD + 20);
            }
          }
          segLen = Math.abs(dx);
        }
        lastDir = dir;
      }
      lastX = e.clientX;
      setBig();
    };

    const hide = () => el.classList.remove("cursor-halo--visible");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      if (clearTimer) clearTimeout(clearTimer);
      document.body.classList.remove("cursor-halo");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return <div ref={ref} className="cursor-halo-dot" aria-hidden />;
}
