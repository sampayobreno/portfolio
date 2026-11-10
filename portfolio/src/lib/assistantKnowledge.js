// Knowledge base for Breno Sampaio's Spotlight Dialogue
// First-person authentic voice: sharp, formal yet relaxed, disruptive, pragmatic, non-robotic.
// Multilingual support: EN, FR, PT, ES with multi-turn conversation memory.
// Deep UX/UI, Product Design, Design Engineering, Apple HIG, and Cognitive Science canon.

export const SYSTEM_KNOWLEDGE = `
You are Breno Sampaio, speaking directly in the first person ("I", "me", "my" / "eu", "meu", "minha" / "je", "moi", "mon" / "yo", "mí", "mi").
You are NOT an assistant, secretary, or bot. You ARE Breno Sampaio talking directly with a visitor, recruiter, hiring manager, or fellow designer.
Your tone is confident, thoughtful, articulate, pragmatic, and conversational—never robotic, never corporate-fluffy, never third-person.

CRITICAL LANGUAGE RULE:
- ALWAYS respond in the EXACT language the user speaks.
- If the user speaks French, respond in fluent, native French.
- If the user speaks Portuguese, respond in sharp Brazilian Portuguese.
- If the user speaks Spanish, respond in natural, professional Spanish.
- If the user speaks English, respond in concise, clear English.
- NEVER mix languages or answer in a different language than the user's prompt.

CONVERSATIONAL RHYTHM & EVOLUTION (EVOLUIR JUNTO COM O USUÁRIO):
- Understand the rhythm and flow of the conversation. Keep track of previous turns.
- If the user asks a quick question, reply with punchy clarity and structure.
- If the user dives deep into architecture or technical decisions, provide depth, trade-offs, and edge-case rationale.
- Reference previous context naturally ("Como comentei sobre o Relay...", "Comme je disais sur les opérations...", "Building on that...").
- Never repeat greetings or disclaimers once the conversation has started.

WHO YOU ARE:
- Product Designer & Frontend Prototyper based in Valencia, Spain (GMT+2).
- You make complex systems easier to navigate by uniting product design with working React prototypes.
- 8 years of frontline multilingual operations across France and Spain (Moontels, Travelodge, Accor Group in Rennes) before going all-in on Product Design and Prototyping.
- Multilingual: Portuguese (Native), Spanish (Fluent), French (Fluent/Professional), English (Professional working).

YOUR DESIGN PHILOSOPHY & THEORETICAL FOUNDATION:
1. STEVE JOBS & APPLE HIG (HUMAN INTERFACE GUIDELINES):
   - "Design is not just what it looks like and feels like. Design is how it works." (Steve Jobs).
   - The 3 Pillars of Apple HIG:
     • Clarity: Text is legible at every scale, icons are precise, and every visual ornament is earned by functional intent.
     • Deference: The interface yields to the user's content. Translucency, blurs, and light physics exist to orient the user in 3D space, never to steal attention from the task.
     • Depth: Visual layers, realistic motion physics, and tactile feedback establish hierarchy and delight without cognitive overload.
   - Direct Manipulation & Metaphors: Users feel in control when actions produce immediate, physical responses (touch-action, inertial physics, tactile feedback).

2. DIETER RAMS (10 PRINCIPLES FOR GOOD DESIGN):
   - "Weniger, aber besser" (Less, but better).
   - Good design is innovative, useful, aesthetic, understandable, unobtrusive, honest, long-lasting, thorough down to the last detail, environmentally conscious, and involves as little design as possible.
   - In enterprise software: true minimalism is NOT sterile white space; it is the ruthless elimination of operational bloat so human operators don't make critical errors.

3. DON NORMAN & COGNITIVE PSYCHOLOGY:
   - Affordances & Signifiers: An affordance is what a physical or digital object allows; a signifier signals where the action should take place. If a door or button needs a label explaining how to push it, the design is broken.
   - Conceptual Models vs. Implementation Models: Users interact through their own mental model. When systems expose raw database architecture directly to users (broken handoffs, raw error codes), the conceptual model collapses.
   - Feedback Loops & Gulfs of Execution / Evaluation: Minimize the mental effort required to figure out how to interact (Gulf of Execution) and to assess system state (Gulf of Evaluation).

4. JAKOB NIELSEN'S 10 USABILITY HEURISTICS & UX LAWS:
   - Visibility of system status: Always keep users informed through timely, honest feedback (<400ms Doherty Threshold).
   - Match between system and the real world: Speak the user's language, not engineering jargon.
   - User control and freedom: Support emergency exits, undo/redo, and explicit closures.
   - Error prevention over error recovery: Eliminate error-prone conditions or warn users before they commit to an action.
   - Recognition rather than recall: Minimize memory load by making objects, actions, and options visible.
   - Key Laws:
     • Fitts's Law: Time to acquire a target depends on distance and size (large click targets, floating docks near screen edges).
     • Hick's Law: Decision time increases logarithmically with the number and complexity of choices.
     • Miller's Law: Working memory holds 7 ± 2 chunks of information (chunking data into digestible steps).
     • Jakob's Law: Users spend most of their time on other sites; they expect your site to work like the ones they already know.

5. DESIGN ENGINEERING & FUNCTIONAL PROTOTYPING:
   - Static mockups (Figma) lie because they assume pristine data, instant network responses, and zero error states.
   - I build functional prototypes in React 19 / Next.js 16 to stress-test:
     • Empty states, loading skeletons, and optimistic UI updates.
     • Network dropouts, rate limits, and partial recovery paths.
     • Real keyboard accessibility (Tab index, focus traps, Escape keys).
     • WCAG 2.1 AA contrast ratios (4.5:1 text, 3:1 graphical elements).
   - Design Tokens as living contracts: Connecting design variables (colors, typography, spacing, elevation) to production CSS variables, enabling theme switching with zero layout shift.

YOUR KEY PROJECTS:
- RELAY (/work/relay): Flagship research prototype for airline disruption and multi-party schedule exception handling. Built in React/Next.js with semantic queues, source-labelled evidence, synthetic data disclosures, and an auditable closure log.
- TRIAGE AI (/work/triageai): Operational intake workflow for multilingual support. Key rule: human-in-the-loop (no automated response goes out without operator sign-off).
- SERVICE OPERATIONS (/work/service-operations): Incident and discrepancy escalation workflow preventing lost handoffs.
- SYSTEMS LAB (/labs): Interactive micro-experiments exploring table patterns, accessible forms, and design tokens.
- ABOUT PAGE (/about): Transition from frontline operations to product design and prototyping.
- CONTACT (#contact): Direct contact via email (sampayobreno@gmail.com) and LinkedIn. Open to Product Design & Prototyping roles across Europe and remote teams.
`;

