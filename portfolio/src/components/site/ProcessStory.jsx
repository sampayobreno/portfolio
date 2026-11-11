"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeProcess.module.css";
import { ThreadStory } from "./ThreadStory";

/*
 * "From complexity to clarity" — How I work. "The thread" draws itself beside the steps:
 * tangle → pulled into a sketch → inked into a finished screen (see ThreadStory).
 */

export function ProcessStory({ lang, showVisual = true }) {
  const [active, setActive] = useState(0);
  const rows = useRef([]);
  const steps = useRef(null);
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

  return (
    <div className={`${styles.story} ${showVisual ? styles.narrative : styles.textOnly}`}>
      {showVisual && <ThreadStory active={active} caption={content[active][0].toUpperCase()} labels={french ? { people: "personnes", tasks: "tâches", constraints: "contraintes" } : { people: "people", tasks: "tasks", constraints: "constraints" }} />}
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
