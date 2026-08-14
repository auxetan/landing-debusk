"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";

const EMAILJS_PUBLIC_KEY = "mEs-8Cr-fd6idbZLs";
const EMAILJS_SERVICE_ID = "service_7znwy0i";
const EMAILJS_TEMPLATE_ID = "template_qp34ygq";
const CONTACT_TYPES = ["Suggestion", "Bug", "Fonctionnalité", "Autre"] as const;

let lastContactSend = 0;

type ContactDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ContactDialog({ isOpen, onClose }: ContactDialogProps) {
  const cardRef = useRef<HTMLElement>(null);
  const firstFieldRef = useRef<HTMLSelectElement>(null);
  const successButtonRef = useRef<HTMLButtonElement>(null);
  const [contactType, setContactType] =
    useState<(typeof CONTACT_TYPES)[number]>("Suggestion");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const focusTimer = window.setTimeout(
      () => firstFieldRef.current?.focus({ preventScroll: true }),
      180,
    );

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = cardRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input:not(:disabled):not([tabindex="-1"]), select:not(:disabled), textarea:not(:disabled)',
      );

      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && sent) successButtonRef.current?.focus({ preventScroll: true });
  }, [isOpen, sent]);

  if (!isOpen) return null;

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanMessage = message.trim();
    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (website.trim()) {
      setSent(true);
      return;
    }

    if (!cleanMessage) {
      setError("Écrivez un message avant de l’envoyer.");
      return;
    }

    if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("L’adresse e-mail semble invalide.");
      return;
    }

    if (Date.now() - lastContactSend < 30_000) {
      setError("Patientez 30 secondes avant d’envoyer un nouveau message.");
      return;
    }

    setSending(true);
    setError(null);

    try {
      const senderName = cleanName || cleanEmail || "Visiteur Débusk";
      const subject = `[Site Débusk] ${contactType}`;
      const sentAt = new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "Europe/Paris",
      }).format(new Date());

      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            // Contrat du template personnalisé du site.
            subject: subject,
            title: subject,
            category: contactType,
            contact_type: contactType,
            name: senderName,
            from_name: senderName,
            email: cleanEmail,
            reply_to: cleanEmail,
            message: cleanMessage,
            time: sentAt,
            app_name: "Débusk",
            source: "Site Débusk",
          },
        }),
      });

      if (!response.ok) {
        const providerMessage = (await response.text()).trim().slice(0, 300);
        throw new Error(providerMessage || `EmailJS request failed (${response.status})`);
      }

      lastContactSend = Date.now();
      setName("");
      setEmail("");
      setMessage("");
      setSent(true);
    } catch (sendError) {
      console.error("[Débusk contact]", sendError);
      setError("L’envoi a échoué. Réessayez dans un instant.");
    } finally {
      setSending(false);
    }
  };

  const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className="contact-dialog"
      data-cursor-theme="dark"
      onMouseDown={closeFromBackdrop}
    >
      <section
        className="contact-card"
        id="contact"
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        aria-describedby={sent ? undefined : "contact-description"}
        data-cursor-theme="light"
      >
        <div className="contact-dialog-header">
          <div>
            <p className="contact-eyebrow">Un mot, une idée, un bug.</p>
            <h2 id="contact-title">Nous contacter</h2>
          </div>
          <button
            className="contact-close"
            type="button"
            onClick={onClose}
            aria-label="Fermer le formulaire de contact"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        {sent ? (
          <div className="contact-success" role="status" aria-live="polite">
            <span className="contact-success-mark" aria-hidden="true">✓</span>
            <h3>Message envoyé.</h3>
            <p>Merci — il est bien arrivé à l’équipe Débusk.</p>
            <button ref={successButtonRef} type="button" onClick={onClose}>
              Fermer
            </button>
          </div>
        ) : (
          <>
            <p className="contact-description" id="contact-description">
              Votre message arrive directement au même endroit que depuis
              l’application.
            </p>

            <form className="contact-form" onSubmit={submitContact}>
              <div className="contact-form-row">
                <label className="contact-field" htmlFor="contact-type">
                  <span>Votre message concerne</span>
                  <select
                    id="contact-type"
                    ref={firstFieldRef}
                    value={contactType}
                    onChange={(event) =>
                      setContactType(
                        event.target.value as (typeof CONTACT_TYPES)[number],
                      )
                    }
                  >
                    {CONTACT_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </label>

                <label className="contact-field" htmlFor="contact-name">
                  <span>Nom <small>optionnel</small></span>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    maxLength={80}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Votre nom"
                  />
                </label>
              </div>

              <div className="contact-form-row contact-form-row-email">
                <label className="contact-field" htmlFor="contact-email">
                  <span>E-mail <small>optionnel</small></span>
                  <input
                    id="contact-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    maxLength={254}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="vous@exemple.fr"
                  />
                </label>
              </div>

              <label className="contact-field" htmlFor="contact-message">
                <span>Message</span>
                <textarea
                  id="contact-message"
                  rows={6}
                  maxLength={4000}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Dites-nous tout…"
                />
              </label>

              <label className="contact-honeypot" aria-hidden="true">
                Site web
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </label>

              {error && <p className="contact-error" role="alert">{error}</p>}

              <button
                className="contact-submit"
                type="submit"
                disabled={sending}
                aria-busy={sending}
              >
                <span>{sending ? "Envoi…" : "Envoyer le message"}</span>
                <span aria-hidden="true">↗</span>
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
