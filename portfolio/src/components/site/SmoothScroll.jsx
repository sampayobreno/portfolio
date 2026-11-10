"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/*
 * Lenis smooth scroll — light, no parallax, no scroll-jacking.
 * Also wires same-page hash links (e.g. "/#work", "#about") so the nav scrolls
 * smoothly to the exact section, offset below the sticky header.
 * Fully disabled under prefers-reduced-motion (native scroll + scroll-padding).
 */
const HEADER_OFFSET = 88;

export function SmoothScroll() {
  const pathname = usePathname();
  const previous = useRef(pathname);

  // New page → start at the top. Lenis keeps its own scroll position and would otherwise
  // restore the previous page's offset after a client-side navigation. Hash targets win.
  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    if (window.location.hash) return;
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Resolve "#id" or "/#id" (only when already on the landing page) to an element.
    const resolveTarget = (href) => {
      if (!href) return null;
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return null;
      const id = href.slice(hashIndex + 1);
      if (!id) return null;
      // "/path#id" pointing at another route — let the browser navigate.
      const path = href.slice(0, hashIndex);
      if (path && path !== "/" && path !== window.location.pathname) return null;
      return document.getElementById(id);
    };

    // Touch devices (phones, tablets) scroll natively — Lenis only smooths the
    // mouse wheel, which they don't have. Worse: with syncTouch off, a running
    // Lenis keeps its OWN scroll position alongside the native one, and its rAF
    // loop forces the page back to that value every frame — eating programmatic
    // scrollTo()s. The result was anchor taps (the bottom dock dots) jumping to
    // the wrong place. So we skip Lenis entirely on touch and let the native
    // scroll — plus native smooth scrollTo() for anchors — run unopposed.
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    let lenis;
    let rafId;
    let cancelled = false;

    // Compute an absolute target Y ourselves (offset-adjusted) and pass it as a
    // number — Lenis's element-offset math doesn't match this layout. With Lenis
    // present (pointer devices only) it drives; otherwise native smooth scroll.
    const scrollToEl = (el, immediate = false) => {
      const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET);
      if (lenis) {
        lenis.scrollTo(y, { immediate });
      } else {
        window.scrollTo({ top: y, behavior: reduce || immediate ? "auto" : "smooth" });
      }
    };

    const onClick = (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = e.target.closest('a[href*="#"]');
      if (!a) return;
      const el = resolveTarget(a.getAttribute("href"));
      if (!el) return; // cross-route hash → let next/link navigate, hash handled on load
      // Capture phase: prevent route interception while allowing React's
      // onClick handlers (for example the mobile menu close action) to run.
      e.preventDefault();
      if (a.closest(".section-jump-nav")) {
        el.tabIndex = -1;
        el.focus({ preventScroll: true });
      }
      scrollToEl(el);
      history.pushState(null, "", `#${el.id}`);
    };

    document.addEventListener("click", onClick, true);

    // Honour a hash present on first load (after layout settles).
    const initialHash = window.location.hash.slice(1);

    // No Lenis under reduced-motion or on touch — native scroll owns both.
    if (reduce || touch) {
      if (initialHash) {
        const el = document.getElementById(initialHash);
        if (el) requestAnimationFrame(() => scrollToEl(el, true));
      }
      return () => document.removeEventListener("click", onClick, true);
    }

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 0.9,
        easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cubic, restrained
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      });
      window.__lenis = lenis;

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      if (initialHash) {
        const el = document.getElementById(initialHash);
        if (el) setTimeout(() => scrollToEl(el, true), 60);
      }
    });

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick, true);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
