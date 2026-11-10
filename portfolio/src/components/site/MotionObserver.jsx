"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Reveals [data-reveal] and [data-lines] elements once as they enter the viewport.
// Hidden start states only apply under html.motion (set before paint unless reduced motion),
// so content is always visible without JS, and a head-script timeout drops .motion if this never runs.

const SKIP = new Set(["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA", "SUMMARY", "LABEL", "IMG", "SVG"]);
const HORIZONTAL = ["x", "x-rev", "x-center"];
const VERTICAL = ["y", "y-rev"];

/*
 * Line system: every structural divider (a straight border on one axis) becomes a drawn line.
 * Directions alternate so neighbouring rules arrive from different sides; colours map back to
 * palette tokens so they keep following light/dark. Rounded boxes and controls are left alone.
 */
function tagLines(scope) {
  const probe = document.createElement("span");
  document.body.appendChild(probe);
  const tokens = new Map();
  for (const name of ["rule", "rule-strong", "ink", "ink-3", "field-border"]) {
    probe.style.color = `var(--c-${name})`;
    tokens.set(getComputedStyle(probe).color, `var(--c-${name})`);
  }
  probe.remove();

  let h = 0;
  let v = 0;
  for (const el of scope.querySelectorAll("*")) {
    if (el.hasAttribute("data-lines") || SKIP.has(el.tagName.toUpperCase()) || el.closest("svg, [data-no-lines]")) continue;
    const cs = getComputedStyle(el);
    const top = parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderBottomWidth) > 0;
    const side = parseFloat(cs.borderLeftWidth) > 0 || parseFloat(cs.borderRightWidth) > 0;
    if (top === side) continue; // none, or a full box
    if (parseFloat(cs.borderTopLeftRadius) > 0 || parseFloat(cs.borderBottomLeftRadius) > 0) continue;
    const color = tokens.get(top ? (parseFloat(cs.borderTopWidth) > 0 ? cs.borderTopColor : cs.borderBottomColor) : (parseFloat(cs.borderLeftWidth) > 0 ? cs.borderLeftColor : cs.borderRightColor));
    if (!color) continue;
    el.style.setProperty("--line-color", color);
    el.setAttribute("data-lines", top ? HORIZONTAL[h++ % HORIZONTAL.length] : VERTICAL[v++ % VERTICAL.length]);
  }
}

export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-live");
    if (!root.classList.contains("motion")) return undefined;

    for (const scope of document.querySelectorAll("main, footer")) tagLines(scope);

    const items = [...document.querySelectorAll("[data-reveal]:not(.is-revealed), [data-lines]:not(.is-revealed)")];
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
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });

    items.forEach((item) => {
      const watched = item.dataset.reveal === "mask" && item.parentElement ? item.parentElement : item;
      targets.set(watched, [...(targets.get(watched) || []), item]);
      observer.observe(watched);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
