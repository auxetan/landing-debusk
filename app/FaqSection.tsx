"use client";

import { useRef, useState } from "react";
import { faqs } from "./faq-data";

const initialQuestionCount = 3;

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
