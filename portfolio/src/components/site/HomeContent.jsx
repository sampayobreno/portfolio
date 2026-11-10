import Image from "next/image";
import Link from "next/link";
import { ProcessStory } from "@/components/site/ProcessStory";
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

// Selected work stays hidden until real projects are chosen; the section markup is kept for later.
const SHOW_SELECTED_WORK = false;

export function HomeContent({ lang = "en" }) {
  const c = getPortfolioEditorial(lang);
  const t = getT(lang);
  const prefix = lang === "fr" ? "/fr" : "";
  const { links } = portfolioProfileFacts;
  const order = (n) => String(SHOW_SELECTED_WORK ? n : n - 1).padStart(2, "0");

  return (
    <div className={styles.shell}>
      {/* ====================================================================
          01 · HERO
          ==================================================================== */}
      <section className={hero.intro} id="top" data-label={c.labels.top} aria-labelledby="hero-title">
        <div className={hero.grid}>
          <div className={hero.identity}>
            <p className={hero.label}>{lang === "fr" ? "DESIGN PRODUIT · VALENCE, ESPAGNE" : "PRODUCT DESIGN · VALENCIA, SPAIN"}</p>
            <h1 id="hero-title">{lang === "fr" ? <>Bonjour,<br />je suis Breno.</> : <>Hello,<br />I’m Breno.</>}</h1>
            <p className={hero.role}>{lang === "fr" ? "Designer produit" : "Product designer"}</p>
          </div>
          <div className={hero.statement}>
            <p className={hero.statementText}><strong>{lang === "fr" ? "Je rends les expériences complexes plus faciles à comprendre." : "I make complex experiences easier to navigate."}</strong> {lang === "fr" ? "Je relie les besoins des personnes, les décisions produit et les prototypes fonctionnels." : "I connect people’s needs, product decisions and working prototypes."}</p>
            <p className={hero.context}>{c.hero.lead}</p>
            <div className={hero.actions}>
              {SHOW_SELECTED_WORK ? <>
                <Link href={`${prefix}/work`} className={hero.primary}>{c.hero.primary}<span aria-hidden="true">↗</span></Link>
                <Link href={`${prefix}/about`} className={hero.secondary}>{c.hero.secondary}<span aria-hidden="true">↗</span></Link>
              </> : <>
                <Link href={`${prefix}/about`} className={hero.primary}>{c.hero.secondary}<span aria-hidden="true">↗</span></Link>
                <a href="#contact" className={hero.secondary}>{lang === "fr" ? "Me contacter" : "Get in touch"}<span aria-hidden="true">↓</span></a>
              </>}
            </div>
          </div>
          <figure className={hero.portrait}>
            <Image src="/images/breno-hero-portrait.jpeg" alt="Breno Sampaio" width={486} height={420} priority sizes="(max-width: 760px) 100vw, 32vw" />
            <figcaption><span>Breno Sampaio</span><span>Valencia, Spain</span></figcaption>
          </figure>
        </div>
        <div className={hero.bottomLine}><span>{lang === "fr" ? "DESIGN · CLARTÉ · PROTOTYPAGE" : "DESIGN · CLARITY · PROTOTYPING"}</span><a href="#approach" className={hero.scrollCue}>{lang === "fr" ? "DÉCOUVRIR" : "EXPLORE"} <span aria-hidden="true">↓</span></a></div>
      </section>

      {/* ====================================================================
          02 · SELECTED WORK (Approved Product Stage + Structured Context)
          ==================================================================== */}
      {SHOW_SELECTED_WORK && <section className={work.section} id="work" data-label={c.labels.work} aria-labelledby="home-work-title">
        <div className={work.heading}>
          <div><p className={work.eyebrow}>01 / {lang === "fr" ? "PROJETS CHOISIS" : "SELECTED WORK"}</p><h2 id="home-work-title">{lang === "fr" ? <>Le travail,<br />en pratique.</> : <>Selected work,<br />in practice.</>}</h2></div>
          <p>{lang === "fr" ? "La sélection de projets est en cours de préparation." : "The project selection is currently being prepared."}</p>
        </div>
        <div className={work.emptySelection}><p>{lang === "fr" ? "Les projets choisis seront présentés ici." : "Selected projects will appear here."}</p></div>
      </section>}

      {/* ====================================================================
          04 · WAY OF WORKING (Approved Option A: Quiet Editorial 3 Rows)
          ==================================================================== */}
      <section className={process.section} id="approach" data-label={c.labels.approach} aria-labelledby="approach-title">
        <div className={process.inner}>
          <header className={process.heading}>
            <div><p className={process.eyebrow}><span className="eyebrow-num">{order(2)}</span> / {lang === "fr" ? "MA DÉMARCHE" : "HOW I WORK"}</p><h2 id="approach-title">{lang === "fr" ? <>De la complexité<br />à la clarté.</> : <>From complexity<br />to clarity.</>}</h2></div>
            <p>{lang === "fr" ? "Une pratique qui relie le cadrage, les décisions d’interface et les prototypes fonctionnels, en rendant les hypothèses visibles." : "A practice that connects framing, interface decisions and working prototypes, with assumptions kept visible."}</p>
          </header>
          <ProcessStory lang={lang} showVisual={false} />
        </div>
      </section>

      {/* ====================================================================
          05 · ABOUT & BACKGROUND (Approved Option 3 Responsive Two-Columns)
          ==================================================================== */}
      <section className={about.section} id="about" data-label={c.labels.about} aria-labelledby="about-title">
        <div className={about.inner}>
          <div className={about.heading}><div><p className={about.eyebrow}><span className="eyebrow-num">{order(3)}</span> / {lang === "fr" ? "À PROPOS" : "ABOUT"}</p><h2 id="about-title">{lang === "fr" ? <>Un regard humain<br />sur la complexité.</> : <>A human lens<br />on complexity.</>}</h2></div><p>{lang === "fr" ? "Designer produit basé à Valence, avec un parcours dans les opérations multilingues." : "A product designer based in Valencia, with a background in multilingual operations."}</p></div>
          <div className={about.grid}>
            <div className={about.label}>{lang === "fr" ? "PARCOURS & PERSPECTIVE" : "BACKGROUND & PERSPECTIVE"}</div>
            <div className={about.story}><p className={about.lead}>{c.about.col1Body}</p><p>{c.about.col2Body}</p><Link href={`${prefix}/about`} className={about.link}>{c.about.link}<span aria-hidden="true">↗</span></Link></div>
            <div className={about.facts}><div><span>{lang === "fr" ? "BASE" : "BASED IN"}</span><strong>Valencia, Spain</strong></div><div><span>{lang === "fr" ? "PRATIQUE" : "PRACTICE"}</span><strong>Product Design<br />Frontend prototyping</strong></div></div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          06 · CONTACT (Approved Option 2: Direct Facts + Open Form Card)
          ==================================================================== */}
      <section className={contact.section} id="contact" data-label={c.labels.contact} aria-labelledby="contact-title" tabIndex={-1}>
        <div className={contact.inner}>
          <div className={contact.heading}><div><p className={contact.eyebrow}><span className="eyebrow-num">{order(4)}</span> / {lang === "fr" ? "CONTACT" : "CONTACT"}</p><h2 id="contact-title">{lang === "fr" ? <>Parlons<br />ensemble.</> : <>Let’s make<br />a connection.</>}</h2></div><p>{c.contact.lead}</p></div>
          <div className={contact.grid}>
            <div className={contact.details}>
              <div><span className={contact.label}>{c.contact.directLabel}</span><a className={contact.email} href={`mailto:${links.email}`}>{links.email}<span aria-hidden="true">↗</span></a></div>
              <div className={contact.links}><span className={contact.label}>{c.contact.docsLabel}</span><a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href={links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={t.resume.href} download={t.resume.fileName}>{c.contact.resume} ↓</a></div>
              <div><span className={contact.label}>{c.contact.baseLabel}</span><p>{c.contact.baseValue}</p></div>
            </div>
            <div className={contact.form}><div className={contact.formHead}><h3>{c.contact.form}</h3><span>↗</span></div><ContactForm lang={lang} /></div>
          </div>
        </div>
      </section>

    </div>
  );
}