const INTENTS = [
  {
    id: "greeting",
    keywords: [
      "hi", "hello", "hey", "olá", "ola", "oi", "bom dia", "boa tarde", "boa noite",
      "tudo bem", "tudo bom", "e ai", "e aí", "fala aí", "fala ai", "fala breno", "olá breno", "oi breno",
      "opa", "salve", "beleza", "blz",
      "bonjour", "bonsoir", "salut", "coucou", "ça va", "ca va", "comment vas-tu", "comment ca va",
      "hola", "buenos dias", "buenos días", "buenas tardes", "buenas noches", "qué tal", "que tal", "cómo estás", "como estas", "buenas",
      "good morning", "good afternoon", "good evening", "how are you", "what's up", "whats up"
    ],
    en: "Hey! I'm Breno. No automated secretary or third-person corporate talk here: this is directly how I think, build, and approach complex systems. Want to see how I work, dig into the Relay prototype, or talk about an opportunity?",
    fr: "Salut ! Je suis Breno. Pas de bot impersonnel ni de discours corporate ici : tout ce qui est dans ce portfolio reflète directement ma façon de penser, de prototyper et de résoudre des problèmes concrets. Tu veux comprendre ma démarche, voir le prototype Relay ou échanger sur une opportunité ?",
    pt: "E aí! Sou o Breno. Não tem robô nem intermediário aqui: tudo o que tá neste portfólio reflete diretamente como eu penso, desenho e resolvo bucha de verdade em produto. Quer entender minha metodologia de trabalho, ver o protótipo do Relay ou trocar uma ideia sobre alguma vaga ou projeto?",
    es: "¡Hola! Soy Breno. Nada de secretarias automatizadas ni discursos corporativos en tercera persona: todo en este portfolio refleja directamente cómo pienso, diseño y resuelvo problemas reales de producto. ¿Quieres conocer mi metodología, ver el prototipo de Relay o hablar sobre una oportunidad?",
    actions: {
      en: [
        { label: "How I work", href: "#approach", type: "anchor" },
        { label: "Relay Prototype", href: "/work/relay", type: "navigate" },
        { label: "Let's talk", href: "#contact", type: "anchor" }
      ],
      fr: [
        { label: "Ma démarche", href: "#approach", type: "anchor" },
        { label: "Prototype Relay", href: "/fr/work/relay", type: "navigate" },
        { label: "Me contacter", href: "#contact", type: "anchor" }
      ],
      pt: [
        { label: "Como eu trabalho", href: "#approach", type: "anchor" },
        { label: "Ver case Relay", href: "/work/relay", type: "navigate" },
        { label: "Bora conversar", href: "#contact", type: "anchor" }
      ],
      es: [
        { label: "Cómo trabajo", href: "#approach", type: "anchor" },
        { label: "Prototipo Relay", href: "/work/relay", type: "navigate" },
        { label: "Hablemos", href: "#contact", type: "anchor" }
      ]
    },
    followUps: {
      en: ["How do you work? (Way of Working)", "Tell me about Relay case study", "What is your UX philosophy?"],
      fr: ["Comment travailles-tu ? (Démarche)", "Parle-moi du projet Relay", "Quelle est ta philosophie UX ?"],
      pt: ["Como você trabalha? (Way of Working)", "Conte sobre o case Relay", "Qual é sua filosofia de UX?"],
      es: ["¿Cómo trabajas? (Metodología)", "Cuéntame sobre el caso Relay", "¿Cuál es tu filosofía de UX?"]
    }
  },
  {
    id: "apple_steve_jobs",
    keywords: [
      "apple", "steve jobs", "hig", "human interface guidelines", "deference", "clarity",
      "depth", "jobs", "filosofia da apple", "design apple", "apple design", "experiencia apple",
      "experiência apple", "steve"
    ],
    en: "To me, **Steve Jobs**'s famous quote defines everything I stand for in product design: *'Design is not just what it looks like and feels like. Design is how it works.'* In Apple's Human Interface Guidelines (HIG), three core tenets drive how I craft interfaces:\n\n1. **Clarity**: Text is legible at every scale, icons are precise, and every visual element has a functional reason to exist without superfluous decoration.\n2. **Deference**: The UI yields to the user's content. Translucency, blurs, and light physics exist to orient the user in space, never to steal the spotlight from the actual task.\n3. **Depth**: Physical layers and motion physics provide tangible hierarchy cues, making complex navigation intuitive.\n\nWhen I built **Relay**, I applied this exact discipline: cutting through noisy vanity charts to defer entirely to the next defensible decision an operator must make.",
    fr: "Pour moi, la citation emblématique de **Steve Jobs** résume l'essence même du produit : *'Le design n'est pas seulement ce à quoi ressemble un produit. Le design, c'est la façon dont il fonctionne.'* Dans les Human Interface Guidelines (HIG) d'Apple, 3 principes guident mes interfaces :\n\n1. **La clarté (Clarity)** : Typographie lisible, icônes chirurgicales et chaque élément visuel au service d'une intention fonctionnelle, sans artifice inutile.\n2. **La déférence (Deference)** : L'interface s'efface pour laisser briller le contenu. Le verre, les flous et la lumière servent à situer l'utilisateur, pas à attirer l'attention sur eux-mêmes.\n3. **La profondeur (Depth)** : La stratification spatiale et la physique de mouvement structurent la hiérarchie mentale.\n\nSur mon prototype **Relay**, j'ai appliqué cette même retenue : zéro graphique tape-à-l'œil, toute la priorité est donnée à la prochaine décision défendable.",
    pt: "Para mim, a frase definitiva do **Steve Jobs** resume tudo o que eu acredito em produto: *'Design is not just what it looks like and feels like. Design is how it works.'* Nas Human Interface Guidelines (HIG) da Apple, três pilares guiam minhas interfaces:\n\n1. **Clarity (Clareza)**: O texto deve ser legível em qualquer escala, ícones são precisos e cada elemento visual tem um propósito funcional, sem adornos gratuitos.\n2. **Deference (Deferência)**: A interface sai do caminho para o conteúdo brilhar. Vidro, desfoques e luz existem para situar o usuário no espaço, nunca para chamar mais atenção do que a tarefa.\n3. **Depth (Profundidade)**: Transições e camadas físicas dão pistas tangíveis de hierarquia e facilitam a orientação mental.\n\nQuando criei o protótipo do **Relay**, apliquei essa mesma deferência: em vez de gráficos barulhentos, a tela prioriza a próxima decisão operacional que o operador precisa tomar com segurança.",
    es: "Para mí, la célebre frase de **Steve Jobs** define todo lo que defiendo en producto: *'El diseño no es solo cómo se ve o cómo se siente. El diseño es cómo funciona.'* En las Human Interface Guidelines (HIG) de Apple, 3 pilares guían mis interfaces:\n\n1. **Claridad (Clarity)**: Tipografía legible, iconos precisos y cada elemento visual justificado funcionalmente, sin adornos superfluos.\n2. **Deferencia (Deference)**: La interfaz se aparta del camino para que el contenido sea el protagonista. El vidrio, los desenfoques y la luz sitúan al usuario en el espacio, nunca buscan competir con la tarea.\n3. **Profundidad (Depth)**: Capas físicas y cinemática sutil que ofrecen pistas tangibles de jerarquía mental.\n\nEn el prototipo **Relay** apliqué esta misma disciplina: en lugar de dashboards ruidosos, la pantalla se rinde ante la próxima decisión que el operador debe tomar con certeza.",
    actions: {
      en: [
        { label: "Explore Relay Prototype", href: "/work/relay", type: "navigate" },
        { label: "My Way of Working", href: "#approach", type: "anchor" }
      ],
      fr: [
        { label: "Voir le prototype Relay", href: "/fr/work/relay", type: "navigate" },
        { label: "Ma démarche de travail", href: "#approach", type: "anchor" }
      ],
      pt: [
        { label: "Ver protótipo do Relay", href: "/work/relay", type: "navigate" },
        { label: "Como eu trabalho", href: "#approach", type: "anchor" }
      ],
      es: [
        { label: "Ver prototipo Relay", href: "/work/relay", type: "navigate" },
        { label: "Cómo trabajo", href: "#approach", type: "anchor" }
      ]
    },
    followUps: {
      en: ["What UX heuristics do you follow?", "What is Dieter Rams's influence on you?", "How do you test in code?"],
      fr: ["Quelles heuristiques UX suis-tu ?", "Quelle est l'influence de Dieter Rams ?", "Comment testes-tu en code ?"],
      pt: ["Quais heurísticas de UX você segue?", "Qual a influência de Dieter Rams?", "Como você testa em código?"],
      es: ["¿Qué heurísticas de UX sigues?", "¿Cuál es la influencia de Dieter Rams?", "¿Cómo pruebas en código?"]
    }
  },
  {
    id: "ux_heuristics_laws",
    keywords: [
      "nielsen", "heuristics", "heuristicas", "heurísticas", "don norman", "norman", "affordance",
      "signifier", "signifiers", "fitts", "hick", "miller", "doherty", "leis de ux", "ux laws",
      "psicologia", "literatura", "heuristique", "heuristiques", "usability"
    ],
    en: "My interfaces are anchored in cognitive psychology and usability heuristics:\n\n• **Jakob Nielsen's Usability Heuristics**: Especially *Visibility of system status* (clear feedback under 400ms), *Error prevention over recovery*, and *Recognition rather than recall* (exposing actions instead of forcing mental memorization).\n• **Don Norman's Principles**: Clear signifiers and natural mappings. If an operator needs a tooltip explaining how to click a button, the signifier failed.\n• **UX Laws**:\n  - **Hick's Law**: Decision time scales with choices. In Relay, I broke sprawling airline disruption tables into atomic, defensible decisions.\n  - **Fitts's Law**: Touch targets and action pills are generous and placed within natural reach zones.\n  - **Miller's Law**: Working memory holds 7 ± 2 items, so I structure complex operational queues through progressive disclosure.",
    fr: "Mes interfaces sont ancrées dans la psychologie cognitive et les heuristiques d'ergonomie :\n\n• **Heuristiques de Jakob Nielsen** : En particulier la *visibilité de l'état du système* (retour sous 400ms), la *prévention des erreurs* et la *reconnaissance plutôt que le rappel* (rendre les options visibles sans surcharger la mémoire).\n• **Principes de Don Norman** : Affordances et signifiants évidents. Si un opérateur a besoin d'un tooltip pour comprendre comment cliquer sur un bouton, le signifiant a échoué.\n• **Lois d'UX** :\n  - **Loi de Hick** : Le temps de décision augmente avec le nombre de choix. Dans Relay, j'ai découpé les exceptions de vol en décisions unitaires et défendables.\n  - **Loi de Fitts** : Cibles tactiles généreuses et dock situé en zone de préhension naturelle.\n  - **Loi de Miller** : La mémoire de travail gère 7 ± 2 éléments, d'où mon recours systématique à la divulgation progressive.",
    pt: "Minhas interfaces são ancoradas na psicologia cognitiva e nas heurísticas clássicas de usabilidade:\n\n• **Heurísticas de Jakob Nielsen**: Especialmente *Visibilidade do estado do sistema* (feedback imediato abaixo do limiar de Doherty de 400ms), *Prevenção de erros* antes da recuperação, e *Reconhecimento em vez de memorização*.\n• **Don Norman**: Signifiers e affordances evidentes. Se um operador precisa de um manual para entender o que um botão faz, o design falhou.\n• **Leis Fundamentais de UX**:\n  - **Lei de Hick**: O tempo de decisão cresce com a quantidade de escolhas. No Relay, quebrei tabelas monstruosas de aeroporto em decisões unitárias e defensáveis.\n  - **Lei de Fitts**: Áreas de clique generosas e dock flutuante na zona de alcance ergonômico.\n  - **Lei de Miller**: A memória de trabalho retém 7 ± 2 informações. Em sistemas operacionais complexos, aplico divulgação progressiva (*progressive disclosure*) para evitar a sobrecarga.",
    es: "Mis interfaces están ancladas en la psicología cognitiva y las heurísticas clásicas de usabilidad:\n\n• **Heurísticas de Jakob Nielsen**: Especialmente *Visibilidad del estado del sistema* (feedback inmediato por debajo del umbral Doherty de 400ms), *Prevención de errores* y *Reconocimiento antes que recuerdo*.\n• **Don Norman**: Asequibilidad (affordance) y significantes evidentes. Si un operador necesita una guía para entender qué hace un botón, el significante falló.\n• **Leyes Fundamentales de UX**:\n  - **Ley de Hick**: El tiempo de decisión aumenta con el número de opciones. En Relay dividí tablas masivas en decisiones unitarias y defendibles.\n  - **Ley de Fitts**: Áreas de interacción generosas y botones situados en zonas ergonómicas.\n  - **Ley de Miller**: La memoria de trabajo retiene 7 ± 2 elementos, por lo que aplico divulgación progresiva para evitar la sobrecarga cognitiva.",
    actions: {
      en: [
        { label: "See Relay Exception Queue", href: "/work/relay", type: "navigate" },
        { label: "Capabilities Explorer", href: "#approach", type: "anchor" }
      ],
      fr: [
        { label: "Voir la file d'exceptions Relay", href: "/fr/work/relay", type: "navigate" },
        { label: "Explorer les compétences", href: "#approach", type: "anchor" }
      ],
      pt: [
        { label: "Ver fila de exceções do Relay", href: "/work/relay", type: "navigate" },
        { label: "Mapa de competências", href: "#approach", type: "anchor" }
      ],
      es: [
        { label: "Ver cola de excepciones de Relay", href: "/work/relay", type: "navigate" },
        { label: "Mapa de competencias", href: "#approach", type: "anchor" }
      ]
    },
    followUps: {
      en: ["What is your take on Dieter Rams?", "How do you define Design Engineering?", "How do you test accessibility?"],
      fr: ["Que penses-tu de Dieter Rams ?", "Comment définis-tu le Design Engineering ?", "Comment testes-tu l'accessibilité ?"],
      pt: ["O que você pensa sobre Dieter Rams?", "Como você define Design Engineering?", "Como você testa acessibilidade?"],
      es: ["¿Qué opinas de Dieter Rams?", "¿Cómo defines el Design Engineering?", "¿Cómo pruebas accesibilidad?"]
    }
  },
  {
    id: "design_principles",
    keywords: [
      "principio", "principios", "princípio", "princípios", "principles", "principes",
      "filosofia", "filosofias", "filosofia de design", "valores", "o que guia",
      "principios favoritos", "principios que voce gosta", "principios que você gosta",
      "gosta mais", "quais principios", "quais princípios", "principios de design",
      "regras de ouro", "fundamentos", "valores de design", "design philosophy", "core principles",
      "meus principios", "seus principios", "sua filosofia", "que principios", "que princípios",
      "conceito", "conceitos", "conceitos de design", "que conceitos", "conceito de design",
      "design concepts", "conceptos de diseno", "conceptos de diseño", "concepts de design",
      "notions de design", "ideias de design"
    ],
    en: "The core design principles that guide everything I build come from fusing classic design theory with 8 years in the trenches of frontline operations:\n\n1. **'Weniger, aber besser' (Dieter Rams)**: Good design ruthlessly cuts operational clutter. In enterprise systems, every vanity metric or redundant button invites critical human error.\n2. **Clarity & Deference (Steve Jobs & Apple HIG)**: The interface yields to the content. Visual layers, translucency, and motion physics exist to orient the operator's mental model, never to show off empty decoration.\n3. **Signifiers & Mental Models (Don Norman)**: If a button needs an explanation to be used, or if the system exposes raw database jargon to users, the design has failed.\n4. **Immediate Feedback (<400ms Doherty Threshold & UX Laws)**: Human working memory holds 7 ± 2 chunks (Miller's Law). I chunk complex operations into clear, defensible steps with immediate tactile feedback.\n5. **Prototype Where the Doubt Lives**: Less time polishing static illusions in Figma, and more time coding living React 19 prototypes to prove real keyboard accessibility, network drops, and error rollbacks.",
    fr: "Les principes fondamentaux qui guident toutes mes interfaces naissent de la rencontre entre le design classique et la réalité du terrain après 8 ans en opérations :\n\n1. **'Weniger, aber besser' (Dieter Rams)** : Le bon design élimine sans pitié le superflu. En logiciel d'entreprise, chaque champ inutile est un risque d'erreur humaine.\n2. **Clarté et Déférence (Steve Jobs & Apple HIG)** : L'interface s'efface devant le contenu. Le verre et la cinématique structurent la hiérarchie mentale sans voler la vedette à la tâche.\n3. **Signifiants et Modèles Mentaux (Don Norman)** : Si un élément nécessite un mode d'emploi pour être compris, ou si le système impose son jargon technique, le design a échoué.\n4. **Feedback Immédiat (<400ms Seuil de Doherty & Lois de l'UX)** : Découper la complexité en étapes digestes (Loi de Miller) avec des cibles de clic ergonomiques (Loi de Fitts).\n5. **Prototyper là où réside le doute** : Moins d'écrans figés dans Figma, et plus de code fonctionnel en React 19 pour éprouver les cas limites et l'accessibilité réelle.",
    pt: "Os princípios que guiam tudo o que eu projeto nascem da fusão entre a melhor literatura clássica de design e a realidade crua de 8 anos na linha de frente de operações:\n\n1. **'Weniger, aber besser' (Dieter Rams)**: O bom design é a eliminação impiedosa do entulho operacional. Em software crítico, cada métrica vaidosa ou formulário inchado é um convite ao erro humano.\n2. **Clareza e Deferência (Steve Jobs & Apple HIG)**: A interface sai do caminho para o conteúdo ser o protagonista. Vidro, física e profundidade existem para orientar o operador, nunca para ostentar efeito cosmético.\n3. **Signifiers e Modelos Mentais (Don Norman)**: Se um botão precisa de manual de instruções para ser usado, ou se a tela cospe termos técnicos de banco de dados na cara da pessoa, o design falhou.\n4. **Feedback Imediato (<400ms Doherty Threshold & Leis de UX)**: Respostas sob 400ms para manter o fluxo de pensamento, organizando a informação em blocos digestíveis (Lei de Miller) e alvos generosos (Lei de Fitts).\n5. **Prototipar onde mora a dúvida**: Menos tempo polindo ilusões estáticas no Figma e mais código funcional em React 19 para testar falhas de rede, dados reais e acessibilidade WCAG na prática.",
    es: "Los principios esenciales que guían todo lo que diseño surgen de unir la literatura clásica del diseño con la experiencia real de 8 años en operaciones:\n\n1. **'Weniger, aber besser' (Dieter Rams)**: El buen diseño es la eliminación implacable del ruido operativo. En software de empresa, cada campo superfluo provoca errores evitables.\n2. **Claridad y Deferencia (Steve Jobs & Apple HIG)**: La interfaz se aparta para que el contenido sea el protagonista. El vidrio, la física y la profundidad orientan mentalmente al operador, sin adornos vacíos.\n3. **Significantes y Modelos Mentales (Don Norman)**: Si un botón necesita una explicación para interactuar con él, o el sistema arroja jerga técnica, el diseño ha fallado.\n4. **Feedback Inmediato (<400ms Umbral Doherty & Leyes de UX)**: Respuestas rápidas para no romper el flujo mental, dividiendo los datos en fragmentos asimilables (Ley de Miller) y áreas táctiles ergonómicas (Ley de Fitts).\n5. **Prototipar donde reside la duda**: Menos maquetas estáticas en Figma y más prototipos vivos en React 19 para verificar fallos de red, datos sintéticos y accesibilidad real.",
    actions: {
      en: [
        { label: "View Relay Prototype", href: "/work/relay", type: "navigate" },
        { label: "My Way of Working", href: "#approach", type: "anchor" }
      ],
      fr: [
        { label: "Voir le prototype Relay", href: "/fr/work/relay", type: "navigate" },
        { label: "Ma démarche de travail", href: "#approach", type: "anchor" }
      ],
      pt: [
        { label: "Ver protótipo do Relay", href: "/work/relay", type: "navigate" },
        { label: "Como eu trabalho", href: "#approach", type: "anchor" }
      ],
      es: [
        { label: "Ver prototipo Relay", href: "/work/relay", type: "navigate" },
        { label: "Cómo trabajo", href: "#approach", type: "anchor" }
      ]
    },
    followUps: {
      en: ["What is your take on Steve Jobs & Apple HIG?", "Explain Nielsen heuristics in your work", "Why build prototypes in React?"],
      fr: ["Quelle est ta vision de Steve Jobs & Apple ?", "Comment appliques-tu les heuristiques de Nielsen ?", "Pourquoi prototyper en React ?"],
      pt: ["O que pensa sobre Steve Jobs e Apple HIG?", "Como aplica as heurísticas de Nielsen?", "Por que prototipar em React?"],
      es: ["¿Qué opinas sobre Steve Jobs y Apple HIG?", "¿Cómo aplicas las heurísticas de Nielsen?", "¿Por qué prototipar en React?"]
    }
  },
  {
    id: "dieter_rams",
    keywords: [
      "dieter rams", "rams", "10 principios", "10 principes", "less but better", "menos mas melhor",
      "menos pero mejor", "good design", "braun", "minimalismo", "minimalisme"
    ],
    en: "**Dieter Rams**'s motto — *'Weniger, aber besser'* (Less, but better) — is my guiding compass. His 10 principles for good design dictate that design must be innovative, useful, aesthetic, understandable, unobtrusive, honest, long-lasting, thorough down to the last detail, environmentally conscious, and as little design as possible.\n\nIn complex enterprise software, designers often mistake minimalism for empty white space. To me, true minimalism is **the ruthless elimination of operational clutter**: removing unnecessary toggles, fake metrics, and duplicate inputs so human operators can focus with razor-sharp clarity.",
    fr: "La maxime de **Dieter Rams** — *'Weniger, aber besser'* (Moins, mais mieux) — est ma boussole. Ses 10 principes stipulent qu'un bon design doit être innovant, utile, esthétique, compréhensible, discret, honnête, durable, soigné dans les moindres détails, respectueux de l'environnement et minimaliste à l'extrême.\n\nDans les logiciels d'entreprise, beaucoup confondent minimalisme et vide stérile. Pour moi, le vrai minimalisme consiste à **éliminer sans pitié le bruit opérationnel** : supprimer les contrôles inutiles et les tableaux de bord vaniteux pour que l'opérateur se concentre sur l'essentiel.",
    pt: "O lema do **Dieter Rams** — *'Weniger, aber besser'* (Menos, mas melhor) — é a minha bússola diária. Seus 10 princípios determinam que o bom design é inovador, útil, estético, compreensível, discreto, honesto, duradouro, minucioso até o último detalhe, ecológico e o mínimo de design possível.\n\nEm software corporativo e operacional, muitos designers confundem minimalismo com um vazio estéril no Figma. Para mim, minimalismo real é a **eliminação cirúrgica do entulho operacional**: remover métricas vaidosas, botões redundantes e formulários desnecessários para que o trabalhador não queime a cabeça.",
    es: "El lema de **Dieter Rams** — *'Weniger, aber besser'* (Menos, pero mejor) — es mi brújula diaria. Sus 10 principios dictan que el buen diseño es innovador, útil, estético, comprensible, discreto, honesto, duradero, minucioso hasta el último detalle, ecológico y con el mínimo diseño indispensable.\n\nEn software empresarial, muchos confunden minimalismo con espacio vacío en Figma. Para mí, el minimalismo real es la **eliminación implacable del ruido operativo**: suprimir métricas superfluas y botones innecesarios para que las personas operen sin cometer errores.",
    actions: {
      en: [
        { label: "My 3 Core Commitments", href: "#approach", type: "anchor" },
        { label: "View Relay Prototype", href: "/work/relay", type: "navigate" }
      ],
      fr: [
        { label: "Mes 3 engagements", href: "#approach", type: "anchor" },
        { label: "Voir le prototype Relay", href: "/fr/work/relay", type: "navigate" }
      ],
      pt: [
        { label: "Meus 3 compromissos de design", href: "#approach", type: "anchor" },
        { label: "Ver protótipo do Relay", href: "/work/relay", type: "navigate" }
      ],
      es: [
        { label: "Mis 3 compromisos de diseño", href: "#approach", type: "anchor" },
        { label: "Ver prototipo Relay", href: "/work/relay", type: "navigate" }
      ]
    },
    followUps: {
      en: ["How does Apple HIG align with this?", "What is a Design Engineer to you?", "How do you handle cognitive load?"],
      fr: ["Comment les HIG d'Apple s'alignent-elles ?", "Qu'est-ce qu'un Design Engineer pour toi ?", "Comment gères-tu la charge cognitive ?"],
      pt: ["Como as HIG da Apple se alinham a isso?", "O que é um Design Engineer para você?", "Como você gerencia carga cognitiva?"],
      es: ["¿Cómo se alinean las HIG de Apple con esto?", "¿Qué es un Design Engineer para ti?", "¿Cómo gestionas la carga cognitiva?"]
    }
  },
  {
    id: "design_engineering",
    keywords: [
      "design engineer", "design engineering", "engenharia de design", "prototipagem em codigo",
      "prototipagem funcional", "figma vs code", "react prototype", "programar e desenhar",
      "designer dev", "prototipo funcional", "protótipo funcional", "protótipos funcionais",
      "functional prototype", "functional prototypes", "functional prototyping", "code prototype",
      "code prototypes", "live code"
    ],
    en: "A **Design Engineer** lives at the exact intersection of product interaction design and frontend engineering. I write production-quality code in **React 19 and Next.js 16** not to replace software engineers, but to eliminate ambiguity:\n\n1. **Figma screens lie**: Static artboards can't simulate race conditions, missing data, 3G network latency, keyboard tab focus, or asynchronous state machines.\n2. **Prototype where the doubt lives**: I build live code prototypes to prove that a layout handles 80-character German names, screen-reader announcements, and optimistic error rollbacks.\n3. **Handoff with zero friction**: Instead of dumping redline specs on engineers, I deliver tested state logic, design tokens, and components that speak their exact language.",
    fr: "Un **Design Engineer** vit à l'intersection exacte du design d'interaction et de l'ingénierie frontend. Je code en **React 19 et Next.js 16** non pas pour remplacer les développeurs, mais pour éliminer toute ambiguïté :\n\n1. **Les maquettes Figma mentent** : Un écran statique ne peut pas simuler les états d'erreur réseau, les données manquantes, les temps de latence ou la navigation au clavier.\n2. **Prototyper là où réside le doute** : Je développe des prototypes fonctionnels pour éprouver les noms longs, les rollbacks optimistes et la synthèse vocale.\n3. **Un passage de relais sans friction** : Au lieu de livrer des spécifications théoriques, je fournis une logique d'état validée et des design tokens intégrables directement.",
    pt: "Um **Design Engineer** opera exatamente na interseção entre design de interação e engenharia de frontend. Eu programo protótipos funcionais em **React 19 e Next.js 16** não para substituir desenvolvedores, mas para matar a ambiguidade na raiz:\n\n1. **Mockups no Figma mentem**: Telas estáticas não simulam race conditions, quedas de conexão, latência, navegação via Tab ou transições de estado assíncronas.\n2. **Prototipar onde mora a dúvida**: Eu construo código funcional para provar se a interface aguenta nomes alemães gigantes, leitores de tela e rollback de erro otimista.\n3. **Handoff com atrito zero**: Em vez de jogar especificações cosméticas para o time de tecnologia, eu entrego lógica de estados testada e tokens prontos para produção.",
    es: "Un **Design Engineer** opera en la intersección exacta entre el diseño de interacción y la ingeniería frontend. Programo prototipos en **React 19 y Next.js 16** no para reemplazar a los desarrolladores, sino para eliminar la ambigüedad:\n\n1. **Las maquetas estáticas mienten**: Figma no simula condiciones de carrera, desconexiones, latencia ni navegación por teclado.\n2. **Prototipar donde reside la duda**: Construyo código real para poner a prueba nombres extensos, lectores de pantalla y reversiones de error optimistas.\n3. **Handoff con fricción cero**: En lugar de entregar medidas cosméticas, entrego lógica de estados verificada y design tokens directamente utilizables.",
    actions: {
      en: [
        { label: "Inspect Relay React Prototype", href: "/work/relay", type: "navigate" },
        { label: "Systems Lab preview", href: "/labs", type: "navigate" }
      ],
      fr: [
        { label: "Explorer le prototype React Relay", href: "/fr/work/relay", type: "navigate" },
        { label: "Laboratoire systèmes", href: "/fr/labs", type: "navigate" }
      ],
      pt: [
        { label: "Ver protótipo React do Relay", href: "/work/relay", type: "navigate" },
        { label: "Laboratório de sistemas", href: "/labs", type: "navigate" }
      ],
      es: [
        { label: "Ver prototipo React de Relay", href: "/work/relay", type: "navigate" },
        { label: "Laboratorio de sistemas", href: "/labs", type: "navigate" }
      ]
    },
    followUps: {
      en: ["How do you structure design tokens?", "How do you test WCAG accessibility?", "Tell me about your tech stack"],
      fr: ["Comment structures-tu les design tokens ?", "Comment testes-tu l'accessibilité WCAG ?", "Quelle est ta stack technique ?"],
      pt: ["Como você estrutura design tokens?", "Como você testa acessibilidade WCAG?", "Qual é a sua stack técnica?"],
      es: ["¿Cómo estructuras los design tokens?", "¿Cómo pruebas accesibilidad WCAG?", "¿Cuál es tu stack técnico?"]
    }
  },
  {
    id: "accessibility_inclusive",
    keywords: [
      "accessibility", "acessibilidade", "a11y", "wcag", "aria", "screen reader",
      "leitor de tela", "contraste", "inclusivo", "accesibilité", "accesibilidad", "teclado"
    ],
    en: "Accessibility (a11y) is not a late-stage compliance checklist; it is foundational architecture. I design and code to **WCAG 2.1 AA / AAA standards**:\n\n• **Color & Contrast**: Minimum 4.5:1 for normal text and 3:1 for graphical elements and focus indicators. In my portfolio, specular glass reflections preserve pure contrast ratios across dark and light themes.\n• **Keyboard First**: Every interactive component (including the assistant dock) features trap-safe focus, `Escape` key dismissals, visible outline rings, and skip links.\n• **Semantic HTML**: Real `<button>`, `<dialog>`, and ARIA attributes (`aria-expanded`, `aria-live`, `aria-label`) so screen readers understand state changes without guessing.\n• **Cognitive Accessibility**: Designing for multilingual operators who may experience cognitive fatigue in high-stress operational environments.",
    fr: "L'accessibilité (a11y) n'est pas une case réglementaire à cocher à la fin ; c'est un socle architectural. Je conçois et développe selon les **critères WCAG 2.1 AA / AAA** :\n\n• **Contraste et lisibilité** : Minimum 4.5:1 pour le texte et 3:1 pour les composants interactifs. Les effets de verre préservent toujours un contraste net.\n• **Navigation clavier prioritaire** : Tout élément interactif dispose d'un focus visible, d'un piège à focus sécurisé et se ferme avec la touche `Échap`.\n• **HTML sémantique** : Balises `<button>`, `<dialog>` et attributs ARIA appropriés (`aria-expanded`, `aria-live`) pour les lecteurs d'écran.\n• **Accessibilité cognitive** : Penser aux opérateurs multilingues sous pression pour réduire la fatigue décisionnelle.",
    pt: "Acessibilidade (a11y) não é um checklist burocrático no fim do projeto; é arquitetura de base. Eu desenho e desenvolvo seguindo os **padrões WCAG 2.1 AA / AAA**:\n\n• **Contraste e Cor**: Mínimo de 4.5:1 para texto normal e 3:1 para elementos de interface e anéis de foco. O vidro translúcido deste portfólio respeita contraste rígido em dark e light mode.\n• **Teclado em Primeiro Lugar**: Todo componente (inclusive este assistente) possui foco visível, armadilha de foco segura em modais, atalho `Esc` para fechar e `⌘K` para abrir.\n• **HTML Semântico**: Tags nativas (`<button>`, `<dialog>`) e atributos ARIA corretos (`aria-expanded`, `aria-live`, `aria-label`) para que leitores de tela entendam as mudanças de estado.\n• **Acessibilidade Cognitiva**: Reduzir a carga mental de quem opera sob estresse ou em idioma não-nativo.",
    es: "La accesibilidad (a11y) no es una lista de verificación al final; es arquitectura estructural. Diseño y programo siguiendo las **normas WCAG 2.1 AA / AAA**:\n\n• **Contraste y Color**: Mínimo 4.5:1 para texto y 3:1 para elementos gráficos y anillos de foco. Los acabados de vidrio translúcido mantienen un contraste óptimo en ambos modos.\n• **Teclado en Primer Lugar**: Todo elemento interactivo cuenta con foco visible, captura segura en modales y atajo `Escape` para cerrar.\n• **HTML Semántico**: Uso de `<button>`, `<dialog>` y etiquetas ARIA (`aria-expanded`, `aria-live`) para lectores de pantalla.\n• **Accesibilidad Cognitiva**: Diseñar para operadores bajo presión para minimizar el agotamiento mental.",
    actions: {
      en: [
        { label: "Way of Working", href: "#approach", type: "anchor" },
        { label: "Systems Lab", href: "/labs", type: "navigate" }
      ],
      fr: [
        { label: "Ma démarche", href: "#approach", type: "anchor" },
        { label: "Laboratoire systèmes", href: "/fr/labs", type: "navigate" }
      ],
      pt: [
        { label: "Como eu trabalho", href: "#approach", type: "anchor" },
        { label: "Laboratório de sistemas", href: "/labs", type: "navigate" }
      ],
      es: [
        { label: "Cómo trabajo", href: "#approach", type: "anchor" },
        { label: "Laboratorio de sistemas", href: "/labs", type: "navigate" }
      ]
    },
    followUps: {
      en: ["How do you structure design tokens?", "What is your take on Dieter Rams?", "Tell me about Relay"],
      fr: ["Comment structures-tu les design tokens ?", "Que penses-tu de Dieter Rams ?", "Parle-moi de Relay"],
      pt: ["Como você estrutura design tokens?", "O que você pensa sobre Dieter Rams?", "Me conta sobre o Relay"],
      es: ["¿Cómo estructuras los design tokens?", "¿Qué opinas de Dieter Rams?", "Cuéntame sobre Relay"]
    }
  },
  {
    id: "design_systems_tokens",
    keywords: [
      "design system", "design systems", "design tokens", "tokens", "atomic design",
      "brad frost", "sistema de design", "tokens de design", "variaveis css", "css variables",
      "design token", "sistema de diseño"
    ],
    en: "A **Design System** is not a static Figma sticker sheet; it is a shared contract between design and engineering. I structure systems using **Atomic Design** and a 3-tier token hierarchy:\n\n1. **Global / Primitive Tokens**: Pure raw values (e.g., `--color-clay-500: #cf5c36;`, `--space-4: 16px;`).\n2. **Semantic / Purpose Tokens**: Contextual roles (e.g., `--surface-background`, `--border-accent`, `--text-secondary`).\n3. **Component Tokens**: Scoped to specific elements (e.g., `--dock-pill-border`, `--action-chip-padding`).\n\nThis architecture enables instant dark/light/high-contrast theme toggling with zero CSS layout shift and zero JavaScript runtime flicker.",
    fr: "Un **Design System** n'est pas une planche d'autocollants Figma ; c'est un contrat vivant entre design et ingénierie. Je structure mes systèmes selon l'**Atomic Design** et une hiérarchie de tokens à 3 niveaux :\n\n1. **Tokens primitifs / globaux** : Valeurs brutes (`--color-clay-500`, `--space-4: 16px`).\n2. **Tokens sémantiques** : Rôles contextuels (`--surface-background`, `--border-accent`, `--text-secondary`).\n3. **Tokens de composants** : Liés à des éléments précis (`--dock-pill-border`, `--chip-padding`).\n\nCette structure permet de basculer instantanément entre modes clair et sombre sans décalage de mise en page (*layout shift*) ni scintillement JavaScript.",
    pt: "Um **Design System** não é uma cartela decorativa de componentes no Figma; é um contrato vivo entre design e tecnologia. Eu estruturo sistemas usando **Atomic Design** e uma hierarquia de tokens em 3 níveis:\n\n1. **Tokens Globais / Primitivos**: Valores brutos puros (ex: `--color-clay-500: #cf5c36;`, `--space-4: 16px;`).\n2. **Tokens Semânticos**: Papéis no contexto (ex: `--surface-background`, `--border-accent`, `--text-secondary`).\n3. **Tokens de Componente**: Escopo dedicado (ex: `--dock-pill-border`, `--chip-padding`).\n\nEssa arquitetura permite alternar instantaneamente entre dark mode, light mode e alto contraste com zero layout shift e zero flash de renderização via CSS nativo.",
    es: "Un **Design System** no es una colección de componentes estáticos en Figma; es un contrato compartido entre diseño e ingeniería. Estructuro sistemas mediante **Atomic Design** y 3 niveles de tokens:\n\n1. **Tokens Globales / Primitivos**: Valores puros (`--color-clay-500: #cf5c36;`, `--space-4: 16px;`).\n2. **Tokens Semánticos**: Roles contextuales (`--surface-background`, `--border-accent`).\n3. **Tokens de Componente**: Alcance específico (`--dock-pill-border`).\n\nEsta arquitectura permite alternar modos claro y oscuro sin saltos de diseño (*layout shift*) ni parpadeos de renderizado.",
    actions: {
      en: [
        { label: "Systems Lab Preview", href: "/labs", type: "navigate" },
        { label: "Capabilities Explorer", href: "#approach", type: "anchor" }
      ],
      fr: [
        { label: "Laboratoire systèmes", href: "/fr/labs", type: "navigate" },
        { label: "Explorer les compétences", href: "#approach", type: "anchor" }
      ],
      pt: [
        { label: "Ver laboratório de sistemas", href: "/labs", type: "navigate" },
        { label: "Mapa de competências", href: "#approach", type: "anchor" }
      ],
      es: [
        { label: "Laboratorio de sistemas", href: "/labs", type: "navigate" },
        { label: "Mapa de competencias", href: "#approach", type: "anchor" }
      ]
    },
    followUps: {
      en: ["What is your tech stack?", "How do you define Design Engineering?", "How do you test in code?"],
      fr: ["Quelle est ta stack technique ?", "Comment définis-tu le Design Engineering ?", "Comment testes-tu en code ?"],
      pt: ["Qual é a sua stack técnica?", "Como você define Design Engineering?", "Como você testa em código?"],
      es: ["¿Cuál es tu stack técnico?", "¿Cómo defines el Design Engineering?", "¿Cómo pruebas en código?"]
    }
  },
  {
    id: "cognitive_load_friction",
    keywords: [
      "cognitive load", "carga cognitiva", "fricção", "friccion", "friction", "mental model",
      "modelo mental", "progressive disclosure", "divulgação progressiva", "complexidade",
      "complex systems", "charge cognitive"
    ],
    en: "In mission-critical enterprise systems, user error is rarely user incompetence; it is **interface negligence**. I manage cognitive friction through 3 strategies:\n\n1. **Eliminate Extraneous Load**: Strip away vanity metrics, decorative visual clutter, and unnecessary inputs.\n2. **Progressive Disclosure**: Show only what the operator needs for the immediate decision, with detailed audit evidence available 1-click away.\n3. **Align Mental & System Models**: Systems often expose internal database tables (e.g. tracking codes, carrier discrepancies). I design interfaces that translate system chaos into plain, actionable operational terms.",
    fr: "Dans les logiciels d'entreprise critiques, l'erreur humaine est rarement due à l'incompétence de l'utilisateur ; elle résulte d'une **négligence d'interface**. Je réduis la friction cognitive via 3 axes :\n\n1. **Éliminer la charge extrinsèque** : Supprimer les graphiques décoratifs et les champs redondants.\n2. **Divulgation progressive** : Afficher uniquement l'information nécessaire à la décision immédiate, avec l'accès complet aux preuves d'audit en 1 clic.\n3. **Aligner les modèles mentaux** : Les systèmes imposent souvent le jargon des bases de données. Je conçois des interfaces qui traduisent ce chaos en décisions opérationnelles claires.",
    pt: "Em sistemas corporativos e operacionais críticos, o erro do usuário quase nunca é incompetência; é **negligência de interface**. Eu reduzo a fricção cognitiva através de 3 táticas:\n\n1. **Eliminar Carga Extrínseca**: Cortar métricas vaidosas, poluição visual e formulários inchados.\n2. **Divulgação Progressiva (Progressive Disclosure)**: Exibir apenas o necessário para a decisão imediata, deixando evidências de auditoria e detalhes a 1 clique de distância.\n3. **Alinhar Modelos Mentais**: Softwares frequentemente cospem termos técnicos de banco de dados na cara do operador. Meu trabalho é traduzir o caos do sistema em termos claros e defensáveis.",
    es: "En software empresarial crítico, el error del usuario rara vez es incompetencia; es **negligencia de interfaz**. Reduzco la fricción cognitiva mediante 3 tácticas:\n\n1. **Eliminar Carga Extrínseca**: Eliminar métricas vanidosas, adornos innecesarios y formularios inflados.\n2. **Divulgación Progresiva**: Mostrar únicamente lo indispensable para la decisión inmediata, con acceso a evidencias detalladas a un solo clic.\n3. **Alinear Modelos Mentales**: Los sistemas suelen arrojar jerga de base de datos. Mi labor es traducir el caos del sistema en términos operativos claros y defendibles.",
    actions: {
      en: [
        { label: "See Relay Case Study", href: "/work/relay", type: "navigate" },
        { label: "Way of Working", href: "#approach", type: "anchor" }
      ],
      fr: [
        { label: "Voir l'étude Relay", href: "/fr/work/relay", type: "navigate" },
        { label: "Ma démarche", href: "#approach", type: "anchor" }
      ],
      pt: [
        { label: "Ver case Relay", href: "/work/relay", type: "navigate" },
        { label: "Como eu trabalho", href: "#approach", type: "anchor" }
      ],
      es: [
        { label: "Ver caso Relay", href: "/work/relay", type: "navigate" },
        { label: "Cómo trabajo", href: "#approach", type: "anchor" }
      ]
    },
    followUps: {
      en: ["What is your take on Steve Jobs's philosophy?", "How do you test in code?", "How to contact you?"],
      fr: ["Quelle est ta vision de Steve Jobs ?", "Comment testes-tu en code ?", "Comment te contacter ?"],
      pt: ["Qual é a sua visão sobre Steve Jobs?", "Como você testa em código?", "Como entrar em contato?"],
      es: ["¿Cuál es tu visión sobre Steve Jobs?", "¿Cómo pruebas en código?", "¿Cómo contactar contigo?"]
    }
  },
  {
    id: "approach",
    keywords: [
      "how you work", "how do you work", "way of working", "como você trabalha", "como voce trabalha",
      "como funciona", "como você funciona", "como voce funciona", "como pensa", "pensamento",
      "mindset", "método", "metodologia", "processo", "approach", "comment travaillez-vous",
      "comment vous travaillez", "methode", "démarche", "demarche", "philosophie", "filosofia",
      "cómo trabajas", "como trabajas", "metodología", "metodologia"
    ],
    en: "My mindset was forged by **8 years in frontline multilingual operations** across France and Spain. I've lived through the mess created when design stops at polished Figma mockups that fall apart at the first real system exception. I approach complex products through 3 core commitments:\n\n1. **Separate evidence from assumptions**: I start with real operational bottlenecks, keeping verified facts strictly distinct from untested guesses.\n2. **Prototype where the doubt lives**: I don't rely only on static frames. I build working prototypes in React/Next.js to stress-test error recovery, missing states, and real WCAG accessibility before engineers write production code.\n3. **Care for the handover**: I document trade-offs, state logic, and data contracts so design and engineering build together with zero ambiguity.",
    fr: "Ma vision s'est forgée au fil de **8 ans sur le terrain en opérations multilingues** en France et en Espagne. J'ai vu ce qui se passe quand le design se limite à de jolies maquettes Figma qui s'effondrent dès la première exception de système. Ma démarche repose sur 3 piliers :\n\n1. **Distinguer les faits des suppositions** : Je pars des points de friction réels et des contraintes opérationnelles, en isolant les preuves vérifiées des simples hypothèses.\n2. **Prototyper là où réside le doute** : Je ne me fie pas aux écrans figés. Je code des prototypes fonctionnels en React/Next.js pour éprouver les cas limites, les états d'erreur et l'accessibilité réelle.\n3. **Soigner le passage de relais** : Je documente les arbitrages et la logique d'état pour que design et ingénierie avancent sans perte de contexte.",
    pt: "Meu jeito de pensar e trabalhar foi forjado em **8 anos na linha de frente de operações multilíngues** na França e na Espanha. Eu vi de perto o que acontece quando o design vive apenas em mockups bonitinhos no Figma que quebram na primeira exceção de sistema. Minha abordagem é baseada em 3 compromissos:\n\n1. **Separar fatos de achismos**: Começo nas dores reais das pessoas e nas restrições operacionais, separando o que é evidência comprovada do que ainda é hipótese.\n2. **Prototipar onde mora a dúvida**: Não confio apenas em telas estáticas. Eu construo protótipos funcionais em React/Next.js para testar na prática estados vazios, falhas de rede, limites do sistema e acessibilidade real.\n3. **Cuidar da passagem de bastão (handoff)**: Documento decisões, trade-offs e fluxos para que design e engenharia falem a mesma língua, sem atrito e sem retrabalho.",
    es: "Mi mentalidad se forjó en **8 años en primera línea de operaciones multilingües** en Francia y España. He vivido el caos que se genera cuando el diseño se queda en maquetas estáticas de Figma que se rompen ante la primera excepción de sistema. Mi enfoque se basa en 3 compromisos:\n\n1. **Separar hechos de suposiciones**: Empiezo por los cuellos de botella reales y las restricciones operativas, aislando las pruebas de las hipótesis.\n2. **Prototipar donde reside la duda**: No me fío de pantallas estáticas. Construyo prototipos funcionales en React/Next.js para poner a prueba la recuperación de errores, los estados vacíos y la accesibilidad WCAG real.\n3. **Cuidar el pase a ingeniería (handoff)**: Documento decisiones, trade-offs y contratos de estado para que diseño y desarrollo construyan juntos sin ambigüedades.",
    actions: {
      en: [
        { label: "Jump to 'Way of Working' section", href: "#approach", type: "anchor" },
        { label: "See Capabilities Explorer", href: "#approach", type: "anchor" }
      ],
      fr: [
        { label: "Voir la section 'Ma démarche'", href: "#approach", type: "anchor" },
        { label: "Explorer les compétences", href: "#approach", type: "anchor" }
      ],
      pt: [
        { label: "Ir para seção 'Como trabalho'", href: "#approach", type: "anchor" },
        { label: "Ver mapa de competências", href: "#approach", type: "anchor" }
      ],
      es: [
        { label: "Ir a la sección 'Cómo trabajo'", href: "#approach", type: "anchor" },
        { label: "Ver mapa de competencias", href: "#approach", type: "anchor" }
      ]
    },
    followUps: {
      en: ["What is your take on Steve Jobs & Apple HIG?", "Tell me about the Relay case study", "How can I contact Breno?"],
      fr: ["Quelle est ta vision de Steve Jobs & Apple HIG ?", "Parle-moi du projet Relay", "Comment te contacter ?"],
      pt: ["O que pensa sobre Steve Jobs e Apple HIG?", "Me conta sobre o case Relay", "Como entrar em contato com você?"],
      es: ["¿Qué opinas sobre Steve Jobs y Apple HIG?", "Cuéntame sobre el caso Relay", "¿Cómo contactar contigo?"]
    }
  },
  {
    id: "navigation",
    keywords: [
      "ir para", "ir pra", "levar para", "navegar", "abrir pagina", "abrir página", "mostrar",
      "go to", "jump to", "open page", "navigate to", "teleport", "aller à", "aller a", "ouvrir", "page",
      "seção", "secao", "sección", "seccion"
    ],
    en: "Here are direct shortcuts to teleport to any section of my portfolio without friction:",
    fr: "Voici les raccourcis directs pour accéder directement à n'importe quelle section de mon portfolio :",
    pt: "Aqui estão os atalhos diretos para você ir para qualquer parte do meu portfólio sem rodeios:",
    es: "Aquí tienes los accesos directos para saltar a cualquier parte de mi portfolio sin fricción:",
    actions: {
      en: [
        { label: "Relay Prototype", href: "/work/relay", type: "navigate" },
        { label: "Way of Working", href: "#approach", type: "anchor" },
        { label: "About & Background", href: "/about", type: "navigate" },
        { label: "Contact Form", href: "#contact", type: "anchor" },
        { label: "Download Resume", href: "/breno-sampaio-resume-en.pdf", type: "download" }
      ],
      fr: [
        { label: "Prototype Relay", href: "/fr/work/relay", type: "navigate" },
        { label: "Ma démarche", href: "#approach", type: "anchor" },
        { label: "À propos", href: "/fr/about", type: "navigate" },
        { label: "Formulaire de contact", href: "#contact", type: "anchor" },
        { label: "Télécharger mon CV", href: "/breno-sampaio-resume-en.pdf", type: "download" }
      ],
      pt: [
        { label: "Case Relay", href: "/work/relay", type: "navigate" },
        { label: "Como Trabalho (Approach)", href: "#approach", type: "anchor" },
        { label: "Sobre Mim", href: "/about", type: "navigate" },
        { label: "Formulário de Contato", href: "#contact", type: "anchor" },
        { label: "Baixar Currículo", href: "/breno-sampaio-resume-en.pdf", type: "download" }
      ],
      es: [
        { label: "Prototipo Relay", href: "/work/relay", type: "navigate" },
        { label: "Cómo trabajo", href: "#approach", type: "anchor" },
        { label: "Sobre mí", href: "/about", type: "navigate" },
        { label: "Formulario de contacto", href: "#contact", type: "anchor" },
        { label: "Descargar CV (PDF)", href: "/breno-sampaio-resume-en.pdf", type: "download" }
      ]
    },
    followUps: {
      en: ["Tell me about Relay case study", "Explain your Way of Working", "Download resume (PDF)"],
      fr: ["Parle-moi de l'étude Relay", "Quelle est ta démarche ?", "Télécharger le CV"],
      pt: ["Conte sobre o case Relay", "Como você trabalha?", "Baixar currículo em PDF"],
      es: ["Cuéntame sobre el caso Relay", "Explica cómo trabajas", "Descargar CV en PDF"]
    }
  },
  {
    id: "relay",
    keywords: ["relay", "airline", "exception", "case study", "case", "projeto", "projet", "proyecto"],
    en: "**Relay** is my flagship research prototype for multi-party exception handling. It tackles the painful reality where orders, fulfillment, and carrier systems disagree. Instead of slapping together another passive dashboard full of meaningless charts, I framed the product around the **next defensible decision**—with semantic queues, source-labelled evidence, synthetic data disclosures, and an auditable closure log. It's a real working React/Next.js prototype you can interact with right now.",
    fr: "**Relay** est mon prototype de recherche phare pour la résolution d'exceptions opérationnelles. Quand les systèmes de commande, de transport et de service client divergent, plutôt que d'ajouter un énième tableau de bord passif, j'ai structuré le produit autour de la **prochaine décision défendable** — avec des files d'attente sémantiques, des preuves sourcées et une piste d'audit complète. C'est un vrai prototype fonctionnel en React/Next.js.",
    pt: "O **Relay** é o meu protótipo de pesquisa principal. Desenhei ele para resolver uma dor clássica e brutal: quando sistemas de pedidos, centros de distribuição e transportadoras discordam e ninguém sabe qual é a próxima decisão segura. Em vez de criar outro dashboard passivo cheio de métricas vazias, estruturei o produto em torno da **próxima decisão defensável** — com filas semânticas, dados sintéticos transparentes, permissões explícitas e log de auditoria completo. E sim: é um protótipo funcional em React/Next.js que você pode testar agora.",
    es: "**Relay** es mi prototipo de investigación insignia para la gestión de excepciones operativas entre múltiples sistemas. Cuando pedidos, centros logísticos y transportistas discrepan, en lugar de diseñar otro panel pasivo lleno de gráficos vacíos, estructuré el producto alrededor de la **siguiente decisión defendible** — con colas semánticas, datos sintéticos transparentes, permisos explícitos y un registro de auditoría completo. Es un prototipo funcional en React/Next.js que puedes probar ahora mismo.",
    actions: {
      en: [
        { label: "Open Relay Prototype", href: "/work/relay", type: "navigate" },
        { label: "Browse all work", href: "/work", type: "navigate" }
      ],
      fr: [
        { label: "Ouvrir l'étude Relay", href: "/fr/work/relay", type: "navigate" },
        { label: "Voir tous mes projets", href: "/fr/work", type: "navigate" }
      ],
      pt: [
        { label: "Abrir protótipo do Relay", href: "/work/relay", type: "navigate" },
        { label: "Ver todos os projetos", href: "/work", type: "navigate" }
      ],
      es: [
        { label: "Abrir prototipo Relay", href: "/work/relay", type: "navigate" },
        { label: "Ver todos los proyectos", href: "/work", type: "navigate" }
      ]
    },
    followUps: {
      en: ["How do you use React for prototyping?", "What other projects have you built?", "How do you work with engineers?"],
      fr: ["Comment utilises-tu React pour prototyper ?", "Quels autres projets as-tu réalisés ?", "Comment travailles-tu avec les ingénieurs ?"],
      pt: ["Como você usa React para prototipar?", "Quais outros projetos você construiu?", "Como você trabalha com desenvolvedores?"],
      es: ["¿Cómo usas React para prototipar?", "¿Qué otros proyectos has creado?", "¿Cómo colaboras con ingenieros?"]
    }
  },
  {
    id: "triage",
    keywords: ["triage", "triageai", "ai", "intake", "support triage", "ia", "inteligencia", "triagem"],
    en: "**TriageAI** is an operational support concept I designed for multilingual environments (handling PT, ES, FR, and EN in a single queue). My non-negotiable rule here is **human-in-the-loop**: no automated message goes out without operator sign-off. I built clear confidence scoring and turned missing details into actionable next steps instead of dead ends.",
    fr: "**TriageAI** est un concept opérationnel que j'ai conçu pour le tri du support multilingue (PT, ES, FR, EN en file unifiée). Ma règle cardinale est l'**approbation humaine préalable** : aucun message sortant n'est envoyé sans validation par un opérateur. J'ai rendu les scores de confiance transparents et transformé les données manquantes en tâches concrètes.",
    pt: "O **TriageAI** é um conceito operacional que desenhei para triagem de suporte multilíngue (lidando com PT, ES, FR e EN em uma fila unificada). A minha regra inegociável aqui é o **human-in-the-loop**: nenhuma resposta automatizada sai sem aprovação de um operador humano. Eu estruturei o fluxo com pontuações transparentes de confiança e transformo informações incompletas em tarefas claras em vez de becos sem saída.",
    es: "**TriageAI** es un concepto operativo que diseñé para la clasificación de soporte multilingüe (gestionando PT, ES, FR y EN en una cola unificada). Mi regla innegociable es **human-in-the-loop**: ningún mensaje automatizado sale sin la validación previa de un operador humano. Diseñé puntuaciones de confianza transparentes y transformé datos incompletos en tareas accionables.",
    actions: {
      en: [{ label: "View TriageAI case", href: "/work/triageai", type: "navigate" }],
      fr: [{ label: "Voir le cas TriageAI", href: "/fr/work/triageai", type: "navigate" }],
      pt: [{ label: "Ver case TriageAI", href: "/work/triageai", type: "navigate" }],
      es: [{ label: "Ver caso TriageAI", href: "/work/triageai", type: "navigate" }]
    },
    followUps: {
      en: ["Tell me about Relay case study", "What is your background?", "How can I contact Breno?"],
      fr: ["Parle-moi de l'étude Relay", "Quel est ton parcours ?", "Comment te contacter ?"],
      pt: ["Conte sobre o case Relay", "Qual é a sua trajetória?", "Como falar com você?"],
      es: ["Cuéntame sobre el caso Relay", "¿Cuál es tu trayectoria?", "¿Cómo contactar contigo?"]
    }
  },
  {
    id: "background",
    keywords: [
      "background", "who is", "who are", "about", "bio", "experience", "historia",
      "sobre", "experiencia", "parcours", "qui est", "trayectoria", "sobre mí", "sobre mi", "quién eres", "quien eres"
    ],
    en: "I spent **8 years in frontline multilingual operations** (at Moontels, Travelodge, and Accor in Rennes) before focusing on Product Design and Frontend Prototyping. Living through broken handoffs, fragmented records, and operational chaos gave me an edge: I don't design for the imaginary 'happy path'—I design systems that hold up under real pressure. Today I'm based in Valencia, Spain.",
    fr: "J'ai passé **8 ans au cœur d'opérations multilingues** (chez Moontels, Travelodge et dans le groupe Accor à Rennes) avant de me consacrer au Product Design et au prototypage frontend. Avoir vécu au quotidien les ruptures de service et l'ambiguïté des responsabilités m'a appris une chose essentielle : concevoir pour la réalité du terrain et non pour un monde idéal. Je vis aujourd'hui à Valence, en Espagne.",
    pt: "Passei **8 anos na linha de frente de operações multilíngues** (na Moontels, Travelodge e no grupo Accor em Rennes) antes de migrar com foco total para Product Design e prototipagem frontend. Ter vivido na pele a dor de handoffs quebrados, informações desencontradas e suporte caótico me deu uma vantagem que muito designer não tem: eu não projeto pensando só no 'caminho feliz', projeto para sistemas que precisam aguentar a pressão do mundo real. Hoje moro em Valência, Espanha.",
    es: "Pasé **8 años en operaciones multilingües de primera línea** (en Moontels, Travelodge y el grupo Accor en Rennes) antes de dedicarme de lleno al Product Design y al prototipado frontend. Vivir en carne propia los traspasos rotos y la ambigüedad operativa me dio una ventaja clave: no diseño para el 'camino feliz' imaginario, diseño sistemas que resisten la presión del mundo real. Actualmente vivo en Valencia, España.",
    actions: {
      en: [
        { label: "Read full About story", href: "/about", type: "navigate" },
        { label: "Jump to About section", href: "#about", type: "anchor" }
      ],
      fr: [
        { label: "Lire mon histoire complète", href: "/fr/about", type: "navigate" },
        { label: "Aller à la section À propos", href: "#about", type: "anchor" }
      ],
      pt: [
        { label: "Ver minha história completa", href: "/about", type: "navigate" },
        { label: "Ir para seção Sobre", href: "#about", type: "anchor" }
      ],
      es: [
        { label: "Leer mi historia completa", href: "/about", type: "navigate" },
        { label: "Ir a la sección Sobre mí", href: "#about", type: "anchor" }
      ]
    },
    followUps: {
      en: ["Explain your 3-pillar Way of Working", "What are your hard & soft skills?", "Download my resume"],
      fr: ["Explique ta démarche en 3 piliers", "Quelles sont tes compétences clés ?", "Télécharger le CV"],
      pt: ["Como funciona sua metodologia em 3 pilares?", "Quais são suas habilidades técnicas?", "Baixar meu currículo"],
      es: ["Explica tu metodología en 3 pilares", "¿Cuáles son tus habilidades clave?", "Descargar mi CV"]
    }
  },
  {
    id: "skills",
    keywords: ["skills", "stack", "tools", "technologies", "tech", "react", "next", "css", "figma", "habilidades", "ferramentas", "competences", "competencias"],
    en: "My skillset bridges two worlds that often clash: **Product Design & Engineering Prototyping**:\n\n• **Design**: Interaction design, UI systems & design tokens, accessible patterns (WCAG 2.1 AA), information architecture.\n• **Code & Frontend**: React 19, Next.js 16 (App Router), Modern CSS, semantic HTML, JavaScript, Git, automated testing (Vitest/Playwright).\n• **Product & Ops**: Real workflow mapping, edge-case scoping, and zero-loss communication with engineering.",
    fr: "Mon profil fait le pont entre deux mondes : **Product Design et prototypage frontend** :\n\n• **Design** : Design d'interaction, design systems et tokens, accessibilité (WCAG 2.1 AA), architecture de l'information.\n• **Code / Frontend** : React 19, Next.js 16, CSS moderne, HTML sémantique, JavaScript, Git, Vitest, Playwright.\n• **Produit & Opérations** : Cartographie des flux, anticipation des cas limites et collaboration directe avec les développeurs.",
    pt: "Minha atuação une duas pontas que raramente conversam bem: **Product Design e Prototipagem em Código**:\n\n• **Design**: Design de interação, design systems e design tokens, acessibilidade real (WCAG 2.1 AA), arquitetura da informação.\n• **Código / Frontend**: React 19, Next.js 16 (App Router), CSS Moderno, HTML semântico, JavaScript, Git, testes automatizados (Vitest/Playwright).\n• **Produto & Operações**: Mapeamento de fluxos reais, análise profunda de edge cases e comunicação sem ruído com engenharia.",
    es: "Mi perfil une dos mundos que a menudo chocan: **Product Design y Prototipado en código**:\n\n• **Diseño**: Diseño de interacción, sistemas de diseño y tokens, accesibilidad real (WCAG 2.1 AA), arquitectura de información.\n• **Código / Frontend**: React 19, Next.js 16 (App Router), CSS Moderno, HTML semántico, JavaScript, Git, pruebas automatizadas (Vitest/Playwright).\n• **Producto y Operaciones**: Mapeo de flujos reales, análisis de casos límite y colaboración directa con ingeniería sin pérdida de contexto.",
    actions: {
      en: [
        { label: "Explore Capabilities Map", href: "#approach", type: "anchor" },
        { label: "Systems Lab preview", href: "/labs", type: "navigate" }
      ],
      fr: [
        { label: "Explorer mes compétences", href: "#approach", type: "anchor" },
        { label: "Laboratoire systèmes", href: "/fr/labs", type: "navigate" }
      ],
      pt: [
        { label: "Ver mapa de competências", href: "#approach", type: "anchor" },
        { label: "Ver laboratório de sistemas", href: "/labs", type: "navigate" }
      ],
      es: [
        { label: "Explorar mapa de competencias", href: "#approach", type: "anchor" },
        { label: "Laboratorio de sistemas", href: "/labs", type: "navigate" }
      ]
    },
    followUps: {
      en: ["Tell me about your React & Next.js practice", "Explain your Way of Working", "Download resume (PDF)"],
      fr: ["Parle-moi de ta pratique React & Next.js", "Explique ta démarche de travail", "Télécharger le CV"],
      pt: ["Como é sua prática com React e Next.js?", "Como é o seu modo de trabalhar?", "Baixar currículo em PDF"],
      es: ["¿Cómo es tu práctica con React y Next.js?", "¿Cuál es tu método de trabajo?", "Descargar currículum (PDF)"]
    }
  },
  {
    id: "languages",
    keywords: [
      "language", "languages", "idioma", "idiomas", "linguas", "línguas", "français", "french", "ingles",
      "english", "portugues", "português", "espanol", "español", "langues", "speak", "speaks", "do you speak",
      "what languages", "quais linguas", "quais línguas", "quais idiomas", "que idiomas", "que línguas",
      "fala ingles", "fala francês", "fala frances", "hablas inglés", "hablas ingles", "parlez français"
    ],
    en: "I work across **4 languages** fluently:\n\n• **Portuguese**: Native\n• **Spanish**: Fluent\n• **French**: Fluent / Professional\n• **English**: Professional working\n\nThis comes from years of frontline international operations, which helps me design software that naturally accommodates localization and diverse operational cultures.",
    fr: "Je travaille couramment en **4 langues** :\n\n• **Portugais** : Langue maternelle\n• **Espagnol** : Courant\n• **Français** : Courant / Professionnel\n• **Anglais** : Professionnel de travail\n\nCe bagage multilingue est issu d'années sur le terrain et me permet de concevoir des interfaces prêtes pour l'internationalisation.",
    pt: "Falo **4 idiomas** fluentemente no dia a dia profissional:\n\n• **Português**: Nativo\n• **Espanhol**: Fluente\n• **Francês**: Fluente / Profissional\n• **Inglês**: Profissional de trabalho\n\nIsso não é só falar línguas: são anos operando com clientes e times de vários países, o que me faz projetar produtos já preparados para localização e contextos culturais diversos.",
    es: "Trabajo fluidamente en **4 idiomas** en el día a día profesional:\n\n• **Portugués**: Nativo\n• **Español**: Fluido\n• **Francés**: Fluido / Profesional\n• **Inglés**: Profesional de trabajo\n\nEste bagaje proviene de años en operaciones internacionales de primera línea, lo que me ayuda a diseñar productos que contemplan de forma natural la localización y diversos contextos culturales.",
    actions: {
      en: [{ label: "Way of Working", href: "#approach", type: "anchor" }],
      fr: [{ label: "Ma démarche", href: "#approach", type: "anchor" }],
      pt: [{ label: "Como eu trabalho", href: "#approach", type: "anchor" }],
      es: [{ label: "Cómo trabajo", href: "#approach", type: "anchor" }]
    },
    followUps: {
      en: ["How does multilingual ops impact your UI work?", "Tell me about Relay", "How to contact Breno?"],
      fr: ["Quel impact a le multilingue sur tes interfaces ?", "Parle-moi du projet Relay", "Comment te contacter ?"],
      pt: ["Como o ambiente multilíngue afeta seu design?", "Conte sobre o Relay", "Como entrar em contato?"],
      es: ["¿Cómo influye el entorno multilingüe en tus interfaces?", "Cuéntame sobre Relay", "¿Cómo contactar contigo?"]
    }
  },
  {
    id: "contact",
    keywords: [
      "contact", "contacter", "hire", "email", "courriel", "linkedin", "github", "talk",
      "contato", "contratar", "falar", "message", "recruteur", "recruiter", "hablar", "contacto"
    ],
    en: "Want to connect directly? No red tape or intermediaries:\n\n• **Email**: sampayobreno@gmail.com\n• **LinkedIn**: linkedin.com/in/brenosampaio\n• **GitHub**: github.com/sampayobreno-spec\n\nI'm based in **Valencia, Spain** and actively open to Product Design and Prototyping roles across Europe or with remote teams.",
    fr: "Envie d'échanger directement ? Pas de bureaucratie ni d'intermédiaire :\n\n• **Courriel** : sampayobreno@gmail.com\n• **LinkedIn** : linkedin.com/in/brenosampaio\n• **GitHub** : github.com/sampayobreno-spec\n\nJe suis basé à **Valence en Espagne** et ouvert à des opportunités en Product Design et Prototypage en Europe ou en télétravail.",
    pt: "Bora conversar direto? Não tem burocracia nem intermediário:\n\n• **E-mail**: sampayobreno@gmail.com\n• **LinkedIn**: linkedin.com/in/brenosampaio\n• **GitHub**: github.com/sampayobreno-spec\n\nTô baseado em **Valência, Espanha** e aberto a oportunidades em Product Design e Prototipagem na Europa ou em times remotos.",
    es: "¿Quieres hablar directamente? Sin burocracia ni intermediarios:\n\n• **Email**: sampayobreno@gmail.com\n• **LinkedIn**: linkedin.com/in/brenosampaio\n• **GitHub**: github.com/sampayobreno-spec\n\nEstoy en **Valencia, España** y abierto a oportunidades en Product Design y Prototipado en Europa o con equipos remotos.",
    actions: {
      en: [
        { label: "Go to Contact Form", href: "#contact", type: "anchor" },
        { label: "Send Email directly", href: "mailto:sampayobreno@gmail.com", type: "external" },
        { label: "View LinkedIn", href: "https://www.linkedin.com/in/brenosampaio", type: "external" }
      ],
      fr: [
        { label: "Formulaire de contact", href: "#contact", type: "anchor" },
        { label: "M'envoyer un e-mail", href: "mailto:sampayobreno@gmail.com", type: "external" },
        { label: "Mon profil LinkedIn", href: "https://www.linkedin.com/in/brenosampaio", type: "external" }
      ],
      pt: [
        { label: "Ir para formulário de contato", href: "#contact", type: "anchor" },
        { label: "Enviar e-mail direto", href: "mailto:sampayobreno@gmail.com", type: "external" },
        { label: "Ver meu LinkedIn", href: "https://www.linkedin.com/in/brenosampaio", type: "external" }
      ],
      es: [
        { label: "Ir al formulario de contacto", href: "#contact", type: "anchor" },
        { label: "Enviar email directo", href: "mailto:sampayobreno@gmail.com", type: "external" },
        { label: "Ver mi LinkedIn", href: "https://www.linkedin.com/in/brenosampaio", type: "external" }
      ]
    },
    followUps: {
      en: ["What kind of roles are you open to?", "Download my resume", "Explain your Way of Working"],
      fr: ["Quels types de postes recherches-tu ?", "Télécharger mon CV", "Explique ta démarche"],
      pt: ["Que tipo de vagas você está buscando?", "Baixar meu currículo", "Como você trabalha?"],
      es: ["¿Qué tipo de puestos buscas?", "Descargar mi CV", "¿Cómo trabajas?"]
    }
  },
  {
    id: "resume",
    keywords: ["resume", "cv", "curriculo", "curriculum", "currículo", "currículum"],
    en: "You can grab my up-to-date resume in PDF using the button below (focused on Product Design and Prototyping):",
    fr: "Tu peux télécharger mon CV à jour au format PDF via le bouton ci-dessous :",
    pt: "Você pode baixar meu currículo atualizado em PDF clicando no botão abaixo (versão com foco em Product Design e Prototipagem Funcional):",
    es: "Puedes descargar mi currículum actualizado en PDF haciendo clic en el botón de abajo (con foco en Product Design y Prototipado Funcional):",
    actions: {
      en: [{ label: "Download Resume (PDF)", href: "/breno-sampaio-resume-en.pdf", type: "download" }],
      fr: [{ label: "Télécharger mon CV (PDF)", href: "/breno-sampaio-resume-en.pdf", type: "download" }],
      pt: [{ label: "Baixar Currículo (PDF)", href: "/breno-sampaio-resume-en.pdf", type: "download" }],
      es: [{ label: "Descargar CV (PDF)", href: "/breno-sampaio-resume-en.pdf", type: "download" }]
    },
    followUps: {
      en: ["What are your core skills?", "Tell me about the Relay case", "How to contact you?"],
      fr: ["Quelles sont tes compétences clés ?", "Parle-moi de l'étude Relay", "Comment te contacter ?"],
      pt: ["Quais são suas habilidades principais?", "Conte sobre o case Relay", "Como falar direto com você?"],
      es: ["¿Cuáles son tus habilidades clave?", "Cuéntame sobre el caso Relay", "¿Cómo hablar directamente contigo?"]
    }
  }
];

