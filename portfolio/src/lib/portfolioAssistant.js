import { detectQueryLanguage } from "./assistantKnowledge";

export { detectQueryLanguage };
export const SYSTEM_KNOWLEDGE = `You are an automated assistant for Breno Sampaio's portfolio, not Breno. Speak in the user's language and refer to Breno in the third person. Only state facts supported here. Breno is a product designer based in Valencia, Spain, with a background in multilingual operations and a frontend prototyping practice. The portfolio project selection is being prepared; no case studies are currently public. Languages: Portuguese native, French C1, Spanish B2, English B2, Italian B1. Contact: sampayobreno@gmail.com. Do not invent employment history, credentials, outcomes, client work, opinions or other personal details. If information is unavailable, say so and suggest direct contact.`;

const responses = {
  en: {
    languages: "Breno's languages are Portuguese (native), French (C1), Spanish (B2), English (B2) and Italian (B1).",
    contact: "You can contact Breno at **sampayobreno@gmail.com** or through the contact section.",
    practice: "Breno's practice focuses on Product Design, with frontend prototyping to explore interactions and states. His background includes multilingual operations.",
    fallback: "I’m an automated portfolio assistant. I can share the information available about Breno’s practice, languages and contact. For other questions, please contact Breno directly.",
    actionContact: "Contact Breno", prompts: ["What languages does Breno speak?", "How can I contact Breno?"]
  },
  fr: {
    languages: "Breno parle portugais (langue maternelle), français (C1), espagnol (B2), anglais (B2) et italien (B1).",
    contact: "Vous pouvez contacter Breno à **sampayobreno@gmail.com** ou via la section contact.",
    practice: "La pratique de Breno est centrée sur le design produit et le prototypage frontend pour explorer les interactions et les états. Son parcours comprend des opérations multilingues.",
    fallback: "Je suis l’assistant automatisé du portfolio. Je peux partager les informations disponibles sur la pratique de Breno, ses langues et ses coordonnées. Pour toute autre question, contactez Breno directement.",
    actionContact: "Contacter Breno", prompts: ["Quelles langues parle Breno ?", "Comment contacter Breno ?"]
  },
  pt: {
    languages: "Breno fala português nativo, francês C1, espanhol B2, inglês B2 e italiano B1.",
    contact: "Você pode falar com Breno pelo e-mail **sampayobreno@gmail.com** ou pela seção de contato.",
    practice: "A prática de Breno tem foco em Product Design e usa prototipagem frontend para explorar interações e estados. Sua trajetória inclui operações multilíngues.",
    fallback: "Sou o assistente automático do portfólio. Posso compartilhar as informações disponíveis sobre a prática de Breno, idiomas e contato. Para outras perguntas, entre em contato diretamente com ele.",
    actionContact: "Falar com Breno", prompts: ["Quais idiomas Breno fala?", "Como falar com Breno?"]
  },
  es: {
    languages: "Breno habla portugués nativo, francés C1, español B2, inglés B2 e italiano B1.",
    contact: "Puedes contactar con Breno en **sampayobreno@gmail.com** o mediante la sección de contacto.",
    practice: "La práctica de Breno se centra en Product Design y en el prototipado frontend para explorar interacciones y estados. Su trayectoria incluye operaciones multilingües.",
    fallback: "Soy el asistente automático del portafolio. Puedo compartir la información disponible sobre la práctica de Breno, idiomas y contacto. Para otras preguntas, contacta con Breno directamente.",
    actionContact: "Contactar con Breno", prompts: ["¿Qué idiomas habla Breno?", "¿Cómo contactar con Breno?"]
  }
};

export function getAssistantKnowledgeResult(query, lang = "en", history = []) {
  const detected = detectQueryLanguage(query || "", lang, history);
  const language = Object.hasOwn(responses, detected) ? detected : "en";
  const text = (query || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const topic = /language|langue|idioma|lingua|speak|parle|habla/.test(text) ? "languages" : /contact|contato|contacter|email|e-mail|correo/.test(text) ? "contact" : /practice|approach|work|trabalh|demarche|pratique|metod|habilidad|skill|competenc/.test(text) ? "practice" : "fallback";
  const c = responses[language];
  return { reply: c[topic], actions: [{ label: c.actionContact, href: "#contact", type: "anchor" }], followUps: c.prompts, detectedLang: language };
}
