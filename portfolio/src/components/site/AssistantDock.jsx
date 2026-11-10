"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLang, useTheme } from "@/context/AppContext";
import { getT } from "@/lib/i18n";
import { getAssistantKnowledgeResult, detectQueryLanguage } from "@/lib/portfolioAssistant";
import styles from "./AssistantDock.module.css";

function SparkleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2L13.8 8.2C14.3 9.8 15.6 11.1 17.2 11.6L23 13.5L17.2 15.4C15.6 15.9 14.3 17.2 13.8 18.8L12 25L10.2 18.8C9.7 17.2 8.4 15.9 6.8 15.4L1 13.5L6.8 11.6C8.4 11.1 9.7 9.8 10.2 8.2L12 2Z"
        fill="currentColor"
        transform="scale(0.85) translate(2, 0)"
      />
      <circle cx="18" cy="6" r="1.5" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 13V3M8 3L3.5 7.5M8 3L12.5 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 8a5.5 5.5 0 1 1 1.6 3.9L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 9.5V14h4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ActionIcon({ type }) {
  if (type === "download") {
    return (
      <svg className={styles.actionIcon} viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 2v8M7 10L4 7M7 10l3-3M2 12h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className={styles.actionIcon} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function renderFormattedMessage(text) {
  if (!text) return null;
  const lines = text.split("\n");
  return lines.map((line, idx) => {
    if (!line.trim()) {
      return <div key={idx} style={{ height: "6px" }} />;
    }

    const parts = [];
    const regex = /(\*\*[^*]+\*\*)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith("**") && token.endsWith("**")) {
        parts.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    return <p key={idx}>{parts}</p>;
  });
}

const LOCALIZED_ASSISTANT_STRINGS = {
  en: {
    modalTitle: "Breno Sampaio",
    modalSubtitle: "Direct from my verified experience, case studies and systems prototyping.",
    dockBadge: "Direct",
    dockAria: "Chat directly with Breno",
    dockPlaceholder: "Ask me anything...",
    dockMobilePlaceholder: "Ask me anything",
    inputPlaceholder: "Ask me anything... (e.g. 'How do you work?')",
    inputPlaceholderMobile: "Ask me anything...",
    newQuestion: "New question",
    suggestedFollowUps: "Continue exploring",
    suggestedHeading: "Topics to explore",
    thinking: "Thinking...",
    emptyState: "Hey! Ask me anything about my design philosophy, React 19 prototypes, 8 years in frontline operations, or let's talk directly.",
    suggestions: [
      "How do you work? (Way of Working)",
      "What languages does Breno speak?",
      "What are your core skills?",
      "How can I contact Breno?"
    ]
  },
  pt: {
    modalTitle: "Breno Sampaio",
    modalSubtitle: "Direto da minha experiência real, estudos de caso e prototipagem de sistemas.",
    dockBadge: "Direto",
    dockAria: "Conversar direto com o Breno",
    dockPlaceholder: "Pergunte algo...",
    dockMobilePlaceholder: "Pergunte algo",
    inputPlaceholder: "Me pergunte qualquer coisa... (ex.: 'Como você trabalha?')",
    inputPlaceholderMobile: "Me pergunte qualquer coisa...",
    newQuestion: "Nova pergunta",
    suggestedFollowUps: "Continuar explorando",
    suggestedHeading: "Temas para explorar",
    thinking: "Pensando...",
    emptyState: "E aí! Me pergunte sobre minha metodologia de trabalho, meus protótipos em React 19, meus 8 anos em operações, ou bora trocar uma ideia.",
    suggestions: [
      "Como você trabalha? (Way of Working)",
      "Quais idiomas Breno fala?",
      "Quais são suas principais habilidades?",
      "Como entrar em contato com Breno?"
    ]
  },
  fr: {
    modalTitle: "Breno Sampaio",
    modalSubtitle: "En direct de mon expérience vérifiée, mes études de cas et prototypes.",
    dockBadge: "Direct",
    dockAria: "Échanger directement avec Breno",
    dockPlaceholder: "Posez-moi une question...",
    dockMobilePlaceholder: "Poser une question",
    inputPlaceholder: "Pose-moi une question... (ex. « Comment travailles-tu ? »)",
    inputPlaceholderMobile: "Pose-moi une question...",
    newQuestion: "Nouvelle question",
    suggestedFollowUps: "Poursuivre l'exploration",
    suggestedHeading: "Sujets à explorer",
    thinking: "Réflexion...",
    emptyState: "Salut ! Pose-moi des questions sur ma méthode de design, mes prototypes React, mes 8 ans en opérations, ou échangeons directement.",
    suggestions: [
      "Comment travailles-tu ? (Démarche)",
      "Quelles langues parle Breno ?",
      "Quelles sont tes compétences clés ?",
      "Comment te contacter directement ?"
    ]
  },
  es: {
    modalTitle: "Breno Sampaio",
    modalSubtitle: "Directo de mi experiencia real, casos de estudio y prototipos funcionales.",
    dockBadge: "Directo",
    dockAria: "Hablar directamente con Breno",
    dockPlaceholder: "Pregúntame algo...",
    dockMobilePlaceholder: "Pregúntame algo",
    inputPlaceholder: "Pregúntame lo que quieras... (ej. '¿Cómo trabajas?')",
    inputPlaceholderMobile: "Pregúntame cualquier cosa...",
    newQuestion: "Nueva pregunta",
    suggestedFollowUps: "Continuar explorando",
    suggestedHeading: "Temas para explorar",
    thinking: "Pensando...",
    emptyState: "¡Hola! Pregúntame sobre mi método de diseño, prototipos en React 19, mis 8 años en operaciones, o hablemos directamente.",
    suggestions: [
      "¿Cómo trabajas? (Metodología)",
      "¿Qué idiomas habla Breno?",
      "¿Cuáles son tus habilidades clave?",
      "¿Cómo puedo contactar contigo?"
    ]
  }
};

export function AssistantDock() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const { lang } = useLang();
  const { theme } = useTheme();
  const t = getT(lang);
  const strings = t.assistant || {};

  const [conversationLang, setConversationLang] = useState(lang);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (lang === "fr") {
      setConversationLang("fr");
      return;
    }
    if (typeof window !== "undefined" && window.navigator) {
      const navLang = window.navigator.language?.toLowerCase() || "";
      if (navLang.startsWith("pt")) {
        setConversationLang("pt");
        return;
      }
      if (navLang.startsWith("es")) {
        setConversationLang("es");
        return;
      }
    }
    setConversationLang(lang);
  }, [lang]);

  const currentStrings = {
    ...strings,
    ...(LOCALIZED_ASSISTANT_STRINGS[conversationLang] || LOCALIZED_ASSISTANT_STRINGS[lang] || {}),
    ...({
      en: { modalTitle: "Portfolio assistant", dockBadge: "Automated", emptyState: "Explore Breno’s portfolio, approach and prototypes with this automated assistant.", sourcesNote: "Automated responses may be incomplete. For direct contact, use the contact section." },
      fr: { modalTitle: "Assistant du portfolio", dockBadge: "Automatisé", emptyState: "Explorez le portfolio, la démarche et les prototypes de Breno avec cet assistant automatisé.", sourcesNote: "Les réponses automatisées peuvent être incomplètes. Pour un contact direct, utilisez la section contact." },
      pt: { modalTitle: "Assistente do portfólio", dockBadge: "Automatizado", emptyState: "Explore o portfólio, a abordagem e os protótipos de Breno com este assistente automatizado.", sourcesNote: "As respostas automáticas podem estar incompletas. Para contato direto, use a seção de contato." },
      es: { modalTitle: "Asistente del portafolio", dockBadge: "Automatizado", emptyState: "Explora el portafolio, el enfoque y los prototipos de Breno con este asistente automatizado.", sourcesNote: "Las respuestas automáticas pueden estar incompletas. Para contacto directo, usa la sección de contacto." },
    }[conversationLang] || {})
  };

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  const returnFocusRef = useRef(null);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const streamIntervalRef = useRef(null);
  const userScrolledUpRef = useRef(false);

  useEffect(() => {
    const openFromDock = () => {
      returnFocusRef.current = document.activeElement;
      setIsOpen(true);
    };
    window.addEventListener("portfolio:assistant-open", openFromDock);
    return () => window.removeEventListener("portfolio:assistant-open", openFromDock);
  }, []);

  // Keyboard shortcut ⌘K / Ctrl+K and Escape
  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!isOpen) returnFocusRef.current = document.activeElement;
        setIsOpen((prev) => !prev);
      } else if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input and lock document scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.stop();
      }
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      return () => {
        if (typeof window !== "undefined" && window.__lenis) {
          window.__lenis.start();
        }
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        clearTimeout(timer);
        if (returnFocusRef.current?.isConnected) returnFocusRef.current.focus();
      };
    }
  }, [isOpen]);

  // Clean up streaming interval on unmount
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, []);

  // Track user manual scrolling inside dialog body
  const handleBodyScroll = useCallback(() => {
    if (!bodyRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = bodyRef.current;
    // Scrolled up if user is more than 36px from bottom
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    userScrolledUpRef.current = distanceFromBottom > 36;
  }, []);

  // Smoothly reveal thinking state if user is at bottom
  useEffect(() => {
    if (isThinking && bodyRef.current && !userScrolledUpRef.current) {
      bodyRef.current.scrollTo({
        top: bodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isThinking]);

  // Navigation action handler
  const handleActionClick = useCallback((action) => {
    if (!action || !action.href) return;

    if (action.type === "anchor") {
      const isHome = pathname === "/" || pathname === "/fr";
      if (isHome) {
        const targetId = action.href.startsWith("#") ? action.href.slice(1) : action.href;
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        const homePrefix = lang === "fr" ? "/fr" : "";
        router.push(`${homePrefix}/${action.href}`);
      }
      setIsOpen(false);
      return;
    }

    if (action.type === "navigate") {
      router.push(action.href);
      setIsOpen(false);
      return;
    }

    if (action.type === "download") {
      const link = document.createElement("a");
      link.href = action.href;
      link.download = action.href.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    if (action.type === "external") {
      if (action.href.startsWith("mailto:")) {
        window.location.href = action.href;
      } else {
        window.open(action.href, "_blank", "noopener,noreferrer");
      }
    }
  }, [pathname, lang, router, setIsOpen]);

  // Complete any active streaming immediately (e.g. on click or submit)
  const finishActiveStream = useCallback(() => {
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
    setMessages((prev) =>
      prev.map((m) =>
        m.isStreaming
          ? {
              ...m,
              text: m.fullText || m.text,
              isStreaming: false,
            }
          : m
      )
    );
  }, []);

  const handleSubmit = useCallback(async (promptText) => {
    const textToSend = (promptText || query).trim();
    if (!textToSend || isThinking) return;

    // Finish any ongoing stream before starting new request
    finishActiveStream();

    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setIsThinking(true);
    userScrolledUpRef.current = false;

    // Smoothly scroll down so user sees their new question
    setTimeout(() => {
      if (bodyRef.current) {
        bodyRef.current.scrollTo({
          top: bodyRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 40);

    // Extract recent conversational history for context continuity
    const recentHistory = messages.slice(-6).map((m) => ({
      sender: m.sender,
      text: m.fullText || m.text,
    }));

    const activeLang = conversationLang || lang;
    const detected = detectQueryLanguage(textToSend, activeLang, recentHistory);
    const effectiveLang = ["pt", "es", "fr", "en"].includes(detected) ? detected : activeLang;
    if (effectiveLang !== conversationLang) {
      setConversationLang(effectiveLang);
    }

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, lang: effectiveLang, history: recentHistory }),
      });

      if (!res.ok) throw new Error("API request failed");
      const data = await res.json();
      const serverLang =
        data.detectedLang && ["pt", "es", "fr", "en"].includes(data.detectedLang)
          ? data.detectedLang
          : effectiveLang;
      if (serverLang !== conversationLang) {
        setConversationLang(serverLang);
      }

      const localResult = getAssistantKnowledgeResult(textToSend, serverLang, recentHistory);
      const replyText = data.reply || localResult.reply;
      const actions = data.actions && data.actions.length > 0 ? data.actions : localResult.actions;
      const followUps = data.followUps && data.followUps.length > 0 ? data.followUps : localResult.followUps;

      setIsThinking(false);

      // Add assistant message with streaming enabled
      const assistantMsgId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMsgId,
          sender: "assistant",
          text: "",
          fullText: replyText,
          actions: actions || [],
          followUps: followUps || [],
          isStreaming: true,
        },
      ]);

      // Typewriter streaming loop (GPT/Claude-like)
      let charIdx = 0;
      const fullLen = replyText.length;
      const step = fullLen > 400 ? 5 : fullLen > 200 ? 3 : 2;

      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);

      streamIntervalRef.current = setInterval(() => {
        charIdx = Math.min(fullLen, charIdx + step);
        const currentSlice = replyText.slice(0, charIdx);
        const isDone = charIdx >= fullLen;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  text: currentSlice,
                  isStreaming: !isDone,
                }
              : m
          )
        );

        // Only auto-scroll down if user hasn't manually scrolled up to read
        if (bodyRef.current && !userScrolledUpRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = bodyRef.current;
          if (scrollHeight - scrollTop - clientHeight < 140) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
          }
        }

        if (isDone) {
          clearInterval(streamIntervalRef.current);
          streamIntervalRef.current = null;
        }
      }, 18);
    } catch {
      // Local fallback guarantee with action navigation and history awareness
      const fallbackResult = getAssistantKnowledgeResult(textToSend, effectiveLang, recentHistory);
      const replyText = fallbackResult.reply;
      setIsThinking(false);

      const assistantMsgId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMsgId,
          sender: "assistant",
          text: "",
          fullText: replyText,
          actions: fallbackResult.actions || [],
          followUps: fallbackResult.followUps || [],
          isStreaming: true,
        },
      ]);

      let charIdx = 0;
      const fullLen = replyText.length;
      const step = fullLen > 400 ? 5 : fullLen > 200 ? 3 : 2;

      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);

      streamIntervalRef.current = setInterval(() => {
        charIdx = Math.min(fullLen, charIdx + step);
        const currentSlice = replyText.slice(0, charIdx);
        const isDone = charIdx >= fullLen;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  text: currentSlice,
                  isStreaming: !isDone,
                }
              : m
          )
        );

        // Only auto-scroll down if user hasn't manually scrolled up to read
        if (bodyRef.current && !userScrolledUpRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = bodyRef.current;
          if (scrollHeight - scrollTop - clientHeight < 140) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
          }
        }

        if (isDone) {
          clearInterval(streamIntervalRef.current);
          streamIntervalRef.current = null;
        }
      }, 18);
    }
  }, [query, isThinking, lang, conversationLang, finishActiveStream, messages]);

  const handleChipClick = (suggestion) => {
    handleSubmit(suggestion);
  };

  const handleClear = () => {
    finishActiveStream();
    setMessages([]);
    setConversationLang(lang);
  };

  // Determine if dark mode is active (via theme context or surface detection)
  const isDark = theme === "dark";

  return (
    <>
      {/* Centered Spotlight Modal when open */}
      {isOpen && (
        <>
          <div
            className={styles.chatBackdrop}
            onClick={() => setIsOpen(false)}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
            data-lenis-prevent="true"
            aria-hidden="true"
          />

          <div
            className={styles.modalWrapper}
            data-lenis-prevent="true"
          >
            <div
              className={`${styles.chatPanel} ${isDark ? styles.chatPanelDark : ""}`}
              role="dialog"
              aria-modal="true"
              aria-label={currentStrings.modalTitle}
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {/* Mobile Sheet Grab Handle */}
              <div
                className={styles.sheetHandleBar}
                onClick={() => setIsOpen(false)}
                aria-label={currentStrings.closeAria}
              >
                <div className={styles.sheetHandle} />
              </div>

              {/* Header */}
              <div className={styles.panelHeader}>
                <div className={styles.headerTitleGroup}>
                  <div className={styles.iconWrapper}>
                    <SparkleIcon className={styles.sparkleIcon} />
                  </div>
                  <h3 className={styles.headerTitle}>{currentStrings.modalTitle}</h3>
                  <span className={styles.headerBadge}>{currentStrings.dockBadge}</span>
                </div>

                <div className={styles.headerActions}>
                  {messages.length > 0 && (
                    <button
                      type="button"
                      className={styles.newQuestionButton}
                      onClick={handleClear}
                      aria-label={currentStrings.newQuestion || "New question"}
                    >
                      <ResetIcon />
                      <span>{currentStrings.newQuestion || "New question"}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    className={styles.closeButton}
                    onClick={() => setIsOpen(false)}
                    aria-label={currentStrings.closeAria}
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              {/* Conversation Body */}
              <div
                className={styles.panelBody}
                ref={bodyRef}
                onScroll={handleBodyScroll}
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                {messages.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyStateIcon}>
                      <SparkleIcon className={styles.sparkleIcon} />
                    </div>
                    <p className={styles.emptyStateText}>{currentStrings.emptyState}</p>

                    <div className={styles.suggestionsGroup}>
                      <div className={styles.suggestionsTitle}>{currentStrings.suggestedHeading}</div>
                      <div className={styles.chipsContainer}>
                        {(currentStrings.suggestions || []).map((sugg, i) => (
                          <button
                            key={i}
                            type="button"
                            className={styles.chipButton}
                            onClick={() => handleChipClick(sugg)}
                          >
                            <span>{sugg}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`${styles.messageRow} ${
                        msg.sender === "user" ? styles.messageRowUser : styles.messageRowAssistant
                      }`}
                    >
                      <div
                        className={`${styles.bubble} ${
                          msg.sender === "user" ? styles.userBubble : styles.assistantBubble
                        }`}
                        onClick={msg.isStreaming ? finishActiveStream : undefined}
                      >
                        {msg.sender === "user" ? (
                          <p>{msg.text}</p>
                        ) : (
                          <>
                            {renderFormattedMessage(msg.text)}
                            {msg.isStreaming && (
                              <span className={styles.cursorCaret} aria-hidden="true" />
                            )}
                          </>
                        )}

                        {/* Interactive Navigation Action Pills (Revealed when typing is done) */}
                        {!msg.isStreaming && msg.actions && msg.actions.length > 0 && (
                          <div className={styles.actionsRow}>
                            {msg.actions.map((act, actIdx) => (
                              <button
                                key={actIdx}
                                type="button"
                                className={styles.actionPill}
                                onClick={() => handleActionClick(act)}
                              >
                                <span>{act.label}</span>
                                <ActionIcon type={act.type} />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Suggested Follow-up Questions (Revealed when typing is done) */}
                      {!msg.isStreaming && msg.followUps && msg.followUps.length > 0 && (
                        <div className={styles.followUpsContainer}>
                          <div className={styles.followUpsHeader}>
                            <SparkleIcon className={styles.miniSparkle} />
                            <span>{currentStrings.suggestedFollowUps || "Continue exploring"}</span>
                          </div>
                          <div className={styles.followUpsRow}>
                            {msg.followUps.map((prompt, pIdx) => (
                              <button
                                key={pIdx}
                                type="button"
                                className={styles.followUpChip}
                                onClick={() => handleChipClick(prompt)}
                              >
                                <span className={styles.followUpArrow}>↳</span>
                                <span>{prompt}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}

                {isThinking && (
                  <div className={`${styles.messageRow} ${styles.messageRowAssistant}`}>
                    <div className={styles.typingIndicator} aria-label={currentStrings.thinking}>
                      <span className={styles.typingDot} />
                      <span className={styles.typingDot} />
                      <span className={styles.typingDot} />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Input */}
              <div className={styles.panelFooter}>
                <form
                  className={styles.inputForm}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    className={styles.textInput}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={
                      isMobile
                        ? (currentStrings.inputPlaceholderMobile || currentStrings.inputPlaceholder)
                        : currentStrings.inputPlaceholder
                    }
                    aria-label={
                      isMobile
                        ? (currentStrings.inputPlaceholderMobile || currentStrings.inputPlaceholder)
                        : currentStrings.inputPlaceholder
                    }
                  />
                  <button
                    type="submit"
                    className={styles.sendButton}
                    disabled={!query.trim() || isThinking}
                    aria-label={currentStrings.sendAria}
                  >
                    <ArrowUpIcon />
                  </button>
                </form>
                <div className={styles.sourcesDisclaimer}>
                  {currentStrings.sourcesNote || strings.sourcesNote}
                </div>
              </div>
            </div>
          </div>
        </>
      )}


    </>
  );
}
