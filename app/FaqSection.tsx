"use client";

import { useRef, useState } from "react";

const initialQuestionCount = 4;

const faqs = [
  {
    question: "Le suivi est-il 100 % anonyme ?",
    answer:
      "Oui. Aucun nom ni profil n’est affiché ou consulté pour suivre un trajet. Seule la position temporaire utile au bus apparaît sur la carte.",
  },
  {
    question: "Quand le partage s’arrête-t-il ?",
    answer:
      "Dès que vous touchez « Je descends » ou quittez le mode conduite. Votre position ne sert alors plus au suivi du bus.",
  },
  {
    question: "D’où viennent les informations ?",
    answer:
      "Les horaires et perturbations viennent d’Aix en Bus. Les positions en direct et les signalements sont ajoutés volontairement par les voyageurs.",
  },
  {
    question: "Puis-je simplement consulter ?",
    answer:
      "Oui. Vous pouvez voir les départs, les trajets et les perturbations sans jamais activer le suivi.",
  },
  {
    question: "Comment activer le suivi ?",
    answer:
      "À bord, sélectionnez votre ligne puis lancez le mode conduite. Vous pouvez interrompre le partage à tout moment.",
  },
  {
    question: "À quoi sert ma position ?",
    answer:
      "Elle actualise la position du bus afin que les voyageurs aux prochains arrêts puissent le voir approcher.",
  },
  {
    question: "Une seule contribution suffit-elle ?",
    answer:
      "Oui. Une personne peut déjà rendre un bus visible. Plusieurs contributions améliorent la continuité de l’information.",
  },
  {
    question: "Dois-je participer pendant tout le trajet ?",
    answer:
      "Non. Quelques arrêts peuvent déjà aider, et vous pouvez arrêter le suivi dès que vous le souhaitez.",
  },
  {
    question: "Que voient les autres voyageurs ?",
    answer:
      "Ils voient le bus, sa ligne et sa progression sur la carte, jamais l’identité de la personne qui partage.",
  },
  {
    question: "Que puis-je signaler ?",
    answer:
      "Un retard, un bus complet, un incident ou une information utile rencontrée sur le réseau.",
  },
  {
    question: "Les signalements sont-ils officiels ?",
    answer:
      "Non. Ils sont présentés comme communautaires et restent séparés des perturbations officielles d’Aix en Bus.",
  },
  {
    question: "Et si une information semble incorrecte ?",
    answer:
      "Les contributions restent indicatives. En cas de doute, consultez également les canaux officiels du réseau.",
  },
  {
    question: "Si personne ne partage sa position ?",
    answer:
      "Les horaires et perturbations officielles restent disponibles, mais la position en direct du bus peut manquer.",
  },
  {
    question: "Le suivi consomme-t-il de la batterie ?",
    answer:
      "Comme toute fonction utilisant la localisation, il consomme un peu plus pendant le trajet. L’arrêter à la descente limite cet impact.",
  },
  {
    question: "Faut-il une connexion internet ?",
    answer:
      "Le direct nécessite une connexion et l’accès à la localisation. Sans réseau, les mises à jour peuvent être retardées.",
  },
  {
    question: "À quoi servent les points et validations ?",
    answer:
      "Ils montrent votre progression et valorisent vos contributions, sans conditionner l’accès aux informations de l’application.",
  },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const extraQuestionsRef = useRef<HTMLDivElement>(null);

  const toggleAllQuestions = () => {
    if (showAll) {
      if (extraQuestionsRef.current?.contains(document.activeElement)) {
        expandButtonRef.current?.focus();
      }
      if (openIndex !== null && openIndex >= initialQuestionCount) {
        setOpenIndex(null);
      }
    }

    setShowAll((current) => !current);
  };

  const renderQuestion = (faq: (typeof faqs)[number], index: number) => {
    const isOpen = openIndex === index;
    const questionId = `faq-question-${index + 1}`;
    const answerId = `faq-answer-${index + 1}`;

    return (
      <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={faq.question}>
        <h3>
          <button
            className="faq-question"
            id={questionId}
            type="button"
            aria-expanded={isOpen}
            aria-controls={answerId}
            onClick={() => setOpenIndex(isOpen ? null : index)}
          >
            <span className="faq-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="faq-question-text">{faq.question}</span>
            <span className="faq-toggle" aria-hidden="true">↓</span>
          </button>
        </h3>

        <div
          className={`faq-answer ${isOpen ? "is-open" : ""}`}
          id={answerId}
          role="region"
          aria-labelledby={questionId}
          aria-hidden={!isOpen}
        >
          <div>
            <p>{faq.answer}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      className="faq-section content-section"
      id="questions"
      aria-labelledby="faq-title"
    >
      <div className="faq-heading">
        <p className="section-eyebrow">L’essentiel</p>
        <h2 id="faq-title">
          Vos questions.
          <span>Nos réponses.</span>
        </h2>
      </div>

      <div className="faq-accordion">
        <div className="faq-list">
          {faqs
            .slice(0, initialQuestionCount)
            .map((faq, index) => renderQuestion(faq, index))}

          <div
            className={`faq-extra ${showAll ? "is-open" : ""}`}
            id="faq-extra-questions"
            ref={extraQuestionsRef}
            aria-hidden={!showAll}
            inert={showAll ? undefined : true}
          >
            <div>
              {faqs
                .slice(initialQuestionCount)
                .map((faq, index) =>
                  renderQuestion(faq, index + initialQuestionCount),
                )}
            </div>
          </div>
        </div>

        <button
          className={`faq-expand ${showAll ? "is-expanded" : ""}`}
          ref={expandButtonRef}
          type="button"
          aria-label={showAll ? "Réduire les questions" : "Voir toutes les questions"}
          aria-expanded={showAll}
          aria-controls="faq-extra-questions"
          onClick={toggleAllQuestions}
        >
          <span className="faq-expand-icon" aria-hidden="true">↓</span>
        </button>
      </div>
    </section>
  );
}
