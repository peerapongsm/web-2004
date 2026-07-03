"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#ffd447", "#ff6ec7", "#6ec1ff", "#7dffb0", "#ffffff"];
const SPARKLE_CHARS = ["✦", "✧", "★", "☆"];
const THROTTLE_MS = 45;
const MAX_PARTICLES = 40;

/** DOM-particle sparkle trail that follows the mouse. Disabled under prefers-reduced-motion. */
export function SparkleCursor() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastSpawn = 0;

    function handleMove(e: MouseEvent) {
      const now = performance.now();
      if (now - lastSpawn < THROTTLE_MS) return;
      lastSpawn = now;

      const layer = layerRef.current;
      if (!layer) return;

      if (layer.childElementCount >= MAX_PARTICLES) {
        layer.firstElementChild?.remove();
      }

      const particle = document.createElement("span");
      particle.className = "sparkle-particle";
      particle.textContent = SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)];
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      particle.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      layer.appendChild(particle);
      particle.addEventListener("animationend", () => particle.remove());
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return <div ref={layerRef} className="sparkle-layer" aria-hidden="true" />;
}
