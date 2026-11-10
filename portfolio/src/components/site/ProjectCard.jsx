import Link from "next/link";
import { ProjectCover } from "./ProjectCover";
import { RollText } from "./RollText";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project, index, lang = "en", size = "default", priority = false }) {
  const fr = lang === "fr";
  const href = `${fr ? "/fr" : ""}/work/${project.slug}`;
  return (
    <Link href={href} className={`${styles.card} ${size === "large" ? styles.large : ""}`}>
      <div className={styles.media} data-reveal="mask">
        <ProjectCover project={project} priority={priority} sizes={size === "large" ? "(max-width: 760px) 100vw, 90vw" : "(max-width: 760px) 100vw, 45vw"} />
        <span className={styles.badge}>{fr ? "Projet d’exemple" : "Example project"}</span>
      </div>
      <div className={styles.meta} data-reveal>
        <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
        <div className={styles.text}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.headline}>{project.headline}</p>
        </div>
        <div className={styles.side}>
          <span className={styles.sector}>{project.sector} · {project.year}</span>
          <span className={styles.cta}><RollText>{fr ? "Voir le cas" : "View case"}</RollText><span className={styles.arrow} aria-hidden="true">↗</span></span>
        </div>
      </div>
    </Link>
  );
}