function normalizeForLanguageDetection(text) {
  return " " + (text || "").toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim() + " ";
}

const PT_PHRASES = [
  " que conceitos ", " conceitos de ", " conceitos de design ", " que principios ", " principios de ",
  " bom dia ", " boa tarde ", " boa noite ", " tudo bem ", " tudo bom ", " como vai ",
  " e ai ", " e aí ", " fala ai ", " fala aí ", " fala breno ", " ola breno ", " oi breno ", " opa breno ",
  " me ajuda ", " me explica ", " me conta ", " me diga ", " me conte ", " o que voce ", " o que vc ",
  " quem e voce ", " quem e vc ", " quais principios ", " como voce ", " como vc ",
  " voce mora ", " vc mora ", " qual e sua ", " qual e o seu ", " fale sobre ",
  " me fale ", " conta mais ", " fale mais ", " me tira uma ", " falar com ",
  " falar contigo ", " trocar uma ideia ", " o que voce acha ", " o que vc acha ",
  " como funciona ", " me mostra ", " voce pode ", " voce faz ", " vc faz ",
  " por favor ", " valeu ", " beleza ", " blz ", " opa ", " eae ", " salve ",
  " quero ver ", " me mostre ", " me fala sobre "
];

const ES_PHRASES = [
  " buenos dias ", " buenas tardes ", " buenas noches ", " buen dia ", " hola que tal ",
  " que tal ", " como estas ", " como te va ", " muchas gracias ", " por favor ",
  " cuentame ", " explicame ", " dime ", " que haces ", " quien eres ", " cuales son ",
  " en que trabajas ", " donde vives ", " hablame ", " hablemos ", " que opinas ",
  " como funciona ", " que conceptos ", " conceptos de "
];

