import type { Metadata } from "next";
import Link from "next/link";
import { GuidePage } from "../GuidePage";
import { createPageMetadata } from "../seo";

const path = "/guide-rentree-bus-aix-en-provence";

export const metadata: Metadata = createPageMetadata({
  title: "Bus scolaire à Aix : préparer la rentrée 2026-2027",
  description:
    "Abonnement, ligne, arrêt, horaires et premier trajet : la checklist des parents pour préparer la rentrée 2026-2027 en bus à Aix-en-Provence.",
  path,
});

export default function SchoolReturnGuidePage() {
  return (
    <GuidePage
      path={path}
      eyebrow="Guide parents · Rentrée 2026–2027"
      title="Bus scolaire à Aix-en-Provence : préparer la rentrée 2026–2027"
      intro="Une checklist simple pour vérifier l’abonnement, repérer la bonne ligne et sécuriser le premier trajet de votre enfant avant septembre."
    >
      <section>
        <h2>La checklist avant le jour de la rentrée</h2>
        <ol className="guide-steps">
          <li>
            <span>01</span>
            <div>
              <h3>Finaliser l’abonnement scolaire</h3>
              <p>
                Vérifiez que la demande 2026–2027 est validée et que le titre
                est bien chargé sur la carte de transport. Débusk ne vend pas
                les abonnements : la démarche se fait sur le portail officiel
                de La Métropole Mobilité ou en boutique.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Identifier la ligne et les deux arrêts</h3>
              <p>
                Notez le nom exact de l’arrêt près du domicile, celui de
                l’établissement et le sens du trajet. Certaines dessertes
                utilisent une ligne régulière, d’autres une ligne spéciale
                scolaire numérotée 83xx ou 84xx.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Tester l’itinéraire aux horaires réels</h3>
              <p>
                Faites la recherche un matin de semaine, à l’heure prévue du
                départ. Comparez l’heure d’arrivée, la marche jusqu’à l’arrêt
                et les éventuelles correspondances.
              </p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <h3>Enregistrer l’arrêt et la ligne dans Débusk</h3>
              <p>
                Les favoris permettent de retrouver les prochains départs sans
                recommencer la recherche chaque matin. Vérifiez aussi les
                perturbations officielles avant de quitter la maison.
              </p>
            </div>
          </li>
          <li>
            <span>05</span>
            <div>
              <h3>Faire un trajet d’essai</h3>
              <p>
                Parcourez une fois le chemin ensemble : bon côté de la route,
                point de descente, correspondance et solution de repli. Le
                matin de la rentrée, prévoyez quelques minutes d’avance.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <aside className="guide-callout guide-callout-signal">
        <h2>Les inscriptions scolaires 2026–2027 sont ouvertes.</h2>
        <p>
          La campagne a commencé le 1er juillet 2026. Si le dossier n’est pas
          encore terminé, consultez les conditions et les justificatifs avant
          la rentrée.
        </p>
        <Link href="/abonnement-bus-scolaire-aix-en-provence">
          Voir le guide abonnement scolaire <span aria-hidden="true">→</span>
        </Link>
      </aside>

      <section>
        <h2>Ce que votre enfant peut retrouver dans Débusk</h2>
        <div className="guide-feature-grid">
          <article>
            <h3>Prochains départs</h3>
            <p>
              Les horaires de l’arrêt et les lignes favorites restent réunis
              au même endroit.
            </p>
          </article>
          <article>
            <h3>Itinéraire détaillé</h3>
            <p>
              Le tracé, la durée, la marche et chaque étape sont visibles avant
              de partir.
            </p>
          </article>
          <article>
            <h3>Perturbations officielles</h3>
            <p>
              Les informations publiées par le réseau sont présentées ligne par
              ligne.
            </p>
          </article>
          <article>
            <h3>Suivi communautaire</h3>
            <p>
              Lorsqu’un voyageur à bord participe, le bus peut être vu en
              progression sur la carte. Ce suivi reste indicatif et anonyme.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2>Les trois informations à noter sur papier</h2>
        <p>
          Même avec une application, gardez une solution simple pour le premier
          jour : le numéro de la ligne, le nom complet de l’arrêt de descente et
          le numéro d’un adulte à contacter. Pour une correspondance, notez
          également l’arrêt où elle se fait.
        </p>
        <p>
          Les horaires et le réseau peuvent évoluer à la rentrée. Contrôlez les
          informations la veille puis le matin du départ, et consultez le canal
          officiel en cas de doute.
        </p>
      </section>

      <section className="guide-source-box">
        <h2>Sources utiles pour les familles</h2>
        <ul>
          <li>
            <a
              href="https://www.lametropolemobilite.fr/inscription-transports-scolaires/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Inscriptions aux transports scolaires — La Métropole Mobilité
            </a>
          </li>
          <li>
            <a
              href="https://www.aixenbus.fr/fr/YNz-Abonnement-Scolaire.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conditions de l’abonnement scolaire — Aix en Bus
            </a>
          </li>
          <li>
            <a
              href="https://www.lametropolemobilite.fr/plans-et-horaires/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Plans et horaires officiels — La Métropole Mobilité
            </a>
          </li>
        </ul>
        <p>
          Débusk est un projet indépendant et n’est ni affilié ni mandaté par
          Aix en Bus ou La Métropole Mobilité.
        </p>
      </section>
    </GuidePage>
  );
}
