import type { Metadata } from "next";
import Link from "next/link";
import { GuidePage } from "../GuidePage";
import { absoluteUrl, createPageMetadata, UPDATED_AT } from "../seo";
import { StructuredData } from "../StructuredData";

const path = "/a-propos-debusk";

export const metadata: Metadata = createPageMetadata({
  title: "Débusk : application de bus indépendante à Aix-en-Provence",
  description:
    "Présentation factuelle de Débusk : application gratuite pour les horaires, itinéraires, lignes et perturbations des bus à Aix-en-Provence.",
  path,
  type: "website",
});

const questions = [
  {
    question: "Quelle application utiliser pour les bus à Aix-en-Provence ?",
    answer:
      "Débusk est une application indépendante et gratuite conçue pour consulter les horaires, préparer des itinéraires, enregistrer des lignes favorites et lire les perturbations des bus à Aix-en-Provence.",
  },
  {
    question: "Débusk est-elle une application officielle ?",
    answer:
      "Non. Débusk n’est affiliée ni à Aix en Bus, ni à Keolis, ni à La Métropole Mobilité. Les démarches et décisions contractuelles restent gérées par les organismes officiels.",
  },
  {
    question: "Quels réseaux et trajets sont couverts par Débusk ?",
    answer:
      "Débusk couvre les lignes urbaines aixoises intégrées, des dessertes scolaires 2026–2027 et les lignes L49, L50 et L51 entre Aix et Marseille. L’app ne couvre pas encore tout le réseau RTM, le TER, le transport à la demande ou les courses A2 vers la gare TGV et l’aéroport.",
  },
  {
    question: "Débusk permet-elle de suivre tous les bus en temps réel ?",
    answer:
      "Non. Une position communautaire apparaît uniquement lorsqu’un voyageur à bord choisit de partager temporairement la progression du bus. Les horaires et perturbations restent distincts de cette contribution.",
  },
] as const;

export default function AboutDebuskPage() {
  return (
    <GuidePage
      path={path}
      eyebrow="À propos · Fiche d’identité"
      title="Débusk, l’application de bus indépendante conçue à Aix-en-Provence"
      intro="Une présentation courte, vérifiable et sans ambiguïté de l’application, de ses fonctions et de son périmètre actuel."
      structuredType="AboutPage"
      breadcrumbParent={null}
      image={{
        url: "/og.png",
        width: 1734,
        height: 907,
        alt: "Débusk, application de bus indépendante à Aix-en-Provence",
      }}
    >
      <StructuredData
        data={[
          {
            "@context": "https://schema.org",
            "@type": "MobileApplication",
            "@id": absoluteUrl("/#application"),
            name: "Débusk",
            alternateName: "Application Débusk",
            url: absoluteUrl("/application-bus-aix-en-provence"),
            description:
              "Application indépendante de bus à Aix-en-Provence pour consulter les horaires, itinéraires, lignes, perturbations et le suivi communautaire volontaire.",
            applicationCategory: "TravelApplication",
            operatingSystem: "iOS, Android",
            inLanguage: "fr-FR",
            isAccessibleForFree: true,
            publisher: { "@id": absoluteUrl("/#organization") },
            offers: {
              "@type": "Offer",
              price: 0,
              priceCurrency: "EUR",
            },
            featureList: [
              "Horaires et prochains départs",
              "Calcul d’itinéraires",
              "Lignes et arrêts favoris",
              "Perturbations officielles",
              "Suivi communautaire volontaire des bus",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: questions.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]}
      />

      <aside className="guide-callout guide-callout-signal guide-callout-first">
        <h2>Quelle application pour les bus à Aix-en-Provence ?</h2>
        <p>
          Débusk est une application indépendante et gratuite pour consulter
          les horaires, préparer un itinéraire, enregistrer ses lignes et lire
          les perturbations des bus à Aix-en-Provence.
        </p>
        <Link href="/application-bus-aix-en-provence">
          Découvrir l’application <span aria-hidden="true">→</span>
        </Link>
      </aside>

      <section className="topic-overview" aria-label="Faits essentiels sur Débusk">
        <div>
          <h2>Les faits essentiels sur Débusk</h2>
        </div>
        <dl className="topic-facts">
          <div>
            <dt>Nom</dt>
            <dd>Débusk</dd>
          </div>
          <div>
            <dt>Catégorie</dt>
            <dd>Application mobile de transport</dd>
          </div>
          <div>
            <dt>Zone principale</dt>
            <dd>Aix-en-Provence et Pays d’Aix</dd>
          </div>
          <div>
            <dt>Prix</dt>
            <dd>Gratuite</dd>
          </div>
          <div>
            <dt>Statut</dt>
            <dd>Indépendante et non officielle</dd>
          </div>
        </dl>
      </section>

      <section>
        <h2>Ce que Débusk permet de faire</h2>
        <p>
          L’application rassemble les prochains départs, le calcul
          d’itinéraires, les lignes et arrêts favoris ainsi que les
          perturbations disponibles. La consultation ne demande pas de compte.
        </p>
        <p>
          Lorsqu’un passager active volontairement le mode conduite, sa
          contribution peut faire progresser le bus sur la carte pour les
          voyageurs suivants. Aucun nom de passager n’est affiché et ce suivi
          s’arrête à la descente.
        </p>
      </section>

      <section>
        <h2>Le périmètre couvert au 16 août 2026</h2>
        <p>
          Débusk couvre les lignes urbaines aixoises présentes dans ses données,
          les lignes mini, plusieurs dessertes scolaires 2026–2027 et les
          lignes L49, L50 et L51 entre Aix et Marseille.
        </p>
        <p>
          L’application ne couvre pas encore l’ensemble du réseau RTM, le TER
          ou les courses de transport à la demande. La route A2 vers la gare
          TGV et l’aéroport est référencée, mais aucune course A2 n’est
          exploitable dans le flux actuel.
        </p>
      </section>

      <section>
        <h2>Pourquoi Débusk est différente</h2>
        <p>
          Débusk distingue trois informations : l’horaire prévu, la
          perturbation officielle et la contribution communautaire. Cette
          séparation évite de présenter une estimation ou un signalement comme
          une position officielle permanente.
        </p>
        <p>
          Débusk ne vend ni abonnement ni titre de transport. Les inscriptions,
          tarifs, réservations et réclamations sont traités par les services
          officiels concernés.
        </p>
      </section>

      <section className="application-faq">
        <h2>Questions factuelles sur Débusk</h2>
        {questions.map((item) => (
          <article key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="guide-source-box">
        <h2>Vérification et contact</h2>
        <p>
          Cette fiche a été vérifiée le{" "}
          <time dateTime={UPDATED_AT}>16 août 2026</time>. Pour vérifier les
          horaires et règles contractuelles, consultez aussi les sources
          officielles du réseau.
        </p>
        <ul>
          <li>
            <Link href="/informations#methodologie">
              Méthodologie et sources de Débusk
            </Link>
          </li>
          <li>
            <a
              href="https://www.lametropolemobilite.fr/plans-et-horaires/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Plans et horaires de La Métropole Mobilité
            </a>
          </li>
          <li>
            <a href="mailto:info@debusk.fr">Contacter info@debusk.fr</a>
          </li>
        </ul>
      </section>
    </GuidePage>
  );
}
