import shell from "./EditorialShell.module.css";
import styles from "./WorkPage.module.css";

export function WorkContent({ lang = "en" }) {
  const fr = lang === "fr";
  return (
    <article className={shell.shell}>
      <div className={styles.page}>
        <header className={styles.intro}>
          <div className={styles.inner}>
            <p className={styles.label}>{fr ? "PROJETS CHOISIS" : "SELECTED WORK"} · PRODUCT DESIGN</p>
            <div className={styles.introGrid}>
              <h1>{fr ? <>Le travail,<br />en pratique.</> : <>Selected work,<br />in practice.</>}</h1>
              <p>{fr ? "La sélection de projets est en cours de préparation." : "The project selection is currently being prepared."}</p>
            </div>
            <div className={styles.introFoot}><span>{fr ? "SÉLECTION EN COURS" : "SELECTION IN PROGRESS"}</span></div>
          </div>
        </header>
        <section className={styles.projects} aria-labelledby="projects-title">
          <div className={styles.inner}>
            <h2 id="projects-title" className={styles.emptyTitle}>{fr ? "Les projets choisis seront présentés ici." : "Selected projects will appear here."}</h2>
          </div>
        </section>
      </div>
    </article>
  );
}
