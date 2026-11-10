"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeProcess.module.css";

/*
 * "From complexity to clarity" — scroll narrative (Anthropic reference, refined 10 Nov 2026).
 * One sticky illustration follows the three steps and is scrubbed by scroll position:
 *   Understand → a scattered field of points (the accent point is the decision that matters)
 *   Design     → the points settle into a structure, framed by a Figma-style selection
 *   Prototype  → they resolve into an interface; a named cursor clicks the one clear action
 * GSAP ScrollTrigger drives progress (smoothed by Lenis); without it — reduced motion, no JS
 * or load failure — the figure falls back to discrete CSS states keyed to the active step.
 */

const SCATTERED = [[214, 150], [262, 70], [300, 184], [84, 214], [190, 236], [338, 112], [150, 160], [236, 118], [58, 128], [276, 244], [204, 46], [120, 262], [322, 232], [170, 96], [248, 196], [94, 52], [352, 170], [118, 92]];
// [x, y, scale, opacity] for each point in each state.
const STATES = [
  SCATTERED.map(([x, y], i) => [x, y, i === 0 ? 1.15 : 0.7 + ((i * 7) % 5) / 10, i === 0 ? 1 : 0.45 + ((i * 3) % 5) / 10]),
  SCATTERED.map((_, i) => [110 + (i % 3) * 90, 65 + Math.floor(i / 3) * 34, i === 0 ? 1.15 : 0.8, 1]),
  SCATTERED.map((_, i) => {
    if (i === 0) return [288, 224, 1.6, 1];
    if (i <= 3) return [70 + i * 12, 74, 0.55, 1];
    if (i <= 7) return [92, 88 + (i - 3) * 30, 0.7, 1];
    return [288, 224, 0.4, 0];
  }),
];
const TANGLE = SCATTERED.map(([x, y]) => `${x},${y}`).join(" ");
const ROW_WIDTHS = [150, 118, 172, 96];
const HANDLES = [[94, 48], [306, 48], [94, 252], [306, 252]];
const CURSOR_FROM = [352, 104];
const CURSOR_TO = [300, 232];

// Scroll progress (0–1 across the steps) → narrative position (0–2) with holds on each step.
const SEGMENTS = [[0.24, 0.42], [0.58, 0.76]];
const clamp = (v) => Math.min(1, Math.max(0, v));
const smooth = (t) => t * t * (3 - 2 * t);
const segment = (progress, [from, to]) => clamp((progress - from) / (to - from));
const lerp = (a, b, t) => a + (b - a) * t;

function ClarityFigure({ active, caption, figRef }) {
  return (
    <figure className={styles.visual} aria-hidden="true">
      <div className={styles.frame}>
        <svg ref={figRef} className={styles.fig} data-state={active} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
          <polyline className={styles.tangle} data-layer="tangle" points={TANGLE} pathLength="1" />
          <g className={styles.structure} data-layer="structure">
            {[0, 1, 2, 3, 4, 5].map((row) => <line key={row} x1="110" x2="290" y1={65 + row * 34} y2={65 + row * 34} pathLength="1" style={{ "--i": row }} />)}
            <line x1="155" x2="155" y1="50" y2="250" pathLength="1" style={{ "--i": 6 }} />
            <line x1="245" x2="245" y1="50" y2="250" pathLength="1" style={{ "--i": 7 }} />
          </g>
          <g className={styles.selection} data-layer="selection">
            <rect className={styles.selectionBox} x="94" y="48" width="212" height="204" />
            {HANDLES.map(([x, y]) => <rect key={`${x}-${y}`} className={styles.handle} x={x - 3} y={y - 3} width="6" height="6" />)}
            <rect className={styles.tag} x="94" y="30" width="58" height="14" rx="3" />
            <text className={styles.tagText} x="100" y="40">Structure</text>
            <rect className={styles.tag} x="173" y="258" width="54" height="14" rx="3" />
            <text className={styles.tagText} x="179" y="268">212 × 204</text>
          </g>
          <g className={styles.interface} data-layer="interface">
            <rect className={styles.window} x="56" y="52" width="288" height="204" rx="12" />
            <line className={styles.divider} x1="56" x2="344" y1="94" y2="94" />
            {ROW_WIDTHS.map((width, row) => <rect key={row} className={styles.row} x="106" y={114 + row * 30} width={width} height="8" rx="4" style={{ "--i": row }} />)}
            <rect className={styles.action} x="248" y="212" width="80" height="24" rx="12" />
          </g>
          {STATES[0].map((_, i) => {
            const vars = { "--i": i };
            STATES.forEach((state, s) => {
              const [x, y, scale, opacity] = state[i];
              vars[`--x${s}`] = x; vars[`--y${s}`] = y; vars[`--s${s}`] = scale; vars[`--o${s}`] = opacity;
            });
            return <circle key={i} data-dot={i} className={i === 0 ? `${styles.dot} ${styles.dotAccent}` : styles.dot} r="5" style={vars} />;
          })}
          <circle className={styles.ripple} data-layer="ripple" cx="288" cy="224" r="14" />
          <g className={styles.cursor} data-layer="cursor">
            <path d="M0 0 L0 15 L4 11 L7 18 L10 17 L7 10 L12 10 Z" />
            <rect x="12" y="16" width="38" height="14" rx="7" />
            <text x="20" y="26">Breno</text>
          </g>
        </svg>
      </div>
      <figcaption><span>{caption}</span><span>0{active + 1} / 03</span></figcaption>
    </figure>
  );
}

