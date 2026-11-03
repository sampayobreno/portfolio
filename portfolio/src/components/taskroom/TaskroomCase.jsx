import Image from "next/image";
import Link from "next/link";
import { CaseHero } from "@/components/site/CaseHero";
import { CaseSection } from "@/components/site/CaseSection";
import { CaseSnapshot } from "@/components/site/CaseSnapshot";
import styles from "@/components/site/EditorialShell.module.css";
import proofStyles from "./TaskroomCase.module.css";

const copy = {
  en: {
    back: "Back to work",
    stage: "Independent prototype",
    lead: "A request workspace for small creative teams. Capture a client’s request, clarify what’s missing and show who takes the next step.",
    alt: "Taskroom request queue and a selected brief. The brief is waiting for reference materials and shows Alex Morgan as the owner.",
    caption: "The working request inbox, with fictional sample records.",
    artwork: "Concept illustration based on the Taskroom prototype.",
    cta: "Try the demo (English)",
    facts: [{ label: "Focus", value: "Intake and clarification" }, { label: "Platform", value: "Responsive web" }, { label: "Data", value: "Fictional examples" }, { label: "Research", value: "Participant testing planned" }],
    researchLabel: "Desk research · 2023",
    researchStat: "8.8",
    researchDescription: "apps used on average by surveyed knowledge workers, according to Asana’s 2023 Anatomy of Work study.",
    researchContext: "The survey covered 9,615 knowledge workers in six countries. It provides broad context for fragmented work, not validation of Taskroom or evidence about small creative teams specifically.",
    researchSource: "Read Asana’s methodology and findings",
    metricsHeading: "What we can measure",
    metricsIntro: "Measurement plan · No participant or product results yet",
    metrics: [
      ["Task completion", "People who create and clarify a request without help ÷ people who try the task."],
      ["Recovery", "People who resolve a missing detail and move the brief to Ready ÷ people given a blocked brief."],
      ["Errors and assistance", "Record missed steps, requests for help and time for the same task, alongside sample size."],
    ],
    measuresNote: "These are proposed measures. The three sample requests in the demo are fictional; they do not represent customer activity or conversion.",
    sections: [
      ["context", "The problem", "A request can arrive before the brief is complete", "Small creative teams may receive work through email, chat or conversation. Taskroom explores whether keeping the brief, ownership and next action in one place makes it easier to pick up a request."],
      ["decision", "The decision", "Let people capture work before assigning it", "Requiring an owner when a request first arrives would make every record complete sooner, but it assumes the person capturing it already knows who should take it. The prototype asks for an owner and resolved details when the brief moves to Ready. Until then, the queue shows the blocker and what needs to happen next."],
      ["workflow", "The workflow", "Make missing information visible in the queue", "Start with Autumn campaign assets and ask for the final dimensions. Then edit the brief with the response and mark the dimensions resolved. Once the brief has an owner, mark it ready, start work and complete it. The activity log keeps a record of the changes. Drafts and requests are saved in the browser."],
      ["validation", "Validation", "Test whether someone can recover a blocked request", "A usability session would ask someone to capture a request, identify what’s missing and prepare the brief without help. Observe where they look for the next action and whether they understand the Ready requirement. The prototype demonstrates the interaction. Usability and impact are still open questions."],
    ],
  },
  fr: {
    back: "Retour aux projets",
    stage: "Prototype indépendant",
    lead: "Un espace de gestion des demandes pour les petites équipes créatives. Consignez la demande d’un client, clarifiez les informations manquantes et indiquez qui prend la suite.",
    alt: "File de demandes Taskroom et brief sélectionné. Le brief attend les documents de référence et indique Alex Morgan comme responsable.",
    caption: "L’interface fonctionnelle de la file de demandes, avec des exemples fictifs.",
    artwork: "Illustration conceptuelle basée sur le prototype Taskroom.",
    cta: "Essayer la démo (en anglais)",
    facts: [{ label: "Périmètre", value: "Collecte et clarification" }, { label: "Plateforme", value: "Web adaptatif" }, { label: "Données", value: "Exemples fictifs" }, { label: "Recherche", value: "Tests utilisateurs prévus" }],
    researchLabel: "Recherche documentaire · 2023",
    researchStat: "8,8",
    researchDescription: "applications utilisées en moyenne par les travailleurs du savoir interrogés dans l’étude Anatomy of Work 2023 d’Asana.",
    researchContext: "L’enquête a porté sur 9 615 travailleurs du savoir dans six pays. Elle apporte un contexte général sur la fragmentation du travail et ne valide pas Taskroom ni les besoins propres aux petites équipes créatives.",
    researchSource: "Consulter la méthode et les résultats d’Asana",
    metricsHeading: "Ce que nous pourrons mesurer",
    metricsIntro: "Plan de mesure · Aucun résultat utilisateur ou produit à ce jour",
    metrics: [
      ["Réussite de la tâche", "Personnes qui créent et clarifient une demande sans aide ÷ personnes ayant tenté la tâche."],
      ["Résolution d’un blocage", "Personnes qui complètent une information et passent le brief à Ready ÷ personnes ayant reçu un brief bloqué."],
      ["Erreurs et aide", "Consigner les étapes manquées, les demandes d’aide, le temps pour la même tâche et la taille de l’échantillon."],
    ],
    measuresNote: "Ces mesures sont proposées. Les trois demandes de la démo sont fictives et ne représentent ni activité client ni conversion.",
    sections: [
      ["context", "Le problème", "Une demande peut arriver avant que le brief soit complet", "Les petites équipes créatives peuvent recevoir des demandes par courriel, messagerie ou conversation. Taskroom explore une hypothèse : réunir le brief, la responsabilité et la prochaine action peut faciliter la prise en charge."],
      ["decision", "La décision", "Permettre la saisie avant l’attribution", "Exiger un responsable dès la saisie compléterait plus vite les dossiers, mais suppose que la personne qui reçoit la demande sait déjà à qui l’attribuer. Dans le prototype, un responsable doit être désigné et les informations manquantes doivent être complétées pour passer à l’état Ready. La file indique le blocage et la prochaine action."],
      ["workflow", "Le parcours", "Rendre les informations manquantes visibles dans la file", "Ouvrez Autumn campaign assets et demandez les dimensions finales. Ajoutez la réponse au brief, puis indiquez que les dimensions sont confirmées. Une fois un responsable désigné, marquez la demande comme prête, lancez le travail et terminez-le. L’historique conserve les changements. Les brouillons et les demandes sont enregistrés dans le navigateur."],
      ["validation", "Validation", "Vérifier si une personne peut débloquer une demande", "En séance de test, demander à une personne de saisir une demande, d’identifier les informations manquantes et de préparer le brief sans aide. Observer où elle cherche la prochaine action et si elle comprend la condition de passage à l’état Ready. Le prototype démontre l’interaction. Son utilisabilité et son impact restent à évaluer."],
    ],
  },
};

