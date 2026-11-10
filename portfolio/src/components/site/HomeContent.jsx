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
import practice from "./HomePractice.module.css";
import process from "./HomeProcess.module.css";
import about from "./HomeAbout.module.css";
import contact from "./HomeContact.module.css";

export function HomeContent({ lang = "en" }) {
  const c = getPortfolioEditorial(lang);
  const t = getT(lang);
  const prefix = lang === "fr" ? "/fr" : "";
  const { links } = portfolioProfileFacts;

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
              <Link href={`${prefix}/work`} className={hero.primary}>{c.hero.primary}<span aria-hidden="true">↗</span></Link>
              <Link href={`${prefix}/about`} className={hero.secondary}>{c.hero.secondary}<span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <figure className={hero.portrait}>
            <Image src="/images/breno-hero-portrait.jpeg" alt="Breno Sampaio" width={486} height={420} priority sizes="(max-width: 760px) 100vw, 32vw" />
            <figcaption><span>Breno Sampaio</span><span>Valencia, Spain</span></figcaption>
          </figure>
        </div>
        <div className={hero.bottomLine}><span>{lang === "fr" ? "DESIGN · CLARTÉ · PROTOTYPAGE" : "DESIGN · CLARITY · PROTOTYPING"}</span><span>{lang === "fr" ? "DÉCOUVRIR LE TRAVAIL" : "EXPLORE THE WORK"} ↓</span></div>
      </section>

      {/* ====================================================================
          02 · SELECTED WORK (Approved Product Stage + Structured Context)
          ==================================================================== */}
      <section className={work.section} id="work" data-label={c.labels.work} aria-labelledby="home-work-title">
        <div className={work.heading}>
          <div><p className={work.eyebrow}>01 / {lang === "fr" ? "PROJETS CHOISIS" : "SELECTED WORK"}</p><h2 id="home-work-title">{lang === "fr" ? <>Le travail,<br />en pratique.</> : <>Selected work,<br />in practice.</>}</h2></div>
          <p>{lang === "fr" ? "La sélection de projets est en cours de préparation." : "The project selection is currently being prepared."}</p>
        </div>
        <div className={work.emptySelection}><p>{lang === "fr" ? "Les projets choisis seront présentés ici." : "Selected projects will appear here."}</p></div>
      </section>

      {/* ====================================================================
          03 · FOCUS & CAPABILITIES (Approved 3-Tab Interactive Explorer)
          ==================================================================== */}
      <section className={practice.section} id="capabilities" data-label={c.labels.capabilities} aria-labelledby="capabilities-title">
        <div className={practice.content}>
          <div className={practice.heading}>
            <div><p className={practice.eyebrow}>02 / {lang === "fr" ? "DESIGN & CONSTRUCTION" : "DESIGN & BUILD"}</p><h2 id="capabilities-title">{lang === "fr" ? <>De la complexité<br />à la clarté.</> : <>From complexity<br />to clarity.</>}</h2></div>
            <p>{lang === "fr" ? "Une pratique qui relie le cadrage, les décisions d’interface et les prototypes fonctionnels." : "A practice that connects framing, interface decisions and working prototypes."}</p>
          </div>
          <div className={practice.grid}>
            <article><span className={practice.number}>01 / {lang === "fr" ? "COMPRENDRE" : "UNDERSTAND"}</span><h3>{lang === "fr" ? "Cadrer le problème." : "Frame the problem."}</h3><p>{lang === "fr" ? "Rassembler les besoins, le contexte et les contraintes pour clarifier la prochaine décision." : "Bring needs, context and constraints together to make the next decision clearer."}</p><span className={practice.detail}>{lang === "fr" ? "CONTEXTE · FLUX · CONTRAINTES" : "CONTEXT · FLOWS · CONSTRAINTS"}</span></article>
            <article><span className={practice.number}>02 / {lang === "fr" ? "CONCEVOIR" : "DESIGN"}</span><h3>{lang === "fr" ? "Dessiner les décisions." : "Design the decisions."}</h3><p>{lang === "fr" ? "Explorer les états, les interactions et la hiérarchie qui aident les personnes à avancer." : "Explore the states, interactions and hierarchy that help people move forward."}</p><span className={practice.detail}>{lang === "fr" ? "INTERACTION · ÉTATS · SYSTÈMES" : "INTERACTION · STATES · SYSTEMS"}</span></article>
            <article><span className={practice.number}>03 / {lang === "fr" ? "PROTOTYPER" : "PROTOTYPE"}</span><h3>{lang === "fr" ? "Donner vie aux idées." : "Make ideas tangible."}</h3><p>{lang === "fr" ? "Construire des prototypes pour examiner les comportements, les limites et les questions ouvertes." : "Build prototypes to examine behaviour, limitations and the questions still open."}</p><span className={practice.detail}>FIGMA · REACT · ACCESSIBILITY</span></article>
          </div>
        </div>
      </section>

      {/* ====================================================================
          04 · WAY OF WORKING (Approved Option A: Quiet Editorial 3 Rows)
          ==================================================================== */}
      <section className={process.section} id="approach" data-label={c.labels.approach} aria-labelledby="approach-title">
        <div className={process.inner}>
          <header className={process.heading}>
            <div><p className={process.eyebrow}>03 / {lang === "fr" ? "MA DÉMARCHE" : "HOW I WORK"}</p><h2 id="approach-title">{lang === "fr" ? <>Des questions<br />aux décisions.</> : <>From questions<br />to decisions.</>}</h2></div>
            <p>{lang === "fr" ? "Une démarche pour rendre les choix plus clairs, les hypothèses visibles et les interfaces plus faciles à explorer." : "An approach to make choices clearer, assumptions visible and interfaces easier to explore."}</p>
          </header>
          <ProcessStory lang={lang} showVisual={false} />
        </div>
      </section>

      {/* ====================================================================
          05 · ABOUT & BACKGROUND (Approved Option 3 Responsive Two-Columns)
          ==================================================================== */}
      <section className={about.section} id="about" data-label={c.labels.about} aria-labelledby="about-title">
        <div className={about.inner}>
          <div className={about.heading}><div><p className={about.eyebrow}>04 / {lang === "fr" ? "À PROPOS" : "ABOUT"}</p><h2 id="about-title">{lang === "fr" ? <>Un regard humain<br />sur la complexité.</> : <>A human lens<br />on complexity.</>}</h2></div><p>{lang === "fr" ? "Designer produit basé à Valence, avec un parcours dans les opérations multilingues." : "A product designer based in Valencia, with a background in multilingual operations."}</p></div>
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
          <div className={contact.heading}><div><p className={contact.eyebrow}>05 / {lang === "fr" ? "CONTACT" : "CONTACT"}</p><h2 id="contact-title">{lang === "fr" ? <>Parlons<br />ensemble.</> : <>Let’s make<br />a connection.</>}</h2></div><p>{c.contact.lead}</p></div>
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