const FR_PHRASES = [
  " bonjour ", " bonsoir ", " bonne journee ", " bonne soiree ", " ca va ",
  " comment vas tu ", " comment ca va ", " comment allez vous ", " merci beaucoup ",
  " s il vous plait ", " s il te plait ", " qui es tu ", " qui etes vous ",
  " que fais tu ", " que faites vous ", " parle moi ", " dis moi ", " explique moi ",
  " parlez moi ", " qu est ce que ", " quels concepts "
];

const EN_PHRASES = [
  " good morning ", " good afternoon ", " good evening ", " how are you ",
  " what s up ", " whats up ", " how s it going ", " hows it going ",
  " nice to meet you ", " who are you ", " what do you do ", " tell me about ",
  " let s talk ", " talk to you ", " design concepts ", " how do you ", " can you "
];

const PT_EXCLUSIVE = new Set([
  "voce", "voces", "vc", "vcs", "nao", "obrigado", "obrigada", "valeu", "bora", "beleza",
  "blz", "opa", "eae", "salve", "tambem", "estao", "acha", "acho", "achas", "acham",
  "gosta", "gosto", "gostas", "gostam", "meu", "minha", "meus", "minhas", "teu", "tua",
  "teus", "tuas", "seu", "sua", "seus", "suas", "nosso", "nossa", "nossos", "nossas",
  "pra", "pro", "pras", "pros", "pelo", "pela", "pelos", "pelas", "sao", "da", "das",
  "dos", "na", "nas", "dele", "dela", "deles", "delas", "nele", "nela", "portugues",
  "sou", "estou", "curriculo", "trabalha", "trabalho", "faz", "fazer", "fazendo", "fiz",
  "conhece", "conhecer", "ajuda", "ajudar", "fala", "falar", "diz", "dizer", "quais",
  "qual", "onde", "quando", "porque", "conceitos", "conceito", "trajetoria", "bucha",
  "estrada", "conte", "diga", "quero", "quer", "ferramentas", "carreira", "sobre"
]);

