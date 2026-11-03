import { TaskroomCard } from "@/components/taskroom/TaskroomCase";
import { FeaturedCaseCard } from "@/components/site/FeaturedCaseCard";
import { Reveal } from "@/components/site/Reveal";
import { Scramble } from "@/components/site/Scramble";
import { getPortfolioEditorial } from "@/lib/portfolioEditorial";
import styles from "./EditorialShell.module.css";

export function WorkContent({ lang = "en" }) {
  const c = getPortfolioEditorial(lang);
  return (
    <article className={styles.shell}>
      <section className={`container ${styles.pageIntro}`} id="work-overview" data-label={c.labels.work} aria-labelledby="work-page-title">
        <div className={styles.workHeader}>
          <div>
            <p className={styles.eyebrow}><Scramble text={c.work.label} /></p>
            <Reveal mask>
              <h1 id="work-page-title" className={styles.pageTitle}>{c.work.title}</h1>
            </Reveal>
          </div>
          <p className={styles.sectionCaption}>{c.work.caption}</p>
        </div>

        <FeaturedCaseCard copy={c.work} lang={lang} headingLevel="h2" />
        <TaskroomCard lang={lang} />
      </section>
    </article>
  );
}
