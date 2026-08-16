import type { Metadata } from "next";
import Link from "next/link";
import { GuidePage } from "../GuidePage";
import { absoluteUrl, createPageMetadata, UPDATED_AT } from "../seo";
import { StructuredData } from "../StructuredData";

const path = "/donnees-couverture-debusk";

export const metadata: Metadata = createPageMetadata({
  title: "Données et couverture de Débusk à Aix-en-Provence",
  description:
    "Sources, date, lignes couvertes et limites connues des données de bus utilisées par Débusk à Aix-en-Provence au 16 août 2026.",
  path,
  type: "article",
});

const officialSources = [
  "https://transport.data.gouv.fr/resources/39603?locale=fr",
  "https://www.aixenbus.fr/fr/WPJ-Le-reseau-La-Metropole-Mobilite-a-Aix-en-Provence.html",
  "https://www.plan.lametropolemobilite.fr/fr/plan-du-site/reseau/Metropole-lecar/C13",
  "https://www.lametropolemobilite.fr/navettes-gares-aeroports/",
  "https://www.aixenbus.fr/fr/NOL-Le-Bus-a-la-demande.html",
] as const;

export default function DataCoveragePage() {
  return (
    <GuidePage
      path={path}
      eyebrow="Transparence · Données"
      title="Données, lignes couvertes et limites connues de Débusk"
      intro="La fiche technique du jeu de données actuellement embarqué dans l’application : provenance, période, volume et services réellement exploitables."
      breadcrumbParent={null}
      image={{
        url: "/og.png",
        width: 1734,
        height: 907,
        alt: "Débusk, application de bus à Aix-en-Provence",
      }}
    >
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": absoluteUrl(path + "#webpage"),
          name: "Données et couverture de Débusk",
          url: absoluteUrl(path),
          dateModified: UPDATED_AT,
          inLanguage: "fr-FR",
          isPartOf: { "@id": absoluteUrl("/#website") },
          about: { "@id": absoluteUrl("/#application") },
          isBasedOn: officialSources,
        }}
      />

      <aside className="guide-callout guide-callout-signal guide-callout-first">
        <h2>Que couvre Débusk actuellement ?</h2>
        <p>
          Débusk exploite les lignes urbaines aixoises présentes dans son jeu
          de données, 29 dessertes scolaires actives le mardi 1er septembre
          2026 et les lignes L49, L50 et L51 entre Aix et Marseille. L’A2 et
          le transport à la demande ne sont pas encore exploitables dans l’app.
        </p>
      </aside>

      <section className="topic-overview" aria-label="Fiche du jeu de données">
        <div>
          <h2>Version vérifiée du jeu embarqué</h2>
        </div>
        <dl className="topic-facts">
          <div>
            <dt>Version déclarée</dt>
            <dd>keolis-rentree-2026-2027-network-v1</dd>
          </div>
          <div>
            <dt>Empreinte SHA-256</dt>
            <dd>302d1b16…d0e6c6a</dd>
          </div>
          <div>
            <dt>Période du flux</dt>
            <dd>14 août 2026 au 4 juillet 2027</dd>
          </div>
          <div>
            <dt>Éditeur déclaré</dt>
            <dd>Mecatran</dd>
          </div>
          <div>
            <dt>Volume</dt>
            <dd>67 lignes · 1 190 arrêts · 52 646 courses</dd>
          </div>
          <div>
            <dt>Dernière vérification</dt>
            <dd>16 août 2026</dd>
          </div>
        </dl>
      </section>

      <section>
        <h2>Ce que signifient ces nombres</h2>
        <p>
          Les 52 646 entrées de courses sont réparties entre plusieurs
          calendriers : elles ne correspondent pas à autant de bus circulant
          le même jour. Débusk sélectionne les services compatibles avec la
          date et le trajet recherchés.
        </p>
        <p>
          Les deux agences déclarées dans le fichier sont « Aix lebus » et
          « Métropole lecar ». Débusk reste une application indépendante : ces
          noms décrivent les données et ne constituent ni une affiliation ni
          un mandat officiel.
        </p>
      </section>

      <section>
        <h2>Services actuellement exploitables</h2>
        <ul>
          <li>les lignes urbaines et mini aixoises présentes dans le flux ;</li>
          <li>
            29 dessertes scolaires actives le mardi 1er septembre 2026 (26 le
            mercredi 2 septembre), dans les familles 8301, 8303, 8305, 8377,
            8379, 8404 et 8405 ;
          </li>
          <li>
            les lignes L49, L50 et L51 pour des liaisons entre Aix-en-Provence
            et Marseille ;
          </li>
          <li>
            les horaires théoriques, itinéraires et perturbations disponibles
            pour ces services.
          </li>
        </ul>
      </section>

      <section>
        <h2>Limites connues au 16 août 2026</h2>
        <p>
          Le fichier contient une route A2 ainsi que les arrêts de la gare Aix
          TGV et de l’aéroport Marseille Provence, mais aucune course A2 dans
          le fichier des trajets. Débusk ne doit donc pas être utilisée pour
          obtenir un horaire A2 tant que le flux n’est pas complété.
        </p>
        <p>
          Le transport à la demande n’est pas inclus dans les données
          exploitables et Débusk ne permet pas de réserver une course. La
          couverture ne remplace pas non plus l’ensemble du réseau RTM, le TER
          ou les services ZOU!. Pour ces trajets, consultez les opérateurs
          officiels.
        </p>
      </section>

      <section className="guide-source-box">
        <h2>Sources officielles à recouper</h2>
        <p>
          Les volumes ci-dessus ont été calculés sur le fichier fusionné
          embarqué dans Débusk, version
          « keolis-rentree-2026-2027-network-v1 », dont l’empreinte SHA-256
          complète est
          302d1b16cf3bdc0422d55dd17eded36d53c234394c438429df8667e95d0e6c6a.
          Les liens suivants permettent de recouper les données publiques et
          les règles officielles de voyage, de tarif et de réservation.
        </p>
        <ul>
          <li>
            <a href={officialSources[0]} target="_blank" rel="noopener noreferrer">
              Ressource GTFS Aix lebus sur le Point d’accès national
            </a>
          </li>
          <li>
            <a href={officialSources[1]} target="_blank" rel="noopener noreferrer">
              Réseau La Métropole Mobilité à Aix-en-Provence
            </a>
          </li>
          <li>
            <a href={officialSources[2]} target="_blank" rel="noopener noreferrer">
              Fiches du réseau Métropole lecar
            </a>
          </li>
          <li>
            <a href={officialSources[3]} target="_blank" rel="noopener noreferrer">
              Navettes officielles gares et aéroport
            </a>
          </li>
          <li>
            <a href={officialSources[4]} target="_blank" rel="noopener noreferrer">
              Bus à la demande Aix en Bus
            </a>
          </li>
          <li>
            <Link href="/informations#methodologie">
              Méthodologie de présentation de Débusk
            </Link>
          </li>
        </ul>
      </section>
    </GuidePage>
  );
}