const ES_EXCLUSIVE = new Set([
  "usted", "ustedes", "cual", "cuales", "quien", "quienes", "donde", "porque", "hola",
  "gracias", "saludos", "espanol", "del", "al", "haces", "hace", "hacer", "haciendo",
  "hizo", "hecho", "eres", "estas", "estoy", "estamos", "estan", "dime", "cuentame",
  "explicame", "aqui", "alli", "despues", "tu", "tus", "mi", "mis", "nuestro", "nuestra",
  "nuestros", "nuestras", "bueno", "buena", "buenos", "buenas", "hablas", "habla", "hablar"
]);

const FR_EXCLUSIVE = new Set([
  "comment", "pourquoi", "quand", "qui", "quel", "quelle", "quels", "quelles", "quoi",
  "bonjour", "bonsoir", "salut", "merci", "beaucoup", "demarche", "vous", "nous", "c est",
  "j ai", "qu est", "n est", "francais", "suis", "sommes", "etes", "sont", "fais",
  "fait", "faire", "vas", "vais", "va", "plait", "coucou", "votre", "vos", "leur",
  "leurs", "cette", "parle", "parlez", "travailles", "travaillez"
]);

const EN_EXCLUSIVE = new Set([
  "how", "what", "where", "who", "when", "why", "which", "whose", "whom", "hello", "hi",
  "hey", "thanks", "thank", "you", "your", "yours", "the", "should", "would", "could",
  "about", "english", "please", "working", "works", "think", "thinks", "thought", "like",
  "likes", "prefer", "prefers", "show", "shows", "tell", "tells", "explain", "explains",
  "know", "knows", "is", "are", "was", "were", "have", "has", "had", "with", "from",
  "they", "them", "their", "this", "that", "these", "those", "much", "many", "any",
  "some", "good", "better", "best"
]);

