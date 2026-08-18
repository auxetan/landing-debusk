import type { Metadata } from "next";
import Link from "next/link";
import { GuidePage } from "../GuidePage";
import { createPageMetadata } from "../seo";

const path = "/itineraire-bus-aix-en-provence";

export const metadata: Metadata = createPageMetadata({
  title: "Itinéraires de bus à Aix-en-Provence | App Débusk",
  description:
    "Trouvez un itinéraire en bus à Aix-en-Provence : départ, arrivée, durée, correspondances et étapes du trajet dans l’application Débusk.",
  path,
});

export default function BusRoutePlannerPage() {
  return (
    <GuidePage
      path={path}
      eyebrow="Itinéraire bus Aix-en-Provence"
      title="Calculer un itinéraire en bus à Aix-en-Provence"
      intro="Indiquez votre départ et votre destination pour comparer les trajets, visualiser les étapes et choisir quand partir."
    >
      <section>
        <h2>Préparer le trajet avant de partir</h2>
        <div className="guide-feature-grid guide-feature-grid-three">
          <article>
            <span className="guide-feature-number">01</span>
            <h3>Départ et destination</h3>
            <p>
              Utilisez une adresse, un lieu ou votre position actuelle pour
              lancer la recherche.
            </p>
          </article>
          <article>
            <span className="guide-feature-number">02</span>
            <h3>Trajets proposés</h3>
            <p>
              Comparez la durée, l’heure de départ et les correspondances avant
              de faire votre choix.
            </p>
          </article>
          <article>
            <span className="guide-feature-number">03</span>
            <h3>Détail étape par étape</h3>
            <p>
              Retrouvez la marche jusqu’à l’arrêt, la ligne, le sens et l’arrêt
              de descente.
            </p>
          </article>
        </div>
      </section>

      <aside className="guide-callout guide-callout-green">
        <h2>Recherchez le trajet à l’heure du départ scolaire.</h2>
        <p>
          Un itinéraire calculé le dimanche après-midi ne reflète pas forcément
          les dessertes d’un lundi matin. Pour un enfant, testez l’aller et le
          retour un jour de semaine, puis faites une fois le parcours ensemble.
        </p>
      </aside>

      <section>
        <h2>Les points à contrôler sur chaque proposition</h2>
        <ul className="guide-checklist">
          <li>le nom précis et le côté de l’arrêt de départ ;</li>
          <li>le numéro de ligne et son terminus, qui indique le bon sens ;</li>
          <li>le temps de marche avant et après le bus ;</li>
          <li>
            le nombre de correspondances et le temps disponible entre elles ;
          </li>
          <li>l’heure d’arrivée souhaitée, avec une marge suffisante.</li>
        </ul>
      </section>

      <section>
        <h2>Avant de quitter la maison</h2>
        <p>
          Ouvrez le trajet retenu, vérifiez les{" "}
          <Link href="/horaires-bus-aix-en-provence">
            prochains départs
          </Link>{" "}
          et consultez les perturbations. Si un voyageur partage déjà la
          progression du bus, sa position peut apparaître sur la carte ; cette
          indication communautaire complète les données officielles sans les
          remplacer.
        </p>
        <p>
          Débusk couvre le réseau urbain d’Aix-en-Provence et plusieurs
          dessertes utiles vers les communes voisines. Consultez la liste des{" "}
          <Link href="/lignes-bus-aix-en-provence">lignes disponibles</Link>{" "}
          avant un trajet hors du centre.
        </p>
      </section>

      <section className="guide-source-box">
        <h2>Un résultat à confirmer en cas de perturbation</h2>
        <p>
          Les travaux, déviations et changements de rentrée peuvent modifier un
          parcours. Pour une interruption annoncée, référez-vous à
          l’information trafic officielle.
        </p>
        <a
          href="https://www.aixenbus.fr/fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Consulter le site officiel Aix en Bus
        </a>
      </section>
    </GuidePage>
  );
}
