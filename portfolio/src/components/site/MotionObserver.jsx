"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Reveals [data-reveal] elements once as they enter the viewport.
// Hidden start states only apply under html.motion (set before paint unless reduced motion),
// so content is always visible without JS, and a head-script timeout drops .motion if this never runs.
export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-live");
    if (!root.classList.contains("motion")) return undefined;

    const items = [...document.querySelectorAll("[data-reveal]:not(.is-revealed)")];
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-revealed"));
      return undefined;
    }

    // A fully clipped mask never "intersects", so masked items are watched through their parent.
    const targets = new Map();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (targets.get(entry.target) || []).forEach((item) => item.classList.add("is-revealed"));
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    items.forEach((item) => {
      const watched = item.dataset.reveal === "mask" && item.parentElement ? item.parentElement : item;
      targets.set(watched, [...(targets.get(watched) || []), item]);
      observer.observe(watched);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