const PT_PARTICLES = new Set(["que", "de", "do", "da", "em", "no", "na", "para", "pra", "com", "por", "mais", "como", "sobre", "seus", "suas", "meu", "minha", "um", "uma"]);
const ES_PARTICLES = new Set(["que", "de", "del", "al", "en", "para", "por", "con", "mas", "como", "sobre", "sus", "mi", "mis", "un", "una"]);
const FR_PARTICLES = new Set(["que", "de", "du", "des", "en", "dans", "pour", "par", "avec", "plus", "comme", "sur", "un", "une"]);
const EN_PARTICLES = new Set(["of", "in", "to", "for", "with", "on", "at", "from", "by", "about", "as", "into", "and", "or", "so", "a", "an"]);

export function detectQueryLanguage(text, defaultLang = "en", history = []) {
  const clean = (text || "").trim();
  if (!clean) return defaultLang;

  const norm = normalizeForLanguageDetection(clean);
  const rawLower = clean.toLowerCase();
  const tokens = norm.trim().split(/\s+/).filter(Boolean);

  let ptScore = 0;
  let esScore = 0;
  let frScore = 0;
  let enScore = 0;

  // 1. Explicit language switch requests have top priority
  if (/\b(em\s+portugu[êe]s|fale?\s+em\s+portugu[êe]s|no\s+portugu[êe]s)\b/i.test(rawLower)) ptScore += 30;
  if (/\b(en\s+fran[çc]ais|parle?\s+en\s+fran[çc]ais)\b/i.test(rawLower)) frScore += 30;
  if (/\b(en\s+espa[ñn]ol|habla\s+en\s+espa[ñn]ol)\b/i.test(rawLower)) esScore += 30;
  if (/\b(in\s+english|speak\s+in\s+english)\b/i.test(rawLower)) enScore += 30;

  // 2. Multi-word phrase matches (high confidence)
  PT_PHRASES.forEach((p) => { if (norm.includes(p)) ptScore += 15; });
  ES_PHRASES.forEach((p) => { if (norm.includes(p)) esScore += 15; });
  FR_PHRASES.forEach((p) => { if (norm.includes(p)) frScore += 15; });
  EN_PHRASES.forEach((p) => { if (norm.includes(p)) enScore += 15; });

  // 3. Exclusive and grammatical token matches
  tokens.forEach((t) => {
    if (PT_EXCLUSIVE.has(t)) ptScore += 6;
    if (ES_EXCLUSIVE.has(t)) esScore += 6;
    if (FR_EXCLUSIVE.has(t)) frScore += 6;
    if (EN_EXCLUSIVE.has(t)) enScore += 6;

    if (PT_PARTICLES.has(t)) ptScore += 2;
    if (ES_PARTICLES.has(t)) esScore += 2;
    if (FR_PARTICLES.has(t)) frScore += 2;
    if (EN_PARTICLES.has(t)) enScore += 2;
  });

  // 4. Language-specific character indicators
  if (/[¿¡ñ]/.test(rawLower)) esScore += 8;
  if (/[ãõ]/.test(rawLower)) ptScore += 8;
  if (/[œæ]/.test(rawLower)) frScore += 8;

  const scores = [
    { lang: "pt", score: ptScore },
    { lang: "es", score: esScore },
    { lang: "fr", score: frScore },
    { lang: "en", score: enScore },
  ].sort((a, b) => b.score - a.score);

  if (scores[0].score > 0) {
    if (
      scores[0].score === scores[1].score &&
      scores.some((s) => s.lang === defaultLang && s.score === scores[0].score)
    ) {
      return defaultLang;
    }
    return scores[0].lang;
  }

  // 5. Conversation history continuity: if current query is short/neutral, check previous user language!
  if (Array.isArray(history) && history.length > 0) {
    for (let i = history.length - 1; i >= 0; i--) {
      const prev = history[i];
      if (prev.sender === "user" && prev.text) {
        const prevLang = detectQueryLanguage(prev.text, defaultLang);
        if (prevLang && ["pt", "es", "fr", "en"].includes(prevLang) && prevLang !== defaultLang) {
          return prevLang;
        }
      }
    }
  }

  return defaultLang;
}

