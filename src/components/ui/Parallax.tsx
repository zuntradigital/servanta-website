"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Small scroll parallax for a single hero visual: the element drifts up by at
 * most `max` px while the page scrolls past it. Off under reduced motion and
 * on touch-sized screens, where it adds nothing.
 */
export function Parallax({ children, className, max = 24, factor = 0.08 }: { children: ReactNode; className?: string; max?: number; factor?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 1023px)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = Math.min(window.scrollY * factor, max);
      el.style.transform = `translate3d(0, ${-offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      el.style.transform = "";
    };
  }, [max, factor]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
