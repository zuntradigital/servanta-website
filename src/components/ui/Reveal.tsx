"use client";

import { useEffect } from "react";

/**
 * Scroll reveal (spec §16) for elements marked `data-reveal` ("", "fade" or
 * "scale"), staggered by their `--reveal-index`.
 *
 * Hydration-safe by design: the controller never writes classes, styles or
 * attributes to the DOM. Server HTML and the first client render are
 * therefore identical, even for content streamed in later through Suspense
 * (e.g. the pricing plans), which this controller can see before React has
 * hydrated it. Each reveal is a Web Animations API animation instead:
 *  - below the fold: an animation is created paused on its first frame
 *    (hidden) and played when the element scrolls into view;
 *  - on screen when the page loads: left alone, so nothing blinks;
 *  - added later while on screen (streamed content, client navigation):
 *    played straight away.
 * `fill: "backwards"` means that once an animation ends, the element's own CSS
 * (hover lifts etc.) applies untouched. Nothing runs under prefers-reduced-motion,
 * and without JS all content is simply visible.
 */

type Variant = "" | "fade" | "scale";

const keyframes: Record<Variant, Keyframe[]> = {
  // A faint blur that resolves as the element settles; gone once the animation ends.
  "": [{ opacity: 0, transform: "translate3d(0, 24px, 0)", filter: "blur(4px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }],
  fade: [{ opacity: 0, transform: "translate3d(0, 10px, 0)" }, { opacity: 1, transform: "none" }],
  scale: [{ opacity: 0, transform: "translate3d(0, 28px, 0) scale(0.96)", filter: "blur(4px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }],
};

function motionTokens() {
  const styles = getComputedStyle(document.documentElement);
  // CSS minification may rewrite "760ms" as ".76s", so honour the unit.
  const ms = (name: string, fallback: number) => {
    const raw = styles.getPropertyValue(name).trim();
    const value = Number.parseFloat(raw);
    if (!Number.isFinite(value)) return fallback;
    return raw.endsWith("ms") ? value : raw.endsWith("s") ? value * 1000 : value;
  };
  return {
    duration: ms("--duration-reveal", 760),
    stagger: ms("--stagger", 70),
    easing: styles.getPropertyValue("--ease-emphasized").trim() || "cubic-bezier(0.16, 1, 0.3, 1)",
  };
}

export function RevealController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window) || typeof Element.prototype.animate !== "function") return;

    const tokens = motionTokens();
    const pending = new Map<Element, Animation>();
    const seen = new WeakSet<Element>();

    const createAnimation = (el: HTMLElement): Animation => {
      const variant = (el.dataset.reveal ?? "") as Variant;
      const index = Number.parseFloat(getComputedStyle(el).getPropertyValue("--reveal-index")) || 0;
      return el.animate(keyframes[variant] ?? keyframes[""], {
        duration: variant === "scale" ? 900 : tokens.duration,
        delay: index * tokens.stagger,
        easing: tokens.easing,
        fill: "backwards",
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          pending.get(entry.target)?.play();
          pending.delete(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    const scan = (initial: boolean) => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const onScreen = el.getBoundingClientRect().top < window.innerHeight;
        if (onScreen) {
          // Already visible at load: leave it. Newly added while visible: animate in now.
          if (!initial) createAnimation(el);
          return;
        }
        const animation = createAnimation(el);
        animation.pause(); // holds the first (hidden) frame until the element is in view
        pending.set(el, animation);
        observer.observe(el);
      });
    };

    scan(true);
    const mutation = new MutationObserver(() => scan(false));
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutation.disconnect();
      observer.disconnect();
      for (const animation of pending.values()) animation.cancel();
      pending.clear();
    };
  }, []);

  return null;
}
