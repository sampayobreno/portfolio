import Image from "next/image";
import Link from "next/link";
import styles from "@/components/site/EditorialShell.module.css";
import proofStyles from "./TaskroomCase.module.css";
import { CaseGuide } from "./CaseGuide";

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
    researchContext: "The survey covered more than 9,615 knowledge workers in six countries. It provides broad context for fragmented work, not validation of Taskroom or evidence about small creative teams specifically.",
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
    researchContext: "L’enquête a porté sur plus de 9 615 travailleurs du savoir dans six pays. Elle apporte un contexte général sur la fragmentation du travail et ne valide pas Taskroom ni les besoins propres aux petites équipes créatives.",
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

function TaskroomImage({ alt }) {
  return <Image src="/images/taskroom/request-inbox.png" alt={alt} width={998} height={560}
    sizes="(max-width: 760px) 90vw, 60vw" />;
}

export function TaskroomCard({ lang }) {
  const c = copy[lang];
  return (
    <article className={`${styles.projectCard} ${proofStyles.card}`} aria-labelledby="taskroom-card-title">
      <figure className={styles.projectMedia}>
        <TaskroomImage alt={c.alt} />
        <figcaption>{c.caption}</figcaption>
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
      <CaseGuide lang={lang} />
      <header id="case-overview" className={proofStyles.caseOpening}>
        <div className={proofStyles.openingInner}>
          <Link className={proofStyles.backLink} href={fr ? "/fr/work" : "/work"}>← {c.back}</Link>
          <div className={proofStyles.openingGrid}>
            <div><p className={proofStyles.openingLabel}>{c.stage} · 2026</p><h1>Taskroom</h1></div>
            <div className={proofStyles.openingSummary}><p>{c.lead}</p><Link href={demo}>{c.cta} <span aria-hidden="true">↗</span></Link></div>
          </div>
          <dl className={proofStyles.openingFacts}>{c.facts.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          <figure className={proofStyles.openingImage}><TaskroomImage alt={c.alt} /><figcaption>{c.caption}</figcaption></figure>
        </div>
      </header>
      <section className={`${proofStyles.solutionStory}`} aria-labelledby="taskroom-choices">
        <div className={proofStyles.solutionInner}>
        <div className={proofStyles.storyIntro}>
          <div><p className={proofStyles.solutionLabel}>{fr ? "01 / La solution" : "01 / The solution"}</p>
          <h2 id="taskroom-choices">{fr ? "Un brief incomplet reste visible" : "An incomplete brief stays visible"}</h2></div>
          <p className={proofStyles.solutionLead}>{fr
            ? "Deux vues du prototype montrent comment une demande bloquée garde son contexte et la prochaine action."
            : "Two views from the prototype show how a blocked request keeps its context and next action visible."}</p>
        </div>
        <div className={proofStyles.storyGrid}>
          <figure>
            <Image src="/images/taskroom/request-detail.png" width={1004} height={655} sizes="(max-width: 760px) 90vw, 48vw" alt={fr ? "Détail d’une demande avec état, responsable et historique." : "Request detail showing status, owner and activity history."} />
            <figcaption><span>01 / {fr ? "Contexte" : "Context"}</span><p>{fr ? "L’état Needs details indique qui agit ensuite, tandis que l’historique conserve les décisions." : "Needs details identifies what happens next while the activity log preserves the request’s history."}</p></figcaption>
          </figure>
          <figure>
            <div className={proofStyles.clarificationCrop}><Image src="/images/taskroom/request-clarification.png" width={768} height={690} sizes="(max-width: 760px) 90vw, 48vw" alt={fr ? "Formulaire permettant de préciser les informations manquantes." : "Form for selecting missing information and adding a clarification note."} /></div>
            <figcaption><span>02 / {fr ? "Clarification" : "Clarification"}</span><p>{fr ? "Une liste ciblée et une note indiquent ce qu’il faut fournir avant de commencer." : "A focused checklist and a note specify what needs to be provided before work can begin."}</p></figcaption>
          </figure>
        </div>
        <p className={proofStyles.visualNote}>{fr ? "Captures du prototype · données fictives" : "Prototype captures · fictional sample data"}</p>
        </div>
      </section>
      {c.sections.map(([id, label, heading, body]) => id === "context" ? (
        <section id={id} data-label={label} className={proofStyles.problemStory} aria-labelledby="context-heading" key={id}>
          <div className={proofStyles.problemInner}>
            <p className={proofStyles.problemLabel}>{fr ? "02 / Le problème" : "02 / The problem"}</p>
            <div className={proofStyles.problemGrid}>
              <h2 id="context-heading">{heading}</h2>
              <div className={proofStyles.problemCopy}>
                <p>{body}</p>
                <div className={proofStyles.problemInsight}><span>{fr ? "Question du prototype" : "Prototype question"}</span><p>{fr ? "Comment garder la demande, le responsable et la prochaine action au même endroit ?" : "How can the request, its owner and the next action stay together?"}</p></div>
              </div>
            </div>
          </div>
        </section>
      ) : id === "decision" ? (
        <section id={id} data-label={label} className={proofStyles.decisionStory} aria-labelledby="decision-heading" key={id}>
          <div className={proofStyles.decisionInner}>
            <p className={proofStyles.problemLabel}>{fr ? "03 / La décision" : "03 / The decision"}</p>
            <div className={proofStyles.decisionIntro}>
              <h2 id="decision-heading">{heading}</h2>
              <p>{body}</p>
            </div>
            <div className={proofStyles.decisionSequence} aria-label={fr ? "Parcours proposé" : "Proposed flow"}>
              <div><span>01 / {fr ? "Saisir" : "Capture"}</span><p>{fr ? "Enregistrer la demande même si le responsable n’est pas encore connu." : "Record the request even when its owner is not yet known."}</p></div>
              <div><span>02 / {fr ? "Clarifier" : "Clarify"}</span><p>{fr ? "Rendre visibles les informations manquantes et la prochaine action." : "Make missing details and the next action visible."}</p></div>
              <div><span>03 / Ready</span><p>{fr ? "Désigner un responsable et résoudre les informations manquantes avant Ready." : "Assign an owner and resolve missing details before marking the brief Ready."}</p></div>
            </div>
            <p className={proofStyles.decisionNote}>{fr ? "Décision du prototype · à valider avec des utilisateurs" : "Prototype decision · awaiting participant validation"}</p>
      <section className={proofStyles.tradeoffBlock} aria-labelledby="taskroom-tradeoff">
        <p className="eyebrow eyebrow--accent">{fr ? "Une décision de conception" : "A design decision"}</p>
        <h2 id="taskroom-tradeoff">{fr ? "Quand un brief est-il prêt ?" : "When is a brief ready?"}</h2>
        <p className={proofStyles.storyLead}>{fr
          ? "Le responsable peut être inconnu à l’arrivée d’une demande. La règle doit permettre de la saisir sans donner l’impression qu’elle est prête à produire."
          : "The owner may be unknown when a request arrives. The rule needs to let someone capture it without implying it is ready for production."}</p>
        <div className={proofStyles.tradeoff}>
          <div><span>01</span><h3>{fr ? "Exiger tout à la saisie" : "Require everything upfront"}</h3><p>{fr
            ? "Un brief complet dès le départ, mais la personne qui reçoit la demande peut être bloquée avant de l’enregistrer."
            : "Every new brief starts complete, but the person receiving the request can be blocked before it is recorded."}</p></div>
          <div><span>02</span><h3>{fr ? "Saisir, puis clarifier" : "Capture, then clarify"}</h3><p>{fr
            ? "Le prototype retient ce modèle : titre, origine et description à la création, puis responsable et informations résolues avant Ready."
            : "The prototype uses this model: title, origin and description at creation, then an owner and resolved details before Ready."}</p></div>
        </div>
        <p className={proofStyles.visualNote}>{fr ? "Comparaison conceptuelle · à valider avec des utilisateurs" : "Concept comparison · awaiting participant validation"}</p>
      </section>
          </div>
        </section>
      ) : (
        <section id={id} data-label={label} className={id === "workflow" ? proofStyles.workflowStory : proofStyles.validationStory} aria-labelledby={`${id}-heading`} key={id}>
          <div className={proofStyles.decisionInner}>
            <p className={proofStyles.problemLabel}>{id === "workflow" ? (fr ? "04 / Le parcours" : "04 / The workflow") : (fr ? "05 / Validation" : "05 / Validation")}</p>
            <div className={proofStyles.decisionIntro}>
              <h2 id={`${id}-heading`}>{heading}</h2>
              <div className={proofStyles.narrativeCopy}><p>{body}</p>
                {id === "workflow" && <Link href={demo}>{c.cta} <span aria-hidden="true">↗</span></Link>}
                {id === "validation" && <p className={proofStyles.validationNote}>{fr ? "Tests utilisateurs prévus · aucun résultat à ce jour" : "Participant testing planned · no results yet"}</p>}
              </div>
            </div>
            {id === "workflow" && <figure className={proofStyles.workflowImage}><TaskroomImage alt={c.alt} /><figcaption>{c.caption}</figcaption></figure>}
          </div>
        </section>
      ))}
      <section className={proofStyles.analysisStory} aria-labelledby="taskroom-alternatives">
        <div className={proofStyles.decisionInner}>
        <p className={proofStyles.problemLabel}>{fr ? "Périmètre et alternatives" : "Scope and alternatives"}</p>
        <h2 id="taskroom-alternatives">{fr ? "Pourquoi un outil de plus ?" : "Why another tool?"}</h2>
        <div className={proofStyles.comparison}>
          <div><h3>{fr ? "Outils existants" : "Existing tools"}</h3><p>{fr
            ? "Un formulaire et un projet Asana peuvent déjà structurer les demandes créatives et leur suivi. Une nouvelle application doit démontrer une valeur suffisante face à cette solution."
            : "An Asana form and project can already structure creative requests and track work. A new product needs to demonstrate enough value against that established option."}</p>
            <a href="https://asana.com/resources/how-manage-creative-requests">{fr ? "Guide Asana sur les demandes créatives" : "Asana’s guide to creative requests"} ↗</a></div>
          <div><h3>{fr ? "Hypothèse du prototype" : "Prototype hypothesis"}</h3><p>{fr
            ? "Tester un parcours réduit centré sur le passage d’un brief incomplet à un brief prêt, avec un responsable et une prochaine action explicites."
            : "Test a narrow path from an incomplete request to a ready brief, with ownership and the next action made explicit."}</p></div>
          <div><h3>{fr ? "Question ouverte" : "Open question"}</h3><p>{fr
            ? "Est-ce assez utile pour justifier un outil distinct ? Une comparaison avec le processus réel des équipes reste nécessaire."
            : "Is that useful enough to justify a separate tool? A comparison with teams’ existing workflows is still needed."}</p></div>
        </div>
        </div>
      </section>
      <section className={`${proofStyles.analysisStory} ${proofStyles.researchStory}`} aria-labelledby="taskroom-research">
        <div className={proofStyles.decisionInner}>
        <p className={proofStyles.problemLabel}>{c.researchLabel}</p>
        <h2 id="taskroom-research">{fr ? "Le contexte plus large" : "The broader context"}</h2>
        <div className={proofStyles.research}>
          <strong>{c.researchStat}</strong>
          <div><p>{c.researchDescription}</p><p>{c.researchContext}</p>
            <a href="https://investors.asana.com/news-releases/news-release-details/asana-anatomy-work-global-index-2023-smart-collaboration-and">{c.researchSource} ↗</a></div>
        </div>
        </div>
      </section>
      <section className={proofStyles.analysisStory} aria-labelledby="taskroom-measurement">
        <div className={proofStyles.decisionInner}>
        <p className={proofStyles.problemLabel}>{fr ? "Mesure" : "Measurement"}</p>
        <h2 id="taskroom-measurement">{c.metricsHeading}</h2>
        <p className={proofStyles.metricsIntro}>{c.metricsIntro}</p>
        <dl className={proofStyles.metrics}>
          {c.metrics.map(([name, definition]) => <div key={name}><dt>{name}</dt><dd>{definition}</dd></div>)}
        </dl>
        <p className={proofStyles.body}>{c.measuresNote}</p>
        </div>
      </section>
      <section className={proofStyles.caseClosing} aria-labelledby="taskroom-closing">
        <div className={proofStyles.decisionInner}>
          <p className={proofStyles.problemLabel}>{fr ? "Explorer le prototype" : "Explore the prototype"}</p>
          <div className={proofStyles.closingGrid}>
            <h2 id="taskroom-closing">{fr ? "À vous d’explorer." : "See the flow for yourself."}</h2>
            <div><p>{fr ? "Parcourez le prototype avec ses données fictives, ou revenez aux projets." : "Explore the prototype with fictional sample data, or return to the projects."}</p>
              <div className={proofStyles.closingLinks}><Link href={demo}>{c.cta} ↗</Link><Link href={fr ? "/fr/work" : "/work"}>{fr ? "Retour aux projets" : "Back to work"} ↗</Link></div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
