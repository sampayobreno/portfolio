"use client";

import { useEffect, useState } from "react";
import styles from "./CasePage.module.css";

// Reading guide for case studies: a side index on desktop and the TOC pill on mobile
// (Sessions + TOC Pill references). Both mirror the section currently being read.
export function CaseGuide({ sections, label }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const targets = sections.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(targets.indexOf(entry.target));
      }
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const count = String(sections.length).padStart(2, "0");
  const current = sections[Math.max(0, active)];
  const list = (
    <ol className={styles.guideList}>
      {sections.map((section, i) => (
        <li key={section.id}>
          <a href={`#${section.id}`} aria-current={i === active ? "true" : undefined} className={i === active ? styles.guideActive : undefined} onClick={() => setOpen(false)}>
            <span>{String(i + 1).padStart(2, "0")}</span>{section.label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <nav className={styles.guide} aria-label={label}>
        <div className={styles.guideTrack} aria-hidden="true"><span style={{ transform: `scaleY(${(active + 1) / sections.length})` }} /></div>
        {list}
      </nav>
      <div className={styles.pillWrap} data-open={open || undefined}>
        {open && <div className={styles.pillPanel} id="case-guide-panel">{list}</div>}
        <button type="button" className={styles.pill} aria-expanded={open} aria-controls="case-guide-panel" aria-label={`${label}: ${current.label}`} onClick={() => setOpen((value) => !value)}>
          <span className={styles.pillCount}>{String(active + 1).padStart(2, "0")} / {count}</span>
          <span className={styles.pillLabel}>{current.label}</span>
          <span className={styles.pillProgress} aria-hidden="true"><span style={{ transform: `scaleX(${(active + 1) / sections.length})` }} /></span>
        </button>
      </div>
    </>
  );
}
