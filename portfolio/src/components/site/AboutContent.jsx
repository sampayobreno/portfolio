import Link from "next/link";
import { getT } from "@/lib/i18n";
import { getPortfolioEditorial } from "@/lib/portfolioEditorial";
import shell from "./EditorialShell.module.css";
import styles from "./AboutPage.module.css";

export function AboutContent({ lang = "en" }) {
  const c = getPortfolioEditorial(lang);
  const a = c.aboutPage;
  const t = getT(lang);
  const fr = lang === "fr";
  const languages = fr
    ? [["Portugais", "Langue maternelle"], ["Français", "C1"], ["Espagnol", "B2"], ["Anglais", "B2"], ["Italien", "B1"]]
    : [["Portuguese", "Native"], ["French", "C1"], ["Spanish", "B2"], ["English", "B2"], ["Italian", "B1"]];
  return (
    <article className={shell.shell}>
      <div className={styles.aboutPage}>
        <header className={styles.intro} id="about-overview">
          <div className={styles.inner}>
            <p className={styles.label}>{a.eyebrow} · {fr ? "Valence, Espagne" : "Valencia, Spain"}</p>
            <div className={styles.introGrid}>
              <h1>{a.title}<br /><span>{a.emphasis}</span></h1>
              <div><p className={styles.introLead}>{a.intro}</p><p className={styles.body}>{a.introSub}</p></div>
            </div>
            <div className={styles.introFoot}><span>Product Design · Frontend prototyping</span><a href="#perspective">{fr ? "Découvrir mon approche ↓" : "Explore my approach ↓"}</a></div>
          </div>
        </header>
        <section className={styles.section} id="perspective" data-label={fr ? "Perspective" : "Perspective"} aria-labelledby="perspective-title">
          <div className={styles.inner}>
            <p className={styles.label}>{a.perspectiveEyebrow}</p>
            <div className={styles.sectionGrid}><h2 id="perspective-title">{a.perspective}</h2><div><p className={styles.sectionLead}>{a.perspectiveBody}</p>
              <div className={styles.rows}>{a.pillars.map((pillar) => <div className={styles.row} key={pillar.title}><h3>{pillar.title}</h3><p>{pillar.body}</p></div>)}</div>
            </div></div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.wash}`} id="timeline" data-label={fr ? "Parcours" : "Experience"} aria-labelledby="timeline-title">
          <div className={styles.inner}><p className={styles.label}>{a.experienceEyebrow}</p>
            <div className={styles.sectionGrid}><h2 id="timeline-title">{a.experience}</h2><div className={styles.rows}>{a.trajectoryRows.map((row) => <div className={styles.trajectoryRow} key={row.title}><span className={styles.label}>{row.label}</span><h3>{row.title}</h3><p>{row.body}</p></div>)}</div></div>
          </div>
        </section>
        <section className={styles.section} id="practice" data-label={fr ? "Pratique" : "Practice"} aria-labelledby="practice-title">
          <div className={styles.inner}><p className={styles.label}>{a.collabEyebrow}</p>
            <div className={styles.sectionGrid}><h2 id="practice-title">{a.collabHeading}</h2><div className={styles.rows}><div className={styles.row}><h3>{a.collaboration}</h3><p>{a.collaborationBody}</p></div><div className={styles.row}><h3>{a.frontend}</h3><p>{a.frontendBody}</p></div></div></div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.wash}`} id="languages-location" data-label={a.languages} aria-labelledby="languages-title">
          <div className={styles.inner}><p className={styles.label}>{a.languages}</p>
            <div className={styles.sectionGrid}><h2 id="languages-title">{a.location}</h2><div><dl className={styles.languageList}>{languages.map(([name, level]) => <div key={name}><dt>{name}</dt><dd>{level}</dd></div>)}</dl>
              <div className={styles.links}><Link href={fr ? "/fr#contact" : "/#contact"}>{a.contact} ↗</Link><a href={t.resume.href} download={t.resume.fileName}>{c.contact.resume} ↓</a><Link href={fr ? "/fr/work" : "/work"}>{a.work} ↗</Link></div>
            </div></div>
          </div>
        </section>
      </div>
    </article>
  );
}
