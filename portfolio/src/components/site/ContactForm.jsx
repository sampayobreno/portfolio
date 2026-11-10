"use client";

import { useId, useRef, useState } from "react";
import { Icon } from "@/components/site/Icon";

const COPY = {
  en: {
    formLabel: "Contact form",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@company.com",
    reason: "Reason",
    reasonPlaceholder: "Choose a reason",
    reasons: [
      ["product-design", "Product design"],
      ["product-design-role", "Product Design role"],
      ["collaboration", "Collaboration"],
      ["other", "Something else"],
    ],
    message: "Message",
    messagePlaceholder: "Share the context, what you need and any useful deadline.",
    messageHint: "20–3,000 characters. Please do not include sensitive information.",
    privacy: "You can also contact me directly by email.",
    submit: "Send message",
    sending: "Sending…",
    success: "Message sent. I’ll reply as soon as I can.",
    error: "The message could not be sent. Try again or email me directly.",
  },
  fr: {
    formLabel: "Formulaire de contact",
    name: "Nom",
    namePlaceholder: "Votre nom",
    email: "E-mail",
    emailPlaceholder: "vous@entreprise.com",
    reason: "Motif",
    reasonPlaceholder: "Choisir un motif",
    reasons: [
      ["product-design", "Design produit"],
      ["product-design-role", "Poste en design produit"],
      ["collaboration", "Collaboration"],
      ["other", "Autre sujet"],
    ],
    message: "Message",
    messagePlaceholder: "Partagez le contexte, votre besoin et toute échéance utile.",
    messageHint: "20 à 3 000 caractères. Merci de ne pas inclure d’informations sensibles.",
    privacy: "Vous pouvez aussi me contacter directement par e-mail.",
    submit: "Envoyer le message",
    sending: "Envoi…",
    success: "Message envoyé. Je vous répondrai dès que possible.",
    error: "Le message n’a pas pu être envoyé. Réessayez ou écrivez-moi directement.",
  },
};

export function ContactForm({ lang = "en" }) {
  const copy = lang === "fr" ? COPY.fr : COPY.en;
  const uid = useId();
  const statusRef = useRef(null);
  const [state, setState] = useState("idle");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      reason: String(data.get("reason") || ""),
      message: String(data.get("message") || "").trim(),
      website: String(data.get("website") || ""),
    };

    setState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("contact-delivery-failed");

      form.reset();
      setState("success");
    } catch {
      setState("error");
    }

    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const busy = state === "submitting";
  const statusMessage = state === "success" ? copy.success : state === "error" ? copy.error : "";

  return (
    <form className="contact-form" aria-label={copy.formLabel} onSubmit={handleSubmit}>
      <div className="contact-form__grid">
        <div className="contact-field">
          <label htmlFor={`${uid}-name`}>{copy.name}</label>
          <input id={`${uid}-name`} name="name" type="text" autoComplete="name" placeholder={copy.namePlaceholder} minLength={2} maxLength={80} required disabled={busy} />
        </div>

        <div className="contact-field">
          <label htmlFor={`${uid}-email`}>{copy.email}</label>
          <input id={`${uid}-email`} name="email" type="email" inputMode="email" autoComplete="email" placeholder={copy.emailPlaceholder} maxLength={254} required disabled={busy} />
        </div>

        <div className="contact-field contact-field--full">
          <label htmlFor={`${uid}-reason`}>{copy.reason}</label>
          <div className="contact-select">
            <select id={`${uid}-reason`} name="reason" defaultValue="" required disabled={busy}>
              <option value="" disabled>{copy.reasonPlaceholder}</option>
              {copy.reasons.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <span aria-hidden="true">↓</span>
          </div>
        </div>

        <div className="contact-field contact-field--full">
          <label htmlFor={`${uid}-message`}>{copy.message}</label>
          <textarea id={`${uid}-message`} name="message" rows={6} placeholder={copy.messagePlaceholder} aria-describedby={`${uid}-message-hint`} minLength={20} maxLength={3000} required disabled={busy} />
          <span className="contact-field__hint" id={`${uid}-message-hint`}>{copy.messageHint}</span>
        </div>
      </div>

      <div className="contact-form__trap" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form__footer">
        <button className="contact-form__submit" type="submit" disabled={busy}>
          <span>{busy ? copy.sending : copy.submit}</span>
          <Icon name="send" size={18} />
        </button>
        <p className="contact-form__privacy">{copy.privacy}</p>
      </div>

      {statusMessage ? (
        <p ref={statusRef} className={`contact-form__status contact-form__status--${state}`} role={state === "error" ? "alert" : "status"} tabIndex={-1}>
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
