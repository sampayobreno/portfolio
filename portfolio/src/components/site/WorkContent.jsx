import shell from "./EditorialShell.module.css";
import styles from "./WorkPage.module.css";
import { Words } from "@/components/site/Words";

export function WorkContent({ lang = "en" }) {
  const fr = lang === "fr";
  return (
    <article className={shell.shell}>
      <div className={styles.page}>
        <header className={styles.intro}>
          <div className={styles.inner}>
            <p className={styles.label} data-reveal style={{ "--d": 100 }}>{fr ? "PROJETS CHOISIS" : "SELECTED WORK"} · PRODUCT DESIGN</p>
            <div className={styles.introGrid}>
              <h1 data-reveal="words" style={{ "--d": 200 }}><Words lines={fr ? ["Le travail,", "en pratique."] : ["Selected work,", "in practice."]} /></h1>
              <p data-reveal style={{ "--d": 450 }}>{fr ? "La sélection de projets est en cours de préparation." : "The project selection is currently being prepared."}</p>
            </div>
            <div className={styles.introFoot} data-reveal style={{ "--d": 600 }}><span>{fr ? "SÉLECTION EN COURS" : "SELECTION IN PROGRESS"}</span></div>
          </div>
        </header>
        <section className={styles.projects} aria-labelledby="projects-title">
          <div className={styles.inner}>
            <h2 id="projects-title" className={styles.emptyTitle} data-reveal>{fr ? "Les projets choisis seront présentés ici." : "Selected projects will appear here."}</h2>
          </div>
        </section>
      </div>
    </article>
  );
}
