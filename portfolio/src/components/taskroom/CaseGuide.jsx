"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TaskroomCase.module.css";

export function CaseGuide({ lang }) {
  const fr = lang === "fr";
  const sections = [
    ["case-overview", fr ? "Vue d’ensemble" : "Overview"],
    ["taskroom-choices", fr ? "La solution" : "The solution"],
    ["context", fr ? "Le problème" : "The problem"],
    ["decision", fr ? "La décision" : "The decision"],
    ["taskroom-tradeoff", fr ? "Les compromis" : "The trade-off"],
    ["workflow", fr ? "Le parcours" : "The workflow"],
    ["validation", "Validation"],
    ["taskroom-alternatives", "Alternatives"],
    ["taskroom-research", fr ? "Le contexte" : "Research"],
    ["taskroom-measurement", fr ? "Mesure" : "Measurement"],
  ];
  const [active, setActive] = useState("case-overview");
  const [open, setOpen] = useState(false);
  const [readingDown, setReadingDown] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    let previousY = window.scrollY;
    const update = () => {
      frame = 0;
      const nextY = window.scrollY;
      if (nextY <= 40) {
        setReadingDown(false);
        previousY = nextY;
      } else if (Math.abs(nextY - previousY) >= 8) {
        setReadingDown(nextY > previousY);
        previousY = nextY;
      }
      let current = "case-overview";
      sections.forEach(([id]) => {
        const target = document.getElementById(id);
        if (target && target.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
      });
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  // Section identifiers are stable for this case.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className={styles.caseGuide} data-reading-down={readingDown} data-open={open} aria-label={fr ? "Navigation dans l’étude de cas" : "Case study navigation"} onKeyDown={(event) => { if (event.key === "Escape" && open) { setOpen(false); triggerRef.current?.focus(); } }}>
      {open && <div className={styles.guideMenu} id="taskroom-guide-menu">
        <p>{fr ? "Dans cette étude" : "In this case"}</p>
        {sections.map(([id, label], index) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>)}
      </div>}
      <button ref={triggerRef} type="button" className={styles.guideButton} aria-expanded={open} aria-controls={open ? "taskroom-guide-menu" : undefined} onClick={() => setOpen(!open)}>
        <span className={styles.guideIcon} aria-hidden="true">☰</span>
        <span>{sections.find(([id]) => id === active)?.[1]}</span>
        <span aria-hidden="true">{open ? "×" : "↗"}</span>
      </button>
    </nav>
  );
}
