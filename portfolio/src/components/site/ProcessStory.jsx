"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./HomeProcess.module.css";

const images = [
  { src: "/images/taskroom/request-inbox.png", width: 998, height: 560 },
  { src: "/images/taskroom/request-detail.png", width: 1004, height: 655 },
  { src: "/images/taskroom/request-clarification.png", width: 768, height: 690 },
];

export function ProcessStory({ lang, showVisual = true }) {
  const [active, setActive] = useState(0);
  const rows = useRef([]);
  const french = lang === "fr";
  // [kicker, title, description, image alt, tags] — merged "Design & Build" + "How I work" (10 Nov 2026).
  const steps = french ? [
    ["Comprendre", "Cadrer le problème.", "Cerner les personnes, les tâches et les contraintes autour du problème pour clarifier la prochaine décision.", "File de demandes du prototype Taskroom", "CONTEXTE · FLUX · CONTRAINTES"],
    ["Concevoir", "Dessiner les décisions.", "Comparer les approches et façonner les états, les interactions et la hiérarchie qui aident les personnes à avancer, en rendant les compromis explicites.", "Détail d’une demande du prototype Taskroom", "INTERACTION · ÉTATS · SYSTÈMES"],
    ["Prototyper", "Donner vie aux idées.", "Construire des prototypes fonctionnels pour examiner les comportements, les limites et les questions encore ouvertes.", "Formulaire de clarification du prototype Taskroom", "FIGMA · REACT · ACCESSIBILITÉ"],
  ] : [
    ["Understand", "Frame the problem.", "Map the people, tasks and constraints around the problem so the next decision is clearer.", "Taskroom prototype request inbox", "CONTEXT · FLOWS · CONSTRAINTS"],
    ["Design", "Design the decisions.", "Compare approaches and shape the states, interactions and hierarchy that help people move forward, with trade-offs made explicit.", "Taskroom prototype request detail", "INTERACTION · STATES · SYSTEMS"],
    ["Prototype", "Make ideas tangible.", "Build working prototypes to examine behaviour, limitations and the questions still open.", "Taskroom prototype clarification form", "FIGMA · REACT · ACCESSIBILITY"],
  ];

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(Number(entry.target.dataset.step));
      }
    }, { rootMargin: "-30% 0px -45% 0px", threshold: 0 });
    rows.current.forEach((row) => { if (row) observer.observe(row); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.story} ${!showVisual ? styles.textOnly : ""}`}>
      {showVisual && <figure className={styles.visual} aria-hidden="true">
        <div className={styles.frame}>
          {images.map((image, i) => <Image key={image.src} {...image} alt="" sizes="(max-width: 760px) 0px, 50vw" className={`${styles.screen} ${active === i ? styles.screenActive : ""}`} />)}
        </div>
        <figcaption>{french ? "TASKROOM · DONNÉES FICTIVES" : "TASKROOM · FICTIONAL DATA"} <span>0{active + 1} / 03</span></figcaption>
      </figure>}
      <div className={styles.steps}>
        {steps.map(([kicker, title, description, alt, tags], i) => (
          <article className={styles.step} data-step={i} key={title} ref={(element) => { rows.current[i] = element; }}>
            <span className={styles.number}>0{i + 1}</span>
            <div><div className={styles.stepHead}><span className={styles.kicker}>{kicker}</span><h3>{title}</h3></div><div className={styles.stepBody}><p>{description}</p><span className={styles.tags}>{tags}</span></div>
              {showVisual && <figure className={styles.mobileVisual}><Image {...images[i]} alt={alt} sizes="100vw" /><figcaption>{french ? "Prototype Taskroom · données fictives" : "Taskroom prototype · fictional data"}</figcaption></figure>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
