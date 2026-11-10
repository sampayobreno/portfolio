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
  const steps = french ? [
    ["Comprendre le contexte", "Cerner les personnes, les tâches et les contraintes qui entourent le problème.", "File de demandes du prototype Taskroom"],
    ["Explorer les possibilités", "Comparer les approches et rendre explicites les décisions et les compromis.", "Détail d’une demande du prototype Taskroom"],
    ["Prototyper et apprendre", "Donner forme aux interactions pour examiner les états, les limites et les questions ouvertes.", "Formulaire de clarification du prototype Taskroom"],
  ] : [
    ["Understand the context", "Map the people, tasks and constraints surrounding the problem.", "Taskroom prototype request inbox"],
    ["Explore the possibilities", "Compare approaches and make decisions and trade-offs explicit.", "Taskroom prototype request detail"],
    ["Prototype and learn", "Bring interactions to life to examine states, limitations and open questions.", "Taskroom prototype clarification form"],
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
        {steps.map(([title, description, alt], i) => (
          <article className={styles.step} data-step={i} key={title} ref={(element) => { rows.current[i] = element; }}>
            <span className={styles.number}>0{i + 1}</span>
            <div><h3>{title}</h3><p>{description}</p>
              {showVisual && <figure className={styles.mobileVisual}><Image {...images[i]} alt={alt} sizes="100vw" /><figcaption>{french ? "Prototype Taskroom · données fictives" : "Taskroom prototype · fictional data"}</figcaption></figure>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
