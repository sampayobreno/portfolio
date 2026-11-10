import shell from "./EditorialShell.module.css";
import styles from "./WorkPage.module.css";
import { Words } from "@/components/site/Words";
import { ProjectCard } from "@/components/site/ProjectCard";
import { getExampleProjects } from "@/lib/exampleProjects";

export function WorkContent({ lang = "en" }) {
  const fr = lang === "fr";
  const projects = getExampleProjects(lang);
  return (
    <article className={shell.shell}>
      <div className={styles.page}>
        <header className={styles.intro}>
          <div className={styles.inner}>
            <p className={styles.label} data-reveal style={{ "--d": 100 }}>{fr ? "PROJETS CHOISIS" : "SELECTED WORK"} · PRODUCT DESIGN</p>
            <div className={styles.introGrid}>
              <h1 data-reveal="words" style={{ "--d": 200 }}><Words lines={fr ? ["Le travail,", "en pratique."] : ["Selected work,", "in practice."]} /></h1>
              <p data-reveal style={{ "--d": 450 }}>{fr ? "Chaque projet suit le même fil : le problème, ce qui a été observé, les décisions et ce qui a changé." : "Each project follows the same thread: the problem, what was observed, the decisions and what changed."}</p>
            </div>
            <div className={styles.introFoot} data-reveal style={{ "--d": 600 }}><span>{fr ? `${projects.length} PROJETS D’EXEMPLE` : `${projects.length} EXAMPLE PROJECTS`}</span><span>{fr ? "DIRECTION DE DESIGN" : "DESIGN DIRECTION"}</span></div>
          </div>
        </header>
        <section className={styles.projects} aria-labelledby="projects-title">
          <div className={styles.inner}>
            <h2 id="projects-title" className={styles.srOnly}>{fr ? "Projets" : "Projects"}</h2>
            <div className={styles.grid}>
              {projects.map((project, i) => <ProjectCard key={project.slug} project={project} index={i} lang={lang} priority={i < 2} />)}
            </div>
            <p className={styles.note}>{fr ? "Projets d’exemple pour la direction de design — produits, rôles et résultats fictifs. Photos : Unsplash." : "Example projects for design direction — fictional products, roles and outcomes. Photos: Unsplash."}</p>
          </div>
        </section>
      </div>
    </article>
  );
}
