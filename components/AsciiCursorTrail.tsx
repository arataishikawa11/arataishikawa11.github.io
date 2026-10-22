/**
 * Global ASCII Cursor Trail
 * Powered by asciify.org (https://asciify.org)
 * Uses asciify-engine/kit
 */

"use client";

import { useEffect } from "react";

export default function AsciiCursorTrail() {
  useEffect(() => {
    // Respect reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Only enable on devices with fine pointer (mouse/trackpad), not touch
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    let trailHandle: { destroy: () => void } | null = null;

    import("asciify-engine/kit")
      .then(({ cursorTrail }) => {
        trailHandle = cursorTrail({
          style: "trail",
          ink: "#62B6CB", // Pacific Teal matching the cursor halo (--accent)
          charset: " .:-=+*#%@",
          cellSize: 8,
          life: 800,
          zIndex: 35, // Floats above main content (z-10), below sticky header (z-40) and cursor halo
        });
      })
      .catch((err) => {
        console.warn("Failed to mount Asciify cursorTrail:", err);
      });

    return () => {
      trailHandle?.destroy();
    };
  }, []);

  return null;
}