export function ProcessStory({ lang, showVisual = true }) {
  const [active, setActive] = useState(0);
  const rows = useRef([]);
  const steps = useRef(null);
  const fig = useRef(null);
  const french = lang === "fr";
  // [kicker, title, description, tags] — merged "Design & Build" + "How I work" (10 Nov 2026).
  const content = french ? [
    ["Comprendre", "Cadrer le problème.", "Cerner les personnes, les tâches et les contraintes autour du problème pour clarifier la prochaine décision.", "CONTEXTE · FLUX · CONTRAINTES"],
    ["Concevoir", "Dessiner les décisions.", "Comparer les approches et façonner les états, les interactions et la hiérarchie qui aident les personnes à avancer, en rendant les compromis explicites.", "INTERACTION · ÉTATS · SYSTÈMES"],
    ["Prototyper", "Donner vie aux idées.", "Construire des prototypes fonctionnels pour examiner les comportements, les limites et les questions encore ouvertes.", "FIGMA · REACT · ACCESSIBILITÉ"],
  ] : [
    ["Understand", "Frame the problem.", "Map the people, tasks and constraints around the problem so the next decision is clearer.", "CONTEXT · FLOWS · CONSTRAINTS"],
    ["Design", "Design the decisions.", "Compare approaches and shape the states, interactions and hierarchy that help people move forward, with trade-offs made explicit.", "INTERACTION · STATES · SYSTEMS"],
    ["Prototype", "Make ideas tangible.", "Build working prototypes to examine behaviour, limitations and the questions still open.", "FIGMA · REACT · ACCESSIBILITY"],
  ];

  // Active step (text emphasis, caption and the no-scrub fallback state).
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(Number(entry.target.dataset.step));
      }
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    rows.current.forEach((row) => { if (row) observer.observe(row); });
    return () => observer.disconnect();
  }, []);

  // Scroll-scrubbed figure.
  useEffect(() => {
    const svg = fig.current;
    if (!svg || !showVisual) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let trigger;
    let cancelled = false;
    const dots = [...svg.querySelectorAll("[data-dot]")];
    const layer = (name) => svg.querySelector(`[data-layer="${name}"]`);
    const tangle = layer("tangle");
    const structure = [...layer("structure").children];
    const selection = layer("selection");
    const ui = layer("interface");
    const cursor = layer("cursor");
    const ripple = layer("ripple");

    const render = (progress) => {
      const a = segment(progress, SEGMENTS[0]);
      const b = segment(progress, SEGMENTS[1]);
      dots.forEach((dot, i) => {
        // A slight per-point offset turns the morph into a wave rather than a block move.
        const wave = i * 0.012;
        const ta = smooth(clamp((a - wave) / (1 - 0.22)));
        const tb = smooth(clamp((b - wave) / (1 - 0.22)));
        const [x0, y0, s0, o0] = STATES[0][i];
        const [x1, y1, s1, o1] = STATES[1][i];
        const [x2, y2, s2, o2] = STATES[2][i];
        const x = lerp(lerp(x0, x1, ta), x2, tb);
        const y = lerp(lerp(y0, y1, ta), y2, tb);
        const s = lerp(lerp(s0, s1, ta), s2, tb);
        dot.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
        dot.style.opacity = lerp(lerp(o0, o1, ta), o2, tb);
      });
      tangle.style.strokeDashoffset = smooth(a);
      tangle.style.opacity = 0.5 * (1 - smooth(a));
      structure.forEach((line, i) => {
        const draw = smooth(clamp(a * 1.3 - i * 0.04));
        line.style.strokeDashoffset = 1 - draw;
        line.style.opacity = 1 - smooth(b);
      });
      const framed = smooth(clamp((a - 0.6) / 0.4)) * (1 - smooth(clamp(b / 0.45)));
      selection.style.opacity = framed;
      selection.style.transform = `scale(${0.96 + 0.04 * framed})`;
      ui.style.setProperty("--reveal", smooth(clamp((b - 0.25) / 0.6)));
      const travel = smooth(clamp((b - 0.55) / 0.4));
      cursor.style.opacity = smooth(clamp((b - 0.45) / 0.2));
      cursor.style.transform = `translate(${lerp(CURSOR_FROM[0], CURSOR_TO[0], travel)}px, ${lerp(CURSOR_FROM[1], CURSOR_TO[1], travel)}px)`;
      ripple.classList.toggle(styles.rippleOn, b >= 0.98);
    };

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, stModule]) => {
      if (cancelled || !steps.current) return;
      const ScrollTrigger = stModule.ScrollTrigger || stModule.default;
      gsap.registerPlugin(ScrollTrigger);
      svg.classList.add(styles.scrubbed);
      trigger = ScrollTrigger.create({
        trigger: steps.current,
        start: "top 55%",
        end: "bottom 45%",
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => render(self.progress),
      });
      if (window.__lenis) window.__lenis.on("scroll", ScrollTrigger.update);
      render(trigger.progress);
    }).catch(() => {});

    return () => {
      cancelled = true;
      if (trigger) trigger.kill();
      svg.classList.remove(styles.scrubbed);
    };
  }, [showVisual]);

  return (
    <div className={`${styles.story} ${showVisual ? styles.narrative : styles.textOnly}`}>
      {showVisual && <ClarityFigure active={active} caption={content[active][0].toUpperCase()} figRef={fig} />}
      <div className={styles.steps} ref={steps}>
        {content.map(([kicker, title, description, tags], i) => (
          <article className={`${styles.step} ${active === i ? styles.stepActive : ""}`} data-step={i} key={title} ref={(element) => { rows.current[i] = element; }}>
            <span className={styles.number}>0{i + 1}</span>
            <div>
              <div className={styles.stepHead}><span className={styles.kicker}>{kicker}</span><h3>{title}</h3></div>
              <div className={styles.stepBody}><p>{description}</p><span className={styles.tags}>{tags}</span></div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
