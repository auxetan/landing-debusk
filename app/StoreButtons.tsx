"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import Link from "next/link";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import { createPortal } from "react-dom";
import { CONTACT_EMAIL } from "./contact";

const EMAILJS_PUBLIC_KEY = "mEs-8Cr-fd6idbZLs";
const EMAILJS_SERVICE_ID = "service_7znwy0i";
const EMAILJS_TEMPLATE_ID = "template_qp34ygq";
const APP_STORE_URL =
  "https://apps.apple.com/us/app/d%C3%A9busk-bus-%C3%A0-aix-en-provence/id6803274728";
const WEB_APP_URL = "https://app.debusk.fr";

export const storeLinks = [
  {
    id: "app_store",
    eyebrow: "Télécharger dans",
    label: "l’App Store",
    dialogLabel: "App Store",
    Icon: FaApple,
    href: APP_STORE_URL,
  },
  {
    id: "google_play",
    eyebrow: "Bientôt sur",
    label: "Google Play",
    dialogLabel: "Google Play",
    Icon: FaGooglePlay,
  },
] as const;

type StoreId = (typeof storeLinks)[number]["id"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let lastWaitlistSend = 0;

export function StoreButtons({ compact = false }: { compact?: boolean }) {
  const dialogRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const successButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [activeStoreId, setActiveStoreId] = useState<StoreId | null>(null);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeStore = storeLinks.find((store) => store.id === activeStoreId);

  const closeDialog = useCallback(() => {
    setActiveStoreId(null);
    window.setTimeout(
      () => triggerRef.current?.focus({ preventScroll: true }),
      0,
    );
  }, []);

  const openDialog = (
    storeId: StoreId,
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    triggerRef.current = event.currentTarget;
    setEmail("");
    setWebsite("");
    setSending(false);
    setSent(false);
    setError(null);
    setActiveStoreId(storeId);
  };

  useEffect(() => {
    if (!activeStoreId) return;

    const previousOverflow = document.body.style.overflow;
    const focusTimer = window.setTimeout(
      () => emailRef.current?.focus({ preventScroll: true }),
      180,
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input:not(:disabled):not([tabindex="-1"]), a[href]',
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
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeStoreId, closeDialog]);

  useEffect(() => {
    if (activeStoreId && sent) {
      successButtonRef.current?.focus({ preventScroll: true });
    }
  }, [activeStoreId, sent]);

  const submitWaitlist = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!activeStore) return;

    const cleanEmail = email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(cleanEmail) || cleanEmail.length > 254) {
      setError("Entrez une adresse e-mail valide.");
      emailRef.current?.focus();
      return;
    }

    if (website.trim()) {
      setSent(true);
      return;
    }

    if (Date.now() - lastWaitlistSend < 30_000) {
      setError("Patientez 30 secondes avant une nouvelle inscription.");
      return;
    }

    setSending(true);
    setError(null);

    try {
      const subject = "[Site Débusk] Watchlist";
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
            subject,
            title: subject,
            category: "Watchlist",
            contact_type: "Watchlist",
            flag: "watchlist",
            name: cleanEmail,
            from_name: cleanEmail,
            email: cleanEmail,
            reply_to: cleanEmail,
            to_email: CONTACT_EMAIL,
            message: `Inscription à la watchlist — ${activeStore.dialogLabel}`,
            store: activeStore.id,
            store_name: activeStore.dialogLabel,
            time: sentAt,
            app_name: "Débusk",
            source: "Site Débusk — watchlist",
          },
        }),
      });

      if (!response.ok) {
        const providerMessage = (await response.text()).trim().slice(0, 300);
        throw new Error(
          providerMessage || `EmailJS request failed (${response.status})`,
        );
      }

      lastWaitlistSend = Date.now();
      setSent(true);
    } catch (sendError) {
      console.error("[Débusk watchlist]", sendError);
      setError("Impossible de vous inscrire pour le moment. Réessayez.");
    } finally {
      setSending(false);
    }
  };

  const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeDialog();
  };

  return (
    <>
      <div className={`store-options ${compact ? "store-options-compact" : ""}`}>
        <div
          className={`store-actions ${compact ? "store-actions-compact" : ""}`}
          aria-label="Disponibilité de l’application Débusk"
        >
          {storeLinks.map((store, index) => {
            const Icon = store.Icon;
            const content = (
              <>
                <span className="store-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="store-copy">
                  <span className="store-eyebrow">{store.eyebrow}</span>
                  <span className="store-name">{store.label}</span>
                </span>
                <span className="store-arrow" aria-hidden="true">
                  →
                </span>
              </>
            );

            if ("href" in store) {
              return (
                <a
                  className={`store-button ${index === 0 ? "store-button-primary" : ""}`}
                  href={store.href}
                  key={store.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Télécharger Débusk dans ${store.label} (nouvel onglet)`}
                  data-cursor-theme={index === 0 ? "dark" : undefined}
                  data-site-event="store_click"
                  data-site-store={store.id}
                >
                  {content}
                </a>
              );
            }

            return (
              <button
                className={`store-button ${index === 0 ? "store-button-primary" : ""}`}
                type="button"
                key={store.label}
                onClick={(event) => openDialog(store.id, event)}
                aria-label={`${store.eyebrow} ${store.label} — être prévenu de sa sortie`}
                aria-haspopup="dialog"
                aria-controls="store-availability-dialog"
                aria-expanded={activeStoreId === store.id}
                data-cursor-theme={index === 0 ? "dark" : undefined}
                data-site-event="store_click"
                data-site-store={store.id}
              >
                {content}
              </button>
            );
          })}
        </div>

        <a className="web-app-button" href={WEB_APP_URL}>
          <span>Accéder à l’app web</span>
          <span className="web-app-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>

      {activeStore && typeof document !== "undefined"
        ? createPortal(
            <div
              className="availability-dialog"
              data-cursor-theme="dark"
              onMouseDown={closeFromBackdrop}
            >
              <section
                className="availability-card"
                id="store-availability-dialog"
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="availability-title"
                aria-describedby={sent
                  ? "availability-success-description"
                  : "availability-description"}
                data-cursor-theme="light"
              >
                <div className="availability-header">
                  <span className="availability-platform">
                    <activeStore.Icon aria-hidden="true" />
                    {activeStore.dialogLabel}
                  </span>
                  <button
                    className="availability-close"
                    type="button"
                    onClick={closeDialog}
                    aria-label="Fermer"
                  >
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                  </button>
                </div>

                {sent ? (
                  <div
                    className="availability-success"
                    role="status"
                    aria-live="polite"
                  >
                    <span
                      className="availability-success-mark"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <h2 id="availability-title">Vous êtes sur la liste.</h2>
                    <p id="availability-success-description">
                      On vous préviendra dès que Débusk sera disponible.
                    </p>
                    <button
                      ref={successButtonRef}
                      type="button"
                      onClick={closeDialog}
                    >
                      Fermer
                    </button>
                    <a className="availability-web-link" href={WEB_APP_URL}>
                      Accéder à l’app web
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="availability-copy">
                      <p className="availability-eyebrow">
                        Encore un peu de patience
                      </p>
                      <h2 id="availability-title">
                        L’app sera disponible très prochainement.
                      </h2>
                      <p id="availability-description">
                        Laissez votre adresse e-mail pour être prévenu dès sa
                        sortie.
                      </p>
                    </div>

                    <form className="availability-form" onSubmit={submitWaitlist}>
                      <label htmlFor={`availability-email-${activeStore.id}`}>
                        Votre adresse e-mail
                      </label>
                      <div className="availability-form-row">
                        <input
                          id={`availability-email-${activeStore.id}`}
                          ref={emailRef}
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          maxLength={254}
                          required
                          value={email}
                          onChange={(event) => {
                            setEmail(event.target.value);
                            if (error) setError(null);
                          }}
                          placeholder="vous@exemple.fr"
                          aria-invalid={Boolean(error)}
                          aria-describedby={error ? "availability-error" : undefined}
                        />
                        <button
                          type="submit"
                          disabled={sending}
                          aria-busy={sending}
                        >
                          {sending ? "Inscription…" : "Me prévenir"}
                        </button>
                      </div>

                      <label className="availability-honeypot" aria-hidden="true">
                        Site web
                        <input
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={website}
                          onChange={(event) => setWebsite(event.target.value)}
                        />
                      </label>

                      {error ? (
                        <p
                          className="availability-error"
                          id="availability-error"
                          role="alert"
                        >
                          {error}
                        </p>
                      ) : null}

                      <p className="availability-privacy">
                        Votre adresse sera envoyée à {CONTACT_EMAIL} et servira
                        uniquement à vous informer du lancement.{" "}
                        <Link href="/informations#confidentialite">
                          Confidentialité
                        </Link>
                      </p>
                    </form>

                    <div className="availability-web-option">
                      <p>
                        En attendant la version Android, utilisez Débusk dès
                        maintenant dans votre navigateur.
                      </p>
                      <a className="availability-web-link" href={WEB_APP_URL}>
                        Accéder à l’app web
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </>
                )}
              </section>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
