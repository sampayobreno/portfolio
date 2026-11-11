import styles from "./ThreadStory.module.css";

/*
 * How I work — "the thread" (original illustration, 11 Nov 2026).
 * One continuous terracotta thread draws itself across the three steps:
 *   Understand → a pencil tangle with handwritten notes; the thread's end pokes out
 *   Design     → the thread is pulled out and sketches a wireframe as it goes
 *   Prototype  → the sketch is inked into a finished screen; the thread ends on the action
 * Earlier stages stay on the page as fading pencil, so the story accumulates.
 */

// Deterministic hand-drawn tangle: overlapping loose loops around a centre.
function tangle(cx, cy) {
  let seed = 7;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  let d = `M${cx + 30} ${cy}`;
  for (let i = 0; i < 9; i++) {
    const r = 22 + rand() * 26;
    const ox = (rand() - 0.5) * 26;
    const oy = (rand() - 0.5) * 22;
    const a = rand() * Math.PI * 2;
    for (let k = 1; k <= 4; k++) {
      const t = a + (k * Math.PI) / 2;
      const x = cx + ox + Math.cos(t) * r * (0.85 + rand() * 0.3);
      const y = cy + oy + Math.sin(t) * r * (0.75 + rand() * 0.3);
      const c1x = cx + ox + Math.cos(t - 0.8) * r * 1.2;
      const c1y = cy + oy + Math.sin(t - 0.8) * r * 1.2;
      d += ` Q${c1x.toFixed(1)} ${c1y.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
  }
  return d;
}

const TANGLE = tangle(118, 226);
// The single thread: out of the tangle → sketches the wireframe → ends on the button.
const THREAD = "M118 226 C150 236 168 252 196 238 C220 226 226 180 246 160 L392 158 L394 300 L248 302 L247 196 L392 194 C392 226 352 236 344 252 C338 264 326 270 330 280 C334 290 352 288 352 278";
const STEPS = ["understand", "design", "prototype"];

export function ThreadStory({ active, labels, caption }) {
  return (
    <figure className={styles.figure} aria-hidden="true">
      <svg viewBox="0 0 440 420" className={styles.svg} data-step={STEPS[active]}>
        <defs>
          <filter id="pencil">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="3" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" />
          </filter>
        </defs>

        {/* 1 · Understand — the tangle and the designer's notes */}
        <g className={`${styles.stage} ${styles.understand}`}>
          <path d={TANGLE} className={styles.pencil} pathLength="1" filter="url(#pencil)" />
          <g className={styles.notes}>
            <path d="M74 156 q10 18 22 30" className={styles.tick} pathLength="1" />
            <text x="42" y="150">{labels.people}</text>
            <path d="M54 300 q18 -6 34 -26" className={styles.tick} pathLength="1" />
            <text x="18" y="318">{labels.tasks}</text>
            <path d="M178 312 q-10 -14 -28 -28" className={styles.tick} pathLength="1" />
            <text x="160" y="330">{labels.constraints}</text>
          </g>
        </g>

        {/* 2 · Design — wireframe sketched by the pulled thread, plus pencil boxes */}
        <g className={`${styles.stage} ${styles.design}`}>
          <path d="M262 212 h54 v34 h-54 z M328 212 h50 v34 h-50 z" className={styles.pencil} pathLength="1" filter="url(#pencil)" />
          <path d="M262 176 h70" className={styles.pencil} pathLength="1" filter="url(#pencil)" />
        </g>

        {/* 3 · Prototype — the sketch inked into a finished screen */}
        <g className={`${styles.stage} ${styles.prototype}`}>
          <rect x="240" y="152" width="160" height="156" rx="14" className={styles.screen} />
          <path d="M240 190 H400" className={styles.ink} />
          <circle cx="254" cy="171" r="3" className={styles.dot} /><circle cx="266" cy="171" r="3" className={styles.dot} />
          <rect x="258" y="206" width="84" height="7" rx="3.5" className={styles.line} />
          <rect x="258" y="222" width="112" height="7" rx="3.5" className={styles.line} />
          <rect x="258" y="238" width="64" height="7" rx="3.5" className={styles.line} />
          <rect x="300" y="268" width="84" height="26" rx="13" className={styles.button} />
          <circle cx="342" cy="281" r="16" className={styles.ripple} />
          <path d="M350 286 l0 15 4 -4 4 7 3 -1.6 -4 -7 5.6 -.4 z" className={styles.cursor} />
        </g>

        {/* The thread — one line across all three steps */}
        <path d={THREAD} className={styles.thread} pathLength="1" filter="url(#pencil)" />
        <circle cx="118" cy="226" r="4" className={styles.threadEnd} />
      </svg>
      <figcaption className={styles.caption}><span>{caption}</span><span>0{active + 1} / 03</span></figcaption>
    </figure>
  );
}
