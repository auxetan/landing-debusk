import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  appScreens,
  appScreenStructuredData,
} from "../app-screen-data";
import { GuidePage } from "../GuidePage";
import { createPageMetadata } from "../seo";
import { StructuredData } from "../StructuredData";

const path = "/application-bus-aix-en-provence";

export const metadata: Metadata = createPageMetadata({
  title: "Application bus à Aix-en-Provence : découvrir Débusk",
  description:
    "Découvrez Débusk en images : horaires, itinéraires, favoris, perturbations et suivi communautaire des bus à Aix-en-Provence.",
  path,
  image: "/app-screens/main-screen.png",
  imageAlt:
    "Carte de l’application Débusk affichant les arrêts et lignes de bus autour d’Aix-en-Provence",
  imageWidth: 778,
  imageHeight: 1672,
});

const faq = [
  {
    question: "Débusk est-elle l’application officielle Aix en Bus ?",
    answer:
      "Non. Débusk est une application indépendante, sans affiliation avec Aix en Bus, Keolis ou La Métropole Mobilité.",
  },
  {
    question: "Peut-on acheter un abonnement dans Débusk ?",
    answer:
      "Non. Les abonnements et titres sont vendus par les services officiels. Débusk sert à consulter les trajets, lignes, horaires et perturbations disponibles.",
  },
  {
    question: "La position des bus est-elle toujours affichée ?",
    answer:
      "Non. Une position communautaire apparaît uniquement lorsqu’un voyageur choisit de partager la progression du bus pendant son trajet.",
  },
] as const;

export default function BusAppPage() {
  return (
    <GuidePage
      path={path}
      eyebrow="Application bus · Aix-en-Provence"
      title="Débusk, l’application pour préparer ses trajets en bus à Aix"
      intro="Prochains départs, itinéraires, lignes favorites, perturbations et suivi communautaire : découvrez chaque fonction de Débusk avant de l’installer."
      image={{
        url: "/app-screens/main-screen.png",
        width: 778,
        height: 1672,
        alt: "Carte Débusk des bus à Aix-en-Provence",
      }}
    >
      <StructuredData data={appScreenStructuredData} />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />

      <aside className="guide-callout guide-callout-signal guide-callout-first">
        <h2>Débusk complète les informations officielles.</h2>
        <p>
          L’app ne vend pas de titres et ne représente aucun exploitant. Elle
          aide à lire le réseau et ajoute un suivi communautaire volontaire
          lorsqu’un passager contribue.
        </p>
      </aside>

      <section>
        <h2>Tout ce que l’application permet de faire</h2>
        <div className="guide-feature-grid guide-feature-grid-three">
          <article>
            <h3>Voir les départs</h3>
            <p>
              Recherchez un arrêt, contrôlez le sens et gardez vos lignes
              habituelles dans les favoris.
            </p>
          </article>
          <article>
            <h3>Préparer l’itinéraire</h3>
            <p>
              Comparez les étapes, la durée et les correspondances avant de
              quitter la maison.
            </p>
          </article>
          <article>
            <h3>Anticiper le réseau</h3>
            <p>
              Consultez les perturbations et distinguez-les des contributions
              partagées par les voyageurs.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2>L’application Débusk en images</h2>
        <p>
          Sept captures réelles montrent la carte, les départs, les favoris,
          les perturbations, les itinéraires et le suivi communautaire.
        </p>
        <div className="app-screen-gallery">
          {appScreens.map((screen, index) => (
            <figure key={screen.src}>
              <div className="app-screen-gallery-phone">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  sizes="(max-width: 680px) 72vw, (max-width: 1000px) 36vw, 280px"
                  priority={index === 0}
                />
              </div>
              <figcaption>
                <strong>{screen.title}</strong>
                <span>{screen.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section>
        <h2>Des horaires et une communauté, pas de fausse promesse</h2>
        <p>
          Les prochains passages reposent sur les données de réseau intégrées à
          Débusk. Le suivi sur la carte est différent : il ne devient visible
          que lorsqu’un voyageur active volontairement le mode conduite pendant
          son trajet.
        </p>
        <p>
          Si aucune position n’apparaît, cela ne signifie pas que le bus est
          supprimé. Consultez l’horaire et les perturbations officielles. À
          l’inverse, une contribution communautaire ne remplace jamais une
          consigne de l’exploitant.
        </p>
      </section>

      <section>
        <h2>Le périmètre actuel de Débusk</h2>
        <p>
          L’app couvre le réseau urbain aixois, les lignes mini, plusieurs
          dessertes scolaires 2026–2027 et les liaisons L49, L50 et L51 entre
          Aix et Marseille. Elle ne couvre pas encore tout le réseau RTM, le TER
          ou l’ensemble des transports métropolitains.
        </p>
        <p>
          La ligne officielle A2 vers la gare TGV et l’aéroport est référencée,
          mais le flux actuel ne contient aucune course exploitable. Consultez
          notre <Link href="/bus-aix-aeroport-marseille-provence">guide A2</Link>{" "}
          avant de planifier ce trajet.
        </p>
      </section>

      <section className="application-faq">
        <h2>Questions sur l’application</h2>
        {faq.map((item) => (
          <article key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="guide-source-box">
        <h2>Préparer le bon parcours</h2>
        <p>
          Commencez par le guide correspondant à votre besoin, puis revenez au
          téléchargement quand vous avez identifié la ligne ou l’arrêt utile.
        </p>
        <ul>
          <li>
            <Link href="/guide-rentree-bus-aix-en-provence">
              Préparer la rentrée en bus
            </Link>
          </li>
          <li>
            <Link href="/bus-aix-marseille">Comparer L49, L50 et L51</Link>
          </li>
          <li>
            <Link href="/horaires-bus-aix-en-provence">
              Comprendre les horaires et prochains départs
            </Link>
          </li>
        </ul>
      </section>
    </GuidePage>
  );
}
