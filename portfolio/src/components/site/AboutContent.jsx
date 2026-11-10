import Image from "next/image";
import Link from "next/link";
import { getT } from "@/lib/i18n";
import { getPortfolioEditorial } from "@/lib/portfolioEditorial";
import shell from "./EditorialShell.module.css";
import styles from "./AboutPage.module.css";
import { CaseGuide } from "@/components/site/CaseGuide";
import { RollText } from "@/components/site/RollText";
import { Words } from "@/components/site/Words";

// "01 · Perspective" → numbered eyebrow matching the home sections ("01 / Perspective").
function Eyebrow({ text }) {
  const match = text.match(/^(\d{2}) · (.+)$/);
  if (!match) return text;
  return <><span className="eyebrow-num">{match[1]}</span> / {match[2]}</>;
}

/*
 * About page (redesign 10 Nov 2026): one statement + portrait, a facts strip, numbered
 * principles, a trajectory timeline, practice and a closing call — instead of four repeats
 * of the same "big heading + list" template. Hierarchy follows the Formo reference (bold leads).
 */
export function AboutContent({ lang = "en" }) {
  const c = getPortfolioEditorial(lang);
  const a = c.aboutPage;
  const t = getT(lang);
  const fr = lang === "fr";
  const prefix = fr ? "/fr" : "";
  const facts = [
    [a.metaBaseLabel, a.metaBaseValue],
    [a.metaRoleLabel, a.metaRoleValue],
    [fr ? "Pratique" : "Practice", fr ? "Prototypage frontend" : "Frontend prototyping"],
    [a.metaLangsLabel, fr ? "Portugais (natif) · Français C1 · Espagnol B2 · Anglais B2 · Italien B1" : "Portuguese (native) · French C1 · Spanish B2 · English B2 · Italian B1"],
  ];
  const guide = fr
    ? [["about-overview", "Profil"], ["perspective", "Perspective"], ["timeline", "Parcours"], ["practice", "Pratique"], ["about-closing", "Contact"]]
    : [["about-overview", "Profile"], ["perspective", "Perspective"], ["timeline", "Trajectory"], ["practice", "Practice"], ["about-closing", "Contact"]];
  const principles = [
    ...a.pillars.map((pillar) => [pillar.title, pillar.body]),
    [a.collaboration, a.collaborationBody],
  ];

  return (
    <article className={shell.shell}>
      <div className={styles.aboutPage}>
        <CaseGuide variant="floating" sections={guide.map(([id, label]) => ({ id, label }))} label={fr ? "Sections de la page" : "Page sections"} />
        <header className={styles.intro} id="about-overview">
          <div className={styles.inner}>
            <p className={styles.label} data-reveal style={{ "--d": 100 }}>{a.eyebrow} · {a.title.replace(/\.$/, "")}</p>
            <div className={styles.introGrid} data-lines="x" style={{ "--ld": 100 }}>
              <div className={styles.introText}>
                <h1 data-reveal="words" style={{ "--d": 200 }}><Words lines={[a.statement]} /></h1>
                <p className={styles.introLead} data-reveal style={{ "--d": 450 }}>{a.intro}</p>
                <p className={styles.body} data-reveal style={{ "--d": 550 }}>{a.introSub}</p>
              </div>
              <figure className={styles.portrait}>
                <div className={styles.portraitFrame} data-reveal="mask" style={{ "--d": 300 }}>
                  <Image src="/images/breno-portrait.png" alt={fr ? "Portrait de Breno Sampaio" : "Portrait of Breno Sampaio"} width={960} height={1200} priority sizes="(max-width: 760px) 70vw, 340px" />
                </div>
                <figcaption data-reveal style={{ "--d": 700 }}><span>Breno Sampaio</span><span>{a.emphasis.replace(/\.$/, "")}</span></figcaption>
              </figure>
            </div>
            <dl className={styles.facts} data-reveal style={{ "--d": 650 }}>
              {facts.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
            </dl>
          </div>
        </header>

        <section className={styles.section} id="perspective" aria-labelledby="perspective-title">
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <div><p className={styles.label} data-reveal><Eyebrow text={a.perspectiveEyebrow} /></p><h2 id="perspective-title" data-reveal="words"><Words lines={[a.perspective]} /></h2></div>
              <p className={styles.sectionLead} data-reveal style={{ "--d": 200 }}>{a.perspectiveBody}</p>
            </div>
            <ol className={styles.principles}>
              {principles.map(([title, body], i) => (
                <li key={title} data-reveal style={{ "--d": i * 120 }}>
                  <span className={styles.principleNum}>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.section} id="timeline" aria-labelledby="timeline-title">
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <div><p className={styles.label} data-reveal><Eyebrow text={a.experienceEyebrow} /></p><h2 id="timeline-title" data-reveal="words"><Words lines={[a.experience]} /></h2></div>
            </div>
            <ol className={styles.timeline}>
              {a.trajectoryRows.map((row, i) => (
                <li key={row.title} className={i === a.trajectoryRows.length - 1 ? styles.timelineNow : undefined} data-reveal style={{ "--d": i * 120 }}>
                  <span className={styles.timelineLabel}>{row.label}</span>
                  <div><h3>{row.title}</h3><p>{row.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.section} id="practice" aria-labelledby="practice-title">
          <div className={styles.inner}>
            <div className={styles.practice}>
              <div><p className={styles.label} data-reveal><Eyebrow text={a.collabEyebrow} /></p><h2 id="practice-title" data-reveal="words"><Words lines={[a.collabHeading]} /></h2></div>
              <div className={styles.practiceText} data-reveal style={{ "--d": 200 }}>
                <span className={styles.kicker}>{a.frontendLabel}</span>
                <h3>{a.frontend}</h3>
                <p>{a.frontendBody}</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.closing} id="about-closing" aria-labelledby="closing-title">
          <div className={styles.inner}>
            <h2 id="closing-title" data-reveal="words"><Words lines={[a.closingTitle]} /></h2>
            <p data-reveal style={{ "--d": 200 }}>{a.closingLead}</p>
            <div className={styles.actions} data-reveal style={{ "--d": 300 }}>
              <Link href={fr ? "/fr#contact" : "/#contact"} className={styles.primary}><RollText>{a.contact}</RollText><span aria-hidden="true">↗</span></Link>
              <a href={t.resume.href} download={t.resume.fileName} className={styles.secondary}><RollText>{c.contact.resume}</RollText><span aria-hidden="true">↓</span></a>
              <Link href={`${prefix}/work`} className={styles.secondary}><RollText>{a.work}</RollText><span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