function TaskroomArtwork({ alt }) {
  return <Image src="/images/taskroom/taskroom-editorial.png" alt={alt} width={1672} height={941}
    sizes="(max-width: 760px) 90vw, 1000px" />;
}

function TaskroomImage({ alt }) {
  return <Image src="/images/taskroom/request-inbox.png" alt={alt} width={998} height={560}
    sizes="(max-width: 760px) 90vw, 60vw" />;
}

export function TaskroomCard({ lang }) {
  const c = copy[lang];
  return (
    <article className={`${styles.projectCard} ${proofStyles.card}`} aria-labelledby="taskroom-card-title">
      <figure className={styles.projectMedia}>
        <TaskroomArtwork alt={c.artwork} />
        <figcaption>{c.artwork}</figcaption>
      </figure>
      <div className={styles.projectCopy}>
        <p className={styles.projectMeta}>{c.stage} · 2026</p>
        <h2 className={styles.projectHeading} id="taskroom-card-title">Taskroom</h2>
        <p className={styles.projectDescription}>{c.lead}</p>
        <Link className={styles.projectLink} href={lang === "fr" ? "/fr/work/taskroom" : "/work/taskroom"}>
          {lang === "fr" ? "Lire l’étude de cas Taskroom" : "Read the Taskroom case study"} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

export function TaskroomCase({ lang = "en" }) {
  const c = copy[lang];
  const fr = lang === "fr";
  const demo = fr ? "/work/taskroom/demo?from=fr" : "/work/taskroom/demo";
  return (
    <article className={styles.shell}>
      <CaseHero backHref={fr ? "/fr/work" : "/work"} backLabel={c.back}
        title="Taskroom" lead={c.lead} tags={[c.stage, "2026"]}
        visual={<figure className={proofStyles.proof}><TaskroomArtwork alt={c.artwork} /><figcaption>{c.artwork}</figcaption></figure>}>
        <div className={proofStyles.cta}><Link className={styles.projectLink} href={demo}>{c.cta} <span aria-hidden="true">↗</span></Link></div>
        <CaseSnapshot items={c.facts} />
      </CaseHero>
      <section className="container section case-section" aria-labelledby="taskroom-interface">
        <p className="eyebrow eyebrow--accent">{fr ? "L’interface" : "The interface"}</p>
        <h2 id="taskroom-interface">{fr ? "Le prototype en action" : "The prototype in use"}</h2>
        <figure className={proofStyles.proof}><TaskroomImage alt={c.alt} /><figcaption>{c.caption}</figcaption></figure>
      </section>
      {c.sections.map(([id, label, heading, body], index) => (
        <CaseSection id={id} label={label} number={`0${index + 1} · ${label}`} heading={heading} key={id}>
          <p className={proofStyles.body}>{body}</p>
        </CaseSection>
      ))}
      <section className="container section case-section" aria-labelledby="taskroom-research">
        <p className="eyebrow eyebrow--accent">{c.researchLabel}</p>
        <h2 id="taskroom-research">{fr ? "Le contexte plus large" : "The broader context"}</h2>
        <div className={proofStyles.research}>
          <strong>{c.researchStat}</strong>
          <div><p>{c.researchDescription}</p><p>{c.researchContext}</p>
            <a href="https://asana.com/press/releases/pr/asana-anatomy-of-work-global-index-2023-smart-collaboration-and-clear-goals-integral-to-creating-positive-business-opportunities/5957f2bd-2a85-4ea1-93ed-6c507b478954">{c.researchSource} ↗</a></div>
        </div>
      </section>
      <section className="container section case-section" aria-labelledby="taskroom-measurement">
        <p className="eyebrow eyebrow--accent">05 · {fr ? "Mesure" : "Measurement"}</p>
        <h2 id="taskroom-measurement">{c.metricsHeading}</h2>
        <p className={proofStyles.metricsIntro}>{c.metricsIntro}</p>
        <dl className={proofStyles.metrics}>
          {c.metrics.map(([name, definition]) => <div key={name}><dt>{name}</dt><dd>{definition}</dd></div>)}
        </dl>
        <p className={proofStyles.body}>{c.measuresNote}</p>
      </section>
    </article>
  );
}
