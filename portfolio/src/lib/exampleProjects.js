/*
 * Example projects — design-direction placeholders only (10 Nov 2026).
 * Fictional products, roles and outcomes used to shape the Selected work, Work hub and case
 * template while real projects are chosen. Every surface labels them as examples; nothing
 * here may be presented as client work. Cover photos: Unsplash licence via Lorem Picsum.
 */

const covers = {
  harbor: { src: "/images/examples/harbor.jpg", credit: "Alex Gindin / Unsplash" },
  waypoint: { src: "/images/examples/waypoint.jpg", credit: "Dyaa Eldin Moustafa / Unsplash" },
  atlas: { src: "/images/examples/atlas.jpg", credit: "Patrick Tomasso / Unsplash" },
  tessera: { src: "/images/examples/tessera.jpg", credit: "Bino Storyteller / Unsplash" },
};

const en = [
  {
    slug: "harbor",
    title: "Harbor",
    headline: "One queue for multilingual support operations.",
    sector: "Customer operations · B2B SaaS",
    year: "2026",
    role: "Product designer · end-to-end",
    mock: "queue",
    summary: "Agents juggled four tools and three languages to resolve a single ticket. Harbor brings context, translation and hand-offs into one working queue.",
    snapshot: [["Product", "Support operations console"], ["Role", "Product design, prototyping"], ["Team", "PM, 3 engineers, ops lead"], ["Timeline", "10 weeks"]],
    sections: {
      problem: "Agents switched between a ticketing tool, a CRM, a translation tab and chat to answer one customer. Hand-offs between language teams lost context, and urgent cases sat unnoticed in the wrong queue.",
      evidence: "Shadowed 9 agents across two shifts, mapped 40 real tickets end to end and reviewed a month of escalation notes. The repeated failure was not speed but missing context at hand-off.",
      options: "We compared a smarter routing layer, a side-panel extension and a single queue that owns the conversation. Routing alone kept the tool switching; the extension could not show history across teams.",
      decisions: [["Context travels with the ticket", "Every hand-off carries a three-line summary, the customer's language and what was already tried."], ["Translation is inline, never hidden", "Agents see the original and the translation side by side, so meaning is checked, not assumed."], ["Urgency is visible, not sorted away", "Breached and at-risk cases stay pinned until someone owns them."]],
      solution: "A single queue with a conversation view, inline translation, structured hand-offs and a calm priority strip. States for empty, loading, error and offline were designed with the same care as the happy path.",
      outcomes: "Example only — illustrative targets: fewer tool switches per ticket and fewer re-opened hand-offs, measured in a pilot with one language team.",
      reflection: "Next time I would test the hand-off summary with agents earlier; its format changed the most after the first pilot week.",
    },
  },
  {
    slug: "waypoint",
    title: "Waypoint",
    headline: "Exception handling for cross-border deliveries.",
    sector: "Logistics · Operations tooling",
    year: "2025",
    role: "Product designer · research & UI",
    mock: "timeline",
    summary: "When a parcel stalls at customs, five teams need the same answer. Waypoint turns scattered alerts into one timeline with a clear next step.",
    snapshot: [["Product", "Exception workspace"], ["Role", "Research, interaction design"], ["Team", "PM, 2 engineers, data analyst"], ["Timeline", "8 weeks"]],
    sections: {
      problem: "Delivery exceptions arrived as emails, carrier codes and spreadsheet rows. Nobody could tell, at a glance, what had happened, who owned it and what to do next.",
      evidence: "Interviewed 6 coordinators, clustered 120 exception codes into 9 real situations and timed how long it took to find the owner of a case.",
      options: "A dashboard of counts, a rules engine for auto-actions and a case timeline. Counts hid the story; automation was premature without shared definitions.",
      decisions: [["Plain-language situations", "Carrier codes are translated into nine situations people already use in conversation."], ["One owner, always", "A case cannot exist without an owner; reassignment asks for a reason."], ["Next step first", "The recommended action sits above the history, not below it."]],
      solution: "A timeline per shipment with the situation, owner and next step on top, and the raw events folded underneath for audits.",
      outcomes: "Example only — illustrative targets: shorter time to find an owner and fewer duplicate customer contacts.",
      reflection: "The situation taxonomy was the real product; the interface mostly made it visible.",
    },
  },
  {
    slug: "atlas",
    title: "Atlas",
    headline: "A design system that explains its decisions.",
    sector: "Design systems · B2B suite",
    year: "2025",
    role: "Product designer · systems",
    mock: "tokens",
    summary: "Three products, three button styles and no shared language. Atlas unifies tokens, components and the reasoning behind them.",
    snapshot: [["Product", "Design system & docs"], ["Role", "Systems design, documentation"], ["Team", "2 designers, 2 front-end engineers"], ["Timeline", "12 weeks"]],
    sections: {
      problem: "Teams rebuilt the same components with small differences. Reviews became debates about taste because no one could point to an agreed rule.",
      evidence: "Audited 214 screens across three products, inventoried 38 button variants and interviewed 5 engineers about what slowed them down.",
      options: "Adopting an open-source kit, a strict component library, or tokens plus documented decisions. A kit did not fit the domain; strictness alone would be bypassed.",
      decisions: [["Tokens before components", "Colour, type and spacing were agreed first so components inherit, not invent."], ["Every component explains when not to use it", "Docs lead with usage boundaries, not just props."], ["Accessibility is a release gate", "Contrast and keyboard checks run before a component is published."]],
      solution: "Tokens in code and Figma, 24 core components with states, and decision records that link each rule to the problem it solves.",
      outcomes: "Example only — illustrative targets: fewer one-off components and faster design reviews.",
      reflection: "Writing the decision records was slower than drawing components, and far more useful.",
    },
  },
  {
    slug: "tessera",
    title: "Tessera",
    headline: "A calmer booking flow for small hotels.",
    sector: "Hospitality · Consumer",
    year: "2024",
    role: "Product designer · UX/UI",
    mock: "booking",
    summary: "Guests abandoned bookings at the payment step. Tessera rebuilds the flow around clarity: what you get, what you pay and when.",
    snapshot: [["Product", "Direct booking flow"], ["Role", "UX research, UI design"], ["Team", "Founder, 1 engineer"], ["Timeline", "6 weeks"]],
    sections: {
      problem: "Taxes and fees appeared only at the last step, and room differences were buried in long descriptions.",
      evidence: "Ran 7 moderated sessions and reviewed a funnel where most drop-off happened at the price reveal.",
      options: "A one-page checkout, a guided three-step flow, or a comparison-first room picker.",
      decisions: [["Total price from the first screen", "No surprises: fees are shown as soon as dates are chosen."], ["Compare rooms on what matters", "Bed, view and cancellation policy side by side."], ["Three steps, always reversible", "Guests can go back without losing details."]],
      solution: "A three-step flow with a persistent summary, clear room comparison and accessible form fields.",
      outcomes: "Example only — illustrative target: fewer drop-offs at the payment step.",
      reflection: "Showing the total early felt risky to the business; it became the strongest trust signal.",
    },
  },
];

