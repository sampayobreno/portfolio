import Image from "next/image";
import Link from "next/link";
import { ProcessStory } from "@/components/site/ProcessStory";
import { Words } from "@/components/site/Words";
import { RollText } from "@/components/site/RollText";
import { ProjectCard } from "@/components/site/ProjectCard";
import { getExampleProjects } from "@/lib/exampleProjects";
import { ContactForm } from "@/components/site/ContactForm";
import { getT } from "@/lib/i18n";
import { getPortfolioEditorial } from "@/lib/portfolioEditorial";
import { portfolioProfileFacts } from "@/lib/portfolioV2";
import styles from "./EditorialShell.module.css";
import hero from "./HomeIntro.module.css";
import work from "./HomeSelectedWork.module.css";
import process from "./HomeProcess.module.css";
import about from "./HomeAbout.module.css";
import contact from "./HomeContact.module.css";

// Selected work shows example projects (design direction) until real projects are chosen.
const SHOW_SELECTED_WORK = true;

export function HomeContent({ lang = "en" }) {
  const c = getPortfolioEditorial(lang);
  const t = getT(lang);
  const prefix = lang === "fr" ? "/fr" : "";
  const { links } = portfolioProfileFacts;
  const featured = getExampleProjects(lang).slice(0, 3);
  const order = (n) => String(SHOW_SELECTED_WORK ? n : n - 1).padStart(2, "0");

  return (
    <div className={styles.shell}>
      {/* ====================================================================
          01 · HERO
          ==================================================================== */}
      <section className={hero.intro} id="top" data-label={c.labels.top} aria-labelledby="hero-title">
        <div className={hero.grid}>
          <div className={hero.identity}>
            <p className={hero.label} data-reveal style={{ "--d": 100 }}>{lang === "fr" ? "DESIGN PRODUIT · VALENCE, ESPAGNE" : "PRODUCT DESIGN · VALENCIA, SPAIN"}</p>
            <h1 id="hero-title" data-reveal="words" style={{ "--d": 200 }}><Words lines={lang === "fr" ? ["Bonjour,", "je suis Breno."] : ["Hello,", "I’m Breno."]} /></h1>
            <p className={hero.role} data-reveal style={{ "--d": 500 }}>{lang === "fr" ? "Designer produit" : "Product designer"}</p>
          </div>
          <div className={hero.statement}>
            <p className={hero.statementText} data-reveal style={{ "--d": 350 }}><strong>{lang === "fr" ? "Je rends les expériences complexes plus faciles à comprendre." : "I make complex experiences easier to navigate."}</strong> {lang === "fr" ? "Je relie les besoins des personnes, les décisions produit et les prototypes fonctionnels." : "I connect people’s needs, product decisions and working prototypes."}</p>
            <p className={hero.context} data-reveal style={{ "--d": 450 }}>{c.hero.lead}</p>
            <div className={hero.actions} data-reveal style={{ "--d": 550 }}>
              {SHOW_SELECTED_WORK ? <>
                <Link href={`${prefix}/work`} className={hero.primary}><RollText>{c.hero.primary}</RollText><span aria-hidden="true">↗</span></Link>
                <Link href={`${prefix}/about`} className={hero.secondary}><RollText>{c.hero.secondary}</RollText><span aria-hidden="true">↗</span></Link>
              </> : <>
                <Link href={`${prefix}/about`} className={hero.primary}><RollText>{c.hero.secondary}</RollText><span aria-hidden="true">↗</span></Link>
                <a href="#contact" className={hero.secondary}><RollText>{lang === "fr" ? "Me contacter" : "Get in touch"}</RollText><span aria-hidden="true">↓</span></a>
              </>}
            </div>
          </div>
          <figure className={hero.portrait}>
            <div className={hero.photo} data-reveal="mask" style={{ "--d": 300 }}><Image src="/images/breno-hero-portrait.jpeg" alt="Breno Sampaio" width={486} height={420} priority sizes="(max-width: 760px) 100vw, 32vw" /></div>
            <figcaption data-reveal style={{ "--d": 900 }}><span>Breno Sampaio</span><span>Valencia, Spain</span></figcaption>
          </figure>
        </div>
        <div className={hero.bottomLine} data-reveal style={{ "--d": 700 }}><span>{lang === "fr" ? "DESIGN · CLARTÉ · PROTOTYPAGE" : "DESIGN · CLARITY · PROTOTYPING"}</span><a href="#approach" className={hero.scrollCue}><RollText>{lang === "fr" ? "DÉCOUVRIR" : "EXPLORE"}</RollText> <span aria-hidden="true">↓</span></a></div>
      </section>

      {/* ====================================================================
          02 · SELECTED WORK (Approved Product Stage + Structured Context)
          ==================================================================== */}
      {SHOW_SELECTED_WORK && <section className={work.section} id="work" data-label={c.labels.work} aria-labelledby="home-work-title">
        <div className={work.inner}>
          <div className={work.heading}>
            <div><p className={work.eyebrow} data-reveal><span className="eyebrow-num">{order(1)}</span> / {lang === "fr" ? "PROJETS CHOISIS" : "SELECTED WORK"}</p><h2 id="home-work-title" data-reveal="words"><Words lines={lang === "fr" ? ["Le travail,", "en pratique."] : ["Selected work,", "in practice."]} /></h2></div>
            <div data-reveal style={{ "--d": 250 }}>
              <p>{lang === "fr" ? "Des produits complexes rendus clairs : le problème, les décisions et ce qui a changé." : "Complex products made clear: the problem, the decisions and what changed."}</p>
              <Link href={`${prefix}/work`} className={work.all}><RollText>{lang === "fr" ? "Tous les projets" : "All work"}</RollText><span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className={work.grid}>
            {featured.map((project, i) => <ProjectCard key={project.slug} project={project} index={i} lang={lang} size={i === 0 ? "large" : "default"} />)}
          </div>
          <p className={work.note}>{lang === "fr" ? "Projets d’exemple pour la direction de design — produits, rôles et résultats fictifs." : "Example projects for design direction — fictional products, roles and outcomes."}</p>
        </div>
      </section>}

      {/* ====================================================================
          04 · WAY OF WORKING (Approved Option A: Quiet Editorial 3 Rows)
          ==================================================================== */}
      <section className={process.section} id="approach" data-label={c.labels.approach} aria-labelledby="approach-title">
        <div className={process.inner}>
          <header className={process.heading}>
            <div><p className={process.eyebrow} data-reveal><span className="eyebrow-num">{order(2)}</span> / {lang === "fr" ? "MA DÉMARCHE" : "HOW I WORK"}</p><h2 id="approach-title" data-reveal="words"><Words lines={lang === "fr" ? ["De la complexité", "à la clarté."] : ["From complexity", "to clarity."]} /></h2></div>
            <p data-reveal style={{ "--d": 250 }}>{lang === "fr" ? "Une pratique qui relie le cadrage, les décisions d’interface et les prototypes fonctionnels, en rendant les hypothèses visibles." : "A practice that connects framing, interface decisions and working prototypes, with assumptions kept visible."}</p>
          </header>
          <ProcessStory lang={lang} />
        </div>
      </section>

      {/* ====================================================================
          05 · ABOUT & BACKGROUND (Approved Option 3 Responsive Two-Columns)
          ==================================================================== */}
      <section className={about.section} id="about" data-label={c.labels.about} aria-labelledby="about-title">
        <div className={about.inner}>
          <div className={about.heading}><div><p className={about.eyebrow} data-reveal><span className="eyebrow-num">{order(3)}</span> / {lang === "fr" ? "À PROPOS" : "ABOUT"}</p><h2 id="about-title" data-reveal="words"><Words lines={lang === "fr" ? ["Un regard humain", "sur la complexité."] : ["A human lens", "on complexity."]} /></h2></div><p data-reveal style={{ "--d": 250 }}>{lang === "fr" ? "Designer produit basé à Valence, avec un parcours dans les opérations multilingues." : "A product designer based in Valencia, with a background in multilingual operations."}</p></div>
          <div className={about.grid}>
            <div className={about.label}>{lang === "fr" ? "PARCOURS & PERSPECTIVE" : "BACKGROUND & PERSPECTIVE"}</div>
            <div className={about.story} data-reveal style={{ "--d": 100 }}><p className={about.lead}>{c.about.col1Body}</p><p>{c.about.col2Body}</p><Link href={`${prefix}/about`} className={about.link}><RollText>{c.about.link}</RollText><span aria-hidden="true">↗</span></Link></div>
            <div className={about.facts} data-reveal style={{ "--d": 200 }}><div><span>{lang === "fr" ? "BASE" : "BASED IN"}</span><strong>Valencia, Spain</strong></div><div><span>{lang === "fr" ? "PRATIQUE" : "PRACTICE"}</span><strong>Product Design<br />Frontend prototyping</strong></div></div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          06 · CONTACT (Approved Option 2: Direct Facts + Open Form Card)
          ==================================================================== */}
      <section className={contact.section} id="contact" data-label={c.labels.contact} aria-labelledby="contact-title" tabIndex={-1}>
        <div className={contact.inner}>
          <div className={contact.heading}><div><p className={contact.eyebrow} data-reveal><span className="eyebrow-num">{order(4)}</span> / {lang === "fr" ? "CONTACT" : "CONTACT"}</p><h2 id="contact-title" data-reveal="words"><Words lines={lang === "fr" ? ["Parlons", "ensemble."] : ["Let’s make", "a connection."]} /></h2></div><p data-reveal style={{ "--d": 250 }}>{c.contact.lead}</p></div>
          <div className={contact.grid}>
            <div className={contact.details} data-reveal>
              <div><span className={contact.label}>{c.contact.directLabel}</span><a className={contact.email} href={`mailto:${links.email}`}>{links.email}<span aria-hidden="true">↗</span></a></div>
              <div className={contact.links}><span className={contact.label}>{c.contact.docsLabel}</span><a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href={links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={t.resume.href} download={t.resume.fileName}>{c.contact.resume} ↓</a></div>
              <div><span className={contact.label}>{c.contact.baseLabel}</span><p>{c.contact.baseValue}</p></div>
            </div>
            <div className={contact.form} data-reveal style={{ "--d": 150 }}><div className={contact.formHead}><h3>{c.contact.form}</h3><span>↗</span></div><ContactForm lang={lang} /></div>
          </div>
        </div>
      </section>

    </div>
  );
}
