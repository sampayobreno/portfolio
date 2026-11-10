import Image from "next/image";

// Hand-drawn illustration (ink + pencil + terracotta). Enters as if drawn left→right and keeps a
// subtle line "boil" so it feels made by hand. Decorative by default; pass alt when it carries meaning.
export function Illustration({ src, width, height, alt = "", className = "", sizes = "(max-width: 760px) 100vw, 50vw", priority = false, style }) {
  return (
    <figure className={`illustration ${className}`.trim()} data-reveal="draw" style={style} aria-hidden={alt ? undefined : true}>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} />
    </figure>
  );
}

// SVG filters shared by every illustration: three displacement seeds cycled to make the line "boil".
export function BoilFilters() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      {[1, 2, 3].map((seed) => (
        <filter id={`boil-${seed}`} key={seed}>
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed={seed * 7} />
          <feDisplacementMap in="SourceGraphic" scale="2.4" />
        </filter>
      ))}
    </svg>
  );
}
