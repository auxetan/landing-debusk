import type { Metadata } from "next";
import Link from "next/link";
import { GuidePage } from "../GuidePage";
import { createPageMetadata } from "../seo";

const path = "/abonnement-bus-scolaire-aix-en-provence";

export const metadata: Metadata = createPageMetadata({
  title: "Abonnement bus scolaire Aix 2026-2027 : inscription",
  description:
    "Comment demander l’abonnement bus scolaire 2026-2027 à Aix-en-Provence : conditions, justificatifs, portail officiel et préparation du trajet.",
  path,
});

export default function SchoolBusPassPage() {
  return (
    <GuidePage
      path={path}
      eyebrow="Abonnement scolaire · 2026–2027"
      title="Abonnement bus scolaire à Aix : les démarches pour 2026–2027"
      intro="Les inscriptions sont ouvertes depuis le 1er juillet 2026. Voici les conditions, les documents à préparer et les vérifications utiles avant la rentrée."
    >
      <aside className="guide-callout guide-callout-signal guide-callout-first">
        <p className="guide-callout-label">Important</p>
        <h2>La souscription ne se fait pas dans Débusk.</h2>
        <p>
          Débusk vous aide à consulter les lignes, horaires et itinéraires. La
          demande ou le renouvellement de l’abonnement se fait exclusivement
          auprès de La Métropole Mobilité ou d’un point de vente habilité.
        </p>
        <a
          href="https://www.lametropolemobilite.fr/inscription-transports-scolaires/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Accéder à l’inscription officielle <span aria-hidden="true">↗</span>
        </a>
      </aside>

      <section>
        <h2>Qui peut demander l’abonnement scolaire ?</h2>
        <p>
          D’après les conditions publiées pour le réseau, l’abonnement scolaire
          concerne les élèves de la primaire jusqu’à l’obtention du
          baccalauréat résidant dans la Métropole. La page officielle indique
          également la gratuité pour les moins de 11 ans, sous réserve des
          règles d’inscription applicables au trajet de l’enfant.
        </p>
        <p>
          Pour une délivrance à la boutique métropolitaine d’Aix-en-Provence,
          des conditions territoriales spécifiques s’appliquent aux élèves
          domiciliés et scolarisés à Aix-en-Provence, Saint-Marc-Jaumegarde, Le
          Tholonet ou Venelles. Vérifiez votre cas sur le site officiel avant de
          vous déplacer.
        </p>
      </section>

      <section>
        <h2>Les justificatifs à préparer</h2>
        <ul className="guide-checklist">
          <li>une photo d’identité récente de l’enfant ;</li>
          <li>un justificatif de domicile de moins de trois mois ;</li>
          <li>
            une pièce d’identité de l’enfant ou la page correspondante du
            livret de famille ;
          </li>
          <li>le livret de famille complet ;</li>
          <li>
            un certificat de scolarité pour les élèves de plus de 16 ans au 1er
            septembre.
          </li>
        </ul>
        <p>
          Un dossier incomplet peut ralentir la validation à l’approche de la
          rentrée. Préparez des fichiers lisibles avant de commencer la démarche
          en ligne.
        </p>
      </section>

      <section>
        <h2>Ce que couvre le titre scolaire annoncé</h2>
        <p>
          La fiche Aix en Bus indique un titre chargé sur <em>lacarte</em>,
          valable 365 jours à compter de la première validation, sept jours sur
          sept, sur les lignes scolaires et régulières de La Métropole Mobilité.
          Des exclusions sont signalées, notamment Marseille et les lignes
          aéroport : contrôlez le détail officiel si le trajet dépasse le Pays
          d’Aix.
        </p>
        <p>
          Les prix, conditions et zones peuvent changer. Cette page résume les
          informations consultées le 16 août 2026 mais ne remplace pas les
          conditions de vente du réseau.
        </p>
      </section>

      <section>
        <h2>Après la validation de l’abonnement</h2>
        <ol className="guide-steps guide-steps-compact">
          <li>
            <span>01</span>
            <div>
              <h3>Confirmez la ligne</h3>
              <p>
                Repérez la desserte régulière ou scolaire et le terminus dans le
                bon sens.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Vérifiez les horaires de septembre</h3>
              <p>
                Les fiches peuvent évoluer à la rentrée. Contrôlez l’aller et le
                retour pour chaque jour concerné.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Préparez le premier trajet</h3>
              <p>
                Enregistrez l’arrêt dans Débusk puis faites le parcours une fois
                avec votre enfant.
              </p>
            </div>
          </li>
        </ol>
        <p>
          Retrouvez toutes ces étapes dans notre{" "}
          <Link href="/guide-rentree-bus-aix-en-provence">
            guide parents pour la rentrée
          </Link>
          .
        </p>
      </section>

      <section className="guide-source-box">
        <h2>Liens officiels</h2>
        <ul>
          <li>
            <a
              href="https://www.lametropolemobilite.fr/inscription-transports-scolaires/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Inscription aux transports scolaires — La Métropole Mobilité
            </a>
          </li>
          <li>
            <a
              href="https://www.aixenbus.fr/fr/YNz-Abonnement-Scolaire.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abonnement scolaire — Aix en Bus
            </a>
          </li>
        </ul>
        <p>
          Débusk est un service indépendant. Pour une question de facturation,
          d’éligibilité ou de délivrance de carte, contactez directement
          l’organisme officiel.
        </p>
      </section>
    </GuidePage>
  );
}
