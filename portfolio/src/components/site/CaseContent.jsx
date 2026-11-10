import Link from "next/link";
import shell from "./EditorialShell.module.css";
import styles from "./CasePage.module.css";
import { CaseGuide } from "./CaseGuide";
import { ProjectCard } from "./ProjectCard";
import { ProjectCover } from "./ProjectCover";
import { RollText } from "./RollText";
import { Words } from "./Words";
import { CASE_SECTIONS, getExampleProjects } from "@/lib/exampleProjects";

// Case study template (Notion skeleton: snapshot → problem → evidence → options → decisions →
// solution → outcomes → reflection). Rendered with example projects for design direction.
export function CaseContent({ project, lang = "en" }) {
  const fr = lang === "fr";
  const prefix = fr ? "/fr" : "";
  const sections = CASE_SECTIONS[lang === "fr" ? "fr" : "en"].map(([id, label]) => ({ id, label }));
  const all = getExampleProjects(lang);
  const next = all[(all.findIndex((item) => item.slug === project.slug) + 1) % all.length];

  return (
    <article className={shell.shell}>
      <div className={styles.page}>
        <header className={styles.intro}>
          <div className={styles.inner}>
            <p className={styles.label} data-reveal style={{ "--d": 100 }}>
              <Link href={`${prefix}/work`} className={styles.back}><span aria-hidden="true">←</span> {fr ? "Projets" : "Work"}</Link>
              <span className={styles.badge}>{fr ? "Projet d’exemple" : "Example project"}</span>
              <span>{project.sector}</span>
            </p>
            <div className={styles.introGrid}>
              <h1 data-reveal="words" style={{ "--d": 200 }}><Words lines={[project.title]} /></h1>
              <p className={styles.lead} data-reveal style={{ "--d": 400 }}>{project.headline} {project.summary}</p>
            </div>
            <dl className={styles.snapshot} data-reveal style={{ "--d": 550 }}>
              {project.snapshot.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
            </dl>
          </div>
        </header>

        <figure className={styles.cover}>
          <div className={styles.inner}>
            <div data-reveal="mask" style={{ "--d": 200 }}><ProjectCover project={project} priority sizes="(max-width: 760px) 100vw, 1400px" /></div>
            <figcaption>{fr ? "Image d’ambiance" : "Mood image"} · {project.cover.credit}</figcaption>
          </div>
        </figure>

        <div className={`${styles.inner} ${styles.body}`}>
          <CaseGuide sections={sections} label={fr ? "Sections du cas" : "Case sections"} />
          <div className={styles.sections}>
            {sections.map(({ id, label }, i) => (
              <section key={id} id={id} className={styles.section} aria-labelledby={`${id}-title`}>
                <p className={styles.sectionLabel} data-reveal><span className="eyebrow-num">{String(i + 1).padStart(2, "0")}</span> / {label.toUpperCase()}</p>
                {id === "decisions" ? (
                  <>
                    <h2 id={`${id}-title`} className={styles.sectionTitle} data-reveal>{fr ? "Ce qui a été décidé, et pourquoi." : "What was decided, and why."}</h2>
                    <ol className={styles.decisions}>
                      {project.sections.decisions.map(([title, body], n) => (
                        <li key={title} data-reveal style={{ "--d": n * 120 }}><span>{String(n + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></li>
                      ))}
                    </ol>
                  </>
                ) : (
                  <>
                    <h2 id={`${id}-title`} className={styles.srOnly}>{label}</h2>
                    <p className={id === "problem" ? `${styles.text} ${styles.textLead}` : styles.text} data-reveal>{project.sections[id]}</p>
                  </>
                )}
              </section>
            ))}
          </div>
        </div>

        <section className={styles.next} aria-labelledby="next-title">
          <div className={styles.inner}>
            <div className={styles.nextHead}>
              <h2 id="next-title" data-reveal="words"><Words lines={[fr ? "Projet suivant" : "Next project"]} /></h2>
              <Link href={`${prefix}/work`} className={styles.all}><RollText>{fr ? "Tous les projets" : "All work"}</RollText><span aria-hidden="true">↗</span></Link>
            </div>
            <ProjectCard project={next} index={all.indexOf(next)} lang={lang} size="large" />
          </div>
        </section>
      </div>
    </article>
  );
}