const fr = [
  {
    ...en[0],
    headline: "Une file unique pour un support multilingue.",
    sector: "Opérations client · SaaS B2B",
    role: "Designer produit · de bout en bout",
    summary: "Les agents jonglaient entre quatre outils et trois langues pour résoudre un seul ticket. Harbor réunit le contexte, la traduction et les transferts dans une file de travail.",
    snapshot: [["Produit", "Console d’opérations support"], ["Rôle", "Design produit, prototypage"], ["Équipe", "PM, 3 ingénieurs, responsable ops"], ["Durée", "10 semaines"]],
    sections: {
      problem: "Les agents passaient d’un outil de tickets à un CRM, un onglet de traduction et le chat pour répondre à un seul client. Les transferts entre équipes linguistiques perdaient le contexte.",
      evidence: "Observation de 9 agents sur deux équipes, cartographie de 40 tickets réels et revue d’un mois d’escalades. Le vrai problème n’était pas la vitesse, mais le contexte perdu au transfert.",
      options: "Un routage plus intelligent, une extension en panneau latéral ou une file unique propriétaire de la conversation.",
      decisions: [["Le contexte voyage avec le ticket", "Chaque transfert inclut un résumé, la langue du client et ce qui a déjà été tenté."], ["La traduction est visible", "L’original et la traduction côte à côte : le sens est vérifié, pas supposé."], ["L’urgence reste visible", "Les cas à risque restent épinglés jusqu’à ce que quelqu’un les prenne."]],
      solution: "Une file unique avec vue conversation, traduction intégrée, transferts structurés et bandeau de priorité. États vides, chargement, erreur et hors ligne conçus avec le même soin.",
      outcomes: "Exemple uniquement — objectifs illustratifs : moins de changements d’outil par ticket et moins de transferts rouverts.",
      reflection: "Je testerais plus tôt le format du résumé de transfert ; c’est lui qui a le plus changé après la première semaine.",
    },
  },
  {
    ...en[1],
    headline: "Gérer les exceptions de livraison transfrontalière.",
    sector: "Logistique · Outils d’opérations",
    role: "Designer produit · recherche & UI",
    summary: "Quand un colis bloque en douane, cinq équipes ont besoin de la même réponse. Waypoint transforme des alertes dispersées en une chronologie avec une prochaine étape claire.",
    snapshot: [["Produit", "Espace de gestion d’exceptions"], ["Rôle", "Recherche, design d’interaction"], ["Équipe", "PM, 2 ingénieurs, analyste"], ["Durée", "8 semaines"]],
    sections: {
      problem: "Les exceptions arrivaient par e-mails, codes transporteur et tableurs. Personne ne voyait d’un coup d’œil ce qui s’était passé, qui en était responsable et quoi faire.",
      evidence: "6 entretiens avec des coordinateurs, 120 codes regroupés en 9 situations réelles, et mesure du temps pour trouver le responsable d’un cas.",
      options: "Un tableau de bord chiffré, un moteur de règles automatiques ou une chronologie par cas.",
      decisions: [["Des situations en langage clair", "Les codes deviennent neuf situations déjà utilisées par les équipes."], ["Toujours un responsable", "Un cas n’existe pas sans responsable ; réassigner demande une raison."], ["La prochaine étape d’abord", "L’action recommandée passe avant l’historique."]],
      solution: "Une chronologie par envoi avec la situation, le responsable et la prochaine étape en haut, et les événements bruts repliés pour l’audit.",
      outcomes: "Exemple uniquement — objectifs illustratifs : trouver plus vite le responsable et réduire les contacts client en double.",
      reflection: "La taxonomie des situations était le vrai produit ; l’interface la rendait visible.",
    },
  },
  {
    ...en[2],
    headline: "Un design system qui explique ses décisions.",
    sector: "Design systems · Suite B2B",
    role: "Designer produit · systèmes",
    summary: "Trois produits, trois styles de bouton et aucun langage commun. Atlas unifie tokens, composants et le raisonnement derrière eux.",
    snapshot: [["Produit", "Design system & documentation"], ["Rôle", "Design de systèmes, documentation"], ["Équipe", "2 designers, 2 ingénieurs front-end"], ["Durée", "12 semaines"]],
    sections: {
      problem: "Les équipes reconstruisaient les mêmes composants avec de petites différences, et les revues devenaient des débats de goût.",
      evidence: "Audit de 214 écrans sur trois produits, 38 variantes de bouton recensées et 5 entretiens avec des ingénieurs.",
      options: "Adopter un kit open source, une bibliothèque stricte, ou des tokens avec des décisions documentées.",
      decisions: [["Les tokens avant les composants", "Couleur, typographie et espacement d’abord : les composants héritent au lieu d’inventer."], ["Chaque composant dit quand ne pas l’utiliser", "La documentation commence par les limites d’usage."], ["L’accessibilité conditionne la publication", "Contraste et clavier vérifiés avant chaque publication."]],
      solution: "Des tokens dans le code et Figma, 24 composants avec leurs états, et des fiches de décision reliant chaque règle à son problème.",
      outcomes: "Exemple uniquement — objectifs illustratifs : moins de composants ponctuels et des revues plus rapides.",
      reflection: "Écrire les fiches de décision a pris plus de temps que dessiner les composants, et a été bien plus utile.",
    },
  },
  {
    ...en[3],
    headline: "Un parcours de réservation plus serein pour petits hôtels.",
    sector: "Hôtellerie · Grand public",
    role: "Designer produit · UX/UI",
    summary: "Les clients abandonnaient au paiement. Tessera reconstruit le parcours autour de la clarté : ce que l’on obtient, ce que l’on paie et quand.",
    snapshot: [["Produit", "Réservation directe"], ["Rôle", "Recherche UX, design UI"], ["Équipe", "Fondatrice, 1 ingénieur"], ["Durée", "6 semaines"]],
    sections: {
      problem: "Taxes et frais n’apparaissaient qu’à la dernière étape, et les différences entre chambres étaient noyées dans de longues descriptions.",
      evidence: "7 sessions modérées et analyse d’un tunnel où l’abandon se concentrait à l’affichage du prix.",
      options: "Un paiement sur une page, un parcours guidé en trois étapes, ou un choix de chambre comparatif.",
      decisions: [["Le prix total dès le premier écran", "Pas de surprise : les frais apparaissent dès le choix des dates."], ["Comparer ce qui compte", "Lit, vue et annulation côte à côte."], ["Trois étapes réversibles", "Revenir en arrière sans perdre ses informations."]],
      solution: "Un parcours en trois étapes avec récapitulatif persistant, comparaison claire et champs accessibles.",
      outcomes: "Exemple uniquement — objectif illustratif : moins d’abandons au paiement.",
      reflection: "Afficher le total tôt semblait risqué ; c’est devenu le signal de confiance le plus fort.",
    },
  },
];

export const CASE_SECTIONS = {
  en: [["problem", "Problem"], ["evidence", "Evidence"], ["options", "Options"], ["decisions", "Key decisions"], ["solution", "Solution"], ["outcomes", "Outcomes"], ["reflection", "Reflection"]],
  fr: [["problem", "Problème"], ["evidence", "Observations"], ["options", "Options"], ["decisions", "Décisions clés"], ["solution", "Solution"], ["outcomes", "Résultats"], ["reflection", "Réflexion"]],
};

export function getExampleProjects(lang = "en") {
  return (lang === "fr" ? fr : en).map((project) => ({ ...project, cover: covers[project.slug] }));
}

export function getExampleProject(slug, lang = "en") {
  return getExampleProjects(lang).find((project) => project.slug === slug);
}

export const EXAMPLE_SLUGS = en.map((project) => project.slug);
