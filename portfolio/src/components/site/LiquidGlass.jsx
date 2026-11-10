"use client";

import { useEffect, useState } from "react";

/*
 * Liquid Glass refraction (Apple WWDC25 reference) for one floating surface.
 * Builds a displacement map for the element's exact size: the flat interior stays neutral and only
 * the rounded bezel bends what is behind it, like a lens edge. SVG filters inside backdrop-filter
 * only render in Chromium, so other browsers keep the CSS glass (blur, tint, specular rim).
 */
const BEZEL = 14;
const SCALE = 34;

function sdfRoundRect(x, y, w, h, r) {
  const qx = Math.abs(x - w / 2) - (w / 2 - r);
  const qy = Math.abs(y - h / 2) - (h / 2 - r);
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
}

function buildMap(w, h, r) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  const image = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const depth = -sdfRoundRect(x + 0.5, y + 0.5, w, h, r);
      let dx = 0;
      let dy = 0;
      if (depth >= 0 && depth < BEZEL) {
        const nx = sdfRoundRect(x + 1.5, y + 0.5, w, h, r) - sdfRoundRect(x - 0.5, y + 0.5, w, h, r);
        const ny = sdfRoundRect(x + 0.5, y + 1.5, w, h, r) - sdfRoundRect(x + 0.5, y - 0.5, w, h, r);
        const length = Math.hypot(nx, ny) || 1;
        // Convex bezel: strongest bend at the rim, easing to zero where the surface flattens.
        const strength = (1 - depth / BEZEL) ** 2;
        dx = (-nx / length) * strength;
        dy = (-ny / length) * strength;
      }
      const i = (y * w + x) * 4;
      image.data[i] = 128 + dx * 127;
      image.data[i + 1] = 128 + dy * 127;
      image.data[i + 2] = 128;
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL();
}

export function useLiquidGlass(ref, id) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const brands = navigator.userAgentData?.brands || [];
    const chromium = brands.some(({ brand }) => /Chromium|Google Chrome|Microsoft Edge/.test(brand));
    if (!chromium || window.matchMedia("(prefers-reduced-transparency: reduce)").matches) return undefined;

    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { width, height } = el.getBoundingClientRect();
        const w = Math.round(width);
        const h = Math.round(height);
        if (!w || !h) return;
        const radius = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, h / 2);
        setMap({ href: buildMap(w, h, radius), w, h });
        el.dataset.refract = "true";
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      delete el.dataset.refract;
    };
  }, [ref, id]);

  const filter = map ? (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <filter id={id} x="0" y="0" width={map.w} height={map.h} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feImage href={map.href} x="0" y="0" width={map.w} height={map.h} preserveAspectRatio="none" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale={SCALE} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  ) : null;

  return filter;
}