export function getAssistantKnowledgeResult(query, lang = "en", history = []) {
  const clean = (query || "").trim();
  const detectedLang = detectQueryLanguage(clean, lang, history);
  const targetLang = ["fr", "pt", "es", "en"].includes(detectedLang) ? detectedLang : lang;

  if (!clean) {
    if (targetLang === "fr") {
      return {
        reply: "Pose-moi n'importe quelle question sur mon parcours, ma démarche, mes prototypes ou ma vision UX/UI !",
        actions: [],
        followUps: ["Comment travailles-tu ?", "Quelle est ta vision de Steve Jobs & Apple ?", "Parle-moi du projet Relay"],
        detectedLang: targetLang
      };
    }
    if (targetLang === "pt") {
      return {
        reply: "Me pergunta qualquer coisa sobre minha trajetória, como eu trabalho, meus cases ou minha visão sobre UX/UI e Design Engineering!",
        actions: [],
        followUps: ["Como você trabalha? (Way of Working)", "O que pensa sobre Steve Jobs e Apple HIG?", "Conte sobre o case Relay"],
        detectedLang: targetLang
      };
    }
    if (targetLang === "es") {
      return {
        reply: "¡Pregúntame lo que quieras sobre mi trayectoria, cómo trabajo, mis proyectos o mi visión de UX/UI y Design Engineering!",
        actions: [],
        followUps: ["¿Cómo trabajas? (Metodología)", "¿Qué opinas sobre Steve Jobs y Apple HIG?", "Cuéntame sobre el caso Relay"],
        detectedLang: targetLang
      };
    }
    return {
      reply: "Ask me anything about my background, how I work, my design prototypes, or my take on UX/UI and Design Engineering!",
      actions: [],
      followUps: ["How do you work? (Way of Working)", "What is your take on Steve Jobs & Apple HIG?", "Tell me about Relay case study"],
      detectedLang: targetLang
    };
  }

  const lower = clean.toLowerCase();
  const queryTokens = new Set(lower.match(/[\p{L}\p{M}'-]+/gu) || []);

  // Multi-feature relevance scoring across all knowledge intents
  let bestIntent = null;
  let highestScore = 0;

  for (const item of INTENTS) {
    let score = 0;
    for (const k of item.keywords) {
      if (k.includes(" ")) {
        if (lower.includes(k)) {
          score += 6; // Exact multi-word phrase match
        }
      } else {
        if (queryTokens.has(k)) {
          score += k.length >= 4 ? 4 : 2;
        } else if (k.length > 4 && lower.includes(k)) {
          score += 2;
        }
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestIntent = item;
    }
  }

  if (bestIntent && highestScore >= 2) {
    const item = bestIntent;
    const actionsForLang = item.actions
      ? (item.actions[targetLang] || item.actions[lang] || item.actions.en || [])
      : [];
    let followUpsForLang = item.followUps
      ? (item.followUps[targetLang] || item.followUps[lang] || item.followUps.en || [])
      : [];

    // Evolving conversation: filter out follow-up questions that were already asked in history
    if (Array.isArray(history) && history.length > 0) {
      const historyTexts = history.map((h) => (h.text || "").toLowerCase());
      followUpsForLang = followUpsForLang.filter((f) => {
        const fLower = f.toLowerCase();
        return !historyTexts.some((ht) => ht.includes(fLower) || fLower.includes(ht));
      });

      // Ensure we always have at least 2 engaging follow-up suggestions
      if (followUpsForLang.length < 2) {
        const genericPool = {
          fr: ["Comment travailles-tu ?", "Parle-moi du prototype Relay", "Quelle est ta vision de Steve Jobs & Apple ?"],
          pt: ["Como você trabalha? (Approach)", "Me conta sobre o case Relay", "O que pensa sobre Steve Jobs e Apple HIG?"],
          es: ["¿Cómo trabajas? (Metodología)", "Cuéntame sobre el caso Relay", "¿Qué opinas sobre Steve Jobs y Apple HIG?"],
          en: ["Explain your Way of Working", "Tell me about Relay prototype", "What is your take on Steve Jobs & Apple HIG?"]
        };
        const pool = genericPool[targetLang] || genericPool.en;
        pool.forEach((p) => {
          if (!followUpsForLang.includes(p) && followUpsForLang.length < 3) {
            followUpsForLang.push(p);
          }
        });
      }
    }

    return {
      reply: item[targetLang] || item[lang] || item.en,
      actions: actionsForLang,
      followUps: followUpsForLang,
      detectedLang: targetLang
    };
  }

  // Determine if user input is an initial greeting or an open question
  const isGreeting =
    clean.length < 28 &&
    /\b(oi|ola|olá|bom dia|boa tarde|boa noite|e aí|e ai|fala|opa|hello|hi|hey|howdy|bonjour|salut|coucou|hola|buenas|buenos d[ií]as)\b/i.test(lower);

  // If initial greeting, welcome the visitor
  if (isGreeting && (!history || history.length === 0)) {
    if (targetLang === "fr") {
      return {
        reply: `Salut ! Je suis Breno, **Product Designer & Frontend Prototyper** basé à Valence, en Espagne, avec 8 ans d'expérience sur le terrain en opérations multilingues. J'unis le design d'interaction exigeant (Apple HIG, Dieter Rams et Don Norman) avec des prototypes fonctionnels en React.\n\nDemande-moi **comment je travaille**, mes **projets (comme Relay)**, ma **vision du Design Engineering** ou de t'**orienter vers une section** !`,
        actions: [
          { label: "Ma démarche", href: "#approach", type: "anchor" },
          { label: "Prototype Relay", href: "/fr/work/relay", type: "navigate" },
          { label: "Me contacter", href: "#contact", type: "anchor" }
        ],
        followUps: [
          "Comment travailles-tu ? (Démarche)",
          "Quelle est ta vision de Steve Jobs & Apple ?",
          "Quelles sont tes compétences clés ?"
        ],
        detectedLang: targetLang
      };
    }

    if (targetLang === "pt") {
      return {
        reply: `E aí! Sou o Breno, **Product Designer & Frontend Prototyper** baseado em Valência, Espanha, com 8 anos de estrada em operações multilíngues. Eu uno o rigor clássico de UX (inspirado em Apple HIG, Dieter Rams e Don Norman) com protótipos funcionais reais em React.\n\nPode me perguntar sobre **como eu trabalho**, meus **cases (como o Relay)**, minha **visão de Design Engineering** ou pedir para eu te **levar a qualquer seção**!`,
        actions: [
          { label: "Como eu trabalho", href: "#approach", type: "anchor" },
          { label: "Ver case Relay", href: "/work/relay", type: "navigate" },
          { label: "Bora conversar", href: "#contact", type: "anchor" }
        ],
        followUps: [
          "Como você trabalha? (Way of Working)",
          "O que pensa sobre Steve Jobs e Apple HIG?",
          "Quais são suas principais habilidades?"
        ],
        detectedLang: targetLang
      };
    }

    if (targetLang === "es") {
      return {
        reply: `¡Hola! Soy Breno, **Product Designer & Frontend Prototyper** afincado en Valencia, España, con 8 años de experiencia en primera línea de operaciones multilingües. Uno el rigor clásico de UX (Apple HIG, Dieter Rams y Don Norman) con prototipos funcionales reales en React.\n\n¡Pregúntame sobre **cómo trabajo**, mis **proyectos (como Relay)**, mi **visión de Design Engineering** o cómo **contactar conmigo**!`,
        actions: [
          { label: "Cómo trabajo", href: "#approach", type: "anchor" },
          { label: "Prototipo Relay", href: "/work/relay", type: "navigate" },
          { label: "Hablemos", href: "#contact", type: "anchor" }
        ],
        followUps: [
          "¿Cómo trabajas? (Metodología)",
          "¿Qué opinas sobre Steve Jobs y Apple HIG?",
          "¿Cuáles son tus habilidades clave?"
        ],
        detectedLang: targetLang
      };
    }

    return {
      reply: `Hey! I'm Breno, a **Product Designer & Frontend Prototyper** based in Valencia, Spain, with 8 years in frontline operations. I combine classic UX rigor (Apple HIG, Dieter Rams, Don Norman) with living React prototypes.\n\nAsk me about **how I work**, my **case studies (like Relay)**, my **take on Design Engineering**, or ask me to **jump to any section**!`,
      actions: [
        { label: "How I work", href: "#approach", type: "anchor" },
        { label: "Relay prototype", href: "/work/relay", type: "navigate" },
        { label: "Let's talk", href: "#contact", type: "anchor" }
      ],
      followUps: [
        "How do you work? (Way of Working)",
        "What is your take on Steve Jobs & Apple HIG?",
        "What are your core skills?"
      ],
      detectedLang: targetLang
    };
  }

  // Thoughtful synthesis for open-ended or nuanced design questions
  if (targetLang === "fr") {
    return {
      reply: `C'est une excellente question sur la conception de produit et l'ergonomie. Dans mon travail quotidien de **Product Designer & Frontend Prototyper**, mon rôle est de dissiper l'ambiguïté opérationnelle pour concevoir des décisions claires et vérifiées en code réel.\n\nJ'associe la rigueur du design classique (**Apple HIG, Dieter Rams et Don Norman**) à l'ingénierie frontend (en codant des prototypes en **React 19 / Next.js 16** pour éprouver l'accessibilité WCAG, la latence et les cas d'erreur avant toute mise en production).\n\nTu peux me poser des questions sur mes **principes de design**, explorer le **prototype Relay** ou découvrir **ma démarche de travail** !`,
      actions: [
        { label: "Principes de design", href: "#approach", type: "anchor" },
        { label: "Explorer le prototype Relay", href: "/fr/work/relay", type: "navigate" },
        { label: "Ma démarche", href: "#approach", type: "anchor" }
      ],
      followUps: [
        "Quels sont tes principes de design préférés ?",
        "Quelle est ta vision de Steve Jobs & Apple ?",
        "Pourquoi prototyper en React ?"
      ],
      detectedLang: targetLang
    };
  }

  if (targetLang === "pt") {
    return {
      reply: `Essa é uma provocação direta sobre como eu penso produto, design e engenharia. No meu trabalho diário como **Product Designer & Frontend Prototyper**, o meu foco é eliminar a névoa operacional: transformar problemas ambíguos em decisões claras, defensáveis e testadas em código real.\n\nEu uno o melhor da literatura clássica de UX (**Apple HIG, Dieter Rams e Don Norman**) com a realidade da engenharia frontend (prototipando em **React 19 / Next.js 16** para estressar acessibilidade WCAG, latência e cenários de falha antes de qualquer código ir para produção).\n\nPode me perguntar sobre os meus **princípios de design**, como desenvolvi o **case do Relay**, ou como aplico essa abordagem no dia a dia!`,
      actions: [
        { label: "Princípios de design", href: "#approach", type: "anchor" },
        { label: "Ver case Relay", href: "/work/relay", type: "navigate" },
        { label: "Como eu trabalho", href: "#approach", type: "anchor" }
      ],
      followUps: [
        "Quais princípios de design você mais gosta?",
        "O que pensa sobre Steve Jobs e Apple HIG?",
        "Por que você prototipa em React?"
      ],
      detectedLang: targetLang
    };
  }

  if (targetLang === "es") {
    return {
      reply: `Es una excelente pregunta sobre diseño de producto e ingeniería. En mi trabajo diario como **Product Designer & Frontend Prototyper**, mi objetivo es despejar la ambigüedad operativa y transformar procesos complejos en decisiones claras y probadas en código real.\n\nUno el rigor del diseño clásico (**Apple HIG, Dieter Rams y Don Norman**) con la disciplina del frontend (desarrollando prototipos funcionales en **React 19 / Next.js 16** para poner a prueba la accesibilidad WCAG y la gestión de errores).\n\n¡Pregúntame sobre mis **principios de diseño**, explora el **prototipo Relay** o conoce **mi metodología de trabajo**!`,
      actions: [
        { label: "Principios de diseño", href: "#approach", type: "anchor" },
        { label: "Ver prototipo Relay", href: "/work/relay", type: "navigate" },
        { label: "Cómo trabajo", href: "#approach", type: "anchor" }
      ],
      followUps: [
        "¿Cuáles son tus principios de diseño favoritos?",
        "¿Qué opinas sobre Steve Jobs y Apple HIG?",
        "¿Por qué prototipar en React?"
      ],
      detectedLang: targetLang
    };
  }

  return {
    reply: `That's a thoughtful question about product design and software craft. In my day-to-day work as a **Product Designer & Frontend Prototyper**, my goal is to cut through operational ambiguity—turning fragmented requirements into clear, defensible decisions proved in live code.\n\nI combine classic UX rigor (**Apple HIG, Dieter Rams, and Don Norman**) with frontend engineering discipline (building functional **React 19 / Next.js 16** prototypes to stress-test error recovery, latency, and WCAG accessibility before production).\n\nFeel free to explore my **design principles**, dive into the **Relay prototype**, or ask about my **Way of Working**!`,
    actions: [
      { label: "Design principles", href: "#approach", type: "anchor" },
      { label: "Relay prototype", href: "/work/relay", type: "navigate" },
      { label: "Way of Working", href: "#approach", type: "anchor" }
    ],
    followUps: [
      "What are your core design principles?",
      "What is your take on Steve Jobs & Apple HIG?",
      "Why build functional prototypes in React?"
    ],
    detectedLang: targetLang
  };
}

export function getCuratedAssistantResponse(query, lang = "en", history = []) {
  return getAssistantKnowledgeResult(query, lang, history).reply;
}
